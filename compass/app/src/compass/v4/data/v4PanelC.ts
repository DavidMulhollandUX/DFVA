// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
/** Present when adversarial verification moved a score. Recorded rather than
 *  overwritten: which anchor clause failed on scrutiny is response-process
 *  evidence, and the IRR study reads it. */
export interface V4Adjudication {
  originalScore: number;
  demotedTo?: number;
  promotedTo?: number;
  reason: string;
}

export interface V4ItemResult {
  score: number;
  rationale: string;
  evidenceLines: string[];
  adjudication?: V4Adjudication;
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
  "scored": 15,
  "workplaceScored": 15,
  "workplaceComplete": false,
  "complete": false,
  "adaptMedian": null,
  "expMedian": 90.9,
  "pending": [
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

/** A program scored on v4 with no Panel A record: no exposure, no alumni
 *  destinations, no market report. The report page renders the Panel C half
 *  and states the other half as absent rather than estimating it. */
export interface V4OnlyProgram {
  code: string;
  name: string;
}

export const V4_ONLY_PROGRAMS: Record<string, V4OnlyProgram> = {
  "mc-mgmthre": {
    "code": "mc-mgmthre",
    "name": "Master of Management (Human Resources)"
  }
};

export const v4OnlyProgramByCode = (code: string): V4OnlyProgram | undefined =>
  V4_ONLY_PROGRAMS[code.toLowerCase()];

export const V4_PANEL_C: Record<string, V4PanelC> = {
  "244cw": {
    "instrument": "4.1-draft",
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
    "W1": {
      "score": 2,
      "rationale": "Level 2 is met in the compulsory core: POPH90218 Public Health Leadership and Policy assesses a 'Policy Advocacy Pitch + Campaign Materials' (30%) and a systems-mapping team presentation (20%), and POPH90274 Applied Program Development assesses a 'Health program proposal document' (50%). An advocacy pitch with campaign materials and a program proposal are recognised professional genres in public health, not academic genres addressed to a marker. Level 3 requires BOTH that professional communication recur progressively across the program AND that at least one core assessment be delivered to, or judged by, a real external audience or practitioner with conduct or accountability among the criteria. The recurrence limb holds; the external-audience limb does not. Every presentation in the six compulsory subjects is delivered to staff and peers. The only practitioner judgement documented anywhere is the workplace supervisor hurdle in POPH90286, which sits in one of three capstone routes and is entered competitively, so it is not something the program requires of every student. The course-level claim to 'Communicate effectively in written, oral and visual format to a range of audiences' is an outcome statement and is capped at level 1 by R2; it cannot carry level 3.",
      "evidenceLines": [
        "5-minute Individual Presentation plus Q&A: Policy Advocacy Pitch + Campaign Materials",
        "8-minute Team Presentation (approximately 5 students per group) plus 3-minute Q&A: Systems Mapping",
        "Health program proposal document",
        "Communicate effectively in written, oral and visual format to a range of audiences",
        "Workplace supervisor assessment of the student's completion of the project"
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 is securely met: the POPH90274 'Health program proposal document' (50%) reproduces a public-health program-development task end to end and produces the artefact a practitioner produces, and POPH90218's advocacy pitch with campaign materials does the same for policy advocacy. Level 3 needs both limbs. The spine limb is arguable — two of six compulsory subjects carry practitioner-shaped artefacts and every student completes a capstone — but the practice-constraint limb fails on the path the program actually requires. Of the three capstone routes only Professional Practice supplies an externally set problem and real host constraints; the Public Health in Practice route is problem-based learning on teacher-supplied scenarios, and a student may complete the degree without ever meeting a constraint set by anyone outside the university. Scoring what the program requires of every student rather than its best available route — the discipline C5's level-3 anchor already states as 'not one route among several' — resolves this DOWN to 2. The remaining four compulsory subjects assess by exam, essay, short answer and quiz.",
      "evidenceLines": [
        "Health program proposal document",
        "5-minute Individual Presentation plus Q&A: Policy Advocacy Pitch + Campaign Materials",
        "Students select one 25 credit point capstone options:",
        "Within this capstone, students will apply their public health training to real world scenarios through a problem based learning approach in Public Health in Practice."
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Level 2 is met and level 3 is not, on the required/optional distinction rather than on depth. The Professional Practice capstone is genuine work-situated learning of the strongest kind the anchors describe: a supervised year-long placement with an external host, negotiated between student, host and coordinator, assessed, with the workplace supervisor's assessment carrying a hurdle. On depth alone it would read as level 3. But level 3 requires the work-situated learning to be REQUIRED, and it is not: it is one of three capstone routes, and 'Entry is competitive'. A student may complete the MPH through the Research Project or Public Health in Practice route with no placement at all. Ambiguity between 2 and 3 resolves DOWN. Note this is the item most likely to move if the anchor's treatment of competitive-entry routes is sharpened after the content-validity panel.",
      "evidenceLines": [
        "Students will undertake a supervised placement with an appropriate organisation, negotiated between the student, the host organisation, and the Professional Practice Coordinator.",
        "Entry is competitive and selection is based on academic merit, subjects completed, relevant background and experience, and alignment of skills with available placements.",
        "Workplace supervisor assessment of the student's completion of the project",
        "The workplace supervisor assessment is a hurdle requirement.",
        "Students select one 25 credit point capstone options:"
      ]
    },
    "workplace": 6,
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
      "C5: the interval between the level 1 anchor (an introductory methods unit) and the level 2 anchor (design and conduct of an inquiry with data collection) is wide. This program's three assessed methods subjects exceed level 1 considerably, while design (core) and conduct (capstone) are distributed across components. The score was resolved at 2 on the basis of the level 3 anchor's explicit requirement that the project be compulsory, which implies that level 2 does not carry that requirement. The width of this interval is noted for the content-validity panel.",
      "W1 straddled 2 and 3 on the external-audience limb. The POPH90286 workplace supervisor hurdle is practitioner judgement of professional conduct, which would satisfy level 3, but it sits in a competitively-entered capstone route rather than in what every student must do. Resolved DOWN to 2.",
      "W2 straddled 2 and 3 on the practice-constraint limb, for the same structural reason: only one of three capstone routes supplies an externally set problem. Resolved DOWN to 2.",
      "W3 straddled 2 and 3 on depth versus requirement. The placement is a year-long supervised external placement with a supervisor hurdle — level-3 depth — but is one route among three with competitive entry, so the 'required' limb of level 3 fails. Resolved DOWN to 2. All three W items turn on the same fact, which is a dependency the IRR study should watch: they are not independent observations of this program.",
      "Construct-boundary check: the POPH90286 placement was scored in W3 only. It was NOT re-used to lift C1 (whose v4.1 level-3 anchor no longer lists placements) or C4 (whose v4.1 level-3 anchor no longer lists work-integrated learning). The POPH90218 peer-feedback and reflective assessments stay in C2 (appraisal of quality) and are not counted again as W1 professional communication."
    ],
    "notScoreable": [
      "The assessment page for POPH90227 (Public Health in Practice capstone) was not captured in the extract. This affects only the C4 level 3 judgement, which was resolved to the lower level in any case."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "439fs": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is met: at least one core unit assesses collaborative practice. Core FOOD90007 Advanced Food Processing Technology carries a 'Group written assignment' worth 20%, so level 1 ('no core unit assesses it') is contradicted despite teamwork also appearing in the program generic skills. Not level 3: assessed collaborative practice does not recur across the compulsory core (it is a single group task in one of eight compulsory subjects; the group route in FOOD90043 is only one of three capstone options), and no assessment anywhere in the extract requires coordinating work across people AND tools/AI systems - there is no documented role/tool allocation and no assessed division of work between people and systems.",
      "evidenceLines": [
        "Advanced Food Processing Technology (FOOD90007)",
        "Group written assignment",
        "Ability to participate effectively as a member of a team",
        "Assignments may be industry-based."
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Level 1 anchor: self-direction and self-awareness appear in the program generic skills and graduate attributes, but no core unit assesses appraisal of the quality of work against criteria. The only documented peer review in the extract ('Poster Design and Peer Review') sits in FOOD90031, an elective, and level 2 requires CORE assessment. The capstone's 'critical evaluation of research or experimental protocols' is methodological critique of the discipline's own research, which under one-construct-one-home is scored in C5 (inquiry/methodology), not as criterion-referenced appraisal of work quality; it is also not documented as criterion-referenced. Nothing requires students to document or justify reliance decisions on a tool, source or collaborator, so level 3 is not in reach.",
      "evidenceLines": [
        "Capacity for independent critical thought, rational inquiry and self-directed learning and research",
        "Have excellent interpersonal and decision-making skills, including an awareness of personal strengths and limitations",
        "Poster Design and Peer Review- Innovative food packaging material."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor: digital tools appear only as tool operation/training - core AGRI90075 Research Methods For Life Sciences teaches and assesses operation of the R software environment, and the program generic skills describe utilising communication technology for data storage and analysis. Level 2 requires core units to address AI capabilities AND limitations/ethics; the extract contains no mention of artificial intelligence, generative AI or machine learning anywhere (zero hits across all 2,199 lines), so neither level 2 nor the level-3 governance/critique route can be reached.",
      "evidenceLines": [
        "Practical skills working with data in the R software environment",
        "Apply research tools in the R software environment.",
        "Awareness of and ability to utilise appropriate communication technology and methods for the storage, management and analysis of data"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 anchor: a required 25-50 credit point original research project applies disciplinary knowledge to novel or unfamiliar problems, evidenced by a graded proposal hurdle, a 15,000-word thesis and an oral presentation. Level 3 was proposed on self-scoping but is NOT awarded: the distinguishing feature is not carried by assessment evidence as R2 requires. The assessment tables document only that a proposal is written and graded, not who scoped the project, and the handbook overview states the opposite - 'The content and extent of the project will be determined by a project supervisor in consultation with the student and Subject Coordinator, where necessary'. The 'strongly encouraged to initiate project ideas' line is hortatory, and the FOOD90043 route removes self-scoping outright ('Students will be offered different group projects to choose'). The 'independently generated research question' phrase is an intended learning outcome, which R2 never accepts as sufficient. Ambiguity between 2 and 3 resolves to the lower level.",
      "evidenceLines": [
        "Between 25 and 50 credit points of Capstone subjects",
        "Hurdle requirement: A pass in the project proposal",
        "The content and extent of the project will be determined by a project supervisor in consultation with the student and Subject Coordinator, where necessary",
        "Students will be offered different group projects to choose."
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor met: students design and conduct an assessed inquiry with methodology selection and data collection - core AGRI90075 covers research design, sampling and experimental design and assesses it through five practical assessments, and the required capstone conducts a supervised original research topic assessed by proposal, thesis and oral presentation. Held at 2 rather than 3 because level 3 requires a substantial project GENERATING PRIMARY EVIDENCE to be required and not one route among several: the handbook explicitly permits the project to be 'a critical evaluation of research or experimental protocols' or 'limited exploration of a scientific problem' INSTEAD of 'a modest original experiment', so primary evidence generation is optional within the required project. No viva or defence is documented; the proposal hurdle and supervisor progress meetings are the only scrutiny. Ambiguity resolved downward per the scoring-direction rule.",
      "evidenceLines": [
        "This subject enables students to conduct an original research topic under supervision, as approved by an academic project supervisor.",
        "The project represents a capstone subject and comprises a review of a body of relevant literature, together with a critical evaluation of research or experimental protocols, a modest original experiment, or limited exploration of a scientific problem, or an investigation into a problem using an approved methodology.",
        "The subject will focus on the design of research projects, investigation and interpretation of data, and the application of scientific computing to research problems.",
        "Identify appropriate methodological frameworks and match research tools to these approaches;"
      ]
    },
    "adaptiveness": 8,
    "W1": {
      "score": 1,
      "rationale": "Level 1 anchor: communication appears extensively in program generic skills and graduate attributes (which Barrie forbids scoring, R2), and core assessment adds spoken communication to peers and staff - FOOD90012 assesses a 10-minute oral presentation and the required capstone a 15-minute oral presentation - but no core assessment documents an audience beyond the teaching team. Level 2's other route, a recognised professional genre, is available in the extract only through FOOD90008's food safety plan, which under one-construct-one-home is scored in W2 (fidelity of the artefact produced) because W1's construct centres on communicating to people who are not your examiner and no audience beyond the marker is documented for that task. No external practitioner audience and no assessed professional-conduct criteria appear anywhere, so level 3 is out of reach.",
      "evidenceLines": [
        "Oral presentation based on the written assignment, due in approximately Week 8",
        "Present research findings in clear, concise and persuasive written and verbal forms",
        "Highly developed oral communication skills to allow informed dialogue and liaison with individuals and groups from industry, government and the community."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 anchor: at least one core assessment produces the artefact a practitioner would produce. Core FOOD90008 assesses a 'Food safety plan draft' against the HACCP principles and the Australian and international regulatory environment - a HACCP food safety plan is the food-industry practitioner's own deliverable, judged by the profession's regulatory criteria, so level 1 ('the artefact produced and the criteria applied remain academic') is contradicted. Scored only on documented task features per R4, not on any 'industry-relevant' labelling. Not level 3: such tasks are nowhere near the assessment spine - the eight compulsory subjects are otherwise carried by written examinations, mid-semester tests, essays, reviews and laboratory/practical reports, and the industry connection elsewhere is conditional ('Assignments may be industry-based').",
      "evidenceLines": [
        "Food safety plan draft",
        "Apply HACCP principles in a food safety plan",
        "Understand and analyse the Australian and international regulatory environment relating to the food chain",
        "Review including analysis of data from industry, on a designated topic",
        "Assignments may be industry-based."
      ]
    },
    "W3": {
      "score": 1,
      "rationale": "Level 1 anchor exactly: work-situated learning exists only as an elective. AGRI90076 Industry Internship appears solely in the elective list, from which students choose 50-75 credit points, so no student is required to take it. Level 2 requires a CORE unit placing students in a real workplace with practitioner supervision and assessment; the closest core-adjacent evidence is FOOD90043's assessed industry-visit hurdle, but a visit is not supervised participation in a workplace, and FOOD90043 is one of three capstone routes rather than compulsory. Manufacturer visits in FOOD90031/FOOD90032 are also electives.",
      "evidenceLines": [
        "Students must complete a minimum of 50 and maximum of 75 credit points from the following:",
        "Industry Internship",
        "Group Industry Visit Report equivalent to 1000 words per student",
        "Hurdle requirement: Student must participate in at least 1 industry visit"
      ]
    },
    "workplace": 4,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "A coherent specialist core is documented: eight all-compulsory food-science subjects totalling 100 of the 200 credit points, spanning food chemistry, microbiology, processing technology, safety and quality, meat, dairy and plant products, supported by practical laboratory programs and completed by a compulsory capstone research project. This is disciplinary identity, not generic or interchangeable content.",
        "evidenceLines": [
          "Students must complete all of the following eight subjects (100 points):",
          "Advanced Food Processing Technology (FOOD90007)",
          "This course is supported by a practical laboratory program, which emphasises analytical and instrumental techniques.",
          "Be able to demonstrate advanced knowledge and skills in the interdiscplinary field of food science"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The required capstone is a supervised original research project carrying real uncertainty and accountability: the methodology must pass a gated proposal before the work proceeds, and the project is an open investigation rather than a scripted exercise. Core coursework also requires defended judgement calls rather than recall - evaluating processing technologies for appropriate application, and identifying and analysing risks in the food chain under a risk-management and HACCP framework.",
        "evidenceLines": [
          "Between 25 and 50 credit points of Capstone subjects",
          "Hurdle requirement: A pass in the project proposal",
          "Evaluate processing technologies for their appropriate application",
          "Analyse and identify potential risks in the food chain"
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 1 and 2: the core group task is documented only as 'Group written assignment' with no documented individual accountability, which the level-2 anchor names as an exemplar. Scored 2 because level 1's condition ('no core unit assesses it') is directly contradicted by the assessment table, not because individual accountability was inferred.",
      "C2 straddled 1 and 2: the required capstone includes 'a critical evaluation of research or experimental protocols', which could read as structured critique (level 2). Resolved to 1 by two rules - the critique is not documented as criterion-referenced, and one-construct-one-home routes methodological critique to C5. The only explicit peer review in the extract is in an elective (FOOD90031), which level 2's 'core assessment' wording excludes.",
      "C4 straddled 2 and 3 and was DEMOTED from 3 to 2 on adversarial review. Self-scoping is documented only by an intended learning outcome ('an independently generated research question') and a hortatory encouragement line, neither of which satisfies R2; the handbook overview assigns scoping to the supervisor, and one permitted capstone route (FOOD90043) offers pre-set group projects. Resolved to the lower level, consistent with the same submission's downward resolution of C5 on the identical structural fact.",
      "C5 straddled 2 and 3: the capstone is compulsory and methodology passes a gated proposal plus staged supervisor review (satisfying the level-3 scrutiny conjunct), but primary-evidence generation is only one of several permitted project forms. Resolved DOWN to 2 per the scoring-direction rule.",
      "W1/W2 one-construct-one-home conflict: FOOD90008's 'Food safety plan draft' satisfies W1's 'recognised professional genre' route AND W2's 'artefact a practitioner would produce'. Scored once, in W2, because W1's construct centres on communicating to an audience beyond the examiner and no such audience is documented for this task. Had it been homed in W1 instead, W1 would be 2 and W2 1 - the allocation moves a point between the two workplace items without changing which evidence exists.",
      "W2 straddled 1 and 2: the task is a 'draft' of 1000 words at 15%, which strains 'reproduces a professional task end to end'. Held at 2 rather than raised to 3, and not dropped to 1, because level 1 requires the artefact to remain academic and a HACCP food safety plan is not an academic artefact.",
      "C3 has no AI evidence in either direction: the extract contains zero occurrences of 'artificial intelligence', 'generative AI', 'machine learning' or 'AI' across all 2,199 lines. The score of 1 rests entirely on documented digital tool operation (R), not on an inference that AI content is absent from the actual curriculum.",
      "AGRI90076 Industry Internship is listed in the course structure but its own subject page is not in the extract. This does not limit W3, since level 1 explicitly covers an optional internship and elective status alone caps the item at 1.",
      "FOOD90028 Sensory Evaluation is included in the extract but marked 'Not available in 2026'; it is an elective and was not used as evidence for any item."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "527cl": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied: a core unit assesses collaborative practice via 'interprofessional activity'. PSYC90125 Core Skills in Psychological Practice embeds the Ways of Knowing interprofessional program and assesses it directly (25% written reflection on interprofessional learning following the interdisciplinary panel). Not level 3: level 3 requires assessed collaborative practice recurring across the program AND at least one assessment requiring coordination of work across people AND tools/AI systems. Nothing in the extract assesses any division of work between people and systems, or tool/AI allocation — the extract contains no AI or system-coordination assessment at all. Placement-based multidisciplinary work ('Work effectively with a range of professionals and support staff in the workplace') is placement evidence and is housed in W3 per one-construct-one-home, so it does not lift C1.",
      "evidenceLines": [
        "Students will also complete the Ways of Knowing program.  This interprofessional curriculum activity brings together students from a range of disciplines to engage with multiple knowledges and ways of knowing.",
        "Written reflection on interprofessional learning and culturally safe practices following the interdisciplinary panel discussion component of Ways of Knowing program",
        "Develop an understanding of 'collaborative practice' in interprofessional contexts",
        "Ontological and epistemological ''knowing'' in healthcare and apply that in a clinical interprofessional context.",
        "Teamwork and working with others"
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "The level-2 anchor requires CORE ASSESSMENT to include criterion-referenced appraisal of quality (peer review, structured critique, portfolio with standards, marking against exemplars). No such task exists anywhere in the extract. Every assessment table in all 15 subject assessment pages was enumerated: PSYC90030 Principles of Psychological Assessment — the sole basis for the 2 — assesses only 'A written report' (1000 words, 40%) and 'A written examination' (1.5 hours, 60%), both content-unspecified; neither description mentions appraisal, criteria, or quality of work. The four lines carrying the score (handbook lines 1690, 1696, 1702 are intended learning outcomes and 1707 is a generic-skills bullet) are precisely the outcome statements R2 caps at level 1: 'a capability that appears in learning outcomes but is never assessed scores 1, everywhere, uniformly'. The rationale's assertion that 'this is not an outcome-only claim (R2 satisfied)' is an inference from ILO to undescribed artefact, not documented evidence. No peer review, critique task, portfolio, or exemplar-referenced marking appears in any core unit. The only assessed appraisal-adjacent tasks are reflections (placement reflection 'to satisfaction of placement coordinator', cultural-walk reflection, self-care self-reflection) — none criterion-referenced, and the placement one houses in W3 under one-construct-one-home. Level 1's declarative is true of the extract (reflection/self-assessment appears in the graduate attributes: 'Skills in self-assessment, reflective thinking and self-awareness...', but no core unit assesses it against criteria), so 1 is the lowest level whose declarative holds and the never-resolve-upward rule binds. Consequence: adaptiveness drops from 10 to 9.",
      "evidenceLines": [
        "Demonstrate mastery of the principal criteria practicing psychologists use to evaluate the quality of psychological data, as they relate to the clinical assessment of individuals.",
        "Apply criteria for evaluation of psychological test reliability and validity to enhance the accuracy of psychological classification decisions.",
        "Demonstrate practical implementation a critical understanding of the strategies employed in evaluating the validity of psychological opinions.",
        "Ability to evaluate the quality of data against formal criteria",
        "A written report",
        "A written examination",
        "Evaluating the effectiveness of their professional practice (in conjunction with clinical supervisors), identifying areas for improvement and implementing changes where needed.",
        "Hurdle requirement: Satisfactory completion of placement reflection (300-500 words) to satisfaction of placement coordinator."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor: digital content appears only at the operational/incidental level TEQSA identifies as non-durable. The single program-level digital reference is one clause naming e-health as a modality to consider; the only other digital material in the extract is delivery-mode or operational training (an online risk-awareness training module as a placement hurdle, an online quiz, an LMS test, and 4.5 hours of training in administration and scoring of neurocognitive tests). Not level 2: no core unit addresses AI capabilities AND limitations/ethics — the extract contains no mention of artificial intelligence, generative AI, algorithms or automated decision systems anywhere, and the extensive ethics content in PSYC90008 is professional/clinical ethics with no digital or AI dimension. Level 3 (critique or governance of AI systems in the discipline's context) is therefore unreachable.",
      "evidenceLines": [
        "They will consider interventions in a range of modalities, including e-health.",
        "Finally, they will be required to complete an online training module that provides training in awareness of the risks associated with the clinical placement environment and ways to manage or control for these risks.",
        "Hurdle requirement: Online training as hurdle component to be completed prior to students commencing placement activities.",
        "Students are also required to attend 4.5 hours of training in the administration and scoring of neurocognitive tests."
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3 anchor is satisfied on its own terms: the program documents structured progression toward independent learning through a self-scoped research project. The thesis is required, not one route among several ('All subjects are compulsory'), and the extract documents the scoping sequence: PSYC90003 Literature Review requires students to determine their own research question by identifying a gap in the literature, feeding the required PSYC90095/PSYC90096 thesis, and PSYC90029 Graduate Research Methods assesses the self-scoped proposal by 20-minute oral presentation (40%) and a 3000-word proposal report (60%). R2 is met because the level is carried by assessment-table lines, not outcome statements. This is above level 2 (application to novel problems assessed) because the progression is toward the student scoping their own project, not applying taught method to a supplied novel case. The work-integrated-learning route to level 3 was not used; that evidence is housed in W3.",
      "evidenceLines": [
        "This review of the literature will enable them to determine a pertinent research question by identifying a gap in the literature.",
        "Students will conduct their own research projects as outlined in PSYC90095 Thesis (Masters/coursework) Part 1 / PSYC90096 Thesis (Masters/coursework) Part 2.",
        "This course consists of coursework, placement and a minor research thesis (6,000 to 10,000 words).",
        "All subjects are compulsory.",
        "Develop and complete a research proposal of relevance to a research question in clinical psychology or clinical neuropsychology.",
        "Oral Presentation of research proposal",
        "Report of a research proposal (including brief literature review, rationale, and proposed methodology and analysis)",
        "Thesis (Masters/coursework) Part 1",
        "Thesis (Masters/coursework) Part 2"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied: students design and conduct an inquiry with methodology selection and data collection, assessed. PSYC90029 assesses a full research proposal including proposed methodology and analysis (60%) plus an oral presentation of it (40%), and a minor thesis of 6,000-10,000 words is a required component of the course. Held at 2 rather than 3 under the lower-level rule: level 3 additionally requires the methodology to be 'defended under scrutiny (viva, defence, or staged supervised review)', and the extract documents no such event for the thesis itself — the assessment pages for PSYC90095 and PSYC90096 are not in the extract, so no viva, defence, supervisory review or examination arrangement can be quoted. The 20-minute oral presentation of a research proposal is consistent with a staged supervised review but is a proposal-stage presentation rather than a documented defence of the completed inquiry, and ambiguity resolves down.",
      "evidenceLines": [
        "This course consists of coursework, placement and a minor research thesis (6,000 to 10,000 words).",
        "Report of a research proposal (including brief literature review, rationale, and proposed methodology and analysis)",
        "Oral Presentation of research proposal",
        "Critically evaluate the importance of integrating theory, measurement, research design, empirical observation and inference for applied mental health research",
        "Address internal and external validity questions through application of a range of data analytic approaches",
        "Assess research designs relevant to their professional field of psychology.",
        "Thesis (Masters/coursework) Part 1"
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied: core assessment requires recognised professional genres of clinical psychology — a written clinical case formulation and treatment plan (PSYC90007, 100% of marks), a diagnostic work-up report and an oral demonstration of interview technique including a Mental State Examination (PSYC90125, 60% of marks), a role-play practical (PSYC90011, 30%) — and professional conduct is assessed through the ethics quiz on the APS and registration board guidelines and the ethical-dilemma case report. Held at 2 rather than 3 under the lower-level and one-construct-one-home rules: level 3 needs at least one core assessment delivered to, or judged by, a real external audience or practitioner with professional conduct or accountability explicitly among the assessed criteria. The only assessments judged by an external practitioner are placement hurdles (case histories judged 'to standard determined by placement supervisor'), which are placement evidence and are housed in W3; the case-conference presentation is judged 'to satisfaction of academic staff', i.e. the teaching team, which the anchor excludes. The extract also documents no assessed conduct criteria for the simulated/role-play tasks.",
      "evidenceLines": [
        "Written clinical case formulation",
        "A written treatment plan",
        "Oral presentation - demonstration of basic interview techniques, including Mental State Examination",
        "Written report - diagnostic work up of case study",
        "Practical class exercise (role-play)",
        "Interpret and communicate assessment findings in oral and written formats, including formal psychological reports, using culturally appropriate language.",
        "Online quiz (25 questions) covering ethical guidelines provided by Australian Psychology Society and the Australian Registration Board",
        "Report addressing case study of ethical dilemma",
        "Hurdle requirement: Attendance at, and participation, at 80% of case conference sessions each semester. Presentation of own clinical work to satisfaction of academic staff."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied several times over: core assessment reproduces a professional task end to end — a realistic problem supplied as case material, producing the artefact a practitioner produces (case formulation, intervention plan, treatment plan, diagnostic work-up, mental state examination). PSYC90023 assesses nothing but a case formulation (40%) and a formulation-plus-intervention-plan (60%), both 'based on case material provided'; PSYC90007 assesses a written clinical case formulation and a written treatment plan; PSYC90009 sets an observed written examination built around a video case study; PSYC90125 uses role-plays and simulated client interactions. Held at 2 rather than 3 under the lower-level rule. Level 3 requires such tasks to be the assessment spine AND at least one to carry a genuine constraint of practice. The evidence is consistent with both levels: the first year is densely case-based, but the only second-year non-placement subject page in the extract (PSYC90016) assesses MCQ quizzes and two 600-650 word written assignments, so 'at least one per stage' cannot be documented without importing placement evidence that houses in W3; and per R4 the extract nowhere documents the criteria used to judge any coursework task, so 'judged against criteria drawn from practice' rests on the artefacts being the profession's own rather than on any stated criteria. Ambiguity resolved downward.",
      "evidenceLines": [
        "Case Formulation: Development of a clinical case formulation, based on case material provided.",
        "Intervention Plan (written): Development of a clinical case formulation and an ensuing intervention plan, based on case material provided.",
        "Written clinical case formulation",
        "A written treatment plan",
        "Written report - diagnostic work up of case study",
        "Observed Examination (written) - 1.5 hours which includes watching a video based case study",
        "The subject will include opportunities for students to practise newly acquired skills through role-plays and simulated client interactions during the teaching sessions which are primarily full-day workshops.",
        "A practical exercise",
        "2 x MCQ quizzes based on material presented in Weeks 1-6",
        "One written assignment based on material presented in Weeks 7-9"
      ]
    },
    "W3": {
      "score": 3,
      "rationale": "Level 3 anchor is satisfied in every conjunct with quotable assessment evidence: substantial required work-situated learning (125 days of placement across a compulsory sequence of three placement subjects, 300 hours in Clinical Placement 1 and 350 hours each in Clinical Placements 2 and 3, in a real clinic and two external agencies); practitioner supervision (Psychology Board of Australia-approved registered psychologists and PBA-endorsed external supervisors); assessment (competency hurdles, four mental state examinations and five case histories judged to the placement supervisor's standard); accountability to the host (a placement contract, and a logbook checked and endorsed by the primary placement supervisor at least every fortnight, plus mid- and end-placement reviews); and structured reflection on professional practice (a required placement reflection to the satisfaction of the placement coordinator). This is a sequence in the core, not a single short placement, so it is above level 2.",
      "evidenceLines": [
        "Coursework consists of 14 classroom-based subjects taken over the two years of the course (see below) and 125 days of Placement (30 days in the first-year and 95 days in the second-year).",
        "In their first year, all students assess and provide treatment for adult clients referred to the University of Melbourne Psychology Clinic. In addition, all students undertake two second year field placements- one where the focus is on assessment and treatment of children and/or adolescents and the other focussing on clinical work with adults.",
        "Hurdle requirement: Attendance at placement on rostered placement days to accrue at least 150 hours direct client activity and a further 200 hours of indirect client related activity, including regular (weekly or equivalent as negotiated with the subject coordinator/clinical supervisor) attendance at supervision.",
        "External supervisors must be registered psychologists and be a Psychology Board of Australia-approved higher degree supervisor.",
        "Hurdle requirement: Satisfactory demonstration of competencies, informed by regular discussion between the placement coordinator, site clinical supervisor and other relevant educators, and the student.",
        "Hurdle requirement: Completion of placement contract outlining the details of the learning agreement between student and supervisor.",
        "Hurdle requirement: Submission of record of placement activities (including direct client hours, other client related activity and supervision hours- aka 'logbook'). Students must provide evidence that logbooks are checked and endorsed by their primary placement supervisor at least every fortnight.",
        "Hurdle requirement: Completion of five case histories to a satisfactory standard, including mental state examination, history, diagnosis, formulation, and where relevant treatment recommendations, as appropriate to the placement context to standard determined by placement supervisor.",
        "Hurdle requirement: Satisfactory completion of placement reflection (300-500 words) to satisfaction of placement coordinator."
      ]
    },
    "workplace": 7,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "PASS on the anchor's first and second routes simultaneously: an all-compulsory specialist core and an accredited sequence. Every subject is compulsory, the course is APAC-accredited as 'the required sequence of subjects' for registration, and the structure is staged across first-year and second-year subject lists with methodological and clinical depth building from Principles of Psychological Assessment and Introduction to Assessment and Diagnosis through Advanced Psychopathology and Advanced Psychological Practice, and from Literature Review through Graduate Research Methods to the thesis. Content is disciplinary throughout, not generic or interchangeable.",
        "evidenceLines": [
          "All subjects are compulsory.",
          "The course is accredited by the Australian Psychology Accreditation Council (APAC), providing the required sequence of subjects for graduates wishing to attain generalist registration as a psychologist in Australia as well as competency in knowledge and skills relevant to the clinical psychology specialisation.",
          "In order to satisfy the requirements of the Master of Psychology (Clinical) students must complete the following subjects:",
          "Accredited by the Australian Psychology Accreditation Council and recognised by the Australian Health Practitioner Regulation Agency (AHPRA)",
          "Advanced Psychopathology",
          "Thesis (Masters/coursework) Part 1"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "PASS: assessment requires defended trade-off decisions and live work with real uncertainty and accountability, not recall or scripted responses. PSYC90008 assesses resolution of ethical dilemmas through a case-study report and an essay that must be passed, alongside risk assessment and management including assessment of dangerousness; core clinical subjects require selecting among competing interventions and judging when a more complex intervention is warranted, and modifying interventions as a case formulation evolves; and clinical placements put students in front of real referred clients where risk must be assessed and managed. Recall-only assessment (the MCQ quizzes and LMS test) is present but is not the whole picture.",
        "evidenceLines": [
          "The exploration, clarification and possible resolution of selected ethical dilemmas commonly faced by psychologists will be covered and may include:",
          "Report addressing case study of ethical dilemma",
          "Assess client risk (ie suicidality, self-harm, harm to others) and implement appropriate responses;",
          "Describe brief interventions that are appropriate to particular clients' needs and determine when more complex interventions are appropriate.",
          "Apply knowledge to monitor client outcomes, identify barriers to treatment progress and modify interventions on the basis of an evolving case formulation and inter and intrapersonal changes.",
          "An ability to confront and manage unfamiliar problems",
          "Conducting assessments of risk, including consideration of information from multiple sources if appropriate;"
        ]
      }
    },
    "ambiguities": [
      "C3, levels 0 vs 1: the level-0 declarative ('No digital/AI content in any core unit or program-level outcome') is falsified by exactly one clause — 'They will consider interventions in a range of modalities, including e-health' — so 0 cannot be asserted, while level 1's description of incidental/operational appearance fits the online risk-training module and neurocognitive-test administration training. Scored at the lowest level whose declarative is true of the extract, i.e. 1.",
      "C5, levels 2 vs 3: a required primary-evidence project is documented (compulsory minor thesis), which is half of the level-3 conjunction, and the assessed 20-minute oral presentation of the research proposal is consistent with 'staged supervised review'. Because the thesis subject pages are absent and no viva, defence or supervised methodology review is quotable, the lower-level rule resolved this to 2.",
      "W2, levels 2 vs 3: the first year is a dense spine of practitioner-artefact tasks with externally supplied case material (a listed genuine constraint of practice), supporting 3; but the only documented second-year non-placement assessment is MCQ quizzes and short written assignments, so 'at least one per stage' cannot be shown without importing placement evidence housed in W3, and no marking criteria drawn from practice are documented anywhere for coursework (R4). Resolved downward to 2.",
      "W1, levels 2 vs 3: professional-genre assessment is repeated and progressive across the program, and placement hurdles are judged by an external registered-psychologist supervisor with logbook and contract accountability, which would satisfy level 3. That is placement evidence and, under one-construct-one-home, is scored in W3; the non-placement route to level 3 fails because the case-conference presentation is judged by academic staff (the teaching team) and no conduct criteria are documented for the simulated/role-play tasks. Resolved downward to 2. This is the sharpest interpretive fault line in this program and the most likely source of rater disagreement, since W1's level-3 anchor names practitioner and patient audiences that in a clinical program arise almost only on placement.",
      "C2 vs W3: the mid-placement and end-placement reviews and the supervisor-informed competency discussions could be read as process-focused evidence of strategy adjustment over time (C2 level 3). They are placement evidence and were scored in W3; C2 was scored 1 after adversarial verification, which found no criterion-referenced appraisal of quality in any core assessment table.",
      "C1 vs W3: 'Work effectively with a range of professionals and support staff in the workplace and communicate and collaborate effectively' is the strongest collaboration statement in the extract but is a placement learning outcome, so it was excluded from C1 per the explicit rule that placement evidence scores in W3, never in C1 or C4. C1 rests instead on the assessed Ways of Knowing interprofessional activity."
    ],
    "notScoreable": [
      "No item was left wholly unscoreable, but five compulsory subjects have no page in the extract and their absence constrains the ceiling on C5, W1 and W2: PSYC90095 and PSYC90096 Thesis (Masters/coursework) Parts 1 and 2 (no overview or assessment page, hence no documented thesis assessment, examination or defence), PSYC90017 Advanced Psychological Practice 1, PSYC90010 Mental Health Issues Across the Lifespan, and PSYC90027 Clinical Psychology in Medical Settings (no second-year coursework assessment evidence beyond PSYC90016)."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "746st": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Meets the level-2 anchor 'at least one core unit assesses collaborative practice — group projects with individual accountability': the core unit CVEN90035 assesses two group design reports in groups of five with a per-student workload equivalence (1500 and 500 words per student), i.e. group work with individual accounting. It does not reach level 3, which requires that assessed collaborative practice RECURS across the program AND that at least one assessment requires coordinating work across people AND tools/AI systems: the other core unit (CVEN90024) assesses only individual assignments and an exam, so collaboration sits in one of two core units, and nothing in the extract documents assessed role or tool allocation, or a division of work between people and systems. The teamwork statements in the CVEN90024 generic-skills list are outcome-level claims, which R2 caps at level 1 on their own.",
      "evidenceLines": [
        "One group design report in groups of 5 students. Equivalent to 1500 words per student, 35 hours. Intended Learning outcomes (ILOs) 2, 3, 4 and 5 are addressed in this assessment.",
        "ILOs 3and 5 are addressed in this assessment.",
        "A 2500 word assignment. ILOs 2 to 5 and 9 to 12 are addressed in this assignment.",
        "One written examination. ILOs 1 to 12 are addressed in this examination.",
        "Ability to function effectively as an individual and in multidisciplinary and multicultural teams, as a team leader or manager as well as an effective team member."
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Matches the level-1 anchor exactly: 'Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria.' The program outcome claims critical reflection on theory and professional practice, but the two core units' assessment schedules (CVEN90035: two group design reports plus a written exam; CVEN90024: two assignments plus a written exam) contain no peer review, structured critique, portfolio against standards or marking against exemplars, so the level-2 requirement of criterion-referenced appraisal of quality in CORE assessment is not documented. Level 3 (documented and justified reliance decisions on a tool, source or collaborator) is not met anywhere in the core; the nearest evidence — independent hand-check of software output — sits in a selective, not the core.",
      "evidenceLines": [
        "Cognitive skills to demonstrate mastery of theoretical knowledge and to reflect critically on theory and professional practice of structural engineering;",
        "One written three hour end-of-semester examination. ILOS 1 to 5 are addressed in this assessment.",
        "One written examination. ILOs 1 to 12 are addressed in this examination.",
        "ILO 9. Undertake independent checks of analysis results by hand calculations in support of structural engineering practice."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Matches the level-1 anchor 'AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable.' Both core units document digital-tool operation only: computer/finite-element modelling and structural analysis using a commercial package. The level-2 requirement that core units address AI capabilities AND limitations/ethics, with use-with-limits discussed and assessed, is absent — the extract contains no gen-AI or AI-ethics content in either core unit or in any program-level outcome, and therefore no level-3 critique or governance of AI systems (bias, accountability, transparency, regulation, data governance) either.",
      "evidenceLines": [
        "Develop computer models for analysing structural systems in buildings",
        "Undertake structural analyses of different types of structures using commercial package",
        "Application of finite element analysis and design methods for modular and prefabricated buildings and steel structures under fires are also introduced to provide students with comprehensive knowledge of modern construction methods.",
        "Skills acquired from the above topics will be integrated and applied to the assignment which consists of a detailed analysis of a typical high rise building."
      ]
    },
    "C4": {
      "score": 1,
      "rationale": "Matches the level-1 anchor 'Transfer is claimed in outcomes (\"apply knowledge in new settings\") but not assessed': the course outcomes claim application of established theories to different bodies of knowledge or practice, creativity and initiative in new situations, and planning and executing a substantial piece of scholarship. Level 2 requires at least one CORE assessment to require application to novel or unfamiliar problems (case variation, unseen datasets, cross-context projects); the documented core tasks are a detailed analysis of a typical high rise building and design reports within the taught content, which the extract does not document as novel or unfamiliar. Level 3 fails outright: the 746ST structure contains no self-scoped capstone or research project in the core (its core is two taught subjects) and no assessed identification of one's own knowledge gaps with a plan to close them.",
      "evidenceLines": [
        "Cognitive, technical and creative skills to investigate, analyse and synthesise complex information, problems, concepts and theories and to apply established theories to different bodies of knowledge or practice in structural engineering;",
        "With creativity and initiative to new situations in professional practice and/or for further learning;",
        "To plan and execute a substantial piece of scholarship.",
        "Skills acquired from the above topics will be integrated and applied to the assignment which consists of a detailed analysis of a typical high rise building.",
        "Students must complete 100 points. This consists of a 2 subjects (25 points) which are selected from the Core Subjects, a minimum of 3 subjects (37.5 points) from Structural Engineering selectives and up to 3 subjects are selected from the Infrastructure Engineering electives."
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Matches the level-1 anchor 'Introductory methods unit; literature-review assessment' — research training exists but only off the core: the outcome states students will have HAD THE OPPORTUNITY to develop research principles and methods, research subjects are available only by approval among electives, and the only documented research-genre assessment in the extract (a 2000-word critical literature review) sits in an Infrastructure Engineering elective. Level 2 requires students to design and conduct an inquiry with methodology selection and data collection, assessed; neither core unit does this — both are taught design subjects assessed by design reports, assignments and exams. Level 3 fails because no substantial primary-evidence project is REQUIRED and no methodology defence (viva, defence, staged supervised review) is documented.",
      "evidenceLines": [
        "Had the opportunity to develop research principles and methods in the field of structural engineering;",
        "Students may also choose one Infrastructure Engineering elective subject not in the list below. Research subjects are subject to approval.",
        "One critical literature review of approximately 2000 words. ILOs 1, 2 and 5 are addressed in the review",
        "Must complete both of the core subjects. Total of 25 points."
      ]
    },
    "adaptiveness": 6,
    "W1": {
      "score": 1,
      "rationale": "Level 1's first clause is squarely met — communication to engineering and non-engineering audiences appears in the course outcomes, and communicating effectively appears in the subjects' generic-skills lists, which under R2/Barrie cannot themselves lift the score. Level 2 requires at least one core assessment in a recognised professional genre OR to an audience beyond the teaching team, judged against criteria drawn from professional practice; the core assessment stock is group design reports, written assignments and closed examinations submitted to the marker, and while the design reports are code-based, the extract documents no audience beyond the teaching team, no assessed professional-conduct criteria and no spoken or oral assessment in either core unit. Level 3 (repeated, progressive professional communication with a real external audience or practitioner judge) is not documented at all.",
      "evidenceLines": [
        "Communication and technical research skills to justify and interpret theoretical propositions, methodologies, conclusions and professional decisions to engineering and non-engineering audiences;",
        "One group design report in groups of 5 students. Equivalent to 1500 words per student, 35 hours. Intended Learning outcomes (ILOs) 2, 3, 4 and 5 are addressed in this assessment.",
        "A 500 word assignment. Intended Learning Outcomes (ILOs) 2 to 5 and 9 to 12 are addressed in this assignment.",
        "One written three hour end-of-semester examination. ILOS 1 to 5 are addressed in this assessment."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Meets the level-2 anchor 'at least one core assessment reproduces a professional task end to end: a real or realistic problem, producing the artefact a practitioner would produce, judged against criteria drawn from practice.' The core unit CVEN90035 assesses a group design report against outcomes that include applying Australian design codes and undertaking preliminary and detailed design — a design report judged against the profession's own codes is the artefact a structural engineer produces. Per R4 the phrase 'real-world structures' is not itself scored; the documented features (design report, code compliance, detailed design) carry the score. Level 3 is not reached: such tasks are not the assessment spine — both core units are weighted 60% and 70% to closed written examinations, with design tasks as a minority component and no documented scaffolded sequence or stage-by-stage recurrence, and no genuine constraint of practice (ambiguous or externally supplied problem, real resource/time limit, consequential audience) is documented.",
      "evidenceLines": [
        "One group design report in groups of 5 students. Equivalent to 1500 words per student, 35 hours. Intended Learning outcomes (ILOs) 2, 3, 4 and 5 are addressed in this assessment.",
        "Apply Australian design codes to design steel and composite structures",
        "Undertake preliminary and detailed design of real-world structures",
        "Students will also experience design exercises of real-world structures from senior experienced practising engineers, which will place them at the forefront of both theory and practice.",
        "One written three hour end-of-semester examination. ILOS 1 to 5 are addressed in this assessment.",
        "One written examination. ILOs 1 to 12 are addressed in this examination."
      ]
    },
    "W3": {
      "score": 0,
      "rationale": "Matches the level-0 anchor 'No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure.' The 746ST course structure is 25 points of two taught core subjects, a minimum of 37.5 points of Structural Engineering selectives and up to 37.5 points of Infrastructure Engineering electives; none of the listed subjects is a placement, practicum, internship or community-based project, and no practitioner supervision in a workplace setting is documented anywhere for this course. Level 1 would require work-situated learning to exist at least as an elective or optional internship, which the 746ST subject lists do not contain.",
      "evidenceLines": [
        "Students must complete 100 points. This consists of a 2 subjects (25 points) which are selected from the Core Subjects, a minimum of 3 subjects (37.5 points) from Structural Engineering selectives and up to 3 subjects are selected from the Infrastructure Engineering electives.",
        "Must complete both of the core subjects. Total of 25 points.",
        "Select a minimum of 3 subjects from the following list. Total of 37.5 points.",
        "Select up to 3 subjects from the following list. Total of 37.5 points.",
        "Students may also choose one Infrastructure Engineering elective subject not in the list below. Research subjects are subject to approval."
      ]
    },
    "workplace": 3,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The gate PASSES on the 'coherent specialist core' route rather than the all-compulsory route: content is unmistakably structural-engineering-specific, not the generic or interchangeable content the FAIL condition names. Two compulsory structural subjects (25 points) plus a mandatory minimum of three subjects (37.5 points) drawn from a closed Structural Engineering selectives list constrain 62.5 of 100 points to the discipline, the stated major themes are structural, and the core documents build-on-prior-knowledge progression. Noted weakness against the anchor: only 25 of 100 points are all-compulsory and no staged prerequisite chain within the course is documented, so this is a PASS at the lower end.",
        "evidenceLines": [
          "The major themes of this course are: structural systems, conceptual design, sustainable design, extreme loading and advanced analysis techniques.",
          "Must complete both of the core subjects. Total of 25 points.",
          "Select a minimum of 3 subjects from the following list. Total of 37.5 points.",
          "The subject builds on fundamental structural engineering knowledge and when learnt together with other structural engineering electives will provide students who successfully complete the subjects a well-rounded knowledge of a range of structural engineering design skills."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The gate PASSES on the 'assessments require defended trade-off decisions' route and clearly avoids the FAIL condition of recall or scripted responses only. Core assessment in CVEN90024 (a 500-word and a 2500-word assignment addressing ILOs 2 to 5) requires developing conceptual designs of floor systems and of lateral load resisting systems — selection among competing structural systems under wind and earthquake loading — and the core CVEN90035 group design report requires preliminary and detailed design against Australian codes. The course frames its outcomes on complex, open-ended engineering tasks and problems. Noted limit: no viva, defence or documented adversarial scrutiny of the trade-offs appears in the extract, so the 'defended' element rests on the design-decision content of the assignments rather than on a documented defence event.",
        "evidenceLines": [
          "The Master of Engineering Structures aims to produce graduates who are both skilled in structural engineering principles and have the ability to apply them to complex, open-ended engineering tasks and problems.",
          "Develop conceptual designs of floors using different floor systems",
          "Develop conceptual designs of lateral load resisting systems for buildings",
          "A 2500 word assignment. ILOs 2 to 5 and 9 to 12 are addressed in this assignment.",
          "Undertake preliminary and detailed design of real-world structures"
        ]
      }
    },
    "ambiguities": [
      "Scope of 'core'. The extract also contains the course-structure page for a DIFFERENT course, the Master of Engineering Structural specialisation (mc-eng-spec-17, 300 points), whose core includes ENGR90037/ENGR90038 Engineering Capstone Project and whose elective list includes ENGR90033 Internship, and it contains the subject and assessment pages for that course's core (CVEN30008, CVEN30009, ENEN20002, ENGR20004, ENGR30002, MAST20029). 746ST's own structure page defines its core as exactly two subjects, CVEN90024 and CVEN90035. R1 (score what the handbook documents for this program) resolved this: only CVEN90024 and CVEN90035 were treated as core for 746ST, and the capstone and internship of the other course were NOT scored in C4, C5 or W3. Had the mc-eng-spec-17 core been treated as 746ST's, C4/C5 (capstone) and W3 (elective internship) would score higher.",
      "C4 straddled levels 1 and 2. The core CVEN90035 group design report addresses 'Undertake preliminary and detailed design of real-world structures', which could be read as application to a novel problem (level 2), but the extract documents no feature establishing the problem as novel or unfamiliar, and the CVEN90024 assignment is explicitly an integration of the taught topics onto a typical high rise building. Scoring direction (never resolve ambiguity upward) fixed it at 1.",
      "C5 straddled levels 0 and 1. Level 0 asserts 'no research-methods training', which is too strong given the outcome 'Had the opportunity to develop research principles and methods' and the availability of approved research subjects and an elective critical literature review; level 1's anchor ('introductory methods unit; literature-review assessment') is the better fit even though none of it is core. Scored 1, the lower of the two levels that could describe an inquiry-capable program, with the note that nothing in the core assesses inquiry.",
      "W1 straddled levels 1 and 2. A code-compliant structural design report is arguably a recognised professional genre judged against criteria drawn from practice (level 2), but no audience beyond the teaching team, no assessed conduct criteria and no oral or spoken assessment appear in either core unit. Scoring direction fixed it at 1; the report's task fidelity was scored in W2 instead, per 'one construct, one home'.",
      "W2 straddled levels 2 and 3. Design-report tasks appear in both core units, which could be read as a spine, and 'Apply Australian design codes' is the profession's own standard of performance. But examinations carry 60% and 70% of the two core units and no scaffolded progression or capstone is documented, so the tasks are not the assessment spine. Scored 2.",
      "C2 versus C3 boundary. CVEN90018 ILO 9 ('Undertake independent checks of analysis results by hand calculations') is the strongest reliance-on-a-tool evidence in the extract and would be C2 rather than C3 material, but CVEN90018 is a Structural Engineering selective, not core, so it could not satisfy C2 level 2 or 3, both of which require core assessment.",
      "Selectives are not core. Students must take a minimum of three from the five Structural Engineering selectives but no individual selective is required of every student, so selective evidence (e.g. the CVEN90016 group laboratory experiment, the CVEN90017 group assignments) was not used to satisfy anchors worded 'core unit' or 'core assessment'."
    ],
    "notScoreable": [
      "W1 level-1's second clause (whether core assessment adds a presentation to peers or staff) could not be verified positively or negatively for professional CONDUCT criteria: the extract's core assessment tables list description, timing and percentage only, and carry no marking criteria, so no statement about assessed standards of reliability, ethics or accountability is available for either core unit.",
      "C3's AI dimension has no evidence of any kind in the 746ST core: the extract documents no gen-AI content, AI ethics, or AI governance in CVEN90024 or CVEN90035 or in the course-level outcomes. The level-1 score rests on documented digital-tool operation, not on any AI evidence; a program-level AI statement, if one exists, is absent from this extract."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-apbusa": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied: core units assess collaborative practice as group projects, and one capstone assessment documents individual accountability inside the group work (an attendance-and-contribution hurdle). Not level 3: although assessed collaboration recurs across the program, no assessment line documents coordinating work across people AND tools/AI systems — there is no documented role-and-tool allocation and no task where the division of work between people and systems is itself assessed. The Programming for Analytics outcome about environment management 'to support collaborative development' is an outcome, not an assessment, so R2 bars it from lifting the score.",
      "evidenceLines": [
        "Work effectively in teams on complex data-driven projects",
        "Syndicate Project 1 portfolio (normally in groups of 4 - 5 students)",
        "Syndicate assignment (normally in groups of 4 - 5 students)",
        "Group Project (groups of 2 students)",
        "Syndicate case assignments; (4 - 5 students in each group)",
        "Hurdle requirement: Students need to attend & contribute to the group work to pass the subject"
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Held at level 1: reflection is present and a capstone Reflection Essay carries 20%, but nothing in the extract documents criterion-referenced appraisal of the quality of work — no peer review, structured critique, portfolio against standards, or marking against exemplars. The evaluation language ('evaluate the benefits and disadvantages of different methodologies', 'assess the strengths and weaknesses of AI techniques') is stated in intended learning outcomes, which R2 forbids scoring, and the appraisal target is a method, not a piece of work. Level 3 is not approached: no assessment requires students to document or justify reliance decisions on a tool, source or collaborator, or to defend judgements of AI-output quality.",
      "evidenceLines": [
        "Reflection Essay",
        "Group problem interpretation: challenge identification and possible solution methodologies (normally in groups of 3 - 4 students)",
        "Evaluate the benefits and disadvantages of using different methodologies, analytical approaches, and software to address the marketing-related business problem.",
        "Assess the strengths and weaknesses of AI techniques in business contexts."
      ]
    },
    "C3": {
      "score": 2,
      "rationale": "Level 2 anchor is met squarely: a compulsory subject addresses AI capabilities AND limitations/ethics, and its content is assessed (case study, knowledge checks, and a final examination that is a pass hurdle). Held below level 3 under the ambiguity-downward rule: the level-3 anchor requires the ASSESSMENT to require critique or governance of AI systems, and the assessment lines are generic ('Case Study', 'Final Examination') — governance, regulation and accountability appear only in the subject description and its intended learning outcomes, which R2 makes insufficient for a 3. The programme is therefore documented as teaching AI governance without documenting that it assesses it.",
      "evidenceLines": [
        "AI and Ethics in Analytics (BUSA90577)",
        "50 credit points of Compulsory subjects",
        "This subject provides a foundational understanding of Artificial Intelligence (AI) in the context of business analytics, with a strong emphasis on ethical concerns.",
        "Topics include algorithmic bias, data privacy, fairness, transparency, accountability, and the regulatory landscape governing AI.",
        "Develop strategies for ensuring compliance with regulations, and fostering appropriate AI governance within organisations.",
        "Case Study",
        "Hurdle requirement: Students are required to pass the final examination to pass the subject."
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 is documented: a required 25-point project applies the taught methods to a concrete, previously unfamiliar business problem over 20 weeks, and case-based syndicate assignments apply methods to varied business contexts. Not level 3: the level-3 anchor needs a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps with a plan to close them. The capstone is a team project whose problem and data are supplied to the students ('the data provided'), and no assessment line requires students to identify their own knowledge gaps. Ambiguity resolved downward.",
      "evidenceLines": [
        "25 credit points of Capstone subjects or 25 credit points of Research Pathway subject",
        "The subject integrates academic learning and practical challenges in modelling, solving and implementing an optimisation solution to a concrete business problem via a project undertaken over 20 weeks.",
        "Develop the skill to interpret real business problems in supply chain or revenue management with ambiguity into mathematical optimisation models.",
        "Implementation skills: These skills include (1) selecting the right software and/or computer language to code the optimisation algorithms proposed and (2) handling and cleaning the data provided to use as input to the optimisation algorithm developed.",
        "Syndicate case assignments; (4 - 5 students in each group)"
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1 anchor fits: there is an introductory methods unit covering probability, statistics, inference and sample statistics. Level 2 requires students to design and conduct an inquiry with methodology selection AND data collection, assessed — methodology selection is assessed (a hurdle 'problem interpretation' task and a 3500-word syndicate research report), but data collection is not merely undocumented, it is contradicted: the capstone describes cleaning 'the data provided'. Nothing in the extract documents students generating primary evidence, so level 3 (a required substantial primary-evidence project with methodology defended under scrutiny) is well out of reach even though the oral presentation is a hurdle.",
      "evidenceLines": [
        "The subject introduces foundational concepts within, mathematics, probability and statistics, and demonstrates their applications in business settings.",
        "Students learn the concepts of probability and random variables, descriptive statistics and their use, the meaning and interpretation of common business variables, and applications of sample statistics and inference.",
        "Group syndicate research report (normally in groups of 3 - 4 students)",
        "Implementation skills: These skills include (1) selecting the right software and/or computer language to code the optimisation algorithms proposed and (2) handling and cleaning the data provided to use as input to the optimisation algorithm developed.",
        "Individual Research Project"
      ]
    },
    "adaptiveness": 8,
    "W1": {
      "score": 1,
      "rationale": "Level 1 anchor matches exactly: communication to technical and non-technical audiences appears in the course outcomes and graduate attributes, and core assessment adds presentations — syndicate presentations and a 40-minute capstone oral presentation carrying a hurdle. Level 2 requires a recognised professional genre or an audience beyond the teaching team, judged against criteria drawn from professional practice; no assessment line names a client brief, consultancy or policy advice, pitch or public-facing artefact, and no audience beyond the teaching team is documented. Barrie's constraint applies with full force: the 'non-technical audience' language sits in outcomes and attributes, never in an assessment description, so R2 bars it from lifting the score.",
      "evidenceLines": [
        "Effectively communicate the results of a technical analysis to technical and non-technical audiences",
        "Communicate the results of technical analysis to both technical and non-technical audiences effectively.",
        "Communicate analytical insights to a non-technical audience via effective data visualisations.",
        "Syndicate project: Presentation (4 - 5 students in each group)",
        "Group syndicate oral presentation (normally in groups of 3 - 4 students)"
      ]
    },
    "W2": {
      "score": 1,
      "rationale": "Demoted from 2 to 1 on adversarial review. The level-2 anchor is conjunctive — a real or realistic problem AND the practitioner's artefact AND judgement against criteria drawn from professional practice — and two of the three clauses fail on the documentation. No marking criteria or rubrics appear anywhere in the extract, so the criteria clause cannot be met; treating that as 'undocumentable rather than evidence against' inverts R1 and the ambiguity-downward rule, and is inconsistent with the C5 treatment where a missing half of a conjunctive anchor forced the drop. The artefacts are a group syndicate research report and a reflection essay — academic genres, not the deliverable a practising analyst produces, which is level 1's condition that the artefact and criteria remain academic. Provenance compounds this: the lines carrying the level-2 case come from capstone subjects listed 'Not available in 2026', the syndicate case assignments come from an elective rather than the core, and the 'real-world case studies' phrasing is an R4-barred label from an unavailable elective. Level 1 is squarely met by the compulsory AI-and-ethics case study and the elective case assignments: methods are applied to case material, but the artefact produced and the criteria applied remain academic. The assessment spine is hurdle final examinations at 40–50% across nearly every core subject.",
      "evidenceLines": [
        "The subject integrates academic learning and practical challenges in modelling, solving and implementing an optimisation solution to a concrete business problem via a project undertaken over 20 weeks.",
        "Group syndicate research report (normally in groups of 3 - 4 students)",
        "Hurdle requirement: Students need to pass this assessment to pass the subject",
        "Hurdle requirement: Students are required to pass the final examination to pass the subject",
        "Syndicate case assignments; (4 - 5 students in each group)",
        "Case Study",
        "Reflection Essay"
      ],
      "adjudication": {
        "originalScore": 2,
        "demotedTo": 1,
        "reason": "Conjunctive level-2 anchor fails on two clauses: no marking criteria drawn from professional practice are documented anywhere in the extract, and the artefacts (syndicate research report, reflection essay) are academic genres. Supporting lines also come from capstones marked 'Not available in 2026' and from an elective, and one line is an R4-barred 'real-world' label."
      }
    },
    "W3": {
      "score": 0,
      "rationale": "Level 0 anchor is met on the face of the course structure: the 150 points are enumerated as foundational core, compulsory, elective and capstone/research-pathway subjects, and no placement, practicum, internship, live client project or community-based project appears anywhere in that structure or in any subject page in the extract. Not even level 1 (an elective or optional internship) is reachable, since no such option is listed. The only workplace language is a capstone outcome claiming skills are put into practice 'in a workplace context' — an outcome statement with no host, no practitioner supervision and no accountability to a host, which the construct requires and R2 bars from scoring.",
      "evidenceLines": [
        "The Master of Applied Business Analytics requires the successful completion of 150 credit points.",
        "50 credit points of Foundational Core subjects",
        "50 credit points of Compulsory subjects",
        "25 credit points of Elective subjects",
        "25 credit points of Capstone subjects or 25 credit points of Research Pathway subject",
        "Put into practice communication, interpersonal, organisational and time management skills in a workplace context."
      ]
    },
    "workplace": 2,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents a coherent specialist core with progressive technical depth: 100 of 150 points are foundational core plus compulsory analytics subjects, running from a foundations unit in mathematics, probability and statistics through predictive modelling to machine learning, and closing on a required 25-point project. The stated design is explicitly foundation-to-advanced within one discipline, not generic interchangeable content.",
        "evidenceLines": [
          "The course will cover foundation and advanced data analytics techniques, as well as frameworks for applying those techniques to a variety of business contexts.",
          "50 credit points of Foundational Core subjects",
          "50 credit points of Compulsory subjects",
          "Foundations of Data Analytics (BUSA90578)",
          "Adv Bus Analytics: Machine Learning (BUSA90568)",
          "25 credit points of Capstone subjects or 25 credit points of Research Pathway subject"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment goes beyond recall or scripted response: a compulsory decision-analytics subject is built on modelling decisions under uncertainty and bias and terminates in a hurdle-gated modelling project, and the required capstone asks students to translate an ambiguous business problem into a model and defend the choice of algorithm, with the report and presentation both hurdles. Judgement under ambiguity is also a course-level outcome, though the gate is carried by the assessed work rather than that statement.",
        "evidenceLines": [
          "Make appropriate judgements about how to proceed in an environment with ambiguities and/or bias in data",
          "Structure and analyse mathematical models of decision problems, including decision trees, optimisation, and simulation.",
          "Final modelling project",
          "Hurdle requirement: Students need to pass the final exam to pass the subject",
          "Develop the skill to interpret real business problems in supply chain or revenue management with ambiguity into mathematical optimisation models.",
          "Group syndicate research report (normally in groups of 3 - 4 students)"
        ]
      }
    },
    "ambiguities": [
      "C2 straddled levels 1 and 2. The assessed Reflection Essay (20% of the capstone) and the hurdle 'problem interpretation' task are appraisal-adjacent, but neither is documented as criterion-referenced appraisal of the quality of work. Resolved down to 1 by the ambiguity-downward rule plus R2.",
      "C3 straddled levels 2 and 3. AI governance, regulation, accountability and transparency are explicit subject content and outcomes in a compulsory subject, but the assessment lines are generic ('Case Study', 'Final Examination') and never state that critique or governance is what is assessed. Resolved down to 2 by the level-3 requirement that assessment evidence, not outcome statements, carry the score (R2).",
      "C4 straddled levels 2 and 3. A substantial project is required of every student, which reads toward level 3, but it is team-based with a supplied problem and supplied data, so it is not documentably self-scoped, and no assessment requires students to identify their own knowledge gaps. Resolved down to 2.",
      "C5 straddled levels 1 and 2. Methodology selection is genuinely assessed under hurdle conditions, but the second half of the level-2 anchor — data collection — is contradicted rather than merely absent, the capstone describing 'the data provided'. Resolved down to 1.",
      "W1 straddled levels 1 and 2. The 40-minute capstone oral presentation with a hurdle is substantial and the outcomes repeatedly promise communication to non-technical audiences, but no assessment line names a professional genre or an audience beyond the teaching team. Resolved down to 1 under R2 and the Barrie constraint on stated attributes.",
      "W2 was scored 2 on first pass and demoted to 1 on adversarial review. The level-2 anchor is conjunctive and the 'judged against criteria drawn from professional practice' clause fails outright — no marking criteria or rubrics appear anywhere in the extract — while the artefacts (syndicate research report, reflection essay) are academic genres rather than the practitioner's deliverable. The first-pass reasoning treated the missing criteria as 'undocumentable rather than evidence against', which inverts R1 and is inconsistent with its own C5 treatment. Supporting lines also came from capstones marked 'Not available in 2026', from an elective rather than the core, and from an R4-barred 'real-world case studies' label.",
      "Course-structure caveat affecting C4, C5, W2 and G1: the capstone evidence comes from subject pages flagged 'Not available in 2026' — all four Capstone options are listed as unavailable, as are three subjects in the compulsory and foundational-core lists, leaving the Research Pathway as the only project route actually on offer in 2026. Scored on the documented 2026 curriculum structure per R1, with the availability note recorded here rather than used to lower scores.",
      "Core membership is itself partly elective: 50 points are chosen from six listed foundational-core subjects (75 points) and 50 from five listed compulsory subjects (62.5 points), so a given student may not take every subject cited above. Only AI and Ethics in Analytics and Analytics for Business Decisions appear on both lists, and the C3 score depends on the former being taken.",
      "C1 versus W1 boundary: the syndicate presentations were scored once only, in W1 as communication, not again in C1 as coordination, per the one-construct-one-home rule."
    ],
    "notScoreable": [
      "BUSA90504 Individual Research Project — the only capstone or research-pathway subject actually available in 2026 — has no overview, outcomes or assessment page in the extract. Its contribution to C4 (self-scoped project), C5 (primary evidence generation and methodology defence) and W2 could not be assessed, and it is the single most likely source of upward revision if captured.",
      "BUSA90573 Investment Analytics Project and BUSA90579 Applied Business Analytics Project have no subject or assessment pages in the extract; the capstone evidence rests on the two project subjects that were captured (BUSA90572, BUSA90574).",
      "No marking criteria or rubrics appear anywhere in the extract, so the 'judged against criteria drawn from practice' clause of W2 level 2 and the 'criterion-referenced' clause of C2 level 2 could not be verified from documentation for any subject."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-arch": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied: more than one core unit assesses collaborative practice with individual accountability — Applied Architectural Technology runs three graded group submissions alongside a hurdled individual detailing task, Architectural Practice assesses a group submission on project initiation and procurement, and Introduction to High-Performance Design assesses a group interim proposal. Not level 3: although assessed collaboration recurs across the core, the second conjunct fails — no core assessment requires coordinating work across people AND tools/AI systems, and nothing documents role-and-tool allocation or makes the division of work between people and systems itself assessable. Placement/community evidence is deliberately excluded here and scored in W3 (one construct, one home).",
      "evidenceLines": [
        "Group Project Submission 1 (3 students per group) | 3x A1 sheets",
        "Individual Project Detailing , 3x A1 sheets",
        "Group Project Submission :Letters and reports on project initiation and procurement scenarios",
        "Assignment 2: Interim proposal (group work – 2‐3 students), 4 x A2 size panels",
        "Assignment 3 : Final proposal oral presentation (group work: 2‐3 students, 500 word equivalent per student )",
        "The ability to work individually and collaboratively to prepare and deliver a design project."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied by assessment evidence, not outcomes: the core design studios require hurdled booklets in which students critically evaluate their own developing design and document attainment against an external standard — the National Standard of Competency for Architects Performance Criteria — which is criterion-referenced appraisal of quality against published standards. Held at 2 rather than 3: the level-3 anchor needs documented and justified reliance decisions (on a tool, source or collaborator), defence of AI-output quality, or evidenced strategy adjustment over time. The booklets document and reflect upon iterative design exploration, which is close to the process-focused route, but 'strategy adjustment' and any reliance decision are nowhere named in the extract, so the lower level is taken per the ambiguity rule.",
      "evidenceLines": [
        "Booklet (Final): Re-submit revised and developed booklet containing evidence of application of Indigenous cultural competencies, knowledge of relevant architectural precedents and theories, design research to the design challenge; as well as iterative exploration and critical evaluation of the developing design. Format: A5 digital book, 96 pages +/-10% (inclusive of interim submission)",
        "Hurdle requirement: A pass is required to pass overall subject.",
        "Booklet (Interim): Document and reflect upon iterative design exploration and disciplinary research; and, document understanding of and engagement with relevant professional knowledge, in particular the following National Standard of Competency for Architects (NSCA) Performance Criteria (PC) PC3, PC12, PC16, PC18, PC23, PC24",
        "Booklet (final): Booklet with completed and finalised tasks demonstrating attainment of NSCA Performance Criteria PC10, PC28, PC31, PC33, PC35, and PC45."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor — AI appears as electives and digital content appears at the level of tool operation. AI is named in a core learning outcome in Architectural Practice, but R2 binds: that subject's four assessment tasks (procurement letters, contract-administration letters, class participation, invigilated exam) nowhere document AI or digital-technology content being assessed, so an outcome statement cannot carry level 2. Dedicated AI and machine-learning content sits in the architecture electives (AI in Architectural Design and Practice; Computational Design and Optimisation), and the core studios introduce 'digital tools' as technique support. Not level 2: no core unit is documented as addressing AI capabilities AND limitations/ethics with use-with-limits assessed; not level 3: no core assessment requires critique or governance of AI systems (bias, accountability, transparency, regulation, data governance).",
      "evidenceLines": [
        "Investigate and assess the impacts of disruptive change to the profession, such as new technologies, artificial intelligence and climate change, on architectural practice workflows, and business.",
        "Invigilated written exam",
        "ABPL90452\tAI in Architectural Design and Practice",
        "Apply a variety of optimisation and machine learning techniques to solve design problems",
        "Seminar series, workshops and/or online modules will introduce students to design theories, design techniques and digital tools related to the design challenge(s), as a creative and intellectual counterpoint to design-led exploration in-studio."
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3 anchor — the program documents structured progression toward independent learning through a self-scoped capstone, and it is carried by assessment rather than outcome statements. Design Thesis is a required core capstone named in the course structure; students scope their own research question and thesis statement in an assessed Week 4 proposal, refine it in an assessed Week 8 interim crit, and are hurdled on a resolved thesis that explores that self-set question, with the studios explicitly framed around self-directed research inquiries. The staging (proposal to interim to resolved, each separately weighted) is the documented progression the anchor asks for. Ambiguity noted: 'opportunities for' is hedged language, but the assessed proposal task applies to all students in the subject.",
      "evidenceLines": [
        "250 points of core subjects (including the capstone subject: ABPL90169 Design Thesis).",
        "These studios will allow opportunities for self-directed research inquiries/projects.",
        "Preliminary Thesis Proposal: Oral presentation (7 minutes) of research questions, accompanied by critical evaluation of relevant precedents from practice and research, and a draft 'thesis statement'",
        "Hurdle requirement: Must pass Resolved Design to pass the subject",
        "The ability to prepare, structure, schedule, evaluate and deliver a substantial research or design-research project."
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor — students design and conduct an inquiry that is assessed: the Design Thesis interim crit assesses a refined research question supported by site investigations, concept test models and multi-media experiments 'as appropriate to the research', and the core studios assess the application of design research techniques to explore a site's context. Held at 2 rather than 3 despite the capstone being required and reviewed in stages: the extract does not document that the project must generate primary evidence, nor that methodology itself is defended under scrutiny — the crits are described as design crits on the design, and no viva, methodology defence or data-collection requirement appears. Two of the three level-3 limbs are met and one is unevidenced, so the lower level is taken.",
      "evidenceLines": [
        "Interim design: Design crit comprising oral presentation (7 minutes) of refined research question accompanied by representations of design-in-progress, that might include including site investigations, sketches, drawings, maquettes, concept test models and/or digital multi-media experiments, as appropriate to the research.",
        "Resolved Design: Fully resolved architectural design thesis that explores the research question presented in two forms: A5 digital book that records the research investigation through text and visual representations that may include drawings, digital multi-media and physical models as appropriate to the design; and Design crit (10 minutes)",
        "Demonstrate an understanding of design as a form of research enquiry.",
        "Apply design research techniques to iteratively explore the socio-cultural, environmental, economic, political and legal context of a site.",
        "A knowledge of research and design-research methodologies and methods, including empirical and advanced research methods drawn from the sciences and humanities relevant to the discipline of architecture."
      ]
    },
    "adaptiveness": 10,
    "W1": {
      "score": 2,
      "rationale": "Level 2 anchor — at least one core assessment requires a recognised professional genre: Architectural Practice assesses individually written letters and reports on contract-administration scenarios, in a subject whose criteria are drawn from professional practice (professional conduct responsibilities, liability, duty of care, regulatory obligations), and Design Studio C assesses a concept presentation whose representations must suit consultation with clients, stakeholders and users. Not level 3: the second conjunct fails. Professional communication does recur across the studios and thesis, but no core assessment is documented as delivered to or judged by a real external audience or practitioner — the studio 'clients' are in scare quotes, the crits are internal, and no industry panel, public exhibition or external client judging is named; nor is professional conduct explicitly listed among the assessed criteria of any single task.",
      "evidenceLines": [
        "Individual Project Submission: Letters and reports on contract administration scenarios",
        "Interpret and apply the architect's professional conduct responsibilities, including liability, duty of care, and other regulatory obligations, in both traditional and new forms of architectural services and evolving legal, environmental and social standards.",
        "Concept Design: Design submission and verbal/visual presentation (7 minutes). Representations of the architectural design appropriate for consulting with 'clients'/stakeholders/users. Format: Concept model(s), 2 x A2 dwgs, or 10 pptx slides",
        "Class Participation: in-class weekly interactive oral assessment related to the topics of the lectures.",
        "Communicate the design vision in a clear and professional manner ."
      ]
    },
    "W2": {
      "score": 3,
      "rationale": "Level 3 anchor — both conjuncts are documented in assessment. First, professional-fidelity tasks are the assessment spine, not a single instance: three 25-point core design studios (C, D, E) plus the 25-point capstone thesis each require the artefact a practitioner produces (resolved design drawings, models and documentation) under hurdle conditions, with earlier scaffolding in Applied Architectural Technology's staged design-development submissions. Second, at least one carries a genuine constraint of practice measured by the profession's own standards of performance, not a label: Studio E's resolved design and final booklet are assessed against named NSCA Performance Criteria, Studio D requires integration of NSCA spatial requirements and the Building Code of Australia, and Studio C's briefs are set on sites with legal and political complexity. Per R4 no credit is taken from the word 'real-world'; only the documented task features are scored. Appraisal of quality is excluded here and scored in C2.",
      "evidenceLines": [
        "Resolved Design; Design submission comprising oral presentation accompanied by representations appropriate for the design, and may include drawings, documentation of process work, digital multi-media, and physical models. NSCA Performance Criteria PC39 is met",
        "Architectural designs produced by students will be expected to integrate selected spatial requirements set out in the National Standards of Competency for Architects (NSCA) and in the Building Code of Australia (BCA) and consider environmental and ethical impact.",
        "Resolved Design: Design submission and verbal/visual presentation (10 minutes). Representations appropriate to show architectural design resolution. Format: equivalent to 2sqm (min) – 3sqm (max) of pin-up space; and model(s) - physical or digital.",
        "Hurdle requirement: completion of the Design presentation and a pass in the Resolved Design is required to pass the subject.",
        "Common to all studios will be sites that have cultural, environmental, political and legal complexities which designs will need to address.",
        "Students explore and translate their own complex design propositions into an architectural proposal that considers:"
      ]
    },
    "W3": {
      "score": 1,
      "rationale": "Level 1 anchor — work-situated learning exists only as an elective. Neither core list (the 100-point first-year core, the 150-point second/third-year core, or the 250-point core of the 300-point program) contains a placement, practicum or community-based unit; the only community-based, off-campus offering, Bower Studio - Community Development, sits in the 25 points of architecture electives, and the workplace component of professional formation is explicitly located after graduation. Not level 2: no core unit places students in a real workplace or professional-community setting with practitioner supervision and assessment. Simulated client work in the studios is excluded here by construction and scores in W2.",
      "evidenceLines": [
        "ABPL90152\tBower Studio - Community Development",
        "Winter Term (Off Campus)",
        "25 points of architecture electives.",
        "250 points of core subjects (including the capstone subject: ABPL90169 Design Thesis).",
        "In addition, professional experience post-graduation is required to sit the registration examination."
      ]
    },
    "workplace": 6,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents an all-compulsory specialist core inside an accredited sequence with staged depth: 250 of 300 points (or 150 of 200) are core, the core is a lettered design-studio progression (Studio A/B, then C, D, E) terminating in a required capstone thesis, and the whole sequence is the accredited academic requirement for architect registration with the ARBV and recognised by the RAIA and the Commonwealth Association of Architects. Content is disciplinary and non-interchangeable, so the FAIL condition (generic content without disciplinary identity) does not apply.",
        "evidenceLines": [
          "The Master of Architecture requires the successful completion of 300 credit points.",
          "250 points of core subjects (including the capstone subject: ABPL90169 Design Thesis).",
          "Completion of a three-year Bachelors degree in Architecture + the 2-year (entry point) of the Master of Architecture OR the 3-year (entry point) of the Master of Architecture meets the academic requirements for registration as an architect under the Architects Registration Board of Victoria.",
          "The Master of Architecture is recognised for graduate membership to the Royal Australian Institute of Architecture (RAIA) and verified by Commonwealth Association of Architects."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment requires defended trade-off decisions and capstone-scale work with real uncertainty. Architectural Practice requires students to evaluate procurement and contractual options and determine strategies balancing scope, cost, time and quality, and assesses that in scenario letters and reports plus a hurdled exam; the core studios set ill-defined briefs on sites with cultural, environmental, political and legal complexity, require critical evaluation of results against context and stakeholder needs, and defend the outcome in hurdled design crits. Recall-and-script-only would fail; that is not what is documented.",
        "evidenceLines": [
          "Analyse and evaluate diverse procurement methods and contractual relationships, to determine appropriate strategies for managing project scope, cost, time and quality.",
          "Engagement with unexpected problems by identifying relevant solutions and risk mitigation strategies",
          "Critically evaluate results in relation to the environmental and socio-cultural context, stakeholder needs and relevant design practices and theories.",
          "Common to all studios will be sites that have cultural, environmental, political and legal complexities which designs will need to address.",
          "Critically evaluate design outcomes in relation to relevant professional practices."
        ]
      }
    },
    "ambiguities": [
      "C2 straddled 2 and 3: the studio booklets are process-focused, hurdled and repeatedly submitted ('Document and reflect upon iterative design exploration'), which approaches the level-3 'evidence strategy adjustment over time' route, but no reliance decision on a tool, source or collaborator is named and 'strategy adjustment' is not documented. Lower level taken per the ambiguity rule.",
      "C3 straddled 1 and 2: AI appears in a CORE learning outcome (Architectural Practice: impacts of new technologies and artificial intelligence on practice), which reads toward level 2, but none of that subject's four assessment tasks documents AI content being assessed. R2 (a capability in outcomes but never assessed scores 1) plus the lower-level rule resolved this to 1.",
      "C4 straddled 2 and 3: 'These studios will allow opportunities for self-directed research inquiries/projects' is hedged, which would suggest self-scoping is one route among several. Resolved upward to 3 only because the assessed Preliminary Thesis Proposal requires every student to present their own research questions and draft thesis statement, and the resolved thesis is hurdled on exploring that question — i.e. the level-3 anchor is met by assessment evidence, not by the hedged sentence.",
      "C5 straddled 2 and 3: the Design Thesis is required (not one route among several) and is reviewed in supervised stages at Weeks 4, 8 and final — two of the level-3 conditions — but the extract documents design crits on the design rather than a defence of methodology, and does not require primary-evidence generation or data collection. Lower level taken.",
      "The Design Thesis evidence legitimately bears on C4 and C5. Split under 'one construct, one home': the self-scoping and staged progression toward independent work score in C4; the research-question inquiry and investigation score in C5. No line is used for both.",
      "The Architectural Practice letters-and-reports tasks bear on C1 and W1. Split: the group submission (collaboration with individual accountability) scores in C1; the individual submission (professional genre) scores in W1.",
      "W3 relies on the elective title 'Bower Studio - Community Development' and its off-campus delivery; the subject page is not in the extract, so its work-situated character is inferred from the structure listing. This cannot change the score, since it is an elective and no core placement exists — the item is capped at 1 either way."
    ],
    "notScoreable": [
      "The 300-point program's first-year core subject pages are absent from the extract — ABPL90284 Master of Architecture Studio A, ABPL90285 Master of Architecture Studio B, ABPL90286 Construction Methods, ABPL90287 Design and Construction, ABPL90288 Architectural Cultures 1: Modernism and ABPL90289 Architectural Cultures 2: After Modernism appear in the structure but have no overview or assessment page. All items were therefore scored on the shared 150/250-point core (Studios C, D, E, Design Thesis, Architectural Practice, Applied Architectural Technology, Introduction to High-Performance Design, Twenty-first Century Architecture) plus the documented electives.",
      "The elective ABPL90452 AI in Architectural Design and Practice has no subject or assessment page in the extract, so nothing beyond its existence and elective status could be scored for C3.",
      "ABPL90430 Design with Country: Resilience Studio, named in the structure note as an approved substitution, has no page in the extract and was not scored."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-ba": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2's anchor — 'At least one core unit assesses collaborative practice' — is met many times over: syndicate assignments carry marks in every core subject (General Management 1 and 2, Operations, Managing People, Immersive Business Experience), several with documented individual accountability inside the group ('700 words individual with 4 – 5 students in a group'). Level 3 is a conjunction and its second conjunct fails: no core assessment documents coordinating work across people AND tools/AI systems, and nowhere is the division of work between people and systems itself assessed. The one subject about AI-plus-team work, Generative AI for Business, sits in the elective list, so it cannot carry a core-recurrence claim. Scored at 2, not 3, on the missing human-plus-tool allocation evidence.",
      "evidenceLines": [
        "Business Foundations: Syndicate assignment and presentation ; Equivalent to 700 words individual with 4 – 5 students in a group",
        "People Management: Syndicate presentation and report; 800 words individual with 4 – 5 students in a group",
        "Syndicate case assignments; (4 - 5 students in each group)",
        "Working in teams, students will apply the skills learned in the programs to identify managerial problems in an ambiguous context, plan and perform appropriate analysis, and derive creative insights that lead to potential solutions, and engage with the relevant stakeholders to drive towards a practically optimal solution."
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Level 1's anchor is squarely satisfied: reflection and self-assessment appear in outcomes (the capstone exists 'to help you reflect upon your learning', PEP outcomes name identifying one's own skill gaps), and reflection is even given assessment weight in Immersive Business Experience. Level 2 requires core assessment to include criterion-referenced appraisal of quality — peer review, structured critique, portfolio with standards, marking against exemplars. The nearest candidate is the PEP 'peer and instructor evaluation of contribution to class learning', but the extract documents no criteria and the object appraised is class contribution, not the quality of work; the reflection piece likewise has no documented standards. Under R1 (score what is documented) and the lower-level rule this resolves down to 1. Level 3 (documented, justified reliance decisions on a tool, source or collaborator) has no evidence anywhere in the extract.",
      "evidenceLines": [
        "Personal Effectiveness 1: Contribution to class learning (attendance at skills workshops, peer and instructor evaluation of contribution to class learning)",
        "Have identified communication, career development, and team skills that need improvement",
        "The purpose of this final subject at Melbourne Business School is to help you reflect upon your learning and MBA experience",
        "Integrate peer advice more fully into charting one's professional career",
        "Individual assignment – Reflection Piece"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1's anchor — 'AI or digital tools appear only as electives or as tool operation/training' — describes this program exactly. Every subject with AI content (Generative AI for Business, Leading Data and AI Transformation, Human Resources Analytics for Leaders, Marketing Communications) sits in the 75-credit-point elective list that students choose six subjects from, so none is guaranteed. The only core digital content is the Data Analytics topic inside General Management 1, which is quantitative-method training: regression, statistical models, robustness of data analyses. Level 2 requires core units to address AI capabilities AND limitations/ethics; the core addresses limitations of data analysis, never of AI, and no core unit documents AI content at all. The governance material that would otherwise support level 3 ('Analyse governance, risk, and organisational challenges in GenAI adoption') is in an elective and so cannot be scored above level 1.",
      "evidenceLines": [
        "MBA students must complete six elective subjects, chosen from a list of subjects. Not all elective subjects are offered each academic year.",
        "Analyse governance, risk, and organisational challenges in GenAI adoption.",
        "Evaluate the robustness and appreciate the limitations of data analyses",
        "This subject provides the fundamental quantitative skills necessary for an MBA student to extract information from data, through quantitative analysis, to make better managerial decisions."
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2's anchor — 'At least one core assessment requires application to novel or unfamiliar problems' — is met by the core Immersive Business Experience, where teams take an externally supplied business problem, must isolate it 'in an ambiguous context', and are assessed on it at 90% with a hurdle; the problem is not the taught case and the transfer of MBA frameworks to it is the assessed act. Level 3 requires the program to document structured progression toward independent learning — a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps with a plan to close them. The MBA Capstone is a reflective career subject, not a self-scoped inquiry; the only self-scoped research route, Individual Research Project, is an elective and so is not program-level structured progression; and the PEP gap-identification appears as an outcome statement, which R2 forbids scoring. Held at 2.",
      "evidenceLines": [
        "In this project-based subject, students will work with businesses to address real managerial problems using frameworks and concepts acquired during the MBA program.",
        "identify and isolate problems in an ambiguous context and recognise whether these problems should be approached from a disciplinary, functional or general management perspective using the tools acquired during the course",
        "Syndicate assignment; Students are required to have regular meetings with the facilitator at different stages of their project to seek feedback and guidance with regards to their progress",
        "Individual Research Project"
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1's anchor — an introductory methods unit — is met by the Data Analytics topic in core General Management 1, which teaches and examines regression, statistical modelling from ambiguous business problems, and the limits of analysis. Level 2 requires students to design and conduct an inquiry with methodology selection AND data collection, assessed. The core comes close but stops short: Immersive Business Experience asks teams to 'plan and perform appropriate analysis', which is analysis of a supplied problem with no documented methodology selection or primary data collection. The one subject that clearly documents primary data collection, Marketing Research with its field project and survey instrument, is an elective. Ambiguous between 1 and 2 and resolved down. Level 3 (a required substantial primary-evidence project defended under scrutiny) has no support.",
      "evidenceLines": [
        "Undertake regression analysis to quantify complex relationships between multiple explanatory variables and a response variable",
        "Construct relevant statistical models from ambiguous business problems",
        "This subject provides the fundamental quantitative skills necessary for an MBA student to extract information from data, through quantitative analysis, to make better managerial decisions.",
        "plan and perform appropriate analysis"
      ]
    },
    "adaptiveness": 7,
    "W1": {
      "score": 2,
      "rationale": "Level 2's anchor — 'at least one core assessment requires a recognised professional genre or an audience beyond the teaching team' — is met by Immersive Business Experience, whose assessed output is a consultancy report and presentation delivered to a real business client, with a matching outcome about communicating to business stakeholders. Level 3 is a three-part conjunction. The first two parts are arguably met (PEP runs across both core modules with assessed presentations in each, and the client is a real external audience), but the third fails outright: nowhere does the extract put professional conduct or accountability explicitly among the assessed criteria — the assessment lines give word counts, weights and hurdles and no conduct or accountability criteria at all. Per R4 and R1 the client framing alone cannot lift the score. Held at 2.",
      "evidenceLines": [
        "The analysis and proposed solutions will be presented to the business client in a format appropriate for the project, which usually takes the form of a report and presentation to the client.",
        "present and communicate effectively their work and solutions to business stakeholders",
        "The “Personal Effectiveness Program” (PEP) runs across the two core modules and is designed to help students develop the skills and knowledge required to effectively manage the early stages of their career.",
        "Personal Effectiveness 2: Syndicate presentation; Staggered through the subject; 400 - Words (equivalent) individual with 4 – 5 students in a group"
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2's anchor — 'at least one core assessment reproduces a professional task end to end: a real or realistic problem, producing the artefact a practitioner would produce' — is met once, by Immersive Business Experience: a real client, a real managerial problem, and the report-and-presentation a consultant would actually produce. Level 3 requires such tasks to be the program's assessment spine rather than a single instance. They are not. The core assessment spine is syndicate case work plus hurdle final examinations at 35–50% in Operations, Managing People, Financial Reporting & Analysis, Finance, Marketing Management, Economics for Managers and Data Analytics — level-1 contextualised case tasks whose artefacts and criteria stay academic, sitting alongside closed examinations. The level-3 second conjunct (a genuine constraint of practice) is independently satisfied by the ambiguous, externally supplied client problem, but the spine conjunct fails, so the item cannot rise above 2.",
      "evidenceLines": [
        "In this project-based subject, students will work with businesses to address real managerial problems using frameworks and concepts acquired during the MBA program.",
        "The analysis and proposed solutions will be presented to the business client in a format appropriate for the project, which usually takes the form of a report and presentation to the client.",
        "People Management: Final exam",
        "Financial Reporting & Analysis: Final examination",
        "Syndicate case assignments; (4 - 5 students in each group)"
      ]
    },
    "W3": {
      "score": 1,
      "rationale": "Demoted from 2 to 1 on adversarial verification. Level 2 is a conjunction: a core unit that places students in a real workplace or professional-community setting WITH PRACTITIONER SUPERVISION and assessment. The practitioner-supervision conjunct fails on the extract's own words — the only documented supervision of Immersive Business Experience is 'regular meetings with the facilitator at different stages of their project', a Melbourne Business School facilitator rather than a practitioner in the host organisation, and no accountability to the host is documented anywhere. The first pass resolved this ambiguity upward, which the non-negotiable lower-level rule forbids, and it applied strict conjunction-failure logic at C1 L3, C4 L3, W1 L3 and W2 L3 while relaxing it here; R1 (score what is documented) requires consistency. Level 1's anchor has affirmative support: 'MBA Internship' (25 credit points) sits in the elective list and is exactly the optional internship level 1 describes. The demotion also repairs the one-construct-one-home strain, since Immersive Business Experience already scores in W2 (task fidelity) and W1 (client audience) and the extract never documents students being placed IN the business's setting, only working with businesses as clients.",
      "evidenceLines": [
        "MBA Internship",
        "Elective Subjects",
        "Syndicate assignment; Students are required to have regular meetings with the facilitator at different stages of their project to seek feedback and guidance with regards to their progress",
        "In this project-based subject, students will work with businesses to address real managerial problems using frameworks and concepts acquired during the MBA program."
      ]
    },
    "workplace": 5,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents an all-compulsory specialist core — 150 of 225 credit points — with explicit progressive build-up rather than interchangeable content: General Management 1 states it prepares students for more advanced subjects, its Economics topic is named as the base that strategy, finance, marketing and negotiations build on, and its quantitative topic is named as the foundation for advanced MBA subjects. The core runs as a staged sequence (General Management 1 → General Management 2 → functional core → Immersive Business Experience → Capstone) with the Personal Effectiveness Program threading both core modules. That is a coherent management core with documented methodological depth, not generic content.",
        "evidenceLines": [
          "Students must complete the core subjects which account for a total of 150 credit points in the full-time MBA program.",
          "The skills and knowledge gained in this subject also prepare students for more advanced subjects in the MBA program, which will further enhance their business acumen and leadership capabilities.",
          "Many subjects—and in particular business strategy, finance, marketing, and negotiations—build upon the material learned in Economics for Managers.",
          "The fundamental quantitative skills from this subject provide a foundation to the advanced subjects within the MBA and provide students an analytical framework towards solving managerial problems in their career."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The gate's 'live projects with real uncertainty and accountability' route is met by the core Immersive Business Experience: students must identify problems in an ambiguous context, balance creativity against practicality, and drive with stakeholders toward a practically optimal solution, assessed at 90% under a hurdle. The core Data Analytics topic adds assessed trade-off reasoning by requiring statistical models to be constructed from ambiguous business problems and optimal decision strategies and risks to be identified. This is well beyond recall or scripted response.",
        "evidenceLines": [
          "identify managerial problems in an ambiguous context",
          "recognise the complexity of the context and appreciate that solutions to managerial problems require a balance between creativity and practicality",
          "Hurdle requirement: students are required to pass the assessment to pass the subject",
          "Construct relevant statistical models from ambiguous business problems",
          "Apply quantitative methods and analyses to identify optimal decision strategies and risks"
        ]
      }
    },
    "ambiguities": [
      "C2 straddled levels 1 and 2. 'peer and instructor evaluation of contribution to class learning' is assessed peer evaluation inside two core modules, which reads onto the level-2 exemplar 'peer review', but the extract documents neither criteria nor appraisal of the quality of work (it appraises class contribution). Resolved DOWN to 1 by the lower-level rule plus R1.",
      "C2 also straddled on the assessed 'Individual assignment – Reflection Piece' and the four hurdle-bearing capstone reflection assignments: reflection carries marks, which is more than level 1 describes, but no standards or exemplars are documented, so it does not reach 'criterion-referenced appraisal of quality'. Resolved DOWN.",
      "C4 straddled levels 2 and 3 because 'Individual Research Project' (25 credit points) is a genuine self-scoped research route, but it appears only in the elective list. Resolved DOWN to 2: level 3 requires the PROGRAM to document structured progression, which one elective among thirty-odd cannot do.",
      "C5 straddled levels 1 and 2. 'plan and perform appropriate analysis' in the core client project is close to methodology selection, and the elective Marketing Research documents a full field project with a survey instrument, but no CORE assessment documents methodology selection with data collection. Resolved DOWN to 1.",
      "W1 straddled levels 2 and 3. Two of the three level-3 conjuncts hold (PEP presentations assessed across both core modules; a real client audience for the Immersive Business Experience). The third — professional conduct or accountability explicitly among the assessed criteria — is nowhere documented, so the conjunction fails and the score stays at 2.",
      "W2 straddled levels 2 and 3. The level-3 'genuine constraint of practice' conjunct is clearly met (externally supplied, ambiguous client problem with a consequential audience), but the 'assessment spine' conjunct is not: hurdle final examinations at 35–50% dominate the core. Resolved DOWN to 2.",
      "W3 straddled levels 1 and 2 and is resolved DOWN to 1 on adversarial verification. Level 2's conjunction requires practitioner supervision; the only documented supervision is 'regular meetings with the facilitator', an MBS facilitator rather than a practitioner in the host organisation, and no accountability to the host is documented. Level 1 has affirmative support in the elective 'MBA Internship'. The first pass declined the lower level on the ground that Immersive Business Experience is core and assessed, but the lower-level rule and the conjunction-failure logic applied at C1, C4, W1 and W2 govern.",
      "C1 vs W1 boundary: the Immersive Business Experience client report is teamwork AND external communication. Per 'one construct, one home' the client-audience communication is scored in W1 only, and C1 rests on the recurring syndicate assessment across the core.",
      "W2 vs W3 boundary: Immersive Business Experience supplies evidence to W2 (fidelity of the task — real client problem, consultant's artefact). It does not carry W3, because the extract documents students working WITH businesses as clients, never being placed IN a business's setting under practitioner supervision."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-base": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Meets the level-2 anchor: multiple core units assess collaborative practice as syndicate work in groups of 4-5 with a per-student word allocation, i.e. group tasks with individual accountability, and 'Collaborate with real business partners' sits in the program outcomes. Level 3 is not reached because no assessment in the extract requires coordinating work across people AND tools/AI systems — there is no documented role-and-tool allocation, and nothing where the division of work between people and systems is itself assessed. Under v4.1 the placement/live-project route to C1 level 3 has moved to W3, so the Senior Executive Project's workplace character is not scored here.",
      "evidenceLines": [
        "Data Driven Decision-Making: Syndicate assignment. 800-words each student with 4-5 students in each group.",
        "Developing Strategy: Strategic challenge presentation (group of 4 - 5 students)",
        "Organisational Behaviour: Syndicate Assignment (group of 4-5 students)",
        "Ethical Leadership: Case preparation and syndicate case discussion (group of 4 – 5 students)",
        "Work effectively in diverse teams",
        "Collaborate with real business partners to apply knowledge in projects"
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Reflection is named in component outcomes and appears as assessed tasks, but the extract nowhere documents criterion-referenced appraisal of the quality of work — no peer review against criteria, no structured critique, no portfolio judged against standards, no marking against exemplars. The assessed reflection pieces are reflection on ethical dilemmas and on a field study, not appraisal of work quality, so the level-2 anchor is not satisfied on documented evidence (R1). Level 3 is far off: nothing requires students to document or justify reliance decisions on a tool, source or collaborator. Evidence straddles 1 and 2; resolved down per the lower-level rule.",
      "evidenceLines": [
        "Ethical Leadership: Written Reflection Assignment",
        "Individual reflection piece",
        "Develop reflection and influencing skills to leverage advanced leadership models and analytical tools for addressing complex organisational issues",
        "You will undertake a leadership diagnostic to understand your areas of strength and areas for leadership capability development for you to focus upon throughout the program.",
        "In this final module, students will present the outcomes of their project to faculty, industry mentors and peers, receiving feedback on the process and findings of their work."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Digital content in the core is strategic and analytic rather than governance-focused: data analysis technique and modelling in Foundations of Decision-Making, and emerging-technology strategy in Technology & Innovation. Level 2 requires core units to address AI capabilities AND limitations/ethics with use-with-limits assessed; the extract documents ethics of 'emerging technologies' generically and never documents AI capabilities or limitations, and AI appears only as one possible cohort theme ('such as ESG or AI'). Scoring the strategic-technology content up to 2 would infer AI treatment the handbook does not document (R1). Level 3 (critique or governance of AI systems in the discipline's context) has no assessment evidence at all.",
      "evidenceLines": [
        "It delves into key concepts such as disruptive innovation, digital transformation, and competitive advantage in the context of emerging technologies.",
        "Apply data analysis techniques and computational frameworks to evaluate business situations and support effective decision making.",
        "Critically evaluate the ethical responsibilities of organisations, including those related to social responsibility, supply chains, modern slavery and emerging technologies, in order to integrate ethical priorities into organisational purpose, strategic goals, and governance.",
        "Each cohort will focus on a specific, high-impact theme—such as ESG or AI—ensuring a deep, interdisciplinary exploration of a strategic challenge.",
        "Technology & Innovation: Individual assignment"
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Meets the level-3 anchor's self-scoped-project route with assessment evidence (R2): the Senior Executive Project is a student-scoped consulting/research project on an organisation of the student's own choosing, staged across five core subjects (I to V) with scoping, a viability pitch, budgeting, and a final individual assignment carrying a hurdle. The Leading with Influence strand additionally documents assessed identification of one's own development gaps and a plan to close them — a leadership diagnostic at entry and a career action plan presented at exit. This is structured progression toward independent learning, not merely application to novel problems (level 2). Only the self-scoping and gap-identification features are scored here; the project's workplace-participation features are scored in W3 and its task fidelity in W2.",
      "evidenceLines": [
        "This subject offers an action-learning opportunity where senior executive MBA students conduct research and provide consulting for their own or another organisation, addressing a current global issue.",
        "In this module, we set the foundation for the project by addressing topics essential for project delivery including project scoping, diagnosing organisational problems through data and insights, assessing organisational readiness for change and presentation skills.",
        "In this module, students will pitch their proposed projects for feedback from faculty, industry advisors and peers.",
        "Senior Executive Project: Individual Assignment",
        "2500 words (equivalent)",
        "Hurdle requirement: Students must pass this assessment in order to pass the subject.",
        "You will undertake a leadership diagnostic to understand your areas of strength and areas for leadership capability development for you to focus upon throughout the program.",
        "Working with industry mentors, you will refine your leadership brand and narrative for your future leadership roadmap, culminating in a presentation on your leadership journey to-date and action plan for your career."
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Meets level 2: a compulsory field-study subject requires students to design and conduct an inquiry — an industry consulting study in a developing Asian market — with primary research named in the outcomes and the inquiry assessed through a staged briefing, presentation and final report. Level 3 is not reached because the extract does not document that a substantial project generating PRIMARY evidence is required (the Asia outcomes pair primary with secondary research skills, and the Senior Executive Project is described as research-and-consulting without specifying primary data generation), and no methodology defence under scrutiny is documented — the project presentations are described as receiving feedback, not as a viva, defence or staged supervised methodological review. Ambiguity resolved downward.",
      "evidenceLines": [
        "The main deliverable in the subject is a detailed, highly-integrated research report describing a consulting study in one of the developing markets of Asia.",
        "Developed primary research skills as a basis for identifying challenges and opportunities confronting selected industries in diverse contexts",
        "Developed secondary research skills as a basis for identifying challenges and opportunities confronting selected industries in diverse contexts",
        "Syndicate initial project briefing",
        "Syndicate final report",
        "Apply data analysis techniques and computational frameworks to evaluate business situations and support effective decision making."
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 2,
      "rationale": "Meets level 2: core assessment requires recognised professional genres rather than only academic genres addressed to the marker — a syndicate project briefing, a consulting study report, and assessed syndicate presentations, plus a 15-minute interactive oral exam. Level 3 fails on both of its conjuncts: the appearances before industry advisors and mentors are documented as occasions for feedback, not as assessment items delivered to or judged by an external audience, and professional conduct or accountability is nowhere documented among assessed criteria — 'Communicate effectively, in oral, written and digital forms' is a stated generic skill, which Barrie forbids scoring (R2). Resolved down.",
      "evidenceLines": [
        "Syndicate initial project briefing",
        "Syndicate presentation (equivalent to individual 1000 word assessment)",
        "The main deliverable in the subject is a detailed, highly-integrated research report describing a consulting study in one of the developing markets of Asia.",
        "Data Driven Decision-Making: 15 minute interactive oral exam",
        "In this final module, students will present the outcomes of their project to faculty, industry mentors and peers, receiving feedback on the process and findings of their work.",
        "Communicate effectively, in oral, written and digital forms"
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 holds and level 3 does not (demoted on adversarial review). Level 2: core assessment requires students to produce the artefact a practitioner would produce on a real problem — the Industry Studies in Asia deliverable is a consulting study report on a real industry in a developing Asian market, and the Senior Executive Project is an action-learning consulting engagement in a real organisation, assessed through syndicate briefing, presentation and report. Level 3 fails on its second conjunct, a genuine constraint of practice documented in the assessment task itself (R4). The problem is student-selected rather than externally supplied ('their own or another organisation'; 'students will pitch their proposed projects'). The '7-day field study' descriptor is documented only for Industry Studies in America and Industry Studies in Europe, is absent for the Asia subject, and in any case describes the subject's delivery format rather than a constraint carried by an assessment task. The industry-advisor and mentor appearances are documented as feedback occasions, not as judged external assessment — the same reading applied in W1 and W3, so it cannot be read the other way here. Budgeting, financing and 'project viability and feasibility' appear only in module-description prose and in no assessment row. With the level-2 'criteria drawn from practice' element already read charitably (no assessment criteria are published anywhere in the extract), the extra level-3 conjunct cannot also be read charitably; ambiguity between 2 and 3 resolves down. Scored on task fidelity only — workplace participation is scored in W3 and appraisal of quality is excluded to C2.",
      "evidenceLines": [
        "The main deliverable in the subject is a detailed, highly-integrated research report describing a consulting study in one of the developing markets of Asia.",
        "This subject offers an action-learning opportunity where senior executive MBA students conduct research and provide consulting for their own or another organisation, addressing a current global issue.",
        "Syndicate initial project briefing",
        "Syndicate final report",
        "Syndicate project presentation (equivalent to individual 1000 word assessment)"
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Meets level 2 via the level-2 anchor's named 'live client project' exemplar: the Senior Executive Project is core and compulsory, sited in a real organisation, supported by industry partners and project mentors, and assessed with hurdle requirements. Level 3 is not reached: the extract documents no extended placement or practicum and no sequence of them, no accountability to a host organisation, and no structured reflection on professional practice attached to the project (the 5,000-word reflection hurdle belongs to the Asia field study, not to the project). The field studies are 7-day visit-based subjects, not supervised participation in a workplace. Resolved down.",
      "evidenceLines": [
        "This subject offers an action-learning opportunity where senior executive MBA students conduct research and provide consulting for their own or another organisation, addressing a current global issue.",
        "Emphasising collaboration with alumni and industry partners, students will engage with guest speakers and project mentors, enriching the learning experience and fostering connections to enhance the project’s impact.",
        "Senior Executive Project: Individual Assignment",
        "Hurdle requirement: Students must pass this assessment in order to pass the subject.",
        "In this final module, students will present the outcomes of their project to faculty, industry mentors and peers, receiving feedback on the process and findings of their work."
      ]
    },
    "workplace": 6,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "An all-compulsory specialist core: every one of the ten subjects is core, and the sequence is staged from Foundations of Decision-Making through leadership, value creation and uncertainty modules to a named consolidation subject, with the Leading with Influence and Senior Executive Project strands running I to V across it. This is a coherent core with progressive depth, not generic interchangeable content.",
        "evidenceLines": [
          "The total number of credit points is 225 and all subjects are compulsory core subjects.",
          "This program is specifically designed for senior executives with a minimum 10 years of management experience.",
          "In order to pass the subject, students are required to pass each component.",
          "In this module, we set the foundation for the project by addressing topics essential for project delivery including project scoping, diagnosing organisational problems through data and insights, assessing organisational readiness for change and presentation skills."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment goes well beyond recall or scripted response: a whole core subject is built on leading through uncertainty, component outcomes require decision-making under uncertainty, ambiguity and time pressure and the design of strategy for high-stakes auction and tender settings, and the live consulting project requires defended trade-off decisions about project viability, feasibility and financing under real organisational conditions. These sit behind hurdle-weighted individual assignments.",
        "evidenceLines": [
          "Apply insights from neuroscience and behavioural science to improve executive decision-making under uncertainty, ambiguity, and time pressure, particularly in high-stake environments.",
          "Design strategic approaches for high-stakes competitive environments, including auction and tender processes, to maximise value capture and strengthen the firm's market performance.",
          "The focus will be on assessing project viability and feasibility as well as how to improve on their presentation skills.",
          "Developing Strategy: Strategic challenge write-up",
          "Technology & Innovation: Individual assignment"
        ]
      }
    },
    "ambiguities": [
      "C2 straddled levels 1 and 2: assessed reflection tasks exist and carry hurdles (Ethical Leadership written reflection; 5,000-word individual reflection piece), but the extract never documents criterion-referenced appraisal of the quality of work — no criteria, exemplars, peer-review structure or standards are described anywhere in the handbook text. Resolved to 1 by the lower-level rule and R1.",
      "C3 straddled levels 1 and 2: core units do treat digital transformation, emerging technologies and the ethics of emerging technologies, which is more than the 'electives or tool operation' picture of level 1, but no AI capabilities or limitations content is documented, and AI appears only as one illustrative cohort theme. Resolved to 1 by the lower-level rule.",
      "C5 straddled levels 2 and 3: a required field-study inquiry with primary research skills in its outcomes and staged assessed deliverables would reach 3 if primary evidence generation were required and methodology were defended, but the outcomes pair primary with secondary research and the project presentations are described only as receiving feedback. Resolved to 2.",
      "W1 straddled levels 2 and 3: professional genres recur (briefing, consulting report, presentations, oral exam) and industry advisors and mentors are present, but their role is documented as feedback rather than assessment, and no conduct or accountability criterion is documented. Resolved to 2.",
      "W2 straddled levels 2 and 3 and was resolved to 2 on adversarial review (initially scored 3): no genuine constraint of practice is documented in an assessment task. The problem is student-selected rather than externally supplied; the '7-day field study' descriptor attaches only to the America and Europe subjects (not Asia) and describes delivery format, not an assessed constraint; the industry-mentor appearances are feedback rather than judged external assessment, consistent with the readings used in W1 and W3; and budgeting, financing and viability appear only in module prose, never in an assessment row.",
      "W3 straddled levels 2 and 3: the Senior Executive Project runs across five core subjects, which reads as extended, but it is a live client project rather than a placement or practicum, and neither accountability to a host nor structured reflection on professional practice is documented for it. Resolved to 2.",
      "One-construct-one-home applied to the Senior Executive Project, which is a single program feature with three separable documented aspects: its student-scoped, staged, gap-closing design scored in C4 (the self-scoped-project route that v4.1 leaves in C4); its task fidelity and practice constraints scored in W2; its siting in a real organisation with industry mentors scored in W3. No aspect was counted twice, and the project's collaborative-syndicate character was deliberately not used to lift C1 above the level it reaches on syndicate assessment alone.",
      "Assessment criteria are never published anywhere in this extract — every assessment row gives description, timing and percentage only. W1 level 2 and W2 level 2 each require criteria 'drawn from practice'; these were scored on the documented genre and task features instead, which is the most the handbook supports, and this charitable reading is one reason W2 could not also be read charitably at level 3."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-busana": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2's anchor — 'at least one core unit assesses collaborative practice — group projects with individual accountability' — is met many times over: syndicate assignments and projects are weighted assessment in Programming Foundations, Business Data Platforms, Decision Making and Optimisation, Statistical Learning, Causal Analytics, Predictive Analytics, Machine Learning & AI, NLP, Marketing Analytics, Supply Chain and Risk Analytics, and the Prof Dev route adds a group-work hurdle. Level 3 is not reached because its second conjunct is undocumented: no assessment in the extract requires coordinating work across people AND tools/AI systems, and no task allocates roles and tools or assesses the division of work between people and systems. Collaboration recurs, but the human-plus-tool coordination the anchor names is absent from every assessment description.",
      "evidenceLines": [
        "Syndicate Project (4 - 5 students per group)",
        "Syndicate assignment and presentation",
        "Syndicate assignment (4 - 5 students per group)",
        "Syndicate project",
        "Project/group work involving negotiation strategies",
        "Apply Professional Standards - Students will critically evaluate and apply professional and ethical standards in the analysis of data - Students will reflect on their behaviour in teams and develop strategies to improve"
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Level 1's anchor — 'Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria' — fits: reflection is stated at course level ('reflect on their behaviour in teams and develop strategies to improve') and in Prof Dev I's outcomes ('Have identified ... skills that need improvement'), and reflective/reflection essays carry marks. Level 2 requires criterion-referenced appraisal of the QUALITY of work — peer review, structured critique, portfolio against standards, marking against exemplars — and none is documented: the extract records only essay length and weighting for every reflection task, with no criteria, no peer or exemplar comparison. Critique appears in Causal Analytics and Predictive Analytics outcomes ('critique and compare competing methodologies') but the assessment rows for those subjects are quizzes, syndicate assignments and hurdle exams, so R2 caps it at 1. Level 3 (documented, justified reliance decisions over a tool, source or collaborator) has no evidence anywhere in the extract.",
      "evidenceLines": [
        "Apply Professional Standards - Students will critically evaluate and apply professional and ethical standards in the analysis of data - Students will reflect on their behaviour in teams and develop strategies to improve",
        "Have identified communication, career development, and team skills that need improvement.",
        "Reflective Essay",
        "Reflection essay",
        "Apply appropriate modelling and forecasting techniques to business and economic contexts, and to critique and compare competing methodologies."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 2 requires core units to address AI capabilities AND its limitations/ethics, with use-with-limits discussed and assessed. The capabilities half is unambiguously core (Machine Learning & AI for Business, Natural Language Processing, Statistical Learning), but the limitations half fails on its own terms: the only AI-specific statement in the extract is 'an introduction to Generative AI within the context of programming' — tool-level exposure, which the migration note caps at level 1 — and nothing documents AI limitations, reliability bounds, or limits on relying on AI output. The ethics content that does exist is data ethics (cyber ethics, privacy, ethical concerns in data acquisition and storage), and the one assessment row that names it sits in BUSA90547, an alternative capstone route marked 'Not available in 2026'; in Programming Foundations ethics is an outcome only, its assessment rows being a mid-term test, a syndicate project and a hurdle exam, so R2 applies. Level 3 (critique or governance of AI systems — bias, accountability, transparency, regulation) is not assessed anywhere; the course outcome about 'ambiguities and bias in data' is an outcome statement, never sufficient under R2.",
      "evidenceLines": [
        "Topics such as cyber security, cyber ethics and privacy regarding the collection of individual data are also discussed. The subject also includes an introduction to Generative AI within the context of programming.",
        "Understand ethical issues regarding privacy and cyber security.",
        "Mid-term test",
        "Syndicate project",
        "Individual report on ethical concerns within data/analytics",
        "Graduate courseworkPoints: 12.5Not available in 2026",
        "Deal with ambiguity and uncertainty - Students will make appropriate judgements about how to proceed in an environment with incomplete information - Students will identify and be able to deal with ambiguities and bias in data"
      ]
    },
    "C4": {
      "score": 1,
      "rationale": "Demoted from 2 to 1 on adversarial verification. The level-2 case rested entirely on the Professional Development & Application II industry project (the 5-week group project using data in/from an industry setting, assessed by a hurdle syndicate research report), but that subject is the industry placement scored at W3=2, and the non-negotiable one-construct-one-home rule states categorically that placement evidence scores in W3, never in C1 or C4. With those lines barred, the residue is outcome statements only — 'Integrate the knowledge and skills acquired to conduct research in an industry setting ... apply to a business setting with real data' and 'Have identified communication, career development, and team skills that need improvement' — plus the approval-gated Research Pathway, which is not core. No assessment row in the ten taught subjects documents application to novel or unfamiliar problems, case variation, unseen datasets or cross-context projects; every row is a quiz, a word-counted syndicate assignment, a midterm or a hurdle final exam. That is level 1: transfer is claimed in outcomes but not assessed.",
      "evidenceLines": [
        "Integrate the knowledge and skills acquired to conduct research in an industry setting - Students will appropriately select one or more advanced analytical techniques to apply to a business setting with real data Application of Knowledge and Skills",
        "Have identified communication, career development, and team skills that need improvement.",
        "Research pathway",
        "*Note: Students who would like to take Research Pathway are required to acquire the approval of course coordinator prior to enrolment.",
        "Mid-term test",
        "Syndicate assignment (4 - 5 students per group)"
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Demoted from 2 to 1 on adversarial verification. Level 2's anchor is a conjunction — students design and conduct an inquiry with methodology selection AND data collection, assessed — and data collection by students is nowhere documented: the projects work on supplied industry data. A failed conjunct cannot support the level. The Causal Analytics evidence is subject-overview prose ('The gold standard for establishing causality is a randomised experiment...') and an outcome statement ('Be familiar with the key principles of experimental design' — familiarity is not designing an inquiry); its assessment rows are in-class quizzes, a 1500-word syndicate assignment and a hurdle exam, none described as an inquiry-design task, so R1/R2 apply. The only remaining candidate, the Prof Dev II syndicate research report, is placement evidence on supplied data with no documented methodology-selection requirement, and is in any case barred from C-scale application constructs by the one-construct-one-home rule. The first-pass reasoning that 'level 1 does not describe this program' resolved ambiguity upward, which the scoring-direction rule forbids. Level 1 stands: methods are taught and examined, but no assessed student-designed inquiry is documented outside the approval-gated Research Pathway.",
      "evidenceLines": [
        "Be familiar with the key principles of experimental design and how to analyse them.",
        "The gold standard for establishing causality is a randomised experiment, which is becoming more common in business contacts.",
        "In-class quizzes",
        "Syndicate assignment (4 - 5 students per group)",
        "Research pathway",
        "*Note: Students who would like to take Research Pathway are required to acquire the approval of course coordinator prior to enrolment."
      ]
    },
    "adaptiveness": 6,
    "W1": {
      "score": 2,
      "rationale": "Level 2's anchor — at least one core assessment requiring a recognised professional genre or an audience beyond the teaching team — is met by assessed professional genres in the Prof Dev sequence: a hurdle cover letter and CV, a business-case group presentation, a syndicate oral presentation, and a technical report written for a non-technical audience. Level 3 requires, in addition to progressive repetition, that at least one core assessment be delivered to or judged by a real external audience or practitioner. That is not documented: the industry project has 'an approved supervisor' but no assessment row states who receives or judges the report or presentation, and audiences are unspecified throughout. Professional conduct IS explicitly an assessed hurdle (the NDA/behavioural requirement), which is one of level 3's conditions, but the external-audience condition is unmet, so the conjunction fails and the score resolves down.",
      "evidenceLines": [
        "Communicate the results of technical analysis - Students will display effective verbal communication skills when making a presentation - Students will write reports on data analysis projects which can be understood by non-technical audiences - Students will develop graphs and data visualisations to effectively convey information",
        "Completion and Submission of Cover letter and CV",
        "Group presentation - business case (5 - 6 students in each group)",
        "Syndicate oral presentation",
        "Deliver a technical report appropriate for a non-technical audience.",
        "Behavioural requirement",
        "Hurdle requirement: Students must follow all agreements (such as Non-Disclosure Agreement) during the placement. Breach of conduct or any agreement will lead to a fail result in this subject or academic misconduct investigations."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2's anchor — at least one core assessment reproducing a professional task end to end — is met by the Prof Dev & Application II industry project: a real externally supplied problem using industry data under an approved supervisor, producing the artefacts an analytics practitioner produces (a technical report for a non-technical audience and a client-style oral presentation). Level 3 requires such tasks to be the assessment SPINE rather than a single instance; here the spine is examinations — every one of the ten taught subjects carries a hurdle final exam at 50-60% — with syndicate assignments whose fidelity the extract never describes beyond word count, weighting and group size. Supply Chain Analytics offers case studies, which is level 1 contextualisation, not an end-to-end professional artefact. Per R4 no credit is taken from the phrase 'real world'; only the documented features of the industry project are scored, and that is one instance.",
      "evidenceLines": [
        "This subject integrates academic learning and practical challenges in implementing data analytics via a 5-week group project using data in/from an industry setting",
        "Practicum skills: The completion of a 5-week project using data in/from an industry setting under an approved supervisor.",
        "Syndicate research report",
        "Deliver a technical report appropriate for a non-technical audience.",
        "exposure to real world logistics and supply chain decisions through case studies",
        "Mid-term test"
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Level 2's anchor — a core unit placing students in a real workplace or professional-community setting with practitioner supervision and assessment, but short or standalone — fits precisely: Prof Dev & Application II is an industry placement ('the preparation for industry placement occurring in Professional Development II'), the project runs in/from an industry setting under an approved supervisor, and it is assessed by a hurdle syndicate research report, an oral presentation and a reflection essay, with accountability to the host enforced by an NDA/conduct hurdle. Level 3 fails on substance and requiredness: the placement is five weeks in a 6.25-credit-point subject — short and standalone, not an extended placement or a sequence of placements (Prof Dev I is classroom career preparation, not work-situated) — and the ten-week version sits in BUSA90547, 'Not available in 2026'. The research pathway substitutes an individual research project for the placement entirely.",
      "evidenceLines": [
        "These areas are the preparation for industry placement occurring in Professional Development II",
        "Practicum skills: The completion of a 5-week project using data in/from an industry setting under an approved supervisor.",
        "Hurdle requirement: Students must follow all agreements (such as Non-Disclosure Agreement) during the placement. Breach of conduct or any agreement will lead to a fail result in this subject or academic misconduct investigations.",
        "Syndicate research report",
        "Reflection essay",
        "Practicum skills: The completion of a 10-week project using real data in/from an industry setting under an approved supervisor.",
        "Graduate courseworkPoints: 12.5Not available in 2026"
      ]
    },
    "workplace": 6,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The gate's PASS condition — a coherent specialist core with progressive technical or methodological depth — is documented. Ten compulsory analytics subjects are staged across March, May and October study periods, followed by a required capstone block, and depth is explicitly cumulative: Machine Learning & AI for Business 'builds on the material in Statistical Learning for Business and covers advanced analytic methods'. A prerequisite chain is stated for the capstone ('Successful completion of a range of core academic subjects as well as Professional Development I is a pre-requisite'). The content is disciplinary rather than interchangeable: statistical learning, optimisation, causal inference, forecasting, NLP, marketing, supply chain and risk analytics.",
        "evidenceLines": [
          "The knowledge and skills required to apply data analytic techniques to business problems are multi-disciplinary, drawing on mathematics, statistics, computer science, and business and economics.",
          "This component builds on the material in Statistical Learning for Business and covers advanced analytic methods.",
          "Successful completion of a range of core academic subjects as well as Professional Development I is a pre-requisite for this subject."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The gate's PASS condition — assessments requiring defended trade-off decisions, or live projects with real uncertainty and accountability — is met on both limbs. Decision Making and Optimisation teaches decision making under uncertainty and the trade-off between competing methods, assessed by a syndicate project, a midterm and a hurdle exam; Risk Analytics is built on the uncertainty inherent in risk management; and the course outcome requiring judgements 'in an environment with incomplete information' is realised in the assessed industry project, which carries genuine accountability through the NDA/conduct hurdle. This is well beyond recall or scripted response.",
        "evidenceLines": [
          "Topics covered may include decision making under uncertainty, optimal location allocation of resources in business processes, decision trees, linear programming, integer linear programming, and Monte Carlo simulations.",
          "Understand the most relevant methods and the trade-off between methods required to solve these models including: decision trees, linear programming, integer linear programming, local search and meta-heuristics.",
          "Deal with ambiguity and uncertainty - Students will make appropriate judgements about how to proceed in an environment with incomplete information - Students will identify and be able to deal with ambiguities and bias in data",
          "Understand the key challenges and appreciate the uncertainty that is inherent in risk management.",
          "Understand the key reasons that associations in non-experiment data may be spurious and to critique analyses that do not take this into account."
        ]
      }
    },
    "ambiguities": [
      "C2 straddled 1 and 2: reflective and reflection essays are marked assessment, not merely stated outcomes, which pulls toward level 2, but level 2 names criterion-referenced appraisal of the quality of work (peer review, critique, exemplars, standards) and the extract documents only word count and weighting for every reflection task. Resolved DOWN to 1 by the never-resolve-upward rule plus R2.",
      "C3 straddled 1 and 2: core subjects (Machine Learning & AI for Business, NLP) teach AI capability substantively, which is more than level 1's 'electives or tool operation', but level 2's conjunction requires limitations/ethics of AI use discussed AND assessed, and the only AI-specific content is 'an introduction to Generative AI', with the ethics content being data/privacy ethics assessed only in an alternative route subject marked 'Not available in 2026'. Resolved DOWN to 1 on the failed conjunct.",
      "C4 was scored 2 at first pass and demoted to 1 on adversarial verification: the level-2 case rested wholly on the Prof Dev & Application II industry project, which the one-construct-one-home rule reserves for W3 (placement evidence scores in W3, never in C1 or C4). What survives is outcome statements plus the approval-gated Research Pathway, neither of which documents assessed application to novel or unfamiliar problems.",
      "C5 was scored 2 at first pass and demoted to 1 on adversarial verification: level 2 requires methodology selection AND data collection, and the first pass itself conceded that student data collection is nowhere documented (projects use supplied industry data). The Causal Analytics support is subject-overview prose plus a 'be familiar with' outcome against quiz/assignment/exam rows, so R1/R2 apply, and the first-pass reasoning resolved ambiguity upward, which the scoring-direction rule forbids.",
      "Pathway structure affects C5, W1, W2 and W3 alike: the capstone is a choice between Risk Analytics plus Applied Business Analytics, Prof Dev & Application I+II, and the Research Pathway. Prof Dev II evidence was treated as core for the W-scale because it is the standard full-time route requiring no approval, whereas the Individual Research Project was NOT credited at C5 level 3 because that anchor explicitly excludes 'one route among several' and the pathway requires coordinator approval.",
      "W1 straddled 2 and 3: the professional-conduct half of level 3 is explicitly satisfied by the NDA/behavioural hurdle, and communication is assessed more than once (Prof Dev I presentation, Prof Dev II presentation, ML & AI presentation), but no assessment row names a real external audience or practitioner as recipient or judge. Resolved DOWN to 2 on the unmet conjunct.",
      "W3 straddled 2 and 3: the placement carries practitioner supervision, assessment, host accountability and structured reflection — four of level 3's five features — but fails 'substantial/extended', being a five-week project in a 6.25-credit-point subject, with the ten-week variant unavailable in 2026. Resolved DOWN to 2.",
      "Applied Business Analytics (BUSA90547) is listed in the course structure yet its own page reads 'Not available in 2026'. Its evidence (10-week supervised industry project, ethics report hurdle, reflection essay) was therefore noted but not used to lift any score.",
      "R4 was applied to Supply Chain Analytics' 'real world' phrasing and to Prof Dev II's 'employability skills' framing: neither raised W2, which was scored only on documented task features."
    ],
    "notScoreable": [
      "Marking criteria and rubrics are published for no subject in the extract — every assessment row gives description, timing and percentage only. W1 and W2 therefore could not be tested against their 'judged against criteria drawn from professional practice' clause on documented evidence, and were scored on genre and task features alone; if criteria evidence were available, W2 in particular could move.",
      "No evidence bearing on C2 level 3 (documented, justified reliance decisions about a tool, source or collaborator; defence of AI-output quality; assessed strategy adjustment over time) appears anywhere in the extract — the construct is absent from this handbook rather than scored low.",
      "Audience and assessor identity for the Prof Dev II syndicate oral presentation and research report are not stated, which is the single fact that would decide W1 between 2 and 3."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-clind": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 1,
      "rationale": "Level 1 anchor exactly: 'Collaboration/teamwork appears in learning outcomes, but no core unit assesses it.' Team-work sits in the course ILOs and generic skills, and the 75cp core clinical subject describes interprofessional collaborative practice as a learning activity ('The student will develop interdisciplinary links...'), but no assessment task in DENT90143/DENT90144 or DENT90108 names collaborative practice: the assessed tasks are individual case presentations, a written assignment, a seminar presentation, a written exam and an individual clinical portfolio. Level 2 fails because it requires that a core unit ASSESSES collaborative practice, and the interprofessional line is a description of learning activities, not of an assessment. Per the one-construct-one-home rule the clinical placement work at RDHM/MDC is scored in W3 and is deliberately not used here.",
      "evidenceLines": [
        "Capacity to value and participate in projects which require team-work",
        "work effectively as a member of a team",
        "The student will develop interdisciplinary links with other dental postgraduate programs to develop skills in intra- and interprofessional collaborative practice to provide comprehensive person-centred care.",
        "Learning activities will include seminars, pre-clinical activities and clinical patient care."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor met: 'Core assessment includes criterion-referenced appraisal of quality'. DENT90108 carries a 35% assessed critical-appraisal-of-literature exercise, matched by the subject ILO requiring 'advanced appraisal of published research literature and evidence' — appraisal of the quality of work, assessed, in a compulsory core subject. Level 3 fails: nothing in the extract requires students to document or justify reliance decisions (when they relied on or overrode a tool, source or collaborator), to defend judgements of AI-output quality, or to evidence strategy adjustment over time; the reflective-practice and give/receive-appraisal statements are graduate attributes only, which R2 and Barrie forbid scoring. The clinical portfolio is not counted here because the handbook documents no reflective or self-appraisal component in it.",
      "evidenceLines": [
        "Essay 2: Critical appraisal of literature (exercise)",
        "Systematically search the available literature and demonstrate advanced appraisal of published research literature and evidence",
        "This subject will introduce students to the principles of research and the inherent methods, as well as the methods for critical appraisal of the available scientific literature.",
        "the ability to negotiate, give and receive appraisal and criticism constructively",
        "a critically reflective approach to practise dentistry based on current evidence and experience"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 0 is excluded because digital content does appear in program-level outcomes, but only at the operational level the anchor for level 1 names: 'digital tools appear only as ... tool operation/training'. The two statements are a generic skill about proficiency in contemporary technologies and a graduate attribute about using information technology for documentation, records and communication — tool use, not capability-plus-limits. Level 2 fails outright: no core unit addresses AI capabilities AND limitations/ethics, and no AI content of any kind appears in the extract. Level 3 fails a fortiori — there is no assessed critique or governance of AI systems in dentistry (bias, accountability, transparency, regulation, data governance). Neither cited line is tied to any assessment task, so R2 also caps this at 1.",
      "evidenceLines": [
        "be proficient in the appropriate use of contemporary technologies",
        "skills to use contemporary information technology for documentation, including patient records, communication, management of information and applications related to health care.",
        "Employ the principles of ethical clinical research and of the responsibilities of researchers"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "DEMOTED from 3 to 2 by adversarial verification. Level 2 anchor met: the student formulates their own research question in an area of clinical interest and the varying clinical caseload is application of learning to novel problems, assessed (Essay 1: Research problem 15%; Oral presentation: Research question & methodology 20%; Essay 3: Research Proposal 30%). Level 3 fails on the anchor's own wording. L3 names 'a self-scoped capstone or research project'; the extract distinguishes plan from project explicitly — DENT90108 provides 'the practical knowledge required to plan a research project and the opportunity undertake a research investigation'. The required, assessed artefact is a PROPOSAL; the investigation itself is an opportunity, not a requirement — the same line used to deny C5 level 3, applied consistently here. The second L3 route (assessed identification of one's own knowledge gaps together with the plan to close them) is unmet: 'the ability to identify, quantify and address their own learning needs' is a graduate attribute, which R2 caps at 1, and no assessment task names gap identification. The original score straddled 2 and 3 and was resolved upward, which the scoring-direction rule forbids.",
      "evidenceLines": [
        "Students plan a research investigation in an area of clinical interest. In consultation with a research supervisor and/or the course coordinator, participants will formulate a research question.",
        "Formulate a research question answerable with existing research evidence in an area of clinical interest",
        "Manage competing demands on time, including self-directed project work",
        "Exercise responsibility for their own learning",
        "Essay 3: Research Proposal",
        "Essay 1: Research problem"
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1 anchor exactly: 'Introductory methods unit; literature-review assessment.' DENT90108 introduces the principles of research and its methods and assesses planning of a project including ethics approval, and the ILO on data-analysis techniques is 'Describe the theoretical concepts behind' them — description, not conduct. Level 2 fails because it requires students to design AND conduct an inquiry with data collection, assessed: every assessed artefact in the extract is a proposal, an essay, a training module or an oral presentation, and no data-collection or results component appears anywhere. Level 3 fails a fortiori — no substantial project generating primary evidence is required, and the course page frames research investigation as an 'opportunity' rather than a requirement.",
      "evidenceLines": [
        "This subject will introduce students to the principles of research and the inherent methods, as well as the methods for critical appraisal of the available scientific literature.",
        "Describe the theoretical concepts behind a range of qualitative and quantitative data analysis techniques",
        "Plan a research project, including the steps to obtain ethical approval",
        "The research subject will provide students with practical knowledge required to plan a research project and the opportunity undertake a research investigation in an area of clinical interest.",
        "Completion of RIOT training module"
      ]
    },
    "adaptiveness": 7,
    "W1": {
      "score": 2,
      "rationale": "Level 2 anchor met: 'at least one core assessment requires a recognised professional genre ... judged against criteria drawn from professional practice'. Case presentation and defence is the clinical profession's own genre, assessed twice in the core clinical subject (10% mid-year, 20% end-year), alongside an assessed seminar presentation and a course ILO on articulating clinical knowledge in oral and written presentations. Level 3 fails on its second conjunct: the extract never documents a core assessment delivered to, or judged by, a real external audience or practitioner — no industry panel, client, patient or public exhibition is named as the audience or assessor of any assessment task, and the 'academics and specialists' line describes feedback on clinical activities, not who judges an assessment. The 90%-attendance hurdle is the only assessed conduct standard, and reliability alone does not carry professional conduct 'explicitly among the assessed criteria' of a communication task.",
      "evidenceLines": [
        "Demonstrate advanced capacity to articulate clinical knowledge and understanding in oral and written presentations",
        "Case presentation and defence of known and completed clinical case",
        "Topic based seminar presentation. The emphasis is on the understanding of the prepared topic",
        "Oral presentation: Research question & methodology (1500 words equivalent)",
        "Hurdle requirement: Pass/Fail. 90% Attendance for all Seminars & Clinical Sessions",
        "exhibit professional responsibility"
      ]
    },
    "W2": {
      "score": 3,
      "rationale": "Both level-3 conjuncts are documented. Spine rather than single instance: professional-fidelity tasks are staged across the core clinical subject and carry the bulk of its weight — a pre-clinical practical hurdle in week 5, a mid-year case presentation and defence on case management to date (10%), an end-of-year case presentation and defence of a completed case (20%), and a clinical portfolio built from 542.5 hours of practice (30%, hurdle) — which is the 'capstone plus earlier scaffolding' form the anchor names. Genuine constraint of practice: the profession's own standard of performance gates the work, since the practical assessment must be passed 'prior to being allowed to start patient care', and the tasks produce the artefacts a practitioner produces (evidence-based treatment plans, managed cases) for real patients rather than for a marker. Scored on documented task features only, per R4 — no 'authentic'/'real-world' label was relied on. Workplace immersion itself is scored in W3, not here.",
      "evidenceLines": [
        "Practical Assessment / Pre‐Clinical assessment prior to being allowed to start patient care",
        "Case presentation and defence of known and prepared clinical case. The emphasis is on case management to date.",
        "Clinical Portfolio: Incorporates 542.5 hours of clinical practice during the year.",
        "Create and develop evidence-based treatment plans for patients.",
        "Apply the principles of occlusion, materials science and treatment planning to evidence based clinical practice.",
        "Learning activities will include seminars, pre-clinical activities and clinical patient care."
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Level 2 anchor met and then some on scale: a core unit places students in a real workplace with practitioner supervision and assessment — clinical training at the Royal Dental Hospital of Melbourne and Melbourne Dental Clinic, clinical performance assessable with mid- and end-year feedback, 542.5 hours captured in a hurdle-assessed clinical portfolio, and a 90%-attendance hurdle on clinical sessions. Held at 2 rather than 3 because level 3 is conjunctive and its final conjunct — 'structured reflection on professional practice' — is not documented anywhere in an assessment: the portfolio description states hours and a satisfactory-requirements hurdle only, and the reflective-practice statements are graduate attributes, which R2 bars from scoring. The extract also shows this as a single standing clinical subject rather than a sequence of placements, which is the level-2 'stands alone' qualifier.",
      "evidenceLines": [
        "Students will undertake clinical training at the facilities in the Royal Dental Hospital of Melbourne (RHDM) and Melbourne Dental Clinic (MDC). Clinical performance is assessable, and feedback will be given at mid and end-year.",
        "Students will engage in clinical activities in fixed, removable and implant prosthodontics with highly effective feedback from academics and specialists. Sessions are scheduled at Royal Dental Hospital of Melbourne and Melbourne Dental Clinic.",
        "Hurdle requirement: Must satisfactorily meet the requirements of the clinical portfolio",
        "the ability to apply reflective practice skills and a recognition of their importance in health care"
      ]
    },
    "workplace": 7,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "An all-compulsory specialist core with staged depth: 100 credit points comprising a single 75cp advanced clinical subject in the chosen specialisation plus a 25cp research subject, with no elective space documented, and an internal prerequisite gate — the pre-clinical practical assessment must be passed before patient care may begin. Content is unambiguously disciplinary (prosthodontics: occlusion, fixed/removable/implant prosthodontics, laboratory skills), not generic or interchangeable.",
        "evidenceLines": [
          "The Master of Clinical Dentistry requires the successful completion of a 75 credit point clinical specialisation plus a 25 credit point Research Proposal subject.",
          "Students must successfully complete 100 credit points. This includes:",
          "A 75 credit point advanced clinical subject",
          "A 25 credit point research subject",
          "Practical Assessment / Pre‐Clinical assessment prior to being allowed to start patient care",
          "Apply knowledge relating to removable, fixed and implant prosthodontics at an advanced level."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment requires defended decisions under real clinical uncertainty rather than recall or scripted response: students must defend their management of both an in-progress and a completed clinical case, and must create and develop treatment plans for real patients across 542.5 hours of clinical practice — a live setting with genuine accountability. Diagnosis, treatment planning and rehabilitation across fixed, removable and implant options is trade-off decision-making, and the written exam is only one component (15%) among predominantly case-based assessment.",
        "evidenceLines": [
          "Case presentation and defence of known and prepared clinical case. The emphasis is on case management to date.",
          "Case presentation and defence of known and completed clinical case",
          "Create and develop evidence-based treatment plans for patients.",
          "This subject will enable students to develop their knowledge and skills in prosthodontics, including the diagnosis, treatment planning, rehabilitation, and maintenance of oral function.",
          "Clinical Portfolio: Incorporates 542.5 hours of clinical practice during the year."
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 1 and 2: the interprofessional-collaboration sentence in DENT90143 could be read as documenting assessed interprofessional activity, since it sits in a subject whose clinical portfolio is hurdle-assessed. Resolved DOWN to 1 by R2 (the sentence describes learning activities, not an assessment task) and by the scoring-direction rule.",
      "C1 vs W3: the clinical work at RDHM/MDC would satisfy a 'client or stakeholder work' reading of C1 level 2. Resolved by the one-construct-one-home rule and the v4.1 migration note, which moves placement evidence out of C1 into W3, where it is scored once.",
      "C2 straddled 2 and 3: the year-long clinical portfolio and the two case defences could be read as process-focused assessment evidencing strategy adjustment over time. Resolved DOWN to 2 because the handbook documents no reflective, self-appraisal or reliance-justification component in either — only hours, hurdle status and case management.",
      "C4 straddled 2 and 3 and was RESOLVED DOWN to 2 on adversarial verification. The self-scoped research question is assessed (Essay 1 15%, Oral 20%, Essay 3 Research Proposal 30%), but the L3 anchor names a self-scoped capstone or research PROJECT, and the extract distinguishes plan from project: the proposal is required, the investigation is an 'opportunity'. The initial upward resolution violated the scoring-direction rule. This remains the most contestable item in the set and the one an IRR partner is most likely to split on.",
      "C4 vs C5 share DENT90108 as their source subject. Split by construct: the self-scoping and independent-learning lines score in C4, the methods-training and inquiry-conduct lines in C5. The 'Essay 3: Research Proposal' task is cited in C4 only, as the assessment R2 requires there.",
      "C5 straddled 1 and 2: students do select and present a methodology ('Oral presentation: Research question & methodology'), which is half of the level-2 anchor. Resolved DOWN to 1 because level 2 requires design AND conduct with data collection, and no data-collection or results component is assessed anywhere in the extract.",
      "W1 straddled 2 and 3: professional communication IS assessed repeatedly and progressively (mid-year case defence on management to date, then end-year defence of a completed case, plus a seminar presentation and a research oral). Resolved DOWN to 2 because level 3's second conjunct is unmet — no assessment is documented as delivered to or judged by a real external audience or practitioner, and no assessment names professional conduct among its criteria.",
      "W3 straddled 2 and 3: on scale and supervision this is a level-3 placement (542.5 hours, core, practitioner-supervised, hurdle-assessed, with an attendance obligation to the host). Resolved DOWN to 2 solely because 'structured reflection on professional practice' is not documented in any assessment description; the reflective-practice statements are graduate attributes, which R2 excludes. If a portfolio rubric documenting reflection were captured, this would move to 3.",
      "W1/W2 both draw on the case presentation and defence tasks. Split by construct: W1 cites the end-of-year defence as the professional communication genre, W2 cites the mid-year defence and the pre-clinical gate as evidence of task fidelity. The construct scored differs even where the subject does not.",
      "R4 check: the handbook uses 'person-centred care' and 'evidence based clinical practice' as framing language. No score was raised on such a label; W2 was scored on documented task features (pre-clinical gate, case defences, portfolio hours, treatment plans for patients) only."
    ],
    "notScoreable": [
      "C3 — AI-specific evidence is entirely absent from the extract. There is no mention of artificial intelligence, generative AI, machine learning or data governance in any course page, subject description, outcome or assessment. C3 is therefore scored at the level-1 anchor on the two generic technology statements rather than left unscored, but the absence should be recorded: the item is discriminating on near-zero signal for this program.",
      "DENT90145 Advanced Prosthodontics Part 2 has no assessment detail in the extract — its assessment page reads only 'Please refer to Advanced Prosthodontics Part 1.' The part-time route was therefore scored from DENT90143 (full-time) and DENT90144 (Part 1), whose assessment tables are near-identical.",
      "Only the Prosthodontics specialisation appears in the extract; the course page says clinical training is 'in one of the specialities available' but the majors/minors page lists Prosthodontics alone. Scores describe the Prosthodontics route and cannot be generalised to any other specialisation without its own capture.",
      "No assessment rubrics or criteria statements are in the extract for any task — only task names, timing and weights. Every level-2/3 judgement about 'criteria drawn from practice' therefore rests on task type rather than documented criteria, which is a systematic ceiling on W1 and W2 precision for this program."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-cs": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 1,
      "rationale": "Level 2 requires that 'at least one core unit assesses collaborative practice'. The only unconditionally compulsory Year 1 subject is COMP90044 Research Methods, whose every assessment is individual (individual literature review, individual research methods design assignment, individual oral presentation, individual workshop exercises), and the compulsory Year 2 Research Project Parts 1-4 have no subject or assessment page in the extract. Assessed group work is documented only in subjects a student may or may not take: COMP90049 and GEOM90008 sit in the Foundational band (a required band of 25-37.5 credit points chosen from six subjects, three of which - COMP90015, COMP90048, COMP90054 - assess only individually, so the band can be completed without any group assessment), and COMP90042's group project is an elective. Teamwork also appears in subject-level outcomes (GEOM90008 ILO 5). That is the level-1 picture: collaboration appears in outcomes and in choosable units but no compulsory unit is documented to assess it. Level 3 is not reached on any reading - nothing in the extract assesses the division of work between people AND tools/AI systems.",
      "evidenceLines": [
        "12.5 credit points of Year 1 compulsory subjects",
        "Between 25 and 37.5 credit points of Year 1 Foundational Computer Science subjects",
        "ILO 5. Demonstrate professional skills in ethics and sustainability, communication, and teamwork.",
        "Group research project. Addresses ILOs 1, 3 & 4.",
        "Group project – data management design proposal. Deliverable is a report of a maximum of 5 pages (per group) (25%). (30 hours of work per group member). ILOs 1, 2, 3 and 5 are addressed in this assessment.",
        "A group-based (group of 2-3) research project essay working from Week 6 to 12 with a Week 12 submission.",
        "An individual critical literature review of 2000 words. Intended Learning Outcomes (ILOs) 1, 3 and 5 are addressed in this assessment."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 asks for core assessment containing criterion-referenced appraisal of quality, of which 'structured critique' is a listed exemplar. The compulsory COMP90044 Research Methods assesses an individual critical literature review (40%) and an individual research methods evaluation and design assignment (40%), both tied to the assessed outcome of applying rigour and skepticism in the analysis, interpretation and evaluation of research findings - appraisal of the quality of research work, assessed, in a unit every student must take. Level 3 is not met: no assessment in the extract requires students to document and justify reliance decisions on a tool, source or collaborator, to defend judgements of AI-output quality, or to evidence strategy adjustment over time. The closest process-focused artefact, GEOM90008's individually written 1-page reflection on the group project, is in a choosable Foundational subject and is a reflection on a group project rather than a documented reliance decision, so it does not lift the score.",
      "evidenceLines": [
        "An individual critical literature review of 2000 words. Intended Learning Outcomes (ILOs) 1, 3 and 5 are addressed in this assessment.",
        "An individual research methods evaluation and design assignment of 2000 words. ILOs 2, 3, 4 and 6 are addressed in this assessment.",
        "Apply rigour and skepticism in the analysis, interpretation and evaluation of research findings",
        "1 peer review assignment of other student groups' research project essays.",
        "An individually written 1-page reflection on the group project (10%). ILOs 4 and 5 are addressed in this assessment."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 is the anchor that matches literally: AI appears as a program-level specialisation and as elective/choosable content, not as core units addressing AI capabilities AND limitations/ethics. Artificial intelligence is named in the course outcome as one of several areas of specialist knowledge, and the AI-bearing subjects sit in the elective bands (a whole 'Artificial Intelligence electives' group, 50-62.5 credit points of Year 1 electives) or in the choosable Foundational band (COMP90049, COMP90054). COMP90054 does carry ethics content ('Ethics in AI planning') and an assessed outcome on ethical consequences, which would support level 2 if it were compulsory - it is not; the only compulsory Year 1 subject, COMP90044 Research Methods, contains no AI or digital-tool content. Level 3 is unreachable: the extract contains no occurrence of generative AI, AI governance, accountability, transparency or data governance in any assessment.",
      "evidenceLines": [
        "Specialist knowledge in (at least) one of artificial intelligence, cybersecurity, human-computer interaction, programming languages & distributed systems, and spatial information science",
        "Between 50 and 62.5 credit points of Year 1 elective subjects",
        "Artificial Intelligence electives",
        "Ethics in AI planning",
        "Be able to critically evaluate the strengths, weaknesses, and ethical consequences of different approaches for reasoning about action",
        "12.5 credit points of Year 1 compulsory subjects"
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "The level-3 anchor names 'a self-scoped capstone or research project' documented as structured progression toward independent learning, and the handbook documents exactly that as required curriculum rather than as an outcome statement: 100 of the 200 credit points are a compulsory Year 2 research project in four parts, described as a year-long research project in a field of choice, with the compulsory COMP90044 Research Methods explicitly sequenced into the semester immediately before it. The progression is assessed, not merely claimed: COMP90044's assessed outcome of surveying literature, identifying gaps and formulating research questions is examined through the 40% individual critical literature review and the 40% research design assignment, and the project itself is a compulsory credit-bearing sequence, not one route among several. Level 2 would understate this, since the requirement is not merely one assessment on a novel problem but a half-degree self-scoped project.",
      "evidenceLines": [
        "The Master of Computer Science is a research training program that gives students the opportunity to undertake a year-long research project in a field of choice, as well as a broad range of advanced computer science subjects.",
        "100 credit points of Year 2 compulsory research project (in four parts) including",
        "50 credit points of Part 1 and 2 Computer Science Research Project subjects",
        "COMP90044 Research Methods should be taken in the semester immediately prior to the semester you commence your Research Project (i.e., second semester of study for full-time students).",
        "Survey relevant literature, identify gaps and formulate productive research questions",
        "An individual critical literature review of 2000 words. Intended Learning Outcomes (ILOs) 1, 3 and 5 are addressed in this assessment.",
        "Research maturity, including the ability to independently carry out a research survey, and plan, execute, interpret and report on experimental or theoretical results."
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 is fully documented: the compulsory COMP90044 assesses methodology selection and research design (individual research methods evaluation and design assignment, 40%; assessed outcome 'Conduct effective research design and planning'), and the compulsory 100-credit-point four-part research project requires students to execute an inquiry. Level 3 additionally requires that methodology be 'defended under scrutiny (viva, defence, or staged supervised review)', and that element is not documented. The research project subjects COMP90078-COMP90081 have no subject or assessment page in the extract, so no viva, defence or staged supervised review of the project is quotable; the four-part staging is documented only as enrolment sequencing. The only assessed methodological defence in the extract is a 5-minute individual oral presentation in COMP90044 worth 15%, which is too thin to carry 'under scrutiny' on its own. Evidence therefore straddles 2 and 3, and the lower level is taken.",
      "evidenceLines": [
        "An individual research methods evaluation and design assignment of 2000 words. ILOs 2, 3, 4 and 6 are addressed in this assessment.",
        "Conduct effective research design and planning",
        "An individual oral presentation relating to the research methods evaluation and design assignment. ILOs 2, 3, 4 and 6 are addressed in this assessment.",
        "100 credit points of Year 2 compulsory research project (in four parts) including",
        "Students studying full-time must take Part 1 and 2 concurrently, and Part 3 and 4 concurrently.",
        "Research maturity, including the ability to independently carry out a research survey, and plan, execute, interpret and report on experimental or theoretical results."
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 1,
      "rationale": "The level-1 anchor is met precisely: communication and professional conduct appear in the course-level outcomes (verbal and written communication; professional ethics and responsibility towards the profession and the community), and core assessment adds a spoken component - COMP90044's individual oral presentation, delivered to the teaching team and peers - but no professional genre and no audience beyond the teaching team is documented. Per R2 and Barrie, the stated outcomes and the Melbourne graduate attributes cannot themselves raise the score. Level 2 would require a recognised professional genre or an audience beyond the teaching team judged against criteria drawn from professional practice; the compulsory assessments are a 2000-word literature review, a 2000-word research design assignment, an oral presentation and workshop exercises - all academic genres addressed to the marker - and the extract documents no client brief, consultancy advice, pitch, panel or public-facing artefact anywhere in the core.",
      "evidenceLines": [
        "Verbal and written communication skills that enable them to make a meaningful contribution to our changing society.",
        "Professional ethics and responsibility towards the profession and the community",
        "Communicate research effectively in written and oral form",
        "An individual oral presentation relating to the research methods evaluation and design assignment. ILOs 2, 3, 4 and 6 are addressed in this assessment.",
        "An individual critical literature review of 2000 words. Intended Learning Outcomes (ILOs) 1, 3 and 5 are addressed in this assessment."
      ]
    },
    "W2": {
      "score": 1,
      "rationale": "Level 2 requires at least one core assessment that reproduces a professional task end to end, producing the artefact a practitioner would produce, judged against criteria drawn from practice. The compulsory COMP90044 assessments are a literature review, a research design assignment, an oral presentation and workshop exercises: contextualised by a research problem but academic in artefact and in stated criteria, which is the level-1 anchor. The genuinely practitioner-shaped tasks in the extract - GEOM90008's staged design-proposal-then-realisation of a spatial database, and INFO90004's expert evaluation and lab-based user evaluation with recommendations - sit in the choosable Foundational band, not the compulsory core, and no criteria drawn from professional practice are documented for them. The compulsory research project could plausibly be an end-to-end research-practice task, but its assessment page is absent so neither the artefact nor the criteria can be quoted. Per R4 I have scored only documented task features, ignoring the 'real-world problems' phrasing in COMP90049's outcome.",
      "evidenceLines": [
        "An individual critical literature review of 2000 words. Intended Learning Outcomes (ILOs) 1, 3 and 5 are addressed in this assessment.",
        "Workshop exercises throughout the semester. Each student will be required to complete at least 8 out of 10 exercises. ILOs 1 - 6 are addressed.",
        "ILO 3 - Design, implement, and evaluate machine learning systems for real-world problems",
        "ASSESSMENT 1 – EXPERT EVALUATION An individual report (500 words) consisting of a Heuristic Evaluation and Cognitive Walkthrough of a given interactive technology.",
        "Group project – realisation of the spatial database previously designed in the project design proposal, assessed via a report of a maximum of 15 pages (per group) and a set of database queries proving the realised implementation (35%). (requiring 50 hours of work per group member). ILOs 1-5 are addressed in this assessment.",
        "Between 25 and 37.5 credit points of Year 1 Foundational Computer Science subjects"
      ]
    },
    "W3": {
      "score": 0,
      "rationale": "Level 0 states that no work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure, and that is what the extract shows. The complete statement of requirements is 100 credit points of Year 1 subjects (compulsory Research Methods, a Foundational band, and electives) plus 100 credit points of a compulsory on-campus research project; no placement, practicum, internship, work-integrated learning or industry-hosted component appears in any of it, and no practitioner supervision or host accountability is documented. Simulation is excluded here by construction and scores in W2 in any case.",
      "evidenceLines": [
        "All students must complete:",
        "100 credit points of Year 1 subjects including",
        "12.5 credit points of Year 1 compulsory subjects",
        "Between 25 and 37.5 credit points of Year 1 Foundational Computer Science subjects",
        "Between 50 and 62.5 credit points of Year 1 elective subjects",
        "100 credit points of Year 2 compulsory research project (in four parts) including",
        "The Master of Computer Science requires the successful completion of 200 credit points."
      ]
    },
    "workplace": 2,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents a coherent specialist core with progressive technical and methodological depth: 200 credit points with a compulsory research-methods subject, a required Foundational Computer Science band, discipline-specific elective streams, and a compulsory 100-credit-point four-part research project, with an explicit staged sequence requiring Research Methods in the semester immediately before the project commences. The outcomes name a broad grounding in advanced Computer Science plus specialist depth in one named subfield. This is not generic or interchangeable content.",
        "evidenceLines": [
          "The Master of Computer Science requires the successful completion of 200 credit points.",
          "A broad grounding in advanced Computer Science",
          "In addition to a broad grounding across the breadth of advanced computer science, students will develop specialist knowledge in areas such as artificial intelligence, cybersecurity, human-computer interaction, programming languages & distributed systems, and spatial information science.",
          "COMP90044 Research Methods should be taken in the semester immediately prior to the semester you commence your Research Project (i.e., second semester of study for full-time students).",
          "100 credit points of Year 2 compulsory research project (in four parts) including"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment requires defended trade-off decisions rather than recall or scripted response. The compulsory COMP90044 assesses a research methods evaluation and design assignment in which methods must be selected and justified, is examined against an outcome requiring rigour and skepticism in evaluating findings, and requires the student to present and answer for that design orally. The compulsory year-long research project in a field of choice is a capstone carrying genuine methodological uncertainty. Note the caveat that the project's own assessment page is not in the extract; the gate passes on the COMP90044 evidence alone.",
        "evidenceLines": [
          "An individual research methods evaluation and design assignment of 2000 words. ILOs 2, 3, 4 and 6 are addressed in this assessment.",
          "Conduct effective research design and planning",
          "Apply rigour and skepticism in the analysis, interpretation and evaluation of research findings",
          "An individual oral presentation relating to the research methods evaluation and design assignment. ILOs 2, 3, 4 and 6 are addressed in this assessment.",
          "100 credit points of Year 2 compulsory research project (in four parts) including"
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 1 and 2 on the meaning of 'core unit'. Assessed group work exists in the Foundational Computer Science band (COMP90049, GEOM90008, INFO90004), which is a required band, but no individual subject in it is compulsory and three of the six options (COMP90015, COMP90048, COMP90054) assess only individually, so the band is completable with no assessed collaboration. The only unconditionally compulsory Year 1 subject assesses entirely individually. Resolved DOWN to 1 by the never-resolve-upward rule.",
      "C3 straddled 1 and 2. COMP90054 AI Planning for Autonomy documents AI ethics content and an assessed outcome on ethical consequences of approaches, which would satisfy level 2 if it were a core unit, but it is one of six selectable Foundational options. Resolved DOWN to 1.",
      "C5 straddled 2 and 3. The required 100-credit-point four-part research project would support level 3 if methodology defence under scrutiny were documented, but COMP90078-COMP90081 have no pages in the extract, so no viva, defence or staged supervised review is quotable and the four-part structure reads only as enrolment sequencing. Resolved DOWN to 2.",
      "W2 straddled 1 and 2. The compulsory research project may well reproduce research practice end to end, and GEOM90008/INFO90004 document practitioner-shaped artefacts, but the project's assessment page is absent and those two subjects are selectable rather than compulsory, with no criteria drawn from practice documented. Resolved DOWN to 1.",
      "W3 straddled 0 and 1 on one line only: the Human-Computer Interaction elective list contains a subject titled INFO90006 Fieldwork for Design, whose title alone might indicate elective-level field-situated learning. No subject page for it is in the extract, so nothing documents placement in a real workplace or professional community, or practitioner supervision. Resolved DOWN to 0.",
      "C4 and C5 rest on the same compulsory research project but score differently by design: C4's level-3 anchor asks for documented structured progression toward independent learning, which the course structure supplies, whereas C5's level-3 anchor additionally requires methodology defended under scrutiny, which it does not.",
      "Construct-boundary check: the COMP90044 oral presentation was scored in W1 (communication to an audience) and cited in C5 only as the methodology-defence question, not double-counted as a W1 professional genre. GEOM90008's group work was considered under C1 (collaboration), not W2, and its 1-page reflection under C2 (appraisal), not W2."
    ],
    "notScoreable": [
      "The four compulsory Year 2 subjects COMP90078, COMP90079, COMP90080 and COMP90081 (Computer Science Research Project Parts 1-4, 100 of the program's 200 credit points) have no subject page and no assessment page in the extract. Nothing about how the project is assessed, supervised, examined or defended is scoreable. This is the single largest evidence gap and it directly bounds C5 (no documented viva/defence/staged supervised review), W2 (no documented artefact or criteria), C1 (no way to test whether the project assesses human-plus-tool coordination) and G2 (which passes on COMP90044 evidence alone).",
      "No elective subject pages are present for the AI and cybersecurity streams that would bear on C3 governance - notably COMP90087 The Ethics of Artificial Intelligence, COMP90073 Trustworthy Machine Learning and INFO90005 Human-AI Interaction. Since C3 caps at 1 on the elective-only reading regardless, this does not change the score, but the governance content of those subjects is unscoreable.",
      "INFO90006 Fieldwork for Design appears as an elective title with no subject or assessment page, so whether it constitutes work-situated learning cannot be determined from the extract."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-datasc": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 ('at least one core unit assesses collaborative practice - group projects with individual accountability') is met repeatedly: COMP90024, COMP90050 and COMP90051 each carry a compulsory group assessment, and the capstone assesses team work with individual accountability via a peer assessment factor. Level 3 fails on its second conjunct: recurrence holds, but no assessment documents coordinating work across people AND tools/AI systems - no role-and-tool allocation, no task where the human/system division of labour is itself assessed.",
      "evidenceLines": [
        "Group-based Cloud programming assignment system, requiring approximately 50-55 hours programming and 5000 word report",
        "Project- Group project.",
        "Students will work in teams under only general guidance from staff members.",
        "Individual's contribution to the project measured by a peer assessment factor. (e.g. 0.5 for ½ contribution, 1 for full contribution)."
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Level 1 ('Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria') matches: reflection appears only in generic skills and graduate attributes. Level 2 needs criterion-referenced appraisal of the QUALITY of work; the nearest candidate, the capstone portfolio containing 'an assessment of the roles of others in the group', appraises CONTRIBUTION against a mark-scaling factor, not quality against criteria, and exists only in the capstone route. Level 3 (documented reliance/override decisions) is absent entirely.",
      "evidenceLines": [
        "Have the ability to demonstrate advanced independent critical enquiry, analysis and reflection",
        "To justify the factor students will be expected to compile an individual portfolio including a journal, meeting summaries/minutes, their assigned role, and evidence of their contribution through draft reports and an assessment of the roles of others in the group."
      ]
    },
    "C3": {
      "score": 2,
      "rationale": "Above level 1, because AI/ML is not elective or tool-operation content: COMP90051 is compulsory and assessed on algorithmic basis and critical evaluation, not tool training. Level 2 ('Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed') is met on the limitations side - model limitations and assumption checking are core ILOs carried by examined subjects. Level 3 fails: no core assessment requires critique or governance of AI systems (bias, accountability, transparency, regulation, data governance); the only ethics evidence is an unassessed course-level ILO, which R2 caps at 1 on its own.",
      "evidenceLines": [
        "Critically analyse and evaluate different solutions for a machine learning problem",
        "Understand the underlying statistical modelling framework and the limitations of such models.",
        "Understand the statistical underpinnings of the methods used in multivariate data and be able to check when assumptions may or may not hold.",
        "Demonstrate a sophisticated awareness of ethical implications relevant to the use of data, and particularly “big data”;"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Demoted from 3 on adversarial verification. Level 3 ('structured progression toward independent learning: a self-scoped capstone or research project') is refuted: the research pathway is merit-gated (open only to students maintaining a WAM of 80 in Data Science subjects), so it is not a route every student takes; its one explicit self-scoping line ('Students must propose a research topic and confirm the name of project supervisor') is an ENROLMENT PRECONDITION, not assessment evidence, and so fails R2. For the route every student actually takes (MAST90106/07) the extract never documents where the problem comes from - only that the project applies degree skills to 'a practical problem'. Writing a plan for a project you did not scope is not self-scoping, and a literature review is not assessed identification of one's own knowledge gaps. Level 2 ('At least one core assessment requires application to novel or unfamiliar problems') is documented: the compulsory 25-point project applies course methods to an unfamiliar practical problem, with a hurdle-assessed literature review and project plan and a 6,000-word report.",
      "evidenceLines": [
        "25 credit point project option of:",
        "It will apply the skills developed during the degree to a practical problem of relevance to science, industry, commerce or society in general.",
        "In the first part of the project students will complete a literature review and a plan for their project.",
        "A literature review and project plan completed by the research group",
        "Students who maintain a WAM of 80 in Data Science subjects will be eligible to undertake a 25-point individual research project in Data Science as the capstone project, to replace MAST90106 and MAST90107."
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 ('Students design and conduct an inquiry with methodology selection and data collection, assessed') is met by the compulsory 25-point project: a planned inquiry into a practical problem reported in a 6,000-word report, or a supervised research program reported as a 30-40 page thesis. Level 3 additionally requires methodology defended under scrutiny - viva, defence, or staged supervised review. The capstone runs under 'only general guidance' and its oral presentation is a group report-out; the research presentation is assessed on communication to a general audience. No defence of methodology is documented, so the lower level stands.",
      "evidenceLines": [
        "A written report totaling 6,000 words, or equivalent completed by the research group",
        "In this subject, students undertake a substantial research program in the area of Data Science. The research will be conducted under the supervision of a member of the School of Mathematics and Statistics or the Computing and Information Systems academic staff. The results will be reported in the form of a thesis and an oral presentation.",
        "A thesis is the main requirement. Theses are expected to be 30-40 pages in length, excluding references, appendices, figures, and tables.",
        "Students will give a presentation on their research projects where they will be assessed on their presentation skills and their ability to communicate their research to a general audience in a concise manner"
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 1,
      "rationale": "Level 1 fits exactly: communication appears in course ILOs and graduate attributes, and core assessment adds oral presentation to peers and staff (COMP90050 to the class; the capstone group presentation), but no recognised professional genre and no documented audience beyond the teaching team. Level 2 would need a professional genre or external audience judged against criteria drawn from practice; the only practice-flavoured wording is the subject overview expectation about industry clients and the 'career-ready level' ILO, which R4/R2 forbid scoring as documented task features. Ambiguity resolved downward.",
      "evidenceLines": [
        "Communicate findings from analyses clearly and effectively, including to an audience with a diverse background in science and/or industry;",
        "requires an oral presentation of 25-30 minutes to the class, worth 15%",
        "Group oral presentation",
        "They are expected to present technically correct results in a fashion acceptable to industry-based and other clients."
      ]
    },
    "W2": {
      "score": 1,
      "rationale": "Level 1 ('Contextualised or scenario-framed tasks appear, but the artefact produced and the criteria applied remain academic') matches. Core assessment is dominated by written assignments and hurdle examinations; the capstone frames a realistic practical problem but produces a literature review, a 6,000-word report and a presentation - academic artefacts - and the documented criteria are marks, hurdles and a peer contribution factor, not criteria drawn from practice. Level 2 requires all three of realistic problem, practitioner artefact and practice-derived criteria; the third is undocumented, so per R4 the label 'industry-based' cannot lift the score.",
      "evidenceLines": [
        "It will apply the skills developed during the degree to a practical problem of relevance to science, industry, commerce or society in general.",
        "A written report totaling 6,000 words, or equivalent completed by the research group",
        "Up to 20 pages of written assignments (equivalent to approx. 20 hours)",
        "Written examination"
      ]
    },
    "W3": {
      "score": 0,
      "rationale": "Level 0 ('No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure'). The course structure page enumerates the whole 200 points - one specialisation, 75 points of compulsory subjects and a 25-point project option - and none is a placement, practicum or community-based project. The capstone is a university team project under staff guidance, which is W2 territory, not membership in a workplace or professional community with practitioner supervision.",
      "evidenceLines": [
        "The Master of Data Science requires the successful completion of 200 credit points.",
        "Completion of one formal Specialisation (100 credit points)",
        "75 credit points of Compulsory subjects",
        "25 credit points of Capstone Project",
        "25 credit points of Research Pathway Project"
      ]
    },
    "workplace": 2,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "A coherent all-compulsory specialist core with staged depth: 75 points of named compulsory statistics and computing subjects plus a compulsory 25-point project, with entry streams and specialisations determined by prior foundation subjects - progressive technical and methodological depth, not generic interchangeable content.",
        "evidenceLines": [
          "Completion of one formal Specialisation (100 credit points)",
          "75 credit points of Compulsory subjects",
          "COMP90051\tStatistical Machine Learning",
          "On admission Students are placed into streams based on their background. These will help inform the Foundation subjects students need to take and which specialisations are available to them."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment goes beyond recall or scripted response: a compulsory capstone or research project on a practical problem carries real uncertainty and accountability (team diaries, peer assessment factor, general-guidance supervision), and core statistical subjects require justified handling of incomplete data and critical evaluation of competing solutions.",
        "evidenceLines": [
          "It will apply the skills developed during the degree to a practical problem of relevance to science, industry, commerce or society in general.",
          "Appropriately handle data related issues such as missing and incomplete data in a rigorous and justifiable manner.",
          "Critically analyse and evaluate different solutions for a machine learning problem"
        ]
      }
    },
    "ambiguities": [
      "C1: assessed collaboration clearly recurs across the core, which is the level-3 recurrence conjunct, but the tools/AI-coordination conjunct is undocumented; the conjunctive anchor plus the lower-level rule held it at 2.",
      "C2: the capstone peer assessment factor and individual portfolio could be read as level-2 'portfolio with standards / peer review'. It appraises contribution for mark scaling rather than quality against criteria, and only exists in one of the two project routes, so the lower level was taken.",
      "C3: level 2 rests on limitations rather than ethics - ethics of data appears only as an unassessed course ILO. The limitations/ethics disjunction in the anchor allowed 2; had the anchor required assessed ethics this would be 1.",
      "C4: resolved to 2 on adversarial verification. Self-scoping is explicit only for the merit-gated research pathway (WAM 80), and only as an enrolment precondition rather than assessment evidence; for the capstone every student takes, the source of the problem is undocumented, so the level-3 'self-scoped' conjunct is unmet and the hurdle-assessed plan supports level 2 only.",
      "C5: the compulsory project is substantial and generates evidence, but whether the group oral presentation and the hurdle plan constitute 'staged supervised review' of methodology is unclear; resolved down to 2.",
      "W1: 'acceptable to industry-based and other clients' and 'career-ready level' straddle levels 1 and 2. Both are expectation/outcome statements rather than documented audiences or criteria, so R4 and the lower-level rule fixed it at 1.",
      "W2: the COMP90024 group cloud system and the capstone report are practitioner-shaped artefacts, but no criteria drawn from practice are documented for either, so the level-2 three-part anchor was not satisfied."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-ddensur": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied several times over: core units assess collaborative practice through graded group tasks (Professional Practice 1 group presentation, Professional Practice 2 group presentation, both Dental Research Project subjects' group oral presentations, and an assessed collaborative online discussion in Diseases and Dentistry), and teamwork is documented as taught content in the operatory. Level 3 is not reached: the anchor requires, in addition to recurrence, at least one assessment where coordinating work across people AND tools/AI systems is itself assessed — no assessment task in the extract documents allocation of work between people and tools or systems, and no gen-AI system appears anywhere. Placement/clinical-team evidence is deliberately not counted here (it scores in W3), per the one-construct-one-home rule.",
      "evidenceLines": [
        "Collaborative online discussion",
        "Group presentation (4-6 student per group)",
        "Group Presentation - 20 minutes",
        "Group oral presentation (4 – 5 students per group)",
        "Group oral presentation 4-5 members per group",
        "Students will learn about correct posture, safety, and working as a team (assistant and operator) in the dental operatory during the provision of these procedures.",
        "Discuss interprofessional collaborative practice in healthcare"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 is documented: criterion-referenced appraisal of quality is embedded in core assessment as a programmatic portfolio system — student-curated portfolios responding to prescribed tasks, carrying 20–50% of the mark in every year, with regular milestone assessment and feedback against coordinator standards, plus a reflective-practice portfolio worth 50% in Professional Practice 1. Level 3 is not reached: the anchor requires assessment that makes students document and justify reliance decisions (relying on or overriding a tool, source or collaborator), defend judgements of AI-output quality, or evidence strategy adjustment over time. The handbook names reflection and self-evaluation as portfolio content but never documents a task requiring a justified reliance decision or a recorded change of strategy; the peer-reflection outcome in Dental Practice 3 is an outcome statement, not an assessment specification (R2). Ambiguity between 2 and 3 resolved downward.",
      "evidenceLines": [
        "Portfolio incorporating reflective practice",
        "Portfolio: A student curated compilation that responds to prescribed tasks submitted regularly throughout the year.",
        "The Portfolio assessment forms part of the programmatic approach to assessment being taken at MDS.",
        "Apply the principles of reflective practice personally and with peers, to critically reflect on their clinical experience, knowledge, skills and the application of these in the provision of evidence-based dental care."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "No generative-AI content of any kind appears in the extract. Digital content is present in core units, but at the operational level the anchor caps at 1 — describing how digital technologies manage health information, and using contemporary information technology for documentation. The single line that reaches beyond operation, the Dental Practice 3 outcome on critically evaluating digital technologies including ethical implications and system limitations, is an intended learning outcome; no assessment task in that subject (portfolio, ongoing clinical practice, case-based discussions, OSCE, written exam) is documented as requiring appraisal of digital-tool limits, so R2 forbids crediting it at level 2 ('discussed and assessed'). Ambiguity between 1 and 2 resolved downward per the scoring-direction rule.",
      "evidenceLines": [
        "Describe how digital technologies are used to manage health information and inform person-centred care",
        "Describe how digital health technologies are used across the health system to manage care.",
        "use contemporary information technology for documentation, management of information and applications related to health care;",
        "Critically evaluate the use of digital technologies in delivering person-centred care, considering patient digital literacy, ethical implications, and health system limitations."
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3's first route — documented structured progression toward independent learning via a self-scoped research project — is met with assessment evidence, not outcome statements. The research strand is required of every student and runs across two core year-long subjects: students scope a proposal in an area of their own interest, are individually assessed on research design and on formulating their own research questions, then complete and report the project under a research mentor. That is a self-scoped project with staged assessment, which is more than the level-2 floor of applying methods to unfamiliar problems (itself independently met by the unknown-case and unknown-patient assessments, though those lines are scored in W2 as the practice constraint). Placement/WIL routes are excluded here by construction in v4.1.",
      "evidenceLines": [
        "Students will conduct a research-based project as a required component of the degree.",
        "Students will have the opportunity to develop a research proposal in an area of interest related to dental, oral, and craniofacial research.",
        "Research Design (Individual)",
        "Develop rigorous, feasible research questions based on their knowledge of study design and analysis of trends in information/data",
        "Critically reflect on their knowledge and skills as a dental practitioner and develop a plan for continued learning"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 is documented: students design and conduct an inquiry with methodology selection and data collection, and it is assessed — an individually assessed research design, a proposal poster and literature review in year 2, then a progress report and a 3000-word research report in year 3, with an outcome requiring justification of data-collection methods. Level 3 is not reached: the anchor requires a substantial project generating primary evidence that is REQUIRED rather than one route among several, with methodology defended under scrutiny. The subject description permits 'a small research-based or professionally focused project', so primary evidence generation is one route rather than the requirement, the project is described as small, and no viva, defence or staged supervised review of methodology is specified as an assessment task (mentor supervision and a group oral presentation are documented, but the extract does not describe methodology being defended under scrutiny). Ambiguity between 2 and 3 resolved downward.",
      "evidenceLines": [
        "Justify data collection methods to address a research question or project need.",
        "Research Report",
        "Literature Review",
        "Under supervision of a research mentor, students will extend their knowledge and skills in the research domain.",
        "complete a small research-based or professionally focused project"
      ]
    },
    "adaptiveness": 10,
    "W1": {
      "score": 3,
      "rationale": "Both level-3 conditions are documented. Progressive, repeated assessment of professional communication: an oral presentation and a group presentation in Professional Practice 1, a group presentation in Professional Practice 2, portfolio strands in Professional Practice 3, then case presentation and viva assessments in the final year, with clinical communication with patients and colleagues an assessed outcome of the year-2 and year-3 clinical subjects. Real external audience: assessment is delivered to and about real patients — a case presentation of a known patient and a viva of an unknown patient, both hurdles or heavily weighted, plus multi-source feedback drawn from beyond the teaching team. Professional conduct is explicitly among the assessed criteria as a standalone pass/fail hurdle, 'Satisfactory Professional Behaviour', so this is not a stated graduate attribute being credited (R2/Barrie satisfied).",
      "evidenceLines": [
        "Satisfactory Professional Behaviour (Pass/Fail)",
        "Multi-source feedback (Pass/Fail)",
        "Case presentation of a known patient (4000 word count equivalence)",
        "Oral Exam (Viva Voce)- of an unknown patient (3000 word count equivalence)",
        "Group presentation (4-6 student per group)",
        "Demonstrate active listening and empathy and engage in respectful verbal and non-verbal communication with the person receiving care and colleagues;"
      ]
    },
    "W2": {
      "score": 3,
      "rationale": "Tasks reproducing the criterion situation of dental practice are the assessment spine, not a single instance: ongoing assessment of simulation practice and an OSCE in year 1, an OSCE plus ongoing assessment of clinical practice and a portfolio of patient case reports in year 2, mini-clinical evaluation exercises across specialist activities and case-based discussions in year 3, and an OSCE, portfolio of ongoing patient care and case presentation in the year-4 capstone — at least one per stage, with the capstone on top. The genuine constraint of practice is documented rather than labelled (R4): standardised case-based discussions and a viva on an UNKNOWN case/patient supply an externally set, ambiguous problem under time limits, and the assessed requirement to comply with national standards for safety, quality and clinical care is the profession's own standard of performance. Scored on task fidelity only — appraisal of quality is left to C2 and workplace immersion to W3.",
      "evidenceLines": [
        "Objective Structured Clinical Examination (OSCE) 3 Hours (3000 words equivalent)",
        "Ongoing Assessment of Simulation Practice",
        "Mini-Clinical Evaluation Exercises (up to 5 specialist practice activities)",
        "Portfolio: a student curated compilation of patient case reports from general dental practice, periodontics and removable prosthodontics clinics",
        "Standardised case-based discussion (Unknown case)",
        "Standardised Case-Based Discussion (Unknown Case)",
        "Comply with national standards for safety, quality and clinical care, and explain their responsibilities for the safe and effective management of persons under their care;",
        "This year-long subject is developed as a capstone experience with a practice based learning approach."
      ]
    },
    "W3": {
      "score": 3,
      "rationale": "Level 3 on every clause. Extended and required: clinical placement is core from year 2 and becomes the whole of the 100-credit-point final-year subject, spanning the Royal Dental Hospital of Melbourne, the Melbourne Dental Clinic, urban and rural community health centres and hospital rotations. Practitioner supervision is documented ('Under supervision, students apply knowledge in real-world settings'). It is assessed and carries accountability to the host: attendance at all clinical placements, hospital rotations, on-call and emergency service is a pass/fail hurdle, as is a portfolio of ongoing patient care, and the rural rotation carries its own presentation and report. Structured reflection on professional practice is explicit in the placement design. Simulation evidence is excluded here and scored in W2.",
      "evidenceLines": [
        "Clinical placement occurs at the Royal Dental Hospital of Melbourne and other metropolitan and rural sites.",
        "This subject comprises clinical learning (general dentistry) in the Melbourne Dental Clinic (MDC), the Royal Dental Hospital of Melbourne, urban community health centres, specialist practice/hospital clinics and rural community health clinics.",
        "Clinical experiences: Under supervision, students apply knowledge in real-world settings, focusing on general practice, periodontics and removable prosthodontics.",
        "Attendance at all Back-to-Base sessions & Clinical Placements (including hospital rotations, On-Call, Emergency Service & Field visits) (Pass/Fail)",
        "Portfolio of ongoing patient care (Pass/Fail)",
        "Rural Placement Presentation and Report",
        "The clinical practice sessions, especially at the community health centres, will allow students to reflect on emotional and practical issues of transition from the university learning environment to the world of independent clinical practice.",
        "Ongoing assessment of clinical practice*"
      ]
    },
    "workplace": 9,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "An all-compulsory specialist core with an enforced staged progression chain and external accreditation: 400 credit points of compulsory subjects, every subject in a year required before progression to the next, and the sequence externally accredited by the Australian Dental Council. Technical depth is progressive across the named subject chain (preclinical practice, then Dental Practice 2, 3 and Comprehensive Dental Practice). Nothing generic or interchangeable.",
        "evidenceLines": [
          "The Doctor of Dental Surgery requires the successful completion of 400 credit points of compulsory subjects.",
          "All subjects in each year of study (100 credit points) must be successfully completed for progression to the next year of study.",
          "Australian Dental Council (ADC)"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessments require defended trade-off decisions under real uncertainty and accountability: a viva of an unknown patient and standardised case-based discussions on unknown cases in years 2, 3 and 4, plus assessed treatment planning that requires proposing options and arriving with the patient at a treatment of choice for simple and complex conditions, and comprehensive planning that weighs prognosis and individual patient context. This is not recall or scripted response.",
        "evidenceLines": [
          "Oral Exam (Viva Voce)- of an unknown patient (3000 word count equivalence)",
          "Standardised Case-Based Discussion (Unknown Case)",
          "demonstrate skills in formulating appropriate treatment plans to suit the patient (for simple and complex general dental conditions), be able to propose treatment options (based on sound oral health care philosophies) and discuss with the patient to arrive at the treatment of choice;",
          "Formulate and record a person-centred comprehensive treatment plan considering prognosis and individual patient context, incorporating specialist and other health and care professionals."
        ]
      }
    },
    "ambiguities": [
      "C2 straddled 2 and 3: the four-year programmatic portfolio with milestone feedback could be read as process-focused assessment evidencing strategy adjustment over time (level 3), but no task specification requires a documented and justified reliance decision or a recorded change of strategy. Scoring-direction rule (never resolve upward) held it at 2.",
      "C3 straddled 1 and 2: 'Critically evaluate the use of digital technologies ... considering ... ethical implications, and health system limitations' addresses limits, which reads toward level 2, but it is an outcome statement with no matching assessment task, and there is no AI content at all. R2 plus the downward rule held it at 1.",
      "C5 straddled 2 and 3: the research project is required of every student and supervised by a mentor with staged deliverables, which reads toward level 3, but the project is described as 'small' and may be 'professionally focused' rather than generating primary evidence, and no viva or defence of methodology is specified. Downward rule held it at 2.",
      "Unknown-case and unknown-patient assessments evidence both C4 level 2 (application to unfamiliar problems) and W2 level 3 (an externally supplied, ambiguous problem). Under one-construct-one-home they are cited in W2, since W2's anchor names the practice constraint; C4 is scored 3 on separate research-project evidence.",
      "The final-year clinical subject supplies evidence that could be read into C1 (interprofessional team coordination) and C4 (work-integrated learning). Per the v4.1 migration notes both routes moved to W3, so all placement evidence is scored there and nowhere else.",
      "Group presentations in the two research subjects support both C1 (assessed collaboration) and C5/W1 (communicating findings). They are cited for C1's collaboration anchor; W1's score rests on patient-facing and professional-conduct assessments instead."
    ],
    "notScoreable": [
      "C3 — the AI half of the construct is unevidenced rather than scored: the extract contains no mention of artificial intelligence, generative AI or AI governance in any course page, subject overview, learning outcome or assessment. The score of 1 rests entirely on digital-health evidence, so a future capture that includes any AI content should re-score this item rather than assume 1 is stable."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-dmed": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 is satisfied and level 1 is factually contradicted: a compulsory core subject (MEDS90003 Student Conference 1, one of the eight compulsory subjects) assesses a group task as a hurdle, so collaboration is not merely an outcome claim. Level 3 fails on both of its conjuncts as documented: the extract carries no assessment in which the division of work between people AND tools/AI systems is itself assessed (there is no AI or digital-tool content anywhere in the core), and recurrence of assessed collaborative practice across the program cannot be shown because the assessment pages for the Year 2-4 core subjects are absent. Interprofessional teamwork appears only as a course-level outcome statement, which R2 makes insufficient on its own.",
      "evidenceLines": [
        "Oral Group Presentation",
        "Hurdle requirement: Satisfactory standard.",
        "Theme: Collaborative practitioner (Skills). Demonstrate effective teamwork skills by collaboration as members of learning groups.",
        "Working effectively and respectfully as a leader or co-member of intra- and interprofessional health teams, recognising the contributions of all health care team members to shared learning, to improve patient and population health outcomes."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2's 'portfolio with standards' and 'peer review' exemplars are both documented in core assessment: the MEDS90031 ePortfolio is marked to a satisfactory standard in each of five named themes as a hurdle, and the Mini-CEX series explicitly includes peer assessment, i.e. students appraising the quality of clinical work against criteria. Level 3 is not reached: nothing in the extract requires students to document and justify reliance decisions, defend judgements of a tool's or source's output, or evidence strategy adjustment over time. The 'Self-regulated learner' ePortfolio theme is a named theme, not a documented requirement to evidence adjustment, so the ambiguity is resolved downward.",
      "evidenceLines": [
        "ePortfolio A student curated compilation that responds to prescribed tasks submitted regularly throughout the year, addressing five key themes: - First Nations - Clinician researcher - Professional practitioner - Self-regulated learner - Determinants of health and health systems",
        "Hurdle requirement: In order to pass this hurdle, students are required to achieve a satisfactory standard in each of the five ePortfolio themes",
        "8 Mini CEX submitted at even time points throughout the year, including a mixture of peer and tutor/clinician assessment",
        "The level of performance required to pass each hurdle is determined by a rigorous standard setting procedure"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1's anchor is met exactly: digital content appears only in the selective (Discovery) substitution lists - Digital Transformation of Health, Digital Learning Health Systems, Elements of Bioinformatics - from which a student takes 12.5 points or may take none of them, and where the documented digital learning is tool operation ('practical activities with simulations of tools such as electronic health records...'). Level 2 fails because no compulsory core subject addresses AI or digital capabilities and their limits, and level 3 fails for the same reason plus the absence of any assessed critique or governance task. The extract contains no occurrence of 'AI', 'artificial intelligence', 'machine learning' or 'generative' anywhere, including the course-level outcomes and the 67-statement graduate attribute framework, so this is not scored 0 only because the elective route exists.",
      "evidenceLines": [
        "• Four selective (Discovery) subjects (87.5 points)",
        "12.5 credit points from the following list of subjects:",
        "Digital Transformation of Health",
        "Digital Learning Health Systems",
        "Elements of Bioinformatics",
        "Demonstrate understanding of how core digital health technologies work, through practical activities with simulations of tools such as electronic health records, clinical decision support systems, patient portals, and mobile apps and wearable sensors"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 is met by core assessment requiring application to unfamiliar problems: two written situational judgement tests (a hurdle) present unseen professional scenarios, and four cumulative achievement tests require earlier learning to be reapplied later in the year. Level 3 requires documented structured progression toward independent learning evidenced in assessment; the course page asserts a Year 4 research project in an area of interest and a Discovery pathway at each level, but the subject and assessment pages for MD Discovery 2, 3 and 4 (MEDS90040/90041/90042/90043/90044) are not in the extract, so no assessment evidence for a self-scoped project or for assessed identification of one's own knowledge gaps plus a plan to close them can be quoted. R2 forbids resolving that upward on an overview statement.",
      "evidenceLines": [
        "Professional Behaviour: 2 x Written situational judgement test (SJT)",
        "Cumulative Achievement Test 1 (CAT1)",
        "Theme: Clinical reasoning (Skills). Derive a list of potential causes for common clinical presentations, integrating knowledge of biomedical sciences and determinants of health with patient assessment findings",
        "A highlight of the MD program is the opportunity for students to individualise their learning experiences through participation in a Discovery learning pathway at each level of the MD.",
        "In Year 4 students complete a research project in an area of interest and undertake a clinical placement-based capstone experience- learning as trainee junior doctors."
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1's anchor - introductory methods content and literature/evidence-appraisal assessment - is what the extract documents: research methods is named as an embedded theme, the Year 1 clinician-researcher outcome is literature searching and question formulation, and the assessed Student Conference ePortfolio includes a 'research evaluation' category. Level 2 requires students to design and conduct an inquiry with methodology selection and data collection, assessed; the only support is the course-page sentence that Year 4 students complete a research project, with no assessment page documenting methodology selection or data collection. Level 3 additionally fails on its own terms because the research route is explicitly one of two pathways ('research scholar pathway ... or a clinical scholar pathway'), and no defence under scrutiny is documented. Ambiguity between 1 and 2 resolved down.",
      "evidenceLines": [
        "Embedded within each of these domains are the themes of First Nations Health, Population and Global Health and research methods.",
        "Theme: Clinician Researcher (Skills). Formulate focused clinical questions, apply the principles of literature searching and identify a range of relevant resources to resolve these questions or identify knowledge gaps.",
        "Student Conference ePortfolio: A student curated compilation that responds to prescribed tasks addressing three categories: Conference reflection, research evaluation and academic participation",
        "Hurdle requirement: In order to pass this hurdle, students are required to achieve a satisfactory standard in each of the three ePortfolio categories",
        "In the final two years of Discovery learning, students can choose to follow a research scholar pathway that extends their knowledge and skills in research and leadership or a clinical scholar pathway that extends their knowledge and skills in health advocacy and leadership."
      ]
    },
    "adaptiveness": 8,
    "W1": {
      "score": 2,
      "rationale": "Level 2 is clearly met: core assessment requires the profession's own communicative genre with an audience beyond the teaching team - mini clinical encounters conducted and judged by tutors/clinicians on placement - and professional conduct is assessed against criteria drawn from practice (the MD Professional Behaviour Guidelines, as a hurdle). Level 3 requires BOTH a clinician/external judge AND that professional communication be 'assessed repeatedly and progressively across the program'. The first conjunct holds; the second cannot be verified from this extract, which carries assessment pages for Year 1 only (MEDS90031, MEDS90003) - the pages for Principles of Clinical Practice 2 and 3, Transition to Practice and Student Conferences 2-4 are absent. Per the ambiguity rule this is resolved to the lower level rather than inferred from the sequential-build claim in the graduate attribute framework.",
      "evidenceLines": [
        "Professional Behaviour: Observed professional behaviour, using current MD guidelines",
        "Hurdle requirement: Satisfactory standard in professional behaviour, as demonstrated by observed Professional Behaviour using the MD Professional Behaviour Guidelines, Situational judgement tests and satisfactory completion of the Academic Integrity Quiz.",
        "Mini Clinical Encounter (Mini-CEX)",
        "Hurdle requirement: Must maintain a satisfactory standard in professional behaviour, as demonstrated by observed Professional Behaviour Assessment.",
        "Theme: Professional practitioner (Skills). Consistently display professional behaviour encompassing reliability; appropriate interactions with others; willingness to accept and respond to feedback; and personal behaviours in line with relevant codes of conduct and scope of practice."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "DEMOTED from 3 to 2 on adversarial verification. Level 2 is met exactly and is the ceiling the quotable evidence supports: the MEDS90031 clinical assessment hurdle requires a standard-set pass in the OSCE including at least one history and one physical examination station, i.e. a core assessment that reproduces a professional task end to end, produces the artefact a practitioner would produce (a taken history, a performed examination), and is judged against criteria drawn from practice. Level 3 fails on conjunct (a): the claim that such tasks form the program's assessment spine rests on the course-overview sentence about a Year 4 'clinical placement-based capstone experience', which is narrative prose on the course page, not an assessment page, task or hurdle - and the same sentence was ruled insufficient for C4 level 3 under R2, so it cannot be sufficient here. No subject or assessment page for MEDS90025 (Transition to Practice) or the Year 4 Discovery subjects is in the extract, and the 'at least one per stage' alternative fails because verifiable professional-fidelity assessment exists for Year 1 only. Conjunct (b) is also over-read: Modified Angoff and Borderline Regression are psychometric cut-score procedures, not the profession's own standards of performance in the criterion-situation sense. Evaluative judgement is scored in C2; the placement immersion itself is scored in W3.",
      "evidenceLines": [
        "Objective Structured Clinical Examination (OSCE)",
        "Hurdle requirement: In order to pass this hurdle, students are required to achieve: • Satisfactory standard in each mini clinical encounter and • The standard set pass score in the OSCE, including a pass for at least one history and one physical examination station.",
        "Minimum performance standards across all standardised assessments in the MD program (for example OSCE and MCQ assessments) are set using widely accepted standard setting methods (such as the Modified Angoff and Borderline Regression approaches).",
        "Clinical placement is complemented with small group tutorials, simulation, clinical and procedural skills alongside online interactive learning.",
        "The Doctor of Medicine (MD) is accredited by the Australian Medical Council."
      ]
    },
    "W3": {
      "score": 3,
      "rationale": "Every level-3 element is documented. Extended and required: clinical settings in each year of the program, with Years 2 and 3 full-time immersion in clinical placement, all within the eight compulsory subjects rather than an elective route. A sequence rather than one instance: longitudinal community and hospital placements in Year 1, full-time placement in Years 2-3, a placement-based capstone in Year 4. Practitioner-supervised: students work under the guidance of tutors from a mixture of scientific and clinical professions, and clinical encounters carry tutor/clinician assessment. Assessed: the clinical assessment hurdle requires a satisfactory standard in each mini clinical encounter. Structured reflection on professional practice: the ePortfolio, submitted regularly through the year against prescribed themes including 'Professional practitioner' and 'Self-regulated learner', is a hurdle. Simulation is excluded from this item and counted in W2.",
      "evidenceLines": [
        "The MD is a full-time course of study, with learning in clinical settings in each year of the program.",
        "In years 2 and 3 students are immersed in full time clinical placement where they apply foundational knowledge and skills to a broad range of patient encounters in a wide variety of health care settings.",
        "Clinical skills are developed through use of peer learning, simulation and longitudinal community and hospital based clinical placements.",
        "Throughout the year, students work towards establishing introductory level clinical competencies while working under the guidance of tutors from a mixture of scientific and clinical professions.",
        "8 Mini CEX submitted at even time points throughout the year, including a mixture of peer and tutor/clinician assessment",
        "ePortfolio A student curated compilation that responds to prescribed tasks submitted regularly throughout the year, addressing five key themes: - First Nations - Clinician researcher - Professional practitioner - Self-regulated learner - Determinants of health and health systems",
        "The ability to adapt to and learn within a workplace setting"
      ]
    },
    "workplace": 7,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "An all-compulsory specialist core plus an accredited sequence plus a staged progression rule - the gate's three alternative PASS routes are all present. 312.5 of the 400 points are eight compulsory subjects, the course is accredited by the Australian Medical Council and leads to registration, and progression is gated on completing 100 points in each of the first three years. Nothing here is generic or interchangeable content.",
        "evidenceLines": [
          "• Eight compulsory subjects (312.5 points) and",
          "Successful completion of 100 credit points of study is required in the 1st, 2nd and 3rd years of the course for progression from one year level to the next.",
          "The Doctor of Medicine (MD) is accredited by the Australian Medical Council.",
          "Graduates of the Doctor of Medicine are eligible for provisional registration with the Medical Board of Australia and full registration upon completion of an accredited internship."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment is not recall or scripted response only. Situational judgement tests and the mini clinical encounter/OSCE hurdle require judgements made under uncertainty with accountability, and the Year 4 placement-based capstone places students in live clinical work as trainee junior doctors. The course-level outcome names prioritising a differential diagnosis and informing a management plan - a defended trade-off decision - and the assessment tasks above are where that is examined, so the gate does not rest on an outcome statement alone.",
        "evidenceLines": [
          "Professional Behaviour: 2 x Written situational judgement test (SJT)",
          "Hurdle requirement: In order to pass this hurdle, students are required to achieve: • Satisfactory standard in each mini clinical encounter and • The standard set pass score in the OSCE, including a pass for at least one history and one physical examination station.",
          "Using clinical reasoning to synthesise ongoing clinical assessment findings, best medical evidence, population-level data and patient contexts, to prioritise the differential diagnosis and inform the management plan.",
          "In Year 4 students complete a research project in an area of interest and undertake a clinical placement-based capstone experience- learning as trainee junior doctors.",
          "the ability to manage uncertainty"
        ]
      }
    },
    "ambiguities": [
      "C1 (1 vs 2): the Student Conference 1 'Oral Group Presentation' is assessed as a hurdle but the extract does not document individual accountability within the group, which is one of the level-2 exemplars. Resolved to 2 rather than down, because level 1's anchor ('no core unit assesses it') is directly contradicted by an assessed group task in a compulsory subject; the exemplar detail is illustrative, not a condition.",
      "C2 (2 vs 3): the ePortfolio's 'Self-regulated learner' theme, submitted regularly across the year, could be read as process-focused evidence of strategy adjustment over time (level 3). The extract names a theme, not a requirement to evidence adjustment or justify reliance decisions. Resolved DOWN to 2 by the lower-level rule.",
      "C4 (2 vs 3): the course overview asserts a Year 4 research project in an area of interest and a four-level Discovery progression toward personalised learning, which reads as level-3 structured progression to independent learning. No assessment page for MD Discovery 2/3/4 is in the extract. Resolved DOWN to 2 by R2 (level 3 needs quoted assessment evidence).",
      "C5 (1 vs 2): 'In Year 4 students complete a research project in an area of interest' could imply a designed inquiry with data collection (level 2). Nothing documents methodology selection or data collection being assessed, and the research pathway is explicitly one of two routes. Resolved DOWN to 1.",
      "W1 (2 vs 3): the clinician-judged half of level 3 is met (Mini-CEX assessed by tutors/clinicians, professional conduct an explicit hurdle criterion), but 'assessed repeatedly and progressively across the program' cannot be verified - only Year 1 assessment pages are in the extract. Resolved DOWN to 2 by the lower-level rule.",
      "W2 (2 vs 3) [resolved on adversarial verification]: the level-3 'assessment spine' conjunct was initially carried by the course-overview capstone sentence and by the program-wide standard-setting policy statement. Neither is an assessment page, task or hurdle, and the same capstone sentence was ruled insufficient for C4 level 3 under R2. With verifiable professional-fidelity assessment present for Year 1 only, resolved DOWN to 2.",
      "W2 vs W3 (one construct, one home): the clinical placement is the setting for both items. The placement's existence, extent, practitioner supervision and reflective assessment are scored ONLY in W3; the fidelity of the assessed tasks (OSCE history and examination stations, standard-set performance criteria) is scored ONLY in W2. Simulation is counted in W2 per the W3 exclusion.",
      "C2 vs W1 (shared line): the Mini-CEX line 'a mixture of peer and tutor/clinician assessment' carries two constructs. The PEER-appraisal element scores in C2 (appraisal of the quality of work); the clinician-judged clinical-encounter element scores in W1 (communication and conduct judged by a practitioner). Declared rather than double-counted at full weight in both.",
      "C4 vs W3 (transfer on placement): the line about applying foundational knowledge to a broad range of patient encounters in varied settings is transfer-shaped, but it is placement evidence and so is scored in W3 only; C4 rests on the SJTs and cumulative achievement tests instead."
    ],
    "notScoreable": [
      "All eight items were scoreable; the following are coverage gaps in the extract that capped C4, C5, W1 and W2 rather than items left unscored.",
      "Assessment pages absent for six of the eight compulsory core subjects: MEDS90004 (Principles of Clinical Practice 2), MEDS90020 (Principles of Clinical Practice 3), MEDS90025 (Transition to Practice), MEDS90005/MEDS90022/MEDS90024 (Student Conferences 2-4). Only MEDS90031 and MEDS90003 assessment pages are present, so all program-wide recurrence claims rest on course-page statements.",
      "Subject and assessment pages absent for MD Discovery 2/3/4 (MEDS90040, MEDS90041, MEDS90042, MEDS90043, MEDS90044) - the vehicles for the Year 4 research project, the capstone and the clinical/research scholar pathways. This is the specific evidence that would settle C4 level 3, C5 level 2 and W2 level 3.",
      "No AI or generative-AI content appears anywhere in the extract, including the course-level outcomes and the 67-statement graduate attribute framework; C3's score reflects a documented absence, not missing pages."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-doptom": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2's anchor — 'at least one core unit assesses collaborative practice' — is met several times over: group seminar presentations carry marks in five year-1 subjects and in the year-2 Applied Clinical Training, and the year-2 capstone assesses a team proposal (hurdle), a group poster (hurdle) and team experimental work. Level 3 is not reached: it requires, beyond recurrence, that 'at least one assessment requires coordinating work across people AND tools/AI systems', and nothing in the extract documents an assessed division of work between people and systems, nor any tool/AI allocation. Interprofessional collaboration appears only as an intended learning outcome, which R2 bars from lifting the score. Placement/clinical-team evidence is deliberately not scored here — it homes in W3.",
      "evidenceLines": [
        "Two x 40-minute group seminar presentations, throughout the year",
        "Group seminar presentation (approx. 5 students per group)",
        "Group poster presentation (~5 students per group)",
        "Group project proposal (~5 students per group) (Pass/fail)",
        "Hurdle requirement: Must pass the proposal.",
        "The practical component of the project will typically involve experimental work on humans or animals and will usually be undertaken as a collaborative team effort.",
        "collaborate with other health professionals to ensure patient safety and to enhance the quality of care; and"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2's anchor — 'criterion-referenced appraisal of quality: peer review, structured critique' — is met by Visual Neuroscience, where developing AND evaluating MCQs is a 25%-weighted assessment explicitly framed as evaluating and giving feedback on peers' work. Level 3 requires assessment that makes students 'document and justify reliance decisions', defend judgements of AI-output quality, or 'evidence strategy adjustment over time'. No assessment in the extract requires a reliance decision on a tool, source or collaborator to be documented or defended, and there is no AI-output appraisal anywhere. The one candidate for the 'strategy adjustment over time' route — the year-4 portfolio's monitoring and revision of a personal learning plan — sits inside the placement subject and homes in W3 under the one-construct-one-home rule. Scored at the lower level accordingly.",
      "evidenceLines": [
        "Multiple-choice question development and evaluation (5 in total)",
        "Develop and evaluate multiple-choice questions based on key concepts in visual neuroscience, demonstrating advanced understanding and critical thinking while contributing to peer learning."
      ]
    },
    "C3": {
      "score": 0,
      "rationale": "The extract covers the whole compulsory core — all eight year-1 subjects plus the year-2, year-3 and year-4 subjects, with every assessment page — so absence is informative rather than a gap. No core unit or program-level outcome addresses AI capabilities, limitations, ethics, governance or societal impact, so level 2's 'core units address AI capabilities AND limitations/ethics' and level 3's discipline-context critique or governance requirement both fail outright. Level 1 was considered on two incidental mentions — 'computational' listed among a dozen possible research techniques, and computer-assisted learning tasks as one evidence type in the year-4 portfolio — but neither is digital-tool operation or training in the level-1 sense, and clinical instrument training is framed throughout as ophthalmic technique, not digital capability. Ambiguity between 0 and 1 resolved DOWN per the scoring-direction rule.",
      "evidenceLines": [
        "Results from computer-assisted learning tasks.",
        "The project will usually involve an in-depth appraisal of the scientific literature and, as appropriate to the topic, the use of biochemical, molecular biological, pharmacological, neurophysiological, psychophysical, computational, epidemiological or advanced clinical techniques.",
        "Explain the optical principles behind the ophthalmic instruments used to assess ocular health."
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Demoted from 3 on adversarial refutation. Level 2's anchor — application to novel or unfamiliar problems — is amply met: case studies link basic-science topics to clinical practice, assessed clinical performance puts students in front of unseen patients, and the year-2 capstone requires self-directed project work under competing time demands. Neither level-3 route survives. The work-integrated route (year-4 learning portfolio: assessed knowledge-gap identification plus a personal learning plan) is barred by the one-construct-one-home rule — 'Placement evidence scores in W3, never in C1 or C4' — and by C4's own v4.1 migration note moving the work-integrated-learning route to W3; all of that evidence sits inside OPTO90028, and the reflective-essay line is already cited in W3 as its structured-reflection condition. That route additionally depends on reading the subject's intended learning outcomes as marking criteria, which R2 bars. The self-scoped-capstone route is not documented as self-scoped: students are involved 'in an investigation in vision science and/or optometry under the supervision of a member of the academic staff', i.e. a supervisor's investigation, and the team-written proposal scopes method and timeline within a project already given; the extract never states students choose the question. With one route barred and the other ambiguous, the scoring-direction rule (never resolve upward) fixes C4 at 2.",
      "evidenceLines": [
        "exploration of case studies that link key topics of basic sciences to clinical practice",
        "Clinical performance",
        "manage competing demands on time, including self-directed project work;",
        "Group project proposal (~5 students per group) (Pass/fail)"
      ]
    },
    "C5": {
      "score": 3,
      "rationale": "Level 3 needs a substantial primary-evidence project that is REQUIRED rather than one route among several, with methodology defended under scrutiny. Requirement: the course overview states the research project is a required component, and the 25-point year-long subject is listed under 'Compulsory subjects' with no alternative pathway in the structure. Primary evidence: students conduct experimental work on humans or animals, analyse the data and write an individually prepared publication-ready manuscript worth 80%. Methodology under scrutiny: the design is staged and supervised — a proposal setting aims and methods must be passed at Week 6, engagement in the laboratory is assessed throughout, the poster must be passed mid-semester 2 in a conference setting, and the manuscript is itself a hurdle, all under academic-staff supervision. That is the 'staged supervised review' the anchor names, so the score does not rest on inferring a viva that the extract never mentions.",
      "evidenceLines": [
        "A research project, with clinical relevance, is conducted as a required component of the degree.",
        "This second year Doctor of Optometry capstone subject aims to provide an authentic research experience in the discipline by involvement in an investigation in vision science and/or optometry under the supervision of a member of the academic staff.",
        "The practical component of the project will typically involve experimental work on humans or animals and will usually be undertaken as a collaborative team effort.",
        "Hurdle requirement: Must pass the proposal.",
        "Participation- Ongoing assessment of individual engagement in the laboratory or other setting throughout the study period",
        "Hurdle requirement: Must pass the presentation.",
        "Written Assignment- An individually prepared publication-ready manuscript",
        "Hurdle requirement: Must pass the manuscript",
        "identify, plan and conduct research to test a hypothesis in the vision sciences and/or optometry; and"
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 3,
      "rationale": "Level 2's threshold — a recognised professional genre or an audience beyond the teaching team — is passed by the year-3 hurdle requiring satisfactory oral/written case reports, a genre the profession uses. Level 3's two additional conditions are also documented. Repeated and progressive: assessed spoken communication runs from year-1 group seminar presentations (five subjects) through year-2 seminar presentations, into assessed clinical performance in years 2 and 3, and finally the year-4 portfolio. Real external audience or practitioner: clinical performance carries marks for examining and managing real patients — the anchor names 'patient' explicitly — and the year-4 portfolio is built from clinical feedback and signed patient-examination records from local and external sites. Professional conduct among the assessed criteria: the portfolio essay is marked on 'attitudes at a level appropriate to a newly graduated optometrist' against ILOs whose Professionalism domain names honesty, reliability and confidentiality. Scored on documented assessment features, not the stated graduate attributes, which R2 and Barrie bar.",
      "evidenceLines": [
        "Hurdle requirement: Satisfactory performance in competency assessments, typically stream-specific written examinations, clinical proficiency examinations and oral/written case reports.",
        "Clinical performance",
        "Clinical performance, throughout the year",
        "Group seminar presentation (approx. 5 students per group)",
        "Identify key clinical findings, interpret test results, and formulate a management plan, effectively communicating clinical reasoning in a structured seminar presentation.",
        "demonstrate interpersonal and communication skills, both written and oral, to establish and maintain professional relationships with patients, professional colleagues and the general public;",
        "describe the moral, ethical and legal responsibilities of professional conduct, and apply them in clinical practice;",
        "demonstrate honesty, integrity, respect, reliability, responsibility, and confidentiality in all professional interactions;",
        "Clinical feedback from local and external sites (e.g. clinical feedback system);",
        "Tables of signed patient examinations, feedback and clinical skills performed at placements;"
      ]
    },
    "W2": {
      "score": 3,
      "rationale": "Level 2 is met by tasks that reproduce a professional task end to end — the OSCE, in which students conduct a full refractive or ocular-health examination in a simulated clinical environment following best-practice techniques, produces exactly what a practitioner produces and is judged on clinical competency. Level 3 requires such tasks to be the assessment spine and at least one to carry a genuine constraint of practice. Spine: at least one per stage — three OSCEs plus practical tests across year 1, competency and clinical-proficiency examinations as a hurdle in year 2, clinical-proficiency examinations and case reports as a hurdle in year 3, and OSCEs again in year 4. Constraint of practice: the OSCE applies 'the profession's own standards of performance' in the anchor's sense — a minimum competency standard that fails the whole subject when unmet regardless of every other mark, in a course accredited for registration. Scored on documented task features, not on the handbook's own use of the word 'authentic' (R4). Workplace immersion is excluded here and scored in W3.",
      "evidenceLines": [
        "Practical examination (OSCE)",
        "Hurdle requirement: Students must achieve a pass grade in the Objective Structured Clinical Examination (OSCE) to pass the subject. Failure to meet the minimum competency standard in the OSCE, even if other assessments are passed, will result in a fail for the subject.",
        "Conduct a thorough refractive examination in a simulated clinical environment using ophthalmic equipment and best-practice techniques.",
        "Conduct a clinical examination of ocular health in a clinical training setting using key ophthalmic equipment and techniques, following current best-practice standards.",
        "Hurdle requirement: Satisfactory performance in competency assessments, typically stream-specific written examinations and clinical proficiency examinations throughout the year.",
        "Hurdle requirement: Satisfactory performance in competency assessments, typically stream-specific written examinations, clinical proficiency examinations and oral/written case reports.",
        "Hurdle requirement: 100% attendance at clinical placements. Satisfactory performance in OSCEs.",
        "It is an internationally recognised qualification with full accreditation from the Optometry Council of Australia and New Zealand."
      ]
    },
    "W3": {
      "score": 3,
      "rationale": "Level 3's anchor — 'an extended placement or practicum, or a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection' — is documented in full. Sequence in the core: clinical placements begin in first year and grow to become the main activity, are attendance-hurdled in the compulsory year-2 and year-3 subjects, and culminate in the 100-point compulsory year-4 Optometry Internship rotating through teaching clinics, public and private practices, hospital, rural and overseas sites. Extended: the portfolio evidence is expected to rest on over 1,000 hours of clinical practice. Practitioner supervision and accountability to the host: clinical feedback from local and external sites, reports from external placements, and tables of signed patient examinations and skills performed at placements, with 100% attendance a hurdle. Structured reflection: a 4,000-word personal reflective essay on clinical practice, marked against the subject's outcomes; the assessed personal learning plan (self-assessment of performance, then developing, monitoring and revising the plan) also homes here rather than in C2 or C4.",
      "evidenceLines": [
        "Optometry Internship (OPTO90028)",
        "The OD is a four-year full-time program consisting of a combination of on-campus teaching and clinical placements. Clinical studies commence in first year and gradually increase to become the main learning activities in the final year.",
        "The variety of clinical settings may include clinical rotations based in the University of Melbourne teaching clinics, public and private metropolitan practices, and hospital clinics.",
        "A learning portfolio (see below)",
        "2. Evidence compiled throughout the year (expected to be based on over 1,000 hours of clinical practice, and to comprise over 10,000 words of documentation), such as:",
        "Reports from external placements;",
        "Clinical feedback from local and external sites (e.g. clinical feedback system);",
        "Tables of signed patient examinations, feedback and clinical skills performed at placements;",
        "Hurdle requirement: 100% attendance at clinical placements. Satisfactory performance in OSCEs.",
        "Hurdle requirement: 100% attendance at preclinical duties and clinical placements",
        "A personal reflective essay that demonstrates evidence of clinical practice experience, and of clinical knowledge, skills and attitudes at a level appropriate to a newly graduated optometrist, as outlined in the intended learning outcomes (4,000 words)"
      ]
    },
    "workplace": 9,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The gate's PASS condition names 'an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain' — this program satisfies all three. Every one of the 400 credit points is compulsory, the sequence moves from basic vision sciences and pre-clinical training in year 1, to applied clinical sciences and research in year 2, to clinical practice in year 3, to advanced practice in year 4, and the whole is externally accredited for registration. No generic or interchangeable content appears anywhere in the structure.",
        "evidenceLines": [
          "These 400 points of credit are accumulated from a compulsory series of six core subjects totalling 100 points per year.",
          "Doctor of Optometry 1st year (100 points): Covers the basic vision sciences and pre-clinical optometry training.",
          "Doctor of Optometry 3rd year (100 points): Covers further applied clinical vision sciences and clinical optometry training, as well as clinical optometry practice.",
          "Doctor of Optometry 4th year (100 points): Covers advanced clinical optometry practice",
          "It is an internationally recognised qualification with full accreditation from the Optometry Council of Australia and New Zealand."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The gate passes on the 'simulations/capstones/live projects with real uncertainty and accountability' limb and on defended trade-off decisions. Assessed clinical performance and case reports require students to develop AND justify a management plan by weighing research evidence, clinical expertise, the individual patient and the practice context — a defended trade-off under diagnostic uncertainty, with real patients supplying the accountability. Year-1 assessment already requires proposing evidence-based management strategies from interpreted findings, and the year-2 capstone adds a live research project. This is not recall or scripted response, though written examinations still carry 80% of the marks in years 2 and 3.",
        "evidenceLines": [
          "use evidence-based practice to develop and justify an appropriate management plan, considering the best available research evidence, clinical expertise, the individual patient and the practice context;",
          "develop and justify an appropriate management plan use evidence-based practice, considering the best available research evidence, clinical expertise, the individual patient and the practice context;",
          "Analyse clinical findings, interpret test results, and reflect on challenges in vision assessment to propose evidence-based management strategies and identify areas for professional growth.",
          "Additionally, students will work in small groups and as individuals to explore the evidence-based management of clinical cases.",
          "recognise and work within the limits of their competence and scope of practice."
        ]
      }
    },
    "ambiguities": [
      "C4 was demoted from 3 to 2 on adversarial refutation. Level-3 route two (year-4 portfolio: assessed knowledge-gap identification plus personal learning plan) is barred by one-construct-one-home ('Placement evidence scores in W3, never in C1 or C4') and by C4's v4.1 migration note; the same reflective-essay line is cited in W3, so counting it in C4 would double-count. Level-3 route one is not documented as self-scoped. Scoring-direction rule fixed C4 at 2.",
      "C3 straddled 0 and 1. Two incidental mentions ('computational' among a list of possible research techniques; 'Results from computer-assisted learning tasks.' as one portfolio evidence type) plus extensive ophthalmic-instrument training could be read as level-1 tool operation. Neither is digital or AI capability content, and instrument training is framed as clinical technique throughout, so the scoring-direction rule (never resolve upward) fixed it at 0.",
      "The year-4 portfolio's assessment of a personal learning plan that students 'monitor and revise' was a candidate for C2 level 3 ('evidence strategy adjustment over time') and for C4 level 3 (assessed knowledge-gap identification). Both are placement evidence inside OPTO90028, so it homes in W3; C2 stays at 2 and C4 at 2.",
      "C4 and C5 both draw on the year-2 capstone, which the v4.1 rubric names in both anchors. To avoid halo, C5 carries the primary-evidence generation and methodology defence, while C4 cites only the self-directed project-work aspect — which supports level 2, not level 3.",
      "C5 level 3's 'methodology defended under scrutiny' — the extract documents no viva or oral defence. It was scored on the 'staged supervised review' limb (proposal hurdle at Week 6, assessed laboratory participation, poster hurdle, manuscript hurdle, all under academic supervision). Had the anchor required a viva specifically, this would be a 2.",
      "W1's external-audience condition draws on patient-facing clinical performance and on external-site clinical feedback, which is also placement evidence homed in W3. W1 scores only the communication-to-audience and professional-conduct aspect; W3 scores the immersion, supervision and host accountability. The seminar presentations counted for the 'repeated and progressive' condition are addressed to peers and staff and would only reach level 1 on their own.",
      "W2 vs W3 — assessed 'Clinical performance' in the year-2 and year-3 subjects is simultaneously a high-fidelity professional task and real workplace participation. W2 was scored on the simulation and OSCE evidence and the profession's competency standards only, leaving the placement immersion wholly to W3.",
      "Assessment weightings in years 2 and 3 remain 80% written examinations; the level-3 W2 judgement rests on the hurdle structure (which gates the whole subject) rather than on mark weighting."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-dphysio": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 is met several times over: core units assess collaborative practice as group work and as community-stakeholder work. Level 3 fails on its conjunctive second clause - no assessment in the extract requires coordinating work across people AND tools/AI systems, and no task documents role or tool allocation. Recurrence alone does not reach 3. Multidisciplinary-team evidence from the clinical placement subjects is not counted here: per one-construct-one-home, placement evidence scores in W3.",
      "evidenceLines": [
        "Research Proposal Presentation Group of 4 students",
        "Qualitative Interview Plan and Report Group of 4 students",
        "Group presentation of Health Needs Analysis proposal (approx 4 students)",
        "Group Report (community project outcomes)",
        "Group exercise class delivery (small group presentation)",
        "Digital presentation (Group of 4-5 students) and 1000-word ePortfolio summary",
        "Collaborate to produce evidence of knowledge of anatomy and physiology and its influence on clinical reasoning"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 is satisfied by an individually assessed structured critique against appraisal criteria - the Critical Appraisal Essay in Research and Evidence, whose outcomes name critical appraisal of studies for the validity of their conclusions. Level 3 is not reached: nothing in the extract requires students to document and justify reliance decisions, defend judgements of tool or AI output quality, or evidence strategy adjustment over time. The ePortfolio recurs in almost every core unit and a reflect-and-modify-practice outcome hints at process-focused assessment, but the handbook describes the ePortfolio only by word count, timing and weight, so the lower level is taken.",
      "evidenceLines": [
        "Critical Appraisal Essay Individual",
        "Critically appraise research including exploratory and experimental studies for the validity of their conclusions and to explain the relevance for patients, the profession, policy makers and funders of physiotherapy services.",
        "Critically appraise qualitative research and methodologies that relate to an individual's perspectives of health and illness and contrast this to quantitative approaches.",
        "Search, identify and critique relevant evidence to respond to contemporary physiotherapy clinical enquiry.",
        "Critically reflect and modify practice in response to feedback from peers and lecturers / tutors."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Above level 0 because digital content does appear in a core unit outcome, but only as safe application of technology to diagnosis and treatment and as familiarity with online learning tools - tool operation, the level TEQSA identifies as non-durable. Level 2 requires core units to address AI capabilities AND limitations or ethics, discussed and assessed; the extract contains no such content and no assessment of it, so level 3 governance critique is not in reach either. The core subject Health Leadership & Digital Innovation may carry this evidence, but its subject and assessment pages are absent from the extract and R2 forbids inferring a score from a title.",
      "evidenceLines": [
        "Safely apply emerging technologies for the diagnosis and treatment of musculoskeletal and sports-related injuries.",
        "be familiar with selected online learning tools; and",
        "Health Leadership & Digital Innovation"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 is met: core assessment requires application to unfamiliar problems - differential assessment and treatment in complex scenarios, timed unseen OSCE stations, and a cross-context community project. Level 3 is not established on this extract. The Declaration of learning needs discussion with clinical supervisor is a hurdle-assessed identification of one's own learning needs, but the anchor requires that identification TOGETHER WITH the plan to close the gaps, and no plan is documented. The required Research Capstone appears only as a course-structure line with no subject or assessment page, so neither its self-scoping nor its assessment can be quoted, and R2 bars a level 3 without assessment evidence. Ambiguity resolved downward.",
      "evidenceLines": [
        "Declaration of learning needs discussion with clinical supervisor",
        "Hurdle requirement: Students must submit Declaration of learning needs discussion with clinical supervisor to pass the subject",
        "Apply theoretical principles in the differential assessment and implementation of safe and effective physiotherapy treatment in complex scenarios.",
        "Solve unfamiliar problems by applying new research information",
        "Application of new research information to the solution of unfamiliar problems.",
        "the ability to identify and address their own learning needs;",
        "Research Capstone"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 is clearly met: students select methodology, collect primary data and are assessed on it - a planned, conducted and analysed qualitative interview reported for marks, and a community needs analysis in which students implement instruments and analyse the quantitative and qualitative data gathered. Level 3 requires a substantial REQUIRED primary-evidence project with methodology defended under scrutiny. The Research Capstone is required by the course structure, but its subject and assessment pages are missing from the extract, so no methodology defence, viva or staged supervised review can be quoted; the Research Proposal Presentation is a group proposal presentation, not documented as a defence under scrutiny. Ambiguity between 2 and 3 resolved downward.",
      "evidenceLines": [
        "Plan, conduct and analyse a qualitative interview of an individual's perspectives of health and illness.",
        "Qualitative Interview Plan and Report Group of 4 students",
        "Ethically implement a culturally safe needs analysis with key community stakeholders while working to promote optimal data collection",
        "Apply prior knowledge and skills to analyse the quantitative and qualitative data gathered with the needs analysis instruments",
        "Compute and interpret descriptive statistics for a quantitative data set.",
        "Research Proposal Presentation Group of 4 students",
        "Research Capstone"
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 3,
      "rationale": "All three level-3 clauses are separately evidenced by assessment lines, not by attribute statements. Repeated and progressive: a 9-station hurdle OSCE in first-year Integrated Professional Practice A, 2-station hurdle OSCEs in each first-year clinical stream, supervised clinical communication assessed across three second-year placement subjects, a community presentation of findings back to the community, and a 4-station hurdle OSCE in third year. Judged by a real practitioner or external audience: continuous clinical assessment by a clinical supervisor during placement, and a community engagement log signed by academic and community mentors. Professional conduct explicitly among assessed criteria: the Paediatric Clinical Placement is assessed using a Professional Behaviour Grading Form with a minimum satisfactory hurdle.",
      "evidenceLines": [
        "Objective structured clinical examination (OSCE) - 9 station OSCE each station 5 minutes inc reading time",
        "4 station OSCE (10 minutes /station) (Individual)",
        "Paediatric Clinical Placement: Assessed using Professional Behaviour Grading Form",
        "Hurdle requirement: Students must reach a minimum satisfactory level to pass the Paediatric Clinical Placement",
        "Declaration of learning needs discussion with clinical supervisor",
        "Community engagement placement 80 hours & log signed by academic & community mentors",
        "Demonstrate accurate and effective verbal, non-verbal and written communication skills when working with clients across the lifespan in different clinical settings. This includes the ability to develop rapport and accommodate the cognitive, linguistic, and cultural needs of the individual and their family / carer",
        "Share findings gathered on community health and wellbeing priorities to community and propose appropriate health promotion initiative/s",
        "Group presentation of Health Needs Analysis proposal (approx 4 students)",
        "Communicate the methodology and findings of a research study for a physiotherapy audience in an oral presentation."
      ]
    },
    "W2": {
      "score": 3,
      "rationale": "Scored on documented task features, not on the word authentic (R4). Spine rather than single instance: a hurdle OSCE reproducing the clinical assessment-and-treatment task in first year (9 stations), hurdle OSCEs in each of the three first-year condition streams, an exercise-class delivery and a practitioner-genre logic-model health promotion proposal plus community project report in second year, and a hurdle 4-station OSCE in third year - at least one per stage. Genuine constraint of practice: the community project is an externally supplied real problem with a consequential audience, and the OSCEs are performed to the profession's own standards under an accredited APC sequence with pass-the-OSCE-to-pass-the-subject hurdles and fixed station times. Simulation is scored here, not in W3; the placement hours themselves score in W3.",
      "evidenceLines": [
        "Objective Structured Clinical Examination (OSCE) 2 station OSCE each station 10 minutes",
        "Hurdle requirement: Students must pass OSCE to pass subject",
        "Hurdle requirement: Student must pass overall and must pass three of the five physical assessment (stations 1-5).",
        "Hurdle requirement: Students must achieve a result for this examination of at least 50%.",
        "Evidence based written video analysis requiring 1500 words and a 5min video",
        "Individual Health Promotion Project Proposal (presented as a logic model)",
        "Group Report (community project outcomes)",
        "Group exercise class delivery (small group presentation)",
        "Students will work in small groups with an identified community to build on their knowledge of the determinants of health and to complete a health needs analysis.",
        "Australian Physiotherapy Council (APC)"
      ]
    },
    "W3": {
      "score": 3,
      "rationale": "Level 3 on every clause. Substantial and required: three core placement subjects each carrying 152 hours of continuous clinical assessment, plus a Lifespan Practice subject with 92 paediatric hours, 122 gerontology hours and a 16-hour community placement, plus an 80-hour community engagement placement - in a course where all listed subjects must be completed. Supervised by a practitioner: a declaration of learning needs discussion with the clinical supervisor and continuous clinical assessment using the Assessment of Physiotherapy tool. Accountability to the host: hurdle logs of clinical context of practice and a placement log signed by academic and community mentors. Structured reflection: an assessed ePortfolio submitted on completion of clinical placement in each placement subject.",
      "evidenceLines": [
        "Continuous clinical assessment using Assessment of Physiotherapy (APP) tool",
        "Hurdle requirement: Students must pass Continuous clinical assessment to pass the subject",
        "Gerontology placement: continuous clinical assessment using Assessment of Physiotherapy (APP) tool",
        "Paediatric Community Placement log",
        "Hurdle requirement: Students must complete 16 hours of Paediatric Experiential Placement as evidenced by submission of the Paediatric PlacementLog",
        "Community engagement placement 80 hours & log signed by academic & community mentors",
        "Hurdle requirement: Students must attend community engagement placement and submit signed placement log to pass subject.",
        "Student log of clinical context of practice",
        "Submitted on completion of clinical placement",
        "This clinical placement subject enables students to apply, consolidate and extend their knowledge and physical skills in musculoskeletal and/or neurological and/or cardiorespiratory physiotherapy.",
        "In order to qualify for the Doctor of Physiotherapy students must successfully complete all subjects as outlined below (300 credit points)."
      ]
    },
    "workplace": 9,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "An all-compulsory specialist core in an externally accredited sequence: the course is fixed and full-time, every listed subject must be completed for the award, the program is accredited by the Australian Physiotherapy Council and leads to registration, and the structure is staged - foundation sciences, then the condition-specific streams which explicitly prepare students for the following semester's clinical placements, then advanced practice in third year. No generic or interchangeable content.",
        "evidenceLines": [
          "The Doctor of Physiotherapy program is a fixed, full-time course.",
          "In order to qualify for the Doctor of Physiotherapy students must successfully complete all subjects as outlined below (300 credit points).",
          "Australian Physiotherapy Council (APC)",
          "Graduates are eligible for registration with the Australian Health Practioner Regulation Agency to work in Australia.",
          "Musculoskeletal Physiotherapy 1 builds on students’ foundational knowledge of physiotherapy theory and practice and prepares students to move to their clinical placements in the following semester of the program."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment requires defended trade-off decisions and places students in live settings with real uncertainty and accountability: selection and justification of interventions is an assessed outcome of the placement subjects, differential assessment in complex scenarios is assessed in third year, hurdle OSCEs require judgement under time pressure on unseen stations, and hurdle-gated continuous clinical assessment governs real patient care. Not recall or scripted response only.",
        "evidenceLines": [
          "Select, justify and demonstrate safe and effective physiotherapy interventions to address impairments, activity limitations and participation restrictions in collaboration with individuals with musculoskeletal, neurological and/or cardiorespiratory conditions",
          "Apply theoretical principles in the differential assessment and implementation of safe and effective physiotherapy treatment in complex scenarios.",
          "Plan and justify the assessment and treatment of musculoskeletal and sports related conditions.",
          "Hurdle requirement: Students must pass Continuous clinical assessment to pass the subject",
          "Objective structured clinical examination (OSCE) - 9 station OSCE each station 5 minutes inc reading time"
        ]
      }
    },
    "ambiguities": [
      "C1: assessed collaboration recurs across the program (Research and Evidence, Health Care in Context, Strength and Conditioning, Sports and Advanced Manual Therapies), which satisfies the first half of the level-3 anchor, but the human-plus-tool coordination clause is entirely unevidenced. Conjunctive anchor unmet, so scored 2 rather than 3.",
      "C2: the ePortfolio is assessed in almost every core unit and the course overview describes it as building across the program, which could read as process-focused evidence of strategy adjustment over time (level 3). The handbook documents no task features, criteria or standards for it, so the lower level was taken.",
      "C4: the Declaration of learning needs discussion with clinical supervisor is a hurdle-assessed identification of one's own knowledge gaps, half of the level-3 route; the plan to close them is not documented, so the lower level was taken.",
      "C5: the required Research Capstone (31.25 points, year long) would likely decide between 2 and 3, but only its course-structure line is in the extract. Ambiguity resolved downward per the scoring direction rule and R2.",
      "W1 vs W3: the practitioner-judged clinical assessment and the Professional Behaviour Grading Form are placement-generated evidence. One-construct-one-home bars placement evidence from C1 and C4 but not from W1, whose level-3 anchor explicitly names a patient, client or practitioner as the audience; the placement hours, supervision and host accountability are scored in W3 and the communication/conduct criteria in W1.",
      "W2 vs W3: Health Care in Context supplies evidence to both. The assessed artefacts (needs analysis presentation, group report, logic-model proposal) are scored in W2; the 80-hour community engagement placement and its signed log are scored in W3."
    ],
    "notScoreable": [
      "PHTY90134 Health Leadership & Digital Innovation - a core third-year subject listed in the course structure whose subject and assessment pages are absent from the extract. Any AI/digital capability, limitation, ethics or governance content it carries could not be examined, which caps C3 at the level supported by the pages that are present.",
      "PHTY90130 Research Capstone - a required 31.25-point year-long third-year subject whose subject and assessment pages are absent. Its assessment design is the missing evidence for the C5 level-3 test (primary evidence generation with methodology defended under scrutiny) and for the C4 level-3 self-scoped-capstone route.",
      "PHTY90128 Integrated Professional Practice B - a required 31.25-point third-year subject whose subject and assessment pages are absent; its assessment could bear on C2, C4, W1 and W2 and was not available."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-mgmthre": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 is met many times over: group assessment appears in every compulsory subject captured — MGMT90140 'Group project (normally in groups of 4-5)' 30%, MGMT90280 'Group assignment (groups of 4-6)' 25% plus a group presentation, MGMT90016 'Group consulting report (groups of 2 - 3 students)' 30%, MGMT90010 '3500 word group assignment' 40%, and comparable group tasks in MGMT90015, MGMT90018, MGMT90027, MGMT90176, MGMT90141 and MKTG90037. Level 3 requires recurrence AND at least one assessment in which work is coordinated across people AND tools or AI systems. The recurrence limb is satisfied more strongly than in any program scored to date. The tool limb is not: nothing in the extract assesses the division of work between people and systems. MGMT90280 teaches analytical software ('Appreciate software capabilities used for business analysis') but its group assignment documents no allocation of work between team members and tools.",
      "evidenceLines": [
        "Group project (normally in groups of 4-5), 3500 words",
        "Group assignment (groups of 4-6), 5000 words",
        "Group consulting report (groups of 2 - 3 students), 2000 words (equivalent)",
        "3500 word group assignment (usually in groups of3-4), 3500 words",
        "Appreciate software capabilities used for business analysis"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 is met in the compulsory core, and by design rather than incidentally: MGMT90140 Management Competencies assesses 'Critical reflection on competence development' (40%) and 'Ongoing competence development mini-assignments' (10%) against the named competence set in its ILO. That is criterion-referenced appraisal of one's own work, assessed, in a subject every student takes. Level 3 requires documented and justified reliance decisions, defended judgements of AI-output quality, or evidenced strategy adjustment over time. Nothing documents reliance decisions or AI-output judgement. The third limb is the live question: a semester of ongoing development assignments culminating in a 40% critical reflection is process-focused assessment of change over time. But the handbook says the reflection is on competence development, not on adjustment of strategy, and it never states that the student must evidence what they changed and why. Ambiguity resolves DOWN under the never-resolve-upward rule.",
      "evidenceLines": [
        "Critical reflection on competence development, 2000 words",
        "Ongoing competence development mini-assignments, 1000 words",
        "Analyse and evaluate key competencies you need to become a more effective manager, including self-awareness, self-management, political acumen, networking, problem solving, motivating, collaboration, and conflict management",
        "Develop key competencies through practice-oriented activities such as scenarios, role plays, team activities, video presentations, reflective exercises."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 is the anchor that matches. AI reaches the program in exactly two places, both of which the anchors cap at level 1. First, as a course-level intended learning outcome — 'Leverage artificial intelligence and digital tools to enhance human resource decision-making and processes' — which rule R2 caps at 1 because no compulsory subject assesses it. Second, as an elective: MGMT90267 Artificial Intelligence in Organisations sits in the elective list, which is the level-1 anchor's own wording. Level 2 requires core units to address AI capabilities AND limitations or ethics. The nearest compulsory evidence is MGMT90280, which assesses 'Understand and evaluate the power and limitations of optimisation and data analytical techniques' and 'Understand new decision analytics and emerging technologies and their potential in the workplace'. That is capability-and-limits reasoning about analytical technique in a compulsory subject, which would satisfy level 2 if it were about AI — it is about optimisation and data analytics, names no AI, and carries no ethics component. Evidence straddles 1 and 2 and resolves DOWN. Level 3 is unreachable: no governance, bias, accountability, transparency or data-governance content appears in any assessment.",
      "evidenceLines": [
        "Leverage artificial intelligence and digital tools to enhance human resource decision-making and processes.",
        "MGMT90267 Artificial Intelligence in Organisations (Term 2, Online)",
        "Understand and evaluate the power and limitations of optimisation and data analytical techniques",
        "Understand new decision analytics and emerging technologies and their potential in the workplace",
        "Elective subjects (37.5 points)"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 is met: the MGMT90010 capstone requires students to critically analyse a series of cases on topical issues and develop recommendations, and MGMT90280 assesses 'Apply the methods, tools and techniques learned to real word business problems' — application beyond the taught instance. Level 3 asks for a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them. The self-scoped route exists but is not required and is heavily restricted: the research option needs 'at least 100 points and have achieved a WAM of 80', places are limited and Program Director approval is required. The second limb is the close one, and it rests on the same MGMT90140 architecture as C2: an ILO requiring students to analyse the competencies they need, assessed through ongoing development assignments and a 40% critical reflection. That is assessed identification of one's own gaps; what the handbook does not document is the plan to close them. Resolved DOWN.",
      "evidenceLines": [
        "This capstone subject involves the analysis of organisational decisions and actions with a focus on implications for HR policy and practice.",
        "Apply the methods, tools and techniques learned to real word business problems",
        "Students who wish to take the research option must have completed at least 100 points and have achieved a WAM of 80 across all subjects completed.",
        "Analyse and evaluate key competencies you need to become a more effective manager, including self-awareness, self-management, political acumen, networking, problem solving, motivating, collaboration, and conflict management"
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1 fits and level 2 does not. The compulsory core contains analytical-methods teaching — MGMT90280 Managerial Decision Analytics and MGMT90141 Business Analysis and Decision Making, the latter introducing 'the different types of information that business analysts and decision makers gather, and how that information is processed' — which is the level-1 introductory methods unit. Level 2 requires students to design and conduct an inquiry with methodology selection and data collection, assessed. No compulsory subject documents this. MGMT90141's ILOs stop at describing, evaluating and applying decision-making approaches to 'real and hypothetical situations'; MGMT90280's stop at applying tools to business problems. The course-level claim to 'Analyse complex organisational and employee level data to develop human resources policies and recommendations' is an outcome statement, capped at 1 by R2. The genuine inquiry route — MGMT90206 Management & Marketing Special Topics 1 plus an advanced subject — is the restricted research option, not a program requirement, and the anchors score what every student must do.",
      "evidenceLines": [
        "Apply different models to real and hypothetical situations.",
        "This subject introduces students to the different types of information that business analysts and decision makers gather, and how that information is processed to make effective business decisions.",
        "Analyse complex organisational and employee level data to develop human resources policies and recommendations",
        "Students who wish to take the research option must have completed at least 100 points and have achieved a WAM of 80 across all subjects completed."
      ]
    },
    "adaptiveness": 8,
    "W1": {
      "score": 2,
      "rationale": "Level 2 is met in a compulsory discipline-core subject: MGMT90016 Performance and Reward Management assesses a 'Group consulting report (groups of 2 - 3 students)' worth 30%. A consulting report is a recognised professional genre in HR practice, not an academic genre addressed to a marker, which is what the anchor asks for and what HESF cl. 1.4.2(b) requires as generic skills applied in the discipline's own context. Level 3 requires both recurrence across the program and at least one core assessment delivered to, or judged by, a real external audience or practitioner with professional conduct among the criteria. Neither limb holds on the required path. The consulting report is a single instance; the other compulsory subjects assess by individual assignment, group assignment and examination, and every presentation in them is delivered to staff and peers. The one genuine external audience in the program is BUSA90473's presentation to its host company with 360-degree feedback — a capstone selective, not something every student does. The course-level generic skills claims are outcome statements, capped at 1 by R2 and by Barrie's finding that such attributes are asserted and not measured.",
      "evidenceLines": [
        "Group consulting report (groups of 2 - 3 students), 2000 words (equivalent)",
        "Interpretation and communication of research results to specialist and non-specialist audiences",
        "Managing relationships with a range of stakeholders",
        "Presentation 2 - to host company, 40-minute presentation and 20-minute Q&A (Individual performance 10%). Due at the end of the in-company component. 60 minutes (total)",
        "360-degree feedback, 600 words"
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 is met: the MGMT90016 group consulting report reproduces an HR consulting task end to end and produces the artefact a practitioner produces, and the MGMT90010 capstone requires students to develop recommendations from a series of cases. Level 3 needs both limbs and fails both. The spine limb: authentic artefacts are two instances, not the program's assessment spine — an end-of-semester examination worth 40-50% appears in nine of the eleven compulsory subjects, and the dominant non-exam form is the academic group assignment. The practice-constraint limb: no compulsory assessment carries an externally supplied problem, real resource constraints or a consequential audience. Those constraints exist in the program, but only in BUSA90473, which supplies a real host company and hurdle in-company training tasks, and which a student may never take. Per R4, nothing was credited for the 'real word business problems' or 'real-world business issues' phrasing; only documented task features were scored.",
      "evidenceLines": [
        "Group consulting report (groups of 2 - 3 students), 2000 words (equivalent)",
        "In this subject students will draw on their core business subjects and HR studies to critically analyse a series of cases on topical issues and develop recommendations that promote organisational sustainability.",
        "Apply theory and practice of graduate level studies in commerce to resolving real-world business issues",
        "In-company training tasks (individual assessment consisting of teaching activity 4-hours, and written task 600-words"
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Level 2 is met and level 3 is not, on the required/optional distinction rather than on depth — the same structural pattern the Master of Public Health presented. Work-situated learning of real quality exists inside the required capstone band: BUSA90473 Business Practicum places student teams with a host organisation off campus, with an academic mentor and the practicum organisation both in the supervision loop, hurdle in-company training tasks, a presentation delivered to the host company, and 360-degree feedback. BUSA90485 Global Business Practicum and BUSA90525 Business and Economics Internship sit alongside it. Level 3 requires the work-situated learning to be required, and it is not. The capstone band offers six selectives, of which three are workplace-based and the rest — MGMT90017 HR Consulting, MGMT90261 HR Analytics — are classroom subjects; MGMT90017's assessment is an individual assignment, a group assignment, a group presentation and a 50% examination, with no external host. The same practicum subjects also appear in the elective list, which is the level-1 anchor's language, but their place in the required capstone band lifts the item to 2. A student may complete this degree with no work-situated learning at all. Resolved DOWN.",
      "evidenceLines": [
        "Students must complete one of the following subjects:",
        "Identify key strategic questions, assess options related to the exercise, communicate progress and check direction with team members, academic mentor and the practicum organisation",
        "Presentation 2 - to host company, 40-minute presentation and 20-minute Q&A (Individual performance 10%). Due at the end of the in-company component. 60 minutes (total)",
        "Group presentation: 15 minutes presentation plus 5 minute question time (usually in groups of 4-5), 20 minutes",
        "Capstone selective subjects"
      ]
    },
    "workplace": 6,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "A coherent specialist core with progressive, staged depth and external professional accreditation. Of 200 credit points, 137.5 are compulsory across a staged sequence — foundation subjects in the first semester, core subjects in the second, four discipline core subjects, and a capstone core subject in the final semester. The sequence is externally attested by AHRI accreditation and SHRM alignment. This is the accredited-sequence form of the PASS criterion.",
        "evidenceLines": [
          "Foundation subjects (50 points)",
          "Students must complete the following subjects in their second semester of study:",
          "Discipline core subjects (50 points)",
          "Capstone core subject (final semester)",
          "The Master of Management (Human Resources) is accredited by the Australian HR Institute.",
          "The Master of Management (Human Resources) is aligned with the internationally recognised Society for Human Resource Management (SHRM)."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment requires defended trade-off decisions rather than recall. The compulsory MGMT90010 capstone requires students to identify HR implications prior to decisions being taken and to develop HR responses that promote organisational sustainability, assessed through a 40% group assignment; MGMT90280 requires students to evaluate a business problem from an analytical perspective and to weigh the power and limitations of the techniques applied; MGMT90141 assesses evaluation of the underlying assumptions and implications for practice of different approaches.",
        "evidenceLines": [
          "Identify the HR implications of organisational decisions prior to decisions being taken;",
          "Develop HR responses to organisational decisions that promote organisational sustainability;",
          "Develop the competence required to evaluate a business problem from an analytical perspective",
          "Analyse and evaluate the underlying assumptions and implications for practice of the different approaches;"
        ]
      }
    },
    "ambiguities": [
      "C2 and C4 straddle 2 and 3 on the SAME evidence: MGMT90140's competence-development architecture (an ILO requiring students to analyse the competencies they need, ongoing development mini-assignments across the semester, and a 40% critical reflection on competence development). C2's level-3 third limb asks for evidenced strategy adjustment over time; C4's second limb asks for assessed identification of one's own knowledge gaps together with the plan to close them. The handbook documents the diagnosis and the reflection but neither the strategy adjustment nor the plan. Both resolved DOWN. This is the strongest single piece of curriculum evidence in the program and it lands just under the bar on two items for the same reason — a granularity question the content-validity panel should settle, because the answer would move this program by up to two points.",
      "C3 straddles 1 and 2. MGMT90280 is a compulsory subject that assesses the power and limitations of analytical technique, which is the shape level 2 asks for, but the subject is about optimisation and data analytics rather than AI and carries no ethics component, and the program's only AI subject is an elective. Resolved DOWN.",
      "W3 straddles 1 and 2 on whether the capstone band counts as 'a core unit'. The practicum subjects appear both in the required capstone selective list and in the elective list; read only as electives they would score 1. Scored 2 for consistency with the Master of Public Health, whose capstone has the same shape. If the panel decides a competitively-chosen selective is not a core unit, both programs move to 1 together.",
      "Construct-boundary check. The BUSA90473 practicum was scored in W3 only; its host-company presentation was cited in W1 solely as evidence that the external audience exists OUTSIDE the required path, not as W1 credit, and it was not used to lift C1 or C4, whose v4.1 level-3 anchors no longer name placements. Group work throughout the compulsory core scored in C1 and was not counted again in W1. The MGMT90140 critical reflection scored in C2 and was considered for C4 but not for W2. The MGMT90016 consulting report is cited in both W1 (professional genre) and W2 (practitioner artefact): these are different properties of the same task — who it addresses versus what it reproduces — and the anchors treat them as separate constructs, but the dependency is recorded because a rater who rejects the task rejects both scores."
    ],
    "notScoreable": [
      "The foundation selective (one of ACCT90041, ECON90015, FNCE90065) was not captured; it is one of eleven compulsory-equivalent subjects and no item's score turns on it.",
      "MGMT90267 Artificial Intelligence in Organisations has no subject page in the extract. Its elective status is documented on the course structure page, which is what C3 scores; its content would not change the score.",
      "The 150-point entry-point program was not scored. This assessment is of the 200-point program."
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
