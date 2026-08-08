/**
 * DFVA v3 Panel A generator.
 *
 * Recomputes the exposure axis on the authoritative Felten AIOE index
 * (data/aioe/felten_aioe.json, published appendix) with full destination
 * coverage via data/aioe/occupation_crosswalk.json, then emits
 * compass/app/src/compass/v3/data/v3Programs.ts.
 *
 * Implements v3 recommendations R1 (index provenance pinned), R2 (coverage
 * per program), R4 (Monte-Carlo quadrant stability, ±1 on Panel C items,
 * p = 0.1, 20k draws, fixed seed), R5 (share-weighted mean published
 * alongside unweighted), R6 near-term (entry-stage exposure).
 *
 * Run: npx tsx dfva-v3-panela.ts   (from scripts/)
 */
import * as fs from "fs";
import * as path from "path";
import { V2_PROGRAMS } from "../compass/app/src/compass/v2/data/v2Programs";

const ROOT = path.resolve(__dirname, "..");
const read = (p: string) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

interface AioeRow { soc: string; title: string; aioe: number }
interface XwEntry { title: string; soc: string; socTitle: string; confidence: "high" | "medium"; note?: string }

const aioe: AioeRow[] = read("data/aioe/felten_aioe.json");
const crosswalk: { authored: string; mappings: XwEntry[] } = read("data/aioe/occupation_crosswalk.json");
const labourEvidence = read("data/labour-evidence.json");
const jirMap = read("docs/JIR/dfva_jir_map.json");
const jirDataRaw = read("data/jir_data.json");

const jirRecords: any[] = Array.isArray(jirDataRaw) ? jirDataRaw : jirDataRaw.records ?? Object.values(jirDataRaw);
const jirByName = new Map(jirRecords.map((r) => [r.program, r]));
const leProgs = labourEvidence.programs ?? labourEvidence;

// --- index: min-max rescale over the full published population ---
const zs = aioe.map((o) => o.aioe);
const zMin = Math.min(...zs);
const zMax = Math.max(...zs);
const scale = (z: number) => ((z - zMin) / (zMax - zMin)) * 100;
const bySoc = new Map(aioe.map((o) => [o.soc, o]));
const xwByTitle = new Map(crosswalk.mappings.map((m) => [m.title, m]));

// fail hard on any crosswalk entry whose SOC is not in the published index
for (const m of crosswalk.mappings) {
  const row = bySoc.get(m.soc);
  if (!row) throw new Error(`Crosswalk SOC ${m.soc} (${m.title}) not in published AIOE`);
  if (row.title !== m.socTitle) throw new Error(`Crosswalk title mismatch for ${m.soc}`);
}

const SHARE_RE = /^(.*?)\s*\((\d+(?:\.\d+)?)%\)\s*$/;

interface Destination {
  title: string;
  soc: string;
  socTitle: string;
  aioe: number; // rescaled 0-100
  confidence: "high" | "medium";
  stages: string[]; // which career stages the title appears in
  meanShare: number | null; // mean % share across stages where present (JSA only)
}

