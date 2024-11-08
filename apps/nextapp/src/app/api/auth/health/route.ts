// app/api/auth/health/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth/options';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      status: 'healthy',
      auth: {
        hasSession: !!session,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Auth system error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}