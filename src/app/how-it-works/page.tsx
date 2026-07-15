import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | BPOptima",
  description:
    "Understand → Decide → Route. How BPOptima's sovereign decision infrastructure processes unstructured evidence into deterministic outcomes.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
      <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
        How It Works
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-2xl mb-16 leading-relaxed">
        Understand &rarr; Decide &rarr; Route. One pipeline, three stages, zero data leakage.
      </p>

      <div className="space-y-20">
        <section>
          <span className="font-mono text-[11px] text-accent font-semibold tracking-wider">01</span>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-ink mt-2">Understand</h2>
          <p className="font-sans text-base text-ink-soft mt-3 max-w-2xl leading-relaxed">
            Domain-trained SLMs and VLMs interpret messy real-world evidence: documents, images,
            invoices, IDs, handwritten logs. Zero-shot document intelligence — no template
            configuration, no 6-month training ramp-up. Every extracted field is tagged with a source
            reference.
          </p>
        </section>

        <section>
          <span className="font-mono text-[11px] text-accent font-semibold tracking-wider">02</span>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-ink mt-2">Decide</h2>
          <p className="font-sans text-base text-ink-soft mt-3 max-w-2xl leading-relaxed">
            Policy and business logic applied deterministically. Regulatory rules, risk thresholds,
            SOPs — enforced, not suggested. Same input, same output, every time. No temperature
            variance. No hallucination risk. The Groundset Router dynamically dispatches tasks to the
            optimal model based on complexity, domain, and latency targets.
          </p>
        </section>

        <section>
          <span className="font-mono text-[11px] text-accent font-semibold tracking-wider">03</span>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-ink mt-2">Route</h2>
          <p className="font-sans text-base text-ink-soft mt-3 max-w-2xl leading-relaxed">
            Auto-approve, reject, or escalate to humans — with full justification and audit trail.
            Humans only handle true exceptions. Every decision is explainable, reproducible, and
            compliance-ready. The immutable audit ledger captures every step from ingestion to final
            routing.
          </p>
        </section>

        <section className="pt-8 border-t border-line">
          <h3 className="font-sans text-lg font-bold text-ink">The Groundset Router</h3>
          <p className="font-sans text-base text-ink-soft mt-3 max-w-2xl leading-relaxed">
            The Intelligent Router acts as the traffic controller, dynamically dispatching tasks to
            the optimal Groundset model to balance accuracy, latency, and compute costs in real-time.
            Simple extraction routes to Groundset-Speed or Vision; complex temporal or policy analysis
            escalates to Groundset-Motion or Logic.
          </p>
        </section>
      </div>
    </div>
  );
}
