// Rich v2 report content per program — the "implemented fully" layer of the
// v2 report prototype (dfva-v2-report-prototype.html). Sourced from real repo
// data: data/jir_data.json (alumni cohort), data/labour-evidence.json (QILT +
// destinations), dfva/source/assessments.json (v1 dimension scores).
// Programs without an entry here fall back to the generic v2 report layout.

export interface V2Destination {
  title: string;
  share: string;
}

export interface V1DimensionRow {
  dimension: string;
  v1Score: number | null;
  disposition: string;
  rationale: string;
}

export interface V2ReportDetail {
  code: string;
  creditPoints: string;
  level: string;
  positionNarrative: string;
  /** Panel A — top graduate destinations (early-career, JIR → ANZSCO shares) */
  destinations: V2Destination[];
  /** Panel D — evidence confidence */
  evidence: {
    tier: "Strong" | "Moderate" | "Limited";
    jirMatch: string;
    employersSummary: string;
    prestigeSummary: string;
    qiltStudyArea: string;
    shortTermEmployment: string;
    midTermEmployment: string;
    medianSalary: string;
    advertisedSalaryRange: string;
    occupationDemand: string;
    evidenceScore: string;
  };
  /** Version-comparison table with this program's actual v1 scores */
  v1Comparison: V1DimensionRow[];
  assessmentDate: string;
  source: string;
}

const MC_CS: V2ReportDetail = {
  code: "mc-cs",
  creditPoints: "200 credit points",
  level: "Postgraduate coursework",
  positionNarrative:
    "Graduates enter AI-touched roles with curriculum defences against substitution.",
  // labour-evidence.json → programs["mc-cs"].destinations.early
  destinations: [
    { title: "Software Engineer", share: "15%" },
    { title: "Developer Programmer", share: "14%" },
    { title: "ICT Business Analyst", share: "9%" },
    { title: "ICT Customer Support Officer", share: "6%" },
    { title: "Management Consultant", share: "4%" },
  ],
  evidence: {
    tier: "Strong",
    // jir_data.json → n=41, 13 unique employers
    jirMatch: "Exact match (n = 41 graduates)",
    employersSummary:
      "13 unique (Google, IBM, Canva, Optiver, IMC Trading + 8 more)",
    prestigeSummary: "10 of 13 (77%) — strong signal",
    // labour-evidence.json → programs["mc-cs"].qilt (GOS 2024, IT study area)
    qiltStudyArea: "Information Technology",
    shortTermEmployment: "81.2%",
    midTermEmployment: "94.1%",
    medianSalary: "$110,000 (QILT 2024)",
    advertisedSalaryRange: "A$95k–160k (current listings)",
    occupationDemand: "SHORTAGE (JSA Skills Priority List 2025)",
    evidenceScore: "7 / 7",
  },
  // v1 scores from dfva/source/assessments.json (mc-cs, 29/36 RESILIENT)
  v1Comparison: [
    {
      dimension: "D1 Automation Exposure",
      v1Score: 2,
      disposition: "→ Panel A (measured)",
      rationale: "Labour-market claim; moved from scoring to measurement",
    },
    {
      dimension: "D2 Systems Thinking",
      v1Score: 2,
      disposition: "→ Panel C (scored)",
      rationale: "Retained; evidence from handbook curriculum",
    },
    {
      dimension: "D3 Technical Depth",
      v1Score: 3,
      disposition: "→ Panel C (scored)",
      rationale: "Retained; strong technical core",
    },
    {
      dimension: "D4 Decision-making",
      v1Score: 3,
      disposition: "→ Gate (binary)",
      rationale: ">70% of programs use same level; gate, not measure",
    },
    {
      dimension: "D5 AI Literacy",
      v1Score: 3,
      disposition: "→ Panel C (scored)",
      rationale: "Retained with guardrail anchors; rare 3/3 in v1",
    },
    {
      dimension: "D6 Domain Depth",
      v1Score: 3,
      disposition: "→ Gate (binary)",
      rationale: ">83% modal; gate, not measure",
    },
    {
      dimension: "D7 Research Methods",
      v1Score: 3,
      disposition: "→ Panel C (scored)",
      rationale: "Retained; thesis/research project evidence",
    },
    {
      dimension: "D8 Human/Relational",
      v1Score: 2,
      disposition: "→ Panel A (measured)",
      rationale: "Property of destination, not curriculum",
    },
    {
      dimension: "D9 Curriculum Currency",
      v1Score: 2,
      disposition: "→ Dropped",
      rationale: "Item-total correlation 0.06; unscorable from handbook",
    },
    {
      dimension: "D10 Outcome Evidence",
      v1Score: 3,
      disposition: "→ Panel D (metadata)",
      rationale:
        "Measured publishing practice, not quality — moved to evidence confidence",
    },
    {
      dimension: "B Irreplaceability",
      v1Score: 3,
      disposition: "→ Panel C (scored)",
      rationale: "Retained; highest v1 dimension coherence (r=0.65)",
    },
  ],
  assessmentDate: "2026-06-08",
  source: "handbook.unimelb.edu.au",
};

export const V2_REPORT_DETAILS: Record<string, V2ReportDetail> = {
  "mc-cs": MC_CS,
};

export function reportDetailFor(code: string): V2ReportDetail | undefined {
  return V2_REPORT_DETAILS[code];
}
