// compass/app/src/compass/marketData.ts

// DATA QUALITY NOTES:
// - employmentRate & medianSalary: sourced from QILT GOS 2024 National Report Tables (PGC, short-term ~4-6 months post-graduation)
// - employmentRate3yr & medianSalary3yr: sourced from QILT GOS-L 2025 National Report Tables (PGC, medium-term ~3 years post-graduation)
//   Sheet: STMT_PGC_ALL_1Y_AREA — domestic full-time employment rate (FTE) and median salary by broad study area
// - internationalEmploymentRate & internationalMedianSalary: sourced from QILT GOS 2024 International Report Tables
//   Sheet: EMP_PGC_ALL_2Y_AREA (FTE 2024 column) and SAL_PGC_ALL_2Y_AREA_E315 (Total 2024 column)
//   Note: international data is for onshore international PGC graduates, short-term (~4-6 months post-graduation), 2-year pooled (2023-2024)
// - occupationDemand: sourced from JSA Skills Priority List 2025
// - aiExposure: Felten, Raj & Seamans (2021) AI Occupational Exposure Index (AIOE) — percentile-normalized to 0-1 scale
//   See: https://github.com/AIOE-Data/AIOE

export type OccupationDemand = 'SHORTAGE' | 'RECRUITMENT_DIFFICULTY' | 'MET' | 'NO_DATA';
export type MarketMomentum = 'GROWING' | 'STABLE' | 'DECLINING';

export interface MarketFieldData {
  field: string;
  // Join key (program -> study-area -> occupations -> demand). Field-level; per-program lookup via getFieldForCourse().
  // anzscoCodes: top skill-level-1 graduate destinations (ANZSCO-6) from JSA HEO Work&Occupation Table_3 (PLIDA x ATO).
  // adzunaTerm: representative search term for demand-side (live-vacancy) pulls. See scratch/au-jobinsights/program_labour_map.json.
  anzscoCodes?: string[];
  adzunaTerm?: string;
  employmentRate: number;
  medianSalary: number;
  employmentRate3yr: number;
  medianSalary3yr: number;
  internationalEmploymentRate: number;
  internationalMedianSalary: number;
  occupationDemand: OccupationDemand;
  aiExposure: number;
  marketMomentum: MarketMomentum;
  sources: string[];
  year: number;
}

