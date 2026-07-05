import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { PROGRAMS, type ProgramReport } from "./sharedProgramData";
import { getFaculty, facultySlug } from "./faculty";
import { FACULTY_OUTCOMES, type FacultyOutcome } from "./facultyOutcomes";
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

const DIM_LABELS = [
  "Automation Exposure",
  "Systems Thinking",
  "Technical Depth",
  "Decision-Making",
  "AI Literacy",
  "Domain Depth",
  "Research Rigour",
  "Human & Relational",
  "Curriculum Currency",
  "Outcome Evidence",
  "Irreplaceability (bonus)",
];

interface FacultyStats {
  name: string;
  count: number;
  avgScore: number;
  minScore: number;
  maxScore: number;
  bands: Record<string, number>;
  dimAvgs: Record<string, number>;
  weakestDim: string;
  weakestAvg: number;
  strongestDim: string;
  strongestAvg: number;
  programs: ProgramReport[];
}

function computeFacultyStats(): FacultyStats[] {
  const groups: Record<string, ProgramReport[]> = {};
  for (const p of PROGRAMS) {
    const f = getFaculty(p.program);
    if (!groups[f]) groups[f] = [];
    groups[f].push(p);
  }

  return Object.entries(groups)
    .map(([name, programs]) => {
      const avgScore =
        programs.reduce((s, p) => s + p.score, 0) / programs.length;

      const bands: Record<string, number> = {};
      for (const p of programs) {
        bands[p.riskBand] = (bands[p.riskBand] || 0) + 1;
      }

      const dimAvgs: Record<string, number> = {};
      for (const dim of DIM_LABELS) {
        const scores = programs.map(
          (p) => p.dimensions.find((d) => d.label === dim)?.score ?? 0,
        );
        dimAvgs[dim] = scores.reduce((s, v) => s + v, 0) / scores.length;
      }

      const entries = Object.entries(dimAvgs);
      const weakest = entries.reduce((a, b) => (a[1] < b[1] ? a : b));
      const strongest = entries.reduce((a, b) => (a[1] > b[1] ? a : b));

      return {
        name,
        programs,
        count: programs.length,
        avgScore,
        minScore: Math.min(...programs.map((p) => p.score)),
        maxScore: Math.max(...programs.map((p) => p.score)),
        bands,
        dimAvgs,
        weakestDim: weakest[0],
        weakestAvg: weakest[1],
        strongestDim: strongest[0],
        strongestAvg: strongest[1],
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore);
}

function scoreColor(score: number): string {
  if (score >= 24) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 20) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function scoreBg(score: number): string {
  if (score >= 24) return "bg-emerald-50 dark:bg-emerald-900/20";
  if (score >= 20) return "bg-yellow-50 dark:bg-yellow-900/20";
  return "bg-red-50 dark:bg-red-900/20";
}

const riskBandStyles: Record<string, string> = {
  RESILIENT:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "MODERATE RISK":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "HIGH RISK":
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  CRITICAL: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};
function dimBar(avg: number): string {
  const pct = avg / 3;
  if (pct >= 0.83) return "bg-emerald-500";
  if (pct >= 0.5) return "bg-yellow-500";
  return "bg-red-500";
}

// ---------------------------------------------------------------------------
// Per-faculty detail view (rendered when /insights/faculty/:facultySlug matches)
// ---------------------------------------------------------------------------
function FacultyDetail({ f }: { f: FacultyStats }) {
  const programs = [...f.programs].sort((a, b) => b.score - a.score);
  const nearThreshold = programs.filter((p) => p.score >= 26 && p.score < 28);
  const atRisk = programs.filter(
    (p) => p.riskBand === "HIGH RISK" || p.riskBand === "CRITICAL",
  );
  const dims = DIM_LABELS.map((l) => ({ label: l, avg: f.dimAvgs[l] })).sort(
    (a, b) => a.avg - b.avg,
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
            {f.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            {f.count} program{f.count !== 1 ? "s" : ""} assessed · range{" "}
            {f.minScore}–{f.maxScore}/36
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${scoreColor(f.avgScore)}`}>
            {f.avgScore.toFixed(1)}
            <span className="text-muted-foreground text-base font-normal">
              /36
            </span>
          </div>
          <div className="text-muted-foreground text-xs">faculty average</div>
        </div>
      </div>

      {/* band distribution + strength/gap */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  label: "RESILIENT",
                  color: "bg-emerald-500",
                  text: "text-emerald-700 dark:text-emerald-300",
                },
                {
                  label: "MODERATE RISK",
                  color: "bg-yellow-500",
                  text: "text-yellow-700 dark:text-yellow-300",
                },
                {
                  label: "HIGH RISK",
                  color: "bg-orange-500",
                  text: "text-orange-700 dark:text-orange-300",
                },
                {
                  label: "CRITICAL",
                  color: "bg-red-500",
                  text: "text-red-700 dark:text-red-300",
                },
              ].map((b) => {
                const c = f.bands[b.label] || 0;
                return (
                  <div key={b.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span
                        className={c > 0 ? b.text : "text-muted-foreground"}
                      >
                        {b.label}
                      </span>
                      <span className="font-medium">
                        {c}{" "}
                        <span className="text-muted-foreground text-xs">
                          ({Math.round((c / f.count) * 100)}%)
                        </span>
                      </span>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className={`h-full rounded-full ${b.color}`}
                        style={{ width: `${(c / f.count) * 100}%` }}
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
            <CardTitle className="text-base">Dimension profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3 text-xs">
              Strongest:{" "}
              <span className="text-foreground font-medium">
                {f.strongestDim} ({f.strongestAvg.toFixed(1)})
              </span>{" "}
              · Weakest:{" "}
              <span className="text-foreground font-medium">
                {f.weakestDim} ({f.weakestAvg.toFixed(1)})
              </span>
            </p>
            <div className="space-y-1.5">
              {dims.map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="text-muted-foreground w-32 shrink-0 truncate text-[11px]">
                    {d.label}
                  </span>
                  <span className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                    <span
                      className={`block h-full rounded-full ${dimBar(d.avg)}`}
                      style={{ width: `${(d.avg / 3) * 100}%` }}
                    />
                  </span>
                  <span className="w-7 text-right text-[11px] font-semibold tabular-nums">
                    {d.avg.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* near-threshold / at-risk callouts */}
      {(nearThreshold.length > 0 || atRisk.length > 0) && (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {nearThreshold.length > 0 && (
            <div className="border-border rounded-lg border bg-emerald-50 p-4 dark:bg-emerald-900/10">
              <div className="mb-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                Closest to RESILIENT
              </div>
              <div className="text-muted-foreground text-sm">
                {nearThreshold
                  .map(
                    (p) => `${p.program} (${p.score}, ${28 - p.score} to go)`,
                  )
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
                  .map((p) => `${p.program} (${p.score}, ${p.riskBand})`)
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
                <th className="px-3 py-3 text-center font-semibold">Score</th>
                <th className="px-3 py-3 text-center font-semibold">Band</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Weakest dimensions
                </th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => {
                const weak = [...p.dimensions]
                  .sort((a, b) => a.score - b.score)
                  .slice(0, 2)
                  .map((d) => d.label)
                  .join(", ");
                return (
                  <tr
                    key={p.assessmentSlug}
                    className="border-border hover:bg-muted/30 border-b transition-colors last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{p.program}</td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${scoreColor(
                          p.score,
                        )} ${scoreBg(p.score)}`}
                      >
                        {p.score}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          riskBandStyles[p.riskBand]
                        }`}
                      >
                        {p.riskBand}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-4 py-3 text-xs">
                      {weak}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <Link
                        to={`/reports/${p.assessmentSlug}`}
                        className="text-primary inline-flex items-center gap-1 text-xs hover:underline"
                      >
                        Report <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {FACULTY_OUTCOMES[f.name] && (
        <GraduateOutcomes outcome={FACULTY_OUTCOMES[f.name]} />
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
            registry scores in the July 2026 re-scoring.
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

// Faculties with graduate-outcome data but no DFVA-scored programs (e.g. Fine Arts & Music)
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
  const faculties = useMemo(() => computeFacultyStats(), []);
  const aiLiteracyAvg = useMemo(() => {
    const scores = PROGRAMS.map(
      (p) => p.dimensions.find((d) => d.label === "AI Literacy")?.score ?? 0,
    );
    return scores.reduce((s, v) => s + v, 0) / scores.length;
  }, []);

  const selected = selectedSlug
    ? faculties.find((f) => facultySlug(f.name) === selectedSlug)
    : undefined;
  if (selected) return <FacultyDetail f={selected} />;

  // Outcome-only faculties: graduate-outcome data but no DFVA-scored programs (e.g. Fine Arts & Music)
  const dfvaNames = new Set(faculties.map((f) => f.name));
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-foreground flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Building2 className="text-primary h-8 w-8" />
          Faculty Comparison
        </h1>
        <p className="text-muted-foreground mt-2">
          DFVA performance across all faculties. Select a faculty to drill into
          its programs.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Faculties Assessed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              University Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                faculties.reduce((s, f) => s + f.avgScore * f.count, 0) /
                faculties.reduce((s, f) => s + f.count, 0)
              ).toFixed(1)}
            </div>
            <div className="text-muted-foreground text-xs">
              weighted by program count
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              AI Literacy Gap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {aiLiteracyAvg.toFixed(1)}{" "}
              <span className="text-muted-foreground text-sm font-normal">
                / 3
              </span>
            </div>
            <div className="text-muted-foreground text-xs">
              university-wide average
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
                  Avg Score
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  RESILIENT
                </th>
                <th className="px-3 py-3 text-center font-semibold">
                  MODERATE
                </th>
                <th className="px-3 py-3 text-center font-semibold">HIGH</th>
                <th className="px-3 py-3 text-center font-semibold">
                  CRITICAL
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Weakest Dimension
                </th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((f) => (
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
                    {f.count}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${scoreColor(
                        f.avgScore,
                      )} ${scoreBg(f.avgScore)}`}
                    >
                      {f.avgScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    {f.bands["RESILIENT"] ? (
                      <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        {f.bands["RESILIENT"]}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {f.bands["MODERATE RISK"] ? (
                      <span className="inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        {f.bands["MODERATE RISK"]}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {f.bands["HIGH RISK"] ? (
                      <span className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        {f.bands["HIGH RISK"]}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {f.bands["CRITICAL"] ? (
                      <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        {f.bands["CRITICAL"]}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs">{f.weakestDim}</span>
                      <span className="text-muted-foreground text-xs">
                        ({f.weakestAvg.toFixed(1)})
                      </span>
                    </div>
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
