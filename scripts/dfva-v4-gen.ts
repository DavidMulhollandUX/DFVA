/**
 * DFVA v4 generator. Renders the Panel C v4 agent scoring prompt and the v4
 * report template from the canonical instrument in dfva/source/rubricV4.ts.
 * Run: npm --prefix scripts run dfva:gen-v4
 */
import { promises as fs, existsSync, readFileSync } from 'node:fs'
import * as path from 'node:path'
import {
  ALL_V4_ITEMS,
  GATES_V4,
  PANEL_C_V4,
  PANEL_W_V4,
  V4_REFERENCES,
  refMarks,
  V4_ADAPTIVENESS_MAX,
  V4_DESIGN_RULES,
  V4_PANEL_C_MAX,
  V4_RETIRED,
  V4_VERSION,
  V4_WORKPLACE_MAX,
  renderV4GatesTable,
  renderV4ItemBlocks,
  renderV4References,
  renderV4RubricTable,
} from '../dfva/source/rubricV4'

const repoRoot = path.resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Panel A for v4-only programs.
//
// A program scored on v4 but absent from the v3 registry cannot go through the
// v3 Panel A generator: that path places a program against the reference
// medians on BOTH axes, and so requires a v2/v3.1 adaptiveness score, which a
// program scored only on v4.1 has never had. Exposure itself is instrument-
// independent — same JIR destinations, same crosswalk, same rescaling — so it
// is computed here by the identical procedure and carried on the v4 record.
// The position stays withheld: pairing a measured exposure with a v4
// adaptiveness needs a v4 median, which the migration cycle has not produced.
// ---------------------------------------------------------------------------

function parseCsv(p: string): Record<string, string>[] {
  const text = readFileSync(path.join(repoRoot, p), 'utf8')
  const rows: string[][] = []
  let row: string[] = [], field = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else inQuotes = false
      } else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = '' }
      if (c === '\r' && text[i + 1] === '\n') i++
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  const [header, ...body] = rows
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])))
}

interface PanelA {
  exposure: number
  entryExposure: number | null
  jirN: number | null
  nTitles: number
  nMedium: number
}

/**
 * Program names from the extension-cohort manifest, keyed by code. This is the
 * handbook name recorded when the program was admitted to the cohort, so it is
 * the in-repo record of the name for every program scored before its report is
 * drafted. Absent file or entry is not an error: the caller falls back.
 */
async function loadCohortNames(): Promise<Map<string, string>> {
  const names = new Map<string, string>()
  try {
    const ext = JSON.parse(
      await fs.readFile(path.join(repoRoot, 'scripts/v4_cohort_ext.json'), 'utf8'),
    ) as { code?: string; name?: string }[]
    for (const p of ext) {
      if (p.code && p.name) names.set(p.code, p.name)
    }
  } catch {
    // No extension cohort file yet — every program falls back to its code.
  }
  return names
}

/** The same three crosswalk sources the v3 generator merges, same precedence. */
function loadCrosswalk(): Map<string, { aioe: number; confidence: string }> {
  const xw = new Map<string, { aioe: number; confidence: string }>()
  for (const p of [
    'data/aioe/reconciliation/reconcile_C_authoritative_288_index.csv',
    'data/aioe/reconciliation/v2_panelA_new_occupation_crosswalk.csv',
    'data/aioe/v31_extension_crosswalk.csv',
  ]) {
    for (const r of parseCsv(p)) {
      const t = (r.occupation || '').trim()
      if (t) xw.set(t, { aioe: parseFloat(r.ai_exposure_index), confidence: r.mapping_confidence || 'high' })
    }
  }
  return xw
}

/**
 * Loose comparison so a punctuation or case difference cannot hide a record.
 * Must stay identical to the guard's `norm` in dfva-panela-coverage-check.ts —
 * an exact-match lookup here silently reports "no JIR record" for a program that
 * has one, which is the failure the guard exists to catch (511aa's record is
 * titled "Master of Public And International Law", capital "And").
 */
const normProgramName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

/**
 * Exposure for one v4-only program, matched to its JIR record by normalised
 * program name. An unmapped destination title throws rather than being skipped:
 * a mean over the subset that happens to be mapped is a different statistic than
 * the one a reader would take it for, and the error only ever runs one way.
 */
