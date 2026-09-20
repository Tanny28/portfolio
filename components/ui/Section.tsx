import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  meta?: string;
  children: ReactNode;
  /** Extra bottom breathing room for sections that end a visual run. */
  tail?: boolean;
};

/**
 * Asymmetric section shell: a sticky left rail carries the section label
 * while content occupies the wider right column. Vertical padding is
 * optically weighted — more below than above.
 */
export default function Section({
  id,
  label,
  meta,
  children,
  tail,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-6 lg:px-10 pt-24 lg:pt-28 ${
        tail ? "pb-36 lg:pb-44" : "pb-28 lg:pb-36"
      }`}
    >
      <div className="mx-auto max-w-[78rem] grid lg:grid-cols-12 gap-y-8 lg:gap-x-12">
        {/* Left rail — sticky label */}
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-4">
            <h2 className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent whitespace-nowrap">
              {label}
            </h2>
            <span
              className="h-px flex-1 lg:w-16 lg:flex-none rule-fade"
              aria-hidden
            />
            {meta && (
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground lg:mt-1">
                {meta}
              </span>
            )}
          </div>
        </div>

        {/* Content column */}
        <div className="lg:col-span-9 min-w-0">{children}</div>
      </div>
    </section>
  );
}
