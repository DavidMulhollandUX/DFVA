/**
 * Portfolio-level derivations for the v4 insights page.
 *
 * Basis: REPORT_INDEX — the 118-row spine every /reports card already renders
 * from — joined to the per-item Panel C records for the assessed rows. The
 * index computes exposure, exposureTier and position (via v4Quadrant with the
 * program's basis); this module adds the eight item scores, gate states and
 * the derived aggregates. It deliberately does NOT extend ReportIndexEntry:
 * the eight item scores would be dead weight on every report card and would
 * force reportIndex.test.ts to grow invariants for a field the index has no
 * opinion about.
 *
 * `assessed` is derived from status === "current" rather than hardcoded — an
 * archived row reappears the moment a program reaches PROGRAMS without a v4
 * score, and the page must label it honestly when it does.
 *
 * Pure functions — no React, so the numbers on the page are unit-testable.
 */
import { V4_META, v4PanelCByCode, type V4PanelC } from "./data/v4PanelC";
import { V4_RUBRIC } from "./data/v4Rubric";
import { REPORT_INDEX } from "./reportIndex";
import {
  V4_TIER_LABELS,
  basisFor,
  basisMedian,
  isOwnRecord,
} from "./exposureBasis";
import { gateState, type GateState } from "./gateState";
import type { V4Quadrant } from "./v4Position";

/** Rubric items in display order (adaptive C1–C5, then workplace W1–W3),
 *  carrying both the human label (`name`) and the column heading (`short`).
 *  Taken from the generated rubric so a renamed item propagates here instead
 *  of drifting from it. */
export const V4_ITEMS = [
  ...V4_RUBRIC.filter((i) => i.subscale === "adaptive"),
  ...V4_RUBRIC.filter((i) => i.subscale === "workplace"),
].map((i) => ({
  id: i.id,
  name: i.name,
  short: i.short,
  subscale: i.subscale,
}));

/** The eight item ids in display order. */
export const ITEM_IDS = V4_ITEMS.map((i) => i.id);

export interface V4PortfolioRow {
  code: string;
  name: string;
  faculty: string;
  /** True iff status === "current": a v4 Panel C score exists. */
  assessed: boolean;
  /** Why a row carries no scores. Null for assessed rows. */
  unassessedReason: null | "research" | "archived";
  exposure: number | null;
  exposureTier: string | null;
  /** Human label for the tier ("measured", "program family", …). */
  exposureTierLabel: string | null;
  /** Whether the exposure was computed on the program's OWN graduates. Null
   *  when the row carries no exposure at all. */
  ownRecord: boolean | null;
  /** The exposure median this row's position is placed against (90.9 or the
   *  field-basis median). Null when there is no basis to place against. */
  exposureMedian: number | null;
  adaptiveness: number | null;
  workplace: number | null;
  /** The eight item scores, 0–3, keyed C1..C5/W1..W3. Null for unassessed. */
  items: Record<string, number> | null;
  /** Both gates' three states. Null for unassessed rows. */
  gates: Record<"G1" | "G2", GateState> | null;
  position: V4Quadrant | null;
  /** True when adaptiveness sits exactly on the median — the quadrant rule
   *  turns on a single item for these rows. */
  atThreshold: boolean;
  verifiedAt: string | null;
}

/** All 118 rows: the assessed programs plus research degrees (and any future
 *  archived rows) as separated, honestly-labelled groups. */
export function v4PortfolioRows(): V4PortfolioRow[] {
  return REPORT_INDEX.map((e): V4PortfolioRow => {
    if (e.status !== "current") {
      return {
        code: e.code,
        name: e.name,
        faculty: e.faculty,
        assessed: false,
        unassessedReason: e.status === "research" ? "research" : "archived",
        exposure: e.exposure,
        exposureTier: e.exposureTier,
        exposureTierLabel: e.exposureTier
          ? V4_TIER_LABELS[e.exposureTier]
          : null,
        ownRecord: e.exposureTier ? isOwnRecord(basisFor(e.code)) : null,
        exposureMedian: e.exposureTier ? basisMedian(basisFor(e.code)) : null,
        adaptiveness: e.adaptiveness,
        workplace: e.workplace,
        items: null,
        gates: null,
        position: e.position,
        atThreshold: false,
        verifiedAt: null,
      };
    }
    // status === "current" is set iff v4PanelCByCode finds a record.
    const panelC = v4PanelCByCode(e.code) as V4PanelC;
    const basis = basisFor(e.code);
    const items: Record<string, number> = {};
    for (const item of V4_ITEMS) {
      const result = panelC[item.id as keyof V4PanelC];
      items[item.id] =
        result && typeof result === "object" && "score" in result
          ? result.score
          : NaN;
    }
    return {
      code: e.code,
      name: e.name,
      faculty: e.faculty,
      assessed: true,
      unassessedReason: null,
      exposure: e.exposure,
      exposureTier: e.exposureTier,
      exposureTierLabel: e.exposureTier ? V4_TIER_LABELS[e.exposureTier] : null,
      ownRecord: basis ? isOwnRecord(basis) : null,
      exposureMedian: e.exposureTier ? basisMedian(basis) : null,
      adaptiveness: e.adaptiveness,
      workplace: e.workplace,
      items,
      gates: {
        G1: gateState(panelC.gates?.G1),
        G2: gateState(panelC.gates?.G2),
      },
      position: e.position,
      atThreshold:
        V4_META.adaptMedian !== null && e.adaptiveness === V4_META.adaptMedian,
      verifiedAt: panelC.verified?.date ?? null,
    };
  });
}

