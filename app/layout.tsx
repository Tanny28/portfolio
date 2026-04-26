import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import AgentChat from "@/components/chat/AgentChat";
import Cursor from "@/components/effects/Cursor";
import ScrollReveal from "@/components/effects/ScrollReveal";
import KonamiEgg from "@/components/effects/KonamiEgg";
import TopNav from "@/components/nav/TopNav";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const SITE_URL = "https://portfolio-tanny28s-projects.vercel.app";

export const metadata: Metadata = {
  title: "Tanmay Shinde · AI Engineer",
  description:
    "B.Tech AI-ML student at PCU Pune building production Gen AI — LLM agents, RAG pipelines, and VLM-powered systems. Best Research Paper ICCTVB-25. Open to AI Engineer internships 2026.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Tanmay Shinde · AI Engineer",
    description:
      "Building production Gen AI — LLM agents, RAG pipelines, and VLM-powered systems. Best Research Paper ICCTVB-25.",
    url: SITE_URL,
    siteName: "Tanmay Shinde",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Shinde · AI Engineer",
    description:
      "Building production Gen AI — LLM agents, RAG pipelines, and VLM-powered systems. Best Research Paper ICCTVB-25.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <TopNav />
        {children}
        <div className="noise-overlay" aria-hidden />
        <AgentChat />
        <Cursor />
        <ScrollReveal />
        <KonamiEgg />
      </body>
    </html>
  );
}
