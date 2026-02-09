'use client';

import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComparisonProps } from './Comparison.types';

/**
 * Comparison Component - Terminal Diff Style
 * Git-diff inspired comparison for showing wrong vs right approaches
 * Matches Neo-Brutalist aesthetic with thick borders and heavy shadows
 */
export function Comparison({ wrong, right, title, language, className }: ComparisonProps) {
  return (
    <div
      className={cn(
        'my-6 overflow-hidden rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-neutral-900 dark:shadow-[8px_8px_0px_rgba(255,255,255,1)]',
        className
      )}
    >
      {/* Terminal Header */}
      <div className="border-b-4 border-black bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 dark:border-white dark:bg-neutral-900 dark:text-neutral-300">
        {title || 'Comparison'}
      </div>

      {/* Diff Content */}
      <div className="space-y-0 bg-neutral-50 p-4 font-mono text-sm dark:bg-neutral-950">
        {/* Wrong approach - Red with minus */}
        <div className="flex items-start gap-2 border-l-4 border-red-500 bg-red-50/50 px-3 py-2 dark:bg-red-950/20">
          <X
            size={16}
            className="mt-0.5 flex-shrink-0 text-red-600 dark:text-red-500"
            strokeWidth={3}
          />
          <span className="text-red-700 dark:text-red-400">
            <span className="mr-2 opacity-50">-</span>
            <span className="whitespace-pre-wrap break-words">{wrong}</span>
          </span>
        </div>

        {/* Right approach - Green with plus */}
        <div className="flex items-start gap-2 border-l-4 border-green-500 bg-green-50/50 px-3 py-2 dark:bg-green-950/20">
          <Check
            size={16}
            className="mt-0.5 flex-shrink-0 text-green-600 dark:text-green-500"
            strokeWidth={3}
          />
          <span className="text-green-700 dark:text-green-400">
            <span className="mr-2 opacity-50">+</span>
            <span className="whitespace-pre-wrap break-words">{right}</span>
          </span>
        </div>
      </div>

      {/* Optional language indicator */}
      {language && (
        <div className="border-t-4 border-black bg-white px-4 py-1 text-right font-mono text-xs text-neutral-500 dark:border-white dark:bg-neutral-900 dark:text-neutral-400">
          {language}
        </div>
      )}
    </div>
  );
}
