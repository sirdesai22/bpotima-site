import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust | BPOptima",
  description:
    "Security, compliance certifications, audit mechanics, and model-ownership at BPOptima.",
};

const sections = [
  {
    title: "Security & Compliance",
    content:
      "[PLACEHOLDER] BPOptima maintains SOC 2 Type II certification, ISO 27001, and GDPR compliance. Data is encrypted at rest (AES-256) and in transit (TLS 1.3). Infrastructure is hosted on AWS GovCloud with FedRAMP-authorized availability zones. Penetration testing is conducted quarterly by a third-party firm. Results are available to qualified prospects under NDA.",
  },
  {
    title: "Model Ownership",
    content:
      "[PLACEHOLDER] GroundSet does not train models on client data. The extraction models are stateless and client-deployable — on the client's VPC, on-premise, or in an air-gapped environment. Model weights are frozen per deployment and versioned. No client data ever leaves the client's inference boundary. There is no shared model pool, no telemetry back to BPOptima, and no third-party API calls in the inference path.",
  },
  {
    title: "Audit & Export",
    content:
      "[PLACEHOLDER] Every decision produces a complete audit record: source evidence identifiers, extracted field values, every rule evaluation (including conditions that did not trigger), the routing decision, and a chain of hashes sealing the record. Audit logs are exportable as CSV, JSON, or NDJSON and can be streamed to the client's SIEM via webhook or syslog. Records are retained according to client policy and are independently verifiable without any BPOptima tooling.",
  },
  {
    title: "Data Residency",
    content:
      "[PLACEHOLDER] GroundSet supports deployment in any AWS, GCP, or Azure region. For clients with data residency requirements, deployment is restricted to specified geographic boundaries. No cross-region data movement occurs without explicit client authorization. Data is deleted within 30 days of contract termination, with a verified deletion certificate provided.",
  },
];

export default function TrustPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
        Trust
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-2xl mb-16">
        How GroundSet protects your data, your rules, and your audit trail.
      </p>

      <div className="space-y-16">
        {sections.map((section) => (
          <div key={section.title} className="max-w-3xl">
            <h2 className="font-serif text-2xl text-ink mb-4">
              {section.title}
            </h2>
            <p className="font-sans text-base text-ink-soft leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-16 border-t border-line">
        <p className="font-sans text-sm text-ink-soft/60">
          [PLACEHOLDER] This page is a structural skeleton. Detailed trust documentation — including
          certification PDFs, pentest summaries, and architecture diagrams — will be available here.
          In the meantime,{" "}
          <Link href="/company" className="text-accent hover:text-accent-light transition-colors">
            contact our team
          </Link>{" "}
          for the full trust packet.
        </p>
      </div>
    </div>
  );
}
