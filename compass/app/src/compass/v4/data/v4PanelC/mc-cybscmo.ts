// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelC } from "../v4Meta";

const record: V4PanelC = {
  "instrument": "4.2-draft",
  "C1": {
    "score": 2,
    "rationale": "Level 2 anchor: 'At least one core unit assesses collaborative practice — group projects with individual accountability, client or stakeholder work, interprofessional activity.' ISYS90121 Cyber Security Practice, a compulsory Year 1 unit, assesses a client-facing 'consultation proposal' as a group task worth 50% of the subject. Level 3 additionally requires this to recur across the program AND require coordinating work across people AND tools/AI systems; no other core unit's assessment table documents assessed group work, and nothing documents division of labour between people and tools/AI systems, so it does not clear level 3.",
    "evidenceLines": [
      "Group written assignment (consultation proposal)",
      "2500 words (each)"
    ]
  },
  "C2": {
    "score": 2,
    "rationale": "Level 2 anchor: 'Core assessment includes criterion-referenced appraisal of quality: peer review, structured critique, portfolio with standards, marking against exemplars.' The Capstone pathway's ISYS90126 assesses an 'Individual reflective journal and peer analysis' (20%). Level 3 requires assessment documenting and justifying reliance decisions on a tool, source or collaborator, or defending AI-output-quality judgements, or evidencing strategy adjustment over time; none of that appears in the extract.",
    "evidenceLines": [
      "Individual reflective journal and peer analysis."
    ]
  },
  "C3": {
    "score": 2,
    "rationale": "Level 2 anchor: 'Core units address AI capabilities AND limitations/ethics; use with limits discussed and assessed.' ISYS90122 Security, Privacy and Ethics teaches cryptographic capabilities alongside ethical obligations, assessed via a scenario-analysis report (50%). COMP90098 Machine Learning and Security's ILOs and its assessed items are all programming-application tasks with no ethics/limits/governance content, so it alone would sit at level 1. Level 3 requires assessed critique or governance of AI systems beyond tool operation, which does not appear anywhere in the extract.",
    "evidenceLines": [
      "identify cryptographic technologies and how they can be deployed to protect information and preserve privacy;",
      "synthesise ethical obligations in a range of cyber security scenarios;",
      "Individual report on Scenario analysis plus 10-min oral presentation"
    ]
  },
  "C4": {
    "score": 3,
    "rationale": "Level 3 anchor: 'a self-scoped capstone or research project.' Both required pathway options are self-scoped capstone-style projects: the Research Pathway is explicitly 'a research-based project, giving a capstone experience,' and the Capstone Pathway is a student-designed 'in-depth investigation of a significant problem.' This anchor, unlike C5's, carries no 'not one route among several' qualifier, and the course structure requires completing one of the two self-scoped options.",
    "evidenceLines": [
      "The subject is a research-based project, giving a capstone experience and piece of scholarship to students that is suitable as a pathway to a PhD. This subject involves in-depth investigation of a significant problem related to cyber security.",
      "Individual project report due during week 7 of Cyber Security Research Project part B.",
      "Cyber Security Project involves in-depth investigation of a significant problem related to cyber security."
    ]
  },
  "C5": {
    "score": 2,
    "rationale": "Level 2 anchor: 'Students design and conduct an inquiry with methodology selection and data collection, assessed.' The Research Pathway requires developing and applying research methods, assessed through a hurdle-gated project report and defended presentation. That would otherwise satisfy level 3's 'defended under scrutiny,' but level 3 explicitly requires the project be 'REQUIRED (not one route among several)'; Research is only one of two compulsory-choice pathway options, so the item is capped at level 2.",
    "evidenceLines": [
      "develop and apply appropriate research methods to investigate a research question related to cyber security;",
      "Research presentation of 10 minutes ( 5 minutes presentation plus 5 minutes for questions). Due during part B.",
      "Hurdle requirement: A mark of at least 50% (35/70) must be obtained for the project report."
    ]
  },
  "adaptiveness": 11,
  "W1": {
    "score": 2,
    "rationale": "Level 2 anchor: 'At least one core assessment requires a recognised professional genre or an audience beyond the teaching team.' ISYS90121's group 'consultation proposal' and the Capstone pathway's 'Individual consulting report' are recognised consultancy genres. Level 3 additionally requires delivery to, or judgement by, a real external audience or practitioner; nothing in the extract documents an actual external client, panel or practitioner.",
    "evidenceLines": [
      "Group written assignment (consultation proposal)",
      "Individual consulting report."
    ]
  },
  "W2": {
    "score": 2,
    "rationale": "Demoted from level 3 on review. The level-3 'genuine constraint of practice' clause rested solely on 'Students will carry out a synthetic digital forensics investigation and will be required to defend their findings under simulated cross-examination...' (COMP90096). That line is verbatim but sits in the subject's Overview section (source line 410), not its Assessment table (lines 464-480: 'Individual investigation planning', 'Written assignment and oral presentation...', 'Final report on findings including individual reflection' — none mention cross-examination or defence). Level 3 requires the constraint to rest on assessment evidence; an outcome/overview statement is insufficient. With that quote excluded, no remaining cited item (ISYS90121 group task, ISYS90124 adversary-countermeasures task, ISYS90126 consulting report) documents a constraint beyond ordinary task realism, which is already covered by level 2's professional-artefact-spine anchor.",
    "evidenceLines": [
      "Adversary activity investigation and countermeasures recommendations",
      "Individual consulting report."
    ]
  },
  "W3": {
    "score": 0,
    "rationale": "Level 0 anchor: 'No work-integrated learning, placement, practicum or community-based project appears anywhere in the course structure.' The full compulsory subject list and pathway options are documented in the extract, and none of them, nor any subject overview or assessment section, documents a placement, practicum, live client project, community-based project, or assessed own-practice activity for an already-practising cohort.",
    "evidenceLines": [
      "The Master of Cyber Security requires the successful completion of 150 credit points",
      "125 credit points of compulsory subjects",
      "one 25 credit point core subject pathway"
    ]
  },
  "workplace": 4,
  "gates": {
    "G1": {
      "result": "PASS",
      "rationale": "PASS anchor: 'an all-compulsory specialist core.' 125 of 150 credit points are compulsory cyber-security subjects plus a compulsory-choice 25-point pathway, with the overview documenting progressive depth from foundational to advanced topics.",
      "evidenceLines": [
        "The Master of Cyber Security requires the successful completion of 150 credit points",
        "125 credit points of compulsory subjects",
        "Students are introduced to foundational subjects of cyber security that cover core concepts and principles of cyber security, programming, data analytics and data management, network and system security and software security. They progress to specific topics including digital forensics, web security, machine learning applications in security, and database systems and data modelling."
      ]
    },
    "G2": {
      "result": "PASS",
      "rationale": "PASS anchor: 'simulations/capstones/live projects with real uncertainty and accountability.' COMP90096 requires defending findings under simulated cross-examination; the Research Pathway's project report carries a pass/fail hurdle defended in Q&A; ISYS90124 assesses countermeasures against uncertain adversary behaviour.",
      "evidenceLines": [
        "Students will carry out a synthetic digital forensics investigation and will be required to defend their findings under simulated cross-examination, mimicking the role that digital forensics experts play as expert witnesses in legal jurisprudence.",
        "Hurdle requirement: A mark of at least 50% (35/70) must be obtained for the project report.",
        "Adversary activity investigation and countermeasures recommendations"
      ]
    }
  },
  "ambiguities": [
    "C1: the group 'consultation proposal' lists a word count '(each)', suggesting individual accountability, but this was not needed for level 2 and does not establish level-3 tool/AI coordination — resolved at level 2.",
    "C2: ISYS90121's assessed reflection on discussion-board contributions could be read as appraisal-of-quality evidence, but reads as participation reflection, not criterion-referenced appraisal — not relied on; ISYS90126's peer analysis was used instead.",
    "C3: whether ISYS90122's cryptography/privacy-ethics content (no explicit 'AI' framing) counts toward 'digital & AI literacy' was resolved using the anchor's own recurring 'AI or digital tools' wording.",
    "C5: the Research Pathway alone would satisfy level 3, but the anchor's 'REQUIRED (not one route among several)' clause caps the item at level 2 since Research is one of two compulsory-choice pathway options.",
    "C2, C4, C5, W1, W2: evidence drawn from the Capstone/Research Pathway subjects, a compulsory CHOICE rather than a single unit every student completes identically; where the anchor text made the choice-structure decisive (C5), that text resolved the score.",
    "ISYS90125 Software Security: the extract's isys90125/assessment page returns mislabeled duplicate content matching ISYS90126, apparently a capture artefact. No item score relies on it.",
    "W2: demoted from level 3 to level 2 on review — the 'genuine constraint of practice' quote for COMP90096 sits in the subject's Overview section, not its Assessment table, and level 3 requires the constraint to rest on assessment evidence."
  ],
  "notScoreable": [
    "ISYS90125 Software Security's own assessment table is not present in the extract (the isys90125/assessment URL returns mislabeled duplicate content) — could not be checked for additional evidence, though no item's score depends on it."
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
