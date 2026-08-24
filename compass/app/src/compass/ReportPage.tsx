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
 *
 * dfva-v4r-<code> is the exception. It is a report body rather than an archived
 * assessment, and it renders in the v4 format on the program's own page — so
 * the slug resolves to the same page /reports/<code> does, keeping the links
 * already published against it alive.
 */
const V4R_PREFIX = "dfva-v4r-";

export default function ReportPage() {
  const { reportSlug = "" } = useParams<{ reportSlug: string }>();
  const code = reportSlug.startsWith(V4R_PREFIX)
    ? reportSlug.slice(V4R_PREFIX.length)
    : reportSlug.startsWith("dfva-")
      ? null
      : reportSlug;
  return (
    <Suspense fallback={null}>
      {code === null ? <LegacyReport /> : <V4Report key={code} code={code} />}
    </Suspense>
  );
}
