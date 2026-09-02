import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowRight, Search, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { PageShell } from "../../client/components/PageShell";
import { MethodGlossary } from "../MethodGlossary";
import { SourceReferences } from "../SourceReferences";
import { facultySlug } from "../faculty";
import { programReportPath } from "../reportLinks";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { PortfolioMatrixV4 } from "./components/PortfolioMatrixV4";
import { V4StatusBadge } from "./V4StatusBadge";
import {
  DEFAULT_SORT,
  POSITION_ORDER,
  ITEM_IDS,
  facultyRows,
  gateFailures,
  itemAverages,
  lastVerifiedAt,
  needsAttention,
  positionCounts,
  quickWins,
  sortRows,
  thresholdTieCount,
  toIndexEntryShape,
  v4PortfolioRows,
  type SortDir,
  type SortKey,
  type V4PortfolioRow,
} from "./portfolioStats";
import { V4_ADAPTIVENESS_MAX, V4_INSTRUMENT } from "./data/v4Rubric";
import { V4_META } from "./data/v4PanelC";
import { QUADRANTS, type QuadrantConfig } from "../v2/quadrants";

const POSITION_MEANING: Record<string, string> = {
  "well-positioned":
    "Graduates enter highly exposed occupations, and the curriculum builds the defences that matter. The strongest footing in the portfolio.",
  comfortable:
    "Less-exposed destinations, with an adaptive curriculum already in place. Position to protect, not a problem to solve.",
  sheltered:
    "Less-exposed destinations, but few curriculum defences built yet. Safe for now; vulnerable if those destinations shift.",
  attention:
    "Graduates enter highly exposed occupations without the curriculum defences their peers have. The clearest case for intervention.",
};

/** The sortable columns. Labels double as aria-sort announcements. */
const COLUMNS: {
  key: SortKey;
  label: string;
  numeric?: boolean;
}[] = [
  { key: "name", label: "Program" },
  { key: "faculty", label: "Faculty" },
  { key: "position", label: "Position" },
  { key: "exposure", label: "Exposure", numeric: true },
  {
    key: "adaptiveness",
    label: `Adaptiveness /${V4_ADAPTIVENESS_MAX}`,
    numeric: true,
  },
  { key: "workplace", label: "Workplace /9", numeric: true },
  { key: "g1", label: "G1 · Disciplinary foundation" },
  { key: "g2", label: "G2 · Decision-making" },
];

const SORT_KEYS = new Set(COLUMNS.map((c) => c.key));

function SectionHeading({
  id,
  title,
  blurb,
}: {
  id: string;
  title: string;
  blurb: string;
}) {
  return (
    <div id={id} className="mt-12 mb-5 scroll-mt-6 first:mt-0">
      <h2 className="text-foreground font-serif text-2xl tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">{blurb}</p>
    </div>
  );
}

function ProgramLink({ row }: { row: V4PortfolioRow }) {
  return (
    <Link
      to={programReportPath(row.code)}
      className="hover:text-primary transition-colors"
    >
      {row.name}
    </Link>
  );
}

const GATE_LABEL: Record<string, string> = {
  met: "Met",
  "not-met": "Not met",
  unrecorded: "Not recorded",
};

function GateCell({ state }: { state: string }) {
  return (
    <span
      className={
        state === "met"
          ? "text-band-resilient text-xs"
          : state === "not-met"
            ? "text-band-critical text-xs font-medium"
            : "text-muted-foreground text-xs"
      }
      title={
        state === "not-met"
          ? "Gate failure — flags the program regardless of its item scores"
          : undefined
      }
    >
      ● {GATE_LABEL[state]}
    </span>
  );
}

function thClass() {
  return "text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.14em] whitespace-nowrap uppercase";
}