function panelAFor(name: string, xw: Map<string, { aioe: number; confidence: string }>): PanelA | null {
  const jir = JSON.parse(readFileSync(path.join(repoRoot, 'data', 'jir_data.json'), 'utf8')) as {
    records: { program: string; n?: number; job_titles?: Record<string, string[]> }[]
  }
  const rec =
    jir.records.find((r) => r.program === name) ??
    jir.records.find((r) => normProgramName(r.program) === normProgramName(name))
  if (!rec?.job_titles) return null

  const titles: { title: string; entry: boolean }[] = []
  const seen = new Set<string>()
  for (const stage of ['entry', 'early_mid', 'mid_senior'] as const) {
    for (const t of rec.job_titles[stage] ?? []) {
      if (seen.has(t)) continue
      seen.add(t)
      titles.push({ title: t, entry: stage === 'entry' })
    }
  }
  if (!titles.length) return null

  const vals = titles.map((t) => {
    const hit = xw.get(t.title)
    if (!hit) throw new Error(`Unmapped JIR title for "${name}": "${t.title}" — add it to data/aioe/v31_extension_crosswalk.csv`)
    return { ...t, ...hit }
  })
  const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
  const entry = vals.filter((v) => v.entry).map((v) => v.aioe)
  return {
    exposure: Math.round(mean(vals.map((v) => v.aioe)) * 100) / 100,
    entryExposure: entry.length ? Math.round(mean(entry) * 100) / 100 : null,
    jirN: rec.n ?? null,
    nTitles: vals.length,
    nMedium: vals.filter((v) => v.confidence !== 'high').length,
  }
}

const banner = (source: string): string =>
  [
    '<!-- GENERATED FILE — DO NOT EDIT.',
    `     Source: ${source} · Generator: scripts/dfva-v4-gen.ts`,
    '     Regenerate: npm --prefix scripts run dfva:gen-v4 -->',
    '',
  ].join('\n')

function scoringPrompt(): string {
  return `${banner('dfva/source/rubricV4.ts')}# DFVA-V4-SCORING-PROMPT (instrument ${V4_VERSION})

You are scoring one university program's **Panel C v4.1** from its public
handbook evidence. Panel C has TWO sub-scales, scored independently:

- **Adaptive capabilities (C1–C5, /${V4_ADAPTIVENESS_MAX})** — the four adaptive capabilities
  defined by TEQSA (Lodge et al., 2026) [1]. What makes a graduate durable as AI
  takes over tasks. Derivation: docs/dfva-panelc-v4-recommendation.md and
  docs/dfva-adaptiveness-literature-review.md.
- **Workplace practice (W1–W3, /${V4_WORKPLACE_MAX})** — what makes a graduate effective in ANY
  workplace, including AI-integrated ones: professional communication and conduct,
  authentic task design, and work-situated learning. Anchored on the Higher
  Education Standards Framework 2021 cl. 1.4.2 and 5.4.1 [19], the QILT Employer
  Satisfaction Survey domains [20], and the authentic-assessment and WIL
  literatures. Derivation: docs/dfva-panelc-v41-recommendation.md and
  docs/dfva-workplace-readiness-literature-review.md.

Report the two sub-scores separately. **Never sum them into a single figure in
your output** — whether they behave as one construct or two is an open empirical
question the instrument exists to test.

## Inputs you will be given

1. The program's handbook extract at scrapes/v4/<code>.txt — the course, outcomes
   and structure pages plus the core subject and assessment pages, concatenated
   and each headed by a "===== SOURCE: <url> =====" line. Score ONLY from this
   text. It is captured page text, so structure is carried by headings and
   whitespace rather than markup: a subject's assessment table reads as
   description / timing / percentage on consecutive lines. Quote whichever lines
   carry the evidence; do not expect markdown tables.
2. The program code and name.

## Non-negotiable scoring rules

- **R1 — ${V4_DESIGN_RULES.R1}**
- **R2 — ${V4_DESIGN_RULES.R2}**
- **R3 — ${V4_DESIGN_RULES.R3}**
- **R4 — ${V4_DESIGN_RULES.R4}**
- Scoring direction: when the evidence is ambiguous between two levels, take the
  LOWER level and record the ambiguity in the rationale. Never resolve ambiguity
  upward.
- A level-3 score additionally requires quoting the assessment evidence
  (assessment task, hurdle, placement requirement) — an outcome statement is
  never sufficient (R2).
- **One construct, one home.** Each piece of evidence scores in exactly one
  item. Placement evidence scores in W3, never in C1 or C4. Appraisal of the
  quality of work scores in C2, never in W2. If evidence seems to fit two items,
  say so in \`ambiguities\` and score it in the one whose construct names it.
- Do NOT compute exposure, position, quadrant, or stability — those come from
  Panel A and the enumeration layer downstream. Your output is the eight item
  scores, two gates, and evidence.
- ${V4_RETIRED.B} Never emit an irreplaceability score.

## Sub-scale A — adaptive capabilities (0–3 each; adaptiveness = sum, /${V4_ADAPTIVENESS_MAX})

${renderV4ItemBlocks(PANEL_C_V4)}

## Sub-scale W — workplace practice (0–3 each; workplace = sum, /${V4_WORKPLACE_MAX})

${renderV4ItemBlocks(PANEL_W_V4)}

## The two gates (PASS/FAIL, excluded from the sum)

${renderV4GatesTable()}

## Output — return EXACTLY this JSON shape

\`\`\`json
{
  "code": "<program code, lowercase>",
  "instrument": "${V4_VERSION}",
  "panelCv4": {
    "C1": { "score": 0, "rationale": "<why this level and not the one above>", "evidenceLines": ["<verbatim handbook line>", "..."] },
    "C2": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C3": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C4": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "C5": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "adaptiveness": 0,
    "W1": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "W2": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "W3": { "score": 0, "rationale": "...", "evidenceLines": ["..."] },
    "workplace": 0,
    "gates": {
      "G1": { "result": "PASS", "rationale": "...", "evidenceLines": ["..."] },
      "G2": { "result": "PASS", "rationale": "...", "evidenceLines": ["..."] }
    },
    "ambiguities": ["<each place the evidence straddled two levels, and which rule resolved it>"],
    "notScoreable": ["<any item whose evidence was absent from the extract, if any>"]
  }
}
\`\`\`

Rationales must reference the anchor text, not restate the score. Every
\`evidenceLines\` entry must appear verbatim in the supplied extract — an
unquotable claim is not evidence (R3).

## REFERENCES

${renderV4References()}
`
}