export const MARKET_DATA: Record<string, MarketFieldData> = {
  engineering: {
    field: 'Engineering',
    anzscoCodes: ['233211', '233512', '233311'],
    adzunaTerm: 'engineer',
    employmentRate: 0.883,
    medianSalary: 111000,
    employmentRate3yr: 0.975,
    medianSalary3yr: 130000,
    internationalEmploymentRate: 0.572,
    internationalMedianSalary: 74100,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.80,
    marketMomentum: 'GROWING',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  it: {
    field: 'Information Technology',
    anzscoCodes: ['261313', '261312', '261111'],
    adzunaTerm: 'software engineer',
    employmentRate: 0.812,
    medianSalary: 110000,
    employmentRate3yr: 0.941,
    medianSalary3yr: 127000,
    internationalEmploymentRate: 0.490,
    internationalMedianSalary: 70000,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.85,
    marketMomentum: 'GROWING',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  health: {
    field: 'Health',
    anzscoCodes: ['254499', '252511', '254418'],
    adzunaTerm: 'allied health',
    employmentRate: 0.871,
    medianSalary: 103000,
    employmentRate3yr: 0.952,
    medianSalary3yr: 112100,
    internationalEmploymentRate: 0.560,
    internationalMedianSalary: 73200,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.60,
    marketMomentum: 'GROWING',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  business: {
    field: 'Business & Management',
    anzscoCodes: ['221111', '225113', '131112'],
    adzunaTerm: 'business analyst',
    employmentRate: 0.923,
    medianSalary: 124000,
    employmentRate3yr: 0.962,
    medianSalary3yr: 141000,
    internationalEmploymentRate: 0.565,
    internationalMedianSalary: 65000,
    occupationDemand: 'MET',
    aiExposure: 0.96,
    marketMomentum: 'STABLE',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  architecture: {
    field: 'Architecture & Building',
    anzscoCodes: ['232111', '232611', '133111'],
    adzunaTerm: 'architect',
    employmentRate: 0.748,
    medianSalary: 84500,
    employmentRate3yr: 0.948,
    medianSalary3yr: 93200,
    internationalEmploymentRate: 0.514,
    internationalMedianSalary: 65000,
    occupationDemand: 'RECRUITMENT_DIFFICULTY',
    aiExposure: 0.75,
    marketMomentum: 'STABLE',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  creative_arts: {
    field: 'Creative Arts',
    anzscoCodes: ['232411', '225311', '225113'],
    adzunaTerm: 'graphic designer',
    employmentRate: 0.669,
    medianSalary: 81000,
    employmentRate3yr: 0.858,
    medianSalary3yr: 99000,
    internationalEmploymentRate: 0.416,
    internationalMedianSalary: 61300,
    occupationDemand: 'MET',
    aiExposure: 0.63,
    marketMomentum: 'DECLINING',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  education: {
    field: 'Education',
    anzscoCodes: ['241213', '241411', '241000'],
    adzunaTerm: 'teacher',
    employmentRate: 0.899,
    medianSalary: 96000,
    employmentRate3yr: 0.961,
    medianSalary3yr: 110000,
    internationalEmploymentRate: 0.657,
    internationalMedianSalary: 73100,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.70,
    marketMomentum: 'GROWING',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  law: {
    field: 'Law',
    anzscoCodes: ['271311', '271111', '271299'],
    adzunaTerm: 'lawyer',
    employmentRate: 0.894,
    medianSalary: 90000,
    employmentRate3yr: 0.957,
    medianSalary3yr: 120000,
    internationalEmploymentRate: 0.698,
    internationalMedianSalary: 70200,
    occupationDemand: 'MET',
    aiExposure: 0.90,
    marketMomentum: 'STABLE',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  science: {
    field: 'Science',
    anzscoCodes: ['234611', '234411', '242112'],
    adzunaTerm: 'scientist',
    employmentRate: 0.793,
    medianSalary: 100000,
    employmentRate3yr: 0.943,
    medianSalary3yr: 107000,
    internationalEmploymentRate: 0.480,
    internationalMedianSalary: 66000,
    occupationDemand: 'RECRUITMENT_DIFFICULTY',
    aiExposure: 0.78,
    marketMomentum: 'STABLE',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  agriculture: {
    field: 'Agriculture & Environment',
    anzscoCodes: ['234312', '234313', '234112'],
    adzunaTerm: 'agricultural scientist',
    employmentRate: 0.803,
    medianSalary: 94000,
    employmentRate3yr: 0.935,
    medianSalary3yr: 100800,
    internationalEmploymentRate: 0.443,
    internationalMedianSalary: 70000,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.60,
    marketMomentum: 'GROWING',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
  other: {
    field: 'Other',
    anzscoCodes: ['272511', '271311', '272399'],
    adzunaTerm: 'policy officer',
    employmentRate: 0.752,
    medianSalary: 88500,
    employmentRate3yr: 0.926,
    medianSalary3yr: 102100,
    internationalEmploymentRate: 0.561,
    internationalMedianSalary: 60500,
    occupationDemand: 'MET',
    aiExposure: 0.50,
    marketMomentum: 'STABLE',
    sources: ['QILT GOS 2024 National Report Tables', 'QILT GOS-L 2025 National Report Tables', 'QILT GOS 2024 International Report Tables', 'JSA Skills Priority List 2025', 'Felten, Raj & Seamans (2021) AI Occupational Exposure Index'],
    year: 2024,
  },
};

/** Map a course code to its broad field */
export function getFieldForCourse(courseCode: string): string {
  const code = courseCode.toLowerCase();
  const map: Record<string, string> = {
    'mc-cs': 'it', 'mc-datasc': 'it', 'mc-it': 'it', 'mc-scicmp': 'it', 'mc-is': 'it',
    'mc-indeng': 'engineering', '746st': 'engineering', 'mc-eng': 'engineering',
    'mc-engbiom': 'engineering', 'mc-engchem': 'engineering', 'mc-engcivil': 'engineering',
    'mc-engelec': 'engineering', 'mc-engmech': 'engineering', 'mc-engmtrl': 'engineering',
    'mc-engsoft': 'engineering', 'mc-engstruct': 'engineering',
    'mc-propsyc': 'health', '527cl': 'health', 'mc-phtyph': 'health',
    'mc-surged': 'health', 'mc-clind': 'health', 'mc-gencoun': 'health',
    'mc-bmedsc': 'health', 'mc-nursc': 'health', 'mc-psychclin': 'health',
    'mc-pubhealth': 'health', 'mc-clinepi': 'health', 'mc-clinresearch': 'health',
    'mc-dental': 'health', 'mc-optom': 'health', 'mc-physio': 'health',
    'mc-pharm': 'health', 'mc-vet': 'health', 'mc-socwork': 'health',
    'mc-audiology': 'health', 'mc-speechpath': 'health',
    'mc-bamktg': 'business', 'mc-base': 'business', 'mc-apbusa': 'business',
    'mc-mba': 'business', 'mc-mktg': 'business', 'mc-fin': 'business',
    'mc-econ': 'business', 'mc-ba': 'business', 'mc-intlbiz': 'business',
    'mc-supplychain': 'business', 'mc-hrm': 'business', 'mc-entre': 'business',
    'mc-busana': 'business', 'mc-mgt': 'business', 'mc-actscfin': 'business',
    'mc-urbdes': 'architecture', 'mc-urbplan': 'architecture', 'mc-urbhort': 'architecture',
    'mc-arch': 'architecture', 'mc-landsarch': 'architecture', 'mc-constrmgmt': 'architecture',
    'mc-prop': 'architecture',
    'mc-scwr': 'creative_arts', 'mc-film': 'creative_arts', 'mc-finearts': 'creative_arts',
    'mc-curating': 'creative_arts', 'mc-music': 'creative_arts', 'mc-musiced': 'creative_arts',
    'mc-musicperf': 'creative_arts', 'mc-musictherapy': 'creative_arts',
    'mc-intedib': 'education', 'mc-teachprim': 'education', 'mc-teachsec': 'education',
    'mc-ed': 'education', 'mc-edlead': 'education', 'mc-tesol': 'education',
    'mc-comlaw': 'law', 'mc-tax': 'law', 'mc-envlaw': 'law', 'mc-intlaw': 'law',
    'mc-hrlaw': 'law', 'mc-law': 'law',
    'mc-sciphy': 'science', 'mc-scibio': 'science', 'mc-sciche': 'science',
    'mc-sciear': 'science', 'mc-sciepi': 'science', 'mc-scibit': 'science',
    'mc-scibif': 'science', 'mc-envsc': 'science', 'mc-climsci': 'science',
    'mc-actsc': 'science', 'b-sci': 'science',
    'mc-agr': 'agriculture', 'mc-food': 'agriculture', 'mc-forest': 'agriculture',
    'mc-agribus': 'agriculture', 'mc-animsci': 'agriculture',
    '439fs': 'health', 'b-des': 'architecture',
    'mc-appliedling': 'education', 'mc-creativewrit': 'creative_arts',
    'mc-crim': 'law', 'mc-devstud': 'other', 'mc-journ': 'creative_arts',
    'mc-intlrel': 'other', 'mc-pubpol': 'other', 'mc-socpol': 'other',
  };
  return map[code] ?? 'other';
}

/** Score D10 (Outcome Evidence) based on market data availability */
export function scoreOutcomeEvidence(field: string): number {
  const d = MARKET_DATA[field];
  if (!d) return 1;
  let score = 1; // base: we have SOME data
  if (d.employmentRate > 0.80) score += 1;
  if (d.employmentRate3yr > 0.90) score += 1;
  if (d.medianSalary > 70000) score += 1;
  return Math.min(score, 3);
}

/** Score D11 (Labour Market Durability - new optional dimension) */
export function scoreLabourMarketDurability(field: string): number {
  const d = MARKET_DATA[field];
  if (!d) return 1;
  let score = 0;
  if (d.occupationDemand === 'SHORTAGE') score += 2;
  else if (d.occupationDemand === 'RECRUITMENT_DIFFICULTY') score += 1;
  if (d.aiExposure < 0.30) score += 1;
  if (d.employmentRate3yr > 0.90) score += 1;
  return Math.min(score, 3);
}
