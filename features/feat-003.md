---
id: feat-003
name: Lightcast 2026 Workforce Alignment Validation
status: draft
created: 2026-06-13
project: DFVA
---

# Feature: Lightcast 2026 Workforce Alignment Validation

## Description
Lightcast's 2026 predictions declare "escape velocity" for workforce-aligned higher education, with AI job postings up 109% YoY and AI fluency now a baseline workplace expectation. This independently validates DFVA's core premise — that degrees must be assessed on their AI-readiness and workforce durability. This feature integrates the Lightcast data as cited evidence within DFVA's assessment narrative, methodology page, and the EXP-01 acceptance test (workforce alignment scoring).

## Vibe
Authoritative, evidence-backed — DFVA doesn't just claim AI matters, it points to Lightcast's independent 109% YoY data. The validation section should feel like a research citation, not marketing fluff.

## User Stories
- As a **university administrator** viewing an assessment result, I want to see third-party validation of why AI-readiness matters so that I trust the methodology.
- As a **curriculum designer**, I want to understand the workforce data behind DFVA's scoring so that I can advocate for curriculum changes with evidence.
- As a **prospective student**, I want to know that DFVA's methodology is grounded in real labor-market data.
- As a **DFVA team member**, I want the EXP-01 acceptance test (workforce alignment) to cite Lightcast data so the scoring is defensible.

## Technical Design

### Architecture
This is primarily a **content + configuration** feature. No new backend operations or database schema changes are required. A `VALIDATION_SOURCES` constant or config file holds structured citations, which are rendered on the assessment results page and methodology/about page.

```
Config: src/shared/validationSources.ts
   ↓
AssessmentResultsPage ← reads sources relevant to EXP-01 scoring
MethodologyPage ← reads all sources
```

### Current State
| Component | Status | Details |
|-----------|--------|---------|
| Assessment results page | Exists | Shows scores but no external validation citations |
| Methodology/about page | Exists (or being built) | Needs validation sources section |
| EXP-01 acceptance test | Exists | `EXP-01: Workforce Alignment Scoring` — needs Lightcast citation |
| `validationSources` config | ❌ Does not exist | New file to create |

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data format | Static TypeScript config (`validationSources.ts`) | No API call needed; Lightcast data is reference data that changes annually at most |
| Citation model | Name, source URL, key stat, relevance to DFVA, year | Structured enough to render consistently, flexible enough for diverse sources |
| Where it appears | Assessment results ("Why this matters" section) + Methodology page | Directly below the EXP-01 score on results; full listing on methodology |
| Lightcast data verbatim? | Paraphrase key stats, link to source | Avoids copyright issues; links provide full context |
| Future extensibility | Array of sources, filterable by acceptance test | When feat-005 or similar adds more validation sources, no restructure needed |

### Dependencies
- None external — static data, no API integration
- Requires the Lightcast 2026 Predictions blog URL (to be confirmed — search for canonical source)

## Scope

### In Scope (MVP)
- [ ] Create `src/shared/validationSources.ts` with Lightcast 2026 entry
- [ ] Add "Why This Matters" section to assessment results page showing relevant validation sources per score category
- [ ] Add "Validation & Evidence" section to methodology page listing all sources
- [ ] Update EXP-01 acceptance test to reference Lightcast as a validation source
- [ ] Include the 109% YoY AI job postings stat prominently

### Out of Scope (Future)
- Automated data freshness checks (e.g., flagging sources older than 12 months)
- Live API integration with Lightcast (requires Lightcast license — significant cost)
- Additional third-party sources (feat-004, future trend features will add their own)
- Dynamic citation selection based on degree discipline (all degrees see same validation initially)
- Competitor comparison data (e.g., "Coursedog doesn't do this" — handled in feat-002)

## Acceptance Criteria
- [ ] `validationSources.ts` contains at least one Lightcast 2026 entry with: name, URL, key stat, relevance field, year
- [ ] Assessment results page renders "Why This Matters" with the Lightcast citation when showing workforce alignment scores
- [ ] Methodology page has a "Validation & Evidence" section listing Lightcast
- [ ] EXP-01 acceptance test document references Lightcast as evidence
- [ ] All Lightcast stats are paraphrased (not copy-pasted verbatim from the blog)
- [ ] Source URL is a clickable external link

## Open Questions
- [ ] **Canonical Lightcast URL**: What is the exact URL for the "2026 Predictions" or "escape velocity" post? Need to locate the definitive source.
- [ ] **Which stats to highlight**: 109% YoY AI job postings is the headline — are there other stats (AI fluency baseline, industry breakdown) worth including?
- [ ] **Methodology page location**: Is there already a `/methodology` route, or does this need to be created? Check current Wasp routes.
- [ ] **Citation style**: Academic (APA/MLA) or plain web-link? Lean toward web-link for MVP, academic as future option.

## Implementation Tasks
1. Research and locate the canonical Lightcast 2026 Predictions URL
2. Create `src/shared/validationSources.ts` with the `ValidationSource` interface and Lightcast entry
3. Add validation source rendering to the assessment results component (below EXP-01 score)
4. Add or update the methodology page with a validation sources section
5. Update EXP-01 acceptance test documentation to cite Lightcast
6. Verify rendering on assessment results for a test degree
7. Lint, test, commit
