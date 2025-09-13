# Repository Guidelines

## Project Structure & Module Organization
- `app/` Next.js App Router pages, layouts, API routes, sitemap/robots.
- `components/` Reusable UI, layout, and feature components.
- `lib/` Utilities (metadata, analytics, MDX helpers) and constants.
- `data/` Content: `apps/*.mdx`, `blog/*.mdx`, JSON indexes and profile data.
- `public/` Static assets (e.g., `public/images/...`).
- `config/` Site, SEO, and navigation config; `types/` shared TypeScript types.
- Root configs: `next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, `tsconfig.json`, `middleware.ts`.

## Build, Test, and Development Commands
- Install: `npm ci` (use the included `package-lock.json`).
- Develop: `npm run dev` — starts Next.js dev server.
- Lint: `npm run lint` — ESLint with Next.js rules.
- Type check: `npx tsc --noEmit` — validate TypeScript.
- Build: `npm run build` — production build (.next).
- Start: `npm run start` — run built app locally.

## Coding Style & Naming Conventions
- TypeScript first; strict types in `tsconfig.json`.
- Indentation 2 spaces; include semicolons; prefer single-responsibility modules.
- Filenames: kebab-case (`app-card.tsx`, `use-analytics.ts`).
- Components/Types: PascalCase; variables/functions: camelCase; constants: UPPER_SNAKE when top-level.
- Run `npm run lint` before pushing; fix issues or justify in PR.

## Testing Guidelines
- No formal suite yet. If adding tests, prefer Jest + React Testing Library.
- Name tests `*.test.ts(x)` and colocate near source or under `__tests__/`.
- Minimum CI checks: `npm run lint` and `npx tsc --noEmit` must pass.
- Focus on `lib/` utilities and critical components in `components/`.

## Commit & Pull Request Guidelines
- Follow Conventional Commits: `type(scope): subject`.
  - Examples: `feat(apps): add Chrome extension card`, `fix(seo): correct OG image`.
- PRs must include: summary, rationale, linked issues, screenshots for UI, and checklist results (lint/type-check/build).
- Keep diffs focused; update docs/content in `data/` as applicable.

## Security & Configuration Tips
- Never commit secrets. Use `.env.local`/production envs (e.g., `NEXT_PUBLIC_SITE_URL`, GA/Cloudflare tokens, `REVALIDATE_SECRET`).
- Mind CSP in `middleware.ts`; extend with care. Validate external domains for images/fonts.
- Asset paths should live under `public/`; avoid importing remote assets unless justified.

## Agent-Specific Notes
- Scope: entire repo. Follow these conventions for any generated files.
- Prefer minimal, targeted changes; align with existing directory layout and naming.
