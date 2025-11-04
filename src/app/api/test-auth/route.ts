import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  let prisma: PrismaClient | null = null;

  try {
    // Test environment variables
    const hasDbUrl = !!process.env.DATABASE_URL;
    const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET;
    const hasNextAuthUrl = !!process.env.NEXTAUTH_URL;
    
    // Test PostgreSQL (RDS) connection via Prisma
    let dbStatus = 'Not tested';
    let dbError = null;
    let userCount = 0;
    
    try {
      if (process.env.DATABASE_URL) {
        prisma = new PrismaClient();
        await prisma.$connect();
        
        // Get user count
        userCount = await prisma.user.count();
        
        dbStatus = `Connected - ${userCount} users found`;
      }
    } catch (error) {
      dbStatus = 'Failed';
      dbError = error instanceof Error ? error.message : 'Unknown error';
    } finally {
      if (prisma) {
        await prisma.$disconnect();
      }
    }

    return NextResponse.json({
      success: true,
      environment: {
        DATABASE_URL: hasDbUrl ? 'Set ✅' : 'Missing ❌',
        NEXTAUTH_SECRET: hasNextAuthSecret ? 'Set ✅' : 'Missing ❌',
        NEXTAUTH_URL: hasNextAuthUrl ? 'Set ✅' : 'Missing ❌',
        NEXTAUTH_URL_VALUE: process.env.NEXTAUTH_URL,
        NODE_ENV: process.env.NODE_ENV
      },
      database: {
        type: 'PostgreSQL (AWS RDS)',
        status: dbStatus,
        userCount: userCount,
        error: dbError
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

