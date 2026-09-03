// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "C1": {
    "score": 1,
    "rationale": "Level 2 (\"At least one core assessment includes... interprofessional activity\"): CREA90004 assesses a group presentation and lists teamwork as a learning outcome. Level 3 additionally requires coordinating work across people AND tools/AI systems; the extract has no mention of AI or digital-tool coordination anywhere, so level 3 is not reached. Demoted to 1 on review: the extract never documents that the collaborative/teamwork process itself is what's graded (no individual-accountability, client/stakeholder, or interprofessional criteria stated) — the paired teamwork evidence is an ILO only, which caps at level 1 on its own, and stacking an outcome-only claim onto a bare group-format task is a thin basis for level 2.",
    "evidenceLines": [
      "10-minute group presentation",
      "identify and implement the principles and values of team work in different contexts;"
    ]
  },
  "C2": {
    "score": 2,
    "rationale": "Level 2 (\"criterion-referenced appraisal of quality... structured critique\"): CREA90009 assesses a written report evaluating the quality of two research articles against assessment criteria. Level 3 requires documenting/justifying reliance decisions on a tool, source or collaborator (including AI); no such assessment appears anywhere in the extract.",
    "evidenceLines": [
      "Written report on two research articles using appropriate assessment criteria .",
      "Assessment will include: a written report, evaluating the quality of two research articles using appropriate assessment criteria, a written research proposal for a specified creative arts program as well as completing a modified research ethics application for the proposed project."
    ]
  },
  "C3": {
    "score": 0,
    "rationale": "Level 0 (\"No digital/AI content in any core unit or program-level outcome\"): the only related text in the whole extract is a course-level generic-skills bullet naming \"new technologies\" in the abstract; it never names AI, is not tied to any core unit, and is not assessed anywhere, so it does not clear even level 1's tool-operation bar.",
    "evidenceLines": [
      "where appropriate, advanced working skills in the application of computer systems and software and a receptiveness to the opportunities offered by new technologies."
    ]
  },
  "C4": {
    "score": 2,
    "rationale": "Level 2 (\"application to novel or unfamiliar problems... cross-context projects\"): core assessment requires designing a creative-arts-therapy program/proposal for each of several distinct populations and settings (education, medical/clinical, community), each a discrete assessed core unit. Level 3 requires a self-scoped capstone or documented gap-identification-plus-plan; the program's capstone language (CREA90013/CREA90018) is built entirely around the supervised practical placement, which the v4.1 migration note assigns to W3, not C4, so it is excluded here (see ambiguities).",
    "evidenceLines": [
      "Written creative arts therapies program for a group or individual in an education context.",
      "Develop a written proposal on the potential benefits of creative arts therapies in a population or clinical context.",
      "Written Assignment - Proposal for a creative arts program for a group or individual in a community context."
    ]
  },
  "C5": {
    "score": 1,
    "rationale": "Level 1 (\"introductory methods unit; literature-review assessment\"): the three research subjects assess literature evaluation, a research proposal, an ethics application, and analysis of data, but no assessed task requires students to actually conduct their own data collection. Level 2 requires the inquiry to be conducted with data collection, assessed; CREA90014's research project is only \"planned\" (a design proposal), and CREA90019 analyses \"supplied\" interview data rather than data the student collected, so the conduct/data-collection component is absent (see ambiguities).",
    "evidenceLines": [
      "Students will devise a creative arts therapy theory or practice research project that generates objectivist data; systematically review and critique literature that identifies research needs and knowledge gaps; apply an understanding of objectivist research through appropriate research design and plan a minor research project in creative arts therapy.",
      "Research design proposal",
      "Written analysis of supplied interview data"
    ]
  },
  "adaptiveness": 6,
  "W1": {
    "score": 1,
    "rationale": "Level 2 (\"a recognised professional genre or an audience beyond the teaching team... judged against criteria drawn from professional practice\"): placement subjects generate written progress reports to, and a written report from, the industry partner, and CREA90013 assesses a presentation on care coordination. Level 3 requires the work to be judged by a real external practitioner with professional conduct explicitly among the assessed criteria; the same evidence states assessment is conducted by the subject coordinator, so the external report informs rather than judges the grade (see ambiguities). Demoted to 1 on review: the audience/genre for the \"5-minute presentation: Care coordination\" is never documented in the extract (peers/staff vs. a real external audience is unstated), and the cited industry-partner written report is produced BY the partner, not by the student, so it is not a student communication artefact and does not satisfy the W1 construct. Level 1's anchor is at least as well-supported by the text.",
    "evidenceLines": [
      "The placement industry partner will provide a written report on conclusion to the placement coordinator. All assessment is conducted by the subject coordinator.",
      "5-minute presentation: Care coordination."
    ]
  },
  "W2": {
    "score": 2,
    "rationale": "Level 2 (\"reproduces a professional task end to end... producing the artefact a practitioner would produce, judged against criteria drawn from practice\"): assessed artefacts include a portfolio of professional practice documents and a case-study report, matching the format a creative arts therapist actually produces. Level 3 requires this to be the program's assessment spine AND carry a genuine constraint of practice; the strongest constraint evidence (real external-partner-supplied objectives, accreditation-hour placements) is the same real-workplace evidence homed in W3 under the \"one construct, one home\" rule, so it is not counted twice here (see ambiguities).",
    "evidenceLines": [
      "construct professional documentation highlighting key observations of creative arts therapy practice using recommended guidelines;",
      "Written portfolio of professional practice documents (drawing on simulated placement program)",
      "Creative Arts Therapy Case Study Report"
    ]
  },
  "W3": {
    "score": 3,
    "rationale": "Level 3 (\"a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection\"): CREA90008, CREA90013 and CREA90018 are each required (non-simulated) core placements of 160 accreditation hours with a pass/fail hurdle, supervised by a qualified professional and monitored by a placement coordinator with site visits and a written report to the host, plus an assessed reflective piece. This forms a required sequence of real, supervised, assessed placements across the core, satisfying level 3 (CREA90004's placement is explicitly simulated and is excluded per the instrument's rule that simulation scores in W2, not W3).",
    "evidenceLines": [
      "Students are required to complete a supervised practical placement (160 accreditation hours) and will work across a range of tasks relevant to the external partner's objectives in discussion with a qualified professional and the subject coordinator.",
      "Hurdle requirement: Students must pass this assessment to pass the subject.",
      "Reflective Piece (Based on Industry Placement)",
      "The placement coordinator will monitor the student's progress during the placement which may involve site visits, discussions with the industry partner, verbal and/or written progress reports."
    ]
  },
  "workplace": 6,
  "gates": {
    "G1": {
      "result": "PASS",
      "rationale": "The program documents a coherent, accredited specialist core: 150 of 200 points are compulsory, the remaining 50 points are compulsory to one of two named specialisations, and the course is accredited by three named professional bodies, satisfying the 'accredited sequence' PASS condition.",
      "evidenceLines": [
        "Australia, New Zealand and Asian Creative Arts Therapies Association (ANZACATA)",
        "150 points of compulsory subjects",
        "50 points of subjects compulsory to one of the following specialisations:"
      ]
    },
    "G2": {
      "result": "PASS",
      "rationale": "Core assessment requires defended decisions under real accountability: CREA90012 requires an interactive oral defence of a written proposal, and the core placement subjects place students in real settings working to an external partner's own objectives under practitioner supervision, satisfying the 'live projects with real uncertainty and accountability' PASS condition.",
      "evidenceLines": [
        "Interactive oral assessment (25 minutes total) in response to the written proposal developed in the previous assignment.",
        "Students are required to complete a supervised practical placement (160 accreditation hours) and will work across a range of tasks relevant to the external partner's objectives in discussion with a qualified professional and the subject coordinator."
      ]
    }
  },
  "ambiguities": [
    "C4: the capstone subjects (CREA90013, CREA90018) use 'independently designing and implementing a creative arts therapies program' language matching C4 level 3's self-scoped-capstone anchor, but the capstone is structurally the supervised practical placement (160-hour hurdle), which the v4.1 migration note assigns to W3 rather than C4 (one construct, one home). Resolved: C4 held at 2 on non-placement cross-context design evidence; the capstone-placement evidence is scored in W3 instead.",
    "C5: the research subjects (CREA90009/14/19) assess methodology selection and a research-design proposal, gesturing toward level 2's 'design and conduct... with data collection,' but no assessed task shows the student actually collecting primary data (CREA90014's project is only planned; CREA90019 analyses 'supplied' interview data). Resolved down to C5 = 1.",
    "W1: the placement subjects' industry-partner written report (CREA90013) gestures toward level 3's 'judged by a real external audience or practitioner,' but the same evidence states 'All assessment is conducted by the subject coordinator,' so the external party informs rather than judges the grade, and no explicit professional-conduct assessment criterion is stated. Verified review found the level-2 basis itself thin (see W1 rationale); resolved down to W1 = 1.",
    "W2: the recurring program-design and placement artefacts (CREA90004, 90007, 90008, 90012, 90013, 90017, 90018) span nearly every program stage, gesturing toward level 3's assessment-spine-plus-genuine-constraint anchor, but the strongest constraint evidence (real external-partner objectives, accreditation-hour placements) is the same real-workplace evidence homed in W3 under the one-construct-one-home rule. Resolved down to W2 = 2.",
    "C1: the '10-minute group presentation' (CREA90004) gestures toward level 2's interprofessional/teamwork-assessed anchor via a paired teamwork ILO, but verified review found the extract never documents that the collaborative process itself is graded (no individual-accountability, client/stakeholder, or interprofessional criteria stated) — an outcome-only claim stacked on a bare group-format task is a thin basis for level 2. Resolved down to C1 = 1."
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
    "date": "2026-08-29"
  }
};

export default record;
