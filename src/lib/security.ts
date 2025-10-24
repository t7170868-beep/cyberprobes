/**
 * Security utilities for CyberProbes
 * Includes password validation, input sanitization, and other security functions
 */

import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Common password patterns to check against
const COMMON_PASSWORDS = [
  'password', 'admin', 'welcome', '12345', '123456', 'qwerty',
  'cybersecurity', 'security', 'letmein', 'abc123', 'admin123',
  'password123', 'test123', 'welcome123', 'P@ssw0rd'
];

/**
 * Validates a password against security requirements
 * @param password The password to validate
 * @returns Object with validation result and any error messages
 */
export function validatePassword(password: string): { 
  isValid: boolean;
  errors: string[];
} {
  const errors = [];
  
  // Check password length
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long');
  }
  
  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Check for numbers
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for common passwords
  if (COMMON_PASSWORDS.some(commonPw => 
    password.toLowerCase().includes(commonPw.toLowerCase())
  )) {
    errors.push('Password contains a common password pattern');
  }
  
  // Check for sequential characters
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/i.test(password)) {
    errors.push('Password contains sequential characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Zod schema for user registration
 */
export const userRegistrationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(12, { message: 'Password must be at least 12 characters' })
    .refine(
      (password) => /[A-Z]/.test(password),
      { message: 'Password must contain at least one uppercase letter' }
    )
    .refine(
      (password) => /[a-z]/.test(password),
      { message: 'Password must contain at least one lowercase letter' }
    )
    .refine(
      (password) => /[0-9]/.test(password),
      { message: 'Password must contain at least one number' }
    )
    .refine(
      (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      { message: 'Password must contain at least one special character' }
    ),
  role: z.enum(['USER', 'ADMIN']).default('USER')
});

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'ul', 'ol', 'li',
      'strong', 'em', 'a', 'img', 'pre', 'code', 'blockquote', 'table', 
      'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'target', 'rel'
    ]
  });
}

/**
 * Generates a secure random token
 * @param length Token length (default: 32)
 * @returns Random token
 */
export function generateSecureToken(length: number = 32): string {
  return Array.from(
    new Uint8Array(length)
  ).map(() => 
    Math.floor(Math.random() * 36).toString(36)
  ).join('');
} 