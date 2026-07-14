import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation | BPOptima",
  description: "BPOptima documentation — architecture, API reference, and deployment guides.",
};

const docSections = [
  {
    title: "Getting Started",
    items: [
      "Quickstart guide",
      "System requirements",
      "Deployment options",
      "Authentication & access control",
    ],
    placeholder: true,
  },
  {
    title: "Architecture",
    items: [
      "Pipeline overview",
      "Extraction models",
      "Rules engine",
      "Audit system",
    ],
    placeholder: true,
  },
  {
    title: "API Reference",
    items: [
      "REST API endpoints",
      "Webhook events",
      "SDK & client libraries",
      "Rate limits & pagination",
    ],
    placeholder: true,
  },
  {
    title: "Operations",
    items: [
      "Monitoring & alerting",
      "Backup & recovery",
      "Scaling guidelines",
      "Incident response",
    ],
    placeholder: true,
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
        Documentation
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-2xl mb-16">
        [PLACEHOLDER] GroundSet documentation — architecture, deployment, API reference, and operations.
        Full documentation is under active development.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {docSections.map((section) => (
          <div
            key={section.title}
            className="rounded-lg border border-line bg-surface p-6"
          >
            <h2 className="font-serif text-xl text-ink mb-4">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="font-sans text-sm text-ink-soft flex items-center gap-2"
                >
                  <span className="text-line">&mdash;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-16 border-t border-line text-center">
        <p className="font-sans text-sm text-ink-soft/60">
          [PLACEHOLDER] Documentation is under active development.
          <br />
          <Link href="/" className="text-accent hover:text-accent-light transition-colors">
            Return to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
