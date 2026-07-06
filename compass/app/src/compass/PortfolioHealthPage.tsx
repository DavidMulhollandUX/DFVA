// compass/app/src/compass/PortfolioHealthPage.tsx
import { Link } from "react-router";
import { InsightsGate } from "./InsightsGate";
import { PROGRAMS } from "./sharedProgramData";
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

export default function PortfolioHealthPage() {
  const stats = useMemo(() => {
    const bands: Record<string, number> = {};
    const dimTotals: Record<string, number> = {};
    for (const p of PROGRAMS) {
      bands[p.riskBand] = (bands[p.riskBand] || 0) + 1;
      for (const d of p.dimensions) {
        // Skip Not-Applicable dimensions so they don't drag the weakest-dimension total.
        if (d.score === null) continue;
        dimTotals[d.label] = (dimTotals[d.label] || 0) + d.score;
      }
    }

    const weakest = Object.entries(dimTotals).reduce((a, b) =>
      a[1] < b[1] ? a : b,
    );
    const avgScore =
      PROGRAMS.reduce((s, p) => s + p.score, 0) / PROGRAMS.length;

    const threshold = PROGRAMS.filter((p) => p.score >= 25 && p.score <= 27)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const highRisk = PROGRAMS.filter(
      (p) => p.riskBand === "HIGH RISK" || p.riskBand === "CRITICAL",
    );

    return {
      bands,
      avgScore,
      weakest,
      threshold,
      highRisk,
      dimTotals,
      count: PROGRAMS.length,
    };
  }, []);

  const total = stats.count;
  const resilientCount = stats.bands["RESILIENT"] || 0;
  const moderateCount = stats.bands["MODERATE RISK"] || 0;
  const highCount = stats.bands["HIGH RISK"] || 0;
  const criticalCount = stats.bands["CRITICAL"] || 0;

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-16">
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
            University-wide DFVA portfolio analysis for senior leadership.
          </p>
        </div>

        {/* Health score */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-muted-foreground mb-1 text-sm font-medium">
                  PORTFOLIO HEALTH SCORE
                </div>
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  C+
                </div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {stats.count} programs assessed
                </div>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground mb-1 text-sm">
                  Weighted Average
                </div>
                <div className="text-3xl font-bold">
                  {stats.avgScore.toFixed(1)}
                  <span className="text-muted-foreground text-lg font-normal">
                    /36
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk distribution */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    label: "RESILIENT",
                    count: resilientCount,
                    color: "bg-emerald-500",
                    text: "text-emerald-700 dark:text-emerald-300",
                  },
                  {
                    label: "MODERATE RISK",
                    count: moderateCount,
                    color: "bg-yellow-500",
                    text: "text-yellow-700 dark:text-yellow-300",
                  },
                  {
                    label: "HIGH RISK",
                    count: highCount,
                    color: "bg-orange-500",
                    text: "text-orange-700 dark:text-orange-300",
                  },
                  {
                    label: "CRITICAL",
                    count: criticalCount,
                    color: "bg-red-500",
                    text: "text-red-700 dark:text-red-300",
                  },
                ].map((band) => (
                  <div key={band.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span
                        className={
                          band.count > 0 ? band.text : "text-muted-foreground"
                        }
                      >
                        {band.label}
                      </span>
                      <span className="font-medium">
                        {band.count}{" "}
                        <span className="text-muted-foreground text-xs">
                          ({((band.count / total) * 100).toFixed(0)}%)
                        </span>
                      </span>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className={`h-full rounded-full ${band.color}`}
                        style={{ width: `${(band.count / total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <div className="text-sm">
                    <span className="font-medium">AI Literacy Gap:</span>{" "}
                    University average{" "}
                    {((stats.dimTotals["AI Literacy"] || 0) / total).toFixed(1)}
                    /3 — weakest dimension across all programs
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  <div className="text-sm">
                    <span className="font-medium">{highCount} programs</span> in
                    HIGH RISK or CRITICAL bands require immediate attention
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div className="text-sm">
                    <span className="font-medium">
                      {stats.threshold.length} programs
                    </span>{" "}
                    within 3 points of RESILIENT — quick wins available
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div className="text-sm">
                    <span className="font-medium">
                      {((moderateCount / total) * 100).toFixed(0)}% of programs
                    </span>{" "}
                    cluster in MODERATE RISK — stable but not resilient
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programs on the edge */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              Programs on the Threshold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Programs 1–3 points from RESILIENT (28+). Each requires a targeted
              intervention.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {stats.threshold.map((p) => (
                <Link
                  key={p.assessmentSlug}
                  to={`/reports/${p.assessmentSlug}`}
                  className="border-border hover:border-primary/40 flex items-center justify-between rounded-lg border p-3 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium">{p.program}</div>
                    <div className="text-muted-foreground text-xs">
                      {p.score}/36 — {28 - p.score} pts to RESILIENT
                    </div>
                  </div>
                  <ArrowRight className="text-muted-foreground h-4 w-4" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Recommended University-Wide Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  priority: "P1",
                  action: "AI Literacy Sprint",
                  detail:
                    "Add AI literacy module to all programs within 3 points of RESILIENT. Single highest-impact intervention — would push up to 7 programs into RESILIENT territory.",
                },
                {
                  priority: "P1",
                  action: "Creative Arts Audit",
                  detail:
                    "Comprehensive review of creative practice programs. MC-SCWR at 11/36 CRITICAL signals structural AI exposure in creative fields.",
                },
                {
                  priority: "P2",
                  action: "Business Faculty Review",
                  detail:
                    "Bimodal risk profile — MC-APBUSA leads on AI literacy while MC-BAMKTG and MC-BASE show high automation exposure. Develop faculty-level AI strategy.",
                },
                {
                  priority: "P2",
                  action: "Market Data Expansion",
                  detail:
                    "Add GOS-L 3-year outcomes, international graduate data, and occupation-level AI exposure indices to improve D10 precision.",
                },
                {
                  priority: "P3",
                  action: "Go8 Benchmarking",
                  detail:
                    "Score equivalent programs at USyd, UNSW, ANU, UQ, and Monash to establish comparative resilience baseline.",
                },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="border-border flex items-start gap-3 rounded-lg border p-3"
                >
                  <span
                    className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${
                      rec.priority === "P1"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : rec.priority === "P2"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}
                  >
                    {rec.priority}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{rec.action}</div>
                    <div className="text-muted-foreground mt-0.5 text-xs">
                      {rec.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InsightsGate>
  );
}
