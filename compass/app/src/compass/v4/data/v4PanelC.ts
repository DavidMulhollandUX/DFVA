// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
export interface V4ItemResult {
  score: number;
  rationale: string;
  evidenceLines: string[];
}

export interface V4GateResult {
  result: "PASS" | "FAIL";
  rationale: string;
  evidenceLines: string[];
}

export interface V4PanelC {
  instrument: string;
  C1: V4ItemResult;
  C2: V4ItemResult;
  C3: V4ItemResult;
  C4: V4ItemResult;
  C5: V4ItemResult;
  adaptiveness: number;
  gates: { G1: V4GateResult; G2: V4GateResult };
  ambiguities: string[];
  notScoreable: string[];
  verified?: { adversarial: boolean; mechanical: boolean; date: string };
}

export const V4_PANEL_C: Record<string, V4PanelC> = {
  "244cw": {
    "instrument": "4.0-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor met: core units assess collaborative practice — POPH90274 assesses two group presentations plus mentor-marked group participation, and POPH90218 assesses a five-student team presentation. Level 3 denied: collaborative assessment recurs across the core, but no assessment documents coordinating work across people AND tools/AI systems.",
      "evidenceLines": [
        "Group presentation 1: 4-5 students per group. Students will be assessed as a group. 8 minutes + 5 minutes Q&A",
        "8-minute Team Presentation (approximately 5 students per group) plus 3-minute Q&A: Systems Mapping",
        "Accomplish creative and authentic solutions to real-world challenges for public health issues by working in an effective and diverse team;",
        "Demonstrate a capacity to work collaboratively within an inter-disciplinary team"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor met: criterion-referenced appraisal is assessed in the core — POPH90231 assesses critical appraisal of published research and a criterion-referenced self-reflection against course objectives; POPH90218 assesses weekly peer-feedback and a reflective-leadership piece. Level 3 denied: no assessment requires documenting or justifying reliance decisions, and no AI-output judgement is assessed anywhere.",
      "evidenceLines": [
        "Critically appraise the findings, strengths and weaknesses of published qualitative research in public health.",
        "A critical reflection on achievement of course objectives through classroom and assessment activities",
        "Weekly Tutorial Participation and Peer-Feedback",
        "Individual assessment - Interview Video Podcast: Reflective Leadership"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor met and not exceeded: digital-tool content in the core is tool operation (assessed Stata practicals in Biostatistics). Level 2 denied: no core unit addresses AI capabilities and limitations/ethics; no AI content appears anywhere in the scraped core. Consistent with the v3.1 D5 = 1 finding on independent evidence.",
      "evidenceLines": [
        "Tutorial and Stata practical oral assessment",
        "Perform simple statistical analyses using appropriate software",
        "Using statistical software."
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 anchor met: core assessment requires application to novel problems — POPH90274's health program proposal (50%) applies skills to case-study scenarios. Level 3 denied under R2 and the ambiguity rule: the required capstone documents strong independent-learning structure on two of three routes (Professional Practice's hurdle Learning Plan; the self-scoped Research Project with hurdle progress report), but the Public Health in Practice route's assessment evidence is absent from the extract, and the universal course-level ILO is an outcome statement, which R2 does not accept for level 3.",
      "evidenceLines": [
        "Health program proposal document",
        "Learning Plan - between 500-750 words",
        "Solve practical problems whilst working with potentially unstructured and incomplete information",
        "Design and manage a detailed investigation of a public health issue in a substantial project, with a high level of personal autonomy and accountability;"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor met: inquiry design with methodology selection and data-collection planning is assessed in the core (POPH90231's research proposal, 60%, whose ILO names sampling, recruitment and data-collection tools), and conduct with defence is assessed in the capstone research route (hurdle final report, oral presentation with questions). Level 3 denied by the anchor's own universality clause: a primary-evidence project is one capstone route among several, not required of all students — the same route-dependence that held D7 at 2 in v3.1, now encoded in the anchor.",
      "evidenceLines": [
        "A research proposal",
        "Formulate a qualitative research design to answer a public health question, including; selecting the population and sample, recruitment methods, data collection tools and approach to analyses.",
        "A Final report",
        "An oral presentation (10 minutes presentation and 10 minutes Q&A)"
      ]
    },
    "adaptiveness": 9,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "Coherent specialist core with staged depth: 75 compulsory credit points across six named public-health subjects plus a required 25-point capstone; methods subjects document early-sequence staging.",
        "evidenceLines": [
          "75 credit points of compulsory subjects",
          "This subject is a core subject within the Master of Public Health, the Master of Epidemiology, the Master of Science (Epidemiology) and the Master of Biostatistics. Students should enrol in this subject early in their program of study."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessments require defended trade-offs: a timed ethical-dilemma analysis exam (POPH90218) and prioritisation/selection of intervention strategies assessed through the program proposal (POPH90274); capstone routes add real uncertainty with accountability.",
        "evidenceLines": [
          "Exam: Ethical Dilemma Analysis",
          "Prioritise and select strategies and interventions to address health needs"
        ]
      }
    },
    "ambiguities": [
      "C4: straddled 2/3. The required capstone evidences independent learning on two of three routes (hurdle Learning Plan; self-scoped research project), but the Public Health in Practice route's assessment page was not in the extract and the universal course ILO is outcomes-only (R2). Resolved down per the ambiguity rule.",
      "C5: the wide gap between level 1 ('introductory methods unit') and level 2 ('design and conduct... with data collection') is flagged for the CVI panel — this program's three assessed methods subjects far exceed level 1 while distributing design (core) and conduct (capstone) across components. Resolved at 2 via level 3's explicit 'REQUIRED (not one route among several)' clause, which implies level 2 tolerates route-dependence."
    ],
    "notScoreable": [
      "POPH90227 (Public Health in Practice capstone) assessment page not captured in the extract; bears only on the C4 level-3 judgement, which was resolved down anyway."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-13"
    }
  }
};

export const v4PanelCByCode = (code: string): V4PanelC | undefined =>
  V4_PANEL_C[code.toLowerCase()];
