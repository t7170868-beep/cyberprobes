import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/blogs - Get all blogs
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const published = url.searchParams.get('published');
    
    let where = {};
    if (published === 'true') {
      where = { published: true };
    } else if (published === 'false') {
      where = { published: false };
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, slug, image, published = false } = body;
    
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        slug,
        image,
        published,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
} 