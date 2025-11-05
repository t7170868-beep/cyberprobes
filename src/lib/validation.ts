/**
 * Validation utilities for API routes
 * Includes content-type validation and request size limits
 */

import { NextRequest } from 'next/server';

/**
 * Validate Content-Type header
 * @param request Next.js request
 * @param expectedType Expected content type (e.g., 'application/json')
 * @returns Error response if invalid, null if valid
 */
export function validateContentType(
  request: NextRequest,
  expectedType: string = 'application/json'
): Response | null {
  const contentType = request.headers.get('content-type');
  
  if (!contentType || !contentType.includes(expectedType)) {
    return new Response(
      JSON.stringify({ error: `Content-Type must be ${expectedType}` }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  return null;
}

/**
 * Validate request body size
 * @param request Next.js request
 * @param maxSize Maximum size in bytes (default: 1MB)
 * @returns Error response if too large, null if valid
 */
export async function validateBodySize(
  request: NextRequest,
  maxSize: number = 1024 * 1024 // 1MB default
): Promise<Response | null> {
  const contentLength = request.headers.get('content-length');
  
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (size > maxSize) {
      return new Response(
        JSON.stringify({ 
          error: `Request body too large. Maximum size: ${maxSize / 1024 / 1024}MB` 
        }),
        {
          status: 413,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
  
  return null;
}

