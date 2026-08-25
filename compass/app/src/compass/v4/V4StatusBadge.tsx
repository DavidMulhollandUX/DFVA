import { QUADRANTS } from "../v2/quadrants";
import { V4_QUADRANT_LABELS } from "./v4Position";
import type { ReportIndexEntry } from "./reportIndex";

/** One status badge shared by both v4 surfaces (/reports cards and the
 *  insights table): current programs carry their position chip, research
 *  degrees and archived programs carry an honest absence label. Extracted
 *  verbatim from V4ReportsPage — the three data-testid values are load-bearing
 *  for e2e tests and must not change. */
export function V4StatusBadge({ entry }: { entry: ReportIndexEntry }) {
  if (entry.status === "research") {
    return (
      <span
        className="bg-muted text-muted-foreground shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap"
        title="Panel C v4 scores taught curriculum; research degrees have none to score"
        data-testid="status-research"
      >
        Research degree · v4 n/a
      </span>
    );
  }
  if (entry.status === "archived") {
    return (
      <span
        className="bg-muted text-muted-foreground shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap"
        data-testid="status-archived"
      >
        v4 pending · v1 archived
      </span>
    );
  }
  const q = entry.position ? QUADRANTS[entry.position] : null;
  return (
    <span
      className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${
        q ? q.badgeClass : "bg-muted text-muted-foreground"
      }`}
      title={entry.position ? V4_QUADRANT_LABELS[entry.position] : undefined}
      data-testid="status-current"
    >
      {q ? q.short : "No exposure data"}
    </span>
  );
}
