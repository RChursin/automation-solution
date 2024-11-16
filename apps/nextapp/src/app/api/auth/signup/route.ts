// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { User } from '../../../../lib/user-schema';
import bcrypt from 'bcrypt';

/**
 * Handles the POST request for user signup.
 * - Validates user input (username, email, password).
 * - Checks if the username and email are already in use.
 * - If the username is taken, generates unique suggestions.
 * - Hashes the password and creates a new user in the database.
 *
 * param {NextRequest} request - The HTTP request object containing user details in JSON format.
 * returns {Promise<NextResponse>} - A response indicating success or failure, with optional suggestions.
 */
export async function POST(request: NextRequest) {
  try {
    // Establish database connection
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

    // Validate password requirements
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

    // Check if email already exists
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
      // Fetch existing usernames from the database
      const existingUsernames = await User.find({}, 'username').lean();
      const existingSet = new Set(existingUsernames.map((user) => user.username));

      // Generate unique suggestions
      const suggestions = [];
      let attempts = 0;

      while (suggestions.length < 3 && attempts < 10) {
        const suggestion = generateUniqueSuggestion(username, suggestions);
        if (!existingSet.has(suggestion)) {
          suggestions.push(suggestion);
        }
        attempts++;
      }

      return NextResponse.json(
        { error: 'Username already exists', suggestions },
        { status: 400 }
      );
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user record
    const user = await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Return a success response
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

/**
 * Generates a unique username suggestion based on the base username.
 * Avoids suggesting usernames already included in `existingSuggestions`.
 *
 * param {string} base - The base username to generate suggestions from.
 * param {string[]} existingSuggestions - List of suggestions already provided.
 * returns {string} - A unique username suggestion.
 */
function generateUniqueSuggestion(base: string, existingSuggestions: string[]) {
  const randomSuffix = Math.floor(Math.random() * 1000); // Generate a random number as a suffix
  const reversed = base.split('').reverse().join(''); // Reverse the base username
  const patterns = [`${base}${randomSuffix}`, `${reversed}${randomSuffix}`, `${base}_${randomSuffix}`];

  // Return the first unique pattern
  for (const suggestion of patterns) {
    if (!existingSuggestions.includes(suggestion)) {
      return suggestion;
    }
  }
  // Fallback in case no unique pattern is found
  return `${base}_${randomSuffix}`;
}
