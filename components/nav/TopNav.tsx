"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Stack", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — marks the section currently occupying the upper viewport.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-nav transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-border"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[78rem] px-6 lg:px-10 flex items-center justify-between gap-6">
        <a
          href="#hero"
          className="group inline-flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="inline-flex items-center justify-center size-8 rounded-sm border border-accent/40 transition-colors group-hover:border-accent group-hover:bg-accent/10">
            <span className="font-mono text-[11px] font-bold text-accent">
              TS
            </span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            Tanmay Shinde
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Sections">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute left-3 right-3 -bottom-0.5 h-px bg-accent transition-transform duration-300 ease-spring origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="pressable inline-flex items-center px-4 py-1.5 rounded-sm border border-accent/40 bg-accent/[0.07] text-accent font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-accent hover:text-background"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
