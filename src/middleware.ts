import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    const { pathname } = request.nextUrl;

    // Skip middleware for NextAuth API routes to prevent interference
    if (pathname.includes('/api/auth')) {
      return NextResponse.next();
    }

    // Skip middleware for error pages
    if (pathname.includes('/auth/error')) {
      return NextResponse.next();
    }

    // TEMPORARY: Bypass all authentication checks for testing
    return NextResponse.next();

    /*
    // Admin routes require authentication and admin role
    if (pathname.startsWith('/dashboard/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      
      // Check for admin role in the token
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // Course detail routes require authentication (but not the main courses listing page)
    if (pathname.startsWith('/courses/') && pathname !== '/courses') {
      if (!token) {
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url));
      }
    }

    // Dashboard routes require authentication
    if (pathname.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }

    // Redirect logged-in users from login page to dashboard
    if (pathname.startsWith('/auth/login') && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
    */
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of any errors, allow the request to continue
    // This prevents auth issues from breaking the site
    return NextResponse.next();
  }
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/courses/:path*']
}; 