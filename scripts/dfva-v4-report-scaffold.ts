/**
 * Scaffold a `reports/dfva-v4-<code>.md` from the verified evidence block.
 *
 * Stage 5 of the v4 harness (docs/dfva-v4-agent-harness.md) says Panel A
 * figures come from the generators, never from an authoring agent, and the
 * lint at the foot of `report-template-v4.md` binds the header, the six
 * sections, the scorecard reference marks and a byte-exact REFERENCES list.
 * All of that is derivable, so it is derived here — the author writes only
 * §4 (market evidence) and §5 (implications), which are judgement.
 *
 *   npx tsx dfva-v4-report-scaffold.ts <code> [<code> …]       # seeded scaffold
 *   npx tsx dfva-v4-report-scaffold.ts <code> --fill-template   # JSON skeleton for the author
 *   npx tsx dfva-v4-report-scaffold.ts <code> --fill <json>     # render with the author's cells
 *
 * §4 is seeded from reports/dfva-market-<code>.md (job-family table, the
 * exposure-basis sentence, the signal table, the restated confidence); only
 * its Bearing column and §5's Implication/Cost cells are the author's, and
 * they arrive as a fill JSON, not as edits to this file's output. A missing
 * cell renders as TO BE AUTHORED and `dfva:report-lint` fails while any
 * marker survives, so an unauthored report cannot reach the site.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { extractDirector, renderDirector } from './dfva-v4-director'
import {
  ALL_V4_ITEMS,
  GATES_V4,
  PANEL_C_V4,
  PANEL_W_V4,
  V4_VERSION,
  mdCite,
  mdCiteByN,
} from '../dfva/source/rubricV4'
import { V4_META } from '../compass/app/src/compass/v4/data/v4Meta'
import {
  V4_ONLY_PROGRAMS,
  V4_PANEL_A_BASIS,
  type V4PanelABasis,
} from '../compass/app/src/compass/v4/data/v4PanelC'
import { V3_PROGRAMS } from '../compass/app/src/compass/v3/data/v3Programs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const AUTHOR_MARK = 'TO BE AUTHORED'

// ── Panel A ────────────────────────────────────────────────────────────────

/** Median a value is placed against — field-grain values use the field median. */
const basisMedian = (b: V4PanelABasis | undefined): number =>
  b?.tier === 'field' ? V4_META.expMedianField : V4_META.expMedian

/** The page's quadrant rule (compass/app/src/compass/v4/v4Position.ts). */
function quadrant(exposure: number, adaptiveness: number, b: V4PanelABasis | undefined) {
  if (!V4_META.complete || V4_META.adaptMedian === null) return null
  const highExp = exposure > basisMedian(b)
  const highAdapt = adaptiveness >= V4_META.adaptMedian
  if (highExp) return highAdapt ? 'High exposure · high adaptiveness' : 'High exposure · low adaptiveness'
  return highAdapt ? 'Low exposure · high adaptiveness' : 'Low exposure · low adaptiveness'
}

/** describeBasis(), kept word-for-word in step with the page's version. */
function describeBasis(b: V4PanelABasis | undefined, jirN: number | null, nTitles: number | null): string {
  if (!b) return 'no basis recorded'
  const counts = [jirN !== null ? `n = ${jirN}` : null, nTitles !== null ? `${nTitles} titles` : null]
    .filter(Boolean)
    .join(', ')
  const names = b.sources.map((s) => s.name).join(' ∪ ')
  switch (b.tier) {
    case 'exact':
      return `measured on the program's own alumni destination record (${counts})`
    case 'variant':
      return `measured on the parent program's alumni record — ${names} (${counts})`
    case 'pooled':
      return `union of the program family's ${b.sources.length} alumni records — ${names} (${counts})`
    case 'combined':
      return `union of both components' alumni records — ${names} (${counts})`
    case 'cognate':
    case 'partial':
      return `borrowed from a related program's alumni record — ${names} (${counts}); an estimate, not this program's own graduates`
    case 'field':
      return `field-of-education occupation list, Jobs and Skills Australia Higher Education Outcomes — ${names}; graduates of the whole field, not this program`
  }
}

