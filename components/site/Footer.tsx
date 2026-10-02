import { Close, Copy, LogoMark } from "./Icons";
import { Lines, Pill } from "./Ui";
import { PROFILE } from "@/lib/data";

export function Footer() {
  return (
    <footer id="contact" className="ftr">
      <div className="shell">
        <div className="ftr-cta">
          <Lines
            lines={["Building with LLMs", "or agents? Let's talk."]}
            className="h2"
            stagger={100}
          />
          <div className="ftr-actions">
            <Pill variant="light" arrow="up-right" contact>
              Get in touch
            </Pill>
            <button className="copy-btn" data-copy={PROFILE.email} type="button">
              <Copy />
              <span data-copy-label>Copy email</span>
            </button>
          </div>
        </div>

        <div className="ftr-cols">
          <div>
            <div className="ftr-brand">
              <LogoMark />
              {PROFILE.name}
            </div>
            <p className="ftr-tag">
              AI/GenAI engineer building LLM applications, autonomous agents, and ML
              systems — from problem to production.
            </p>
          </div>
          <nav className="ftr-col" aria-label="Footer navigation">
            <h3>Navigate</h3>
            <ul>
              <li><a href="#about" data-scroll="about">About</a></li>
              <li><a href="#works" data-scroll="works">Work</a></li>
              <li><a href="#experience" data-scroll="experience">Experience</a></li>
              <li><a href="#skills" data-scroll="skills">Stack</a></li>
            </ul>
          </nav>
          <div className="ftr-col">
            <h3>Elsewhere</h3>
            <ul>
              <li><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={PROFILE.resume} target="_blank" rel="noreferrer">Resume</a></li>
            </ul>
          </div>
          <div className="ftr-col">
            <h3>Contact</h3>
            <ul>
              <li><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
              <li><span style={{ opacity: 0.65 }}>{PROFILE.location}</span></li>
            </ul>
          </div>
        </div>

        <div className="ftr-legal">
          <span>© 2026 {PROFILE.name}.</span>
          <div>
            <a href="#home" data-scroll="home">Back to top</a>
          </div>
        </div>
      </div>
      <div className="ftr-mark" aria-hidden="true">TANMAY</div>
    </footer>
  );
}

export function RequestModal() {
  return (
    <div
      className="modal"
      id="request-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-title"
      aria-hidden="true"
    >
      <div className="modal-panel">
        <button className="modal-x" data-close aria-label="Close">
          <Close />
        </button>

        <div data-request-form>
          <span className="modal-eyebrow">Get in touch</span>
          <h2 className="modal-h" id="request-title">
            Tell me what you&apos;re building.
          </h2>
          <form className="form" noValidate data-email={PROFILE.email}>
            <label className="field">
              <span>Name</span>
              <input name="name" type="text" required placeholder="Your name" autoComplete="name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="A few words about the role or project, timeline, and how to reach you."
              />
            </label>
            <div className="form-foot">
              <p>
                Opens your mail app with this drafted. No mail app?{" "}
                <button className="link-btn" type="button" data-copy={PROFILE.email}>
                  Copy my email
                </button>
              </p>
              <Pill variant="dark" arrow="up-right" type="submit">
                Send request
              </Pill>
            </div>
          </form>
        </div>

        <div className="success" data-request-success hidden>
          <div className="success-badge">
            <LogoMark />
          </div>
          <h3>Your draft is ready</h3>
          <p>
            Your mail app should open with the message drafted. If it doesn&apos;t, write to{" "}
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
          </p>
          <Pill variant="dark" close>
            Close
          </Pill>
        </div>
      </div>
    </div>
  );
}
