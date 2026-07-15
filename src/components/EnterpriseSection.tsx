"use client";

import { motion } from "framer-motion";

const guarantees = [
  {
    title: "In-VPC Deployment",
    desc: "The inference engine runs inside your secure cloud environment. No customer PII leaves your perimeter.",
  },
  {
    title: "Deep-Tech Compute Stack",
    desc: "Powered by edge-based SLMs, Qwen-family VLMs, Rust, and low-latency GPU orchestration via vLLM. Backed by elite infra partnerships granting access to massive compute clusters, the newest GPUs, and frontier developer tools like Claude Code.",
  },
  {
    title: "Zero Data Leakage",
    desc: "Ephemeral processing. Documents processed in-memory and instantly purged. Zero data retention.",
  },
  {
    title: "Regulatory Alignment",
    desc: "Compliant with BSP IT Risk Management, Data Privacy Act, HIPAA, and EU AI Act requirements.",
  },
];

export default function EnterpriseSection() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
          Enterprise guarantees
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
          Production-First by Design. Not Pilots.
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <h3 className="font-sans text-base font-bold text-ink">
                {g.title}
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                {g.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 justify-center font-mono text-sm text-ink-soft">
          <span className="text-ink font-semibold">~70% Manual Reduction</span>
          <span className="text-ink-soft/40">·</span>
          <span className="text-ink font-semibold">~99% Decision Accuracy</span>
          <span className="text-ink-soft/40">·</span>
          <span className="text-ink font-semibold">0 Data Leakage</span>
        </div>
      </div>
    </section>
  );
}
