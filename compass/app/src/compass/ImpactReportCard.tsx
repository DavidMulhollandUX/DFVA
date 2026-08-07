import { useQuery } from "wasp/client/operations";
import { getValidationSignals } from "wasp/client/operations";
import { BarChart3, ExternalLink, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

/**
 * ImpactReportCard — hero stat card for the Lightcast 2026 Customer Impact Report.
 * Fetches MarketValidationSignal records filtered by source containing "Lightcast 2026"
 * and renders three stat cards with the key findings.
 */
export default function ImpactReportCard() {
  const { data: signals, isLoading } = useQuery(getValidationSignals);
  const [analysisExpanded, setAnalysisExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="border-border bg-card animate-pulse rounded-lg border p-6">
        <div className="bg-muted mb-4 h-5 w-48 rounded" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted/50 rounded-lg p-4">
              <div className="bg-muted mb-2 h-10 w-20 rounded" />
              <div className="bg-muted h-4 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const lightcastSignals = (signals ?? []).filter(
    (s: any) =>
      s.source?.includes("Lightcast 2026") ||
      s.source?.includes("TIME Top WorkTech"),
  );

  if (lightcastSignals.length === 0) {
    return (
      <div className="border-border bg-card rounded-lg border p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Market validation data loading…
        </p>
      </div>
    );
  }

  // Extract the key stat signals
  const findSignal = (keyword: string) =>
    lightcastSignals.find((s: any) => s.excerpt?.includes(keyword));

  const stat96 = findSignal("96%");
  const stat90 = findSignal("90%");
  const stat89 = findSignal("89%");
  const timeSignal = findSignal("TIME Top");
  const reportUrl =
    lightcastSignals.find((s: any) => s.url)?.url ??
    "https://lightcast.io/resources/research/customer-impact-report-2026";

  const stats = [
    {
      percentage: "96%",
      description:
        "of ~1,000 customers say labour market intelligence is essential to their operations.",
      signal: stat96,
    },
    {
      percentage: "90%",
      description:
        "of education customers use LMI for program review — the exact use case DFVA serves.",
      signal: stat90,
    },
    {
      percentage: "89%",
      description:
        "say LMI becomes MORE critical as their organisation adopts AI.",
      signal: stat89,
    },
  ];

  return (
    <div
      className="border-border bg-card rounded-lg border"
      aria-label="Lightcast 2026 Customer Impact Report — Market Validation"
    >
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b px-6 py-4">
        <div>
          <h3 className="text-foreground flex items-center gap-2 text-lg font-semibold">
            <BarChart3 className="text-primary h-5 w-5" />
            Lightcast 2026 Customer Impact Report
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            ~1,000 customers surveyed · Source:{" "}
            <span className="font-medium">Lightcast</span>
            {timeSignal && (
              <>
                {" "}
                ·{" "}
                <span className="text-primary font-medium">
                  TIME Top WorkTech 2026
                </span>
              </>
            )}
          </p>
        </div>
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:bg-primary/10 shrink-0 rounded-md p-2 transition-colors"
          aria-label="Open Lightcast 2026 report (external link)"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.percentage}
            className="bg-primary/5 border-primary/10 rounded-lg border p-4 text-center"
          >
            <div className="text-primary mb-1 font-mono text-3xl font-bold tracking-tight">
              {stat.percentage}
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* "What this means for DFVA" — collapsible analysis */}
      <div className="border-border border-t">
        <button
          onClick={() => setAnalysisExpanded(!analysisExpanded)}
          className="text-muted-foreground hover:text-foreground flex w-full items-center justify-between px-6 py-3 text-sm font-medium transition-colors"
          aria-expanded={analysisExpanded}
          aria-controls="dfva-analysis-block"
        >
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            What this means for DFVA
          </span>
          {analysisExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {analysisExpanded && (
          <div
            id="dfva-analysis-block"
            className="text-muted-foreground space-y-4 px-6 pb-6 text-sm leading-relaxed"
          >
            <p>
              <strong className="text-foreground">
                LMI demand is proven and growing.
              </strong>{" "}
              Lightcast's own customer research — surveying approximately 1,000
              institutions — confirms what DFVA's thesis predicted: labour
              market intelligence is no longer optional. With 96% calling it
              essential and 90% already using it for program review, the market
              has moved past "should we?" to "how do we do it well?" DFVA's
              11-dimension scoring methodology provides the structured,
              education-specific answer that generic LMI data cannot.
            </p>

            <p>
              <strong className="text-foreground">
                Lightcast validates the category but doesn't own the
                methodology.
              </strong>{" "}
              Lightcast provides the raw LMI data — employment rates, salary
              trends, job posting volumes. But turning that data into actionable
              curriculum decisions requires an assessment framework that
              connects labour market signals to specific program dimensions:
              automation exposure, systems thinking, AI literacy, research
              rigour. Lightcast's data answers "what jobs exist?"; DFVA answers
              "is this degree preparing students for them?" The two are
              complementary, and DFVA's methodology layer is the
              differentiator.
            </p>

            <p>
              <strong className="text-foreground">
                AI adoption amplifies the need — exactly as DFVA predicted.
              </strong>{" "}
              The finding that 89% of customers say LMI becomes MORE critical
              with AI adoption is the strongest validation yet of DFVA's core
              thesis. As institutions deploy AI tools, the question "which
              degrees are durable?" becomes urgent, not academic. Every
              university investing in AI needs a framework to assess which
              programs remain viable — and that's exactly what DFVA delivers.
            </p>

            <p>
              <strong className="text-foreground">
                The competitive window is narrowing.
              </strong>{" "}
              Lightcast was named to TIME's Top WorkTech Companies 2026,
              confirming their brand strength in the education market.
              Coursedog has launched an Assessment Cloud with ClassRanked
              integration. CourseLeaf is expanding analytics. The market is
              converging on data-driven curriculum decisions — and DFVA's
              independent, methodology-first approach must establish its
              position before vendor-integrated analytics become "good enough."
            </p>

            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
            >
              Read the full report <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
