import Section from "@/components/ui/Section";
import { experience, education } from "@/lib/data";

export default function Experience() {
  return (
    <Section id="experience" label="Experience" meta="2023 — now">
      <h3 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.035em] leading-[1.02] max-w-[14ch] reveal-target">
        Where I&apos;ve worked.
      </h3>

      <ol className="mt-12 relative">
        {/* Continuous spine */}
        <span
          aria-hidden
          className="absolute left-[3px] top-2 bottom-2 w-px bg-border-strong"
        />

        {experience.map((job) => (
          <li
            key={job.org}
            className="reveal-target relative pl-10 pb-12 last:pb-0"
          >
            <span
              className={`absolute left-0 top-1.5 size-[7px] rounded-full ring-4 ring-background ${
                job.current ? "bg-accent" : "bg-border-strong"
              }`}
              aria-hidden
            />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              <span className="tabular">{job.period}</span>
              {job.current && (
                <span className="px-2 py-0.5 border border-accent/35 bg-accent/[0.07] text-accent">
                  current
                </span>
              )}
            </div>

            <h4 className="mt-3 font-display text-[1.35rem] md:text-[1.6rem] font-bold tracking-[-0.025em] leading-tight">
              {job.title}
            </h4>
            <p className="mt-1 text-[14.5px] text-foreground/75">
              {job.org} · {job.location}
            </p>

            <ul className="mt-4 space-y-2.5 max-w-[64ch]">
              {job.points.map((pt, i) => (
                <li
                  key={i}
                  className="relative pl-5 text-[14.5px] leading-[1.7] text-muted-foreground before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2.5 before:bg-accent/50"
                >
                  {pt}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-1 rounded-sm border border-border text-foreground/65"
                >
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}

        {/* Education */}
        <li className="reveal-target relative pl-10">
          <span
            className="absolute left-0 top-1.5 size-[7px] rounded-full ring-4 ring-background bg-border-strong"
            aria-hidden
          />
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground tabular">
            Aug 2023 — {education.graduation.replace("Expected ", "")}
          </div>
          <h4 className="mt-3 font-display text-[1.35rem] md:text-[1.6rem] font-bold tracking-[-0.025em] leading-tight">
            {education.degree}
          </h4>
          <p className="mt-1 text-[14.5px] text-foreground/75">
            {education.school} · CGPA <span className="tabular">{education.cgpa}</span>
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-muted-foreground max-w-[64ch]">
            Coursework: {education.coursework}
          </p>
        </li>
      </ol>
    </Section>
  );
}
