// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Business Analytics (MC-BUSANA) — DFVA Assessment",
  institution: "University of Melbourne",
  markdown: `## DFVA REPORT: Master of Business Analytics (MC-BUSANA)

**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 1 year (150 credit points)

**Assessment date:** 2026-06-09
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-busana
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE

The Master of Business Analytics at the University of Melbourne (Melbourne Business School) is a specialist quantitative degree targeting candidates who want to build and deploy data-driven decision systems in business contexts. It is among the most technically rigorous business analytics programs in Australia.

The 150-credit-point core includes *Machine Learning & AI for Business*, *Statistical Learning*, *Natural Language Processing*, *Causal Analytics*, *Predictive Analytics*, *Decision Making and Optimisation*, *Data Platforms and Ecosystems*, and *Programming Foundations*. An *Individual Research Project* (25pt) is available with coordinator approval for those seeking a research pathway.

Typical graduate roles include data scientist, machine learning engineer, analytics consultant, business intelligence lead, quantitative analyst, and AI product manager. The program produces graduates who build AI systems rather than being replaced by them — a structural differentiator.

### 2. AUTOMATION EXPOSURE PROFILE

| Stage | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Data scientist, ML engineer, analytics consultant — model building, pipeline development, analysis design | **LOW–MEDIUM** — Graduates build AI tools; they design the systems that automate others. AutoML compresses some junior modelling, but problem framing and validation remain human. |
| Year 3–5 | Senior data scientist, analytics lead, ML engineering manager — system design, governance, team leadership | **LOW** — Senior analytical judgment, model evaluation, and governance accountability are not automatable. |
| Year 5+ | Chief Analytics Officer, AI product director, data platform architect — organisational analytics strategy | **LOW** — Strategic decision-making and AI governance at scale are the core value. |

**Structural advantage:** Business Analytics graduates are building the tools that replace others — not being replaced. The degree trains people to sit above the automation layer, which makes them structurally more durable than most graduate cohorts. The primary risk is AutoML and foundation models reducing the barrier to entry for junior ML work, compressing the first-two-year tier somewhat.

### 3. MARKET EVIDENCE SNAPSHOT

| Job Family | Recent Hiring Signal | Discussion Theme | Curriculum Implication |
|---|---|---|---|
| Business Intelligence & Reporting | Routine SQL and report generation increasingly automated by Copilot-style BI tools; entry-level headcount under pressure | "Analytics engineering is redefining the analyst role — pipeline literacy is now expected" | Add cloud-native SQL (BigQuery/Snowflake) and analytics-engineering (dbt) instruction |
| Advanced Analytics & Data Science | Demand growing for analysts who validate and interpret ML outputs; data analysts #2 fastest growing (WEF 2025) | "Generative AI is compressing entry-level workflows — the quality bar is rising" | Embed AI-augmented analytics exercises across core subjects |
| Analytics Consulting | 23% YoY growth in "analytics consultant" postings in ANZ 2025; client trust remains differentiating | "Communication and data storytelling are now explicitly screened" | Require assessed non-technical stakeholder presentations |
| Operations Research & Optimisation | OR / supply-chain analyst roles grew ~19% 2023–2025; documented skills shortage | "Supply chain and operations analytics talent shortage is widely acknowledged" | Pair OR theory with applied ERP/WMS supply-chain projects |
| Marketing & Customer Analytics | Cookie deprecation and AU Privacy Act reform driving consent-based analytics demand | "Privacy and data governance are now practitioner concerns, not just compliance" | Add first-party data strategy and governance frameworks |
| Financial Analytics | APRA/ASX regulatory requirements sustain demand for validated model-risk roles | "Explainability and responsible AI are entering practitioner discourse" | Build model-risk, explainability and audit-trail competency |

### 4. DFVA SCORECARD

| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2 | Data scientists/analysts build AI tools rather than being replaced by them. Some routine analysis is automatable but strategic problem framing and business translation resist automation strongly. |
| 2 | Systems Thinking and Problem Framing | 3 | Translating business problems into quantitative form, integrating across statistics/ML/optimisation domains. Causal + predictive + NLP — full quantitative systems toolkit. |
| 3 | Technical and Quantitative Depth | 3 | Machine Learning & AI, Statistical Learning, NLP, Causal Analytics, Predictive Analytics — deeply quantitative. Programming Foundations included as core. |
| 4 | Decision-Making Under Uncertainty | 3 | Decision Making and Optimisation is a core subject. Learning outcomes explicitly require dealing with ambiguity, uncertainty, and bias in real business contexts. |
| 5 | AI Literacy and Governance | 3 | Machine Learning & AI for Business, NLP — AI is core curriculum, not elective. Graduates can deploy and critically evaluate AI workflows. |
| 6 | Domain Depth and Specialisation | 3 | 150pt specialist degree. Core across data platforms, programming, statistics, ML, NLP, causal/predictive analytics. Clear specialist identity distinct from generic management. |
| 7 | Research Methods Rigour | 2 | Individual Research Project (25pt) available with coordinator approval. Research pathway optional but genuine quantitative research skills embedded throughout core. |
| 8 | Human and Relational Capability | 2 | Professional development includes teamwork and professional standards. Communication to non-technical audiences emphasised. Not clinical-level relational. |
| 9 | Curriculum Currency and Adaptability | 3 | Updated April 2026. ML/AI, NLP, Causal Analytics — state-of-the-art quantitative curriculum clearly designed for AI-era business needs. |
| 10 | Graduate Outcome Evidence | 3 | Business analytics employment outcomes strong. Melbourne Business School reputation and tracked employment. Strong demand signal for the specific skill set. |
| B | Irreplaceability Premium (Bonus) | 3 | Graduates build and deploy AI systems — this program trains the replacers. AI literacy + quantitative depth + business translation is a rare triple combination. |

**TOTAL: 30 / 36**
**Risk band: RESILIENT (28-36)**

### 5. THREE THRESHOLD QUESTIONS

- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?
  **NO** — core work requires translating messy business problems into tractable quantitative form, designing valid measurement, and governing AI outputs in high-stakes contexts, which AI cannot yet replicate reliably.
- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?
  **YES** — the program's specialist curriculum and Individual Research Project pathway provide genuine decision ownership and system design capability.
- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?
  **YES** — structural demand for the specific skill set and AI-native curriculum positioning make 5-year employability stronger than today.

### 6. ANALOGUE GRADUATE PROFILE

The most exposed Business Analytics graduate is the **Junior BI Analyst of 2021**: a capable SQL writer who produced dashboards, ran standard regression analyses, and maintained reporting infrastructure — work now absorbed by Power BI Copilot, Tableau AI, and agentic analytics tools. This profile does not represent the MC-BUSANA graduate, but it represents what the program was historically competing against.

The MC-BUSANA graduate is better positioned because their core skill is not dashboard production — it is causal inference, model design, and problem framing. These require:
- **Knowing when the ML model is wrong** and why — a capability that requires understanding of training data, distribution shift, and failure modes
- **Translating messy business problems into tractable quantitative form** — the hardest part of analytics, and where human judgment is most critical
- **Governing AI outputs in high-stakes contexts** — who is accountable when the model recommends wrongly

Threatening tool classes: BI co-pilots (Power BI Copilot, Tableau Pulse), AutoML platforms, LLM code interpreters, and agentic analytics tools that compress routine junior modelling and reporting.

### 7. VERDICT

The Master of Business Analytics is **RESILIENT (30/36)** — one of the strongest programs in the portfolio for 2027 and beyond. Graduates build and deploy AI systems rather than being replaced by them, combining machine-learning depth, causal analytics, and business translation into a graduate profile with genuine automation resistance at its core. The degree is resilient under one condition: graduates must position themselves as decision-layer professionals, not code-production workers — the capability to frame a causal question, design a valid test, and defend the inference is what the AI era actually demands, and that capability is in this program.

### 8. RECOMMENDATIONS

| Priority | Action | Dimension | Market Signal Link | Effort |
|---|---|---|---|---|
| P1 | Pursue the Individual Research Project if available — the ability to design and defend original quantitative analysis is the highest differentiator in the job market | D7 | Causal inference cited as the skill separating good from great analysts | High |
| P2 | Build specialisation in a regulated domain — healthcare analytics, financial risk modelling, or public policy evaluation create governance requirements that sustain human judgment | D6 | Domain-specific analytics commanding 10–18% salary premiums | Medium |
| P3 | Develop explainability and governance competency beyond technical modelling — audit trails, fairness metrics, and regulatory compliance for AI | D5 | Explainability and responsible AI entering practitioner discourse | Medium |
| P4 | Build the communication layer explicitly — the ability to explain model outputs to non-technical decision-makers is the most common gap in quantitative graduates | D8 | Communication and data storytelling now explicitly screened in ANZ hiring | Low |
| P5 | Target AI product management and ML engineering lead roles, not just data science contributor roles — governance and direction create more durable positioning | D1 | Full-stack analyst expectation stressing generalist programs | Low–Medium |

### 9. THE REDESIGNED GRADUATE PROFILE

The 2027-ready Business Analytics graduate does not run standard models on clean datasets. They **define the question, design the measurement, and own the interpretation** — the parts of the analytics pipeline that AI cannot do without a human who understands the domain.

They have done causal inference properly: they know the difference between correlation and causation at a mechanism level, they have built a valid instrumental variable or designed a natural experiment, and they have defended that methodology under expert scrutiny. That specific capability — identifying and exploiting variation — is the skill that separates a genuine quantitative analyst from a dashboard operator.

They can read a model fairness audit and know what questions to ask. They understand what "the model is biased" means technically and what its implications are for deployment in a specific context. They can brief a legal team on why an algorithmic decision requires human review.

They have communicated their work to a CFO, a product manager, and a regulatory team — and adjusted their framing for each audience without losing technical precision. That translation capacity is what makes them genuinely valuable at the decision-making layer.

### 10. MARKET CONFIDENCE NOTE

- Confidence level for market signals in this report: **Medium**.
- Market evidence integrates QILT GOS field-of-study outcomes with WEF Future of Jobs 2025, DEWR Labour Market Insights, LinkedIn/Seek trend data, and ANZ analytics practitioner discourse; live job-ad scrape and program-title graduate-destination data were unavailable.
- For high-stakes curriculum decisions, add a live ANZ job-ad scrape (last 90 days) and program-level destination data at role-title granularity from MBS Careers & Industry.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Business & Management |
| Full-time employment (4-6mo) | 92.3% (GOS 2024) |
| Median starting salary | $124,000 |
| Employment (3yr) | 92.3% |
| Occupation demand | MET |
| AI automation exposure | 55% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |

---

### REAL GRADUATE DESTINATIONS (JSA HEO · QILT · Adzuna)

**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, by field of education; % = share of field graduate placements):

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Accountant (General) (16%), General Clerk (5%), Marketing Specialist (4%), Sales Assistant (General) (4%), Sales and Marketing Manager (4%) |
| Early (~3yr) | Accountant (General) (16%), Sales and Marketing Manager (5%), Marketing Specialist (4%), Management Consultant (4%), General Clerk (3%) |
| Senior (~5yr) | Accountant (General) (15%), Sales and Marketing Manager (5%), Marketing Specialist (4%), Management Consultant (4%), Program or Project Administrator (3%) |

**Graduate outcomes** (QILT GOS 2024, postgraduate): 92% full-time employment · median salary $124,000 · 3-year employment 96% · JSA occupation demand: **Met**.

**Hiring now (demand-side)** — Adzuna AU live vacancies (who is advertising, *not* alumni destinations): Commonwealth Bank, Westpac, NAB, CMC Markets, Woolworths Group, Ventia, Brand Collective, EY (Ernst & Young), Bed Bath N' Table, EssilorLuxottica, Alinta Energy, VetPartners Australia. Advertised salary A$80k–125k.

**Sector context:** A$45.4bn across 41 institutions — international-student caps (NPL 270k→295k) and a 32.5% offshore visa refusal rate (Feb 2026) are resetting fee revenue; sector profit fell 18.1% (University & Other Higher Education in Australia (IBISWorld P8102, Jun 2026)).

*Sources: JSA HEO Work & Occupation (Table_3); QILT GOS 2024; IBISWorld P8102; Adzuna AU. Destinations are field-of-education level (not per-degree); employers are demand-side (not alumni).*
`,
};

export default content;
