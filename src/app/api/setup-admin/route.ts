import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

// This is a one-time setup route - disable after first admin is created
async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
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

    return {
      success: true,
      message: 'Admin user created successfully',
      email: admin.email,
      password: 'admin123',
      status: 200
    };
  } catch (error) {
    console.error('Error creating admin:', error);
    return {
      success: false,
      error: 'Failed to create admin user',
      details: error instanceof Error ? error.message : 'Unknown error',
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

