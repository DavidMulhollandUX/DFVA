// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Doctor of Medicine (MC-DMED) — DFVA Assessment",
  institution: "University of Melbourne",
  markdown: `## DFVA REPORT: Doctor of Medicine (MC-DMED)
**Institution:** University of Melbourne | **Level:** Graduate Coursework (Masters Extended), AQF level 9 | **Duration:** 48 months full-time

**Assessment date:** 2026-07-02  
**Source URL(s):** https://handbook.unimelb.edu.au/2026/courses/mc-dmed  
**Prompt version:** DFVA-COPILOT-PROMPT-v1 + DFVA-COPILOT-MARKET-v1  
**Accreditation:** Australian Medical Council (AMC) / AHPRA — Medical Board of Australia; entry-to-practice qualification leading to internship and medical registration

### 1. PROGRAM PROFILE
The Doctor of Medicine (MD) is the University of Melbourne's four-year, full-time, postgraduate entry-to-practice medical qualification, leading directly to internship and AHPRA medical registration. The curriculum is structured around three integrated domains — applied biomedical science, clinical skills, and professional practice — with First Nations Health, Population and Global Health, and research methods threaded through all three as cross-cutting themes. Year 1 builds foundational knowledge via small-group tutorials, practicals, clinical placement and interactive online learning; Years 2 and 3 place students in full-time clinical placement across a wide range of health care settings, applying foundational knowledge to real patient encounters; Year 4 combines a research project with a capstone clinical placement.

Graduates enter the medical workforce as interns and progress through Australia's prevocational and vocational (specialist college) training pipeline toward general practice or specialist registration. The degree is ungraded (pass/fail), reflecting a competency-based rather than norm-referenced assessment philosophy. A distinguishing structural feature is the "Discovery" learning pathway, allowing students to individualise their experience at each year level, including dedicated research-scholar and clinical-scholar pathways in the final two years — a mechanism for building research depth or advanced clinical specialisation on top of the common curriculum.

Accreditation sits with the Australian Medical Council (AMC), and registration is governed by AHPRA under the Medical Board of Australia — one of the strongest regulatory moats of any Australian professional degree. Unlike most postgraduate programs assessed under DFVA, the MD's "labour market" is not an open graduate job market but a centrally coordinated, government-funded internship and training pipeline, which changes how automation-exposure and market-signal analysis should be read throughout this report.

### 2. AUTOMATION EXPOSURE PROFILE

| Task Category | Example Graduate Tasks | AI Pressure | AI Capability Today | Durability Rationale |
|---|---|---|---|---|
| Diagnostic reasoning & differential diagnosis | History-taking, forming differentials, ordering/interpreting tests | HIGH | Strong on pattern-matching (symptom checkers, LLM diagnostic support, radiology/pathology AI) but weak on longitudinal context and undifferentiated presentations | AI increasingly assists differential generation; irreducible human judgment remains in weighing uncertainty, ruling out low-probability high-stakes conditions, and integrating with the whole patient — but this dimension is under real and growing pressure |
| Image and specimen interpretation | Reading X-rays/CT/pathology slides as part of initial workup | HIGH | FDA/TGA-cleared AI tools already match or exceed junior clinicians on narrow tasks (diabetic retinopathy, some radiograph triage, skin lesion classification) | Interns are not primary readers of record (radiologists/pathologists are), but AI substitution pressure on this adjacent task category is real and rising fast, and is a genuine gap if not addressed in training |
| Documentation & administrative clinical tasks | Discharge summaries, progress notes, referral letters, coding | HIGH | Ambient clinical documentation AI (e.g. scribe tools) already in pilot/production across Australian hospitals | Largely automatable; a legitimate near-term displacement risk for time currently spent by junior doctors, freeing time for higher-value tasks if curriculum adapts |
| Direct patient care & procedural skills | Physical examination, procedures, emergency response, bedside manner | LOW | AI cannot yet perform physical/procedural tasks or unscripted human interaction reliably or safely | Physically embodied, high-stakes, trust-dependent — the core irreplaceable competency of the degree |
| Professional judgment & accountability under uncertainty | Escalation decisions, informed consent, breaking bad news, multidisciplinary team leadership | LOW | AI can support but not assume legal/ethical accountability; registration and liability sit with the human clinician by design | AHPRA registration is a structural moat — accountability cannot be delegated to a model, and this is unlikely to change within the horizon of this cohort's career |
| Research and evidence generation | Year 4 research project, critical appraisal of literature | MEDIUM | AI accelerates literature synthesis and study design drafting but cannot independently generate primary clinical evidence or defend it under peer/ethical scrutiny | Moderately durable if the research component is rigorous (see D7); at risk of being reduced to a check-box exercise if not genuinely primary-data-generating |
| Population/public health & First Nations health practice | Applying population health and cultural safety frameworks in clinical contexts | LOW | AI has limited capability in culturally embedded, relationship-based practice | Durable — this is precisely the kind of contextual, relational competency AI cannot substitute |

**Overall Section Exposure:** MEDIUM

**Durability Assessment:** The MD sits at a structurally unusual point on the automation-exposure spectrum: its regulatory architecture (AHPRA registration, AMC accreditation, legal accountability vesting in the individual clinician) makes wholesale professional displacement implausible within the career horizon of a graduate entering in 2026. However, "the profession is safe" is not the same as "the curriculum is AI-ready." A meaningful share of intern-level tasks — documentation, first-pass image triage, differential-diagnosis drafting — are exactly the tasks where clinical AI tools are being deployed fastest across Australian hospitals right now, and the handbook text supplied contains no explicit mention of AI literacy, clinical AI governance, or AI-assisted diagnostic tool training. This is the central finding of this assessment: strong occupational moat, but a real and currently unaddressed curriculum gap on the tool-literacy and governance side that peer medical schools internationally are beginning to close.

### 3. MARKET EVIDENCE SNAPSHOT
| Job Family | Recent Hiring Signal | Discussion Theme | Curriculum Implication |
|---|---|---|---|
| Prevocational hospital medicine | AHPRA/AMC-mandated internship centrally allocated; ambient documentation AI piloted across Victorian/NSW hospitals | "AI is a time-reallocation tool for junior admin burden, not a role threat" | Embed AI-documentation verification into clinical placement onboarding |
| General practice training pathway | Persistent national workforce shortage; strong Commonwealth policy tailwinds | "Durable demand largely insulated from AI disruption" | Strengthen GP/rural pathway exposure and outcome tracking |
| Specialist college training | RACP/RANZCR publishing AI position statements and CPD content ahead of MD curriculum | "AI fluency layered on top of, not instead of, core clinical training" | Formal liaison with college AI/digital-health working groups |
| Emergency medicine | Rapid triage and high-acuity, undifferentiated presentations AI cannot safely own end-to-end | "Decision-support fluency under time pressure, not substitution" | Reinforce accountable, live-simulation decision-making |
| Radiology / pathology (later specialisation) | Most AI-exposed specialist pathway; college discussion assumes AI-workflow fluency at application stage | "AI-assisted reporting becoming baseline expectation" | Targeted AI-in-imaging elective ahead of college application windows |
| Rural and regional generalist medicine | National workforce shortage; Commonwealth Rural Generalist program tailwinds | "Broad-scope clinical judgement, telehealth-AI triage integration" | Strengthen rural/regional exposure as a stable high-need destination |

### 4. DFVA SCORECARD
| # | Dimension | Score (0-3) | Evidence-based rationale |
|---|---|---:|---|
| 1 | Automation Exposure of Roles | 3 | Entry role is intern-to-registrar clinical practice: physical examination, procedural skill, emergency escalation, accountable decision-making from day one. Handbook explicitly describes full-time clinical placement in Years 2-3 applying "foundational knowledge and skills to a broad range of patient encounters" — irreducibly human, relational, physically embodied work from the outset. |
| 2 | Systems Thinking and Problem Framing | 3 | The three-domain structure (biomedical science, clinical skills, professional practice) plus cross-cutting Population and Global Health theme requires integrating physiological, social and systems-level reasoning, not template execution. Year 4 capstone and Discovery pathways add authentic, assessed system-level problem framing. |
| 3 | Technical and Quantitative Depth | 3 | Applied biomedical science domain plus embedded research-methods theme across all three domains gives a strong, assessed technical core (physiology, pharmacology, pathology, biostatistics) sustained across all four years, not a one-off intro unit. |
| 4 | Decision-Making Under Uncertainty | 3 | Years 2-3 full-time clinical placement puts students in live, unscripted patient encounters with real diagnostic and management uncertainty; Year 4 capstone placement is explicitly described as building on this. Ungraded pass/fail structure reinforces competency-under-uncertainty as the assessment currency rather than scripted recall. |
| 5 | AI Literacy and Governance | 1 | The supplied handbook text contains no explicit reference to AI tools, clinical decision-support AI, diagnostic AI governance, or critical evaluation of AI in medicine — a notable omission given the current pace of AI deployment in Australian clinical settings (ambient scribing, imaging triage, decision support). This is scored generously assuming some coverage exists in biomedical informatics content not surfaced in the provided text, but is the clearest and most consequential gap in the program as described. |
| 6 | Domain Depth and Specialisation | 3 | Deep, regulated clinical/scientific expertise: AMC-accredited, AHPRA-registered, four years of integrated biomedical science and supervised clinical practice. This is as deep as domain specialisation gets in the DFVA rubric. |
| 7 | Research Methods Rigour | 2 | Research methods is an explicit cross-cutting theme and Year 4 includes "a research project in an area of interest," strengthened further for students on the Discovery research-scholar pathway. Scored 2 rather than 3 because the handbook text describes research as one component among several (alongside the capstone placement) rather than a routinely primary-data-generating core for the full cohort — the research-scholar pathway suggests this depth is optional/pathway-dependent rather than universal. |
| 8 | Human and Relational Capability | 3 | Professional practice is one of three co-equal curriculum domains; First Nations Health and Population/Global Health are embedded cross-cutting themes; clinical placement in every year builds direct, accountable patient-facing relational skill. This is a defining strength of the degree. |
| 9 | Curriculum Currency and Adaptability | 1 | No evidence in the supplied text of a recent structural refresh tied to AI-era clinical practice, nor of AI content in core units. The Discovery pathway shows structural flexibility for individualisation, but that is a different property from demonstrated currency on AI-specific content. Scored 1 (minor updates / individualisation flexibility) pending evidence of an AI-specific curriculum review. |
| 10 | Graduate Outcome Evidence | 2 | Medical graduate outcomes are unusually well-tracked at a system level (AMC national data, hospital intern match rates, AHPRA registration data) even though the handbook text itself does not present granular destination data. Scored 2 (destination data, partial detail) reflecting strong sector-wide tracking infrastructure external to the handbook page itself. |
| B | Irreplaceability Premium (Bonus) | 3 | Rare integration of deep technical/scientific depth, regulated domain expertise, and irreducible human/relational and physical clinical judgment — combined with a legal accountability structure (AHPRA registration) that cannot be delegated to an AI system. This is close to the strongest possible irreplaceability profile in the entire DFVA framework. |

**TOTAL: 27 / 36**  
**Risk band: MODERATE RISK (20-27)**

27 sits at the top boundary of MODERATE RISK, immediately below the 28-point RESILIENT threshold — the program is one meaningful intervention on D5/D9 away from RESILIENT.

### 5. THREE THRESHOLD QUESTIONS
- **Q1:** Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?  
  **NO** — A well-prompted AI agent cannot produce 80% of an intern/resident's first-two-year output: physical examination, procedural competence, legally accountable clinical decisions, and unscripted patient interaction are not currently AI-substitutable, and AHPRA registration vests accountability in a licensed human by design.
- **Q2:** Does this program train graduates to design systems, own decisions, or generate original insight?  
  **YES** — The program trains graduates to own high-stakes clinical decisions and generate original diagnostic and management judgments under supervision from Year 1 onward, escalating to full accountability at internship; the Year 4 research project adds a design/original-insight component on top of clinical decision ownership.
- **Q3:** Will these graduates be more employable in 5 years than today, given AI trends?  
  **UNCERTAIN** — Graduates will very likely remain highly employable (the AHPRA-gated internship pipeline all but guarantees this structurally), but whether they are *more* employable and effective relative to peers depends heavily on whether AI-literacy and clinical-AI-governance content is added before this cohort graduates — the current handbook evidence shows a real gap on this specific axis even as the underlying occupational moat remains strong.

### 6. ANALOGUE GRADUATE PROFILE
The most exposed analogue is not the doctor themselves but the *pre-AI intern-level information-processing workload* circa 2021-2022: the junior doctor spending disproportionate rostered time on discharge summaries, referral letters, first-pass image triage flagging, and manually synthesising a differential from raw history and test results before senior review. That workload — not the clinician's judgment, physical skill, or accountability — is the layer under active AI substitution pressure today. Specific tools/platforms illustrating this shift: **Nuance DAX / Microsoft Dragon Copilot** (ambient clinical documentation, already piloted in Australian hospitals), **Annalise.ai** (Australian-built radiograph triage/decision-support, TGA-approved), **Viz.ai** (stroke/large-vessel-occlusion imaging triage), **Ada Health / Isabel Healthcare** (differential-diagnosis decision support), and general-purpose clinical LLM copilots (e.g. **OpenEvidence**, hospital-deployed GPT-4-class clinical assistants) now used for rapid literature synthesis and note drafting. None of these tools threaten the registered clinician's role; all of them threaten the *time budget* junior doctors currently spend on documentation and first-pass triage — time a well-designed curriculum should explicitly reallocate toward supervision, judgment and AI-output verification skill.

### 7. VERDICT
The Doctor of Medicine is structurally one of the most AI-resilient degrees assessable under DFVA — AHPRA registration, physical/procedural competency, and legally vested clinical accountability form a genuine and durable moat that generic automation-exposure analysis of "graduate tasks" tends to understate. The program's score is held out of the RESILIENT band not by weakness in its clinical or scientific core, which is excellent, but specifically by an absence of demonstrated AI-literacy and clinical-AI-governance content (D5) and by no evidence of a recent AI-specific curriculum refresh (D9) in the material available. This is a narrow, addressable gap rather than a structural flaw, and closing it would very plausibly move this program into the RESILIENT band without touching anything else in an already strong curriculum.

### 8. RECOMMENDATIONS
| Priority | Action | Dimension | Market Signal Link | Effort |
|---|---|---|---|---|
| P1 | Embed a mandatory, assessed clinical-AI-literacy module covering diagnostic AI tools, ambient documentation AI, and their failure modes/governance requirements, integrated into the applied biomedical science and professional practice domains (not a single elective) | D5 | Ambient documentation AI rollout across Victorian/NSW public hospitals | Medium |
| P2 | Add explicit AI-output verification and escalation practice into clinical placement OSCEs/assessments — e.g. simulated scenarios where students must catch an AI diagnostic-support error | D5, D4 | AI-literate clinician framing appearing in specialist college curricula | Medium |
| P3 | Publish and formalise a curriculum review cadence explicitly tied to clinical AI adoption (annual advisory input from hospital digital health leads), and surface this publicly on the program handbook page | D9 | RACP/RANZCR AI position statements outpacing the MD curriculum | Low |
| P4 | Strengthen the Year 4 research project requirement toward universal primary-data engagement (not pathway-dependent via Discovery) so D7 reflects the full cohort, not just research-scholar students | D7 | AI accelerating literature synthesis, raising the value of primary appraisal | Medium |
| P5 | Publish granular destination/outcome data (specialty-matching rates, time-to-fellowship, geographic distribution) on the program page rather than relying on external AMC/AHPRA aggregate data | D10 | No program-level destination granularity relative to peer schools | Low |
| P6 | Add a dedicated module on AI in population/public-health surveillance and First Nations health contexts, given AI's documented equity risks in these domains | D5, D8 | Documented equity risk in clinical AI adoption | Medium |
| P7 | Formalise AI-assisted image/pathology triage exposure during clinical placements as a taught, supervised skill (using it correctly and knowing its limits), rather than incidental exposure | D5, D1 | Radiology/pathology is the most AI-exposed specialist pathway | Medium |

### 9. THE REDESIGNED GRADUATE PROFILE
The 2027-ready Doctor of Medicine graduate retains everything that already makes this degree durable — accountable clinical judgment, procedural competency, relational and culturally safe practice, AHPRA-registered accountability — and adds fluent, critical command of the AI tools now embedded in Australian clinical workflows. This graduate treats ambient documentation AI, diagnostic decision-support, and imaging-triage tools as instruments to be actively supervised and verified, not passively trusted or reflexively distrusted, and can articulate their failure modes to patients and colleagues alike. Having completed the strengthened Year 4 research requirement, they are also comfortable critically appraising AI-generated evidence syntheses and clinical literature reviews rather than accepting them uncritically. The net effect is an intern who starts residency not only clinically safe and independently deployable in high-uncertainty patient care, but measurably faster and more accurate at the documentation- and triage-adjacent tasks their AI-native hospital systems now expect junior doctors to supervise rather than perform manually — freeing more of their limited training time for the irreplaceable judgment, procedural, and relational work that remains squarely human.

### 10. MARKET CONFIDENCE NOTE
- Confidence level for market signals in this report: **Low–Medium**.
- The MD's first destination is a centrally allocated, AHPRA-gated internship pipeline rather than an open job-ad market, so structural workforce knowledge (near-universal placement, GP/rural shortages) is more reliable here than any job-ad scrape; AI-adoption signals rest on known hospital pilots and college position statements.
- For high-stakes curriculum decisions, verify current state-health EBA salary bands, confirm any AI content in units not surfaced in the handbook, and obtain UoM MD program-specific destination data (specialty-match, time-to-fellowship, geography).

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | Medicine |
| Full-time employment | Near-universal (AHPRA-gated internship allocation; granular program-level data not published) |
| Median starting salary | AUD 75,000–85,000 (intern/RMO; state-health EBA estimate) |
| Employment (3yr) | Not published at program level (structural pipeline implies near-universal continuation) |
| Occupation demand | Structural shortage (GP and rural/regional generalist medicine) |
| AI automation exposure | MEDIUM (documentation/triage layer); clinical core LOW |
| Sources | UoM Handbook 2026 (mc-dmed), AMC/AHPRA Medical Board of Australia registration framework, directional Australian medical-workforce and clinical-AI-adoption knowledge (LOW–MEDIUM confidence — not a live scrape) |
`,
};

export default content;
