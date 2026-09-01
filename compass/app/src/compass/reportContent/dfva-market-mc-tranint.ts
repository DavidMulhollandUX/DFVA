// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Translation and Interpreting (MC-TRANINT) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Translation and Interpreting (MC-TRANINT)
**Assessment Date:** 2026-09-01 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-tranint

## 1. JOB FAMILY MAP
| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Written / Document Translator | Translator, Technical Translator, NAATI Certified Translator | Document translation, terminology research, translation and peer quality review | **HIGH** — the highest AI task-overlap score of any occupation studied by Microsoft Research, and a causal US study found machine-translation adoption reduced translator employment | AI-output quality review, reliance-decision justification, machine-translation post-editing (MTPE) | Microsoft Research/arXiv (L2-1); Oxford Martin/CEPR (L2-3, scoped) |
| Conference & Community Interpreter | Conference Interpreter, Community Interpreter, NAATI Certified Interpreter | Live simultaneous and consecutive interpreting, cultural mediation | **MEDIUM** — a vendor-reported industry survey claims rising AI-interpreting evaluation and adoption among language-service integrators, but this measures organisational status, not interpreter job loss | Human-AI collaboration paradigms, real-time critical assessment of AI-generated interpretation | Slator/Boostlingo (L3-1, scoped) |
| Legal & Court Interpreter (NAATI Specialist Legal accreditation) | Court Interpreter, Legal Interpreter | Certified interpreting in judicial and tribunal settings, adherence to procedural-fairness standards | **LOW** — NAATI's own position statement holds that AI must not be used in high-risk assignments without the expert supervision of a certified practitioner, a governance constraint specific to this family | NAATI-standards-referenced ethical practice, AI-governance literacy | NAATI position statement (L1-1) |
| Localisation & Media Translator (games / AV) | Localisation Translator, Game Translator, Subtitler | Creative and contextual translation for games, film and marketing content | **HIGH** — a single verified case shows one AAA-studio translator's role described by his employer as being made obsolete by AI translation; one case, not a demonstrated sector pattern | AI-output review for tone, register and cultural fit; negotiating scope with AI-adopting studios | Kotaku (L5-2) |
| AI-Augmented Language Services / Intercultural Communication Specialist | Localisation Project Coordinator, Intercultural Communication Consultant | Coordinating human-AI translation workflows, advising on AI use in cross-cultural and marketing communication | **LOW** — an emerging role built around the AI-literacy-plus-ethical-judgement function that the strongest evidence identifies as the part of the task set that has not moved to AI | AI-ethics literacy, human-AI collaboration strategy design | \`dfva/source/evidence/mc-tranint.json\` (TRAN90011); Microsoft Research/arXiv scoping note (L2-1) |

## 2. RECENT JOB AD SIGNALS
> **Confidence: LOW** — no live job-ad pull exists for this occupation. The profession record's \`jobAds\` field carries \`source: "none"\` and \`count: 0\`, and the record carries no L4 (job-ad evidence) lane claims either. The signals below are stated as gaps, not findings, and none of them substitute for real vacancy data.

**Signal 1 — No Adzuna or equivalent job-ad data was captured for this occupation in this research cycle.**
The profession record (\`data/professions/091519.json\`) records \`jobAds.source: "none"\`, \`jobAds.count: 0\`, and empty \`topEmployers\` and \`topSkills\` arrays. This is a genuine absence, not an estimate rounded down — no job-title, employer, or in-ad-skill figures exist for this program at this time. LOW confidence.

**Signal 2 — The record's own search log confirms the gap is a coverage limit, not an editorial omission.**
The \`corpus.searchesReturningNothing\` list documents specific attempted searches that returned nothing citable, including a \`site:proz.com\` translator forum search blocked by a 403 response and a Reddit translator-subreddit search with no fetchable thread. The absence of job-ad data sits alongside a documented absence of forum-level demand signals. LOW confidence.

**Signal 3 — The closest adjacent material is an industry-organisation survey, not job-ad data, and it cannot substitute for it.**
Trade outlet Slator reported in January 2026 that a webinar poll of over 100 language-service-integrator participants found 41% evaluating AI interpreting solutions and 30% already using it. This measures organisations' self-reported adoption status, not advertised vacancy volume, titles or skills, and the article is Boostlingo-authored partner content on a commercial AI-interpreting vendor's platform, so it is scoped separately in Section 3 rather than treated here as job-ad evidence. LOW confidence.

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** A national accreditation regulator's position statement and a professional body's standards-review announcement (NAATI, AUSIT), an institutional/scholarly working paper (Microsoft Research) and a peer-reviewed-adjacent economics working paper (Oxford Martin School / CEPR), trade-press reporting and investigative journalism (Slator, Blood in the Machine, Kotaku), and a trade-press summary of an industry survey (Creative Words summarising the European Language Industry Survey). Direct extraction from X or LinkedIn was **not** performed, and no professional forum was sampled — the themes below rest on named regulatory documents, named studies, and named journalism, not on inferred practitioner discourse. Dates are given where the source carries one.

### Theme 1 — the strongest quantitative evidence measures task overlap and machine-translation adoption, not job loss, and neither measure is Australian

A [Microsoft Research working paper](https://arxiv.org/pdf/2507.07935) (2025-07) matching 200,000 anonymised Bing Copilot conversations against the US O*NET task inventory found interpreters and translators had the highest AI-applicability score of all 785 occupations studied, at roughly 0.49 on a 0-to-1 scale — meaning close to half of what people asked Copilot to do overlapped with this occupation's task content, not that half the occupation has been automated. Separately, an [Oxford Martin School study](https://www.oxfordmartin.ox.ac.uk/publications/lost-in-translation-artificial-intelligence-and-the-demand-for-foreign-language-skills) (2025-01-26), [summarised on VoxEU](https://cepr.org/voxeu/columns/lost-translation-ais-impact-translators-and-foreign-language-skills) (2025-03-22), used an instrumental-variable design across 695 US local labour markets from 2010 to 2023 and found a negative relationship between local Google Translate adoption and translator/interpreter employment.

Both studies are US-only and neither covers generative-AI chatbot translation specifically — the Oxford Martin study measures the pre-LLM Google Translate app over 2010–2023, and the Microsoft study measures Bing Copilot conversation content, not employment or wage outcomes. Applying either finding to the Australian labour market, or to interpreting specifically, assumes a similar pattern the studies do not test.

**Bearing:** C2. TRAN90007's assessed peer review of translations against NAATI "Certified Translator" standards is exactly the quality-appraisal function this literature identifies as resisting task overlap; the residual value both studies point toward is judging output quality and reliability, which is what a Level-3 C2 score would require the program to assess directly rather than leave implicit in course overview text.

### Theme 2 — Australian regulators and professional bodies are moving to constrain, not endorse, unsupervised AI in high-risk translation and interpreting work

[NAATI](https://www.naati.com.au/news/position-statement-ai/), Australia's national accreditation authority for translators and interpreters, issued a position statement on 2025-03-31 stating that AI must not be used in high-risk translation or interpreting assignments without the expert supervision of a NAATI-certified practitioner. [AUSIT](https://ausit.org/code-of-ethics-and-code-of-conduct/), whose Code of Ethics NAATI certification requires demonstrated knowledge of, [commenced its first Code review since 2012](https://www.naati.com.au/news/ausit-code-of-ethics-and-code-of-conduct-review/) in August 2025.

Both documents state governance positions and process announcements, not measured compliance rates or practitioner sentiment — neither shows how widely NAATI's position is followed in practice, and AUSIT's revised Code content is unreleased, so it is not yet known whether the revision specifically targets AI.

**Bearing:** C3. TRAN90011's assessed content on the legal and ethical risks of AI use tracks directly onto this regulatory direction, though the evidence file notes the assessment-item descriptions do not themselves name bias, accountability, transparency or data governance as graded criteria — the course overview raises these, the graded tasks do not yet require them.

### Theme 3 — practitioner and trade accounts describe income and workload contraction attributed to generative-AI post-editing, but the evidence is thin and does not establish sector-wide prevalence

Journalist Brian Merchant's [August 2025 investigation](https://www.bloodinthemachine.com/p/ai-killed-my-job-translators) (2025-08-21) profiled named freelance translators reporting steep declines, including a technical translator whose 2025 earnings (about $9,300) were far below prior six-figure years and a Quebec-based translator whose income fell 60% in 2024. A [trade-press summary](https://www.creative-words.com/en/language-industry-elis-2025-results/) (2025-04-04) of the 2025 European Language Industry Survey — a self-reported survey of 1,322 respondents across 50 countries — reported that over 50% of translation jobs then involved machine translation and about 23% of freelance translation professionals were considering leaving the industry, citing lower rates and reduced negotiating power. Separately, [Kotaku reported](https://kotaku.com/kingdom-come-2-translator-gen-ai-fired-warhorse-2000682854) (2026-03-28) that a named, moderator-verified video-game translator said his employer told him his role was becoming "obsolete" in favour of AI translation.

All three sources describe self-selected samples — translators who responded to a public callout, or a European survey network — rather than a probability sample of the profession, so the income figures cannot be generalised, and none of the three covers interpreting.

**Bearing:** C1. TRAN90022's assessed real-client team translation project is exactly the venue where a graded criterion for how work divides between people and AI tools would sit, and the evidence file flags this specific gap: the current assessment evaluates team-based client delivery, not the division of labour between people and AI/tool systems.

### Theme 4 — a claimed rise in AI-interpreting adoption among language-service integrators is vendor-sponsored content, not independent measurement

[Slator reported](https://slator.com/ai-interpreting-will-be-the-next-great-disruption-lsis-must-act-in-2026/) (2026-01-05) that a November 2025 webinar poll of over 100 language-service-integrator participants found 41% evaluating AI interpreting solutions and 30% already using it, framing AI interpreting as a disruption LSIs would need to address in 2026.

The article is authored by Boostlingo, a commercial AI-interpreting vendor with a direct financial interest in reporting high adoption, and the underlying poll's sampling method and response rate are undisclosed. It measures organisations' stated evaluation or adoption status, not interpreter job loss, wages or demand, and is not a claim about individual practitioners.

**Bearing:** W1 and W3. If AI-interpreting tools are genuinely spreading through language-service integrators' workflows, professional-audience assessment beyond the single TRAN90010 internship route, and workplace exposure to how organisations actually deploy these tools, both become more material to graduate readiness — though the claim itself should be weighted as vendor-reported, not independently confirmed.

## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)
| Declining Demand | Velocity | Rising Demand | Velocity |
|---|---|---|---|
| Routine document translation without AI-output review skills | Fast | AI-output quality review and reliance-decision justification | Fast |
| Freelance volume-rate translation work | Fast | Domain-specialist translation (legal, technical, clinical) commanding accreditation premium | Medium |
| Unsupervised or uncertified interpreting for lower-stakes settings | Medium | NAATI-certified specialist legal/court interpreting under a regulator-stated human-supervision requirement | Slow |
| Generalist AV/games localisation translation with no AI-tooling oversight | Medium | Localisation QA and human-AI collaboration in game and media translation | Medium |
| General intercultural-communication practice without structured AI-ethics grounding | Medium | Applied critique of AI output and AI-ethics literacy | Fast |
| AI interpreting treated as a distant or theoretical risk | Slow | Organisational evaluation and piloting of AI-interpreting tools among language-service integrators (vendor-reported, organisation-level claim) | Fast |

## 5. CURRICULUM IMPLICATIONS
| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | Theme 3's income-and-workload evidence, thin as it is, describes exactly the boundary the program's own C1 gap names: TRAN90022's real-client team project is assessed on delivery, not on how work divides between people and AI tools. | C1 Collaborative Practice | Adding a graded criterion for human-AI task division to TRAN90022 would require agreeing what "good" division looks like across varied client briefs, and calibrating markers who currently assess team delivery only |
| CI-2 | Theme 1's task-overlap literature locates the retained human function in judging AI-output quality and reliability, which is close to what TRAN90007 already teaches but does not yet grade as a named criterion. | C2 Quality Appraisal | Naming reliance-decision justification as a graded criterion in TRAN90007 or TRAN90011 assessment briefs would require a rubric anchor for that judgement, which does not currently exist in the assessment-item text |
| CI-3 | Theme 2's regulatory direction (NAATI, AUSIT) names governance concepts the evidence file confirms TRAN90011's course overview raises but its graded items do not require. | C3 AI Ethics & Governance | Naming bias, accountability, transparency and data-governance criteria explicitly in TRAN90011's two assignment rubrics would require developing assessable content for governance concepts the unit currently teaches only at overview level |
| CI-4 | Theme 4's claim about spreading AI-interpreting adoption among language-service integrators, if it holds, raises the value of professional-audience assessment beyond the program's single such instance. | W1 Professional Communication | Extending assessed professional-audience communication beyond the sole TRAN90010 internship route would require securing additional industry-partner capacity the program does not currently document at scale |
| CI-5 | Theme 2's regulator position that high-risk work needs certified-practitioner supervision, combined with Theme 4's vendor-reported adoption claim, both bear on how much workplace exposure graduates get to real AI-tooling deployment — currently optional, present in only two of four capstone routes. | W3 Workplace Exposure | Requiring placement across all capstone routes rather than two of four would require enough industry-partner placement capacity for the full cohort, not only those who elect TRAN90010 or TRAN90027 |

## 6. EVIDENCE CONFIDENCE + GAPS
| Signal Area | Confidence | Gap / Caveat |
|---|---|---|
| Regulatory position (NAATI, AUSIT) | HIGH | Governance position and process announcement only; does not measure practitioner compliance or how the revised AUSIT Code, still unreleased, will actually treat AI |
| Task-overlap and machine-translation-adoption econometrics (Microsoft, Oxford Martin) | MEDIUM-HIGH | Real studies with named methodology, but both are US-only, and neither covers generative-AI chatbot translation specifically — Oxford Martin measures the pre-LLM Google Translate app over 2010–2023 |
| Practitioner-testimony income and workload claims | LOW-MEDIUM | Self-selected samples responding to public callouts or a survey network, not a probability sample; the games-localisation case is a single verified individual, not a pattern |
| AI-interpreting adoption among language-service integrators | LOW | Vendor-authored partner content on a commercial AI-interpreting platform, with undisclosed poll sampling and response rate |
| Job-ad demand signals | NONE | \`jobAds.source: "none"\`, \`count: 0\` in the profession record; no live Adzuna or equivalent pull exists for this occupation, and no L4 lane claims are present |
| Australian-specific evidence of any kind | LOW | Every quantitative study above is US-based; the only Australian sources are the two regulatory-position documents, which measure governance intent, not market outcomes |

### Critical evidence gaps to close before institutional use:
1. No live Australian job-ad pull (Adzuna or equivalent) exists for this occupation — needed before Section 2 can report actual demand rather than its absence.
2. No Australian-specific study of generative AI's effect on translator or interpreter employment exists; the only causal study available (Oxford Martin) is US-only and covers pre-LLM machine translation, not generative-AI chatbot translation.
3. No independent, non-vendor survey of AI-interpreting adoption among Australian language-service providers exists — the only adoption figures found (Slator/Boostlingo) come from the vendor selling the tool being measured.
4. QILT or internal graduate-destination data specific to MC-TRANINT graduates was not reviewed for this report.

---

**Assessment Date:** 2026-09-01
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-tranint
**Prompt Version:** DFVA-COPILOT-MARKET-v1

## REAL GRADUATE DESTINATIONS (JSA HEO)

**Where graduates of this field actually work** — [JSA Higher Education Outcomes](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) (ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of education **091519 Translating and Interpreting** (n = 630 completions). Shares are the percentage of the field's graduates in wage or salary work; the field's ten most common entry occupations account for 27.0% of them, and the 5 largest are shown at each stage.

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Interpreter (12.7%) · Translator (4.8%) · Secondary School Teacher (3.2%) · General Clerk (3.2%) · Program or Project Administrator (3.2%) |
| Early (~3yr) | Interpreter (14.3%) · Translator (6.3%) · Secondary School Teacher (3.2%) · General Clerk (3.2%) · Program or Project Administrator (1.6%) |
| Senior (~5yr) | Interpreter (12.7%) · Translator (6.3%) · Secondary School Teacher (3.2%) · Program or Project Administrator (3.2%) · General Clerk (1.6%) |

**Field grain, not program grain.** These are graduates of the whole Translating and Interpreting field of education at every completion level — not this program's graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, so the 1/3/5-year lists move little for most fields.
`,
};

export default content;
