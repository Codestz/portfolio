import { ReactNode } from 'react';

export interface CardListItem {
  id: string;
  content: ReactNode;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export interface CardListProps {
  title: string;
  icon?: ReactNode;
  items: CardListItem[];
  footer?: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  animated?: boolean;
}
