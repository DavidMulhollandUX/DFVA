import { REPORT_CONTENT_MC_SCIBIT } from './reportContent.mc-scibit';
import { REPORT_CONTENT_MC_SCIEAR } from './reportContent.mc-sciear';
import { REPORT_CONTENT_MC_SCIEPI } from './reportContent.mc-sciepi';

export const REPORT_CONTENT: Record<
  string,
  { title: string; institution: string; markdown: string }
> = {
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
Typical early-career roles include junior designer, design assistant, documentation/visualisation support, project coordination support, and graduate analyst roles in design/property workflows.

### 2. AUTOMATION EXPOSURE PROFILE
Market signals for design-adjacent job families show strong compression of routine junior production tasks and rising demand for decision ownership, systems fluency, and AI workflow governance.
Recent hiring patterns (UX/Product, Brand/Digital Content, Service Design/CX, Built Environment Support, Design Ops/Research) consistently favour candidates who can explain design decisions, validate outputs, and work cross-functionally, not only produce artifacts quickly.
Net exposure remains **high** for graduates focused on template/asset execution; exposure decreases where roles require stakeholder accountability, regulatory interpretation, research rigour, and system-level decision making.

### 3. MARKET EVIDENCE SNAPSHOT
| Job Family | Recent Hiring Signal | X Discussion Theme | Curriculum Implication |
|---|---|---|---|
| UX/Product Design | Junior postings increasingly request AI-assisted prototyping plus measurable UX outcomes | "Prompt operator" vs "decision owner" remains a dominant theme | Assess decision quality and impact metrics, not just prototype output |
| Digital Content and Brand | Continued demand for high-volume multi-format output with automation expected | Ongoing concern over commoditisation of pure production tasks | Reduce template-only assessment; add governance and QA evidence requirements |
| Service Design / CX | More roles require process design with stakeholder and operational constraints | Discussions emphasise systems literacy in design teams | Add systems mapping, trade-off defense, and service constraints into core studio work |
| Built Environment Support | Tool-accelerated documentation remains common in early-career pathways | Increased discussion on BIM-assist and workflow automation | Increase regulatory and technical interpretation depth to reduce substitution risk |
| Design Ops / Research | Signals rising for research ops, design systems, and governance ownership | Repeated emphasis on verification and trust in AI-assisted pipelines | Require primary research evidence and repeatable governance practice |

### 4. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 1 | Market signals show junior production tasks are rapidly automated and bundled, increasing substitution risk for artifact-only roles. |
| 2 | Systems Thinking and Problem Framing | 2 | System framing appears in design pedagogy, but hiring signals indicate stronger explicit systems accountability is now expected. |
| 3 | Technical and Quantitative Depth | 1 | Job-family signals increasingly favour hybrid design + analytics/technical literacy beyond current baseline undergraduate depth. |
| 4 | Decision-Making Under Uncertainty | 2 | Demand for defended trade-offs is increasing; current evidence suggests partial but uneven preparation. |
| 5 | AI Literacy and Governance | 1 | Hiring and discourse both indicate governance and verification are becoming core, yet this is not consistently embedded as mandatory capability. |
| 6 | Domain Depth and Specialisation | 2 | Clear pathway specialisation exists, but undergraduate level limits full professional depth. |
| 7 | Research Methods Rigour | 1 | Market demand for evidence-backed design decisions is rising; primary-method rigour remains inconsistent across pathways. |
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
  **NO** (baseline trajectory) — unless curriculum shifts toward technical depth, AI governance, research rigour, and measurable decision impact.

### 6. ANALOGUE GRADUATE PROFILE
Most threatened entry-level profile: **"AI-augmented junior production designer"** whose work is primarily concept variation, formatting, visual generation, and documentation assembly.
Threatening tool classes: multimodal generative design/image systems, LLM-based research/brief synthesis, presentation automation, and workflow copilots integrated into design suites.

### 7. VERDICT
This degree remains academically credible, but market evidence indicates its **default labour-market durability by 2027 is weak unless re-engineered around decision ownership and governance**. Hiring signals and current professional discourse both point to compression of routine production roles and expansion of hybrid expectations: systems thinking, validated AI-assisted workflows, stakeholder accountability, and evidence-backed outcomes. Without these shifts in core assessment and capability architecture, graduates are exposed to role commoditisation in their first 2–5 years.

### 8. RECOMMENDATIONS
| Priority | Action | Dimension | Market Signal Link | Effort |
|---|---|---|---|---|
| P1 | Make AI workflow design + governance a core requirement in all pathways | 5, 1 | Junior hiring signals increasingly require AI-assisted workflow ownership, verification, and quality controls | Medium |
| P1 | Shift assessment from artifact production to defended decisions under constraints | 4, 2 | Design labour market is rewarding accountable decision quality over raw output volume | Medium |
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
| 6 | Domain Depth and Specialisation | 2 | IS is a defined domain; enterprise architecture and governance provide specialist grounding, but dual-stream design dilutes depth |
| 7 | Research Methods Rigour | 2 | *Research Methods in IS* exists on research track; coursework-only track has weaker exposure |
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
The MIS graduate mirrors the **Business Analyst of 2019**: a valued bridge between business and technology who organised information, translated requirements, and coordinated delivery. That role is now the primary target of GitHub Copilot/Cursor, Notion AI/Confluence AI, process mining tools (Celonis, UiPath), agentic project managers (Linear AI, Asana AI), and BI co-pilots (Power BI Copilot, Tableau AI).

### 6. VERDICT
**The Master of Information Systems is HIGH RISK for 2027 labour-market viability as currently structured.** The program has the architecture to be better: enterprise architecture, governance, and research methods units are legitimate differentiators. But without a mandatory AI governance and deployment pillar, stronger technical depth requirements, and explicit positioning of graduates as AI workflow supervisors rather than IS coordinators, the degree is producing graduates for a shrinking role category. **Enrol with a clear upskilling plan, not as a standalone credential.**

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design) | D5, D1, B | High |
| 2 | Mandate real-client AI implementation capstone for all tracks | D4, D1, B | High |
| 3 | Redesign SA&D assessment from BRD production to automation audit with governance recommendation | D2, D4, D1 | Medium |
| 4 | Add mandatory data engineering elective pathway (SQL depth, Python, dbt) | D3, B | Medium |
| 5 | Introduce sector specialisation requirement (health IT, fintech, or govtech cluster) | D6, B | Medium |
| 6 | Publish granular graduate destination data (role-title, industry, salary, time-to-employment) | D10 | Medium |
| 7 | Update program marketing and careers framing to AI workflow architect / automation governance analyst | D1 | Low |

