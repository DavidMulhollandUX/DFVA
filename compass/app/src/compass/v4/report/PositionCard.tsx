import { Card, CardContent } from "../../../client/components/ui/card";
import { QUADRANTS } from "../../v2/quadrants";
import { V4_ADAPTIVENESS_MAX } from "../data/v4Rubric";
import { V4_META, type V4PanelABasis, type V4PanelC } from "../data/v4PanelC";
import { V4_TIER_LABELS, describeBasis, isOwnRecord } from "../exposureBasis";
import { V4_QUADRANT_LABELS as QUADRANT_LABELS } from "../v4Position";
import { CardLabel } from "./ReportChrome";
import { V4MiniMatrix } from "./PositionPlane";
import {
  CEILING_BODY,
  EXPOSURE_BASIS_LEAD,
  EXPOSURE_MEASURED,
  EXPOSURE_NONE,
  EXPOSURE_PROCEDURE,
  FIELD_BASIS_NOTE,
  LABEL_ADAPTIVENESS_AXIS,
  LABEL_EXPOSURE_AXIS,
  LABEL_POSITION_AXIS,
  LABEL_POSITION_CARD,
  NO_BASIS_BODY,
  NO_EXPOSURE_WITHHELD_LEAD,
  NO_MATRIX_BODY,
  NO_MATRIX_TITLE,
  NO_MEDIAN_FOR_BASIS,
  PLANE_CAPTION_TAIL,
  PLANE_FIELD_MEDIAN_CLAUSE,
  ceilingHeadline,
  dominantShareNote,
  envelopeNote,
  excludedSourceNote,
  noAdaptMedianClause,
  placedNote,
  planeCaptionLead,
  unplacedChip,
  withheldNote,
} from "./copy";

type QuadrantKey = keyof typeof QUADRANT_LABELS;

/** The coordinates card: the two axis values, the position chip (or the
 *  reason there is none), the basis the exposure was computed on, and the
 *  exposure–adaptiveness plane. */
