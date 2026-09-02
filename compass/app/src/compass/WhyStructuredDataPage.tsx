// compass/app/src/compass/WhyStructuredDataPage.tsx
// Public evidence page — feat-012
import { getFragilityIncidents } from "wasp/client/operations";
import { brand } from "../branding/brandConfig";
import { useQuery } from "wasp/client/operations";
import { Link } from "react-router";
import {
  AlertTriangle,
  Database,
  FileCode2,
  Clock,
  ArrowRight,
  Shield,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent } from "../client/components/ui/card";
import { useMemo } from "react";

export default function WhyStructuredDataPage() {
  const { data: incidents, isLoading } = useQuery(getFragilityIncidents);

  const stats = useMemo(() => {
    if (!incidents || incidents.length === 0) return null;
    const totalBlastRadius = incidents.reduce(
      (sum, i) => sum + i.blastRadius,
      0,
    );
    const platforms = new Set(incidents.map((i) => i.platform));
    return {
      totalIncidents: incidents.length,
      totalBlastRadius,
      uniquePlatforms: platforms.size,
    };
  }, [incidents]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <AlertTriangle className="h-10 w-10 text-red-500" />
            <h1 className="text-foreground text-4xl font-bold tracking-tight">
              Why Structured Data?
            </h1>
          </div>
          {stats && (
            <p className="text-muted-foreground mx-auto mb-4 max-w-2xl text-lg">
              <span className="font-bold text-red-500">
                {stats.totalIncidents} incidents
              </span>{" "}
              across{" "}
              <span className="font-bold text-orange-500">
                {stats.uniquePlatforms} platforms
              </span>{" "}
              have affected{" "}
              <span className="font-bold text-yellow-600">
                {stats.totalBlastRadius}+ states and institutions
              </span>{" "}
              — and every one of them confirms the same thing: curriculum data
              stored as HTML is structurally fragile.
            </p>
          )}
          {!stats && (
            <p className="text-muted-foreground mx-auto mb-4 max-w-2xl text-lg">
              Curriculum platforms store degree requirements as unstructured
              HTML blocks. When the HTML changes — and it always does — the data
              becomes inaccessible. {brand.name} takes a different approach.
            </p>
          )}
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            {brand.name} uses a structured, API-first data model. No scraping.
            No HTML parsing. Just clean, queryable, machine-readable degree data
            that stays accessible no matter what changes upstream.
          </p>
          <Link
            to="/assess"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
          >
            Assess Your Program <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      {stats && (
        <section className="bg-card border-b py-8">
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8 px-4 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500">
                {stats.totalIncidents}
              </div>
              <div className="text-muted-foreground text-sm">
                Documented Incidents
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">
                {stats.totalBlastRadius}+
              </div>
              <div className="text-muted-foreground text-sm">
                Institutions/States Affected
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500">
                {stats.uniquePlatforms}
              </div>
              <div className="text-muted-foreground text-sm">
                Platforms Affected
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Evidence Timeline */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <Clock className="h-6 w-6 text-red-500" />
          <h2 className="text-foreground text-2xl font-bold">
            Evidence Timeline
          </h2>
        </div>

        {isLoading && (
          <div className="text-muted-foreground animate-pulse py-8 text-center">
            Loading evidence data...
          </div>
        )}

        {incidents && incidents.length === 0 && (
          <Card>
            <CardContent className="py-12 pt-6 text-center">
              <p className="text-muted-foreground">
                Incident data is being compiled. Check back soon.
              </p>
            </CardContent>
          </Card>
        )}

        {incidents && incidents.length > 0 && (
          <div className="space-y-4">
            {incidents.map((incident: any) => (
              <Card key={incident.id}>
                <CardContent className="pt-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-600">
                      {incident.platform}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(incident.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {incident.recoveryHours != null && (
                      <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs font-semibold text-yellow-600">
                        {Math.round(incident.recoveryHours / 24)} days recovery
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {incident.description}
                  </p>
                  <div className="mt-2 text-xs">
                    <a
                      href={incident.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {incident.sourceDescription}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Structured vs HTML Comparison */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 flex items-center gap-3">
            <Database className="h-6 w-6" />
            <h2 className="text-foreground text-2xl font-bold">
              Structured Data vs. HTML Parsing
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-semibold">Capability</th>
                  <th className="bg-primary/5 py-3 text-center font-semibold text-green-600">
                    <Shield className="mx-auto mb-1 h-5 w-5" />
                    {brand.name} (Structured)
                  </th>
                  <th className="py-3 text-center font-semibold text-red-500">
                    <FileCode2 className="mx-auto mb-1 h-5 w-5" />
                    HTML-Dependent Platforms
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Programmatic analysis of degree requirements", true, false],
                  ["Immune to upstream HTML changes", true, false],
                  ["API-first data access", true, false],
                  ["Machine-readable degree structures", true, false],
                  ["Zero scraping required for assessment", true, false],
                  ["Independent analytics layer", true, false],
                  ["Works with any curriculum platform's data", true, true],
                ].map(([cap, dfva, html]) => (
                  <tr key={cap as string} className="border-b">
                    <td className="py-3 pr-4">{cap as string}</td>
                    <td className="bg-primary/5 py-3 text-center">
                      {dfva ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-400" />
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {html ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {stats && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Based on {stats.totalIncidents} documented incidents across{" "}
                {stats.uniquePlatforms} platforms, affecting{" "}
                {stats.totalBlastRadius}+ institutions and states.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <Shield className="text-primary mx-auto mb-4 h-12 w-12" />
        <h2 className="text-foreground mb-4 text-3xl font-bold">
          Ready to assess your programs?
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-xl">
          See how {brand.name}'s structured assessment model evaluates degree
          future-viability against AI-driven labour market change — no HTML
          scraping required.
        </p>
        <Link
          to="/assess"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
        >
          Assess Your Program <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
