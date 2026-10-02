import { ArrowUpRight } from "./Icons";
import { Eyebrow, Lines, Reveal } from "./Ui";
import { education, experience, expertise, skillGroups, stats } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

export function Expertise() {
  return (
    <section id="expertise" className="sec sec--pad">
      <div className="shell">
        <Reveal as="span" kind="up" y={12}>
          <Eyebrow>Expertise</Eyebrow>
        </Reveal>
        <div className="sec-head">
          <Lines lines={["What I do best"]} className="h2" delay={120} />
        </div>

        <ul className="rows">
          {expertise.map((e, i) => (
            <Reveal as="li" kind="up" y={24} delay={i * 80} key={e.title}>
              <a className="row" href="#works" data-scroll="works">
                <span className="row-i">{pad(i + 1)}</span>
                <h3 className="row-t">{e.title}</h3>
                <p className="row-d">{e.text}</p>
                <span className="row-badge" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Experience() {
  const rows = [
    ...experience.map((x) => ({
      key: x.org,
      title: x.org,
      sub: `${x.title} · ${x.period} · ${x.location}`,
      points: x.points,
      tags: x.tags,
    })),
    {
      key: "education",
      title: education.school,
      sub: `${education.degree} · ${education.graduation} · CGPA ${education.cgpa}`,
      points: [`Coursework: ${education.coursework}.`],
      tags: ["NVIDIA — Fundamentals of NLP"],
    },
  ];

  return (
    <section id="experience" className="sec sec--pad">
      <div className="shell">
        <Reveal as="span" kind="up" y={12}>
          <Eyebrow>Experience</Eyebrow>
        </Reveal>
        <div className="sec-head">
          <Lines lines={["Where I've worked"]} className="h2" delay={120} />
        </div>

        <ol className="rows">
          {rows.map((r, i) => (
            <Reveal as="li" kind="up" y={24} delay={i * 80} key={r.key}>
              <div className="row row--xp">
                <span className="row-i">{pad(i + 1)}</span>
                <div className="row-main">
                  <h3 className="row-t">{r.title}</h3>
                  <p className="row-sub">{r.sub}</p>
                  <ul className="row-pts">
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="row-tags">
                    {r.tags.map((t) => (
                      <span className="chip chip--line" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Stack() {
  return (
    <section id="skills" className="sec sec--pad">
      <div className="shell">
        <Reveal as="span" kind="up" y={12}>
          <Eyebrow>Stack</Eyebrow>
        </Reveal>
        <div className="sec-head">
          <Lines lines={["What I work with"]} className="h2" delay={120} />
        </div>

        <ul className="stack-list">
          {skillGroups.map((g, i) => (
            <Reveal as="li" kind="up" y={20} delay={(i % 3) * 70} key={g.category}>
              <dl className="stack-row">
                <dt>{g.category}</dt>
                <dd>
                  {g.skills.map((s) => (
                    <span className="chip chip--line" key={s}>
                      {s}
                    </span>
                  ))}
                </dd>
              </dl>
            </Reveal>
          ))}
        </ul>
        <p className="stack-note">
          Practices: end-to-end delivery · peer review · model monitoring · clean modular code
        </p>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="sec" aria-label="By the numbers">
      <div className="shell" style={{ paddingTop: 0 }}>
        <Reveal kind="up" y={40} className="stats-panel">
          <Eyebrow tone="light">By the numbers</Eyebrow>
          <Lines lines={["Proof in the work,", "not the words."]} className="stats-h" delay={120} />

          <ul className="stats-grid">
            {stats.map((s, i) => (
              <Reveal as="li" kind="up" y={20} delay={i * 90} key={s.label}>
                <div className="stat-n">
                  {s.prefix && <small>{s.prefix}</small>}
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix && <small>{s.suffix}</small>}
                </div>
                <p className="stat-l">{s.label}</p>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
