import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// This is a one-time setup route - disable after first admin is created
async function createAdminUser() {
  let prisma: PrismaClient | null = null;
  
  try {
    // Create a fresh Prisma client with explicit configuration
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });

    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      await prisma.$disconnect();
      return {
        success: false,
        error: 'Admin user already exists',
        email: existingAdmin.email,
        status: 400
      };
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@cyberprobes.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    await prisma.$disconnect();
    
    return {
      success: true,
      message: 'Admin user created successfully',
      email: admin.email,
      password: 'admin123',
      status: 200
    };
  } catch (error) {
    console.error('Error creating admin:', error);
    
    if (prisma) {
      await prisma.$disconnect().catch(() => {});
    }
    
    return {
      success: false,
      error: 'Failed to create admin user',
      details: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
      status: 500
    };
  }
}

export async function POST() {
  const result = await createAdminUser();
  return NextResponse.json(
    { ...result },
    { status: result.status }
  );
}

export async function GET() {
  const result = await createAdminUser();
  return NextResponse.json(
    { ...result },
    { status: result.status }
  );
}

