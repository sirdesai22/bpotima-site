"use client";

import { motion } from "framer-motion";
import { howItWorksStages } from "@content/home";

export default function HowItWorks() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {howItWorksStages.map((stage, i) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-mono text-2xl text-accent/40 mb-2">{stage.number}</div>
              <h3 className="font-serif text-lg font-semibold text-ink mb-2">
                {stage.title}
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
