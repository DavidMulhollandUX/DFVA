import type { Prisma, PrismaClient } from "@prisma/client";

/**
 * Seed CourseLeaf Infrastructure Gap competitive intelligence data.
 * feat-014: third-party tool ecosystem as go-to-market evidence.
 *
 * Records the four independent infrastructure projects built around
 * CourseLeaf's API gap (University of Illinois Azure Function, APInception,
 * cc-coursemap scraper, UniPaith scraper) as demand-side proof of the
 * analytics gap — an opportunity signal, not a vendor threat.
 *
 * Run standalone (ESM-safe, no require.main footer):
 * cd compass/app && DATABASE_URL="postgresql://..." npx tsx -e "(async () => {
 *   const { seedCourseLeafInfrastructureGapResponse } = await import('./src/compass/seedCourseLeafInfrastructureGapResponse.ts');
 *   const { PrismaClient } = await import('@prisma/client');
 *   const prisma = new PrismaClient();
 *   await seedCourseLeafInfrastructureGapResponse(prisma);
 *   await prisma.\$disconnect();
 * })()"
 */

// ── CompetitiveEvent ────────────────────────────────────────────────────────
// impactScore: DB stores 1-5, code doubles for 2-10 display. 2 → 4/10
// (Low band / opportunity styling, same treatment as feat-018).
export const INFRASTRUCTURE_GAP_EVENT: Prisma.CompetitiveEventCreateInput = {
  competitor: "CourseLeaf",
  eventType: "ANNOUNCEMENT",
  title:
    "Third-Party Tool Ecosystem Builds Custom Infrastructure Around CourseLeaf",
  description:
    "CourseLeaf — the largest curriculum management platform at roughly 29% market share — has no adequate native API for the analytics its customers increasingly need, and the market has responded. Four independent infrastructure projects now exist around the gap: the University of Illinois built an Azure Function for basic data loading because no native export exists; APInception wraps the limited native API as a meta-API; cc-coursemap and UniPaith each maintain independent CourseLeaf scrapers for program and catalogue data. Four unrelated projects converging on the same workaround is demand-side proof: institutions want strategic analytics from curriculum data and are hand-building infrastructure to get it. Each custom build is fragile (scrapers break on upstream HTML changes) and single-purpose. DFVA offers these institutions the missing analytics layer as a structured, maintained alternative — skip the custom build, keep CourseLeaf for workflow.",
  source: "Third-party repository survey (research-loop GitHub intelligence)",
  url: "https://github.com/unimelb-mdap/cc-coursemap",
  dateOccurred: new Date("2026-07-09"),
  dateDiscovered: new Date("2026-07-09"),
  impactScore: 2,
  marketWindowEffect: "OPENING",
  isActive: true,
};

// ── MarketValidationSignals ─────────────────────────────────────────────────
// credibilityScore: DB stores 1-5. Map spec values: 9/8→5, 7→4, 6→3.
export const INFRASTRUCTURE_GAP_SIGNALS: Prisma.MarketValidationSignalCreateInput[] =
  [
    {
      // Signal 1: UniPaith — the second independent scraper
      source: "UniPaith repository (research-loop GitHub intelligence)",
      excerpt:
        "UniPaith maintains an independent CourseLeaf scraper for program and catalogue data extraction — the second dedicated scraper built for this purpose alongside cc-coursemap's. When two unrelated projects independently build extraction tooling for the same platform, the pain is systematic, not incidental: CourseLeaf provides no structured export for the data institutions need for analysis.",
      url: "https://github.com/unimelb-mdap/cc-coursemap",
      dateDiscovered: new Date("2026-07-09"),
      credibilityScore: 5,
      category: "competitor_weakness",
      relevantClaim:
        "A second independent CourseLeaf scraper confirms systematic extraction pain. Institutions needing programmatic access must build and maintain bespoke tooling — DFVA replaces that burden with a structured, schema-first assessment source.",
      isActive: true,
    },
    {
      // Signal 2: four-project ecosystem breadth
      source: "Cross-project ecosystem survey (research-loop GitHub intelligence)",
      excerpt:
        "Four independent infrastructure projects now exist around CourseLeaf's API gap: the University of Illinois built an Azure Function for basic data loading because no native export exists; APInception wraps the insufficient native API as a meta-API; cc-coursemap and UniPaith each maintain their own CourseLeaf scraper. Each project is a real institution solving the same problem by hand — a documented, public inventory of unmet analytics demand.",
      url: "https://github.com/unimelb-mdap/cc-coursemap",
      dateDiscovered: new Date("2026-07-09"),
      credibilityScore: 5,
      category: "competitor_weakness",
      relevantClaim:
        "Each custom build in the tool ecosystem is a DFVA use case in the wild. The breadth of independent workarounds evidences durable demand for an analytics layer the curriculum platform cannot supply natively.",
      isActive: true,
    },
    {
      // Signal 3: go-to-market implication
      source: "Market structure reading (research-loop GitHub intelligence)",
      excerpt:
        "CourseLeaf holds roughly 29% market share of curriculum management, and its customers wanting analytics must currently build custom infrastructure to participate at all. That combination — large installed base, structural API poverty, proven willingness to engineer around the gap — defines an addressable market DFVA can serve as the complementary analytics layer, without touching CourseLeaf's workflow and without a rip-and-replace decision.",
      url: "https://github.com/unimelb-mdap/cc-coursemap",
      dateDiscovered: new Date("2026-07-09"),
      credibilityScore: 4,
      category: "market_gap",
      relevantClaim:
        "The CourseLeaf installed base facing API poverty is DFVA's addressable market for an analytics layer. Every institution already building custom tooling is a pre-qualified audience: they have diagnosed the problem and budgeted engineering time against it.",
      isActive: true,
    },
  ];

