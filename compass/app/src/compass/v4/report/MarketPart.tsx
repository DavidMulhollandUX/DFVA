import { Cite } from "../HowThisRubricWorksDialog";
import { ReportMarkdownCard } from "../../v2/components/ReportMarkdownCard";
import { hasReportContent } from "../../reportContent/index";
import { V4_AUTHORED } from "../authoredSections";
import { isOwnRecord } from "../exposureBasis";
import type { V4PanelABasis } from "../data/v4PanelC";
import { LabourMarketCard } from "./LabourMarketCard";
import {
  CARD_ASSESSOR_LABEL,
  CARD_ASSESSOR_SUBTITLE,
  CARD_ASSESSOR_TITLE,
  CARD_PLAN_LABEL,
  CARD_PLAN_SUBTITLE,
  CARD_PLAN_TITLE,
  MARKET_INTRO_HEAD,
  MARKET_INTRO_TAIL,
  NO_MARKET_BOUNDS_LEAD,
  NO_MARKET_BOUNDS_TAIL,
  NO_MARKET_OWN_RECORD,
  NO_MARKET_TITLE,
  NO_PLAN_TITLE,
  noMarketBody,
  noPlanBody,
} from "./copy";

/** Part B: the market evidence this program's improvement plan is derived
 *  from, and the plan itself — or the reason either is missing. */
export function MarketPart({
  program,
  hasMarketReport,
  exposure,
  basis,
}: {
  program: { code: string; name: string };
  hasMarketReport: boolean;
  exposure: number | null;
  basis: V4PanelABasis | undefined;
}) {
  return (
    <>
      {hasMarketReport ? (
        <p className="text-muted-foreground mb-5 text-sm">
          {MARKET_INTRO_HEAD}
          <Cite refs={[1]} />
          {MARKET_INTRO_TAIL}
        </p>
      ) : (
        <div
          className="border-border text-muted-foreground mb-5 rounded-lg border border-dashed p-5 text-sm"
          data-testid="v4-no-market"
        >
          <p className="text-foreground mb-1 font-medium">{NO_MARKET_TITLE}</p>
          <p>
            {noMarketBody(program.name)}
            {exposure !== null && isOwnRecord(basis) && (
              <> {NO_MARKET_OWN_RECORD}</>
            )}
          </p>
          <p className="mt-2">
            {NO_MARKET_BOUNDS_LEAD}
            {exposure !== null ? " and the destination profile" : " alone"}{" "}
            {NO_MARKET_BOUNDS_TAIL}
          </p>
        </div>
      )}

      <ReportMarkdownCard
        slug={`dfva-v4-${program.code}`}
        label={CARD_ASSESSOR_LABEL}
        title={CARD_ASSESSOR_TITLE}
        subtitle={CARD_ASSESSOR_SUBTITLE}
        sectionFilter={V4_AUTHORED}
      />
      <LabourMarketCard code={program.code} />
      <div id="plan" className="scroll-mt-6">
        {hasReportContent(`dfva-v4-recommend-${program.code}`) ? (
          <ReportMarkdownCard
            slug={`dfva-v4-recommend-${program.code}`}
            label={CARD_PLAN_LABEL}
            title={CARD_PLAN_TITLE}
            subtitle={CARD_PLAN_SUBTITLE}
          />
        ) : (
          <div
            className="border-border text-muted-foreground mt-6 rounded-lg border border-dashed p-5 text-sm"
            data-testid="v4-no-plan"
          >
            <p className="text-foreground mb-1 font-medium">{NO_PLAN_TITLE}</p>
            <p>{noPlanBody(program.name)}</p>
          </div>
        )}
      </div>
    </>
  );
}
