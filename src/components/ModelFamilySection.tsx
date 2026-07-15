"use client";

import { motion } from "framer-motion";

const models = [
  {
    name: "Groundset-Logic",
    tag: "Reasoning · Policy Enforcement",
    desc: "We constrain frontier reasoning capabilities with our proprietary deterministic policy layers to execute complex compliance checks and underwriting without hallucination.",
    specs: "Base: Qwen 3.5 / Llama 3 (up to 110B) · Context: 256K tokens",
    use: "Complex underwriting, multi-turn decision logic, policy routing",
    chips: ["Deterministic outputs", "Audit-ready justification", "Edge-deployable"],
  },
  {
    name: "Groundset-Vision",
    tag: "Vision · Extraction",
    desc: "Raw visual understanding, domain-trained on messy financial and medical documents to extract structured, actionable data from unstructured reality.",
    specs: "Base: GLM OCR 4V · Accuracy: >98.7% on messy/Asian docs",
    use: "KYC/ID verification, handwritten ledgers, medical claims",
    chips: ["Zero-shot extraction", "Multi-language handwriting", "Table extraction"],
  },
  {
    name: "Groundset-Motion",
    tag: "Spatial · Video Extraction",
    desc: "Frame-by-frame temporal reasoning to extract operational intelligence and trigger automated compliance workflows.",
    specs: "Base: Qwen-VL / Frontier Vision · Processing: 30fps temporal parsing",
    use: "CCTV audit, warehouse logistics, remote site inspection",
    chips: ["Temporal tracking", "Anomaly detection", "Stream-to-JSON"],
  },
  {
    name: "Groundset-Audio",
    tag: "Audio · Diarization",
    desc: "High-fidelity speech recognition and speaker diarization tuned for heavily accented, multi-speaker enterprise voice logs.",
    specs: "Base: Whisper-v3 / Seamless · Modality: voice-to-structured-data",
    use: "Trading floor logs, customer dispute resolution, telehealth",
    chips: ["Multi-speaker separation", "Sentiment extraction", "Noise suppression"],
  },
  {
    name: "Groundset-Speed",
    tag: "High-Throughput · Low Latency",
    desc: "Optimized SLMs handling standard document classification and basic triage with sub-100ms latency.",
    specs: "Base: Qwen 2.5 (7B–14B) · Latency: <100ms end-to-end",
    use: "Document triage, metadata tagging, basic routing",
    chips: ["High concurrency", "Low compute footprint", "Fixed economics"],
  },
  {
    name: "Groundset-Sovereign",
    tag: "Sovereign · Domain-Specific",
    desc: "Fine-tuned directly on your proprietary enterprise data, aligned to your internal risk appetite.",
    specs: "Training: 100% customer data · Deployment: air-gapped / in-VPC only",
    use: "Proprietary risk models, legacy integrations, local compliance",
    chips: ["IP retention", "Infinite scalability", "BSP/HIPAA compliant"],
  },
];

export default function ModelFamilySection() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
          Proprietary AI architecture
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
          The Groundset&trade; Model Family
        </h2>
        <p className="font-sans text-base md:text-lg text-ink-soft mt-3 max-w-3xl leading-relaxed">
          Not API wrappers. A highly opinionated, orchestrated stack of
          domain-specialized edge models, each trained for a specific task, deployed
          inside your VPC.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-line bg-surface p-5 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-sans text-base font-bold text-ink">
                  {m.name}
                </h3>
                <span className="font-mono text-[9px] text-accent uppercase tracking-wider whitespace-nowrap border border-accent/20 rounded px-1.5 py-0.5">
                  {m.tag.split(" · ")[0]}
                </span>
              </div>
              <p className="font-mono text-[10px] text-ink-soft mt-1 leading-relaxed">
                {m.tag}
              </p>
              <p className="font-sans text-sm text-ink-soft/80 mt-3 leading-relaxed flex-1">
                {m.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-line/50 space-y-1 font-mono text-[11px] text-ink-soft/70">
                <p>{m.specs}</p>
                <p>Use cases: {m.use}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {m.chips.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-[9px] text-ink-soft/60 border border-line rounded px-1.5 py-0.5"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
