// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "C1": {
    "score": 2,
    "rationale": "Level 2 per anchor 'At least one core unit assesses collaborative practice — group projects with individual accountability...': core units GENE90025 and GENE90026 each pair a graded 'Group oral presentation' (20%) with a separately graded 'Individual written summary of group presentation' (20%), documenting individual accountability within group work, and POPH90226 and GENE90024 each carry an additional graded group presentation (30%), so assessed collaborative practice recurs across the compulsory core. Level 3 is not met: its anchor requires 'coordinating work across people AND tools/AI systems' — no line in the extract mentions AI, or documents tool/role allocation being itself assessed alongside human roles, so the item is capped at 2 (human-plus-tool coordination evidence, per the v4.1 migration note, is entirely absent).",
    "evidenceLines": [
      "Group oral presentation (3-4 students per group)",
      "Individual written summary of group presentation",
      "Group oral presentation",
      "Group Presentation (2000 words equivalent)",
      "Group Oral Presentation (3-4 students per group)"
    ]
  },
  "C2": {
    "score": 2,
    "rationale": "Level 2 per anchor 'Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique...': the compulsory HLTH90014 assesses a 'Critique of papers' at 2500 words for 50% of the subject, a substantial structured-critique task in the core. Level 3 ('document and justify reliance decisions... or evidence strategy adjustment over time') is ambiguous against the capstone internship's Essay 2, assessed on demonstrating progression in meeting competencies through host feedback over time — a process-focused reflection that could be read as C2's evaluative-judgement construct, but reads more directly as W3's structured reflection on professional practice with accountability to the host; per 'one construct, one home' it is scored under W3, and per the scoring-direction rule the residual ambiguity for C2 is resolved to the lower level.",
    "evidenceLines": [
      "'Critique of papers'"
    ]
  },
  "C3": {
    "score": 1,
    "rationale": "Level 1 per anchor 'AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable': core subjects GENE90025 ('Application of software and genomic database for collation of evidence for interpretation will be covered in detail') and GENE90026 ('The syllabus will introduce the bioinformatics pipeline...'; 'in silico software, genetic databases') document digital-tool content, but only as operational skill for running software/databases in variant interpretation. No line in the extract, core or elective, addresses AI/digital limitations, ethics or governance, so per the v4.1 migration note ('tool-operation content caps at level 1') Level 2's 'capabilities AND limitations/ethics' bar is not reached.",
    "evidenceLines": [
      "Application of software and genomic database for collation of evidence for interpretation will be covered in detail.",
      "The syllabus will introduce the bioinformatics pipeline associated with whole exome and genome sequencing and variant interpretation.",
      "Collect evidence appropriately from population variant databases, in silico software, genetic databases and scientific literature to interpret variants."
    ]
  },
  "C4": {
    "score": 1,
    "rationale": "Level 1 per anchor 'Transfer is claimed in outcomes ... but not assessed': program-level outcomes state graduates should 'Identify future learning needs in order to maintain expert genetic and genomic knowledge level' and 'Be critical and creative thinkers, with an aptitude for continued self-directed learning', and HLTH90011 lists 'Skills in self-directed learning' as a generic skill — none tied to a specific assessed criterion in the extract. The clearest candidate for assessed cross-context application, the Genomics and Health Internship, is deliberately excluded here: the v4.1 migration note moves the level-3 WIL route out of C4 into W3, leaving no core-assessed evidence of application to a novel or unfamiliar problem, so the item sits at the claimed-but-unassessed level.",
    "evidenceLines": [
      "Identify future learning needs in order to maintain expert genetic and genomic knowledge level",
      "Be critical and creative thinkers, with an aptitude for continued self-directed learning",
      "Skills in self-directed learning."
    ]
  },
  "C5": {
    "score": 1,
    "rationale": "Level 1 per anchor 'Introductory methods unit; literature-review assessment': the compulsory-for-everyone HLTH90014 is explicitly introductory ('This subject will prepare students for undertaking clinical research...') and its methods assessment, 'Design a research project' (20%), requires designing but not conducting an inquiry or collecting data, so Level 2 ('design and conduct... with... data collection, assessed') is not reached by evidence available to every student. The Health Research stream's HLTH90011→HLTH90013 sequence does document primary data collection ('Data collection commences in Year 2 and students are required to collect and/or analyse research data...') defended at a 'Viva presentation of findings', which would otherwise satisfy Level 3, but the course structure names it a 'Health Research stream' offered alongside a 'Non-Research stream', with the research subjects substituting for elective credit rather than being required of all — exactly the 'one route among several' the Level 3 anchor excludes — so the item is scored on the universally compulsory evidence only.",
    "evidenceLines": [
      "This subject will prepare students for undertaking clinical research within hospital, community and primary health care settings. Students will develop skills in how to design and conduct empirical research in an ethically appropriate manner. Content includes: development of a research question, study design and methodology, and ethical issues in health care research.",
      "Design a research project"
    ]
  },
  "adaptiveness": 7,
  "W1": {
    "score": 2,
    "rationale": "Level 2 per anchor 'at least one core assessment requires a recognised professional genre or an audience beyond the teaching team ... public-facing artefact': core subject GENE90001 assesses a 'Written task (Lay communication)' (15%), GENE90024 assesses a 'Fact sheet / brochure' (40%, a public-facing artefact named directly in the anchor), and the capstone HLTH90012 assesses a 'Written job application... Interview' (25%) judged against job-selection criteria. Level 3 requires at least one assessment 'delivered to, or judged by, a real external audience or practitioner'; HLTH90012's interview is explicitly run by 'Subject Coordinator and/or senior staff of the Program' rather than a confirmed external or host-organisation assessor, so this is ambiguous and resolved to Level 2 per the lower-level rule.",
    "evidenceLines": [
      "Written task (Lay communication)",
      "Fact sheet / brochure",
      "Written job application: 1500 words Interview: 20 minutes (equ. 2000 words)"
    ]
  },
  "W2": {
    "score": 2,
    "rationale": "Level 2 per anchor 'A core assessment reproduces a professional task end to end (not a fragment) and is judged against criteria drawn from practice': WELF90004's 'Role play, videoed with peer' and WELF90005's 'Video role play with peer' are Year-1 core simulated counselling interactions judged against practice micro-skills, an end-to-end professional task rather than a fragment. Level 3 is not reached: the item's only candidate genuine constraint of practice was HLTH90012's AT4 job application/interview, but per the rubric's 'one construct, one home' rule that task is W1's Level-2 public-facing-artefact/audience evidence and cannot also supply W2's constraint-of-practice leg. Stripped of that reused evidence, the remaining core evidence is the WELF90004/WELF90005 role plays, both in Year 1 only, which does not establish the required assessment spine of 'at least one per stage' together with a genuine externally-supplied constraint, real resource/time limit, consequential audience, or the profession's own performance standard, so the item is capped at Level 2.",
    "evidenceLines": [
      "Role play, videoed with peer (500 words equivalent)",
      "Video role play with peer"
    ]
  },
  "W3": {
    "score": 3,
    "rationale": "Level 3 per anchor 'Substantial required work-situated learning: an extended placement or practicum, or a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection on professional practice': the compulsory, year-long (37.5-point) Genomics and Health Internship requires students to undertake two professional internships under 'the guidance of a senior staff member at the host organisation', with the Subject Coordinator providing 'ongoing monitoring of student work and progress' and 'site visits' — documented host accountability — and is assessed via journal-and-essay tasks (30% + 30%) explicitly requiring students to 'demonstrate progression in meeting professional competencies and personal development in response to experiences and feedback' — structured reflection on professional practice.",
    "evidenceLines": [
      "This capstone internship subject for the Master of Genomics and Health is designed to provide students a practical experience with organisations related to their interests. Students will undertake two professional internships.",
      "The students will work under the guidance of a senior staff member at the host organisation, with additional support from the Subject Coordinator, who will provide ongoing monitoring of student work and progress, and may conduct site visits.",
      "Due within 1 week of completion of internship 1, Semester 1, weighting 30%",
      "Due within 1 week of completion of internship 2, Semester 2, weighting 30%",
      "AT3: Journal of activities undertaken in internship, connected to competencies. The journal, feedback from provider host and self-reflection on performances in both internships will be used to write Essay 2 which will demonstrate progression in meeting professional competencies and personal development in response to experiences and feedback."
    ]
  },
  "workplace": 7,
  "gates": {
    "G1": {
      "result": "PASS",
      "rationale": "PASS per anchor 'a staged prerequisite chain': the compulsory core documents graded prerequisite sequencing within the specialist genomics/health content — GENE90002 gates GENE90027 (Frontiers in Genomics 1) at a 70% result, and GENE90026 is a stated prerequisite for GENE90025 — showing progressive technical depth (Clinical Genome Variant Analysis 1→2, Frontiers in Genomics 1→2) within an all-compulsory 125-point specialist core (4×12.5pt, 6×6.25pt, 1×37.5pt).",
      "evidenceLines": [
        "GENE90002 Clinical Genomics, with a result of at least 70%, is a prerequisite for GENE90027 Frontiers in Genomics 1."
      ]
    },
    "G2": {
      "result": "PASS",
      "rationale": "PASS per anchor 'simulations/capstones/live projects with real uncertainty and accountability': the capstone Genomics and Health Internship places every student in a real host organisation with real objectives and practitioner supervision, and core clinical-genomics subjects (e.g. GENE90002) require applying genomic evidence to develop clinical recommendations under case ambiguity rather than recall.",
      "evidenceLines": [
        "This capstone internship subject for the Master of Genomics and Health is designed to provide students a practical experience with organisations related to their interests.",
        "Interpret and apply genetic and genomic reports to develop sound clinical recommendations;"
      ]
    }
  },
  "ambiguities": [
    "C2 vs W3: HLTH90012's Essay 2 (progression on competencies via host feedback) is process-focused reflection that could satisfy C2 Level 3's 'evidence strategy adjustment over time', but is scored under W3 (structured reflection on professional practice, accountability to host) per 'one construct, one home'; C2 resolved to the lower level (2) on the residual ambiguity.",
    "C4: the internship's cross-context application evidence is reserved for W3 by the v4.1 migration note, leaving C4 without core-assessed novel-problem evidence beyond outcome-level claims, so it is scored at 1 rather than 2.",
    "C5: HLTH90011/HLTH90013 (Health Research stream) document primary data collection defended by viva, which would satisfy Level 3, but the course structure names this an optional stream alongside a 'Non-Research stream' — exactly the 'one route among several' the Level 3 anchor excludes — so C5 is scored on the universally compulsory HLTH90014 evidence only (1).",
    "W1: whether HLTH90012's AT4 interview panel ('Subject Coordinator and/or senior staff of the Program') counts as a 'real external audience or practitioner' for Level 3 is ambiguous, since the placement host supervises the internship itself but the assessed interview is run by University Program staff; resolved down to Level 2.",
    "W2: AT4 (HLTH90012 job application/interview) was originally cited as W2's Level-3 constraint-of-practice evidence, but that task is also W1's Level-2 audience evidence; per 'one construct, one home' AT4 belongs to W1 only, and W2 is demoted to Level 2 on the remaining WELF90004/WELF90005 evidence."
  ],
  "notScoreable": [],
  "verified": {
    "adversarial": {
      "reviewed": [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "W1",
        "W2",
        "W3",
        "G1",
        "G2"
      ],
      "date": "2026-08-31"
    },
    "mechanical": true,
    "date": "2026-08-31"
  }
};

export default record;
