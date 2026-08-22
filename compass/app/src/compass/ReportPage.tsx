import { lazy, Suspense } from "react";
import { useParams } from "react-router";

// Both pages stay code-split: the legacy v1 workspace and the v4 report are
// each large, and a visitor only ever needs one of them.
const LegacyReport = lazy(() => import("./ReportDetailPage"));
const V4Report = lazy(() => import("./v4/V4ReportPage"));

/**
 * /reports/:reportSlug dispatcher. Program codes never start with "dfva-", so
 * a legacy slug (dfva-<code>, dfva-market-<code>, dfva-recommend-<code>,
 * dfva-v4-<code>) routes to the archived v1 markdown workspace and anything
 * else is a program code rendered on the current v4 Durability Report.
 */
export default function ReportPage() {
  const { reportSlug = "" } = useParams<{ reportSlug: string }>();
  return (
    <Suspense fallback={null}>
      {reportSlug.startsWith("dfva-") ? (
        <LegacyReport />
      ) : (
        <V4Report key={reportSlug} code={reportSlug} />
      )}
    </Suspense>
  );
}
