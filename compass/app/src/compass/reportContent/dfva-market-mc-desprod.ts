// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Design and Production (MC-DESPROD) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Design and Production (MC-DESPROD)
**Assessment Date:** 2026-09-01 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-desprod

---

> **Evidence base note — read first.** The profession record backing this report
> (\`data/professions/100103.json\`) is anchored on the O*NET occupation **Actor**, shared
> across two programs (mc-desprod and mc-thtrwri). Master of Design and Production graduates
> work behind the camera and behind the curtain — production, costume and graphic design for
> film, television, theatre, dance, music and the visual arts, per the program's own handbook
> overview — not as performers. Where a claim concerns performers specifically (AI-generated
> "actors," synthetic-performer contract terms, casting-submission tools), this report says so
> and scopes it as adjacent-industry context rather than a direct measurement of design or
> production-crew demand. No dedicated five-lane research exists yet for the program's own
> destination occupations (production designer, costume designer, stage manager); that gap is
> carried into §6.

## 1. JOB FAMILY MAP

| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Production/Set Design | Junior Production Designer, Assistant Art Director, Set Designer | Translating a script or creative brief into a built, dressed physical world; scenic drawing and CAD documentation; coordinating construction, props and scenic elements against a schedule | **MEDIUM** — 2D concept visualisation is exposed to generative image tools industry-wide, but on-set fabrication, spatial problem-solving and construction supervision are not | Budget- and schedule-constrained design decision-making; CAD and visualisation software fluency | Program teaches "model making, concept drawing, perspective drawing, technical drawing, image processing, layout, illustration, and CAD drafting" (\`dfva/source/evidence/mc-desprod.json\`, C3); the graded "Design budgets & schedules" component evidences real cost/time constraint practice (G2 PASS) |
| Costume Design | Assistant Costume Designer, Wardrobe Coordinator, Costume Design Assistant | Costume concept development, period/character research, garment specification and construction liaison | **LOW** — construction, fitting and materials judgement remain physical, hands-on craft | Sustainable/materials sourcing literacy; digital costume rendering for pitch decks | Handbook overview names costume design for "film, television, theatre, dance, music and the visual arts" as a program specialisation |
| Graphic/Communication Design (creative-arts context) | Junior Graphic Designer, Design Assistant | Visual identity, campaign and promotional material, layout and illustration for arts organisations and productions | **HIGH** — layout, illustration and image-processing tasks are the segment of design work most exposed to current generative-image tooling | Directing and editing AI-generated visual output against a creative brief, rather than manual execution alone | Handbook overview names "graphic ... design for film, television, theatre, dance, music and the visual arts" as a program specialisation; program's own C3 evidence shows "a particular emphasis on the use of graphic software" with no AI-specific content taught |
| Stage Management | Assistant Stage Manager, Production Assistant, Stage Manager | Rehearsal and performance coordination, cueing, cast/crew liaison, on-book tracking | **LOW** — real-time human coordination under live conditions is not automatable with current tooling | Digital cueing and production-management software; cross-team coordination under AI-tool-mediated casting/scheduling workflows | "Stage Manager" is a named alias in the shared profession record (\`data/professions/100103.json\`); program's Industry Practice placements require "a professional production environment" (W3) |
| Production Coordination / Industry Practice (placement-based) | Production Assistant, Industry Placement Trainee | 200-hour supervised placements in a live production environment, with a written host-partner report | **LOW-MEDIUM** — placement roles are typically broad production-support functions, not any single automatable task | Placement-partner project literacy; documented reflective practice | W3 scored Level 3 — core, compulsory, host-supervised, host-reported (\`dfva/source/evidence/mc-desprod.json\`) |

## 2. RECENT JOB AD SIGNALS

This is **real live Adzuna Australian job-ad data** — 137 postings, snapshot
2026-08-31 — not a modelled estimate. It is not, however, a scan of design or production job titles:
the query that produced it was **"actor,"** inherited from the shared profession record. Every
signal below is scoped accordingly; none should be read as a direct measurement of demand for
production, costume or graphic design roles.

1. **137 live "actor" postings exist in the AU Adzuna snapshot, but the employer list shows the
   query is not occupation-specific.** Top employers returned — Mercor, Jobgether, Infinite
   Consulting, AusNet Services, Google, Palo Alto Networks, Accenture — are general technology
   and utilities employers, not screen or theatre production companies. Only **Screen Queensland
   Pty** reads as a genuine industry employer. This indicates the "actor" query string matches
   broadly (job-title substrings, generic listings) rather than surfacing a clean occupational
   segment. Confidence in this list as a picture of *acting* demand is already LOW; confidence in
   it as a picture of *design/production* demand is effectively zero, because no design or
   production job title was queried.
2. **The extracted skill list is a single term: "audition."** That is consistent with the
   dataset actually reflecting performer-casting postings, further confirming this scan does not
   speak to design, costume or graphic-design skill demand.
3. **No Adzuna scan exists in the current evidence base for the program's own destination
   titles** — "production designer," "costume designer," "stage manager," "set designer," or
   "graphic designer (theatre/screen)." This is a direct, named gap, carried forward to §6.
4. **The volume figure (137) is real and can be used as a baseline for a future, correctly
   scoped scan** — the Adzuna retrieval pipeline is functioning correctly; the corrective
   action is re-running the query against a design or production job title, not re-verifying
   the data infrastructure.

## 3. CURRENT DISCUSSION SIGNALS — LOW CONFIDENCE

**What these sources are.** Australian and US trade press ([Fortune](https://fortune.com),
[Deadline](https://deadline.com), [Variety](https://variety.com), [CNN](https://www.cnn.com)),
official regulatory sources (Fair Work Ombudsman, Parliament of Australia, Federal Register of
Legislation), and self-selected practitioner social-media reactions relayed by press. Direct
extraction from X or LinkedIn was **not** performed and no professional forum was sampled —
"discourse" here means the profession record's L1 (regulatory), L3 (union bargaining and
contract-ratification reporting) and L5 (practitioner reaction) claims, each independently dated
and sourced. This section is rated LOW rather than MEDIUM/HIGH confidence for a reason distinct
from source quality: every theme below concerns **performers**, not the design and production
crew this program trains, and the evidence base contains no equivalent sourced discourse for
production, costume or graphic design roles specifically.

### Theme 1 — a binding local-content quota is expanding the volume of Australian drama production that design and production crew are hired onto

The [Communications Legislation Amendment (Australian Content Requirement for Subscription Video
On Demand (Streaming) Services) Act 2025](https://www.legislation.gov.au/C2025A00071/asmade/2025-12-04/text/original/pdf),
passed by the Australian Parliament on 27 November 2025 and in effect from 1 January 2026,
requires streaming platforms with more than one million Australian subscribers to spend at least
10% of local expenditure (or 7.5% of local revenue) on new Australian drama, children's,
documentary, arts and educational content, enforced by the Australian Communications and Media
Authority.

This regulates streaming-platform spending commitments, not hiring outcomes directly — it says
nothing about how much of that expenditure reaches production-design, costume or graphic-design
labour specifically versus other production costs, and nothing about the Australian stage sector
(theatre, dance, music), which the Act does not cover. It supports only a general inference that
more locally commissioned screen content increases the pool of Australian productions requiring
design and production crew.

**Bearing:** G2, W3.

### Theme 2 — the industry is negotiating enforceable AI protections for performers, while no equivalent, sourced discourse exists yet for design or production crew

On 2026-03-28, SAG-AFTRA executive director Duncan Crabtree-Ireland told an AFL-CIO summit the
union was bargaining for a fee ("Tilly tax") on studios using synthetic or digitally replicated
performers, as reported by [Fortune](https://fortune.com/2026/03/28/actors-union-sag-aftra-contract-bargaining-tilly-tax-ai-film-characters-hollywood-studios/).
The resulting contract, ratified by SAG-AFTRA members in June 2026 by an approximately
91.42%-to-8.58% vote and covering 2026-07-01 through 2030-06-30, requires producers to show
synthetic performers provide "significant additional value" over a human actor and to have an
"articulable business reason" before scanning an actor for a digital replica ([Deadline](https://deadline.com/2026/06/sag-aftra-members-approve-amptp-deal-2026-1236941651/),
[Variety](https://variety.com/2026/film/news/sag-aftra-ratification-ai-pension-merger-1236767288/),
both 2026-06-05). In the UK, Equity's indicative ballot (99% of roughly 7,700 balloted members,
[Deadline](https://deadline.com/2025/12/equity-british-actors-vote-digital-scand-ai-dispute-1236652329/),
2025-12-18) supported refusing on-set digital body/facial scans absent stronger consent and
remuneration terms. Working actors — including Emily Blunt, Melissa Barrera, Mara Wilson and
Ralph Ineson — publicly criticised the AI-generated "actress" Tilly Norwood on their own social
accounts ([CNN](https://www.cnn.com/2025/09/30/tech/hollywood-ai-actor-backlash), 2025-09-30).

Every one of these sources concerns the on-set digital scanning and replication of **performers'
bodies and voices**. None of them addresses AI-generated production, costume or graphic design
work, virtual-production set assets, or AI-assisted concept-visualisation tooling — the profession
record's own search log records failed searches for stage-manager and production-crew AI
discourse in this window, finding nothing. The design/production question this theme raises but
does not answer is whether digital-scanning consent-and-compensation frameworks like SAG-AFTRA's
will extend to, or inform, protections for design and production crew whose work (set scans,
digital costume assets) may face a comparable AI-replication question. That is a gap, not a
finding — see §6.

**Bearing:** C1, C3.

## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)

As §3 notes, the sourced discourse evidence in this report concerns performers, not the design
and production crew this program trains, and §2's job-ad scan was queried under "actor," not any
design/production title. Rows below are therefore grounded primarily in §1's job-family AI
substitution ratings (drawn from the program's own handbook overview and Panel C evidence) and
§5's curriculum-implication findings; where a row draws on §3's performer-facing discourse, it is
marked as adjacent-industry context rather than a direct measurement of design or production
crew demand.

| Skill | Direction | Rationale |
|---|---|---|
| AI-directed 2D concept visualisation, with human editing and approval against a creative brief | **↑ Rising** | §1 rates Graphic/Communication Design HIGH substitution pressure because layout, illustration and image-processing tasks are "the segment of design work most exposed to current generative-image tooling," and CI-1 (§5) confirms C3 is capped at Level 1 with no AI-specific content taught. |
| Digital-scan consent, justification, and "additional value" documentation practice | **↑ Rising** | Theme 2 (§3) reports the ratified 2026 SAG-AFTRA contract requiring producers to justify digital scanning and demonstrate "significant additional value" over a human performer — an adjacent-industry signal the same evidence base and CI-5 (§5) both flag as not yet documented for design/production crew specifically, an open question rather than a confirmed extension. |
| Local production-crew demand tied to the streaming local-content quota | **↑ Rising** | Theme 1 (§3) reports the Communications Legislation Amendment Act 2025 (effective 2026-01-01) requiring large streaming platforms to spend at least 10% of local expenditure on new Australian drama, children's, documentary, arts and educational content, which CI-3 (§5) links to the program's existing G2 PASS on the "Design budgets & schedules" component. |
| Budget- and schedule-constrained design decision-making under real production constraints | **→ Stable, differentiating** | §1 names this a rising-demand skill for Production/Set Design, and CI-3 (§5) confirms G2 already passes on graded, defended trade-off decisions — the right foundation to absorb Theme 1's quota-driven production-volume growth. |
| Real-time human coordination and cueing under live production conditions | **→ Stable, differentiating** | §1 rates Stage Management LOW substitution pressure because "real-time human coordination under live conditions is not automatable with current tooling." |
| Hands-on costume construction, fitting, and materials judgement | **→ Stable, differentiating** | §1 rates Costume Design LOW substitution pressure because "construction, fitting and materials judgement remain physical, hands-on craft." |
| Unassisted manual 2D concept illustration and layout execution | **↓ Falling** | §1 and CI-1 (§5) both identify layout, illustration and image-processing as the graphic/communication design segment most exposed to generative-image tooling, consistent with the program's current graphic-software teaching being operation-only (C3). |

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | C3 is capped at Level 1 because the curriculum documents digital-tool *operation* only ("a particular emphasis on the use of graphic software") with no AI content, limitations, ethics or governance anywhere in the extract, while Theme 2 shows the wider entertainment industry actively negotiating consent, scanning-justification and compensation terms for AI-generated content | C3 Technical Currency | Adding AI-tool literacy (limitations, disclosure norms, consent-for-digital-assets practice) to Design and the Production Process or a graphic-software subject would require displacing existing tool-operation content or extending credit points; staff currently teaching operational software skills would need capability development to teach AI governance content, not just tool use |
| CI-2 | C1 grades collaboration only as an outcome, not an assessed practice (Level 1), and no assessed item requires documented human-plus-AI-tool coordination, while Theme 2's sourced casting-platform and disclosure-norm shifts point toward AI-tool-mediated collaboration becoming standard production-office practice | C1 Collaborative Practice | Introducing a graded collaborative-brief component that requires documented AI-tool use alongside human collaborators would need new assessment criteria and moderation guidance; it is an addition, not a substitution, so it adds marking load without removing an existing item |
| CI-3 | G2 already passes on real evidence — the graded "Design budgets & schedules" component in Design and the Production Process assesses defended trade-off decisions under genuine resource constraints, which is the right foundation for Theme 1's quota-driven production-volume growth | G2 Authentic Constraint | None — no intervention proposed and none needed. The existing budget/schedule assessment already covers the skill Theme 1 implies will be in greater demand |
| CI-4 | W3 (Level 3) already places every student in a host-supervised, host-reported professional production placement, which is the right structure to absorb Theme 1's quota-driven expansion in local commissioning, but the evidence extract does not show whether placement partners are drawn from productions that specifically benefit from the streaming-quota regime | W3 Industry Connection | Deliberately expanding the placement-partner pool toward SVOD-funded local drama productions would require new partnership-development capacity outside the subject coordinator's current placement-monitoring role, and is not guaranteed to be available in the Melbourne production market at the volume needed for every cohort |
| CI-5 | This report's own evidence base is anchored on the Actor occupation, not on production, costume or graphic design occupations — every AI-discourse and job-ad signal above is one step removed from the program's actual graduate destinations, which materially limits how far §3 and §4 can support programmatic decisions | Evidence Base | Commissioning a dedicated five-lane profession record under the program's own destination occupation codes (production/set designer, costume designer, stage manager) and a correctly scoped Adzuna job-ad scan (not the "actor" query) is a research-pipeline cost, not a curriculum cost, but is a precondition for a higher-confidence version of this report |

## 6. EVIDENCE CONFIDENCE + GAPS

| Signal Area | Confidence | Gap / Caveat |
|---|---|---|
| §1 Job family map | MEDIUM | Titles and core tasks are grounded in the program's own handbook overview and Panel C evidence; AI-substitution-pressure labels are reasoned judgement, not individually sourced per family |
| §2 Job ad signals | Data authenticity HIGH; relevance to this program LOW | 137-count Adzuna-AU snapshot is real, live data, but was queried under "actor," not any design/production title — see gap 2 below |
| §3 Discussion signals | Source quality HIGH; relevance to this program LOW | Every theme is independently sourced and dated, but concerns performers, not design/production crew — see gap 1 below |
| §4 Skill shift summary | LOW-MEDIUM | Two of five rows are one-step inferences from performer-facing sourced material, not direct evidence for design/production roles; labelled as such in the table |
| §5 Curriculum evidence (Panel C v4.2) | HIGH | Mechanically and adversarially verified 2026-08-31 (\`dfva/source/evidence/mc-desprod.json\`); the strongest evidence layer in this report |
| Graduate destination data (QILT/JSA/labour-evidence) | NOT ASSESSED | No graduate-outcomes data for mc-desprod was consulted for this report; not in scope of the supplied grounding material |

### Critical evidence gaps to close before institutional use:
1. No profession record exists for the program's own destination occupations (production
   designer, costume designer, graphic designer in a creative-arts context, stage manager). This
   report substitutes an Actor-anchored record shared with mc-thtrwri; a dedicated five-lane
   research pass on the correct occupation codes would materially raise every confidence rating
   above.
2. The Adzuna job-ad scan needs re-running against design/production job titles. The current
   137-count "actor" query result should not be cited as design/production labour-market evidence
   beyond confirming the retrieval pipeline works.
3. No graduate destination data (QILT, JSA HEO, or \`data/labour-evidence.json\`) for mc-desprod was
   checked as part of this report — a follow-up pass should confirm whether a JIR or JSA record
   exists for this program before this report is used for Panel A or portfolio-level decisions.
4. The AI-and-digital-scanning discourse in §3 Theme 2 concerns performers only; no source in this
   window addresses whether SAG-AFTRA-style consent/compensation frameworks are being discussed
   for production, set or costume design assets. This is a live open question for the sector, not
   a settled absence — a future pass should search specifically for it rather than infer from the
   performer case.

---

**Assessment Date:** 2026-09-01
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-desprod
**Prompt Version:** DFVA-COPILOT-MARKET-v1

## REAL GRADUATE DESTINATIONS (JSA HEO)

**Where graduates of this field actually work** — [JSA Higher Education Outcomes](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) (ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of education **100103 Drama and Theatre Studies** (n = 1,770 completions). Shares are the percentage of the field's graduates in wage or salary work; the field's ten most common entry occupations account for 45.2% of them, and the 5 largest are shown at each stage.

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Actor (10.2%) · Sales Assistant (General) (7.9%) · Entertainer or Variety Artist (6.2%) · Waiter (4.5%) · General Clerk (3.4%) |
| Early (~3yr) | Actor (10.2%) · Sales Assistant (General) (6.8%) · Entertainer or Variety Artist (5.1%) · General Clerk (2.8%) · Waiter (2.8%) |
| Senior (~5yr) | Actor (8.5%) · Entertainer or Variety Artist (5.1%) · Sales Assistant (General) (4.5%) · General Clerk (2.3%) · Waiter (1.7%) |

**Field grain, not program grain.** These are graduates of the whole Drama and Theatre Studies field of education at every completion level — not this program's graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, so the 1/3/5-year lists move little for most fields.
`,
};

export default content;
