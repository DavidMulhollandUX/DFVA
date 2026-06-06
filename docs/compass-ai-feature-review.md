# COMPASS AI Feature Review: Competitive Analysis & Product Recommendations

*Prepared June 2026. Covers CourseLeaf, Modern Campus Curriculum, Coursedog, and COMPASS current state.*
*Includes: AI Feature PRDs, Comparative Matrix, Gap Analysis, and Prioritised Improvement Recommendations.*

---

## Part 1: AI Feature PRDs

### CourseLeaf AI Feature PRD

**Product AI Vision:** CourseLeaf prioritises workflow integrity and data accuracy over AI augmentation; its "intelligence" is entirely rule-based automation designed to reduce administrative error and compliance risk rather than generate insight or prediction.

**AI Maturity Rating:** Early — CourseLeaf has no shipped machine learning, NLP, or generative AI features. Every automated capability relies on deterministic rules engines, graph traversal over structured data, or form validation logic. The product roadmap contains no public AI announcements as of mid-2026.

**Feature Inventory:**

| Feature | Status | User Story | Acceptance Criteria | Technical Approach | Limitations |
|---|---|---|---|---|---|
| Inclusive Curriculum Tool (DEIB Language Checker) | Shipped | As a curriculum administrator, I want flagged non-inclusive language in course descriptions before they enter the approval workflow so that catalog copy meets institutional DEIB standards without manual review. | Flagged terms are highlighted inline within the CIM proposal form before submission; the proposal cannot advance without acknowledgement of flagged items; flag list is configurable by institution. | Rules-based term matching against a curated prohibited/flagged term list. No NLP, no semantic analysis, no ML. | Cannot detect context-dependent bias; cannot suggest replacement language; no understanding of meaning or intent; term list requires manual curation and maintenance. |
| Automated Impact Analysis | Shipped | As a faculty member proposing a course change, I want to see every downstream program, requirement, and catalog entry affected by my proposal before it enters governance so that I do not inadvertently break degree requirements. | A visual impact map is generated and displayed before workflow submission; all directly and transitively dependent programs, requirements, and catalog entries are identified; zero false negatives on direct dependencies. | Graph traversal over the CIM relational data model connecting courses to programs, requirements, and catalog entries. Not ML. Accuracy is contingent on data model completeness. | Automation only — no assessment of strategic, enrolment, or labour market impact. Cannot evaluate whether a change is advisable, only what it touches structurally. |
| CLSS Snapper — Meeting Pattern Auto-Suggestion & Conflict Visualisation | Shipped | As a departmental scheduler, I want the system to surface valid meeting pattern options and visually flag conflicts when I place a section so that I spend less time manually checking against institutional scheduling rules. | Standard meeting patterns are surfaced as options on section placement; room conflicts and course conflicts are highlighted in real time on the drag-and-drop calendar; no valid section placement produces a false conflict flag. | Rule-based constraint checking against institutional scheduling rules and room availability data. Pattern matching, not ML. | No predictive enrolment forecasting; no demand-side intelligence; no learning or adaptation over time; purely reactive to placement actions. |
| CLSS Course Demand Analytics | Shipped | As a schedule planner, I want to see historical enrolment trends and waitlist data alongside section capacity fields so that I can make informed decisions about how many sections to offer and at what size. | Trend indicators and historical enrolment data are visible in the scheduling interface alongside section capacity inputs; waitlist volumes and seat fill rates are surfaced per course; data refreshes at least once per term cycle. | Statistical descriptive analytics on historical SIS enrolment data. Trend visualisation rather than predictive modelling. | Descriptive not predictive — no demand forecast, no regression model, no ML. Users must interpret trends themselves. No labour market or curriculum viability context. |
| SYL Syllabus Compliance & Audit Trail Automation | Shipped | As a compliance officer, I want mandatory syllabus fields enforced at submission and a versioned archive maintained automatically so that the institution can demonstrate state transparency mandate compliance and produce accreditation evidence on demand. | Proposals with missing mandatory fields (instructor credentials, learning objectives, grading criteria, assignment schedule) cannot be submitted; version history is stored with timestamps and actor identifiers; access controls allow granular public/private configuration per field. | Form validation, workflow enforcement rules, and automated document archiving. No AI component. | Compliance automation only. No AI-driven analysis of learning objective quality, no syllabus improvement suggestions, no NLP evaluation of instructional alignment. |
| Nuventive Integration for Curriculum-Assessment Data Sharing | Shipped | As an assessment coordinator, I want curriculum data from CIM to automatically populate in Nuventive without re-entry so that I can begin assessment planning immediately after curriculum approval. | Course and program data created or modified in CIM is reflected in Nuventive within one business day of approval; no manual data re-entry is required; field mapping is configurable by institution. | Bidirectional API integration between CIM and Nuventive. Not AI-native. | Integration enablement only — no AI-driven gap analysis, viability scoring, or generative capability on either platform side. |
| Generative AI / LLM Features | Absent | N/A | N/A | N/A | No generative AI, LLM, or NLP-based features shipped or announced as of mid-2026. CourseLeaf 10 added Reporting Engine and UX improvements only. No public AI roadmap. |

**AI Architecture:** Rule-based throughout. CourseLeaf's automation stack is deterministic: term-list matching (DEIB checker), graph traversal (impact analysis), constraint checking (CLSS scheduler), form validation (syllabus compliance), and API plumbing (Nuventive integration). There is no machine learning model, no language model, no probabilistic component, and no adaptive behaviour anywhere in the product. The architecture reflects a deliberate product philosophy: correctness and auditability over intelligence.

**Competitive AI Position:** CourseLeaf sits at the bottom of the AI maturity curve in this category. Its competitive advantage is not intelligence but operational depth: years of SIS integration investment, a well-understood compliance automation story, and a reliable governance workflow engine trusted by hundreds of institutions. This is a defensible but increasingly exposed position. As Coursedog builds out ML-based scheduling optimisation, embedded labour market intelligence, and an AI evaluation feedback loop, and as the category shifts toward predictive and generative capabilities, CourseLeaf's rule-based automation will be repositioned by competitors as table stakes rather than differentiation. CourseLeaf has no published AI roadmap and no evidence of active development in this direction. For institutions evaluating platforms on future AI capability, CourseLeaf represents the lowest risk for those who want proven workflow stability and the highest risk for those who need curriculum intelligence to be competitive.

---

### Modern Campus AI Feature PRD

**Product AI Vision:** Modern Campus is building a connected campus engagement and retention platform where AI is applied at the student-facing and web marketing layer; its curriculum and academic operations products remain automation-only, with no AI-driven academic intelligence shipped as of mid-2026.

**AI Maturity Rating:** Developing — Modern Campus has shipped one genuine AI-adjacent capability (OpenAI BYOK integration in its CMS) and positions its student retention analytics as predictive, but the AI maturity of its curriculum and catalog products is equivalent to CourseLeaf: rule-based automation only. The AI investment is concentrated in the wrong part of the product portfolio for curriculum management buyers.

**Feature Inventory:**

| Feature | Status | User Story | Acceptance Criteria | Technical Approach | Limitations |
|---|---|---|---|---|---|
| Automated Curriculum Approval Workflows (Curriculog) | Shipped | As a curriculum governance administrator, I want configurable multi-step approval routing that automatically notifies the next approver and surfaces bottlenecks so that I can reduce the time proposals spend waiting in queues. | Proposals route to the correct approver role without manual reassignment; automated notifications fire at each stage transition; bottleneck reports identify proposals stalled beyond a configurable threshold; reported 50% reduction in cycle time achievable on standard workflows. | Configurable workflow engine with role-based routing rules. Not AI/ML. | No AI component. Automation is rules-based. Does not generate insights about curriculum quality, viability, or labour market alignment. Workflow speed improvement only. |
| Outcomes Mapping & Accreditation Support | Shipped | As a program coordinator, I want course learning outcomes mapped to program outcomes and accreditation standards within the proposal workflow so that I can generate accreditation evidence without manual compilation. | Learning outcomes can be associated with program outcomes and named accreditation standards within the CIM form; impact reports show how proposed changes affect outcome coverage; evidence records are maintained centrally and exportable for accreditation bodies. | Structured data mapping within the workflow engine. Outcomes edited independently of proposals. No AI-driven gap detection. | Not AI-powered. Gap analysis is a manual process supported by data structure, not automated detection. Less comprehensive than dedicated assessment platforms (eLumen, HelioCampus). AI cannot identify unmapped outcomes or recommend alignment improvements. |
| Omni CMS — OpenAI Integration for Content Generation | Shipped | As a web content manager, I want an AI-assisted drafting button on CMS page parameters so that I can generate first-draft web copy faster without leaving the CMS interface. | 'AI Generate' button appears on Page Parameters fields in CMS version 2025.1+; content is generated using the institution's connected OpenAI API key; generated content is editable before publication; no content is published without human review. | BYOK (Bring Your Own Key) OpenAI API integration. Modern Campus provides the integration framework; the institution supplies and funds the OpenAI subscription. Not a native LLM deployment. | Requires institution to hold and fund its own OpenAI API key. Not integrated with curriculum or catalog data. Purely a web CMS content tool — no connection to program information, learning outcomes, or academic workflow. Generates web marketing copy only. |
| Instinct Personalisation Engine | Shipped | As a digital marketing director, I want website content and calls-to-action to adapt based on whether a visitor is a prospective student, current student, or alumnus so that each audience sees relevant pathways without manual page duplication. | Content blocks render different copy and CTAs based on visitor segment derived from SIS/CRM data; segment assignment is based on login state or CRM profile; A/B testing capability available; engagement metrics tracked per segment. | Rules-based and data-driven personalisation using SIS/CRM integration. Not described as an ML recommendation engine. | Marketing personalisation tool, not generative AI. No curriculum management connection. Cannot personalise based on academic history or program interests beyond predefined segment rules. |
| Student Retention Predictive Analytics | Shipped | As a student success director, I want an early warning dashboard that surfaces at-risk students using signals from grades, engagement, and attendance so that advisors can intervene before a student stops out. | At-risk score is calculated per student and updated on a defined schedule; dashboard shows risk distribution across the student population; alert workflows route flagged students to assigned advisors; average outcome improvement of 1.41 credit hours per semester is the documented benchmark. | Analytics infrastructure with data consolidation from SIS, LMS, and CRM. Marketed as predictive but technical depth of ML modelling not publicly documented — may be statistical threshold rules rather than trained ML models. | Predictive modelling depth not independently verified. May be statistical thresholds rather than true ML. Does not connect to curriculum management. Custom ML models for institution-specific risk patterns require additional third-party tooling. |
| Generative AI for Curriculum / Academic Operations | Absent | N/A | N/A | N/A | No generative AI or LLM-based features shipped or announced for Curriculum (Curriculog), catalog, or academic operations modules as of mid-2026. AI capability is limited to the CMS OpenAI BYOK integration. |

