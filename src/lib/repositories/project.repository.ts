import { Project, Result } from '@/lib/types';
import { BaseRepository } from './base.repository';
import { FileSystemAdapter } from './file-system.adapter';
import type { IProjectRepository } from './content.repository.interface';

/**
 * Project Repository Implementation
 * Single Responsibility: Manages project data access
 */
export class ProjectRepository extends BaseRepository<Project> implements IProjectRepository {
  protected readonly directory = 'projects';

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
      technologies: (frontmatter.technologies || []) as readonly string[],
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
