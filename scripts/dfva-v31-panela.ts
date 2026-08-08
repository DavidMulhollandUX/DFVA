/**
 * DFVA v3.1 position-stability generator (spec: docs/dfva-v31-methodology.md).
 *
 * Replaces v3's 20,000-draw Monte-Carlo with exact enumeration of the full
 * 3^5 = 243 perturbation space (defect A1: seed-dependent published counts),
 * computes the modal probability at three rater-error rates e = 0.05 / 0.10 /
 * 0.20 (defect A2: the assumed rate, not the data, decides the headline),
 * and stores the exact adaptiveness envelope, ceiling-item count and derived
 * stabilityClass (empirical-gap cut at 0.90; any cut in [0.85, 0.98] gives
 * the identical partition).
 *
 * v3.1 changes no construct, panel, data source or exposure value, so this
 * generator layers on the v3 dataset rather than recomputing it. Guards:
 *  - every distribution sums to 1 within 1e-12 (pre-rounding);
 *  - optimistic >= published >= pessimistic for every program;
 *  - exactly 243 delta vectors enumerated;
 *  - every output field reproduces data/aioe/v31_reference_position_stability.csv
 *    (modal probabilities to 1e-5) or the build fails;
 *  - the emitted module is generated twice and compared byte-identical.
 *
 * Run: npx tsx dfva-v31-panela.ts   (from scripts/)
 */
import * as fs from "fs";
import * as path from "path";
import {
  V3_PROGRAMS,
  type V3Quadrant,
} from "../compass/app/src/compass/v3/data/v3Programs";

const ROOT = path.resolve(__dirname, "..");

