/**
 * The five Panel C dimensions with their published 0–3 rating anchors.
 * Canonical source: dfva/source/rubric.ts (ids D2, D3, D5, D7, B) — keep the
 * texts in sync with it; the anchors are the same for every program.
 */
export interface PanelCDimension {
  id: string;
  name: string;
  definition: string;
  /** The 0/1/2/3 anchor text, in score order. */
  levels: [string, string, string, string];
}

export const PANEL_C_RUBRIC: Record<string, PanelCDimension> = {
  D2: {
    id: "D2",
    name: "Systems Thinking and Problem Framing",
    definition:
      "Whether the curriculum teaches hypothesis formation, constraint reasoning, and failure-mode analysis beyond template execution.",
    levels: [
      "Tool/process execution only",
      "Mentioned but not assessed",
      "Dedicated units with authentic assessment",
      "Integrated throughout with trade-off reasoning and failure-mode analysis",
    ],
  },
  D3: {
    id: "D3",
    name: "Technical and Quantitative Depth",
    definition:
      "Whether the program builds genuine depth in statistics, data, coding, or domain-specific technical competence.",
    levels: [
      "No meaningful rigour",
      "Intro stats or basic tooling",
      "Solid grounding in stats/data/coding/domain science",
      "Strong technical core embedded and assessed throughout",
    ],
  },
  D7: {
    id: "D7",
    name: "Research Methods Rigour",
    definition:
      "Whether graduates generate primary evidence and defend methodology, not only synthesize existing literature.",
    levels: [
      "Secondary summary only",
      "Intro research unit",
      "Can design and conduct research",
      "Routinely generate primary data and defend methods under scrutiny",
    ],
  },
  B: {
    id: "B",
    name: "Irreplaceability Premium",
    definition:
      "Whether the degree combines technical depth, specialist domain knowledge, and human judgment in a way that resists substitution.",
    levels: [
      "Easily substituted",
      "One weak differentiator",
      "Clear dual-skill value",
      "Rare integration of technical depth, domain expertise, and human judgment",
    ],
  },
  D5: {
    id: "D5",
    name: "AI Literacy and Governance",
    definition:
      "Whether graduates understand AI as a system with failure modes and governance needs, not just a tool to consume.",
    levels: [
      "No AI coverage",
      "AI appears in one elective",
      "AI tools used with limits discussed",
      "Graduates can design/deploy/supervise/critique AI workflows incl. ethics/governance",
    ],
  },
};
