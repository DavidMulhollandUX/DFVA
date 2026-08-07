import { AlertTriangle, ExternalLink, TrendingUp, ChevronDown, ChevronUp, Swords } from "lucide-react";
import { useState } from "react";
import type { CompetitiveEvent } from "wasp/entities";
import { useQuery } from "wasp/client/operations";
import { getCompetitiveEvents } from "wasp/client/operations";

export interface CompetitiveThreatCardProps {
  event?: CompetitiveEvent | null;
  variant?: "threat" | "opportunity";
}

/**
 * Returns a human-readable impact label based on the 1-5 impactScore.
 * Since the DB stores 1-5 but the conceptual scale is 0-10, we double for display.
 */
function impactLabel(impactScore: number): {
  label: string;
  color: string;
  bg: string;
  border: string;
} {
  const displayScore = impactScore * 2; // scale 1-5 → 2-10
  if (displayScore >= 8) {
    return {
      label: "High Threat",
      color: "text-red-600",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    };
  }
  if (displayScore >= 5) {
    return {
      label: "Moderate Threat",
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    };
  }
  return {
    label: "Low Threat",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  };
}

/**
 * Static "What this means for DFVA" analysis mapped by event title.
 * NOT LLM-generated — strategic judgment, consistent across all surfaces.
 */
function whatThisMeans(title: string): {
  paragraphs: string[];
  sourceUrl: string | null;
} {
  if (title.includes("Assessment") && title.includes("Third Product Pillar")) {
    return {
      paragraphs: [
        "Coursedog making Assessment a product pillar (not a feature) signals long-term intent to own this space. This validates DFVA's thesis that assessment is a standalone category, not a feature of operations software.",
        "Coursedog's Assessment Cloud is descriptive analytics (what IS happening with course evaluations, demand projections). DFVA is prescriptive (what SHOULD exist for a durable degree). The gap is measurement depth — 11-dimension durability scoring vs generic AI insights.",
        "Coursedog's assessment is integrated with their workflow platform — the assessment exists to optimize the platform's scheduling and curriculum features. DFVA is platform-agnostic — the assessment exists to inform institutional strategy, regardless of which curriculum system is used.",
        "The Academic Operations Conference is Coursedog attempting to own the category narrative. DFVA should establish its independent assessment standard framing before integrated assessment becomes the default mental model.",
      ],
      sourceUrl: "https://www.coursedog.com/product/assessment",
    };
  }

  if (title.includes("CourseLeaf") && title.includes("Analytics")) {
    return {
      paragraphs: [
        "CourseLeaf adding analytics features isn't a threat — it's market validation. The largest curriculum platform (29% share) is investing in analytics, confirming the market is converging toward data-centric operations — exactly where DFVA predicted it would go.",
        "But CourseLeaf's architecture creates an opportunity: their data is stored as unstructured HTML blocks (confirmed by three independent open-source projects building custom extraction tools). Any analytics they build sit on a fragile foundation. DFVA's structured, schema-first data model enables analytics depth they cannot match.",
        "DFVA isn't competing with CourseLeaf — it's completing it. Institutions keep CourseLeaf for curriculum workflow; they add DFVA for strategic program assessment. This 'complementary analytics layer' positioning makes DFVA an easy add-on purchase, not a rip-and-replace decision.",
        "The market window is actually OPENING here, not closing. As CourseLeaf educates the market about analytics, more institutions will discover their platform can't deliver the depth they need — creating demand for DFVA's independent standard.",
      ],
      sourceUrl: "https://www.courseleaf.com/products/",
    };
  }

  // Default: generic competitive analysis
  return {
    paragraphs: [
      "This competitor move signals continued market investment in the academic operations space — validating DFVA's thesis that structured program assessment is an emerging category.",
      "DFVA's differentiation remains: independent methodology, platform-agnostic architecture, and prescriptive (not descriptive) analytics. Vendor-integrated assessment optimises the vendor's platform; DFVA optimises the institution's strategy.",
    ],
    sourceUrl: null,
  };
}

function CompetitiveThreatCardSkeleton() {
  return (
    <div className="border-border bg-card animate-pulse rounded-lg border p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="bg-muted h-5 w-20 rounded" />
        <div className="bg-muted h-5 w-32 rounded" />
      </div>
      <div className="bg-muted mb-2 h-6 w-3/4 rounded" />
      <div className="bg-muted mb-4 h-4 w-full rounded" />
      <div className="bg-muted h-4 w-2/3 rounded" />
    </div>
  );
}