**AI Architecture:** Hybrid at the platform level, but rule-based within the curriculum product. Modern Campus operates across multiple product lines with different AI maturity levels. The CMS OpenAI integration is a genuine LLM touchpoint (delegated to institution-owned OpenAI). The retention analytics layer is described as predictive but the underlying modelling approach is not publicly validated — it may be rule-based thresholds with a predictive marketing label. The Instinct personalisation engine is rules-based with data-driven segment matching. The Curriculum product (Curriculog) is entirely rule-based workflow automation with no AI component.

**Competitive AI Position:** Modern Campus has made a strategic bet that AI's most immediate value in higher education is at the student engagement and marketing layer (web personalisation, retention early warning) rather than in academic operations. This is a coherent but limiting position for curriculum management buyers. The OpenAI BYOK CMS integration is the only shipped LLM capability in the product suite, and it is deliberately disconnected from curriculum data — it generates web marketing copy, not academic intelligence. The curriculum product (Curriculog) competes on workflow maturity and governance configurability, not AI. For institutions evaluating Modern Campus specifically for curriculum management and program review capability, the AI story is non-existent. The risk for Modern Campus is that its AI investments are concentrated in a part of the product (student engagement, marketing) where purpose-built competitors like EAB, Civitas Learning, and Salesforce Education Cloud are already further advanced, while the curriculum product is left exposed to Coursedog's accelerating AI capability gap.

---

### Coursedog AI Feature PRD

**Product AI Vision:** Coursedog is building an Intelligent Academic Operations Platform where machine learning, labour market data, and AI-driven analytics are embedded natively across scheduling, curriculum, catalog, and assessment — connecting data that has historically lived in siloed systems to enable evidence-based academic decision-making.

**AI Maturity Rating:** Mature — Coursedog is the most AI-capable competitor in this category with confirmed shipped ML features (demand forecasting, schedule optimisation), a documented technical approach for the regression model, a strategic labour market intelligence partnership (Mapademics), an AI analytics brand layer (Coursedog Intelligence), and two major ecosystem acquisitions/partnerships in 2025-2026 (ClassRanked acquisition, eLumen partnership). No generative AI is confirmed shipped, which caps the rating below Advanced.

**Feature Inventory:**

| Feature | Status | User Story | Acceptance Criteria | Technical Approach | Limitations |
|---|---|---|---|---|---|
| AI-Powered Course Scheduling Optimisation | Shipped | As a registrar, I want conflict-free academic schedules generated automatically from faculty preferences, student needs, and room constraints so that I can produce a valid initial schedule in hours rather than weeks. | Generated schedule has zero hard conflicts (faculty double-booking, room double-booking, required course time clashes); faculty preference satisfaction rate is measurable and reportable; room utilisation improves versus manual baseline; schedule can be generated and reviewed before SIS publish. | Machine learning-based constraint satisfaction for schedule generation. Integrates with SIS for faculty availability, room inventory, and section data. Specific algorithm not publicly disclosed. | Specific ML algorithm not publicly documented. Integration quality is contingent on SIS data completeness and cleanliness. Does not replace human review for soft constraints (faculty equity, department preferences). |
| Section Demand Analytics — Multivariate Regression Forecasting | Shipped | As a schedule planner, I want a data-driven enrolment forecast for each course section displayed directly in the scheduling interface so that I can set maximum enrolment capacity before room scheduling, reducing both over-capacity errors and unmet demand. | Forecast is generated for all courses with at least one week of historical enrolment data; forecasts update weekly and within 30 minutes of section changes; forecast is displayed in-interface alongside capacity input field; forecast accuracy is measurable against actual enrolment post-start-date; program map inference is used to augment historical patterns. | Multivariate linear regression on historical SIS enrolment data (course.id and section.id), augmented with inferred program map and degree requirement data. Requires minimum one week of historical data to initialise. Weekly refresh cycle with near-real-time update on section changes. | Linear regression may underperform for courses with high variability or non-linear enrolment patterns (new courses, courses affected by curriculum changes, small cohort programs). Requires sufficient historical data — new programs have limited forecasting utility at launch. Forecasts are pre-start-date only; post-start shows actuals not updated projections. |
| Coursedog Intelligence — Platform-Wide AI Analytics Layer | Shipped | As an academic operations leader, I want AI-powered insights embedded in my scheduling, curriculum, and assessment workflows so that I can surface patterns and automate data population between modules without custom integration work. | AI insights are accessible within scheduling, curriculum, and assessment modules; data auto-population between curriculum and assessment modules reduces manual re-entry to zero for covered fields; accreditation reporting automation reduces preparation cycle time by a measurable percentage versus baseline. | AI layer across the platform — specific algorithms not publicly disclosed. Encompasses both automation of data population between modules and AI-assisted accreditation reporting. Branded as 'Coursedog Intelligence' on Ellucian Marketplace. | Technical depth of 'AI' component not fully documented — may include both ML and rules-based automation under one brand. No independent validation of AI claims. Accreditation automation specifics not detailed publicly. |
| Mapademics Labour Market Intelligence Integration | Shipped | As a curriculum committee member reviewing a program proposal, I want labour market data showing employer demand, occupational pathways, and in-demand skills displayed in-workflow so that my approval decision is informed by evidence of real-world graduate outcomes, not just internal academic judgement. | LMI widgets are embedded at the course and program level within the curriculum approval workflow; public catalog displays white-labelled LMI data to prospective students browsing programs; data reflects current job posting and compensation data updated on Mapademics' standard refresh cycle; implementation is achievable within three months per documented case study. | Mapademics platform unifies education, workforce, and hiring data through a common skills language taxonomy. Integration embeds pre-built LMI data widgets. Data sourced from job postings, career profiles, and compensation data. Not a native Coursedog capability — partnership-based. | Currently available in US, Canada, and UK only — not available in Australia. Partnership is not exclusive (Mapademics also works with Lightcast/Skillabi and others). Skills taxonomy currency depends on Mapademics data update cycle. Integration adds LMI context but does not generate curriculum recommendations from it. |
| ClassRanked — AI-Driven Course Evaluations & Feedback Loop | Shipped | As a curriculum designer, I want teaching effectiveness data from course evaluations to feed directly into my curriculum management and scheduling decisions so that student feedback creates a closed loop from experience back to program design. | Mobile-friendly evaluation delivery achieves higher completion rates than legacy systems; faculty receive real-time dashboards of evaluation results; evaluation data is accessible within the Coursedog curriculum management module for program review; SIS and LMS integrations enable native delivery without manual administration. | ClassRanked platform integrated into Coursedog via April 2026 acquisition. AI-driven evaluation delivery and analytics. Mobile-first delivery design. Feedback data pipeline into curriculum management and scheduling modules. | Very recent acquisition (April 2026) — integration depth and data pipeline maturity between ClassRanked and Coursedog modules not yet documented. AI specifics of evaluation analysis not publicly detailed. Full feedback-to-curriculum loop is aspirational at time of acquisition. |
| eLumen Partnership — Outcomes Assessment & Accreditation Integration | Shipped | As an accreditation coordinator, I want student learning outcome data from curriculum management to flow directly into accreditation planning and reporting tools without re-entry so that I can produce evidence packages in days rather than weeks. | Curriculum and catalog data from Coursedog is accessible within eLumen without manual re-entry; bidirectional SIS data sync operates on a defined refresh schedule; eLumen Insights for Canvas Outcomes is integrated; assessment planning can begin immediately after curriculum approval. | API integration between Coursedog curriculum/catalog and eLumen assessment/accreditation platforms. Bidirectional SIS data sync. eLumen selected Coursedog as its exclusive curriculum/catalog partner. | Partnership announced April 2025 — integration maturity not independently validated. Institutions already using alternative curriculum management tools would need to migrate to Coursedog to access this integrated workflow. |
| Generative AI / LLM Workflow Features | Absent | N/A | N/A | N/A | No confirmed shipped generative AI or LLM-based features in curriculum management or catalog products as of mid-2026. Coursedog Intelligence brand may encompass future GenAI capability. Active webinar programme on AI in academic operations suggests roadmap activity but no public announcement. |

**AI Architecture:** Hybrid — the most sophisticated architecture in the competitor set. Coursedog combines confirmed ML (multivariate regression demand forecasting, ML-based schedule optimisation), rules-based automation (workflow routing, constraint checking), third-party AI data services (Mapademics LMI), and a platform-wide AI analytics brand (Coursedog Intelligence) whose internal architecture is not fully publicly disclosed. The evaluation feedback loop (ClassRanked) adds an AI-assisted data collection layer. The overall architecture is best described as a data-integration-first AI platform: Coursedog's AI capabilities are most powerful when SIS, curriculum, assessment, and evaluation data are all flowing into the platform, enabling cross-domain pattern detection that single-module tools cannot replicate.

**Competitive AI Position:** Coursedog is the clear AI leader in the category and is actively widening the gap. Its ML-based demand forecasting is technically documented (multivariate regression — not a marketing claim), its schedule optimisation is confirmed ML-based, and its ecosystem strategy (Mapademics, eLumen, ClassRanked) is assembling the data connections needed for genuinely intelligent academic operations. The strategic logic is sound: the value of AI in academic operations compounds when curriculum data, enrolment data, outcomes data, evaluation data, and labour market data are connected. Coursedog is the only competitor actively building that data fabric. The remaining gap is generative AI: no competitor, including Coursedog, has shipped LLM-based curriculum analysis, automated program viability scoring, or AI-driven redesign recommendations. This is the gap that COMPASS occupies, and Coursedog is the most credible threat to close it — but has not yet done so.

---

### COMPASS AI Feature PRD

**Product AI Vision:** COMPASS is an AI-native program intelligence platform that uses large language models to automate the most analytically demanding and time-consuming steps of curriculum review — replacing weeks of manual academic analysis with on-demand, evidence-grounded program viability assessment, market intelligence, and redesign planning.

**AI Maturity Rating:** Advanced — COMPASS is the only product in this category to have shipped generative AI (Claude/Anthropic LLM) as its analytical engine for curriculum review. Every core capability is AI-native: scoring, market analysis, and redesign recommendations are all generated by an LLM reasoning over real-time data rather than executing deterministic rules. The product is in prototype/early access stage, which limits the rating from the highest tier, but the AI architecture itself is more sophisticated than any confirmed competitor capability.

**Feature Inventory:**

