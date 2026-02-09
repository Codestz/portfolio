# Portfolio Architecture

## Technical Architecture

### Frontend Stack

#### Framework Layer

- **Next.js 16**: App Router with server components, streaming, and parallel routes
- **React 19**: Concurrent rendering, automatic batching, transitions
- **TypeScript 5.x**: Strict mode, path aliases, comprehensive type definitions

#### Styling Architecture

```
Tailwind CSS 4 (JIT)
├── Custom Design Tokens (CSS Variables)
├── Responsive Utilities (Mobile-First)
├── Component Variants (CVA pattern)
└── Global Styles (app/globals.css)
```

**Key Design Tokens:**

```css
--foreground: Dynamic (light/dark mode) --background: Dynamic (light/dark mode) --primary: #7c3aed
  (Purple) --secondary: #00ff41 (light) / #00e5cc (dark) --accent: #ff006e (Pink);
```

#### Animation System

- **GSAP Core**: Timeline-based animations
- **ScrollTrigger**: Scroll-based reveal effects
- **React Integration**: useGSAP hook with cleanup
- **Responsive Animations**: Dynamic values based on viewport

### Component Architecture

#### Organization Pattern

```
components/
├── ui/primitives/           # Atomic components
│   ├── Button/
│   ├── Card/
│   ├── Terminal/
│   └── Tag/
├── sections/                # Page sections
│   ├── CodeGardenHero/
│   ├── SlotMachine/
│   └── ExperimentsGrid/
├── layout/                  # Layout components
│   ├── Header/
│   └── Footer/
└── [page]/                  # Page-specific components
    ├── HeroIntroduction/
    ├── ExperienceTimeline/
    └── SkillsBreakdown/
```

#### Component Patterns

**Compound Components:**

```tsx
<Card variant="elevated">
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>
```

**Polymorphic Components:**

```tsx
<Button as="a" href="/about">
  Link Button
</Button>
```

**Type-Safe Props:**

```tsx
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  as?: ElementType;
}
```

### Responsive Design System

#### Breakpoint Strategy

```tsx
// Mobile-first approach
const breakpoints = {
  sm: '640px', // Small tablets
  md: '768px', // Tablets
  lg: '1024px', // Desktop
  xl: '1280px', // Large desktop
  '2xl': '1536px', // Extra large
};
```

#### Responsive Components

- **Dynamic State**: useState with resize listeners for complex components
- **Tailwind Classes**: Responsive utilities (sm:, md:, lg:)
- **CSS Variables**: Calculated values for GSAP animations

**Example: Responsive SlotMachine**

```tsx
const [symbolHeight, setSymbolHeight] = useState(120);

useEffect(() => {
  const updateSymbolHeight = () => {
    if (window.innerWidth < 640) setSymbolHeight(80);
    else if (window.innerWidth < 768) setSymbolHeight(100);
    else setSymbolHeight(120);
  };
  updateSymbolHeight();
  window.addEventListener('resize', updateSymbolHeight);
  return () => window.removeEventListener('resize', updateSymbolHeight);
}, []);
```

### State Management

#### Client State

- **React useState**: Local component state
- **React useRef**: DOM references and mutable values
- **React useEffect**: Side effects and lifecycle

#### Server State

- **Next.js Data Fetching**: Server components with async/await
- **MDX Content**: Static generation from markdown files

### Rendering Strategy

#### Page Rendering

```tsx
// app/page.tsx - Server Component
export default function HomePage() {
  return <ClientComponent />; // Hybrid rendering
}

// app/about/page.tsx - Static Generation
export default function AboutPage() {
  return <StaticContent />;
}

// app/experiments/[slug]/page.tsx - Dynamic Generation
export async function generateStaticParams() {
  return experiments.map((exp) => ({ slug: exp.slug }));
}
```

#### Client Boundaries

```tsx
'use client'; // Explicit client component marker

// Used for:
// - Interactive components (useState, useEffect)
// - Browser APIs (window, document)
// - GSAP animations
// - Event handlers
```

### Content Architecture

#### MDX Integration

```tsx
// mdx-components.tsx
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-bold">{children}</h1>,
    // Responsive typography for all elements
  };
}
```

#### Data Structure

```
src/data/
├── experiments/
│   ├── mcp-memory.mdx
│   ├── ai-workflows.mdx
│   └── index.ts
└── experience/
    ├── quipu.mdx
    ├── stori.mdx
    └── index.ts
```

### Animation Architecture

#### GSAP Integration

```tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
      });
    },
    { scope: containerRef }
  );
}
```

### Performance Optimizations

#### Bundle Optimization

- **Code Splitting**: Dynamic imports for heavy components
- **Tree Shaking**: ESM imports, unused code elimination
- **Image Optimization**: Next.js Image component with WebP

#### Runtime Performance

- **React Memoization**: useMemo, useCallback for expensive computations
- **Lazy Loading**: Components and images below the fold
- **GSAP Optimization**: GPU-accelerated transforms (translateX, scale)

### Accessibility

#### Semantic HTML

```tsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li>
      <a href="/about">About</a>
    </li>
  </ul>
</nav>
```

#### Keyboard Navigation

- Tab order preservation
- Focus indicators (outline, ring utilities)
- Escape key handlers for modals

#### Screen Reader Support

- ARIA labels and descriptions
- Live regions for dynamic content
- Semantic landmarks

### Build & Deployment

#### Build Process

```bash
pnpm install           # Install dependencies
pnpm run lint          # ESLint check
pnpm run type-check    # TypeScript validation
pnpm run build         # Next.js production build
```

#### Git Workflow

```
feature/branch → PR → CI/CD → main → Deploy
     ↓
Pre-commit hooks (lint-staged + Prettier)
     ↓
GitHub Actions (lint, type-check, build)
```

#### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://portfolio.com
NODE_ENV=production
```

### Testing Strategy

#### Manual Testing

- Chrome DevTools Device Mode
- Real device testing (iOS, Android)
- Accessibility audit (Lighthouse)
- Cross-browser testing

### Design System Constraints

#### Neo-Brutalist Rules

1. **Borders**: Always 3px or 4px, solid black
2. **Shadows**: Always 8px offset, solid color
3. **Colors**: High contrast, semantic tokens
4. **Corners**: Sharp (border-radius: 0)
5. **Typography**: Bold, uppercase for emphasis
6. **Spacing**: Generous padding and margins
7. **Transitions**: Quick (150ms), purposeful

#### Component Checklist

- [ ] 3px border with foreground color
- [ ] 8px shadow with appropriate shadow color
- [ ] Responsive padding (sm:, md:, lg: variants)
- [ ] Hover states (translate, shadow increase)
- [ ] Dark mode compatible
- [ ] Touch target ≥ 44px on mobile
- [ ] Type-safe props
- [ ] Accessible markup

### File Organization Principles

1. **Colocation**: Keep related files together
2. **Index Exports**: Barrel exports for clean imports
3. **Type Definitions**: Separate .types.ts files for complex types
4. **Constants**: Dedicated files for shared constants
5. **Utilities**: lib/ for shared helper functions

### Code Quality Standards

#### TypeScript

- Strict mode enabled
- No implicit any
- Explicit return types for exported functions
- Interface over type for object shapes

#### React

- Functional components only
- Hooks at top level
- Cleanup in useEffect returns
- Ref forwarding for primitives

#### Styling

- Mobile-first responsive classes
- Semantic color tokens (not raw hex)
- Composition over duplication
- Consistent spacing scale (4px base)
