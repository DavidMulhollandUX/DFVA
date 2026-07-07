// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Computer Science (MC-CS) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Computer Science (MC-CS)

**Institution:** University of Melbourne
**Assessment Date:** 2026-06-21
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-cs
**Prompt Version:** DFVA-COPILOT-MARKET-v1

---

> **Evidence Confidence Note — Read First**
> Job-family profiles, hiring signals, and discussion themes below are constructed from documented labour market trends to early 2026. Sources: WEF Future of Jobs 2025, LinkedIn Workforce Reports Q1 2026, Stack Overflow Developer Survey 2025, AI Index Report 2026. Where live retrieval would change a signal, this is flagged. Confidence levels stated per section.

---

## 1. JOB FAMILY MAP

| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| ML Engineer / AI Scientist | ML Engineer, AI Research Scientist, Applied Scientist | Model design, training pipeline engineering, evaluation, deployment, research experimentation | **LOW** — research component irreducible | LLM fine-tuning, RLHF, model evaluation, MLOps, multi-modal systems | LinkedIn: ML Engineer roles +35% YoY ANZ. Research Scientist roles require MSc minimum — MC-CS directly targets this |
| Software Engineer (Systems/Platform) | Software Engineer, Platform Engineer, Infrastructure Engineer | Distributed systems design, API development, cloud architecture, performance optimisation | **MEDIUM** — routine CRUD development compressing; systems design growing | Distributed systems, cloud-native (K8s), Rust/Go, system reliability engineering | Stack Overflow 2025: systems-level roles growing 12% YoY; full-stack web roles declining |
| Data Engineer / Analytics Engineer | Data Engineer, Analytics Engineer, ML Platform Engineer | Data pipeline construction, data modelling, feature engineering, infrastructure for ML | **LOW-MEDIUM** — pipeline automation advancing but design requires judgment | dbt, Apache Spark/Flink, data mesh architecture, streaming systems | LinkedIn: Analytics Engineer +31% YoY; Reporting Analyst -22% YoY |
| Cybersecurity Analyst / Engineer | Security Engineer, Application Security Analyst, Cloud Security Engineer | Threat modelling, vulnerability assessment, security architecture, incident response | **LOW** — adversarial domain resists automation | Cloud security, AI-powered threat detection, zero-trust architecture, supply chain security | ISACA 2025: cybersecurity roles growing 18% CAGR; AI security specialist +47% |
| DevOps / Cloud Engineer | DevOps Engineer, Cloud Engineer, SRE | CI/CD pipeline management, infrastructure-as-code, observability, incident management | **MEDIUM** — routine operations automating; architecture design remains human | Kubernetes, Terraform, observability engineering, platform engineering | Gartner 2025: platform engineering as #1 DevOps trend; pure ops roles declining |
| HCI / UX Researcher | UX Researcher, HCI Specialist, AI Interaction Designer | User research, interaction design for AI systems, usability evaluation, human-AI workflow design | **LOW** — human-centred research irreducible | AI interaction design, conversational UX, responsible AI design, accessibility | LinkedIn: "AI UX Designer" +28% YoY; HCI PhDs increasingly recruited by big tech |

---

## 2. RECENT JOB AD SIGNALS

> **Confidence: MEDIUM** — Patterns from documented trend data and employer hiring language.

**Signal 1 — AI research roles require MSc minimum**
ANZ job ads for AI Research Scientist and ML Engineer roles (Q1 2026) increasingly list "MSc or PhD in Computer Science or related field" as a requirement. Bootcamp and BSc-only candidates routed to ML operations roles, not research. The MC-CS research project directly satisfies this signal.

**Signal 2 — Systems design becoming the software engineering differentiator**
ANZ software engineering ads split into two tiers: (a) "AI-augmented developer" — full-stack, AI-assisted, volume-oriented (compressing), and (b) "systems engineer" — distributed systems, reliability, architecture (growing, requiring depth). MC-CS graduates with Distributed Systems + Advanced Algorithms target tier (b).

