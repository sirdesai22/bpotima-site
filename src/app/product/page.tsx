import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product — GroundSet | BPOptima",
  description:
    "GroundSet architecture: ingestion, extraction, rules engine, routing, and full audit trail.",
};

const stages = [
  {
    name: "Ingestion",
    description:
      "[PLACEHOLDER] GroundSet ingests documents, images, and video from any source — APIs, secure upload portals, email attachments, or direct filesystem access. Supported formats include PDF, DOCX, PNG, JPEG, MP4, and common e-discovery formats.",
  },
  {
    name: "Extraction",
    description:
      "[PLACEHOLDER] Structured fields are extracted from source documents using grounded techniques. Every extracted value carries a pointer to its source location — page, line, or frame — so nothing is orphaned from its origin.",
  },
  {
    name: "Rules Engine",
    description:
      "[PLACEHOLDER] Clients author deterministic if/then rules in a version-controlled, testable environment. Rules are evaluated in order. No weights, no probabilities, no model inference — only the policy the client wrote.",
  },
  {
    name: "Routing",
    description:
      "[PLACEHOLDER] Based on rule evaluation, each case is routed to the appropriate outcome — approve, escalate, reject, or a custom workflow step. Routing rules are themselves configurable and audited.",
  },
  {
    name: "Audit",
    description:
      "[PLACEHOLDER] Every step — ingestion, extraction, each rule evaluation, the routing decision — is recorded in a tamper-evident audit ledger. Exportable as CSV, JSON, or streamed to the client's SIEM.",
  },
];

export default function ProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
        GroundSet
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-2xl mb-16">
        From evidence to decision to record — one pipeline, fully under your control.
      </p>

      <div className="space-y-16">
        {stages.map((stage, i) => (
          <div key={stage.name} className="grid md:grid-cols-[1fr_2fr] gap-8">
            <div>
              <div className="font-mono text-accent/40 text-lg mb-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2 className="font-serif text-2xl text-ink">{stage.name}</h2>
            </div>
            <div>
              <p className="font-sans text-base text-ink-soft leading-relaxed">
                {stage.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-16 border-t border-line">
        <p className="font-sans text-sm text-ink-soft/60">
          This page is a structural skeleton. Detailed documentation for each stage is in development.
          For the complete architecture overview,{" "}
          <Link href="/docs" className="text-accent hover:text-accent-light transition-colors">
            see the docs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
