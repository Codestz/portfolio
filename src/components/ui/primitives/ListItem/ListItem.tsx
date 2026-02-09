import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ListItemProps } from './ListItem.types';

/**
 * ListItem Component
 *
 * Bold Neo-Brutalist list item with auto-numbering, hover effects and badges
 *
 * @example
 * <ListItem
 *   href="/blog/setup-mcp"
 *   title="Configurando MCP con Claude Desktop"
 *   index={1}
 *   badge={<Badge variant="primary">New</Badge>}
 * />
 *
 * Features:
 * - Auto-formatted numbering (01, 02, 03...)
 * - Bold Neo-Brutalist hover effects
 * - Optional badge/label
 * - Disabled state
 * - Semantic design tokens
 */

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ href, title, index, badge, disabled = false, className, ...props }, ref) => {
    const itemClasses = cn(
      'group relative',
      'border-b-[3px] border-foreground py-4',
      'transition-all duration-100',
      !disabled && 'cursor-pointer hover:bg-bg-elevated hover:px-4 hover:-mx-4',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    );

    const formattedIndex = String(index).padStart(2, '0');

    const content = (
      <div className="flex justify-between items-center w-full">
        <span
          className={cn(
            'font-bold text-base uppercase tracking-wide',
            'transition-all duration-100',
            !disabled && 'group-hover:translate-x-2 group-hover:text-primary'
          )}
        >
          <span className="text-muted mr-3">{formattedIndex}.</span>
          {title}
        </span>
        {badge && <div className="ml-4">{badge}</div>}
      </div>
    );

    if (disabled) {
      return (
        <li ref={ref} className={itemClasses} {...props}>
          {content}
        </li>
      );
    }

    return (
      <li ref={ref} className={itemClasses} {...props}>
        <Link href={href} className="block w-full">
          {content}
        </Link>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
