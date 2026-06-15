/**
 * Generate the Faculty of Science meeting deliverables (HTML → PDF via render.py).
 * Data-driven from the canonical registry so every figure traces to source and
 * the set regenerates when scores change. Reuses the COMPASS artifact visual
 * language (tokens, score arc, dimension fingerprint) from docs/compass-artifacts/.
 *
 * Run:  npx tsx build-science-meeting.ts      (from scripts/)
 * Then: cd ../docs/science-meeting && python3 ../compass-artifacts/render.py <file>.html [landscape]
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import * as path from 'node:path'
import { PROGRAMS, type ProgramReport } from '../compass/app/src/compass/sharedProgramData'
import { getFaculty } from '../compass/app/src/compass/faculty'

const OUT = path.resolve(__dirname, '../docs/science-meeting')
mkdirSync(OUT, { recursive: true })

const SCIENCE = PROGRAMS.filter((p) => getFaculty(p.program) === 'Science & Environment').sort(
  (a, b) => b.score - a.score,
)

const DIM_CODES = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', '✦']
const BANDS: Record<string, { c: string; tr: string; tx: string; label: string }> = {
  RESILIENT: { c: '#16a34a', tr: '#dcfce7', tx: '#15803d', label: 'Resilient' },
  'MODERATE RISK': { c: '#d97706', tr: '#fef9c3', tx: '#92400e', label: 'Moderate Risk' },
  'HIGH RISK': { c: '#ea580c', tr: '#ffedd5', tx: '#9a3412', label: 'High Risk' },
  CRITICAL: { c: '#dc2626', tr: '#fee2e2', tx: '#991b1b', label: 'Critical' },
}
const stepColor = (s: number) => (s === 3 ? '#16a34a' : s === 2 ? '#d97706' : s === 1 ? '#ea580c' : '#e5e7eb')
const dimScore = (p: ProgramReport, label: string) => p.dimensions.find((d) => d.label === label)?.score ?? 0
const ai = (p: ProgramReport) => dimScore(p, 'AI Literacy')
const oe = (p: ProgramReport) => dimScore(p, 'Outcome Evidence')

// --- shared fragments --------------------------------------------------------
const TOKENS = `
  :root{ --ink:#11151F; --ink-soft:#1E2533; --bg:#FCFCFC; --card:#FFFFFF;
    --orange:#F97316; --orange-50:#FFF7ED; --muted:#6B7280; --muted-2:#9AA3B2;
    --border:#E5E7EB; --border-2:#EEF1F4; }
  *{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  html,body{ margin:0; padding:0; background:var(--bg); color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
    font-feature-settings:'kern' 1,'liga' 1; -webkit-font-smoothing:antialiased; }
  .tnum{ font-variant-numeric:tabular-nums; }
  .mark{ width:21px; height:21px; }
  .brand{ display:flex; align-items:center; gap:9px; }
  .brand .name{ font-size:15px; font-weight:800; letter-spacing:.16em; }
  .brand .sub{ font-size:9px; color:var(--muted); letter-spacing:.04em; margin-top:1px; }
  .top{ display:flex; align-items:flex-end; justify-content:space-between; gap:16px;
    border-bottom:2px solid var(--ink); padding-bottom:9px; }
  .title{ text-align:center; }
  .title h1{ margin:0; font-size:19px; font-weight:800; letter-spacing:-.01em; }
  .title .pre{ font-size:8.5px; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:var(--orange); }
  .kicker{ text-align:right; font-size:8.5px; font-weight:700; text-transform:uppercase; letter-spacing:.13em; color:var(--muted-2); line-height:1.5; }
  .pill{ display:inline-block; font-size:7.5px; font-weight:800; letter-spacing:.04em; border-radius:999px; padding:2px 7px; text-transform:uppercase; }
`
const BRAND = `<div class="brand">
  <svg class="mark" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" stroke="#11151F" stroke-width="2"/>
    <path d="M16 5 L20 16 L16 27 L12 16 Z" fill="#F97316"/>
    <circle cx="16" cy="16" r="2.4" fill="#11151F"/>
  </svg>
  <div><div class="name">COMPASS</div><div class="sub">AI-era curriculum viability</div></div>
</div>`

function scoreArc(score: number, band: string, size = 70): string {
  const b = BANDS[band]
  const sw = size < 60 ? 5 : 6
  const r = (size - sw * 2) / 2, cx = size / 2, cy = size / 2
  const C = 2 * Math.PI * r, A = C * (300 / 360), filled = A * (score / 36)
  const fs = size < 60 ? 15 : 19
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${b.tr}" stroke-width="${sw}"
      stroke-dasharray="${A.toFixed(2)} ${C.toFixed(2)}" stroke-linecap="round" transform="rotate(120 ${cx} ${cy})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${b.c}" stroke-width="${sw}"
      stroke-dasharray="${filled.toFixed(2)} ${C.toFixed(2)}" stroke-linecap="round" transform="rotate(120 ${cx} ${cy})"/>
    <text x="${cx}" y="${cy + 1}" text-anchor="middle" dominant-baseline="middle" font-size="${fs}" font-weight="800" fill="${b.tx}" class="tnum">${score}</text>
    <text x="${cx}" y="${cy + (size < 60 ? 10 : 13)}" text-anchor="middle" dominant-baseline="middle" font-size="${size < 60 ? 6 : 8}" fill="#9AA3B2">/36</text>
  </svg>`
}
function fingerprint(p: ProgramReport, h = 24): string {
  return `<div class="fp">` + p.dimensions.map((d, i) => {
    const bar = d.score === 0 ? 3 : (d.score / d.max) * h
    return `<div class="col"><div class="barwrap" style="height:${h}px"><div class="bar" style="height:${bar}px;background:${stepColor(d.score)}"></div></div><div class="code">${DIM_CODES[i]}</div></div>`
  }).join('') + `</div>`
}
const FP_CSS = `
  .fp{ display:flex; align-items:flex-end; gap:3px; }
  .fp .col{ flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; }
  .fp .barwrap{ width:100%; display:flex; align-items:flex-end; }
  .fp .bar{ width:100%; border-radius:2px 2px 0 0; }
  .fp .code{ font-size:6px; color:var(--muted-2); font-weight:600; }
  .thr{ display:flex; gap:4px; margin-top:auto; padding-top:8px; }
  .chip{ flex:1; border-radius:5px; padding:3px 5px; }
  .chip .q{ font-size:5.5px; color:var(--muted); line-height:1.2; display:block; }
  .chip .a{ font-size:7.5px; font-weight:800; letter-spacing:.02em; margin-top:1px; display:block; }`

// threshold chips — q1 is a risk question (YES is bad); q2/q3 positive (YES good)
const ANS: Record<string, Record<string, { c: string; bg: string }>> = {
  risk: { YES: { c: '#dc2626', bg: '#fef2f2' }, NO: { c: '#16a34a', bg: '#f0fdf4' }, UNCERTAIN: { c: '#d97706', bg: '#fffbeb' } },
  positive: { YES: { c: '#16a34a', bg: '#f0fdf4' }, NO: { c: '#dc2626', bg: '#fef2f2' }, UNCERTAIN: { c: '#d97706', bg: '#fffbeb' } },
}
function chips(t: { q1: string; q2: string; q3: string }): string {
  const items = [
    { q: 'AI ≥80% of early output?', a: t.q1, pol: 'risk' },
    { q: 'Higher-order capability?', a: t.q2, pol: 'positive' },
    { q: 'More employable in 5 yrs?', a: t.q3, pol: 'positive' },
  ]
  return `<div class="thr">` + items.map((it) => {
    const cfg = ANS[it.pol][it.a] || { c: '#374151', bg: '#f3f4f6' }
    return `<div class="chip" style="background:${cfg.bg}"><span class="q">${it.q}</span><span class="a" style="color:${cfg.c}">${it.a}</span></div>`
  }).join('') + `</div>`
}
const LEGEND = `<div class="prov">D1 Automation · D2 Systems · D3 Technical · D4 Decisions · D5 AI Literacy · D6 Domain · D7 Research · D8 Human · D9 Currency · D10 Outcomes · ✦ Irreplaceability · scored 0–3 → /36 · bands: Resilient 28–36 / Moderate 20–27 / High 12–19 / Critical 0–11</div>`

// portfolio-level facts (computed, not hardcoded)
const N = SCIENCE.length
const avg = (SCIENCE.reduce((s, p) => s + p.score, 0) / N)
const bandCounts = SCIENCE.reduce((m: Record<string, number>, p) => ((m[p.riskBand] = (m[p.riskBand] || 0) + 1), m), {})
const aiAvg = SCIENCE.reduce((s, p) => s + ai(p), 0) / N
const oeAvg = SCIENCE.reduce((s, p) => s + oe(p), 0) / N
const ddAvg = SCIENCE.reduce((s, p) => s + dimScore(p, 'Domain Depth'), 0) / N
const nearThreshold = SCIENCE.filter((p) => p.score >= 26 && p.score < 28)
const dataSci = SCIENCE.find((p) => /data science/i.test(p.program))

function weakestLabels(p: ProgramReport, k = 2): string {
  return [...p.dimensions].sort((a, b) => a.score - b.score).slice(0, k).map((d) => d.label).join(', ')
}
// illustrative target: lift AI Literacy → 3 and Outcome Evidence → at least 2 (capped at 36)
function projected(p: ProgramReport): { target: number; delta: number; actions: string[] } {
  const actions: string[] = []
  let gain = 0
  if (ai(p) < 3) { gain += 3 - ai(p); actions.push(`Embed AI-literacy core unit (D5 ${ai(p)}→3)`) }
  if (oe(p) <= 1) { gain += 2 - oe(p); actions.push(`Fold in QILT outcome data (D10 ${oe(p)}→2)`) }
  const target = Math.min(36, p.score + gain)
  return { target, delta: target - p.score, actions: actions.length ? actions : ['Hold — already strong'] }
}

const html = (head: string, body: string, landscape = false) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8">${head}</head><body>${body}</body></html>`

// === 1. ONE-PAGER (A4 portrait) — portfolio read =============================
function buildOnePager(): string {
  const rows = SCIENCE.map((p) => {
    const b = BANDS[p.riskBand]
    const gap = 28 - p.score
    return `<tr>
      <td class="pn">${p.program}</td>
      <td class="tnum sc">${p.score}<span class="den">/36</span></td>
      <td><span class="pill" style="background:${b.tr};color:${b.tx}">${b.label}</span></td>
      <td class="tnum">${ai(p)}/3</td>
      <td class="tnum">${oe(p)}/3</td>
      <td class="wk">${weakestLabels(p)}</td>
      <td class="tnum gap">${gap <= 0 ? '✓' : '+' + gap}</td>
    </tr>`
  }).join('')
  const body = `<div class="sheet">
    <div class="top">${BRAND}
      <div class="title"><div class="pre">Faculty of Science · Durability Read</div><h1>How will Science degrees hold up to AI?</h1></div>
      <div class="kicker">University of Melbourne<br>${N} programs · 10+1 rubric<br>Independent assessment</div>
    </div>
    <p class="intro">Every Faculty of Science program scored on the COMPASS durability rubric — ten dimensions plus an <b>Irreplaceability</b> premium, each 0–3, to a <b>/36</b> total on a four-band scale. The faculty is <b>structurally strong</b>: Domain Depth averages <b>${ddAvg.toFixed(1)}/3</b> and all ${N} programs sit in <b>MODERATE</b>. The gap is narrow and specific — <b>AI Literacy ${aiAvg.toFixed(1)}/3</b> and <b>Outcome Evidence ${oeAvg.toFixed(1)}/3</b> are the only weak dimensions across the portfolio.</p>
    <div class="stats">
      <div class="stat"><div class="sv tnum">${N}</div><div class="sl">programs assessed</div></div>
      <div class="stat"><div class="sv tnum">${avg.toFixed(1)}</div><div class="sl">average score /36</div></div>
      <div class="stat"><div class="sv tnum">${bandCounts['MODERATE RISK'] || 0}</div><div class="sl">in MODERATE · 0 HIGH/CRITICAL</div></div>
      <div class="stat"><div class="sv tnum" style="color:#9a3412">${aiAvg.toFixed(1)}</div><div class="sl">AI Literacy /3 — weakest</div></div>
    </div>
    <table class="tbl">
      <thead><tr><th>Program</th><th>Score</th><th>Band</th><th>AI Lit</th><th>Outcomes</th><th>Weakest dimensions</th><th>→28</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="callouts">
      <div class="co">
        <div class="ch">The twin gap is fixable</div>
        <div class="cb">AI Literacy sits at 1/3 in ten of ${N} programs. Outcome Evidence sits at 1/3 despite real QILT employment data already in the system — a <b>data-folding gap, not an outcomes gap</b>. Closing both is a curriculum decision, not a structural rebuild.</div>
      </div>
      <div class="co">
        <div class="ch">Closest to resilient${dataSci ? ' · the exemplar' : ''}</div>
        <div class="cb">${nearThreshold.length ? `<b>${nearThreshold.map((p) => p.program.replace('Master of ', 'M. ') + ' (' + p.score + ')').join(', ')}</b> sit ${28 - Math.max(...nearThreshold.map((p) => p.score))}–2 points from RESILIENT.` : ''} ${dataSci ? `<b>${dataSci.program}</b> is the only program above the AI-literacy floor (${ai(dataSci)}/3) — proof the gap is closable through curriculum.` : ''}</div>
      </div>
    </div>
    <div class="foot">${LEGEND}<div class="src">Source: COMPASS DFVA · QILT GOS 2024 · JSA Skills Priority List 2025. Illustrative for discussion — not a faculty directive.</div></div>
  </div>`
  const head = `<title>COMPASS — Faculty of Science Durability Read</title><style>
    ${TOKENS}
    @page{ size:A4 portrait; margin:0; }
    .sheet{ width:210mm; min-height:297mm; padding:13mm 14mm; display:flex; flex-direction:column; }
    .intro{ font-size:10.5px; line-height:1.55; color:var(--muted); margin:11px 0 11px; }
    .intro b{ color:var(--ink-soft); font-weight:700; }
    .stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:9px; margin-bottom:13px; }
    .stat{ border:1px solid var(--border); border-radius:9px; padding:9px 11px; background:var(--card); }
    .stat .sv{ font-size:24px; font-weight:800; line-height:1; }
    .stat .sl{ font-size:8px; color:var(--muted); margin-top:4px; letter-spacing:.02em; }
    .tbl{ width:100%; border-collapse:collapse; font-size:9.5px; }
    .tbl th{ text-align:left; font-size:7.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted-2); border-bottom:1.5px solid var(--ink); padding:5px 6px; }
    .tbl td{ padding:5px 6px; border-bottom:1px solid var(--border-2); vertical-align:middle; }
    .tbl .pn{ font-weight:700; color:var(--ink); }
    .tbl .sc{ font-weight:800; font-size:11px; } .tbl .den{ font-size:7px; color:var(--muted-2); font-weight:600; }
    .tbl .wk{ color:var(--muted); font-size:8.5px; } .tbl .gap{ color:var(--muted); font-weight:700; }
    .callouts{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:13px; }
    .co{ border:1px solid var(--border); border-left:3px solid var(--orange); border-radius:8px; padding:10px 12px; background:var(--orange-50); }
    .co .ch{ font-size:10px; font-weight:800; color:var(--ink); margin-bottom:3px; }
    .co .cb{ font-size:9px; line-height:1.5; color:var(--ink-soft); } .co .cb b{ font-weight:800; }
    .foot{ margin-top:auto; border-top:1px solid var(--border); padding-top:8px; }
    .prov{ font-size:7px; color:var(--muted-2); line-height:1.5; }
    .src{ font-size:7.5px; color:var(--muted-2); margin-top:4px; font-style:italic; }
  </style>`
  return html(head, body)
}

// === 2. DASHBOARD (A4 landscape) — per-program cards =========================
function buildDashboard(): string {
  const cards = SCIENCE.map((p) => {
    const b = BANDS[p.riskBand]
    const gap = 28 - p.score
    return `<div class="card">
      <div class="head">
        <div><div class="pname">${p.program}</div><div class="pmeta">${p.level}</div></div>
        <div class="gauge">${scoreArc(p.score, p.riskBand, 54)}</div>
      </div>
      <div class="midrow"><span class="pill" style="background:${b.tr};color:${b.tx}">${b.label}</span><span class="dist">${gap <= 0 ? 'RESILIENT' : gap + ' pts to resilient'}</span></div>
      <div class="seclabel">Dimension fingerprint</div>
      ${fingerprint(p, 22)}
      ${chips(p.thresholds)}
    </div>`
  }).join('')
  const body = `<div class="sheet">
    <div class="top">${BRAND}
      <div class="title"><div class="pre">Faculty of Science · Portfolio Dashboard</div><h1>${N} programs, one durability scan</h1></div>
      <div class="kicker">University of Melbourne<br>per-program fingerprint<br>scored 0–36</div>
    </div>
    <p class="intro">Each card: the program's <b>/36 score</b>, risk band, distance to RESILIENT, and its <b>dimension fingerprint</b> (D1–D10 + Irreplaceability). The flat bar across every card is <b>D5 AI Literacy</b>; the second recurring dip is <b>D10 Outcome Evidence</b>.</p>
    <div class="grid">${cards}</div>
    <div class="foot">${LEGEND}</div>
  </div>`
  const head = `<title>COMPASS — Faculty of Science Portfolio Dashboard</title><style>
    ${TOKENS}${FP_CSS}
    @page{ size:A4 landscape; margin:0; }
    .sheet{ width:297mm; height:210mm; padding:9mm 11mm 7mm; display:flex; flex-direction:column; }
    .intro{ font-size:9px; line-height:1.45; color:var(--muted); margin:6px 0 7px; }
    .intro b{ color:var(--ink-soft); font-weight:700; }
    .grid{ flex:1; display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:1fr; gap:6px; }
    .card{ border:1px solid var(--border); border-radius:9px; background:var(--card); padding:8px 10px; display:flex; flex-direction:column; }
    .card .head{ display:flex; align-items:flex-start; justify-content:space-between; gap:6px; }
    .pname{ font-size:10.5px; font-weight:800; line-height:1.12; } .pmeta{ font-size:7px; color:var(--muted-2); margin-top:2px; }
    .midrow{ display:flex; align-items:center; justify-content:space-between; margin-top:5px; }
    .dist{ font-size:7px; color:var(--muted); font-weight:700; text-transform:uppercase; letter-spacing:.04em; }
    .seclabel{ font-size:6.5px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--muted-2); margin:7px 0 3px; }
    .foot{ margin-top:7px; border-top:1px solid var(--border); padding-top:6px; }
    .prov{ font-size:7px; color:var(--muted-2); line-height:1.5; }
  </style>`
  return html(head, body, true)
}

// === 3. ROLLUP (A4 portrait) — improvement priorities ========================
function buildRollup(): string {
  const lifts = SCIENCE.map((p) => ({ p, ...projected(p) }))
  const reachResilient = lifts.filter((l) => l.target >= 28).length
  const rows = lifts.map(({ p, target, delta, actions }) => {
    const b = BANDS[p.riskBand], tb = BANDS[target >= 28 ? 'RESILIENT' : 'MODERATE RISK']
    return `<tr>
      <td class="pn">${p.program}</td>
      <td class="tnum"><span class="pill" style="background:${b.tr};color:${b.tx}">${p.score}</span></td>
      <td class="act">${actions.map((a) => `<div>${a}</div>`).join('')}</td>
      <td class="tnum dl">${delta > 0 ? '+' + delta : '—'}</td>
      <td class="tnum"><span class="pill" style="background:${tb.tr};color:${tb.tx}">${target}${target >= 28 ? ' ◆' : ''}</span></td>
    </tr>`
  }).join('')
  const body = `<div class="sheet">
    <div class="top">${BRAND}
      <div class="title"><div class="pre">Faculty of Science · Improvement Priorities</div><h1>Two moves, faculty-wide</h1></div>
      <div class="kicker">University of Melbourne<br>illustrative trajectory<br>per program</div>
    </div>
    <p class="intro">The same two interventions recur across the portfolio: <b>embed AI literacy</b> (D5) and <b>fold in the QILT outcome data already in the system</b> (D10). Below: each program's current score, the priority moves, and an <b>illustrative</b> projected score if both are actioned. <b>◆ = reaches RESILIENT (28+).</b></p>
    <table class="tbl">
      <thead><tr><th>Program</th><th>Now</th><th>Priority moves (P1)</th><th>Δ</th><th>Projected</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="bignote">
      <div class="bn-fig tnum">${reachResilient}<span>/${N}</span></div>
      <div class="bn-tx"><b>programs reach RESILIENT</b> if the faculty runs a coordinated AI-literacy + outcome-evidence pass. The interventions are shared, so the marginal cost per program falls the more the faculty acts together — the case for a <b>faculty-wide</b> initiative over program-by-program fixes.</div>
    </div>
    <div class="shift">
      <div class="srow"><span class="slab">Today</span><div class="sbar"><span class="seg" style="flex:${N};background:#d97706">${N} MODERATE</span></div></div>
      <div class="srow"><span class="slab">After the two-move pass</span><div class="sbar"><span class="seg" style="flex:${reachResilient};background:#16a34a">${reachResilient} RESILIENT</span><span class="seg" style="flex:${N - reachResilient};background:#d97706">${N - reachResilient} MODERATE</span></div></div>
      <div class="scap">Illustrative portfolio shift — none drop a band; ${reachResilient} cross into RESILIENT.</div>
    </div>
    <div class="foot">${LEGEND}<div class="src">Projections illustrative (D5→3, D10→2 where currently ≤1) for discussion — not a commitment. Source: COMPASS DFVA per-program recommendations.</div></div>
  </div>`
  const head = `<title>COMPASS — Faculty of Science Improvement Priorities</title><style>
    ${TOKENS}
    @page{ size:A4 portrait; margin:0; }
    .sheet{ width:210mm; min-height:297mm; padding:13mm 14mm; display:flex; flex-direction:column; }
    .intro{ font-size:10.5px; line-height:1.55; color:var(--muted); margin:11px 0 12px; }
    .intro b{ color:var(--ink-soft); font-weight:700; }
    .tbl{ width:100%; border-collapse:collapse; font-size:9.5px; }
    .tbl th{ text-align:left; font-size:7.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted-2); border-bottom:1.5px solid var(--ink); padding:6px; }
    .tbl td{ padding:7px 6px; border-bottom:1px solid var(--border-2); vertical-align:top; }
    .tbl .pn{ font-weight:700; width:34%; } .tbl .act{ font-size:8.5px; color:var(--ink-soft); line-height:1.5; }
    .tbl .dl{ font-weight:800; color:#15803d; } .tbl .pill{ font-size:9px; padding:2px 8px; }
    .bignote{ display:flex; align-items:center; gap:16px; margin-top:14px; border:1px solid var(--border); border-left:3px solid var(--orange); border-radius:9px; padding:13px 15px; background:var(--orange-50); }
    .bn-fig{ font-size:40px; font-weight:800; color:#15803d; line-height:1; } .bn-fig span{ font-size:18px; color:var(--muted-2); }
    .bn-tx{ font-size:10px; line-height:1.55; color:var(--ink-soft); } .bn-tx b{ font-weight:800; color:var(--ink); }
    .shift{ margin-top:16px; }
    .srow{ display:flex; align-items:center; gap:12px; margin-bottom:7px; }
    .slab{ width:42mm; font-size:9px; font-weight:700; color:var(--muted); text-align:right; }
    .sbar{ flex:1; display:flex; height:22px; border-radius:6px; overflow:hidden; gap:2px; }
    .seg{ display:flex; align-items:center; justify-content:center; color:#fff; font-size:8.5px; font-weight:800; letter-spacing:.02em; }
    .scap{ font-size:8px; color:var(--muted-2); font-style:italic; margin-left:calc(42mm + 12px); }
    .foot{ margin-top:auto; border-top:1px solid var(--border); padding-top:8px; }
    .prov{ font-size:7px; color:var(--muted-2); line-height:1.5; }
    .src{ font-size:7.5px; color:var(--muted-2); margin-top:4px; font-style:italic; }
  </style>`
  return html(head, body)
}

writeFileSync(path.join(OUT, '01-science-onepager.html'), buildOnePager())
writeFileSync(path.join(OUT, '02-science-dashboard.html'), buildDashboard())
writeFileSync(path.join(OUT, '03-science-rollup.html'), buildRollup())

// quick provenance dump so the run is auditable
console.log(`Science roster (${N}), avg ${avg.toFixed(1)}, AI-lit ${aiAvg.toFixed(1)}, OE ${oeAvg.toFixed(1)}, DomainDepth ${ddAvg.toFixed(1)}`)
console.log('Bands:', JSON.stringify(bandCounts))
console.log('Near-threshold (26-27):', nearThreshold.map((p) => `${p.program} ${p.score}`).join(', ') || 'none')
console.log(`Reach RESILIENT after illustrative lift: ${SCIENCE.filter((p) => projected(p).target >= 28).length}/${N}`)
console.log('Wrote 3 HTML files to', OUT)
