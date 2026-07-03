# DFVA Report Template — Canonical Spec

> **Version:** 1.0.0
> **Last updated:** 2026-07-03
> **Lint enforced by:** `scripts/check-report-format.ts` (`npm --prefix scripts run dfva:report-lint`)

This document defines the three canonical DFVA report formats. The lint check (`dfva:report-lint`) validates all `reports/dfva-*.md` files against these specs. Newly generated reports must match; existing reports with format drift are grandfathered in a shrinking allowlist.

---

## 1. Assessment Report (`reports/dfva-<code>.md`)

**Exemplar:** `reports/dfva-mc-jurisd.md`

### Header

```markdown
## DFVA REPORT: <Program Name> (<CODE>)
**Institution:** University of Melbourne | **Level:** <Level> | **Duration:** <Duration>

**Assessment date:** YYYY-MM-DD
**Source URL(s):** <URL>
**Prompt version:** DFVA-COPILOT-PROMPT-v1 + DFVA-COPILOT-MARKET-v1
```

**Rules:**
- Title is `##` (H2), format: `DFVA REPORT: <Name> (<CODE>)`
- Metadata is a SINGLE line with pipe separators: `**Institution:** X | **Level:** Y | **Duration:** Z`
- `**Assessment date:**` — lowercase "d" in "date"
- Optional accreditation line after Source URL

### Sections

All 10 sections are REQUIRED, numbered `### 1.` through `### 10.`:

| # | Heading | Required? |
|---|---------|-----------|
| 1 | `### 1. PROGRAM PROFILE` | ✅ |
| 2 | `### 2. AUTOMATION EXPOSURE PROFILE` | ✅ |
| 3 | `### 3. MARKET EVIDENCE SNAPSHOT` | ✅ |
| 4 | `### 4. DFVA SCORECARD` | ✅ |
| 5 | `### 5. THREE THRESHOLD QUESTIONS` | ✅ |
| 6 | `### 6. ANALOGUE GRADUATE PROFILE` | ✅ |
| 7 | `### 7. VERDICT` | ✅ |
| 8 | `### 8. RECOMMENDATIONS` | ✅ |
| 9 | `### 9. THE REDESIGNED GRADUATE PROFILE` | ✅ |
| 10 | `### 10. MARKET CONFIDENCE NOTE` | ✅ |

Also required after section 10:
- `### MARKET DATA` — a 2-column table (`| Metric | Value |`) with at minimum: Field, Full-time employment, Median starting salary, Employment (3yr), Occupation demand, AI automation exposure, Sources

### Section 4 (DFVA SCORECARD) rules

The scorecard table must have:
- Header: `| # | Dimension | Score (0-3) | Evidence-based rationale |`
- Exactly 11 data rows (D1–D10 + B for the irreplaceability bonus)
- After the table: `**TOTAL: N / 36**` on its own line
- Followed by: `**Risk band: <BAND> (<range>)**` on its own line
- Risk bands: RESILIENT (28-36), MODERATE RISK (20-27), HIGH RISK (12-19), CRITICAL (0-11)

### Section 5 (THREE THRESHOLD QUESTIONS) rules

Each question must have an answer from the set `{YES, NO, UNCERTAIN, N/A}`:

```markdown
- **Q1:** <question text>
  **YES** — <rationale>
- **Q2:** <question text>
  **NO** — <rationale>
- **Q3:** <question text>
  **UNCERTAIN** — <rationale>
```

### Section 8 (RECOMMENDATIONS) rules

The recommendations table must have at minimum these 5 columns:
```markdown
| Priority | Action | Dimension | Market Signal Link | Effort |
```

Programs may add extra columns beyond these 5.

---

## 2. Market Intelligence Report (`reports/dfva-market-<code>.md`)

**Exemplar:** `reports/dfva-market-mc-jurisd.md`

### Header

```markdown
# DFVA MARKET INTELLIGENCE: <Program Name> (<CODE>)
**Assessment Date:** YYYY-MM-DD
```

**Rules:**
- Title is `#` (H1), format: `DFVA MARKET INTELLIGENCE: <Name> (<CODE>)`
- `**Assessment Date:**` — capital "D" in "Date"

### Sections

All 6 sections are REQUIRED, using `##` (H2):

| # | Heading |
|---|---------|
| 1 | `## 1. JOB FAMILY MAP` |
| 2 | `## 2. RECENT JOB AD SIGNALS` |
| 3 | `## 3. CURRENT DISCUSSION SIGNALS (X)` |
| 4 | `## 4. SKILL SHIFT SUMMARY` |
| 5 | `## 5. CURRICULUM IMPLICATIONS` |
| 6 | `## 6. EVIDENCE CONFIDENCE + GAPS` |

---

## 3. Redesign / Improvement Plan (`reports/dfva-recommend-<code>.md`)

**Exemplar:** `reports/dfva-recommend-mc-jurisd.md`

### Header

```markdown
## IMPROVEMENT PLAN: <Program Name>

**Current:** N/36 <BAND> | **Duration:** <Duration>
**Target:** N/36 RESILIENT | **Gap:** N points
```

**Rules:**
- Title is `##` (H2), format: `IMPROVEMENT PLAN: <Name>`

### Sections

All 11 sections are REQUIRED, using `## N.` (H2):

| # | Heading |
|---|---------|
| 1 | `## 1. DIAGNOSTIC SUMMARY` |
| 2 | `## 2. SCORE-TO-ACTION MAPPING` |
| 3 | `## 3. MARKET EVIDENCE SNAPSHOT` |
| 4 | `## 4. PRIORITISED INTERVENTIONS TABLE` |
| 5 | `## 5. POST-INTERVENTION PROJECTION` |
| 6 | `## 6. CONSOLIDATED TIMELINE AND MILESTONES` |
| 7 | `## 7. RISK AND MITIGATION` |
| 8 | `## 8. GOVERNANCE AND ACCOUNTABILITY` |
| 9 | `## 9. EVIDENCE BASE AND SOURCES` |
| 10 | `## 10. STAKEHOLDER ENGAGEMENT PLAN` |
| 11 | `## 11. APPENDIX: CURRICULUM MAPPING` |

### Section 4 (PRIORITISED INTERVENTIONS TABLE) rules

The interventions table must have at minimum these 8 columns:
```markdown
| Priority | Action | Target Dimension(s) | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |
```

---

## Variant Formats (to be aligned)

### Category B — 5-section assessment (14 files)

Format: `# DFVA REPORT: Name` (H1, no code), 3-line metadata, `**Assessment Date:**` (capital D), sections 1–5 only.
Files: `dfva-b-sci`, `dfva-mc-ba`, `dfva-mc-arch`, `dfva-mc-eng`, `dfva-mc-it`, `dfva-mc-env`, `dfva-gc-cert`, `dfva-gc-dip`, `dfva-ua`, `dfva-gd-arts`, `dfva-mc-enveng`, `dfva-mc-engmgmt`, `dfva-mc-urbplan`, `dfva-gd-ag`

### Category C — 8-section assessment (12 files)

Format: `## DFVA REPORT: Name (CODE)`, sections 1–6 then VERDICT (5), RECOMMENDATIONS (6), REDESIGNED PROFILE (8). Missing sections 7, 9, 10.
Files: `dfva-746st`, `dfva-527cl`, `dfva-mc-urbdes`, and others per lint output.

### Category D — Stub (27 files)

PhD/doctorate dev-loop stubs with ~3 sections. Minimal content.
Files: all `dfva-dr-phil*` and related doctorate codes.

### Market outlier

`dfva-market-b-des.md` uses `###` (H3) for section headings instead of `##` (H2). Align to H2.