| Feature | Status | User Story | Acceptance Criteria | Technical Approach | Limitations |
|---|---|---|---|---|---|
| /dfva — AI-Driven 10-Dimension Program Viability Assessment | Shipped (prototype) | As a curriculum committee member or Dean, I want a structured, evidence-backed viability assessment of any program I'm considering for review, investment, or discontinuation so that I can make a defensible decision in hours rather than commissioning a months-long manual review. | Assessment covers all 10 dimensions (Automation Exposure, Systems Thinking, Technical Depth, Decision-Making Under Uncertainty, AI Literacy & Governance, Domain Depth, Research Methods Rigour, Human & Relational Capability, Curriculum Currency & Adaptability, Graduate Outcome Evidence) plus Irreplaceability Premium bonus; each dimension receives a score with cited rationale; overall viability summary is generated; assessment is initiated by URL alone with no SIS integration required. | Generative AI (Claude/Anthropic) reasoning over curriculum content extracted from the provided URL. LLM applies a structured scoring framework across 10 dimensions based on curriculum content analysis. No deterministic rules — the model interprets curriculum evidence against each dimension's criteria and generates scored reasoning. | Assessment quality is dependent on the richness and accessibility of the curriculum content at the provided URL. Public-facing program pages may not expose full unit/module detail, which bounds scoring confidence. LLM outputs require human review — scores are analytical recommendations, not auditable algorithmic outputs. No historical benchmarking data in prototype stage. |
| /dfva-market — Real-Time Labour Market Signal Analysis | Shipped (prototype) | As a program director, I want a current analysis of the labour market demand for graduates of my program, including which job families are growing or contracting, which skills employers are paying premiums for, and where AI substitution pressure is highest in the occupation space, so that I can identify where the program is aligned or exposed. | Report covers: job families relevant to program graduates (growing/stable/contracting); AI substitution pressure rating per job family; skills in high demand that the program addresses; skills gaps relative to employer demand; salary trend indicators; output is grounded in current labour market signals, not static datasets. | Generative AI (Claude/Anthropic) synthesising real-time labour market signal analysis. LLM integrates current market data with curriculum analysis to assess alignment and exposure. Not a static database lookup — the model reasons about the relationship between curriculum content and market signals. | Labour market data currency depends on the signal sources accessible at generation time. Australian labour market data depth is shallower than US/UK equivalents due to smaller job posting volumes. AI substitution pressure assessment is a model inference, not a validated empirical measure — should be treated as directional intelligence, not actuarial fact. |
| /dfva-recommend — AI-Generated Curriculum Redesign Roadmap | Shipped (prototype) | As a curriculum designer or program convenor, I want an actionable redesign plan with specific interventions, responsible owners, implementation timelines, and measurable KPIs so that I can move from assessment findings to a concrete improvement agenda without additional consultancy engagement. | Redesign roadmap includes: prioritised list of curriculum interventions; recommended owner role for each intervention (unit convenor, program director, faculty board, industry advisory board); indicative timeline (immediate / 6-month / 12-month / 3-year horizon); KPIs to measure success of each intervention; interventions are grounded in the specific assessment findings from /dfva output. | Generative AI (Claude/Anthropic) synthesising assessment findings and market intelligence into a structured redesign agenda. LLM generates recommendations by reasoning over the scored gaps from /dfva and the market signals from /dfva-market, producing contextually specific rather than generic interventions. | Recommendations are LLM-generated and require validation by subject matter experts before implementation. Specificity of recommendations is bounded by the quality of the input curriculum data. Owner assignment is role-type based, not individual-named (requires institutional context the system does not hold). KPI targets are indicative, not institution-calibrated. |
| URL-Based Curriculum Intake — Zero-Integration Deployment | Shipped (prototype) | As an academic quality manager at an institution with no existing COMPASS integration, I want to run a full program assessment using only the program's public URL so that I can evaluate the tool's value without IT involvement or SIS integration work. | A valid program URL is the only required input; the system extracts curriculum content from the URL without manual data entry; assessment initiates within a defined response time; the system handles common URL formats (university program pages, handbook entries, catalog listings) without configuration. | URL ingestion pipeline feeding into the Claude/Anthropic analytical engine. No SIS integration required — the system reads publicly available curriculum content. Removes the most common deployment barrier for competitor products (data integration lead times of 3-12 months). | Assessment quality is bounded by what is publicly available at the URL — programs with thin public-facing curriculum descriptions will produce lower-confidence assessments. No access to enrolment data, graduate employment data, or unit-level detail unless publicly published. Cannot assess unpublished program proposals or internal curriculum documents without alternative intake method. |
| Web Application (Compass Web App) | Beta | As a Dean or curriculum committee chair, I want a persistent web interface where I can run assessments, save results, compare programs across my portfolio, and share findings with colleagues so that COMPASS produces institutional intelligence rather than one-off reports. | Authenticated login; program assessment initiates from a form input (URL); results are stored and retrievable; portfolio view enables side-by-side comparison of multiple programs; results are shareable via link or export; interface is built on Wasp/React/Prisma stack. | Web application prototype in development. Front-end: React (via Wasp framework). Back-end: Wasp/Node. Database: Prisma ORM. AI engine: Claude/Anthropic API. | Prototype stage — production readiness, scalability under concurrent load, and security hardening are in progress. No confirmed multi-institution tenancy at prototype stage. Export and sharing features may not be fully implemented at Beta. |
| 10-Dimension Scoring Framework with Irreplaceability Premium | Shipped (prototype) | As an academic reviewer, I want a consistent, transparent scoring rubric applied to every program so that assessment results are comparable across programs and defensible to governance bodies. | Ten named dimensions are scored on a consistent scale; each score is accompanied by LLM-generated rationale citing specific curriculum evidence; Irreplaceability Premium bonus is applied where the program demonstrates exceptional human-relational or tacit knowledge characteristics that are difficult to automate; aggregate viability score is derived from dimension scores. | Structured prompt engineering with a fixed 10-dimension framework applied via the Claude/Anthropic LLM. Scoring is generative — the model reasons against each dimension rather than executing lookup rules. Framework acts as a consistent analytical lens across diverse program types. | LLM scoring introduces model-level variance — identical curricula may produce marginally different scores across runs (mitigated by temperature settings and structured prompting). Framework was designed for the Australian higher education context; cross-national applicability requires validation. Dimension weightings are currently equal; institution-specific weighting configuration is not yet documented as a shipped feature. |
| SIS / Curriculum Management System Integration | Absent | N/A — current architecture is deliberately integration-free via URL intake. Future: As an institutional administrator, I want COMPASS to connect to our SIS and curriculum management system so that assessments are automatically triggered by governance events and enriched with enrolment and graduate outcomes data. | N/A (current state). Future AC: Integration trigger on curriculum proposal submission; SIS enrolment data enriches viability assessment; graduate employment data from SIS feeds Graduate Outcome Evidence dimension. | Not implemented. Future architecture would require API connectors to SIS platforms (Banner, PeopleSoft, Callista) and curriculum management tools (CourseLeaf, Coursedog, Modern Campus). | Absence of SIS integration is a current capability ceiling — assessments cannot incorporate enrolment trends, cohort demographics, or graduate employment data that SIS holds. This limits the Graduate Outcome Evidence dimension and prevents trend analysis across program cohorts. |
| Benchmarking & Portfolio Comparison | Absent | As a Deputy Vice-Chancellor (Academic), I want to compare program viability scores across my entire portfolio, segmented by faculty and discipline cluster, so that I can identify where to invest, divest, or redesign at portfolio scale. | Portfolio dashboard showing all assessed programs ranked by viability score; filtering by faculty, discipline, assessment date; trend view if programs are re-assessed over time; export for governance reporting. | Not yet implemented at prototype stage. Requires persistent data store (Prisma), authenticated multi-user access, and portfolio visualisation layer. Architectural foundation exists in the Wasp/React/Prisma web app. | Requires web app to reach production readiness. No confirmed timeline for portfolio analytics feature. |

**AI Architecture:** LLM-native with a structured analytical framework. COMPASS is architecturally distinct from every competitor: the core analytical engine is a large language model (Claude/Anthropic) applying a structured 10-dimension scoring framework to curriculum content extracted from public URLs. This is not rule-based automation, not statistical analytics, and not a trained ML classifier — it is reasoning-based AI that can handle the full complexity of curriculum analysis (interpreting learning outcomes, evaluating pedagogical currency, assessing labour market relevance) in a way that deterministic systems cannot. The architecture's key properties are: (1) zero-integration deployment via URL intake removes the 3-12 month barrier that constrains SIS-dependent competitors; (2) generative output means the system produces novel, context-specific analysis rather than retrieving pre-computed results; (3) the structured framework (10 dimensions, consistent scoring rubric) provides the consistency and comparability that raw LLM outputs lack. The current architecture does not include retrieval-augmented generation (RAG) over institutional data, fine-tuning on curriculum datasets, or multi-model ensemble scoring — these represent the natural next evolution of the AI architecture as the product matures.

**Competitive AI Position:** COMPASS occupies a category that no incumbent has entered: AI-native program viability intelligence for curriculum governance. CourseLeaf and Modern Campus have no AI capability in their curriculum products. Coursedog has built meaningful ML infrastructure in scheduling and demand forecasting, and has connected labour market data via Mapademics, but has not shipped LLM-based curriculum analysis or automated viability scoring. The closest external analogue is Lightcast Skillabi (Program-Occupation Alignment Score, launched June 2025), which produces a quantitative skills alignment score — but it is not available in Australia, it does not generate redesign recommendations, and it measures one dimension (skills alignment) rather than the multi-dimensional viability framework COMPASS applies. COMPASS's strategic window is the gap between what Coursedog has built (data-informed scheduling and demand analytics) and what curriculum governance actually requires: a reasoned, evidence-grounded, multi-dimensional assessment of whether a program is worth investing in, and a concrete plan for what to do if it is not. The competitive risk is not a lateral move by an existing competitor — it is Coursedog or a new entrant instrumentalising the same Claude/Anthropic API to build a similar scoring layer on top of their existing curriculum data infrastructure. COMPASS's defensible advantage is time-to-market in the Australian HE context, the depth of the 10-dimension framework as a curriculum intelligence standard, and the zero-integration deployment model that makes it accessible to institutions that will never complete a full SIS integration project.

---

## Part 2: Comparative AI Gap Analysis

## AI Capability Comparative Matrix

| AI Capability Dimension | CourseLeaf | Modern Campus | Coursedog | COMPASS |
|---|---|---|---|---|
| Generative AI / LLM integration | ✗ None | ○ Basic (CMS BYOK only) | ✗ None | ● Advanced |
| Predictive analytics | ✗ None | ◑ Developing (retention, unvalidated) | ● Advanced (demand forecasting, schedule optimisation) | ✗ None |
| Automated curriculum content analysis | ✗ None | ✗ None | ✗ None | ● Advanced |
| Labour market intelligence (real-time) | ✗ None | ✗ None | ◑ Developing (Mapademics; US/CA/UK only) | ◑ Developing (generative synthesis; AU-applicable) |
| Program viability scoring | ✗ None | ✗ None | ✗ None | ● Advanced |
| AI/automation exposure risk assessment | ✗ None | ✗ None | ✗ None | ● Advanced |
| Graduate outcome prediction | ✗ None | ✗ None | ✗ None | ○ Basic (dimension present; no SIS data) |
| Natural language search / semantic search | ✗ None | ✗ None | ✗ None | ✗ None |
| Workflow automation | ● Advanced | ● Advanced | ● Advanced | ✗ None |
| Accreditation compliance AI | ○ Basic (rules-based compliance) | ○ Basic (outcomes mapping, structured data) | ◑ Developing (eLumen partnership, Coursedog Intelligence) | ✗ None |
| Personalised recommendations | ✗ None | ○ Basic (Instinct; marketing layer only) | ✗ None | ● Advanced (redesign roadmap per program) |
| Benchmark comparison (peer institutions) | ✗ None | ✗ None | ✗ None | ✗ None |
| Real-time market signals integration | ✗ None | ✗ None | ◑ Developing (Mapademics; not AU) | ◑ Developing (generative synthesis at run time) |
| Redesign roadmap generation | ✗ None | ✗ None | ✗ None | ● Advanced |
| Evidence citation / explainability | ○ Basic (impact graph, audit trail) | ○ Basic (outcome mapping, evidence export) | ◑ Developing (accreditation evidence via eLumen) | ● Advanced (dimension-level rationale with curriculum citation) |

