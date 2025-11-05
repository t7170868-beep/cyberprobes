'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rateLimit';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Rate limiting for file uploads
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId, RATE_LIMITS.UPLOAD);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many upload attempts. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMITS.UPLOAD.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          }
        }
      );
    }
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert type to lowercase for comparison
    const typeNormalized = type.toLowerCase();

    // Validate file type (both MIME type and file extension)
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
    const allowedVideoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];
    const allowedDocumentTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedDocumentExtensions = ['pdf', 'doc', 'docx'];
    
    // Get file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
    let fileType = '';
    
    if ((typeNormalized === 'video' || typeNormalized === 'VIDEO') && allowedVideoTypes.includes(file.type) && allowedVideoExtensions.includes(fileExtension)) {
      fileType = 'videos';
    } else if ((typeNormalized === 'document' || typeNormalized === 'DOCUMENT' || typeNormalized === 'pdf' || typeNormalized === 'PDF') && allowedDocumentTypes.includes(file.type) && allowedDocumentExtensions.includes(fileExtension)) {
      fileType = 'documents';
    } else if ((typeNormalized === 'image' || typeNormalized === 'IMAGE') && allowedImageTypes.includes(file.type) && allowedImageExtensions.includes(fileExtension)) {
      fileType = 'images';
    } else {
      return NextResponse.json(
        { error: `Invalid file type: MIME type ${file.type} or extension .${fileExtension} not allowed for material type: ${type}. 
        Video formats: MP4, WebM, OGG, MOV, AVI, MKV. 
        Document formats: PDF, DOC, DOCX. 
        Image formats: JPG, PNG, GIF, WebP.` },
        { status: 400 }
      );
    }
    
    // Check file size - 100MB limit
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 100MB limit' },
        { status: 400 }
      );
    }
    
    // Store files outside public directory for security
    // Files will be served via authenticated API endpoint
    const uploadsDir = join(process.cwd(), 'uploads', fileType);
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    // Generate unique filename (fileExtension already extracted above)
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);
    
    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);
    
    // Return the file identifier (not the full path for security)
    // Files should be accessed via /api/files/[id] endpoint with authentication
    const fileId = fileName.replace(/\.[^/.]+$/, ''); // Remove extension for ID
    
    return NextResponse.json({ 
      success: true, 
      fileId: fileId,
      fileType: file.type,
      fileName: file.name,
      size: file.size 
    });
    
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to upload file' 
      : (error as Error).message;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 