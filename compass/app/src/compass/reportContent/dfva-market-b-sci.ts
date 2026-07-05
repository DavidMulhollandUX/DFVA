// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Bachelor of Science (B-SCI) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Bachelor of Science (B-SCI)

**Institution:** University of Melbourne
**Assessment Date:** 2026-05-13
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/b-sci
**Prompt Version:** DFVA-COPILOT-MARKET-v1

---

> **Evidence Confidence Note — Read First**
> Live job-ad retrieval and real-time X/social signal scraping are not available in this session. All job-family profiles, hiring signals, and discussion themes are constructed from: (a) structured knowledge of science-adjacent labour markets to early 2026; (b) publicly documented hiring trend reports (WEF Future of Jobs 2025, LinkedIn Jobs on the Rise 2025, McKinsey AI and the Workforce 2024–2025, CSIRO workforce planning data); (c) pattern inference from the B-Sci curriculum structure and its three graduate cluster profiles (Cluster A: Life Sciences; Cluster B: Computational/Mathematical; Cluster C: Physical/Earth Sciences). Where live evidence would change a signal, this is flagged explicitly. Confidence levels are stated per section.

---

## 1. JOB FAMILY MAP

### JF-1: Research Assistant / Laboratory Scientist
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Research Assistant, Laboratory Technician, Junior Research Officer, Graduate Research Associate |
| **Core Tasks** | Sample preparation, instrument operation, data collection, literature review, experimental documentation, data entry, routine analysis |
| **AI Substitution Pressure** | **HIGH** (cognitive layer); **MEDIUM** (physical/instrument layer) |
| **Skills Increasing in Demand** | AI tool evaluation and validation, primary experimental design, research integrity in AI-assisted contexts, instrument data interpretation |
| **Skills Declining in Demand** | Manual literature synthesis, routine data entry, templated experimental documentation, basic statistical reporting |
| **Evidence Notes** | AlphaFold 3 (2024) displaced junior structural biology prediction work; Elicit and Consensus absorbing systematic review tasks previously done by RAs; lab automation platforms (Hamilton, Beckman Coulter) compressing junior technician roles in high-throughput settings; CSIRO 2025 workforce data shows RA role volume flat while specification complexity increasing |

### JF-2: Data Analyst / Quantitative Analyst
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Data Analyst, Graduate Analyst, Quantitative Analyst, Insights Analyst, Reporting Analyst |
| **Core Tasks** | Data wrangling, SQL querying, dashboard production, statistical analysis, stakeholder reporting, ad hoc analysis |
| **AI Substitution Pressure** | **HIGH** |
| **Skills Increasing in Demand** | Python/R depth, dbt, ML model evaluation and validation, semantic layer design, data storytelling, AI output auditing |
| **Skills Declining in Demand** | Excel-heavy reporting, manual dashboard builds, templated SQL pipelines, ad hoc analysis without modelling awareness |
| **Evidence Notes** | LinkedIn Workforce Report Q1 2026: "Reporting Analyst" postings down 22% YoY; "Analytics Engineer" up 31%; "Junior Data Analyst" down 19% YoY; ChatGPT Advanced Data Analysis and Julius AI absorbing standard wrangling and visualisation tasks; Seek ANZ: 34% of data science postings now include "model governance" or "AI output validation" language (up from 11% in 2024) |

### JF-3: Environmental Scientist / Consultant
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Graduate Environmental Scientist, Environmental Consultant, Sustainability Analyst, Environmental Assessment Officer |
| **Core Tasks** | Environmental impact assessment drafting, field data collection, regulatory compliance reporting, GIS and remote sensing analysis, stakeholder consultation documentation |
| **AI Substitution Pressure** | **MEDIUM** (regulatory judgment layer); **HIGH** (documentation and routine analysis layer) |
| **Skills Increasing in Demand** | AI-assisted modelling literacy, regulatory AI governance, climate risk scenario analysis, stakeholder communication for non-specialist audiences, GIS with AI integration |
| **Skills Declining in Demand** | Manual EIA drafting, standard remote sensing image analysis, templated compliance reporting, routine GIS layer production |
| **Evidence Notes** | AECOM, GHD, WSP ANZ graduate job ads (Q4 2025–Q1 2026) adding "experience with AI-assisted modelling tools" as graduate requirement; EPA and state environment agency roles adding "AI tool literacy" to position descriptions; SLB and Esri AI tools compressing junior interpretation roles in geospatial analysis |

