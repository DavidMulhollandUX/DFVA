import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";
import { ArrowRight, BarChart2, ClipboardList, Loader2, TrendingUp } from "lucide-react";
import {
  PROGRAMS,
  riskBandConfig,
  thresholdConfig,
  dimBarColor,
  type DimensionScore,
} from "./sharedProgramData";
import type { ProgramReport } from "./sharedProgramData";
import { useReportsData } from "./useReportsData";

function ScoreGauge({
  score,
  max,
  band,
}: {
  score: number;
  max: number;
  band: ProgramReport["riskBand"];
}) {
  const cfg = riskBandConfig[band];
  const pct = Math.round((score / max) * 100);
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-full border-4 ${cfg.border} ${cfg.bg}`}
      >
        <div className="text-center">
          <span className={`text-2xl font-bold ${cfg.text}`}>{score}</span>
          <span className="block text-xs text-muted-foreground">/ {max}</span>
        </div>
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 96 96"
          fill="none"
        >
          <circle cx="48" cy="48" r="44" strokeWidth="4" className="stroke-border" />
          <circle
            cx="48"
            cy="48"
            r="44"
            strokeWidth="4"
            strokeDasharray={`${(pct / 100) * 276.5} 276.5`}
            strokeLinecap="round"
            className={`${cfg.bar} opacity-80`}
            stroke="currentColor"
          />
        </svg>
      </div>
      <span
        className={`mt-2 rounded-full px-3 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.text} border ${cfg.border}`}
      >
        {cfg.label}
      </span>
    </div>
  );
}

function DimensionBars({ dimensions }: { dimensions: DimensionScore[] }) {
  return (
    <div className="space-y-2 mt-4">
      {dimensions.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-40 shrink-0 text-xs text-muted-foreground truncate">
            {d.label}
          </span>
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${dimBarColor(d.score, d.max)}`}
                style={{ width: `${(d.score / d.max) * 100}%` }}
              />
            </div>
            <span className="w-8 text-right text-xs font-medium text-foreground shrink-0">
              {d.score}/{d.max}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThresholdPills({
  thresholds,
}: {
  thresholds: { q1: "YES" | "NO" | "UNCERTAIN"; q2: "YES" | "NO" | "UNCERTAIN"; q3: "YES" | "NO" | "UNCERTAIN" };
}) {
  const items = [
    { label: "AI replaces output?", value: thresholds.q1 },
    { label: "Designs systems / owns decisions?", value: thresholds.q2 },
    { label: "More employable in 5 years?", value: thresholds.q3 },
  ];
  return (
    <div className="mt-4 space-y-1.5">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span
            className={`text-xs font-bold ${thresholdConfig[item.value]?.color ?? ""}`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const { reports, isLoading } = useReportsData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Assessment Reports
        </h1>
        <p className="mt-2 text-muted-foreground">
          DFVA reports generated to date. Each card includes the full scorecard
          assessment and companion market intelligence.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <BarChart2 className="h-10 w-10 opacity-20 mb-4" />
          <p className="text-sm">No assessment reports yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {reports.map((p) => {
          const cfg = riskBandConfig[p.riskBand];
          return (
            <Card
              key={p.assessmentSlug}
              className={`border ${cfg.border} overflow-hidden`}
            >
              {/* Header */}
              <CardHeader className={`${cfg.bg} pb-4`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg leading-snug">
                      {p.program}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {p.institution} · {p.level}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Assessed {p.date}
                    </p>
                  </div>
                  <ScoreGauge
                    score={p.score}
                    max={p.maxScore}
                    band={p.riskBand}
                  />
                </div>
              </CardHeader>

              <CardContent className="pt-5">
                {/* Dimension scores */}
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Dimension Scores
                </p>
                <DimensionBars dimensions={p.dimensions} />

                {/* Threshold questions */}
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Threshold Questions
                </p>
                <ThresholdPills thresholds={p.thresholds} />

                {/* Report links */}
                <div
                  className={`mt-6 grid divide-x rounded-lg border ${cfg.border} overflow-hidden ${p.recommendSlug ? "grid-cols-3" : "grid-cols-2"}`}
                >
                  <Link
                    to={`/reports/${p.assessmentSlug}`}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${cfg.text} ${cfg.hoverBg} transition-colors`}
                  >
                    <BarChart2 className="h-4 w-4 shrink-0" />
                    <span>DFVA Assessment</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                  </Link>
                  <Link
                    to={`/reports/${p.marketSlug}`}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${cfg.text} ${cfg.hoverBg} transition-colors`}
                  >
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    <span>Market Intelligence</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                  </Link>
                  {p.recommendSlug && (
                    <Link
                      to={`/reports/${p.recommendSlug}`}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${cfg.text} ${cfg.hoverBg} transition-colors`}
                    >
                      <ClipboardList className="h-4 w-4 shrink-0" />
                      <span>Improvement Plan</span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

