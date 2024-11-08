// apps/nextapp/src/app/api/auth/_log/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  console.log('Auth Log:', data);
  return NextResponse.json({ success: true });
}