import { useMemo, useState } from "react";
import { Link } from "react-router";
import { programReportPath } from "../reportLinks";
import { AlertTriangle, ArrowRight, CheckCircle2, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { MethodGlossary } from "../MethodGlossary";
import { SourceReferences } from "../SourceReferences";
import { facultySlug } from "../faculty";
import { PortfolioMatrix } from "../v3/components/PortfolioMatrix";
import {
  DIMENSION_ORDER,
  dimensionAverages,
  facultyRows,
  nearThresholdCount,
  needsAttention,
  portfolioRows,
  positionCounts,
  quickWins,
  type PortfolioRow,
} from "../v3/data/portfolioStats";
import { V3_META, V3_PROGRAMS, type V3Quadrant } from "../v3/data/v3Programs";
import { DIMENSION_LABELS, QUADRANTS } from "./quadrants";

/** Reading order for the four positions: strongest footing first. */
const POSITION_ORDER: V3Quadrant[] = [
  "well-positioned",
  "comfortable",
  "sheltered",
  "attention",
];

const POSITION_MEANING: Record<V3Quadrant, string> = {
  "well-positioned":
    "Graduates enter highly exposed occupations, and the curriculum builds the defences that matter. The strongest footing in the portfolio.",
  comfortable:
    "Less-exposed destinations, with an adaptive curriculum already in place. Position to protect, not a problem to solve.",
  sheltered:
    "Less-exposed destinations, but few curriculum defences built yet. Safe for now; vulnerable if those destinations shift.",
  attention:
    "Graduates enter highly exposed occupations without the curriculum defences their peers have. The clearest case for intervention.",
};

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

function ProgramLink({ row }: { row: PortfolioRow }) {
  return (
    <Link to={programReportPath(row.code)} className="hover:text-primary transition-colors">
      {row.name}
    </Link>
  );
}

export default function MatrixDashboardPage() {
  const [activeFaculty, setActiveFaculty] = useState<string | null>(null);

  const stats = useMemo(() => {
    const rows = portfolioRows();
    const placed = rows.filter((r) => r.placed);
    const dims = dimensionAverages(rows);
    const sortedDims = [...dims].sort((a, b) => a.avg - b.avg);
    return {
      rows,
      placed,
      dims,
      weakest: sortedDims[0],
      strongest: sortedDims[sortedDims.length - 1],
      positions: positionCounts(rows),
      quickWins: quickWins(rows),
      needsAttention: needsAttention(rows),
      faculties: facultyRows(rows),
      nearThreshold: nearThresholdCount(),
    };
  }, []);

  const faculties = useMemo(
    () => [...new Set(V3_PROGRAMS.map((p) => p.faculty))].sort(),
    [],
  );

  const tableRows = activeFaculty
    ? stats.rows.filter((r) => r.faculty === activeFaculty)
    : stats.rows;

  const attentionCount = stats.positions.attention;
  const totalPlaced = stats.placed.length;

  return (
    <InsightsGate>
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* ---------- Hero ---------- */}
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            Portfolio overview
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed">
            Every assessed program placed on two measured axes: how exposed its
            graduates' destination occupations are to AI, and how much its
            curriculum builds the capabilities that hold up under that exposure.{" "}
            <strong className="text-foreground font-medium">
              Exposure is not risk
            </strong>{" "}
            — it is task overlap. A highly exposed program with an adaptive
            curriculum is the strongest position on this page, not the weakest.
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            {V3_META.total} programs assessed · {totalPlaced} have matched
            graduate destination data and appear on the chart · the remaining{" "}
            {V3_META.total - totalPlaced} are listed with their curriculum
            scores while destination matching is completed.
          </p>
        </div>

        {/* ---------- What we found ---------- */}
        <SectionHeading
          id="findings"
          title="What the portfolio shows"
          blurb="The four things a reader should take away before looking at any chart."
        />
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <p className="text-sm">
                  <span className="font-medium">
                    {attentionCount} of {totalPlaced} placed programs
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
                    {stats.weakest.label} is the portfolio's weakest capability
                  </span>{" "}
                  at an average of {stats.weakest.avg.toFixed(1)} out of 3 — the
                  single dimension where a coordinated response would move the
                  most programs.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <p className="text-sm">
                  <span className="font-medium">
                    {stats.quickWins.length} exposed programs sit one curriculum
                    point below the portfolio median
                  </span>{" "}
                  — a single dimension improvement moves each of them into a
                  stronger position.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">
                    {stats.nearThreshold} of {totalPlaced} positions are near a
                    threshold
                  </span>{" "}
                  — close enough to a dividing line that one rating difference
                  could move them. Treat those as approximate, and read the
                  coordinates rather than the label.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Position distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Where the {totalPlaced} placed programs sit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {POSITION_ORDER.map((q) => {
                  const count = stats.positions[q];
                  return (
                    <div key={q}>
                      <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
                        <span className="font-medium">{QUADRANTS[q].desc}</span>
                        <span className="shrink-0 font-medium">
                          {count}{" "}
                          <span className="text-muted-foreground text-xs">
                            ({Math.round((count / totalPlaced) * 100)}%)
                          </span>
                        </span>
                      </div>
                      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / totalPlaced) * 100}%`,
                            backgroundColor: QUADRANTS[q].hex,
                          }}
                        />
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                        {POSITION_MEANING[q]}
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
                Curriculum capability across all {V3_META.total} programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-xs">
                Average of each dimension, scored 0–3 from handbook evidence.
                Strongest:{" "}
                <span className="text-foreground font-medium">
                  {stats.strongest.label} ({stats.strongest.avg.toFixed(1)})
                </span>{" "}
                · Weakest:{" "}
                <span className="text-foreground font-medium">
                  {stats.weakest.label} ({stats.weakest.avg.toFixed(1)})
                </span>
              </p>
              <div className="space-y-2.5">
                {stats.dims.map((d) => (
                  <div key={d.key} className="flex items-center gap-3">
                    <span className="text-muted-foreground w-32 shrink-0 text-xs">
                      {d.label}
                    </span>
                    <span className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                      <span
                        className="bg-secondary block h-full rounded-full"
                        style={{ width: `${(d.avg / 3) * 100}%` }}
                      />
                    </span>
                    <span className="w-10 text-right text-xs font-semibold tabular-nums">
                      {d.avg.toFixed(1)}/3
                    </span>
                  </div>
                ))}
              </div>
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
                  Exposed programs one curriculum point below the portfolio
                  median — a single dimension improvement changes their
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
                        <span className="text-muted-foreground shrink-0 text-xs">
                          {r.adaptiveness}/15 · weakest:{" "}
                          {
                            DIMENSION_LABELS[
                              DIMENSION_ORDER.reduce((a, b) =>
                                r.dims[a] <= r.dims[b] ? a : b,
                              )
                            ]
                          }
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No program is within one point of the median.
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
                  {stats.needsAttention.map((r) => (
                    <li
                      key={r.code}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <ProgramLink row={r} />
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {r.adaptiveness}/15 · exposure {r.exposure?.toFixed(0)}
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
          title="Every placed program on both axes"
          blurb="Hover a point for its scores; select it to open the full report. Filter by faculty to see one group against the rest of the portfolio."
        />
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFaculty(null)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  activeFaculty === null
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                All faculties ({totalPlaced})
              </button>
              {faculties.map((f) => {
                const count = V3_PROGRAMS.filter((p) => p.faculty === f).length;
                return (
                  <button
                    key={f}
                    onClick={() =>
                      setActiveFaculty(activeFaculty === f ? null : f)
                    }
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                      activeFaculty === f
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {f} ({count})
                  </button>
                );
              })}
            </div>
            <PortfolioMatrix
              programs={V3_PROGRAMS}
              activeFaculty={activeFaculty}
            />
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              The dividing lines are the portfolio medians (exposure{" "}
              {V3_META.expMedian}, adaptiveness {V3_META.adaptMedian} of 15), so
              every position is relative to this portfolio at this assessment —
              not an absolute grade, and not comparable across institutions.
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
                      "Weakest capability",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium tracking-[0.14em] whitespace-nowrap uppercase"
                      >
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
                        {f.programs}
                        {f.placed < f.programs && (
                          <span className="text-xs"> ({f.placed} placed)</span>
                        )}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {f.avgExposure === null
                          ? "—"
                          : f.avgExposure.toFixed(1)}
                      </td>
                      <td className="px-3 py-2 tabular-nums">
                        {f.avgAdaptiveness.toFixed(1)}/15
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
                      <td className="text-muted-foreground px-3 py-2">
                        {f.weakestDimension}
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
            activeFaculty
              ? `${activeFaculty} programs`
              : `All ${V3_META.total} assessed programs`
          }
          blurb="Position, curriculum scores by name, and both pass/fail floors. Select a program for its full report."
        />
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {[
                      "Program",
                      "Faculty",
                      "Position",
                      "Confidence",
                      "Exposure",
                      "Adaptiveness",
                      ...DIMENSION_ORDER.map((d) => DIMENSION_LABELS[d]),
                      "Decision-making",
                      "Domain depth",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-muted-foreground border-border border-b-2 px-3 py-2 text-left text-xs font-medium whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r) => (
                    <tr
                      key={r.code}
                      className="border-border/40 hover:bg-card-accent border-b"
                    >
                      <td className="px-3 py-1.5 font-medium whitespace-nowrap">
                        <ProgramLink row={r} />
                      </td>
                      <td className="text-muted-foreground px-3 py-1.5 whitespace-nowrap">
                        {r.faculty}
                      </td>
                      <td className="px-3 py-1.5">
                        {r.position ? (
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${
                              QUADRANTS[r.position].badgeClass
                            }`}
                          >
                            {QUADRANTS[r.position].desc}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            Destination data pending
                          </span>
                        )}
                      </td>
                      <td className="text-muted-foreground px-3 py-1.5 text-xs whitespace-nowrap">
                        {r.confidence ?? "—"}
                      </td>
                      <td className="px-3 py-1.5 tabular-nums">
                        {r.exposure === null ? "—" : r.exposure.toFixed(0)}
                      </td>
                      <td className="px-3 py-1.5 whitespace-nowrap tabular-nums">
                        {r.adaptiveness}/15
                      </td>
                      {DIMENSION_ORDER.map((d) => (
                        <td key={d} className="px-3 py-1.5 tabular-nums">
                          {r.dims[d]}
                        </td>
                      ))}
                      <td
                        className={`px-3 py-1.5 text-xs ${
                          r.decisionMaking === "PASS"
                            ? "text-band-resilient"
                            : "text-band-critical"
                        }`}
                      >
                        {r.decisionMaking === "PASS" ? "Held" : "Not held"}
                      </td>
                      <td
                        className={`px-3 py-1.5 text-xs ${
                          r.domainDepth === "PASS"
                            ? "text-band-resilient"
                            : "text-band-critical"
                        }`}
                      >
                        {r.domainDepth === "PASS" ? "Held" : "Not held"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            "adaptiveness",
            "gates",
            "medianQuadrant",
            "positionConfidence",
            "jir",
            "crosswalk",
            "qilt",
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
            "dfvaRubric",
            "qiltGos",
            "jsaHeoData",
          ]}
        />

        <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>
            Evidura · Durability Assessment · destination exposure computed{" "}
            {V3_META.exposureComputedAt}
          </span>
          <span className="flex gap-4">
            <Link to="/reports/mc-jurisd" className="underline">
              Example program report (Juris Doctor)
            </Link>
            <Link to="/insights/faculty" className="underline">
              Faculty comparison and graduate outcomes
            </Link>
          </span>
        </div>
      </div>
    </InsightsGate>
  );
}
