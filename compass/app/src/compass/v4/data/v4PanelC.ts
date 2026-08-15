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
  "scored": 24,
  "workplaceScored": 24,
  "workplaceComplete": false,
  "complete": false,
  "adaptMedian": null,
  "expMedian": 90.9,
  "pending": [
    "mc-journ",
    "mc-nursc",
    "mc-phtyph",
    "mc-prop",
    "mc-sciche",
    "mc-sciear",
    "mc-sciphy",
    "mc-surged",
    "mc-tesol",
    "mc-urbdes"
  ]
};

/** A program scored on v4 that is not in the v3 registry.
 *
 *  Exposure is instrument-independent, so where the program has its own JIR
 *  alumni record it is computed here by the identical Panel A procedure and
 *  is a measured value, comparable with every other program. Where it has no
 *  such record the fields are null and the page states the absence rather
 *  than estimating it. Either way no POSITION is assigned: that needs a v4
 *  adaptiveness median, which the migration cycle has not yet produced. */
export interface V4OnlyProgram {
  code: string;
  name: string;
  hasMarketReport: boolean;
  exposure: number | null;
  entryExposure: number | null;
  jirN: number | null;
  nTitles: number | null;
  nMedium: number | null;
}

export const V4_ONLY_PROGRAMS: Record<string, V4OnlyProgram> = {
  "mc-mgmthre": {
    "code": "mc-mgmthre",
    "name": "Master of Management (Human Resources)",
    "hasMarketReport": true,
    "exposure": 94.14,
    "entryExposure": 91.75,
    "jirN": 28,
    "nTitles": 15,
    "nMedium": 3
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
  "mc-dvetmed": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied: several core DVM1 subjects carry an assessed 'Group assignment' (5%) alongside learning outcomes that name collaborative practice, so collaboration is assessed in core units, not merely claimed. Level 3 is not reached: the anchor additionally requires at least one assessment where work is coordinated across people AND tools/AI systems (documented role and tool allocation, or the human/system division of labour itself assessed) — nothing in the extract documents any tool or AI system in the division of work, and the group tasks are 500-word assignments with no documented role allocation or individual accountability. Placement/WIL evidence is deliberately excluded here and scored in W3.",
      "evidenceLines": [
        "Group assignment",
        "Work collaboratively, communicate effectively, and apply an understanding of the structure and function of the digestive tract in order to analyse and interpret clinical problems related to this system in animals",
        "Through case-based syndicate work relevant to the major extensive production systems (beef cattle, dairy cattle, sheep, camelids and goats)",
        "Describe the varied roles of the veterinarian in the community and in industry, and develop and demonstrate the professional skills required to work effectively as a leader, a team member and independently"
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Level 1 anchor fits: reflection and critical appraisal appear in the course-level intended learning outcomes, and a 'Personal reflection' task is graded in a core subject, but the extract nowhere documents that any core assessment is a criterion-referenced appraisal of the QUALITY of work — no peer review, structured critique, portfolio against standards, or marking against exemplars is described, and the reflection's criteria are not stated. Level 2 would require that criterion-referenced appraisal of quality be documented, and level 3 would require documented reliance decisions (when a tool, source or collaborator was relied on or overridden) — neither appears anywhere in the extract. Ambiguity between 1 and 2 resolved DOWNWARD per the scoring-direction rule.",
      "evidenceLines": [
        "Practise reflection and self-directed learning, recognise personal and resource-related limitations, seek assistance as needed, and be aware of the breadth of non-clinical professional opportunities available",
        "Personal reflection",
        "Critically evaluate the scientific literature in order to practise evidence-based veterinary medicine, to ask and answer research questions, and to advance knowledge in the profession"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor — digital tools appear only at the operational level. The extract's entire digital content is an online literature-search hurdle activity, an outcome about how research results are 'communicated and accessed', and the interpretation of digital diagnostic artefacts (diagnostic images, electrocardiograms) as clinical content. There is NO mention of artificial intelligence anywhere in the extract, so level 2 (core units addressing AI capabilities AND limitations/ethics, assessed) and level 3 (assessed critique or governance of AI systems — bias, accountability, transparency, regulation, data governance) both fail outright. Ambiguity between 0 and 1 noted and resolved to 1 only because level 0's declarative statement ('no digital content in any core unit or program-level outcome') is falsified by the online literature-search hurdle and the imaging/ECG interpretation outcomes.",
      "evidenceLines": [
        "Online activity - literature search",
        "Describe principles of scientific method and how research results are communicated and accessed",
        "Differentiate the normal and abnormal appearance of components of the cardiovascular system on gross observation and in histological preparations, diagnostic images, and electrocardiograms"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 anchor is met: core assessment in every biosciences subject is built on graded case-study exercises requiring students to interpret data from clinical cases they have not seen and apply taught structure/function knowledge to interpret the problem — case variation applied to unfamiliar presentations, assessed. Level 3 is not awarded: the anchor requires documented structured progression toward independent learning (a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps plus the plan to close them). The course structure does list core subjects named Veterinary Research Project A and Veterinary Research Project B, but their subject and assessment pages are absent from the extract, so there is nothing quotable showing the project is student-scoped or that gap-identification is assessed — R2 forbids a level 3 without assessment evidence, and the ambiguity is resolved downward. Self-directed learning appears only as a course outcome, which R2 caps at level 1 on its own.",
      "evidenceLines": [
        "Up to four online quizzes of case study exercises, each taking approximately 30 minutes to complete, each equally weighted.",
        "Interpret data acquired from clinical cases, and apply understanding of the cellular and system structure and function in order to analyse and interpret clinical problems",
        "Have the capacity to participate fully in collaborative learning and to find solutions to unfamiliar problems",
        "Veterinary Research Project A"
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1 anchor — the documented inquiry evidence is a hurdle online literature-search activity, an outcome on scientific method and how research is accessed, and an assessed oral presentation of a 'research activity' whose stated purpose is integrating and communicating concepts rather than generating primary evidence. Level 2 requires students to design and conduct an inquiry with methodology selection and data collection, assessed: the only candidate is the core Veterinary Research Project A/B pair, which appears in the extract as subject titles in the course-structure table with no subject page and no assessment page, so nothing documents methodology selection, data collection, or how it is assessed. Level 3 additionally requires methodology defended under scrutiny (viva, defence, staged supervised review), of which there is no trace. Straddle between 1 and 2 resolved to the LOWER level per the scoring-direction rule rather than inferring a research project's design from its title (R1).",
      "evidenceLines": [
        "Online activity - literature search",
        "Oral presentation of a research activity that demonstrates the ability to integrate concepts across different discipline areas and organ systems, and to communicate these concepts to a lay audience. Presented online in video format.",
        "Critically evaluate the scientific literature in order to practise evidence-based veterinary medicine, to ask and answer research questions, and to advance knowledge in the profession",
        "Veterinary Research Project B"
      ]
    },
    "adaptiveness": 7,
    "W1": {
      "score": 1,
      "rationale": "Level 1 anchor: professional communication and conduct are stated at course level ('Demonstrate adaptive and professional communication skills appropriate for the intended audience'), and core assessment does add spoken communication — a 10% oral presentation delivered online in video format, notionally addressed to a lay/diverse audience. But R2 and Barrie forbid scoring the stated attribute, and the presentation is submitted to the teaching team: nothing documents a recognised professional genre (client brief, clinical handover, consultancy or policy advice, public-facing artefact) or a real audience beyond the teaching team, which level 2 requires, nor practice-derived criteria applied to the communication. Level 3 (repeated, progressive professional communication judged by a real external audience or practitioner, with conduct explicitly among the criteria) has no documentary support in the extract. The bulk of core assessment remains written tests and examinations addressed to the marker. Ambiguity between 1 and 2 resolved downward.",
      "evidenceLines": [
        "Demonstrate adaptive and professional communication skills appropriate for the intended audience",
        "Oral presentation of a research activity that demonstrates the ability to integrate concepts across different discipline areas and organ systems, and to communicate these concepts to a lay audience. Presented online in video format.",
        "Communicate orally and effectively complex scientific information to a diverse audience",
        "Written examination"
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 anchor: at least one core assessment reproduces a professional task judged against criteria drawn from practice — the hurdle-gated structured assessments of animal handling require students to demonstrate safe handling and restraint of cattle, horses, sheep, dogs and cats to a pass standard, in the real physical context with live animals, applying animal-behaviour and risk-assessment principles, with a prior 'safe to attempt' participation hurdle. Level 1 is rejected because its declarative statement — that the artefact produced and the criteria applied remain academic — is false here: the criterion is the profession's own safety standard, not an academic one. Level 3 fails clearly: such tasks are not the assessment spine. The documented spine is online case-study quizzes, a mid-semester written test and a written examination carrying 55–60% in nearly every core subject, so scenario-framed academic tasks dominate rather than practice-fidelity tasks with a genuine constraint of practice. Per R4 no credit is taken from the overview's 'authentic cases' language — only the documented task features are scored.",
      "evidenceLines": [
        "Up to five structured assessments of animal handling skills",
        "Hurdle requirement: Students must pass the five structured assessments that evaluate safe handling of different domestic animal species. Students will be given the opportunity to practise their animal handling skills and receive formative feedback before demonstrating their proficiency in the structured assessments.",
        "Hurdle requirement: Students must attend and participate in all timetabled animal handling practicals to be considered as 'safe to attempt' the structured assessments of safe animal handling skills",
        "Apply principles of animal behaviour and risk assessment in order to safely handle and restrain the common domesticated animal species",
        "Written examination"
      ]
    },
    "W3": {
      "score": 3,
      "rationale": "Level 3 anchor: substantial REQUIRED work-situated learning as a sequence in the core, assessed, with structured reflection. The course structure mandates 12 weeks of extramural placement across years one and two and a further 21 weeks of clinical extramural placement across years three and four — 33 required weeks in real extramural workplaces, explicitly labelled WIL, in a course where every subject is core. It is assessed rather than merely required: the one-week extramural placement is a named hurdle requirement for VETS90127 (and VETS30032) and carries a second hurdle for the written placement report, and a subject outcome requires reflective and critical analysis of the personal industry-based experience. That is far beyond level 2's 'short or stands alone'. R2 is satisfied by quotable hurdle text rather than an outcome statement. Simulation-based work (animal-handling practicals) is excluded here and scored in W2.",
      "evidenceLines": [
        "Across the first and second year of the course, students must undertake 12 weeks of animal husbandry/pre-clinical extramural placements across extensive, intensive, and other types of sites.",
        "Students undertake preclinical and animal husbandry WIL in an extramural workplace settings of each of the following species/disciplines: equine, production animals, and companion animals.",
        "Across the third and fourth year of the of the course, students must undertake 21 weeks of clinical extramural placements including experience across the following species: equine, production animals, and companion animals.",
        "Hurdle requirement: Students must complete a one-week extramural placement in Category A (extensive production industries), Category B (intensive production industries) or Category C (educational farms, welfare/small animal shelters and zoos) by the end of this subject to be eligible to pass the subject.",
        "Written extramural placement report",
        "Hurdle requirement: Students must complete a brief written summary of the extramural placement.",
        "Apply an understanding of the principal determinants of animal health in reflective and critical analysis of a personal industry‐based experience in order to evaluate the relevant animal production system"
      ]
    },
    "workplace": 6,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The gate's PASS condition is met on all three of its alternative routes. The core is all-compulsory ('All subjects in the Doctor of Veterinary Medicine course are core'), the sequence is externally accredited by three veterinary boards on a seven-year cycle, and the structure is staged with progressive depth — bioscience systems subjects in DVM1, pathology/microbiology/epidemiology in DVM2, species-based clinical subjects in DVM3, and a 100-point year-long final-year subject, with Veterinary Professional Practice 1 through 5 forming an explicit spine. This is specialist disciplinary content with a clear identity, not generic or interchangeable material.",
        "evidenceLines": [
          "All subjects in the Doctor of Veterinary Medicine course are core.",
          "The veterinary program at the University of Melbourne is accredited by the Australasian Veterinary Boards Council, the Royal College Veterinary Surgeons (London, United Kingdom), and the American Veterinary Medical Association.",
          "Veterinary Professional Practice 5"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The gate PASSes on its second route — live projects with real uncertainty and accountability. Extramural placements in working production and clinical settings are hurdle requirements students must complete and report on, and the final year immerses students in working veterinary clinics; these are uncontrolled real settings, not scripted responses. Assessed case-study exercises recur throughout every core bioscience subject, requiring interpretation of clinical case data rather than recall, and the course outcomes frame the required decisions as explicit trade-offs across welfare, legal, ethical, prognostic, economic and public-health considerations. Note the outcome statement alone would not carry the gate; the hurdle-assessed placements and graded case exercises do.",
        "evidenceLines": [
          "Safely collect and appropriately interpret information, use knowledge of biological processes, and apply critical thinking and problem-solving skills to recommend effective solutions, taking into account animal welfare, legal, ethical, prognostic, economic and public health considerations",
          "Up to 5 online assessments of weekly case study exercises (each equally weighted)",
          "Hurdle requirement: Students must complete a one-week extramural placement in Category A (extensive production industries), Category B (intensive production industries) or Category C (educational farms, welfare/small animal shelters and zoos) by the end of this subject to be eligible to pass the subject.",
          "By the time they reach the final year of the DVM, students will be immersed in a community of best practice in veterinary clinics"
        ]
      }
    },
    "ambiguities": [
      "C2 straddled levels 1 and 2: a 'Personal reflection' worth 20% is genuinely assessed in a core subject (which is more than level 1's 'not assessed'), but the extract documents no criteria and no appraisal of the quality of work. Resolved DOWN to 1 under the scoring-direction rule.",
      "C3 straddled levels 0 and 1: no AI content of any kind appears in the extract, which argues for 0, but level 0's statement 'no digital/AI content in any core unit or program-level outcome' is falsified by the hurdle online literature-search activity and the diagnostic-image/ECG interpretation outcomes. Scored 1 because level 0's declarative anchor is not true of this evidence; the level-1 ceiling on tool-operation content applies.",
      "C4 and C5 both straddled a level because the core subjects Veterinary Research Project A (VETS90078) and Veterinary Research Project B (VETS90079) appear only as titles in the course-structure table — no subject page, no assessment page. Both resolved DOWN (C4 to 2, C5 to 1) rather than inferring a self-scoped project or a designed inquiry from a subject title, per R1 and R2.",
      "W1 straddled levels 1 and 2: the oral presentation names a 'lay'/'diverse' audience, but the extract documents delivery online in video format to the teaching team, with no professional genre and no practice-derived criteria. Resolved DOWN to 1; Barrie/R2 bar the stated communication attribute from carrying the score.",
      "W2 straddled levels 1 and 2: safe animal handling and restraint is a component clinical skill rather than an end-to-end professional task, which argues for 1. Scored 2 because level 1's declarative statement that 'the criteria applied remain academic' is false — the structured assessments apply the profession's own safety standard as a pass/fail hurdle with live animals.",
      "W3: level 3's 'supervised by a practitioner' and 'accountability to the host' are not stated verbatim anywhere in the extract; supervision is implied by the extramural workplace and clinic settings only. This does not discriminate between levels 2 and 3 (level 2's anchor requires practitioner supervision too), and the 12+21 required weeks plus hurdle-assessed reports decisively exceed level 2's 'short or stands alone', so 3 stands with the gap declared.",
      "Cross-item: the extramural placements and the reflective analysis of the industry-based experience would also read as evidence for C1 (relational capability) and C4 (transfer). Per the one-construct-one-home rule they are scored only in W3."
    ],
    "notScoreable": [
      "Partial-evidence caveat, not an unscoreable item: the extract contains subject and assessment pages for DVM1 only (VETS90120-90127 and the B-SCI Veterinary Bioscience route VETS30014-30032). No subject or assessment page is present for any DVM2, DVM3 or DVM4 subject — including Veterinary Professional Practice 1-5 (VETS90132, VETS90139, VETS90141, VETS90146, VETS90096), the species-based clinical subjects, and Veterinary Research Project A/B (VETS90078/90079). C5 and the level-3 anchors of C4, W1 and W2 are therefore scored on year-one assessment evidence plus the course-structure page alone, and would need re-scoring if the clinical-year pages were captured.",
      "No evidence bearing on artificial intelligence — capabilities, limitations, ethics, governance or tool use — appears anywhere in the extract, so C3 could not be tested above the tool-operation level."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-ed": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor met: a compulsory core unit (EDUC90930 Literacies in Local and Global Contexts, one of the four compulsory First 50-point subjects) assesses collaborative practice through a 30% multimodal group presentation, and teamwork appears in both the course generic skills and that subject's generic skills. Not level 3: nothing in the extract documents assessed collaborative practice recurring across the program, and no assessment requires coordinating work across people AND tools/AI systems — the Capstone's stakeholder map is an individually produced portfolio artefact about stakeholders, not assessed coordination with them. Not level 1 because the collaboration is actually assessed, not merely claimed in outcomes.",
      "evidenceLines": [
        "Multimodal group presentation reflecting on academic literacies (10 min per group)",
        "Teamwork and professional collaboration.",
        "Digital Portfolio Part A: A portfolio including reflections on learning, annotated references and a stakeholder map",
        "Mobilise knowledge through a partnership model, involving and giving voice to direct and indirect stakeholders"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor met: core assessment includes structured critique of the quality of others' work — a 40% critical review of key readings in the compulsory EDUC90929 and a 60% annotated bibliography plus a written reflection on the use of research in the compulsory EDUC91316, supported by that subject's ILO to critically read, evaluate and debate educational research. Not level 3: no assessment in the extract requires students to document and justify reliance decisions (when they relied on or overrode a tool, source or collaborator), defend judgements of AI-output quality, or evidence strategy adjustment over time; the Capstone's staged Digital Portfolio contains 'reflections on learning' but the extract does not document appraisal of the student's own reliance decisions or strategy change, and the Capstone is one of two exit routes. Programme-level 'good quality evidence' language is an outcome only (R2).",
      "evidenceLines": [
        "Written report providing a critical review of key readings",
        "Written report: Annotated bibliography",
        "Written reflection: Use of research for critical thinking",
        "Demonstrate the analytical skills required to critically read, discuss, evaluate and debate educational research, including research based on First Nations knowledge",
        "Mobilise knowledge in action, examining what constitutes good quality evidence in contextually relevant ways"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor met exactly: AI and digital tools appear only as an elective (Generative AI in Education) and as tool familiarisation. The only digital-focused subject with any critique, Foundations: Digital Futures, is one of six Foundations subjects from which only four (50 credit points) are taken, so it is not core; and its documented digital content is a 'playful introduction'/'light-touch introduction' to familiarity with generative AI tools — the operational level the anchor caps at 1. Not level 2: no compulsory core unit addresses AI capabilities AND limitations/ethics with assessment, and the four compulsory subjects and the course-level intended learning outcomes contain no digital or AI content at all. Not level 0 because digital/AI content does exist in the structure.",
      "evidenceLines": [
        "Generative AI in Education",
        "This subject will provide a playful introduction to ways of working with digital and physical technology, which will be at the heart of the pedagogical approach of the Specialisation. For example, students will develop familiarity with collaborative environments and generative AI tools and will be given a light-touch introduction to the hands-on activities that will take place in some of the subjects.",
        "Critically reflect on the relevance of technology and design for an inclusive, sustainable and decolonial education.",
        "Digital literacy.",
        "50 credit points of foundations subjects",
        "Critical Reflection: Completion of an interview with a teacher, student or industry representative about the problems and opportunities of technology/space in education"
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3 anchor met on its own terms: the program documents structured progression toward independent learning, and both of the two possible final-100-point routes terminate in a self-scoped project — the Capstone is a substantial project students scope from their own professional practice or specialisation, and the Research option is a supervised research project the student designs. Progression is documented and gated (students cannot enter Foundations until all four compulsory subjects are passed). R2 satisfied by assessment evidence, not outcomes alone: the Capstone is assessed via a staged Digital Portfolio (Parts A and B), presentation and report, and the Research route via a 13500-word research project. The self-scoping is universal because it holds under either pathway, so this is not a level-3 route-among-several problem.",
      "evidenceLines": [
        "In the final-semester Capstone subject, students undertake a research-based inquiry project directly related to their own professional practice and/or within their area of specialisation.",
        "The Research subjects are taken at the end of the course and are designed for students intending to later pursue a graduate research degree, such as a PhD. They provide a grounding in educational research methodology and include the design and completion of a supervised research project in education.",
        "Students can only progress to enrol in the Foundations subjects (second 50 points) if they have passed all four compulsory First 50 point subjects.",
        "Digital Portfolio Part B: A portfolio including reflections on learning, annotated references, and a methodological note",
        "Define a substantially complex educational problem or issue directly related to their own professional practice and/or within their area of specialisation"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor met: under the Research option students design and conduct an inquiry with methodology selection and data collection, assessed — EDUC90419 produces a 70% research proposal with a defined methodology, and EDUC91197 requires them to undertake the project and submit a 13500-word research project at 90%. Level 3 explicitly fails its own qualifier 'REQUIRED (not one route among several)': the Research subjects are one of two pathway options and are additionally gated on a WAM of 75% or above, so most of the cohort can complete the degree via the Capstone, which produces a research-informed plan rather than primary evidence. The level-3 defence element does exist (a hurdle oral presentation with questions), but the route condition is decisive, so the score is held at 2.",
      "evidenceLines": [
        "Undertake a research project in education.",
        "Oral presentation (includes presentation and questions) summarising research undertaken in the subject",
        "Hurdle requirement: Oral presentation must be presented",
        "Eligibility for the Research subjects requires achievement of a Weighted Average Mark (WAM) of 75% or above in completed MC-ED studies, calculated at the point of enrolment in the Research subjects.",
        "Select one Pathway option from below:",
        "Research proposal"
      ]
    },
    "adaptiveness": 10,
    "W1": {
      "score": 1,
      "rationale": "Level 1 anchor met exactly: communication appears in the course generic skills and graduate attributes and in course-level outcomes (communicating to the 'wider educational community'), and core assessment adds spoken work addressed to peers and staff — a 10-minute oral discussion of a written reflection in the compulsory EDUC91316, and the Capstone conference presentation, whose documented audience is the subject's own cohort ('facilitates peer learning'). Not level 2: no core assessment in the extract requires a recognised professional genre (client brief, policy advice, clinical handover, pitch, public-facing artefact) or an audience beyond the teaching team, and no criteria drawn from professional practice are documented for any of these tasks. Per R2 and Barrie, the stated attributes and the outcome about communicating to diverse stakeholders cannot lift the score.",
      "evidenceLines": [
        "Oral discussion of written reflection (10 minutes)",
        "Capstone Conference Presentation: A presentation sharing research-informed strategies for investigating an identified problem",
        "Students will present their KMS in a conference presentation format that facilitates peer learning and fosters professional alliances and networks.",
        "Communicate their strategies effectively to diverse stakeholders and audiences.",
        "Evaluate and communicate contemporary educational research ideas and findings to the wider educational community",
        "Oral and written communication skills"
      ]
    },
    "W2": {
      "score": 1,
      "rationale": "Level 1 anchor met: contextualised and scenario-framed tasks are common — analysis of a learning scenario, a case-study multimodal plan, a research/action/reflection project, and a Capstone framed on the student's own professional context — but the artefacts assessed and the criteria applied remain academic: essays, written analyses, reflections, annotated bibliographies, portfolios and written reports. Not level 2: no core assessment in the extract reproduces a professional task end to end producing the artefact a practitioner would produce judged against criteria drawn from practice. The Capstone's Knowledge Mobilisation Strategy is the nearest candidate, but the assessed items are a reflective portfolio, a conference presentation and a written report, its context may be 'a more generic future context' rather than a real one, no practice-derived criteria are documented, and per R4 the professional framing alone cannot be scored.",
      "evidenceLines": [
        "Written Analysis: Analysis of a learning scenario",
        "Case Study Analysis : Multimodal plan for addressing a wellbeing challenge",
        "Produce a research, action and reflection project",
        "Reflective essay on transformed understanding of literacy, relating local and global contexts",
        "The Capstone project will entail a gradual process of problem definition and mapping, and it will produce a research-informed plan (a Knowledge Mobilisation Strategy or KMS) to inform action.",
        "Identification of a context - this can be an existing context of professional practice or a more generic future context."
      ]
    },
    "W3": {
      "score": 0,
      "rationale": "Level 0 anchor holds literally: no work-integrated learning, placement, practicum or community-based project appears anywhere in the documented course structure — the compulsory, Foundations, Capstone, Research and elective lists contain none, and the course explicitly states it is not an initial teacher education qualification. The only practice-site element is the quota-limited Disciplined Inquiry Capstone (Travel), whose engagement is 'structured visits' to organisations with an attendance hurdle — observation, not extended supervised participation in a workplace with practitioner supervision and accountability to a host, which is the construct W3 names. Nothing in the extract documents practitioner supervision of students in a workplace.",
      "evidenceLines": [
        "A practical engagement with educational problems through structured visits to a number of government and non-government organisations and educational institutions in selected countries and jurisdictions.",
        "Hurdle requirement: Participation in the overseas component, with attendance at a minimum of 75% of all scheduled visitation and activities",
        "Identification of a context - this can be an existing context of professional practice or a more generic future context.",
        "Please note that this course is not an initial teacher education qualification and does not provide eligibility for registration to teach in Australian schools."
      ]
    },
    "workplace": 2,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents a staged prerequisite chain with disciplinary identity: 50 credit points of four compulsory education subjects that must all be passed before progression into the 50 credit points of Foundations subjects, then a required final 100 points via a Capstone or Research pathway; each of the ten specialisations is additionally an all-compulsory 50-credit-point specialist core. That satisfies the PASS condition (staged prerequisite chain / compulsory specialist core) rather than generic interchangeable content, notwithstanding the large elective component in the Capstone pathway.",
        "evidenceLines": [
          "50 credit points of compulsory subjects",
          "Students can only progress to enrol in the Foundations subjects (second 50 points) if they have passed all four compulsory First 50 point subjects.",
          "50 credit points of specialisation core subjects",
          "Engaging with Research in Education",
          "75 credit points of Elective subjects"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The PASS condition is met via the capstone route with real uncertainty and accountability: the Capstone requires iterative problem definition and redefinition of a substantially complex, ill-defined educational problem, explicitly problematising assumptions and considering counterarguments and competing disciplinary perspectives, and requires students to plan and evaluate — i.e. choose between — research-informed strategies, assessed through a portfolio, a presentation with a participation hurdle and a written report. The Research pathway equally requires designing and defending a project. Assessment is not recall or scripted response.",
        "evidenceLines": [
          "Iterative, reflective and dialogic cycles of problem definition, redefinition and expansion.",
          "Define a substantially complex educational problem or issue directly related to their own professional practice and/or within their area of specialisation",
          "Plan and evaluate research-informed strategies to explore and address their problems in their area of professional expertise",
          "Design a research project to investigate a significant issue in education.",
          "Capstone Conference Presentation: A presentation sharing research-informed strategies for investigating an identified problem"
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 1 and 2: the compulsory group presentation is assessed collaborative practice, but the extract does not document individual accountability within the group, one of the level-2 exemplars. Resolved to 2 because the level-1 anchor ('no core unit assesses it') is factually false — a compulsory subject assesses group work at 30%.",
      "C2 straddled 2 and 3: the Capstone's two-part staged Digital Portfolio with 'reflections on learning' could be read as process-focused assessment evidencing strategy adjustment over time. Resolved DOWN to 2 under the lower-level rule — the extract documents no reliance/override decisions, no appraisal of tool or AI output, and no documented strategy change; and the Capstone is one of two pathways.",
      "C3 straddled 1 and 2: Foundations: Digital Futures carries genuine critique-flavoured ILOs about technology imaginaries and decolonial education, which would look like level 2. Resolved DOWN to 1 because only four of the six Foundations subjects are taken (50 credit points), so no individual Foundations subject is core, and the subject's documented digital content is explicitly introductory tool familiarity — the operational level the anchor caps at 1.",
      "C4 straddled 2 and 3 on universality: the level-3 self-scoped project exists in both pathways (Capstone project scoped from the student's own practice; supervised Research Project), so unlike C5 no route-among-several problem arises, and the score is 3. Recorded because the Research route alone would not have justified it.",
      "C5 straddled 2 and 3: EDUC91197 does generate primary evidence and its hurdle oral presentation with questions resembles the level-3 defence. Resolved DOWN to 2 by the level-3 qualifier 'REQUIRED (not one route among several)' — the Research pathway is optional and WAM-gated at 75%.",
      "W1 straddled 1 and 2: the Capstone Conference Presentation and the Knowledge Mobilisation Strategy could be read as a professional genre. Resolved DOWN to 1 under the lower-level rule — the documented audience is the subject cohort ('facilitates peer learning'), no external or practitioner audience is documented, and no criteria drawn from professional practice are stated for any core assessment.",
      "W2 straddled 1 and 2: the Capstone KMS is arguably the artefact an education practitioner would produce. Resolved DOWN to 1 — the assessed items are a reflective portfolio, a conference presentation and a written report; the context may be 'a more generic future context'; and no practice-derived criteria are documented. R4 forbids crediting the professional framing itself.",
      "W3 straddled 0 and 1: the Travel Capstone's 'structured visits' to government, non-government and educational organisations, with an attendance hurdle, could be read as work-situated learning offered as an elective (level 1). Resolved DOWN to 0 under the lower-level rule — visits are not a placement, practicum, internship or community-based project, and no practitioner supervision of student work is documented.",
      "C1 vs W1 one-construct-one-home: the compulsory multimodal group presentation could be read either as assessed collaboration (C1) or as spoken communication (W1). Scored in C1, whose construct names collaborative practice; W1 rests on the separate oral-discussion and conference-presentation evidence.",
      "C4 vs C5 one-construct-one-home: the Capstone/Research self-scoped project supports both independent-learning progression (C4) and inquiry (C5). The self-scoping and progression evidence is scored in C4; the design-and-conduct-with-data evidence in C5."
    ],
    "notScoreable": [
      "No item was wholly unscoreable, but the extract contains no subject or assessment pages for any Elective or Specialisation subject (e.g. EDUC91331 Generative AI in Education, EDUC90938 Quality Assessment Design, EDUC91324 Evaluating Educational Interventions). C3 in particular is therefore scored on the subject title and on Foundations: Digital Futures alone; if the elective's assessment page documented assessed AI critique or governance it would still cap at level 1 by the anchor's elective clause, but the evidence base for C3 is thinner than for the other items.",
      "Assessment rubrics and marking criteria are not published in the handbook extract for any subject, so the 'judged against criteria drawn from practice' clause in W1 level 2 and W2 level 2 could only be evaluated as absent-from-evidence rather than affirmatively refuted.",
      "EDUC91199 Research Project in Education Part 2 carries no independent content in the extract ('Refer to EDUC91198 Research Project in Education Part 1 for details.'), so Parts 1 and 2 were treated as the single assessment statement the handbook says they share."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-envsc": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor met: core units assess collaborative practice with individual accountability — EVSC90017's individually-assessed group symposium presentation, and the year-2 Industry Project's group plan, group report and industry-partner assessment of group performance. Not level 3: level 3 requires, on top of recurrence, at least one assessment where work is coordinated across people AND tools/AI systems (documented role and tool allocation, or the division of work between people and systems itself assessed). No core assessment page documents any tool or system allocation, so the human-plus-tool half of the level-3 anchor has no evidence at all.",
      "evidenceLines": [
        "An individually-assessed group presentation during the student symposium. Each student within a group will develop and deliver a 5-10 minute presentation contributing to the given topic",
        "Group project plan of 1200-1500 words plus appendices.",
        "Final Group Report of 3500 words plus appendices.",
        "Industry Partner Assessment of group performance",
        "they will work as a team to solve an industry-relevant problem that has been identified by their assigned Industry client",
        "The subject is structured to develop your skills in writing reports and participating in group exercises."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor met squarely: core assessment includes criterion-referenced appraisal of the quality of work — a weighted peer review of another student's manuscript in EVSC90017 (10%), a critical review in EVSC90014 (10%), and assessed critique of methodologies in EVSC90019. Not level 3: level 3 requires students to document and justify reliance decisions (where they relied on or overrode a tool, source or collaborator), defend judgements of AI-output quality, or evidence strategy adjustment over time. The closest candidate — 'Finalisation of manuscript in light of review and feedback; cover letter to editor' — is consistent with a justified response to reviewers but the handbook does not document that any justification of accepted/rejected feedback is required or assessed, so the lower level is taken.",
      "evidenceLines": [
        "One peer-review of up to 600 words of another student's manuscript (randomly allocated)",
        "Finalisation of manuscript in light of review and feedback; cover letter to editor",
        "A critical review of up to 500 words due on the first day of class",
        "appraise and critique scientific data analysis methodologies used to address an environmental challenge.",
        "Group Project \"Health Check\" Report"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor: digital tools appear only as electives or as tool operation/training. Digital/quantitative tooling is confined to the elective Professional Skills and discipline lists (programming, spatial data analytics, modelling, statistics subjects); the core subjects EVSC90014, EVSC90017, EVSC90019 and both capstone routes carry no digital-tool or AI content in their overviews, outcomes or assessments. Not level 2: level 2 requires core units to address AI capabilities AND limitations/ethics, assessed. The word AI (or gen AI, machine learning) does not appear anywhere in the extract, in any core unit or program-level outcome — so the level-2 and level-3 anchors have no supporting evidence, and level 0 is excluded only because digital tooling does exist at elective level.",
      "evidenceLines": [
        "Professional Skills (between 25 and 37.5 credit points)",
        "Students will select at least 25 points of the following professional skills elective subjects:",
        "You will be introduced to quantitative and qualitative tools with the objective of giving you the ability to select, apply and assess technical and socially based risk assessment.",
        "These approaches include empirical observation, mathematical and statistical modelling, and expert opinion."
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 anchor met: at least one core assessment requires application to an unfamiliar, out-of-class problem — EVSC90014's 2500-word report applying risk-assessment methods to a real work-based problem (50%). Not level 3: level 3 needs documented structured progression toward independent learning — a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps plus the plan to close them. The self-scoped research project (with its hurdle literature survey and research plan) is documented only as a replacement available to 'outstanding students' and contingent on a suitable project and supervisor, not as the documented path; the default capstone is a team project on a problem identified by the client, i.e. externally scoped, and its workplace character is homed in W3 rather than counted here. Self-directed learning otherwise appears only as an unassessed graduate attribute, which R2 scores as claim, not evidence.",
      "evidenceLines": [
        "A written assignment of up to 2500 words reporting on an application of the methods to a real, work-based problem due one month after classes finish",
        "Outstanding students may replace the Industry Project with EVSC90034 Environmental Sci. Research Project Pt 1 and EVSC90035 Environmental Sci. Research Project Pt 2 depending upon the availability of a suitable project and supervisor.",
        "they will work as a team to solve an industry-relevant problem that has been identified by their assigned Industry client",
        "Be critical and creative thinkers, with an aptitude for continued self-directed learning;"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor met: a core capstone requires students to design and conduct an inquiry with methodology selection, assessed — the research-project route documents designing and implementing a field, laboratory or archival project with a hurdle literature survey and research plan and a 10,000-word thesis, and the industry-project route assesses a group project plan framing and analysing an environmental challenge by scientific method. Not level 3: the level-3 anchor is explicit that the substantial primary-evidence project must be REQUIRED and not one route among several. Here the research project is precisely one route among two, and is itself conditional ('Outstanding students may replace... depending upon the availability of a suitable project and supervisor'). Nor does the extract document a viva, defence or staged supervised review of methodology — the 10-minute presentation is reported as a presentation, not a defence.",
      "evidenceLines": [
        "Design and implement a field, laboratory and/or literature/archival-based environmental science research project;",
        "A preliminary literature survey and research plan",
        "A thesis is the main requirement of the subject.",
        "Outstanding students may replace the Industry Project with EVSC90034 Environmental Sci. Research Project Pt 1 and EVSC90035 Environmental Sci. Research Project Pt 2 depending upon the availability of a suitable project and supervisor.",
        "Critically evaluate and design environmental monitoring programs;",
        "Group project plan of 1200-1500 words plus appendices."
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 2,
      "rationale": "Level 2 anchor met: core assessment requires professional genres and audiences beyond the teaching team — the Industry Project's one-page charter negotiated with the industry partner, its written reports and presentations addressed to industry representatives, and a 15%-weighted Industry Partner Assessment; EVSC90017 additionally assesses a scientific-manuscript genre with a cover letter to editor. Not level 3: level 3 requires, in addition to repeated progressive assessment and an external judge, that professional conduct or accountability be explicitly among the assessed criteria. The industry-partner component is documented as assessing 'group performance' with no stated conduct or accountability criterion, and the only conduct-adjacent requirement is a colloquia attendance hurdle. Evidence therefore straddles 2 and 3 and the lower level is taken; the compounding reason is that the externally judged route can be replaced by the research project, whose presentation audience is the teaching staff.",
      "evidenceLines": [
        "Charter - one page agreement with Industry Partner as to project specifications due Wednesday of week 2 of the semester of commencement.",
        "Communicate complex environmental information using written reports and oral presentations to their peers, academic staff and industry representatives.",
        "Industry Partner Assessment of group performance",
        "Finalisation of manuscript in light of review and feedback; cover letter to editor",
        "Oral presentation of up to 20 minutes towards the end of semester",
        "Attendance at the Industry Colloquia"
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 anchor met: at least one core assessment reproduces a professional task end to end — EVSC90014's report applying risk-assessment methods to a real work-based problem, and the Industry Project's charter, plan, health-check and final consultancy reports on a client-identified problem, part-judged by the industry partner. These are documented task features, not the 'industry-relevant'/'genuine workplace' labels R4 forbids scoring on. Not level 3: level 3 requires such tasks to be the assessment spine rather than instances. Against the capstone-plus-scaffolding reading stands the fact that the other two core coursework subjects assess in academic genres throughout (manuscript, peer review, essay, take-home assessments), and the practice-fidelity capstone is replaceable by a thesis. The externally supplied problem would satisfy the level-3 genuine-constraint clause, so the evidence straddles 2 and 3 and the lower level is taken.",
      "evidenceLines": [
        "A written assignment of up to 2500 words reporting on an application of the methods to a real, work-based problem due one month after classes finish",
        "they will work as a team to solve an industry-relevant problem that has been identified by their assigned Industry client",
        "Final Group Report of 3500 words plus appendices.",
        "Final Individual Report of 3500 words plus appendices.",
        "A take-home assessment (up to 2000 words) at the end of semester due during exam period",
        "One essay of up to 2000 words"
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Level 2 anchor met: a core unit places students in a real workplace setting with practitioner involvement and assessment — a live client project in which students spend time in the business setting, maintain regular contact with the business and the project supervisor, and are assessed by the industry partner, with a colloquia attendance hurdle. Not level 3: level 3 requires substantial REQUIRED work-situated learning with accountability to the host AND structured reflection on professional practice. The time in the business setting is documented only as 'a specific time' with no stated duration, no structured reflection on professional practice is assessed anywhere (the health-check report is a project status document), and the placement-bearing subject pair is replaceable by the research project, which has no workplace component at all.",
      "evidenceLines": [
        "students will be required to spend a specific time in the business setting and to then maintain regular contact with the business, as well as the project supervisor, across the duration of the subject",
        "Industry Partner Assessment of group performance",
        "Charter - one page agreement with Industry Partner as to project specifications due Wednesday of week 2 of the semester of commencement.",
        "Students must attend all scheduled colloquia",
        "Outstanding students may replace the Industry Project with EVSC90034 Environmental Sci. Research Project Pt 1 and EVSC90035 Environmental Sci. Research Project Pt 2 depending upon the availability of a suitable project and supervisor.",
        "Students integrate their knowledge and skills in an industry-based project or a research project for their capstone experience."
      ]
    },
    "workplace": 6,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "A compulsory specialist environmental-science core of 62.5 points is documented with an explicit staged sequence: two named core subjects in year 1, the graduate seminar plus a two-part capstone in year 2, entered from prior undergraduate study in the life, chemical, physical, earth or environmental sciences. That is a staged progression with disciplinary identity rather than generic or interchangeable content, notwithstanding the wide elective menu around it.",
        "evidenceLines": [
          "Core Subjects (62.5 credits points)",
          "EVSC90017 Global Environmental Change and  EVSC90014 Environmental Risk Assessment must be taken in the first year of enrolment.",
          "EVSC90019 Graduate Seminar: Environmental Science and Industry Project in EnvironmentalSci Pt1 & Pt2 will be taken in the second year of study.",
          "It is designed for students with existing undergraduate studies in the life, chemical, physical, earth or environmental sciences to extend their environmental scientific knowledge, and to facilitate the development of professional scientific skills in environmental analysis and risk assessment."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Core assessment requires defended decisions under uncertainty rather than recall: EVSC90014 assesses selection among competing risk-assessment approaches applied to a real work-based problem, with uncertainty named as an object of evaluation, and the core capstone is a live client project whose deliverables carry accountability to an external partner. Program outcomes likewise frame integrated decision making, and the core assessment tasks that would test it exist.",
        "evidenceLines": [
          "Environmental Risk Assessment aims to provide you with the skills to undertake and critically evaluate environmental risk assessments.",
          "Critical thinking: the ability to evaluate scientific methods, findings, different types of information and uncertainty; and",
          "A written assignment of up to 2500 words reporting on an application of the methods to a real, work-based problem due one month after classes finish",
          "Apply an integrated scientific, economic and social approach to analyse and conduct environmental decision making;",
          "they will work as a team to solve an industry-relevant problem that has been identified by their assigned Industry client"
        ]
      }
    },
    "ambiguities": [
      "C2 straddled 2 and 3: 'Finalisation of manuscript in light of review and feedback; cover letter to editor' is consistent with justifying which reviewer feedback was accepted or overridden (level 3, reliance decisions on a collaborator) but the handbook documents no required justification. Resolved DOWN to 2 by the never-resolve-upward rule.",
      "C4 straddled 2 and 3: the research-project route is self-scoped with a hurdle research plan (level 3), but it is documented only as a replacement for 'outstanding students' contingent on supervisor availability, and the default capstone problem is client-identified. Resolved DOWN to 2 by the never-resolve-upward rule.",
      "C5 straddled 2 and 3: the research project generates primary evidence with staged supervision, but level 3 explicitly requires it be REQUIRED and not one route among several; here it is one of two routes. Resolved DOWN to 2 by the anchor's own 'not one route among several' clause.",
      "W1 straddled 2 and 3: communication is assessed across both years and the Industry Partner Assessment is judgement by a real external practitioner, but professional conduct or accountability is not documented among the assessed criteria (only 'group performance' plus an attendance hurdle). Resolved DOWN to 2 by the never-resolve-upward rule.",
      "W2 straddled 2 and 3: EVSC90014's real work-based report plus the client-scoped capstone reads as capstone-plus-earlier-scaffolding with an externally supplied problem (level 3), but the remaining core coursework assesses in academic genres and the practice-fidelity capstone is replaceable. Resolved DOWN to 2 by the never-resolve-upward rule.",
      "W3 straddled 1 and 2 in the alternative: for students taking the research-project replacement there is no work-situated learning at all (level 1). Scored 2 because the Industry Project pair sits in the Core Subjects table and the course-structure note states it is what is taken in year 2, with the research project as the replacement.",
      "Route-dependence is the single largest source of uncertainty in this program: the year-2 capstone is either the Industry Project or the Research Project, and the two routes carry the level-3 evidence for different items (W1/W2/W3 for the industry route, C4/C5 for the research route). No student is documented as doing both, which is why no item reached 3.",
      "Cross-item boundary: the Industry Project's group work was scored in C1 (collaboration), its client-facing reports in W1 (audience), its task fidelity in W2, and its workplace immersion in W3, per the one-construct-one-home rule; the industry-partner assessment is cited in more than one item as context but is decisive only for W1's level-2 external-audience test and W3's practitioner-assessment test."
    ],
    "notScoreable": [
      "C3's level-2/3 test could only be run against the core subject pages, which are present and contain no AI content; the extract contains no subject or assessment pages for the Professional Skills electives (programming, spatial data analytics, statistics, science communication), so any AI or digital-governance content inside those electives is unverifiable from this evidence. This does not change the score, since elective-only tooling caps at level 1 by the anchor.",
      "No assessment page in the extract documents the duration of the 'specific time in the business setting' for the Industry Project, so the extended-versus-short distinction that separates W3 level 2 from level 3 could not be tested on duration evidence."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-gencoun": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is met: core units assess collaborative practice through group-assessed tasks — POPH90226's group oral presentation, GENE90022's group presentation and WELF90010's group presentation are all in the 200-credit-point compulsory core. Level 3 is not reached: the anchor requires assessed collaborative practice to recur AND at least one assessment to require coordinating work across people AND tools/AI systems, and no assessment in the extract makes the division of work between people and systems, or role/tool allocation, itself an object of assessment. Teamwork also appears only as an outcome/generic-skill claim in several subjects ('Be meaningful contributors to teams'; 'contribute evidence based genetics and counselling expertise to multidisciplinary clinical teams'), which under R2 cannot lift the score. Placement and multidisciplinary-team participation in PAED90020 is not scored here — one construct, one home: it scores in W3.",
      "evidenceLines": [
        "Group Oral Presentation (3-4 students per group)",
        "Group Presentation",
        "Group presentation",
        "Be meaningful contributors to teams; working in small and larger group settings",
        "contribute evidence based genetics and counselling expertise to multidisciplinary clinical teams;"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor is met: core assessment includes criterion-referenced appraisal of quality — HLTH90014's 2500-word 'Critique of papers' (50%) is structured critique, and WELF90010's assessed portfolio is explicitly judged against an external standard set (the HGSA professional competencies), i.e. a portfolio with standards. Level 3 is not awarded: its anchors require students to document and justify reliance decisions (when they relied on or overrode a tool, source or collaborator), defend judgements of AI-output quality, or evidence strategy adjustment over time. Nothing in the extract assesses reliance or tool-quality judgement at all. The reflective apparatus (self-reflection on role-play learnings, staged progress reports, reflection on research experience) is serial and process-visible but is documented as reflection on experience rather than as assessed adjustment of strategy, so the evidence straddles 2 and 3 and the ambiguity rule resolves it down to 2.",
      "evidenceLines": [
        "'Critique of papers'",
        "Portfolio of education and placement activites and student reflections",
        "Hurdle requirement: The activities demonstrated by this portfolio fulfill the requirements of the HGSA professional competenices for genetic counselling practice.",
        "AT3 Written self-reflection on AT2 role play learnings",
        "Written reflection on research experience (1000 words) - Semester 2, Week 11",
        "Written progress report x3 - Semester 1, Week 3; Semester 1, Week 12; Semester 2, Week 6"
      ]
    },
    "C3": {
      "score": 0,
      "rationale": "Level 0 anchor — no digital or AI content in any core unit or program-level outcome — is what the extract documents. The course, outcomes, structure and all twelve core subject and assessment pages contain no reference to artificial intelligence, generative AI, digital literacy, data governance or algorithmic systems. The technology content that is present is biomedical, not digital: genomic tests, genetic techniques and variant classification, with 'on-line content' appearing only as a delivery mode. The nearest candidate for level 1 (tool operation) is GENE90001's undifferentiated 'tools used by genetic counsellors to access information', which the handbook never characterises as digital tools; that leaves the evidence ambiguous between 0 and 1 and the ambiguity rule resolves it down. Level 2 would additionally require core units to address AI capabilities and limitations, and level 3 critique or governance of AI systems, neither of which appears anywhere.",
      "evidenceLines": [
        "This subject will introduce students to the complexity of the human genome, and tools used by genetic counsellors to access information and inform risk assessment.",
        "Use relevant tools to obtain pertinent information about a genetic condition",
        "The subject will be delivered via a combination of on-line content and case-based face-to-face tutorials.",
        "Understand and apply current knowledge of genetic technologies and/or techniques, including testing strategies, approaches and result interpretation, with awareness of the limitations and quickly changing landscape of genomic medicine",
        "Evaluate the integration of genomic technologies into public health practice"
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3 anchor is met on the self-scoped-project route: the program documents a structured progression toward independent learning across three compulsory subjects — HLTH90014 (methods, Year 1 Sem 1) into HLTH90011, where students design their own original project and draft the HREC application, into HLTH90013, where that project is carried out and written up under supervision. It is required rather than one route among several, since the course is 200 credit points of compulsory subjects. R2 is satisfied by assessment evidence, not outcome statements: the HREC application and project proposal (50%) and the monograph are assessed tasks, and self-directed learning is named as the subject's own skill target. Level 2 alone would understate this, since the progression is staged and the project is student-scoped rather than a single novel-problem task.",
      "evidenceLines": [
        "200 credit points of Compulsory subjects.",
        "This subject offers students the opportunity to design an original research project with academic supervision.",
        "Students are encouraged to collaborate with a research supervisor to develop their own research project",
        "Written draft of HREC application and Project Proposal",
        "An original research project will be conducted and a monograph of 5,000 words completed under academic supervision.",
        "Skills in self-directed learning."
      ]
    },
    "C5": {
      "score": 3,
      "rationale": "Level 3 anchor is met in full: a substantial primary-evidence project is required (HLTH90013 sits in the all-compulsory 200-credit-point core), students collect and/or analyse their own research data rather than synthesising secondary literature, and the methodology is defended under scrutiny — a viva presentation of findings in the examination period, a monograph examined by two examiners appointed by the Board of Examiners, and staged supervised review through three written progress reports and class updates. Methodology selection is separately trained and assessed in HLTH90014 ('Design a research project'). This exceeds level 2, which would require only a designed and conducted inquiry without defence under scrutiny.",
      "evidenceLines": [
        "Data collection commences in Year 2 and students are required to collect and/or analyse research data, interpret findings and write a monograph to be submitted at the end of Semester 2.",
        "Viva presentation of findings - Semester 2 exam period",
        "Written monograph 5000 words assessed by 2 examiners chosen by the Board of Examiners (Program Director, Research Coordinator and other senior faculty) - Semester 2, Week 9",
        "Written progress report x3 - Semester 1, Week 3; Semester 1, Week 12; Semester 2, Week 6",
        "Design a research project",
        "200 credit points of Compulsory subjects."
      ]
    },
    "adaptiveness": 10,
    "W1": {
      "score": 2,
      "rationale": "Demoted from 3 to 2 on adversarial verification. Level 2 is met beyond doubt on non-placement evidence: core assessment requires communication in recognised professional genres and to audiences beyond the teaching team — a lay-communication written task in GENE90001, a class presentation of a clinical case with written summary and presentation materials, and a written job application with resume, cover letter and key-selection-criteria statement. Level 3 is not reached. Its second limb (assessment delivered to, or judged by, a real external audience or practitioner, with professional conduct or accountability explicitly among the assessed criteria) was carried only by two PAED90020 lines — the supervisor-with-student placement assessment and the 'fit to practice' minimum-competency hurdle — which are load-bearing for W3=3. Scoring the same assessment rows in two items breaches one construct, one home, and the tie-break sends practitioner-supervised workplace assessment to W3, whose construct names it. No non-placement evidence fills the gap: POPH90226's 'Produce written information about personal genomics for a general audience' is an intended learning outcome (its assessments are an undescribed 1500-word written task plus quizzes), so R2 caps it at 1; all role-plays are with peers or the tutor, never a simulated patient; and GENE90021's poster and 3-minute presentation is judged by the teaching team, with its professional-standard hurdle already serving as W2's genuine-constraint evidence.",
      "evidenceLines": [
        "Written task (Lay communication)",
        "Class presentation of clinical case and submission of written summary and presentation materials (week 10-12)",
        "Written job application including resume, cover letter and statement of key selection criteria",
        "Written letter to patient (from long case report 2)",
        "These core competencies include effective communication skills, reflective practice, critical thinking, proficient case management abilities, and maintaining professional and ethical standards."
      ]
    },
    "W2": {
      "score": 3,
      "rationale": "Level 3 anchor is met: professional-fidelity tasks are the assessment spine rather than a single instance — pedigree construction and familial risk assessment and lay communication in GENE90001, videoed role-play counselling and the competency portfolio in WELF90004/WELF90010 across Year 1, then the clinical poster and abstract, the analysed simulated counselling session, long case reports, a 50-case logbook and a job application in Year 2. Each produces the artefact a practitioner actually produces (pedigree, case report, patient letter, case log, counselling session). The genuine constraint of practice is the profession's own standard of performance, quoted as an explicit hurdle criterion in GENE90021 and again in the fitness-to-practise hurdle. Per R4 the score rests on these documented task features, not on the course page's 'assessment tasks mirror the skills needed' claim, which was disregarded. Workplace immersion itself is scored in W3, and appraisal of quality in C2.",
      "evidenceLines": [
        "Written task (Pedigree construction and familial risk assessment)",
        "750-word poster and abstract and 3-minute presentation",
        "the subject's learning outcomes to a professional standard that is expected in the genetic counselling workforce",
        "Essay - analysis and reflection of videotaped simulated counselling session",
        "Written long case report 1",
        "Written professional portfolio containing a logbook of 50 cases and education report",
        "Written letter to patient (from long case report 2)"
      ]
    },
    "W3": {
      "score": 3,
      "rationale": "Level 3 anchor is met without ambiguity: PAED90020 Clinical Practice is a compulsory year-long, off-campus subject requiring a minimum of 48 days of clinical placement in real clinical genetics services — an extended sequence of two 24-day placements, not a short standalone unit. It is practitioner-supervised, assessed by that supervisor jointly with the student, and carries accountability to the host expressed as a 70% hurdle on the second placement report certifying minimum competencies to practise. Structured reflection on professional practice is separately assessed in each placement report and reinforced through the co-requisite supervision subjects. Simulation-based tasks were not counted here; they score in W2.",
      "evidenceLines": [
        "Successful completion of this year-long subject necessitates a minimum of 48 days of clinical placements in clinical genetics settings",
        "In this subject, students will engage in a dynamic learning experience that combines observation, supervised practice, and increasing levels of responsibility throughout their clinical placements.",
        "Supervision will play a key role in this subject, allowing students to engage in discussions and critical reflections on ethical issues, thereby enhancing their self-awareness (LO3).",
        "Assessment by the supervisor with the student for placement 1, 750 words total (24 day placement) AND student reflection on placement 1, 1125 words total.",
        "Assessment by the supervisor with the student for placement 2, 750 words total (24 day placement) AND Student reflection on placement 2, 1125 words total.",
        "minimum competencies to be 'fit to practice' as a genetic counsellor",
        "200 credit points of Compulsory subjects."
      ]
    },
    "workplace": 8,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "An all-compulsory specialist core plus an accredited sequence: the whole 200 credit points are compulsory subjects, the award is the accredited professional qualification for HGSA certification, and depth is staged — GENE90001 into GENE90002 into Advanced Clinical Genomics 1 and 2, foundational into advanced counselling practice, and research methods into two research-project subjects — with a documented 70% progression requirement gating entry to the second year. No generic or interchangeable content substitutes for the disciplinary core.",
        "evidenceLines": [
          "The Master of Genetic Counselling requires the successful completion of 200 credit points.",
          "200 credit points of Compulsory subjects.",
          "The Master of Genetic Counselling constitutes the professional qualification for entry into employment as an Associate Genetic Counsellor and for Part 1 Certification, awarded through the Board of Censors in Genetic Counselling (Human Genetics Society of Australasia)",
          "Students must achieve 70% in all subjects to progress to the second year of the course."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment goes well beyond recall or scripted response. Core outcomes require defended clinical trade-off judgements under acknowledged limits — interpreting genomic reports into clinical recommendations, appraising care recommendations, and reasoning about the limits of integrating variant analysis into routine care — and these are exercised in live clinical placements with genuine uncertainty and accountability to a supervisor and host service, assessed through long case reports and supervisor assessment. Counselling assessment likewise requires managing emotionally charged, multi-party interactions with no scripted answer.",
        "evidenceLines": [
          "Interpret and apply genetic and genomic reports to develop sound clinical recommendations;",
          "Appraise clinical care recommendations for individuals and families living with specific genetic conditions",
          "Explain the processes and limitations of integrating genomic variant analysis into routine clinical care",
          "In this subject, students will engage in a dynamic learning experience that combines observation, supervised practice, and increasing levels of responsibility throughout their clinical placements.",
          "Demonstrate approaches for managing diverse counselling interactions, including sessions with multiple participants, heightened emotional intensity, and varied psychosocial dynamics",
          "Written long case report 1"
        ]
      }
    },
    "ambiguities": [
      "C2 straddled levels 2 and 3. The program has an unusually dense assessed reflective apparatus that is serial and process-visible — self-reflection on prior role-play learnings, three staged written progress reports, a written reflection on research experience, and paired placement reports whose hurdle turns on 'maintenance or further development of their skills and competencies'. That is arguably level 3's 'evidence strategy adjustment over time (process-focused assessment)'. But the handbook documents these as reflection on experience, never as assessed adjustment of strategy, and level 3's other two routes (reliance decisions, judging AI-output quality) are wholly absent. Resolved DOWN to 2 by the never-resolve-upward rule.",
      "C3 straddled levels 0 and 1. GENE90001's 'tools used by genetic counsellors to access information' and 'Use relevant tools to obtain pertinent information about a genetic condition' would be level-1 tool operation IF those tools are the digital variant and phenotype databases the discipline in fact uses — but the handbook never characterises them as digital, and no AI or digital-literacy content appears anywhere. Resolved DOWN to 0 by the never-resolve-upward rule.",
      "W1 straddled levels 2 and 3 and was resolved DOWN to 2 on adversarial verification. The level-3 external-audience/practitioner-judged limb rested entirely on two PAED90020 placement rows that are also load-bearing for W3=3 (the supervisor-with-student placement assessment and the 'fit to practice' hurdle). One construct, one home sends practitioner-supervised workplace assessment to W3; W1 was rescored on non-placement evidence alone, which reaches level 2 but not level 3.",
      "Placement evidence could have been read into C1 (multidisciplinary team participation) and C4 (work-integrated learning). Per one-construct-one-home it was scored only in W3, and C1/C4 were scored without it.",
      "PAED90020's paired supervisor-with-student placement assessment could be read as evaluative judgement (C2) as well as work-situated assessment (W3). It was scored in W3, the construct that names supervised workplace participation, and C2 was scored on the critique and portfolio-against-standards evidence instead."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-15"
    }
  },
  "mc-intedib": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor met: a compulsory core subject assesses collaborative practice with individual accountability. EDUC90333 Introduction to the IB is listed under 'Compulsory subjects' and its first assessment is a paired presentation weighted 10%, with the word allocation specified per student — the anchor's 'group projects with individual accountability' exemplar. Not level 3: no other core assessment is collaborative (all remaining core tasks are individual essays, planning documents, presentations and research reports), so assessed collaboration does not recur across the program; and nothing in the extract requires coordinating work across people AND tools/AI systems, or makes the division of work between people and systems itself assessable. Not level 1, because the collaboration is assessed rather than only stated in outcomes.",
      "evidenceLines": [
        "Critical reading presentation (in pairs, 500 words per student; 1000 words equivalent for the subject)",
        "10 minutes",
        "Compulsory subjects",
        "Understand the importance of purposeful, collaborative planning within the PYP",
        "Graduates are also aware of the social and cultural diversity in communities and can work collaboratively with people from diverse linguistic and cultural backgrounds."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor met: core assessment includes structured critique of the quality of work. The compulsory capstone EDUC90871 assesses a 'Research Review' at 25% and documents that students critically analyse a prior research project; the core capstone prerequisite EDUC90926 assesses a literature review at 40% against the stated skill of evaluating the quality of research and research papers. Not level 3: no core assessment requires students to document and justify reliance decisions (when they relied on or overrode a tool, source or collaborator), to defend judgements of AI-output quality, or to evidence strategy adjustment over time — the repeated generic-skill claim about using constructive criticism of their own work is an outcome statement only, and R2 bars scoring it. Not level 1, because the appraisal is carried by weighted assessment tasks, not only outcomes.",
      "evidenceLines": [
        "Research Review",
        "Students undertake a critical analysis of the original project and then design their own research using the original data.",
        "Literature review",
        "Analyse and evaluate the quality of research and research papers",
        "Evaluate and use constructive criticism of their own work and of the institutions/ communities in which they teach;",
        "Evaluate a range of assessment tools and styles and reporting strategies including rubrics, teacher and school self-evaluation, and the rationale for them in the area of teaching and learning;"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 anchor met and no higher: digital tools appear only at the operational level TEQSA identifies as non-durable. ICT appears in the program-level generic skills and again in EDUC90330's generic skills as using ICT to participate in learning communities — tool participation, not capability critique — and the only other digital reference is undertaking data management and analysis on pre-existing data sets. Not level 0, because that operational digital content does appear in a program-level outcome. Not level 2: no core unit in the extract addresses AI capabilities AND limitations or ethics of AI; generative AI is not mentioned anywhere in the extract. Not level 3: no core assessment requires critique or governance of AI systems — bias, accountability, transparency, regulation or data governance — in the education context. Research ethics is addressed (EDUC90926, EDUC90871), but research ethics is not AI or digital governance.",
      "evidenceLines": [
        "Effectively use ICT to participate in learning communities as a source of professional learning;",
        "Effectively use ICT to participate in learning communities as a source of professional learning.",
        "Undertake data management, analysis and report writing using pre-existing small-scale qualitative and quantitative data sets;",
        "Identify ethical issues in education research and evaluate responses",
        "Conduct education research in an ethical manner;"
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3 anchor met: the program documents structured progression toward independent learning via a self-scoped required research project, and R2's assessment requirement is satisfied by weighted tasks, not an outcome statement. The course structure mandates 25 points of capstone subjects taken at the end of the degree, with EDUC90926 a prerequisite or corequisite for EDUC90871; EDUC90871 is the compulsory AQF capstone, in which students complete an independent research project, design their own research, and are expected to plan and execute that project — assessed by a Research Review (25%), Research Poster (25%) and Final research report (50%). That is the staged prerequisite chain plus self-scoped project the level-3 anchor names, which is more than the level-2 requirement of a single application to novel problems.",
      "evidenceLines": [
        "capstone subjects totalling 25 points",
        "The capstone subjects are taken at the end of the degree.",
        "EDUC90926 Researching Education Practice is a prerequisite or corequisite for EDUC90871 International Baccalaureate Capstone",
        "Drawing on theory, knowledge and skills developed throughout the Master of International Education (International Baccalaureate), students will complete an independent research project.",
        "Plan and execute their capstone research project",
        "Final research report",
        "Investigate systematically a matter of concern in an IB context; or conduct a constructively critical literature review."
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1 anchor matches the documented evidence exactly: an introductory methods unit with literature-review assessment. EDUC90926 is described as the first part of the capstone experience covering methodologies, research ethics and data management, and assesses a Literature review at 40%. Level 2 requires students to 'design and conduct an inquiry with methodology selection and data collection, assessed' — the data-collection half is explicitly negated by the extract: the capstone has students access data from a prior research project and the program generic skills specify pre-existing small-scale qualitative and quantitative data sets. Methodology selection is assessed (Research design report, 40%), so the evidence straddles levels 1 and 2; the rule to resolve ambiguity downward applies. Level 3 is clearly not met: no substantial project generating primary evidence is required, the capstone ILO permits a critical literature review as an alternative route ('one route among several'), and no viva, defence or staged supervised review of methodology is documented.",
      "evidenceLines": [
        "In this subject, students will develop an understanding of research in education, as the first part of their capstone experience, and advanced skills to analyse complex educational problems and the bodies of knowledge associated with them.",
        "Literature review",
        "Research design report",
        "In this subject, students access data from a prior research project about teaching and learning strategies in IB classrooms.",
        "Undertake data management, analysis and report writing using pre-existing small-scale qualitative and quantitative data sets",
        "Investigate systematically a matter of concern in an IB context; or conduct a constructively critical literature review."
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 1,
      "rationale": "Level 1 anchor met: communication appears in outcomes and core assessment adds spoken presentation, but no professional genre of communication and no audience beyond the teaching team is documented. Outcomes claim graduates can articulate research in written and oral presentations and are effective oral and written communicators; core assessment delivers on the spoken half repeatedly — a learner profile presentation (30%) in the compulsory EDUC90333, an oral presentation (20%) in the core capstone EDUC90926, and 20-minute presentations in the specialisation core subjects. Not level 2: no core assessment names a recognised professional communication genre judged against practice-drawn criteria, and no assessment is addressed to an audience beyond the teaching team — the delivery mode is online class and no client, panel, practitioner or public audience is named. The practitioner artefacts (unit planner, planning document, assessment framework) score in W2 under one-construct-one-home, not here. Not level 3 for the same reasons, and because professional conduct is nowhere among stated assessment criteria.",
      "evidenceLines": [
        "Be able to articulate research in written and oral presentations.",
        "Learner profile presentation (1500 words equivalent)",
        "Oral presentation (equivalent to 1000 words)",
        "Oral Presentation: IB Diploma Programme (20 minutes)",
        "Presentation: interdisciplinary learning (20 minutes)",
        "Online exhibition related to the PYP Exhibition",
        "Research Poster",
        "Communicate research results clearly and persuasively."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 anchor met: at least one core assessment produces the artefact a practitioner would produce, judged against criteria drawn from practice. The compulsory EDUC90331 assesses a 'Scaffolded assessment framework' at 40% within a subject whose outcomes are the IB's own assessment and reporting requirements; the specialisation core subjects assess a Planning document (50%), an Annotated Unit of Inquiry (45%), an MYP unit planner (45%) and an Annotated subject timeline (45%) — curriculum planning documents are the education profession's own artefact — with the stated criterion being curriculum that incorporates and balances the IB's standards and practices, and the course itself accredited by the IB. Not level 3: such tasks are not documented as the assessment spine. The compulsory entry subject EDUC90333 assesses a presentation, a presentation and a 3000-word essay, and the entire 25-point capstone stage assesses academic research genres (research review, poster, research report), so the anchor's 'capstone plus earlier scaffolding, or at least one per stage' is not satisfied. Evidence straddles 2 and 3 (the IB standards-and-practices criterion would supply the level-3 'profession's own standards of performance'), resolved downward. Per R4, nothing was scored up on a 'real-world' or 'authentic' label; only documented task features were used.",
      "evidenceLines": [
        "Scaffolded assessment framework",
        "Planning document",
        "Demonstrate the ability to design and critique curriculum that incorporates and balances PYP standards and practices;",
        "Annotated Unit of Inquiry",
        "Written task: MYP unit planner",
        "Annotated subject timeline",
        "Demonstrate the ability to design and critique curriculum that incorporates DP standards and practices and addresses the objectives of subject specific content and common core learning.",
        "The course is accredited by the International Baccalaureate®",
        "International education essay"
      ]
    },
    "W3": {
      "score": 0,
      "rationale": "Level 0 anchor met: no work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure. The degree is a fully online program and its four structural components are exhaustively enumerated as 25 points of compulsory subjects, one 25-point specialisation, 25 points of electives and 25 points of capstone subjects — none is a placement or practicum, and every named subject is delivered Online with written, presentation and research assessment only. The capstone is explicitly desk-based on a prior project's data rather than sited in a workplace. Not level 1: work-situated learning does not even appear as an elective, optional internship or unassessed careers activity in the extract. The cohort is described as teachers already working in education and several outcomes refer to the institutions or communities in which they teach, but no supervised, assessed participation in a workplace is documented in the course structure — under R1 the graduate's own employment is not curriculum evidence.",
      "evidenceLines": [
        "Masters (Coursework)Year: 2026Delivered: Online",
        "25 points of compulsory subjects",
        "at least one specialisation, each consisting of 25 points of study",
        "electives totalling 25 points",
        "capstone subjects totalling 25 points",
        "Please note that this program will not provide graduates with initial teacher education qualifications to teach in Australia.",
        "In this subject, students access data from a prior research project about teaching and learning strategies in IB classrooms.",
        "Evaluate and reflect upon their teaching and on the work of the institutions/ communities in which they teach;"
      ]
    },
    "workplace": 3,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents a coherent specialist core with progressive depth by two of the three routes the gate names: an accredited sequence (the course carries International Baccalaureate professional accreditation) and a staged prerequisite chain (Introduction to the IB gates the Curriculum Frameworks subject in every specialisation, Assessment & Reporting gates each Advanced subject, and Researching Education Practice gates the capstone). Content is disciplinarily specific rather than interchangeable — it is described as a specialist degree, and subject content is IB curriculum, assessment and pedagogy throughout.",
        "evidenceLines": [
          "Professional accreditation",
          "The course is accredited by the International Baccalaureate®",
          "It offers a specialist degree for teachers and administrators working at all levels of education.",
          "EDUC90333 Introduction to the IB is a prerequisite for EDUC90261 Curriculum Frameworks in the IB PYP",
          "EDUC90331 Assessment & Reporting in the IB is a prerequisite for EDUC90260 IB PYP Advanced",
          "EDUC90926 Researching Education Practice is a prerequisite or corequisite for EDUC90871 International Baccalaureate Capstone"
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The gate's capstone route is satisfied: the compulsory AQF capstone requires students to design their own research and plan and execute the project, with the design itself assessed (Research design report, 40% in the prerequisite subject) and the outcome assessed (Final research report, 50%) — defended methodological trade-offs under genuine uncertainty rather than recall or scripted response. The specialisation core adds designed-and-critiqued curriculum judged against IB standards. Noted as a bound: the capstone's data are supplied rather than collected, which narrows the uncertainty, and the ILO permits a literature-review route; the gate is nonetheless met on the research-design evidence.",
        "evidenceLines": [
          "This subject comprises the compulsory [AQF] Capstone experience for this course.",
          "Students undertake a critical analysis of the original project and then design their own research using the original data.",
          "Research design report",
          "Understand and apply a range of methodologies for evaluating behaviour in a classroom context;",
          "Demonstrate the ability to design and critique curriculum that incorporates and balances PYP standards and practices;"
        ]
      }
    },
    "ambiguities": [
      "C1: the sole collaborative core assessment is a 10%-weighted paired presentation. Ambiguous between level 1 (token, effectively outcome-level) and level 2; resolved UP to 2 only because the anchor's bar is explicit ('at least one core unit assesses collaborative practice') and the pairing plus per-student word allocation is documented in the assessment table, not the outcomes. Its slightness is why level 3's 'recurs across the program' fails.",
      "C2: the level-2 anchor requires criterion-referenced appraisal. The critique tasks (Research Review, the recurring Critical Reading Tasks, critical analysis of the prior project) are assessed and weighted, but no rubric, exemplar or explicit criterion set is quoted in the extract. Straddles 1 and 2; scored 2 because the critique is carried by weighted assessment rather than outcomes, with the criterion-referencing left undocumented.",
      "C5: the strongest straddle. Methodology selection and a designed, conducted inquiry are assessed (Research design report 40%; Final research report 50%), which reads as level 2, but level 2 conjoins methodology selection AND data collection, and data collection is explicitly absent (pre-existing supplied data). Resolved DOWN to 1 per the ambiguity rule.",
      "C4: the capstone is self-scoped in its question but not in its data (the dataset is supplied), and the ILO permits a critical literature review as an alternative route. Scored 3 because the level-3 anchor asks for structured progression toward independent learning via a self-scoped capstone or research project, which the prerequisite chain plus independent project documents; the supplied data constrain C5, not C4.",
      "W1: 'Online exhibition related to the PYP Exhibition' (45%) and 'Research Poster' (25%) could be read as public-facing artefacts qualifying for level 2, but neither names an audience beyond the teaching team nor criteria drawn from professional practice. Resolved DOWN to 1.",
      "W2: practitioner-artefact tasks appear in three or more core subjects and the IB's own standards and practices supply the level-3 'profession's own standards of performance', but the compulsory entry subject and the whole 25-point capstone stage assess academic genres, so 'assessment spine' / 'at least one per stage' is not documented. Resolved DOWN to 2.",
      "W1 vs W2 boundary: the unit planner, planning document and scaffolded assessment framework are professional artefacts. Under one-construct-one-home they are scored as task fidelity in W2, not as professional communication in W1.",
      "Scope limitation affecting C1, C2, W1 and W2: the 'Majors, minors and specialisations' page was not captured. The six specialisation subjects are known only from the electives table plus the prerequisite lines that call them 'the core subjects in the ... specialisation'. They were treated as core on that basis; if any is in fact optional, W2's level-2 evidence still stands on the compulsory EDUC90331 'Scaffolded assessment framework' alone.",
      "G2: the capstone's supplied dataset and the permitted literature-review route reduce the uncertainty the gate contemplates; PASS rests on the assessed research-design decisions, not on live-project accountability, of which there is none."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-15"
    }
  },
  "mc-is": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2's anchor — 'At least one core unit assesses collaborative practice — group projects with individual accountability' — is met many times over in the compulsory core: team database design (INFO90002), group case (ISYS90026), group consulting reports (ISYS90045), the staged group ICT Governance Plan with an individual reflection hurdle (ISYS90038), and the group planning report (ISYS90050). Level 3 needs BOTH recurrence AND 'at least one assessment requires coordinating work across people AND tools/AI systems'. Recurrence is documented; the second conjunct is not — no assessed task documents role-and-tool allocation or makes the division of work between people and systems itself assessable. The nearest line is an ILO that hedges ('possibly including the use of project management software'), which is an outcome statement, not assessment evidence (R2). Scored down to 2.",
      "evidenceLines": [
        "One team based database design assignment (20%) with 3-4 team members, comprising of a database design and a data dictionary equivalent to approximately 3000 words, released week 2 and due in week 6, requiring approximately 26-30 hours of work per student. Intended Learning Outcomes (ILO's) 1 to 3 are addressed in the database design and data dictionary.",
        "Group case: Students form groups of 3 students, and together analyse and respond to a case study. Approximately 2,500 words per group, requiring 15-20 hours per student. ILO's 1 to 7 are addressed in this assessment.",
        "Group based report with 3-4 group members of approximately 4000 words. Intended Learning Outcomes (ILO's) 1 to 7 are addressed in this report.",
        "Assignment 1: A group report (5-6 members). Students will develop an ICT Governance Plan showing the current strategy and governance of a case organisation as well as a set of governance changes and their implementation plan. The assignment will have three submissions during the semester (Weeks 5, 10 and 12) as specified below. Totalling approximately 2500 words per student, requiring in total approximately 60-65 hours of work per student. ILO's 1 - 5 addressed in the plan.",
        "One group based planning report with 3-4 group members of approximately 1400 words per student. Intended Learning Outcomes (ILO's) 1 to 4 are addressed in the planning report.",
        "Apply tools and techniques of project planning and management, possibly including the use of project management software"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2's anchor — 'Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards' — is met in the compulsory core: ISYS90118's assessed self-reflection journal (20%, submission hurdle) addresses ILOs 4-6, which require justifying a method choice, analysing a research approach against discipline norms, and appraising the strengths and weaknesses of that approach; ISYS90050 assesses an individual critical analysis report of a case; ISYS90038 makes an individual reflection on the group assignment a pass hurdle. Level 3 requires assessment that makes students 'document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality'. Nothing in the extract does this: the single AI reference in any core subject is an assessment-security note about mitigating misuse, not a task requiring appraisal of AI output. Scored 2.",
      "evidenceLines": [
        "Other- Self-reflection research journal: Three journals of 250 words each over the semester. Estimated hours: 8 hours for the first two journal entries and 9 hours for the final journal entry (25 hours in total). 5% for each of the first two journal entries, and 10% for the last journal entry leading to 20% in total. Due weeks 3, 6, and 12. ILOs 1 and 4-6 are addressed in this assessment.",
        "ILO5 - Critically analyse a given research approach against discipline norms in research ethics",
        "ILO6 - Reflect on the strengths and weaknesses of their chosen research method, in relation to a research or development context.",
        "One individual critical analysis report of a project case scenario of approximately 1000 words. ILO's 3 to 6 are addressed in the critical analysis report.",
        "Majority of assessment in this subject takes the form of case discussion and analysis, delivered through a staged approach that is integrated with the weekly tutorials. This design emphasizes the progressive development of skills and the mitigation of the misuse of AI in open assessments by requiring students to complete or demonstrate some selected assessment tasks during tutorials."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1's anchor — 'AI or digital tools appear only as electives' — is what the extract documents. Every AI-bearing subject in the course structure (Artificial Intelligence in Organisations, The Ethics of Artificial Intelligence, Trustworthy Machine Learning, Human-AI Interaction) sits in the elective lists; no compulsory subject page in the extract mentions AI at all, the sole core AI reference being an assessment-integrity note. Level 2 is conjunctive and AI-specific — 'Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed' — and neither conjunct is documented in any core unit, so it is not reached. The core is substantively digital (ICT governance frameworks, data management, cyber security) well beyond tool operation, which is what makes 1 vs 2 arguable; the ambiguity is resolved DOWN to 1 because level 2's requirement names AI and no core unit satisfies it.",
      "evidenceLines": [
        "MGMT90267\tArtificial Intelligence in Organisations",
        "COMP90087\tThe Ethics of Artificial Intelligence",
        "Majority of assessment in this subject takes the form of case discussion and analysis, delivered through a staged approach that is integrated with the weekly tutorials. This design emphasizes the progressive development of skills and the mitigation of the misuse of AI in open assessments by requiring students to complete or demonstrate some selected assessment tasks during tutorials.",
        "Topics covered in the subject include: critical and strategic thinking, modes of strategic planning, ICT strategic frameworks, ICT Governance frameworks, ICT Governance policy documents, ICT Governance design frameworks, ICT Governance arrangements, models of organisational decision making, operating models, relationship of ICT Governance design to the development of enterprise architectures, ICT Governance design methodologies, and value creation through ICT Governance design and implementation. The course also focuses on sustainable strategy and governance practices."
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2's anchor — 'At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects' — is met by the individual case analysis in ISYS90026 and the individual critical analysis of a project case scenario in ISYS90050, both assessed core tasks over problems not worked in class. Level 3 requires documented 'structured progression toward independent learning: a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them'. A 25 cp capstone is required of everyone, and ISYS90118's assessed written proposal has students frame their own question and method — but the capstone the student actually does may be a client-supplied industry project or a host-organisation internship, neither self-scoped, and the one route that documents gap-identification-plus-development-plan (ENGR90033) is optional. Evidence straddles 2 and 3; taken DOWN to 2.",
      "evidenceLines": [
        "Individual case: Students are asked to fully analyse and respond to a case study. Approximately 1,500 words, requiring 25-30 hours. ILO's 1 to 4, 6 and 7 are addressed in this assessment.",
        "One individual critical analysis report of a project case scenario of approximately 1000 words. ILO's 3 to 6 are addressed in the critical analysis report.",
        "Written Proposal: 2000 word proposal not including references. ILOs 1-3 are addressed in this assessment.",
        "25 credit points of Capstone experience subjects (where students select one of four capstone options) including"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2's anchor — 'Students design and conduct an inquiry with methodology selection and data collection, assessed' — is documented in the capstone research project, where students design and conduct a research investigation involving literature review, data collection and data analysis, assessed by a hurdle proposal, a hurdle oral presentation and a 7,500-word report; the compulsory ISYS90118 additionally assesses method selection and justification. Level 3 is explicitly barred by its own anchor: the substantial primary-evidence project must be 'REQUIRED (not one route among several)', and here it is one of four capstone options, the alternatives including an internship and a client project. The defence machinery level 3 asks for (staged supervised review, hurdle oral presentation) is present in that route, which is why it would be a 3 if required.",
      "evidenceLines": [
        "Students undertake an original investigation of a topic relevant to Information Systems (or cognate discipline). Specific research projects will depend on the availability of appropriate expertise but may address a range of issues within Information Systems research. Under the supervision and guidance of an academic researcher, students are required to design and conduct a research investigation. This would typically involve a literature review, data collection and data analysis. The results will be written as a project report and presented publicly. In some instances, it is expected that the results will also be submitted for publication in a conference or journal.",
        "One 15-minute oral presentation (10%), summarising your overall research project. This  requires approximately 50 hours of work. ILO's 1 to 5 are addressed in the oral presentation.",
        "25 credit points of Capstone selective subjects or 25 credit points of Capstone IS Research Project subjects",
        "ILO4 - Research and justify a discipline-appropriate research method to answer a specific research question"
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 2,
      "rationale": "Level 2's anchor — 'At least one core assessment requires a recognised professional genre or an audience beyond the teaching team — client brief, consultancy or policy advice, ... pitch' — is met in the compulsory core: ISYS90045 assesses consulting reports and class presentations against ILOs including communicating technical concepts to a management audience, and ISYS90118 assesses a pitch of a proposal to stakeholders. Level 3 needs, on top of progressive recurrence, 'at least one core assessment ... delivered to, or judged by, a real external audience or practitioner ... with professional conduct or accountability explicitly among the assessed criteria'. No core assessment in the extract has an external audience: presentations are class presentations, the pitch audience is hypothetical, and industry contact in ISYS90045 is a guest speaker in class, not an assessor. Scored 2.",
      "evidenceLines": [
        "Communicate technical concepts to a management audience, both verbally and in writing",
        "Group based report with 3-4 group members of approximately 4000 words. Intended Learning Outcomes (ILO's) 1 to 7 are addressed in this report.",
        "One class presentation of first group based report of approximately 15 minutes duration. ILO's 1 to 7 are addressed in this presentation.",
        "Final Proposal Pitch Presentation (building on feedback and initial work from written proposal): 10-minute presentation, pitching the the proposal to hypothetical stakeholders. ILOs 1-6 are addressed in this assessment.",
        "Students work individually and in syndicate groups. Classes are interactive and focus on practice, with reading and research tasks undertaken largely outside class. Most classes feature a guest speaker from industry."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2's anchor is met more than once in core assessment: a database design and data dictionary (INFO90002), an ICT Governance Plan with implementation plan (ISYS90038), a Gantt chart and work breakdown (ISYS90050) and an enterprise-architecture assignment (ISYS90043) are each the artefact a practitioner would produce, which makes level 1's 'the artefact produced and the criteria applied remain academic' false. Level 3 requires BOTH a spine of such tasks AND that at least one carries a genuine constraint of practice; the second conjunct is not supported by assessment evidence. (a) 'The profession's own standards of performance' rests on ISYS90049's BABOK/IIBA aims paragraph and ISYS90050's bare indicative-content line naming PMBOK — subject-content statements, not assessment tasks, hurdles or criteria — plus ISYS90038's 'Apply the principles and methodologies found in current ICT governance frameworks', which is an intended learning outcome and is barred by R2 from carrying a level 3. Decisively, the string 'criteri' appears zero times in the whole 2,594-line extract: not one assessment in this program documents the criteria it is judged against, so this route is unevidenced by construction. (b) 'Externally supplied problem' rests on 'a case organisation', but W2's own level-1 anchor names case studies and worked scenarios as the level-1 marker, so a case cannot simultaneously supply the level-3 constraint; nothing documents the organisation as real or the problem as ambiguous. (c) 'Real resource/time limits' rests on the Gantt hurdle, which explicitly tracks 'the planned and real progress through the assignment' — an assignment-internal coursework artefact — and on weeks 5/10/12 staged deadlines, which are ordinary assessment timing. (d) No consequential real audience is claimed. The spine conjunct is separately shaky: on the ISYS90109/ISYS90110 capstone route the required 25 cp stage produces an academic research report, so a practitioner artefact at every stage is not documented for every student. Scored 2 on adversarial verification (demoted from 3).",
      "evidenceLines": [
        "Assignment 1: A group report (5-6 members). Students will develop an ICT Governance Plan showing the current strategy and governance of a case organisation as well as a set of governance changes and their implementation plan. The assignment will have three submissions during the semester (Weeks 5, 10 and 12) as specified below. Totalling approximately 2500 words per student, requiring in total approximately 60-65 hours of work per student. ILO's 1 - 5 addressed in the plan.",
        "Assignment 1: Project Planning (Gantt chart and work breakdown). Project planning including a Gantt Chart and Work breakdown showing the planned and real progress through the assignment, requiring 2-4 hours of work per student. ILO 3 is addressed in the assignment.",
        "Assignment 1: Week 10 Submission – Current Governance: Submit all work up to the end of Section 3 in the template (to the end of Current Governance Section, including the Key Gaps). An additional 1000 words from the 2500 total per student. Approximately 24-26 hours work per student. ILO's 2, 3, 4 and 5 are addressed.",
        "3. Apply the principles and methodologies found in current ICT governance frameworks to the development of ICT governance plans for an organisation",
        "This subject focuses on business analysis from the context of digital technologies. It introduces modern business analysis techniques, including a selection of those in the Business Analysis Body of Knowledge (BABOK) by the International Institute of Business Analysis (IIBA), and exemplifies them by means of digital technologies applied to solve problems or exploit new business opportunities. It also includes in-depth case studies in which business problems and opportunities, drawn from real-world scenarios, are mapped to digital solutions. The work is summarised in seven guiding principles that should be followed by every business analyst.",
        "One group based report (35%) with 2 to 3 group members of approximately 2000 words per student, requiring 45 - 50 hours of work per student, due end of semester (35%). ILO's 1, 2, 3 and 4 are addressed in this report.",
        "The Project Management Body of Knowledge (PMBOK).",
        "One team based database design assignment (20%) with 3-4 team members, comprising of a database design and a data dictionary equivalent to approximately 3000 words, released week 2 and due in week 6, requiring approximately 26-30 hours of work per student. Intended Learning Outcomes (ILO's) 1 to 3 are addressed in the database design and data dictionary.",
        "One group based assignment with 3-5 group members of approximately 3500 words due at the end of week 9, requiring approximately 48-52 hours of work per student. Intended Learning Outcomes (ILO's) 1, 3, 4 and 5 are addressed in the assignment."
      ]
    },
    "W3": {
      "score": 1,
      "rationale": "Level 1's anchor — 'Work-situated learning exists only as an elective, an optional internship' — is exactly what the structure documents. ENGR90033 places students with a Host Organisation under an external supervisor and assesses structured reflection, which would satisfy level 2 or 3 on its features, but it is one of four capstone options a student may select; a student can complete the whole 200 credit points without any workplace placement by taking the research project, the innovation project or the client project instead. Level 2 requires 'A core unit places students in a real workplace or professional-community setting', and no unit that does so is core. The one alternative with an external party, the industry-based capstone project, is likewise a selective and documents an academic mentor rather than practitioner supervision. Scored 1.",
      "evidenceLines": [
        "25 credit points of Capstone experience subjects (where students select one of four capstone options) including",
        "ENGR90033\tInternship",
        "This subject involves students undertaking professional work experience with a Host Organisation, generally at the Host Organisation’s premises. Students will work under the supervision of both an academic mentor and an external supervisor at the Host Organisation.",
        "This subject is a pass/fail subject. The successful completion of this subject will result in a CMP (for completed) on your academic transcript. No mark will be awarded, and your performance in the subject will not affect your weighted average mark (WAM).",
        "The subject involves in-depth investigations of a business problem in the real world and the proposal of a solution that may involve information systems and/or business process reengineering. The proposed solution should offer economic, environmental, and social benefits to the client organisation and their stakeholders. Typical project tasks include defining project requirements, researching relevant literature, designing, and evaluating a solution, and communicating project outcomes to the industry client, practitioners, academics, and the general public."
      ]
    },
    "workplace": 5,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "PASS on 'an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain'. 125 of 200 credit points are compulsory Information Systems subjects (87.5 in Year 1, 37.5 in Year 2) plus a required 25-point capstone, leaving only 50 points of electives; the sequence runs from foundations (concepts, databases, programming, business analysis) to Year 2 strategy, governance and enterprise architecture; and the course is accredited by the Australian Computer Society. Content is disciplinary, not generic or interchangeable.",
        "evidenceLines": [
          "The Master of Information Systems requires the successful completion of 200 credit points.",
          "125 credit points of compulsory subjects including",
          "87.5 credit points of Year 1 compulsory subjects",
          "25 credit points of Capstone experience subjects (where students select one of four capstone options) including",
          "The new MC-IS course has been provided with accreditation by the Australian Computer Society."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "PASS on 'Assessments require defended trade-off decisions, or simulations/capstones/live projects with real uncertainty and accountability'. The compulsory ISYS90038 assignment requires diagnosing a case organisation's key governance gaps and then defending a set of governance changes and an implementation plan across three staged submissions; ISYS90050 assesses identification and evaluation of project risks in an individual critical analysis; ISYS90026 requires students to weigh business problems and defend a credible solution, with an examination built on an unseen in-depth case. This is well beyond recall or scripted response.",
        "evidenceLines": [
          "Assignment 1: Week 10 Submission – Current Governance: Submit all work up to the end of Section 3 in the template (to the end of Current Governance Section, including the Key Gaps). An additional 1000 words from the 2500 total per student. Approximately 24-26 hours work per student. ILO's 2, 3, 4 and 5 are addressed.",
          "Identify and evaluate risks associated with projects",
          "Additionally, this approach trains students in solving problems from different points of view and equips students with critical analysis skills and competencies. It also requires students to respond to business problems, highlight weaknesses and opportunities for the businesses, and provide a credible solution and analysis for the business.",
          "This subject contains a 3-hour exam. This will include an in-depth case study that will require about an hour of reading and notetaking before completing the examination questions (which will be the equivalent of a 2-hour exam)."
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 2 and 3: assessed collaboration demonstrably recurs across the core (the recurrence half of level 3), but no assessment documents coordination across people AND tools/AI systems. Resolved DOWN to 2 by the never-resolve-upward rule; the only tool-allocation line is an ILO hedged with 'possibly', which R2 bars from carrying a level 3.",
      "C2 straddled 2 and 3: ISYS90118's three assessed reflective journals at weeks 3, 6 and 12 could be read as 'evidence strategy adjustment over time (process-focused assessment)', but the handbook documents reflection on the strengths and weaknesses of a chosen method, not documented reliance decisions or defended judgements of tool output. Resolved DOWN to 2.",
      "C3 straddled 1 and 2: the core is deeply digital and includes a substantial assessed ICT governance component, which reads toward the governance language in this item, but level 2's conjunctive requirement is AI-specific and no compulsory subject page documents AI capabilities or limitations. Resolved DOWN to 1. Note that only the elective ISYS90089 has subject pages in the extract; the other electives appear as titles only, so elective AI content is judged from titles — this does not affect the score, since elective-only AI caps at level 1 by the anchor itself.",
      "C4 straddled 2 and 3: a 25-credit-point capstone is required of every student and Year 1 compulsory ISYS90118 has students scope their own research question in an assessed proposal, which reads toward 'structured progression toward independent learning'. But the capstone a given student completes may be a client-supplied industry project or a host-organisation internship, so a self-scoped project is not documented as required. Resolved DOWN to 2.",
      "C5 was resolved by the anchor rather than the tie-break rule: the capstone research project satisfies every level-3 feature (original investigation, data collection, hurdle proposal, hurdle public oral presentation, supervisor-set mid-project milestones) but is one of four capstone options, and level 3 explicitly excludes 'one route among several'. Scored 2.",
      "W1 straddled 2 and 3: the industry-client capstone documents communicating outcomes to the industry client and practitioners, which would supply level 3's external-audience conjunct, but it is a capstone selective and not core, and professional conduct is not documented among assessed criteria in any core task. Resolved DOWN to 2.",
      "W2 straddled 2 and 3 and was resolved DOWN to 2 on adversarial verification. The level-3 'genuine constraint of practice' conjunct had rested on documented task features in core subjects — an externally supplied case organisation whose gaps must be diagnosed, staged deadlines with a planned-versus-real progress hurdle, and assessment against the profession's own frameworks (ICT governance frameworks, BABOK/IIBA, PMBOK). Verification found each route unsupported by assessment evidence: the framework references are aims, indicative content or ILOs (R2), the case organisation is the level-1 marker rather than a level-3 constraint, and the Gantt hurdle tracks progress internal to the assignment. No assessment in the extract documents its criteria at all. A real external client appears only in the ISYS90119 capstone selective and was deliberately not relied on.",
      "W3 straddled 1 and 2 on substance: ENGR90033 documents a real host organisation, an external supervisor and assessed structured reflection, i.e. level 2/3 features, but only as one of four capstone options. The level-1 anchor names 'an optional internship' explicitly, so it governs and the score is 1.",
      "One-construct-one-home applications: the ENGR90033 placement evidence was scored only in W3, never in C1 or C4; the peer/member rating and reflection in the capstone was treated as C2-type evidence rather than W2; and the consulting and pitch genres were scored in W1 rather than W2, where only the artefact and its criteria were counted."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-15"
    }
  },
  "mc-jurisd": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 is satisfied: core units assess collaborative practice with individual accountability — Criminal Law and Procedure carries a 'Group research assignment' (2000 words equivalent, 30%) and Principles of Public Law assesses an 'Interactive oral small group discussion (individually assessed)' at 10%, with collaboration named in the assessed learning outcomes of both Criminal Law ('Independently and collaboratively analyse unfamiliar offence provisions') and Public Law ('Work autonomously and collaboratively to solve problems'). Level 3 is not reached: the anchor additionally requires at least one assessment in which work is coordinated across people AND tools/AI systems (documented role and tool allocation, or the human/system division of labour itself assessed), and nothing in the extract documents any such task — no core assessment mentions tools, systems or AI at all. Held at 2 under the lower-level rule.",
      "evidenceLines": [
        "Group research assignment",
        "Independently and collaboratively analyse unfamiliar offence provisions, and identify prohibited conduct, available responses by an accused and the impact of doctrines such as complicity.",
        "Interactive oral small group discussion (individually assessed)",
        "Work autonomously and collaboratively to solve problems of public and public international law;",
        "An ability to work in groups to solve problems and critically analyse legal materials in a classroom setting."
      ]
    },
    "C2": {
      "score": 1,
      "rationale": "Demoted from 2 to 1 on adversarial review. Level 2 requires criterion-referenced appraisal of QUALITY — the anchor's exemplars are peer review, structured critique, portfolio against standards, and marking against exemplars — and none of the four appears anywhere in the extract. What the extract documents is reflection on one's own experience and engagement with feedback: the Disputes and Ethics component names only 'reflection' with no criteria described (the subject overview has students 'reflect deeply on the processes and outcomes of civil disputes', i.e. reflection on process rather than appraisal of work against standards), and the Legal Research 'Assessment 2 - Reflective oral presentation' is supported by the ILO 'A capacity to reflect upon and engage with feedback', i.e. receiving and responding to a supervisor's judgement rather than exercising evaluative judgement against criteria. The original score resolved an acknowledged ambiguity upward, contrary to the instrument's rule that ambiguity between two levels takes the lower. Level 1's descriptor — reflection appears in outcomes or graduate attributes but no core unit assesses it against criteria — is not contradicted by any line in the extract.",
      "evidenceLines": [
        "Negotiation - plan, negotiation activity and reflection (students are required to submit the plan and activity in order to undertake the reflection).",
        "Assessment 2 - Reflective oral presentation",
        "A capacity to reflect upon and engage with feedback from an oral presentation of their research thesis and other feedback from the supervisor;"
      ],
      "adjudication": {
        "originalScore": 2,
        "demotedTo": 1,
        "reason": "Resolved upward in violation of the scoring-direction rule — the scorer conceded the extract 'never states the criteria against which those reflections are judged' and that a stricter reading would give 1. Substantively, none of level 2's four exemplars of criterion-referenced quality appraisal (peer review, structured critique, portfolio against standards, marking against exemplars) appears in the extract; the documented tasks are reflection on experience and engagement with supervisor feedback, which level 1's descriptor accommodates."
      }
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1 exactly: digital capability appears only as program-level attribute language and as tool operation, and AI appears only in electives. The course attributes claim 'sound working skills in the application of computer systems and software' and 'computer-aided research', and the only core-unit digital content is operational — Evidence and Proof says software 'may be studied' for communicating factual analysis, and Administrative Law's generic skills list locating legislation on the Federal Register of Legislative Instruments. AI-specific subjects ('Law and Automation', 'AI and Justice') appear only in the JD quota and MLM elective lists, not the sixteen compulsory subjects. Level 2 would require core units to address AI capabilities AND limitations/ethics with use-with-limits assessed; no core unit in the extract mentions AI at all, so 2 and 3 are both unavailable.",
      "evidenceLines": [
        "Awareness of advanced communications technologies and modalities, sound working skills in the application of computer systems and software, and receptiveness to the expanding opportunities of the 'information revolution';",
        "Skills in the design and conduct of legal research, including computer-aided research",
        "A number of methods for communicating factual analysis, including the use of software, may be studied, with an emphasis on both technical accuracy and the production of useful, readable analysis.",
        "Use the Federal Register of Legislative Instruments to locate Commonwealth legislation;",
        "Law and Automation",
        "AI and Justice"
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3's first route is met with assessment evidence, as R2 requires: the program documents structured progression toward independent learning through the compulsory Year 3 subject Legal Research, explicitly a self-scoped capstone — students research 'a topic of their choice', frame 'their own sophisticated and relevant research question', and are assessed on a staged sequence (hurdle preliminary topic proposal, revised topic proposal 15%, written research project 8000 words 70%). This is not a claim in outcomes only; it is the weighted assessment structure of a core subject. Level 2 is also independently satisfied (core assessments require application to unfamiliar problems — Property's 'Written assignment hypothetical' against the outcome to apply legal method 'in familiar and novel legal contexts', and Constitutional Law's outcome to apply principles to unfamiliar fact situations), so the item does not rest on the capstone alone.",
      "evidenceLines": [
        "Legal Research is a unique subject that allows students to conduct research on a topic of their choice.",
        "It provides students in their final year with a capstone research experience, comprising several small-group research seminars at the beginning of semester and ongoing individualised research project supervision throughout the semester.",
        "Creativity and originality in identifying, framing and developing their own sophisticated and relevant research question;",
        "Assessment 1A - Preliminary topic proposal",
        "Hurdle requirement: Submission of preliminary topic proposal",
        "Assessment 3 - Written research project",
        "8000 words (equivalent)",
        "Written assignment hypothetical",
        "Apply and adapt legal method and reasoning to solve complex property law problems in familiar and novel legal contexts.",
        "Apply constitutional principles and provisions to unfamiliar fact situations;"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2: students design and conduct an inquiry with methodology selection, assessed. Legal Research is compulsory and requires self-directed research under supervision with a methodology the student chooses, assessed as a substantial research-based project with a hurdle research log book and required supervision consultations. Level 3 is not taken: the anchor requires a substantial project GENERATING PRIMARY EVIDENCE with methodology DEFENDED UNDER SCRUTINY, and the extract documents neither — the project is described as interpreting and integrating 'primary and secondary sources' rather than generating primary evidence, and the oral component is described as a reflective presentation made before submission with feedback engagement, not a viva or defence of methodology. The evidence straddles 2 and 3; resolved down.",
      "evidenceLines": [
        "the subject requires the student to engage in self-directed research, under the supervision of a member of staff with expertise in the student's field of inquiry, and/or the methodology they have chosen to use.",
        "A rigorous and effective methodological approach to planning, researching and executing a substantial and innovative research-based project;",
        "Employing complex research methodologies well-suited to answering the research question;",
        "Hurdle requirement: Participation in seminar streams; compilation of research log book; participation in supervision consultations as scheduled.",
        "Sophisticated interpretation and integration of relevant material from a full range of primary and secondary sources;"
      ]
    },
    "adaptiveness": 9,
    "W1": {
      "score": 2,
      "rationale": "Level 2: at least one core assessment requires a recognised professional genre. The compulsory subject Remedies assesses a 'Memorandum to a partner in response to a practical problem' (1000 words, 30%) — the internal advice memorandum is the legal profession's own genre, not an academic essay addressed to the marker, which is what level 1's negative condition requires. Professional conduct also appears in core outcomes (Disputes and Ethics on professional judgment, client groups and culturally safe practice), but per R2 and Barrie those outcome statements are not themselves scored. Level 3 is not reached: nothing in the extract shows professional communication assessed repeatedly and progressively across the program with delivery to, or judgement by, a real external audience or practitioner, and professional conduct is not documented among the assessed criteria of any core task. The clinics and the Legal Internship, which could supply an external audience, are enrichment electives.",
      "evidenceLines": [
        "Memorandum to a partner in response to a practical problem",
        "1000 words",
        "Identify relevant ethical issues and demonstrate appropriate professional judgment and decision-making skills in advising on legal matters, with regard for the needs of particular client groups, including Aboriginal and Torres Strait Islander clients;",
        "Demonstrate basic skills of legal research, client communication, culturally safe legal practice, case management, and negotiation;",
        "Interpersonal skills in relating to a client (actual or hypothetical) and in providing advice attuned to that client's needs and interests"
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2: at least one core assessment reproduces a professional task and produces the artefact a practitioner would produce. In Disputes and Ethics the assessed task is a negotiation plan plus a negotiation activity set inside a simulated civil dispute — planning and conducting a negotiation is the practitioner's task and the practitioner's artefact, which level 1's condition ('the artefact produced and the criteria applied remain academic') cannot describe. Evidence and Proof's 'Fact analysis task' is likewise set against complex, realistic facts. Level 3 is not reached: such tasks are single instances, not the assessment spine — the spine across the sixteen compulsory subjects is supervised examinations (typically 50-80%) plus written assignments and hypotheticals in academic form. Scored per R4 on documented task features only; the handbook's use of words like 'practical' or 'realistic' was not treated as evidence in itself.",
      "evidenceLines": [
        "Negotiation - plan, negotiation activity and reflection (students are required to submit the plan and activity in order to undertake the reflection).",
        "Through their experiences in a simulated civil dispute, and engagement with relevant doctrinal, socio-legal and jurisprudential literature, students will be required to reflect deeply on the processes and outcomes of civil disputes.",
        "Fact analysis task",
        "The classes will emphasise the application of these rules to complex, realistic facts and the development of skills to describe the impact of legal regulation on factual arguments that would otherwise be available.",
        "Written assignment hypothetical",
        "Supervised examination"
      ]
    },
    "W3": {
      "score": 1,
      "rationale": "Level 1: work-situated learning exists, but only as electives and extracurricular activity. The Legal Internship and the clinical subjects (Public Interest Law Clinic, MLS Tax Clinic, Indigenous Legal Advocacy Clinic, Street Law and others) sit in the JD enrichment elective list, which is subject to application and selection and therefore not available to all students; clerkships, internships, mooting and Law Review work are described as break-period opportunities. Level 2 would require a core unit placing students in a real workplace or professional-community setting with practitioner supervision and assessment; none of the sixteen compulsory subjects in the extract is a placement, practicum, live client project or community-based project. Per the v4.1 migration rule, the Disputes and Ethics simulation is not scored here — simulation is W2.",
      "evidenceLines": [
        "JD enrichment elective subjects",
        "Most JD enrichment electives have an application and selection process. Students cannot self-enrol in electives with an application. Enrolments will be confirmed after a selection process has been run.",
        "Legal Internship",
        "Public Interest Law Clinic",
        "This format enables students to take advantage of other educational, professional and social opportunities during the summer and winter breaks, including seasonal clerkships, international exchanges, internships, mooting and Law Review editorial work.",
        "Sixteen subjects are compulsory, enabling the School to provide its students with cumulative learning, by integrating both subject matter and skills across and between semesters."
      ]
    },
    "workplace": 5,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "A coherent all-compulsory specialist core with documented progressive depth and an accredited sequence. Sixteen compulsory subjects (200 of 300 credit points) are stated to deliver cumulative learning with private and public law building progressively across semesters, individual subjects state their dependence on earlier compulsory subjects (Administrative Law builds on Principles of Public Law and Constitutional Law), and the whole sequence is accredited by the Victorian Legal Admissions Board for admission to practice, with prescribed areas of knowledge declared examinable in each core subject. Nothing generic or interchangeable about the content.",
        "evidenceLines": [
          "This course is accredited by the Victorian Legal Admissions Board (VLAB) to meet the academic requirements for admission to the legal profession in Victoria as an Australian lawyer.",
          "200 credit points of compulsory subjects",
          "Sixteen subjects are compulsory, enabling the School to provide its students with cumulative learning, by integrating both subject matter and skills across and between semesters.",
          "In addition, subjects in both private and public law build progressively over the semesters, contributing to the effectiveness of the learning experience.",
          "it builds on and assumes the knowledge gained in all earlier compulsory subjects especially LAWS50024 Principles of Public Law and LAWS50028 Constitutional Law."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Core assessment requires defended trade-off decisions rather than recall or scripted responses. Disputes and Ethics requires advising on which of negotiation, mediation or litigation is the most appropriate resolution method for a complex factual scenario, and assesses a negotiation plan and live negotiation activity; Remedies requires recommending appropriate remedies in complex factual problems via a memorandum to a partner; Constitutional Law and Administrative Law both require developing arguments about which principles should apply where provisions or decisions are unclear or in conflict.",
        "evidenceLines": [
          "Analyse and evaluate a civil dispute involving a reasonably complex factual scenario, and provide advice and assistance as to the most appropriate method(s) of resolving the dispute - namely negotiation, mediation and litigation;",
          "Apply case law, statutes and equitable principles to recommend appropriate remedies in complex factual problems.",
          "Develop arguments as to what legal principles should be applied when the relevant constitutional provisions or decisions are unclear or in conflict;",
          "How to develop arguments about which legal principles should be applied when the relevant provisions or decisions are unclear or in conflict"
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 2 and 3: assessed collaboration does recur across the program (group research assignment in Year 2, individually assessed small-group oral discussion in Year 1), which meets the recurrence half of the level-3 anchor, but the tools/AI coordination half is entirely absent from the extract. Resolved down to 2 by the lower-level rule.",
      "C2 was scored 2 at first pass and demoted to 1 on adversarial review: reflection is a named, weighted component of core assessment in two compulsory subjects, but the extract never states criteria against which those reflections are judged and none of level 2's exemplars of criterion-referenced quality appraisal appears. Resolved down per the scoring-direction rule.",
      "C2 vs W2, one construct one home: the single Disputes and Ethics line 'Negotiation - plan, negotiation activity and reflection' documents two separable components. The reflection component was read under C2 (appraisal of one's own work) and the plan-and-activity component under W2 (task fidelity). The line is quoted in both items and the split is declared here rather than being scored twice for the same construct; after the C2 demotion the reflection component carries no score.",
      "C4 vs C5, one construct one home: the compulsory Legal Research capstone supports both items, as the instrument's own anchors contemplate. Its self-scoping evidence (topic of choice, own research question, topic-proposal hurdle, 8000-word project) is scored in C4; its methodology, supervision and research-log evidence is scored in C5. No single line is used for both constructs.",
      "C5 straddled 2 and 3: the substantial research project IS required of every student and is staged through proposal, oral presentation and supervision consultations, which is close to the level-3 'staged supervised review'. It was held at 2 because the extract describes interpretation of primary and secondary sources rather than generation of primary evidence, and describes the oral component as reflective rather than as a defence of methodology.",
      "W1 and W2 both rest on tasks whose judging criteria are not documented. The Remedies memorandum and the Disputes and Ethics negotiation were scored at 2 on the documented artefact and genre alone (a memorandum to a partner, a planned and conducted negotiation), not on any handbook claim of being practical, real-world or work-ready — R4 was applied and no such label was treated as evidence.",
      "The extract contains no assessment pages for elective subjects, so the clinics, Legal Internship, Advocacy, Mediation, Negotiations and the AI-related electives could only be read from the course-structure listings. This constrains W3 to level 1 and C3 to level 1 on the face of the extract; it does not change either score, since both anchors turn on core-unit evidence which is fully present (all sixteen compulsory subjects and their assessment pages are in the extract)."
    ],
    "notScoreable": [],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-15"
    }
  },
  "mc-mgmthre": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2's anchor — 'At least one core unit assesses collaborative practice — group projects with individual accountability' — is met many times over in the compulsory core: MGMT90018, MGMT90027, MGMT90015, MGMT90176, MGMT90280, MGMT90141 and the MGMT90010 capstone all carry weighted group assignments, several with an individual component or presentation alongside the group artefact. Level 3 needs the recurrence limb AND at least one assessment requiring coordination of work across people AND tools/AI systems — a documented role-and-tool allocation, or a task where the division of work between people and systems is itself assessed. The recurrence limb holds comfortably; the human-plus-tool limb is nowhere documented. No assessment table in the extract names a tool, system or AI component whose allocation against human effort is assessed; the only AI statement is a course-level outcome (R2 caps it at 1 and it homes in C3 anyway). Scored at 2 accordingly.",
      "evidenceLines": [
        "Group assignment (groups of 3-5), 3000 words",
        "Group assignment (groups of 3-5 students) comprising 10 minute presentation and 1000 word written assignment, 2000 words (equivalent)",
        "Group assignment (3-5 students per group), 4000 words",
        "3500 word group assignment (usually in groups of3-4), 3500 words",
        "Collaboration for group-based work and activities, including in diverse and multicultural contexts"
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 asks for 'criterion-referenced appraisal of quality' in core assessment. MGMT90140 Management Competencies is a foundation core subject every student must complete in first semester, and its assessment table carries 'Critical reflection on competence development' at 40% plus 'Ongoing competence development mini-assignments' at 10%; the subject ILO names the competence set against which that appraisal is made (self-awareness, self-management, political acumen, networking, problem solving, motivating, collaboration, conflict management). That is assessed appraisal of the quality of one's own work against a named standard, in a compulsory subject — not the level-1 case where reflection appears only in outcomes and no core unit assesses it. Level 3 requires students to document and justify reliance decisions on a tool, source or collaborator, to defend judgements of AI-output quality, or to evidence strategy adjustment over time. No reliance decision and no AI-output appraisal is documented anywhere. The 'strategy adjustment over time' route is the arguable one — a semester of ongoing development mini-assignments culminating in a 40% critical reflection is process-focused — but the handbook says the reflection is on competence development and never states that the student must evidence what they changed and why, so the ambiguity is resolved DOWN to 2.",
      "evidenceLines": [
        "Critical reflection on competence development, 2000 words",
        "Ongoing competence development mini-assignments, 1000 words",
        "Analyse and evaluate key competencies you need to become a more effective manager, including self-awareness, self-management, political acumen, networking, problem solving, motivating, collaboration, and conflict management",
        "Develop key competencies through practice-oriented activities such as scenarios, role plays, team activities, video presentations, reflective exercises."
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Level 1's anchor — 'AI or digital tools appear only as electives or as tool operation/training' — describes this program exactly. AI appears at course level as an intended learning outcome ('Leverage artificial intelligence and digital tools...'), which R2 caps at 1 because no core assessment is documented against it. The one subject that would satisfy level 2 on content — MGMT90267 Artificial Intelligence in Organisations, which assesses reports against ILOs covering the function, limitations and 'ethicalities' of AI — is listed only in the elective set, so it is not something the program requires. Level 2 needs core units addressing AI capabilities AND limitations/ethics, discussed and assessed. The nearest core evidence is MGMT90280 Managerial Decision Analytics, whose ILOs cover emerging technologies and the 'power and limitations' of analytical techniques — but that is analytics rather than AI, carries no ethics or governance content, and its assessment lines (test, group assignment, presentation, exam) do not name the AI or limitations content. Ambiguity between 1 and 2 resolves DOWN. Level 3 (critique or governance of AI systems in the discipline's context — bias, accountability, transparency, regulation, data governance) is not approached in any core assessment, which is notable given HR is a field where algorithmic recruitment and selection are governed activity.",
      "evidenceLines": [
        "Leverage artificial intelligence and digital tools to enhance human resource decision-making and processes.",
        "MGMT90267 Artificial Intelligence in Organisations (Term 2, Online)",
        "Understand new decision analytics and emerging technologies and their potential in the workplace",
        "Understand and evaluate the power and limitations of optimisation and data analytical techniques",
        "Students must complete three subjects from the following list:"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 requires at least one core assessment applying methods to novel or unfamiliar problems, with 'case variation' and 'cross-context projects' named as exemplars. The compulsory capstone MGMT90010 documents exactly a cross-context case task: students draw on their core business subjects and HR studies to analyse a series of cases on topical issues and develop recommendations, assessed through a 40% group assignment and an exam; MGMT90015 and MGMT90141 add case-study and 'real and hypothetical situations' application in core, and MGMT90280 names application to real-world business problems. Level 3 requires documented structured progression toward independent learning: a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps with the plan to close them. The research option would supply the self-scoped project, but it is one route among several and is gated (100 points completed, WAM of 80, Program Director approval, possible research proposal), so it is not what the program documents for its students. The MGMT90140 reflection is the other candidate for the gap-identification route but it is scored once, in C2, under one-construct-one-home. Held at 2.",
      "evidenceLines": [
        "In this subject students will draw on their core business subjects and HR studies to critically analyse a series of cases on topical issues and develop recommendations that promote organisational sustainability.",
        "3500 word group assignment (usually in groups of3-4), 3500 words",
        "Apply key concepts and research to individual HR problems, presented in case studies",
        "Apply different models to real and hypothetical situations.",
        "Students who wish to take the research option must have completed at least 100 points and have achieved a WAM of 80 across all subjects completed."
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Level 1's anchor — an introductory methods unit and secondary/literature-based assessment — is what the compulsory core documents. MGMT90141 introduces how business analysts gather and process information; MGMT90280 trains prescriptive and predictive analytic techniques; the course-level generic skills name conducting research and retrieving information from a variety of sources. Level 2 requires students to design and conduct an inquiry with methodology selection and data collection, assessed. Nothing in the core assessment tables documents that: every core assessment is an individual assignment, a group assignment, a presentation, participation or an exam, and none is described as collecting primary data or selecting a methodology. MGMT90261 HR Analytics is the only subject teaching students to design HR metrics, collect data and choose statistical tests, and it sits in the capstone-selective and elective lists, not the core. The research option (MGMT90206 plus an advanced subject, with a possible research proposal) would reach further, but level 3's anchor explicitly excludes evidence that is 'one route among several', and this route additionally requires a WAM of 80 and Program Director approval. Resolved DOWN to 1.",
      "evidenceLines": [
        "This subject introduces students to the different types of information that business analysts and decision makers gather, and how that information is processed to make effective business decisions.",
        "Conducting research, including the retrieval of information from a variety of sources",
        "Research skills through the search and review of literature and preparation of the written exercises",
        "Students who wish to take the research option must have completed at least 100 points and have achieved a WAM of 80 across all subjects completed.",
        "Places in the research subjects are limited and students will be required to obtain Program Director approval prior to undertaking the research option."
      ]
    },
    "adaptiveness": 8,
    "W1": {
      "score": 2,
      "rationale": "Level 2's anchor names 'consultancy or policy advice' among the recognised professional genres, and one is documented in the compulsory discipline core: MGMT90016 Performance and Reward Management assesses a 'Group consulting report' at 30%. That is a practitioner genre, not an academic genre addressed to the marker, and it sits in a subject every student must complete — which falsifies level 1, whose anchor requires that no professional genre be assessed. Level 3 requires professional communication to be assessed repeatedly and progressively AND at least one core assessment delivered to or judged by a real external audience or practitioner, with conduct or accountability among the assessed criteria. Neither limb holds: every presentation in the core (MGMT90014, MGMT90015, MGMT90141, MGMT90280, MKTG90037) is delivered to peers and staff, and the only external-audience assessment in the extract — the BUSA90473 'Presentation 2 - to host company' — sits in the capstone-selective list, not the core, and is scored under W3's construct home. The course-level claims about communicating to 'the wider community' and to 'specialist and non-specialist audiences' are outcome and graduate-attribute statements, which R2 and Barrie forbid scoring.",
      "evidenceLines": [
        "Group consulting report (groups of 2 - 3 students), 2000 words (equivalent)",
        "Group presentation (normally in groups of 2-4) in allocated weeks throughout semester, 20 minutes",
        "Communication of human resources concepts, theories and solutions to peers and the wider community",
        "Interpretation and communication of research results to specialist and non-specialist audiences"
      ]
    },
    "W2": {
      "score": 1,
      "rationale": "Level 1's anchor — 'Contextualised or scenario-framed tasks appear (case studies, worked scenarios), but the artefact produced and the criteria applied remain academic' — describes the core precisely. Case studies, scenarios and role plays are documented across MGMT90140, MGMT90015, MGMT90016, MGMT90141 and the MGMT90010 capstone, but the artefacts assessed are word-counted individual and group assignments plus a 50%-weighted end-of-semester exam in almost every core subject. Level 2 requires all three limbs: a real or realistic problem, the artefact a practitioner would produce, AND criteria drawn from practice. The MGMT90016 group consulting report is the one practitioner-shaped artefact in the core, but the handbook documents no external or ambiguous problem source and no criteria drawn from practice for it, so the three-part anchor is not satisfied; under one-construct-one-home that report is scored once, as a professional genre, in W1. R4 also bars reading the program's SHRM/AHRI alignment or its 'practice-oriented activities' phrasing as evidence of task fidelity. Level 3 (such tasks as the assessment spine, with a genuine constraint of practice) is far out of reach when exams carry 50% of nearly every core subject.",
      "evidenceLines": [
        "Develop key competencies through practice-oriented activities such as scenarios, role plays, team activities, video presentations, reflective exercises.",
        "The subject content will include conceptual foundations, practical tools, and case studies to discuss the costs, benefits and risks of the various analytical methods that will be introduced.",
        "End of semester examination, 2 hours",
        "Individual assignment, 2000 words"
      ]
    },
    "W3": {
      "score": 1,
      "rationale": "Level 1's anchor — 'Work-situated learning exists only as an elective, an optional internship' — is the exact shape of this program. Three genuine work-situated subjects appear (BUSA90473 Business Practicum, BUSA90485 Global Business Practicum, BUSA90525 Business and Economics Internship, the last a professional work placement with a 90-hour hurdle confirmed by a workplace supervisor), and on depth the internship would read higher. But all three appear only in the capstone-selective list and the elective list; the capstone-selective slot is a choice among six, of which HR Consulting, HR Analytics and (in principle) Design Innovation and Leadership involve no workplace at all, and the research option replaces the coursework capstone entirely. A student can therefore complete the entire 200-point program without ever entering a workplace. Level 2 requires a CORE unit to place students in a real workplace with practitioner supervision and assessment; no core subject does. Ambiguity between 1 and 2 — a required-choice capstone slot is stronger than a free elective — is resolved DOWN per the never-resolve-upward rule and recorded below.",
      "evidenceLines": [
        "Students must complete one of the following subjects:",
        "Capstone selective subjects",
        "BUSA90473 Business Practicum; BUSA90485 Global Business Practicum; BUSA90525 Business and Economics Internship;",
        "This subject involves the completion of a professional work placement (internship) either:",
        "Hurdle requirement: Students must participate in a minimum of 90-hours at the work placement to pass the subject."
      ]
    },
    "workplace": 4,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents a coherent specialist core with staged progression, not generic interchangeable content: 50 points of compulsory foundation subjects taken in the first semester, 37.5 points of core taken in the second semester, 50 points of named HR discipline core (People and Capability, International HRM, Performance and Reward Management, HRM in the New World of Work), and a compulsory capstone core subject in the final semester. Only 37.5 of 200 points are free electives. The sequence is externally warranted by accreditation with the Australian HR Institute and alignment with SHRM.",
        "evidenceLines": [
          "Discipline core subjects (50 points)",
          "Students must complete the following subjects in their first semester of study:",
          "Capstone core subject (final semester)",
          "This program is aligned with the internationally recognised Society for Human Resource Management (SHRM) and accredited with the Australian Human Resources Institute (AHRI).",
          "The Master of Management (Human Resources) is accredited by the Australian HR Institute."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Defended trade-off decisions are documented in the compulsory core rather than left to recall. MGMT90176 People and Capability is built on an explicit make-or-buy trade-off (train versus recruit and select) and assesses it through individual and group assignments; the MGMT90010 capstone requires identifying HR implications of organisational decisions before those decisions are taken and developing recommendations under case conditions; MGMT90141 frames its content around the costs, benefits and risks of competing analytical methods. That satisfies the 'defended trade-off decisions' limb. The gate does not require the uncertainty to be externally sourced, so the absence of live-project uncertainty (which cost W2 and W3) does not defeat it.",
        "evidenceLines": [
          "This subject evaluates the decision to “make” (train) or “buy” (recruit and select) employees for the organisation.",
          "Identify the HR implications of organisational decisions prior to decisions being taken;",
          "In this subject students will draw on their core business subjects and HR studies to critically analyse a series of cases on topical issues and develop recommendations that promote organisational sustainability.",
          "The subject content will include conceptual foundations, practical tools, and case studies to discuss the costs, benefits and risks of the various analytical methods that will be introduced."
        ]
      }
    },
    "ambiguities": [
      "C2 straddled 2 and 3. 'Ongoing competence development mini-assignments' running through the semester plus a 40% 'Critical reflection on competence development' is process-focused assessment of change over time, which is one of the three level-3 routes. But the handbook never states that the student must evidence what strategy they adjusted and why, and no reliance decision on a tool, source or collaborator is documented. Resolved DOWN to 2 by the never-resolve-upward rule.",
      "C3 straddled 1 and 2. MGMT90280 is core and its ILOs cover emerging technologies and the 'power and limitations' of analytical techniques, which reads toward level 2's 'capabilities AND limitations'. Against that: it never names AI, carries no ethics content, and its assessment lines do not name that content, while the one subject that does carry AI ethics (MGMT90267) is elective-only and the AI statement at course level is an outcome (R2). Resolved DOWN to 1.",
      "C4 straddled 1 and 2. The cross-context case work is documented in the MGMT90010 subject overview rather than in its assessment lines, which say only 'seminar preparation and participation', '3500 word group assignment' and 'End of semester examination'. Level 2 was retained because the capstone's documented content is case analysis and the group assignment is its only substantial vehicle, but a stricter assessment-line-only reading would give 1.",
      "W1 straddled 1 and 2. The 'Group consulting report' in the compulsory MGMT90016 is a professional genre named in the level-2 anchor itself ('consultancy or policy advice'), which falsifies level 1's requirement that no professional genre be assessed; but the second half of the level-2 clause — 'judged against criteria drawn from professional practice' — is nowhere documented, and there is no audience beyond the teaching team. Scored 2 on the genre limb; a rater weighting the criteria clause as strictly conjunctive would score 1.",
      "W1 vs W2: the same MGMT90016 group consulting report could support W2 level 2 as a practitioner artefact. One-construct-one-home puts it in W1 (genre and audience) and leaves W2 to be scored on task fidelity, where no real or externally supplied problem and no practice-drawn criteria are documented. It is scored once.",
      "W3 straddled 1 and 2. The capstone-selective slot is compulsory in the sense that every student must complete one of the six listed subjects, and three of the six are genuine placements — stronger than a free elective. But no core unit places students in a workplace, and a student may complete the degree through HR Consulting, HR Analytics or the research option with no workplace exposure at all, which is precisely level 1's 'optional internship'. Resolved DOWN to 1.",
      "C1 vs C3: the course-level outcome 'Leverage artificial intelligence and digital tools to enhance human resource decision-making and processes' is the only human-plus-tool statement in the extract and could be read toward C1 level 3. It is an outcome, not an assessment (R2), and its construct home is C3, so it does not lift C1."
    ],
    "notScoreable": [
      "No item was left wholly unscoreable — every compulsory subject in the 200pt structure has both an overview and an assessment page in the extract. Two gaps constrain the ceilings rather than the scores: (1) the foundation selective subjects (ACCT90041, ECON90015, FNCE90065) have no pages in the extract, so one of the four foundation subjects each student takes is undocumented; (2) among the capstone selectives, BUSA90485 Global Business Practicum, MGMT90017 HR Consulting and MGMT90261 HR Analytics are present but ENGR90034 is not — this does not affect W3, which turns on the optionality of the whole selective slot rather than on any one subject's depth.",
      "C3 level-3 evidence (governance, bias, accountability or regulation of AI systems in an HR context) is absent from the extract entirely rather than merely weak; the MGMT90267 assessment table names only 'Written activity', 'Report' and 'Quiz' with word counts, so even that elective's AI-ethics ILO has no assessment specification behind it."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-14"
    }
  },
  "mc-propsyc": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is met: a core unit assesses collaborative practice in the 'interprofessional activity' form the anchor names. PSYC90111 Well-being in Practice (compulsory, Year 1 Sem 1) carries a listed assessment component requiring completion of the 'Ways of Knowing' interprofessional learning program with two submitted reflective activities under a hurdle requirement, so level 1 ('no core unit assesses it') is factually false. Not level 3: no assessment anywhere in the extract requires coordinating work across people AND tools/AI systems — there is no documented role-and-tool allocation task and no assessment of the division of work between people and systems. Placement/patient work is excluded from C1 by the one-construct-one-home rule and scores in W3/W1.",
      "evidenceLines": [
        "Demonstrate the ability to consult and collaborate with colleagues, including those from other professions across the range of setting in which psychologists work",
        "Students will also participate in “Ways of Knowing”: an Indigenous and interprofessional learning journey in cultural safety and collaborative practice.",
        "Completion of interprofessional learning program in cultural safety and collaborative practice: Two reflective activities from the Ways of Knowing program: 1. Artifact and 150-word reflection on the cultural walk; 2. Submission of 500-word reflection on interprofessional learning and culturally safe practices following the interdisciplinary panel discussion. Minimum 1 hour for both activities.",
        "Apply 'cultural safety practice' and 'collaborative practice' in interprofessional contexts to support wellbeing."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor is met: core assessment includes criterion-referenced appraisal of the quality of work. PSYC90110's 'Evidence-based practice written assignment' (35%, hurdle) sits against the assessed outcome of evaluating the scientific evidence base underlying efficacy claims; PSYC90031 assesses critical evaluation of the empirical status of competing models; PSYC90009 assesses appraisal of one's own knowledge and its impact on clinical effectiveness. Not level 3: no assessment description in the extract requires students to document and justify reliance decisions — nothing about relying on or overriding a tool, source or collaborator, and no AI-output quality judgement anywhere. The eJournal and the case-study 'outcome monitoring' are the only candidates for the process-focused route and neither assessment description states that strategy adjustment over time is what is assessed, so the ambiguity resolves down.",
      "evidenceLines": [
        "Evidence-based practice written assignment",
        "Evaluate the scientific evidence base underlying claims of efficacy for psychological assessment tools and psychological intervention techniques;",
        "Critically evaluate the empirical status of the dominant psychological models explaining the aetiology and maintenance of the major mental disorders.",
        "Appraisal of their own knowledge of diversity and reflect on its impact on their clinical effectiveness.",
        "Oral presentation: Role play interview task and short written self‐reflection (5 minute presentation and 300 word report)",
        "eJournal, short diary entries (150 words each)",
        "Written report of an independent single case study relevant to professional practice including assessment, case formulation, literature review, tailored intervention, and outcome monitoring"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Not level 0 — digital content is present in core units: statistical software for model-fitting in PSYC40005, and telehealth service delivery training in PSYC90116 with an assessed written report (15%). But every instance is tool operation/training, the operational level the anchor caps at 1. Not level 2: no core unit in the extract addresses AI capabilities AND limitations/ethics — the word 'AI' and any generative-AI content are absent from the whole extract, and the telehealth report's description says only that it addresses 'aspects of' delivery, with no documented treatment of limits. The Ethics subject's privacy and legal-framework content attaches to research and professional conduct, not to digital or AI systems, so it does not lift the item.",
      "evidenceLines": [
        "the use of statistical software for model-fitting",
        "They will also receive training in the delivery of psychology services via telehealth modalities.",
        "Written report- addressing aspects of telehealth delivery of psychological services",
        "Identify the principles underlying the delivery of psychology services via telehealth modalities;",
        "Ethical and appropriate behaviour in research and professional contexts with reference to the Australian Psychological Society Code of Ethics, NHMRC National Statement on Ethical Conduct in Human Research and current legal frameworks relating to privacy and human rights;"
      ]
    },
    "C4": {
      "score": 3,
      "rationale": "Level 3 anchor is met by the self-scoped research-project route, with assessment evidence as R2 requires: PSYC90112 is a compulsory 25-point year-long subject in which the student investigates a substantive individual research question of their own choosing, and the assessment sequence opens with a student-written proposal (pass/fail hurdle) before the 6000-word report. The course structure documents the progression requirement explicitly (compulsory sequence, first-year achievement gating second year). Level 2 is independently satisfied by assessments on unseen case material, so the level-3 finding rests on the required self-scoped project rather than on transfer alone. Placement evidence is excluded from C4 by the one-construct-one-home rule.",
      "evidenceLines": [
        "Investigate a substantive individual research question relevant to the discipline of psychology",
        "Written research proposal (Pass/fail)",
        "Written research report",
        "The research thesis provides students the opportunity to explore a question that is relevant to contemporary psychological practice.",
        "All subjects are compulsory and must be taken in sequence as the knowledge gained in one group of subjects will enable satisfactory completion of the next group of subjects.",
        "Case Formulation: Development of a clinical case formulation, based on case material provided.",
        "Problem-identification and problem-solving in novel contexts",
        "The ability to work independently to organise time effectively to meet complex task demands and deadlines"
      ]
    },
    "C5": {
      "score": 2,
      "rationale": "Level 2 anchor is met: students design and conduct an inquiry with methodology selection and data collection, assessed — 'Written literature review and research method' (25%) assesses methodology selection, and the project is executed and its findings analysed and reported. Not level 3: the anchor requires a substantial project GENERATING PRIMARY EVIDENCE, and the extract does not document that primary data collection is required — the subject states only that the project 'can draw from a range of methodologies', which leaves a secondary-data or review project open. The staged proposal → method → oral presentation → report sequence under academic supervision would satisfy the 'defended under scrutiny' half, so the item straddles 2 and 3 on the primary-evidence condition alone and resolves down.",
      "evidenceLines": [
        "This course consists of coursework, placement and a minor research thesis (6,000 words).",
        "The project can draw from a range of methodologies relevant to developing evidence-based research literacy in generalised psychological practice.",
        "Students will investigate a substantive individual research question under appropriate academic supervision and submit the results of the research in the form of an oral presentation and written report.",
        "Written literature review and research method",
        "Oral presentation of research findings; 15‐Minutes (1,500 words equivalent)",
        "Employ relevant techniques to analyse and interpret the findings.",
        "Design research studies requiring complex quantitative observations;"
      ]
    },
    "adaptiveness": 10,
    "W1": {
      "score": 2,
      "rationale": "Level 2 anchor is squarely met and level 3 is not. Core assessment requires recognised professional genres and audiences beyond the teaching team: PSYC90113 (20-minute interview demonstration, hurdle, 30%; diagnostic work-up report), PSYC90114 (mental state examination oral demonstration plus written report; risk-assessment presentation plus report, 35%), PSYC90115 (test-administration demonstration to the standard of the PsyBA National Psychology Exam, hurdle) and PSYC90116 (simulated and actual patient case work under registered-psychologist supervision). The level-3 anchor is conjunctive and its third condition — professional conduct or accountability explicitly among the assessed criteria — is not documented: the extract publishes no marking criteria for any subject, and the 80-hour and 220-hour hurdles are volume-of-activity accrual requirements carrying UoM boilerplate hurdle text that attaches to nearly every assessment in the extract, including quizzes and the telehealth essay. Conditions (a) repeated, progressive professional communication and (b) a real external audience (simulated and actual patients) are documented, so the item does not fall below 2.",
      "evidenceLines": [
        "Oral presentation - demonstration of basic interview techniques (20 Minutes; 2,000 words equivalent)",
        "Hurdle requirement: Must participate in role play as interviewer",
        "10 minute oral demonstration, and 750 word written report of mental state examination.",
        "Oral presentation (10 minute demonstration) and 1500 word written report of risk assessment and rationale referencing established literature",
        "A small-group oral presentation focusing on clinical communication skills",
        "Interpreting and communicating assessment findings in oral and written formats, including formal psychological reports, using culturally appropriate language.",
        "Oral presentation - demonstration of competency in test administration",
        "Hurdle requirement: Submission of case work commensurate with 80 hours of client-related activity.",
        "Completion of simulated and actual patient case work - assessment, diagnosis and intervention planning (Pass/fail)",
        "they will also be given the opportunity to practice their skills with patients in a variety of clinical contexts under the supervision of a registered psychologist",
        "Ethical behaviour written assignment"
      ],
      "adjudication": {
        "originalScore": 3,
        "demotedTo": 2,
        "reason": "The W1 level-3 anchor is conjunctive and its third condition is not documented anywhere in the extract: 'with professional conduct or accountability explicitly among the assessed criteria.' A case-insensitive search of the full 2,289-line extract for 'criteria', 'professional conduct', 'professional behaviour', 'professionalism' and 'accountab' returns zero matches — the handbook publishes no marking criteria for any subject. The scorer substituted the hurdle text of the 80-hour and 220-hour case-work items, but those hurdles are UoM boilerplate ('For the purposes of meeting this hurdle requirement, each submitted assessment must be complete and constitute a genuine attempt to address the requirements of the task') attached to nearly every assessment in the extract, including online quizzes and a telehealth essay; the 80/220 hours are a volume-of-activity accrual requirement, not an assessed conduct or accountability criterion. The scorer itself recorded this gap in notScoreable and then scored 3, which resolves an acknowledged ambiguity upward against the stated rule and fails R3 for a level-3 claim. Conditions (a) and (b) are genuinely documented in assessment tables, so the item does not fall below 2."
      }
    },
    "W2": {
      "score": 3,
      "rationale": "Level 3 anchor is met on both limbs, scored on documented task features only (R4 — no 'authentic'/'real-world' label was relied on). Spine: the practitioner artefact — a case formulation and the intervention or treatment plan that follows from it — is assessed in at least one core subject per stage: PSYC90110 (behaviour-change and assessment-skills assignment) in Year 1 Sem 1; PSYC90113 (diagnostic work-up of case study) in Sem 2; PSYC90011 and PSYC90114 (mental state examination report; diagnosis and case formulation report) in the Year 2 summer/January block; PSYC90023, PSYC90007, PSYC90010 and PSYC90009 (case formulation plus intervention plan, clinical case formulation plus treatment plan, case-based assignment) in Year 2 Sem 1; and the single-case-study report in Sem 2. Genuine constraint of practice: the problems are externally supplied ('based on case material provided'), and the standard applied is the profession's own — the course trains to the PsyBA core competencies and PSYC90115 requires demonstrated competency in administering and scoring the tests covered in the PsyBA National Psychology Exam. Workplace immersion itself is not counted here; it scores in W3.",
      "evidenceLines": [
        "Case Formulation: Development of a clinical case formulation, based on case material provided.",
        "Intervention Plan (written): Development of a clinical case formulation and an ensuing intervention plan, based on case material provided.",
        "Written clinical case formulation",
        "A written treatment plan",
        "Written report - diagnostic work up of case study",
        "Written report demonstrating determination of psychological diagnosis and case formulation",
        "A written case-based assignment",
        "A written protocol of techniques to enhance wellbeing when working therapeutically with a client",
        "The Master of Professional Psychology provides selected psychology graduates with training in the skills required to meet the core competencies outlined by the Psychology Board of Australia (PsyBA) as necessary to practice as a generalist psychologist.",
        "They will demonstrate competency in administration and scoring of key psychological tests covered in the Psychology Board of Australia National Psychology Exam."
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Level 2 anchor is met: PSYC90116 is a core 25-point subject in which students practise with patients in clinical contexts under the supervision of a registered psychologist, assessed as a 60% pass/fail component. Not level 3: the construct excludes simulation, and the extract's own description of the 300 hours is 'a mix of simulation, role-play and direct client work' without quantifying the direct-client share — PSYC90115's 80 hours are stated to be simulated patient work outright, and PSYC90116's 220 hours are 'simulated and actual' undivided, so the extent of genuine work-situated learning is not documented as extended. The remaining level-3 elements are also thin: accountability appears as hours-of-case-work hurdles rather than accountability to a host, and structured reflection on professional practice appears only as a subject learning outcome, never as an assessed reflective task in either placement subject. Ambiguity between 2 and 3 resolves down.",
      "evidenceLines": [
        "Students will also complete 300 hours of practical placement over the duration of the course.",
        "The placement experience will constitute a mix of simulation, role-play and direct client work, giving students the opportunity to consolidate their specialist training and apply the knowledge gained in the course to real world scenarios.",
        "Students will accrue placement hours by engaging in simulated patient work.",
        "they will also be given the opportunity to practice their skills with patients in a variety of clinical contexts under the supervision of a registered psychologist",
        "Completion of simulated and actual patient case work - assessment, diagnosis and intervention planning (Pass/fail)",
        "Principal Supervisor: Lisa Catania",
        "Evaluate the effectiveness of their professional practice, identifying areas for improvement and implementing changes where needed."
      ]
    },
    "workplace": 7,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "An all-compulsory specialist core taken in a mandated sequence with a staged progression rule, plus an accredited pathway — every one of the three PASS routes the gate names. No generic or interchangeable content.",
        "evidenceLines": [
          "All subjects are compulsory and must be taken in sequence as the knowledge gained in one group of subjects will enable satisfactory completion of the next group of subjects.",
          "This program is accredited by Australian Psychology Accreditation Council (APAC).",
          "All subjects are compulsory and satisfactory achievement of subjects in the first year of the course is required prior to progression to the second year.",
          "This subject builds upon content and skills learned in PSYC90113 Professional Psychology Skills 1."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "Assessment requires defended trade-off decisions rather than recall or scripted response: intervention and treatment plans must be justified from a case formulation, the risk-assessment task requires a written rationale referenced to established literature, and the patient case-work component requires assessment, diagnosis and intervention planning under real clinical uncertainty. The assessed outcomes make the trade-off explicit — determining when more complex interventions are appropriate, and modifying interventions as the formulation evolves.",
        "evidenceLines": [
          "Oral presentation (10 minute demonstration) and 1500 word written report of risk assessment and rationale referencing established literature",
          "Intervention Plan (written): Development of a clinical case formulation and an ensuing intervention plan, based on case material provided.",
          "Describe brief interventions that are appropriate to particular clients' needs and determine when more complex interventions are appropriate.",
          "Apply knowledge to monitor client outcomes, identify barriers to treatment progress and modify interventions on the basis of an evolving case formulation and inter and intrapersonal changes.",
          "Completion of simulated and actual patient case work - assessment, diagnosis and intervention planning (Pass/fail)"
        ]
      }
    },
    "ambiguities": [
      "C1 straddled 1 and 2: the Ways of Knowing component is weighted 0% and what is submitted is a reflection on interprofessional learning rather than an appraisal of collaborative work itself. Resolved to 2 rather than down because level 1's anchor ('no core unit assesses it') is falsified by the component appearing in the assessment table under a hurdle requirement — the levels are not both consistent with the evidence.",
      "C2 straddled 2 and 3 on the process-focused route: PSYC90111's eJournal runs throughout the semester alongside a subject description about using techniques and evaluating their efficacy, and PSYC90116's case-study report includes outcome monitoring. Resolved DOWN to 2 under the never-resolve-upward rule, because neither assessment description states that documenting reliance decisions or strategy adjustment over time is what is assessed; the supporting text is subject description, not assessment specification.",
      "C3 straddled 1 and 2: the assessed telehealth report might in practice cover the limits and ethics of the modality, but its description says only 'aspects of telehealth delivery'. Resolved DOWN to 1 — the anchor requires limitations/ethics to be addressed and assessed, and that is not documented.",
      "C5 straddled 2 and 3: the staged proposal → method → oral presentation → supervised report sequence would satisfy 'methodology defended under scrutiny', but whether primary evidence is generated is not documented ('can draw from a range of methodologies'). Resolved DOWN to 2 on the primary-evidence condition.",
      "W1 was scored 3 at first pass and demoted to 2 on adversarial review: the level-3 anchor's third condition — professional conduct or accountability explicitly among the assessed criteria — rests on marking criteria the handbook never publishes, and the 80/220-hour hurdles are volume-of-activity accruals carrying boilerplate hurdle text found across the whole extract. Resolved DOWN per the scoring-direction rule.",
      "W3 straddled 2 and 3: 300 required placement hours across two compulsory core subjects with a registered-psychologist supervisor looks extended, but simulation is excluded from W3 by construct and the extract never separates simulated from actual client hours. Resolved DOWN to 2.",
      "W1 and W3 both draw on the two placement subjects. This is not double counting under the one-construct-one-home rule, which bars placement evidence from C1 and C4 only: W1 scores the patient/simulated-patient audience and the professional genres, W3 scores the immersion itself. The W1 anchors name 'patient or simulated patient' as a qualifying audience, so the anchors license the split.",
      "W2 and W3 were kept separate as the construct requires: the simulated case work and role-plays score as task fidelity in W2 and are explicitly excluded from W3."
    ],
    "notScoreable": [
      "C3 — AI-specific evidence is entirely absent from the extract. No core subject description, learning outcome, assessment task or program-level outcome mentions artificial intelligence or generative AI, so C3 was scored on the digital-tools half of the anchor only. The item is scoreable at level 1 on that basis, but the AI-governance content the level-3 anchor asks for cannot be confirmed present or absent from a handbook extract of this scope.",
      "W1 level-3 condition (c) — the extract never states the marking criteria of any assessment. A case-insensitive search of the full extract for 'criteria', 'professional conduct', 'professional behaviour', 'professionalism' and 'accountab' returns nothing, so whether professional conduct sits among the assessed criteria cannot be established from a handbook extract of this scope. The item was held at 2 rather than credited at 3 on undocumented grounds."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-15"
    }
  },
  "mc-scibit": {
    "instrument": "4.1-draft",
    "C1": {
      "score": 2,
      "rationale": "Level 2 anchor is satisfied several times over: core units assess collaborative practice with individual accountability (SKIL90004 group charter and group presentation with per-student Q&A, SCIE90034 group digital folio, SCIE90015 group charter agreement negotiated with an industry partner, SCIE90011 group written reports at 700 words per student). Level 3 is not reached: it requires, on top of recurrence, at least one assessment in which coordinating work across people AND tools/AI systems is itself assessed — a documented role AND tool allocation, or an assessed division of work between people and systems. No core assessment line in the extract allocates or assesses work across tools or AI systems; the group tasks allocate word counts and roles between people only, and the only tool-based task in the core (SKIL90004's project-management software assignment) is individual and scored under C3. Placement/industry-immersion evidence is deliberately not counted here — it scores in W3 per the v4.1 migration note.",
      "evidenceLines": [
        "Group Charter Agreement (4 students per group) with Industry Partner as to project specifications (250 words per person)",
        "A group assignment (5-6 per group, with a 10 minute oral presentation of the project outcomes involving all students in the group (15%) and 2 min Q&A per student (5%)",
        "A digital folio produced as a group (3-4 students) comprising at least three different communication outputs required for an international project",
        "Group written report (Groups of 5) - 700 words per student",
        "Demonstrate high-level communication and effective teamwork skills in a professional context."
      ]
    },
    "C2": {
      "score": 2,
      "rationale": "Level 2 anchor — criterion-referenced appraisal of quality in core assessment — is met by SCIE90034 Communicating Science at Work, where peer review of a classmate's technical communication is both weighted (part of a 25% task) and a hurdle, and where giving peer feedback is an explicitly marked participation criterion. Level 3 requires assessment that makes students document and justify reliance decisions (when they relied on or overrode a tool, source or collaborator), defend judgements of AI-output quality, or evidence strategy adjustment over time. The two closest candidates fall short on their documented wording: the group-folio hurdle requires reflection on one's own contribution, not a reliance decision or a tracked strategy adjustment; and the Industry Project 'Health Check' report is described only by title and length, with nothing in the extract stating that it requires documented adjustment of approach. Evidence consistent with both 2 and 3 is resolved down.",
      "evidenceLines": [
        "Written assignment communicating technical information to different audiences. Initial submission for peer review due week 5, final submission due week 8",
        "Hurdle requirement: Satisfactory participation/submission of a peer review is a hurdle requirement",
        "Attendance and participation during class including giving peer feedback 10%. To receive the full 10 marks, students must attend 80% of classes and participate in activities including speaking to the class, role plays and giving feedback to classmates.",
        "critically and professionally give and receive feedback in order to improve the effectiveness and impact of communication;",
        "Hurdle requirement: Students must document and reflect on their individual contribution to the group folio",
        "Project \"Health Check\" Individual Report"
      ]
    },
    "C3": {
      "score": 1,
      "rationale": "Above level 0 — digital content is documented in core units — but capped at level 1, which is the anchor for tool operation/training. What the core documents is operating software: competence in a major statistical computing package (MAST90072), an individual assignment applying skills in computerised project-management tools (SKIL90004), and an outcome-level awareness of appropriate communication technology (SCIE90034). Data-oriented content beyond that sits in the elective list (Data Science for Biologists, Genomics and Bioinformatics), which the level-1 anchor names explicitly. Level 2 requires core units to address AI capabilities AND limitations/ethics with use-with-limits assessed, and level 3 requires assessed critique or governance of AI systems in the discipline's context. The extract contains no mention of artificial intelligence, generative AI or machine learning anywhere — in any course outcome, subject overview, or assessment line — so neither higher anchor has any evidence to rest on.",
      "evidenceLines": [
        "Demonstrate competence in using major statistical computing package.",
        "An individual assignment applying skills in computerised project management tools requiring 20 hours of work",
        "demonstrate awareness of, and ability to use, appropriate communication technology; and",
        "Data Science for Biologists"
      ]
    },
    "C4": {
      "score": 2,
      "rationale": "Level 2 anchor met: core assessment requires application to novel, not-yet-taught problems. SCIE90011's first assessment task makes students run an ideation and screening process to their own product idea including problem definition, and its second requires a prototype and competitor analysis; MKTG90022's commercialisation plan requires students to work up an unfamiliar product across IP, competition, regulatory hurdles and market trends. Level 3 requires documented structured progression toward independent learning — a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them. The research project is not a required route (the course overview makes it a substitution available only to outstanding students and subject to supervisor availability), and self-direction appears only as a graduate attribute and as an unassessed communication-subject outcome about identifying strengths and areas for development — neither carries an assessed gap-plus-plan task. R2 forbids scoring an outcome statement at level 3.",
      "evidenceLines": [
        "AT1 is an ideation and screening process and the students need to describe their approach and results that will culminate in the development of a specific product idea, including problem definition. This will require about 20 hrs of work per student.",
        "AT3: The development of a commercialization plan requires the students to obtain a good understanding of the product and to analyse various aspects that impact commercialization, such as IP, competition, regulatory hurdles, market trends, etc. The report is the synthesis of a commercialization plan based on these findings. We expect each student to spend about 20 hours on this assignment.",
        "AT2 is the development of a sketch book prototype including a competitor analysis. Time commitment per student, about 20 hrs.",
        "Be critical and creative thinkers, with an aptitude for continued self-directed learning; be able to examine critically, synthesise and evaluate knowledge across a broad range of disciplines",
        "explore and reflect on personal communication skills in order to identify individual strengths and areas for development;"
      ]
    },
    "C5": {
      "score": 1,
      "rationale": "Above level 0 — the core includes a methods unit: MAST90072 covers the whole process of data collection, analysis and decision making, with an outcome about applying experimental design and data collection. That matches the level-1 anchor (introductory methods unit). Level 2 requires students to design AND conduct an inquiry with methodology selection and data collection, assessed. The only core assessment that could carry this is MAST90072's 'Project Report', whose handbook entry gives a title, a 1500-word length and a 30% weight and states nothing about methodology selection or data collection; the assessed inquiry work sits in electives (SCIE90002's group research proposal, SCIE90016/90028/90029). Evidence consistent with both 1 and 2 is resolved down. Level 3 fails on its own terms: the substantial primary-evidence project is explicitly one route among several, offered as a replacement for the Industry Project to outstanding students, and the extract documents no viva or defence under scrutiny.",
      "evidenceLines": [
        "This subject examines the whole process of data collection, analysis and decision making.",
        "Apply statistical techniques from experimental design and data collection to present a report to a possibly non-specialist audience;",
        "Project Report",
        "Outstanding students may replace the Industry Project with the Research Project, depending upon the availability of a suitable project and supervisor.",
        "Group research proposal (3-5 students per group; 2000 words total)"
      ]
    },
    "adaptiveness": 8,
    "W1": {
      "score": 2,
      "rationale": "Level 2 is clearly met and exceeded in part: core assessment requires recognised professional genres — an investor pitch delivered as a group video in MKTG90022, a professional biography suitable for social media or CV in SCIE90034 — and the Industry Project's final group presentation is assessed by the industry partner, an audience beyond the teaching team, at 15%. Professional communication also recurs across the program (SCIE90034's oral presentation, LAWS90003's group presentation, MGMT90171's group oral, SKIL90004's presentation with Q&A, then the Industry Project's progress and final presentations). Level 3 nonetheless fails on its third conjunct: it requires professional conduct or accountability to be explicitly among the assessed criteria. The extract's conduct-adjacent items are attendance and participation requirements (80% of classes; hurdle attendance at workshops), which are participation thresholds rather than stated professional-conduct criteria, and the industry-partner item names only 'group performance' without itemising criteria. Two of three conjuncts are documented and one is not, so the score resolves down.",
      "evidenceLines": [
        "Group video presentation (Investor pitch) in groups of 5-6 (about 2 minutes per student)",
        "Written professional biography suitable for social media or CV",
        "Industry Partner Assessment of group performance, via final group 20-minute presentation",
        "Individual oral presentation (equivalent 1000 words)",
        "apply clear and effective communication practices with a variety of audiences in workplace settings;",
        "Attendance at a minimum of six out of eight of workshops throughout the teaching period."
      ]
    },
    "W2": {
      "score": 2,
      "rationale": "Level 2 is squarely met and unrefuted: the Industry Project reproduces a professional task end to end — charter agreement, project plan and final report delivered to an external company on an industry-identified problem — and its 'Industry Partner Assessment of group performance, via final group 20-minute presentation' is the one core assessment in the extract judged against criteria drawn from practice. Level 3 fails on its first conjunct. 'Such tasks are the program's assessment spine' inherits level 2's full definition, including judgement against criteria drawn from practice, and exactly one core assessment documents that. Every scaffolding task otherwise relied on — SKIL90004's project charter, MKTG90022's commercialisation plan and investor pitch, SCIE90011's ideation task and sketchbook prototype — is a practitioner-shaped artefact marked by the teaching team against criteria the handbook never states, and none documents a real or externally supplied problem; the criterion situation is absent, which is what R4 exists to police. Supporting lines that are not assessment evidence were also discounted on verification: 'Students will be assigned to syndicate groups…' and the PMBOK sentence are subject-overview prose, and 'Create a plan for successfully satisfying the appropriate agency;' is a LAWS90003 intended learning outcome whose subject assesses only a 1000-word written article, a group presentation and a 2.5-hour exam — no regulatory-plan artefact exists, and R2 bars an outcome statement from carrying a level 3. Finally, the competing lower reading (core assessment weight dominated by exams and in-class tests: 50% exams in BTCH90010, MAST90072, LAWS90003 and SKIL90004; 60% in-class tests in MKTG90022; 40% exam plus 20% tests in SCIE90011) must be resolved down, not up. Workplace immersion itself is excluded here and scored in W3. Scored 2 on adversarial verification (demoted from 3).",
      "evidenceLines": [
        "Students will be assigned to syndicate groups to address a practical industry challenge/issue which has been identified by industry.",
        "Industry Partner Assessment of group performance, via final group 20-minute presentation",
        "A group written assignment on writing a project charter",
        "Group written assignment (Commercialization plan) in groups of 5-6 (700 words per student)",
        "Group Project Plan (4 students per group) - up to 1800 words plus appendices",
        "Final Group Report (4 students per group) - 4000 words (1000 words per student) plus appendices"
      ]
    },
    "W3": {
      "score": 2,
      "rationale": "Level 2 anchor met: a core unit (25 compulsory credit points, year long) places students with a real external business on a live client project, with accountability to the host through a charter agreement negotiated on project specifications and assessment by the industry partner. Level 3 requires substantial required work-situated learning — an extended placement or practicum, or a sequence of them. What the handbook documents is 'a specific time in the business setting' followed by regular contact, which reads as short and standing alone rather than as extended immersion or a sequence; supervision is described as 'the project supervisor', distinguished in the same sentence from the business, so practitioner supervision of the work is not documented; structured reflection on professional practice is not stated for either individual report; and the course overview allows outstanding students to substitute the Research Project, so the WIL is not unconditionally required. The only other work-situated option, the Science and Technology Internship, sits in the elective lists — the level-1 pattern. Evidence consistent with 2 and 3 is resolved down.",
      "evidenceLines": [
        "25 credit points of compulsory industry project subject",
        "On commencement of the project, students will be required to spend a specific time in the business setting and to then maintain regular contact with the business, as well as the project supervisor, across the duration of the subject.",
        "Industry Partner Assessment of group performance, via final group 20-minute presentation",
        "Final Individual Report, 3,500 words plus appendices",
        "Outstanding students may replace the Industry Project with the Research Project, depending upon the availability of a suitable project and supervisor.",
        "Science and Technology Internship"
      ]
    },
    "workplace": 6,
    "gates": {
      "G1": {
        "result": "PASS",
        "rationale": "The program documents an all-compulsory core of 100 credit points plus a 25-point compulsory industry project, a staged prerequisite chain (SKIL90004 mandated in the first Semester 2 and prerequisite to the year-two Industry Project), a floor of 25 credit points of Technical/Practical Science subjects, and professional accreditation with the National Professional Science Master's Association. The core is not interchangeable generic content: subjects are written to the discipline (Regulation of Biotechnology, Biotechnology Impacts in Society, From Lab to Life) and MAST90072 states outright that its examples and curriculum are designed for MC-SCIBIT students.",
        "evidenceLines": [
          "100 credit points of compulsory subjects",
          "25 credit points of compulsory industry project subject",
          "Important enrolment note: students are required to enrol in SKIL90004 Project Management in their first Semester 2, either as a start-year intake or mid-year intake student. SKIL90004 is a pre-requisite for SCIE90015 Industry Project in Biotechnology.",
          "A minimum of 25 credit points of Technical/Practical Science subjects",
          "National Professional Science Master’s Association (NPSMA)(http://www.npsma.org//)",
          "This subject is a core subject for Master of Biotechnology (MC-SCIBIT) and examples and curriculum are designed for MC-SCIBIT students."
        ]
      },
      "G2": {
        "result": "PASS",
        "rationale": "The gate's live-project route is satisfied directly: a year-long capstone on an industry-identified problem, assessed by the host, requires integrating evidence into solutions and appraising the project against broader organisational goals. Uncertainty is also named as content that assessments build on — regulatory case-study seminars are described as conveying the uncertainty encountered in product registration, project management assessment covers risk management, and leadership outcomes require identifying risks, uncertainty and opportunity. This is not recall or scripted response.",
        "evidenceLines": [
          "Integrate evidence, scientific knowledge and professional skills to develop effective solutions to industry-based problems;",
          "Appraise and critique an industry-based project and articulate its expected impact in the context of broader organisational goals; and",
          "The regulatory requirements of devices, drugs and foods will be examined by a series of case study focused seminars and workshops, providing an understanding of the time frame, rigor, effort, and uncertainty encountered throughout the process of product registration.",
          "Explain and apply key processes in project management including risk management;",
          "Identify risks, uncertainty and opportunity in a leadership context"
        ]
      }
    },
    "ambiguities": [
      "C1 — assessed collaboration recurs across the core, so the first half of the level-3 anchor holds; the human-plus-tool coordination half has no evidence. Conjunctive anchor unmet, resolved to 2.",
      "C2 — the Industry Project's 'Health Check' individual report and the group-folio reflection hurdle are each consistent with level-3 process-focused assessment (strategy adjustment / reliance decisions) or with mere self-report. Handbook wording states neither, so resolved down to 2.",
      "C3 — MAST90072's framing that reliable decisions require correctly collected and analysed data could be read as 'use with limits' (level 2), but the level-2 anchor names AI capabilities and limitations, and the extract has no AI content of any kind. Resolved to 1.",
      "C4 — the Industry Project could support level 2 as application to an unfamiliar problem, but 'one construct, one home' sends its workplace evidence to W3; level 2 is therefore carried by SCIE90011 and MKTG90022 instead. The negotiated Group Charter Agreement could be read as self-scoping toward level 3; the problem is supplied by industry, so this was not treated as a self-scoped capstone.",
      "C5 — MAST90072's 'Project Report' is consistent with an assessed designed inquiry (level 2) or with a written analysis of supplied data (level 1). The assessment entry states no methodology selection or data collection, so resolved to 1.",
      "W1 — level 3's external-practitioner conjunct is squarely met (industry partner assesses the final presentation at 15%) and recurrence is met, but 'professional conduct or accountability explicitly among the assessed criteria' rests only on attendance/participation thresholds. Two of three conjuncts documented, resolved to 2.",
      "W2 straddled 2 and 3 and was resolved DOWN to 2 on adversarial verification. First-pass scoring took the level-3 anchor's operational gloss (a capstone plus earlier scaffolding) as satisfied by SKIL90004's charter and PMBOK framing, MKTG90022's commercialisation plan and investor pitch, and SCIE90011's ideation and prototype tasks, feeding the year-long Industry Project. Verification found the spine conjunct unsupported: level 3 inherits level 2's requirement that tasks be judged against criteria drawn from practice, and only SCIE90015's industry-partner assessment documents that — the scaffolding tasks are practitioner-shaped artefacts marked by staff against unstated criteria on problems that are not externally supplied (R4). Three supporting lines were also not assessment evidence: two are subject-overview prose (the syndicate-groups sentence, the PMBOK sentence) and one is a LAWS90003 intended learning outcome whose subject assesses only an article, a presentation and an exam (R2). The competing lower reading that first-pass scoring noted — core assessment weight dominated by exams and in-class tests — was resolved upward against the scoring-direction rule and is now resolved down.",
      "W3 — the Industry Project is year-long and 25 points, which reads as substantial, but the workplace component itself is 'a specific time in the business setting' plus regular contact, stands alone rather than forming a sequence, and names no practitioner supervisor or structured reflection. Resolved down to 2.",
      "W1/W3 — the line 'Industry Partner Assessment of group performance, via final group 20-minute presentation' bears on both an external communication audience (W1) and accountability to the host (W3). It is the decisive level-2 evidence in neither: W1 rests on the investor pitch and professional biography, W3 on the compulsory placement in the business setting. After the W2 demotion the same line is also the sole documented practice-criteria assessment carrying W2's level 2; it is quoted in three items and the split of constructs is declared here rather than being scored three times for one construct."
    ],
    "notScoreable": [
      "No item was left unscoreable, but two evidence gaps constrained scoring. (1) C3: the extract contains no mention of artificial intelligence, generative AI or machine learning in any course outcome, subject overview or assessment entry, so the level-2 and level-3 anchors could not be tested against any evidence at all — the score of 1 reflects documented tool-operation content only, not a judgement that AI content is absent from teaching.",
      "(2) Several subjects named in the course structure have no subject or assessment page in the extract — including SCIE90017 Science and Technology Internship (relevant to W3's elective route) and SCIE90029 Biotechnology Research Project Part 2, whose assessment page only refers the reader to Part 1. All are electives, so no core-based score depended on them."
    ],
    "verified": {
      "adversarial": true,
      "mechanical": true,
      "date": "2026-08-15"
    }
  }
};

export const v4PanelCByCode = (code: string): V4PanelC | undefined =>
  V4_PANEL_C[code.toLowerCase()];
