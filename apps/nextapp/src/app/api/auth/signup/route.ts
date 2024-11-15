// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { User } from '../../../../lib/user-schema';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { username, email, password } = await request.json();

    // Convert email to lowercase for consistent storage and comparison
    const normalizedEmail = email.toLowerCase();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Password requirements: at least 8 characters, one uppercase letter, and two special symbols
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]{2,})[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters, include at least one uppercase letter, and two special symbols (e.g., "!@#"' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists in lowercase
    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
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
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      { 
        success: true, 
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email
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