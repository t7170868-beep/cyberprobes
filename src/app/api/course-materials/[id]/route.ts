import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/course-materials/[id] - Get a specific course material
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const material = await prisma.courseMaterial.findUnique({
      where: { id },
      include: {
        course: true
      }
    });

    if (!material) {
      return NextResponse.json(
        { error: 'Course material not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(material);
  } catch (error) {
    console.error('Error fetching course material:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course material' },
      { status: 500 }
    );
  }
}

// PUT /api/course-materials/[id] - Update a specific course material
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authorization
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const id = params.id;
    const body = await req.json();
    const { title, type, url, courseId } = body;
    
    // Check if material exists
    const existingMaterial = await prisma.courseMaterial.findUnique({
      where: { id },
    });
    
    if (!existingMaterial) {
      return NextResponse.json(
        { error: 'Course material not found' },
        { status: 404 }
      );
    }
    
    // If courseId is changed, check if new course exists
    if (courseId && courseId !== existingMaterial.courseId) {
      const courseExists = await prisma.course.findUnique({
        where: { id: courseId }
      });
      
      if (!courseExists) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
    }
    
    // Update course material
    const updatedMaterial = await prisma.courseMaterial.update({
      where: { id },
      data: {
        title,
        type,
        url,
        courseId: courseId || existingMaterial.courseId
      },
    });

    return NextResponse.json(updatedMaterial);
  } catch (error) {
    console.error('Error updating course material:', error);
    return NextResponse.json(
      { error: 'Failed to update course material' },
      { status: 500 }
    );
  }
}

// DELETE /api/course-materials/[id] - Delete a specific course material
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authorization
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const id = params.id;
    
    // Check if material exists
    const existingMaterial = await prisma.courseMaterial.findUnique({
      where: { id },
    });
    
    if (!existingMaterial) {
      return NextResponse.json(
        { error: 'Course material not found' },
        { status: 404 }
      );
    }
    
    // Delete course material
    await prisma.courseMaterial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course material:', error);
    return NextResponse.json(
      { error: 'Failed to delete course material' },
      { status: 500 }
    );
  }
} 