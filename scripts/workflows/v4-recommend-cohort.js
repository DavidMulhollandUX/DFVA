export const meta = {
  name: 'v4-recommend-cohort',
  description: 'Write v4 improvement plans (reports/dfva-v4-recommend-<code>.md) for scored programs',
  whenToUse:
    'After v4-score-cohort has persisted verified panelCv4 blocks. One agent per program, from disk only; the plan is what completes Part B of the v4 Durability Report page.',
  phases: [
    { title: 'Recommend', detail: 'DFVA-V4-RECOMMEND-PROMPT.md per program, lint, fix' },
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

log(`Writing improvement plans for ${codes.length} program(s) from disk; no network access in this workflow.`)

const results = await parallel(
  codes.map((code) => () =>
    agent(
      `First check two inputs exist: dfva/source/evidence/${code}.json must carry a ` +
        `"panelCv4" block with "verified" stamped, and reports/dfva-market-${code}.md must exist. ` +
        `If either is missing, return status "skipped" with the reason and write nothing. ` +
        `Otherwise read dfva/dist/v4/DFVA-V4-RECOMMEND-PROMPT.md and follow it EXACTLY to write ` +
        `the improvement plan for ${code}. Inputs: the verified panelCv4 block and the market ` +
        `report. Write reports/dfva-v4-recommend-${code}.md per ` +
        `dfva/dist/v4/recommend-template-v4.md — every intervention targets a named item's ` +
        `NEXT anchor level and cites a named market signal; inline citations use the ` +
        `web-linked [[n]](url) form; REFERENCES must match the template verbatim. ` +
        `Do NOT state a position/quadrant label or any exposure figure unless the program has a ` +
        `measured exposure in compass/app/src/compass/v3/data/v3Programs.ts or ` +
        `compass/app/src/compass/v4/data/v4PanelC.ts (V4_ONLY_PROGRAMS); for a Panel-C-only ` +
        `program the Position basis line carries adaptiveness and workplace only and says ` +
        `exposure is not measured. Use only the handbook evidence and the market report — no ` +
        `prior knowledge of the program. Then run ` +
        `"npm --prefix scripts run dfva:report-lint" and fix every error that names ` +
        `dfva-v4-recommend-${code}.md. Return {code, status, levers, recommendPath, lintClean}.`,
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
  `Wrote ${written.length}/${codes.length}. Next: add "dfva-v4-recommend-<code>" keys to ` +
    `compass/app/src/compass/reportContent.ts, then npm --prefix scripts run dfva:gen-content && dfva:check.`,
)

return {
  written: written.map((w) => w.code),
  skipped: skipped.map((s) => ({ code: s.code, reason: s.reason })),
  lintDirty: written.filter((w) => w.lintClean === false).map((w) => w.code),
  unwritten: lost,
}
