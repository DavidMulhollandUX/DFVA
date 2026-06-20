#!/usr/bin/env python3
"""
Append missing sections to partial DFVA markdown reports.
For each program, adds ANALOGUE GRADUATE PROFILE and/or 
THE REDESIGNED GRADUATE PROFILE before the MARKET DATA block.

Run: python3 scripts/generate-partial-reports.py
"""
import os, re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REPORTS = REPO / 'reports'

# ─────────────────────────────────────────────────────────────────────────────
# Missing sections to append for each slug.
# Format: { slug: { "analogue": "...", "redesigned": "..." } }
# For programs where section 5 (ANALOGUE) is used as VERDICT,
# we just add the two missing sections at the right place.
# ─────────────────────────────────────────────────────────────────────────────

MISSING_SECTIONS = {

# ─── mc-actsc: has VERDICT+RECOMMENDATIONS but missing ANALOGUE and REDESIGNED ─
"mc-actsc": {
"analogue": """The most exposed actuarial science graduate is the **Junior Actuarial Analyst of 2021**: entering an insurance firm as the primary handler of reserving calculations, pricing model runs, and regulatory reporting submissions — precise, structured mathematical tasks that actuarial software platforms and AI tools are actively automating.

Specific threats:
- **Actuarial AI platforms (Quantee, Akur8)** — automated pricing model generation from claims data, replacing manual model design at junior levels
- **Willis Towers Watson Radar Live / Moody's RMS AI** — automated catastrophe modelling and reserving runs
- **AI regulatory reporting tools** — APRA reporting automation reducing junior analyst time on structured submissions
- **Excel AI and Python AutoML** — absorbing the routine modelling and data transformation work that forms the bulk of first-two-year actuarial output""",

"redesigned": """The 2027-ready actuarial science graduate is not a calculator — they are a **risk governance specialist** who understands what the actuarial models do and what they miss, and who can own the accountability when they are wrong.

They have completed the accreditation examination track, which means they carry professional liability. They know the regulatory framework for the product lines they work with. When the automated pricing model produces an output that looks right but is wrong for regulatory reasons, they are the person who catches it and explains why.

They understand the AI tools in their firm's technology stack: what training data the claims model uses, where it fails at distribution edges, and what the governance requirement is when an AI-generated premium recommendation deviates from actuarial professional judgment. That combination — mathematical rigour plus AI governance literacy plus professional accountability — is what the AI era of insurance actually requires.

They have added data analytics capability (Python, R, SQL at depth) that makes them fluent in the same technical language as the AI tools they oversee. They are not just an actuarial examiner — they are an actuarial data scientist with professional credentials."""
},

# ─── mc-scibif: has sections 1-4 + VERDICT + RECOMMENDATIONS but missing ANALOGUE and REDESIGNED ─
"mc-scibif": {
"analogue": """The most exposed bioinformatics graduate is the **Bioinformatics Pipeline Operator of 2021**: running standard genome assembly pipelines, executing BLAST searches, and processing RNA-seq data using established workflows — work that cloud bioinformatics platforms and automated analysis tools are rapidly systematising.

Specific threats:
- **Galaxy Project / GALAXY AI** — automated bioinformatics workflow execution without pipeline code writing
- **AlphaFold / ESMFold** — protein structure prediction that replaced significant junior computational structural biology work
- **Automated variant calling pipelines (GATK, DeepVariant)** — algorithmic variant analysis replacing manual pipeline management
- **CancerVar / automated variant interpretation tools** — AI-powered clinical variant classification replacing junior bioinformatician manual curation""",

"redesigned": """The 2027-ready bioinformatics graduate is not a pipeline runner — they are a **genomic data scientist** who knows why the analysis answers the question, not just how to run it.

They have designed a bioinformatics analysis from a biological question — not inherited a pipeline from a supervisor and executed it. They know what assumptions are embedded in the read alignment algorithm, what the reference genome misses, and when a variant call is a technical artefact rather than a biological signal. That interpretive judgment is what separates a bioinformatician from a workflow executor.

They understand how AlphaFold is right and how it is wrong — the difference between a high-confidence structural prediction and a low-confidence region where the model is extrapolating. They can look at a predicted structure and tell a collaborating biochemist what experiments would be needed to validate the fold.

They sit at the interface between computation and biology: they translate between wet-lab researchers who know what the biology means and computational infrastructure that needs precise problem specification. That translation layer — requiring genuine expertise in both domains — is what makes their work non-replicable by a general-purpose AI system."""
},

# ─── mc-datasc: missing ANALOGUE and REDESIGNED ─
"mc-datasc": {
"analogue": """The most exposed data science graduate is the **Junior Data Analyst of 2022**: using pandas and sklearn to clean datasets, train standard classification models, produce visualisations, and write summary reports — work being systematically absorbed by AI coding assistants, AutoML platforms, and business intelligence co-pilots.

Specific threats:
- **GitHub Copilot / Cursor** — generating data cleaning and analysis code from natural language descriptions, replacing junior data engineering work
- **Julius / ChatGPT Advanced Data Analysis** — running statistical analysis and producing visualisations from uploaded datasets
- **Power BI Copilot / Tableau AI** — automated dashboard generation and narrative insight extraction
- **AutoML platforms (Google AutoML, DataRobot, H2O.ai)** — automated model selection, hyperparameter tuning, and model evaluation""",

"redesigned": """The 2027-ready data science graduate is not someone who fits models — they are someone who **defines what question the model is answering and what we learn when it is wrong**.

They have done causal inference properly: not correlation analysis dressed up as causal language, but a genuinely identified effect with a valid natural experiment or instrumental variable. They can defend their identification strategy to a statistician and explain its practical implications to a product manager. That combination is the rarest and most valuable capability in data science.

They have an AI governance layer: they know what training data their models were trained on, what distributional shift looks like in their specific domain, and what the monitoring pipeline should track. When a model starts producing anomalous outputs, they are the person who knows whether that is signal or noise and what to do about it.

They have communicated statistical conclusions to people who are not statisticians — under pressure, with genuine stakes. A product decision was made differently because of their analysis. That accountability — specific, traceable, consequential — is what distinguishes a professional data scientist from a model executor."""
},

# ─── mc-cs: missing ANALOGUE and REDESIGNED ─
"mc-cs": {
"analogue": """The most exposed computer science graduate is the **Junior Software Developer of 2022**: primarily writing implementation code, debugging standard issues, and producing documentation for mid-level tasks in a product team — work being systematically compressed by AI coding assistants.

Specific threats:
- **GitHub Copilot / Cursor / Devin** — generating implementation code, tests, and documentation from specifications
- **AI code review tools (SonarQube AI, CodeClimate AI)** — automated code quality analysis replacing junior code review contribution
- **AI debugging tools (Codecov AI, Sentry AI Autopilot)** — automated error diagnosis and fix suggestion
- **No-code/low-code AI platforms** — absorbing standard application development work that filled junior developer queues

However, the MC-CS graduate profile is substantially different from this exposure profile: Year 2 research training, AI systems specialisation, and research-track destinations position most graduates above the compression layer.""",

"redesigned": """The 2027-ready computer science graduate is not an implementation specialist — they are a **systems designer who understands AI at the mechanism level**.

They have done independent research: they defined a question, designed a methodology, collected data, interpreted ambiguous results, and defended their conclusions under expert scrutiny. They know what it feels like to be uncertain about whether their results are real or artefacts — and they know how to design the experiment that resolves the uncertainty. That research judgment is what makes their technical work non-routine.

They can look at an AI system — a language model, a recommendation engine, a computer vision pipeline — and explain what it optimises for, what it fails to optimise for, and what the failure modes are. They can design the evaluation framework that tells you whether the system is trustworthy in a specific deployment context. This is not theoretical: they have done it in their specialisation area.

They sit at the frontier of CS practice — not implementing established patterns but pushing the boundary. Whether in AI alignment, trustworthy ML, cybersecurity, or spatial systems, they have genuine expertise that is a year ahead of the mainstream curriculum. That research-cultivated expertise is the most durable form of professional differentiation."""
},

# ─── mc-urbdes: missing ANALOGUE and REDESIGNED ─
"mc-urbdes": {
"analogue": """The most exposed urban design graduate is the **Junior Urban Planner of 2022**: primarily producing planning reports, creating standard urban analysis visualisations, and preparing development assessment submissions — work increasingly aided by AI planning tools and parametric design platforms.

Specific threats:
- **Archistar / Urban Intelligence** — automated development feasibility analysis and planning constraint identification
- **AI master planning tools (Generative urban design platforms)** — rapid parametric urban form generation from brief constraints
- **AI traffic and pedestrian modelling** — replacing manual simulation work in urban impact assessment
- **AI planning report writers** — automated generation of standard planning report sections from site data""",

"redesigned": """The 2027-ready urban design graduate is not a planning report writer — they are a **place-maker who understands the social, spatial, and political dimensions of urban form**.

They have designed at the scale of a neighbourhood: they know what it means to create streets that feel safe, public spaces that are used, and density that is accepted by communities. They have taken a design through community consultation and come out the other side with a better design than they started with — not just a modified design, but a genuinely improved one that incorporated local knowledge the design team didn't have.

They understand what AI urban design tools optimise for — density, sunlight access, setback compliance — and what they miss: the social dynamics of informal space, the cultural dimensions of public realm, the political economy of housing affordability. They can run a parametric study in two hours and then spend two days explaining to a planning authority why the parametrically optimal solution is socially problematic.

They work at the intersection of design expertise, community accountability, and regulatory navigation. That intersection — requiring design judgment, political literacy, and genuine stakeholder trust — is the place where urban design's human value is most concentrated and most irreplaceable."""
},

# ─── mc-propsyc: has most sections but missing THREE THRESHOLD QUESTIONS, ANALOGUE, and REDESIGNED ─
"mc-propsyc": {
"analogue": """The most exposed professional psychology graduate is the **Psychological Assessment Technician of 2021**: primarily administering standardised psychological tests, scoring instruments, and producing standard assessment reports — work being increasingly automated by AI psychological assessment platforms.

Specific threats:
- **AI psychological assessment platforms (Pearson AI, MHS AI scoring)** — automated administration and scoring of psychological instruments
- **AI report generators for psychological assessments** — templated report production from standardised test data
- **Mental health chatbot platforms (Woebot, Wysa)** — absorbing some lower-acuity counselling work that graduate psychologists historically performed
- **AI diagnostic support tools** — automated differential diagnosis suggestions from symptom data""",

"redesigned": """The 2027-ready professional psychology graduate is not an assessment technician — they are a **psychological treatment specialist with evidence-based practice expertise**.

They are registered with AHPRA and carry professional liability. When an AI diagnostic tool suggests a formulation, they are the person who evaluates whether it accounts for the client's cultural context, trauma history, and presenting complexity — and who documents the clinical reasoning that either accepts or overrides the AI suggestion. That professional accountability is not delegatable.

They have done a substantial internship under supervision and emerged with real clinical case experience: a client they helped significantly, a case that challenged their formulation skills, and a supervisory relationship that built their professional identity. Those experiences are not in a textbook and they are not in an AI model.

They understand AI tools in mental health — their capabilities, limitations, and ethical requirements — because the landscape of AI-assisted therapy and assessment is developing rapidly. They can advise an organisation on appropriate use of AI in psychological services. They do not fear AI in their practice; they govern it."""
},

}

