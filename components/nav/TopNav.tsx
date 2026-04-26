"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-foreground/5"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        {/* Monogram */}
        <a
          href="#hero"
          className="group inline-flex items-center gap-2.5"
          aria-label="Home"
        >
          <span className="relative inline-flex items-center justify-center size-9 rounded-full border border-foreground/15 bg-background/40 backdrop-blur-sm transition-colors group-hover:border-accent/60">
            <span className="font-serif italic text-base text-foreground transition-colors group-hover:text-accent">
              ts
            </span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Tanmay
          </span>
        </a>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA pill */}
        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 pl-4 pr-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-[11px] tracking-widest uppercase hover:bg-accent hover:text-background transition-colors"
        >
          Get in touch
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}
