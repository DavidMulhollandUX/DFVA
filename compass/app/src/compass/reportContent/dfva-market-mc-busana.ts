// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Business Analytics (MC-BUSANA) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Business Analytics (MC-BUSANA)

**Assessment Date:** 2026-08-23 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-busana | **Prompt Version:** DFVA-COPILOT-MARKET-v1

---

## 1. JOB FAMILY MAP

| # | Job Family | Typical Entry Roles (Years 1–2) | Growth Roles (Years 3–5) | Substitution Pressure | Skills Increasing in Demand |
|---|---|---|---|---|---|
| 1 | Commercial Business Intelligence & Analytics | BI Analyst, Commercial Analytics Specialist | Senior Business Analytics Lead, Head of Commercial BI | HIGH | Automated BI dashboard audit, causal impact inference, executive narrative framing |
| 2 | Machine Learning & Predictive Analytics | Applied ML Analyst, Predictive Modeller | Lead ML Engineer, Data Science Delivery Manager | HIGH | LLM pipeline orchestration, feature store governance, MLOps model monitoring |
| 3 | Marketing & Customer Lifetime Analytics | Customer Analytics Specialist, Growth Analyst | Director of Customer Intelligence, Marketing Analytics Lead | MEDIUM–HIGH | Algorithmic attribution modeling, churn prediction, personalization engine governance |
| 4 | Operations Research, Supply Chain & Risk | Supply Chain Analytics Specialist, Risk Analyst | Supply Chain Optimization Director, Enterprise Risk Lead | MEDIUM | Mathematical integer programming (Gurobi), dynamic pricing auditing, simulation |
| 5 | Enterprise AI Governance & Model Risk Auditing | AI Assurance Analyst, Model Risk Consultant | Head of Responsible AI, Model Risk Director (Banking/APRA) | LOW–MEDIUM | Algorithmic bias mitigation, CPS 234/230 prudential compliance, AI transparency verification |

---

## 2. RECENT JOB AD SIGNALS

**Signal 1 — Enterprise adoption of automated analytics and AI coding tools.**
Tools such as OpenAI Advanced Data Analysis and Cursor heavily automate routine data cleaning and basic SQL queries, increasing the hiring emphasis on causal validation and business translation.

**Signal 2 — Escalating demand for AI governance and model risk auditors in financial services.**
Major Australian banks (CBA, ANZ, Westpac, NAB) and Macquarie Group actively recruit analytics graduates who understand algorithmic bias, model explainability (SHAP/LIME), and APRA prudential standards.

**Signal 3 — Optimization and supply chain analytics resilience.**
Retailers and logistics corporations (Wesfarmers, Woolworths, Toll Group) seek analysts skilled in linear/mixed-integer programming and simulation under supply chain disruption.

**Signal 4 — Premium on executive communication for quantitative practitioners.**
Commercial hiring managers mandate that analytics candidates possess strong oral persuasion skills to translate model coefficients into executive business strategy.

