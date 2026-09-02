import { describe, expect, it } from "vitest";
import { v4PortfolioRows } from "../v4/portfolioStats";

/** The landing hero renders one named program as its sample card (Hero.tsx
 *  SAMPLE_CODE). It must be a scored, placed v4 row or the card renders
 *  nothing and the most prominent number on the site disappears. */
const SAMPLE_CODE = "mc-jurisd";

describe("landing hero sample program", () => {
  it("is assessed on v4 with an exposure, an adaptiveness score and a position", () => {
    const row = v4PortfolioRows().find((r) => r.code === SAMPLE_CODE);
    expect(row).toBeDefined();
    expect(row?.assessed).toBe(true);
    expect(row?.exposure).not.toBeNull();
    expect(row?.adaptiveness).not.toBeNull();
    expect(row?.position).not.toBeNull();
    expect(row?.items).not.toBeNull();
  });
});
