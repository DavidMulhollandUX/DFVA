# 🗺️ COMPASS Agent Harness — State of the Harness

**Prepared by:** David Mulholland + Claude
**Date:** 2026-06-06
**Subject:** current state of [`docs/agent-harness.md`](agent-harness.md)
**Snapshot:** 2,878 lines · 19 sections · 12 workflow types · 12 technical patterns · 12 slash commands · 22+ companion docs produced
**Latest run (2026-06-07):** Wave-1 arming — EXP-02 gatekeeper desk-experiment (verdict ABSENT → H4 survives), the three artifact-reaction tests (`compass-artifacts/`), and the Wave-1 outreach pack. See §"Recent additions" note below.

> **What this document is.** A detailed snapshot of the COMPASS venture-analysis agent harness as it stands on 2026-06-06. The harness itself ([`agent-harness.md`](agent-harness.md)) is the *reproducible reference* — every workflow's exact phase architecture, verbatim agent prompts, JSON-Schema output shapes, and output file. **This** document is its index and state-of-play: what exists, how the pieces relate, what is script-backed versus hand-authored, which companion docs it has produced, and what changed most recently.

---

## 1. At a glance

| Property | Value |
|---|---|
| File | `docs/agent-harness.md` |
| Lines | 2,878 |
| Sections | 19 (§1–§19) |
| Workflow types | **12** (11 individual workflows + 1 full-sequence orchestrator) |
| Technical patterns | **12** (§13.1–§13.12) |
| Slash commands | **12** (in `.claude/commands/`) |
| Companion docs produced | 22+ `compass-*.md` / `research-plan.md` (+ `competitor-*.md`, `compass-market-map/`, `compass-problem-tree.svg`; **new 2026-06-07:** `compass-exp02-gatekeeper-evidence.md`, `compass-artifacts/` (3 PDFs + README), `compass-wave1-outreach.md`) |
| Front-matter | YAML — `title`, `prepared-by`, `purpose`, `builds-on` |
| Builds on | `workflow-sop.md`, `compass-venture.md`, `workflow-structured-output-hardening.md` |
| Purpose | Re-run any venture-analysis workflow cold — for COMPASS or a new venture |
| Version control | §1–§18 + workbook committed (`e15b87a` baseline · `ebf5ca2` Step-3/§17 · `c23a806` gitignore). **§19 (MEC Steps 1–2), patterns §13.11–§13.12, the §12/§16 follow-through, this snapshot, and the 2026-06-07 Wave-1 arming run (EXP-02 evidence, `compass-artifacts/`, Wave-1 outreach) are in the working tree, pending commit.** |

---

## 2. Design philosophy — the four principles

1. **Reproducibility.** Every workflow ships its exact prompts + schemas + output file, so it is runnable cold by another operator or on a new venture.
2. **Hardening by construction.** The *web-search → schema-less markdown, then reason → schema* split (§13.9) is the spine of the reliable back-half workflows — it is why the EXP-04 and recovery runs succeeded where the first deeper-perspective run partly failed.
3. **Adversarial honesty.** Verification panels, judge panels, "the hole to poke", "we're wrong if…", "founder's call", the Mom-Test discipline (§17.3), refutation propagation (§18.1), and now **honest institutional scoping (§19.4)** are all designed to *attack* the venture — or concede its edges — rather than flatter it.
4. **The whole arc: discover → find → kill → correct.** The front half now spans **MEC Define Steps 1–2 (§19: problem tree → system map → value chain → stakeholders)** *and* §1–§6 (evidence base + positioning); the back half §7–§11 pressure-tests the mental models, hunts the levers, validates demand and standing, and proves (or refutes) the empirical claim the venture rests on. When the back half overturns a front-half claim, audits the instrument, or exposes a coverage gap, **§18** propagates the correction so the workbook never contradicts itself.

---

## 3. The 12 workflows

### Front half — research & analysis (§1–§6, preceded by §19 market discovery)

