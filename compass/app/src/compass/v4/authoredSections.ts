/**
 * The two hand-authored sections of a dfva-v4-<code> report that the report
 * page renders (DJ decision 4, 2026-09-02): §4 MARKET EVIDENCE and §5
 * CURRICULUM IMPLICATIONS. ReportMarkdownCard strips the "N. " prefix from
 * section titles, so the predicates anchor on the section name.
 */
export const V4_MARKET_EVIDENCE = (title: string): boolean =>
  /^MARKET EVIDENCE\b/i.test(title);
export const V4_CURRICULUM_IMPLICATIONS = (title: string): boolean =>
  /^CURRICULUM IMPLICATIONS\b/i.test(title);
export const V4_AUTHORED = (title: string): boolean =>
  V4_MARKET_EVIDENCE(title) || V4_CURRICULUM_IMPLICATIONS(title);
