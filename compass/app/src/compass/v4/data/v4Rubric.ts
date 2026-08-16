// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
export const V4_INSTRUMENT = "4.2-draft";

export const V4_ADAPTIVENESS_MAX = 15;
export const V4_WORKPLACE_MAX = 9;

export type V4Subscale = "adaptive" | "workplace";

export interface V4RubricItem {
  id: string;
  name: string;
  short: string;
  construct: string;
  subscale: V4Subscale;
  refs: number[];
  levels: [string, string, string, string];
}

export interface V4RubricGate {
  id: string;
  name: string;
  construct: string;
  pass: string;
  fail: string;
}

export interface V4Reference {
  n: number;
  citation: string;
  url: string | null;
}

export const V4_RUBRIC: V4RubricItem[] = [
  {
    "id": "C1",
    "name": "Distributed cognition & relational capability",
    "short": "Distributed",
    "construct": "How cognitive processes, information and tasks are shared across people, tools, artefacts and gen AI systems — teams, human–AI collaboration, coordinating roles and resources (TEQSA capability #2).",
    "subscale": "adaptive",
    "refs": [
      1,
      5,
      7
    ],
    "levels": [
      "No collaborative, stakeholder or team-based work is assessed anywhere in the core.",
      "Collaboration/teamwork appears in learning outcomes, but no core unit assesses it.",
      "At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity.",
      "Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people AND tools/AI systems — e.g. a team capstone with documented role and tool allocation, or a task where the division of work between people and systems is itself assessed."
    ]
  },
  {
    "id": "C2",
    "name": "Hybrid metacognition & evaluative judgement",
    "short": "Metacognition",
    "construct": "Regulation of thinking and learning within any cognitive system including human–AI networks — evaluative judgement, deciding when to rely on or override a tool, co-regulation, ethical reasoning about use (TEQSA capability #3).",
    "subscale": "adaptive",
    "refs": [
      1,
      4,
      3
    ],
    "levels": [
      "No assessment requires students to appraise the quality of work — their own, peers', or a tool's.",
      "Reflection or self-assessment appears in outcomes or graduate attributes, but no core unit assesses it against criteria.",
      "Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars.",
      "Assessment requires students to document and justify reliance decisions — when they relied on or overrode a tool, source or collaborator; defend judgements of AI-output quality; or evidence strategy adjustment over time (process-focused assessment)."
    ]
  },
  {
    "id": "C3",
    "name": "Digital & AI literacy, including governance",
    "short": "AI Literacy",
    "construct": "Using digital tools including gen AI effectively, ethically and safely — extended, per TEQSA, to critical understanding of principles, limitations, ethics, societal impact and power structures (TEQSA capability #1).",
    "subscale": "adaptive",
    "refs": [
      1,
      13,
      11,
      12,
      2
    ],
    "levels": [
      "No digital/AI content in any core unit or program-level outcome.",
      "AI or digital tools appear only as electives or as tool operation/training — the operational level TEQSA identifies as non-durable.",
      "Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed.",
      "Core assessment requires critique or governance of AI systems in the discipline's own context — bias, accountability, transparency, regulation or data governance — beyond tool operation."
    ]
  },
  {
    "id": "C4",
    "name": "Life-long learning & transfer",
    "short": "Transfer",
    "construct": "Sustaining motivation, capability and adaptability to learn continuously — identifying knowledge gaps, independently acquiring skills, transferring learning across tasks, domains and tools (TEQSA capability #4).",
    "subscale": "adaptive",
    "refs": [
      1,
      9,
      10,
      2
    ],
    "levels": [
      "Fixed content sequence; no assessment requires applying methods outside the taught context.",
      "Transfer is claimed in outcomes (\"apply knowledge in new settings\") but not assessed.",
      "At least one core assessment requires application to novel or unfamiliar problems — case variation, unseen datasets, cross-context projects.",
      "The program documents structured progression toward independent learning: a self-scoped capstone or research project, or assessed identification of one's own knowledge gaps together with the plan to close them."
    ]
  },
  {
    "id": "C5",
    "name": "Inquiry & evidence generation",
    "short": "Inquiry",
    "construct": "The capacity to generate primary evidence and defend methodology.",
    "subscale": "adaptive",
    "refs": [
      14,
      15,
      7
    ],
    "levels": [
      "Secondary synthesis only; no research-methods training.",
      "Introductory methods unit; literature-review assessment.",
      "Students design and conduct an inquiry with methodology selection and data collection, assessed.",
      "A substantial project generating primary evidence is REQUIRED (not one route among several), with methodology defended under scrutiny (viva, defence, or staged supervised review)."
    ]
  },
  {
    "id": "W1",
    "name": "Professional communication & conduct",
    "short": "Professional",
    "construct": "Communicating disciplinary work, and conducting oneself, as a professional with people who are not your examiner — the genres the profession actually uses, audiences beyond the teaching team, and assessed standards of reliability, ethics and accountability. Generic skills \"and their application in the context of the field(s) of education or disciplines involved\" (HESF cl. 1.4.2(b)–(c)).",
    "subscale": "workplace",
    "refs": [
      19,
      20,
      21,
      31,
      5,
      32
    ],
    "levels": [
      "All core assessment is in academic genres addressed to the marker (exams, essays, lab reports); no professional-genre or spoken communication is assessed.",
      "Communication or professional conduct appears in learning outcomes or graduate attributes; core assessment adds presentation to peers/staff, but no professional genre and no audience beyond the teaching team.",
      "At least one core assessment requires a recognised professional genre or an audience beyond the teaching team — client brief, consultancy or policy advice, clinical handover, pitch, public-facing artefact — judged against criteria drawn from professional practice.",
      "Professional communication is assessed repeatedly and progressively across the program AND at least one core assessment is delivered to, or judged by, a real external audience or practitioner (industry panel, client, patient or simulated patient, public exhibition), with professional conduct or accountability explicitly among the assessed criteria."
    ]
  },
  {
    "id": "W2",
    "name": "Authentic task design",
    "short": "Authentic",
    "construct": "How closely core assessment resembles the criterion situation of the discipline's own professional practice — the task, its context, the form of the result, and the criteria used to judge it (Gulikers et al. 2004), and its realism and cognitive challenge (Villarroel et al. 2018). Scored relative to the discipline's practice, never to a fixed exemplar. Explicitly EXCLUDES evaluative judgement, Villarroel's third dimension, which is C2.",
    "subscale": "workplace",
    "refs": [
      22,
      23,
      25,
      26,
      24
    ],
    "levels": [
      "Core assessment is entirely decontextualised — exams, problem sets and essays with no situational framing.",
      "Contextualised or scenario-framed tasks appear (case studies, worked scenarios), but the artefact produced and the criteria applied remain academic.",
      "At least one core assessment reproduces a professional task end to end: a real or realistic problem, producing the artefact a practitioner would produce, judged against criteria drawn from practice.",
      "Such tasks are the program's assessment spine rather than a single instance (a capstone plus earlier scaffolding, or at least one per stage) AND at least one carries a genuine constraint of practice — an ambiguous or externally supplied problem, real resource/time limits, a consequential audience, or the profession's own standards of performance."
    ]
  },
  {
    "id": "W3",
    "name": "Work-situated learning",
    "short": "Situated",
    "construct": "Extended, supervised, assessed participation in a real workplace or professional community — the \"deeper learning approach\" sense of placements: a high-impact practice (Kuh 2008) whose distinctive mechanism is membership and accountability in a community of practice, and with it pre-professional identity formation (Jackson 2016). For a cohort documented as already practising in the profession, that membership already exists, so the item scores the program’s documented use of it — assessed work-based learning in the student’s own practice (Lester & Costley 2010) — not its acquisition. Simulation is NOT scored here; it is W2.",
    "subscale": "workplace",
    "refs": [
      19,
      27,
      29,
      28,
      35,
      30
    ],
    "levels": [
      "No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure.",
      "Work-situated learning exists only as an elective, an optional internship, or an unassessed extracurricular or careers activity.",
      "A core unit places students in a real workplace or professional-community setting with practitioner supervision and assessment — placement, practicum, live client project, community-based project — OR, for a cohort documented as already practising in the profession, a core unit assesses activity conducted in the student's own professional practice with real recipients and a documented outcome measure — but it is short or stands alone.",
      "Substantial required work-situated learning: an extended placement or practicum, or a sequence of them, in the core, supervised by a practitioner, assessed, with accountability to the host and structured reflection on professional practice — OR, for a cohort documented as already practising, a required sequence of assessed own-practice activity with structured reflection and documented accountability to workplace stakeholders (trainees, patients, clients or employer)."
    ]
  }
];

