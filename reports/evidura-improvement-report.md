# Evidura — Suggested Improvements Report

**Prepared:** 2026-07-02
**Scope:** Everything Evidura in this repo — brand system, business model & premortem suite (on `feat/evidura-brand-p0`), and the Evidura-adjacent code on `main`.

---

## Where Evidura stands

The strategy corpus is strong and unusually honest: a post-premortem business model (confidential benchmarking, re-baselined P&L, break-even Month 36–42), a staged spin-out independence structure, a full inter-rater reliability protocol, and a complete visual identity (Strata-E mark, tokens, lockups). Two premortems (15 failure modes, 18 agents) have already forced the two biggest pivots — public ratings → confidential benchmarking, and SaaS-speed projections → university-procurement reality.

The problem is not the thinking — it's that **the entire body of work is stranded on an unmerged branch**, `main` has since drifted in ways that *contradict* the strategy, and the two most time-critical actions in the plan fall due within days of today.

---

## Track 1 — Repository & code (fix first; cheap, high leverage)

### 1.1 Merge `feat/evidura-brand-p0` — or at minimum the docs (P0)
All brand assets (`brand/evidura/`), the P0 app rebrand, and every strategy doc (business model, premortems, independence structure, reliability protocol, UoM commercialisation reference) live only on `feat/evidura-brand-p0`. The branch diverged at `81ad068`; `main` has since added the developer portal, API key backend, and authz fixes, so conflicts (in `main.wasp`, `NavBar.tsx`, `feature_list.json`) grow with every dev-loop commit. The ~15 strategy docs are zero-code-risk — cherry-pick them to `main` today even if the app rebrand waits.

### 1.2 Fix brand-rule violations on `main` (P0)
Two features on `main` (built after the branch forked) break the brand system's own rules:

- [apiCompetitiveData.ts:21](compass/app/src/compass/apiCompetitiveData.ts:21) — `name: 'DFVA (Evidura)'`. Brand architecture says DFVA is the internal engine name, never external-facing; the master brand is Evidura, the product is "Durability Assessment".
- [CodeSnippetLibrary.tsx:16-28](compass/app/src/compass/components/CodeSnippetLibrary.tsx:16) — code snippets show `https://evidura.ai/api/v1/...` URLs. The implementation plan's hard gate: **no public `evidura.ai` URLs before trademark clearance** (clearance is still in progress). Use a placeholder/pilot subdomain until cleared.

Once the branch merges, both should read from `brandConfig.ts` so this can't recur.

### 1.3 The developer portal contradicts the confidentiality pivot (P0 — strategic, not cosmetic)
`main`'s dev portal + public API (feat-009) exposes per-program scores and cross-institution comparisons to any API-key holder. The post-premortem business model is explicit: *no program score is ever published without written institutional consent*; public/API display is a Year-4+ product gated on independence Stage 3, a published reliability study, and per-program consent. feat-009 predates the pivot. Review it against the consent framework — likely outcome: restrict the API to the commissioning institution's own programs (the authz-ownership work on this very branch is the right primitive) and remove public comparison endpoints until the gates clear.

### 1.4 Finish P0 of the rebrand consistently (P1)
Even on the branch, P0 is half-done: `main.wasp` title reads "Evidura – Degree Future-Viability Assessor" (surfacing DFVA in external copy — against rule §1.2 of the plan) while the OG tags, `site_name`, and email sender still say COMPASS. Complete the sweep from `brandConfig.ts`; the plan's file-change map (§5) is already the checklist.

### 1.5 Make Evidura visible to the automation (P2)
`feature_list.json` has no Evidura entries, so the dev-loop keeps reporting "0 approved features" while P1–P4 of the brand rollout sit specced and idle. Convert the rollout phases into feature entries (P1 front door, P2 band consolidation, P3 content/de-emoji) so the existing loop can execute them.

### 1.6 Decide the brand assets' home (P2)
The `510abe5` commit message says "before repo transfer to DavidMulhollandUX" and `brand/` on main is now empty. If the assets are meant to live in a separate brand repo, do the move and leave a pointer; if not, merge them back. Right now they exist only in one branch's history — the worst of both.

---

## Track 2 — Venture execution (time-critical; two items due now)

### 2.1 Independence Stage 1 — due the week of July 6 (4 days away) (P0)
Action #1 in the business model: brief Brad, engage UoM Commercialisation, file the conflict-of-interest disclosure. Premortem Agent 1's core finding is that independence perception **cannot be retroactively cured** — every week inside UoM bakes the origin story in deeper. Premortem #2's verdict names UoM Commercialisation as one of two *critical unaddressed risks*. Nothing in the repo indicates this has started. Before the meeting, fix §2.4 below — the doc you'd hand Brad currently contradicts itself.

