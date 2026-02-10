import { FileSystemAdapter } from '@/lib/repositories/file-system.adapter';
import type { CurrentWork } from '@/lib/types';

/**
 * Load current work content from MDX file
 * Used by CurrentlyBuildingCard component
 */
export async function getCurrentWork(): Promise<CurrentWork | null> {
  try {
    const fileResult = FileSystemAdapter.readMDXFile('current-work.mdx');

    if (!fileResult.success) {
      console.error('Failed to load current work:', fileResult.error);
      return null;
    }

    if (!fileResult.data) {
      console.error('Failed to load current work: No data returned');
      return null;
    }

    const { frontmatter } = fileResult.data;

    return {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      stack: (frontmatter.stack || []) as readonly string[],
      publishedAt: frontmatter.publishedAt || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error loading current work:', error);
    return null;
  }
}

/**
 * Fallback data if MDX file can't be loaded
 */
export const DEFAULT_CURRENT_WORK: CurrentWork = {
  title: 'Why `cat` in Bash is Bad for AI Agents',
  description:
    'Exploring why popular bash commands cause unexpected behavior in autonomous agents...',
  stack: ['Bash', 'AI Agents', 'CLI'],
  publishedAt: new Date().toISOString(),
};
