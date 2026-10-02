"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type Cleanup = () => void;

const qs = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const qsa = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

// ───────── hero art (drawn on canvas; no external images) ─────────
function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Each node drifts on its own slow orbit around a fixed anchor.
const NODES = (() => {
  const r = mulberry32(11);
  return Array.from({ length: 64 }, () => ({
    x: r(),
    y: r(),
    ax: 30 + r() * 60,
    ay: 30 + r() * 60,
    fx: 0.12 + r() * 0.26,
    fy: 0.12 + r() * 0.26,
    px: r() * Math.PI * 2,
    py: r() * Math.PI * 2,
  }));
})();

/** Static part of the art (gradient, light, grid). Drawn once per resize. */
function paintBackdrop(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, warm: boolean) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  if (warm) {
    g.addColorStop(0, "#cf8047");
    g.addColorStop(1, "#97501f");
  } else {
    g.addColorStop(0, "#ecebe9");
    g.addColorStop(1, "#c9c9c9");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const blob = (cx: number, cy: number, r: number, rgb: string, a: number) => {
    const rg = ctx.createRadialGradient(cx * w, cy * h, 0, cx * w, cy * h, r * Math.max(w, h));
    rg.addColorStop(0, `rgba(${rgb},${a})`);
    rg.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, w, h);
  };
  blob(0.18, 0.25, 0.55, warm ? "255,220,180" : "255,255,255", warm ? 0.38 : 0.6);
  blob(0.88, 0.85, 0.5, warm ? "70,25,0" : "120,120,120", warm ? 0.35 : 0.16);

  const step = 64 * dpr;
  ctx.lineWidth = dpr;
  ctx.strokeStyle = warm ? "rgba(255,255,255,.2)" : "rgba(17,17,17,.055)";
  ctx.beginPath();
  for (let x = step / 2; x < w; x += step) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = step / 2; y < h; y += step) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
}

