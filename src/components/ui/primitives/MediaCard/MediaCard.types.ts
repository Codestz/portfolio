import React from 'react';

/**
 * MediaCard Component Types
 */

export interface MediaCardProps {
  label?: string;
  onClick?: () => void;
  thumbnail?: string;
  icon?: 'play' | 'pause' | React.ReactNode;
  variant?: 'default' | 'dark';
  className?: string;
}