function reportTemplate(): string {
  return `${banner('dfva/source/rubricV4.ts')}# DFVA v4 Report Template — Canonical Spec (instrument ${V4_VERSION})

Every \`reports/dfva-v4-<code>.md\` must follow this template. It extends the
v3.1 display grammar (Part A finding / Part B market evidence / Part C method)
with the v4 Panel C and an explicit epistemic-status tag on every section —
**Basis: measured | scored | reported | inferred** — so a reader always knows
when the report moves from observation to judgement (the distinction A/Prof
Lyons's August 2026 feedback identified; LR §1, §7).

---

## Header

\`\`\`markdown
# DFVA v4 DURABILITY REPORT: <Program Name> (<CODE>)

**Instrument:** DFVA ${V4_VERSION} — Panel C v4 on the TEQSA adaptive capabilities [1]
**Assessment date:** <YYYY-MM-DD>
**Handbook vintage:** <year> · **Source URL(s):** <handbook url(s)>
**Coordinator:** <name (school)> — omit line if unknown
\`\`\`

## Sections (all required, in order)

### 1. POSITION — Basis: measured × scored

Destination AI Exposure <NN.NN> (Felten AIOE, measured; portfolio median <NN.N>)
× Curriculum Adaptiveness <N>/${V4_ADAPTIVENESS_MAX} (scored on Panel C v4.1 sub-scale A [1]).
The position axis remains adaptiveness alone; the workplace sub-score
<N>/${V4_WORKPLACE_MAX} is reported beside it, not folded into the axis, until the internal-structure
analysis says whether the two behave as one construct.
Position label only if stable per the v3.1 §5.2 rules; state modal probability
and stability class. Never render an unstable label.

### 2. PANEL C v4.1 SCORECARD — Basis: scored

One table, the two sub-scales kept visually separate with their own subtotals.
The two sub-scores are reported side by side and **never added together** —
Panel C's total is a bookkeeping figure, not a construct. Every row cites its
literature anchor by reference number and its handbook evidence:

\`\`\`markdown
| Item | Score | Rationale (anchor-referenced) |
| --- | --- | --- |
${PANEL_C_V4.map((d) => `| ${d.id} ${d.name} ${refMarks(d.evidenceBase)} | <0–3> | <rationale citing the anchor met and the handbook evidence> |`).join('\n')}
| **Adaptive capabilities** | **<N> / ${V4_ADAPTIVENESS_MAX}** | |
${PANEL_W_V4.map((d) => `| ${d.id} ${d.name} ${refMarks(d.evidenceBase)} | <0–3> | <rationale citing the anchor met and the handbook evidence> |`).join('\n')}
| **Workplace practice** | **<N> / ${V4_WORKPLACE_MAX}** | |
\`\`\`

Followed by one evidence paragraph per item quoting the decisive handbook
line(s). A level-3 claim must quote assessment evidence (R2).

### 3. GATES — Basis: scored

${GATES_V4.map((g) => `- **${g.id} ${g.name}:** <PASS|FAIL> — <one-line evidence>`).join('\n')}

A G1 FAIL is flagged prominently regardless of the adaptiveness score.

### 4. MARKET EVIDENCE — Basis: reported

Condensed from the market report, in two tables — destination job families with
their exposure values, and signals/skill shifts with their direction and the
scored item each bears on. Confidence restated from the market report. No
scoring language.

### 5. CURRICULUM IMPLICATIONS — Basis: inferred

Opens with the mandatory sentence: *"This section argues from the evidence
above; it is interpretation, not observation."* Then a table:
\`| Item | Score | Implication | Cost | Sources |\`, ordered by priority and
pointing at the v4 improvement plan for anchor text and sequencing. Phrased as
options with costs, not directives.

### 6. EVIDENCE CONFIDENCE & LIMITATIONS — Basis: reported

Panel D metadata (JIR match tier, n, coverage), the crosswalk vintage note,
plus the v4 standing limitations verbatim:

- Scores describe **documented curriculum intent**, not demonstrated graduate
  capability; the extrapolation warrant is constructive alignment, stated as an
  assumption (Kane [17]).
- Indigenous data governance is not scored as a distinct construct; C3 level 3
  counts it where taught (CARE Principles; Lodge et al. 2025 Principle 4 [2]).
- Perception/manipulation (Frey & Osborne's third bottleneck [7]) is unscored.
- A high W3 score describes curriculum design, not student welfare: required
  placements can disadvantage students who cannot afford unpaid work or
  relocation (Accord [30]; Fawns et al. [24] on ableism and elitism).
- W2 is scored against each discipline's own criterion situation [22], so
  cross-disciplinary W2 comparison is weaker than within-discipline comparison.
- W3 excludes simulation by design (simulation scores in W2), so programs whose
  professional norm is high-fidelity simulation may score low on W3 for a
  defensible pedagogic choice. Read the two sub-scores together.
- The authentic-assessment employability evidence rests largely on student
  self-report [25]; W2's warrant is documented design fidelity plus the
  assessment-drives-learning mechanism [26], not demonstrated employment effects.
- Work-integrated learning is NOT claimed to raise employment rates — Jackson &
  Collings [28] found it does not. W3's warrant is skill development, employment
  relevance and professional identity formation [29].

### REFERENCES

The numbered list below, verbatim, ending the report:

\`\`\`markdown
${renderV4References()}
\`\`\`

---

## Rubric quick reference (for authors; do not paste into reports)

${renderV4RubricTable()}

## Lint rules (for the future v4 family in check-report-format.ts)

1. Header carries \`**Instrument:** DFVA ${V4_VERSION}\`.
2. All six numbered sections present, in order, each with a \`Basis:\` tag.
3. Section 5 opens with the mandatory interpretation sentence.
4. Every scorecard row cites at least one reference number; every level-3 score
   quotes assessment evidence.
5. REFERENCES section matches the canonical list (generated, byte-exact).
6. No v1 composite ("N/36"), no Irreplaceability score, anywhere.
7. The scorecard carries all eight item rows (C1–C5, W1–W3) and both subtotal
   rows, and states no combined "/${V4_PANEL_C_MAX}" Panel C figure as a headline score.
`
}

