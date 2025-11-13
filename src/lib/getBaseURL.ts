/**
 * Get the base URL for the application.
 * Provides a safe fallback to prevent build-time errors when environment variables are missing.
 * 
 * @returns The base URL string, either from NEXT_PUBLIC_BASE_URL or a hardcoded fallback
 */
export function getBaseURL(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  // Return fallback if env var is missing, empty, or invalid
  if (!envUrl || envUrl === '') {
    return "https://main.d1ce8jq8iz0ibb.amplifyapp.com";
  }
  return envUrl;
}

/**
 * Get the base URL as a URL object for use in metadata.
 * Provides a safe fallback to prevent build-time errors.
 * 
 * @returns A URL object with the base URL
 */
export function getBaseURLObject(): URL {
  const baseUrl = getBaseURL();
  // Double-check that we have a valid URL string before creating URL object
  if (!baseUrl || baseUrl === '') {
    return new URL("https://main.d1ce8jq8iz0ibb.amplifyapp.com");
  }
  return new URL(baseUrl);
}

