import {
  Card,
  CardContent,
  CardTitle,
} from "../../../client/components/ui/card";
import { Cite, HowThisRubricWorksDialog } from "../HowThisRubricWorksDialog";
import {
  V4_ADAPTIVENESS_MAX,
  V4_RUBRIC,
  V4_WORKPLACE_MAX,
} from "../data/v4Rubric";
import type { V4PanelC } from "../data/v4PanelC";
import { CardLabel } from "./ReportChrome";
import { GatesPanel } from "./GatesPanel";
import { RatedV4Item } from "./RatedItem";
import {
  LABEL_SUBSCALES,
  TITLE_ADAPTIVE,
  TITLE_WORKPLACE,
  TOTAL_ADAPTIVENESS,
  TOTAL_WORKPLACE,
  WORKPLACE_PENDING,
  envelopeNote,
} from "./copy";

/** The scored axis: five adaptive-capability items, the v4.1 workplace
 *  sub-scale, and the preconditions the scores rest on. */
export function Scorecard({
  panelC,
  workplaceScored,
  wEnvelope,
}: {
  panelC: V4PanelC;
  /** v4.1 added W1–W3; a program scored on 4.0-draft carries none of them. */
  workplaceScored: boolean;
  wEnvelope: [number, number];
}) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <CardLabel>{LABEL_SUBSCALES}</CardLabel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-lg">{TITLE_ADAPTIVE}</CardTitle>
          <HowThisRubricWorksDialog />
        </div>
        <p className="text-muted-foreground mt-1 mb-6 text-sm">
          Five items anchored on the TEQSA adaptive capabilities
          <Cite refs={[1]} />, scored 0–3 from 2026 handbook evidence — what
          makes a graduate durable as AI takes over tasks. Each item can be
          expanded to show the construct, the level anchors, the reasoning for
          the score, and the handbook passages quoted verbatim. Level 3 requires
          assessment evidence; a capability stated only in learning outcomes is
          scored at level 1.
        </p>
        <div className="flex flex-col gap-3">
          {V4_RUBRIC.filter((item) => item.subscale === "adaptive").map(
            (item) => (
              <RatedV4Item
                key={item.id}
                item={item}
                result={panelC[item.id as "C1" | "C2" | "C3" | "C4" | "C5"]}
              />
            ),
          )}
        </div>
        <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-muted-foreground text-sm">
            {TOTAL_ADAPTIVENESS}
          </span>
          <span className="font-mono text-xl font-semibold">
            {panelC.adaptiveness}
            <span className="text-muted-foreground text-sm">
              {" "}
              / {V4_ADAPTIVENESS_MAX}
            </span>
          </span>
        </div>

        {/* Sub-scale W — added in v4.1. Programs scored under 4.0-draft carry
            no W items; they are re-scored, never back-filled, so the block
            states its own absence rather than rendering empty rows. */}
        <div className="border-border mt-8 border-t pt-6">
          <CardTitle className="text-lg">{TITLE_WORKPLACE}</CardTitle>
          <p className="text-muted-foreground mt-1 mb-6 text-sm">
            Three items covering what makes a graduate effective in any
            workplace, including AI-integrated ones: professional communication
            and conduct, authentic task design, and work-situated learning.
            Anchored on the Higher Education Standards Framework 2021
            <Cite refs={[19]} />, the national Employer Satisfaction Survey
            domains
            <Cite refs={[20]} />, and the authentic-assessment and
            work-integrated-learning literatures
            <Cite refs={[22, 23, 27]} />. Reported beside the adaptiveness
            score, never added to it.
          </p>
          {workplaceScored ? (
            <>
              <div className="flex flex-col gap-3">
                {V4_RUBRIC.filter((item) => item.subscale === "workplace").map(
                  (item) => (
                    <RatedV4Item
                      key={item.id}
                      item={item}
                      result={panelC[item.id as "W1" | "W2" | "W3"]!}
                    />
                  ),
                )}
              </div>
              <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-muted-foreground text-sm">
                  {TOTAL_WORKPLACE}
                </span>
                <span className="font-mono text-xl font-semibold">
                  {panelC.workplace}
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / {V4_WORKPLACE_MAX}
                  </span>
                </span>
              </div>
              <p className="text-muted-foreground mt-1 text-right text-xs">
                {envelopeNote(wEnvelope[0], wEnvelope[1])}
              </p>
            </>
          ) : (
            <p
              className="bg-card-accent text-muted-foreground rounded-md p-3 text-sm"
              data-testid="v4-workplace-pending"
            >
              {WORKPLACE_PENDING}
            </p>
          )}
        </div>
        <GatesPanel panelC={panelC} />
      </CardContent>
    </Card>
  );
}
