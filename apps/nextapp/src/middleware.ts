// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    console.log(`Accessing path: ${path}`);
    console.log('Auth status:', !!req.nextauth.token);
    
    // Handle root path
    if (path === '/') {
      const isAuthenticated = !!req.nextauth.token;
      console.log('Root path, authenticated:', isAuthenticated);
      
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/home', req.url));
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        console.log('Auth check for path:', path, 'token:', !!token);
        
        // Allow auth-related paths
        if (
          path.startsWith('/login') ||
          path.startsWith('/signup') ||
          path.startsWith('/error') ||
          path.startsWith('/api/auth')
        ) {
          return true;
        }
        
        // All other paths require authentication
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