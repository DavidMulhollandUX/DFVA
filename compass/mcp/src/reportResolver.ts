/**
 * Resolve the markdown report filename for a program from a directory listing.
 * Pure (takes the listing as an argument) so it is unit-testable — index.ts
 * starts the MCP server at import time, so testable logic lives here.
 *
 * Exact filenames are tried first (dfva-<code>.md — the actual reports/ naming
 * convention — then the legacy dfva-recommend-<code>.md). A loose substring
 * match is the fallback, but an ambiguous result is reported rather than
 * silently returning whichever file the directory listing happened to order
 * first (e.g. "cl" matches both dfva-080cl.md and dfva-527cl.md).
 */
export type ReportResolution =
  | { kind: "found"; file: string }
  | { kind: "ambiguous"; candidates: string[] }
  | { kind: "not-found" };

export function resolveReportFile(
  programCode: string,
  files: string[],
): ReportResolution {
  const normalized = programCode.toLowerCase().replace(/_/g, "-");

  for (const exact of [`dfva-${normalized}.md`, `dfva-recommend-${normalized}.md`]) {
    const match = files.find((f) => f.toLowerCase() === exact);
    if (match) return { kind: "found", file: match };
  }

  const loose = files.filter(
    (f) => f.toLowerCase().includes(normalized) && f.endsWith(".md"),
  );
  if (loose.length === 1) return { kind: "found", file: loose[0] };
  if (loose.length > 1) return { kind: "ambiguous", candidates: loose.sort() };
  return { kind: "not-found" };
}
