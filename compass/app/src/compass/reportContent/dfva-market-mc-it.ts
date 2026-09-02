// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Information Technology (MC-IT) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Information Technology (MC-IT)

**Assessment Date:** 2026-08-24 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-it | **Prompt Version:** DFVA-COPILOT-MARKET-v1

---

## 1. JOB FAMILY MAP

| # | Job Family | Typical Entry Roles (Years 1–2) | Growth Roles (Years 3–5) | Substitution Pressure | Skills Increasing in Demand |
|---|---|---|---|---|---|
| 1 | Software Engineering & Cloud Systems Architecture | Software Engineer, Cloud Developer | Lead Architect, Principal Systems Engineer | VERY HIGH | AI-assisted code review audit, fault-tolerant distributed systems, multi-cloud orchestration |
| 2 | Machine Learning & AI Engineering | ML Engineer, Data Systems Specialist | Principal AI Engineer, Head of Machine Learning | HIGH | Foundation model fine-tuning, ML-Ops pipeline governance, algorithmic safety audit |
| 3 | Cyber Security & Threat Operations | Cyber Security Analyst, Penetration Tester | Lead Security Architect, Chief Information Security Officer (CISO) | MODERATE | Automated vulnerability triage, zero-trust architecture, AI-driven threat detection |
| 4 | Enterprise Solutions & Digital Systems Strategy | IT Consultant, Solutions Specialist | Enterprise Architect, Technology Strategy Director | HIGH | Enterprise legacy modernization, API ecosystem integration, technical debt management |

---

## 2. RECENT JOB AD SIGNALS

**Signal 1 — Massive industry adoption of AI coding assistants and autonomous developer agents.**
Technology enterprises (Atlassian, Canva, AWS, Google) and financial institutions (Macquarie, NAB, ANZ) mandate fluency with generative AI developer tools (GitHub Copilot, Cursor, CodeLlama), shifting developer responsibilities from boilerplate coding to high-level architecture, verification, and security auditing.

**Signal 2 — Surging demand for machine learning engineering and cloud-native infrastructure.**
Employers seek graduates capable of architecting scalable distributed systems, managing complex Kubernetes deployments, and deploying production machine learning pipelines over basic web development.

**Signal 3 — High automation exposure (92.91) across routine programming, unit test drafting, and boilerplate configuration.**
Standard coding syntax, automated unit test generation, database CRUD operations, and documentation drafting are heavily automated by LLMs, elevating the premium on deep debugging, distributed systems trade-offs, and security verification.

**Signal 4 — Tightening cybersecurity compliance and software supply chain security standards.**
The Australian Cyber Security Centre (ACSC), Essential Eight compliance mandates, and ISO 27001 standards require software engineers to verify software provenance, manage third-party dependencies, and conduct automated threat modeling.

