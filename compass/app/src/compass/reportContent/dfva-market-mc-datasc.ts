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

### Declining Demand
- Manual pandas data cleaning and basic exploratory scripting
- Static dashboard generation without predictive modeling
- Unverified black-box ML model deployment without explainability

### Rising Demand
- Evaluative verification of AI-generated code and statistical models
- Production MLOps, containerization, and continuous model monitoring
- Causal inference, A/B testing design, and Bayesian statistics
- Algorithmic fairness auditing and enterprise AI governance

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

## REAL GRADUATE DESTINATIONS & DEMAND (JSA HEO · QILT · Adzuna)

**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, 010103 / 020101 Data Science & Mathematical Sciences):

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Data Scientists (45%), Machine Learning Engineers (25%), Data Analysts (20%), Quantitative Analysts (10%) |
| Early (~3yr) | Senior Data Scientists (40%), Lead ML Engineers (30%), MLOps Architects (15%), Data Science Delivery Leads (15%) |
| Senior (~5yr) | Principal Data Scientists (35%), Heads of AI / Data Science (30%), Chief Data Scientists (20%), AI Governance Directors (15%) |

**Graduate outcomes** (QILT GOS 2024, postgraduate data science): 91% full-time employment · median salary ,000 · JSA occupation demand: **High**.

**Hiring now (demand-side)** — Adzuna AU live vacancies: Atlassian, Canva, CSIRO, Macquarie Group, Commonwealth Bank, AWS, Cochlear, Telstra, Optiver, Citadel Securities. Advertised salary Ak–230k.
`,
};

export default content;
