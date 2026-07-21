// compass/app/src/compass/InsightsPage.tsx
import { Link } from "react-router";
import { InsightsGate } from "./InsightsGate";
import { PROGRAMS } from "./sharedProgramData";
import { getFaculty, facultySlug } from "./faculty";
import { getFragilityIncidents } from "wasp/client/operations";
import { useQuery } from "@wasp/queries";
import { Building2, TrendingUp, ArrowRight, Shield, AlertTriangle, BarChart3 } from "lucide-react";
import { useMemo } from "react";
import ImpactReportCard from "./ImpactReportCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";

export default function InsightsPage() {
  const { data: incidents } = useQuery(getFragilityIncidents);

  const fragilityCount = incidents?.length ?? 0;
  const fragilityPlatforms = useMemo(() => {
    if (!incidents || incidents.length === 0) return 0;
    return new Set(incidents.map((i: any) => i.platform)).size;
  }, [incidents]);

  const faculties = useMemo(() => {
    const groups: Record<string, { count: number; avgScore: number }> = {};
    for (const p of PROGRAMS) {
      const f = getFaculty(p.program);
      if (!groups[f]) groups[f] = { count: 0, avgScore: 0 };
      groups[f].count++;
      groups[f].avgScore += p.score;
    }
    for (const f of Object.keys(groups)) {
      groups[f].avgScore /= groups[f].count;
    }
    return Object.entries(groups).sort((a, b) => b[1].avgScore - a[1].avgScore);
  }, []);

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-3">
            <Shield className="text-primary h-8 w-8" />
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              Insights
            </h1>
            <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
              PREMIUM
            </span>
          </div>
          <p className="text-muted-foreground">
            Faculty-level analytics and university-wide portfolio intelligence
            for strategic planning.
          </p>
        </div>

        {/* Portfolio Health card */}
        <Card className="border-primary/20 bg-primary/5 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary h-5 w-5" />
              University Portfolio Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Comprehensive portfolio-wide analysis: risk distribution,
              dimension health matrix, programs on the threshold, and
              recommended university-wide actions.
            </p>
            <Link
              to="/insights/portfolio"
              className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              View Portfolio Report <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Data Fragility widget */}
        <Card className="border-red-500/20 bg-red-500/5 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Data Fragility Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              {fragilityCount > 0
                ? `${fragilityCount} scraper regression incident${fragilityCount !== 1 ? "s" : ""} tracked across ${fragilityPlatforms} platform${fragilityPlatforms !== 1 ? "s" : ""} — HTML-based curriculum data is structurally fragile.`
                : "Tracking scraper regression incidents across curriculum platforms."}
            </p>
            <Link
              to="/insights/fragility"
              className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              View Fragility Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Market Validation section */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold">
              <BarChart3 className="text-primary h-5 w-5" />
              Market Validation
            </h2>
            <Link
              to="/insights/validation/lightcast-2026-impact-report"
              className="text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-medium hover:underline"
            >
              View all signals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ImpactReportCard />
        </div>

        {/* Faculty cards */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold">
            <Building2 className="h-5 w-5" />
            Faculty Insight Reports
          </h2>
          <Link
            to="/insights/faculty"
            className="text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-medium hover:underline"
          >
            Compare all faculties <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {faculties.map(([name, stats]) => (
            <Link key={name} to={`/insights/faculty/${facultySlug(name)}`}>
              <Card className="hover:border-primary/40 h-full cursor-pointer transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {stats.count} program{stats.count !== 1 ? "s" : ""}
                    </span>
                    <span className="font-bold">
                      {stats.avgScore.toFixed(1)}
                      <span className="text-muted-foreground text-xs font-normal">
                        /36
                      </span>
                    </span>
                  </div>
                  <div className="bg-muted mt-3 h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        stats.avgScore >= 24
                          ? "bg-emerald-500"
                          : stats.avgScore >= 20
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${(stats.avgScore / 36) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </InsightsGate>
  );
}