export interface ItemAverage {
  id: string;
  label: string;
  short: string;
  subscale: "adaptive" | "workplace";
  avg: number;
}

/** Mean of each of the eight items across ASSESSED rows, 0–3. Never average
 *  across sub-scales — adaptive (/15) and workplace (/9) are different sums. */
export function itemAverages(rows: V4PortfolioRow[]): ItemAverage[] {
  const assessed = rows.filter((r) => r.assessed && r.items);
  return V4_ITEMS.map((item) => ({
    id: item.id,
    label: item.name,
    short: item.short,
    subscale: item.subscale,
    avg:
      assessed.reduce(
        (s, r) => s + ((r.items as Record<string, number>)[item.id] ?? 0),
        0,
      ) / Math.max(1, assessed.length),
  }));
}

export function positionCounts(
  rows: V4PortfolioRow[],
): Record<V4Quadrant, number> {
  const counts: Record<V4Quadrant, number> = {
    "well-positioned": 0,
    comfortable: 0,
    attention: 0,
    sheltered: 0,
  };
  for (const r of rows) if (r.position) counts[r.position] += 1;
  return counts;
}

/**
 * Programs in the exposed half sitting exactly one curriculum point below the
 * published median — a single item improvement moves them across. Returns []
 * while the median is unpublished: deriving wins against a null median is not
 * a derivation, it is an invention.
 */
export function quickWins(rows: V4PortfolioRow[]): V4PortfolioRow[] {
  const median = V4_META.adaptMedian;
  if (median === null) return [];
  return rows
    .filter(
      (r) =>
        r.position === "attention" &&
        r.adaptiveness !== null &&
        median - r.adaptiveness === 1,
    )
    .sort((a, b) => (b.exposure ?? 0) - (a.exposure ?? 0));
}

/** Exposed destinations with the least curriculum defence built so far. */
export function needsAttention(
  rows: V4PortfolioRow[],
  limit = 5,
): V4PortfolioRow[] {
  return rows
    .filter((r) => r.position === "attention")
    .sort(
      (a, b) =>
        (a.adaptiveness ?? 0) - (b.adaptiveness ?? 0) ||
        (b.exposure ?? 0) - (a.exposure ?? 0),
    )
    .slice(0, limit);
}

export interface FacultyRow {
  name: string;
  /** All rows in the faculty — assessed and unassessed. Chip counts use this. */
  total: number;
  /** Assessed rows only. Averages run over these; an unguarded reduce over all
   *  rows would yield NaN the moment an unassessed row joins a faculty. */
  assessed: number;
  avgExposure: number | null;
  avgAdaptiveness: number | null;
  positions: Record<V4Quadrant, number>;
  weakestItem: string | null;
  gateFailures: number;
}

export function facultyRows(rows: V4PortfolioRow[]): FacultyRow[] {
  const byFaculty = new Map<string, V4PortfolioRow[]>();
  for (const r of rows) {
    const list = byFaculty.get(r.faculty) ?? [];
    list.push(r);
    byFaculty.set(r.faculty, list);
  }
  return [...byFaculty.entries()]
    .map(([name, list]) => {
      const assessedList = list.filter((r) => r.assessed);
      const averages = itemAverages(list);
      const placed = list.filter((r) => r.exposure !== null);
      return {
        name,
        total: list.length,
        assessed: assessedList.length,
        avgExposure: placed.length
          ? placed.reduce((s, r) => s + (r.exposure as number), 0) /
            placed.length
          : null,
        avgAdaptiveness: assessedList.length
          ? assessedList.reduce((s, r) => s + (r.adaptiveness as number), 0) /
            assessedList.length
          : null,
        positions: positionCounts(list),
        weakestItem:
          assessedList.length > 0
            ? averages.reduce((a, b) => (a.avg <= b.avg ? a : b)).label
            : null,
        gateFailures: list.filter(failsAGate).length,
      };
    })
    .sort((a, b) => (b.avgAdaptiveness ?? 0) - (a.avgAdaptiveness ?? 0));
}

