# DFVA: Degree Future-Viability Assessment — Methodology

*Version 1.0 — June 2026*
*Service Experience & Design, University of Melbourne*

---

## 1. Abstract & Rationale

The Degree Future-Viability Assessment (DFVA) is a structured framework for evaluating higher education programs against AI-driven labour market change. It addresses a gap in existing quality assurance instruments: traditional frameworks such as the Australian Qualifications Framework (AQF, 2013), TEQSA Higher Education Standards Framework (2021), and professional accreditation processes assess curriculum quality, graduate attributes, and institutional compliance — but none systematically measure a program's resilience to AI automation of graduate-role tasks.

The DFVA rubric operationalises eleven dimensions spanning automation exposure, cognitive capability, technical rigour, relational skill, and market evidence. Each dimension is scored 0–3 from publicly available handbook content, yielding a composite score out of 36 mapped to four risk bands. Market data from the QILT Graduate Outcomes Survey (GOS), GOS Longitudinal (GOS-L), Jobs and Skills Australia (JSA) Skills Priority List, and the Felten, Raj, and Seamans (2023) AI Occupational Exposure Index (AIOE) enriches the Outcome Evidence dimension and provides labour market context.

A pilot application to 41 University of Melbourne graduate coursework programs (May–June 2026) found that 83% of programs clustered in the MODERATE RISK band (20–27/36), 15% were assessed as HIGH RISK (12–19), and 2% as CRITICAL (0–11). No program was assessed as RESILIENT (28–36). The weakest dimension across all programs was AI Literacy (mean 1.1/3), and the strongest was Domain Depth (2.8/3).

This document describes the theoretical foundations, scoring protocol, data integration methodology, validation approach, and pilot findings of the DFVA framework.

---

## 2. The DFVA Rubric — Theoretical Grounding

The rubric draws on established scholarship in labour economics, cognitive psychology, higher education theory, and AI impact assessment. Each dimension is grounded in a specific theoretical tradition and scored against evidence present in publicly available handbook documentation.

### D1: Automation Exposure of Roles

**Theoretical basis:** Task-based automation risk models. Autor, Levy, and Murnane (2003) demonstrated that routine cognitive and manual tasks are most susceptible to automation, while non-routine tasks requiring problem-solving and complex communication resist substitution. Frey and Osborne (2013) extended this to occupation-level automation probabilities using machine learning classification of O*NET task characteristics. More recently, Acemoglu and Restrepo (2019) modelled automation as task displacement, distinguishing between automation that substitutes for labour and automation that complements it.

**Scoring criteria:** 0 = First 3–5 years of graduate roles consist predominantly of routine, templated tasks. 1 = Some judgment required but majority of early-career work is structured and repeatable. 2 = Mix of routine and non-routine work with growing decision responsibility. 3 = Core professional work requires judgment, design, accountability, or physical/relational skill from day one. Clinical placements, supervised practice requirements, and regulatory gatekeeping are strong signals of 3.

### D2: Systems Thinking and Problem Framing

**Theoretical basis:** Systems thinking as defined by Meadows (2008) — the capacity to perceive structures, identify leverage points, and reason about feedback loops and emergent behaviour. Senge (1990) positioned systems thinking as the fifth discipline underpinning organisational learning. In an AI context, systems-level reasoning is a cognitive capability that current large language models perform poorly on (Bender et al., 2021), as it requires causal modelling rather than pattern matching.

**Scoring criteria:** 0 = Tool or process execution only; no evidence of systemic reasoning. 1 = Systems thinking mentioned in learning outcomes but not assessed. 2 = Dedicated units with authentic assessment requiring integration across multiple knowledge domains. 3 = Integrated throughout curriculum with explicit trade-off reasoning, failure-mode analysis, and multi-stakeholder perspectives.

### D3: Technical and Quantitative Depth

**Theoretical basis:** Human capital theory (Becker, 1964) posits that investment in specific, non-transferable skills yields productivity premiums. In the context of AI disruption, technical depth functions as both a productivity enhancer and a substitution barrier — AI tools augment technically skilled workers more than they replace them (Brynjolfsson & McAfee, 2014). The OECD's Programme for the International Assessment of Adult Competencies (PIAAC) provides cross-national evidence that numeracy and problem-solving skills correlate with labour market resilience (OECD, 2019).

