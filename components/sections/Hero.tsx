"use client";

import { useEffect, useState } from "react";
import { Github, Mail, FileText, Trophy, Medal, Briefcase } from "lucide-react";

const PHRASES = [
  "Building agentic AI systems.",
  "LLM pipelines. RAG. Tool-use agents.",
  "Best Research Paper, ICCTVB-25.",
  "Shipping production AI.",
];

function useTypewriter(words: string[], typeMs = 55, holdMs = 1600, eraseMs = 30) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");

  useEffect(() => {
    const word = words[i % words.length];
    let t: ReturnType<typeof setTimeout> | undefined;

    if (phase === "type") {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        t = setTimeout(() => setPhase("erase"), holdMs);
      }
    } else if (phase === "erase") {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), eraseMs);
      } else {
        setI((n) => n + 1);
        setPhase("type");
        return;
      }
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [text, phase, i, words, typeMs, holdMs, eraseMs]);

  return text;
}

export default function Hero() {
  const text = useTypewriter(PHRASES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur font-mono text-[11px] tracking-wider text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,212,255,0.7)] animate-pulse" />
          AVAILABLE FOR AI/ML INTERNSHIPS · GRADUATING 2027
        </div>

        <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tight">
          TANMAY SHINDE
        </h1>

        <div className="font-mono text-lg md:text-2xl text-foreground/90 min-h-8">
          <span className="text-accent">&gt;</span> {text}
          <span className="inline-block w-2 h-5 ml-1 bg-accent align-middle animate-pulse" />
        </div>

        <p className="font-mono text-sm text-muted-foreground">
          B.Tech AI-ML · Pimpri Chinchwad University · Pune, India
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-background font-mono text-sm font-medium hover:shadow-[0_0_24px_rgba(0,212,255,0.5)] transition-shadow"
          >
            <FileText className="size-4" /> View Work
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

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 font-mono text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Trophy className="size-3.5 text-accent" /> Best Research Paper · ICCTVB-25
          </span>
          <span className="opacity-30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Medal className="size-3.5 text-accent" /> GFG × Vultr Hackathon Runner-Up
          </span>
          <span className="opacity-30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="size-3.5 text-accent" /> Python Dev Intern @ Virtunexa
          </span>
        </div>
      </div>
    </section>
  );
}
