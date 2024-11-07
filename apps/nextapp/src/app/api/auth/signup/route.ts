// apps/nextapp/src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { User } from '../../../../lib/user-schema'; // Assuming you have a user schema
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Environment variables for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// --- Signup Route ---
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new user
    const newUser = await User.create({
      username: data.username,
      password: hashedPassword,
    });

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Return success response with token
    return NextResponse.json(
      { message: 'User created successfully', token },
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
