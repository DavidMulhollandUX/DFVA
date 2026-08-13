# DFVA v4 Agent Harness — Panel C v4 report generation

**Status:** ready to run — the [recommendation](dfva-panelc-v4-recommendation.md)'s
§7 decisions 1–2 were taken 2026-08-13 (v4 adopted as working draft; IRR targets v4).
Output remains *draft* artifacts: nothing renders on the site until the v4 migration
cycle is published (§4 of the recommendation forbids silent re-positioning).

**Instrument single source:** `dfva/source/rubricV4.ts` →
`npm --prefix scripts run dfva:gen-v4` →

| Generated artifact | Role |
| --- | --- |
| `dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md` | The scoring agent's full prompt: anchors, R1–R3 rules, gates, output JSON contract, numbered references |
| `dfva/dist/v4/report-template-v4.md` | Canonical report template for the site (`reports/dfva-v4-<code>.md` family), with literature references and per-section epistemic-status tags |

Never hand-edit the dist files; edit `rubricV4.ts` and regenerate — the same
discipline `dfva:gen` enforces for v1.

---

## Pipeline (per program)

```text
handbook URL ─┐
              ├─ 1 SCRAPE    Crawl4AI → course page + core-unit pages (text extract)
program code ─┘
              2 SCORE        agent follows DFVA-V4-SCORING-PROMPT.md → panelCv4 JSON
              3 VERIFY       adversarial pass: refute every level-3 and every gate PASS;
                             mechanical pass: every evidenceLine greps verbatim in the scrape
              4 PERSIST      dfva/source/evidence/<code>.json gains the panelCv4 block
              5 REPORT       draft reports/dfva-v4-<code>.md per report-template-v4.md
              6 LINT         template rules 1–6 (v4 family; to be added to check-report-format.ts)
```

Stage rules:

- **1 SCRAPE** — `PYTHONPATH="" bash ~/.hermes/scripts/crawl4ai_scrape.sh "<url>"`.
  Score only from the scrape (prompt rule); same handbook vintage for every
  program in a cycle (recommendation §4.2).
- **2 SCORE** — the prompt enforces R1 (declarative evidence), R2 (level 3 needs
  *assessment* evidence; outcomes-only caps at 1), R3 (verbatim evidence lines),
  ambiguity-resolves-down, and never emits an Irreplaceability score.
- **3 VERIFY** — two independent checks. *Adversarial:* a second agent, given only
  the scrape and the anchors, tries to refute each level-3 score and each gate
  PASS; a refuted claim drops a level and the disagreement is logged in
  `ambiguities`. *Mechanical:* every `evidenceLines` entry must appear verbatim
  in the scrape text — an unquotable line fails the run, mirroring the
  build-fails-on-unmapped-title rule in the Panel A extension protocol.
- **4 PERSIST** — the `panelCv4` block *extends* the existing evidence file; the
  v1 `byDimension` block stays untouched (both instruments coexist through the
  migration, as v2/v3/v3.1 do today).
- **5 REPORT** — Panel A exposure, position and stability figures come from the
  existing generators (`dfva-v3-panela.ts` / `dfva-v31-panela.ts` machinery),
  never from the scoring agent. Position renders only per the v3.1 §5.2
  stability rules, against medians re-based in the published v4 cycle.
- **6 LINT** — the six rules at the foot of `report-template-v4.md`, including:
  every scorecard row cites a reference number, section 5 opens with the
  mandatory interpretation sentence, and no v1 composite or Irreplaceability
  score appears anywhere.

## The panelCv4 evidence contract

