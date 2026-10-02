import { LogoMark, MenuLines, Close } from "./Icons";
import { Reveal } from "./Ui";
import { PROFILE } from "@/lib/data";

export const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Work", id: "works" },
  { label: "Experience", id: "experience" },
  { label: "Stack", id: "skills" },
  { label: "Contact", id: "contact" },
] as const;

export function Loader() {
  return (
    <div className="loader" id="loader" role="status" aria-label="Loading">
      <div className="loader-center">
        <div className="loader-brand">
          <LogoMark />
          {PROFILE.name}
        </div>
        <p className="loader-tag">AI systems that actually ship.</p>
      </div>
      <div className="loader-progress">
        <div className="loader-track">
          <div className="loader-fill" data-loader-fill />
        </div>
        <div className="loader-meta">
          <span>Loading</span>
          <b data-loader-count>000</b>
        </div>
      </div>
    </div>
  );
}

function navAttrs(id: string) {
  return id === "contact"
    ? { "data-open": "request" }
    : { "data-scroll": id };
}

export function Header() {
  return (
    <header className="hdr">
      <Reveal kind="down" delay={150} gate>
        <div className="shell">
          <a href="#home" className="brand" data-scroll="home">
            <LogoMark />
            {PROFILE.name}
          </a>

          <nav className="nav" aria-label="Primary">
            <ul>
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.id === "contact" ? "#contact" : `#${n.id}`}
                    aria-current={n.id === "home" ? "page" : undefined}
                    {...navAttrs(n.id)}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hdr-right">
            <div className="clock" aria-label="Local time in Pune">
              <span className="lbl">Pune</span>
              <span className="t" data-clock-time>
                --:--
              </span>
              <span className="sep">•</span>
              <span className="d" data-clock-date>
                &nbsp;
              </span>
            </div>
            <button className="menu-btn" data-open="menu" aria-haspopup="dialog">
              <span>
                <MenuLines />
                <span className="mlbl">Menu</span>
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </header>
  );
}

export function NavMenu() {
  return (
    <div
      className="menu"
      id="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden="true"
    >
      <div className="shell menu-top">
        <span className="menu-brand">
          <LogoMark />
          {PROFILE.name}
        </span>
        <button className="menu-close" data-close>
          <Close />
          Close
        </button>
      </div>
      <nav className="shell menu-nav" aria-label="Menu">
        <ul>
          {NAV.map((n, i) => (
            <li key={n.id}>
              <button
                className="menu-item"
                style={{ ["--i" as string]: i }}
                {...navAttrs(n.id)}
              >
                <i>0{i + 1}</i>
                <b>{n.label}</b>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="shell menu-bot">
        <span>
          Pune — <span data-clock-time>--:--</span>
        </span>
        <button data-open="request">Get in touch →</button>
      </div>
    </div>
  );
}
