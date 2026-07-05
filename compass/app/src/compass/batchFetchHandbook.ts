/**
 * Batch-fetch all handbook course pages into the cache.
 * Run: npx tsx compass/app/src/compass/batchFetchHandbook.ts
 */
import {
  fetchCourseOverview,
  fetchCourseStructure,
  fetchCourseAttributes,
} from "./handbookFetcher";

const COURSES = [
  // Faculty of Science (already assessed)
  "mc-cs",
  "mc-datasc",
  "mc-scibif",
  "mc-actsc",
  "mc-bmedsc",
  "mc-sciphy",
  "mc-scibio",
  "mc-sciche",
  "mc-envsc",
  "mc-climsci",
  "mc-sciear",
  "mc-sciepi",
  "mc-scibit",
  "439fs",
  "mc-gencoun",
  "mc-nursc",
  // Additional Science
  "b-sci",
  "b-des",
  // Engineering & IT
  "mc-eng",
  "mc-engmech",
  "mc-engelec",
  "mc-engchem",
  "mc-engcivil",
  "mc-engsoft",
  "mc-it",
  "mc-cs",
  "mc-engstruct",
  "mc-engenv",
  "mc-engmtrl",
  "mc-engbiom",
  // Business & Economics
  "mc-mba",
  "mc-mgt",
  "mc-mktg",
  "mc-fin",
  "mc-actscfin",
  "mc-econ",
  "mc-ba",
  "mc-busana",
  "mc-intlbiz",
  "mc-supplychain",
  "mc-hrm",
  "mc-entre",
  // Arts & Humanities
  "mc-arts",
  "mc-appliedling",
  "mc-creativewrit",
  "mc-journ",
  "mc-pubpol",
  "mc-intlrel",
  "mc-devstud",
  "mc-crim",
  "mc-socpol",
  // Law
  "mc-law",
  "mc-comlaw",
  "mc-envlaw",
  "mc-intlaw",
  "mc-tax",
  "mc-hrlaw",
  // Education
  "mc-teachprim",
  "mc-teachsec",
  "mc-ed",
  "mc-edlead",
  "mc-tesol",
  // Architecture & Design
  "mc-arch",
  "mc-urbdes",
  "mc-urbplan",
  "mc-landsarch",
  "mc-constrmgmt",
  "mc-prop",
  "mc-urbhort",
  // Medicine & Health
  "mc-med",
  "mc-pubhealth",
  "mc-clinepi",
  "mc-clinresearch",
  "mc-psychclin",
  "mc-socwork",
  "mc-audiology",
  "mc-speechpath",
  "mc-optom",
  "mc-physio",
  "mc-dental",
  "mc-pharm",
  "mc-vet",
  // Agriculture & Environment
  "mc-agr",
  "mc-agribus",
  "mc-food",
  "mc-animsci",
  "mc-forest",
  // Fine Arts & Music
  "mc-music",
  "mc-musicperf",
  "mc-musiced",
  "mc-musictherapy",
  "mc-finearts",
  "mc-curating",
  "mc-film",
];

const DELAY_MS = 200; // polite delay between requests

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type FetchFn = (courseCode: string) => Promise<{ fromCache: boolean }>;

async function main() {
  let fetched = 0;
  let cached = 0;
  let failed = 0;
  const start = Date.now();

  const fetchers: [string, FetchFn][] = [
    ["overview", fetchCourseOverview],
    ["structure", fetchCourseStructure],
    ["attributes", fetchCourseAttributes],
  ];

  for (const code of COURSES) {
    for (const [name, fn] of fetchers) {
      try {
        const page = await fn(code);
        if (page.fromCache) cached++;
        else fetched++;
      } catch (e) {
        failed++;
        console.error(`  FAIL ${code}/${name}: ${(e as Error).message}`);
      }
      await sleep(DELAY_MS);
    }
  }

  const total = COURSES.length * 3;
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s. ${total} pages attempted:`);
  console.log(`  Fetched: ${fetched}  Cached: ${cached}  Failed: ${failed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