function CompetitiveThreatCardEmpty() {
  return (
    <div className="border-border bg-card rounded-lg border p-6 text-center">
      <Swords className="text-muted-foreground/40 mx-auto mb-3 h-8 w-8" />
      <p className="text-muted-foreground text-sm">
        Competitive intelligence data loading…
      </p>
    </div>
  );
}

/**
 * CompetitiveThreatCard — presents a single competitive event with threat level
 * indicator, collapsible DFVA analysis, and source attribution.
 *
 * Supports two variants:
 * - "threat" (default): red/amber styling, AlertTriangle icon, "Competitive Threat" label
 * - "opportunity": green/teal styling, TrendingUp icon, "Market Signal" label
 *
 * Data-driven — accepts a CompetitiveEvent object as a prop.
 */
export default function CompetitiveThreatCard({
  event,
  variant = "threat",
}: CompetitiveThreatCardProps) {
  const [analysisExpanded, setAnalysisExpanded] = useState(false);

  if (event === undefined) {
    return <CompetitiveThreatCardSkeleton />;
  }

  if (!event) {
    return <CompetitiveThreatCardEmpty />;
  }

  const impact = impactLabel(event.impactScore);
  const analysis = whatThisMeans(event.title);
  const displayScore = event.impactScore * 2; // scale 1-5 → 2-10 display

  const dateLabel = event.dateDiscovered
    ? new Date(event.dateDiscovered).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
      })
    : "Recent";

  // Variant-aware styling
  const isOpportunity = variant === "opportunity";
  const cardBorder = isOpportunity ? "border-teal-500/30" : impact.border;
  const badgeLabel = isOpportunity ? "Market Signal" : impact.label;
  const BadgeIcon = isOpportunity ? TrendingUp : AlertTriangle;
  const badgeColor = isOpportunity
    ? "text-teal-600 bg-teal-500/10"
    : `${impact.color} ${impact.bg}`;
  const analysisHeading = isOpportunity
    ? "Why this matters for DFVA"
    : "What this means for DFVA";
  const SectionIcon = isOpportunity ? TrendingUp : TrendingUp;
  const ariaLabel = isOpportunity
    ? `Market signal: ${event.competitor} — ${event.title}. Impact score: ${displayScore} out of 10`
    : `Competitive threat: ${event.competitor} — ${event.title}. Impact score: ${displayScore} out of 10`;

  return (
    <div
      className={`border-border bg-card rounded-lg border ${cardBorder}`}
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0 flex-1">
          {/* Signal level + competitor */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColor}`}
            >
              <BadgeIcon className="h-3 w-3" />
              {badgeLabel}
            </span>
            <span className="text-foreground text-sm font-semibold">
              {event.competitor}
            </span>
            <span className="text-muted-foreground text-xs">
              · Discovered {dateLabel}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-foreground mb-2 text-base font-semibold leading-snug">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Source link */}
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary shrink-0 rounded-md p-2 transition-colors"
            aria-label={`Open ${event.competitor} source (external link)`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Impact score bar */}
      <div className="border-border border-t px-5 py-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Impact:</span>
          <span className={`font-bold ${impact.color}`}>
            {displayScore}/10
          </span>
          <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full ${
                displayScore >= 8
                  ? "bg-red-500"
                  : displayScore >= 5
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              }`}
              style={{ width: `${(displayScore / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Analysis — collapsible */}
      <div className="border-border border-t">
        <button
          onClick={() => setAnalysisExpanded(!analysisExpanded)}
          className="text-muted-foreground hover:text-foreground flex w-full items-center justify-between px-5 py-3 text-sm font-medium transition-colors"
          aria-expanded={analysisExpanded}
          aria-controls={`dfva-analysis-${event.id}`}
        >
          <span className="flex items-center gap-2">
            <SectionIcon className="h-4 w-4" />
            {analysisHeading}
          </span>
          {analysisExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {analysisExpanded && (
          <div
            id={`dfva-analysis-${event.id}`}
            className="text-muted-foreground space-y-3 px-5 pb-5 text-sm leading-relaxed"
          >
            {analysis.paragraphs.map((p, i) => {
              // First sentence of first paragraph gets bold treatment
              if (i === 0) {
                const firstPeriod = p.indexOf(".");
                if (firstPeriod > 0) {
                  const bold = p.slice(0, firstPeriod + 1);
                  const rest = p.slice(firstPeriod + 1);
                  return (
                    <p key={i}>
                      <strong className="text-foreground">{bold}</strong>
                      {rest}
                    </p>
                  );
                }
              }
              return <p key={i}>{p}</p>;
            })}

            {analysis.sourceUrl && (
              <a
                href={analysis.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                View source <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
