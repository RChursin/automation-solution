// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;

    // Redirect root to home for authenticated users
    if (path === '/' && req.nextauth.token) {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Allow public routes
        if (
          path.startsWith('/login') ||
          path.startsWith('/signup') ||
          path.startsWith('/error') ||
          path.startsWith('/api/auth')
        ) {
          return true;
        }
        
        // Protect other routes
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
      error: '/error',
    },
  }
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};