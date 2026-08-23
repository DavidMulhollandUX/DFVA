/**
 * Capture-provenance check — the guardrail for reproducible evidence.
 * Run: npm --prefix scripts run dfva:capture-check
 *
 * Every scored program must have a COMMITTED handbook capture backing it. The
 * June-2026 batch showed why: 74 courses were "ready to score" off a cache in
 * compass/app/.handbook-cache/, which is gitignored — so on a fresh clone the
 * evidence was gone and only 9 of the 74 ever got scored. Capture that lives
 * only on one machine cannot be re-examined, re-scored, or audited.
 *
 * FAILS on:
 *   1. a program in the app registry with no capture record in data/ at all
 *   2. a capture record that is thin/failed while the program is NOT flagged
 *      evidenceConfidence: "low" — i.e. the registry overstates its evidence
 * WARNS on:
 *   - thin captures that ARE correctly flagged (tracked debt; they sit in
 *     data/capture_queue.json). Note: for the research doctorates the SOURCE
 *     page is genuinely ~180-940 chars, so re-running any scraper returns the
 *     same text — clearing those needs different sources (faculty RHD pages),
 *     not a better capture tool.
 */
import { existsSync, readFileSync } from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PROGRAMS } from '../compass/app/src/compass/sharedProgramData'

/** Keep in sync with MIN_CAPTURE_CHARS in scripts/build-capture-queue.py. */
const MIN_CAPTURE_CHARS = 2000

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Programs with no committed capture, each with the reason it is exempt.
// Unlike the rest, these were not scored from a UniMelb handbook page at all.
// Shrink this list; never grow it — a new program without capture must fail.
const NO_CAPTURE_EXPECTED: Record<string, string> = {
  'dfva-b-des': 'scored pre-pipeline (2026-04), before capture was recorded',
  'dfva-b-sci': 'scored pre-pipeline (2026-04), before capture was recorded',
  'dfva-439fs': 'scored pre-pipeline, capture not recorded',
  'dfva-527cl': 'scored pre-pipeline, capture not recorded',
  'dfva-746st': 'scored pre-pipeline, capture not recorded',
  'dfva-mc-jurisd': 'scored 2026-07 from handbook content not persisted to data/',
}

interface CaptureRec {
  code?: string
  success?: boolean
  length?: number
  markdown?: string
  text?: string
}

function loadCaptures(): Map<string, { ok: boolean; chars: number }> {
  const out = new Map<string, { ok: boolean; chars: number }>()
  for (const rel of ['data/handbook_data.json', 'data/handbook_doctorate_data.json']) {
    const p = path.join(repoRoot, rel)
    if (!existsSync(p)) continue
    const recs = JSON.parse(readFileSync(p, 'utf-8')) as CaptureRec[]
    for (const r of recs) {
      if (!r.code) continue
      const chars = Math.max(r.length ?? 0, (r.markdown ?? r.text ?? '').length)
      const ok = Boolean(r.success) && chars >= MIN_CAPTURE_CHARS
      const prev = out.get(r.code)
      if (!prev || chars > prev.chars) out.set(r.code, { ok, chars })
    }
  }
  return out
}

const captures = loadCaptures()
const errors: string[] = []
const warnings: string[] = []
let backed = 0

for (const p of PROGRAMS) {
  const code = p.assessmentSlug.replace(/^dfva-/, '')
  const cap = captures.get(code)
  const exemptReason = NO_CAPTURE_EXPECTED[p.assessmentSlug]
  const flaggedLow = p.evidenceConfidence === 'low'

  if (!cap) {
    if (!exemptReason) {
      errors.push(
        `${p.program} (${code}): no committed capture in data/ — evidence is not reproducible. ` +
          `Capture it (scripts/cyclical_scrape.py) or add an explicit exemption with a reason.`,
      )
    }
    continue
  }

  if (cap.ok) {
    backed++
    continue
  }

  // Thin or failed capture: acceptable only if the registry says so.
  if (flaggedLow) {
    warnings.push(`${p.program} (${code}): thin capture, ${cap.chars} chars — flagged evidenceConfidence:"low"; sparse source, needs additional sources not a re-scrape`)
  } else {
    errors.push(
      `${p.program} (${code}): capture is only ${cap.chars} chars (min ${MIN_CAPTURE_CHARS}) ` +
        `but the program is not flagged evidenceConfidence:"low" — the registry overstates its evidence.`,
    )
  }
}

// An exemption that is no longer needed should be deleted, not left to rot.
for (const [slug, reason] of Object.entries(NO_CAPTURE_EXPECTED)) {
  const code = slug.replace(/^dfva-/, '')
  if (captures.get(code)?.ok) {
    errors.push(`${slug} now has a real capture — remove it from NO_CAPTURE_EXPECTED ("${reason}")`)
  }
  if (!PROGRAMS.some((p) => p.assessmentSlug === slug)) {
    errors.push(`NO_CAPTURE_EXPECTED lists "${slug}", which is not a program — remove it`)
  }
}

const exempt = Object.keys(NO_CAPTURE_EXPECTED).length
console.log(
  `Programs: ${PROGRAMS.length} | capture-backed: ${backed} | thin (flagged): ${warnings.length} | no capture (exempt): ${exempt}`,
)
if (warnings.length) {
  console.log(`\n${warnings.length} thin capture(s) — tracked debt, see data/capture_queue.json:`)
  warnings.slice(0, 10).forEach((w) => console.log('  · ' + w))
  if (warnings.length > 10) console.log(`  … and ${warnings.length - 10} more`)
}
if (errors.length) {
  console.error(`\n❌ ${errors.length} capture-provenance error(s):`)
  errors.forEach((e) => console.error('  - ' + e))
  process.exit(1)
}
console.log('\n✅ Capture provenance check passed.')
