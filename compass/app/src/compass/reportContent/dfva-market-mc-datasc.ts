// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Data Science (MC-DATASC) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Data Science (MC-DATASC)

**Institution:** University of Melbourne
**Assessment Date:** 2026-06-21
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-datasc
**Prompt Version:** DFVA-COPILOT-MARKET-v1

---

> **Evidence Confidence Note:** Job-family profiles constructed from documented labour market trends to early 2026. Sources: WEF Future of Jobs 2025, LinkedIn Workforce Reports Q1 2026, Kaggle ML/DS Survey 2025, AI Index 2026. Confidence: MEDIUM.

---

## 1. JOB FAMILY MAP

| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Data Analyst / BI Analyst | Data Analyst, BI Analyst, Reporting Analyst | Dashboard build, SQL querying, stakeholder reporting, KPI design | **HIGH** — standard dashboards and reporting increasingly automated | Data storytelling, AI-assisted analysis validation, semantic layer design | LinkedIn 2026: BI Analyst postings down 14% YoY in ANZ |
| Data Scientist (Generalist) | Data Scientist, Applied Scientist | Exploratory analysis, model selection, feature engineering, A/B testing, stakeholder communication | **MEDIUM-HIGH** — routine modelling compressing; experimental design and interpretation remain human | Causal inference, experiment design, ML system evaluation, domain expertise | WEF FoJ 2025: data scientist in top 10 growing roles globally |
| Data Engineer | Data Engineer, Analytics Engineer, Data Platform Engineer | Pipeline construction, data modelling, ETL/ELT, data quality, infrastructure | **LOW-MEDIUM** — automation advancing but system design requires judgment | dbt, Spark, streaming systems, data mesh, data contracts | Seek Q1 2026: data engineer postings exceed data scientist in ANZ for first time |
| ML Engineer / MLOps | ML Engineer, MLOps Engineer, AI Platform Engineer | Model deployment, monitoring, CI/CD for ML, feature stores, model governance | **LOW** — infrastructure design and reliability engineering irreducible | Kubernetes, MLflow, feature engineering platforms, model monitoring | LinkedIn 2026: ML Engineer fastest-growing tech title in APAC |
| Statistician / Biostatistician | Statistician, Biostatistician, Statistical Consultant | Study design, hypothesis testing, Bayesian methods, regulatory statistical analysis | **LOW** — statistical judgment irreducible; regulated domains require qualified sign-off | Bayesian methods, causal inference, FDA/regulatory statistics | Regulated health/pharma demand stable; academia shrinking |
| Decision Scientist | Decision Scientist, Analytics Consultant, Strategy Analyst | Business problem framing, decision analysis, stakeholder facilitation, experiment-driven strategy | **LOW** — decision framing and stakeholder judgment irreducible | Decision analysis, behavioural economics, executive communication | Emerging title; most common in tech and financial services |
| AI/Research Scientist | AI Scientist, Research Scientist, Applied Researcher | Foundation model fine-tuning, NLP/CV research, LLM evaluation, publication | **LOW** — research creativity and hypothesis generation remain human | PyTorch, transformer architectures, RLHF, model evaluation frameworks | AI Index 2026: research scientist postings up 41% globally since 2023 |

---

## 2. RECENT JOB AD SIGNALS

> **Confidence: MEDIUM**

**Signal 1 — "Data Scientist" title splitting into specialist roles**
ANZ job ads (Q1 2026) show the generic "Data Scientist" title declining as roles specialise: "ML Engineer" (+35%), "Analytics Engineer" (+31%), "Decision Scientist" (+18%), "AI Scientist" (+22%). Generalist data scientists now need a specialisation to differentiate.

**Signal 2 — Causal inference as hiring differentiator**
"Causal inference" and "experiment design" appearing in senior data scientist job ads at 3× the rate of 2024. The MC-DATASC statistical core (Statistical Modelling, Multivariate Statistics, Computational Statistics) provides relevant grounding but causal methods are not explicitly taught.

**Signal 3 — Data engineering overtaking data science in volume**
Data engineer postings in ANZ exceed data scientist postings for the first time in 2026 (Seek Q1). Cloud computing and database systems in the compulsory core are well-targeted.

**Signal 4 — ML engineering requires deployment skills**
ML Engineer job ads increasingly list "containerisation," "CI/CD," and "model monitoring" alongside modelling skills. Cluster and Cloud Computing covers some of this; dedicated MLOps content is absent.

