"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Plus, X, Network, AlignLeft } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import dynamic from "next/dynamic";

const DroneArchitecture = dynamic(
  () => import("@/components/projects/DroneArchitecture"),
  { ssr: false, loading: () => <div className="h-40 rounded-lg bg-muted/30 animate-pulse" /> }
);

function handleTilt(e: React.MouseEvent<HTMLButtonElement>) {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transition = "border-color 0.3s ease, box-shadow 0.3s ease";
  el.style.transform = `perspective(800px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  const glow = el.querySelector<HTMLElement>(".card-glow");
  if (glow) {
    glow.style.background = `radial-gradient(240px circle at ${(e.clientX - r.left).toFixed(0)}px ${(e.clientY - r.top).toFixed(0)}px, rgba(0,212,255,0.09), transparent 70%)`;
  }
}

function resetTilt(e: React.MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget;
  el.style.transition = "";
  el.style.transform = "";
}

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
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className={`group text-left rounded-lg border bg-card/60 backdrop-blur card-tilt hover:border-accent/60 hover:shadow-[0_0_32px_rgba(0,212,255,0.12)] ${
                p.highlight ? "border-accent/40" : "border-border"
              }`}
            >
              {/* Cursor glow layer */}
              <div className="card-glow z-0" aria-hidden />

              {/* Content */}
              <div className="relative z-[1] p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest">
                    {p.highlight ? "★ FEATURED · " : ""}
                    {p.year} · {p.status.toUpperCase()}
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                </div>
                <h3 className="font-sans text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] px-2 py-0.5 rounded border border-border bg-background/60 text-foreground/70 group-hover:border-accent/30 group-hover:text-accent/80 transition-colors"
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
              </div>
            </button>
          ))}

          <a
            href="https://github.com/Tanny28"
            target="_blank"
            rel="noreferrer"
            className="group rounded-lg border border-dashed border-border bg-card/30 p-6 flex flex-col items-center justify-center gap-3 text-center hover:border-accent/60 hover:bg-card/60 transition-all min-h-[200px]"
          >
            <div className="size-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent/60 transition-colors">
              <Plus className="size-5 text-muted-foreground group-hover:text-accent transition-colors" />
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

              {/* Drone architecture diagram */}
              {open.slug === "drone-security-analyst" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowDiagram(true)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs border transition-colors ${showDiagram ? "border-accent text-accent bg-accent/10" : "border-border text-muted-foreground"}`}
                    >
                      <Network className="size-3.5" /> View Architecture
                    </button>
                    <button
                      onClick={() => setShowDiagram(false)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs border transition-colors ${!showDiagram ? "border-accent text-accent bg-accent/10" : "border-border text-muted-foreground"}`}
                    >
                      <AlignLeft className="size-3.5" /> View Details
                    </button>
                  </div>
                  {showDiagram && <DroneArchitecture />}
                </div>
              )}

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

              {open.problem && <Field label="Problem" value={open.problem} />}
              {open.solution && <Field label="Solution" value={open.solution} />}
              {open.impact && (
                <div>
                  <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                    IMPACT
                  </div>
                  <div className="font-mono text-sm text-foreground/90">{open.impact}</div>
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
