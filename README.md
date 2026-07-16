# BPOptima / Groundset

**Sovereign Decision Infrastructure for Regulated Enterprises**

Marketing site built with Next.js 16, Tailwind CSS v4, and Framer Motion.

## Stack

- **Framework:** Next.js 16.2.10 (App Router, Turbopack)
- **Language:** TypeScript (React 19.2)
- **Styling:** Tailwind CSS v4 (`@theme` in `globals.css`)
- **Animation:** Framer Motion
- **Fonts:** IBM Plex Serif / Sans / Mono (via `next/font/google`)
- **Deploy:** Vercel

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, Video, Interactive Demo, Problem, Solution, Comparison, Model Family, Router, Industries, Enterprise, Team, Contact, Footer |
| `/how-it-works` | Full content page |
| `/models` | Groundset model family |
| `/industries` | Financial services + healthcare |
| `/security` | Enterprise security |
| `/company` | Founder content |
| `/product` | Legacy placeholder |
| `/trust` | Legacy placeholder |
| `/docs` | Legacy placeholder |

## Interactive Demo

The `LiveDecisionDemo` component (`src/components/LiveDecisionDemo.tsx`) provides a three-panel interactive demo with click-to-trace. Scenario data lives in `content/demo-scenarios.ts`.

## Commands

```sh
npm run dev       # Dev server (Turbopack)
npm run build     # Production build + typecheck
npx eslint        # Lint
```

## Design

Light theme with paper-and-ledger aesthetic. Color tokens, font assignments, and component conventions are documented in `AGENTS.md`.
