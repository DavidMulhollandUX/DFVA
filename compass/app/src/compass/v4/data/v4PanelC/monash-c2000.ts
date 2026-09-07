// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "adaptiveness": 11,
  "workplace": 7,
  "gates": {
    "G1": {
      "result": "PASS",
      "rationale": "The Bachelor of Information Technology documents a coherent 144-point curriculum with 36 credit points of foundation/core studies, 12 credit points of client studio project, and an accredited major in information technology, structured with rigorous progression and ACS accreditation.",
      "evidenceLines": [
        "You must complete units as specified in Parts A, B and C (144 points): a minimum of 96 points of information technology study over Part A and Part B, and 48 points of free electives in part C.",
        "You must complete 36 credit points of core studies and 12 credit points of Applied studies units as applicable to your chosen major; or the industry-based learning placement (18 credit points)",
        "FIT1045 Introduction to programming",
        "FIT1047 Introduction to computer systems, networks and security",
        "FIT2094 Databases"
      ]
    },
    "G2": {
      "result": "PASS",
      "rationale": "Core assessment in systems development (FIT2001) and the year-long capstone client studio (FIT3047/FIT3048) requires substantial technical decision-making and implementation under client and methodological uncertainty.",
      "evidenceLines": [
        "Implement practical system development techniques at different levels of abstraction to a business problem within a contemporary development framework;",
        "Apply techniques to conduct analysis, design and implementation activities based on the specific context;",
        "In teams, you design, develop and deliver an IT applications for a client, manage the project through all its development stages, communicate effectively with all project stakeholders and develop project documentation to a professional standard."
      ]
    }
  },
  "C1": {
    "score": 2,
    "rationale": "Level 2 is met through the required industry experience studio sequence (FIT3047 and FIT3048) and professional practice (FIT1049). Students operate in development teams delivering an IT project for an external client with group deliverables weighted at 75% alongside individual reflective assessment (15%). Not level 3: collaboration does not explicitly assess human-AI work allocation or coordination across human and AI agents in the common degree core.",
    "evidenceLines": [
      "Operate effectively as a member of a development team;",
      "Team - Project Deliverables: 75%",
      "Individual - Reflection: 15%"
    ]
  },
  "C2": {
    "score": 2,
    "rationale": "Level 2 is met: structured self-assessment and reflective practice are assessed across core units, including individual reflections in FIT3047/FIT3048 (15%) and FIT1049 (Reflections: 5%, LO: systematically develop personal and professional reflections). Not level 3: the syllabus does not document criterion-referenced justification of AI or automated tool reliance decisions.",
    "evidenceLines": [
      "Evaluate, assess and communicate both personal and team progress and learning, thus engaging in meaningful reflective practice.",
      "Systematically develop and effectively communicate your personal and professional reflections to inform your current and future professional practice.",
      "Reflections: 5%"
    ]
  },
  "C3": {
    "score": 2,
    "rationale": "Level 2 is supported across the degree core: compulsory units explicitly teach and assess programming (FIT1045), computer systems, networks and security (FIT1047), and database management systems (FIT2094). Not level 3: critique, ethics, and governance of generative AI systems are not mandated in the common core, although accessible through specialised majors.",
    "evidenceLines": [
      "FIT1045 Introduction to programming",
      "FIT1047 Introduction to computer systems, networks and security",
      "FIT2094 Databases"
    ]
  },
  "C4": {
    "score": 3,
    "rationale": "Level 3 is sustained by core requirements in programming (FIT1045), relational database design (FIT2094), systems development (FIT2001), and the studio capstone (FIT3047/FIT3048), which demand multi-stage technical problem-solving, architectural abstractions, and empirical testing against authentic business requirements.",
    "evidenceLines": [
      "Implement practical system development techniques at different levels of abstraction to a business problem within a contemporary development framework;",
      "Apply techniques to conduct analysis, design and implementation activities based on the specific context;",
      "In teams, you design, develop and deliver an IT applications for a client, manage the project through all its development stages, communicate effectively with all project stakeholders and develop project documentation to a professional standard."
    ]
  },
  "C5": {
    "score": 2,
    "rationale": "Level 2 is met in FIT2002 IT Project Management, where students evaluate and apply adaptive and agile project management methodologies (Agile, Scrum) to modern IT projects, with adaptive project management specifically examined and assessed in class tests and projects.",
    "evidenceLines": [
      "Adaptive Project Management",
      "Analyse and evaluate predictive and adaptive project management methodologies, such as PMBOK, Agile and Scrum, and apply appropriate approaches to manage IT projects;"
    ]
  },
  "W1": {
    "score": 2,
    "rationale": "Level 2 is met: FIT1049 explicitly teaches and assesses professional communication in professional settings, ethical decision-making according to the ACS Code of Ethics, and legal frameworks.",
    "evidenceLines": [
      "Effectively plan, develop and deliver a range of professional communications using appropriate techniques, concepts and technologies;",
      "Understand how to make and justify decisions in various professional and organisational situations, by applying relevant professional ethics (e.g. the ACS Code of Ethics) and relevant legal frameworks;"
    ]
  },
  "W2": {
    "score": 3,
    "rationale": "Level 3 is met: the core degree capstone requires developing an authentic IT application for a real-world client over a full year (FIT3047 and FIT3048), with team project deliverables accounting for 75% of each unit grade, directly engaging with external stakeholders.",
    "evidenceLines": [
      "In teams, you design, develop and deliver an IT applications for a client, manage the project through all its development stages, communicate effectively with all project stakeholders and develop project documentation to a professional standard.",
      "Work with clients or client representatives, communicating effectively with them to meet their requirements;",
      "Team - Project Deliverables: 75%"
    ]
  },
  "W3": {
    "score": 2,
    "rationale": "Level 2 is met: the core studio sequence incorporates assessed work-based learning materials (10% in FIT3047 and FIT3048) in a client-facing studio simulation. Full 6-month industry immersion (FIT3045 Industry-Based Learning) is an elective/selective stream rather than compulsory for all students, capping common-core W3 at level 2.",
    "evidenceLines": [
      "Work-Based Learning Materials: 10%",
      "Work with clients or client representatives, communicating effectively with them to meet their requirements;",
      "FIT1049 IT professional practice"
    ]
  },
  "ambiguities": [
    "C1: The industry experience studio (FIT3047/FIT3048) has authentic team deliverables, but does not assess human/AI task division, resolving to level 2.",
    "C3: AI and machine learning units are available within data science and mobile apps electives/majors, but the common degree core addresses general computing systems and programming, resolving to level 2.",
    "W3: The Industry-Based Learning (IBL) placement program provides an 18-point corporate immersion, but entry is selective; the compulsory pathway is the client studio project, resolving to level 2."
  ]
};

export default record;