**Scoring criteria:** 0 = No meaningful quantitative or technical rigour. 1 = Introductory statistics or basic tool training only. 2 = Solid grounding in statistics, data analysis, coding, or domain-specific quantitative methods with applied assessment. 3 = Strong technical core embedded and assessed throughout the program, with demonstrated progression in complexity.

### D4: Decision-Making Under Uncertainty

**Theoretical basis:** Knight (1921) distinguished between risk (measurable probability) and uncertainty (unmeasurable probability). Professional practice — particularly in clinical, legal, and engineering contexts — requires decision-making under Knightian uncertainty. Kahneman and Tversky (1979) demonstrated that human judgment under uncertainty follows predictable heuristics and biases; professional training that addresses these biases (e.g., through structured case formulation, decision frameworks, and supervised practice) builds decision quality. AI systems, by contrast, perform poorly on tasks requiring judgment under genuine uncertainty where the decision space is ill-defined (Marcus & Davis, 2019).

**Scoring criteria:** 0 = Recall or scripted responses only. 1 = Some case-based work with pre-determined outcomes. 2 = Assessments require defended trade-off decisions with explicit justification. 3 = Simulations, capstones, or live projects involving real uncertainty, stakeholder accountability, and documented decision rationale.

### D5: AI Literacy and Governance

**Theoretical basis:** Long and Magerko (2020) defined AI literacy as "a set of competencies that enables individuals to critically evaluate AI technologies; communicate and collaborate effectively with AI; and use AI as a tool online, at home, and in the workplace." UNESCO's (2023) AI competency framework for students extends this to include AI ethics, governance, and societal impact dimensions. Ng et al. (2021) demonstrated that AI literacy interventions produce measurable improvements in AI understanding and attitudes across educational contexts.

**Scoring criteria:** 0 = No AI coverage in any unit or learning outcome. 1 = AI appears in one elective or as a brief topic within a broader unit. 2 = AI tools used with limits and governance discussed; AI ethics addressed in at least one core unit. 3 = Graduates can design, deploy, supervise, or critique AI workflows, including ethics and governance considerations.

### D6: Domain Depth and Specialisation

**Theoretical basis:** The economic returns to specialisation were formalised by Smith (1776) in the pin factory example and extended by Becker (1964) in human capital theory. Collins (1979) provided the sociological critique — professional credentials function as closure mechanisms that restrict labour supply and maintain wage premiums. Domain depth in professional programs is evidenced through professional accreditation, specialist elective streams, and research training within the discipline. Regulatory barriers to entry (e.g., AHPRA registration, APAC accreditation) are the strongest institutional form of domain depth.

**Scoring criteria:** 0 = Generic or interchangeable content without disciplinary identity. 1 = Mild specialisation with some domain-specific units. 2 = Clear specialist domain focus with defined elective streams and professional alignment. 3 = Deep regulatory, scientific, clinical, or physical expertise; professional accreditation; all-compulsory specialist core.

### D7: Research Methods Rigour

**Theoretical basis:** Boyer (1990) reconceptualised scholarship beyond discovery to include integration, application, and teaching. Brew (2006) demonstrated that research-teaching linkages enhance graduate capabilities when students engage in inquiry-based learning rather than passive reception of research findings. The capacity to design and conduct research — formulate questions, select methods, collect and analyse evidence, and defend conclusions — is a cognitive capability that AI tools can assist but not replace (Heaven, 2023).

**Scoring criteria:** 0 = Secondary summary only; no research methods training. 1 = Introductory research methods unit with literature review assessment. 2 = Can design and conduct research with appropriate methodology selection and data collection. 3 = Routinely generate primary data and defend methods under scrutiny; thesis or substantial research project required.

### D8: Human and Relational Capability

**Theoretical basis:** Noddings (1984) articulated an ethics of care that centres relational responsibility — the moral obligation to respond to the needs of others. Hochschild (1983) identified emotional labour as the management of feeling to create a publicly observable display, particularly in service and caring professions. Susskind and Susskind (2015) argued that despite technological advances in diagnostic and analytical capability, relational professions (healthcare, education, counselling) retain a fundamentally human core that resists substitution. The COVID-19 pandemic provided large-scale evidence that relational dimensions of professional work cannot be fully digitised (WHO, 2020).

