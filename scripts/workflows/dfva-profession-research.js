export const meta = {
  name: 'dfva-profession-research',
  description: 'Real 5-lane profession research (L1-L5), batched refute+scope, persist to data/professions/<key>.json',
  phases: [
    { title: 'Lanes' },
    { title: 'Refute+Scope' },
    { title: 'Persist' },
  ],
}

// args: [{ key, title, aliases, programs }, ...]  (key = onet_soc_code OR field code)
const PROFESSIONS = args

const TODAY = '2026-08-31'
const WINDOW_FROM = '2025-03-01'

const NO_FAB_CONTRACT = `
NO-FABRICATION CONTRACT:
1. A source you have not actually retrieved does not exist. Before citing a URL, publisher, study, or figure, you MUST have made a real WebSearch or WebFetch call and observed real content confirming it. Never construct a URL from a pattern.
2. If a genuine search (2-3 phrasings) finds nothing solid, return an EMPTY claims array and log the failed queries in "searchesReturningNothing". An empty result is a pass. A fabricated one is not.
3. Never invent an outlet, a date, or a figure to make a claim look sourced. Dropping a claim is acceptable; a fabricated citation is not.
4. The UoM handbook is not admissible as a source (scrapes/v4/**) — market claims must be independent of what Panel C is scored from.
5. University marketing copy can seed a hypothesis but is never the only support for a claim.
6. Quote at most one short passage per source, with attribution.
7. Do not create accounts, complete OAuth flows, or solve CAPTCHAs. If a source needs one, skip it and log the gap.
`.trim()

const CLAIM_SCHEMA = {
  type: 'object',
  properties: {
    claims: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          text: { type: 'string' },
          lane: { type: 'string', enum: ['L1', 'L2', 'L3', 'L4', 'L5'] },
          tier: { type: 'string' },
          sources: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                publisher: { type: 'string' },
                title: { type: 'string' },
                url: { type: 'string' },
                date: { type: 'string' },
                whatItMeasured: { type: 'string' },
              },
              required: ['publisher', 'url', 'whatItMeasured'],
            },
          },
          scope: { type: 'string' },
        },
        required: ['id', 'text', 'lane', 'sources', 'scope'],
      },
    },
    searchesReturningNothing: { type: 'array', items: { type: 'string' } },
  },
  required: ['claims', 'searchesReturningNothing'],
}

const REFUTE_SCOPE_SCHEMA = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          refuted: { type: 'boolean' },
          reasoning: { type: 'string' },
          scope: { type: 'string' },
          disposition: { type: 'string', enum: ['sourced', 'scoped', 'corrected', 'removed'] },
        },
        required: ['id', 'refuted', 'reasoning', 'scope', 'disposition'],
      },
    },
  },
  required: ['verdicts'],
}

function lanePrompt(prof, lane) {
  const base = `${NO_FAB_CONTRACT}

You are researching the occupation "${prof.title}" (key: ${prof.key}, aliases: ${(prof.aliases||[]).join(', ')}) for the DFVA project's profession discourse ledger.
Window: ${WINDOW_FROM} to ${TODAY}. Use real WebSearch and WebFetch tool calls — do not answer from prior knowledge alone.

Write 2-4 claims in this exact shape (return via the claims array):
{"id":"c1","text":"<the claim, one sentence>","lane":"${lane}","tier":"<short tier label>","sources":[{"publisher":"...","title":"...","url":"...","date":"YYYY-MM-DD or best known","whatItMeasured":"population/method/sample, one sentence"}],"scope":"<what this claim does NOT support, one sentence>"}

Return at most 4 claims. If a genuine 2-3 phrasing search finds nothing solid for this lane, return an empty claims array and list the exact queries you tried in searchesReturningNothing.`

  const laneRules = {
    L1: `LANE L1 — regulatory and standards instruments. Search legislation registers, regulator media releases, professional accreditation/registration bodies, standard forms/codes of conduct that bind this occupation. Supports: what binds the occupation, with a date. Does NOT support sentiment or what the profession thinks. Look for Australian regulators first (e.g. state professional registration boards, ASQA, relevant Commonwealth regulator); a US/UK equivalent is admissible only if scoped as such.`,
    L2: `LANE L2 — scholarly and institutional studies. Search NBER, SSRN, Productivity Commission, ABS, Jobs and Skills Australia (JSA), and general scholarly search for a peer-reviewed or institutional study estimating AI/automation exposure, task change, or labour-market effect on this occupation, with an effect size and population. Supports: an effect with a size and a population. Does NOT support: applying a US effect to Australia without saying so — if a study is US/UK-only, say so in scope.`,
    L3: `LANE L3 — trade press and professional-body publications. Search dated news/trade coverage (industry publications, professional body newsletters, business press) about this occupation and AI/automation/technology change. Supports: dated, attributable reporting. Does NOT support: the primary study it summarises (that's L2) — if an article cites a study, note the study separately in scope, don't present the article's paraphrase as the primary finding.`,
    L5: `LANE L5 — practitioner discourse. Search for practitioner blogs, professional-body newsletters, public forum discussion (public web search only — do not fetch reddit.com directly, it's blocked; search for reddit threads via general web search and cite the search result if content is visible, otherwise skip), podcast transcripts, or public LinkedIn *articles* (not feed/posts) where practitioners in this occupation discuss AI/automation/technology change in their own work, unprompted. Supports: what practitioners raise unprompted, with counts if you can establish them. Does NOT support: prevalence in the whole profession — a forum is self-selected, say so in scope.`,
  }
  return `${base}\n\n${laneRules[lane]}`
}

