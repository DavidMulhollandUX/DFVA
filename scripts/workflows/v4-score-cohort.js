export const meta = {
  name: 'v4-score-cohort',
  description: 'Score captured reference-cohort programs on Panel C v4 and persist panelCv4 blocks',
  whenToUse:
    'After scripts/scrape-v4-cohort.py has captured extracts to scrapes/v4/. Fans out scoring only — capture stays serial because the handbook rate-limits at IP level.',
  phases: [
    { title: 'Score', detail: 'Panel C v4 scoring per DFVA-V4-SCORING-PROMPT.md, one agent per program' },
    { title: 'Verify', detail: 'adversarial refutation + verbatim evidence check' },
    { title: 'Persist', detail: 'merge the verified panelCv4 block into the evidence file' },
  ],
}

// The work-list is scouted inline and passed in as args — this workflow never
// touches the network. The capture step is deliberately NOT part of this
// workflow: the handbook blocks by IP, so parallel scraping re-trips it and
// takes the whole cohort down. Capture serially (scrape-v4-cohort.py, 3s
// paced), then score in parallel from disk.
// args can arrive as a real array or as a JSON-encoded string depending on how
// the caller passed it — a scheduled run that stringifies it would otherwise
// fail on every fire and silently score nothing.
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
  throw new Error(
    `args must be program codes with extracts in scrapes/v4/ — received ${JSON.stringify(args)}`,
  )
}

const ITEM = {
  type: 'object',
  required: ['score', 'rationale', 'evidenceLines'],
  properties: {
    score: { type: 'integer', minimum: 0, maximum: 3 },
    rationale: { type: 'string' },
    evidenceLines: { type: 'array', items: { type: 'string' }, minItems: 1 },
  },
}
const GATE = {
  type: 'object',
  required: ['result', 'rationale', 'evidenceLines'],
  properties: {
    result: { enum: ['PASS', 'FAIL'] },
    rationale: { type: 'string' },
    evidenceLines: { type: 'array', items: { type: 'string' } },
  },
}
const SCORE_SCHEMA = {
  type: 'object',
  required: ['code', 'panelCv4'],
  properties: {
    code: { type: 'string' },
    // v4.1 scores two independent sub-scales. They are reported separately and
    // never summed — whether they behave as one construct or two is the open
    // question the instrument exists to test.
    panelCv4: {
      type: 'object',
      required: ['C1', 'C2', 'C3', 'C4', 'C5', 'adaptiveness', 'W1', 'W2', 'W3', 'workplace', 'gates'],
      properties: {
        C1: ITEM, C2: ITEM, C3: ITEM, C4: ITEM, C5: ITEM,
        adaptiveness: { type: 'integer', minimum: 0, maximum: 15 },
        W1: ITEM, W2: ITEM, W3: ITEM,
        workplace: { type: 'integer', minimum: 0, maximum: 9 },
        gates: { type: 'object', required: ['G1', 'G2'], properties: { G1: GATE, G2: GATE } },
        ambiguities: { type: 'array', items: { type: 'string' } },
        notScoreable: { type: 'array', items: { type: 'string' } },
      },
    },
  },
}
const VERDICT = {
  type: 'object',
  required: ['upheld', 'demotions', 'unquotable'],
  properties: {
    upheld: { type: 'boolean' },
    demotions: {
      type: 'array',
      items: {
        type: 'object',
        required: ['item', 'to', 'why'],
        properties: { item: { type: 'string' }, to: { type: 'integer' }, why: { type: 'string' } },
      },
    },
    unquotable: { type: 'array', items: { type: 'string' } },
  },
}

log(`Scoring ${codes.length} program(s) from captured extracts; no network access in this workflow.`)

const results = await pipeline(
  codes,
  (code) =>
    agent(
      `Read dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md and follow it EXACTLY to score program ` +
        `"${code}" on Panel C (the instrument version the prompt states) — BOTH sub-scales: the adaptive capabilities C1-C5 ` +
        `(/15) and workplace practice W1-W3 (/9). Report them separately and never sum ` +
        `them into one figure. The handbook evidence is the file scrapes/v4/${code}.txt — ` +
        `read it in full and score ONLY from it. Do not fetch anything; do not use prior ` +
        `knowledge of this program. Every evidenceLines entry must be copied verbatim from ` +
        `that file. Where the evidence is consistent with two levels, take the LOWER level and ` +
        `record the ambiguity. If the extract lacks the evidence an item needs, say so in ` +
        `notScoreable rather than inferring a score. Return the JSON contract the prompt specifies.`,
      { label: `score:${code}`, phase: 'Score', schema: SCORE_SCHEMA },
    ),
  (scored, code) =>
    agent(
      `Adversarially verify this Panel C scoring for "${code}" — the C1-C5 items ` +
        `AND the W1-W3 workplace items: ` +
        `${JSON.stringify(scored.panelCv4)}. Read the anchors in ` +
        `dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md and the evidence in scrapes/v4/${code}.txt. ` +
        `(1) Try to REFUTE every level-3 score: does the quoted ASSESSMENT evidence really ` +
        `exist, or is it an outcome statement (which rule R2 caps at level 1)? ` +
        `(2) Try to refute every gate PASS. ` +
        `(3) Check each evidenceLines entry appears VERBATIM in the extract; list any that do ` +
        `not in "unquotable". An item with an unquotable line drops to the highest level its ` +
        `remaining evidence supports. Default to refuting when uncertain.`,
      { label: `verify:${code}`, phase: 'Verify', schema: VERDICT },
    ).then((verdict) => ({ code, scored, verdict })),
  (r) =>
    agent(
      `Apply these verified Panel C v4 results for "${r.code}": ${JSON.stringify(r)}. ` +
        `(1) Apply every demotion and drop any item whose evidence was unquotable, then ` +
        `recompute adaptiveness as the sum of C1..C5 and workplace as the sum of W1..W3. ` +
        `Keep the two totals separate — never emit a combined Panel C figure. ` +
        `(2) Merge the panelCv4 block into dfva/source/evidence/${r.code}.json, preserving the ` +
        `existing v1 "byDimension" content untouched. Most cohort programs have no evidence ` +
        `file yet — if it is absent, create it as {"code": "${r.code}", "panelCv4": {...}} and ` +
        `do NOT invent any v1 content. Stamp ` +
        `"verified": {"adversarial": true, "mechanical": true, "date": "<today>"}. ` +
        `(3) Do NOT write any report file — this pass produces scores only. ` +
        `Return {code, adaptiveness, gates, ambiguities}.`,
      {
        label: `persist:${r.code}`,
        phase: 'Persist',
        schema: {
          type: 'object',
          required: ['code', 'adaptiveness', 'workplace'],
          properties: {
            code: { type: 'string' },
            adaptiveness: { type: 'integer' },
            workplace: { type: 'integer' },
            gates: { type: 'object' },
            ambiguities: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    ),
)

const done = results.filter(Boolean)
const failed = codes.length - done.length
if (failed) log(`${failed} program(s) produced no result and remain unscored.`)
log(`Scored ${done.length}/${codes.length}. Run "npm --prefix scripts run dfva:gen-v4" to recompute the median.`)

return {
  scored: done,
  unscored: failed,
  ambiguities: done.flatMap((d) => (d.ambiguities ?? []).map((a) => `${d.code}: ${a}`)),
}
