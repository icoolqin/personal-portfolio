# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. It showcases applications and projects with MDX support for rich content. The site uses Next.js App Router and is designed to be deployed on Cloudflare Pages.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Project Structure

### Core Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - React components organized by purpose
- `data/` - JSON and MDX files for content management
- `lib/` - Utility functions and helpers
- `public/` - Static assets (images, icons, etc.)
- `config/` - Configuration files
- `types/` - TypeScript type definitions

### Key Architecture Patterns
- **Content Management**: Uses MDX files in `data/apps/` for app details with JSON index
- **Styling**: Tailwind CSS with shadcn/ui component system
- **Routing**: Next.js App Router with dynamic routes for app details (`/apps/[slug]`)
- **Data Fetching**: Static generation with local JSON/MDX files

## Content Management

### Adding New Applications
1. Create MDX file in `data/apps/` (e.g., `new-app.mdx`)
2. Add app metadata to `data/apps/index.json`
3. Add images to `public/images/`
4. Follow the existing structure for consistency

### App Data Structure
Apps in `data/apps/index.json` follow this structure:
```json
{
  "id": "unique-id",
  "slug": "url-slug",
  "name": "App Name",
  "shortDescription": "Brief description",
  "fullDescription": "Detailed description",
  "category": "Category",
  "platform": ["Platform1", "Platform2"],
  "tags": ["tag1", "tag2"],
  "icon": "/images/icon.png",
  "banner": "/images/banner.png",
  "screenshots": ["/images/screenshot1.png"],
  "links": {
    "download": "url",
    "demo": "url",
    "chrome": "chrome-store-url",
    "edge": "edge-store-url"
  },
  "version": "1.0.0",
  "releaseDate": "2024-01-01",
  "features": ["Feature 1", "Feature 2"],
  "techStack": ["Technology1", "Technology2"],
  "featured": true
}
```

## Component Organization

### UI Components (`components/ui/`)
- Base components from shadcn/ui system
- Reusable UI primitives (buttons, cards, etc.)

### Layout Components (`components/layout/`)
- Header, footer, navigation
- Mobile menu component

### App Components (`components/app/`)
- `app-card.tsx` - Individual app display cards
- `app-detail.tsx` - Detailed app view
- `app-grid.tsx` - Grid layout for apps

### Common Components (`components/common/`)
- Shared utilities and components

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Content**: MDX with frontmatter
- **Deployment**: Cloudflare Pages
- **Package Manager**: npm

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS with custom theme
- `eslint.config.mjs` - ESLint configuration extending Next.js rules
- `tsconfig.json` - TypeScript strict mode configuration

## Development Notes

- Uses MDX for rich content in app descriptions
- Implements responsive design with Tailwind CSS
- No external database - content managed through local files
- SEO optimized with proper metadata and Open Graph tags
- Images optimized through Next.js Image component

## Build and Deployment

The project is configured for static site generation and deployment to Cloudflare Pages. Run `npm run build` to create the production build.