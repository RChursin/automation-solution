// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const isAuth = !!req.nextauth.token;

    // Handle public routes
    if (path === '/') {
      return isAuth 
        ? NextResponse.redirect(new URL('/home', req.url))
        : NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        
        // Public routes
        if (
          path === '/login' ||
          path === '/signup' ||
          path.startsWith('/api/auth')
        ) {
          return true;
        }

        // Protected routes require token
        return !!token;
      },
    },
  }
);

// Protect all routes except public ones
export const config = {
  matcher: [
    '/',
    '/home',
    '/projects/:path*',
    '/blog/:path*',
    '/notes/:path*',
    '/profile/:path*',
    '/api/:path*',
  ]
};