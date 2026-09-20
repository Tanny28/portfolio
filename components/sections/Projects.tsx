"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, X } from "lucide-react";
import { projects, currentlyBuilding, PROFILE, type Project } from "@/lib/data";
import Section from "@/components/ui/Section";
import FileDiff, { type DiffRow } from "@/components/ui/FileDiff";
import dynamic from "next/dynamic";

// Illustrates Pixa Agent's core mechanic — a staged, reviewable edit — using
// its documented provider-agnostic design. Marked illustrative in the caption.
const PIXA_DIFF: DiffRow[] = [
  { old: 8, cur: 8, type: "ctx", text: "export async function complete(prompt: string) {" },
  { old: 9, cur: null, type: "del", text: "  return openai.chat.completions.create({" },
  { old: 10, cur: null, type: "del", text: '    model: "gpt-4o",' },
  { old: null, cur: 9, type: "add", text: "  return provider.complete({" },
  { old: null, cur: 10, type: "add", text: "    model: config.model," },
  { old: 11, cur: 11, type: "ctx", text: "    messages: [{ role: \"user\", content: prompt }]," },
  { old: 12, cur: 12, type: "ctx", text: "  });" },
  { old: 13, cur: 13, type: "ctx", text: "}" },
];

const DroneArchitecture = dynamic(
  () => import("@/components/projects/DroneArchitecture"),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 rounded-lg bg-surface-raised animate-pulse" />
    ),
  }
);

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

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
    <Section
      id="projects"
      label="Projects"
      meta={`${projects.length} shipped`}
      tail
    >
      <h3 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.035em] leading-[1.02] max-w-[16ch] reveal-target">
        Things I&apos;ve <span className="text-accent">shipped</span>.
      </h3>

      <ol className="mt-12 border-t border-border">
        {projects.map((p, i) => (
          <li key={p.slug} id={p.slug} className="border-b border-border">
            <button
              onClick={() => setOpen(p)}
              className="group relative w-full text-left py-7 lg:py-9 grid md:grid-cols-[1fr_auto] gap-x-8 gap-y-3 items-start transition-[padding] duration-500 ease-spring hover:pl-3"
              aria-label={`Open case study: ${p.title}`}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent origin-top scale-y-0 transition-transform duration-500 ease-spring group-hover:scale-y-100"
              />

              <div className="min-w-0">
                <div className="flex items-center flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                  <span className="text-muted-foreground tabular">
                    {p.year}
                  </span>
                  <span className="text-muted-foreground/60">/</span>
                  <span className="text-muted-foreground">{p.role}</span>
                  {p.recognition && (
                    <span className="px-2 py-0.5 border border-accent/35 bg-accent/[0.07] text-accent normal-case tracking-[0.06em]">
                      {p.recognition}
                    </span>
                  )}
                </div>

                <h4 className="mt-3 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-bold tracking-[-0.035em] leading-[1.06] transition-colors duration-300 group-hover:text-accent">
                  {p.title}
                </h4>

                <p className="mt-2.5 text-[15px] leading-[1.65] text-foreground/60 max-w-[58ch]">
                  {p.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2 py-1 rounded-sm border border-border text-foreground/65"
                    >
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 6 && (
                    <span className="font-mono text-[10px] px-2 py-1 text-muted-foreground">
                      +{p.stack.length - 6}
                    </span>
                  )}
                </div>
              </div>

              <span className="hidden md:flex items-center gap-2 self-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                <span className="hidden lg:inline">Case study</span>
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* Currently building — deliberately quieter than shipped work */}
      <div className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            Currently building
          </span>
          <span className="flex-1 h-px rule-fade" aria-hidden />
        </div>
        <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-5">
          {currentlyBuilding.map((b, i) => {
            const body = (
              <div className="group h-full py-3 border-t border-dashed border-border-strong">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[13px] text-foreground/85 transition-colors group-hover:text-accent">
                    {b.name}
                  </span>
                  {b.github && (
                    <ArrowUpRight className="size-3 text-muted-foreground transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </div>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-muted-foreground">
                  {b.line}
                </p>
              </div>
            );
            return b.github ? (
              <a
                key={b.name}
                href={b.github}
                target="_blank"
                rel="noreferrer"
                className="reveal-target"
                data-delay={String((i % 4) + 1)}
              >
                {body}
              </a>
            ) : (
              <div
                key={b.name}
                className="reveal-target"
                data-delay={String((i % 4) + 1)}
              >
                {body}
              </div>
            );
          })}
        </div>
      </div>

      <a
        href={PROFILE.github}
        target="_blank"
        rel="noreferrer"
        className="group mt-12 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-accent transition-colors"
      >
        <span className="h-px w-10 bg-border-strong group-hover:bg-accent transition-colors" />
        <Github className="size-3.5" />
        More on GitHub · @{PROFILE.githubHandle}
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>

      {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
    </Section>
  );
}

function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-modal bg-background/90 backdrop-blur-sm flex items-start md:items-center justify-center p-0 md:p-8 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        className="relative w-full max-w-4xl md:max-h-[88vh] md:overflow-y-auto md:rounded-xl border-y md:border border-border-strong bg-surface shadow-deep"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="pressable sticky top-4 float-right mr-4 size-9 rounded-md border border-border bg-background/80 backdrop-blur flex items-center justify-center hover:border-accent/60 hover:text-accent z-raised"
          aria-label="Close case study"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 md:p-12 space-y-9">
          <header className="space-y-4 pb-6 border-b border-border">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-[0.2em] uppercase">
              <span className="text-muted-foreground tabular">
                {project.year}
              </span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-muted-foreground">{project.role}</span>
              {project.recognition && (
                <span className="px-2 py-0.5 border border-accent/35 bg-accent/[0.07] text-accent normal-case tracking-[0.06em]">
                  {project.recognition}
                </span>
              )}
            </div>
            <h3 className="font-display text-[clamp(1.9rem,5vw,3.25rem)] font-bold tracking-[-0.038em] leading-[1.02]">
              {project.title}
            </h3>
            <p className="text-[16px] leading-[1.7] text-foreground/70 max-w-[62ch]">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] px-2 py-1 rounded-sm border border-border text-foreground/70"
                >
                  {s}
                </span>
              ))}
            </div>
          </header>

          {project.slug === "pixa-agent" && (
            <div className="grid md:grid-cols-[9rem_1fr] gap-x-6 gap-y-3 items-start">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground pt-1">
                Staged edit
              </div>
              <FileDiff
                file="src/providers/complete.ts"
                rows={PIXA_DIFF}
                caption="Illustrative — every edit is staged as a reviewable diff before it touches disk."
              />
            </div>
          )}

          {project.slug === "drone-security-analyst" && <DroneArchitecture />}

          {project.embed && (
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground px-4 py-2.5 border-b border-border bg-background/60 flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Live demo
                </span>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4"
                >
                  open in new tab <ArrowUpRight className="size-3" />
                </a>
              </div>
              <iframe
                src={project.embed}
                title={`${project.title} live demo`}
                className="w-full h-[520px] bg-background"
                loading="lazy"
              />
            </div>
          )}

          {project.problem && (
            <Field label="The problem" value={project.problem} />
          )}
          {project.solution && (
            <Field label="What I built" value={project.solution} />
          )}
          {project.impact && (
            <div className="grid md:grid-cols-[9rem_1fr] gap-x-6 gap-y-3">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent pt-1.5">
                Outcome
              </div>
              <p className="font-display text-[clamp(1.1rem,2.2vw,1.5rem)] leading-[1.4] tracking-[-0.02em] text-foreground/90">
                {project.impact}
              </p>
            </div>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="pressable inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-accent/40 text-accent hover:bg-accent/10 font-mono text-[11px] tracking-[0.18em] uppercase"
            >
              <Github className="size-4" /> View source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid md:grid-cols-[9rem_1fr] gap-x-6 gap-y-2 items-start">
      <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground pt-1">
        {label}
      </div>
      <p className="text-[15.5px] leading-[1.75] text-foreground/80 max-w-[62ch]">
        {value}
      </p>
    </div>
  );
}
