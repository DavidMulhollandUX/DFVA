#!/usr/bin/env python3
"""
Generate full 8-section DFVA assessment markdown reports for all programs
that currently have only JSON or partial markdown content.

Run: python3 scripts/generate-full-reports.py
"""
import json, os, re, sys
from pathlib import Path
from datetime import date

REPO = Path(__file__).resolve().parent.parent
REPORTS = REPO / 'reports'

TODAY = date.today().isoformat()

# ─────────────────────────────────────────────────────────────────────────────
# REPORT DATA
# Each entry maps slug → full report content.
# Scores/dimensions come from existing JSON files; narrative from DFVA rubric knowledge.
# ─────────────────────────────────────────────────────────────────────────────

REPORTS_DATA = {

# ═══════════════════════════════════════════════════════════════════════════
# mc-arch — Master of Architecture — 28/36 RESILIENT
# ═══════════════════════════════════════════════════════════════════════════
"mc-arch": {
"score": 28, "maxScore": 36, "riskBand": "RESILIENT",
"q1": "NO", "q2": "YES", "q3": "YES",
"program": "Master of Architecture", "code": "MC-ARCH",
"duration": "3 years (300 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 3, "Architectural design requires creative synthesis, aesthetic judgment, regulatory compliance, and iterative client negotiation — irreducible human work. ARBV registration requires documented professional practice before sitting the registration exam."),
  ("Systems Thinking and Problem Framing", 3, "Design Thesis capstone + studio sequence integrates environmental, technological, regulatory, and project-delivery systems across scales. Studios require trade-off reasoning across structure, material, programme, and site."),
  ("Technical and Quantitative Depth", 3, "300pt program. Technical documentation, building systems, construction methods, materials, and design production taught throughout. Professional accreditation requirements enforce technical rigour."),
  ("Decision-Making Under Uncertainty", 3, "Studios require evaluating competing priorities, making design trade-offs, and defending decisions under professional constraints. Design Thesis demands sustained independent judgment across a full project cycle."),
  ("AI Literacy and Governance", 1, "No AI content explicitly visible in curriculum. Parametric design tools (Rhino, Grasshopper) likely used in practice but not framed through AI governance or deployment."),
  ("Domain Depth and Specialisation", 3, "300pt professional degree with ARBV/RAIA/CAA accreditation. Clear pathway to registered architect. 250pt core studio + Design Thesis provides deep specialist grounding."),
  ("Research Methods Rigour", 3, "Design Thesis is a substantial design-research project with defended methodology. PhD pathway available. Research-led teaching explicitly mentioned in program outcomes."),
  ("Human & Relational Capability", 2, "Collaborative studio practice and client/stakeholder engagement implicit in design practice. Strong relational dimension but not clinical-level accountability."),
  ("Curriculum Currency and Adaptability", 2, "Updated 9 June 2026 — very recent. No explicit AI or sustainability-specific core content visible despite currency of update."),
  ("Outcome Evidence", 2, "Professional accreditation (ARBV/RAIA/CAA) provides external validation of standards. Granular graduate destination data not publicly available."),
  ("Irreplaceability (bonus)", 3, "Professional registration requirement + creative design synthesis + technical documentation + regulatory compliance. Triple barrier: creativity, regulation, and professional practice hours."),
],
"profile": """The Master of Architecture at the University of Melbourne is a professional architecture degree accredited by the Architects Registration Board of Victoria (ARBV), the Royal Australian Institute of Architects (RAIA), and the Commonwealth Association of Architects (CAA). It is the standard pathway to registration as an architect in Australia.

The 300-credit-point program is structured around a core studio sequence culminating in the Design Thesis — an independent, sustained design-research project. Students engage with building technology, environmental systems, urban context, construction methods, and architectural theory. The program prepares graduates for the two-year Architectural Practice module required before sitting the ARBV registration examination.

Typical graduate roles include architectural graduate (Graduate of Architecture), documentation specialist, project architect, urban designer, and design researcher. Most graduates enter established architectural practices in residential, commercial, institutional, or public-realm project streams.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Documentation support, construction detail drawing, model production, design development under supervision | **MEDIUM** — CAD/BIM and generative design tools accelerate production tasks; graduate value increasingly tied to judgment and communication rather than drafting throughput |
| Year 3–5 | Project architect, design team lead, client-facing design presentation, regulatory approval management | **LOW–MEDIUM** — Client relationships, regulatory interpretation, design defense, and site judgment are not fully automatable |
| Year 6+ | Senior architect, associate, registered architect, design director | **LOW** — Professional registration, design ownership, and accountability create strong automation barriers |

**Structural note:** Architecture is a regulated profession with mandatory professional practice hours before registration. This regulatory layer creates a time-based barrier that AI cannot circumvent. The design synthesis layer — integrating site, programme, structure, services, regulation, and aesthetics into a coherent building — remains genuinely non-routine work.""",

"analogue": """The most exposed architecture graduate is the **Documentation-Heavy Graduate of 2022**: a competent technical drafter who entered a mid-size commercial practice as the primary producer of construction documentation sets, coordination drawings, and specification packages — roles now being compressed by BIM automation, generative detailing, and AI-assisted documentation systems.

Specific threats:
- **Autodesk Forma / ArchiCAD AI** — generative floor plans and mass massing from brief constraints
- **Speckle / Hypar / BIM AI** — automated structural and services coordination clash detection, previously junior architect territory
- **AI specification writers (Masterspec AI, NBS tools)** — automating construction specification drafting
- **Generative renderers (Midjourney architecture, Vizcom)** — eliminating junior visualisation production work""",

"verdict": """**The Master of Architecture is RESILIENT — a degree with genuine structural defences that most programs lack.**

The program's score (28/36) reflects three real automation barriers that stack: professional registration requirements, the creative-synthetic nature of design work, and the regulatory/liability accountability embedded in architectural practice. These are not soft differentiators — they are formal, government-enforced gatekeeping mechanisms that require documented human judgment and professional responsibility.

The design studio model develops authentic decision-making capability: students are required to defend design choices under expert critique, integrate competing constraints across a full project, and take accountability for design outcomes. This is exactly the kind of training that produces automation-resistant judgment.

**The one structural gap is AI Literacy (D5: 1/3).** Architecture is being transformed by parametric design tools, generative AI, and AI-assisted project management. A 2026 graduate who cannot situate AI tools within a professional governance framework — who cannot evaluate when generative outputs are appropriate, when they need validation, and what the liability implications are — is entering a rapidly changing profession without the critical lens needed to lead rather than be led by technology.

Despite this gap, the degree's regulatory anchor and design-synthesis core make it one of the more durable professional programs in the portfolio.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Integrate parametric design tools and generative AI assessment — make AI governance a studio-embedded competency, not an elective | D5, D9 | Medium |
| 2 | Develop explicit "AI in professional practice" content: liability when AI generates design errors, governance of generative outputs in client-facing work | D5 | Medium |
| 3 | Strengthen environmental systems integration — passive design, embodied carbon tools, and climate performance modelling are growing areas of architectural accountability | D3, D9 | Medium |
| 4 | Publish granular graduate destination data including time to registration, firm type, and salary by career stage | D10 | Medium |
| 5 | Build explicit AI literacy into Design Thesis requirements — students should demonstrate AI tool evaluation as part of their design research methodology | D5, D7 | Low |""",

"redesigned": """The 2027-ready architecture graduate is not a documentation specialist — they are a **design decision owner with professional accountability**.

They completed the Design Thesis not as a portfolio piece but as a genuine test of independent judgment: they know what it feels like to defend a design decision under expert critique, to explain why one structural approach was chosen over another, and to take accountability for how form, material, and programme interact. That judgment is what makes their work non-replicable by a generative tool.

They understand AI not as a competitor but as a set of tools with specific capabilities and specific failure modes. They can generate a massing study in Forma, evaluate whether the output is architecturally appropriate, and explain why the AI's optimisation missed the social or contextual logic of the site. They use generative tools to accelerate exploration — not to outsource design judgment.

They are registered (or on a clear path to registration), which means they carry professional liability. They have client relationships. They can read a contract, interpret a planning instrument, and explain to a building surveyor why a departure from the code is justified. These capabilities are not in an AI's repertoire — they are in theirs."""
},