function failsAGate(r: V4PortfolioRow): boolean {
  if (!r.gates) return false;
  return r.gates.G1 === "not-met" || r.gates.G2 === "not-met";
}

/** Rows failing at least one precondition. A gate failure flags a program
 *  regardless of its item scores — two of the sixteen sit in the adaptive
 *  half where the position badge gives no hint, so this list is how they
 *  surface on the page. */
export function gateFailures(rows: V4PortfolioRow[]): V4PortfolioRow[] {
  return rows.filter(failsAGate);
}

/** How many assessed rows sit exactly on the adaptiveness median — the honest
 *  replacement for the retired confidence column: the quadrant rule turns on
 *  a single item for each of these rows. */
export function thresholdTieCount(rows: V4PortfolioRow[]): number {
  return rows.filter((r) => r.atThreshold).length;
}

/** Latest verification date across all rows, ISO yyyy-mm-dd. Null when nothing
 *  has been verified — the footer says so rather than inventing a date. */
export function lastVerifiedAt(rows: V4PortfolioRow[]): string | null {
  let latest: string | null = null;
  for (const r of rows)
    if (r.verifiedAt && (!latest || r.verifiedAt > latest))
      latest = r.verifiedAt;
  return latest;
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

export type SortKey =
  | "name"
  | "faculty"
  | "position"
  | "exposure"
  | "adaptiveness"
  | "workplace"
  | "g1"
  | "g2";

export type SortDir = "asc" | "desc";

/** Position ordering strongest-first; `desc` therefore reads attention first. */
const POSITION_RANK: Record<V4Quadrant, number> = {
  "well-positioned": 0,
  comfortable: 1,
  sheltered: 2,
  attention: 3,
};

const GATE_RANK: Record<GateState, number> = {
  met: 0,
  "not-met": 1,
  unrecorded: 2,
};

/** Default order: attention first, then ascending adaptiveness, then
 *  descending exposure — flat, not grouped by position. */
export const DEFAULT_SORT: { key: SortKey; dir: SortDir } = {
  key: "position",
  dir: "desc",
};

type Row = V4PortfolioRow;

function compareByKey(key: SortKey): (a: Row, b: Row) => number {
  switch (key) {
    case "name":
      return (a, b) => a.name.localeCompare(b.name);
    case "faculty":
      return (a, b) => a.faculty.localeCompare(b.faculty);
    case "position":
      return (a, b) =>
        rank(a) - rank(b) ||
        (a.adaptiveness ?? Infinity) - (b.adaptiveness ?? Infinity) ||
        (b.exposure ?? -Infinity) - (a.exposure ?? -Infinity);
    case "exposure":
      return numeric("exposure");
    case "adaptiveness":
      return numeric("adaptiveness");
    case "workplace":
      return numeric("workplace");
    case "g1":
      return byGate("G1");
    case "g2":
      return byGate("G2");
  }
}

function rank(r: Row): number {
  return r.position ? POSITION_RANK[r.position] : POSITION_RANK.attention;
}

function numeric(field: "exposure" | "adaptiveness" | "workplace") {
  return (a: Row, b: Row) => {
    const av = a[field];
    const bv = b[field];
    if (av === null && bv === null) return 0;
    if (av === null) return 1; // nulls sort last within their partition
    if (bv === null) return -1;
    return av - bv;
  };
}

function byGate(g: "G1" | "G2") {
  return (a: Row, b: Row) =>
    GATE_RANK[a.gates ? a.gates[g] : "unrecorded"] -
    GATE_RANK[b.gates ? b.gates[g] : "unrecorded"];
}

/** Tie-breaker that makes any comparator total: code, ascending. */
function tiebreak(cmp: (a: Row, b: Row) => number) {
  return (a: Row, b: Row) => cmp(a, b) || a.code.localeCompare(b.code);
}

/**
 * Sort ASSESSED rows by key/direction. Unassessed rows never enter the
 * comparator — the page partitions first and renders two tbody groups pinned
 * last under every sort, so a null never meets a number and reversing the
 * array can never float an unassessed row to the top.
 *
 * Direction flips the comparison sign, never the array order. The position
 * key carries its own secondary rules (ascending adaptiveness, then
 * descending exposure) inside the comparator so they survive both directions.
 */
export function sortRows(rows: Row[], key: SortKey, dir: SortDir): Row[] {
  const base = compareByKey(key);
  const signed: (a: Row, b: Row) => number =
    dir === "asc" ? base : (a, b) => base(b, a);
  return [...rows].sort(tiebreak(signed));
}