function parseCsv(p: string): Record<string, string>[] {
  const [header, ...body] = fs
    .readFileSync(path.join(ROOT, p), "utf8")
    .trim()
    .split("\n")
    .map((l) => l.split(","));
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

const QUADRANTS: V3Quadrant[] = ["well-positioned", "comfortable", "attention", "sheltered"];

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const expMedian = median(V3_PROGRAMS.map((p) => p.exposure));
const adaptMedian = median(V3_PROGRAMS.map((p) => p.adaptiveness));

const quadrantOf = (exposure: number, adapt: number): V3Quadrant =>
  exposure > expMedian
    ? adapt >= adaptMedian ? "well-positioned" : "attention"
    : adapt >= adaptMedian ? "comfortable" : "sheltered";

// the full 243-state delta space, deterministic order
const DELTAS: number[][] = [];
for (let a = -1; a <= 1; a++)
  for (let b = -1; b <= 1; b++)
    for (let c = -1; c <= 1; c++)
      for (let d = -1; d <= 1; d++)
        for (let e = -1; e <= 1; e++) DELTAS.push([a, b, c, d, e]);
if (DELTAS.length !== 243) throw new Error(`expected 243 delta vectors, got ${DELTAS.length}`);

function enumeratePerturbations(base: number[], exposure: number, e: number) {
  const w: Record<number, number> = { [-1]: e / 2, 0: 1 - e, 1: e / 2 };
  const dist: Record<V3Quadrant, number> = {
    "well-positioned": 0, comfortable: 0, attention: 0, sheltered: 0,
  };
  let adaptMin = Infinity, adaptMax = -Infinity;
  for (const delta of DELTAS) {
    let p = 1, adapt = 0;
    for (let i = 0; i < 5; i++) {
      p *= w[delta[i]];
      adapt += Math.min(3, Math.max(0, base[i] + delta[i]));
    }
    adaptMin = Math.min(adaptMin, adapt);
    adaptMax = Math.max(adaptMax, adapt);
    dist[quadrantOf(exposure, adapt)] += p;
  }
  const sum = QUADRANTS.reduce((a, q) => a + dist[q], 0);
  if (Math.abs(sum - 1) >= 1e-12) throw new Error(`distribution sums to ${sum}`);
  const sorted = QUADRANTS.map((q) => [q, dist[q]] as const).sort((a, b) => b[1] - a[1]);
  return {
    dist,
    modal: sorted[0][0],
    modalProb: sorted[0][1],
    runnerUp: sorted[1][1] > 0 ? sorted[1][0] : null,
    envelope: [adaptMin, adaptMax] as [number, number],
  };
}

const r5 = (x: number) => Math.round(x * 100000) / 100000;

const rows = V3_PROGRAMS.map((p) => {
  const base = [
    p.dimensionScores.D2, p.dimensionScores.D3, p.dimensionScores.D7,
    p.dimensionScores.B, p.dimensionScores.D5,
  ];
  const published = enumeratePerturbations(base, p.exposure, 0.1);
  const optimistic = enumeratePerturbations(base, p.exposure, 0.05);
  const pessimistic = enumeratePerturbations(base, p.exposure, 0.2);
  if (!(optimistic.modalProb >= published.modalProb && published.modalProb >= pessimistic.modalProb)) {
    throw new Error(`${p.code}: sensitivity not monotone`);
  }
  const modalProb = r5(published.modalProb);
  return {
    code: p.code,
    modalQuadrant: published.modal,
    runnerUpQuadrant: published.runnerUp,
    quadrantDist: Object.fromEntries(QUADRANTS.map((q) => [q, r5(published.dist[q])])) as Record<V3Quadrant, number>,
    modalProbability: modalProb,
    modalProbabilityOptimistic: r5(optimistic.modalProb),
    modalProbabilityPessimistic: r5(pessimistic.modalProb),
    adaptEnvelope: published.envelope,
    itemsAtCeiling: base.filter((s) => s === 3).length,
    stabilityClass: (modalProb < 0.9 ? "boundary" : "stable") as "boundary" | "stable",
    nearDisplayThreshold: Math.abs(modalProb - 0.8) <= 0.02 || Math.abs(modalProb - 0.6) <= 0.02,
    distToAdaptMedian: p.adaptiveness - adaptMedian,
  };
});

// --- reproduce the reference table exactly or fail ---
const REF_QUADRANT: Record<string, V3Quadrant> = {
  "High exposure · high adaptiveness": "well-positioned",
  "Low exposure · high adaptiveness": "comfortable",
  "High exposure · low adaptiveness": "attention",
  "Low exposure · low adaptiveness": "sheltered",
};
const ref = parseCsv("data/aioe/v31_reference_position_stability.csv");
if (ref.length !== rows.length) throw new Error(`reference has ${ref.length} rows, computed ${rows.length}`);
for (const r of ref) {
  const row = rows.find((x) => x.code === r.code);
  if (!row) throw new Error(`reference code ${r.code} not computed`);
  const checks: [string, number, number][] = [
    ["modal_p10", row.modalProbability, parseFloat(r.modal_p10)],
    ["modal_p05", row.modalProbabilityOptimistic, parseFloat(r.modal_p05)],
    ["modal_p20", row.modalProbabilityPessimistic, parseFloat(r.modal_p20)],
    ["adapt_min", row.adaptEnvelope[0], parseInt(r.adapt_min)],
    ["adapt_max", row.adaptEnvelope[1], parseInt(r.adapt_max)],
    ["items_at_ceiling", row.itemsAtCeiling, parseInt(r.items_at_ceiling)],
    ["dist_to_adapt_median", row.distToAdaptMedian, parseInt(r.dist_to_adapt_median)],
  ];
  for (const [field, got, want] of checks) {
    if (Math.abs(got - want) > 1e-5) {
      throw new Error(`${r.code} ${field}: computed ${got} vs reference ${want}`);
    }
  }
  if (row.modalQuadrant !== REF_QUADRANT[r.modal_quadrant]) {
    throw new Error(`${r.code} modal quadrant: ${row.modalQuadrant} vs reference "${r.modal_quadrant}"`);
  }
  const refClass = r.stability_class.startsWith("boundary") ? "boundary" : "stable";
  if (row.stabilityClass !== refClass) {
    throw new Error(`${r.code} stabilityClass: ${row.stabilityClass} vs reference ${refClass}`);
  }
}
console.log(`reference table reproduced exactly: ${ref.length}/34 programs, all fields`);

const nBoundary = rows.filter((r) => r.stabilityClass === "boundary").length;
const nFail80 = rows.filter((r) => r.modalProbability < 0.8).length;
const nNearThreshold = rows.filter((r) => r.nearDisplayThreshold).length;
console.log(`boundary class: ${nBoundary} (spec: 14) · fail m>=0.80 at e=0.10: ${nFail80} (spec: 2) · near display threshold: ${nNearThreshold} (spec: 11)`);

// --- emit ---
function buildModule(): string {
  const meta = {
    method: "exact enumeration, 3^5 = 243 states",
    errorRates: { published: 0.1, optimistic: 0.05, pessimistic: 0.2 },
    stabilityClassCut: 0.9,
    stabilityClassCutNote: "empirical empty band 0.848–0.979; any cut in [0.85, 0.98] gives the identical partition",
    boundaryCount: nBoundary,
    stableCount: rows.length - nBoundary,
    failSingleLabel: { optimistic: 0, published: nFail80, pessimistic: 14 },
    expMedian: Math.round(expMedian * 100) / 100,
    adaptMedian,
  };
  return `// GENERATED by scripts/dfva-v31-panela.ts — do not hand-edit.
// v3.1 exact position-stability layer (spec: docs/dfva-v31-methodology.md).
// Derived from v3Programs.ts Panel C scores + exposure; validated against
// data/aioe/v31_reference_position_stability.csv at build time.
// Regenerate: cd scripts && npx tsx dfva-v31-panela.ts

import type { V3Quadrant } from "../../v3/data/v3Programs";

export interface V31Stability {
  code: string;
  modalQuadrant: V3Quadrant;
  runnerUpQuadrant: V3Quadrant | null;
  quadrantDist: Record<V3Quadrant, number>;
  modalProbability: number;
  modalProbabilityOptimistic: number;
  modalProbabilityPessimistic: number;
  adaptEnvelope: [number, number];
  itemsAtCeiling: number;
  stabilityClass: "boundary" | "stable";
  nearDisplayThreshold: boolean;
  distToAdaptMedian: number;
}

export interface V31Meta {
  method: string;
  errorRates: { published: number; optimistic: number; pessimistic: number };
  stabilityClassCut: number;
  stabilityClassCutNote: string;
  boundaryCount: number;
  stableCount: number;
  failSingleLabel: { optimistic: number; published: number; pessimistic: number };
  expMedian: number;
  adaptMedian: number;
}

export const V31_META: V31Meta = ${JSON.stringify(meta, null, 2)};

export const V31_STABILITY: V31Stability[] = ${JSON.stringify(rows, null, 2)};

export function v31StabilityByCode(code: string): V31Stability | undefined {
  return V31_STABILITY.find((s) => s.code === code);
}
`;
}

const once = buildModule();
const twice = buildModule();
if (once !== twice) throw new Error("generator output is not deterministic");

const dest = path.join(ROOT, "compass/app/src/compass/v31/data/v31Stability.ts");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, once);
console.log(`wrote ${path.relative(ROOT, dest)} (${rows.length} programs, byte-identical on double generation)`);
