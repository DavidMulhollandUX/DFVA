import { useState } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../client/components/ui/card";
import { InsightsGate } from "../InsightsGate";
import { ExposureMatrix } from "./components/ExposureMatrix";
import { MigrationTable } from "./components/MigrationTable";
import { FACULTIES, V2_META, V2_PROGRAMS } from "./data/v2Programs";

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

export default function MatrixDashboardPage() {
  const [activeFaculty, setActiveFaculty] = useState<string | null>(null);

  const plottedAll = V2_PROGRAMS.filter((p) => p.has_jir);
  const plottedActive = activeFaculty
    ? plottedAll.filter((p) => p.faculty === activeFaculty)
    : plottedAll;
  const tablePrograms = activeFaculty
    ? V2_PROGRAMS.filter((p) => p.faculty === activeFaculty)
    : V2_PROGRAMS;

  return (
    <InsightsGate>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            Durability Assessment · v2
          </p>
          <h1 className="text-foreground font-serif text-4xl tracking-tight">
            Portfolio Matrix
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            2×2 design: curriculum adaptiveness × destination AI exposure —
            across all {V2_META.total} assessed programs.{" "}
            <Link to="/insights/v1" className="text-secondary-muted-foreground underline">
              View the v1 insights hub
            </Link>
          </p>
        </div>

        {/* Methodology note */}
        <Card className="mb-6">
          <CardContent className="text-muted-foreground pt-6 text-sm leading-relaxed">
            <p className="mb-3">
              <strong className="text-foreground">
                Panel A (X-axis): Destination AI Exposure
              </strong>{" "}
              — unweighted mean Felten AIOE of graduate destination occupations
              from JIR data, rescaled 0–100. {V2_META.with_exposure} of{" "}
              {V2_META.total} programs have JIR matches; the rest appear in the
              table but not on the chart.
            </p>
            <p className="mb-3">
              <strong className="text-foreground">
                Panel C (Y-axis): Curriculum Adaptiveness
              </strong>{" "}
              — sum of scored v2 dimensions only: D2 Systems Thinking, D3
              Technical Depth, D7 Research Methods, B Irreplaceability, D5 AI
              Literacy (0–15). D4 and D6 are binary gates (not summed). D9 is
              dropped. D1/D8 are measured (Panel A), not scored. D10 is evidence
              confidence metadata (Panel D).
            </p>
            <p>
              <strong className="text-foreground">Quadrant thresholds:</strong>{" "}
              portfolio medians (exposure = {V2_META.exp_median}, adaptiveness ={" "}
              {V2_META.adapt_median} / 15) — descriptive, not
              criterion-referenced.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Panel C: Curriculum Adaptiveness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StatRow label="Scored dimensions" value="D2, D3, D7, B, D5 (0–15)" />
              <StatRow
                label="Range"
                value={`${V2_META.adapt_range[0]} – ${V2_META.adapt_range[1]}`}
              />
              <StatRow
                label="Median threshold"
                value={`${V2_META.adapt_median} / 15`}
              />
              <StatRow label="Dropped" value="D9 (item-total 0.06)" />
              <StatRow label="Gates (not summed)" value="D4, D6 (>70% modal)" />
              <StatRow label="Measured, not scored" value="D1 + D8 → Panel A" />
              <StatRow label="Evidence metadata" value="D10 → Panel D" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Panel A: Destination AI Exposure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StatRow
                label="Programs with JIR data"
                value={`${V2_META.with_exposure} / ${V2_META.total}`}
              />
              <StatRow
                label="Exposure range"
                value={`${V2_META.exp_range[0]} – ${V2_META.exp_range[1]} (AIOE)`}
              />
              <StatRow label="Median threshold" value={`${V2_META.exp_median}`} />
              <StatRow label="Source" value="JIR destinations → Felten AIOE" />
              <StatRow
                label="Exposure ≠ risk"
                value={
                  <span className="text-secondary-muted-foreground">
                    Axis encodes task overlap, not risk direction
                  </span>
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Matrix */}
        <Card className="mb-6">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">
              Curriculum Adaptiveness × Destination AI Exposure (
              {plottedActive.length} programs)
            </CardTitle>
            <div className="text-muted-foreground flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3B82C4]" />
                JIR destination data
              </span>
              <span className="flex items-center gap-1.5">
                <span className="bg-muted-foreground/50 inline-block h-2.5 w-2.5 rounded-full" />
                No JIR (not plotted)
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFaculty(null)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  activeFaculty === null
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                All ({plottedAll.length} plotted)
              </button>
              {FACULTIES.map((f) => {
                const count = V2_PROGRAMS.filter(
                  (p) => p.faculty === f && p.has_jir,
                ).length;
                return (
                  <button
                    key={f}
                    onClick={() =>
                      setActiveFaculty(activeFaculty === f ? null : f)
                    }
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                      activeFaculty === f
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {f} ({count})
                  </button>
                );
              })}
            </div>
            <ExposureMatrix
              programs={V2_PROGRAMS}
              activeFaculty={activeFaculty}
            />
          </CardContent>
        </Card>

        {/* Migration table */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">
              {activeFaculty
                ? `${activeFaculty} programs`
                : `All ${V2_META.total} Programs`}
            </CardTitle>
            <span className="text-muted-foreground text-xs">
              v1 band → v2 quadrant migration
            </span>
          </CardHeader>
          <CardContent>
            <MigrationTable programs={tablePrograms} />
          </CardContent>
        </Card>
      </div>
    </InsightsGate>
  );
}