| # | Workflow (§) | Architecture | Output | Command |
|---|---|---|---|---|
| 1 | **Market Sizing** (§1) | 4 sequential phases: Perplexity baseline → premium databases (Statista, GlobalData, IBISWorld, Fitch, Euromonitor) → institutional sources (OECD, World Bank, IMF, QILT) → synthesis. Each phase **appends a versioned addendum**. | `compass-market-sizing.md` | `/market-size` |
| 2 | **Competitor Intelligence** (§2) | 2 phases: 4–6 **parallel research agents** (A Company · B Product · C Customers · D Pricing · E Messaging), confidence-graded → 1 synthesis agent writes the full doc (AI-maturity rating, "what it does NOT do", gap matrix, win/loss, objection handling). | `competitor-[slug].md` | `/competitor-intel` |
| 3 | **AI Feature Review** (§3) | 4 phases: per-product AI research → per-product **PRDs** → **15-dimension 0–3 capability matrix** → prioritised P1/P2/P3 recommendations + 3-phase roadmap + "features NOT to build". | `compass-ai-feature-review.md` | `/ai-feature-review` |
| 4 | **Systems Thinking** (§4) | 2 phases: extract Daniel Kim's frameworks (Iceberg, loops, delays, Fixes That Fail, working ON vs IN) → apply to the venture as a one-pager. | `compass-systems-thinking.md` | `/systems-think` |
| 5 | **Transcript → Positioning** (§5) | 2 tasks: analyse stakeholder content for themes/language → **subtly update marketing copy** to absorb the framing without quoting or naming the source. | Updated `.tsx` files | `/position-update` |
| 6 | **Stakeholder Materials** (§6) | Direct prompt templates: outreach emails (<250 words), calendar-invite bodies, innovation-program applications. | `templates/` files | `/stakeholder-draft` |

### Back half — strategy, validation & evidence (§7–§11)

| # | Workflow (§) | Architecture | Output | Command |
|---|---|---|---|---|
| 7 | **Deeper Perspective & Mental Models** (§7, MEC Step 3) | 4 phases: 5 parallel systemic-structure lenses → 4 parallel stakeholder vantages + **consolidation** into 8–16 mental models → **adversarial verification** of the top ~6 → **vision generate-and-judge** (4 candidates → 3 judges → blend). 7 schemas. | `compass-deeper-perspective.md` (+ `compass-vision.md`) | `/deeper-perspective` |
| 8 | **Validate** (§8, MEC Step 5) | 4 phases: hypothesis decomposition (H0 → H1 demand · H2 trust/standing · H3 WTP · H4 unoccupied-adjacency, each "we're wrong if…" + convergence test) → 8-signal **market-signals scorecard** → **20+ warm-first expert list (3 waves)** → outreach + interview kit (7 templates A–G, 5 Learn→Challenge→Probe guides, capture template, decision rule). | `compass-validate.md` | `/validate` |
| 9 | **Experiment Backlog** (§9) | 3 phases: extract levers (P1–Pn) → **forge a coherent experiment set** (riskiest assumption, artifact-reaction method, mapped interviewee, kill-signal) → prioritise into P0/P1/P2 by *existential-risk × time-sensitivity × cost-to-test*, sequence onto the interview waves. | `compass-experiment-backlog.md` | `/experiment-backlog` |
| 10 | **Evidence & Measurement** (§10) | 3 phases: **multi-angle systematic literature search (schema-less markdown)** → **schema reasoning, no web** (adversarial "is the category empty?" + generate-and-judge of measurement designs) → optional study **pre-registration**. | `compass-exp04-causal-evidence.md` (+ pre-registration) | `/evidence` |
| 11 | **Expert / Target Sourcing** (§11) | 2 phases: parallel sector/segment sourcing agents (schema-less markdown, web search) → consolidation agent dedups + ranks **warm-first**. Serves the Validate 20+ list and any experiment's targets. | rows into `compass-validate.md` / `compass-experiment-backlog.md` | `/source-experts` |

### Orchestrator (§12)

| # | Workflow (§) | Role | Command |
|---|---|---|---|
| 12 | **Full Venture Analysis Sequence** (§12) | The dependency chain for onboarding a new venture, front-half then back-half, with cross-dependencies and "when to break the sequence". | `/venture-full` |

> **Note.** §19 (MEC Define Steps 1–2 — market discovery) is documented as an **addendum**, not a 13th numbered fan-out, because it is executed as a *hybrid*: maps authored inline, evidence filled by the §2/§13.9 research shape. It is the front-of-Define phase that *precedes* §1–§6. Likewise §17 and §18 are discipline addenda. Workflow count therefore stays **12**.

---

## 4. §12 — Full venture analysis sequence

