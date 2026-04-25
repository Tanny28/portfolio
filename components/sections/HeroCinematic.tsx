"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Medal, Briefcase, FileText, Github, Mail } from "lucide-react";
import NeuralNet from "@/components/effects/NeuralNet";

const TERMINAL_LINES = [
  "> initializing portfolio.exe",
  "> loading neural_net.weights ...... [OK]",
  "> loading projects.db ............. [OK]",
  "> loading awards.json ............. [OK]",
  "> status: READY",
];
const NAME = "TANMAY SHINDE";

// ── Static hero (mobile + reduced-motion fallback) ────────────────────────────
function HeroStatic() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur font-mono text-[11px] tracking-wider text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          AVAILABLE FOR AI/ML INTERNSHIPS · GRADUATING 2027
        </div>
        <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tight">
          {NAME}
        </h1>
        <p className="font-mono text-base text-accent">
          AI Engineer · Building production Gen AI
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Trophy className="size-3.5 text-accent" /> Best Research Paper · ICCTVB-25
          </span>
          <span className="opacity-30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Medal className="size-3.5 text-accent" /> GFG × Vultr Runner-Up
          </span>
          <span className="opacity-30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="size-3.5 text-accent" /> Python Dev Intern @ Virtunexa
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-background font-mono text-sm font-medium"
          >
            <FileText className="size-4" /> View Projects
          </a>
          <a
            href="https://github.com/Tanny28"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card font-mono text-sm"
          >
            <Github className="size-4" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Cinematic hero (desktop only) ────────────────────────────────────────────
