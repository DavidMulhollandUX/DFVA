/**
 * Token audit for the v4 report pipeline: what each agent is told to read and
 * write for a program, in bytes and in tokens at 4 chars/token.
 *
 * The LLM-usage register carries no token counts for the Claude harness, so
 * this is the measurable proxy: the file bytes the workflow prompts mandate.
 * Two manifests — BEFORE (the agent-does-everything chain) and AFTER (the
 * script-first chain) — so a change to the pipeline has a number.
 *
 *   npx tsx dfva-token-audit.ts mc-cs b-mus            # BEFORE manifest
 *   npx tsx dfva-token-audit.ts mc-cs b-mus --after    # AFTER manifest
 *   npx tsx dfva-token-audit.ts mc-cs --both           # side by side
 *
 * A missing file falls back to the corpus median and is marked with "~".
 * Inlined bytes are prompt payloads (JSON.stringify of a block) and lint
 * output; both are estimates, stated in the manifest.
 */
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const P = (...p: string[]) => path.join(ROOT, ...p)

// Corpus medians (2026-09-03) used when a program's own file does not exist yet.
const MEDIAN: Record<string, number> = {
  extract: 74_484,
  evidence: 14_291,
  market: 11_569,
  v4: 43_349,
  recommend: 31_789,
  fill: 7_000,
}

const CHARS_PER_TOKEN = 4

interface Read { label: string; bytes: number; estimated: boolean }
interface Stage { stage: string; reads: Read[]; inlined: number; writes: Read[] }

const file = (rel: string, median?: string): Read => {
  const fp = P(rel)
  if (existsSync(fp)) return { label: rel, bytes: statSync(fp).size, estimated: false }
  return { label: rel, bytes: median ? MEDIAN[median] : 0, estimated: true }
}
const est = (label: string, bytes: number): Read => ({ label, bytes, estimated: true })

const PROMPT = 'dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md'
const REC_PROMPT = 'dfva/dist/v4/DFVA-V4-RECOMMEND-PROMPT.md'
const REC_TEMPLATE = 'dfva/dist/v4/recommend-template-v4.md'

/** The chain as scripts/workflows/*.js and docs/claude-capture-score.md ran it before 2026-09-03. */
function before(code: string): Stage[] {
  const extract = file(`scrapes/v4/${code}.txt`, 'extract')
  const evidence = file(`dfva/source/evidence/${code}.json`, 'evidence')
  const market = file(`reports/dfva-market-${code}.md`, 'market')
  const v4 = file(`reports/dfva-v4-${code}.md`, 'v4')
  const recommend = file(`reports/dfva-v4-recommend-${code}.md`, 'recommend')
  const lintCorpus = est('dfva:report-lint over the whole corpus, per fix pass (x2)', 8_000)
  return [
    { stage: 'Score', reads: [file(PROMPT), extract], inlined: 0, writes: [est('panelCv4 JSON (returned)', evidence.bytes)] },
    { stage: 'Verify', reads: [file(PROMPT), extract], inlined: evidence.bytes, writes: [est('verdict JSON', 2_000)] },
    { stage: 'Persist (agent)', reads: [evidence], inlined: evidence.bytes + 2_000, writes: [evidence] },
    { stage: 'Author §4/§5', reads: [v4, market, recommend], inlined: 0, writes: [est('§4 + §5 prose', 9_000)] },
    {
      stage: 'Recommend (agent writes file)',
      reads: [file(REC_PROMPT), file(REC_TEMPLATE), evidence, market, lintCorpus],
      inlined: 0,
      writes: [recommend],
    },
    { stage: 'Market (hand-written)', reads: [est('research reads — not measurable', 0)], inlined: 0, writes: [market] },
  ]
}

