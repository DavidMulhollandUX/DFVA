# UoM Job Insights Reports → DFVA: Findings & Integration Assessment

**Date:** 2026-06-21
**Source:** `careersonline.unimelb.edu.au/s/jobinsightsreports` (authenticated, 9 faculties)
**Collected:** 141 reports → markitdown → structured dataset
**Artifacts:**
- PDFs: `scratch/jobinsights/pdf/<Faculty>/<Program>.pdf`
- Markdown (markitdown): `scratch/jobinsights/md/<Faculty>/<Program>.md`
- Structured data: `scratch/jobinsights/jir_data.json` (141 records)
- DFVA↔JIR map: `scratch/jobinsights/dfva_jir_map.json`

---

## TL;DR — determination

**Yes, this is worth incorporating — and it fixes the single biggest credibility weakness in the DFVA reports.**

The DFVA *market intelligence* and *market evidence snapshot* sections are currently **synthetic** — the reports themselves admit it ("constructed from documented labour market trends", "Pattern-based from known discourse", sourced from global aggregates like WEF / LinkedIn / Stack Overflow). The Job Insights Reports (JIR) are the opposite: **real destination outcomes for ~29,859 University of Melbourne alumni (2015–2025)** — actual job titles by career stage, named employers, and skills, per program, with sample sizes.

That turns the weakest, most hand-wavy part of DFVA (invented hiring signals) into the strongest (verifiable UoM ground truth). **~32 of the 41 DFVA programs (78%) can be grounded in real alumni data** — 16 exact same-name matches, ~16 cognate matches.

---

## 1. What the Job Insights Reports actually contain

Every JIR is the same 2-page template, generated from the **LiveAlumni** employment-data platform, "processed with assistance of a university AI tool and reviewed and curated by University of Melbourne Careers Specialists." Each report gives, for one program:

| Field | Example (Master of Computer Science, n=41) |
|---|---|
| **Alumni sample (n)** | 41 |
| **Entry titles (0–1 yr)** | Software Engineer, ML Engineer, Data Scientist, Cognitive Engineer, AI Engineer |
| **Early-mid (1–2 yr)** | Algorithm Developer, Full Stack Developer, **Quantitative Trader**, Technology Consultant |
| **Mid-senior** | Senior Software Engineer, Senior Developer, Technical Project Manager |
| **Employers** | Google, IBM, Canva, **Optiver, IMC Trading, Akuna Capital**, Accenture, Deloitte, NAB, ANZ, Suncorp, Telstra, 4DMedical |
| **Skills** | Machine Learning, Python, Java, C++, JavaScript, Web Development, Data Mining, Teamwork, Written Communication |

Coverage is substantial: **median n = 90**, 61 reports with **n ≥ 100**, only 10 with n < 30. Largest: Bachelor of Commerce (Finance) n=3,546; Juris Doctor n=1,277; Doctor of Medicine n=762.

---

## 2. Core finding — real ground truth vs DFVA's synthetic evidence

This is the integration thesis, shown on one program.

**DFVA market report for MC-CS** (`reports/dfva-market-mc-cs.md`) invents precise-sounding signals:
> "ML Engineer roles +35% YoY ANZ"… "Quantum computing roles… 47 postings Q1 2026 (Seek)"… "AI Governance Analyst — 34+ new ANZ postings in Q1 2026."

None of these are verifiable; the report's own header flags them as constructed. Meanwhile it **never mentions** the most striking real fact about where UoM CS graduates actually go:

> **Quantitative trading.** Optiver, IMC Trading and Akuna Capital — three of the world's largest proprietary trading firms — are top real employers, and "Quantitative Trader" is a real early-career title. The synthetic report fabricated a quantum-computing statistic and **missed an entire real destination cluster** that sits right there in the alumni data.

