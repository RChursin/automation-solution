// apps/nextapp/src/app/api/auth/providers/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    credentials: {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      signinUrl: "/api/auth/signin/credentials",
      callbackUrl: "/api/auth/callback/credentials"
    }
  });
}