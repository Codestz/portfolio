'use client';

import { AlertCircle, Check, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TokenComparisonProps, TokenApproach } from './TokenComparison.types';

/**
 * Format tokens in k notation (like Claude Code)
 * 3500 -> 3.5k
 * 14000 -> 14k
 */
function formatTokens(tokens: number): string {
  if (tokens >= 1000) {
    const k = tokens / 1000;
    return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
  }
  return `${tokens}`;
}

/**
 * TokenComparison Component
 * Visual side-by-side comparison of token costs and efficiency
 * Shows approaches with step-by-step token accumulation
 * Follows Neo-Brutalist design with thick borders and shadows
 */
export function TokenComparison({ title, approaches, className }: TokenComparisonProps) {
  const [approach1, approach2] = approaches;

  // Calculate totals if not provided
  const total1 = approach1.totalTokens ?? approach1.steps.reduce((sum, s) => sum + s.tokens, 0);
  const total2 = approach2.totalTokens ?? approach2.steps.reduce((sum, s) => sum + s.tokens, 0);

  // Calculate efficiency gain
  const tokenSavings =
    total1 > total2 ? ((total1 - total2) / total1) * 100 : ((total2 - total1) / total2) * 100;
  const betterApproach = total1 < total2 ? 0 : 1;

  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-none border-[4px] border-foreground bg-white shadow-[12px_12px_0px_0px] shadow-black dark:bg-neutral-900',
        className
      )}
    >
      {/* Terminal-Style Header */}
      <div className="flex items-center gap-2 bg-black px-4 py-3 border-b-[4px] border-foreground">
        <div className="flex gap-2">
          <div className="h-3 w-3 bg-[var(--color-terminal-pink)] border border-black" />
          <div className="h-3 w-3 bg-[var(--color-terminal-yellow)] border border-black" />
          <div className="h-3 w-3 bg-[var(--color-terminal-cyan)] border border-black" />
        </div>
        <span className="ml-2 font-mono text-[10px] font-bold text-white uppercase tracking-widest">
          {title}
        </span>
        <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-white/70 uppercase">
          <TrendingDown size={12} />
          Token Efficiency
        </span>
      </div>

      {/* Approaches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-[4px] lg:divide-y-0 lg:divide-x-[4px] divide-foreground">
        <ApproachPanel approach={approach1} isBetter={betterApproach === 0} />
        <ApproachPanel approach={approach2} isBetter={betterApproach === 1} />
      </div>

      {/* Savings Footer */}
      <div className="border-t-[4px] border-foreground bg-neutral-100 px-6 py-4 dark:bg-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs font-bold uppercase text-neutral-900 dark:text-white">
            Token Savings:{' '}
            <span className="text-green-600 dark:text-green-400">{tokenSavings.toFixed(0)}%</span>
          </span>
          <div className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
            Better approach:{' '}
            <span className="font-bold text-neutral-900 dark:text-white">
              {approaches[betterApproach].name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ApproachPanel - Individual approach column
 */
function ApproachPanel({ approach, isBetter }: { approach: TokenApproach; isBetter: boolean }) {
  const colorMap = {
    red: {
      border: 'border-red-500',
      bg: 'bg-red-500',
      text: 'text-red-600 dark:text-red-400',
      bgLight: 'bg-red-50 dark:bg-red-500/10',
      icon: AlertCircle,
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-500',
      text: 'text-green-600 dark:text-green-400',
      bgLight: 'bg-green-50 dark:bg-green-500/10',
      icon: Check,
    },
    blue: {
      border: 'border-blue-500',
      bg: 'bg-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      bgLight: 'bg-blue-50 dark:bg-blue-500/10',
      icon: Check,
    },
    purple: {
      border: 'border-purple-500',
      bg: 'bg-purple-500',
      text: 'text-purple-600 dark:text-purple-400',
      bgLight: 'bg-purple-50 dark:bg-purple-500/10',
      icon: Check,
    },
  };

  const colors = colorMap[approach.color];
  const Icon = colors.icon;
  const total = approach.totalTokens ?? approach.steps.reduce((sum, s) => sum + s.tokens, 0);

  return (
    <div className="p-6 bg-white dark:bg-neutral-900">
      {/* Approach Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={colors.text} size={20} strokeWidth={3} />
          <h4 className="font-mono text-base font-bold uppercase tracking-wide text-neutral-900 dark:text-white">
            {approach.name}
          </h4>
        </div>
        {isBetter && (
          <div className="rounded-none border-[2px] border-foreground bg-yellow-300 px-2 py-1 font-mono text-xs font-bold uppercase text-black dark:bg-yellow-400 dark:text-black animate-pulse">
            Best
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-4">
        {approach.steps.map((step, index) => (
          <div
            key={index}
            className={cn('border-l-4 px-3 py-2 rounded-none', colors.border, colors.bgLight)}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm text-neutral-800 dark:text-neutral-200 flex-1">
                {step.action}
              </span>
              <div className="flex flex-col items-end gap-1">
                <span className={cn('font-mono text-xs font-bold', colors.text)}>
                  {formatTokens(step.tokens)}
                </span>
                {step.time && (
                  <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                    {step.time}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className={cn('border-t-[4px] pt-4 space-y-2', colors.border)}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
            Total Tokens
          </span>
          <span className={cn('font-mono text-lg font-bold', colors.text)}>
            {formatTokens(total)}
          </span>
        </div>

        {approach.totalCost && (
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
              Cost (Sonnet)
            </span>
            <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
              {approach.totalCost}
            </span>
          </div>
        )}

        {approach.successRate && (
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
              Success Rate
            </span>
            <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
              {approach.successRate}
            </span>
          </div>
        )}
      </div>

      {/* Visual Progress Bar */}
      <div className="mt-4 h-3 bg-neutral-200 dark:bg-neutral-700 border-[2px] border-foreground relative overflow-hidden">
        <div
          className={cn('h-full', colors.bg)}
          style={{
            width: `${Math.min((total / 10000) * 100, 100)}%`,
          }}
        />
      </div>
      <div className="mt-1 text-right font-mono text-xs text-neutral-600 dark:text-neutral-300">
        {((total / 10000) * 100).toFixed(1)}% of 10k token limit
      </div>
    </div>
  );
}
