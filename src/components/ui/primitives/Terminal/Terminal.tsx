'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { TerminalProps, TerminalLine } from './Terminal.types';

/**
 * Terminal Component
 * An animated terminal simulation with Neo-Brutalist styling
 *
 * @example
 * ```tsx
 * <Terminal
 *   title="codestz_kernel_v1.0"
 *   lines={[
 *     { text: 'Initializing...', color: 'cyan', delay: 0 },
 *     { text: 'Loading modules...', color: 'white', delay: 500 },
 *   ]}
 *   skills={['Next.js 16', 'MCP', 'AI Workflows']}
 *   finalCommand="ls -la research/"
 * />
 * ```
 */
export function Terminal({
  title = 'codestz_kernel_v1.0',
  lines = [],
  skills = [],
  finalCommand = 'ls -la research/ai_recommendations',
  showProgress = true,
  className,
}: TerminalProps) {
  const [progress, setProgress] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [displayedSkills, setDisplayedSkills] = useState<string[]>([]);
  const [typedCommand, setTypedCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const hasStartedTyping = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (!showProgress) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 15) + 5;
        const next = Math.min(prev + increment, 100);
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [showProgress]);

  // Display lines with delays
  useEffect(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Reset state
    setDisplayedLines([]);
    setProgress(0);
    setDisplayedSkills([]);
    setTypedCommand('');
    hasStartedTyping.current = false;

    // Schedule new line displays
    lines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
      }, line.delay || index * 300);
      timeoutsRef.current.push(timeout);
    });

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [lines]);

  // Display skills after progress completes
  useEffect(() => {
    if (progress < 100) return;

    const skillTimeouts: NodeJS.Timeout[] = [];

    skills.forEach((skill, index) => {
      const timeout = setTimeout(() => {
        setDisplayedSkills((prev) => [...prev, skill]);
      }, index * 400);
      skillTimeouts.push(timeout);
    });

    return () => {
      skillTimeouts.forEach(clearTimeout);
    };
  }, [progress, skills]);

  // Type final command
  useEffect(() => {
    // Only run once when all skills are displayed
    if (displayedSkills.length !== skills.length || skills.length === 0) return;
    if (hasStartedTyping.current) return;

    hasStartedTyping.current = true;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < finalCommand.length) {
        setTypedCommand(finalCommand.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [displayedSkills.length, skills.length, finalCommand]);

  const getColorClass = (color?: string) => {
    switch (color) {
      case 'cyan':
        return 'text-[var(--color-terminal-cyan)]';
      case 'yellow':
        return 'text-[var(--color-terminal-yellow)]';
      case 'green':
        return 'text-[var(--color-terminal-green)]';
      case 'purple':
        return 'text-[var(--color-terminal-purple)]';
      case 'gray':
        return 'text-[var(--color-terminal-gray)]';
      case 'white':
      default:
        return 'text-white';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Terminal Header */}
      <div className="bg-black text-white px-4 py-2 border-x-4 border-t-4 border-black flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[var(--color-terminal-pink)] border border-black" />
          <div className="w-3 h-3 bg-[var(--color-terminal-yellow)] border border-black" />
          <div className="w-3 h-3 bg-[var(--color-terminal-cyan)] border border-black" />
        </div>
        <div className="text-[10px] font-bold tracking-widest uppercase">{title}</div>
        <div />
      </div>

      {/* Terminal Body */}
      <div className="brutal-terminal h-[450px] p-6 text-sm md:text-base overflow-hidden relative bg-[var(--color-terminal-bg)] border-4 border-black shadow-[12px_12px_0px_0px] shadow-black">
        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent" />

        <div className="space-y-1 relative z-10">
          {/* Initial lines */}
          {displayedLines.map((line, index) => (
            <p key={index} className={getColorClass(line.color)}>
              {line.prefix && <span className="text-zinc-500">{line.prefix} </span>}
              {line.text}
              {line.suffix && <span className={getColorClass(line.suffixColor || 'yellow')}> {line.suffix}</span>}
            </p>
          ))}

          {/* Progress bar */}
          {showProgress && progress > 0 && (
            <div className="flex gap-2 items-center">
              <span className="text-white"> &gt; Progress:</span>
              <div className="flex-grow bg-zinc-800 h-4 border border-zinc-700 overflow-hidden">
                <div
                  className="h-full bg-[var(--color-terminal-purple)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[var(--color-terminal-purple)] min-w-[40px]">{progress}%</span>
            </div>
          )}

          {/* Skills display */}
          {progress >= 100 && (
            <>
              <p className="text-[var(--color-terminal-gray)] italic mt-4">{'//'} Analyzing skills...</p>
              <div>
                {displayedSkills.map((skill, index) => (
                  <p key={index} className="text-[var(--color-terminal-green)]">
                    {'  '}[+] {skill}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* Command input */}
          {displayedSkills.length === skills.length && (
            <p className="text-white mt-4">
              {' '}
              codestz@portafolio:~${' '}
              <span className="text-[var(--color-terminal-cyan)]">{typedCommand}</span>
              {showCursor && <span className="inline-block w-2 h-4 bg-[var(--color-terminal-purple)] ml-1 align-middle" />}
            </p>
          )}
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-4">
          <div className="border-2 border-black bg-[var(--color-terminal-purple)] text-white px-3 py-1 text-xs font-bold uppercase">
            Ready
          </div>
          <div className="border-2 border-black bg-white text-black px-3 py-1 text-xs font-bold uppercase">UTF-8</div>
        </div>
        <p className="text-[10px] text-[var(--color-terminal-gray)] uppercase font-bold">uptime: 12:45:02</p>
      </div>
    </div>
  );
}
