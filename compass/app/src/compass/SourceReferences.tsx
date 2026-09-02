/**
 * Full academic-style reference list for every data source and analysis input
 * a report page draws on. Each entry carries the citation, the role the source
 * plays in the report ("Used for"), and the grain/limitations of the data —
 * so a reader can trace every number on the page back to where it came from.
 *
 * Pages pass the source keys they actually use; entries render grouped with
 * continuous numbering.
 */
import type { ReactNode } from "react";

export type SourceKey =
  | "felten2021"
  | "aioeAppendix"
  | "jirDataset"
  | "onetSoc"
  | "handbook"
  | "dfvaRubric"
  | "dfvaRubricV4"
  | "teqsaAdaptive"
  | "qiltGos"
  | "jsaHeoData"
  | "adzunaData"
  | "ibisworldP8102"
  | "wefFoj"
  | "linkedinEg"
  | "stackOverflow"
  | "gartnerIt"
  | "isacaSoc"
  | "pmiPulse"
  | "mckinseyAi"
  | "seekObs";

type SourceGroup = "exposure" | "curriculum" | "labour" | "market";

const GROUP_META: Record<SourceGroup, { title: string; note?: string }> = {
  exposure: {
    title: "Destination & exposure measurement (Panel A)",
  },
  curriculum: {
    title: "Curriculum evidence (Panel C)",
  },
  labour: {
    title: "Graduate outcomes & labour market",
  },
  market: {
    title: "Trend reports informing the market-intelligence sections",
    note: "The market-intelligence sections are analyst syntheses written against the published reports below, at the confidence level stated on each section (LOW/MEDIUM). They reflect structural sector knowledge as of the assessment date, not live data retrieval — specific counts and percentages attributed to these reports are directional unless independently verified.",
  },
};

const SOURCES: Record<
  SourceKey,
  {
    group: SourceGroup;
    citation: ReactNode;
    links?: { label: string; href: string }[];
    usedFor: string;
    grain?: string;
  }
