/**
 * Report-metadata stripping shared by the report renderers.
 *
 * Some lines in `reports/*.md` exist for the pipeline, not the reader. They are
 * required by `dfva:report-lint` (and so cannot be deleted from the source
 * files) but must never reach the page.
 */

/**
 * Drop the superseded v1-composite header lines from a recommend report:
 * `**Current:** N/36 <BAND>` (all 67 reports) and its counterpart
 * `**Target:** N/36 <BAND> | **Gap:** N points` (62 of them).
 *
 * Those numbers are the v1 11-dimension composite, superseded by the v3.1
 * durability measures (destination exposure x curriculum adaptiveness, plus the
 * two gates). Rendering them reintroduces the legacy composite that the v3.1
 * display revision removed — UX defect U1 — and on the report detail page the
 * current score also duplicates the hero. The newer report files say as much
 * themselves ("file metadata only, not rendered"); this makes that true.
 *
 * Both lines go together: they are one statement split across two lines, so
 * removing only `**Current:**` would leave a target and a gap with nothing to
 * be a gap from.
 *
 * Deliberately narrow beyond that. The sibling `**v3.1 Position:**` and
 * `**Goal:**` lines are kept, because on the v1 report detail page they are the
 * only place the current instrument's reading appears.
 * `v2/components/ReportMarkdownCard` drops the whole leading metadata run
 * instead — correct there, because its pages render the position in their own
 * hero.
 */
const SUPERSEDED_COMPOSITE_LINE =
  /^\*\*(Current|Target):\*\*\s*\d{1,2}\/36\b/;

export function stripSupersededCompositeLine(markdown: string): string {
  return markdown
    .split("\n")
    .filter((line) => !SUPERSEDED_COMPOSITE_LINE.test(line.trim()))
    .join("\n");
}

/**
 * Drop pipeline tooling metadata — which prompt template generated the file,
 * which report it was derived from. This is provenance for the pipeline, not
 * information for a reader, and `v2/components/ReportMarkdownCard` has always
 * treated it as never-rendered ("Tooling metadata is never rendered, wherever
 * it appears in the body"). The report detail page did not, so on the older
 * recommend files it rendered — and once the superseded composite above is
 * removed it would otherwise become the report's opening line.
 *
 * `**Assessment date:**` is deliberately kept: when a program was assessed is
 * real provenance for the reader, and this page shows it nowhere else.
 */
const TOOLING_METADATA_LINE =
  /^\*\*(Prompt [Vv]ersion|Source Report):\*\*/;

export function stripToolingMetadata(markdown: string): string {
  return markdown
    .split("\n")
    .filter((line) => !TOOLING_METADATA_LINE.test(line.trim()))
    .join("\n");
}
