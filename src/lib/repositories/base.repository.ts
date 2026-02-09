import { Result } from '@/lib/types';

/**
 * Base Repository
 * Abstract base class with common repository methods
 * Open/Closed Principle: Open for extension, closed for modification
 */
export abstract class BaseRepository<T> {
  protected abstract readonly directory: string;

  /**
   * Find all items
   */
  abstract findAll(): Promise<Result<readonly T[]>>;

  /**
   * Find item by slug
   */
  abstract findBySlug(slug: string): Promise<Result<T | null>>;

  /**
   * Find featured items
   */
  abstract findFeatured(limit?: number): Promise<Result<readonly T[]>>;
}
