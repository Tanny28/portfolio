import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./Icons";

type PillProps = {
  variant?: "dark" | "light" | "outline";
  arrow?: "right" | "up-right" | false;
  href?: string;
  external?: boolean;
  /** Opens the contact modal. */
  contact?: boolean;
  /** Smooth-scroll to a section id. */
  scroll?: string;
  /** Closes the open overlay. */
  close?: boolean;
  children: ReactNode;
  type?: "button" | "submit";
};

export function Pill({
  variant = "dark",
  arrow = false,
  href,
  external,
  contact,
  scroll,
  close,
  children,
  type = "button",
}: PillProps) {
  const cls = `pill pill--${variant}${arrow ? " pill--arrow" : ""}`;
  const inner = (
    <span className="pill-in">
      {children}
      {arrow && (
        <span className="pill-badge">
          {arrow === "right" ? <ArrowRight /> : <ArrowUpRight />}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      className={cls}
      type={type}
      data-open={contact ? "request" : undefined}
      data-scroll={scroll}
      data-close={close ? "" : undefined}
    >
      {inner}
    </button>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  boxed,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  boxed?: boolean;
}) {
  return (
    <span
      className={`eyebrow${tone === "light" ? " eyebrow--light" : ""}${boxed ? " eyebrow--boxed" : ""}`}
    >
      {children}
    </span>
  );
}

/** Line-by-line clipped reveal. `gate` waits for the intro loader. */
export function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  delay = 0,
  stagger = 0,
  gate,
}: {
  as?: "h1" | "h2";
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  gate?: boolean;
}) {
  return (
    <Tag
      className={`lines ${className}`}
      data-reveal
      data-gate={gate ? "ready" : undefined}
    >
      {lines.map((l, i) => (
        <span className="ln" key={l}>
          <span style={{ transitionDelay: `${delay + i * stagger}ms` }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Word-by-word rise, used for the About statement. */
export function Words({
  text,
  className = "",
  stagger = 35,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`}>
          <span
            className={`wd ${className}`}
            style={{ transitionDelay: `${i * stagger}ms` }}
          >
            {w}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/** Wrapper that fades/rises an element in. `gate` waits for the loader. */
export function Reveal({
  as: Tag = "div",
  kind = "up",
  delay = 0,
  gate,
  y,
  className = "",
  children,
}: {
  as?: "div" | "li" | "span" | "section";
  kind?: "up" | "down" | "scale" | "fade";
  delay?: number;
  gate?: boolean;
  y?: number;
  className?: string;
  children: ReactNode;
}) {
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  if (y !== undefined) (style as Record<string, string>)["--y"] = `${y}px`;
  return (
    <Tag
      className={`rv rv-${kind} ${className}`}
      style={style}
      data-reveal
      data-gate={gate ? "ready" : undefined}
    >
      {children}
    </Tag>
  );
}
