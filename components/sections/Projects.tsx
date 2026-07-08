"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, X, Network, AlignLeft } from "lucide-react";
import { projects, currentlyBuilding, PROFILE, type Project } from "@/lib/data";
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
      className="relative px-6 lg:px-10 py-28 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        <div className="flex items-end justify-between gap-8 mb-12 pb-5 border-b border-border">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
            // 02 · projects
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {projects.length} shipped · 2024 — 2026
          </div>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Things I&apos;ve <span className="text-accent">shipped</span>.
        </h2>

        {/* Project list */}
        <ol className="divide-y divide-border border-b border-border">
          {projects.map((p) => (
            <li key={p.slug}>
              <button
                onClick={() => setOpen(p)}
                className="group relative w-full text-left py-8 lg:py-10 grid md:grid-cols-[1fr_auto] gap-4 md:gap-8 items-start hover:pl-2 transition-[padding] duration-300"
              >
                {/* Accent edge on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-px bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
                />

                <div className="space-y-3 min-w-0">
                  <div className="flex items-center flex-wrap gap-2.5 font-mono text-[10px] tracking-[0.22em] uppercase">
                    <span className="text-muted-foreground">
                      {p.year} · {p.role}
                    </span>
                    {p.recognition && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent normal-case tracking-[0.1em]">
                        {p.recognition}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-2xl md:text-4xl text-foreground leading-tight tracking-tight group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-base text-foreground/65 leading-relaxed max-w-2xl">
                    {p.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.stack.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-foreground/70"
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

                <span className="hidden md:flex items-center gap-2 self-center font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground group-hover:text-accent transition-colors">
                  <span className="hidden lg:inline">Case study</span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </li>
          ))}
        </ol>

        {/* Currently building strip */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="size-1.5 rounded-full bg-warn animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-warn">
              currently building
            </span>
            <span className="flex-1 h-px bg-border" aria-hidden />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {currentlyBuilding.map((b) => {
              const inner = (
                <div className="group h-full p-4 rounded-lg border border-border bg-card/40 hover:border-warn/50 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm text-foreground group-hover:text-warn transition-colors">
                      {b.name}
                    </span>
                    {b.github && (
                      <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-warn transition-colors" />
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {b.line}
                  </p>
                </div>
              );
              return b.github ? (
                <a key={b.name} href={b.github} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={b.name}>{inner}</div>
              );
            })}
          </div>
        </div>

        {/* GitHub overflow link */}
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-accent transition-colors"
        >
          <span className="h-px w-10 bg-border group-hover:bg-accent transition-colors" />
          <Github className="size-3.5" />
          More on github · @{PROFILE.githubHandle}
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 size-9 rounded border border-border bg-background/80 backdrop-blur flex items-center justify-center hover:border-accent/60 hover:text-accent transition-colors z-10"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="p-6 md:p-12 space-y-8">
              {/* Header */}
              <header className="space-y-4 pb-6 border-b border-border">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                  <span className="text-muted-foreground">
                    {open.year} · {open.role}
                  </span>
                  {open.recognition && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent normal-case tracking-[0.1em]">
                      {open.recognition}
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight tracking-tight">
                  {open.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl">
                  {open.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {open.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-foreground/75"
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
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[10px] tracking-[0.2em] uppercase border transition-colors ${
                        showDiagram
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      <Network className="size-3.5" /> Architecture
                    </button>
                    <button
                      onClick={() => setShowDiagram(false)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[10px] tracking-[0.2em] uppercase border transition-colors ${
                        !showDiagram
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      <AlignLeft className="size-3.5" /> Details
                    </button>
                  </div>
                  {showDiagram && <DroneArchitecture />}
                </div>
              )}

              {open.embed && (
                <div className="rounded-lg overflow-hidden border border-border">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground px-4 py-2.5 border-b border-border bg-background/60 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent animate-pulse" />
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

              {open.problem && <Field label="The problem" value={open.problem} />}
              {open.solution && (
                <Field label="What I built" value={open.solution} />
              )}
              {open.impact && (
                <div className="grid md:grid-cols-[10rem_1fr] gap-4">
                  <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-accent">
                    Outcome
                  </div>
                  <div className="font-display text-xl text-foreground/90 leading-snug">
                    {open.impact}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {open.github && (
                  <a
                    href={open.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-accent/40 text-accent hover:bg-accent/10 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
                  >
                    <Github className="size-4" /> View source
                  </a>
                )}
                {open.demo && !open.embed && (
                  <a
                    href={open.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-accent/40 text-accent hover:bg-accent/10 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
                  >
                    Open live demo <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
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
