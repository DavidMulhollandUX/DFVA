// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
export const V4_INSTRUMENT = "4.0-draft";

export interface V4RubricItem {
  id: string;
  name: string;
  short: string;
  construct: string;
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
    "refs": [
      1,
      5,
      7
    ],
    "levels": [
      "No collaborative, stakeholder or team-based work is assessed anywhere in the core.",
      "Collaboration/teamwork/communication appears in learning outcomes, but no core unit assesses it.",
      "At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity.",
      "Assessed collaborative practice recurs across the program AND at least one assessment requires coordinating work across people and tools/AI systems (e.g. team capstones with documented role/tool allocation, supervised placements with multidisciplinary accountability)."
    ]
  },
  {
    "id": "C2",
    "name": "Hybrid metacognition & evaluative judgement",
    "short": "Metacognition",
    "construct": "Regulation of thinking and learning within any cognitive system including human–AI networks — evaluative judgement, deciding when to rely on or override a tool, co-regulation, ethical reasoning about use (TEQSA capability #3).",
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
      "The program documents structured progression toward independent learning: self-scoped capstone or research project, assessed identification of one's own knowledge gaps, or work-integrated learning requiring performance in a context not taught."
    ]
  },
  {
    "id": "C5",
    "name": "Inquiry & evidence generation",
    "short": "Inquiry",
    "construct": "The capacity to generate primary evidence and defend methodology.",
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
  }
];
