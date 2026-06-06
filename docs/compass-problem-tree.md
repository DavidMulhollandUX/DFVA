# Problem Tree Analysis: AI Disruption of the University Sector

**Team expertise:** Service Design, Customer Experience, AI — applied within the Higher Education sector.

**Purpose:** To identify structural root causes of AI disruption to university degrees, select a root cause to investigate further, and identify existing markets to research for venture opportunities.

---

## Core Problem (Trunk)

University degrees are failing to maintain economic value in an AI-augmented labour market, and institutions lack the mechanisms to detect or respond to this before it compounds.

---

## Root Causes

---

### Root Cause 1: Curriculum governance structures are designed for stability, not adaptability

University curriculum approval processes were designed to ensure rigour and consistency, not to track a fast-moving external environment. At the University of North Carolina Charlotte, major curriculum changes averaged 174 days end-to-end; minor changes averaged 102 days. At Montana State University, Board of Regents approval is followed by an 18-month period for detailed program proposals, and SACSCOC accreditation preapproval can require up to 12 months' advance notice. Against these timelines, the World Economic Forum projects that 39% of key required skills will change by 2030, and McKinsey estimates that current technologies could automate 57% of U.S. work hours today (McKinsey Global Institute, 2025). The structural mismatch is approximately 5–10x: market change cycles run at 12–18 months while governance cycles run at 18–84 months.

The root cause is not bureaucratic inefficiency. It is that curriculum governance was designed around a different assumption: that the environment a degree prepares graduates for is stable enough for a multi-year approval cycle to remain fit-for-purpose. That assumption no longer holds.

**References:**
- UNC Charlotte Office of the Registrar, Curriculum Approval Data (2013–14)
- Academic Senate for California Community Colleges (ASCCC), *Ensuring Effective Curriculum Approval Processes* (2016)
- World Economic Forum, *Future of Jobs Report 2025* (January 2025)
- McKinsey Global Institute, *Agents, Robots, and Us: Skill Partnerships in the Age of AI* (November 2025)

**Most relevant existing market/ecosystem:**
Curriculum management software and academic workflow technology — vendors including Coursedog, CurriculuMind, Learnosity, and Acalog provide platforms that manage curriculum lifecycle, approval workflows, and programme administration for universities. This market is adjacent to enterprise workflow and BPM software and sits within the broader HE administrative technology sector.

**Overlap with team expertise:**
Service design expertise directly maps to the challenge of redesigning the workflow through which curriculum decisions are made, approved, and implemented. AI expertise is relevant to embedding automated signals (e.g. labour market data, enrolment trends) into governance workflows. CX experience applies to designing processes around the needs of practitioners (curriculum coordinators, program directors) rather than governance structures.

**Where expertise may fall short or need supplementing:**
The political economy of academic governance — faculty senate structures, peak bodies, and the relationship between school-level and institution-level approval — is a specialist domain. Literature on higher education organisational change (Kezar, Eckel & Hill) and expertise from academic registrars or curriculum leads would be needed.

---

### Root Cause 2: The feedback loop from employer to curriculum designer is structurally broken

The natural mechanism for employers to influence curriculum — industry advisory boards, graduate employer surveys, and graduate outcomes data — operates on a timeline that renders it ineffective as a real-time signal. Australia's Graduate Outcomes Survey (GOS), administered through QILT, collects data from graduates approximately four to six months post-graduation, with longitudinal data three years out. This means curriculum taught today is informed by employer expectations up to seven years old: the delay from degree design to graduate outcomes data spans one full curriculum approval cycle.

The Cengage Group's 2025 Graduate Employability Report — drawn from 865 hiring managers, 971 recent graduates, and 698 instructors — found that 96% of employers agree colleges fall short in workforce preparation, and only 30% of 2025 graduates secured full-time roles in their degree field, down from 41% in 2024. The Lumina Foundation reported that 69% of employers require recent hires to undergo moderate to significant additional training (Lumina-Gallup Report, 2026).

The feedback loop does not fail because employers are disengaged. It fails because the structural channel through which their signal reaches curriculum designers is discontinuous, lagged, and non-systematic. Industry advisory boards meet infrequently, membership rotates, and outputs are advisory rather than binding.

**References:**
- Cengage Group, *2025 Graduate Employability Report* (September 2025)
- Lumina Foundation / Gallup, *Aligning Education and Work* (2026)
- QILT Graduate Outcomes Survey — methodology documentation
- NACEWEB, *The Gap in Perceptions of New Grads' Competency Proficiency* (2025)

**Most relevant existing market/ecosystem:**
Labour market intelligence and workforce analytics platforms — vendors including Lightcast (formerly Burning Glass), LinkedIn Talent Insights, SEEK Talent Insights (Australia), and Faethm/Pearson provide real-time skills demand data, role transformation forecasting, and employer hiring signal analysis. This market primarily serves HR teams, workforce planners, and government labour departments. A secondary adjacency is the employer engagement platform market (Handshake, GradConnection, Symplicity) which facilitates relationships between institutions and employers at the placement/careers layer.

**Overlap with team expertise:**
CX and service design expertise directly applies to the experience of the employer as a stakeholder in the education system — their current experience of giving input to curriculum is typically poor (infrequent surveys, low-trust advisory structures). AI expertise is relevant to how real-time labour market signals could be ingested, synthesised, and surfaced in a form useful for curriculum teams.

**Where expertise may fall short or need supplementing:**
Labour economics and workforce forecasting methodology — the underlying models used by Lightcast, Faethm, and similar vendors involve occupational classification systems (SOC/ANZSCO), skills ontologies, and econometric modelling. Understanding validity and limitations of automated job-market signal data would require engagement with labour economists or workforce researchers. The employer-side also involves HR and talent acquisition professionals whose workflows differ significantly from the education sector.

---

### Root Cause 3: Students make high-stakes decisions on incomplete, backwards-looking information

Prospective students choosing a degree are making financial commitments of $40,000–$200,000+ over three to four years with almost no access to standardised, forward-looking evidence about graduate outcomes. The Institute for Research on Public Policy (IRPP) found in February 2024 that prospective students "cannot easily compare graduation rates between institutions or programs" and lack accessible data on "types of jobs, average earnings, and student-debt levels" — with post-secondary outcome information described as "inconsistent and often inaccessible." Universities either decline to release outcome data or simply do not collect it.

Where data does exist — in Australia's QILT GOS, the UK's Graduate Outcomes Survey, or the US College Scorecard — it measures historical outcomes for previous cohorts, not the likely outcomes for students enrolling today into a labour market transformed by AI. The dominant information proxies students rely on — institutional reputation, QS and Times Higher Education rankings, peer and family advice — are correlated with past performance and prestige, not with a degree's forward labour-market durability. WEF (2025) projects that 22% of current jobs will fully disappear or be substantially revised by 2030, concentrated in the entry-level roles that graduates from many disciplines are initially hired into.

**References:**
- Institute for Research on Public Policy (IRPP), Policy Options, *Picking a University or College? Better Trust Your Gut* (February 2024)
- World Economic Forum, *Future of Jobs Report 2025* (January 2025)
- QILT Graduate Outcomes Survey, methodology and reporting framework
- ILO, *Generative AI and Jobs: A Refined Global Index of Occupational Exposure*, Working Paper 140 (May 2025)

**Most relevant existing market/ecosystem:**
Student decision support and higher education comparison platforms — including IDP Education, Keystone Academic Solutions, The Uni Guide (UK), Whatuni, Unibuddy, and the Australian government's Course Seeker and MySkills platforms. Adjacently, the consumer fintech and major-purchase decision support market offers relevant design patterns: tools that help consumers make high-commitment decisions with incomplete information (mortgage calculators, superannuation projections, insurance comparison) have developed UX conventions and trust frameworks that are directly transferable.

**Overlap with team expertise:**
CX and service design expertise is highly relevant to the design of the student decision journey — mapping where information is sought, what trust signals matter at each stage, and what a better information experience looks like. Understanding this as a service design problem (the student as user, the information gap as a service failure) is directly within scope.

**Where expertise may fall short or need supplementing:**
Consumer behaviour research and decision science — specifically how people process probabilistic or forward-looking information under uncertainty — is a specialist domain. Research on how students actually weight different signals (Hillman et al.; Hossler & Gallagher on college choice models) requires engagement with education psychology and behavioural economics literature. The regulatory context of consumer information disclosure in higher education (ASQA/TEQSA in Australia, OfS in the UK, FTC in the US) involves compliance frameworks outside the team's current domain.

---

### Root Cause 4: Accreditation and quality assurance frameworks assess compliance, not curriculum durability

Accreditation bodies — TEQSA in Australia, QAA in the UK, regional accreditors (SACSCOC, HLC, WASC) and professional accreditors (Engineers Australia, CPA Australia, the Law Society) — set the quality floor that university programs must meet. These frameworks determine what gets built and what gets reviewed. Currently, they do not include labour-market durability, AI-resilience of graduate capability, or forward-looking employability as formal quality criteria.

TEQSA's September 2025 publication *Enacting Assessment Reform in a Time of Artificial Intelligence* represents the regulator's first substantive AI guidance — and its primary focus is on academic integrity (preventing AI-assisted cheating), not on whether curricula produce graduates capable of working in AI-augmented environments. QAA's Quality Code (2024 version, effective 2025–26) introduces language around "authentic, employability-based assessment" but does not establish measurement standards for forward-looking graduate capability.

The consequence is that a university program can be fully accredited, fully compliant, and simultaneously producing graduates systematically underprepared for the labour market they will enter. Accreditation compliance creates a false assurance — for institutions, for students, and for employers — that quality has been certified when what has been certified is process conformance.

**References:**
- TEQSA, *Enacting Assessment Reform in a Time of Artificial Intelligence* (September 2025)
- QAA, *UK Quality Code for Higher Education* (June 2024)
- QAA, *Exploring Graduate and Employer Perceptions and Expectations* (June 2025)
- ILO, *Generative AI and Jobs* (May 2025)

**Most relevant existing market/ecosystem:**
Regulatory technology (RegTech) for education and compliance management platforms — including Watermark (formerly Taskstream/AMS), Degree Qualifications Profile frameworks, and platforms supporting TEQSA self-assessment and evidence management. More broadly, the quality assurance and audit technology sector (covering industries from financial services to healthcare) has developed substantial tooling for evidence-based compliance not yet well-translated into higher education. Professional accreditation bodies (Engineers Australia, AACSB for business, ABET for engineering) represent a secondary research target, as they often move faster than national regulators.

**Overlap with team expertise:**
Service design expertise applies directly to the question of how accreditation review processes could be redesigned — the current service blueprint of a TEQSA Higher Education Standards Framework review is complex and largely paper-based. AI expertise is relevant to how evidence gathering and rubric-scoring processes could be automated or accelerated. CX expertise maps to the experience of academic staff navigating accreditation requirements, which is a significant pain point.

**Where expertise may fall short or need supplementing:**
Accreditation governance and policy expertise is highly specialised. The standards frameworks are produced through multi-stakeholder negotiation involving government, peak bodies, and professional associations; changing them requires policy advocacy, not product design. Understanding this market requires engagement with accreditation practitioners, higher education regulators, and policy researchers (e.g. HEPI in the UK, NCSPE in the US, LH Martin Institute in Australia).

---

### Root Cause 5: University funding models reward enrolment volume rather than graduate outcome quality

