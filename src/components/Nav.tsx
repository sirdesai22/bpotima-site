"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/industries", label: "Industries" },
  { href: "/models", label: "Model Family" },
  { href: "/company", label: "Founder" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-line">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-xl font-bold text-ink">
          BPOptima
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-accent text-white text-sm font-semibold hover:bg-accent-light transition-colors"
        >
          Request Walkthrough
        </a>
      </div>
    </header>
  );
}
