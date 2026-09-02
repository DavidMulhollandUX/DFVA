import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Review item 14 (2026-09-02): brand words that must not reach a reader.
 * "DFVA" and "COMPASS" are internal names (brandConfig.methodology is
 * internal-only), "Durability Rating" was retired for "Durability
 * Assessment", "MODERATE RISK" is v1 band language, and anything that
 * presents Evidura as a University of Melbourne project or contact point
 * is out (DJ decision 2). Naming the University as the program's owner is
 * fine and is not matched here.
 */
const ROOT = join(__dirname, "..", "..");
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\bDFVA\b(?![_-])/, "DFVA (use brand.name or brand.signalName)"],
  [/\bCOMPASS\b/, "COMPASS (retired working name)"],
  [/Durability Rating/, "Durability Rating (use brand.signalName)"],
  [/MODERATE RISK|HIGH RISK\b/, "v1 risk band"],
  [/@unimelb\.edu\.au/, "a University of Melbourne mailbox"],
  [/research project/i, "presents Evidura as a research project"],
  [/Service Experience/, "names the SXD team as a contact point"],
];
// Archived v1 renderers show v1 reports under their own name; the reference
// list cites internal documents by title; tests and generated content are
// not copy.
const EXCLUDE = [
  "compass/v2/",
  "compass/__tests__/",
  "compass/reportContent",
  "compass/ReportDetailPage.tsx",
  "compass/ReportsPage.tsx",
  "compass/SourceReferences.tsx",
  "admin/",
];

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return tsxFiles(p);
    return name.endsWith(".tsx") ? [p] : [];
  });
}

/** Strip comments so the check reads what a reader can see. */
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

describe("reader-facing copy carries no internal or institutional branding", () => {
  const files = tsxFiles(ROOT)
    .map((f) => relative(ROOT, f))
    .filter(
      (f) => !EXCLUDE.some((x) => f.startsWith(x) || f.includes("/" + x)),
    );

  it("scans a meaningful corpus", () => {
    expect(files.length).toBeGreaterThan(40);
  });

  for (const f of files) {
    it(f, () => {
      const body = stripComments(readFileSync(join(ROOT, f), "utf8"));
      for (const [re, why] of FORBIDDEN) {
        const m = body.match(re);
        expect(m, `${f}: ${why}: "${m?.[0]}"`).toBeNull();
      }
    });
  }
});
