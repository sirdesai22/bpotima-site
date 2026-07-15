# BP_OPTIMA (v3 — Light Theme, Video + Interactive Proof)

Marketing site for **BPOptima** / **Groundset**: sovereign decision infrastructure for regulated enterprises.
Build plan: `plan5.md` supersedes earlier plans.

## Stack

- Next.js **16.2.10**, App Router, React 19.2, TypeScript
- Tailwind CSS v4 (CSS-based `@theme` config, no `tailwind.config.ts` — use `globals.css`)
- Framer Motion — scroll-reveal + interactive demo transitions
- Deploy target: Vercel

### Next.js 16 gotchas

- **`next dev` / `next build` default to Turbopack** — use `--webpack` to opt out
- **React 19** — `useRef` requires an initial value argument, no longer optional
- **`next lint` removed** — run `npx eslint` directly instead
- **`middleware.ts` deprecated** → rename to `proxy.ts`, export `proxy` (not needed here)

## Sitemap

| Route | Status |
|-------|--------|
| `/` | Full homepage: Hero (Watch it run ↓ CTA) → Video → Interactive Demo → Problem → Solution → Comparison → Model Family → Router → Industries → Enterprise → Team → Contact → Footer |
| `/how-it-works` | Built with full content |
| `/models` | Built with full Groundset model family |
| `/industries` | Built with full financial services + healthcare content |
| `/security` | Built with full enterprise security content |
| `/company` | Built with real founder content (Daksh Jaiswal, Antler) |
| `/product` | Legacy — placeholder skeleton, kept for back-compat |
| `/trust` | Legacy — placeholder skeleton, kept for back-compat |
| `/docs` | Legacy — placeholder skeleton, kept for back-compat |

## Design system (light, paper-and-ledger)

`@theme` in `globals.css`:

- `--color-bg: #F6F6F3` / `--color-surface: #FFFFFF` / `--color-line: #E1E0D9`
- `--color-ink: #14171C` / `--color-ink-soft: #5B6270`
- `--color-accent: #1F3D5C` (institutional blue) / `--color-accent-light: #2A5078`
- Status: `--color-approve: #2F6D45` / `--color-escalate: #96660B` / `--color-reject: #8C3B32`
- Highlight: `--color-highlight: #D4A843` (amber tint for evidence extraction)

Fonts (loaded via `next/font/google`):

| Face | CSS var | When to use |
|------|---------|-------------|
| IBM Plex Serif | `--font-serif` | Headlines, section titles, pull quotes |
| IBM Plex Sans | `--font-sans` | Body copy, UI labels, form fields |
| IBM Plex Mono | `--font-mono` | System output: extracted fields, rules, audit entries, JSON, timestamps, metrics |

## Interactive demo (`<LiveDecisionDemo />`)

- `src/components/LiveDecisionDemo.tsx`, scenario data in `content/demo-scenarios.ts`
- Three-panel: Evidence → Rules → Decision + audit trail
- Framer Motion sequenced reveal (extraction → rules → verdict → audit stream)
- Two scenarios: **MSME Credit Decision** (financial services) + **Healthcare Prior Authorization**
- **Click-to-trace**: after run completes, clicking verdict/rules/fields highlights causal chain, dims rest to ~30% opacity, breadcrumb strip updates live
- Dependency graph via `dependsOn` arrays on each rule and field pointing to source line
- "click to trace" affordance with one-time pulse on first completion
- Light theme throughout
- Mobile: vertical stepper tabs (Evidence / Rules / Decision)
- Working "Export .csv" button (generates CSV client-side)
- Footer disclaimer: nothing is generative

## Content pattern

- All content from plan5.md, which pulls from the live bpoptima.com — not invented
- No CMS. Scenario data in `content/demo-scenarios.ts` (with `@content/` path alias)
- Animated JSON block in SolutionSection streams lines on a 300ms interval

## Video section

- 16:9 aspect ratio, placeholder overlay with play button
- `[PLACEHOLDER]` marker for actual asset
- `[FLAG]` marker questioning if demo footage is from live deployment
- Link text: "Don't take the video's word for it. Run one yourself, below." linking to #interactive-demo

## Explicit don'ts

- No invented claims, metrics, or customer logos — use `[NEEDS REAL FIGURE]` markers if unsure
- No softening of "Sovereign Decision Infrastructure" into generic SaaS language
- No stock photography / gradient blobs / particle backgrounds
- No ungrounded chatbot widget
- No urgency patterns
- No default Tailwind palette
- Rules panel must show plain-language conditions with real numbers, not just snake_case keys
- Only actually-extracted evidence lines get the highlight tint

## Commands

```sh
npm run dev      # dev server (Turbopack by default)
npm run build    # production build + typecheck
npx eslint       # lint (next lint removed in v16)
```

Run `build` before commit to catch type errors.
