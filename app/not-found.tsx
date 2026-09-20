import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-lg space-y-6">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
          404 · no route matched
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
          This page isn&apos;t here.
        </h1>
        <p className="text-foreground/70 leading-relaxed">
          The link may be out of date, or the page was renamed. Everything
          worth reading lives on the main page.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/"
            className="pressable inline-flex items-center px-5 py-3 rounded-md bg-accent text-background font-medium text-sm hover:bg-[#ddaa63]"
          >
            Back to the portfolio
          </Link>
          <Link
            href="/#projects"
            className="pressable inline-flex items-center px-5 py-3 rounded-md border border-border text-foreground hover:border-accent/60 hover:text-accent font-medium text-sm"
          >
            See the projects
          </Link>
        </div>
      </div>
    </main>
  );
}
