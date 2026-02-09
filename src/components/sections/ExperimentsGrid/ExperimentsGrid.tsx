'use client';

import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { FilterBar } from '@/components/sections';
import { ROUTES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/lib/types';
import type { FilterState } from '../FilterBar/FilterBar.types';

export interface ExperimentsGridProps {
  posts: Post[];
}

/**
 * ExperimentsGrid Component
 * Client-side grid with filtering for blog posts (experiments)
 */
export function ExperimentsGrid({ posts }: ExperimentsGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: null,
    tags: [],
  });

  // Extract unique categories and tags
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(post => cats.add(post.category));
    return Array.from(cats).sort();
  }, [posts]);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => allTags.add(tag)));
    return Array.from(allTags).sort();
  }, [posts]);

  // Filter posts based on active filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && post.category !== filters.category) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => post.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [posts, filters]);

  return (
    <>
      {/* Filter Bar */}
      <FilterBar
        categories={categories}
        tags={tags}
        onFilterChange={setFilters}
        className="mb-12"
      />

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card
              key={post.slug}
              variant="elevated"
              hoverable
              as="article"
            >
              <Card.Header>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.featured && (
                    <Badge variant="primary">Featured</Badge>
                  )}
                </div>
                <h2 className="mb-2 font-mono text-xl font-bold text-foreground">
                  {post.title}
                </h2>
                <p className="text-xs text-foreground/60">
                  {formatDate(post.publishedAt)} · {post.readTime}
                </p>
              </Card.Header>
              <Card.Body>
                <p className="mb-4 text-foreground/70">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="default" pill>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  as="a"
                  href={ROUTES.experiments.post(post.slug)}
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="h-3 w-3" />}
                >
                  Read More
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="mb-4 text-lg text-foreground/60">
            No experiments found matching your filters.
          </p>
          <p className="text-sm text-foreground/40">
            Try adjusting your search or clearing filters.
          </p>
        </div>
      )}
    </>
  );
}
