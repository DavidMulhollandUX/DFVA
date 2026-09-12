export const meta = {
  name: 'v4-body-fill-cohort',
  description: 'Fill §4 MARKET EVIDENCE and §5 CURRICULUM IMPLICATIONS on scaffolded v4 report bodies',
  whenToUse:
    'After the market report and the improvement plan both exist for a program. One agent per program, from disk only; the scaffold renders every other section, so the agent supplies judgement cells and nothing else.',
  phases: [
    { title: 'Fill', detail: 'author the §4/§5 fill cells, render with dfva-v4-report-scaffold.ts --fill, lint one file' },
  ],
}

// Same args contract as v4-recommend-cohort.js: a real array, a JSON string, or
// a whitespace/comma list of program codes.
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
  throw new Error(`args must be program codes with scaffolded v4 bodies — received ${JSON.stringify(args)}`)
}

const RESULT = {
  type: 'object',
  required: ['code', 'status', 'reportPath'],
  properties: {
    code: { type: 'string' },
    // "skipped" when an input is missing — the agent must not invent §4 evidence
    // for a program with no market report or no improvement plan.
    status: { enum: ['filled', 'skipped'] },
    reason: { type: 'string' },
    reportPath: { type: 'string' },
    lintClean: { type: 'boolean' },
  },
}

log(`Filling §4/§5 on ${codes.length} v4 report bod(ies) from disk; no network access in this workflow.`)

const results = await parallel(
  codes.map((code) => () =>
    agent(
      `From the repository root run: cd scripts && npx tsx dfva-v4-report-scaffold.ts ${code} --fill-template ` +
        `. If it exits non-zero, return status "skipped" with its stderr line as the reason and write nothing. ` +
        `Otherwise it prints the JSON you must fill — a "bearing" object keyed by destination profession, an ` +
        `"implications" object keyed by item (C1–C5, W1–W3) each with "implication" and "cost" — plus a ` +
        `"context" object carrying every item's score, rationale and anchor text. Drop the "context" key from ` +
        `what you write.\n\n` +
        `Read exactly three more files: docs/dfva-report-section-authoring.md for the §4 and §5 rules, ` +
        `reports/dfva-market-${code}.md for the market evidence §4 condenses, and ` +
        `reports/dfva-v4-recommend-${code}.md for the improvement plan. Do not open dfva/source/evidence/, ` +
        `the capture under scrapes/, or the rendered report — the context object is complete.\n\n` +
        `Rules that decide whether this passes: each "bearing" cell states what the market evidence says about ` +
        `that profession's exposure and demand, attributed to the market report's own sourced signals — never ` +
        `a new claim and never a figure the market report does not carry. Each "implication" cell says what the ` +
        `item's score means for the curriculum, and its "cost" states what changing it would cost; both must ` +
        `agree with the improvement plan's diagnostic and intervention rows and must not contradict them. Use ` +
        `no prior knowledge of the program, and assert no exposure figure or position label beyond what ` +
        `"context" states.\n\n` +
        `Write the filled JSON to scrapes/v4/pending/${code}.body-fill.json, then run: ` +
        `cd scripts && npx tsx dfva-v4-report-scaffold.ts ${code} --fill ../scrapes/v4/pending/${code}.body-fill.json ` +
        `&& npx tsx check-report-format.ts --code ${code}. On a lint error, edit the fill JSON — never the ` +
        `report file — and rerun both commands. Return {code, status, reportPath, lintClean}.`,
      { label: `fill:${code}`, phase: 'Fill', model: 'sonnet', schema: RESULT },
    ),
  ),
)

const done = results.filter(Boolean)
const filled = done.filter((r) => r.status === 'filled')
const skipped = done.filter((r) => r.status === 'skipped')
const lost = codes.length - done.length
if (skipped.length) log(`Skipped: ${skipped.map((s) => `${s.code} (${s.reason ?? 'missing input'})`).join(', ')}`)
if (lost) log(`${lost} program(s) produced no result.`)
log(
  `Filled ${filled.length}/${codes.length}. Next: npm --prefix scripts run dfva:gen-content && ` +
    `npm --prefix scripts run dfva:check.`,
)

return {
  filled: filled.map((f) => f.code),
  skipped: skipped.map((s) => ({ code: s.code, reason: s.reason })),
  lintDirty: filled.filter((f) => f.lintClean === false).map((f) => f.code),
  unfilled: lost,
}
