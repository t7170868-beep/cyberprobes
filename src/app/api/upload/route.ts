'use server';

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
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

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
    const allowedDocumentTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    let fileType = '';
    
    if ((typeNormalized === 'video' || typeNormalized === 'VIDEO') && allowedVideoTypes.includes(file.type)) {
      fileType = 'videos';
    } else if ((typeNormalized === 'document' || typeNormalized === 'DOCUMENT' || typeNormalized === 'pdf' || typeNormalized === 'PDF') && allowedDocumentTypes.includes(file.type)) {
      fileType = 'documents';
    } else if ((typeNormalized === 'image' || typeNormalized === 'IMAGE') && allowedImageTypes.includes(file.type)) {
      fileType = 'images';
    } else {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type} for material type: ${type}. 
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
    
    // Create directory structure if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', fileType);
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);
    
    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);
    
    // Return the relative path for client-side use
    const publicPath = `/uploads/${fileType}/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      filePath: publicPath,
      fileType: file.type,
      fileName: file.name,
      size: file.size 
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 