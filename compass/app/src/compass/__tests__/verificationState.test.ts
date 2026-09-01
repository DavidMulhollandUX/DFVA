import { describe, expect, it } from "vitest";
import { V4_PANEL_C } from "../v4/data/v4PanelC";
import {
  verificationBody,
  verificationClause,
  verificationSummary,
} from "../v4/verificationState";

const BOTH = { adversarial: true, mechanical: true, date: "2026-08-14" };

describe("verification copy is derived, not asserted", () => {
  it("states both passes when both are recorded", () => {
    expect(verificationClause(BOTH)).toContain("reviewed adversarially");
    expect(verificationClause(BOTH)).toContain("verified against the source");
    expect(verificationSummary(BOTH)).toContain(
      "adversarial + verbatim verification passed",
    );
    expect(verificationBody(BOTH)).toContain("2026-08-14");
  });

  // The defect: an absent record used to drop the date and keep the claim.
  it("claims no verification when the record is absent", () => {
    for (const s of [
      verificationClause(undefined),
      verificationSummary(undefined),
      verificationBody(undefined),
    ]) {
      expect(s).not.toMatch(/verification passed/i);
      expect(s).not.toMatch(/was reviewed adversarially/i);
      expect(s).not.toMatch(/was verified to appear/i);
    }
    expect(verificationSummary(undefined)).toContain("not yet recorded");
    expect(verificationBody(undefined)).toContain("unverified");
  });

  it("names which pass holds when only one does", () => {
    const adv = { adversarial: true, mechanical: false, date: "2026-08-14" };
    const mech = { adversarial: false, mechanical: true, date: "2026-08-14" };
    expect(verificationSummary(adv)).toContain("not on record");
    expect(verificationSummary(mech)).toContain("not on record");
    expect(verificationClause(adv)).not.toContain(
      "verified against the source",
    );
    expect(verificationClause(mech)).not.toContain("reviewed adversarially");
    expect(verificationBody(adv)).toContain("verbatim evidence check");
  });

  it("says neither passed when the record holds two falses", () => {
    const none = { adversarial: false, mechanical: false, date: "2026-08-14" };
    expect(verificationSummary(none)).toContain("did not pass");
    expect(verificationBody(none)).toContain("unverified");
  });

  // The second defect: the pilot's capture profile was hardcoded on the shared
  // page. Captures run 7-47 pages and the record carries no count, so no page
  // figure may appear in this copy for any program.
  it("asserts no capture page count for any scored program", () => {
    const codes = Object.keys(V4_PANEL_C);
    expect(codes.length).toBeGreaterThan(50);
    for (const code of codes) {
      const body = verificationBody(V4_PANEL_C[code].verified);
      expect(body).not.toMatch(/\d+\s+pages/);
      expect(body).not.toMatch(/six compulsory|capstone routes/);
    }
  });
});
