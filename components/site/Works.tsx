import { ArrowUpRight, Close, LogoMark } from "./Icons";
import { Eyebrow, Lines, Pill, Reveal } from "./Ui";
import { currentlyBuilding, projects, workOrder, type Project } from "@/lib/data";

const ordered: Project[] = workOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export function Works() {
  return (
    <section id="works" className="sec">
      <div className="shell sec-center">
        <Reveal as="span" kind="up" y={12}>
          <Eyebrow boxed>Portfolio</Eyebrow>
        </Reveal>
        <Lines lines={["Selected Work"]} className="h2" delay={120} />

        <ul className="works-grid">
          {ordered.map((p, i) => (
            <Reveal as="li" kind="up" y={48} delay={(i % 2) * 90} key={p.slug}>
              <button
                className="card"
                data-case={p.slug}
                aria-haspopup="dialog"
                aria-label={`Open case study: ${p.title}`}
              >
                <span className="card-meta">
                  <span>
                    {p.category} — {p.year}
                  </span>
                  <span className="card-badge" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </span>
                <span className="card-mark" aria-hidden="true">
                  <LogoMark />
                </span>
                <span className="card-body">
                  <span className="card-name">{p.title}</span>
                  <span className="card-desc">{p.tagline}</span>
                  <span className="card-tags">
                    {p.stack.slice(0, 3).map((t) => (
                      <span className="chip chip--light" key={t}>
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal kind="up" y={20} className="building">
          <p className="building-lbl">Currently building</p>
          <ul>
            {currentlyBuilding.map((b) => (
              <li key={b.name}>
                <b>
                  {b.github ? (
                    <a href={b.github} target="_blank" rel="noreferrer">
                      {b.name}
                    </a>
                  ) : (
                    b.name
                  )}
                </b>
                <p>{b.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** One hidden panel per project; the runtime reveals the matching one. */
export function CaseModal() {
  return (
    <div
      className="modal"
      id="case-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Case study"
      aria-hidden="true"
    >
      <div className="modal-panel modal-panel--wide">
        <button className="modal-x" data-close aria-label="Close">
          <Close />
        </button>
        {ordered.map((p) => (
          <article data-case-panel={p.slug} key={p.slug} hidden>
            <span className="modal-eyebrow">
              {p.category} — {p.year}
            </span>
            <h2 className="case-h">{p.title}</h2>
            <p className="case-lead">{p.tagline}</p>
            <div className="case-tags">
              {p.stack.map((t) => (
                <span className="chip chip--line" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <dl className="case-fields">
              {p.problem && (
                <div>
                  <dt>The problem</dt>
                  <dd>{p.problem}</dd>
                </div>
              )}
              {p.solution && (
                <div>
                  <dt>What I built</dt>
                  <dd>{p.solution}</dd>
                </div>
              )}
              {p.impact && (
                <div className="out">
                  <dt>Outcome</dt>
                  <dd>{p.impact}</dd>
                </div>
              )}
            </dl>
            {(p.github || p.demo) && (
              <div className="case-links">
                {p.github && (
                  <Pill variant="dark" arrow="up-right" href={p.github} external>
                    View source
                  </Pill>
                )}
                {p.demo && (
                  <Pill variant="outline" arrow="up-right" href={p.demo} external>
                    Live demo
                  </Pill>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
