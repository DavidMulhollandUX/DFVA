---
mode: agent
description: Run the complete DFVA three-report workflow for any program URL or UniMelb course code. Sequences assessment → market intelligence → improvement plan, then saves all three reports as markdown files and registers the program in the compass/app web app. Use when you want to run the full pipeline in one shot.
tools:
  - read
  - edit
  - search
  - web
---

Run the full DFVA workflow for the program below. Execute all five stages in sequence. Do not skip stages.

**Input:** ${input:Program URL or UniMelb course code (e.g. https://handbook.unimelb.edu.au/2026/courses/b-sci or just b-sci)}

---

## Stage 1 — Resolve the handbook URL

If the input is a full URL, use it directly as the primary source.
If the input is a course code (e.g. `b-sci`, `mc-is`), construct the URL:
`https://handbook.unimelb.edu.au/2026/courses/[COURSE-CODE]`

Fetch the handbook page. Extract:
- Program name
- Institution (default: University of Melbourne)
- Level (Bachelor / Master / PhD / Certificate / Diploma)
- Duration
- Named majors, units, or specialisations listed
- Any stated graduate outcomes or career information

Derive the course-code slug from the URL (e.g. `b-sci`, `mc-is`, `b-des`). All saved files use this slug.

---

## Stage 2 — DFVA Viability Assessment

Apply the full DFVA rubric from `.github/copilot-instructions.md`. Score all 10 dimensions plus bonus (0–3 each). Compute total /36 and risk band.

**Required output sections (exact order):**
1. PROGRAM PROFILE
2. AUTOMATION EXPOSURE PROFILE (table: Year / Typical Tasks / Automation Risk)
3. DFVA SCORECARD (table with all 11 rows + evidence)
4. THREE THRESHOLD QUESTIONS (Q1/Q2/Q3 with YES, NO, or UNCERTAIN and rationale)
5. ANALOGUE GRADUATE PROFILE
6. VERDICT (commit to a risk band; no hedging)
7. RECOMMENDATIONS (table: Priority / Action / Dimension / Effort)
8. THE REDESIGNED GRADUATE PROFILE (~200 words)

**Risk bands:** see `.github/copilot-instructions.md` (Risk Bands).

---

## Stage 3 — Market Intelligence Scan

Generate a labour-market evidence pack for years 1–5 post-graduation. Base on documented hiring trend data, ANZ job-market signals, and professional discourse. State confidence level explicitly.

**Required output sections (exact order):**
1. JOB FAMILY MAP (4–8 families; table: Job Family / Typical Entry Titles / Core Tasks / AI Substitution Pressure / Skills Increasing in Demand / Evidence Notes)
2. RECENT JOB AD SIGNALS (5–6 named signals with direction and curriculum meaning)
3. CURRENT DISCUSSION SIGNALS (X) (5–7 named themes)
4. SKILL SHIFT SUMMARY (two tables: Declining Demand and Rising Demand, each with Skill / Driver / Velocity)
5. CURRICULUM IMPLICATIONS (table: # / Implication / Dimension / Recommended Action)
6. EVIDENCE CONFIDENCE + GAPS (table + critical gaps list)

---

## Stage 4 — Curriculum Improvement Plan

Convert the assessment and market evidence into an implementation-ready improvement plan. Every intervention must map to DFVA dimensions and include a market signal link.

**Required output sections (exact order):**
1. DIAGNOSTIC SUMMARY (score table for all 11 dimensions)
2. SCORE-TO-ACTION MAPPING (table: Dimension / DFVA Score / Gap Diagnosis / Recommended Intervention)
3. MARKET EVIDENCE SNAPSHOT (table: Job Family / Recent Hiring Signal / X Discussion Theme / Curriculum Impact)
4. PRIORITISED INTERVENTIONS TABLE (table: Priority / Action / Target Dimensions / Market Signal Link / Impact / Effort / Owner / Timeline / KPI)
5. 12-MONTH IMPLEMENTATION ROADMAP (plain text phases — do NOT use fenced code blocks)
6. 24-MONTH CAPABILITY ROADMAP (plain text phases with score trajectory — do NOT use fenced code blocks)
7. ASSESSMENT REDESIGN EXAMPLES (2–3 specific unit redesigns)
8. AI GOVERNANCE AND QUALITY CONTROLS
9. MEASUREMENT PLAN (leading and lagging indicators tables)
10. RISKS, TRADE-OFFS, AND DEPENDENCIES (table + narrative)
11. REDESIGNED GRADUATE PROFILE (2027 READY) (~200 words)

---

## Stage 5 — Save Reports and Update the App

Save the three reports as markdown files, register the program, and regenerate the app's embedded content.

### 5a — Save report files

Save Stage 2 output as: `reports/dfva-[slug].md`
Save Stage 3 output as: `reports/dfva-market-[slug].md`
Save Stage 4 output as: `reports/dfva-recommend-[slug].md`

Each file must include this metadata footer:
```
Assessment Date: [ISO date]
Source URL: [handbook URL]
Prompt Version: DFVA-COPILOT-PROMPT-v1 / DFVA-COPILOT-MARKET-v1 / DFVA-COPILOT-RECOMMENDER-v1
```

### 5b — Register the program in the app

Follow the full definition of done in `docs/adding-a-course.md`. In short:

1. Add a `PROGRAMS` entry to `compass/app/src/compass/sharedProgramData.ts`
   (scores, 11 dimensions, thresholds, `assessmentSlug`, `marketSlug`,
   `recommendSlug`) and bump `CACHE_VERSION`.
2. Add `reportMeta` entries (assessment + market + recommend) in
   `compass/app/src/compass/ReportDetailPage.tsx`.
3. Author dimension evidence at `dfva/source/evidence/[slug].json`
   (never hand-edit the app's generated `data/dimensionEvidence.ts`).

### 5c — Regenerate embedded report content

Never hand-edit `compass/app/src/compass/reportContent*.ts` — they are
generated from `reports/*.md`. Run:

```
npm --prefix scripts run dfva:gen-content
```

### 5d — Verify

Run `npm --prefix scripts run dfva:check` and
`npm --prefix scripts run dfva:completeness`. Both must pass. Report results.


## Behavior Constraints

- Do not conflate prestige with labor-market durability.
- Commit to a score and risk band — no hedging conclusions.
- If handbook data is incomplete, state assumptions and proceed with best-evidence scoring.
- All five stages must complete before the workflow is considered done.
- Do not create additional markdown documentation files for the workflow itself.
