"use client";

import { motion } from "framer-motion";

export default function SocialProof() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-ink-soft mb-6">
            [PLACEHOLDER] Trusted by
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-30">
            <div className="h-8 w-24 rounded bg-line" />
            <div className="h-8 w-28 rounded bg-line" />
            <div className="h-8 w-20 rounded bg-line" />
            <div className="h-8 w-32 rounded bg-line" />
            <div className="h-8 w-24 rounded bg-line" />
          </div>
          <p className="mt-6 font-sans text-xs text-ink-soft/60">
            Logos will be added as customer references are established.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
