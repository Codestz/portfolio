# 🌿 Neo-Brutalist Code Garden

> A creative developer portfolio & technical blog showcasing tutorials, MCP servers, skills, AI workflows, and learnings. Built with Next.js, GSAP, Three.js, and Remotion.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

[**Live Demo**](#) | [**Architecture**](./ARCHITECTURE.md) | [**Contributing**](#contributing)

---

## ✨ Features

### 🎨 **Distinctive Design**
- **Neo-Brutalist aesthetic** with organic animations
- **3D interactive elements** powered by React Three Fiber
- **Smooth GSAP animations** with scroll-triggered reveals
- **Bold typography** with custom font pairings
- **Grid-breaking layouts** that stand out from typical portfolios

### 📝 **Content-Rich Blog**
- **MDX-powered posts** with rich interactive components
- **Syntax-highlighted code blocks** for technical content
- **Custom MDX components** (callouts, demos, diagrams)
- **Category & tag filtering** for easy navigation
- **Reading time estimates** and progress indicators

### 🎬 **Video Explanations**
- **Remotion integration** for creating explanatory videos
- **Embedded video tutorials** within blog posts
- **Animated diagrams** and code walkthroughs
- **Build-time video rendering** for optimal performance

### ⚡ **Performance First**
- **Static site generation** for instant page loads
- **Optimized bundle size** following Vercel best practices
- **Server Components** by default for minimal JavaScript
- **Edge CDN delivery** via Vercel
- **Lighthouse score 95+** on all pages

### 🛠️ **Developer Experience**
- **TypeScript** for type safety
- **React Compiler** for automatic optimizations
- **Hot module replacement** for instant feedback
- **ESLint & Prettier** for code quality
- **Well-documented architecture** for contributors

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm/pnpm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── layout/          # Header, Footer, Navigation
│   │   ├── mdx/             # Custom MDX components
│   │   ├── three/           # 3D React Three Fiber components
│   │   ├── animations/      # GSAP animation wrappers
│   │   └── ui/              # Reusable UI components
│   ├── content/             # MDX content (blog, tutorials, projects)
│   ├── lib/                 # Utilities and helpers
│   └── styles/              # Global styles and animations
├── remotion/                # Remotion video compositions
├── public/                  # Static assets
└── package.json
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed structure.

---

## 📝 Creating Content

### Writing a Blog Post

Create a new MDX file in `src/content/blog/`:

```mdx
---
title: "Building an MCP Server for Claude"
description: "Learn how to create custom Model Context Protocol servers"
publishedAt: "2026-02-07"
category: "tutorials"
tags: ["mcp", "claude", "typescript"]
featured: true
thumbnail: "/images/blog/mcp-server.jpg"
video: "/videos/mcp-intro.mp4"
---

<VideoEmbed src="/videos/mcp-intro.mp4" />

## Introduction

Your content here...

<Callout type="info">
This is an informational callout!
</Callout>

<CodeBlock language="typescript" filename="server.ts">
// Your code here
</CodeBlock>
```

### Custom MDX Components

Available components for rich content:

- `<VideoEmbed>` - Embed Remotion videos
- `<CodeBlock>` - Syntax-highlighted code
- `<Callout>` - Info/warning/success boxes
- `<InteractiveDemo>` - Live code playgrounds
- `<ImageGrid>` - Responsive image galleries

### Creating Remotion Videos

```bash
cd remotion
npm run dev  # Preview compositions
npm run build  # Render videos
```

Videos are saved to `public/videos/` and can be embedded in MDX.

---

## 🎨 Design System

### Typography
- **Display**: Space Mono / JetBrains Mono (monospace, bold)
- **Body**: Sentient / Newsreader (refined, readable)
- **Code**: Fira Code / Cascadia Code (ligatures)

### Color Palette
```css
/* Primary */
--color-primary: #1a1a1a;        /* Deep charcoal */
--color-secondary: #00ff9f;      /* Electric mint */

/* Backgrounds */
--color-bg-main: #fafaf8;        /* Warm off-white */
--color-bg-elevated: #ffffff;    /* Pure white */

/* Accents */
--color-accent-coral: #ff6b6b;   /* Coral red */
--color-accent-cyan: #4ecdc4;    /* Bright cyan */
```

### Animation Principles
- Scroll-triggered reveals with GSAP ScrollTrigger
- Staggered text animations for dramatic effect
- Parallax backgrounds for depth
- Smooth page transitions
- 3D mouse tracking on hero elements

---

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with React Compiler
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling

### Animation & 3D
- **GSAP** - Professional-grade animations
- **Three.js + React Three Fiber** - 3D graphics
- **@react-three/drei** - R3F helpers and abstractions
- **@react-three/postprocessing** - Visual effects

### Content
- **MDX** - Markdown with JSX components
- **next-mdx-remote** / **@next/mdx** - MDX processing
- **shiki** / **prism-react-renderer** - Syntax highlighting
- **gray-matter** - Frontmatter parsing
- **reading-time** - Read time calculation

### Video
- **Remotion** - Programmatic video creation
- React-based video compositions
- Build-time rendering

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The site will be deployed to `https://your-portfolio.vercel.app`.

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Optional: Google Analytics
```

---

## 🎯 Roadmap

- [x] Initial Next.js setup with Tailwind
- [x] Architecture planning
- [ ] Design system implementation
- [ ] Core layout components (Header, Footer, Nav)
- [ ] MDX processing and blog setup
- [ ] GSAP animations integration
- [ ] React Three Fiber hero scene
- [ ] Remotion video pipeline
- [ ] First batch of content (5 posts)
- [ ] Project showcase section
- [ ] Skills/MCP documentation
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Launch 🚀

---

## 🤝 Contributing

This is a personal portfolio, but contributions are welcome! If you find a bug or have a suggestion:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Vercel** for Next.js and hosting platform
- **GreenSock** for GSAP animation library
- **Remotion** for programmatic video creation
- **Pmndrs** for React Three Fiber ecosystem
- **The open-source community** for amazing tools and inspiration

---

## 💬 Contact

**Your Name**
- Website: [your-domain.com](https://your-domain.com)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

<div align="center">

**Built with ❤️ using Next.js, GSAP, Three.js, and Remotion**

⭐ Star this repo if you find it helpful!

</div>
