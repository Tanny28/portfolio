"use client";

import { useState } from "react";
import { Check, Copy, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

type CopyState = "idle" | "copied" | "failed";

const LINKS = [
  {
    icon: Github,
    label: "GitHub",
    value: `@${PROFILE.githubHandle}`,
    href: PROFILE.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "tanmay-shinde",
    href: PROFILE.linkedin,
  },
  {
    icon: FileDown,
    label: "Resume",
    value: "PDF",
    href: PROFILE.resume,
  },
];

export default function Contact() {
  const [copy, setCopy] = useState<CopyState>("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
    setTimeout(() => setCopy("idle"), 2600);
  };

  return (
    <section
      id="contact"
      className="relative px-6 lg:px-10 pt-24 lg:pt-32 pb-14"
    >
      <div className="mx-auto max-w-[78rem]">
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="lg:col-span-3">
            <div className="flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-4">
              <h2 className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
                Contact
              </h2>
              <span className="h-px flex-1 lg:w-16 lg:flex-none rule-fade" aria-hidden />
            </div>
          </div>

          <div className="lg:col-span-9">
            <h3 className="font-display text-[clamp(2.1rem,6vw,4.5rem)] font-extrabold tracking-[-0.042em] leading-[0.98] max-w-[16ch] reveal-target">
              Building something hard with{" "}
              <span className="text-accent">LLMs or ML</span>? I want in.
            </h3>

            <p className="mt-7 text-[15.5px] leading-[1.75] text-foreground/70 max-w-[56ch]">
              Final-year AI &amp; ML engineer, graduating {PROFILE.graduation}.
              Open to AI/GenAI engineering roles and internships — remote,
              hybrid, or Pune-based.
            </p>

            {/* Email — the primary action, sized like one */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="pressable group inline-flex items-center gap-3 px-6 py-4 rounded-md bg-accent text-background font-mono text-sm font-medium hover:bg-[#ddaa63]"
              >
                <Mail className="size-4" />
                {PROFILE.email}
              </a>
              <button
                onClick={copyEmail}
                className="pressable inline-flex items-center gap-2 px-4 py-4 rounded-md border border-border text-muted-foreground hover:border-accent/50 hover:text-accent font-mono text-xs tracking-[0.15em] uppercase"
              >
                {copy === "copied" ? (
                  <>
                    <Check className="size-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" /> Copy
                  </>
                )}
              </button>
            </div>

            <p
              className="mt-3 font-mono text-[11px] text-muted-foreground min-h-[1rem]"
              role="status"
            >
              {copy === "failed" &&
                "Clipboard unavailable — select the address above to copy it manually."}
            </p>

            {/* Secondary links — plain rows, not a card grid */}
            <ul className="mt-10 border-t border-border max-w-[38rem]">
              {LINKS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="border-b border-border">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 py-3.5 transition-[padding] duration-300 ease-spring hover:pl-2"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                        {label}
                      </span>
                    </span>
                    <span className="font-mono text-[13px] text-foreground/80 transition-colors group-hover:text-accent">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-24 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <span>Built by Tanmay Shinde</span>
          <span>Next.js · Tailwind · Vercel</span>
        </footer>
      </div>
    </section>
  );
}
