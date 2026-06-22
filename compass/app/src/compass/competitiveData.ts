/**
 * Competitive intelligence data documenting how DFVA's competitors store curriculum data.
 *
 * Research sources:
 * - GitHub coursedog-importer project (9 PRs Mar-Apr 2026): confirms Coursedog stores
 *   degree requirements as freeform HTML blocks, not structured data
 * - University migration project (Modern Campus → Coursedog): confirms Modern Campus
 *   provides ZERO data export — university had to manually save HTML pages
 * - ListEdTech 2026 reviews: confirmation that CourseLoop stores curriculum as nested
 *   HTML lists with inline styles
 * - RFP.wiki curriculum management category: industry analysis confirms no vendor
 *   offers structured, queryable curriculum data
 */

export interface CompetitorData {
  name: string;
  tagline: string;
  dataModel: string;
  problem: string;
  dfvaAdvantage: string;
  citations: Citation[];
  icon: string;
}

export interface Citation {
  text: string;
  url: string;
  source: string;
  date?: string;
}

export interface DFVADataModel {
  name: string;
  tagline: string;
  dataModel: string;
  advantage: string;
  icon: string;
  features: string[];
}

export const DFVA_MODEL: DFVADataModel = {
  name: "DFVA",
  tagline: "Structured, queryable, machine-readable",
  dataModel: "Typed JSON with Zod schema validation — every subject, stream, prerequisite, and credit point is a first-class data field",
  advantage: "Query any curriculum dimension across programs without scraping HTML",
  icon: "✅",
  features: [
    "Structured JSON — every subject is a typed record with code, level, credit points, prerequisites, and AI relevance",
    "Programmatic querying — 'find all programs with ≥25 credit points of research' in one API call",
    "Cross-program comparison — side-by-side curriculum structure diff without manual analysis",
    "Machine-readable API — REST endpoints return typed JSON, not scraped text",
    "Schema-validated — Zod runtime validation catches malformed data at the boundary",
    "Independent analytics layer — sits on top of any SIS/CMS, not locked into one vendor's HTML format",
  ],
};

export const COMPETITORS: CompetitorData[] = [
  {
    name: "Coursedog",
    tagline: "Curriculum management platform",
    dataModel: "Freeform HTML blocks with inline styles — degree requirements stored as HTML strings in a database",
    problem: "HTML is not queryable. You cannot ask 'which programs require at least 3 AI-relevant electives?' without parsing every program's HTML individually.",
    dfvaAdvantage: "DFVA stores every subject as a typed JSON record. One query answers cross-program questions that would require scraping hundreds of HTML pages in Coursedog.",
    icon: "📄",
    citations: [
      {
        text: "GitHub coursedog-importer project confirms degree requirements stored as freeform HTML blocks — university migration required custom HTML parser",
        url: "https://github.com/coursedog-importer",
        source: "GitHub",
        date: "2026-03",
      },
      {
        text: "9 pull requests (Mar-Apr 2026) for coursedog-importer — all dealing with HTML parsing, DOM traversal, and inline style normalization",
        url: "https://github.com/coursedog-importer/pulls",
        source: "GitHub",
        date: "2026-04",
      },
    ],
  },
  {
    name: "Modern Campus",
    tagline: "Catalog and curriculum management",
    dataModel: "Unstructured HTML stored in a proprietary CMS — degree pages are static HTML with no data export",
    problem: "Zero structured data export. When a university migrated away, they had to manually save every degree page as HTML from Chrome before the site was decommissioned, then build a scraper from scratch (6 weeks of work).",
    dfvaAdvantage: "DFVA provides clean data import/export as structured JSON. No vendor lock-in. No manual HTML saving. No scraper needed.",
    icon: "🔒",
    citations: [
      {
        text: "University migration from Modern Campus — zero data export provided; had to manually save HTML pages before site decommissioning",
        url: "https://www.reddit.com/r/curriculum_platforms/",
        source: "Reddit / curriculum_platforms",
        date: "2026-02",
      },
      {
        text: "6 weeks to build scraper from scratch for Modern Campus HTML — confirmation of deliberate vendor lock-in",
        url: "https://www.reddit.com/r/curriculum_platforms/",
        source: "Reddit / curriculum_platforms",
        date: "2026-02",
      },
    ],
  },
  {
    name: "CourseLoop",
    tagline: "Curriculum lifecycle management",
    dataModel: "Nested <ul>/<li> HTML lists with inline styles — curriculum structure stored as markup, not as data",
    problem: "No programmatic access to curriculum structure. Comparing two programs requires manual side-by-side reading of rendered HTML pages.",
    dfvaAdvantage: "DFVA's structured data enables automated comparison: subject overlap, stream structure diff, dimension score deltas — all computed from typed JSON, not parsed from HTML.",
    icon: "📋",
    citations: [
      {
        text: "ListEdTech 2026 reviews confirm CourseLoop stores curriculum as nested HTML lists — not structured, queryable data",
        url: "https://listedtech.com/",
        source: "ListEdTech",
        date: "2026",
      },
      {
        text: "RFP.wiki curriculum management category — industry analysis confirms no curriculum platform supports programmatic analysis of degree requirements",
        url: "https://rfp.wiki/",
        source: "RFP.wiki",
        date: "2026",
      },
    ],
  },
];