Written into `dfva/source/evidence/<code>.json` (shape defined in the scoring
prompt's output section):

```json
{
  "panelCv4": {
    "C1": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "C2": { "score": 1, "rationale": "…", "evidenceLines": ["…"] },
    "C3": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "C4": { "score": 1, "rationale": "…", "evidenceLines": ["…"] },
    "C5": { "score": 2, "rationale": "…", "evidenceLines": ["…"] },
    "adaptiveness": 8,
    "gates": {
      "G1": { "result": "PASS", "rationale": "…", "evidenceLines": ["…"] },
      "G2": { "result": "PASS", "rationale": "…", "evidenceLines": ["…"] }
    },
    "ambiguities": [],
    "notScoreable": [],
    "verified": { "adversarial": true, "mechanical": true, "date": "YYYY-MM-DD" }
  }
}
```

## Batch Workflow script

Run with `Workflow({script, args: ["244cw", "mc-cs", …]})` — one pipeline chain
per program, no barriers between programs. The scoring prompt is read from dist
at run time so the workflow never embeds a copy of the rubric.

```js
export const meta = {
  name: 'dfva-v4-score',
  description: 'Score programs on Panel C v4 and draft v4 reports (draft artifacts only)',
  phases: [
    { title: 'Scrape', detail: 'Crawl4AI handbook extract per program' },
    { title: 'Score', detail: 'Panel C v4 scoring per DFVA-V4-SCORING-PROMPT.md' },
    { title: 'Verify', detail: 'adversarial refutation + verbatim evidence check' },
    { title: 'Draft', detail: 'evidence block + v4 report draft' },
  ],
}
const codes = args
if (!Array.isArray(codes) || codes.length === 0) throw new Error('args must be a non-empty array of program codes')

const ITEM = { type: 'object', required: ['score', 'rationale', 'evidenceLines'],
  properties: { score: { type: 'integer', minimum: 0, maximum: 3 }, rationale: { type: 'string' },
    evidenceLines: { type: 'array', items: { type: 'string' } } } }
const GATE = { type: 'object', required: ['result', 'rationale', 'evidenceLines'],
  properties: { result: { enum: ['PASS', 'FAIL'] }, rationale: { type: 'string' },
    evidenceLines: { type: 'array', items: { type: 'string' } } } }
const SCORE_SCHEMA = { type: 'object', required: ['code', 'panelCv4'],
  properties: { code: { type: 'string' },
    panelCv4: { type: 'object', required: ['C1','C2','C3','C4','C5','adaptiveness','gates'],
      properties: { C1: ITEM, C2: ITEM, C3: ITEM, C4: ITEM, C5: ITEM,
        adaptiveness: { type: 'integer', minimum: 0, maximum: 15 },
        gates: { type: 'object', required: ['G1','G2'], properties: { G1: GATE, G2: GATE } },
        ambiguities: { type: 'array', items: { type: 'string' } },
        notScoreable: { type: 'array', items: { type: 'string' } } } } } }
const VERDICT = { type: 'object', required: ['upheld', 'demotions'],
  properties: { upheld: { type: 'boolean' },
    demotions: { type: 'array', items: { type: 'object', required: ['item', 'to', 'why'],
      properties: { item: { type: 'string' }, to: { type: 'integer' }, why: { type: 'string' } } } } } }

const results = await pipeline(
  codes,
  (code) => agent(
    `Scrape the University of Melbourne handbook for program code ${code} using: ` +
    `PYTHONPATH="" bash ~/.hermes/scripts/crawl4ai_scrape.sh "<course url>" (find the URL from ` +
    `compass/app/src/compass/sharedProgramData.ts handbookUrl, or handbook.unimelb.edu.au search). ` +
    `Also scrape each CORE unit page linked from the course structure. Save the combined text ` +
    `extract to scrapes/v4/${code}.txt and return the absolute path plus a one-line coverage note.`,
    { label: `scrape:${code}`, phase: 'Scrape' }),
  (scrapeResult, code) => agent(
    `Read dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md and follow it EXACTLY to score program ` +
    `${code} from the handbook extract described here: ${scrapeResult}. Read the extract file. ` +
    `Return the JSON contract the prompt specifies.`,
    { label: `score:${code}`, phase: 'Score', schema: SCORE_SCHEMA }),
  (scored, code) => agent(
    `Adversarially verify this Panel C v4 scoring for ${code}: ${JSON.stringify(scored.panelCv4)}. ` +
    `Read the anchors in dfva/dist/v4/DFVA-V4-SCORING-PROMPT.md and the extract at scrapes/v4/${code}.txt. ` +
    `Try to REFUTE every level-3 score (does quoted ASSESSMENT evidence really exist?) and every ` +
    `gate PASS. Also verify each evidenceLines entry appears verbatim in the extract; a missing ` +
    `line demotes that item to the highest level its remaining evidence supports.`,
    { label: `verify:${code}`, phase: 'Verify', schema: VERDICT })
    .then((v) => ({ scored, verdict: v })),
  (r, code) => agent(
    `Apply these verified Panel C v4 results for ${code}: ${JSON.stringify(r)}. ` +
    `(1) Apply any demotions to the scores and recompute adaptiveness. ` +
    `(2) Merge the panelCv4 block (with a "verified" stamp) into dfva/source/evidence/${code}.json, ` +
    `preserving the existing v1 byDimension content. ` +
    `(3) Draft reports/dfva-v4-${code}.md following dfva/dist/v4/report-template-v4.md exactly — ` +
    `including the Basis: tags, the mandatory section-5 opening sentence, scorecard reference ` +
    `numbers, and the verbatim REFERENCES list. Leave POSITION's exposure/stability figures as ` +
    `"pending v4 cycle" placeholders unless v3 Panel A data exists for this code. ` +
    `Return {code, adaptiveness, gates, reportPath}.`,
    { label: `draft:${code}`, phase: 'Draft',
      schema: { type: 'object', required: ['code', 'adaptiveness', 'reportPath'],
        properties: { code: { type: 'string' }, adaptiveness: { type: 'integer' },
          gates: { type: 'object' }, reportPath: { type: 'string' } } } }),
)
return { drafted: results.filter(Boolean) }
```

## Guards & open wiring (in dependency order)

1. **Now enforced by the prompt/template:** R1–R3, ambiguity-down, no
   Irreplaceability, reference-numbered scorecard, epistemic-status tags.
2. **To wire when v4 is adopted (§7 yes):**
   - v4 family in `check-report-format.ts` (lint rules are already written at the
     foot of the template);
   - `panelCv4` awareness in `check-course-completeness.ts`;
   - medians + migration table generator (extend `dfva-v31-panela.ts` machinery —
     the 3⁵ enumeration transfers unchanged);
   - ~~site surface~~ **built 2026-08-13**: `V4ReportPage` at `/insights/v4/:code`
     reuses the v3.1 display grammar (Part A/B/C, expandable rated items, mini
     matrix with a neutral dot and v3.1 reference medians drawn for context
     only). Data: `dfva:gen-v4` now also emits
     `compass/app/src/compass/v4/data/{v4Rubric,v4PanelC}.ts` from
     `rubricV4.ts` + the evidence files' `panelCv4` blocks.
3. **Deliberately not built:** anything that re-bases the published v3.1 medians
   or renders a v4 position on the site — that is the published migration cycle,
   a decision, not a script.

## Literature trail

Item-level references are embedded in the instrument
([rubricV4.ts](../dfva/source/rubricV4.ts) `V4_REFERENCES`, rendered into both
dist artifacts and every report's REFERENCES section). Verification of each
source against full text: [literature review](dfva-adaptiveness-literature-review.md).
Construct authority: Lodge et al. (2026), TEQSA. Validity-argument frame for the
evidence plan: Kane (2013), per recommendation §5.
