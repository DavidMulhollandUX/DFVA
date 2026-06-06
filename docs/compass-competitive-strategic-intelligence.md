# COMPASS — Competitive and Strategic Intelligence

**Research round 2 (secondary).** Conducted via parallel web-search workflow, June 2026. Four tracks: competitive landscape, professional accreditation bodies, international case studies, and TechnologyOne/careers teams/NTEU. Confidence levels noted per finding. Companion to [compass-problem-tree.md](compass-problem-tree.md) and [compass-stakeholder-analysis.md](compass-stakeholder-analysis.md).

---

## 1. Competitive Landscape — LMI-to-Curriculum Products

**Headline: the niche is real, pre-commoditised, and entirely unserved in Australia.** Four purpose-built or near-purpose-built competitors exist. None is confirmed active in Australia. **Competitive intensity in the Australian context: LOW.**

### Lightcast Skillabi

The most technically mature standalone product. Relaunched 3 June 2025 with the positioning "Lightcast Addresses Higher Education's Relevance Crisis."

- **What it does:** Analyses course descriptions, learning outcomes, and syllabus content; extracts skills using Lightcast's Skills Extractor AI; compares them directly against labour market demand. Produces a proprietary **Program-to-Occupation Alignment Score (0–100)** benchmarked against 18+ billion labour market data points.
- **Key methodology:** "skill-to-skill instead of CIP-to-SOC" — bypasses government taxonomy crosswalks and extracts skills directly from curriculum text, then compares against skills demanded in job postings. Enables "curriculum modelling" — simulating the score impact of proposed changes before implementation.
- **Named HE customers:** St. Catherine University; Colorado Technical University. (Guild is a corporate L&D customer, not a university.)
- **CMS integrations:** None documented (no CourseLoop, Akari, Banner, or Coursedog integration). Only connects to Lightcast's own Analyst platform.
- **Geographic availability:** US, Canada, UK only as of June 2025. No Australia/APAC launch announced despite regional navigation links on the product page.
- **Pricing:** Not disclosed.
- **Ownership:** KKR-backed; made five acquisitions in 2025 alone — active consolidation strategy.

### Mapademics

Early-stage and distribution-via-embedding. US only.

- **Company:** Delaware corporation, Sacramento CA principal address (California registration March 2026, though platform predates this). **No disclosed founders, CEO, founding year, or funding.** No Crunchbase or PitchBook record. Very small.
- **What it does:** Upload course syllabi (PDF); AI extracts skills, maps to career opportunities, identifies gaps vs. labour market demand, and generates compliance language (NACE Career Readiness Competencies, USG Core IMPACTS).
- **Strategic logic — embed, don't stand alone:** Its **Coursedog integration** inserts LMI directly into faculty course-proposal and approval workflows. During a course proposal in Coursedog, Mapademics scans content for skills, checks career competency alignment, generates required career-alignment language for syllabi, and displays labour market relevance to reviewers **before course approval**. Also surfaces data in Coursedog's student-facing catalog.
- **Named customers:** Emory University, Spelman College, Embry-Riddle Aeronautical University, Miami Regional University, AdventHealth University. Primary documented target is the University System of Georgia (26 institutions, 340,000+ students) via the Coursedog-Mapademics integration.
- **Documented outcomes (vendor white paper, not independently verified):** Georgia Southern 5.1pp retention increase; Kennesaw State 4% credit-hour intensity growth; 50–75% curriculum approval cycle reduction claimed.
- **International expansion:** None announced. All customers US-based.

### Chmura JobsEQ — Program Alignment

- **Company:** Founded 1998, Richmond VA, privately held. Est. revenue ~$9.7M, ~46 employees — smallest of the three primary vendors.
- **What it does:** Traditional **CIP-SOC crosswalk** methodology (not AI skill extraction). Connects CIP codes to occupations, industries, skills. 350M+ job postings from 45,000+ sites. Supports Perkins V (CTE) compliance reporting.
- **Key difference:** A research/analytics platform institutions use to manually interpret alignment — **not embedded in curriculum approval workflows** and does not generate course-level AI alignment scores. Analogous to a tool for institutional researchers, not an operational curriculum intelligence application.
- **Named university customers:** None publicly disclosed (logos shown are workforce development agencies).

