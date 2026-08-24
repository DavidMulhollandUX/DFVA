import { V4_GATES } from "./data/v4Rubric";
import type { V4GateResult, V4PanelC } from "./data/v4PanelC";

/**
 * A gate carries three states, not two. "unrecorded" exists because a record
 * can reach the page without a readable result — the page must then say so
 * rather than resolve the absence into either outcome, which would publish a
 * verdict no rater gave.
 */
export type GateState = "met" | "not-met" | "unrecorded";

export const gateState = (result: V4GateResult | undefined): GateState =>
  result?.result === "PASS"
    ? "met"
    : result?.result === "FAIL"
      ? "not-met"
      : "unrecorded";

/** "Digital & AI literacy" → "digital & AI literacy" — only the first
 * character, so an acronym inside the name survives. */
export const lowerFirst = (s: string): string =>
  s.charAt(0).toLowerCase() + s.slice(1);

export const joinList = (parts: string[]): string =>
  parts.length <= 1
    ? parts[0] ?? ""
    : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;

/**
 * The gate clause of the finding sentence. This used to read "with both gates
 * passed" as a literal, which was true of the pilot program and false the first
 * time a program with a failing gate reached the page. It names the gate rather
 * than its identifier: "G1" is an internal label and carries no meaning to a
 * reader of the report.
 */
export function gateSummary(r: V4PanelC): string {
  const named = (state: GateState) =>
    V4_GATES.filter(
      (g) => gateState(r.gates?.[g.id as "G1" | "G2"]) === state,
    ).map((g) => lowerFirst(g.name));
  const notMet = named("not-met");
  const unrecorded = named("unrecorded");
  const clauses: string[] = [];
  if (notMet.length === V4_GATES.length) clauses.push("no precondition met");
  else if (notMet.length > 0) clauses.push(`${joinList(notMet)} not met`);
  if (unrecorded.length === V4_GATES.length)
    clauses.push("neither precondition recorded");
  else if (unrecorded.length > 0)
    clauses.push(`${joinList(unrecorded)} not recorded`);
  if (clauses.length === 0) return "every precondition met";
  return joinList(clauses);
}
