import { Clock } from "lucide-react";

type GHEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: Array<{ message: string }> };
};

async function fetchLatestCommit() {
  try {
    const res = await fetch(
      "https://api.github.com/users/Tanny28/events/public",
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-tanmay",
        },
      }
    );
    if (!res.ok) return null;
    const events: GHEvent[] = await res.json();
    const push = events.find((e) => e.type === "PushEvent");
    if (!push) return null;
    return {
      repo: push.repo.name.replace("Tanny28/", ""),
      message: push.payload?.commits?.[0]?.message?.split("\n")[0] ?? "",
      time: push.created_at,
    };
  } catch {
    return null;
  }
}

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default async function GitHubTicker() {
  const commit = await fetchLatestCommit();
  if (!commit) return null;

  const fresh = Date.now() - new Date(commit.time).getTime() < 3_600_000;

  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
      <span
        className={`size-1.5 rounded-full ${fresh ? "bg-accent animate-pulse" : "bg-muted-foreground/50"}`}
      />
      <span>Last commit:</span>
      <a
        href={`https://github.com/Tanny28/${commit.repo}`}
        target="_blank"
        rel="noreferrer"
        className="text-foreground/70 hover:text-accent transition-colors"
      >
        {commit.repo}
      </a>
      {commit.message && (
        <span className="text-foreground/40 max-w-[180px] truncate hidden sm:block">
          · &ldquo;{commit.message}&rdquo;
        </span>
      )}
      <span className="inline-flex items-center gap-1 shrink-0">
        <Clock className="size-3" />
        {timeAgo(commit.time)}
      </span>
    </div>
  );
}
