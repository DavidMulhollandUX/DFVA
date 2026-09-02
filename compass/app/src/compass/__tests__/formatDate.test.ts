import { describe, expect, it } from "vitest";
import { formatDate } from "../formatDate";

describe("formatDate", () => {
  const iso = "2026-08-24T03:00:00.000Z";

  it("uses Australian day-month order", () => {
    expect(formatDate(iso, "long")).toBe("24 August 2026");
    expect(formatDate(iso)).toBe("24 Aug 2026");
    expect(formatDate(iso, "dayMonth")).toBe("24 Aug");
    expect(formatDate(iso, "monthYear")).toBe("Aug 2026");
  });

  it("accepts Date objects", () => {
    expect(formatDate(new Date(iso), "long")).toBe("24 August 2026");
  });

  it("returns the input when it does not parse", () => {
    expect(formatDate("not a date")).toBe("not a date");
  });
});
