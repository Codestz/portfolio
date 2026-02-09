import { Post, Project, Result } from '@/lib/types';

/**
 * Content Service Interface
 * Defines business logic operations
 * Separates business logic from data access (Repository) and presentation (Components)
 */

export interface IContentService {
  // Post operations
  getAllPosts(): Promise<Result<readonly Post[]>>;
  getPostBySlug(slug: string): Promise<Result<Post>>;
  getFeaturedPosts(limit?: number): Promise<Result<readonly Post[]>>;
  getPostsByCategory(category: string): Promise<Result<readonly Post[]>>;

  // Project operations
  getAllProjects(): Promise<Result<readonly Project[]>>;
  getProjectBySlug(slug: string): Promise<Result<Project>>;
  getFeaturedProjects(limit?: number): Promise<Result<readonly Project[]>>;
  getProjectsByTechnology(tech: string): Promise<Result<readonly Project[]>>;

  // Metadata operations
  getAllCategories(): Promise<Result<readonly string[]>>;
  getAllTechnologies(): Promise<Result<readonly string[]>>;
}
