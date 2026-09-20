import Section from "@/components/ui/Section";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <Section id="skills" label="Stack" meta={`${total} tools`}>
      <h3 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.035em] leading-[1.02] max-w-[14ch] reveal-target">
        What I work with.
      </h3>

      <dl className="mt-12 border-t border-border">
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            className="reveal-side grid md:grid-cols-[11rem_1fr] gap-x-8 gap-y-3 py-6 border-b border-border"
            data-delay={String((i % 4) + 1)}
          >
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground pt-1.5">
              {group.category}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[11.5px] px-2.5 py-1 rounded-sm border border-border text-foreground/80 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 font-mono text-[11px] leading-relaxed text-muted-foreground max-w-[58ch]">
        Practices: end-to-end delivery · peer review · model monitoring · clean
        modular code
      </p>
    </Section>
  );
}
