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

/** W1–W3 and `workplace` are optional: programs scored before v4.1 carry
 *  only the adaptive sub-scale and must be re-scored, not back-filled. */
export interface V4PanelC {
  instrument: string;
  C1: V4ItemResult;
  C2: V4ItemResult;
  C3: V4ItemResult;
  C4: V4ItemResult;
  C5: V4ItemResult;
  adaptiveness: number;
  W1?: V4ItemResult;
  W2?: V4ItemResult;
  W3?: V4ItemResult;
  workplace?: number;
  gates: { G1: V4GateResult; G2: V4GateResult };
  ambiguities: string[];
  notScoreable: string[];
  verified?: { adversarial: boolean; mechanical: boolean; date: string };
}

/** Migration-cycle status. `adaptMedian` is null until every reference-cohort
 *  program is scored on v4; position labels stay withheld while it is null. */
export interface V4Meta {
  cohortSize: number;
  scored: number;
  workplaceScored: number;
  workplaceComplete: boolean;
  complete: boolean;
  adaptMedian: number | null;
  expMedian: number;
  pending: string[];
}

export const V4_META: V4Meta = {
  "cohortSize": 34,
  "scored": 1,
  "workplaceScored": 0,
  "workplaceComplete": false,
  "complete": false,
  "adaptMedian": null,
  "expMedian": 90.9,
  "pending": [
    "527cl",
    "746st",
    "mc-apbusa",
    "mc-arch",
    "mc-ba",
    "mc-base",
    "mc-busana",
    "mc-clind",
    "mc-cs",
    "mc-datasc",
    "mc-ddensur",
    "mc-dmed",
    "mc-doptom",
    "mc-dphysio",
    "mc-dvetmed",
    "mc-ed",
    "mc-envsc",
    "mc-gencoun",
    "mc-intedib",
    "mc-is",
    "mc-journ",
    "mc-jurisd",
    "mc-nursc",
    "mc-phtyph",
    "mc-prop",
    "mc-propsyc",
    "mc-scibit",
    "mc-sciche",
    "mc-sciear",
    "mc-sciphy",
    "mc-surged",
    "mc-tesol",
    "mc-urbdes"
  ]
};

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
  },
  "439fs": {
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor met: at least one core unit assesses collaborative practice. Advanced Food Processing Technology (FOOD90007), one of the eight compulsory subjects, carries a 20% 'Group written assignment' alongside individually-marked work. Not level 3: the anchor requires assessed collaborative practice to RECUR across the program AND at least one assessment requiring coordination of work across people and tools/AI systems. Group assessment appears in only one core unit; the other seven compulsory subjects assess individually (tests, exams, individual reports, individual practical reports). The group-based capstone FOOD90043 is one route among four capstone options, not a program-wide requirement, and nothing in the extract documents role or tool allocation, multidisciplinary accountability, or any coordination with AI/tool systems. Team capability otherwise appears only as a course-level generic skill claim, which under R2 cannot lift the score.",
      "evidenceLines": [
        "Group written assignment",
        "Assignments may be industry-based.",
        "Advanced Food Processing Technology (FOOD90007)",
        "Ability to participate effectively as a member of a team",
        "The research is conducted as a group project with 2-3 students.",
        "Group oral presentation",
        "Students must complete a minimum of 25 points of capstone subjects from the following:"
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Level 1 anchor met exactly: reflection/self-appraisal appears in the graduate attributes ('awareness of personal strengths and limitations', 'aptitude for continued self directed learning') and in the course generic skills, but no CORE unit assesses appraisal of the quality of work against criteria. Level 2 requires core assessment containing criterion-referenced appraisal of quality — peer review, structured critique, portfolio with standards, marking against exemplars. The only peer-review assessment in the extract is 'Poster Design and Peer Review' in FOOD90031 Food Packaging Materials and Processes, which the course structure lists under Electives, not the eight compulsory subjects, so it does not satisfy an anchor worded 'core assessment'. The 'quality' language throughout the core (Food Safety and Quality, 'Evaluate important quality control concepts', 'quality maintenance of the processed products') refers to food-product quality, not appraisal of the quality of work, and so is not evidence for this construct. No assessment anywhere in the extract requires documenting or justifying reliance decisions on a tool, source or collaborator, so level 3 is not in contention.",
      "evidenceLines": [
        "Have excellent interpersonal and decision-making skills, including an awareness of personal strengths and limitations",
        "Be critical and creative thinkers, with an aptitude for continued self directed learning",
        "Capacity for independent critical thought, rational inquiry and self-directed learning and research",
        "Poster Design and Peer Review- Innovative food packaging material.",
        "Students must complete a minimum of 50 and maximum of 75 credit points from the following:",
        "Students must complete all of the following eight subjects (100 points):",
        "Evaluate important quality control concepts and skills."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor met: digital tooling appears as tool operation/training — the compulsory subject AGRI90075 Research Methods For Life Sciences teaches and assesses 'Practical skills working with data in the R software environment' and lists 'Apply research tools in the R software environment' as an outcome, and the course generic skills claim computer-based skills and use of communication technology for data storage and analysis. This is precisely the operational level the anchor caps at 1. Level 2 requires core units to address AI capabilities AND limitations/ethics with use-with-limits assessed: the extract contains no mention of artificial intelligence, machine learning or generative AI in any core subject, elective, outcome or assessment. The nearest technology content ('Food 3D printing', 'Genetically modified microorganisms', 'new generation technologies') is domain process technology, not AI, and carries no capability/limitation or governance framing. Not level 0, because digital tool content is documented inside a compulsory subject rather than being absent.",
      "evidenceLines": [
        "Practical skills working with data in the R software environment",
        "Apply research tools in the R software environment.",
        "Awareness of and ability to utilise appropriate communication technology and methods for the storage, management and analysis of data",
        "Highly developed computer - based skills to allow for effective on-line learning and communication.",
        "Food 3D printing",
        "Genetically modified microorganisms"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 anchor met, level 3 not established (demoted from 3 on adversarial verification). Level 2 is securely met: core assessment addresses novel problems — the compulsory AGRI90075 assesses practical work on real-life data across five graded practicals, and core coursework requires a 'Review including analysis of data from industry, on a designated topic'. Level 3 requires a SELF-SCOPED capstone or research project, assessed identification of one's own knowledge gaps, or WIL in an untaught context. The self-scoping claim does not survive: 'Integrate and apply disciplinary knowledge and skills to an independently generated research question and investigation' sits under Intended learning outcomes and is capped at level 1 by R2, and 'Students are strongly encouraged to initiate project ideas...' is hedged overview prose that is neither a requirement nor an assessment. A graded, hurdle-gated project proposal evidences that a project was proposed, not that the student scoped it. The same handbook paragraph states the project's content and extent are determined by the supervisor in consultation with the student, and the group capstone route offers students projects to choose from — both cut directly against self-scoping. No assessment of one's own knowledge gaps appears anywhere, and the industry-visit hurdle is attendance, not performance in an untaught context. Ambiguity between 2 and 3 resolves DOWN under the instrument's scoring-direction rule.",
      "evidenceLines": [
        "Between 25 and 50 credit points of Capstone subjects",
        "Students must complete a minimum of 25 points of capstone subjects from the following:",
        "This subject enables students to conduct an original research topic under supervision, as approved by an academic project supervisor.",
        "The content and extent of the project will be determined by a project supervisor in consultation with the student and Subject Coordinator, where necessary",
        "Students will be offered different group projects to choose",
        "Hurdle requirement: A pass in the project proposal",
        "A thesis/body of work due Monday 9.00am after the SWOTVAC period",
        "Hurdle requirement: Student must participate in at least 1 industry visit"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor met in full: students design and conduct an assessed inquiry with methodology selection and data collection. The compulsory AGRI90075 covers sampling and experimental design and assesses it through five practical assessments worth 60% plus an exam; the required capstone has students investigate 'a problem using an approved methodology' assessed via proposal, thesis and oral presentation; core Plant Food Products requires students to 'Perform experiments' and submit a practical report. Held at 2 rather than 3 because the level-3 anchor requires a substantial project GENERATING PRIMARY EVIDENCE to be required. The handbook defines the capstone disjunctively — 'a review of a body of relevant literature, together with a critical evaluation of research or experimental protocols, a modest original experiment, OR limited exploration of a scientific problem, OR an investigation into a problem using an approved methodology' — so a capstone satisfying the requirement need not generate primary evidence at all. The methodology-under-scrutiny half of the anchor is arguably present (hurdle proposal, supervised progress meetings, oral presentation), but with primary-evidence generation optional the evidence straddles 2 and 3, and the lower level is taken.",
      "evidenceLines": [
        "An introduction to sampling techniques and experimental design",
        "Complete five of Six practical assessments in weeks 2, 4, 6, 8, 10",
        "Identify appropriate methodological frameworks and match research tools to these approaches;",
        "The project represents a capstone subject and comprises a review of a body of relevant literature, together with a critical evaluation of research or experimental protocols, a modest original experiment, or limited exploration of a scientific problem, or an investigation into a problem using an approved methodology.",
        "Hurdle requirement: A pass in the project proposal",
        "A thesis/body of work due Monday 9.00am after the SWOTVAC period",
        "projects will generally involve regular meetings with their supervisor where students report on progress, difficulties and research plans",
        "Perform experiments to demonstrate how composition and processing techniques affect the structure and quality of food",
        "Practical report"
      ]
    },
    "adaptiveness": 8,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "PASS on the all-compulsory-specialist-core route. Half the 200-point degree is a fixed core of eight named food-science subjects that every student must complete, spanning food chemistry, microbiology, processing technology, safety and quality, plant and animal commodity streams, plus a research-methods subject — coherent disciplinary identity with technical and methodological depth, not generic or interchangeable content. Capped by a compulsory supervised research capstone.",
        "evidenceLines": [
          "The Master of Food Science requires the successful completion of 200 credit points.",
          "100 credit points of compulsory subjects",
          "Students must complete all of the following eight subjects (100 points):",
          "Be able to demonstrate advanced knowledge and skills in the interdiscplinary field of food science",
          "Between 25 and 50 credit points of Capstone subjects"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "PASS on the capstone route: a supervised original research project is compulsory and carries real uncertainty and personal accountability — a hurdle-gated proposal, a 15,000-word thesis and a defended oral presentation, with progress and 'difficulties' reported to a supervisor. Core coursework independently requires defended trade-off decisions rather than recall: Food Safety and Quality assesses risk identification and application of HACCP principles through a food safety plan draft and an open-book examination, and Advanced Food Processing Technology requires evaluating processing technologies for appropriate application.",
        "evidenceLines": [
          "Hurdle requirement: A pass in the project proposal",
          "A thesis/body of work due Monday 9.00am after the SWOTVAC period",
          "projects will generally involve regular meetings with their supervisor where students report on progress, difficulties and research plans",
          "Analyse and identify potential risks in the food chain",
          "Apply HACCP principles in a food safety plan",
          "Food safety plan draft",
          "Evaluate processing technologies for their appropriate application"
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 2 and 3: the group-based capstone FOOD90043 ('The research is conducted as a group project with 2-3 students') plus the core FOOD90007 group assignment could read as recurrence, but FOOD90043 is one of four capstone routes rather than required, and the second half of the level-3 anchor (coordination of work across people AND tools/AI systems) has no documentary support. Lower level taken; recorded here.",
      "C2 straddled 1 and 2: a genuine criterion-referenced peer-review assessment exists ('Poster Design and Peer Review'), but only in FOOD90031, which the course structure lists under Electives while the level-2 anchor is worded 'Core assessment includes'. Lower level taken.",
      "C3 straddled 0 and 1: there is no AI content anywhere in the extract, which points at 0, but the level-1 anchor also covers digital tool operation/training, and R programming is taught and assessed inside a compulsory subject. Scored 1 on the tool-operation clause; the ceiling is set by the total absence of AI capability/limitation/governance content, so level 2 was never in contention.",
      "C4 straddled 2 and 3 and was demoted from 3 to 2 on adversarial verification. The level-3 case rested on the capstone being self-scoped, but the only self-scoping language is an intended learning outcome (R2-capped at level 1) and hedged 'strongly encouraged' overview prose; the handbook elsewhere states the project's content and extent are determined by the supervisor, and the group capstone offers students projects to choose from. A hurdle-gated project proposal evidences that a project was proposed, not that the student scoped it. Lower level taken.",
      "C5 straddled 2 and 3: the capstone is required and methodology is reviewed in stages (hurdle proposal, supervisor meetings, oral presentation), but the handbook's own disjunctive definition of the project permits a literature review plus critical evaluation of protocols or a 'limited exploration' in place of generating primary evidence, so the level-3 requirement that primary-evidence generation be REQUIRED is not documented. Lower level taken."
    ],
    "notScoreable": [
      "C2 level-3 evidence (documented and justified reliance decisions on a tool, source or collaborator; defence of AI-output quality; assessed strategy adjustment over time) is entirely absent from the extract — no such assessment task appears in any core, elective or capstone page. Scored on the level-1 anchor from graduate-attribute text rather than inferred upward.",
      "No 'Eligibility and requirements' page was captured for any subject, so the prerequisite-chain route to G1 could not be checked; G1 was passed on the independently documented all-compulsory-core route instead.",
      "AGRI90082 Major Research Project Part 2 has no substantive content in the extract ('Refer to AGRI90080 Major Research Project Part 1 for further details' on every field, including its assessment page), so it contributed no independent evidence; the AGRI90080 assessment statement is documented as covering both parts.",
      "Assessment pages were not captured for four electives (FOOD90040, FOOD90033, AGRI90057, AGRI90089, AGRI90012, AGRI90014, AGRI90076 Industry Internship, CHEM90055), so no elective-side evidence beyond FOOD90031/FOOD90032/FOOD90034/FOOD90028 was available. This does not affect C1–C5, whose level-2 and level-3 anchors turn on core and required-capstone assessment."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  }
};

export const v4PanelCByCode = (code: string): V4PanelC | undefined =>
  V4_PANEL_C[code.toLowerCase()];
