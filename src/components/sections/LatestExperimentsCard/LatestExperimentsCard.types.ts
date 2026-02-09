import type { Post } from '@/lib/types';

/**
 * LatestExperimentsCard Component Types
 */

export interface ExperimentItem {
  id: string;
  title: string;
  badge?: string;
  badgeVariant?: 'default' | 'primary' | 'secondary';
  date?: string;
  href?: string;
  disabled?: boolean;
}

export interface LatestExperimentsCardProps {
  posts?: Post[];
  experiments?: ExperimentItem[];
  className?: string;
  animated?: boolean;
}
