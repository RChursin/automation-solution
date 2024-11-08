// apps/nextapp/src/app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth/options';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      return NextResponse.json({
        isLoggedIn: true,
        user: session.user,
      });
    }

    return NextResponse.json({
      isLoggedIn: false,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'Failed to check session' },
      { status: 500 }
    );
  }
}