### QS Labour Market Intelligence (QS LMI)

- **What it does:** A paid dataset product (separate from QS Rankings) covering 1,800+ standardised occupations across every country, baseline 2025 with forecasts to 2030 (employment numbers and median wage by occupation, country, year). Targets curriculum leaders, careers teams, institutional researchers, government skills units.
- **Use case:** Strategic programme planning — not course-level approval workflow integration.
- **Named customers / pricing:** None publicly disclosed.

### EAB Market Insights

- **Not a software product** — an analyst-delivered advisory service available only to premium EAB members. Uses **Lightcast data via a reseller arrangement** (EAB is a channel for Lightcast data, not an independent product). Delivers Program Feasibility Studies, 360 Program Assessments, Market Opportunity Scans, Portfolio Health Checks.
- **Owner:** Vista Equity Partners + BC Partners (since 2017/2021); ~2,000 staff, 2,800+ institutions. Acquired Australian company **Forage** (virtual job simulations) in 2024 — but Forage is career exploration, not curriculum/LMI.
- **Named example:** UMBC (launched a Health IT degree).

### Other Players and Adjacencies

- **AstrumU** — skills verification platform; individual talent matching, not institutional curriculum review.
- **Stellic** — degree audit/planning platform (UVA, UW-Milwaukee); marketing references labour market alignment but no documented LMI-to-curriculum integration.
- **Coursedog + eLumen partnership (April 2025)** — eLumen selected Coursedog as exclusive curriculum/catalog partner, combining academic operations with learning-outcomes assessment. Reinforces Coursedog (and by extension Mapademics) as the emerging US integration hub.
- **Coursedog itself:** raised $113M total ($90M Series B, JMI Equity, March 2023); 170+ HE customers including Columbia and CUNY.

### Australian Gap and Investment Climate

- **No Australian product or startup** operates in the LMI-to-curriculum niche for HE as of June 2026. The 2025 HolonIQ ANZ EdTech 50 shows Australian EdTech clustering in workforce training (Go1, eSkilled) and career support (Peeplcoach, Maxme) — **not academic curriculum intelligence.**
- CourseLoop (TechnologyOne) and Akari have **no documented LMI integration.**
- Global EdTech VC fell to **$2.4B in 2024** — an 89% decline from the 2021 peak. No dedicated funding round in this specific niche was found. The market shows investors favouring "AI-enabled, workflow-embedded, workforce-aligned models" directionally, but no fund or thesis specifically targeting LMI-curriculum integration was identified.

### Competitive Intensity Assessment

| Dimension | Assessment |
|---|---|
| Market maturity | Pre-commoditised. Both purpose-built products (Skillabi, Mapademics) launched/relaunched in 2025. |
| Network effects | Weak. Lightcast's data scale gives modest benchmark advantage, but no platform network effect specific to this niche. |
| Switching costs | Moderate for Mapademics (embedded in Coursedog workflow); low for Skillabi (standalone upload-and-analyse). |
| Australian presence | None confirmed for any competitor. |
| **Overall (Australia)** | **LOW intensity** — the Australian market is unserved by purpose-built solutions. |

---

## 2. Professional Accreditation Bodies — Economics and AI Stance

**Headline: of five major bodies, only the AMC has an explicit AI/digital health standard. AACSB is the strongest commercial opening.**

### Spectrum of AI Incorporation (most → least explicit)

**AMC (medicine) — most advanced.** Revised accreditation standards effective 1 January 2024 explicitly incorporate **digital health requirements**. The separate **Digital Capability Framework for Medicine** (August 2021) specifically addresses **AI literacy for medical practitioners** — developed with an "AI Literacy for Medical Practitioners" roundtable and in partnership with the Australian Digital Health Agency. Accredits 26 Australian medical schools (+2 NZ); all provided self-assessments against the 2024 standards.

**AACSB (business) — substantive but principles-based.** 2020 Standard 4.1 requires curriculum that "cultivates agility with current and emerging technologies." The 2025 State of Accreditation Report found **97% of schools mention AI**; AACSB launched an **AI Use Case Hub** ("the first resource of its kind in the accreditation arena"); peer review teams actively evaluate AI integration. 14–15 Australian business schools accredited. CIR cycle extends from 5 to 6 years from July 2026. New Global Standards subject to member vote at the 2026 International Conference.

