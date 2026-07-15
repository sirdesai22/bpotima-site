"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="font-mono text-[11px] text-accent tracking-widest uppercase">
            Understand · Decide · Route
          </span>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-ink mt-6 leading-[1.08]">
            Sovereign Decision Infrastructure for Regulated Operations
          </h1>

          <p className="font-sans text-lg md:text-xl text-ink-soft mt-6 max-w-2xl leading-relaxed">
            Where every decision must be correct, fast, and auditable. We turn messy
            reality — unstructured documents, images, logs — into deterministic
            outcomes using domain-trained SLMs deployed inside your VPC.
          </p>

          <div className="flex flex-wrap gap-3 mt-8 font-mono text-xs text-ink-soft">
            <span className="text-ink font-semibold">~99% Decision Accuracy</span>
            <span className="text-ink-soft/40">·</span>
            <span className="text-ink font-semibold">&lt;100ms End-to-End Latency</span>
            <span className="text-ink-soft/40">·</span>
            <span className="text-ink font-semibold">Zero Data Leakage</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-10">
            <a
              href="#video"
              className="inline-flex items-center gap-1.5 font-sans text-base font-semibold text-accent hover:text-accent-light transition-colors"
            >
              Watch it run
              <span className="text-lg">&darr;</span>
            </a>
            <a
              href="#contact"
              className="font-sans text-sm text-ink-soft hover:text-ink transition-colors"
            >
              Request Walkthrough
            </a>
          </div>

          {/*
            CTA reasoning: the sales CTA earns more clicks after the video and
            the interactive demo than before them — asking for a meeting before
            proving anything is exactly the old structure's mistake.
          */}

          <div className="mt-8 font-mono text-[11px] text-ink-soft/50 tracking-wider uppercase">
            In-VPC Deployment · Zero Data Leakage · BSP Compliant
          </div>
        </motion.div>
      </div>
    </section>
  );
}
