import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search, X } from "lucide-react";
import { Card, CardContent } from "../../client/components/ui/card";
import { QUADRANTS } from "../v2/quadrants";
import { programReportPath } from "../reportLinks";
import { hasReportContent } from "../reportContent/index";
import {
  V4_ADAPTIVENESS_MAX,
  V4_INSTRUMENT,
  V4_WORKPLACE_MAX,
} from "./data/v4Rubric";
import { REPORT_INDEX, type ReportIndexEntry } from "./reportIndex";
import { V4_QUADRANT_LABELS } from "./v4Position";
import { V4_TIER_LABELS } from "./exposureBasis";

type StatusFilter = "all" | "current" | "archived" | "research";

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-[10px] font-semibold tracking-[0.14em] uppercase">
        {label}
      </p>
      <p className="text-foreground font-mono text-sm">{value}</p>
      {hint && (
        <p
          className="text-muted-foreground text-[10px] leading-tight"
          data-testid="exposure-basis"
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function StatusBadge({ entry }: { entry: ReportIndexEntry }) {
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

/** Research degrees have a report of their own (dfva-v4r-<code>) rather than
 *  only the archived v1 workspace. The card links it directly when it exists,
 *  and falls back to the v1 report for any research degree not yet authored. */
function v4rSlug(code: string): string | null {
  const slug = `dfva-v4r-${code}`;
  return hasReportContent(slug) ? slug : null;
}

function ReportCard({ entry }: { entry: ReportIndexEntry }) {
  const current = entry.status === "current";
  const research = entry.status === "research" ? v4rSlug(entry.code) : null;
  return (
    <Card data-testid="report-card" data-status={entry.status}>
      <CardContent className="flex flex-col gap-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-muted-foreground font-mono text-[11px] uppercase">
              {entry.code}
              {entry.faculty ? ` · ${entry.faculty}` : ""}
            </p>
            <h2 className="text-foreground font-serif text-lg leading-snug tracking-tight">
              {entry.name}
            </h2>
          </div>
          <StatusBadge entry={entry} />
        </div>

        {current ? (
          <div className="grid grid-cols-3 gap-3">
            <Stat
              label="Exposure"
              value={entry.exposure !== null ? entry.exposure.toFixed(1) : "—"}
              hint={
                entry.exposureTier
                  ? V4_TIER_LABELS[entry.exposureTier]
                  : undefined
              }
            />
            <Stat
              label="Adaptiveness"
              value={`${entry.adaptiveness}/${V4_ADAPTIVENESS_MAX}`}
            />
            <Stat
              label="Workplace"
              value={
                entry.workplace !== null
                  ? `${entry.workplace}/${V4_WORKPLACE_MAX}`
                  : "—"
              }
            />
          </div>
        ) : entry.status === "research" ? (
          <p className="text-muted-foreground text-sm">
            Panel C v4 scores taught curriculum, which this research degree does
            not carry, and Panel A resolves to no destination basis for it, so
            no v4 score of any kind applies.{" "}
            {research
              ? "Its research degree report sets out why, and carries the earlier assessment as narrative."
              : "Its archived v1 assessment and market intelligence stand as its report."}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Not yet scored on the v4 instrument. The report page holds the
            archived earlier assessment until a v4 score is published.
          </p>
        )}

        <Link
          to={research ? `/reports/${research}` : programReportPath(entry.code)}
          className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-semibold transition-colors ${
            current
              ? "bg-secondary/10 hover:bg-secondary/20 border-secondary/40 text-foreground"
              : "border-border text-muted-foreground hover:bg-card-accent"
          }`}
          data-testid="durability-report-link"
        >
          <span>
            {current
              ? "Durability Report"
              : research
                ? "Research degree report"
                : "Report · archived v1"}
          </span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}

export default function V4ReportsPage() {
  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [position, setPosition] = useState("all");

  const faculties = useMemo(
    () =>
      [...new Set(REPORT_INDEX.map((e) => e.faculty).filter(Boolean))].sort(),
    [],
  );

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return REPORT_INDEX.filter(
      (e) =>
        (!q ||
          e.name.toLowerCase().includes(q) ||
          e.code.toLowerCase().includes(q)) &&
        (faculty === "all" || e.faculty === faculty) &&
        (status === "all" || e.status === status) &&
        (position === "all" || e.position === position),
    );
  }, [search, faculty, status, position]);

  const currentCount = REPORT_INDEX.filter(
    (e) => e.status === "current",
  ).length;
  const hasFilters =
    search || faculty !== "all" || status !== "all" || position !== "all";
  const selectClass =
    "border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
          Durability Reports · Panel C {V4_INSTRUMENT}
        </p>
        <h1 className="text-foreground font-serif text-4xl tracking-tight">
          Program reports
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl text-sm">
          {currentCount} of {REPORT_INDEX.length} University of Melbourne
          programs carry a current Durability Report on the v4 instrument. The
          rest hold an archived earlier assessment until they are scored on v4;
          every archived report stays linked from its program page.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="border-border bg-background flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <Search className="text-muted-foreground h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search program or code"
            className="text-foreground w-full bg-transparent outline-none"
            aria-label="Search programs"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className={selectClass}
          aria-label="Status"
        >
          <option value="all">All statuses</option>
          <option value="current">Current (v4)</option>
          <option value="archived">Archived (v4 pending)</option>
          <option value="research">Research degree (v4 n/a)</option>
        </select>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className={selectClass}
          aria-label="Position"
        >
          <option value="all">All positions</option>
          {(
            Object.keys(
              V4_QUADRANT_LABELS,
            ) as (keyof typeof V4_QUADRANT_LABELS)[]
          ).map((k) => (
            <option key={k} value={k}>
              {QUADRANTS[k].short}
            </option>
          ))}
        </select>
        <select
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          className={selectClass}
          aria-label="Faculty"
        >
          <option value="all">All faculties</option>
          {faculties.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");
              setFaculty("all");
              setStatus("all");
              setPosition("all");
            }}
            className="text-muted-foreground flex items-center gap-1 text-xs underline"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
        <span
          className="text-muted-foreground ml-auto text-xs"
          data-testid="report-count"
        >
          {rows.length} program{rows.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((e) => (
          <ReportCard key={e.code} entry={e} />
        ))}
      </div>
      {rows.length === 0 && (
        <p className="text-muted-foreground py-16 text-center text-sm">
          No programs match these filters.
        </p>
      )}
    </div>
  );
}
