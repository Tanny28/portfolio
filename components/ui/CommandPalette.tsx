// Fuzzy-match engine and keyboard-nav hook adapted from "Command Palette" by
// @ddoemonn on 21st.dev (motion/react → this project's installed framer-motion,
// same library under its pre-rename package). Presentation fully rebuilt
// against this project's dark-only graphite/brass tokens.
"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";

const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const BOUNDARY = /[\s\-_/.:]/;

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
};

function scoreOne(text: string, query: string): number {
  const t = text.toLowerCase();
  let cursor = 0;
  let total = 0;
  let streak = 0;

  for (let i = 0; i < query.length; i++) {
    const at = t.indexOf(query[i], cursor);
    if (at < 0) return -1;
    streak = at === cursor && i > 0 ? streak + 1 : 0;
    total += 2 + streak * 4;
    if (at === 0) total += 12;
    else if (BOUNDARY.test(t[at - 1])) total += 8;
    cursor = at + 1;
  }
  return total;
}

function rank(items: CommandItem[], query: string): CommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  const scored: { item: CommandItem; score: number; order: number }[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const direct = scoreOne(item.label, q);
    const aliased = item.keywords ? scoreOne(item.keywords, q) - 3 : -1;
    const best = Math.max(direct, item.keywords ? aliased : -1);
    if (best < 0) continue;
    scored.push({ item, score: best - item.label.length * 0.05, order: i });
  }
  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  return scored.map((s) => s.item);
}

function useCommandPalette({
  items,
  onSelect,
  onDismiss,
}: {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onDismiss?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [pinned, setPinned] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pointer = useRef({ x: -1, y: -1 });

  const select = useRef(onSelect);
  select.current = onSelect;
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;

  const results = useMemo(() => rank(items, query), [items, query]);
  const activeId = results.some((r) => r.id === pinned) ? pinned : (results[0]?.id ?? null);
  const activeIndex = results.findIndex((r) => r.id === activeId);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [query]);

  const reveal = (index: number) => {
    const list = listRef.current;
    const row = list?.children[index];
    if (!list || !(row instanceof HTMLElement)) return;
    const top = row.offsetTop - 5;
    const bottom = row.offsetTop + row.offsetHeight + 5;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight;
    }
  };

  const jump = (index: number) => {
    if (results.length === 0) return;
    const next = Math.max(0, Math.min(results.length - 1, index));
    setPinned(results[next].id);
    reveal(next);
  };

  const move = (delta: number) => {
    if (results.length === 0) return;
    const from = activeIndex < 0 ? 0 : activeIndex;
    jump((from + delta + results.length) % results.length);
  };

  const run = (item?: CommandItem) => {
    const target = item ?? results.find((r) => r.id === activeId);
    if (target) select.current(target);
  };

  const pointerActivate = (id: string, event: React.PointerEvent) => {
    const { x, y } = pointer.current;
    if (event.clientX === x && event.clientY === y) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (id !== activeId) setPinned(id);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      run();
    } else if (event.key === "Escape") {
      event.preventDefault();
      dismiss.current?.();
    }
  };

  return { query, setQuery, results, activeId, listRef, onKeyDown, pointerActivate, run };
}

export function CommandPalette({
  items,
  onSelect,
  onDismiss,
  open,
  placeholder = "Jump to a section, project, or link",
  emptyLabel = "No match",
  maxRows = 7,
}: {
  items: CommandItem[];
  onSelect: (item: CommandItem) => void;
  onDismiss: () => void;
  open: boolean;
  placeholder?: string;
  emptyLabel?: string;
  maxRows?: number;
}) {
  const uid = useId();
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);

  const { query, setQuery, results, activeId, listRef, onKeyDown, pointerActivate, run } =
    useCommandPalette({ items, onSelect, onDismiss });

  const rows = Math.max(1, Math.min(maxRows, items.length));
  const height = 10 + rows * 38 + (rows - 1) * 2;
  const count = results.length;

  useEffect(() => setHost(document.body), []);

  useEffect(() => {
    if (open) {
      setQuery("");
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [open, setQuery]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = overflow;
    };
  }, [open]);

  // Plain conditional mount rather than an AnimatePresence exit: this is a
  // full-screen click-catching overlay, so it must be removed from the DOM
  // (and its pointer-events with it) the instant it closes — not whenever a
  // (possibly interrupted) exit animation eventually finishes.
  if (!host || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-modal flex items-start justify-center pt-[14vh] px-4">
      <div
        aria-hidden
        onPointerDown={onDismiss}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-[30rem] overflow-hidden rounded-xl border border-border-strong bg-surface shadow-deep"
        initial={reduced ? false : { opacity: 0, scale: 0.97, y: 8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: reduced ? { duration: 0 } : CELL,
        }}
      >
            <div className="flex h-12 items-center gap-2.5 border-b border-border px-4">
              <Search className="size-[14px] shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-label="Command palette"
                aria-expanded
                aria-controls={`${uid}-list`}
                aria-autocomplete="list"
                aria-activedescendant={activeId ? `${uid}-${activeId}` : undefined}
                autoComplete="off"
                spellCheck={false}
                value={query}
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                className="h-full min-w-0 flex-1 bg-transparent font-mono text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <span className="shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9.5px] tabular text-muted-foreground">
                esc
              </span>
            </div>

            <div className="relative" style={{ height }}>
              <ul
                ref={listRef}
                id={`${uid}-list`}
                role="listbox"
                aria-label="Commands"
                onMouseDown={(e) => e.preventDefault()}
                className="absolute inset-0 flex flex-col gap-0.5 overflow-y-auto overscroll-contain p-1.5"
              >
                {results.map((item) => {
                  const active = item.id === activeId;
                  return (
                    <motion.li
                      key={item.id}
                      id={`${uid}-${item.id}`}
                      role="option"
                      aria-selected={active}
                      layout={reduced ? false : "position"}
                      transition={CELL}
                      onPointerMove={(e) => pointerActivate(item.id, e)}
                      onClick={() => run(item)}
                      className="relative flex h-9 shrink-0 cursor-default items-center rounded-md px-3"
                    >
                      <motion.span
                        aria-hidden
                        initial={false}
                        animate={{ opacity: active ? 1 : 0 }}
                        transition={reduced ? { duration: 0 } : CROSSFADE}
                        className="absolute inset-0 rounded-md bg-accent/10 ring-1 ring-accent/25"
                      />
                      <span className="relative flex min-w-0 flex-1 items-center gap-2.5">
                        <span className="truncate font-mono text-[12.5px] text-foreground">
                          {item.label}
                        </span>
                        {item.hint && (
                          <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            {item.hint}
                          </span>
                        )}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>

              {count === 0 && (
                <p className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center font-mono text-[12px] text-muted-foreground">
                  {emptyLabel}
                </p>
              )}
            </div>
      </motion.div>
    </div>,
    host
  );
}

export default CommandPalette;
