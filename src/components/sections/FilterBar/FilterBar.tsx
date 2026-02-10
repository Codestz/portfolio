'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import gsap from 'gsap';
import { Badge } from '@/components/ui/primitives';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { useScrollTrigger } from '@/lib/hooks';
import type { FilterBarProps } from './FilterBar.types';

/**
 * FilterBar Component
 * Provides search and tag filtering for content lists
 */
export function FilterBar({
  categories = [],
  tags = [],
  onFilterChange,
  className,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { ref: triggerRef, isInView } = useScrollTrigger({
    start: 'top 85%',
  });

  // Subtle fade-in animation
  useEffect(() => {
    if (!isInView || hasAnimated.current || prefersReducedMotion()) {
      return;
    }

    const elements = [searchRef.current, categoriesRef.current, tagsRef.current].filter(Boolean);

    // Fade in sections with subtle stagger
    gsap.fromTo(
      elements,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        onComplete: () => {
          hasAnimated.current = true;
        },
      }
    );
  }, [isInView]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onFilterChange?.({
      search: query,
      category: selectedCategory,
      tags: selectedTags,
    });
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onFilterChange?.({
      search: searchQuery,
      category: newCategory,
      tags: selectedTags,
    });
  };

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange?.({
      search: searchQuery,
      category: selectedCategory,
      tags: newTags,
    });
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
    onFilterChange?.({
      search: '',
      category: null,
      tags: [],
    });
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0;

  return (
    <div ref={triggerRef} className={cn('space-y-6 mb-8', className)}>
      {/* Search Bar */}
      <div ref={searchRef} className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search experiments..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={cn(
            'w-full pl-12 pr-4 py-4',
            'font-bold uppercase text-base',
            'bg-bg-elevated text-foreground placeholder:text-foreground/40',
            'border-[3px] border-foreground',
            'shadow-[4px_4px_0px_0px] shadow-foreground',
            'transition-all duration-100',
            'focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0px_0px] focus:shadow-foreground',
            'focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
          aria-label="Search experiments"
        />
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div ref={categoriesRef}>
          <h3 className="text-sm font-bold uppercase text-foreground/60 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={cn(
                  'px-4 py-2',
                  'font-bold uppercase text-sm',
                  'border-[3px] border-foreground',
                  'transition-all duration-100',
                  'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground',
                  'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-[4px_4px_0px_0px] shadow-foreground'
                    : 'bg-bg-elevated text-foreground shadow-[2px_2px_0px_0px] shadow-foreground'
                )}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tag Filters */}
      {tags.length > 0 && (
        <div ref={tagsRef}>
          <h3 className="text-sm font-bold uppercase text-foreground/60 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'primary' : 'default'}
                className={cn(
                  'cursor-pointer transition-all duration-100',
                  'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px] hover:shadow-foreground',
                  'active:translate-y-0 active:shadow-[1px_1px_0px_0px] active:shadow-foreground'
                )}
                onClick={() => handleTagClick(tag)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTagClick(tag);
                  }
                }}
                aria-pressed={selectedTags.includes(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Clear All Button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={handleClearAll}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2',
              'font-bold uppercase text-sm',
              'text-foreground/60 hover:text-foreground',
              'transition-colors duration-100',
              'focus-visible:outline-none focus-visible:underline'
            )}
          >
            <X className="w-4 h-4" aria-hidden="true" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
