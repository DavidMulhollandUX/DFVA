import { joinList } from "./gateState";
import type { V4PanelC } from "./data/v4PanelC";

/**
 * Verification carries three states, not two — the same reason `gateState` does.
 * `verified` is optional on `V4PanelC`, and 17 of the 104 scored programs reach
 * the page without it. The page used to assert "the scoring was reviewed
 * adversarially and its quoted evidence verified against the source text" as
 * flat prose, letting `verified` supply only a date in brackets; an absent
 * record therefore dropped the date and kept the claim, publishing a
 * verification no one performed.
 *
 * The two passes are independent booleans, so a partial record must name which
 * one holds rather than round up to both.
 */
export type V4Verified = V4PanelC["verified"];

/** Names only the passes actually recorded. Empty when neither succeeded. */
function passes(v: NonNullable<V4Verified>): string[] {
  const out: string[] = [];
  if (v.adversarial) out.push("reviewed adversarially");
  if (v.mechanical)
    out.push("its quoted evidence verified against the source text");
  return out;
}

/** Sentence for the "How firm is this" card. */
export function verificationClause(v: V4Verified): string {
  if (!v) {
    return "Neither the adversarial review nor the verbatim evidence check is on record for this program yet";
  }
  const p = passes(v);
  if (p.length === 0) {
    return `Neither the adversarial review nor the verbatim evidence check passed (${v.date})`;
  }
  return `The scoring was ${joinList(p)} (${v.date})`;
}

/** Summary line for the scoring-integrity disclosure. */
export function verificationSummary(v: V4Verified): string {
  if (!v) return "Scoring integrity — verification not yet recorded";
  const parts: string[] = [];
  if (v.adversarial) parts.push("adversarial");
  if (v.mechanical) parts.push("verbatim");
  if (parts.length === 0) {
    return `Scoring integrity — verification did not pass (${v.date})`;
  }
  return parts.length === 2
    ? `Scoring integrity — adversarial + verbatim verification passed (${v.date})`
    : `Scoring integrity — ${parts[0]} verification passed; the other pass is not on record (${v.date})`;
}

/**
 * Opening of the scoring-integrity body. States what was checked against the
 * captured handbook text without describing the capture. The previous copy read
 * "(20 pages: the course, structure and attributes pages, the six compulsory
 * subjects, and two capstone routes with their assessment pages)" — the pilot
 * program's profile, hardcoded on the shared page. Real captures run 7 to 47
 * pages (median 35) and no scored program has a 20-page capture, so the figure
 * was false on every page that rendered it. The record carries no page count, so
 * none may be asserted here.
 */
export function verificationBody(v: V4Verified): string {
  if (!v) {
    return "The evidence passages shown on this page are quoted from the captured 2026 handbook text, but no verbatim check or adversarial review of this program's scoring has been recorded. Read the level-boundary judgements below as unverified.";
  }
  const clauses: string[] = [];
  if (v.mechanical)
    clauses.push(
      "each evidence passage shown on this page was verified to appear verbatim in the captured 2026 handbook text",
    );
  if (v.adversarial)
    clauses.push("each level-boundary judgement was reviewed adversarially");
  if (clauses.length === 0) {
    return `Neither verification pass succeeded for this program (${v.date}). Read the level-boundary judgements below as unverified.`;
  }
  const missing =
    clauses.length === 1
      ? ` The other pass — ${
          v.mechanical
            ? "adversarial review of the level-boundary judgements"
            : "the verbatim evidence check"
        } — is not on record.`
      : "";
  return `On ${v.date}, ${joinList(clauses)}.${missing} The judgements in which the evidence was consistent with two levels are recorded below:`;
}