The recommended order for a new venture now begins one step earlier — **MEC Define Steps 1–2 (§19): problem tree → pick a root cause → convert to a market → system map → value chain → stakeholder analysis** — then problem framing → systems thinking → market sizing → competitor intel ×N → AI review → positioning, **then the extended back half** → strategic-intelligence sweep → Deeper Perspective → Validate → Expert Sourcing → Experiment Backlog → Evidence & Measurement → conduct interviews → reassess after ~4–5 → pursue / pivot / iterate. §12 documents the cross-dependencies and when to deliberately break the linear order (the MEC "the loop is not linear" principle — §19.2 makes the same point about the maps).

---

## 5. §13 — Technical patterns (12)

The first five are infrastructure; §13.6–§13.10 are the orchestration/reliability patterns the back-half workflows depend on; **§13.11–§13.12 (new) are the designed-deliverable patterns.**

| # | Pattern | Gist |
|---|---|---|
| 13.1 | **StructuredOutput hardening** | End schema prompts with the explicit "respond ONLY by calling the tool" line. |
| 13.2 | **OpenAthens SSO database access (UoM)** | Library auth via `go.openathens.net/redirector`; extract URLs from the catalog, don't guess. |
| 13.3 | **Workflow tool constraints** | `run_in_background` unsupported on `Workflow`; launch multiple workflows in one message to parallelise. |
| 13.4 | **Workflow script patterns** | `pipeline()` (default) · `parallel()` (barrier) · file-passing between phases. |
| 13.5 | **Schema design** | Keep schemas flat and string-heavy; agents struggle with deep nesting. |
| 13.6 | **Adversarial verification** | Spawn N skeptics to *refute* a finding (default-to-refuted); kill on majority refute. |
| 13.7 | **Generate-and-judge panel** | N candidates from diverse angles → parallel judges score → synthesise/blend. |
| 13.8 | **Consolidation / dedup** | One agent merges many agents' free-text into a deduplicated, ranked set. |
| 13.9 | **Web-search → markdown, THEN reason → schema** | The definitive StructuredOutput fix: browsing agents return markdown; separate non-browsing agents emit the schema. |
| 13.10 | **Two-pass recovery** | Salvage good data to `/tmp`, then run a smaller hardened recovery (or `resumeFromRunId`). |
| **13.11** | **Designed visual deliverable (HTML + SVG → PDF)** | One self-contained HTML file on the **product's own design tokens** (extracted from `compass-static`), inline SVG, rendered by headless Chromium/Playwright. Two gotchas: **no HTML tags inside SVG `<text>`** (use `<tspan>` — one stray `<b>` collapses the whole map); **reuse the canonical logo geometry**, never hand-code it. Output: `docs/<name>-map/` (html + pdf + `render.py`). |
| **13.12** | **Visual QA loop** | Never ship a designed PDF unseen: `pdftoppm` → **read the PNG as an image and look** → zoom-crop suspects with PIL → fix in HTML → re-render. "Verifying a visual means looking at the pixels, not re-reading the markup." |

---

## 6. §14 — Agent prompt library

Named, reusable prompt templates. Strategy/discovery category gained five entries this session:

- **Research:** `market-baseline` · `database-extract` · `competitor-company` · `competitor-product` · `competitor-ai` · `transcript-analyse`
- **Synthesis:** `market-synthesise` · `competitor-doc` · `ai-prd` · `ai-gap` · `ai-recs` · `systems-apply`
- **Stakeholder:** `email-outreach` · `calendar-invite` · `application-answer` · `position-update`
- **Strategy & validation:** `systemic-lens` · `mental-models-vantage` · `consolidate-rank` · `adversarial-verify` · `vision-generate` · `judge-panel` · `hypothesis-decompose` · `experiment-map` · `evidence-search` · `measurement-design` · `target-source` · `mom-test-interview` · `assumptions-to-conversation` · **`problem-tree`** · **`system-map-research`** · **`value-chain`** · **`stakeholder-profile`** · **`institutional-align`**

---

## 7. §15 — File naming conventions

All files live in `docs/`; assessment reports live in `reports/`. The map covers: market sizing, competitor intel (`competitor-[slug].md`), AI feature review, systems thinking, vision, **problem tree (+ `compass-problem-tree.svg`, designed via §13.11)**, validate pack, deeper perspective, experiment backlog, exp04 causal-evidence + pre-registration, stakeholder analysis, strategic intelligence, council alignment, expert conversation guide (cross-links §8 & §17.2), the **`compass-market-map/` folder** (html + pdf + `render.py`), outreach/calendar templates, research plan, and the harness itself + this state doc.

---

## 8. §16 — House style

