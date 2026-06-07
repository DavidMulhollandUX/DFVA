/**
 * DFVA drift check (CI guard). Fails if any generated file on disk differs from
 * what dfva/source would produce — i.e. someone hand-edited a generated file or
 * forgot to run dfva:gen.
 * Run: npm --prefix scripts run dfva:check
 */
import { promises as fs, existsSync } from 'node:fs'
import * as path from 'node:path'
import { generateAll, repoRoot } from './dfva-lib'

async function main(): Promise<void> {
  const expected = await generateAll()
  const drift: string[] = []
  for (const [rel, content] of expected) {
    const abs = path.join(repoRoot, rel)
    const actual = existsSync(abs) ? await fs.readFile(abs, 'utf8') : null
    if (actual !== content) drift.push(rel + (actual === null ? '  (missing)' : ''))
  }
  if (drift.length > 0) {
    console.error('DFVA generated files are out of date. Run `npm --prefix scripts run dfva:gen`:')
    for (const d of drift) console.error('  - ' + d)
    process.exit(1)
  }
  console.log(`dfva:check OK — ${expected.size} generated file(s) match dfva/source.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
