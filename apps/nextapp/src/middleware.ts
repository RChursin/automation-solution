// src/middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    
    // Handle root path redirect
    if (path === '/') {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Public paths that don't require authentication
        if (
          path === '/' ||
          path === '/login' ||
          path === '/signup' ||
          path.startsWith('/api/auth') ||
          path.startsWith('/_next') ||
          path.startsWith('/static') ||
          path.includes('favicon')
        ) {
          return true;
        }
        
        // Protected routes require token
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
      error: '/error',
    },
  }
);

// Updated matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};