/** The chain after the deterministic steps: persist script, mechanical verify, scaffold fills, market scaffold. */
function after(code: string): Stage[] {
  const extract = file(`scrapes/v4/${code}.txt`, 'extract')
  const evidence = file(`dfva/source/evidence/${code}.json`, 'evidence')
  const market = file(`reports/dfva-market-${code}.md`, 'market')
  const v4 = file(`reports/dfva-v4-${code}.md`, 'v4')
  const recommend = file(`reports/dfva-v4-recommend-${code}.md`, 'recommend')
  const lintOne = est('dfva:report-lint --code, per fix pass (x2)', 600)
  return [
    { stage: 'Score', reads: [file(PROMPT), extract], inlined: 0, writes: [est('panelCv4 JSON (returned + pending file)', evidence.bytes * 2)] },
    { stage: 'Mechanical (runner)', reads: [], inlined: 200, writes: [est('mechanical JSON', 500)] },
    { stage: 'Verify', reads: [file(PROMPT), extract], inlined: evidence.bytes + 500, writes: [est('verdict JSON', 2_000)] },
    { stage: 'Persist (runner)', reads: [], inlined: 2_000, writes: [est('verdict file + stdout', 2_500)] },
    {
      stage: 'Recommend (fill)',
      reads: [file(REC_PROMPT), est('--fill-template skeleton', 3_000), evidence, market, lintOne],
      inlined: 0,
      writes: [est('fill JSON', MEDIAN.fill)],
    },
    { stage: 'Author §4 bearing + §5 (fill)', reads: [v4, recommend, lintOne], inlined: 0, writes: [est('fill JSON', 4_000)] },
    { stage: 'Market (scaffold + §4 direction/§5)', reads: [market, lintOne], inlined: 0, writes: [est('§4 direction + §5 rows', 1_500)] },
    // Persist and Verify no longer involve the agent writing the evidence file;
    // the scaffolds are the only writers of the three report files.
  ]
}

const sum = (rs: Read[]) => rs.reduce((n, r) => n + r.bytes, 0)
const kb = (n: number) => (n / 1024).toFixed(1).padStart(7)
const tok = (n: number) => Math.round(n / CHARS_PER_TOKEN).toLocaleString('en-AU').padStart(9)

function render(code: string, label: string, stages: Stage[]): { input: number; output: number } {
  let input = 0, output = 0
  console.log(`\n${code} — ${label}`)
  console.log(`${'stage'.padEnd(40)}${'in KB'.padStart(8)}${'out KB'.padStart(8)}${'in tok'.padStart(10)}${'out tok'.padStart(10)}`)
  for (const s of stages) {
    const i = sum(s.reads) + s.inlined
    const o = sum(s.writes)
    input += i; output += o
    const mark = [...s.reads, ...s.writes].some((r) => r.estimated) ? '~' : ' '
    console.log(`${mark}${s.stage.padEnd(39)}${kb(i)} ${kb(o)} ${tok(i)} ${tok(o)}`)
  }
  console.log(`${'total'.padEnd(40)}${kb(input)} ${kb(output)} ${tok(input)} ${tok(output)}`)
  return { input, output }
}

function main(): void {
  const argv = process.argv.slice(2)
  const AFTER = argv.includes('--after')
  const BOTH = argv.includes('--both')
  const codes = argv.filter((a) => !a.startsWith('--'))
  if (!codes.length) {
    console.error('usage: npx tsx dfva-token-audit.ts <code> [<code> …] [--after|--both]')
    process.exit(2)
  }
  const totals = { before: { input: 0, output: 0 }, after: { input: 0, output: 0 } }
  for (const code of codes) {
    if (!AFTER || BOTH) {
      const t = render(code, 'BEFORE (agent chain)', before(code))
      totals.before.input += t.input; totals.before.output += t.output
    }
    if (AFTER || BOTH) {
      const t = render(code, 'AFTER (script-first chain)', after(code))
      totals.after.input += t.input; totals.after.output += t.output
    }
  }
  if (codes.length > 1 || BOTH) {
    console.log(`\n${codes.length} program(s); ~ marks an estimate or a median stand-in; ${CHARS_PER_TOKEN} chars/token`)
    if (!AFTER || BOTH) console.log(`  BEFORE  in ${tok(totals.before.input).trim()} tok  out ${tok(totals.before.output).trim()} tok`)
    if (AFTER || BOTH) console.log(`  AFTER   in ${tok(totals.after.input).trim()} tok  out ${tok(totals.after.output).trim()} tok`)
    if (BOTH) {
      const di = totals.before.input - totals.after.input
      const dout = totals.before.output - totals.after.output
      console.log(`  saved   in ${tok(di).trim()} tok (${((100 * di) / totals.before.input).toFixed(0)}%)  out ${tok(dout).trim()} tok (${((100 * dout) / totals.before.output).toFixed(0)}%)`)
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
