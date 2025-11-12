'use client';

import { useEffect } from 'react';
import { logError, getUserFriendlyMessage, AppError } from '@/lib/errorHandler';

// Global Error Handler Component
export default function GlobalErrorHandler() {
  useEffect(() => {
    // Handle unhandled errors
    const handleError = (event: ErrorEvent) => {
      const error = event.error || new Error(event.message);
      logError(error, 'Unhandled Error');
      
      // Show user-friendly message
      const message = getUserFriendlyMessage(error);
      console.error('🔴 Unhandled error:', message);
      
      // Optionally show toast notification
      // toast.error(message);
    };

    // Handle unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason));
      
      logError(error, 'Unhandled Promise Rejection');
      
      const message = getUserFriendlyMessage(error);
      console.error('🔴 Unhandled promise rejection:', message);
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null; // This component doesn't render anything
}

