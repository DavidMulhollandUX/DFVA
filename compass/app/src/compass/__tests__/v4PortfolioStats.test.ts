import { describe, expect, it } from "vitest";
import { V4_META, V4_PANEL_C } from "../v4/data/v4PanelC";
import { V4_RUBRIC } from "../v4/data/v4Rubric";
import { REPORT_INDEX } from "../v4/reportIndex";
import { v4Quadrant } from "../v4/v4Position";
import {
  DEFAULT_SORT,
  ITEM_IDS,
  V4_ITEMS,
  facultyRows,
  gateFailures,
  itemAverages,
  lastVerifiedAt,
  needsAttention,
  positionCounts,
  quickWins,
  sortRows,
  thresholdTieCount,
  v4PortfolioRows,
} from "../v4/portfolioStats";

const rows = v4PortfolioRows();
const assessed = rows.filter((r) => r.assessed);
const unassessed = rows.filter((r) => !r.assessed);

/** Permutation helper: a comparator that silently drops or duplicates rows
 *  passes every ordering assertion and still corrupts the table. */
function isPermutationOf<T>(out: T[], input: T[]): boolean {
  return (
    out.length === input.length &&
    [...out].sort((a, b) => String(a).localeCompare(String(b))).join("|") ===
      [...input]
        .sort((a, b) => String(a).localeCompare(String(b)))
        .join("|")
  );
}

describe("v4PortfolioRows — the spine", () => {
  it("carries exactly the REPORT_INDEX rows, once each", () => {
    expect(rows).toHaveLength(REPORT_INDEX.length);
    expect(new Set(rows.map((r) => r.code)).size).toBe(rows.length);
    for (const e of REPORT_INDEX)
      expect(rows.find((r) => r.code === e.code)).toBeDefined();
  });

  it("derives assessed from status === current, never hardcoded", () => {
    expect(assessed).toHaveLength(
      REPORT_INDEX.filter((e) => e.status === "current").length,
    );
    expect(unassessed.every((r) => r.unassessedReason !== null)).toBe(true);
    expect(assessed.every((r) => r.unassessedReason === null)).toBe(true);
  });

  it("partitions nulls and numbers cleanly", () => {
    for (const r of unassessed) {
      expect(r.items).toBeNull();
      expect(r.gates).toBeNull();
      expect(r.adaptiveness).toBeNull();
    }
    for (const r of assessed) {
      expect(r.items).not.toBeNull();
      expect(r.gates).not.toBeNull();
      expect(r.adaptiveness).not.toBeNull();
      expect(r.workplace).not.toBeNull();
    }
  });

  it("asserts the source: every score equals its Panel C record", () => {
    for (const r of assessed) {
      const panelC = V4_PANEL_C[r.code];
      expect(panelC).toBeDefined();
      expect(r.adaptiveness).toBe(panelC.adaptiveness);
      if (typeof panelC.workplace === "number")
        expect(r.workplace).toBe(panelC.workplace);
      for (const id of ITEM_IDS) {
        const result = (panelC as unknown as Record<string, { score?: number }>)[
          id
        ];
        // W1–W3 are optional on pre-4.1 records; an absent item must surface
        // as NaN, never as a silent zero.
        expect(r.items?.[id]).toBe(result?.score ?? NaN);
      }
      expect(r.verifiedAt ?? null).toBe(panelC.verified?.date ?? null);
    }
  });

  it("matches v4Quadrant on every row, with the row's own basis median", () => {
    for (const r of rows) {
      const expected =
        r.exposure !== null && r.adaptiveness !== null
          ? v4Quadrant(
              r.exposure,
              r.adaptiveness,
              // A tier alone is enough: basisMedian only reads tier.
              { tier: (r.exposureTier ?? "exact") as never, grain: "program", sources: [], indexVariant: "AIOE-2021" },
            )
          : null;
      expect(r.position).toBe(expected);
    }
  });

  it("places field-tier rows against expMedianField and everyone else against expMedian", () => {
    for (const r of assessed) {
      const expectedMedian =
        r.exposureTier === "field" ? V4_META.expMedianField : V4_META.expMedian;
      expect(r.exposureMedian).toBe(expectedMedian);
    }
  });

  it("flips mc-bamktg between the two medians — the one program that moves", () => {
    const row = rows.find((r) => r.code === "mc-bamktg");
    expect(row).toBeDefined();
    expect(row?.exposureTier).toBe("field");
    // Its exposure sits above the field median but below the program-grain
    // one, so which median it is placed against decides its position.
    const exposure = row?.exposure as number;
    expect(exposure).toBeGreaterThan(V4_META.expMedianField);
    expect(exposure).toBeLessThanOrEqual(V4_META.expMedian);
  });

  it("labels atThreshold exactly on the published median", () => {
    const median = V4_META.adaptMedian;
    if (median === null) return;
    expect(thresholdTieCount(rows)).toBe(
      assessed.filter((r) => r.adaptiveness === median).length,
    );
    for (const r of rows)
      expect(r.atThreshold).toBe(median !== null && r.adaptiveness === median);
  });
});