### 2.2 Commission the reliability study now (P0)
The July–August window in the protocol is already open, the study takes 6–8 weeks, and rater R4 (external, non-UoM curriculum expert) is explicitly the long-lead recruitment item. This is the gating item for *any* external sale and the mitigation for the premortem's most dangerous failure mode (public LLM-scoring challenge). Start R4 recruitment this week even if the study kickoff slips.

### 2.3 The two "verify the assumption" cheap wins (P1)
Both flagged in the plan, neither evidenced in the repo:
- **Competitor monitoring** (Lightcast / Mapademics + Australia alerts) — "low effort, immediate," and premortem Agent 6 showed the 18–36-month window is an assumption, not a fact.
- **DVC-Academic procurement interviews (×3)** — the single highest-value research activity; procurement velocity is what moved break-even from Month 18 to Month 36–42, and it's still unverified.

### 2.4 Reconcile the business model's internal numbers (P1)
`evidura-business-model.md` mixes pre- and post-rebaseline figures — a credibility risk in the exact document that argues for methodological rigour:
- §4.3 P&L: Year 3 revenue **$820K**, EBITDA **–$200K** · §3.2: Year 3 blended **~$1.36M** · §5: "Year 1–3, **$1.4M ARR**"
- §9 risk table still cites "**$218K Year 3 EBITDA**" (the old model) against §4.3's –$200K
- §3.1 targets **26 institutions** by Year 3 · §7 Phase 2 re-baselines to **8–12**

One editing pass: pick the re-baselined numbers everywhere, move the optimistic set to an explicit "upside case."

### 2.5 Break the benchmark-dataset circular dependency (P2)
Premortem Agent 4: international sales need an international dataset that's scheduled *after* revenue targets (Q2 2027). The blocker has weakened — the handbook scraper is unblocked (Crawl4AI) and the working tree shows an active scrape/score pipeline (`scripts/scrape_handbooks.py`, `score_new.py`, `data/new_program_scores.json`). Pull the 10–20 UK/CA public-handbook seed forward to Q3–Q4 2026; it also doubles as the cross-national validity test the reliability study wants.

---

## Track 3 — Brand & product polish (after Tracks 1–2)

- **P1–P3 of the implementation plan** in order: hero/footer/auth lockup + OG assets; consolidate the triplicated `riskBandConfig` into band tokens (`bg-band-resilient` etc.); de-emoji the feature grid and rewrite FAQ in the decision-support voice. The plan's phasing is sound — it just needs to be executed.
- **Keep the amber discipline testable:** the "identity amber ≠ Moderate band in the same view" rule and "no hardcoded hex in components" rule are both easy to regress. A trivial grep-based lint (fail CI on `#E9A23B`/`emerald-`/`red-` literals in `src/compass/`) would enforce what the plan currently leaves to memory.
- **Agent-native content pillar:** the MCP server (`dfva-mcp`) is genuinely differentiated and already built; the planned "the durability signal your AI agents can cite" page is low-effort and is the one channel premortem Agent 8 said to *test cheaply* rather than assume — shipping the page and measuring is the test.

---

## Priority summary

| # | Improvement | Track | Priority | Effort |
|---|---|---|---|---|
| 1 | Brief Brad / start independence Stage 1 (due wk of Jul 6) | Venture | 🔴 P0 | Meeting + disclosure |
| 2 | Kick off reliability study; recruit R4 now | Venture | 🔴 P0 | 6–8 wks elapsed |
| 3 | Merge evidura branch (docs at minimum) | Repo | 🔴 P0 | Hours |
| 4 | Confidentiality review of public API / dev portal | Repo | 🔴 P0 | 1–2 days |
| 5 | Remove `evidura.ai` URLs + "DFVA (Evidura)" from main | Repo | 🔴 P0 | <1 hr |
| 6 | Reconcile business-model numbers (before the Brad meeting) | Venture | 🟡 P1 | 1–2 hrs |
| 7 | Competitor alerts + 3 DVC procurement interviews | Venture | 🟡 P1 | Low / ongoing |
| 8 | Finish rebrand P0 (OG, email sender, title wording) | Repo | 🟡 P1 | Hours |
| 9 | Seed international benchmark programs early | Venture | 🟢 P2 | Uses existing pipeline |
| 10 | Evidura phases into `feature_list.json`; brand-lint guard | Repo | 🟢 P2 | Low |

---

*Sources: `feat/evidura-brand-p0` — `docs/evidura-business-model.md`, `docs/evidura-brand-implementation-plan.md`, `docs/evidura-independence-structure.md`, `docs/evidura-inter-rater-reliability-study.md`, `docs/premortem-transcript-20260630.md`, `brand/evidura/README.md`; `main` — `compass/app/src/compass/apiCompetitiveData.ts`, `components/CodeSnippetLibrary.tsx`, `main.wasp`, `feature_list.json`.*
