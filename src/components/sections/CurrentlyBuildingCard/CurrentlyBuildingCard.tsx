'use client';

import { Badge } from '@/components/ui/primitives';
import { Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CurrentlyBuildingCardProps } from './CurrentlyBuildingCard.types';
import type { CurrentWork } from '@/lib/types';

/**
 * Fallback data if MDX file can't be loaded
 */
const DEFAULT_CURRENT_WORK: CurrentWork = {
  title: 'Why `cat` in Bash is Bad for AI Agents',
  description:
    'Exploring why popular bash commands cause unexpected behavior in autonomous agents...',
  stack: ['Bash', 'AI Agents', 'CLI'],
  publishedAt: new Date().toISOString(),
};

/**
 * CurrentlyBuildingCard Component
 * Shows what's currently being worked on
 * Data is loaded from src/content/current-work.mdx
 */
export function CurrentlyBuildingCard({ className, currentWork }: CurrentlyBuildingCardProps) {
  // Use provided data or fallback to default
  const work = currentWork || DEFAULT_CURRENT_WORK;
  return (
    <div
      className={cn(
        'brutal-card p-6 relative flex flex-col bg-bg-elevated h-full',
        'border-[3px] border-foreground shadow-[6px_6px_0px_0px] shadow-foreground',
        className
      )}
    >
      {/* Header with Status and Icon */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="text-xs font-bold">
          WORKING_ON
        </Badge>
        <div className="w-8 h-8 bg-primary flex items-center justify-center border-[2px] border-foreground shadow-[3px_3px_0px_0px] shadow-foreground">
          <Hammer className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Project Title */}
      <h3 className="font-mono text-lg font-bold text-foreground uppercase mb-3 leading-tight">
        {work.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-foreground/70 mb-4">{work.description}</p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2">
        {work.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-bold bg-bg-elevated border-[2px] border-foreground font-mono uppercase text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
