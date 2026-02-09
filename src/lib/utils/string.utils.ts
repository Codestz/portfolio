/**
 * String manipulation utilities
 * Pure functions with no side effects
 */

/**
 * Create URL-friendly slug from string
 * @param text - Input text to slugify
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated text
 */
export function truncate(
  text: string,
  length: number,
  suffix: string = '...'
): string {
  if (!text || text.length <= length) return text;

  return text.slice(0, length).trim() + suffix;
}

/**
 * Calculate reading time for content
 * @param content - Text content
 * @param wordsPerMinute - Reading speed (default: 200)
 * @returns Reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  if (!content) return '0 min read';

  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}

/**
 * Capitalize first letter of string
 * @param text - Input text
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