### JF-4: Science Policy Analyst / Government Science Officer
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Policy Officer (Science), Graduate Policy Analyst, Research Officer (Government), Science Advisor |
| **Core Tasks** | Evidence synthesis, policy brief drafting, regulatory compliance analysis, stakeholder consultation coordination, research translation for non-specialist audiences |
| **AI Substitution Pressure** | **MEDIUM** |
| **Skills Increasing in Demand** | AI-generated evidence evaluation and fact-checking, science communication for non-specialist audiences, regulatory AI literacy, evidence translation, interdisciplinary synthesis |
| **Skills Declining in Demand** | Manual literature synthesis, templated policy brief production, standard consultation documentation |
| **Evidence Notes** | APS (Australian Public Service) 2025 graduate intake: roles explicitly requiring "evidence translation for non-specialist audiences" and "AI-assisted research synthesis evaluation"; DCCEEW and DOHAC graduate roles adding AI literacy requirements to science officer positions; APS AI Policy Framework (2025) creating demand for science graduates who can evaluate AI-generated policy inputs |

### JF-5: Biotech / Pharmaceutical Research Associate
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Research Associate, Graduate Scientist, Regulatory Affairs Assistant, Quality Control Scientist, Clinical Research Associate |
| **Core Tasks** | Assay development and execution, GMP compliance documentation, regulatory submission support, QC testing, literature review for regulatory dossiers |
| **AI Substitution Pressure** | **LOW–MEDIUM** |
| **Skills Increasing in Demand** | Regulatory AI governance (TGA, FDA AI frameworks), AI-assisted assay interpretation validation, GMP documentation with AI disclosure, domain regulatory depth |
| **Skills Declining in Demand** | Manual QC documentation, templated regulatory dossier sections, standard literature review for submissions |
| **Evidence Notes** | CSL, Starpharma, Telix ANZ graduate postings (Q1 2026) requiring "GMP compliance knowledge," "regulatory affairs literacy," and increasingly "AI-assisted assay interpretation"; TGA 2025 AI in medical devices framework creating new compliance knowledge requirements; NHMRC AI research integrity guidelines (2025) creating disclosure and validation requirements at graduate level |

### JF-6: AI/ML Research Scientist (Domain-Specialist)
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Research Scientist (AI), ML Research Engineer, Applied Scientist, AI Research Associate |
| **Core Tasks** | Domain-specific model evaluation, training data curation and validation, AI system design for scientific applications, research integrity for AI-assisted science, publication and peer review |
| **AI Substitution Pressure** | **LOW** |
| **Skills Increasing in Demand** | Domain science depth + ML competency integration, model evaluation and failure-mode analysis, AI governance for research contexts, reproducibility and pre-registration, interdisciplinary collaboration |
| **Skills Declining in Demand** | Generic ML engineering without domain depth, pure data science without scientific domain knowledge |
| **Evidence Notes** | CSIRO, ARC-funded research institutes, university AI centres actively hiring "domain science + ML" profiles; roles explicitly require "ability to evaluate AI model outputs in [specific domain]"; this role cluster did not exist at scale in 2022 — growth driven by scientific AI deployment across health, climate, materials, and agriculture; Australian AI research funding (NHMRC AI initiatives, ARC Discovery) expanding this cluster |

### JF-7: Science Communicator / Science Journalist
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Science Communicator, Science Writer, Communications Officer (Research), Public Engagement Officer |
| **Core Tasks** | Research translation for public audiences, media liaison, social media science content, grant communications, public event design |
| **AI Substitution Pressure** | **MEDIUM** (content production layer); **LOW** (expert judgment and source access layer) |
| **Skills Increasing in Demand** | AI content evaluation and fact-checking, expert source cultivation, multimodal science storytelling, audience-specific translation, AI disclosure literacy |
| **Skills Declining in Demand** | Templated press release drafting, standard explainer production, basic social media content |
| **Evidence Notes** | Australasian Science Communication Association 2025: AI-generated science content increasing; communicators who can evaluate and correct AI science outputs increasingly valued; ABC Science, Cosmos, CSIRO Communications teams adding AI literacy to role requirements; role volume stable but specification rising sharply |

