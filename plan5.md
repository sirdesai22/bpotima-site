# Build prompt: bpoptima.com — v3 (light theme, new structure, video + interactive proof)

This is a full rebuild prompt. It supersedes both earlier prompts (the placeholder-scenario interactive-only version, and the dark-theme video-only version). Paste this whole thing in.

**The core idea of this version:** show, then explain. Instead of the original site's structure (hero → pitch → pitch → pitch → contact), this page proves itself in the first two scrolls — a video, then a live component the visitor drives themselves — before it asks anyone to read a paragraph of positioning copy. Do not mirror bpoptima.com's actual section order. The content below is the same real information that's on the live site; the sequence is deliberately new.

---

## 1. Stack

Next.js 14+, App Router, TypeScript, Tailwind, Framer Motion for scroll-reveal and the interactive component's transitions. Deploy target Vercel.

---

## 2. Design system — light theme

Reject the dark/terminal direction from the last pass. Back to a **paper-and-ledger light theme** — the goal is a page a Chief Risk Officer reads as rigorous and calm, not a page that performs "deep tech" through dark mode.

**Palette:**
- `--bg: #F6F6F3` (soft paper, cool-neutral, not warm cream)
- `--surface: #FFFFFF`
- `--line: #E1E0D9`
- `--ink: #14171C`
- `--ink-soft: #5B6270`
- `--accent: #1F3D5C` (institutional blue — primary actions, links, active states)
- `--approve: #2F6D45` / `--escalate: #96660B` / `--reject: #8C3B32` (decision-status colors only, never decorative)

**Type:**
- IBM Plex Serif — headlines and section titles
- IBM Plex Sans — body copy, UI labels
- IBM Plex Mono — anything that is system output: extracted fields, rule conditions, audit log entries, JSON snippets, timestamps, hashes. Mono type is the visual signal for "this is real, not marketing copy" throughout the page.

**Spacing:** generous whitespace in narrative sections; the interactive demo and JSON/audit blocks are allowed to feel dense and instrumented — that contrast is intentional.

**Motion:** restrained scroll-reveal everywhere except the interactive component, where sequencing is the actual content.

---

## 3. Page structure (new order — build in this sequence)

1. Nav
2. Hero
3. Video — "See it run"
4. **Interactive demo — "Trace a decision yourself"** (the centerpiece)
5. The problem
6. The solution (Understand → Decide → Route)
7. Why general AI fails here
8. The Groundset model family
9. The Groundset Router
10. Industries
11. Backed by / logos
12. Enterprise guarantees
13. Team / founder
14. Contact / closing CTA
15. Footer

---

## 4. Section copy

### Nav
Logo · How It Works · Industries · Model Family · Founder · Careers · Blog — right-aligned CTA: **"Request Walkthrough"**

### Hero
Eyebrow: `Understand · Decide · Route`

Headline: **"Sovereign Decision Infrastructure for Regulated Operations"**

Subhead: *Where every decision must be correct, fast, and auditable. We turn messy reality — unstructured documents, images, logs — into deterministic outcomes using domain-trained SLMs deployed inside your VPC.*

Stat row (mono type): `~99% Decision Accuracy` · `<100ms End-to-End Latency` · `Zero Data Leakage`

**CTA decision (this is the part you asked me to decide):**
- Primary CTA: **"Watch it run ↓"** — not "Request Walkthrough." The hero's job now is to hand off to the video immediately below, not to ask for a sales conversation before anyone has seen anything. It's a ghost/text-style anchor link, not a heavy button — quiet, confident, pointing down.
- Secondary CTA, smaller, to the right or below: **"Request Walkthrough"** — for the visitor who already knows they want a call and doesn't need convincing. Keep it available, just not the loudest thing in the hero.
- Reasoning to preserve in a code comment: the sales CTA earns more clicks *after* the video and the interactive demo than before them — asking for a meeting before proving anything is exactly the old structure's mistake.

Trust strip under the CTAs, small caps, muted: `In-VPC Deployment · Zero Data Leakage · BSP Compliant`

