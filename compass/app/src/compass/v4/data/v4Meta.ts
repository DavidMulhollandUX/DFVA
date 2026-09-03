// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
/** Present when adversarial verification moved a score. Recorded rather than
 *  overwritten: which anchor clause failed on scrutiny is response-process
 *  evidence, and the IRR study reads it. */
export interface V4Adjudication {
  originalScore: number;
  demotedTo?: number;
  promotedTo?: number;
  reason: string;
}

/** `evidenceLines` is optional for the same reason as on a gate: a record can
 *  carry none, and absent is not empty. The report names the omission on the
 *  page — an uncited score stays visible as uncited. */
export interface V4ItemResult {
  score: number;
  rationale: string;
  evidenceLines?: string[];
  adjudication?: V4Adjudication;
}

/** `evidenceLines` is optional because a gate record can carry none. Absent
 *  is not the same as empty: the report says so on the page rather than
 *  rendering a silent gap, so a precondition decided without verbatim
 *  handbook lines is visible as such. */
export interface V4GateResult {
  result: "PASS" | "FAIL";
  rationale: string;
  evidenceLines?: string[];
}

/** W1–W3 and `workplace` are optional: programs scored before v4.1 carry
 *  only the adaptive sub-scale and must be re-scored, not back-filled. */
export interface V4PanelC {
  instrument: string;
  C1: V4ItemResult;
  C2: V4ItemResult;
  C3: V4ItemResult;
  C4: V4ItemResult;
  C5: V4ItemResult;
  adaptiveness: number;
  W1?: V4ItemResult;
  W2?: V4ItemResult;
  W3?: V4ItemResult;
  workplace?: number;
  gates: { G1: V4GateResult; G2: V4GateResult };
  ambiguities: string[];
  /** Optional: a record that lists no coverage limits omits the key rather than
   *  asserting the empty list, which would read as "nothing was unscoreable". */
  notScoreable?: string[];
  verified?: { /** `true` on records written before the coverage contract (2026-08-25); the object form names the items actually attacked. */ adversarial: boolean | { reviewed: string[]; date: string }; mechanical: boolean; date: string };
}

/** Which destination distribution stands for the program (docs/dfva-v4-panela-basis.md).
 *  exact/variant = own alumni record; pooled/combined = own program family;
 *  cognate/partial = a related program's record (an assumption, labelled);
 *  field = JSA HEO field-of-education occupation list (placed against expMedianField). */
export type V4PanelATier = "exact" | "variant" | "pooled" | "combined" | "cognate" | "partial" | "field";
export type V4PanelAGrain = "program" | "program-family" | "related-program" | "field";
export interface V4PanelABasis {
  tier: V4PanelATier;
  grain: V4PanelAGrain;
  sources: { name: string; n: number | null }[];
  field?: string;
  dominantShare?: { name: string; share: number };
  /** Multi-record tiers: records set aside because they carry a refused title. */
  excludedSources?: { name: string; refusedTitles: string[] }[];
  /** Field tier: share-weighted mean (Felten aggregation rule). */
  exposureWeighted?: number;
  /** Field tier: ANZSCO occupations set aside as unmappable, with the share they carried. */
  excludedTitles?: { title: string; share: number | null }[];
  /** Field tier: summed entry-stage share (%) the value stands on. */
  coverage?: number;
  indexVariant: "AIOE-2021";
  note?: string;
}

/** A program scored on v4 that is not in the v3 registry.
 *
 *  Exposure is instrument-independent and is computed by the identical Panel A
 *  procedure for every program; `exposureBasis` records WHICH destination
 *  distribution it was computed on, so an estimate from a related program or
 *  a field-of-education list never reads as the program's own measurement. */
export interface V4OnlyProgram {
  code: string;
  name: string;
  hasMarketReport: boolean;
  exposure: number | null;
  entryExposure: number | null;
  jirN: number | null;
  nTitles: number | null;
  nMedium: number | null;
  exposureBasis: V4PanelABasis | null;
}

/** Migration-cycle status. `adaptMedian` is null until every reference-cohort
 *  program is scored on v4; position labels stay withheld while it is null. */
export interface V4Meta {
  cohortSize: number;
  scored: number;
  workplaceScored: number;
  workplaceComplete: boolean;
  complete: boolean;
  adaptMedian: number | null;
  /** Program-grain exposure median (alumni-title basis). */
  expMedian: number;
  /** Field-grain exposure median (JSA HEO basis) over the same reference cohort; null until every reference program has a field. Field-tier programs are placed against this, never against expMedian. */
  expMedianField: number | null;
  panelABasisVersion: string;
  pending: string[];
}

export const V4_META: V4Meta = {
  "cohortSize": 34,
  "scored": 34,
  "workplaceScored": 34,
  "workplaceComplete": true,
  "complete": true,
  "adaptMedian": 9,
  "expMedian": 90.9,
  "expMedianField": 83.21,
  "panelABasisVersion": "1.0",
  "pending": []
};

/** Research degrees excluded from Panel C v4 by scope (thesis PhDs, higher
 *  doctorates): no taught curriculum to score. Source: scripts/v4_cohort_ext_exclusions.json. */
export const V4_RESEARCH_DEGREES: readonly string[] = [
  "dh-lld",
  "dh-sc",
  "dr-philabp",
  "dr-philagr",
  "dr-philart",
  "dr-philbe",
  "dr-philedu",
  "dr-phileit",
  "dr-philfam",
  "dr-philik",
  "dr-phillaw",
  "dr-philmdh",
  "dr-philsci",
  "dr-philvet"
];

/** The light per-program spine for /reports and /insights (docs: this file is
 *  half of the split that keeps the landing page and reports index off the
 *  28,000-line Panel C rationale/evidence text in v4PanelC.ts). One entry per
 *  program carrying a panelCv4 score — the same domain as V4_PANEL_C. Item
 *  scores are bare numbers (no rationale, no evidence lines); W1–W3 are null
 *  for the handful of programs scored before v4.1 added the workplace
 *  sub-scale. `gates` carries PASS/FAIL only, null when unrecorded — pair with
 *  gateState()/gateStateFromResult() in v4/gateState.ts for display states. */
export interface V4IndexEntry {
  code: string;
  name: string;
  exposure: number | null;
  entryExposure: number | null;
  exposureTier: V4PanelATier | null;
  adaptiveness: number;
  workplace: number | null;
  C1: number;
  C2: number;
  C3: number;
  C4: number;
  C5: number;
  W1: number | null;
  W2: number | null;
  W3: number | null;
  gates: { G1: "PASS" | "FAIL" | null; G2: "PASS" | "FAIL" | null };
  verifiedAt: string | null;
}

