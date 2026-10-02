import Image from "next/image";
import { CircleDot, ArrowRight, Star } from "./Icons";
import { Eyebrow, Lines, Pill, Reveal } from "./Ui";
import { PROFILE, affiliations, heroCards } from "@/lib/data";

export function Hero() {
  return (
    <section id="home" className="hero">
      {/* Liquid reveal: the trail canvas paints the warm layer over the grey base. */}
      <div className="hero-bg" data-liquid aria-hidden="true">
        <canvas data-layer="base" />
        <canvas data-layer="trail" />
      </div>
      <div className="hero-vig" aria-hidden="true" />

      <Reveal kind="up" delay={300} gate y={20} className="hero-mark">
        <span aria-hidden="true">TANMAY</span>
      </Reveal>

      <div className="shell hero-grid">
        <div className="hero-left">
          <Reveal as="span" kind="up" delay={200} gate y={10}>
            <Eyebrow>AI / GenAI Engineer</Eyebrow>
          </Reveal>

          <Lines
            as="h1"
            className="h1"
            lines={["I build AI", "systems that", "actually ship"]}
            delay={250}
            stagger={120}
            gate
          />

          <Reveal kind="up" delay={650} gate y={12} className="proof">
            <Star />
            <span>Best Research Paper — ICCTVB-25</span>
          </Reveal>

          <Reveal kind="up" delay={720} gate y={12} className="avail">
            <span className="avail-dot" aria-hidden="true" />
            <span>Open to roles &amp; internships · Class of 2027 · Pune or remote</span>
          </Reveal>

          <Reveal kind="up" delay={800} gate y={12} className="cta-row">
            <Pill variant="dark" arrow="right" contact>
              Let&apos;s Talk
            </Pill>
            <Pill variant="outline" scroll="works">
              View Work
            </Pill>
            <Pill variant="outline" href={PROFILE.resume} external>
              Resume
            </Pill>
          </Reveal>
        </div>

        <div className="hero-right">
          <Reveal kind="scale" delay={400} gate className="hcard">
            <div className="hcard-row" data-hcard>
              <div className="hcard-tile">
                <Image
                  src="/tanmay.jpg"
                  alt="Portrait of Tanmay Shinde"
                  fill
                  sizes="96px"
                  priority
                  style={{ objectPosition: "50% 18%" }}
                />
              </div>
              <div className="hcard-panel">
                <div className="hc-slot" aria-live="polite">
                  {heroCards.map((c, i) => (
                    <div className={`hc-item${i === 0 ? " on" : ""}`} key={c.title}>
                      <p className="hc-cap">{c.caption}</p>
                      <p className="hc-title">{c.title}</p>
                    </div>
                  ))}
                </div>
                <div className="hc-ctrl">
                  <div className="hc-dots" aria-hidden="true">
                    {heroCards.map((c, i) => (
                      <i key={c.title} className={i === 0 ? "on" : undefined} />
                    ))}
                  </div>
                  <div className="hc-btns">
                    <button className="hc-btn prev" data-hc="prev" aria-label="Previous">
                      <ArrowRight />
                    </button>
                    <button className="hc-btn" data-hc="next" aria-label="Next">
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal kind="up" delay={550} gate y={14} className="partners">
            <p className="partners-lbl">Experience · recognition</p>
            <ul>
              {affiliations.map((a) => (
                <li key={a}>
                  <span>
                    <CircleDot />
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal kind="fade" delay={900} gate className="statusbar">
        <div className="shell">
          <span>B.Tech AI &amp; ML · {PROFILE.graduation}</span>
          <span className="mid">Based in Pune, India</span>
          <span className="scroll">
            Scroll to explore <span aria-hidden="true">↓</span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}