---

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** Australian Computer Society ([ACS](https://www.acs.org.au/)), Association for Computing Machinery ([ACM](https://www.acm.org/)), IEEE Computer Society ([IEEE CS](https://www.computer.org/)), Australian Cyber Security Centre ([ACSC](https://www.cyber.gov.au/)), CSIRO's [Data61](https://www.data61.csiro.au/), and peer-reviewed software engineering research ([IEEE Software](https://doi.org/10.1109/MS.2024.3482101), 2024; [ACM Transactions on Software Engineering and Methodology](https://doi.org/10.1145/3696412), [January 2025](https://doi.org/10.1145/3696412)). Direct extraction from X or LinkedIn was **not** performed and no social media forum was sampled — where this section refers to discourse, it denotes published accreditation guidelines, technical reports, and peer-reviewed studies by named bodies and authors. Dates are stated where available.

### Theme 1 — generative AI code generation, architectural verification, and hallucinated vulnerabilities

Research from [IEEE CS](https://www.computer.org/) and peer-reviewed studies in [ACM Transactions on Software Engineering and Methodology](https://doi.org/10.1145/3696412) (January 2025) demonstrate that while LLMs accelerate code synthesis by 30–50%, they introduce subtle security vulnerabilities, hallucinated package dependencies, and architectural anti-patterns, necessitating rigorous evaluative code review and automated invariant testing.

**Bearing:** C2, C3, and W2.

### Theme 2 — human-AI collaborative software development and developer agency

Guidance from [ACS](https://www.acs.org.au/) (2024) and [IEEE Software](https://doi.org/10.1109/MS.2024.3482101) highlights that modern software development teams must coordinate work explicitly across human engineers and autonomous agents, structuring workflows where humans govern system contracts and agents execute bounded code refactoring.

**Bearing:** C1, W1, and G2.

### Theme 3 — cloud-native distributed systems, resilience, and sovereign cyber defense

Technical reports from [ACSC](https://www.cyber.gov.au/) and CSIRO [Data61](https://www.data61.csiro.au/) (2024) emphasize that building sovereign, resilient digital infrastructure requires deep mastery of distributed consensus, fault-tolerant network protocols, and end-to-end zero-trust architectures under adversarial conditions.

**Bearing:** G1, C5, and W2.

---

## 4. SKILL SHIFT SUMMARY

| Skill | Direction | Rationale |
|---|---|---|
| Evaluative code review, automated verification and LLM-output security audit | **↑↑ Rising sharply** | C2 and C3 each score 2/3 — assessment lacks structured override/hallucination-verification protocols and AI governance is not guaranteed across all specialisations. Theme 1 (§3) — IEEE CS and *ACM Transactions on Software Engineering and Methodology* (January 2025) — show LLMs accelerate code synthesis while introducing hallucinated dependencies and vulnerabilities, "necessitating rigorous evaluative code review." |
| Manual boilerplate CRUD code, standard syntax and routine unit-test writing | **↓↓ Falling sharply** | Named directly in the Declining Demand list. Signal 3 (§2) reports 92.91 automation exposure across routine programming, unit-test drafting and boilerplate configuration. |
| Human-AI collaborative engineering and agentic workflow orchestration | **↑ Rising** | C1 scores 2/3 — capstones lack a formal human-AI workflow allocation charter (CI-1). Theme 2 (§3) — ACS and *IEEE Software* — hold that teams must "coordinate work explicitly across human engineers and autonomous agents." |
| Distributed systems architecture, cloud-native resilience and zero-trust security | **↑↑ Rising sharply** | Theme 3 (§3) — ACSC and CSIRO Data61 (2024) — state sovereign, resilient infrastructure requires "deep mastery of distributed consensus... under adversarial conditions." Signal 4 (§2) ties this to Essential Eight and ISO 27001 compliance mandates. |
| Industry-embedded, externally assessed software delivery | **↑ Rising** | W1 scores 2/3 (capstones judged solely by academic instructors) and W3 scores 1/3 (internship optional, not universal). CI-4 and CI-5 call for external tech panels and live client briefs to close this gap. |
| Routine manual system administration and non-declarative configuration | **↓ Falling** | Named directly in the Declining Demand list. |
| AI safety governance and regulatory compliance for software licensing | **↑ Rising** | C3 scores 2/3 — "specialized AI governance and regulatory compliance are not guaranteed across all specialisations" (CI-3). Signal 4 (§2) documents ACSC compliance mandates driving this demand. |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | Collaborative software capstones lack formal human-AI workflow allocation charters (C1: 2/3) | C1 | Require teams in SWEN90016 to submit an assessed Human-AI Developer Charter specifying task divisions between engineers and AI code assistants |
| CI-2 | Code assessment lacks structured override and hallucination verification protocols (C2: 2/3) | C2 | Implement an assessed 'AI Code Reliance and Security Override Log' in SWEN90016/COMP90018 where students justify overrides of AI-generated code |
| CI-3 | Specialized AI governance and regulatory compliance are not guaranteed across all specialisations (C3: 2/3) | C3 | Embed an assessed module in core SWEN90016 examining AI safety governance, algorithmic accountability, and software licensing under generative AI |
| CI-4 | Software project capstones are assessed solely by academic instructors without external tech panels (W1: 2/3) | W1 | Mandate external industry panels comprising tech leads and software architects to evaluate final project demonstrations in SWEN90016 |
| CI-5 | Industry internship is optional rather than a universal requirement for the entire cohort (W3: 1/3) | W3 | Partner with technology enterprises to embed live client software briefs into core coursework across all specialisation tracks |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Evidence Category | Confidence | Notes |
|---|---|---|
| ACS professional accreditation standards | HIGH | Statutory national body defining professional IT educational and practice standards in Australia |
| ACSC and CSIRO Data61 technical and cybersecurity reports | HIGH | Leading national authorities on cyber defense and artificial intelligence architecture |
| Peer-reviewed software engineering literature (IEEE / TOSEM) | HIGH | Established empirical research on AI-assisted programming and distributed systems resilience |
| Program-specific graduate destination tracking | HIGH | Exact-name alumni destination record (n=384, 15 titles) tracking into software engineering and IT roles |

---

## REAL GRADUATE DESTINATIONS & DEMAND (Jobs and Skills Australia Higher Education Outcomes (JSA HEO) · QILT · Adzuna)

**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, 020101 Computer Science / Information Technology):

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Software Engineers (48%), Systems Analysts (26%), Cloud Developers (26%) |
| Early (~3yr) | Senior Software Engineers (42%), DevOps / Cloud Architects (33%), Machine Learning Engineers (25%) |
| Senior (~5yr) | Principal Software Architects (45%), Engineering Managers (35%), Chief Technology Officers (20%) |

**Graduate outcomes** (QILT GOS 2024, postgraduate computing/IT cut): 92.4% overall employment · median salary $110,000 · JSA occupation demand: **Very Strong** (Software and Applications Programmers, ICT Security Specialists).

**Hiring now (demand-side)** — Adzuna AU live vacancies: Atlassian, Canva, AWS, Google Australia, Commonwealth Bank, NAB, Macquarie Group, Telstra, Seek, REA Group. Advertised salary $115k–230k+.
`,
};

export default content;
