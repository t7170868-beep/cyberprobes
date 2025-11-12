import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rateLimit';
import { logAuthAttempt } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    // Rate limiting for login
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId, RATE_LIMITS.AUTH);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMITS.AUTH.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          }
        }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Find user
    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ 
      where: {
        email: normalizedEmail
      }
    });

    if (!user) {
      await logAuthAttempt(normalizedEmail, false, ip);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.password) {
      await logAuthAttempt(normalizedEmail, false, ip, { reason: 'No password set' });
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      await logAuthAttempt(normalizedEmail, false, ip);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    await logAuthAttempt(normalizedEmail, true, ip);

    // Return user data
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Authentication failed' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