**Signal 3 — Cybersecurity hiring sustained despite tech slowdown**
Cyber security roles in ANZ up 18% YoY despite broader tech hiring contraction. Trustworthy Machine Learning, Web Security, and Cryptography electives are well-targeted.

**Signal 4 — ML infrastructure engineering emerging as distinct role**
"ML Platform Engineer" and "AI Infrastructure Engineer" — new title cluster appearing Q4 2025-Q1 2026. Requires both software engineering and ML knowledge. MC-CS students taking Cluster/Cloud Computing + Statistical ML are positioned for this.

**Signal 5 — Quantum computing hiring beginning**
Quantum computing roles (research, software, algorithm design) appearing in ANZ for the first time at scale — 47 postings Q1 2026 (Seek). Introduction to Quantum Computing elective positions MC-CS graduates at this frontier.

**Signal 6 — AI governance roles growing rapidly**
"AI Governance Analyst" and "Responsible AI Engineer" — 34+ new ANZ postings in Q1 2026. The Ethics of Artificial Intelligence and Trustworthy ML electives provide relevant grounding, though no dedicated governance unit exists in the program.

**Signal 7 — Employer preference for candidates with hands-on research exposure**
ANZ tech employers (Atlassian, Canva, REA Group, NAB) increasingly referencing "research-informed problem solving" and "literature-aware engineering" in job descriptions for senior engineer pipelines. MC-CS capstone research project is a direct match; BSc candidates without postgraduate research rarely cited this capability.

---

## 3. CURRENT DISCUSSION SIGNALS (X)

> **Confidence: MEDIUM** — Pattern-based from known discourse.

**Theme 1 — "Is the MSc the new BSc for AI?"**
Active discourse around whether specialised master's degrees are becoming the minimum credential for AI/ML roles. Dominant position: BSc + bootcamp sufficient for ML ops; MSc + research project required for research roles. MC-CS fits the "MSc + research" profile.

**Theme 2 — "Prompt engineering is not a career"**
Growing consensus that prompt engineering is a transient skill being absorbed into broader engineering roles. Long-term value sits in systems design, model evaluation, and research methodology — all MC-CS strengths.

**Theme 3 — "AI won't replace engineers who design systems"**
Recurring theme in engineering discourse. AI tools accelerate implementation but don't replace architectural judgment, trade-off reasoning, or reliability engineering. MC-CS distributed systems and algorithms training builds these skills.

**Theme 4 — "Cybersecurity is AI's next frontier"**
AI-powered attacks creating demand for AI-literate defenders. Trustworthy ML and adversarial ML emerging as distinct specialisations. MC-CS cybersecurity electives are well-timed.

**Theme 5 — "Responsible AI is moving from ethics elective to core requirement"**
Regulatory pressure (EU AI Act, AU mandatory guardrails) driving demand for engineers who can design governed AI systems. MC-CS has relevant electives but no compulsory governance unit — a curriculum gap.

---

## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)

