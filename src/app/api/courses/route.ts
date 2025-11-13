import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/courses - Get all courses
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const published = url.searchParams.get('published');
    
    let where = {};
    if (published === 'true') {
      where = { published: true };
    } else if (published === 'false') {
      where = { published: false };
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        materials: true
      }
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('GET /api/courses failed', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch courses',
        details: process.env.NODE_ENV === 'production' ? undefined : errorMessage,
      },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create a new course
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
    const { title, description, slug, published = false } = body;
    
    // Validate required fields
    if (!title || !description || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug is already taken
    const existingCourse = await prisma.course.findUnique({
      where: { slug }
    });

    if (existingCourse) {
      return NextResponse.json(
        { error: 'A course with this slug already exists' },
        { status: 400 }
      );
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        description,
        slug,
        published,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to create course' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 