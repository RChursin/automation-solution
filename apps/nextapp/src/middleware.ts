// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const isAuth = !!req.nextauth.token;

    // Handle www to non-www redirect
    if (req.nextUrl.hostname === 'www.thesource.build') {
      const newUrl = new URL(req.url);
      newUrl.hostname = 'thesource.build';
      return NextResponse.redirect(newUrl);
    }

    // Handle root path
    if (path === '/') {
      if (isAuth) {
        return NextResponse.redirect(new URL('/home', req.url));
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Handle auth paths when already authenticated
    if (isAuth && (path === '/login' || path === '/signup')) {
      return NextResponse.redirect(new URL('/home', req.url));
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
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/home',
    '/login',
    '/signup',
    '/projects/:path*',
    '/blog/:path*',
    '/notes/:path*',
    '/profile/:path*',
    '/api/:path*',
  ]
};