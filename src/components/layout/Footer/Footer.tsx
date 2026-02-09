'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { FooterProps } from './Footer.types';

/**
 * Footer Component
 * Terminal-style footer with system aesthetic
 */
export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'max-w-7xl mx-auto border-t-4 border-foreground pt-8 px-6 md:px-12 pb-6',
        'flex flex-wrap justify-between items-center gap-4',
        'font-bold text-xs uppercase',
        className
      )}
    >
      {/* Terminal Prompt */}
      <div className="font-mono">
        Root@{currentYear}:~$ sudo init portfolio
      </div>

      {/* System Links */}
      <div className="flex gap-4">
        <Link
          href="https://github.com/esteban-estrada"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary transition-colors"
        >
          GitHub
        </Link>
        <Link
          href="https://linkedin.com/in/esteban-estrada-01651b31b"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary transition-colors"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
