import { v4PanelCByCode } from "./v4/data/v4PanelC";

/** True when the program has a Panel C v4 score — i.e. a current Durability Report. */
export const hasV4 = (code: string): boolean => Boolean(v4PanelCByCode(code));

/** Canonical report URL. Every program resolves to /reports/:code; programs
 *  without a v4 score render the pending state there, with archived links. */
export const programReportPath = (code: string): string => `/reports/${code}`;

/** Strip the legacy slug prefix: "dfva-mc-cs" → "mc-cs". */
export const codeFromSlug = (slug: string): string =>
  slug.replace(/^dfva-/, "");
