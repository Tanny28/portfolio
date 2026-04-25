"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Plus, X } from "lucide-react";
import { projects, type Project } from "@/lib/data";

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
    <section
      id="projects"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        <div className="font-mono text-xs text-accent tracking-widest mb-3">
          // PROJECTS
        </div>
        <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Selected work.
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <button
              key={p.slug}
              onClick={() => setOpen(p)}
              className={`group text-left rounded-lg border bg-card/60 backdrop-blur p-6 transition-all hover:border-accent/60 hover:shadow-[0_0_32px_rgba(0,212,255,0.12)] ${
                p.highlight ? "border-accent/40" : "border-border"
              } ${p.highlight ? "md:col-span-1" : ""}`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest">
                  {p.highlight ? "★ FEATURED · " : ""}
                  {p.year} · {p.status.toUpperCase()}
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-border bg-background/60 text-foreground/70"
                  >
                    {s}
                  </span>
                ))}
                {p.stack.length > 6 && (
                  <span className="font-mono text-[10px] px-2 py-0.5 text-muted-foreground">
                    +{p.stack.length - 6}
                  </span>
                )}
              </div>
            </button>
          ))}

          <a
            href="https://github.com/Tanny28"
            target="_blank"
            rel="noreferrer"
            className="group rounded-lg border border-dashed border-border bg-card/30 p-6 flex flex-col items-center justify-center gap-3 text-center hover:border-accent/60 hover:bg-card/60 transition-all min-h-[200px]"
          >
            <div className="size-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent/60">
              <Plus className="size-5 text-muted-foreground group-hover:text-accent" />
            </div>
            <div className="font-mono text-sm text-foreground/80">More on GitHub</div>
            <div className="font-mono text-[11px] text-muted-foreground inline-flex items-center gap-1">
              <Github className="size-3" /> @Tanny28
            </div>
          </a>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-accent/30 bg-card shadow-[0_0_60px_rgba(0,212,255,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 size-8 rounded-md border border-border bg-background/80 flex items-center justify-center hover:border-accent/60"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="p-6 md:p-10 space-y-6">
              <div>
                <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                  {open.highlight ? "★ FEATURED · " : ""}
                  {open.year} · {open.status.toUpperCase()}
                </div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight">
                  {open.title}
                </h3>
                <p className="text-muted-foreground mt-1">{open.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {open.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-border bg-background/60 text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {open.embed && (
                <div className="rounded-md overflow-hidden border border-border">
                  <div className="font-mono text-[10px] text-muted-foreground px-3 py-2 border-b border-border bg-background/60 flex items-center justify-between">
                    <span>● LIVE DEMO</span>
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

              {open.problem && (
                <Field label="Problem" value={open.problem} />
              )}
              {open.solution && (
                <Field label="Solution" value={open.solution} />
              )}
              {open.impact && (
                <div>
                  <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                    IMPACT
                  </div>
                  <div className="font-mono text-sm text-foreground/90">
                    {open.impact}
                  </div>
                </div>
              )}

              {open.demo && !open.embed && (
                <a
                  href={open.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-accent/40 text-accent font-mono text-sm hover:bg-accent/10"
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
    <div>
      <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">
        {label.toUpperCase()}
      </div>
      <p className="text-sm text-foreground/85 leading-relaxed">{value}</p>
    </div>
  );
}