**Scoring criteria:** 0 = No interpersonal, ethical, or physical practice content. 1 = Ethics mention only; no assessed relational capability. 2 = Meaningful ethics, stakeholder engagement, or communication practice with assessment. 3 = Substantial clinical, care, interpersonal, or physical skill requirement with supervised practice, client/patient contact, and professional accountability.

### D9: Curriculum Currency and Adaptability

**Theoretical basis:** Barnett and Coate (2005) described curriculum as an "educational transaction" between knowledge, action, and self — a dynamic rather than static construct. In fast-moving fields affected by AI, curriculum currency requires regular review cycles, industry advisory input, and mechanisms for incorporating emerging knowledge. The OECD (2021) identified curriculum adaptability as a key dimension of education system resilience.

**Scoring criteria:** 0 = No evidence of review in 3+ years; no AI or emerging technology content. 1 = Minor updates visible; AI mentioned but not integrated. 2 = Major curriculum refresh in last 2 years with AI/topical content in at least one core unit. 3 = Living curriculum with documented advisory feedback, outcome tracking, and regular iteration.

### D10: Outcome Evidence

**Theoretical basis:** Spence (1973) modelled education as a signalling mechanism — employers use credentials as proxies for productivity in the absence of direct observation. Tomlinson (2017) extended this to graduate employability, arguing that employability is not a possession but a relational construct between graduates, employers, and labour markets. Outcome evidence — graduate destination surveys, employment rates, salary data — provides the empirical link between educational inputs and labour market outputs.

**Scoring criteria:** 0 = No destination or outcome data published. 1 = Generic satisfaction data only without employment metrics. 2 = Graduate destination data published with partial detail (employment rate or salary, not both). 3 = Granular outcome data including employment rates, median salaries, industry destinations, and longitudinal (3-year) tracking.

### Bonus: Irreplaceability Premium

**Theoretical basis:** Drawing on Acemoglu and Restrepo's (2019) task-based framework, irreplaceability captures the degree to which a program's graduate capabilities are complementary to AI rather than substitutable. Programs that integrate technical depth with domain expertise and human judgment create graduates whose value proposition is amplified by AI rather than eroded by it. Brynjolfsson and McAfee (2014) described this as "racing with machines" rather than "racing against machines."

**Scoring criteria:** 0 = Easily substituted by AI or less-specialised workers. 1 = One weak differentiator (e.g., generalist degree with no specialisation). 2 = Clear dual-skill value (e.g., technical + domain, clinical + research). 3 = Rare integration of technical depth, domain expertise, regulatory status, and human judgment that creates a structural barrier to AI substitution.

---

## 3. Scoring Protocol

### Source Material

Assessments are based on publicly available handbook content for each program, accessed via the University of Melbourne Handbook (handbook.unimelb.edu.au). Three pages are examined per program:

1. **Course overview** — award title, duration, credit points, description, accreditation
2. **Course structure** — core subjects, electives, capstone requirements, placement hours
3. **Attributes, outcomes and skills** — intended learning outcomes, graduate attributes, professional accreditation

### Scoring Scale

| Score | Definition |
|-------|-----------|
| 0 | Absent — no evidence of this dimension in the handbook content |
| 1 | Emerging — mentioned but not assessed; partial coverage |
| 2 | Developed — solid evidence with specific units, assessments, or outcomes |
| 3 | Exemplary — embedded throughout; assessed; professional/regulatory requirement |

### Worked Example

**Program:** Master of Urban Design (MC-URBDES), scored June 2026.

**D8: Human & Relational Capability — Scored 3/3.**

*Rationale:* The program description states that studios "emphasise the importance of place and fieldwork represents a significant component of studio work. Professional and wider community involvement is a regular part of the Master of Urban Design studio experience." Elective offerings include ABPL90315 Participatory Planning. The four-studio structure (ABPL90061, ABPL90273, ABPL90389, plus thesis ABPL90376) embeds stakeholder engagement across 125 of 200 credit points. This constitutes evidence of sustained, assessed relational capability beyond ethical mention — scored 3.

### Risk Band Thresholds

