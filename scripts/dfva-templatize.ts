/**
 * One-shot migration helper: derive a dfva/source/targets/*.tmpl from an existing
 * prompt file by replacing the exact rubric / risk-band / threshold-question spans
 * with generator tokens. Deterministic (byte-exact first-occurrence replace) so the
 * generator reproduces the original file verbatim.
 *
 * Usage (from scripts/):  npx tsx dfva-templatize.ts <srcPath> <tmplRelToTargets>
 *   <srcPath>: repo-relative, absolute, or ~-prefixed path to the source file
 *   <tmplRelToTargets>: output path under dfva/source/targets/
 */
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import {
  renderRubricTable,
  renderRiskBandsTable,
  renderThresholdQuestions,
  renderRiskBandsInline,
  renderRiskBandsList,
  renderRubricTableCondensed,
  renderThresholdQuestionsList,
} from '../dfva/source/rubric'
import { repoRoot } from './dfva-lib'

async function main(): Promise<void> {
  const [, , srcArg, tmplArg] = process.argv
  if (!srcArg || !tmplArg) {
    console.error('usage: npx tsx dfva-templatize.ts <src> <tmplRelToTargets>')
    process.exit(2)
  }
  const src = srcArg.startsWith('/')
    ? srcArg
    : srcArg.startsWith('~')
      ? srcArg.replace(/^~/, process.env.HOME as string)
      : path.join(repoRoot, srcArg)
  const tmpl = path.join(repoRoot, 'dfva', 'source', 'targets', tmplArg)

  let s = await fs.readFile(src, 'utf8')
  const subs: [string, string][] = [
    [renderRubricTable(), '{{rubricTable}}'],
    [renderRiskBandsTable(), '{{riskBandsTable}}'],
    [renderRiskBandsList(), '{{riskBandsList}}'],
    [renderRiskBandsInline(), '{{riskBandsInline}}'],
    [renderRubricTableCondensed(), '{{rubricTableCondensed}}'],
    [renderThresholdQuestionsList(), '{{thresholdQuestionsList}}'],
    [renderThresholdQuestions(), '{{thresholdQuestions}}'],
  ]
  const applied: string[] = []
  for (const [needle, token] of subs) {
    const i = s.indexOf(needle)
    if (i >= 0) {
      s = s.slice(0, i) + token + s.slice(i + needle.length)
      applied.push(token)
    }
  }
  await fs.mkdir(path.dirname(tmpl), { recursive: true })
  await fs.writeFile(tmpl, s, 'utf8')
  console.log(JSON.stringify({ tmpl: tmplArg, applied }))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
