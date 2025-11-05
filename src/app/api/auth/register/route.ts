import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting for registration
    const clientId = getClientIdentifier(req);
    const rateLimit = checkRateLimit(clientId, RATE_LIMITS.AUTH);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many registration attempts. Please try again later.',
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
    const { name, email, password } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate name (only letters and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.trim()) || name.trim().length < 2) {
      return NextResponse.json({ error: 'Invalid name format' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate strong password (12 characters minimum, consistent with security.ts)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}$/;
    if (!passwordPattern.test(password)) {
      return NextResponse.json({ 
        error: 'Password must be at least 12 characters and include uppercase, lowercase, number, and special character' 
      }, { status: 400 });
    }

    // Sanitize email (convert to lowercase to prevent duplicates)
    const sanitizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Hash password with bcrypt (saltRounds = 12 for high security)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: sanitizedEmail,
        password: hashedPassword,
        role: 'USER', // Default role
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ 
      message: 'Registration successful',
      user: userWithoutPassword 
    }, { status: 201 });

  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : (error as Error).message;
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

