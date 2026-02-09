import { ReactNode } from 'react';

/**
 * HighlightText Component Types
 */

export interface HighlightTextProps {
  children: ReactNode;
  variant?: 'secondary' | 'primary' | 'underline';
  className?: string;
}