The primary funding mechanism in Australian higher education — Commonwealth Supported Places (CSPs) — allocates government subsidy on a per-enrolment basis. The 2008 Bradley Review recommended, and the 2012 reform implemented, an uncapped demand-driven system in which funding followed student choice without constraint on total enrolment numbers. This created a structural incentive to maximise enrolments, independent of graduate outcomes.

The Augar Review in the UK (2019) identified an analogous problem: "incentives are stacked in favour of provision and take-up of three-year full-time undergraduate degrees," with standalone Level 4 and 5 courses declining 40% since 2015 and "wide variation in spend on subjects in the same funding categories at similar institutions, with no known correlation to outcomes." The OECD's Education at a Glance 2025 notes that across OECD jurisdictions, fewer than half of systems base core teaching funding on graduation rates, and performance-based funding remains the exception. Research on performance-based funding (New America, 2024–25) has found that where it does exist, it creates "perverse incentives" that limit access for underserved populations and can "exacerbate rather than ameliorate inequities."

**References:**
- Bradley Review, *Review of Australian Higher Education* (Department of Education, 2008)
- Augar Review, *The Post-18 Education Review* (UK Government, 2019)
- OECD, *Education at a Glance 2025* (September 2025)
- OECD, *Financial Sustainability of Higher Education* (November 2025)
- New America / AAUP research on performance-based funding (2024–25)

