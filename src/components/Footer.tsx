import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-sm text-ink-soft">
          <Link href="/" className="font-serif text-base font-semibold text-ink">
            BPOptima
          </Link>
          <Link href="/product" className="hover:text-ink transition-colors">
            Product
          </Link>
          <Link href="/trust" className="hover:text-ink transition-colors">
            Trust
          </Link>
          <Link href="/company" className="hover:text-ink transition-colors">
            Company
          </Link>
          <Link href="/docs" className="hover:text-ink transition-colors">
            Docs
          </Link>
        </div>
        <p className="text-xs text-ink-soft">
          &copy; {new Date().getFullYear()} BPOptima. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
