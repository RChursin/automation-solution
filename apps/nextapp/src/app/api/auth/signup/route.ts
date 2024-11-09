// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { User } from '../../../../lib/user-schema';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { 
        success: true, 
        user: {
          id: user._id.toString(),
          username: user.username
        }
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}