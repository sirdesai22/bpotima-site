"use client";

import { motion } from "framer-motion";
import { deterministicContent } from "@content/home";

export default function WhyDeterministic() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
            {deterministicContent.heading}
          </h2>
          <p className="font-sans text-base md:text-lg text-ink-soft leading-relaxed">
            {deterministicContent.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
