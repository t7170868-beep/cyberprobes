import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// Get all users - admin only
export async function GET(request: NextRequest) {
  try {
    // Check if the request is from an authenticated admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: "Unauthorized: Only administrators can access user data" },
        { status: 403 }
      );
    }

    // Fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format dates for display
    const formattedUsers = users.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString().split('T')[0]
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching users" },
      { status: 500 }
    );
  }
}

// Create new user - admin only
export async function POST(request: NextRequest) {
  try {
    // Check if the request is from an authenticated admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: "Unauthorized: Only administrators can create new users" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, role = 'USER' } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        role: role as 'USER' | 'ADMIN',
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "An error occurred while creating user" },
      { status: 500 }
    );
  }
} 