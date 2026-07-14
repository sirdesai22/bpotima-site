"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ctoContent } from "@content/home";

export default function ForCTO() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
            {ctoContent.heading}
          </h2>
          <p className="font-sans text-base md:text-lg text-ink-soft leading-relaxed mb-6">
            {ctoContent.body}
          </p>
          <Link
            href={ctoContent.ctaHref}
            className="inline-flex items-center gap-1 font-mono text-sm text-accent hover:text-accent-light transition-colors"
          >
            {ctoContent.cta} &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
