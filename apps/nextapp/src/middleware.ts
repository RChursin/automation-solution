import { NextRequest, NextResponse } from 'next/server';

// Use simple cookie checking for middleware
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/notes/:path*', '/profile'], // Protect these paths
};