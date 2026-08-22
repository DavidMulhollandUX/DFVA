/**
 * Portfolio-level derivations for the insights page.
 *
 * Basis: the current (authoritative Felten AIOE) measurement in v3Programs
 * for every program with matched destination data, plus v31Stability for
 * position confidence. Curriculum scores exist for all assessed programs, so
 * curriculum derivations run over the full set while exposure derivations
 * run over the placed subset only. Counts are derived, never hardcoded —
 * both sets grow as coverage extends.
 *
 * Pure functions — no React, so the numbers on the page are unit-testable.
 */
import { V2_PROGRAMS } from "../../v2/data/v2Programs";
import { DIMENSION_LABELS } from "../../v2/quadrants";
import { V31_STABILITY } from "../../v31/data/v31Stability";
import {
  V3_META,
  V3_PROGRAMS,
  type V3Program,
  type V3Quadrant,
} from "./v3Programs";

export type DimensionKey = "D2" | "D3" | "D7" | "B" | "D5";

/** Display order: the order the dimensions are discussed in the reports. */
export const DIMENSION_ORDER: DimensionKey[] = ["D2", "D3", "D7", "B", "D5"];

export interface PortfolioRow {
  code: string;
  name: string;
  faculty: string;
  /** Null when the program has no matched alumni destination data yet. */
  exposure: number | null;
  adaptiveness: number;
  dims: Record<DimensionKey, number>;
  decisionMaking: "PASS" | "FAIL";
  domainDepth: "PASS" | "FAIL";
  position: V3Quadrant | null;
  /** Plain-language position confidence; null when the program is unplaced. */
  confidence: "firm" | "near a threshold" | null;
  placed: boolean;
}

export interface FacultyRow {
  name: string;
  programs: number;
  placed: number;
  avgExposure: number | null;
  avgAdaptiveness: number;
  positions: Record<V3Quadrant, number>;
  weakestDimension: string;
}

export interface DimensionAverage {
  key: DimensionKey;
  label: string;
  avg: number;
}

const stabilityByCode = new Map(V31_STABILITY.map((s) => [s.code, s]));
const v3ByCode = new Map(V3_PROGRAMS.map((p) => [p.code, p]));

function dimsOf(p: V3Program): Record<DimensionKey, number> {
  return {
    D2: p.dimensionScores.D2,
    D3: p.dimensionScores.D3,
    D7: p.dimensionScores.D7,
    B: p.dimensionScores.B,
    D5: p.dimensionScores.D5,
  };
}

/** Every assessed program, placed or not, in one shape. */
export function portfolioRows(): PortfolioRow[] {
  return V2_PROGRAMS.map((v2) => {
    const v3 = v3ByCode.get(v2.code);
    const stability = stabilityByCode.get(v2.code);
    if (v3) {
      return {
        code: v3.code,
        name: v3.name,
        faculty: v3.faculty,
        exposure: v3.exposure,
        adaptiveness: v3.adaptiveness,
        dims: dimsOf(v3),
        decisionMaking: v3.gateD4,
        domainDepth: v3.gateD6,
        position: v3.quadrant,
        confidence:
          stability?.stabilityClass === "boundary"
            ? "near a threshold"
            : "firm",
        placed: true,
      };
    }
    return {
      code: v2.code,
      name: v2.name,
      faculty: v2.faculty,
      exposure: null,
      adaptiveness: v2.adaptiveness_raw,
      dims: {
        D2: v2.D2,
        D3: v2.D3,
        D7: v2.D7,
        B: v2.B_irreplaceable,
        D5: v2.D5_ai_literacy,
      },
      decisionMaking: v2.gate_D4 as "PASS" | "FAIL",
      domainDepth: v2.gate_D6 as "PASS" | "FAIL",
      position: null,
      confidence: null,
      placed: false,
    };
  });
}

/** Mean of each curriculum dimension (0–3) across all assessed programs. */
export function dimensionAverages(rows: PortfolioRow[]): DimensionAverage[] {
  return DIMENSION_ORDER.map((key) => ({
    key,
    label: DIMENSION_LABELS[key],
    avg: rows.reduce((s, r) => s + r.dims[key], 0) / rows.length,
  }));
}

export function positionCounts(
  rows: PortfolioRow[],
): Record<V3Quadrant, number> {
  const counts: Record<V3Quadrant, number> = {
    "well-positioned": 0,
    comfortable: 0,
    attention: 0,
    sheltered: 0,
  };
  for (const r of rows) if (r.position) counts[r.position] += 1;
  return counts;
}

/**
 * Programs one curriculum point below the portfolio median while sitting in
 * the exposed half — a single dimension improvement moves them across.
 */
export function quickWins(rows: PortfolioRow[]): PortfolioRow[] {
  return rows
    .filter(
      (r) =>
        r.position === "attention" &&
        V3_META.adaptMedian - r.adaptiveness === 1,
    )
    .sort((a, b) => (b.exposure ?? 0) - (a.exposure ?? 0));
}

/** Exposed destinations with the least curriculum defence built so far. */
export function needsAttention(
  rows: PortfolioRow[],
  limit = 5,
): PortfolioRow[] {
  return rows
    .filter((r) => r.position === "attention")
    .sort(
      (a, b) =>
        a.adaptiveness - b.adaptiveness ||
        (b.exposure ?? 0) - (a.exposure ?? 0),
    )
    .slice(0, limit);
}

export function facultyRows(rows: PortfolioRow[]): FacultyRow[] {
  const byFaculty = new Map<string, PortfolioRow[]>();
  for (const r of rows) {
    const list = byFaculty.get(r.faculty) ?? [];
    list.push(r);
    byFaculty.set(r.faculty, list);
  }
  return [...byFaculty.entries()]
    .map(([name, list]) => {
      const placed = list.filter((r) => r.exposure !== null);
      const dims = dimensionAverages(list);
      const weakest = dims.reduce((a, b) => (a.avg <= b.avg ? a : b));
      return {
        name,
        programs: list.length,
        placed: placed.length,
        avgExposure: placed.length
          ? placed.reduce((s, r) => s + (r.exposure as number), 0) /
            placed.length
          : null,
        avgAdaptiveness:
          list.reduce((s, r) => s + r.adaptiveness, 0) / list.length,
        positions: positionCounts(list),
        weakestDimension: weakest.label,
      };
    })
    .sort((a, b) => b.avgAdaptiveness - a.avgAdaptiveness);
}

/** Count of placed programs whose position a single rating difference could move. */
export function nearThresholdCount(): number {
  return V31_STABILITY.filter((s) => s.stabilityClass === "boundary").length;
}
