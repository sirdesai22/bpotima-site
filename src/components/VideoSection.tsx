"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section id="video" className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
            See it run
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
            Watch a real decision run end to end.
          </h2>
          <p className="font-sans text-base md:text-lg text-ink-soft mt-3 max-w-2xl leading-relaxed">
            One document goes in. Watch it get understood, decided, and routed — with
            the full justification attached.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 aspect-video rounded-xl border border-line bg-surface flex items-center justify-center"
        >
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-accent/20 flex items-center justify-center mb-4">
              <div className="w-0 h-0 border-y-8 border-l-[14px] border-y-transparent border-l-accent ml-1" />
            </div>
            <p className="font-sans text-sm text-ink-soft">Product demo video</p>
            <p className="font-mono text-[11px] text-ink-soft/50 mt-1">
              60–90s · 16:9
            </p>
            <p className="font-mono text-[10px] text-ink-soft/30 mt-3 max-w-md">
              [PLACEHOLDER — Replace with actual 16:9 product demo video. See shot
              list in plan5.md §4 Video section.]
            </p>
          </div>
        </motion.div>

        <p className="font-mono text-[11px] text-ink-soft/50 mt-4">
          [FLAG: Verify whether demo footage is from a live deployment before
          captioning as &ldquo;Recorded on a live financial-services deployment. No
          synthetic data.&rdquo;]
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <a
            href="#interactive-demo"
            className="font-sans text-base font-semibold text-accent hover:text-accent-light transition-colors"
          >
            Don&apos;t take the video&apos;s word for it. Run one yourself, below. &darr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
