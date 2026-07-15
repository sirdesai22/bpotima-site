"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Task Analysis",
    desc: "Classify incoming unstructured payloads across text, image, video, or audio by complexity, domain, and required latency targets.",
  },
  {
    num: "02",
    title: "Dynamic Dispatch",
    desc: "Route simple extraction to Groundset-Speed or Vision, and escalate complex temporal or policy analysis to Groundset-Motion or Logic.",
  },
  {
    num: "03",
    title: "Deterministic Execution & Audit",
    desc: "Apply hard-coded business rules to the model's output, execute the decision, and write the explainable justification to the immutable audit ledger.",
  },
];

export default function RouterSection() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
          Orchestration layer
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
          The Groundset Router: The Right Engine for Every Task
        </h2>
        <p className="font-sans text-base md:text-lg text-ink-soft mt-3 max-w-3xl leading-relaxed">
          You shouldn&apos;t use a 110B parameter model to read a simple receipt, and
          you shouldn&apos;t use a 7B model for complex credit underwriting. Our
          Intelligent Router acts as the traffic controller, dynamically dispatching
          tasks to the optimal Groundset model to balance accuracy, latency, and
          compute costs in real-time.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {steps.map((s, i) => (
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
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
