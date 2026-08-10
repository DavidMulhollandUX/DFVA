import { DIMENSION_LABELS } from "./v2/quadrants";
import type { V3Program } from "./v3/data/v3Programs";
import { V3_META } from "./v3/data/v3Programs";

/**
 * Answer-first finding blocks for report pages (UX review U13/U3, Aug 2026).
 * Authored for the exemplar programs; every other placed program gets a
 * data-driven fallback so no report opens without its finding.
 */
export interface ReportFinding {
  /** The finding: what the assessment concluded, in plain sentences. */
  finding: string;
  /** What this does and does not mean — the exposure≠displacement frame applied to this program. */
  meaning: string;
  /** How firm the position is, in one or two sentences. */
  firmness: string;
  /** The highest-value changes, most valuable first. */
  actions: string[];
}

const AUTHORED: Record<string, ReportFinding> = {
  "mc-jurisd": {
    finding:
      "Graduates enter occupations whose tasks overlap heavily with current AI capability (exposure 94.43, against a portfolio median of 90.9). The curriculum's defences against that overlap are below the portfolio median (adaptiveness 9 of 15). The gap is concentrated in two places: the compulsory core contains no AI literacy content and no quantitative or empirical methods requirement — both exist only as electives.",
    meaning:
      "High exposure means the content of this work is likely to change, not that the jobs are disappearing: across the Australian labour market the most AI-exposed occupations are projected to grow. The program's regulatory moat (VLAB accreditation) and its strong advocacy and client-relational training are genuine, durable protections. The concern is narrower — that graduates enter AI-exposed practice without core preparation for supervising AI-assisted work.",
    firmness:
      "This position sits 1 point from the adaptiveness median, so a single rating difference on one curriculum item could move it. Read it as approximate.",
    actions: [
      "Make AI-in-legal-practice literacy compulsory across the 200-credit core.",
      "Introduce a compulsory legal-analytics / empirical-methods unit.",
    ],
  },
  "mc-is": {
    finding:
      "Graduates enter destinations whose tasks overlap heavily with current AI (exposure 91.69, just above the portfolio median of 90.9) — business-analyst documentation and reporting work is the tier AI is absorbing first — while the curriculum's scored defences sit two points below the portfolio median (adaptiveness 8 of 15). The two 1/3 gaps are AI literacy (no governance unit in the core) and irreplaceability (undifferentiated business/technology bridging).",
    meaning:
      "High exposure does not mean these jobs are disappearing — the same market data shows the adjacent tiers growing: analytics engineering (+31% YoY) and AI-governance roles are the destinations the redesign steers toward. The program's graduate-outcome evidence is strong (alumni cohort n = 257) and both gates hold.",
    firmness:
      "Unlike near-threshold programs, this position is firm: 98% stable under rating perturbation. Only real curriculum change moves it — which is also what makes the fix legible.",
    actions: [
      "Create a mandatory AI Governance and Deployment core unit (NIST AI RMF, ISO 42001, human-in-the-loop design).",
      "Mandate a real-client AI implementation capstone for all tracks.",
    ],
  },
  "mc-cs": {
    finding:
      "Graduates enter among the most AI-exposed destinations in the portfolio (exposure 92.8 from this program's own alumni titles — ML engineers, data scientists, software engineers), and the curriculum builds the strongest defences in the portfolio against that overlap: adaptiveness 14 of 15, with one remaining scored gap (systems thinking 2/3).",
    meaning:
      "Exposed destinations with an adaptive curriculum is the strongest position in the portfolio, not a warning: these graduates work where AI is the tool, and the curriculum trains them to design and supervise it. The management task is to hold the position as destination exposure keeps rising.",
    firmness:
      "This position is maximally stable — 100% under rating perturbation, 4 adaptiveness points clear of the threshold.",
    actions: [
      "Close the last scored gap: embed cross-disciplinary trade-off and failure-mode case studies in each core unit (systems thinking to 3/3).",
      "Steer destination mix toward low-substitution families: ML platform engineering, security, AI governance.",
    ],
  },
};

/** Data-driven fallback for placed programs without an authored block. */
export function findingFor(program: V3Program): ReportFinding {
  const authored = AUTHORED[program.code];
  if (authored) return authored;

  const dims = Object.entries(program.dimensionScores) as [string, number][];
  const weakest = dims.filter(([, s]) => s <= Math.min(...dims.map(([, x]) => x)));
  const highExp = program.exposure > V3_META.expMedian;
  const adaptive = program.adaptiveness >= V3_META.adaptMedian;
  const distToThreshold = Math.abs(program.adaptiveness - V3_META.adaptMedian);
  return {
    finding: `Graduates enter destinations ${highExp ? "above" : "below"} the portfolio's AI-exposure median (${program.exposure.toFixed(1)} vs ${V3_META.expMedian}), and the curriculum's scored defences are ${adaptive ? "at or above" : "below"} the portfolio median (adaptiveness ${program.adaptiveness} of 15, median ${V3_META.adaptMedian}). The lowest-scoring curriculum ${weakest.length === 1 ? "dimension is" : "dimensions are"} ${weakest.map(([d]) => DIMENSION_LABELS[d] ?? d).join(", ")}.`,
    meaning:
      "High exposure means the content of the destination work is likely to change, not that the jobs are disappearing — across the Australian labour market the most AI-exposed occupations are projected to grow. What the change means for graduates depends on the curriculum defences the adaptiveness axis measures.",
    firmness:
      distToThreshold <= 1
        ? `This position sits ${distToThreshold === 0 ? "exactly at" : "1 point from"} the adaptiveness threshold — a single rating difference could move it. Read it as approximate.`
        : `This position is ${distToThreshold} points clear of the adaptiveness threshold and stable under rating perturbation.`,
    actions: weakest.map(
      ([d]) => `Lift the lowest-scoring dimension (${DIMENSION_LABELS[d] ?? d}) — see the improvement plan below for the scoped intervention.`,
    ),
  };
}
