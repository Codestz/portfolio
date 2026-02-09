import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Style manipulation utilities
 */

/**
 * Merge Tailwind CSS classes with proper precedence
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generate gradient class based on theme
 * @param from - Start color
 * @param to - End color
 * @param direction - Gradient direction
 * @returns Tailwind gradient class
 */
export function gradient(
  from: string,
  to: string,
  direction: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-tr' = 'to-br'
): string {
  return `bg-gradient-${direction} from-${from} to-${to}`;
}
