/**
 * Shared glossary of measurement and method terms used on report pages
 * (UX review follow-up, Aug 2026: every term the report uses must be
 * explained on the report). Pages pass the term keys they actually use.
 */

export type GlossaryTerm =
  | "aioe"
  | "destinationExposure"
  | "adaptiveness"
  | "gates"
  | "medianQuadrant"
  | "positionConfidence"
  | "envelope"
  | "raterError"
  | "jir"
  | "crosswalk"
  | "v1Composite"
  | "qilt"
  | "jsaHeo"
  | "panels"
  | "evidenceTier";

const GLOSSARY: Record<
  GlossaryTerm,
  { term: string; def: string; links?: { label: string; href: string }[] }
> = {
  aioe: {
    term: "AIOE (AI Occupational Exposure)",
    def: "A published index (Felten, Raj & Seamans, 2021) measuring, for each of ~770 occupations, how much the occupation's ability requirements overlap with what current AI can do. Values here are rescaled 0–100 across the published population: 0 is the least-exposed occupation (mostly physical and manual work), 100 the most. It measures task overlap only — not job losses, wages, or demand.",
    links: [
      {
        label: "Felten, Raj & Seamans (2021), Strategic Management Journal",
        href: "https://doi.org/10.1002/smj.3286",
      },
      {
        label: "Published data appendix (AIOE-Data/AIOE)",
        href: "https://github.com/AIOE-Data/AIOE",
      },
    ],
  },
  destinationExposure: {
    term: "Destination AI Exposure",
    def: "The average AIOE of the occupations this program's graduates actually enter, computed over the distinct job titles in the alumni destination data. It is measured from labour-market data, never scored by an assessor.",
  },
  adaptiveness: {
    term: "Curriculum Adaptiveness (…/15)",
    def: "The sum of five curriculum dimensions, each scored 0–3 from handbook evidence: systems thinking, technical depth, AI literacy, research methods, and irreplaceability. It measures how the curriculum builds capabilities that resist AI substitution.",
  },
  gates: {
    term: "Gates",
    def: "Two pass/fail floors — decision-making under uncertainty, and domain depth. Nearly all programs sit at the same level on these, so scoring them would add no information; instead a curriculum change that breaks one is flagged regardless of what it does to the scored total.",
  },
  medianQuadrant: {
    term: "Portfolio median / position",
    def: "Positions (e.g. \"High exposure · low adaptiveness\") are defined by whether a program sits above or below the median of the assessed portfolio on each axis. They are relative to this portfolio at this assessment — not absolute grades, and not comparable across institutions.",
  },
  positionConfidence: {
    term: "Position confidence",
    def: "How robust the position is to rating error on the five scored items: every possible ±1 rating difference is enumerated exactly, and the confidence is the share of those weighted outcomes in which the position is unchanged. \"Near a threshold\" means a single rating difference could move it; \"firm\" means it could not. This is about rating precision, never about program quality.",
  },
  envelope: {
    term: "Exact envelope",
    def: "The lowest and highest adaptiveness score reachable if every one of the five scored items were rated one level differently — the full range the score could take under ±1 rating error, computed exactly.",
  },
  raterError: {
    term: "Rater-error rate (e)",
    def: "The assumed probability that any single scored item would be rated one level differently by another rater. The published figure assumes e = 0.10; because no inter-rater study has been run yet, results are also shown at 0.05 and 0.20.",
  },
  jir: {
    term: "JIR / LiveAlumni",
    def: "The University's Job Insights Reports: curated employment titles of this program's own graduates, derived from LiveAlumni (LinkedIn-based) data by University careers specialists. This gives program-level grain, at the cost of being curated self-reported data rather than administrative records.",
  },
  crosswalk: {
    term: "Occupation crosswalk (SOC codes)",
    def: "Each Australian destination job title is mapped to the closest occupation in the US Standard Occupational Classification (O*NET-SOC 2010), because that is the classification the published AIOE index is defined on. Every mapping carries a confidence rating and is published in the destination table.",
  },
  v1Composite: {
    term: "v1 composite (superseded)",
    def: "The previous instrument's single 0–36 score, summing eleven dimensions. It was superseded because it mixed measured labour-market properties with scored curriculum properties in one number; those are now kept on separate axes and never summed.",
  },
  qilt: {
    term: "QILT",
    def: "Quality Indicators for Learning and Teaching — the national graduate-outcomes survey program (employment rates, median salaries), reported at study-area level.",
  },
  jsaHeo: {
    term: "JSA HEO",
    def: "Jobs and Skills Australia's Higher Education Outcomes data — ATO tax-linked administrative records of where graduates work, reported at field-of-education level (not per degree).",
  },
  panels: {
    term: "Panels A / C / D",
    def: "The instrument keeps different kinds of evidence apart: Panel A is measured destination exposure, Panel C is scored curriculum adaptiveness, Panel D is metadata about evidence quality. Panels are never summed with each other.",
  },
  evidenceTier: {
    term: "Evidence tier",
    def: "A description of how strong the evidence base behind this program's assessment is (e.g. whether real alumni destination data was matched). It is metadata — it never contributes points to any axis.",
  },
};

export function MethodGlossary({ terms }: { terms: GlossaryTerm[] }) {
  return (
    <details className="border-border mb-4 rounded-lg border" data-testid="method-glossary">
      <summary className="text-foreground hover:bg-card-accent cursor-pointer rounded-lg px-5 py-4 text-sm font-medium">
        Terms used in this report — every measurement term, defined
      </summary>
      <dl className="flex flex-col gap-3 px-5 pt-1 pb-5">
        {terms.map((key) => (
          <div key={key}>
            <dt className="text-foreground text-sm font-semibold">{GLOSSARY[key].term}</dt>
            <dd className="text-muted-foreground text-sm leading-relaxed">
              {GLOSSARY[key].def}
              {GLOSSARY[key].links?.map((l) => (
                <span key={l.href}>
                  {" "}
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {l.label}
                  </a>
                  .
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