function recommendPrompt(): string {
  return `${banner('dfva/source/rubricV4.ts')}# DFVA-V4-RECOMMEND-PROMPT (instrument ${V4_VERSION})

You are writing the **improvement plan** for a program already scored on Panel
C v4. The plan derives every intervention from two inputs and nothing else:

1. The program's verified \`panelCv4\` block (scores, rationales, evidence
   lines, gates, ambiguities) from \`dfva/source/evidence/<code>.json\`.
2. The program's market intelligence report
   (\`reports/dfva-market-<code>.md\`) — job families, signals, skill shifts.

Write \`reports/dfva-v4-recommend-<code>.md\` following
\`dfva/dist/v4/recommend-template-v4.md\` EXACTLY. Non-negotiable rules:

- **Anchor-referenced actions.** An intervention targets a named item's NEXT
  anchor level, quoting the anchor text it would satisfy. Never recommend
  toward a capability the anchors do not describe.
- **Market-warranted.** Each intervention names the skill-shift row or signal
  from the market report that makes it worth doing. An action no market
  evidence supports does not appear.
- **Tabular.** Sections 1–6 carry their content in tables, not in prose
  paragraphs. Prose is limited to the mandatory sentence in §1, one or two
  framing sentences per section, and any note a table cannot hold.
- **Cited, with the citations collected.** Citation marks belong in a dedicated
  \`Sources\` column (or the table's last column), NOT scattered through
  sentences. Use the web-linked form \`[[n]](url)\` for URL-bearing sources and
  plain \`[n]\` otherwise. Full citations appear only in the REFERENCES section
  at the end of the file, never inline.
- **Interpretation is marked.** The diagnostic summary opens with the
  mandatory sentence — this document argues from evidence; it is not itself
  evidence.
- **No v1 composite ("N/36"), no Irreplaceability, anywhere.** Do not state a
  quadrant/position label if none is published for this program.
- **R2 discipline carries over:** an intervention that only edits outcome
  statements cannot claim to move a score — say so explicitly in §6.
- **R4 discipline carries over:** relabelling an existing task "authentic",
  "real-world" or "industry-relevant" moves nothing. A W2 step requires a change
  to the task, the artefact produced, or the criteria applied.
- **Both sub-scales get plans.** Adaptive (C1–C5) and workplace (W1–W3)
  interventions appear in the same tables, each row naming its sub-scale, with
  separate cumulative subtotals in §6. Never present a combined Panel C total.
- **W3 honesty rule:** never justify a placement intervention by employment
  rates — Jackson & Collings [28] found WIL does not raise them. Justify it by
  skill development, employment relevance or professional identity [29], and
  note the equity cost of unpaid or relocation-dependent placements [30].

## The instrument you are planning against

${renderV4RubricTable()}

Gates (regression checks during redesign — a change that breaks one is
flagged regardless of its adaptiveness effect):

${renderV4GatesTable()}

## REFERENCES

${renderV4References()}
`
}