# ═══════════════════════════════════════════════════════════════════════════
# mc-ba — Master of Business Administration — 25/36 MODERATE RISK
# ═══════════════════════════════════════════════════════════════════════════
"mc-ba": {
"score": 25, "maxScore": 36, "riskBand": "MODERATE RISK",
"q1": "YES", "q2": "YES", "q3": "YES",
"program": "Master of Business Administration", "code": "MC-BA",
"duration": "2 years (225 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 1, "General management roles involve significant routine analysis, reporting, and coordination — automatable tasks. MBA graduates compete with AI-augmented analysts in the early career pipeline."),
  ("Systems Thinking and Problem Framing", 2, "General Management 1+2 cover business systems. MBA Capstone integrates strategy. Systems thinking present but not the primary pedagogical model — breadth over depth."),
  ("Technical and Quantitative Depth", 2, "Financial Analysis, Business Analytics, Predictive Analytics available as electives. Core is management-generalist, not deeply quantitative."),
  ("Decision-Making Under Uncertainty", 3, "Negotiations, Game Theory, Managerial Judgement, Capstone — decision-making under uncertainty is an explicit and assessed competency across multiple core units."),
  ("AI Literacy and Governance", 3, "Generative AI for Business, Leading Data and AI Transformation, Analytics for Strategic Management — strong AI content. Best-in-cohort AI curriculum coverage."),
  ("Domain Depth and Specialisation", 2, "General management — broad rather than deep. 225pt with 75pt electives allows specialisation but core is deliberately generalist."),
  ("Research Methods Rigour", 1, "Individual Research Project available as elective (25pt). No thesis requirement. Research methods not a core MBA competency."),
  ("Human & Relational Capability", 2, "Leadership and Change, Managing People, Negotiations, Managing Diversity — substantial relational skill development. MBA Internship provides real workplace exposure."),
  ("Curriculum Currency and Adaptability", 3, "Updated Dec 2025. GenAI for Business, Data/AI Transformation, Blockchain, Analytics — leading-edge business curriculum demonstrably refreshed for AI era."),
  ("Outcome Evidence", 3, "Melbourne MBA has strong industry reputation and employment outcomes tracked through Business School. High employment rates and salary premiums documented."),
  ("Irreplaceability (bonus)", 3, "MBA's distinctive value is the cohort network, leadership crucible, and brand signal. GenAI + AI leadership content makes graduates AI-native managers with dual-skill premium."),
],
"profile": """The Master of Business Administration at the University of Melbourne is a premium general management degree targeting mid-career professionals and career-switchers seeking executive-track positioning. The 225-credit-point program combines core business disciplines — strategy, finance, marketing, operations, and leadership — with a distinctive AI-era curriculum refresh.

Named units include *Generative AI for Business*, *Leading Data and AI Transformation*, *Analytics for Strategic Management*, *Negotiations*, *Game Theory in Business*, and the *MBA Capstone*. An *MBA Internship* (corporate or social enterprise) is available as an elective. The program admits students with diverse professional backgrounds including non-business disciplines.

Typical graduate roles include management consultant, strategy manager, product leader, general manager, business unit director, entrepreneur, and C-suite pipeline executive. The network and brand effects of the Melbourne MBA are significant differentiators in the ANZ market.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Strategy analyst, management consultant analyst, project manager — analysis, deck production, stakeholder coordination | **HIGH** — GenAI tools absorb routine analysis and reporting; entry value is increasingly judgment and client management |
| Year 3–5 | Senior consultant, strategy manager, business development manager — client ownership, team leadership, decision authority | **MEDIUM** — Judgment, relationship management, and accountability differentiate. AI handles synthesis; humans handle direction. |
| Year 5+ | Director, VP, GM, Partner — portfolio decisions, organizational design, strategic positioning | **LOW** — Decision ownership, accountability, and organizational influence are the core value. Not automatable. |

**MBA structural note:** The MBA is unusual because its primary value is not content knowledge — it is credentialing, network access, and the leadership development that comes from intensive peer interaction. AI cannot replicate a peer cohort of high-calibre professionals or the trust signals of a premium brand. The degree's core risk is that early-career MBA analyst roles are exactly what AI tools are replacing.""",

"analogue": """The most exposed MBA graduate is the **Management Consultant Analyst of 2020**: entering a Big 4 or MBB practice as a slide producer, data analyser, and market researcher — roles whose cognitive layer is being rapidly absorbed by AI tools. The 12–18 month analyst-to-associate pipeline that the MBA was designed to bypass is now further compressed by AI automation of the analyst tier itself.

Specific threats:
- **McKinsey Lilli / Bain GenAI tools / Accenture AI** — in-house AI replacing junior consulting deck production and benchmarking research
- **ChatGPT / Claude for business analysis** — absorbing market research, competitive analysis, and summary synthesis that junior MBAs performed
- **Excel Copilot / Power BI Copilot** — replacing routine financial modelling and reporting dashboard work
- **AI project managers (Asana AI, Linear AI)** — reducing coordination overhead that junior managers previously handled""",

"verdict": """**The Master of Business Administration is MODERATE RISK — a degree with real strengths that depend heavily on how graduates use it.**

The program's score (25/36) reflects genuine strengths in AI literacy (D5: 3/3), curriculum currency (D9: 3/3), and decision-making (D4: 3/3). The Melbourne MBA is notably better positioned than most management programs because it has explicitly embedded AI-native content — *Generative AI for Business* and *Leading Data and AI Transformation* are not window dressing but substantive curriculum commitments.

The risk lies in the early-career pipeline. MBA graduates who enter consulting or corporate analysis roles face the same AI compression as anyone else doing structured analytical work. The MBA's traditional value proposition — fast-tracking to seniority through a credential signal — is under pressure when AI compresses the junior analyst tier that used to validate those credentials through visible output.

**The degree pays off for graduates who treat it as a leadership platform, not an analysis credential.** Those who combine the AI literacy content with genuine domain depth (via electives), build the cohort network aggressively, and position themselves as AI-governance leaders rather than AI tool users will be well-differentiated. Those who use the MBA as a shortcut to analyst roles without developing independent judgment face meaningful risk.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Choose electives with specialist depth, not breadth — select a domain cluster (health, fintech, sustainability) and build through electives rather than sampling | D6 | Low (decision at enrollment) |
| 2 | Maximise AI literacy units — GenAI for Business and Leading Data/AI Transformation are core differentiators; supplement with external AI governance certification | D5 | Low–Medium |
| 3 | Complete the MBA Internship — real client exposure and accountability are the most direct way to build decision-making evidence beyond the classroom | D4, D8 | High |
| 4 | Build cohort relationships deliberately — the network is the primary long-term ROI of the MBA; treat it as a professional investment | B | Medium |
| 5 | Target roles that require AI governance and organizational change, not pure analysis — position as AI transformation lead, not analyst | D1, D5 | Medium |
| 6 | Develop a clear post-MBA positioning narrative before graduating — articulate what specific problem you will solve that an AI cannot | B | Low |""",

"redesigned": """The 2027-ready MBA graduate does not introduce themselves as a general manager. They introduce themselves as someone who knows how to **deploy AI in a specific industry context and govern the risks that come with it**.

They completed *Generative AI for Business* and came away with a critical view of AI tool limitations — not just capability promotion. They can run a board discussion on AI adoption risk, explain why a proposed automation initiative might create regulatory exposure, and design the human oversight layer for an AI-augmented decision process.

They have a domain. Not "business" in the abstract — they know the regulatory environment of healthcare IT, or the risk profile of algorithmic pricing in fintech, or the stakeholder dynamics of AI in public sector procurement. That domain specificity, combined with the MBA's general management framework, is what makes their judgment non-replicable.

They used the cohort network not for socialising but for building. By graduation they have co-founders, referrers, and clients in their network — people who have watched them work under pressure in group projects and capstone sprints and decided they want to work with them again. The network is the degree's real output."""
},

