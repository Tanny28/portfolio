"use client";

import { useState } from "react";
import { skills, type SkillCategory } from "@/lib/data";

const FILTERS: ("All" | SkillCategory)[] = [
  "All",
  "Gen AI",
  "NLP & ML",
  "Deep Learning",
  "Backend",
  "Data",
  "Cloud",
];

export default function Skills() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section
      id="skills"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        <div className="font-mono text-xs text-accent tracking-widest mb-3">
          // SKILLS
        </div>
        <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight mb-10">
          The stack.
        </h2>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-colors ${
                filter === f
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {visible.map((s) => (
            <span
              key={s.name}
              className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-md border bg-card/60 font-mono text-xs ${
                s.level === "core"
                  ? "border-accent/40 text-foreground"
                  : "border-border text-foreground/80"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  s.level === "core" ? "bg-accent" : "bg-muted-foreground/60"
                }`}
              />
              {s.name}
              <span className="text-[9px] text-muted-foreground uppercase">
                {s.level}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-8 font-mono text-[11px] text-muted-foreground flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" /> core
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-muted-foreground/60" /> working
          </span>
        </div>
      </div>
    </section>
  );
}
