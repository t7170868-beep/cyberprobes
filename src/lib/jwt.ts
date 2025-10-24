import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  sessionId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
}

// Generate access token (short-lived: 15 minutes)
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m',
    issuer: 'cyberprobes',
    audience: 'cyberprobes-client'
  });
}

// Generate refresh token (long-lived: 7 days)
export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    issuer: 'cyberprobes',
    audience: 'cyberprobes-client'
  });
}

// Verify access token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'cyberprobes',
      audience: 'cyberprobes-client'
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Access token verification failed:', error);
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'cyberprobes',
      audience: 'cyberprobes-client'
    }) as RefreshTokenPayload;
    return decoded;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

// Extract token from Authorization header
export function extractTokenFromHeader(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

// Generate session ID
export function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Token blacklist (in production, use Redis or database)
const tokenBlacklist = new Set<string>();

// Add token to blacklist
export function blacklistToken(token: string): void {
  tokenBlacklist.add(token);
}

// Check if token is blacklisted
export function isTokenBlacklisted(token: string): boolean {
  return tokenBlacklist.has(token);
}

// Rate limiting for token generation
const tokenGenerationAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function checkTokenGenerationRateLimit(identifier: string): boolean {
  const now = Date.now();
  const attempts = tokenGenerationAttempts.get(identifier);
  
  if (!attempts) {
    tokenGenerationAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset counter if more than 1 hour has passed
  if (now - attempts.lastAttempt > 3600000) {
    tokenGenerationAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Allow maximum 10 token generations per hour per identifier
  if (attempts.count >= 10) {
    return false;
  }
  
  attempts.count++;
  attempts.lastAttempt = now;
  return true;
}