> = {
  felten2021: {
    group: "exposure",
    citation: (
      <>
        Felten, E., Raj, M., &amp; Seamans, R. (2021). Occupational, industry,
        and geographic exposure to artificial intelligence: A novel dataset and
        its potential uses. <em>Strategic Management Journal, 42</em>(12),
        2195–2217.
      </>
    ),
    links: [
      {
        label: "https://doi.org/10.1002/smj.3286",
        href: "https://doi.org/10.1002/smj.3286",
      },
    ],
    usedFor:
      "The AI Occupational Exposure (AIOE) index behind every exposure value in this report.",
    grain:
      "Defined on ~770 US occupations from their ability requirements; measures overlap between occupational abilities and current AI capabilities — not job losses, wages, or demand.",
  },
  aioeAppendix: {
    group: "exposure",
    citation: (
      <>
        Felten, E., Raj, M., &amp; Seamans, R. (2021).{" "}
        <em>AIOE data appendix</em> [Data set: AIOE_DataAppendix.xlsx, Appendix
        A]. GitHub repository AIOE-Data/AIOE. Accessed August 2026.
      </>
    ),
    links: [
      {
        label: "https://github.com/AIOE-Data/AIOE",
        href: "https://github.com/AIOE-Data/AIOE",
      },
    ],
    usedFor:
      "The 774 published raw AIOE values (−2.670 to 1.528), min–max rescaled 0–100 for this instrument. Every exposure value on this page is validated against this file when the report is built.",
  },
  jirDataset: {
    group: "exposure",
    citation: (
      <>
        University of Melbourne Careers &amp; Employability. (2026).{" "}
        <em>Job Insights Reports</em> [Unpublished internal data set].
        LinkedIn-derived alumni employment titles compiled via LiveAlumni and
        curated by University careers specialists.
      </>
    ),
    usedFor:
      "The destination job titles of this program's own graduates — the alumni evidence base at program grain (cohort n = 40–1,277 per program), and in the current measurement the titles over which the exposure value is computed.",
    grain:
      "Curated self-reported professional-network data, not administrative records; coverage skews toward LinkedIn-active graduates.",
  },
  onetSoc: {
    group: "exposure",
    citation: (
      <>
        National Center for O*NET Development. (2010).{" "}
        <em>O*NET-SOC 2010 occupational taxonomy</em>. U.S. Department of Labor.
      </>
    ),
    links: [
      {
        label: "https://www.onetcenter.org/taxonomy.html",
        href: "https://www.onetcenter.org/taxonomy.html",
      },
    ],
    usedFor:
      "The occupation classification each Australian destination title is mapped to (the crosswalk), because the AIOE index is defined on it.",
    grain:
      "The 368-title crosswalk merges two vintages (288 inherited, 80 mapped August 2026) with a disclosed level difference between them; every mapping carries a published confidence rating.",
  },
  handbook: {
    group: "curriculum",
    citation: (
      <>
        University of Melbourne. (2026). <em>Handbook 2026</em> [Program and
        subject entries].
      </>
    ),
    links: [
      {
        label: "https://handbook.unimelb.edu.au",
        href: "https://handbook.unimelb.edu.au",
      },
    ],
    usedFor:
      "All curriculum-adaptiveness scoring and gate evidence — subject aims, assessment structures, and capstone/elective availability.",
    grain:
      "Published curriculum descriptions, scored against the rubric anchors reproduced on this page. Scoring is single-rater judgment pending the inter-rater study (open item R9).",
  },
  dfvaRubric: {
    group: "curriculum",
    citation: (
      <>
        Evidura. (2026). <em>DFVA assessment rubric</em> (v2 revision) [Internal
        methodology record].
      </>
    ),
    usedFor:
      "The 0–3 anchor definitions for the five scored curriculum dimensions and both pass/fail gates. The anchors are reproduced in full in the curriculum section of this report.",
  },
  dfvaRubricV4: {
    group: "curriculum",
    citation: (
      <>
        Evidura. (2026). <em>DFVA assessment rubric, v4 instrument</em>{" "}
        [Internal methodology record].
      </>
    ),
    usedFor:
      "The 0–3 anchor definitions for the eight v4 scored items (five adaptive, three workplace) and both pass/fail preconditions. The anchors are reproduced in full in each program's Durability Report curriculum section.",
    grain:
      "Single-rater scoring against published anchor definitions, adversarially verified; verification dates are recorded per program.",
  },
  teqsaAdaptive: {
    group: "curriculum",
    citation: (
      <>
        Tertiary Education Quality and Standards Agency. (2026).{" "}
        <em>
          Assuring quality learning in a gen AI-integrated future: the role of
          adaptive capabilities
        </em>
        . TEQSA.
      </>
    ),
    links: [
      {
        label:
          "https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assuring-quality-learning-gen-ai-integrated-future-role-adaptive-capabilities",
        href: "https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assuring-quality-learning-gen-ai-integrated-future-role-adaptive-capabilities",
      },
    ],
    usedFor:
      "The capability names the v4 rubric's item constructs reference — the four adaptive capabilities and the disciplinary foundation placed beneath them.",
  },
  qiltGos: {
    group: "labour",
    citation: (
      <>
        Quality Indicators for Learning and Teaching. (2024).{" "}
        <em>Graduate Outcomes Survey 2024</em> [National report tables]. Social
        Research Centre, on behalf of the Australian Government Department of
        Education.
      </>
    ),
    links: [
      { label: "https://www.qilt.edu.au", href: "https://www.qilt.edu.au" },
    ],
    usedFor:
      "Full-time employment rates and median starting salaries quoted in the market and improvement-plan sections.",
    grain:
      "Survey data reported at study-area level, not per program, ~4 months after completion.",
  },
  jsaHeoData: {
    group: "labour",
    citation: (
      <>
        Jobs and Skills Australia. (2025). <em>Higher education outcomes</em>{" "}
        [ATO tax-linked administrative data]. Australian Government.
      </>
    ),
    links: [
      {
        label: "https://www.jobsandskills.gov.au",
        href: "https://www.jobsandskills.gov.au",
      },
    ],
    usedFor:
      "Field-of-education destination shares and occupation shortage ratings in the improvement plans; also the destination basis of the superseded v2 exposure measurement, and the field-of-education occupation lists behind v4's field-grain exposure tier.",
    grain: "Field-of-education grain — not per degree; administrative records.",
  },
  adzunaData: {
    group: "labour",
    citation: (
      <>
        Adzuna Australia. (2026). <em>Live job vacancy listings</em> [Data
        extracts, 2026].
      </>
    ),
    links: [
      { label: "https://www.adzuna.com.au", href: "https://www.adzuna.com.au" },
    ],
    usedFor:
      "Demand-side “hiring now” employer lists and advertised salary ranges.",
    grain:
      "Job advertisements — evidence of demand, not of alumni destinations; advertised salaries differ from paid salaries.",
  },
  ibisworldP8102: {
    group: "labour",
    citation: (
      <>
        IBISWorld. (2026).{" "}
        <em>University and other higher education in Australia</em> (Industry
        Report P8102, June 2026).
      </>
    ),
    links: [
      { label: "https://www.ibisworld.com", href: "https://www.ibisworld.com" },
    ],
    usedFor:
      "Sector revenue and profit context cited in the improvement plans.",
    grain: "Subscription industry research at sector grain.",
  },
  wefFoj: {
    group: "market",
    citation: (
      <>
        World Economic Forum. (2025). <em>The Future of Jobs Report 2025</em>.
      </>
    ),
    links: [
      {
        label:
          "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
        href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
      },
    ],
    usedFor: "Task-cluster growth/decline framing in the skill-shift analysis.",
  },
  linkedinEg: {
    group: "market",
    citation: (
      <>
        LinkedIn Economic Graph. (2025–2026). <em>Workforce Report</em> and{" "}
        <em>Jobs on the Rise</em> series.
      </>
    ),
    links: [
      {
        label: "https://economicgraph.linkedin.com",
        href: "https://economicgraph.linkedin.com",
      },
    ],
    usedFor:
      "Title-level posting trends cited in the job-family and hiring-signal sections.",
  },
  stackOverflow: {
    group: "market",
    citation: (
      <>
        Stack Overflow. (2025). <em>2025 Developer Survey</em>.
      </>
    ),
    links: [
      {
        label: "https://survey.stackoverflow.co/2025/",
        href: "https://survey.stackoverflow.co/2025/",
      },
    ],
    usedFor:
      "Developer tooling and AI-adoption signals in technology-program market scans.",
  },
  gartnerIt: {
    group: "market",
    citation: (
      <>
        Gartner. (2025). <em>IT role and skills survey research</em>.
      </>
    ),
    links: [
      { label: "https://www.gartner.com", href: "https://www.gartner.com" },
    ],
    usedFor: "Enterprise IT role-evolution signals in the job-family analysis.",
  },
  isacaSoc: {
    group: "market",
    citation: (
      <>
        ISACA. (2025). <em>State of Cybersecurity 2025</em>.
      </>
    ),
    links: [{ label: "https://www.isaca.org", href: "https://www.isaca.org" }],
    usedFor: "Governance, risk, and compliance skill-demand signals.",
  },
  pmiPulse: {
    group: "market",
    citation: (
      <>
        Project Management Institute. (2025).{" "}
        <em>Pulse of the Profession 2025</em>.
      </>
    ),
    links: [{ label: "https://www.pmi.org", href: "https://www.pmi.org" }],
    usedFor: "Project- and change-management skill-demand signals.",
  },
  mckinseyAi: {
    group: "market",
    citation: (
      <>
        McKinsey &amp; Company. (2024–2025). <em>AI and the workforce</em>{" "}
        research series.
      </>
    ),
    links: [
      { label: "https://www.mckinsey.com", href: "https://www.mckinsey.com" },
    ],
    usedFor:
      "Workforce-automation adoption context in the skill-shift analysis.",
  },
  seekObs: {
    group: "market",
    citation: (
      <>
        Seek.com.au. (2025–2026). Job posting observations [Australian
        employment marketplace].
      </>
    ),
    links: [
      { label: "https://www.seek.com.au", href: "https://www.seek.com.au" },
    ],
    usedFor:
      "Australian posting-volume and emerging-title observations in the hiring signals.",
  },
};

