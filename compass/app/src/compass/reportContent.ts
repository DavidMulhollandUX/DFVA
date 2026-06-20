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
  "dfva-439fs": {
    title: "Master of Food Science (439FS) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Food Science (439FS)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/439fs

### 1. PROGRAM PROFILE
The Master of Food Science at the University of Melbourne prepares graduates for professional practice in food technology, food safety, regulatory affairs, and food product development. The program covers food microbiology, food chemistry, food processing technology, sensory science, food quality systems, and regulatory compliance with the Food Standards Australia New Zealand (FSANZ) framework.

The 200-credit-point program integrates laboratory science with food industry application, including industry-facing projects or placements. Core competencies include HACCP system design, food product formulation, shelf-life testing, and regulatory submission preparation.

Typical graduate roles include food technologist, food safety officer, regulatory affairs specialist, product development scientist, quality assurance manager, and food industry researcher. The program is accredited by the Royal Australian Chemical Institute (RACI) Food Chemistry group.


###  3. DFVA SCORECARD
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

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** UNCERTAIN — food processing and quality testing are increasingly automated; product development and sensory evaluation resist substitution.
- **Q2:** UNCERTAIN — research project provides some decision ownership. Industry focus is more technique-application than system design.
- **Q3:** UNCERTAIN — food science is a stable field. Growth in plant-based/alternative proteins and food tech creates opportunities but the program doesn't explicitly target these frontiers.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed food science graduate is the **Food Technologist of 2021**: primarily conducting routine quality control testing, product specification development, and regulatory compliance documentation — work increasingly systematised by AI quality management platforms and automated testing.

Specific threats:
- **AI food safety platforms (FoodLogiQ, Trustwell AI)** — automated HACCP monitoring, compliance checking, and documentation generation
- **AI formulation tools** — automated product formulation from ingredient constraints and nutritional targets
- **Robotic quality control systems** — replacing manual sensory assessment and routine QC testing in manufacturing
- **AI regulatory compliance tools** — automated food standards compliance checking against FSANZ and international standards

---

### Verdict
A solid industry-oriented program with comprehensive food supply chain coverage. The flexible research project (25-50pt) means graduate differentiation depends on project depth chosen. The program would benefit from explicit food-tech/AI integration given rapid innovation in alternative proteins, precision fermentation, and smart food processing.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready food science graduate is not a QC technician — they are a **food systems specialist** who understands the whole chain from ingredients to consumer health outcomes.

They have worked in a real food production context — understanding the constraints of scale, the economics of reformulation, the regulatory timelines for approval, and the sensory expectations of specific consumer segments. That operational knowledge is not in a laboratory handbook and cannot be learned from a formulation database.

They understand the sustainability dimensions of food production: the environmental impact of ingredient sourcing, the food waste implications of product design, and the regulatory direction of travel on packaging and processing. They can advise a food company not just on whether a reformulation is technically feasible but on whether it is strategically sound given regulatory trends.

They use AI formulation tools as accelerators — they know which constraints to set, which outputs to scrutinise, and which recommendations to override based on their sensory and processing expertise. That judgment layer is what makes them a food scientist rather than an AI operator.

---

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
    markdown: `## DFVA REPORT: 527CL
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/527cl  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Clinical Psychology at the University of Melbourne is an APHRA-approved clinical training program leading to registration as a psychologist. The 2-year (200pt) program combines coursework in psychological assessment and treatment with a substantial supervised clinical placement.

Core components include advanced psychological assessment, evidence-based treatment (CBT, DBT, ACT, and related modalities), neuropsychological assessment, child and adolescent psychology, and research methods. Clinical placements provide a minimum of supervised hours required for general registration, with additional specialist hours available through the internship structure.

Typical graduate pathways include clinical psychologist (private practice), hospital-based psychologist, community mental health service, neuropsychological assessment, and specialist clinical researcher.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Psychological assessment, individual therapy, case formulation, clinical report writing | **MEDIUM–LOW** — Core clinical work requires human presence, clinical judgment, and therapeutic alliance that AI cannot replicate |
| Year 3–5 | Experienced clinical psychologist — complex case management, supervision, specialist assessment | **LOW** — Specialist clinical judgment, regulatory accountability, and therapeutic relationship are professional requirements |
| Year 5+ | Senior clinician, supervisor, academic/researcher | **LOW** — Leadership, supervision, and research in psychology are strongly human-professional |

**Regulatory protection:** Clinical psychology is APHRA-regulated with mandatory supervised hours, professional liability, and continuing professional development requirements. These create genuine barriers to AI substitution at the practitioner level.

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 27/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed clinical psychology graduate is the **Low-Acuity Mental Health Support Worker of 2021**: providing structured CBT-based support for mild-to-moderate anxiety and depression through structured protocols — work that AI mental health platforms are beginning to augment.

Specific threats:
- **Woebot, Wysa, Koko** — AI mental health chatbots providing structured CBT-based interventions for mild presentations
- **AI mental health assessment screeners** — automated PHQ-9, GAD-7, and similar instruments with AI-driven triage
- **Telehealth platform AI** — session note automation and clinical documentation support
- **AI-assisted diagnosis tools** — pattern-matching for common presentations

However, the MC-527CL graduate profile is substantially more protected than this: APHRA registration, supervised clinical hours, and specialist clinical training position graduates in complex case management where AI tools function as supports rather than replacements.

### 6. VERDICT
**The Master of Clinical Psychology is MODERATE RISK (upper boundary) — a degree with strong professional protections and genuine clinical complexity that resists AI substitution.**

The program's score (27/36) reflects the real and substantial automation resistance of regulated clinical psychology practice: mandatory supervised hours, APHRA registration, professional liability, and the irreducibly human nature of the therapeutic relationship.

The key gap is AI literacy (D5: likely 1/3): the mental health AI landscape is developing rapidly, and clinical psychologists who cannot evaluate and govern AI tools in clinical contexts — assess their reliability for specific presentations, explain their limitations to clients, and document clinical reasoning when overriding AI suggestions — will be under-prepared for 2027 practice.

The degree is well-positioned: complex psychological assessment and treatment require exactly the kind of contextual, relational, and professional judgment that AI cannot yet replicate.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI literacy for clinical contexts — evaluate AI mental health tools, understand their evidence base, and develop governance frameworks for clinical AI use | D5 | Medium |
| 2 | Specialise in complex presentation areas (personality disorders, trauma, neuropsychology) where AI tools have least capability | D6 | High |
| 3 | Build supervision and training capacity — mentor-level clinical professionals are less AI-exposed and more professionally valued | D8 | High (post-graduation) |
| 4 | Complete the maximum available supervised hours during training — clinical experience is the primary differentiator in psychological practice | D4, D8 | High (built-in) |
| 5 | Engage with telehealth and digital platform clinical governance — psychologists who can advise on AI mental health tool deployment are an emerging specialist role | D5, D6 | Medium |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready clinical psychology graduate is not a protocol administrator — they are a **clinical reasoning specialist** who understands what the evidence base shows and what it misses for their specific client's presentation.

They have done complex clinical work: a client whose presentation didn't fit the standard protocol, where they had to modify the intervention, document the clinical reasoning, and defend that modification in supervision. They know what good formulation feels like — not a diagnostic checklist but a genuine explanatory model of how this person's history, cognition, biology, and social context have produced this specific suffering.

They are aware of what AI mental health tools can and cannot do. When a client asks them whether they should use a mental health app, they can give a specific, evidence-grounded answer — not a generic endorsement or dismissal. That clinical AI literacy, combined with APHRA registration and complex case experience, is what positions them as professionals in the AI-augmented mental health landscape.

They understand that the therapeutic relationship — the experience of being genuinely heard, understood, and cared for by another human — is not a feature that an AI system can replicate, and that this relationship is not incidental to effective psychological treatment but central to it.

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
    markdown: `## DFVA REPORT: 746ST
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/746st  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Engineering Structures at the University of Melbourne is a specialist structural engineering program preparing graduates for professional practice in structural analysis, design, and assessment. It provides a pathway to Chartered Professional Engineer (CPEng) status.

The program covers structural analysis theory, concrete and steel design, foundation engineering, earthquake engineering, structural dynamics, and advanced computational methods. Graduate roles include structural engineer, project engineer, design engineer, and infrastructure specialist in construction, infrastructure, and engineering consultancy.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Structural analysis runs, design documentation, drawing production, specifications | **MEDIUM** — Analysis software (SAP2000, ETABS) increasingly AI-enhanced; but engineering judgment required for load path interpretation and code compliance |
| Year 3–5 | Project engineer, senior structural engineer — design authority and review | **LOW–MEDIUM** — Professional accountability and design sign-off create automation barriers |
| Year 5+ | Principal engineer, CPEng — engineering certification and project leadership | **LOW** — Professional registration and engineering judgment are not delegatable |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 20/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed engineering structures graduate is the **Junior Structural Drafter of 2021**: primarily producing standard structural drawings, running routine analysis models, and generating specification sections — work increasingly absorbed by BIM automation and AI structural analysis tools.

Specific threats:
- **AI structural analysis tools (Speckle, Autodesk Robot AI)** — automated structural optimisation and load path analysis
- **Generative structural design AI** — parametric structural form generation from performance constraints
- **AI code-compliance checkers** — automated compliance review for structural codes (AS 3600, AS 4100)
- **BIM AI documentation** — automated drawing and specification generation from structural models

### 6. VERDICT
**The Master of Engineering Structures is MODERATE RISK — a professionally regulated degree with genuine automation barriers from engineering accountability requirements.**

Professional registration (CPEng pathway), engineering sign-off liability, and the complexity of structural assessment in existing buildings and non-standard conditions create real automation barriers. Graduates who develop specialist expertise in earthquake engineering, heritage structures, or complex geometry gain additional differentiation.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Pursue CPEng accreditation path actively — professional registration is the primary long-term differentiator in structural engineering | D6 | High (post-graduation) |
| 2 | Develop computational modelling depth — Python, FEM scripting, and parametric structural design are growth competencies | D3, D5 | Medium |
| 3 | Specialise in complex structural assessment — existing buildings, heritage, earthquake retrofitting are more human-judgment intensive than standard new-build work | D6 | Medium |
| 4 | Build materials and construction knowledge — physical understanding of how structures behave in reality is not replicable by finite element models | D3 | Medium |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready engineering structures graduate is not a model runner — they are a **structural judgment specialist** whose professional signature means something.

They have assessed a structure under uncertainty — a building where the documentation was incomplete, the material properties were unknown, and the loading history was unclear. They made a professional judgment about structural adequacy under those conditions and documented the reasoning. That judgment, combined with their CPEng accountability, is what makes their assessment legally defensible.

They understand what finite element models assume and what they miss: the difference between modelled behaviour and observed behaviour in real structures. They have seen structures perform differently from their models and they know why. That gap between model and reality is where structural engineering judgment lives.

They use AI analysis tools to generate options rapidly, then apply engineering judgment to select, validate, and govern the design. They are not a human calculator — they are the professional who takes responsibility for whether the structure stands.

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
| 10 | Graduate Outcome Evidence | 2 | Employer-side differentiation is increasingly capability-specific, but outcome visibility is still broad rather than role/task granular. |
| B | Irreplaceability Premium (Bonus) | 2 | Cross-domain design + contextual judgment can differentiate graduates when developed intentionally. |

**TOTAL: 17 / 36**  
**Risk band: HIGH RISK (12-19)**

### 5. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?  
  **YES** - current hiring signals show routine output tasks are increasingly automated, and entry-level value is shifting toward decision accountability not production throughput.
- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?  
  **UNCERTAIN** - there are foundations in studio/problem framing, but market evidence indicates stronger explicit systems/governance capability is now required than currently guaranteed.
- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?  
  **NO** (baseline trajectory) - unless curriculum shifts toward technical depth, AI governance, research rigour, and measurable decision impact.

### 6. ANALOGUE GRADUATE PROFILE
Most threatened entry-level profile: **"AI-augmented junior production designer"** whose work is primarily concept variation, formatting, visual generation, and documentation assembly.  
Threatening tool classes: multimodal generative design/image systems, LLM-based research/brief synthesis, presentation automation, and workflow copilots integrated into design suites.

### 7. VERDICT
This degree remains academically credible, but market evidence indicates its **default labour-market durability by 2027 is weak unless re-engineered around decision ownership and governance**. Hiring signals and current professional discourse both point to compression of routine production roles and expansion of hybrid expectations: systems thinking, validated AI-assisted workflows, stakeholder accountability, and evidence-backed outcomes. Without these shifts in core assessment and capability architecture, graduates are exposed to role commoditisation in their first 2-5 years.

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
  "dfva-market-b-des": {
    title: "Bachelor of Design (B-DES) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Bachelor of Design (B-DES)

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
  "dfva-b-sci": {
    title: "Bachelor of Science (B-SCI) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `# DFVA REPORT: Bachelor of Science

**Institution:** University of Melbourne
**Level:** Bachelor (Undergraduate)
**Duration:** 3 years (300 credit points)

---

**Assessment Date:** 2026-05-13
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/b-sci
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Bachelor of Science at the University of Melbourne is a broad undergraduate science degree offering majors across biological, physical, mathematical, computational, and earth sciences. Students select a primary major and often a second major or specialisation from over 40 options. The degree is a common pathway into graduate entry programs in medicine, dentistry, optometry, physiotherapy, and research higher degrees, as well as direct entry into science-adjacent industry roles.

Because the degree spans an unusually wide range of disciplinary directions, this assessment is structured around the **three most common graduate outcome clusters** rather than the degree as an undifferentiated whole:

- **Cluster A — Life Sciences** (Biochemistry, Genetics, Microbiology, Zoology, Ecology): pathways into research, health, biotechnology, agriculture
- **Cluster B — Computational and Mathematical Sciences** (Mathematics, Statistics, Computing and Software Systems, Data Science): pathways into data, software, quantitative analysis
- **Cluster C — Physical and Earth Sciences** (Physics, Chemistry, Earth Sciences, Environmental Science): pathways into research, engineering-adjacent roles, resources, environment consulting

Where scores diverge significantly by cluster, this is noted. The overall score represents the degree-level central tendency.

Key structural features:
- **Breadth subjects** required across arts, commerce, and science outside the major
- **Research Project** available as a final-year capstone (not mandatory for all students)
- **Science Internship** available as an elective
- Major-specific core units vary substantially in technical depth
- No mandatory AI or data science unit across all majors

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1 (graduate) | Laboratory technician support, data entry, routine testing, field assistant, research assistant (RA) roles | **HIGH** — Routine lab and data work directly in AI/robotics substitution path; RA documentation tasks increasingly automated |
| Year 2–3 | Junior scientist, graduate analyst, environmental consultant (junior), science communicator, graduate data analyst | **MEDIUM–HIGH** — Cluster B graduates in data roles face high substitution at entry; Cluster A graduates in research face less immediate pressure but limited roles; Cluster C graduates in consulting face documentation compression |
| Year 4–7 | Research scientist (post-grad required), specialist consultant, data scientist, science educator, biotech professional | **LOW–MEDIUM** — Specialist depth and domain judgment begin to differentiate; most viable paths require postgraduate study |

**Structural risk:** A significant portion of B-Sci graduates do not proceed to honours or postgraduate study and enter the workforce with a generalist three-year science credential. Without a defined specialist domain or postgraduate depth, this cohort is particularly exposed — the degree signals broad scientific literacy but does not confer the deep technical or clinical expertise that creates genuine automation resistance.

**Cluster divergence:**
- **Cluster B** graduates (computational/mathematical) have the strongest standalone labour-market durability but face rapid AI tool compression at junior data/analyst levels
- **Cluster A** graduates face a credential problem — most high-value roles require honours or postgraduate study; those who stop at three years often land in roles below their credential level
- **Cluster C** graduates have the most stable specialist niches (geoscience, environmental science, chemistry) but niche volume is limited

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2/3 | Cluster B graduates land in data/computational roles with meaningful judgment requirements; Cluster A and C graduates face higher early-career routine work exposure. Overall: mixed profile — not all templated, but entry is uneven. |
| 2 | Systems Thinking and Problem Framing | 2/3 | Science methodology teaches hypothesis formation and experimental design — genuine systems thinking. However, integration across the degree varies by major; not all majors embed failure-mode or trade-off reasoning consistently. |
| 3 | Technical and Quantitative Depth | 3/3 | This is the degree's strongest dimension. Majors in Mathematics, Statistics, Physics, and Chemistry carry genuine technical rigour assessed at depth. Even life sciences majors require quantitative methods. Third-year units are substantively demanding. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Experimental science inherently involves uncertainty. However, authentic capstone projects with real stakes are not mandatory — the Research Project is available but not required. Many students graduate without a live uncertainty assessment. |
| 5 | AI Literacy and Governance | 1/3 | No mandatory AI literacy or governance unit across the degree. AI appears in some computational majors (Computing and Software Systems, Data Science major) as tooling, but no governance or deployment framework is embedded at degree level. |
| 6 | Domain Depth and Specialisation | 3/3 | The major structure provides genuine specialisation. Third-year depth in Physics, Chemistry, Biochemistry, or Mathematics is substantive and not easily replicated. Domain depth is a real differentiator — especially for Cluster B and Cluster C. |
| 7 | Research Methods Rigour | 3/3 | Scientific method is core curriculum. All majors include experimental design, data collection, and interpretation. Third-year research projects and laboratory units involve primary data generation. Honours stream adds full research methodology rigour. |
| 8 | Human and Relational Capability | 1/3 | Science degrees historically under-invest in interpersonal, ethical, and stakeholder capability. Breadth subjects provide some exposure but this is not assessed as a core competency. Ethics appears in some majors (genetics, ecology) but lightly. |
| 9 | Curriculum Currency and Adaptability | 2/3 | 2026 handbook reflects ongoing review; some majors have integrated data science and computational tools. However, no degree-level AI core unit is visible — a significant currency gap given the pace of AI tooling in scientific research. |
| 10 | Graduate Outcome Evidence | 2 | UniMelb publishes graduate outcome data at faculty level; Science faculty data shows destination distribution but lacks role-title and salary granularity at major level. Partial transparency. |
| B | Irreplaceability Premium (Bonus) | 2/3 | The B-Sci carries genuine dual-skill value for Cluster B graduates (quantitative + domain science). Physical and life science graduates have domain depth that creates non-trivial automation resistance in specialist roles. Generalist graduates without postgrad study are weakly differentiated. |
| **TOTAL** | | **23/36** | |

**Risk Band: MODERATE RISK**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
**UNCERTAIN — highly major-dependent.**
For a Cluster A graduate entering a research assistant or junior lab technician role: **YES** for documentation, literature review, data entry, and routine analysis. Physical lab work and instrument operation are not yet fully automatable, but the cognitive layer above it increasingly is.
For a Cluster B graduate entering a data analyst role: **YES** for standard analysis, dashboard production, and reporting. The statistical and mathematical depth creates some resistance, but entry-level output is still heavily templated.
For a Cluster C graduate in a specialist geoscience or chemistry role: **NO** — domain knowledge and physical/instrument expertise create genuine automation friction at entry.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
**YES — conditionally.**
The scientific method is fundamentally about generating original insight. Experimental design, hypothesis testing, and primary data collection are core to the degree. However, this capability is only fully realised in students who complete third-year research projects and proceed to honours. Three-year graduates who have not engaged with the Research Project option have weaker evidence of this capability.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
**YES — for Cluster B and Cluster C specialists. UNCERTAIN — for Cluster A generalists.**
AI is augmenting scientific research, not replacing it at the specialist level. Graduates with deep quantitative, computational, or physical science expertise are increasingly valuable as the humans who can validate, interpret, and govern AI-generated scientific outputs. However, graduates who stop at a three-year general science credential without specialist depth or postgraduate study face compressing demand for their specific credential level.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed B-Sci graduate is the **General Science Graduate of 2021**: a broad, intellectually capable candidate with solid scientific literacy, some quantitative training, and laboratory experience, who enters the workforce as a research assistant, data analyst, or junior consultant — and finds that the cognitive layer of their role is being absorbed by AI tooling faster than their physical or domain-specialist layer.

Specific threats by cluster:

**Cluster A — Life Sciences:**
- **AlphaFold / protein structure AI** — replacing structural biology prediction work that was junior researcher territory
- **Automated literature synthesis (Elicit, Consensus, Perplexity)** — replacing systematic review and literature mapping work that RAs performed
- **Lab automation (Beckman Coulter, Hamilton Robotics)** — compressing junior lab technician roles in high-throughput settings
- **AI-assisted data analysis (R Copilot, Python AI tools)** — absorbing routine data cleaning and statistical analysis

**Cluster B — Computational/Mathematical:**
- **GitHub Copilot / Cursor** — replacing junior code production and documentation
- **AI data analysts (Julius, ChatGPT Advanced Data Analysis)** — replacing standard data wrangling and visualisation
- **Automated statistical reporting tools** — replacing templated analysis pipelines

**Cluster C — Physical/Earth Sciences:**
- **AI geological interpretation tools (Geolog AI, SLB)** — compressing junior interpretation roles in resources
- **Environmental modelling AI** — absorbing routine environmental impact assessment drafting
- **Remote sensing AI** — replacing manual satellite image analysis roles

---

## 6. VERDICT

**The Bachelor of Science is MODERATE RISK — a degree with genuine strengths that are unevenly distributed across its graduate population.**

The degree's technical and quantitative rigour (D3: 3/3) and domain depth (D6: 3/3) are legitimate and durable differentiators. Scientific method and research rigour (D7: 3/3) are not easily replicated by AI — they require training, judgment, and domain knowledge that takes years to develop. These strengths are real.

The problem is that these strengths are fully realised **only for graduates who specialise deeply and continue to postgraduate study**. The three-year generalist graduate — particularly from life sciences majors — exits with a credential that signals broad scientific capability without conferring the specialist depth that creates automation resistance. That graduate is competing for roles that AI tooling is actively compressing.

Two specific gaps are structurally significant:

**Gap 1 — AI Literacy (D5: 1/3).** A science degree in 2026 with no mandatory AI governance or deployment unit is a curriculum currency problem. Graduates will work alongside AI tools in every scientific domain; the degree does not prepare them to supervise, critique, or govern those tools at the level their employers will expect within three years of graduation.

**Gap 2 — Human and Relational Capability (D8: 1/3).** Science graduates consistently underperform in roles that require stakeholder communication, ethical reasoning, and relational accountability. This gap becomes more visible as AI absorbs the technical execution layer, leaving interpersonal and ethical judgment as the primary human value-add.

**The degree is a strong foundation that requires deliberate completion.** Students who select a computationally intensive or specialist domain major, complete a research project, proceed to honours or postgraduate study, and actively build AI literacy alongside their degree will be well-positioned in 2027. Students who do none of these things face meaningful labour-market risk.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Select a major with genuine technical depth — Mathematics, Statistics, Physics, Chemistry, or Computing and Software Systems — not a generalist or combined major that dilutes specialisation | D6, D3 | Low (decision at enrolment) |
| 2 | Complete the Research Project (third-year capstone) — this is optional but the single most important differentiator between a three-year graduate with and without autonomous research capability | D4, D7 | Medium |
| 3 | Build AI literacy deliberately: complete at least one external AI governance or deployment certification (AWS AI Practitioner, Google AI Essentials, or equivalent) — the degree does not provide this | D5 | Low–Medium |
| 4 | Proceed to honours or postgraduate study if targeting research, clinical, or specialist consulting roles — the three-year credential alone is insufficient for most high-value paths | D1, D6 | High |
| 5 | Complete the Science Internship elective — real-stakes client or employer exposure is not mandated by the degree; the internship closes the decision-making and relational capability gap | D4, D8 | Medium |
| 6 | Develop science communication and stakeholder engagement skills actively — through student media, public engagement, or communication electives — to build the relational layer the degree does not assess | D8 | Medium |
| 7 | For Cluster B majors (Maths, Stats, Computing): add Python depth, data engineering fundamentals, and ML model evaluation capability — do not stop at tool consumption, build toward model governance | D3, D5 | Medium |
| 8 | Target early-career roles in regulated or high-stakes domains (clinical research, environmental regulation, pharmaceutical, defence science) where domain judgment is legally required | D1, D6 | High |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready B-Sci graduate did not treat their degree as a general science credential — they treated it as a specialist foundation and built deliberately on top of it.

They chose a major with genuine technical depth and completed it at the hardest available level. They did the Research Project in third year, which means they have experience generating original data, defending a methodology, and sitting with genuine uncertainty about whether their results were correct. They know what it feels like to be wrong and to have to explain why.

They understand AI tools not as productivity shortcuts but as systems with failure modes, training biases, and governance requirements. They can look at an AI-generated analysis of a biological dataset or a geochemical model and ask the right questions: what was in the training data, where does the model fail at the edges of its distribution, and who is accountable when it is wrong?

They have a domain. Not "science" in the broad sense — they know the regulatory environment of clinical trials, or the instrument limitations of mass spectrometry, or the assumptions embedded in climate models. That domain knowledge is what makes their judgment non-replicable by a general-purpose agent.

They can explain their work to a non-scientist. Not as a simplification, but as a genuine translation — because they know that in 2027, the value of scientific expertise is increasingly realised through collaboration, governance, and communication, not through technical execution alone.

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
  "dfva-market-b-sci": {
    title: "Bachelor of Science (B-SCI) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Bachelor of Science (B-SCI)

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


### 5. ANALOGUE GRADUATE PROFILE

The most exposed actuarial science graduate is the **Junior Actuarial Analyst of 2021**: entering an insurance firm as the primary handler of reserving calculations, pricing model runs, and regulatory reporting submissions — precise, structured mathematical tasks that actuarial software platforms and AI tools are actively automating.

Specific threats:
- **Actuarial AI platforms (Quantee, Akur8)** — automated pricing model generation from claims data, replacing manual model design at junior levels
- **Willis Towers Watson Radar Live / Moody's RMS AI** — automated catastrophe modelling and reserving runs
- **AI regulatory reporting tools** — APRA reporting automation reducing junior analyst time on structured submissions
- **Excel AI and Python AutoML** — absorbing the routine modelling and data transformation work that forms the bulk of first-two-year actuarial output

---

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


### 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready actuarial science graduate is not a calculator — they are a **risk governance specialist** who understands what the actuarial models do and what they miss, and who can own the accountability when they are wrong.

They have completed the accreditation examination track, which means they carry professional liability. They know the regulatory framework for the product lines they work with. When the automated pricing model produces an output that looks right but is wrong for regulatory reasons, they are the person who catches it and explains why.

They understand the AI tools in their firm's technology stack: what training data the claims model uses, where it fails at distribution edges, and what the governance requirement is when an AI-generated premium recommendation deviates from actuarial professional judgment. That combination — mathematical rigour plus AI governance literacy plus professional accountability — is what the AI era of insurance actually requires.

They have added data analytics capability (Python, R, SQL at depth) that makes them fluent in the same technical language as the AI tools they oversee. They are not just an actuarial examiner — they are an actuarial data scientist with professional credentials.

---

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
    markdown: `## DFVA REPORT: MC-APBUSA
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-apbusa  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Applied Business Analytics at the University of Melbourne (Melbourne Business School) is a practitioner-focused analytics degree targeting professionals who want to develop data-driven decision-making skills. It occupies a middle position between the technical depth of the Master of Business Analytics and the managerial breadth of the MBA.

The program covers business statistics, data analysis tools, predictive analytics, and evidence-based business decision-making. It is typically structured as a shorter, applied program compared to the 150pt MC-BUSANA, with a stronger emphasis on immediate workplace application.

Typical graduate roles include analytics manager, business intelligence lead, marketing analyst, operations analyst, and data-informed product manager.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Analytics manager, BI lead — dashboard management, analytical project ownership, stakeholder reporting | **MEDIUM** — Routine analytical work is AI-compressed; strategic framing and business translation provide some protection |
| Year 3–5 | Senior analytics lead, data strategy manager | **MEDIUM–LOW** — Decision authority and stakeholder management provide more protection |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 20/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
UNCERTAIN. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
UNCERTAIN. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed applied business analytics graduate is the **Business Analyst of 2022**: primarily producing dashboards, running standard analyses, and writing insights reports — work being compressed by AI business intelligence tools.

Specific threats:
- **Power BI Copilot / Tableau AI** — automated dashboard generation and narrative insight extraction
- **ChatGPT for business analysis** — automated market research synthesis and competitive analysis
- **AI insights platforms (ThoughtSpot, Pyramid Analytics)** — natural language query and automated business insights

### 6. VERDICT
**The Master of Applied Business Analytics is MODERATE RISK — a practical analytics credential whose differentiation depends heavily on individual depth of specialisation.**

The program sits between the MBA (generalist management) and the MC-BUSANA (deep quantitative analytics). It serves a real market need but occupies a positioning that is vulnerable to credential compression: not deeply enough quantitative to compete with MC-BUSANA graduates, not broadly enough managerial to compete with MBA graduates.

Graduates who develop genuine domain expertise in a specific industry (health analytics, financial risk, supply chain) and build AI governance capability alongside the analytics tools are well-positioned. Generic applied analytics graduates face increasing competition from AI tools.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop deep domain expertise in a specific industry — generic analytics credentials are increasingly commodity | D6 | High |
| 2 | Build genuine Python/SQL competency beyond tool-based analytics | D3 | Medium |
| 3 | Develop AI governance and responsible analytics capability | D5 | Medium |
| 4 | Target roles with stakeholder accountability and decision authority | D4 | Low |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready applied business analytics graduate is a **domain-specialist analytics professional** who combines technical data skills with deep knowledge of one industry's specific measurement problems.

They know what the data in their domain doesn't measure — the gap between what the analytics says and what is actually happening in the organisation. They have had to explain to an executive why the metrics looked good but the business outcome was deteriorating. That translation between data and organisational reality is where analytics professionals create genuine value.

They use AI analytics tools fluently but critically. They know when the AI-generated insight is right and when it's wrong, and they have the domain knowledge to distinguish between them. That critical layer — not just analytical competence but analytical judgment in a specific context — is their professional asset.

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
    markdown: `# DFVA REPORT: Master of Architecture

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 3 years (300 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-arch
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Architecture at the University of Melbourne is a professional architecture degree accredited by the Architects Registration Board of Victoria (ARBV), the Royal Australian Institute of Architects (RAIA), and the Commonwealth Association of Architects (CAA). It is the standard pathway to registration as an architect in Australia.

The 300-credit-point program is structured around a core studio sequence culminating in the Design Thesis — an independent, sustained design-research project. Students engage with building technology, environmental systems, urban context, construction methods, and architectural theory. The program prepares graduates for the two-year Architectural Practice module required before sitting the ARBV registration examination.

Typical graduate roles include architectural graduate (Graduate of Architecture), documentation specialist, project architect, urban designer, and design researcher. Most graduates enter established architectural practices in residential, commercial, institutional, or public-realm project streams.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Documentation support, construction detail drawing, model production, design development under supervision | **MEDIUM** — CAD/BIM and generative design tools accelerate production tasks; graduate value increasingly tied to judgment and communication rather than drafting throughput |
| Year 3–5 | Project architect, design team lead, client-facing design presentation, regulatory approval management | **LOW–MEDIUM** — Client relationships, regulatory interpretation, design defense, and site judgment are not fully automatable |
| Year 6+ | Senior architect, associate, registered architect, design director | **LOW** — Professional registration, design ownership, and accountability create strong automation barriers |

**Structural note:** Architecture is a regulated profession with mandatory professional practice hours before registration. This regulatory layer creates a time-based barrier that AI cannot circumvent. The design synthesis layer — integrating site, programme, structure, services, regulation, and aesthetics into a coherent building — remains genuinely non-routine work.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 3/3 | Architectural design requires creative synthesis, aesthetic judgment, regulatory compliance, and iterative client negotiation — irreducible human work. ARBV registration requires documented professional practice before sitting the registration exam. |
| 2 | Systems Thinking and Problem Framing | 3/3 | Design Thesis capstone + studio sequence integrates environmental, technological, regulatory, and project-delivery systems across scales. Studios require trade-off reasoning across structure, material, programme, and site. |
| 3 | Technical and Quantitative Depth | 3/3 | 300pt program. Technical documentation, building systems, construction methods, materials, and design production taught throughout. Professional accreditation requirements enforce technical rigour. |
| 4 | Decision-Making Under Uncertainty | 3/3 | Studios require evaluating competing priorities, making design trade-offs, and defending decisions under professional constraints. Design Thesis demands sustained independent judgment across a full project cycle. |
| 5 | AI Literacy and Governance | 1/3 | No AI content explicitly visible in curriculum. Parametric design tools (Rhino, Grasshopper) likely used in practice but not framed through AI governance or deployment. |
| 6 | Domain Depth and Specialisation | 3/3 | 300pt professional degree with ARBV/RAIA/CAA accreditation. Clear pathway to registered architect. 250pt core studio + Design Thesis provides deep specialist grounding. |
| 7 | Research Methods Rigour | 3/3 | Design Thesis is a substantial design-research project with defended methodology. PhD pathway available. Research-led teaching explicitly mentioned in program outcomes. |
| 8 | Human & Relational Capability | 2/3 | Collaborative studio practice and client/stakeholder engagement implicit in design practice. Strong relational dimension but not clinical-level accountability. |
| 9 | Curriculum Currency and Adaptability | 2/3 | Updated 9 June 2026 — very recent. No explicit AI or sustainability-specific core content visible despite currency of update. |
| 10 | Outcome Evidence | 2/3 | Professional accreditation (ARBV/RAIA/CAA) provides external validation of standards. Granular graduate destination data not publicly available. |
| B | Irreplaceability (bonus) | 3/3 | Professional registration requirement + creative design synthesis + technical documentation + regulatory compliance. Triple barrier: creativity, regulation, and professional practice hours. |
| **TOTAL** | | **28/36** | |

**Risk Band: RESILIENT**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. Core professional work in Master of Architecture requires physical presence, regulated judgment, or specialist domain knowledge that AI cannot yet replicate reliably.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. The program's capstone, professional practice, and specialist curriculum provide genuine decision ownership and system design capability.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Structural demand for the specific skill set, professional accreditation protection, or AI-native curriculum positioning make 5-year employability stronger than today.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed architecture graduate is the **Documentation-Heavy Graduate of 2022**: a competent technical drafter who entered a mid-size commercial practice as the primary producer of construction documentation sets, coordination drawings, and specification packages — roles now being compressed by BIM automation, generative detailing, and AI-assisted documentation systems.

Specific threats:
- **Autodesk Forma / ArchiCAD AI** — generative floor plans and mass massing from brief constraints
- **Speckle / Hypar / BIM AI** — automated structural and services coordination clash detection, previously junior architect territory
- **AI specification writers (Masterspec AI, NBS tools)** — automating construction specification drafting
- **Generative renderers (Midjourney architecture, Vizcom)** — eliminating junior visualisation production work

---

## 6. VERDICT

**The Master of Architecture is RESILIENT — a degree with genuine structural defences that most programs lack.**

The program's score (28/36) reflects three real automation barriers that stack: professional registration requirements, the creative-synthetic nature of design work, and the regulatory/liability accountability embedded in architectural practice. These are not soft differentiators — they are formal, government-enforced gatekeeping mechanisms that require documented human judgment and professional responsibility.

The design studio model develops authentic decision-making capability: students are required to defend design choices under expert critique, integrate competing constraints across a full project, and take accountability for design outcomes. This is exactly the kind of training that produces automation-resistant judgment.

**The one structural gap is AI Literacy (D5: 1/3).** Architecture is being transformed by parametric design tools, generative AI, and AI-assisted project management. A 2026 graduate who cannot situate AI tools within a professional governance framework — who cannot evaluate when generative outputs are appropriate, when they need validation, and what the liability implications are — is entering a rapidly changing profession without the critical lens needed to lead rather than be led by technology.

Despite this gap, the degree's regulatory anchor and design-synthesis core make it one of the more durable professional programs in the portfolio.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Integrate parametric design tools and generative AI assessment — make AI governance a studio-embedded competency, not an elective | D5, D9 | Medium |
| 2 | Develop explicit "AI in professional practice" content: liability when AI generates design errors, governance of generative outputs in client-facing work | D5 | Medium |
| 3 | Strengthen environmental systems integration — passive design, embodied carbon tools, and climate performance modelling are growing areas of architectural accountability | D3, D9 | Medium |
| 4 | Publish granular graduate destination data including time to registration, firm type, and salary by career stage | D10 | Medium |
| 5 | Build explicit AI literacy into Design Thesis requirements — students should demonstrate AI tool evaluation as part of their design research methodology | D5, D7 | Low |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready architecture graduate is not a documentation specialist — they are a **design decision owner with professional accountability**.

They completed the Design Thesis not as a portfolio piece but as a genuine test of independent judgment: they know what it feels like to defend a design decision under expert critique, to explain why one structural approach was chosen over another, and to take accountability for how form, material, and programme interact. That judgment is what makes their work non-replicable by a generative tool.

They understand AI not as a competitor but as a set of tools with specific capabilities and specific failure modes. They can generate a massing study in Forma, evaluate whether the output is architecturally appropriate, and explain why the AI's optimisation missed the social or contextual logic of the site. They use generative tools to accelerate exploration — not to outsource design judgment.

They are registered (or on a clear path to registration), which means they carry professional liability. They have client relationships. They can read a contract, interpret a planning instrument, and explain to a building surveyor why a departure from the code is justified. These capabilities are not in an AI's repertoire — they are in theirs.

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
    markdown: `# DFVA REPORT: Master of Business Administration

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 2 years (225 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-ba
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Business Administration at the University of Melbourne is a premium general management degree targeting mid-career professionals and career-switchers seeking executive-track positioning. The 225-credit-point program combines core business disciplines — strategy, finance, marketing, operations, and leadership — with a distinctive AI-era curriculum refresh.

Named units include *Generative AI for Business*, *Leading Data and AI Transformation*, *Analytics for Strategic Management*, *Negotiations*, *Game Theory in Business*, and the *MBA Capstone*. An *MBA Internship* (corporate or social enterprise) is available as an elective. The program admits students with diverse professional backgrounds including non-business disciplines.

Typical graduate roles include management consultant, strategy manager, product leader, general manager, business unit director, entrepreneur, and C-suite pipeline executive. The network and brand effects of the Melbourne MBA are significant differentiators in the ANZ market.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Strategy analyst, management consultant analyst, project manager — analysis, deck production, stakeholder coordination | **HIGH** — GenAI tools absorb routine analysis and reporting; entry value is increasingly judgment and client management |
| Year 3–5 | Senior consultant, strategy manager, business development manager — client ownership, team leadership, decision authority | **MEDIUM** — Judgment, relationship management, and accountability differentiate. AI handles synthesis; humans handle direction. |
| Year 5+ | Director, VP, GM, Partner — portfolio decisions, organizational design, strategic positioning | **LOW** — Decision ownership, accountability, and organizational influence are the core value. Not automatable. |

**MBA structural note:** The MBA is unusual because its primary value is not content knowledge — it is credentialing, network access, and the leadership development that comes from intensive peer interaction. AI cannot replicate a peer cohort of high-calibre professionals or the trust signals of a premium brand. The degree's core risk is that early-career MBA analyst roles are exactly what AI tools are replacing.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 1/3 | General management roles involve significant routine analysis, reporting, and coordination — automatable tasks. MBA graduates compete with AI-augmented analysts in the early career pipeline. |
| 2 | Systems Thinking and Problem Framing | 2/3 | General Management 1+2 cover business systems. MBA Capstone integrates strategy. Systems thinking present but not the primary pedagogical model — breadth over depth. |
| 3 | Technical and Quantitative Depth | 2/3 | Financial Analysis, Business Analytics, Predictive Analytics available as electives. Core is management-generalist, not deeply quantitative. |
| 4 | Decision-Making Under Uncertainty | 3/3 | Negotiations, Game Theory, Managerial Judgement, Capstone — decision-making under uncertainty is an explicit and assessed competency across multiple core units. |
| 5 | AI Literacy and Governance | 3/3 | Generative AI for Business, Leading Data and AI Transformation, Analytics for Strategic Management — strong AI content. Best-in-cohort AI curriculum coverage. |
| 6 | Domain Depth and Specialisation | 2/3 | General management — broad rather than deep. 225pt with 75pt electives allows specialisation but core is deliberately generalist. |
| 7 | Research Methods Rigour | 1/3 | Individual Research Project available as elective (25pt). No thesis requirement. Research methods not a core MBA competency. |
| 8 | Human & Relational Capability | 2/3 | Leadership and Change, Managing People, Negotiations, Managing Diversity — substantial relational skill development. MBA Internship provides real workplace exposure. |
| 9 | Curriculum Currency and Adaptability | 3/3 | Updated Dec 2025. GenAI for Business, Data/AI Transformation, Blockchain, Analytics — leading-edge business curriculum demonstrably refreshed for AI era. |
| 10 | Outcome Evidence | 3/3 | Melbourne MBA has strong industry reputation and employment outcomes tracked through Business School. High employment rates and salary premiums documented. |
| B | Irreplaceability (bonus) | 3/3 | MBA's distinctive value is the cohort network, leadership crucible, and brand signal. GenAI + AI leadership content makes graduates AI-native managers with dual-skill premium. |
| **TOTAL** | | **25/36** | |

**Risk Band: MODERATE RISK**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
YES. The early-career output for Master of Business Administration graduates is substantially templated — research, analysis, and document production are in AI's wheelhouse.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. The program's capstone, professional practice, and specialist curriculum provide genuine decision ownership and system design capability.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Structural demand for the specific skill set, professional accreditation protection, or AI-native curriculum positioning make 5-year employability stronger than today.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed MBA graduate is the **Management Consultant Analyst of 2020**: entering a Big 4 or MBB practice as a slide producer, data analyser, and market researcher — roles whose cognitive layer is being rapidly absorbed by AI tools. The 12–18 month analyst-to-associate pipeline that the MBA was designed to bypass is now further compressed by AI automation of the analyst tier itself.

Specific threats:
- **McKinsey Lilli / Bain GenAI tools / Accenture AI** — in-house AI replacing junior consulting deck production and benchmarking research
- **ChatGPT / Claude for business analysis** — absorbing market research, competitive analysis, and summary synthesis that junior MBAs performed
- **Excel Copilot / Power BI Copilot** — replacing routine financial modelling and reporting dashboard work
- **AI project managers (Asana AI, Linear AI)** — reducing coordination overhead that junior managers previously handled

---

## 6. VERDICT

**The Master of Business Administration is MODERATE RISK — a degree with real strengths that depend heavily on how graduates use it.**

The program's score (25/36) reflects genuine strengths in AI literacy (D5: 3/3), curriculum currency (D9: 3/3), and decision-making (D4: 3/3). The Melbourne MBA is notably better positioned than most management programs because it has explicitly embedded AI-native content — *Generative AI for Business* and *Leading Data and AI Transformation* are not window dressing but substantive curriculum commitments.

The risk lies in the early-career pipeline. MBA graduates who enter consulting or corporate analysis roles face the same AI compression as anyone else doing structured analytical work. The MBA's traditional value proposition — fast-tracking to seniority through a credential signal — is under pressure when AI compresses the junior analyst tier that used to validate those credentials through visible output.

**The degree pays off for graduates who treat it as a leadership platform, not an analysis credential.** Those who combine the AI literacy content with genuine domain depth (via electives), build the cohort network aggressively, and position themselves as AI-governance leaders rather than AI tool users will be well-differentiated. Those who use the MBA as a shortcut to analyst roles without developing independent judgment face meaningful risk.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Choose electives with specialist depth, not breadth — select a domain cluster (health, fintech, sustainability) and build through electives rather than sampling | D6 | Low (decision at enrollment) |
| 2 | Maximise AI literacy units — GenAI for Business and Leading Data/AI Transformation are core differentiators; supplement with external AI governance certification | D5 | Low–Medium |
| 3 | Complete the MBA Internship — real client exposure and accountability are the most direct way to build decision-making evidence beyond the classroom | D4, D8 | High |
| 4 | Build cohort relationships deliberately — the network is the primary long-term ROI of the MBA; treat it as a professional investment | B | Medium |
| 5 | Target roles that require AI governance and organizational change, not pure analysis — position as AI transformation lead, not analyst | D1, D5 | Medium |
| 6 | Develop a clear post-MBA positioning narrative before graduating — articulate what specific problem you will solve that an AI cannot | B | Low |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready MBA graduate does not introduce themselves as a general manager. They introduce themselves as someone who knows how to **deploy AI in a specific industry context and govern the risks that come with it**.

They completed *Generative AI for Business* and came away with a critical view of AI tool limitations — not just capability promotion. They can run a board discussion on AI adoption risk, explain why a proposed automation initiative might create regulatory exposure, and design the human oversight layer for an AI-augmented decision process.

They have a domain. Not "business" in the abstract — they know the regulatory environment of healthcare IT, or the risk profile of algorithmic pricing in fintech, or the stakeholder dynamics of AI in public sector procurement. That domain specificity, combined with the MBA's general management framework, is what makes their judgment non-replicable.

They used the cohort network not for socialising but for building. By graduation they have co-founders, referrers, and clients in their network — people who have watched them work under pressure in group projects and capstone sprints and decided they want to work with them again. The network is the degree's real output.

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
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-bamktg  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Business Administration (Marketing) at the University of Melbourne is a specialist MBA stream combining core business administration content with a marketing specialisation. The program targets marketing professionals seeking managerial advancement and career-changers entering marketing leadership.

Core management subjects are combined with marketing electives covering consumer behaviour, digital marketing, brand strategy, marketing analytics, and market research. The program provides AACSB-accredited business education with a marketing depth track.

Typical graduate roles include marketing manager, brand manager, digital marketing lead, product manager, and customer experience director.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Marketing manager, brand coordinator, digital marketing specialist — campaign production, content strategy, analytics | **HIGH** — Content production, A/B testing, and performance analytics are highly AI-automatable |
| Year 3–5 | Senior marketing manager, brand director — strategy and brand ownership | **MEDIUM** — Strategic brand decisions and customer insight require human judgment |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 17/36**  
**Risk band: HIGH RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
YES. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
UNCERTAIN. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
UNCERTAIN. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed marketing MBA graduate is the **Digital Marketing Manager of 2022**: primarily managing paid search campaigns, producing content calendars, running A/B tests, and reporting on digital funnel metrics — work systematically absorbed by AI marketing tools.

Specific threats:
- **Google Ads AI / Meta Advantage+** — fully automated campaign optimisation replacing manual campaign management
- **AI content generators (Jasper, Copy.ai, ChatGPT)** — producing marketing copy, email campaigns, and social content at volume
- **AI analytics (GA4 AI insights, Amplitude AI)** — automated performance interpretation and recommendation generation
- **AI personalisation engines** — dynamic content optimisation replacing manual segmentation and targeting

### 6. VERDICT
**The Master of Business Administration (Marketing) is HIGH RISK — a credential whose primary professional domain is experiencing acute AI disruption.**

Marketing is one of the fields where AI tools have had the fastest and deepest impact. Content generation, campaign optimisation, performance analytics, and market research are all experiencing significant AI compression. The marketing MBA credential signals managerial capability, but the executional domain it is designed for is changing faster than the curriculum reflects.

The path to resilience runs through two things: genuine brand strategy expertise (which requires human cultural understanding and consumer empathy that AI lacks) and AI governance capability (which allows graduates to sit above the automation layer rather than within it).

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop genuine brand strategy expertise — not campaign management but cultural and consumer insight | D6 | High |
| 2 | Build AI marketing tool governance competency — understand what AI marketing tools optimise for and what they miss | D5 | Medium |
| 3 | Develop marketing analytics depth — Python/R-based marketing mix modelling and causal attribution are growth areas | D3 | High |
| 4 | Target brand director and CMO-track roles that require human cultural judgment, not campaign execution roles | D1 | Low |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready marketing MBA graduate is not a campaign manager — they are a **brand strategy and consumer insight specialist** who understands what drives human behaviour, not just what drives click-through rates.

They know why a brand works — the specific combination of cultural positioning, product truth, and emotional territory that creates genuine consumer resonance. They have made a brand decision that was counterintuitive to the data but right for the brand, and they can explain why. That cultural and strategic judgment is what AI marketing tools cannot replicate.

They use AI tools to accelerate production — content generation, campaign testing, performance analysis — and apply their brand judgment to govern the outputs. They are not competing with AI at the production layer. They are directing it at the strategy layer.

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
    markdown: `## DFVA REPORT: MC-BASE
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-base  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Advanced Social Enterprise at the University of Melbourne prepares graduates for leadership in social enterprise, impact investment, and purpose-driven organisations. The program combines social enterprise design, impact measurement, sustainability, and business management.

Graduates typically move into roles at social enterprises, impact investment funds, corporate sustainability functions, not-for-profit management, and government social policy. The program sits at the intersection of business management and social purpose.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Social enterprise analyst, impact coordinator — research, reporting, grant writing, stakeholder management | **HIGH** — Research, reporting, and coordination work is highly AI-automatable |
| Year 3–5 | Social enterprise manager, impact investment analyst | **MEDIUM** — Strategic social enterprise design requires human judgment |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 18/36**  
**Risk band: HIGH RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
YES. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
UNCERTAIN. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
UNCERTAIN. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed social enterprise graduate is the **Impact Analyst of 2021**: primarily producing impact reports, mapping stakeholder ecosystems, and conducting research for grant applications — work absorpable by AI research and writing tools.

Specific threats:
- **AI grant writing tools** — automated grant application generation from organisational data
- **AI impact measurement platforms** — automated social return on investment (SROI) calculation and reporting
- **AI stakeholder mapping tools** — automated ecosystem mapping and network analysis

### 6. VERDICT
**The Master of Advanced Social Enterprise is HIGH RISK — a degree in a sector where the most accessible early-career roles are heavily AI-exposed.**

Social enterprise is a high-purpose field with genuine social value, but the early-career roles available to graduates (research, coordination, reporting) are precisely the tasks being automated. The degree needs stronger quantitative and governance capability to push graduates toward the design and measurement leadership roles that resist automation.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop quantitative impact measurement capability — causal evaluation, RCT design, and econometric impact analysis are specialist skills with growing demand | D3, D7 | High |
| 2 | Build financial modelling and social finance capability — impact investing requires genuine financial literacy | D3 | Medium |
| 3 | Develop technology and AI governance for social enterprise | D5 | Medium |
| 4 | Build direct stakeholder relationships in the impact investment sector | D8 | High |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready social enterprise graduate is not a report writer — they are a **social impact designer** who can measure what actually changes when an intervention is implemented.

They understand causal evaluation: the difference between correlation and impact, what a valid comparison group looks like, and how to design a monitoring system that actually tells you whether the programme is working. They can explain this to a board that wants to see metrics and to a funder that wants evidence of impact.

They are fluent in social finance instruments — blended finance, social impact bonds, patient capital structures — and they understand the regulatory landscape for impact investment. They can evaluate whether an investment thesis is credible based on the underlying theory of change.

They are not a generalist social sector worker. They are a specialist in measuring, designing, and scaling social impact — the most technically demanding and most future-proof role in the sector.

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

### 1. PROGRAM PROFILE
The Master of Biomedical Science at the University of Melbourne is a research-intensive degree combining laboratory science training with a 125-credit-point research project — the largest research component in the assessed cohort. Students choose a specialisation from five departmental areas: School of Biomedical Sciences, Melbourne Medical School, Melbourne Dental School, Department of Psychological Sciences, or Department of Optometry and Vision Sciences.

The 200-credit-point program includes *Introduction to Biomedical Research* (compulsory), *Research to Impact* (health translation), and 125 points of supervised laboratory research conducted over four consecutive semesters. Students develop experimental design skills, laboratory techniques specific to their specialisation, and scientific communication competency.

Typical graduate roles include research scientist, clinical trial coordinator, research officer in pharmaceutical/biotechnology companies, PhD candidate, and postdoctoral researcher. The program serves as the primary entry point to biomedical PhD programs in Australia and internationally.


###  3. DFVA SCORECARD
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

###  4. THREE THRESHOLD QUESTIONS
- **Q1 (AI produce 80%?):** NO — the 125pt laboratory research project is irreducible human work.
- **Q2 (Design systems/own decisions?):** YES — research project from design through interpretation.
- **Q3 (More employable in 5 years?):** YES — biomedical research is AI-augmented, not AI-displaced. Research training is structurally protective.

### Verdict
The program's 125-point research project is its defining strength — proportionally the largest in this assessment cohort. Graduates exit with research-cultivated judgment that resists substitution. The AI literacy gap (D5) is the main opportunity.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Add a unit on AI in biomedical research — machine learning for image analysis, AI drug discovery, computational biology — as a core or elective offering | D5, D9 | Medium |
| 2 | Develop scientific communication capability explicitly — presenting research to non-specialist audiences is a growing career requirement | D8 | Low |
| 3 | Build bioinformatics competency alongside lab expertise — the intersection of wet-lab and computational skills is the growth area | D3, D5 | Medium |
| 4 | Publish graduate destination data including PhD continuation rates, time to employment, and industry sector breakdown | D10 | Medium |
| 5 | Develop industry partnership opportunities beyond the current structure — industry-supervised research projects provide real-world validation of laboratory skills | D4, D8 | High |

---


## 5. ANALOGUE GRADUATE PROFILE

The most exposed biomedical science graduate is the **Research Assistant of 2020**: primarily conducting routine laboratory assays, processing samples according to established protocols, and entering experimental data — work being automated by laboratory robotics and AI analysis platforms.

Specific threats:
- **High-throughput liquid handling robots (Hamilton, Tecan)** — automated assay execution replacing manual pipetting
- **AI image analysis platforms** — automated histology, microscopy, and cell counting replacing manual analysis
- **AI data analysis for standard biomedical datasets** — automated statistical analysis of ELISA, Western blot, and flow cytometry data
- **Lab information management AI** — automated protocol optimisation and experiment tracking

However, the MC-BMEDSC graduate profile is substantially more protected: the 125pt research project, requiring original experimental design and defended methodology, positions graduates in the research judgment layer rather than the execution layer.

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready biomedical science graduate is not a laboratory executor — they are a **research scientist** who generates original knowledge, defends experimental design, and governs AI tools with critical scientific judgment.

They have spent four semesters on a single sustained research project: they know what it means to have a hypothesis fail, to redesign the experiment, and to interpret results that don't cleanly support either hypothesis. That research judgment — comfort with genuine uncertainty and ability to navigate it methodically — is the most valuable and least automatable skill in biomedical science.

They understand how AI is transforming their specialisation: AlphaFold for structural biology, ML for genomic variant classification, AI-assisted drug discovery. They can evaluate whether an AI-generated prediction requires experimental validation and design the experiment that provides the definitive test. That critical evaluation layer is what makes their judgment indispensable.

They are positioned at the interface of laboratory expertise and computational analysis — they know when to trust the model and when to trust the bench result. In the AI era of biomedical science, that dual literacy is the rarest and most valuable combination.


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
    markdown: `# DFVA REPORT: Master of Business Analytics

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 1 year (150 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-busana
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Business Analytics at the University of Melbourne (Melbourne Business School) is a specialist quantitative degree targeting candidates who want to build and deploy data-driven decision systems in business contexts. It is among the most technically rigorous business analytics programs in Australia.

The 150-credit-point core includes *Machine Learning & AI for Business*, *Statistical Learning*, *Natural Language Processing*, *Causal Analytics*, *Predictive Analytics*, *Decision Making and Optimisation*, *Data Platforms and Ecosystems*, and *Programming Foundations*. An *Individual Research Project* (25pt) is available with coordinator approval for those seeking a research pathway.

Typical graduate roles include data scientist, machine learning engineer, analytics consultant, business intelligence lead, quantitative analyst, and AI product manager. The program produces graduates who build AI systems rather than being replaced by them — a structural differentiator.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Data scientist, ML engineer, analytics consultant — model building, pipeline development, analysis design | **LOW–MEDIUM** — Graduates build AI tools; they design the systems that automate others. AutoML compresses some junior modelling, but problem framing and validation remain human. |
| Year 3–5 | Senior data scientist, analytics lead, ML engineering manager — system design, governance, team leadership | **LOW** — Senior analytical judgment, model evaluation, and governance accountability are not automatable. |
| Year 5+ | Chief Analytics Officer, AI product director, data platform architect — organisational analytics strategy | **LOW** — Strategic decision-making and AI governance at scale are the core value. |

**Structural advantage:** Business Analytics graduates are building the tools that replace others — not being replaced. The degree trains people to sit above the automation layer, which makes them structurally more durable than most graduate cohorts. The primary risk is AutoML and foundation models reducing the barrier to entry for junior ML work, compressing the first-two-year tier somewhat.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2/3 | Data scientists/analysts build AI tools rather than being replaced by them. Some routine analysis is automatable but strategic problem framing and business translation resist automation strongly. |
| 2 | Systems Thinking and Problem Framing | 3/3 | Translating business problems into quantitative form, integrating across statistics/ML/optimisation domains. Causal + predictive + NLP — full quantitative systems toolkit. |
| 3 | Technical and Quantitative Depth | 3/3 | Machine Learning & AI, Statistical Learning, NLP, Causal Analytics, Predictive Analytics — deeply quantitative. Programming Foundations included as core. |
| 4 | Decision-Making Under Uncertainty | 3/3 | Decision Making and Optimisation is a core subject. Learning outcomes explicitly require dealing with ambiguity, uncertainty, and bias in real business contexts. |
| 5 | AI Literacy and Governance | 3/3 | Machine Learning & AI for Business, NLP — AI is core curriculum, not elective. Graduates can deploy and critically evaluate AI workflows. |
| 6 | Domain Depth and Specialisation | 3/3 | 150pt specialist degree. Core across data platforms, programming, statistics, ML, NLP, causal/predictive analytics. Clear specialist identity distinct from generic management. |
| 7 | Research Methods Rigour | 2/3 | Individual Research Project (25pt) available with coordinator approval. Research pathway optional but genuine quantitative research skills embedded throughout core. |
| 8 | Human & Relational Capability | 2/3 | Professional development includes teamwork and professional standards. Communication to non-technical audiences emphasised. Not clinical-level relational. |
| 9 | Curriculum Currency and Adaptability | 3/3 | Updated April 2026. ML/AI, NLP, Causal Analytics — state-of-the-art quantitative curriculum clearly designed for AI-era business needs. |
| 10 | Outcome Evidence | 3/3 | Business analytics employment outcomes strong. Melbourne Business School reputation and tracked employment. Strong demand signal for the specific skill set. |
| B | Irreplaceability (bonus) | 3/3 | Graduates build and deploy AI systems — this program trains the replacers. AI literacy + quantitative depth + business translation is a rare triple combination. |
| **TOTAL** | | **30/36** | |

**Risk Band: RESILIENT**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. Core professional work in Master of Business Analytics requires physical presence, regulated judgment, or specialist domain knowledge that AI cannot yet replicate reliably.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. The program's capstone, professional practice, and specialist curriculum provide genuine decision ownership and system design capability.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Structural demand for the specific skill set, professional accreditation protection, or AI-native curriculum positioning make 5-year employability stronger than today.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed Business Analytics graduate is the **Junior BI Analyst of 2021**: a capable SQL writer who produced dashboards, ran standard regression analyses, and maintained reporting infrastructure — work now absorbed by Power BI Copilot, Tableau AI, and agentic analytics tools. This profile does not represent the MC-BUSANA graduate, but it represents what the program was historically competing against.

The MC-BUSANA graduate is better positioned because their core skill is not dashboard production — it is causal inference, model design, and problem framing. These require:
- **Knowing when the ML model is wrong** and why — a capability that requires understanding of training data, distribution shift, and failure modes
- **Translating messy business problems into tractable quantitative form** — the hardest part of analytics, and where human judgment is most critical
- **Governing AI outputs in high-stakes contexts** — who is accountable when the model recommends wrongly

---

## 6. VERDICT

**The Master of Business Analytics is RESILIENT — one of the strongest programs in the portfolio for 2027 and beyond.**

The program's score (31/36) reflects a genuinely distinctive curriculum: graduates build and deploy AI systems rather than being replaced by them. The combination of machine learning depth, causal analytics, and business translation creates a graduate profile with genuine automation resistance at its core.

The remaining risk is that AutoML tools and foundation model APIs are lowering the technical barrier for basic ML work. A junior data scientist who only knows how to run sklearn pipelines and interpret standard outputs faces compression. But MC-BUSANA graduates who have engaged with causal inference, model governance, and NLP depth are positioned above this compression layer.

**The degree is RESILIENT under one condition: graduates must position themselves as decision-layer professionals, not code-production workers.** The capability to frame a causal question, design a valid test, and defend the inference against alternative explanations is what the AI era actually demands. That capability is in this program. Whether individual graduates develop and demonstrate it is the variable.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Pursue the Individual Research Project if available — the ability to design and defend original quantitative analysis is the highest differentiator in the job market | D7 | High |
| 2 | Build specialisation in a regulated domain — healthcare analytics, financial risk modelling, or public policy evaluation create governance requirements that sustain human judgment | D6 | Medium |
| 3 | Develop explainability and governance competency beyond technical modelling — audit trails, fairness metrics, and regulatory compliance for AI are growth areas | D5 | Medium |
| 4 | Build the communication layer explicitly — the ability to explain model outputs to non-technical decision-makers is the most common gap in quantitative graduates | D8 | Low |
| 5 | Target AI product management and ML engineering lead roles, not just data science contributor roles — governance and direction create more durable positioning | D1 | Low–Medium |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready Business Analytics graduate does not run standard models on clean datasets. They **define the question, design the measurement, and own the interpretation** — the parts of the analytics pipeline that AI cannot do without a human who understands the domain.

They have done causal inference properly: they know the difference between correlation and causation at a mechanism level, they have built a valid instrumental variable or designed a natural experiment, and they have defended that methodology under expert scrutiny. That specific capability — identifying and exploiting variation — is the skill that separates a genuine quantitative analyst from a dashboard operator.

They can read a model fairness audit and know what questions to ask. They understand what "the model is biased" means technically and what its implications are for deployment in a specific context. They can brief a legal team on why an algorithmic decision requires human review.

They have communicated their work to a CFO, a product manager, and a regulatory team — and adjusted their framing for each audience without losing technical precision. That translation capacity is what makes them genuinely valuable at the decision-making layer.

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

### 1. PROGRAM PROFILE
The Master of Climate Science at the University of Melbourne is a specialist degree at the intersection of physical climate science, atmospheric dynamics, and climate policy. Students choose between two streams: Climate Dynamics (focusing on physical mechanisms) or Climate Change (focusing on impacts and policy translation).

The program covers Climate Modelling, Dynamical Meteorology, Atmospheric Processes, Weather and Climate Extremes, Statistics in Climate Dynamics, Climate Change Mitigation, Climate Change Politics and Policy, and Climate Science for Decision-Making. An industry or research project (25pt) provides applied experience.

Typical graduate roles include climate scientist, climate risk analyst, climate policy advisor, sustainability consultant, atmospheric researcher, and climate data scientist. Climate careers are growing structurally due to mandatory climate disclosure, adaptation planning, carbon market development, and international climate regulation.


###  3. DFVA SCORECARD
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

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** NO — climate science requires integrated physical understanding AI cannot replicate.
- **Q2:** YES — Climate Science for Decision-Making + capstone + systems orientation.
- **Q3:** YES — climate careers are structurally growing. Mandatory climate disclosure, adaptation planning, carbon markets create durable demand.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed climate science graduate is the **Climate Data Analyst of 2021**: primarily processing climate datasets, running standard analysis scripts on model output, and producing summary reports — work increasingly systematised by AI-augmented climate analytics platforms.

Specific threats:
- **AI climate downscaling tools** — automated regional climate projection from global model output
- **AI climate attribution systems** — automated event attribution analysis replacing manual statistical analysis
- **Automated climate model evaluation tools** — systematic bias correction and model evaluation pipelines
- **AI climate communication tools** — automated translation of climate science into policy-relevant summary

---

### Verdict
Climate science is one of the most structurally durable disciplines assessed. The field is growing, the physical science is irreducible, and the policy interface creates demand for translation skills that resist automation. The AI/ML gap is real (climate science increasingly uses ML) but non-critical — the program's core value is physical understanding, not tool operation.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready climate science graduate is not a data processor — they are a **climate system specialist** who understands the physical mechanisms of climate change and can translate that understanding into defensible risk assessments and policy recommendations.

They have worked with real climate data: they know what climate model bias looks like in specific regional contexts, why ENSO affects Australian precipitation in the way it does, and what the physical mechanisms are behind projected rainfall changes in southeast Australia. That mechanism-level understanding — not just statistical pattern recognition — is what makes their climate analysis trustworthy.

They understand the AI-augmented future of climate science: large climate emulators, AI-based weather prediction, and AI-assisted climate policy analysis. They can evaluate whether an AI climate tool is capturing real physics or statistical patterns that may not generalise. That critical evaluation capability is what positions them as climate scientists rather than climate data operators.

---

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
    markdown: `## DFVA REPORT: MC-CLIND
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-clind  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Clinical Dentistry at the University of Melbourne is a specialist clinical training program for qualified dentists seeking advanced specialist or academic credentials. The program covers clinical dentistry, oral health management, patient care, and research methodology.

Graduate roles include specialist dentist, clinical academic, oral health researcher, and dental public health specialist. The program requires existing dental registration and provides specialist-level clinical training.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–3 (graduate) | Clinical specialist practice — diagnosis, treatment planning, complex procedures | **LOW** — Physical clinical procedures, diagnosis, and patient management require human clinical judgment |
| Year 4+ | Senior specialist, clinical academic — teaching, research, complex case management | **LOW** — Professional registration and clinical accountability |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 23/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed clinical dentistry graduate is the **General Practice Dentist of 2020**: primarily providing routine restorative, preventive, and diagnostic services — some of which are being augmented by AI diagnostic tools.

Specific threats:
- **AI dental diagnostics (Denti.AI, Pearl AI)** — automated caries, periodontal, and pathology detection from radiographs
- **AI treatment planning tools** — automated treatment sequencing from diagnostic data
- **Robotic dental systems** — emerging automation in certain predictable procedural steps

However, the MC-CLIND specialist profile is substantially more protected: complex specialist procedures, diagnosis in ambiguous cases, and specialist clinical judgment are not within current AI capability.

### 6. VERDICT
**The Master of Clinical Dentistry is MODERATE RISK — a specialist clinical program with strong regulatory protection and physical skill requirements that resist AI substitution.**

Specialist dental practice involves complex clinical procedures, physical skill, and diagnostic judgment that AI tools augment rather than replace. APHRA registration and specialist accreditation create genuine barriers. The risk is in maintaining clinical currency as AI diagnostic tools transform how routine pathology is identified.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI dental diagnostic tool literacy — understand their evidence base, error patterns, and clinical governance requirements | D5 | Medium |
| 2 | Specialise in complex/multidisciplinary treatment planning — this requires the highest level of integrated clinical judgment | D6 | High |
| 3 | Build research methodology skills for clinical evidence evaluation | D7 | Medium |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready clinical dentistry graduate is a **specialist clinical expert** who knows what AI dental diagnostics can and cannot see, and whose clinical judgment accounts for what the AI misses.

They have managed complex cases where AI flagged something that was normal variation, and cases where human pattern recognition missed something the AI caught. They know the failure modes in both directions. Their clinical decisions integrate AI-generated information without being driven by it.

They are registered specialists with physical procedural skills that AI cannot replicate: the manual dexterity, tactile feedback interpretation, and patient management capability that clinical dentistry requires at the specialist level.

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


### 5. ANALOGUE GRADUATE PROFILE

The most exposed data science graduate is the **Junior Data Analyst of 2022**: using pandas and sklearn to clean datasets, train standard classification models, produce visualisations, and write summary reports — work being systematically absorbed by AI coding assistants, AutoML platforms, and business intelligence co-pilots.

Specific threats:
- **GitHub Copilot / Cursor** — generating data cleaning and analysis code from natural language descriptions, replacing junior data engineering work
- **Julius / ChatGPT Advanced Data Analysis** — running statistical analysis and producing visualisations from uploaded datasets
- **Power BI Copilot / Tableau AI** — automated dashboard generation and narrative insight extraction
- **AutoML platforms (Google AutoML, DataRobot, H2O.ai)** — automated model selection, hyperparameter tuning, and model evaluation

---

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


### 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready data science graduate is not someone who fits models — they are someone who **defines what question the model is answering and what we learn when it is wrong**.

They have done causal inference properly: not correlation analysis dressed up as causal language, but a genuinely identified effect with a valid natural experiment or instrumental variable. They can defend their identification strategy to a statistician and explain its practical implications to a product manager. That combination is the rarest and most valuable capability in data science.

They have an AI governance layer: they know what training data their models were trained on, what distributional shift looks like in their specific domain, and what the monitoring pipeline should track. When a model starts producing anomalous outputs, they are the person who knows whether that is signal or noise and what to do about it.

They have communicated statistical conclusions to people who are not statisticians — under pressure, with genuine stakes. A product decision was made differently because of their analysis. That accountability — specific, traceable, consequential — is what distinguishes a professional data scientist from a model executor.

---

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
    markdown: `## DFVA REPORT: MC-ED
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-ed  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Education at the University of Melbourne is a research and professional development degree for educators seeking advanced knowledge in pedagogy, education leadership, curriculum design, and educational research. It is not an initial teaching qualification.

The program covers educational policy, learning theory, curriculum studies, educational research methods, and specialisations in areas such as educational leadership, learning technologies, and inclusion. Graduate roles include senior teacher, education researcher, curriculum designer, education policy advisor, and academic.

The program's research orientation and leadership focus differentiate it from initial teacher education programs.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Senior teacher, curriculum developer, education researcher | **MEDIUM** — Curriculum design, research, and educational leadership require human judgment |
| Year 3–5 | Principal, education director, academic researcher | **LOW** — Educational leadership and research require genuine human capability |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 24/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
UNCERTAIN. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed education graduate is the **Curriculum Content Developer of 2021**: primarily producing curriculum materials, lesson resources, and assessment items — work being absorbed by AI content generation tools.

Specific threats:
- **AI lesson planners (Eduaide, MagicSchool AI)** — automated curriculum resource generation
- **AI assessment item generators** — automated test and quiz generation from learning objectives
- **AI grading tools (Turnitin AI, Gradescope AI)** — automated essay feedback and grading

### 6. VERDICT
**The Master of Education is MODERATE RISK — a research and leadership degree whose graduates are positioned above the AI content generation layer.**

Education leadership, curriculum design at a policy level, and educational research are substantially more automation-resistant than classroom content production. The MEd's research orientation and leadership focus provide positioning above the most AI-exposed roles in education.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI in education literacy — evaluate learning technology platforms, understand their evidence base, and develop governance frameworks | D5 | Medium |
| 2 | Build educational research expertise — rigorous evaluation of educational interventions is an underserved and growing field | D7 | High |
| 3 | Develop data-informed decision-making capability for education leadership | D3 | Medium |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready MEd graduate is not a curriculum content producer — they are an **educational systems leader** who understands how learning works, what evidence shows, and how to build institutional capability for continuous improvement.

They have evaluated an educational intervention rigorously: not anecdote but evidence, not enthusiasm but causal inference. They know the difference between a curriculum reform that worked and one that appeared to work because the measurement was wrong. That evaluative expertise is what makes their leadership judgment valuable.

They understand what AI educational tools claim and what the evidence actually supports. They can advise a school or system on appropriate AI tool adoption — which applications have genuine pedagogical evidence, which have vendor evidence only, and what the governance requirements are for student data in AI systems.

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
    markdown: `# DFVA REPORT: Master of Environmental Law

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 1 year (100 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-envlaw
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Environmental Law at the University of Melbourne Law School is a specialist coursework program designed for law graduates seeking deep expertise in environmental, climate, and sustainability law. It is among the most substantively current environmental law programs in Australia.

The 100-credit-point program includes foundational environmental law subjects plus specialist electives in *Climate Law, Economics and Finance*, *Clean Energy Projects Law*, *Biodiversity and Conservation Law*, *Water Law*, *Planning and Development Law*, *More-Than-Human Rights*, and *AI and Justice*. An international legal internship is available. The program attracts candidates from domestic and international backgrounds including lawyers, policy advisors, and environmental scientists seeking legal qualification.

Typical graduate roles include environmental lawyer, climate policy advisor, sustainability counsel, regulatory affairs specialist, international environmental negotiator, and in-house counsel for resources, energy, or government clients.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Legal research, document review, compliance analysis, regulatory submissions, case briefing | **HIGH** — Contract review, regulatory research, and document synthesis are primary targets of legal AI tools (Harvey, Casetext, LexisNexis AI) |
| Year 3–5 | Senior associate, policy counsel, environmental regulatory specialist — advisory opinions, client strategy, negotiation | **MEDIUM** — Strategic advice requires contextual judgment. AI provides research; humans provide interpretation and recommendation. |
| Year 5+ | Partner, General Counsel, Head of Sustainability — regulatory strategy, advocacy, organisational governance | **LOW** — Legal accountability, regulatory relationships, and strategic framing are not automatable. |

**Structural tailwind:** Climate change is creating structural demand for environmental law specialists. New legislation, international agreements, and corporate sustainability obligations are generating genuine new legal work — not just redistributing existing work. This structural demand provides a buffer against AI compression of routine legal tasks.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 1/3 | Legal research, document review, and compliance analysis are highly AI-automatable. Environmental law requires contextual judgment but core legal tasks are AI-vulnerable at junior levels. |
| 2 | Systems Thinking and Problem Framing | 2/3 | Environmental law integrates across climate, water, waste, planning, and international regimes. Systems perspective inherent in the multi-jurisdictional nature of environmental problem framing. |
| 3 | Technical and Quantitative Depth | 1/3 | 100pt program. Legal reasoning depth. No quantitative or scientific technical requirement. Climate Law Economics and Finance touches economics but not deeply. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Environmental disputes require defended legal judgment. International treaty negotiation skills taught. Less pressure-tested than clinical or capstone-intensive programs. |
| 5 | AI Literacy and Governance | 2/3 | AI and Justice elective available. Not core. Environmental law increasingly uses satellite data and modelling but this is not embedded in curriculum. |
| 6 | Domain Depth and Specialisation | 3/3 | Clear environmental law specialisation. 87.5pt minimum in environmental/further subjects. Climate, water, waste, biodiversity, planning — comprehensive regulatory coverage. |
| 7 | Research Methods Rigour | 1/3 | 100pt coursework program. No thesis requirement. Minor thesis explicitly excluded for law graduates by structure. |
| 8 | Human & Relational Capability | 2/3 | International legal internship available. Legal practice requires sustained client communication. Not clinical-level relational. |
| 9 | Curriculum Currency and Adaptability | 3/3 | Updated March 2026. Climate Law Economics & Finance, AI and Justice, Clean Energy Projects Law, More-Than-Human Rights — leading-edge environmental law curriculum. |
| 10 | Outcome Evidence | 3/3 | Legal employment data available through MLS. Environmental law is a structural growth sector due to climate regulation. Strong employment signal for specialists. |
| B | Irreplaceability (bonus) | 2/3 | Environmental regulation requires human legal judgment, interpretation, and advocacy. Climate change creates structural demand growth. But 100pt program depth is limited by its brevity. |
| **TOTAL** | | **22/36** | |

**Risk Band: MODERATE RISK**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
YES. The early-career output for Master of Environmental Law graduates is substantially templated — research, analysis, and document production are in AI's wheelhouse.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
UNCERTAIN. Partial capability exists. Studio, capstone, or professional placement elements push toward decision ownership, but the standard curriculum track does not guarantee it.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Structural demand for the specific skill set, professional accreditation protection, or AI-native curriculum positioning make 5-year employability stronger than today.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed environmental law graduate is the **General Environmental Lawyer of 2020**: a graduate who entered a mid-tier firm doing routine environmental compliance assessments, EIS reviews, and council planning submissions — exactly the tasks being absorbed by legal AI tools trained on regulatory databases.

Specific threats:
- **Harvey AI / Casetext / LexisNexis Protégé** — AI legal research and document review absorbing junior associate research hours
- **Automated compliance checkers (EY LawPod, Brightflag)** — routine regulatory compliance monitoring and flagging
- **AI regulatory summarisers** — automated conversion of new legislation and treaty developments into plain-language client alerts
- **Contract review AI** — environmental licensing and project approval document analysis

---

## 6. VERDICT

**The Master of Environmental Law is MODERATE RISK — a degree with a genuine structural tailwind but a compressed format that limits depth.**

The program's score (24/36) reflects two competing forces: a domain that is growing structurally due to climate regulation (positive) and a program format (100pt coursework, no thesis) that limits the depth and research rigour that would push the score toward RESILIENT (negative).

The structural tailwind is real: climate legislation, biodiversity frameworks, and corporate sustainability obligations are creating new legal work that requires human judgment — interpreting ambiguous regulatory language, navigating multi-jurisdictional frameworks, and advising on the intersection of science and law. This is not legal work that AI can fully absorb.

But at 100 credit points, this degree is short by graduate law standards. Graduates who combine this program with genuine scientific literacy (understanding what the environmental data means, not just what the law says about it) and strong client-facing skills are well-positioned. Those who rely on the credential alone in a standard junior legal role face AI compression.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Build genuine scientific literacy alongside the legal qualification — understanding satellite data, emissions modelling, and biodiversity assessment science makes legal analysis more defensible and differentiating | D3, D6 | High |
| 2 | Pursue the international legal internship if available — cross-jurisdictional experience is a significant differentiator in climate and environmental law | D4, D8 | High |
| 3 | Develop AI governance awareness — legal AI tools will be embedded in environmental law practice; graduates who can evaluate their reliability and limitations will be more valuable | D5 | Medium |
| 4 | Target roles in growth regulation areas: clean energy projects, biodiversity credits, carbon markets, and ESG disclosure litigation — not traditional compliance work | D1, D6 | Low |
| 5 | Complement with the AI and Justice elective if possible — regulatory AI governance is an emerging legal specialty | D5 | Low |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready environmental law graduate is not a document reviewer — they are a **regulatory strategy specialist who understands both the law and the science behind it**.

They know what a net-zero pathway plan actually requires at the technical level — not just what the legislation says it must contain, but what emissions accounting methodology is being used, where the assumptions are contested, and what the regulatory risk is when the science moves faster than the legal standard.

They have navigated a multi-jurisdictional environmental matter — something involving federal, state, and international law simultaneously — and they can explain to a client not just what the law requires but what the regulator is actually watching for in practice.

They are aware that AI tools will handle much of the research layer of their work, and they have positioned themselves at the interpretation and strategy layer: the place where legal judgment, scientific literacy, and client relationships intersect. They do not produce the research — they evaluate it, argue with it, and advise on what it means for the client's specific risk profile.

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

### 1. PROGRAM PROFILE
The Master of Environmental Science at the University of Melbourne is a multidisciplinary environmental science program combining ecological, geoscientific, and policy-oriented coursework with a 25-credit-point Industry or Research Project. Students choose from a broad elective range spanning Environmental Modelling, Spatial Data Analytics, Environmental Risk Assessment, Soil Science, Water Management, Biosecurity, and Global Environmental Change.

The 200-credit-point program targets students with science backgrounds who seek professional roles in environmental consulting, government environmental agencies, conservation management, and environmental research. The Industry Project (default) places students in real-world environmental consulting or management contexts.

Typical graduate roles include environmental consultant, environmental scientist in government agencies (DCCEEW, EPA), conservation manager, environmental planner, climate adaptation specialist, and graduate researcher.


###  3. DFVA SCORECARD
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

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** UNCERTAIN — field work is irreducible, but environmental data analysis is increasingly AI-producible.
- **Q2:** YES — Industry project + Environmental Risk Assessment + systems thinking embedded throughout.
- **Q3:** YES — climate adaptation, environmental consulting, biosecurity are growth fields.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed environmental science graduate is the **Junior Environmental Consultant of 2021**: primarily producing environmental impact assessments from template frameworks, running standard modelling tools, and preparing regulatory submission documents — work being systematised by AI environmental compliance platforms.

Specific threats:
- **AI environmental impact assessment tools** — automated EIA section generation from site data
- **AI environmental modelling platforms** — automated hydrological, air quality, and ecological impact modelling
- **Remote sensing AI (Planet Labs AI, Copernicus services)** — automated land cover change and environmental monitoring
- **AI regulatory compliance tools** — automated matching of project impacts to regulatory requirements

---

### Verdict
The industry project orientation is a strength — graduates exit with stakeholder-facing experience. The systems-thinking integration across the curriculum is genuine. The program would benefit from explicit AI/data-science integration given the field's increasing reliance on remote sensing, environmental modelling, and spatial analysis.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready environmental science graduate is not a compliance checker — they are an **environmental systems scientist** who understands the complex dynamics of ecosystems and can translate that understanding into actionable environmental management.

They have conducted field-based environmental research: they know what ecosystem health actually looks like in the landscape versus what the model predicts, and they understand why those sometimes diverge. That ground-truth connection — between model predictions and field reality — is what makes their environmental assessments defensible.

They use remote sensing and AI environmental monitoring tools as accelerators: they know how to interpret satellite-derived land cover data, when to trust automated change detection, and when field validation is required. That hybrid capability — remote sensing literacy plus field expertise — is the combination that the AI era of environmental management actually requires.

---


### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Add a unit on AI and machine learning in environmental science — remote sensing AI, ecological modelling ML, spatial AI | D5, D9 | Medium |
| 2 | Develop GIS and remote sensing competency as a core capability — spatial data analysis is a standard environmental science requirement | D3 | Medium |
| 3 | Maximise the Industry Project opportunity — real stakeholder context is the most valuable learning experience | D4, D8 | High |
| 4 | Build specialist domain depth — climate adaptation, biosecurity, or water management rather than staying generalist | D6 | Medium |
| 5 | Develop quantitative environmental modelling skills beyond the default elective | D3, D7 | Medium |

---


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

### 1. PROGRAM PROFILE
The Master of Genetic Counselling at the University of Melbourne is an HGSA-accredited professional program preparing graduates for registration as genetic counsellors in Australia. It is one of only a small number of accredited genetic counselling training programs in the country.

The 2-year program integrates coursework in human genetics, genomics, genetic counselling theory and practice, psychological support for genetic conditions, and supervised clinical placements. Clinical placement hours meet HGSA registration requirements. Named units include *Clinical Genetics*, *Genetic Counselling Practice*, *Psychology of Genetic Conditions*, and *Biostatistics for Genetic Counsellors*.

Typical graduate roles include genetic counsellor (clinical genetics units at hospitals), cancer genetics counsellor, prenatal genetic counsellor, and genomics coordinator. There is a documented national workforce shortage in genetic counselling.


###  3. DFVA SCORECARD
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

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** NO — clinical genetic counselling is fundamentally irreducible human work.
- **Q2:** YES — clinical placement requires real-time decision ownership. The ≥70% hurdle enforces demonstrated competence.
- **Q3:** YES — genetic counselling demand grows with genomic medicine expansion. Clinical empathy is structurally non-automatable.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed genetic counselling graduate is the **Variant Classification Technician of 2021**: primarily running standardised variant interpretation workflows, applying established classification criteria, and generating templated variant reports — work being systematised by AI variant interpretation platforms.

Specific threats:
- **AI variant interpretation tools (ClinVar AI, Varsome AI, Fabric Genomics)** — automated variant classification from population databases and functional evidence
- **AI-assisted pedigree analysis** — automated inheritance pattern identification and recurrence risk calculation
- **AI genomic report generators** — automated clinical variant report production from interpretation data
- **Polygenic risk score AI platforms** — automated disease risk calculation replacing manual risk assessment

---

### Verdict
The program's structural defence is its clinical core. Genetic counselling sits at the human edge of genomic medicine — where scientific knowledge meets family communication, ethical judgment, and emotional support. AI can assist with variant interpretation but cannot conduct a genetic counselling session. The ≥70% progression hurdle, HGSA accreditation pathway, and 37.5pt clinical placement create a program whose graduates are among the least AI-exposed in this entire assessment cohort. The AI literacy gap is real for the genomics tools the profession increasingly uses, but it doesn't threaten the core value proposition.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready genetic counselling graduate is not a variant classifier — they are a **genomic counselling specialist** who helps families navigate the uncertainty, implications, and emotional weight of genetic information.

They have counselled a family through a variant of uncertain significance result: they explained what "uncertain" means when someone is hoping for a definitive answer, they helped the family understand how the uncertainty might resolve over time, and they facilitated a decision-making process that respected both scientific uncertainty and the family's values. That clinical communication skill — in the context of genuine uncertainty — is not replicable by an AI system.

They understand AI variant classification tools: they know which classification algorithms are calibrated for which variant types, where they tend to over-classify or under-classify pathogenicity, and what clinical evidence would be needed to reclassify a variant of uncertain significance. That critical evaluation capability, combined with their counselling expertise, is what the AI-augmented genomics era requires.

---


### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI variant interpretation tool literacy — understand AI classification platforms and governance requirements | D5 | Medium |
| 2 | Complete HGSA accreditation pathway — professional registration is the primary long-term differentiator | D6 | High |
| 3 | Specialise in a high-growth area: cancer genetics, prenatal counselling, or rare disease | D6 | Medium |
| 4 | Build genomic literacy at the technical level — understanding what WGS produces and what it misses | D3 | Medium |
| 5 | Develop expertise in VUS communication — explaining uncertainty to families is the hardest and most valuable clinical skill | D4, D8 | High |

---


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
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-indeng  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Industrial Engineering at the University of Melbourne provides specialist training in operations research, supply chain management, manufacturing systems, quality engineering, and industrial optimisation. It is accredited by Engineers Australia.

The program covers production planning, lean manufacturing, quality management, logistics and supply chain, and engineering project management. Graduate roles include industrial engineer, operations manager, supply chain analyst, process improvement specialist, and manufacturing systems engineer.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Industrial engineer, operations analyst — process analysis, optimisation modelling, quality management | **MEDIUM** — Process analysis and standard optimisation are AI-augmentable; system design and implementation require human judgment |
| Year 3–5 | Operations manager, process improvement lead | **LOW–MEDIUM** — System ownership and operational decision-making |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 22/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed industrial engineering graduate is the **Operations Analyst of 2021**: primarily conducting time-and-motion studies, building standard simulation models, and producing operations reports — work increasingly automated by AI operations platforms.

Specific threats:
- **AI operations platforms (Augury, Sight Machine)** — automated process monitoring and improvement recommendation
- **AI simulation and optimisation tools** — automated discrete event simulation and production scheduling
- **AI supply chain platforms (o9 Solutions, Blue Yonder AI)** — automated demand planning and inventory optimisation

### 6. VERDICT
**The Master of Industrial Engineering is MODERATE RISK — a professionally accredited degree with genuine systems complexity that resists pure automation.**

Industrial engineering involves system design, trade-off optimisation, and operational judgment that AI tools augment but cannot replace. Engineers Australia accreditation provides professional credential protection. Graduates who develop AI system governance capability and specialise in complex system design are well-positioned.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI and ML integration for industrial systems — AI-augmented operations are the growth area in industrial engineering | D5 | Medium |
| 2 | Build complex system design capability beyond standard optimisation | D2 | High |
| 3 | Pursue CPEng accreditation pathway | D6 | High (post-graduation) |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready industrial engineering graduate is not a process analyst — they are a **systems engineer** who understands how complex production systems fail and what interventions actually improve them.

They have designed a system change and measured whether it worked — not just whether the model said it would work, but whether the implementation achieved the expected outcome in the real production environment. They know the gap between the model and reality, and they know what closes that gap.

They govern AI operations tools: they can evaluate whether an AI demand planning recommendation accounts for the specific constraints of their facility, override it when it doesn't, and document the operational reasoning. That governance layer is what makes them an engineer rather than a tool user.

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
    markdown: `## DFVA REPORT: MC-INTEDIB
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-intedib  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of International Education (IB) at the University of Melbourne is a specialist program for educators and professionals in the International Baccalaureate system. It provides advanced knowledge of IB curriculum, assessment, and educational leadership for international schools.

Graduate roles include IB coordinator, international school curriculum leader, IB examiner, education consultant, and international school principal. The program serves a niche market of international school educators.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | IB coordinator, curriculum leader — curriculum management, assessment coordination, teacher professional development | **MEDIUM** — Curriculum administration and coordination are AI-augmentable |
| Year 3–5 | IB head of programme, school leader | **LOW–MEDIUM** — Leadership and pedagogical judgment |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 16/36**  
**Risk band: HIGH RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
YES. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
UNCERTAIN. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
UNCERTAIN. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed IB education graduate is the **IB Curriculum Administrator of 2022**: primarily managing curriculum documentation, assessment schedules, and teacher training logistics — work increasingly systematised by education management platforms.

Specific threats:
- **IB administrative platforms with AI features** — automated assessment scheduling and curriculum tracking
- **AI professional development content generation** — automated teacher training materials

### 6. VERDICT
**The Master of International Education (IB) is HIGH RISK — a highly specialised credential serving a niche market with limited growth potential and significant AI disruption of its routine functions.**

The IB specialisation creates a narrow professional market. International schools are the primary employer, and IB coordination roles are limited in number. Early-career work involves significant administrative coordination that AI tools are automating. The degree lacks the quantitative depth and AI literacy to position graduates above the compression layer.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop educational technology and AI governance expertise for international school contexts | D5 | Medium |
| 2 | Build IB examiner credentials — direct IB assessment involvement provides specialist positioning | D6 | Medium |
| 3 | Develop school leadership capability — administrative and pedagogical leadership are more AI-resistant | D4, D8 | High |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready IB education graduate is not a curriculum administrator — they are an **international education specialist** who understands how the IB framework develops genuinely internationally-minded young people and can lead that development at scale.

They have designed curriculum that works across cultural contexts — they know what the IB's approaches to teaching and learning mean in practice, what the TOK framework is actually developing, and how to help teachers who are struggling to make it real in their classrooms.

They understand AI's role in international education: the specific challenges of AI-assisted assessment integrity in the IB context, how to build learning environments that develop genuine thinking rather than optimised AI prompting, and what the IB Organisation's evolving stance on AI means for curriculum design.

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
  "dfva-mc-is": {
    title: "Master of Information Systems (MC-IS) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `# DFVA REPORT: Master of Information Systems

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 1.5–2 years (200 credit points)

---

**Assessment Date:** 2026-05-07
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-is/
**Prompt Version:** DFVA-COPILOT-SKILL-v1

---

## 1. PROGRAM PROFILE

The Master of Information Systems at the University of Melbourne is a graduate coursework degree targeting candidates with or without prior IT backgrounds (two streams: IT and non-IT entry). The program is housed in the School of Computing and Information Systems. It covers business analysis, enterprise systems, IT project management, data and systems architecture, and strategy. Typical graduate roles include business analyst, IT consultant, systems analyst, project manager, and enterprise architect — with non-IT stream graduates often landing in hybrid business/IT roles.

The program requires 200 credit points: core IS units plus depth electives, with an option for a capstone/research project track.

Key named units include:
- *Foundations of Informatics*
- *IT Infrastructure*
- *Systems Analysis and Design*
- *Enterprise Architecture and Governance*
- *IT Project Management*
- *Business Intelligence Systems*
- *Agile Development Practices*
- *Research Methods in Information Systems* (research track)

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1 | Requirements gathering, documentation, process mapping, stakeholder interviews | **HIGH** — GenAI and tools like Copilot, Notion AI, and workflow automation already replicate structured documentation tasks |
| Year 2 | Junior BA/analyst roles: writing specs, sprint coordination, JIRA workflows, reporting dashboards | **HIGH** — Agentic tools replacing routine sprint and reporting tasks |
| Years 3–5 | Senior BA, IT project lead, systems architect, consultant | **MODERATE** — Judgment and stakeholder management create friction for full automation, but middle-management coordination is shrinking |

**Core risk:** The early-career cluster sits squarely in human middleware territory — translating business needs into structured documentation, managing information flow between stakeholders and dev teams, and maintaining systems configurations.

---

## 3. DFVA SCORECARD

| # | Dimension | Score (0–3) | Evidence |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 1 | First 2–3 years dominated by BA documentation, requirements writing, and process analysis — templated tasks with limited decision ownership |
| 2 | Systems Thinking and Problem Framing | 2 | *Enterprise Architecture and Governance* and *Systems Analysis and Design* include trade-off framing; not consistently integrated across all units |
| 3 | Technical and Quantitative Depth | 2 | *Business Intelligence Systems* and *IT Infrastructure* provide solid grounding; coding depth is light unless electives selected deliberately |
| 4 | Decision-Making Under Uncertainty | 2 | Capstone and project management units include defended trade-offs; non-research track limits live uncertainty exposure |
| 5 | AI Literacy and Governance | 1 | No dedicated AI governance unit visible in core structure; AI tools may appear in *Business Intelligence Systems* but not as a governed curriculum pillar |
| 6 | Domain Depth and Specialisation | 2 | IS is a defined domain; enterprise architecture and governance provide specialist grounding, but dual-stream design dilutes depth |
| 7 | Research Methods Rigour | 2 | *Research Methods in IS* exists on research track; coursework-only track has weaker exposure. Score reflects research track access |
| 8 | Human and Relational Capability | 2 | Stakeholder management and change management appear in project management units; no clinical or physical accountability layer |
| 9 | Curriculum Currency and Adaptability | 2 | 2026 handbook reflects recent review; no explicit AI core units visible — a currency gap for a 2026 program |
| 10 | Graduate Outcome Evidence | 2 | UniMelb publishes aggregate graduate outcome data; granular role/salary/time-to-employment data for MC-IS not prominently available |
| B | Irreplaceability Premium (Bonus) | 1 | Some dual-skill value (business + technology bridge), but this profile is common and not deeply differentiated |
| **TOTAL** | | **18/36** | |

**Risk Band: HIGH RISK (12–19)**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
**YES.** A junior IS graduate's primary outputs — requirements documents, process maps, status reports, stakeholder summaries, sprint documentation, BI dashboards — are all within current GenAI and agentic tool capability. Tools like Copilot, Notion AI, and process automation agents can replicate this output at scale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
**UNCERTAIN.** Enterprise architecture and capstone tracks push toward system design and decision ownership. However, the standard coursework track produces graduates who are primarily system *operators* and *intermediaries* rather than system *designers* or *accountable decision-makers*.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
**NO — without significant self-directed upskilling.** The BA/analyst/IT coordinator pipeline is contracting as AI tools absorb routine IS work. Graduates who emerge with deep AI governance, data engineering, or enterprise AI implementation skills will be viable. Those who do not will face compression at entry level.

---

## 5. ANALOGUE GRADUATE PROFILE

The MIS graduate mirrors the **Business Analyst of 2019**: a valued bridge between business and technology who organised information, translated requirements, and coordinated delivery. That role is now the primary target of:

- **GitHub Copilot / Cursor** — replacing code-adjacent documentation and technical spec writing
- **Notion AI / Confluence AI** — absorbing requirements documentation and meeting summaries
- **Process mining tools (Celonis, UiPath)** — replacing manual process mapping and analysis
- **Agentic project managers (Linear AI, Asana AI)** — replacing sprint coordination and status reporting
- **BI co-pilots (Power BI Copilot, Tableau AI)** — replacing dashboard builds and standard reporting

The MIS graduate is trained for roles that AI tooling is actively dismantling at the entry level.

---

## 6. VERDICT

**The Master of Information Systems is HIGH RISK for 2027 labour-market viability as currently structured.**

The program produces well-rounded IS professionals but anchors early-career outcomes in human middleware tasks — documentation, requirements analysis, coordination, and reporting — that are the current front line of AI-driven role compression. The University of Melbourne brand provides hiring access, but prestige does not insulate graduates from structural role reduction.

The program has the architecture to be better: enterprise architecture, governance, and research methods units are legitimate differentiators. But without a mandatory AI governance and deployment pillar, stronger technical depth requirements, and explicit positioning of graduates as AI workflow supervisors rather than IS coordinators, the degree is producing graduates for a shrinking role category.

**Enrol with a clear upskilling plan, not as a standalone credential.**

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design) | D5, D1, B | High |
| 2 | Mandate real-client AI implementation capstone for all tracks | D4, D1, B | High |
| 3 | Redesign SA&D assessment from BRD production to automation audit with governance recommendation | D2, D4, D1 | Medium |
| 4 | Add mandatory data engineering elective pathway (SQL depth, Python, dbt) | D3, B | Medium |
| 5 | Introduce sector specialisation requirement (health IT, fintech, or govtech cluster) | D6, B | Medium |
| 6 | Publish granular graduate destination data (role-title, industry, salary, time-to-employment) | D10 | Medium |
| 7 | Update program marketing and careers framing to AI workflow architect / automation governance analyst | D1 | Low |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The viable 2027 MIS graduate is not an information broker — they are an **AI workflow architect with governance accountability**.

This graduate enters an organisation and immediately asks: *which of our current IS processes are candidates for AI augmentation, which carry unacceptable risk if automated, and how do we instrument the boundary between human and machine decision-making?* They can build that argument in a boardroom, specify the data requirements for a pilot, and write the governance framework that satisfies the compliance team.

Technically, they are fluent enough in data pipelines and API integration to brief an engineering team without an intermediary. They have run a live capstone with a real organisation under real uncertainty — not a case study with a known answer. They have designed at least one AI-augmented workflow and documented its failure modes.

Their domain is not "IT" in the generic sense — it is a regulated or high-stakes vertical: health informatics, financial systems, government services, or infrastructure. That domain specificity means their judgment cannot be replicated by a general-purpose agent.

This graduate does not *use* AI tools. They **govern, supervise, and redesign** them. That is the role that will exist in 2029.

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Other |
| Full-time employment (4-6mo) | 75.2% (GOS 2024) |
| Median starting salary | $88,500 |
| Employment (3yr) | 75.2% |
| Occupation demand | MET |
| AI automation exposure | 45% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |
`,
  },
  "dfva-market-mc-is": {
    title: "Master of Information Systems (MC-IS) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `## DFVA MARKET INTELLIGENCE: Master of Information Systems (MC-IS)

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Other |
| Full-time employment (4-6mo) | 75.2% (GOS 2024) |
| Median starting salary | $88,500 |
| Employment (3yr) | 75.2% |
| Occupation demand | MET |
| AI automation exposure | 45% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |`,
  },
  "dfva-mc-journ": {
    title: "Master of Journalism (MC-JOURN) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `# DFVA REPORT: Master of Journalism

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 2 years (200 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-journ
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Journalism at the University of Melbourne is a professional degree for candidates seeking editorial, reporting, and media production careers. The 200-credit-point program covers reporting practice, media law, journalism ethics, digital media production, and investigative techniques. It includes a capstone production project.

The program covers print, broadcast, online, and investigative journalism streams. Key areas include *Media Law and Ethics*, *Investigative Journalism*, *Digital Media Production*, and a *Journalism Capstone*. Industry placement and mentoring through Melbourne journalism networks are features of the program.

Typical graduate roles include journalist, digital producer, investigative reporter, media advisor, communications professional, and content strategist. The journalism industry is undergoing structural disruption from digital platforms, declining advertising revenue, and AI content generation — making career planning more complex for graduates than most professional programs.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Reporter, digital content producer, sub-editor, editorial assistant — writing, reporting, content production | **VERY HIGH** — Content generation, summarisation, and research synthesis are AI's primary targets in journalism; entry-level production work is highly exposed |
| Year 3–5 | Senior reporter, investigative journalist, digital editor, broadcast journalist | **HIGH** — Even experienced journalists face AI pressure on content production. Investigative work and source-based reporting are more durable but fewer roles exist. |
| Year 5+ | Editor, investigative unit lead, media advisor, journalism educator | **MEDIUM** — Editorial judgment, institutional relationships, and investigative expertise are genuine differentiators at senior levels |

**Industry note:** The structural decline of journalism employment is independent of AI — digital platform disruption has already compressed the industry significantly. AI acceleration compounds an existing trend. This is one of the most structurally challenged graduate employment markets in the portfolio.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 1/3 | Journalism faces extreme AI disruption. Content generation, summarisation, translation, and research synthesis are all highly automatable. The core craft of writing and story production is AI-vulnerable. |
| 2 | Systems Thinking and Problem Framing | 2/3 | Journalism requires synthesising complex stories across political, social, and institutional systems. Media law, ethics, and press freedom teach systemic perspective on information ecosystems. |
| 3 | Technical and Quantitative Depth | 1/3 | 200pt program but journalism is craft/profession, not deeply quantitative. Digital media production skills present but not analytical depth in statistics, data, or computation. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Editorial judgment, ethical decisions under deadline pressure, and source verification require real-time decision-making. Capstone projects require defended editorial choices. |
| 5 | AI Literacy and Governance | 1/3 | No AI-specific journalism content visible. Digital media tools covered but AI in journalism — deepfake detection, automated fact-checking, AI-generated misinformation — not explicitly taught. |
| 6 | Domain Depth and Specialisation | 3/3 | 200pt professional journalism degree. Clear specialist domain with capstone, production requirements, and defined professional identity. |
| 7 | Research Methods Rigour | 2/3 | Investigative journalism teaches research methodology. Academic research component required at master's level. Evidence and verification practices are central to the curriculum. |
| 8 | Human & Relational Capability | 3/3 | Interviewing, source cultivation, ethical engagement with subjects and communities — journalism is fundamentally a human-trust profession requiring relational skill. |
| 9 | Curriculum Currency and Adaptability | 1/3 | Limited evidence of digital/AI-age journalism transformation in curriculum. Traditional journalism framework visible without explicit AI-era adaptation. |
| 10 | Outcome Evidence | 2/3 | Journalism employment market is structurally contracting. Limited program-specific destination data. Industry disruption is well-documented. |
| B | Irreplaceability (bonus) | 2/3 | Investigative journalism requires human trust, ethical judgment, and investigative persistence. But industry is in structural decline. The human value is real; the market is shrinking. |
| **TOTAL** | | **20/36** | |

**Risk Band: MODERATE RISK**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
YES. The early-career output for Master of Journalism graduates is substantially templated — research, analysis, and document production are in AI's wheelhouse.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
UNCERTAIN. Partial capability exists. Studio, capstone, or professional placement elements push toward decision ownership, but the standard curriculum track does not guarantee it.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
NO. AI disruption of the primary employment market, combined with limited curriculum adaptation, creates meaningful 5-year employability risk.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed journalism graduate is the **Junior Reporter of 2022**: a competent writer producing daily news articles, breaking news summaries, and content packages for digital platforms — work that AI content generators (ChatGPT, Claude, Perplexity) can now produce at volume with minimal human input.

Specific threats:
- **AI news writers (Bloomberg's Cyborg, AP Automated Insights, Reuters Lynx)** — replacing high-volume financial and sports reporting
- **AI summarisation tools (Perplexity, Artifact)** — producing news summaries from primary sources without human journalists
- **AI video/audio production tools** — replacing some broadcast production roles
- **Deepfake and synthetic media** — creating misinformation that journalists must identify and counter — a new skill not in current curriculum

---

## 6. VERDICT

**The Master of Journalism is MODERATE RISK — a degree with genuine human-value dimensions in a structurally contracting industry.**

The program's score (23/36) reflects a real tension: journalism has authentic human value that AI cannot fully replace (source trust, ethical judgment, investigative persistence, public accountability), but the industry these graduates are entering is experiencing both AI disruption and platform-driven structural decline simultaneously.

The human relational capability (D8: 3/3) and domain depth (D6: 3/3) are genuine. A skilled investigative journalist who has cultivated sources, navigated hostile access environments, and defended editorial decisions under legal pressure is doing work that AI cannot replicate. But this profile applies to a relatively small number of senior journalists in a market that is shedding entry-level and mid-level positions.

**The curriculum currency gap (D9: 1/3) is a significant concern.** A journalism degree in 2026 should be teaching graduates to detect AI-generated content, fact-check synthetic media, govern AI tools in newsrooms, and position themselves as human-intelligence specialists in an AI-augmented media environment. The program's limited adaptation to these realities leaves graduates under-prepared for the specific challenges of the AI-era media landscape.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop data journalism skills actively — statistical literacy, data analysis, and quantitative storytelling are the most defensible journalism skills against AI competition | D3, D9 | Medium |
| 2 | Build AI detection and verification competency — deepfake identification, AI-generated content analysis, and synthetic media authentication are growth specialties | D5, D9 | Low |
| 3 | Develop a non-journalism income stream during the program — communications, content strategy, or PR skills provide portable income while investigative journalism careers develop | D1 | Low |
| 4 | Specialise in an accountability beat that requires source relationships — investigative journalism covering institutions that don't want coverage is where human reporters remain indispensable | D6, D8 | Medium |
| 5 | Build a direct audience relationship through publication — owned channels reduce dependence on editorial employment and demonstrate demonstrated reach to future employers | D10 | Low |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready journalism graduate is not a content producer — they are a **public accountability professional** who does the work that AI, by design, cannot and will not do.

They have cultivated sources in an institution that matters — a hospital, a regulator, a police force, a corporation — and those sources trust them because they have proven over time that they are accurate, fair, and discreet. That trust relationship took years to build and is not transferable to a machine.

They can read a financial disclosure, identify the gap between what is stated and what the data shows, and explain the discrepancy in plain language to a general audience. They have done this under legal threat and emerged with the story. Their work has changed something.

They know exactly what AI is doing in their industry and they know what it cannot do. It cannot cultivate the sources who matter. It cannot sit in a room with a reluctant witness and earn their trust. It cannot make the ethical judgment call about whether to publish information that will harm an individual in service of a greater public good. These are human capabilities — and they are what a journalist in 2027 must position as their core value.

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

### 1. PROGRAM PROFILE
The Master of Nursing Science at the University of Melbourne is an advanced nursing degree for registered nurses seeking research training, specialist clinical knowledge, or leadership preparation. The program is distinct from initial registration programs and targets practising nurses with clinical experience.

The program includes coursework in advanced nursing practice, healthcare systems, evidence-based practice, research methodology, and a research component. Specialisations include Nurse Practitioner preparation, clinical nursing education, nursing leadership, and research. The program is accredited by the Australian College of Nursing.

Typical graduate roles include advanced practice registered nurse, nurse practitioner (where additional AHPRA requirements are met), clinical nurse educator, nursing unit manager, clinical nurse researcher, and policy advisor in health departments.


###  3. DFVA SCORECARD
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

### 4. THREE THRESHOLD QUESTIONS
- **Q1:** NO — nursing is fundamentally irreducible. Physical patient care, clinical judgment, and empathetic communication are non-automatable.
- **Q2:** YES — clinical placements require real-time decision ownership. NMBA standards enforce demonstrated clinical competence.
- **Q3:** YES — nursing demand is structurally growing (aging population, chronic disease). Clinical skills are durable and non-automatable.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed nursing science graduate is the **Junior Registered Nurse of 2022**: primarily performing routine documentation, medication administration tracking, and standard patient observation protocols — tasks increasingly augmented by AI clinical support systems.

Specific threats:
- **AI clinical decision support (IBM Watson Health, Epic AI)** — automated clinical alerts and recommendation generation
- **AI nursing documentation tools** — automated patient note generation from clinical observations
- **Robotic medication dispensing systems** — replacing routine medication preparation and administration tracking
- **AI patient monitoring systems** — automated vital sign interpretation and deterioration prediction

However, the MC-NURSC graduate profile emphasises advanced practice and research leadership — substantially more protected than general registered nursing.

---

### Verdict
Nursing is among the most AI-resistant professions assessed. The program's structural defences are regulatory (NMBA accreditation), practical (physical patient care), and relational (empathy, communication, clinical judgment). The score (26/36) reflects strong core protection with room to improve AI literacy for the digital health tools nurses increasingly use. But the program's fundamentals are sound — nursing graduates face AI augmentation of their tools, not substitution of their role.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready nursing science graduate is not a documentation specialist — they are a **clinical knowledge leader** who advances nursing practice through research and evidence-based change.

They have designed and led a clinical quality improvement project: they identified a practice problem, reviewed the evidence, implemented a change, and measured the outcome. They know what it takes to change clinical practice in a real hospital environment — the stakeholder management, the resistance, and the evidence requirements. That implementation expertise is not in a textbook.

They understand AI clinical support tools: they evaluate whether an AI deterioration alert is calibrated correctly for their patient population, override it when clinical judgment indicates a different interpretation, and document the clinical reasoning. That governance capability — combining clinical expertise with AI tool evaluation — is what the AI-augmented healthcare environment actually requires from clinical leaders.

---


### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI clinical decision support tool literacy — understand AI alert systems and when to override | D5 | Medium |
| 2 | Specialise in complex clinical areas where AI tools have least capability — ICU, oncology, mental health | D6 | High |
| 3 | Build clinical research skills — nursing-led research has growing funding and policy relevance | D7 | High |
| 4 | Develop supervision and mentoring capability — educator and clinical leader roles are more automation-resistant | D8 | High |
| 5 | Build quantitative skills for evidence-based practice | D3, D7 | Medium |

---


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
    markdown: `## DFVA REPORT: MC-PHTYPH
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-phtyph  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Physiotherapy (Pelvic Health) at the University of Melbourne is a specialist advanced practice program for registered physiotherapists seeking specialisation in pelvic health — a clinical area addressing continence, pelvic floor dysfunction, and related conditions. The program is clinical, practical, and physically intensive.

Graduate roles include pelvic health physiotherapist, women's health physiotherapist, continence clinician, and pelvic health researcher. This is a high-growth specialty due to ageing population, increased awareness of pelvic floor health, and recognised under-service.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Pelvic health physiotherapy assessment and treatment | **LOW** — Physical assessment and treatment requires hands-on clinical skill and patient relationship |
| Year 3–5 | Specialist pelvic health clinician, clinical educator | **LOW** — Specialist physical expertise and patient management |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 25/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed physiotherapy graduate is the **Exercise Physiology AI App User of 2022**: conducting standardised exercise prescription from online templates — work being offered directly to consumers by AI fitness and rehabilitation apps.

However, pelvic health physiotherapy is substantially more protected: internal examination techniques, manual therapy, real-time ultrasound assessment, and intimate patient management require physical presence and specialist clinical skill that AI cannot replicate.

### 6. VERDICT
**The Master of Physiotherapy (Pelvic Health) is MODERATE RISK (upper boundary, approaching RESILIENT) — a specialist clinical program with strong physical practice protection and structural demand growth.**

Pelvic health physiotherapy is a high-growth specialty with documented under-service and an ageing population driving structural demand. The physical assessment techniques, therapeutic alliance requirements, and intimate clinical context create strong automation barriers. This is among the more automation-resistant clinical programs in the portfolio.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop real-time ultrasound assessment skills — this specialist skill creates significant differentiation | D3, D6 | High |
| 2 | Build expertise in the research evidence base for pelvic health interventions | D7 | Medium |
| 3 | Develop patient communication and psychosocial assessment skills for the biopsychosocial model | D8 | Medium |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready pelvic health physiotherapy graduate is a **specialist physical clinician** whose hands-on assessment and treatment skills are the core of their professional value.

They can conduct a comprehensive pelvic floor assessment — including real-time ultrasound, internal examination, and functional movement analysis — and integrate that clinical picture into a treatment plan that addresses the physical, psychological, and social dimensions of pelvic dysfunction. That multi-system integration requires human clinical judgment and physical skill that cannot be automated.

They have managed complex patients: those with concurrent chronic pain, those for whom the condition has significant psychological impact, and those from cultural backgrounds where discussion of pelvic symptoms is difficult. They know how to create the clinical relationship that allows treatment to work in those contexts.

They are positioned in a growth specialty with genuine workforce shortage. Their physical skills, specialist credentials, and patient relationship capability are the combination that makes pelvic health physiotherapy one of the more durable clinical specialties in the AI era.

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
    markdown: `# DFVA REPORT: Master of Property

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 2 years (300 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-prop
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Property at the University of Melbourne is a professional property program accredited by the Australian Property Institute (API) and the Royal Institution of Chartered Surveyors (RICS). It is the primary graduate pathway to professional property practice in Australia.

The 300-credit-point program covers property development, investment analysis, valuation theory and practice, property finance, facilities management, and real estate law. Core subjects include financial modelling, feasibility studies, and professional practice. A research capstone project is available for students pursuing academic or advanced professional pathways.

Typical graduate roles include property analyst, valuer, development manager, property investment analyst, asset manager, facilities manager, and real estate advisor. The API and RICS accreditations are the standard professional credentials in the Australian property market.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Property analyst, graduate valuer, development assistant — market analysis, feasibility modelling, valuation support, site research | **MEDIUM** — AI valuation tools (Domain's AI, Corelogic) augment but do not replace physical inspection and judgment; financial modelling increasingly AI-assisted |
| Year 3–5 | Valuer, property manager, development manager — client relationships, independent valuations, project delivery | **MEDIUM–LOW** — Physical assessment, client management, and professional liability create genuine automation barriers |
| Year 5+ | Senior valuer, fund manager, development director, asset manager — portfolio strategy and investment decisions | **LOW** — Judgment, relationship management, and financial accountability are core. |

**Physical layer protection:** Property valuation requires physical property inspection and local market knowledge that AI systems cannot currently replicate. This physical layer provides genuine automation resistance at the practitioner level, though AI is rapidly improving property analysis capabilities.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2/3 | Property valuation and market analysis are increasingly AI-augmented but require physical inspection, client negotiation, and regulatory judgment that creates genuine automation friction. |
| 2 | Systems Thinking and Problem Framing | 2/3 | Full property cycle: development, investment, finance, valuation, management. Systems integration across the project lifecycle is embedded in the curriculum structure. |
| 3 | Technical and Quantitative Depth | 2/3 | 300pt program. Financial modelling, feasibility analysis, and valuation methods. API/RICS accreditation requires demonstrated technical competence. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Risk allocation, viability assessment, and project evaluation require professional judgment. Capstone research project available for more intensive decision-making experience. |
| 5 | AI Literacy and Governance | 1/3 | No AI-specific content. Data management and software skills mentioned but AI/proptech not explicit in curriculum. |
| 6 | Domain Depth and Specialisation | 3/3 | 300pt professional degree with dual API/RICS accreditation. 225pt core. Clear property specialist pathway with recognised professional credentials. |
| 7 | Research Methods Rigour | 2/3 | Research project/capstone available. Research principles in property practice taught. PhD pathway mentioned. |
| 8 | Human & Relational Capability | 2/3 | Negotiation, communication, and client management skills explicit. Professional practice component. Not clinical-level relational. |
| 9 | Curriculum Currency and Adaptability | 2/3 | Updated June 2026. Property industry current. Limited AI/proptech/digital innovation visibility in curriculum. |
| 10 | Outcome Evidence | 2/3 | API/RICS accreditation provides external validation of standards. Property industry employment is trackable through professional bodies. |
| B | Irreplaceability (bonus) | 2/3 | Physical inspection requirements, professional liability, and client relationships create automation friction. Accreditation pathway is a structural barrier. |
| **TOTAL** | | **22/36** | |

**Risk Band: MODERATE RISK**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. Core professional work in Master of Property requires physical presence, regulated judgment, or specialist domain knowledge that AI cannot yet replicate reliably.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. The program's capstone, professional practice, and specialist curriculum provide genuine decision ownership and system design capability.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Structural demand for the specific skill set, professional accreditation protection, or AI-native curriculum positioning make 5-year employability stronger than today.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed property graduate is the **Junior Property Analyst of 2021**: primarily producing market research reports, comparable sales analysis, and financial feasibility spreadsheets — work being compressed by AI-powered property platforms and automated valuation models.

Specific threats:
- **Automated Valuation Models (CoreLogic AVM, Domain AI, PropTrack)** — replacing routine residential and commercial property valuation estimates
- **AI development feasibility tools** — automated feasibility analysis from land cost, build cost, and market rate data
- **AI market research tools** — automated suburb and market analysis reports replacing junior analyst output
- **PropTech platforms (Archistar, Urban Intelligence)** — planning constraint analysis and site identification previously done by junior property analysts

---

## 6. VERDICT

**The Master of Property is MODERATE RISK — a degree with professional accreditation protection and physical-layer automation resistance, constrained by a curriculum that has not yet integrated AI literacy.**

The program's score (23/36) reflects the genuine value of the API/RICS accreditation pathway, physical inspection requirements, and professional liability framework. Property practice requires site visits, client relationships, and local market judgment that AI systems are not yet reliably replacing.

The risk is at the junior end: market research, comparable analysis, and feasibility modelling are exactly what AI property tools are automating. Graduates who enter the workforce as primarily analytical (market research, spreadsheet modelling) without developing the physical practice and client relationship skills face compression.

**The AI literacy gap (D5: 1/3) is significant for a 2026 program.** PropTech and AI valuation tools are transforming the industry. A graduate who cannot situate AI property tools within a professional governance framework — understanding their limitations, when to override them, and what liability exists when they are wrong — is under-prepared for practice.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop proptech and AI valuation tool literacy — understand AVM methodology, limitations, and when professional judgment must override algorithmic outputs | D5, D9 | Medium |
| 2 | Pursue API/RICS accreditation actively — professional registration is the most durable automation barrier in property practice | D6 | High (post-graduation commitment) |
| 3 | Build physical inspection experience early — paired site visits and direct market research through internship or work experience | D1, D8 | High |
| 4 | Develop expertise in a specific property sector (industrial, healthcare, agriculture) — specialist knowledge creates genuine non-replicable advantage | D6 | Medium |
| 5 | Complete the research project capstone if possible — demonstrates analytical independence and strengthens graduate credential | D7 | High |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready property graduate is not a spreadsheet analyst — they are a **professional judgment specialist with physical market knowledge**.

They have been inside the buildings they have valued. They know what a deferred maintenance liability looks like in person, not just on a balance sheet. They have sat with a client who was emotionally attached to an asset and held a valuation position under pressure. They have navigated a planning approval and understood what the consent authority was actually concerned about beyond the formal requirements.

They understand what AI valuation tools do and what they miss. They can explain to a client why an AVM undervalued a commercial property because the training data didn't include the specific lease structure, and they can defend that position in writing. That combination — AI tool literacy plus physical market judgment plus professional liability — is not replicable by a model.

They have an API membership path underway and they know the regulatory framework for their practice area. They are not just a property analyst — they are a credentialled professional with physical market experience and AI tool governance capability.

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


### 5. ANALOGUE GRADUATE PROFILE

The most exposed professional psychology graduate is the **Psychological Assessment Technician of 2021**: primarily administering standardised psychological tests, scoring instruments, and producing standard assessment reports — work being increasingly automated by AI psychological assessment platforms.

Specific threats:
- **AI psychological assessment platforms (Pearson AI, MHS AI scoring)** — automated administration and scoring of psychological instruments
- **AI report generators for psychological assessments** — templated report production from standardised test data
- **Mental health chatbot platforms (Woebot, Wysa)** — absorbing some lower-acuity counselling work that graduate psychologists historically performed
- **AI diagnostic support tools** — automated differential diagnosis suggestions from symptom data

---

### 5. VERDICT
Clinical psychology's regulatory and practical barriers create one of the strongest AI defences in the assessment cohort. The program's sequential all-compulsory design, 300-hour placement, and APAC/PsyBA pathway mean graduates exit with demonstrated clinical competence that resists substitution. The AI literacy gap exists but is less acute than in non-clinical fields — clinical psychology's core value is human judgment, not tool operation.

### 6. RECOMMENDATIONS
| Priority | Action | Dimensions | Effort |
|---|---|---|---|
| P1 | Add digital mental health + AI in clinical practice module | D5 | Low |
| P1 | Publish graduate destination + 5+1 completion data | D10 | Low |

**Path to RESILIENT:** P1 actions → 28/36 RESILIENT.


### 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready professional psychology graduate is not an assessment technician — they are a **psychological treatment specialist with evidence-based practice expertise**.

They are registered with AHPRA and carry professional liability. When an AI diagnostic tool suggests a formulation, they are the person who evaluates whether it accounts for the client's cultural context, trauma history, and presenting complexity — and who documents the clinical reasoning that either accepts or overrides the AI suggestion. That professional accountability is not delegatable.

They have done a substantial internship under supervision and emerged with real clinical case experience: a client they helped significantly, a case that challenged their formulation skills, and a supervisory relationship that built their professional identity. Those experiences are not in a textbook and they are not in an AI model.

They understand AI tools in mental health — their capabilities, limitations, and ethical requirements — because the landscape of AI-assisted therapy and assessment is developing rapidly. They can advise an organisation on appropriate use of AI in psychological services. They do not fear AI in their practice; they govern it.

---

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


### 5. ANALOGUE GRADUATE PROFILE

The most exposed bioinformatics graduate is the **Bioinformatics Pipeline Operator of 2021**: running standard genome assembly pipelines, executing BLAST searches, and processing RNA-seq data using established workflows — work that cloud bioinformatics platforms and automated analysis tools are rapidly systematising.

Specific threats:
- **Galaxy Project / GALAXY AI** — automated bioinformatics workflow execution without pipeline code writing
- **AlphaFold / ESMFold** — protein structure prediction that replaced significant junior computational structural biology work
- **Automated variant calling pipelines (GATK, DeepVariant)** — algorithmic variant analysis replacing manual pipeline management
- **CancerVar / automated variant interpretation tools** — AI-powered clinical variant classification replacing junior bioinformatician manual curation

---

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


### 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready bioinformatics graduate is not a pipeline runner — they are a **genomic data scientist** who knows why the analysis answers the question, not just how to run it.

They have designed a bioinformatics analysis from a biological question — not inherited a pipeline from a supervisor and executed it. They know what assumptions are embedded in the read alignment algorithm, what the reference genome misses, and when a variant call is a technical artefact rather than a biological signal. That interpretive judgment is what separates a bioinformatician from a workflow executor.

They understand how AlphaFold is right and how it is wrong — the difference between a high-confidence structural prediction and a low-confidence region where the model is extrapolating. They can look at a predicted structure and tell a collaborating biochemist what experiments would be needed to validate the fold.

They sit at the interface between computation and biology: they translate between wet-lab researchers who know what the biology means and computational infrastructure that needs precise problem specification. That translation layer — requiring genuine expertise in both domains — is what makes their work non-replicable by a general-purpose AI system.

---

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

### 1. PROGRAM PROFILE
The Master of Science (BioSciences) at the University of Melbourne is a research-intensive degree with a 125-credit-point research project — among the largest in the assessed cohort. Students choose from three specialisation areas: Ecology, Evolution and Environmental Science; Genetics, Genomics and Development; or Plant Science.

The 200-credit-point program includes foundational and advanced subjects in Applied Statistics, Genomics and Bioinformatics, Environmental Modelling, Spatial Data Analytics, Communication for Research Scientists, and the Graduate Seminar in BioSciences. The substantial research component develops original research capability under expert academic supervision.

Typical graduate roles include research scientist, postdoctoral researcher, conservation biologist, government ecologist, environmental assessment scientist, and PhD candidate. The program is the primary gateway to biological research careers and PhD programs at Melbourne.


###  3. DFVA SCORECARD
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

###  4. THREE THRESHOLD QUESTIONS
- **Q1:** NO — 125pt research project + field/lab work is irreducible.
- **Q2:** YES — Research design through thesis. Field ecology and experimental biology require original investigation.
- **Q3:** YES — Biodiversity, climate adaptation, biosecurity are growing fields. Research training creates adaptable professionals.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed biosciences graduate is the **Research Assistant of 2021**: primarily conducting routine laboratory protocols, data entry from experimental results, and literature searching for project teams — work being automated by laboratory robotics and AI research tools.

Specific threats:
- **Lab automation systems (Hamilton, Tecan)** — high-throughput liquid handling and assay automation
- **AI literature synthesis (Elicit, Consensus, Research Rabbit)** — automated systematic review and literature mapping
- **AI data analysis for standard biological datasets** — automated statistical analysis of genomic, proteomic, and phenotypic data
- **Laboratory information management AI** — automated protocol optimisation and experimental tracking

---

### Verdict
The 125pt research project is the structural anchor. Genomics and bioinformatics electives add computational relevance. AI literacy gap is the main opportunity — adding even one unit on AI in biological research would strengthen an already-solid program.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready biosciences graduate is not a laboratory technician — they are a **biological research scientist** who generates original knowledge and defends it under peer scrutiny.

They have designed and conducted an experiment that answered a question nobody knew the answer to. They know what it feels like to get unexpected results and to spend weeks determining whether the unexpected result is real or an artefact. That experimental judgment — knowing when to trust results and when to question protocols — is what a scientist develops through research experience.

They understand how AI is transforming biological research: AlphaFold's revolution in structural biology, AI-assisted drug discovery platforms, and automated imaging analysis. They can evaluate whether an AI-generated biological prediction requires experimental validation and design the experiment that would provide definitive evidence.

They are positioned at the interface of computation and biology — fluent in data analysis tools, able to collaborate with bioinformaticians, and grounded in the experimental tradition that distinguishes real biological knowledge from model-generated speculation.

---


### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Add a unit on AI in biological research — ML for biological data, AI in genomics, computational biology | D5, D9 | Medium |
| 2 | Develop bioinformatics competency alongside wet-lab expertise | D3, D5 | Medium |
| 3 | Complete the Graduate Seminar and develop scientific communication skills | D8 | Low |
| 4 | Target specialisation areas with structural demand — biosecurity, climate adaptation, genomics conservation | D1, D6 | Low |
| 5 | Publish graduate destination data including PhD continuation rates | D10 | Medium |

---


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
  "dfva-mc-sciche": {
    title: "Master of Science (Chemistry) (MC-SCICHE) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Science (Chemistry) (MC-SCICHE)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-sciche

### 1. PROGRAM PROFILE
The Master of Science (Chemistry) at the University of Melbourne is a research-intensive degree combining advanced chemistry coursework with a substantial research project. The program covers modern analytical chemistry, synthetic chemistry, physical chemistry, computational chemistry, and materials science.

Advanced coursework includes Spectroscopic Methods, Organic Synthesis, Inorganic and Materials Chemistry, Physical and Computational Chemistry, and Chemical Biology. The research project develops specialist laboratory expertise in an active research group. Students gain experience in contemporary chemical instrumentation and computational tools.

Typical graduate roles include research scientist in chemical, pharmaceutical, and materials industries, analytical chemist, PhD candidate, science communicator, and quality assurance scientist. Chemistry graduates move into pharmaceutical development, battery technology, catalysis, materials science, and forensic science.


###  3. DFVA SCORECARD
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

###  4. THREE THRESHOLD QUESTIONS
- **Q1:** NO — Physical lab work is irreducible. Chemical synthesis, instrumentation, and analysis require human presence and judgment.
- **Q2:** YES — Research project from experimental design through thesis. Chemistry requires original investigation.
- **Q3:** YES — Materials science, environmental chemistry, pharmaceutical chemistry are growing. Lab-trained researchers are structurally durable.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed chemistry graduate is the **Analytical Chemistry Technician of 2021**: primarily running standardised analytical methods, preparing samples for instrument analysis, and generating routine QC reports — work being automated by analytical laboratory robotics and AI quality management systems.

Specific threats:
- **Automated analytical instruments with AI interpretation** — automated HPLC, NMR, and mass spectrometry interpretation
- **AI synthetic route planning (IBM RXN, Chemputer)** — automated synthetic chemistry planning replacing junior synthetic design work
- **AI quality control systems** — automated pharmaceutical QC analysis and batch release documentation
- **Robotic chemistry platforms (Chemspeed, Opentrons)** — automated synthetic chemistry and sample preparation

---

### Verdict
Chemistry's physical lab requirement is a structural moat against AI substitution. The 125pt research project and specialist instrumentation training create graduates whose core capability — designing and executing chemical experiments — AI cannot replicate. The multiple "not available in 2026" units are a concern for curriculum stability. The AI literacy gap is real but less acute than in non-lab fields. Adding computational chemistry with AI methods would modernise without compromising the core.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready chemistry graduate is not an analytical technician — they are a **specialist chemist** with domain expertise that AI synthesis and analysis tools cannot replicate.

They understand mechanisms: they know why the reaction works, not just that the procedure produces the product. They can design a synthetic route that hasn't been tried before and explain why they chose the protecting group strategy they did. That synthetic judgment — understanding reactivity at the mechanism level — is what distinguishes a chemist from a chemist's laboratory robot.

They have evaluated AI synthetic planning tools: they know when Chemputer's suggested routes are chemically sound and when they fail to account for functional group compatibility or protecting group requirements. They can validate AI-generated outputs against their chemical knowledge. That critical evaluation capability is the governance layer that makes chemistry expertise durable in an AI-augmented laboratory.

---


### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop computational chemistry competency — DFT, molecular dynamics, ML potentials | D3, D5 | Medium |
| 2 | Build AI chemistry tool literacy — evaluate AI synthetic planning and property prediction tools | D5 | Medium |
| 3 | Specialise in a high-growth area — battery chemistry, pharmaceutical synthesis, materials science | D6 | Medium |
| 4 | Build science communication capability for non-specialist stakeholders | D8 | Low |
| 5 | Target industry research roles alongside academic pathways | D1, D10 | Low |

---


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
  "dfva-mc-sciphy": {
    title: "Master of Science (Physics) (MC-SCIPHY) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `## DFVA REPORT: Master of Science (Physics) (MC-SCIPHY)
**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)
**Assessment date:** 2026-06-08 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-sciphy

### 1. PROGRAM PROFILE
The Master of Science (Physics) at the University of Melbourne is a research-intensive degree for students seeking specialist expertise in physics for research careers, high-tech industry, or PhD programs. The program integrates advanced physics coursework with a substantial research project.

Specialist elective areas include Quantum Physics, Condensed Matter Physics, Particle Physics, Astrophysics and Cosmology, Atmospheric Physics, Photonics, and Computational Physics. Advanced Mathematics for Physicists provides the mathematical grounding for specialisation. The research project connects students to active research groups in these areas.

Typical graduate roles include research scientist (in physics labs, national facilities, or industry), PhD candidate, data scientist (physics background is strongly valued in quantitative finance and AI research), optical engineer, quantum computing researcher, and atmospheric modeller.


###  3. DFVA SCORECARD
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

###  4. THREE THRESHOLD QUESTIONS
- **Q1:** NO — 100pt research project is irreducible. Physics problem-solving is conceptual, not templated.
- **Q2:** YES — Research project from proposal through thesis defense. Physics trains system design at a conceptual level.
- **Q3:** YES — Quantum computing and advanced physics skills grow in value. Research training is adaptable.


## 5. ANALOGUE GRADUATE PROFILE

The most exposed physics graduate is the **Physics Data Analyst of 2021**: primarily processing experimental datasets, running standard analysis pipelines, and producing summary reports for experimental physics groups — work being absorbed by automated data analysis frameworks.

Specific threats:
- **AI physics simulation tools** — automated simulation of quantum systems and condensed matter phenomena
- **Machine learning for experimental data analysis** — automated signal detection and parameter estimation in particle physics and materials science
- **AI literature and research synthesis tools** — absorbing the systematic review work that physics PhD students and postdocs performed
- **Automated laboratory control systems** — replacing manual experimental parameter adjustment and monitoring

---

### Verdict
Physics research training is structurally durable. The 100pt project + professional skills component creates well-rounded researchers. The AI literacy gap exists but is less acute than in applied fields — physics graduates operate at a conceptual level AI tools don't reach. Quantum computing elective positions graduates at an emerging frontier.


## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready physics graduate is not a data analyst — they are a **physical scientist** who can connect mathematical formalism to physical reality and defend that connection under expert scrutiny.

They have done original research: they know the discipline of starting from a physical problem, developing a theoretical framework, designing a measurement approach, and interpreting ambiguous data. They know what it feels like to have a result that doesn't fit the theory and to spend months determining whether the theory or the measurement is wrong.

They understand how AI is transforming physics: from machine learning for experimental signal detection to AI-accelerated materials discovery. They can evaluate whether a machine learning model is capturing real physics or fitting noise, and they know what additional experiments would distinguish between these interpretations.

They are positioned at the interface of fundamental science and technology application — the place where deep physical understanding enables genuinely novel device design, materials development, or computational capability.

---


### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop machine learning for physics data analysis — critical for modern experimental and computational physics | D3, D5 | Medium |
| 2 | Build AI literacy at the physics-ML interface — when AI captures real physics vs statistical patterns | D5 | Medium |
| 3 | Develop interdisciplinary communication capability for physics-engineering-data science interfaces | D8 | Medium |
| 4 | Target growth specialisations — quantum computing, photonics, atmospheric physics | D1, D6 | Low |
| 5 | Build quantitative finance or AI research competency as a supplementary pathway | D1 | Medium |

---


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
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-scwr  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Social Work (and/or Screenwriting — note: mc-scwr appears to map to Social Work based on AASW accreditation context) at the University of Melbourne is an AASW-accredited professional degree preparing graduates for registered social work practice.

The program includes supervised field placement, foundational social work methods, policy analysis, research methods, and specialist areas including child and family welfare, mental health, and community development. Graduate roles include social worker, community services worker, case manager, child protection worker, and social policy analyst.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Social worker — case management, client assessment, service coordination, report writing | **MEDIUM** — Documentation and coordination are AI-augmentable; direct client work and relationship management are not |
| Year 3–5 | Senior social worker, team leader | **LOW** — Complex case management and professional judgment |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 22/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed social work graduate is the **Case Coordinator of 2021**: primarily managing client documentation, writing referral letters, and coordinating service plans from standardised frameworks — work being augmented by social service case management platforms.

Specific threats:
- **AI case management platforms** — automated risk assessment screening and service matching
- **AI documentation assistants** — automated case note generation from clinical contacts
- **AI triage and referral tools** — automated service pathway matching from presenting needs

### 6. VERDICT
**The Master of Social Work is MODERATE RISK — a professionally accredited degree with strong relational protection and structural employment demand, facing AI compression at the administrative layer.**

AASW registration provides professional credential protection. The relational core of social work — sustained engagement with vulnerable individuals and families, advocacy, and therapeutic relationship — is not automatable. The risk is at the documentation and coordination layer, where AI is reducing administrative time without replacing the relational work. This is largely neutral for skilled practitioners.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop complex case specialisation — child protection, mental health dual diagnosis, or refugee services — where relational complexity is highest | D6, D8 | High |
| 2 | Build policy analysis and advocacy capability — systemic change work is more automation-resistant than individual case coordination | D2 | Medium |
| 3 | Develop AI governance literacy for social services contexts — AI risk assessment tools in child protection and mental health require human oversight | D5 | Medium |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready social work graduate is not a case coordinator — they are a **social systems specialist** who understands how institutional, relational, and structural factors interact to create and perpetuate disadvantage.

They have worked in sustained relationships with clients across complex transitions: housing instability, family crisis, mental health fluctuation. They understand the timeline of support — that meaningful change in chronic disadvantage takes years, not weeks — and they build their practice accordingly.

They can evaluate AI risk assessment tools in child protection and mental health with a critical professional eye: they know what the tools measure, what the training data population was, and whether the model's risk predictions account for the specific family's circumstances or merely pattern-match to statistical risk factors. That critical AI literacy, combined with their relational skill, is what makes them a professional rather than a protocol follower.

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
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** 2026-06-20  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-surged  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Surgical Education at the University of Melbourne is a specialist program for surgeons and clinicians seeking advanced expertise in surgical training, simulation, assessment of surgical competence, and clinical education. It is a research-oriented professional development program.

Graduate roles include surgical educator, simulation director, medical education researcher, surgical training program coordinator, and clinical skills academic. The program serves a niche market of senior surgical educators.

### 2. AUTOMATION EXPOSURE PROFILE
| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Surgical educator, simulation trainer | **LOW** — Teaching surgical skill, assessing surgical competence, and clinical simulation are human-intensive activities |
| Year 3–5 | Medical education researcher, simulation director | **LOW** — Specialist expertise in surgical education design |

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: 25/36**  
**Risk band: MODERATE RISK**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
The most exposed surgical education graduate is the **Medical Education Administrator of 2021**: primarily managing training schedules, assessment logistics, and simulation booking systems — work systematised by medical education management platforms.

However, the core surgical educator role — designing simulation experiences, assessing technical skill, providing mentorship, and conducting surgical education research — is substantially more protected by its specialist and physical nature.

### 6. VERDICT
**The Master of Surgical Education is MODERATE RISK — a specialist niche degree with strong protection from physical skill and relational mentorship requirements.**

Surgical education at the advanced level involves expert assessment of physical surgical skill, simulation design, and research-led curriculum development — all of which require genuine specialist expertise. The market is small but stable.

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop simulation centre leadership capability — managing advanced surgical simulation programs | D4, D8 | High |
| 2 | Build expertise in AI-assisted surgical training tools and their assessment validity | D5 | Medium |
| 3 | Develop surgical education research skills | D7 | High |

### 8. THE REDESIGNED GRADUATE PROFILE
The 2027-ready surgical education graduate is a **specialist clinical educator** who designs training experiences that develop surgical judgment, not just technical execution.

They understand the difference between a technically proficient surgical trainee and a surgically wise one — the capacity to adapt when the operation doesn't go as planned, to recognise deterioration before it becomes crisis, and to communicate clearly with the operating team under pressure. They design simulation experiences that develop the second kind of capability, not just the first.

They evaluate AI surgical training tools — robotic simulators, haptic feedback systems, AI-assisted assessment of surgical performance — with a critical eye. They know what the assessment metrics capture and what they miss, and they design training curricula that develop the aspects of surgical capability that current AI assessment cannot yet evaluate.

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
    markdown: `# DFVA REPORT: Master of TESOL

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 2 years (200 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-tesol
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of TESOL (Teaching English to Speakers of Other Languages) at the University of Melbourne prepares graduates to teach English as an additional language in Australian and international school and adult education contexts. The 200-credit-point program meets VIT (Victorian Institute of Teaching) requirements for EAL teacher registration when completed with the specialist EAL pathway.

The program includes 22 days of supervised teaching placement, a research-based capstone, and coursework in *Language Acquisition*, *Curriculum Design*, *Language Assessment*, *Education Research Methodology*, and *Multilingual Practices*. The *Foundations: Digital Futures* elective touches digital literacy. A 50-point research pathway is available.

Typical graduate roles include EAL/D classroom teacher, AMEP (Adult Migrant English Program) teacher, international school ESL teacher, language curriculum developer, and education administrator.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | EAL classroom teacher, AMEP instructor, tutorial support — lesson planning, delivery, assessment, student relationship management | **MEDIUM** — Physical classroom presence and relational teaching cannot be automated; AI tutoring supplements but does not replace human teachers in most contexts |
| Year 3–5 | Senior teacher, head of EAL department, curriculum coordinator — professional judgment and leadership | **LOW–MEDIUM** — Teaching leadership requires relational and contextual intelligence |
| Year 5+ | Curriculum designer, teacher educator, education advisor | **LOW** — Expert knowledge design and professional mentoring are human-intensive |

**Structural tailwind:** Australia has a documented teacher shortage across multiple subject areas including EAL. This structural demand provides employment protection that is independent of AI disruption. Government employment (schools) also provides institutional stability that the private sector cannot guarantee.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 1/3 | Language teaching faces AI disruption from real-time translation and AI tutoring systems. TESOL demand in some contexts may structurally change as AI language tools improve. |
| 2 | Systems Thinking and Problem Framing | 2/3 | Curriculum design, language acquisition theory, and education policy integration require systemic perspective on how language learning works across contexts. |
| 3 | Technical and Quantitative Depth | 1/3 | Pedagogy-focused, not quantitative. Linguistics and grammar technical but not statistical or computational depth. |
| 4 | Decision-Making Under Uncertainty | 2/3 | 22-day supervised placement requires real classroom decisions with genuine accountability. Capstone inquiry project involves defended methodological choices. |
| 5 | AI Literacy and Governance | 1/3 | Foundations: Digital Futures elective available. No AI-in-language-teaching content visible — a significant gap given AI tutoring and translation tools. |
| 6 | Domain Depth and Specialisation | 2/3 | 200pt. EAL specialisation pathway with VIT eligibility. Strong TESOL identity but broad foundation requirements dilute depth. |
| 7 | Research Methods Rigour | 2/3 | Research pathway available (50pt). Education Research Methodology taught. Capstone is research-based inquiry. |
| 8 | Human & Relational Capability | 3/3 | Classroom teaching, supervised placement (22 days), multilingual practices — fundamentally human-relational profession requiring presence, responsiveness, and interpersonal skill. |
| 9 | Curriculum Currency and Adaptability | 2/3 | Updated March 2026. Contemporary TESOL pedagogy. Digital Futures foundation shows some digital awareness but limited AI integration. |
| 10 | Outcome Evidence | 3/3 | Teaching salaries and employment conditions well-documented. Teacher shortage in Australia provides structural employment protection. |
| B | Irreplaceability (bonus) | 2/3 | Human teaching presence, relational pedagogy, and classroom management are not yet automatable. But AI language tutoring is improving rapidly. |
| **TOTAL** | | **21/36** | |

**Risk Band: MODERATE RISK**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
YES. The early-career output for Master of TESOL graduates is substantially templated — research, analysis, and document production are in AI's wheelhouse.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
UNCERTAIN. Partial capability exists. Studio, capstone, or professional placement elements push toward decision ownership, but the standard curriculum track does not guarantee it.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
UNCERTAIN. Depends significantly on individual specialisation choices, elective selection, and whether the industry adapts faster than AI tools disrupt it.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed TESOL graduate is the **Online English Language Tutor of 2021**: providing one-on-one English language coaching via video platform to international students — a role being aggressively automated by AI language tutoring systems (Duolingo Max, Elsa Speak, Khanmigo).

Specific threats:
- **Duolingo Max / ChatGPT language tutoring** — on-demand AI language practice available 24/7, compressing demand for paid tutoring
- **AI writing feedback tools (Grammarly, QuillBot, Hemingway AI)** — replacing some writing correction and feedback work
- **AI conversation practice systems (ELSA Speak, Speechify)** — pronunciation and fluency coaching
- **AI-generated lesson plans and materials** — reducing curriculum development time but also skill premium

---

## 6. VERDICT

**The Master of TESOL is MODERATE RISK — a degree with structural employment protection in Australia that faces uncertain AI disruption medium-term.**

The program's score (23/36) reflects the real tension between the teacher shortage that protects employment in the short term and the AI language technology trajectory that creates uncertainty over the 5-year horizon.

In the near term, TESOL graduates entering Australian school and adult education employment are well-protected: teacher shortages, VIT registration requirements, and the genuine irreplaceability of classroom human presence provide real insulation from AI disruption. AI language tutoring supplements but does not replace classroom teaching in most institutional contexts.

The medium-term uncertainty is real: as AI language tutoring improves, the structure of language learning may shift in ways that reduce demand for some forms of English teaching, particularly in adult education and online tutoring markets. The curriculum gap in AI literacy (D5: 1/3) is significant — a TESOL graduate who cannot evaluate and govern AI language tools in their classroom is missing a rapidly growing professional competency.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI language tool literacy deliberately — understand how AI tutoring systems work, their limitations, and how to use them as pedagogical complements rather than competitors | D5 | Low |
| 2 | Complete the supervised placement in a diverse school context — classroom experience in high-need EAL settings is the most defensible graduate credential | D4, D8 | High (built-in to program) |
| 3 | Target Australian school employment where VIT registration provides genuine protection — private tutoring and online markets are more AI-disrupted | D1 | Low |
| 4 | Build assessment design skills — valid language assessment is technically complex and difficult to automate well | D3, D7 | Medium |
| 5 | Develop specialisation in needs-specific populations (refugee and humanitarian entrants, Aboriginal and Torres Strait Islander students) where relational complexity is highest | D6, D8 | Medium |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready TESOL graduate is not an English content deliverer — they are a **language acquisition specialist who understands how humans learn language** and can design learning experiences that AI tools cannot.

They know language acquisition theory at the mechanism level — they understand what conditions support acquisition, why comprehensible input matters, how anxiety affects language production, and what the research says about corrective feedback. This knowledge is what separates a professional teacher from a tool that generates exercises.

They have done 22 days of supervised teaching and come away with a real classroom portfolio: not just lesson plans but evidence of student progress, feedback from mentors, and a reflective analysis of what worked and why. They know what it feels like to lose a class and recover it, and they know what it feels like to reach a student who wasn't reaching.

They use AI language tools as a complement to their teaching: they know which AI pronunciation tools are accurate for which language backgrounds, which AI writing tools produce appropriate feedback for which levels, and where AI tools mislead students. That AI-literacy layer, combined with their human-presence and relational capability, is what makes them a professional rather than an interface.

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


### 5. ANALOGUE GRADUATE PROFILE

The most exposed urban design graduate is the **Junior Urban Planner of 2022**: primarily producing planning reports, creating standard urban analysis visualisations, and preparing development assessment submissions — work increasingly aided by AI planning tools and parametric design platforms.

Specific threats:
- **Archistar / Urban Intelligence** — automated development feasibility analysis and planning constraint identification
- **AI master planning tools (Generative urban design platforms)** — rapid parametric urban form generation from brief constraints
- **AI traffic and pedestrian modelling** — replacing manual simulation work in urban impact assessment
- **AI planning report writers** — automated generation of standard planning report sections from site data

---

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


### 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready urban design graduate is not a planning report writer — they are a **place-maker who understands the social, spatial, and political dimensions of urban form**.

They have designed at the scale of a neighbourhood: they know what it means to create streets that feel safe, public spaces that are used, and density that is accepted by communities. They have taken a design through community consultation and come out the other side with a better design than they started with — not just a modified design, but a genuinely improved one that incorporated local knowledge the design team didn't have.

They understand what AI urban design tools optimise for — density, sunlight access, setback compliance — and what they miss: the social dynamics of informal space, the cultural dimensions of public realm, the political economy of housing affordability. They can run a parametric study in two hours and then spend two days explaining to a planning authority why the parametrically optimal solution is socially problematic.

They work at the intersection of design expertise, community accountability, and regulatory navigation. That intersection — requiring design judgment, political literacy, and genuine stakeholder trust — is the place where urban design's human value is most concentrated and most irreplaceable.

---

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
    markdown: `# DFVA REPORT: Master of Urban Horticulture

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** 2 years (200 credit points)

---

**Assessment Date:** 2026-06-09
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-urbhort
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

The Master of Urban Horticulture at the University of Melbourne is a specialist program combining plant science with urban planning and landscape design. It prepares graduates for professional practice in urban greening, parks management, landscape horticulture, and urban biodiversity.

The program covers plant physiology, soil science, landscape ecology, urban heat island management, climate-adaptive planting design, water-sensitive design, and community greening programs. Core skills include plant identification, site assessment, planting plan design, and project management for urban landscape programs.

Typical graduate roles include urban horticulturalist, parks and gardens manager, landscape designer, urban ecology consultant, green infrastructure specialist, and local government urban greening advisor. The field is growing due to urban heat island policy priorities, tree canopy targets, and urban biodiversity initiatives.

---

## 2. AUTOMATION EXPOSURE PROFILE

| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Horticulturalist, landscape technician, parks officer — plant assessment, planting plans, site inspections, maintenance planning | **MEDIUM–LOW** — Physical plant assessment, species identification in urban contexts, and site-specific conditions require human judgment that AI cannot yet replicate reliably |
| Year 3–5 | Senior horticulturalist, urban ecology consultant, landscape manager — project leadership, design authority, stakeholder management | **LOW** — Domain expertise, client relationships, and multi-system integration are strongly human |
| Year 5+ | Urban greening director, parks manager, urban ecology researcher | **LOW** — Strategic and scientific leadership with genuine community and government accountability |

**Physical expertise protection:** Urban horticulture requires physical presence for plant health assessment, soil analysis, and site-specific environmental reading. AI tools can support design and planning but cannot replace field expertise. Climate change is creating new plant health challenges (novel pests, heat stress, altered water availability) that require adaptive specialist judgment.

---

## 3. DFVA SCORECARD

| # | Dimension | Score | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2/3 | Hands-on horticultural work, plant identification, and landscape assessment require physical presence and specialist knowledge. Some design and planning tasks are AI-augmentable. |
| 2 | Systems Thinking and Problem Framing | 3/3 | Urban horticulture integrates ecology, urban planning, climate adaptation, water management, and social amenity. Systems perspective across environmental and built environment disciplines. |
| 3 | Technical and Quantitative Depth | 2/3 | Plant science, soil science, landscape ecology, and urban heat island analysis require technical depth. GIS and spatial analysis likely included. |
| 4 | Decision-Making Under Uncertainty | 2/3 | Site assessments, species selection for novel urban climates, and project management under environmental constraints require defended decision-making. |
| 5 | AI Literacy and Governance | 1/3 | Limited AI content visible. Some exposure to GIS and remote sensing tools likely. AI in urban greening not explicitly embedded. |
| 6 | Domain Depth and Specialisation | 3/3 | Specialist urban horticulture focus — rare expertise combining plant science with urban planning. Strong niche identity with clear professional pathway. |
| 7 | Research Methods Rigour | 2/3 | Master's-level research project or capstone likely. Plant science requires experimental methodology. |
| 8 | Human & Relational Capability | 2/3 | Community engagement, stakeholder consultation for urban greening projects, and professional communication with planners and clients. |
| 9 | Curriculum Currency and Adaptability | 3/3 | Urban heat islands, climate adaptation, and urban biodiversity are live policy priorities. Curriculum reflects contemporary urban sustainability challenges. |
| 10 | Outcome Evidence | 2/3 | Urban horticulture is a growth sector driven by urban greening policy. Employment data not prominently published. |
| B | Irreplaceability (bonus) | 2/3 | Physical plant expertise, site-specific assessment, and species selection for urban conditions are not easily replicable. Niche specialist knowledge creates genuine premium. |
| **TOTAL** | | **24/36** | |

**Risk Band: MODERATE RISK**

---

## 4. THREE THRESHOLD QUESTIONS

**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
NO. Core professional work in Master of Urban Horticulture requires physical presence, regulated judgment, or specialist domain knowledge that AI cannot yet replicate reliably.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
YES. The program's capstone, professional practice, and specialist curriculum provide genuine decision ownership and system design capability.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
YES. Structural demand for the specific skill set, professional accreditation protection, or AI-native curriculum positioning make 5-year employability stronger than today.

---

## 5. ANALOGUE GRADUATE PROFILE

The most exposed urban horticulture graduate is the **Parks Maintenance Officer of 2020**: primarily executing standard maintenance schedules, applying formulaic planting plans, and managing routine irrigation — work that is increasingly managed by sensor-driven automated systems and AI scheduling tools.

Specific threats:
- **Smart irrigation systems (Hydrawise, HydroPoint)** — automated soil moisture monitoring and irrigation scheduling
- **AI plant disease detection (Plantix, Plant.id)** — disease and pest diagnosis from smartphone photos
- **Automated design tools** — AI planting plan generators from site conditions and species databases
- **Drone survey and LIDAR assessment** — automated tree canopy and landscape assessment

---

## 6. VERDICT

**The Master of Urban Horticulture is MODERATE RISK — a specialist niche degree with genuine physical-layer automation protection and growing structural demand.**

The program's score (25/36) reflects a field where physical expertise, specialist plant knowledge, and site-specific environmental judgment are genuinely difficult to automate. Urban horticulture is one of the few applied disciplines where the human-physical layer remains critical and where AI tools function as enhancers rather than replacers.

The structural tailwind is real: urban heat island policy, urban tree canopy targets, urban biodiversity strategies, and climate-adaptive planting are all generating genuine professional work across Australian state and local governments. This is not declining market demand.

The key gap is AI literacy (D5: 1/3): urban horticulture practice is increasingly data-intensive, using remote sensing, LIDAR canopy assessment, and AI disease detection. A graduate who cannot situate these tools within a governance framework misses growing competency requirements.

---

## 7. RECOMMENDATIONS

| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop GIS and remote sensing competency — spatial analysis and urban canopy mapping are growth skills in urban horticulture | D3, D5 | Medium |
| 2 | Gain local government experience during the program — council urban greening programs are the largest employer of urban horticulturalists | D4, D8 | High |
| 3 | Build climate-adaptive planting expertise — species selection for novel urban climates is a specific growth area driven by heat island policy | D6, D9 | Medium |
| 4 | Develop community engagement skills — urban greening programs increasingly require community consultation and social benefit articulation | D8 | Low |
| 5 | Specialise in urban biodiversity or green infrastructure — these are policy-priority niches with genuine growth in professional roles | D6 | Medium |

---

## 8. THE REDESIGNED GRADUATE PROFILE

The 2027-ready urban horticulture graduate is not a plant maintenance officer — they are an **urban ecosystem specialist** who understands what a city needs from its green infrastructure and can design, implement, and evaluate it.

They know their local urban climate — the heat island gradient across the city, which species are performing under novel conditions, and what the soil health data from 50 urban parks tells them about the management interventions that work. They have used LIDAR canopy data to argue for a specific planting strategy in a council project and they can explain that argument to a city planner, a community group, and an ecologist simultaneously.

They understand what AI disease detection tools get wrong — the edge cases where visual symptoms don't match the actual pathogen, the timing issues where AI tools are trained on Northern Hemisphere data that doesn't map to Southern Hemisphere seasonal patterns. That field expertise, combined with digital tool literacy, is what makes them authoritative.

They are contributing to urban greening outcomes that are measurable: canopy cover increased, heat island mitigation achieved, biodiversity indicators improved. They can defend those outcomes with evidence. That accountability — physical expertise plus measurable impact — is the basis of a durable career.

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
  },
};

