const STATS: Array<[string, string]> = [
  ["University", "Pimpri Chinchwad University, Pune"],
  ["Degree", "B.Tech AI-ML · Class of 2027"],
  ["CGPA", "8.24"],
  ["Internships", "1 (Virtunexa)"],
  ["Live Deployments", "2"],
  ["Awards", "Best Paper · ICCTVB-25"],
  ["Currently Building", "Agentic AI · RAG · VLMs"],
  ["Status", "● SHIPPING"],
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="font-mono text-xs text-accent tracking-widest">
            // ABOUT
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight">
            Production-grade Generative AI.
          </h2>

          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              B.Tech AI-ML student at Pimpri Chinchwad University, Pune. CGPA 8.24.
              I focus on production-grade Generative AI — LLM agents, RAG pipelines,
              and VLM-powered systems that actually ship.
            </p>
            <p>
              Recently built a multi-agent drone security system (LangChain + Groq
              Llama 3.3 + CLIP) and deployed an enterprise review intelligence
              platform live on Streamlit Cloud. Awarded Best Research Paper at
              ICCTVB-25 for hybrid ML models in renewable energy forecasting.
            </p>
            <p>
              Open to AI Engineer and Gen AI internship roles for 2026. If you&apos;re
              building hard things with LLMs, agents, or applied AI —{" "}
              <a
                href="mailto:shindetanmay282@gmail.com"
                className="text-accent hover:underline"
              >
                let&apos;s talk
              </a>
              .
            </p>
          </div>
        </div>

        <div className="relative rounded-lg border border-border bg-card/60 backdrop-blur p-6 md:p-8 font-mono text-sm">
          <div className="absolute -top-3 left-6 px-2 bg-background text-[10px] text-muted-foreground tracking-widest">
            ./stats.json
          </div>
          <ul className="divide-y divide-border/60">
            {STATS.map(([label, value]) => (
              <li
                key={label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
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
    </section>
  );
}
