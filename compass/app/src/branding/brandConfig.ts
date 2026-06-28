// Central brand strings — one place to evolve copy.
// Architecture: Evidura (platform) → Durability Rating (consumer signal) → DFVA (internal engine, not user-facing).
// See docs/evidura-brand-implementation-plan.md §3.1.
export const brand = {
  name: "Evidura",
  signalName: "Durability Rating",
  methodology: "DFVA", // internal only — never in marketing copy
  domain: "evidura.ai", // do NOT publish as canonical/OG pre trademark clearance
  tagline: "Durability, made visible.",
  legalNote: "A University of Melbourne prototype.",
} as const;