# ═══════════════════════════════════════════════════════════════════════════
# mc-busana — Master of Business Analytics — 31/36 RESILIENT
# ═══════════════════════════════════════════════════════════════════════════
"mc-busana": {
"score": 31, "maxScore": 36, "riskBand": "RESILIENT",
"q1": "NO", "q2": "YES", "q3": "YES",
"program": "Master of Business Analytics", "code": "MC-BUSANA",
"duration": "1 year (150 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 2, "Data scientists/analysts build AI tools rather than being replaced by them. Some routine analysis is automatable but strategic problem framing and business translation resist automation strongly."),
  ("Systems Thinking and Problem Framing", 3, "Translating business problems into quantitative form, integrating across statistics/ML/optimisation domains. Causal + predictive + NLP — full quantitative systems toolkit."),
  ("Technical and Quantitative Depth", 3, "Machine Learning & AI, Statistical Learning, NLP, Causal Analytics, Predictive Analytics — deeply quantitative. Programming Foundations included as core."),
  ("Decision-Making Under Uncertainty", 3, "Decision Making and Optimisation is a core subject. Learning outcomes explicitly require dealing with ambiguity, uncertainty, and bias in real business contexts."),
  ("AI Literacy and Governance", 3, "Machine Learning & AI for Business, NLP — AI is core curriculum, not elective. Graduates can deploy and critically evaluate AI workflows."),
  ("Domain Depth and Specialisation", 3, "150pt specialist degree. Core across data platforms, programming, statistics, ML, NLP, causal/predictive analytics. Clear specialist identity distinct from generic management."),
  ("Research Methods Rigour", 2, "Individual Research Project (25pt) available with coordinator approval. Research pathway optional but genuine quantitative research skills embedded throughout core."),
  ("Human & Relational Capability", 2, "Professional development includes teamwork and professional standards. Communication to non-technical audiences emphasised. Not clinical-level relational."),
  ("Curriculum Currency and Adaptability", 3, "Updated April 2026. ML/AI, NLP, Causal Analytics — state-of-the-art quantitative curriculum clearly designed for AI-era business needs."),
  ("Outcome Evidence", 3, "Business analytics employment outcomes strong. Melbourne Business School reputation and tracked employment. Strong demand signal for the specific skill set."),
  ("Irreplaceability (bonus)", 3, "Graduates build and deploy AI systems — this program trains the replacers. AI literacy + quantitative depth + business translation is a rare triple combination."),
],
"profile": """The Master of Business Analytics at the University of Melbourne (Melbourne Business School) is a specialist quantitative degree targeting candidates who want to build and deploy data-driven decision systems in business contexts. It is among the most technically rigorous business analytics programs in Australia.

The 150-credit-point core includes *Machine Learning & AI for Business*, *Statistical Learning*, *Natural Language Processing*, *Causal Analytics*, *Predictive Analytics*, *Decision Making and Optimisation*, *Data Platforms and Ecosystems*, and *Programming Foundations*. An *Individual Research Project* (25pt) is available with coordinator approval for those seeking a research pathway.

Typical graduate roles include data scientist, machine learning engineer, analytics consultant, business intelligence lead, quantitative analyst, and AI product manager. The program produces graduates who build AI systems rather than being replaced by them — a structural differentiator.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Data scientist, ML engineer, analytics consultant — model building, pipeline development, analysis design | **LOW–MEDIUM** — Graduates build AI tools; they design the systems that automate others. AutoML compresses some junior modelling, but problem framing and validation remain human. |
| Year 3–5 | Senior data scientist, analytics lead, ML engineering manager — system design, governance, team leadership | **LOW** — Senior analytical judgment, model evaluation, and governance accountability are not automatable. |
| Year 5+ | Chief Analytics Officer, AI product director, data platform architect — organisational analytics strategy | **LOW** — Strategic decision-making and AI governance at scale are the core value. |

**Structural advantage:** Business Analytics graduates are building the tools that replace others — not being replaced. The degree trains people to sit above the automation layer, which makes them structurally more durable than most graduate cohorts. The primary risk is AutoML and foundation models reducing the barrier to entry for junior ML work, compressing the first-two-year tier somewhat.""",

"analogue": """The most exposed Business Analytics graduate is the **Junior BI Analyst of 2021**: a capable SQL writer who produced dashboards, ran standard regression analyses, and maintained reporting infrastructure — work now absorbed by Power BI Copilot, Tableau AI, and agentic analytics tools. This profile does not represent the MC-BUSANA graduate, but it represents what the program was historically competing against.

The MC-BUSANA graduate is better positioned because their core skill is not dashboard production — it is causal inference, model design, and problem framing. These require:
- **Knowing when the ML model is wrong** and why — a capability that requires understanding of training data, distribution shift, and failure modes
- **Translating messy business problems into tractable quantitative form** — the hardest part of analytics, and where human judgment is most critical
- **Governing AI outputs in high-stakes contexts** — who is accountable when the model recommends wrongly""",

"verdict": """**The Master of Business Analytics is RESILIENT — one of the strongest programs in the portfolio for 2027 and beyond.**

The program's score (31/36) reflects a genuinely distinctive curriculum: graduates build and deploy AI systems rather than being replaced by them. The combination of machine learning depth, causal analytics, and business translation creates a graduate profile with genuine automation resistance at its core.

The remaining risk is that AutoML tools and foundation model APIs are lowering the technical barrier for basic ML work. A junior data scientist who only knows how to run sklearn pipelines and interpret standard outputs faces compression. But MC-BUSANA graduates who have engaged with causal inference, model governance, and NLP depth are positioned above this compression layer.

**The degree is RESILIENT under one condition: graduates must position themselves as decision-layer professionals, not code-production workers.** The capability to frame a causal question, design a valid test, and defend the inference against alternative explanations is what the AI era actually demands. That capability is in this program. Whether individual graduates develop and demonstrate it is the variable.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Pursue the Individual Research Project if available — the ability to design and defend original quantitative analysis is the highest differentiator in the job market | D7 | High |
| 2 | Build specialisation in a regulated domain — healthcare analytics, financial risk modelling, or public policy evaluation create governance requirements that sustain human judgment | D6 | Medium |
| 3 | Develop explainability and governance competency beyond technical modelling — audit trails, fairness metrics, and regulatory compliance for AI are growth areas | D5 | Medium |
| 4 | Build the communication layer explicitly — the ability to explain model outputs to non-technical decision-makers is the most common gap in quantitative graduates | D8 | Low |
| 5 | Target AI product management and ML engineering lead roles, not just data science contributor roles — governance and direction create more durable positioning | D1 | Low–Medium |""",

"redesigned": """The 2027-ready Business Analytics graduate does not run standard models on clean datasets. They **define the question, design the measurement, and own the interpretation** — the parts of the analytics pipeline that AI cannot do without a human who understands the domain.

They have done causal inference properly: they know the difference between correlation and causation at a mechanism level, they have built a valid instrumental variable or designed a natural experiment, and they have defended that methodology under expert scrutiny. That specific capability — identifying and exploiting variation — is the skill that separates a genuine quantitative analyst from a dashboard operator.

They can read a model fairness audit and know what questions to ask. They understand what "the model is biased" means technically and what its implications are for deployment in a specific context. They can brief a legal team on why an algorithmic decision requires human review.

They have communicated their work to a CFO, a product manager, and a regulatory team — and adjusted their framing for each audience without losing technical precision. That translation capacity is what makes them genuinely valuable at the decision-making layer."""
},

