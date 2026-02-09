import { PostRepository } from './post.repository';
import { ProjectRepository } from './project.repository';
import type { IContentRepository, IPostRepository, IProjectRepository } from './content.repository.interface';

/**
 * Content Repository
 * Facade pattern: Provides unified interface to post and project repositories
 * Dependency Inversion: Depends on abstractions (interfaces), not concrete implementations
 */
export class ContentRepository implements IContentRepository {
  readonly posts: IPostRepository;
  readonly projects: IProjectRepository;

  constructor(
    postRepository: IPostRepository = new PostRepository(),
    projectRepository: IProjectRepository = new ProjectRepository()
  ) {
    this.posts = postRepository;
    this.projects = projectRepository;
  }
}

/**
 * Export singleton instance
 * Can be replaced with dependency injection if needed
 */
export const contentRepository = new ContentRepository();
