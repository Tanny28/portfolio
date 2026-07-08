"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileDown, Github } from "lucide-react";
import { PROFILE } from "@/lib/data";

// The hero's signature: a benchmark run over Tanmay's track record.
// Every line is a real, verifiable result.
const EVAL_LINES = [
  { name: "smart_lecture_analyzer", result: "shipped → internship offer" },
  { name: "tradexa", result: "top 25 / 600+ · national hackathon" },
  { name: "drone_security_agent", result: "5/5 challenge benchmark" },
  { name: "research_forecasting", result: "best paper · ICCTVB-25" },
];

function useEvalRun(lineCount: number, stepMs = 420) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(lineCount + 1);
      return;
    }
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= lineCount + 1) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, stepMs);
    return () => clearInterval(id);
  }, [lineCount, stepMs]);
  return step;
}

export default function Hero() {
  const step = useEvalRun(EVAL_LINES.length);
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  // Probe the image after mount — next dev returns 404 HTML which
  // `onError` won't fire for.
  useEffect(() => {
    let cancelled = false;
    fetch("/tanmay.jpg", { method: "HEAD" })
      .then((res) => {
        const ct = res.headers.get("content-type") || "";
        if (cancelled) return;
        if (!res.ok || !ct.startsWith("image/")) setPhotoFailed(true);
      })
      .catch(() => {
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1000px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg)`;
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

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 lg:px-10 pt-32 lg:pt-36 pb-20"
    >
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ── Text column ──────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            {PROFILE.title} · Pune, India · Class of &apos;27
          </div>

          {/* Name */}
          <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-6xl sm:text-7xl lg:text-8xl">
            <span className="block text-foreground">Tanmay</span>
            <span className="block text-foreground/45">Shinde</span>
          </h1>

          {/* Tagline */}
          <p className="font-display text-2xl md:text-3xl text-foreground/90 tracking-tight max-w-xl">
            I build AI systems that{" "}
            <span className="text-accent">actually ship</span>.
          </p>

          {/* Eval log — the signature */}
          <div className="max-w-xl rounded-lg border border-border bg-card/70 backdrop-blur font-mono text-[13px] leading-relaxed overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              <span>eval · track_record</span>
              <span>2024 — 2026</span>
            </div>
            <div className="px-4 py-3 space-y-1.5">
              <div className="text-muted-foreground">
                $ run eval --candidate tanmay_shinde
              </div>
              {EVAL_LINES.map((l, i) => (
                <div
                  key={l.name}
                  className={`flex gap-2 items-baseline transition-opacity duration-300 ${
                    step > i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-accent shrink-0">✓</span>
                  <span className="text-foreground/85 shrink-0">{l.name}</span>
                  <span
                    className="text-border overflow-hidden whitespace-nowrap flex-1 hidden sm:block"
                    aria-hidden
                  >
                    ····································
                  </span>
                  <span className="text-muted-foreground text-right">
                    {l.result}
                  </span>
                </div>
              ))}
              <div
                className={`pt-1 transition-opacity duration-300 ${
                  step > EVAL_LINES.length ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-foreground/85">status:</span>{" "}
                <span className="text-accent">PASS · open to AI/ML roles</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-background font-medium text-sm hover:shadow-[0_0_36px_rgba(69,224,200,0.35)] transition-shadow"
            >
              View projects
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-foreground hover:border-accent/60 hover:text-accent font-medium text-sm transition-colors"
            >
              <FileDown className="size-4" />
              Resume
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-foreground hover:border-accent/60 hover:text-accent font-medium text-sm transition-colors"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* ── Photo column — detection-box frame ───────────────────────── */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-[min(20rem,75vw)] lg:w-full lg:max-w-sm">
            <div
              ref={photoRef}
              className="relative aspect-[4/5] overflow-hidden border border-accent/25 bg-card transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: "perspective(1000px)" }}
            >
              {!photoFailed ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/tanmay.jpg"
                  alt="Tanmay Shinde — AI/GenAI Engineer"
                  onError={() => setPhotoFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="font-display font-bold text-6xl text-foreground/40">
                      TS
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      add /public/tanmay.jpg
                    </div>
                  </div>
                </div>
              )}
              {/* Bottom vignette */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(5,9,13,0.75) 100%)",
                }}
              />

              {/* Detection label — like a VLM output */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-accent">
                <span className="px-1.5 py-0.5 bg-background/70 backdrop-blur-sm border border-accent/30">
                  person: tanmay_shinde
                </span>
                <span className="px-1.5 py-0.5 bg-background/70 backdrop-blur-sm border border-accent/30">
                  conf 0.99
                </span>
              </div>
            </div>

            {/* Corner brackets */}
            <span className="bbox-corner bbox-corner-tl" aria-hidden />
            <span className="bbox-corner bbox-corner-tr" aria-hidden />
            <span className="bbox-corner bbox-corner-bl" aria-hidden />
            <span className="bbox-corner bbox-corner-br" aria-hidden />

            {/* Availability tag above frame */}
            <div className="absolute -top-8 left-0 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Available · {PROFILE.graduation}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