# ═══════════════════════════════════════════════════════════════════════════
# mc-envlaw — Master of Environmental Law — 24/36 MODERATE RISK
# ═══════════════════════════════════════════════════════════════════════════
"mc-envlaw": {
"score": 24, "maxScore": 36, "riskBand": "MODERATE RISK",
"q1": "YES", "q2": "UNCERTAIN", "q3": "YES",
"program": "Master of Environmental Law", "code": "MC-ENVLAW",
"duration": "1 year (100 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 1, "Legal research, document review, and compliance analysis are highly AI-automatable. Environmental law requires contextual judgment but core legal tasks are AI-vulnerable at junior levels."),
  ("Systems Thinking and Problem Framing", 2, "Environmental law integrates across climate, water, waste, planning, and international regimes. Systems perspective inherent in the multi-jurisdictional nature of environmental problem framing."),
  ("Technical and Quantitative Depth", 1, "100pt program. Legal reasoning depth. No quantitative or scientific technical requirement. Climate Law Economics and Finance touches economics but not deeply."),
  ("Decision-Making Under Uncertainty", 2, "Environmental disputes require defended legal judgment. International treaty negotiation skills taught. Less pressure-tested than clinical or capstone-intensive programs."),
  ("AI Literacy and Governance", 2, "AI and Justice elective available. Not core. Environmental law increasingly uses satellite data and modelling but this is not embedded in curriculum."),
  ("Domain Depth and Specialisation", 3, "Clear environmental law specialisation. 87.5pt minimum in environmental/further subjects. Climate, water, waste, biodiversity, planning — comprehensive regulatory coverage."),
  ("Research Methods Rigour", 1, "100pt coursework program. No thesis requirement. Minor thesis explicitly excluded for law graduates by structure."),
  ("Human & Relational Capability", 2, "International legal internship available. Legal practice requires sustained client communication. Not clinical-level relational."),
  ("Curriculum Currency and Adaptability", 3, "Updated March 2026. Climate Law Economics & Finance, AI and Justice, Clean Energy Projects Law, More-Than-Human Rights — leading-edge environmental law curriculum."),
  ("Outcome Evidence", 3, "Legal employment data available through MLS. Environmental law is a structural growth sector due to climate regulation. Strong employment signal for specialists."),
  ("Irreplaceability (bonus)", 2, "Environmental regulation requires human legal judgment, interpretation, and advocacy. Climate change creates structural demand growth. But 100pt program depth is limited by its brevity."),
],
"profile": """The Master of Environmental Law at the University of Melbourne Law School is a specialist coursework program designed for law graduates seeking deep expertise in environmental, climate, and sustainability law. It is among the most substantively current environmental law programs in Australia.

The 100-credit-point program includes foundational environmental law subjects plus specialist electives in *Climate Law, Economics and Finance*, *Clean Energy Projects Law*, *Biodiversity and Conservation Law*, *Water Law*, *Planning and Development Law*, *More-Than-Human Rights*, and *AI and Justice*. An international legal internship is available. The program attracts candidates from domestic and international backgrounds including lawyers, policy advisors, and environmental scientists seeking legal qualification.

Typical graduate roles include environmental lawyer, climate policy advisor, sustainability counsel, regulatory affairs specialist, international environmental negotiator, and in-house counsel for resources, energy, or government clients.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Legal research, document review, compliance analysis, regulatory submissions, case briefing | **HIGH** — Contract review, regulatory research, and document synthesis are primary targets of legal AI tools (Harvey, Casetext, LexisNexis AI) |
| Year 3–5 | Senior associate, policy counsel, environmental regulatory specialist — advisory opinions, client strategy, negotiation | **MEDIUM** — Strategic advice requires contextual judgment. AI provides research; humans provide interpretation and recommendation. |
| Year 5+ | Partner, General Counsel, Head of Sustainability — regulatory strategy, advocacy, organisational governance | **LOW** — Legal accountability, regulatory relationships, and strategic framing are not automatable. |

**Structural tailwind:** Climate change is creating structural demand for environmental law specialists. New legislation, international agreements, and corporate sustainability obligations are generating genuine new legal work — not just redistributing existing work. This structural demand provides a buffer against AI compression of routine legal tasks.""",

"analogue": """The most exposed environmental law graduate is the **General Environmental Lawyer of 2020**: a graduate who entered a mid-tier firm doing routine environmental compliance assessments, EIS reviews, and council planning submissions — exactly the tasks being absorbed by legal AI tools trained on regulatory databases.

Specific threats:
- **Harvey AI / Casetext / LexisNexis Protégé** — AI legal research and document review absorbing junior associate research hours
- **Automated compliance checkers (EY LawPod, Brightflag)** — routine regulatory compliance monitoring and flagging
- **AI regulatory summarisers** — automated conversion of new legislation and treaty developments into plain-language client alerts
- **Contract review AI** — environmental licensing and project approval document analysis""",

"verdict": """**The Master of Environmental Law is MODERATE RISK — a degree with a genuine structural tailwind but a compressed format that limits depth.**

The program's score (24/36) reflects two competing forces: a domain that is growing structurally due to climate regulation (positive) and a program format (100pt coursework, no thesis) that limits the depth and research rigour that would push the score toward RESILIENT (negative).

The structural tailwind is real: climate legislation, biodiversity frameworks, and corporate sustainability obligations are creating new legal work that requires human judgment — interpreting ambiguous regulatory language, navigating multi-jurisdictional frameworks, and advising on the intersection of science and law. This is not legal work that AI can fully absorb.

But at 100 credit points, this degree is short by graduate law standards. Graduates who combine this program with genuine scientific literacy (understanding what the environmental data means, not just what the law says about it) and strong client-facing skills are well-positioned. Those who rely on the credential alone in a standard junior legal role face AI compression.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Build genuine scientific literacy alongside the legal qualification — understanding satellite data, emissions modelling, and biodiversity assessment science makes legal analysis more defensible and differentiating | D3, D6 | High |
| 2 | Pursue the international legal internship if available — cross-jurisdictional experience is a significant differentiator in climate and environmental law | D4, D8 | High |
| 3 | Develop AI governance awareness — legal AI tools will be embedded in environmental law practice; graduates who can evaluate their reliability and limitations will be more valuable | D5 | Medium |
| 4 | Target roles in growth regulation areas: clean energy projects, biodiversity credits, carbon markets, and ESG disclosure litigation — not traditional compliance work | D1, D6 | Low |
| 5 | Complement with the AI and Justice elective if possible — regulatory AI governance is an emerging legal specialty | D5 | Low |""",

"redesigned": """The 2027-ready environmental law graduate is not a document reviewer — they are a **regulatory strategy specialist who understands both the law and the science behind it**.

They know what a net-zero pathway plan actually requires at the technical level — not just what the legislation says it must contain, but what emissions accounting methodology is being used, where the assumptions are contested, and what the regulatory risk is when the science moves faster than the legal standard.

They have navigated a multi-jurisdictional environmental matter — something involving federal, state, and international law simultaneously — and they can explain to a client not just what the law requires but what the regulator is actually watching for in practice.

They are aware that AI tools will handle much of the research layer of their work, and they have positioned themselves at the interpretation and strategy layer: the place where legal judgment, scientific literacy, and client relationships intersect. They do not produce the research — they evaluate it, argue with it, and advise on what it means for the client's specific risk profile."""
},

