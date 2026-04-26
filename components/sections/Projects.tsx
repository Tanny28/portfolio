"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, X, Network, AlignLeft } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import dynamic from "next/dynamic";

const DroneArchitecture = dynamic(
  () => import("@/components/projects/DroneArchitecture"),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 rounded-lg bg-muted/30 animate-pulse" />
    ),
  }
);

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const [showDiagram, setShowDiagram] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 lg:px-10 py-32 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        {/* Section header — editorial style */}
        <div className="flex items-end justify-between gap-8 mb-16 lg:mb-20 pb-6 border-b border-foreground/10">
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              § Selected work
            </div>
            <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
              Things I&apos;ve <span className="text-accent">shipped.</span>
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70 text-right">
            <div>{projects.length} projects</div>
            <div>2024 — 2025</div>
          </div>
        </div>

        {/* Editorial project list */}
        <ol className="divide-y divide-foreground/8 border-b border-foreground/8">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button
                onClick={() => setOpen(p)}
                className="group relative w-full text-left py-8 lg:py-12 grid grid-cols-[3rem_1fr_auto] md:grid-cols-[5rem_1fr_auto] gap-4 md:gap-8 items-start hover:pl-2 transition-[padding] duration-300"
              >
                {/* Amber edge on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-px bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
                />

                {/* Numbering */}
                <span className="font-serif italic text-3xl md:text-5xl text-foreground/30 group-hover:text-accent transition-colors leading-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title + body */}
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center flex-wrap gap-2.5">
                    {p.highlight && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10 font-mono text-[9px] tracking-[0.25em] uppercase text-accent">
                        Featured
                      </span>
                    )}
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      {p.year} · {p.status}
                    </span>
                  </div>

                  <h3 className="font-serif italic text-3xl md:text-5xl text-foreground leading-[1.05] tracking-tight">
                    {p.title}
                  </h3>

                  <p className="text-base md:text-lg text-foreground/65 leading-relaxed max-w-2xl">
                    {p.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.stack.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-foreground/10 text-foreground/70"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 6 && (
                      <span className="font-mono text-[10px] px-2 py-0.5 text-muted-foreground">
                        +{p.stack.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <span className="hidden md:flex items-center gap-2 self-center font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-accent transition-colors">
                  <span className="hidden lg:inline">Read</span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </li>
          ))}
        </ol>

        {/* GitHub overflow link — bottom row */}
        <a
          href="https://github.com/Tanny28"
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-accent transition-colors"
        >
          <span className="h-px w-10 bg-foreground/20 group-hover:bg-accent transition-colors" />
          <Github className="size-3.5" />
          More on github · @Tanny28
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* ── Modal: project case study ─────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-foreground/10 bg-card shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 size-9 rounded-full border border-foreground/10 bg-background/80 backdrop-blur flex items-center justify-center hover:border-accent/60 hover:text-accent transition-colors z-10"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="p-6 md:p-12 space-y-8">
              {/* Header */}
              <header className="space-y-4 pb-6 border-b border-foreground/10">
                <div className="flex flex-wrap items-center gap-2">
                  {open.highlight && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10 font-mono text-[9px] tracking-[0.25em] uppercase text-accent">
                      Featured
                    </span>
                  )}
                  <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                    {open.year} · {open.status}
                  </span>
                </div>
                <h3 className="font-serif italic text-4xl md:text-5xl text-foreground leading-[1.05] tracking-tight">
                  {open.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
                  {open.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {open.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-foreground/10 text-foreground/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </header>

              {/* Drone architecture diagram */}
              {open.slug === "drone-security-analyst" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowDiagram(true)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase border transition-colors ${
                        showDiagram
                          ? "border-accent text-accent bg-accent/10"
                          : "border-foreground/15 text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      <Network className="size-3.5" /> Architecture
                    </button>
                    <button
                      onClick={() => setShowDiagram(false)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase border transition-colors ${
                        !showDiagram
                          ? "border-accent text-accent bg-accent/10"
                          : "border-foreground/15 text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      <AlignLeft className="size-3.5" /> Details
                    </button>
                  </div>
                  {showDiagram && <DroneArchitecture />}
                </div>
              )}

              {open.embed && (
                <div className="rounded-xl overflow-hidden border border-foreground/10">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground px-4 py-2.5 border-b border-foreground/10 bg-background/60 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live demo
                    </span>
                    <a
                      href={open.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline"
                    >
                      open in new tab <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                  <iframe
                    src={open.embed}
                    title={open.title}
                    className="w-full h-[520px] bg-background"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Editorial fields — serif body, small caps labels */}
              {open.problem && <Field label="The problem" value={open.problem} />}
              {open.solution && <Field label="The approach" value={open.solution} />}
              {open.impact && (
                <div className="grid md:grid-cols-[10rem_1fr] gap-4">
                  <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-accent">
                    Outcome
                  </div>
                  <div className="font-serif italic text-xl text-foreground/90 leading-snug">
                    {open.impact}
                  </div>
                </div>
              )}

              {open.demo && !open.embed && (
                <a
                  href={open.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/40 text-accent hover:bg-accent/10 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
                >
                  Open live demo <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid md:grid-cols-[10rem_1fr] gap-4 items-start">
      <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
        {label}
      </div>
      <p className="text-base text-foreground/85 leading-relaxed">{value}</p>
    </div>
  );
}