---

## Where COMPASS Leads — Genuine Advantages

**1. Generative AI as the analytical engine for curriculum review**
No competitor has shipped an LLM applied to curriculum content analysis. CourseLeaf and Modern Campus have zero generative AI in their curriculum products. Coursedog has ML in scheduling and demand forecasting but has not applied any LLM to program-level curriculum reasoning. COMPASS is the only product that can read a program description and produce an interpreted, reasoned analysis of it.

Strategic implication: COMPASS occupies a capability tier that does not exist in the market. The question is not whether to compete on this — it is how fast to build moat depth (framework, benchmarks, institutional data) before Coursedog or a new entrant replicates the basic API call.

**2. Multi-dimensional program viability scoring (10-dimension framework)**
No competitor produces a structured, multi-dimensional viability score for an individual program. Coursedog's Mapademics integration surfaces one signal (labour market alignment). Lightcast Skillabi (not in this competitor set but the closest external analogue) produces a skills alignment score on a single dimension. COMPASS applies 10 dimensions simultaneously, including dimensions competitors have not conceptualised as product features: Automation Exposure, AI Literacy and Governance, Irreplaceability Premium.

Strategic implication: The framework itself is a defensible asset if it becomes a recognised standard in Australian HE curriculum governance. Publishing dimension definitions, methodology notes, and validation evidence would increase the framework's institutional legitimacy and raise the cost of imitation.

**3. AI/automation exposure risk as a scored dimension**
No competitor assesses how exposed a program's graduate occupation space is to AI substitution. This is genuinely novel. CourseLeaf and Modern Campus do not engage with this question at all. Coursedog's Mapademics integration surfaces labour market demand but not automation vulnerability. COMPASS treats this as a first-class scoring dimension.

Strategic implication: This is the highest-relevance capability for Australian universities facing DVC-Academic pressure on curriculum futures. It is also the hardest to replicate with rules-based automation — it requires reasoning over occupational taxonomies, task structures, and AI capability trajectories, all of which LLMs handle better than deterministic systems.

**4. Zero-integration deployment via URL intake**
Every competitor with meaningful data capability (Coursedog demand forecasting, CourseLeaf impact analysis, Modern Campus retention analytics) requires 3-12 months of SIS integration before the AI value is accessible. COMPASS requires a URL. This removes the most common institutional barrier to adopting a new platform and enables a sales motion that does not require IT procurement involvement.

Strategic implication: In the Australian HE context, where IT project queues are long and SIS integrations are political, zero-integration deployment is not just a convenience feature — it is a different sales channel. COMPASS can be evaluated, piloted, and bought by a Dean or curriculum committee chair without a technology project. No competitor can do this.

**5. AI-generated redesign roadmap with owner assignment and KPIs**
No competitor generates a structured intervention plan from assessment findings. Coursedog routes data to eLumen for accreditation evidence. CourseLeaf runs impact graphs. None of them tells you what to do next, who should do it, by when, and how to measure success. COMPASS's /dfva-recommend output is the only AI-generated curriculum improvement agenda in the category.

Strategic implication: This is where COMPASS moves from assessment tool to decision-support system. The redesign roadmap is what converts a one-off viability report into a sustained engagement with the platform — program directors return to track implementation, not just generate initial scores.

**6. Australian higher education context as design target**
The 10-dimension framework was designed for the Australian HE context. Coursedog's Mapademics LMI integration explicitly excludes Australia. Lightcast Skillabi is US/UK focused. COMPASS is the only platform in this analysis optimised for Australian institutional structures, TEQSA requirements, and the Australian labour market.

Strategic implication: This is a narrow but deep defensible position. The Australian market is large enough to build a meaningful business on and specific enough that US-designed tools underserve it structurally.

---

## Where COMPASS Lags — Genuine Gaps

**1. Predictive enrolment analytics**
Coursedog ships multivariate regression forecasting for section demand, updated weekly, displayed in-interface alongside capacity inputs. This is technically documented and operationally useful. COMPASS has no enrolment data capability because it has no SIS integration. Decisions about program investment cannot be fully informed without knowing whether a program is growing, flat, or declining in student demand.

What COMPASS should consider: Even without SIS integration, proxy signals for enrolment health could be incorporated — publicly available QILT data, TEQSA commencement/completion statistics, or government-published enrolment trend data by field of education. This would not replicate Coursedog's precision but would add a directional enrolment signal to the viability assessment without requiring institutional data access.

**2. Workflow automation and governance routing**
CourseLeaf, Modern Campus (Curriculog), and Coursedog all operate as the system of record for curriculum approval workflows. They route proposals, track approvals, enforce stage gates, and maintain audit trails. COMPASS has no workflow capability. Assessment outputs exist outside the governance process rather than inside it.

What COMPASS should consider: This is a genuine gap but also a strategic choice point (see Features COMPASS Should Avoid). The risk is not that COMPASS lacks workflow automation — it is that assessment findings have no structural connection to the governance workflow where decisions are actually made. A lightweight integration or export that feeds COMPASS outputs into existing curriculum management workflows (CourseLeaf, Curriculog, Coursedog) would close this gap without COMPASS needing to become a workflow system.

**3. Accreditation evidence generation**
Coursedog, through its eLumen partnership, is building a data pipeline from curriculum management into accreditation evidence packages. CourseLeaf enforces syllabus compliance and maintains audit trails. Modern Campus maps outcomes to accreditation standards within the proposal form. COMPASS has no accreditation-facing capability. For many Australian institutions, TEQSA audit readiness is a more immediate pressure than curriculum innovation.

What COMPASS should consider: The /dfva assessment, if positioned and formatted correctly, could serve as a structured evidence artefact in TEQSA self-assessment — demonstrating that program viability has been systematically reviewed against a documented framework. This requires minimal new product capability: a formatted, exportable assessment report with methodology citation. The product capability may already exist; the positioning and packaging do not.

**4. Outcomes mapping and learning outcome analysis**
Every competitor in this set maps course learning outcomes to program outcomes and accreditation standards. COMPASS scores Curriculum Currency and Adaptability as a dimension but does not specifically analyse whether stated learning outcomes are mapped, comprehensive, or aligned to graduate capability needs. This is a gap because outcomes alignment is the language curriculum governance committees speak.

What COMPASS should consider: Adding an outcomes analysis dimension or sub-dimension — specifically examining whether the program's stated outcomes are specific, measurable, and aligned to the job families identified in /dfva-market — would close this gap and strengthen the Curriculum Currency dimension with more granular evidence.

**5. Portfolio-level benchmarking and peer comparison**
No competitor in this set ships cross-institutional benchmarking, but Coursedog's platform-wide data aggregation creates the infrastructure for it. COMPASS cannot currently compare a program's viability score against similar programs at peer institutions. Portfolio comparison within a single institution is also absent at prototype stage.

What COMPASS should consider: Portfolio comparison within an institution is the highest-priority gap to close because it converts COMPASS from a single-program tool to a portfolio intelligence platform. DVC-Academics and Provosts make investment and discontinuation decisions at portfolio scale, not program by program. The architectural foundation (Prisma data store, React front-end) exists; the product feature does not.

**6. Evaluation and student feedback loop**
Coursedog's ClassRanked acquisition creates a feedback pipeline from student course evaluations into curriculum management. COMPASS has no mechanism for incorporating student experience data into viability assessments. The Graduate Outcome Evidence dimension is scored without data on what students actually experienced in the program.

What COMPASS should consider: This is a longer-term gap. The most practical near-term move would be to accept structured input of existing institutional evaluation data (uploaded CSV or text paste) to augment the URL-based assessment rather than requiring integration.

---

## Differentiation-Preserving Additions

These are competitor capabilities COMPASS could add that would strengthen the product without repositioning it as a curriculum management system.

**1. Enrolment trend signal (from public data sources)**
Source: Coursedog-inspired, but implemented without SIS integration.
What to add: Incorporate publicly available QILT, TEQSA, and Department of Education enrolment data (field of education commencement, attrition, completion rates) as a contextual signal in the Graduate Outcome Evidence dimension. This adds data-grounded evidence to a dimension currently scored purely from curriculum content without requiring any institutional data sharing.
Why it preserves differentiation: COMPASS remains zero-integration and assessment-oriented. The enrolment signal enriches the AI's reasoning rather than making COMPASS a scheduling or SIS tool.

**2. Outcomes alignment analysis within the viability framework**
Source: CourseLeaf / Modern Campus outcomes mapping.
What to add: Within /dfva, add explicit analysis of whether stated program learning outcomes are mapped and aligned to the graduate capability profile identified across the 10 dimensions. Flag missing outcomes categories as part of the redesign roadmap.
Why it preserves differentiation: This remains AI-driven analysis of curriculum content, not a workflow tool for managing outcomes mapping. COMPASS would be assessing the quality of outcomes, not administering their collection.

**3. Exportable evidence artefact for TEQSA/governance use**
Source: CourseLeaf SYL compliance and Coursedog/eLumen accreditation evidence.
What to add: A formatted, institution-branded PDF export of the full /dfva assessment report, explicitly structured as a program review evidence document (framework methodology, dimension scores, rationale, market intelligence, redesign roadmap). Include metadata: date of assessment, program URL, framework version.
Why it preserves differentiation: This does not make COMPASS an accreditation system. It makes the assessment output legible and usable within the governance processes institutions already run. It positions COMPASS as evidence-generating rather than workflow-managing.

**4. Integration trigger or API endpoint for curriculum management systems**
Source: Coursedog's ecosystem integration strategy.
What to add: A webhook or API endpoint that can receive a program URL or proposal identifier from a curriculum management system (CourseLeaf, Curriculog, Coursedog) and return a structured /dfva assessment. This allows COMPASS to be called as an analytical service within a governance workflow rather than COMPASS needing to own the workflow.
Why it preserves differentiation: COMPASS remains the intelligence layer, not the workflow layer. Curriculum management systems become data sources and trigger mechanisms. This is integration as a distribution strategy, not a product expansion.

**5. Portfolio dashboard (within institution)**
Source: Addresses a gap none of the competitors fill well for AI-driven portfolio intelligence.
What to add: Authenticated multi-program view where all assessed programs for an institution are ranked by overall viability score, filterable by faculty and discipline, with trend view for programs assessed more than once.
Why it preserves differentiation: This is the natural completion of the viability assessment mission. DVC-Academics and Provosts need portfolio-level intelligence, not single-program point-in-time reports. Portfolio view makes COMPASS sticky at the institutional level rather than the individual program level.

