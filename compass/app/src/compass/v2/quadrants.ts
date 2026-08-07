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

export const QUADRANTS: Record<Quadrant, QuadrantConfig> = {
  "well-positioned": {
    label: "Well-positioned",
    short: "Well-positioned",
    hex: "#1F9D6B",
    badgeClass: "bg-[#E8F5EE] text-[#1F9D6B]",
    desc: "Exposed destinations with adaptive curriculum",
  },
  comfortable: {
    label: "Comfortable",
    short: "Comfortable",
    hex: "#3B82C4",
    badgeClass: "bg-[#E8F0FA] text-[#3B82C4]",
    desc: "Lower-exposure destinations with adaptive curriculum",
  },
  attention: {
    label: "Attention: exposed, static curriculum",
    short: "Attention",
    hex: "#E9A23B",
    badgeClass: "bg-[#FEF5E7] text-[#B97E26]",
    desc: "Exposed destinations, static curriculum",
  },
  sheltered: {
    label: "Sheltered (for now)",
    short: "Sheltered",
    hex: "#8B6FC0",
    badgeClass: "bg-[#F0ECF8] text-[#8B6FC0]",
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
