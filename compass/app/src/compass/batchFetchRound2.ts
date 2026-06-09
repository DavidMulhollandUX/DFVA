/**
 * Batch 2: Fetch additional handbook course pages.
 * Run: npx tsx compass/app/src/compass/batchFetchRound2.ts
 */
import { fetchCourseOverview, fetchCourseStructure, fetchCourseAttributes } from './handbookFetcher';

const COURSES = ['sc-hhs','sc-imustch','gc-asw','gc-dtacp','gc-hhs','gc-ahrc','sc-ehac','pr-wbcoach','pr-wblead','gc-mcc','pr-invpra','gc-tedmgt','gc-dphlth','gc-enggwrk','gd-sc','mc-intedib','gc-sc','mc-clind','gda-bltenv','mc-bamktg','527cl','mc-urbdes','mc-indeng','746st','423aa','gd-spmed','702pa','gc-arbcult','gd-clinus','gc-baol','pr-anamgt','mc-apbusa','pr-iap','gc-ccnem','mc-propsyc','gc-busana','sc-dhw','gc-apbusa','gd-fdatasc','sc-gclaw','893aa','mc-gencoun','gc-irl','gc-phtypae','mc-surged','pr-ldship','gc-mthed10','gc-genohlt','mc-phtyph','gc-adolhw','gd-ba','gc-ba','mc-base','gc-dhw','mc-scwr','sc-dtm','gc-clinus','mc-mktg','mc-fin','mc-econ','mc-ba','mc-intlbiz','mc-supplychain','mc-hrm','mc-entre','mc-appliedling','mc-creativewrit','mc-journ','mc-pubpol','mc-intlrel','mc-devstud','mc-crim','mc-socpol','mc-law','mc-comlaw','mc-envlaw','mc-intlaw','mc-tax','mc-hrlaw','mc-teachprim','mc-teachsec','mc-ed','mc-edlead','mc-tesol','mc-arch','mc-urbplan','mc-landsarch','mc-constrmgmt','mc-prop','mc-urbhort','mc-med','mc-pubhealth','mc-clinepi','mc-clinresearch','mc-psychclin','mc-socwork','mc-audiology','mc-speechpath','mc-optom','mc-physio','mc-dental','mc-pharm','mc-vet','mc-agr','mc-agribus','mc-animsci','mc-forest','mc-music','mc-musicperf','mc-musiced','mc-musictherapy','mc-finearts','mc-curating','mc-film'];

const DELAY_MS = 200;

async function main() {
  let fetched = 0, cached = 0, failed = 0;
  const start = Date.now();

  for (const code of COURSES) {
    for (const [name, fn] of [['overview', fetchCourseOverview],['structure', fetchCourseStructure],['attributes', fetchCourseAttributes]] as const) {
      try {
        const page = await fn(code);
        if (page.fromCache) cached++; else fetched++;
      } catch (e: any) { failed++; }
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  const total = COURSES.length * 3;
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`Done in ${elapsed}s. ${total} pages: fetched=${fetched} cached=${cached} failed=${failed}`);
}

main().catch(e => { console.error(e); process.exit(1); });
