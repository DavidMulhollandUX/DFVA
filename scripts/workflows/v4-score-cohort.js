export const meta = {
  name: 'v4-score-cohort',
  description: 'Score captured reference-cohort programs on Panel C v4 and persist panelCv4 blocks',
  whenToUse:
    'After the capture queue has assembled extracts to scrapes/v4/. Fans out scoring only — capture stays serial because the handbook rate-limits at IP level.',
  phases: [
    { title: 'Score', detail: 'Panel C v4 scoring per DFVA-V4-SCORING-PROMPT.md, one agent per program' },
    { title: 'Verify', detail: 'mechanical verbatim check (script), then adversarial refutation' },
    { title: 'Persist', detail: 'dfva-v4-persist.ts applies the verdict and merges the evidence file' },
  ],
}

// The work-list is scouted inline and passed in as args — this workflow never
// touches the network. The capture step is deliberately NOT part of this
// workflow: the handbook blocks by IP, so parallel scraping re-trips it and
// takes the whole cohort down. Capture serially, then score in parallel from disk.
//
// Deterministic steps run as scripts, not as agents (2026-09-03):
//   - the verbatim evidence check is scripts/dfva-v4-verify-evidence.ts --scored
//   - applying the verdict and merging the record is scripts/dfva-v4-persist.ts
// Each runs through a low-effort "runner" agent whose whole job is one command,
// because the Workflow API has no shell primitive. The reviewer receives the
// mechanical result and states levels; it no longer greps, and it no longer
// decides what to delete. No LLM writes to dfva/source/evidence/ here.
//
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