---

## Features COMPASS Should Avoid

These are competitor features that would create product confusion, dilute positioning, and put COMPASS in direct competition with better-resourced incumbents in a category where COMPASS has no structural advantage.

**1. Curriculum approval workflow and governance routing**
CourseLeaf and Modern Campus have spent years building workflow engines trusted by hundreds of institutions. Coursedog has invested heavily in configurable routing, stage gates, and audit trails. If COMPASS builds a proposal submission and approval workflow, it becomes a curriculum management system competing on workflow maturity — a category where it starts years behind. The workflow is where the incumbents live. COMPASS should be what informs decisions made in the workflow, not the system running the workflow.

**2. Section scheduling and room/time conflict management**
CourseLeaf CLSS and Coursedog's schedule optimisation are deeply integrated operational tools with real-time SIS data feeds, drag-and-drop calendars, and constraint-checking logic. This is an infrastructure-intensive capability requiring institutional data that COMPASS is architecturally designed not to need. Scheduling is operational, not strategic. It is not where curriculum viability intelligence is needed.

**3. Student retention early warning dashboards**
Modern Campus's retention analytics and the broader EAB/Civitas Learning category are purpose-built for student success advisors working at the individual student level. This requires LMS, SIS, and attendance data. It is not curriculum intelligence — it is student case management. Adding this would require COMPASS to become a student-data platform, which is a different regulatory, ethical, and technical environment.

**4. SIS bidirectional integration and data synchronisation**
Coursedog and CourseLeaf derive significant value from being systems of record that sync data to Banner, PeopleSoft, and Callista. Building this capability would require COMPASS to take on SIS integration maintenance as a core product obligation — the same 3-12 month integration burden that is currently COMPASS's competitive advantage to avoid. The zero-integration architecture is a feature, not a limitation to fix by becoming a SIS-adjacent platform.

**5. CMS and web content publishing tools**
Modern Campus's Omni CMS OpenAI integration and Instinct personalisation engine are marketing technology features serving digital marketing directors and web teams. They are unrelated to curriculum governance. Building CMS or content personalisation capability would confuse COMPASS's identity as a program intelligence tool and enter a very crowded MarTech category where COMPASS has no advantages.

**6. Course evaluation administration and delivery**
Coursedog's ClassRanked acquisition enables mobile-first student evaluation delivery and faculty dashboards. Administering course evaluations is an operational function owned by registrars or quality offices using purpose-built survey platforms. COMPASS should consume evaluation data as an input to viability assessment (if institutions provide it) rather than becoming an evaluation administration system. Building the delivery infrastructure adds complexity without advancing the core mission.

---

## Part 3: COMPASS AI Improvement Recommendations

# COMPASS AI Improvement Recommendations

## Strategic AI Positioning Statement

COMPASS is the only curriculum intelligence platform in the Australian higher education market that applies a large language model as its analytical engine — not as a workflow accelerator, not as a content drafting assistant, but as a reasoning system that evaluates program viability across ten evidence-grounded dimensions and produces a concrete improvement agenda. Where CourseLeaf and Modern Campus have no generative AI in their curriculum products, and where Coursedog's machine learning investment is concentrated in scheduling demand forecasting and US-only labour market data, COMPASS delivers what none of them can: an AI-native assessment of whether a program is durable in an AI-disrupted labour market, why it is or is not, and exactly what to do about it — initiated with a URL and returned in hours, not months. COMPASS does not compete with curriculum management systems on workflow automation; it competes on the intelligence that makes curriculum decisions defensible.

---

## Recommended Feature Enhancements (Prioritised)

---

### 1. Public Enrolment Signal Integration (QILT / TEQSA / DET Data)

**Problem it solves:** The Graduate Outcome Evidence dimension is currently scored from curriculum content alone, with no access to actual enrolment trends, attrition rates, or employment outcomes. Program directors and Deans making investment or discontinuation decisions cannot rely on curriculum content analysis alone — they need directional enrolment health signals. The gap is most acute when COMPASS is being used to support discontinuation or consolidation cases, where declining demand is the primary driver.

**Competitive benchmark:** Coursedog ships multivariate regression demand forecasting using SIS enrolment data, updated weekly. This is technically superior but requires full SIS integration. No competitor has incorporated publicly available national enrolment data into program-level intelligence.

**What COMPASS should build:** An automated pipeline that retrieves and ingests publicly available Australian enrolment data — QILT Graduate Outcomes Survey data by field of education, TEQSA commencement and completion statistics, and Department of Education higher education statistics — and surfaces directional signals within the Graduate Outcome Evidence dimension of every /dfva assessment. The output should present field-of-education commencement trends (3-year direction: growing / stable / contracting), attrition rates relative to sector median, and graduate employment rates from QILT. These signals are presented as contextual evidence, not as a substitute for institutional SIS data.

**Why COMPASS can do this better:** Coursedog's demand forecasting requires SIS integration and is institution-specific. COMPASS's LLM can synthesise national-level signals with program-specific curriculum content to produce a contextualised interpretation — not just "commencements in this field of education are declining" but "commencements in this field are declining at the same time the curriculum shows limited adaptation to emerging employer demand, which suggests structural rather than cyclical vulnerability." The interpretive layer is what competitors cannot replicate with statistical models.

**Priority:** P1 — Critical. Without any enrolment signal, COMPASS's viability scoring has a credibility ceiling with senior academic decision-makers who know enrolment data exists and will ask why it is absent.

**Complexity:** Medium (weeks). Data is publicly available and machine-readable. The primary work is building the retrieval pipeline, mapping field-of-education codes to program types, and incorporating the signals into the scoring prompt.

**Differentiation impact:** High. Closes the most significant factual gap in the current assessment while preserving zero-integration deployment.

**Implementation note:** Use Claude's tool use / function calling capability to retrieve QILT and DET data at assessment time rather than pre-caching, so signals are always current. The LLM should receive structured enrolment signal data as a context block and be prompted to interpret it in relation to the program-specific curriculum evidence already extracted from the URL.

---

### 2. Exportable Program Review Evidence Artefact (PDF Report)

**Problem it solves:** COMPASS assessment outputs currently exist as on-screen text with no structured export. For the output to function as evidence in a TEQSA self-assessment, a faculty board review, or an Academic Board submission, it must be a formatted, citable document with methodology citation, date stamp, and institutional branding. Without this, COMPASS findings cannot formally enter governance processes — they are informal insights rather than official review documents.

**Competitive benchmark:** CourseLeaf's SYL module generates audit-trail documentation for TEQSA compliance. Coursedog's eLumen partnership produces structured accreditation evidence packages. Neither generates AI-reasoned program viability evidence — they produce structured data records. COMPASS's output is richer in analytical content; it simply lacks the document packaging that governance requires.

**What COMPASS should build:** A one-click export of the full /dfva assessment as a formatted PDF, structured as a program review evidence document. The document should include: cover page with program name, URL, assessment date, and framework version; executive summary with overall viability score and headline findings; dimension-by-dimension scores with cited rationale; market intelligence summary from /dfva-market; redesign roadmap from /dfva-recommend; methodology appendix citing the 10-dimension framework and its theoretical basis; and optional institutional logo. The document should be formatted to the standards Australian academic governance bodies expect — not a chat transcript export, but a structured analytical report.

**Why COMPASS can do this better:** Competitors generate compliance records (what was submitted, who approved it, when). COMPASS generates analytical findings (what the evidence shows about program viability, why, and what to do). A formatted COMPASS report is not a compliance audit trail — it is a structured intelligence brief. That is a more valuable document for the committee chairs and DVCs who make curriculum investment decisions.

**Priority:** P1 — Critical. This is the single feature most likely to unlock institutional adoption by making COMPASS findings usable in formal governance processes without any additional work by the user.

**Complexity:** Low (days). The content already exists in the assessment output. The work is templating, PDF generation, and formatting — a well-solved technical problem.

**Differentiation impact:** High. Converts COMPASS from a tool that produces insights to a tool that produces governance-ready evidence.

**Implementation note:** Use a server-side PDF generation library (Puppeteer, WeasyPrint, or a React-to-PDF approach consistent with the Wasp/React stack). The LLM should generate a structured JSON output from /dfva that the PDF template consumes — this also creates a clean API response format for future integration use cases. Include a framework version identifier in the methodology appendix so future framework updates can be tracked.

---

### 3. Outcomes Alignment Analysis Sub-Dimension

**Problem it solves:** Every curriculum governance committee in Australian higher education speaks the language of graduate learning outcomes — mapping, coverage, alignment to AQF level descriptors, and accreditation body requirements. COMPASS currently scores Curriculum Currency and Adaptability but does not specifically evaluate whether stated learning outcomes are specific, measurable, comprehensive, or aligned to the graduate capability profile identified by the market intelligence analysis. This gap makes COMPASS less legible to curriculum committee members who are trained to evaluate programs through an outcomes lens.

**Competitive benchmark:** CourseLeaf, Modern Campus (Curriculog), and Coursedog all provide structured outcomes mapping tools. None of them evaluates the quality or strategic alignment of the outcomes themselves — they record what outcomes exist and map them to standards, but apply no analytical judgement. COMPASS can assess quality; it currently does not do so explicitly.

**What COMPASS should build:** Within /dfva, add an Outcomes Alignment Analysis as a structured sub-dimension of the Curriculum Currency and Adaptability dimension. The LLM should evaluate: whether stated program learning outcomes are specific and measurable (not generic); whether outcome coverage maps to the capability areas identified as high-demand in /dfva-market job family analysis; whether any AQF level 7/8/9 graduate capability domains (knowledge, skills, application) appear absent or underweighted; and whether the outcomes language reflects contemporary disciplinary and professional standards or is dated. Flagged gaps in outcome coverage should feed directly into the /dfva-recommend redesign roadmap as explicit interventions.

**Why COMPASS can do this better:** Outcomes mapping tools record what exists. COMPASS's LLM can read the actual text of learning outcomes and evaluate them against graduate capability needs identified from real-time labour market signals — something no rule-based system can do. The LLM can flag that a program's outcomes describe knowledge acquisition but not application in AI-augmented work environments, or that outcomes are written at AQF level 6 language in a level 8 program — qualitative assessments that require reading comprehension, not data lookup.

**Priority:** P1 — Critical. Outcomes analysis is the common vocabulary of curriculum governance. Without it, COMPASS's framework speaks a different language from the committees it is designed to inform.

**Complexity:** Medium (weeks). The primary work is refining the scoring prompt to extract and evaluate outcome statements explicitly, and updating the scoring framework documentation. The LLM capability is already present; it is a prompting and framework refinement task.

**Differentiation impact:** High. Makes COMPASS findings directly legible to curriculum committee members and accreditation coordinators.

