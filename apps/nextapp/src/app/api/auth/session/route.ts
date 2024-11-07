import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { getSession } from '../../../../lib/session'; // Import a session utility if using a library like NextAuth.js

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Simulate getting the session for the currently logged-in user
    const session = await getSession(request);

    if (session && session.user) {
      return NextResponse.json({
        isLoggedIn: true,
        user: session.user,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        isLoggedIn: false,
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'Failed to check session' },
      { status: 500 }
    );
  }
}
