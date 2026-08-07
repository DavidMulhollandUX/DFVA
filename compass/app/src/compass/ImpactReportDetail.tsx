import { useQuery } from "wasp/client/operations";
import { getValidationSignals } from "wasp/client/operations";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Award,
} from "lucide-react";

/**
 * ImpactReportDetail — dedicated detail page for a market validation report.
 * Route: /insights/validation/:slug
 * Filters MarketValidationSignal records by source matching the slug.
 */
export default function ImpactReportDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: signals, isLoading } = useQuery(getValidationSignals);

  // Map slugs to source filter strings
  const slugMap: Record<string, { source: string; title: string }> = {
    "lightcast-2026-impact-report": {
      source: "Lightcast 2026",
      title: "Lightcast 2026 Customer Impact Report",
    },
    "time-top-worktech-2026": {
      source: "TIME Top WorkTech",
      title: "TIME Top WorkTech Companies 2026",
    },
  };

  const reportMeta = slug ? slugMap[slug] : null;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="bg-muted h-8 w-64 rounded" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-3/4 rounded" />
        </div>
      </div>
    );
  }

  if (!reportMeta) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-foreground mb-4 text-2xl font-bold">
          Report not found
        </h1>
        <p className="text-muted-foreground mb-6">
          No market validation report matches "{slug}".
        </p>
        <Link
          to="/insights"
          className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>
      </div>
    );
  }

  const reportSignals = (signals ?? []).filter(
    (s: any) =>
      s.source?.includes(reportMeta.source),
  );

  if (reportSignals.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-foreground mb-4 text-2xl font-bold">
          {reportMeta.title}
        </h1>
        <p className="text-muted-foreground mb-6">
          Signal data is not yet available. Seed data may need to be applied.
        </p>
        <Link
          to="/insights"
          className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>
      </div>
    );
  }

  // Build report metadata from signals
  const credibilityScores = reportSignals.map((s: any) => s.credibilityScore ?? 0);
  const avgCredibility =
    credibilityScores.length > 0
      ? credibilityScores.reduce((a: number, b: number) => a + b, 0) /
        credibilityScores.length
      : 0;

  const primaryUrl =
    reportSignals.find((s: any) => s.url)?.url ?? "";

  // Related signals: other market_validation category signals not in this report
  const relatedSignals = (signals ?? [])
    .filter(
      (s: any) =>
        s.category === "market_validation" &&
        !s.source?.includes(reportMeta.source),
    )
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Back link */}
      <Link
        to="/insights"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Insights
      </Link>

      {/* Report header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <BarChart3 className="text-primary h-8 w-8" />
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            {reportMeta.title}
          </h1>
        </div>
        <div className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span>
            Source:{" "}
            <span className="text-foreground font-medium">
              {reportSignals[0]?.source ?? reportMeta.title}
            </span>
          </span>
          <span>
            Credibility:{" "}
            <span className="text-foreground font-medium">
              {avgCredibility.toFixed(1)}/10
            </span>
          </span>
          <span>
            Signals:{" "}
            <span className="text-foreground font-medium">
              {reportSignals.length}
            </span>
          </span>
        </div>
      </div>

      {/* Findings */}
      <section className="mb-10">
        <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-semibold">
          <TrendingUp className="h-5 w-5" />
          Key Findings
        </h2>
        <div className="space-y-4">
          {reportSignals.map((signal: any) => (
            <div
              key={signal.id}
              className="border-border bg-card rounded-lg border p-5"
            >
              <p className="text-foreground mb-3 leading-relaxed font-medium">
                {signal.excerpt}
              </p>
              <div className="text-muted-foreground text-sm">
                <p>{signal.relevantClaim}</p>
              </div>
              <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                <span>
                  Credibility: {signal.credibilityScore}/10
                </span>
                {signal.dateDiscovered && (
                  <span>
                    Discovered:{" "}
                    {new Date(signal.dateDiscovered).toLocaleDateString(
                      "en-AU",
                      { year: "numeric", month: "short", day: "numeric" },
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DFVA Differentiation Narrative */}
      <section className="mb-10">
        <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-semibold">
          <Award className="h-5 w-5" />
          DFVA Differentiation
        </h2>
        <div className="border-border bg-card text-muted-foreground space-y-4 rounded-lg border p-6 text-sm leading-relaxed">
          <p>
            <strong className="text-foreground">
              Lightcast validates the need. DFVA delivers the education-specific answer.
            </strong>{" "}
            Lightcast's 2026 Customer Impact Report provides the strongest
            third-party validation yet of DFVA's core thesis: AI adoption is
            making structured program assessment urgent. But Lightcast provides
            raw labour market data — employment rates, salary trends, job
            posting volumes. DFVA provides the assessment methodology that
            connects this data to specific curriculum decisions.
          </p>

          <p>
            <strong className="text-foreground">
              DFVA's 11-dimension scoring model is the differentiator.
            </strong>{" "}
            No competitor — including Lightcast — offers an 11-dimension
            durability assessment that evaluates automation exposure, systems
            thinking, AI literacy, research rigour, and human irreplaceability
            in a single comparable score. Lightcast answers "what jobs exist?";
            DFVA answers "is this degree preparing students for them?"
          </p>

          <p>
            <strong className="text-foreground">
              Independent third-party standard vs vendor-published claims.
            </strong>{" "}
            Coursedog, CourseLeaf, and Lightcast all publish their own
            analytics — but those analytics are tied to their platforms and
            data. DFVA is platform-agnostic: the 11-dimension methodology works
            across any university's curriculum, regardless of which vendor they
            use. This independence is the structural moat.
          </p>

          <p>
            <strong className="text-foreground">
              The market is racing toward this. DFVA is the education-specific
              answer.
            </strong>{" "}
            With 89% of Lightcast's customers saying AI makes LMI more critical,
            the question is no longer whether universities need structured
            program assessment — it's which standard they'll adopt. DFVA's
            methodology-first, evidence-grounded, platform-agnostic approach is
            the credible answer.
          </p>
        </div>
      </section>

      {/* Related Signals */}
      {relatedSignals.length > 0 && (
        <section className="mb-10">
          <h2 className="text-foreground mb-4 flex items-center gap-2 text-xl font-semibold">
            Related Signals
          </h2>
          <div className="space-y-3">
            {relatedSignals.map((signal: any) => (
              <div
                key={signal.id}
                className="border-border bg-card rounded-lg border p-4"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">
                    {signal.source}
                  </span>
                  {signal.url && (
                    <a
                      href={signal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:bg-primary/10 rounded p-1 transition-colors"
                      aria-label={`Open ${signal.source} source (external link)`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {signal.relevantClaim}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* External link */}
      {primaryUrl && (
        <div className="text-center">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:bg-primary/10 inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
          >
            View original source <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
