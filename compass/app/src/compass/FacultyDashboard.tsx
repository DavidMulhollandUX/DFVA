import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { programReportPath } from "./reportLinks";
import { facultySlug } from "./faculty";
import { FACULTY_OUTCOMES, type FacultyOutcome } from "./facultyOutcomes";
import {
  facultyRows,
  itemAverages,
  needsAttention,
  quickWins,
  toIndexEntryShape,
  v4PortfolioRows,
  type FacultyRow,
  type V4PortfolioRow,
} from "./v4/portfolioStats";
import { QUADRANTS } from "./v2/quadrants";
import { V4StatusBadge } from "./v4/V4StatusBadge";
import {
  Building2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";

function gateFails(r: V4PortfolioRow): boolean {
  return r.gates?.G1 === "not-met" || r.gates?.G2 === "not-met";
}

// ---------------------------------------------------------------------------
// Per-faculty detail view (rendered when /insights/faculty/:facultySlug matches)
// ---------------------------------------------------------------------------
function FacultyDetail({
  summary,
  programs,
}: {
  summary: FacultyRow;
  programs: V4PortfolioRow[];
}) {
  const assessed = programs.filter((p) => p.assessed);
  const unassessed = programs.filter((p) => !p.assessed);
  const sorted = [...assessed].sort(
    (a, b) => (b.adaptiveness ?? -1) - (a.adaptiveness ?? -1),
  );
  const wins = quickWins(programs);
  const atRisk = programs.filter(
    (p) => p.position === "attention" || gateFails(p),
  );
  const adaptiveAvgs = itemAverages(programs).filter(
    (a) => a.subscale === "adaptive",
  );
  const workplaceAvgs = itemAverages(programs).filter(
    (a) => a.subscale === "workplace",
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link
        to="/insights/faculty"
        className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> All faculties
      </Link>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-foreground flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Building2 className="text-primary h-8 w-8" />
            {summary.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            {summary.total} program{summary.total !== 1 ? "s" : ""}
            {summary.assessed < summary.total
              ? ` — ${summary.assessed} assessed, ${
                  summary.total - summary.assessed
                } research (not scored)`
              : " assessed"}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">
            {summary.avgAdaptiveness === null
              ? "—"
              : summary.avgAdaptiveness.toFixed(1)}
            <span className="text-muted-foreground text-base font-normal">
              /15
            </span>
          </div>
          <div className="text-muted-foreground text-xs">avg. adaptiveness</div>
        </div>
      </div>

      {/* position distribution + item profile */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Position distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(
                [
                  "well-positioned",
                  "comfortable",
                  "sheltered",
                  "attention",
                ] as const
              ).map((pos) => {
                const c = summary.positions[pos];
                const cfg = QUADRANTS[pos];
                return (
                  <div key={pos}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className={c > 0 ? "" : "text-muted-foreground"}>
                        {cfg.desc}
                      </span>
                      <span className="font-medium">
                        {c}{" "}
                        <span className="text-muted-foreground text-xs">
                          (
                          {summary.assessed
                            ? Math.round((c / summary.assessed) * 100)
                            : 0}
                          %)
                        </span>
                      </span>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${
                            summary.assessed ? (c / summary.assessed) * 100 : 0
                          }%`,
                          backgroundColor: cfg.hex,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Curriculum profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3 text-xs">
              Weakest shared capability:{" "}
              <span className="text-foreground font-medium">
                {summary.weakestItem ?? "—"}
              </span>
            </p>
            {[
              ["Adaptive items (/15)", adaptiveAvgs],
              ["Workplace items (/9)", workplaceAvgs],
            ].map(([groupLabel, bars]) => (
              <div key={groupLabel as string} className="mt-3 first:mt-0">
                <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase">
                  {groupLabel as string}
                </p>
                <div className="space-y-1.5">
                  {(bars as ReturnType<typeof itemAverages>).map((d) => (
                    <div key={d.id} className="flex items-center gap-2">
                      <span className="text-muted-foreground w-32 shrink-0 truncate text-[11px]">
                        {d.label}
                      </span>
                      <span className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                        <span
                          className="bg-secondary block h-full rounded-full"
                          style={{ width: `${(d.avg / 3) * 100}%` }}
                        />
                      </span>
                      <span className="w-7 text-right text-[11px] font-semibold tabular-nums">
                        {d.avg.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* quick wins / at-risk callouts */}
      {(wins.length > 0 || atRisk.length > 0) && (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {wins.length > 0 && (
            <div className="border-border rounded-lg border bg-emerald-50 p-4 dark:bg-emerald-900/10">
              <div className="mb-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                Highest-leverage changes
              </div>
              <div className="text-muted-foreground text-sm">
                {wins
                  .map((p) => `${p.name} (${p.adaptiveness}/15)`)
                  .join(" · ")}
              </div>
            </div>
          )}
          {atRisk.length > 0 && (
            <div className="border-border rounded-lg border bg-red-50 p-4 dark:bg-red-900/10">
              <div className="mb-1 text-sm font-semibold text-red-800 dark:text-red-300">
                Needs attention
              </div>
              <div className="text-muted-foreground text-sm">
                {atRisk
                  .map(
                    (p) => `${p.name}${gateFails(p) ? " (gate failure)" : ""}`,
                  )
                  .join(" · ")}
              </div>
            </div>
          )}
        </div>
      )}

      {/* programs table */}
      <div className="border-border overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border bg-muted/50 border-b">
                <th className="px-4 py-3 text-left font-semibold">Program</th>
                <th className="px-3 py-3 text-center font-semibold">
                  Position
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  Adaptiveness
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  Workplace
                </th>
                <th className="px-3 py-3 text-center font-semibold">Gates</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr
                  key={p.code}
                  className="border-border hover:bg-muted/30 border-b transition-colors last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-3 py-3 text-center">
                    <V4StatusBadge entry={toIndexEntryShape(p)} />
                  </td>
                  <td className="px-3 py-3 text-center tabular-nums">
                    {p.adaptiveness}/15
                  </td>
                  <td className="px-3 py-3 text-center tabular-nums">
                    {p.workplace}/9
                  </td>
                  <td className="px-3 py-3 text-center text-xs">
                    {gateFails(p) ? (
                      <span className="text-red-600 dark:text-red-400">
                        {p.gates?.G1 === "not-met" ? "G1 " : ""}
                        {p.gates?.G2 === "not-met" ? "G2 " : ""}
                        failed
                      </span>
                    ) : (
                      <span className="text-muted-foreground">met</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Link
                      to={programReportPath(p.code)}
                      className="text-primary inline-flex items-center gap-1 text-xs hover:underline"
                    >
                      Report <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
              {unassessed.map((p) => (
                <tr
                  key={p.code}
                  className="border-border hover:bg-muted/30 border-b opacity-70 transition-colors last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-3 py-3 text-center" colSpan={4}>
                    <span className="text-muted-foreground text-xs italic">
                      Not assessed — research degree
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Link
                      to={programReportPath(p.code)}
                      className="text-primary inline-flex items-center gap-1 text-xs hover:underline"
                    >
                      Report <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {FACULTY_OUTCOMES[summary.name] && (
        <GraduateOutcomes outcome={FACULTY_OUTCOMES[summary.name]} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Graduate-outcome evidence (UoM Job Insights) — shared by faculty detail views
// ---------------------------------------------------------------------------
function Chips({
  items,
  tone = "muted",
}: {
  items: string[];
  tone?: "muted" | "primary";
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((x) => (
        <span
          key={x}
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
            tone === "primary"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {x}
        </span>
      ))}
    </div>
  );
}

// Render the **bold** spans the briefing narratives carry, as plain text otherwise.
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-foreground font-semibold">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function GraduateOutcomes({ outcome }: { outcome: FacultyOutcome }) {
  const reclassifiers = outcome.reclass.filter((r) => r.reclassifies);
  return (
    <div className="mt-10">
      <h2 className="text-foreground mb-1 flex items-center gap-2 text-xl font-bold tracking-tight">
        <GraduationCap className="text-primary h-5 w-5" />
        Graduate outcomes
      </h2>
      <p className="text-muted-foreground mb-5 text-sm">
        Real destinations of{" "}
        <span className="text-foreground font-semibold">
          {outcome.alumni.toLocaleString()} alumni
        </span>{" "}
        across {outcome.reports} UoM Job Insights reports (LiveAlumni,
        2015–2025).
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="text-muted-foreground h-4 w-4" />
            Destination read
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <RichText text={outcome.destinationRead} />
          </p>
        </CardContent>
      </Card>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="text-muted-foreground h-4 w-4" />
              Top employers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chips items={outcome.employers} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skills in use</CardTitle>
          </CardHeader>
          <CardContent>
            <Chips items={outcome.skills} tone="primary" />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Roles by career stage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-muted-foreground mb-1.5 text-[11px] font-bold tracking-wider uppercase">
              Entry (0–1 yr)
            </p>
            <Chips items={outcome.entryRoles} />
          </div>
          <div>
            <p className="text-muted-foreground mb-1.5 text-[11px] font-bold tracking-wider uppercase">
              Early–mid (1–2 yr)
            </p>
            <Chips items={outcome.earlyRoles} />
          </div>
        </CardContent>
      </Card>

      {outcome.reclass.length > 0 && (
        <div className="border-border mb-6 rounded-lg border bg-emerald-50/60 p-4 dark:bg-emerald-900/10">
          <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <ArrowUpRight className="h-4 w-4" />
            Outcome-evidence uplift
            {reclassifiers.length > 0 && (
              <span className="text-muted-foreground text-xs font-normal">
                — {reclassifiers.length} reclassif
                {reclassifiers.length === 1 ? "ies" : "y"} risk band
              </span>
            )}
          </div>
          <p className="text-muted-foreground mb-3 text-xs">
            Programmes whose{" "}
            <span className="text-foreground font-medium">
              D10 Outcome Evidence
            </span>{" "}
            rose on the Job Insights destination evidence — applied to the
            registry scores in the July 2026 re-scoring (v1 methodology,
            archived).
          </p>
          <div className="space-y-1.5">
            {outcome.reclass.map((r) => (
              <div
                key={r.program}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <span className="font-medium">{r.program}</span>
                <span className="text-muted-foreground tabular-nums">
                  {r.current} → {r.projected}/36
                </span>
                {r.reclassifies ? (
                  <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {r.fromBand} → {r.toBand}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">
                    {r.toBand}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="text-muted-foreground h-4 w-4" />
            What this means
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2.5 pl-4">
            {outcome.recommendations.map((rec, i) => (
              <li
                key={i}
                className="text-muted-foreground pl-1 text-sm leading-relaxed"
              >
                <RichText text={rec} />
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

// Faculties with graduate-outcome data but no DFVA-scored programs
function OutcomeOnlyDetail({
  name,
  outcome,
}: {
  name: string;
  outcome: FacultyOutcome;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link
        to="/insights/faculty"
        className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> All faculties
      </Link>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h1 className="text-foreground flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Building2 className="text-primary h-8 w-8" />
          {name}
        </h1>
        <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-[11px] font-medium">
          Graduate outcomes only
        </span>
      </div>
      <p className="text-muted-foreground">
        No DFVA-assessed programmes in this faculty — the graduate-outcome
        evidence below is the DFVA-relevant data the University currently holds
        for it.
      </p>
      <GraduateOutcomes outcome={outcome} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// All-faculty comparison (default /insights/faculty view)
// ---------------------------------------------------------------------------
export default function FacultyDashboard() {
  const { facultySlug: selectedSlug } = useParams<{ facultySlug: string }>();

  const rows = useMemo(() => v4PortfolioRows(), []);
  const summaries = useMemo(() => facultyRows(rows), [rows]);
  const byFaculty = useMemo(() => {
    const m = new Map<string, V4PortfolioRow[]>();
    for (const r of rows) {
      const list = m.get(r.faculty) ?? [];
      list.push(r);
      m.set(r.faculty, list);
    }
    return m;
  }, [rows]);
  const c3Avg = useMemo(() => {
    const assessed = rows.filter((r) => r.assessed);
    const scores = assessed.map((r) => r.items?.C3 ?? 0);
    return scores.length
      ? scores.reduce((s, v) => s + v, 0) / scores.length
      : 0;
  }, [rows]);

  const selected = selectedSlug
    ? summaries.find((f) => facultySlug(f.name) === selectedSlug)
    : undefined;
  if (selected)
    return (
      <FacultyDetail
        summary={selected}
        programs={byFaculty.get(selected.name) ?? []}
      />
    );

  // Outcome-only faculties: graduate-outcome data but no DFVA-scored programs
  const dfvaNames = new Set(summaries.map((f) => f.name));
  const outcomeOnlyNames = Object.keys(FACULTY_OUTCOMES).filter(
    (n) => !dfvaNames.has(n),
  );
  if (selectedSlug) {
    const ooName = outcomeOnlyNames.find(
      (n) => facultySlug(n) === selectedSlug,
    );
    if (ooName)
      return (
        <OutcomeOnlyDetail name={ooName} outcome={FACULTY_OUTCOMES[ooName]} />
      );
  }

  const totalAssessed = summaries.reduce((s, f) => s + f.assessed, 0);
  const weightedAvg =
    summaries.reduce((s, f) => s + (f.avgAdaptiveness ?? 0) * f.assessed, 0) /
    Math.max(1, totalAssessed);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link
        to="/insights"
        className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Insights
      </Link>
      <div className="mb-10">
        <h1 className="text-foreground flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Building2 className="text-primary h-8 w-8" />
          Faculty comparison
        </h1>
        <p className="text-muted-foreground mt-2">
          DFVA v4 performance across all faculties. Select a faculty to drill
          into its programs.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Faculties represented
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              University average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weightedAvg.toFixed(1)}
              <span className="text-muted-foreground text-sm font-normal">
                /15
              </span>
            </div>
            <div className="text-muted-foreground text-xs">
              adaptiveness, weighted by assessed programs
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Digital & AI literacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {c3Avg.toFixed(1)}{" "}
              <span className="text-muted-foreground text-sm font-normal">
                / 3
              </span>
            </div>
            <div className="text-muted-foreground text-xs">
              university-wide average, item C3
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty table */}
      <div className="border-border overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border bg-muted/50 border-b">
                <th className="px-4 py-3 text-left font-semibold">Faculty</th>
                <th className="px-3 py-3 text-center font-semibold">
                  Programs
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  Avg. exposure
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  Avg. adaptiveness
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  Attention
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  Gate failures
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Weakest capability
                </th>
              </tr>
            </thead>
            <tbody>
              {summaries.map((f) => (
                <tr
                  key={f.name}
                  className="border-border hover:bg-muted/30 border-b transition-colors"
                >
                  <td className="px-4 py-3 font-medium">
                    <Link
                      to={`/insights/faculty/${facultySlug(f.name)}`}
                      className="hover:text-primary inline-flex items-center gap-1 transition-colors"
                    >
                      {f.name} <ArrowRight className="h-3 w-3 opacity-50" />
                    </Link>
                  </td>
                  <td className="text-muted-foreground px-3 py-3 text-center">
                    {f.total}
                    {f.assessed < f.total && (
                      <span className="text-xs"> ({f.assessed} assessed)</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center tabular-nums">
                    {f.avgExposure === null ? "—" : f.avgExposure.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 text-center tabular-nums">
                    {f.avgAdaptiveness === null
                      ? "—"
                      : `${f.avgAdaptiveness.toFixed(1)}/15`}
                  </td>
                  <td className="px-3 py-3 text-center">
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
                  <td className="px-3 py-3 text-center">
                    {f.gateFailures > 0 ? (
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {f.gateFailures}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {f.weakestItem ? (
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                        <span className="text-xs">{f.weakestItem}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {outcomeOnlyNames.length > 0 && (
        <div className="mt-6">
          <p className="text-muted-foreground mb-2 text-xs">
            Graduate-outcome data only (no DFVA-assessed programmes):
          </p>
          <div className="flex flex-wrap gap-2">
            {outcomeOnlyNames.map((n) => (
              <Link
                key={n}
                to={`/insights/faculty/${facultySlug(n)}`}
                className="border-border bg-card hover:border-primary/40 inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors"
              >
                {n}{" "}
                <span className="text-muted-foreground text-xs">
                  ({FACULTY_OUTCOMES[n].reports} reports)
                </span>
                <ArrowRight className="h-3 w-3 opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
