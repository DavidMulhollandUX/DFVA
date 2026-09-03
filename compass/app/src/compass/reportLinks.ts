import { v4IndexByCode } from "./v4/data/v4Meta";

/** True when the program has a Panel C v4 score — i.e. a current Durability Report. */
export const hasV4 = (code: string): boolean => Boolean(v4IndexByCode(code));

/** Canonical report URL. Every program resolves to /reports/:code; programs
 *  without a v4 score render the pending state there, with archived links. */
export const programReportPath = (code: string): string => `/reports/${code}`;

/** Strip the legacy slug prefix: "dfva-mc-cs" → "mc-cs". */
export const codeFromSlug = (slug: string): string =>
  slug.replace(/^dfva-/, "");

/** Research-degree reports are their own family: the assessment body lives at
 *  dfva-v4r-<code> while the market and recommend siblings stay at the plain
 *  program code. Slug prefix and program code therefore have to be tracked
 *  apart — reading the code as everything after "dfva-" yields "v4r-<code>",
 *  which matches no program and no market report. */
export const V4R_PREFIX = "dfva-v4r-";

/** The v4r report slug for a program code. */
export const v4rReportSlug = (code: string): string => `${V4R_PREFIX}${code}`;

export interface ParsedSlug {
  code: string;
  type: "assessment" | "market" | "recommend";
  family: "v1" | "v4r";
}

/** Split a /reports/:reportSlug legacy slug into its program code, which of the
 *  three sibling bodies it names, and which report family it belongs to. */
export function parseSlug(slug: string): ParsedSlug {
  if (slug.startsWith("dfva-recommend-"))
    return {
      code: slug.slice("dfva-recommend-".length),
      type: "recommend",
      family: "v1",
    };
  if (slug.startsWith("dfva-market-"))
    return {
      code: slug.slice("dfva-market-".length),
      type: "market",
      family: "v1",
    };
  if (slug.startsWith(V4R_PREFIX))
    return {
      code: slug.slice(V4R_PREFIX.length),
      type: "assessment",
      family: "v4r",
    };
  return { code: slug.slice("dfva-".length), type: "assessment", family: "v1" };
}

/** The assessment body slug for a parsed slug's program. */
export const assessmentSlugFor = (p: Pick<ParsedSlug, "code" | "family">) =>
  (p.family === "v4r" ? V4R_PREFIX : "dfva-") + p.code;
