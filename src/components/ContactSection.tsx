"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
            Next step
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
            See Your Decisions Become Infrastructure
          </h2>
          <p className="font-sans text-base text-ink-soft mt-3 max-w-lg mx-auto leading-relaxed">
            We map one real workflow and show how it runs end-to-end without human
            bottlenecks.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 space-y-4 text-left"
        >
          <div>
            <label className="font-sans text-sm text-ink-soft mb-1 block">
              Work Email
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-lg border border-line bg-surface px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-ink-soft mb-1 block">
              Company
            </label>
            <input
              type="text"
              required
              placeholder="Company name"
              className="w-full rounded-lg border border-line bg-surface px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-ink-soft mb-1 block">
              Workflow to Automate
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about the decision workflow you want to automate..."
              className="w-full rounded-lg border border-line bg-surface px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-soft/40 focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-accent text-white font-semibold text-sm px-6 py-3 hover:bg-accent-light transition-colors"
          >
            Book 30-min Workflow Session
          </button>
        </motion.form>

        <p className="font-mono text-[11px] text-ink-soft/50 mt-6">
          Deployed inside customer cloud · Policy-constrained · Fully auditable
        </p>
      </div>
    </section>
  );
}