async function researchProfession(prof) {
  const lanes = ['L1', 'L2', 'L3', 'L5']
  const laneResults = await Promise.all(
    lanes.map((lane) =>
      agent(lanePrompt(prof, lane), {
        label: `${prof.key}:${lane}`,
        phase: 'Lanes',
        schema: CLAIM_SCHEMA,
      }).catch(() => null)
    )
  )

  const allClaims = []
  const searchesReturningNothing = []
  laneResults.forEach((r, laneIdx) => {
    if (!r) return
    const lane = lanes[laneIdx]
    // Lane agents each number their own claims "c1", "c2"... independently, so ids
    // collide across lanes within one profession. Rewrite to a globally-unique id
    // now, before anything downstream keys a lookup by id.
    ;(r.claims || []).forEach((c, i) => allClaims.push({ ...c, id: `${lane}-${i + 1}` }))
    for (const q of r.searchesReturningNothing || []) searchesReturningNothing.push(q)
  })

  // Dedup by normalized text + first source URL (code, not an agent)
  const seen = new Set()
  const deduped = []
  for (const c of allClaims) {
    const url = (c.sources && c.sources[0] && c.sources[0].url) || ''
    const key = (c.text || '').trim().toLowerCase().slice(0, 80) + '|' + url
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(c)
  }

  log(`${prof.key}: ${allClaims.length} raw claims -> ${deduped.length} deduped`)
  return { prof, claims: deduped, searchesReturningNothing }
}

function refuteScopePrompt(prof, claims) {
  return `${NO_FAB_CONTRACT}

You are adversarially refuting a batch of research claims about the occupation "${prof.title}", one skeptic covering all three lenses per claim. For EACH claim below, in order:

1. Check whether the source is genuinely real and its URL plausibly resolves to content matching the quote (use a real WebSearch/WebFetch call — do not skip verification).
2. Check whether the source actually measures the population named in the claim (this occupation, in the stated geography) — not a different occupation, a different country, or a broader/narrower group.
3. Check whether the source falls within the window ${WINDOW_FROM} to ${TODAY} and whether the claim's framing is still current.

Default to refuted=true on any claim you cannot verify or where any of the three checks fails. Only set refuted=false if the claim holds up on all three.

For every claim that survives (refuted=false), also write a tightened "scope" sentence — what it does NOT support (wrong geography, wrong seniority band, a US finding applied to Australia, a demand-side ad count mistaken for a destination claim) — improving on the existing scope field if it's vague, and set disposition: "sourced" if it stands as-is, "scoped" if you tightened its scope materially, "corrected" if you fixed a factual error in the text. For claims you refute, still return a scope string (can just restate why) and set disposition:"removed".

Claims:
${JSON.stringify(claims, null, 2)}

Return one verdict object per claim id, in the same order.`
}

async function refuteScopeProfession(prof, claims) {
  if (claims.length === 0) return []
  const result = await agent(refuteScopePrompt(prof, claims), {
    label: `${prof.key}:refute-scope`,
    phase: 'Refute+Scope',
    schema: REFUTE_SCOPE_SCHEMA,
  }).catch(() => ({ verdicts: claims.map((c) => ({ id: c.id, refuted: true, reasoning: 'agent error, defaulting to refuted', scope: c.scope || '', disposition: 'removed' })) }))
  const byId = new Map((result.verdicts || []).map((v) => [v.id, v]))
  return claims
    .map((c) => {
      const v = byId.get(c.id)
      if (!v) return null // no verdict returned for this id -> treat as unresolved, drop
      return { ...c, scope: v.scope || c.scope, disposition: v.disposition, refuted: v.refuted }
    })
    .filter((c) => c && !c.refuted)
}

async function persistProfession(prof, survivingClaims, searchesReturningNothing) {
  const l1l2 = survivingClaims.filter((c) => c.lane === 'L1' || c.lane === 'L2').length
  const l3 = survivingClaims.filter((c) => c.lane === 'L3').length
  const l5 = survivingClaims.filter((c) => c.lane === 'L5').length
  let confidence = 'low'
  if (l1l2 >= 2 && l5 >= 1) confidence = 'high'
  else if (l3 >= 1 || l1l2 >= 1) confidence = 'medium'

  const record = {
    onet_soc_code: prof.key,
    title: prof.title,
    aliases: prof.aliases || [],
    window: { from: WINDOW_FROM, to: TODAY },
    generated: TODAY,
    expires: '2027-02-28',
    programs: prof.programs || [],
    claims: survivingClaims.filter((c) => c.disposition !== 'removed'),
    jobAds: prof.jobAds || { source: 'none', query: '', window: '', count: 0, topEmployers: [], topSkills: [] },
    corpus: {
      platforms: [],
      retrieved: TODAY,
      searchesReturningNothing: [...searchesReturningNothing, 'Factiva: no interactive OpenAthens session in this run', 'LinkedIn: no linkedin-mcp-search tool connected in this session'],
    },
    confidence,
    caveats: ['Factiva (L3 premium trade press) unavailable — no interactive OpenAthens session', 'LinkedIn feed/post scraping out of scope by policy; article-only search attempted under L5'],
  }
  return record
}

phase('Lanes')
const laneOut = await pipeline(
  PROFESSIONS,
  (prof) => researchProfession(prof),
  async (research) => {
    phase('Refute+Scope')
    const scoped = await refuteScopeProfession(research.prof, research.claims)
    log(`${research.prof.key}: ${scoped.length}/${research.claims.length} claims survived refute+scope`)
    return { ...research, scoped }
  },
  async (research) => {
    phase('Persist')
    const record = await persistProfession(research.prof, research.scoped, research.searchesReturningNothing)
    return { prof: research.prof, record }
  }
)

return { professions: laneOut.map((r) => ({ key: r.prof.key, claims: r.record.claims.length, confidence: r.record.confidence })), records: laneOut.map((r) => r.record) }