**Implementation note:** Extract learning outcome statements as a structured list early in the URL parsing pipeline and provide them to the LLM as a dedicated context block. Prompt the LLM to evaluate each outcome against the graduate capability profile generated from market intelligence, and to flag coverage gaps as named items for the redesign roadmap. Use consistent labelling (e.g., "Outcomes Gap: no outcomes address AI tool use in professional practice") so gaps are directly actionable.

---

### 4. Portfolio Dashboard (Within-Institution Program Comparison)

**Problem it solves:** COMPASS currently produces single-program, point-in-time assessments. The decision-makers with budget authority — DVCs Academic, Provosts, and Faculty Deans — operate at portfolio scale. They need to see where every assessed program sits relative to others in the faculty or institution, identify which programs are most exposed to AI disruption, and prioritise resource allocation accordingly. A single-program tool serves program directors; a portfolio tool serves the people who fund them.

**Competitive benchmark:** No competitor in this set ships AI-driven portfolio-level program intelligence. Coursedog aggregates operational data (scheduling, assessment, outcomes) across the institution but does not produce comparative viability scores. The portfolio dashboard would be a COMPASS-native capability with no direct competitive equivalent.

**What COMPASS should build:** An authenticated multi-program dashboard where all assessed programs for an institution are displayed in a ranked table ordered by overall viability score. Filtering by faculty, discipline cluster, assessment date, and score band. Colour-coded viability bands (e.g., Strong / Moderate / At Risk / Critical) that allow DVC-level at-a-glance portfolio health assessment. Trend view for programs assessed more than once, showing score movement between assessment dates. Export of portfolio summary for governance committee presentation. The dashboard should be the institutional landing page rather than a program-by-program tool.

**Why COMPASS can do this better:** Competitors that have data aggregation (Coursedog) aggregate operational data — enrolments, completions, scheduling conflicts. COMPASS aggregates intelligence — multi-dimensional viability judgements with dimension-level breakdowns. A COMPASS portfolio view tells you not just that Program A scores 28/36 and Program B scores 14/36, but that Program B's vulnerability is concentrated in Automation Exposure and Graduate Outcome Evidence while its Human and Relational Capability score is strong — which is a more actionable investment signal than any operational metric.

**Priority:** P1 — Critical. Portfolio view is the feature that converts COMPASS from a tactical program review tool to a strategic institutional intelligence platform. It is also the feature most likely to drive institutional-level contracts rather than individual program assessments.

**Complexity:** Medium (weeks). The architectural foundation — Prisma data store, React front-end, authenticated multi-user access — is described as present in the web app. The work is data modelling for multi-program storage, the dashboard UI, and the filtering/comparison logic.

**Differentiation impact:** High. Elevates the buyer from program director to DVC/Provost and makes COMPASS relevant at the institutional strategic planning level.

**Implementation note:** Store dimension-level scores (not just overall scores) in the Prisma database so the portfolio view can surface dimension-specific vulnerability patterns across the portfolio — e.g., "7 of 12 assessed programs show Automation Exposure scores below 2/4." This turns the portfolio view into a pattern detection tool, not just a ranking table. Implement role-based access so program directors see only their programs while DVCs see the full institutional portfolio.

---

### 5. API Endpoint / Webhook for Curriculum Management System Integration

**Problem it solves:** COMPASS assessments currently exist outside the governance workflow. Program directors and curriculum committee members must actively go to COMPASS, run an assessment, and manually bring the findings into their curriculum management system (CourseLeaf, Curriculog, Coursedog). If COMPASS findings are not inside the workflow where governance decisions are made, they will be consulted inconsistently and will not become standard evidence in curriculum review processes. This limits COMPASS's institutional embedding.

**Competitive benchmark:** Coursedog's ecosystem strategy (eLumen partnership, ClassRanked acquisition, Mapademics integration) is built on API connections that pull external intelligence into the workflow. CourseLeaf's Nuventive integration enables automatic data flow between systems. Coursedog is assembling a data fabric; COMPASS should position itself as a callable intelligence service within that fabric.

**What COMPASS should build:** A documented REST API endpoint that accepts a program URL (or program identifier) and returns a structured JSON response containing the full /dfva assessment output — dimension scores, rationale summaries, market intelligence summary, and redesign roadmap priorities. An optional webhook mode that allows curriculum management systems to trigger a COMPASS assessment on a governance event (e.g., program proposal submission, scheduled periodic review) and receive results asynchronously. Authentication via API key. Rate limiting and usage reporting per institution. The API should be positioned as a B2B integration product for curriculum technology vendors, not just a developer feature.

**Why COMPASS can do this better:** COMPASS's zero-integration architecture and URL-based intake mean the API endpoint requires no institutional data from the calling system — just a URL. A CourseLeaf or Curriculog implementation can pass a program page URL to COMPASS and receive a viability assessment without any data sharing agreement, SIS connection, or configuration. No competitor can offer this because no competitor has a URL-based intake model. The API is not a distribution feature — it is a channel into every institution that already uses a curriculum management system.

**Priority:** P2 — High. This is not immediately critical for the prototype stage but becomes important for institutional-scale adoption and for positioning COMPASS as infrastructure rather than a standalone tool.

**Complexity:** Medium (weeks). The core assessment logic already exists. The work is building a stable, versioned API layer, authentication, and documentation. The JSON output format should be defined first (see PDF report feature above, which uses the same structured output).

**Differentiation impact:** High. Transforms COMPASS from a destination product into a callable intelligence service that can be embedded in any curriculum workflow without COMPASS needing to own the workflow.

**Implementation note:** Design the API response schema to be stable across framework versions, with a framework_version field so consuming systems can handle version changes. Consider offering a summary endpoint (overall score + top 3 risks + top 3 recommendations) alongside the full endpoint — the summary endpoint is more appropriate for in-workflow display without overwhelming the curriculum management system UI.

---

### 6. Structured Qualitative Input Augmentation (Uploaded Curriculum Documents)

**Problem it solves:** COMPASS's URL intake model is architecturally elegant and removes integration barriers, but program pages on university websites frequently underrepresent curriculum detail. Unit-level learning outcomes, assessment structures, reading lists, and pedagogical approaches are often behind authenticated portals or in course handbooks not indexed publicly. When a public program page is thin, the LLM is scoring from incomplete evidence, which bounds assessment confidence and can produce findings that program directors immediately contest because they know the public page does not represent the actual curriculum.

**Competitive benchmark:** No competitor in the automated intelligence category accepts document uploads for curriculum analysis. Coursedog and CourseLeaf work from SIS-structured data. This is an opportunity for COMPASS to accept evidence richness that no other automated system processes.

**What COMPASS should build:** An optional document augmentation step in the assessment workflow where users can upload PDF or text files — course handbooks, program specification documents, unit outlines, accreditation self-study reports — that are incorporated into the LLM's evidence base alongside the URL-extracted content. The user interface should make clear that document augmentation improves assessment confidence and should present a confidence indicator that reflects how much structured curriculum evidence the LLM had access to (URL only / URL + documents / comprehensive). Uploaded documents should be processed at assessment time, not stored permanently, to manage data governance risk.

**Why COMPASS can do this better:** The LLM's ability to extract, synthesise, and reason over unstructured document content is precisely the capability that competitors' rule-based and statistical systems lack. A Coursedog demand forecast cannot read a unit outline and assess whether the assessment tasks are AI-disruption resilient. COMPASS can, and document augmentation makes this capability accessible even when public web pages are thin.

**Priority:** P2 — High. This addresses a core assessment quality limitation and reduces the most common objection from program directors ("the website doesn't show everything we do").

**Complexity:** Medium (weeks). Document parsing (PDF extraction, text chunking) is a well-solved problem. The primary work is integrating document content into the prompt context alongside URL content and presenting the confidence indicator in the UI.

**Differentiation impact:** High. Significantly improves assessment quality for programs with thin public-facing curriculum descriptions, which is a large proportion of postgraduate and specialist programs.

**Implementation note:** Use Claude's extended context window to process longer documents without chunking where possible. For very long documents (e.g., full accreditation self-study reports), implement a relevance-weighted extraction step that identifies and prioritises sections most relevant to the 10 dimensions before passing content to the scoring prompt. Clearly communicate to users that uploaded documents are processed but not stored, and include a data handling statement in the upload interface.

---

### 7. Confidence Scoring and Evidence Transparency Layer

**Problem it solves:** LLM-generated scores without explicit confidence indicators are a credibility risk in academic governance contexts. When a Dean sees a score of 19/36 for a program they have invested significant resources in, they will immediately ask: "How confident is the system in this score, and what evidence did it draw on?" Without a transparent evidence layer, COMPASS findings will be challenged as opaque AI outputs rather than accepted as analytical recommendations.

**Competitive benchmark:** CourseLeaf's impact analysis provides a complete graph of affected programs — every result is traceable. Coursedog's demand forecasts show the historical data inputs. COMPASS currently generates rationale text per dimension, but does not provide structured evidence citation or confidence banding that would allow users to assess where the LLM had strong vs weak evidence to work with.

**What COMPASS should build:** A confidence indicator per dimension (High / Medium / Low) derived from the richness of curriculum evidence the LLM identified for that specific dimension. Dimensions where the program page provided clear, specific evidence receive High confidence; dimensions where the LLM inferred from indirect signals receive Low confidence. A structured evidence citations section per dimension listing the specific curriculum statements, learning outcomes, assessment descriptions, or market signals that informed the score — pulled from the actual content the LLM analysed, not generated summaries. A top-level assessment confidence statement that communicates overall evidence quality to the user before they engage with the scores.

**Why COMPASS can do this better:** The LLM generates its scoring rationale in natural language, which means evidence citation is a prompting and output structuring task rather than a new capability. COMPASS can produce richer, more interpretable evidence transparency than any statistical model — a regression forecast cannot explain why it predicted 47 enrolments; COMPASS can cite the specific curriculum evidence that drove a dimension score. This turns the LLM's natural language reasoning into an audit trail.

**Priority:** P2 — High. Without confidence and evidence transparency, COMPASS findings will face credibility challenges in governance contexts that require defensible decisions. This is also a prerequisite for the PDF evidence artefact feature to be taken seriously.

**Complexity:** Low to Medium. Primarily a prompting and output structuring task. The LLM already generates reasoning; the work is structuring the output to separate evidence citation from analytical interpretation, and building the confidence indicator logic into the scoring prompt.

**Differentiation impact:** High. Directly addresses the "black box AI" objection that will be raised by governance bodies and academic quality offices.

**Implementation note:** Prompt the LLM to explicitly flag the specific text passages from the URL content that informed each dimension score, and to rate its own evidence confidence (High / Medium / Low) per dimension based on whether it found direct evidence, indirect evidence, or had to infer from absence. Use structured output (JSON) from the LLM scoring pass so confidence levels and evidence citations are captured as data fields, not embedded in prose.

---

### 8. Comparative Peer Benchmarking (National / Discipline Cluster)

