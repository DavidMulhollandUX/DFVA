import { Link } from "react-router";
import { brand } from "../../../branding/brandConfig";
import {
  Card,
  CardContent,
  CardTitle,
} from "../../../client/components/ui/card";
import { InsightsGate } from "../../InsightsGate";
import { ReportMarkdownCard } from "../../v2/components/ReportMarkdownCard";
import type { PROGRAMS } from "../../sharedProgramData";
import { V4_INSTRUMENT } from "../data/v4Rubric";
import { CardLabel, PartHeading } from "./ReportChrome";
import { ReportHero } from "./ReportHero";
import { LabourMarketCard } from "./LabourMarketCard";
import {
  ARCHIVED_ASSESSMENT_BODY,
  CARD_RESEARCH_FINDING_LABEL,
  CARD_RESEARCH_FINDING_SUBTITLE,
  CARD_RESEARCH_FINDING_TITLE,
  CARD_RESEARCH_LIMITS_LABEL,
  CARD_RESEARCH_LIMITS_SUBTITLE,
  CARD_RESEARCH_LIMITS_TITLE,
  CARD_RESEARCH_PROVENANCE_LABEL,
  CARD_RESEARCH_PROVENANCE_SUBTITLE,
  CARD_RESEARCH_PROVENANCE_TITLE,
  LABEL_ADAPTIVENESS,
  LABEL_EXPOSURE,
  LABEL_EARLIER_INSTRUMENT,
  LINK_ARCHIVED_V1_ASSESSMENT,
  LINK_ARCHIVED_V1_PLAN,
  LABEL_RESEARCH_NO_PLAN,
  TITLE_RESEARCH_NO_PLAN,
  researchNoPlanBody,
  LABEL_POSITION_AXIS,
  LINK_BACK_TO_REPORTS,
  NAV_PART_A,
  NAV_PART_B_RESEARCH,
  NAV_PART_C_RESEARCH,
  PART_A,
  PART_A_TITLE,
  PART_B,
  PART_B_TITLE_RESEARCH,
  PART_C,
  PART_C_TITLE_RESEARCH,
  RESEARCH_ADAPTIVENESS_NOTE,
  RESEARCH_EXPOSURE_NOTE,
  RESEARCH_MARKET_INTRO,
  RESEARCH_NO_RATING_LABEL,
  RESEARCH_POSITION_NOTE,
  TITLE_ARCHIVED_ASSESSMENT,
  researchNoRatingNotice,
} from "./copy";

/** Section routing for the research-degree body. Its four sections map onto the
 *  same three parts every other Durability Report uses, so a reader moving
 *  between a scored program and a research degree meets one layout, not two. */
export const V4R_FINDING = (t: string) =>
  /NO v4 SCORE|CARRIED FORWARD/i.test(t);
export const V4R_MARKET = (t: string) => /^MARKET EVIDENCE/i.test(t);
export const V4R_LIMITS = (t: string) => /^LIMITATIONS/i.test(t);

/**
 * A research degree rendered in the v4 report format.
 *
 * It carries no rating and never will — a research degree is examined on an
 * original contribution rather than a taught curriculum, and no destination
 * distribution resolves for one. The page therefore has no score panel, no
 * matrix and no gates. Everything else is the v4 layout: the same hero, the
 * same Part A / B / C spine, the same cards. The body is the v4r report, whose
 * content is carried from the retired v1 instrument.
 */
