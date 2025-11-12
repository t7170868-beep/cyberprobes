import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/videos - Get all videos
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is admin
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const published = url.searchParams.get('published');
    
    let where = {};
    if (published !== null) {
      where = { published: published === 'true' };
    }
    
    const videos = await prisma.video.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(videos);
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch videos' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/videos - Create a new video
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is admin
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse the request body
    const body = await req.json();
    
    // Validate required fields
    if (!body.title || !body.url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      );
    }
    
    // Create a new video
    const video = await prisma.video.create({
      data: {
        title: body.title,
        description: body.description || null,
        url: body.url,
        published: body.published ?? true,
      }
    });
    
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to create video' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 