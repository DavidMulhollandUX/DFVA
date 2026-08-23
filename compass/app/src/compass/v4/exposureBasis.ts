import {
  V4_META,
  v4PanelABasisByCode,
  type V4PanelABasis,
  type V4PanelATier,
} from "./data/v4PanelC";

/** Short label per tier, for badges. */
export const V4_TIER_LABELS: Record<V4PanelATier, string> = {
  exact: "measured",
  variant: "measured · parent record",
  pooled: "program family",
  combined: "both components",
  cognate: "cognate program",
  partial: "related program",
  field: "field grain",
};

/** Whether the value was computed on the program's OWN graduates. */
export const isOwnRecord = (basis: V4PanelABasis | undefined): boolean =>
  basis?.tier === "exact" || basis?.tier === "variant";

/**
 * The exposure median a program is placed against. Program-grain tiers use
 * the reference cohort's alumni-title median; the field tier samples a
 * different occupation universe (JSA HEO field lists) and uses the same
 * cohort's field-basis median — never the other one. Null when the field
 * median has not been published.
 */
export function basisMedian(basis: V4PanelABasis | undefined): number | null {
  if (basis?.tier === "field") return V4_META.expMedianField;
  return V4_META.expMedian;
}

/** One-line description of where the value comes from, for the report. */
export function describeBasis(
  basis: V4PanelABasis | undefined,
  jirN: number | null,
  nTitles: number | null,
): string {
  if (!basis) return "no basis recorded";
  const n = jirN !== null ? `n = ${jirN}` : null;
  const t = nTitles !== null ? `${nTitles} titles` : null;
  const counts = [n, t].filter(Boolean).join(", ");
  const names = basis.sources.map((s) => s.name).join(" ∪ ");
  switch (basis.tier) {
    case "exact":
      return `measured on the program's own alumni destination record (${counts})`;
    case "variant":
      return `measured on the parent program's alumni record — ${names} (${counts})`;
    case "pooled":
      return `union of the program family's ${basis.sources.length} alumni records — ${names} (${counts})`;
    case "combined":
      return `union of both components' alumni records — ${names} (${counts})`;
    case "cognate":
    case "partial":
      return `borrowed from a related program's alumni record — ${names} (${counts}); an estimate, not this program's own graduates`;
    case "field":
      return `field-of-education occupation list, Jobs and Skills Australia Higher Education Outcomes — ${names}; graduates of the whole field, not this program`;
  }
}

export const basisFor = (code: string | undefined): V4PanelABasis | undefined =>
  code ? v4PanelABasisByCode(code) : undefined;
