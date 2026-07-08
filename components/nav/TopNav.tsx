"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Experience", href: "#experience" },
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
          ? "py-3 bg-background/75 backdrop-blur-md border-b border-border"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        {/* Monogram */}
        <a
          href="#hero"
          className="group inline-flex items-center gap-2.5"
          aria-label="Home"
        >
          <span className="relative inline-flex items-center justify-center size-8 rounded border border-accent/40 bg-background/40 backdrop-blur-sm transition-colors group-hover:border-accent">
            <span className="font-mono text-xs font-bold text-accent">TS</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            tanmay_shinde
          </span>
        </a>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded font-mono text-[11px] tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 pl-4 pr-3 py-1.5 rounded border border-accent/40 bg-accent/10 text-accent font-mono text-[11px] tracking-widest uppercase hover:bg-accent hover:text-background transition-colors"
        >
          Contact
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}
