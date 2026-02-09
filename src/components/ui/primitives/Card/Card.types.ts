import { ReactNode } from 'react';

export interface BaseCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

// Variant props - using type alias to avoid empty interface warning
export type DefaultCardProps = BaseCardProps;
export type ElevatedCardProps = BaseCardProps;
export type DarkCardProps = BaseCardProps;

export type CardVariantProps = DefaultCardProps | ElevatedCardProps | DarkCardProps;

// Main Card component props
export interface CardProps extends BaseCardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  hoverable?: boolean;
}

// Subcomponent props
export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}
