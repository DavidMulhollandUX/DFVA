# DFVA MARKET INTELLIGENCE: Master of Applied Linguistics (MC-APLING)
**Assessment Date:** 2026-09-01 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-apling

---

## 1. JOB FAMILY MAP

Destination titles are taken from mc-apling's own Felten-AIOE crosswalk entries (`data/aioe/v31_extension_crosswalk.csv`) — the same 7-title basis the v4 report's Position section scores against (field-basis destination exposure 88.72, field-basis median 83.21). Exposure figures below are the crosswalk's rescaled 0–100 AIOE index for each occupation, not an adoption or displacement measure.

| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Curriculum & Instructional Coordination | Curriculum Coordinator, Assessment Specialist, Academic Consultant, Education Training Consultant | Designing curricula and assessment materials, evaluating instructional programs, coaching teaching staff | HIGH — AIOE 94.62 (medium confidence), above the field median of 83.21 | Evaluating and overseeing AI-assisted content and lesson-generation tools rather than authoring from scratch | Grounded in profession record 25-9031 (Instructional Coordinators); mc-apling's own reported titles include Assessment Specialist and Academic Consultant |
| Adult & ESL Literacy Teaching | Academic Skills Adviser, TESOL/ESL Teacher, Occupational English Test Assessor | Teaching adult-literacy and English-language classes, rating OET performance, remedial instruction | HIGH — AIOE 95.74 (medium confidence) | AI-assisted essay/feedback tool literacy while retaining marking control (per §3 Theme 2) | Grounded in profession record 25-3011 (Adult Literacy, Remedial Education, and GED Teachers); the program's TESOL specialisation is the most direct fit |
| Postsecondary Language/Linguistics Teaching | Lecturer in Language Learning and Assessment | University-level teaching of language pedagogy and assessment, curriculum delivery | HIGH — AIOE 92.03 (medium confidence) | General institutional GenAI-classroom literacy (per §3 Theme 1) | Grounded in profession record 25-1081 (Education Teachers, Postsecondary) |
| Postsecondary & ELICOS Academic Administration | ELICOS Academic Manager, Academic Manager, Director of Studies | Leading language-centre or faculty academic operations, assuring assessment integrity under the regulator, managing curriculum quality | HIGH — AIOE 98.42 (high confidence), the highest of the four | Institutional AI-governance literacy (TEQSA Threshold Standard 1.4.4), GenAI-adoption oversight | Grounded in profession record 11-9033 (Education Administrators, Postsecondary), the only one of the four with verifiable regulatory/scholarly (L1/L2) evidence — see §6 |

All four AIOE values sit well above the field-basis median (83.21), consistent with the program's own reported "above the field-basis median" exposure finding in [`dfva-v4-mc-apling.md`](dfva-v4-mc-apling.md) §1. The AIOE index is a pre-genAI-era (2018–2021 methodology) theoretical automatability score, not a current or Australian adoption/displacement figure — see §6.

---

## 2. RECENT JOB AD SIGNALS

This section draws on real Adzuna AU job-ad data captured in each profession record (`jobAds.source: "adzuna-au"`, snapshots fetched 2026-08-27 to 2026-09-01) — none of the four records carries the known fabricated-jobAds template (`count: 1200`, `topEmployers: ["Victorian State Government", "Specialist National Employers", "Leading Australian Consultancies"]`); all four were checked and none matches.

1. **Adult-literacy/ESL teaching carries the largest live ad volume of the four.** The Adzuna AU snapshot for "adult literacy teacher" returned **244** live job ads (fetched 2026-09-01) — a real, directly measured count for the assessment window. **HIGH confidence.**
2. **University lecturing demand is smaller but the employer list is clean.** The "education lecturer" query returned **89** ads; all eight named top employers are universities (University of Sydney, The University of Western Australia, University of Newcastle, Victorian Institute of Technology, CQ University, University of New South Wales, Monash University, University of Tasmania). **HIGH confidence** on employer composition; **MEDIUM** on how far a narrow query string represents total postsecondary-teaching demand.
3. **Instructional-coordination demand is smaller and shows title collision.** The "instructional coordinator" query returned **79** ads, but the top-employer list mixes genuine education employers (Queensland Government, Murdoch University) with employers outside education (Cushman & Wakefield — commercial real estate, Bechtel — engineering and construction, HarperLloyd Recruitment — a staffing agency), so the raw count overstates demand specific to curriculum coordination. **MEDIUM confidence.**
4. **Postsecondary academic-administration ads carry a real, directly measured AI-skill signal.** The Education Administrators, Postsecondary sample (66 ads, queried by occupation code rather than job title, sampled 2026-08-27) returned "AI" as the single most frequent skill keyword — **25** mentions across the 50 sampled ads, ahead of "brand" (12) and "management" (12). The employer list again shows partial title collision (Marriott/Marriott Hotels Resorts, a hotel chain, appears three times alongside five university employers). **MEDIUM confidence** — real, dated data, with a collision caveat.
5. **Skill-keyword extraction failed for three of the four occupation queries.** The Instructional Coordinators, Adult Literacy Teachers and Postsecondary Education Teachers job-ad samples all returned `"(no skill keywords matched in sample)"` for `topSkills`, so §4's skill-shift claims for those three families rest on practitioner discourse and program evidence rather than ad-text extraction. **LOW confidence — stated as a gap, not a finding.**

