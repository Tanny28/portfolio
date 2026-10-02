import { ArrowRight, Globe, Mail } from "./Icons";
import { Eyebrow, Pill, Reveal, Words } from "./Ui";
import { PROFILE } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="about">
      <div className="shell">
        <div className="about-left">
          <Globe className="about-globe" aria-hidden="true" />
          <Eyebrow>About</Eyebrow>
          <Reveal kind="up" y={12} className="about-loc">
            <Globe />
            <span>Based in Pune — open to remote, hybrid, or on-site roles.</span>
          </Reveal>
        </div>

        <div className="about-right">
          <h2 className="statement words" data-reveal>
            <Words text="I'm a final-year AI & ML engineer who ships" />
            <Words
              className="m"
              text="LLM applications, autonomous agents, and the evaluation that proves they work."
              stagger={35}
            />
          </h2>

          <Reveal kind="up" y={12} delay={200} className="about-foot">
            <div>
              <p className="lbl">Find me online</p>
              <div className="socials">
                <a
                  className="social is-accent"
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <span>GH</span>
                </a>
                <a
                  className="social"
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <span>in</span>
                </a>
                <a className="social" href={`mailto:${PROFILE.email}`} aria-label="Email">
                  <Mail />
                </a>
              </div>
            </div>
            <Pill variant="outline" arrow="right" href={PROFILE.resume} external>
              Resume
            </Pill>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const BAND = [
  { variant: "light", node: "I" },
  { variant: "accent", node: "Build" },
  { variant: "dark", node: <ArrowRight aria-hidden="true" /> },
  { variant: "ghost", node: "Ship" },
] as const;

export function CreateBand() {
  return (
    <section className="band" aria-label="I build, ship">
      <ul className="shell">
        {BAND.map((b, i) => (
          <Reveal as="li" kind="up" y={28} delay={i * 120} key={b.variant}>
            <div className={`tile tile--${b.variant}`}>{b.node}</div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

