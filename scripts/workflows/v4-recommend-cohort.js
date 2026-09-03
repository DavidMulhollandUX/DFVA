export const meta = {
  name: 'v4-recommend-cohort',
  description: 'Write v4 improvement plans (reports/dfva-v4-recommend-<code>.md) for scored programs',
  whenToUse:
    'After v4-score-cohort has persisted verified panelCv4 blocks and the market report exists. One agent per program, from disk only; the plan is what completes Part B of the v4 Durability Report page.',
  phases: [
    { title: 'Recommend', detail: 'author the fill cells, render with dfva-v4-recommend-scaffold.ts --fill, lint one file' },
  ],
}

// Same args contract as v4-score-cohort.js: a real array, a JSON string, or a
// whitespace/comma list of program codes.
let codes = args
if (typeof codes === 'string') {
  try {
    codes = JSON.parse(codes)
  } catch {
    codes = codes.split(/[\s,]+/).filter(Boolean)
  }
}
if (typeof codes === 'string') codes = [codes]
if (!Array.isArray(codes) || codes.length === 0) {
  throw new Error(`args must be program codes with panelCv4 blocks — received ${JSON.stringify(args)}`)
}

const RESULT = {
  type: 'object',
  required: ['code', 'status', 'recommendPath'],
  properties: {
    code: { type: 'string' },
    // "skipped" when the inputs are missing — the agent must not invent a plan
    // for a program with no verified score or no market report.
    status: { enum: ['written', 'skipped'] },
    reason: { type: 'string' },
    levers: { type: 'integer' },
    recommendPath: { type: 'string' },
    lintClean: { type: 'boolean' },
  },
}

// The agent never writes the report. The scaffold derives every rule-bound
// section (header, scores, headroom, anchors, gate rows, cumulative ladder,
// REFERENCES) and the agent supplies only the judgement cells as a fill JSON.
// A missing cell renders as TO BE AUTHORED and the lint refuses the file, so a
// half-authored plan cannot reach the site. Lint runs on one file, not 576.
log(`Writing improvement plans for ${codes.length} program(s) from disk; no network access in this workflow.`)

const results = await parallel(
  codes.map((code) => () =>
    agent(
      `First check two inputs exist: dfva/source/evidence/${code}.json must carry a ` +
        `"panelCv4" block with "verified" stamped, and reports/dfva-market-${code}.md must exist. ` +
        `If either is missing, return status "skipped" with the reason and write nothing. ` +
        `Otherwise, from the repository root run: cd scripts && npx tsx dfva-v4-recommend-scaffold.ts ${code} --fill-template ` +
        `— it prints the JSON you must fill (preamble, marketEvidence per item, actions per step, ` +
        `alignment rows, interventions rows, constraints per gate) plus a "context" object with each ` +
        `item's score, rationale and anchor text. Read dfva/dist/v4/DFVA-V4-RECOMMEND-PROMPT.md for ` +
        `the rules, dfva/source/evidence/${code}.json for the scored rationales, and ` +
        `reports/dfva-market-${code}.md for the market signals. Fill EVERY key: each action targets ` +
        `the named item's NEXT anchor level and cites a named market signal; inline citations use ` +
        `the web-linked [[n]](url) form with n from the canonical REFERENCES list; options with ` +
        `costs, never directives; no exposure figure or position label beyond what "context" states. ` +
        `Use only the handbook evidence and the market report — no prior knowledge of the program. ` +
        `Write the filled JSON to scrapes/v4/pending/${code}.recommend-fill.json (drop the "context" ` +
        `key), then run: cd scripts && npx tsx dfva-v4-recommend-scaffold.ts ${code} --fill ../scrapes/v4/pending/${code}.recommend-fill.json ` +
        `&& npx tsx check-report-format.ts --code ${code}. On a lint error, edit the fill JSON — never ` +
        `the report file — and rerun both commands. Return {code, status, levers (the number of ` +
        `interventions), recommendPath, lintClean}.`,
      { label: `recommend:${code}`, phase: 'Recommend', schema: RESULT },
    ),
  ),
)

const done = results.filter(Boolean)
const written = done.filter((r) => r.status === 'written')
const skipped = done.filter((r) => r.status === 'skipped')
const lost = codes.length - done.length
if (skipped.length) log(`Skipped: ${skipped.map((s) => `${s.code} (${s.reason ?? 'missing input'})`).join(', ')}`)
if (lost) log(`${lost} program(s) produced no result.`)
log(
  `Wrote ${written.length}/${codes.length}. Next: author the v4 report's §4 bearing and §5 ` +
    `(scripts/dfva-v4-report-scaffold.ts <code> --fill …), then npm --prefix scripts run dfva:gen-content && dfva:check.`,
)

return {
  written: written.map((w) => w.code),
  skipped: skipped.map((s) => ({ code: s.code, reason: s.reason })),
  lintDirty: written.filter((w) => w.lintClean === false).map((w) => w.code),
  unwritten: lost,
}
