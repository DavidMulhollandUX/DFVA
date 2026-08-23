import { V4_META, type V4PanelABasis } from "./data/v4PanelC";
import { basisMedian } from "./exposureBasis";

export const V4_QUADRANT_LABELS = {
  "well-positioned": "High exposure · high adaptiveness",
  comfortable: "Low exposure · high adaptiveness",
  attention: "High exposure · low adaptiveness",
  sheltered: "Low exposure · low adaptiveness",
} as const;

export type V4Quadrant = keyof typeof V4_QUADRANT_LABELS;

/**
 * The v3 quadrant rule, restated on the v4 medians: exposure strictly above
 * its median, adaptiveness at or above its median. Returns null while the
 * migration cycle is incomplete — no v4 median exists, so no label may be
 * shown. The exposure median depends on the value's basis: program-grain
 * values are placed against the alumni-title median, field-tier values
 * against the field-basis median (see exposureBasis.ts); a field-tier value
 * with no published field median gets no label.
 */
export function v4Quadrant(
  exposure: number,
  adaptiveness: number,
  basis?: V4PanelABasis,
): V4Quadrant | null {
  if (!V4_META.complete || V4_META.adaptMedian === null) return null;
  const expMedian = basisMedian(basis);
  if (expMedian === null) return null;
  const highExp = exposure > expMedian;
  const highAdapt = adaptiveness >= V4_META.adaptMedian;
  if (highExp) return highAdapt ? "well-positioned" : "attention";
  return highAdapt ? "comfortable" : "sheltered";
}
