import { useMemo } from "react";
import { brand } from "../../branding/brandConfig";
import { Link, useSearchParams } from "react-router";
import { ArrowRight, Search, X } from "lucide-react";
import { Card, CardContent } from "../../client/components/ui/card";
import { PageShell } from "../../client/components/PageShell";
import { QUADRANTS } from "../v2/quadrants";
import { programReportPath } from "../reportLinks";
import { hasReportContent } from "../reportContent/index";
import {
  V4_ADAPTIVENESS_MAX,
  V4_INSTRUMENT,
  V4_WORKPLACE_MAX,
} from "./data/v4Rubric";
import { REPORT_INDEX, type ReportIndexEntry } from "./reportIndex";
import { V4StatusBadge } from "./V4StatusBadge";
import { V4_QUADRANT_LABELS } from "./v4Position";
import { V4_TIER_LABELS } from "./exposureBasis";

const STATUS_FILTERS = ["all", "current", "archived", "research"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];
const isStatusFilter = (v: string | null): v is StatusFilter =>
  (STATUS_FILTERS as readonly string[]).includes(v ?? "");

const LEVEL_LABELS: Record<string, string> = {
  bachelor: "Bachelor",
  master: "Master",
  "graduate-certificate": "Graduate certificate",
  "graduate-diploma": "Graduate diploma",
  doctorate: "Doctorate",
  other: "Other",
};

/** Sort keys the index offers. The vocabulary deliberately matches
 *  `portfolioStats.SortKey` so /reports and /insights name the same orderings,
 *  but the comparator is local: that module sorts `V4PortfolioRow`, and
 *  adapting rows into that shape and back costs more than the comparator. */
type SortKey = "name" | "exposure" | "adaptiveness" | "workplace";
const SORT_LABELS: Record<SortKey, string> = {
  name: "Name (A–Z)",
  exposure: "Exposure (highest first)",
  adaptiveness: "Adaptiveness (lowest first)",
  workplace: "Workplace (lowest first)",
};
const isSortKey = (v: string | null): v is SortKey =>
  Object.keys(SORT_LABELS).includes(v ?? "");

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
            <p
              className="text-muted-foreground mt-0.5 text-[11px]"
              data-testid="card-institution"
            >
              {entry.institution}
            </p>
          </div>
          <V4StatusBadge entry={entry} />
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
            Research degrees are examined on an original contribution rather
            than a taught curriculum, and no graduate destination data is
            published for them, so a {brand.signalName} does not apply.{" "}
            {research
              ? "The report explains why and carries the earlier assessment in full."
              : "Its earlier assessment and market intelligence stand as its report."}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Not yet scored on the v4 instrument. The report page holds the
            archived earlier assessment until a v4 score is published.
          </p>
        )}

        <Link
          to={programReportPath(entry.code)}
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

/** A removable chip for one active filter. */
function FilterChip({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <button
      onClick={onClear}
      className="border-border bg-card-accent text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      data-testid="filter-chip"
    >
      {label}
      <X className="h-3 w-3" />
    </button>
  );
}

