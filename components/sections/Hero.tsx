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

function useEvalRun(lineCount: number, stepMs = 380) {
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

  // next dev serves 404 HTML for missing assets, which never fires `onError`.
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

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1100px) rotateY(${dx * 2.4}deg) rotateX(${-dy * 2.4}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
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
      className="relative min-h-dvh px-6 lg:px-10 pt-32 lg:pt-40 pb-24 lg:pb-32"
    >
      <div className="mx-auto max-w-[78rem] grid lg:grid-cols-12 gap-y-14 lg:gap-x-10 items-start">
        {/* ── Text column ──────────────────────────────────────────────── */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            {PROFILE.title} · Pune, India
          </div>

          {/* Name — wide Archivo, tight tracking, heavy */}
          <h1 className="mt-7 font-display font-extrabold leading-[0.88] tracking-[-0.045em] text-[clamp(3.25rem,11vw,8.5rem)]">
            <span className="block">Tanmay</span>
            <span className="block text-foreground/35">Shinde</span>
          </h1>

          <p className="mt-8 font-display text-[clamp(1.35rem,3vw,2.1rem)] leading-[1.2] tracking-[-0.02em] text-foreground/90 max-w-[22ch]">
            I build AI systems that{" "}
            <span className="text-accent">actually ship</span>.
          </p>

          {/* Eval log — extends past the column edge into the photo gutter */}
          <div className="mt-10 lg:mr-[-5rem] xl:mr-[-8rem] relative z-raised rounded-lg border border-border bg-surface/85 backdrop-blur-sm shadow-lift font-mono text-[12.5px] leading-relaxed overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              <span>eval · track_record</span>
              <span className="tabular">2024 — 2026</span>
            </div>
            <div className="px-4 py-3.5 space-y-2">
              <div className="text-muted-foreground">
                $ run eval --candidate tanmay_shinde
              </div>
              {EVAL_LINES.map((l, i) => (
                <div
                  key={l.name}
                  className={`flex flex-wrap gap-x-2 items-baseline transition-opacity duration-500 ${
                    step > i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-accent shrink-0">✓</span>
                  <span className="text-foreground/85 shrink-0">{l.name}</span>
                  <span
                    className="text-border-strong overflow-hidden whitespace-nowrap flex-1 hidden sm:block"
                    aria-hidden
                  >
                    ································································
                  </span>
                  <span className="text-muted-foreground">{l.result}</span>
                </div>
              ))}
              <div
                className={`pt-1.5 transition-opacity duration-500 ${
                  step > EVAL_LINES.length ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-foreground/85">status:</span>{" "}
                <span className="text-accent">PASS</span>
                <span className="text-muted-foreground">
                  {" "}
                  · open to AI/ML roles · grad {PROFILE.graduation}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-2.5">
            <a
              href="#projects"
              className="pressable group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-background font-medium text-sm hover:bg-[#ddaa63]"
            >
              View projects
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="pressable inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-foreground hover:border-accent/60 hover:text-accent font-medium text-sm"
            >
              <FileDown className="size-4" />
              Resume
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="pressable inline-flex items-center gap-2 px-5 py-3 rounded-md text-muted-foreground hover:text-accent font-medium text-sm"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* ── Photo column — offset down, overlapped by the eval log ────── */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end lg:pt-16">
          <div className="relative w-[min(18rem,72vw)] lg:w-full lg:max-w-[19rem]">
            <div className="absolute -top-7 left-0 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Available
            </div>

            <div
              ref={photoRef}
              className="relative aspect-[4/5] overflow-hidden bg-surface border border-border-strong transition-transform duration-500 ease-spring will-change-transform"
            >
              {!photoFailed ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/tanmay.jpg"
                  alt="Portrait of Tanmay Shinde, AI and GenAI engineer"
                  onError={() => setPhotoFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.35] contrast-[1.05]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="font-display font-extrabold text-6xl text-foreground/30">
                      TS
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      add /public/tanmay.jpg
                    </div>
                  </div>
                </div>
              )}

              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 52%, rgba(12,12,13,0.82) 100%)",
                }}
              />

              {/* VLM-style detection label */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between font-mono text-[9.5px] tracking-[0.12em] text-accent">
                <span className="px-1.5 py-0.5 bg-background/75 backdrop-blur-sm border border-accent/35">
                  person: tanmay_shinde
                </span>
                <span className="px-1.5 py-0.5 bg-background/75 backdrop-blur-sm border border-accent/35 tabular">
                  0.99
                </span>
              </div>
            </div>

            <span className="bbox-corner bbox-corner-tl" aria-hidden />
            <span className="bbox-corner bbox-corner-tr" aria-hidden />
            <span className="bbox-corner bbox-corner-bl" aria-hidden />
            <span className="bbox-corner bbox-corner-br" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
