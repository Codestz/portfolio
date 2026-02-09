/**
 * BadgeGrid Component Types
 */

export interface BadgeGridItem {
  id?: string;
  label: string;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export interface BadgeGridProps {
  badges: (string | BadgeGridItem)[];
  variant?: 'default' | 'primary' | 'inverse';
  className?: string;
}
