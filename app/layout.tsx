import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Archivo } from "next/font/google";
import AgentChat from "@/components/chat/AgentChat";
import Cursor from "@/components/effects/Cursor";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Spotlight from "@/components/effects/Spotlight";
import KonamiEgg from "@/components/effects/KonamiEgg";
import TopNav from "@/components/nav/TopNav";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const SITE_URL = "https://tanmay-shinde-28.vercel.app";

export const metadata: Metadata = {
  title: "Tanmay Shinde — AI/GenAI Engineer",
  description:
    "Final-year AI & ML engineer building production-grade GenAI systems: LLM apps, RAG, agents, and ML models. Best Research Paper award · national hackathon Top 25.",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "AI engineer",
    "GenAI",
    "LLM",
    "RAG",
    "agents",
    "machine learning",
    "Pune",
    "portfolio",
  ],
  authors: [{ name: "Tanmay Shinde", url: SITE_URL }],
  openGraph: {
    title: "Tanmay Shinde — AI/GenAI Engineer",
    description:
      "Final-year AI & ML engineer building production-grade GenAI systems: LLM apps, RAG, agents, and ML models.",
    url: SITE_URL,
    siteName: "Tanmay Shinde",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Shinde — AI/GenAI Engineer",
    description:
      "Final-year AI & ML engineer building production-grade GenAI systems: LLM apps, RAG, agents, and ML models.",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${archivo.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <TopNav />
        {children}
        <div className="noise-overlay" aria-hidden />
        <AgentChat />
        <Cursor />
        <ScrollReveal />
        <Spotlight />
        <KonamiEgg />
      </body>
    </html>
  );
}
