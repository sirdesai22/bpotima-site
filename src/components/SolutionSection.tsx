"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const jsonLines = [
  '{',
  '  "evidence": "multi_modal",',
  '  "decision": "APPROVE",',
  '  "confidence": 0.99,',
  '  "latency_ms": 42,',
  '  "policy_flag": null',
  '}',
];

const stages = [
  {
    num: "01",
    title: "Understand",
    body: "Domain-trained SLMs and VLMs interpret messy real-world evidence: documents, images, invoices, IDs, handwritten logs.",
    tagline: "Zero-shot document intelligence. No template configuration. No 6-month training ramp-up.",
  },
  {
    num: "02",
    title: "Decide",
    body: "Policy and business logic applied deterministically. Regulatory rules, risk thresholds, SOPs — enforced, not suggested.",
    tagline: "Same input, same output, every time. No temperature variance. No hallucination risk.",
  },
  {
    num: "03",
    title: "Route",
    body: "Auto-approve, reject, or escalate to humans — with full justification and audit trail. Humans only handle true exceptions.",
    tagline: "Every decision is explainable, reproducible, and compliance-ready.",
  },
];

export default function SolutionSection() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= jsonLines.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 300);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
          The solution
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
          BPOptima Is Decision Infrastructure
        </h2>
        <p className="font-sans text-base md:text-lg text-ink-soft mt-3 max-w-2xl leading-relaxed">
          One engine. Many decision workflows. Every decision is explainable,
          traceable, and production-grade.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {stages.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <span className="font-mono text-[11px] text-ink-soft font-semibold">
                {s.num}
              </span>
              <h3 className="font-sans text-lg font-bold text-ink mt-3">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                {s.body}
              </p>
              <p className="font-mono text-[11px] text-accent mt-3 leading-relaxed">
                {s.tagline}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 rounded-xl border border-line bg-ink p-6 font-mono text-sm leading-relaxed overflow-x-auto"
        >
          <pre className="text-ink-soft/90">
            {jsonLines.map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: visibleLines > i ? 1 : 0,
                  transition: "opacity 0.4s ease-out",
                }}
              >
                {i === 2 ? (
                  <>
                    <span className="text-ink-soft/60">&quot;decision&quot;</span>
                    <span className="text-ink-soft/60">: </span>
                    <span className="text-approve font-semibold">&quot;APPROVE&quot;</span>
                    ,
                  </>
                ) : i === 3 ? (
                  <>
                    <span className="text-ink-soft/60">&quot;confidence&quot;</span>
                    <span className="text-ink-soft/60">: </span>
                    <span className="text-approve">0.99</span>
                    ,
                  </>
                ) : i === 4 ? (
                  <>
                    <span className="text-ink-soft/60">&quot;latency_ms&quot;</span>
                    <span className="text-ink-soft/60">: </span>
                    <span className="text-accent-light">42</span>
                    ,
                  </>
                ) : (
                  <span>{line}</span>
                )}
              </div>
            ))}
          </pre>
          <div className="mt-4 font-sans text-[11px] text-ink-soft/50">
            Deployed in customer VPC · Policy-constrained · Fully auditable
          </div>
        </motion.div>
      </div>
    </section>
  );
}
