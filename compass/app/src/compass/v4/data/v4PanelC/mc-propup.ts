// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "C1": {
    "score": 2,
    "rationale": "Level 2 anchor met via ACCT90041's and FNCE90060's assessed group assignments; level 3's requirement to also coordinate work across people AND tools/AI systems has no supporting evidence anywhere in the extract, so the score stays at 2 (lower-level rule).",
    "evidenceLines": [
      "Group assignment (5000 words, in groups of 3-4 students)",
      "Group (normally 3-4 students per group) homework assignments to be assessed online via the LMS"
    ]
  },
  "C2": {
    "score": 0,
    "rationale": "Level 0 anchor matches: the complete assessment schemes of all seven captured core subjects are exams, tests, participation marks and standard assignments — none require appraisal of the quality of one's own, peers', or a tool's work.",
    "evidenceLines": [
      "In-class participation",
      "Individual written assignment",
      "End-of-semester examination",
      "One examination",
      "One assignment"
    ]
  },
  "C3": {
    "score": 1,
    "rationale": "Level 1 anchor matches: ABPL90274 lists IT/Excel/electronic-information skills as generic tool-operation content; no core unit addresses AI capabilities and limitations/ethics together, so per the migration note this caps at level 1.",
    "evidenceLines": [
      "IT skills: use of appropriate word processing, data and graphics packages for report preparation, excel skills in preparing valuation and introduction to electronic information sources (WWW, on-line, CD-ROM);"
    ]
  },
  "C4": {
    "score": 1,
    "rationale": "Level 1 anchor matches: transfer/problem-solving capability is claimed in program-level outcomes but no assessed item in the captured core subjects requires application to a novel or unfamiliar problem; the outcome claim alone (R2) does not support a higher score.",
    "evidenceLines": [
      "Have the ability to research, analyse, evaluate, discuss and develop solutions to a wide range of contemporary and emerging challenges facing the property industry.",
      "Ability to plan and execute a substantial research-based project, capstone experience and/or piece of scholarship."
    ]
  },
  "C5": {
    "score": 2,
    "rationale": "Level 2 anchor supported by the compulsory 'MSD Minor Thesis Part 1/2' and required-choice 'Research Thesis - Property'/'Industry Based Research - Property' in the course-structure table; level 3's 'defended under scrutiny' requirement could not be confirmed since those subjects' own pages were not captured, so the score stays at 2.",
    "evidenceLines": [
      "MSD Minor Thesis Part 1",
      "MSD Minor Thesis Part 2",
      "And one of the following subjects:",
      "Research Thesis - Property",
      "Industry Based Research - Property"
    ]
  },
  "adaptiveness": 6,
  "W1": {
    "score": 1,
    "rationale": "Demoted from 2 to 1 on adversarial review. Level 2 requires assessed communication in a recognised professional genre OR to an audience beyond the teaching team, judged against practice criteria. The only cited assessed item, ABPL90274's 'individual presentation' (5 min, 10%, Week 10), has no stated audience in the assessment table. The 'client presentation of the report' framing used to lift this to level 2 comes only from the subject's Generic Skills section — outcome/graduate-attribute language, which R2 bars from counting toward anything above level 1, and R4 bars scoring up on an unverified descriptive label. A full-text search of the extract for 'client' returns exactly two hits: a program-level outcome claim and this same generic-skills sentence — no assessed task anywhere names a client, practitioner or external audience. No other of the seven captured core subjects shows any professional-genre or externally-judged communication task either. This is a level 1 case (presentation to peers/staff, no professional genre, no audience beyond the teaching team); the scoring-direction rule requires the lower level on ambiguity.",
    "evidenceLines": [
      "Communication skills: written and graphic skills developed through preparation of a market analysis and valuation report and verbal communication skills developed through client presentation of the report and tutorial discussions;",
      "individual presentation",
      "5 minutes (total)"
    ]
  },
  "W2": {
    "score": 2,
    "rationale": "Level 2 anchor supported by ABPL90274's valuation-report task and ABPL90029's assessed property inspection report — both real property-industry artefacts. Level 3's 'assessment spine' criterion could not be confirmed because the specialist Core Subjects (250 points) were not captured, so the score stays at 2.",
    "evidenceLines": [
      "written and graphic skills developed through preparation of a market analysis and valuation report",
      "Assignment 2 : Property inspection report (individual)",
      "1500 words (equivalent)"
    ]
  },
  "W3": {
    "score": 1,
    "rationale": "Level 1 anchor best fits: the course overview states professional experience 'can be an integral part of the program' without confirming a compulsory, assessed, practitioner-supervised placement; no WIL/placement subject is named in the extract, so the score is 1.",
    "evidenceLines": [
      "Professional experience can be an integral part of the program, a unique practical experience enriching the connection to the related fields of work."
    ]
  },
  "workplace": 4,
  "gates": {
    "G1": {
      "result": "PASS",
      "rationale": "The program is a professionally accredited double degree (RICS, PIA, API) with a staged structure — a compulsory foundation block followed by a 250-point specialist core spanning property law, valuation, development, planning law/theory, strategic planning, research methods and a required thesis component.",
      "evidenceLines": [
        "The Master of Property/ Master of Urban Planning is a double degree, that will allow students to complete two professionally accredited graduate programs in a reduced time frame.",
        "Royal Institution of Chartered Surveyors",
        "Planning Institute of Australia (PIA)",
        "Australian Property Institute (API)",
        "350 points core subjects in Urban Planning and Property",
        "Core Subjects (250 points)"
      ]
    },
    "G2": {
      "result": "FAIL",
      "rationale": "Assessment in the captured core subjects is dominated by exams, tests and standard assignments; no item is documented as a simulation, capstone or live project with real uncertainty and accountability. Limited to captured subjects — the specialist core most likely to carry this evidence was not captured.",
      "evidenceLines": [
        "the subject considers the important decisions faced by firms (such as investment, financing and dividend policy) and by investors (the composition of their optimal portfolio of stocks).",
        "Final examination",
        "2 hours"
      ]
    }
  },
  "ambiguities": [
    "C1: collaboration is assessed in only 2 of 7 available core subjects (ACCT90041, FNCE90060), and no evidence anywhere documents assessed coordination between people AND tools/AI systems; scored 2, not 3.",
    "C5: the compulsory 'MSD Minor Thesis Part 1/2' and required-choice 'Research Thesis - Property'/'Industry Based Research - Property' are documented as compulsory core (course-structure table) evidencing a required primary-evidence project, but their own subject/assessment pages were not in this extract, so 'defended under scrutiny' (level 3) could not be confirmed; resolved to level 2.",
    "W1: demoted on adversarial review from level 2 to level 1 — the only professional-genre/client-audience evidence traces to generic-skills outcome language, not an assessed task with a stated audience; see W1 rationale.",
    "W2: professional-task-like assessment (valuation report, property inspection report) appears in only 2 of 7 available core subjects; whether such tasks form the program's full assessment 'spine' (level 3) could not be confirmed because the specialist Core Subjects (250 points) were not captured; resolved to level 2.",
    "W3: 'Professional experience can be an integral part of the program' does not state whether this is a compulsory assessed placement or an optional/informal activity; resolved to the lower level 1 rather than level 2.",
    "Structural coverage gap affecting C4, C5, W2, W3 and G2: this extract captures the course overview/outcomes/structure pages, the 7 first-year bridging subjects required only of non-cognate entrants (ABPL90290, ABPL90274, ABPL90275, ACCT90041, ABPL90029, FNCE90060, ECON90015), and 23 elective subjects. It does NOT capture any of the ~20 subjects listed under 'Core Subjects (250 points)' — the specialist property/planning core compulsory for every student regardless of background (e.g. Property Law, Property Development, Planning Law & Statutory Planning, Planning Theory and History, Statutory Valuation, Climate Change & Sustainability Planning, Advanced Property Analysis, Strategic Plan Making, International Real Estate Economics, Property Research and Analysis, The Economies of Cities and Regions, Analytical Methods, Land and Property Economics, Urban Coding and Design, Participatory Planning, Property Securitisation, Corporate Real Estate Management, Property Investment and Finance, MSD Minor Thesis Parts 1-2, Research Thesis - Property, Industry Based Research - Property). Every score above rests on the bridging block and program-level outcome statements only, and should be read as a floor bound by evidence availability, not a ceiling on what the actual specialist core documents."
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
      "date": "2026-08-30"
    },
    "mechanical": true,
    "date": "2026-08-30"
  }
};

export default record;
