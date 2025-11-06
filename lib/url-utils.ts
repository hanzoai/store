/**
 * Validates and sanitizes a URL for safe usage
 * @param url - The URL to validate
 * @returns The sanitized URL or null if invalid
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    // Add https:// if no protocol is specified
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    
    // Parse and validate the URL
    const parsedUrl = new URL(urlWithProtocol);
    
    // Only allow http and https protocols
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return null;
    }
    
    // Return the sanitized URL
    return parsedUrl.toString();
  } catch {
    // Invalid URL
    return null;
  }
}
