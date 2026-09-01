/** Shared plot scale for the v4 exposure–adaptiveness matrices.
 *
 *  Extracted verbatim from V4ReportPage.tsx so the report page's mini matrix
 *  and the insights portfolio matrix plot on one scale: a program sits in the
 *  same visual place, and a reader can carry a number between the two
 *  surfaces. The extraction must stay behaviour-neutral.
 */

export const X_MIN = 60;
export const X_MAX = 100;
/** Kept at 15 despite the observed 3–11 range so the two figures stay
 *  comparable; the caption states the observed range. */
export const Y_MAX = 15;

/** Dot radius encoding the workplace sub-score. W is not on either axis — the
 *  position runs on adaptiveness alone — so size is how it earns its place on
 *  the figure. It also does the work the axes cannot: six scored programs sit
 *  at adaptiveness 9 with W spanning the full 2–9 range, and without this they
 *  plot as one indistinguishable stack. */
export const wRadius = (workplace: number) =>
  3 + (Math.max(0, Math.min(9, workplace)) / 9) * 5;
