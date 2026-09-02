import type { Quadrant } from "./data/v2Programs";

export interface QuadrantConfig {
  label: string;
  short: string;
  /** Hex used for SVG fills and inline accents. */
  hex: string;
  /** Tailwind classes for badge chips (light Evidura tints). */
  badgeClass: string;
  desc: string;
}

// Badge classes read the --color-position-* theme tokens declared in
// Main.css (@theme + :root/.dark), not literal hex — see the review-backlog
// Tier 2 item 18 note there for the light/dark values and the WCAG
// derivation of each *-ink shade (>=4.5:1 on its own tint).
export const QUADRANTS: Record<Quadrant, QuadrantConfig> = {
  "well-positioned": {
    label: "Well-positioned",
    short: "Well-positioned",
    hex: "#1F9D6B",
    badgeClass:
      "bg-position-well-positioned-tint text-position-well-positioned-ink",
    desc: "Exposed destinations with adaptive curriculum",
  },
  comfortable: {
    label: "Comfortable",
    short: "Comfortable",
    hex: "#3B82C4",
    badgeClass: "bg-position-comfortable-tint text-position-comfortable-ink",
    desc: "Lower-exposure destinations with adaptive curriculum",
  },
  attention: {
    label: "Attention: exposed, static curriculum",
    short: "Attention",
    hex: "#E9A23B",
    badgeClass: "bg-position-attention-tint text-position-attention-ink",
    desc: "Exposed destinations, static curriculum",
  },
  sheltered: {
    label: "Sheltered (for now)",
    short: "Sheltered",
    hex: "#8B6FC0",
    badgeClass: "bg-position-sheltered-tint text-position-sheltered-ink",
    desc: "Lower-exposure destinations, static curriculum",
  },
  "no-exposure": {
    label: "No JIR exposure data",
    short: "No data",
    hex: "#5C7088",
    badgeClass: "bg-muted text-muted-foreground",
    desc: "Awaiting destination mapping",
  },
};

export const DIMENSION_LABELS: Record<string, string> = {
  D2: "Systems Thinking",
  D3: "Technical Depth",
  D7: "Research Methods",
  B: "Irreplaceability",
  D5: "AI Literacy",
};