/** Moving part: nodes and the links between them. `t` is seconds. */
function drawNetwork(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, warm: boolean, t: number) {
  const pts = NODES.map((n) => ({
    x: n.x * w + Math.sin(t * n.fx + n.px) * n.ax * dpr,
    y: n.y * h + Math.cos(t * n.fy + n.py) * n.ay * dpr,
  }));
  const maxD = 220 * dpr;
  const rgb = warm ? "255,255,255" : "17,17,17";
  const maxA = warm ? 0.42 : 0.14;
  ctx.lineWidth = 1.2 * dpr;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d >= maxD) continue;
      // Links fade in as nodes approach and out as they drift apart.
      const a = Math.pow(1 - d / maxD, 1.3) * maxA;
      ctx.strokeStyle = `rgba(${rgb},${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[j].x, pts[j].y);
      ctx.stroke();
    }
  }
  ctx.fillStyle = warm ? "rgba(255,255,255,.85)" : "rgba(17,17,17,.22)";
  const r = 3 * dpr;
  ctx.beginPath();
  for (const p of pts) {
    ctx.moveTo(p.x + r, p.y);
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
  }
  ctx.fill();
}

// ───────── hero: animated network + liquid cursor reveal ─────────
// The grey network is always drifting. Moving the pointer paints a soft mask;
// the warm copy of the same (live) network shows only where the mask is, so the
// revealed layer moves in sync with the one underneath.
function initLiquid(root: HTMLElement, animate: boolean): Cleanup {
  const base = qs<HTMLCanvasElement>('canvas[data-layer="base"]', root);
  const trail = qs<HTMLCanvasElement>('canvas[data-layer="trail"]', root);
  const bctx = base?.getContext("2d");
  const tctx = trail?.getContext("2d");
  if (!base || !trail || !bctx || !tctx) return () => {};

  const BRUSH = 143;
  const DECAY = 0.016;
  const FADE_FRAMES = 120;
  const FRAME_MS = 22; // ~45fps is plenty for slow drift
  const MS = 0.5; // the mask is soft, so it runs at half resolution

  const bgBase = document.createElement("canvas");
  const bgWarm = document.createElement("canvas");
  const mask = document.createElement("canvas");
  const mctx = mask.getContext("2d")!;
  const sprite = document.createElement("canvas");

  let w = 1;
  let h = 1;
  let dpr = 1;
  let points: { x: number; y: number }[] = [];
  let last: { x: number; y: number } | null = null;
  let idle = FADE_FRAMES + 1; // > FADE_FRAMES means "no trail on screen"
  let trailDirty = false;
  let raf = 0;
  let lastDraw = 0;
  let visible = true;

  const draw = (t: number) => {
    bctx.drawImage(bgBase, 0, 0);
    drawNetwork(bctx, w, h, dpr, false, t);

    if (idle <= FADE_FRAMES) {
      tctx.globalCompositeOperation = "source-over";
      tctx.clearRect(0, 0, w, h);
      tctx.drawImage(bgWarm, 0, 0);
      drawNetwork(tctx, w, h, dpr, true, t);
      tctx.globalCompositeOperation = "destination-in";
      tctx.drawImage(mask, 0, 0, w, h);
      tctx.globalCompositeOperation = "source-over";
      trailDirty = true;
    } else if (trailDirty) {
      tctx.clearRect(0, 0, w, h);
      trailDirty = false;
    }
  };

  const resize = () => {
    const r = root.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = Math.max(1, Math.round(r.width * dpr));
    h = Math.max(1, Math.round(r.height * dpr));
    for (const c of [base, trail, bgBase, bgWarm]) {
      c.width = w;
      c.height = h;
    }
    mask.width = Math.max(1, Math.round(w * MS));
    mask.height = Math.max(1, Math.round(h * MS));
    paintBackdrop(bgBase.getContext("2d")!, w, h, dpr, false);
    paintBackdrop(bgWarm.getContext("2d")!, w, h, dpr, true);

    const d = Math.ceil(BRUSH * dpr * MS * 2);
    sprite.width = sprite.height = d;
    const sctx = sprite.getContext("2d")!;
    const g = sctx.createRadialGradient(d / 2, d / 2, 0, d / 2, d / 2, d / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.55, "rgba(255,255,255,.82)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, d, d);

    idle = FADE_FRAMES + 1;
    draw(performance.now() / 1000);
  };

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (now - lastDraw < FRAME_MS) return;
    lastDraw = now;

    const drawing = points.length > 0;
    if (drawing) idle = 0;
    else if (idle <= FADE_FRAMES) idle++;

    if (idle <= FADE_FRAMES) {
      const fade = drawing ? DECAY : Math.min(DECAY + idle * 0.004, 0.5);
      mctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = `rgba(0,0,0,${fade})`;
      mctx.fillRect(0, 0, mask.width, mask.height);
      mctx.globalCompositeOperation = "source-over";
      if (drawing) {
        const c = sprite.width / 2;
        for (const p of points) mctx.drawImage(sprite, p.x * MS - c, p.y * MS - c);
        points = [];
      } else if (idle === FADE_FRAMES) {
        mctx.clearRect(0, 0, mask.width, mask.height);
      }
    }
    draw(now / 1000);
  };

  const start = () => {
    if (!raf && animate && visible && !document.hidden) raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const onMove = (e: PointerEvent) => {
    const r = trail.getBoundingClientRect();
    const x = (e.clientX - r.left) * dpr;
    const y = (e.clientY - r.top) * dpr;
    const radius = BRUSH * dpr;
    if (x < -radius || y < -radius || x > w + radius || y > h + radius) {
      last = null;
      return;
    }
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const step = Math.max(radius * 0.3, 1);
      const n = Math.min(Math.ceil(Math.hypot(dx, dy) / step), 60);
      for (let i = 1; i <= n; i++) points.push({ x: last.x + (dx * i) / n, y: last.y + (dy * i) / n });
    } else {
      points.push({ x, y });
    }
    last = { x, y };
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(root);

  // Only animate while the hero is on screen and the tab is visible.
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) start();
    else stop();
  });
  io.observe(root);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  if (animate) {
    window.addEventListener("pointermove", onMove, { passive: true });
    start();
  }

  return () => {
    stop();
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onMove);
  };
}

// ───────── main ─────────
function init(): Cleanup {
  const cleanups: Cleanup[] = [];
  const html = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = qs("#page");

  // Adaptive grid: above 1920px the root font-size keeps growing (media queries handle the rest).
  const applyAdaptiveGrid = () => {
    const FONT_BASE = 16;
    const baseWidth = 1920;
    const coef = 0.6666;
    const reduction = ((baseWidth - window.innerWidth) / baseWidth) * 100;
    const size = FONT_BASE - (FONT_BASE * (reduction * coef)) / 100;
    if (size > FONT_BASE) html.style.fontSize = `${size}px`;
    else html.style.removeProperty("font-size");
  };
  applyAdaptiveGrid();
  window.addEventListener("resize", applyAdaptiveGrid);
  cleanups.push(() => {
    window.removeEventListener("resize", applyAdaptiveGrid);
    html.style.removeProperty("font-size");
  });

  // Smooth scroll + lock counter (loader, menu and modals can overlap).
  let lenis: Lenis | null = null;
  const prevRestoration = history.scrollRestoration;
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  if (!reduced) {
    lenis = new Lenis({ smoothWheel: true });
    let rafId = requestAnimationFrame(function loop(t) {
      lenis?.raf(t);
      rafId = requestAnimationFrame(loop);
    });
    cleanups.push(() => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
    });
  }
  cleanups.push(() => {
    history.scrollRestoration = prevRestoration;
  });

  let locks = 0;
  const lockScroll = () => {
    if (locks++ === 0) {
      lenis?.stop();
      html.style.position = "relative";
      html.style.overflow = "hidden";
      html.style.height = "100%";
    }
  };
  const unlockScroll = () => {
    if (locks > 0 && --locks === 0) {
      lenis?.start();
      html.style.removeProperty("position");
      html.style.removeProperty("overflow");
      html.style.removeProperty("height");
    }
  };
  cleanups.push(() => {
    locks = 1;
    unlockScroll();
  });

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.1 });
    else el.scrollIntoView();
  };

  // Reveals: gated ones wait for the loader, the rest play once in view.
  qsa("[data-reveal]").forEach((el) => el.classList.remove("in"));
  const setReady = () => {
    html.classList.add("is-ready");
    qsa("[data-gate]").forEach((el) => el.classList.add("in"));
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
  );
  qsa("[data-reveal]:not([data-gate])").forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());

  // Loader
  const loader = qs("#loader");
  if (loader) {
    loader.classList.remove("exit");
    loader.style.display = "";
  }
  if (loader && !reduced) {
    lockScroll();
    const fill = qs("[data-loader-fill]", loader);
    const count = qs("[data-loader-count]", loader);
    const FILL_MS = 1300;
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let rafId = 0;
    let fallback = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      loader.style.display = "none";
      unlockScroll();
      setReady();
    };
    const step = (now: number) => {
      const t = Math.min((now - t0) / FILL_MS, 1);
      const p = Math.round(ease(t) * 100);
      if (fill) fill.style.width = `${p}%`;
      if (count) count.textContent = String(p).padStart(3, "0");
      if (t < 1) {
        rafId = requestAnimationFrame(step);
        return;
      }
      loader.classList.add("exit");
      fallback = window.setTimeout(finish, 1100);
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.target === loader && e.propertyName === "transform") finish();
    };
    loader.addEventListener("transitionend", onEnd);
    rafId = requestAnimationFrame(step);
    cleanups.push(() => {
      cancelAnimationFrame(rafId);
      clearTimeout(fallback);
      loader.removeEventListener("transitionend", onEnd);
      if (!finished) unlockScroll();
    });
  } else {
    if (loader) loader.style.display = "none";
    setReady();
  }

  // Clock (Pune time)
  const timeEls = qsa("[data-clock-time]");
  const dateEls = qsa("[data-clock-date]");
  const tz = "Asia/Kolkata";
  const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz });
  const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: tz });
  const tickClock = () => {
    const now = new Date();
    const time = timeFmt.format(now).replace(/\s?([AP])M/i, (_, m: string) => `${m.toLowerCase()}m`);
    const parts = dateFmt.formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    const date = `${get("day")} ${get("month")}, ${get("year")}`;
    timeEls.forEach((el) => (el.textContent = time));
    dateEls.forEach((el) => (el.textContent = date));
  };
  tickClock();
  const clockId = window.setInterval(tickClock, 1000);
  cleanups.push(() => clearInterval(clockId));

  // Hero: animated network + liquid reveal (static when reduced motion is on)
  const liquid = qs("[data-liquid]");
  if (liquid) cleanups.push(initLiquid(liquid, !reduced));

  // Hero card carousel
  const hcard = qs("[data-hcard]");
  if (hcard) {
    const items = qsa(".hc-item", hcard);
    const dots = qsa(".hc-dots i", hcard);
    let idx = 0;
    const go = (stepBy: number) => {
      const next = (idx + stepBy + items.length) % items.length;
      if (next === idx) return;
      const dir = stepBy > 0 ? 1 : -1;
      const cur = items[idx];
      const nx = items[next];
      cur.style.setProperty("--dir", String(dir));
      nx.style.setProperty("--dir", String(dir));
      nx.style.transition = "none";
      nx.classList.remove("leave", "on");
      void nx.offsetWidth;
      nx.style.transition = "";
      cur.classList.remove("on");
      cur.classList.add("leave");
      nx.classList.add("on");
      dots.forEach((d, i) => d.classList.toggle("on", i === next));
      idx = next;
    };
    const onCard = (e: Event) => {
      const b = (e.target as Element).closest<HTMLElement>("[data-hc]");
      go(b ? (b.dataset.hc === "prev" ? -1 : 1) : 1);
    };
    hcard.addEventListener("click", onCard);
    cleanups.push(() => hcard.removeEventListener("click", onCard));
  }

  // Count-up numbers, driven by scroll progress
  const counters = qsa("[data-count]").map((el) => ({
    el,
    value: Number(el.dataset.count ?? 0),
  }));
  if (counters.length && !reduced) {
    let pending = false;
    const update = () => {
      pending = false;
      const vh = window.innerHeight;
      for (const c of counters) {
        const r = c.el.getBoundingClientRect();
        const p = clamp((vh - r.top) / (vh / 2 + r.height / 2), 0, 1);
        c.el.textContent = String(Math.round(p * c.value));
      }
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const off = lenis?.on("scroll", schedule);
    cleanups.push(() => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      off?.();
    });
  }

  // Overlays (menu, case study, contact)
  const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])';
  const stack: Overlay[] = [];
  let restoreTo: HTMLElement | null = null;
  let keepRestore = false;

  type Overlay = { el: HTMLElement; open: () => void; close: (keepFocus?: boolean) => void; readonly isOpen: boolean };

  const makeOverlay = (el: HTMLElement | null, onClose?: () => void): Overlay | null => {
    if (!el) return null;
    let isOpen = false;
    el.querySelectorAll<HTMLElement>(".modal-panel").forEach((p) => p.setAttribute("data-lenis-prevent", ""));
    if (el.id === "menu") el.setAttribute("data-lenis-prevent", "");
    const overlay: Overlay = {
      el,
      get isOpen() {
        return isOpen;
      },
      open() {
        if (isOpen) return;
        isOpen = true;
        if (!keepRestore) restoreTo = document.activeElement as HTMLElement | null;
        keepRestore = false;
        stack.push(overlay);
        el.classList.add("open");
        el.setAttribute("aria-hidden", "false");
        page?.setAttribute("inert", "");
        lockScroll();
        window.setTimeout(() => {
          qsa(FOCUSABLE, el).find((n) => n.getClientRects().length > 0)?.focus();
        }, 60);
      },
      close(keepFocus = false) {
        if (!isOpen) return;
        isOpen = false;
        const i = stack.indexOf(overlay);
        if (i >= 0) stack.splice(i, 1);
        el.classList.remove("open");
        el.setAttribute("aria-hidden", "true");
        if (!stack.length) page?.removeAttribute("inert");
        unlockScroll();
        onClose?.();
        if (keepFocus) keepRestore = true;
        else if (!stack.length) {
          restoreTo?.isConnected && restoreTo.focus();
          restoreTo = null;
        }
      },
    };
    return overlay;
  };

  const menu = makeOverlay(qs("#menu"));
  const caseModal = makeOverlay(qs("#case-modal"));
  const request = makeOverlay(qs("#request-modal"), () => {
    window.setTimeout(() => {
      form?.reset();
      qs("[data-request-form]")?.removeAttribute("hidden");
      qs("[data-request-success]")?.setAttribute("hidden", "");
      const btn = qs("button[type=submit] .pill-in", form ?? document);
      if (btn?.firstChild) btn.firstChild.textContent = "Send request";
    }, 350);
  });

  const openCase = (slug: string) => {
    qsa("[data-case-panel]").forEach((p) => (p.hidden = p.dataset.casePanel !== slug));
    const panel = qs(".modal-panel", caseModal?.el);
    if (panel) panel.scrollTop = 0;
    caseModal?.open();
  };

  // Contact form: opens the visitor's mail app with the message drafted.
  const form = qs<HTMLFormElement>("#request-modal form");
  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!form || !form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const label = qs("button[type=submit] .pill-in", form);
    if (label?.firstChild) label.firstChild.textContent = "Opening…";
    window.location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${body}`;
    window.setTimeout(() => {
      qs("[data-request-form]")?.setAttribute("hidden", "");
      qs("[data-request-success]")?.removeAttribute("hidden");
    }, 400);
  };
  form?.addEventListener("submit", onSubmit);
  cleanups.push(() => form?.removeEventListener("submit", onSubmit));

  const onClick = (e: MouseEvent) => {
    const t = e.target as Element | null;
    if (!t) return;

    // Backdrop click closes the modal.
    for (const o of [request, caseModal]) {
      if (o && t === o.el) {
        o.close();
        return;
      }
    }

    const opener = t.closest<HTMLElement>("[data-open]");
    if (opener) {
      e.preventDefault();
      if (opener.dataset.open === "menu") menu?.open();
      else if (opener.dataset.open === "request") {
        const wasOpen = menu?.isOpen || caseModal?.isOpen;
        menu?.close(true);
        caseModal?.close(true);
        if (!wasOpen) keepRestore = false;
        request?.open();
      }
      return;
    }

    const caseBtn = t.closest<HTMLElement>("[data-case]");
    if (caseBtn?.dataset.case) {
      openCase(caseBtn.dataset.case);
      return;
    }

    if (t.closest("[data-close]")) {
      stack[stack.length - 1]?.close();
      return;
    }

    const scroller = t.closest<HTMLElement>("[data-scroll]");
    if (scroller?.dataset.scroll) {
      e.preventDefault();
      const wasOpen = menu?.isOpen;
      menu?.close();
      const id = scroller.dataset.scroll;
      window.setTimeout(() => goTo(id), wasOpen ? 80 : 0);
    }
  };
  document.addEventListener("click", onClick);

  const onKey = (e: KeyboardEvent) => {
    const top = stack[stack.length - 1];
    if (!top) return;
    if (e.key === "Escape") {
      top.close();
      return;
    }
    if (e.key !== "Tab") return;
    const f = qsa(FOCUSABLE, top.el).filter((n) => n.getClientRects().length > 0);
    if (!f.length) return;
    const first = f[0];
    const lastEl = f[f.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && active === lastEl) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", onKey);
  cleanups.push(() => {
    document.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKey);
    page?.removeAttribute("inert");
  });

  return () => cleanups.reverse().forEach((fn) => fn());
}

export default function Runtime() {
  useEffect(() => init(), []);
  return null;
}