function recommendTemplate(): string {
  return `${banner('dfva/source/rubricV4.ts')}# DFVA v4 Improvement Plan Template — Canonical Spec (instrument ${V4_VERSION})

Every \`reports/dfva-v4-recommend-<code>.md\` must follow this template.

## Header

\`\`\`markdown
# DFVA v4 IMPROVEMENT PLAN: <Program Name> (<CODE>)

**Instrument:** DFVA ${V4_VERSION} — Panel C v4 on the TEQSA adaptive capabilities [[1]](<teqsa url>)
**Assessment date:** <YYYY-MM-DD> · **Derived from:** the verified panelCv4 scoring + reports/dfva-market-<code>.md
**Position basis:** Destination AI Exposure <NN.NN> (measured) × Curriculum Adaptiveness <N>/${V4_ADAPTIVENESS_MAX} (v4.1 draft, sub-scale A) · Workplace practice <N>/${V4_WORKPLACE_MAX} (sub-scale W, reported beside the axis, not in it) — no v1 composite, no position label until the v4 migration cycle
\`\`\`

A note under the header states that citation marks refer to the numbered list in
References and that full citations are not repeated in the body.

## Sections (all required, in order) — each carries its content in a TABLE

1. **DIAGNOSTIC SUMMARY — Basis: inferred** — opens with the mandatory
   sentence: *"This plan argues from the scored evidence and market data
   above; it is interpretation, not observation."* Two short paragraphs, then:
   \`| Item | Sub-scale | Score | Levels below maximum | Market evidence for the gap | Priority |\`
   with an adaptive subtotal row and a workplace subtotal row — never a
   combined Panel C total.
2. **SCORE-TO-ACTION MAP — Basis: inferred** —
   \`| Item | Now → target | Anchor requirement at the target level (verbatim) | Curriculum action | Sources |\`
   One row per level step, including any second step on the same item.
3. **MARKET ALIGNMENT — Basis: reported → inferred** —
   \`| Lever | Item | Market evidence | Location in market report | Confidence |\`
   Confidence restated from the market report, not re-derived.
4. **PRIORITISED INTERVENTIONS — Basis: inferred** —
   \`| # | Item | Action | Anchor satisfied | Effort | Sequence | Sources |\`
   Levers numbered P1..Pn. Effort ∈ low/medium/high; Sequence is a term-level
   ordering with documentation-only fixes first.
5. **GATE GUARDRAILS — Basis: scored** —
   \`| Gate | Status | Evidence carrying the gate | Constraint on redesign | Sources |\`
6. **WHAT WOULD CHANGE THE SCORE — Basis: inferred** — two tables:
   \`| Lever | Item | From | To | Change | Cumulative adaptive | Cumulative workplace |\` and
   \`| Change | Why it does not move a score | Governing rule | Sources |\`
   The second must cover outcome-statement edits (rule R2), authenticity
   relabelling (rule R4), and electives where the anchor requires core placement.
7. **REFERENCES** — the canonical list, verbatim, ending the file.

## Lint rules (v4 recommend family in check-report-format.ts)

1. Title \`# DFVA v4 IMPROVEMENT PLAN:\`; header carries \`**Instrument:** DFVA ${V4_VERSION}\`.
2. Sections 1–6 present, in order, each with a \`Basis:\` tag; §1 opens with the mandatory sentence.
3. At least one web-linked citation mark \`[[n]](http...)\`.
4. REFERENCES matches the canonical generated list, byte-exact.
5. No v1 composite ("N/36"), no Irreplaceability score, anywhere.
6. Every section 1–6 contains at least one markdown table.

## REFERENCES (canonical)

\`\`\`markdown
${renderV4References()}
\`\`\`
`
}

