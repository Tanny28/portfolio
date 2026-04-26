import { Trophy } from "lucide-react";

export default function Research() {
  return (
    <section
      id="research"
      className="relative min-h-screen px-6 lg:px-10 py-32 flex flex-col items-center"
    >
      <div className="max-w-5xl w-full">
        <div className="flex items-end justify-between gap-8 mb-16 lg:mb-20 pb-6 border-b border-foreground/10">
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              § Published work
            </div>
            <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
              Research.
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70 text-right">
            <div>1 paper</div>
            <div>2025</div>
          </div>
        </div>

        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#fbbf24] via-accent to-[#fbbf24] hover:shadow-[0_0_60px_rgba(232,169,67,0.22)] transition-shadow">
          <div className="rounded-[15px] bg-card p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/10 font-mono text-[10px] tracking-[0.25em] uppercase text-[#fbbf24]">
                <Trophy className="size-3.5" /> Best research paper · ICCTVB-25
              </div>

              <h3 className="font-serif italic text-3xl md:text-4xl tracking-tight leading-[1.1]">
                Benchmarking Ensemble &amp; Hybrid ML Models for Renewable Energy
                Forecasting
              </h3>

              <dl className="space-y-2 font-mono text-sm">
                <Row label="Architecture" value="Random Forest · XGBoost · LSTM · Hybrid ensembles" />
                <Row label="Metrics" value="Evaluated on RMSE, MAE, R² across real-world datasets" />
                <Row
                  label="Finding"
                  value="Hybrid models consistently outperformed single-architecture baselines"
                />
              </dl>
            </div>

            <LaurelBadge />
          </div>
        </div>

        <p className="font-mono text-xs text-muted-foreground mt-6 text-center md:text-left">
          Available on request — happy to walk through the methodology.
        </p>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3">
      <dt className="text-muted-foreground text-xs uppercase tracking-wider pt-0.5">
        {label}
      </dt>
      <dd className="text-foreground/85">{value}</dd>
    </div>
  );
}

function LaurelBadge() {
  return (
    <div className="relative w-44 h-44 mx-auto md:mx-0 shrink-0">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_0_18px_rgba(251,191,36,0.3)]"
      >
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <radialGradient id="goldFill" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1407" />
            <stop offset="100%" stopColor="#0a0d1f" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="62" fill="url(#goldFill)" stroke="url(#gold)" strokeWidth="2" />

        {/* Left laurel */}
        <g stroke="url(#gold)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M55,150 Q35,110 50,55" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const t = i / 6;
            const cx = 55 - (55 - 50) * t - 8 + Math.sin(t * 3) * 4;
            const cy = 150 - (150 - 55) * t;
            return (
              <ellipse
                key={`l${i}`}
                cx={cx}
                cy={cy}
                rx="7"
                ry="3"
                transform={`rotate(${-50 + t * 35} ${cx} ${cy})`}
                fill="url(#gold)"
                opacity="0.85"
              />
            );
          })}
        </g>
        {/* Right laurel (mirror) */}
        <g stroke="url(#gold)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M145,150 Q165,110 150,55" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const t = i / 6;
            const cx = 145 + (55 - 50) * t + 8 - Math.sin(t * 3) * 4;
            const cy = 150 - (150 - 55) * t;
            return (
              <ellipse
                key={`r${i}`}
                cx={cx}
                cy={cy}
                rx="7"
                ry="3"
                transform={`rotate(${50 - t * 35} ${cx} ${cy})`}
                fill="url(#gold)"
                opacity="0.85"
              />
            );
          })}
        </g>

        <text
          x="100"
          y="92"
          textAnchor="middle"
          className="font-mono"
          fontSize="11"
          fill="#fde68a"
          letterSpacing="2"
        >
          BEST PAPER
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="16"
          fontWeight="700"
          fill="url(#gold)"
          letterSpacing="2"
        >
          ICCTVB
        </text>
        <text
          x="100"
          y="130"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="#fde68a"
          letterSpacing="3"
        >
          — 25 —
        </text>
      </svg>
    </div>
  );
}