// Snapshot append entries — both carry the "tool ecosystem" marker the
// idempotency guard checks (distinct from feat-018's entries, which contain
// "CourseLeaf" but not this phrase).
const SNAPSHOT_THREAT_ENTRY =
  "OPPORTUNITY: The third-party tool ecosystem around CourseLeaf (Illinois Azure Function, APInception, cc-coursemap, UniPaith) is demand-side proof institutions need analytics their platform cannot deliver — every custom build is a pre-qualified DFVA audience.";
const SNAPSHOT_ACTION_ENTRY =
  "Go to market through the CourseLeaf tool ecosystem gap: institutions already building custom scrapers, Azure Functions and API wrappers are pre-qualified audiences — pitch 'skip the custom build': DFVA as the analytics layer without rip-and-replace.";

export async function seedCourseLeafInfrastructureGapResponse(
  prisma: PrismaClient,
) {
  // ── 1. CompetitiveEvent (idempotent: eventType distinguishes from
  //      feat-018's CourseLeaf PRODUCT_UPDATE record) ─────────────────────────
  const eventExists = await prisma.competitiveEvent.findFirst({
    where: { competitor: "CourseLeaf", eventType: "ANNOUNCEMENT" },
  });
  if (!eventExists) {
    await prisma.competitiveEvent.create({ data: INFRASTRUCTURE_GAP_EVENT });
    console.log(
      "[seed] CompetitiveEvent: CourseLeaf ANNOUNCEMENT (infrastructure gap) created",
    );
  } else {
    console.log(
      "[seed] CompetitiveEvent: CourseLeaf ANNOUNCEMENT already exists",
    );
  }

  // ── 2. MarketValidationSignals (idempotent per unique source) ──────────────
  for (const signal of INFRASTRUCTURE_GAP_SIGNALS) {
    const exists = await prisma.marketValidationSignal.findFirst({
      where: { source: signal.source },
    });
    if (!exists) {
      await prisma.marketValidationSignal.create({ data: signal });
      console.log(`[seed] MarketValidationSignal created: ${signal.source}`);
    }
  }

  // ── 3. MarketWindowSnapshot (append only, keep status NARROWING).
  //      Guard matches on the "tool ecosystem" marker — NOT "CourseLeaf" —
  //      because feat-018's appended entries already contain "CourseLeaf"
  //      and would silently suppress this feature's entries. ─────────────────
  const latest = await prisma.marketWindowSnapshot.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (latest) {
    const keyThreats = (latest.keyThreats as string[]) || [];
    const recommendedActions = (latest.recommendedActions as string[]) || [];

    const threatAlreadyPresent = keyThreats.some((t) =>
      t.includes("tool ecosystem"),
    );
    const actionAlreadyPresent = recommendedActions.some((a) =>
      a.includes("tool ecosystem"),
    );

    if (!threatAlreadyPresent || !actionAlreadyPresent) {
      await prisma.marketWindowSnapshot.update({
        where: { id: latest.id },
        data: {
          keyThreats: threatAlreadyPresent
            ? keyThreats
            : [...keyThreats, SNAPSHOT_THREAT_ENTRY],
          recommendedActions: actionAlreadyPresent
            ? recommendedActions
            : [...recommendedActions, SNAPSHOT_ACTION_ENTRY],
        },
      });
      console.log(
        "[seed] MarketWindowSnapshot: appended tool-ecosystem opportunity entry",
      );
    } else {
      console.log(
        "[seed] MarketWindowSnapshot: tool-ecosystem entries already present",
      );
    }
  } else {
    console.log(
      "[seed] MarketWindowSnapshot: no snapshot found — skipping append (run feat-017 seed first)",
    );
  }
}
