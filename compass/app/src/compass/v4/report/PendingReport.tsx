import { Link } from "react-router";
import { brand } from "../../../branding/brandConfig";
import type { PROGRAMS } from "../../sharedProgramData";
import { V4_INSTRUMENT } from "../data/v4Rubric";
import {
  LINK_ARCHIVED_V1_ASSESSMENT,
  LINK_ARCHIVED_V1_PLAN,
  LINK_BACK_TO_REPORTS,
  LINK_MARKET_INTELLIGENCE,
  PENDING_NOTICE,
  PENDING_TITLE,
  eyebrow,
  noPanelCBody,
  researchPendingNotice,
} from "./copy";

/** The state for a program with no v4 scoring: what exists instead, or that
 *  nothing does. Not a 404 — the archived reports are still reachable. */
export function PendingReport({
  code,
  v1,
  isResearchDegree,
}: {
  code: string | undefined;
  v1: (typeof PROGRAMS)[number] | undefined;
  isResearchDegree: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
        {eyebrow(V4_INSTRUMENT, false)}
      </p>
      <h1 className="text-foreground mb-3 font-serif text-3xl">
        {v1 ? v1.program : PENDING_TITLE}
      </h1>
      {v1 ? (
        <>
          {isResearchDegree ? (
            // Reached only by a research degree whose v4r report has not been
            // authored yet; the 14 that have one render the full layout above.
            <p
              className="text-muted-foreground mb-6"
              data-testid="v4-research-notice"
            >
              {researchPendingNotice(brand.signalName)}
            </p>
          ) : (
            <p
              className="text-muted-foreground mb-6"
              data-testid="v4-pending-notice"
            >
              {PENDING_NOTICE}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
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
            <Link
              to={`/reports/${v1.marketSlug}`}
              className="text-secondary-muted-foreground underline"
            >
              {LINK_MARKET_INTELLIGENCE}
            </Link>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground mb-6">{noPanelCBody(code)}</p>
      )}
      <div className="mt-8">
        <Link
          to="/reports"
          className="text-secondary-muted-foreground underline"
        >
          {LINK_BACK_TO_REPORTS}
        </Link>
      </div>
    </div>
  );
}
