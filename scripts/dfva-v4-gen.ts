/**
 * DFVA v4 generator. Renders the Panel C v4 agent scoring prompt and the v4
 * report template from the canonical instrument in dfva/source/rubricV4.ts.
 * Run: npm --prefix scripts run dfva:gen-v4
 */
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import {
  GATES_V4,
  PANEL_C_V4,
  V4_REFERENCES,
  refMarks,
  V4_ADAPTIVENESS_MAX,
  V4_DESIGN_RULES,
  V4_RETIRED,
  V4_VERSION,
  renderV4GatesTable,
  renderV4ItemBlocks,
  renderV4References,
  renderV4RubricTable,
} from '../dfva/source/rubricV4'

const repoRoot = path.resolve(__dirname, '..')

const banner = (source: string): string =>
  [
    '<!-- GENERATED FILE — DO NOT EDIT.',
    `     Source: ${source} · Generator: scripts/dfva-v4-gen.ts`,
    '     Regenerate: npm --prefix scripts run dfva:gen-v4 -->',
    '',
  ].join('\n')

function scoringPrompt(): string {
  return `${banner('dfva/source/rubricV4.ts')}# DFVA-V4-SCORING-PROMPT (instrument ${V4_VERSION})

You are scoring one university program's **Curriculum Adaptiveness (Panel C v4)**
from its public handbook evidence. The instrument implements the four adaptive
capabilities defined by TEQSA (Lodge et al., 2026) [1]; the full derivation is
docs/dfva-panelc-v4-recommendation.md and docs/dfva-adaptiveness-literature-review.md.

## Inputs you will be given

1. The program's handbook extract (course page + core-unit pages), scraped via
   Crawl4AI. Score ONLY from this text.
2. The program code and name.

## Non-negotiable scoring rules

- **R1 — ${V4_DESIGN_RULES.R1}**
- **R2 — ${V4_DESIGN_RULES.R2}**
- **R3 — ${V4_DESIGN_RULES.R3}**
- Scoring direction: when the evidence is ambiguous between two levels, take the
  LOWER level and record the ambiguity in the rationale. Never resolve ambiguity
  upward.
- A level-3 score additionally requires quoting the assessment evidence
  (assessment task, hurdle, placement requirement) — an outcome statement is
  never sufficient (R2).
- Do NOT compute exposure, position, quadrant, or stability — those come from
  Panel A and the enumeration layer downstream. Your output is the five item
  scores, two gates, and evidence.
- ${V4_RETIRED.B} Never emit an irreplaceability score.

## The five scored items (0–3 each; adaptiveness = sum, /${V4_ADAPTIVENESS_MAX})

${renderV4ItemBlocks()}

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
× Curriculum Adaptiveness <N>/${V4_ADAPTIVENESS_MAX} (scored on Panel C v4 [1]).
Position label only if stable per the v3.1 §5.2 rules; state modal probability
and stability class. Never render an unstable label.

### 2. PANEL C v4 SCORECARD — Basis: scored

A table of the five items. Every row cites its literature anchor by reference
number and its handbook evidence:

\`\`\`markdown
| Item | Score | Rationale (anchor-referenced) |
| --- | --- | --- |
${PANEL_C_V4.map((d) => `| ${d.id} ${d.name} ${refMarks(d.evidenceBase)} | <0–3> | <rationale citing the anchor met and the handbook evidence> |`).join('\n')}
| **Adaptiveness** | **<N> / ${V4_ADAPTIVENESS_MAX}** | |
\`\`\`

Followed by one evidence paragraph per item quoting the decisive handbook
line(s). A level-3 claim must quote assessment evidence (R2).

### 3. GATES — Basis: scored

${GATES_V4.map((g) => `- **${g.id} ${g.name}:** <PASS|FAIL> — <one-line evidence>`).join('\n')}

A G1 FAIL is flagged prominently regardless of the adaptiveness score.

### 4. MARKET EVIDENCE — Basis: reported

The Part B run endorsed in the August 2026 review, unchanged in structure:
JOB FAMILY MAP · RECENT JOB AD SIGNALS · CURRENT DISCUSSION SIGNALS ·
SKILL SHIFT SUMMARY. Confidence stated per subsection. No scoring language.

### 5. CURRICULUM IMPLICATIONS — Basis: inferred

Opens with the mandatory sentence: *"This section argues from the evidence
above; it is interpretation, not observation."* Implications are keyed to
C-items (e.g. "C2 at 1/3 → …") and phrased as options with trade-offs, not
directives.

### 6. EVIDENCE CONFIDENCE & LIMITATIONS — Basis: reported

Panel D metadata (JIR match tier, n, coverage), the crosswalk vintage note,
plus the v4 standing limitations verbatim:

- Scores describe **documented curriculum intent**, not demonstrated graduate
  capability; the extrapolation warrant is constructive alignment, stated as an
  assumption (Kane [17]).
- Indigenous data governance is not scored as a distinct construct; C3 level 3
  counts it where taught (CARE Principles; Lodge et al. 2025 Principle 4 [2]).
- Perception/manipulation (Frey & Osborne's third bottleneck [7]) is unscored.

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
  const items = PANEL_C_V4.map((d) => ({
    id: d.id,
    name: d.name,
    short: d.short,
    construct: d.construct,
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
    'export interface V4RubricItem {\n  id: string;\n  name: string;\n  short: string;\n  construct: string;\n  refs: number[];\n  levels: [string, string, string, string];\n}\n\n' +
    'export interface V4RubricGate {\n  id: string;\n  name: string;\n  construct: string;\n  pass: string;\n  fail: string;\n}\n\n' +
    'export interface V4Reference {\n  n: number;\n  citation: string;\n  url: string | null;\n}\n\n' +
    `export const V4_RUBRIC: V4RubricItem[] = ${JSON.stringify(items, null, 2)};\n\n` +
    `export const V4_GATES: V4RubricGate[] = ${JSON.stringify(gates, null, 2)};\n\n` +
    `export const V4_REFERENCES: V4Reference[] = ${JSON.stringify(references, null, 2)};\n`
  )
}

/** Per-program v4 Panel C results, collected from evidence files' panelCv4 blocks. */
async function appPanelCModule(): Promise<string> {
  const evidenceDir = path.join(repoRoot, 'dfva', 'source', 'evidence')
  const results: Record<string, unknown> = {}
  for (const f of (await fs.readdir(evidenceDir)).sort()) {
    if (!f.endsWith('.json')) continue
    const data = JSON.parse(await fs.readFile(path.join(evidenceDir, f), 'utf8')) as {
      code?: string
      panelCv4?: unknown
    }
    if (data.panelCv4 && data.code) results[data.code] = data.panelCv4
  }
  return (
    TS_BANNER +
    'export interface V4ItemResult {\n  score: number;\n  rationale: string;\n  evidenceLines: string[];\n}\n\n' +
    'export interface V4GateResult {\n  result: "PASS" | "FAIL";\n  rationale: string;\n  evidenceLines: string[];\n}\n\n' +
    'export interface V4PanelC {\n  instrument: string;\n  C1: V4ItemResult;\n  C2: V4ItemResult;\n  C3: V4ItemResult;\n  C4: V4ItemResult;\n  C5: V4ItemResult;\n  adaptiveness: number;\n  gates: { G1: V4GateResult; G2: V4GateResult };\n  ambiguities: string[];\n  notScoreable: string[];\n  verified?: { adversarial: boolean; mechanical: boolean; date: string };\n}\n\n' +
    `export const V4_PANEL_C: Record<string, V4PanelC> = ${JSON.stringify(results, null, 2)};\n\n` +
    'export const v4PanelCByCode = (code: string): V4PanelC | undefined =>\n  V4_PANEL_C[code.toLowerCase()];\n'
  )
}

async function main(): Promise<void> {
  const out = new Map<string, string>([
    ['dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md', scoringPrompt()],
    ['dfva/dist/v4/report-template-v4.md', reportTemplate()],
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
