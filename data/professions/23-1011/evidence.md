# Deep Research Evidence Log: Lawyers (23-1011)

**Generated:** 2026-08-25 | **Window:** 2026-02-28 to 2026-08-25 | **Method:** live five-lane research per docs/dfva-profession-deep-research.md

## Run summary

All five lanes attempted. L1 returned two regulatory instruments (the strongest lane for this
occupation). L2 returned a regulator-commissioned census. L3 returned two dated trade-press
items. L4 used YourCareer/Workforce Australia public vacancy counts (no Adzuna credentials on
this machine). L5 ran the last30days engine over r/auslaw, r/Lawyering and r/LawFirm with a
written query plan.

## Admitted claims and verbatim log

### Claim `lawy-01` (L1 · regulatory) — disposition: sourced

> "Lawyers should consult the resources provided by their applicable Law Society or Bar Association." — with the joint statement listed: Law Society of New South Wales, Legal Practice Board of Western Australia and Victorian Legal Services Board and Commissioner, *Statement on the Use of Artificial Intelligence in Australian Legal Practice* (November 2024).

- Sources:
  - [Federal Court of Australia, Generative AI resources: GPN-AI](https://www.fedcourt.gov.au/law-and-practice/practice-documents/practice-notes/gpn-ai/generative-ai-resources-gpn-ai) — page states "At 16 April 2026". Page fetched via extraction; direct fetches return 403 (bot-blocking), cached copy in `raw/fedcourt-gpn-ai.md`.
  - [LPBWA AI Joint Statement](https://www.lpbwa.org.au/artificial-intelligence-joint-statement) — the joint statement page.
- Scope: duties on practitioners using AI; not adoption or employment evidence.
- Refute pass: 3 of 3 failed to overturn.

### Claim `lawy-02` (L2 · regulator-commissioned census) — disposition: sourced

> "The findings reveal that 36.7% of survey respondents are using AI tools in their legal practice, with over half of these using them daily or weekly."

- Source: [Generative AI Use in the Legal Profession: Findings from the 2025 Victorian Lawyer Census](https://lsbc.vic.gov.au/research-centre/what-we-do/publications/generative-ai-use-legal-profession-findings-2025-victorian), VLSB+C Legal Services Research Centre, announced 2026-05-01. URL resolves HTTP 200; announcement page stored in `raw/lsbc_news.html`.
- What it measured: census of Victorian lawyers — AI use share, frequency, task types (information-gathering, drafting, administration dominate), perceived benefits (71.3 per cent efficiency) and risks.
- Scope: Victorian lawyers, self-reported. Not national, not outcomes.
- Refute pass: 3 of 3 failed to overturn; figures cross-checked against the regulator's own news release.

### Claim `lawy-03` (L3 · trade press) — disposition: scoped

> "Top tier law firm MinterEllison this year became the first major Australian firm to cut its graduate cohort due to AI, trimming intake by almost a third."

- Sources:
  - [Minters breaks the big law silence: AI is eating graduate jobs](https://www.afr.com/companies/professional-services/minters-breaks-the-big-law-silence-ai-is-eating-graduate-jobs-20260423-p5zqgh), AFR, 2026-04-23. HTTP 200.
  - [AI to slash graduate law jobs over next decade](https://lsj.com.au/articles/ai-to-slash-graduate-law-jobs-over-next-decade/), Law Society Journal (NSW Law Society), Sam McKeith, 2026-06-11. HTTP 200; full text captured in `raw/lsj_grads.html`. Reports that HSF Kramer, Norton Rose Fulbright, Allens and Mallesons also reduced graduate cohorts while denying generative AI was the cause.
- Scope: large-firm graduate intakes as reported. Firm-level decisions, not labour-market statistics.
- Refute pass: 2 of 3 failed to overturn; third's wording concern resolved by keeping AFR's phrasing verbatim.

### Claim `lawy-04` (L3 · trade press reporting a vendor survey) — disposition: scoped

> "56 per cent of professionals now report use of AI tools in some form" and "one in five (20 per cent) boutique law firms reporting that they have yet to use or experiment with the technology".

- Source: [1 in 5 boutique firms still shy away from AI](https://www.lawyersweekly.com.au/sme-law/43956-1-in-5-boutique-firms-still-shy-away-from-ai), Lawyers Weekly, Grace Robbie, 2026-03-12, reporting Actionstep's 2026 Australia Midsize Law Firm Priorities Report. HTTP 200; full text in `raw/lw_actionstep.html`.
- Scope: midsize/boutique firms, vendor-commissioned survey reported second-hand.
- Refute pass: 3 of 3 failed to overturn.

### Claim `lawy-05` (L5 · declared forum corpus) — disposition: scoped

> Thread title: "Man wins $950,000 after tribunal factors in AI in changing job market"

- Source: [r/auslaw thread](https://www.reddit.com/r/auslaw/comments/1vuuuaz/man_wins_950000_after_tribunal_factors_in_ai_in/), 2026-08-21. Verified against arctic-shift archive: score 50, 7 comments, date matches. reddit.com direct fetches are blocked (HTTP 403).
- Scope: one practitioner thread showing AI-labour-market reasoning entering legal discourse. Not prevalence.
- Refute pass: two failed to overturn; third defaulted on representativeness, addressed by scoping.

## L4 job ads

No Adzuna API credentials configured (`ADZUNA_APP_ID` / `ADZUNA_API_KEY` absent). Fallback:
[YourCareer Solicitor profile](https://www.yourcareer.gov.au/occupations/271311/solicitor)
(HTTP 200): 7009 Workforce Australia vacancies nationally at retrieval, 2026-08-25. Top
skills from the same JSA-derived page: Communication Skills, Litigation, Building
Relationships, Mergers and Acquisitions, Commercial Litigation. Demand signal only.

## L5 run record

Engine run with `--diagnose` first; hand-written plan; window `--days 180 --as-of 2026-08-25`;
subreddits auslaw,Lawyering,LawFirm,lawfirm. Payload `raw/last30days-2026-08-25.json`,
sha256 in `raw/MANIFEST.sha256`.

| Platform | State | Items |
|---|---|---|
| reddit | ok | 5 |
| hackernews | ok | 36 |
| youtube | ok | 3 |
| github | partial | 1 |
| polymarket | no-results | 0 |
| grounding | unreachable | 0 |
| x | unauthenticated — degraded coverage, not silence | — |
| tiktok/instagram | skipped-unconfigured | — |

Counts recomputed from `items_by_source`.

## Searches that returned nothing or were omitted

- L2 scholarly repositories: no peer-reviewed effect-size study of AI on Australian legal employment surfaced inside the window beyond the census above; the QUT narrative-analysis paper cited in LSJ sits outside the window and was not admitted as its own claim.
- grounding unreachable; polymarket no results.
- Factiva omitted (unattended run, constraint 3).
- Adzuna omitted (no credentials).
- fedcourt.gov.au blocks scripted fetches (HTTP 403); content verified via extraction and cached copy committed to raw/.

## Confidence

High. Two L1/L2-class claims plus a declared L5 corpus satisfy the derivation rule. The
Factiva gap limits L3 reliance, so both trade-press claims carry scopes rather than bare
sourced dispositions.
