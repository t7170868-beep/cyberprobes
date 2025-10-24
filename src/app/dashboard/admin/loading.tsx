export default function AdminDashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Loading admin dashboard...</p>
      </div>
    </div>
  );
}

import { createHash } from 'crypto';

// Generate time-limited signed URLs
function generateSignedUrl(videoId: string, userId: string): string {
  const expiration = Date.now() + 3600000; // 1 hour
  const payload = `${videoId}:${userId}:${expiration}`;
  const signature = createHash('sha256')
    .update(payload)
    .digest('hex');
    
  return `/api/videos/${videoId}?userId=${userId}&expires=${expiration}&signature=${signature}`;
}

// src/lib/logger.ts
export function logAuthAttempt(email: string, success: boolean, ip: string) {
  console.log(`Auth attempt: ${email}, success: ${success}, IP: ${ip}`);
  // Store in database or external logging service
}

export function logAdminAction(userId: string, action: string, details: any) {
  console.log(`Admin action: ${userId}, action: ${action}, details: ${JSON.stringify(details)}`);
  // Store in database or external logging service
} 