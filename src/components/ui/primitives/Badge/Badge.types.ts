import { HTMLAttributes } from 'react';
import { BadgeVariant } from '@/lib/types/ui.types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pill?: boolean;
}
