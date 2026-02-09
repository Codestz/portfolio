import { Post, Result } from '@/lib/types';
import { calculateReadingTime } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/constants';
import { BaseRepository } from './base.repository';
import { FileSystemAdapter } from './file-system.adapter';
import type { IPostRepository } from './content.repository.interface';

/**
 * Post Repository Implementation
 * Single Responsibility: Manages blog post data access
 */
export class PostRepository extends BaseRepository<Post> implements IPostRepository {
  protected readonly directory = 'blog';

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
      tags: (frontmatter.tags || []) as readonly string[],
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