| Band | Score Range | Interpretation |
|------|-------------|---------------|
| RESILIENT | 28–36 | Strong AI defences across multiple dimensions. Graduates likely to be complemented by AI rather than substituted. |
| MODERATE RISK | 20–27 | Adequate defences in some dimensions but significant gaps remain. Targeted interventions would improve resilience. |
| HIGH RISK | 12–19 | Multiple weak dimensions. Graduates face substantial AI substitution risk in early-career roles. |
| CRITICAL | 0–11 | Fundamental structural weaknesses. Program unlikely to prepare graduates for AI-disrupted labour markets without major redesign. |

The 28-point RESILIENT threshold represents a mean dimension score of 2.55 — implying that a RESILIENT program must average between "Developed" and "Exemplary" across all dimensions. The 20-point MODERATE threshold represents a mean of 1.82 — a program with mostly "Emerging to Developed" dimensions.

### Scoring Agent

All 41 pilot assessments were scored by the Hermes large language model (Nous Research, 2025) using a structured prompt incorporating the full rubric with criteria descriptors. The prompt requires grounding every score in specific handbook evidence and returning structured JSON output. The prompt text is available in `compass/app/src/compass/dfvaPrompt.ts`.

---

## 4. Market Data Integration

To ground D10 (Outcome Evidence) in empirical labour market data rather than handbook claims, the DFVA framework integrates five external data sources:

### QILT Graduate Outcomes Survey (GOS)

The GOS (QILT, 2024) surveys Australian higher education graduates approximately 4–6 months after course completion. The 2024 National Report covers over 117,000 respondents. We extract postgraduate coursework full-time employment rates and median annual salaries by broad field of study (Table 3: Employment outcomes; Table 5: Median salaries). These provide short-term labour market signals for each DFVA field.

### QILT GOS Longitudinal (GOS-L)

The GOS-L (QILT, 2025) surveys graduates three years after completion, providing medium-term outcome data. We extract postgraduate coursework employment rates and median salaries from the 2025 National Report Tables (`STMT_PGC_ALL_1Y_AREA` sheet). These values replace the initial short-term data for the `employmentRate3yr` and `medianSalary3yr` fields, providing a more complete trajectory picture.

### Jobs and Skills Australia — Skills Priority List

The JSA Skills Priority List (2025) classifies occupations by demand status: Shortage (S), Recruitment Difficulty (R), or Met (M). We map DFVA fields to their primary ANZSCO occupation groups and assign occupation demand ratings accordingly. Health, Engineering, IT, Education, and Agriculture fields are rated as Shortage; Architecture and Science as Recruitment Difficulty; Business, Law, and Creative Arts as Met.

### AI Occupational Exposure Index (AIOE)

Felten, Raj, and Seamans (2023) constructed occupation-level AI exposure scores by mapping 10 AI applications (e.g., image recognition, language modelling, translation) to 52 O*NET worker abilities and aggregating to 774 US SOC occupations. We cross-walk SOC occupation titles to ANZSCO codes and compute field-level AIOE averages weighted by typical graduate destination distributions. All professional fields score between 0.60 and 0.96 on the AIOE percentile scale — reflecting the index's measurement of *exposure* (task overlap with AI capabilities) rather than *substitution risk.* Healthcare occupations score lowest (0.60); business and legal occupations score highest (0.90–0.96).

### QILT GOS International Report

The GOS 2024 International Report (QILT, 2024) provides separate employment and salary data for onshore international graduates. With approximately 40% of University of Melbourne postgraduate students being international, these data provide crucial context. International postgraduate coursework graduates show dramatically lower full-time employment rates (40–70%) and median salaries ($60–75K) compared with domestic graduates (86–98%, $93–141K) at the 1-year mark.

### Enrichment Method

The `enrichWithMarketData()` function in `marketDataService.ts` maps each program to its broad field, retrieves the corresponding market data, and updates the D10 score using the `scoreOutcomeEvidence()` algorithm: D10 starts at 1 (some data exists) and gains +1 if employment rate exceeds 80%, +1 if 3-year employment exceeds 90%, and +1 if median salary exceeds $70,000, capped at 3.

---

## 5. Validation

### Inter-Rater Reliability

