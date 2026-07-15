import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Family | BPOptima",
  description:
    "The Groundset model family: six domain-specialized models for reasoning, vision, motion, audio, speed, and sovereign deployments.",
};

const models = [
  {
    name: "Groundset-Logic",
    tag: "Reasoning · Policy Enforcement",
    desc: "Constrained frontier reasoning with proprietary deterministic policy layers for complex compliance checks and underwriting without hallucination.",
    specs: "Base: Qwen 3.5 / Llama 3 (up to 110B) · Context: 256K tokens",
    use: "Complex underwriting, multi-turn decision logic, policy routing",
  },
  {
    name: "Groundset-Vision",
    tag: "Vision · Extraction",
    desc: "Domain-trained on messy financial and medical documents for zero-shot extraction of structured data from unstructured reality.",
    specs: "Base: GLM OCR 4V · Accuracy: >98.7% on messy/Asian docs",
    use: "KYC/ID verification, handwritten ledgers, medical claims",
  },
  {
    name: "Groundset-Motion",
    tag: "Spatial · Video Extraction",
    desc: "Frame-by-frame temporal reasoning for continuous visual data streams. Extracts operational intelligence and triggers automated compliance workflows.",
    specs: "Base: Qwen-VL / Frontier Vision · Processing: 30fps temporal parsing",
    use: "CCTV audit, warehouse logistics, remote site inspection",
  },
  {
    name: "Groundset-Audio",
    tag: "Audio · Diarization",
    desc: "High-fidelity speech recognition and speaker diarization tuned for heavily accented, multi-speaker enterprise voice logs.",
    specs: "Base: Whisper-v3 / Seamless · Modality: voice-to-structured-data",
    use: "Trading floor logs, customer dispute resolution, telehealth",
  },
  {
    name: "Groundset-Speed",
    tag: "High-Throughput · Low Latency",
    desc: "Optimized SLMs for standard document classification and basic triage with sub-100ms latency.",
    specs: "Base: Qwen 2.5 (7B–14B) · Latency: <100ms end-to-end",
    use: "Document triage, metadata tagging, basic routing",
  },
  {
    name: "Groundset-Sovereign",
    tag: "Sovereign · Domain-Specific",
    desc: "Fine-tuned on proprietary enterprise data exhaust, creating a model explicitly aligned to internal risk appetite.",
    specs: "Training: 100% customer data · Deployment: air-gapped / in-VPC only",
    use: "Proprietary risk models, legacy integrations, local compliance",
  },
];

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
      <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
        The Groundset&trade; Model Family
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-3xl mb-16 leading-relaxed">
        Not API wrappers. An orchestrated stack of domain-specialized edge models, each
        trained for a specific task, deployed inside your VPC.
      </p>

      <div className="space-y-6">
        {models.map((m, i) => (
          <div
            key={m.name}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-sans text-lg font-bold text-ink">{m.name}</h2>
                <p className="font-mono text-[11px] text-ink-soft mt-0.5">{m.tag}</p>
              </div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-wider">
                Model #{i + 1}
              </span>
            </div>
            <p className="font-sans text-sm text-ink-soft/80 mt-3 max-w-2xl leading-relaxed">
              {m.desc}
            </p>
            <div className="mt-3 font-mono text-[11px] text-ink-soft/70 space-y-0.5">
              <p>{m.specs}</p>
              <p>Use cases: {m.use}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