function collectDestinations(code: string): { dests: Destination[]; source: "JSA-HEO" | "JIR-alumni"; jirN: number | null } {
  const le = leProgs[code];
  if (le?.destinations) {
    const byTitle = new Map<string, { stages: string[]; shares: number[] }>();
    for (const stage of ["entry", "early", "senior"]) {
      for (const s of le.destinations[stage] ?? []) {
        const m = s.match(SHARE_RE);
        const title = m ? m[1] : s;
        const share = m ? parseFloat(m[2]) : NaN;
        const e = byTitle.get(title) ?? { stages: [], shares: [] };
        e.stages.push(stage);
        if (!isNaN(share)) e.shares.push(share);
        byTitle.set(title, e);
      }
    }
    const dests = [...byTitle.entries()].map(([title, e]) => {
      const xw = xwByTitle.get(title);
      if (!xw) throw new Error(`Unmapped JSA title: ${title} (${code})`);
      return {
        title,
        soc: xw.soc,
        socTitle: xw.socTitle,
        aioe: scale(bySoc.get(xw.soc)!.aioe),
        confidence: xw.confidence,
        stages: e.stages,
        meanShare: e.shares.length ? e.shares.reduce((a, b) => a + b, 0) / e.shares.length : null,
      };
    });
    return { dests, source: "JSA-HEO", jirN: null };
  }
  const match = jirMap.matches.find((m: any) => m.dfva_code === code);
  const rec = match && jirByName.get(match.jir_name);
  if (!rec) throw new Error(`No destination source for ${code}`);
  const byTitle = new Map<string, string[]>();
  const stageMap: Record<string, string> = { entry: "entry", early_mid: "early", mid_senior: "senior" };
  for (const [jirStage, stage] of Object.entries(stageMap)) {
    for (const t of rec.job_titles[jirStage] ?? []) {
      const e = byTitle.get(t) ?? [];
      e.push(stage);
      byTitle.set(t, e);
    }
  }
  const dests = [...byTitle.entries()].map(([title, stages]) => {
    const xw = xwByTitle.get(title);
    if (!xw) throw new Error(`Unmapped JIR title: ${title} (${code})`);
    return {
      title,
      soc: xw.soc,
      socTitle: xw.socTitle,
      aioe: scale(bySoc.get(xw.soc)!.aioe),
      confidence: xw.confidence,
      stages,
      meanShare: null,
    };
  });
  return { dests, source: "JIR-alumni", jirN: rec.n ?? null };
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const r1 = (x: number) => Math.round(x * 10) / 10;
const r3 = (x: number) => Math.round(x * 1000) / 1000;

// --- per-program exposure ---
const placed = V2_PROGRAMS.filter((p) => p.exposure !== null);
const rows = placed.map((p) => {
  const { dests, source, jirN } = collectDestinations(p.code);
  const unweighted = mean(dests.map((d) => d.aioe));
  const withShare = dests.filter((d) => d.meanShare !== null);
  let weighted: number | null = null;
  if (withShare.length === dests.length && dests.length > 0) {
    const totalShare = withShare.reduce((a, d) => a + d.meanShare!, 0);
    weighted = withShare.reduce((a, d) => a + d.aioe * (d.meanShare! / totalShare), 0);
  }
  const entryDests = dests.filter((d) => d.stages.includes("entry"));
  const entryExposure = entryDests.length ? mean(entryDests.map((d) => d.aioe)) : null;
  const nMedium = dests.filter((d) => d.confidence === "medium").length;
  return {
    v2: p,
    dests,
    source,
    jirN,
    exposure: unweighted,
    exposureWeighted: weighted,
    entryExposure,
    coverage: 1.0, // full mapping enforced above; kept explicit per R2
    nTitles: dests.length,
    nMedium,
  };
});

const expMedian = median(rows.map((r) => r.exposure));
const adaptMedian = median(rows.map((r) => r.v2.adaptiveness_raw));

type Quadrant = "well-positioned" | "comfortable" | "attention" | "sheltered";
const quadrantOf = (exp: number, adapt: number): Quadrant =>
  exp > expMedian
    ? adapt >= adaptMedian ? "well-positioned" : "attention"
    : adapt >= adaptMedian ? "comfortable" : "sheltered";

// --- Monte-Carlo quadrant stability (R4): ±1 on each Panel C item, p = 0.1, 20k draws, fixed seed ---
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const DRAWS = 20000;
const P_PERTURB = 0.1;
for (const row of rows) {
  const rand = mulberry32(0xdf3a + row.v2.code.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
  const items = [row.v2.D2, row.v2.D3, row.v2.D7, row.v2.B_irreplaceable, row.v2.D5_ai_literacy];
  const counts: Record<Quadrant, number> = { "well-positioned": 0, comfortable: 0, attention: 0, sheltered: 0 };
  let adaptLo = Infinity, adaptHi = -Infinity;
  for (let d = 0; d < DRAWS; d++) {
    let adapt = 0;
    for (const item of items) {
      const u = rand();
      let v = item;
      if (u < P_PERTURB / 2) v = Math.max(0, item - 1);
      else if (u < P_PERTURB) v = Math.min(3, item + 1);
      adapt += v;
    }
    adaptLo = Math.min(adaptLo, adapt);
    adaptHi = Math.max(adaptHi, adapt);
    counts[quadrantOf(row.exposure, adapt)]++;
  }
  const dist = Object.fromEntries(
    (Object.entries(counts) as [Quadrant, number][]).map(([q, c]) => [q, r3(c / DRAWS)]),
  ) as Record<Quadrant, number>;
  const sorted = (Object.entries(dist) as [Quadrant, number][]).sort((a, b) => b[1] - a[1]);
  Object.assign(row, {
    quadrant: quadrantOf(row.exposure, row.v2.adaptiveness_raw),
    quadrantDist: dist,
    modalQuadrant: sorted[0][0],
    modalProb: sorted[0][1],
    runnerUpQuadrant: sorted[1][1] > 0 ? sorted[1][0] : null,
    adaptInterval: [adaptLo, adaptHi],
    nearBoundary:
      Math.abs(row.exposure - expMedian) <= 2.5 || Math.abs(row.v2.adaptiveness_raw - adaptMedian) <= 1,
  });
}

// --- validation against the August 2026 revision note ---
const exps = rows.map((r) => r.exposure);
console.log(`n=${rows.length}  exposure range ${r1(Math.min(...exps))}–${r1(Math.max(...exps))}  median ${r1(expMedian)}  (note: 61.0–97.2, median 90.9)`);
console.log(`adaptiveness median (34): ${adaptMedian}  (note: 10.0)`);
const dvm = rows.find((r) => r.v2.code === "mc-dvetmed");
console.log(`mc-dvetmed exposure: ${r1(dvm!.exposure)}  (note: 62.4)`);
const qc: Record<string, number> = {};
for (const r of rows as any[]) qc[r.quadrant] = (qc[r.quadrant] ?? 0) + 1;
console.log("quadrant counts:", qc, "(note: wp 9, cf 14, at 8, sh 3)");
const flips = (rows as any[]).filter((r) => r.quadrant !== r.v2.quadrant).length;
console.log(`quadrant changes vs v2 published: ${flips}/34  (note: 20/34)`);

// --- emit app data module ---
const computedAt = new Date().toISOString().slice(0, 10);
const out = {
  meta: {
    exposureIndexName: "Felten-AIOE",
    exposureIndexVintage: `AIOE_DataAppendix.xlsx @ AIOE-Data/AIOE main (n=${aioe.length}, z ${zMin.toFixed(3)}…${zMax.toFixed(3)})`,
    exposureRescaling: `min-max 0-100 over published population n=${aioe.length}`,
    exposureComputedAt: computedAt,
    crosswalkAuthored: crosswalk.authored,
    perturbation: { draws: DRAWS, pPerturb: P_PERTURB, items: ["D2", "D3", "D7", "B", "D5"] },
    placed: rows.length,
    total: V2_PROGRAMS.length,
    expMedian: r1(expMedian),
    adaptMedian,
    expRange: [r1(Math.min(...exps)), r1(Math.max(...exps))],
    v2ExpMedian: 61.8,
    v2AdaptMedian: 11,
  },
  programs: rows.map((r: any) => ({
    code: r.v2.code,
    name: r.v2.name,
    faculty: r.v2.faculty,
    v1Score: r.v2.v1_score,
    v1Band: r.v2.v1_band,
    v2Exposure: r.v2.exposure,
    v2Quadrant: r.v2.quadrant,
    exposure: r1(r.exposure),
    exposureWeighted: r.exposureWeighted === null ? null : r1(r.exposureWeighted),
    entryExposure: r.entryExposure === null ? null : r1(r.entryExposure),
    destinationSource: r.source,
    jirN: r.jirN,
    coverage: r.coverage,
    nTitles: r.nTitles,
    nMedium: r.nMedium,
    adaptiveness: r.v2.adaptiveness_raw,
    dimensionScores: r.v2.dimension_scores,
    gateD4: r.v2.gate_D4,
    gateD6: r.v2.gate_D6,
    quadrant: r.quadrant,
    quadrantDist: r.quadrantDist,
    modalProb: r.modalProb,
    runnerUpQuadrant: r.runnerUpQuadrant,
    adaptInterval: r.adaptInterval,
    nearBoundary: r.nearBoundary,
    destinations: r.dests.map((d: any) => ({
      title: d.title,
      soc: d.soc,
      socTitle: d.socTitle,
      aioe: r1(d.aioe),
      confidence: d.confidence,
      stages: d.stages,
      meanShare: d.meanShare === null ? null : r1(d.meanShare),
    })),
  })),
};

const header = `// GENERATED by scripts/dfva-v3-panela.ts — do not hand-edit.
// Inputs: data/aioe/felten_aioe.json (published Felten AIOE appendix),
// data/aioe/occupation_crosswalk.json, data/labour-evidence.json,
// data/jir_data.json, docs/JIR/dfva_jir_map.json, v2Programs.ts (Panel C).
// Regenerate: cd scripts && npx tsx dfva-v3-panela.ts

export type V3Quadrant = "well-positioned" | "comfortable" | "attention" | "sheltered";

export interface V3Destination {
  title: string;
  soc: string;
  socTitle: string;
  aioe: number;
  confidence: "high" | "medium";
  stages: string[];
  meanShare: number | null;
}

export interface V3Program {
  code: string;
  name: string;
  faculty: string;
  v1Score: number;
  v1Band: string;
  v2Exposure: number | null;
  v2Quadrant: string;
  exposure: number;
  exposureWeighted: number | null;
  entryExposure: number | null;
  destinationSource: "JSA-HEO" | "JIR-alumni";
  jirN: number | null;
  coverage: number;
  nTitles: number;
  nMedium: number;
  adaptiveness: number;
  dimensionScores: { D2: number; D3: number; D7: number; B: number; D5: number };
  gateD4: "PASS" | "FAIL";
  gateD6: "PASS" | "FAIL";
  quadrant: V3Quadrant;
  quadrantDist: Record<V3Quadrant, number>;
  modalProb: number;
  runnerUpQuadrant: V3Quadrant | null;
  adaptInterval: [number, number];
  nearBoundary: boolean;
  destinations: V3Destination[];
}

export interface V3Meta {
  exposureIndexName: string;
  exposureIndexVintage: string;
  exposureRescaling: string;
  exposureComputedAt: string;
  crosswalkAuthored: string;
  perturbation: { draws: number; pPerturb: number; items: string[] };
  placed: number;
  total: number;
  expMedian: number;
  adaptMedian: number;
  expRange: [number, number];
  v2ExpMedian: number;
  v2AdaptMedian: number;
}
`;

const body = `
export const V3_META: V3Meta = ${JSON.stringify(out.meta, null, 2)};

export const V3_PROGRAMS: V3Program[] = ${JSON.stringify(out.programs, null, 2)};

export function v3ProgramByCode(code: string): V3Program | undefined {
  return V3_PROGRAMS.find((p) => p.code === code);
}
`;

const dest = path.join(ROOT, "compass/app/src/compass/v3/data/v3Programs.ts");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, header + body);
console.log(`wrote ${path.relative(ROOT, dest)} (${out.programs.length} programs)`);
