# Evidura — Collaborator Brief: A/Prof Kayley Lyons

**The highest-value academic collaborator identified for Evidura: the researcher whose published work is DFVA done by hand, and who has already published the methodological critique DFVA is most exposed to**

**Prepared by:** David Mulholland, Associate Director, Service Experience & Design, University of Melbourne
**Date:** 2026-08-10
**Builds on:** [Inter-rater reliability study protocol](evidura-inter-rater-reliability-study.md) (the R1–R5 rater design this brief recruits into) · [Validate pack](compass-validate.md) (H1–H4; she bears on **H2 trust & standing**) · [Expert conversation discipline](compass-expert-conversations.md) (the Mom-Test rules that govern the meeting) · [DFVA methodology](dfva-methodology.md) (D1–D10, the rubric under review)

---

> **What this is.** A target brief for *one* person, written because she is not an ordinary interview target. Kayley Lyons is simultaneously (a) a **buyer persona** — a course director who owns curriculum review; (b) the **methodologist** who can close Evidura's single most dangerous vulnerability; and (c) the author of a peer-reviewed paper that is, in substance, DFVA performed manually on one program. Most targets serve one hypothesis. She serves three roles at once, which is why she gets her own brief rather than a row in the Wave-1 table.
>
> **What this is not.** A pitch deck. The [Mom Test discipline](compass-expert-conversations.md) still applies in the room — the difference is that with her, the *ask* is co-authorship, not attention, and that changes the opening move.

