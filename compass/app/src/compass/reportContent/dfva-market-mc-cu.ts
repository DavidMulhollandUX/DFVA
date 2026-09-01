// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Clinical Ultrasound (MC-CU) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Clinical Ultrasound (MC-CU)
**Assessment Date:** 2026-09-01 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-cu

---

## 1. JOB FAMILY MAP

| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Cardiac sonography / echocardiography (the program's own specialisation) | Cardiac Sonographer, Echocardiographer, Diagnostic Medical Sonographer (Cardiac) | Acquiring and interpreting transthoracic and transoesophageal echocardiograms, Doppler and valve/aortic pathology assessment, 3-D echo reporting | LOW — a 2025 Australian crossover study measured a real efficiency gain from AI-assisted acquisition (25% less scan time, 54% fewer console keystrokes), not task elimination, and imaging-industry commentary frames the tools as "capacity multipliers" against a workforce shortage | Interpreting AI-flagged or automated measurements, validating automated image quality, Doppler and valve-pathology judgement | L2-1 (*Echo Research and Practice*, 2025-06-16); L3-2 (Cardioserv, 2026-04-13) |
| Point-of-care ultrasound within an existing medical specialty (matches the program's own cohort — see note below) | No new title; existing clinicians (GP, emergency physician, obstetrician) adding ultrasound competency to their own practice | Incorporating clinical ultrasound into existing specialty practice; workplace-logged real-patient scanning | LOW — clinical judgement plus hands-on scanning is the assessed skill, and the program teaches no AI content at all (C3 = 1/3, operational digital-tool use only) | Workplace-integrated scanning competency, structured case logging against professional standards | \`dfva/source/evidence/mc-cu.json\` W3 / MEDI90048 hurdle; L1-2 (ASA/ASAR Code of Conduct, 2025-07-21) |
| General diagnostic medical sonography / ultrasound technology (the broader occupation named in the profession record's aliases) | Diagnostic Medical Sonographer, Ultrasound Technologist, Medical Imaging Technologist | General (non-cardiac) diagnostic ultrasound scanning across modalities | LOW–MEDIUM — a European imaging-workforce survey found opinion split on future job prospects (32.3% expect more opportunities, 30.1% fewer, 32.6% no change) alongside 79.9% agreement that AI will assist rather than replace | AI-tool oversight and override judgement, automated-measurement validation | L2-3 (*Insights into Imaging*, 2025-02-17) — scoped: sonographers were only 46 of 2,206 respondents (2.1%), survey fielded in Europe in 2023 |
| Clinical ultrasound education and advanced reporting | Clinical Ultrasound Educator, Sonography/Echocardiography Clinical Supervisor | Teaching and mentoring, advanced case interpretation, structured critique of ultrasound literature | LOW — no source below measures AI substitution in ultrasound-education roles specifically; this rating rests on the program's own literature-critique and mentoring content, not a labour-market source | Teaching AI-literacy to trainees, critical appraisal of ultrasound literature | \`dfva/source/evidence/mc-cu.json\` C5 (MEDI90083); L3-1 (AuntMinnie/AIUM keynote, 2026-05-28) |

**Cohort note.** MC-CU's own course description states it is "offered to practicing medical professionals who wish to obtain further expertise in medical ultrasound for clinical practice" — an upskilling cohort of already-practising clinicians, not a first-entry pathway into the sonographer workforce. The occupation used as the destination basis below (ONET 0615, Sonographer) is the closest available labour-market analogue for the ultrasound-specific skill this program teaches, but entry-title and job-ad evidence framed around that occupation describes the broader sonography workforce, not necessarily this program's own graduate population.

---

## 2. RECENT JOB AD SIGNALS

1. **No live job-advertisement data exists for this research window.** The supplied profession record's \`jobAds\` block reports \`source: "none"\`, \`count: 0\`. This section cannot state Adzuna-sourced vacancy volumes, top employers, or top skills for the sonographer occupation. **Confidence: LOW** — this is a data gap, not evidence of flat or falling demand.
2. **Independent trade-press commentary describes a persistent Australian sonography workforce shortage.** Cardioserv (13 April 2026) reports sonography vacancy rates rising from 6.9% in 2021 to 16.7% in 2023 and standing at 12.4% in 2025, alongside over half of sonographers reporting moderate-to-severe burnout. These figures are compiled by Cardioserv from separate primary workforce surveys it does not itself run or fully cite. **Confidence: MEDIUM-LOW** — directional, not a primary source; do not reuse the specific percentages without tracing them to the original survey.
3. **No named employers are available for this program's destination occupation.** With no job-ad pull performed, there is no basis for a top-employers or top-skills list distinct from the qualitative discussion in §3. **Confidence: LOW.**
4. **No L4-lane (direct labour-market-database) claims exist in the supplied profession record.** The record's evidence lanes run L1 (regulatory/professional-body), L2 (peer-reviewed), L3 (trade press) and L5 (practitioner discourse) — L4 is absent entirely, consistent with the empty \`jobAds\` block. **Confidence: LOW** — a fresh job-ad pull is needed before this section can report demand volume with any confidence.

---

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** A government-relations report from the Australasian Sonographers Association ([ASA](https://www.sonographers.org/article/national-registration-and-accreditation-scheme-complexity-review---key-outcomes-for-sonography)) on a Health Ministers Meeting communique, the joint ASA/[ASAR](https://www.sonographers.org/article/new-code-of-conduct-for-sonographers-launched) Code of Conduct instrument, a peer-reviewed Australian clinical workflow study in [*Echo Research and Practice*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12168272/), a peer-reviewed European workforce survey in [*Insights into Imaging*](https://pmc.ncbi.nlm.nih.gov/articles/PMC11832980/), trade-press coverage of a conference keynote ([AuntMinnie](https://www.auntminnie.com/clinical-news/ultrasound/article/15826275/aium-ai-has-evolving-role-in-ultrasound), 28 May 2026) and of a vendor partnership announcement ([Imaging Technology News](https://www.itnonline.com/content/ge-healthcare-nvidia-expand-relationship-focusing-autonomous-imaging), 18 March 2025), and an imaging-staffing industry blog ([Cardioserv](https://www.cardioserv.net/sonographer-shortage/), 13 April 2026). Direct extraction from X or LinkedIn was **not** performed and no professional forum was sampled — where this section refers to discourse, it denotes these named regulatory, peer-reviewed, and trade-press sources, plus one practitioner-hosted podcast episode flagged as such below. Dates are given where the source carries one.

### Theme 1 — AI-assisted acquisition measurably cuts sonographer scan time and system interaction, without removing the sonographer from the loop

A single-centre Australian crossover study published in [*Echo Research and Practice*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12168272/) (16 June 2025, University of South Australia / Swinburne / Flinders Medical Centre) found an AI/automation-enabled transthoracic echocardiography protocol reduced scan time by 25% (13.4 vs 18.0 minutes) and console keystrokes by 54% (230.9 vs 502.8), both p<0.001. This is a within-scan efficiency measurement — two sonographers, 35 volunteers, one exam type, one Adelaide site — and does not measure job loss, staffing levels, or task elimination; the authors themselves flag the small sample as a limit on generalisability.

**Bearing:** C3 and W2.

### Theme 2 — professional and imaging bodies frame AI as an assistive "capacity multiplier," not a replacement, against a persistent workforce shortage

At the American Institute of Ultrasound in Medicine's 2026 annual meeting, keynote speaker Dr Alison Noble described AI as an evolving aid that helps sonographers manage workload and extend care to underserved areas, per [AuntMinnie's](https://www.auntminnie.com/clinical-news/ultrasound/article/15826275/aium-ai-has-evolving-role-in-ultrasound) coverage (28 May 2026) — one expert's characterisation at a single keynote, illustrated mainly by low-resource-setting deployments, not a quantified study. [Cardioserv](https://www.cardioserv.net/sonographer-shortage/) (13 April 2026) reports the imaging industry positioning AI-assisted acquisition and automated measurement as "capacity multipliers, not replacements for sonographers" against reported vacancy rates that reached 16.7% in 2023. A separate 37-country European survey in [*Insights into Imaging*](https://pmc.ncbi.nlm.nih.gov/articles/PMC11832980/) (17 February 2025) found 79.9% of imaging professionals agreed AI would only assist rather than replace their role — but sonographers were only 46 of 2,206 respondents (2.1%), the survey was fielded in mid-2023, and it covers Europe, not Australia. Together these support an assistive framing rather than a replacement one, but none of the three is a measured employment or task-elimination outcome.

**Bearing:** C3 and W3.

### Theme 3 — Australian sonography remains outside statutory AHPRA registration while the profession strengthens voluntary self-governance

As of September 2025, sonographers in Australia sit outside the Health Practitioner Regulation National Law (AHPRA/National Registration and Accreditation Scheme); the [ASA's report](https://www.sonographers.org/article/national-registration-and-accreditation-scheme-complexity-review---key-outcomes-for-sonography) of the 12 September 2025 Health Ministers Meeting confirms only a revised risk-assessment process due mid-2026, not admission to the scheme. Against that backdrop, the ASA and Australian Sonographer Accreditation Registry jointly [launched a new Code of Conduct](https://www.sonographers.org/article/new-code-of-conduct-for-sonographers-launched) on 21 July 2025, setting 21 voluntary standards. This confirms only the regulatory-status fact and the existence of the new voluntary instrument — it says nothing about AI displacement risk or practitioner sentiment, and ASA/ASAR have no statutory power to compel compliance the way an AHPRA board would.

**Bearing:** W1 and C1.

### Theme 4 — vendor roadmaps are pursuing autonomous, robot-assisted ultrasound to reduce sonographer physical strain, though products remain in development

[Imaging Technology News](https://www.itnonline.com/content/ge-healthcare-nvidia-expand-relationship-focusing-autonomous-imaging) (18 March 2025) reported that GE HealthCare and NVIDIA's expanded partnership aims to reduce sonographer physical strain and workload through AI-driven image understanding and robotic navigation, citing industry figures that roughly 90% of sonographers report work-related musculoskeletal disorders and 81% of U.S. health systems report radiology technologist shortages. This describes a March 2025 development partnership and stated intent — not a deployed, independently evaluated product — and the cited 90%/81% figures are industry statistics the article does not itself source, so treat them as unverified pass-through statistics rather than ITN-original findings.

**Bearing:** C4 and C3.

---

## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)

| Declining Demand | Velocity | Rising Demand | Velocity |
|---|---|---|---|
| Manual, keystroke-heavy console interaction during standard transthoracic echo acquisition | Medium | Interpreting and validating AI-assisted acquisition and automated-measurement outputs | Medium |
| Purely manual probe navigation for standard cardiac views, as vendors pursue autonomous/robot-assisted scanning (development-stage, not yet deployed) | Slow | Oversight and validation of AI-guided or robotic-assisted image acquisition | Slow |
| — (not evidenced in the supplied sources) | — | Workflow-tool literacy, positioned by imaging-industry commentary as a "capacity multiplier" against a rising sonography vacancy rate | Fast |
| Reliance on the prior (2015/2022) ASA/ASAR conduct codes | Slow | Structured adherence to the July 2025 ASA/ASAR Code of Conduct's 21 standards | Slow |
| — (not evidenced in the supplied sources) | — | AI-literacy framed as a workload-management and care-access-extension skill (AIUM 2026 keynote) | Slow |

---

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | The program teaches zero AI content (C3 = 1/3, operational digital-tool use only) while §3 Themes 1, 2 and 4 show AI-assisted acquisition and automated measurement are already measurably changing echocardiography workflow and are the subject of active professional-body and vendor discourse | C3 Digital/AI literacy | Add assessed content on AI-assisted acquisition and automated-measurement tools' capabilities and limits within an existing core echocardiography subject (e.g. MEDI90059's reporting-system content) |
| CI-2 | W1 = 0/3 (assessment is entirely MCQ; no professional-audience communication task is assessed) while the new 2025 ASA/ASAR Code of Conduct sets fresh professional-standards expectations that a purely-MCQ program does not currently touch | W1 Professional communication | Add an assessed professional-communication task — e.g. a structured echocardiography report communicated to a referring-specialist audience — mapped to the Code of Conduct's standards |
| CI-3 | C1 = 0/3 (no collaborative or stakeholder-facing assessment anywhere in the program) while the "capacity multiplier" discourse in Theme 2 implies AI tools are reshaping team-level imaging workflow, not just solo task execution | C1 Collaborative/stakeholder work | Consider a collaborative case-review or multidisciplinary handover task, since the evidence file already flags this as a Level 0/1 ambiguity resolved to the lower level for want of any assessed collaboration |
| CI-4 | W2 = 1/3 (demoted from 2 on verification): MEDI90048's logbook of 50 real workplace patient scans is a genuine live-practice task but is graded pass/fail with no documented criteria, even as Theme 1 shows measurable, criteria-based efficiency gains are now achievable in the same workflow | W2 Task authenticity | Add a documented, criteria-based grading rubric to the MEDI90048 workplace logbook hurdle rather than leaving it pass/fail |
| CI-5 | Gate G2 (live projects with real uncertainty and accountability) PASSes, but on a single core subject's live-practice component rather than a broadly distributed pattern — the dominant assessed format program-wide is MCQ | G2 Authentic assessment (program-wide pattern) | Given the workforce-shortage and capacity-multiplier pressure in Theme 2, broadening live, criteria-graded practice assessment beyond MEDI90048 would strengthen a currently narrow basis for the PASS |

---

## 6. EVIDENCE CONFIDENCE + GAPS

| Signal Area | Confidence | Gap / Caveat |
|---|---|---|
| AHPRA/NRAS regulatory status and the 2025 Code of Conduct | HIGH | Single-source (ASA) reporting of a government communique and a joint-body instrument; both are primary announcements from the bodies directly involved |
| AI-assisted acquisition efficiency gains | HIGH (peer-reviewed) | Single Adelaide site, 2 sonographers, 35 volunteers, one exam type — the authors' own generalisability caveat applies |
| Workforce vacancy rate / burnout figures | MEDIUM-LOW | Secondary compilation by a trade blog (Cardioserv) that does not name its primary survey sources |
| AI-vs-replacement workforce sentiment | MEDIUM | Real peer-reviewed survey, but sonographers are only 2.1% of the sample, fielded in Europe in mid-2023, not Australia in 2025/2026 |
| Vendor autonomous-ultrasound roadmap (GE HealthCare/NVIDIA) | MEDIUM-LOW | Partnership-announcement coverage of stated intent, not a deployed or independently evaluated product; cited 90%/81% figures are unsourced pass-through statistics |
| Job-advertisement volume, employers, skills | LOW / none | No Adzuna or equivalent job-ad data was collected for this occupation in this research window |
| Practitioner-level discourse (podcast) | LOW | One practitioner's recorded conversation on a practitioner-hosted podcast — no sample, not representative |

### Critical evidence gaps to close before institutional use:

1. No live job-advertisement data (Adzuna or equivalent) has been collected for this occupation — commission a fresh job-ad pull before treating labour-demand volume as evidence.
2. The vacancy-rate and burnout percentages compiled by Cardioserv need tracing to their original primary surveys before reuse in an institutional report; Cardioserv's own citation does not identify them.
3. No Australian-specific sonographer AI-sentiment survey exists in the corpus — the only sentiment survey found is European, fielded in 2023, with sonographers at 2.1% of the sample; a targeted search for an ASA-run Australian survey would close this gap.
4. This program's own cohort (already-practising medical professionals adding ultrasound competency, per the course description) differs from the entry-level sonographer workforce the destination occupation title describes — most job-family and job-ad evidence above should be read as bearing on the destination specialty skill set, not on entry-level sonographer employment counts for this program's graduates specifically.
5. Searches for an Australian occupation-level AI-exposure figure (Jobs and Skills Australia, OECD) returned nothing in the underlying profession research — this remains an open gap, not evidence of low exposure.

---

**Assessment Date:** 2026-09-01
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-cu
**Prompt Version:** DFVA-COPILOT-MARKET-v1

## REAL GRADUATE DESTINATIONS (JSA HEO)

**Where graduates of this field actually work** — [JSA Higher Education Outcomes](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) (ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of education **0615 Radiography** (n = 5,780 completions). Shares are the percentage of the field's graduates in wage or salary work; the field's ten most common entry occupations account for 86.5% of them, and the 5 largest are shown at each stage.

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Medical Diagnostic Radiographer (50.5%) · Sonographer (15.9%) · Medical Radiation Therapist (7.6%) · Nuclear Medicine Technologist (4.8%) · Diagnostic and Interventional Radiologist (2.1%) |
| Early (~3yr) | Medical Diagnostic Radiographer (50.9%) · Sonographer (16.6%) · Medical Radiation Therapist (8.3%) · Nuclear Medicine Technologist (5.0%) · Diagnostic and Interventional Radiologist (1.7%) |
| Senior (~5yr) | Medical Diagnostic Radiographer (48.3%) · Sonographer (17.5%) · Medical Radiation Therapist (8.3%) · Nuclear Medicine Technologist (4.7%) · Diagnostic and Interventional Radiologist (1.7%) |

**Field grain, not program grain.** These are graduates of the whole Radiography field of education at every completion level — not this program's graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, so the 1/3/5-year lists move little for most fields.
`,
};

export default content;
