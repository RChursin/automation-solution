// apps/nextapp/src/app/api/profile/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { User } from '../../../../lib/user-schema';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth/options';
import { 
  ProfileUpdateResponse, 
  DatabaseUpdateFields,
  PROFILE_ERRORS,
  PROFILE_MESSAGES,
} from '../../../../types/profile';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();

    // Authenticate the user using the current session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json<ProfileUpdateResponse>(
        { success: false, error: PROFILE_ERRORS.UNAUTHORIZED },
        { status: 401 }
      );
    }

    // Extract `userId` from request params
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json<ProfileUpdateResponse>(
        { success: false, error: PROFILE_ERRORS.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    // Check if the session user matches the user being updated
    if (session.user.id !== userId) {
      return NextResponse.json<ProfileUpdateResponse>(
        { success: false, error: PROFILE_ERRORS.UNAUTHORIZED },
        { status: 401 }
      );
    }

    // Find the user document in the database
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json<ProfileUpdateResponse>(
        { success: false, error: PROFILE_ERRORS.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    const requestData = await request.json();
    const updateData: DatabaseUpdateFields = {};

    // Check for email changes and validate uniqueness
    if (requestData.email && requestData.email !== user.email) {
      const emailExists = await User.findOne({ 
        email: new RegExp(`^${requestData.email}$`, 'i'),
        _id: { $ne: userId }
      });
      
      if (emailExists) {
        return NextResponse.json<ProfileUpdateResponse>(
          { success: false, error: PROFILE_ERRORS.EMAIL_EXISTS },
          { status: 400 }
        );
      }
      updateData.email = requestData.email;
    }

    // Check for username changes and validate uniqueness
    if (requestData.username && requestData.username !== user.username) {
      const usernameExists = await User.findOne({ 
        username: new RegExp(`^${requestData.username}$`, 'i'),
        _id: { $ne: userId }
      });
      
      if (usernameExists) {
        return NextResponse.json<ProfileUpdateResponse>(
          { success: false, error: PROFILE_ERRORS.USERNAME_EXISTS },
          { status: 400 }
        );
      }
      updateData.username = requestData.username;
    }

    // Validate and hash password if password fields are provided
    if (requestData.currentPassword && requestData.newPassword) {
      const isValidPassword = await bcrypt.compare(
        requestData.currentPassword,
        user.password
      );

      if (!isValidPassword) {
        return NextResponse.json<ProfileUpdateResponse>(
          { success: false, error: PROFILE_ERRORS.INVALID_PASSWORD },
          { status: 400 }
        );
      }

      updateData.password = await bcrypt.hash(requestData.newPassword, 12);
    }

    // If no updates, return a message indicating no changes
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json<ProfileUpdateResponse>({
        success: true,
        message: PROFILE_MESSAGES.NO_CHANGES,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email
        }
      });
    }

    // Update the user document with the provided data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { 
        new: true,
        runValidators: true 
      }
    ).select('-password'); // Exclude password field from response

    if (!updatedUser) {
      throw new Error(PROFILE_ERRORS.UPDATE_FAILED);
    }

    return NextResponse.json<ProfileUpdateResponse>({
      success: true,
      message: PROFILE_MESSAGES.UPDATE_SUCCESS,
      user: {
        id: updatedUser._id.toString(),
        username: updatedUser.username,
        email: updatedUser.email
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json<ProfileUpdateResponse>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : PROFILE_ERRORS.UPDATE_FAILED 
      },
      { status: 500 }
    );
  }
}