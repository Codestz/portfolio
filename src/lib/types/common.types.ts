/**
 * Common types used across the application
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: string;
}

/**
 * Result type for operations that can fail
 * Follows functional programming patterns
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Generic pagination type
 */
export interface Pagination<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}

/**
 * Loading state type
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
