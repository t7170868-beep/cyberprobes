/**
 * Rate limiting utility for API routes
 * Prevents brute force attacks and API abuse
 */

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store (for production, use Redis)
const rateLimitStore = new Map<string, RateLimitStore>();

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

/**
 * Default rate limit configurations
 */
export const RATE_LIMITS = {
  AUTH: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes
  API: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 requests per minute
  UPLOAD: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 uploads per minute
} as const;

/**
 * Check if request should be rate limited
 * @param identifier Unique identifier (IP address, user ID, etc.)
 * @param config Rate limit configuration
 * @returns Object with allowed status and reset time
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; resetTime: number; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // If no record or window expired, create new record
  if (!record || now > record.resetTime) {
    const resetTime = now + config.windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });

    // Cleanup old entries periodically
    if (rateLimitStore.size > 10000) {
      cleanupRateLimitStore();
    }

    return {
      allowed: true,
      resetTime,
      remaining: config.maxRequests - 1,
    };
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      resetTime: record.resetTime,
      remaining: 0,
    };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);

  return {
    allowed: true,
    resetTime: record.resetTime,
    remaining: config.maxRequests - record.count,
  };
}

/**
 * Cleanup expired entries from rate limit store
 */
function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client identifier from request
 * @param request Next.js request object (Request or NextRequest)
 * @returns Client identifier (IP address or user ID)
 */
export function getClientIdentifier(request: Request | { headers: Headers | { get: (name: string) => string | null } }): string {
  // Try to get IP from headers (for proxied requests)
  const headers = 'headers' in request ? request.headers : request;
  const forwarded = (headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const realIp = headers.get('x-real-ip');
  const ip = forwarded || realIp || 'unknown';

  return ip;
}