**Problem it solves:** A viability score of 22/36 is difficult to act on in isolation. Is 22 good for a humanities program? Is it poor for an engineering program? Without reference points, academic decision-makers cannot determine whether a program's score represents a genuine problem or a natural baseline for that discipline type. Peer benchmarking gives the score meaning by contextualising it within a discipline cluster or institutional peer group.

**Competitive benchmark:** No competitor in this set ships cross-institutional benchmarking. Coursedog's platform aggregates data across institutions but does not publish cross-institutional intelligence. This is a genuine gap in the entire category that COMPASS, as an assessment-native platform, is best positioned to fill once a sufficient assessment dataset exists.

**What COMPASS should build:** As the assessment database grows, publish anonymised benchmark scores by discipline cluster (using the Australian Standard Research Classification or ANZSCO field of education taxonomy) showing median viability scores, dimension score distributions, and most common vulnerability patterns by discipline type. In the assessment output, position the program's score relative to the discipline cluster benchmark — "This program scores 22/36 overall, compared to a median of 24/36 for assessed Business programs in the dataset." Over time, extend to institutional peer group benchmarking using Go8 / ATN / IRU groupings.

**Why COMPASS can do this better:** COMPASS is the only platform generating multi-dimensional viability scores, which means it is the only platform that can generate this specific form of benchmark. The benchmark data is a byproduct of the product's core function — every assessment contributes to it. Competitors that aggregate operational data (enrolments, scheduling) cannot produce a comparable analytical benchmark because they do not generate analytical scores.

**Priority:** P3 — Medium. This requires a sufficient dataset of assessed programs before the benchmark is meaningful. It is a Phase 3 feature that depends on Phase 1 and 2 adoption driving the assessment volume needed to populate it.

**Complexity:** High (months). Requires assessment volume, data governance framework for anonymisation and consent, classification of programs by discipline cluster, statistical summarisation, and UI integration.

**Differentiation impact:** High (when available). Transforms COMPASS's scores from absolute assessments to relative intelligence — which is how institutional decision-makers think about portfolio positioning.

**Implementation note:** Build the data collection and classification infrastructure from the start, even before the benchmark is published. Every assessment should record the program's field of education classification alongside its scores. The classification can be LLM-assisted (infer ANZSCO code from program description and URL) to avoid requiring manual data entry. Set a minimum sample size threshold (e.g., 10 programs per discipline cluster) before benchmarks are shown to users.

---

### 9. Redesign Roadmap Implementation Tracker

**Problem it solves:** The /dfva-recommend output produces a redesign roadmap with prioritised interventions, owner roles, timelines, and KPIs — but there is currently no mechanism for tracking whether recommendations are acted upon. Program directors receive a roadmap and then have no structured way to record progress, mark interventions as complete, or schedule a re-assessment to verify that scores have improved. The roadmap is a point-in-time document rather than a living action plan.

**Competitive benchmark:** Coursedog's integration with eLumen creates a data pipeline from curriculum decisions to assessment outcomes. ClassRanked creates a feedback loop from student evaluation to curriculum management. Neither competitor produces AI-generated action plans; neither therefore needs to track them. COMPASS has a first-mover opportunity to own the implementation tracking layer for AI-generated curriculum improvement.

**What COMPASS should build:** A lightweight action tracker linked to each /dfva-recommend output where program directors can mark interventions as In Progress / Complete / Deferred, add notes, and set target completion dates. When an intervention is marked complete, COMPASS should prompt (not require) a re-assessment to verify score improvement. The tracker should be visible to both the program director and the institutional administrator (Dean, QA lead) as part of the portfolio dashboard — turning the redesign roadmap into a shared accountability tool.

**Why COMPASS can do this better:** COMPASS generated the recommendations, which means it can also evaluate whether the changes made in response to them have improved the viability score. A re-assessment after implementation produces a before/after score comparison that no competitor can generate — because no competitor generated the initial score. This creates a COMPASS-native feedback loop that demonstrates ROI and drives re-engagement with the platform.

**Priority:** P2 — High. This feature is what converts COMPASS from a one-off assessment tool to a sustained engagement platform. Without it, program directors have no reason to return to COMPASS after the initial assessment other than curiosity.

**Complexity:** Medium (weeks). The data model is straightforward (interventions as rows with status fields, linked to assessment records). The primary complexity is the re-assessment prompting logic and the before/after score comparison display.

**Differentiation impact:** Medium to High. Transforms the product's engagement model from transactional (one assessment, one report) to longitudinal (ongoing improvement tracking with measured impact).

**Implementation note:** Store the /dfva-recommend output as structured JSON (intervention list with owner, timeline, KPI, and priority fields) in the Prisma database rather than as prose text. This enables the tracker UI to be built on clean data rather than parsing natural language. The re-assessment prompt should be triggered by the LLM reasoning over both the original assessment and the completed interventions to produce a contextualised score update — not just a fresh assessment of the unchanged URL.

---

### 10. AI Disruption Scenario Modelling (Horizon Analysis)

**Problem it solves:** The Automation Exposure dimension scores current AI substitution risk, but curriculum decisions made today will affect graduates entering the workforce in 3-5 years. Deans investing in a new program or making a major curriculum renewal decision need to understand not just current exposure but trajectory — how is the automation risk profile of the graduate occupation space likely to evolve, and is the curriculum being designed for where the world is or where it will be?

**Competitive benchmark:** No competitor in this category, or the wider HR analytics category, ships AI disruption trajectory modelling for academic programs. Lightcast and Burning Glass produce automation risk scores for occupations but not forward-looking scenario analysis applied to curriculum design decisions. This would be a category-defining capability.

**What COMPASS should build:** An optional scenario analysis extension to /dfva-market that presents two or three AI disruption scenarios (Conservative / Base / Accelerated) with the implications for the program's graduate occupation space under each scenario. The scenarios should describe which job families are most exposed under accelerated automation, which human-relational and systems-thinking capabilities become premium-priced, and which program interventions become urgent versus nice-to-have depending on the scenario. Output is a 1-2 page scenario narrative, not a probabilistic model — it is structured analytical reasoning, not a forecast.

**Why COMPASS can do this better:** This is pure LLM reasoning over structured occupational and technology trajectory information — exactly what a large language model is architecturally suited to and what deterministic systems cannot do at all. The output is deliberately qualitative scenario narrative rather than a quantitative forecast, which is the epistemically honest framing for 3-5 year automation trajectory analysis. COMPASS's LLM can synthesise occupational exposure data, AI capability development signals, and curriculum content analysis into scenario-specific curriculum implications in a way no statistical model can approximate.

**Priority:** P3 — Medium. This is a premium differentiation feature for institutions with a long planning horizon and an appetite for strategic foresight. It is not immediately necessary for the core assessment use case but represents a significant capability moat.

**Complexity:** High (months). Requires curating reliable AI capability development and occupational exposure data sources, designing the scenario framework, and developing prompting that produces analytically rigorous rather than speculative outputs.

**Differentiation impact:** High. No competitor is in this space. A COMPASS horizon analysis capability would be unique in the Australian HE market.

**Implementation note:** Anchor the scenarios to specific empirical inputs (current automation exposure scores from O*NET or equivalent, documented AI capability milestones) rather than generating pure speculation. The LLM should be prompted to reason from evidence to scenario implications, not to generate unconstrained futures. Include a clear methodological disclaimer in the output.

---

### 11. TEQSA Standards Alignment Mapping

**Problem it solves:** Australian universities face TEQSA Higher Education Standards Framework (HESF) compliance requirements for program review. The HESF Standards 3 (Teaching and Learning) and 5 (Institutional Quality Assurance) specifically require evidence that programs are reviewed against graduate outcome needs and industry relevance. COMPASS's /dfva assessment produces exactly this evidence, but it is not currently framed against HESF standards — which means quality assurance offices cannot directly use it in TEQSA self-assessments without translating COMPASS's framework language into HESF language.

**Competitive benchmark:** CourseLeaf's SYL module generates audit trails for state transparency mandates (US context). Modern Campus maps outcomes to accreditation standards (US context). Neither competitor addresses TEQSA specifically. This is an Australian-market-specific feature with no direct competitor equivalent.

**What COMPASS should build:** A mapping layer that translates COMPASS dimension scores and findings into the relevant HESF Standard criteria. For each dimension score, include a sidebar annotation identifying the HESF Standard it provides evidence for. The PDF export should include an optional TEQSA Evidence Appendix that lists each relevant HESF criterion, the COMPASS dimension that addresses it, the score received, and the supporting rationale. Position this as COMPASS being a TEQSA-compliant program review methodology, not just an analytical tool.

**Why COMPASS can do this better:** No US-designed competitor understands TEQSA. COMPASS was designed for the Australian HE context, which means building TEQSA alignment into the framework is a logical extension of the design intent rather than a market adaptation. The mapping itself is a prompting and documentation task; the analytical content already exists.

**Priority:** P2 — High. TEQSA alignment significantly expands COMPASS's institutional relevance from "interesting AI tool" to "part of our quality assurance process." It is particularly relevant to Quality Assurance leads and institutional Effectiveness offices who control quality review budgets.

**Complexity:** Low to Medium (days to weeks). The primary work is mapping COMPASS dimensions to HESF criteria (a documentation and framework task), updating the PDF export template to include the TEQSA appendix, and verifying the mapping with a TEQSA/QA specialist.

**Differentiation impact:** High in the Australian market. Creates a formal institutional use case for COMPASS that is embedded in regulatory compliance rather than optional strategic intelligence.

**Implementation note:** Publish the TEQSA-to-COMPASS dimension mapping as a public methodology document, not just an internal product feature. This serves as both product documentation and a credibility signal to institutional buyers — it demonstrates that COMPASS was designed with Australian regulatory requirements in mind and has been systematically mapped against HESF.

---

### 12. Structured Cohort Comparison (Multi-Program Simultaneous Assessment)

**Problem it solves:** When a Faculty Dean is reviewing a portfolio of related programs — for example, a suite of Master of Business programs (MBA, MFA, MAccounting, MManagement) — they need comparative assessment of all programs simultaneously to make discontinuation, consolidation, or investment decisions. Running programs through COMPASS individually and then manually comparing results is operationally cumbersome and introduces comparison error (assessments run at different times, with different evidence availability).

**Competitive benchmark:** No competitor ships simultaneous multi-program comparative assessment. Coursedog's portfolio data is aggregated from operational systems, not generated by simultaneous analytical comparison. This is a COMPASS-native capability.

**What COMPASS should build:** A batch assessment mode where a user can submit a list of program URLs (up to 10-15 programs) and receive a comparative assessment report that runs all programs through /dfva simultaneously and generates: individual scores for each program, a comparative dimension-level heatmap showing where each program is strong and weak, a comparative narrative identifying which programs share common vulnerabilities versus which have distinct risk profiles, and a portfolio-level recommendation for the program group (consolidate / invest / redesign / monitor). The comparative narrative is generated by the LLM reasoning across all program assessments simultaneously, not by mechanical comparison of individual scores.

