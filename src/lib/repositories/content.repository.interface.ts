import { Post, Project, Result } from '@/lib/types';

/**
 * Content Repository Interface
 * Defines contract for content data access
 * Follows Interface Segregation Principle
 */

export interface IPostRepository {
  findAll(): Promise<Result<readonly Post[]>>;
  findBySlug(slug: string): Promise<Result<Post | null>>;
  findByCategory(category: string): Promise<Result<readonly Post[]>>;
  findFeatured(limit?: number): Promise<Result<readonly Post[]>>;
}

export interface IProjectRepository {
  findAll(): Promise<Result<readonly Project[]>>;
  findBySlug(slug: string): Promise<Result<Project | null>>;
  findFeatured(limit?: number): Promise<Result<readonly Project[]>>;
  findByTechnology(tech: string): Promise<Result<readonly Project[]>>;
}

/**
 * Combined content repository interface
 */
export interface IContentRepository {
  posts: IPostRepository;
  projects: IProjectRepository;
}