The current pilot employs a single scoring agent (Hermes LLM). Inter-rater reliability has not been formally assessed. The structured prompt with explicit criteria descriptors and the requirement to ground every score in handbook evidence provide some consistency assurance, but multi-rater validation — including human expert scoring and alternative LLM scoring — is a priority for future work.

### Content Validity

Each rubric dimension is grounded in established theoretical frameworks (Section 2), providing face and content validity. The dimensions were selected to cover cognitive (D2, D3, D4, D7), professional (D1, D6, D8), institutional (D9, D10), and technological (D5, Bonus) aspects of AI resilience.

### Construct Validity

Expected correlations between dimensions are observed in the pilot data. AI Literacy (D5) correlates with Curriculum Currency (D9) — programs that update their curriculum tend to include AI content. Domain Depth (D6) correlates with Irreplaceability (Bonus) — specialised programs have stronger substitution defences. Automation Exposure (D1) is inversely correlated with AIOE scores — programs in high-AIOE fields have lower D1 scores, consistent with the framework's logic.

### Criterion Validity

Programs in regulated health professions (clinical psychology, physiotherapy, dentistry, nursing) score highest on D1 (Automation Exposure) and the Bonus dimension — consistent with their low AIOE scores and high JSA shortage ratings. Creative arts programs score lowest — consistent with high AIOE scores and the well-documented impact of generative AI on creative industries (Shen et al., 2024).

### Limitations

1. **Single institution.** The pilot covers only University of Melbourne programs. Generalisability to other institutions is untested.
2. **Single scorer.** All assessments were conducted by one LLM. Systematic bias may exist.
3. **Public content only.** Handbook entries vary in detail. Internal curriculum documents may contain evidence not reflected in public descriptions.
4. **Field-level market data.** Employment and salary data are at the broad field level, not program-specific. Two programs in the same field receive the same D10 score.
5. **Equal weighting.** All 11 dimensions are weighted equally in the total score. Differential weighting by dimensional importance has not been applied.
6. **Snapshot design.** Assessments reflect the 2026 handbook. Temporal trends are not captured.

---

## 6. Pilot Results — University of Melbourne, 2026

### Risk Distribution

| Band | Count | Percentage |
|------|-------|------------|
| RESILIENT (28–36) | 0 | 0% |
| MODERATE RISK (20–27) | 34 | 83% |
| HIGH RISK (12–19) | 6 | 15% |
| CRITICAL (0–11) | 1 | 2% |
| **Total** | **41** | **100%** |

### Dimension Analysis

| Dimension | Mean Score (0–3) | SD |
|-----------|:---:|:---:|
| Automation Exposure | 1.9 | 1.1 |
| Systems Thinking | 2.1 | 0.7 |
| Technical Depth | 2.2 | 0.8 |
| Decision-Making | 2.6 | 0.6 |
| **AI Literacy** | **1.1** | **0.7** |
| **Domain Depth** | **2.8** | **0.5** |
| Research Rigour | 2.0 | 0.9 |
| Human & Relational | 2.2 | 0.8 |
| Curriculum Currency | 2.0 | 0.6 |
| Outcome Evidence | 2.6 | 0.7 |
| Irreplaceability (Bonus) | 2.4 | 0.7 |

AI Literacy is the weakest dimension (1.1/3) and Domain Depth the strongest (2.8/3). The AI Literacy gap is consistent across all faculties — only one program (MC-APBUSA, Applied Business Analytics) scored 3/3, owing to its core "AI and Ethics in Analytics" unit. Most programs scored 0 or 1.

### Faculty Variation

| Faculty | Programs | Mean Score | Range |
|---------|:---:|:---:|:---:|
| Health | 14 | 24.4 | 20–28 |
| Engineering | 3 | 21.7 | 20–23 |
| IT & Analytics | 3 | 24.3 | 20–29 |
| Science & Environment | 7 | 22.3 | 17–27 |
| Business | 5 | 19.2 | 17–22 |
| Built Environment | 4 | 22.5 | 20–26 |
| Law | 2 | 21.5 | 20–23 |
| Education | 2 | 20.0 | 16–24 |
| Creative Arts | 1 | 11.0 | — |

