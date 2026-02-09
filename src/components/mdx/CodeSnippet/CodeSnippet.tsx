'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

export interface CodeSnippetProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

/**
 * CodeSnippet Component
 * Terminal-style code block with syntax highlighting and copy functionality
 * Matches the Terminal component aesthetic
 */
export function CodeSnippet({
  children,
  language = 'typescript',
  title,
  showLineNumbers = true,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border-[3px] border-foreground bg-[var(--color-terminal-bg)] shadow-[4px_4px_0px_0px] shadow-foreground">
      {/* Header */}
      <div className="flex items-center justify-between border-b-[3px] border-foreground bg-foreground/5 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* Terminal Dots */}
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#FF5F56] border-2 border-foreground" />
            <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border-2 border-foreground" />
            <div className="h-3 w-3 rounded-full bg-[#27C93F] border-2 border-foreground" />
          </div>
          {/* Title or Language */}
          <span className="ml-2 font-mono text-xs font-bold uppercase text-[var(--color-terminal-cyan)]">
            {title || language}
          </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1',
            'font-mono text-xs font-bold uppercase',
            'border-[2px] border-foreground',
            'transition-all duration-100',
            'hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px] hover:shadow-foreground',
            'active:translate-y-0 active:shadow-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            copied
              ? 'bg-[var(--color-terminal-green)] text-foreground'
              : 'bg-bg-elevated text-foreground'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content with Syntax Highlighting */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={dracula}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'var(--color-terminal-bg)',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: 'var(--color-terminal-gray)',
            userSelect: 'none',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
            },
          }}
        >
          {children.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
