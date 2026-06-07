# DFVA Instrument Duplication Audit

_Canonical source of truth: `dfva/source/rubric.ts` (`RUBRIC`, `RISK_BANDS`, `THRESHOLD_QUESTIONS`, `MAX_SCORE = 36`, `RiskBandName`), propagated by `npm --prefix scripts run dfva:gen` into registered targets (e.g. `.github/copilot-instructions.md`, `.github/prompts/*`, `.github/agents/*`)._

## 0. Resolution status (2026-06-07)

**Remediated:**
- **Prompt files** — the Continue prompt (`.continue/prompts/dfva.md`) is now generated with `{{riskBandsList}}`; `.github/prompts/dfva*.prompt.md` + `.github/agents/dfva-*.agent.md` now *reference* `.github/copilot-instructions.md` for the bands instead of copying them.
- **`Act as a prompt engineer…md`** — deprecation banner added; the embedded rubric / risk-bands / threshold-question tables (and the Option B band line) replaced with pointers to the generated `.github/copilot-instructions.md`.
- **Global `~/.claude/skills/dfva/SKILL.md`** — now generated from `dfva/source/rubric.ts` into `dfva/dist/claude-skill/SKILL.md` (tokens `{{rubricTableCondensed}}` / `{{riskBandsTable}}` / `{{thresholdQuestionsList}}`) and pushed to the live location via `npm --prefix scripts run dfva:sync-skill`.
- **Spelling** — the canonical was Australianised (Specialisation, Rigour, labour, Behaviour) and propagated to every generated file.

**Intentionally left as-is:**
- **`COMPASS-Discover-Proposal.md`** — reader-facing; its bespoke "Why It Matters" prose is kept and it was already spelling-correct.
- **Evidence rationale prose** (`dfva/source/evidence/*.json`) — extracted report content shown in the demo popover; still contains incidental US spellings in quotes. Optional follow-up.

---

## 1. Summary

Across **11 files** audited, **8 copy instrument content** (rubric dimension names/criteria, the four risk bands, or the three threshold questions) while **3 only reference it** structurally and are safe. The instrument is duplicated **far outside** the `dfva:gen` propagation chain: the highest-risk copies live in setup/marketing/skill docs that the generator never touches — `Act as a prompt engineer, I want to turn this work.md` (a paste-this-prompt doc that re-embeds the *entire* rubric + bands + questions and has **already drifted** from canonical), `COMPASS-Discover-Proposal.md`, and `~/.claude/skills/dfva/SKILL.md` (its own version stamp, outside the repo). Separately, several files that **are already registered `dfva:gen` targets** (`.github/prompts/dfva.prompt.md`, `.github/prompts/dfva-full-workflow.prompt.md`, `.github/agents/dfva-analyst.agent.md`, `.github/agents/dfva-batch.agent.md`) carry hand-copied risk-band tables and `dimensions[]` label blocks that the generator could be emitting via tokens but currently is not. Net drift exposure is **high**: at least four distinct verbatim hand-copies of the four-band threshold table exist, three full/abbreviated copies of the 11-dimension label set, and two-plus verbatim copies of Q1–Q3 — and concrete drift has already been observed (e.g. D7 named "Research Methods Rigor" canonically vs "Rigorous, Authentic Research Methods" / "Research Methods" in copies; band interpretation strings augmented with emoji and glosses).

## 2. High / Medium drift risk

