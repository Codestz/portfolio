import { Post, Project, Result } from '@/lib/types';
import { contentRepository } from '@/lib/repositories';
import { CONTENT_CONFIG } from '@/lib/constants';
import type { IContentService } from './content.service.interface';

/**
 * Content Service Implementation
 * Implements business logic layer
 * Orchestrates repository operations and applies business rules
 */

class ContentService implements IContentService {
  // Post operations

  async getAllPosts(): Promise<Result<readonly Post[]>> {
    return await contentRepository.posts.findAll();
  }

  async getPostBySlug(slug: string): Promise<Result<Post>> {
    if (!slug || slug.trim() === '') {
      return {
        success: false,
        error: new Error('Post slug is required'),
      };
    }

    const result = await contentRepository.posts.findBySlug(slug);

    if (!result.success) {
      return result;
    }

    if (!result.data) {
      return {
        success: false,
        error: new Error(`Post not found: ${slug}`),
      };
    }

    return { success: true, data: result.data };
  }

  async getFeaturedPosts(limit?: number): Promise<Result<readonly Post[]>> {
    const effectiveLimit = limit ?? CONTENT_CONFIG.featuredPostsLimit;
    return await contentRepository.posts.findFeatured(effectiveLimit);
  }

  async getPostsByCategory(category: string): Promise<Result<readonly Post[]>> {
    if (!category || category.trim() === '') {
      return {
        success: false,
        error: new Error('Category is required'),
      };
    }

    return await contentRepository.posts.findByCategory(category);
  }

  // Project operations

  async getAllProjects(): Promise<Result<readonly Project[]>> {
    return await contentRepository.projects.findAll();
  }

  async getProjectBySlug(slug: string): Promise<Result<Project>> {
    if (!slug || slug.trim() === '') {
      return {
        success: false,
        error: new Error('Project slug is required'),
      };
    }

    const result = await contentRepository.projects.findBySlug(slug);

    if (!result.success) {
      return result;
    }

    if (!result.data) {
      return {
        success: false,
        error: new Error(`Project not found: ${slug}`),
      };
    }

    return { success: true, data: result.data };
  }

  async getFeaturedProjects(limit?: number): Promise<Result<readonly Project[]>> {
    const effectiveLimit = limit ?? CONTENT_CONFIG.featuredProjectsLimit;
    return await contentRepository.projects.findFeatured(effectiveLimit);
  }

  async getProjectsByTechnology(tech: string): Promise<Result<readonly Project[]>> {
    if (!tech || tech.trim() === '') {
      return {
        success: false,
        error: new Error('Technology is required'),
      };
    }

    return await contentRepository.projects.findByTechnology(tech);
  }

  // Metadata operations

  async getAllCategories(): Promise<Result<readonly string[]>> {
    const postsResult = await this.getAllPosts();

    if (!postsResult.success) {
      return postsResult;
    }

    const categories = new Set<string>();
    postsResult.data.forEach((post: Post) => categories.add(post.category));

    return {
      success: true,
      data: Array.from(categories).sort(),
    };
  }

  async getAllTechnologies(): Promise<Result<readonly string[]>> {
    const projectsResult = await this.getAllProjects();

    if (!projectsResult.success) {
      return projectsResult;
    }

    const technologies = new Set<string>();
    projectsResult.data.forEach((project: Project) => {
      project.technologies.forEach((tech: string) => technologies.add(tech));
    });

    return {
      success: true,
      data: Array.from(technologies).sort(),
    };
  }
}

/**
 * Export singleton instance
 * Ready for dependency injection
 */
export const contentService = new ContentService();
