// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Data Science (MC-DATASC) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Data Science (MC-DATASC)

**Assessment Date:** 2026-08-23 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-datasc | **Prompt Version:** DFVA-COPILOT-MARKET-v1

---

## 1. JOB FAMILY MAP

| # | Job Family | Typical Entry Roles (Years 1–2) | Growth Roles (Years 3–5) | Substitution Pressure | Skills Increasing in Demand |
|---|---|---|---|---|---|
| 1 | Applied Machine Learning & Predictive Modeling | Junior Data Scientist, Applied ML Specialist | Senior Data Scientist, Staff ML Engineer | HIGH | LLM fine-tuning, RAG architecture, ML evaluation, statistical assumption auditing |
| 2 | Machine Learning Operations & Data Platforms | MLOps Engineer, Analytics Engineer | Lead MLOps Architect, Principal Data Platform Engineer | LOW–MEDIUM | Streaming data pipelines (Kafka/Flink), model monitoring, CI/CD for ML, dbt |
| 3 | Statistical Computing & Causal Inference | Statistical Modeler, Biostatistical Analyst | Lead Statistician, Principal Causal Inference Scientist | LOW | Causal DAGs, A/B trial design, Bayesian modeling (PyMC/Stan), counterfactual analysis |
| 4 | Enterprise AI Governance & Model Risk Auditing | AI Assurance Analyst, Model Risk Specialist | Head of AI Ethics, Director of Algorithmic Governance | LOW–MEDIUM | Model cards, algorithmic fairness auditing, EU AI Act compliance, APRA CPS 234/230 |
| 5 | Decision Science & Quantitative Strategy | Decision Scientist, Quantitative Insights Consultant | Strategy Analytics Director, Principal Decision Scientist | LOW | Behavioral economics, executive decision framing, mathematical optimization |

---

## 2. RECENT JOB AD SIGNALS

**Signal 1 — MLOps and production deployment skills dominant.**
Data science job postings from top tech and financial corporations (Canva, Atlassian, NAB, Macquarie, CSIRO) increasingly prioritize containerization (Docker/Kubernetes), model monitoring, and automated deployment over theoretical model exploration.

**Signal 2 — Causal inference and experimental design as key differentiators.**
Leading tech employers screen data science candidates on experimental design, potential outcomes frameworks, and causal DAGs rather than correlation-based machine learning alone.

**Signal 3 — AI code synthesis automating routine data preparation.**
Generative AI tools (Copilot, Cursor) have automated standard pandas data manipulation and script generation, raising the hiring bar for candidates with deep algorithmic verification skills.

**Signal 4 — Statutory AI governance and model auditing.**
Enterprise risk teams recruit data scientists who can audit models for algorithmic bias, data lineage, and regulatory compliance under Australian and international AI standards.

