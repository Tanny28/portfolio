import { Suspense } from "react";
import GitHubTicker from "@/components/about/GitHubTicker";
import { bio, education, PROFILE } from "@/lib/data";

const FACTS: Array<[string, string]> = [
  ["Role", "SDE Intern @ Pixaflip Technologies"],
  ["Degree", `B.Tech AI & ML · ${education.graduation}`],
  ["University", "Pimpri Chinchwad University, Pune"],
  ["CGPA", education.cgpa],
  ["Focus", "LLM apps · RAG · Agents · MLOps"],
  ["Location", PROFILE.location],
  ["Status", "● Open to AI/ML roles"],
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 lg:px-10 py-28 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        <div className="flex items-end justify-between gap-8 mb-12 pb-5 border-b border-border">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
            // 01 · about
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            builder-first · competition-tested
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              From problem to production.
            </h2>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              {bio.long.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                If you&apos;re building hard things with LLMs, agents, or
                applied AI —{" "}
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-accent hover:underline"
                >
                  let&apos;s talk
                </a>
                .
              </p>
            </div>

            {/* GitHub activity ticker */}
            <Suspense fallback={null}>
              <GitHubTicker />
            </Suspense>
          </div>

          <div className="relative rounded-lg border border-border bg-card/60 backdrop-blur p-6 md:p-8 font-mono text-sm">
            <div className="absolute -top-3 left-6 px-2 bg-background text-[10px] text-muted-foreground tracking-widest">
              ./profile.json
            </div>
            <ul className="divide-y divide-border/60">
              {FACTS.map(([label, value]) => (
                <li
                  key={label}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-muted-foreground text-xs uppercase tracking-wider shrink-0">
                    {label}
                  </span>
                  <span
                    className={
                      label === "Status"
                        ? "text-accent text-right"
                        : "text-foreground text-right"
                    }
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
