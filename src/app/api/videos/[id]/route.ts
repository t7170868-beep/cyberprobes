import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { verifySignedUrl } from '@/lib/contentProtection';
import { logSecurityEvent } from '@/lib/logger';

// GET /api/videos/[id] - Get a specific video by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const expires = searchParams.get('expires');
    const signature = searchParams.get('signature');
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check if this is a secure URL request (has signature)
    if (signature && userId && expires) {
      // Validate expires parameter
      const expiresTimestamp = parseInt(expires, 10);
      if (isNaN(expiresTimestamp) || expiresTimestamp <= 0) {
        return NextResponse.json(
          { error: 'Invalid expiration timestamp' },
          { status: 400 }
        );
      }
      
      // Verify the signed URL
      const isValid = verifySignedUrl(
        id,
        userId,
        expiresTimestamp,
        signature
      );
      
      if (!isValid) {
        // Log unauthorized access attempt
        await logSecurityEvent(
          'INVALID_VIDEO_ACCESS',
          'MEDIUM',
          {
            videoId: id,
            userId,
            ip,
            reason: Date.now() > expiresTimestamp ? 'URL Expired' : 'Invalid Signature'
          }
        );
        
        return NextResponse.json(
          { error: 'Invalid or expired access link' },
          { status: 403 }
        );
      }
      
      // URL is valid, get the actual video stream URL
      const video = await prisma.video.findUnique({
        where: { id },
        select: { url: true }
      });
      
      if (!video) {
        return NextResponse.json(
          { error: 'Video not found' },
          { status: 404 }
        );
      }
      
      // Return the actual streaming URL
      return NextResponse.json({
        streamUrl: video.url,
        // Add a content security policy header
        headers: {
          'Content-Security-Policy': "default-src 'self'; media-src https://*.cyberprobes.edu https://*.cloudfront.net;"
        }
      });
    }
    
    // For regular API requests (not streaming), check for session
    const session = await getServerSession(authOptions);
    
    // Check authorization for API access
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // For admin/authorized users, return the full video object
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

// PUT /api/videos/[id] - Update a specific video
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check authorization
    if (!session || !session.user) {
      // Log unauthorized access attempt
      await logSecurityEvent(
        'UNAUTHORIZED_API_ACCESS',
        'HIGH',
        {
          endpoint: `/api/videos/${id}`,
          method: 'PUT',
          ip
        }
      );
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check for admin role
    if (session.user.role !== 'ADMIN') {
      await logSecurityEvent(
        'INSUFFICIENT_PERMISSIONS',
        'HIGH',
        {
          userId: session.user.id,
          endpoint: `/api/videos/${id}`,
          method: 'PUT',
          ip,
          requiredRole: 'ADMIN',
          actualRole: session.user.role
        }
      );
      
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
    const body = await req.json();
    const { title, description, url, published } = body;
    
    // Check if video exists
    const existingVideo = await prisma.video.findUnique({
      where: { id },
    });
    
    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    
    // Update video
    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        title,
        description,
        url,
        published,
      },
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

// DELETE /api/videos/[id] - Delete a specific video
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check authorization
    if (!session || !session.user) {
      await logSecurityEvent(
        'UNAUTHORIZED_API_ACCESS',
        'HIGH',
        {
          endpoint: `/api/videos/${id}`,
          method: 'DELETE',
          ip
        }
      );
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check for admin role
    if (session.user.role !== 'ADMIN') {
      await logSecurityEvent(
        'INSUFFICIENT_PERMISSIONS',
        'HIGH',
        {
          userId: session.user.id,
          endpoint: `/api/videos/${id}`,
          method: 'DELETE',
          ip,
          requiredRole: 'ADMIN',
          actualRole: session.user.role
        }
      );
      
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
    
    // Check if video exists
    const existingVideo = await prisma.video.findUnique({
      where: { id },
    });
    
    if (!existingVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }
    
    // Delete video
    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
} 