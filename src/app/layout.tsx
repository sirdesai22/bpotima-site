import type { Metadata } from "next";
import { ibmPlexSerif, ibmPlexSans, ibmPlexMono } from "./fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BPOptima — Sovereign Decision Infrastructure",
  description:
    "Domain-trained SLMs deployed inside your VPC. Understand → Decide → Route. ~99% accuracy, <100ms latency, zero data leakage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