- **Front-matter:** YAML *or* bold-inline (`**Prepared by:** … · **Date:** … · **Builds on:** …`) — newer workbook docs use bold-inline.
- **Emoji set:** 👀 🧠 🏗️ 💡 📊 🗺️ 🎯 ⚠️ ✅ 🧪 🔍 👥 ⚖️ 🧭
- **Writing rules:** declarative not hedged · evidence before claims · "founder's call" framing for genuine uncertainty · numbers wherever possible · bullets only for genuinely list-like content.
- **Designed deliverables (§13.11):** when an output is for an external/leadership audience (map, board one-pager), render it on the product's own design tokens, not a generic theme — and run the §13.12 visual-QA loop before shipping.

---

## 9. §17 — Manual authoring methods & workbook upkeep *(added 2026-06-06)*

Documents the *inline, by-hand* methods used for the Step-3 layer — and how each relates to the script-based workflows so a future run produces the right artefact once, not two overlapping ones.

- **17.1 — Manual Step-3 Vision checkpoint** from the MEC template (👀/🧠/🏗️/💡 + "how the vision challenges each mental model" + "founder's call"). Author manually first → §7 generate-and-judge expands and corroborates.
- **17.2 — Expert Conversation companion** (`compass-expert-conversations.md`), slimmed after **reconciliation** to its non-redundant core (Mom-Test discipline + warm `research-plan`→hypothesis crosswalk + de-biased questions); points at §8's `compass-validate.md` for the rest.
- **17.3 — The Mom Test** — the reusable interview discipline; the *human-conversation analogue of §13.6 adversarial verification*. Talk past not future, never pitch, anchor on committed money/time, treat compliments as noise, go in to falsify; plus the de-bias-an-existing-question move.
- **17.4 — Workbook upkeep** — build on, don't regenerate; keep cross-docs in sync. *A decomposition that maps assumptions to evidence surfaces coverage gaps in the plan it maps onto; close them in place.*

---

## 10. §18 — The self-correcting workbook *(added 2026-06-06, later)*

The **second-order disciplines** the back half forces — what to do when a workflow's output **corrects an existing artefact (or the product)**. Extracted from EXP-04 (§10) and EXP-13 (§11); portable. Framing: *the back half is supposed to overturn the front half — a refutation is the workflow working, not failing.*

- **18.1 — Refutation propagation** — reframe to the narrower surviving claim, bank the risk reduction, propagate to every dependent doc by name with a "(corrected by EXP-04)" pointer.
- **18.2 — Measurement design is an instrument audit** — operationalising a score for registration forces exactness that surfaces bugs (the `maxScore: 36` vs 33-achievable). Reconcile spec vs implementation vs Σ-item-maxima.
- **18.3 — Coverage-audit every enumeration** — run §17.4's decompose-to-find-a-gap against the hypothesis set, interview plan, target list, *and* scoring dimensions (EXP-13 found the target list had no hiring-employer).

---

## 11. §19 — MEC Define Steps 1–2: Market Discovery *(added 2026-06-06, latest)*

The newest section — the **front of the MEC Define process**, the Steps 1–2 market-discovery phase that runs *before* §7 (Step 3) and §8 (Step 5). Executed in full this session for the COMPASS curriculum–labour-market-intelligence venture. A **hybrid**: maps and analyses authored **inline**; the evidence behind them filled by **fan-out research workflows** (the §2/§13.9 shape). Portable extractions: 19.2 (iterative question-led mapping), 19.4 (honest institutional scoping), and patterns §13.11–§13.12.

