/**
 * Scaffold `reports/dfva-v4r-<code>.md` — the research-degree report.
 *
 * A research degree carries no v4 score of any kind, for two independent
 * reasons, and the report's first job is to say both:
 *
 *   - Panel C scores taught curriculum structure. A research degree has none.
 *   - Panel A needs a destination basis. The resolver returns none for any of
 *     the 14 (no JIR record, no variant, no pooled or combined cohort, no
 *     curated override, no JSA HEO field list).
 *
 * So there is no exposure, no adaptiveness, no position and no gates to report.
 * What survives is the v1-instrument assessment and the market intelligence,
 * and this family carries them as NARRATIVE ONLY — no composite, no dimension
 * scores, no Irreplaceability. A single number invites comparison with v4
 * figures that do not exist for these programs.
 *
 *   npx tsx dfva-v4r-report-scaffold.ts            # all research degrees
 *   npx tsx dfva-v4r-report-scaffold.ts dh-lld …   # named ones
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { V4_RESEARCH_DEGREES } from '../compass/app/src/compass/v4/data/v4PanelC'
import { PROGRAMS } from '../compass/app/src/compass/sharedProgramData'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const R = (p: string) => path.join(ROOT, p)

/** Pull one `### N. HEADING` section body out of a v1 report. */
function section(md: string, heading: string): string {
  const rx = new RegExp(`^### \\d+\\. ${heading}\\s*$([\\s\\S]*?)(?=^### \\d+\\. |\\Z)`, 'm')
  const m = rx.exec(md)
  return (m?.[1] ?? '').trim()
}

/** Strip v1 numeric scores. Anything left that still looks like a score is
 *  reported rather than silently rewritten — a mangled verdict is worse than a
 *  loud failure. */
function stripScores(text: string): { out: string; residue: string[] } {
  let out = text
  // "Scored **MODERATE RISK (22/36 adjusted)** — the renormalised score over the
  // 8 applicable dimensions, after excluding …" → keep the band, drop the number.
  out = out.replace(/\s*\((\d{1,2})\/36[^)]*\)/g, '')
  out = out.replace(/\b\d{1,2}\/36\b/g, 'the v1 composite')
  out = out.replace(/\bthe renormalised score over the\b/g, 'a judgement made over the')
  const residue = [...out.matchAll(/\b\d{1,2}\s*\/\s*(?:36|3)\b/g)].map((m) => m[0])
  return { out, residue }
}

const grandfathered = readFileSync(R('scripts/check-report-format.ts'), 'utf8')

const codes = process.argv.slice(2).length
  ? process.argv.slice(2).map((c) => c.toLowerCase())
  : [...V4_RESEARCH_DEGREES]