export const V4_INDEX: Record<string, V4IndexEntry> = {
  "038ab": {
    "code": "038ab",
    "name": "Master of Art Curatorship",
    "exposure": 76.58,
    "entryExposure": 74.44,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-19"
  },
  "080cl": {
    "code": "080cl",
    "name": "Master of Psychology (Clinical Psychology)/Doctor of Philosophy",
    "exposure": 95.57,
    "entryExposure": 93.63,
    "exposureTier": "partial",
    "adaptiveness": 10,
    "workplace": 8,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 3,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "080cn": {
    "code": "080cn",
    "name": "Master of Psychology (Clinical Neuropsychology)/Doctor of Philosophy",
    "exposure": 95.57,
    "entryExposure": 93.63,
    "exposureTier": "partial",
    "adaptiveness": 10,
    "workplace": 9,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "097ab": {
    "code": "097ab",
    "name": "Master of Development Studies",
    "exposure": 92.5,
    "entryExposure": 92.94,
    "exposureTier": "exact",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-19"
  },
  "175aa": {
    "code": "175aa",
    "name": "Master of Arts and Cultural Management",
    "exposure": 85.86,
    "entryExposure": 81.76,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-22"
  },
  "192aa": {
    "code": "192aa",
    "name": "Master of International Tax",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "195aa": {
    "code": "195aa",
    "name": "Master of Construction Law",
    "exposure": 95.64,
    "entryExposure": 94.68,
    "exposureTier": "exact",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-22"
  },
  "244cw": {
    "code": "244cw",
    "name": "Master of Public Health",
    "exposure": 89.46,
    "entryExposure": 84.77,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "274ab": {
    "code": "274ab",
    "name": "Master of Criminology",
    "exposure": 72.79,
    "entryExposure": 72.63,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-26"
  },
  "277aa": {
    "code": "277aa",
    "name": "Master of Intellectual Property Law",
    "exposure": 95.26,
    "entryExposure": null,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 4,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "294be": {
    "code": "294be",
    "name": "Master of Marketing",
    "exposure": 96.45,
    "entryExposure": 97.6,
    "exposureTier": "cognate",
    "adaptiveness": 8,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-27"
  },
  "300bb": {
    "code": "300bb",
    "name": "Doctor of Education",
    "exposure": 92.44,
    "entryExposure": 94.16,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 3,
    "C1": 0,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "305bb": {
    "code": "305bb",
    "name": "Master of Clinical Audiology",
    "exposure": 81.09,
    "entryExposure": 79.31,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 9,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 3,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-17"
  },
  "342aa": {
    "code": "342aa",
    "name": "Master of Psychiatry",
    "exposure": 90.74,
    "entryExposure": 88.67,
    "exposureTier": "exact",
    "adaptiveness": 5,
    "workplace": 4,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 1,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-17"
  },
  "344ab": {
    "code": "344ab",
    "name": "Master of Public Policy and Management",
    "exposure": 95.04,
    "entryExposure": 92.34,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-17"
  },
  "439fs": {
    "code": "439fs",
    "name": "Master of Food Science",
    "exposure": 79.43,
    "entryExposure": 71.85,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "502cw": {
    "code": "502cw",
    "name": "Master of Laws",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "exact",
    "adaptiveness": 5,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-17"
  },
  "504aa": {
    "code": "504aa",
    "name": "Master of Commercial Law",
    "exposure": 94.39,
    "entryExposure": null,
    "exposureTier": "exact",
    "adaptiveness": 5,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-17"
  },
  "507aa": {
    "code": "507aa",
    "name": "Master of Health and Medical Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 5,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-17"
  },
  "510aa": {
    "code": "510aa",
    "name": "Master of Employment and Labour Relations Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 5,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-18"
  },
  "511aa": {
    "code": "511aa",
    "name": "Master of Public and International Law",
    "exposure": 95.8,
    "entryExposure": null,
    "exposureTier": "exact",
    "adaptiveness": 4,
    "workplace": 1,
    "C1": 0,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 0,
    "W2": 0,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-18"
  },
  "526aa": {
    "code": "526aa",
    "name": "Master of Banking and Finance Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 5,
    "workplace": 2,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 0,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "527cl": {
    "code": "527cl",
    "name": "Master of Clinical Psychology",
    "exposure": 95.57,
    "entryExposure": 93.63,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 7,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "527cn": {
    "code": "527cn",
    "name": "Master of Psychology (Clinical Neuropsychology)",
    "exposure": 95.57,
    "entryExposure": 93.63,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 7,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 3,
    "C5": 3,
    "W1": 2,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-18"
  },
  "635aa": {
    "code": "635aa",
    "name": "Master of Law and Development",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-26"
  },
  "706aa": {
    "code": "706aa",
    "name": "Master of Social Policy",
    "exposure": 96.05,
    "entryExposure": 95.96,
    "exposureTier": "exact",
    "adaptiveness": 6,
    "workplace": 5,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "742ab": {
    "code": "742ab",
    "name": "Master of Tax",
    "exposure": 98.37,
    "entryExposure": 98.91,
    "exposureTier": "exact",
    "adaptiveness": 3,
    "workplace": 2,
    "C1": 0,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-18"
  },
  "746st": {
    "code": "746st",
    "name": "Master of Engineering Structures",
    "exposure": 91.09,
    "entryExposure": 91.98,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "761em": {
    "code": "761em",
    "name": "Master of Engineering Management",
    "exposure": 91.05,
    "entryExposure": 89.03,
    "exposureTier": "exact",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 0,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-16"
  },
  "841ac": {
    "code": "841ac",
    "name": "Bachelor of Oral Health",
    "exposure": 64.6,
    "entryExposure": 60.88,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 7,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-16"
  },
  "872bb": {
    "code": "872bb",
    "name": "Master of Veterinary Science",
    "exposure": 62.4,
    "entryExposure": 63.57,
    "exposureTier": "cognate",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 3,
    "W1": 1,
    "W2": 1,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-16"
  },
  "991aa": {
    "code": "991aa",
    "name": "Master of Biostatistics",
    "exposure": 93.92,
    "entryExposure": 93.92,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 2,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-16"
  },
  "b-agr": {
    "code": "b-agr",
    "name": "Bachelor of Agriculture",
    "exposure": 73,
    "entryExposure": 67.44,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-09-01"
  },
  "b-arts": {
    "code": "b-arts",
    "name": "Bachelor of Arts",
    "exposure": 92.09,
    "entryExposure": 90.79,
    "exposureTier": "pooled",
    "adaptiveness": 5,
    "workplace": 2,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 0,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-09-01"
  },
  "b-bmed": {
    "code": "b-bmed",
    "name": "Bachelor of Biomedicine",
    "exposure": 82.09,
    "entryExposure": 79.22,
    "exposureTier": "pooled",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-09-01"
  },
  "b-com": {
    "code": "b-com",
    "name": "Bachelor of Commerce",
    "exposure": 97.01,
    "entryExposure": 96.82,
    "exposureTier": "pooled",
    "adaptiveness": 6,
    "workplace": 2,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-18"
  },
  "b-des": {
    "code": "b-des",
    "name": "Bachelor of Design",
    "exposure": 88.09,
    "entryExposure": 87.8,
    "exposureTier": "pooled",
    "adaptiveness": 5,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "b-faacting": {
    "code": "b-faacting",
    "name": "Bachelor of Fine Arts (Acting)",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 4,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 1,
    "C5": 0,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-27"
  },
  "b-faanim": {
    "code": "b-faanim",
    "name": "Bachelor of Fine Arts (Animation)",
    "exposure": 73.61,
    "entryExposure": 68.98,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-27"
  },
  "b-fadance": {
    "code": "b-fadance",
    "name": "Bachelor of Fine Arts (Dance)",
    "exposure": 68.44,
    "entryExposure": 68.44,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 0,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-27"
  },
  "b-fafilmtv": {
    "code": "b-fafilmtv",
    "name": "Bachelor of Fine Arts (Film and Television)",
    "exposure": 73.61,
    "entryExposure": 68.98,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "b-famusth": {
    "code": "b-famusth",
    "name": "Bachelor of Fine Arts (Music Theatre)",
    "exposure": 81.81,
    "entryExposure": 80.36,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "b-fapro": {
    "code": "b-fapro",
    "name": "Bachelor of Fine Arts (Production)",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 1,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "b-fascwri": {
    "code": "b-fascwri",
    "name": "Bachelor of Fine Arts (Screenwriting)",
    "exposure": 73.61,
    "entryExposure": 68.98,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 0,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "b-fath": {
    "code": "b-fath",
    "name": "Bachelor of Fine Arts (Theatre)",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 7,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "b-favisart": {
    "code": "b-favisart",
    "name": "Bachelor of Fine Arts (Visual Art)",
    "exposure": 71.19,
    "entryExposure": 63.73,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "b-mus": {
    "code": "b-mus",
    "name": "Bachelor of Music",
    "exposure": 80.63,
    "entryExposure": 80.91,
    "exposureTier": "pooled",
    "adaptiveness": 4,
    "workplace": 2,
    "C1": 2,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 0,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "b-sci": {
    "code": "b-sci",
    "name": "Bachelor of Science",
    "exposure": 82.72,
    "entryExposure": 78.11,
    "exposureTier": "pooled",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-23"
  },
  "b-sciextd": {
    "code": "b-sciextd",
    "name": "Bachelor of Science (Extended)",
    "exposure": 82.72,
    "entryExposure": 78.11,
    "exposureTier": "pooled",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "d01lf": {
    "code": "d01lf",
    "name": "Master of Creative Writing, Publishing and Editing",
    "exposure": 84.04,
    "entryExposure": 83.73,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "dr-philedp": {
    "code": "dr-philedp",
    "name": "Master of Psychology (Educational and Developmental)/Doctor of Philosophy",
    "exposure": 95.57,
    "entryExposure": 93.63,
    "exposureTier": "partial",
    "adaptiveness": 11,
    "workplace": 8,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 2,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "j17re": {
    "code": "j17re",
    "name": "Master of Advanced Social Work",
    "exposure": 86.73,
    "entryExposure": 84.59,
    "exposureTier": "cognate",
    "adaptiveness": 5,
    "workplace": 1,
    "C1": 0,
    "C2": 0,
    "C3": 0,
    "C4": 3,
    "C5": 2,
    "W1": 0,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "m04aa": {
    "code": "m04aa",
    "name": "Master of Music Therapy",
    "exposure": 70.67,
    "entryExposure": 68.64,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 9,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-actsc": {
    "code": "mc-actsc",
    "name": "Master of Actuarial Science",
    "exposure": 97.99,
    "entryExposure": 97.94,
    "exposureTier": "cognate",
    "adaptiveness": 5,
    "workplace": 1,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 0,
    "W2": 0,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-actscen": {
    "code": "mc-actscen",
    "name": "Master of Actuarial Science (Enhanced)",
    "exposure": 97.99,
    "entryExposure": 97.94,
    "exposureTier": "cognate",
    "adaptiveness": 2,
    "workplace": 1,
    "C1": 0,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 0,
    "W1": 0,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-actscex": {
    "code": "mc-actscex",
    "name": "Master of Actuarial Science (Extended)",
    "exposure": 97.99,
    "entryExposure": 97.94,
    "exposureTier": "cognate",
    "adaptiveness": 3,
    "workplace": 1,
    "C1": 1,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 0,
    "W1": 0,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-adolhw": {
    "code": "mc-adolhw",
    "name": "Master of Adolescent Health and Wellbeing",
    "exposure": 76.74,
    "entryExposure": 76.43,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-advnpph": {
    "code": "mc-advnpph",
    "name": "Master of Advanced Nursing Practice/Master of Public Health",
    "exposure": 82.6,
    "entryExposure": 78.33,
    "exposureTier": "combined",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-aecoenh": {
    "code": "mc-aecoenh",
    "name": "Master of Applied Econometrics (Enhanced)",
    "exposure": 96.53,
    "entryExposure": 95.84,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 0,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-aemtrcs": {
    "code": "mc-aemtrcs",
    "name": "Master of Applied Econometrics",
    "exposure": 96.53,
    "entryExposure": 95.84,
    "exposureTier": "cognate",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-agsc": {
    "code": "mc-agsc",
    "name": "Master of Agricultural Sciences",
    "exposure": 73,
    "entryExposure": 67.44,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-aimo": {
    "code": "mc-aimo",
    "name": "Master of Artificial Intelligence",
    "exposure": 92.8,
    "entryExposure": 93.33,
    "exposureTier": "cognate",
    "adaptiveness": 12,
    "workplace": 4,
    "C1": 1,
    "C2": 2,
    "C3": 3,
    "C4": 3,
    "C5": 3,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-anamgt": {
    "code": "mc-anamgt",
    "name": "Master of Analytics Management",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "partial",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 2,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-anp": {
    "code": "mc-anp",
    "name": "Master of Advanced Nursing Practice",
    "exposure": 76.38,
    "entryExposure": 70.05,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-anpnp": {
    "code": "mc-anpnp",
    "name": "Master of Advanced Nursing Practice (Nurse Practitioner)",
    "exposure": 76.38,
    "entryExposure": 70.05,
    "exposureTier": "variant",
    "adaptiveness": 10,
    "workplace": 8,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-ap": {
    "code": "mc-ap",
    "name": "Master of Applied Psychology",
    "exposure": 95.57,
    "entryExposure": 93.63,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-apbusa": {
    "code": "mc-apbusa",
    "name": "Master of Applied Business Analytics",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "partial",
    "adaptiveness": 8,
    "workplace": 2,
    "C1": 2,
    "C2": 1,
    "C3": 2,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-apling": {
    "code": "mc-apling",
    "name": "Master of Applied Linguistics",
    "exposure": 88.72,
    "entryExposure": 88.72,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 0,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-app": {
    "code": "mc-app",
    "name": "Master of Applied Positive Psychology",
    "exposure": 89.85,
    "entryExposure": 88.29,
    "exposureTier": "field",
    "adaptiveness": 10,
    "workplace": 2,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-arch": {
    "code": "mc-arch",
    "name": "Master of Architecture",
    "exposure": 87.99,
    "entryExposure": 87.08,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-archcm": {
    "code": "mc-archcm",
    "name": "Master of Architecture/Master of Construction Management",
    "exposure": 90.11,
    "entryExposure": 89.75,
    "exposureTier": "combined",
    "adaptiveness": 7,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-archeng": {
    "code": "mc-archeng",
    "name": "Master of Architectural Engineering",
    "exposure": 89.54,
    "entryExposure": 89.53,
    "exposureTier": "partial",
    "adaptiveness": 10,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-archuch": {
    "code": "mc-archuch",
    "name": "Master of Architecture/Master of Urban Cultural Heritage",
    "exposure": 90.34,
    "entryExposure": 89.7,
    "exposureTier": "partial",
    "adaptiveness": 10,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-archud": {
    "code": "mc-archud",
    "name": "Master of Architecture/Master of Urban Design",
    "exposure": 90.34,
    "entryExposure": 89.7,
    "exposureTier": "partial",
    "adaptiveness": 10,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-archup": {
    "code": "mc-archup",
    "name": "Master of Architecture/Master of Urban Planning",
    "exposure": 90.34,
    "entryExposure": 89.7,
    "exposureTier": "combined",
    "adaptiveness": 10,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-arclarc": {
    "code": "mc-arclarc",
    "name": "Master of Architecture/Master of Landscape Architecture",
    "exposure": 84.75,
    "entryExposure": 81.78,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-arcprop": {
    "code": "mc-arcprop",
    "name": "Master of Architecture/Master of Property",
    "exposure": 88.94,
    "entryExposure": 88.29,
    "exposureTier": "combined",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-ba": {
    "code": "mc-ba",
    "name": "Master of Business Administration",
    "exposure": 91.73,
    "entryExposure": 95.09,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-bamktg": {
    "code": "mc-bamktg",
    "name": "Master of Business Administration/Master of Marketing",
    "exposure": 88.95,
    "entryExposure": 89.11,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-base": {
    "code": "mc-base",
    "name": "Master of Advanced Social Enterprise",
    "exposure": 96.05,
    "entryExposure": 95.96,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-biomeng": {
    "code": "mc-biomeng",
    "name": "Master of Biomedical Engineering",
    "exposure": 87.13,
    "entryExposure": 87.13,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-biosenh": {
    "code": "mc-biosenh",
    "name": "Master of Biostatistics (Enhanced)",
    "exposure": 93.92,
    "entryExposure": 93.92,
    "exposureTier": "field",
    "adaptiveness": 4,
    "workplace": 2,
    "C1": 1,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-bmedsc": {
    "code": "mc-bmedsc",
    "name": "Master of Biomedical Science",
    "exposure": 82.09,
    "entryExposure": 79.22,
    "exposureTier": "cognate",
    "adaptiveness": 11,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 2,
    "W2": 3,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-bus": {
    "code": "mc-bus",
    "name": "Master of Business",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-busana": {
    "code": "mc-busana",
    "name": "Master of Business Analytics",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-cat": {
    "code": "mc-cat",
    "name": "Master of Creative Arts Therapy",
    "exposure": 76.66,
    "entryExposure": 72.12,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-chemeng": {
    "code": "mc-chemeng",
    "name": "Master of Chemical Engineering",
    "exposure": 89.78,
    "entryExposure": 91.16,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-civeng": {
    "code": "mc-civeng",
    "name": "Master of Civil Engineering",
    "exposure": 91.09,
    "entryExposure": 91.98,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-climsci": {
    "code": "mc-climsci",
    "name": "Master of Climate Science",
    "exposure": 83.13,
    "entryExposure": 75.79,
    "exposureTier": "cognate",
    "adaptiveness": 9,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-clind": {
    "code": "mc-clind",
    "name": "Master of Clinical Dentistry",
    "exposure": 60.96,
    "entryExposure": 60.92,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 7,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-clined": {
    "code": "mc-clined",
    "name": "Master of Clinical Education",
    "exposure": 81.63,
    "entryExposure": 81.63,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-clinrhb": {
    "code": "mc-clinrhb",
    "name": "Master of Clinical Rehabilitation",
    "exposure": 69.41,
    "entryExposure": 69.41,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 2,
    "C1": 1,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-cm": {
    "code": "mc-cm",
    "name": "Master of Construction Management",
    "exposure": 92.22,
    "entryExposure": 92.96,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-cmprop": {
    "code": "mc-cmprop",
    "name": "Master of Construction Management/Master of Property",
    "exposure": 91.21,
    "entryExposure": 91.08,
    "exposureTier": "combined",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 0,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-cncrsc": {
    "code": "mc-cncrsc",
    "name": "Master of Cancer Sciences",
    "exposure": 75.8,
    "entryExposure": 73.61,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 2,
    "C1": 1,
    "C2": 2,
    "C3": 0,
    "C4": 3,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-comact": {
    "code": "mc-comact",
    "name": "Master of Commerce (Accounting)",
    "exposure": 97.99,
    "entryExposure": 95.4,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-comacts": {
    "code": "mc-comacts",
    "name": "Master of Commerce (Actuarial Science)",
    "exposure": 97.99,
    "entryExposure": 97.94,
    "exposureTier": "cognate",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 0,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-comdrfs": {
    "code": "mc-comdrfs",
    "name": "Master of Commerce (Decision, Risk and Financial Sciences)",
    "exposure": 97.83,
    "entryExposure": 97.66,
    "exposureTier": "cognate",
    "adaptiveness": 11,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 1,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-09-01"
  },
  "mc-comeco": {
    "code": "mc-comeco",
    "name": "Master of Commerce (Economics)",
    "exposure": 96.53,
    "entryExposure": 95.84,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 1,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 0,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-comfin": {
    "code": "mc-comfin",
    "name": "Master of Commerce (Finance)",
    "exposure": 97.04,
    "entryExposure": 96.99,
    "exposureTier": "cognate",
    "adaptiveness": 6,
    "workplace": 1,
    "C1": 1,
    "C2": 0,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 0,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-commgmt": {
    "code": "mc-commgmt",
    "name": "Master of Commerce (Management)",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "cognate",
    "adaptiveness": 8,
    "workplace": 1,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 0,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-commktg": {
    "code": "mc-commktg",
    "name": "Master of Commerce (Marketing)",
    "exposure": 96.45,
    "entryExposure": 97.6,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 2,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-contcs": {
    "code": "mc-contcs",
    "name": "Master of Contemporary Chinese Studies",
    "exposure": 80.6,
    "entryExposure": 77.79,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-counsmo": {
    "code": "mc-counsmo",
    "name": "Master of Counselling",
    "exposure": 87,
    "entryExposure": 87,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 8,
    "C1": 1,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-cs": {
    "code": "mc-cs",
    "name": "Master of Computer Science",
    "exposure": 92.8,
    "entryExposure": 93.33,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 2,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-ctpyart": {
    "code": "mc-ctpyart",
    "name": "Master of Contemporary Art",
    "exposure": 71.19,
    "entryExposure": 63.73,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 5,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-cu": {
    "code": "mc-cu",
    "name": "Master of Clinical Ultrasound",
    "exposure": 70.02,
    "entryExposure": 69.04,
    "exposureTier": "field",
    "adaptiveness": 5,
    "workplace": 3,
    "C1": 0,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 0,
    "W2": 1,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-culmc": {
    "code": "mc-culmc",
    "name": "Master of Cultural Materials Conservation",
    "exposure": 71.38,
    "entryExposure": 68.49,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-cybscmo": {
    "code": "mc-cybscmo",
    "name": "Master of Cyber Security",
    "exposure": 92.91,
    "entryExposure": 93.46,
    "exposureTier": "cognate",
    "adaptiveness": 11,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 2,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-datasc": {
    "code": "mc-datasc",
    "name": "Master of Data Science",
    "exposure": 94.94,
    "entryExposure": 96.08,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 2,
    "C1": 2,
    "C2": 1,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-ddensur": {
    "code": "mc-ddensur",
    "name": "Doctor of Dental Surgery",
    "exposure": 63.31,
    "entryExposure": 64.24,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 9,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-desprod": {
    "code": "mc-desprod",
    "name": "Master of Design and Production",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 7,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-dinfeng": {
    "code": "mc-dinfeng",
    "name": "Master of Digital Infrastructure Engineering",
    "exposure": 91.09,
    "entryExposure": 91.98,
    "exposureTier": "cognate",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-dmed": {
    "code": "mc-dmed",
    "name": "Doctor of Medicine",
    "exposure": 80.58,
    "entryExposure": 73.78,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 7,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-dmktg": {
    "code": "mc-dmktg",
    "name": "Master of Digital Marketing",
    "exposure": 96.45,
    "entryExposure": 97.6,
    "exposureTier": "cognate",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-dnce": {
    "code": "mc-dnce",
    "name": "Master of Dance",
    "exposure": 68.44,
    "entryExposure": 68.44,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-doptom": {
    "code": "mc-doptom",
    "name": "Doctor of Optometry",
    "exposure": 80.13,
    "entryExposure": 77.63,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 9,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 3,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-dphysio": {
    "code": "mc-dphysio",
    "name": "Doctor of Physiotherapy",
    "exposure": 71.03,
    "entryExposure": 72.66,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 9,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-dvetmed": {
    "code": "mc-dvetmed",
    "name": "Doctor of Veterinary Medicine",
    "exposure": 62.4,
    "entryExposure": 63.57,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-eco": {
    "code": "mc-eco",
    "name": "Master of Economics",
    "exposure": 96.53,
    "entryExposure": 95.84,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-ecosmc": {
    "code": "mc-ecosmc",
    "name": "Master of Ecosystem Management and Conservation",
    "exposure": 89.88,
    "entryExposure": 89.79,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-ed": {
    "code": "mc-ed",
    "name": "Master of Education",
    "exposure": 92.44,
    "entryExposure": 94.16,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 2,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-edebt": {
    "code": "mc-edebt",
    "name": "Master of Education in Evidence-Based Teaching",
    "exposure": 92.44,
    "entryExposure": 94.16,
    "exposureTier": "variant",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-eleceng": {
    "code": "mc-eleceng",
    "name": "Master of Electrical Engineering",
    "exposure": 82.73,
    "entryExposure": 84.36,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-engysys": {
    "code": "mc-engysys",
    "name": "Master of Energy Systems",
    "exposure": 91.16,
    "entryExposure": 90.56,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-enrslaw": {
    "code": "mc-enrslaw",
    "name": "Master of Energy and Resources Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 3,
    "workplace": 3,
    "C1": 1,
    "C2": 0,
    "C3": 0,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-ensysen": {
    "code": "mc-ensysen",
    "name": "Master of Environmental Systems Engineering",
    "exposure": 91.09,
    "entryExposure": 91.98,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 2,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-entrpsp": {
    "code": "mc-entrpsp",
    "name": "Master of Entrepreneurship",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-env": {
    "code": "mc-env",
    "name": "Master of Environment",
    "exposure": 89.88,
    "entryExposure": 89.79,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-enveng": {
    "code": "mc-enveng",
    "name": "Master of Environmental Engineering",
    "exposure": 91.09,
    "entryExposure": 91.98,
    "exposureTier": "cognate",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-envlaw": {
    "code": "mc-envlaw",
    "name": "Master of Environmental Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 5,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-envsc": {
    "code": "mc-envsc",
    "name": "Master of Environmental Science",
    "exposure": 83.13,
    "entryExposure": 75.79,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-evalo": {
    "code": "mc-evalo",
    "name": "Master of Evaluation",
    "exposure": 96.58,
    "entryExposure": 94.75,
    "exposureTier": "exact",
    "adaptiveness": 6,
    "workplace": 2,
    "C1": 0,
    "C2": 2,
    "C3": 0,
    "C4": 3,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-filmtv": {
    "code": "mc-filmtv",
    "name": "Master of Film and Television",
    "exposure": 73.61,
    "entryExposure": 68.98,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 3,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-finance": {
    "code": "mc-finance",
    "name": "Master of Finance",
    "exposure": 97.04,
    "entryExposure": 96.99,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-finenh": {
    "code": "mc-finenh",
    "name": "Master of Finance (Enhanced)",
    "exposure": 97.04,
    "entryExposure": 96.99,
    "exposureTier": "variant",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 0,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-foodpi": {
    "code": "mc-foodpi",
    "name": "Master of Food and Packaging Innovation",
    "exposure": 79.43,
    "entryExposure": 71.85,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 1,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-gcclaw": {
    "code": "mc-gcclaw",
    "name": "Master of Global Competition and Consumer Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 1,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 0,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-gencoun": {
    "code": "mc-gencoun",
    "name": "Master of Genetic Counselling",
    "exposure": 93.27,
    "entryExposure": 94.5,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 8,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 3,
    "C5": 3,
    "W1": 2,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-genohlt": {
    "code": "mc-genohlt",
    "name": "Master of Genomics and Health",
    "exposure": 87.67,
    "entryExposure": 87.67,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 7,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-geog": {
    "code": "mc-geog",
    "name": "Master of Geography",
    "exposure": 91.75,
    "entryExposure": 92.61,
    "exposureTier": "cognate",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-geosc": {
    "code": "mc-geosc",
    "name": "Master of Geoscience",
    "exposure": 85.44,
    "entryExposure": 81.91,
    "exposureTier": "cognate",
    "adaptiveness": 6,
    "workplace": 5,
    "C1": 2,
    "C2": 0,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-gmcom": {
    "code": "mc-gmcom",
    "name": "Master of Global Media Communication",
    "exposure": 94.8,
    "entryExposure": 94.7,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 1,
    "C2": 2,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-hrmmo": {
    "code": "mc-hrmmo",
    "name": "Master of Human Resource Management",
    "exposure": 94.14,
    "entryExposure": 91.75,
    "exposureTier": "cognate",
    "adaptiveness": 4,
    "workplace": 4,
    "C1": 1,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-humrlaw": {
    "code": "mc-humrlaw",
    "name": "Master of Human Rights Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 4,
    "workplace": 2,
    "C1": 1,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 0,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-ib": {
    "code": "mc-ib",
    "name": "Master of International Business",
    "exposure": 87.44,
    "entryExposure": 86.65,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 0,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-ibl": {
    "code": "mc-ibl",
    "name": "Master of Indigenous Business Leadership",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "partial",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-indeng": {
    "code": "mc-indeng",
    "name": "Master of Industrial Engineering",
    "exposure": 88.8,
    "entryExposure": 87.96,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-inslead": {
    "code": "mc-inslead",
    "name": "Master of Instructional Leadership",
    "exposure": 92.27,
    "entryExposure": 91.53,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-intedib": {
    "code": "mc-intedib",
    "name": "Master of International Education (IB)",
    "exposure": 92.44,
    "entryExposure": 94.16,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-intjour": {
    "code": "mc-intjour",
    "name": "Master of International Journalism",
    "exposure": 91.48,
    "entryExposure": 92.18,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 5,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-ir": {
    "code": "mc-ir",
    "name": "Master of International Relations",
    "exposure": 95.97,
    "entryExposure": 95.57,
    "exposureTier": "exact",
    "adaptiveness": 7,
    "workplace": 5,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-is": {
    "code": "mc-is",
    "name": "Master of Information Systems",
    "exposure": 91.69,
    "entryExposure": 90.82,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-it": {
    "code": "mc-it",
    "name": "Master of Information Technology",
    "exposure": 92.91,
    "entryExposure": 93.46,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-journ": {
    "code": "mc-journ",
    "name": "Master of Journalism",
    "exposure": 91.48,
    "entryExposure": 92.18,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-jurisd": {
    "code": "mc-jurisd",
    "name": "Juris Doctor",
    "exposure": 94.43,
    "entryExposure": 93.12,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-larch": {
    "code": "mc-larch",
    "name": "Master of Landscape Architecture",
    "exposure": 88.03,
    "entryExposure": 86.66,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-09-01"
  },
  "mc-larchud": {
    "code": "mc-larchud",
    "name": "Master of Landscape Architecture/Master of Urban Design",
    "exposure": 92.85,
    "entryExposure": 92.85,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-larchup": {
    "code": "mc-larchup",
    "name": "Master of Landscape Architecture/Master of Urban Planning",
    "exposure": 92.85,
    "entryExposure": 92.85,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-li": {
    "code": "mc-li",
    "name": "Master of Learning Intervention",
    "exposure": 80.01,
    "entryExposure": 80.01,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 5,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-mecheng": {
    "code": "mc-mecheng",
    "name": "Master of Mechanical Engineering",
    "exposure": 85.55,
    "entryExposure": 85.82,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-mgmt": {
    "code": "mc-mgmt",
    "name": "Master of Management",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-mgmtact": {
    "code": "mc-mgmtact",
    "name": "Master of Management (Accounting)",
    "exposure": 97.99,
    "entryExposure": 95.4,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-mgmtafn": {
    "code": "mc-mgmtafn",
    "name": "Master of Management (Accounting and Finance)",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "variant",
    "adaptiveness": 5,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 1,
    "C5": 0,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-mgmtein": {
    "code": "mc-mgmtein",
    "name": "Master of Management (Entrepreneurship and Innovation)",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "variant",
    "adaptiveness": 7,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 0,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-mgmtfin": {
    "code": "mc-mgmtfin",
    "name": "Master of Management (Finance)",
    "exposure": 97.83,
    "entryExposure": 97.66,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-mgmthre": {
    "code": "mc-mgmthre",
    "name": "Master of Management (Human Resources)",
    "exposure": 94.14,
    "entryExposure": 91.75,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-14"
  },
  "mc-mgmtmkt": {
    "code": "mc-mgmtmkt",
    "name": "Master of Management (Marketing)",
    "exposure": 96.45,
    "entryExposure": 97.6,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-mgmtscm": {
    "code": "mc-mgmtscm",
    "name": "Master of Management (Supply Chain Management)",
    "exposure": 90.73,
    "entryExposure": 89.56,
    "exposureTier": "variant",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-mktcomm": {
    "code": "mc-mktcomm",
    "name": "Master of Marketing Communications",
    "exposure": 95.17,
    "entryExposure": 93.55,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-mled": {
    "code": "mc-mled",
    "name": "Master of Modern Languages Education",
    "exposure": 93.99,
    "entryExposure": 95.74,
    "exposureTier": "partial",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-mti": {
    "code": "mc-mti",
    "name": "Master of Medical Technology Innovation",
    "exposure": 87.13,
    "entryExposure": 87.13,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 4,
    "C1": 2,
    "C2": 0,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-mtrneng": {
    "code": "mc-mtrneng",
    "name": "Master of Mechatronics Engineering",
    "exposure": 83.23,
    "entryExposure": 82.37,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-musop": {
    "code": "mc-musop",
    "name": "Master of Music (Opera Performance)",
    "exposure": 70.7,
    "entryExposure": 67.8,
    "exposureTier": "field",
    "adaptiveness": 5,
    "workplace": 5,
    "C1": 1,
    "C2": 2,
    "C3": 0,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-musorp": {
    "code": "mc-musorp",
    "name": "Master of Music (Orchestral Performance)",
    "exposure": 70.7,
    "entryExposure": 67.8,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-muspt": {
    "code": "mc-muspt",
    "name": "Master of Music (Performance Teaching)",
    "exposure": 70.7,
    "entryExposure": 67.8,
    "exposureTier": "field",
    "adaptiveness": 5,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 0,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-ntcw": {
    "code": "mc-ntcw",
    "name": "Master of Narrative Therapy and Community Work",
    "exposure": 87,
    "entryExposure": 87,
    "exposureTier": "field",
    "adaptiveness": 5,
    "workplace": 6,
    "C1": 0,
    "C2": 2,
    "C3": 0,
    "C4": 1,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-29"
  },
  "mc-nursc": {
    "code": "mc-nursc",
    "name": "Master of Nursing Science",
    "exposure": 72.69,
    "entryExposure": 69.07,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 8,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-phtypae": {
    "code": "mc-phtypae",
    "name": "Master of Physiotherapy (Paediatrics)",
    "exposure": 71.03,
    "entryExposure": 72.66,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-phtyph": {
    "code": "mc-phtyph",
    "name": "Master of Physiotherapy (Pelvic Health)",
    "exposure": 71.03,
    "entryExposure": 72.66,
    "exposureTier": "cognate",
    "adaptiveness": 9,
    "workplace": 7,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-privlaw": {
    "code": "mc-privlaw",
    "name": "Master of Private Law",
    "exposure": 94.83,
    "entryExposure": 94.15,
    "exposureTier": "partial",
    "adaptiveness": 4,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 0,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 0,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-prop": {
    "code": "mc-prop",
    "name": "Master of Property",
    "exposure": 89.89,
    "entryExposure": 89.51,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-propsyc": {
    "code": "mc-propsyc",
    "name": "Master of Professional Psychology",
    "exposure": 97.19,
    "entryExposure": 98.3,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 7,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-propup": {
    "code": "mc-propup",
    "name": "Master of Property/Master of Urban Planning",
    "exposure": 91.37,
    "entryExposure": 91.03,
    "exposureTier": "combined",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 2,
    "C2": 0,
    "C3": 1,
    "C4": 1,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-psyched": {
    "code": "mc-psyched",
    "name": "Master of Psychology (Educational and Developmental)",
    "exposure": 95.57,
    "entryExposure": 93.63,
    "exposureTier": "partial",
    "adaptiveness": 10,
    "workplace": 7,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-pubcom": {
    "code": "mc-pubcom",
    "name": "Master of Publishing and Communications",
    "exposure": 84.04,
    "entryExposure": 83.73,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 4,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-scibif": {
    "code": "mc-scibif",
    "name": "Master of Science (Bioinformatics)",
    "exposure": 78.62,
    "entryExposure": 76.89,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-scibio": {
    "code": "mc-scibio",
    "name": "Master of Science (BioSciences)",
    "exposure": 81.42,
    "entryExposure": 77.86,
    "exposureTier": "cognate",
    "adaptiveness": 11,
    "workplace": 4,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-scibit": {
    "code": "mc-scibit",
    "name": "Master of Biotechnology",
    "exposure": 86.37,
    "entryExposure": 83.68,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-sciche": {
    "code": "mc-sciche",
    "name": "Master of Science (Chemistry)",
    "exposure": 78.95,
    "entryExposure": 74.97,
    "exposureTier": "cognate",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 0,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-sciear": {
    "code": "mc-sciear",
    "name": "Master of Science (Earth Sciences)",
    "exposure": 85.44,
    "entryExposure": 81.91,
    "exposureTier": "cognate",
    "adaptiveness": 10,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 1,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-sciepi": {
    "code": "mc-sciepi",
    "name": "Master of Science (Epidemiology)",
    "exposure": 89.46,
    "entryExposure": 84.77,
    "exposureTier": "partial",
    "adaptiveness": 8,
    "workplace": 3,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-scimat": {
    "code": "mc-scimat",
    "name": "Master of Science (Mathematics and Statistics)",
    "exposure": 95.71,
    "entryExposure": 95.18,
    "exposureTier": "cognate",
    "adaptiveness": 8,
    "workplace": 3,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-sciphy": {
    "code": "mc-sciphy",
    "name": "Master of Science (Physics)",
    "exposure": 94.4,
    "entryExposure": 94.55,
    "exposureTier": "cognate",
    "adaptiveness": 8,
    "workplace": 1,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 0,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-scl": {
    "code": "mc-scl",
    "name": "Master of Social Change Leadership",
    "exposure": 80.6,
    "entryExposure": 77.79,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 3,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-scwr": {
    "code": "mc-scwr",
    "name": "Master of Screenwriting",
    "exposure": 73.61,
    "entryExposure": 68.98,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 1,
    "W1": 2,
    "W2": 3,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-socw": {
    "code": "mc-socw",
    "name": "Master of Social Work",
    "exposure": 86.73,
    "entryExposure": 84.59,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 9,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-softeng": {
    "code": "mc-softeng",
    "name": "Master of Software Engineering",
    "exposure": 83.3,
    "entryExposure": 81.63,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 0,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-spchpth": {
    "code": "mc-spchpth",
    "name": "Master of Speech Pathology",
    "exposure": 89.56,
    "entryExposure": 91.37,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 9,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 3,
    "W2": 3,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-spmed": {
    "code": "mc-spmed",
    "name": "Master of Sports Medicine",
    "exposure": 76.03,
    "entryExposure": 76.03,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-surged": {
    "code": "mc-surged",
    "name": "Master of Surgical Education",
    "exposure": 92.44,
    "entryExposure": 94.16,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 3,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-16"
  },
  "mc-tchecp": {
    "code": "mc-tchecp",
    "name": "Master of Teaching (Early Childhood and Primary)",
    "exposure": 77.63,
    "entryExposure": 74.55,
    "exposureTier": "field",
    "adaptiveness": 9,
    "workplace": 0,
    "C1": 2,
    "C2": 1,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 0,
    "W2": 0,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-teachec": {
    "code": "mc-teachec",
    "name": "Master of Teaching (Early Childhood)",
    "exposure": 77.63,
    "entryExposure": 74.55,
    "exposureTier": "field",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 1,
    "W1": 1,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-teachpr": {
    "code": "mc-teachpr",
    "name": "Master of Teaching (Primary)",
    "exposure": 87.71,
    "entryExposure": 89.16,
    "exposureTier": "pooled",
    "adaptiveness": 10,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-teachsa": {
    "code": "mc-teachsa",
    "name": "Master of Teaching (Secondary)",
    "exposure": 89.03,
    "entryExposure": 92.79,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-teachsi": {
    "code": "mc-teachsi",
    "name": "Master of Teaching (Secondary) Internship",
    "exposure": 81.05,
    "entryExposure": 80.93,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 1,
    "W2": 2,
    "W3": 3,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-tesol": {
    "code": "mc-tesol",
    "name": "Master of TESOL",
    "exposure": 93.99,
    "entryExposure": 95.74,
    "exposureTier": "exact",
    "adaptiveness": 9,
    "workplace": 3,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 1,
    "gates": {
      "G1": "FAIL",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-thtr": {
    "code": "mc-thtr",
    "name": "Master of Theatre",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 7,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-thtrdir": {
    "code": "mc-thtrdir",
    "name": "Master of Theatre (Directing)",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-thtrdra": {
    "code": "mc-thtrdra",
    "name": "Master of Theatre (Dramaturgy)",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 0,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 1,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-thtrwri": {
    "code": "mc-thtrwri",
    "name": "Master of Theatre (Writing)",
    "exposure": 72.81,
    "entryExposure": 71.75,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 4,
    "C1": 2,
    "C2": 1,
    "C3": 0,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-tranint": {
    "code": "mc-tranint",
    "name": "Master of Translation and Interpreting",
    "exposure": 89.57,
    "entryExposure": 89.57,
    "exposureTier": "field",
    "adaptiveness": 10,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 2,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-uch": {
    "code": "mc-uch",
    "name": "Master of Urban and Cultural Heritage",
    "exposure": 92.85,
    "entryExposure": 92.85,
    "exposureTier": "partial",
    "adaptiveness": 6,
    "workplace": 6,
    "C1": 1,
    "C2": 1,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "FAIL",
      "G2": "FAIL"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-upud": {
    "code": "mc-upud",
    "name": "Master of Urban Planning/Master of Urban Design",
    "exposure": 92.85,
    "entryExposure": 92.85,
    "exposureTier": "partial",
    "adaptiveness": 10,
    "workplace": 7,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "mc-urbdes": {
    "code": "mc-urbdes",
    "name": "Master of Urban Design",
    "exposure": 92.85,
    "entryExposure": 92.85,
    "exposureTier": "partial",
    "adaptiveness": 9,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 2,
    "W1": 2,
    "W2": 3,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-15"
  },
  "mc-urbhort": {
    "code": "mc-urbhort",
    "name": "Master of Urban Horticulture",
    "exposure": 79.91,
    "entryExposure": 85.22,
    "exposureTier": "exact",
    "adaptiveness": 8,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 1,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "mc-urpl": {
    "code": "mc-urpl",
    "name": "Master of Urban Planning",
    "exposure": 92.85,
    "entryExposure": 92.85,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 5,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 2,
    "C5": 3,
    "W1": 2,
    "W2": 3,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-25"
  },
  "mc-vetstdr": {
    "code": "mc-vetstdr",
    "name": "Master of Veterinary Studies",
    "exposure": 62.4,
    "entryExposure": 63.57,
    "exposureTier": "cognate",
    "adaptiveness": 3,
    "workplace": 6,
    "C1": 1,
    "C2": 0,
    "C3": 0,
    "C4": 1,
    "C5": 1,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  },
  "mc-ymhmo": {
    "code": "mc-ymhmo",
    "name": "Master of Youth Mental Health",
    "exposure": 76.74,
    "entryExposure": 76.43,
    "exposureTier": "field",
    "adaptiveness": 5,
    "workplace": 2,
    "C1": 1,
    "C2": 0,
    "C3": 0,
    "C4": 3,
    "C5": 1,
    "W1": 1,
    "W2": 1,
    "W3": 0,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-31"
  },
  "me-dcd": {
    "code": "me-dcd",
    "name": "Doctor of Clinical Dentistry",
    "exposure": 60.96,
    "entryExposure": 60.92,
    "exposureTier": "exact",
    "adaptiveness": 10,
    "workplace": 4,
    "C1": 1,
    "C2": 2,
    "C3": 1,
    "C4": 3,
    "C5": 3,
    "W1": 1,
    "W2": 1,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-23"
  },
  "n01aa": {
    "code": "n01aa",
    "name": "Master of Clinical Research",
    "exposure": 75.8,
    "entryExposure": 73.61,
    "exposureTier": "field",
    "adaptiveness": 8,
    "workplace": 6,
    "C1": 2,
    "C2": 2,
    "C3": 1,
    "C4": 1,
    "C5": 2,
    "W1": 2,
    "W2": 2,
    "W3": 2,
    "gates": {
      "G1": "PASS",
      "G2": "PASS"
    },
    "verifiedAt": "2026-08-30"
  }
};

export const v4IndexByCode = (code: string): V4IndexEntry | undefined =>
  V4_INDEX[code.toLowerCase()];
