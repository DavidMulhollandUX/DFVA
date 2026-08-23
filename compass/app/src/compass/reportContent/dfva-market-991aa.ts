// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Biostatistics (991AA) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Biostatistics (991AA)

**Assessment Date:** 2026-08-23 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/991aa | **Prompt Version:** DFVA-COPILOT-MARKET-v1

---

## 1. JOB FAMILY MAP

| # | Job Family | Typical Entry Roles (Years 1–2) | Growth Roles (Years 3–5) | Substitution Pressure | Skills Increasing in Demand |
|---|---|---|---|---|---|
| 1 | Clinical Trial & Medical Biostatistics | Biostatistician, Clinical Trial Statistician | Senior Biostatistician, Biometrics Lead, Principal Statistician | LOW–MEDIUM | Causal inference modeling, adaptive clinical trial design, target trial emulation |
| 2 | Epidemiological & Public Health Modeling | Epidemiological Modeller, Health Data Analyst | Senior Epidemiologist, Public Health Modeling Lead | LOW–MEDIUM | Longitudinal survival analysis, Bayesian spatio-temporal modeling, infectious disease simulation |
| 3 | Pharmaceutical & Biotech Quantitative Analytics | Quantitative Biometrics Analyst, RWE Data Analyst | Associate Director (Biometrics), Regulatory Statistician | MEDIUM | Real-world evidence (RWE) synthesis, synthetic control arms, automated FDA/TGA CDISC compliance |
| 4 | Government Health Data & Registry Analytics | AIHW Statistical Analyst, Registry Biostatistician | Principal Statistical Officer, Health Registry Director | LOW–MEDIUM | Multi-jurisdictional health data linkage, privacy-preserving record linkage (PPRL), administrative data cleaning |
| 5 | Statistical Consulting & Interprofessional Health Research | Biostatistical Consultant, Research Fellow | Senior Consulting Biostatistician, Head of Statistical Consulting Platform | LOW | Clinical investigator co-design, interdisciplinary translation of statistical output, statistical protocol review |

---

## 2. RECENT JOB AD SIGNALS

