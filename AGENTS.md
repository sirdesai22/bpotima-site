# BP_OPTIMA

Marketing site for **GroundSet**: decision-engine product for regulated enterprises.  
Build plan: `plan1.md`.

## Stack

- Next.js **16.2.10**, App Router, React 19.2, TypeScript
- Tailwind CSS v4 (CSS-based `@theme` config, no `tailwind.config.ts` — use `globals.css`)
- Framer Motion
- Deploy target: Vercel

### Next.js 16 gotchas

- **`next dev` / `next build` default to Turbopack** — use `--webpack` to opt out
- **React 19** — `useRef` requires an initial value argument, no longer optional
- **`next lint` removed** — run `npx eslint` directly instead
- **`middleware.ts` deprecated** → rename to `proxy.ts`, export `proxy` (not needed here)

## Sitemap

| Route | Status |
|-------|--------|
| `/` | Built fully |
| `/product` | Skeleton + `[PLACEHOLDER]` copy |
| `/trust` | Skeleton + `[PLACEHOLDER]` copy |
| `/company` | Skeleton + `[PLACEHOLDER]` copy |
| `/docs` | Skeleton + `[PLACEHOLDER]` copy |

## Design system (no default Tailwind palette)

`@theme` in `globals.css`:

- `--color-bg: #F6F6F3` / `--color-surface: #FFFFFF` / `--color-line: #E1E0D9`
- `--color-ink: #14171C` / `--color-ink-soft: #5B6270`
- `--color-accent: #1F3D5C` (institutional blue)
- `--color-approve: #2F6D45` / `--color-escalate: #96660B` / `--color-reject: #8C3B32`

Fonts: IBM Plex (loaded via `next/font/google`, three CSS variable families):

| Face | CSS var | When to use |
|------|---------|-------------|
| IBM Plex Serif | `--font-serif` | Headlines, section titles |
| IBM Plex Sans | `--font-sans` | Body copy, UI labels |
| IBM Plex Mono | `--font-mono` | Data: extracted fields, rules, audit entries, timestamps |

These are **non-variable fonts** on Google Fonts — weight array must be specified per face.

## Live demo component (`<LiveDecisionDemo />`)

- `src/components/LiveDecisionDemo.tsx`, data in `content/demo-scenarios.ts`
- Three-panel: Evidence → Rules → Decision + audit trail
- Framer Motion sequenced reveal (extraction → rules → verdict → audit stream)
- Two switchable scenarios: insurance claim, SME credit line
- Working "Export .csv" button (generates CSV client-side)
- Mobile: collapses to vertical stepper
- Footer disclaimer: nothing is generative

## Content pattern

- No CMS — typed local data files in `/content/*.ts`
- Use `@content/` path alias (configured in `tsconfig.json`)
- Edit copy without touching layout code

## Copy rules

- Short sentences. Banned: revolutionize, seamless, unlock, supercharge
- Never claim AI "decides" — it reads, extracts, routes; client's rules decide
- Prefer concrete nouns over abstract ones
- Placeholder copy: full real sentences in target voice, not lorem ipsum

## Positioning constraint

Product value prop is **"deterministic, not invented"** — site execution must never contradict that.

## Explicit don'ts

- No stock photography / gradient blobs / particle backgrounds
- No ungrounded chatbot widget
- No fake testimonials or fabricated logos
- No urgency patterns (countdowns, "X people viewing")
- No default Tailwind palette in output
- No generic blue-gradient hero or floating 3D blob

## Commands

```sh
npm run dev      # dev server (Turbopack by default)
npm run build    # production build + typecheck
npx eslint       # lint (next lint removed in v16)
```

Run `build` before commit to catch type errors.
