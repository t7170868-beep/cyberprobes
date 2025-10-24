/**
 * Security logging module for CyberProbes
 * Handles logging authentication attempts, admin actions and security events
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Log authentication attempt
 * @param email User email
 * @param success Whether authentication was successful
 * @param ip User IP address
 * @param metadata Additional information
 */
export async function logAuthAttempt(
  email: string,
  success: boolean,
  ip: string,
  metadata: Record<string, unknown> = {}
) {
  console.log(`Auth attempt: ${email}, success: ${success}, IP: ${ip}`);
  
  // Store in database for audit purposes
  try {
    await prisma.auditLog.create({
      data: {
        action: 'AUTH_ATTEMPT',
        userId: email, // Use email as identifier since we may not have userId for failed attempts
        ipAddress: ip,
        details: JSON.stringify({
          success,
          timestamp: new Date().toISOString(),
          ...metadata
        })
      }
    });
  } catch (error) {
    console.error('Failed to log authentication attempt:', error);
  }
}

/**
 * Log admin actions for audit trail
 * @param userId User ID performing the action
 * @param action Action performed
 * @param details Details of the action
 */
export async function logAdminAction(
  userId: string,
  action: string,
  details: unknown
) {
  console.log(`Admin action: ${userId}, action: ${action}, details: ${JSON.stringify(details)}`);
  
  // Store in database for audit trail
  try {
    await prisma.auditLog.create({
      data: {
        action: `ADMIN_${action.toUpperCase()}`,
        userId,
        details: JSON.stringify({
          timestamp: new Date().toISOString(),
          data: details
        })
      }
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
}

/**
 * Log security event (suspicious activity, attacks, etc)
 * @param eventType Type of security event
 * @param severity Severity level
 * @param details Event details
 */
export async function logSecurityEvent(
  eventType: string,
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
  details: unknown
) {
  console.log(`Security event: ${eventType}, severity: ${severity}, details: ${JSON.stringify(details)}`);
  
  // Store in database
  try {
    await prisma.auditLog.create({
      data: {
        action: `SECURITY_${eventType.toUpperCase()}`,
        severity,
        details: JSON.stringify({
          timestamp: new Date().toISOString(),
          data: details
        })
      }
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
} 