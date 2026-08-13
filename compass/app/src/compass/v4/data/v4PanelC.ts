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
      "rationale": "Two compulsory subjects assess collaborative work: POPH90274 (two group presentations and mentor-marked group participation) and POPH90218 (a team presentation of approximately five students). This satisfies the level 2 anchor. The level 3 anchor additionally requires at least one assessment in which work is coordinated across people and tools or AI systems; no such assessment is documented, so level 3 is not awarded.",
      "evidenceLines": [
        "Group presentation 1: 4-5 students per group. Students will be assessed as a group. 8 minutes + 5 minutes Q&A",
        "8-minute Team Presentation (approximately 5 students per group) plus 3-minute Q&A: Systems Mapping",
        "Accomplish creative and authentic solutions to real-world challenges for public health issues by working in an effective and diverse team;",
        "Demonstrate a capacity to work collaboratively within an inter-disciplinary team"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Criterion-referenced appraisal is assessed in the compulsory core: POPH90231 assesses critical appraisal of published research and a reflection against course objectives, and POPH90218 assesses weekly peer feedback and a reflective assessment. This satisfies the level 2 anchor. The level 3 anchor requires an assessment in which students document and justify decisions to rely on or override a tool, source or collaborator; no assessment of this kind, and no assessed judgement of AI output, is documented.",
      "evidenceLines": [
        "Critically appraise the findings, strengths and weaknesses of published qualitative research in public health.",
        "A critical reflection on achievement of course objectives through classroom and assessment activities",
        "Weekly Tutorial Participation and Peer-Feedback",
        "Individual assessment - Interview Video Podcast: Reflective Leadership"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "The digital content assessed in the compulsory core is the operation of statistical software (assessed Stata practical work in POPH90013). This corresponds to the level 1 anchor. The level 2 anchor requires core units to address AI capabilities together with limitations or ethics; no AI content of any kind is documented in the core. The result is consistent with the v3.1 finding for the corresponding item (D5 = 1), reached on separate evidence.",
      "evidenceLines": [
        "Tutorial and Stata practical oral assessment",
        "Perform simple statistical analyses using appropriate software",
        "Using statistical software."
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "The level 2 anchor is satisfied in the core: the POPH90274 program proposal (50% of assessment) requires application of program-design methods to case-study scenarios. The level 3 anchor was considered but not awarded. Two of the three capstone routes document assessed independent-learning structure (a hurdle learning plan in Professional Practice; a supervised, self-scoped project in the Research Project); the assessment detail for the third route was not available in the extract, and rule R2 does not permit the course-level outcome statement to substitute for assessment evidence.",
      "evidenceLines": [
        "Health program proposal document",
        "Learning Plan - between 500-750 words",
        "Solve practical problems whilst working with potentially unstructured and incomplete information",
        "Design and manage a detailed investigation of a public health issue in a substantial project, with a high level of personal autonomy and accountability;"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Inquiry design is assessed in the core: the POPH90231 research proposal (60% of assessment) requires a design covering sampling, recruitment and data-collection methods. Conduct and defence of primary research are assessed in the Research Project capstone (a final report with a pass hurdle and an examined oral presentation). The level 3 anchor requires that a primary-evidence project be a requirement of the program rather than one option among several; the Research Project is one of three capstone routes, so level 3 is not awarded. The same consideration held the corresponding v3.1 item at 2.",
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
        "rationale": "The program documents a coherent specialist core: 75 credit points of compulsory subjects across six named public-health subjects, a required 25-point capstone, and documented early-sequence staging of the methods subjects.",
        "evidenceLines": [
          "75 credit points of compulsory subjects",
          "This subject is a core subject within the Master of Public Health, the Master of Epidemiology, the Master of Science (Epidemiology) and the Master of Biostatistics. Students should enrol in this subject early in their program of study."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment requires defended trade-off decisions: a timed ethical-dilemma examination (POPH90218) and assessed prioritisation and selection of intervention strategies (POPH90274). The capstone routes add project work under supervision with accountability.",
        "evidenceLines": [
          "Exam: Ethical Dilemma Analysis",
          "Prioritise and select strategies and interventions to address health needs"
        ]
      }
    },
    "ambiguities": [
      "C4: the evidence straddled levels 2 and 3. The required capstone documents independent-learning assessment on two of three routes, but the third route's assessment page was not in the extract, and the universal course-level outcome is a statement of intent rather than assessment evidence (rule R2). The score was resolved to the lower level under the ambiguity rule.",
      "C5: the interval between the level 1 anchor (an introductory methods unit) and the level 2 anchor (design and conduct of an inquiry with data collection) is wide. This program's three assessed methods subjects exceed level 1 considerably, while design (core) and conduct (capstone) are distributed across components. The score was resolved at 2 on the basis of the level 3 anchor's explicit requirement that the project be compulsory, which implies that level 2 does not carry that requirement. The width of this interval is noted for the content-validity panel."
    ],
    "notScoreable": [
      "The assessment page for POPH90227 (Public Health in Practice capstone) was not captured in the extract. This affects only the C4 level 3 judgement, which was resolved to the lower level in any case."
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
