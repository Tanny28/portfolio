import { achievements } from "@/lib/data";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative px-6 lg:px-10 py-28 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        <div className="flex items-end justify-between gap-8 mb-12 pb-5 border-b border-border">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
            // 05 · recognition
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            externally verified
          </div>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Proof, not promises.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div
              key={a.label}
              className="reveal-target p-6 rounded-lg border border-border bg-card/50 hover:border-accent/40 transition-colors"
            >
              <div className="font-display font-bold text-3xl text-accent tracking-tight">
                {a.metric}
              </div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground mt-2">
                {a.label}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                {a.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
