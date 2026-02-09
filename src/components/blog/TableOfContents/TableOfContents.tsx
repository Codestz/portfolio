'use client';

import { useEffect, useState, useMemo } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TableOfContentsProps, Heading } from './TableOfContents.types';

/**
 * TableOfContents Component
 * Auto-generated TOC from MDX headings with scroll spy
 */
export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from MDX content
  const headings = useMemo(() => {
    const headingMatches = content.matchAll(/^(#{2,3})\s+(.+)$/gm);
    const items: Heading[] = [];

    for (const match of headingMatches) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      items.push({ id, text, level });
    }

    return items;
  }, [content]);

  // Scroll spy effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={cn(
        'border-[3px] border-foreground bg-bg-elevated shadow-[4px_4px_0px_0px] shadow-foreground p-6',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b-[2px] border-foreground">
        <List className="w-5 h-5 text-primary" />
        <h2 className="font-bold uppercase text-sm">Table of Contents</h2>
      </div>

      {/* TOC List */}
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              'transition-all duration-200',
              heading.level === 3 && 'ml-4'
            )}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={cn(
                'text-left w-full py-1 px-2 text-sm transition-all duration-200 border-l-[3px]',
                activeId === heading.id
                  ? 'border-primary text-primary font-bold bg-primary/10'
                  : 'border-transparent text-foreground/70 hover:border-foreground hover:text-foreground hover:bg-foreground/5'
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
