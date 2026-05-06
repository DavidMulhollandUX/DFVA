import { useParams } from "react-router";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { REPORT_CONTENT } from "./reportContent";

const riskBandStyles: Record<string, string> = {
  RESILIENT:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "MODERATE RISK":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "HIGH RISK":
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  CRITICAL: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const reportMeta: Record<
  string,
  { score: string | null; riskBand: string | null }
> = {
  "dfva-b-des": { score: "17 / 36", riskBand: "HIGH RISK" },
  "dfva-market-b-des": { score: null, riskBand: null },
};

export default function ReportDetailPage() {
  const { reportSlug } = useParams<{ reportSlug: string }>();
  const report = reportSlug ? REPORT_CONTENT[reportSlug] : undefined;

  if (!report) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Report not found
        </h1>
        <p className="text-muted-foreground mb-8">
          No report exists for slug <code>{reportSlug}</code>.
        </p>
        <Link
          to="/reports"
          className="text-primary hover:underline inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to reports
        </Link>
      </div>
    );
  }

  const meta = reportSlug ? reportMeta[reportSlug] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <Link
          to="/reports"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          All reports
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {report.title}
            </h1>
            <p className="text-muted-foreground mt-1">{report.institution}</p>
          </div>
          {meta?.riskBand && (
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${riskBandStyles[meta.riskBand]}`}
              >
                {meta.riskBand}
              </span>
              {meta.score && (
                <span className="text-sm font-medium text-muted-foreground">
                  {meta.score}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-8">
        <div className="prose prose-sm dark:prose-invert max-w-none prose-table:text-xs prose-th:font-semibold prose-td:align-top">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {report.markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
