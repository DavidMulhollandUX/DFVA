// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Data Science (MC-DATASC) — DFVA Assessment",
  institution: "University of Melbourne",
  markdown: `## DFVA REPORT: Master of Data Science (MC-DATASC)

**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-08
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-datasc
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Data Science is a 200-credit-point professional entry program combining statistics and computer science in a single coordinated degree. Students are assigned to one of five background streams on admission (Foundation, Mixed, Statistics, Computer Science, or Data Science), which determines foundation requirements and available specialisations.

The program structure comprises 75 credit points of compulsory subjects, 100 credit points of specialisation, and a 25-point capstone or research project. Compulsory subjects span Statistical Modelling for Data Science (MAST90139), Multivariate Statistics (MAST90138), Computational Statistics & Data Science (MAST90083), Cluster and Cloud Computing (COMP90024), Advanced Database Systems (COMP90050), and Statistical Machine Learning (COMP90051).

Specialisations include Foundational Data Science, Statistical Data Science, Computational Data Science, and Computational and Statistical Data Science. The research pathway (MAST90108/MAST90109) requires a WAM of 80, a research proposal, and a supervisor — acting as an honours-equivalent filter.

### 2. AUTOMATION EXPOSURE PROFILE
Data science sits at the centre of the automation tension. Routine tasks — data cleaning, exploratory analysis, model fitting, report generation — are precisely the tasks that AI coding assistants and AutoML tools increasingly handle. The compulsory curriculum covers these techniques comprehensively.

The structural defence is the project. Whether capstone or research pathway, the 25-point project requires problem scoping, methodology selection, interpretation of results, and communication to stakeholders — all irreducible human work. The research pathway (WAM 80 threshold) adds independent research design and a supervised thesis.

The risk is in the middle: graduates who exit with coursework competence but without project-cultivated judgment enter a labour market where "can fit a model" is no longer a differentiator. The program's stream system partially mitigates this by allowing CS-background students to deepen into computational specialisation and stats-background students into statistical depth, but the default pathway for Foundation-stream students is the broadest and most substitutable profile.

### 3. MARKET EVIDENCE SNAPSHOT
| Job Family | Recent Hiring Signal | Discussion Theme | Curriculum Implication |
|---|---|---|---|
| Data Scientist (Generalist) | "Data Scientist" title splitting into specialist roles (ML Engineer +35%, Analytics Engineer +31%); causal inference appearing 3× more in senior ads | "Can fit a model" is now table stakes — differentiation requires causal reasoning and domain judgment | Statistical Machine Learning core is well-targeted; add explicit causal inference module |
| Data Engineer | ANZ data engineer postings exceed data scientist for first time (Seek Q1 2026) | Pipeline design and system architecture remain low-automation — infrastructure judgment is irreducible | Cluster/Cloud Computing and Advanced Database Systems directly address this demand |
| ML Engineer / MLOps | Fastest-growing tech title in APAC (LinkedIn 2026); model deployment, monitoring, CI/CD for ML | Infrastructure and reliability engineering resist AI substitution | Program doesn't explicitly cover MLOps — a gap for graduates targeting this high-growth pathway |
| Data Analyst / BI Analyst | BI Analyst postings down 14% YoY in ANZ; standard dashboards increasingly automated | Routine reporting is the most AI-compressed data role | Graduates should differentiate toward data science/engineering, not analytics |
| Decision Scientist | Emerging title; decision analysis + behavioural economics + executive communication | Decision framing and stakeholder judgment are irreducible human work | Project component partially addresses; stakeholder communication should be distributed across curriculum |

### 4. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 2 | Routine data tasks are highly automatable; the 25-point project and stakeholder-facing elements provide irreplaceable experience. Graduate destinations (data analyst/scientist) are mixed-exposure roles. |
| 2 | Systems Thinking and Problem Framing | 2 | Statistical Modelling and Multivariate Statistics teach problem framing. The project requires methodology design. However, these skills are concentrated in dedicated units rather than integrated throughout. |
| 3 | Technical and Quantitative Depth | 3 | Strong dual-core: statistical theory (MAST90138/MAST90139) + computational systems (COMP90024/COMP90050/COMP90051). Genuine depth in both statistics and computer science. |
| 4 | Decision-Making Under Uncertainty | 2 | The project (capstone or research) requires defended methodological choices. Statistical training builds probabilistic reasoning. Most coursework is technique-application rather than decision-ownership. |
| 5 | AI Literacy and Governance | 2 | Statistical Machine Learning (COMP90051) is a core subject. Cluster/Cloud Computing covers AI infrastructure. No dedicated AI ethics or governance unit visible. AI appears as a toolset, not a governed system. |
| 6 | Domain Depth and Specialisation | 3 | Clear domain: data science, with four named specialisation tracks. The stream system accommodates varying backgrounds while directing all students toward specialisation depth. |
| 7 | Research Methods Rigour | 2 | Research pathway (WAM 80, supervisor, thesis) provides genuine research training — but it is optional and only 25 points. Most students take the capstone. Statistical training provides methodological grounding regardless. |
| 8 | Human and Relational Capability | 2 | The project involves stakeholder interaction. Statistical communication is implicit in the quantitative curriculum. No dedicated ethics or professional communication unit. |
| 9 | Curriculum Currency and Adaptability | 3 | Last updated 9 June 2026 — the most recently updated program in this assessment cohort. ML, cloud computing, computational statistics reflect current practice. |
| 10 | Graduate Outcome Evidence | 3 | UoM Job Insights Report (LiveAlumni, exact match, n=96) publishes granular graduate destinations — role titles by career stage and named employers — closing the previously critical evidence gap. |
| B | Irreplaceability Premium (Bonus) | 2 | Statistics + CS dual-skill is valuable and not easily substituted. However, data science is a crowded credential market — differentiation requires project-cultivated judgment, not just technical competence. |

**TOTAL: 26 / 36**  
**Risk band: MODERATE RISK (20-27)**

### 5. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?  
  **UNCERTAIN** — routine data tasks (cleaning, model fitting, report drafting) are increasingly AI-producible. The 25-point project and stakeholder-facing elements resist substitution, but the balance depends heavily on whether the student took the capstone or research pathway and the nature of their specialisation.

- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?  
  **YES** (qualified) — the project requires methodological design and statistical training builds probabilistic decision-making. The research pathway adds independent research design. But these skills are concentrated in the project, not distributed across the curriculum.

- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?  
  **UNCERTAIN** — data science demand is growing but the field is also increasingly competitive and AI-compressed at the entry level. Graduates who exit with project-cultivated judgment and specialisation depth differentiate; those with coursework-only competence face a tightening market for routine analytics roles.


### 6. ANALOGUE GRADUATE PROFILE

The most exposed data science graduate is the **Junior Data Analyst of 2022**: using pandas and sklearn to clean datasets, train standard classification models, produce visualisations, and write summary reports — work being systematically absorbed by AI coding assistants, AutoML platforms, and business intelligence co-pilots.

Specific threats:
- **GitHub Copilot / Cursor** — generating data cleaning and analysis code from natural language descriptions, replacing junior data engineering work
- **Julius / ChatGPT Advanced Data Analysis** — running statistical analysis and producing visualisations from uploaded datasets
- **Power BI Copilot / Tableau AI** — automated dashboard generation and narrative insight extraction
- **AutoML platforms (Google AutoML, DataRobot, H2O.ai)** — automated model selection, hyperparameter tuning, and model evaluation

---

### 7. VERDICT
This program has strong bones — the statistics/CS dual-core is structurally sound and the stream/specialisation system accommodates diverse entry backgrounds while steering all students toward depth. The 9 June 2026 update date signals active curriculum maintenance.

The vulnerability is not the curriculum content but the graduate differentiation mechanism. In a market where "can fit a model" is table stakes and AI tools increasingly handle routine analytics, the project (25 points of 200) is doing a lot of heavy lifting as the primary locus of judgment cultivation. Strengthening the project component — or distributing decision-ownership and stakeholder-communication practice across more of the curriculum — would harden the program against the compression of routine data roles.

### 8. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| P1 | Publish granular graduate destination data by specialisation and stream | 10 | Medium |
| P1 | Add a dedicated AI ethics and governance unit to the compulsory core | 5 | Medium |
| P2 | Increase project weighting or add a second project-style assessment earlier in the program | 4, 7 | High |
| P2 | Distribute stakeholder communication and decision-defense practice across coursework units | 2, 8 | Medium |

### 9. THE REDESIGNED GRADUATE PROFILE

The 2027-ready data science graduate is not someone who fits models — they are someone who **defines what question the model is answering and what we learn when it is wrong**.

They have done causal inference properly: not correlation analysis dressed up as causal language, but a genuinely identified effect with a valid natural experiment or instrumental variable. They can defend their identification strategy to a statistician and explain its practical implications to a product manager. That combination is the rarest and most valuable capability in data science.

They have an AI governance layer: they know what training data their models were trained on, what distributional shift looks like in their specific domain, and what the monitoring pipeline should track. When a model starts producing anomalous outputs, they are the person who knows whether that is signal or noise and what to do about it.

They have communicated statistical conclusions to people who are not statisticians — under pressure, with genuine stakes. A product decision was made differently because of their analysis. That accountability — specific, traceable, consequential — is what distinguishes a professional data scientist from a model executor.

### 10. MARKET CONFIDENCE NOTE
- Confidence: **Medium**. Data science labour market signals are well-documented; the structural analysis of the project as a differentiation mechanism is curriculum-evidence-based.
- Job-family profiles integrate QILT GOS IT outcomes with WEF Future of Jobs 2025, LinkedIn Workforce Reports Q1 2026, Seek Q1 2026, and Kaggle/AI Index survey data.
- The uncertainty is in the graduate destination data gap — without published outcomes by specialisation, the program's actual differentiation effectiveness is unverified.

---

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-datasc  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Information Technology |
| Full-time employment (4-6mo) | 81.2% (GOS 2024) |
| Median starting salary | $110,000 |
| Employment (3yr) | 81.2% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 65% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |

---

<!-- LABOUR-EVIDENCE:START -->
### REAL GRADUATE DESTINATIONS (JSA HEO · QILT · Adzuna)

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
