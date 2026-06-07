/**
 * Import verified per-program evidence (the output of the dfva-evidence-extraction
 * workflow) into dfva/source/evidence/<code>.json, converting the dimensions[] array
 * into the byDimension map the generator consumes. Only entries whose verdict passed
 * are written.
 *
 * Usage (from scripts/): npx tsx dfva-import-evidence.ts <workflow-output.json>
 */
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { repoRoot } from './dfva-lib'

async function main(): Promise<void> {
  const file = process.argv[2]
  if (!file) {
    console.error('usage: npx tsx dfva-import-evidence.ts <workflow-output.json>')
    process.exit(2)
  }
  const raw = await fs.readFile(file, 'utf8')
  let parsed: any
  try {
    parsed = JSON.parse(raw)
  } catch {
    const i = raw.indexOf('[')
    const j = raw.lastIndexOf(']')
    parsed = JSON.parse(raw.slice(i, j + 1))
  }
  // Workflow output is { summary, logs, result: [...] }; also accept a bare array.
  const data: any[] = Array.isArray(parsed) ? parsed : parsed.result || parsed.results || []
  const outDir = path.join(repoRoot, 'dfva', 'source', 'evidence')
  await fs.mkdir(outDir, { recursive: true })
  let n = 0
  for (const entry of data) {
    if (entry.verdict && entry.verdict.ok === false) {
      console.warn('skip (verification failed):', entry.code, entry.verdict.issues)
      continue
    }
    const ev = entry.evidence
    const byDimension: Record<string, unknown> = {}
    for (const d of ev.dimensions) {
      byDimension[d.id] = { rationale: d.rationale, recommendations: d.recommendations || [] }
    }
    const out = { code: ev.code, programSlug: ev.programSlug, byDimension }
    await fs.writeFile(path.join(outDir, `${ev.code}.json`), JSON.stringify(out, null, 2) + '\n', 'utf8')
    n++
  }
  console.log(`wrote ${n} evidence file(s) to dfva/source/evidence/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
