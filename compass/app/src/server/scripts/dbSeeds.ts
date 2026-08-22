import { faker } from "@faker-js/faker";
import type { PrismaClient } from "@prisma/client";
import { type User } from "wasp/entities";
import {
  getSubscriptionPaymentPlanIds,
  SubscriptionStatus,
} from "../../payment/plans";

type MockUserData = Omit<User, "id">;

/**
 * This function, which we've imported in `app.db.seeds` in the `main.wasp` file,
 * seeds the database with mock users via the `wasp db seed` command.
 * For more info see: https://wasp.sh/docs/data-model/backends#seeding-the-database
 */
export async function seedMockUsers(prismaClient: PrismaClient) {
  await Promise.all(
    generateMockUsersData(50).map((data) => prismaClient.user.create({ data })),
  );
}

export async function seedFragilityIncidents(prismaClient: PrismaClient) {
  const incidents = [
    {
      date: new Date("2026-07-05"),
      platform: "Coursedog + CourseLeaf",
      statesAffected: JSON.stringify(["MN", "MA", "CT", "VT", "WV", "PA"]),
      blastRadius: 6,
      sourceUrl: "https://github.com/sjpiper145/cc-coursemap/issues",
      sourceDescription:
        "cc-coursemap production scraper suffered simultaneous 6-state regression across Coursedog/CourseLeaf platforms",
      recoveryHours: null,
      description:
        "A single upstream HTML change broke all parsers simultaneously across 6 states. The scraper could not parse program data from Coursedog or CourseLeaf for MN, MA, CT, VT, WV, and PA. Confirms HTML-based curriculum data is structurally fragile.",
      isActive: true,
    },
    {
      date: new Date("2026-06-23"),
      platform: "Coursedog",
      statesAffected: JSON.stringify(["Prod"]),
      blastRadius: 1,
      sourceUrl: "https://github.com/sjpiper145/cc-coursemap/issues",
      sourceDescription:
        "cc-coursemap production health check failing — June 23 incident",
      recoveryHours: null,
      description:
        "Production health check for cc-coursemap scraper began failing on June 23, indicating an upstream Coursedog change that prevented program data extraction. Incident remained open at discovery time.",
      isActive: true,
    },
    {
      date: new Date("2026-03-15"),
      platform: "Modern Campus",
      statesAffected: JSON.stringify(["Single university"]),
      blastRadius: 1,
      sourceUrl: "https://github.com/sjpiper145/cc-coursemap/pull/1",
      sourceDescription:
        "Modern Campus → Coursedog migration requiring custom scraping tools (coursedog-importer: 9 PRs, Mar–Apr 2026)",
      recoveryHours: 336,
      description:
        "A real university migration from Modern Campus to Coursedog required building custom Python/Selenium extraction code because Modern Campus stored degree requirements as freeform HTML blocks — no structured data export available. 2 weeks of custom development just to extract data.",
      isActive: true,
    },
    {
      date: new Date("2026-06-01"),
      platform: "25Live / Coursedog",
      statesAffected: JSON.stringify(["Mercy University"]),
      blastRadius: 1,
      sourceUrl: "https://github.com/sjpiper145/cc-coursemap/issues",
      sourceDescription:
        "Mercy University 25Live → Coursedog migration (June 2026) — second confirmed migration requiring custom Selenium extraction",
      recoveryHours: 168,
      description:
        "Mercy University's 25Live-to-Coursedog migration is the second independent confirmed migration requiring custom Selenium/Python extraction code. Legacy systems provide no structured data export. Every Coursedog migration requires custom scraping.",
      isActive: true,
    },
  ];

  for (const incident of incidents) {
    await prismaClient.fragilityIncident.create({
      data: incident,
    });
  }
}

function generateMockUsersData(numOfUsers: number): MockUserData[] {
  return faker.helpers.multiple(generateMockUserData, { count: numOfUsers });
}

function generateMockUserData(): MockUserData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const subscriptionStatus =
    faker.helpers.arrayElement<SubscriptionStatus | null>([
      ...Object.values(SubscriptionStatus),
      null,
    ]);
  const now = new Date();
  const createdAt = faker.date.past({ refDate: now });
  const timePaid = faker.date.between({ from: createdAt, to: now });
  const credits = subscriptionStatus
    ? 0
    : faker.number.int({ min: 0, max: 10 });
  const hasUserPaidOnStripe = !!subscriptionStatus || credits > 3;
  return {
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.userName({ firstName, lastName }),
    createdAt,
    isAdmin: false,
    credits,
    subscriptionStatus,
    lemonSqueezyCustomerPortalUrl: null,
    paymentProcessorUserId: hasUserPaidOnStripe
      ? `cus_test_${faker.string.uuid()}`
      : null,
    datePaid: hasUserPaidOnStripe
      ? faker.date.between({ from: createdAt, to: timePaid })
      : null,
    subscriptionPlan: subscriptionStatus
      ? faker.helpers.arrayElement(getSubscriptionPaymentPlanIds())
      : null,
  };
}
