import ValidationSignalCard from "./ValidationSignalCard";
import CompetitiveLandscape from "./CompetitiveLandscape";
import CompetitiveTimeline from "./CompetitiveTimeline";
import MarketWindowIndicator from "./MarketWindowIndicator";
import {
  validationSignals,
  competitiveEvents,
  marketWindow,
} from "./data/marketValidationData";

export default function MarketValidationPage() {
  // --- Loading skeleton concept ---
  // In a future version, wrap each section with:
  //   const { data, isLoading } = useQuery(getValidationSignals);
  //   if (isLoading) return <LoadingSkeleton />;
  //   if (!data) return <EmptyState />;
  // For v1, we render from the static data imports directly.

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-10">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Market Position &amp; Validation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Independent evidence, competitive intelligence, and market-window
          analysis supporting DFVA&rsquo;s positioning as the curriculum
          analytics standard.
        </p>
      </div>

      {/* ── Section 1: Third-Party Validation ── */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Third-Party Validation
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Independent sources confirm the market gap DFVA addresses.
        </p>
        <hr className="border-border mb-6" />

        {validationSignals.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No validation signals available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validationSignals.map((signal, i) => (
              <ValidationSignalCard key={i} signal={signal} />
            ))}
          </div>
        )}
      </section>

      {/* ── Section 2: Competitive Landscape ── */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Competitive Landscape
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          How DFVA compares against curriculum-platform vendors on analytics
          maturity and market traction.
        </p>
        <hr className="border-border mb-6" />

        <div className="space-y-8">
          <CompetitiveLandscape />
          <CompetitiveTimeline events={competitiveEvents} />
        </div>
      </section>

      {/* ── Section 3: Market Window ── */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Market Window
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Summary assessment of the current market window for an independent
          curriculum analytics standard.
        </p>
        <hr className="border-border mb-6" />

        <MarketWindowIndicator
          windowSnapshot={{
            status: marketWindow.status,
            urgencyText: marketWindow.urgencyText,
            keyThreats: marketWindow.keyThreats,
            recommendedActions: marketWindow.recommendedActions,
          }}
        />
      </section>
    </div>
  );
}
