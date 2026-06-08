export interface DimensionScore {
  label: string;
  score: number;
  max: number;
}

export interface ProgramReport {
  program: string;
  institution: string;
  level: string;
  date: string;
  score: number;
  maxScore: number;
  riskBand: "RESILIENT" | "MODERATE RISK" | "HIGH RISK" | "CRITICAL";
  thresholds: { q1: string; q2: string; q3: string };
  dimensions: DimensionScore[];
  assessmentSlug: string;
  marketSlug: string;
  recommendSlug?: string;
  handbookUrl?: string;
}

export const PROGRAMS: ProgramReport[] = [
  {
    program: "Bachelor of Design",
    institution: "University of Melbourne",
    level: "Bachelor · 3 years",
    date: "2026-04-21",
    score: 17,
    maxScore: 36,
    riskBand: "HIGH RISK",
    thresholds: { q1: "YES", q2: "UNCERTAIN", q3: "NO" },
    dimensions: [
      { label: "Automation Exposure", score: 1, max: 3 },
      { label: "Systems Thinking", score: 2, max: 3 },
      { label: "Technical Depth", score: 1, max: 3 },
      { label: "Decision-Making", score: 2, max: 3 },
      { label: "AI Literacy", score: 1, max: 3 },
      { label: "Domain Depth", score: 2, max: 3 },
      { label: "Research Rigour", score: 1, max: 3 },
      { label: "Human & Relational", score: 2, max: 3 },
      { label: "Curriculum Currency", score: 2, max: 3 },
      { label: "Outcome Evidence", score: 1, max: 3 },
      { label: "Irreplaceability (bonus)", score: 2, max: 3 },
    ],
    assessmentSlug: "dfva-b-des",
    marketSlug: "dfva-market-b-des",
    recommendSlug: "dfva-recommend-b-des",
    handbookUrl: "https://handbook.unimelb.edu.au/2025/courses/b-des",
  },
  {
    program: "Master of Information Systems",
    institution: "University of Melbourne",
    level: "Master · 1.5–2 years",
    date: "2026-05-07",
    score: 18,
    maxScore: 36,
    riskBand: "HIGH RISK",
    thresholds: { q1: "YES", q2: "UNCERTAIN", q3: "NO" },
    dimensions: [
      { label: "Automation Exposure", score: 1, max: 3 },
      { label: "Systems Thinking", score: 2, max: 3 },
      { label: "Technical Depth", score: 2, max: 3 },
      { label: "Decision-Making", score: 2, max: 3 },
      { label: "AI Literacy", score: 1, max: 3 },
      { label: "Domain Depth", score: 2, max: 3 },
      { label: "Research Rigour", score: 2, max: 3 },
      { label: "Human & Relational", score: 2, max: 3 },
      { label: "Curriculum Currency", score: 2, max: 3 },
      { label: "Outcome Evidence", score: 1, max: 3 },
      { label: "Irreplaceability (bonus)", score: 1, max: 3 },
    ],
    assessmentSlug: "dfva-mc-is",
    marketSlug: "dfva-market-mc-is",
    recommendSlug: "dfva-recommend-mc-is",
    handbookUrl: "https://handbook.unimelb.edu.au/2025/courses/mc-is",
  },
  {
    program: "Bachelor of Science",
    institution: "University of Melbourne",
    level: "Bachelor · 3 years",
    date: "2026-05-13",
    score: 23,
    maxScore: 36,
    riskBand: "MODERATE RISK",
    thresholds: { q1: "UNCERTAIN", q2: "YES", q3: "UNCERTAIN" },
    dimensions: [
      { label: "Automation Exposure", score: 2, max: 3 },
      { label: "Systems Thinking", score: 2, max: 3 },
      { label: "Technical Depth", score: 3, max: 3 },
      { label: "Decision-Making", score: 2, max: 3 },
      { label: "AI Literacy", score: 1, max: 3 },
      { label: "Domain Depth", score: 3, max: 3 },
      { label: "Research Rigour", score: 3, max: 3 },
      { label: "Human & Relational", score: 1, max: 3 },
      { label: "Curriculum Currency", score: 2, max: 3 },
      { label: "Outcome Evidence", score: 2, max: 3 },
      { label: "Irreplaceability (bonus)", score: 2, max: 3 },
    ],
    assessmentSlug: "dfva-b-sci",
    marketSlug: "dfva-market-b-sci",
    recommendSlug: "dfva-recommend-b-sci",
    handbookUrl: "https://handbook.unimelb.edu.au/2025/courses/b-sci",
  },
  {
    program: "Master of Biotechnology",
    institution: "University of Melbourne",
    level: "Master · 2 years",
    date: "2026-05-13",
    score: 24,
    maxScore: 36,
    riskBand: "MODERATE RISK",
    thresholds: { q1: "NO", q2: "YES", q3: "YES" },
    dimensions: [
      { label: "Automation Exposure", score: 2, max: 3 },
      { label: "Systems Thinking", score: 2, max: 3 },
      { label: "Technical Depth", score: 2, max: 3 },
      { label: "Decision-Making", score: 3, max: 3 },
      { label: "AI Literacy", score: 1, max: 3 },
      { label: "Domain Depth", score: 3, max: 3 },
      { label: "Research Rigour", score: 2, max: 3 },
      { label: "Human & Relational", score: 3, max: 3 },
      { label: "Curriculum Currency", score: 2, max: 3 },
      { label: "Outcome Evidence", score: 1, max: 3 },
      { label: "Irreplaceability (bonus)", score: 3, max: 3 },
    ],
    assessmentSlug: "dfva-mc-scibit",
    marketSlug: "dfva-market-mc-scibit",
    recommendSlug: "dfva-recommend-mc-scibit",
    handbookUrl: "https://handbook.unimelb.edu.au/2025/courses/mc-scibit",
  },
  {
    program: "Master of Science (Earth Sciences)",
    institution: "University of Melbourne",
    level: "Master · 2 years",
    date: "2026-05-15",
    score: 24,
    maxScore: 36,
    riskBand: "MODERATE RISK",
    thresholds: { q1: "NO", q2: "YES", q3: "UNCERTAIN" },
    dimensions: [
      { label: "Automation Exposure", score: 3, max: 3 },
      { label: "Systems Thinking", score: 2, max: 3 },
      { label: "Technical Depth", score: 3, max: 3 },
      { label: "Decision-Making", score: 3, max: 3 },
      { label: "AI Literacy", score: 1, max: 3 },
      { label: "Domain Depth", score: 3, max: 3 },
      { label: "Research Rigour", score: 3, max: 3 },
      { label: "Human & Relational", score: 1, max: 3 },
      { label: "Curriculum Currency", score: 2, max: 3 },
      { label: "Outcome Evidence", score: 1, max: 3 },
      { label: "Irreplaceability (bonus)", score: 2, max: 3 },
    ],
    assessmentSlug: "dfva-mc-sciear",
    marketSlug: "dfva-market-mc-sciear",
    recommendSlug: "dfva-recommend-mc-sciear",
    handbookUrl: "https://handbook.unimelb.edu.au/2025/courses/mc-sciear",
  },
  {
    program: "Master of Science (Epidemiology)",
    institution: "University of Melbourne",
    level: "Master · 2 years",
    date: "2026-05-15",
    score: 23,
    maxScore: 36,
    riskBand: "MODERATE RISK",
    thresholds: { q1: "UNCERTAIN", q2: "YES", q3: "YES" },
    dimensions: [
      { label: "Automation Exposure", score: 2, max: 3 },
      { label: "Systems Thinking", score: 2, max: 3 },
      { label: "Technical Depth", score: 3, max: 3 },
      { label: "Decision-Making", score: 2, max: 3 },
      { label: "AI Literacy", score: 1, max: 3 },
      { label: "Domain Depth", score: 3, max: 3 },
      { label: "Research Rigour", score: 3, max: 3 },
      { label: "Human & Relational", score: 2, max: 3 },
      { label: "Curriculum Currency", score: 2, max: 3 },
      { label: "Outcome Evidence", score: 1, max: 3 },
      { label: "Irreplaceability (bonus)", score: 2, max: 3 },
    ],
    assessmentSlug: "dfva-mc-sciepi",
    marketSlug: "dfva-market-mc-sciepi",
    recommendSlug: "dfva-recommend-mc-sciepi",
    handbookUrl: "https://handbook.unimelb.edu.au/2025/courses/mc-sciepi",
  },
];

export const riskBandConfig: Record<
  string,
  { bg: string; text: string; border: string; bar: string; label: string }
> = {
  RESILIENT: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    bar: "bg-emerald-500",
    label: "Resilient",
  },
  "MODERATE RISK": {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-800",
    bar: "bg-yellow-500",
    label: "Moderate Risk",
  },
  "HIGH RISK": {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
    bar: "bg-orange-500",
    label: "High Risk",
  },
  CRITICAL: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
    bar: "bg-red-500",
    label: "Critical",
  },
};

export const thresholdConfig: Record<string, { color: string }> = {
  YES: { color: "text-red-600 dark:text-red-400" },
  NO: { color: "text-emerald-600 dark:text-emerald-400" },
  UNCERTAIN: { color: "text-yellow-600 dark:text-yellow-400" },
};

export const dimBarColor = (score: number, max: number) => {
  const pct = score / max;
  if (pct >= 0.67) return "bg-emerald-500";
  if (pct >= 0.34) return "bg-yellow-500";
  return "bg-orange-500";
};
