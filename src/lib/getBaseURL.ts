/**
 * Get the base URL for the application.
 * Provides a safe fallback to prevent build-time errors when environment variables are missing.
 * 
 * @returns The base URL string, either from NEXT_PUBLIC_BASE_URL or a hardcoded fallback
 */
export function getBaseURL(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
    "https://main.d1ce8jq8iz0ibb.amplifyapp.com"
  );
}

/**
 * Get the base URL as a URL object for use in metadata.
 * Provides a safe fallback to prevent build-time errors.
 * 
 * @returns A URL object with the base URL
 */
export function getBaseURLObject(): URL {
  return new URL(getBaseURL());
}

