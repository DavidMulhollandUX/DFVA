// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Climate Science (MC-CLIMSCI) — DFVA Assessment",
  institution: "University of Melbourne",
  markdown: `## DFVA REPORT: Master of Climate Science (MC-CLIMSCI)

**Institution:** University of Melbourne | **Level:** Master (Coursework) | **Duration:** 2 years (200 pts)

**Assessment date:** 2026-06-08
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-climsci
**Prompt version:** DFVA-COPILOT-PROMPT-v1

### 1. PROGRAM PROFILE
The Master of Climate Science at the University of Melbourne is a specialist degree at the intersection of physical climate science, atmospheric dynamics, and climate policy. Students choose between two streams: Climate Dynamics (focusing on physical mechanisms) or Climate Change (focusing on impacts and policy translation).

The program covers Climate Modelling, Dynamical Meteorology, Atmospheric Processes, Weather and Climate Extremes, Statistics in Climate Dynamics, Climate Change Mitigation, Climate Change Politics and Policy, and Climate Science for Decision-Making. An industry or research project (25pt) provides applied experience.

Typical graduate roles include climate scientist, climate risk analyst, climate policy advisor, sustainability consultant, atmospheric researcher, and climate data scientist. Climate careers are growing structurally due to mandatory climate disclosure, adaptation planning, carbon market development, and international climate regulation.

### 2. AUTOMATION EXPOSURE PROFILE

| Task Category | Example Graduate Tasks | AI Pressure | AI Capability Today | Durability Rationale |
|---|---|---|---|---|
| Climate model output analysis | Running bias correction on GCM output, evaluating CMIP6 ensemble spread, generating regional projections from global models | HIGH | Strong — AI downscaling tools (DeepMind GraphCast, Nvidia FourCastNet) automate much of this pipeline | Physical understanding of *why* a model is biased in a region requires domain knowledge AI lacks |
| Climate attribution analysis | Statistical detection of climate change signal in observational records, extreme event attribution, trend analysis in temperature and precipitation datasets | HIGH | Strong — automated attribution frameworks exist; ML pattern recognition handles standard event types well | Novel or compound events, regional specificity, and legal-defensibility requirements still need expert judgment |
| Climate data management and processing | Quality-controlling observational station data, homogenising historical records, managing reanalysis datasets (ERA5, MERRA-2) | MEDIUM | Moderate — anomaly detection automated well, but instrument-specific errors require contextual knowledge | Judgment about data provenance and known station-history issues is difficult to encode |
| Climate risk assessment and scenario analysis | Translating RCP/SSP pathway outputs into physical risk estimates for infrastructure, agriculture, coastal assets | MEDIUM | Moderate — scenario tools increasingly automated, but sector-specific risk translation requires domain bridging | Risk clients need defensible, auditable reasoning; pure AI outputs lack the explainability required for regulatory submissions |
| Climate policy analysis and briefing | Synthesising IPCC Working Group reports, translating scientific uncertainty for policymakers, drafting climate strategy documents | MEDIUM | Moderate — LLMs summarise well but cannot evaluate scientific uncertainty or judge which findings are contested | Science-to-policy translation requires understanding which scientific claims are robust versus speculative |
| Physical mechanism explanation and communication | Explaining ENSO teleconnections, atmospheric blocking, or tipping point dynamics to non-specialist audiences; expert witness and regulatory submissions | LOW | Weak — AI can describe mechanisms but cannot diagnose novel phenomena or respond to probing technical questions | Genuine mechanistic understanding is required to defend claims under scrutiny from other experts or in legal contexts |
| Fieldwork, instrument operation, and observational science | Operating radiosonde systems, managing weather station networks, collecting atmospheric samples, supervising remote sensing campaigns | LOW | Very weak — physical presence, instrument calibration, and field judgment are not automatable | Observational infrastructure management remains human-dependent; AI cannot replace physical data collection |

**Overall Section Exposure:** MEDIUM

**Durability Assessment:** Climate science graduates face real automation pressure on the analytical pipeline — model post-processing, standard attribution analysis, and data management are being systematised by AI climate tools. However, the program's emphasis on physical mechanism understanding (Dynamical Meteorology, Atmospheric Processes, Climate Modelling) builds the kind of causal knowledge that remains robust: graduates who understand *why* a climate model behaves as it does in a specific regional context can evaluate AI outputs rather than merely execute them. The structural demand growth driven by mandatory climate disclosure and adaptation planning further cushions automation exposure — the volume of climate risk work is expanding faster than automation is replacing it.

### 3. MARKET EVIDENCE SNAPSHOT

| Job Family | Recent Hiring Signal | Discussion Theme | Curriculum Implication |
|---|---|---|---|
| Climate Scientist / Modeller | CSIRO and BoM advertise specialist roles; private-sector demand growing from energy and insurance | "Physical domain reasoning and uncertainty quantification are irreducible" | Ensure production-level Python/GIS computational depth |
| Climate Risk Analyst | Mandatory Australian climate disclosure (ASRS, Jan 2025) creating structural demand in banks, super funds, insurers | "Scenario interpretation and materiality judgment resist automation" | Bridge climate outputs to financial materiality (TCFD/IFRS S2) |
| Climate Policy Advisor | DCCEEW, state climate offices, UNDP hiring; high competition for Canberra roles | "Document synthesis automating; political-feasibility judgment irreducible" | Reinforce science-policy translation and stakeholder briefing |
| Carbon Market Analyst | Safeguard Mechanism reform (2024) and net-zero commitments driving demand; market still maturing | "Additionality and permanence judgment stay durable as monitoring automates" | Add emerging carbon-markets literacy elective, framed as early-stage |
| Sustainability Consultant | Big 4 and boutiques (South Pole, ERM, Climateworks) scaling climate practices; graduate demand high | "Scope 3 data aggregation automating; strategy and advisory durable" | Embed SBTi/ASRS reporting and net-zero strategy |
| Renewable Energy Analyst | AEMO and consultancies hiring for Victoria's offshore wind pipeline; net-new analytical roles | "Nuanced grid-constraint and market-design analysis stays human" | Add power-system and energy-transition modelling exposure |

### 4. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---|---|
| 1 | Automation Exposure of Roles | 2 | 25pt industry/research project. Climate modelling is computational but interpretation requires judgment. |
| 2 | Systems Thinking and Problem Framing | 3 | Climate science is the canonical systems discipline. Atmosphere-ocean-biosphere coupling, feedback loops, tipping points. |
| 3 | Technical and Quantitative Depth | 3 | Climate Modelling, Dynamical Meteorology, Atmospheric Processes, Convective Clouds, Statistics in Climate Dynamics. Deep quantitative core. |
| 4 | Decision-Making Under Uncertainty | 3 | Climate Science for Decision-Making explicitly bridges science to policy. Industry/research project involves real-world decisions under deep uncertainty. |
| 5 | AI Literacy and Governance | 1 | No AI-specific units. Climate science increasingly uses ML for downscaling/attribution but this is not in the curriculum. |
| 6 | Domain Depth and Specialisation | 3 | Climate science with two streams (Climate Dynamics, Climate Change). 75pt of discipline electives. |
| 7 | Research Methods Rigour | 2 | 25pt project is smaller than lab-science MSc equivalents. Statistics in Climate Dynamics (not available 2026) would have strengthened this. |
| 8 | Human and Relational Capability | 2 | Climate Change Politics and Policy, Climate Change Mitigation — policy/stakeholder dimensions. Science Communication available. |
| 9 | Curriculum Currency and Adaptability | 3 | Climate science is inherently current. Updated 16 Feb 2026. Climate Change Mitigation, Weather and Climate Extremes — directly relevant to 2026. |
| 10 | Graduate Outcome Evidence | 2 | No granular destination data. Climate careers are growing but program-specific outcomes not tracked. |
| B | Irreplaceability Premium (Bonus) | 3 | Rare: climate science + policy translation + quantitative modelling. Growing field with structural demand drivers (regulation, disclosure, adaptation). |

**TOTAL: 27 / 36**
**Risk band: MODERATE RISK (20-27)**

### 5. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?
  **NO** — climate science requires integrated physical understanding AI cannot replicate; graduates diagnose *why* a model is biased in a region rather than merely executing analysis pipelines.
- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?
  **YES** — Climate Science for Decision-Making, the industry/research capstone, and the systems orientation provide genuine decision ownership under deep uncertainty.
- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?
  **YES** — climate careers are structurally growing; mandatory climate disclosure, adaptation planning, and carbon markets create durable demand.

### 6. ANALOGUE GRADUATE PROFILE

The most exposed climate science graduate is the **Climate Data Analyst of 2021**: primarily processing climate datasets, running standard analysis scripts on model output, and producing summary reports — work increasingly systematised by AI-augmented climate analytics platforms.

Specific threats:
- **AI climate downscaling tools** — automated regional climate projection from global model output
- **AI climate attribution systems** — automated event attribution analysis replacing manual statistical analysis
- **Automated climate model evaluation tools** — systematic bias correction and model evaluation pipelines
- **AI climate communication tools** — automated translation of climate science into policy-relevant summary

### 7. VERDICT
Climate science is one of the most structurally durable disciplines assessed. At **27/36 MODERATE RISK** (upper boundary), the field is growing, the physical science is irreducible, and the policy interface creates demand for translation skills that resist automation. The AI/ML gap is real (climate science increasingly uses ML) but non-critical — the program's core value is physical understanding, not tool operation. Embedding AI-for-climate literacy and strengthening tracked graduate-outcome data would move it to RESILIENT.

### 8. RECOMMENDATIONS

| Priority | Action | Dimension | Market Signal Link | Effort |
|---|---|---|---|---|
| P1 | Embed AI/ML-for-climate literacy into the core curriculum — cover large climate emulators (ClimaX, GraphCast), AI-based weather prediction (FourCastNet), and AI-assisted attribution tools; teach graduates to critically interrogate these systems rather than treat them as black boxes | D5 | ML and GIS skills increasingly listed by CSIRO/BoM and private climate-intelligence ads | High |
| P2 | Expand the industry/research project (25pt) toward a minimum 37.5pt by adding a structured professional placement stream with climate-active organisations (CSIRO, BoM, infrastructure asset owners, TCFD-reporting corporates) | D10 | Industry-project placement quality directly determines graduate competitiveness | Medium |
| P3 | Restore Statistics in Climate Dynamics to the standard offering and add a quantitative methods for climate risk unit covering uncertainty quantification, Bayesian inference, and ensemble analysis | D7 | Physical climate risk quantification (VaR, tail risk, scenario analysis) rising very fast | Low |
| P4 | Establish tracked graduate destination data with the Faculty of Science careers office — 6-month and 3-year outcomes disaggregated by stream | D10 | No published MC-CLIMSCI destination data; QILT suppressed for small cohort | Low |
| P5 | Add a Climate Finance and Disclosure elective covering TCFD/TNFD frameworks, mandatory disclosure (ASRS AASB S2), and climate scenario analysis for financial institutions | D4 | Mandatory disclosure surge is the largest near-term employment driver | Medium |
| P6 | Integrate science communication and stakeholder engagement as a required, assessed component of the capstone — communicating probabilistic uncertainty and model limitations to non-specialists | D8 | Consulting and government employers increasingly list science communication | Low |

### 9. THE REDESIGNED GRADUATE PROFILE

The 2027-ready climate science graduate is not a data processor — they are a **climate system specialist** who understands the physical mechanisms of climate change and can translate that understanding into defensible risk assessments and policy recommendations.

They have worked with real climate data: they know what climate model bias looks like in specific regional contexts, why ENSO affects Australian precipitation in the way it does, and what the physical mechanisms are behind projected rainfall changes in southeast Australia. That mechanism-level understanding — not just statistical pattern recognition — is what makes their climate analysis trustworthy.

They understand the AI-augmented future of climate science: large climate emulators, AI-based weather prediction, and AI-assisted climate policy analysis. They can evaluate whether an AI climate tool is capturing real physics or statistical patterns that may not generalise. That critical evaluation capability is what positions them as climate scientists rather than climate data operators.

### 10. MARKET CONFIDENCE NOTE
- Confidence level for market signals in this report: **Medium–High**. Climate science is a structurally growing field with documented demand drivers.
- Market evidence integrates QILT GOS Science outcomes with documented Australian mandatory-disclosure legislation, APS Jobs and SEEK/LinkedIn AU role patterns, and Big 4 sustainability-practice growth.
- For high-stakes curriculum decisions, add a live ANZ job-ad scrape (last 90 days), program-specific MC-CLIMSCI destination data, and employer interviews across financial services, government, and consulting.

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

---

### REAL GRADUATE DESTINATIONS (JSA HEO · QILT · Adzuna)

**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, by field of education; % = share of field graduate placements):

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Sales Assistant (General) (6%), Medical Laboratory Scientist (6%), Geologist (5%), General Clerk (4%), Medical Laboratory Technician (4%) |
| Early (~3yr) | Medical Laboratory Scientist (7%), Geologist (5%), Sales Assistant (General) (4%), Medical Laboratory Technician (4%), General Clerk (4%) |
| Senior (~5yr) | Medical Laboratory Scientist (7%), Geologist (5%), Program or Project Administrator (4%), Environmental Consultant (4%), Medical Laboratory Technician (3%) |

**Graduate outcomes** (QILT GOS 2024, postgraduate): 79% full-time employment · median salary $100,000 · 3-year employment 94% · JSA occupation demand: **Recruitment Difficulty**.

**Hiring now (demand-side)** — Adzuna AU live vacancies (who is advertising, *not* alumni destinations): NSW Health Pathology, Dorevitch Pathology (Healius), Sonic Healthcare Australia, 4Cyte Pathology, CSIRO, ANSTO, WEHI, Canva, Glencore, Rio Tinto, Fortescue. Advertised salary A$73.4k–145k.

**Sector context:** A$45.4bn across 41 institutions — international-student caps (NPL 270k→295k) and a 32.5% offshore visa refusal rate (Feb 2026) are resetting fee revenue; sector profit fell 18.1% (University & Other Higher Education in Australia (IBISWorld P8102, Jun 2026)).

*Sources: JSA HEO Work & Occupation (Table_3); QILT GOS 2024; IBISWorld P8102; Adzuna AU. Destinations are field-of-education level (not per-degree); employers are demand-side (not alumni).*
`,
};

export default content;