### Video — "See it run"
Section label: `See it run`
Headline: **"Watch a real decision run end to end."**
Subhead: *One document goes in. Watch it get understood, decided, and routed — with the full justification attached.*

- 16:9, 60–90s, embedded inline, autoplay-muted-on-scroll with visible unmute control.
- Shot list (Understand → Decide → Route, matching the real pipeline):
  1. Messy source document (handwritten ledger / scanned form). VO: "Reality is messy — most systems can't read this without months of setup."
  2. Extraction — fields populate with source references. VO: "Groundset-Vision reads it in seconds. Zero-shot. No template training."
  3. Policy decision — show the actual threshold check, a JSON output block populating. VO: "Then your policy decides — deterministically. Same input, same output, every time."
  4. Routing + audit trail. VO: "Approved, rejected, or escalated — with full justification, inside your VPC."
- Caption under video (only if literally true — otherwise leave `[NEEDS CONFIRMATION]`): *"Recorded on a live financial-services deployment. No synthetic data."*
- Directly under the video, centered, larger than the earlier version's small text link — this is now the transition into the interactive section: **"Don't take the video's word for it. Run one yourself, below."** ↓

### Interactive demo — "Trace a decision yourself" (build this fully)

This is the same three-panel component concept from the earlier prototype (Evidence → Rules → Decision + Audit), rebuilt with two changes from that version: (a) light theme, (b) scenarios grounded in BPOptima's actual verticals instead of generic placeholders.

**Section framing:**
Headline: **"Trace a decision yourself."**
Subhead: *Pick a real workflow. Run it. Then click any fact, rule, or decision to see exactly why it happened — all the way back to the source document.*

**Scenarios (two, switchable via tabs):**

1. **MSME Credit Decision** (financial services vertical) — source evidence: a scanned handwritten ledger + ID for a small business loan applicant. Extracted fields: monthly revenue, existing debt, years trading, ID verification status. Rules: client's actual underwriting policy, e.g. `Revenue ≥ $X` / `Debt-to-income ≤ Y` / `ID verification = pass`. Decision: approve / escalate, with plain-language reasoning.
2. **Healthcare Prior Authorization** (healthcare vertical) — source evidence: a referral + clinical note. Extracted fields: diagnosis code, requested procedure, prior treatment history. Rules: the payer's actual policy, e.g. `Requires prior conservative treatment ≥ 6 weeks` / `In-network provider = true`. Decision: auto-approve / escalate to clinical review.