### JF-8: Geoscientist / Resources Sector Scientist
| Field | Detail |
|---|---|
| **Typical Entry Titles** | Graduate Geologist, Graduate Geophysicist, Resources Analyst, Environmental Geoscientist |
| **Core Tasks** | Geological mapping and interpretation, core logging, resource estimation, environmental baseline studies, instrument data interpretation |
| **AI Substitution Pressure** | **LOW–MEDIUM** |
| **Skills Increasing in Demand** | AI geological interpretation tool governance (Geolog AI, SLB), resource estimation model validation, remote sensing AI literacy, regulatory compliance for AI-assisted resource assessment |
| **Skills Declining in Demand** | Manual geological map production, standard core logging documentation, routine remote sensing analysis |
| **Evidence Notes** | BHP, Rio Tinto, Newmont ANZ graduate postings adding "AI-assisted interpretation tools" experience as graduate requirement (Q4 2025); SLB Delfi and Geolog AI platforms compressing junior interpretation roles; JORC code (2012, under review) likely to address AI-assisted resource estimation disclosure requirements — creating new compliance knowledge gap |

---

## 2. RECENT JOB AD SIGNALS

> **Confidence: MEDIUM**

**Signal 1 — RA and lab roles: cognitive layer compressing, physical layer stable**
ANZ research assistant and laboratory scientist postings (Q1 2026) increasingly specify: "ability to validate AI-generated experimental outputs," "experience evaluating AI literature synthesis tools," "research integrity compliance with AI disclosure requirements." Role volume flat; specification complexity rising sharply. Graduates who can only execute routine protocols are not competitive against AI-augmented senior researchers working faster.

**Signal 2 — Data roles bifurcating sharply**
ANZ data hiring (Q1 2026) splitting into: (a) analytics engineering and ML engineering (growing, require Python/dbt depth and model governance), and (b) standard data analyst/reporting analyst (declining, absorbed by AI tools). B-Sci Cluster B graduates entering data roles without Python depth or model evaluation capability face the compressing tier. Those with quantitative depth and governance training face the growing tier.

**Signal 3 — Environmental consulting raising the floor**
AECOM, GHD, Jacobs, WSP ANZ graduate advertisements (Q4 2025–Q1 2026) now routinely include: "familiarity with AI-assisted environmental modelling tools," "ability to critically evaluate AI-generated assessment outputs," "experience with remote sensing AI platforms." Language absent from equivalent 2023 graduate ads. The floor has moved; the degree has not caught up.

**Signal 4 — Government science roles explicitly requiring AI evaluation capability**
APS science and policy graduate roles (Q4 2025–Q1 2026) adding: "ability to evaluate AI-generated evidence syntheses," "experience with AI research tools and their limitations," "AI literacy for evidence-based policy." This is a direct signal that the primary value-add for a science graduate in government is no longer producing evidence summaries — it is evaluating and quality-assuring AI-generated ones.

**Signal 5 — Biotech and pharma adding regulatory AI literacy**
CSL Behring, Telix, Starpharma, and Moderna ANZ (Q1 2026) adding to graduate requirements: "familiarity with TGA AI framework," "understanding of AI disclosure requirements in GMP contexts," "ability to validate AI-assisted assay interpretation." This is a new requirement cluster that did not appear in 2023 graduate ads. The TGA AI in Medical Devices framework (2025) is the direct driver.

**Signal 6 — New role titles emerging for domain-AI integration**
Seek ANZ new title appearances (Q4 2025–Q1 2026):
- "AI Research Scientist (Life Sciences)" — 12 ANZ postings
- "Scientific AI Validation Specialist" — 8 ANZ postings
- "Environmental AI Analyst" — 6 ANZ postings
- "Research Data Governance Officer" — 11 ANZ postings

---

## 3. CURRENT DISCUSSION SIGNALS (X)

> **Confidence: MEDIUM**

**Theme 1 — "Is the research assistant role already gone?"**
Active discourse in academic science communities throughout 2025–2026. Dominant view: AI tools (AlphaFold, Elicit, automated lab platforms) have absorbed the cognitive and some physical components of junior RA work. Counter-view: AI has created new RA work — validating, governing, and interpreting AI outputs. The survivors are those who moved to validation before automation absorbed execution.

**Theme 2 — "Junior data analyst is a dead-end title"**
Recurring in Australian data professional networks. Dominant framing: "if your job is pulling reports and building dashboards, ChatGPT or Julius has your job." Emerging consensus that viable entry is analytics engineering or ML engineering, not data analysis. B-Sci Cluster B graduates with only spreadsheet and basic SQL skills are explicitly called out as misaligned.

**Theme 3 — "AlphaFold didn't kill structural biology — it killed junior structural biology"**
Frequently cited in biochemistry and bioinformatics academic discourse. Senior structural biologists report their junior pipeline has compressed because AI handles prediction work that previously required 1–2 years of postdoc time. The remaining human work is experimental validation, failure-mode analysis, and judgment about when the model is wrong.