export function V4ResearchReport({
  code,
  name,
  faculty,
  v1,
}: {
  code: string;
  name: string;
  faculty: string;
  v1: (typeof PROGRAMS)[number] | undefined;
}) {
  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <ReportHero
          instrument={V4_INSTRUMENT}
          pilot={false}
          name={name}
          code={code.toUpperCase()}
          faculty={faculty}
          nav={[
            { href: "#finding", label: NAV_PART_A },
            { href: "#market", label: NAV_PART_B_RESEARCH },
            { href: "#method", label: NAV_PART_C_RESEARCH },
          ]}
        />

        {/* ================= PART A — THE FINDING ================= */}
        <PartHeading id="finding" part={PART_A} title={PART_A_TITLE} />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div
              className="bg-card-accent text-muted-foreground mb-5 flex items-start gap-2 rounded-md p-3 text-sm"
              data-testid="v4-research-notice"
            >
              <span className="text-foreground text-xs font-semibold tracking-wide uppercase">
                {RESEARCH_NO_RATING_LABEL}
              </span>
              <span>{researchNoRatingNotice(brand.signalName)}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <CardLabel>{LABEL_EXPOSURE}</CardLabel>
                <p className="text-foreground font-mono text-2xl">—</p>
                <p className="text-muted-foreground text-xs">
                  {RESEARCH_EXPOSURE_NOTE}
                </p>
              </div>
              <div>
                <CardLabel>{LABEL_ADAPTIVENESS}</CardLabel>
                <p className="text-foreground font-mono text-2xl">—</p>
                <p className="text-muted-foreground text-xs">
                  {RESEARCH_ADAPTIVENESS_NOTE}
                </p>
              </div>
              <div>
                <CardLabel>{LABEL_POSITION_AXIS}</CardLabel>
                <p className="text-foreground font-mono text-2xl">—</p>
                <p className="text-muted-foreground text-xs">
                  {RESEARCH_POSITION_NOTE}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ReportMarkdownCard
          slug={`dfva-v4r-${code}`}
          label={CARD_RESEARCH_FINDING_LABEL}
          title={CARD_RESEARCH_FINDING_TITLE}
          subtitle={CARD_RESEARCH_FINDING_SUBTITLE}
          sectionFilter={V4R_FINDING}
        />

        {/* ================= PART B — MARKET EVIDENCE ================= */}
        <PartHeading id="market" part={PART_B} title={PART_B_TITLE_RESEARCH} />
        <p className="text-muted-foreground mb-5 text-sm">
          {RESEARCH_MARKET_INTRO}
        </p>
        <ReportMarkdownCard
          slug={`dfva-v4r-${code}`}
          label={CARD_RESEARCH_PROVENANCE_LABEL}
          title={CARD_RESEARCH_PROVENANCE_TITLE}
          subtitle={CARD_RESEARCH_PROVENANCE_SUBTITLE}
          sectionFilter={V4R_MARKET}
        />
        <LabourMarketCard code={code} />

        {/* ================= PART C — METHOD & LIMITATIONS ================= */}
        <PartHeading id="method" part={PART_C} title={PART_C_TITLE_RESEARCH} />
        <ReportMarkdownCard
          slug={`dfva-v4r-${code}`}
          label={CARD_RESEARCH_LIMITS_LABEL}
          title={CARD_RESEARCH_LIMITS_TITLE}
          subtitle={CARD_RESEARCH_LIMITS_SUBTITLE}
          sectionFilter={V4R_LIMITS}
        />
        <Card className="mt-6" data-testid="v4r-no-plan">
          <CardContent className="pt-6">
            <CardLabel>{LABEL_RESEARCH_NO_PLAN}</CardLabel>
            <CardTitle className="text-lg">{TITLE_RESEARCH_NO_PLAN}</CardTitle>
            <p className="text-muted-foreground mt-1 text-sm">
              {researchNoPlanBody(name)}
            </p>
          </CardContent>
        </Card>
        {v1 && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <CardLabel>{LABEL_EARLIER_INSTRUMENT}</CardLabel>
              <CardTitle className="text-lg">
                {TITLE_ARCHIVED_ASSESSMENT}
              </CardTitle>
              <p className="text-muted-foreground mt-1 mb-4 text-sm">
                {ARCHIVED_ASSESSMENT_BODY}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  to={`/reports/${v1.assessmentSlug}`}
                  className="text-secondary-muted-foreground underline"
                  data-testid="archived-v1-link"
                >
                  {LINK_ARCHIVED_V1_ASSESSMENT}
                </Link>
                {v1.recommendSlug && (
                  <Link
                    to={`/reports/${v1.recommendSlug}`}
                    className="text-secondary-muted-foreground underline"
                  >
                    {LINK_ARCHIVED_V1_PLAN}
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-10">
          <Link
            to="/reports"
            className="text-secondary-muted-foreground underline"
          >
            {LINK_BACK_TO_REPORTS}
          </Link>
        </div>
      </div>
    </InsightsGate>
  );
}
