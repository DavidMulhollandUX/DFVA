/**
 * DFVA v3 Panel A generator — authoritative basis (reconciled 2026-08-08).
 *
 * Adopts the Panel A revision package (data/aioe/reconciliation/): destination
 * titles are JIR/LiveAlumni alumni titles for ALL 34 placed programs
 * (entry + early_mid + mid_senior, deduplicated, 'all'-key fallback; JSA HEO
 * is NOT used on this axis), mapped through the package's two crosswalks —
 * the inherited 288-occupation index plus the 80 titles newly mapped in the
 * revision session — with the package's rescaled AIOE values verbatim.
 * Every per-program mean is validated against v2_panelA_authoritative_aioe.csv
 * (recommendation R1: "adopt the revised values"); the build fails on any
 * mismatch > 0.01 or any unmapped title.
 *
 * Also implements R2 (coverage + crosswalk-source counts per program),
 * R4 (Monte-Carlo quadrant stability: ±1 on Panel C items, p = 0.1,
 * 20k draws, fixed seed) and R6 near-term (entry-stage exposure).
 * R5 (share-weighted mean) is NOT computable at alumni-title grain — shares
 * exist only in the JSA field-level pipeline — and is reported as such.
 *
 * Run: npx tsx dfva-v3-panela.ts   (from scripts/)
 */
import * as fs from "fs";
import * as path from "path";
import { V2_PROGRAMS } from "../compass/app/src/compass/v2/data/v2Programs";

const ROOT = path.resolve(__dirname, "..");
const read = (p: string) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

function parseCsv(p: string): Record<string, string>[] {
  const text = fs.readFileSync(path.join(ROOT, p), "utf8");
  const rows: string[][] = [];
  let row: string[] = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (field !== "" || row.length) { row.push(field); rows.push(row); row = []; field = ""; }
      if (c === "\r" && text[i + 1] === "\n") i++;
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

type Conf = "high" | "medium" | "low";
type XwSource = "preexisting_288" | "new_this_session";
interface XwRow { soc: string; socTitle: string; aioe: number; confidence: Conf; source: XwSource }

// --- merged crosswalk: inherited 288 + the revision session's 80, values verbatim ---
const inherited = parseCsv("data/aioe/reconciliation/reconcile_C_authoritative_288_index.csv");
const newMapped = parseCsv("data/aioe/reconciliation/v2_panelA_new_occupation_crosswalk.csv");
const authoritative = parseCsv("data/aioe/reconciliation/v2_panelA_authoritative_aioe.csv");

const xw = new Map<string, XwRow>();
for (const r of inherited) {
  xw.set(r.occupation, {
    soc: r.onet_soc_code,
    socTitle: r.mapping_note?.split(":")[0]?.replace(/^[\d-]+\s*/, "") || r.onet_soc_code,
    aioe: parseFloat(r.ai_exposure_index),
    confidence: (r.mapping_confidence || "high") as Conf,
    source: "preexisting_288",
  });
}
for (const r of newMapped) {
  xw.set(r.occupation, {
    soc: r.onet_soc_code,
    socTitle: r.onet_soc_title,
    aioe: parseFloat(r.ai_exposure_index),
    confidence: (r.mapping_confidence || "high") as Conf,
    source: "new_this_session",
  });
}
console.log(`merged crosswalk: ${xw.size} titles (${inherited.length} inherited + ${newMapped.length} new)`);

// --- program destination titles: JIR alumni titles, package aggregation rules ---
const jirMap = read("docs/JIR/dfva_jir_map.json");
const jirRaw = read("data/jir_data.json");
const jirRecords: any[] = Array.isArray(jirRaw) ? jirRaw : jirRaw.records ?? Object.values(jirRaw);
const jirByName = new Map(jirRecords.map((r) => [r.program, r]));

interface Destination {
  title: string; soc: string; socTitle: string; aioe: number;
  confidence: Conf; crosswalkSource: XwSource; stages: string[];
}

function collectDestinations(code: string): { dests: Destination[]; jirN: number } {
  const match = jirMap.matches.find((m: any) => m.dfva_code === code);
  const rec = match && jirByName.get(match.jir_name);
  if (!rec) throw new Error(`No JIR record for ${code}`);
  const jt = rec.job_titles ?? {};
  const stageMap: [string, string][] = [
    ["entry", "entry"], ["early_mid", "early"], ["mid_senior", "senior"],
  ];
  const hasStaged = stageMap.some(([k]) => (jt[k] ?? []).length > 0);
  const byTitle = new Map<string, string[]>();
  if (hasStaged) {
    for (const [jirStage, stage] of stageMap) {
      for (const t of jt[jirStage] ?? []) {
        const e = byTitle.get(t) ?? [];
        e.push(stage);
        byTitle.set(t, e);
      }
    }
  } else {
    for (const t of jt.all ?? []) byTitle.set(t, ["all"]);
  }
  const dests = [...byTitle.entries()].map(([title, stages]) => {
    const m = xw.get(title);
    if (!m) throw new Error(`Unmapped JIR title: "${title}" (${code})`);
    return { title, soc: m.soc, socTitle: m.socTitle, aioe: m.aioe, confidence: m.confidence, crosswalkSource: m.source, stages };
  });
  return { dests, jirN: rec.n ?? match.jir_n ?? null };
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const r1 = (x: number) => Math.round(x * 10) / 10;
const r2 = (x: number) => Math.round(x * 100) / 100;
const r3 = (x: number) => Math.round(x * 1000) / 1000;

const authByCode = new Map(authoritative.map((r) => [r.code, r]));
const placed = V2_PROGRAMS.filter((p) => p.exposure !== null);

const rows = placed.map((p) => {
  const { dests, jirN } = collectDestinations(p.code);
  const exposure = mean(dests.map((d) => d.aioe));
  const auth = authByCode.get(p.code);
  if (!auth) throw new Error(`${p.code} missing from authoritative CSV`);
  const delta = Math.abs(exposure - parseFloat(auth.exposure_aioe));
  if (delta > 0.01) {
    throw new Error(
      `${p.code}: recomputed ${exposure.toFixed(2)} vs authoritative ${auth.exposure_aioe} (Δ ${delta.toFixed(3)}, ${dests.length} titles vs ${auth.n_titles})`,
    );
  }
  const entryDests = dests.filter((d) => d.stages.includes("entry"));
  return {
    v2: p, dests, jirN,
    exposure,
    entryExposure: entryDests.length ? mean(entryDests.map((d) => d.aioe)) : null,
    coverage: 1.0,
    nTitles: dests.length,
    nMedium: dests.filter((d) => d.confidence !== "high").length,
    nInherited: dests.filter((d) => d.crosswalkSource === "preexisting_288").length,
    nNewlyMapped: dests.filter((d) => d.crosswalkSource === "new_this_session").length,
    authQuadrant: auth.quadrant_aioe,
  };
});
console.log("per-program means: all 34 match the authoritative CSV to ±0.01");

const exps = rows.map((r) => r.exposure);
const expMedian = median(exps);
const adaptMedian = median(rows.map((r) => r.v2.adaptiveness_raw));

type Quadrant = "well-positioned" | "comfortable" | "attention" | "sheltered";
const quadrantOf = (exp: number, adapt: number): Quadrant =>
  exp > expMedian
    ? adapt >= adaptMedian ? "well-positioned" : "attention"
    : adapt >= adaptMedian ? "comfortable" : "sheltered";
const AUTH_LABEL: Record<string, Quadrant> = {
  "Well-positioned": "well-positioned", Comfortable: "comfortable",
  Attention: "attention", Sheltered: "sheltered",
};

// validate quadrant rule against the package's assignments
for (const row of rows) {
  const q = quadrantOf(row.exposure, row.v2.adaptiveness_raw);
  const expected = AUTH_LABEL[row.authQuadrant];
  if (q !== expected) {
    throw new Error(`${row.v2.code}: quadrant ${q} vs authoritative ${row.authQuadrant} (exp ${row.exposure.toFixed(2)}, adapt ${row.v2.adaptiveness_raw}, medians ${expMedian.toFixed(2)}/${adaptMedian})`);
  }
}
console.log("quadrant assignments: all 34 match the authoritative CSV");

// --- Monte-Carlo quadrant stability (R4) ---
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
    nearBoundary: Math.abs(row.exposure - expMedian) <= 2.5 || Math.abs(row.v2.adaptiveness_raw - adaptMedian) <= 1,
  });
}

