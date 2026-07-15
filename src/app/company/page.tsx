import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder | BPOptima",
  description:
    "Daksh Jaiswal — founder of BPOptima. Backed by Antler. Over a decade at the intersection of AI, regulated finance, and hyper-scale infrastructure.",
};

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
      <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
        Daksh Jaiswal — Founder
      </h1>
      <p className="font-sans text-base text-ink-soft max-w-3xl leading-relaxed">
        DJ brings over a decade of expertise at the intersection of AI, regulated finance, and
        hyper-scale infrastructure. Prior to BPOptima, he served as Interim CTO/VP at a $200M ARR
        NBFC, where he launched an AI-driven risk engine processing $34M+ in credit disbursements.
        He previously founded Sauda Tech (processing ~$67M GMV), drove blitz-scale growth at
        multiple VC-backed B2B SaaS ventures, and has angel-invested in 18 startups (3 exits, 27%
        realized IRR). His operator background ensures BPOptima is architected for the strict
        compliance and throughput demands of institutional CTOs.
      </p>
      <div className="flex items-center gap-4 mt-4 font-mono text-[12px] text-ink-soft">
        <span className="border border-accent/30 text-accent rounded px-2 py-0.5">
          Antler Portfolio Company
        </span>
        <a href="mailto:dj@bpoptima.com" className="text-accent-blue hover:underline">
          dj@bpoptima.com
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-sans text-base font-bold text-accent">Traction &amp; Scale</h2>
          <p className="font-sans text-sm text-ink-soft mt-3 leading-relaxed">
            BPOptima&apos;s sovereign decision infrastructure is currently deployed in production for a
            Tier-1 digital bank in APAC. We partner with institutional risk officers and enterprise
            operators to automate complex, multi-modal workflows where strict compliance, speed, and
            zero data leakage are mandatory.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-sans text-base font-bold text-accent">
            Core Engineering &amp; Platform Team
          </h2>
          <p className="font-sans text-sm text-ink-soft mt-3 leading-relaxed">
            Backed by Antler, BPOptima&apos;s core infrastructure group brings together deep-tech
            engineering talent specialized in edge-based Small Language Models (SLMs), Vision
            Language Models (VLMs), and low-latency GPU orchestration (via vLLM). Our engineering
            foundation is built on memory-safe (Rust), deterministic policy layers deployed
            exclusively within secure enterprise VPC environments.
          </p>
        </div>
      </div>

      <div className="mt-16 rounded-xl border border-line bg-surface p-6">
        <h2 className="font-sans text-base font-bold text-ink">Backed by Antler</h2>
        <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
          Antler — Global early-stage VC behind the AI tools you already use. Portfolio includes
          Lovable, Airalo, Wrtn, Micro1, Salmon, File.ai. 200+ companies across 25+ countries.
        </p>
      </div>
    </div>
  );
}
