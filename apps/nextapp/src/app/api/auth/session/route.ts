// apps/nextapp/src/app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth/options';

export async function GET() {
  try {
    // Retrieve the current session using authentication options
    const session = await getServerSession(authOptions);

    // If a session exists, respond with session status and user details
    if (session) {
      return NextResponse.json({
        isLoggedIn: true,
        user: session.user,
      });
    }

    // If no session is found, respond indicating the user is not logged in
    return NextResponse.json({
      isLoggedIn: false,
    });
  } catch (error) {
    console.error('Session check error:', error);
    // Return an error response if session retrieval fails
    return NextResponse.json(
      { error: 'Failed to check session' },
      { status: 500 }
    );
  }
}