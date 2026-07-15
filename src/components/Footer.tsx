import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <Link href="/" className="font-serif text-lg font-bold text-ink">
              BPOptima
            </Link>
            <p className="font-sans text-sm text-ink-soft mt-2 max-w-xs">
              Decision Infrastructure for Regulated Operations
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft">
            <Link href="/how-it-works" className="hover:text-ink transition-colors">How It Works</Link>
            <Link href="/industries" className="hover:text-ink transition-colors">Industries</Link>
            <Link href="/models" className="hover:text-ink transition-colors">Model Family</Link>
            <Link href="/company" className="hover:text-ink transition-colors">Founder</Link>
            <Link href="/security" className="hover:text-ink transition-colors">Security &amp; Compliance</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-ink-soft">
          <div>
            <span className="font-mono">🇸🇬</span> 32 Pekin Street, #05-01, Singapore 048762
            <span className="mx-2">·</span>
            <span className="font-mono">🇮🇩</span> Indonesia <span className="font-mono">·</span>
            <span className="font-mono">🇻🇳</span> Vietnam <span className="font-mono">·</span>
            <span className="font-mono">🇹🇭</span> Thailand
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-ink transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-ink transition-colors">Security &amp; Compliance</Link>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-ink-soft/60 font-mono">
          &copy; 2026 BP Optima Pte Ltd. All rights reserved. UEN: 202544773H | Registered in Singapore
        </p>
      </div>
    </footer>
  );
}