export default function V4InsightsPage() {
  const [params, setParams] = useSearchParams();

  const stats = useMemo(() => {
    const rows = v4PortfolioRows();
    const assessed = rows.filter((r) => r.assessed);
    const averages = itemAverages(rows);
    const adaptive = averages.filter((a) => a.subscale === "adaptive");
    const workplace = averages.filter((a) => a.subscale === "workplace");
    const sortedAdaptive = [...adaptive].sort((a, b) => a.avg - b.avg);
    return {
      rows,
      assessed,
      research: rows.filter((r) => r.unassessedReason === "research"),
      archived: rows.filter((r) => r.unassessedReason === "archived"),
      adaptiveBars: adaptive,
      workplaceBars: workplace,
      weakestAdaptive: sortedAdaptive[0],
      strongestAdaptive: sortedAdaptive[sortedAdaptive.length - 1],
      positions: positionCounts(rows),
      quickWins: quickWins(rows),
      attentionList: needsAttention(rows),
      faculties: facultyRows(rows),
      gates: gateFailures(rows),
      atThreshold: thresholdTieCount(rows),
      verified: lastVerifiedAt(rows),
    };
  }, []);

  // ---- URL-backed state, validated against the known key sets ------------
  const sortKey = SORT_KEYS.has(params.get("sort") as SortKey)
    ? (params.get("sort") as SortKey)
    : DEFAULT_SORT.key;
  const sortDir: SortDir =
    params.get("dir") === "asc" || params.get("dir") === "desc"
      ? (params.get("dir") as SortDir)
      : DEFAULT_SORT.dir;
  const facultyFilter =
    params.get("faculty") &&
    stats.faculties.some((f) => f.name === params.get("faculty"))
      ? (params.get("faculty") as string)
      : null;
  const showItems = params.get("items") === "1";
  const search = params.get("q") ?? "";

  // One update per interaction: two consecutive setParam calls both start
  // from the same render's params, so the second silently drops the first
  // (the sort header did exactly that and lost "sort" while setting "dir").
  const patchParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }
    setParams(next, { replace: true });
  };
  const setParam = (key: string, value: string | null) =>
    patchParams({ [key]: value });
  const clearParams = () => setParams({}, { replace: true });

  // ---- Filtering ---------------------------------------------------------
  const q = search.trim().toLowerCase();
  const filtered = stats.rows.filter(
    (r) =>
      (!q ||
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q)) &&
      (!facultyFilter || r.faculty === facultyFilter),
  );
  const filteredAssessed = filtered.filter((r) => r.assessed);
  const filteredUnassessed = filtered.filter((r) => !r.assessed);
  const tableAssessed = sortRows(filteredAssessed, sortKey, sortDir);

  const totalAssessed = stats.assessed.length;
  const attentionCount = stats.positions.attention;

  const exampleProgram =
    stats.attentionList[0] ?? stats.gates[0] ?? stats.assessed[0];

  const ariaSortFor = (key: SortKey): "ascending" | "descending" | "none" =>
    key === sortKey ? (sortDir === "asc" ? "ascending" : "descending") : "none";

  return (
    <InsightsGate>
      <PageShell>
        {/* ---------- Hero ---------- */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · Panel C {V4_INSTRUMENT}
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            Portfolio overview
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed">
            Each program sits on two axes: how much its graduates' destination
            occupations overlap with what AI can do, and how well its curriculum
            builds the capabilities that hold up under that overlap.{" "}
            <strong className="text-foreground font-medium">
              Exposure is not risk
            </strong>{" "}
            — it measures task overlap, not replacement. A program whose
            graduates enter highly exposed occupations, and whose curriculum
            already builds adaptive capability, is in the strongest position on
            this page, not the weakest.
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            {totalAssessed} programs scored on the current instrument, every one
            placed on the map. {stats.research.length} research degrees are
            listed separately because Panel C scores taught curriculum, which a
            research degree does not have.
          </p>
        </div>

        {/* ---------- What we found ---------- */}
        <SectionHeading
          id="findings"
          title="What the portfolio shows"
          blurb="The things a reader should take away before looking at any chart."
        />
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <p className="text-sm">
                  <span className="font-medium">
                    {attentionCount} of {totalAssessed} programs
                  </span>{" "}
                  send graduates into highly exposed occupations without the
                  curriculum defences their peers have built. These are the
                  clearest candidates for intervention.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm">
                  <span className="font-medium">
                    {stats.weakestAdaptive.short} is the portfolio's weakest
                    capability
                  </span>{" "}
                  at an average of {stats.weakestAdaptive.avg.toFixed(1)} out of
                  3 ({stats.weakestAdaptive.label}) — the single item where a
                  coordinated response would move the most programs.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <p className="text-sm">
                  <span className="font-medium">
                    {stats.quickWins.length} exposed programs sit one curriculum
                    point below the median
                  </span>{" "}
                  — a single item improvement moves each of them into a stronger
                  position.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">
                    {stats.atThreshold} of {totalAssessed} programs sit exactly
                    on the adaptiveness median
                  </span>{" "}
                  — their quadrant placement depends on a single curriculum
                  item, so treat those positions as approximate and read the
                  actual scores. Exposure, by contrast, is a direct measurement,
                  not a rating, so there is no equivalent "just over the line"
                  caveat on that axis.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm">
                  <span className="font-medium">
                    {stats.gates.length} of {totalAssessed} fail a precondition
                  </span>{" "}
                  —{" "}
                  {stats.gates.filter((r) => r.gates?.G1 === "not-met").length}{" "}
                  on disciplinary foundation,{" "}
                  {stats.gates.filter((r) => r.gates?.G2 === "not-met").length}{" "}
                  on decision-making, none on both. A gate failure flags a
                  program regardless of its item scores, and{" "}
                  {
                    stats.gates.filter(
                      (r) => r.position !== null && r.position !== "attention",
                    ).length
                  }{" "}
                  sit in the adaptive half where the position badge gives no
                  hint.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Position distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Where the {totalAssessed} programs sit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {POSITION_ORDER.map((pos) => {
                  const count = stats.positions[pos];
                  const cfg: QuadrantConfig = QUADRANTS[pos];
                  return (
                    <div key={pos}>
                      <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
                        <span className="font-medium">{cfg.desc}</span>
                        <span className="shrink-0 font-medium">
                          {count}{" "}
                          <span className="text-muted-foreground text-xs">
                            ({Math.round((count / totalAssessed) * 100)}%)
                          </span>
                        </span>
                      </div>
                      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / totalAssessed) * 100}%`,
                            backgroundColor: cfg.hex,
                          }}
                        />
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                        {POSITION_MEANING[pos]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curriculum profile + priority lists */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Curriculum capability across all {totalAssessed} programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2 text-xs">
                Average of each item, scored 0–3 from handbook evidence, in two
                sub-scales that are never averaged across: the five adaptive
                items (summing to /{V4_ADAPTIVENESS_MAX}) and the three
                workplace items (summing to /9). Strongest adaptive:{" "}
                <span className="text-foreground font-medium">
                  {stats.strongestAdaptive.label} (
                  {stats.strongestAdaptive.avg.toFixed(1)})
                </span>{" "}
                · Weakest:{" "}
                <span className="text-foreground font-medium">
                  {stats.weakestAdaptive.label} (
                  {stats.weakestAdaptive.avg.toFixed(1)})
                </span>
              </p>
              {[
                [
                  `Adaptive items (/${V4_ADAPTIVENESS_MAX})`,
                  stats.adaptiveBars,
                ],
                ["Workplace items (/9)", stats.workplaceBars],
              ].map(([groupLabel, bars]) => (
                <div key={groupLabel as string} className="mt-4 first:mt-2">
                  <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-[0.14em] uppercase">
                    {groupLabel as string}
                  </p>
                  <div className="space-y-2">
                    {(bars as ReturnType<typeof itemAverages>).map((d) => (
                      <div key={d.id} className="flex items-center gap-3">
                        <span className="text-muted-foreground w-40 shrink-0 truncate text-xs">
                          {d.label}
                        </span>
                        <span className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                          <span
                            className="bg-secondary block h-full rounded-full"
                            style={{ width: `${(d.avg / 3) * 100}%` }}
                          />
                        </span>
                        <span className="w-12 text-right text-xs font-semibold tabular-nums">
                          {d.avg.toFixed(1)}/3
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="border-emerald-200 dark:border-emerald-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Highest-leverage changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-xs">
                  Exposed programs exactly one curriculum point below the
                  published median — a single item improvement changes their
                  position.
                </p>
                {stats.quickWins.length ? (
                  <ul className="space-y-1.5">
                    {stats.quickWins.map((r) => (
                      <li
                        key={r.code}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <ProgramLink row={r} />
                        <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                          {r.adaptiveness}/{V4_ADAPTIVENESS_MAX} · weakest:{" "}
                          {itemAverages(stats.rows).find(
                            (a) =>
                              a.id ===
                              ITEM_IDS.reduce(
                                (weakest, id) =>
                                  ((r.items as Record<string, number>)[id] ??
                                    Infinity) <
                                  ((r.items as Record<string, number>)[
                                    weakest
                                  ] ?? Infinity)
                                    ? id
                                    : weakest,
                                ITEM_IDS[0],
                              ),
                          )?.short ?? "—"}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No program sits one point below the median.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-orange-200 dark:border-orange-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Most exposed, least defended
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-xs">
                  Highly exposed destinations with the fewest curriculum
                  defences built so far.
                </p>
                <ul className="space-y-1.5">
                  {stats.attentionList.map((r) => (
                    <li
                      key={r.code}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <ProgramLink row={r} />
                      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {r.adaptiveness}/{V4_ADAPTIVENESS_MAX} · exposure{" "}
                        {(r.exposure ?? 0).toFixed(0)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* New gate-failures card, replacing the retired near-threshold
                bullet: a failure flags regardless of item scores. */}
            <Card className="border-red-200 dark:border-red-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Preconditions not met
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-xs">
                  A gate failure flags a program regardless of its item scores —
                  some sit in the adaptive half, where the position badge gives
                  no hint.
                </p>
                <ul className="space-y-1.5">
                  {stats.gates.map((r) => (
                    <li
                      key={r.code}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <ProgramLink row={r} />
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {[
                          r.gates?.G1 === "not-met"
                            ? "disciplinary foundation"
                            : null,
                          r.gates?.G2 === "not-met" ? "decision-making" : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ---------- The matrix ---------- */}
        <SectionHeading
          id="matrix"
          title="Portfolio map"
          blurb="Each dot is a program. Horizontal position shows how exposed its graduates' occupations are to AI; vertical position shows how adaptive its curriculum is. Hover for scores, select to open the full report, or filter by faculty to compare one group against the rest."
        />
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setParam("faculty", null)}
                data-testid="chip-all"
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  facultyFilter === null
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                All faculties ({stats.rows.length})
              </button>
              {stats.faculties.map((f) => (
                <button
                  key={f.name}
                  onClick={() =>
                    setParam(
                      "faculty",
                      facultyFilter === f.name ? null : f.name,
                    )
                  }
                  data-testid={`chip-${facultySlug(f.name)}`}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                    facultyFilter === f.name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {f.assessed === f.total
                    ? `${f.name} (${f.assessed})`
                    : `${f.name} (${f.assessed} of ${f.total})`}
                </button>
              ))}
            </div>
            <PortfolioMatrixV4 rows={filtered} activeFaculty={facultyFilter} />
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              The dividing lines are the portfolio medians — exposure{" "}
              {V4_META.expMedian} against which most values are placed, and{" "}
              {V4_META.expMedianField} for the field-grain values — and
              adaptiveness {V4_META.adaptMedian} of 15. Every position is
              relative to this portfolio at this assessment, not an absolute
              grade and not comparable across institutions. Dot size encodes the
              workplace sub-score; observed adaptiveness spans 3–11 while the
              axis stays fixed at 0–15 so this figure and the report-page figure
              stay comparable.
            </p>
          </CardContent>
        </Card>

        {/* ---------- Faculty comparison ---------- */}
        <SectionHeading
          id="faculties"
          title="How faculties compare"
          blurb="Each faculty's average position and its weakest shared capability. Select a faculty for its graduate-outcome detail."
        />
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {[
                      "Faculty",
                      "Programs",
                      "Avg. exposure",
                      "Avg. adaptiveness",
                      "Needing attention",
                      "Gate failures",
                      "Weakest capability",
                    ].map((h) => (
                      <th key={h} className={thClass()}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.faculties.map((f) => (
                    <tr
                      key={f.name}
                      className="border-border hover:bg-card-accent border-b"
                    >
                      <td className="px-3 py-2 font-medium">
                        <Link
                          to={`/insights/faculty/${facultySlug(f.name)}`}
                          className="hover:text-primary inline-flex items-center gap-1 transition-colors"
                        >
                          {f.name}
                          <ArrowRight className="h-3 w-3 opacity-50" />
                        </Link>
                      </td>
                      <td className="text-muted-foreground px-3 py-2">
                        {f.total}
                        {f.assessed < f.total && (
                          <span className="text-xs">
                            {" "}
                            ({f.assessed} assessed)
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {f.avgExposure === null
                          ? "—"
                          : f.avgExposure.toFixed(1)}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {f.avgAdaptiveness === null
                          ? "—"
                          : `${f.avgAdaptiveness.toFixed(
                              1,
                            )}/${V4_ADAPTIVENESS_MAX}`}
                      </td>
                      <td className="px-3 py-2">
                        {f.positions.attention > 0 ? (
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${QUADRANTS.attention.badgeClass}`}
                          >
                            {f.positions.attention}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {f.gateFailures > 0 ? (
                          <span className="text-band-critical font-medium">
                            {f.gateFailures}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="text-muted-foreground px-3 py-2">
                        {f.weakestItem ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ---------- All programs ---------- */}
        <SectionHeading
          id="programs"
          title={
            facultyFilter
              ? `${facultyFilter} programs`
              : `All ${stats.rows.length} programs`
          }
          blurb="Position, curriculum scores by name, and both preconditions. Select a program for its full report. Eight more item columns sit behind Show item scores."
        />
        <Card>
          <CardContent className="pt-6">
            {/* Filter chrome, modelled on V4ReportsPage */}
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
              <button
                onClick={() => setParam("items", showItems ? null : "1")}
                aria-pressed={showItems}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  showItems
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }`}
                data-testid="toggle-items"
              >
                Show item scores
              </button>
              {(search || facultyFilter || showItems) && (
                <button
                  onClick={clearParams}
                  className="text-muted-foreground flex items-center gap-1 text-xs underline"
                >
                  <X className="h-3 w-3" /> Clear
                </button>
              )}
              <span
                className="text-muted-foreground ml-auto text-xs"
                data-testid="row-count"
              >
                {filtered.length} row{filtered.length === 1 ? "" : "s"} ·{" "}
                {filteredAssessed.length} assessed
              </span>
            </div>

            {/* One live region announces both sorting and filtering outcomes. */}
            <p aria-live="polite" className="sr-only" data-testid="sort-status">
              Sorted by {COLUMNS.find((c) => c.key === sortKey)?.label},{" "}
              {sortDir === "asc" ? "ascending" : "descending"}. Showing{" "}
              {filtered.length} rows, {filteredUnassessed.length} unassessed
              pinned last.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">
                  All programs with their v4 durability scores, sortable by any
                  column. Unassessed programs are listed last under their own
                  heading.
                </caption>
                <thead>
                  <tr>
                    {COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        aria-sort={ariaSortFor(col.key)}
                        className={`${thClass()} ${
                          col.numeric ? "tabular-nums" : ""
                        }`}
                      >
                        <button
                          onClick={() => {
                            if (sortKey === col.key)
                              setParam(
                                "dir",
                                sortDir === "asc" ? "desc" : "asc",
                              );
                            else patchParams({ sort: col.key, dir: "asc" });
                          }}
                          className="hover:text-foreground inline-flex items-center gap-1 tracking-[0.14em] uppercase"
                        >
                          {col.label}
                          <span aria-hidden="true" className="text-[9px]">
                            {sortKey === col.key
                              ? sortDir === "asc"
                                ? "▲"
                                : "▼"
                              : ""}
                          </span>
                        </button>
                      </th>
                    ))}
                    {showItems &&
                      ITEM_IDS.map((id) => (
                        <th key={id} scope="col" className={thClass()}>
                          {id}
                        </th>
                      ))}
                  </tr>
                </thead>
                {/* Assessed rows: sorted by the active comparator. */}
                <tbody>
                  {tableAssessed.map((r) => (
                    <tr
                      key={r.code}
                      className="border-border/40 hover:bg-card-accent border-b"
                      data-testid="program-row"
                      data-code={r.code}
                      data-assessed="true"
                    >
                      <td className="px-3 py-1.5 font-medium whitespace-nowrap">
                        <ProgramLink row={r} />
                      </td>
                      <td className="text-muted-foreground px-3 py-1.5 whitespace-nowrap">
                        {r.faculty}
                      </td>
                      <td className="px-3 py-1.5">
                        <V4StatusBadge entry={toIndexEntryShape(r)} />
                      </td>
                      <td className="relative px-3 py-1.5 tabular-nums">
                        {r.exposure === null ? "—" : r.exposure.toFixed(0)}
                        {r.exposureTierLabel && !r.ownRecord && (
                          <span
                            aria-hidden="true"
                            className="text-muted-foreground ml-1 text-[10px]"
                            title={`Exposure ${r.exposureTierLabel} — an estimate, not this program's own graduates`}
                          >
                            ◌
                          </span>
                        )}
                      </td>
                      <td className="relative px-3 py-1.5 whitespace-nowrap tabular-nums">
                        {r.adaptiveness}/{V4_ADAPTIVENESS_MAX}
                        {r.atThreshold && (
                          <span
                            aria-hidden="true"
                            className="border-muted-foreground absolute top-1/2 right-1 hidden h-3 w-px border-l md:inline-block"
                            title="Exactly on the median — one item decides the quadrant"
                          />
                        )}
                      </td>
                      <td className="px-3 py-1.5 tabular-nums">
                        {r.workplace === null ? "—" : `${r.workplace}/9`}
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <GateCell state={r.gates?.G1 ?? "unrecorded"} />
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        <GateCell state={r.gates?.G2 ?? "unrecorded"} />
                      </td>
                      {showItems &&
                        ITEM_IDS.map((id) => (
                          <td key={id} className="px-3 py-1.5 tabular-nums">
                            {(() => {
                              const score = (r.items as Record<string, number>)[
                                id
                              ];
                              return Number.isFinite(score) ? score : "—";
                            })()}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
                {/* Unassessed rows: a separate group pinned last under EVERY
                    sort. Structural, not a comparator clamp. */}
                {(filteredUnassessed.length > 0 || !!facultyFilter) && (
                  <>
                    {filteredUnassessed.length > 0 && (
                      <tbody>
                        <tr>
                          <th
                            scope="rowgroup"
                            colSpan={
                              COLUMNS.length + (showItems ? ITEM_IDS.length : 0)
                            }
                            className="text-muted-foreground bg-muted/30 border-border px-3 py-2 text-left text-xs font-semibold tracking-wide uppercase"
                          >
                            Not assessed — research degree
                          </th>
                        </tr>
                        {filteredUnassessed.map((r) => (
                          <tr
                            key={r.code}
                            className="border-border/40 hover:bg-card-accent border-b opacity-75"
                            data-testid="program-row"
                            data-code={r.code}
                            data-assessed="false"
                          >
                            <td className="px-3 py-1.5 font-medium whitespace-nowrap">
                              <ProgramLink row={r} />
                            </td>
                            <td className="text-muted-foreground px-3 py-1.5 whitespace-nowrap">
                              {r.faculty}
                            </td>
                            <td className="px-3 py-1.5" colSpan={6}>
                              <span
                                className="text-muted-foreground text-xs italic"
                                title="Panel C v4 scores taught curriculum; research degrees have none to score"
                                data-testid="not-assessed-label"
                              >
                                Not assessed — research degree
                              </span>
                            </td>
                            {showItems &&
                              ITEM_IDS.map((id) => (
                                <td
                                  key={id}
                                  className="text-muted-foreground px-3 py-1.5"
                                >
                                  —
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </>
                )}
              </table>
              {filtered.length === 0 && (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  No programs match these filters.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ---------- Method ---------- */}
        <SectionHeading
          id="method"
          title="How to read this"
          blurb="Every term used above, and every source the numbers come from."
        />
        <MethodGlossary
          terms={[
            "destinationExposure",
            "aioe",
            "adaptivenessV4",
            "workplace",
            "exposureBasisTier",
            "gatesV4",
            "medianQuadrant",
            "jir",
            "crosswalk",
            "jsaHeo",
          ]}
        />
        <SourceReferences
          sources={[
            "felten2021",
            "aioeAppendix",
            "jirDataset",
            "onetSoc",
            "handbook",
            "dfvaRubricV4",
            "teqsaAdaptive",
            "jsaHeoData",
          ]}
        />

        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>
            Evidura · Panel C {V4_INSTRUMENT} · Panel A basis v
            {V4_META.panelABasisVersion} · scoring last verified{" "}
            {stats.verified ?? "not yet verified"}
          </span>
          <span className="flex gap-4">
            {exampleProgram && (
              <Link
                to={programReportPath(exampleProgram.code)}
                className="underline"
              >
                Example program report ({exampleProgram.name})
              </Link>
            )}
            <Link to="/insights/faculty" className="underline">
              Faculty comparison and graduate outcomes
            </Link>
          </span>
        </div>
      </PageShell>
    </InsightsGate>
  );
}
