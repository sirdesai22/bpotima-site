"use client";

import { motion } from "framer-motion";

const problems = [
  {
    title: "Reality is messy",
    description:
      "Documents, images, logs, exceptions. Unstructured evidence that legacy OCR can't handle without months of template training.",
  },
  {
    title: "Rules don't hold",
    description:
      "Brittle logic breaks under compliance. Policy exceptions compound. Manual overrides become the norm.",
  },
  {
    title: "Humans don't scale",
    description:
      "Slow, costly, inconsistent. Every new workflow means more headcount, more training, more risk.",
  },
];

export default function ProblemSection() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
          The problem
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
          Enterprises Can&apos;t Scale Judgment
        </h2>
        <p className="font-sans text-base md:text-lg text-ink-soft mt-3 max-w-2xl leading-relaxed">
          When decisions are manual, the business cannot scale safely.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <span className="font-mono text-[11px] text-ink-soft font-semibold">
                0{i + 1}
              </span>
              <h3 className="font-sans text-lg font-bold text-ink mt-2">
                {p.title}
              </h3>
              <p className="font-sans text-sm text-ink-soft mt-2 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl font-medium text-ink/80 italic leading-relaxed max-w-3xl mx-auto">
            &ldquo;There is no infrastructure layer for regulated decisions. Until now.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
