export const heroContent = {
  claim: "The judgment behind every decision, finally on the record.",
  mechanism:
    "GroundSet reads your evidence, applies your rules, and logs every step — so the call is never a guess and never a black box.",
};

export const howItWorksStages = [
  {
    number: "01",
    title: "Evidence",
    description:
      "Documents, images, video — GroundSet reads them into structured, queryable data, grounded to source lines you can inspect.",
  },
  {
    number: "02",
    title: "Structured data",
    description:
      "Extracted fields carry a pointer back to their origin: line 14 of the PDF, frame 203 of the video. Nothing appears from nowhere.",
  },
  {
    number: "03",
    title: "Your rules",
    description:
      "The client's own deterministic if/then logic evaluates each case. GroundSet never rewrites, reweights, or guesses at your policy.",
  },
  {
    number: "04",
    title: "Routed decision + audit trail",
    description:
      "Every rule evaluation, every routing decision, every timestamp — sealed and exportable. The record is the truth, not a summary.",
  },
];

export const deterministicContent = {
  heading: "Why deterministic matters",
  body: "When a regulation calls for a decision, the regulator wants to know what rule was applied, to what facts, by whom. Black-box models cannot answer that question. GroundSet can, because it never replaces your rules with a model's approximation. It reads the evidence, presents the facts, applies the policy you wrote, and logs every step. The answer is not a prediction — it is a conclusion you could have reached yourself, automated at scale.",
};

export const ctoContent = {
  heading: "Built for engineers who ship",
  body: "GroundSet is model-agnostic and deployable on your infrastructure — VPC, on-premise, or air-gapped. Rule sets are version-controlled, auditable, and testable. Audit records export as structured data, not PDF screenshots. There is no black box between your evidence and your decision; there is only the pipeline you configure and the rules you write.",
  cta: "Read the architecture",
  ctaHref: "/product",
};

export const closingContent = {
  heading: "Talk to our team",
  body: "If your organization makes high-stakes decisions on documents, data, and judgment, we should talk. No demo theater, no slide deck — we will show you how GroundSet routes a real case with your rules on your timeline.",
};