**Panel spec:**
- **Evidence panel** — source document text, with only the lines that were actually extracted carrying a highlight (a soft, distinct amber/yellow tint — not gray, not near every line; if most lines are highlighted, that's a bug, fix it before shipping).
- **Rules panel** — every rule row must show the literal condition and threshold being tested in plain language, plus the actual value from this case, e.g. `Debt-to-income ≤ 40%  →  actual: 34%    PASS`. Do not ship rows that show only a snake_case key and a status with no visible condition — that was the single biggest issue in the last review pass, don't repeat it.
- **Decision panel** — verdict badge (approve/escalate, using the status colors above) with a plain-language reasoning paragraph, then a timestamped, monospace, hash-sealed audit ledger streaming in below it, with a working "Export .csv" button.

**Click-to-trace interaction:**
- Once a run completes, the verdict, each rule row, and each extracted field are clickable.
- Clicking any node highlights its full causal chain back to the source document line, dims everything else to ~30% opacity (not hidden), animated with a 150–200ms opacity tween.
- A small breadcrumb strip above the audit ledger updates live as the user clicks through, e.g. `Decision ← Rule 2 (debt-to-income) ← 34% ← ledger.pdf, source: L11`.
- The "click to trace" affordance must be visually obvious — accent-blue link styling, underline on hover, pointer cursor — plus a one-time gentle pulse on the verdict badge the first time a run completes, so first-time visitors notice the interaction exists. Don't repeat the pulse on later runs in the same session.
- Model the dependency graph explicitly in the scenario data (a `dependsOn` field on each rule/field) rather than inferring it from layout.

**Footer line under the component (keep, it's doing real work):**
*Nothing here is generative. Field extraction is grounded to a line in the source document. The decision path is the client's own deterministic policy, unedited by Groundset. The only thing authored for this demo is the animation.*

**Mobile:** collapse the three panels to a vertical stepper (Evidence → Rules → Decision), trace interaction still works via tap.

**Optional stretch, only if time allows:** a "What would change this?" sub-section directly below with two sliders (case fact vs. policy threshold) recomputing the verdict live, styled distinctly from each other (evidence = neutral ink tone, policy = accent blue with a small "client-owned" caption) — this is a nice-to-have, not required for this pass.

### The problem
Label: `The problem` · Headline: **"Enterprises Can't Scale Judgment"** · Intro: *When decisions are manual, the business cannot scale safely.*
1. **Reality is messy** — Documents, images, logs, exceptions. Unstructured evidence that legacy OCR can't handle without months of template training.
2. **Rules don't hold** — Brittle logic breaks under compliance. Policy exceptions compound. Manual overrides become the norm.
3. **Humans don't scale** — Slow, costly, inconsistent. Every new workflow means more headcount, more training, more risk.

Pull-quote: *"There is no infrastructure layer for regulated decisions. Until now."*

### The solution
Label: `The solution` · Headline: **"BPOptima Is Decision Infrastructure"** · Subhead: *One engine. Many decision workflows. Every decision is explainable, traceable, and production-grade.*

1. **Understand** — Domain-trained SLMs and VLMs interpret messy real-world evidence: documents, images, invoices, IDs, handwritten logs. *Zero-shot document intelligence. No template configuration. No 6-month training ramp-up.*
2. **Decide** — Policy and business logic applied deterministically. Regulatory rules, risk thresholds, SOPs — enforced, not suggested. *Same input, same output, every time. No temperature variance. No hallucination risk.*
3. **Route** — Auto-approve, reject, or escalate to humans — with full justification and audit trail. Humans only handle true exceptions. *Every decision is explainable, reproducible, and compliance-ready.*

JSON block (static or gently animated, light-theme styled — dark code block on paper background is fine here, it's a deliberate contrast):
```
{
  "evidence": "multi_modal",
  "decision": "APPROVE",
  "confidence": 0.99,
  "latency_ms": 42,
  "policy_flag": null
}
```
Caption: `Deployed in customer VPC · Policy-constrained · Fully auditable`

### Why general AI fails here
Label: `Why general AI fails here` · Headline: **"Enterprises don't need smarter chat. They need controllable systems."**

| Generic LLM APIs | BPOptima Stack |
|---|---|
| Pay per token | Fixed compute economics |
| Data leaves environment | Runs in customer VPC |
| Probabilistic outputs | Deterministic decisions |
| No policy enforcement | Policy constrained |
| Not auditable | Fully auditable |
| No system guarantees | Enforced outcomes |

### The Groundset model family
Label: `Proprietary AI architecture` · Headline: **"The Groundset™ Model Family"** · Subhead: *Not API wrappers. A highly opinionated, orchestrated stack of domain-specialized edge models, each trained for a specific task, deployed inside your VPC.*

1. **Groundset-Logic** — `Reasoning · Policy Enforcement` — We constrain frontier reasoning capabilities with our proprietary deterministic policy layers to execute complex compliance checks and underwriting without hallucination. Base: Qwen 3.5 / Llama 3 (up to 110B) · Context: 256K tokens · Use cases: complex underwriting, multi-turn decision logic, policy routing. Chips: Deterministic outputs · Audit-ready justification · Edge-deployable
2. **Groundset-Vision** — `Vision · Extraction` — Raw visual understanding, domain-trained on messy financial and medical documents to extract structured, actionable data from unstructured reality. Base: GLM OCR 4V · Accuracy: >98.7% on messy/Asian docs · Use cases: KYC/ID verification, handwritten ledgers, medical claims. Chips: Zero-shot extraction · Multi-language handwriting · Table extraction
3. **Groundset-Motion** — `Spatial · Video Extraction` — Frame-by-frame temporal reasoning to extract operational intelligence and trigger automated compliance workflows. Base: Qwen-VL / Frontier Vision · Processing: 30fps temporal parsing · Use cases: CCTV audit, warehouse logistics, remote site inspection. Chips: Temporal tracking · Anomaly detection · Stream-to-JSON
4. **Groundset-Audio** — `Audio · Diarization` — High-fidelity speech recognition and speaker diarization tuned for heavily accented, multi-speaker enterprise voice logs. Base: Whisper-v3 / Seamless · Modality: voice-to-structured-data · Use cases: trading floor logs, customer dispute resolution, telehealth. Chips: Multi-speaker separation · Sentiment extraction · Noise suppression
5. **Groundset-Speed** — `High-Throughput · Low Latency` — Optimized SLMs handling standard document classification and basic triage with sub-100ms latency. Base: Qwen 2.5 (7B–14B) · Latency: <100ms end-to-end · Use cases: document triage, metadata tagging, basic routing. Chips: High concurrency · Low compute footprint · Fixed economics
6. **Groundset-Sovereign** — `Sovereign · Domain-Specific` — Fine-tuned directly on your proprietary enterprise data, aligned to your internal risk appetite. Training: 100% customer data · Deployment: air-gapped / in-VPC only · Use cases: proprietary risk models, legacy integrations, local compliance. Chips: IP retention · Infinite scalability · BSP/HIPAA compliant

### The Groundset Router
Label: `Orchestration layer` · Headline: **"The Groundset Router: The Right Engine for Every Task"** · Subhead: *You shouldn't use a 110B parameter model to read a simple receipt, and you shouldn't use a 7B model for complex credit underwriting. Our Intelligent Router acts as the traffic controller, dynamically dispatching tasks to the optimal Groundset model to balance accuracy, latency, and compute costs in real-time.*

1. **Task Analysis** — Classify incoming unstructured payloads across text, image, video, or audio by complexity, domain, and required latency targets.
2. **Dynamic Dispatch** — Route simple extraction to Groundset-Speed or Vision, and escalate complex temporal or policy analysis to Groundset-Motion or Logic.
3. **Deterministic Execution & Audit** — Apply hard-coded business rules to the model's output, execute the decision, and write the explainable justification to the immutable audit ledger.

### Industries
Label: `Where it pays off fastest` · Headline: **"Same engine, different policy logic."**

**Financial Services**
- **MSME & Micro-Lending** — Automate credit decisions for unstructured evidence: handwritten ledgers, crumpled receipts, local IDs. Zero-shot document intelligence — no template training.
- **Multi-Modal Vision Verification** — VLMs analyze storefront photos to verify business viability. Cross-reference physical imagery against EXIF geospatial metadata for fraud defense.
- **Deterministic Policy Routing** — Apply underwriting rules to extracted data. Auto-approve, escalate, or reject with full auditable justification.

**Healthcare**
- **Prior Authorization** — Interpret referrals, medical notes, and lab results using domain-trained SLMs. Apply payer and clinical policy rules to auto-approve or escalate.
- **Claims Triage & Fraud Signals** — Pre-screen claims using documents, images, and structured data to route only high-risk cases to human investigators.
- **Provider Credentialing** — Verify licenses, certifications, and compliance documents automatically during onboarding and audits.

Footer line: *All decisions are explainable, auditable, and run inside the customer's VPC.*

### Backed by / logos
"Antler — Global early-stage VC behind the AI tools you already use" + logo row (Lovable, Airalo, Wrtn, Micro1, Salmon, File.ai) + `200+ companies across 25+ countries`

### Enterprise guarantees
Label: `Enterprise guarantees` · Headline: **"Production-First by Design. Not Pilots."**
1. **In-VPC Deployment** — The inference engine runs inside your secure cloud environment. No customer PII leaves your perimeter.
2. **Deep-Tech Compute Stack** — Powered by edge-based SLMs, Qwen-family VLMs, Rust, and low-latency GPU orchestration via vLLM. Backed by elite infra partnerships granting access to massive compute clusters, the newest GPUs, and frontier developer tools like Claude Code.
3. **Zero Data Leakage** — Ephemeral processing. Documents processed in-memory and instantly purged. Zero data retention.
4. **Regulatory Alignment** — Compliant with BSP IT Risk Management, Data Privacy Act, HIPAA, and EU AI Act requirements.

Stat row: `~70% Manual Reduction` · `~99% Decision Accuracy` · `0 Data Leakage`

### Team
Headline: **"Daksh Jaiswal — Founder"**
Bio: *DJ brings over a decade of expertise at the intersection of AI, regulated finance, and hyper-scale infrastructure. Prior to BPOptima, he served as Interim CTO/VP at a $200M ARR NBFC, where he launched an AI-driven risk engine processing $34M+ in credit disbursements. He previously founded Sauda Tech (processing ~$67M GMV), drove blitz-scale growth at multiple VC-backed B2B SaaS ventures, and has angel-invested in 18 startups (3 exits, 27% realized IRR). His operator background ensures BPOptima is architected for the strict compliance and throughput demands of institutional CTOs.*
Tag: `Antler Portfolio Company` · dj@bpoptima.com

- **Traction & Scale** — *BPOptima's sovereign decision infrastructure is currently deployed in production for a Tier-1 digital bank in APAC. We partner with institutional risk officers and enterprise operators to automate complex, multi-modal workflows where strict compliance, speed, and zero data leakage are mandatory.*
- **Core Engineering & Platform Team** — *Backed by Antler, BPOptima's core infrastructure group brings together deep-tech engineering talent specialized in edge-based SLMs, VLMs, and low-latency GPU orchestration (via vLLM). Our engineering foundation is built on memory-safe (Rust), deterministic policy layers deployed exclusively within secure enterprise VPC environments. We don't build wrappers, we deploy sophisticated Sovereign AI that keeps your data private & in your control.*

### Contact / closing CTA
Label: `Next step` · Headline: **"See Your Decisions Become Infrastructure"** · Subhead: *We map one real workflow and show how it runs end-to-end without human bottlenecks.*
Form: Work Email · Company · Workflow to Automate · Button: **"Book 30-min Workflow Session"**
Trust line: `Deployed inside customer cloud · Policy-constrained · Fully auditable`

### Footer
Tagline: *Decision Infrastructure for Regulated Operations*
HQ: 🇸🇬 32 Pekin Street, #05-01, Singapore 048762 · Regional: 🇮🇩 Indonesia · 🇻🇳 Vietnam · 🇹🇭 Thailand
Nav repeat + Privacy Policy / Terms of Service / Security & Compliance / Contact Us
`© 2026 BP Optima Pte Ltd. All rights reserved. UEN: 202544773H | Registered in Singapore`

---

## 5. Explicit don'ts

- Don't mirror the original site's section order — that's the entire point of this rebuild.
- Don't ship a rules panel that hides the actual condition/threshold behind a snake_case key only — show the plain-language condition with real numbers, every rule, every scenario.
- Don't over-highlight the evidence document — only actually-extracted lines get the tint.
- Don't invent metrics, logos, or claims beyond what's listed here — mark `[NEEDS REAL FIGURE]` or `[NEEDS CONFIRMATION]` where something's missing.
- Don't caption the video as real/unedited footage unless that's true.
- Don't make the sales CTA the loudest element in the hero — see the CTA reasoning above.

## 6. Deliverable

Full homepage in the new 15-section order, light theme throughout, video section built to spec, interactive trace-demo component fully functional for both scenarios including click-to-trace, all remaining sections using the copy above. Flag anywhere you had to guess at a value (rule thresholds for the two demo scenarios, if not implied above) so it can be reviewed.
