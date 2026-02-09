'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Briefcase, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import Fuse from 'fuse.js';
import type { SearchModalProps, SearchResult } from './SearchModal.types';

/**
 * SearchModal Component
 * Full-screen search with fuzzy matching
 */
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allContent, setAllContent] = useState<SearchResult[]>([]);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Ensure component is mounted (for portal)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for portal mounting check
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Fetch all searchable content
  useEffect(() => {
    if (isOpen) {
      fetch('/api/search-content')
        .then((res) => res.json())
        .then((data) => setAllContent(data))
        .catch((err) => console.error('Failed to fetch search content:', err));
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll without shifting layout
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift from scrollbar
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search with Fuse.js
  useEffect(() => {
    if (!query.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Required to clear results when query is empty
      setResults([]);
      return;
    }

    const fuse = new Fuse(allContent, {
      keys: ['title', 'description', 'tags', 'category'],
      threshold: 0.3,
      includeScore: true,
    });

    const searchResults = fuse.search(query);
    setResults(searchResults.map((result) => result.item).slice(0, 10));
    setSelectedIndex(0);
  }, [query, allContent]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].url);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, router]);

  if (!isOpen || !mounted) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="w-5 h-5" />;
      case 'project':
        return <Briefcase className="w-5 h-5" />;
      case 'experience':
        return <Layers className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 pt-[10vh] overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl border-[4px] border-black bg-white dark:bg-gray-900 shadow-[12px_12px_0px_0px] shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 p-6 border-b-[3px] border-black">
          <Search className="w-6 h-6 text-primary" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts, projects, experiences..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xl font-mono outline-none text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded"
            aria-label="Close search"
          >
            <X className="w-6 h-6 text-black dark:text-white" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="p-8 text-center text-black/60 dark:text-white/60 font-mono">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {results.map((result, index) => (
            <button
              key={`${result.type}-${result.slug}`}
              onClick={() => {
                router.push(result.url);
                onClose();
              }}
              className={cn(
                'w-full text-left p-6 border-b-[2px] border-black/20 dark:border-white/20 transition-colors',
                'hover:bg-primary/10',
                index === selectedIndex && 'bg-primary/20'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="text-primary mt-1">{getIcon(result.type)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 text-black dark:text-white truncate">
                    {result.title}
                  </h3>
                  <p className="text-sm text-black/70 dark:text-white/70 mb-2 line-clamp-2">
                    {result.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="text-xs">
                      {result.type}
                    </Badge>
                    {result.category && (
                      <Badge variant="default" className="text-xs">
                        {result.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Hints */}
        {results.length > 0 && (
          <div className="p-4 border-t-[3px] border-black bg-black/5 dark:bg-white/5">
            <div className="flex gap-4 text-xs text-black/60 dark:text-white/60 font-mono">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
