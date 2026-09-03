// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "C1": {
    "score": 2,
    "rationale": "Assessed collaborative practice recurs across the core (syndicate assignments/projects in Financial Accounting, Consumer Behaviour, Marketing and others), satisfying level 2 'group projects with individual accountability'. Level 3 is not met: no core assessment documents coordinating work across people AND tools/AI systems (the only AI mention, in Marketing Communications, is elective content about the discipline, not an assessed human–AI division of labour).",
    "evidenceLines": [
      "Syndicate assignment (4 - 5 students per group)",
      "Syndicate project (4 - 5 students per group)",
      "Syndicate project: Report (4 - 5 students in each group)"
    ]
  },
  "C2": {
    "score": 1,
    "rationale": "Reflection/self-assessment appears in a core-subject intended learning outcome ('Heighten their self‐awareness and self‐knowledge', BUSA90480 Leadership, a required subject), but no core unit assesses appraisal of quality against criteria (no peer review, structured critique, portfolio with standards, or marking against exemplars is documented in any core assessment). Level 2 not met; level 3 (documented reliance/override decisions) far out of scope.",
    "evidenceLines": [
      "Heighten their self‐awareness and self‐knowledge"
    ]
  },
  "C3": {
    "score": 1,
    "rationale": "Digital tool operation appears in a core unit ('Analyse and summarise multivariate data clearly using Excel', BUSA90060 Data Analysis), which is the operational level that caps at 1. No core unit jointly addresses AI capabilities AND limitations/ethics with assessment: Managerial Ethics names 'evolving ethical responsibilities associated with new technologies' but teaches no AI capability, and Data Analysis's 'limitations of data analyses' is about statistics, not AI. Level 2/3 not met.",
    "evidenceLines": [
      "Analyse and summarise multivariate data clearly using Excel"
    ]
  },
  "C4": {
    "score": 2,
    "rationale": "A core assessment requires applying methods to novel/unfamiliar problems: the Marketing Research ILO 'translate marketing and management issues into marketing research problems that are suitable for investigation' is enacted in the assessed Syndicate/field project. Level 3 not met — the field project is not documented as self-scoped with a structured progression toward independent learning, so the higher bar (self-scoped capstone or assessed gap-identification) is not evidenced.",
    "evidenceLines": [
      "translate marketing and management issues into marketing research problems that are suitable for investigation."
    ]
  },
  "C5": {
    "score": 2,
    "rationale": "Students design and conduct an inquiry with methodology selection and data collection, assessed: the Marketing Research ILO 'design and implement a survey instrument to conduct primary research' is realised in the required Syndicate/field project generating primary evidence. Level 3 not met — no methodology defence under scrutiny (viva, defence, or staged supervised review) is documented in the assessment.",
    "evidenceLines": [
      "design and implement a survey instrument to conduct primary research."
    ]
  },
  "adaptiveness": 8,
  "W1": {
    "score": 1,
    "rationale": "Core assessments add spoken communication to peers/staff (Marketing 'Syndicate project: Presentation'; Managerial Ethics 'Syndicate presentation'), satisfying level 1. Level 2 not met: no core assessment documents a recognised professional genre or an audience beyond the teaching team (no client brief, consultancy, policy advice, pitch, or external/public audience is evidenced).",
    "evidenceLines": [
      "Syndicate project: Presentation (4 - 5 students in each group)",
      "Syndicate presentation (equivalent to 500 words per individual) (F2F teaching mode)"
    ]
  },
  "W2": {
    "score": 2,
    "rationale": "At least one core assessment reproduces a professional task end to end: the Marketing Research field project 'conduct an actual research project from problem definition through a final report and presentation' produces the artefact a practitioner would produce, and the Marketing Strategy 'Syndicate simulation' is a professional simulation. Level 3 not met: no documented genuine constraint of practice (ambiguous/externally-supplied problem, real resource/time limits, consequential audience, or the profession's own standards) and no explicit assessment spine with such constraints.",
    "evidenceLines": [
      "This project will require students to integrate everything that they have learned to conduct an actual research project from problem definition through a final report and presentation.",
      "Syndicate simulation (4 - 5 students per group)"
    ]
  },
  "W3": {
    "score": 0,
    "rationale": "No work-integrated learning, placement, practicum, internship, community-based project or live-client project appears anywhere in the course structure (grep for placement/practicum/internship/work-integrated/community-based/live-client/fieldwork/clinical returned zero hits). The Marketing Research 'field project' is a student-conducted research project with no documented workplace/community setting, practitioner supervision, or host accountability, so it does not meet level 1.",
    "evidenceLines": []
  },
  "workplace": 3,
  "gates": {
    "G1": {
      "result": "PASS",
      "rationale": "The program documents a coherent specialist marketing core with progressive depth: a required sequence of Marketing Management subjects (Marketing, Marketing Strategy, Marketing Research, Consumer Behaviour) within an eight-subject core, evidenced by the course-structure statement and marketing-specific intended learning outcomes. Content is not generic or interchangeable.",
      "evidenceLines": [
        "The Master of Marketing is a 13 subject program, comprising two initial integrative unit subjects, followed by a core of eight subjects. Six of these subjects/units are General Management subjects and the remainder are Marketing Management subjects."
      ]
    },
    "G2": {
      "result": "PASS",
      "rationale": "Assessments require defended trade-off decisions under uncertainty, not recall: the Marketing Strategy 'Syndicate simulation' is a simulation with real uncertainty and accountability, and the Marketing Communications campaign ILO 'Craft a brand-centric, integrated marketing communications campaign' requires decision-making. Combined with pervasive case/syndicate work, the program is not recall/scripted-only.",
      "evidenceLines": [
        "Syndicate simulation (4 - 5 students per group)",
        "Craft a brand-centric, integrated marketing communications campaign"
      ]
    }
  },
  "ambiguities": [
    "C2: 'Heighten their self‐awareness and self‐knowledge' (BUSA90480 core ILO) is borderline between level 0 and level 1; resolved to 1 only because it is a core-subject outcome naming self-reflection, with no core assessment of appraisal against criteria. If stricted as not 'reflection or self-assessment', C2 would fall to 0.",
    "C4/C5: the Marketing Research field project supports both transfer (C4) and inquiry (C5); distinct evidence lines were used (ILO 1346 for C4, ILO 1349 for C5) to honour one-construct-one-home.",
    "W2/C5: the same field project also evidences authentic task design (W2) via the overview line; a distinct line from the C5 ILO was used.",
    "W3: the Marketing Research 'field project' was considered for WIL but rejected (no workplace/community setting, practitioner supervision, or host accountability documented); resolved down to 0."
  ],
  "notScoreable": [],
  "verified": {
    "adversarial": true,
    "mechanical": true,
    "date": "2026-08-27"
  }
};

export default record;