// --- headline validation against the revision note ---
console.log(`n=${rows.length}  exposure range ${r1(Math.min(...exps))}–${r1(Math.max(...exps))}  median ${r1(expMedian)}  (note: 61.0–97.2, median 90.9)`);
console.log(`adaptiveness median (34): ${adaptMedian}  (note: 10.0)`);
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
    exposureIndexVintage: "AIOE_DataAppendix.xlsx @ AIOE-Data/AIOE main (n=773, z −2.670…1.528)",
    exposureRescaling: "min-max 0-100 over published population",
    exposureComputedAt: computedAt,
    destinationBasis: "JIR/LiveAlumni alumni titles (all placed programs); JSA HEO not used on this axis",
    crosswalkAuthored: "inherited 288-title index + 80 titles mapped Aug 2026 (reconciliation package)",
    perturbation: { draws: DRAWS, pPerturb: P_PERTURB, items: ["D2", "D3", "D7", "B", "D5"] },
    placed: rows.length,
    total: V2_PROGRAMS.length,
    expMedian: r1(expMedian),
    adaptMedian,
    expRange: [r1(Math.min(...exps)), r1(Math.max(...exps))] as [number, number],
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
    exposure: r2(r.exposure),
    entryExposure: r.entryExposure === null ? null : r2(r.entryExposure),
    jirN: r.jirN,
    coverage: r.coverage,
    nTitles: r.nTitles,
    nMedium: r.nMedium,
    nInherited: r.nInherited,
    nNewlyMapped: r.nNewlyMapped,
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
      aioe: r2(d.aioe),
      confidence: d.confidence,
      crosswalkSource: d.crosswalkSource,
      stages: d.stages,
    })),
  })),
};

const header = `// GENERATED by scripts/dfva-v3-panela.ts — do not hand-edit.
// Basis: Panel A reconciliation package (data/aioe/reconciliation/) — JIR
// alumni destination titles for all placed programs, merged 288+80 crosswalk,
// package AIOE values verbatim, validated per-program against
// v2_panelA_authoritative_aioe.csv. Panel C from v2Programs.ts (unchanged).
// Regenerate: cd scripts && npx tsx dfva-v3-panela.ts

export type V3Quadrant = "well-positioned" | "comfortable" | "attention" | "sheltered";

export interface V3Destination {
  title: string;
  soc: string;
  socTitle: string;
  aioe: number;
  confidence: "high" | "medium" | "low";
  crosswalkSource: "preexisting_288" | "new_this_session";
  stages: string[];
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
  entryExposure: number | null;
  jirN: number | null;
  coverage: number;
  nTitles: number;
  nMedium: number;
  nInherited: number;
  nNewlyMapped: number;
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
  destinationBasis: string;
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
fs.writeFileSync(dest, header + body);
console.log(`wrote ${path.relative(ROOT, dest)} (${out.programs.length} programs)`);