**Engineers Australia, APAC, LACC/CALD — no named AI criterion.** Engineers Australia's Stage 1 competencies (2019 AMS, 5-year cycle) include computing in PE1 but no AI element; no post-2023 revision found. APAC's new 2025 Psychology standards (effective 1 December 2025) have no AI-specific criterion across six domains. Law's Priestley 11 are essentially unchanged since 1992; the Law Council's March 2026 submission addresses AI **only as an assessment integrity concern** (recommending in-person invigilation), not as a curriculum competency.

### Economics (where disclosed)

| Body | Fees (disclosed) | Cycle | Scale |
|---|---|---|---|
| AACSB | ~US$7,140/yr ongoing; ~US$73,000 direct over 6-yr cycle (excl. travel) | 5→6 yr from July 2026 | 14–15 AU business schools |
| Engineers Australia | Institutional accreditation fees not public; individual skills assessment A$324–968 | 5-yr general review | ~144,000 members; FY24 surplus A$5.7M, FY25 deficit A$8.1M |
| APAC | Not public | ~6 yr | ~40 providers; est. revenue ~A$10.6M (unverified) |
| AMC | Not public | 4–8 yr variable | 26 AU medical schools |
| LACC/CALD (law) | Not public | — | Priestley 11 unchanged since 1992 |

Aggregate estimate: conservatively **A$100M+ annually** in direct accreditation-related revenue across major bodies, concentrated in engineering and medicine. No single public source aggregates this.

### The Structural Lag Insight

Accreditation cycles run 4–6 years; generative AI reached wide deployment 2022–23. Under normal cycles, **accreditation-mandated AI curriculum requirements at most bodies would not be compulsory until 2027–2031**. This creates *anticipatory preparation demand* — institutions need evidence frameworks now to meet the next cycle's expected standards.

### Strongest Positioning

A labour market durability tool aligns most directly with **AACSB Standard 4.1** (directly applicable today; 15 Australian schools under annual fee pressure; CIR self-evaluation due by year 3 of the cycle) and the **AMC's 2024 digital health standard** (operative; schools actively in self-assessment). The opening is to generate *accreditation-relevant evidence*, not just analytical insight — addressing a concrete administrative deadline.

---

## 3. International Case Studies — What Works, What Fails

**Headline: the category of "independently verified, causally demonstrated outcome from LMI-informed curriculum revision" is empty. No peer-reviewed study provides causal evidence that LMI-informed curriculum revision improves graduate employment outcomes.**

### Verified Examples (strongest available evidence)

**University of Strathclyde (UK) — Confidence: MEDIUM.** Formally documented LMI function in its Careers Service, using named public data sources (Skills Development Scotland, HESA, ONS, Prospects Luminate, Fraser of Allander Institute). Documented mechanisms embed employer feedback and Graduate Outcomes data into course review and quality audit. No independently published quantified outcome evidence.

**Dallas College Labor Market Intelligence Center (US) — Confidence: MEDIUM-HIGH (process), LOW (outcomes).** The best-documented community-college LMI governance structure (est. 2015), confirmed by Rutgers EERC/New America (2023) and Inside Higher Ed. Uses Lightcast Analyst; produces public workforce reports; operates within a formal governance structure across seven campuses. No verified before/after curriculum-outcome linkage.

**Texas HB 8 (2023) — Confidence: MEDIUM-HIGH.** The most explicit government-mandated LMI-to-curriculum reform documented. Restructured Texas community college funding from enrolment-based to **outcomes-based** (completions, transfers, workforce-relevant credentials). Documented effects: employer-partnered semiconductor certifications at Grayson College; 36.5% dual-credit enrolment increase at Kilgore College. **Key lesson: funding incentives activate LMI-curriculum alignment more effectively than voluntary tool adoption.**

### Vendor Claims to Treat With Caution

The **St. Catherine University "44% healthcare management enrolment increase"** is **vendor-published only** (Lightcast YouTube title and blog). No independent verification; no documentation of what curriculum actually changed. The only retrievable university quote (Erin White, Director of Institutional Research) does **not** cite the 44% figure and describes Skillabi use as "early." Similarly, University of Derby and East Carolina University LMI cases are vendor-published only. **These should not be treated as evidence of product effectiveness.**

