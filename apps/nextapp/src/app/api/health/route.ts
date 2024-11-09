// apps/nextapp/src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host');
  const userAgent = headersList.get('user-agent');

  try {
    // Test database connection
    await dbConnect();

    // Get environment info
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasMongoUri: !!process.env.MONGODB_URI,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      host,
      userAgent,
    };

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: envInfo,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}