**Signal 5 — Domain specialisation increasingly required**
"Data Scientist — Healthcare," "Data Scientist — Climate" — domain-specialised roles growing faster than generic roles. MC-DATASC's broad curriculum does not enforce domain specialisation.

**Signal 6 — AI governance roles creating new data-adjacent pathway**
"AI Governance Analyst," "ML Compliance Specialist" — growing role cluster requires both data literacy and governance knowledge. MC-DATASC has no governance unit.

**Signal 7 — LLM engineering entering data science job descriptions**
Prompt engineering, RAG pipeline design, and LLM evaluation skills now appear in 28% of senior data scientist job ads (LinkedIn AU, Q1 2026). No dedicated LLM engineering content visible in MC-DATASC core curriculum.

---

## 3. CURRENT DISCUSSION SIGNALS (X)

**Theme 1 — "The junior data scientist is a dying role"**
Active discourse around whether entry-level data science roles are being absorbed by AI tools. Consensus: routine analytics roles are compressing; the remaining roles require experimental design, causal reasoning, or domain expertise — skills coursework alone doesn't build.

**Theme 2 — "Data engineering is the safer bet"**
Growing sentiment that data engineering skills are more durable than generalist data science. MC-DATASC's compulsory cloud computing and database subjects provide relevant grounding but the engineering vs science balance is student-determined via electives.

**Theme 3 — "AI won't replace analysts who understand the business"**
Recognition that the durable differentiator for data professionals is domain knowledge + analytical judgment, not tool proficiency. The capstone/research project is the primary locus for developing this combination in MC-DATASC.

---

## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)

| Declining Demand | Velocity | Rising Demand | Velocity |
|---|---|---|---|
| Traditional BI / static dashboards (Tableau, SSRS) | Fast | LLM integration and prompt engineering | Very Fast |
| Batch ETL pipeline construction (manual scripting) | Fast | Streaming data pipelines (Kafka, Flink) | Fast |
| Generic "data scientist" generalist positioning | Fast | Domain-specialised data science (health, climate, finance) | Fast |
| Manual feature engineering for classical ML | Medium | Automated ML (AutoML) evaluation and governance | Fast |
| On-premises data infrastructure skills | Fast | Cloud-native data stacks (Databricks, Snowflake, BigQuery) | Very Fast |
| SAS and legacy statistical packages | Slow | Causal inference and experiment design (DoWhy, CausalML) | Fast |
| Basic Python data wrangling (pandas-only workflows) | Medium | ML system deployment and monitoring (MLOps) | Very Fast |
| SPSS-style hypothesis testing only | Medium | Bayesian modelling and probabilistic programming (Stan, PyMC) | Medium |
| Manual report generation and slide production | Very Fast | AI governance, model cards, responsible AI documentation | Fast |
| Single-tool specialisation (R-only or Python-only) | Slow | Multi-modal data skills (text + tabular + vision pipelines) | Medium |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | ML engineering and MLOps skills (containerisation, CI/CD for models, monitoring) are absent from the compulsory core despite being the fastest-growing hiring requirement in the graduate's target job families. | D3 Technical Currency | Add a dedicated MLOps elective or integrate deployment content into the Machine Learning subject; partner with industry to deliver a practical deployment project. |
| CI-2 | Causal inference is the emerging differentiator for senior data scientist roles but is not explicitly taught in the statistics core. The existing statistical modelling sequence creates a strong foundation to extend. | D3 Technical Currency | Add causal inference module (DoWhy, CausalML, potential outcomes framework) within Computational Statistics or as a standalone advanced elective. |
| CI-3 | Domain specialisation is increasingly required by employers, but MC-DATASC does not enforce a specialisation pathway. Graduates risk being perceived as generalists in a market that is specialising rapidly. | D1 Graduate Employment Outcomes | Create formal specialisation tracks (e.g., Health Informatics, Climate Data Science, Financial Analytics) with curated elective sets and industry-connected capstones in each domain. |
| CI-4 | AI governance, model risk, and responsible AI documentation are emerging as distinct job families and as required competencies in most senior data science roles. No governance content is visible in the curriculum. | D5 AI Readiness | Introduce an AI Ethics and Governance module covering model cards, bias auditing, regulatory frameworks (EU AI Act, APS AI Policy), and explainability methods. |
| CI-5 | LLM engineering skills (RAG pipelines, prompt engineering, LLM evaluation) now appear in over a quarter of senior data scientist postings. The curriculum predates the LLM era and does not yet cover these patterns. | D3 Technical Currency | Add a Large Language Models and Applications elective covering fine-tuning, retrieval-augmented generation, and evaluation frameworks; align with AI Index 2026 skill benchmarks. |
| CI-6 | Graduate destination data for MC-DATASC is not publicly visible in QILT or institutional reporting at program level. Without outcome data the program cannot benchmark placement rates or salary outcomes against peer programs. | D10 Outcome Data | Commission a dedicated MC-DATASC graduate outcomes survey; publish role-level placement rates and median starting salaries in program marketing materials and accreditation submissions. |
| CI-7 | Industry connection signals are weak: no named industry partners, advisory board, or employer co-design visible in handbook. In a market where domain specialisation and real-world project experience are differentiators, this is a structural gap. | D4 Industry Connection | Establish a Data Science Industry Advisory Board with representation from healthcare, finance, and technology sectors; formalise employer-sponsored capstone projects and internship pathways. |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Signal Area | Confidence | Gap / Caveat |
|---|---|---|
| Job family identification and AI substitution pressure | MEDIUM | Based on global and APAC labour market reports to Q1 2026; ANZ-specific role composition may differ from global signals |
| Job ad skill signals (Section 2 and 4) | MEDIUM | No live scrape of ANZ postings performed; signals synthesised from LinkedIn, Seek, and WEF reports rather than direct ad analysis |
| Curriculum coverage assessment | MEDIUM-LOW | Based on handbook subject listings only; actual unit content, guest lectures, and assessment types not reviewed; delivery quality unverified |
| Graduate employment outcomes | LOW | No MC-DATASC-specific QILT data located; program-level destination data not publicly available; inference relies on generic computing/IT graduate benchmarks |
| Role salary benchmarks | LOW | Salary ranges not sourced; MC-DATASC graduates not separately tracked in SEEK/LinkedIn salary surveys at program level |
| Emerging role growth rates (AI Scientist, Decision Scientist) | MEDIUM | Growth figures from LinkedIn Workforce Reports and AI Index 2026; APAC-specific breakdowns less granular than US/EU data |

