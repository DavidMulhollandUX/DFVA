// compass/app/src/compass/FragilityDashboardPage.tsx
// Data Fragility Monitor — feat-012
import { InsightsGate } from "./InsightsGate";
import { getFragilityIncidents } from "wasp/client/operations";
import { useQuery } from "wasp/client/operations";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AlertTriangle,
  Clock,
  Globe,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";
import { useMemo } from "react";
import { Link } from "react-router";
import { formatDate } from "./formatDate";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export default function FragilityDashboardPage() {
  const { data: incidents, isLoading } = useQuery(getFragilityIncidents);

  const stats = useMemo(() => {
    if (!incidents || incidents.length === 0) return null;
    const totalBlastRadius = incidents.reduce(
      (sum, i) => sum + i.blastRadius,
      0,
    );
    const platforms = new Set(incidents.map((i) => i.platform));
    const avgRecovery = incidents
      .filter((i) => i.recoveryHours != null)
      .map((i) => i.recoveryHours as number);
    const avgRecoveryHours =
      avgRecovery.length > 0
        ? Math.round(
            avgRecovery.reduce((s, h) => s + h, 0) / avgRecovery.length,
          )
        : null;
    return {
      totalIncidents: incidents.length,
      totalBlastRadius,
      uniquePlatforms: platforms.size,
      avgRecoveryHours,
    };
  }, [incidents]);

  const timelineData = useMemo(() => {
    if (!incidents || incidents.length === 0) return [];
    const sorted = [...incidents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    let cumulative = 0;
    return sorted.map((i) => {
      cumulative += i.blastRadius;
      return {
        date: formatDate(i.date, "dayMonth"),
        platform: i.platform,
        blastRadius: i.blastRadius,
        cumulative,
      };
    });
  }, [incidents]);

  const platformData = useMemo(() => {
    if (!incidents || incidents.length === 0) return [];
    const counts: Record<string, number> = {};
    for (const i of incidents) {
      counts[i.platform] = (counts[i.platform] || 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [incidents]);

  const recoveryData = useMemo(() => {
    if (!incidents || incidents.length === 0) return [];
    return incidents
      .filter((i) => i.recoveryHours != null)
      .map((i) => ({
        platform:
          i.platform.length > 12 ? i.platform.slice(0, 12) + "…" : i.platform,
        hours: i.recoveryHours as number,
        label: formatDate(i.date, "monthYear"),
      }));
  }, [incidents]);

  if (isLoading) {
    return (
      <InsightsGate>
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="text-muted-foreground animate-pulse text-center">
            Loading fragility data...
          </div>
        </div>
      </InsightsGate>
    );
  }

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              Data Fragility Monitor
            </h1>
            <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-500">
              LIVE
            </span>
          </div>
          <p className="text-muted-foreground">
            Tracking scraper regression incidents across curriculum platforms.
            Every incident confirms that HTML-based curriculum data is
            structurally fragile — and why structured, API-first assessment
            matters.
          </p>
        </div>

        {/* Stats cards */}
        {stats && (
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-red-500">
                  {stats.totalIncidents}
                </div>
                <div className="text-muted-foreground text-xs tracking-wide uppercase">
                  Incidents Tracked
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-500">
                  {stats.totalBlastRadius}
                </div>
                <div className="text-muted-foreground text-xs tracking-wide uppercase">
                  Total Blast Radius
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-500">
                  {stats.uniquePlatforms}
                </div>
                <div className="text-muted-foreground text-xs tracking-wide uppercase">
                  Platforms Affected
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-500">
                  {stats.avgRecoveryHours != null
                    ? `${Math.round(stats.avgRecoveryHours / 24)}d`
                    : "N/A"}
                </div>
                <div className="text-muted-foreground text-xs tracking-wide uppercase">
                  Avg Recovery
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cumulative blast radius chart */}
        {timelineData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Cumulative Blast Radius Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timelineData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Platform breakdown */}
        {platformData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Incidents by Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {platformData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Recovery time chart */}
        {recoveryData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recovery Times (Hours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={recoveryData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="label" className="text-xs" />
                  <YAxis className="text-xs" unit="h" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="hours" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Incident list */}
        {incidents && incidents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>All Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident: any) => (
                  <div
                    key={incident.id}
                    className="border-muted rounded-lg border p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs font-semibold">
                        {incident.platform}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatDate(incident.date, "long")}
                      </span>
                      {incident.recoveryHours != null && (
                        <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs font-semibold text-yellow-600">
                          {incident.recoveryHours}h recovery
                        </span>
                      )}
                      {incident.blastRadius > 1 && (
                        <span className="rounded bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-500">
                          {incident.blastRadius} states affected
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2 text-sm">
                      {incident.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="text-muted-foreground">
                        Source: {incident.sourceDescription}
                      </span>
                      <a
                        href={incident.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center gap-1 hover:underline"
                      >
                        View source <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!incidents ||
          (incidents.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  No fragility incidents recorded yet. As new scraper
                  regressions are discovered, they will appear here as evidence
                  of the structural fragility of HTML-based curriculum systems.
                </p>
              </CardContent>
            </Card>
          ))}

        {/* Link to public evidence page */}
        <div className="mt-8 text-center">
          <Link
            to="/why-structured-data"
            className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            View public "Why Structured Data?" evidence page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </InsightsGate>
  );
}
