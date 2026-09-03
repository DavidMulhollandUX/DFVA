import { Card, CardContent } from "../../../client/components/ui/card";
import { Cite } from "../HowThisRubricWorksDialog";
import { gateSummary } from "../gateState";
import { verificationClause } from "../verificationState";
import { V4_ADAPTIVENESS_MAX, V4_WORKPLACE_MAX } from "../data/v4Rubric";
import { V4_META } from "../data/v4Meta";
import type { V4PanelC } from "../data/v4PanelC";
import { CardLabel } from "./ReportChrome";
import {
  DRAFT_NOTICE_HAS_V31,
  DRAFT_NOTICE_LABEL,
  DRAFT_NOTICE_NO_V31,
  HOW_FIRM_LEAD,
  HOW_FIRM_LINK,
  HOW_FIRM_TAIL,
  LABEL_HOW_FIRM,
  LABEL_THE_FINDING,
  LABEL_WHAT_IT_MEANS,
  WHAT_IT_MEANS_BODY,
  draftNoticeComparability,
  gapSummary,
  strengthSummary,
} from "./copy";

/** Part A's opening card: the draft-instrument notice, the finding sentence
 *  derived from this program's own scores, and the two bounding readings. */
export function FindingPanel({
  panelC,
  hasV31,
}: {
  panelC: V4PanelC;
  /** Whether an earlier v3.1 assessment of record exists for this program. */
  hasV31: boolean;
}) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="bg-card-accent text-muted-foreground mb-5 flex items-start gap-2 rounded-md p-3 text-sm">
          <span className="text-foreground text-xs font-semibold tracking-wide uppercase">
            {DRAFT_NOTICE_LABEL}
          </span>
          <span data-testid="v4-draft-notice">
            Panel C v4 anchors Curriculum Adaptiveness on the four adaptive
            capabilities defined in guidance commissioned by TEQSA (Lodge et
            al., 2026
            <Cite refs={[1]} />
            ). It is a working-draft instrument, applied here as a pilot. The
            adaptiveness score is not comparable with the published v3.1 value
            {draftNoticeComparability(V4_META.complete)}.{" "}
            {hasV31 ? DRAFT_NOTICE_HAS_V31 : DRAFT_NOTICE_NO_V31}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <CardLabel>{LABEL_THE_FINDING}</CardLabel>
            <p
              className="text-foreground text-base leading-relaxed"
              data-testid="finding-block"
            >
              On the v4 draft instrument this program scores{" "}
              {panelC.adaptiveness}/{V4_ADAPTIVENESS_MAX} for curriculum
              adaptiveness and {panelC.workplace}/{V4_WORKPLACE_MAX} for
              workplace practice, with {gateSummary(panelC)}.{" "}
              {strengthSummary(panelC)} {gapSummary(panelC)}
            </p>
          </div>
          <div>
            <CardLabel>{LABEL_WHAT_IT_MEANS}</CardLabel>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {WHAT_IT_MEANS_BODY}
            </p>
          </div>
          <div>
            <CardLabel>{LABEL_HOW_FIRM}</CardLabel>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {HOW_FIRM_LEAD} {verificationClause(panelC.verified)}
              {HOW_FIRM_TAIL}{" "}
              <a
                href="#method"
                className="text-secondary-muted-foreground underline"
              >
                {HOW_FIRM_LINK}
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
