import { Suspense } from "react";
import GitHubTicker from "@/components/about/GitHubTicker";
import Section from "@/components/ui/Section";
import { bio, education, PROFILE } from "@/lib/data";

const FACTS: Array<[string, string]> = [
  ["Role", "SDE Intern, Pixaflip Technologies"],
  ["Degree", "B.Tech AI & ML"],
  ["University", "Pimpri Chinchwad University, Pune"],
  ["CGPA", education.cgpa],
  ["Graduating", education.graduation.replace("Expected ", "")],
  ["Focus", "LLM apps · RAG · Agents · MLOps"],
  ["Based in", "Pune, India"],
];

export default function About() {
  return (
    <Section id="about" label="About" meta="builder-first">
      <div className="max-w-[62ch] reveal-target">
        <h3 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.035em] leading-[1.02]">
          From problem to production.
        </h3>

        <div className="mt-7 space-y-5 text-[15.5px] leading-[1.75] text-foreground/75">
          {bio.long.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            If you&apos;re building hard things with LLMs, agents, or applied
            AI —{" "}
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
            >
              let&apos;s talk
            </a>
            .
          </p>
        </div>
      </div>

      {/* Facts table — reads as a spec sheet, not a card grid */}
      <div className="mt-14 grid md:grid-cols-[1fr_auto] gap-10 items-start">
        <dl className="reveal-side border-t border-border">
          {FACTS.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9.5rem_1fr] gap-4 py-3 border-b border-border"
            >
              <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground pt-0.5">
                {label}
              </dt>
              <dd className="font-mono text-[13px] text-foreground/90">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <Suspense fallback={null}>
          <GitHubTicker />
        </Suspense>
      </div>
    </Section>
  );
}