| File | Location | Kind | Reproduction | Drift | Recommendation (minimal) |
|---|---|---|---|---|---|
| `Act as a prompt engineer, I want to turn this work.md` | Option A Step 2, `## DFVA RUBRIC` table, L99–113 | rubric-dimensions | verbatim | **high** | This is the literal content meant to be written into `.github/copilot-instructions.md` — the file `dfva:gen` **overwrites**. **Already drifted** (D1 L0 wording, D7 name). Do not treat this doc as the prompt source: replace the inlined rubric with an instruction to run `dfva:gen` and point at the generated `.github/copilot-instructions.md`. |
| `Act as a prompt engineer…work.md` | Option A Step 2, `## RISK BANDS` table, L117–124 | risk-bands | verbatim | **high** | Full copy of all four bands, augmented with emoji + gloss that already diverge from canonical interpretation strings. Replace with `dfva:gen` output / reference; do not re-paste thresholds. |
| `Act as a prompt engineer…work.md` | Option A Step 2, `## THREE THRESHOLD QUESTIONS`, L128–132 | threshold-questions | verbatim | **high** | Verbatim Q1–Q3 hand-copy. Reference the generated `.github/copilot-instructions.md` instead of re-pasting. |
| `COMPASS-Discover-Proposal.md` | How It Works → Risk Bands, L61–66 | risk-bands | verbatim | **high** | Full copy of all four bands incl. interpretation strings, identical to `RISK_BANDS`. Replace table with one-line reference to `.github/copilot-instructions.md`, or tokenize via `{{riskBandsTable}}`. |
| `~/.claude/skills/dfva/SKILL.md` | `## DFVA Rubric`, L41–55 | rubric-dimensions | paraphrased | **high** | 11-row parallel copy of names + L0/L3 criteria, **outside** the `dfva:gen` chain (own stamp `DFVA-CLAUDE-SKILL-v1`). Replace with a one-line reference to `dfva/source/rubric.ts` / `.github/copilot-instructions.md`, or bring the skill under the generator with `{{rubricTable}}`. |
| `~/.claude/skills/dfva/SKILL.md` | `## Risk Bands`, L57–64 | risk-bands | verbatim | **high** | Verbatim band thresholds + names, maintained independently. Replace with reference, or tokenize via `{{riskBandsTable}}`. |
| `~/.claude/skills/dfva/SKILL.md` | `## Three Threshold Questions`, L68–72 | threshold-questions | verbatim | **high** | Verbatim Q1–Q3, hand-maintained. Replace with reference, or tokenize via `{{thresholdQuestions}}`. |
| `.continue/prompts/dfva.md` | Scoring model → Risk bands, L27–31 | risk-bands | verbatim | **high** | Full hand-copy of all four bands as a bullet list, **outside** the managed set. Bring under management as `dfva/source/targets/continue-dfva.md.tmpl` (register output path in `scripts/dfva-lib.ts`) and inject `{{riskBandsTable}}`; note canonical render is a `\| Score \| Band \|` table — adopt it or add a list-render helper to `rubric.ts`. |
| `.github/prompts/dfva.prompt.md` | Scoring and risk mapping, L40–45 | risk-bands | verbatim | **high** | Already a `dfva:gen` target. Replace inline four-line table with a one-line reference to `.github/copilot-instructions.md`, or tokenize via `{{riskBandsTable}}`. |
| `.github/prompts/dfva-full-workflow.prompt.md` | Stage 2, `**Risk bands:**` line, L49 | risk-bands | verbatim | **high** | Full copy of all four thresholds/names in non-canonical middot/em-dash format (can't be auto-deduped as-is). Replace with one-line reference, or bring under `dfva/source` tokenized with `{{riskBandsTable}}`. |
| `.github/prompts/dfva-full-workflow.prompt.md` | Stage 5c, `dimensions[]` template, L169–180 | rubric-dimensions | verbatim | **high** | Exact hand-copy of all 11 `RUBRIC[].demoLabel` values. Tokenize this prompt as a `dfva:gen` target emitting `{{programDataDimensions}}` from `RUBRIC`, or at minimum reference `rubric.ts` as the label authority. |
| `.github/agents/dfva-analyst.agent.md` | Stage 2, `Risk bands:` line, L42 | risk-bands | verbatim | **high** | Already a generator target. Replace inline band table with `{{riskBandsTable}}`, or a one-line reference to `.github/copilot-instructions.md`. |
| `.github/agents/dfva-batch.agent.md` | Stage 2 bullets, `Map to risk band`, L48 | risk-bands | paraphrased | **high** | Full copy of all four bands in non-canonical inline format (can't be `{{riskBandsTable}}`-deduped as-is). Replace with one-line reference, or move file under `dfva/source/targets`, substitute `{{riskBandsTable}}`, register in `manifest.ts` `TARGETS`. |
| `.continue/prompts/dfva.md` | Scoring model, L22–26 | scoring-scale | paraphrased | medium | Hardcodes dimension count, 0–3 scale, `/36` total. Once tokenized as a `.tmpl` target, derive from `RUBRIC` length / level scores / `MAX_SCORE`, or reference `.github/copilot-instructions.md`; render via `{{rubricTable}}` + a `{{maxScore}}` token. |
| `Act as a prompt engineer…work.md` | Option A Step 2, scorecard template, L152–168 | rubric-dimensions | paraphrased | medium | Second, abbreviated copy of all 11 dimensions + `/36` in the same doc; abbreviated names ("Research Methods", "Curriculum Currency") diverge. Drive rows from `RUBRIC` order via `{{scorecardRows}}`, or reference the generated prompt instead of re-listing. |
| `Act as a prompt engineer…work.md` | Option A Step 2, `## BEHAVIOUR RULES`, L196–204 (+ L615) | behavior-rules | verbatim | medium | Hand-copy of the behaviour-rule block (no hedge / head-to-head / advisory note) owned by the generated prompt. Consolidate to the generated file and reference it; don't keep a second copy in the setup guide. |
| `Act as a prompt engineer…work.md` | Option B Step 3 `.continue/prompts/dfva.md`, L272 | risk-bands | verbatim | medium | A **third** inline copy of the four bands (single-line, emoji). Same exposure; reference the generated table or tokenize via `{{riskBandsInline}}`. |
| `COMPASS-Discover-Proposal.md` | How It Works → Rubric table, L45–57 | rubric-dimensions | paraphrased | medium | All 11 dimension **names** with bespoke "Why It Matters for 2027" prose; names already differ ("Domain Depth and Specialisation", "Research Methods Rigor" spelling). Replace name column with one-line reference to `dfva/source/rubric.ts`, keep only the bespoke rationale; or inject `{{rubricDimensionNames}}`. |
| `COMPASS-Discover-Proposal.md` | Appendices B-DES L223–225 / MC-IS L238–240 | threshold-questions | paraphrased | medium | All three questions restated as abbreviated parentheticals that drift from canonical Q1–Q3. Reduce to bare `Q1/Q2/Q3` labels + reference; keep only the YES/NO/UNCERTAIN answers. |
| `.github/prompts/dfva-full-workflow.prompt.md` | Stage 5c, `riskBand` field, L167 | risk-bands | verbatim | medium | Names-only enum literal mirroring `RiskBandName`. Reference the `RiskBandName` union (or copilot-instructions.md) so a rename propagates. |
| `.github/agents/dfva-analyst.agent.md` | Stage 5c, `dimensions[]` labels, L192–202 | rubric-dimensions | paraphrased | medium | Reproduces all 11 `demoLabel` short-names as a copy-this template. Generate from `RUBRIC` (e.g. `{{dimensionsTemplate}}`) or point to `programData.ts` as authority. |
| `.github/agents/dfva-batch.agent.md` | Stage 5c PROGRAMS template, L156–167 | rubric-dimensions | verbatim | medium | Complete enumeration of all 11 `demoLabel` values in `programData.ts` order. Make the file a generator target with a `renderProgramDimensions` helper + token, register in `manifest.ts`; min fix = note pointing to `rubric.ts`. |
| `.github/agents/dfva-batch.agent.md` | Stage 5c PROGRAMS template, L153–154 | risk-bands | verbatim | medium | Full `RiskBandName` enumeration in the placeholder. Reduce to a non-exhaustive hint (`riskBand: '<band name from rubric>'`); keep `maxScore: 36` (mirrors demo registry field). |
| `~/.claude/skills/dfva/SKILL.md` | `### Threshold Questions` example, L103–104 | threshold-questions | verbatim | medium | Q1 reproduced a **second** time as a format illustration. Replace literal text with a neutral placeholder (`**Q1: [canonical question text]**`) so the example teaches format only. |
| `~/.claude/skills/dfva/SKILL.md` | COMPASS UI Data Block `dimensions[]`, L171–183 | rubric-dimensions | paraphrased | medium | Hand-lists all 11 `demoLabel` values (+ ordering), duplicating what already flows into `programData.ts` via `dfva:gen`. Reference the generated `programData.ts` shape or generate this block from `rubric.ts`. |

## 3. Safe (reference-only)

These reproduce **no** instrument content — only structural counts/scale (e.g. "10 dimensions + bonus", "0–3", "/36") or an explicit pointer to canonical. No action required; tighten the pointer only if convenient.

- **`.github/prompts/dfva-full-workflow.prompt.md` — Stage 2, L37** — explicitly defers to `.github/copilot-instructions.md` for the full rubric. The pattern to copy.
- **`.github/agents/dfva-batch.agent.md` — Stage 2 header, L44** — "Read `.github/copilot-instructions.md`… Apply the rubric exactly." The sanctioned pattern other findings should collapse toward.
- **`.github/agents/dfva-analyst.agent.md` — Stage 1 step 5, L34** — points to `.github/copilot-instructions.md` to load the full rubric.
- **`.github/prompts/dfva-recommend.prompt.md` — Execution rules, L20–21** — references rubric structurally (count + bonus); no names/criteria/bands.
- **`.github/prompts/dfva-market.prompt.md` — whole file** — defines its own AI-substitution-pressure scale + job-family contract; unique prose, no canonical content.
- **`.continue/prompts/dfva-recommend.md` — L12** — "dimensions 1-10 and bonus"; names nothing. Optionally soften to a reference.
- **`.continue/prompts/dfva.md` — workflow step 7 (L17) + heading (L38)** — only names the threshold section + YES/NO/UNCERTAIN format; Q-text not reproduced.
- **`.github/prompts/dfva.prompt.md` — Execution rules, L18–19** — 0–3 scale + `/36` generically; no names/criteria. Optionally add the copilot-instructions.md pointer.
- **`.github/agents/dfva-analyst.agent.md` — Stage 2 opening, L40** — scale facts (10+bonus, 0–3, /36) as stable constants; acceptable.
- **`.github/agents/dfva-analyst.agent.md` — Stage 5c `riskBand` field, L189** — placeholder enumerating allowed values; low priority, optionally note "(values: see `RiskBandName`)".
- **`.github/agents/dfva-batch.agent.md` — Stage 2 bullets, L46–47** — 0–3 scale + `/36`; single canonical values, low drift.
- **`README.md` — Acceptance Checklist, L155–165** — coarse structural facts only. Optionally point L171 at `dfva/source/rubric.ts`.
- **`docs/workflow-sop.md` — Phase 1 step 3, L62–66** — paraphrased structure; already names copilot-instructions.md as source.
- **`docs/workflow-sop.md` — Content Formatting Rules, L201** — one band shown as a rendering example. Lowest-effort fix: band-agnostic placeholder `**Risk band: <BAND> (<min>–<max>)**`.
- **`COMPASS-Discover-Proposal.md` — MC-IS L241 + scattered score refs (L147, 221–222, 236–237, 253)** — derived running values, not a scale definition. Correctly consume canonical.
- **`Act as a prompt engineer…work.md` — YOUR TASK L90 / Option B L271 / scorecard** — restates scale shape (10+bonus, 0–3, /36) as scalars; low drift. Prefer deriving from `MAX_SCORE` if ever tokenized.
- **`~/.claude/skills/dfva/SKILL.md` — UI block `riskBand` enum (L169), constraint (L189), workflow scale (L33, 41, 80)** — low-risk single-value restatements of `RiskBandName` / `MAX_SCORE`.

## 4. Suggested next steps

Two mechanisms, applied by drift risk and whether the file is already in the `dfva:gen` chain.

### A. Bring under the generator (`dfva/source` template + token)
For files that must show the full table/labels inline **and** are worth keeping in sync automatically. Add the file as a `.tmpl` under `dfva/source/targets/`, register its output path in `scripts/dfva-lib.ts` / `manifest.ts` `TARGETS`, substitute the listed token, then run `npm --prefix scripts run dfva:gen`. New tokens/helpers needed are noted.

1. **`.continue/prompts/dfva.md`** → `dfva/source/targets/continue-dfva.md.tmpl`. Tokens: `{{riskBandsTable}}` (band list — needs a list-style render helper in `rubric.ts` if the bullet form must survive), `{{rubricTable}}` + `{{maxScore}}` for the scale block, optional `{{thresholdQuestions}}`. **Highest value** — currently fully outside management and the second-most-drifted band copy.
2. **`.github/agents/dfva-batch.agent.md`** → register under `dfva/source/targets`; substitute `{{riskBandsTable}}` (Stage 2) and a new `{{programDataDimensions}}`/`renderProgramDimensions` helper (Stage 5c `dimensions[]`). Reduce the `riskBand` placeholder to a non-exhaustive hint.
3. **`.github/prompts/dfva-full-workflow.prompt.md`** and **`.github/agents/dfva-analyst.agent.md`** — already generator targets, so add the missing tokens: `{{riskBandsTable}}` for the Stage 2 band line and `{{programDataDimensions}}` (or `{{dimensionsTemplate}}`) for the Stage 5c `dimensions[]` blocks, replacing the current hand-copies in the `.tmpl` sources.
4. **(Optional) `~/.claude/skills/dfva/SKILL.md`** — lives outside this repo with its own version stamp; only worth a `.tmpl`/`{{rubricTable}}`/`{{riskBandsTable}}`/`{{thresholdQuestions}}` treatment if you want the skill kept literally in sync. Otherwise prefer the reference approach in B.

### B. Replace the copy with a one-line reference
For files where inline duplication adds no value — the cheaper, preferred fix. Delete the copied block and point to `.github/copilot-instructions.md` (the generated artifact) or `dfva/source/rubric.ts` (the source).

5. **`Act as a prompt engineer, I want to turn this work.md`** — **do first.** Stop treating this doc as the prompt source: replace the embedded `copilot-instructions.md` block (rubric L99–113, risk bands L117–124, questions L128–132, scorecard L152–168, behaviour rules L196–204) with an instruction to run `npm --prefix scripts run dfva:gen` and read the generated `.github/copilot-instructions.md`. Also fix the third band copy at Option B L272. This file has the worst exposure and has **already drifted**.
6. **`COMPASS-Discover-Proposal.md`** — replace the Risk Bands table (L61–66) and the rubric-name column (L45–57) with one-line references to `dfva/source/rubric.ts` / `.github/copilot-instructions.md`, keeping only the bespoke "why it matters" prose; reduce the appendix threshold parentheticals (L223–225, L238–240) to bare `Q1/Q2/Q3` labels.
7. **`.github/prompts/dfva.prompt.md` (L40–45)** and the **`.github/agents/dfva-analyst.agent.md` Stage 2 band line (L42)** — if you do not want the token in B-3, the lighter fix is a one-line reference: "Map total to risk band per `.github/copilot-instructions.md` (Risk Bands)."
8. **`~/.claude/skills/dfva/SKILL.md`** (preferred over A-4) — replace the rubric (L41–55), risk bands (L57–64), and threshold-questions (L68–72) tables with "See `.github/copilot-instructions.md` / `dfva/source/rubric.ts` for the authoritative instrument"; neutralize the duplicated Q1 example at L103–104 with a placeholder.

### C. Leave as-is
All Section 3 items. They consume the canonical scale correctly and reproduce no instrument text; tighten the pointer wording only if a file is already being edited.
