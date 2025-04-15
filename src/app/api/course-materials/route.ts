import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET /api/course-materials - Get all course materials
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get('courseId');
    
    let where = {};
    if (courseId) {
      where = { courseId };
    }

    const materials = await prisma.courseMaterial.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        course: true
      }
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching course materials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course materials' },
      { status: 500 }
    );
  }
}

// POST /api/course-materials - Create a new course material
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authorization
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, type, url, courseId } = body;
    
    // Validate required fields
    if (!title || !type || !url || !courseId) {
      return NextResponse.json(
        { error: 'Missing required fields: title, type, url and courseId are required' },
        { status: 400 }
      );
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Create course material
    const material = await prisma.courseMaterial.create({
      data: {
        title,
        type,
        url,
        courseId
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error('Error creating course material:', error);
    return NextResponse.json(
      { error: 'Failed to create course material' },
      { status: 500 }
    );
  }
} 