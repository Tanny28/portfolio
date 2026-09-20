"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CommandPalette, { type CommandItem } from "@/components/ui/CommandPalette";
import { projects, PROFILE } from "@/lib/data";

const SECTIONS: CommandItem[] = [
  { id: "hero", label: "Home", hint: "Section" },
  { id: "about", label: "About", hint: "Section" },
  { id: "projects", label: "Projects", hint: "Section" },
  { id: "skills", label: "Stack", hint: "Section", keywords: "skills technologies" },
  { id: "experience", label: "Experience", hint: "Section" },
  { id: "achievements", label: "Recognition", hint: "Section", keywords: "achievements awards" },
  { id: "contact", label: "Contact", hint: "Section" },
];

const PROJECT_ITEMS: CommandItem[] = projects.map((p) => ({
  id: `project:${p.slug}`,
  label: p.title,
  hint: "Case study",
  keywords: `${p.role} ${p.stack.join(" ")}`,
}));

const LINKS: CommandItem[] = [
  { id: "github", label: "Open GitHub", hint: "↗", keywords: "code repo" },
  { id: "linkedin", label: "Open LinkedIn", hint: "↗" },
  { id: "resume", label: "Download resume", hint: "↗", keywords: "cv pdf" },
  { id: "email", label: `Email ${PROFILE.email}`, hint: "Mail", keywords: "contact reach out" },
];

const ITEMS: CommandItem[] = [...SECTIONS, ...PROJECT_ITEMS, ...LINKS];

function runAction(id: string) {
  if (id === "github") return window.open(PROFILE.github, "_blank", "noopener,noreferrer");
  if (id === "linkedin") return window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer");
  if (id === "resume") return window.open(PROFILE.resume, "_blank", "noopener,noreferrer");
  if (id === "email") {
    window.location.href = `mailto:${PROFILE.email}`;
    return;
  }
  const targetId = id.startsWith("project:") ? id.slice("project:".length) : id;
  // Instant, not smooth: the palette unmounts (and its focused input goes
  // with it) in the same tick, which reliably cuts an in-progress smooth
  // scroll short. An instant jump can't be interrupted mid-animation.
  document.getElementById(targetId)?.scrollIntoView({ behavior: "instant", block: "start" });
}

export default function CommandK() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="pressable inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border text-muted-foreground hover:border-accent/50 hover:text-accent font-mono text-[11px] tracking-[0.1em] uppercase"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Search</span>
        <span className="hidden sm:inline rounded-sm border border-border px-1 py-0.5 text-[9.5px] leading-none">
          ⌘K
        </span>
      </button>

      <CommandPalette
        open={open}
        items={ITEMS}
        onDismiss={() => setOpen(false)}
        onSelect={(item) => {
          setOpen(false);
          // Release the scroll-lock synchronously rather than waiting for
          // the palette's effect cleanup to run on the next commit: some
          // actions (window.open) must fire inside the original click's
          // event tick or popup blockers silently kill them, so nothing
          // here can be deferred to a later frame.
          document.documentElement.style.overflow = "";
          runAction(item.id);
        }}
      />
    </>
  );
}
