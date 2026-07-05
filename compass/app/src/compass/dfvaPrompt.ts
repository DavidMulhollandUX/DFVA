// compass/app/src/compass/dfvaPrompt.ts
import type { HandbookPages } from "./llmScorer";

const RUBRIC = [
  {
    id: "D1",
    name: "Automation Exposure of Roles",
    levels: [
      "First 3-5 years mostly routine templated tasks",
      "Some judgment, mostly templated",
      "Mix of routine and non-routine work",
      "Judgment, design, accountability, or physical/relational skill from day one",
    ],
  },
  {
    id: "D2",
    name: "Systems Thinking and Problem Framing",
    levels: [
      "Tool/process execution only",
      "Mentioned but not assessed",
      "Dedicated units with authentic assessment",
      "Integrated throughout with trade-off reasoning and failure-mode analysis",
    ],
  },
  {
    id: "D3",
    name: "Technical and Quantitative Depth",
    levels: [
      "No meaningful rigour",
      "Intro stats or basic tooling",
      "Solid grounding in stats/data/coding/domain science",
      "Strong technical core embedded and assessed throughout",
    ],
  },
  {
    id: "D4",
    name: "Decision-Making Under Uncertainty",
    levels: [
      "Recall/scripted responses",
      "Some case work with scripted answers",
      "Assessments require defended trade-offs",
      "Simulations/capstones/live projects with real uncertainty and accountability",
    ],
  },
  {
    id: "D5",
    name: "AI Literacy and Governance",
    levels: [
      "No AI coverage",
      "AI appears in one elective",
      "AI tools used with limits discussed",
      "Graduates can design/deploy/supervise/critique AI workflows incl. ethics/governance",
    ],
  },
  {
    id: "D6",
    name: "Domain Depth and Specialisation",
    levels: [
      "Generic/interchangeable",
      "Mild specialisation",
      "Clear specialist domain focus",
      "Deep regulatory/scientific/clinical/physical expertise",
    ],
  },
  {
    id: "D7",
    name: "Research Methods Rigour",
    levels: [
      "Secondary summary only",
      "Intro research unit",
      "Can design and conduct research",
      "Routinely generate primary data and defend methods under scrutiny",
    ],
  },
  {
    id: "D8",
    name: "Human and Relational Capability",
    levels: [
      "No interpersonal/ethical/physical practice",
      "Ethics mention only",
      "Meaningful ethics or stakeholder practice",
      "Substantial clinical/care/interpersonal accountability or physical skill",
    ],
  },
  {
    id: "D9",
    name: "Curriculum Currency and Adaptability",
    levels: [
      "No review in 3+ years, no AI content",
      "Minor updates",
      "Major refresh in last 2 years, AI in core units",
      "Living curriculum with advisory feedback and outcome tracking",
    ],
  },
  {
    id: "D10",
    name: "Graduate Outcome Evidence",
    levels: [
      "No destination data",
      "Generic satisfaction data only",
      "Destination data published with partial detail",
      "Granular roles/industries/salary/time-to-employment data",
    ],
  },
  {
    id: "B",
    name: "Irreplaceability Premium (Bonus)",
    levels: [
      "Easily substituted",
      "One weak differentiator",
      "Clear dual-skill value",
      "Rare integration of technical depth, domain expertise, and human judgment",
    ],
  },
];

const RISK_BANDS = [
  { min: 28, max: 36, band: "RESILIENT" },
  { min: 20, max: 27, band: "MODERATE RISK" },
  { min: 12, max: 19, band: "HIGH RISK" },
  { min: 0, max: 11, band: "CRITICAL" },
];

export function buildDfvaPrompt(pages: HandbookPages): string {
  const rubricTable = RUBRIC.map(
    (d) =>
      `| ${d.id} | ${d.name} | ${d.levels[0]} | ${d.levels[1]} | ${d.levels[2]} | ${d.levels[3]} |`,
  ).join("\n");
  const bandsText = RISK_BANDS.map(
    (b) => `  - ${b.min}-${b.max} ${b.band}`,
  ).join("\n");

  return `You are the Degree Future-Viability Assessor (DFVA). Score this program against the 10+1 dimension rubric.

## PROGRAM INFORMATION
- Name: ${pages.programName}
- Code: ${pages.courseCode}
- Level: ${pages.level}
- Duration: ${pages.duration}

## HANDBOOK CONTENT
### Overview
${pages.overview}

### Course Structure
${pages.courseStructure}

### Learning Outcomes
${pages.attributes}

## DFVA RUBRIC (0-3 per dimension)
| # | Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|---|
${rubricTable}

## RISK BANDS
${bandsText}

## OUTPUT FORMAT (JSON only — no markdown, no explanation)
Return a JSON object with this exact structure:
{
  "score": <total 0-36>,
  "maxScore": 36,
  "riskBand": "RESILIENT" | "MODERATE RISK" | "HIGH RISK" | "CRITICAL",
  "dimensions": [
    { "label": "Dimension Name", "score": 0-3, "max": 3, "rationale": "specific evidence from the handbook" }
  ],
  "thresholds": {
    "q1": "YES" | "NO" | "UNCERTAIN",
    "q2": "YES" | "NO" | "UNCERTAIN",
    "q3": "YES" | "NO" | "UNCERTAIN"
  },
  "programName": "${pages.programName}",
  "courseCode": "${pages.courseCode}"
}

THRESHOLD QUESTIONS:
Q1: Could a well-prompted AI agent produce 80% of this graduate's first-two-year output?
Q2: Does this program train graduates to design systems, own decisions, or generate original insight?
Q3: Will these graduates be more employable in 5 years than today, given AI trends?

Ground every score in specific evidence from the handbook content above. Score honestly — do not inflate. Zero is a valid score where the handbook shows no evidence for a dimension.`;
}
