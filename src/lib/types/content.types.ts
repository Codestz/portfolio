/**
 * Content domain types
 * Strict type definitions for content entities
 */

export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly author: string;
  readonly featured: boolean;
  readonly thumbnail?: string;
  readonly readTime: string;
  readonly content: string;
  readonly type: 'experience' | 'experiment';
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly company: string;
  readonly role: string;
  readonly year: string;
  readonly publishedAt: string;
  readonly current: boolean;
  readonly thumbnail?: string;
  readonly technologies: readonly string[];
  readonly featured: boolean;
  readonly isPublic: boolean;
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly content: string;
}

export interface CurrentWork {
  readonly title: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly publishedAt: string;
}

export interface Frontmatter {
  readonly title: string;
  readonly description: string;
  readonly publishedAt: string;
  readonly [key: string]: unknown;
}

/**
 * Type guards for runtime type checking
 */
export function isPost(obj: unknown): obj is Post {
  return (
    typeof obj === 'object' && obj !== null && 'slug' in obj && 'title' in obj && 'content' in obj
  );
}

export function isProject(obj: unknown): obj is Project {
  return (
    typeof obj === 'object' && obj !== null && 'slug' in obj && 'title' in obj && 'company' in obj
  );
}