export const V4_GATES: V4RubricGate[] = [
  {
    "id": "G1",
    "name": "Disciplinary foundation",
    "construct": "Deep disciplinary knowledge as the epistemic foundation for authentic judgement and expertise — TEQSA places it UNDER the four capabilities, not among them, and Deming & Noray (2020) show why it is a precondition rather than adaptiveness evidence (the applied-technical premium decays 44% → 14% between ages 24 and 35).",
    "pass": "The program documents a coherent specialist core with progressive technical or methodological depth: an all-compulsory specialist core, an accredited sequence, or a staged prerequisite chain.",
    "fail": "Generic or interchangeable content without disciplinary identity. A FAIL flags the program regardless of C1–C5."
  },
  {
    "id": "G2",
    "name": "Decision-making under uncertainty",
    "construct": "Assessment requires defended trade-offs under real constraints rather than scripted answers. Saturated as a scored item (62.1% modal) but still a meaningful floor.",
    "pass": "Assessments require defended trade-off decisions, or simulations/capstones/live projects with real uncertainty and accountability (v1 D4 ≥ 2).",
    "fail": "Recall or scripted responses only."
  }
];

export const V4_REFERENCES: V4Reference[] = [
  {
    "n": 1,
    "citation": "Lodge JM, de Barba P, Ainscough L, et al. (2026). Assuring quality learning in a gen AI-integrated future: The role of adaptive capabilities. TEQSA.",
    "url": "https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assuring-quality-learning-gen-ai-integrated-future-role-adaptive-capabilities"
  },
  {
    "n": 2,
    "citation": "Lodge JM, et al. (2025). Australian Framework for Artificial Intelligence in Higher Education. ACSES. (Principles 4 & 6.)",
    "url": "https://www.acses.edu.au/publication/australian-framework-for-artificial-intelligence-in-higher-education/"
  },
  {
    "n": 3,
    "citation": "Lodge JM, Howard S, Bearman M, Dawson P & Associates (2023). Assessment reform for the age of artificial intelligence. TEQSA.",
    "url": "https://www.teqsa.gov.au/sites/default/files/2023-09/assessment-reform-age-artificial-intelligence-discussion-paper.pdf"
  },
  {
    "n": 4,
    "citation": "Tai J, Ajjawi R, Boud D, Dawson P, Panadero E (2018). Developing evaluative judgement: enabling students to make decisions about the quality of work. Higher Education 76:467–481.",
    "url": "https://doi.org/10.1007/s10734-017-0220-3"
  },
  {
    "n": 5,
    "citation": "Deming DJ (2017). The growing importance of social skills in the labor market. Quarterly Journal of Economics 132(4):1593–1640.",
    "url": "https://doi.org/10.1093/qje/qjx022"
  },
  {
    "n": 6,
    "citation": "Deming DJ, Noray K (2020). Earnings dynamics, changing job skills, and STEM careers. Quarterly Journal of Economics 135(4):1965–2005.",
    "url": "https://doi.org/10.1093/qje/qjaa021"
  },
  {
    "n": 7,
    "citation": "Frey CB, Osborne MA (2017). The future of employment: how susceptible are jobs to computerisation? Technological Forecasting & Social Change 114:254–280.",
    "url": "https://doi.org/10.1016/j.techfore.2016.08.019"
  },
  {
    "n": 8,
    "citation": "Brynjolfsson E, Mitchell T, Rock D (2018). What can machines learn, and what does it mean for occupations and the economy? AEA Papers & Proceedings 108:43–47. (The SML rubric — the declarative-anchor form R1 copies.)",
    "url": "https://doi.org/10.1257/pandp.20181019"
  },
  {
    "n": 9,
    "citation": "Pellegrino JW, Hilton ML (eds) (2012). Education for Life and Work: Developing Transferable Knowledge and Skills in the 21st Century. National Research Council.",
    "url": "https://www.nationalacademies.org/read/13398/chapter/2"
  },
  {
    "n": 10,
    "citation": "Measuring adaptive expertise and adaptive performance in (becoming) healthcare professionals: a scoping review of measurement instruments (2025). Advances in Health Sciences Education.",
    "url": "https://doi.org/10.1007/s10459-025-10413-y"
  },
  {
    "n": 11,
    "citation": "Long D, Magerko B (2020). What is AI literacy? Competencies and design considerations. CHI 2020.",
    "url": "https://doi.org/10.1145/3313831.3376727"
  },
  {
    "n": 12,
    "citation": "UNESCO (2024). AI competency framework for students.",
    "url": "https://unesdoc.unesco.org/ark:/48223/pf0000391105"
  },
  {
    "n": 13,
    "citation": "European Commission JRC — DigComp (Digital Competence Framework for Citizens); basis of the Australian Digital Capability Framework (DEWR, 2022).",
    "url": null
  },
  {
    "n": 14,
    "citation": "Boyer EL (1990). Scholarship Reconsidered: Priorities of the Professoriate. Carnegie Foundation.",
    "url": null
  },
  {
    "n": 15,
    "citation": "Brew A (2006). Research and Teaching: Beyond the Divide. Palgrave Macmillan.",
    "url": null
  },
  {
    "n": 16,
    "citation": "Knight FH (1921). Risk, Uncertainty and Profit. Houghton Mifflin.",
    "url": null
  },
  {
    "n": 17,
    "citation": "Kane MT (2013). Validating the interpretations and uses of test scores. Journal of Educational Measurement 50(1):1–73. (The validity-argument frame for the v4 evidence plan.)",
    "url": null
  },
  {
    "n": 18,
    "citation": "Woods L, Lyons K, et al. (2026). Assessing the effectiveness of artificial intelligence education and training for healthcare workers: a systematic review. BMC Medical Education 26:549. (The construct-validity critique v4 answers.)",
    "url": "https://doi.org/10.1186/s12909-026-08969-3"
  },
  {
    "n": 19,
    "citation": "Higher Education Standards Framework (Threshold Standards) 2021, F2021L00488. Clause 1.4.2(b)–(d) (generic and employment-related learning outcomes, applied in disciplinary context), 1.4.3 (assessment must confirm the outcomes), 5.4.1 (work-integrated learning and placements are quality assured, including supervision).",
    "url": "https://www.legislation.gov.au/F2021L00488"
  },
  {
    "n": 20,
    "citation": "QILT Employer Satisfaction Survey (ESS) — national employer ratings across five graduate attribute domains: foundation, adaptive, collaborative, technical and employability skills. (2025 national results: technical 94.0%, foundation 93.3%, adaptive 90.7%, collaborative 88.6%, employability 86.2%.)",
    "url": "https://www.qilt.edu.au/surveys/employer-satisfaction-survey-%28ess%29"
  },
  {
    "n": 21,
    "citation": "Core Skills for Work Developmental Framework (Australian Government, 2013). Three clusters — navigate the world of work, interact with others, get the work done — over ten skill areas and five performance stages. Anchor-content source; a VET framework, not a higher-education construct authority.",
    "url": "https://www.dewr.gov.au/skills-information-training-providers/resources/core-skills-work-developmental-framework"
  },
  {
    "n": 22,
    "citation": "Gulikers JTM, Bastiaens TJ, Kirschner PA (2004). A five-dimensional framework for authentic assessment. Educational Technology Research and Development 52(3):67–86. (Task, physical context, social context, result/form, criteria; authenticity is a continuum defined against the criterion situation — design rule R4.)",
    "url": "https://doi.org/10.1007/BF02504676"
  },
  {
    "n": 23,
    "citation": "Villarroel V, Bloxham S, Bruna D, Bruna C, Herrera-Seda C (2018). Authentic assessment: creating a blueprint for course design. Assessment & Evaluation in Higher Education 43(5):840–854. (Realism, cognitive challenge, evaluative judgement — the third dimension is DFVA C2, not W2.)",
    "url": "https://doi.org/10.1080/02602938.2017.1412396"
  },
  {
    "n": 24,
    "citation": "Fawns T, Bearman M, Dawson P, Nieminen JH, Ashford-Rowe K, Willey K, Jensen LX, Damşa C, Press N (2024). Authentic assessment: from panacea to criticality. Assessment & Evaluation in Higher Education 50(3):396–408. (The label risks becoming a 'thought-terminating cliché' — the constraint behind R4.)",
    "url": "https://doi.org/10.1080/02602938.2024.2404634"
  },
  {
    "n": 25,
    "citation": "Sokhanvar Z, Salehi K, Sokhanvar F (2021). Advantages of authentic assessment for improving the learning experience and employability skills of higher education students: a systematic literature review. Studies in Educational Evaluation 70:101030. (26 studies, 2010–2019; outcomes largely student self-report.)",
    "url": "https://doi.org/10.1016/j.stueduc.2021.101030"
  },
  {
    "n": 26,
    "citation": "Gibbs G, Simpson C (2004). Conditions under which assessment supports students' learning. Learning and Teaching in Higher Education 1:3–31. (Assessment governs what and how students study — the mechanism warrant for scoring assessment design rather than curriculum statement.)",
    "url": null
  },
  {
    "n": 27,
    "citation": "Kuh GD (2008). High-Impact Educational Practices: What They Are, Who Has Access to Them, and Why They Matter. AAC&U. (Internships, capstones, undergraduate research, collaborative and community-based learning; shared features include sustained time and effort, feedback, and application in novel settings.)",
    "url": null
  },
  {
    "n": 28,
    "citation": "Jackson D, Collings D (2018). The influence of work-integrated learning and paid work during studies on graduate employment and underemployment. Higher Education 76:403–425. (WIL did NOT raise full-time employment rates; evidence for better relevance and quality of employment — the honest bound on the W3 claim.)",
    "url": "https://doi.org/10.1007/s10734-017-0216-z"
  },
  {
    "n": 29,
    "citation": "Jackson D (2016). Re-conceptualising graduate employability: the importance of pre-professional identity. Higher Education Research & Development 35(5):925–939. (Identity formed through participation in communities of practice — the mechanism distinguishing W3 from W2.)",
    "url": "https://doi.org/10.1080/07294360.2016.1139551"
  },
  {
    "n": 30,
    "citation": "Australian Universities Accord Final Report (2024), Department of Education. (WIL as national priority; placement poverty and the Commonwealth Prac Payment — the equity limitation declared against W3.)",
    "url": "https://www.education.gov.au/australian-universities-accord/resources/final-report"
  },
  {
    "n": 31,
    "citation": "NACE Career Readiness Competencies (rev. April 2024). Eight competencies: career & self-development, communication, critical thinking, equity & inclusion, leadership, professionalism, teamwork, technology.",
    "url": "https://www.naceweb.org/career-readiness/competencies/career-readiness-defined"
  },
  {
    "n": 32,
    "citation": "Heckman JJ, Stixrud J, Urzua S (2006). The effects of cognitive and noncognitive abilities on labor market outcomes and social behavior. Journal of Labor Economics 24(3):411–482.",
    "url": "https://doi.org/10.1086/504455"
  },
  {
    "n": 33,
    "citation": "Barrie SC (2006). Understanding what we mean by the generic attributes of graduates. Higher Education 51:215–241; and Barrie SC (2007), A conceptual framework for the teaching and learning of generic graduate attributes, Studies in Higher Education 32(4):439–458. (Stated graduate attributes are not evidence of attainment — why R2 binds hardest on W1.)",
    "url": null
  },
  {
    "n": 34,
    "citation": "Tomlinson M (2017). Forms of graduate capital and their relationship to graduate employability. Education + Training 59(4):338–352. (Scoping source: social, cultural and psychological capital are student and network properties, not curriculum properties, and are therefore out of scope.)",
    "url": null
  },
  {
    "n": 35,
    "citation": "Lester S, Costley C (2010). Work-based learning at higher education level: value, practice and critique. Studies in Higher Education 35(5):561–575. (Work-based learning in the learner's own employment as an established higher-education mode for in-practice cohorts — the warrant for W3's own-practice route, added in v4.2.)",
    "url": "https://doi.org/10.1080/03075070903216635"
  }
];