export function PositionCard({
  program,
  panelC,
  exposure,
  basis,
  expMedian,
  position,
  jirN,
  nTitles,
  weightedDiffers,
  envelope,
  itemsAtCeiling,
  itemCount,
}: {
  program: { code: string; name: string };
  panelC: V4PanelC;
  exposure: number | null;
  basis: V4PanelABasis | undefined;
  expMedian: number | null;
  position: QuadrantKey | null;
  jirN: number | null;
  nTitles: number | null;
  /** The share-weighted exposure differs enough from the unweighted value
   *  that publishing only one of them would hide the difference. */
  weightedDiffers: boolean;
  envelope: [number, number];
  itemsAtCeiling: number;
  itemCount: number;
}) {
  const ownRecord = isOwnRecord(basis) || !basis;
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <CardLabel>{LABEL_POSITION_CARD}</CardLabel>
        <div className="grid gap-6">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <div>
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  {LABEL_EXPOSURE_AXIS}
                </p>
                {exposure !== null ? (
                  <>
                    <p
                      className="font-mono text-4xl font-semibold"
                      data-testid="v4-exposure"
                    >
                      {exposure.toFixed(2)}
                    </p>
                    <p
                      className="text-muted-foreground text-xs"
                      data-testid="v4-exposure-basis"
                    >
                      {basis ? V4_TIER_LABELS[basis.tier] : EXPOSURE_MEASURED}
                      {expMedian !== null
                        ? ` · ${
                            basis?.tier === "field"
                              ? "field-basis"
                              : "portfolio"
                          } median ${expMedian}`
                        : NO_MEDIAN_FOR_BASIS}
                    </p>
                    {weightedDiffers && basis && (
                      <p
                        className="text-muted-foreground text-xs"
                        data-testid="v4-exposure-weighted"
                      >
                        share-weighted {basis.exposureWeighted?.toFixed(2)}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p
                      className="text-muted-foreground font-mono text-4xl font-semibold"
                      data-testid="v4-exposure"
                    >
                      —
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {EXPOSURE_NONE}
                    </p>
                  </>
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  {LABEL_ADAPTIVENESS_AXIS}
                </p>
                <p
                  className="font-mono text-4xl font-semibold"
                  data-testid="v4-adaptiveness"
                >
                  {panelC.adaptiveness}
                  <span className="text-muted-foreground text-lg">
                    /{V4_ADAPTIVENESS_MAX}
                  </span>
                </p>
                <p className="text-muted-foreground text-xs">
                  {envelopeNote(envelope[0], envelope[1])}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  {LABEL_POSITION_AXIS}
                </p>
                {position ? (
                  <span
                    className={`mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${QUADRANTS[position].badgeClass}`}
                    data-testid="v4-position-chip"
                  >
                    {QUADRANT_LABELS[position]}
                  </span>
                ) : (
                  <span
                    className="bg-muted text-muted-foreground mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold"
                    data-testid="v4-position-chip"
                  >
                    {unplacedChip(
                      exposure !== null,
                      expMedian !== null,
                      V4_META.scored,
                      V4_META.cohortSize,
                    )}
                  </span>
                )}
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              {exposure !== null ? (
                <>
                  {EXPOSURE_BASIS_LEAD}{" "}
                  <span data-testid="v4-basis-description">
                    {describeBasis(basis, jirN, nTitles)}
                  </span>
                  {EXPOSURE_PROCEDURE}
                  {basis?.dominantShare &&
                    dominantShareNote(
                      basis.dominantShare.name,
                      Math.round(basis.dominantShare.share * 100),
                    )}
                  {basis?.excludedSources?.length ? (
                    <>
                      Set aside:{" "}
                      {basis.excludedSources
                        .map((x) => excludedSourceNote(x.name, x.refusedTitles))
                        .join("; ")}
                      .{" "}
                    </>
                  ) : null}
                  {basis?.tier === "field" && FIELD_BASIS_NOTE}
                </>
              ) : (
                NO_BASIS_BODY
              )}
              {position
                ? placedNote(
                    expMedian,
                    basis?.tier === "field",
                    V4_META.adaptMedian,
                    V4_META.cohortSize,
                  )
                : exposure !== null
                  ? withheldNote(V4_META.scored, V4_META.cohortSize)
                  : `${NO_EXPOSURE_WITHHELD_LEAD}${
                      V4_META.adaptMedian === null
                        ? noAdaptMedianClause(
                            V4_META.scored,
                            V4_META.cohortSize,
                          )
                        : ""
                    }.`}
            </p>
            <div className="bg-card-accent text-muted-foreground mt-4 flex items-start gap-2 rounded-md p-3 text-sm">
              <span className="text-base">⚠</span>
              <span>
                <strong className="text-foreground font-medium">
                  {ceilingHeadline(itemsAtCeiling, itemCount)}
                </strong>{" "}
                {CEILING_BODY}
              </span>
            </div>
          </div>
          <div className="w-full">
            {exposure !== null ? (
              <>
                <V4MiniMatrix
                  program={{
                    code: program.code,
                    name: program.name,
                    exposure,
                  }}
                  adaptiveness={panelC.adaptiveness}
                  envelope={envelope}
                  workplace={panelC.workplace}
                  basis={basis}
                />
                <p className="text-muted-foreground mt-1 text-xs">
                  {planeCaptionLead(
                    ownRecord,
                    basis ? V4_TIER_LABELS[basis.tier] : "",
                  )}
                  {basis?.tier === "field" ? PLANE_FIELD_MEDIAN_CLAUSE : ""}
                  {PLANE_CAPTION_TAIL}
                </p>
              </>
            ) : (
              <div
                className="border-border text-muted-foreground rounded-lg border border-dashed p-5 text-sm"
                data-testid="v4-no-matrix"
              >
                <p className="text-foreground mb-1 font-medium">
                  {NO_MATRIX_TITLE}
                </p>
                <p>{NO_MATRIX_BODY}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