**Most relevant existing market/ecosystem:**
Higher education policy consulting and institutional strategy — Deloitte, EY-Parthenon, McKinsey Education Practice, PwC Higher Education Advisory, and domestic specialists (Nous Group, BCG's education practice in Australia) operate in the space of advising governments and institutions on funding reform, portfolio strategy, and organisational change. Adjacent to this is the outcomes-based contracting and social impact bond market, which has developed models for funding mechanisms tied to outcomes rather than outputs.

**Overlap with team expertise:**
This root cause is the most removed from the team's core expertise. It is primarily a policy, economics, and political economy problem. Service design and CX expertise could contribute to understanding the experience of institutions operating under these incentive structures — what decisions are made, by whom, and under what constraints — but the primary levers for change are regulatory and legislative, not experiential.

**Where expertise may fall short or need supplementing:**
Higher education economics, public policy, and government relations expertise would be required to research this market area credibly. Understanding how funding reform has worked in comparable jurisdictions (e.g. England's Research Excellence Framework; the US College Scorecard's evolution toward outcome transparency) requires engagement with higher education policy researchers and economists.

---

### Root Cause 6: Academic faculty lack the capability to redesign curricula for AI-augmented workplaces

For curriculum to change, someone must redesign it. That requires faculty who understand both their discipline and the ways AI is transforming the graduate roles that discipline prepares students for. Evidence suggests this capability is systematically underdeveloped. A 2025 study published in *Frontiers in Education* (112 academic staff) found that participants perceived AI literacy as a "weak element in the curriculum," lacked foundational AI knowledge, and struggled to recognise discipline-relevant AI tools. An ERIC-published study (Salhab, 2024; 176 college instructors across nine departments) identified "lack of AI guidelines and concepts" as the primary barrier to integration, with a significant intention-behaviour gap: faculty rated AI ethics and domain specificity as important, but this did not predict AI tool integration in practice. EDUCAUSE's 2024 AI Literacy Framework identified four systemic competency gaps: technical understanding, evaluative skills, practical application, and ethical reasoning — and noted the absence of comprehensive training programs.

The structural cause beneath the capability gap is that most faculty were trained in disciplines — and in research environments — where AI was not a core professional competency. Professional development frameworks within universities have not caught up, and there is no national curriculum standard for AI teaching competency in most jurisdictions.

**References:**
- Frontiers in Education, *Perspectives of Academic Staff on AI in Higher Education* (2025)
- Salhab, R., *AI Literacy Across Curriculum Design: Investigating College Instructors' Perspectives*, Online Learning Journal, Vol. 28, No. 2 (2024) — ERIC EJ1428258
- EDUCAUSE, *AI Literacy in Teaching and Learning: A Durable Framework for Higher Education* (Kassorla, Georgieva, Papini, October 2024)

**Most relevant existing market/ecosystem:**
Professional development and faculty upskilling platforms in higher education — Coursera for Campus, LinkedIn Learning for Higher Education, Degreed, EdX for Business, and domestic providers (Academic Impressions in the US, Advance HE in the UK). The broader learning and development (L&D) technology market — covering enterprise learning management, skills gap analysis, and upskilling platform vendors — is a useful research frame, as higher education faculty development sits within it as a niche segment. A further adjacency is the teacher professional development market in K-12, which is more mature and has developed models for embedding new competency frameworks into a workforce with structural resistance to change.

**Overlap with team expertise:**
This root cause is highly aligned with the team's combined expertise. Service design and CX expertise is directly applicable to the design of faculty development experiences — the experience of an academic encountering a professional development requirement is a service design problem, with known pain points (time pressure, relevance to discipline, lack of recognition). AI expertise is directly relevant both as the subject matter of faculty development and as a potential tool in designing personalised learning pathways. Higher education sector knowledge means the team understands the institutional structures (schools, faculties, HR, professional development units) through which change must travel.

**Where expertise may fall short or need supplementing:**
Adult learning theory and instructional design — specifically how experienced professionals acquire and integrate new competencies — is a distinct discipline. Research on faculty adoption of educational technology (Rogers' diffusion of innovations as applied to HE; SAMR model) and the organisational behaviour of academic communities (professional identity, autonomy, peer norms) would require engagement with educational psychologists, instructional designers, and higher education organisational change researchers.

---

## Summary

| Root Cause | Existing Market to Research | Expertise Overlap | Gap / Need |
|---|---|---|---|
| 1. Curriculum governance lag | Curriculum management & academic workflow tech | Service design of governance workflows; AI-embedded signals | Academic governance politics; institutional change management |
| 2. Broken employer-curriculum feedback loop | Labour market intelligence platforms; employer engagement tech | CX of employer as stakeholder; AI signal synthesis | Labour economics; workforce forecasting methodology; HR tech |
| 3. Student information asymmetry | Student decision support platforms; consumer comparison tools | Student journey mapping; CX of information-poor decisions | Decision science; behavioural economics; HE consumer regulation |
| 4. Accreditation doesn't measure durability | RegTech for education; QA and audit technology | Accreditation process redesign; AI-assisted evidence gathering | Accreditation governance; policy advocacy; regulatory expertise |
| 5. Funding models reward enrolment, not outcomes | HE policy consulting; outcomes-based contracting | Limited — primarily a policy/economics problem | HE economics; government relations; public policy |
| 6. Faculty lack AI capability to redesign curricula | Faculty professional development; L&D tech platforms | Learning experience design; AI subject matter expertise; HE context | Adult learning theory; instructional design; academic culture change |

---

## Markets Identified for Further Investigation

The problem tree analysis identified two markets for initial investigation, chosen because they sit closest to the highest-leverage root causes and offer the best overlap with the team's expertise in Service Design, Customer Experience, and AI in Higher Education.

**Primary: Labour market intelligence platforms**

Vendors including Lightcast (formerly Burning Glass), LinkedIn Talent Insights, Faethm/Pearson, and SEEK Talent Insights already provide real-time employer skills demand data, role transformation forecasting, and hiring signal analysis. This market is mature, has established enterprise customers, and operates on well-understood business models. The critical observation from the problem tree is that this intelligence currently flows to HR teams and workforce planners — not to the curriculum designers who need it most. The gap between what this market produces and what reaches a curriculum review committee is the structural root cause of misalignment. Investigating this market will reveal what intelligence already exists, who pays for it, and why it has not yet crossed into the curriculum design workflow.

**Secondary: Faculty professional development and L&D technology**

Platforms including Coursera for Campus, Advance HE, and Degreed serve the market for upskilling academic staff — a market with documented demand given research showing faculty AI literacy as a systemic gap across institutions (EDUCAUSE, 2024; Frontiers in Education, 2025). This market is directly aligned with the team's AI expertise and learning experience design capability, and offers a clear and accessible entry point for customer discovery conversations with academic staff.

---

---

## System Map: Market Structure Analysis

**Methodology:** Steve Blank's iterative industry mapping approach — start with what is already known, then use open questions to drive successive rounds of research and refinement. Maps are living documents; the first pass is a starting point, not a finished product.

**Reference:** Steve Blank, *Mapping the Unknown: The Ten Steps to Map Any Industry* (2022) — https://steveblank.com/2022/09/20/mapping-the-unknown-the-ten-steps-to-map-any-industry/

Each map below is structured across four participant categories:
- **Direct participants** — producers, aggregators, distributors
- **Influencers** — regulators, investors, research institutions, standards bodies
- **End users** — those who use the final products and services
- **Adjacent industry players** — those involved but not neatly categorised above

---

### System Map 1: Labour Market Intelligence Platforms

*This market produces and sells real-time data on employer skills demand, role transformation, and hiring signals. The primary observation from the problem tree: this intelligence currently flows to HR teams and workforce planners — not to curriculum designers.*

#### Direct Participants

| Category | Key Players |
|---|---|
| Raw data sources | Job boards (SEEK, Indeed, LinkedIn, Glassdoor); government labour statistics (ABS, BLS, ONS); professional association salary surveys; employer HR systems |
| Platform vendors / aggregators | Lightcast (merger of Burning Glass + EMSI); LinkedIn Talent Insights; Faethm (acquired by Pearson); SEEK Talent Insights (ANZ); Revelio Labs; Textkernel; Jobspikr |
| Distributors / consultancies | Deloitte, McKinsey, PwC — purchase and resell LMI insights within advisory engagements; staffing and recruitment firms (Hays, Robert Half) |
| Data infrastructure | Skills ontology providers: O\*NET (US), ANZSCO (Australia/NZ), ESCO (EU), SFIA Foundation |

#### Influencers

| Category | Key Players |
|---|---|
| Government and regulators | Australian Bureau of Statistics (ABS); Department of Employment and Workplace Relations (DEWR); UK Office for National Statistics (ONS); US Bureau of Labor Statistics (BLS) — fund and publish official labour data that underpins commercial platforms |
| Industry associations | Australian HR Institute (AHRI); CIPD (UK); SHRM (US) — shape demand-side vocabulary and skills frameworks |
| Research institutions | National Centre for Vocational Education Research (NCVER); ACER; ILO; WEF; McKinsey Global Institute — produce reports that define the narrative LMI vendors sell against |
| Investors | Private equity firms backing LMI vendors (Lightcast has PE backing); venture capital in adjacent workforce tech |
| Standards bodies | O\*NET Center; ANZSCO classification system; ESCO (European Skills, Competences and Occupations) — define the taxonomies that enable cross-platform comparison |

#### End Users

| User group | Current relationship to LMI |
|---|---|
| HR departments and Chief People Officers | Primary buyers — use LMI for workforce planning, compensation benchmarking, and skills gap analysis |
| Government workforce and economic development agencies | Use LMI for regional skills policy, training investment decisions, and labour market reporting |
| Staffing and recruitment firms | Use LMI for market intelligence on candidate supply/demand and fee-rate benchmarking |
| University careers and employability teams | Secondary/underserved buyers — use LMI for careers advice and graduate outcome reporting, but typically at low depth |
| Curriculum designers and program directors | Largely absent from this market — represent a potential unserved segment |

#### Adjacent Industry Players

| Category | Key Players |
|---|---|
| HR technology ecosystem | ATS vendors (Workday, SAP SuccessFactors, Oracle HCM, Greenhouse) — LMI data increasingly embedded as a module within broader HR platforms |
| VET and training sector | TAFEs, private RTOs, and registered training organisations in Australia actively use LMI to design training packages; more mature relationship than higher education |
| Accreditation bodies | TEQSA, Engineers Australia, AACSB — could use LMI data to assess program-market alignment but currently do not do so systematically |
| Professional certification bodies | CPA Australia, the Law Society, Engineers Australia — maintain their own skills frameworks that partially overlap with LMI taxonomies |

#### Open Questions

The following questions represent gaps in current understanding to be addressed through primary and secondary research:

1. Who specifically within a university purchases LMI data today — and under what budget line? (Careers office? Research office? Institutional research?)
2. What is the typical contract structure and value for a university client vs. a large employer client?
3. How does Faethm's university penetration compare to its corporate penetration in Australia specifically?
4. How do LMI vendors currently segment their go-to-market — by industry vertical, by organisation size, or by use case?
5. What is the experience of a curriculum designer who encounters LMI data today — do they access it at all, and in what form?
6. How do the major skills taxonomies (O\*NET, ANZSCO, ESCO, Lightcast's proprietary taxonomy) map to or conflict with each other — and what does this mean for cross-market comparability?
7. Is there an existing integration between any LMI platform and any curriculum management system (Coursedog, Acalog)?
8. What share of LMI vendor revenue comes from higher education vs. corporate clients?

---

### System Map 2: Faculty Professional Development and L&D Technology

*This market provides upskilling, professional certification, and learning tools to academic staff in higher education. The primary observation from the problem tree: faculty AI literacy is a documented systemic gap, and the professional development market has not yet responded at scale.*

#### Direct Participants

| Category | Key Players |
|---|---|
| Content producers | Academic publishers (Elsevier, Springer, Pearson); specialist PD content creators; universities themselves (open courseware, peer learning programs) |
| Platform vendors | Coursera for Campus; edX for Business (2U); LinkedIn Learning for Higher Education; Degreed; Cornerstone OnDemand; Absorb LMS |
| Peak body providers | Advance HE (UK) — primary provider of fellowship-level academic PD through the HEA framework; no direct Australian equivalent at the same scale |
| Internal providers | Teaching and learning centres within universities; HR/People & Culture professional development units |
| Specialist AI training providers | Emerging category — providers positioning specifically for AI upskilling in professional and academic contexts (e.g. DeepLearning.AI, fast.ai, internal programs from Microsoft and Google) |

#### Influencers

| Category | Key Players |
|---|---|
| Regulators | TEQSA (Australia) — Higher Education Standards Framework includes requirements around staff capability; regulatory pressure can mandate PD uptake |
| Accreditation and quality frameworks | HESF (Higher Education Standards Framework); QAA Quality Code (UK) — define the baseline expectations for academic staff capability |
| Peak bodies | Universities Australia; Group of Eight; HERDSA (Higher Education Research and Development Society of Australasia) — shape professional norms and what "good" looks like for academic staff |
| Research institutions | LH Martin Institute; EDUCAUSE; NCSEHE — produce research that defines the faculty development gap and influences institutional policy |
| Technology vendors as influencers | Microsoft (Copilot for Education), Google (Workspace for Education), OpenAI — actively shaping AI literacy frameworks in education through their own free/subsidised programs, creating both demand and competitive pressure |
| Investors | VC and PE firms backing EdTech platforms; government grant programs for digital capability in HE |

#### End Users

| User group | Current relationship to this market |
|---|---|
| Academic faculty and lecturers | Primary intended beneficiaries — typically reluctant consumers of mandated PD; more engaged with discipline-specific or voluntary, self-directed learning |
| Instructional designers and learning designers | Active users — often the intermediary between platform content and academic staff |
| Department heads and program directors | Buyers at the school/faculty level — often control PD budgets but are not the direct users |
| HR and People & Culture teams | Buyers at the institutional level — procure platforms, manage compliance-based PD requirements |
| Professional staff in universities | Secondary users — often share platforms with academic staff but have different development needs |

#### Adjacent Industry Players

| Category | Key Players |
|---|---|
| Learning management systems (LMS) | Canvas, Moodle, Blackboard (Anthology) — closely adjacent; the line between LMS and PD platform is blurring as LMS vendors add staff development modules |
| HR technology platforms | Workday, SAP SuccessFactors — used by university HR departments; PD tracking increasingly integrated here |
| VET sector PD providers | TAFE, private RTOs — more mature tradition of mandatory, credential-based staff PD; HE sector has historically been more informal |
| AI tool vendors | Microsoft, Google, Adobe — offering free or low-cost AI literacy programs directly to educators, partially bypassing the commercial PD market |
| Instructional design consultancies | Boutique firms providing bespoke curriculum redesign and faculty coaching — not platform-based but serve the same underlying need |

#### Open Questions

1. How do universities currently fund faculty professional development — centrally through HR, through faculty-level budgets, or through individual research accounts?
2. What is the decision-making process for procuring a faculty PD platform — who holds budget authority and what triggers a purchase?
3. What is the completion and engagement rate for current digital PD offerings at Australian universities?
4. How does the Advance HE fellowship framework operate in Australia — is HEA fellowship recognised or incentivised by Australian institutions?
5. Is there a documented link between faculty AI literacy and curriculum redesign outcomes — or is the relationship assumed rather than evidenced?
6. What distinguishes faculty members who voluntarily upskill in AI from those who do not — intrinsic motivation, career incentives, time availability, or something else?
7. Are there existing institutional programs at Australian universities that have demonstrably improved faculty AI capability at scale?
8. How are AI tool vendors (Microsoft, Google) affecting the commercial faculty PD market — are they substituting for it or creating demand that platforms then capture?

---

---

### Improvement Round: Relationships, Flows, and Groupings

*Following the Steve Blank iterative methodology, this section applies the five improvement questions to each market to deepen understanding beyond the first-pass participant inventory. The most important new layer is relationships — who sells what to whom, and how money and information move through the system.*

---

#### Market 1: Labour Market Intelligence — Relationship and Flow Analysis

**How money flows**

| From | To | What is exchanged |
|---|---|---|
| Job boards (SEEK, Indeed, LinkedIn) | LMI platform vendors (Lightcast, Faethm) | Raw job posting data, API access — sold or licensed |
| Government (ABS, BLS, ONS) | LMI platform vendors | Free official labour statistics — foundational data layer |
| LMI platform vendors | HR departments / Chief People Officers | Analytics subscriptions — primary revenue stream |
| LMI platform vendors | Government workforce and economic development agencies | Data subscriptions and custom reports |
| LMI platform vendors | Consulting firms (Deloitte, McKinsey, PwC) | Data API access and white-label licensing |
| Consulting firms | Corporations and governments | Advisory services with LMI insights embedded — high-margin resale |
| LMI platform vendors | Staffing and recruitment firms | Market intelligence subscriptions |
| LMI platform vendors | Universities (careers offices, institutional research) | Subsidised or institutional subscriptions — lower revenue priority segment |
| Skills ontology bodies (O\*NET, ANZSCO) | LMI vendors | Free taxonomy frameworks — infrastructure, not revenue |

**How information flows**

The dominant information loop in this market is circular and self-reinforcing:

1. Employers post jobs → captured by job boards → scraped and processed by LMI vendors → sold as hiring intelligence → back to HR teams at the same employers

This loop excludes curriculum designers entirely. The intelligence is produced from employer behaviour and sold back to employers. Universities sit outside the loop as occasional, low-priority consumers of outputs — not as active participants shaping what gets measured.

A secondary information flow runs through research and policy: WEF, McKinsey, ILO publish macro reports → these shape the narrative that LMI vendors use in sales and marketing → which influences what metrics customers request → which shapes what LMI vendors measure and surface.

**Most interesting groupings and why**

The most revealing way to group participants in this market is by **proximity to the curriculum decision** — specifically, how far each player is from the moment when a program director decides what to teach next year.

- **Closest:** Curriculum designers, program directors, academic leads — the people who could act on LMI data but currently don't receive it
- **Middle distance:** University careers offices and institutional research teams — they receive some LMI data but in formats designed for HR reporting, not curriculum design
- **Furthest:** Job boards, government statistics bodies — produce the raw signal, entirely disconnected from curriculum

This grouping reveals the structural gap: the signal exists at the far end of the chain. The market has not built a distribution pathway to the near end.

**Most influential organisations**

- **Lightcast** — dominant in English-speaking markets following the Burning Glass / EMSI merger; sets the de facto standard for skills taxonomy in commercial LMI
- **LinkedIn** — uniquely positioned because it holds both supply-side (candidate profiles, skills self-report) and demand-side (job postings, employer hiring behaviour) data simultaneously; no other player has this
- **Australian Bureau of Statistics (ABS)** — upstream data authority for Australian labour market; commercial platforms depend on its classifications and survey data
- **Faethm (Pearson)** — notable because it is owned by an education company, creating a structural incentive to connect LMI data to education decisions that no other major vendor has

---

#### Market 2: Faculty Professional Development / L&D Technology — Relationship and Flow Analysis

**How money flows**

| From | To | What is exchanged |
|---|---|---|
| University central HR / P&C budgets | Platform vendors (Coursera for Campus, Degreed, LinkedIn Learning) | Platform subscription fees — institutional licence |
| University faculty / school budgets | Advance HE | Fellowship program fees — individual and cohort enrolment |
| Government (DESE, TEQSA-adjacent grants) | Universities | Digital capability uplift grants — flows through to platform procurement |
| Content producers (publishers) | Platform vendors | Licensed content — bundled into platform offerings |
| Microsoft / Google / Adobe | Universities | Free or heavily subsidised AI literacy programs for educators — not a revenue flow; a strategic land-grab |
| Universities (internal) | Faculty | Free internal PD through teaching and learning centres — a significant non-commercial flow that competes with the external market |

**How information flows**

A critical dynamic in this market is that a large share of professional development activity is **non-commercial and internal**, delivered by teaching and learning centres within universities. This means that the commercial platform market captures only a portion of total faculty development activity — and the most engaged, intrinsically motivated faculty often prefer internal or discipline-community-led learning over platform-based courses.

A second important flow: **TEQSA and the HESF set the compliance floor** → universities translate this into HR policy → HR policy creates mandatory PD requirements → these flow to faculty as compliance obligations → some portion of commercial platform procurement is driven by the need to demonstrate compliance, not genuine capability development.

A third emerging flow: **Microsoft, Google, and OpenAI are entering this market with free AI literacy programs** targeted directly at educators. This creates demand (normalising AI in education) while simultaneously undercutting the commercial PD market. It also creates a data collection opportunity for these vendors — understanding how educators engage with AI tools.

**Most interesting groupings and why**

The most revealing way to group participants in this market is by **faculty motivation to engage with professional development**:

- **Intrinsically motivated:** Faculty who self-direct learning, typically in research-intensive institutions; engage with specialist, discipline-relevant content; less likely to engage with generic platform content
- **Compliance-driven:** Faculty responding to mandatory requirements from TEQSA, institutional policy, or accreditation; engage with whatever satisfies the requirement at minimum effort
- **Incentive-responsive:** Faculty who engage when PD is tied to promotion, recognition (e.g. HEA fellowship), or grant eligibility; the most commercially interesting segment

This grouping matters because different products serve different motivational profiles — and most current platform offerings are designed for the compliance segment, leaving the intrinsic and incentive-responsive segments underserved.

**Most influential organisations**

- **TEQSA** — sets the regulatory floor; any mandatory PD requirement it creates becomes an immediate commercial opportunity for platforms
- **Advance HE / HEA** — uniquely positioned as both standard-setter and service provider; the fellowship framework creates a credential that generates sustained demand for structured PD
- **Microsoft and Google** — the most disruptive players in this market despite not being traditional L&D vendors; their free educator programs are shaping what AI literacy means in practice faster than any commercial provider
- **Internal teaching and learning centres** — the invisible dominant player; they deliver more faculty PD than any external vendor but are structurally invisible to the commercial market

---

### Combined: Open Research Questions Across Both Markets

The following questions span both markets and are relevant to understanding where the two ecosystems might intersect — which is the structural gap the problem tree points toward:

1. Is there any existing product, platform, or process that connects labour market intelligence to curriculum design decisions? If not, why has this not emerged?
2. Who in a university is best positioned to act as the bridge between LMI data and curriculum redesign — and what do their current workflows look like?
3. Do faculty professional development programs currently include any labour market signal component — e.g. sessions on "what employers want" — and if so, who provides the data?
4. What does the buying process look like for each market — and are the buyers the same people or different people within the same institution?
5. Which of these two markets has the shorter path to a paying customer?

---

---

## Market Intelligence Research

*Research conducted via parallel web search agents, June 2026. Confidence levels noted per finding. All figures from publicly available sources unless stated otherwise.*

---

### Faethm by Pearson — Deep Market Intelligence

#### Founding and History

Faethm is an Australian AI-based workforce analytics company founded in Sydney in 2016 by Michael Priddis (CEO, former Bain & Company partner and WEF contributor on the future of work) and Carolyn Colley. The product publicly launched October 2017. Prior to acquisition the company had grown to approximately 100 customers across 21 industries in 26 countries, with reported revenue of approximately AUD $4.5 million as of 2021, with offices in Sydney, London, San Francisco, and New York.

Sources: InnovationAus (2021); Information Age/ACS (2021); Getlatka.com; Faethm blog (2021).

#### Product Capabilities

Faethm's platform is a cloud-based strategic workforce planning and predictive analytics tool whose core design choice is **task-level decomposition** — modelling what jobs will become rather than what jobs exist today.

The platform ingests client HR data (headcount, job titles, role descriptions), automatically maps these to the **Pearson Occupation Ontology** via machine learning, and produces forward-looking scenario outputs. The ontology is grounded in five international classification standards — O\*NET (US), ESCO (European), ISCO (ILO), ANZSCO (Australia/NZ), and NOC (Canada) — and covers 5,000+ occupations, 55,000 normalised job titles, 9,000+ unique skills, and 26,620 discrete work tasks.

Primary outputs:
- Automation and augmentation exposure scores at the task and role level, modelled up to 15 years into the future
- Skill adjacency and reskilling pathway maps ("Job Corridor" technology)
- Scenario planning outputs modelling workforce composition under different technology adoption trajectories
- Talent supply/demand benchmarks against external labour market data
- Compensation data by occupation

For higher education specifically, the platform offers curriculum validation (checking whether degree programs lead to automation-resilient careers), student career planning guidance, and short-course development tools for identifying reskilling corridor opportunities.

Sources: Faethm.ai product pages; Faethm Knowledge Base; Faethm Enterprise Platform Factsheet; Faethm Higher Education Factsheet.

#### Pearson Acquisition

Pearson acquired the remaining 91% of Faethm on 7 September 2021 for a total consideration of **GBP 65 million** (GBP 49M cash + GBP 6M pre-existing stake value + GBP 10M contingent consideration payable within two years). Pearson had held a pre-existing minority stake of approximately 9% before this transaction.

Stated rationale: to create "the world's first truly end-to-end Future of Work company." Faethm was described as the missing link between Pearson's learning content (Pearson+) and credentialing infrastructure (Credly) — the platform would identify skills gaps, Pearson+ would deliver learning to address them, and Credly would issue verifiable credentials to prove proficiency. Faethm was assigned to a newly formed Workforce Skills division.

Sources: MarketScreener (2021); PR Newswire/Pearson press release (September 2021); Pearson SEC Form 6-K filings (FY2021).

#### Current Status (as of June 2026)

Faethm remains an **active, named product** within Pearson's Enterprise Learning and Skills (ELS) division — the division was renamed from Workforce Skills in January 2025, though Faethm's own brand name was not changed. The faethm.ai website remains live with current product pages. Pearson's 2025 Full Year Results (February 2026) references Faethm by name.

| Date | Integration milestone |
|---|---|
| September 2021 | Assigned to Pearson's Workforce Skills division |
| October 2024 | Degreed integrates Faethm datasets into enterprise Skills dashboard — real-time workforce skills benchmarking for Degreed customers |
| January 2025 | Pearson–Microsoft multiyear partnership; Faethm named as the diagnostic layer in a "diagnose–assess–certify" workflow alongside Pearson VUE and Credly |
| January 2025 | Division renamed to Enterprise Learning and Skills |
| December 2025 | IBM–Pearson global AI learning partnership; Faethm embedded as the skill-gap-identification layer |

Sources: PR Newswire (October 2024); Microsoft News (January 2025); IBM Newsroom (December 2025); Pearson 2025 Full Year Results (February 2026).

#### Customers and Higher Education Penetration

Named corporate customers: Adobe, KPMG, PwC, Rio Tinto, Mastercard, Zurich Insurance, Capgemini, Nestlé Purina, HSBC, NatWest, BT, Singtel, Telstra.
Named government customers: UK, Australian, Canadian, and Luxembourg governments.

Higher education: Faethm maintains an explicit Higher Education product line. **Deakin University's DeakinCo** corporate education arm is the only publicly named Australian university reference customer. No other specific named university clients are confirmed in publicly available sources. The university value proposition centres on workforce intelligence for student employability and short-course design — not formal curriculum management or academic accreditation.

Confidence: HIGH for product existence and corporate customers; MEDIUM for named university client list (limited public disclosure).

#### Competitive Position vs. Lightcast

| Dimension | Faethm by Pearson | Lightcast |
|---|---|---|
| Primary data asset | Proprietary occupation ontology (O\*NET, ESCO, ISCO, ANZSCO, NOC); 26,620 discrete work tasks | 18+ billion data points; 1 billion+ job postings from 65,000+ sources |
| Methodology | Forward-looking predictive modelling of automation/augmentation impacts; scenario simulation applied to internal workforce data | Real-time and near-term demand signal from employer job advertisements |
| Time horizon | 5–15 years | Current to ~2–3 years |
| Primary use case | Strategic workforce planning; reskilling investment prioritisation; internal workforce scenario planning | Talent acquisition; labour market research; education-to-employment alignment |
| HE-specific product | Higher Education Factsheet; curriculum validation; student career guidance | Skillabi (launched June 2025); Analyst; Alumni Pathways |
| Australian availability | Active product; ANZSCO-grounded ontology | Data coverage from 2018; ANZSCO 2022 alignment ongoing; no Australian office |
| Ecosystem integration | Pearson+, Credly, Degreed, Microsoft, IBM | Standalone; integrations under development |

**Key differentiator:** Lightcast is a labour market intelligence and real-time demand signal tool. Faethm is a forward-looking technology-impact and scenario planning tool applied to internal workforce strategy. Faethm has explicitly positioned itself as an alternative to Lightcast for "Workforce Transition Strategy" on its own website.

**Strategic observation:** The December 2025 IBM-Pearson and January 2025 Microsoft-Pearson partnerships both explicitly embed Faethm as the diagnostic intake layer. This positions Faethm not merely as a retained product but as a structurally load-bearing component in Pearson's largest enterprise deals — its continued commercial relevance is now tied to Pearson's major partner relationships rather than its own independent go-to-market.

Sources: Faethm.ai (product pages and alternatives landing page); Lightcast.io; Faethm Knowledge Base.

#### New Questions Generated

- Does Faethm's ANZSCO-grounded ontology give it a structural advantage over Lightcast for Australian curriculum validation use cases, given Lightcast's ANZSCO 2022 alignment is still ongoing?
- Does Pearson report Faethm revenue separately or only as part of ELS aggregate figures?
- Are there named university customers beyond Deakin/DeakinCo — particularly in North America or the UK?
- Has Faethm's predictive automation modelling methodology been peer-reviewed or independently validated?

---

### Internal Teaching and Learning Centres — Market Role and Structure

#### Prevalence

All 39 Australian public universities maintain a dedicated internal T&L unit or equivalent function. No single published census exists, but Advance HE Australasia membership data confirms near-universal coverage: 34 Australasian institutions are members, 21 operating their own Advance HE-accredited Fellowship programs as of 2024 (Advance HE, 2024).

Confirmed named centres include: CSHE (University of Melbourne, est. 1968), ITaLI (University of Queensland), Monash Education Academy (Monash), Division of Teaching and Learning/Educational Innovation (University of Sydney), Scientia Education Academy/Educational Innovation (UNSW), Deakin Learning Futures/DTeach (Deakin), Learning and Teaching Centre (UOW), Centre for Learning and Teaching (ANU), Teaching Innovation Unit (UniSA), Learning Enhancement and Innovation (University of Adelaide), Centre for Collaborative Educational Excellence/Learning Futures (Griffith), GAILE (RMIT).

Three structural models operate across the sector:
1. **Centralised units** within the DVC (Education) portfolio
2. **Hybrid models** with a small central unit augmented by faculty-embedded T&L teams
3. **Research-and-development centre models** combining PD with scholarly inquiry into HE practice (e.g. CSHE)

#### Funding Context

T&L centres are funded entirely from universities' own operating budgets. The **Office for Learning and Teaching (OLT) was abolished on 1 July 2016**, eliminating $18 million in cross-sectoral competitive grant funding (plus a prior $16 million cut in 2015-16). The Australian Awards for University Teaching and the national Learning and Teaching Repository were also defunded from 2022. No dedicated federal funding mechanism for T&L innovation exists at sector level as of June 2026. New Zealand's equivalent body, Ako Aotearoa, was also defunded in 2025 — a trans-Tasman pattern of government withdrawal from sector-level T&L infrastructure.

Staffing at mid-to-large Group of Eight universities is estimated at approximately 10–30 FTE (inferred from visible staff profiles and EDUCAUSE 2024 US benchmarks), implying annual budgets of approximately AUD $2–5 million. No Australian university publicly discloses line-item T&L centre budgets.

Sources: Universities Australia; Campus Morning Mail; EDUCAUSE 2024 Teaching and Learning Workforce report; Ako Aotearoa.

#### AI-Specific Programs (documented examples)

**University of Sydney (Educational Innovation):** Developed **Cogniti**, an AI chatbot platform built on Azure OpenAI/GPT-4 Turbo. As of mid-2024: 600+ educator-built AI agents, 31,500+ conversations, 10,000+ users across 300 units of study at 30 institutions in Australia, NZ, and Singapore (Microsoft Australia News Centre, June 2024). TEQSA cited Sydney as a national leader in assessment reform in response to generative AI (May 2025). Also developed a "two-lane" assessment model distinguishing secure (AI-restricted) and open (AI-integrated) assessments.

**University of Wollongong (LTC):** **renAIssance** — a whole-of-university AI education initiative structured across six domains (Assurance, Assessment, Success, Capability, Employability, Design), targeting an institution-wide "AI-enabled education blueprint" by end of 2026.

**Deakin University (Deakin Learning Futures):** **FutureFocus GenAI Program** (launched May 2024) — seven cross-disciplinary industry-academia curriculum redesign partnerships, community of 40+ participants, outputs targeted at the 2025 Deakin T&L Conference. Also launched **LA4T** (Learning Analytics for Teachers) in 2024 — a dashboard enabling academic staff to monitor student engagement with learning resources.

**University of Queensland (ITaLI):** **AI Teacher Hub** — integrated guidance on AI use, assessment design, and responsible AI pedagogy. **Lead through Learning** (2025–2027) — UQ's multi-year strategic AI education action plan. Teaching Innovation Grants specifically extended to fund AI integration projects.

**RMIT (GAILE — Generative AI Lab for Education):** Sector-facing unit. **Val** (Virtual Assistant for Learning), built with Microsoft, serves as an institutional AI assistant for staff. RMIT Vietnam delivered free AI training to 1,400+ educators in December 2024.

**Monash University (MEA):** Three structured MEA AI modules integrated into Monash's recognition points system, with participation in AI Bootcamps counting toward professional learning records.

**Charles Sturt University (Teaching Academy):** The most documented institution for staff-specific AI PD: AI for Educators short course (with partner trAInify), CSEdX 2025 (day-long AI event), S.E.C.U.R.E. GenAI Use Framework for Staff (2025), and 50 government-funded scholarships for a Professional Certificate in Educational Technologies (Practical AI for Teachers) under the Australian Government's Microcredentials Pilot.

Sources: Microsoft Australia News Centre (June 2024); TEQSA (May 2025); institutional T&L centre websites.

#### Impact Measurement — A Documented Weakness

Most centres use participant satisfaction surveys and attendance headcounts as primary metrics. Systematic long-term evaluation is rare across the sector (Stes and Van Petegem, *Studies in Educational Evaluation*, 2015; HEA literature review, 2016; EDUCAUSE 2024). Newton and Gravenor (2020) found that HEA Fellowship attainment rates explain less than 1% of variation in UK student satisfaction scores (PMC7240711). A 2024 systematic review and meta-analysis across 12 studies (Martins et al., PMC11253325) found a positive but modest effect size (1.70%), with average study sample size of 34. Only 13% of institutions globally measure ROI for AI-related workforce tools (EDUCAUSE 2025 AI Landscape Study).

#### Known Structural Weaknesses

- **Scale:** Estimated 10–30 FTE serving academic workforces of 2,000–5,000 at large universities
- **Voluntary participation** clusters among early-career and teaching-focused academics; research-active and senior staff are less consistently reached
- **Content currency lags** in fast-moving areas given small team sizes and absence of cross-institutional exchange since OLT abolition
- **Sessional/casual staff poorly served** — lack time allocation, institutional email access, or employment continuity for participation
- **Budget vulnerability:** ~70% of Australia's 39 public universities were operating at a deficit by 2023-24; ~4,000 jobs lost at 22 institutions by 2025 (NTEU)
- **Evaluation weakness** makes it difficult to demonstrate ROI and creates budget vulnerability under financial pressure

#### Relationship to the Commercial PD Market

The relationship is **parallel and complementary, not competitive**. External platforms (LinkedIn Learning, Coursera, Pluralsight) are deployed by universities as supplements for general digital and professional skills. Internal centres focus on institutional pedagogy, policy translation, and culture-building. Several Australian universities provide staff LinkedIn Learning access as a supplementary resource. University of Melbourne, UNSW, and UWA are Coursera content-creation partners — generating external reach, not purchasing Coursera for internal PD. No formal institutional partnerships between Australian T&L centres and external PD platforms involving integrated curriculum or accreditation linkages were identified.

#### New Questions Generated

- What proportion of academic staff (particularly sessional staff) participates in at least one T&L centre program per year — this is not publicly tracked
- Are there Australian universities that have reduced or closed their T&L centre function in the 2024-26 financial crisis wave?
- Do T&L centres that operate Advance HE-accredited programs show higher teaching quality indicators than those that do not?
- What is the take-up rate of employer-provided LinkedIn Learning or Coursera access among academic staff relative to internal T&L program participation?

---

### Faculty PD Commercial Market — Key Dynamics

#### Market Size

Global professional development market: USD 573 billion in 2024, projected to USD 1.03 trillion by 2034 at 6.22% CAGR (Market Research Future). The narrower L&D software applications segment: USD 5.8 billion (2024) growing to USD 8.2 billion by 2029 at 7.1% CAGR (AppsRunTheWorld, 2024). Corporate LMS market: USD 9.57 billion (2024) projected to USD 27.43 billion by 2030 at 19.4% CAGR (Grand View Research).

No standalone published market size exists for Australian faculty professional development as a distinct segment. Australia has 51,390 FTE academic staff at universities as of 2024, a 10-year high (Australian Department of Education, 2024 Staff Statistics). Using the University of British Columbia's documented benchmark of approximately AUD $1,700 per faculty member per year as a proxy, Australia's institutional spend on faculty PD implies approximately **AUD $87–90 million per year** across the sector — a modelled estimate, not a published figure.

#### Dominant Commercial Vendors

| Vendor | Revenue (most recent) | Market role in higher education |
|---|---|---|
| Cornerstone OnDemand | ~USD 500M pre-acquisition (FY2021; private since 2022; 11.3% L&D market share) | Enterprise LMS; compliance, onboarding, HR-managed PD tracking |
| Coursera | USD 694.7M (FY2024, SEC 10-K filing, 2025); enterprise segment USD 62.3M Q4 2024 | Course-based upskilling; Coursera for Campus; faculty AI literacy |
| Go1 | USD 94.8M (2024); 50M+ registered users; 10,000+ organisations | Content aggregation library; Australian-founded |
| LinkedIn Learning | Not separately disclosed (bundled in Microsoft segment); 16,000+ courses | Faculty digital skills; supplementary resource at multiple Australian universities |
| Skillsoft | ~USD 524M (FY2024, declining) | Enterprise/government IT and business skills; limited disclosed HE deployments |
| D2L Brightspace | Not disclosed (private) | LMS-based faculty PD extension for institutions already on Brightspace |
| Degreed | Not disclosed (private; 9M+ learners) | Skills intelligence and learning pathway management; corporate L&D primary |

Sources: Coursera investor relations SEC 10-K (2025); AppsRunTheWorld (2024); GetLatka (2024).

#### Engagement and Completion Rates

Self-paced digital PD produces consistently low completion. Katy Jordan's analysis of 29 MOOC courses: average completion 6.5–6.8%. Broader empirical studies: median 12.6% (range 0.7%–52.1%). Faculty-specific PD MOOCs: a STEM teaching PD MOOC across seven offerings (2014–2018) recorded 11.5% completion (PMC10569627). Cohort-based facilitated programmes consistently achieve **85–90%+ completion**. Certificate-seeking learners achieve approximately 22% completion versus 6% for casual browsers on the same platform.

The bifurcation between motivated credential-seekers and casual browsers is a structural feature of the commercial platform landscape, not an outlier.

#### Microsoft, Google, and OpenAI Market Entry

Three major technology companies have entered the faculty PD market through free or subsidised programs:

**Microsoft:** Launched **Elevate for Educators** on 15 January 2026 — free AI literacy credential co-developed with ISTE+ASCD. Named lead partner in the $23 million National Academy for AI Instruction (July 2025), a joint initiative with the American Federation of Teachers, OpenAI, and Anthropic targeting 400,000 educators over five years. Committed to AI-skilling 3 million Australians by 2028 (April 2026).

**Google:** Partnered with ISTE+ASCD to deliver free AI literacy courses for educators through the Google Learning Center, each leading to a micro-credential or badge.

**OpenAI:** Launched **OpenAI Academy** (free) and **ChatGPT Edu** — deployed to 460,000+ students and faculty at California State University. Committed USD 50 million to the NextGenAI consortium with 15 leading research universities and USD 10 million to the National Academy for AI Instruction.

These programs are primarily creating new demand for AI literacy development rather than purely substituting for existing commercial platforms. Because the programs are free, they create direct pricing pressure on commercial AI content offerings, though the near-term market effect is more additive than substitutive.

Sources: Microsoft Source (January 2026); AFT press release (July 2025); OpenAI (2024, 2025).

#### Advance HE Fellowship Framework in Australia

| Level | Abbreviation | Target profile |
|---|---|---|
| Associate Fellowship | AFHEA | Emerging or partial teaching roles; early-career staff |
| Fellowship | FHEA | Staff with substantive teaching responsibilities; most commonly held |
| Senior Fellowship | SFHEA | Those who lead and influence academic practice across teams or institutional contexts |
| Principal Fellowship | PFHEA | Strategic leaders at institutional or sector level; rarest |

As at 31 July 2024: **192,196 total fellowships worldwide** — fastest-ever growth year, 20,000+ new fellows in 2023-24 (Advance HE Annual Report 2023-24). Approximate distribution: 47,000 AFHEA; 128,000 FHEA; 23,000 SFHEA; 2,000 PFHEA. Australia (Australasia): **9,100+ fellows** — second-largest country globally. Thirteen Australian institutions hold Advance HE-accredited programs (including UNSW, Monash, University of Adelaide, University of South Australia, Charles Sturt, Australian Catholic University, and University of Melbourne).

Fellowship is rarely mandatory in Australia, unlike parts of the UK sector. However, several Australian universities (UNSW, Monash, University of Adelaide, University of Melbourne) have positioned Advance HE fellowship as the mechanism by which they demonstrate compliance with **HESF 2021 Domain 3, Standard 3.2** — creating a de facto institutional driver even without statutory mandate.

#### Regulatory and Procurement Context

Primary regulatory driver: **HESF 2021 Domain 3, Standard 3.2** (TEQSA) — requires institutions to demonstrate academic staff have contemporary knowledge and teaching capability, presupposing continuing professional development. The TEQSA Guidance Note on Staffing (finalised June 2025) explicitly references this obligation for casual staff. HESF creates an institutional obligation, not a direct mandate on individual academics.

TEQSA announced in May 2025 a **shift from educative to regulatory-led oversight beginning 2026** — introducing institutional compliance risk for universities that cannot demonstrate systematic T&L workforce capability. Commercial PD platforms are theoretically positioned to address this gap but have not yet done so in documented Australian market activity.

**Purchasing authority:** Large enterprise L&D platform contracts involve CIO (technology evaluation), HR/People and Culture (budget authority), and DVC Academic (strategic endorsement). T&L-specific platforms are typically decided by the DVC Academic or Director of Teaching and Learning, with delegated authority commonly in the range of AUD $100,000–$250,000.

Sources: TEQSA HESF 2021; TEQSA Guidance Note on Staffing (June 2025); EDUCAUSE 2024; Australian Universities Accord Final Report (February 2024).

#### Faculty Pain Points with Current PD

Consistent findings across HERDSA (2011), PMC (2022, 2025), NASPA (2024), and EDUCAUSE Review (2025):
- **Lack of time** — the most consistently cited barrier; workload and competing pressures dominate
- **Lack of relevance** — generic or compliance-focused PD not applicable to specific discipline or role
- **Lack of autonomy** — faculty preference for self-directed, just-in-time learning over structured programs; mandatory PD associated with resistance rather than genuine capability development
- **Disconnect from career recognition** — teaching excellence and PD participation rarely rewarded comparably to research productivity (Australian Universities Accord, 2024)
- **Insufficient peer connection** — isolation in online PD is a documented demotivator; cohort-based models with peer interaction outperform self-paced models on both completion and satisfaction

---

### LMI Open Questions — Answered

#### Q1: Who in a university buys LMI data?

The primary buyer is the **Office of Institutional Research / Institutional Effectiveness (IR/IE)**, which holds the licence centrally and brokers access to faculty, careers staff, and administrators. Documented US examples: Cal State LA (Institutional Effectiveness), Cal State Fullerton (OIEP sole licence holder), Cal State San Marcos (IP&A), University of Minnesota (academic planning function). Uses include program review, curriculum development, grant writing, enrolment planning, student advising, and employer engagement. Careers offices use LMI operationally but rarely hold the procurement relationship.

**Australian evidence:** No Australian university has publicly disclosed a named contract with Lightcast, SEEK Talent Insights, LinkedIn Talent Insights, or Faethm. Lightcast's APAC page lists TAFE NSW and the National Skills Commission (absorbed into Jobs and Skills Australia) as reference clients — both government entities, not universities.

**Confidence:** HIGH for the US organisational pattern; LOW for Australia-specific named contracts (none found in public domain).

Sources: Cal State LA, Cal State Fullerton, CSU San Marcos, University of Minnesota institutional webpages; Lightcast APAC page.

#### Q2: Typical contract value

LinkedIn Talent Insights is the only platform with a documented public price range: **USD $20,000–$60,000 per year** for a standalone organisational licence (secondary sources). Some sources cite USD $6,000–$20,000 depending on scope. All pricing is negotiated through enterprise sales with no published rate card. Lightcast, SEEK Market Insights, and Faethm do not disclose pricing. No differential pricing for universities versus corporations is documented.

**Confidence:** MEDIUM for LinkedIn Talent Insights (multiple secondary sources, none authoritative); NOT ANSWERABLE for Lightcast, SEEK, or Faethm.

#### Q3: How do universities currently use LMI data?

Documented uses in descending order of evidence strength:
1. Program development and review — multiple documented examples
2. Enrolment marketing and student recruitment messaging
3. Strategic and institutional planning
4. Student careers advice and guidance
5. Curriculum design — documented at Cal State LA; St. Catherine University via Skillabi (documented 44% enrolment increase in Healthcare Management program following curriculum revision)

LMI typically reaches curriculum designers through an IR/IE intermediary, not directly. No Australian-specific evidence found.

**Confidence:** HIGH for documented US use cases; LOW for Australian practice specifically.

#### Q4: Is there an existing product connecting LMI to curriculum management?

Three products exist — **none available in Australia**:

**Lightcast Skillabi** (launched 3 June 2025): Dedicated curriculum intelligence application generating a Program-to-Occupation Alignment Score (0–100), identifying skill gaps, and modelling curriculum changes. Available US, Canada, UK only. Not integrated with third-party curriculum management systems at launch. Named clients: St. Catherine University (contact: Director of Institutional Research), Guild.

**Mapademics** (US startup): AI-powered skills intelligence platform with a documented integration with **Coursedog** (curriculum management system), embedding LMI directly into program design, revision, and approval workflows. Named clients: Spelman College, Emory University, Embry-Riddle Aeronautical University, AdventHealth University, Miami Regional University.

**Chmura JobsEQ Program Alignment** (US): Connects job postings data (350M+ postings) to curriculum via CIP code crosswalks. No Australian clients.

**Key finding:** The Mapademics-Coursedog integration is the most developed documented example of LMI embedded directly into a curriculum management workflow at the point of design and approval. No product in this space operates in the Australian market as of June 2026.

**Confidence:** HIGH for existence and features of these products in the US market; HIGH for the absence of these products in Australia.

Sources: Lightcast.io/solutions/education/skillabi; PR Newswire Skillabi launch (June 2025); Mapademics.com; Mapademics-Coursedog whitepaper.

#### Q5: VET/TAFE sector relationship with LMI in Australia

The VET sector's use of LMI is institutionally structured through government bodies, not commercial LMI subscriptions. Training package development operates through **Jobs and Skills Councils (JSCs)**, which replaced Industry Reference Committees from 1 January 2023 and have a formal mandate to act as "sources of intelligence on issues affecting their industry." **Jobs and Skills Australia (JSA)** is the primary data authority, producing the Internet Vacancy Index, employment projections, and Training Occupation Pathways dataset. JSA used **Lightcast data** (7 million Australian job postings, 2018–2023) in its published AI skills analysis — the only publicly documented instance of a specific commercial LMI platform being cited in Australian government skills planning work.

The VET training package workflow is consultative and document-based; no commercial LMI platform is embedded in software-based training package authoring tools. The JSC/JSA process feeds skills evidence into qualification design through institutional consultation, not digital integration.

The claim that VET uses LMI "more actively" than HE is structurally supported — VET has formal, government-mandated evidence requirements for skills needs, while HE use is entirely discretionary — but no formal comparative study has been published.

**Confidence:** HIGH for VET's structured government-mandated LMI use; MEDIUM for the VET-vs-HE comparison claim.

Sources: DEWR.gov.au (Jobs and Skills Councils); Jobs and Skills Australia data publications; Lightcast APAC page.

#### Q6: Lightcast market position (global and Australia)

**Global:** Revenue approximately USD $105.3 million (aggregator sources — Owler, Growjo; not company-disclosed). Approximately 700–760 employees (Tracxn, April 2026). USD $162 million total funding; KKR as primary investor. Serves 1,000–1,500+ higher education institutions globally.

**Australia:** Data coverage from 2018; ANZSCO 2022 taxonomy alignment ongoing. No Australian office (NZ office presumably services APAC). Reference clients on APAC page: TAFE NSW and National Skills Commission — both government entities. No Australia-specific revenue, customer count, or market share data publicly available.

**Lightcast vs. SEEK Talent Insights in Australia:** These products operate in different market segments. SEEK reported AUD $1.084 billion in FY2024 revenue (SEEK Annual Report, 2024), 40 million candidate relationships, 400,000 hirer relationships across APAC. SEEK Market Insights targets corporate employers and recruitment firms; no university clients publicly documented. Lightcast has occupation taxonomy depth, career pathway modelling, and educational program alignment tools for which SEEK has no direct equivalent. They are not direct competitors in the university market.

**Confidence:** MEDIUM for global Lightcast financials (aggregator data); NOT ANSWERABLE for Australia-specific market share.

Sources: Owler; Tracxn; SEEK Annual Report 2024; Lightcast APAC page; Lightcast Knowledge Base (ANZ postings data).

---

### Faculty AI Adoption — Drivers, Barriers, and Australian Programs

#### Key Statistics

- **71%** of 3,421 Australian university staff surveyed across 17 universities in 2024 reported using generative AI for work; academic staff (75%) higher than professional staff (69%) or sessional staff (62%); senior staff highest (81%). Source: Bearman, Dollinger, Ryan et al., *The Conversation*, October 2024.
- **72%** of 2,654 US postsecondary instructors had experimented with AI for instructional purposes (Ithaka S+R national survey, 2024), but only 18% understood teaching applications and only 14% felt confident using AI in instruction.
- **61%** of 1,681 faculty across 28 countries have used AI in teaching, but **88% do so minimally**; 93% expect to expand AI use within two years (Digital Education Council Global AI Faculty Survey, 2025).
- Only **13%** of institutions measure the return on investment for work-related AI tools (EDUCAUSE 2025 AI Landscape Study; n=788 respondents, November 2024).

#### Adoption Drivers

Documented motivators in descending strength of evidence:
1. **Perceived usefulness and task efficiency** — strongest and most consistently replicated predictor across Technology Acceptance Model studies (Hazzan-Bishara, Kol & Levy, *Education and Information Technologies*, 2025)
2. **Intrinsic motivation and personal innovativeness** — distinct from self-efficacy; faculty with high self-efficacy but low innovativeness may have the ability to use AI but be unwilling to try (*Scientific Reports*, 2025-26)
3. **Student-facing professional obligation** — the perceived professional obligation to prepare students for an AI-pervaded workforce is repeatedly cited as a primary voluntary adoption driver (Ithaka S+R, 2025)
4. **Institutional support** — operates indirectly, mediated through intrinsic motivation and self-efficacy, rather than directly on adoption behaviour

**Career incentives in the traditional sense are not documented as primary motivators.** No published study identifies AI capability as a formal criterion in academic promotion or performance review at any Australian university.

Sources: Hazzan-Bishara, Kol & Levy (2025); Ithaka S+R national survey (2024, N=2,654); Frontiers in Education (2025, DOI: 10.3389/feduc.2025.1603763).

#### Adoption Barriers

- **Academic integrity fear** — most frequently cited across multiple surveys; 42% of US instructors completely prohibit student generative AI use (Ithaka S+R, 2024); 88% of 1,681 global faculty use AI minimally (Digital Education Council, 2025)
- **Discipline non-relevance** — most common reason among non-adopters in the 2024 Australian survey; 29% of non-adopters cited "AI was not useful or relevant to their work" (Bearman et al., 2024)
- **Time constraints and learning curve** — consistently documented; identified as "workload paradox" — implementation without institutional support creates cognitive overload (Frontiers, 2025)
- **Inaccuracy and hallucination** — particularly among research-active faculty; 78% of US academic scientists cite misinformation as "extremely or very concerning" (PMC12393709, 2025)
- **Absence of clear institutional guidelines** — documented as a structural barrier; TEQSA 2024 request to all providers for institutional action plans cited a policy vacuum
- **Philosophical and identity-based resistance** — particularly among humanities and critical pedagogy faculty, relating to epistemic integrity of their fields (arXiv:2603.27052, 2025)

#### Discipline Variation

**Australian-specific (Bearman et al., 2024; N=3,421):** IT, engineering, management and commerce staff had highest adoption; agriculture, environmental studies, and natural and physical sciences had lowest — partially inverting a simple STEM-advantage hypothesis.

**International (Ithaka S+R, 2024; N=2,654):** 27% of science faculty were non-adopters; 30% of humanities faculty; 53% of humanities faculty prohibit student AI use. An IZA working paper found STEM graduates at 46% adoption versus Liberal Arts graduates at 22.4%. An interdisciplinary comparison found 87% weekly STEM usage versus 62% humanities.

Within-STEM variation is significant and has not been widely addressed in commercial PD market positioning.

#### Peer Effects and Communities of Practice

The most effective support mechanism for motivated adopters is **self-directed learning and peer conversation**, not formal workshops — the strongest available evidence being Ithaka S+R (2025) qualitative data from postsecondary instructors who repeatedly expressed preference for "trusted colleague endorsement" over institutional programs and for semester-long or year-long communities of practice over one-off workshops.

Quantitative evidence on peer/social influence effects is contradictory across studies (significant in a Spanish university study; lowest-scoring dimension at a Mexican university; modest but statistically significant in a SAGE 2025 study). The weight of evidence suggests peer effects are real but not dominant over perceived usefulness and self-efficacy; communities of practice are more effective at moving "the middle" — sceptical faculty who need trusted colleague endorsement before attempting adoption.

Sources: Ithaka S+R (2025); Pierce & Jiang (*Journal of Social Issues*, SAGE, DOI: 10.1177/02734753251397827, 2025); Frontiers in Education (DOI: 10.3389/feduc.2025.1427450).

#### Effectiveness of Faculty AI PD Programs

The evidence base is limited in scale and methodological rigour:
- A systematic review of 33 studies (Frontiers, DOI: 10.3389/feduc.2025.1522841) found AI-enhanced instruction produced teaching effectiveness improvements of 7.31–9.44% in some studies; however only 7 of 33 studies examined actual classroom implementation or faculty experience — the majority used simulation or modelling
- A curriculum integration study at Gansu Agricultural University across 126 graduate students in three cohorts found a 21.8% increase in excellence rate; student publications rising from 3 to 12; satisfaction scores from 3.9 to 4.7/5.0 — but without control groups (Frontiers, DOI: 10.3389/feduc.2025.1630073)
- Ithaka S+R (2025) notes "insufficient scholarship on teaching and learning with AI to make data-driven decisions about effectiveness"

For K-12, meta-analyses show a mean effect size of 0.09 on student achievement from 128 high-quality PD studies (ScienceDirect, 2025), with +0.52 SD advantage for teachers who received sustained PD on knowledge and instruction quality (SAGE Journals, Lynch et al., 2025). Translation to HE is not established.

#### The Bifurcation Problem

The Ithaka S+R 2025 report documents an empirically observed structural pattern: faculty who are more experienced with generative AI find basic workshops too elementary and seek discipline-specific or tool-specific training; less-experienced faculty attend basic workshops but do not proceed to sustained use. This bifurcation is a **structural feature of the current PD landscape**, not a design failure — and means neither the internal centre workshop model nor the self-paced commercial platform model is well-matched to the full faculty capability distribution.

---

### New Insights and Emerging Questions

The following findings were not anticipated before this research and are material to the market investigation:

**1. Faethm's integration is more advanced than standalone acquisition narratives suggest.** The December 2025 IBM-Pearson and January 2025 Microsoft-Pearson partnerships both explicitly embed Faethm as the diagnostic intake layer in enterprise skilling pipelines. Its continued commercial relevance is now tied to Pearson's major partner relationships rather than its own independent go-to-market.

**2. The Degreed-Faethm integration creates a real-time LMI-to-learning feedback loop with no direct Australian equivalent.** The October 2024 integration enables enterprise customers to benchmark workforce skills against industry norms using Faethm data within Degreed's L&D platform. No comparable Australian product combining LMI data, learning delivery, and skills benchmarking in a single enterprise workflow exists.

**3. Lightcast Skillabi is a structural shift — but it is not available in Australia and not yet integrated with curriculum management systems.** The June 2025 launch moves LMI from being an IR/IE reporting tool to being a direct input into curriculum design workflows. Its absence from Australia and lack of curriculum management system integration means the structural gap between LMI and Australian curriculum design processes remains entirely unaddressed by any commercial product.

**4. The OLT abolition in 2016 has had compounding sector-level effects.** Removing competitive grant funding eliminated not just money but the cross-institutional knowledge exchange, benchmarking, and national recognition mechanisms that supported systematic evaluation. The sector has been accumulating AI-response programs since 2023 without the evaluation infrastructure to assess comparative effectiveness. New Zealand's parallel defunding of Ako Aotearoa in 2025 confirms a trans-Tasman pattern.

**5. TEQSA's shift to regulatory-led oversight beginning 2026 creates a compliance dimension no commercial PD vendor has yet positioned against in Australia.** Combined with HESF 2021 Standard 3.2 requirements explicitly covering casual staff, this creates institutional risk for universities that cannot demonstrate systematic T&L workforce capability — a gap commercial PD platforms have not yet visibly addressed in the Australian market.

**6. The faculty AI adoption bifurcation is a structural design problem, not a content problem.** Experienced AI adopters find basic workshops too elementary; less-experienced staff attend but do not sustain use. Neither the internal workshop model nor the self-paced platform model is well-matched to the full faculty capability distribution.

**7. Within-STEM discipline variation in AI adoption is more nuanced than commonly assumed.** Agriculture, environmental studies, and natural and physical sciences show lower AI adoption than IT and engineering in the Australian survey data — a finding with practical implications for differentiated PD design that has not been reflected in commercial market positioning.

**Emerging questions for primary research:**

1. What is the governance pathway for an external LMI or curriculum intelligence platform to enter the Australian university market, given that the IR/IE office (the documented US purchasing centre) maps imperfectly onto Australian institutional structures?
2. Does Faethm's ANZSCO-grounded ontology give it a structural advantage over Lightcast for Australian curriculum validation use cases?
3. Will TEQSA's regulatory shift create a new purchasing category for institutional T&L capability platforms — distinct from both enterprise L&D platforms and internal T&L centre services?
4. How will Microsoft's commitment to AI-skill 3 million Australians by 2028, combined with Pearson's enterprise learning partnerships, affect the commercial faculty PD landscape in Australia over 24–36 months?
5. Is there an emerging opportunity to directly serve the sessional academic workforce — the most underserved and fastest-growing segment of Australian university teaching staff — with just-in-time career and capability intelligence rather than institution-directed PD?
6. Does Coursedog or any equivalent curriculum management system operate in Australia? If not, what systems do Australian universities use for curriculum management, and are any LMI integrations planned?

---

---

## Secondary Research Update — Australian Market

*Research conducted via parallel web search agents, June 2026. Four tracks: curriculum management systems, procurement registers, TEQSA action plans, vendor market presence. Confidence levels noted per finding.*

---

### Australian Curriculum Management Infrastructure

#### The Dominant Systems

The Australian CMS market is split between two non-US dedicated vendors, now increasingly consolidated under a single Australian-listed entity.

**CourseLoop (acquired by TechnologyOne ASX:TNE, November 2024)** is the dominant dedicated curriculum management system in Australian HE. Confirmed clients: Monash University, University of Technology Sydney (UTS), Queensland University of Technology (QUT), University of Newcastle, Charles Sturt University, Murdoch University (go-live 2018), Flinders University (go-live February 2021), University of Southern Queensland (UniSQ), University of Wollongong, UNSW, and James Cook University. CourseLoop's Publisher module powers the student-facing handbook directly at UTS, UniSQ, Newcastle, Murdoch, Monash, Charles Sturt, and JCU — with "Powered by CourseLoop" confirmed in handbook footers at UTS and UniSQ.

**Akari Software** (headquartered in Cork, Ireland; Australian regional support) serves: University of Sydney (client since 2017; first university-wide curriculum mapping system), University of Tasmania (Curriculum Lifecycle, Management and Publication project, 2019; unit outlines mandatory from Semester 2 2024), Swinburne University of Technology, Bond University, Curtin University, and University of the Sunshine Coast.

**Bespoke / other:** University of Queensland built its own CMS called **Jac** (Global IT Factory cloud platform; go-live October 2020, project concluded July 2024). ANU operates an internally named CMS managed by its Academic Standards and Quality Office — no third-party vendor identified.

**TechnologyOne's consolidated position:** TechnologyOne now owns CourseLoop (CMS, November 2024) and Scientia/Syllabus Plus (timetabling, acquired September 2021 for £12M). Scientia claims 75% of the Australian HE timetabling market (vendor figure, unaudited). TechnologyOne claims its OneEducation platform powers more than 60% of Australian and NZ HE institutions for student management (SIS), with named clients including University of Melbourne, Curtin, La Trobe, Macquarie, CQUniversity, QUT, Bond, and Swinburne. At the CourseLoop acquisition TechnologyOne announced OneEducation as "the world's first SaaS platform to encompass the entire student lifecycle — from course design to graduation — into a single unified ERP solution."

**Key implication:** TechnologyOne is the single most strategically significant infrastructure relationship for any LMI-to-curriculum product seeking Australian market entry. It controls or influences the CMS, timetabling, and SIS layers across the majority of the sector, and has explicitly stated curriculum-to-graduation integration as its strategic goal.

Sources: CourseLoop.com; TechnologyOne press releases; ARN (November 2024); UTS staff blog (November 2024); handbook URLs (UTS, UniSQ, Newcastle, Murdoch, Monash).

#### US Products Have No Australian Presence

**Coursedog:** No evidence of any Australian university using Coursedog. All named Coursedog clients are North American. No procurement notices, job postings, or university IT pages referencing Coursedog were found in Australia.

**Watermark / Curriculog (now Modern Campus Curriculum):** No confirmed Australian university clients. A legacy login URL pattern at ecu.curriculog.com for Edith Cowan University was identified but could not be corroborated as an active implementation.

**Direct implication:** The US products behind the Mapademics-Coursedog LMI integration are absent from Australia. Any LMI-to-curriculum workflow product entering Australia must integrate with CourseLoop, Akari, or TechnologyOne's ERP stack — not Coursedog.

#### No LMI Integration Announced

No formal, announced integration between any Australian CMS vendor (CourseLoop, Akari, TechnologyOne) and any labour market intelligence platform (Lightcast, SEEK, Faethm, LinkedIn Talent Insights) was found. TechnologyOne's acquisition announcement referenced "data-driven insights" and "graduate outcomes" as strategic goals but named no LMI data partner.

Lightcast operates an ANZ-specific portal (labourinsight.lightcast.io/anz) and has an HE-specific webinar series including "Program Alignment and Development (ANZ)" but no named Australian CMS integration partner.

**The LMI-to-curriculum integration gap is entirely unaddressed in operational form at any Australian institution.**

---

### Procurement Evidence

#### What the Record Shows

**Confirmed Lightcast government contract:** Economic Modeling LLC dba Lightcast holds a confirmed AUD **$255,763.20** contract with the Victorian Department of Jobs, Skills, Industry and Regions (DJSIR), commencing 26 November 2024, for provision of job advertisement data. Source: GovMarket.com.au. Consistent with a bounded data licence or historical dataset delivery.

**Confirmed LinkedIn government contract:** LinkedIn (ABN 73 615 253 408) holds a confirmed AUD **$565,352.15** contract with the NSW Department of Customer Service for LinkedIn Recruiter licences and Talent Insights access (PAC/26562, effective April 2024 – June 2026). Source: buy.nsw.gov.au. This is an HR/recruitment tool procurement, not an institutional LMI subscription.

**University of Melbourne — confirmed Lightcast client since 2017:** The University of Melbourne's Careers and Employability team has used Lightcast's Labour Insight (ANZ) platform since 2017, producing **115 custom Study Area Reports** covering all undergraduate and postgraduate programs, updated annually each January. Used for career counselling and student career readiness workshops. Source: published Lightcast case study (lightcast.io/case-study-university-melbourne), independently corroborated by NAGCAS 2023 conference newsletter. This is the only named Australian university publicly documented as a paying Lightcast subscriber.

**No federal AusTender contracts found** for Lightcast, EMSI, Burning Glass, Faethm, Pearson Workforce, or LinkedIn Talent Insights. No Go8 university annual reports or procurement disclosure pages named any LMI vendor subscription.

#### What the Absence Means

Australian universities are not legally required to publish individual contract registers. This creates a structural information asymmetry: a university can be a paying LMI subscriber for years without that appearing in any public record. The University of Melbourne has been a Lightcast subscriber for over eight years without any public procurement disclosure. Lightcast's Labour Insight (ANZ) dedicated HE product infrastructure — login portal, HE-specific onboarding, ANZ Program Alignment webinar series — implies active subscribers beyond the named University of Melbourne relationship. The number and identity of these subscribers cannot be confirmed from public records.

Sources: GovMarket.com.au; buy.nsw.gov.au; Lightcast case study hub; NAGCAS 2023 newsletter.

---

### TEQSA and the Curriculum Gap

#### TEQSA's Regulatory Frame: Assessment Integrity, Not Curriculum Durability

TEQSA's entire AI regulatory engagement has been framed around assessment integrity, not curriculum-labour market alignment. This is documentable across four publications:

1. **June 2024 RFI:** Explicitly required action plans addressing "the risk gen AI poses to award integrity" — not curriculum quality.
2. **November 2024 Toolkit** (*Gen AI Strategies for Australian Higher Education: Emerging Practice*): Synthesised 203 institutional submissions; Practice section addresses "assessment security and transformation."
3. **September 2025** (*Enacting Assessment Reform in a Time of Artificial Intelligence*): Three pathways (program-wide reform, unit-level assurance, hybrid) — all framed around learning assurance and integrity.
4. **TEQSA's foundational November 2023 paper:** Five propositions — all assessment-oriented.

Graduate workforce outcomes appear in TEQSA publications as instrumental rationales for maintaining assessment trustworthiness, not as goals in their own right.

**Universities Australia's October 2023 response to TEQSA's consultation** reinforced the boundary: "It remains unclear what, as a sector, needs to change when individual providers adapt their course and program offerings to include AI technologies, nor what the role of the regulator should be in this regard."

#### What Institutions Published

All 203 submitted action plans are in TEQSA's Provider Portal and are NOT publicly released as individual documents. Among institutions that voluntarily published:

- **University of Sydney** (full 29-page action plan, July 2024): Primarily an assessment-integrity document. Curriculum redesign addressed only procedurally — new course approvals from 2025 must consider AI. No structured LMI methodology.
- **UTS** (blog-format response, September 2024): Describes curriculum transformation for AI-collaborative professional environments — the closest to workforce framing among published plans.
- **La Trobe University** (*Responsible AI Adoption Strategy*, November 2024, developed with Microsoft and CyberCX): The strongest Australian example of a curriculum-workforce alignment strategy. Declared "AI-first university," created a Pro Vice-Chancellor (Artificial Intelligence) position, committed to "integrating AI into curricula to prepare graduates for an AI-ready workforce" with industry partnerships and micro-credentials. **This is a distinct institutional strategy, not the TEQSA RFI submission.**

No Go8 institution beyond the University of Sydney published its TEQSA submission.

**No published Australian institutional AI action plan or TEQSA case study describes use of structured labour market intelligence (Jobs and Skills Australia data, employer survey data, occupational forecasting) as an input to curriculum redesign.**

#### The ACSES Framework and the Complementarity Gap

The *Australian Framework for Artificial Intelligence in Higher Education* (Lodge, Bower, Gulson, Henderson, Slade, Southgate; ACSES/Curtin University, December 2025) is the document in the Australian policy landscape that most directly addresses curriculum-workforce alignment.

**Principle 6 — "Fostering adaptive skills for AI integration"** explicitly states: "preparing students for a transformed world of work. This involves reviewing the curriculum and updating learning outcomes to reflect the changing needs of industries." Supports SDG 8 (Decent Work and Economic Growth). Future Directions includes "AI and work-integrated learning" as an emerging area: "Institutions should collaborate with industry partners to identify emerging AI proficiencies required in different fields."

Critically, the ACSES framework explicitly states it **"does not substantially address academic integrity and the need for assessment reform,"** redirecting to TEQSA publications.

**The complementarity gap is documentable:** TEQSA addresses assessment integrity without providing an operational methodology for curriculum-workforce alignment. ACSES addresses curriculum-workforce alignment at the level of principles without providing an operational methodology using labour market evidence. No Australian regulatory, peak body, or policy document currently provides both.

#### Accord and ATEC

The Australian Universities Accord Final Report (February 2024, 47 recommendations) is primarily focused on access, equity, and student financial support. AI is mentioned aspirationally with no numbered recommendation specific to curriculum currency. The Universities Accord (ATEC) Bill 2025, passed 31 March 2026 and establishing ATEC from 29 April 2026, is a stewardship body for the access/equity agenda with no provisions governing curriculum quality standards or labour market alignment in curriculum design.

**Demand implication:** No Australian regulatory body currently requires universities to demonstrate degree programs are aligned with labour market demand. Demand for a curriculum-market intelligence product is driven by institutional strategy and competitive positioning, not regulatory compliance. This means purchasing decisions require a provost-level or DVC-level institutional champion rather than flowing from a mandated compliance requirement.

Sources: TEQSA RFI FAQ (May 2024); TEQSA November 2024 toolkit; TEQSA September 2025 publication; ACSES Framework PDF (December 2025); Universities Australia response (October 2023); Accord Final Report (February 2024).

---

### Vendor Market Presence in Australia

#### Lightcast

Lightcast operates in Australia directly via **economicmodelling.com.au** — its own Australian domain, not a third-party reseller (a legacy of the EMSI brand). No separate Australian reseller or implementation partner was identified. Lightcast lists a New Zealand office among global locations but no named Australian office. No Australia-based Lightcast sales or customer success staff were publicly identified.

**Product infrastructure for Australian HE is dedicated and developed:**
- Dedicated login portal: labourinsight.lightcast.io/anz
- HE-specific onboarding resources and webinar series: "Labour Insight 101," "Program Alignment and Development (ANZ)," "Labour Insight for Career Services"
- NAGCAS Gold Sponsor 2023 (National Association of Graduate Careers Advisory Services) — University of Melbourne case study presented
- Knowledge base note: "Case studies within this video are from the USA Market" — no localised case studies published yet

**Named Australian clients on Lightcast's APAC page:** TAFE NSW and the National Skills Commission (now Jobs and Skills Australia). The University of Melbourne is the only named Australian university (via published case study). Lightcast's Labour Insight (ANZ) product infrastructure implies additional subscribers but none are publicly named.

**Nous Group** co-authored "University as Connector" research (2023) with Lightcast and StudyPortals, covering Australia, and Nous Group's DIMA platform draws on Lightcast data — a research partnership, not a commercial reseller arrangement.

**Signal:** Lightcast is actively developing the Australian HE market from a lean, direct-sales model without named local staff — consistent with a vendor that has passed initial market validation and is pursuing scale from a low-overhead position.

#### Faethm / Pearson Enterprise Learning and Skills

Faethm was founded in Sydney and acquired by Pearson in September 2021. Post-acquisition it was integrated into Pearson's Workforce Skills division (renamed Enterprise Learning and Skills from January 2025). Faethm has approximately 23 employees globally as of early 2026 (Tracxn).

**Pearson Australia's local operations** (offices in Melbourne at 707 Collins Street and Sydney at 151 Castlereagh Street) focus entirely on traditional academic publishing, textbooks, and assessment platforms (MyLab, Mastering, Revel). **Faethm, workforce analytics, and Enterprise Learning and Skills are entirely absent from Pearson Australia's consumer-facing pages.** No named Australia-based ELS or Faethm sales staff were publicly identified.

**Only confirmed Australian client engagement for Faethm/Pearson:** The **Australian Digital Health Agency (ADHA)** — a government healthcare body for which Faethm modelled technology impact on healthcare workforce tasks using Australian Census data, producing a digital capability framework and new education pathways. Source: Credly/Pearson case study. No Australian universities are named as Faethm clients.

**Signal:** An Australian-originated company has effectively withdrawn its commercial presence from Australia post-acquisition. Faethm's Sydney origins have not translated into a visible local go-to-market presence. Pearson Australia operates as a traditional education publisher; ELS is a global enterprise product with no local HE sales infrastructure.

#### SEEK and LinkedIn Talent Insights

SEEK's market insights tools are free employer-facing hiring tools, not a premium institutional LMI product. SEEK data feeds Jobs and Skills Australia's Internet Vacancy Index as a raw source — no paid research subscription to universities. No university case studies or SEEK staff posts about university curriculum planning use were found.

LinkedIn Talent Insights: no named Australian university clients confirmed in public sources.

---

### Five Falsifiable Claims for Primary Research

The four research tracks collectively generate five specific, testable claims that expert interviews should confirm or refute:

**1.** Lightcast's Labour Insight (ANZ) subscriber base among Australian universities is likely fewer than ten institutions, concentrated in large research-intensive universities with established careers service functions — because eight years of market presence has produced no published Australian case studies and no sector-visible adoption signals beyond University of Melbourne.

**2.** The curriculum management systems used at Australian universities (CourseLoop and Akari) currently have no technical architecture or announced vendor roadmap to ingest structured LMI data as a curriculum design input — meaning the workflow connection between LMI data and curriculum approval governance does not yet exist in operational form at any Australian institution.

**3.** No Australian university has a defined, repeatable institutional process for using labour market intelligence as an input to formal curriculum review cycles — where LMI data is used (as at University of Melbourne), it sits within careers advisory services, not integrated into curriculum governance workflows.

**4.** Purchasing decisions for any LMI-curriculum alignment tool in Australia will require a DVC Academic or DVC Education-level institutional champion at each institution because no regulatory mandate, sector-wide compliance cycle, or peak body requirement creates an external forcing function.

**5.** TechnologyOne is the single most consequential partnership or acquisition target for any product seeking to reach Australian university curriculum governance workflows at scale — given its claimed 60%+ sector coverage in SIS, its confirmed CMS presence (CourseLoop) at 11+ universities, and its stated ERP-to-graduation strategic goal.

---

## Sources

- Academic Senate for California Community Colleges (ASCCC). *Ensuring Effective Curriculum Approval Processes: A Guide for Local Senates* (2016).
- Augar Review. *The Post-18 Education Review: Independent Review of Post-18 Education and Funding in England* (May 2019).
- Bradley Review. *Review of Australian Higher Education: Final Report* (Department of Education, Employment and Workplace Relations, December 2008).
- Cengage Group. *2025 Graduate Employability Report* (September 2025).
- EDUCAUSE. *AI Literacy in Teaching and Learning: A Durable Framework for Higher Education* (Kassorla, Georgieva, Papini, October 2024).
- ERIC Database. Salhab, R. *AI Literacy across Curriculum Design: Investigating College Instructor's Perspectives*. EJ1428258, Online Learning, Vol. 28, No. 2 (2024).
- Frontiers in Education. *Perspectives of Academic Staff on Artificial Intelligence in Higher Education: Exploring Areas of Relevance* (2025).
- Institute for Research on Public Policy (IRPP). *Picking a University or College? Better Trust Your Gut.* Policy Options (February 2024).
- International Labour Organization (ILO). *Generative AI and Jobs: A Refined Global Index of Occupational Exposure*. Working Paper 140 (May 2025).
- Lumina Foundation / Gallup. *Aligning Education and Work: What Employers Say Higher Education Must Deliver* (2026).
- McKinsey Global Institute. *Agents, Robots, and Us: Skill Partnerships in the Age of AI* (November 2025).
- NACEWEB. *The Gap in Perceptions of New Grads' Competency Proficiency and Resources to Shrink It* (2025).
- OECD. *Education at a Glance 2025* (September 2025).
- OECD. *The Financial Sustainability of Higher Education* (November 2025).
- Quality Assurance Agency (QAA). *UK Quality Code for Higher Education* (June 2024).
- Quality Assurance Agency (QAA). *Exploring Graduate and Employer Perceptions and Expectations* (June 2025).
- Tertiary Education Quality and Standards Agency (TEQSA). *Enacting Assessment Reform in a Time of Artificial Intelligence* (September 2025).
- UNC Charlotte Office of the Registrar. Curriculum Approval Data (2013–14).
- World Economic Forum. *The Future of Jobs Report 2025* (January 2025).
