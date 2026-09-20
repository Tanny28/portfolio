import Section from "@/components/ui/Section";
import { achievements } from "@/lib/data";

export default function Achievements() {
  return (
    <Section id="achievements" label="Recognition" meta="externally verified">
      <h3 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.035em] leading-[1.02] max-w-[14ch] reveal-target">
        Proof, not promises.
      </h3>

      {/* Results-table treatment — the native artifact of the field, and a
          deliberate break from the three-card feature row. */}
      <dl className="mt-12 border-t border-border">
        {achievements.map((a, i) => (
          <div
            key={a.label}
            className="reveal-target group grid md:grid-cols-[minmax(0,14rem)_1fr] gap-x-10 gap-y-2 py-7 border-b border-border"
            data-delay={String((i % 4) + 1)}
          >
            <dt className="font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-extrabold tracking-[-0.04em] leading-none text-accent tabular">
              {a.metric}
            </dt>
            <dd className="md:pt-1">
              <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-foreground/90">
                {a.label}
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground max-w-[54ch]">
                {a.detail}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