const GROUP_ORDER: SourceGroup[] = [
  "exposure",
  "curriculum",
  "labour",
  "market",
];

export function SourceReferences({ sources }: { sources: SourceKey[] }) {
  // Continuous numbering across groups, in the same order the list below
  // renders them — computed as a lookup rather than a counter mutated
  // during render.
  const orderedKeys = GROUP_ORDER.flatMap((g) =>
    sources.filter((k) => SOURCES[k].group === g),
  );
  const numberByKey = new Map(orderedKeys.map((k, i) => [k, i + 1]));

  return (
    <details
      className="border-border mb-4 rounded-lg border"
      data-testid="source-references"
      id="sources"
    >
      <summary className="text-foreground hover:bg-card-accent cursor-pointer rounded-lg px-5 py-4 text-sm font-medium">
        Data sources &amp; references — where every number on this page comes
        from
      </summary>
      <div className="px-5 pt-1 pb-5">
        <p className="text-muted-foreground mb-4 text-sm">
          Full citations for every data source and analysis input this report
          draws on. <em>Used for</em> states the role each source plays in the
          report; <em>Grain</em> states the level the data is reported at and
          its known limitations.
        </p>
        {GROUP_ORDER.filter((g) =>
          sources.some((k) => SOURCES[k].group === g),
        ).map((g) => (
          <div key={g} className="mb-5 last:mb-0">
            <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-[0.18em] uppercase">
              {GROUP_META[g].title}
            </h4>
            {GROUP_META[g].note && (
              <p className="text-muted-foreground border-border mb-3 border-l-2 pl-3 text-sm italic">
                {GROUP_META[g].note}
              </p>
            )}
            <ol className="flex flex-col gap-3">
              {sources
                .filter((k) => SOURCES[k].group === g)
                .map((k) => {
                  const s = SOURCES[k];
                  return (
                    <li
                      key={k}
                      className="flex gap-3 text-sm"
                      data-testid={`source-${k}`}
                    >
                      <span className="text-muted-foreground shrink-0 font-mono text-xs leading-6">
                        [{numberByKey.get(k)}]
                      </span>
                      <div>
                        <p className="text-foreground leading-relaxed">
                          {s.citation}
                          {s.links?.map((l) => (
                            <span key={l.href}>
                              {" "}
                              <a
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-all underline"
                              >
                                {l.label}
                              </a>
                            </span>
                          ))}
                        </p>
                        <p className="text-muted-foreground mt-1 leading-relaxed">
                          <span className="text-foreground font-medium">
                            Used for:
                          </span>{" "}
                          {s.usedFor}
                          {s.grain && (
                            <>
                              {" "}
                              <span className="text-foreground font-medium">
                                Grain:
                              </span>{" "}
                              {s.grain}
                            </>
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ol>
          </div>
        ))}
      </div>
    </details>
  );
}