let failed = 0
for (const code of codes) {
  if (!V4_RESEARCH_DEGREES.includes(code)) {
    console.error(`✗ ${code}: not in V4_RESEARCH_DEGREES — this family is only for research degrees`)
    failed++
    continue
  }
  const v1Path = R(`reports/dfva-${code}.md`)
  if (!existsSync(v1Path)) {
    console.error(`✗ ${code}: no v1 report at reports/dfva-${code}.md to carry forward`)
    failed++
    continue
  }
  const v1 = readFileSync(v1Path, 'utf8')
  const prog = PROGRAMS.find((p: { assessmentSlug: string }) => p.assessmentSlug === `dfva-${code}`)
  const name = prog?.program ?? code.toUpperCase()

  const thresholds = stripScores(section(v1, 'THREE THRESHOLD QUESTIONS'))
  const analogue = stripScores(section(v1, 'ANALOGUE GRADUATE PROFILE'))
  const verdict = stripScores(section(v1, 'VERDICT'))
  const residue = [...thresholds.residue, ...analogue.residue, ...verdict.residue]
  if (residue.length) {
    console.error(`✗ ${code}: score-like text survived stripping (${residue.join(', ')}) — fix by hand`)
    failed++
    continue
  }

  const marketExists = existsSync(R(`reports/dfva-market-${code}.md`))
  const marketUnsourced = grandfathered.includes(`'dfva-market-${code}'`)

  const md = `# DFVA RESEARCH DEGREE REPORT: ${name} (${code.toUpperCase()})

**Instrument:** research-degree report, v4 era. This program carries **no v4 score** — no
Panel C adaptiveness, no Panel A exposure, no position and no gates. Section 1 says why.
The assessment below is carried from the retired v1 instrument as narrative only.

## 1. WHY THIS PROGRAM CARRIES NO v4 SCORE — Basis: stated

Two independent reasons, either of which alone would be sufficient.

**Panel C has nothing to score.** Panel C v4 scores documented *taught curriculum*
structure — assessment design, subject sequencing, stated learning outcomes. A research
degree is examined on an original contribution rather than delivered as coursework, so
there is no curriculum object for the instrument to read. This is a property of the
program, not a gap in the evidence: capturing more handbook pages would not produce a
score.

**Panel A has no destination basis.** Panel A exposure is computed from where a program's
graduates actually go, crosswalked to the published Felten AIOE index. The Panel A resolver
returns no basis for this program at any tier — no own alumni record, no variant, no pooled
or combined cohort, no curated cognate or partial borrow, and no JSA HEO field list. Unlike
the Panel C exclusion this one is an evidence gap rather than a category error, and it could
in principle be closed by data. It has not been, so no exposure figure is published here.

Consequently this report makes **no durability claim on v4 terms** and this program appears
on /reports as a research degree rather than as scored or as pending.

## 2. ASSESSMENT CARRIED FORWARD — Basis: inferred (v1 instrument)

Carried from [the v1 assessment](dfva-${code}.md) as narrative. The v1 composite, its
per-dimension scores and the retired Irreplaceability bonus are **deliberately omitted** —
they were produced by a different instrument on a different construct, and a single number
beside a program with no v4 score invites exactly the comparison that would be wrong.

### Threshold questions

${thresholds.out}

### Analogue graduate profile

${analogue.out}

### Verdict

${verdict.out}

## 3. MARKET EVIDENCE — Basis: reported

${
  marketExists
    ? `Market intelligence for this program is in [the market report](dfva-market-${code}.md).${
        marketUnsourced
          ? ` **Its §3 discussion-signal section is unsourced** — it predates the sourcing
rule and is grandfathered in \`check-report-format.ts\`, meaning it warns rather than fails.
Nothing from that section is condensed here, because an unsourced claim does not become
sound by being restated in a second report. The rest of the market report, including its
labour-market and program-profile material, stands.`
          : ` Its §3 meets the sourcing rule.`
      }`
    : `No market report exists for this program.`
}

Note that the market evidence for a research degree answers a different question from the
one it answers for a coursework program. There is no graduate cohort entering an
entry-level labour market, so the market material bears on the standing of the credential
and the fields its holders already work in, not on graduate displaceability.

## 4. LIMITATIONS — Basis: stated

- **No v4 score exists for this program, and none is pending.** Absence here is a
  conclusion, not a backlog item. Do not read it as "not yet assessed".
- **The carried assessment is v1-instrument.** v1 scored a different construct on different
  anchors and is not comparable with Panel C v4 adaptiveness, the workplace sub-scale, or
  any v4 position label. It is reproduced as reasoning, not as a rating.
- **The original v1 scoring treated inapplicable dimensions as N/A** and renormalised over
  the applicable ones. That treatment is itself a judgement about a program the rubric was
  not built for; the underlying numbers are in the v1 report and are not restated here.
- **The DFVA rubric was built to assess training pathways that produce a graduate
  workforce.** These programs do not produce one. The decision-relevant question for a
  research degree is whether the credential remains a durable signal of authority, which is
  what §2 addresses.
- **No destination data.** With no Panel A basis, nothing in this report rests on observed
  graduate destinations for this program.
`

  writeFileSync(R(`reports/dfva-v4r-${code}.md`), md)
  console.log(`wrote reports/dfva-v4r-${code}.md`)
}

if (failed) {
  console.error(`\n${failed} program(s) failed — nothing written for them.`)
  process.exit(1)
}
