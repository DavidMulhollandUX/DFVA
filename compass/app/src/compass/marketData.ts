// compass/app/src/compass/marketData.ts

// DATA QUALITY NOTES:
// - employmentRate & medianSalary: sourced from QILT GOS 2024 National Report Tables (PGC)
// - employmentRate3yr: estimated from GOS-L 2025 aggregate data (PGC 3-year multiplier applied)
// - medianSalary3yr: estimated using 1.15x multiplier on 1-year salary (conservative per GOS-L trends)
// - occupationDemand: sourced from JSA Skills Priority List 2025
// - aiExposure: academic consensus estimates (Frey & Osborne 2013; Felten et al. 2021; OECD 2023)
// TODO: Source exact GOS-L field-level 3-year data (B.1)
// TODO: Source ANZSCO-level AIOE scores from Felten et al. (2021) dataset (B.2)
// TODO: Source GOS International Report for international graduate outcomes (B.4)

export type OccupationDemand = 'SHORTAGE' | 'RECRUITMENT_DIFFICULTY' | 'MET' | 'NO_DATA';

export interface MarketFieldData {
  field: string;
  employmentRate: number;
  medianSalary: number;
  employmentRate3yr: number;
  medianSalary3yr: number;
  occupationDemand: OccupationDemand;
  aiExposure: number;
  sources: string[];
  year: number;
}

export const MARKET_DATA: Record<string, MarketFieldData> = {
  engineering: {
    field: 'Engineering',
    employmentRate: 0.883,
    medianSalary: 111000,
    employmentRate3yr: 0.97,
    medianSalary3yr: 127650,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.40,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  it: {
    field: 'Information Technology',
    employmentRate: 0.812,
    medianSalary: 110000,
    employmentRate3yr: 0.89,
    medianSalary3yr: 126500,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.65,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  health: {
    field: 'Health',
    employmentRate: 0.871,
    medianSalary: 103000,
    employmentRate3yr: 0.96,
    medianSalary3yr: 118450,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.10,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  business: {
    field: 'Business & Management',
    employmentRate: 0.923,
    medianSalary: 124000,
    employmentRate3yr: 0.99,
    medianSalary3yr: 142600,
    occupationDemand: 'MET',
    aiExposure: 0.55,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  architecture: {
    field: 'Architecture & Building',
    employmentRate: 0.748,
    medianSalary: 84500,
    employmentRate3yr: 0.82,
    medianSalary3yr: 97175,
    occupationDemand: 'RECRUITMENT_DIFFICULTY',
    aiExposure: 0.30,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  creative_arts: {
    field: 'Creative Arts',
    employmentRate: 0.669,
    medianSalary: 81000,
    employmentRate3yr: 0.74,
    medianSalary3yr: 93150,
    occupationDemand: 'MET',
    aiExposure: 0.70,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  education: {
    field: 'Education',
    employmentRate: 0.899,
    medianSalary: 96000,
    employmentRate3yr: 0.99,
    medianSalary3yr: 110400,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.15,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  law: {
    field: 'Law',
    employmentRate: 0.894,
    medianSalary: 90000,
    employmentRate3yr: 0.98,
    medianSalary3yr: 103500,
    occupationDemand: 'MET',
    aiExposure: 0.45,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  science: {
    field: 'Science',
    employmentRate: 0.793,
    medianSalary: 100000,
    employmentRate3yr: 0.87,
    medianSalary3yr: 115000,
    occupationDemand: 'RECRUITMENT_DIFFICULTY',
    aiExposure: 0.40,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  agriculture: {
    field: 'Agriculture & Environment',
    employmentRate: 0.803,
    medianSalary: 94000,
    employmentRate3yr: 0.88,
    medianSalary3yr: 108100,
    occupationDemand: 'SHORTAGE',
    aiExposure: 0.25,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
  other: {
    field: 'Other',
    employmentRate: 0.752,
    medianSalary: 88500,
    employmentRate3yr: 0.83,
    medianSalary3yr: 101775,
    occupationDemand: 'MET',
    aiExposure: 0.45,
    sources: ['QILT GOS 2024 National Report Tables', 'JSA Skills Priority List 2025', 'Academic consensus (Frey & Osborne 2013; Felten, Raj & Seamans 2021; OECD 2023)'],
    year: 2024,
  },
};

/** Map a course code to its broad field */
export function getFieldForCourse(courseCode: string): string {
  const code = courseCode.toLowerCase();
  const map: Record<string, string> = {
    'mc-cs': 'it', 'mc-datasc': 'it', 'mc-it': 'it', 'mc-scicmp': 'it',
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
