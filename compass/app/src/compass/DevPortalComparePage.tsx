import {
  DFVA_API_DATA,
  COMPETITORS,
  type CompetitorApiData,
} from "./apiCompetitiveData";
import {
  Shield,
  Check,
  X,
  AlertTriangle,
  Minus,
  ExternalLink,
} from "lucide-react";

const ALL_COMPETITORS = [DFVA_API_DATA, ...COMPETITORS];

function QualityCell({ value }: { value: string | string[] | boolean }) {
  if (value === "accurate" || value === "consistent" || value === "simple") {
    return <Check className="h-5 w-5 text-green-500" />;
  }
  if (value === "partial" || value === "moderate") {
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  }
  if (
    value === "inaccurate" ||
    value === "inconsistent" ||
    value === "complex"
  ) {
    return <X className="h-5 w-5 text-red-500" />;
  }
  if (value === "none" || value === false) {
    return <Minus className="text-muted-foreground/40 h-5 w-5" />;
  }
  if (value === "unknown") {
    return <span className="text-muted-foreground text-sm">?</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-muted-foreground text-xs">None</span>;
    }
    return <span className="font-mono text-xs">{value.join(", ")}</span>;
  }
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );
  }
  return <span className="text-xs">{String(value)}</span>;
}

const DIMENSIONS: {
  key: keyof CompetitorApiData;
  label: string;
  tooltip: string;
}[] = [
  {
    key: "docsAccuracy",
    label: "Docs Accuracy",
    tooltip: "How accurate is the public API documentation?",
  },
  {
    key: "authComplexity",
    label: "Auth Simplicity",
    tooltip:
      "How simple is authentication? (simple = Bearer token, complex = OAuth2 maze)",
  },
  {
    key: "responseConsistency",
    label: "Response Format",
    tooltip: "Are API responses consistently structured?",
  },
  {
    key: "sdkLanguages",
    label: "SDKs",
    tooltip: "Officially supported SDK languages",
  },
  {
    key: "hasPlayground",
    label: "Playground",
    tooltip: "Interactive API tester available?",
  },
  {
    key: "hasStatusPage",
    label: "Status Page",
    tooltip: "Public endpoint health dashboard?",
  },
];

export default function DevPortalComparePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          API Quality Comparison
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Side-by-side comparison of developer experience quality across
          curriculum management platforms. DFVA's API is built from the ground
          up for developers — every other platform treats its API as internal
          plumbing.
        </p>

        {/* Matrix */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="w-48 p-4 text-left font-semibold">Dimension</th>
                {ALL_COMPETITORS.map((c) => (
                  <th key={c.name} className="p-4 text-center font-semibold">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((dim, i) => (
                <tr
                  key={String(dim.key)}
                  className={i % 2 === 0 ? "bg-muted/20" : ""}
                >
                  <td className="p-4">
                    <span className="font-medium">{dim.label}</span>
                    <span className="text-muted-foreground block text-xs">
                      {dim.tooltip}
                    </span>
                  </td>
                  {ALL_COMPETITORS.map((c) => (
                    <td key={c.name} className="p-4 text-center">
                      <div className="flex justify-center">
                        <QualityCell value={c[dim.key] ?? "unknown"} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pain points detail */}
        <div className="mt-12 space-y-8">
          {COMPETITORS.map((competitor) => (
            <div key={competitor.name} className="rounded-lg border p-6">
              <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                <Shield className="h-5 w-5 text-red-500" />
                {competitor.name} — Known Issues
              </h2>
              {competitor.painPoints.length > 0 ? (
                <ul className="space-y-2">
                  {competitor.painPoints.map((pain, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Research in progress — evidence being collected.
                </p>
              )}
              {competitor.sourceUrls.length > 0 && (
                <div className="text-muted-foreground mt-4 text-xs">
                  <span className="font-semibold">Sources: </span>
                  {competitor.sourceUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary ml-1 inline-flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {url.replace("https://github.com/", "")}
                      {i < competitor.sourceUrls.length - 1 && ", "}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DFVA highlight */}
        <div className="mt-12 rounded-lg border border-green-500/20 bg-green-500/5 p-6">
          <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <Check className="h-5 w-5 text-green-500" />
            Why DFVA's API is different
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500">✓</span>
              <span>
                <strong>Accurate OpenAPI 3.1 spec</strong> — every endpoint,
                parameter, and response schema documented. Verified against live
                responses.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500">✓</span>
              <span>
                <strong>Simple Bearer token auth</strong> — no OAuth2 mazes, no
                dual-ID systems. One key, one header.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500">✓</span>
              <span>
                <strong>Consistent JSON responses</strong> — standardized error
                format. No nested data-wrapping surprises.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500">✓</span>
              <span>
                <strong>Typed SDKs for TypeScript and Python</strong> —
                generated from the OpenAPI spec. Autocomplete in your IDE.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500">✓</span>
              <span>
                <strong>Interactive playground</strong> — test endpoints with
                your API key, see live responses and copy working code snippets.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-green-500">✓</span>
              <span>
                <strong>Public status dashboard</strong> — endpoint health,
                uptime, and incident history. No guessing if the API is down.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