const TIER_LABEL: Record<string, string> = {
  exact: 'measured',
  variant: 'measured · parent record',
  pooled: 'program family',
  combined: 'both components',
  cognate: 'cognate program',
  partial: 'related program',
  field: 'field grain',
}

/** True where the value stands on graduates who are not this program's own. */
const isEstimate = (b: V4PanelABasis | undefined): boolean =>
  b !== undefined && (b.tier === 'cognate' || b.tier === 'partial' || b.tier === 'field')

// ── Sources ────────────────────────────────────────────────────────────────

interface Capture {
  urls: string[]
  courseUrl: string | null
  pages: number
  director: string
  vintage: string
}

/** Read the handbook capture: which pages were read, and the course director. */
function readCapture(code: string): Capture {
  const p = path.join(repoRoot, 'scrapes', 'v4', `${code}.txt`)
  const text = existsSync(p) ? readFileSync(p, 'utf8') : ''
  const urls = [...text.matchAll(/^===== SOURCE: (\S+) =====$/gm)].map((m) => m[1])
  const courseUrl = urls.find((u) => /\/courses\//.test(u)) ?? urls[0] ?? null
  // Rendered header value: the course page's named person(s), or the absent wording.
  const director = renderDirector(extractDirector(text, code))
  const vm = courseUrl?.match(/handbook\.unimelb\.edu\.au\/(\d{4})\//)
  return { urls, courseUrl, pages: urls.length, director, vintage: vm ? vm[1] : '2026' }
}

/** The canonical REFERENCES list, lifted byte-exact from the generated template. */
function canonicalReferences(): string {
  const tmpl = readFileSync(path.join(repoRoot, 'dfva', 'dist', 'v4', 'report-template-v4.md'), 'utf8')
  const block = (tmpl.split(/^### REFERENCES$/m)[1] ?? '').split('```')[1] ?? ''
  const lines = block.split('\n').filter((l) => /^\d+\. /.test(l))
  if (!lines.length) throw new Error('scaffold: cannot read the canonical REFERENCES list')
  return lines.join('\n')
}

// ── Market report (input to §4) ────────────────────────────────────────────

/** The author's cells for §4 Table 2 and §5. A missing key renders as TO BE AUTHORED. */
export interface ReportFill {
  /** §4 Table 1 rows, used when the market report's §1 carries no table to seed from
   *  (legacy reports write §1 as prose). Ignored when the market report seeds rows. */
  jobFamilies?: Array<{ family: string; titles: string; pressure: string; skills: string }>
  /** §4 Table 2 "Bearing on the scored items", keyed by the signal text as seeded. */
  bearing?: Record<string, string>
  /** §5 Implication and Cost, keyed by item id (C1 … W3). */
  implications?: Record<string, { implication?: string; cost?: string }>
}

export interface MarketRead {
  jobFamilies: Array<{ family: string; titles: string; pressure: string; skills: string }>
  confidence: string | null
  skillShifts: Array<{ skill: string; direction: string }>
  gaps: Array<{ area: string; confidence: string; caveat: string }>
}

const NOT_STATED = 'not stated in the market report'

/** Split a markdown table row into trimmed cells. */
const cellsOf = (line: string): string[] =>
  line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim())

/** The first table under a "## N. HEADING" section: header cells and body rows. */
function tableUnder(content: string, heading: RegExp): { header: string[]; rows: string[][] } | null {
  const section = content.split(heading)[1]
  if (!section) return null
  const body = section.split(/^## /m)[0]
  const lines = body.split('\n')
  const at = lines.findIndex((l) => l.trim().startsWith('|'))
  if (at < 0) return null
  const header = cellsOf(lines[at])
  const rows: string[][] = []
  for (let i = at + 2; i < lines.length && lines[i].trim().startsWith('|'); i++) rows.push(cellsOf(lines[i]))
  return { header, rows }
}

/** Index of the first header cell matching `re`, or -1. */
const col = (header: string[], re: RegExp): number => header.findIndex((h) => re.test(h))
const pick = (row: string[], i: number): string => (i >= 0 && row[i] && !/^(?:—|-|)$/.test(row[i].trim()) ? row[i] : NOT_STATED)

/**
 * Read what §4 copies from reports/dfva-market-<code>.md. Column matching is
 * by header text because legacy market reports carry a six-column §1 while
 * the scaffolded ones carry the canonical four.
 */
export function readMarket(content: string): MarketRead {
  const s1 = tableUnder(content, /^## 1\. JOB FAMILY MAP.*$/m)
  const jobFamilies = (s1?.rows ?? []).map((r) => ({
    family: pick(r, col(s1!.header, /job family/i)),
    titles: pick(r, col(s1!.header, /entry titles/i)),
    pressure: pick(r, col(s1!.header, /substitution/i)),
    skills: pick(r, col(s1!.header, /skills (?:rising|increasing)/i)),
  }))
  const confidence = content.match(/CURRENT DISCUSSION SIGNALS — (HIGH|MEDIUM|LOW) CONFIDENCE/)?.[1] ?? null
  const s4 = tableUnder(content, /^## 4\. SKILL SHIFT SUMMARY.*$/m)
  const skillShifts = (s4?.rows ?? []).map((r) => ({
    skill: pick(r, col(s4!.header, /skill/i)),
    direction: pick(r, col(s4!.header, /direction/i)),
  }))
  const s6 = tableUnder(content, /^## 6\. EVIDENCE CONFIDENCE.*$/m)
  const gaps = (s6?.rows ?? []).map((r) => ({
    area: pick(r, col(s6!.header, /signal|area/i)),
    confidence: pick(r, col(s6!.header, /confidence/i)),
    caveat: pick(r, col(s6!.header, /gap|caveat/i)),
  }))
  return { jobFamilies, confidence, skillShifts, gaps }
}

/** The house phrasing for what the §1 exposure number is (docs/dfva-report-section-authoring.md). */
export function exposureBasisSentence(
  b: V4PanelABasis | undefined,
  exposure: number,
  median: number,
  nTitles: number | null,
  nMedium: number | null,
): string {
  const names = b?.sources?.map((s) => s.name).join(' ∪ ') ?? 'no recorded source'
  const n = b?.sources?.reduce((t, s) => t + ((s as { n?: number }).n ?? 0), 0) ?? 0
  const counts = [n ? `n = ${n}` : null, nTitles !== null ? `${nTitles} titles` : null].filter(Boolean).join(', ')
  let basisClause: string
  switch (b?.tier) {
    case 'cognate':
    case 'partial':
      basisClause = `**Borrowed** from ${names}${counts ? ` (${counts})` : ''} — an estimate for a related population, not a measurement of this cohort.`
      break
    case 'field':
      basisClause = `Rests on a **field-of-education** basis (${names}) — graduates of the whole field, not this program.`
      break
    case undefined:
      basisClause = 'No basis is recorded.'
      break
    default:
      basisClause = `This program's own graduates${counts ? ` (${counts})` : ''}${b.tier === 'exact' ? '' : ` — ${names}`}.`
  }
  const caveat = nMedium !== null && nTitles !== null && nMedium > 0 ? ` ${nMedium} of ${nTitles} titles carry only medium mapping confidence.` : ''
  const which = b?.tier === 'field' ? 'field' : 'portfolio'
  return `**What the §1 exposure value is.** ${exposure.toFixed(2)}. ${basisClause}${caveat} It sits **${exposure > median ? 'above' : 'at or below'}** the ${which} median of ${median}.`
}

// ── Rendering ──────────────────────────────────────────────────────────────

const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()

/** Quote an evidence line as the handbook printed it. */
const quote = (l: string) => `> ${esc(l)}`

function scorecardRows(pc: Record<string, any>): string {
  const row = (item: (typeof ALL_V4_ITEMS)[number]) =>
    `| ${item.id} ${item.name} ${mdCite(item.evidenceBase)} | ${pc[item.id].score} | ${esc(pc[item.id].rationale)} |`
  return [
    ...PANEL_C_V4.map(row),
    `| **Adaptive capabilities** | **${pc.adaptiveness} / 15** | |`,
    ...PANEL_W_V4.map(row),
    `| **Workplace practice** | **${pc.workplace} / 9** | |`,
  ].join('\n')
}

/**
 * One paragraph per item quoting the decisive handbook line(s). The rationale
 * is already in the scorecard row above, so this section carries the evidence
 * itself and nothing else — a level-3 claim has to be readable against its own
 * quoted assessment evidence (R2/R3).
 */
function evidenceParagraphs(pc: Record<string, any>): string {
  return ALL_V4_ITEMS.map((item) => {
    const rec = pc[item.id]
    const lines: string[] = rec.evidenceLines ?? []
    const head = `**${item.id} ${item.name} — ${rec.score}/3**`
    if (!lines.length) {
      return `${head}\n\nNo handbook line is quoted: the score rests on the documented *absence* of the anchor's evidence across the captured pages.`
    }
    return `${head}\n\n${lines.map(quote).join('\n>\n')}`
  }).join('\n\n')
}

function gatesBlock(pc: Record<string, any>): string {
  return GATES_V4.map((g) => {
    const rec = pc.gates?.[g.id]
    if (!rec) return `- **${g.id} ${g.name}:** not recorded`
    return `- **${g.id} ${g.name}:** ${rec.result} — ${esc(rec.rationale)}`
  }).join('\n')
}

const NO_COST = 'None — no intervention proposed and none needed.'
const fillCell = (v: string | undefined): string => (v && v.trim() ? esc(v) : AUTHOR_MARK)

/** §5's table is ordered by headroom — the gap to the item's ceiling. A row at
 *  the instrument maximum takes the fixed Cost string when the fill leaves it empty. */
function implicationRows(pc: Record<string, any>, fill: ReportFill): string {
  return [...ALL_V4_ITEMS]
    .map((item) => ({ item, score: pc[item.id].score as number }))
    .sort((a, b) => a.score - b.score || a.item.id.localeCompare(b.item.id))
    .map(({ item, score }) => {
      const f = fill.implications?.[item.id]
      const cost = score === 3 && !f?.cost?.trim() ? NO_COST : fillCell(f?.cost)
      return `| ${item.id} ${item.name} | ${score}/3 | ${fillCell(f?.implication)} | ${cost} | ${mdCite(item.evidenceBase)} |`
    })
    .join('\n')
}

/** §4, seeded from the market report; only the Bearing column is the author's. */
function marketEvidenceSection(code: string, fill: ReportFill, basisSentence: string): string {
  const p = path.join(repoRoot, 'reports', `dfva-market-${code}.md`)
  if (!existsSync(p)) {
    return `## 4. MARKET EVIDENCE — Basis: reported

<!-- AUTHOR:S4 — reports/dfva-market-${code}.md does not exist yet. Write it first
     (scripts/dfva-market-scaffold.py ${code}), then re-run this scaffold. -->
${AUTHOR_MARK}`
  }
  const m = readMarket(readFileSync(p, 'utf8'))
  const families = m.jobFamilies.length ? m.jobFamilies : (fill.jobFamilies ?? [])
  const t1 = families.length
    ? families.map((f) => `| ${fillCell(f.family)} | ${fillCell(f.titles)} | ${fillCell(f.pressure)} | ${fillCell(f.skills)} |`).join('\n')
    : `| ${AUTHOR_MARK} | ${AUTHOR_MARK} | ${AUTHOR_MARK} | ${AUTHOR_MARK} |`
  const t2 = m.skillShifts.length
    ? m.skillShifts.map((s) => `| ${esc(s.skill)} | ${esc(s.direction)} | ${fillCell(fill.bearing?.[s.skill])} |`).join('\n')
    : `| ${AUTHOR_MARK} | ${AUTHOR_MARK} | ${AUTHOR_MARK} |`
  const gaps = m.gaps.length
    ? ` Its declared gaps: ${m.gaps.map((g) => `${esc(g.area)} (${esc(g.confidence)} — ${esc(g.caveat)})`).join('; ')}.`
    : ''
  return `## 4. MARKET EVIDENCE — Basis: reported

The tables condense [the market report](dfva-market-${code}.md); they report what the market says and do not argue a score.

| Job family | Entry titles | AI substitution pressure | Skills rising in that family |
| --- | --- | --- | --- |
${t1}

${basisSentence}

| Signal or shift | Direction | Bearing on the scored items |
| --- | --- | --- |
${t2}

**Confidence, restated from the market report.** Its discussion signals are stated at ${m.confidence ? `${m.confidence} confidence` : 'a confidence level the report does not state in its §3 heading'}.${gaps}`
}

const STANDING_LIMITATIONS = `- Scores describe **documented curriculum intent**, not demonstrated graduate
  capability; the extrapolation warrant is constructive alignment, stated as an
  assumption (Kane ${mdCiteByN([17])}).
- Indigenous data governance is not scored as a distinct construct; C3 level 3
  counts it where taught (CARE Principles; Lodge et al. 2025 Principle 4 ${mdCiteByN([2])}).
- Perception/manipulation (Frey & Osborne's third bottleneck ${mdCiteByN([7])}) is unscored.
- A high W3 score describes curriculum design, not student welfare: required
  placements can disadvantage students who cannot afford unpaid work or
  relocation (Accord ${mdCiteByN([30])}; Fawns et al. ${mdCiteByN([24])} on ableism and elitism).
- W2 is scored against each discipline's own criterion situation ${mdCiteByN([22])}, so
  cross-disciplinary W2 comparison is weaker than within-discipline comparison.
- W3 excludes simulation by design (simulation scores in W2), so programs whose
  professional norm is high-fidelity simulation may score low on W3 for a
  defensible pedagogic choice. Read the two sub-scores together.
- The authentic-assessment employability evidence rests largely on student
  self-report ${mdCiteByN([25])}; W2's warrant is documented design fidelity plus the
  assessment-drives-learning mechanism ${mdCiteByN([26])}, not demonstrated employment effects.
- Work-integrated learning is NOT claimed to raise employment rates — Jackson &
  Collings ${mdCiteByN([28])} found it does not. W3's warrant is skill development, employment
  relevance and professional identity formation ${mdCiteByN([29])}.`

// ── Main ───────────────────────────────────────────────────────────────────

function scaffold(code: string, fill: ReportFill = {}): string {
  const evPath = path.join(repoRoot, 'dfva', 'source', 'evidence', `${code}.json`)
  const ev = JSON.parse(readFileSync(evPath, 'utf8'))
  const pc = ev.panelCv4
  if (!pc) throw new Error(`${code}: no panelCv4 block`)
  if (pc.instrument !== V4_VERSION) {
    throw new Error(`${code}: instrument "${pc.instrument}" ≠ ${V4_VERSION} — re-score before drafting`)
  }

  const only = V4_ONLY_PROGRAMS[code]
  const v3 = (V3_PROGRAMS as any[]).find((p) => p.code?.toLowerCase() === code)
  const basis = V4_PANEL_A_BASIS[code]
  const name: string = only?.name ?? v3?.name ?? code.toUpperCase()
  const exposure: number | null = v3?.exposure ?? only?.exposure ?? null
  if (exposure === null) throw new Error(`${code}: no exposure — fix the basis, not the report`)
  const jirN = only?.jirN ?? basis?.sources?.reduce((t: number, s: any) => t + (s.n ?? 0), 0) ?? null
  const nTitles = only?.nTitles ?? null
  const nMedium = only?.nMedium ?? null

  const cap = readCapture(code)
  const median = basisMedian(basis)
  const pos = quadrant(exposure, pc.adaptiveness, basis)
  const heading = `v${V4_VERSION.replace(/-draft$/, '')}`
  const inCohort = v3 !== undefined

  const sourceLine = cap.courseUrl
    ? `${cap.courseUrl} (course, attributes, structure) plus the overview and assessment pages of the compulsory subjects — ${cap.pages} pages captured`
    : 'handbook capture not recorded'

  const parts: string[] = []

  parts.push(`# DFVA v4 DURABILITY REPORT: ${name} (${code.toUpperCase()})

**Instrument:** DFVA ${V4_VERSION} — Panel C ${heading} on the TEQSA adaptive capabilities ${mdCiteByN([1])} and the HESF generic and employment-related learning outcomes ${mdCiteByN([19])}
**Assessment date:** ${pc.verified?.date ?? 'unrecorded'}
**Handbook vintage:** ${cap.vintage} · **Source URL(s):** ${sourceLine}
**Course Director:** ${cap.director}

> **Draft-instrument notice.** Panel C ${heading} is a working-draft instrument
> ([v4 recommendation §7](../docs/dfva-panelc-v4-recommendation.md), 2026-08-13;
> [v4.1 recommendation](../docs/dfva-panelc-v41-recommendation.md), 2026-08-14;
> [v4.2 amendment](../docs/dfva-rubric-evolution.md), 2026-08-16).
> Neither sub-score is comparable with any v3.1 value.`)

  if (!inCohort) {
    parts.push(`> **This program is outside the v3.1 registry, but not outside Panel A.** ${name}
> has never been assessed on v3.1, so it has no adaptiveness score on the published
> instrument. Exposure does not depend on the scoring instrument, so §1 reports a value
> computed by the identical Panel A procedure, on the basis stated there.`)
  }

  if (isEstimate(basis)) {
    parts.push(`> **The exposure value is an estimate, not this program's own graduates.** It rests on
> a ${TIER_LABEL[basis!.tier]} basis (${basis!.sources.map((s) => s.name).join(' ∪ ')}). What such a
> value may and may not be used for is set out in
> [the estimated-basis methods note](../docs/dfva-panela-estimated-basis-methods.md).`)
  }

  // ── 1 ──
  parts.push(`## 1. POSITION — Basis: measured × scored

**Destination AI Exposure: ${exposure.toFixed(2)}.** Destination titles are mapped to the published Felten AI Occupational Exposure (AIOE) index and rescaled 0–100 by the Panel A procedure used for every other program${nMedium !== null ? `; ${nMedium} of ${nTitles} titles carry medium mapping confidence` : ''}. Basis: ${describeBasis(basis, jirN, nTitles)}. The ${basis?.tier === 'field' ? 'field-basis' : 'portfolio'} median is ${median}, so this program sits **${exposure > median ? 'above' : 'at or below'}** it.

**Curriculum Adaptiveness: ${pc.adaptiveness} / 15.** Scored on Panel C ${heading} sub-scale A ${mdCiteByN([1])} from ${cap.vintage} handbook evidence: anchors are declarative statements about documented curriculum evidence, level 3 requires assessment evidence, and ambiguous evidence resolves to the lower level.

**Workplace Practice: ${pc.workplace} / 9.** Scored on sub-scale W ${mdCiteByN([19])} in the same pass, from the same extract. The position axis remains adaptiveness alone; the workplace sub-score is reported beside it, not folded into the axis, and the two are never added together.

${
    pos
      ? `**Position: ${pos}.** Assigned against the v4 medians (exposure ${median}${basis?.tier === 'field' ? ' on the field basis' : ''}, adaptiveness ${V4_META.adaptMedian}), computed from all ${V4_META.cohortSize} reference-cohort programs re-scored on this instrument. This is the deterministic median rule the site applies, not a probabilistic stability class.`
      : `**Position: withheld.** No v4 median is available for this basis, so no label is assigned. Comparing a v4 score against a v3.1 median would rank it against a different instrument.`
  }`)

  // ── 2 ──
  parts.push(`## 2. PANEL C ${heading} SCORECARD — Basis: scored

The two sub-scales are kept separate and carry their own subtotals. Panel C has no
combined total: the sub-scores are reported side by side and never added.

| Item | Score | Rationale (anchor-referenced) |
| --- | --- | --- |
${scorecardRows(pc)}

${evidenceParagraphs(pc)}`)

  // ── 3 ──
  parts.push(`## 3. GATES — Basis: scored

${gatesBlock(pc)}${pc.gates?.G1?.result === 'FAIL' ? '\n\n**G1 FAILS.** A disciplinary-foundation failure is reported regardless of the adaptiveness score: the adaptive capabilities are scored on top of a foundation this program is not documented to establish.' : ''}`)

  // ── 4 ── seeded from the market report; the author fills Bearing only.
  parts.push(marketEvidenceSection(code, fill, exposureBasisSentence(basis, exposure, median, nTitles, nMedium)))

  // ── 5 ──
  parts.push(`## 5. CURRICULUM IMPLICATIONS — Basis: inferred

This section argues from the preceding evidence; it is interpretation, not observation.

Each row states an option and what it costs, not a directive. Anchor text, sequencing
and the score deltas are in the [improvement plan](dfva-v4-recommend-${code}.md); rows
below are ordered by headroom, which is not the plan's P-lever order.

${fill.implications ? '' : `<!-- AUTHOR:S5 — fill Implication and Cost per row from
     reports/dfva-v4-recommend-${code}.md via --fill. Options with costs, never directives. -->

`}| Item | Score | Implication | Cost | Sources |
| --- | --- | --- | --- | --- |
${implicationRows(pc, fill)}`)

  // ── 6 ──
  const amb: string[] = pc.ambiguities ?? []
  const notScoreable: string[] = pc.notScoreable ?? []
  parts.push(`## 6. EVIDENCE CONFIDENCE & LIMITATIONS — Basis: reported

**Panel A metadata.** Basis tier **${basis?.tier ?? 'none'}** (${TIER_LABEL[basis?.tier ?? ''] ?? 'unrecorded'})${jirN !== null ? `, n = ${jirN}` : ''}${nTitles !== null ? `, ${nTitles} destination titles` : ''}${nMedium !== null ? `, ${nMedium} at medium mapping confidence` : ''}. Index variant ${basis?.indexVariant ?? 'AIOE-2021'}; destination titles mapped to the published Felten index.${basis?.note ? ` Basis note: ${basis.note}` : ''}

**Panel C provenance.** Scored from the ${cap.vintage} handbook capture (${cap.pages} pages) and verified on ${pc.verified?.date ?? 'an unrecorded date'}: adversarial refutation of every level-3 score and every gate PASS (${pc.verified?.adversarial ? 'run' : 'NOT run'}), verbatim evidence check (${pc.verified?.mechanical ? 'run' : 'NOT run'}), and the construct-boundary pass.

${
    amb.length
      ? `**Ambiguities and construct-boundary notes** (${amb.length}):\n\n${amb.map((a) => `- ${esc(a)}`).join('\n')}`
      : '**Ambiguities:** none recorded. A block with no boundary note on a program with placement, capstone-route choice or peer assessment has probably not had the boundary check run.'
  }${
    notScoreable.length
      ? `\n\n**Not scoreable from the handbook** (${notScoreable.length}):\n\n${notScoreable.map((a) => `- ${esc(a)}`).join('\n')}`
      : ''
  }

**Standing v4 limitations.**

${STANDING_LIMITATIONS}

## REFERENCES

${canonicalReferences()}`)

  return parts.join('\n\n') + '\n'
}

/** The improvement plan's §1 diagnostic and §4 intervention rows, as the §5 author
 *  needs them. Parsed from the rendered report so the author reads this context
 *  instead of the 30 KB plan; citations collapse to [n]. */
export function readRecommendPlan(content: string): {
  diagnostic: { item: string; score: string; headroom: string; marketEvidence: string; priority: string }[]
  interventions: { n: string; item: string; action: string; anchor: string; effort: string; sequence: string }[]
} {
  const section = (n: number) => {
    const m = content.match(new RegExp(`^## ${n}\\.[^\\n]*\\n([\\s\\S]*?)(?=^## |\\Z)`, 'm'))
    return m ? m[1] : ''
  }
  const cells = (line: string) =>
    line
      .replace(/\[\[(\d+)\]\]\([^)]*\)/g, '[$1]')
      .split(/(?<!\\)\|/)
      .slice(1, -1)
      .map((c) => c.trim())
  const rows = (text: string, first: RegExp) =>
    text.split('\n').filter((l) => first.test(l)).map(cells)
  return {
    diagnostic: rows(section(1), /^\| [CW]\d /).map((c) => ({
      item: c[0], score: c[2], headroom: c[3], marketEvidence: c[4], priority: c[5],
    })),
    interventions: rows(section(4), /^\| P\d+ /).map((c) => ({
      n: c[0], item: c[1], action: c[2], anchor: c[3], effort: c[4], sequence: c[5],
    })),
  }
}

/** What the author needs for --fill: the seeded signals and the §5 rows. */
function fillTemplate(code: string): Record<string, unknown> {
  const ev = JSON.parse(readFileSync(path.join(repoRoot, 'dfva', 'source', 'evidence', `${code}.json`), 'utf8'))
  const pc = ev.panelCv4
  const mp = path.join(repoRoot, 'reports', `dfva-market-${code}.md`)
  const m = existsSync(mp) ? readMarket(readFileSync(mp, 'utf8')) : null
  const rp = path.join(repoRoot, 'reports', `dfva-v4-recommend-${code}.md`)
  return {
    code,
    // Only when the market report's §1 has no table: otherwise the seeded rows win.
    ...(m && m.jobFamilies.length === 0 ? { jobFamilies: [{ family: '', titles: '', pressure: '', skills: '' }] } : {}),
    bearing: Object.fromEntries((m?.skillShifts ?? []).map((s) => [s.skill, ''])),
    implications: Object.fromEntries(ALL_V4_ITEMS.map((i) => [i.id, { implication: '', cost: '' }])),
    context: {
      items: ALL_V4_ITEMS.map((i) => ({ id: i.id, name: i.name, score: pc[i.id].score, rationale: pc[i.id].rationale })),
      skillShifts: m?.skillShifts ?? [],
      recommendPlan: existsSync(rp)
        ? { path: path.relative(repoRoot, rp), ...readRecommendPlan(readFileSync(rp, 'utf8')) }
        : { path: path.relative(repoRoot, rp), missing: true },
      rules: [
        'jobFamilies (present only when the market §1 has no table): three or so families from the market report and the destinations footer; no empty cell — write "not stated in the market report".',
        'Bearing maps each signal to the scored items it bears on (C1–C5, W1–W3) — the join between market and instrument.',
        'Implication: what the score means given §4, falsifiable against it; if it would read the same for any program it is too generic.',
        'Cost: what acting would take (displaced subjects, staff capability, placement capacity, marking load). Options with costs, never directives.',
        'Source both §5 columns from context.recommendPlan (the improvement plan\'s diagnostic and intervention rows); §5 must not contradict it. Do not open the report files — this context is complete. A level-3 row with an empty cost gets the fixed "none needed" string.',
      ],
    },
  }
}

function main(): void {
  const argv = process.argv.slice(2)
  const fillPath = argv.includes('--fill') ? argv[argv.indexOf('--fill') + 1] : null
  const TEMPLATE = argv.includes('--fill-template')
  const codes = argv.filter((a) => !a.startsWith('--') && a !== fillPath)
  if (!codes.length) {
    console.error('usage: npx tsx dfva-v4-report-scaffold.ts <code> [<code> …] [--fill-template | --fill <json>]')
    process.exit(1)
  }
  if (TEMPLATE) {
    console.log(JSON.stringify(fillTemplate(codes[0]), null, 2))
    return
  }
  const fill: ReportFill = fillPath ? (JSON.parse(readFileSync(path.resolve(fillPath), 'utf8')) as ReportFill) : {}
  if (fillPath && codes.length !== 1) throw new Error('--fill takes exactly one code')
  for (const code of codes) {
    const out = path.join(repoRoot, 'reports', `dfva-v4-${code}.md`)
    writeFileSync(out, scaffold(code, fill), 'utf8')
    console.log(`wrote reports/dfva-v4-${code}.md${fillPath ? ` from ${fillPath}` : ''}`)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
