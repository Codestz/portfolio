'use client';

import { useState } from 'react';
import { ChevronDown, CheckCircle2, AlertCircle, AlertTriangle, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToolCallProps } from './ToolCall.types';

/**
 * Format tokens in k notation (like Claude Code)
 */
function formatTokens(tokens: number): string {
  if (tokens >= 1000) {
    const k = tokens / 1000;
    return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
  }
  return `${tokens}`;
}

/**
 * ToolCall Component
 * Displays MCP/API tool calls with parameters and results
 * Collapsible sections for clean presentation
 * Follows Neo-Brutalist design with thick borders
 */
export function ToolCall({ tool, params, result, description, className }: ToolCallProps) {
  const [isParamsExpanded, setIsParamsExpanded] = useState(true);
  const [isResultExpanded, setIsResultExpanded] = useState(true);

  const statusConfig = {
    success: {
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-500/10',
      border: 'border-green-500',
    },
    error: {
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-500/10',
      border: 'border-red-500',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-500/10',
      border: 'border-yellow-500',
    },
  };

  const resultStatus = result ? statusConfig[result.status] : null;
  const ResultIcon = resultStatus?.icon;

  return (
    <div
      className={cn(
        'my-6 overflow-hidden rounded-none border-[4px] border-foreground bg-white shadow-[8px_8px_0px_0px] shadow-black dark:bg-neutral-900',
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
        <Code size={14} className="text-white ml-1" strokeWidth={3} />
        <span className="ml-1 font-mono text-[10px] font-bold text-white uppercase tracking-widest">
          {tool}
        </span>
      </div>

      {/* Description */}
      {description && (
        <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-2 border-b-[4px] border-foreground">
          <p className="text-xs text-neutral-700 dark:text-neutral-300">{description}</p>
        </div>
      )}

      {/* Parameters Section */}
      <div className="border-b-[4px] border-foreground">
        <button
          onClick={() => setIsParamsExpanded(!isParamsExpanded)}
          className="w-full flex items-center justify-between bg-neutral-100 px-4 py-3 text-left transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
            Parameters
          </span>
          <ChevronDown
            size={16}
            className={cn(
              'text-neutral-600 dark:text-neutral-400 transition-transform duration-200',
              !isParamsExpanded && 'rotate-180'
            )}
          />
        </button>

        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isParamsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="bg-[var(--color-terminal-bg)] p-4 border-t-[2px] border-foreground">
            <pre className="overflow-x-auto font-mono text-xs sm:text-sm text-neutral-100">
              <code>{formatJSON(params)}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div>
          <button
            onClick={() => setIsResultExpanded(!isResultExpanded)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200',
              resultStatus?.bg,
              'hover:opacity-90'
            )}
          >
            <div className="flex items-center gap-2">
              {ResultIcon && (
                <ResultIcon size={16} className={resultStatus?.color} strokeWidth={3} />
              )}
              <span
                className={cn(
                  'font-mono text-xs font-bold uppercase tracking-wider',
                  resultStatus?.color
                )}
              >
                {result.status}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={cn(
                'text-neutral-600 dark:text-neutral-400 transition-transform duration-200',
                !isResultExpanded && 'rotate-180'
              )}
            />
          </button>

          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isResultExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className={cn('p-4 border-t-[4px]', resultStatus?.border)}>
              {/* Result Message */}
              {result.message && (
                <div className="mb-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {result.message}
                </div>
              )}

              {/* Result Data */}
              {result.data && Object.keys(result.data).length > 0 && (
                <div className="mb-3 bg-[var(--color-terminal-bg)] p-3 border-[2px] border-foreground">
                  <pre className="overflow-x-auto font-mono text-xs text-neutral-100">
                    <code>{formatJSON(result.data)}</code>
                  </pre>
                </div>
              )}

              {/* Metrics */}
              {(result.tokens_saved !== undefined || result.execution_time) && (
                <div className="flex flex-wrap gap-4 text-xs bg-neutral-100 dark:bg-neutral-800 p-3 rounded-none border-[2px] border-foreground">
                  {result.tokens_saved !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className="font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400">
                        Tokens Saved:
                      </span>
                      <span className="font-mono font-bold text-green-600 dark:text-green-400">
                        {formatTokens(result.tokens_saved)}
                      </span>
                    </div>
                  )}
                  {result.execution_time && (
                    <div className="flex items-center gap-1">
                      <span className="font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400">
                        Time:
                      </span>
                      <span className="font-mono font-bold text-neutral-900 dark:text-white">
                        {result.execution_time}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Format JSON with syntax highlighting
 */
function formatJSON(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, 2);
}