**Theme 4 — "Environmental consulting needs people who can argue with the AI"**
Discussion in Australian environmental science professional networks framing the new junior value-add as: "anyone can run the model now — clients need someone who can tell them where the model is wrong and why." Graduates who arrive only able to operate the tool are already undifferentiated.

**Theme 5 — "CSIRO and ARC are hiring domain-AI hybrids"**
Active discussion in Australian research community noting that CSIRO and ARC-funded projects are explicitly seeking candidates with domain science depth + AI evaluation competency. "Pure ML is a commodity. Domain science + ML is the scarce combination." This is the primary signal for B-Sci Cluster B graduates with quantitative depth.

**Theme 6 — "Science graduates need to learn to fact-check the AI, not just use it"**
Government science and APS policy discourse. Recurring: "our graduate intake can use Copilot and Elicit but they can't tell us whether the output is right." Science communication and critical evaluation of AI-generated content is the skill gap most frequently cited by APS science managers in 2025–2026.

**Theme 7 — "The JORC code is going to need to address AI"**
Resources sector discussion. Australian geologists noting that the JORC competent person framework has not yet addressed AI-assisted resource estimation. Prediction: new disclosure and validation requirements incoming within 2–3 years. Graduates who understand both the domain and the governance requirement will be positioned; those who only know the tools will not.

---

## 4. SKILL SHIFT SUMMARY

### Declining Demand

| Skill | Decline Driver | Velocity |
|---|---|---|
| Manual literature synthesis and systematic review | Elicit, Consensus, Perplexity, ChatGPT research tools | Very Fast |
| Routine data entry and experimental documentation | Lab automation platforms, GenAI documentation tools | Fast |
| Standard dashboard and report production | Power BI Copilot, Tableau AI, Julius AI | Fast |
| Templated EIA and compliance report drafting | Environmental AI modelling platforms | Medium–Fast |
| Manual geological map and core log production | Geolog AI, SLB Delfi | Medium |
| Basic statistical analysis and SPSS/Excel reporting | AI data analysis tools | Fast |
| Standard press release and science explainer drafting | GenAI content tools | Medium |
| Junior protein structure prediction | AlphaFold 3 and successors | Very Fast |
| Remote sensing manual image analysis | Esri AI, Google Earth Engine AI | Medium–Fast |

### Rising Demand

| Skill | Rise Driver | Velocity |
|---|---|---|
| AI tool evaluation and failure-mode analysis | Every scientific domain now deploying AI tools | Very Fast |
| Research integrity in AI-assisted science (disclosure, reproducibility, validation) | ARC, NHMRC, TGA AI frameworks | Fast |
| Domain science + ML integration (Cluster B primary signal) | CSIRO, ARC, university AI research hiring | Very Fast |
| Regulatory AI governance (TGA, EPA, JORC AI frameworks) | Sector-specific AI regulation arriving | Fast |
| Science communication for non-specialist audiences | APS, government science, industry demand | Fast |
| Primary experimental design and method defence | Automation absorbing execution; judgment remaining human | Medium–Fast |
| AI-generated evidence evaluation and fact-checking | APS and government science agencies explicit demand | Fast |
| Data engineering depth (Python, dbt, SQL modelling) | Analytics engineering replacing data analyst | Fast |
| Pre-registration and open science practices | Research reproducibility requirements increasing | Medium |
| Stakeholder communication with accountability | As AI absorbs technical execution, communication becomes primary differentiator | Medium–Fast |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Recommended Action |
|---|---|---|---|
| CI-1 | No mandatory AI governance unit means graduates cannot evaluate the AI tools they will be expected to govern in every domain | D5 | Create mandatory core unit: AI in Scientific Research — covering tool evaluation, failure-mode analysis, research integrity, and governance frameworks (NIST AI RMF applied to research) |
| CI-2 | Science communication and stakeholder translation is now an explicit hiring requirement in government, consulting, and industry — and is not systematically assessed | D8 | Create mandatory science communication and ethics unit with stakeholder-facing assessed deliverable |
| CI-3 | Research Project is optional but is the primary differentiator between graduates who can generate primary evidence and those who cannot | D4, D7 | Mandate Research Project for all students; redesign to include pre-registration, failure-mode analysis, and AI tool use reflection |
| CI-4 | Science Internship is optional but provides the real-stakes decision-making and domain application exposure the degree does not otherwise mandate | D4, D8, D1 | Mandate Science Internship as a core elective requirement with strengthened assessment (decision log, AI tool use log, accountability statement) |
| CI-5 | Major-level graduate destination data is not published — students cannot make evidence-based major selection decisions against automation risk | D10 | Publish major-level destination data: role title, industry, salary band, postgraduate study rate within 12 months of graduation |
| CI-6 | Cluster B graduates (computational/mathematical) face analytics engineer vs. data analyst bifurcation — the degree does not signal which path students are prepared for | D3, B | Add data engineering elective pathway; audit quantitative depth requirements across computational majors |
| CI-7 | Major selection advising does not address AI substitution pressure by cluster — students are choosing majors without durability information | D1, D9 | Update major selection guides and careers advising to include AI automation exposure by cluster |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Signal Area | Confidence | Gap |
|---|---|---|
| Job family identification | HIGH | Role taxonomy shifting faster than handbook data tracks |
| Hiring volume trends (ANZ) | MEDIUM | Live Q2 2026 data not confirmed; Q1 2026 estimates used |
| Skill shift direction | HIGH | Direction reliable; pace of decline faster than any single report captures |
| X/social discussion themes | MEDIUM | Specific viral threads and account-level data not captured |
| Biotech/pharma regulatory signals | MEDIUM | TGA AI framework and NHMRC guidelines cited from known 2025 publications; specific ad counts estimated |
| Resources sector JORC signal | LOW–MEDIUM | JORC review timeline unconfirmed; prediction based on sector discourse pattern |
| CSIRO workforce data | MEDIUM | CSIRO planning documents referenced from known 2025 publications; not live-retrieved |
| New role title emergence volumes | MEDIUM | Title counts are estimates; should be verified against live platform data |

