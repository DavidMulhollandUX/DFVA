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
  {
    name: "CourseLeaf",
    docsAccuracy: "none",
    authComplexity: "none",
    responseConsistency: "unknown",
    sdkLanguages: [],
    hasPlayground: false,
    hasStatusPage: false,
    painPoints: [
      "No public API — HTML-based data model only",
      "No structured data export — confirmed by 3+ open-source projects",
      "University of Illinois built Azure Function for basic data loading",
      "APInception meta-API wrapper exists because native API insufficient",
      "cc-coursemap scraper required for program/catalog data extraction",
    ],
    sourceUrls: [
      "https://github.com/unimelb-mdap/cc-coursemap",
      "https://github.com/search?q=courseleaf+api",
    ],
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

// ─── Competitive Product Pillar Data (feat-017) ───────────────────────────

/** Methodology-level comparison of assessment capabilities across platforms. */
export interface CompetitorProductPillar {
  name: string;
  hasAssessment: boolean;
  assessmentType: "none" | "descriptive" | "prescriptive" | "integrated";
  methodologyDetails: string;
  independenceLevel: "vendor_locked" | "partially_independent" | "fully_independent";
  sourceUrls: string[];
}

export const PRODUCT_PILLAR_DATA: CompetitorProductPillar[] = [
  {
    name: "DFVA (Evidura)",
    hasAssessment: true,
    assessmentType: "prescriptive",
    methodologyDetails:
      "Independent 11-dimension durability scoring. " +
      "Prescriptive methodology — evaluates what SHOULD exist, not just what IS happening. " +
      "Platform-agnostic — works with any curriculum management system. " +
      "Third-party standard — methodology is public and auditable.",
    independenceLevel: "fully_independent",
    sourceUrls: [],
  },
  {
    name: "Coursedog",
    hasAssessment: true,
    assessmentType: "integrated",
    methodologyDetails:
      "Integrated Assessment Cloud (third product pillar). " +
      "Descriptive analytics — course evaluations + demand projections. " +
      "Vendor-locked — requires Coursedog Curriculum Cloud. " +
      "Assessment optimises the platform, not independent of it. " +
      "Inferred Program Maps derived from HTML catalog parsing.",
    independenceLevel: "vendor_locked",
    sourceUrls: ["https://www.coursedog.com/product/assessment"],
  },
  {
    name: "CourseLeaf",
    hasAssessment: false,
    assessmentType: "none",
    methodologyDetails:
      "No dedicated assessment product. " +
      "Analytics expansion announced 2026 (Course Demand, Registration Optimization, Career Data). " +
      "API-poor architecture limits deep analysis — third-party tool ecosystem confirms extraction pain.",
    independenceLevel: "vendor_locked",
    sourceUrls: [],
  },
];
