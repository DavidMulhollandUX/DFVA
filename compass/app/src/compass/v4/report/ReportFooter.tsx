import { Link } from "react-router";
import { hasReportContent } from "../../reportContent/index";
import type { PROGRAMS } from "../../sharedProgramData";
import { V4_INSTRUMENT } from "../data/v4Rubric";
import {
  LABEL_ARCHIVED,
  LINK_ALL_REPORTS,
  LINK_FULL_REPORT,
  LINK_V1_ASSESSMENT,
  LINK_V1_PLAN,
  footerLine,
} from "./copy";

/** The coursework report footer: what the page is, and the archived reports
 *  it supersedes. */
export function ReportFooter({
  programCode,
  hasV31,
  v1,
}: {
  programCode: string;
  hasV31: boolean;
  v1: (typeof PROGRAMS)[number] | undefined;
}) {
  return (
    <div className="text-muted-foreground border-border mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
      <span>{footerLine(V4_INSTRUMENT)}</span>
      <span className="flex flex-wrap gap-4">
        {(hasV31 || v1) && (
          <span className="flex flex-wrap gap-3" data-testid="archived-reports">
            <span className="text-foreground font-medium">
              {LABEL_ARCHIVED}
            </span>
            {v1 && (
              <Link to={`/reports/${v1.assessmentSlug}`} className="underline">
                {LINK_V1_ASSESSMENT}
              </Link>
            )}
            {v1?.recommendSlug && (
              <Link to={`/reports/${v1.recommendSlug}`} className="underline">
                {LINK_V1_PLAN}
              </Link>
            )}
          </span>
        )}
        {hasReportContent(`dfva-v4-${programCode}`) && (
          <Link to={`/reports/dfva-v4-${programCode}`} className="underline">
            {LINK_FULL_REPORT}
          </Link>
        )}
        <Link to="/reports" className="underline">
          {LINK_ALL_REPORTS}
        </Link>
      </span>
    </div>
  );
}
