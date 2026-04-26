"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileDown, RotateCcw } from "lucide-react";

const RESUME_URL =
  "https://drive.google.com/file/d/1KfxjjiMhkdyFT5klRtLHIW6HysfmD5mc/view?usp=sharing";

const MANIFESTO = [
  "I don't wait to be taught.",
  "I build until I understand.",
  "AI is the game — I'm all in.",
];

const KEYWORDS = ["LLMs", "Agents", "Automation"];

const STATS = [
  { label: "Education", value: "B.Tech AI-ML", sub: "PCU Pune · 8.24 CGPA" },
  { label: "Shipped", value: "4 projects", sub: "production gen ai" },
  { label: "Published", value: "1 paper", sub: "best paper · ICCTVB-25" },
  { label: "Status", value: "Open to roles", sub: "internships · 2026" },
];

function useStreamedText(lines: string[], speedMs = 22) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const fullText = lines.join("\n");

  useEffect(() => {
    setProgress(0);
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= fullText.length) {
        clearInterval(id);
        setDone(true);
        setProgress(fullText.length);
        return;
      }
      setProgress(i);
    }, speedMs);
    return () => clearInterval(id);
  }, [fullText, speedMs]);

  return { text: fullText.slice(0, progress), done };
}

export default function HeroEditorial() {
  const [replayKey, setReplayKey] = useState(0);
  return <HeroInner key={replayKey} onReplay={() => setReplayKey((k) => k + 1)} />;
}

function HeroInner({ onReplay }: { onReplay: () => void }) {
  const { text, done } = useStreamedText(MANIFESTO);
  const photoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  // Probe the image after mount — fetch the URL and verify it's actually
  // an image (next dev returns 404 HTML which `onError` won't fire for).
  useEffect(() => {
    let cancelled = false;
    fetch("/tanmay.jpg", { method: "HEAD" }).then((res) => {
      const ct = res.headers.get("content-type") || "";
      if (cancelled) return;
      if (!res.ok || !ct.startsWith("image/")) {
        setPhotoFailed(true);
      }
    }).catch(() => {
      if (!cancelled) setPhotoFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Subtle parallax tilt on photo (desktop only)
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.transform = `perspective(1000px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const lines = text.split("\n");

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 lg:px-10 pt-32 lg:pt-36 pb-20 overflow-hidden"
    >
      {/* Aurora glow accent — top right */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[55rem] h-[55rem] -translate-y-1/3 translate-x-1/4 rounded-full blur-[120px] opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,169,67,0.18) 0%, rgba(232,169,67,0.05) 35%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ── Text column ──────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-8 lg:space-y-10 order-2 lg:order-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
            <span className="size-1 rounded-full bg-accent animate-pulse" />
            AI Engineer · Pune, India · Class of &apos;27
          </div>

          {/* Name — oversized italic serif */}
          <h1 className="font-serif italic leading-[0.88] tracking-[-0.02em] text-[18vw] sm:text-[14vw] lg:text-[10.5rem] xl:text-[12rem]">
            <span className="block text-foreground">Tanmay</span>
            <span className="block text-foreground/55 -mt-2 lg:-mt-4">Shinde</span>
          </h1>

          {/* Streaming manifesto */}
          <div className="relative">
            <div
              className="font-serif text-2xl md:text-3xl lg:text-[2rem] leading-[1.35] text-foreground/85 max-w-2xl whitespace-pre-line"
              style={{ minHeight: "calc(1.35em * 3)" }}
            >
              <span className="text-accent/70 align-top mr-1 select-none">“</span>
              {lines.map((line, i) => (
                <span key={i}>
                  <span className="italic">{line}</span>
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
              {!done && (
                <span
                  className="inline-block w-[3px] h-[0.95em] bg-accent ml-1 align-middle animate-pulse"
                  aria-hidden
                />
              )}
              {done && (
                <span className="text-accent/70 align-top ml-1 select-none">”</span>
              )}
            </div>

            {/* Replay generation pill */}
            {done && (
              <button
                onClick={onReplay}
                className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-foreground/10 hover:border-accent/40 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
              >
                <RotateCcw className="size-3" />
                Regenerate
              </button>
            )}
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.25em] uppercase text-foreground/70">
            {KEYWORDS.map((kw, i) => (
              <span key={kw} className="inline-flex items-center gap-4">
                <span>{kw}</span>
                {i < KEYWORDS.length - 1 && (
                  <span className="size-1 rounded-full bg-accent/60" aria-hidden />
                )}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 pl-5 pr-4 py-3 rounded-full bg-accent text-background font-medium text-sm hover:shadow-[0_0_40px_rgba(232,169,67,0.45)] transition-shadow"
            >
              View my work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-foreground/15 text-foreground hover:border-accent/50 hover:text-accent font-medium text-sm transition-colors"
            >
              <FileDown className="size-4" />
              Resume
            </a>
          </div>
        </div>

        {/* ── Photo column ─────────────────────────────────────────────── */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-[min(22rem,80vw)] lg:w-full lg:max-w-md">
            {/* Outer amber halo */}
            <div
              aria-hidden
              className="absolute -inset-12 rounded-full blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,169,67,0.32) 0%, rgba(232,169,67,0.08) 45%, transparent 75%)",
              }}
            />

            {/* Tilting photo frame */}
            <div
              ref={photoRef}
              className="relative aspect-[4/5] rounded-[2.25rem] overflow-hidden border border-foreground/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: "perspective(1000px)" }}
            >
              {!photoFailed ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  ref={imgRef}
                  src="/tanmay.jpg"
                  alt="Tanmay Shinde — AI Engineer"
                  onError={() => setPhotoFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-background">
                  <div className="text-center space-y-3">
                    <div className="font-serif italic text-7xl text-foreground/50">ts</div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      add /public/tanmay.jpg
                    </div>
                  </div>
                </div>
              )}
              {/* Top vignette + warm wash */}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-soft-light pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(232,169,67,0.0) 50%, rgba(10,13,31,0.6) 100%)",
                }}
              />
              {/* Subtle scanline / film grain via inset shadow */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.5)" }}
              />

              {/* Corner caption — on the photo */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-md border border-foreground/10 font-mono text-[9px] tracking-[0.28em] uppercase text-foreground/85">
                <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </div>

              {/* Bottom caption — file label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] tracking-[0.22em] uppercase text-foreground/70">
                <span>tanmay.shinde.jpg</span>
                <span>2027 · v1</span>
              </div>
            </div>

            {/* Floating signature card — bottom right */}
            <div className="absolute -bottom-5 -right-3 lg:-right-5 px-3.5 py-2 rounded-xl bg-card/90 border border-foreground/10 backdrop-blur-md shadow-xl">
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                Latest
              </div>
              <div className="font-serif italic text-sm text-foreground">
                Drone Security Agent
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Model-card stats row ─────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto mt-24 lg:mt-32 pt-8 border-t border-foreground/8">
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            // model card
          </div>
          <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
            v2027.4
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
          {STATS.map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                {s.label}
              </div>
              <div className="font-serif italic text-2xl lg:text-3xl text-foreground leading-tight">
                {s.value}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground/80">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
