# Australian Job-Insights Data Sources — Landscape & DFVA Fit

The benchmark for this scan is the **UoM Job Insights Report (JIR)** — a per-*degree* record built on **LiveAlumni** (aggregated LinkedIn-style alumni profiles), SSO-gated to UoM staff. For each named program it gives **(1)** the alumni sample size *n*, **(2)** job titles split by career stage (entry 0–1yr / early 1–3yr / senior), **(3)** **named employers** — actual companies like Google, NAB, Woods Bagot — and **(4)** in-use skills. No public Australian source carries all four at degree granularity. This matters for DFVA because **D10 (graduate outcomes)** wants the destinations/salary/employment signal and **D1 (automation exposure)** wants the in-use-skills + occupation-task signal — and the JIR is the only artifact that ties both to a specific UoM degree. Every source below is graded against those four JIR fields. The honest finding: national surveys and government LMI give strong outcomes/salary but **never name employers**; the only sources that name employers are either job-ad universes (open vacancies, not alumni) or the same SSO/paywalled alumni-profile vendors the JIR itself runs on.

## Ranked inventory

Ranked by DFVA-fit (high→low), then obtainability (easy first). Each Source name links to its real URL.

| Source | Provider | Category | Coverage | Access | Obtainability | vs JIR | DFVA fit |
|---|---|---|---|---|---|---|---|
| [JSA — Higher Education Outcomes: Administrative Data](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) | Jobs and Skills Australia (PLIDA: higher-ed records × ATO tax) | govt-LMI | Field-of-study → ANZSCO occupation group at 1/3/5 yrs post-completion; real earnings from tax data | public | easy | falls short | **D10** — strongest national longitudinal earnings + occupation progression (actual tax data) |
| [QILT — Graduate Outcomes Survey (GOS)](https://www.qilt.edu.au/surveys/graduate-outcomes-survey-(gos)) | Social Research Centre (ANU) for Aust. Govt Dept. of Education | national-survey | National graduate survey; all providers; UG/PG; by study area × institution; 117k+ respondents 2024 | public | easy | falls short | **D10** — employment rate + median salary by institution × study area |
| [QILT — Graduate Outcomes Survey – Longitudinal (GOS-L)](https://www.qilt.edu.au/surveys/graduate-outcomes-survey---longitudinal-(gos-l)) | Social Research Centre (ANU) for Aust. Govt Dept. of Education | national-survey | Re-surveys GOS cohort ~3 yrs out; FT employment ~79%→~92%; by field/institution | public | easy | falls short | **D10** — graduate outcome evidence at 3 years out (rate + median FT salary) |
| [LinkedIn Economic Graph (Australia cuts)](https://economicgraph.linkedin.com/) | LinkedIn / Microsoft | commercial | Public workforce reports: in-demand skills by region (skills-genome), talent migration, hiring rate | public | easy | falls short | **D1** — in-demand skills + skills-genome by AU region (per-degree view needs paid Talent Insights) |
| [Lightcast — Alumni Pathways](https://lightcast.io/products/software/alumni-pathways) | Lightcast (ex Emsi Burning Glass); NSC + 120M+ profiles | commercial | Per major: titles, named employers, in-demand skills, modelled salary, % in related field | paywall | blocked | **exceeds** | market-snapshot (named employers/major) + **D1** (skills) + **D10** (modelled salary) |
| [Lightcast — Labour Insight ANZ (job postings)](https://lightcast.io/products/data/overview) | Lightcast (ex Burning Glass/EMSI) | commercial | AU+NZ postings: employer name per ad, titles + experience level, 34k-skill taxonomy, advertised salary | paywall | blocked | falls short | **D1** — market-standard open skills taxonomy + named employers, but describes OPEN VACANCIES not alumni |
| [LiveAlumni — Graduate Outcome Reports](https://www.livealumni.com/) | LiveAlumni (the JIR's own vendor) | commercial | Per degree/major × cohort: top titles, top employers + industries (real companies); ~2011→present | sso-gated | blocked | **matches** | market-snapshot — named employers + top titles per degree (the JIR's raw feed) |
| [JSA — Occupation & Industry Profiles](https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles) | Jobs and Skills Australia (DEWR) | govt-LMI | ~1,200+ ANZSCO occupations: employment, demographics, median earnings, tasks, educational attainment | public | easy | falls short | **D1** — per-occupation tasks + educational attainment; also D10 (median earnings) |
| [ABS — Census TableBuilder / 'Qualifications and Work'](https://www.abs.gov.au/statistics/microdata-tablebuilder/available-microdata-tablebuilder/qualifications-and-work) | Australian Bureau of Statistics | govt-LMI | Population cross-tab occupation × field of qualification × employment status; ANZSCO to 6-digit | free-register | medium | falls short | **D10** — qualification → employment status at population scale (qualification field, not degree) |
| [ABS — Characteristics of Employment / EEH](https://www.abs.gov.au/statistics/labour/earnings-and-working-conditions/characteristics-employment-australia/latest-release) | Australian Bureau of Statistics | govt-LMI | Earnings/hours/type by ANZSCO occupation + industry; the salary backbone JSA draws on | public | easy | falls short | **D10** — median earnings by occupation (occupation grain, not degree) |
| [Jobs and Skills Atlas](https://www.jobsandskills.gov.au/jobs-and-skills-atlas) | Jobs and Skills Australia | govt-LMI | Most granular JSA product: occupation × industry × region (SA4) + training completions + attainment | public | easy | falls short | **D10** — regional degree→occupation flows + employment rate (occupation aggregate) |
| [LinkedIn — Alumni Tool / 'Alumni' (People) tab](https://www.linkedin.com/school/the-university-of-melbourne/people/) | LinkedIn / Microsoft | commercial | School-page People tab: where alumni work, what they do/studied, location; structurally closest to LiveAlumni | register-gated | blocked | falls short | market-snapshot — named employers + top functions per institution (no degree grain, no stage split) |
| [ComparED (QILT consumer front-end)](https://www.compared.edu.au/) | Aust. Govt Dept. of Education (QILT) | govt-LMI | Compare up to 6 institutions × study areas; 43 unis + ~90 providers; median salary + employment rate | public | easy | falls short | **D10** — graduate outcome evidence, consumer-grade |
| [SEEK Employment Trends / Advertised Salary Index](https://talent.seek.com.au/market-insights) | SEEK Ltd | commercial | Advertised salary by role/classification/location; job-ad volume index; AI-skills-in-ads pieces | paywall | medium | falls short | **D10** — advertised-salary index by role (demand-side, occupation grain) |
| [Adzuna Australia](https://www.adzuna.com.au/) | Adzuna (job-ad aggregator) | commercial | Live aggregated listings: company on listing (API), salary histograms/regional/historical trends | api | medium | falls short | market-snapshot — named employers on live vacancies + D10 salary histograms (vacancies not alumni) |
| [Prosple / GradAustralia](https://au.prosple.com/top-employers) | Prosple (owns GradAustralia) | commercial | Graduate-employer directory: named firms tagged by discipline recruited from; Top-100 rankings | free-register | easy | falls short | market-snapshot — named employer × discipline (which firms WANT grads, reverse of JIR) |
| [University GOS pages + LinkedIn Alumni (DIY peer route)](https://www.unisc.edu.au/graduation/graduate-outcomes-survey) | Each uni's quality office (republished QILT) + LinkedIn | uni-alumni | (1) uni GOS pages = n/salary/rate; (2) LinkedIn Alumni tool = top companies + functions | free-register | medium | falls short | **D10** (republished GOS) + market-snapshot (LinkedIn named employers) |
| [Internet Vacancy Index (IVI)](https://www.jobsandskills.gov.au/data/internet-vacancy-index) | Jobs and Skills Australia | govt-LMI | Monthly online job-ad counts to ANZSCO 4-digit; national/state/regional; series from 2006 | public | easy | falls short | market-snapshot — labour demand (vacancy counts/index) by occupation; not outcomes |
| [QILT — Employer Satisfaction Survey (ESS)](https://www.qilt.edu.au/surveys/employer-satisfaction-survey-(ess)) | Social Research Centre / Aust. Govt | national-survey | Only national survey linking graduates to direct supervisors; employer-rated skill satisfaction | public | easy | falls short | **D1** — employer-rated skill satisfaction categories (weak, generic) |
| [Prosple — university careers directories (RMIT, Deakin)](https://rmit.prosple.com/) | Prosple, white-labelled per university | uni-alumni | Uni-branded grad-employer profiles, day-in-the-life, open grad jobs; employer-centric not alumni | public | easy | falls short | market-snapshot — named grad-program employers under a uni brand |
| [SEEK Grad / Indeed Hiring Lab — Australia](https://www.hiringlab.org/au/) | Indeed (Recruit Holdings) | commercial | Macro labour research: advertised-wage tracker (open data on GitHub), postings index, AI-in-postings | public | easy | falls short | **D10** — advertised-wage tracker (macro); weak D1 AI-in-postings signal |
| [Victorian Employment Projections Dashboard (state tier)](https://www.vic.gov.au/employment-projections-dashboard) | Victorian Skills Authority | govt-LMI | 3/10-yr employment projections by region/industry/occupation; education pathways. Forward-looking | public | easy | falls short | market-snapshot — forward-looking occupation demand projections + education pathways |
| [QILT — Student Experience Survey (SES)](https://www.qilt.edu.au/) | Social Research Centre / Aust. Govt | national-survey | Current-student experience (teaching, engagement, skills development). Not an outcomes source | public | easy | falls short | market-snapshot — none of the four JIR fields; completeness only |
| [GradStats / Australian Graduate Survey (legacy)](https://www.nagcas.org.au/research/gradstats) | Graduate Careers Australia / NAGCAS | national-survey | Former national grad survey; last AGS 2015 (replaced by QILT/GOS). Historical file request-only | request-gated | blocked | falls short | **D10** — historical salary/employment-rate only; not a live option |

## Comparison vs the UoM JIR

The JIR's four distinguishing fields as columns (✓ present · partial · ✗ absent), plus salary and employment-rate (which most government sources carry and the JIR does *not*).

| Source | Sample n | Titles by stage | Named employers | Skills | Salary | Employment rate |
|---|---|---|---|---|---|---|
| **UoM Job Insights Report (benchmark)** | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| JSA — Higher Education Outcomes (admin data) | partial | ✗ | ✗ | ✗ | ✓ | ✓ |
| QILT — Graduate Outcomes Survey (GOS) | partial | ✗ | ✗ | ✗ | ✓ | ✓ |
| QILT — Graduate Outcomes Survey – Longitudinal | partial | ✗ | ✗ | ✗ | ✓ | ✓ |
| LinkedIn Economic Graph (AU) | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| Lightcast — Alumni Pathways | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ |
| Lightcast — Labour Insight ANZ (postings) | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ |
| LiveAlumni — Graduate Outcome Reports | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| JSA — Occupation & Industry Profiles | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| ABS — Census TableBuilder (Qualifications & Work) | partial | ✗ | ✗ | ✗ | ✗ | ✓ |
| ABS — Characteristics of Employment / EEH | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Jobs and Skills Atlas | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| LinkedIn — Alumni Tool (People tab) | ✗ | ✗ | partial¹ | ✗ | ✗ | ✗ |
| ComparED | partial | ✗ | ✗ | ✗ | ✓ | ✓ |
| SEEK Employment Trends / Salary Index | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Adzuna Australia | ✗ | ✗ | ✓ | ✗ | ✓ | ✗ |
| Prosple / GradAustralia | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| University GOS pages + LinkedIn (DIY peer route) | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ |
| Internet Vacancy Index (IVI) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| QILT — Employer Satisfaction Survey (ESS) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Prosple — uni careers directories (RMIT, Deakin) | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| Indeed Hiring Lab — Australia | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ |
| Victorian Employment Projections Dashboard | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| QILT — Student Experience Survey (SES) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| GradStats / AGS (legacy, discontinued) | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

¹ **Named-employers for the LinkedIn Alumni Tool is downgraded to "partial" after adversarial verification.** On a live, unauthenticated visit (2026-06-21) the School-page People tab redirected to LinkedIn Learning marketing and surfaced *no* alumni records — none of the four fields rendered. The "where graduates are hired" capability exists only behind an authenticated (and likely paid Talent Insights / Learning) gate, so it is not freely obtainable and could not be confirmed live. Obtainability is corrected from "medium" to **blocked**, access to **register-gated**.

## Obtainable now (shortlist)

The sources graded easy/medium that best approximate JIR granularity for an immediate sample-pull. None name employers *and* split by stage at degree grain — that combination does not exist publicly — so the shortlist is the strongest *partial* coverage you can pull today.

1. **JSA — Higher Education Outcomes (admin data)** — the strongest free analogue. **How to pull:** download the XLSX data files directly (no login) from the publication page — `Higher Education Outcomes - Work and Occupation` (XLSX) and `... - Income` (XLSX). Gives field-of-study → ANZSCO occupation group + real (ATO) earnings at 1/3/5 years out. Closest thing to a career-progression view, by occupation group not titles.
2. **QILT — Graduate Outcomes Survey (GOS)** — the canonical outcomes layer. **How to pull:** download the *2024 GOS National Report* PDF + *National Report Tables* (ZIP of Excel tables) from the GOS survey page; employment rate + median FT salary by study area × institution. For UoM-specific cuts, use the provider portal (UoM login) — public tables suppress cells at n<25.
3. **JSA — Occupation & Industry Profiles** — the best free D1 input. **How to pull:** download `Occupation profiles data - <month>.xlsx` from the profiles page (anonymous direct download); per-occupation tasks + educational attainment + median earnings, keyed to ANZSCO codes.
4. **LinkedIn Economic Graph (AU) + LinkedIn Alumni tool** — the only easy-ish route to skills-by-region and (with a logged-in account) named employers per institution. **How to pull:** read the public Economic Graph reports/dashboards for in-demand skills by AU region; for named employers, browse the UoM School-page Alumni/People tab while signed in to a (free) LinkedIn account — aggregate view only, no export/API, ToS-restricted for bulk.

## DFVA fit

**Feeds D10 (outcomes — employment rate, salary, occupation progression):**
- *Strongest free:* JSA — Higher Education Outcomes (real ATO earnings, 1/3/5-yr occupation progression by field); QILT GOS + GOS-L (employment rate + median FT salary by study area × institution, short-term and 3-yr).
- *Supporting:* Jobs and Skills Atlas (regional degree→occupation flows); ComparED (consumer-grade salary + rate); ABS EEH / Census TableBuilder (population-scale earnings + employment status by qualification/occupation).

**Feeds D1 (automation exposure / skills):**
- *Strongest:* Lightcast Labour Insight ANZ (34k-skill open taxonomy — market standard) and LinkedIn Economic Graph (in-demand skills + skills-genome by AU region) — both skills-rich, but Lightcast is paywalled and LinkedIn's per-degree view is gated.
- *Free government:* JSA Occupation & Industry Profiles (per-occupation tasks + educational attainment) — the most usable free D1 input; QILT ESS (employer-rated skill satisfaction, weak/generic).

**Feeds market-evidence snapshots (named employers / demand-side context):**
- *Named employers, alumni-derived (gated):* LiveAlumni (the JIR's own feed) and Lightcast Alumni Pathways — the only true degree→employer sources, both blocked (SSO/paywall).
- *Named employers, demand-side (open vacancies, NOT alumni — flag the axis difference):* Adzuna (company per listing + salary histograms, free API); Lightcast Labour Insight; Prosple/GradAustralia (firms that recruit a discipline). LinkedIn Alumni tool names employers per institution but only behind login and without degree grain.

## OpenAthens (UoM library) findings

The OpenAthens scan pulled QILT detail on the first pass; **IBISWorld AU and Statista initially failed authentication** (Okta SSO widget didn't hydrate) but were **successfully retrieved on a later retry** with a live UoM session. Free-tier brief: `/tmp/au-job-insights/openathens-market-scan.md`; premium brief: `/tmp/au-job-insights-premium/openathens-market-scan.md`.

**QILT GOS 2024 specifics retrieved (the D10 backbone):**
- Undergraduate FT employment **74.0% in 2024** (down from 79.0% in 2023 — the largest YoY drop of any study level); overall employment (FT+PT) **86.9%**; median annual FT salary **AUD $75,000** (+5.6% nominal). Survey base: **117,794 valid responses, 38.5% response rate, 130 institutions incl. 42 universities**, 4–6 months post-completion.
- Wide field spread (undergraduate FT employment): Rehabilitation **94.9%**, Medicine **90.4%**, Engineering **85.5%**, **Computing & information systems 67.8%** (down from 74.4%, salary $75,300), Science & maths **63.6%**, Creative arts **48.4%**.
- AI-relevant job-quality proxies: **28.3%** of FT undergraduates not fully using their skills/education; underemployment **17.7%**; only **57.7%** in managerial/professional FT occupations.
- Granularity confirms the JIR gap: QILT publishes by national **"study area", not per-institution program** (cells suppressed at n<25), so **no UoM-program-code-level rates** exist in these sources.

**IBISWorld AU — retrieved (retry #2).** Report **P8102 "University & Other Higher Education in Australia"** (Jun 2026) sizes the buyer market DFVA sells into: **A$45.4bn revenue across just 41 institutions** (historic CAGR +0.7%/yr 2021–26; forecast +2.8%/yr to 2031), **141,000 staff**, profit **down −18.1% to A$2.4bn** (margin 5.3%) as international-fee revenue was reset by visa caps. Top-4 ≈ 30.8% combined share — **USyd 8.2%, Monash 8.1%, UNSW 7.3%, UoM 7.2%** (4th-largest; 4th consecutive operating deficit in 2025, shelved a new engineering campus), UQ 6.4%, ANU 3.3%; all other providers 69.2% (A$31.4bn). Structural shock: international-commencement cap (NPL) 270k→295k (2025→26), offshore visa refusal **32.5%** (Feb 2026, ~20-yr high), intl students −9% YoY, A$2,000 visa fee. → **a small, concentrated, financially-stressed set of ~41 buyers** — directly relevant to a degree future-viability product.

**Statista — retrieved (retry #2; record `e1001943~S31`).** QILT GOS 2023 by study area (116,250 respondents, 126 institutions): median FT graduate salary spans **Dentistry A$94,400 (top) → Pharmacy A$55,500 (lowest)**, with Computing A$74,400, Engineering A$75,000, Creative arts A$59,500. Overall employment spans **Pharmacy 97.9% (top) → Science & maths 69.8% (lowest)**; **Computing & information systems sits 19th of 21 at 83.1%** — above-median salary but below-median employment, exactly the AI-pipeline divergence DFVA exists to flag.

**OECD / IMF macro frame (free, retrieved) — useful for DFVA's TAM/automation thesis, not per-degree:** Australian tertiary 25–34s unemployment **1.7%** vs 4.9% OECD avg; tertiary wage premium **+29%** vs +54% OECD avg; OECD field-of-study employment ICT **90%** / Engineering **89%** / Arts & humanities **84%**. IMF: **~40%** of global / **~60%** of advanced-economy employment AI-exposed, **~33%** of advanced-economy jobs high-exposure/low-complementarity (displacement-prone). No standalone Australia AI-exposure figure exists in OECD/IMF — for that, use JSA/ABS.

## Sources

- QILT — Graduate Outcomes Survey (GOS): https://www.qilt.edu.au/surveys/graduate-outcomes-survey-(gos)
- QILT — Graduate Outcomes Survey – Longitudinal (GOS-L): https://www.qilt.edu.au/surveys/graduate-outcomes-survey---longitudinal-(gos-l)
- QILT — Employer Satisfaction Survey (ESS): https://www.qilt.edu.au/surveys/employer-satisfaction-survey-(ess)
- QILT — Student Experience Survey (SES): https://www.qilt.edu.au/
- ComparED (QILT consumer comparison): https://www.compared.edu.au/
- LinkedIn — Alumni Tool / 'Alumni' (People) tab (UoM): https://www.linkedin.com/school/the-university-of-melbourne/people/
- LinkedIn Economic Graph (Australia cuts): https://economicgraph.linkedin.com/
- ABS — Census TableBuilder / 'Qualifications and Work': https://www.abs.gov.au/statistics/microdata-tablebuilder/available-microdata-tablebuilder/qualifications-and-work
- ABS — Characteristics of Employment / Employee Earnings & Hours: https://www.abs.gov.au/statistics/labour/earnings-and-working-conditions/characteristics-employment-australia/latest-release
- Jobs and Skills Australia — Occupation & Industry Profiles: https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles
- Jobs and Skills Atlas: https://www.jobsandskills.gov.au/jobs-and-skills-atlas
- Internet Vacancy Index (IVI): https://www.jobsandskills.gov.au/data/internet-vacancy-index
- JSA — Higher Education Outcomes: Exploring Administrative Data: https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data
- Victorian Employment Projections Dashboard: https://www.vic.gov.au/employment-projections-dashboard
- LiveAlumni — Graduate Outcome Reports: https://www.livealumni.com/
- Lightcast — Alumni Pathways: https://lightcast.io/products/software/alumni-pathways
- Lightcast — Labour Insight ANZ (job postings): https://lightcast.io/products/data/overview
- Prosple / GradAustralia (top employers): https://au.prosple.com/top-employers
- Prosple — university careers directories (RMIT): https://rmit.prosple.com/
- University-published GOS page (example, UniSC): https://www.unisc.edu.au/graduation/graduate-outcomes-survey
- SEEK Employment Trends / Market Insights / Advertised Salary Index: https://talent.seek.com.au/market-insights
- Adzuna Australia: https://www.adzuna.com.au/
- Indeed Hiring Lab — Australia: https://www.hiringlab.org/au/
- GradStats / Australian Graduate Survey (legacy): https://www.nagcas.org.au/research/gradstats
- OECD — Education at a Glance 2025 (Australia Country Note): https://doi.org/10.1787/1c0d9c79-en
- OECD — Employment Outlook 2023: AI and the Labour Market: https://doi.org/10.1787/08785bba-en
- IMF — SDN/2024/001 "Gen-AI: AI and the Future of Work": https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379