### 8. THE REDESIGNED GRADUATE PROFILE
The viable 2027 MIS graduate is not an information broker — they are an **AI workflow architect with governance accountability**. They enter an organisation and immediately identify which IS processes are candidates for AI augmentation, which carry unacceptable risk if automated, and how to instrument the boundary between human and machine decision-making. They hold sector-specific regulatory knowledge, can brief an engineering team on data pipeline requirements, and have a real-client capstone artifact demonstrating AI governance in practice. They do not use AI tools. They govern, supervise, and redesign them.
`,
  },

  "dfva-market-mc-is": {
    title: "Master of Information Systems (MC-IS) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Information Systems (MC-IS)

**Assessment date:** 2026-05-07
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-is/
**Prompt version:** DFVA-COPILOT-MARKET-v1

> **Evidence confidence note:** Live job-ad retrieval and real-time X/social signal scraping are not available in this session. Signals are constructed from structured knowledge of IS labour markets to early 2026, documented hiring trend reports (WEF Future of Jobs 2025, LinkedIn Jobs on the Rise 2025, McKinsey AI and the Workforce 2024–2025), and pattern inference from the MC-IS curriculum structure.

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
5. Embed sector specialisation requirements (health IT, fintech, or govtech) with domain regulatory content.
6. Publish granular graduate outcome data: role-title, industry, salary-band within 12 months of graduation.
7. Reposition career framing from BA/PM/coordinator to AI workflow architect and automation governance analyst.

### 6. EVIDENCE CONFIDENCE + GAPS
- **Confidence level:** Medium.
- **What is strong:** Directional trend consistency across mainstream job-market signals (WEF, LinkedIn, McKinsey, ISACA, PMI, Gartner).
- **What is limited:** No live ANZ job-ad scrape in this run; signals are synthesised and indicative. ANZ market may lag US/UK by 6–12 months.
- **Critical gaps:** Live ANZ job-ad scrape (last 90 days); UniMelb MC-IS granular graduate destination data; employer interviews from 3–5 regular MC-IS hiring organisations.
`,
  },

  "dfva-recommend-mc-is": {
    title: "Master of Information Systems (MC-IS) — Curriculum Improvement Plan",
    institution: "University of Melbourne",
    markdown: `## DFVA CURRICULUM IMPROVEMENT PLAN: Master of Information Systems (MC-IS)

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
| D6 — Domain Depth | 2/3 | Dual-stream design dilutes specialisation | Require sector elective cluster (health IT, fintech, or govtech) |
| D9 — Curriculum Currency | 2/3 | No AI core units visible in 2026 handbook | Establish employer advisory panel with annual curriculum signal review |
| B — Irreplaceability Premium | 1/3 | Business/technology bridging value is common and undifferentiated | Build rare integration: AI governance + sector depth + data engineering |

### 3. PRIORITISED INTERVENTIONS TABLE
| Priority | Action | Target Dimensions | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |
|---|---|---|---|---|---|---|---|---|
| 1 | Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design) | D5, D1, B | ISACA: AI governance #1 GRC skill; ISO 42001 tripling; Big 4 intake expectations shifted | HIGH | HIGH | Program Director + School of CIS | Months 1–9 design; Sem 1 2027 delivery | Unit live Sem 1 2027; 80%+ student competency on governance frameworks |
| 2 | Mandate real-client AI implementation capstone for all tracks | D4, D1, B | Seek: Automation Analyst +47% YoY; AI Governance Analyst emerging ANZ title | HIGH | HIGH | Capstone Coordinator + Industry Partnerships | Months 4–12 | 100% graduates completing real-client capstone by 2028 |
| 3 | Redesign SA&D assessment: replace BRD with automation audit + governance recommendation | D2, D4, D1 | ANZ BA job ad language shifting; BA entry roles down 18–22% YoY | HIGH | MEDIUM | SA&D Unit Coordinator | Months 2–6 | 90%+ graduates demonstrating automation audit methodology |
| 4 | Add mandatory data engineering elective pathway (SQL, Python, dbt) | D3, B | LinkedIn: Analytics Engineer +31% YoY; Reporting Analyst -22% | HIGH | MEDIUM | School of CIS + Elective Coordinator | Months 3–9 design; Sem 2 2027 | 60%+ graduates completing data engineering elective by 2028 |
| 5 | Introduce sector specialisation requirement (health IT, fintech, or govtech cluster) | D6, B | Regulated sector IS graduates outperforming generalists | HIGH | MEDIUM | Program Director + Faculty Elective Coordinators | Months 6–12 | 100% graduates completing sector cluster by 2028 |
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

**Capstone — Redesigned (all tracks):** Working with a confirmed industry client, design and document an AI workflow implementation. Deliverables: current-state automation audit; proposed AI workflow design with human-in-the-loop specification; governance and compliance framework (NIST AI RMF, ISO 42001, applicable sector regulation); change management plan; failure-mode and risk register; post-implementation measurement plan. Client must confirm the project addressed a real organisational problem.

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
| 3 | Technical and Quantitative Depth | 3/3 | Strongest dimension. Majors in Mathematics, Statistics, Physics, and Chemistry carry genuine technical rigour. Third-year units are substantively demanding. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Experimental science involves uncertainty. Research Project provides authentic exposure but is optional \u2014 many students graduate without a live high-stakes assessment. |
| 5 | AI Literacy and Governance | 1/3 | No mandatory AI literacy or governance unit across the degree. AI appears in computational majors as tooling but no governance framework is embedded at degree level. |
| 6 | Domain Depth and Specialisation | 3/3 | Major structure provides genuine specialisation. Third-year depth in Physics, Chemistry, Biochemistry, or Mathematics is substantive and not easily replicated. |
| 7 | Research Methods Rigour | 3/3 | Scientific method is core curriculum. All majors include experimental design, data collection, and interpretation. Honours stream adds full research methodology rigour. |
| 8 | Human and Relational Capability | 1/3 | Science degrees historically under-invest in interpersonal, ethical, and stakeholder capability. Breadth subjects provide exposure but not core assessment. |
| 9 | Curriculum Currency and Adaptability | 2/3 | 2026 handbook reflects ongoing review; some majors integrated data science tools. No degree-level AI core unit visible \u2014 significant currency gap. |
| 10 | Graduate Outcome Evidence | 2/3 | Faculty-level destination data published; major-level role-title and salary granularity not available. Partial transparency. |
| B | Irreplaceability Premium (Bonus) | 2/3 | Genuine dual-skill value for Cluster B graduates (quantitative + domain science). Physical and life science graduates have domain depth creating non-trivial automation resistance. Generalist graduates without postgrad study are weakly differentiated. |
| **TOTAL** | | **23/36 \u2014 MODERATE RISK** | |

### 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
UNCERTAIN \u2014 highly major-dependent. For Cluster A research assistant roles: YES for documentation, literature review, data entry, and routine analysis. For Cluster B data analyst roles: YES for standard analysis and dashboard production. For Cluster C specialist geoscience/chemistry roles: NO \u2014 domain knowledge and instrument expertise create genuine automation friction.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES \u2014 conditionally. The scientific method is fundamentally about generating original insight. This capability is fully realised only in students who complete third-year research projects and proceed to honours. Three-year graduates who have not engaged with the Research Project have weaker evidence.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES \u2014 for Cluster B and Cluster C specialists. UNCERTAIN \u2014 for Cluster A generalists. Graduates with deep quantitative, computational, or physical science expertise are increasingly valuable as the humans who can validate, interpret, and govern AI-generated scientific outputs.

### 5. ANALOGUE GRADUATE PROFILE

The most exposed B-Sci graduate is the **General Science Graduate of 2021**: broadly capable with solid scientific literacy, entering roles where AI tooling is absorbing the cognitive layer faster than the physical or domain-specialist layer. Specific threats: AlphaFold displacing structural biology prediction work; Elicit and Consensus replacing systematic review that RAs performed; lab automation compressing junior technician roles; GitHub Copilot and Julius AI absorbing Cluster B data analyst work; environmental modelling AI absorbing Cluster C junior interpretation roles.

### 6. VERDICT

**The Bachelor of Science is MODERATE RISK \u2014 a degree with genuine strengths that are unevenly distributed across its graduate population.**

Technical and quantitative rigour (D3: 3/3), domain depth (D6: 3/3), and research methods rigour (D7: 3/3) are legitimate and durable differentiators \u2014 fully realised only for graduates who specialise deeply and continue to postgraduate study.

Two critical gaps undermine the credential: **D5 \u2014 AI Literacy (1/3)**: a science degree in 2026 with no mandatory AI governance unit is a curriculum currency failure. **D8 \u2014 Human and Relational Capability (1/3)**: as AI absorbs the technical execution layer, interpersonal judgment and stakeholder communication become the primary human value-add \u2014 and the degree does not assess this.

The degree is a strong foundation that requires deliberate completion. Students who select a computationally intensive or specialist domain major, complete a research project, proceed to honours or postgraduate study, and actively build AI literacy alongside their degree will be well-positioned in 2027.

### 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Select a major with genuine technical depth \u2014 Mathematics, Statistics, Physics, Chemistry, or Computing and Software Systems | D6, D3 | Low (decision at enrolment) |
| 2 | Complete the Research Project \u2014 optional but the single most important differentiator | D4, D7 | Medium |
| 3 | Build AI literacy deliberately: complete an AI governance certification (AWS AI Practitioner, Google AI Essentials) \u2014 the degree does not provide this | D5 | Low\u2013Medium |
| 4 | Proceed to honours or postgraduate study for research, clinical, or specialist consulting roles | D1, D6 | High |
| 5 | Complete the Science Internship elective \u2014 closes the decision-making and relational capability gap | D4, D8 | Medium |
| 6 | Develop science communication skills through student media, public engagement, or communication electives | D8 | Medium |
| 7 | For Cluster B majors: add Python depth, data engineering fundamentals, and ML model evaluation capability | D3, D5 | Medium |
| 8 | Target early-career roles in regulated domains where domain judgment is legally required | D1, D6 | High |

### 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready B-Sci graduate chose a major with genuine technical depth and completed it at the hardest available level. They did the Research Project in third year \u2014 primary data, defended methodology, genuine uncertainty about whether their results were correct. They understand AI tools as systems with failure modes, training biases, and governance requirements. They have a domain: not science in the broad sense, but a specific regulatory environment, instrument limitation set, or physical system. That domain knowledge is what makes their judgment non-replicable by a general-purpose agent. They can explain their work to a non-scientist \u2014 because in 2027, the value of scientific expertise is realised through collaboration, governance, and communication, not through technical execution alone.

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

**Assessment date:** 2026-05-13
**Prompt version:** DFVA-COPILOT-RECOMMENDER-v1

### 1. DIAGNOSTIC SUMMARY
The B-Sci scored **23/36 \u2014 MODERATE RISK**. Three strong scores (D3, D6, D7: each 3/3) are real and defensible \u2014 but fully realised only for graduates who specialise deeply and proceed to honours or postgraduate study. The two critical 1/3 scores define the primary intervention targets.

| Dimension | Score | Status |
|---|---|---|
| D1 \u2014 Automation Exposure | 2/3 | Adequate |
| D2 \u2014 Systems Thinking | 2/3 | Adequate |
| D3 \u2014 Technical and Quantitative Depth | 3/3 | Strong |
| D4 \u2014 Decision-Making Under Uncertainty | 2/3 | Adequate |
| D5 \u2014 AI Literacy and Governance | 1/3 | Critical gap |
| D6 \u2014 Domain Depth and Specialisation | 3/3 | Strong |
| D7 \u2014 Research Methods Rigour | 3/3 | Strong |
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
| D3 \u2014 Technical Depth | 3/3 | Strong. Risk is in Cluster A majors where quantitative rigour is lighter. | Maintain and defend. Audit quantitative requirements in life sciences majors. |
| D6 \u2014 Domain Depth | 3/3 | Strong. Risk is students selecting shallow majors to avoid difficulty. | Maintain depth requirements. Introduce major selection advising mapping AI substitution pressure to major choice. |
| D9 \u2014 Curriculum Currency | 2/3 | No degree-level AI governance content visible despite recent review. | Establish science curriculum advisory panel with annual review cycle and documented change tracking. |
| D10 \u2014 Graduate Outcome Evidence | 2/3 | Faculty-level data only; major-level granularity unavailable. | Publish major-level graduate destination data: role titles, salary bands, postgraduate study rates within 12 months. |

### 3. PRIORITISED INTERVENTIONS TABLE
| Priority | Action | Target Dimensions | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |
|---|---|---|---|---|---|---|---|---|
| 1 | Create mandatory core unit: AI in Scientific Research (tool evaluation, model limitation analysis, research integrity, NIST AI RMF applied to research) | D5, D9, B | Seek ANZ: AI tool literacy in 34% of science-adjacent postings (up from 11% in 2024); CSIRO and APS science roles requiring ability to evaluate AI model outputs | HIGH | HIGH | Faculty of Science Dean of Teaching + School of CIS (co-design) | Months 1\u20139 design; Sem 1 2027 delivery | Unit live Sem 1 2027; 100% enrolment; 80%+ student proficiency on AI tool evaluation |
| 2 | Mandate Research Project for all students (primary data, defended methodology, failure-mode analysis, AI tool use reflection) | D4, D1, D7, B | RA postings requiring demonstrated primary research experience; junior research roles compressing as AI handles literature synthesis | HIGH | HIGH | Faculty Curriculum Committee + Major Coordinators | Months 3\u201312 redesign; Sem 1 2028 implementation | 100% graduates completing Research Project by 2028 |
| 3 | Create mandatory science communication and ethics unit (stakeholder-facing deliverable: policy brief, public explainer, or client report) | D8, D5, B | APS requiring evidence translation for non-specialist audiences; ANZ biotech citing communication as graduate gap | HIGH | MEDIUM | Faculty of Science + School of Historical and Philosophical Studies (co-design) | Months 2\u20138 design; Sem 2 2027 delivery | Unit live Sem 2 2027; 90%+ graduates completing stakeholder deliverable |
| 4 | Make Science Internship a core elective requirement (decision-making reflection, AI tool use log, accountability statement) | D4, D8, D1 | AECOM, GHD, WSP ANZ adding AI-assisted modelling tools to graduate requirements; biotech explicitly valuing internship-evidenced domain application | HIGH | MEDIUM | Faculty Careers and Industry Engagement | Months 4\u201310 redesign; Sem 1 2027 mandate | 80%+ graduates completing Science Internship by 2028 |
| 5 | Publish major-level graduate destination data (role-title, industry, salary band, postgraduate study rate) | D10, D1 | Students cannot make evidence-based major selection decisions; major-level data directly addresses Cluster A/B/C divergence | MEDIUM | MEDIUM | Faculty + Careers and Employability + Institutional Research | Months 1\u20136 system; Month 12 publish | First major-level destination report by end of 2027 |
| 6 | Introduce AI substitution pressure framing into major selection advising | D1, D9 | Junior lab technician and RA roles compressing; students currently choosing majors without labour-market durability information | MEDIUM | LOW | Faculty Marketing + Careers Team | Months 1\u20133 | Updated advising materials published by Month 3 |
| 7 | Establish Faculty curriculum advisory panel (CSIRO, APS, ANZ biotech/pharma, environmental consulting, AI research institute) | D9, D10 | Government science agencies showing AI literacy as new baseline requirement \u2014 curriculum lag is the structural problem | MEDIUM | MEDIUM | Faculty Dean + Industry Engagement Office | Months 3\u20136 formation | Panel constituted by Month 6; 2 curriculum changes traceable to panel by Month 18 |
| 8 | Introduce graduation portfolio requirement (one research artifact, one AI governance reflection, one stakeholder communication piece) | D4, D8, B | CSIRO and university AI research roles requiring evidence of domain science depth + AI critique capability | MEDIUM | MEDIUM | Faculty + Academic Board | Months 6\u201312 design; Sem 1 2028 implementation | 100% graduates completing portfolio by 2028 |

### 4. 12-MONTH IMPLEMENTATION ROADMAP

**Month 1\u20133 \u2014 Foundation and Quick Wins:** Update major selection advising with AI substitution pressure framing (P6). Initiate major-level graduate destination data system design (P5). Begin curriculum advisory panel formation (P7). Scope AI in Scientific Research unit: assign coordinator, draft learning outcomes, identify co-design partner in Computing and Information Systems (P1). Commission audit of Research Project enrolment rates and barriers (P2 groundwork).

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

**Lagging indicators (12\u201324 months):** Graduate placement in AI-governance or specialist science roles 25%+ of cohort by 2028 \u00b7 Employer satisfaction with AI governance readiness 75%+ rating well prepared \u00b7 DFVA score 26\u201327 by Month 12; 31\u201333 by Month 24 \u00b7 Research Project completion rate 100% by 2028 \u00b7 Science Internship completion rate 80%+ by 2028 \u00b7 Time-to-employment median 90 days \u00b7 Cluster B major enrolment up 15%+ by 2028.

### 8. REDESIGNED GRADUATE PROFILE (2027 READY)
The 2027-ready B-Sci graduate did not coast through a broad science degree hoping that scientific literacy would be enough. They chose a major with genuine technical depth, completed a primary research project with pre-registration and a defended methodology, and finished their degree able to look at an AI tool in their domain and tell you exactly where it fails. They completed a Science Internship in a regulated or high-stakes environment. Their graduation portfolio has three artifacts that no AI can produce for them: a primary research dataset with a defended methodology, an AI governance brief for a tool in their domain, and a stakeholder communication piece reviewed by a non-specialist panel. They are the person their research group or employer relies on to decide which AI outputs to trust \u2014 and why.
`,
  },


  "dfva-recommend-b-des": {
    title: "Bachelor of Design (B-Des) — Curriculum Improvement Plan",
    institution: "University of Melbourne",
    markdown: `## DFVA CURRICULUM IMPROVEMENT PLAN: Bachelor of Design

### 1. DIAGNOSTIC SUMMARY

The Bachelor of Design scored **17/36 — HIGH RISK**. Five critical 1/3 scores define the primary intervention targets.

| Dimension | Score | Status |
|---|---|---|
| D1 — Automation Exposure | 1/3 | Critical gap |
| D2 — Systems Thinking | 2/3 | Adequate |
| D3 — Technical Depth | 1/3 | Critical gap |
| D4 — Decision-Making | 2/3 | Adequate |
| D5 — AI Literacy | 1/3 | Critical gap |
| D6 — Domain Depth | 2/3 | Adequate |
| D7 — Research Methods | 1/3 | Critical gap |
| D8 — Human/Relational | 2/3 | Adequate |
| D9 — Curriculum Currency | 2/3 | Adequate |
| D10 — Graduate Outcome Evidence | 1/3 | Critical gap |
| B — Irreplaceability Premium | 2/3 | Adequate |
| **TOTAL** | **17/36** | **HIGH RISK** |

Five 1/3 scores represent the degree's primary intervention targets: automation exposure, technical depth, AI literacy and governance, research methods, and graduate outcome evidence.

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

**Months 1–12 — Structural Fix (target: 22–24/36 MODERATE RISK):** Close five critical 1/3 scores. AI in Design Practice live (D5: 1→3). Specialisation destination data published (D10: 1→2). Design and Technology Integration in approval pipeline (D3: 1→2 target). Quantitative research module integrated (D7: 1→2). Automation exposure addressed via assessment redesign (D1: 1→2).

**Months 13–18 — Depth and Differentiation (target: 28–30/36 RESILIENT):** Design and Technology Integration live Sem 2 2027 (D3: 2→3). Live-client capstone mandate implemented (D4: 2→3, D1: 2→3). Interaction Design specialisation strengthened (D6: 2→3). Advisory panel completing first full cycle (D9: 2→3).

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
**Assessment Date:** 2026-04-21 | **Source Report Reference:** DFVA Report: Bachelor of Design, University of Melbourne — 17/36 HIGH RISK | **Prompt Version:** DFVA-COPILOT-RECOMMENDER-v1
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
- **What is limited:** No direct API-fed count extraction in this run; signals are synthesised and indicative.
- **How to improve next run:** Add structured scraping/API pipeline for dated posting counts by role family and region.

---
**Assessment date (ISO format):** 2026-04-21
**Source URL(s):** https://handbook.unimelb.edu.au/2025/courses/b-des
**Prompt version:** DFVA-COPILOT-MARKET-v1
`,
  },
};