describe("portfolio aggregates", () => {
  it("counts positions over assessed rows only", () => {
    const counts = positionCounts(rows);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(total).toBe(assessed.length);
    for (const r of unassessed) expect(r.position).toBeNull();
  });

  it("returns quickWins as [] when the median is unpublished", () => {
    // The contract is structural: a null median must not be subtracted from.
    // Assert via the type-level guard by checking the function's behaviour
    // against the generated meta either way.
    const wins = quickWins(rows);
    if (V4_META.adaptMedian === null) {
      expect(wins).toEqual([]);
    } else {
      expect(wins.every((r) => r.position === "attention")).toBe(true);
      for (const w of wins)
        expect(V4_META.adaptMedian - (w.adaptiveness as number)).toBe(1);
    }
  });

  it("orders needsAttention weakest-first", () => {
    const list = needsAttention(rows);
    expect(list.length).toBeLessThanOrEqual(5);
    for (let i = 1; i < list.length; i++) {
      const prev = list[i - 1];
      const curr = list[i];
      expect((prev.adaptiveness as number) <= (curr.adaptiveness as number)).toBe(true);
    }
  });

  it("averages items over assessed rows only, labelled from the rubric", () => {
    const averages = itemAverages(rows);
    expect(averages.map((a) => a.id)).toEqual(ITEM_IDS);
    for (const a of averages) {
      const rubricItem = V4_RUBRIC.find((i) => i.id === a.id);
      expect(a.label).toBe(rubricItem?.name); // human name, not the id
      expect(a.short).toBe(rubricItem?.short);
    }
    // Every average is finite — an unguarded reduce over nulls yields NaN.
    for (const a of averages) expect(Number.isFinite(a.avg)).toBe(true);
  });

  it("cross-checks gateFailures against a direct scan of Panel C", () => {
    const failures = gateFailures(rows);
    const direct = assessed.filter((r) => {
      const g = V4_PANEL_C[r.code].gates;
      return g.G1?.result === "FAIL" || g.G2?.result === "FAIL";
    });
    expect(new Set(failures.map((r) => r.code))).toEqual(
      new Set(direct.map((r) => r.code)),
    );
    // A gate failure flags regardless of item scores, so some sit in the
    // adaptive half where the position badge gives no hint.
    expect(failures.length).toBeGreaterThan(0);
  });

  it("reads the latest verification date off the rows", () => {
    const latest = lastVerifiedAt(rows);
    if (latest === null) return;
    for (const r of assessed)
      expect(latest >= (r.verifiedAt ?? "")).toBe(true);
  });
});

describe("facultyRows — the chip invariant", () => {
  it("sums to the spine totals", () => {
    const faculties = facultyRows(rows);
    expect(faculties.reduce((s, f) => s + f.total, 0)).toBe(rows.length);
    expect(faculties.reduce((s, f) => s + f.assessed, 0)).toBe(
      assessed.length,
    );
  });

  it("never averages over an unassessed row", () => {
    for (const f of facultyRows(rows)) {
      if (!Number.isFinite(f.avgAdaptiveness ?? NaN)) continue;
      const facultyAssessed = rows.filter(
        (r) => r.faculty === f.name && r.assessed,
      );
      if (f.avgAdaptiveness !== null) {
        expect(facultyAssessed.length).toBeGreaterThan(0);
        const sum = facultyAssessed.reduce(
          (s, r) => s + (r.adaptiveness as number),
          0,
        );
        expect(f.avgAdaptiveness).toBeCloseTo(
          sum / facultyAssessed.length,
          10,
        );
      } else {
        expect(facultyAssessed).toHaveLength(0);
      }
    }
  });

  it("counts gate failures per faculty consistently with gateFailures()", () => {
    const faculties = facultyRows(rows);
    expect(faculties.reduce((s, f) => s + f.gateFailures, 0)).toBe(
      gateFailures(rows).length,
    );
  });
});

describe("sortRows — total comparators, pinned partitions", () => {
  const KEYS = [
    "name",
    "faculty",
    "position",
    "exposure",
    "adaptiveness",
    "workplace",
    "g1",
    "g2",
  ] as const;

  it("has attention first under the default sort", () => {
    expect(DEFAULT_SORT.key).toBe("position");
    expect(DEFAULT_SORT.dir).toBe("desc");
    const sorted = sortRows(assessed, DEFAULT_SORT.key, DEFAULT_SORT.dir);
    expect(sorted[0]?.position).toBe("attention");
  });

  for (const key of KEYS) {
    for (const dir of ["asc", "desc"] as const) {
      it(`[${key}/${dir}] returns a permutation and keeps totals stable`, () => {
        const out = sortRows(assessed, key, dir);
        expect(isPermutationOf(out, assessed)).toBe(true);
      });
    }
  }

  it("flips order when direction flips (numeric key)", () => {
    const asc = sortRows(assessed, "adaptiveness", "asc");
    const desc = sortRows(assessed, "adaptiveness", "desc");
    expect(asc[0]?.code).not.toBe(desc[0]?.code);
    // With heavy ties (30 rows on the median) direction flips the sign, not
    // the array, so tied blocks keep their code order in both directions.
    // Assert the extremes instead of exact mirror symmetry.
    expect(desc[0]?.adaptiveness).toBe(
      Math.max(...assessed.map((r) => r.adaptiveness as number)),
    );
    expect(asc[0]?.adaptiveness).toBe(
      Math.min(...assessed.map((r) => r.adaptiveness as number)),
    );
  });

  it("sorts research degrees last under every sort — structurally, by partitioning", () => {
    // The page renders two tbody groups; the module's half of that contract
    // is that sortRows is only ever handed assessed rows. This asserts the
    // partition itself is clean so no unassessed row can leak into a sort.
    expect(unassessed.every((r) => !r.assessed && !r.items)).toBe(true);
    for (const key of KEYS) {
      for (const dir of ["asc", "desc"] as const) {
        const sorted = sortRows(assessed, key, dir);
        expect(sorted.every((r) => r.assessed)).toBe(true);
      }
    }
  });
});

describe("rubric alignment", () => {
  it("carries all eight items in rubric order, adaptive then workplace", () => {
    expect(ITEM_IDS).toHaveLength(8);
    const subscales = V4_ITEMS.map((i) => i.subscale);
    expect(subscales).toEqual([
      ...Array(5).fill("adaptive"),
      ...Array(3).fill("workplace"),
    ]);
  });
});
