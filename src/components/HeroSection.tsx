"use client";

import { motion } from "framer-motion";
import { heroContent } from "@content/home";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-8 md:pt-32 md:pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight text-ink max-w-4xl mx-auto"
        >
          {heroContent.claim}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed"
        >
          {heroContent.mechanism}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 font-mono text-[11px] text-ink-soft/40"
        >
          See it below &darr;
        </motion.p>
      </div>
    </section>
  );
}
