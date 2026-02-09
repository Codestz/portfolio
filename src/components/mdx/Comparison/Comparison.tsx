import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComparisonProps } from './Comparison.types';

/**
 * Comparison Component
 * Simplified visual comparison for showing wrong vs right approaches
 */
export function Comparison({ wrong, right, className }: ComparisonProps) {
  return (
    <div className={cn('my-6 space-y-3', className)}>
      {/* Wrong/Bad approach */}
      <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/10 border-l-4 border-red-500">
        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
        <div className="font-mono text-sm text-foreground whitespace-pre-wrap">
          {wrong}
        </div>
      </div>

      {/* Right/Good approach */}
      <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/10 border-l-4 border-green-500">
        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
        <div className="font-mono text-sm text-foreground whitespace-pre-wrap">
          {right}
        </div>
      </div>
    </div>
  );
}
