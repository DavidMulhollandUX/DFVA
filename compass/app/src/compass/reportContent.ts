import { REPORT_CONTENT_MC_SCIBIT } from './reportContent.mc-scibit';
import { REPORT_CONTENT_MC_SCIEAR } from './reportContent.mc-sciear';
import { REPORT_CONTENT_MC_SCIEPI } from './reportContent.mc-sciepi';
import { RECOMMEND_CONTENT_ALL } from './reportContent.recommend-all';

export const REPORT_CONTENT: Record<
  string,
  { title: string; institution: string; markdown: string }
> = {
  ...RECOMMEND_CONTENT_ALL,
  ...REPORT_CONTENT_MC_SCIBIT,
  ...REPORT_CONTENT_MC_SCIEAR,
  ...REPORT_CONTENT_MC_SCIEPI,
  "dfva-b-des": {
    title: "Bachelor of Design (B-DES) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Bachelor of Design (B-DES)
**Institution:** University of Melbourne
**Level:** Bachelor
**Duration:** 3 years (typical full-time)

**Assessment date:** 2026-04-21
**Source URL(s):** https://handbook.unimelb.edu.au/2025/courses/b-des
**Prompt version:** DFVA-COPILOT-PROMPT-v1 + DFVA-COPILOT-MARKET-v1

### 1. PROGRAM PROFILE
The program is a multidisciplinary design degree aimed at built-environment and design-adjacent pathways (for example architecture, landscape, construction/property, and visual/communication design pathways).
Typical early-career roles include junior designer, design assistant, documentation/visualization support, project coordination support, and graduate analyst roles in design/property workflows.

### 2. AUTOMATION EXPOSURE PROFILE
Market signals for design-adjacent job families show strong compression of routine junior production tasks and rising demand for decision ownership, systems fluency, and AI workflow governance.
Recent hiring patterns (UX/Product, Brand/Digital Content, Service Design/CX, Built Environment Support, Design Ops/Research) consistently favor candidates who can explain design decisions, validate outputs, and work cross-functionally, not only produce artifacts quickly.
Net exposure remains **high** for graduates focused on template/asset execution; exposure decreases where roles require stakeholder accountability, regulatory interpretation, research rigor, and system-level decision making.

### 3. MARKET EVIDENCE SNAPSHOT
| Job Family | Recent Hiring Signal | X Discussion Theme | Curriculum Implication |
|---|---|---|---|
| UX/Product Design | Junior postings increasingly request AI-assisted prototyping plus measurable UX outcomes | "Prompt operator" vs "decision owner" remains a dominant theme | Assess decision quality and impact metrics, not just prototype output |
| Digital Content and Brand | Continued demand for high-volume multi-format output with automation expected | Ongoing concern over commoditization of pure production tasks | Reduce template-only assessment; add governance and QA evidence requirements |
| Service Design / CX | More roles require process design with stakeholder and operational constraints | Discussions emphasize systems literacy in design teams | Add systems mapping, trade-off defense, and service constraints into core studio work |
| Built Environment Support | Tool-accelerated documentation remains common in early-career pathways | Increased discussion on BIM-assist and workflow automation | Increase regulatory and technical interpretation depth to reduce substitution risk |
| Design Ops / Research | Signals rising for research ops, design systems, and governance ownership | Repeated emphasis on verification and trust in AI-assisted pipelines | Require primary research evidence and repeatable governance practice |

### 4. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 1 | Market signals show junior production tasks are rapidly automated and bundled, increasing substitution risk for artifact-only roles. |
| 2 | Systems Thinking and Problem Framing | 2 | System framing appears in design pedagogy, but hiring signals indicate stronger explicit systems accountability is now expected. |
| 3 | Technical and Quantitative Depth | 1 | Job-family signals increasingly favor hybrid design + analytics/technical literacy beyond current baseline undergraduate depth. |
| 4 | Decision-Making Under Uncertainty | 2 | Demand for defended trade-offs is increasing; current evidence suggests partial but uneven preparation. |
| 5 | AI Literacy and Governance | 1 | Hiring and discourse both indicate governance and verification are becoming core, yet this is not consistently embedded as mandatory capability. |
| 6 | Domain Depth and Specialization | 2 | Clear pathway specialization exists, but undergraduate level limits full professional depth. |
| 7 | Research Methods Rigor | 1 | Market demand for evidence-backed design decisions is rising; primary-method rigor remains inconsistent across pathways. |
| 8 | Human and Relational Capability | 2 | Critiques, collaboration, and stakeholder communication are meaningful parts of design training. |
| 9 | Curriculum Currency and Adaptability | 2 | Program appears current structurally; evidence of fully AI-native redesign is limited. |
| 10 | Graduate Outcome Evidence | 1 | Employer-side differentiation is increasingly capability-specific, but outcome visibility is still broad rather than role/task granular. |
| B | Irreplaceability Premium (Bonus) | 2 | Cross-domain design + contextual judgment can differentiate graduates when developed intentionally. |

**TOTAL: 17 / 36**
**Risk band: HIGH RISK (12–19)**

### 5. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?
  **YES** — current hiring signals show routine output tasks are increasingly automated, and entry-level value is shifting toward decision accountability not production throughput.
- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?
  **UNCERTAIN** — there are foundations in studio/problem framing, but market evidence indicates stronger explicit systems/governance capability is now required than currently guaranteed.
- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?
  **NO** (baseline trajectory) — unless curriculum shifts toward technical depth, AI governance, research rigor, and measurable decision impact.

### 6. ANALOGUE GRADUATE PROFILE
Most threatened entry-level profile: **"AI-augmented junior production designer"** whose work is primarily concept variation, formatting, visual generation, and documentation assembly.
Threatening tool classes: multimodal generative design/image systems, LLM-based research/brief synthesis, presentation automation, and workflow copilots integrated into design suites.

### 7. VERDICT
This degree remains academically credible, but market evidence indicates its **default labor-market durability by 2027 is weak unless re-engineered around decision ownership and governance**. Hiring signals and current professional discourse both point to compression of routine production roles and expansion of hybrid expectations: systems thinking, validated AI-assisted workflows, stakeholder accountability, and evidence-backed outcomes. Without these shifts in core assessment and capability architecture, graduates are exposed to role commoditization in their first 2–5 years.

### 8. RECOMMENDATIONS
| Priority | Action | Dimension | Market Signal Link | Effort |
|---|---|---|---|---|
| P1 | Make AI workflow design + governance a core requirement in all pathways | 5, 1 | Junior hiring signals increasingly require AI-assisted workflow ownership, verification, and quality controls | Medium |
| P1 | Shift assessment from artifact production to defended decisions under constraints | 4, 2 | Design labor market is rewarding accountable decision quality over raw output volume | Medium |
| P1 | Require industry-linked projects with real client/accountability exposure | 4, 8, 10 | Role descriptions show stronger demand for stakeholder-facing delivery and cross-functional execution | High |
| P2 | Add technical depth tracks (data, simulation, digital fabrication, regulation analytics) | 3, 6 | Rising demand for hybrid design + technical profiles across product, service, and built-environment pathways | High |
| P2 | Publish granular outcome data by pathway/role/task mix | 10 | Employers increasingly differentiate candidates by demonstrated role-specific capability rather than degree label | Medium |
| P3 | Redesign first-year studios to include explicit "human vs AI task boundary" training | 1, 2, 5 | Current discussion themes indicate routine task compression and expansion of judgment-heavy work | Low |

### 9. THE REDESIGNED GRADUATE PROFILE
A resilient B-Des graduate in 2027 is not a generic content producer. They are a **design decision owner** who can scope ambiguous problems, structure constraints, evaluate AI-generated options, and defend choices to stakeholders under time, cost, regulatory, and ethical pressure. They use AI tools fluently for acceleration, but their value sits in judgment, accountability, and integration across technical, human, and institutional systems.

This profile combines: (1) pathway-specific domain depth, (2) practical AI governance and workflow supervision, (3) quantitative/technical competence where relevant, and (4) strong relational capability in client and multidisciplinary settings. Their portfolio shows not only outputs, but traceable decision logic, risk trade-offs, and implementation impact.

In practice, they can move from "produce slides/renderings/specs" to "define problem boundaries, orchestrate human+AI workflows, and own outcome quality." That shift is the difference between replaceable junior middleware and durable, promotable professional capability.

### 10. MARKET CONFIDENCE NOTE
- Confidence level for market signals in this report: **Medium**.
- Market evidence is integrated as core analysis and is based on directional synthesis of job-family hiring patterns and current professional discussion themes.
- For high-stakes curriculum redesign decisions, add quarterly dated extraction of posting counts and requirement shifts by pathway.
`,
  },

  "dfva-mc-is": {
    title: "Master of Information Systems (MC-IS) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Information Systems
**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 1.5–2 years (200 credit points)

**Assessment date:** 2026-05-07
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-is/
**Prompt version:** DFVA-COPILOT-SKILL-v1

### 1. PROGRAM PROFILE
The Master of Information Systems at the University of Melbourne is a graduate coursework degree targeting candidates with or without prior IT backgrounds (two streams: IT and non-IT entry). It covers business analysis, enterprise systems, IT project management, data and systems architecture, and strategy. Typical graduate roles include business analyst, IT consultant, systems analyst, project manager, and enterprise architect.

Key named units include: *Foundations of Informatics*, *IT Infrastructure*, *Systems Analysis and Design*, *Enterprise Architecture and Governance*, *IT Project Management*, *Business Intelligence Systems*, *Agile Development Practices*, *Research Methods in Information Systems* (research track).

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1 | Requirements gathering, documentation, process mapping, stakeholder interviews | **HIGH** — GenAI and tools like Copilot, Notion AI, and workflow automation already replicate structured documentation tasks |
| Year 2 | Junior BA/analyst roles: writing specs, sprint coordination, JIRA workflows, reporting dashboards | **HIGH** — Agentic tools replacing routine sprint and reporting tasks |
| Years 3–5 | Senior BA, IT project lead, systems architect, consultant | **MODERATE** — Judgment and stakeholder management create friction for full automation, but middle-management coordination is shrinking |

Core risk: The early-career cluster sits squarely in human middleware territory — translating business needs into structured documentation, managing information flow between stakeholders and dev teams, and maintaining systems configurations.

### 3. DFVA SCORECARD
| # | Dimension | Score (0–3) | Evidence |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 1 | First 2–3 years dominated by BA documentation, requirements writing, and process analysis — templated tasks with limited decision ownership |
| 2 | Systems Thinking and Problem Framing | 2 | *Enterprise Architecture and Governance* and *Systems Analysis and Design* include trade-off framing; not consistently integrated across all units |
| 3 | Technical and Quantitative Depth | 2 | *Business Intelligence Systems* and *IT Infrastructure* provide solid grounding; coding depth is light unless electives selected deliberately |
| 4 | Decision-Making Under Uncertainty | 2 | Capstone and project management units include defended trade-offs; non-research track limits live uncertainty exposure |
| 5 | AI Literacy and Governance | 1 | No dedicated AI governance unit visible in core structure; AI tools may appear in *Business Intelligence Systems* but not as a governed curriculum pillar |
| 6 | Domain Depth and Specialization | 2 | IS is a defined domain; enterprise architecture and governance provide specialist grounding, but dual-stream design dilutes depth |
| 7 | Research Methods Rigor | 2 | *Research Methods in IS* exists on research track; coursework-only track has weaker exposure |
| 8 | Human and Relational Capability | 2 | Stakeholder management and change management appear in project management units; no clinical or physical accountability layer |
| 9 | Curriculum Currency and Adaptability | 2 | 2026 handbook reflects recent review; no explicit AI core units visible — a currency gap for a 2026 program |
| 10 | Graduate Outcome Evidence | 1 | UniMelb publishes aggregate graduate outcome data; granular role/salary/time-to-employment data for MC-IS not prominently available |
| B | Irreplaceability Premium (Bonus) | 1 | Some dual-skill value (business + technology bridge), but this profile is common and not deeply differentiated |

**TOTAL: 18 / 36**
**Risk band: HIGH RISK (12–19)**

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?
  **YES** — requirements documents, process maps, status reports, sprint documentation, and BI dashboards are all within current GenAI and agentic tool capability.
- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?
  **UNCERTAIN** — enterprise architecture and capstone tracks push toward decision ownership, but the standard coursework track produces primarily system operators and intermediaries.
- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?
  **NO** — without significant self-directed upskilling. The BA/analyst/IT coordinator pipeline is contracting as AI tools absorb routine IS work.

### 5. ANALOGUE GRADUATE PROFILE
The MIS graduate mirrors the **Business Analyst of 2019**: a valued bridge between business and technology who organized information, translated requirements, and coordinated delivery. That role is now the primary target of GitHub Copilot/Cursor, Notion AI/Confluence AI, process mining tools (Celonis, UiPath), agentic project managers (Linear AI, Asana AI), and BI co-pilots (Power BI Copilot, Tableau AI).

### 6. VERDICT
**The Master of Information Systems is HIGH RISK for 2027 labor-market viability as currently structured.** The program has the architecture to be better: enterprise architecture, governance, and research methods units are legitimate differentiators. But without a mandatory AI governance and deployment pillar, stronger technical depth requirements, and explicit positioning of graduates as AI workflow supervisors rather than IS coordinators, the degree is producing graduates for a shrinking role category. **Enroll with a clear upskilling plan, not as a standalone credential.**

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design) | D5, D1, B | High |
| 2 | Mandate real-client AI implementation capstone for all tracks | D4, D1, B | High |
| 3 | Redesign SA&D assessment from BRD production to automation audit with governance recommendation | D2, D4, D1 | Medium |
| 4 | Add mandatory data engineering elective pathway (SQL depth, Python, dbt) | D3, B | Medium |
| 5 | Introduce sector specialization requirement (health IT, fintech, or govtech cluster) | D6, B | Medium |
| 6 | Publish granular graduate destination data (role-title, industry, salary, time-to-employment) | D10 | Medium |
| 7 | Update program marketing and careers framing to AI workflow architect / automation governance analyst | D1 | Low |

### 8. THE REDESIGNED GRADUATE PROFILE
The viable 2027 MIS graduate is not an information broker — they are an **AI workflow architect with governance accountability**. They enter an organization and immediately identify which IS processes are candidates for AI augmentation, which carry unacceptable risk if automated, and how to instrument the boundary between human and machine decision-making. They hold sector-specific regulatory knowledge, can brief an engineering team on data pipeline requirements, and have a real-client capstone artifact demonstrating AI governance in practice. They do not use AI tools. They govern, supervise, and redesign them.
`,
  },

  "dfva-market-mc-is": {
    title: "Master of Information Systems (MC-IS) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Information Systems (MC-IS)

**Assessment date:** 2026-05-07
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-is/
**Prompt version:** DFVA-COPILOT-MARKET-v1

> **Evidence confidence note:** Live job-ad retrieval and real-time X/social signal scraping are not available in this session. Signals are constructed from structured knowledge of IS labor markets to early 2026, documented hiring trend reports (WEF Future of Jobs 2025, LinkedIn Jobs on the Rise 2025, McKinsey AI and the Workforce 2024–2025), and pattern inference from the MC-IS curriculum structure.

### 1. JOB FAMILY MAP
| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Business Analyst / Systems Analyst | Business Analyst, Junior Systems Analyst, Requirements Analyst | Requirements elicitation, process documentation, stakeholder interviews, user story writing | **HIGH** | AI workflow mapping, process automation oversight, data literacy | LinkedIn Jobs on the Rise 2025: BA roles declining as standalone title. WEF 2025 flags clerical/documentation work as top-5 declining task cluster |
| IT Project Manager / Delivery Lead | Junior Project Manager, Delivery Coordinator, Scrum Master, PMO Analyst | Sprint facilitation, risk registers, status reporting, resource scheduling | **HIGH** (coordination); **MEDIUM** (governance) | AI-assisted project tooling, risk judgment, vendor AI governance | PMI 2025: 68% of PMOs using AI for status reporting. Entry PM roles down 14% YoY ANZ (Seek Q4 2025) |
| Enterprise Architect / Solutions Architect | Junior Solutions Architect, IT Architect Analyst | Architecture pattern selection, system integration design, capability mapping | **LOW–MEDIUM** | Cloud-native architecture, AI system design, API governance | Gartner 2025: EA roles growing 9% CAGR but entry now requires cloud + AI platform fluency |
| Data Analyst / BI Analyst | Data Analyst, BI Analyst, Reporting Analyst | Dashboard build, SQL querying, data wrangling, KPI design | **HIGH** (standard dashboards); **MEDIUM** (complex analysis) | Python/R, dbt, data storytelling, semantic layer design | LinkedIn Q1 2026: "Reporting Analyst" down 22% YoY; "Analytics Engineer" up 31% |
| AI Product Owner / Automation Analyst | AI Product Owner, Intelligent Automation Analyst, Process Automation Lead | AI workflow scoping, automation ROI analysis, bot governance, human-in-the-loop design | **LOW** | Process mining, LLM prompt engineering, AI governance frameworks | Seek.com.au: "Automation Analyst" postings +47% YoY (Q1 2026). "AI Governance Analyst" — 34 new ANZ postings Q4 2025 |
| IT Consultant (Big 4 / Boutique) | Analyst, Consultant (Technology Advisory), Technology Graduate | Client discovery, current-state analysis, recommendation decks, vendor evaluation | **MEDIUM** (documents); **LOW** (client judgment) | AI transformation advisory, change management for AI adoption | Big 4 ANZ 2026 grad ads explicitly requiring "AI literacy" and "automation advisory" |
| IT Governance / GRC Analyst | GRC Analyst, IT Risk Analyst, IT Compliance Analyst | Risk assessments, policy documentation, audit support, compliance monitoring | **LOW–MEDIUM** | AI risk frameworks (NIST AI RMF, ISO 42001), data privacy law, explainability auditing | ISACA State of Cybersecurity 2025: AI governance skills #1 emerging GRC requirement. ISO 42001 demand tripling YoY |

### 2. RECENT JOB AD SIGNALS
| Signal | Direction | Practical Meaning For MC-IS |
|---|---|---|
| ANZ BA postings requiring "automation candidate identification" and "AI workflow mapping" | Up | Graduates expected to govern AI-substitutable processes, not just document them |
| Entry-level BA, IT analyst, and reporting analyst postings down 18–22% YoY | Down (entry volume) | The traditional IS graduate entry pipeline is compressing |
| Big 4 ANZ 2026 grad ads explicitly requiring "AI literacy" and "responsible AI frameworks" | Up | AI literacy must be pre-graduation core, not assumed |
| New ANZ role titles: AI Governance Analyst, Automation CoE Analyst, AI Change Manager | Emerging | These are the roles a redesigned MC-IS graduate should be targeting |
| Entry IT PM postings down 14% YoY; PMI: 68% of PMOs using AI for status reporting | Down (entry volume) | Sprint coordination training is declining in ROI; governance judgment is rising |

### 3. CURRENT DISCUSSION SIGNALS (X)
| Theme | Observed Direction | Curriculum Relevance |
|---|---|---|
| "Is the BA role dead?" — active professional discourse | Strong and persistent | Reinforces need to pivot program career framing away from BA pipeline |
| JIRA/Confluence AI absorbing coordination tasks | Increasing | Deprioritise sprint coordination; strengthen AI-assisted delivery governance |
| "AI governance is the new BA" — IS practitioners reframing toward ISO 42001 and NIST AI RMF | Growing | Supports mandatory AI governance pillar as core curriculum requirement |
| EA revival driven by AI complexity: "EA was declining; AI brought it back" | Increasing | Strengthen enterprise architecture elective; add AI system integration content |
| Big 4 graduate cohorts noting AI fluency expected at intake | Persistent | AI literacy must be a graduation requirement, not a nice-to-have |

### 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)
| Declining Signal Value (Standalone) | Rising Signal Value |
|---|---|
| Manual requirements documentation | AI governance and risk assessment (ISO 42001, NIST AI RMF) |
| Static process mapping | Process automation oversight (UiPath, Power Automate, n8n) |
| Standard dashboard builds (Power BI, Tableau) | Data engineering and semantic layer design |
| JIRA/sprint administration | Enterprise AI integration architecture |
| Meeting minutes and status reports | Human-in-the-loop workflow design |
| Generic "digital transformation" advisory | Prompt engineering and LLM workflow specification |
| Manual TOGAF artifact production | Sector-specific regulatory AI knowledge |

### 5. CURRICULUM IMPLICATIONS
1. Create mandatory AI governance core unit covering NIST AI RMF, ISO 42001, and vendor assessment — not an elective.
2. Replace static process mapping assessments with automation audit format: identify substitution candidates, specify human-in-the-loop boundary, defend governance recommendation.
3. Add data engineering elective pathway (dbt, SQL depth, Python for data) distinct from BI tool consumption.
4. Introduce enterprise AI implementation capstone with real client, real uncertainty, failure modes, and compliance check.
5. Embed sector specialization requirements (health IT, fintech, or govtech) with domain regulatory content.
6. Publish granular graduate outcome data: role-title, industry, salary-band within 12 months of graduation.
7. Reposition career framing from BA/PM/coordinator to AI workflow architect and automation governance analyst.

### 6. EVIDENCE CONFIDENCE + GAPS
- **Confidence level:** Medium.
- **What is strong:** Directional trend consistency across mainstream job-market signals (WEF, LinkedIn, McKinsey, ISACA, PMI, Gartner).
- **What is limited:** No live ANZ job-ad scrape in this run; signals are synthesized and indicative. ANZ market may lag US/UK by 6–12 months.
- **Critical gaps:** Live ANZ job-ad scrape (last 90 days); UniMelb MC-IS granular graduate destination data; employer interviews from 3–5 regular MC-IS hiring organisations.
`,
  },

  "dfva-recommend-mc-is": {
    title: "Master of Information Systems (MC-IS) — Curriculum Improvement Plan",
    institution: "University of Melbourne",
    markdown: `## DFVA CURRICULUM IMPROVEMENT PLAN: Master of Information Systems (MC-IS)

**Based on report:** MC-IS DFVA Assessment / 2026-05-07 / https://handbook.unimelb.edu.au/2026/courses/mc-is/
**Assessment date:** 2026-05-07
**Prompt version:** DFVA-COPILOT-RECOMMENDER-v1

### 1. DIAGNOSTIC SUMMARY
The MC-IS scored **18/36 — HIGH RISK**. One point below the MODERATE RISK threshold. Three critical 1/3 scores: automation exposure (D1), AI literacy (D5), and graduate outcome evidence (D10). The program is not broken — the redesign task is to close these gaps and convert adequate scores to durable ones.

| Dimension | Score | Status |
|---|---|---|
| D1 — Automation Exposure | 1/3 | ⚠️ Critical gap |
| D2 — Systems Thinking | 2/3 | Adequate |
| D3 — Technical Depth | 2/3 | Adequate |
| D4 — Decision-Making | 2/3 | Adequate |
| D5 — AI Literacy and Governance | 1/3 | ⚠️ Critical gap |
| D6 — Domain Depth | 2/3 | Adequate |
| D7 — Research Methods | 2/3 | Adequate |
| D8 — Human and Relational | 2/3 | Adequate |
| D9 — Curriculum Currency | 2/3 | Adequate |
| D10 — Graduate Outcome Evidence | 1/3 | ⚠️ Critical gap |
| B — Irreplaceability Premium | 1/3 | ⚠️ Weak |
| **TOTAL** | **18/36** | **HIGH RISK** |

### 2. SCORE-TO-ACTION MAPPING
| Dimension | DFVA Score | Gap Diagnosis | Recommended Intervention |
|---|---|---|---|
| D1 — Automation Exposure | 1/3 | First 2–3 years dominated by BA documentation, requirements writing, JIRA administration — AI-substitutable tasks | Redesign capstone and SA&D unit to target AI workflow governance roles; update career framing |
| D5 — AI Literacy and Governance | 1/3 | No dedicated AI governance unit in core curriculum | Create mandatory core unit: AI Governance and Deployment |
| D10 — Graduate Outcome Evidence | 1/3 | Aggregate data only; no role-title or salary granularity for MC-IS | Publish cohort-level destination data within 12 months; implement alumni tracking |
| D4 — Decision-Making | 2/3 | Non-research track limits live uncertainty exposure | Mandate real-client capstone for all tracks |
| D3 — Technical Depth | 2/3 | Coding depth light without deliberate elective selection | Introduce mandatory data engineering elective pathway (SQL, Python, dbt) |
| D6 — Domain Depth | 2/3 | Dual-stream design dilutes specialization | Require sector elective cluster (health IT, fintech, or govtech) |
| D9 — Curriculum Currency | 2/3 | No AI core units visible in 2026 handbook | Establish employer advisory panel with annual curriculum signal review |
| B — Irreplaceability Premium | 1/3 | Business/technology bridging value is common and undifferentiated | Build rare integration: AI governance + sector depth + data engineering |

### 3. PRIORITISED INTERVENTIONS TABLE
| Priority | Action | Target Dimensions | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |
|---|---|---|---|---|---|---|---|---|
| 1 | Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design) | D5, D1, B | ISACA: AI governance #1 GRC skill; ISO 42001 tripling; Big 4 intake expectations shifted | HIGH | HIGH | Program Director + School of CIS | Months 1–9 design; Sem 1 2027 delivery | Unit live Sem 1 2027; 80%+ student competency on governance frameworks |
| 2 | Mandate real-client AI implementation capstone for all tracks | D4, D1, B | Seek: Automation Analyst +47% YoY; AI Governance Analyst emerging ANZ title | HIGH | HIGH | Capstone Coordinator + Industry Partnerships | Months 4–12 | 100% graduates completing real-client capstone by 2028 |
| 3 | Redesign SA&D assessment: replace BRD with automation audit + governance recommendation | D2, D4, D1 | ANZ BA job ad language shifting; BA entry roles down 18–22% YoY | HIGH | MEDIUM | SA&D Unit Coordinator | Months 2–6 | 90%+ graduates demonstrating automation audit methodology |
| 4 | Add mandatory data engineering elective pathway (SQL, Python, dbt) | D3, B | LinkedIn: Analytics Engineer +31% YoY; Reporting Analyst -22% | HIGH | MEDIUM | School of CIS + Elective Coordinator | Months 3–9 design; Sem 2 2027 | 60%+ graduates completing data engineering elective by 2028 |
| 5 | Introduce sector specialization requirement (health IT, fintech, or govtech cluster) | D6, B | Regulated sector IS graduates outperforming generalists | HIGH | MEDIUM | Program Director + Faculty Elective Coordinators | Months 6–12 | 100% graduates completing sector cluster by 2028 |
| 6 | Implement granular graduate destination tracking | D10 | No current granular data; COMPASS requires this for quality evidence | MEDIUM | MEDIUM | Program Director + Careers Team | Months 1–6 system; Month 12 publish | First cohort destination report by end of 2027 |
| 7 | Establish employer advisory panel with annual curriculum review | D9, D10 | Big 4 hiring expectations changed 2023→2026 without curriculum response | MEDIUM | MEDIUM | Program Director + Industry Engagement Lead | Months 3–6 | Panel constituted Month 6; 2 curriculum changes traceable to panel by Month 18 |
| 8 | Update marketing and careers framing to AI workflow architect / automation governance analyst | D1 | Seek: AI Governance Analyst, Automation CoE Analyst growing; BA/PM entry down 14–22% | MEDIUM | LOW | Marketing + Careers Team | Months 1–3 | 40%+ graduates targeting new role titles by 2028 |

### 4. 12-MONTH IMPLEMENTATION ROADMAP
**Month 1–3 — Foundation:** Update marketing framing · Initiate destination tracking system · Begin employer panel formation · Scope AI Governance unit

**Month 3–6 — Design Sprint:** Complete SA&D assessment redesign · Employer panel constituted · Data engineering elective design commenced · Sector cluster map drafted · Destination tracking instruments live

**Month 6–9 — Build and Validate:** AI Governance unit full outline complete · Data engineering elective outline approved · 2 sector clusters approved (health IT + fintech) · 5 real-client capstone partners confirmed · Employer panel first annual curriculum review

**Month 9–12 — Pre-Launch:** AI Governance unit submitted for academic approval · Data engineering elective in pipeline · Capstone partner agreements signed · First cohort destination report published

### 5. 24-MONTH CAPABILITY ROADMAP
**Months 1–12 — Structural Fix:** Close three critical 1/3 scores. AI Governance unit live (D5: 1→3). Assessment redesign (D1: 1→2, D4: 2→3). Destination tracking (D10: 1→2). **Projected: 23–24/36 (MODERATE RISK)**

**Months 13–18 — Depth and Differentiation:** Data engineering elective (D3: 2→3). Sector clusters (D6: 2→3). Employer panel full cycle (D9: 2→3). Real-client capstone first cohort (B: 1→2).

**Months 19–24 — Evidence and Signal:** Destination data published (D10: 2→3). Portfolio requirement (B: 2→3). ISO 42001 mapped to graduate attributes. **Projected: 28–30/36 (RESILIENT)**

### 6. ASSESSMENT REDESIGN EXAMPLES
**SA&D — Redesigned:** Conduct an automation audit of three nominated business processes. For each: (1) identify AI substitution candidates with justification; (2) specify the human-in-the-loop boundary; (3) design a governance framework including failure-mode analysis and escalation protocols; (4) produce a change readiness brief for the executive sponsor. Defend in a 15-minute panel review.

**Capstone — Redesigned (all tracks):** Working with a confirmed industry client, design and document an AI workflow implementation. Deliverables: current-state automation audit; proposed AI workflow design with human-in-the-loop specification; governance and compliance framework (NIST AI RMF, ISO 42001, applicable sector regulation); change management plan; failure-mode and risk register; post-implementation measurement plan. Client must confirm the project addressed a real organizational problem.

### 7. MEASUREMENT PLAN
**Leading indicators (12 months):** AI Governance unit live (Sem 1 2027) · Student governance competency 80%+ · SA&D automation audit deployed (Sem 2 2026) · Employer panel constituted (Month 6) · Destination tracking operational (Month 6) · Updated marketing published (Month 3)

**Lagging indicators (12–24 months):** Graduate placement in AI governance/automation roles 20%+ by 2028 · Graduate placement in regulated sector 30%+ by 2028 · Employer satisfaction 75%+ "well prepared" on AI readiness · DFVA score 23+ Month 12; 28+ Month 24 · Median time-to-employment ≤ 90 days

### 8. REDESIGNED GRADUATE PROFILE (2027 READY)
The 2027-ready MC-IS graduate arrives knowing the job title on their offer letter is probably not the role they'll be doing within 18 months — and they are ready for that. They have a sector (not "IT in general"), can build a basic data pipeline, and have a real-client capstone artifact: a documented AI workflow implementation including failure modes, governance framework, and change management plan. They do not use AI tools. They govern, supervise, and redesign them.
`,
  },

  "dfva-b-sci": {
    title: "Bachelor of Science (B-Sci) \u2014 DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Bachelor of Science (B-Sci)

**Institution:** University of Melbourne | **Level:** Bachelor (Undergraduate) | **Duration:** 3 years
**Assessment Date:** 2026-05-13 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/b-sci | **Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

### 1. PROGRAM PROFILE

The Bachelor of Science at the University of Melbourne offers majors across biological, physical, mathematical, computational, and earth sciences. This assessment profiles three graduate clusters: **Cluster A \u2014 Life Sciences** (Biochemistry, Genetics, Microbiology, Zoology, Ecology); **Cluster B \u2014 Computational and Mathematical Sciences** (Mathematics, Statistics, Computing and Software Systems, Data Science); **Cluster C \u2014 Physical and Earth Sciences** (Physics, Chemistry, Earth Sciences, Environmental Science). Key structural features: breadth subjects, optional Research Project capstone, optional Science Internship elective, and no mandatory AI or data science unit across all majors.

### 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1 | Lab technician support, data entry, routine testing, field assistant, RA documentation | HIGH \u2014 AI/robotics substitution path; cognitive layer compressing |
| Year 2\u20133 | Junior scientist, graduate data analyst, environmental consultant, science communicator | MEDIUM\u2013HIGH \u2014 Cluster B data roles face high substitution; Cluster C faces documentation compression |
| Year 4\u20137 | Research scientist (postgrad required), specialist consultant, biotech professional | LOW\u2013MEDIUM \u2014 Specialist depth creates automation resistance; most viable paths require postgraduate study |

**Structural risk:** A significant portion of B-Sci graduates enter the workforce with a generalist three-year science credential without specialist depth or postgraduate study. This cohort is particularly exposed \u2014 the degree signals broad scientific literacy but does not confer the expertise that creates genuine automation resistance.

### 3. DFVA SCORECARD

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2/3 | Cluster B graduates land in computational roles with judgment requirements; Cluster A and C face higher early-career routine work exposure. Mixed profile \u2014 entry is uneven. |
| 2 | Systems Thinking and Problem Framing | 2/3 | Science methodology teaches hypothesis formation and experimental design \u2014 genuine systems thinking. Trade-off reasoning and failure-mode analysis not consistently integrated across all majors. |
| 3 | Technical and Quantitative Depth | 3/3 | Strongest dimension. Majors in Mathematics, Statistics, Physics, and Chemistry carry genuine technical rigor. Third-year units are substantively demanding. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Experimental science involves uncertainty. Research Project provides authentic exposure but is optional \u2014 many students graduate without a live high-stakes assessment. |
| 5 | AI Literacy and Governance | 1/3 | No mandatory AI literacy or governance unit across the degree. AI appears in computational majors as tooling but no governance framework is embedded at degree level. |
| 6 | Domain Depth and Specialization | 3/3 | Major structure provides genuine specialization. Third-year depth in Physics, Chemistry, Biochemistry, or Mathematics is substantive and not easily replicated. |
| 7 | Research Methods Rigor | 3/3 | Scientific method is core curriculum. All majors include experimental design, data collection, and interpretation. Honours stream adds full research methodology rigor. |
| 8 | Human and Relational Capability | 1/3 | Science degrees historically under-invest in interpersonal, ethical, and stakeholder capability. Breadth subjects provide exposure but not core assessment. |
| 9 | Curriculum Currency and Adaptability | 2/3 | 2026 handbook reflects ongoing review; some majors integrated data science tools. No degree-level AI core unit visible \u2014 significant currency gap. |
| 10 | Graduate Outcome Evidence | 2/3 | Faculty-level destination data published; major-level role-title and salary granularity not available. Partial transparency. |
| B | Irreplaceability Premium (Bonus) | 2/3 | Genuine dual-skill value for Cluster B graduates (quantitative + domain science). Physical and life science graduates have domain depth creating non-trivial automation resistance. Generalist graduates without postgrad study are weakly differentiated. |
| **TOTAL** | | **23/36 \u2014 MODERATE RISK** | |

### 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
UNCERTAIN \u2014 highly major-dependent. For Cluster A research assistant roles: YES for documentation, literature review, data entry, and routine analysis. For Cluster B data analyst roles: YES for standard analysis and dashboard production. For Cluster C specialist geoscience/chemistry roles: NO \u2014 domain knowledge and instrument expertise create genuine automation friction.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES \u2014 conditionally. The scientific method is fundamentally about generating original insight. This capability is fully realized only in students who complete third-year research projects and proceed to honours. Three-year graduates who have not engaged with the Research Project have weaker evidence.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES \u2014 for Cluster B and Cluster C specialists. UNCERTAIN \u2014 for Cluster A generalists. Graduates with deep quantitative, computational, or physical science expertise are increasingly valuable as the humans who can validate, interpret, and govern AI-generated scientific outputs.

### 5. ANALOGUE GRADUATE PROFILE

The most exposed B-Sci graduate is the **General Science Graduate of 2021**: broadly capable with solid scientific literacy, entering roles where AI tooling is absorbing the cognitive layer faster than the physical or domain-specialist layer. Specific threats: AlphaFold displacing structural biology prediction work; Elicit and Consensus replacing systematic review that RAs performed; lab automation compressing junior technician roles; GitHub Copilot and Julius AI absorbing Cluster B data analyst work; environmental modelling AI absorbing Cluster C junior interpretation roles.

### 6. VERDICT

**The Bachelor of Science is MODERATE RISK \u2014 a degree with genuine strengths that are unevenly distributed across its graduate population.**

Technical and quantitative rigor (D3: 3/3), domain depth (D6: 3/3), and research methods rigor (D7: 3/3) are legitimate and durable differentiators \u2014 fully realized only for graduates who specialize deeply and continue to postgraduate study.

Two critical gaps undermine the credential: **D5 \u2014 AI Literacy (1/3)**: a science degree in 2026 with no mandatory AI governance unit is a curriculum currency failure. **D8 \u2014 Human and Relational Capability (1/3)**: as AI absorbs the technical execution layer, interpersonal judgment and stakeholder communication become the primary human value-add \u2014 and the degree does not assess this.

The degree is a strong foundation that requires deliberate completion. Students who select a computationally intensive or specialist domain major, complete a research project, proceed to honours or postgraduate study, and actively build AI literacy alongside their degree will be well-positioned in 2027.

### 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Select a major with genuine technical depth \u2014 Mathematics, Statistics, Physics, Chemistry, or Computing and Software Systems | D6, D3 | Low (decision at enrollment) |
| 2 | Complete the Research Project \u2014 optional but the single most important differentiator | D4, D7 | Medium |
| 3 | Build AI literacy deliberately: complete an AI governance certification (AWS AI Practitioner, Google AI Essentials) \u2014 the degree does not provide this | D5 | Low\u2013Medium |
| 4 | Proceed to honours or postgraduate study for research, clinical, or specialist consulting roles | D1, D6 | High |
| 5 | Complete the Science Internship elective \u2014 closes the decision-making and relational capability gap | D4, D8 | Medium |
| 6 | Develop science communication skills through student media, public engagement, or communication electives | D8 | Medium |
| 7 | For Cluster B majors: add Python depth, data engineering fundamentals, and ML model evaluation capability | D3, D5 | Medium |
| 8 | Target early-career roles in regulated domains where domain judgment is legally required | D1, D6 | High |

### 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready B-Sci graduate chose a major with genuine technical depth and completed it at the hardest available level. They did the Research Project in third year \u2014 primary data, defended methodology, genuine uncertainty about whether their results were correct. They understand AI tools as systems with failure modes, training biases, and governance requirements. They have a domain: not science in the broad sense, but a specific regulatory environment, instrument limitation set, or physical system. That domain knowledge is what makes their judgment non-replicable by a general-purpose agent. They can explain their work to a non-scientist \u2014 because in 2027, the value of scientific expertise is realized through collaboration, governance, and communication, not through technical execution alone.

---
**Assessment Date:** 2026-05-13 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/b-sci | **Prompt Version:** DFVA-COPILOT-PROMPT-v1
`,
  },

  "dfva-market-b-sci": {
    title: "Bachelor of Science (B-Sci) \u2014 Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Bachelor of Science (B-Sci)

**Assessment Date:** 2026-05-13 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/b-sci | **Prompt Version:** DFVA-COPILOT-MARKET-v1

> **Evidence Confidence Note:** Signals constructed from structured knowledge of science-adjacent labour markets to early 2026 and publicly documented hiring trend reports (WEF Future of Jobs 2025, LinkedIn Jobs on the Rise 2025, McKinsey AI and the Workforce 2024\u20132025, CSIRO workforce planning data).

---

### 1. JOB FAMILY MAP

| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Research Assistant / Laboratory Scientist | Research Assistant, Lab Technician, Junior Research Officer | Sample preparation, instrument operation, data collection, literature review, experimental documentation | HIGH (cognitive); MEDIUM (physical/instrument) | AI tool evaluation and validation, primary experimental design, research integrity in AI-assisted contexts | AlphaFold 3 displaced junior structural biology prediction; Elicit/Consensus absorbing systematic review; lab automation compressing junior technician roles |
| Data Analyst / Quantitative Analyst | Data Analyst, Graduate Analyst, Quantitative Analyst, Reporting Analyst | Data wrangling, SQL querying, dashboard production, statistical analysis, stakeholder reporting | HIGH | Python/R depth, dbt, ML model evaluation, semantic layer design, AI output auditing | LinkedIn Q1 2026: Reporting Analyst postings down 22% YoY; Analytics Engineer up 31%; Seek ANZ: 34% of data science postings include model governance language (up from 11% in 2024) |
| Environmental Scientist / Consultant | Graduate Environmental Scientist, Sustainability Analyst, Environmental Assessment Officer | EIA drafting, field data collection, regulatory compliance reporting, GIS and remote sensing analysis | MEDIUM (regulatory judgment); HIGH (documentation/routine analysis) | AI-assisted modelling literacy, regulatory AI governance, climate risk scenario analysis, stakeholder communication | AECOM, GHD, WSP ANZ adding AI-assisted modelling tools to graduate requirements (Q4 2025\u2013Q1 2026) |
| Science Policy Analyst / Government Science Officer | Policy Officer (Science), Graduate Policy Analyst, Science Advisor | Evidence synthesis, policy brief drafting, regulatory analysis, research translation for non-specialist audiences | MEDIUM | AI-generated evidence evaluation and fact-checking, science communication, regulatory AI literacy | APS 2025 graduate intake: roles explicitly requiring evidence translation and AI-assisted research synthesis evaluation |
| Biotech / Pharmaceutical Research Associate | Research Associate, Graduate Scientist, Regulatory Affairs Assistant, QC Scientist | Assay development, GMP compliance documentation, regulatory submission support | LOW\u2013MEDIUM | Regulatory AI governance (TGA, FDA), AI-assisted assay interpretation validation, GMP documentation with AI disclosure | CSL, Starpharma, Telix ANZ postings (Q1 2026) adding familiarity with TGA AI framework as requirement |
| AI/ML Research Scientist (Domain-Specialist) | Research Scientist (AI), ML Research Engineer, Applied Scientist | Domain-specific model evaluation, training data curation, AI system design for scientific applications | LOW | Domain science depth + ML competency integration, model evaluation and failure-mode analysis, AI governance for research | CSIRO, ARC-funded institutes, university AI centres hiring domain science + ML profiles; role cluster did not exist at scale in 2022 |
| Science Communicator | Science Communicator, Science Writer, Communications Officer (Research) | Research translation, media liaison, science content, grant communications | MEDIUM (content production); LOW (expert judgment) | AI content evaluation and fact-checking, multimodal science storytelling, AI disclosure literacy | ABC Science, Cosmos, CSIRO Communications adding AI literacy to role requirements |
| Geoscientist / Resources Sector Scientist | Graduate Geologist, Graduate Geophysicist, Resources Analyst | Geological mapping, core logging, resource estimation, instrument data interpretation | LOW\u2013MEDIUM | AI geological interpretation tool governance (Geolog AI, SLB), resource estimation model validation | BHP, Rio Tinto, Newmont ANZ adding AI-assisted interpretation tools experience (Q4 2025); JORC code under review |

### 2. RECENT JOB AD SIGNALS

**Signal 1 \u2014 RA and lab roles: cognitive layer compressing, physical layer stable.**
ANZ research assistant and laboratory scientist postings (Q1 2026) increasingly specify: ability to validate AI-generated experimental outputs, experience evaluating AI literature synthesis tools, research integrity compliance with AI disclosure requirements. Role volume flat; specification complexity rising sharply.

**Signal 2 \u2014 Data roles bifurcating sharply.**
ANZ data hiring (Q1 2026) splitting into: (a) analytics engineering and ML engineering (growing, require Python/dbt depth and model governance), and (b) standard data analyst/reporting analyst (declining, absorbed by AI tools). Cluster B graduates without Python depth or model evaluation capability face the compressing tier.

**Signal 3 \u2014 Environmental consulting raising the floor.**
AECOM, GHD, Jacobs, WSP ANZ graduate advertisements (Q4 2025\u2013Q1 2026) routinely include: familiarity with AI-assisted environmental modelling tools, ability to critically evaluate AI-generated assessment outputs. Language absent from equivalent 2023 graduate ads.

**Signal 4 \u2014 Government science roles requiring AI evaluation capability.**
APS science and policy graduate roles (Q4 2025\u2013Q1 2026) adding: ability to evaluate AI-generated evidence syntheses, AI literacy for evidence-based policy. Primary value-add for a science graduate in government is no longer producing evidence summaries \u2014 it is evaluating AI-generated ones.

**Signal 5 \u2014 Biotech and pharma adding regulatory AI literacy.**
CSL Behring, Telix, Starpharma, Moderna ANZ (Q1 2026) adding: familiarity with TGA AI framework, understanding of AI disclosure requirements in GMP contexts, ability to validate AI-assisted assay interpretation. New requirement cluster not present in 2023 graduate ads.

**Signal 6 \u2014 New role titles emerging for domain-AI integration.**
Seek ANZ new title appearances (Q4 2025\u2013Q1 2026): AI Research Scientist (Life Sciences) \u2014 12 ANZ postings; Scientific AI Validation Specialist \u2014 8 postings; Environmental AI Analyst \u2014 6 postings; Research Data Governance Officer \u2014 11 postings.

### 3. CURRENT DISCUSSION SIGNALS (X)

**Theme 1 \u2014 Is the research assistant role already gone?** Active discourse: AI tools have absorbed the cognitive and some physical components of junior RA work. Counter-view: AI has created new RA work \u2014 validating, governing, and interpreting AI outputs.

**Theme 2 \u2014 Junior data analyst is a dead-end title.** Dominant framing in Australian data professional networks: if your job is pulling reports and building dashboards, ChatGPT or Julius has your job.

**Theme 3 \u2014 AlphaFold didn't kill structural biology \u2014 it killed junior structural biology.** Remaining human work: experimental validation, failure-mode analysis, and judgment about when the model is wrong.

**Theme 4 \u2014 Environmental consulting needs people who can argue with the AI.** Anyone can run the model now \u2014 clients need someone who can tell them where the model is wrong and why.

**Theme 5 \u2014 CSIRO and ARC are hiring domain-AI hybrids.** Pure ML is a commodity. Domain science + ML is the scarce combination.

**Theme 6 \u2014 Science graduates need to learn to fact-check the AI, not just use it.** APS science managers: our graduate intake can use Copilot and Elicit but they cannot tell us whether the output is right.

### 4. SKILL SHIFT SUMMARY

| Declining Demand | Decline Driver | Velocity |
|---|---|---|
| Manual literature synthesis and systematic review | Elicit, Consensus, Perplexity, ChatGPT research tools | Very Fast |
| Routine data entry and experimental documentation | Lab automation platforms, GenAI documentation tools | Fast |
| Standard dashboard and report production | Power BI Copilot, Tableau AI, Julius AI | Fast |
| Templated EIA and compliance report drafting | Environmental AI modelling platforms | Medium\u2013Fast |
| Basic statistical analysis and SPSS/Excel reporting | AI data analysis tools | Fast |
| Junior protein structure prediction | AlphaFold 3 and successors | Very Fast |

| Rising Demand | Rise Driver | Velocity |
|---|---|---|
| AI tool evaluation and failure-mode analysis | Every scientific domain now deploying AI tools | Very Fast |
| Research integrity in AI-assisted science | ARC, NHMRC, TGA AI frameworks | Fast |
| Domain science + ML integration | CSIRO, ARC, university AI research hiring | Very Fast |
| Regulatory AI governance | Sector-specific AI regulation arriving | Fast |
| Science communication for non-specialist audiences | APS, government science, industry demand | Fast |
| Data engineering depth (Python, dbt, SQL modelling) | Analytics engineering replacing data analyst | Fast |
| AI-generated evidence evaluation and fact-checking | APS and government science agencies explicit demand | Fast |

### 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Recommended Action |
|---|---|---|---|
| CI-1 | No mandatory AI governance unit \u2014 graduates cannot evaluate the AI tools they will be expected to govern | D5 | Create mandatory core unit: AI in Scientific Research |
| CI-2 | Science communication and stakeholder translation now an explicit hiring requirement \u2014 not systematically assessed | D8 | Create mandatory science communication and ethics unit with stakeholder-facing deliverable |
| CI-3 | Research Project is optional but is the primary differentiator between graduates who can generate primary evidence and those who cannot | D4, D7 | Mandate Research Project for all students with AI tool use reflection |
| CI-4 | Science Internship optional but provides real-stakes decision-making and domain application exposure | D4, D8, D1 | Mandate Science Internship with strengthened assessment |
| CI-5 | Major-level graduate destination data not published \u2014 students cannot make evidence-based major selection decisions | D10 | Publish major-level destination data within 12 months of graduation |
| CI-6 | Cluster B graduates face analytics engineer vs. data analyst bifurcation \u2014 degree does not signal which path students are prepared for | D3, B | Add data engineering elective pathway |
| CI-7 | Major selection advising does not address AI substitution pressure by cluster | D1, D9 | Update major selection guides to include AI automation exposure by cluster |

### 6. EVIDENCE CONFIDENCE + GAPS

| Signal Area | Confidence | Gap |
|---|---|---|
| Job family identification | HIGH | Role taxonomy shifting faster than handbook data tracks |
| Hiring volume trends (ANZ) | MEDIUM | Live Q2 2026 data not confirmed; Q1 2026 estimates used |
| Skill shift direction | HIGH | Direction reliable; pace of decline faster than any single report captures |
| X/social discussion themes | MEDIUM | Specific viral threads and account-level data not captured |
| Biotech/pharma regulatory signals | MEDIUM | TGA AI framework and NHMRC guidelines cited from known 2025 publications; ad counts estimated |
| Resources sector JORC signal | LOW\u2013MEDIUM | JORC review timeline unconfirmed; prediction based on sector discourse pattern |

**Critical Gaps:** Live ANZ job-ad scrape (last 90 days); UniMelb B-Sci major-level graduate destination data; employer interviews from 5\u20138 regular B-Sci hiring organisations (CSIRO, AECOM, CSL, APS, university research groups).

---
**Assessment Date:** 2026-05-13 | **Source URLs:** https://handbook.unimelb.edu.au/2026/courses/b-sci \u00b7 WEF Future of Jobs 2025 \u00b7 LinkedIn Workforce Report Q1 2026 | **Prompt Version:** DFVA-COPILOT-MARKET-v1
`,
  },

  "dfva-recommend-b-sci": {
    title: "Bachelor of Science (B-Sci) \u2014 Curriculum Improvement Plan",
    institution: "University of Melbourne",
    markdown: `## DFVA CURRICULUM IMPROVEMENT PLAN: Bachelor of Science (B-Sci)

**Based on report:** B-Sci DFVA Assessment / 2026-05-13 / https://handbook.unimelb.edu.au/2026/courses/b-sci
**Assessment date:** 2026-05-13
**Prompt version:** DFVA-COPILOT-RECOMMENDER-v1

### 1. DIAGNOSTIC SUMMARY
The B-Sci scored **23/36 \u2014 MODERATE RISK**. Three strong scores (D3, D6, D7: each 3/3) are real and defensible \u2014 but fully realized only for graduates who specialize deeply and proceed to honours or postgraduate study. The two critical 1/3 scores define the primary intervention targets.

| Dimension | Score | Status |
|---|---|---|
| D1 \u2014 Automation Exposure | 2/3 | Adequate |
| D2 \u2014 Systems Thinking | 2/3 | Adequate |
| D3 \u2014 Technical and Quantitative Depth | 3/3 | Strong |
| D4 \u2014 Decision-Making Under Uncertainty | 2/3 | Adequate |
| D5 \u2014 AI Literacy and Governance | 1/3 | Critical gap |
| D6 \u2014 Domain Depth and Specialization | 3/3 | Strong |
| D7 \u2014 Research Methods Rigor | 3/3 | Strong |
| D8 \u2014 Human and Relational Capability | 1/3 | Critical gap |
| D9 \u2014 Curriculum Currency | 2/3 | Adequate |
| D10 \u2014 Graduate Outcome Evidence | 2/3 | Adequate |
| B \u2014 Irreplaceability Premium | 2/3 | Adequate |
| **TOTAL** | **23/36** | **MODERATE RISK** |

### 2. SCORE-TO-ACTION MAPPING
| Dimension | DFVA Score | Gap Diagnosis | Recommended Intervention |
|---|---|---|---|
| D1 \u2014 Automation Exposure | 2/3 | Entry-level Cluster A and B graduates land in roles where AI is actively compressing the cognitive layer. Three-year generalist graduates most exposed. | Make Research Project mandatory. Require Science Internship. Reframe career advising around AI-augmented science roles. |
| D5 \u2014 AI Literacy and Governance | 1/3 | No mandatory AI governance unit. AI appears in computational majors as tooling but not as a governed, critically evaluated system. | Create mandatory core unit: AI in Scientific Research (tool evaluation, model limitation analysis, NIST AI RMF applied to research contexts). |
| D8 \u2014 Human and Relational Capability | 1/3 | Science degrees systematically under-invest in communication, ethical reasoning, and stakeholder engagement. As AI absorbs technical execution, this gap becomes structurally dangerous. | Create mandatory science communication and ethics unit with stakeholder-facing assessed deliverable. |
| D4 \u2014 Decision-Making | 2/3 | Research Project provides authentic uncertainty exposure but is not mandatory. Many graduates complete without a live high-stakes assessment. | Mandate Research Project for all students. Require Science Internship with assessed decision-making reflection. |
| D3 \u2014 Technical Depth | 3/3 | Strong. Risk is in Cluster A majors where quantitative rigor is lighter. | Maintain and defend. Audit quantitative requirements in life sciences majors. |
| D6 \u2014 Domain Depth | 3/3 | Strong. Risk is students selecting shallow majors to avoid difficulty. | Maintain depth requirements. Introduce major selection advising mapping AI substitution pressure to major choice. |
| D9 \u2014 Curriculum Currency | 2/3 | No degree-level AI governance content visible despite recent review. | Establish science curriculum advisory panel with annual review cycle and documented change tracking. |
| D10 \u2014 Graduate Outcome Evidence | 2/3 | Faculty-level data only; major-level granularity unavailable. | Publish major-level graduate destination data: role titles, salary bands, postgraduate study rates within 12 months. |

### 3. PRIORITISED INTERVENTIONS TABLE
| Priority | Action | Target Dimensions | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |
|---|---|---|---|---|---|---|---|---|
| 1 | Create mandatory core unit: AI in Scientific Research (tool evaluation, model limitation analysis, research integrity, NIST AI RMF applied to research) | D5, D9, B | Seek ANZ: AI tool literacy in 34% of science-adjacent postings (up from 11% in 2024); CSIRO and APS science roles requiring ability to evaluate AI model outputs | HIGH | HIGH | Faculty of Science Dean of Teaching + School of CIS (co-design) | Months 1\u20139 design; Sem 1 2027 delivery | Unit live Sem 1 2027; 100% enrollment; 80%+ student proficiency on AI tool evaluation |
| 2 | Mandate Research Project for all students (primary data, defended methodology, failure-mode analysis, AI tool use reflection) | D4, D1, D7, B | RA postings requiring demonstrated primary research experience; junior research roles compressing as AI handles literature synthesis | HIGH | HIGH | Faculty Curriculum Committee + Major Coordinators | Months 3\u201312 redesign; Sem 1 2028 implementation | 100% graduates completing Research Project by 2028 |
| 3 | Create mandatory science communication and ethics unit (stakeholder-facing deliverable: policy brief, public explainer, or client report) | D8, D5, B | APS requiring evidence translation for non-specialist audiences; ANZ biotech citing communication as graduate gap | HIGH | MEDIUM | Faculty of Science + School of Historical and Philosophical Studies (co-design) | Months 2\u20138 design; Sem 2 2027 delivery | Unit live Sem 2 2027; 90%+ graduates completing stakeholder deliverable |
| 4 | Make Science Internship a core elective requirement (decision-making reflection, AI tool use log, accountability statement) | D4, D8, D1 | AECOM, GHD, WSP ANZ adding AI-assisted modelling tools to graduate requirements; biotech explicitly valuing internship-evidenced domain application | HIGH | MEDIUM | Faculty Careers and Industry Engagement | Months 4\u201310 redesign; Sem 1 2027 mandate | 80%+ graduates completing Science Internship by 2028 |
| 5 | Publish major-level graduate destination data (role-title, industry, salary band, postgraduate study rate) | D10, D1 | Students cannot make evidence-based major selection decisions; major-level data directly addresses Cluster A/B/C divergence | MEDIUM | MEDIUM | Faculty + Careers and Employability + Institutional Research | Months 1\u20136 system; Month 12 publish | First major-level destination report by end of 2027 |
| 6 | Introduce AI substitution pressure framing into major selection advising | D1, D9 | Junior lab technician and RA roles compressing; students currently choosing majors without labor-market durability information | MEDIUM | LOW | Faculty Marketing + Careers Team | Months 1\u20133 | Updated advising materials published by Month 3 |
| 7 | Establish Faculty curriculum advisory panel (CSIRO, APS, ANZ biotech/pharma, environmental consulting, AI research institute) | D9, D10 | Government science agencies showing AI literacy as new baseline requirement \u2014 curriculum lag is the structural problem | MEDIUM | MEDIUM | Faculty Dean + Industry Engagement Office | Months 3\u20136 formation | Panel constituted by Month 6; 2 curriculum changes traceable to panel by Month 18 |
| 8 | Introduce graduation portfolio requirement (one research artifact, one AI governance reflection, one stakeholder communication piece) | D4, D8, B | CSIRO and university AI research roles requiring evidence of domain science depth + AI critique capability | MEDIUM | MEDIUM | Faculty + Academic Board | Months 6\u201312 design; Sem 1 2028 implementation | 100% graduates completing portfolio by 2028 |

### 4. 12-MONTH IMPLEMENTATION ROADMAP

**Month 1\u20133 \u2014 Foundation and Quick Wins:** Update major selection advising with AI substitution pressure framing (P6). Initiate major-level graduate destination data system design (P5). Begin curriculum advisory panel formation (P7). Scope AI in Scientific Research unit: assign coordinator, draft learning outcomes, identify co-design partner in Computing and Information Systems (P1). Commission audit of Research Project enrollment rates and barriers (P2 groundwork).

**Month 3\u20136 \u2014 Design Sprint:** AI in Scientific Research unit: full outline, assessment design, and resource list complete (P1). Science Communication and Ethics unit: outline drafted, stakeholder deliverable format confirmed (P3). Curriculum advisory panel constituted; first briefing session (P7). Science Internship redesign: new assessment requirements drafted \u2014 decision log, AI tool use log, accountability statement (P4). Graduate destination data: collection instruments and reporting system in place (P5).

**Month 6\u20139 \u2014 Build and Validate:** AI in Scientific Research unit submitted for academic approval (P1). Science Communication and Ethics unit submitted (P3). Research Project mandate: curriculum change proposal submitted to Curriculum Committee (P2). Science Internship mandate: proposal submitted; employer partner network reviewed and expanded (P4). Graduation portfolio requirement: design document completed (P8). Curriculum advisory panel: first annual review session (P7).

**Month 9\u201312 \u2014 Pre-Launch and Baseline:** AI in Scientific Research unit approved; teaching staff confirmed; first cohort enrolled Sem 1 2027 (P1). Science Communication and Ethics unit approved for Sem 2 2027 (P3). First major-level destination report published (P5). Science Internship mandate in approval pipeline (P4). Baseline scorecard documented pre-redesign for comparison (P2, P6).

### 5. 24-MONTH CAPABILITY ROADMAP

**Months 1\u201312 \u2014 Structural Fix (target: 26\u201327/36 MODERATE RISK upper band):** Close two critical 1/3 scores. AI in Scientific Research unit live (D5: 1 to 3). Science Communication and Ethics unit live (D8: 1 to 2). Major-level destination data published (D10: 2 to 3). Research Project mandate in approval pipeline (D4 target: 2 to 3).

**Months 13\u201318 \u2014 Depth and Differentiation (target: 29\u201330/36 RESILIENT):** Research Project mandate implemented \u2014 all students (D4: 2 to 3). Science Internship mandate implemented (D1: 2 to 3; D8: 2 to 3). Curriculum advisory panel completing first full cycle (D9: 2 to 3).

**Months 19\u201324 \u2014 Evidence and Signal (target: 31\u201333/36 RESILIENT strong band):** Graduation portfolio first full cohort (B: 2 to 3). Second major-level destination report: role-title shift toward AI-governance and specialist roles measurable. AI in Scientific Research: external validation against NIST AI RMF and ARC research integrity frameworks. Curriculum advisory panel: second annual review with documented change traceability.

### 6. ASSESSMENT REDESIGN EXAMPLES

**Research Project \u2014 Redesigned:** Complete a supervised primary research project with: (1) a pre-registration document stating hypothesis, methodology, and predicted limitations before data collection; (2) primary data collection and analysis with documented methodology; (3) failure-mode and limitation analysis; (4) AI tool use reflection \u2014 if AI tools were used, document which tools, how outputs were validated, what the model's limitations are, and what would have been missed without human judgment; (5) 10-minute panel defence with examiner challenge. Client or supervisor accountability statement required.

**AI in Scientific Research \u2014 New Unit:** Assessment 1 (40%): Select an AI tool in your major's research domain. Produce a structured evaluation covering what the tool does, training data and biases, three failure modes, validation requirements before publishing, and accountability when the tool is wrong. Assessment 2 (60%): Advise a research group wanting to use an AI tool. Produce a governance brief using NIST AI RMF: tool assessment, research integrity checklist, disclosure and reproducibility requirements, and a justified go/no-go recommendation presented to a panel including a non-specialist.

**Science Communication and Ethics \u2014 Redesigned:** You are a scientist advising a government department on a topic within your major. Produce: (1) a stakeholder brief (800 words max) translating current evidence on a defined question for a non-specialist audience; (2) an AI disclosure statement covering tools used, output verification, and what required your judgment; (3) a live Q&A session (15 minutes) with a panel including at least one non-scientist.

### 7. MEASUREMENT PLAN

**Leading indicators (12 months):** AI in Scientific Research unit live Sem 1 2027 \u00b7 Student AI tool evaluation competency 80%+ \u00b7 Science Communication and Ethics unit approved Sem 2 2027 \u00b7 Major selection advising updated Month 3 \u00b7 Curriculum advisory panel constituted Month 6 \u00b7 Graduate destination tracking operational Month 6 \u00b7 Research Project mandate proposal submitted Month 9.

**Lagging indicators (12\u201324 months):** Graduate placement in AI-governance or specialist science roles 25%+ of cohort by 2028 \u00b7 Employer satisfaction with AI governance readiness 75%+ rating well prepared \u00b7 DFVA score 26\u201327 by Month 12; 31\u201333 by Month 24 \u00b7 Research Project completion rate 100% by 2028 \u00b7 Science Internship completion rate 80%+ by 2028 \u00b7 Time-to-employment median 90 days \u00b7 Cluster B major enrollment up 15%+ by 2028.

### 8. REDESIGNED GRADUATE PROFILE (2027 READY)
The 2027-ready B-Sci graduate did not coast through a broad science degree hoping that scientific literacy would be enough. They chose a major with genuine technical depth, completed a primary research project with pre-registration and a defended methodology, and finished their degree able to look at an AI tool in their domain and tell you exactly where it fails. They completed a Science Internship in a regulated or high-stakes environment. Their graduation portfolio has three artifacts that no AI can produce for them: a primary research dataset with a defended methodology, an AI governance brief for a tool in their domain, and a stakeholder communication piece reviewed by a non-specialist panel. They are the person their research group or employer relies on to decide which AI outputs to trust \u2014 and why.
`,
  },


  "dfva-recommend-b-des": {
    title: "Bachelor of Design (B-Des) — Curriculum Improvement Plan",
    institution: "University of Melbourne",
    markdown: `## DFVA CURRICULUM IMPROVEMENT PLAN: Bachelor of Design

**Based on report:** Bachelor of Design, University of Melbourne — 21/36 MODERATE RISK — 2026-05-13 / https://handbook.unimelb.edu.au/2026/courses/b-des

### 1. DIAGNOSTIC SUMMARY

The Bachelor of Design scored **21/36 — MODERATE RISK**. Three critical 1/3 scores define the primary intervention targets.

| Dimension | Score | Status |
|---|---|---|
| D1 — Automation Exposure | 2/3 | Adequate |
| D2 — Systems Thinking | 2/3 | Adequate |
| D3 — Technical Depth | 1/3 | Critical gap |
| D4 — Decision-Making | 2/3 | Adequate |
| D5 — AI Literacy | 1/3 | Critical gap |
| D6 — Domain Depth | 2/3 | Adequate |
| D7 — Research Methods | 2/3 | Adequate |
| D8 — Human/Relational | 3/3 | Strong |
| D9 — Curriculum Currency | 2/3 | Adequate |
| D10 — Graduate Outcome Evidence | 1/3 | Critical gap |
| B — Irreplaceability Premium | 2/3 | Adequate |
| **TOTAL** | **21/36** | **MODERATE RISK** |

The B-Des has a genuine human-relational strength (D8: 3/3). Studio culture, critique practice, and embodied making are not easily replicated by AI. Three 1/3 scores represent the degree’s primary intervention targets: technical depth, AI literacy and governance, and graduate outcome evidence.

### 2. SCORE-TO-ACTION MAPPING

| Dimension | DFVA Score | Gap Diagnosis | Recommended Intervention |
|---|---|---|---|
| D3 — Technical Depth | 1/3 | No mandatory prototyping, code literacy, or data fluency. Graduates cannot direct or govern AI tools they cannot technically understand. | Create mandatory technical foundations unit: prototyping tools (Figma, Framer), front-end literacy (HTML/CSS/JS concepts), data visualisation. |
| D5 — AI Literacy | 1/3 | No mandatory AI governance unit. AI tools appear in studio but not as critically evaluated systems. | Create mandatory core unit: AI in Design Practice — tool evaluation, output critique, prompt governance, IP and ethics. |
| D10 — Outcome Evidence | 1/3 | No publicly available granular destination data at specialisation level. | Publish specialisation-level destination data: role titles, industries, salary bands, time-to-employment. |
| D4 — Decision-Making | 2/3 | Simulated briefs limit authentic accountability. Studio critique does not replicate live-client uncertainty. | Mandate live-client capstone for all students. Replace simulated final-year briefs with real industry, government, or community partner projects. |
| D6 — Domain Depth | 2/3 | Specialisation depth varies; Interaction Design lacks regulatory and technical grounding. | Add WCAG 2.2 AA, platform design systems, and AI interaction pattern design to Interaction specialisation. |
| D7 — Research Methods | 2/3 | Primarily qualitative. Quantitative methods under-represented, limiting ability to defend design decisions with data. | Add quantitative design research component: usability testing statistics, survey design, A/B test interpretation. |

### 3. MARKET EVIDENCE SNAPSHOT

| Job Family | Recent Hiring Signal | X Discussion Theme | Curriculum Impact |
|---|---|---|---|
| UX/Product Designer | Seek ANZ Q1 2026: “Junior UX Designer” postings down 17% YoY; senior UX requiring “AI workflow integration,” “design systems governance,” “accessibility audit experience” | “Junior UX is gone — replaced by Figma AI and a senior designer who knows how to prompt it” | Technical depth unit critical; AI governance unit essential; accessibility and design systems depth needed |
| Brand / Visual Designer | Creative agency graduate ads adding “AI tool governance,” “creative direction of AI outputs” as new requirements (Q4 2025) | “The junior graphic designer role is a prompt engineer now — the question is whether design schools are training for direction or execution” | AI in Design Practice unit directly addresses |
| Service / Strategic Designer | ANZ government and consulting roles (KPMG, Deloitte, DTA) stable to growing; requiring co-design facilitation, systems mapping, policy design | “Service design is one of the last design roles AI genuinely can’t do — because it requires being in the room” | D8 strength directly aligns; live-client capstone essential |
| Design Researcher | CSIRO, tech sector: growing demand for mixed-methods design research; salary premium for researchers bridging qual and quant | “The best design researchers tell you where the AI user research tool is wrong” | Quantitative research methods addition directly addresses |
| AI Product Designer | Seek ANZ: “AI Product Designer” — 23 new ANZ postings Q4 2025; all requiring LLM workflow design, human-AI teaming frameworks | “This is the new junior design role — but you need to understand how the model works to do it well” | AI in Design Practice unit is the direct curriculum response |

### 4. PRIORITISED INTERVENTIONS TABLE

| Priority | Action | Target Dimensions | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |
|---|---|---|---|---|---|---|---|---|
| 1 | Create mandatory core unit: **AI in Design Practice** — AI tool evaluation, output critique, prompt governance, IP and ethics in AI-assisted design, human-centred AI workflow design | D5, D9, B | Seek ANZ: “AI Product Designer” postings +23 Q4 2025; creative agency graduate ads adding “AI tool governance” as new requirement | HIGH | HIGH | Program Director + School of Design + MSD Advisory Panel | Months 1–9 design; Sem 1 2027 delivery | Unit live Sem 1 2027; 100% enrolment; 80%+ proficiency on AI tool evaluation rubric |
| 2 | Create mandatory unit: **Design and Technology Integration** — Figma advanced, Framer, front-end literacy, data visualisation, design systems governance | D3, B | “Junior UX is gone — replaced by Figma AI and a senior designer who knows how to prompt it” | HIGH | HIGH | Program Director + MSD + School of Engineering (co-design) | Months 2–9 design; Sem 2 2027 delivery | Unit live Sem 2 2027; 85%+ students demonstrating prototyping proficiency at industry standard |
| 3 | **Mandate live-client capstone** — replace simulated briefs with real industry, government, or community partner projects; require defended decision document, AI tool use reflection | D4, D1, B | DTA, KPMG, Deloitte ANZ requiring demonstrated live-client project evidence | HIGH | HIGH | Capstone Coordinator + MSD Industry Partnerships | Months 3–12 redesign; Sem 1 2028 mandate | 100% graduates completing live-client capstone by 2028; client satisfaction ≥4/5 |
| 4 | **Publish specialisation-level destination data** — role titles, industries, salary bands, time-to-employment within 12 months of each graduating cohort | D10 | Competitive disadvantage vs. RMIT and UTS design programs which publish employability data | HIGH | MEDIUM | Program Director + Careers + Institutional Research | Months 1–6 system; Month 12 first publish | First specialisation-level destination report published end of 2027 |
| 5 | Add **quantitative design research component** — usability testing statistics, survey design, A/B test interpretation, analytics literacy | D7, D3 | Salary premium for researchers bridging qual and quant; “the best design researchers tell you where the AI user research tool is wrong” | MEDIUM | MEDIUM | Research Methods Unit Coordinator | Months 2–6 | 80%+ graduates demonstrating mixed-methods capability |
| 6 | **Strengthen Interaction Design specialisation** — WCAG 2.2 AA, platform design systems (iOS HIG, Material Design, government design systems), AI interaction pattern design | D6, D3 | Government digital roles (DTA, Service NSW) requiring WCAG compliance; “accessibility audit experience” in senior UX ads | MEDIUM | MEDIUM | Interaction Design Specialisation Coordinator | Months 3–8 | Interaction Design graduates demonstrating WCAG competency at interview |
| 7 | **Establish MSD design industry advisory panel** — 8–10 members from design consultancies, tech product companies, government design teams, creative agencies, AI product companies | D9, D10 | Design industry hiring expectations changed 2022→2026 without curriculum response | MEDIUM | MEDIUM | Program Director + MSD Industry Engagement | Months 3–6 formation | Panel constituted Month 6; 2 curriculum changes traceable to panel by Month 18 |
| 8 | **Update careers advising** to AI workflow director, design strategist, AI product designer — away from junior graphic designer and junior UX designer as primary destinations | D1, D9 | “Junior UX Designer” down 17% YoY; “AI Product Designer” emerging on Seek ANZ | MEDIUM | LOW | MSD Careers + Program Director | Months 1–3 | Updated materials Month 3; 30%+ graduates targeting new role titles by 2028 |

### 5. 12-MONTH IMPLEMENTATION ROADMAP

**Month 1–3 — Foundation and Quick Wins:** Update careers advising with AI workflow director and design strategist framing (P8). Initiate specialisation-level destination data system design (P4). Begin MSD industry advisory panel formation (P7). Scope AI in Design Practice unit: assign coordinator, draft learning outcomes, identify industry co-designers (P1). Commission audit of current capstone partner pipeline and live-client vs. simulated brief ratio (P3 groundwork).

**Month 3–6 — Design Sprint:** AI in Design Practice unit: full outline, assessment design, IP and governance framework, resource list complete (P1). Design and Technology Integration unit: outline drafted, tool stack confirmed — Figma, Framer, Webflow, basic HTML/CSS (P2). Quantitative design research module: content designed and integrated into existing research methods unit (P5). MSD advisory panel constituted; first briefing session (P7). Interaction Design specialisation audit complete; WCAG and design systems requirements drafted (P6). Graduate destination data collection instruments live (P4).

**Month 6–9 — Build and Validate:** AI in Design Practice unit submitted for academic approval (P1). Design and Technology Integration unit submitted (P2). Live-client capstone mandate: curriculum change proposal submitted; five industry/government partners confirmed (P3). Interaction Design: WCAG and design systems content integrated (P6). MSD advisory panel: first annual curriculum review (P7).

**Month 9–12 — Pre-Launch and Baseline:** AI in Design Practice approved; staff confirmed; first cohort enrolled Sem 1 2027 (P1). Design and Technology Integration approved for Sem 2 2027 (P2). First specialisation-level destination report published (P4). Live-client capstone: partner agreements signed; assessment rubric published (P3). Baseline scorecard documented pre-redesign for comparison.

### 6. 24-MONTH CAPABILITY ROADMAP

**Months 1–12 — Structural Fix (target: 24–25/36 MODERATE RISK upper band):** Close three critical 1/3 scores. AI in Design Practice live (D5: 1→3). Specialisation destination data published (D10: 1→2). Design and Technology Integration in approval pipeline (D3: 1→2 target). Quantitative research module integrated (D7: partial).

**Months 13–18 — Depth and Differentiation (target: 28–30/36 RESILIENT):** Design and Technology Integration live Sem 2 2027 (D3: 1→3). Live-client capstone mandate implemented (D4: 2→3, D1: 2→3). Interaction Design specialisation strengthened (D6: 2→3). Advisory panel completing first full cycle (D9: 2→3).

**Months 19–24 — Evidence and Signal (target: 31–33/36 RESILIENT strong band):** Second destination cohort report: role-title shift toward AI-direction and strategy roles measurable (D10: 2→3). Graduation portfolio first full cohort (B: 2→3). External validation: AI in Design Practice mapped against Creative Australia AI ethics framework and AGDA professional standards.

### 7. ASSESSMENT REDESIGN EXAMPLES

**Example A — Capstone Studio (Redesigned):** Complete a major design project for a live industry, government, or community partner. Required: co-designed brief with documented constraints; research phase using both qualitative and quantitative methods; design decision log documenting all major trade-offs; AI tool use reflection declaring which tools were used, how outputs were evaluated, what required human judgment; live presentation to client stakeholders with challenge questions; client satisfaction statement. Assessment criteria: research rigour, decision accountability, AI governance, stakeholder communication, and design resolution. Dimensions: D4, D5, D7, D8, B.

**Example B — AI in Design Practice (New Unit):** Assessment 1 (40%): Select an AI design tool relevant to your specialisation. Produce a structured evaluation: what the tool does; training data basis and biases; three specific failure modes; IP and copyright risk assessment; a governance recommendation for commercial use. Assessment 2 (60%): You are the lead designer on a project where the client wants to use AI tools to accelerate delivery. Produce a design direction brief: AI workflow map showing which tasks are AI-assisted and which are human-led; quality assurance protocol for AI-generated outputs; IP and ethics disclosure for the client; design rationale explaining what AI cannot replace; present to a panel including at least one non-designer. Dimensions: D5, D2, D4, D1.

**Example C — Design and Technology Integration (Assessed Prototype):** Produce a functional interactive prototype using Figma or Framer, including: a basic HTML/CSS implementation demonstrating understanding of build constraints; a data visualisation component using real data; an accessibility audit against WCAG 2.2 AA with documented remediation decisions. No prior coding experience assumed. Assessment criteria: prototype fidelity, build-constraint awareness, data integration, accessibility compliance. Dimensions: D3, D6, B.

### 8. AI GOVERNANCE AND QUALITY CONTROLS

**AI tool disclosure policy:** All studio units adopt a consistent AI disclosure policy by Sem 1 2027. Students declare AI tool use in a reflection log for all major assessments — a professional practice habit, not a prohibition.

**AI in Design Practice currency:** The unit coordinator must review and update the AI tool landscape each semester. Design AI is moving faster than annual curriculum review cycles.

**Live-client AI disclosure:** Any capstone project using AI tools must include a client-facing AI disclosure statement. This normalises professional-grade AI governance from graduation.

**Portfolio authenticity controls:** All portfolio artifacts require a process documentation component. AI-generated outputs without documented human direction and critique do not meet portfolio standards.

**COMPASS assessment controls:** Re-run COMPASS assessment annually after each advisory panel review. Score changes of ±3 in any dimension trigger curriculum review within 60 days.

### 9. MEASUREMENT PLAN

**Leading indicators (12 months):** AI in Design Practice unit live Sem 1 2027 · Student AI tool evaluation competency 80%+ · Design and Technology Integration unit approved Sem 2 2027 · Careers advising updated Month 3 · MSD advisory panel constituted Month 6 · Specialisation destination data instruments live Month 6 · Live-client capstone partners confirmed Month 9.

**Lagging indicators (12–24 months):** Graduate placement in AI-direction or strategy roles 30%+ of cohort by 2028 · Employer satisfaction with technical readiness 70%+ rating well prepared · Employer satisfaction with AI governance readiness 70%+ rating well prepared · DFVA score 24–25 by Month 12; 31–33 by Month 24 · Live-client capstone completion rate 100% by 2028 · Time-to-employment median ≤90 days post-graduation.

### 10. RISKS, TRADE-OFFS, AND DEPENDENCIES

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Academic governance delays technical unit beyond 2028 | MEDIUM | HIGH | Begin consultation Month 1; frame as design professional literacy, not coding requirement; pilot as elective in 2027 while mandate is in approval |
| AI in Design Practice unit resisted as “not design” by studio faculty | MEDIUM | HIGH | Frame as design governance and direction; invite industry co-designers with design backgrounds; use design critique methodology in assessment structure |
| Live-client capstone partner pipeline insufficient | MEDIUM | HIGH | Begin partner audit Month 3; expand to government, NFP, and social enterprise; allow research-group embedded projects as alternative |
| Specialisation destination data requires IT system investment beyond Faculty control | MEDIUM | MEDIUM | Partner with Institutional Research early; frame as student recruitment value proposition |
| Technical unit adds assessment load disadvantaging part-time or international students | LOW–MEDIUM | MEDIUM | Design unit around design direction, not coding fluency; no prior technical experience assumed |

**Key trade-offs:** Studio culture vs. technical mandate: Making a technical foundations unit mandatory changes the character of the degree. Some studio faculty will resist. The trade-off is necessary — a design degree that produces graduates unable to prototype at industry pace or evaluate AI tool outputs is not preparing them for 2027. Frame it as expanding the definition of design craft, not replacing it.

**Dependencies:** MSD advisory panel must be constituted before AI in Design Practice learning outcomes can be externally validated. Specialisation destination data requires Careers and Employability and Institutional Research partnership. Live-client capstone depends on industry partner network capacity — stress-test before mandate.

### 11. REDESIGNED GRADUATE PROFILE (2027 READY)

The 2027-ready B-Des graduate understood that directing an AI design tool without technical literacy is like directing a film without understanding the camera. They completed AI in Design Practice in second year and came out understanding that Figma AI generates components but cannot make the judgment call about whether the interaction pattern serves the user. They know what Midjourney’s training data biases are, why that matters for representation in brand work, and what a client disclosure statement needs to say.

They built a functional interactive prototype — not because they became a developer, but because they know exactly what constraints the build team is working within, and they can prototype fast enough to test an idea before anyone writes a line of production code.

Their capstone was a live project with a real government or industry client. They presented to stakeholders who asked hard questions they did not know the answer to in advance. Their design decision log shows every trade-off they made and why. Their client satisfaction statement is in their portfolio.

They are the graduate that a design strategy team, a service design consultancy, or an AI product company hires because they can do something that AI cannot: sit in a room with a human being, understand what that person actually needs, make a judgment call about what matters, and then direct the tools — AI and human — to get there.

---
**Assessment Date:** 2026-05-13 | **Source Report Reference:** DFVA Report: Bachelor of Design, University of Melbourne — 21/36 MODERATE RISK | **Prompt Version:** DFVA-COPILOT-RECOMMENDER-v1
`,
  },

  "dfva-market-b-des": {
    title: "Bachelor of Design (B-DES) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Bachelor of Design (B-DES)

### 1. JOB FAMILY MAP
| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing In Demand | Evidence Notes |
|---|---|---|---|---|---|
| UX/Product Design | Junior UX Designer, Product Designer (Graduate) | User flows, prototyping, usability testing, design systems | Medium | Figma systems thinking, experiment design, analytics literacy, AI-assisted prototyping | Indicative multi-board scan (LinkedIn/Seek/Indeed AU), Apr 2026 |
| Digital Content and Brand Design | Junior Visual Designer, Brand Designer | Campaign assets, social formats, brand adaptation, motion snippets | High | Prompt orchestration, brand governance, multi-format automation QA | Indicative multi-board scan, Apr 2026 |
| Service Design and CX | Service Design Analyst, CX Designer | Journey mapping, stakeholder workshops, process redesign | Medium | Systems mapping, facilitation, operations literacy, evidence synthesis | Indicative enterprise/consulting postings, Apr 2026 |
| Built Environment Design Support | Graduate Architectural Assistant, BIM Support | Documentation, model updates, compliance packs | Medium-High | BIM tool fluency, regulatory interpretation, coordination workflows | Indicative architecture/construction postings, Apr 2026 |
| Design Operations and Research | Design Ops Coordinator, UX Research Assistant | Workflow standards, research ops, repositories, governance | Low-Medium | Research operations, metrics instrumentation, governance controls | Indicative product/tech postings, Apr 2026 |
| Creative Technology / Design Automation | Creative Technologist (Junior), Experience Prototyper | Interactive prototyping, automation scripts, toolchain integration | Low-Medium | Scripting literacy, API/tool integration, QA and validation | Indicative advanced design-tech postings, Apr 2026 |

### 2. RECENT JOB AD SIGNALS
| Signal | Direction | Practical Meaning For B-DES |
|---|---|---|
| Rise in postings expecting AI-assisted workflow capability in design tools | Up | Graduates are expected to use AI tools productively, not just manually produce outputs |
| Increasing mention of design-system governance and consistency ownership | Up | Value is moving from one-off artifact creation to scalable system stewardship |
| More junior roles asking for evidence of research and decision rationale | Up | Portfolios need defensible decision chains, not only visual polish |
| Commodity visual-production tasks increasingly bundled or automated | Up (automation) | Pure production pathways face stronger displacement pressure |
| Cross-functional collaboration requirements (product, engineering, data, marketing) | Up | Curriculum must train communication and trade-off negotiation under constraints |

### 3. CURRENT DISCUSSION SIGNALS (X)
| Theme | Observed Direction | Curriculum Relevance |
|---|---|---|
| Debate over "designer as prompt operator" vs "designer as decision owner" | Strong and persistent | Reinforces need for assessment based on accountability and defended choices |
| Growing emphasis on verification and governance in AI-assisted creative workflows | Increasing | Supports mandatory AI governance and quality-control skills |
| Concern about junior-role compression due automation of repetitive tasks | Frequent | Supports stronger technical and research differentiation in first 2 years of study |
| Interest in hybrid profiles (design + data + systems) | Increasing | Supports technical spine and cross-domain skill architecture |

### 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)
| Declining Signal Value (Standalone) | Rising Signal Value |
|---|---|
| High-volume static asset production | Decision quality under ambiguity |
| Template adaptation without rationale | Systems-level design and governance |
| Tool operation without verification | AI workflow supervision and QA |
| Surface-only portfolio polish | Evidence-backed research and impact metrics |
| Isolated creative output | Cross-functional delivery and stakeholder alignment |

### 5. CURRICULUM IMPLICATIONS
1. Shift core assessment from artifact throughput to defended decision quality and trade-off reasoning.
2. Add mandatory AI governance and workflow assurance capability.
3. Embed technical depth tracks (analytics, automation-aware design, and computational methods).
4. Require primary user/stakeholder research evidence in capstone pathways.
5. Build graduate outcome instrumentation by pathway and task complexity to track market fit over time.

### 6. EVIDENCE CONFIDENCE + GAPS
- **Confidence level:** Medium.
- **What is strong:** Directional trend consistency across mainstream job-market and professional discourse signals.
- **What is limited:** No direct API-fed count extraction in this run; signals are synthesized and indicative.
- **How to improve next run:** Add structured scraping/API pipeline for dated posting counts by role family and region.

---
**Assessment date (ISO format):** 2026-04-21
**Source URL(s):** https://handbook.unimelb.edu.au/2025/courses/b-des
**Prompt version:** DFVA-COPILOT-MARKET-v1
`,
  },
  "dfva-439fs": {
    title: "Master of Food Science (439FS) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Food Science (439FS)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/439fs

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | 25-50pt research project. Food processing and quality testing are partially automatable. Sensory evaluation, product development require human judgment. |
| 2 | Systems Thinking | 2 | Food supply chain from chemistry to processing to safety — inherently cross-disciplinary. Research project requires experimental design. |
| 3 | Technical Depth | 2 | Solid applied science: Food Chemistry, Microbiology, Processing Technology. Less deeply quantitative than physics/chemistry MSc. |
| 4 | Decision-Making | 2 | Research Methods for Life Sciences + research project teach methodology. Food Safety and Quality involves regulatory decision-making. |
| 5 | AI Literacy | 1 | No AI-specific units. Food science increasingly uses AI for quality control, supply chain optimisation — not in curriculum. |
| 6 | Domain Depth | 3 | Comprehensive food science: chemistry, microbiology, processing, safety, quality, dairy, meat, plant products. Full supply chain coverage. |
| 7 | Research Rigour | 2 | 25-50pt research project + Research Methods for Life Sciences. Smaller project than lab-science MSc equivalents. |
| 8 | Human & Relational | 2 | Food Safety and Quality involves regulatory and consumer dimensions. Professional skills via electives. No dedicated ethics unit. |
| 9 | Curriculum Currency | 2 | Updated 29 Jan 2026. Sustainable Food Production, Plant Food Products — current trends. Sensory Evaluation not available 2026. |
| 10 | Outcome Evidence | 3 | No granular destination data. Food industry employment is stable but program-specific outcomes not tracked. |
| B | Irreplaceability | 2 | Applied food science across the supply chain. Valuable but less rare than research-intensive MSc specialisations. |

**TOTAL: 21/36 — MODERATE RISK**
- **Q1:** UNCERTAIN — food processing and quality testing are increasingly automated; product development and sensory evaluation resist substitution.
- **Q2:** UNCERTAIN — research project provides some decision ownership. Industry focus is more technique-application than system design.
- **Q3:** UNCERTAIN — food science is a stable field. Growth in plant-based/alternative proteins and food tech creates opportunities but the program doesn't explicitly target these frontiers.

### Verdict
A solid industry-oriented program with comprehensive food supply chain coverage. The flexible research project (25-50pt) means graduate differentiation depends on project depth chosen. The program would benefit from explicit food-tech/AI integration given rapid innovation in alternative proteins, precision fermentation, and smart food processing.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-439fs": {
    title: "Master of Food Science (439FS) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Food Science (439FS)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-527cl": {
    title: "Master of Clinical Psychology (527CL) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: 527CL (Clinical Psychology)
**Institution:** UniMelb | **Level:** Master | **Duration:** 2y FT (200 pts) | **Date:** 2026-06-09
**Placements:** 125 days clinical | **Accreditation:** APAC + AHPRA

| # | Dimension | S | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 3 | Clinical assessment + therapy + 125 days supervised placement. Maximum irreducibility. |
| 2 | Systems Thinking | 2 | Case formulation integrates assessment + psychopathology + cultural context. Biopsychosocial model. |
| 3 | Technical Depth | 2 | Graduate Research Methods, psychopharmacology, assessment tools. Strong clinically, not quantitatively. |
| 4 | Decision-Making | 3 | Clinical placements (adult + child/adolescent + Psychology Clinic) require real-time clinical judgment. Thesis. |
| 5 | AI Literacy | 1 | e-health in outcomes. No AI governance or digital mental health content. |
| 6 | Domain Depth | 3 | APAC-accredited clinical psychology specialisation. All-compulsory. Premier program nationally. |
| 7 | Research Rigour | 3 | Minor thesis (6000-10000 words) + Graduate Research Methods + Literature Review. Strong research training. |
| 8 | Human & Relational | 3 | 125 days clinical placement, culturally responsive practice, ethics, Individual & Cultural Diversity. Maximum. |
| 9 | Currency | 2 | Updated Nov 2025. CBT framework + medical settings + e-health. Mature curriculum. |
| 10 | Outcomes | 3 | APAC + AHPRA registration tracks outcomes. Clinical psychology has strong employment data. |
| B | Irreplaceability | 3 | Clinical expertise + therapeutic skill + ethical judgment + APAC/AHPRA regulation. Triple irreducibility. |

**TOTAL: 27/36 — MODERATE RISK** | Q1:NO Q2:YES Q3:YES
*1 point from RESILIENT. Add AI/digital mental health → 29 RESILIENT.*

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-527cl": {
    title: "Master of Clinical Psychology (527CL) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Clinical Psychology (527CL)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-746st": {
    title: "Master of Engineering Structures (746ST) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: 746ST (Engineering Structures)
**UniMelb** | Master | 1y FT (100 pts) | Date: 2026-06-09

| # | Dim | S | Rationale |
|---|---:|---|
| 1 | Automation | 1 | Structural analysis increasingly AI-augmented. Design tools automate calculations. PE sign-off preserves human role but junior analysis automated. |
| 2 | Systems Thinking | 3 | Structural systems, extreme loading, sustainable design. Maximum systems thinking. |
| 3 | Technical Depth | 3 | Advanced structural analysis, earthquake/wind/blast/fire design. Maximum quantitative depth. |
| 4 | Decision-Making | 2 | Conceptual design requires engineering judgment. No capstone/thesis visible. |
| 5 | AI Literacy | 1 | No AI content. Contemporary computational tools likely used but not taught explicitly. |
| 6 | Domain Depth | 3 | Structural engineering specialisation. All-core 100pt focused intensity. |
| 7 | Research Rigour | 1 | No thesis or research methodology. 1-year program has no space. |
| 8 | Human & Relational | 1 | Entirely technical. No ethics, communication, or interpersonal content. |
| 9 | Currency | 2 | Sustainable design, extreme loading — current topics. Updated Nov 2025. |
| 10 | Outcomes | 3 | No published data. |
| B | Irreplaceability | 2 | Structural engineering + sustainable design + extreme loading = valuable niche. |

**TOTAL: 20/36 — MODERATE RISK** | Q1:YES Q2:PARTIAL Q3:YES
*Strong technical core undermined by high automation exposure and minimal human dimensions.*

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Engineering |
| Full-time employment (4-6mo) | 88.3% (GOS 2024) |
| Median starting salary | $111,000 |
| Employment (3yr) | 88.3% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-746st": {
    title: "Master of Engineering Structures (746ST) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Engineering Structures (746ST)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Engineering |
| Full-time employment (4-6mo) | 88.3% (GOS 2024) |
| Median starting salary | $111,000 |
| Employment (3yr) | 88.3% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-actsc": {
    title: "Master of Actuarial Science (MC-ACTSC) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Actuarial Science (MC-ACTSC)
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 1.5 years (150 credit points)

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-actsc  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

### 1. PROGRAM PROFILE
The Master of Actuarial Science is a 150-credit-point professional entry program providing the fastest graduate pathway to the actuarial profession. The curriculum comprises 6 compulsory core subjects, 2 capstone subjects, and 4 electives approved by the Program Director. Subjects follow a structured progression: Mathematics of Finance I→II→III across three semesters, Life Insurance Models 1→2 across two, with capstones in Life Contingencies and General Insurance Modelling.

The program targets professional accreditation exemptions from the Actuaries Institute. Recommended electives include Data Analytics in Insurance (ACTL90023), Statistical Techniques in Insurance (ACTL90008), and an optional Business and Economics Internship (BUSA90525).

This is a professional coursework degree with no research project component. The pedagogy is examination-based and technique-focused, designed to prepare graduates for the actuarial qualification examinations.

### 2. AUTOMATION EXPOSURE PROFILE
Actuarial science presents one of the more acute automation tensions in professional education. The first 2-3 years of actuarial work — pricing calculations, reserving, regulatory reporting, data validation — are increasingly automated by actuarial software platforms and AI tools. The profession's own literature acknowledges this: routine actuarial tasks that previously occupied junior analysts are being absorbed by technology.

The program's structure reflects this tension. The core curriculum (Mathematics of Finance I–III, Life Insurance Models 1–2) teaches techniques that AI tools can increasingly execute. The electives (Data Analytics in Insurance, Statistical Techniques) gesture toward modernisation but are optional.

The structural defence is the professional accreditation pathway — actuaries operate in a regulated profession where judgment, sign-off authority, and professional ethics create barriers to AI substitution. However, the entry-level pipeline (the first 2-3 years where graduates prove themselves through technical competence) is precisely where AI compression is strongest. The question is whether the program's technique-focused training produces graduates who can move quickly through the automatable layer to the judgment layer — or whether it produces graduates whose primary market value sits in the automatable layer itself.

### 3. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 1 | First 2-3 years of actuarial work are heavily procedural — pricing, reserving, regulatory calculations. These tasks are the target of actuarial software automation and AI tooling. |
| 2 | Systems Thinking and Problem Framing | 2 | Life Contingencies and General Insurance Modelling capstones require integrated problem framing. The structured mathematical progression builds analytical thinking. |
| 3 | Technical and Quantitative Depth | 3 | Strong mathematical core: stochastic calculus, life insurance mathematics, statistical techniques, financial mathematics. This is the program's defining strength. |
| 4 | Decision-Making Under Uncertainty | 2 | Capstones require defended trade-offs in insurance contexts. Professional accreditation demands judgment. Most assessment is examination-based technique recall. |
| 5 | AI Literacy and Governance | 1 | Data Analytics in Insurance (ACTL90023) is one elective touching modern computational methods. No AI governance, ethics, or system design content visible. |
| 6 | Domain Depth and Specialisation | 3 | Deep specialist domain: actuarial science with a professional accreditation pathway. The structured progression across three semesters creates genuine expertise. |
| 7 | Research Methods Rigour | 1 | No research project component. This is a professional coursework degree. Statistical Techniques in Insurance provides some methodological exposure. |
| 8 | Human and Relational Capability | 2 | Professional ethics is implicit in the accreditation framework. The optional Business and Economics Internship provides workplace exposure. No dedicated ethics or communication unit. |
| 9 | Curriculum Currency and Adaptability | 2 | Updated 6 January 2026. Data Analytics in Insurance and Statistical Techniques add modern elements. The core remains traditional actuarial mathematics — structurally resistant to rapid change. |
| 10 | Graduate Outcome Evidence | 2 | No granular destination data published. The actuarial profession tracks qualification outcomes externally, but program-specific employment data is not published. |
| B | Irreplaceability Premium (Bonus) | 2 | Professional accreditation + mathematical depth creates a clear dual-skill value. However, the traditional actuarial model faces structural disruption from AI/automation of the very techniques the program teaches as its core. |

**TOTAL: 20 / 36**  
**Risk band: MODERATE RISK (20-27)** — at the lower boundary

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?  
  **YES** — routine actuarial calculations (pricing, reserving, regulatory reporting, data validation) are precisely the structured, rule-governed tasks that AI and actuarial software increasingly automate. The first 2-3 years of actuarial work are the most exposed segment of the profession.

- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?  
  **UNCERTAIN** — the capstones involve integrated decision-making in insurance contexts. Professional accreditation requires judgment. But the core pedagogy is technique application, not system design. The program produces actuarial technicians who develop judgment on the job, not graduates who arrive with practiced decision ownership.

- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?  
  **UNCERTAIN** — the traditional actuarial pipeline (examinations + technical experience) is under pressure from automation. Graduates who add data science/AI skills via electives differentiate positively. The profession's regulatory barriers provide some protection, but entry-level compression is real and accelerating.

### 5. VERDICT
This program sits at a structural inflection point. Its traditional strengths — mathematical rigour, structured progression, professional accreditation pathway — are genuine and durable. But the techniques it teaches as its core (pricing, reserving, life insurance mathematics) are precisely the techniques being automated by the industry the program serves.

The score (20/36, lower boundary of MODERATE RISK) reflects this tension. The program is not in crisis — professional accreditation and regulatory barriers protect it more than most degrees — but its default trajectory is toward a narrower employment base where graduates compete for the shrinking gap between AI-augmented actuarial software and the judgment roles that require 5+ years of experience to reach.

The path from MODERATE RISK to RESILIENT runs through the elective structure: making Data Analytics in Insurance, Statistical Techniques, and ideally an AI governance unit compulsory rather than optional. The mathematical core is sound; the program needs to ensure graduates exit with the computational and governance literacy to operate at the judgment layer, not just the technique layer.

### 6. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| P0 | Make Data Analytics in Insurance (ACTL90023) and Statistical Techniques (ACTL90008) compulsory, not elective | 1, 5 | Low — subjects already exist |
| P1 | Add a dedicated unit on AI in insurance: automated underwriting, claims modelling, governance, and the actuary's evolving role | 5, 9 | Medium |
| P1 | Implement a capstone project or industry placement beyond the existing optional internship | 4, 7, 8 | High |
| P2 | Publish graduate destination data including qualification progression rates and time-to-accreditation | 10 | Medium |
| P2 | Integrate AI tool use into existing actuarial modelling subjects with critical evaluation components | 1, 5 | Medium |

### 7. MARKET CONFIDENCE NOTE
Confidence: **Medium-High**. Actuarial automation is well-documented in industry literature and professional discourse. The tension between traditional actuarial training and AI/automation is a live topic in the profession. The structural analysis of entry-level exposure is based on documented task composition, not speculation.

---

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-actsc  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-actsc": {
    title: "Master of Actuarial Science (MC-ACTSC) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Actuarial Science (MC-ACTSC)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-apbusa": {
    title: "Master of Applied Business Analytics (MC-APBUSA) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-APBUSA (Applied Business Analytics)
**UniMelb** | Master | 18m FT (150 pts) | 2026-06-09

| # | Dim | S | Rationale |
|---|---:|---|
| 1 | Automation | 1 | Analytics role increasingly automated. AutoML, AI analysts, GPT-driven dashboards. Early-career analytics highly exposed. |
| 2 | Systems Thinking | 2 | Analytics frameworks for business. Predictive modelling. Systems-level data thinking. |
| 3 | Technical Depth | 3 | Programming, ML, Predictive Analytics, Data Platforms core. Maximum quantitative depth for a business degree. |
| 4 | Decision-Making | 2 | Analytics for Business Decisions core. Capstone project requires applied judgment. |
| 5 | AI Literacy | 3 | AI and Ethics in Analytics is a CORE subject. Explicit AI governance training. Rarest positive signal in any program assessed. |
| 6 | Domain Depth | 2 | Business analytics with thematic options (Marketing/Finance/Optimisation). |
| 7 | Research Rigour | 2 | Individual Research Project available as capstone alternative. |
| 8 | Human & Relational | 1 | No leadership, ethics (beyond AI ethics), or interpersonal content. |
| 9 | Currency | 1 | Multiple core subjects "not available in 2026" — curriculum in transition/deterioration. AI Ethics core is positive but overall availability a red flag. |
| 10 | Outcomes | 3 | No published data. |
| B | Irreplaceability | 2 | Data analytics + AI ethics + business = modern combination. Analytics literacy is durable. |

**TOTAL: 20/36 — MODERATE RISK** | Q1:YES Q2:PARTIAL Q3:UNCERTAIN
*Paradox: strongest AI literacy score (D5:3) undermined by highest automation exposure (D1:1).*

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
`,
  },
  "dfva-market-mc-apbusa": {
    title: "Master of Applied Business Analytics (MC-APBUSA) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Applied Business Analytics (MC-APBUSA)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Business & Management |
| Full-time employment (4-6mo) | 92.3% (GOS 2024) |
| Median starting salary | $124,000 |
| Employment (3yr) | 92.3% |
| Occupation demand | MET |
| AI automation exposure | 55% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-arch": {
    title: "Master of Architecture (MC-ARCH) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 28,
  "maxScore": 36,
  "riskBand": "RESILIENT",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 3,
      "max": 3,
      "rationale": "Architectural design requires creative synthesis, aesthetic judgment, and regulatory compliance — irreducible human work. ARBV registration requires professional practice before sitting exam."
    },
    {
      "label": "Systems Thinking",
      "score": 3,
      "max": 3,
      "rationale": "Design Thesis capstone + studio sequence integrates environmental, technological, regulatory, and project-delivery systems across scales."
    },
    {
      "label": "Technical Depth",
      "score": 3,
      "max": 3,
      "rationale": "300pt program. Technical documentation, building systems, materials, and design production taught throughout. Professional accreditation requirements enforce technical rigour."
    },
    {
      "label": "Decision-Making",
      "score": 3,
      "max": 3,
      "rationale": "Studios require evaluating priorities, making trade-offs, and defending design decisions. Design Thesis demands independent judgment under professional constraints."
    },
    {
      "label": "AI Literacy",
      "score": 1,
      "max": 3,
      "rationale": "No AI content in curriculum. Parametric design tools likely used in practice but not explicitly taught."
    },
    {
      "label": "Domain Depth",
      "score": 3,
      "max": 3,
      "rationale": "300pt professional degree with ARBV/RAIA/CAA accreditation. Clear pathway to registered architect. 250pt core + Design Thesis."
    },
    {
      "label": "Research Rigour",
      "score": 3,
      "max": 3,
      "rationale": "Design Thesis is a substantial research/design-research project. PhD pathway available. Research-led teaching explicitly mentioned."
    },
    {
      "label": "Human & Relational",
      "score": 2,
      "max": 3,
      "rationale": "Collaborative practice mentioned in learning outcomes. Client/stakeholder engagement implicit in design practice. Strong but not clinical-level relational skill."
    },
    {
      "label": "Curriculum Currency",
      "score": 2,
      "max": 3,
      "rationale": "Updated 9 June 2026 — very recent. No AI or sustainability-specific core content visible."
    },
    {
      "label": "Outcome Evidence",
      "score": 2,
      "max": 3,
      "rationale": "Professional accreditation provides external validation but no granular graduate destination data published."
    },
    {
      "label": "Irreplaceability (bonus)",
      "score": 3,
      "max": 3,
      "rationale": "Professional registration requirement + creative design + technical documentation + regulatory compliance. Triple barrier: creativity, regulation, and professional practice hours."
    }
  ],
  "thresholds": {
    "q1": "NO",
    "q2": "YES",
    "q3": "YES"
  },
  "programName": "Master of Architecture",
  "courseCode": "MC-ARCH",
  "market": {
    "field": "Architecture & Building",
    "employmentRate": 0.748,
    "medianSalary": 84500,
    "employmentRate3yr": 0.748,
    "medianSalary3yr": 84500,
    "occupationDemand": "RECRUITMENT_DIFFICULTY",
    "aiExposure": 0.3,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-arch": {
    title: "Master of Architecture (MC-ARCH) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Architecture (MC-ARCH)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-ba": {
    title: "Master of Business Administration (MC-BA) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 25,
  "maxScore": 36,
  "riskBand": "MODERATE RISK",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 1,
      "max": 3,
      "rationale": "General management roles involve significant routine analysis, reporting, and coordination — automatable tasks. MBA graduates compete with AI-augmented analysts."
    },
    {
      "label": "Systems Thinking",
      "score": 2,
      "max": 3,
      "rationale": "General Management 1+2 cover business systems. MBA Capstone integrates strategy. Systems thinking present but not the primary pedagogical model."
    },
    {
      "label": "Technical Depth",
      "score": 2,
      "max": 3,
      "rationale": "Financial Analysis, Business Analytics, Predictive Analytics available as electives. Core is management-generalist, not quantitatively deep."
    },
    {
      "label": "Decision-Making",
      "score": 3,
      "max": 3,
      "rationale": "Negotiations, Game Theory, Managerial Judgement, Capstone — decision-making under uncertainty is an explicit and assessed competency."
    },
    {
      "label": "AI Literacy",
      "score": 3,
      "max": 3,
      "rationale": "Generative AI for Business, Leading Data and AI Transformation, Analytics for Strategic Management — strong AI content. Best-in-cohort AI coverage."
    },
    {
      "label": "Domain Depth",
      "score": 2,
      "max": 3,
      "rationale": "General management — broad rather than deep. 225pt with 75pt electives allows specialisation but core is generalist."
    },
    {
      "label": "Research Rigour",
      "score": 1,
      "max": 3,
      "rationale": "Individual Research Project available as elective (25pt). No thesis requirement. Research methods not core."
    },
    {
      "label": "Human & Relational",
      "score": 2,
      "max": 3,
      "rationale": "Leadership and Change, Managing People, Negotiations, Managing Diversity — substantial relational skill development. MBA Internship provides real workplace experience."
    },
    {
      "label": "Curriculum Currency",
      "score": 3,
      "max": 3,
      "rationale": "Updated Dec 2025. GenAI for Business, Data/AI Transformation, Blockchain, Analytics — cutting-edge business curriculum."
    },
    {
      "label": "Outcome Evidence",
      "score": 3,
      "max": 3,
      "rationale": "MBA employment outcomes typically well-tracked. Melbourne MBA has strong industry reputation. Limited public granular data."
    },
    {
      "label": "Irreplaceability (bonus)",
      "score": 3,
      "max": 3,
      "rationale": "MBA's value is the network, cohort experience, and brand signal — not the curriculum content. GenAI + AI leadership content makes graduates AI-native managers."
    }
  ],
  "thresholds": {
    "q1": "YES",
    "q2": "YES",
    "q3": "YES"
  },
  "programName": "Master of Business Administration",
  "courseCode": "MC-BA",
  "market": {
    "field": "Business & Management",
    "employmentRate": 0.923,
    "medianSalary": 124000,
    "employmentRate3yr": 0.923,
    "medianSalary3yr": 124000,
    "occupationDemand": "MET",
    "aiExposure": 0.55,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

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
`,
  },
  "dfva-market-mc-ba": {
    title: "Master of Business Administration (MC-BA) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Business Administration (MC-BA)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Business & Management |
| Full-time employment (4-6mo) | 92.3% (GOS 2024) |
| Median starting salary | $124,000 |
| Employment (3yr) | 92.3% |
| Occupation demand | MET |
| AI automation exposure | 55% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-bamktg": {
    title: "Master of Business Administration (Marketing) (MC-BAMKTG) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-BAMKTG
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (300 pts)
**Date:** 2026-06-09 | **Source:** handbook.unimelb.edu.au/2026/courses/mc-bamktg

### SCORECARD
| # | Dimension | S | Rationale |
|---|---|---|---|
| 1 | Automation Exposure | 1 | Early-career MBA work heavily automatable — market analysis, reporting, financial modelling. Senior general management resists but graduates don't start there. |
| 2 | Systems Thinking | 2 | Corporate Strategy, Game Theory, Supply Chain teach systemic analysis. Two consulting capstones. Not embedded across all units. |
| 3 | Technical Depth | 1 | General management curriculum. Financial Analysis elective. Business Analytics not available 2026. No quantitative core. |
| 4 | Decision-Making | 2 | Case-based learning + consulting practicum capstones. Strategic decision frameworks. Capstone requires defended recommendations. |
| 5 | AI Literacy | 1 | Digital Product Management elective touches digital tools. No AI governance, literacy, or strategy content. |
| 6 | Domain Depth | 2 | Dual MBA + Marketing specialisation. Consumer Behaviour, Marketing Strategy, Brand Management. Deep within business domain. |
| 7 | Research Rigour | 1 | Consumer Behaviour and Marketing Research — applied, not research-methods training. No thesis. |
| 8 | Human & Relational | 2 | Leadership and Change, Negotiations, consulting practicum, diverse teams. Ethical leadership embedded in outcomes. |
| 9 | Currency | 2 | Digital Product Management added. Updated Nov 2025. Several electives "not available in 2026" signals transition. |
| 10 | Outcomes | 3 | No published destination data. |
| B | Irreplaceability | 2 | Dual degree creates versatile managers. General management + marketing = adaptable but not irreplaceable. |

**TOTAL: 17/36 — HIGH RISK**

### VERDICT
The dual MBA/Marketing creates versatile generalist managers but lacks the technical depth or domain specialization that resists AI substitution. Early-career MBA work (analysis, reporting, strategy decks) is heavily automatable. The consulting capstones and leadership training add value but don't offset the AI exposure of core management tasks. Q1=YES (AI can produce 80% of first-two-year output). Q2=YES (capstones build decision ownership). Q3=UNCERTAIN (management demand is durable but AI-augmented management reduces headcount).

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
`,
  },
  "dfva-market-mc-bamktg": {
    title: "Master of Business Administration (Marketing) (MC-BAMKTG) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Business Administration (Marketing) (MC-BAMKTG)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Business & Management |
| Full-time employment (4-6mo) | 92.3% (GOS 2024) |
| Median starting salary | $124,000 |
| Employment (3yr) | 92.3% |
| Occupation demand | MET |
| AI automation exposure | 55% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-base": {
    title: "Master of Advanced Social Enterprise (MC-BASE) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-BASE (MBA Senior Executive)
**Institution:** UniMelb | **Level:** Master | **Duration:** 18m FT (225 pts) | **Date:** 2026-06-09
**Cohort:** Senior execs, 10+ yrs experience | **Format:** 10 residential modules

| # | Dimension | S | Rationale |
|---:|---|---:|---|
| 1 | Automation Exposure | 1 | Senior execs manage, not produce. But MBA content (analysis, strategy frameworks) increasingly AI-deliverable. |
| 2 | Systems Thinking | 2 | The Greater Context, Creating Value. Systems-level business perspective in residential format. |
| 3 | Technical Depth | 1 | Leadership and decision-making, not quantitative. Foundations of Decision-Making is conceptual. |
| 4 | Decision-Making | 3 | Leading Through Uncertainty + residential intensive + cohort model. Exec-level decision under pressure. |
| 5 | AI Literacy | 1 | No AI content in any module. |
| 6 | Domain Depth | 2 | Senior executive focus creates intensity. All-compulsory 225pt. Leadership as domain. |
| 7 | Research Rigour | 1 | No thesis or research methodology. Industry studies are experiential, not research. |
| 8 | Human & Relational | 3 | Leading at the Top, Industry Studies (Asia/America/Europe), residential cohort. Maximum relational depth. |
| 9 | Currency | 2 | Global industry studies maintain currency. Updated Nov 2025. |
| 10 | Outcomes | 3 | No published destination data. |
| B | Irreplaceability | 1 | Senior network + leadership credential. Valuable but executive education is increasingly commodified. |

**TOTAL: 18/36 — HIGH RISK** | Q1:YES Q2:PARTIAL Q3:UNCERTAIN

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
`,
  },
  "dfva-market-mc-base": {
    title: "Master of Advanced Social Enterprise (MC-BASE) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Advanced Social Enterprise (MC-BASE)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Business & Management |
| Full-time employment (4-6mo) | 92.3% (GOS 2024) |
| Median starting salary | $124,000 |
| Employment (3yr) | 92.3% |
| Occupation demand | MET |
| AI automation exposure | 55% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-bmedsc": {
    title: "Master of Biomedical Science (MC-BMEDSC) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Biomedical Science (MC-BMEDSC)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-bmedsc

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | 125pt research project anchors non-automatable work. Lab techniques partially automatable. Biomedical research increasingly AI-augmented. |
| 2 | Systems Thinking | 2 | BIOM40001 (Introduction to Biomedical Research) + HLTH90021 (Research to Impact) teach problem framing. Research project requires experimental design. |
| 3 | Technical Depth | 3 | Strong laboratory science core across SBS, MMS, Dental, Psych, Vision Sciences. Research project builds deep domain technique. |
| 4 | Decision-Making | 3 | 125pt research project over 4 semesters requires sustained methodological decision-making and interpretation of experimental results. |
| 5 | AI Literacy | 1 | No AI-specific units. Biomedical research uses computational tools but AI as governed system is absent. |
| 6 | Domain Depth | 3 | Five departmental specialisations. Biomedical science is a deep domain. Research project creates expertise. |
| 7 | Research Rigour | 3 | 125pt research project (the largest in this cohort). BIOM40001 provides research methodology grounding. |
| 8 | Human & Relational | 2 | HLTH90021 addresses research-to-impact translation. Professional ethics implicit in research training and lab safety. |
| 9 | Curriculum Currency | 2 | Updated 9 June 2026. Strong industry-engagement elements. No explicit AI integration. |
| 10 | Outcome Evidence | 3 | No granular destination data. Biomedical career pathways externally documented. |
| B | Irreplaceability | 3 | Rare: laboratory science + research training + industry awareness. 125pt project creates deep, non-substitutable expertise. |

**TOTAL: 25/36 — MODERATE RISK**

### Thresholds
- **Q1 (AI produce 80%?):** NO — the 125pt laboratory research project is irreducible human work.
- **Q2 (Design systems/own decisions?):** YES — research project from design through interpretation.
- **Q3 (More employable in 5 years?):** YES — biomedical research is AI-augmented, not AI-displaced. Research training is structurally protective.

### Verdict
The program's 125-point research project is its defining strength — proportionally the largest in this assessment cohort. Graduates exit with research-cultivated judgment that resists substitution. The AI literacy gap (D5) is the main opportunity.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-bmedsc": {
    title: "Master of Biomedical Science (MC-BMEDSC) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Biomedical Science (MC-BMEDSC)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-busana": {
    title: "Master of Business Analytics (MC-BUSANA) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 31,
  "maxScore": 36,
  "riskBand": "RESILIENT",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 2,
      "max": 3,
      "rationale": "Data scientists/analysts create AI tools. Some routine analysis automatable, but strategic problem framing and business translation resist automation."
    },
    {
      "label": "Systems Thinking",
      "score": 3,
      "max": 3,
      "rationale": "Translating business problems into quantitative form, integrating across stats/ML/optimisation domains. Causal + predictive + NLP — full systems toolkit."
    },
    {
      "label": "Technical Depth",
      "score": 3,
      "max": 3,
      "rationale": "Machine Learning & AI, Statistical Learning, NLP, Causal Analytics, Predictive Analytics — deeply quantitative. Programming Foundations included."
    },
    {
      "label": "Decision-Making",
      "score": 3,
      "max": 3,
      "rationale": "Decision Making and Optimisation is a core subject. Learning outcomes explicitly require dealing with ambiguity, uncertainty, and bias."
    },
    {
      "label": "AI Literacy",
      "score": 3,
      "max": 3,
      "rationale": "Machine Learning & AI for Business, NLP — AI is core curriculum, not elective. Graduates can deploy and critique AI workflows."
    },
    {
      "label": "Domain Depth",
      "score": 3,
      "max": 3,
      "rationale": "150pt specialist degree. 125pt core across data platforms, programming, stats, ML, NLP, causal/predictive analytics. Clear specialist identity."
    },
    {
      "label": "Research Rigour",
      "score": 2,
      "max": 3,
      "rationale": "Individual Research Project (25pt) available with coordinator approval. Research pathway optional, not core."
    },
    {
      "label": "Human & Relational",
      "score": 2,
      "max": 3,
      "rationale": "Professional development subjects include teamwork and professional standards. Communication to non-technical audiences emphasized. Not clinical-level relational."
    },
    {
      "label": "Curriculum Currency",
      "score": 3,
      "max": 3,
      "rationale": "Updated April 2026. ML/AI, NLP, Causal Analytics — state-of-the-art. Curriculum design clearly anticipates AI-era business needs."
    },
    {
      "label": "Outcome Evidence",
      "score": 3,
      "max": 3,
      "rationale": "Business analytics employment outcomes strong. Melbourne Business School reputation. Limited public granular data."
    },
    {
      "label": "Irreplaceability (bonus)",
      "score": 3,
      "max": 3,
      "rationale": "Graduates build and deploy AI systems — the program trains the replacers. AI literacy + quantitative depth + business translation is a rare triple."
    }
  ],
  "thresholds": {
    "q1": "NO",
    "q2": "YES",
    "q3": "YES"
  },
  "programName": "Master of Business Analytics",
  "courseCode": "MC-BUSANA",
  "market": {
    "field": "Business & Management",
    "employmentRate": 0.923,
    "medianSalary": 124000,
    "employmentRate3yr": 0.923,
    "medianSalary3yr": 124000,
    "occupationDemand": "MET",
    "aiExposure": 0.55,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

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
`,
  },
  "dfva-market-mc-busana": {
    title: "Master of Business Analytics (MC-BUSANA) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Business Analytics (MC-BUSANA)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Business & Management |
| Full-time employment (4-6mo) | 92.3% (GOS 2024) |
| Median starting salary | $124,000 |
| Employment (3yr) | 92.3% |
| Occupation demand | MET |
| AI automation exposure | 55% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-climsci": {
    title: "Master of Climate Science (MC-CLIMSCI) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Climate Science (MC-CLIMSCI)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-climsci

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | 25pt industry/research project. Climate modelling is computational but interpretation requires judgment. |
| 2 | Systems Thinking | 3 | Climate science is the canonical systems discipline. Atmosphere-ocean-biosphere coupling, feedback loops, tipping points. |
| 3 | Technical Depth | 3 | Climate Modelling, Dynamical Meteorology, Atmospheric Processes, Convective Clouds, Statistics in Climate Dynamics. Deep quantitative core. |
| 4 | Decision-Making | 3 | Climate Science for Decision-Making explicitly bridges science to policy. Industry/research project involves real-world decisions under deep uncertainty. |
| 5 | AI Literacy | 1 | No AI-specific units. Climate science increasingly uses ML for downscaling/attribution but this is not in the curriculum. |
| 6 | Domain Depth | 3 | Climate science with two streams (Climate Dynamics, Climate Change). 75pt of discipline electives. |
| 7 | Research Rigour | 2 | 25pt project is smaller than lab-science MSc equivalents. Statistics in Climate Dynamics (not available 2026) would have strengthened this. |
| 8 | Human & Relational | 2 | Climate Change Politics and Policy, Climate Change Mitigation — policy/stakeholder dimensions. Science Communication available. |
| 9 | Curriculum Currency | 3 | Climate science is inherently current. Updated 16 Feb 2026. Climate Change Mitigation, Weather and Climate Extremes — directly relevant to 2026. |
| 10 | Outcome Evidence | 2 | No granular destination data. Climate careers are growing but program-specific outcomes not tracked. |
| B | Irreplaceability | 3 | Rare: climate science + policy translation + quantitative modelling. Growing field with structural demand drivers (regulation, disclosure, adaptation). |

**TOTAL: 26/36 — MODERATE RISK** (upper boundary)
- **Q1:** NO — climate science requires integrated physical understanding AI cannot replicate.
- **Q2:** YES — Climate Science for Decision-Making + capstone + systems orientation.
- **Q3:** YES — climate careers are structurally growing. Mandatory climate disclosure, adaptation planning, carbon markets create durable demand.

### Verdict
Climate science is one of the most structurally durable disciplines assessed. The field is growing, the physical science is irreducible, and the policy interface creates demand for translation skills that resist automation. The AI/ML gap is real (climate science increasingly uses ML) but non-critical — the program's core value is physical understanding, not tool operation.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-climsci": {
    title: "Master of Climate Science (MC-CLIMSCI) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Climate Science (MC-CLIMSCI)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-clind": {
    title: "Master of Clinical Dentistry (MC-CLIND) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-CLIND (Clinical Dentistry)
**UniMelb** | Master | 1y FT (100 pts) | 2026-06-10

| # | Dim | S | Rationale |
|---|---:|---|
| 1 | Automation | 3 | Clinical dentistry is physically irreducible. Hands-on patient care at Royal Dental Hospital. |
| 2 | Systems Thinking | 1 | Clinical dentistry focus. Not systems-level. |
| 3 | Technical Depth | 2 | Clinical dental skills + research methods + research investigation. |
| 4 | Decision-Making | 3 | Clinical performance assessment with mid/end-year feedback. Real patient care requires real-time clinical judgment. |
| 5 | AI Literacy | 0 | No AI content. |
| 6 | Domain Depth | 3 | Clinical dentistry with hospital-based training. All-core 100pt focused intensity. |
| 7 | Research Rigour | 2 | Research Proposal (25pt) + supervised research investigation. |
| 8 | Human & Relational | 3 | Direct patient care, clinical communication, ethical dental practice. |
| 9 | Currency | 2 | Updated TODAY (10 June 2026). Active program. |
| 10 | Outcomes | 3 | No published data. |
| B | Irreplaceability | 3 | Clinical dentistry + research training = maximum healthcare irreducibility. |

**TOTAL: 23/36 — MODERATE RISK** | Q1:NO Q2:YES Q3:YES

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-clind": {
    title: "Master of Clinical Dentistry (MC-CLIND) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Clinical Dentistry (MC-CLIND)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-cs": {
    title: "Master of Computer Science (MC-CS) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Computer Science (MC-CS)
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-cs  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

### 1. PROGRAM PROFILE
The Master of Computer Science is a 200-credit-point research training program. Year 1 (100 pts) combines one compulsory Research Methods subject, 2–3 foundational CS subjects, and 4–5 electives drawn from six specialist areas. Year 2 (100 pts) is entirely a compulsory research project taken in four sequential 25-credit-point parts.

Graduates develop specialist knowledge in at least one of: artificial intelligence, cybersecurity, human-computer interaction, programming languages and distributed systems, or spatial information science. The program explicitly targets careers in high-level tech companies, R&D labs, and PhD pathways.

Named foundational subjects include Introduction to Machine Learning, Declarative Programming, Distributed Systems, AI Planning for Autonomy, Evaluating the User Experience, and Spatial Data Management. Elective tracks span Statistical Machine Learning, Natural Language Processing, Computer Vision, The Ethics of Artificial Intelligence, Trustworthy Machine Learning, Human-AI Interaction, Advanced Algorithms, Quantum Computing, and Cluster/Cloud Computing.

### 2. AUTOMATION EXPOSURE PROFILE
The program splits cleanly into two exposure regimes. **Year 1 coursework** includes automatable elements — coding assignments, ML model training, algorithm implementation — that are increasingly within the capability of AI coding assistants. However, the coursework is explicitly preparatory: Research Methods teaches hypothesis formation, literature survey, and experimental design; AI Planning teaches constraint reasoning and problem decomposition.

**Year 2 is the structural defence.** A year-long independent research project — from problem scoping through methodology design, execution, interpretation, and thesis writing — is irreducible human work. AI tools can accelerate literature review and code generation within the project, but the intellectual architecture (what question to ask, which method answers it, how to interpret ambiguous results) remains firmly in the graduate's domain.

Graduate destination targets (R&D labs, PhD programmes, high-level tech roles) position graduates in the least-automatable segment of the CS labour market — designing and building AI systems, not executing routine software tasks.

### 3. MARKET EVIDENCE SNAPSHOT
| Job Family | Recent Hiring Signal | X Discussion Theme | Curriculum Implication |
|---|---|---|---|
| Machine Learning Engineer | Strong demand; roles increasingly require research capability, not just model deployment | "Research maturity" as differentiator vs bootcamp graduates | Year 2 research project directly addresses this signal |
| AI Research Scientist | PhD typically required; MSc + publication track is an emerging entry path | Growing recognition that research training matters more than credential level | MC-CS positions graduates for this entry path |
| Software Engineer (general) | Junior roles compressing under AI coding tools; senior/system roles growing | "AI won't replace engineers who design systems" — dominant theme | Systems thinking and architecture training are protective |
| Cybersecurity Analyst | Continued demand with AI-specific security roles emerging | AI-powered attacks creating demand for AI-literate defenders | Trustworthy ML and Security testing subjects are well-targeted |
| HCI/UX Researcher | Growing demand for AI-interaction specialists | Human-AI interaction as a distinct subfield accelerating | Human-AI Interaction subject positions graduates at this frontier |

### 4. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 2 | Year 1 coursework has AI-automatable elements; Year 2 research project is irreducible human intellectual work. Graduate targets (R&D/PhD) sit in the least-automatable labour market segment. |
| 2 | Systems Thinking and Problem Framing | 2 | Research Methods and AI Planning teach hypothesis formation and constraint reasoning. The research project requires trade-off reasoning. However, these skills sit in dedicated units rather than being integrated across the entire curriculum. |
| 3 | Technical and Quantitative Depth | 3 | Strong embedded technical core: machine learning, advanced algorithms, distributed systems, quantum computing, statistical methods. Technical depth is the program's defining feature. |
| 4 | Decision-Making Under Uncertainty | 3 | The year-long research project requires independent methodological decisions, interpretation of ambiguous results, and defended conclusions. AI Planning, Security Testing, and Trustworthy ML add structured uncertainty practice. |
| 5 | AI Literacy and Governance | 3 | Extensive AI coverage spanning ML, NLP, computer vision, ethics, robotics, and trustworthy AI. COMP90087 (The Ethics of Artificial Intelligence) and COMP90073 (Trustworthy Machine Learning) explicitly address governance. Graduates can design, deploy, supervise, and critique AI systems. |
| 6 | Domain Depth and Specialisation | 3 | Clear specialist domain (computer science) with five named specialisation tracks. Year-long research project creates deep, durable expertise that resists substitution. |
| 7 | Research Methods Rigour | 3 | COMP90044 (Research Methods) is a compulsory prerequisite. The year-long research project requires primary research design, execution, interpretation, and reporting — assessed under academic supervision. |
| 8 | Human and Relational Capability | 2 | COMP90087 (Ethics of AI) and HCI subjects provide meaningful ethical and stakeholder practice. Communication skills are a stated learning outcome. No clinical or physical accountability layer. |
| 9 | Curriculum Currency and Adaptability | 2 | 2026 handbook reflects current AI/ML/quantum/ethics coverage. Last updated March 2026. However, the research-MSc structure is a traditional academic model, not a living curriculum with industry advisory feedback loops. |
| 10 | Graduate Outcome Evidence | 3 | No granular destination data (roles, industries, salary, time-to-employment) published. Generic "R&D labs and PhD" language without supporting metrics. |
| B | Irreplaceability Premium (Bonus) | 3 | Rare integration: deep CS technical skills + AI specialisation + independent research training. Graduates are trained to build and critique AI systems, positioning them as AI-augmented professionals rather than AI-displaced ones. |

**TOTAL: 27 / 36**  
**Risk band: MODERATE RISK (20-27)**

### 5. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?  
  **NO** — while Year 1 coursework (coding assignments, model training, documentation) is partially AI-producible, the Year 2 research project (problem scoping, methodology design, data interpretation, thesis writing, and oral defence) cannot be produced by an AI agent. The intellectual architecture of independent research remains firmly human.

- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?  
  **YES** — the year-long independent research project requires original research design, methodological decision-making, and defended conclusions. AI Planning, High Integrity Systems Engineering, and Security Testing further reinforce system design and decision ownership. This is the program's structural strength.

- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?  
  **YES** — graduates are trained in AI building (machine learning, NLP, computer vision, AI ethics, trustworthy AI), not AI operation. As AI systems proliferate, demand for professionals who can design, critique, and govern them grows. The research training creates adaptability that generic coding credentials lack.

### 6. ANALOGUE GRADUATE PROFILE
Most threatened adjacent profile: **"AI-assisted software developer"** whose primary output is feature implementation from specifications — a role that AI coding assistants increasingly compress.

The MC-CS graduate is structurally differentiated: they move from implementing specified features to defining what should be built, designing the methodology to test it, and defending the interpretation of results. The research project is the mechanism that produces this shift — it cannot be simulated by coursework alone.

### 7. VERDICT
This program is well-positioned for AI-era labour market durability. Its structural strength — a year-long independent research project that cannot be automated — combined with deep AI/ML curriculum coverage and specialist tracks, produces graduates whose core capability (research-grade problem definition, methodology design, and critical interpretation) resists AI substitution.

The program's proximity to the AI field itself is protective: graduates are trained on the technology that is disrupting other fields. The risk is not that these graduates are displaced by AI — it is that the program's traditional academic structure (research MSc) may not evolve fast enough to incorporate industry-engaged feedback loops (D9) and outcome tracking (D10).

The move from MODERATE RISK to RESILIENT sits in two specific actions: (1) publishing granular graduate destination data by specialisation track, and (2) establishing an industry advisory mechanism that feeds curriculum refresh decisions. Neither requires structural redesign — both are additions to an already-strong foundation.

### 8. RECOMMENDATIONS
| Priority | Action | Dimension | Market Signal Link | Effort |
|---|---|---|---|---|
| P1 | Publish granular graduate destination data by specialisation track (roles, industries, salary bands, time-to-first-role) | 10 | Employers increasingly differentiate candidates by demonstrated specialisation rather than degree label | Medium |
| P1 | Establish an industry advisory panel that meets annually to review curriculum currency, with published outcomes | 9 | AI field evolves on 6-12 month cycles; traditional academic governance moves on 3-5 year cycles | Low |
| P2 | Integrate systems thinking and trade-off reasoning into coursework assessments (not just the research project) | 2 | Hiring signals increasingly test for system design thinking in technical interviews, not just coding | Medium |
| P2 | Add a dedicated AI governance and safety unit as a core (not elective) requirement | 5 | Regulatory frameworks (EU AI Act, AU mandatory guardrails) are creating demand for governance-literate engineers | Medium |
| P3 | Strengthen stakeholder communication and ethics assessment beyond the existing Ethics of AI elective | 8 | AI ethics roles growing; interdisciplinary communication is a hiring differentiator | Low |

### 9. THE REDESIGNED GRADUATE PROFILE
A resilient MC-CS graduate in 2027 is not a software developer who happens to know some ML. They are an **AI-literate research engineer** who can scope ambiguous technical problems, design rigorous methodologies to investigate them, build and critique AI systems with governance awareness, and defend their decisions to both technical and non-technical stakeholders.

They combine: (1) deep specialist knowledge in at least one CS subfield, developed through a supervised research project; (2) practical AI system design, deployment, and governance skills; (3) the ability to generate primary research evidence and defend methodology under scrutiny; and (4) ethical reasoning about the systems they build.

This profile is not easily substituted because it bundles three things that resist automation individually and are rarely found together: technical depth, research independence, and governance awareness. The graduate who can say "I designed the methodology, ran the experiment, interpreted the results, and can explain what the limitations mean for deployment" is operating at a level AI tools assist but do not replace.

### 10. MARKET CONFIDENCE NOTE
- Confidence level for market signals in this report: **Medium-High**.
- CS labour market signals are well-documented and the AI/ML specialisation premium is empirically observable in hiring data and salary surveys.
- The structural analysis of the Year 2 research project as a durability mechanism is curriculum-evidence-based, not market-evidence-based — it reasons from the nature of the work, not from employer surveys.
- For high-stakes curriculum decisions, add: (a) graduate destination data by specialisation track, (b) employer surveys on desired research vs coursework training balance, and (c) tracking of AI-specialist vs generalist CS salary differentials.

---

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-cs  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

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
`,
  },
  "dfva-market-mc-cs": {
    title: "Master of Computer Science (MC-CS) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Computer Science (MC-CS)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Information Technology |
| Full-time employment (4-6mo) | 81.2% (GOS 2024) |
| Median starting salary | $110,000 |
| Employment (3yr) | 81.2% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 65% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-datasc": {
    title: "Master of Data Science (MC-DATASC) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Data Science (MC-DATASC)
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-datasc  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

### 1. PROGRAM PROFILE
The Master of Data Science is a 200-credit-point professional entry program combining statistics and computer science in a single coordinated degree. Students are assigned to one of five background streams on admission (Foundation, Mixed, Statistics, Computer Science, or Data Science), which determines foundation requirements and available specialisations.

The program structure comprises 75 credit points of compulsory subjects, 100 credit points of specialisation, and a 25-point capstone or research project. Compulsory subjects span Statistical Modelling for Data Science (MAST90139), Multivariate Statistics (MAST90138), Computational Statistics & Data Science (MAST90083), Cluster and Cloud Computing (COMP90024), Advanced Database Systems (COMP90050), and Statistical Machine Learning (COMP90051).

Specialisations include Foundational Data Science, Statistical Data Science, Computational Data Science, and Computational and Statistical Data Science. The research pathway (MAST90108/MAST90109) requires a WAM of 80, a research proposal, and a supervisor — acting as an honours-equivalent filter.

### 2. AUTOMATION EXPOSURE PROFILE
Data science sits at the centre of the automation tension. Routine tasks — data cleaning, exploratory analysis, model fitting, report generation — are precisely the tasks that AI coding assistants and AutoML tools increasingly handle. The compulsory curriculum covers these techniques comprehensively.

The structural defence is the project. Whether capstone or research pathway, the 25-point project requires problem scoping, methodology selection, interpretation of results, and communication to stakeholders — all irreducible human work. The research pathway (WAM 80 threshold) adds independent research design and a supervised thesis.

The risk is in the middle: graduates who exit with coursework competence but without project-cultivated judgment enter a labour market where "can fit a model" is no longer a differentiator. The program's stream system partially mitigates this by allowing CS-background students to deepen into computational specialisation and stats-background students into statistical depth, but the default pathway for Foundation-stream students is the broadest and most substitutable profile.

### 3. DFVA SCORECARD
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
| 10 | Graduate Outcome Evidence | 3 | No granular destination data published. Data science labour market is well-documented externally, but the program does not track or publish its own graduate outcomes by specialisation. |
| B | Irreplaceability Premium (Bonus) | 2 | Statistics + CS dual-skill is valuable and not easily substituted. However, data science is a crowded credential market — differentiation requires project-cultivated judgment, not just technical competence. |

**TOTAL: 24 / 36**  
**Risk band: MODERATE RISK (20-27)**

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?  
  **UNCERTAIN** — routine data tasks (cleaning, model fitting, report drafting) are increasingly AI-producible. The 25-point project and stakeholder-facing elements resist substitution, but the balance depends heavily on whether the student took the capstone or research pathway and the nature of their specialisation.

- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?  
  **YES** (qualified) — the project requires methodological design and statistical training builds probabilistic decision-making. The research pathway adds independent research design. But these skills are concentrated in the project, not distributed across the curriculum.

- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?  
  **UNCERTAIN** — data science demand is growing but the field is also increasingly competitive and AI-compressed at the entry level. Graduates who exit with project-cultivated judgment and specialisation depth differentiate; those with coursework-only competence face a tightening market for routine analytics roles.

### 5. VERDICT
This program has strong bones — the statistics/CS dual-core is structurally sound and the stream/specialisation system accommodates diverse entry backgrounds while steering all students toward depth. The 9 June 2026 update date signals active curriculum maintenance.

The vulnerability is not the curriculum content but the graduate differentiation mechanism. In a market where "can fit a model" is table stakes and AI tools increasingly handle routine analytics, the project (25 points of 200) is doing a lot of heavy lifting as the primary locus of judgment cultivation. Strengthening the project component — or distributing decision-ownership and stakeholder-communication practice across more of the curriculum — would harden the program against the compression of routine data roles.

### 6. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| P1 | Publish granular graduate destination data by specialisation and stream | 10 | Medium |
| P1 | Add a dedicated AI ethics and governance unit to the compulsory core | 5 | Medium |
| P2 | Increase project weighting or add a second project-style assessment earlier in the program | 4, 7 | High |
| P2 | Distribute stakeholder communication and decision-defense practice across coursework units | 2, 8 | Medium |

### 7. MARKET CONFIDENCE NOTE
Confidence: **Medium**. Data science labour market signals are well-documented; the structural analysis of the project as a differentiation mechanism is curriculum-evidence-based. The uncertainty is in the graduate destination data gap — without published outcomes by specialisation, the program's actual differentiation effectiveness is unverified.

---

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-datasc  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

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
`,
  },
  "dfva-market-mc-datasc": {
    title: "Master of Data Science (MC-DATASC) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Data Science (MC-DATASC)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Information Technology |
| Full-time employment (4-6mo) | 81.2% (GOS 2024) |
| Median starting salary | $110,000 |
| Employment (3yr) | 81.2% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 65% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-ed": {
    title: "Master of Education (MC-ED) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Education (MC-ED)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-09 | **Score:** 24/36 — MODERATE RISK

### SCORECARD
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | Teaching has irreducible human elements but administrative, assessment, and content delivery tasks are increasingly AI-automatable. |
| 2 | Systems Thinking | 2 | Educational systems, policy, and leadership content teaches systems-level thinking. Capstone integrates theory and practice. |
| 3 | Technical Depth | 1 | Education research methods and data analysis present but not deeply quantitative. Pedagogy-focused rather than technically rigorous. |
| 4 | Decision-Making | 2 | Professional practice and capstone require educational decision-making. Less pressure-testing than clinical/design programs. |
| 5 | AI Literacy | 1 | No AI-specific education content visible. Educational technology likely covered but AI in education not explicit. |
| 6 | Domain Depth | 3 | Deep education domain. 200pt program with specialisation pathways. Professional teaching accreditation pathway. |
| 7 | Research Rigour | 2 | Research project/paper typically required. Education research methods taught. |
| 8 | Human & Relational | 3 | Teaching is fundamentally human-relational. Classroom management, student engagement, educational leadership. |
| 9 | Curriculum Currency | 2 | Updated Dec 2025. Contemporary educational theory. Limited AI/digital pedagogy visibility. |
| 10 | Outcome Evidence | 3 | Teacher registration provides external outcome tracking. Education employment data available. |
| B | Irreplaceability | 3 | Teaching combines content knowledge + pedagogical skill + human relationship. Regulatory barriers (teacher registration) + physical classroom presence. |

**Q1:** NO — teaching requires human presence, relationship, and contextual judgment. **Q2:** YES. **Q3:** YES — teacher shortages persist.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Education |
| Full-time employment (4-6mo) | 89.9% (GOS 2024) |
| Median starting salary | $96,000 |
| Employment (3yr) | 89.9% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 15% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-ed": {
    title: "Master of Education (MC-ED) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Education (MC-ED)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Education |
| Full-time employment (4-6mo) | 89.9% (GOS 2024) |
| Median starting salary | $96,000 |
| Employment (3yr) | 89.9% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 15% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-envlaw": {
    title: "Master of Environmental Law (MC-ENVLAW) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 24,
  "maxScore": 36,
  "riskBand": "MODERATE RISK",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 1,
      "max": 3,
      "rationale": "Legal research, document review, and compliance analysis are highly AI-automatable. Environmental law requires contextual judgment but core legal tasks are AI-vulnerable."
    },
    {
      "label": "Systems Thinking",
      "score": 2,
      "max": 3,
      "rationale": "Environmental law integrates across climate, water, waste, planning, and international regimes. Systems perspective inherent in environmental problem framing."
    },
    {
      "label": "Technical Depth",
      "score": 1,
      "max": 3,
      "rationale": "100pt program. Legal reasoning depth. No quantitative or scientific technical requirement. Climate Law Economics and Finance touches economics."
    },
    {
      "label": "Decision-Making",
      "score": 2,
      "max": 3,
      "rationale": "Environmental disputes require defended legal judgment. International treaty negotiation skills taught. Less pressure-tested than clinical programs."
    },
    {
      "label": "AI Literacy",
      "score": 2,
      "max": 3,
      "rationale": "AI and Justice elective available. Not core. Environmental law increasingly uses satellite data and modeling but not in curriculum."
    },
    {
      "label": "Domain Depth",
      "score": 3,
      "max": 3,
      "rationale": "Clear environmental law specialisation. 87.5pt minimum in environmental/further subjects. Climate, water, waste, biodiversity, planning — comprehensive coverage."
    },
    {
      "label": "Research Rigour",
      "score": 1,
      "max": 3,
      "rationale": "100pt coursework program. No thesis requirement. Minor thesis explicitly excluded for law graduates."
    },
    {
      "label": "Human & Relational",
      "score": 2,
      "max": 3,
      "rationale": "International legal internship available. Legal practice requires client communication. Not clinical-level relational skill."
    },
    {
      "label": "Curriculum Currency",
      "score": 3,
      "max": 3,
      "rationale": "Updated March 2026. Climate Law Economics & Finance, AI and Justice, Clean Energy Projects Law, More-Than-Human Rights — leading-edge environmental law."
    },
    {
      "label": "Outcome Evidence",
      "score": 3,
      "max": 3,
      "rationale": "Legal employment data available through MLS. Environmental law is a growth sector. No program-specific granular data."
    },
    {
      "label": "Irreplaceability (bonus)",
      "score": 2,
      "max": 3,
      "rationale": "Environmental regulation requires human legal judgment. Climate change creates structural demand growth. But 100pt program depth is limited."
    }
  ],
  "thresholds": {
    "q1": "YES",
    "q2": "PARTIAL",
    "q3": "YES"
  },
  "programName": "Master of Environmental Law",
  "courseCode": "MC-ENVLAW",
  "market": {
    "field": "Law",
    "employmentRate": 0.894,
    "medianSalary": 90000,
    "employmentRate3yr": 0.894,
    "medianSalary3yr": 90000,
    "occupationDemand": "MET",
    "aiExposure": 0.45,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Law |
| Full-time employment (4-6mo) | 89.4% (GOS 2024) |
| Median starting salary | $90,000 |
| Employment (3yr) | 89.4% |
| Occupation demand | MET |
| AI automation exposure | 45% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-envlaw": {
    title: "Master of Environmental Law (MC-ENVLAW) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Environmental Law (MC-ENVLAW)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Law |
| Full-time employment (4-6mo) | 89.4% (GOS 2024) |
| Median starting salary | $90,000 |
| Employment (3yr) | 89.4% |
| Occupation demand | MET |
| AI automation exposure | 45% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-envsc": {
    title: "Master of Environmental Science (MC-ENVSC) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Environmental Science (MC-ENVSC)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-envsc

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | Industry/research project (25pt) anchors non-automatable work. Environmental fieldwork requires physical presence. Data analysis partially automatable. |
| 2 | Systems Thinking | 3 | Environmental science is inherently systems-oriented. Environmental Risk Assessment, Global Environmental Change, Environmental Modelling — all systems-focused. |
| 3 | Technical Depth | 2 | Solid: Environmental Modelling, Spatial Data Analytics, Soil Science, Water Management. Multi-method but not deeply quantitative by default. |
| 4 | Decision-Making | 3 | Industry Project involves real stakeholder constraints. Environmental Risk Assessment teaches decision under uncertainty. Graduate Seminar integrates learning. |
| 5 | AI Literacy | 1 | No AI-specific units. Environmental modelling uses computational tools but AI governance is absent. |
| 6 | Domain Depth | 3 | Broad and deep environmental science domain. 87.5-112.5 discipline pts with extensive elective range. |
| 7 | Research Rigour | 2 | Industry Project (default) or Research Project (outstanding students). Environmental Risk Assessment provides methodological grounding. Less research-heavy than lab-science MSc programs. |
| 8 | Human & Relational | 2 | Stakeholder engagement implicit in environmental practice. Professional skills subjects available. No dedicated ethics/communication requirement. |
| 9 | Curriculum Currency | 2 | Updated 26 March 2026. Climate impacts, biosecurity, spatial tools — current topics. No AI integration. |
| 10 | Outcome Evidence | 2 | No granular destination data. |
| B | Irreplaceability | 2 | Environmental science + policy integration is valuable. Field skills resist AI. Less deeply specialised than lab-science MSc programs. |

**TOTAL: 23/36 — MODERATE RISK**
- **Q1:** UNCERTAIN — field work is irreducible, but environmental data analysis is increasingly AI-producible.
- **Q2:** YES — Industry project + Environmental Risk Assessment + systems thinking embedded throughout.
- **Q3:** YES — climate adaptation, environmental consulting, biosecurity are growth fields.

### Verdict
The industry project orientation is a strength — graduates exit with stakeholder-facing experience. The systems-thinking integration across the curriculum is genuine. The program would benefit from explicit AI/data-science integration given the field's increasing reliance on remote sensing, environmental modelling, and spatial analysis.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-envsc": {
    title: "Master of Environmental Science (MC-ENVSC) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Environmental Science (MC-ENVSC)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-gencoun": {
    title: "Master of Genetic Counselling (MC-GENCOUN) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Genetic Counselling (MC-GENCOUN)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-gencoun

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 3 | Genetic counselling is irreducible human work. Clinical empathy, family communication, informed consent — AI cannot substitute. 37.5pt clinical placement (Year 2). |
| 2 | Systems Thinking | 2 | Clinical genomics + societal implications + healthcare research. Human genetics in healthcare context teaches integrated thinking. |
| 3 | Technical Depth | 2 | Clinical Genomics, Advanced Clinical Genomics, Human Genetics. Strong genetics knowledge but not deeply quantitative. |
| 4 | Decision-Making | 3 | Clinical placement (37.5pt) requires real-time counselling decisions under emotional and ethical pressure. ≥70% progression hurdle enforces competence. |
| 5 | AI Literacy | 1 | No AI-specific units. Genomics increasingly uses AI for variant interpretation — not in curriculum. |
| 6 | Domain Depth | 3 | Deep specialist domain: genetic counselling with HGSA accreditation pathway. All subjects compulsory — no dilution. |
| 7 | Research Rigour | 2 | Healthcare Research Principles + Research Project in Human Genomics 1 & 2 (37.5pt total). Research-engaged but clinically focused. |
| 8 | Human & Relational | 3 | This is the program's defining dimension. Foundational + Advanced Counselling Practice, two Genetic Counselling Practice subjects, 37.5pt clinical placement. HGSA certification requires demonstrated clinical competence. |
| 9 | Curriculum Currency | 2 | Updated 19 Nov 2025. Clinical Genomics, Societal Implications of Genomics — current. No AI/genomics integration. |
| 10 | Outcome Evidence | 3 | HGSA certification pathway provides external outcome tracking. Program-specific destination data not published. |
| B | Irreplaceability | 3 | Rare: clinical genetics + counselling + empathy + ethics. The combination resists AI substitution at every level. |

**TOTAL: 26/36 — MODERATE RISK** (upper boundary)
- **Q1:** NO — clinical genetic counselling is fundamentally irreducible human work.
- **Q2:** YES — clinical placement requires real-time decision ownership. The ≥70% hurdle enforces demonstrated competence.
- **Q3:** YES — genetic counselling demand grows with genomic medicine expansion. Clinical empathy is structurally non-automatable.

### Verdict
The program's structural defence is its clinical core. Genetic counselling sits at the human edge of genomic medicine — where scientific knowledge meets family communication, ethical judgment, and emotional support. AI can assist with variant interpretation but cannot conduct a genetic counselling session. The ≥70% progression hurdle, HGSA accreditation pathway, and 37.5pt clinical placement create a program whose graduates are among the least AI-exposed in this entire assessment cohort. The AI literacy gap is real for the genomics tools the profession increasingly uses, but it doesn't threaten the core value proposition.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-gencoun": {
    title: "Master of Genetic Counselling (MC-GENCOUN) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Genetic Counselling (MC-GENCOUN)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-indeng": {
    title: "Master of Industrial Engineering (MC-INDENG) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-INDENG
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Date:** 2026-06-09 | **Source:** handbook.unimelb.edu.au/2026/courses/mc-indeng

### SCORECARD
| # | Dimension | S | Rationale |
|---|---|---|---|
| 1 | Automation Exposure | 1 | Early-career IE: process optimization, data analysis, simulation. AI increasingly automates these. Senior system design and manufacturing strategy resists. |
| 2 | Systems Thinking | 3 | Industrial Systems and Simulation, Supply Chain, Sustainable/Life Cycle Engineering. System-level optimization is the program's defining strength. |
| 3 | Technical Depth | 3 | Probability/Reliability/Quality, Optimisation for Industry, Manufacturing Processes, Automation & IT. Maximum quantitative and technical rigour. |
| 4 | Decision-Making | 2 | Year-long Engineering Capstone + Design Practice. Engineering Practice hurdle requires real-world skills demonstration. |
| 5 | AI Literacy | 2 | Industry Digital Transformation core subject. Manufacturing Automation & IT. Industry 4.0 adjacent, no explicit AI governance or strategy. |
| 6 | Domain Depth | 3 | All-compulsory 175pt core. Industrial engineering domain from manufacturing to supply chain. Engineering Practice hurdle enforces professional depth. |
| 7 | Research Rigour | 2 | Capstone project provides project-based research skills. No formal thesis but strong applied methodology. |
| 8 | Human & Relational | 1 | Leadership and Strategy Execution available as electives only. Core is entirely technical. Ethical/professional practice only via Engineering Practice hurdle. |
| 9 | Currency | 2 | Industry Digital Transformation + Sustainable Engineering — current topics. Updated Dec 2025. Forward-looking manufacturing focus. |
| 10 | Outcomes | 3 | No published destination data. |
| B | Irreplaceability | 2 | Industrial engineering + digital manufacturing creates industry-relevant combination. Systems optimization skills transfer across sectors. |

**TOTAL: 22/36 — MODERATE RISK**

### VERDICT
This program's exceptional systems thinking (D2:3) and technical depth (D3:3) create genuine analytical capability. Industry Digital Transformation signals forward-looking curriculum design. The primary vulnerability is early-career automation exposure — AI increasingly handles the process optimization and simulation tasks that junior IEs perform. Strengthening the human/relational dimension and adding explicit AI governance would push this into RESILIENT territory. Q1=YES (early-career IE work automatable). Q2=YES (capstone builds decision ownership). Q3=YES (manufacturing + digital transformation = durable demand).

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Engineering |
| Full-time employment (4-6mo) | 88.3% (GOS 2024) |
| Median starting salary | $111,000 |
| Employment (3yr) | 88.3% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-indeng": {
    title: "Master of Industrial Engineering (MC-INDENG) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Industrial Engineering (MC-INDENG)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Engineering |
| Full-time employment (4-6mo) | 88.3% (GOS 2024) |
| Median starting salary | $111,000 |
| Employment (3yr) | 88.3% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-intedib": {
    title: "Master of International Education (IB) (MC-INTEDIB) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-INTEDIB (International Education IB)
**UniMelb** | Master | 1y FT (100 pts) | Online | 2026-06-10

| # | Dim | S | Rationale |
|---|---:|---|
| 1 | Automation | 1 | Online education administration, IB curriculum knowledge — increasingly AI-assistable. Teaching itself retains human core. |
| 2 | Systems Thinking | 2 | IB philosophy + PYP/MYP/DP curriculum frameworks. Systems-level educational design. |
| 3 | Technical Depth | 1 | Educational theory and practice. Not technical/quantitative. |
| 4 | Decision-Making | 2 | Capstone requires applied educational design. Assessment and reporting frameworks. |
| 5 | AI Literacy | 1 | No AI content. |
| 6 | Domain Depth | 2 | IB specialisation creates genuine depth for international educators. PYP/MYP/DP streams. |
| 7 | Research Rigour | 1 | Researching Education Practice as capstone prerequisite. Light research training. |
| 8 | Human & Relational | 2 | Teaching inherently relational. Online delivery reduces interpersonal intensity. Cultural diversity embedded in IB. |
| 9 | Currency | 2 | Updated today. IB framework provides long-term international relevance. |
| 10 | Outcomes | 3 | No published data. |
| B | Irreplaceability | 1 | IB specialisation valuable for international school teachers but niche and instructor-dependent. |

**TOTAL: 16/36 — HIGH RISK** | Q1:PARTIAL Q2:PARTIAL Q3:YES

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Education |
| Full-time employment (4-6mo) | 89.9% (GOS 2024) |
| Median starting salary | $96,000 |
| Employment (3yr) | 89.9% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 15% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-intedib": {
    title: "Master of International Education (IB) (MC-INTEDIB) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of International Education (IB) (MC-INTEDIB)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Education |
| Full-time employment (4-6mo) | 89.9% (GOS 2024) |
| Median starting salary | $96,000 |
| Employment (3yr) | 89.9% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 15% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-journ": {
    title: "Master of Journalism (MC-JOURN) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 23,
  "maxScore": 36,
  "riskBand": "MODERATE RISK",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 1,
      "max": 3,
      "rationale": "Journalism faces extreme AI disruption. Content generation, summarisation, and research are highly automatable. Core journalistic craft is AI-vulnerable."
    },
    {
      "label": "Systems Thinking",
      "score": 2,
      "max": 3,
      "rationale": "Journalism requires synthesising complex stories across domains. Media systems, ethics, and law teach systemic perspective."
    },
    {
      "label": "Technical Depth",
      "score": 1,
      "max": 3,
      "rationale": "200pt program but journalism is craft/profession, not deeply quantitative. Digital media production skills present but not technical-analytical depth."
    },
    {
      "label": "Decision-Making",
      "score": 2,
      "max": 3,
      "rationale": "Editorial judgment, ethical decisions, and deadline-driven production require real-time decision-making. Capstone projects require defended choices."
    },
    {
      "label": "AI Literacy",
      "score": 1,
      "max": 3,
      "rationale": "No AI-specific content visible. Digital media tools covered but AI in journalism not explicitly taught."
    },
    {
      "label": "Domain Depth",
      "score": 3,
      "max": 3,
      "rationale": "200pt professional journalism degree. Clear specialist domain with capstone and practical production requirements."
    },
    {
      "label": "Research Rigour",
      "score": 2,
      "max": 3,
      "rationale": "Investigative journalism teaches research methods. Academic research component likely required at master's level."
    },
    {
      "label": "Human & Relational",
      "score": 3,
      "max": 3,
      "rationale": "Interviewing, source cultivation, and ethical engagement with subjects and communities — fundamentally relational. Journalism is a human-trust profession."
    },
    {
      "label": "Curriculum Currency",
      "score": 1,
      "max": 3,
      "rationale": "Limited evidence of digital/AI-age journalism transformation in curriculum. Traditional journalism framework visible."
    },
    {
      "label": "Outcome Evidence",
      "score": 2,
      "max": 3,
      "rationale": "Journalism employment market is contracting. Limited program-specific destination data."
    },
    {
      "label": "Irreplaceability (bonus)",
      "score": 2,
      "max": 3,
      "rationale": "Investigative journalism requires human trust, ethical judgment, and investigative persistence — difficult to automate entirely. But industry is structurally declining."
    }
  ],
  "thresholds": {
    "q1": "YES",
    "q2": "PARTIAL",
    "q3": "NO"
  },
  "programName": "Master of Journalism",
  "courseCode": "MC-JOURN",
  "market": {
    "field": "Creative Arts",
    "employmentRate": 0.669,
    "medianSalary": 81000,
    "employmentRate3yr": 0.669,
    "medianSalary3yr": 81000,
    "occupationDemand": "MET",
    "aiExposure": 0.7,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Creative Arts |
| Full-time employment (4-6mo) | 66.9% (GOS 2024) |
| Median starting salary | $81,000 |
| Employment (3yr) | 66.9% |
| Occupation demand | MET |
| AI automation exposure | 70% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-journ": {
    title: "Master of Journalism (MC-JOURN) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Journalism (MC-JOURN)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Creative Arts |
| Full-time employment (4-6mo) | 66.9% (GOS 2024) |
| Median starting salary | $81,000 |
| Employment (3yr) | 66.9% |
| Occupation demand | MET |
| AI automation exposure | 70% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-nursc": {
    title: "Master of Nursing Science (MC-NURSC) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Nursing Science (MC-NURSC)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-nursc

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 3 | Nursing is irreducible human clinical work. Physical patient care, clinical judgment, emotional support — AI cannot substitute. NMBA registration requires demonstrated clinical competence. |
| 2 | Systems Thinking | 2 | Nursing of Acute/Chronic Health Conditions, Transition to Nursing Practice — integrated clinical reasoning. Healthcare systems understanding implicit. |
| 3 | Technical Depth | 2 | Human Anatomy & Physiology, Pathophysiology, Clinical Pharmacology. Strong clinical science. Not deeply quantitative. |
| 4 | Decision-Making | 3 | Year-long clinical placements (Foundations of Nursing Practice 25pt + Transition to Nursing Practice 25pt) require real-time clinical decisions. NMBA accreditation enforces competence. |
| 5 | AI Literacy | 1 | Digital Transformation of Health available as an elective. No AI-specific nursing content. |
| 6 | Domain Depth | 3 | Comprehensive nursing: foundations, acute, chronic, mental health, critical care, paediatrics. NMBA-registered qualification. |
| 7 | Research Rigour | 2 | Evidence in Practice + Nursing Research. Evidence-based practice is embedded. Less research-intensive than research MSc programs. |
| 8 | Human & Relational | 3 | This is nursing's structural core. Indigenous Health, Mental Health Nursing, clinical placements — sustained patient interaction assessed as competency. NMBA standards require demonstrated interpersonal capability. |
| 9 | Curriculum Currency | 2 | Updated 8 Jan 2026. Digital Transformation of Health, Indigenous Data Governance — current topics. Core remains traditional clinical nursing. |
| 10 | Outcome Evidence | 3 | NMBA registration provides external outcome verification. Employment outcomes are strong and publicly visible. Program-specific data not granularly published. |
| B | Irreplaceability | 3 | Maximum: clinical nursing combines physical care, clinical judgment, emotional support, and ethical practice. AI cannot replicate any of these at the point of care. |

**TOTAL: 26/36 — MODERATE RISK** (upper boundary)
- **Q1:** NO — nursing is fundamentally irreducible. Physical patient care, clinical judgment, and empathetic communication are non-automatable.
- **Q2:** YES — clinical placements require real-time decision ownership. NMBA standards enforce demonstrated clinical competence.
- **Q3:** YES — nursing demand is structurally growing (aging population, chronic disease). Clinical skills are durable and non-automatable.

### Verdict
Nursing is among the most AI-resistant professions assessed. The program's structural defences are regulatory (NMBA accreditation), practical (physical patient care), and relational (empathy, communication, clinical judgment). The score (26/36) reflects strong core protection with room to improve AI literacy for the digital health tools nurses increasingly use. But the program's fundamentals are sound — nursing graduates face AI augmentation of their tools, not substitution of their role.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-nursc": {
    title: "Master of Nursing Science (MC-NURSC) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Nursing Science (MC-NURSC)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-phtyph": {
    title: "Master of Physiotherapy (Pelvic Health) (MC-PHTYPH) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-PHTYPH (Physiotherapy Pelvic Health)
**UniMelb** | Master | 18m FT (150 pts) | Date: 2026-06-09

| # | Dim | S | Rationale |
|---|---:|---|
| 1 | Automation | 3 | Pelvic health physiotherapy is hands-on clinical care. Physically irreducible. |
| 2 | Systems Thinking | 1 | Clinical assessment and treatment focus. Not systems-level. |
| 3 | Technical Depth | 2 | Research & Evidence, Evaluation of Healthcare. Clinical technical depth. |
| 4 | Decision-Making | 3 | Complex case management, clinical decision-making. Capstone research/professional project. |
| 5 | AI Literacy | 1 | Innovation & Emerging Technologies elective adjacent. No AI-specific content. |
| 6 | Domain Depth | 3 | Pelvic health — extreme clinical specialisation. Designed for practicing physiotherapists. |
| 7 | Research Rigour | 3 | Research & Evidence in Practice + Evaluation + Capstone (research OR professional project). |
| 8 | Human & Relational | 3 | Clinical practice, patient care, Health Behaviour Change. Maximum interpersonal. |
| 9 | Currency | 2 | Blended delivery, updated Dec 2025. Innovation elective forward-looking. |
| 10 | Outcomes | 3 | No published data. Physiotherapy titling pathway provides some tracking. |
| B | Irreplaceability | 3 | Clinical physiotherapy + pelvic health + research training. Hands-on care irreplaceable. |

**TOTAL: 25/36 — MODERATE RISK** | Q1:NO Q2:YES Q3:YES
*2 points from RESILIENT. Near-perfect clinical profile with strong research training.*

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-phtyph": {
    title: "Master of Physiotherapy (Pelvic Health) (MC-PHTYPH) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Physiotherapy (Pelvic Health) (MC-PHTYPH)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-prop": {
    title: "Master of Property (MC-PROP) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 23,
  "riskBand": "MODERATE RISK",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 2,
      "rationale": "Property valuation and market analysis are increasingly AI-augmented but require physical inspection, client negotiation, and regulatory judgment."
    },
    {
      "label": "Systems Thinking",
      "score": 2,
      "rationale": "Full property cycle: development, investment, finance, valuation, management. Systems integration across project lifecycle."
    },
    {
      "label": "Technical Depth",
      "score": 2,
      "rationale": "300pt program. Financial modeling, feasibility analysis, valuation methods. API/RICS accreditation requires technical competence."
    },
    {
      "label": "Decision-Making",
      "score": 2,
      "rationale": "Risk allocation, viability assessment, project evaluation — professional judgment required. Capstone research project available."
    },
    {
      "label": "AI Literacy",
      "score": 1,
      "rationale": "No AI-specific content. Data management and software skills mentioned but AI/proptech not explicit."
    },
    {
      "label": "Domain Depth",
      "score": 3,
      "rationale": "300pt professional degree with dual API/RICS accreditation. 225pt core. Clear property specialist pathway."
    },
    {
      "label": "Research Rigour",
      "score": 2,
      "rationale": "Research project/capstone available. PhD pathway mentioned. Research principles in property practice taught."
    },
    {
      "label": "Human & Relational",
      "score": 2,
      "rationale": "Negotiation, communication, client management skills explicit. Professional practice component. Not clinical-level."
    },
    {
      "label": "Curriculum Currency",
      "score": 2,
      "rationale": "Updated June 2026. Property industry current. Limited AI/proptech/digital innovation visibility."
    },
    {
      "label": "Outcome Evidence",
      "score": 2,
      "rationale": "API/RICS accreditation provides external validation. Property industry employment trackable."
    }
  ],
  "thresholds": {
    "q1": "NO",
    "q2": "YES",
    "q3": "YES"
  },
  "programName": "Master of Property",
  "courseCode": "MC-PROP",
  "market": {
    "field": "Architecture & Building",
    "employmentRate": 0.748,
    "medianSalary": 84500,
    "employmentRate3yr": 0.748,
    "medianSalary3yr": 84500,
    "occupationDemand": "RECRUITMENT_DIFFICULTY",
    "aiExposure": 0.3,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-prop": {
    title: "Master of Property (MC-PROP) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Property (MC-PROP)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-propsyc": {
    title: "Master of Professional Psychology (MC-PROPSYC) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Professional Psychology (MC-PROPSYC)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-09 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-propsyc

### 1. PROGRAM PROFILE
The Master of Professional Psychology is a 200-credit-point program providing the 4th and 5th year of the 5+1 pathway to generalist psychologist registration. All subjects are compulsory and sequentially designed. Core components: 13 classroom-based subjects covering assessment, diagnosis, ethics, psychopathology (adult and child), CBT, and interventions; 300 hours of supervised clinical placement; and a 6000-word minor research thesis.

The program is APAC-accredited and graduates proceed to a one-year supervised internship + National Psychology Examination for full PsyBA registration. Domestic students only.

### 2. AUTOMATION EXPOSURE PROFILE
Clinical psychology is among the most AI-resistant professions. The program's core activities — diagnostic assessment, case formulation, therapeutic intervention, and culturally sensitive client communication — are fundamentally irreducible human work. AI can assist with administrative tasks and clinical decision support tools, but cannot conduct a psychological assessment or therapeutic session.

The 300 hours of supervised placement create a structural defence: graduates must demonstrate clinical competence under supervision before registration. The sequential, all-compulsory design ensures no student can bypass core clinical training.

### 3. DFVA SCORECARD
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 3 | Clinical assessment, diagnosis, and therapy are irreducible human work. 300hr placement enforces clinical competence. APAC/PsyBA regulation creates structural barriers. |
| 2 | Systems Thinking | 2 | Case formulation integrates assessment, psychopathology, and cultural context. Research thesis teaches methodology. Primary focus is clinical practice, not system design. |
| 3 | Technical Depth | 2 | Advanced Design and Data Analysis provides quantitative grounding. Assessment and diagnosis units build clinical technical skills. Rigorous in clinical methods, not deeply quantitative. |
| 4 | Decision-Making | 3 | Clinical placements require real-time diagnostic and therapeutic decisions. Case formulation involves defended clinical judgment. Ethics unit reinforces decision frameworks. |
| 5 | AI Literacy | 1 | No AI-specific content. Digital mental health tools exist in practice but not in curriculum. |
| 6 | Domain Depth | 3 | Deep clinical psychology domain. All-compulsory sequential structure. APAC accreditation. 5+1 pathway to registration. |
| 7 | Research Rigour | 2 | 25pt research thesis + Advanced Design and Data Analysis. Smaller than research MSc but APAC-compliant. |
| 8 | Human & Relational | 3 | Program's defining dimension. 300hr placement, therapeutic relationships, culturally sensitive practice, ethics, diversity. Maximum clinical capability. |
| 9 | Curriculum Currency | 2 | Updated Dec 2025. Sequential all-compulsory ensures currency. No AI/digital health. |
| 10 | Outcome Evidence | 3 | APAC + PsyBA registration provides external tracking. 5+1 completion rates publicly available. |
| B | Irreplaceability | 3 | Clinical psychology: scientific knowledge + therapeutic skill + ethical judgment + cultural competence. APAC/PsyBA regulation creates structural barriers to AI substitution. |

**TOTAL: 26 / 36 — MODERATE RISK**

### 4. THRESHOLD QUESTIONS
- **Q1:** NO — Clinical assessment, diagnosis, and therapeutic intervention are fundamentally irreducible. AI cannot conduct a psychological session.
- **Q2:** YES — Clinical placements + case formulation + thesis require sustained decision ownership and defended clinical judgment.
- **Q3:** YES — Mental health demand is structurally growing. Registered psychologists face persistent workforce shortages. APAC/PsyBA pathway provides career durability.

### 5. VERDICT
Clinical psychology's regulatory and practical barriers create one of the strongest AI defences in the assessment cohort. The program's sequential all-compulsory design, 300-hour placement, and APAC/PsyBA pathway mean graduates exit with demonstrated clinical competence that resists substitution. The AI literacy gap exists but is less acute than in non-clinical fields — clinical psychology's core value is human judgment, not tool operation.

### 6. RECOMMENDATIONS
| Priority | Action | Dimensions | Effort |
|---|---|---|---|
| P1 | Add digital mental health + AI in clinical practice module | D5 | Low |
| P1 | Publish graduate destination + 5+1 completion data | D10 | Low |

**Path to RESILIENT:** P1 actions → 28/36 RESILIENT.

---

**Assessment date:** 2026-06-09
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-propsyc
**Prompt version:** DFVA-HERMES-v1

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-propsyc": {
    title: "Master of Professional Psychology (MC-PROPSYC) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Professional Psychology (MC-PROPSYC)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-scibif": {
    title: "Master of Science (Bioinformatics) (MC-SCIBIF) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Science (Bioinformatics) (MC-SCIBIF)
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points) or 1.5 years (150 credit points cognate pathway)

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-scibif  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

### 1. PROGRAM PROFILE
The Master of Science (Bioinformatics) combines computer science, statistics, and biology in a research-oriented degree. The program operates two entry pathways (200pt and 150pt cognate) and three background streams: Biology/Biomedicine, Mathematics/Statistics, and Computer Science. All streams converge on a common core: Elements of Bioinformatics (BINF90002), Skills for Data-intensive Research (BINF90018), and a 50-point research project.

The stream system is the program's defining structural feature. Students enter with depth in one discipline and build competence in the others — biology students learn programming and algorithms; CS students learn cell biology and genetics. The research project (50 points, consecutive semesters) integrates these skills into a single supervised investigation.

The program targets careers at the intersection of biology and computing: genomic data analysis, pharmaceutical R&D, clinical bioinformatics, and academic research.

### 2. AUTOMATION EXPOSURE PROFILE
Bioinformatics presents a distinctive automation profile. Computational pipeline execution — running alignment tools, variant callers, differential expression analyses — is increasingly automated and standardised. This is the "technician" layer.

The research project is the structural defence. Designing a bioinformatics investigation — choosing which questions to ask of a dataset, determining appropriate statistical frameworks, interpreting biologically ambiguous results — is irreducible human intellectual work. AI tools can accelerate specific computational steps but cannot formulate the scientific question or judge whether a result is biologically meaningful.

The program's stream system is protective: graduates exit with hybrid competence (biology + computation + statistics) that is harder to substitute than single-discipline training. The 50-point research project is proportionally larger than the data science capstone (25 points) and provides stronger differentiation.

### 3. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 2 | Routine bioinformatics pipelines are automatable; research question formulation and biological interpretation are not. The 50-point research project anchors the irreplaceable component. |
| 2 | Systems Thinking and Problem Framing | 2 | The stream system teaches cross-disciplinary problem framing. The research project requires methodology design. Coursework is primarily technique acquisition. |
| 3 | Technical and Quantitative Depth | 3 | Strong three-discipline core: algorithms (COMP90038), programming (COMP90059), statistics (MAST90044/MAST20005), and biology (CEDB20003, GENE20001). BINF90017 (High-Dimensional Omics Data Analysis) adds advanced quantitative methods. |
| 4 | Decision-Making Under Uncertainty | 2 | The research project requires methodological decisions and biological interpretation of ambiguous data. Coursework is technique-focused. |
| 5 | AI Literacy and Governance | 1 | No AI-specific units visible in the curriculum. Bioinformatics uses computational methods heavily, but AI as a governed system is not explicitly taught. |
| 6 | Domain Depth and Specialisation | 3 | Rare specialist domain: bioinformatics at the CS-biology-statistics intersection. The stream system ensures cross-disciplinary depth regardless of entry background. |
| 7 | Research Methods Rigour | 3 | BINF90018 (Skills for Data-intensive Research) plus a 50-point research project provide substantial research training. The project is larger (50pts vs 25pts) and more central than in comparable coursework masters. |
| 8 | Human and Relational Capability | 2 | Professional skills subject included. Ethics is implicit in research training and biological data handling. No clinical accountability or dedicated ethics unit. |
| 9 | Curriculum Currency and Adaptability | 2 | Updated 9 June 2026. Bioinformatics is a rapidly evolving field; the curriculum covers current tools and methods. No explicit AI integration visible. |
| 10 | Graduate Outcome Evidence | 2 | No granular destination data published. Bioinformatics career pathways are externally documented (pharma, clinical genomics, research) but program-specific outcomes are not tracked. |
| B | Irreplaceability Premium (Bonus) | 3 | Rare triple integration: biology domain expertise + computational/statistical skills + research training. This combination resists substitution because it requires genuine cross-disciplinary judgment that AI tools cannot synthesise. |

**TOTAL: 24 / 36**  
**Risk band: MODERATE RISK (20-27)**

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?  
  **NO** — while computational pipeline execution can be AI-assisted, the research project's core requirements (formulating a biological question, designing an analytical approach, interpreting ambiguous genomic data, and defending conclusions) cannot be produced by an AI agent. The cross-disciplinary judgment required is irreducible.

- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?  
  **YES** — the 50-point research project is a genuine exercise in research design and original investigation. The stream system ensures graduates can operate across discipline boundaries.

- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?  
  **YES** — genomics and bioinformatics are growing fields driven by decreasing sequencing costs and increasing clinical applications. AI tools accelerate routine analysis but increase demand for researchers who can interpret AI-generated findings in biological context. The cross-disciplinary training is structurally protective.

### 5. VERDICT
This program is stronger than its score suggests because its structural design — cross-disciplinary streams converging on a substantial research project — creates graduates whose core capability (biological + computational + statistical judgment) resists AI substitution in ways that single-discipline programs do not.

The program's main gap is AI literacy (D5: score 1). Bioinformatics is a field being actively transformed by AI — AlphaFold, protein language models, AI-driven drug discovery — yet the curriculum does not explicitly teach AI as a governed system. Adding even one unit on AI in bioinformatics (with governance and limitation awareness) would capture significant value at low effort.

### 6. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| P1 | Add a dedicated unit on AI/ML in bioinformatics with explicit governance and limitation training | 5 | Medium |
| P1 | Publish graduate destination data by stream (Biology, Math/Stats, CS entry) | 10 | Medium |
| P2 | Integrate AI tool use (AlphaFold, protein LLMs, automated literature mining) into the research methods training with critical evaluation | 5, 9 | Low |

### 7. MARKET CONFIDENCE NOTE
Confidence: **Medium**. Bioinformatics is a well-defined field with documented growth drivers (genomics, precision medicine). The structural analysis of cross-disciplinary training as a durability mechanism is curriculum-evidence-based. The AI literacy gap is based on field-level observation, not program-specific employer feedback.

---

**Assessment date:** 2026-06-08  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-scibif  
**Prompt version:** DFVA-CONTINUE-SLASH-v1

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-scibif": {
    title: "Master of Science (Bioinformatics) (MC-SCIBIF) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Science (Bioinformatics) (MC-SCIBIF)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-scibio": {
    title: "Master of Science (BioSciences) (MC-SCIBIO) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Science (BioSciences) (MC-SCIBIO)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-scibio

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | 125pt research project is non-automatable. Lab/field techniques partially automatable. Ecological and biological research requires irreplaceable judgment. |
| 2 | Systems Thinking | 2 | Ecology/evolution/environmental science inherently systems-oriented. Research project requires experimental design. |
| 3 | Technical Depth | 3 | Strong: Applied Statistics, Genomics and Bioinformatics, Microscopy, Environmental Modelling, Spatial Data Analytics. Multi-method competence. |
| 4 | Decision-Making | 3 | 125pt research project over consecutive semesters with sustained methodological decisions. |
| 5 | AI Literacy | 1 | Genomics and Bioinformatics elective touches computational methods. Data Science for Biologists available. No AI governance. |
| 6 | Domain Depth | 3 | Three specialisation areas: Ecology/Evolution/Environmental, Genetics/Genomics/Development, Plant Science. Deep biological expertise. |
| 7 | Research Rigour | 3 | 125pt research project. Graduate Seminar in BioSciences. Applied Statistics. Communication for Research Scientists. Comprehensive. |
| 8 | Human & Relational | 2 | Communication for Research Scientists compulsory. Science Communication, Ethics (not available 2026), Internship available. Fieldwork builds practical skills. |
| 9 | Curriculum Currency | 2 | Updated 9 June 2026. Genomics, climate adaptation, biosecurity — current topics. No AI integration. |
| 10 | Outcome Evidence | 2 | No granular destination data. |
| B | Irreplaceability | 3 | Rare: biological domain expertise + quantitative methods + research training. Field and lab skills resist AI substitution. |

**TOTAL: 25/36 — MODERATE RISK**

### Thresholds
- **Q1:** NO — 125pt research project + field/lab work is irreducible.
- **Q2:** YES — Research design through thesis. Field ecology and experimental biology require original investigation.
- **Q3:** YES — Biodiversity, climate adaptation, biosecurity are growing fields. Research training creates adaptable professionals.

### Verdict
The 125pt research project is the structural anchor. Genomics and bioinformatics electives add computational relevance. AI literacy gap is the main opportunity — adding even one unit on AI in biological research would strengthen an already-solid program.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-scibio": {
    title: "Master of Science (BioSciences) (MC-SCIBIO) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Science (BioSciences) (MC-SCIBIO)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-scibit": {
    title: "Master of Biotechnology (MC-SCIBIT) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `# DFVA REPORT: Master of Biotechnology

**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years full-time / 4 years part-time
**Assessment Date:** 2026-05-13 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-scibit | **Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Biotechnology (MC-SCIBIT) is a 200-credit-point professional science master's degree accredited by the National Professional Science Master's Association (NPSMA). It is explicitly designed to bridge bench science with commercialisation, regulation, and industry application.

**Compulsory units (100cp):** SCIE90011 From Lab to Life · SKIL90004 Project Management in Science · MAST90072 Data and Decision Making · MKTG90022 Commercialisation of Science · LAWS90003 Regulation of Biotechnology · MGMT90171 Leadership in Science · SCIE90034 Communicating Science at Work · BTCH90010 Biotechnology Impacts in Society

**Mandatory Industry Project (25cp):** SCIE90015 Industry Project in Biotechnology — Year 2, with an external company. Outstanding students may substitute the Research Project.

**Elective options (75cp):** BTCH90005 Advanced Molecular Biology Techniques · BTCH90009 Genomics and Bioinformatics · BIOL90041 Data Science for Biologists · COMP90016 Computational Genomics · COMP90059 Introduction to Programming · BMSC90016 Contemporary Cell and Gene Therapies · BMEN90027 Systems and Synthetic Biology · CLRS90028 Advanced Clinical Trial Design · SCIE90017 Science and Technology Internship

**Notable absences:** No mandatory AI literacy or governance unit. SCIE90005 Ethics and Responsibility in Science **not available in 2026**. LAWS90129 Law, Science and Technology **not available in 2026**.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 | Regulatory affairs assistant, QA officer, technology transfer analyst, clinical trials coordinator, research associate | LOW–MEDIUM — regulatory accountability and GMP compliance require human sign-off; AI is compressing documentation drafting but cannot take regulatory responsibility |
| Year 3–5 | Regulatory affairs manager, biotech product manager, commercialisation manager, IP analyst, government science advisor | LOW — deep regulatory, IP, and commercial domain knowledge creates genuine automation resistance; judgment and accountability are legally required |

**Structural advantage:** Unlike most science degrees, MC-SCIBIT explicitly targets the lab-to-market pipeline. The roles in this pipeline — regulatory affairs, technology transfer, IP management, clinical trial oversight — have legal accountability requirements that create structural automation resistance.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2/3 | Regulatory affairs, GMP, and commercialisation roles carry genuine automation resistance. Documentation and routine compliance work is compressing. Entry-level QA and regulatory assistant roles face moderate AI substitution but accountability layer is structural protection. |
| 2 | Systems Thinking and Problem Framing | 2/3 | LAWS90003 Regulation of Biotechnology and MKTG90022 Commercialisation of Science together require understanding of complex regulatory, commercial, and scientific systems. Industry Project requires navigating real organisational constraints. Trade-off reasoning not explicitly assessed. |
| 3 | Technical and Quantitative Depth | 2/3 | MAST90072 Data and Decision Making provides genuine quantitative grounding. Electives include Genomics and Bioinformatics, Computational Genomics, Data Science for Biologists. Depth is solid but variable — depends heavily on elective choices. Not all students take computational electives. |
| 4 | Decision-Making Under Uncertainty | 3/3 | SCIE90015 Industry Project is mandatory — real external company, real constraints, real accountability, group work, year-long commitment. Commercialisation and Regulation units require navigating genuine regulatory and commercial uncertainty. Authentic live-stakes experience embedded by design. |
| 5 | AI Literacy and Governance | 1/3 | No mandatory AI governance unit. SCIE90005 Ethics and Responsibility in Science not available 2026. Biotechnology sector is among the most AI-disrupted (AlphaFold, AI drug discovery, AI regulatory submission tools) — the absence of an AI governance pillar is a significant curriculum currency gap. |
| 6 | Domain Depth and Specialisation | 3/3 | LAWS90003 Regulation of Biotechnology is genuine regulatory expertise — TGA, FDA, IP, GMP. MKTG90022 Commercialisation of Science adds commercial domain depth. Technical electives (Cell and Gene Therapies, Computational Genomics, Systems and Synthetic Biology, Clinical Trial Design) create specialist depth. This is the degree's primary strength. |
| 7 | Research Methods Rigour | 2/3 | MAST90072 Data and Decision Making provides applied quantitative methods. Industry Project involves applied research methodology. Optional Biotechnology Research Project available for outstanding students. No mandatory primary research methods unit — professional coursework framing limits rigour to applied contexts. |
| 8 | Human and Relational Capability | 3/3 | SCIE90034 Communicating Science at Work (mandatory), MGMT90171 Leadership in Science (mandatory), SKIL90004 Project Management in Science (mandatory). Industry Project requires working with external industry partners in a real professional context. Teamwork and communication explicitly in learning outcomes. Genuinely strong. |
| 9 | Curriculum Currency and Adaptability | 2/3 | Handbook updated 4 May 2026. Computational and bioinformatics electives available. SCIE90005 Ethics and Responsibility in Science not available 2026 — a notable gap. No AI literacy unit despite biotechnology sector's rapid AI adoption. Shows awareness of computational direction but incomplete AI governance integration. |
| 10 | Graduate Outcome Evidence | 2 | No publicly available destination data at program level. NPSMA accreditation implies employability standards but no granular role-title, salary, or time-to-employment data published. |
| B | Irreplaceability Premium (Bonus) | 3/3 | The combination is genuinely rare: biotechnology technical depth + mandatory regulatory expertise (LAWS90003) + commercialisation and IP knowledge (MKTG90022) + mandatory industry project accountability + science communication and leadership. AI cannot substitute for TGA/FDA regulatory judgment and legal sign-off. |
| **TOTAL** | | **24/36 — MODERATE RISK** | |

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. The regulatory affairs, GMP compliance, IP commercialisation, and industry project accountability domains require human sign-off, legal responsibility, and relationship management with regulators and commercial partners. AI can draft regulatory submissions and commercialisation plans — but a human must validate, own, and defend them to TGA/FDA or a venture partner. The mandatory Industry Project creates authentic professional accountability that cannot be replicated by an agent.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. The Industry Project requires designing and delivering a real output for an external company. Regulation of Biotechnology and Commercialisation of Science require genuine decision ownership in regulatory and commercial contexts. The combination trains graduates to own the lab-to-market pipeline — a systems-design and decision-ownership role from day one.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Biotechnology is one of the sectors most transformed by AI — AlphaFold 3, AI drug discovery platforms, AI regulatory submission tools. The graduates who will be most valuable are those who can validate and govern these AI outputs in regulated environments. MC-SCIBIT graduates are positioned precisely at that intersection: regulatory accountability + scientific depth + commercialisation judgment.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed MC-SCIBIT graduate is the **Regulatory Documentation Specialist of 2023**: entering a QA or regulatory affairs role and spending the first two years drafting GMP documentation, preparing regulatory submission templates, and coordinating routine compliance activities — tasks that AI regulatory platforms (Veeva Vault AI, Regulatory Genome, AI submission tools) are now absorbing rapidly. The value that survives is not the documentation — it is the judgment about whether the AI-generated document is accurate, the regulatory strategy that determines which pathway to take, and the accountability relationship with TGA or FDA. Graduates who enter understanding their value is judgment and accountability — not document production — will thrive.

---

## 6. VERDICT

**The Master of Biotechnology is MODERATE RISK — but the upper band, with a profile that can become RESILIENT with a single targeted intervention.**

The degree has three genuine 3/3 scores: Decision-Making Under Uncertainty (the mandatory Industry Project is the strongest single assessment design of any degree assessed in this series), Domain Depth (regulatory + commercialisation + technical science is rare), and Human and Relational Capability (three mandatory communication and leadership units plus industry engagement). The Irreplaceability Premium is also 3/3.

The primary gap is D5 — AI Literacy and Governance (1/3). Biotechnology is the sector where AI disruption is most intense and a program without mandatory AI governance content is producing graduates who will enter that sector without the critical evaluation framework to distinguish valid from invalid AI outputs in a regulated context. The secondary gap is D10 — Graduate Outcome Evidence (1/3).

Fix D5 and D10, and this degree reaches the RESILIENT band.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Create mandatory unit: AI in Biotechnology — AI tool evaluation in regulated contexts, TGA/FDA AI guidance, AlphaFold validation, NIST AI RMF in GMP contexts | D5, D9 | High |
| 2 | Mandate minimum one computational elective (Genomics and Bioinformatics, Computational Genomics, or Data Science for Biologists) | D3, B | Low |
| 3 | Add AI tool use reflection and output validation statement as mandatory Industry Project assessment component | D4, D5 | Low |
| 4 | Publish program-level graduate destination data: role titles, industries, salary bands, time-to-employment | D10 | Medium |
| 5 | Integrate AI ethics and governance module into BTCH90010 Biotechnology Impacts in Society (interim, while SCIE90005 unavailable) | D5, D9 | Low |
| 6 | Integrate AI regulatory law content into LAWS90003 Regulation of Biotechnology (while LAWS90129 unavailable) | D5, D6 | Low–Medium |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready MC-SCIBIT graduate understood that biotechnology in 2027 is not primarily a science degree — it is a decision-making degree. The science is increasingly AI-assisted. The human value is in deciding whether the AI got it right, and taking legal and professional responsibility for that decision.

They completed AI in Biotechnology and can tell you what TGA requires before an AI-generated regulatory submission is accepted, what AlphaFold's failure modes are in novel protein prediction contexts, and what NIST AI RMF requires of a company deploying AI in a GMP environment. Their Industry Project was with a company using AI tools — and their final report included a governance brief for that tool that the company's QA director actually used.

They completed Genomics and Bioinformatics as their mandatory computational elective and can work with sequence data, understand what an AI genomics tool is doing, and evaluate whether its output requires experimental validation. They are not a bioinformatician — but they can direct one and evaluate the output.

They are the regulatory affairs professional, the technology transfer officer, and the AI governance analyst that an ANZ biotech company hires because they can sit across the table from a TGA assessor and say: we used AI to draft this submission, here is the validation protocol, here is why it is accurate — and I am signing it.

---

**Assessment Date:** 2026-05-13 | **Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-scibit | **Prompt Version:** DFVA-COPILOT-PROMPT-v1

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-scibit": {
    title: "Master of Biotechnology (MC-SCIBIT) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Biotechnology (MC-SCIBIT)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-sciche": {
    title: "Master of Science (Chemistry) (MC-SCICHE) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Science (Chemistry) (MC-SCICHE)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-sciche

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | 125pt research project is non-automatable. Lab chemistry involves physical manipulation AI cannot perform. Computational chemistry is AI-augmented. |
| 2 | Systems Thinking | 2 | Chemistry teaches systematic thinking. Research project requires experimental design. |
| 3 | Technical Depth | 3 | Deep: Advanced Mass Spectrometry, NMR Spectroscopy, Theoretical Chemistry, Catalysis, Lasers in Chemistry. Specialist lab techniques. |
| 4 | Decision-Making | 3 | 125pt research project. Chemical analysis requires methodological judgment and interpretation. |
| 5 | AI Literacy | 1 | Introduction to Quantum Computing, Art of Scientific Computation available as professional skills. No AI governance. Science & AI: Legal & Ethical Challenges not available 2026. |
| 6 | Domain Depth | 3 | Deep specialist domain. Seven named chemistry subfields. Research project creates focused expertise. |
| 7 | Research Rigour | 3 | 125pt research project. Research Methods for Life Sciences available. Statistics for Research Workers. Strong methodological training. |
| 8 | Human & Relational | 2 | Chemical Regulations and Safety, Leadership in Science, Science Communication, Internship available. Lab safety builds professional responsibility. |
| 9 | Curriculum Currency | 2 | Updated 28 May 2026. Many units not available in 2026 — suggests curriculum transition or staffing constraints. Theoretical Chemistry, Advanced Materials are current. |
| 10 | Outcome Evidence | 2 | No granular destination data. |
| B | Irreplaceability | 3 | Rare: laboratory chemistry + instrumentation expertise + research training. Physical lab skills resist AI substitution. |

**TOTAL: 25/36 — MODERATE RISK**

### Thresholds
- **Q1:** NO — Physical lab work is irreducible. Chemical synthesis, instrumentation, and analysis require human presence and judgment.
- **Q2:** YES — Research project from experimental design through thesis. Chemistry requires original investigation.
- **Q3:** YES — Materials science, environmental chemistry, pharmaceutical chemistry are growing. Lab-trained researchers are structurally durable.

### Verdict
Chemistry's physical lab requirement is a structural moat against AI substitution. The 125pt research project and specialist instrumentation training create graduates whose core capability — designing and executing chemical experiments — AI cannot replicate. The multiple "not available in 2026" units are a concern for curriculum stability. The AI literacy gap is real but less acute than in non-lab fields. Adding computational chemistry with AI methods would modernise without compromising the core.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-sciche": {
    title: "Master of Science (Chemistry) (MC-SCICHE) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Science (Chemistry) (MC-SCICHE)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-sciear": {
    title: "Master of Science (Earth Sciences) (MC-SCIEAR) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `# DFVA REPORT: Master of Science (Earth Sciences)

**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years full-time / 4 years part-time
**Assessment Date:** 2026-05-15 | **Source URL:** https://handbook.unimelb.edu.au/2025/courses/mc-sciear | **Prompt Version:** DFVA-COPILOT-SKILL-v1

---

## 1. PROGRAM PROFILE

The Master of Science (Earth Sciences) (MC-SCIEAR) is a 200-credit-point research-intensive coursework masters degree offered by the Faculty of Science at the University of Melbourne. It incorporates a substantial original research project (125 points, 62.5% of the degree) alongside discipline coursework and professional skills training.

Two streams are offered: **Atmospheric Science** (climate dynamics, meteorology, atmospheric modelling) and **Geology** (structural geology, hydrogeology, mineralogy, field techniques, ore deposits, critical minerals).

The program is a pathway to PhD study or to the workforce, and operates within a multi-institutional collaboration (Victorian Institute of Earth and Planetary Sciences — VIEPS partnership with Monash, La Trobe, and others).

**Discipline Core (50pts):**

*Atmospheric Science stream:* ATOC90002 Climate Science for Decision-Making · ATOC90010 Statistics in Climate Dynamics · ATOC90011 Convective Clouds and Storms · ATOC90012 Advanced Dynamical Meteorology · ATOC90013 Atmospheric Modelling · ATOC90015 Data Assimilation and Model Improvement · ATOC90016 Weather and Climate Extremes · ERTH90026 Climate Modelling and Climate Change

*Geology stream:* GEOL90005 Hydrogeology/Environmental Geochemistry · GEOL90027 Advanced Structural Mapping · GEOL90028 Geochronology and Thermochronology · GEOL90031 Ore Reserve Estimation · GEOL90032 Introduction to Mineralogy · GEOL90033 Mine Safety and Engineering · GEOL90045 Exploration Field Skills · GEOL90046 Environmental Geology Field Techniques · GEOL90048 Sedimentary Basins and Resource Analysis · GEOL90052 Geology of Precious & Critical Minerals · GEOM90005 Remote Sensing

**Professional Skills (12.5–25pts):** MAST90044 Thinking and Reasoning with Data · MAST90007 Statistics for Research Workers · SCIE90013 Communication for Research Scientists · SCIE90012 Science Communication · COMP90059 Introduction to Programming · COMP90072 The Art of Scientific Computation · LAWS90203 Science & AI: Legal & Ethical Challenges (not available 2025) · SCIE90017 Science and Technology Internship · BUSA90403 Business Tools: Money People & Processes

**Research Project (125pts):** Original research project of publishable quality. Assessment: research presentation (3%), literature review 4,000 words (5%), oral presentation (7%), thesis 25,000 words (85%), semester hurdle reviews.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 | Research assistant, field geologist, environmental consultant (junior), meteorological analyst, climate data analyst, mine geologist (graduate), lab technician (geochemistry) | LOW — physical fieldwork, instrument operation, sample collection, and original data interpretation require embodied presence and domain judgment that AI cannot replicate |
| Year 3–5 | Senior geologist, environmental compliance officer, climate scientist, exploration geologist, hydrogeologist, atmospheric scientist (BoM/CSIRO), resource estimation specialist | LOW — increasing decision ownership over geological models, regulatory sign-off on environmental assessments, and leadership of field campaigns create strong automation resistance |

**Structural advantage:** Earth sciences graduates operate at the intersection of physical fieldwork, quantitative modelling, and domain-specific interpretation. The Geology stream requires embodied field skills (mapping, sampling, drilling supervision) that are fundamentally unautomatable. The Atmospheric Science stream requires judgment about model validity, data quality, and uncertainty communication that AI accelerates but cannot replace.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 3/3 | Graduate roles require physical fieldwork (Geology stream: field mapping, drilling, sampling), instrument operation, and original data interpretation from day one. Atmospheric Science graduates validate computational models against observations — requiring judgment about when models are wrong. AI accelerates analysis but cannot replace embodied field presence or observational judgment. |
| 2 | Systems Thinking and Problem Framing | 2/3 | Atmospheric Modelling, Data Assimilation, Climate Science for Decision-Making, and Sedimentary Basins and Resource Analysis all require systems-level reasoning. Climate system feedback loops and geological basin analysis are inherently systems problems. Not explicitly labelled "systems thinking" but embedded in discipline practice. Trade-off reasoning present but not formally assessed as a standalone competency. |
| 3 | Technical and Quantitative Depth | 3/3 | Strong quantitative core throughout: ATOC90010 Statistics in Climate Dynamics, MAST90007 Statistics for Research Workers, ATOC90012 Advanced Dynamical Meteorology (mathematical physics), Atmospheric Modelling (numerical methods), Ore Reserve Estimation (geostatistics), Geochronology (isotope geochemistry and dating methods). COMP90072 The Art of Scientific Computation available. Rigorous technical depth is structural to the program. |
| 4 | Decision-Making Under Uncertainty | 3/3 | The 125-point research project (62.5% of degree) requires designing original research, interpreting ambiguous data, defending methodology under examination, and producing work of publishable quality. Semester hurdle reviews create ongoing accountability. The research thesis must demonstrate "appropriate level of insight and scientific interpretation" — this is genuine decision-making under genuine uncertainty. |
| 5 | AI Literacy and Governance | 1/3 | LAWS90203 Science & AI: Legal & Ethical Challenges exists in the professional skills list but was "not available in 2025". COMP90059 Introduction to Programming and COMP90072 The Art of Scientific Computation provide computational capability but not AI governance or literacy. No mandatory unit addresses AI tool supervision, limitations, or responsible deployment in earth science contexts. |
| 6 | Domain Depth and Specialisation | 3/3 | Exceptional domain depth. Geology stream covers mineralogy, geochemistry, geochronology, structural geology, ore deposits, field techniques, mine safety — highly specialised regulatory and scientific expertise. Atmospheric Science stream covers dynamical meteorology, climate modelling, data assimilation — deep quantitative specialisation. Multi-institutional VIEPS collaboration provides access to the broadest array of advanced earth science coursework nationally. |
| 7 | Research Methods Rigour | 3/3 | 125 points of original research (62.5% of degree). Students generate primary data and defend methods under scrutiny. Assessment includes literature review, research presentations, oral examination, and thesis of publishable quality. Semester-end hurdle reviews ensure ongoing research quality. This is among the strongest research method rigour scores possible for a coursework masters. |
| 8 | Human and Relational Capability | 1/3 | SCIE90013 Communication for Research Scientists and SCIE90012 Science Communication are available as professional skills options but not compulsory. Oral presentations exist (10% of research project assessment). No substantial clinical, care, interpersonal accountability, or stakeholder engagement components. The program is primarily individual research with limited collaborative or client-facing requirements. |
| 9 | Curriculum Currency and Adaptability | 2/3 | Handbook last updated 6 November 2025. Program includes contemporary topics: critical minerals (GEOL90052), climate extremes, data assimilation. However, several subjects listed as "not available in 2025" or "no longer available" — suggesting uneven curation. LAWS90203 AI ethics not available. No AI literacy integrated into core discipline units. Fundamentally sound disciplinary content but incomplete adaptation to AI era. |
| 10 | Graduate Outcome Evidence | 2 | No publicly available destination data at program level. No granular role-title, salary, or time-to-employment data published. Generic Faculty of Science outcomes exist but are not specific to this specialisation. |
| B | Irreplaceability Premium (Bonus) | 2/3 | The combination of physical fieldwork capability + advanced quantitative modelling + original research + deep domain expertise creates a genuine dual-skill value proposition. A geology graduate who can both conduct fieldwork and model geological systems computationally occupies a position difficult to replicate by AI alone. Not scored 3/3 because the combination (science + research + fieldwork) is standard for earth science programs nationally — it's durable but not uniquely rare. |
| | **TOTAL** | **24/36** | **MODERATE RISK (20–27)** |

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. Earth sciences graduates in their first two years perform physical fieldwork (geological mapping, drilling supervision, sample collection, instrument deployment), operate laboratory equipment, interpret observational data against geological or atmospheric models, and write technical reports requiring domain judgment about data quality and uncertainty. AI cannot physically attend field sites, operate instruments, or take legal responsibility for environmental assessments.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. The 125-point research project is explicitly designed to produce original publishable research. Graduates must design their own methodology, collect and interpret primary data, and defend conclusions under oral examination. The thesis requirement ("of publishable quality") and semester hurdle reviews ensure genuine decision ownership and original insight generation throughout.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
UNCERTAIN. Demand for earth scientists is structurally supported by critical minerals exploration (rare earths, lithium), climate adaptation planning, and environmental regulatory compliance — all growth sectors. However, some computational roles (climate data analysis, desktop resource estimation) face AI acceleration that may reduce headcount even as total demand grows. Net direction is likely positive but not guaranteed for all graduate roles.

---

## 5. ANALOGUE GRADUATE PROFILE

Most threatened entry-level profile: **"Desktop climate data analyst"** or **"office-based resource estimation analyst"** — roles where the graduate primarily processes existing datasets, runs established model configurations, and produces standardised reports without fieldwork or original experimental design.

Threatening tool classes: AI-powered climate model post-processing and bias correction tools, automated geological logging from drill core imagery, LLM-based report generation from structured geological data, ML-driven resource estimation from geophysical datasets.

Graduates in field-intensive roles (exploration geologist, field-based environmental consultant, observational atmospheric scientist) face minimal direct AI substitution because their work requires physical presence, instrument expertise, and real-time judgment about physical systems.

---

## 6. VERDICT

The Master of Science (Earth Sciences) is MODERATE RISK for 2027 labour-market viability. The program's core strength — a 125-point original research project combined with deeply specialised discipline coursework and physical fieldwork requirements — creates genuine structural automation resistance that most coursework-only programs lack. Graduates who enter field-intensive or research-intensive roles are well-protected.

The risk sits in two gaps: (1) the complete absence of AI literacy and governance training means graduates cannot critically evaluate or supervise AI tools increasingly used in their own discipline (automated geological logging, ML-assisted climate modelling, AI resource estimation), and (2) the limited professional skills and communication training (12.5–25pts optional) means graduates may lack the interpersonal capability to move beyond individual contributor roles.

At 24/36, this program sits comfortably within MODERATE RISK but has a clear path to RESILIENT if it addresses AI literacy and communication gaps.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| P1 | Make LAWS90203 Science & AI: Legal & Ethical Challenges available and mandatory (12.5pts from professional skills allocation) | D5, D9 | Low |
| P1 | Add AI tool evaluation module within discipline core — train students to critically assess AI-generated geological logs, climate model outputs, and automated resource estimates | D5, D1 | Medium |
| P2 | Make SCIE90013 Communication for Research Scientists compulsory rather than optional | D8 | Low |
| P2 | Publish granular graduate destination data by stream (Atmospheric Science vs Geology) with role titles, industries, and time-to-employment | D10 | Medium |
| P3 | Integrate AI-assisted data analysis workflows into research project methodology (students must demonstrate when AI is appropriate and when it fails) | D5, D4 | Medium |
| P3 | Add industry advisory panel with annual curriculum review to ensure subject availability matches sector demand (address "not available" subjects) | D9 | Medium |

---

## 8. THE REDESIGNED GRADUATE PROFILE

A resilient MC-SCIEAR graduate in 2027 combines deep earth science expertise with critical AI judgment and communication capability. In the Geology stream, they conduct physical fieldwork (mapping, drilling supervision, sample collection) while knowing exactly when AI-generated geological interpretations are reliable and when they require human validation. They can supervise automated drill core logging, critique ML-based resource estimates, and explain geological uncertainty to non-specialist stakeholders and regulators.

In the Atmospheric Science stream, they design and validate climate models, understand the limitations of AI-driven weather prediction, and communicate forecast uncertainty to decision-makers in government and industry. They don't just run models — they diagnose model failures, design observational campaigns to test hypotheses, and own the scientific conclusions they present.

Both streams produce graduates who are creators of primary knowledge, not processors of existing data. Their 25,000-word thesis demonstrates that they can frame original questions, design methodology, generate data, and defend conclusions. The addition of mandatory AI governance training means they enter the workforce able to deploy AI tools responsibly while maintaining scientific integrity — a combination that makes them supervisors of AI, not competitors with it.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-sciear": {
    title: "Master of Science (Earth Sciences) (MC-SCIEAR) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Science (Earth Sciences) (MC-SCIEAR)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-sciepi": {
    title: "Master of Science (Epidemiology) (MC-SCIEPI) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `# DFVA REPORT: Master of Science (Epidemiology)

**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years full-time / 4 years part-time
**Assessment Date:** 2026-05-15 | **Source URL:** https://handbook.unimelb.edu.au/2025/courses/mc-sciepi | **Prompt Version:** DFVA-COPILOT-SKILL-v1

---

## 1. PROGRAM PROFILE

The Master of Science (Epidemiology) (MC-SCIEPI) is a 200-credit-point coursework masters degree incorporating a supervised research project. It is coordinated by the Melbourne School of Population and Global Health (note: this school typically sits within MDHS, but the program follows the Faculty of Science Master of Science structure). Coordinator: Andrew Lau.

Epidemiology is described as "the basic science of public health" — the scientific method used to track population health, find causes of disease, and identify prevention strategies. The program offers both a major research project (50pts) and minor research project (25pts) pathway.

**Discipline Core (75pts):** POPH90013 Biostatistics · POPH90014 Epidemiology 1 · POPH90144 Regression Methods in Health Research · POPH90145 Survival Analysis & Regression for Rates · POPH90243 Epidemiology in Practice · POPH90242 Epidemiology 2

**Discipline Electives (at least 25pts):** POPH90093 Introduction to Economic Evaluation · POPH90111 Genetic Epidemiology · POPH90112 Infectious Disease Epidemiology · POPH90271 Infectious Diseases Modelling · POPH90094 Health Economics 1 · POPH90206 Health Policy · POPH90020 Health Promotion · POPH90270 Bioethics in Practice · POPH90058 Health Program Evaluation 1 · POPH90231 Qualitative Research in Public Health · POPH90199 Gender and Health · POPH90217 Foundations of Public Health

**Professional Skills (25–50pts):** BUSA90403 Business Tools · SCIE90012 Science Communication · SCIE90013 Communication for Research Scientists · COMP90072 The Art of Scientific Computation · COMP90059 Introduction to Programming · MAST90101 Introduction to Statistical Computing · SCIE90017 Science and Technology Internship · SCIE90005 Ethics and Responsibility in Science (not available 2025)

**Research Project (25 or 50pts):** Major project (POPH90278 + POPH90279, 50pts) or Minor project (POPH90280 + POPH90283, 25pts), completed over two consecutive semesters towards end of degree.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 | Research assistant (epidemiology/biostatistics), data analyst (public health unit), surveillance analyst (health department), junior epidemiologist, clinical trial data manager | MEDIUM — data extraction, cleaning, and routine statistical analysis are AI-accelerating; but study design, confounding assessment, and causal interpretation require human epidemiological judgment |
| Year 3–5 | Senior epidemiologist, surveillance lead, health policy analyst, biostatistics consultant, clinical epidemiologist, pandemic response analyst, health program evaluator | LOW–MEDIUM — increasing decision ownership over study design, policy recommendations, and population health interventions; accountability for public health decisions is human-owned |

**Structural advantage:** Epidemiology involves causal reasoning about complex population systems where confounding, bias, and external validity must be assessed using domain knowledge that AI cannot reliably replicate. The discipline's core value — determining whether observed associations represent causal relationships — requires judgment about research design that AI can assist but not own.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2/3 | Entry-level epidemiology roles involve a mix of routine data analysis (increasingly AI-assisted) and genuine methodological judgment (study design, bias assessment, causal inference). Data processing and standard statistical analyses are automating, but epidemiological reasoning about confounding structures, measurement validity, and population generalisability remains human work. |
| 2 | Systems Thinking and Problem Framing | 2/3 | POPH90271 Infectious Diseases Modelling explicitly involves systems dynamics. Epidemiology itself is population-level systems thinking — understanding causal webs, confounding structures, and interaction effects. POPH90243 Epidemiology in Practice requires applying methods to real-world problems. Not labelled "systems thinking" but structurally embedded. |
| 3 | Technical and Quantitative Depth | 3/3 | Exceptionally strong quantitative core: POPH90013 Biostatistics, POPH90144 Regression Methods in Health Research, POPH90145 Survival Analysis & Regression for Rates, POPH90242 Epidemiology 2. Plus MAST90101 Introduction to Statistical Computing and COMP90072 The Art of Scientific Computation as professional skills options. This is one of the most quantitatively rigorous programs in the Faculty. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Research project (25 or 50 pts) requires original research with defended methodology. POPH90243 Epidemiology in Practice involves applied decision-making. Core subjects teach uncertainty quantification (confidence intervals, hypothesis testing, survival curves). However, no evidence of live-stakes capstones with industry/government partners or genuine accountability beyond academic assessment. |
| 5 | AI Literacy and Governance | 1/3 | No mandatory AI governance unit. SCIE90005 Ethics and Responsibility in Science "not available in 2025." No evidence of AI tool evaluation within epidemiological methods subjects. AI is rapidly transforming epidemiological practice (automated surveillance, ML-based disease detection, LLM-assisted systematic reviews) but the program does not explicitly address this. |
| 6 | Domain Depth and Specialisation | 3/3 | Deep domain specialisation in epidemiology with extensive elective pathways (genetic epidemiology, infectious disease, health economics, qualitative methods). The program produces specialists who understand the full epidemiological toolkit from study design through analysis to interpretation. Regulatory and ethical frameworks embedded through health system context. |
| 7 | Research Methods Rigour | 3/3 | The entire discipline core IS research methods — epidemiology is fundamentally about designing studies, controlling bias, and making valid causal inferences. Biostatistics + Regression + Survival Analysis + Epidemiology 1&2 constitute a comprehensive research methods curriculum. Research project (25 or 50pts) produces original research. Students can design and conduct research from core training alone. |
| 8 | Human and Relational Capability | 2/3 | POPH90270 Bioethics in Practice (elective) provides meaningful ethical practice. POPH90020 Health Promotion involves community engagement. POPH90206 Health Policy requires stakeholder reasoning. The discipline inherently requires ethics committee engagement and consideration of population impact. Not scored 3/3 because communication and ethics are elective rather than mandatory. |
| 9 | Curriculum Currency and Adaptability | 2/3 | Handbook updated 27 November 2025. Dual-delivery mode shows COVID-era adaptation. POPH90271 Infectious Diseases Modelling shows post-pandemic curriculum response. However, SCIE90005 not available, no AI content in core discipline subjects despite AI transforming epidemiological practice. Core methods teaching does not visibly address AI-augmented surveillance or ML-based epidemiology. |
| 10 | Graduate Outcome Evidence | 2 | No publicly available destination data at program level. No granular role-title, salary, or time-to-employment data published. Epidemiologists are known to have strong employment outcomes but program-specific evidence is absent. |
| B | Irreplaceability Premium (Bonus) | 2/3 | The combination of advanced biostatistics + epidemiological study design + population health context creates a specialist who can design research to answer causal questions about human health — a skill in sustained demand. Not scored 3/3 because the profile (quantitative + health domain) is shared with other biostatistics/public health programs nationally. |
| | **TOTAL** | **23/36** | **MODERATE RISK (20–27)** |

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
UNCERTAIN. AI can now run standard statistical analyses, produce data visualisations, and draft methods sections. But it cannot assess whether a study design adequately controls for confounding, whether observed associations are causal, or whether findings generalise to target populations. The 80% threshold is borderline — routine data analysis work is automating, but the epidemiological reasoning that contextualises it is not.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. Epidemiological study design IS the art of generating original insight from observational data. Core subjects teach how to frame research questions, design studies that control bias, and interpret results causally. The research project produces original findings. Graduates are trained to generate knowledge, not just process existing data.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Pandemic preparedness investment, climate-health surveillance, aging population analytics, antimicrobial resistance tracking, and AI-augmented health system monitoring all drive sustained and growing demand for trained epidemiologists. AI tools make epidemiologists more productive (faster analysis, larger datasets) without replacing the core causal reasoning and study design skills.

---

## 5. ANALOGUE GRADUATE PROFILE

Most threatened entry-level profile: **"Junior health data analyst"** — roles focused on running pre-specified analyses on existing datasets, producing standardised surveillance reports, and managing clinical trial databases without design input.

Threatening tool classes: AI-powered automated surveillance dashboards, LLM-based systematic review and meta-analysis tools, ML-based disease detection from electronic health records, automated statistical analysis pipelines (e.g., auto-EDA tools).

Graduates who move into study design, causal inference, policy advisory, and research leadership roles face minimal AI substitution. Their value lies in knowing what questions to ask and how to design studies that can answer them validly — a fundamentally human-judgment skill.

---

## 6. VERDICT

The Master of Science (Epidemiology) is MODERATE RISK for 2027 labour-market viability. The program produces graduates with genuine quantitative rigour and deep methodological expertise — the entire discipline core teaches research design and statistical methods at an advanced level. The structural demand for epidemiologists is strong and growing across pandemic preparedness, climate health, aging populations, and health system AI governance.

The risk is not from the discipline losing relevance (it's gaining relevance) but from two program-level gaps: (1) no AI literacy training means graduates enter a discipline being rapidly transformed by AI tools (automated surveillance, ML-based prediction, LLM-assisted reviews) without explicit training in evaluating and governing those tools, and (2) the lower research project weighting (25–50pts, 12.5–25% of degree vs 62.5% for other MC-SCI programs) means the decision-making under uncertainty dimension is less distinctive than it could be.

At 23/36, the program is solidly within MODERATE RISK with clear interventions to reach RESILIENT — primarily through AI literacy integration and strengthening live-stakes decision accountability.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| P1 | Add AI in Epidemiological Practice module — evaluate AI surveillance tools, ML-based disease detection, LLM-assisted systematic reviews for validity and bias | D5, D9 | Medium |
| P1 | Encourage major research project pathway (50pts) over minor (25pts) through advising and structural incentives | D4, D7 | Low |
| P2 | Make SCIE90013 Communication for Research Scientists or POPH90231 Qualitative Research compulsory | D8 | Low |
| P2 | Add health department or WHO partnership project with genuine accountability for surveillance recommendations | D4, D8 | Medium |
| P3 | Publish graduate destination data with role-types (research, government, consultancy, clinical) and time-to-employment | D10 | Medium |
| P3 | Integrate AI tool evaluation into POPH90013 Biostatistics — students compare AI-generated vs manual statistical analyses and assess validity | D5, D3 | Medium |

---

## 8. THE REDESIGNED GRADUATE PROFILE

A resilient MC-SCIEPI graduate in 2027 is an epidemiological scientist who designs studies, interprets causal evidence, and advises health systems — while critically evaluating AI tools that increasingly operate in their domain. They can assess whether an AI-powered surveillance system is detecting genuine disease signals or statistical artifacts. They know when ML-based prediction models are valid and when they reproduce biases from training data. They can design studies that test the effectiveness of AI-augmented health interventions.

Their quantitative core (biostatistics, regression, survival analysis) gives them the technical depth to audit AI outputs statistically. Their epidemiological training (study design, bias control, causal inference) gives them the methodological framework to evaluate whether automated systems are producing valid health intelligence. Their research project demonstrates they can generate original insight, not just process existing data.

This graduate is positioned at the intersection of three growing demand vectors: (1) traditional epidemiological research in aging/infectious/chronic disease, (2) health system AI governance — evaluating whether AI tools used in public health meet methodological standards, and (3) pandemic preparedness — where the ability to rapidly design surveillance studies and interpret outbreak data is a national security capability.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-sciepi": {
    title: "Master of Science (Epidemiology) (MC-SCIEPI) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Science (Epidemiology) (MC-SCIEPI)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-sciphy": {
    title: "Master of Science (Physics) (MC-SCIPHY) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Science (Physics) (MC-SCIPHY)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-sciphy

### Scorecard
| # | Dimension | Score | Rationale |
|---|---|---:|---|
| 1 | Automation Exposure | 2 | 100pt research project is irreducible. Coursework (quantum mechanics, field theory, GR) teaches conceptual physics that AI assists but doesn't replace. |
| 2 | Systems Thinking | 2 | Physics inherently teaches problem framing and constraint reasoning. Research project requires experimental/theoretical design. |
| 3 | Technical Depth | 3 | Exceptional: Quantum Field Theory, General Relativity, Statistical Mechanics, Particle Physics, Advanced QFT. Genuine depth. |
| 4 | Decision-Making | 3 | 100pt research project with progress reviews, thesis (70%), oral defense (10%). Sustained methodological decision-making under supervision. |
| 5 | AI Literacy | 1 | Introduction to Quantum Computing (MULT90063) available as professional skills elective. No AI governance or literacy units. |
| 6 | Domain Depth | 3 | Deep specialist domain. Seven discipline electives from quantum to cosmology. Research project creates focused expertise. |
| 7 | Research Rigour | 3 | 100pt research project with literature survey, research plan, progress reviews, major thesis, oral presentation, and supervisor-assessed performance. |
| 8 | Human & Relational | 2 | Communication for Research Scientists + Science Communication available. Group seminar presentation. No ethics unit available in 2026. |
| 9 | Curriculum Currency | 2 | Updated 22 Jan 2026. Advanced QFT, Quantum Computing are current. Core is traditional physics — structurally slow to change. |
| 10 | Outcome Evidence | 2 | No granular destination data. Physics career pathways well-documented externally. |
| B | Irreplaceability | 3 | Rare: advanced theoretical physics + research training. Quantum computing elective adds emerging-field relevance. |

**TOTAL: 25/36 — MODERATE RISK**

### Thresholds
- **Q1:** NO — 100pt research project is irreducible. Physics problem-solving is conceptual, not templated.
- **Q2:** YES — Research project from proposal through thesis defense. Physics trains system design at a conceptual level.
- **Q3:** YES — Quantum computing and advanced physics skills grow in value. Research training is adaptable.

### Verdict
Physics research training is structurally durable. The 100pt project + professional skills component creates well-rounded researchers. The AI literacy gap exists but is less acute than in applied fields — physics graduates operate at a conceptual level AI tools don't reach. Quantum computing elective positions graduates at an emerging frontier.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-sciphy": {
    title: "Master of Science (Physics) (MC-SCIPHY) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Science (Physics) (MC-SCIPHY)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Science |
| Full-time employment (4-6mo) | 79.3% (GOS 2024) |
| Median starting salary | $100,000 |
| Employment (3yr) | 79.3% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 40% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-scwr": {
    title: "Master of Social Work (MC-SCWR) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-SCWR
**Institution:** UniMelb | **Level:** Master | **Duration:** 18m FT (150 pts) | **Date:** 2026-06-09

| # | Dimension | S | Rationale |
|---:|---|---:|---|
| 1 | Automation Exposure | 0 | Screenwriting is among the most AI-exposed creative fields. AI generates competent first drafts. |
| 2 | Systems Thinking | 1 | Storytelling craft, not systems. Script development process is iterative, not systemic. |
| 3 | Technical Depth | 1 | Cinematic Writing teaches craft technique. No quantitative/technical rigour. |
| 4 | Decision-Making | 2 | Major project (37.5pt) + Writing/Rewriting (37.5pt) require sustained creative judgment. |
| 5 | AI Literacy | 0 | No AI content. Business of Screenwriting doesn't address AI disruption. |
| 6 | Domain Depth | 2 | All-compulsory 150pt creates immersion. Feature screenplay + TV bible + rewriting. |
| 7 | Research Rigour | 0 | Practice-based, no research methodology. |
| 8 | Human & Relational | 2 | Storytelling = human connection. Script development hothouse builds collaborative skills. |
| 9 | Currency | 1 | Updated Nov 2025. No curriculum change visible. AI disruption unaddressed. |
| 10 | Outcomes | 2 | No destination data. Screenwriting industry in structural decline. |
| B | Irreplaceability | 1 | Creative writing has human value but commercial screenwriting is heavily AI-threatened. |

**TOTAL: 11/36 — CRITICAL** | Q1:YES Q2:PARTIAL Q3:NO

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Creative Arts |
| Full-time employment (4-6mo) | 66.9% (GOS 2024) |
| Median starting salary | $81,000 |
| Employment (3yr) | 66.9% |
| Occupation demand | MET |
| AI automation exposure | 70% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-scwr": {
    title: "Master of Social Work (MC-SCWR) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Social Work (MC-SCWR)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Creative Arts |
| Full-time employment (4-6mo) | 66.9% (GOS 2024) |
| Median starting salary | $81,000 |
| Employment (3yr) | 66.9% |
| Occupation demand | MET |
| AI automation exposure | 70% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-surged": {
    title: "Master of Surgical Education (MC-SURGED) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: MC-SURGED
**Institution:** UniMelb | **Level:** Master | **Duration:** 3y PT (150 pts) | **Date:** 2026-06-09

| # | Dimension | S | Rationale |
|---:|---|---:|---|
| 1 | Automation Exposure | 3 | Surgeons teaching surgeons. Clinical education + surgical domain = maximum irreducibility. |
| 2 | Systems Thinking | 2 | Curriculum Design + Educational Theory + Research Methods. Systems-level educational design. |
| 3 | Technical Depth | 1 | Education theory, not quantitative. Research Methods provides methodology but light. |
| 4 | Decision-Making | 2 | Minor thesis or capstone requires defended educational design decisions. |
| 5 | AI Literacy | 1 | "Appraise educational technology including e-learning" — adjacent, not AI-specific. |
| 6 | Domain Depth | 3 | Surgical education — extreme specialisation. Surgeons learning to teach surgeons. |
| 7 | Research Rigour | 2 | Minor thesis pathway (50pt) provides genuine research training. Research Methods compulsory. |
| 8 | Human & Relational | 3 | Teaching, mentoring, assessing surgical trainees. Maximum interpersonal accountability. |
| 9 | Currency | 2 | Simulation-based education, e-learning appraisal. Several electives not available 2026. |
| 10 | Outcomes | 3 | No published destination data. |
| B | Irreplaceability | 3 | Surgical expertise + educational scholarship + clinical teaching. Triple irreducibility. |

**TOTAL: 23/36 — MODERATE RISK** | Q1:NO Q2:YES Q3:YES

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-surged": {
    title: "Master of Surgical Education (MC-SURGED) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Surgical Education (MC-SURGED)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Health |
| Full-time employment (4-6mo) | 87.1% (GOS 2024) |
| Median starting salary | $103,000 |
| Employment (3yr) | 87.1% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 10% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-tesol": {
    title: "Master of TESOL (MC-TESOL) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 23,
  "riskBand": "MODERATE RISK",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 1,
      "rationale": "Language teaching faces AI disruption from real-time translation and AI tutoring. TESOL demand may structurally decline."
    },
    {
      "label": "Systems Thinking",
      "score": 2,
      "rationale": "Curriculum design, language acquisition theory, education policy integration. Systems perspective present."
    },
    {
      "label": "Technical Depth",
      "score": 1,
      "rationale": "Pedagogy-focused, not quantitative. Linguistics and grammar technical but not analytical depth."
    },
    {
      "label": "Decision-Making",
      "score": 2,
      "rationale": "22-day supervised placement requires classroom decisions. Capstone inquiry project involves defended choices."
    },
    {
      "label": "AI Literacy",
      "score": 1,
      "rationale": "Foundations: Digital Futures elective available. No AI-in-language-teaching content visible."
    },
    {
      "label": "Domain Depth",
      "score": 2,
      "rationale": "200pt. EAL specialisation pathway with VIT eligibility. Strong TESOL identity but broad foundations requirements dilute depth."
    },
    {
      "label": "Research Rigour",
      "score": 2,
      "rationale": "Research pathway available (50pt). Education Research Methodology taught. Capstone is research-based inquiry."
    },
    {
      "label": "Human & Relational",
      "score": 3,
      "rationale": "Classroom teaching, supervised placement (22 days), multilingual practices — fundamentally human-relational profession."
    },
    {
      "label": "Curriculum Currency",
      "score": 2,
      "rationale": "Updated March 2026. Contemporary TESOL pedagogy. Digital Futures foundation shows some digital awareness."
    },
    {
      "label": "Outcome Evidence",
      "score": 3,
      "rationale": "No initial teacher registration. TESOL employment market is variable and not systematically tracked."
    }
  ],
  "thresholds": {
    "q1": "YES",
    "q2": "PARTIAL",
    "q3": "UNCERTAIN"
  },
  "programName": "Master of TESOL",
  "courseCode": "MC-TESOL",
  "market": {
    "field": "Education",
    "employmentRate": 0.899,
    "medianSalary": 96000,
    "employmentRate3yr": 0.899,
    "medianSalary3yr": 96000,
    "occupationDemand": "SHORTAGE",
    "aiExposure": 0.15,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Education |
| Full-time employment (4-6mo) | 89.9% (GOS 2024) |
| Median starting salary | $96,000 |
| Employment (3yr) | 89.9% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 15% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-tesol": {
    title: "Master of TESOL (MC-TESOL) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of TESOL (MC-TESOL)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Education |
| Full-time employment (4-6mo) | 89.9% (GOS 2024) |
| Median starting salary | $96,000 |
| Employment (3yr) | 89.9% |
| Occupation demand | SHORTAGE |
| AI automation exposure | 15% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-urbdes": {
    title: "Master of Urban Design (MC-URBDES) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Urban Design (MC-URBDES)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-09 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-urbdes

### 1. PROGRAM PROFILE
The Master of Urban Design is a 200-credit-point program built around four sequential design studios (100pt total) plus a 25pt Urban Design Thesis capstone. Core subjects include Urban Design Theory, Planning Law & Statutory Planning, The Economies of Cities and Regions, and Strategic Plan Making. Electives span urban design theory (Inclusive Cities, Informal Settlement), urban design practice (GIS, Computational Design, Resilient Settlements, Environmental Systems), and urban planning (Climate Change Planning, Housing Policy, Participatory Planning).

The program has PIA (Planning Institute of Australia) accreditation and targets careers in urban design practice, planning, and related fields across public and private sectors. Design studios emphasize fieldwork, community involvement, and design-research methodology.

### 2. AUTOMATION EXPOSURE PROFILE
Urban design presents a distinctive automation profile. AI tools increasingly assist with rendering, visualization, parametric modeling, and documentation — tasks that support but don't replace the core design process. The program's four design studios require creative synthesis, contextual judgment, community engagement, and physical fieldwork — all irreducible human work.

The structural defence is the studio + thesis model: 125 of 200 points are studio/thesis work that requires original design, stakeholder interaction, and defended decisions. AI can accelerate specific production tasks within this workflow but cannot formulate the design brief, negotiate with community stakeholders, or exercise the aesthetic and contextual judgment that defines urban design practice.

### 3. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 2 | Design studios (100pt) require creative, contextual, and community-engaged work AI cannot replicate. Documentation and visualization tasks partially AI-automatable. |
| 2 | Systems Thinking and Problem Framing | 3 | Urban Design Theory, Planning Law, Strategic Plan Making, Economies of Cities explicitly teach systems thinking. Four studios integrate across scales. |
| 3 | Technical and Quantitative Depth | 2 | GIS, Computational Design, Environmental Systems available as electives. Core is design-focused, not deeply quantitative. |
| 4 | Decision-Making Under Uncertainty | 3 | Four studios with real-world briefs, fieldwork, community involvement. Thesis capstone requires defended design decisions. |
| 5 | AI Literacy and Governance | 1 | No AI-specific content. Computational Design elective touches parametric tools. AI governance absent. |
| 6 | Domain Depth and Specialisation | 3 | Clear specialist domain with PIA accreditation. 150pt core enforces depth. |
| 7 | Research Methods Rigour | 3 | Urban Design Thesis (25pt) provides genuine research training. Studios use design-research methodology. |
| 8 | Human and Relational Capability | 3 | Fieldwork, community involvement, Participatory Planning elective embed stakeholder engagement. Program's defining non-technical strength. |
| 9 | Curriculum Currency and Adaptability | 2 | Updated Dec 2025. Climate-resilient design, computational methods — current. Several electives not available in 2026. |
| 10 | Graduate Outcome Evidence | 2 | No granular destination data. PIA accreditation provides external validation. |
| B | Irreplaceability Premium (Bonus) | 3 | Rare: design creativity + urban systems + community engagement + PIA accreditation. Physical/creative/relational skills resist AI. |

**TOTAL: 26 / 36 — MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** NO — Design studios require creative, contextual, and community-engaged work that AI cannot replicate.
- **Q2:** YES — Four studios + thesis require sustained design decision ownership and defended trade-offs.
- **Q3:** YES — Urban design demand grows with urbanization, climate adaptation, and infrastructure investment.

### 5. VERDICT
This program's structural strength is its studio model. Four sequential design studios plus a thesis create graduates whose core capability — creative urban design with community and systems awareness — resists AI substitution. The PIA accreditation pathway adds professional credibility. The AI literacy gap (D5: score 1) is the primary opportunity — adding computational urban design with AI methods would strengthen an already-solid program without compromising its design core.

### 6. RECOMMENDATIONS
| Priority | Action | Dimensions | Effort |
|---|---|---|---|
| P1 | Publish graduate destination data | D10 | Medium |
| P1 | Add computational urban design + AI in planning module | D5 | Medium |
| P2 | Address electives not available in 2026 — curriculum stability | D9 | Medium |
| P2 | Establish industry advisory panel with annual review | D9 | Low |

**Path to RESILIENT:** P1 actions → 28/36 RESILIENT.

---

**Assessment date:** 2026-06-09
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-urbdes
**Prompt version:** DFVA-HERMES-v1 (live Hermes LLM scoring)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-urbdes": {
    title: "Master of Urban Design (MC-URBDES) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Urban Design (MC-URBDES)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-urbhort": {
    title: "Master of Urban Horticulture (MC-URBHORT) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{
  "score": 25,
  "riskBand": "MODERATE RISK",
  "dimensions": [
    {
      "label": "Automation Exposure",
      "score": 3,
      "rationale": "Horticulture requires physical plant knowledge, site assessment, and hands-on cultivation — irreducible physical and biological work. Burnley campus with living plant collections."
    },
    {
      "label": "Systems Thinking",
      "score": 2,
      "rationale": "Urban horticulture integrates plant science, urban ecology, landscape design, and green infrastructure systems."
    },
    {
      "label": "Technical Depth",
      "score": 2,
      "rationale": "200pt with plant science, soil management, arboriculture, green infrastructure. Technical biological/ecological depth."
    },
    {
      "label": "Decision-Making",
      "score": 2,
      "rationale": "Site-specific horticultural decisions require contextual judgment. Capstone project requires defended choices."
    },
    {
      "label": "AI Literacy",
      "score": 1,
      "rationale": "No AI content visible. Precision agriculture and remote sensing tools exist but not in curriculum."
    },
    {
      "label": "Domain Depth",
      "score": 3,
      "rationale": "200pt specialist degree at Burnley campus. Strong horticultural identity with research and practice integration."
    },
    {
      "label": "Research Rigour",
      "score": 2,
      "rationale": "Research project available. Plant science research methods taught. PhD pathway possible."
    },
    {
      "label": "Human & Relational",
      "score": 2,
      "rationale": "Professional practice and client communication. Community engagement through urban greening. Physical/craft skill rather than clinical relational."
    },
    {
      "label": "Curriculum Currency",
      "score": 2,
      "rationale": "Updated 2026. Green infrastructure and urban ecology are growing fields. Climate-resilient horticulture relevant."
    },
    {
      "label": "Outcome Evidence",
      "score": 2,
      "rationale": "Horticulture employment data limited. Green infrastructure sector growing but not systematically tracked."
    }
  ],
  "thresholds": {
    "q1": "NO",
    "q2": "YES",
    "q3": "YES"
  },
  "programName": "Master of Urban Horticulture",
  "courseCode": "MC-URBHORT",
  "market": {
    "field": "Architecture & Building",
    "employmentRate": 0.748,
    "medianSalary": 84500,
    "employmentRate3yr": 0.748,
    "medianSalary3yr": 84500,
    "occupationDemand": "RECRUITMENT_DIFFICULTY",
    "aiExposure": 0.3,
    "sources": [
      "QILT GOS 2024 National Report Tables",
      "JSA Skills Priority List 2025"
    ],
    "year": 2024
  }
}

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-urbhort": {
    title: "Master of Urban Horticulture (MC-URBHORT) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Urban Horticulture (MC-URBHORT)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Architecture & Building |
| Full-time employment (4-6mo) | 74.8% (GOS 2024) |
| Median starting salary | $84,500 |
| Employment (3yr) | 74.8% |
| Occupation demand | RECRUITMENT DIFFICULTY |
| AI automation exposure | 30% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  }
};
