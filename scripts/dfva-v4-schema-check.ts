/**
 * v4 evidence schema-drift guard. dfva-v4-gen.ts's appPanelCModule() spreads
 * every dfva/source/evidence/*.json's `panelCv4` block verbatim into the
 * generated compass/app/src/compass/v4/data/v4PanelC.ts — it does not check
 * the JSON matches the V4PanelC TypeScript interface. Nothing else did
 * either, until 2026-09-01: 8 evidence files were missing the required
 * `ambiguities` field and 1 had a stray `reviewNote` key, and none of it
 * surfaced until a full `wasp start` compile — by which point it was
 * blocking the dev server for everyone, not just whoever introduced the
 * drift. This catches the same class of error at evidence-authoring time.
 *
 * The field lists below mirror compass/app/src/compass/v4/data/v4PanelC.ts's
 * V4PanelC/V4ItemResult/V4GateResult/V4Adjudication interfaces (lines
 * 7-54 as of 2026-09-01). If that interface changes, update this file too —
 * there is no single source both sides import from, because the interface
 * lives in application TypeScript and this check must also run standalone
 * against plain JSON.
 * Run: npm --prefix scripts run dfva:v4-schema-check (also part of dfva:check)
 */
import { readdirSync, readFileSync } from 'node:fs'
import * as path from 'node:path'

const repoRoot = path.resolve(__dirname, '..')
const EVIDENCE_DIR = path.join(repoRoot, 'dfva', 'source', 'evidence')

const errors: string[] = []

function checkKeys(
  obj: Record<string, unknown>,
  required: string[],
  optional: string[],
  context: string,
): void {
  const allowed = new Set([...required, ...optional])
  for (const key of required) {
    if (!(key in obj)) errors.push(`${context}: missing required field "${key}"`)
  }
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) errors.push(`${context}: unexpected field "${key}" (not in V4PanelC)`)
  }
}

const ITEM_REQUIRED = ['score', 'rationale']
const ITEM_OPTIONAL = ['evidenceLines', 'adjudication']
const GATE_REQUIRED = ['result', 'rationale']
const GATE_OPTIONAL = ['evidenceLines']
const ADJUDICATION_REQUIRED = ['originalScore', 'reason']
const ADJUDICATION_OPTIONAL = ['demotedTo', 'promotedTo']
const VERIFIED_REQUIRED = ['adversarial', 'mechanical', 'date']
const VERIFIED_ADVERSARIAL_OBJ_REQUIRED = ['reviewed', 'date']

function checkItemResult(obj: unknown, context: string): void {
  if (typeof obj !== 'object' || obj === null) {
    errors.push(`${context}: expected a V4ItemResult object`)
    return
  }
  const o = obj as Record<string, unknown>
  checkKeys(o, ITEM_REQUIRED, ITEM_OPTIONAL, context)
  if (o.adjudication !== undefined) {
    if (typeof o.adjudication !== 'object' || o.adjudication === null) {
      errors.push(`${context}.adjudication: expected an object`)
    } else {
      checkKeys(
        o.adjudication as Record<string, unknown>,
        ADJUDICATION_REQUIRED,
        ADJUDICATION_OPTIONAL,
        `${context}.adjudication`,
      )
    }
  }
}

function checkGateResult(obj: unknown, context: string): void {
  if (typeof obj !== 'object' || obj === null) {
    errors.push(`${context}: expected a V4GateResult object`)
    return
  }
  const o = obj as Record<string, unknown>
  checkKeys(o, GATE_REQUIRED, GATE_OPTIONAL, context)
  if (o.result !== undefined && o.result !== 'PASS' && o.result !== 'FAIL') {
    errors.push(`${context}.result: "${o.result}" is not "PASS" or "FAIL"`)
  }
}

const PANEL_C_REQUIRED = ['instrument', 'C1', 'C2', 'C3', 'C4', 'C5', 'adaptiveness', 'gates', 'ambiguities']
const PANEL_C_OPTIONAL = ['W1', 'W2', 'W3', 'workplace', 'notScoreable', 'verified']

let checked = 0
for (const f of readdirSync(EVIDENCE_DIR).sort()) {
  if (!f.endsWith('.json')) continue
  const code = f.replace(/\.json$/, '')
  let doc: { panelCv4?: Record<string, unknown> }
  try {
    doc = JSON.parse(readFileSync(path.join(EVIDENCE_DIR, f), 'utf8'))
  } catch (e) {
    errors.push(`${code}: invalid JSON (${(e as Error).message})`)
    continue
  }
  if (!doc.panelCv4) continue // not yet scored on v4 — nothing to check
  checked++
  const p = doc.panelCv4
  checkKeys(p, PANEL_C_REQUIRED, PANEL_C_OPTIONAL, `${code}.panelCv4`)

  for (const id of ['C1', 'C2', 'C3', 'C4', 'C5', 'W1', 'W2', 'W3']) {
    if (p[id] !== undefined) checkItemResult(p[id], `${code}.panelCv4.${id}`)
  }

  if (p.gates !== undefined) {
    if (typeof p.gates !== 'object' || p.gates === null) {
      errors.push(`${code}.panelCv4.gates: expected an object`)
    } else {
      const g = p.gates as Record<string, unknown>
      checkKeys(g, ['G1', 'G2'], [], `${code}.panelCv4.gates`)
      if (g.G1 !== undefined) checkGateResult(g.G1, `${code}.panelCv4.gates.G1`)
      if (g.G2 !== undefined) checkGateResult(g.G2, `${code}.panelCv4.gates.G2`)
    }
  }

  if (p.ambiguities !== undefined && !Array.isArray(p.ambiguities)) {
    errors.push(`${code}.panelCv4.ambiguities: expected an array`)
  }
  if (p.notScoreable !== undefined && !Array.isArray(p.notScoreable)) {
    errors.push(`${code}.panelCv4.notScoreable: expected an array`)
  }

  if (p.verified !== undefined) {
    if (typeof p.verified !== 'object' || p.verified === null) {
      errors.push(`${code}.panelCv4.verified: expected an object`)
    } else {
      const v = p.verified as Record<string, unknown>
      checkKeys(v, VERIFIED_REQUIRED, [], `${code}.panelCv4.verified`)
      if (typeof v.adversarial === 'object' && v.adversarial !== null) {
        checkKeys(
          v.adversarial as Record<string, unknown>,
          VERIFIED_ADVERSARIAL_OBJ_REQUIRED,
          [],
          `${code}.panelCv4.verified.adversarial`,
        )
      } else if (v.adversarial !== undefined && typeof v.adversarial !== 'boolean') {
        errors.push(
          `${code}.panelCv4.verified.adversarial: expected boolean or { reviewed, date }`,
        )
      }
    }
  }
}

if (errors.length > 0) {
  console.error(
    `dfva:v4-schema-check FAILED — ${errors.length} field(s) drifted from the V4PanelC interface across ${checked} scored record(s):`,
  )
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
console.log(`dfva:v4-schema-check OK — ${checked} scored record(s) match the V4PanelC interface.`)