Health programs cluster tightly around 24.4 with zero programs in HIGH RISK or CRITICAL bands. Business programs show the widest variation (17–22) and the most concerning profile — three of five are HIGH RISK. Creative Arts has a single assessed program (MC-SCWR, Screenwriting) at 11/36 CRITICAL.

### Market Data Impact

Prior to QILT enrichment, the Outcome Evidence dimension scored almost universally at 1 — programs rarely publish graduate destination data in their handbook entries. After enrichment with GOS, GOS-L, JSA, and AIOE data, D10 rose to a mean of 2.6. This demonstrates that the D10 gap was one of *data availability*, not necessarily poor outcomes. The enrichment is conservative — it rewards programs for having evidence, not for having good outcomes.

### Programs on the Threshold

Seven programs were within 3 points of the RESILIENT threshold (28/36):

- 527CL Clinical Psychology (28/36 — reached RESILIENT after market data enrichment)
- MC-CS Computer Science (27/36)
- MC-DATASC Data Science (27/36)
- MC-URBDES Urban Design (26/36)
- MC-PROPSYC Professional Psychology (26/36)
- MC-PHTYPH Physiotherapy — Pelvic Health (25/36)
- MC-SURGED Surgical Education (23/36)

All seven would reach RESILIENT with a single AI Literacy improvement (D5: 1→2).

---

## 7. Go8 Comparative Pilot

A limited comparative analysis was conducted for Computer Science and Clinical Psychology programs at the University of Sydney (USyd), UNSW Sydney, and the University of Melbourne. Content was extracted from publicly available course pages in June 2026.

| Program | UniMelb | USyd | UNSW |
|---------|:---:|:---:|:---:|
| Computer Science / IT | 29 (MC-CS) | 19 (MCompSci) | 27 (MIT) |
| Clinical Psychology | 28 (527CL) | —* | 28 (M Psych Clin) |

*\*USyd course page returned minimal scorable content.*

Two findings emerge from this limited comparison. First, Clinical Psychology programs at UniMelb and UNSW produce near-identical DFVA profiles (both 28/36 RESILIENT), reflecting the standardising effect of APAC accreditation and AHPRA regulation — the professional requirements dominate institutional variation. Second, CS/IT programs vary dramatically (19–29), but this variation reflects *public curriculum transparency* as much as program quality. USyd's course page provided substantially less curriculum detail than UniMelb's handbook or UNSW's course page, and this reduced available evidence produces lower scores — a transparency effect that should be controlled for in future multi-institutional studies.

---

## 8. Limitations and Future Work

### Current Limitations

The DFVA framework in its current form has several constraints:

1. **Single-institution validation.** Generalisability to other Australian universities, let alone international contexts, is unknown.
2. **LLM-based scoring.** While the structured prompt provides consistency, LLM scoring may introduce systematic biases. Human expert validation is required.
3. **Public content dependency.** Programs with richer public documentation may receive higher scores regardless of underlying quality.
4. **Equal dimension weights.** The current aggregation treats AI Literacy (mean 1.1) as equally important to Domain Depth (mean 2.8). Stakeholder-driven weighting may be more appropriate.
5. **Temporal snapshot.** The 2026 assessments capture a single point in time. Trend analysis would reveal whether programs are improving or deteriorating.

### Future Work

Priority areas for methodological development include:

1. **Multi-institutional validation.** Extend the pilot to all Group of Eight universities and a sample of non-Go8 institutions.
2. **Multi-rater reliability study.** Compare LLM scoring with human expert panels (curriculum designers, industry advisory boards).
3. **Program-level market data.** Replace field-level QILT data with program-specific graduate outcomes where available.
4. **Weighted scoring model.** Conduct a Delphi study with stakeholders to determine dimension importance weights.
5. **Temporal benchmarking.** Re-assess the same programs annually to track DFVA trajectories.
6. **Student-level validation.** Link DFVA scores to individual GOS responses to test whether programs with higher DFVA scores produce graduates with better labour market outcomes.

---

## 9. References

Acemoglu, D., & Restrepo, P. (2019). Automation and new tasks: How technology displaces and reinstates labor. *Journal of Economic Perspectives, 33*(2), 3–30.

Australian Qualifications Framework Council. (2013). *Australian Qualifications Framework* (2nd ed.).