const TS_BANNER = [
  '// GENERATED FILE — DO NOT EDIT.',
  '// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)',
  '// Regenerate: npm --prefix scripts run dfva:gen-v4',
  '',
].join('\n')

/** Client-side v4 rubric data (anchors, gates, references) for the report page. */
function appRubricModule(): string {
  const items = ALL_V4_ITEMS.map((d) => ({
    id: d.id,
    name: d.name,
    short: d.short,
    construct: d.construct,
    subscale: d.id.startsWith('W') ? 'workplace' : 'adaptive',
    refs: d.evidenceBase.map((k) => (V4_REFERENCES as Record<string, { n: number }>)[k].n),
    levels: d.levels,
  }))
  const gates = GATES_V4.map((g) => ({
    id: g.id,
    name: g.name,
    construct: g.construct,
    pass: g.pass,
    fail: g.fail,
  }))
  const references = Object.values(V4_REFERENCES)
    .sort((a, b) => a.n - b.n)
    .map((r) => ({ n: r.n, citation: r.citation, url: r.url ?? null }))
  return (
    TS_BANNER +
    `export const V4_INSTRUMENT = ${JSON.stringify(V4_VERSION)};\n\n` +
    `export const V4_ADAPTIVENESS_MAX = ${V4_ADAPTIVENESS_MAX};\nexport const V4_WORKPLACE_MAX = ${V4_WORKPLACE_MAX};\n\n` +
    'export type V4Subscale = "adaptive" | "workplace";\n\n' +
    'export interface V4RubricItem {\n  id: string;\n  name: string;\n  short: string;\n  construct: string;\n  subscale: V4Subscale;\n  refs: number[];\n  levels: [string, string, string, string];\n}\n\n' +
    'export interface V4RubricGate {\n  id: string;\n  name: string;\n  construct: string;\n  pass: string;\n  fail: string;\n}\n\n' +
    'export interface V4Reference {\n  n: number;\n  citation: string;\n  url: string | null;\n}\n\n' +
    `export const V4_RUBRIC: V4RubricItem[] = ${JSON.stringify(items, null, 2)};\n\n` +
    `export const V4_GATES: V4RubricGate[] = ${JSON.stringify(gates, null, 2)};\n\n` +
    `export const V4_REFERENCES: V4Reference[] = ${JSON.stringify(references, null, 2)};\n`
  )
}

/**
 * Per-program v4 Panel C results, collected from evidence files' panelCv4
 * blocks, plus the migration-cycle status.
 *
 * The adaptiveness median may only be published once EVERY program in the
 * reference cohort carries a v4 score. A median over a partial cohort is a
 * different statistic from the one it would be mistaken for, so until coverage
 * is complete `adaptMedian` is null and the report pages withhold the position
 * label. The exposure median is unchanged by v4 — Panel A is untouched — so it
 * is inherited rather than recomputed.
 */
