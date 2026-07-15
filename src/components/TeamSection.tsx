"use client";

import { motion } from "framer-motion";

export default function TeamSection() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
            Daksh Jaiswal — Founder
          </h2>
          <p className="font-sans text-sm text-ink-soft mt-4 leading-relaxed">
            DJ brings over a decade of expertise at the intersection of AI, regulated
            finance, and hyper-scale infrastructure. Prior to BPOptima, he served as
            Interim CTO/VP at a $200M ARR NBFC, where he launched an AI-driven risk
            engine processing $34M+ in credit disbursements. He previously founded
            Sauda Tech (processing ~$67M GMV), drove blitz-scale growth at multiple
            VC-backed B2B SaaS ventures, and has angel-invested in 18 startups (3
            exits, 27% realized IRR). His operator background ensures BPOptima is
            architected for the strict compliance and throughput demands of
            institutional CTOs.
          </p>
          <div className="flex items-center gap-4 mt-4 font-mono text-[11px] text-ink-soft">
            <span className="border border-accent/20 text-accent rounded px-2 py-0.5">
              Antler Portfolio Company
            </span>
            <a href="mailto:dj@bpoptima.com" className="text-accent hover:underline">
              dj@bpoptima.com
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <h3 className="font-sans text-base font-bold text-accent">
              Traction &amp; Scale
            </h3>
            <p className="font-sans text-sm text-ink-soft mt-3 leading-relaxed">
              BPOptima&apos;s sovereign decision infrastructure is currently deployed in
              production for a Tier-1 digital bank in APAC. We partner with
              institutional risk officers and enterprise operators to automate
              complex, multi-modal workflows where strict compliance, speed, and
              zero data leakage are mandatory.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <h3 className="font-sans text-base font-bold text-accent">
              Core Engineering &amp; Platform Team
            </h3>
            <p className="font-sans text-sm text-ink-soft mt-3 leading-relaxed">
              Backed by Antler, BPOptima&apos;s core infrastructure group brings together
              deep-tech engineering talent specialized in edge-based Small Language
              Models (SLMs), Vision Language Models (VLMs), and low-latency GPU
              orchestration (via vLLM). Our engineering foundation is built on
              memory-safe (Rust), deterministic policy layers deployed exclusively
              within secure enterprise VPC environments.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