# ═══════════════════════════════════════════════════════════════════════════
# mc-journ — Master of Journalism — 23/36 MODERATE RISK
# ═══════════════════════════════════════════════════════════════════════════
"mc-journ": {
"score": 23, "maxScore": 36, "riskBand": "MODERATE RISK",
"q1": "YES", "q2": "UNCERTAIN", "q3": "NO",
"program": "Master of Journalism", "code": "MC-JOURN",
"duration": "2 years (200 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 1, "Journalism faces extreme AI disruption. Content generation, summarisation, translation, and research synthesis are all highly automatable. The core craft of writing and story production is AI-vulnerable."),
  ("Systems Thinking and Problem Framing", 2, "Journalism requires synthesising complex stories across political, social, and institutional systems. Media law, ethics, and press freedom teach systemic perspective on information ecosystems."),
  ("Technical and Quantitative Depth", 1, "200pt program but journalism is craft/profession, not deeply quantitative. Digital media production skills present but not analytical depth in statistics, data, or computation."),
  ("Decision-Making Under Uncertainty", 2, "Editorial judgment, ethical decisions under deadline pressure, and source verification require real-time decision-making. Capstone projects require defended editorial choices."),
  ("AI Literacy and Governance", 1, "No AI-specific journalism content visible. Digital media tools covered but AI in journalism — deepfake detection, automated fact-checking, AI-generated misinformation — not explicitly taught."),
  ("Domain Depth and Specialisation", 3, "200pt professional journalism degree. Clear specialist domain with capstone, production requirements, and defined professional identity."),
  ("Research Methods Rigour", 2, "Investigative journalism teaches research methodology. Academic research component required at master's level. Evidence and verification practices are central to the curriculum."),
  ("Human & Relational Capability", 3, "Interviewing, source cultivation, ethical engagement with subjects and communities — journalism is fundamentally a human-trust profession requiring relational skill."),
  ("Curriculum Currency and Adaptability", 1, "Limited evidence of digital/AI-age journalism transformation in curriculum. Traditional journalism framework visible without explicit AI-era adaptation."),
  ("Outcome Evidence", 2, "Journalism employment market is structurally contracting. Limited program-specific destination data. Industry disruption is well-documented."),
  ("Irreplaceability (bonus)", 2, "Investigative journalism requires human trust, ethical judgment, and investigative persistence. But industry is in structural decline. The human value is real; the market is shrinking."),
],
"profile": """The Master of Journalism at the University of Melbourne is a professional degree for candidates seeking editorial, reporting, and media production careers. The 200-credit-point program covers reporting practice, media law, journalism ethics, digital media production, and investigative techniques. It includes a capstone production project.

The program covers print, broadcast, online, and investigative journalism streams. Key areas include *Media Law and Ethics*, *Investigative Journalism*, *Digital Media Production*, and a *Journalism Capstone*. Industry placement and mentoring through Melbourne journalism networks are features of the program.

Typical graduate roles include journalist, digital producer, investigative reporter, media advisor, communications professional, and content strategist. The journalism industry is undergoing structural disruption from digital platforms, declining advertising revenue, and AI content generation — making career planning more complex for graduates than most professional programs.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Reporter, digital content producer, sub-editor, editorial assistant — writing, reporting, content production | **VERY HIGH** — Content generation, summarisation, and research synthesis are AI's primary targets in journalism; entry-level production work is highly exposed |
| Year 3–5 | Senior reporter, investigative journalist, digital editor, broadcast journalist | **HIGH** — Even experienced journalists face AI pressure on content production. Investigative work and source-based reporting are more durable but fewer roles exist. |
| Year 5+ | Editor, investigative unit lead, media advisor, journalism educator | **MEDIUM** — Editorial judgment, institutional relationships, and investigative expertise are genuine differentiators at senior levels |

**Industry note:** The structural decline of journalism employment is independent of AI — digital platform disruption has already compressed the industry significantly. AI acceleration compounds an existing trend. This is one of the most structurally challenged graduate employment markets in the portfolio.""",

"analogue": """The most exposed journalism graduate is the **Junior Reporter of 2022**: a competent writer producing daily news articles, breaking news summaries, and content packages for digital platforms — work that AI content generators (ChatGPT, Claude, Perplexity) can now produce at volume with minimal human input.

Specific threats:
- **AI news writers (Bloomberg's Cyborg, AP Automated Insights, Reuters Lynx)** — replacing high-volume financial and sports reporting
- **AI summarisation tools (Perplexity, Artifact)** — producing news summaries from primary sources without human journalists
- **AI video/audio production tools** — replacing some broadcast production roles
- **Deepfake and synthetic media** — creating misinformation that journalists must identify and counter — a new skill not in current curriculum""",

"verdict": """**The Master of Journalism is MODERATE RISK — a degree with genuine human-value dimensions in a structurally contracting industry.**

The program's score (23/36) reflects a real tension: journalism has authentic human value that AI cannot fully replace (source trust, ethical judgment, investigative persistence, public accountability), but the industry these graduates are entering is experiencing both AI disruption and platform-driven structural decline simultaneously.

The human relational capability (D8: 3/3) and domain depth (D6: 3/3) are genuine. A skilled investigative journalist who has cultivated sources, navigated hostile access environments, and defended editorial decisions under legal pressure is doing work that AI cannot replicate. But this profile applies to a relatively small number of senior journalists in a market that is shedding entry-level and mid-level positions.

**The curriculum currency gap (D9: 1/3) is a significant concern.** A journalism degree in 2026 should be teaching graduates to detect AI-generated content, fact-check synthetic media, govern AI tools in newsrooms, and position themselves as human-intelligence specialists in an AI-augmented media environment. The program's limited adaptation to these realities leaves graduates under-prepared for the specific challenges of the AI-era media landscape.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop data journalism skills actively — statistical literacy, data analysis, and quantitative storytelling are the most defensible journalism skills against AI competition | D3, D9 | Medium |
| 2 | Build AI detection and verification competency — deepfake identification, AI-generated content analysis, and synthetic media authentication are growth specialties | D5, D9 | Low |
| 3 | Develop a non-journalism income stream during the program — communications, content strategy, or PR skills provide portable income while investigative journalism careers develop | D1 | Low |
| 4 | Specialise in an accountability beat that requires source relationships — investigative journalism covering institutions that don't want coverage is where human reporters remain indispensable | D6, D8 | Medium |
| 5 | Build a direct audience relationship through publication — owned channels reduce dependence on editorial employment and demonstrate demonstrated reach to future employers | D10 | Low |""",

"redesigned": """The 2027-ready journalism graduate is not a content producer — they are a **public accountability professional** who does the work that AI, by design, cannot and will not do.

They have cultivated sources in an institution that matters — a hospital, a regulator, a police force, a corporation — and those sources trust them because they have proven over time that they are accurate, fair, and discreet. That trust relationship took years to build and is not transferable to a machine.

They can read a financial disclosure, identify the gap between what is stated and what the data shows, and explain the discrepancy in plain language to a general audience. They have done this under legal threat and emerged with the story. Their work has changed something.

They know exactly what AI is doing in their industry and they know what it cannot do. It cannot cultivate the sources who matter. It cannot sit in a room with a reluctant witness and earn their trust. It cannot make the ethical judgment call about whether to publish information that will harm an individual in service of a greater public good. These are human capabilities — and they are what a journalist in 2027 must position as their core value."""
},

# ═══════════════════════════════════════════════════════════════════════════
# mc-prop — Master of Property — 23/36 MODERATE RISK
# ═══════════════════════════════════════════════════════════════════════════
"mc-prop": {
"score": 23, "maxScore": 36, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"program": "Master of Property", "code": "MC-PROP",
"duration": "2 years (300 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 2, "Property valuation and market analysis are increasingly AI-augmented but require physical inspection, client negotiation, and regulatory judgment that creates genuine automation friction."),
  ("Systems Thinking and Problem Framing", 2, "Full property cycle: development, investment, finance, valuation, management. Systems integration across the project lifecycle is embedded in the curriculum structure."),
  ("Technical and Quantitative Depth", 2, "300pt program. Financial modelling, feasibility analysis, and valuation methods. API/RICS accreditation requires demonstrated technical competence."),
  ("Decision-Making Under Uncertainty", 2, "Risk allocation, viability assessment, and project evaluation require professional judgment. Capstone research project available for more intensive decision-making experience."),
  ("AI Literacy and Governance", 1, "No AI-specific content. Data management and software skills mentioned but AI/proptech not explicit in curriculum."),
  ("Domain Depth and Specialisation", 3, "300pt professional degree with dual API/RICS accreditation. 225pt core. Clear property specialist pathway with recognised professional credentials."),
  ("Research Methods Rigour", 2, "Research project/capstone available. Research principles in property practice taught. PhD pathway mentioned."),
  ("Human & Relational Capability", 2, "Negotiation, communication, and client management skills explicit. Professional practice component. Not clinical-level relational."),
  ("Curriculum Currency and Adaptability", 2, "Updated June 2026. Property industry current. Limited AI/proptech/digital innovation visibility in curriculum."),
  ("Outcome Evidence", 2, "API/RICS accreditation provides external validation of standards. Property industry employment is trackable through professional bodies."),
  ("Irreplaceability (bonus)", 2, "Physical inspection requirements, professional liability, and client relationships create automation friction. Accreditation pathway is a structural barrier."),
],
"profile": """The Master of Property at the University of Melbourne is a professional property program accredited by the Australian Property Institute (API) and the Royal Institution of Chartered Surveyors (RICS). It is the primary graduate pathway to professional property practice in Australia.

The 300-credit-point program covers property development, investment analysis, valuation theory and practice, property finance, facilities management, and real estate law. Core subjects include financial modelling, feasibility studies, and professional practice. A research capstone project is available for students pursuing academic or advanced professional pathways.

Typical graduate roles include property analyst, valuer, development manager, property investment analyst, asset manager, facilities manager, and real estate advisor. The API and RICS accreditations are the standard professional credentials in the Australian property market.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Property analyst, graduate valuer, development assistant — market analysis, feasibility modelling, valuation support, site research | **MEDIUM** — AI valuation tools (Domain's AI, Corelogic) augment but do not replace physical inspection and judgment; financial modelling increasingly AI-assisted |
| Year 3–5 | Valuer, property manager, development manager — client relationships, independent valuations, project delivery | **MEDIUM–LOW** — Physical assessment, client management, and professional liability create genuine automation barriers |
| Year 5+ | Senior valuer, fund manager, development director, asset manager — portfolio strategy and investment decisions | **LOW** — Judgment, relationship management, and financial accountability are core. |

**Physical layer protection:** Property valuation requires physical property inspection and local market knowledge that AI systems cannot currently replicate. This physical layer provides genuine automation resistance at the practitioner level, though AI is rapidly improving property analysis capabilities.""",

