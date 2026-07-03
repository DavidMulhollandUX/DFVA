/**
 * DFVA generation library (pure — no side effects on import).
 *
 * generateAll() returns a map of repo-relative output path -> file content for:
 *   - every prompt target in dfva/source/manifest.ts (templates with {{...}} markers resolved)
 *
 * (compass-static demo targets were dropped when that app was decommissioned.)
 *
 * dfva-generate.ts writes the map to disk; dfva-check.ts diffs it against disk.
 */
import { promises as fs, existsSync } from 'node:fs'
import * as path from 'node:path'
import {
  renderRubricTable,
  renderRiskBandsTable,
  renderThresholdQuestions,
  renderRiskBandsInline,
  renderRiskBandsList,
  renderRubricTableCondensed,
  renderThresholdQuestionsList,
  renderDemoRubricTs,
} from '../dfva/source/rubric'
import { TARGETS } from '../dfva/source/manifest'

function findRepoRoot(start: string): string {
  let dir = start
  for (let i = 0; i < 10; i++) {
    if (existsSync(path.join(dir, 'dfva', 'source', 'rubric.ts'))) return dir
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  throw new Error(`Could not locate repo root (dfva/source/rubric.ts) from ${start}`)
}

export const repoRoot = findRepoRoot(process.cwd())
const sourceDir = path.join(repoRoot, 'dfva', 'source')
const targetsDir = path.join(sourceDir, 'targets')
const blocksDir = path.join(sourceDir, 'blocks')
const evidenceDir = path.join(sourceDir, 'evidence')

const TOKENS: Record<string, () => string> = {
  '{{rubricTable}}': renderRubricTable,
  '{{riskBandsTable}}': renderRiskBandsTable,
  '{{riskBandsInline}}': renderRiskBandsInline,
  '{{riskBandsList}}': renderRiskBandsList,
  '{{rubricTableCondensed}}': renderRubricTableCondensed,
  '{{thresholdQuestions}}': renderThresholdQuestions,
  '{{thresholdQuestionsList}}': renderThresholdQuestionsList,
}

async function resolveTemplate(tmpl: string): Promise<string> {
  let out = tmpl
  for (const [tok, fn] of Object.entries(TOKENS)) {
    if (out.includes(tok)) out = out.split(tok).join(fn())
  }
  // {{> block:NAME}} include directives
  const names = new Set<string>()
  const re = /\{\{>\s*block:([a-z0-9-]+)\s*\}\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(out)) !== null) names.add(m[1])
  for (const name of names) {
    const file = path.join(blocksDir, `${name}.md`)
    if (!existsSync(file)) throw new Error(`Missing block include: dfva/source/blocks/${name}.md`)
    const block = (await fs.readFile(file, 'utf8')).replace(/\s+$/, '')
    out = out.split(`{{> block:${name}}}`).join(block)
  }
  return out
}

async function renderEvidenceTs(): Promise<string | null> {
  if (!existsSync(evidenceDir)) return null
  const files = (await fs.readdir(evidenceDir)).filter((f) => f.endsWith('.json')).sort()
  if (files.length === 0) return null
  const map: Record<string, unknown> = {}
  for (const f of files) {
    const data = JSON.parse(await fs.readFile(path.join(evidenceDir, f), 'utf8'))
    if (!data.programSlug || !data.byDimension) {
      throw new Error(`evidence/${f} must have { programSlug, byDimension }`)
    }
    map[data.programSlug] = data.byDimension
  }
  return `// AUTO-GENERATED from dfva/source/evidence/*.json — do not edit by hand.
// Run \`npm --prefix scripts run dfva:gen\` to regenerate.

export interface DimensionRecommendation {
  action: string
  priority?: string
  effort?: string
  dimRefs?: string[]
}

export interface DimensionEvidence {
  rationale: string
  recommendations: DimensionRecommendation[]
}

export const DIMENSION_EVIDENCE: Record<string, Record<string, DimensionEvidence>> = ${JSON.stringify(map, null, 2)}

export function evidenceFor(programSlug: string, dimId: string): DimensionEvidence | undefined {
  return DIMENSION_EVIDENCE[programSlug]?.[dimId]
}
`
}

export async function generateAll(): Promise<Map<string, string>> {
  const out = new Map<string, string>()

  // Templated prompt targets (skip any whose template does not exist yet).
  // (compass-static demo registries removed — that app is decommissioned.)
  for (const t of TARGETS) {
    const tmplPath = path.join(targetsDir, t.template)
    if (!existsSync(tmplPath)) {
      console.warn(`skip (no template yet): ${t.template}`)
      continue
    }
    const tmpl = await fs.readFile(tmplPath, 'utf8')
    out.set(t.output, await resolveTemplate(tmpl))
  }

  return out
}
