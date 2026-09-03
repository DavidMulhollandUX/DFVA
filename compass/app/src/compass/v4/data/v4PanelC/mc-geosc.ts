// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "C1": {
    "score": 2,
    "rationale": "Level 2: two compulsory Core Foundation subjects (GEOL90022, GEOL90054) each assess a graded team presentation, and the Core Advanced alternative GEOL90005 assesses a team presentation with individual per-student marks. Level 3 additionally requires an assessment where the division of work between people and systems is itself assessed — no evidence of any assessed human+tool/AI coordination task, so capped at 2.",
    "evidenceLines": [
      "Team presentation: a 20-minute presentation in a group of 3 people, or equivalent",
      "Team presentation on work in the field: a 20-minute presentation by a 3-person group, or equivalent",
      "Team presentation (5-10 mins of presentation by each student)"
    ]
  },
  "C2": {
    "score": 0,
    "rationale": "Level 0: no core-unit assessment requires appraising the quality of work (own, peer, or tool). GEOL90023's outcomes direct students to evaluate data/results and appraise techniques, not the quality of a piece of work against criteria; no core unit's assessment description shows peer review, structured critique or marking against exemplars.",
    "evidenceLines": [
      "Appraise a range of specialised laboratory and field-based techniques as currently used in the workforce or research laboratory;",
      "Evaluate the results of laboratory or field analysis; and",
      "Recommend a course of action, as if to a client or collaborator, on the basis of analytical results."
    ]
  },
  "C3": {
    "score": 0,
    "rationale": "Level 0: no digital/AI content appears in any core unit's overview or outcomes. The only AI-titled subject in the extract, LAWS90203 Science & AI: Legal & Ethical Challenges, is a Professional Skills elective (not core) and is Not available in 2026.",
    "evidenceLines": [
      "LAWS90203\tScience & AI: Legal & Ethical Challenges\tNot available in 2026\t12.5"
    ]
  },
  "C4": {
    "score": 2,
    "rationale": "Level 2: demoted from a submitted 3 on adversarial verification. The three evidenceLines used to support the submitted level-3 score are Overview or Intended-learning-outcomes text, not Assessment-section text — none is drawn from an assessment description, and an outcome statement alone cannot ground level 3. Level 2 is well-supported without relying on that outcome text: the compulsory, individually assessed capstone GEOL90024 sets a novel/unfamiliar research problem, assessed through a literature survey (concluding with the project Research Questions, 20% of the subject's mark), an individual oral presentation and a 6000-word written report — squarely meeting the C4 level-2 anchor of application to novel or unfamiliar problems / cross-context projects.",
    "evidenceLines": [
      "A literature survey, concluding with the project Research Questions",
      "The Project in Geoscience is a program of supervised research that forms a capstone for the Master of Geoscience degree, allowing students to translate the knowledge and skills gained during the degree into practice.",
      "Formulate one or more research questions that address the gaps in current knowledge, understanding and/or technical capability;"
    ]
  },
  "C5": {
    "score": 2,
    "rationale": "Level 2: the compulsory capstone GEOL90024 requires students to design and conduct an inquiry — methodology selection (Design a program of investigation) and data collection/analysis (Record, analyse and interpret the results) — assessed through a written report and presentation. Level 3 needs the methodology defended under scrutiny (viva, defence, or staged supervised review); the assessment lists only An individual oral presentation with no documented framing as a defence, so this is ambiguous between 2 and 3 and is resolved to the lower level.",
    "evidenceLines": [
      "Design a program of investigation that will address the research questions within the available timeframe and given the available resources;",
      "Record, analyse and interpret the results of this investigation;",
      "An individual oral presentation",
      "A written report, in the style of a technical report or journal article"
    ]
  },
  "adaptiveness": 6,
  "W1": {
    "score": 2,
    "rationale": "Level 2: the capstone requires students to communicate as if to an industry client, collaborator or academic researcher, with the written report explicitly in the style of a technical report or journal article — a recognised professional genre. Level 3 requires delivery to, or judgement by, a REAL external audience/practitioner; the handbook frames the audience only as simulated (as if to), so this is capped at 2.",
    "evidenceLines": [
      "They will communicate their research via written reports and an oral presentation, justifying their conclusions and recommendations as if to an industry client, collaborator or academic researcher.",
      "A written report, in the style of a technical report or journal article"
    ]
  },
  "W2": {
    "score": 2,
    "rationale": "Level 2: GEOL90024 reproduces a professional task end to end — students plan and carry out research into an industry-relevant and/or academic problem and produce the report a practitioner would produce. Level 3 needs both a scaffolded spine (present, via GEOL90023) AND a genuine constraint of practice; the only candidate constraint language (within the available timeframe and given the available resources) reads as generic project scoping rather than a documented practice constraint, so this is ambiguous and resolved to the lower level.",
    "evidenceLines": [
      "Students will plan and carry out research into an industry-relevant and/or academic problem.",
      "Design a program of investigation that will address the research questions within the available timeframe and given the available resources;",
      "This subject will provide Masters-level training in some of the fundamental skills that will benefit the subsequent capstone projects in the Master of Geoscience."
    ]
  },
  "W3": {
    "score": 1,
    "rationale": "Level 1: the only work-integrated-learning unit in the extract, SCIE90017 Science and Technology Internship, sits in the Professional Skills elective list, not among the compulsory Core Foundation, Core Advanced or Capstone subjects. No core unit places students in a supervised, assessed workplace or professional-community setting.",
    "evidenceLines": [
      "SCIE90017\tScience and Technology Internship",
      "During the two-year degree program, students must complete 25-50 points from the following:"
    ]
  },
  "workplace": 5,
  "gates": {
    "G1": {
      "result": "PASS",
      "rationale": "Coherent specialist core with progressive depth: four named core foundation subjects (three fixed, one from a two-subject choice), a Core Advanced subject choice, and a compulsory capstone; the first-year core subjects are documented as explicitly building toward the second-year advanced coursework and research project.",
      "evidenceLines": [
        "Students must complete four core foundation subjects, including all of:",
        "Students must complete one of the following Core Advanced subjects:",
        "This subject is designed for students in the first year of their Master of Geoscience degree. In combination with the other first year core subjects, it allows all students to build the skills and understanding needed for advanced coursework subjects and research projects in the second year of the degree."
      ]
    },
    "G2": {
      "result": "PASS",
      "rationale": "The compulsory capstone requires students to formulate their own research questions and design their own investigation under real resource/time limits, with individually accountable, supervised assessment — a live project with genuine uncertainty, consistent with the gate's D4>=2 standard.",
      "evidenceLines": [
        "Formulate one or more research questions that address the gaps in current knowledge, understanding and/or technical capability;",
        "Design a program of investigation that will address the research questions within the available timeframe and given the available resources;",
        "Recommend a course of action, as if to a client or collaborator, on the basis of analytical results."
      ]
    }
  },
  "ambiguities": [
    "C4 demoted from 3 to 2 on adversarial verification: the submitted level-3 evidence was Overview/ILO text, not assessment-page evidence; resolved to level 2 on GEOL90024's compulsory literature-survey/report assessment.",
    "C5: methodology defended under scrutiny (level 3) vs. a plain oral presentation with no documented defence framing — resolved to the lower level 2.",
    "W2: generic project-scoping language ('within the available timeframe and given the available resources') vs. a documented genuine constraint of practice — resolved to the lower level 2."
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
