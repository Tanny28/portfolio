import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative px-6 lg:px-10 py-28 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        <div className="flex items-end justify-between gap-8 mb-12 pb-5 border-b border-border">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
            // 03 · stack
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {skillGroups.reduce((n, g) => n + g.skills.length, 0)} tools ·{" "}
            {skillGroups.length} domains
          </div>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
          What I work with.
        </h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {skillGroups.map((group) => (
            <div key={group.category} className="reveal-target">
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-foreground">
                  {group.category}
                </h3>
                <span className="flex-1 h-px bg-border" aria-hidden />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {group.skills.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs px-2.5 py-1 rounded border border-border bg-card/60 text-foreground/85 hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 font-mono text-[11px] text-muted-foreground">
          practices: end-to-end delivery · peer review · model monitoring ·
          clean modular code
        </p>
      </div>
    </section>
  );
}
