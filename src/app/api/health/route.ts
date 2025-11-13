import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasPublicBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
      publicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'not set',
      nextAuthUrl: process.env.NEXTAUTH_URL || 'not set',
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