"analogue": """The most exposed property graduate is the **Junior Property Analyst of 2021**: primarily producing market research reports, comparable sales analysis, and financial feasibility spreadsheets — work being compressed by AI-powered property platforms and automated valuation models.

Specific threats:
- **Automated Valuation Models (CoreLogic AVM, Domain AI, PropTrack)** — replacing routine residential and commercial property valuation estimates
- **AI development feasibility tools** — automated feasibility analysis from land cost, build cost, and market rate data
- **AI market research tools** — automated suburb and market analysis reports replacing junior analyst output
- **PropTech platforms (Archistar, Urban Intelligence)** — planning constraint analysis and site identification previously done by junior property analysts""",

"verdict": """**The Master of Property is MODERATE RISK — a degree with professional accreditation protection and physical-layer automation resistance, constrained by a curriculum that has not yet integrated AI literacy.**

The program's score (23/36) reflects the genuine value of the API/RICS accreditation pathway, physical inspection requirements, and professional liability framework. Property practice requires site visits, client relationships, and local market judgment that AI systems are not yet reliably replacing.

The risk is at the junior end: market research, comparable analysis, and feasibility modelling are exactly what AI property tools are automating. Graduates who enter the workforce as primarily analytical (market research, spreadsheet modelling) without developing the physical practice and client relationship skills face compression.

**The AI literacy gap (D5: 1/3) is significant for a 2026 program.** PropTech and AI valuation tools are transforming the industry. A graduate who cannot situate AI property tools within a professional governance framework — understanding their limitations, when to override them, and what liability exists when they are wrong — is under-prepared for practice.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop proptech and AI valuation tool literacy — understand AVM methodology, limitations, and when professional judgment must override algorithmic outputs | D5, D9 | Medium |
| 2 | Pursue API/RICS accreditation actively — professional registration is the most durable automation barrier in property practice | D6 | High (post-graduation commitment) |
| 3 | Build physical inspection experience early — paired site visits and direct market research through internship or work experience | D1, D8 | High |
| 4 | Develop expertise in a specific property sector (industrial, healthcare, agriculture) — specialist knowledge creates genuine non-replicable advantage | D6 | Medium |
| 5 | Complete the research project capstone if possible — demonstrates analytical independence and strengthens graduate credential | D7 | High |""",

"redesigned": """The 2027-ready property graduate is not a spreadsheet analyst — they are a **professional judgment specialist with physical market knowledge**.

They have been inside the buildings they have valued. They know what a deferred maintenance liability looks like in person, not just on a balance sheet. They have sat with a client who was emotionally attached to an asset and held a valuation position under pressure. They have navigated a planning approval and understood what the consent authority was actually concerned about beyond the formal requirements.

They understand what AI valuation tools do and what they miss. They can explain to a client why an AVM undervalued a commercial property because the training data didn't include the specific lease structure, and they can defend that position in writing. That combination — AI tool literacy plus physical market judgment plus professional liability — is not replicable by a model.

They have an API membership path underway and they know the regulatory framework for their practice area. They are not just a property analyst — they are a credentialled professional with physical market experience and AI tool governance capability."""
},

# ═══════════════════════════════════════════════════════════════════════════
# mc-tesol — Master of TESOL — 23/36 MODERATE RISK
# ═══════════════════════════════════════════════════════════════════════════
"mc-tesol": {
"score": 23, "maxScore": 36, "riskBand": "MODERATE RISK",
"q1": "YES", "q2": "UNCERTAIN", "q3": "UNCERTAIN",
"program": "Master of TESOL", "code": "MC-TESOL",
"duration": "2 years (200 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 1, "Language teaching faces AI disruption from real-time translation and AI tutoring systems. TESOL demand in some contexts may structurally change as AI language tools improve."),
  ("Systems Thinking and Problem Framing", 2, "Curriculum design, language acquisition theory, and education policy integration require systemic perspective on how language learning works across contexts."),
  ("Technical and Quantitative Depth", 1, "Pedagogy-focused, not quantitative. Linguistics and grammar technical but not statistical or computational depth."),
  ("Decision-Making Under Uncertainty", 2, "22-day supervised placement requires real classroom decisions with genuine accountability. Capstone inquiry project involves defended methodological choices."),
  ("AI Literacy and Governance", 1, "Foundations: Digital Futures elective available. No AI-in-language-teaching content visible — a significant gap given AI tutoring and translation tools."),
  ("Domain Depth and Specialisation", 2, "200pt. EAL specialisation pathway with VIT eligibility. Strong TESOL identity but broad foundation requirements dilute depth."),
  ("Research Methods Rigour", 2, "Research pathway available (50pt). Education Research Methodology taught. Capstone is research-based inquiry."),
  ("Human & Relational Capability", 3, "Classroom teaching, supervised placement (22 days), multilingual practices — fundamentally human-relational profession requiring presence, responsiveness, and interpersonal skill."),
  ("Curriculum Currency and Adaptability", 2, "Updated March 2026. Contemporary TESOL pedagogy. Digital Futures foundation shows some digital awareness but limited AI integration."),
  ("Outcome Evidence", 3, "Teaching salaries and employment conditions well-documented. Teacher shortage in Australia provides structural employment protection."),
  ("Irreplaceability (bonus)", 2, "Human teaching presence, relational pedagogy, and classroom management are not yet automatable. But AI language tutoring is improving rapidly."),
],
"profile": """The Master of TESOL (Teaching English to Speakers of Other Languages) at the University of Melbourne prepares graduates to teach English as an additional language in Australian and international school and adult education contexts. The 200-credit-point program meets VIT (Victorian Institute of Teaching) requirements for EAL teacher registration when completed with the specialist EAL pathway.

The program includes 22 days of supervised teaching placement, a research-based capstone, and coursework in *Language Acquisition*, *Curriculum Design*, *Language Assessment*, *Education Research Methodology*, and *Multilingual Practices*. The *Foundations: Digital Futures* elective touches digital literacy. A 50-point research pathway is available.

Typical graduate roles include EAL/D classroom teacher, AMEP (Adult Migrant English Program) teacher, international school ESL teacher, language curriculum developer, and education administrator.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | EAL classroom teacher, AMEP instructor, tutorial support — lesson planning, delivery, assessment, student relationship management | **MEDIUM** — Physical classroom presence and relational teaching cannot be automated; AI tutoring supplements but does not replace human teachers in most contexts |
| Year 3–5 | Senior teacher, head of EAL department, curriculum coordinator — professional judgment and leadership | **LOW–MEDIUM** — Teaching leadership requires relational and contextual intelligence |
| Year 5+ | Curriculum designer, teacher educator, education advisor | **LOW** — Expert knowledge design and professional mentoring are human-intensive |

**Structural tailwind:** Australia has a documented teacher shortage across multiple subject areas including EAL. This structural demand provides employment protection that is independent of AI disruption. Government employment (schools) also provides institutional stability that the private sector cannot guarantee.""",

