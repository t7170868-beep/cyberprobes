// Global Error Handler Utility
// This file provides centralized error handling for the entire application

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export class AppError extends Error {
  statusCode: number;
  code?: string;
  details?: any;

  constructor(message: string, statusCode: number = 500, code?: string, details?: any) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

// API Base URL Configuration
export const getApiBaseUrl = (): string => {
  // Check for environment variable first
  if (typeof window !== 'undefined') {
    // Client-side
    return process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  }
  // Server-side
  return process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

// Enhanced Fetch with Error Handling
export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders,
    });

    // Handle different response statuses
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let errorData: any = null;

      try {
        errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      // Handle specific error codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear auth and redirect
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
            window.location.href = '/auth/login';
          }
          throw new AppError('Unauthorized access. Please login again.', 401, 'UNAUTHORIZED');
        
        case 403:
          throw new AppError('Access forbidden. You do not have permission.', 403, 'FORBIDDEN');
        
        case 404:
          throw new AppError('Resource not found.', 404, 'NOT_FOUND');
        
        case 500:
          throw new AppError('Server error. Please try again later.', 500, 'SERVER_ERROR', errorData);
        
        default:
          throw new AppError(errorMessage, response.status, 'API_ERROR', errorData);
      }
    }

    return response;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new AppError(
        'Network error. Please check your internet connection.',
        0,
        'NETWORK_ERROR'
      );
    }

    // Re-throw AppError as-is
    if (error instanceof AppError) {
      throw error;
    }

    // Wrap unknown errors
    throw new AppError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      500,
      'UNKNOWN_ERROR'
    );
  }
};

// Safe JSON parsing with error handling
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

// Error logging utility
export const logError = (error: Error | AppError, context?: string) => {
  const errorInfo = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    ...(error instanceof AppError && {
      statusCode: error.statusCode,
      code: error.code,
      details: error.details,
    }),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('🔴 Error logged:', errorInfo);
  }

  // In production, you can send to error tracking service
  // Example: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with error tracking service
    // Sentry.captureException(error, { extra: errorInfo });
  }

  return errorInfo;
};

// User-friendly error messages
export const getUserFriendlyMessage = (error: Error | AppError): string => {
  if (error instanceof AppError) {
    switch (error.code) {
      case 'UNAUTHORIZED':
        return 'Please login to continue.';
      case 'FORBIDDEN':
        return 'You do not have permission to access this resource.';
      case 'NOT_FOUND':
        return 'The requested resource was not found.';
      case 'NETWORK_ERROR':
        return 'Unable to connect to the server. Please check your internet connection.';
      case 'SERVER_ERROR':
        return 'Server error occurred. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  return error.message || 'Something went wrong. Please try again.';
};

// Database connection check utility
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const response = await apiFetch('/api/debug');
    return response.ok;
  } catch {
    return false;
  }
};

// Auth token validation
export const validateAuthToken = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if (!token) return false;

  try {
    // Basic JWT validation (check if expired)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      // Token expired
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

