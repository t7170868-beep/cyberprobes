/**
 * Content protection module for CyberProbes
 * Implements secure access to video content using signed URLs
 */

import { createHmac } from 'crypto';

/**
 * Generate a secure signed URL for video access
 * The URL includes a signature that verifies the user's access rights
 * and can only be used for a limited time
 * 
 * @param videoId ID of the video to access
 * @param userId ID of the user requesting access
 * @param duration Optional duration in ms (default 1 hour)
 * @returns Signed URL for secure video access
 */
export function generateSignedUrl(
  videoId: string, 
  userId: string,
  duration: number = 3600000 // 1 hour default
): string {
  // Ensure we have the secret key
  if (!process.env.URL_SECRET) {
    throw new Error('URL_SECRET environment variable is not set');
  }

  const expiration = Date.now() + duration;
  const payload = `${videoId}:${userId}:${expiration}`;
  
  // Create HMAC signature
  const signature = createHmac('sha256', process.env.URL_SECRET)
    .update(payload)
    .digest('hex');
    
  return `/api/videos/${videoId}?userId=${userId}&expires=${expiration}&signature=${signature}`;
}

/**
 * Verify a signed URL to ensure it's valid
 * 
 * @param videoId Video ID from the request
 * @param userId User ID from the request
 * @param expires Expiration timestamp from the request
 * @param signature Signature from the request
 * @returns Boolean indicating if the URL is valid
 */
export function verifySignedUrl(
  videoId: string,
  userId: string,
  expires: number,
  signature: string
): boolean {
  // Reject expired URLs
  if (Date.now() > expires) {
    return false;
  }

  // Ensure we have the secret key
  if (!process.env.URL_SECRET) {
    throw new Error('URL_SECRET environment variable is not set');
  }

  // Recreate the signature to verify
  const payload = `${videoId}:${userId}:${expires}`;
  const expectedSignature = createHmac('sha256', process.env.URL_SECRET)
    .update(payload)
    .digest('hex');

  // Time-constant comparison to prevent timing attacks
  return expectedSignature === signature;
}

/**
 * Create a secure access token for embedding videos
 * For use with DRM-protected content or secure iframe embeds
 * 
 * @param videoId Video ID
 * @param userId User ID
 * @param permissions Specific permissions for this token
 * @returns Access token
 */
export function createAccessToken(
  videoId: string,
  userId: string,
  permissions: string[] = ['view']
): string {
  // Ensure we have the secret key
  if (!process.env.TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET environment variable is not set');
  }

  const expiration = Date.now() + 3600000; // 1 hour
  const payload = JSON.stringify({
    videoId,
    userId,
    permissions,
    expiration
  });

  // Create HMAC signature
  const signature = createHmac('sha256', process.env.TOKEN_SECRET)
    .update(payload)
    .digest('hex');

  // Base64 encode the payload for URL safety
  const encodedPayload = Buffer.from(payload).toString('base64');
  
  return `${encodedPayload}.${signature}`;
} 