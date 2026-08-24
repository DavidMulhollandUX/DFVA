import { describe, expect, it } from "vitest";
import { gateState, gateSummary } from "../v4/gateState";
import type { V4PanelC } from "../v4/data/v4PanelC";

const panelC = (G1: unknown, G2: unknown): V4PanelC =>
  ({ gates: { G1, G2 } }) as unknown as V4PanelC;

const gate = (result: "PASS" | "FAIL") => ({
  result,
  rationale: "",
  evidenceLines: [],
});

describe("gateState", () => {
  it("reads the two recorded outcomes", () => {
    expect(gateState(gate("PASS"))).toBe("met");
    expect(gateState(gate("FAIL"))).toBe("not-met");
  });
  it("does not resolve a missing or unreadable result into an outcome", () => {
    expect(gateState(undefined)).toBe("unrecorded");
    // The v4.2 scoring batch wrote `status` where the contract says `result`.
    expect(gateState({ status: "PASS" } as never)).toBe("unrecorded");
  });
});

describe("gateSummary", () => {
  it("names the gate, never its internal identifier", () => {
    const summary = gateSummary(panelC(gate("FAIL"), gate("PASS")));
    expect(summary).toBe("disciplinary foundation not met");
    expect(summary).not.toMatch(/G1|G2/);
  });
  it("reports both outcomes when they agree", () => {
    expect(gateSummary(panelC(gate("PASS"), gate("PASS")))).toBe(
      "every precondition met",
    );
    expect(gateSummary(panelC(gate("FAIL"), gate("FAIL")))).toBe(
      "no precondition met",
    );
  });
  it("says a precondition is unrecorded rather than met or not met", () => {
    expect(gateSummary(panelC(undefined, undefined))).toBe(
      "neither precondition recorded",
    );
    expect(gateSummary(panelC(gate("PASS"), undefined))).toBe(
      "decision-making under uncertainty not recorded",
    );
    expect(gateSummary(panelC(gate("FAIL"), undefined))).toBe(
      "disciplinary foundation not met and decision-making under uncertainty not recorded",
    );
  });
});