### Conditions for Success (Rutgers EERC + New America, 2023; 22 combined cases)

Dedicated LMI analytical staffing; formal data governance with accountability; cross-departmental collaboration integrating multiple sources; employer advisory boards that pressure-test findings; integration into formal program review cycles; institutional mission alignment (workforce-focused institutions formalise more readily than broad-mission research universities).

### Failure Modes

The central finding: **"the presence of labour market data does not guarantee that colleges will use it."** Specific barriers: public LMI data lags 12+ months; real-time commercial data underrepresents middle-skill roles; self-reported salary data unreliable in small markets; staff data literacy varies; resource constraints isolate LMI to single departments; philosophical faculty resistance at four-year universities committed to broad liberal education.

**The Australian cautionary tale — Job-ready Graduates (2020):** The best-documented government-level failure to align HE with labour demand via price signals. Humanities fees rose 113% to redirect enrolments toward STEM/health. By 2024, Society and Culture commencements fell only 3pp (25%→22%) — a negligible response confirmed by Go8 and Universities Australia. Three design flaws: student price sensitivity is minimal (<5% cite fees as a primary driver); university incentives were misaligned; subsidy restructuring produced perverse outcomes. ~$4B stripped from the sector since 2021. The Accord process effectively rejected the framework. **Lesson: LMI-derived signals applied bluntly to steer behaviour fail when student interest, capability, and aspiration are the real drivers.**

**No documented cases** were found of a university *publicly announcing* an abandoned LMI-curriculum project — the pattern is "silent failure" (data acquired but not actioned), not explicit abandonment.

---

## 4. TechnologyOne, Careers Teams, and the NTEU

### TechnologyOne Post-CourseLoop: An Unoccupied Adjacency

TechnologyOne acquired CourseLoop on **1 November 2024 for AUD $60M** (vs. $9.1M ARR). Founder **Brian Clark retained** as General Manager — Curriculum (Fortitude Valley, QLD). Stated rationale: complete the OneEducation suite across the full student lifecycle "from course design to graduation."

**As of June 2026, across 19+ months of post-acquisition ASX filings, earnings transcripts, and media releases:**
- **No LMI data partnership** announced (with Lightcast, Faethm, SEEK, LinkedIn, or JSA).
- **No graduate outcomes module or employability analytics** feature announced.
- TechnologyOne's two major AI launches — **PLUS** (agentic AI ERP, GA April 2026) and **Guide** (student-facing AI, 2026B) — focus on enterprise workflow automation and service navigation, not LMI.
- The acquisition's reference to "data-driven insights to create courses that the market demands" reads as **aspiration, not a confirmed roadmap item.**
- H1 FY2026: total ARR A$598M (+17%); Education ARR +15%; 10-year full-suite OneEducation deal with James Cook University (includes Curriculum Management, aims to build a "rich data lake" for PLUS).

**The strategic signal: TechnologyOne owns Australia's dominant curriculum management system with no current LMI data partner — an unoccupied product adjacency.** The absence of any LMI announcement across 19+ months is itself meaningful.

### Careers Teams — Adjacent, Not Inside

