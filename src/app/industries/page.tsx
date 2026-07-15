import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | BPOptima",
  description:
    "Financial services and healthcare: how BPOptima automates regulated decision workflows with zero data leakage and full audit trails.",
};

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
      <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
        Industries
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-2xl mb-16 leading-relaxed">
        Same engine, different policy logic.
      </p>

      <div className="space-y-16">
        <section>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-ink">
            Financial Services
          </h2>
          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                MSME &amp; Micro-Lending
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                Automate credit decisions for unstructured evidence: handwritten ledgers,
                crumpled receipts, local IDs. Zero-shot document intelligence — no template
                training.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                Multi-Modal Vision Verification
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                VLMs analyze storefront photos to verify business viability. Cross-reference
                physical imagery against EXIF geospatial metadata for fraud defense.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                Deterministic Policy Routing
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                Apply underwriting rules to extracted data. Auto-approve, escalate, or reject
                with full auditable justification.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-ink">
            Healthcare
          </h2>
          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                Prior Authorization
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                Interpret referrals, medical notes, and lab results using domain-trained SLMs.
                Apply payer and clinical policy rules to auto-approve or escalate.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                Claims Triage &amp; Fraud Signals
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                Pre-screen claims using documents, images, and structured data to route only
                high-risk cases to human investigators.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                Provider Credentialing
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                Verify licenses, certifications, and compliance documents automatically during
                onboarding and audits.
              </p>
            </div>
          </div>
        </section>

        <p className="font-mono text-xs text-ink-soft/50 text-center pt-8 border-t border-line">
          All decisions are explainable, auditable, and run inside the customer&apos;s VPC.
        </p>
      </div>
    </div>
  );
}
