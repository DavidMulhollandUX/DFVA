// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "C1": {
    "score": 2,
    "rationale": "Level 2 met via the compulsory INTS90007 assessed group presentation; no evidence anywhere of assessed human+tool/AI coordination, so Level 3 not reached.",
    "evidenceLines": [
      "A group presentation; each student is expected to participate in a group effort to present on a selected topic"
    ]
  },
  "C2": {
    "score": 1,
    "rationale": "CHIN90008 ILOs/generic skills describe peer appraisal but its assessment table is missing from the extract (page-capture mismatch); per R2/R3 cannot confirm assessed criterion-referenced appraisal, so taken to Level 1.",
    "evidenceLines": [
      "Effectively assess the strengths and weaknesses of peer papers by applying students' advanced knowledge of contemporary Chinese Studies and provide constructive suggestions for improvement",
      "Work effectively and productively in a group situation through peer review processes"
    ]
  },
  "C3": {
    "score": 1,
    "rationale": "AI content (ASIA20008 Digital Asia) exists only within the Foundational elective pool, not any compulsory unit — Level 1.",
    "evidenceLines": [
      "ASIA20008\tDigital Asia",
      "It investigates digital disruptions and opportunities arising from the engagement in Asia with social media, platform capitalism, virtual and augmented reality, artificial intelligence and the emerging metaverse and it explores the profound relationships between these innovations and civil society, politics, the economy and creative industries."
    ]
  },
  "C4": {
    "score": 1,
    "rationale": "Demoted from Level 2 on adversarial review: the Level-2 rationale rested on an evidence line drawn from the Capstone Stream 2 Minor Thesis purpose text (CHIN90009/CHIN90010), not from CHIN90011's own research-proposal task — an evidence misattribution across subjects. The remaining CHIN90011 lines are generic outcome statements about completing 'a research proposal' and do not establish that the proposal targets a novel/unfamiliar problem. This is also inconsistent with C5, which explicitly discounts CHIN90011 as evidence because it is required for only two of three capstone streams and resolves down to Level 1 on that basis — the same discount was not applied here originally. Per the instrument's ambiguity-resolves-down rule, taken to Level 1.",
    "evidenceLines": [
      "Identify appropriate research strategies when undertaking social science research",
      "Complete a fully developed research proposal for a potential thesis or a project which is grounded in their understanding of the complexities of social science research."
    ]
  },
  "C5": {
    "score": 1,
    "rationale": "CHIN90011 provides introductory methods training/proposal (Level 1), required for only two of three capstone streams; conducted primary inquiry with data collection exists only in the optional Thesis stream, so Level 2 not confirmed program-wide; Level 3 explicitly barred as 'one route among several'.",
    "evidenceLines": [
      "Articulate the theoretical, methodological, resource and ethical considerations of relevance in designing a social science research project",
      "A research proposal",
      "This subject involves completion of a supervised thesis of 12,000 words, embodying the results of the student's own research. The thesis is to be submitted at the end of the second semester of enrolment and must be completed over two consecutive semesters."
    ]
  },
  "adaptiveness": 6,
  "W1": {
    "score": 1,
    "rationale": "Compulsory INTS90007 presentation has no audience beyond teaching team (Level 1). CHIN90008's professional-genre outputs (policy recommendations, reports) would support Level 2 but its assessment table is missing from the extract; resolved down.",
    "evidenceLines": [
      "A group presentation; each student is expected to participate in a group effort to present on a selected topic",
      "This capstone subject is practice-based. Students will conceive and complete a real-life practice-based project related to China or other Chinese-speaking regions and countries, under the supervision of the subject coordinator. Outputs could include a research paper or 'state of the field' reports, testimonies, or policy recommendations to government agencies or, non-government organisations."
    ]
  },
  "W2": {
    "score": 1,
    "rationale": "Compulsory subjects are academic essay/quiz assessment (Level 0/1). CHIN90008's real-life, practitioner-artefact project would support Level 2 but its assessment criteria are missing from the extract and it is an optional stream; resolved down.",
    "evidenceLines": [
      "Final paper",
      "This capstone subject is practice-based. Students will conceive and complete a real-life practice-based project related to China or other Chinese-speaking regions and countries, under the supervision of the subject coordinator. Outputs could include a research paper or 'state of the field' reports, testimonies, or policy recommendations to government agencies or, non-government organisations."
    ]
  },
  "W3": {
    "score": 1,
    "rationale": "CHIN90007 is exactly the Level 1 anchor's named case: an optional internship, one of three mutually exclusive capstone streams.",
    "evidenceLines": [
      "Students must complete one of the three available Capstone streams for this degree."
    ]
  },
  "workplace": 3,
  "gates": {
    "G1": {
      "result": "FAIL",
      "rationale": "Only 25 of 200 points compulsory; remainder is a broad cross-disciplinary elective pool plus a chosen capstone stream — no coherent specialist core, accredited sequence, or prerequisite chain documented.",
      "evidenceLines": [
        "Compulsory subjects (25 points)",
        "ASIA90017\tContemporary China",
        "INTS90007\tRising China in the Globalised World",
        "Elective Subjects (minimum 75 points up to a maximum of 100 points)"
      ]
    },
    "G2": {
      "result": "FAIL",
      "rationale": "Captured compulsory-subject assessment is conventional essay/quiz/presentation work with no documented defended trade-off decisions; the capstone streams that might carry this evidence have no assessment detail in the extract, so PASS cannot be substantiated.",
      "evidenceLines": [
        "Final paper",
        "This capstone subject is practice-based. Students will conceive and complete a real-life practice-based project related to China or other Chinese-speaking regions and countries, under the supervision of the subject coordinator."
      ]
    }
  },
  "ambiguities": [
    "C2/W1/W2: CHIN90008 assessment page in the extract contains unrelated content (page-capture mismatch), so items depending on its assessed criteria were resolved to the lower level.",
    "C4/C5: the self-scoped Minor Thesis is only one of three optional capstone streams; C4 was demoted on review after its Level-2 rationale was found to rest on evidence drawn from that Thesis subject rather than from CHIN90011 itself. Both items now resolve to Level 1.",
    "W3: no dedicated CHIN90007 subject page in the extract beyond the course-structure 'Purpose' statement.",
    "The page captured for the entry-3/course-structure URL contains an unrelated subject's content; no evidence drawn from it."
  ],
  "notScoreable": [
    "CHIN90008 Contemporary Chinese Studies Project — assessment task/criteria (page-capture mismatch)",
    "CHIN90007 Contemporary Chinese Studies Internship — subject-level ILOs/assessment (no dedicated page in extract)"
  ],
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