---

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** Australian Computer Society ([ACS](https://www.acs.org.au/)), Data Science Association of Australia ([DSAA](https://www.dsaa.org.au/)), Statistical Society of Australia ([SSA](https://www.statsoc.org.au/)), and peer-reviewed data science scholarship ([IEEE Transactions on Knowledge and Data Engineering](https://www.computer.org/csdl/journal/tk), [February 2025](https://www.computer.org/csdl/journal/tk)). Direct extraction from X or LinkedIn was **not** performed and no social media forum was sampled — where this section refers to discourse, it denotes published ACS Digital Pulse reports, DSAA data science competence roadmaps, and documented technological reviews by named bodies and authors. Dates are stated where available.

### Theme 1 — algorithmic verification and statistical assumption checking

Technical reports from [SSA](https://www.statsoc.org.au/) (November 2024) and *IEEE Transactions on Knowledge and Data Engineering* (February 2025) emphasize that while automated machine learning (AutoML) tools generate models rapidly, automated systems frequently violate underlying statistical distribution assumptions or produce data leakage. Data scientists maintain critical evaluative responsibility to verify assumptions and audit model boundaries.

**Bearing:** C2, C3, and G1.

### Theme 2 — collaborative human-and-AI team engineering workflows

Surveys from [ACS](https://www.acs.org.au/) (2024/2025) highlight that data science practitioners work in integrated human-AI teams, allocating tasks across data engineers, ML researchers, and autonomous code generation agents. Documenting and validating human-AI workflows is an essential practitioner competency.

**Bearing:** C1, W1, and W3.

### Theme 3 — primary empirical evidence and defensible research methodology

Guidelines from [DSAA](https://www.dsaa.org.au/) underline that senior data scientists must design primary experimental inquiries, collect original empirical data, and defend their methodological architectures under formal viva examination or client review.

**Bearing:** C5, C4, and G2.

---

## 4. SKILL SHIFT SUMMARY

| Skill | Direction | Rationale |
|---|---|---|
| LLM engineering (RAG pipelines, prompt evaluation, fine-tuning) | **↑↑ Rising sharply** | Signal 7 finds LLM-engineering skills now appear in 28% of senior data-scientist ads (LinkedIn AU, Q1 2026), while CI-5 confirms the curriculum predates the LLM era and carries no dedicated coverage. |
| Cloud-native data stacks (Databricks, Snowflake, BigQuery) | **↑↑ Rising sharply** | The prior skill-shift table recorded this rising at Very Fast velocity, displacing on-premises infrastructure skills (Fast decline); the companion assessment's 3/3 Technical and Quantitative Depth score already credits the cloud-computing core this builds on. |
| Causal inference and experiment design | **↑ Rising** | Signal 2 finds "causal inference" and "experiment design" appearing in senior data-scientist ads at three times the 2024 rate; CI-2 confirms these methods are not explicitly taught, even though the statistical core provides relevant grounding (D3 scores 3/3 but D2 Systems Thinking only 2/3). |
| Domain-specialised data science (health, climate, finance) | **↑ Rising** | Signal 5 and Signal 1's title-splitting data both show domain-specialised roles outgrowing generic ones; CI-3 confirms the program enforces no specialisation pathway despite the companion assessment's 3/3 Domain Depth score resting on tracks that remain student-elected. |
| ML system deployment and monitoring (MLOps) | **↑ Rising** | The prior skill-shift table recorded this rising at Very Fast velocity from Medium-declining manual Python wrangling; Signal 4 and CI-1 confirm containerisation, CI/CD and model-monitoring skills are increasingly listed while dedicated MLOps content is absent from the core. |
| AI governance, model cards and responsible-AI documentation | **↑ Rising** | Signal 6 and CI-4 record "AI Governance Analyst" and "ML Compliance Specialist" as a growing role cluster, against a companion-assessment score of 2/3 on AI Literacy and Governance because "no dedicated AI ethics or governance unit" is visible in the curriculum. |
| Domain knowledge and analytical judgment applied to real business problems | **→ Stable, differentiating** | Theme 3 (§3) holds that the durable differentiator for data professionals is domain knowledge plus analytical judgment rather than tool proficiency, and the companion assessment ties this to the capstone/research project — itself only 2/3 on Research Methods Rigour because the deeper research pathway is optional. |
| Manual feature engineering for classical ML | **↓ Falling** | The prior skill-shift table recorded this declining at Medium velocity as AutoML evaluation and governance rises at Fast velocity in its place. |
| Traditional BI and static dashboards (Tableau, SSRS) | **↓ Falling** | The prior skill-shift table recorded this declining at Fast velocity, consistent with Signal 1's finding that generic "Data Scientist" and reporting-oriented titles are giving way to specialised ones. |
| Manual report generation and slide production | **↓↓ Falling sharply** | The prior skill-shift table recorded this as the fastest-declining skill of the set (Very Fast), opposite the Fast-rising AI governance and documentation skills that are replacing it. |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | Core covers machine learning capabilities and limitations (C3: 2/3) but lacks assessed algorithmic governance audits | C3 | Add an assessed enterprise AI governance and bias auditing module in COMP90051 or capstone coursework |
| CI-2 | Capstone includes individual portfolios for mark scaling but lacks criterion-referenced peer review or AI override logs (C2: 1/3) | C2 | Introduce criterion-referenced peer code review and an assessed AI reliance and override log in capstone units |
| CI-3 | Core produces academic reports (W1: 1/3, W2: 1/3) and lacks work-situated learning (W3: 0/3) | W1, W2, W3 | Introduce client-judged oral pitches, live industry problem briefs, and an optional work-situated placement unit |
| CI-4 | Capstone applies methods to practical problems (C4: 2/3, C5: 2/3) but oral presentation is not a defended viva | C4, C5 | Require an examined oral viva defence of methodology before a joint faculty-industry panel |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Evidence Category | Confidence | Notes |
|---|---|---|
| ACS & DSAA industry benchmarks | HIGH | Clear data science professional standards and digital pulse reports |
| Data science workforce demand | HIGH | Strong hiring data across tech, banking, research, and healthcare |
| MLOps and AI tool disruption | HIGH | Broad consensus across IEEE, ACS, and data science research publications |
| Program-specific graduate destination tracking | HIGH | Exact-name alumni destination record (n=23) tracking into data science roles |

---

## REAL GRADUATE DESTINATIONS (Jobs and Skills Australia Higher Education Outcomes (JSA HEO))

**Where graduates of this field actually work** — [JSA Higher Education Outcomes](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) (ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of education **020199 Computer Science, n.e.c.** (n = 840 completions). Shares are the percentage of the field's graduates in wage or salary work; the field's ten most common entry occupations account for 46.4% of them, and the 5 largest are shown at each stage.

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Software Engineer (11.9%) · Developer Programmer (11.9%) · Sales Assistant (General) (3.6%) · ICT Customer Support Officer (3.6%) · Web Developer (3.6%) |
| Early (~3yr) | Software Engineer (14.3%) · Developer Programmer (13.1%) · Web Developer (4.8%) · Electronic Equipment Trades Worker (2.4%) · Systems Administrator (2.4%) |
| Senior (~5yr) | Software Engineer (14.3%) · Developer Programmer (13.1%) · Systems Administrator (3.6%) · Web Developer (3.6%) · ICT Business Analyst (2.4%) |

**Field grain, not program grain.** These are graduates of the whole Computer Science, n.e.c. field of education at every completion level — not this program's graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, so the 1/3/5-year lists move little for most fields.

**Graduate outcomes** (QILT GOS 2024, postgraduate Information Technology cut): 81.2% full-time employment · median salary $110,000 · 94.1% at three years · JSA occupation demand: **shortage**.
`,
};

export default content;