Careers and employability teams hold LMI competencies and tool relationships (University of Melbourne has used Lightcast's Labour Insight since 2017; the BA workshop outcome cited a rise from 36% to 86% of students progressing career-readiness phases) but are **organisationally separated from academic curriculum governance.**

- Portfolios sit under DVC (Education), DVC (Student Experience), or combined **DVC (Education, Experience and Employability)** titles — documented at Swinburne, UNSW, Monash, Adelaide, Canberra, JCU.
- **NAGCAS** (peak body, ~1,000 members, est. 1990) endorses LMI tools in practitioner publications and made a Universities Accord submission — but its formal interface with curriculum governance is undocumented.
- **No formal mechanism** requiring or enabling careers teams to feed employer signal into curriculum review was found in any Australian university's public governance documentation.

**Positioning: careers teams are an informed internal advocate / potential co-sponsor — an LMI-literate audience that can accelerate internal legitimacy — but they lack governance authority to mandate curriculum change. The gap between careers intelligence and curriculum governance is itself both a friction point and a service-design opportunity.**

### NTEU — A Political Feasibility Constraint, Not a Veto

The NTEU's 2024 AI policy (National Council-endorsed, from a 2023 member working group):
- Supports staff **autonomy** in AI application — favours a "bottom-up approach at a local level" because appropriate use "is entirely contextual to the discipline or course level."
- **Opposes top-down AI mandates.**
- Flags that standard Fair Work Act consultation is insufficient for AI (it requires notification only *after* a decision).
- Concerns: workload from re-tooling assessment; IP misappropriation by LLMs; equity of access/training.

In active bargaining: **University of Melbourne (March 2026 log of claims)** seeks explicit AI job protections and Academic Workload Committees with majority non-management staff holding final workload authority; **UTS (November 2025)** took protected industrial action with claims including AI surveillance protections. **No finalised AI clause in any Australian university EA exists as of June 2026**, but the direction is toward structural veto or co-governance over AI-related work changes.

**Implication:** Not blanket opposition (the NTEU has not commented specifically on algorithmic curriculum review tools). But there is a clear feasibility line: **decision-support** tools (providing evidence for academic deliberation) are compatible with NTEU principles; **decision-replacement** tools (algorithmically recommending or mandating curriculum changes) risk triggering EA disputes, especially where bargaining is active.

---

## 5. Updated Open Questions for Primary Research

The following eight questions cannot be answered from secondary sources and require expert interviews. Each is specific and falsifiable.

1. **Curriculum change authority at AACSB-accredited schools:** Who holds formal sign-off for changes to program learning outcomes, and what documentary evidence initiates a review cycle?
2. **TechnologyOne/CourseLoop LMI roadmap:** Has TechnologyOne internally scoped or contracted any LMI integration into CourseLoop's 2026A/2026B roadmap, and if not, what is the stated position on LMI as a feature?
3. **Careers teams' access to curriculum governance:** At universities with a DVC (Education, Experience and Employability), do careers teams hold standing representation on curriculum committees, or transmit LMI informally on request?
4. **Willingness to pay:** Among DVCs (Education) at mid-tier (non-Go8) universities, is there a recognised budget line or procurement appetite for curriculum intelligence software distinct from careers teams' existing LMI subscriptions?
5. **NTEU's specific position on LMI curriculum tools:** Has the NTEU developed any position specific to data-driven curriculum review tools (vs. its general AI policy), and what conditions would make such a tool acceptable?
6. **JSA data licensing for institutions:** Under what terms, cost, and latency does Jobs and Skills Australia make occupation/skills data available to individual universities for curriculum workflows? Any current university agreements?
7. **Accreditation appetite for LMI evidence:** In 2023–25 AACSB CIR or Engineers Australia self-assessments, has quantitative labour market alignment data been used as evidence for Standard 4.1 (or equivalent), and was it accepted by peer review panels?
8. **Faculty attitudes to external skills-gap data:** Among academics presented with commercial LMI data in a program review, what was the predominant response (adoption / reframing / rejection) and what determined it? Does the US "faculty resistance" finding hold in Australia?

---

## Key Sources

Lightcast Skillabi PR (PR Newswire, 3 June 2025); Mapademics product site and Coursedog USG white paper (September 2025); Chmura JobsEQ education pages; QS LMI documentation; EAB Market Insights; HolonIQ ANZ EdTech 50 (2025) and EdTech VC 2024 note. Engineers Australia AMS 2019 + Stage 1 Competency Standard + Annual Reports; AACSB 2020 Standards, Fees schedule, 2025 State of Accreditation Report; APAC 2025 Accreditation Standards; AMC 2024 Standards + Digital Capability Framework for Medicine (2021); LACC Uniform Admission Rules + Law Council March 2026 submission. Rutgers EERC (2023, two reports); New America (2023); University of Strathclyde Careers LMI pages; Dallas College LMIC; Texas HB 8 (Texas Tribune, March 2025); OfS Condition B3; HEQCO (2022); Go8 and Universities Australia JRG submissions (2025). TechnologyOne ASX announcement (November 2024) + H1 FY2026 results; CourseLoop 2024 roundup; NAGCAS publications and Accord submission; NTEU AI Discussion Paper (2024) + parliamentary submission ("Study Buddy or Influencer," tabled 10 September 2024); University of Melbourne and UTS NTEU bargaining claims (2025–26).

*Full source URLs are retained in the workflow output and the research plan.*
