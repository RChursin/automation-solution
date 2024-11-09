// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const isAuth = !!req.nextauth.token;

    // Redirect from root to /home if authenticated
    if (path === '/' && isAuth) {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    // Redirect to login if not authenticated and trying to access protected route
    if (!isAuth && path.startsWith('/home')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        
        // Always allow auth-related paths
        if (path.startsWith('/api/auth') || path === '/login' || path === '/signup') {
          return true;
        }

        // Protect /home and other non-public paths
        if (path.startsWith('/home')) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/', '/home/:path*', '/login', '/signup']
};