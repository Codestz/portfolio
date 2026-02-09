import type { MDXComponents } from 'mdx/types';
import { CodeSnippet, Terminal, Icon, Comparison, FileTree } from '@/components/mdx';
import { Mermaid } from '@/components/mdx/Mermaid';

/**
 * MDX Components Configuration
 * Custom components for rich MDX content
 * Follows Neo-Brutalist design system
 * Includes support for Mermaid diagrams, Terminal simulations, Icons, and Comparisons
 */

// Plain components object for use in Server Components (like MDXRemote)
export const mdxComponents: MDXComponents = {
  // Custom MDX components
  Terminal,
  Icon,
  Comparison,
  FileTree,
  // Headings
  h1: ({ children }) => (
    <h1 className="mb-4 sm:mb-6 mt-6 sm:mt-8 font-heading text-3xl sm:text-4xl font-bold uppercase text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 sm:mb-4 mt-6 sm:mt-8 font-heading text-2xl sm:text-3xl font-bold uppercase text-foreground border-b-[3px] border-foreground pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 sm:mb-3 mt-4 sm:mt-6 font-mono text-xl sm:text-2xl font-semibold text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 mt-3 sm:mt-4 font-mono text-lg sm:text-xl font-semibold text-foreground">
      {children}
    </h4>
  ),

  // Paragraphs and text
  p: ({ children }) => (
    <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-foreground">{children}</p>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-foreground marker:text-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-foreground marker:text-foreground marker:font-bold">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-semibold text-foreground underline decoration-secondary decoration-[2px] underline-offset-4 transition-all hover:decoration-[3px]"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),

  // Inline code
  code: ({ children, className }) => {
    // If it's a code block (has className with language)
    if (className?.startsWith('language-')) {
      const language = className.replace('language-', '');

      // Handle Mermaid diagrams
      if (language === 'mermaid') {
        return <Mermaid chart={String(children).trim()} />;
      }

      // Regular code blocks
      return <CodeSnippet language={language}>{String(children).trim()}</CodeSnippet>;
    }

    // Inline code
    return (
      <code className="rounded bg-secondary/20 px-1.5 py-0.5 font-mono text-sm text-foreground border border-secondary/30">
        {children}
      </code>
    );
  },

  // Code blocks - wrapped by CodeSnippet or Mermaid via code component above
  pre: ({ children }) => {
    // Extract code content and pass to appropriate component
    if (typeof children === 'object' && children !== null && 'props' in children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const codeProps = (children as any).props;
      const language = codeProps.className?.replace('language-', '') || 'text';
      const code = String(codeProps.children).trim();

      // Handle Mermaid diagrams
      if (language === 'mermaid') {
        return <Mermaid chart={code} />;
      }

      // Regular code blocks
      return <CodeSnippet language={language}>{code}</CodeSnippet>;
    }

    // Fallback for plain pre blocks
    return <CodeSnippet language="text">{String(children).trim()}</CodeSnippet>;
  },

  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="my-4 sm:my-6 border-l-[3px] sm:border-l-[4px] border-secondary bg-secondary/5 py-3 sm:py-4 px-4 sm:px-6 italic text-sm sm:text-base text-foreground">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="my-8 border-t-[3px] border-foreground" />,

  // Table
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-[3px] border-foreground">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-secondary text-white">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y-[2px] divide-foreground">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-secondary/5 transition-colors">{children}</tr>,
  th: ({ children }) => (
    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-r-[2px] border-foreground last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-foreground border-r-[2px] border-foreground last:border-r-0">
      {children}
    </td>
  ),

  // Strong and emphasis
  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic text-foreground">{children}</em>,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    // Override with custom components
    ...components,
  };
}