export default function V4ReportsPage() {
  // Filters live in the URL (same pattern as /insights) so back-navigation,
  // reload and shared links keep them. "all" and "" are the defaults and are
  // not written, so the plain /reports URL stays clean.
  const [params, setParams] = useSearchParams();
  const search = params.get("q") ?? "";
  const university = params.get("university") ?? "all";
  const faculty = params.get("faculty") ?? "all";
  const level = params.get("level") ?? "all";
  const rawStatus = params.get("status");
  const status: StatusFilter = isStatusFilter(rawStatus) ? rawStatus : "all";
  const position = params.get("position") ?? "all";
  const rawSort = params.get("sort");
  const sort: SortKey = isSortKey(rawSort) ? rawSort : "name";
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    // Changing a filter changes what the list means, so start from the top.
    window.scrollTo({ top: 0 });
    setParams(next, { replace: true });
  };
  const clearParams = () => setParams({}, { replace: true });

  // Facet options are counted over the whole index so a reader can see how much
  // sits behind an option before choosing it.
  const universities = useMemo(() => {
    const counts = new Map<string, { slug: string; n: number }>();
    for (const e of REPORT_INDEX) {
      const c = counts.get(e.institution) ?? { slug: e.institutionSlug, n: 0 };
      c.n += 1;
      counts.set(e.institution, c);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  // Faculty is a University of Melbourne concept (faculty.ts maps names onto
  // UoM's nine official faculties), so the facet only appears when the view is
  // Melbourne — either explicitly, or because Melbourne is all there is.
  const melbourneOnly = useMemo(
    () => REPORT_INDEX.every((e) => e.institutionSlug === "unimelb"),
    [],
  );
  const showFaculty = melbourneOnly || university === "unimelb";

  const faculties = useMemo(
    () =>
      [
        ...new Set(
          REPORT_INDEX.filter(
            (e) => e.institutionSlug === "unimelb" && e.faculty,
          ).map((e) => e.faculty),
        ),
      ].sort(),
    [],
  );

  const levels = useMemo(
    () => [...new Set(REPORT_INDEX.map((e) => e.level))].sort(),
    [],
  );

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matched = REPORT_INDEX.filter(
      (e) =>
        (!q ||
          e.name.toLowerCase().includes(q) ||
          e.code.toLowerCase().includes(q)) &&
        (university === "all" || e.institutionSlug === university) &&
        (!showFaculty || faculty === "all" || e.faculty === faculty) &&
        (level === "all" || e.level === level) &&
        (status === "all" || e.status === status) &&
        (position === "all" || e.position === position),
    );
    // A program with no score must never lead a numeric sort: an unscored
    // program is not a zero, and "least adaptive first" would otherwise open
    // with the programs that have no adaptiveness at all.
    const missingLast = (a: number | null, b: number | null) =>
      Number(a === null) - Number(b === null);
    const sorted = [...matched];
    if (sort === "exposure")
      // Highest first: most exposed is the one worth reading about.
      sorted.sort(
        (a, b) =>
          missingLast(a.exposure, b.exposure) ||
          (b.exposure ?? 0) - (a.exposure ?? 0),
      );
    else if (sort === "adaptiveness" || sort === "workplace")
      // Lowest first: least adaptive is the one needing attention.
      sorted.sort(
        (a, b) =>
          missingLast(a[sort], b[sort]) || (a[sort] ?? 0) - (b[sort] ?? 0),
      );
    return sorted;
  }, [search, university, faculty, level, status, position, sort, showFaculty]);

  const currentCount = REPORT_INDEX.filter(
    (e) => e.status === "current",
  ).length;
  const hasFilters =
    search ||
    university !== "all" ||
    faculty !== "all" ||
    level !== "all" ||
    status !== "all" ||
    position !== "all";
  const selectClass =
    "border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm";

  const institutionLabel = (slug: string) =>
    universities.find(([, v]) => v.slug === slug)?.[0] ?? slug;

  return (
    <PageShell>
      <div className="mb-8">
        <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
          Durability Reports · Panel C {V4_INSTRUMENT}
        </p>
        <h1 className="text-foreground font-serif text-4xl tracking-tight">
          Program reports
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl text-sm">
          {currentCount} of {REPORT_INDEX.length} programs
          {universities.length > 1
            ? ` across ${universities.length} universities`
            : ""}{" "}
          carry a current Durability Report on the v4 instrument. The rest hold
          an archived earlier assessment until they are scored on v4; every
          archived report stays linked from its program page.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="border-border bg-background flex min-w-[240px] flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <Search className="text-muted-foreground h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setParam("q", e.target.value)}
            placeholder="Search program or code"
            className="text-foreground w-full bg-transparent outline-none"
            aria-label="Search programs"
          />
        </label>
        {universities.length > 1 && (
          <select
            value={university}
            onChange={(e) => setParam("university", e.target.value)}
            className={selectClass}
            aria-label="University"
          >
            <option value="all">All universities</option>
            {universities.map(([name, { slug, n }]) => (
              <option key={slug} value={slug}>
                {name} ({n})
              </option>
            ))}
          </select>
        )}
        <select
          value={status}
          onChange={(e) => setParam("status", e.target.value)}
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
          onChange={(e) => setParam("position", e.target.value)}
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
          value={level}
          onChange={(e) => setParam("level", e.target.value)}
          className={selectClass}
          aria-label="Level"
        >
          <option value="all">All levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>
              {LEVEL_LABELS[l] ?? l}
            </option>
          ))}
        </select>
        {showFaculty && (
          <select
            value={faculty}
            onChange={(e) => setParam("faculty", e.target.value)}
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
        )}
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className={selectClass}
          aria-label="Sort by"
        >
          {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
            <option key={k} value={k}>
              {SORT_LABELS[k]}
            </option>
          ))}
        </select>
        <span
          className="text-muted-foreground ml-auto text-xs"
          data-testid="report-count"
        >
          {rows.length} program{rows.length === 1 ? "" : "s"}
        </span>
      </div>

      {hasFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {search && (
            <FilterChip
              label={`Search: ${search}`}
              onClear={() => setParam("q", "")}
            />
          )}
          {university !== "all" && (
            <FilterChip
              label={institutionLabel(university)}
              onClear={() => setParam("university", "all")}
            />
          )}
          {status !== "all" && (
            <FilterChip
              label={`Status: ${status}`}
              onClear={() => setParam("status", "all")}
            />
          )}
          {position !== "all" && (
            <FilterChip
              label={
                QUADRANTS[position as keyof typeof QUADRANTS]?.short ?? position
              }
              onClear={() => setParam("position", "all")}
            />
          )}
          {level !== "all" && (
            <FilterChip
              label={LEVEL_LABELS[level] ?? level}
              onClear={() => setParam("level", "all")}
            />
          )}
          {showFaculty && faculty !== "all" && (
            <FilterChip
              label={faculty}
              onClear={() => setParam("faculty", "all")}
            />
          )}
          <button
            onClick={clearParams}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs underline"
          >
            Clear all
          </button>
        </div>
      )}

      {rows.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center text-sm">
          No programs match these filters.{" "}
          {search
            ? `Try clearing the search term "${search}".`
            : "Try widening the university or status filter."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((e) => (
            <ReportCard key={e.code} entry={e} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
