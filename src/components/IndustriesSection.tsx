"use client";

import { motion } from "framer-motion";

export default function IndustriesSection() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
          Where it pays off fastest
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
          Same engine, different policy logic.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <h3 className="font-sans text-xl font-bold text-ink">
              Financial Services
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <span className="font-mono text-[11px] text-accent font-semibold">
                  MSME &amp; Micro-Lending
                </span>
                <p className="font-sans text-sm text-ink-soft mt-1 leading-relaxed">
                  Automate credit decisions for unstructured evidence: handwritten
                  ledgers, crumpled receipts, local IDs. Zero-shot document
                  intelligence — no template training.
                </p>
              </li>
              <li>
                <span className="font-mono text-[11px] text-accent font-semibold">
                  Multi-Modal Vision Verification
                </span>
                <p className="font-sans text-sm text-ink-soft mt-1 leading-relaxed">
                  VLMs analyze storefront photos to verify business
                  viability. Cross-reference physical imagery against EXIF
                  geospatial metadata for fraud defense.
                </p>
              </li>
              <li>
                <span className="font-mono text-[11px] text-accent font-semibold">
                  Deterministic Policy Routing
                </span>
                <p className="font-sans text-sm text-ink-soft mt-1 leading-relaxed">
                  Apply underwriting rules to extracted data. Auto-approve,
                  escalate, or reject with full auditable justification.
                </p>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <h3 className="font-sans text-xl font-bold text-ink">Healthcare</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <span className="font-mono text-[11px] text-accent font-semibold">
                  Prior Authorization
                </span>
                <p className="font-sans text-sm text-ink-soft mt-1 leading-relaxed">
                  Interpret referrals, medical notes, and lab results using
                  domain-trained SLMs. Apply payer and clinical policy rules to
                  auto-approve or escalate.
                </p>
              </li>
              <li>
                <span className="font-mono text-[11px] text-accent font-semibold">
                  Claims Triage &amp; Fraud Signals
                </span>
                <p className="font-sans text-sm text-ink-soft mt-1 leading-relaxed">
                  Pre-screen claims using documents, images, and structured data
                  to route only high-risk cases to human investigators.
                </p>
              </li>
              <li>
                <span className="font-mono text-[11px] text-accent font-semibold">
                  Provider Credentialing
                </span>
                <p className="font-sans text-sm text-ink-soft mt-1 leading-relaxed">
                  Verify licenses, certifications, and compliance documents
                  automatically during onboarding and audits.
                </p>
              </li>
            </ul>
          </motion.div>
        </div>

        <p className="font-mono text-xs text-ink-soft/50 mt-10 text-center">
          All decisions are explainable, auditable, and run inside the customer&apos;s VPC.
        </p>
      </div>
    </section>
  );
}
