import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company | BPOptima",
  description: "The BPOptima team, investors, and mission.",
};

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
        Company
      </h1>
      <p className="font-sans text-lg text-ink-soft max-w-2xl mb-16">
        [PLACEHOLDER] The team building the system of record for judgment calls.
      </p>

      <div className="space-y-16">
        <section className="max-w-3xl">
          <h2 className="font-serif text-2xl text-ink mb-4">Mission</h2>
          <p className="font-sans text-base text-ink-soft leading-relaxed">
            [PLACEHOLDER] Every high-stakes decision — credit, claims, compliance — should leave a
            complete, auditable record. Not a score, not a prediction, but a trail from evidence to
            rule to decision that anyone can follow. BPOptima exists to make that the standard, not
            the exception.
          </p>
        </section>

        <section className="max-w-3xl">
          <h2 className="font-serif text-2xl text-ink mb-4">Team</h2>
          <p className="font-sans text-base text-ink-soft leading-relaxed">
            [PLACEHOLDER] Founded by engineers and risk practitioners who have built decision
            infrastructure at scale — from regulatory compliance platforms to real-time fraud
            detection systems handling billions in transaction volume.
          </p>
        </section>

        <section className="max-w-3xl">
          <h2 className="font-serif text-2xl text-ink mb-4">Investors</h2>
          <p className="font-sans text-base text-ink-soft leading-relaxed">
            [PLACEHOLDER] Backed by leading enterprise and infrastructure investors who understand
            that the next category in enterprise software is not another AI application — it is the
            layer that makes AI accountable.
          </p>
        </section>
      </div>
    </div>
  );
}