export default function HeroCinematic() {
  const [ready, setReady] = useState(false);
  const [useStatic, setUseStatic] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const frame1Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);
  const frame3Ref = useRef<HTMLDivElement>(null);
  const frame4Ref = useRef<HTMLDivElement>(null);

  const termRefs = useRef<(HTMLDivElement | null)[]>([]);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const availRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;

    if (reduced || mobile) {
      setUseStatic(true);
      setReady(true);
      return;
    }

    // Dynamic import so GSAP only loads on desktop
    Promise.all([
      import("gsap").then((m) => m.default),
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      gsap.registerPlugin(ScrollTrigger);

      // Initial hidden states
      const set = gsap.set.bind(gsap);
      set(frame1Ref.current, { opacity: 1 });
      set(frame2Ref.current, { opacity: 0 });
      set(frame3Ref.current, { opacity: 0 });
      set(frame4Ref.current, { opacity: 0 });
      set(termRefs.current, { opacity: 0, y: 6 });
      set(charRefs.current, { opacity: 0, y: 24, filter: "blur(4px)" });
      set(taglineRef.current, { opacity: 0, y: 10 });
      set(
        [badge1Ref.current, badge2Ref.current, badge3Ref.current],
        { opacity: 0, y: 12 }
      );
      set(ctaRef.current, { opacity: 0, y: 8 });
      set(availRef.current, { opacity: 0, y: -8 });
      set(scrollIndRef.current, { opacity: 0 });

      setReady(true);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            pin: stickyRef.current,
            anticipatePin: 1,
          },
        });

        // ── Frame 1: terminal (0–1.2) ────────────────────────────────────────
        tl.to(
          termRefs.current,
          { opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: "power2.out" },
          0
        );

        // ── Frame 1→2: crossfade (1.0–1.4) ──────────────────────────────────
        tl.to(frame1Ref.current, { opacity: 0, duration: 0.3, ease: "power1.in" }, 1.0);
        tl.to(frame2Ref.current, { opacity: 1, duration: 0.4, ease: "power1.out" }, 1.1);

        // ── Frame 3: name (1.6–2.5) ──────────────────────────────────────────
        tl.to(frame3Ref.current, { opacity: 1, duration: 0.2 }, 1.55);
        tl.to(
          charRefs.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            duration: 0.35,
            ease: "power3.out",
          },
          1.65
        );
        tl.to(
          taglineRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          2.2
        );

        // ── Frame 4: full hero (2.7–3.8) ────────────────────────────────────
        tl.to(frame4Ref.current, { opacity: 1, duration: 0.3 }, 2.7);
        tl.to(availRef.current, { opacity: 1, y: 0, duration: 0.35 }, 2.8);
        tl.to(badge1Ref.current, { opacity: 1, y: 0, duration: 0.3 }, 2.95);
        tl.to(badge2Ref.current, { opacity: 1, y: 0, duration: 0.3 }, 3.1);
        tl.to(badge3Ref.current, { opacity: 1, y: 0, duration: 0.3 }, 3.25);
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.35 }, 3.45);
        tl.to(scrollIndRef.current, { opacity: 1, duration: 0.3 }, 3.7);
      }, wrapperRef);

      return () => ctx.revert();
    });
  }, []);

  if (!ready) return null;
  if (useStatic) return <HeroStatic />;

  return (
    <div
      ref={wrapperRef}
      id="hero"
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Skip intro */}
      <button
        ref={skipRef}
        onClick={() => {
          const about = document.getElementById("about");
          about?.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed top-4 right-6 z-[60] font-mono text-[10px] text-muted-foreground hover:text-accent border border-border px-2.5 py-1 rounded-md bg-background/80 backdrop-blur"
      >
        Skip intro ↓
      </button>

      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden bg-background"
      >
        {/* ── Frame 1: Terminal ────────────────────────────────────────────── */}
        <div
          ref={frame1Ref}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full max-w-xl mx-6 rounded-lg border border-border bg-card/80 overflow-hidden shadow-xl">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-yellow-500/70" />
              <span className="size-2.5 rounded-full bg-green-500/70" />
              <span className="font-mono text-[10px] text-muted-foreground ml-2">
                portfolio.exe
              </span>
            </div>
            <div className="p-6 space-y-2">
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    termRefs.current[i] = el;
                  }}
                  className={`font-mono text-sm ${
                    line.includes("[OK]")
                      ? "text-accent"
                      : line.includes("READY")
                      ? "text-green-400"
                      : "text-foreground/80"
                  }`}
                >
                  {line}
                  {i === TERMINAL_LINES.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-accent ml-1 align-middle animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Frame 2: Neural net ───────────────────────────────────────────── */}
        <div ref={frame2Ref} className="absolute inset-0">
          <NeuralNet className="opacity-60" />
        </div>

        {/* ── Frame 3: Name (sits on top of neural net) ─────────────────────── */}
        <div
          ref={frame3Ref}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tight text-center leading-none">
            {NAME.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <span
                  key={i}
                  ref={(el) => {
                    charRefs.current[i] = el;
                  }}
                  className="inline-block"
                  style={{ display: "inline-block" }}
                >
                  {ch}
                </span>
              )
            )}
          </h1>
          <p
            ref={taglineRef}
            className="font-mono text-base md:text-xl text-accent mt-6"
          >
            AI Engineer · Building production Gen AI
          </p>
        </div>

        {/* ── Frame 4: Full hero ────────────────────────────────────────────── */}
        <div
          ref={frame4Ref}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          {/* NeuralNet persists as bg */}
          <div className="absolute inset-0 -z-10">
            <NeuralNet className="opacity-30" />
          </div>

          <div className="flex flex-col items-center text-center gap-6 max-w-4xl w-full">
            {/* Badge top */}
            <div
              ref={availRef}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur font-mono text-[11px] tracking-wider text-muted-foreground pointer-events-auto"
            >
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              AVAILABLE FOR AI/ML INTERNSHIPS · GRADUATING 2027
            </div>

            {/* Name (visible but not re-animated) */}
            <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tight">
              {NAME}
            </h1>
            <p className="font-mono text-base md:text-xl text-accent">
              AI Engineer · Building production Gen AI
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground">
              <div ref={badge1Ref} className="inline-flex items-center gap-1.5">
                <Trophy className="size-3.5 text-accent" /> Best Research Paper · ICCTVB-25
              </div>
              <span className="opacity-30">·</span>
              <div ref={badge2Ref} className="inline-flex items-center gap-1.5">
                <Medal className="size-3.5 text-accent" /> GFG × Vultr Runner-Up
              </div>
              <span className="opacity-30">·</span>
              <div ref={badge3Ref} className="inline-flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-accent" /> Python Dev Intern @ Virtunexa
              </div>
            </div>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-background font-mono text-sm font-medium hover:shadow-[0_0_24px_rgba(0,212,255,0.5)] transition-shadow"
              >
                <FileText className="size-4" /> View Projects
              </a>
              <a
                href="https://github.com/Tanny28"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card hover:border-accent/60 font-mono text-sm transition-colors"
              >
                <Github className="size-4" /> GitHub
              </a>
              <a
                href="mailto:shindetanmay282@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card hover:border-accent/60 font-mono text-sm transition-colors"
              >
                <Mail className="size-4" /> Contact
              </a>
            </div>

            {/* Scroll indicator */}
            <div
              ref={scrollIndRef}
              className="font-mono text-[11px] text-muted-foreground mt-2 flex flex-col items-center gap-1.5"
            >
              <span>CONTINUE</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
