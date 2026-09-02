import { V4_INSTRUMENT } from "../compass/v4/data/v4Rubric";

// Central brand strings — one place to evolve copy.
// Architecture: Evidura (platform) → Durability Assessment (confidential signal) → DFVA (internal engine, not user-facing).
// See docs/evidura-business-model.md (post-premortem revision).
export const brand = {
  name: "Evidura",
  signalName: "Durability Assessment", // was "Durability Rating" — post-premortem reframe
  methodology: "DFVA", // internal only — never in marketing copy
  /** The institution whose programs the reports assess. Names the program's
   *  owner on report headers and sample cards; never describes Evidura. */
  institution: "University of Melbourne",
  domain: "evidura.ai", // do NOT publish as canonical/OG pre trademark clearance
  tagline: "Durability, made visible.",
  /** The current scoring instrument, for page copy ("Panel C 4.2-draft"). */
  instrumentLabel: `Panel C ${V4_INSTRUMENT}`,
  legalNote:
    "Independent of the institutions it assesses. Governance structure in development.",
  confidentialityNote:
    "All assessments are confidential to the commissioning institution. No program score is published without explicit consent.",
} as const;
