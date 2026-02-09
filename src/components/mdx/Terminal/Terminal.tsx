'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { TerminalProps, TerminalLine } from './Terminal.types';

/**
 * Terminal Component (MDX)
 * Animated terminal simulation with typing effects
 * Shows prompts, commands, and responses in a terminal-style UI with animations
 */
export function Terminal({ lines, title = 'Terminal', className }: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Animate lines appearing
  useEffect(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Reset state - intentional setState in effect for animation sequence initialization
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required to reset animation state when lines change
    setDisplayedLines([]);
    setCurrentLineIndex(0);

    // Schedule line displays with staggered delays
    lines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLineIndex(index + 1);
      }, index * 600); // 600ms delay between lines
      timeoutsRef.current.push(timeout);
    });

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [lines]);

  return (
    <div className={cn('my-6 overflow-hidden', className)}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 bg-black px-4 py-3 border-[4px] border-foreground">
        <div className="flex gap-2">
          <div className="h-3 w-3 bg-[var(--color-terminal-pink)] border border-black" />
          <div className="h-3 w-3 bg-[var(--color-terminal-yellow)] border border-black" />
          <div className="h-3 w-3 bg-[var(--color-terminal-cyan)] border border-black" />
        </div>
        <span className="ml-2 font-mono text-[10px] font-bold text-white uppercase tracking-widest">
          {title}
        </span>
      </div>

      {/* Terminal Body */}
      <div className="bg-[var(--color-terminal-bg)] border-[4px] border-t-0 border-foreground p-6 font-mono text-sm min-h-[300px] relative shadow-[8px_8px_0px_0px] shadow-black">
        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent" />

        <div className="space-y-1 relative z-10">
          {displayedLines.map((line, index) => (
            <div
              key={index}
              className="animate-fadeIn"
              style={{
                animation: 'fadeIn 0.3s ease-in',
              }}
            >
              <TerminalLine {...line} isLast={index === currentLineIndex - 1} showCursor={showCursor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Terminal Line Component
 * Renders a single line in the terminal with appropriate styling
 */
function TerminalLine({ type, content, prompt, isLast, showCursor }: TerminalLine & { isLast?: boolean; showCursor?: boolean }) {
  if (type === 'input') {
    return (
      <div className="mb-3 flex">
        <span className="text-[var(--color-terminal-green)] font-bold select-none">{prompt || '❯'}</span>
        <span className="ml-2 text-white">
          {content}
          {isLast && showCursor && <span className="inline-block w-2 h-4 bg-[var(--color-terminal-purple)] ml-1 align-middle" />}
        </span>
      </div>
    );
  }

  if (type === 'output') {
    return (
      <div className="mb-3 text-[var(--color-terminal-gray)] whitespace-pre-line pl-4">
        {content}
      </div>
    );
  }

  if (type === 'success') {
    return (
      <div className="mb-3 flex items-start gap-2 text-[var(--color-terminal-green)]">
        <span className="select-none">✓</span>
        <span>{content}</span>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="mb-3 flex items-start gap-2 text-red-400">
        <span className="select-none">✗</span>
        <span>{content}</span>
      </div>
    );
  }

  if (type === 'comment') {
    return (
      <div className="mb-2 text-[var(--color-terminal-gray)] italic select-none">
        {'//'} {content}
      </div>
    );
  }

  if (type === 'divider') {
    return (
      <div className="my-4 border-t border-zinc-700" />
    );
  }

  // Default: plain text
  return <div className="mb-2 text-[var(--color-terminal-gray)]">{content}</div>;
}
