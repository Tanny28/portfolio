"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Copy, Check, FileDown } from "lucide-react";
import { PROFILE } from "@/lib/data";

const LINKS = [
  {
    icon: Github,
    label: "GitHub",
    value: `github.com/${PROFILE.githubHandle}`,
    href: PROFILE.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/tanmay-shinde",
    href: PROFILE.linkedin,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, India · open to remote",
    href: undefined,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — mailto link still works
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen px-6 lg:px-10 py-28 flex flex-col items-center justify-center"
    >
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
          // 06 · contact
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Building something hard with{" "}
          <span className="text-accent">LLMs or ML</span>? I want in.
        </h2>

        <p className="text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Final-year AI & ML engineer, graduating {PROFILE.graduation}. Open to
          AI/GenAI engineering roles and internships — remote, hybrid, or
          Pune-based.
        </p>

        {/* Copy-email — primary action */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-md bg-accent text-background font-mono text-sm font-medium hover:shadow-[0_0_36px_rgba(69,224,200,0.35)] transition-shadow"
          >
            {copied ? (
              <>
                <Check className="size-4" /> Copied to clipboard
              </>
            ) : (
              <>
                <Copy className="size-4" /> {PROFILE.email}
              </>
            )}
          </button>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-accent/50 text-accent font-mono text-sm hover:bg-accent/10 transition-colors"
          >
            <Mail className="size-4" /> Open mail
          </a>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-border text-foreground font-mono text-sm hover:border-accent/50 hover:text-accent transition-colors"
          >
            <FileDown className="size-4" /> Resume
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 pt-4 text-left">
          {LINKS.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="group flex items-center gap-3 p-4 rounded-md border border-border bg-card/60 hover:border-accent/50 transition-colors h-full">
                <div className="size-9 rounded border border-border flex items-center justify-center group-hover:border-accent/50 shrink-0">
                  <Icon className="size-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                    {label}
                  </div>
                  <div className="font-mono text-xs truncate">{value}</div>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-16 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          built by tanmay · next.js + tailwind · deployed on vercel
        </div>
      </div>
    </section>
  );
}