> ⚠️ **Before sending:** verify her current title and role on [Find an Expert](https://findanexpert.unimelb.edu.au/profile/918571-kayley-lyons) — this brief was compiled 2026-08-10 and roles change. Two facts below are from secondary summaries and are **not quotable**: the "41 peer-reviewed articles" count and the award list. Her LinkedIn (HTTP 999) and the CDTH people page (403) could not be retrieved, so her exact dates in role, current grants, and HDR supervision load are unverified.

---

## 1 · Who she is

**A/Prof Kayley Lyons** — PharmD, MS (Health-System Administration, with coursework at UNC Gillings School of Global Public Health), **PhD in Learning Sciences and Psychological Studies**.

**Current:** Director, Master of Public Health, Melbourne School of Population and Global Health, Faculty of Medicine, Dentistry and Health Sciences, University of Melbourne.
**Immediately prior:** Digital Health Education & Workforce Development Lead, Centre for Digital Transformation of Health (CDTH), UoM.
**Before UoM:** Monash; UNC Eshelman School of Pharmacy (Center for Innovative Pharmacy Education and Research).

**Metrics:** 1,419 citations · h-index 19 · i10-index 31 (Google Scholar). ~41 peer-reviewed articles *(secondary source)*. ASCILITE Innovation Award; Norman Curry Award for Excellence in Educational Programs *(secondary source)*.

**Stated interests** (Find an Expert): public health education · student motivation · collaborative learning · **design-based research** · education research · **program evaluation** · health professions education · digital health · **generative AI**.

The important read: she is a **learning scientist**, not a clinician who drifted into teaching. Her PhD is in how people learn and how you measure it. That is the discipline that judges whether DFVA is a measurement instrument or a number we made up.

### Her four research threads

| Thread | Representative work | Why it bears on Evidura |
|---|---|---|
| **Curriculum design & competency mapping** | Mun, Chanchlani, **Lyons**, Gray (2024, *JMIR Med Educ*) — Grad Cert redesign via competency mapping | The manual precedent for DFVA — see §2 |
| **AI/GenAI in education** | The three 2025–26 papers (§3); also Li et al. "Can LLMs write reflectively" (148 cites); Cheng, **Lyons**, Gašević, Swiecki "Evidence-centered assessment for writing with GenAI" (LAK'24) | Evidence base for scoring **D5** |
| **Learning sciences: motivation, collaboration, measurement** | "Cognitive apprenticeship in health sciences education" (206 cites); AMEE Guide No. 137 (learner motivation); socially-shared metacognition papers w/ Lobczowski & Greene | The psychometric capability |
| **Workforce development & Learning Health Systems** | Dushyanthen…**Lyons** (2022, *Learning Health Systems*) LHS Academy; JMIR Med Educ 2025 evaluation | Adjacent buyer network; Level-3 evaluation design |

**The one to notice:** Lyons, Lobczowski, Greene, Whitley, McLaughlin (2021, *Computers & Education*, 83 cites) — *"Using a design-based research approach to develop and study a web-based tool."* She has a published, cited methodology for **building an educational web tool and generating research evidence about it simultaneously**. That is Evidura's exact situation, and it means the research design does not have to be invented.

---

## 2 · The hook: she has already done DFVA by hand

Mun, Chanchlani, **Lyons**, Gray (2024, *JMIR Med Educ* 10:e54112) redesigned UoM's Graduate Certificate in Health Informatics and Digital Health. The team was **commissioned for three months in 2023**. Their method is the closest published analogue to Evidura's pipeline that exists.

> **Note on genre and roles.** This is a JMIR **Viewpoint**, not a research article — a practice account, not an empirical study. That lowers its evidentiary weight and *raises* its value to us: it is a candid practitioner description of how curriculum redesign actually gets done. Note also that the mapping itself was executed by **SC and MM** (Chanchlani and Mun) per the Methods; Lyons is a senior/advisory author. Do not overstate her hands-on role to her face.
>
> **Provenance.** Every quote and figure in §2 was verified against the source PDF (pages 1–4, 6–7) on 2026-08-11, not against the markitdown conversion — the conversion silently drops Figure 1 and mangles the two-column preamble. §2.1 rests on Figure 1 and would have been stated wrongly from the converted text alone.

| Their redesign | Evidura equivalent |
|---|---|
| Subject-level learning outcomes compared **statement by statement** to **AMIA Clinical Informatics Core Competencies**, then confirmed against the **Australian Health Informatics Competency Framework** (AIDH) | Handbook scrape → `getSyllabusMap` → DFVA D1–D10 criteria |
| Searched **"The University Handbook, an online catalog of courses and programs"** for candidate electives: **79 identified → 50 excluded → 13 selected** | The handbook scraper + syllabus map — the *same data source*, the same filter-a-catalogue problem |
| Syllabi of comparable national and international graduate certificates, from institutional websites | Go8 handbook corpus (`data/go8_{unikey}_handbook_data.json`) |
| Market scan on HEIMS (Dept. of Education) enrolment data | T1 enrolment trends (`getT1EnrolmentTrends`) |
| **699 digital-health job ads**, Oct 2020 – Jan 2021 — *pre-existing centre research, not commissioned for this redesign* | Felten AIOE exposure + `data/labour-evidence.json` + JIR alumni layer |
| Expert panel of subject coordinators + centre leadership, to "confirm the accuracy of the mapping and identify further gaps" | [Inter-rater reliability study](evidura-inter-rater-reliability-study.md), R1–R5 |
| Output: 3→2 cores, 2 elective slots, 13 electives, revised CILOs, program renamed *Graduate Certificate in Digital Transformation of Health* | Recommendation cards / `updateCourseIntervention` |

### 2.1 The sharpest wedge: the labour-market leg was the stalest input

This only emerges from the full text — and specifically from **Figure 1**, which enumerates the redesign's inputs by year. It is a better pitch than "it's slow and manual," but it must be stated precisely, because the loose version is wrong.

Figure 1's "Market context and needs analysis" stage lists: national and local digital health strategic plans · course evaluation and feedback **2021–2023** · commissioned market analysis report **2021** · HEIMS data **2021–2023** · commissioned health sector needs analysis report **2022** · institutional education stakeholder feedback **2023**.

So most inputs to the 2023 redesign were reasonably current. **The exception is the demand-side evidence.** The job-ad scan ran **12 October 2020 – 18 January 2021** (699 ads, 130 in Victoria) and the student survey was **October 2020** (n=14, 20% response). Both roughly three years old at point of use, and both gathered before ChatGPT existed.

The pattern is the point: **everything the university could generate internally was current; the one input that required commissioning external labour-market research was three years stale.** That is not carelessness — it is what bespoke market research costs, so you buy it once and live off it. And it is precisely the leg Evidura automates and refreshes.

State it that way. The over-general version ("their evidence was years out of date") is both inaccurate and insulting to a co-author; the precise version names a structural constraint she will recognise and did not choose.

Their own stated limitation, verbatim:

> *"Consultation for this project was informed by reports that included student evaluations but mainly occurred at the faculty educators and executive level."*

One program. Three months. Executive-only consultation. Three-year-old market data. She does not need convincing that this work is expensive, slow, and thin — she has the scar tissue. **That is the opening line, and it is why the first meeting is a conversation between peers rather than a pitch.**

### 2.2 They have already specified the product, and it isn't built

Two sentences in Limitations state the unmet need in their own words:

> *"assessment of further approaches such as the creation of logic models is underway"*
>
> *"The next steps will include the development of a **decision matrix** to aid the prioritization and co-design of new subjects."*

A decision matrix for prioritising curriculum change, refreshed against "the progress of the CAP, the evolution of the digital health landscape in Australia, and insights from international colleagues" — that is a description of Evidura written by a prospective user, in a peer-reviewed journal, two years before the meeting. **Ask in the room whether that decision matrix was ever built.** If the answer is no, the conversation stops being about whether the problem is real.

### 2.3 What their mapping does that DFVA does not

Their traceability runs **both ways**: course-level ILOs map *upstream* to the five AMIA domains, and *downstream* to subject-level ILOs (their Tables 1 and 2). Evidura currently only runs the downstream leg — handbook text to dimension score. It has no upstream leg to an external framework, which is precisely why a score can be dismissed as self-referential.

The five AMIA domains: **Fundamentals · Improving care delivery and outcomes · Enterprise information systems · Data governance and data analytics · Leadership and professionalism.**

Note too the gaps their mapping surfaced: data science/ML/AI, development-implementation-evaluation of digital health interventions, digital transformation of systems, and **Indigenous data governance**. That last one is a genuine DFVA blind spot — there is no dimension under which it scores, and in an Australian curriculum-assessment product that is an exposure worth raising before someone else does.

### 2.4 A free asset: their mapping is published as supplementary files

The paper ships two supplementary DOCX files:

- **Multimedia Appendix 1** — mapping of core subjects to AMIA competencies (37 KB)
- **Multimedia Appendix 2** — mapping of core subjects to AHICF competencies (30 KB)

That is a **hand-built, expert-panel-validated, openly licensed (CC BY) mapping of real UoM subject learning outcomes to two competency frameworks.** It is gold-standard reference data: run Evidura's mapping over the same subjects and compare against theirs. Agreement is a validity argument you can make *before* the first meeting; disagreement tells you where the pipeline is weak, which is more useful still. Download both before writing to her.

### The concrete ask from this thread

Have her assess whether **D1–D10 should be crosswalked to recognised competency frameworks** — AMIA and AHICF here, and the public-health competency frameworks for her own patch. A published crosswalk converts DFVA from *"a rubric we invented"* into *"a score expressed in the vocabulary accreditors already use,"* and supplies the missing upstream leg. That is the difference between a curiosity and a procurement line item, and it bears directly on **H2 (trust & standing)**.

---

## 3 · The three papers, and what each one gives us

### 3.1 Astbury, Fortune, Dal Ponte, **Lyons**, Shaw (2026) — *Nurse Education in Practice* 91:104697
**"Generative AI for teaching and assessment in health professions education: a scoping review."** JBI/PRISMA-ScR. 8,975 records → 5,826 screened → **23 included**, all published 2023–24. Lyons's CRediT role: *Writing – review & editing, Supervision, Methodology, Conceptualization*; the author-contributions note states **"LS and KL conceptualised the study."**

| Finding | Use for Evidura |
|---|---|
| Applications: learning resource (n=10), assessment-item generation (n=7), feedback (n=5), simulation (n=4), images (n=3) | Map of what "AI in the curriculum" actually means in practice — **D5** scoring evidence |
| Benefits: **time saving (n=17)**, personalised learning (n=9), decreased resource use (n=7) | The efficiency claim is empirically established; we don't have to argue it |
| Challenges: **accuracy (n=16)**, technical (n=10), inconsistency (n=8), ethics/integrity (n=8), pedagogical (n=7) | The objection list, ranked. Prepare for accuracy first |
| Top recommendation across the corpus: **human review / expert validation (n=15)**; then prompt engineering (n=11), limitations awareness (n=7) | **Position Evidura as expert-in-the-loop decision support, never an autonomous verdict.** Use their language |
| Deliverable: an **"AI HPE checklist"** — institutional readiness, ethical AI use, faculty training, *"Guidelines for AI Use in Assessment"*, *"Evaluation Metrics for AI-Assisted Learning"* | An external, peer-reviewed anchor to validate **D5** against |
| 41 of 73 full texts excluded because the studies never used "artificial intelligence" in title/abstract/keywords | The HPE literature is not reliably indexable — relevant to any claim Evidura makes about corpus completeness |

Their checklist's own framing — that AI should be *"a supplementary tool rather than a replacement for traditional assessment methods"* — is the exact register Evidura's product copy should adopt when speaking to this audience.

### 3.2 Woods, **Lyons**, Van Der Vegt, Olsen, Huang, Khor, Xu, Sullivan (2026) — *BMC Medical Education* 26:549
**"Assessing the effectiveness of AI education and training for healthcare workers: a systematic review."** PROSPERO CRD42024575061. 9,632 → 27 studies, ~2,160 learners, 10 countries. **Lyons is second author.**

The headline is a *negative* result and it is the most useful single finding in the set:

> Mapped against the Kirkpatrick-Barr hierarchy: **19 studies at Level 1** (learner reaction) · 21 at Level 2 (attitudes/knowledge) · **2 at Level 3** (behaviour change) · **0 at Level 4** (organisational practice / benefit to clients).

Supporting detail: 44% of programs ran under one week; 30% were one-off sessions; 67% taught only "introduction to AI"; **governance & regulation appeared in just 11%**; technical topics were rare (AI theory 30%, model creation 22%, data curation 19%, reviewing existing AI tools 7%).

**And the critique — read it as aimed at us:**

> *"most authors developed their own constructs, tests, and surveys **without evidence of validity, reliability, or generalizability**… increases the risk of multiple types of measurement errors, including **construct underrepresentation and method bias**, which can compromise the validity and reliability of results."*

An 11-dimension, 0–3, single-LLM-rater rubric with no published validity evidence sits squarely inside that sentence. Our own premortem already names a successful public challenge to the LLM scoring as *the* existential failure mode — the one that kills the product, not just the business model.

**She is both the person who would make that criticism and the person who could resolve it.** That is the entire argument for approaching her first.

### 3.3 McLaughlin, Dal Ponte, **Lyons** (2025) — *BMC Medical Education* 25:895
**"Student perceptions of GenAI as a virtual tutor to support collaborative research training."** GenAI gave structured formative feedback to groups of 5–7 students on their research plans, across two courses: UNC Eshelman's *Evaluation Research & Project Design* (n=20, working pharmacy residents) and **UoM's *Learning Health Systems* (n=55)**. Evaluation survey, n=64, **85.3% response rate**. Half the cohort had never used GenAI.

| Result | Read-across |
|---|---|
| 85% agreed the feedback was **valuable** | AI-generated evaluative feedback on a *plan* is accepted by professional adult learners |
| 78% said it **helped them improve their plan** | It is acted on, not just tolerated |
| 86% reported **increased interest in GenAI** | Exposure builds appetite rather than resistance |
| Distrust/disagreement **rare — including among the half who had never used GenAI before** | Encouraging prior for a sceptical academic audience. Worth testing, not assuming |

Structurally this is the same study as *"does a program director accept an AI-generated durability assessment of their curriculum?"* — a fast, clean, publishable acceptance-and-trust instrument that already exists and has already cleared ethics at both institutions.

---

## 4 · Six ways she moves Evidura

| # | Contribution | Bears on | Cost to us |
|---|---|---|---|
| 1 | **Competency-framework crosswalk** of D1–D10 (AMIA, AHICF, public-health frameworks) | H2 standing; procurement | Co-authorship |
| 2 | **Co-investigator / senior author on the IRR study** — fills R3 or R5 herself; her network (MSPGH, CDTH, Monash, UNC Eshelman) sources the hard-to-get non-UoM **R4** | The #1 existential risk | Co-authorship + the budgeted honorarium |
| 3 | **Construct validity beyond kappa** — do D1–D10 measure distinct things or collapse to two factors? Are the 28/20/12 band cuts defensible? Does "NOT RATABLE below 7 applicable" hold? | Methodology credibility | Time |
| 4 | **Re-anchor D10 on Kirkpatrick-Barr** — her framework, and her review proves the Level-4 vacuum D10 is trying to detect. Also gives Evidura *its own* evaluation ladder (we are currently at Level 1 at best). **Kirkpatrick is a through-line across her work** — the 2024 redesign notes "a robust evaluation process, modeled on the Kirkpatrick framework, is already in place within 1 core subject," so this is her established vocabulary, not an imposition | D10 defensibility; our own evidence claims | Nil |
| 5 | **Validate D5** against the AI HPE checklist + the 14-topic taxonomy from her two reviews. The 11%-governance finding is ready-made empirical justification for why D5 discriminates at all | D5 defensibility | Nil |
| 6 | **Run the acceptance study** — re-point the §3.3 instrument at Evidura reports and at program directors | H1 demand; H2 trust | A cohort + ethics |

### The H2 insight this brief surfaces

[Validate](compass-validate.md) frames **H2 (trust & standing)** as a bet that an independent layer can earn authority "the way Health Star, B Corp, Moody's, AACSB did," with the stated counter that *only a regulator or peak body can confer that standing*. Target #7 (LH Martin) and #8 (CSHE) test that.

Lyons opens **a third route that neither target covers: peer-reviewed publication as a standing mechanism.** A validation paper in *BMC Medical Education* or *Advances in Health Sciences Education*, co-authored by a named UoM Associate Professor and MPH Director, is a form of standing that neither a regulator nor a startup can grant — and it is cheap, fast relative to accreditation, and cumulative. That should be added to the H2 evidence plan regardless of whether she says yes.

---

## 5 · What she will push back on — prepare for all five

Read her own critique back at yourself before she does. None of these are hostile; all five are things she has published.

1. **"What's your validity evidence?"** She wrote the paragraph (§3.2). Have the [IRR protocol](evidura-inter-rater-reliability-study.md) in hand and the answer *"we're running it — will you co-author it?"* **Do not present current scores as settled.**
2. **"Human review was the top recommendation in my own review (n=15)."** Evidura is expert-in-the-loop decision support. Never an autonomous verdict. Mirror the checklist's "supplementary tool" language exactly.
3. **"Accuracy was the leading challenge in 16 of 23 studies."** A hallucinated or stale handbook claim inside a report that labels a colleague's degree HIGH RISK is career-damaging. Lead with the provenance story — the academic-level source references already shipping on report pages.
4. **"Who did you consult?"** She flagged executive-only consultation as a limitation of her *own* project. She will ask whether program directors and students helped design DFVA or were merely scored by it. Answer honestly; the honest answer is an invitation.
5. **The ethics of the band labels.** "CRITICAL" attached to a real degree that real students are currently enrolled in is a different object from an internal planning score. Have a position on student-facing harm before the meeting, not during it.

---

## 6 · The outreach draft

Not a pitch. The move is: prove you read her work, concede her strongest criticism *before* she makes it, and offer an authorship-bearing role rather than asking for a favour.

> **Subject:** Your Grad Cert competency-mapping paper — and a validity problem I'd like your help with
>
> Dear Kayley,
>
> I've just read the 2024 *JMIR Medical Education* paper on redesigning the Graduate Certificate through competency mapping — you, Michelle Mun, Sonia Chanchlani and Kathleen Gray. It's the closest thing I've found to what I've spent the last year building, and I'd like to be honest about why I'm writing.
>
> Through the University's MEC Define program I've been developing a method for assessing whether a degree program will hold its value as AI reshapes the labour market — an eleven-dimension rubric applied across 66 programs, scored from handbook data and labour-market evidence. What your team did by hand for one program in three months is, structurally, what I've been trying to automate: the same handbook catalogue, the same statement-by-statement comparison of learning outcomes against a framework, the same expert panel confirming the mapping.
>
> One line in your Limitations is the reason I'm writing rather than just reading. You note that the next step would be *"the development of a decision matrix to aid the prioritization and co-design of new subjects."* I'd like to know whether that ever got built — because if it didn't, I think I've spent a year building it without knowing you'd already specified it.
>
> Separately, and more importantly: the methodological point in your *BMC Medical Education* review with Leanna Woods — that authors keep developing their own constructs and surveys without evidence of validity, reliability or generalisability — is a fair description of where my rubric currently sits. A single LLM rater, no published inter-rater reliability, band thresholds I set myself. I'd rather hear that from you across a table than read it in a review of my own work later.
>
> So the ask is a real one, not a courtesy: I've designed an inter-rater reliability study — five raters, ten programs across all four risk bands — and I need it to be genuinely independent to be worth anything. I'd like to ask whether you'd consider being part of it, and whether the rubric ought to be crosswalked to established competency frameworks rather than standing on its own.
>
> Would half an hour in the next few weeks suit? I'm on the Parkville campus and happy to come to you. Entirely understood if the timing is wrong with the MPH directorship.
>
> With thanks,
> David
> *Associate Director, Service Experience & Design · University of Melbourne*

**Notes on the draft.** The decision-matrix paragraph is the strongest single move available — it quotes her team's own stated next step back to them and asks whether it exists. It is a genuine question, not a rhetorical one; if the answer is "yes, we built it," that is worth knowing immediately. The concession paragraph comes before any ask, which is load-bearing — softening it would waste the approach, because she is the one person in the network guaranteed to find the flaw anyway. It cites two of her papers specifically, so it cannot read as a mail-merge. It names co-authorship implicitly ("be part of it") rather than requesting unpaid review. It offers an exit per the house pattern. It does **not** attach a report — a live reaction is the data, per [EXP-05](compass-experiment-backlog.md).

**Timeline note.** The 2024 paper ran submitted 30 Oct 2023 → accepted 20 Jun 2024 → published 31 Oct 2024: twelve months end to end. Plan any co-authored validation paper on that horizon, and do not let the publication timeline become the critical path for the commercial validation of the rubric.

---

## 7 · Follow-on network

If the first conversation goes well, she is a hub rather than a leaf:

| Via | Who | Why |
|---|---|---|
| CDTH | **Kathleen Gray**, Louise Shaw, Cory Dal Ponte, Sonia Chanchlani, Michelle Mun | Co-authors on the mapping and scoping-review papers; CDTH is the natural home for a digital-health pilot |
| CDTH (via the 2024 acknowledgments) | **Wendy Chapman**, Meredith Layton, **Daniel Capurro**, Brian Chapman, **Sathana Dushyanthen**, Elizabeth Dent, Gouri Ligam | Named as contributors to the redesign — i.e. the people who *did* the curriculum work. Chapman and Capurro are the senior CDTH figures; Dushyanthen is first author on both LHS papers with Lyons |
| Monash / learning analytics | **Dragan Gašević**, Zach Swiecki | Arguably the strongest learning-analytics group in Australia; she publishes with them (LAK'24, *Computers and Education: AI*) |
| UQ Digital Health Centre | **Leanna Woods**, Clair Sullivan | First and senior authors on the 2026 systematic review — a non-UoM Go8 route to **R4** |
| UNC Eshelman | **Jacqueline McLaughlin** | Her longest-running collaborator; an international comparator cohort for the acceptance study |
| FMDHS program directors | MD, nursing, dentistry, pharmacy, physiotherapy, health informatics | AHPRA-regulated, accreditation-heavy — the segment where "is this degree still worth doing in 2030?" is already a live question |

---

## Sources

- [A/Prof Kayley Lyons — Find an Expert, University of Melbourne](https://findanexpert.unimelb.edu.au/profile/918571-kayley-lyons)
- [Google Scholar profile](https://scholar.google.com/citations?user=m_zTB7YAAAAJ&hl=en)
- Astbury H, Fortune E, Dal Ponte CD, Lyons K, Shaw L (2026). Generative artificial intelligence for teaching and assessment in health professions education: A scoping review. *Nurse Education in Practice* 91:104697. [doi:10.1016/j.nepr.2025.104697](https://doi.org/10.1016/j.nepr.2025.104697)
- Woods L, Lyons K, Van Der Vegt A, Olsen Q, Huang W, Khor JS, Xu N, Sullivan C (2026). Assessing the effectiveness of artificial intelligence education and training for healthcare workers: a systematic review. *BMC Medical Education* 26:549. [doi:10.1186/s12909-026-08969-3](https://doi.org/10.1186/s12909-026-08969-3)
- McLaughlin JE, Dal Ponte CD, Lyons K (2025). Student perceptions of GenAI as a virtual tutor to support collaborative research training for health professionals. *BMC Medical Education* 25:895. [doi:10.1186/s12909-025-07390-6](https://doi.org/10.1186/s12909-025-07390-6)
- Mun M, Chanchlani S, Lyons K, Gray K (2024). Transforming the Future of Digital Health Education: Redesign of a Graduate Program Using Competency Mapping. *JMIR Medical Education* 10:e54112. **[Viewpoint]** [doi:10.2196/54112](https://doi.org/10.2196/54112) · [full text](https://mededu.jmir.org/2024/1/e54112) · [PMC11542907](https://pmc.ncbi.nlm.nih.gov/articles/PMC11542907/) — *full text read 2026-08-11; §2 of this brief is drawn from the paper itself, not a summary*
- Valenta AL, Berner ES, Boren SA, et al. (2018). AMIA board white paper: 2017 core competencies for applied health informatics education at the master's degree level. *JAMIA* 25(12):1657-68. [doi:10.1093/jamia/ocy132](https://doi.org/10.1093/jamia/ocy132) — *the framework DFVA would crosswalk to*
- Australasian Institute of Digital Health (2022). [Australian Health Informatics Competency Framework, 2nd ed.](https://digitalhealth.org.au/wp-content/uploads/2022/06/AHICFCompetencyFramework.pdf)
- Dushyanthen S, … Lyons K (2022). Fostering the use of Learning Health Systems through a fellowship program for interprofessional clinicians. *Learning Health Systems*. [PMC9576228](https://pmc.ncbi.nlm.nih.gov/articles/PMC9576228/)
- Dushyanthen S, Zamri NB, Chapman W, Capurro D, Lyons K (2025). Evaluation of an Interdisciplinary Educational Program to Foster Learning Health Systems. *JMIR Medical Education*. [mededu.jmir.org/2025/1/e54152](https://mededu.jmir.org/2025/1/e54152)
