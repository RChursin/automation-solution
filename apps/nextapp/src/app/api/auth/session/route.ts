import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import { getSession } from '../../../../lib/session'; // Import your updated session utility

export async function GET() {
  try {
    await dbConnect();

    // Get the session directly without passing `request`
    const session = await getSession();

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