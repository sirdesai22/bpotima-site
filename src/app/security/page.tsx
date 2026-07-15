import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Compliance | BPOptima",
  description:
    "In-VPC deployment, zero data leakage, BSP/HIPAA/EU AI Act compliance. BPOptima's enterprise security architecture for regulated operations.",
};

const sections = [
  {
    title: "In-VPC Deployment",
    content:
      "The inference engine runs inside your secure cloud environment. No customer PII leaves your perimeter. Deploy in any AWS, GCP, or Azure region — or air-gapped environments. Our architecture ensures that data never transits through external networks. Model weights are frozen per deployment and versioned, with no telemetry back to BPOptima.",
  },
  {
    title: "Zero Data Leakage",
    content:
      "Ephemeral processing architecture. Documents are processed in-memory and instantly purged after the decision is written to the audit ledger. Zero data retention. No shared model pool. No third-party API calls in the inference path. Every deployment is a fully isolated instance.",
  },
  {
    title: "Regulatory Alignment",
    content:
      "Compliant with BSP IT Risk Management Framework, Data Privacy Act (DPA), HIPAA, and EU AI Act requirements. Our deterministic policy layers provide the auditability required by regulated institutions. Documentation and compliance artifacts available to qualified prospects under NDA.",
  },
  {
    title: "Deep-Tech Compute Stack",
    content:
      "Powered by edge-based Small Language Models (SLMs), Qwen-family VLMs, and low-latency GPU orchestration via vLLM. Engineering foundation is built on memory-safe Rust with deterministic policy layers. Elite infrastructure partnerships grant access to massive compute clusters and the newest GPUs.",
  },
  {
    title: "Audit & Export",
    content:
      "Every decision produces a complete audit record: source evidence identifiers, extracted field values, every rule evaluation, the routing decision, and a chain of hashes sealing the record. Audit logs are exportable as CSV, JSON, or NDJSON and can be streamed to your SIEM via webhook or syslog. Records are independently verifiable without any BPOptima tooling.",
  },
];

export default function SecurityPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
      <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
        Security &amp; Compliance
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-2xl mb-16 leading-relaxed">
        Production-first by design. Your data, your VPC, your audit trail.
      </p>

      <div className="space-y-6">
        {sections.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <h2 className="font-sans text-lg font-bold text-ink">{s.title}</h2>
            <p className="font-sans text-sm text-ink-soft mt-2 max-w-3xl leading-relaxed">
              {s.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-6">
        <p className="font-mono text-xs text-ink-soft leading-relaxed">
          Need the full security packet, compliance artifacts, or architecture diagrams?{" "}
          <a href="mailto:dj@bpoptima.com" className="text-accent-blue hover:underline">
            Contact our team
          </a>{" "}
          — available under NDA to qualified prospects.
        </p>
      </div>
    </div>
  );
}
