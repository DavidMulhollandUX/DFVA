/**
 * DFVA generator CLI. Writes every generated artifact to disk.
 * Run: npm --prefix scripts run dfva:gen
 */
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { generateAll, repoRoot } from './dfva-lib'

async function main(): Promise<void> {
  const out = await generateAll()
  for (const [rel, content] of out) {
    const abs = path.join(repoRoot, rel)
    await fs.mkdir(path.dirname(abs), { recursive: true })
    await fs.writeFile(abs, content, 'utf8')
    console.log('wrote', rel)
  }
  console.log(`\n${out.size} file(s) generated from dfva/source.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