That is the pattern across the board: **synthetic data manufactures false precision while missing real signal.** Real JIR data is lower-resolution (no growth %), but it's *true*, *UoM-specific*, and *defensible* in front of a faculty board — which is exactly the audience DFVA is built for.

---

## 3. Coverage — how many DFVA programs can be grounded

41 DFVA programs matched against 141 JIR reports (`dfva_jir_map.json`):

### Exact same-name match — real data, drop-in (16)
`439fs` Food Science (n=50) · `mc-arch` Architecture (621) · `mc-ba` MBA (422) · `mc-clind` Clinical Dentistry (40) · `mc-cs` Computer Science (41) · `mc-datasc` Data Science (96) · `mc-ed` Education (611) · `mc-envsc` Environmental Science (32) · `mc-gencoun` Genetic Counselling (35) · `mc-is` Information Systems (257) · `mc-journ` Journalism (51) · `mc-nursc` Nursing Science (129) · `mc-prop` Property (65) · `mc-propsyc` Professional Psychology (66) · `mc-scibit` Biotechnology (151) · `mc-tesol` TESOL (26)

### Cognate match — same field, different level/specialisation; data transferable with a noted caveat (~16)
`b-sci` Bachelor of Science → the 23 BSc-major JIR reports · `mc-sciphy/sciche/sciear/scibio` Master of Science (X) → Bachelor of Science (X) siblings · `mc-actsc` Actuarial Science → BCom (Actuarial Studies) · `mc-phtyph` Physiotherapy → **Doctor** of Physiotherapy (448) · `mc-urbhort` Urban Horticulture → Doctor of Urban Horticulture (44) · `mc-urbdes` Urban Design → Master of Urban Planning (130) · `mc-bmedsc` Biomedical Science → BSc bio majors · `b-des` Bachelor of Design → 5 Design-major JIR reports · `mc-intedib`/`mc-surged` → Master of Education · `527cl` Clinical Psychology → Master of Applied Psychology (47) · `746st` Engineering Structures → Master of Civil Engineering · `mc-indeng` Industrial Engineering → Master of Mechanical Eng / Engineering Management

### No good real-data proxy (~9)
`mc-scwr` Screenwriting · `mc-climsci` Climate Science · `mc-apbusa` / `mc-busana` (Applied) Business Analytics · `mc-base` Advanced Social Enterprise · `mc-envlaw` Environmental Law · `mc-scibif` Bioinformatics · `mc-sciepi` Epidemiology (closest: Master of Public Health) · `mc-bamktg` (DFVA report title is unresolved — verify the program before matching)

> The matcher is heuristic; the **Exact-16 list is reliable**, the cognate list needs a human glance per row (encoded in `dfva_jir_map.json` with scores).

---

## 4. Is it useful? — mapped to DFVA's own structures

Yes, in four distinct ways, each landing on an existing part of the DFVA reports:

1. **Replace synthetic market evidence with real evidence.** The `JOB FAMILY MAP`, `RECENT JOB AD SIGNALS`, and `MARKET EVIDENCE SNAPSHOT` sections become *real graduate destinations* instead of invented hiring stats — for at least the 16 exact-match programs immediately.

2. **Re-score the `Outcome Evidence` dimension.** DFVA rubric dimension 10 is literally "Outcome Evidence." Right now it's scored on assertion. JIR gives it an actual evidentiary basis (n, real titles, real employers) — and a defensible reason to move a score.

3. **Sanity-check `Automation Exposure` claims.** Where DFVA asserts a program's roles are automatable, the real destination titles either corroborate or contradict it. E.g. MC-CS grads landing as Quantitative Traders / Senior Engineers at Optiver/Google is evidence *against* a high-automation reading — and that's verifiable, not asserted.

4. **Skills-gap input.** JIR `skills` (what graduates actually use) can be diffed against the curriculum and the rubric's technical-depth/AI-literacy dimensions to flag real gaps.

---

## 5. How to incorporate — ranked, concrete

