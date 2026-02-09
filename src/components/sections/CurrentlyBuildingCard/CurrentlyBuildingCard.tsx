'use client';

import { Badge } from '@/components/ui/primitives';
import { Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CurrentlyBuildingCardProps {
  className?: string;
}

/**
 * CurrentlyBuildingCard Component
 * Shows what's currently being worked on
 */
export function CurrentlyBuildingCard({ className }: CurrentlyBuildingCardProps) {
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
        Why `cat` in Bash is Bad for AI Agents
      </h3>

      {/* Mysterious Description */}
      <p className="text-sm text-foreground/70 mb-4">
        Exploring why popular bash commands cause unexpected behavior in autonomous agents...
      </p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 text-xs font-bold bg-bg-elevated border-[2px] border-foreground font-mono uppercase text-foreground">
          Bash
        </span>
        <span className="px-2 py-1 text-xs font-bold bg-bg-elevated border-[2px] border-foreground font-mono uppercase text-foreground">
          AI Agents
        </span>
        <span className="px-2 py-1 text-xs font-bold bg-bg-elevated border-[2px] border-foreground font-mono uppercase text-foreground">
          CLI
        </span>
      </div>
    </div>
  );
}
