---
id: feat-002
name: Coursedog LMI Fast-Follow Response
status: draft
created: 2026-06-12
project: DFVA
priority: high
score: 9
type: competitor_move
source: Coursedog via Mapademics case study
---

# Feature: Coursedog LMI Fast-Follow Response

## Description
Coursedog shipped LMI-in-workflow via Mapademics (May 2026). DFVA must differentiate on methodology (AI-durability scoring vs generic LMI) and accelerate the independent-standard positioning (H2). This feature covers the messaging, positioning, and in-app narrative updates needed to maintain DFVA's competitive edge against the first credible fast-follower threat.

## Vibe
Confident, evidence-backed, methodologically superior — DFVA doesn't react to competitors, it *reframes* the conversation.

## User Stories
- As a **university program director**, I want to see at a glance *why* DFVA's scoring is more trustworthy than generic LMI overlays so that I can defend our curriculum decisions to faculty and accreditation bodies.
- As a **prospective university buyer**, I want a clear comparison between DFVA and Coursedog/Mapademics LMI so that I understand the value of choosing an independent methodology over an ERP vendor's add-on.
- As the **DFVA product lead**, I want the differentiation narrative baked into every page so that every demo and sales conversation reinforces our unique position without requiring the presenter to memorize rebuttals.
- As a **student advisor**, I want to see durability scoring explained in plain language so that I can help students understand which degrees will still be relevant in 10 years.

## Technical Design

### Architecture
This is primarily a **content and positioning feature** with minimal backend changes. It spans three layers:

1. **Narrative Layer (copy/content):** Differentiation messaging embedded across the app — landing page, methodology page, assessment results, and comparison section.
2. **Evidence Layer (data):** Integration of Coursedog/Mapademics public documentation as a structured comparison reference. May require a static data file or lightweight CMS entry for competitor tracking.
3. **Presentation Layer (UI):** Optional "vs Coursedog" expandable section on results/capability pages; "Why DFVA?" badge or tooltip on scoring components.

```
┌──────────────────────────────────────────────────┐
│                  User-Facing Pages                │
│  Landing │ Methodology │ Results │ Comparisons    │
├──────────────────────────────────────────────────┤
│               Differentiation Engine               │
│  - Methodology explainer (AI-durability vs LMI)   │
│  - Independent-standard narrative (H2)            │
│  - Competitor comparison data (static)            │
├──────────────────────────────────────────────────┤
│                 Existing DFVA Core                 │
│  - Scoring engine                                  │
│  - Program assessment                              │
│  - Report generation                               │
└──────────────────────────────────────────────────┘
```

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Competitor data storage | Static JSON/Markdown in `content/competitors/` | No CMS needed yet; easy to update without deploys if served from a CDN path |
| Comparison UI pattern | Expandable "How we compare" section on results page | Non-intrusive; users who care can drill in without cluttering the primary results |
| Landing page update | Add "Independent Methodology" section above fold | Front-loads the differentiation for first-time visitors |
| Messaging tone | Evidence-first, no direct attacks | Professional; cites specific methodology differences rather than "they're bad" |
| H2 narrative acceleration | New `methodology.md` page + home page CTA | Independent-standard narrative needs its own canonical URL for SEO and linking |

### Dependencies
- Existing DFVA scoring engine (no changes needed)
- Existing Wasp 0.22 / React 19 / Prisma stack
- Public Coursedog + Mapademics documentation (research, not integration)
- Lightcast 2026 data (feat-003 — can cross-reference once available)

## Scope

### In Scope (MVP)
- [ ] **Methodology page** (`/methodology`): New page explaining AI-durability scoring vs generic LMI, with citations
- [ ] **Landing page update:** "Independent Methodology" section added above the fold, linking to methodology page
- [ ] **Results page "How we compare" section:** Expandable component showing DFVA vs vendor-LMI differences, keyed to the specific program being assessed
- [ ] **Competitor reference data:** `content/competitors/coursedog-mapademics.md` with structured comparison points
- [ ] **One-sentence differentiator:** Concise tagline/sentence embedded in assessment results header (e.g., "Scored using AI-durability methodology — not generic labour market data")

### Out of Scope (Future)
- Automated competitor monitoring pipeline (manual updates for now)
- Interactive side-by-side program comparison tool
- Live LMI data ingestion for real-time comparison
- Video/animated methodology explainer
- Third-party validation badges or certifications
- Multi-competitor comparison matrix (TechnologyOne, other ERPs)

## Acceptance Criteria
- [ ] `/methodology` page renders and explains AI-durability scoring in plain language with at least 3 citations
- [ ] Landing page shows "Independent Methodology" section with CTA to methodology page
- [ ] Results page includes expandable "How we compare" section that references Coursedog/Mapademics LMI limitations
- [ ] Comparison content is sourced from public Coursedog + Mapademics docs (linked in the competitor reference file)
- [ ] All new copy reviewed by product lead before merge
- [ ] No regressions in existing assessment flow or report generation
- [ ] Methodology page is indexed and has proper `<title>` and meta description for SEO

## Non-Functional Requirements
- **Performance:** New page loads < 2s (static content, no DB queries)
- **Security:** Public pages only — no auth changes
- **Accessibility:** WCAG 2.1 AA on all new pages and components
- **Observability:** Standard Wasp logging; no new metrics needed for MVP

## Open Questions
- [ ] Should the "How we compare" section be shown to all users or only authenticated ones? [TBC — leaning public for SEO value]
- [ ] Do we have legal clearance to name Coursedog/Mapademics in public-facing content? [TBC — may need to use generic "ERP vendor LMI" language]
- [ ] Should methodology page include Lightcast validation (feat-003) or keep them separate until both are done? [TBC — suggest cross-linking after both are live]
- [ ] What's the approval process for competitive positioning copy? Legal review needed?

## Implementation Tasks
1. Research and document Coursedog/Mapademics LMI methodology from public sources → `content/competitors/coursedog-mapademics.md`
2. Draft methodology page copy explaining AI-durability scoring vs LMI
3. Create `/methodology` route and page component (React, Wasp page)
4. Update landing page with "Independent Methodology" section
5. Build "How we compare" expandable component for results page
6. Add one-sentence differentiator to assessment results header
7. Review all copy with product lead
8. Merge → deploy → monitor page analytics
