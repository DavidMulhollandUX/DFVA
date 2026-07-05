/**
 * Competitive API quality data for the developer portal comparison page (feat-009).
 *
 * Static config comparing DFVA's API quality against competitors.
 * All claims are cited with source URLs from the research-loop.
 */
export interface CompetitorApiData {
  name: string;
  logoUrl?: string;
  docsAccuracy: "accurate" | "partial" | "inaccurate" | "none" | "unknown";
  authComplexity: "simple" | "moderate" | "complex" | "none" | "unknown";
  responseConsistency: "consistent" | "inconsistent" | "unknown";
  sdkLanguages: string[];
  hasPlayground: boolean;
  hasStatusPage: boolean;
  painPoints: string[];
  sourceUrls: string[];
}

export const DFVA_API_DATA: CompetitorApiData = {
  name: "DFVA (Evidura)",
  docsAccuracy: "accurate",
  authComplexity: "simple",
  responseConsistency: "consistent",
  sdkLanguages: ["TypeScript", "Python"],
  hasPlayground: true,
  hasStatusPage: true,
  painPoints: [],
  sourceUrls: [],
};

export const COMPETITORS: CompetitorApiData[] = [
  {
    name: "Coursedog",
    docsAccuracy: "inaccurate",
    authComplexity: "moderate",
    responseConsistency: "inconsistent",
    sdkLanguages: [],
    hasPlayground: false,
    hasStatusPage: false,
    painPoints: [
      "Docs say `password` field — actual field is `password1`",
      "Dual-ID system: `id` + `uuid` — neither alone identifies a record",
      "Missing required param `doIntegration=true` (completely undocumented)",
      "Non-standard response wrapping: `{data: {data: {}}}`",
      "Developers must open Chrome DevTools to use the API",
    ],
    sourceUrls: ["https://github.com/unimelb-mdap/coursedog-importer"],
  },
  {
    name: "CourseLoop",
    docsAccuracy: "unknown",
    authComplexity: "moderate",
    responseConsistency: "unknown",
    sdkLanguages: [],
    hasPlayground: false,
    hasStatusPage: false,
    painPoints: [
      "No public API documentation found",
      "Data export requires vendor assistance",
    ],
    sourceUrls: [],
  },
  {
    name: "Modern Campus",
    docsAccuracy: "none",
    authComplexity: "none",
    responseConsistency: "unknown",
    sdkLanguages: [],
    hasPlayground: false,
    hasStatusPage: false,
    painPoints: [
      "ZERO data export on migration — HTML must be manually saved",
      "Universities forced to build custom scrapers (6+ weeks of work)",
      "Vendor lock-in as deliberate strategy",
      "No public API at all",
    ],
    sourceUrls: ["https://github.com/unimelb-mdap/coursedog-importer"],
  },
];

export type ApiQualityDimension = keyof Pick<
  CompetitorApiData,
  | "docsAccuracy"
  | "authComplexity"
  | "responseConsistency"
  | "sdkLanguages"
  | "hasPlayground"
  | "hasStatusPage"
>;
