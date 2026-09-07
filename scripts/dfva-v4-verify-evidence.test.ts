/**
 * The `--adversarial` writer is the only path that can CREATE a verification
 * record, so the property worth guarding is that it cannot vouch in bulk: it
 * refuses to run unless the caller names the programs it is vouching for.
 *
 * Spawned rather than imported — the script executes at module top level.
 */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SCRIPT = path.join(HERE, 'dfva-v4-verify-evidence.ts')

function run(args: string[]): { status: number; out: string } {
  try {
    const out = execFileSync('npx', ['tsx', SCRIPT, ...args], { cwd: HERE, encoding: 'utf8', stdio: 'pipe' })
    return { status: 0, out }
  } catch (e) {
    const err = e as { status: number; stdout?: string; stderr?: string }
    return { status: err.status, out: `${err.stdout ?? ''}${err.stderr ?? ''}` }
  }
}

test('--adversarial refuses without --stamp and an explicit code list', () => {
  for (const args of [['--adversarial'], ['--adversarial', '--stamp'], ['--adversarial', '--code', 'mc-cs']]) {
    const { status, out } = run(args)
    assert.equal(status, 2, `expected a refusal for: ${args.join(' ')}`)
    assert.match(out, /--stamp --code/)
  }
})

test('--code takes a comma-separated list', () => {
  const { status, out } = run(['--code', 'mc-cs,mc-is'])
  assert.equal(status, 0)
  assert.match(out, /mc-cs/)
  assert.match(out, /mc-is/)
})
