"use client";

import { motion } from "framer-motion";
import { closingContent } from "@content/home";

export default function ClosingCTA() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            {closingContent.heading}
          </h2>
          <p className="font-sans text-base md:text-lg text-ink-soft max-w-2xl mx-auto leading-relaxed mb-8">
            {closingContent.body}
          </p>
          <a
            href="mailto:hello@bpoptima.com"
            className="inline-flex items-center px-6 py-3 rounded-md bg-accent text-white font-medium text-sm hover:bg-accent-light transition-colors"
          >
            Talk to our team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