// H2: the full set of items the adversarial reviewer must attest to attacking.
const REVIEWABLE = ['C1', 'C2', 'C3', 'C4', 'C5', 'W1', 'W2', 'W3', 'G1', 'G2']
const SCORED_ITEMS = ['C1', 'C2', 'C3', 'C4', 'C5', 'W1', 'W2', 'W3']

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
// scripts/dfva-v4-verify-evidence.ts --scored <file> --json
const MECH_SCHEMA = {
  type: 'object',
  required: ['code', 'unmatched', 'noCapture', 'misidentified', 'outOfScope', 'phantomCodes', 'missingSubjects'],
  properties: {
    code: { type: 'string' },
    verbatim: { type: 'integer' },
    elided: { type: 'integer' },
    unmatched: { type: 'array', items: { type: 'string' } },
    noCapture: { type: 'boolean' },
    misidentified: { type: 'boolean' },
    missingSubjects: { type: 'array', items: { type: 'string' } },
    outOfScope: {
      type: 'array',
      items: { type: 'object', required: ['line', 'fragment'], properties: { line: { type: 'string' }, fragment: { type: 'string' } } },
    },
    phantomCodes: {
      type: 'array',
      items: { type: 'object', required: ['item', 'subject'], properties: { item: { type: 'string' }, subject: { type: 'string' } } },
    },
  },
}
const VERDICT = {
  type: 'object',
  required: ['upheld', 'demotions', 'unquotable', 'reviewed'],
  properties: {
    upheld: { type: 'boolean' },
    reviewed: {
      // Coverage contract (H2). A verdict used to record conclusions only, so
      // "no finding" and "never looked" were indistinguishable and an inlined,
      // truncated payload let C4-C5 and W1-W3 reach the record unattacked. The
      // reviewer must now name every item it attacked.
      type: 'array',
      items: { enum: REVIEWABLE },
      minItems: REVIEWABLE.length,
    },
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
// scripts/dfva-v4-persist.ts stdout, wrapped so a refusal is data, not a crash.
const PERSIST_RESULT = {
  type: 'object',
  required: ['ok'],
  properties: {
    ok: { type: 'boolean' },
    error: { type: 'string' },
    report: {
      type: 'object',
      required: ['code', 'adaptiveness', 'workplace', 'items'],
      properties: {
        code: { type: 'string' },
        adaptiveness: { type: 'integer' },
        workplace: { type: 'integer' },
        gates: { type: 'object' },
        ambiguities: { type: 'array', items: { type: 'string' } },
        items: {
          type: 'array',
          items: {
            type: 'object',
            required: ['item', 'before', 'after'],
            properties: { item: { type: 'string' }, before: { type: 'integer' }, after: { type: 'integer' } },
          },
        },
      },
    },
  },
}

const pendingOf = (code) => `scrapes/v4/pending/${code}`

log(`Scoring ${codes.length} program(s) from captured extracts; no network access in this workflow.`)

const results = await pipeline(
  codes,
  // ── Score ──────────────────────────────────────────────────────────────
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
        `notScoreable rather than inferring a score. ` +
        `Write the exact JSON object you return to ${pendingOf(code)}.scored.json (create ` +
        `scrapes/v4/pending/ if it does not exist) — a script reads that file next. Do not write ` +
        `any other file. Return the JSON contract the prompt specifies.`,
      { label: `score:${code}`, phase: 'Score', schema: SCORE_SCHEMA },
    ),
  // ── Mechanical check (script, via a runner) ────────────────────────────
  (scored, code) =>
    agent(
      `From the repository root run exactly this command and nothing else:\n` +
        `cd scripts && npx tsx dfva-v4-verify-evidence.ts --scored ../${pendingOf(code)}.scored.json --json\n` +
        `Return its stdout parsed as JSON. Do not read, edit or create any file. If the command ` +
        `exits non-zero, return {"code":"${code}","unmatched":[],"noCapture":true,"misidentified":false,` +
        `"outOfScope":[],"phantomCodes":[],"missingSubjects":[]} and put the first stderr line in "error".`,
      { label: `mechanical:${code}`, phase: 'Verify', effort: 'low', schema: MECH_SCHEMA },
    ).then((mech) => {
      if (mech.noCapture) throw new Error(`mechanical:${code} no capture file or the check failed to run`)
      if (mech.misidentified)
        throw new Error(`mechanical:${code} capture holds a page that is not this program's — recapture, never re-score`)
      return { scored, mech }
    }),
  // ── Adversarial review ─────────────────────────────────────────────────
  ({ scored, mech }, code) =>
    agent(
      `Adversarially verify this Panel C scoring for "${code}" — the C1-C5 items ` +
        `AND the W1-W3 workplace items: ` +
        `${JSON.stringify(scored.panelCv4)}. Read the anchors in ` +
        `dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md and the evidence in scrapes/v4/${code}.txt. ` +
        `The mechanical verbatim check has ALREADY run. These recorded lines are NOT in the ` +
        `extract and WILL be deleted before the record is written: ${JSON.stringify(mech.unmatched)}. ` +
        `These lines quote text that is not on the subject they name: ${JSON.stringify(mech.outOfScope)}. ` +
        `These subject codes appear in rationale prose but nowhere in the capture: ${JSON.stringify(mech.phantomCodes)}. ` +
        `(1) Try to REFUTE every level-3 score: does the quoted ASSESSMENT evidence really ` +
        `exist, or is it an outcome statement (which rule R2 caps at level 1)? ` +
        `(2) Try to refute every gate PASS. ` +
        `(3) For EVERY item that loses a line above, state in "demotions" the level its ` +
        `remaining evidence supports — "to" equal to the current score is a valid answer and ` +
        `means the level holds. An item that loses a line with no demotion naming it is rejected. ` +
        `Do not repeat the mechanical list in "unquotable"; use "unquotable" only for a line you ` +
        `find is misquoted on grounds the script cannot see, copied exactly as recorded. ` +
        `Default to refuting when uncertain. ` +
        `(4) In "reviewed", list EVERY item you actually attacked — all of C1-C5, W1-W3 and the ` +
        `gates G1, G2. A verdict that omits any of them is rejected.`,
      { label: `verify:${code}`, phase: 'Verify', schema: VERDICT },
    ).then((verdict) => {
      // H2: the schema alone cannot prove the reviewer read what it listed, but
      // a thrown stage drops this program to null and skips persist — an
      // incompletely reviewed program is never written.
      const missing = REVIEWABLE.filter((i) => !verdict.reviewed.includes(i))
      if (missing.length) throw new Error(`verify:${code} missing ${missing.join(', ')}`)
      // The computed unmatched list is unioned here, in code, so the reviewer
      // cannot omit it; the persist script then enforces demotion-per-loss.
      verdict.unquotable = [...new Set([...(verdict.unquotable ?? []), ...mech.unmatched])]
      return { code, scored, mech, verdict }
    }),
  // ── Persist (script, via a runner) ─────────────────────────────────────
  (r) =>
    agent(
      `Write this JSON verbatim to ${pendingOf(r.code)}.verdict.json: ${JSON.stringify(r.verdict)}\n` +
        `Then from the repository root run exactly:\n` +
        `cd scripts && npx tsx dfva-v4-persist.ts ${r.code}\n` +
        `If it exits 0, return {"ok":true,"report":<its stdout parsed as JSON>}. If it exits ` +
        `non-zero, return {"ok":false,"error":"<first stderr line>"}. Do not edit any other file, ` +
        `and do not touch dfva/source/evidence/ yourself — the script is the only writer.`,
      { label: `persist:${r.code}`, phase: 'Persist', effort: 'low', schema: PERSIST_RESULT },
    ).then((res) => {
      if (!res.ok || !res.report) throw new Error(`persist:${r.code} refused — ${res.error ?? 'no report'}`)
      const persisted = res.report
      // H3, kept as a cross-check on the script's own output: `before` must be
      // the score the Score stage returned (proves the pending file is the
      // block the reviewer saw), nothing rises, and nothing moves without a
      // demotion the reviewer proposed.
      for (const { item, before, after } of persisted.items) {
        const scoredAt = r.scored.panelCv4[item]?.score
        if (before !== scoredAt)
          throw new Error(`persist:${r.code} ${item} before=${before} but the Score stage returned ${scoredAt}`)
        if (after > before) throw new Error(`persist:${r.code} raised ${item} ${before}→${after}`)
        const proposed = r.verdict.demotions.find((d) => d.item === item)
        if (after !== before && proposed?.to !== after)
          throw new Error(`persist:${r.code} changed ${item} with no matching demotion`)
      }
      const seen = persisted.items.map((i) => i.item)
      const absent = SCORED_ITEMS.filter((i) => !seen.includes(i))
      if (absent.length) throw new Error(`persist:${r.code} report omits ${absent.join(', ')}`)
      return persisted
    }),
)

const done = results.filter(Boolean)
const failed = codes.length - done.length
if (failed) log(`${failed} program(s) produced no result and remain unscored.`)
log(
  `Scored ${done.length}/${codes.length}. Next: npm --prefix scripts run dfva:gen-v4, then ` +
    `cd scripts && npx tsx dfva-v4-verify-evidence.ts --stamp to settle the mechanical stamp.`,
)

return {
  scored: done,
  unscored: failed,
  ambiguities: done.flatMap((d) => (d.ambiguities ?? []).map((a) => `${d.code}: ${a}`)),
}
