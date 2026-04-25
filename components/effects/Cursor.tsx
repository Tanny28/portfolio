"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let scale = 1, targetScale = 1;
    let raf: number;

    dot.style.opacity = "1";
    ring.style.opacity = "1";
    document.body.style.cursor = "none";

    const isInteractive = (t: EventTarget | null) =>
      !!(t as Element | null)?.closest?.(
        "a, button, [role=button], input, textarea, select, label"
      );

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) targetScale = 3;
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) targetScale = 1;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const tick = () => {
      dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      scale += (targetScale - scale) * 0.15;
      const s = scale.toFixed(3);
      ring.style.transform = `translate(${rx - 20}px,${ry - 20}px) scale(${s})`;
      ring.style.mixBlendMode = scale > 1.5 ? "difference" : "normal";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] size-2 rounded-full bg-accent pointer-events-none opacity-0"
        style={{ willChange: "transform" }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] size-10 rounded-full border border-accent/70 pointer-events-none opacity-0"
        style={{ willChange: "transform" }}
        aria-hidden
      />
    </>
  );
}
