/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, Project, Result } from '@/lib/types';
import { calculateReadingTime } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/constants';
import type { IPostRepository, IProjectRepository, IContentRepository } from './content.repository.interface';

/**
 * File system-based content repository
 * Implements Repository Pattern for data access abstraction
 */

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * Safe file system operations with error handling
 */
class FileSystemAdapter {
  /**
   * Get all MDX files from directory
   */
  static getMDXFiles(dir: string): Result<readonly string[]> {
    try {
      const fullPath = path.join(CONTENT_DIR, dir);

      if (!fs.existsSync(fullPath)) {
        return { success: true, data: [] };
      }

      const files = fs.readdirSync(fullPath).filter((file) => file.endsWith('.mdx'));
      return { success: true, data: files };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error reading files'),
      };
    }
  }

  /**
   * Read and parse MDX file
   */
  static readMDXFile(filePath: string): Result<{ frontmatter: any; content: string }> {
    try {
      const fullPath = path.join(CONTENT_DIR, filePath);
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        success: true,
        data: { frontmatter: data, content },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Unknown error reading file'),
      };
    }
  }
}

/**
 * Post Repository Implementation
 */
class PostRepository implements IPostRepository {
  private readonly directory = 'blog';

  async findAll(): Promise<Result<readonly Post[]>> {
    const filesResult = FileSystemAdapter.getMDXFiles(this.directory);

    if (!filesResult.success) {
      return filesResult;
    }

    const posts: Post[] = [];

    for (const file of filesResult.data) {
      const postResult = await this.findBySlug(file.replace('.mdx', ''));

      if (postResult.success && postResult.data) {
        posts.push(postResult.data);
      }
    }

    // Sort by date (newest first)
    const sorted = posts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return { success: true, data: sorted };
  }

  async findBySlug(slug: string): Promise<Result<Post | null>> {
    const fileResult = FileSystemAdapter.readMDXFile(`${this.directory}/${slug}.mdx`);

    if (!fileResult.success) {
      return { success: true, data: null };
    }

    const { frontmatter, content } = fileResult.data;

    const post: Post = {
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      publishedAt: frontmatter.publishedAt || new Date().toISOString(),
      updatedAt: frontmatter.updatedAt,
      category: frontmatter.category || 'general',
      tags: frontmatter.tags || [],
      author: frontmatter.author || APP_CONFIG.author.name,
      featured: frontmatter.featured || false,
      thumbnail: frontmatter.thumbnail,
      readTime: calculateReadingTime(content),
      content,
      type: frontmatter.type || 'experiment',
    };

    return { success: true, data: post };
  }

  async findByCategory(category: string): Promise<Result<readonly Post[]>> {
    const allPostsResult = await this.findAll();

    if (!allPostsResult.success) {
      return allPostsResult;
    }

    const filtered = allPostsResult.data.filter((post: Post) => post.category === category);

    return { success: true, data: filtered };
  }

  async findFeatured(limit?: number): Promise<Result<readonly Post[]>> {
    const allPostsResult = await this.findAll();

    if (!allPostsResult.success) {
      return allPostsResult;
    }

    const featured = allPostsResult.data.filter((post: Post) => post.featured);
    const limited = limit ? featured.slice(0, limit) : featured;

    return { success: true, data: limited };
  }
}

/**
 * Project Repository Implementation
 */
class ProjectRepository implements IProjectRepository {
  private readonly directory = 'projects';

  async findAll(): Promise<Result<readonly Project[]>> {
    const filesResult = FileSystemAdapter.getMDXFiles(this.directory);

    if (!filesResult.success) {
      return filesResult;
    }

    const projects: Project[] = [];

    for (const file of filesResult.data) {
      const projectResult = await this.findBySlug(file.replace('.mdx', ''));

      if (projectResult.success && projectResult.data) {
        projects.push(projectResult.data);
      }
    }

    // Sort by publishedAt date (newest first)
    const sorted = projects.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return { success: true, data: sorted };
  }

  async findBySlug(slug: string): Promise<Result<Project | null>> {
    const fileResult = FileSystemAdapter.readMDXFile(`${this.directory}/${slug}.mdx`);

    if (!fileResult.success) {
      return { success: true, data: null };
    }

    const { frontmatter, content } = fileResult.data;

    const project: Project = {
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      company: frontmatter.company || '',
      role: frontmatter.role || '',
      year: frontmatter.year || '',
      publishedAt: frontmatter.publishedAt || new Date().toISOString(),
      current: frontmatter.current || false,
      thumbnail: frontmatter.thumbnail,
      technologies: frontmatter.technologies || [],
      featured: frontmatter.featured || false,
      isPublic: frontmatter.isPublic || false,
      githubUrl: frontmatter.githubUrl,
      liveUrl: frontmatter.liveUrl,
      content,
    };

    return { success: true, data: project };
  }

  async findFeatured(limit?: number): Promise<Result<readonly Project[]>> {
    const allProjectsResult = await this.findAll();

    if (!allProjectsResult.success) {
      return allProjectsResult;
    }

    const featured = allProjectsResult.data.filter((project: Project) => project.featured);
    const limited = limit ? featured.slice(0, limit) : featured;

    return { success: true, data: limited };
  }

  async findByTechnology(tech: string): Promise<Result<readonly Project[]>> {
    const allProjectsResult = await this.findAll();

    if (!allProjectsResult.success) {
      return allProjectsResult;
    }

    const filtered = allProjectsResult.data.filter((project: Project) =>
      project.technologies.some((t: string) => t.toLowerCase() === tech.toLowerCase())
    );

    return { success: true, data: filtered };
  }
}

/**
 * Content Repository Factory
 * Implements Factory Pattern for repository creation
 */
class ContentRepository implements IContentRepository {
  readonly posts: IPostRepository;
  readonly projects: IProjectRepository;

  constructor() {
    this.posts = new PostRepository();
    this.projects = new ProjectRepository();
  }
}

/**
 * Export singleton instance
 * Dependency Injection ready
 */
export const contentRepository = new ContentRepository();