---

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** A regulator's own guidance hub (TEQSA), one vendor-run cross-institutional survey (Ellucian) and one peer-reviewed two-wave single-institution study (ACM CHIIR) — all drawn from the Education Administrators, Postsecondary profession record (11-9033), the only one of the four destination records carrying verifiable regulatory or scholarly (L1/L2) evidence — plus several dated, self-selected practitioner-discourse items (X/Twitter, Reddit, one hackernews-linked news article) drawn from the `last30days` corpus attached to each profession record. No platform was systematically sampled for this report; each item below is the specific dated post or article named in the underlying record, not a survey of platform-wide sentiment. Three of the four profession records (25-9031, 25-3011, 25-1081) also carry an `evidence.md` narrative asserting additional L1/L2 sources ("Australian Professional Standards Authority", "Jobs and Skills Australia / Australian Journal of Professional Studies") that do not appear in those records' own claims data — those are excluded here; see §6.

### Theme 1 — Institutional GenAI adoption in postsecondary administration moved from pilot to majority practice within about a year

[Ellucian's 2025 State of AI in Higher Education survey](https://www.ellucian.com/blog/ai-higher-education-2025-survey-findings-move-strategic-integration) found personal AI use among administrators at 91% in 2025, up from 84% in 2024, while institution-wide adoption rose from 49% to 66% over the same period. Separately, [TEQSA's Gen AI knowledge hub](https://teqsa.gov.au/guides-resources/higher-education-good-practice-hub/gen-ai-knowledge-hub/gen-ai-teqsa-resources) (2025) states that Threshold Standard 1.4.4 already requires Australian higher-education providers to assure learning and manage genAI risk in assessment design — a binding regulatory requirement, not a voluntary practice, that touches the Education Administrators, Postsecondary family into which some mc-apling graduates enter.

The Ellucian figure is vendor-run survey data from a global respondent pool, not an Australia-specific effect size, and TEQSA's hub describes a regulatory obligation rather than a measured adoption rate. Together they support a narrower claim: institutional AI adoption in the surveyed population is now majority practice, and Australian providers face a standing regulatory obligation to manage it, whatever the true Australian adoption rate turns out to be.

**Bearing:** C3.

### Theme 2 — AI is entering language-teaching classrooms as discrete tools (grading, lesson generation), not through curriculum redesign

An [X post](https://x.com/adeelorama/status/2077379164848705932) from a K-12 AI-platform founder (15 July 2026) describes Anthropic's "Claude for Teachers" launch and a MagicSchool AI plugin built the same day to support it. Separately, a self-selected Reddit thread in [r/englishteachers](https://www.reddit.com/r/englishteachers/comments/1vgswcb/best_ai_essay_grader_for_teachers/) (6 August 2026) shows a practising teacher seeking an AI essay-grading tool "that helps with feedback while still keeping you in control of the final grade" — directly on point for the program's Adult Literacy/ESL and postsecondary-teaching destination families, both of which mark written work as a core task. A [hackernews-linked article](https://www.404media.co/literacy-in-future-technologies-artificial-intelligence-act-adam-schiff-mike-rounds/) (4 May 2026) reports that OpenAI, Google and Microsoft backed a US congressional bill to fund "AI literacy" in schools.

These are a self-selected social post, one self-selected forum thread, and one funding-bill news item — none is a study of teaching practice or a representative sample of Australian TESOL or adult-literacy educators. Together they support a narrower claim: discrete AI tools for lesson generation and grading are visibly entering language-adjacent teaching, as of mid-2026, in the specific instances named.

**Bearing:** C3, C2.

### Theme 3 — practitioners remain unsettled about whether AI use in teaching is legitimate, and that disagreement is now visible in formal professional programming

A Reddit thread in [r/AskTeachers](https://www.reddit.com/r/AskTeachers/comments/1vu1m1y/is_there_a_double_standard_for_ai_use_in_education/) (21 August 2026) asks whether a double standard exists between students' and teachers' permitted AI use. A separate thread in [r/TrueUnpopularOpinion](https://www.reddit.com/r/TrueUnpopularOpinion/comments/1vvlqpe/some_of_the_antiai_backlash_in_education_is/) (22 August 2026) argues some anti-AI sentiment in higher education is financially motivated by institutions with an interest in scarcity. An [X post](https://x.com/edutech_asia/status/2092072765058904365) (25 August 2026) announces a EDUtechAsia workshop, "Beyond GenAI: Building Human Capabilities for Student Success," led by RMIT's Adobe Creative Campus director — evidence that the unsettled question is now formal professional-development content, not only informal debate.

These are two self-selected forum threads of unknown participant counts plus one conference-programming announcement — none establishes how widely held either position is across Australian educators. Together they support a narrower claim: as of August 2026, no settled professional norm existed among the specific participants and organisers named, and the disagreement had reached the point of dedicated conference programming.

**Bearing:** C2, W1.

---

## 4. SKILL SHIFT SUMMARY

| Skill | Direction | Rationale |
|---|---|---|
| Institution-wide AI adoption in postsecondary administration workflows | **↑↑ Rising sharply** | Ellucian's 2025 survey reports institution-wide adoption rose from 49% to 66% in one year — a 17-point jump the source itself describes as a "surge" |
| Regulatory AI-governance and academic-integrity literacy | **↑↑ Rising sharply** | TEQSA's Threshold Standard 1.4.4 Gen AI guidance now binds every Australian provider's assessment design as a standing compliance requirement, not a recommendation |
| Personal AI-tool fluency among individual education administrators | **↑ Rising** | Ellucian: 91% of surveyed administrators report personal AI use, up from 84% in 2024 — high and rising, but a slower year-on-year gain than the institution-wide adoption rate above |
| AI-related skill demand in postsecondary academic-administration job ads | **↑ Rising** | "AI" is the single most frequent skill keyword in the Adzuna AU postsecondary-administration sample (25 of 50 sampled ads), ahead of "brand" and "management" |
| Structured AI/digital-literacy content inside the taught applied-linguistics curriculum | **→ Stable, differentiating** | mc-apling's own core and capstone units document no AI or digital-governance content anywhere (Panel C item C3 scores 0/3), a gap against the adoption rates above that the program has not yet closed |
| Evaluative appraisal of AI-assisted or AI-generated work as an assessed skill | **→ Stable, differentiating** | No mc-apling core assessment requires appraising the quality of one's own, a peer's or a tool's work (C2 scores 0/3), even as the ACM CHIIR staff-concern study names bias, misinformation and IP as the live issues genAI raises for university work |
| Manual, fully unassisted first-pass grading and written feedback | **↓ Falling** | The r/englishteachers thread (§3 Theme 2) shows a practising teacher actively seeking an AI grading tool to reduce manual marking load while retaining final control — one dated, self-selected instance, not a measured rate |
| Non-education employer demand inside "instructional coordinator" job-ad searches | **↓ Falling** | Commercial real-estate and engineering employers (Cushman & Wakefield, Bechtel) appear among the top employers returned for that title, a collision that dilutes how far the raw ad count reflects genuine curriculum-coordination demand |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | C3 scores 0/3 — no AI or digital content appears in any core or capstone unit — while §3 Theme 1 shows institutional AI adoption in postsecondary administration surging (49%→66% in a year) and §2 Signal 4 shows "AI" as the top skill keyword in the program's own academic-administration destination job ads | C3 Digital & AI literacy | Embed an assessed AI/digital-literacy component in the universal core unit LING90039 or one specialisation-compulsory subject; cost is displacing existing assessment weight or extending core contact hours |
| CI-2 | C2 scores 0/3 — no assessment requires appraising the quality of one's own, a peer's or a tool's work — while the ACM CHIIR staff-concern study (§3 Theme 1) names bias, misinformation and IP as the live issues genAI raises for university work | C2 Hybrid metacognition & evaluative judgement | Add a criterion-referenced peer-review or exemplar-marked appraisal step to the already-assessed "Reflective paper (Individual)" in LING90041; cost is additional moderation and marking load |
| CI-3 | W3 scores 0/3 — neither capstone route documents a placement, practicum or community-based project — while all four destination families (§1) are workplace-embedded professional roles, not research-only positions | W3 Work-situated learning | Document an external-host or community-partner variant of the LING90041 capstone, or add a placement subject to the Employability elective list; cost is negotiating host agreements and supervision capacity — a genuinely new provision, not a rubric reword |
| CI-4 | W1 scores only 1/3 — LING90041's group deliverables are not confirmed to reach an audience beyond the teaching team or be judged against practice-derived criteria — while §2 Signal 3 shows the program's own Instructional Coordination destination market is prone to title collision, where clear professional-genre communication would help graduates differentiate | W1 Professional communication & conduct | Extend LING90041's existing Project brief/Progress report/Written report deliverables to name a stated audience and practice-derived judging criteria; cost is rubric redesign only, no new contact hours |
| CI-5 | G1 (disciplinary foundation) FAILS on the v4 scorecard — the compulsory core is two subjects and 75–90% of the program is a shared elective pool nearly identical across the three specialisations — while all four destination occupations in §1 sit under the same generic ANZSCO code (220000), meaning the destinations themselves do not sharply differentiate by specialisation either | G1 Disciplinary foundation (structural, not market-driven) | No market-evidence action follows from this row; it is a structural finding for the improvement plan, carried here for completeness only |

---

## 6. EVIDENCE CONFIDENCE + GAPS

**Overall confidence: MEDIUM.** Per the corpus convention (high = ≥2 L1/L2/L3 claims AND an L5 corpus; medium = ≥1 L1/L2/L3 claim; low = none), only one of the four destination-occupation profession records — Education Administrators, Postsecondary (11-9033) — clears the "high" bar on its own (1 L1 + 2 L2 claims, plus an L5 corpus). The other three (Instructional Coordinators 25-9031, Adult Literacy/GED Teachers 25-3011, Education Teachers Postsecondary 25-1081) carry **zero** verifiable L1/L2/L3 claims in their own claims data. All four carry real L4 Adzuna job-ad data (checked against, and none matching, the known fabricated-jobAds template) and an L5 `last30days` practitioner-discourse corpus, though each L5 sample is dominated by generic AI-industry chatter (coding-agent workflow posts, unrelated technology tweets) rather than education- or applied-linguistics-specific content — only a minority of items in each sample bear directly on teaching or language education, and those are the ones cited in §3.

**Genuine gaps:**

1. **A data-integrity discrepancy, not used as evidence.** Three of the four profession records (25-9031, 25-3011, 25-1081) carry an `evidence.md` narrative file asserting L1/L2 sources — "Australian Professional Standards Authority / Peak Body for [occupation]" and "Jobs and Skills Australia / Australian Journal of Professional Studies" — at URLs keyed to the O*NET-SOC code path (for example `psc.gov.au/standards/25-9031`) with identical boilerplate text differing only by occupation name. None of these claims appears in the corresponding record's own `claims` array. They were treated as unverifiable and excluded from this report; only 11-9033's L1/L2 claims (TEQSA, Ellucian, ACM CHIIR), which cite real, checkable, named sources, were used.
2. **The AIOE exposure figures in §1 are a pre-genAI-era theoretical measure.** The Felten-AIOE index (2018–2021 methodology, rescaled 0–100) is a fixed historical automatability score, not a current adoption, displacement, or Australian-specific figure.
3. **Three of the four job-ad samples returned no extractable skill keywords.** §4's skill-shift claims for the Instructional Coordinators, Adult Literacy Teachers and Postsecondary Education Teachers families therefore rest on practitioner discourse and program evidence rather than ad-text analysis.
4. **No Australia-specific survey of GenAI adoption in TESOL, adult-literacy or postsecondary-language teaching was found in the sourced record.** The adoption figures used in §3 Theme 1 (Ellucian, ACM CHIIR) are US/global and cover higher-education administration broadly, not language teaching specifically.
5. **§3's practitioner-discourse items are self-selected, single, dated posts** (X, Reddit) from the `last30days` corpus — none establishes prevalence across Australian educators; each supports only the narrower claim that the named post or thread existed and said what it said, on the date given.

---

**Assessment Date:** 2026-09-01
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-apling
**Prompt Version:** DFVA-COPILOT-MARKET-v1

<!-- LABOUR-EVIDENCE:START -->
## REAL GRADUATE DESTINATIONS (JSA HEO)

**Where graduates of this field actually work** — [JSA Higher Education Outcomes](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) (ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of education **091521 Linguistics** (n = 700 completions). Shares are the percentage of the field's graduates in wage or salary work; the field's ten most common entry occupations account for 35.7% of them, and the 5 largest are shown at each stage.

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Private Tutors and Teachers nec (8.6%) · Teacher of English to Speakers of Other Languages (7.1%) · Secondary School Teacher (4.3%) · Primary School Teacher (4.3%) · University Lecturer (4.3%) |
| Early (~3yr) | Private Tutors and Teachers nec (8.6%) · Secondary School Teacher (5.7%) · Teacher of English to Speakers of Other Languages (5.7%) · Primary School Teacher (4.3%) · University Lecturer (4.3%) |
| Senior (~5yr) | Private Tutors and Teachers nec (8.6%) · Secondary School Teacher (5.7%) · Teacher of English to Speakers of Other Languages (5.7%) · Primary School Teacher (4.3%) · University Lecturer (4.3%) |

**Field grain, not program grain.** These are graduates of the whole Linguistics field of education at every completion level — not this program's graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, so the 1/3/5-year lists move little for most fields.
<!-- LABOUR-EVIDENCE:END -->
