---
mode: agent
description: Run the complete DFVA three-report workflow for any program URL or UniMelb course code. Sequences assessment → market intelligence → improvement plan, then saves all three reports as markdown files and updates both prototype apps (compass-static and compass/app). Use when you want to run the full pipeline in one shot.
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

## Stage 5 — Save Reports and Update Prototypes

Save the three reports as markdown files and add them to both prototype apps.

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

### 5b — Create per-program report content file and update imports

**Step 1: Create a new per-program content file.**

Create `compass-static/src/data/reportContent.[slug].ts` following this exact pattern (reference: `reportContent.mc-scibit.ts`):

```typescript
export const REPORT_CONTENT_[SLUG_UPPER]: Record<
  string,
  { title: string; institution: string; markdown: string }
> = {
  "dfva-[slug]": {
    title: "[Program Name] — DFVA Assessment",
    institution: "[Institution]",
    markdown: `[Stage 2 content]`,
  },
  "dfva-market-[slug]": {
    title: "[Program Name] — Market Intelligence",
    institution: "[Institution]",
    markdown: `[Stage 3 content]`,
  },
  "dfva-recommend-[slug]": {
    title: "[Program Name] — Improvement Plan",
    institution: "[Institution]",
    markdown: `[Stage 4 content]`,
  },
}
```

Where `[SLUG_UPPER]` is the slug in SCREAMING_SNAKE_CASE (e.g., `mc-datasc` → `MC_DATASC`).

**Critical rules for template literal content:**
- NO backtick characters inside the template literal string
- Convert any fenced code blocks to plain bold-text paragraph format
- If the edit tool fails due to backtick conflicts, use Python via the execute tool to write the file

**Step 2: Add import and spread to `compass-static/src/data/reportContent.ts`.**

Add at the top of the file:
```typescript
import { REPORT_CONTENT_[SLUG_UPPER] } from './reportContent.[slug]'
```

Add inside the REPORT_CONTENT object:
```typescript
...REPORT_CONTENT_[SLUG_UPPER],
```

**Step 3: Add entries to `compass/app/src/compass/reportContent.ts` (inline).**

Add three inline entries (assessment, market, recommend) to the existing Record in `compass/app/src/compass/reportContent.ts`. Use double quotes for keys.

### 5c — Add PROGRAMS entry to programData.ts and ReportsPage.tsx

**compass-static:** Add a new entry to the `PROGRAMS` array in `compass-static/src/data/programData.ts`. Insert before the closing `]` of the array. Uses single quotes:

```typescript
{
  program: '[Program Name]',
  institution: '[Institution]',
  level: '[Level · Duration]',
  date: '[ISO date]',
  score: [total],
  maxScore: 36,
  riskBand: '[RESILIENT | MODERATE RISK | HIGH RISK | CRITICAL]',
  thresholds: { q1: '[YES|NO|UNCERTAIN]', q2: '[YES|NO|UNCERTAIN]', q3: '[YES|NO|UNCERTAIN]' },
  dimensions: [
    { label: 'Automation Exposure', score: [D1], max: 3 },
    { label: 'Systems Thinking', score: [D2], max: 3 },
    { label: 'Technical Depth', score: [D3], max: 3 },
    { label: 'Decision-Making', score: [D4], max: 3 },
    { label: 'AI Literacy', score: [D5], max: 3 },
    { label: 'Domain Depth', score: [D6], max: 3 },
    { label: 'Research Rigour', score: [D7], max: 3 },
    { label: 'Human & Relational', score: [D8], max: 3 },
    { label: 'Curriculum Currency', score: [D9], max: 3 },
    { label: 'Outcome Evidence', score: [D10], max: 3 },
    { label: 'Irreplaceability (bonus)', score: [B], max: 3 },
  ],
  assessmentSlug: 'dfva-[slug]',
  marketSlug: 'dfva-market-[slug]',
  recommendSlug: 'dfva-recommend-[slug]',
},
```

**compass/app:** Add the same entry to the `PROGRAMS` array in `compass/app/src/compass/ReportsPage.tsx`. Uses double quotes for string values.

### 5d — Verify

Run `cd compass-static && npm run build` to confirm no TypeScript errors. Report result.

---

## Behavior Constraints

- Do not conflate prestige with labor-market durability.
- Commit to a score and risk band — no hedging conclusions.
- If handbook data is incomplete, state assumptions and proceed with best-evidence scoring.
- All five stages must complete before the workflow is considered done.
- Do not create additional markdown documentation files for the workflow itself.