- **19.1 — Problem Tree (Step 1).** Vague problem → root-cause tree (split *structural* vs *mental-model*) → **pick the highest-leverage root cause the team cares about** → **convert it into a market** to investigate (name the analogous mature market). Reverse-brainstorm when the tree is thin. Research-tool discipline: referenced, no pitch; each root cause gets its market, expertise overlap, and where help is needed. → `compass-problem-tree.md` (+ designed `.svg`).
- **19.2 — System Map & Value Chain (Step 2, Steve Blank, iterative).** "Write what you know, let your own open questions drive the gap-filling." **Overview ecosystem map** (4 groups: direct participants · influencers · end users · adjacent — each on cares/frustrates/power). **Value-chain map** (money · products · decision-rights · *what's hidden*; where margin concentrates; **"the break"** — where LMI reaches careers/IR and stops). **Internal value-chain deep-dive** of the single most interesting org (the "certifier" move — high margin, low capital, data/knowledge-based). The maps' open questions become the prompts for the parallel-research fan-outs; each round ends with a **five-falsifiable-claims** hand-off to Validate.
- **19.3 — Stakeholder analysis.** `compass-stakeholder-analysis.md`: terms primer · 4 groups profiled (cares/frustrates/power, sourced) · how value flows (incl. hidden) · recent reports (≤12 mo, verified). Feeds the §8/§11 target list.
- **19.4 — Institutional-alignment & honest scoping.** Map the venture to leadership's *own* questions (the four University Council questions) graded **direct / partial / out-of-scope** with evidence — and *resist claiming it answers all of them*. Portable rule: *state coverage precisely, name the framing risk; naming the boundary earns the room, claiming the whole forfeits the credibility that is the venture's reason to exist.* The §17/§18 honesty stance applied to **positioning**. → `compass-council-alignment.md`.
- **19.5 — Relationship to the rest.** Feeds §7 (root cause + mental-model candidates) and §8/§11 (targets + falsifiable claims, via `research-plan.md`); uses §13.11–§13.12 for the `compass-market-map/` PDF.

---

## 12. Provenance & honesty map

| Sections | Provenance |
|---|---|
| §7, §10, §11 | **Extracted verbatim** from the actual workflow scripts (most reliable). |
| §8, §9 | **Faithful reconstructions** — ran inline (no script), now annotated with their real execution shape. |
| §1–§4 | Original front-half workflows (script/agent-backed). |
| §5, §6 | Template/direct-prompt workflows (not fan-out). |
| §13.11–§13.12 | **New patterns** — extracted from the designed `compass-market-map/` PDF build (real worked glitches: the corrupting `<b>`, the blob compass, the colliding badge). |
| §17.1–§17.2 | **Manual / inline** — authored by hand, no scripts, schemas, or agents. |
| §17.3–§17.4, §18.1–§18.3 | **Distilled reusable disciplines** — portable; grounded in real worked examples. |
| §19 | **Hybrid** — maps, stakeholder analysis, council-alignment authored **inline**; the secondary-research evidence inside them came from **fan-out workflows** (§2/§13.9 shape); the PDF from **§13.11**. The portable extractions (19.2, 19.4) are distilled disciplines. |

---

## 13. The companion workbook (what the harness has produced)

Live artefacts in `docs/`:

- **Market-discovery (§19) outputs:** `compass-problem-tree.md` (+ `compass-problem-tree.svg`) · `compass-stakeholder-analysis.md` · `compass-competitive-strategic-intelligence.md` · `compass-council-alignment.md` · `research-plan.md` · `compass-market-map/` (folder: html + PDF + `render.py`)
- **Front-half outputs:** `compass-market-sizing.md` · `competitor-coursedog.md` / `competitor-courseleaf.md` / `competitor-moderncampus.md` · `compass-ai-feature-review.md` · `compass-systems-thinking.md` · `compass-vision.md`
- **Back-half outputs:** `compass-deeper-perspective.md` · `compass-validate.md` · `compass-experiment-backlog.md` · `compass-exp04-causal-evidence.md` (+ `compass-exp04-preregistration.md`) · `compass-expert-conversations.md`
- **Slash commands** (`.claude/commands/`): `ai-feature-review` · `competitor-intel` · `deeper-perspective` · `evidence` · `experiment-backlog` · `market-size` · `position-update` · `source-experts` · `stakeholder-draft` · `systems-think` · `validate` · `venture-full`

---

## 14. Recent evolution

### 2026-06-06 (this session) — competitor intel ×2, AI feature review, harness documented + all 12 commands wired

Driven by completing the competitor-intelligence sweep and full AI-capability analysis for the curriculum-management category, then documenting the full harness as a reusable framework.

- **`competitor-courseleaf.md`** produced via §2 (CourseLeaf / Leepfrog Technologies — 29% category share, zero AI, 3-yr Cornell rollout risk, zero AU customers; one-sentence diff: "tells you whether the proposal was approved; COMPASS tells you whether the program should exist").
- **`competitor-moderncampus.md`** produced via §2 (Modern Campus / DIGARC — 6 acquisitions, Providence Equity Aug 2025, platform-coherence weakness, CourseLoop the AU incumbent; Providence "learner-to-earner" mandate = most dangerous 18–36 month threat).
- **`compass-ai-feature-review.md`** produced via §3 (4 PRDs: CourseLeaf=Early · Modern Campus=Developing · Coursedog=Mature · COMPASS=Advanced; 15-dimension capability matrix; 13 prioritised improvement recommendations in 3 phases; strategic AI positioning statement).
- **`agent-harness-state.md`** (this file) created as the live state snapshot.
- **All 12 `.claude/commands/`** wired: 5 back-half commands already existed (`deeper-perspective`, `validate`, `experiment-backlog`, `evidence`, `source-experts`); 7 front-half commands created this session (`market-size`, `competitor-intel`, `ai-feature-review`, `systems-think`, `position-update`, `stakeholder-draft`, `venture-full`). Harness is now fully command-backed.
- **No harness sections added** — §1–§19 and §13.1–§13.12 were already complete from prior session work. Session confirmed the harness is accurate against the workflows actually run.

### 2026-06-06 (latest session) — §19 + patterns §13.11–§13.12 added: MEC Define Steps 1–2 & designed deliverables

Driven by running the **front of the Define process** for COMPASS (problem tree → system map → value chain → stakeholders → Council alignment) and producing a designed market-map PDF. The harness grew from 18 → **19 sections**, 10 → **12 technical patterns**, 2,790 → **2,878 lines**:

- **§19 added** — MEC Define Steps 1–2 market discovery, with portable extractions 19.2 (Steve-Blank iterative question-led mapping), 19.3 (stakeholder analysis), 19.4 (honest institutional scoping — *state coverage precisely, name the framing risk*).
- **§13.11 + §13.12 added** — designed HTML/SVG→PDF deliverables on the product's own design tokens, and the render→rasterise→inspect→fix visual-QA loop. Grounded in real glitches: a stray `<b>` inside SVG `<text>` collapsing two pages; a hand-coded compass rendering as a blob (fixed by reusing the canonical logo geometry); a colliding margin badge.
- **§14** gained `problem-tree` · `system-map-research` · `value-chain` · `stakeholder-profile` · `institutional-align`; **§15** annotated the problem-tree SVG + market-map folder; **§16** gained the designed-deliverable house-style rule.
- **Intro/TOC** updated to surface §19 and the two new patterns. **Design philosophy** principles 3 & 4 updated to fold in honest scoping and the now-wider front half.
- **Workflow types unchanged (12)** — §19 is a hybrid discipline addendum, like §17/§18, not a new fan-out.
- **New companion docs:** `compass-problem-tree.md` (+ `.svg`), `compass-stakeholder-analysis.md`, `compass-council-alignment.md`, `compass-market-map/` (PDF). `research-plan.md` extended with Track-1 secondary tracks 1.6–1.10 and eight priority falsifiable interview questions.
- **Consistency follow-through (this audit).** Two edits the §19 documentation *implied* but had not actually landed in the harness body were applied: the **§12 sequence** was re-fronted with a **§19 market-discovery Phase 0** (problem tree → system map → value chain → stakeholders → institutional alignment, producing the discovery docs + the designed PDF), and **§16 house style** gained the **designed-deliverable rule** (render on the product's own tokens; run the §13.12 visual-QA loop before shipping). +8 lines → 2,878. Everything else the state doc claimed was confirmed already present.
- **Version control:** §19 + §13.11–12 + the §12/§16 follow-through + this snapshot are in the working tree, pending commit (prior baseline `e15b87a`/`ebf5ca2`/`c23a806`).

### 2026-06-06 (earlier) — §18 added: the self-correcting workbook

Three portable disciplines distilled from EXP-04 and EXP-13: **18.1 refutation propagation**, **18.2 measurement-design-as-instrument-audit** (the `maxScore: 36` vs 33-achievable bug), **18.3 coverage-audit every enumeration** (the §8 target list's missing employer class). Workflow types unchanged (12); a discipline section, not a new workflow or pattern.

### 2026-06-06 (earliest) — §17 added: manual authoring & upkeep

The harness grew from 16 → 17 sections, driven by Step-3 work done by hand: **§17 added** (17.1–17.4); `compass-vision.md` authored manually from the MEC template; `compass-expert-conversations.md` authored then **reconciled** to its non-redundant core (169 → ~73 lines); the **Mom-Test discipline** extracted (§17.3); `research-plan.md` extended with interview **2.7** to close the trust/standing gap; **§14** gained `mom-test-interview` and `assumptions-to-conversation`. The full workbook (23 docs) was committed and pushed (`ebf5ca2` + `e15b87a` baseline; `c23a806` gitignore hygiene).

---

*This is a point-in-time snapshot. The authoritative, runnable detail (every prompt, schema, and script shape) lives in [`agent-harness.md`](agent-harness.md); regenerate this state document when the harness changes materially.*
