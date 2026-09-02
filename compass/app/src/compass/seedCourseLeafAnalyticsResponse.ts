import type { PrismaClient } from "@prisma/client";

/**
 * Seed CourseLeaf Analytics Expansion competitive intelligence data.
 * feat-018: Complementary analytics layer positioning — market validation signal.
 *
 * Run standalone: DATABASE_URL="..." npx tsx src/compass/seedCourseLeafAnalyticsResponse.ts
 * Or call from dbSeeds.ts: await seedCourseLeafAnalyticsResponse(prisma);
 */
export async function seedCourseLeafAnalyticsResponse(prisma: PrismaClient) {
  // ── 1. CompetitiveEvent for CourseLeaf analytics expansion ────────────────
  // impactScore: DB stores 1-5, code doubles for 2-10 display. 2 → 4/10 (Low, green).
  const existing = await prisma.competitiveEvent.findFirst({
    where: { competitor: "CourseLeaf", eventType: "PRODUCT_UPDATE" },
  });
  if (!existing) {
    await prisma.competitiveEvent.create({
      data: {
        competitor: "CourseLeaf",
        eventType: "PRODUCT_UPDATE",
        title: "CourseLeaf Adds Analytics Features to Product Listing",
        description:
          "CourseLeaf — the largest curriculum management platform (29% market share) — has expanded its product listings to include Micro-Credentials, Career Data Integration, Learning Outcomes Mapping, Course Demand Analytics, and Registration Optimization. This validates the market trend toward data-centric curriculum management but exposes CourseLeaf's structural limitation: HTML-based data model and confirmed API poverty (third-party tool ecosystem: Azure Function, APInception, cc-coursemap) mean CourseLeaf's analytics can only operate on surface-level catalog data. DFVA's structured, schema-first, platform-agnostic assessment provides the analytics depth that CourseLeaf's architecture cannot deliver. This is a market convergence signal — not a competitive threat — and opens opportunity for DFVA as the complementary analytics layer for CourseLeaf campuses.",
        source: "CourseLeaf product pages + research-loop monitoring",
        url: "https://www.courseleaf.com/products/",
        dateOccurred: new Date("2026-07-15"),
        dateDiscovered: new Date("2026-07-16"),
        impactScore: 2, // DB 1-5 → display 4/10 (Low Threat / opportunity)
        marketWindowEffect: "OPENING",
        isActive: true,
      },
    });
    console.log("[seed] CompetitiveEvent: CourseLeaf PRODUCT_UPDATE created");
  } else {
    console.log(
      "[seed] CompetitiveEvent: CourseLeaf PRODUCT_UPDATE already exists",
    );
  }

  // ── 2. MarketValidationSignal records ─────────────────────────────────────
  // credibilityScore: DB stores 1-5. Map spec values: 8→5, 7→4, 6→3.

  // Signal 1: Career Data Integration — LMI becoming table stakes
  const sig1Exists = await prisma.marketValidationSignal.findFirst({
    where: {
      source: "CourseLeaf Product Pages (research-loop monitoring)",
      category: "market_convergence",
    },
  });
  if (!sig1Exists) {
    await prisma.marketValidationSignal.create({
      data: {
        source: "CourseLeaf Product Pages (research-loop monitoring)",
        excerpt:
          "CourseLeaf has added Career Data Integration to its product listings (July 2026). This signals that labour market information (LMI) integration is becoming a table-stakes feature for curriculum management platforms — validating DFVA's thesis that LMI-driven assessment is essential for program review. CourseLeaf's implementation is likely descriptive data display (pulling Lightcast/EMSI feeds into the catalog interface), not prescriptive scoring methodology.",
        url: "https://www.courseleaf.com/products/",
        dateDiscovered: new Date("2026-07-16"),
        credibilityScore: 4, // DB 1-5
        category: "market_convergence",
        relevantClaim:
          "LMI-in-curriculum becoming table stakes for curriculum platforms. DFVA's prescriptive LMI-weighted scoring methodology provides deeper, more actionable insights than descriptive data display alone.",
        isActive: true,
      },
    });
    console.log(
      "[seed] MarketValidationSignal 1/4: Career Data Integration created",
    );
  }

  // Signal 2: API poverty confirmed by third-party tools
  const sig2Exists = await prisma.marketValidationSignal.findFirst({
    where: {
      category: "competitor_weakness",
      source: { contains: "Open-source ecosystem" },
    },
  });
  if (!sig2Exists) {
    await prisma.marketValidationSignal.create({
      data: {
        source:
          "Open-source ecosystem analysis (research-loop GitHub intelligence)",
        excerpt:
          "CourseLeaf's API poverty is confirmed by three independent open-source projects: (1) University of Illinois built an Azure Function specifically to load CourseLeaf data because no native export exists; (2) APInception is a meta-API wrapper built because CourseLeaf's native API is insufficient for programmatic access; (3) cc-coursemap includes a dedicated CourseLeaf scraper for program/catalog data extraction. This tool ecosystem exists because CourseLeaf stores degree requirements as unstructured HTML blocks — not structured, queryable records. Any analytics CourseLeaf builds will be constrained by this architectural limitation.",
        url: "https://github.com/unimelb-mdap/cc-coursemap",
        dateDiscovered: new Date("2026-07-16"),
        credibilityScore: 5, // DB 1-5
        category: "competitor_weakness",
        relevantClaim:
          "CourseLeaf's HTML-based data architecture limits analytics depth. DFVA's structured, schema-first data model enables programmatic analysis that CourseLeaf cannot deliver regardless of feature listings. The third-party tool ecosystem is direct evidence of the extraction pain institutions face.",
        isActive: true,
      },
    });
    console.log(
      "[seed] MarketValidationSignal 2/4: API poverty confirmed created",
    );
  }

  // Signal 3: Learning Outcomes Mapping
  const sig3Exists = await prisma.marketValidationSignal.findFirst({
    where: {
      category: "market_convergence",
      excerpt: { contains: "Learning Outcomes Mapping" },
    },
  });
  if (!sig3Exists) {
    await prisma.marketValidationSignal.create({
      data: {
        source: "CourseLeaf Product Pages (research-loop monitoring)",
        excerpt:
          "CourseLeaf now lists Learning Outcomes Mapping among its product features. Structured learning outcomes data is becoming a curriculum platform expectation — institutions increasingly need to map outcomes to courses, programs, and assessment criteria. This aligns with DFVA's Learning Outcomes dimension (one of 11 scoring dimensions) and validates the market need for outcomes-aware assessment.",
        url: "https://www.courseleaf.com/products/",
        dateDiscovered: new Date("2026-07-16"),
        credibilityScore: 3, // DB 1-5
        category: "market_convergence",
        relevantClaim:
          "Learning outcomes mapping is becoming a standard curriculum platform feature. DFVA's assessment methodology already incorporates learning outcomes as a scoring dimension — the market is converging toward DFVA's existing capability set.",
        isActive: true,
      },
    });
    console.log(
      "[seed] MarketValidationSignal 3/4: Learning Outcomes Mapping created",
    );
  }

  // Signal 4: Operational vs strategic analytics distinction
  const sig4Exists = await prisma.marketValidationSignal.findFirst({
    where: {
      excerpt: {
        contains: "Registration Optimization and Course Demand Analytics",
      },
    },
  });
  if (!sig4Exists) {
    await prisma.marketValidationSignal.create({
      data: {
        source: "CourseLeaf Product Pages (research-loop monitoring)",
        excerpt:
          "CourseLeaf's Registration Optimization and Course Demand Analytics features focus on operational metrics: how many students are enrolling, which sections are filling. These are descriptive operational analytics — useful for scheduling, not for strategic program review. DFVA's assessment methodology is prescriptive: what SHOULD exist in a durable degree, not just what IS happening in current enrollments. This distinction — operational reporting vs strategic assessment — defines the gap between platform-native analytics and DFVA's independent standard.",
        url: "https://www.courseleaf.com/products/",
        dateDiscovered: new Date("2026-07-16"),
        credibilityScore: 4, // DB 1-5
        category: "market_convergence",
        relevantClaim:
          "CourseLeaf's analytics features are operational (descriptive enrollment/scheduling data), not strategic (prescriptive program durability assessment). This confirms that the strategic analytics layer above curriculum management platforms is a distinct product category — exactly DFVA's position.",
        isActive: true,
      },
    });
    console.log(
      "[seed] MarketValidationSignal 4/4: Operational vs strategic created",
    );
  }

  // ── 3. Update MarketWindowSnapshot (append to latest, keep status NARROWING) ─
  const latest = await prisma.marketWindowSnapshot.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (latest) {
    const keyThreats = (latest.keyThreats as string[]) || [];
    const recommendedActions = (latest.recommendedActions as string[]) || [];

    const newThreatEntry =
      "OPPORTUNITY: CourseLeaf (29% market share) adds analytics features — validates market convergence toward data-centric curriculum management but exposes API poverty constraint. Creates demand for DFVA as complementary analytics layer.";
    const newActionEntry =
      "Position DFVA as the complementary analytics layer for CourseLeaf campuses — the strategic assessment depth their platform structurally cannot deliver. Frame as 'making your CourseLeaf data analytically powerful,' not 'replacing CourseLeaf.'";

    const threatAlreadyPresent = keyThreats.some((t: string) =>
      t.includes("CourseLeaf"),
    );
    const actionAlreadyPresent = recommendedActions.some((a: string) =>
      a.includes("CourseLeaf"),
    );

    if (!threatAlreadyPresent || !actionAlreadyPresent) {
      await prisma.marketWindowSnapshot.update({
        where: { id: latest.id },
        data: {
          keyThreats: threatAlreadyPresent
            ? keyThreats
            : [...keyThreats, newThreatEntry],
          recommendedActions: actionAlreadyPresent
            ? recommendedActions
            : [...recommendedActions, newActionEntry],
        },
      });
      console.log(
        "[seed] MarketWindowSnapshot: updated with CourseLeaf opportunity signal",
      );
    } else {
      console.log(
        "[seed] MarketWindowSnapshot: CourseLeaf entries already present",
      );
    }
  } else {
    // First snapshot (unlikely — feat-017 should have created one — but handle gracefully)
    await prisma.marketWindowSnapshot.create({
      data: {
        status: "NARROWING",
        urgencyText:
          "CourseLeaf's analytics expansion validates the market trend but exposes the infrastructure gap. DFVA should position as the complementary analytics layer for all curriculum platforms.",
        keyThreats: [
          "Coursedog Assessment Cloud — third product pillar directly competing in assessment",
          "OPPORTUNITY: CourseLeaf analytics expansion — validates market, exposes API poverty",
        ],
        recommendedActions: [
          "Ship counter-positioning against Coursedog Assessment Cloud",
          "Position DFVA as complementary analytics layer for CourseLeaf campuses",
        ],
      },
    });
    console.log(
      "[seed] MarketWindowSnapshot: created initial snapshot with CourseLeaf signal",
    );
  }
}

// Standalone invocation (for npx tsx)
// Run: cd compass/app && DATABASE_URL="postgresql://..." npx tsx src/compass/seedCourseLeafAnalyticsResponse.ts
if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  seedCourseLeafAnalyticsResponse(prisma)
    .then(() => {
      console.log("[seed] CourseLeaf analytics response seed complete.");
      return prisma.$disconnect();
    })
    .catch((e: unknown) => {
      console.error("[seed] Error seeding CourseLeaf analytics response:", e);
      return prisma.$disconnect().then(() => process.exit(1));
    });
}