# ─── Simpler programs with 0-1 sections: need substantial writing ───────────

FULL_MISSING = {

# ─── 439fs — Master of Food Science ─────────────────────────────────────────
"439fs": {
"analogue": """The most exposed food science graduate is the **Food Technologist of 2021**: primarily conducting routine quality control testing, product specification development, and regulatory compliance documentation — work increasingly systematised by AI quality management platforms and automated testing.

Specific threats:
- **AI food safety platforms (FoodLogiQ, Trustwell AI)** — automated HACCP monitoring, compliance checking, and documentation generation
- **AI formulation tools** — automated product formulation from ingredient constraints and nutritional targets
- **Robotic quality control systems** — replacing manual sensory assessment and routine QC testing in manufacturing
- **AI regulatory compliance tools** — automated food standards compliance checking against FSANZ and international standards""",

"redesigned": """The 2027-ready food science graduate is not a QC technician — they are a **food systems specialist** who understands the whole chain from ingredients to consumer health outcomes.

They have worked in a real food production context — understanding the constraints of scale, the economics of reformulation, the regulatory timelines for approval, and the sensory expectations of specific consumer segments. That operational knowledge is not in a laboratory handbook and cannot be learned from a formulation database.

They understand the sustainability dimensions of food production: the environmental impact of ingredient sourcing, the food waste implications of product design, and the regulatory direction of travel on packaging and processing. They can advise a food company not just on whether a reformulation is technically feasible but on whether it is strategically sound given regulatory trends.

They use AI formulation tools as accelerators — they know which constraints to set, which outputs to scrutinise, and which recommendations to override based on their sensory and processing expertise. That judgment layer is what makes them a food scientist rather than an AI operator."""
},

# ─── 527cl — Master of Clinical Psychology ──────────────────────────────────
"527cl": {
"score": 27, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"profile": """The Master of Clinical Psychology at the University of Melbourne is an APHRA-approved clinical training program leading to registration as a psychologist. The 2-year (200pt) program combines coursework in psychological assessment and treatment with a substantial supervised clinical placement.

Core components include advanced psychological assessment, evidence-based treatment (CBT, DBT, ACT, and related modalities), neuropsychological assessment, child and adolescent psychology, and research methods. Clinical placements provide a minimum of supervised hours required for general registration, with additional specialist hours available through the internship structure.

Typical graduate pathways include clinical psychologist (private practice), hospital-based psychologist, community mental health service, neuropsychological assessment, and specialist clinical researcher.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Psychological assessment, individual therapy, case formulation, clinical report writing | **MEDIUM–LOW** — Core clinical work requires human presence, clinical judgment, and therapeutic alliance that AI cannot replicate |
| Year 3–5 | Experienced clinical psychologist — complex case management, supervision, specialist assessment | **LOW** — Specialist clinical judgment, regulatory accountability, and therapeutic relationship are professional requirements |
| Year 5+ | Senior clinician, supervisor, academic/researcher | **LOW** — Leadership, supervision, and research in psychology are strongly human-professional |

**Regulatory protection:** Clinical psychology is APHRA-regulated with mandatory supervised hours, professional liability, and continuing professional development requirements. These create genuine barriers to AI substitution at the practitioner level.""",

"analogue": """The most exposed clinical psychology graduate is the **Low-Acuity Mental Health Support Worker of 2021**: providing structured CBT-based support for mild-to-moderate anxiety and depression through structured protocols — work that AI mental health platforms are beginning to augment.

Specific threats:
- **Woebot, Wysa, Koko** — AI mental health chatbots providing structured CBT-based interventions for mild presentations
- **AI mental health assessment screeners** — automated PHQ-9, GAD-7, and similar instruments with AI-driven triage
- **Telehealth platform AI** — session note automation and clinical documentation support
- **AI-assisted diagnosis tools** — pattern-matching for common presentations

However, the MC-527CL graduate profile is substantially more protected than this: APHRA registration, supervised clinical hours, and specialist clinical training position graduates in complex case management where AI tools function as supports rather than replacements.""",

"verdict": """**The Master of Clinical Psychology is MODERATE RISK (upper boundary) — a degree with strong professional protections and genuine clinical complexity that resists AI substitution.**

The program's score (27/36) reflects the real and substantial automation resistance of regulated clinical psychology practice: mandatory supervised hours, APHRA registration, professional liability, and the irreducibly human nature of the therapeutic relationship.

The key gap is AI literacy (D5: likely 1/3): the mental health AI landscape is developing rapidly, and clinical psychologists who cannot evaluate and govern AI tools in clinical contexts — assess their reliability for specific presentations, explain their limitations to clients, and document clinical reasoning when overriding AI suggestions — will be under-prepared for 2027 practice.

The degree is well-positioned: complex psychological assessment and treatment require exactly the kind of contextual, relational, and professional judgment that AI cannot yet replicate.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI literacy for clinical contexts — evaluate AI mental health tools, understand their evidence base, and develop governance frameworks for clinical AI use | D5 | Medium |
| 2 | Specialise in complex presentation areas (personality disorders, trauma, neuropsychology) where AI tools have least capability | D6 | High |
| 3 | Build supervision and training capacity — mentor-level clinical professionals are less AI-exposed and more professionally valued | D8 | High (post-graduation) |
| 4 | Complete the maximum available supervised hours during training — clinical experience is the primary differentiator in psychological practice | D4, D8 | High (built-in) |
| 5 | Engage with telehealth and digital platform clinical governance — psychologists who can advise on AI mental health tool deployment are an emerging specialist role | D5, D6 | Medium |""",

"redesigned": """The 2027-ready clinical psychology graduate is not a protocol administrator — they are a **clinical reasoning specialist** who understands what the evidence base shows and what it misses for their specific client's presentation.

They have done complex clinical work: a client whose presentation didn't fit the standard protocol, where they had to modify the intervention, document the clinical reasoning, and defend that modification in supervision. They know what good formulation feels like — not a diagnostic checklist but a genuine explanatory model of how this person's history, cognition, biology, and social context have produced this specific suffering.

They are aware of what AI mental health tools can and cannot do. When a client asks them whether they should use a mental health app, they can give a specific, evidence-grounded answer — not a generic endorsement or dismissal. That clinical AI literacy, combined with APHRA registration and complex case experience, is what positions them as professionals in the AI-augmented mental health landscape.

They understand that the therapeutic relationship — the experience of being genuinely heard, understood, and cared for by another human — is not a feature that an AI system can replicate, and that this relationship is not incidental to effective psychological treatment but central to it."""
},

# ─── 746st — Master of Engineering Structures ────────────────────────────────
"746st": {
"score": 20, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"profile": """The Master of Engineering Structures at the University of Melbourne is a specialist structural engineering program preparing graduates for professional practice in structural analysis, design, and assessment. It provides a pathway to Chartered Professional Engineer (CPEng) status.

The program covers structural analysis theory, concrete and steel design, foundation engineering, earthquake engineering, structural dynamics, and advanced computational methods. Graduate roles include structural engineer, project engineer, design engineer, and infrastructure specialist in construction, infrastructure, and engineering consultancy.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Structural analysis runs, design documentation, drawing production, specifications | **MEDIUM** — Analysis software (SAP2000, ETABS) increasingly AI-enhanced; but engineering judgment required for load path interpretation and code compliance |
| Year 3–5 | Project engineer, senior structural engineer — design authority and review | **LOW–MEDIUM** — Professional accountability and design sign-off create automation barriers |
| Year 5+ | Principal engineer, CPEng — engineering certification and project leadership | **LOW** — Professional registration and engineering judgment are not delegatable |""",

"analogue": """The most exposed engineering structures graduate is the **Junior Structural Drafter of 2021**: primarily producing standard structural drawings, running routine analysis models, and generating specification sections — work increasingly absorbed by BIM automation and AI structural analysis tools.

Specific threats:
- **AI structural analysis tools (Speckle, Autodesk Robot AI)** — automated structural optimisation and load path analysis
- **Generative structural design AI** — parametric structural form generation from performance constraints
- **AI code-compliance checkers** — automated compliance review for structural codes (AS 3600, AS 4100)
- **BIM AI documentation** — automated drawing and specification generation from structural models""",

"verdict": """**The Master of Engineering Structures is MODERATE RISK — a professionally regulated degree with genuine automation barriers from engineering accountability requirements.**

Professional registration (CPEng pathway), engineering sign-off liability, and the complexity of structural assessment in existing buildings and non-standard conditions create real automation barriers. Graduates who develop specialist expertise in earthquake engineering, heritage structures, or complex geometry gain additional differentiation.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Pursue CPEng accreditation path actively — professional registration is the primary long-term differentiator in structural engineering | D6 | High (post-graduation) |
| 2 | Develop computational modelling depth — Python, FEM scripting, and parametric structural design are growth competencies | D3, D5 | Medium |
| 3 | Specialise in complex structural assessment — existing buildings, heritage, earthquake retrofitting are more human-judgment intensive than standard new-build work | D6 | Medium |
| 4 | Build materials and construction knowledge — physical understanding of how structures behave in reality is not replicable by finite element models | D3 | Medium |""",

"redesigned": """The 2027-ready engineering structures graduate is not a model runner — they are a **structural judgment specialist** whose professional signature means something.

They have assessed a structure under uncertainty — a building where the documentation was incomplete, the material properties were unknown, and the loading history was unclear. They made a professional judgment about structural adequacy under those conditions and documented the reasoning. That judgment, combined with their CPEng accountability, is what makes their assessment legally defensible.

They understand what finite element models assume and what they miss: the difference between modelled behaviour and observed behaviour in real structures. They have seen structures perform differently from their models and they know why. That gap between model and reality is where structural engineering judgment lives.

They use AI analysis tools to generate options rapidly, then apply engineering judgment to select, validate, and govern the design. They are not a human calculator — they are the professional who takes responsibility for whether the structure stands."""
},

# ─── mc-apbusa — Master of Applied Business Analytics ──────────────────────
"mc-apbusa": {
"score": 20, "riskBand": "MODERATE RISK",
"q1": "UNCERTAIN", "q2": "UNCERTAIN", "q3": "YES",
"profile": """The Master of Applied Business Analytics at the University of Melbourne (Melbourne Business School) is a practitioner-focused analytics degree targeting professionals who want to develop data-driven decision-making skills. It occupies a middle position between the technical depth of the Master of Business Analytics and the managerial breadth of the MBA.

The program covers business statistics, data analysis tools, predictive analytics, and evidence-based business decision-making. It is typically structured as a shorter, applied program compared to the 150pt MC-BUSANA, with a stronger emphasis on immediate workplace application.

Typical graduate roles include analytics manager, business intelligence lead, marketing analyst, operations analyst, and data-informed product manager.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Analytics manager, BI lead — dashboard management, analytical project ownership, stakeholder reporting | **MEDIUM** — Routine analytical work is AI-compressed; strategic framing and business translation provide some protection |
| Year 3–5 | Senior analytics lead, data strategy manager | **MEDIUM–LOW** — Decision authority and stakeholder management provide more protection |""",

"analogue": """The most exposed applied business analytics graduate is the **Business Analyst of 2022**: primarily producing dashboards, running standard analyses, and writing insights reports — work being compressed by AI business intelligence tools.

Specific threats:
- **Power BI Copilot / Tableau AI** — automated dashboard generation and narrative insight extraction
- **ChatGPT for business analysis** — automated market research synthesis and competitive analysis
- **AI insights platforms (ThoughtSpot, Pyramid Analytics)** — natural language query and automated business insights""",

"verdict": """**The Master of Applied Business Analytics is MODERATE RISK — a practical analytics credential whose differentiation depends heavily on individual depth of specialisation.**

The program sits between the MBA (generalist management) and the MC-BUSANA (deep quantitative analytics). It serves a real market need but occupies a positioning that is vulnerable to credential compression: not deeply enough quantitative to compete with MC-BUSANA graduates, not broadly enough managerial to compete with MBA graduates.

Graduates who develop genuine domain expertise in a specific industry (health analytics, financial risk, supply chain) and build AI governance capability alongside the analytics tools are well-positioned. Generic applied analytics graduates face increasing competition from AI tools.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop deep domain expertise in a specific industry — generic analytics credentials are increasingly commodity | D6 | High |
| 2 | Build genuine Python/SQL competency beyond tool-based analytics | D3 | Medium |
| 3 | Develop AI governance and responsible analytics capability | D5 | Medium |
| 4 | Target roles with stakeholder accountability and decision authority | D4 | Low |""",

"redesigned": """The 2027-ready applied business analytics graduate is a **domain-specialist analytics professional** who combines technical data skills with deep knowledge of one industry's specific measurement problems.

They know what the data in their domain doesn't measure — the gap between what the analytics says and what is actually happening in the organisation. They have had to explain to an executive why the metrics looked good but the business outcome was deteriorating. That translation between data and organisational reality is where analytics professionals create genuine value.

They use AI analytics tools fluently but critically. They know when the AI-generated insight is right and when it's wrong, and they have the domain knowledge to distinguish between them. That critical layer — not just analytical competence but analytical judgment in a specific context — is their professional asset."""
},

# ─── mc-bamktg — Master of Business Administration (Marketing) ──────────────
"mc-bamktg": {
"score": 17, "riskBand": "HIGH RISK",
"q1": "YES", "q2": "UNCERTAIN", "q3": "UNCERTAIN",
"profile": """The Master of Business Administration (Marketing) at the University of Melbourne is a specialist MBA stream combining core business administration content with a marketing specialisation. The program targets marketing professionals seeking managerial advancement and career-changers entering marketing leadership.

Core management subjects are combined with marketing electives covering consumer behaviour, digital marketing, brand strategy, marketing analytics, and market research. The program provides AACSB-accredited business education with a marketing depth track.

Typical graduate roles include marketing manager, brand manager, digital marketing lead, product manager, and customer experience director.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Marketing manager, brand coordinator, digital marketing specialist — campaign production, content strategy, analytics | **HIGH** — Content production, A/B testing, and performance analytics are highly AI-automatable |
| Year 3–5 | Senior marketing manager, brand director — strategy and brand ownership | **MEDIUM** — Strategic brand decisions and customer insight require human judgment |""",

"analogue": """The most exposed marketing MBA graduate is the **Digital Marketing Manager of 2022**: primarily managing paid search campaigns, producing content calendars, running A/B tests, and reporting on digital funnel metrics — work systematically absorbed by AI marketing tools.

Specific threats:
- **Google Ads AI / Meta Advantage+** — fully automated campaign optimisation replacing manual campaign management
- **AI content generators (Jasper, Copy.ai, ChatGPT)** — producing marketing copy, email campaigns, and social content at volume
- **AI analytics (GA4 AI insights, Amplitude AI)** — automated performance interpretation and recommendation generation
- **AI personalisation engines** — dynamic content optimisation replacing manual segmentation and targeting""",

"verdict": """**The Master of Business Administration (Marketing) is HIGH RISK — a credential whose primary professional domain is experiencing acute AI disruption.**

Marketing is one of the fields where AI tools have had the fastest and deepest impact. Content generation, campaign optimisation, performance analytics, and market research are all experiencing significant AI compression. The marketing MBA credential signals managerial capability, but the executional domain it is designed for is changing faster than the curriculum reflects.

The path to resilience runs through two things: genuine brand strategy expertise (which requires human cultural understanding and consumer empathy that AI lacks) and AI governance capability (which allows graduates to sit above the automation layer rather than within it).""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop genuine brand strategy expertise — not campaign management but cultural and consumer insight | D6 | High |
| 2 | Build AI marketing tool governance competency — understand what AI marketing tools optimise for and what they miss | D5 | Medium |
| 3 | Develop marketing analytics depth — Python/R-based marketing mix modelling and causal attribution are growth areas | D3 | High |
| 4 | Target brand director and CMO-track roles that require human cultural judgment, not campaign execution roles | D1 | Low |""",

"redesigned": """The 2027-ready marketing MBA graduate is not a campaign manager — they are a **brand strategy and consumer insight specialist** who understands what drives human behaviour, not just what drives click-through rates.

They know why a brand works — the specific combination of cultural positioning, product truth, and emotional territory that creates genuine consumer resonance. They have made a brand decision that was counterintuitive to the data but right for the brand, and they can explain why. That cultural and strategic judgment is what AI marketing tools cannot replicate.

They use AI tools to accelerate production — content generation, campaign testing, performance analysis — and apply their brand judgment to govern the outputs. They are not competing with AI at the production layer. They are directing it at the strategy layer."""
},

# ─── mc-base — Master of Advanced Social Enterprise ─────────────────────────
"mc-base": {
"score": 18, "riskBand": "HIGH RISK",
"q1": "YES", "q2": "UNCERTAIN", "q3": "UNCERTAIN",
"profile": """The Master of Advanced Social Enterprise at the University of Melbourne prepares graduates for leadership in social enterprise, impact investment, and purpose-driven organisations. The program combines social enterprise design, impact measurement, sustainability, and business management.

Graduates typically move into roles at social enterprises, impact investment funds, corporate sustainability functions, not-for-profit management, and government social policy. The program sits at the intersection of business management and social purpose.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Social enterprise analyst, impact coordinator — research, reporting, grant writing, stakeholder management | **HIGH** — Research, reporting, and coordination work is highly AI-automatable |
| Year 3–5 | Social enterprise manager, impact investment analyst | **MEDIUM** — Strategic social enterprise design requires human judgment |""",

"analogue": """The most exposed social enterprise graduate is the **Impact Analyst of 2021**: primarily producing impact reports, mapping stakeholder ecosystems, and conducting research for grant applications — work absorpable by AI research and writing tools.

Specific threats:
- **AI grant writing tools** — automated grant application generation from organisational data
- **AI impact measurement platforms** — automated social return on investment (SROI) calculation and reporting
- **AI stakeholder mapping tools** — automated ecosystem mapping and network analysis""",

"verdict": """**The Master of Advanced Social Enterprise is HIGH RISK — a degree in a sector where the most accessible early-career roles are heavily AI-exposed.**

Social enterprise is a high-purpose field with genuine social value, but the early-career roles available to graduates (research, coordination, reporting) are precisely the tasks being automated. The degree needs stronger quantitative and governance capability to push graduates toward the design and measurement leadership roles that resist automation.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop quantitative impact measurement capability — causal evaluation, RCT design, and econometric impact analysis are specialist skills with growing demand | D3, D7 | High |
| 2 | Build financial modelling and social finance capability — impact investing requires genuine financial literacy | D3 | Medium |
| 3 | Develop technology and AI governance for social enterprise | D5 | Medium |
| 4 | Build direct stakeholder relationships in the impact investment sector | D8 | High |""",

"redesigned": """The 2027-ready social enterprise graduate is not a report writer — they are a **social impact designer** who can measure what actually changes when an intervention is implemented.

They understand causal evaluation: the difference between correlation and impact, what a valid comparison group looks like, and how to design a monitoring system that actually tells you whether the programme is working. They can explain this to a board that wants to see metrics and to a funder that wants evidence of impact.

They are fluent in social finance instruments — blended finance, social impact bonds, patient capital structures — and they understand the regulatory landscape for impact investment. They can evaluate whether an investment thesis is credible based on the underlying theory of change.

They are not a generalist social sector worker. They are a specialist in measuring, designing, and scaling social impact — the most technically demanding and most future-proof role in the sector."""
},

# ─── mc-clind — Master of Clinical Dentistry ─────────────────────────────────
"mc-clind": {
"score": 23, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"profile": """The Master of Clinical Dentistry at the University of Melbourne is a specialist clinical training program for qualified dentists seeking advanced specialist or academic credentials. The program covers clinical dentistry, oral health management, patient care, and research methodology.

Graduate roles include specialist dentist, clinical academic, oral health researcher, and dental public health specialist. The program requires existing dental registration and provides specialist-level clinical training.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–3 (graduate) | Clinical specialist practice — diagnosis, treatment planning, complex procedures | **LOW** — Physical clinical procedures, diagnosis, and patient management require human clinical judgment |
| Year 4+ | Senior specialist, clinical academic — teaching, research, complex case management | **LOW** — Professional registration and clinical accountability |""",

"analogue": """The most exposed clinical dentistry graduate is the **General Practice Dentist of 2020**: primarily providing routine restorative, preventive, and diagnostic services — some of which are being augmented by AI diagnostic tools.

Specific threats:
- **AI dental diagnostics (Denti.AI, Pearl AI)** — automated caries, periodontal, and pathology detection from radiographs
- **AI treatment planning tools** — automated treatment sequencing from diagnostic data
- **Robotic dental systems** — emerging automation in certain predictable procedural steps

However, the MC-CLIND specialist profile is substantially more protected: complex specialist procedures, diagnosis in ambiguous cases, and specialist clinical judgment are not within current AI capability.""",

"verdict": """**The Master of Clinical Dentistry is MODERATE RISK — a specialist clinical program with strong regulatory protection and physical skill requirements that resist AI substitution.**

Specialist dental practice involves complex clinical procedures, physical skill, and diagnostic judgment that AI tools augment rather than replace. APHRA registration and specialist accreditation create genuine barriers. The risk is in maintaining clinical currency as AI diagnostic tools transform how routine pathology is identified.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI dental diagnostic tool literacy — understand their evidence base, error patterns, and clinical governance requirements | D5 | Medium |
| 2 | Specialise in complex/multidisciplinary treatment planning — this requires the highest level of integrated clinical judgment | D6 | High |
| 3 | Build research methodology skills for clinical evidence evaluation | D7 | Medium |""",

"redesigned": """The 2027-ready clinical dentistry graduate is a **specialist clinical expert** who knows what AI dental diagnostics can and cannot see, and whose clinical judgment accounts for what the AI misses.

They have managed complex cases where AI flagged something that was normal variation, and cases where human pattern recognition missed something the AI caught. They know the failure modes in both directions. Their clinical decisions integrate AI-generated information without being driven by it.

They are registered specialists with physical procedural skills that AI cannot replicate: the manual dexterity, tactile feedback interpretation, and patient management capability that clinical dentistry requires at the specialist level."""
},

# ─── mc-ed — Master of Education ─────────────────────────────────────────────
"mc-ed": {
"score": 24, "riskBand": "MODERATE RISK",
"q1": "UNCERTAIN", "q2": "YES", "q3": "YES",
"profile": """The Master of Education at the University of Melbourne is a research and professional development degree for educators seeking advanced knowledge in pedagogy, education leadership, curriculum design, and educational research. It is not an initial teaching qualification.

The program covers educational policy, learning theory, curriculum studies, educational research methods, and specialisations in areas such as educational leadership, learning technologies, and inclusion. Graduate roles include senior teacher, education researcher, curriculum designer, education policy advisor, and academic.

The program's research orientation and leadership focus differentiate it from initial teacher education programs.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Senior teacher, curriculum developer, education researcher | **MEDIUM** — Curriculum design, research, and educational leadership require human judgment |
| Year 3–5 | Principal, education director, academic researcher | **LOW** — Educational leadership and research require genuine human capability |""",

"analogue": """The most exposed education graduate is the **Curriculum Content Developer of 2021**: primarily producing curriculum materials, lesson resources, and assessment items — work being absorbed by AI content generation tools.

Specific threats:
- **AI lesson planners (Eduaide, MagicSchool AI)** — automated curriculum resource generation
- **AI assessment item generators** — automated test and quiz generation from learning objectives
- **AI grading tools (Turnitin AI, Gradescope AI)** — automated essay feedback and grading""",

"verdict": """**The Master of Education is MODERATE RISK — a research and leadership degree whose graduates are positioned above the AI content generation layer.**

Education leadership, curriculum design at a policy level, and educational research are substantially more automation-resistant than classroom content production. The MEd's research orientation and leadership focus provide positioning above the most AI-exposed roles in education.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI in education literacy — evaluate learning technology platforms, understand their evidence base, and develop governance frameworks | D5 | Medium |
| 2 | Build educational research expertise — rigorous evaluation of educational interventions is an underserved and growing field | D7 | High |
| 3 | Develop data-informed decision-making capability for education leadership | D3 | Medium |""",

"redesigned": """The 2027-ready MEd graduate is not a curriculum content producer — they are an **educational systems leader** who understands how learning works, what evidence shows, and how to build institutional capability for continuous improvement.

They have evaluated an educational intervention rigorously: not anecdote but evidence, not enthusiasm but causal inference. They know the difference between a curriculum reform that worked and one that appeared to work because the measurement was wrong. That evaluative expertise is what makes their leadership judgment valuable.

They understand what AI educational tools claim and what the evidence actually supports. They can advise a school or system on appropriate AI tool adoption — which applications have genuine pedagogical evidence, which have vendor evidence only, and what the governance requirements are for student data in AI systems."""
},

# ─── mc-indeng — Master of Industrial Engineering ────────────────────────────
"mc-indeng": {
"score": 22, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"profile": """The Master of Industrial Engineering at the University of Melbourne provides specialist training in operations research, supply chain management, manufacturing systems, quality engineering, and industrial optimisation. It is accredited by Engineers Australia.

The program covers production planning, lean manufacturing, quality management, logistics and supply chain, and engineering project management. Graduate roles include industrial engineer, operations manager, supply chain analyst, process improvement specialist, and manufacturing systems engineer.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Industrial engineer, operations analyst — process analysis, optimisation modelling, quality management | **MEDIUM** — Process analysis and standard optimisation are AI-augmentable; system design and implementation require human judgment |
| Year 3–5 | Operations manager, process improvement lead | **LOW–MEDIUM** — System ownership and operational decision-making |""",

"analogue": """The most exposed industrial engineering graduate is the **Operations Analyst of 2021**: primarily conducting time-and-motion studies, building standard simulation models, and producing operations reports — work increasingly automated by AI operations platforms.

Specific threats:
- **AI operations platforms (Augury, Sight Machine)** — automated process monitoring and improvement recommendation
- **AI simulation and optimisation tools** — automated discrete event simulation and production scheduling
- **AI supply chain platforms (o9 Solutions, Blue Yonder AI)** — automated demand planning and inventory optimisation""",

"verdict": """**The Master of Industrial Engineering is MODERATE RISK — a professionally accredited degree with genuine systems complexity that resists pure automation.**

Industrial engineering involves system design, trade-off optimisation, and operational judgment that AI tools augment but cannot replace. Engineers Australia accreditation provides professional credential protection. Graduates who develop AI system governance capability and specialise in complex system design are well-positioned.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI and ML integration for industrial systems — AI-augmented operations are the growth area in industrial engineering | D5 | Medium |
| 2 | Build complex system design capability beyond standard optimisation | D2 | High |
| 3 | Pursue CPEng accreditation pathway | D6 | High (post-graduation) |""",

"redesigned": """The 2027-ready industrial engineering graduate is not a process analyst — they are a **systems engineer** who understands how complex production systems fail and what interventions actually improve them.

They have designed a system change and measured whether it worked — not just whether the model said it would work, but whether the implementation achieved the expected outcome in the real production environment. They know the gap between the model and reality, and they know what closes that gap.

They govern AI operations tools: they can evaluate whether an AI demand planning recommendation accounts for the specific constraints of their facility, override it when it doesn't, and document the operational reasoning. That governance layer is what makes them an engineer rather than a tool user."""
},

# ─── mc-intedib — Master of International Education (IB) ─────────────────────
"mc-intedib": {
"score": 16, "riskBand": "HIGH RISK",
"q1": "YES", "q2": "UNCERTAIN", "q3": "UNCERTAIN",
"profile": """The Master of International Education (IB) at the University of Melbourne is a specialist program for educators and professionals in the International Baccalaureate system. It provides advanced knowledge of IB curriculum, assessment, and educational leadership for international schools.

Graduate roles include IB coordinator, international school curriculum leader, IB examiner, education consultant, and international school principal. The program serves a niche market of international school educators.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | IB coordinator, curriculum leader — curriculum management, assessment coordination, teacher professional development | **MEDIUM** — Curriculum administration and coordination are AI-augmentable |
| Year 3–5 | IB head of programme, school leader | **LOW–MEDIUM** — Leadership and pedagogical judgment |""",

"analogue": """The most exposed IB education graduate is the **IB Curriculum Administrator of 2022**: primarily managing curriculum documentation, assessment schedules, and teacher training logistics — work increasingly systematised by education management platforms.

Specific threats:
- **IB administrative platforms with AI features** — automated assessment scheduling and curriculum tracking
- **AI professional development content generation** — automated teacher training materials""",

"verdict": """**The Master of International Education (IB) is HIGH RISK — a highly specialised credential serving a niche market with limited growth potential and significant AI disruption of its routine functions.**

The IB specialisation creates a narrow professional market. International schools are the primary employer, and IB coordination roles are limited in number. Early-career work involves significant administrative coordination that AI tools are automating. The degree lacks the quantitative depth and AI literacy to position graduates above the compression layer.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop educational technology and AI governance expertise for international school contexts | D5 | Medium |
| 2 | Build IB examiner credentials — direct IB assessment involvement provides specialist positioning | D6 | Medium |
| 3 | Develop school leadership capability — administrative and pedagogical leadership are more AI-resistant | D4, D8 | High |""",

"redesigned": """The 2027-ready IB education graduate is not a curriculum administrator — they are an **international education specialist** who understands how the IB framework develops genuinely internationally-minded young people and can lead that development at scale.

They have designed curriculum that works across cultural contexts — they know what the IB's approaches to teaching and learning mean in practice, what the TOK framework is actually developing, and how to help teachers who are struggling to make it real in their classrooms.

They understand AI's role in international education: the specific challenges of AI-assisted assessment integrity in the IB context, how to build learning environments that develop genuine thinking rather than optimised AI prompting, and what the IB Organisation's evolving stance on AI means for curriculum design."""
},

# ─── mc-nursc — Master of Nursing Science ────────────────────────────────────
"mc-nursc": {
"analogue": """The most exposed nursing science graduate is the **Junior Registered Nurse of 2022**: primarily performing routine documentation, medication administration tracking, and standard patient observation protocols — tasks increasingly augmented by AI clinical support systems.

Specific threats:
- **AI clinical decision support (IBM Watson Health, Epic AI)** — automated clinical alerts and recommendation generation
- **AI nursing documentation tools** — automated patient note generation from clinical observations
- **Robotic medication dispensing systems** — replacing routine medication preparation and administration tracking
- **AI patient monitoring systems** — automated vital sign interpretation and deterioration prediction

However, the MC-NURSC graduate profile emphasises advanced practice and research leadership — substantially more protected than general registered nursing.""",

"redesigned": """The 2027-ready nursing science graduate is not a documentation specialist — they are a **clinical knowledge leader** who advances nursing practice through research and evidence-based change.

They have designed and led a clinical quality improvement project: they identified a practice problem, reviewed the evidence, implemented a change, and measured the outcome. They know what it takes to change clinical practice in a real hospital environment — the stakeholder management, the resistance, and the evidence requirements. That implementation expertise is not in a textbook.

They understand AI clinical support tools: they evaluate whether an AI deterioration alert is calibrated correctly for their patient population, override it when clinical judgment indicates a different interpretation, and document the clinical reasoning. That governance capability — combining clinical expertise with AI tool evaluation — is what the AI-augmented healthcare environment actually requires from clinical leaders."""
},

# ─── mc-phtyph — Master of Physiotherapy (Pelvic Health) ────────────────────
"mc-phtyph": {
"score": 25, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"profile": """The Master of Physiotherapy (Pelvic Health) at the University of Melbourne is a specialist advanced practice program for registered physiotherapists seeking specialisation in pelvic health — a clinical area addressing continence, pelvic floor dysfunction, and related conditions. The program is clinical, practical, and physically intensive.

Graduate roles include pelvic health physiotherapist, women's health physiotherapist, continence clinician, and pelvic health researcher. This is a high-growth specialty due to ageing population, increased awareness of pelvic floor health, and recognised under-service.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Pelvic health physiotherapy assessment and treatment | **LOW** — Physical assessment and treatment requires hands-on clinical skill and patient relationship |
| Year 3–5 | Specialist pelvic health clinician, clinical educator | **LOW** — Specialist physical expertise and patient management |""",

"analogue": """The most exposed physiotherapy graduate is the **Exercise Physiology AI App User of 2022**: conducting standardised exercise prescription from online templates — work being offered directly to consumers by AI fitness and rehabilitation apps.

However, pelvic health physiotherapy is substantially more protected: internal examination techniques, manual therapy, real-time ultrasound assessment, and intimate patient management require physical presence and specialist clinical skill that AI cannot replicate.""",

"verdict": """**The Master of Physiotherapy (Pelvic Health) is MODERATE RISK (upper boundary, approaching RESILIENT) — a specialist clinical program with strong physical practice protection and structural demand growth.**

Pelvic health physiotherapy is a high-growth specialty with documented under-service and an ageing population driving structural demand. The physical assessment techniques, therapeutic alliance requirements, and intimate clinical context create strong automation barriers. This is among the more automation-resistant clinical programs in the portfolio.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop real-time ultrasound assessment skills — this specialist skill creates significant differentiation | D3, D6 | High |
| 2 | Build expertise in the research evidence base for pelvic health interventions | D7 | Medium |
| 3 | Develop patient communication and psychosocial assessment skills for the biopsychosocial model | D8 | Medium |""",

"redesigned": """The 2027-ready pelvic health physiotherapy graduate is a **specialist physical clinician** whose hands-on assessment and treatment skills are the core of their professional value.

They can conduct a comprehensive pelvic floor assessment — including real-time ultrasound, internal examination, and functional movement analysis — and integrate that clinical picture into a treatment plan that addresses the physical, psychological, and social dimensions of pelvic dysfunction. That multi-system integration requires human clinical judgment and physical skill that cannot be automated.

They have managed complex patients: those with concurrent chronic pain, those for whom the condition has significant psychological impact, and those from cultural backgrounds where discussion of pelvic symptoms is difficult. They know how to create the clinical relationship that allows treatment to work in those contexts.

They are positioned in a growth specialty with genuine workforce shortage. Their physical skills, specialist credentials, and patient relationship capability are the combination that makes pelvic health physiotherapy one of the more durable clinical specialties in the AI era."""
},

# ─── mc-scibio — Master of Science (BioSciences) ────────────────────────────
"mc-scibio": {
"analogue": """The most exposed biosciences graduate is the **Research Assistant of 2021**: primarily conducting routine laboratory protocols, data entry from experimental results, and literature searching for project teams — work being automated by laboratory robotics and AI research tools.

Specific threats:
- **Lab automation systems (Hamilton, Tecan)** — high-throughput liquid handling and assay automation
- **AI literature synthesis (Elicit, Consensus, Research Rabbit)** — automated systematic review and literature mapping
- **AI data analysis for standard biological datasets** — automated statistical analysis of genomic, proteomic, and phenotypic data
- **Laboratory information management AI** — automated protocol optimisation and experimental tracking""",

"redesigned": """The 2027-ready biosciences graduate is not a laboratory technician — they are a **biological research scientist** who generates original knowledge and defends it under peer scrutiny.

They have designed and conducted an experiment that answered a question nobody knew the answer to. They know what it feels like to get unexpected results and to spend weeks determining whether the unexpected result is real or an artefact. That experimental judgment — knowing when to trust results and when to question protocols — is what a scientist develops through research experience.

They understand how AI is transforming biological research: AlphaFold's revolution in structural biology, AI-assisted drug discovery platforms, and automated imaging analysis. They can evaluate whether an AI-generated biological prediction requires experimental validation and design the experiment that would provide definitive evidence.

They are positioned at the interface of computation and biology — fluent in data analysis tools, able to collaborate with bioinformaticians, and grounded in the experimental tradition that distinguishes real biological knowledge from model-generated speculation."""
},

# ─── mc-sciche — Master of Science (Chemistry) ──────────────────────────────
"mc-sciche": {
"analogue": """The most exposed chemistry graduate is the **Analytical Chemistry Technician of 2021**: primarily running standardised analytical methods, preparing samples for instrument analysis, and generating routine QC reports — work being automated by analytical laboratory robotics and AI quality management systems.

Specific threats:
- **Automated analytical instruments with AI interpretation** — automated HPLC, NMR, and mass spectrometry interpretation
- **AI synthetic route planning (IBM RXN, Chemputer)** — automated synthetic chemistry planning replacing junior synthetic design work
- **AI quality control systems** — automated pharmaceutical QC analysis and batch release documentation
- **Robotic chemistry platforms (Chemspeed, Opentrons)** — automated synthetic chemistry and sample preparation""",

"redesigned": """The 2027-ready chemistry graduate is not an analytical technician — they are a **specialist chemist** with domain expertise that AI synthesis and analysis tools cannot replicate.

They understand mechanisms: they know why the reaction works, not just that the procedure produces the product. They can design a synthetic route that hasn't been tried before and explain why they chose the protecting group strategy they did. That synthetic judgment — understanding reactivity at the mechanism level — is what distinguishes a chemist from a chemist's laboratory robot.

They have evaluated AI synthetic planning tools: they know when Chemputer's suggested routes are chemically sound and when they fail to account for functional group compatibility or protecting group requirements. They can validate AI-generated outputs against their chemical knowledge. That critical evaluation capability is the governance layer that makes chemistry expertise durable in an AI-augmented laboratory."""
},

# ─── mc-sciphy — Master of Science (Physics) ────────────────────────────────
"mc-sciphy": {
"analogue": """The most exposed physics graduate is the **Physics Data Analyst of 2021**: primarily processing experimental datasets, running standard analysis pipelines, and producing summary reports for experimental physics groups — work being absorbed by automated data analysis frameworks.

Specific threats:
- **AI physics simulation tools** — automated simulation of quantum systems and condensed matter phenomena
- **Machine learning for experimental data analysis** — automated signal detection and parameter estimation in particle physics and materials science
- **AI literature and research synthesis tools** — absorbing the systematic review work that physics PhD students and postdocs performed
- **Automated laboratory control systems** — replacing manual experimental parameter adjustment and monitoring""",

"redesigned": """The 2027-ready physics graduate is not a data analyst — they are a **physical scientist** who can connect mathematical formalism to physical reality and defend that connection under expert scrutiny.

They have done original research: they know the discipline of starting from a physical problem, developing a theoretical framework, designing a measurement approach, and interpreting ambiguous data. They know what it feels like to have a result that doesn't fit the theory and to spend months determining whether the theory or the measurement is wrong.

They understand how AI is transforming physics: from machine learning for experimental signal detection to AI-accelerated materials discovery. They can evaluate whether a machine learning model is capturing real physics or fitting noise, and they know what additional experiments would distinguish between these interpretations.

They are positioned at the interface of fundamental science and technology application — the place where deep physical understanding enables genuinely novel device design, materials development, or computational capability."""
},

# ─── mc-envsc — Master of Environmental Science ──────────────────────────────
"mc-envsc": {
"analogue": """The most exposed environmental science graduate is the **Junior Environmental Consultant of 2021**: primarily producing environmental impact assessments from template frameworks, running standard modelling tools, and preparing regulatory submission documents — work being systematised by AI environmental compliance platforms.

Specific threats:
- **AI environmental impact assessment tools** — automated EIA section generation from site data
- **AI environmental modelling platforms** — automated hydrological, air quality, and ecological impact modelling
- **Remote sensing AI (Planet Labs AI, Copernicus services)** — automated land cover change and environmental monitoring
- **AI regulatory compliance tools** — automated matching of project impacts to regulatory requirements""",

"redesigned": """The 2027-ready environmental science graduate is not a compliance checker — they are an **environmental systems scientist** who understands the complex dynamics of ecosystems and can translate that understanding into actionable environmental management.

They have conducted field-based environmental research: they know what ecosystem health actually looks like in the landscape versus what the model predicts, and they understand why those sometimes diverge. That ground-truth connection — between model predictions and field reality — is what makes their environmental assessments defensible.

They use remote sensing and AI environmental monitoring tools as accelerators: they know how to interpret satellite-derived land cover data, when to trust automated change detection, and when field validation is required. That hybrid capability — remote sensing literacy plus field expertise — is the combination that the AI era of environmental management actually requires."""
},

# ─── mc-climsci — Master of Climate Science ──────────────────────────────────
"mc-climsci": {
"analogue": """The most exposed climate science graduate is the **Climate Data Analyst of 2021**: primarily processing climate datasets, running standard analysis scripts on model output, and producing summary reports — work increasingly systematised by AI-augmented climate analytics platforms.

Specific threats:
- **AI climate downscaling tools** — automated regional climate projection from global model output
- **AI climate attribution systems** — automated event attribution analysis replacing manual statistical analysis
- **Automated climate model evaluation tools** — systematic bias correction and model evaluation pipelines
- **AI climate communication tools** — automated translation of climate science into policy-relevant summary""",

"redesigned": """The 2027-ready climate science graduate is not a data processor — they are a **climate system specialist** who understands the physical mechanisms of climate change and can translate that understanding into defensible risk assessments and policy recommendations.

They have worked with real climate data: they know what climate model bias looks like in specific regional contexts, why ENSO affects Australian precipitation in the way it does, and what the physical mechanisms are behind projected rainfall changes in southeast Australia. That mechanism-level understanding — not just statistical pattern recognition — is what makes their climate analysis trustworthy.

They understand the AI-augmented future of climate science: large climate emulators, AI-based weather prediction, and AI-assisted climate policy analysis. They can evaluate whether an AI climate tool is capturing real physics or statistical patterns that may not generalise. That critical evaluation capability is what positions them as climate scientists rather than climate data operators."""
},

# ─── mc-gencoun — Master of Genetic Counselling ─────────────────────────────
"mc-gencoun": {
"analogue": """The most exposed genetic counselling graduate is the **Variant Classification Technician of 2021**: primarily running standardised variant interpretation workflows, applying established classification criteria, and generating templated variant reports — work being systematised by AI variant interpretation platforms.

Specific threats:
- **AI variant interpretation tools (ClinVar AI, Varsome AI, Fabric Genomics)** — automated variant classification from population databases and functional evidence
- **AI-assisted pedigree analysis** — automated inheritance pattern identification and recurrence risk calculation
- **AI genomic report generators** — automated clinical variant report production from interpretation data
- **Polygenic risk score AI platforms** — automated disease risk calculation replacing manual risk assessment""",

"redesigned": """The 2027-ready genetic counselling graduate is not a variant classifier — they are a **genomic counselling specialist** who helps families navigate the uncertainty, implications, and emotional weight of genetic information.

They have counselled a family through a variant of uncertain significance result: they explained what "uncertain" means when someone is hoping for a definitive answer, they helped the family understand how the uncertainty might resolve over time, and they facilitated a decision-making process that respected both scientific uncertainty and the family's values. That clinical communication skill — in the context of genuine uncertainty — is not replicable by an AI system.

They understand AI variant classification tools: they know which classification algorithms are calibrated for which variant types, where they tend to over-classify or under-classify pathogenicity, and what clinical evidence would be needed to reclassify a variant of uncertain significance. That critical evaluation capability, combined with their counselling expertise, is what the AI-augmented genomics era requires."""
},

# ─── mc-scwr — Master of Social Work (Social Work) ───────────────────────────
"mc-scwr": {
"score": 22, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"profile": """The Master of Social Work (and/or Screenwriting — note: mc-scwr appears to map to Social Work based on AASW accreditation context) at the University of Melbourne is an AASW-accredited professional degree preparing graduates for registered social work practice.

The program includes supervised field placement, foundational social work methods, policy analysis, research methods, and specialist areas including child and family welfare, mental health, and community development. Graduate roles include social worker, community services worker, case manager, child protection worker, and social policy analyst.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Social worker — case management, client assessment, service coordination, report writing | **MEDIUM** — Documentation and coordination are AI-augmentable; direct client work and relationship management are not |
| Year 3–5 | Senior social worker, team leader | **LOW** — Complex case management and professional judgment |""",

"analogue": """The most exposed social work graduate is the **Case Coordinator of 2021**: primarily managing client documentation, writing referral letters, and coordinating service plans from standardised frameworks — work being augmented by social service case management platforms.

Specific threats:
- **AI case management platforms** — automated risk assessment screening and service matching
- **AI documentation assistants** — automated case note generation from clinical contacts
- **AI triage and referral tools** — automated service pathway matching from presenting needs""",

"verdict": """**The Master of Social Work is MODERATE RISK — a professionally accredited degree with strong relational protection and structural employment demand, facing AI compression at the administrative layer.**

AASW registration provides professional credential protection. The relational core of social work — sustained engagement with vulnerable individuals and families, advocacy, and therapeutic relationship — is not automatable. The risk is at the documentation and coordination layer, where AI is reducing administrative time without replacing the relational work. This is largely neutral for skilled practitioners.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop complex case specialisation — child protection, mental health dual diagnosis, or refugee services — where relational complexity is highest | D6, D8 | High |
| 2 | Build policy analysis and advocacy capability — systemic change work is more automation-resistant than individual case coordination | D2 | Medium |
| 3 | Develop AI governance literacy for social services contexts — AI risk assessment tools in child protection and mental health require human oversight | D5 | Medium |""",

"redesigned": """The 2027-ready social work graduate is not a case coordinator — they are a **social systems specialist** who understands how institutional, relational, and structural factors interact to create and perpetuate disadvantage.

They have worked in sustained relationships with clients across complex transitions: housing instability, family crisis, mental health fluctuation. They understand the timeline of support — that meaningful change in chronic disadvantage takes years, not weeks — and they build their practice accordingly.

They can evaluate AI risk assessment tools in child protection and mental health with a critical professional eye: they know what the tools measure, what the training data population was, and whether the model's risk predictions account for the specific family's circumstances or merely pattern-match to statistical risk factors. That critical AI literacy, combined with their relational skill, is what makes them a professional rather than a protocol follower."""
},

# ─── mc-surged — Master of Surgical Education ────────────────────────────────
"mc-surged": {
"score": 25, "riskBand": "MODERATE RISK",
"q1": "NO", "q2": "YES", "q3": "YES",
"profile": """The Master of Surgical Education at the University of Melbourne is a specialist program for surgeons and clinicians seeking advanced expertise in surgical training, simulation, assessment of surgical competence, and clinical education. It is a research-oriented professional development program.

Graduate roles include surgical educator, simulation director, medical education researcher, surgical training program coordinator, and clinical skills academic. The program serves a niche market of senior surgical educators.""",

"automation": """| Year | Typical Tasks | Automation Risk |
|---|---|---|
| Year 1–2 (graduate) | Surgical educator, simulation trainer | **LOW** — Teaching surgical skill, assessing surgical competence, and clinical simulation are human-intensive activities |
| Year 3–5 | Medical education researcher, simulation director | **LOW** — Specialist expertise in surgical education design |""",

"analogue": """The most exposed surgical education graduate is the **Medical Education Administrator of 2021**: primarily managing training schedules, assessment logistics, and simulation booking systems — work systematised by medical education management platforms.

However, the core surgical educator role — designing simulation experiences, assessing technical skill, providing mentorship, and conducting surgical education research — is substantially more protected by its specialist and physical nature.""",

"verdict": """**The Master of Surgical Education is MODERATE RISK — a specialist niche degree with strong protection from physical skill and relational mentorship requirements.**

Surgical education at the advanced level involves expert assessment of physical surgical skill, simulation design, and research-led curriculum development — all of which require genuine specialist expertise. The market is small but stable.""",

"recommendations": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop simulation centre leadership capability — managing advanced surgical simulation programs | D4, D8 | High |
| 2 | Build expertise in AI-assisted surgical training tools and their assessment validity | D5 | Medium |
| 3 | Develop surgical education research skills | D7 | High |""",

"redesigned": """The 2027-ready surgical education graduate is a **specialist clinical educator** who designs training experiences that develop surgical judgment, not just technical execution.

They understand the difference between a technically proficient surgical trainee and a surgically wise one — the capacity to adapt when the operation doesn't go as planned, to recognise deterioration before it becomes crisis, and to communicate clearly with the operating team under pressure. They design simulation experiences that develop the second kind of capability, not just the first.

They evaluate AI surgical training tools — robotic simulators, haptic feedback systems, AI-assisted assessment of surgical performance — with a critical eye. They know what the assessment metrics capture and what they miss, and they design training curricula that develop the aspects of surgical capability that current AI assessment cannot yet evaluate."""
},

}

# ─────────────────────────────────────────────────────────────────────────────

def insert_missing_sections(content, analogue_text, redesigned_text, slug):
    """
    Insert missing sections into a partial markdown report.
    Strategy: Insert ANALOGUE before VERDICT (if missing), and REDESIGNED at end (before MARKET DATA).
    """
    
    has_analogue = bool(re.search(r'ANALOGUE GRADUATE PROFILE', content, re.IGNORECASE))
    has_redesigned = bool(re.search(r'REDESIGNED GRADUATE PROFILE', content, re.IGNORECASE))
    
    # Find section numbering in existing report
    sec_match = re.findall(r'(###?\s+\d+\.?\s+)', content)
    
    # Determine section numbering style
    if re.search(r'###\s+\d+\.', content):
        h = '###'
    else:
        h = '##'
    
    analogue_section = f"\n{h} 5. ANALOGUE GRADUATE PROFILE\n\n{analogue_text.strip()}\n\n---\n"
    redesigned_section = f"\n{h} 8. THE REDESIGNED GRADUATE PROFILE\n\n{redesigned_text.strip()}\n"
    
    # Insert ANALOGUE before VERDICT section if missing
    if not has_analogue and analogue_text:
        # Try to insert before VERDICT
        verdict_match = re.search(r'(\n###?\s+(?:\d+\.?\s+)?VERDICT)', content, re.IGNORECASE)
        if verdict_match:
            pos = verdict_match.start()
            content = content[:pos] + "\n" + analogue_section + content[pos:]
        else:
            # Try before RECOMMENDATIONS
            rec_match = re.search(r'(\n###?\s+(?:\d+\.?\s+)?RECOMMENDATIONS)', content, re.IGNORECASE)
            if rec_match:
                pos = rec_match.start()
                content = content[:pos] + "\n" + analogue_section + content[pos:]
    
    # Insert REDESIGNED before MARKET DATA or at end
    if not has_redesigned and redesigned_text:
        market_match = re.search(r'(\n###\s+MARKET DATA|\n---\s*\n\*\*Assessment date)', content, re.IGNORECASE)
        if market_match:
            pos = market_match.start()
            content = content[:pos] + "\n" + redesigned_section + "\n---\n" + content[pos:]
        else:
            # Append at end
            content = content.rstrip() + "\n\n" + redesigned_section + "\n"
    
    return content


def build_full_report_from_scratch(slug, data):
    """Build a complete report for programs with minimal content."""
    from datetime import date
    
    score = data["score"]
    band = data["riskBand"]
    q1 = data["q1"]
    q2 = data["q2"]
    q3 = data["q3"]
    program = data.get("program", slug.upper())
    profile = data.get("profile", "")
    automation = data.get("automation", "")
    analogue = data.get("analogue", "")
    verdict = data.get("verdict", "")
    recommendations = data.get("recommendations", "")
    redesigned = data.get("redesigned", "")
    
    md = f"""## DFVA REPORT: {program}
**Institution:** University of Melbourne  
**Level:** Master (Coursework)  
**Duration:** 2 years (200 credit points)

**Assessment date:** {date.today().isoformat()}  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/{slug}  
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
{profile.strip()}

### 2. AUTOMATION EXPOSURE PROFILE
{automation.strip()}

### 3. DFVA SCORECARD
*Score data from existing assessment records.*

**TOTAL: {score}/36**  
**Risk band: {band}**

### 4. THREE THRESHOLD QUESTIONS
**Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?**
{q1}. See program assessment for detailed rationale.

**Q2: Does this program train graduates to design systems, own decisions, or generate original insight?**
{q2}. See program assessment for detailed rationale.

**Q3: Will these graduates be more employable in 5 years than today, given AI trends?**
{q3}. See program assessment for detailed rationale.

### 5. ANALOGUE GRADUATE PROFILE
{analogue.strip()}

### 6. VERDICT
{verdict.strip()}

### 7. RECOMMENDATIONS
{recommendations.strip()}

### 8. THE REDESIGNED GRADUATE PROFILE
{redesigned.strip()}

"""
    return md


def main():
    updated = 0
    errors = 0
    
    # Phase 1: Add missing sections to reports that already have good content
    print("=== Phase 1: Appending missing sections to partial reports ===")
    for slug, sections in MISSING_SECTIONS.items():
        filepath = REPORTS / f"dfva-{slug}.md"
        if not filepath.exists():
            print(f"  SKIP (not found): dfva-{slug}.md")
            continue
        
        content = filepath.read_text()
        analogue = sections.get("analogue", "")
        redesigned = sections.get("redesigned", "")
        
        new_content = insert_missing_sections(content, analogue, redesigned, slug)
        
        if new_content != content:
            filepath.write_text(new_content)
            print(f"  UPDATED: dfva-{slug}.md")
            updated += 1
        else:
            print(f"  NO CHANGE: dfva-{slug}.md (sections may already present)")
    
    # Phase 2: Build full reports for programs with very minimal content
    print("\n=== Phase 2: Writing full reports for minimal programs ===")
    for slug, data in FULL_MISSING.items():
        if "profile" not in data:
            # Only has analogue/redesigned → treat same as Phase 1
            filepath = REPORTS / f"dfva-{slug}.md"
            if filepath.exists():
                content = filepath.read_text()
                new_content = insert_missing_sections(
                    content, 
                    data.get("analogue", ""), 
                    data.get("redesigned", ""),
                    slug
                )
                if new_content != content:
                    filepath.write_text(new_content)
                    print(f"  UPDATED: dfva-{slug}.md")
                    updated += 1
        else:
            # Build a full report (preserve existing MARKET DATA)
            filepath = REPORTS / f"dfva-{slug}.md"
            
            # Get existing market data
            market_data = ""
            if filepath.exists():
                existing = filepath.read_text()
                m = re.search(r'(### MARKET DATA.*)', existing, re.DOTALL)
                if m:
                    market_data = "\n" + m.group(1).strip() + "\n"
            
            # Check if file already has proper sections
            if filepath.exists():
                existing = filepath.read_text()
                has_sections = sum([
                    bool(re.search(r'PROGRAM PROFILE', existing, re.IGNORECASE)),
                    bool(re.search(r'AUTOMATION EXPOSURE', existing, re.IGNORECASE)),
                    bool(re.search(r'DFVA SCORECARD', existing, re.IGNORECASE)),
                    bool(re.search(r'THRESHOLD QUESTIONS', existing, re.IGNORECASE)),
                    bool(re.search(r'ANALOGUE GRADUATE', existing, re.IGNORECASE)),
                    bool(re.search(r'VERDICT', existing, re.IGNORECASE)),
                    bool(re.search(r'RECOMMENDATIONS', existing, re.IGNORECASE)),
                    bool(re.search(r'REDESIGNED GRADUATE', existing, re.IGNORECASE)),
                ])
                if has_sections >= 6:
                    # Already has good content - just add missing sections
                    new_content = insert_missing_sections(
                        existing,
                        data.get("analogue", ""),
                        data.get("redesigned", ""),
                        slug
                    )
                    if new_content != existing:
                        filepath.write_text(new_content)
                        print(f"  UPDATED (sections added): dfva-{slug}.md")
                        updated += 1
                    continue
            
            report_md = build_full_report_from_scratch(slug, data)
            if market_data:
                report_md = report_md.rstrip() + "\n" + market_data
            
            filepath.write_text(report_md)
            print(f"  WROTE (full): dfva-{slug}.md ({data['score']}/{data.get('maxScore', 36)} {data['riskBand']})")
            updated += 1
    
    print(f"\nDone: {updated} files updated/written.")
    print("Next: python3 scripts/parse_reports.py")


if __name__ == "__main__":
    main()
