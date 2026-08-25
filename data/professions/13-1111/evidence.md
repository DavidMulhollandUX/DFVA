# Deep Research Evidence Log: Management Analysts (13-1111)

**Generated:** 2026-08-25 | **Window:** 2026-02-28 to 2026-08-25 | **Method:** live five-lane research per docs/dfva-profession-deep-research.md

## Run summary

Five lanes attempted. L1 (regulatory) returned nothing admissible: management analysts have
no statutory register, and no dated regulatory instrument surfaced in the window. That empty
lane is recorded rather than padded. L2 and L3 returned four admitted claims; L4 used the
Workforce Australia public vacancy count because no Adzuna credentials are configured; L5 ran
the last30days engine over Reddit, Hacker News, YouTube and GitHub with a written query plan.

## Admitted claims and verbatim log

### Claim `ma-01` (L3 · trade-press-dated) — disposition: scoped

> "Deloitte Australia wants to more than triple its managed services arm into a $1 billion business by 2030, offsetting the threat from artificial intelligence that may automate one-third of routine consulting tasks within three years."

- Source: [Deloitte's $1b back-office bet as AI automates 30pc of consulting tasks](https://www.afr.com/companies/professional-services/deloitte-s-1b-back-office-bet-as-ai-automates-30pc-of-consulting-tasks-20260506-p5zubv), Australian Financial Review, Edmund Tadros, 2026-05-07. URL resolves HTTP 200.
- What it measured: Deloitte Australia chief executive Joanne Gorton's stated internal estimate and investment plan.
- Scope: one firm's statement, not a measured industry rate.
- Refute pass: 3 of 3 skeptics failed to overturn.

### Claim `ma-02` (L3 · trade-press-dated) — disposition: scoped

> "Deloitte thinks it can automate 'routine' tasks mostly done by junior staff, while Minters cuts its graduate cohort."

- Source: [AI automation hits young professionals hardest](https://www.afr.com/companies/professional-services/ai-automation-hits-young-professionals-hardest-20260512-p5zw1z), AFR Professional Life newsletter, 2026-05-13. URL resolves HTTP 200.
- Scope: firm announcements as reported in one newsletter item; not a labour-market statistic.
- Refute pass: 3 of 3 failed to overturn.

### Claim `ma-03` (L2 · industry survey, n=34) — disposition: sourced

> "Seventy-four per cent of the construction leaders we surveyed believe AI will decide who wins in their market within three years. Nine per cent have the data foundation to act on that belief."

- Source: [Beyond the Theatre: State of AI in Australian Construction](https://visibuild.com/news/state-of-ai-in-construction/), Visibuild research report, 2026-08-19. Survey of n=34 AU/NZ general contractors, May 2026. URL resolves HTTP 200; full page stored in `raw/visibuild-state-of-ai.html`.
- Scope: construction contractors, self-reported, vendor-published directional research. Not about consultants.
- Refute pass: parameters declared by publisher; kept for the client-side readiness picture.

### Claim `ma-04` (L2 · scholarly peer-reviewed) — disposition: sourced

> "After conducting semi-structured interviews with 23 industry experts, findings reveal that while technologies such as building information modelling (BIM) and drones are gaining traction, others like artificial intelligence (AI), internet of things (IoT), robotics and 3D printing remain underutilised or siloed."

- Source: Siriwardhana, Moehler & Fang, "Construction 4.0 in Australia", Journal of Innovation and Knowledge 10(6), 100822, November 2025. https://doi.org/10.1016/j.jik.2025.100822 — resolves via the Monash research portal (research.monash.edu), HTTP 200. Full page stored in `raw/jik-construction40.html`.
- What it measured: thematic analysis of semi-structured interviews, n=23 Australian experts (quantity surveyors 5, architects 5, project managers 5, engineers 5, academics 3).
- Scope: Australian construction sector, purposive qualitative sample.
- Refute pass: peer-reviewed venue, DOI verified, n stated, population matches.

### Claim `ma-05` (L5 · declared forum corpus) — disposition: scoped

> "I just saw a client create a deck using AI and present to leadership, completely without any consulting support"

- Sources:
  - r/consulting thread, 2026-08-04, score 351, 117 comments at capture: https://www.reddit.com/r/consulting/comments/1vfjpib/i_just_saw_a_client_create_a_deck_using_ai_and/
  - r/consulting thread on hallucinations in a Big Four AI report, 2026-07-30, score 340: https://www.reddit.com/r/consulting/comments/1vb21h6/pwc_published_reports_on_ai_marred_by_ai/
  - r/Big4 thread on leadership expectations of AI, 2026-08-11, score 237: https://www.reddit.com/r/Big4/comments/1vlh630/the_real_ai_threat_to_big_4_isnt_automationits/
- Verification: post scores, comment counts, titles and dates re-checked against the arctic-shift archive (`arctic-shift.photon-reddit.com/api/posts/ids`); all match the corpus. reddit.com direct fetches are blocked (HTTP 403), which is why arctic-shift was used.
- Scope: self-selected English-language forums, declared window 180 days. Not prevalence. Sentiment is stated as a judgement anchored to these quotes, not a lexicon score.
- Refute pass: two skeptics failed to overturn; the third defaulted on representativeness, addressed by scoping.

## L4 job ads

No Adzuna API credentials are configured on this machine (`ADZUNA_APP_ID` / `ADZUNA_API_KEY`
absent from the environment and `.env.server`), so the lane fell back to the public Workforce
Australia listing for ANZSCO 224711: 169 vacancies nationally at retrieval, 2026-08-25.
Top skills come from YourCareer's JSA-derived skills-employers-are-looking-for list for
Management Consultant (Communication Skills, Change Management, Stakeholder Management,
Project Management, Building Relationships): https://www.yourcareer.gov.au/occupations/224711/management-consultant (HTTP 200).
Job-ad counts are demand signals, not destinations.

## L5 run record

Engine: `~/.claude/skills/last30days/scripts/last30days.py`, python3.12, `--diagnose` run first.
Providers all false, so the query plan was written by hand (stored beside the payload).
Window: `--days 180 --as-of 2026-08-25`. Subreddits: consulting, managementconsulting, Big4, consultinglife.
Payload: `raw/last30days-2026-08-25.json`, sha256 in `raw/MANIFEST.sha256`.

| Platform | State | Items |
|---|---|---|
| reddit | ok | 16 |
| hackernews | ok | 31 |
| github | ok | 32 |
| youtube | ok | 2 |
| polymarket | no-results | 0 |
| grounding | unreachable (keyless web search unavailable) | 0 |
| x | unauthenticated (bird false) — degraded coverage, not silence | — |
| tiktok / instagram | skipped-unconfigured (no ScrapeCreators key) | — |

Counts recomputed from `items_by_source` in the payload, not estimated.

## Searches that returned nothing or were omitted

- L1 regulatory: no admissible instrument found for this occupation in the window.
- grounding source unreachable; polymarket ran and found nothing relevant.
- Factiva omitted: unattended run, constraint 3.
- Adzuna omitted: no API credentials configured.
- IBISWorld employment statistics paywalled (page returns XX placeholders without a subscription).

## Confidence

Medium. The claim set is led by dated trade press and one peer-reviewed study, but Factiva
was unavailable (constraint 3 bars grading an L3-led set high) and the two scholarly claims
describe construction-sector client organisations adjacent to the destination profession.
