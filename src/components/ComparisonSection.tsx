"use client";

import { motion } from "framer-motion";

const rows = [
  { llm: "Pay per token", bp: "Fixed compute economics" },
  { llm: "Data leaves environment", bp: "Runs in customer VPC" },
  { llm: "Probabilistic outputs", bp: "Deterministic decisions" },
  { llm: "No policy enforcement", bp: "Policy constrained" },
  { llm: "Not auditable", bp: "Fully auditable" },
  { llm: "No system guarantees", bp: "Enforced outcomes" },
];

export default function ComparisonSection() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
          Why general AI fails here
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
          Enterprises don&apos;t need smarter chat. They need controllable systems.
        </h2>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-6 text-left font-sans text-xs font-semibold text-ink-soft uppercase tracking-widest">
                  Generic LLM APIs
                </th>
                <th className="py-3 pl-6 text-left font-sans text-xs font-semibold text-accent uppercase tracking-widest">
                  BPOptima Stack
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.llm}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border-b border-line/50"
                >
                  <td className="py-3 pr-6 text-ink-soft font-sans">
                    {r.llm}
                  </td>
                  <td className="py-3 pl-6 text-ink font-sans font-medium">
                    {r.bp}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
