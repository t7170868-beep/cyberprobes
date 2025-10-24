import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

// PUT /api/user/profile - Update user profile
export async function PUT(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the user ID from the session
    const userId = session.user.id;
    
    // Parse the request body
    const body = await req.json();
    const { name, email, currentPassword, newPassword } = body;
    
    // Check if email is unique when changing
    if (email && email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already in use' },
          { status: 400 }
        );
      }
    }
    
    // Prepare update data
    const updateData: any = {};
    
    if (name) {
      updateData.name = name;
    }
    
    if (email) {
      updateData.email = email;
    }
    
    // If changing password
    if (newPassword) {
      // Verify current password
      if (!currentPassword) {
        return NextResponse.json(
          { message: 'Current password is required to set a new password' },
          { status: 400 }
        );
      }
      
      // Get user with password
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }
      
      // Check current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password || ''
      );
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // Don't return the password
      }
    });
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 