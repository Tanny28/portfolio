import { experience, education } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 lg:px-10 py-28 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full">
        <div className="flex items-end justify-between gap-8 mb-12 pb-5 border-b border-border">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
            // 04 · experience
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            2 internships · 1 degree
          </div>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Where I&apos;ve worked.
        </h2>

        <ol className="relative border-l border-border ml-1 space-y-12">
          {experience.map((job) => (
            <li key={job.org} className="relative pl-8 reveal-target">
              <span
                className={`absolute -left-[5px] top-2 size-2.5 rounded-full ${
                  job.current ? "bg-accent" : "bg-muted-foreground/50"
                }`}
              />
              <div className="font-mono text-[11px] text-muted-foreground tracking-widest mb-2 flex flex-wrap items-center gap-2">
                {job.period}
                {job.current && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent text-[9px] tracking-[0.2em] uppercase">
                    current
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl font-semibold">
                {job.title}
              </h3>
              <div className="text-sm text-foreground/80 mt-0.5">
                {job.org} · {job.location}
              </div>
              <ul className="mt-3 space-y-2">
                {job.points.map((pt, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-accent/60"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {job.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-border bg-background/60 text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}

          {/* Education */}
          <li className="relative pl-8 reveal-target">
            <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-muted-foreground/50" />
            <div className="font-mono text-[11px] text-muted-foreground tracking-widest mb-2">
              Aug 2023 — {education.graduation.replace("Expected ", "")} ·
              EDUCATION
            </div>
            <h3 className="font-display text-xl font-semibold">
              {education.degree}
            </h3>
            <div className="text-sm text-foreground/80 mt-0.5">
              {education.school} · CGPA {education.cgpa}
            </div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Coursework: {education.coursework}
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