**R1 — Add a "Real Graduate Outcomes (UoM alumni 2015–2025)" block to every assessment report (16 exact now, cognates next).**
A small, clearly-sourced table per report, generated from `jir_data.json`. Honest provenance line: *"Source: UoM Job Insights Report, LiveAlumni, n=NN alumni, 2015–2025."* This is the highest-value, lowest-risk change.

**R2 — Rewrite the synthetic `MARKET EVIDENCE SNAPSHOT` / `JOB FAMILY MAP` rows from real titles+employers** for exact matches, keeping the AI-substitution-pressure column as the *analytical* layer on top of *real* destinations. Demarcate clearly: real outcomes (JIR) vs forward-looking AI judgement (DFVA).

**R3 — Flag every score that the real data contradicts.** Run a pass that compares each DFVA `Outcome Evidence` / `Automation Exposure` rationale against the matched JIR record and lists disagreements for human review. Don't auto-change scores — surface them.

**R4 — Wire it into the generator.** The parser (`scratch/parse_jir.py`) already produces clean JSON. Promote the dataset into the report-generation pipeline (e.g. `dfva/source/`) so a real-outcomes block renders automatically and refreshes when JIR updates.

**R5 — Caveat the cognate/none programs explicitly.** For the ~9 with no proxy, say so in the report rather than papering over with synthetic data — that honesty is itself on-brand for DFVA.

---

## 6. Worked example — MC-CS market evidence, before → after

**Before (synthetic, current `dfva-market-mc-cs.md`):**
> | ML Engineer | Strong demand… +35% YoY ANZ | "Research maturity" as differentiator | … |
> Signal 5 — Quantum computing hiring… 47 postings Q1 2026 (Seek).

**After (real, from JIR n=41):**
> **Real graduate destinations — UoM Master of Computer Science alumni (LiveAlumni, n=41, 2015–2025)**
> - **Entry (0–1 yr):** Software Engineer · ML Engineer · Data Scientist · Cognitive Engineer · AI Engineer
> - **Early-mid (1–2 yr):** Algorithm Developer · Full Stack Developer · **Quantitative Trader** · Technology Consultant
> - **Mid-senior:** Senior Software Engineer · Senior Developer · Technical Project Manager
> - **Employers:** Google · IBM · Canva · **Optiver · IMC Trading · Akuna Capital** · Accenture · Deloitte · NAB · ANZ · Suncorp · Telstra · 4DMedical
> - **Skills in use:** Machine Learning · Python · Java · C++ · JavaScript · Web Development · Data Mining
>
> *DFVA reading:* destinations skew to the least-automatable segment (research-grade ML, systems engineering, quant trading). The quant-trading cluster — invisible in generic market data — corroborates a LOW automation-exposure score for this cohort.

Same section, but every claim is now traceable to UoM's own alumni data.

---

## 7. Caveats / limitations

- **LiveAlumni coverage is partial** — "data of N alumni who studied this degree… (not all alumni)." n is a floor, and skews to alumni with discoverable (LinkedIn-style) profiles.
- **AI-processed, human-curated** — titles/employers/skills were extracted by a tool then curated; treat as high-quality but not audited.
- **Backward-looking (2015–2025).** These are where graduates *went*, partly pre-AI-disruption. DFVA is forward-looking to 2027+. Use JIR as the *evidence base*, DFVA's analysis as the *projection* — don't let historical destinations override a forward automation judgement; use them to ground it.
- **Matching is heuristic** for cognates — verify per row before publishing.
- These PDFs sit behind UoM SSO; they're internal careers material. Keep provenance lines but check redistribution norms before publishing externally.

---

## 8. Suggested next step

Lowest-risk, highest-value: implement **R1** for the **16 exact-match programs** — generate a real-outcomes block from `jir_data.json` and append it to each assessment report, with the provenance line. ~30 min of generator work, and it immediately upgrades DFVA from "asserts market evidence" to "cites UoM alumni outcomes."
