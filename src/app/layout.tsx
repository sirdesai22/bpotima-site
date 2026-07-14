import type { Metadata } from "next";
import { ibmPlexSerif, ibmPlexSans, ibmPlexMono } from "./fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BPOptima — GroundSet",
  description:
    "GroundSet reads your evidence, applies your rules, and logs every step — so every decision is auditable, deterministic, and never a black box.",
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
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
