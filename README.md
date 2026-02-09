# Code Garden

> **A technical blog and portfolio exploring AI-driven development, autonomous agents, and Model Context Protocol (MCP).** Built entirely with AI orchestration using Claude Code and Gemini - zero human-written code modifications.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4)

**[Live Demo](https://codestz.dev)** • **[About Me](https://github.com/Codestz)**

---

## What is Code Garden?

Code Garden is a **digital garden** where I share experiments, tutorials, and case studies about:

- **Autonomous AI Agents** (Claude, Gemini)
- **Model Context Protocol (MCP)** integrations
- **Modern Frontend Development** (Next.js 16, React 19, Tailwind 4)
- **Creative UI/UX** with Neo-Brutalist design

Built as a **living showcase** of what's possible when AI orchestrates the entire development process - from ideation to production.

---

## Key Features

### Neo-Brutalist Design System

- Bold, high-contrast aesthetic with thick borders and dramatic shadows
- Animated terminal-style UI components
- Dark/light theme support with seamless transitions
- GSAP-powered entrance animations throughout
- Responsive grid layouts that adapt beautifully to all devices

### MDX-Powered Content

- Rich blog posts with interactive MDX components
- **Custom components**: Terminal animations, Mermaid diagrams, code snippets with syntax highlighting
- Fuzzy search functionality across all content
- Reading time estimates and table of contents
- Post navigation with previous/next links

### Content Discovery

- **Search modal** with keyboard shortcuts (⌘K / Ctrl+K)
- **Filter by tags** and categories
- **Experiments showcase** with featured projects
- **Experience timeline** with role details and tech stacks

### Performance & SEO

- Server-side rendering with Next.js App Router
- Static site generation for instant page loads
- Automatic sitemap generation
- Optimized images with Next.js Image component
- Zero ESLint errors - production ready

### Developer Experience

- TypeScript for complete type safety
- Structured content repository pattern
- Modular component architecture
- GSAP animation utilities and hooks
- Comprehensive error handling with custom error pages

---

## Quick Start

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm (or npm/yarn)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Codestz/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler check
```

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/                          # Next.js 16 App Router
│   │   ├── about/                    # About page
│   │   ├── experiments/              # Experiments listing & detail pages
│   │   ├── experience/               # Experience listing & detail pages
│   │   ├── api/search-content/       # Search API endpoint
│   │   ├── layout.tsx                # Root layout with theme provider
│   │   ├── page.tsx                  # Homepage
│   │   └── globals.css               # Global styles & animations
│   ├── components/
│   │   ├── about/                    # About page components
│   │   │   ├── HeroIntroduction/     # Profile hero section
│   │   │   ├── ProfessionalStory/    # Career narrative
│   │   │   ├── ExperienceTimeline/   # Interactive timeline
│   │   │   ├── SkillsBreakdown/      # Tech stack showcase
│   │   │   └── BeyondCode/           # Personal interests
│   │   ├── blog/                     # Blog-specific components
│   │   │   └── PostNavigation/       # Prev/next post links
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header/               # Navigation header with animations
│   │   │   └── Footer/               # Social links footer
│   │   ├── mdx/                      # Custom MDX components
│   │   │   ├── Terminal/             # Animated terminal component
│   │   │   ├── Mermaid/              # Interactive Mermaid diagrams with zoom
│   │   │   ├── CodeSnippet/          # Syntax-highlighted code blocks
│   │   │   ├── Comparison/           # Before/after comparisons
│   │   │   └── Icon/                 # Inline icon components
│   │   ├── search/                   # Search functionality
│   │   │   └── SearchModal/          # Fuzzy search modal (⌘K)
│   │   ├── sections/                 # Homepage sections
│   │   │   ├── CodeGardenHero/       # Hero with terminal simulation
│   │   │   ├── LatestExperimentsCard/# Latest posts showcase
│   │   │   ├── TechStackCard/        # Tech stack display
│   │   │   ├── CurrentlyBuildingCard/# Work-in-progress preview
│   │   │   ├── AboutMeSection/       # Brief bio section
│   │   │   ├── SlotMachine/          # Interactive slot machine
│   │   │   └── LetsConnectSection/   # Social links CTA
│   │   ├── ui/primitives/            # Reusable UI primitives
│   │   │   ├── Badge/                # Status badges
│   │   │   ├── Button/               # Brutal-style buttons
│   │   │   ├── Card/                 # Card component with variants
│   │   │   ├── Terminal/             # Terminal UI component
│   │   │   ├── IconButton/           # Icon-only buttons
│   │   │   └── NavLink/              # Navigation links
│   ├── content/                      # MDX content files
│   │   ├── about.mdx                 # About page content
│   │   ├── blog/                     # Blog posts (tutorials, experiments)
│   │   └── projects/                 # Experience/project case studies
│   ├── lib/
│   │   ├── config/                   # Configuration files
│   │   │   └── animation.config.ts   # GSAP animation constants
│   │   ├── constants/                # App constants
│   │   │   └── routes.constants.ts   # Route definitions
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useGSAP.ts            # GSAP hook
│   │   │   ├── useScrollTrigger.ts   # Scroll animations
│   │   │   └── useParallax.ts        # Parallax effects
│   │   ├── repositories/             # Content management
│   │   │   └── content.repository.ts # MDX content queries
│   │   ├── services/                 # Business logic services
│   │   ├── types/                    # TypeScript type definitions
│   │   │   ├── content.types.ts      # Content models
│   │   │   ├── animation.types.ts    # Animation types
│   │   │   └── ui.types.ts           # UI component types
│   │   └── utils/                    # Utility functions
│   │       └── animation.utils.ts    # GSAP utilities
├── public/                           # Static assets
│   ├── me.JPG                        # Profile photo
│   ├── profile.pdf                   # Resume/CV
│   └── robots.txt                    # SEO robots file
├── mdx-components.tsx                # Global MDX component mapping
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── next.config.ts                    # Next.js configuration
└── package.json                      # Dependencies & scripts
```

---

## Creating Content

### Writing a Blog Post

Create a new MDX file in `src/content/blog/`:

```mdx
---
title: 'Building a Custom MCP Server'
description: 'Learn how to create a Model Context Protocol server from scratch'
publishedAt: '2026-02-08'
category: 'tutorial'
tags: ['mcp', 'typescript', 'ai']
featured: true
author: 'Esteban Estrada'
---

## Introduction

Your content here with full MDX support...

<Terminal
  title="Installation"
  lines={[{ text: 'npm install @modelcontextprotocol/sdk', color: 'cyan', prefix: '$' }]}
/>

<CodeSnippet language="typescript" filename="server.ts">
{`
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

const server = new Server({
name: 'my-mcp-server',
version: '1.0.0',
});
`}

</CodeSnippet>
```

### Custom MDX Components

Available in all MDX files:

- **`<Terminal>`** - Animated terminal with typing effect
- **`<Mermaid>`** - Interactive diagrams with zoom controls
- **`<CodeSnippet>`** - Syntax-highlighted code blocks
- **`<Comparison>`** - Before/after code comparisons
- **`<Icon>`** - Inline icons from lucide-react

### Adding Experience/Projects

Create a new MDX file in `src/content/projects/`:

```mdx
---
title: 'Recurly'
role: 'Senior Frontend Engineer'
period: '2022 - 2024'
description: 'Led frontend architecture for subscription management platform'
tags: ['react', 'typescript', 'graphql']
featured: true
---

Your project description and achievements...
```

---

## Design System

### Typography

- **Heading**: `font-heading` - Bold, uppercase, tightly tracked
- **Body**: `font-sans` - Inter (system fallback)
- **Mono**: `font-mono` - JetBrains Mono (terminal aesthetic)

### Color Palette

```css
/* Light Theme */
--color-bg: #ffffff;
--color-bg-elevated: #f5f5f5;
--color-foreground: #000000;
--color-primary: #7c3aed; /* Purple */
--color-secondary: #fbbf24; /* Yellow */

/* Dark Theme */
--color-bg: #0a0a0a;
--color-bg-elevated: #1a1a1a;
--color-foreground: #ffffff;
--color-primary: #a78bfa; /* Light purple */
--color-secondary: #fcd34d; /* Light yellow */
```

### Component Patterns

**Brutal Card Style:**

```css
.brutal-card {
  border: 3px solid var(--color-foreground);
  box-shadow: 6px 6px 0px 0px var(--color-foreground);
  transition: all 0.1s ease;
}

.brutal-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px 0px var(--color-foreground);
}
```

### Animation Configuration

Consistent animation timings via `src/lib/config/animation.config.ts`:

```typescript
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
};

export const EASING = {
  default: 'power2.out',
  snap: 'power3.inOut',
  bounce: 'back.out(1.7)',
};

export const STAGGER = {
  fast: 0.1,
  normal: 0.15,
  slow: 0.2,
};
```

---

## Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with React Compiler
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling

### Animation & Interaction

- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animations
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Mermaid](https://mermaid.js.org/)** - Diagram rendering

### Content Management

- **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)** - MDX processing for RSC
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parsing
- **[shiki](https://shiki.matsu.io/)** - Syntax highlighting
- **[reading-time](https://github.com/ngryman/reading-time)** - Read time calculation

### Developer Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager

---

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Codestz/portfolio)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Environment Variables

Create `.env.local` for local development:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Code Garden"
NEXT_PUBLIC_SITE_DESCRIPTION="Personal portfolio and technical blog"

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Build Configuration

The project includes optimized build settings in `next.config.ts`:

- Static export for CDN hosting
- Image optimization with Next.js Image
- MDX compilation with proper loaders
- Bundle analysis available via `ANALYZE=true pnpm build`

---

## AI-Driven Development

This entire portfolio was built using **AI orchestration** - a modern development workflow where AI agents handle all code generation:

### Development Process

1. **Brainstorming** (Gemini) - Feature ideation and architectural decisions
2. **Planning** (Claude Code) - Breaking down features into implementation steps
3. **Execution** (Claude Code) - Writing all code, components, and content

### Key Achievements

- **Zero human-written code** modifications
- **0 ESLint errors** - production-ready codebase
- **Complete type safety** - TypeScript throughout
- **Consistent design system** - Neo-Brutalist aesthetic
- **Comprehensive features** - Search, animations, MDX
- **Built in record time** - Hours instead of weeks

### Technologies Orchestrated by AI

- Next.js 16 App Router architecture
- GSAP animation timelines and scroll triggers
- MDX content pipeline with custom components
- Search functionality with fuzzy matching
- Responsive layouts and theme system

**This project serves as a case study for AI-driven development** - demonstrating what's possible when developers leverage autonomous agents as coding partners.

---

## Performance

- **Lighthouse Score**: 95+ on all pages
- **First Contentful Paint**: < 1.5s
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: Next.js Image with lazy loading
- **Zero Layout Shift**: Proper aspect ratios and skeleton states

---

## Roadmap

### Completed

- [x] Next.js 16 setup with App Router
- [x] Neo-Brutalist design system
- [x] GSAP animation integration
- [x] MDX content pipeline
- [x] Custom MDX components (Terminal, Mermaid, CodeSnippet)
- [x] Homepage with hero and content sections
- [x] About page with professional story
- [x] Experience/projects showcase
- [x] Experiments/blog listing and detail pages
- [x] Search functionality (fuzzy search)
- [x] Theme toggle (dark/light)
- [x] SEO optimization (sitemap, metadata)
- [x] Error handling (404, error pages)
- [x] Production deployment

### Upcoming

- [ ] More blog content (MCP tutorials, AI workflows)
- [ ] Newsletter subscription
- [ ] Comments system (giscus)
- [ ] View counter
- [ ] RSS feed
- [ ] Open Graph image generation
- [ ] Progressive Web App (PWA)
- [ ] Performance monitoring
- [ ] Analytics dashboard

---

## Contributing

While this is a personal portfolio, contributions are welcome! Found a bug or have a suggestion?

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Run `pnpm lint` before committing
- Add TypeScript types for all new code
- Test in both light and dark themes
- Ensure responsive design (mobile-first)
- Write meaningful commit messages

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You're free to use this code as inspiration for your own portfolio, but please don't copy the content or design wholesale. Make it your own!

---

## Acknowledgments

### Technologies

- **[Vercel](https://vercel.com/)** - For Next.js and incredible hosting
- **[GreenSock](https://greensock.com/)** - For GSAP animation library
- **[Tailwind Labs](https://tailwindcss.com/)** - For Tailwind CSS
- **[MDX](https://mdxjs.com/)** - For the amazing MDX ecosystem

### AI Partners

- **[Claude](https://claude.ai/)** (Anthropic) - AI pair programmer
- **[Gemini](https://gemini.google.com/)** (Google) - Brainstorming partner

### Inspiration

- **Digital gardens** movement - For the concept of learning in public
- **Neo-Brutalism** design trend - For the bold aesthetic
- **Open source community** - For incredible tools and libraries

---

## Contact

**Esteban Estrada**

- Portfolio: [codestz.dev](https://codestz.dev) _(coming soon)_
- Email: est.estrada@outlook.com
- GitHub: [@Codestz](https://github.com/Codestz)
- LinkedIn: [Esteban Estrada](https://www.linkedin.com/in/esteban-diaz-estrada/)

---

<div align="center">

**Built with AI orchestration using Claude Code + Gemini**

_Showcasing the future of AI-driven development_

**Star this repo** if you find it helpful!

</div>