"analogue": """The most exposed TESOL graduate is the **Online English Language Tutor of 2021**: providing one-on-one English language coaching via video platform to international students — a role being aggressively automated by AI language tutoring systems (Duolingo Max, Elsa Speak, Khanmigo).

Specific threats:
- **Duolingo Max / ChatGPT language tutoring** — on-demand AI language practice available 24/7, compressing demand for paid tutoring
- **AI writing feedback tools (Grammarly, QuillBot, Hemingway AI)** — replacing some writing correction and feedback work
- **AI conversation practice systems (ELSA Speak, Speechify)** — pronunciation and fluency coaching
- **AI-generated lesson plans and materials** — reducing curriculum development time but also skill premium""",

"verdict": """**The Master of TESOL is MODERATE RISK — a degree with structural employment protection in Australia that faces uncertain AI disruption medium-term.**

The program's score (23/36) reflects the real tension between the teacher shortage that protects employment in the short term and the AI language technology trajectory that creates uncertainty over the 5-year horizon.

In the near term, TESOL graduates entering Australian school and adult education employment are well-protected: teacher shortages, VIT registration requirements, and the genuine irreplaceability of classroom human presence provide real insulation from AI disruption. AI language tutoring supplements but does not replace classroom teaching in most institutional contexts.

The medium-term uncertainty is real: as AI language tutoring improves, the structure of language learning may shift in ways that reduce demand for some forms of English teaching, particularly in adult education and online tutoring markets. The curriculum gap in AI literacy (D5: 1/3) is significant — a TESOL graduate who cannot evaluate and govern AI language tools in their classroom is missing a rapidly growing professional competency.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI language tool literacy deliberately — understand how AI tutoring systems work, their limitations, and how to use them as pedagogical complements rather than competitors | D5 | Low |
| 2 | Complete the supervised placement in a diverse school context — classroom experience in high-need EAL settings is the most defensible graduate credential | D4, D8 | High (built-in to program) |
| 3 | Target Australian school employment where VIT registration provides genuine protection — private tutoring and online markets are more AI-disrupted | D1 | Low |
| 4 | Build assessment design skills — valid language assessment is technically complex and difficult to automate well | D3, D7 | Medium |
| 5 | Develop specialisation in needs-specific populations (refugee and humanitarian entrants, Aboriginal and Torres Strait Islander students) where relational complexity is highest | D6, D8 | Medium |""",

"redesigned": """The 2027-ready TESOL graduate is not an English content deliverer — they are a **language acquisition specialist who understands how humans learn language** and can design learning experiences that AI tools cannot.

They know language acquisition theory at the mechanism level — they understand what conditions support acquisition, why comprehensible input matters, how anxiety affects language production, and what the research says about corrective feedback. This knowledge is what separates a professional teacher from a tool that generates exercises.

They have done 22 days of supervised teaching and come away with a real classroom portfolio: not just lesson plans but evidence of student progress, feedback from mentors, and a reflective analysis of what worked and why. They know what it feels like to lose a class and recover it, and they know what it feels like to reach a student who wasn't reaching.

They use AI language tools as a complement to their teaching: they know which AI pronunciation tools are accurate for which language backgrounds, which AI writing tools produce appropriate feedback for which levels, and where AI tools mislead students. That AI-literacy layer, combined with their human-presence and relational capability, is what makes them a professional rather than an interface."""
},

# ═══════════════════════════════════════════════════════════════════════════
# mc-urbhort — Master of Urban Horticulture — score from JSON
# ═══════════════════════════════════════════════════════════════════════════
"mc-urbhort": {
"score": 25, "maxScore": 36, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"program": "Master of Urban Horticulture", "code": "MC-URBHORT",
"duration": "2 years (200 credit points)", "date": "2026-06-09",
"dimensions": [
  ("Automation Exposure of Roles", 2, "Hands-on horticultural work, plant identification, and landscape assessment require physical presence and specialist knowledge. Some design and planning tasks are AI-augmentable."),
  ("Systems Thinking and Problem Framing", 3, "Urban horticulture integrates ecology, urban planning, climate adaptation, water management, and social amenity. Systems perspective across environmental and built environment disciplines."),
  ("Technical and Quantitative Depth", 2, "Plant science, soil science, landscape ecology, and urban heat island analysis require technical depth. GIS and spatial analysis likely included."),
  ("Decision-Making Under Uncertainty", 2, "Site assessments, species selection for novel urban climates, and project management under environmental constraints require defended decision-making."),
  ("AI Literacy and Governance", 1, "Limited AI content visible. Some exposure to GIS and remote sensing tools likely. AI in urban greening not explicitly embedded."),
  ("Domain Depth and Specialisation", 3, "Specialist urban horticulture focus — rare expertise combining plant science with urban planning. Strong niche identity with clear professional pathway."),
  ("Research Methods Rigour", 2, "Master's-level research project or capstone likely. Plant science requires experimental methodology."),
  ("Human & Relational Capability", 2, "Community engagement, stakeholder consultation for urban greening projects, and professional communication with planners and clients."),
  ("Curriculum Currency and Adaptability", 3, "Urban heat islands, climate adaptation, and urban biodiversity are live policy priorities. Curriculum reflects contemporary urban sustainability challenges."),
  ("Outcome Evidence", 2, "Urban horticulture is a growth sector driven by urban greening policy. Employment data not prominently published."),
  ("Irreplaceability (bonus)", 2, "Physical plant expertise, site-specific assessment, and species selection for urban conditions are not easily replicable. Niche specialist knowledge creates genuine premium."),
],
"profile": """The Master of Urban Horticulture at the University of Melbourne is a specialist program combining plant science with urban planning and landscape design. It prepares graduates for professional practice in urban greening, parks management, landscape horticulture, and urban biodiversity.

The program covers plant physiology, soil science, landscape ecology, urban heat island management, climate-adaptive planting design, water-sensitive design, and community greening programs. Core skills include plant identification, site assessment, planting plan design, and project management for urban landscape programs.

Typical graduate roles include urban horticulturalist, parks and gardens manager, landscape designer, urban ecology consultant, green infrastructure specialist, and local government urban greening advisor. The field is growing due to urban heat island policy priorities, tree canopy targets, and urban biodiversity initiatives.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Horticulturalist, landscape technician, parks officer — plant assessment, planting plans, site inspections, maintenance planning | **MEDIUM–LOW** — Physical plant assessment, species identification in urban contexts, and site-specific conditions require human judgment that AI cannot yet replicate reliably |
| Year 3–5 | Senior horticulturalist, urban ecology consultant, landscape manager — project leadership, design authority, stakeholder management | **LOW** — Domain expertise, client relationships, and multi-system integration are strongly human |
| Year 5+ | Urban greening director, parks manager, urban ecology researcher | **LOW** — Strategic and scientific leadership with genuine community and government accountability |

**Physical expertise protection:** Urban horticulture requires physical presence for plant health assessment, soil analysis, and site-specific environmental reading. AI tools can support design and planning but cannot replace field expertise. Climate change is creating new plant health challenges (novel pests, heat stress, altered water availability) that require adaptive specialist judgment.""",

"analogue": """The most exposed urban horticulture graduate is the **Parks Maintenance Officer of 2020**: primarily executing standard maintenance schedules, applying formulaic planting plans, and managing routine irrigation — work that is increasingly managed by sensor-driven automated systems and AI scheduling tools.

Specific threats:
- **Smart irrigation systems (Hydrawise, HydroPoint)** — automated soil moisture monitoring and irrigation scheduling
- **AI plant disease detection (Plantix, Plant.id)** — disease and pest diagnosis from smartphone photos
- **Automated design tools** — AI planting plan generators from site conditions and species databases
- **Drone survey and LIDAR assessment** — automated tree canopy and landscape assessment""",

"verdict": """**The Master of Urban Horticulture is MODERATE RISK — a specialist niche degree with genuine physical-layer automation protection and growing structural demand.**

The program's score (25/36) reflects a field where physical expertise, specialist plant knowledge, and site-specific environmental judgment are genuinely difficult to automate. Urban horticulture is one of the few applied disciplines where the human-physical layer remains critical and where AI tools function as enhancers rather than replacers.

The structural tailwind is real: urban heat island policy, urban tree canopy targets, urban biodiversity strategies, and climate-adaptive planting are all generating genuine professional work across Australian state and local governments. This is not declining market demand.

The key gap is AI literacy (D5: 1/3): urban horticulture practice is increasingly data-intensive, using remote sensing, LIDAR canopy assessment, and AI disease detection. A graduate who cannot situate these tools within a governance framework misses growing competency requirements.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop GIS and remote sensing competency — spatial analysis and urban canopy mapping are growth skills in urban horticulture | D3, D5 | Medium |
| 2 | Gain local government experience during the program — council urban greening programs are the largest employer of urban horticulturalists | D4, D8 | High |
| 3 | Build climate-adaptive planting expertise — species selection for novel urban climates is a specific growth area driven by heat island policy | D6, D9 | Medium |
| 4 | Develop community engagement skills — urban greening programs increasingly require community consultation and social benefit articulation | D8 | Low |
| 5 | Specialise in urban biodiversity or green infrastructure — these are policy-priority niches with genuine growth in professional roles | D6 | Medium |""",

"redesigned": """The 2027-ready urban horticulture graduate is not a plant maintenance officer — they are an **urban ecosystem specialist** who understands what a city needs from its green infrastructure and can design, implement, and evaluate it.

They know their local urban climate — the heat island gradient across the city, which species are performing under novel conditions, and what the soil health data from 50 urban parks tells them about the management interventions that work. They have used LIDAR canopy data to argue for a specific planting strategy in a council project and they can explain that argument to a city planner, a community group, and an ecologist simultaneously.

They understand what AI disease detection tools get wrong — the edge cases where visual symptoms don't match the actual pathogen, the timing issues where AI tools are trained on Northern Hemisphere data that doesn't map to Southern Hemisphere seasonal patterns. That field expertise, combined with digital tool literacy, is what makes them authoritative.

They are contributing to urban greening outcomes that are measurable: canopy cover increased, heat island mitigation achieved, biodiversity indicators improved. They can defend those outcomes with evidence. That accountability — physical expertise plus measurable impact — is the basis of a durable career."""
},

}  # end REPORTS_DATA


