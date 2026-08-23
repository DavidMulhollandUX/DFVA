/**
 * Generation manifest: maps each template under dfva/source/targets/ to its
 * output path (relative to the repo root). The generator resolves
 * {{rubricTable}}, {{riskBandsTable}}, {{thresholdQuestions}} and
 * {{> block:NAME}} includes inside each template.
 */
export interface Target {
  /** Path under dfva/source/targets/ */
  template: string
  /** Output path, relative to the repo root */
  output: string
}

// Only files that genuinely embed canonical content (and so are de-duplicated by
// the generator) are listed here. copilot-instructions.md is the umbrella DFVA
// system prompt that carries the full rubric/risk-bands/threshold tables; every
// other prompt file defers to it for the rubric, so they stay hand-authored.
// (The W1 audit flags any lean file that re-copies the instrument; add it here if so.)
export const TARGETS: Target[] = [
  { template: 'copilot-instructions.md.tmpl', output: '.github/copilot-instructions.md' },
  // Continue cannot auto-load copilot-instructions.md, so it keeps the bands inline —
  // tokenized via {{riskBandsList}} so they still derive from RISK_BANDS.
  { template: 'continue-dfva.md.tmpl', output: '.continue/prompts/dfva.md' },
  // The global ~/.claude/skills/dfva/SKILL.md runs standalone (no repo access), so it
  // keeps the instrument inline; generated here, then copied out by `npm run dfva:sync-skill`.
  { template: 'claude-skill/SKILL.md.tmpl', output: 'dfva/dist/claude-skill/SKILL.md' },
  // The report-review guidance is single-sourced in blocks/report-review.md and
  // emitted to every agent surface — the block is included by the copilot and
  // continue targets above, and this target carries the full Claude procedure.
  // Authoring agents are not all Claude; the rules must not be Claude-only.
  { template: 'report-review-skill/SKILL.md.tmpl', output: '.claude/skills/dfva-report-review/SKILL.md' },
  // Same skill, emitted again to the neutral .agents/skills/ path that Antigravity,
  // Codex and Goose read (the repo already keeps chief-of-staff and
  // v4-capture-routine there). Same SKILL.md + YAML frontmatter spec, so one
  // template serves both; only the location differs.
  { template: 'report-review-skill/SKILL.md.tmpl', output: '.agents/skills/dfva-report-review/SKILL.md' },
]
