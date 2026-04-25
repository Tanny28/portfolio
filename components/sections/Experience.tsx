import {
  GraduationCap,
  Briefcase,
  Trophy,
  Medal,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { timeline, type TimelineKind } from "@/lib/data";

const ICONS: Record<TimelineKind, LucideIcon> = {
  Education: GraduationCap,
  Internship: Briefcase,
  Award: Trophy,
  Hackathon: Medal,
  Certifications: ScrollText,
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full">
        <div className="font-mono text-xs text-accent tracking-widest mb-3">
          // EXPERIENCE
        </div>
        <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Timeline.
        </h2>

        <ol className="relative border-l border-border ml-3 space-y-10">
          {timeline.map((entry, idx) => {
            const Icon = ICONS[entry.type];
            return (
              <li key={idx} className="relative pl-8">
                <span className="absolute -left-[13px] top-1 flex items-center justify-center size-6 rounded-full border border-accent/40 bg-card">
                  <Icon className="size-3 text-accent" />
                </span>
                <div className="font-mono text-[11px] text-muted-foreground tracking-widest mb-1">
                  {entry.period} · {entry.type.toUpperCase()}
                </div>
                <h3 className="font-sans text-lg font-semibold">
                  {entry.title}
                </h3>
                {entry.org && (
                  <div className="text-sm text-foreground/80 mt-0.5">
                    {entry.org}
                  </div>
                )}
                {entry.description && (
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {entry.description}
                  </p>
                )}
                {entry.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {entry.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded border border-border bg-background/60 text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
