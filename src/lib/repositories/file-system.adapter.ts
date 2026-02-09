/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Result } from '@/lib/types';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * File System Adapter
 * Handles all file system operations with error handling
 * Single Responsibility: File I/O operations
 */
export class FileSystemAdapter {
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