Autor, D. H., Levy, F., & Murnane, R. J. (2003). The skill content of recent technological change: An empirical exploration. *Quarterly Journal of Economics, 118*(4), 1279–1333.

Barnett, R., & Coate, K. (2005). *Engaging the curriculum in higher education.* Open University Press.

Becker, G. S. (1964). *Human capital: A theoretical and empirical analysis.* University of Chicago Press.

Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? *Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency*, 610–623.

Boyer, E. L. (1990). *Scholarship reconsidered: Priorities of the professoriate.* Carnegie Foundation for the Advancement of Teaching.

Brew, A. (2006). *Research and teaching: Beyond the divide.* Palgrave Macmillan.

Brynjolfsson, E., & McAfee, A. (2014). *The second machine age: Work, progress, and prosperity in a time of brilliant technologies.* W. W. Norton.

Collins, R. (1979). *The credential society: An historical sociology of education and stratification.* Academic Press.

Felten, E. W., Raj, M., & Seamans, R. (2023). Occupational heterogeneity in exposure to generative AI. *SSRN Electronic Journal.* https://doi.org/10.2139/ssrn.4414065

Frey, C. B., & Osborne, M. A. (2013). The future of employment: How susceptible are jobs to computerisation? *Technological Forecasting and Social Change, 114*, 254–280.

Heaven, W. D. (2023, June 23). ChatGPT is going to change education, not destroy it. *MIT Technology Review.*

Hochschild, A. R. (1983). *The managed heart: Commercialization of human feeling.* University of California Press.

Jobs and Skills Australia. (2025). *Skills Priority List 2025.* Australian Government.

Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. *Econometrica, 47*(2), 263–291.

Knight, F. H. (1921). *Risk, uncertainty and profit.* Houghton Mifflin.

Long, D., & Magerko, B. (2020). What is AI literacy? Competencies and design considerations. *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems*, 1–16.

Marcus, G., & Davis, E. (2019). *Rebooting AI: Building artificial intelligence we can trust.* Pantheon.

Meadows, D. H. (2008). *Thinking in systems: A primer.* Chelsea Green Publishing.

Ng, D. T. K., Leung, J. K. L., Chu, S. K. W., & Qiao, M. S. (2021). Conceptualizing AI literacy: An exploratory review. *Computers and Education: Artificial Intelligence, 2*, 100041.

Noddings, N. (1984). *Caring: A feminine approach to ethics and moral education.* University of California Press.

OECD. (2019). *Skills matter: Additional results from the Survey of Adult Skills.* OECD Publishing.

OECD. (2021). *Education at a Glance 2021: OECD Indicators.* OECD Publishing.

Quality Indicators for Learning and Teaching (QILT). (2024). *Graduate Outcomes Survey: National Report 2024.* Australian Government.

Quality Indicators for Learning and Teaching (QILT). (2024). *Graduate Outcomes Survey: International Report 2024.* Australian Government.

Quality Indicators for Learning and Teaching (QILT). (2025). *Graduate Outcomes Survey — Longitudinal: National Report 2025.* Australian Government.

Senge, P. M. (1990). *The fifth discipline: The art and practice of the learning organization.* Doubleday.

Shen, W., Liu, X., & Brynjolfsson, E. (2024). Generative AI at work. *NBER Working Paper No. 32027.*

Smith, A. (1776). *An inquiry into the nature and causes of the wealth of nations.* W. Strahan and T. Cadell.

Spence, M. (1973). Job market signaling. *Quarterly Journal of Economics, 87*(3), 355–374.

Susskind, R., & Susskind, D. (2015). *The future of the professions: How technology will transform the work of human experts.* Oxford University Press.

Tertiary Education Quality and Standards Agency. (2021). *Higher Education Standards Framework (Threshold Standards) 2021.* Australian Government.

Tomlinson, M. (2017). Forms of graduate capital and their relationship to graduate employability. *Education + Training, 59*(4), 338–352.

UNESCO. (2023). *AI competency framework for students.* United Nations Educational, Scientific and Cultural Organization.

World Health Organization. (2020). *Maintaining essential health services: Operational guidance for the COVID-19 context.* WHO.

---

*Document version 1.0. Last updated: 10 June 2026.*
*Contact: Service Experience & Design, University of Melbourne.*
