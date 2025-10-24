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
    
    // Create response with security headers
    const response = NextResponse.next();
    
    // Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com",
      "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    
    response.headers.set('Content-Security-Policy', csp);
    
    // HTTPS redirect in production
    if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
      return NextResponse.redirect(`https://${request.headers.get('host')}${request.nextUrl.pathname}`, 301);
    }

    // Skip middleware for NextAuth API routes to prevent interference
    if (pathname.includes('/api/auth')) {
      return response;
    }

    // Skip middleware for error pages
    if (pathname.includes('/auth/error')) {
      return response;
    }

    // Admin routes require authentication and admin role
    if (pathname.startsWith('/dashboard/admin')) {
      if (!token) {
        const loginUrl = new URL('/auth/login', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        // Copy security headers to redirect response
        response.headers.forEach((value, key) => {
          redirectResponse.headers.set(key, value);
        });
        return redirectResponse;
      }
      
      // TEMPORARILY DISABLED: Check for admin role in the token
      // if (token.role !== 'ADMIN') {
      //   return NextResponse.redirect(new URL('/dashboard', request.url));
      // }
    }

    // Course detail routes require authentication (but not the main courses listing page)
    if (pathname.startsWith('/courses/') && pathname !== '/courses') {
      if (!token) {
        const loginUrl = new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        // Copy security headers to redirect response
        response.headers.forEach((value, key) => {
          redirectResponse.headers.set(key, value);
        });
        return redirectResponse;
      }
    }

    // Dashboard routes require authentication
    if (pathname.startsWith('/dashboard')) {
      if (!token) {
        const loginUrl = new URL('/auth/login', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        // Copy security headers to redirect response
        response.headers.forEach((value, key) => {
          redirectResponse.headers.set(key, value);
        });
        return redirectResponse;
      }
    }

    // Redirect logged-in users from login page to dashboard
    if (pathname.startsWith('/auth/login') && token) {
      const dashboardUrl = new URL('/dashboard', request.url);
      const redirectResponse = NextResponse.redirect(dashboardUrl);
      // Copy security headers to redirect response
      response.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value);
      });
      return redirectResponse;
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of any errors, allow the request to continue
    // This prevents auth issues from breaking the site
    const errorResponse = NextResponse.next();
    // Add basic security headers even on error
    errorResponse.headers.set('X-Frame-Options', 'DENY');
    errorResponse.headers.set('X-Content-Type-Options', 'nosniff');
    return errorResponse;
  }
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ]
}; 