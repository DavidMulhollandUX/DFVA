// Central brand strings — one place to evolve copy.
// Architecture: Evidura (platform) → Durability Assessment (confidential signal) → DFVA (internal engine, not user-facing).
// See docs/evidura-business-model.md (post-premortem revision).
export const brand = {
  name: "Evidura",
  signalName: "Durability Assessment", // was "Durability Rating" — post-premortem reframe
  methodology: "DFVA", // internal only — never in marketing copy
  domain: "evidura.ai", // do NOT publish as canonical/OG pre trademark clearance
  tagline: "Durability, made visible.",
  legalNote:
    "A University of Melbourne research project. Independence structure in development.",
  confidentialityNote:
    "All assessments are confidential to the commissioning institution. No program score is published without explicit consent.",
} as const;