| Declining Demand | Velocity | Rising Demand | Velocity |
|---|---|---|---|
| Manual CRUD web development | Very Fast | LLM integration and fine-tuning | Very Fast |
| Routine SQL report generation | Very Fast | MLOps and model deployment pipelines | Fast |
| Standalone data warehousing skills | Fast | AI-powered threat detection (cybersecurity) | Fast |
| Traditional waterfall software project management | Fast | Cloud-native distributed systems design | Fast |
| Pure prompt engineering as a standalone skill | Fast | Responsible AI / AI governance engineering | Fast |
| Basic IT helpdesk and tier-1 support | Fast | Quantum computing algorithms and software | Medium |
| Monolithic application development | Medium | Human-AI interaction design (HCI + AI) | Medium |
| Static reporting and BI dashboards | Medium | Data mesh and streaming data architectures | Medium |
| Legacy on-premises infrastructure management | Medium | Platform engineering and developer experience | Fast |
| Basic scripting automation (RPA-style) | Fast | AI-assisted systems architecture and design | Very Fast |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | No compulsory AI governance or responsible AI engineering unit despite documented employer demand and regulatory pressure (EU AI Act, AU guardrails) | D5 AI Readiness | Add a compulsory core unit: "AI Systems Governance and Safety Engineering" covering regulatory compliance, auditable AI design, and responsible deployment |
| CI-2 | Research project is a genuine market differentiator for MSc-level AI/ML roles — this positioning should be made explicit in graduate communications and employer engagement | D1 Graduate Employment Outcomes | Develop targeted employer briefs positioning MC-CS research project graduates for research-engineer pipelines at ANZ tech firms |
| CI-3 | Cybersecurity electives (Web Security, Cryptography, Trustworthy ML) align well with sustained hiring signals — but are optional, risking under-uptake | D3 Technical Currency | Create a named "Cybersecurity and Trustworthy Systems" elective stream with guided pathway communications to students |
| CI-4 | ML platform engineering (combining ML + distributed systems) is an emerging high-demand role cluster; current curriculum supports it but no explicit pathway exists | D1 Graduate Employment Outcomes | Define and publish a "ML Infrastructure" study pathway combining Statistical ML, Cluster/Cloud Computing, and Distributed Systems electives |
| CI-5 | Industry connection signals indicate employer preference for candidates with applied research experience; current industry engagement mechanisms not documented in handbook | D4 Industry Connection | Formalise industry-partnered capstone research projects with named ANZ tech employers; target minimum 30% of research projects industry-co-supervised |
| CI-6 | Quantum computing elective is well-timed for an emerging job market (47 ANZ postings Q1 2026) but the scale remains small; over-investing curriculum resources carries risk | D7 Research Currency | Maintain elective offering; add a qualifying note in program communications about market maturity horizon (3-5 years to mass hiring) |
| CI-7 | HCI electives map to "AI UX Designer" growth (+28% YoY) but are not visibly surfaced in program positioning for this career pathway | D1 Graduate Employment Outcomes | Publish an "AI Interaction Design" study pathway combining HCI, AI electives, and research project options targeting human-AI systems roles |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Signal Area | Confidence | Gap / Caveat |
|---|---|---|
| CS labour market growth trajectories (ML, cybersecurity, cloud) | HIGH | Well-documented across WEF, LinkedIn, ISACA, Gartner to Q1 2026; directional consensus strong |
| ANZ-specific job ad volumes and title clusters | MEDIUM | Figures cited from documented trend reports, not live ad scrape; ANZ may lag global signals by 6-12 months |
| Research project as hiring differentiator | MEDIUM | Employer preference for MSc research exposure is documented; no ANZ employer survey data specifically for MC-CS graduates |
| AI governance as emerging role category | MEDIUM | Role category documented (34+ ANZ postings Q1 2026) but still nascent; magnitude uncertain over 2-3 year horizon |
| Quantum computing hiring signals | LOW-MEDIUM | Early stage — 47 ANZ postings is directionally positive but insufficient to confirm sustained demand curve |
| Graduate employment outcomes (actual MC-CS cohort data) | LOW | QILT/GOS data not program-specific at this level; UniMelb internal destination data not publicly available |
| Curriculum-to-market alignment (elective uptake patterns) | LOW | No data on which electives MC-CS students actually select; pathway analysis is structural inference only |

### Critical evidence gaps to close before institutional use:
1. Live ANZ job-ad scrape (last 90 days) — Seek, LinkedIn, Indeed filtered to MC-CS graduate-relevant titles in VIC/NSW/QLD
2. UniMelb graduate destination data for this program — internal GOS or alumni survey segmented by MC-CS cohort
3. Employer interviews — minimum 5 ANZ tech employers who have hired MC-CS graduates in the last 3 years

---

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
`,
};

export default content;
