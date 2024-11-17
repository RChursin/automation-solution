// app/api/auth/health/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth/options';
import dbConnect from '../../../../lib/mongodb';

let appStartTime: Date | null = null;

// Initialize app start time if not set
if (!appStartTime) {
  appStartTime = new Date();
}

export async function GET() {
  try {
    // Check session health
    const session = await getServerSession(authOptions);

    // Check database connectivity
    let dbStatus = 'unknown';
    try {
      await dbConnect();
      dbStatus = 'connected';
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      dbStatus = 'disconnected';
    }

    // Build response object
    const healthResponse = {
      status: 'healthy',
      auth: {
        hasSession: !!session,
        sessionTimestamp: session ? new Date().toISOString() : null,
      },
      database: {
        status: dbStatus,
      },
      app: {
        environment: process.env.NODE_ENV || 'unknown',
        version: process.env.APP_VERSION || '1.0.0',
        uptime: appStartTime ? `${Math.floor((Date.now() - appStartTime.getTime()) / 1000)} seconds` : 'unknown',
        timestamp: new Date().toISOString(),
      },
    };

    // Return formatted JSON
    return new NextResponse(JSON.stringify(healthResponse, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET Error:', error);
    const errorResponse = {
      status: 'error',
      message: 'Auth system error',
      timestamp: new Date().toISOString(),
    };
    return new NextResponse(JSON.stringify(errorResponse, null, 2), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}