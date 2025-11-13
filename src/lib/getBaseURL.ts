/**
 * Default fallback base URL for the application.
 * Used when NEXT_PUBLIC_BASE_URL is not available or invalid.
 */
const DEFAULT_BASE_URL = "https://main.d1ce8jq8iz0ibb.amplifyapp.com";

/**
 * Get the base URL for the application.
 * Provides a safe fallback to prevent build-time errors when environment variables are missing.
 * 
 * @returns The base URL string, either from NEXT_PUBLIC_BASE_URL or a hardcoded fallback
 */
export function getBaseURL(): string {
  try {
    const envUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // Check if env var exists and is not empty
    if (!envUrl || typeof envUrl !== 'string') {
      return DEFAULT_BASE_URL;
    }
    
    const trimmed = envUrl.trim();
    
    // Return fallback if trimmed value is empty or doesn't look like a URL
    if (!trimmed || trimmed === '' || (!trimmed.startsWith('http://') && !trimmed.startsWith('https://'))) {
      return DEFAULT_BASE_URL;
    }
    
    return trimmed;
  } catch (error) {
    // If anything goes wrong, return the safe fallback
    return DEFAULT_BASE_URL;
  }
}

/**
 * Get the base URL as a URL object for use in metadata.
 * Provides a safe fallback to prevent build-time errors.
 * 
 * @returns A URL object with the base URL
 */
export function getBaseURLObject(): URL {
  try {
    const baseUrl = getBaseURL();
    
    // Final safety check before creating URL object
    if (!baseUrl || baseUrl === '') {
      return new URL(DEFAULT_BASE_URL);
    }
    
    // Try to create URL object, fallback if it fails
    try {
      return new URL(baseUrl);
    } catch {
      return new URL(DEFAULT_BASE_URL);
    }
  } catch (error) {
    // Ultimate fallback - always return a valid URL object
    return new URL(DEFAULT_BASE_URL);
  }
}