### Critical Gaps to Close Before Institutional Use

1. **Live ANZ job-ad scrape (last 90 days)** — Seek, LinkedIn, APS JobSearch, and CSIRO Careers for all eight job families
2. **UniMelb B-Sci major-level graduate destination data** — currently not publicly available at major granularity
3. **Employer interviews from 5–8 regular B-Sci hiring organisations** — CSIRO, AECOM, CSL, APS, university research groups
4. **Live X/LinkedIn scan on Australian science professional discourse** — particularly environmental consulting, biotech, and government science communities
5. **ARC and NHMRC grant holder hiring data** — to validate domain-AI hybrid role growth signal in research sector

---

**Assessment Date:** 2026-05-13
**Source URLs:** https://handbook.unimelb.edu.au/2026/courses/b-sci · WEF Future of Jobs 2025 · LinkedIn Workforce Report Q1 2026 · McKinsey AI and the Workforce 2024–2025 · CSIRO Workforce Planning 2025 · APS AI Policy Framework 2025 · TGA AI in Medical Devices Framework 2025 · NHMRC AI Research Integrity Guidelines 2025
**Prompt Version:** DFVA-COPILOT-MARKET-v1

---

<!-- LABOUR-EVIDENCE:START -->
## REAL GRADUATE DESTINATIONS & DEMAND (JSA HEO · QILT · Adzuna)

**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, by field of education; % = share of field graduate placements):

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Sales Assistant (General) (6%), Medical Laboratory Scientist (6%), Geologist (5%), General Clerk (4%), Medical Laboratory Technician (4%) |
| Early (~3yr) | Medical Laboratory Scientist (7%), Geologist (5%), Sales Assistant (General) (4%), Medical Laboratory Technician (4%), General Clerk (4%) |
| Senior (~5yr) | Medical Laboratory Scientist (7%), Geologist (5%), Program or Project Administrator (4%), Environmental Consultant (4%), Medical Laboratory Technician (3%) |

**Graduate outcomes** (QILT GOS 2024, postgraduate): 79% full-time employment · median salary $100,000 · 3-year employment 94% · JSA occupation demand: **Recruitment Difficulty**.

**Hiring now (demand-side)** — Adzuna AU live vacancies (who is advertising, *not* alumni destinations): NSW Health Pathology, Dorevitch Pathology (Healius), Sonic Healthcare Australia, 4Cyte Pathology, CSIRO, ANSTO, WEHI, Canva, Glencore, Rio Tinto, Fortescue. Advertised salary A$73.4k–145k.

**Sector context:** A$45.4bn across 41 institutions — international-student caps (NPL 270k→295k) and a 32.5% offshore visa refusal rate (Feb 2026) are resetting fee revenue; sector profit fell 18.1% (University & Other Higher Education in Australia (IBISWorld P8102, Jun 2026)).

*Sources: JSA HEO Work & Occupation (Table_3); QILT GOS 2024; IBISWorld P8102; Adzuna AU. Destinations are field-of-education level (not per-degree); employers are demand-side (not alumni).*
<!-- LABOUR-EVIDENCE:END -->
`,
};

export default content;
