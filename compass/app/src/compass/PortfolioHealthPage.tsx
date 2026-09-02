// compass/app/src/compass/PortfolioHealthPage.tsx
import { Link } from "react-router";
import { brand } from "../branding/brandConfig";
import { V4_ADAPTIVENESS_MAX } from "./v4/data/v4Rubric";
import { programReportPath } from "./reportLinks";
import { InsightsGate } from "./InsightsGate";
import { PageShell } from "../client/components/PageShell";
import { useMemo } from "react";
import {
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";
import { QUADRANTS } from "./v2/quadrants";
import {
  POSITION_ORDER,
  facultyRows,
  gateFailures,
  itemAverages,
  needsAttention,
  positionCounts,
  quickWins,
  v4PortfolioRows,
} from "./v4/portfolioStats";

export default function PortfolioHealthPage() {
  const stats = useMemo(() => {
    const rows = v4PortfolioRows();
    const assessed = rows.filter((r) => r.assessed);
    const averages = itemAverages(rows);
    const adaptive = [
      ...averages.filter((a) => a.subscale === "adaptive"),
    ].sort((a, b) => a.avg - b.avg);
    const avgAdaptiveness =
      assessed.reduce((s, r) => s + (r.adaptiveness ?? 0), 0) /
      Math.max(1, assessed.length);

    return {
      rows,
      assessed,
      count: assessed.length,
      avgAdaptiveness,
      weakestAdaptive: adaptive[0],
      positions: positionCounts(rows),
      quickWins: quickWins(rows),
      attentionList: needsAttention(rows),
      gates: gateFailures(rows),
      faculties: facultyRows(rows),
    };
  }, []);

  const total = stats.count;

  return (
    <InsightsGate>
      <PageShell className="py-16">
        <div className="mb-8">
          <Link
            to="/insights"
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </Link>
          <div className="mb-2 flex items-center gap-3">
            <TrendingUp className="text-primary h-8 w-8" />
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              Portfolio Health Report
            </h1>
            <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
              PREMIUM
            </span>
          </div>
          <p className="text-muted-foreground">
            University-wide {brand.signalName} portfolio analysis for senior
            leadership.
          </p>
        </div>

        {/* Health score */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-muted-foreground mb-1 text-sm font-medium">
                  PROGRAMS ASSESSED
                </div>
                <div className="text-4xl font-bold">{stats.count}</div>
                <div className="text-muted-foreground mt-1 text-xs">
                  on the current {brand.instrumentLabel} instrument
                </div>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground mb-1 text-sm">
                  Average adaptiveness
                </div>
                <div className="text-3xl font-bold">
                  {stats.avgAdaptiveness.toFixed(1)}
                  <span className="text-muted-foreground text-lg font-normal">
                    /{V4_ADAPTIVENESS_MAX}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Position distribution */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle as="h2" className="text-base">
                Position distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {POSITION_ORDER.map((pos) => {
                  const count = stats.positions[pos];
                  const cfg = QUADRANTS[pos];
                  return (
                    <div key={pos}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span
                          className={count > 0 ? "" : "text-muted-foreground"}
                        >
                          {cfg.desc}
                        </span>
                        <span className="font-medium">
                          {count}{" "}
                          <span className="text-muted-foreground text-xs">
                            ({total ? Math.round((count / total) * 100) : 0}%)
                          </span>
                        </span>
                      </div>
                      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${total ? (count / total) * 100 : 0}%`,
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
              <CardTitle as="h2" className="text-base">
                Key findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <div className="text-sm">
                    <span className="font-medium">
                      {stats.weakestAdaptive?.short ?? "—"} gap:
                    </span>{" "}
                    university average{" "}
                    {stats.weakestAdaptive?.avg.toFixed(1) ?? "—"}/3 — the
                    weakest adaptive capability across all assessed programs.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  <div className="text-sm">
                    <span className="font-medium">
                      {stats.positions.attention} programs
                    </span>{" "}
                    send graduates into highly exposed occupations without the
                    curriculum defences their peers have built.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div className="text-sm">
                    <span className="font-medium">
                      {stats.quickWins.length} programs
                    </span>{" "}
                    sit one curriculum point below the adaptiveness median —
                    quick wins available.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <div className="text-sm">
                    <span className="font-medium">
                      {stats.gates.length} programs
                    </span>{" "}
                    fail at least one precondition gate — flagged regardless of
                    item scores.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick wins */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle as="h2" className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              Highest-leverage changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Exposed programs one curriculum point below the published median —
              a single item improvement changes their position.
            </p>
            {stats.quickWins.length ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {stats.quickWins.map((p) => (
                  <Link
                    key={p.code}
                    to={programReportPath(p.code)}
                    className="border-border hover:border-primary/40 flex items-center justify-between rounded-lg border p-3 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {p.adaptiveness}/{V4_ADAPTIVENESS_MAX} adaptiveness
                      </div>
                    </div>
                    <ArrowRight className="text-muted-foreground h-4 w-4" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No program currently sits one point below the median.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Faculty summary */}
        <Card>
          <CardHeader>
            <CardTitle as="h2" className="text-base">
              Faculties needing attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.faculties.filter(
              (f) => f.positions.attention > 0 || f.gateFailures > 0,
            ).length ? (
              <div className="space-y-3">
                {stats.faculties
                  .filter(
                    (f) => f.positions.attention > 0 || f.gateFailures > 0,
                  )
                  .map((f) => (
                    <div
                      key={f.name}
                      className="border-border flex items-start gap-3 rounded-lg border p-3"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium">{f.name}</div>
                        <div className="text-muted-foreground mt-0.5 text-xs">
                          {f.positions.attention > 0 &&
                            `${f.positions.attention} in attention`}
                          {f.positions.attention > 0 &&
                            f.gateFailures > 0 &&
                            " · "}
                          {f.gateFailures > 0 &&
                            `${f.gateFailures} gate failure${
                              f.gateFailures === 1 ? "" : "s"
                            }`}
                          {f.weakestItem && ` · weakest: ${f.weakestItem}`}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No faculty currently carries an attention-position or
                gate-failure program.
              </p>
            )}
          </CardContent>
        </Card>
      </PageShell>
    </InsightsGate>
  );
}