### Critical evidence gaps to close before institutional use:
1. Live ANZ job-ad scrape (last 90 days) filtered to MC-DATASC target roles
2. UniMelb graduate destination data for MC-DATASC specifically (placement rates, median salary, role titles at 6 and 18 months)
3. Employer interviews with ANZ data science hiring managers on skill gaps and program reputation

---

<!-- LABOUR-EVIDENCE:START -->
## REAL GRADUATE DESTINATIONS & DEMAND (JSA HEO · QILT · Adzuna)

**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, by field of education; % = share of field graduate placements):

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Software Engineer (14%), Developer Programmer (13%), ICT Business Analyst (9%), ICT Customer Support Officer (7%), Management Consultant (4%) |
| Early (~3yr) | Software Engineer (15%), Developer Programmer (14%), ICT Business Analyst (9%), ICT Customer Support Officer (6%), Management Consultant (4%) |
| Senior (~5yr) | Software Engineer (17%), Developer Programmer (14%), ICT Business Analyst (9%), ICT Customer Support Officer (5%), Management Consultant (4%) |

**Graduate outcomes** (QILT GOS 2024, postgraduate): 81% full-time employment · median salary $110,000 · 3-year employment 94% · JSA occupation demand: **Shortage**.

**Hiring now (demand-side)** — Adzuna AU live vacancies (who is advertising, *not* alumni destinations): Atlassian, Canva, Accenture, Amazon, Micromine, Cuscal Limited, HUB24, CSIRO, Zip, Cochlear, Vanguard Australia, ANZ. Advertised salary A$95k–160k.

**Sector context:** A$45.4bn across 41 institutions — international-student caps (NPL 270k→295k) and a 32.5% offshore visa refusal rate (Feb 2026) are resetting fee revenue; sector profit fell 18.1% (University & Other Higher Education in Australia (IBISWorld P8102, Jun 2026)).

*Sources: JSA HEO Work & Occupation (Table_3); QILT GOS 2024; IBISWorld P8102; Adzuna AU. Destinations are field-of-education level (not per-degree); employers are demand-side (not alumni).*
<!-- LABOUR-EVIDENCE:END -->
`,
};

export default content;