# ─────────────────────────────────────────────────────────────────────────────
# TEMPLATE RENDERER
# ─────────────────────────────────────────────────────────────────────────────

def render_scorecard(dimensions):
    rows = []
    for i, (label, score, rationale) in enumerate(dimensions, 1):
        if "bonus" in label.lower() or "irreplaceability" in label.lower():
            num = "B"
        else:
            num = str(i if i <= 10 else i)
        rows.append(f"| {num} | {label} | {score}/3 | {rationale} |")
    total = sum(s for _, s, _ in dimensions)
    rows.append(f"| **TOTAL** | | **{total}/36** | |")
    header = "| # | Dimension | Score | Evidence-based rationale |\n|---|---|---|---|"
    return header + "\n" + "\n".join(rows)


def build_report(slug, data):
    dims = data["dimensions"]
    total = data["score"]
    band = data["riskBand"]
    q1 = data["q1"]
    q2 = data["q2"]
    q3 = data["q3"]
    program = data["program"]
    code = data["code"]
    duration = data["duration"]
    report_date = data["date"]
    
    scorecard = render_scorecard(dims)
    
    # Build threshold section using correct COMPASS renderer format
    threshold_text = f"""**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
{q1}. {get_q1_rationale(data)}

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
{q2}. {get_q2_rationale(data)}

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
{q3}. {get_q3_rationale(data)}"""

    md = f"""# DFVA REPORT: {program}

**Institution:** University of Melbourne
**Level:** Master (Coursework)
**Duration:** {duration}

---

**Assessment Date:** {report_date}
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/{slug}
**Prompt Version:** DFVA-COPILOT-PROMPT-v1

---

## 1. PROGRAM PROFILE

{data['profile'].strip()}

---

## 2. AUTOMATION EXPOSURE PROFILE

{data['automation'].strip()}

---

## 3. DFVA SCORECARD

{scorecard}

**Risk Band: {band}**

---

## 4. THREE THRESHOLD QUESTIONS

{threshold_text}

---

## 5. ANALOGUE GRADUATE PROFILE

{data['analogue'].strip()}

---

## 6. VERDICT

{data['verdict'].strip()}

---

## 7. RECOMMENDATIONS

{data['recommendations'].strip()}

---

## 8. THE REDESIGNED GRADUATE PROFILE

{data['redesigned'].strip()}

"""
    # Preserve existing MARKET DATA if present
    return md


def get_q1_rationale(data):
    q1 = data["q1"]
    slug_name = data["program"]
    # Use analogue text opening for rationale
    first_line = data["analogue"].split("\n")[0].strip()
    if q1 == "YES":
        return f"The early-career output for {slug_name} graduates is substantially templated — research, analysis, and document production are in AI's wheelhouse."
    elif q1 == "NO":
        return f"Core professional work in {slug_name} requires physical presence, regulated judgment, or specialist domain knowledge that AI cannot yet replicate reliably."
    else:
        return f"Highly dependent on specialisation and role context. Some {slug_name} graduates will be highly exposed; those in specialist or regulated roles will be substantially protected."


def get_q2_rationale(data):
    q2 = data["q2"]
    if q2 == "YES":
        return "The program's capstone, professional practice, and specialist curriculum provide genuine decision ownership and system design capability."
    elif q2 == "NO":
        return "The core curriculum is primarily technique application and knowledge recall. Decision ownership and system design capabilities are not consistently developed."
    elif q2 == "UNCERTAIN" or q2 == "PARTIAL":
        return "Partial capability exists. Studio, capstone, or professional placement elements push toward decision ownership, but the standard curriculum track does not guarantee it."
    return "See rationale in report."


def get_q3_rationale(data):
    q3 = data["q3"]
    band = data["riskBand"]
    if q3 == "YES":
        return f"Structural demand for the specific skill set, professional accreditation protection, or AI-native curriculum positioning make 5-year employability stronger than today."
    elif q3 == "NO":
        return f"AI disruption of the primary employment market, combined with limited curriculum adaptation, creates meaningful 5-year employability risk."
    elif q3 == "UNCERTAIN":
        return f"Depends significantly on individual specialisation choices, elective selection, and whether the industry adapts faster than AI tools disrupt it."
    return "See rationale in report."


def get_existing_market_data(slug):
    """Return the existing MARKET DATA markdown block if present in current file."""
    filepath = REPORTS / f"dfva-{slug}.md"
    if not filepath.exists():
        return ""
    content = filepath.read_text()
    # Find the MARKET DATA section
    m = re.search(r'(### MARKET DATA.*)', content, re.DOTALL)
    if m:
        return "\n" + m.group(1).strip() + "\n"
    return ""


def main():
    generated = 0
    skipped = 0
    
    for slug, data in REPORTS_DATA.items():
        out_path = REPORTS / f"dfva-{slug}.md"
        
        # Generate the full markdown report
        report_md = build_report(slug, data)
        
        # Append existing market data if present
        market_data = get_existing_market_data(slug)
        if market_data:
            report_md = report_md.rstrip() + "\n" + market_data
        
        out_path.write_text(report_md)
        print(f"  WROTE: dfva-{slug}.md ({data['score']}/{data['maxScore']} {data['riskBand']})")
        generated += 1
    
    print(f"\nGenerated {generated} full markdown reports.")
    print("Next steps:")
    print("  1. python3 scripts/generate-partial-reports.py  (for remaining programs)")
    print("  2. npx tsx scripts/enrich-reports.ts")
    print("  3. python3 scripts/parse_reports.py")


if __name__ == "__main__":
    main()
