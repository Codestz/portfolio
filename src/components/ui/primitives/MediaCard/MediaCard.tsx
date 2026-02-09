'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';

export interface MediaCardProps {
  label?: string;
  onClick?: () => void;
  thumbnail?: string;
  icon?: 'play' | 'pause' | React.ReactNode;
  variant?: 'default' | 'dark';
  className?: string;
}

/**
 * MediaCard Component
 * Card for displaying playable media (video, audio) with play button
 * 
 * @example
 * <MediaCard label="Video Tutorial" onClick={() => {}} />
 * <MediaCard label="Demo" icon={<CustomIcon />} variant="dark" />
 */
export function MediaCard({
  label,
  onClick,
  thumbnail,
  icon = 'play',
  variant = 'dark',
  className,
}: MediaCardProps) {
  const variantStyles = {
    default: 'bg-bg-elevated',
    dark: 'bg-zinc-900',
  };

  const renderIcon = () => {
    if (icon === 'play') {
      return (
        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
      );
    }
    if (icon === 'pause') {
      return (
        <div className="flex gap-1">
          <div className="w-1 h-4 bg-white" />
          <div className="w-1 h-4 bg-white" />
        </div>
      );
    }
    return icon;
  };

  return (
    <div
      className={cn(
        'brutal-card p-2 flex items-center justify-center group cursor-pointer relative',
        'border-[3px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground',
        'hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px] hover:shadow-foreground transition-all',
        variantStyles[variant],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Badge Label */}
      {label && (
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="text-xs">
            {label}
          </Badge>
        </div>
      )}

      {/* Thumbnail or Icon */}
      {thumbnail ? (
        <Image src={thumbnail} alt={label || 'Media thumbnail'} className="w-full h-full object-cover" fill />
      ) : (
        <div className="w-16 h-16 border-4 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
          {renderIcon()}
        </div>
      )}
    </div>
  );
}
