import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import AgentChat from "@/components/chat/AgentChat";
import Cursor from "@/components/effects/Cursor";
import ScrollReveal from "@/components/effects/ScrollReveal";
import KonamiEgg from "@/components/effects/KonamiEgg";
import TopNav from "@/components/nav/TopNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
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
