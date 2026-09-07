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
      "rationale": "The Bachelor of Business comprises 144 credit points structured into core business foundations (accounting, finance, marketing, management, statistics, law, economics), an approved major, capstone studies, and electives, with rigorous progression.",
      "evidenceLines": [
        "You must complete units as specified in Parts A, B, C and D (144 credit points): including at least 96 credit points of study in Parts A, B, and C and up to 48 credit points of electives in Part D.",
        "ETF1100 Business statistics",
        "ACF1100 Introduction to financial accounting"
      ]
    },
    "G2": {
      "result": "PASS",
      "rationale": "Core quantitative and business curriculum requires decision-making under probabilistic uncertainty (ETF1100 random sampling and hypothesis testing) and organizational ambiguity (BEX3350 consulting deliverables).",
      "evidenceLines": [
        "apply the concept of random sampling to evaluate uncertainty in statistics and formulate hypothesis testing problems using business data for decision-making",
        "report on project deliverables and recommendations, providing a professional and coherent business solution that is evidence-based and context-specific"
      ]
    }
  },
  "C1": {
    "score": 2,
    "rationale": "Level 2 is met through team-based decision making in MGF1010 and BEX3350. In MGF1010 students develop teamwork and collaboration skills; in BEX3350 consulting teams deliver client projects with individual and peer contributions evaluated. Not level 3: human/AI division of labour is not explicitly assessed.",
    "evidenceLines": [
      "develop skills that demonstrate effective teamwork and communication",
      "evaluate individual and peer contributions (where applicable) to a consulting project, and reflect on personal and professional growth using feedback practices, digital tools and inclusive approaches that value diverse perspectives.",
      "3 - Project: 50%"
    ]
  },
  "C2": {
    "score": 2,
    "rationale": "Level 2 is met: structured peer evaluation and self-appraisal are assessed in BEX3350 (evaluating individual and peer contributions to consulting project deliverables). Not level 3: criterion-referenced justification of AI or automated tool reliance decisions is not documented in the degree core.",
    "evidenceLines": [
      "evaluate individual and peer contributions (where applicable) to a consulting project, and reflect on personal and professional growth using feedback practices, digital tools and inclusive approaches that value diverse perspectives.",
      "3 - Project: 50%"
    ]
  },
  "C3": {
    "score": 2,
    "rationale": "Level 2 is met across the core: ETF1100 teaches statistical data analysis, regression modeling, and spreadsheets. Not level 3: critique, ethics, and governance of AI are not compulsory in the common degree core, though offered in majors such as Business Analytics or Digital Economy.",
    "evidenceLines": [
      "ETF1100 Business statistics",
      "build the simple and multiple regression model in Excel and communicate the results in relevant business contexts, including in a team setting"
    ]
  },
  "C4": {
    "score": 3,
    "rationale": "Level 3 is sustained: compulsory studies in business statistics (ETF1100), accounting (ACF1100), and finance (BFF1001) demand multi-stage empirical problem solving, hypothesis testing, linear regression, and financial data analysis.",
    "evidenceLines": [
      "apply the concept of random sampling to evaluate uncertainty in statistics and formulate hypothesis testing problems using business data for decision-making",
      "build the simple and multiple regression model in Excel and communicate the results in relevant business contexts, including in a team setting"
    ]
  },
  "C5": {
    "score": 2,
    "rationale": "Level 2 is met: BEX3000 Professional development for business explicitly assesses career self-regulation, personal development, and lifelong learning capabilities.",
    "evidenceLines": [
      "BEX3000 Professional development for business"
    ]
  },
  "W1": {
    "score": 2,
    "rationale": "Level 2 is met: professional communication standards across stakeholder interaction points and ethical business conduct are explicitly taught and assessed in MGF1010, BTF1010, and BEX3350.",
    "evidenceLines": [
      "communicate evolving project insights, outputs and recommendations clearly and appropriately across various stakeholder interaction points by adopting professional communication standards"
    ]
  },
  "W2": {
    "score": 3,
    "rationale": "Level 3 is met: BEX3350 Consulting Project requires participating as consultants on an actual business project for an external organization, with 50% project deliverable assessing an authentic evidence-based business solution.",
    "evidenceLines": [
      "participating as consultants (with academic guidance) on an actual business or organisational project.",
      "report on project deliverables and recommendations, providing a professional and coherent business solution that is evidence-based and context-specific",
      "3 - Project: 50%"
    ]
  },
  "W3": {
    "score": 2,
    "rationale": "Level 2 is met: capstone studies require practical client-facing consulting engagement (BEX3350). Formal external industry placements (BEX3006) are an electable capstone stream rather than mandatory for all students, capping common-core W3 at level 2.",
    "evidenceLines": [
      "participating as consultants (with academic guidance) on an actual business or organisational project."
    ]
  },
  "ambiguities": [
    "C1: Teamwork in management and consulting is assessed with peer review, but does not assess human/AI collaboration division of labour, resolving to level 2.",
    "C3: Advanced AI and business analytics units exist in elective majors (e.g. Business Analytics and Statistics), but the common core is scored across general business statistics, resolving to level 2.",
    "W3: While formal internships (BEX3006) are offered in the capstone options, the minimum core requirement can be satisfied via consulting projects (BEX3350) or professional development (BEX3000), resolving to level 2."
  ]
};

export default record;
