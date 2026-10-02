import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import AgentChat from "@/components/chat/AgentChat";
import "./globals.css";
import "./site.css";
import { SITE } from "@/lib/constants";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const SITE_URL = SITE.url;

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Tanmay Shinde — AI/GenAI Engineer",
  description:
    "Final-year AI & ML engineer building production-grade GenAI systems: LLM apps, RAG, agents, and ML models. Best Research Paper award · national hackathon Top 25.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
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
    <html lang="en" className={onest.variable} suppressHydrationWarning>
      <body>
        {/* Runs before first paint so returning visitors never see the intro loader flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('intro-seen')==='1')document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
        <AgentChat />
      </body>
    </html>
  );
}