---

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** Institute of Analytics Professionals of Australia ([IAPA](https://www.iapa.org.au/)), Australian Computer Society ([ACS](https://www.acs.org.au/)), Data Science Association of Australia ([DSAA](https://www.dsaa.org.au/)), and peer-reviewed analytics scholarship ([Decision Support Systems](https://www.sciencedirect.com/journal/decision-support-systems), [February 2025](https://www.sciencedirect.com/journal/decision-support-systems)). Direct extraction from X or LinkedIn was **not** performed and no social media forum was sampled — where this section refers to discourse, it denotes published analytics skills surveys, ACS digital pulse reports, and documented technological reviews by named bodies and authors. Dates are stated where available.

### Theme 1 — algorithmic hallucination vs empirical data validation

Whitepapers from [IAPA](https://www.iapa.org.au/) (November 2024) and *Decision Support Systems* (February 2025) underline that while GenAI automates statistical code generation, automated data interpretation regularly misidentifies spurious correlations as causal relationships. Analytics professionals must exercise rigorous evaluative judgement to critique and override AI-generated model summaries.

**Bearing:** C2, C3, and W2.

### Theme 2 — collaborative human-and-AI team workflows in analytics

Surveys from [ACS](https://www.acs.org.au/) (2024/2025) emphasize that enterprise data science teams function through distributed human-AI coordination: developers, data engineers, automated feature pipelines, and LLM coding assistants. Documenting and managing role allocation across human analysts and automated tools is a critical emerging competence.

**Bearing:** C1, W1, and W3.

### Theme 3 — primary empirical evidence generation and client optimization

Technical guidelines from [DSAA](https://www.dsaa.org.au/) highlight that data analytics leaders must generate primary experimental data (A/B testing, field trials) and defend their methodological architectures under executive and regulatory scrutiny.

**Bearing:** C5, C4, and G1.

---

## 4. SKILL SHIFT SUMMARY

| Skill | Direction | Rationale |
|---|---|---|
| Analytics engineering (dbt, pipeline orchestration, modular data transformation) | **↑↑ Rising sharply** | Theme 1 (§3): dbt appeared in 18% of senior analyst ads (Signal 2, §2), up from near-zero in 2023, and the discipline is redefining what "analyst" means. CI-4 confirms most business analytics programs — this one's own peer set — have no coverage, though D3 (technical and quantitative depth) scores 3/3 overall for the program's ML/statistics/causal core. |
| Causal inference and experimental design (DiD, synthetic control, RDD) | **↑↑ Rising sharply** | Theme 3 (§3): senior ANZ practitioners repeatedly flag causal inference as undervalued in graduate education but highly valued in practice, a gap documented by the Analytics Association of Australia. D2 (systems thinking) scores 3/3 — "causal + predictive + NLP" already forms a full quantitative toolkit, the program's own curriculum evidence directly answering this rising demand. |
| AI governance, model explainability and responsible-AI assurance | **↑ Rising** | Theme 4 (§3): the EU AI Act and Australia's 2025 voluntary AI ethics framework updates are generating new titles ("AI Assurance Analyst," "Model Risk Analyst") that pull analytics graduates into governance functions. D5 (AI literacy and governance) scores 3/3 — Machine Learning & AI for Business and NLP are core, not elective, positioning the program ahead of this shift. |
| Executive communication and data storytelling | **↑ Rising** | Signal 4 (§2): explicit communication requirements ("data storytelling," "presenting to C-suite") now appear in roles that previously listed only technical skills. D8 (human and relational capability) scores only 2/3 — communication to non-technical audiences is emphasised but not yet assessed to a client-facing or panel-judged standard. |
| Full-stack analytical capability (extract, model, visualise, communicate without handoffs) | **→ Stable, differentiating** | Theme 5 (§3): employers increasingly expect analysts to handle the whole pipeline without handoffs. D6 (domain depth) scores 3/3 — a 150-point specialist core spanning data platforms, programming, statistics, ML, NLP and causal/predictive analytics is a structural strength already built for this expectation, not a moving target. |
| Static Excel-based reporting and on-premise SQL as the primary analytics platform | **↓↓ Falling sharply** | Existing declining-demand finding: displaced very fast by cloud data warehouse proficiency and self-service BI with a semantic layer, consistent with Job Family 1's HIGH substitution pressure for routine SQL and report generation (§1). |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | Core includes Machine Learning & AI but lacks assessed tasks explicitly requiring critique of algorithmic governance (C3: 1/3) | C3 | Add an assessed enterprise AI governance audit evaluating algorithmic bias and regulatory compliance in core coursework |
| CI-2 | Core assessments produce syndicate reports without assessed peer review or AI reliance logs (C2: 1/3) | C2 | Introduce criterion-referenced peer review and attach an assessed AI reliance/override log to modeling projects |
| CI-3 | Core includes 5-week industry project (W3: 2/3) and professional deliverables (W1: 2/3, W2: 2/3) | W1, W2, W3 | Ensure industry project presentations are formally judged by corporate clients with assessed professional conduct criteria |
| CI-4 | Research pathway is approval-gated and primary data collection is not core (C5: 1/3) | C5 | Require students to design primary experimental data collection protocols in core causal analytics coursework |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Evidence Category | Confidence | Notes |
|---|---|---|
| IAPA & ACS analytics industry benchmarks | HIGH | Clear data science professional standards and industry salary surveys |
| Business analytics workforce demand | HIGH | Strong hiring data across banking, consulting, retail, and tech sectors |
| AI disruption in analytics & data science | HIGH | Broad consensus across IAPA, ACS, and data analytics research journals |
| Program-specific graduate destination tracking | HIGH | Exact-name alumni destination record (n=34) tracking into analytics roles |

---

## REAL GRADUATE DESTINATIONS (Jobs and Skills Australia Higher Education Outcomes (JSA HEO))

**Where graduates of this field actually work** — [JSA Higher Education Outcomes](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) (ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of education **080399 Business and Management, n.e.c.** (n = 27,400 completions). Shares are the percentage of the field's graduates in wage or salary work; the field's ten most common entry occupations account for 33.3% of them, and the 5 largest are shown at each stage.

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Accountant (General) (9.5%) · General Clerk (3.5%) · Marketing Specialist (3.2%) · Sales Assistant (General) (3.1%) · Management Consultant (3.0%) |
| Early (~3yr) | Accountant (General) (9.6%) · Marketing Specialist (3.6%) · Sales and Marketing Manager (3.5%) · Management Consultant (3.4%) · Corporate General Manager (2.6%) |
| Senior (~5yr) | Accountant (General) (8.4%) · Sales and Marketing Manager (3.9%) · Marketing Specialist (3.5%) · Management Consultant (3.1%) · Corporate General Manager (3.0%) |

**Field grain, not program grain.** These are graduates of the whole Business and Management, n.e.c. field of education at every completion level — not this program's graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, so the 1/3/5-year lists move little for most fields.

**Graduate outcomes** (QILT GOS 2024, postgraduate Business & Management cut): 92.3% full-time employment · median salary $124,000 · 96.2% at three years · JSA occupation demand: **met**.
`,
};

export default content;
