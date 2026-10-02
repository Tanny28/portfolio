import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import AgentChat from "@/components/chat/AgentChat";
import "./globals.css";
import "./site.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const SITE_URL = "https://tanmay-shinde-28.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

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
    <html lang="en" className={onest.variable}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
        <AgentChat />
      </body>
    </html>
  );
}
