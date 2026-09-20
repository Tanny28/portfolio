"use client";

import { useEffect } from "react";

// Tracks the cursor across any `.spotlight` element and feeds its local
// position to the CSS gradient border.
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        ".spotlight"
      );
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - r.left}px`);
      target.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
