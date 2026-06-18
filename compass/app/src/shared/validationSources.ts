/**
 * Validation sources for DFVA methodology — third-party evidence that
 * independently supports the premise that degrees must be assessed on
 * AI-readiness and workforce durability.
 *
 * Sources are paraphrased to avoid copyright issues; each entry links
 * to the canonical source for full context.
 */

export interface ValidationSource {
  /** Short display name */
  name: string;
  /** The organisation or publication that produced the source */
  publisher: string;
  /** Canonical URL for the source document */
  url: string;
  /** Paraphrased key statistic or finding */
  keyStat: string;
  /** Why this source is relevant to DFVA scoring */
  relevance: string;
  /** Year of publication */
  year: number;
  /** Which DFVA dimensions or acceptance tests this source supports */
  supportsTests?: string[];
}

const VALIDATION_SOURCES: ValidationSource[] = [
  {
    name: "2026 Workforce Predictions",
    publisher: "Lightcast",
    url: "https://lightcast.io/resources/blog/2026-workforce-predictions",
    keyStat:
      "AI-related job postings grew 109% year-over-year, and AI fluency is now a baseline workplace expectation — not a specialist skill.",
    relevance:
      "Independently validates DFVA's core premise that higher education programs must systematically assess their AI-readiness. Lightcast's data shows that the labour market has reached a tipping point where AI capability is no longer optional for graduates across most professional domains.",
    year: 2026,
    supportsTests: ["EXP-01", "EXP-05"],
  },
];

/**
 * Get all validation sources.
 */
export function getValidationSources(): ValidationSource[] {
  return VALIDATION_SOURCES;
}

/**
 * Get validation sources filtered by a specific acceptance test.
 */
export function getSourcesForTest(testId: string): ValidationSource[] {
  return VALIDATION_SOURCES.filter(
    (s) => s.supportsTests?.includes(testId),
  );
}
