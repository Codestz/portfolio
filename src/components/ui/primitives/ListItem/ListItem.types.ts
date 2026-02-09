import { LiHTMLAttributes, ReactNode } from 'react';

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  href: string;
  title: string;
  index: number;
  badge?: ReactNode;
  disabled?: boolean;
}
