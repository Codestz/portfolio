import { ReactNode } from 'react';

export interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  size?: 'sm' | 'default' | 'lg';
}
