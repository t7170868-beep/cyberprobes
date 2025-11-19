import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import FALLBACK_COURSES from '@/data/fallbackCourses';

// GET /api/courses/[id] - Get a specific course by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    let course = null;

    try {
      course = await prisma.course.findUnique({
        where: { id },
        include: {
          materials: true,
          modules: {
            include: {
              materials: {
                orderBy: { order: 'asc' }
              }
            },
            orderBy: { order: 'asc' }
          }
        }
      });
    } catch (dbError) {
      console.error('Error querying database for course, attempting fallback catalogue.', dbError);
    }

    if (!course) {
      const fallbackCourse = FALLBACK_COURSES.find(
        (fallback) => fallback.id === id || fallback.slug === id
      );

      if (fallbackCourse) {
        return NextResponse.json(fallbackCourse);
      }

      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[id] - Update a specific course
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    // Check authorization
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { title, description, slug, published } = body;
    
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // If slug is changed, check if new slug is already taken
    if (slug !== existingCourse.slug) {
      const slugExists = await prisma.course.findUnique({
        where: { slug }
      });
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'A course with this slug already exists' },
          { status: 400 }
        );
      }
    }
    
    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        slug,
        published,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id] - Delete a specific course
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    // Check authorization
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Delete course (cascade delete will remove materials too)
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
} 