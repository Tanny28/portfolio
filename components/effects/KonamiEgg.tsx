"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-SEQUENCE.length);
      if (buf.join(",") === SEQUENCE.join(",")) {
        setActive(true);
        setTimeout(() => setActive(false), 5000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9998] bg-black flex flex-col items-center justify-center">
      <MatrixRain />
      <div className="relative z-10 text-center space-y-3 select-none">
        <div className="font-mono text-accent text-xl tracking-[0.3em] animate-pulse">
          ACCESS GRANTED
        </div>
        <div className="font-sans text-5xl font-bold tracking-tight text-foreground">
          TANMAY.exe
        </div>
        <div className="font-mono text-sm text-muted-foreground mt-2">
          &gt; initializing legendary engineer...
        </div>
      </div>
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars =
      "アイウエオカキクケコTANMAYSHINDE0123456789ABCDEF<>{}[]|/\\~!@#$%^&*";

    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const bright = Math.random() > 0.92;
        ctx.fillStyle = bright ? "#ffffff" : "#00d4ff";
        ctx.globalAlpha = bright ? 1 : 0.55;
        ctx.fillText(
          chars[Math.floor(Math.random() * chars.length)],
          i * fontSize,
          y * fontSize
        );
        ctx.globalAlpha = 1;
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
