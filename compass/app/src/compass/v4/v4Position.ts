import { V4_META } from "./data/v4PanelC";

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
 * shown. (The exposure median is inherited; v4 does not touch Panel A.)
 */
export function v4Quadrant(
  exposure: number,
  adaptiveness: number,
): V4Quadrant | null {
  if (!V4_META.complete || V4_META.adaptMedian === null) return null;
  const highExp = exposure > V4_META.expMedian;
  const highAdapt = adaptiveness >= V4_META.adaptMedian;
  if (highExp) return highAdapt ? "well-positioned" : "attention";
  return highAdapt ? "comfortable" : "sheltered";
}
