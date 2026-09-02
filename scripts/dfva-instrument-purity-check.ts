/**
 * Instrument purity guard for the insights page.
 *
 * After the v4 rebase, /insights rendering the superseded instruments is by
 * definition a regression — it happened once (the page reported v2/v3 scores
 * for 38 programs while every report page rendered v4) and this makes a
 * reintroduction fail CI instead of waiting for a reader to notice.
 *
 * A regex over one file's import block has no false positives. Deliberately
 * NOT generalised: V4ReportPage and reportIndex legitimately read
 * v3Programs for orientation data; only the insights page is guarded here.
 */
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(import.meta.dirname, "..", "compass", "app", "src");
const PAGE = join(APP, "compass", "v4", "V4InsightsPage.tsx");

const FORBIDDEN: [string, string][] = [
  ["../v3/data/", "v3 instrument"],
  ["../v31/data/", "v3.1 instrument"],
];

/**
 * Pure core: given one file's source text, return its purity failures — [] if
 * clean. Only import statements are checked, so a comment mentioning v3
 * cannot trip the guard. Exported so the test file can assert against small
 * fixtures without touching disk.
 */
export function purityIssues(source: string): string[] {
  const imports = source.match(/^import[^;]+;/gm) ?? [];
  const failures: string[] = [];
  for (const statement of imports) {
    for (const [pattern, label] of FORBIDDEN) {
      if (statement.includes(pattern))
        failures.push(`imports from ${label} (${pattern})`);
    }
  }
  return failures;
}

function main(): void {
  const source = readFileSync(PAGE, "utf8");
  const failures = purityIssues(source);

  if (failures.length > 0) {
    console.error(
      `dfva-instrument-purity-check: V4InsightsPage.tsx ${failures.join("; ")}.`,
    );
    console.error(
      "/insights reports the v4 instrument only. Derivations live in v4/portfolioStats.ts.",
    );
    process.exit(1);
  }
  console.log("dfva-instrument-purity-check: insights page is v4-pure.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