**Why COMPASS can do this better:** The LLM's ability to reason across multiple programs simultaneously — identifying patterns, shared vulnerabilities, and differentiated strengths across a program group — is architecturally unique. No statistical system can produce the comparative narrative layer. A Dean running a portfolio review of 8 programs does not just want 8 individual scores; they want a strategic reading of the portfolio as a whole, which requires cross-program reasoning.

**Priority:** P2 — High. Batch assessment directly serves the DVC/Dean buyer persona who operates at portfolio scale. It is also a natural extension of the portfolio dashboard feature.

**Complexity:** High (months). Running multiple assessments simultaneously requires parallelised API calls to the LLM, a cross-assessment synthesis prompt, and UI design for comparative display. Anthropic API rate limits and cost management become more complex at batch scale.

**Differentiation impact:** High. Directly serves the highest-value buyer segment (Deans, DVCs) and makes COMPASS indispensable for portfolio-level curriculum reviews.

**Implementation note:** Implement batch assessment as parallelised individual assessments with a synthesis pass at the end, rather than attempting to run all programs in a single prompt. The synthesis pass should receive dimension scores and key findings from each program as structured JSON and generate the comparative narrative from that structured input — this manages context window limits and allows individual assessment quality to be maintained. Include cost estimation before batch runs so users understand the computational cost.

---

### 13. Real-Time Australian Labour Market Signal Refresh

**Problem it solves:** COMPASS's /dfva-market generates labour market intelligence through LLM synthesis, but the currency of that intelligence depends on the training data cutoff and whatever live signals are accessible at generation time. For Australian institutions, the labour market data depth is shallower than US/UK equivalents (acknowledged in the current PRD). Program directors making curriculum decisions based on stale or incomplete labour market signals will be exposed when graduates find that the "high demand" skills identified in their program review were already saturated by the time they graduated.

**Competitive benchmark:** Coursedog's Mapademics integration uses live job posting data but explicitly excludes Australia. Lightcast operates in Australia but is not integrated with any curriculum management system. COMPASS's LLM synthesis approach can access current signals at assessment time, but the sources and their Australian depth need to be systematically strengthened.

**What COMPASS should build:** A curated set of real-time Australian labour market data sources integrated into the /dfva-market prompt context — specifically: SEEK and LinkedIn job posting trend data (accessible via API or structured scraping), Australian Bureau of Statistics Labour Force data, Jobs and Skills Australia occupation outlook data, LinkedIn Economic Graph Australia reports, and professional association workforce surveys for relevant disciplines. At assessment time, the LLM should receive a structured brief of current Australian labour market signals for the graduate occupation space before generating the market intelligence analysis — grounding the output in current data rather than training data inference.

**Why COMPASS can do this better:** Coursedog's Mapademics integration provides pre-structured LMI widgets for US/CA/UK only. COMPASS's LLM can synthesise signals from multiple heterogeneous Australian sources — job posting trends, government labour force statistics, professional body reports — and interpret them in the context of the specific program being assessed. The synthesis and interpretation is the LLM's core competency; the sources just need to be plumbed in.

**Priority:** P2 — High. Australian labour market signal quality is a stated current limitation of the platform. Addressing it directly strengthens the /dfva-market output and reduces the risk of findings being challenged by program directors with better local market knowledge.

**Complexity:** Medium to High (weeks to months). Source integration varies — some sources have public APIs (ABS, Jobs and Skills Australia), others require partnerships or structured retrieval approaches. The LLM integration work is straightforward once sources are accessible.

**Differentiation impact:** High. Directly addresses the deepest competitive gap relative to Coursedog's Mapademics (which has structured LMI but no Australia coverage) and positions COMPASS as the authoritative source for Australian higher education labour market intelligence.

**Implementation note:** Use Claude's tool use capability to retrieve Australian LMI data at assessment time rather than pre-caching, so signals are always current. Structure the data retrieval as a pre-assessment research pass that generates a structured market brief, which is then passed to the scoring LLM as context. This also creates a shareable "market brief" artefact that can be surfaced to users independently of the full /dfva assessment.

---

## Roadmap Phasing Recommendation

### Phase 1 (0–3 months): Sharpen Core Differentiation and Enable Institutional Adoption

These features have the highest immediate impact on assessment credibility, governance usability, and institutional sales motion. They require the least new architectural work and build directly on existing capabilities.

- **P1: Exportable Program Review Evidence Artefact (PDF Report)** — Low complexity. Immediately makes COMPASS findings usable in formal governance processes.
- **P1: Outcomes Alignment Analysis Sub-Dimension** — Medium complexity. Makes COMPASS speak the language curriculum governance committees use.
- **P1: Public Enrolment Signal Integration (QILT / TEQSA / DET Data)** — Medium complexity. Closes the most significant factual gap in the current assessment.
- **P2: Confidence Scoring and Evidence Transparency Layer** — Low to Medium complexity. Addresses the "black box AI" objection before it becomes a sales barrier.
- **P2: TEQSA Standards Alignment Mapping** — Low to Medium complexity. Creates a formal regulatory use case for COMPASS in the Australian market.

Expected outcome of Phase 1: COMPASS assessments are governance-ready documents that can enter formal institutional quality processes. The "opaque AI" objection is neutralised. The Australian regulatory context is addressed explicitly.

### Phase 2 (3–6 months): Expand Use Case to Portfolio Intelligence and Institutional Embedding

These features move COMPASS from a single-program assessment tool to a portfolio-level intelligence platform and begin embedding COMPASS in institutional workflows.

- **P1: Portfolio Dashboard (Within-Institution Program Comparison)** — Medium complexity. Elevates the buyer from program director to DVC/Dean.
- **P2: Real-Time Australian Labour Market Signal Refresh** — Medium to High complexity. Addresses the stated limitation in market intelligence depth.
- **P2: Redesign Roadmap Implementation Tracker** — Medium complexity. Converts single-use assessments into ongoing engagement.
- **P2: Structured Qualitative Input Augmentation (Uploaded Documents)** — Medium complexity. Improves assessment quality for programs with thin public-facing pages.
- **P2: API Endpoint / Webhook for CMS Integration** — Medium complexity. Opens institutional-scale distribution through existing curriculum systems.

Expected outcome of Phase 2: COMPASS is sticky at the institutional level, serving portfolio-level decision-makers. Assessment quality is materially higher for programs with complex curricula. The platform begins appearing inside existing institutional workflows via API.

### Phase 3 (6–12 months): Open New Market Segments and Build Competitive Moats

These features require higher development investment but create durable competitive advantages that are difficult for competitors to replicate quickly.

- **P2: Structured Cohort Comparison (Multi-Program Simultaneous Assessment)** — High complexity. Directly serves Deans and DVCs with portfolio review mandates.
- **P3: Comparative Peer Benchmarking (National / Discipline Cluster)** — High complexity. Requires assessment dataset volume from Phases 1-2.
- **P3: AI Disruption Scenario Modelling (Horizon Analysis)** — High complexity. Category-defining strategic foresight capability with no competitor equivalent.

Expected outcome of Phase 3: COMPASS has a benchmark dataset and scenario analysis capability that no competitor can replicate without building an equivalent assessment infrastructure from scratch. The product is defensible not just on current capability but on accumulated intelligence.

---

## Features COMPASS Should NOT Build

**Curriculum approval workflow and multi-stage governance routing.** CourseLeaf and Modern Campus have spent years building workflow engines with hundreds of institutional clients and deep SIS integrations. Building a competing workflow system would require COMPASS to divert engineering resources from AI capabilities to configuration management, role-based routing, audit trail maintenance, and SIS data sync — precisely the commodity infrastructure that COMPASS's zero-integration architecture was designed to avoid. COMPASS belongs inside the workflow as the intelligence layer, not as the system running the workflow.

**Section scheduling and room conflict management.** Scheduling is an operational function that requires real-time SIS data feeds, drag-and-drop UI, and constraint-checking logic that has nothing to do with program viability intelligence. Coursedog's scheduling ML is built on years of SIS integration investment. Entering this market would make COMPASS a direct competitor to well-resourced operational tools in a space where its LLM architecture provides no advantage.

**Student retention early warning dashboards.** Retention analytics require individual student-level data from LMS, SIS, and attendance systems. This is a different regulatory environment (student data privacy), a different buyer (student success advisors), and a different product category (case management). It would require COMPASS to become a student-data platform, which is architecturally, commercially, and ethically distinct from its current position as a program intelligence tool.

**SIS bidirectional integration and data synchronisation.** Bidirectional SIS sync would make COMPASS a system of record competing with CourseLeaf and Coursedog on integration maintenance — the exact burden that COMPASS's URL-based intake was designed to eliminate. The zero-integration architecture is COMPASS's primary sales advantage in a market where IT integration projects take 3-12 months. Trading that advantage for SIS integration capability would remove COMPASS's most distinctive go-to-market differentiator.

**Course evaluation administration and delivery.** Administering student evaluations is an operational survey function owned by quality offices and delivered through purpose-built platforms. COMPASS should accept evaluation data as optional input to viability assessments (via document upload), but building the delivery infrastructure — mobile survey design, response collection, faculty dashboards, completion rate optimisation — adds operational complexity without advancing the core intelligence mission.

**CMS and web content publishing tools.** Web content management and marketing personalisation are a different product category serving digital marketing directors. There is no natural connection between curriculum viability intelligence and web content publishing. Building CMS capability would confuse COMPASS's identity, dilute its positioning as an academic intelligence platform, and enter a crowded MarTech category where it has no structural advantage.

---

## One-Page AI Strategy Summary

COMPASS is building the only AI-native curriculum intelligence platform in Australian higher education — a product that applies large language model reasoning to the question that every university is now being forced to answer: are our programs preparing graduates for a world in which AI is a permanent feature of professional work, and if not, what must change? The strategic logic is simple but the execution window is narrow. No incumbent curriculum management system — not CourseLeaf, not Modern Campus, not Coursedog — has shipped generative AI applied to program-level curriculum analysis. Coursedog is the most credible threat to close this gap, but its current AI investment is in scheduling demand forecasting and US-only labour market data widgets; it has not applied an LLM to curriculum reasoning and has no public roadmap to do so. COMPASS's defensible position is built on three compounding advantages: the depth of the 10-dimension viability framework as a recognised analytical standard for Australian HE curriculum governance, the zero-integration deployment model that makes COMPASS accessible to decision-makers without IT project involvement, and the accumulating assessment dataset that will, over time, generate benchmark intelligence no competitor can replicate without first building an equivalent scoring infrastructure. The product direction for the next 12 months is to move from assessment tool to portfolio intelligence platform — making individual program scores meaningful through comparative benchmarking, making findings governance-ready through structured export and TEQSA alignment, and making the redesign roadmap a living action plan rather than a point-in-time document. The goal is institutional embedding: COMPASS assessments becoming standard evidence in faculty board reviews, DVC academic planning cycles, and TEQSA self-assessments — not because they are mandated, but because they are the most analytically rigorous program review methodology available and the only one that directly addresses AI disruption as a first-class curriculum risk.
