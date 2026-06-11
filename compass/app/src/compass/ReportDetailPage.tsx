import { useParams } from "react-router";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, BarChart2, ClipboardList, TrendingUp } from "lucide-react";
import { REPORT_CONTENT } from "./reportContent";
import { PROGRAMS } from "./sharedProgramData";
import { ProgramRadar } from "../client/components/ProgramRadar";

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
  "dfva-mc-is": { score: "18 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-is": { score: null, riskBand: null },
  "dfva-recommend-mc-is": { score: null, riskBand: null },
  "dfva-b-sci": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-b-sci": { score: null, riskBand: null },
  "dfva-recommend-b-sci": { score: null, riskBand: null },
  "dfva-mc-scibit": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-scibit": { score: null, riskBand: null },
  "dfva-recommend-mc-scibit": { score: null, riskBand: null },
"dfva-439fs": { score: "21 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-439fs": { score: null, riskBand: null },
  "dfva-recommend-439fs": { score: null, riskBand: null },
  "dfva-527cl": { score: "27 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-527cl": { score: null, riskBand: null },
  "dfva-746st": { score: "20 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-746st": { score: null, riskBand: null },
  "dfva-recommend-b-des": { score: null, riskBand: null },
  "dfva-mc-actsc": { score: "20 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-actsc": { score: null, riskBand: null },
  "dfva-recommend-mc-actsc": { score: null, riskBand: null },
  "dfva-mc-apbusa": { score: "20 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-apbusa": { score: null, riskBand: null },
  "dfva-mc-arch": { score: "28 / 36", riskBand: "RESILIENT" },
  "dfva-market-mc-arch": { score: null, riskBand: null },
  "dfva-mc-ba": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-ba": { score: null, riskBand: null },
  "dfva-mc-bamktg": { score: "17 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-bamktg": { score: null, riskBand: null },
  "dfva-mc-base": { score: "18 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-base": { score: null, riskBand: null },
  "dfva-mc-bmedsc": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-bmedsc": { score: null, riskBand: null },
  "dfva-recommend-mc-bmedsc": { score: null, riskBand: null },
  "dfva-mc-busana": { score: "31 / 36", riskBand: "RESILIENT" },
  "dfva-market-mc-busana": { score: null, riskBand: null },
  "dfva-mc-climsci": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-climsci": { score: null, riskBand: null },
  "dfva-recommend-mc-climsci": { score: null, riskBand: null },
  "dfva-mc-clind": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-clind": { score: null, riskBand: null },
  "dfva-mc-cs": { score: "27 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-cs": { score: null, riskBand: null },
  "dfva-recommend-mc-cs": { score: null, riskBand: null },
  "dfva-mc-datasc": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-datasc": { score: null, riskBand: null },
  "dfva-recommend-mc-datasc": { score: null, riskBand: null },
  "dfva-mc-ed": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-ed": { score: null, riskBand: null },
  "dfva-mc-envlaw": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-envlaw": { score: null, riskBand: null },
  "dfva-mc-envsc": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-envsc": { score: null, riskBand: null },
  "dfva-recommend-mc-envsc": { score: null, riskBand: null },
  "dfva-mc-gencoun": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-gencoun": { score: null, riskBand: null },
  "dfva-recommend-mc-gencoun": { score: null, riskBand: null },
  "dfva-mc-indeng": { score: "22 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-indeng": { score: null, riskBand: null },
  "dfva-mc-intedib": { score: "16 / 36", riskBand: "HIGH RISK" },
  "dfva-market-mc-intedib": { score: null, riskBand: null },
  "dfva-mc-journ": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-journ": { score: null, riskBand: null },
  "dfva-mc-nursc": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-nursc": { score: null, riskBand: null },
  "dfva-recommend-mc-nursc": { score: null, riskBand: null },
  "dfva-mc-phtyph": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-phtyph": { score: null, riskBand: null },
  "dfva-mc-prop": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-prop": { score: null, riskBand: null },
  "dfva-mc-propsyc": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-propsyc": { score: null, riskBand: null },
  "dfva-mc-scibif": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-scibif": { score: null, riskBand: null },
  "dfva-recommend-mc-scibif": { score: null, riskBand: null },
  "dfva-mc-scibio": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-scibio": { score: null, riskBand: null },
  "dfva-recommend-mc-scibio": { score: null, riskBand: null },
  "dfva-mc-sciche": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciche": { score: null, riskBand: null },
  "dfva-recommend-mc-sciche": { score: null, riskBand: null },
  "dfva-mc-sciear": { score: "24 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciear": { score: null, riskBand: null },
  "dfva-recommend-mc-sciear": { score: null, riskBand: null },
  "dfva-mc-sciepi": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciepi": { score: null, riskBand: null },
  "dfva-recommend-mc-sciepi": { score: null, riskBand: null },
  "dfva-mc-sciphy": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-sciphy": { score: null, riskBand: null },
  "dfva-recommend-mc-sciphy": { score: null, riskBand: null },
  "dfva-mc-scwr": { score: "11 / 36", riskBand: "CRITICAL" },
  "dfva-market-mc-scwr": { score: null, riskBand: null },
  "dfva-mc-surged": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-surged": { score: null, riskBand: null },
  "dfva-mc-tesol": { score: "23 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-tesol": { score: null, riskBand: null },
  "dfva-mc-urbdes": { score: "26 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-urbdes": { score: null, riskBand: null },
  "dfva-mc-urbhort": { score: "25 / 36", riskBand: "MODERATE RISK" },
  "dfva-market-mc-urbhort": { score: null, riskBand: null },
};

// Eight round-2 batch reports are raw JSON (assessment object) followed by a
// markdown MARKET DATA section. Render those as a structured table instead of
// piping JSON through ReactMarkdown; anything unparseable falls back to markdown.
interface StructuredReport {
  score: number;
  maxScore: number;
  riskBand: string;
  dimensions: { label: string; score: number; max: number; rationale?: string }[];
  thresholds?: Record<string, string>;
}

function parseStructured(markdown: string): { data: StructuredReport; rest: string } | null {
  if (!markdown.trimStart().startsWith("{")) return null;
  const idx = markdown.indexOf("\n}");
  if (idx === -1) return null;
  try {
    const data = JSON.parse(markdown.slice(0, idx + 2)) as StructuredReport;
    if (!Array.isArray(data.dimensions)) return null;
    return { data, rest: markdown.slice(idx + 2) };
  } catch {
    return null;
  }
}

const THRESHOLD_QUESTIONS: Record<string, string> = {
  q1: "Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?",
  q2: "Does this program train graduates to design systems, own decisions, or generate original insight?",
  q3: "Will these graduates be more employable in 5 years than today, given AI trends?",
};

function dimScoreClasses(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.83) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
  if (pct >= 0.5) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
}

function StructuredAssessment({ data, rest }: { data: StructuredReport; rest: string }) {
  return (
    <div>
      {data.thresholds && (
        <div className="mb-6 space-y-2">
          {Object.entries(data.thresholds).map(([q, answer]) => (
            <div key={q} className="flex items-start gap-3 text-sm">
              <span className="inline-flex shrink-0 rounded-full border border-border px-2 py-0.5 text-xs font-semibold uppercase text-muted-foreground">
                {q} · {answer}
              </span>
              <span className="text-muted-foreground">{THRESHOLD_QUESTIONS[q] ?? ""}</span>
            </div>
          ))}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-3 py-2 text-left font-semibold">Dimension</th>
              <th className="px-3 py-2 text-center font-semibold">Score</th>
              <th className="px-3 py-2 text-left font-semibold">Rationale</th>
            </tr>
          </thead>
          <tbody>
            {data.dimensions.map((d) => (
              <tr key={d.label} className="border-b border-border last:border-0 align-top">
                <td className="px-3 py-2 font-medium whitespace-nowrap">{d.label}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${dimScoreClasses(d.score, d.max)}`}>
                    {d.score}/{d.max}
                  </span>
                </td>
                <td className="px-3 py-2 text-muted-foreground">{d.rationale ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rest.trim() && (
        <div className="prose prose-sm dark:prose-invert mt-8 max-w-none prose-table:text-xs prose-th:font-semibold prose-td:align-top">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{rest}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

const NAV_TABS = [
  { type: "assessment" as const, label: "Assessment", icon: BarChart2 },
  { type: "market" as const, label: "Market Intelligence", icon: TrendingUp },
  { type: "recommend" as const, label: "Improvement Plan", icon: ClipboardList },
];

function parseSlug(slug: string): { code: string; type: "assessment" | "market" | "recommend" } {
  if (slug.startsWith("dfva-recommend-")) return { code: slug.slice("dfva-recommend-".length), type: "recommend" };
  if (slug.startsWith("dfva-market-")) return { code: slug.slice("dfva-market-".length), type: "market" };
  return { code: slug.slice("dfva-".length), type: "assessment" };
}

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
  const { code, type: currentType } = parseSlug(reportSlug!);
  const slugsByType = {
    assessment: "dfva-" + code,
    market: "dfva-market-" + code,
    recommend: "dfva-recommend-" + code,
  };
  const program = PROGRAMS.find(p => p.assessmentSlug === slugsByType.assessment);

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

        {/* Report family navigation */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {NAV_TABS.map(tab => {
            const slug = slugsByType[tab.type];
            if (!(slug in REPORT_CONTENT)) return null;
            const isActive = tab.type === currentType;
            return (
              <Link
                key={tab.type}
                to={"/reports/" + slug}
                className={[
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                ].join(" ")}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {currentType === "assessment" && program && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-center text-foreground">
            Dimension Fingerprint
          </h2>
          <p className="text-xs text-muted-foreground text-center mb-2">
            11 dimensions scored 0–3 · {program.score}/{program.maxScore} total
          </p>
          <ProgramRadar dimensions={program.dimensions} size={360} />
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-8">
        {(() => {
          const structured = parseStructured(report.markdown);
          if (structured) return <StructuredAssessment data={structured.data} rest={structured.rest} />;
          return (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-table:text-xs prose-th:font-semibold prose-td:align-top">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report.markdown}
              </ReactMarkdown>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