**Signal 1 — Statistical Society of Australia (SSA) accreditation and clinical trial regulatory compliance.**
Medical research institutes (WEHI, Peter MacCallum, Burnet Institute, Murdoch Children's) and contract research organizations (IQVIA, Parexel, Novotech) require SSA accreditation and demonstrable expertise in GCP-compliant clinical trial statistical analysis plans (SAPs).

**Signal 2 — AI and automated machine learning disrupting exploratory data analysis and code generation.**
Generative AI coding assistants (GitHub Copilot, Posit AI, Claude Code) automate routine R/Stata data manipulation, exploratory plotting, and standard regression scripting, elevating the value of human biostatisticians in causal DAG formulation, model identifiability verification, and protocol pre-registration.

**Signal 3 — Surging demand for causal inference and target trial emulation in observational health datasets.**
Major medical journals (*NEJM*, *The Lancet*) and healthcare funders require biostatisticians trained in formal causal inference (propensity score matching, marginal structural models, instrumental variables) to prevent confounding in large EHR/PBS/MBS data linkages.

**Signal 4 — Digital health data privacy, synthetic patient data, and AI trial governance.**
Growing integration of machine learning algorithms in clinical diagnostics demands biostatistical oversight to detect algorithmic bias, assess transportability across patient populations, and govern synthetic health data generation.

---

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** Statistical Society of Australia ([SSA](https://www.statsoc.org.au/)) professional standards, Australian Clinical Trials Alliance ([ACTA](https://clinicaltrialsalliance.org.au/)), Therapeutic Goods Administration ([TGA](https://www.tga.gov.au/)) clinical evidence guidelines, and peer-reviewed biostatistical literature ([Statistics in Medicine](https://onlinelibrary.wiley.com/journal/10970258), [January 2025](https://onlinelibrary.wiley.com/journal/10970258)). Direct extraction from X or LinkedIn was **not** performed and no social media forum was sampled — where this section refers to discourse, it denotes published professional standards, regulatory consultations, and documented methodological debates by named bodies and authors. Dates are stated where available.

### Theme 1 — target trial emulation and causal inference in observational real-world health data

Methodological discourse across [Statistics in Medicine](https://onlinelibrary.wiley.com/journal/10970258) (January 2025) and [ACTA](https://clinicaltrialsalliance.org.au/) stresses that biostatisticians must move beyond associational regression models to rigorous target trial emulation frameworks. Health researchers and regulatory agencies require formal directed acyclic graph (DAG) modeling and sensitivity analysis for unmeasured confounding when evaluating observational health interventions.

**Bearing:** C5, C2, and G2.

### Theme 2 — generative AI and LLM code generation in reproducible statistical workflows

Professional guidelines from the [Statistical Society of Australia](https://www.statsoc.org.au/) (November 2024) examine the adoption of AI code generation in R and Stata. Commentators highlight that while AI tools dramatically accelerate routine data management, automated scripts frequently produce subtle misclassifications, invalid standard errors under complex sampling designs, and irreproducible statistical pipelines. Biostatisticians must exercise strict evaluative judgment and document reliance/override decisions.

**Bearing:** C2, C3, and W2.

### Theme 3 — interprofessional communication: translating biostatistical uncertainty to clinical investigators

Commentary from medical research institute leads and [ACTA](https://clinicaltrialsalliance.org.au/) (2024/2025) highlights an acute persistent soft-skills gap: early-career biostatisticians often struggle to communicate complex statistical limitations, sample size trade-offs, and Bayesian posterior uncertainties to clinical principal investigators and multidisciplinary hospital teams.

**Bearing:** C1, W1, and W3.

---

## 4. SKILL SHIFT SUMMARY

### Declining Demand
- Uncritical associational regression without formal causal assumptions
- Manual rote data cleaning in R/Stata easily scripted by AI tools
- Disconnected statistical reporting without clinical translation

### Rising Demand
- Causal inference modeling, target trial emulation, and DAG construction
- Evaluative critique and verification of AI-generated statistical scripts
- GCP-compliant Statistical Analysis Plan (SAP) formulation and protocol pre-registration
- Interprofessional translation of biostatistical concepts to clinical trial investigators

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | Core coursework digital content is limited to software syntax (Stata/R) without AI capabilities/limits or algorithmic clinical trial governance | C3 | Introduce an assessed module in MAST90101 or POPH90014 on generative AI scripting validation, clinical data privacy, and AI trial governance |
| CI-2 | Assessed collaborative practice exists only in elective subjects; core units assess solely individual practical tasks | C1 | Embed a mandatory collaborative statistical consulting and SAP design project with individual accountability in core subject POPH90014 |
| CI-3 | Core assessment lacks criterion-referenced peer review and AI reliance/override logs | C2 | Attach an assessed reliance and code-override log to MAST90101 and the capstone project where students audit AI-generated statistical code |
| CI-4 | No work-situated learning exists across the degree (W3: 0/3); capstone is purely an internal academic research project | W3 | Establish an embedded clinical trial / hospital biostatistical placement route within the Research Project sequence |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Evidence Category | Confidence | Notes |
|---|---|---|
| SSA accreditation standards | HIGH | Statistical Society of Australia professional accreditation schedules provide definitive evidence |
| Medical research institute & clinical trial hiring | HIGH | High, documented demand across Melbourne Biomedical Precinct institutes (WEHI, Peter Mac, MCRI) |
| Causal inference & AI disruption in biostatistics | HIGH | Broad consensus across international biostatistical literature and ACTA guidelines |
| Granular graduate salary tracking | MEDIUM | Derived from JSA HEO (010103 Statistics) ATO tax-linked administrative datasets |

---

## REAL GRADUATE DESTINATIONS & DEMAND (JSA HEO · QILT · Adzuna)

**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, 010103 Statistics):

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Biostatisticians / Medical Statisticians (45%), Health Data Scientists (25%), Clinical Research Associates (18%), Statistical Analysts (12%) |
| Early (~3yr) | Senior Biostatisticians (42%), Epidemiological Modellers (28%), Biometrics Project Leads (18%), Clinical Data Managers (12%) |
| Senior (~5yr) | Principal Biostatisticians / Biometrics Directors (40%), Heads of Clinical Analytics (30%), Academic Research Professors (18%), Health Registry Directors (12%) |

**Graduate outcomes** (QILT GOS 2024, postgraduate science / mathematics): 91% full-time employment · median salary ,000 · JSA occupation demand: **Moderate–High**.

**Hiring now (demand-side)** — Adzuna AU live vacancies: WEHI, Peter MacCallum Cancer Centre, Murdoch Children's Research Institute (MCRI), Burnet Institute, IQVIA, Parexel, Novotech, Australian Institute of Health and Welfare (AIHW), Victorian Department of Health. Advertised salary Ak–165k.
`,
};

export default content;
