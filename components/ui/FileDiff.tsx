// Row model adapted from "File Diff" by @kvnkld on 21st.dev; styling rebuilt
// against this project's tokens. Add/remove hues are functional diff semantics,
// not brand accents — kept desaturated to sit inside the graphite palette.

export type DiffRow = {
  old: number | null;
  cur: number | null;
  type: "ctx" | "add" | "del";
  text: string;
};

const TONE: Record<DiffRow["type"], string> = {
  add: "bg-[rgba(125,168,125,0.07)] text-[#8fba8f]",
  del: "bg-[rgba(198,95,75,0.07)] text-[#d0796a]",
  ctx: "text-foreground/55",
};

export default function FileDiff({
  file,
  rows,
  caption,
}: {
  file: string;
  rows: DiffRow[];
  caption?: string;
}) {
  const added = rows.filter((r) => r.type === "add").length;
  const removed = rows.filter((r) => r.type === "del").length;

  return (
    <figure className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-border">
        <span className="font-mono text-[11.5px] text-foreground/80 truncate">
          {file}
        </span>
        <span className="font-mono text-[11px] tabular shrink-0 flex gap-2">
          <span className="text-[#8fba8f]">+{added}</span>
          <span className="text-[#d0796a]">−{removed}</span>
        </span>
      </div>

      <div className="font-mono text-[12px] leading-[1.75] overflow-x-auto">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`grid grid-cols-[2.25rem_2.25rem_1rem_1fr] ${TONE[r.type]}`}
          >
            <span className="text-right pr-2 text-muted-foreground/45 tabular select-none">
              {r.old ?? ""}
            </span>
            <span className="text-right pr-2 text-muted-foreground/45 tabular select-none">
              {r.cur ?? ""}
            </span>
            <span className="select-none">
              {r.type === "add" ? "+" : r.type === "del" ? "−" : ""}
            </span>
            <code className="whitespace-pre pr-4">{r.text}</code>
          </div>
        ))}
      </div>

      {caption && (
        <figcaption className="px-4 py-2.5 border-t border-border font-mono text-[10.5px] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