async function appPanelCModule(): Promise<string> {
  const evidenceDir = path.join(repoRoot, 'dfva', 'source', 'evidence')
  const results: Record<string, { adaptiveness?: number; workplace?: number }> = {}
  for (const f of (await fs.readdir(evidenceDir)).sort()) {
    if (!f.endsWith('.json')) continue
    const data = JSON.parse(await fs.readFile(path.join(evidenceDir, f), 'utf8')) as {
      code?: string
      panelCv4?: { instrument?: string; adaptiveness?: number; workplace?: number }
    }
    if (!data.panelCv4 || !data.code) continue

    // Every score record must state which instrument produced it — the v4 §4
    // migration cycle compares scores across a version boundary, so an
    // unlabelled or mislabelled record corrupts the audit trail. The item set
    // pins the version FAMILY unambiguously (W1–W3 do not exist before 4.1),
    // but 4.1 and 4.2 share the 8-item set (4.2 only amended W3's anchor text),
    // so within the family the record's own label is trusted. An unlabelled or
    // out-of-family label falls back to the family's oldest member — the
    // conservative reading, since every unlabelled record predates 4.2.
    const family = PANEL_W_V4.every((w) => data.panelCv4![w.id as keyof typeof data.panelCv4])
      ? ['4.1-draft', '4.2-draft']
      : ['4.0-draft']
    const stated = data.panelCv4.instrument
    const instrument = stated && family.includes(stated) ? stated : family[0]
    if (stated && !family.includes(stated)) {
      console.warn(
        `  warn: ${f} declares instrument "${stated}" but its item set is the ${family[0]} family — using ${instrument}.`,
      )
    } else if (!stated) {
      console.warn(`  warn: ${f} states no instrument — derived ${instrument} from its item set.`)
    }
    results[data.code] = { ...data.panelCv4, instrument }
  }

  // The reference cohort is the basis for the median (v3.1 §10a rule 2: the
  // extension cohort is placed against the reference thresholds, never re-bases
  // them). Read it from the v3 dataset so the two can never disagree.
  const v3 = await fs.readFile(
    path.join(repoRoot, 'compass', 'app', 'src', 'compass', 'v3', 'data', 'v3Programs.ts'),
    'utf8',
  )
  const referenceCodes = [
    ...v3.matchAll(/"?code"?: "([a-z0-9-]+)",[\s\S]*?"?cohort"?: "reference"/g),
  ]
    .map((m) => m[1])
    .filter((c, i, a) => a.indexOf(c) === i)

  const scored = referenceCodes.filter((c) => typeof results[c]?.adaptiveness === 'number')
  const complete = scored.length === referenceCodes.length && referenceCodes.length > 0
  const values = scored
    .map((c) => results[c]!.adaptiveness as number)
    .sort((a, b) => a - b)
  const median = complete
    ? values.length % 2
      ? values[(values.length - 1) / 2]
      : (values[values.length / 2 - 1] + values[values.length / 2]) / 2
    : null

  // v4.1 added the W sub-scale, so a program scored under 4.0-draft is missing
  // W1–W3. Tracked separately: the workplace sub-score is only publishable once
  // every reference program has been re-scored on the full eight items.
  const workplaceScored = referenceCodes.filter((c) => typeof results[c]?.workplace === 'number')

  // Programs scored on v4 that have no Panel A record at all — not in the
  // reference or extension cohort, so no exposure, no alumni destinations, no
  // market report. They are a real category (an ad-hoc scoring request against a
  // program outside the assessed portfolio), and the report page must render
  // them with the missing half stated rather than showing "no assessment
  // exists". The display name comes from the report markdown's own title, or —
  // where no report is drafted yet — from the cohort manifest that admitted the
  // program. Both are in-repo records of the program's name; neither is a guess.
  const allV3Codes = new Set([...v3.matchAll(/"?code"?: "([a-z0-9-]+)"/g)].map((m) => m[1]))
  const cohortNames = await loadCohortNames()
  const xw = loadCrosswalk()
  const v4Only: Record<
    string,
    { code: string; name: string; hasMarketReport: boolean; exposure: number | null; entryExposure: number | null; jirN: number | null; nTitles: number | null; nMedium: number | null }
  > = {}
  for (const code of Object.keys(results)) {
    if (allV3Codes.has(code)) continue
    const reportPath = path.join(repoRoot, 'reports', `dfva-v4-${code}.md`)
    // Precedence: the report title, then the cohort manifest, then the code.
    // The code is a last resort and not a name — it is the string the page would
    // show if nothing in the repo knows what the program is called, and it also
    // matches no JIR record, so it suppresses Panel A as a side effect. Reaching
    // for the manifest first keeps that fallback for genuinely unknown programs.
    let name = cohortNames.get(code) ?? code.toUpperCase()
    try {
      const first = (await fs.readFile(reportPath, 'utf8')).split('\n')[0]
      const m = first.match(/^#\s*DFVA v4 DURABILITY REPORT:\s*(.+?)\s*\([^()]*\)\s*$/)
      if (m) name = m[1]
    } catch {
      // No report drafted yet: the manifest name (or the code) already stands.
    }
    // The program's name is also the JIR record key. No match means no alumni
    // record — a real state, carried as nulls.
    const a = panelAFor(name, xw)
    // Whether Part B has anything to show is a fact about the filesystem, not
    // about registry membership — the page used the latter and so kept claiming
    // "no market evidence" beside a rendered market card.
    const hasMarketReport = existsSync(path.join(repoRoot, 'reports', `dfva-market-${code}.md`))
    v4Only[code] = {
      code,
      name,
      hasMarketReport,
      exposure: a?.exposure ?? null,
      entryExposure: a?.entryExposure ?? null,
      jirN: a?.jirN ?? null,
      nTitles: a?.nTitles ?? null,
      nMedium: a?.nMedium ?? null,
    }
    console.log(
      a
        ? `v4-only ${code}: exposure ${a.exposure} (n=${a.jirN}, ${a.nTitles} titles, ${a.nMedium} medium-confidence)`
        : `v4-only ${code}: no JIR record for "${name}" — Panel C only`,
    )
  }

  const meta = {
    cohortSize: referenceCodes.length,
    scored: scored.length,
    workplaceScored: workplaceScored.length,
    workplaceComplete:
      workplaceScored.length === referenceCodes.length && referenceCodes.length > 0,
    complete,
    adaptMedian: median,
    // Panel A is unchanged by v4; the exposure threshold is inherited as-is.
    expMedian: 90.9,
    pending: referenceCodes.filter((c) => typeof results[c]?.adaptiveness !== 'number'),
  }

  return (
    TS_BANNER +
    '/** Present when adversarial verification moved a score. Recorded rather than\n' +
    ' *  overwritten: which anchor clause failed on scrutiny is response-process\n' +
    ' *  evidence, and the IRR study reads it. */\n' +
    'export interface V4Adjudication {\n  originalScore: number;\n  demotedTo?: number;\n  promotedTo?: number;\n  reason: string;\n}\n\n' +
    'export interface V4ItemResult {\n  score: number;\n  rationale: string;\n  evidenceLines: string[];\n  adjudication?: V4Adjudication;\n}\n\n' +
    'export interface V4GateResult {\n  result: "PASS" | "FAIL";\n  rationale: string;\n  evidenceLines: string[];\n}\n\n' +
    '/** W1–W3 and `workplace` are optional: programs scored before v4.1 carry\n' +
    ' *  only the adaptive sub-scale and must be re-scored, not back-filled. */\n' +
    'export interface V4PanelC {\n  instrument: string;\n  C1: V4ItemResult;\n  C2: V4ItemResult;\n  C3: V4ItemResult;\n  C4: V4ItemResult;\n  C5: V4ItemResult;\n  adaptiveness: number;\n  W1?: V4ItemResult;\n  W2?: V4ItemResult;\n  W3?: V4ItemResult;\n  workplace?: number;\n  gates: { G1: V4GateResult; G2: V4GateResult };\n  ambiguities: string[];\n  notScoreable: string[];\n  verified?: { adversarial: boolean; mechanical: boolean; date: string };\n}\n\n' +
    '/** Migration-cycle status. `adaptMedian` is null until every reference-cohort\n' +
    ' *  program is scored on v4; position labels stay withheld while it is null. */\n' +
    'export interface V4Meta {\n  cohortSize: number;\n  scored: number;\n  workplaceScored: number;\n  workplaceComplete: boolean;\n  complete: boolean;\n  adaptMedian: number | null;\n  expMedian: number;\n  pending: string[];\n}\n\n' +
    `export const V4_META: V4Meta = ${JSON.stringify(meta, null, 2)};\n\n` +
    '/** A program scored on v4 that is not in the v3 registry.\n' +
    ' *\n' +
    ' *  Exposure is instrument-independent, so where the program has its own JIR\n' +
    ' *  alumni record it is computed here by the identical Panel A procedure and\n' +
    ' *  is a measured value, comparable with every other program. Where it has no\n' +
    ' *  such record the fields are null and the page states the absence rather\n' +
    ' *  than estimating it. Either way no POSITION is assigned: that needs a v4\n' +
    ' *  adaptiveness median, which the migration cycle has not yet produced. */\n' +
    'export interface V4OnlyProgram {\n  code: string;\n  name: string;\n  hasMarketReport: boolean;\n  exposure: number | null;\n  entryExposure: number | null;\n  jirN: number | null;\n  nTitles: number | null;\n  nMedium: number | null;\n}\n\n' +
    `export const V4_ONLY_PROGRAMS: Record<string, V4OnlyProgram> = ${JSON.stringify(v4Only, null, 2)};\n\n` +
    'export const v4OnlyProgramByCode = (code: string): V4OnlyProgram | undefined =>\n  V4_ONLY_PROGRAMS[code.toLowerCase()];\n\n' +
    `export const V4_PANEL_C: Record<string, V4PanelC> = ${JSON.stringify(results, null, 2)};\n\n` +
    'export const v4PanelCByCode = (code: string): V4PanelC | undefined =>\n  V4_PANEL_C[code.toLowerCase()];\n'
  )
}

async function main(): Promise<void> {
  const out = new Map<string, string>([
    ['dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md', scoringPrompt()],
    ['dfva/dist/v4/DFVA-V4-RECOMMEND-PROMPT.md', recommendPrompt()],
    ['dfva/dist/v4/report-template-v4.md', reportTemplate()],
    ['dfva/dist/v4/recommend-template-v4.md', recommendTemplate()],
    ['compass/app/src/compass/v4/data/v4Rubric.ts', appRubricModule()],
    ['compass/app/src/compass/v4/data/v4PanelC.ts', await appPanelCModule()],
  ])
  for (const [rel, content] of out) {
    const abs = path.join(repoRoot, rel)
    await fs.mkdir(path.dirname(abs), { recursive: true })
    await fs.writeFile(abs, content, 'utf8')
    console.log('wrote', rel)
  }
  console.log(`\n${out.size} file(s) generated from dfva/source/rubricV4.ts.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
