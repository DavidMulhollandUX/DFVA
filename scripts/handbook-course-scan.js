/*
 * UoM Handbook full course scan — browser-only.
 *
 * The handbook refuses Crawl4AI ("Pardon Our Interruption") but serves a real browser
 * normally, so this runs as a same-origin fetch loop inside the page.
 *
 * HOW TO RUN
 *   1. Open the Browser pane at:
 *      https://handbook.unimelb.edu.au/search?types%5B%5D=course&year=2026&sort=name_asc
 *   2. Paste this file's contents into javascript_tool (or devtools console).
 *   3. Call: await scanAll()            // ~4 min, ~90 requests, paced 2.5s apart
 *   4. Read: scanAll.result             // { total, rows[], missingVsCovered }
 *
 * WHY THREE PASSES
 *   Handbook pagination is UNSTABLE: the same 28-page sweep returns a different subset
 *   each run (a single name_asc pass yields ~486 of 543; several pages come back short).
 *   Sorting does not fix it. Three independent partitions are unioned instead:
 *     a) full sweep sort=name_asc
 *     b) per-faculty sweep over all 14 org_unit facets (small, mostly-stable slices)
 *     c) full sweep sort=name_desc
 *   The union reproducibly hits the handbook's own reported total. ALWAYS check
 *   result.total against the "N results found" figure before trusting the output.
 *
 * PACING: 2.5s between requests. Do not parallelise — the capture queue task also hits
 * this host every 10 minutes and the anti-bot is shared.
 */

const YEAR = 2026;
const GAP = 2500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FACULTIES = {
  7020: 'Architecture, Building and Planning',
  1000: 'Arts',
  3000: 'Business and Economics',
  4600: 'Education',
  4000: 'Engineering and IT',
  7620: 'Fine Arts and Music',
  7320: 'Law',
  5000: 'Medicine, Dentistry and Health Sciences',
  8780: 'Melbourne Business School',
  3400: 'Melbourne Professional Education',
  2000: 'Melbourne School of Land and Environment',
  6030: 'Science',
  8760: 'UoM Commercial Ltd',
  7410: 'VCA and MCM',
};

/** Classify by award name — the handbook has no clean award-type facet. */
function awardType(name) {
  const n = name.toLowerCase();
  if (/^specialist certificate/.test(n)) return 'SpecCert';
  if (/^professional certificate/.test(n)) return 'ProfCert';
  if (/^graduate certificate/.test(n)) return 'GradCert';
  if (/^graduate diploma/.test(n)) return 'GradDip';
  if (/^postgraduate diploma|^diploma/.test(n)) return 'Diploma';
  if (/^master/.test(n)) return 'Masters';
  if (/^bachelor/.test(n)) return 'Bachelor';
  if (/ph\.?d|doctor of philosophy/.test(n)) return 'PhD';
  if (/^doctor/.test(n)) return 'Doctorate';
  return 'Other';
}

/** Parse one search-results page into the accumulator. Returns the reported total. */
function absorb(html, store, faculty) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const heading = (doc.querySelector('.search-results__heading h1') || {}).textContent || '';
  const reported = parseInt((heading.match(/([\d,]+) results/) || [])[1]?.replace(/,/g, ''), 10) || 0;

  for (const li of doc.querySelectorAll('li.search-result-item--course')) {
    const a = li.querySelector(`a[href*="/${YEAR}/courses/"]`);
    if (!a) continue;
    const code = a.getAttribute('href').split(`/${YEAR}/courses/`)[1].toLowerCase();
    const flags = [...li.querySelectorAll('.search-result-item__flag')].map((f) => f.textContent.trim());
    const name = (li.querySelector('h3') || {}).textContent.trim();
    const row = store[code] || (store[code] = {
      code,
      name,
      award: awardType(name),
      level: (li.className.match(/--course-([a-z]+)/) || [])[1] || '',
      flags,
      meta: [...li.querySelectorAll('.search-result-item__meta p')].map((p) => p.textContent.trim()),
      faculties: [],
      discontinued: flags.some((f) => /discontinued/i.test(f)),
      exitOnly: flags.some((f) => /exit only/i.test(f)),
    });
    if (faculty && !row.faculties.includes(faculty)) row.faculties.push(faculty);
  }
  return reported;
}

async function sweep(store, extraQuery, faculty, maxPages) {
  const url = (p) => `/search?page=${p}&types%5B%5D=course&year=${YEAR}&${extraQuery}`;
  const first = await fetch(url(1), { credentials: 'include' });
  if (first.status !== 200) throw new Error(`search returned ${first.status} — likely rate-limited`);
  const reported = absorb(await first.text(), store, faculty);
  const pages = Math.min(Math.ceil(reported / 20), maxPages ?? Infinity);
  for (let p = 2; p <= pages; p++) {
    await sleep(GAP);
    const r = await fetch(url(p), { credentials: 'include' });
    if (r.status !== 200) { console.warn(`page ${p} -> ${r.status}`); continue; }
    absorb(await r.text(), store, faculty);
  }
  await sleep(GAP);
  return reported;
}

async function scanAll(coveredCodes = []) {
  const store = {};

  const reported = await sweep(store, 'sort=name_asc');
  console.log(`pass 1 (name_asc): ${Object.keys(store).length}/${reported}`);

  for (const [id, name] of Object.entries(FACULTIES)) {
    await sweep(store, `sort=name_asc&org_unit%5B%5D=${id}`, name);
  }
  console.log(`pass 2 (per-faculty): ${Object.keys(store).length}/${reported}`);

  await sweep(store, 'sort=name_desc');
  const rows = Object.values(store);
  console.log(`pass 3 (name_desc): ${rows.length}/${reported}`);

  if (rows.length !== reported) {
    console.warn(`INCOMPLETE: ${rows.length} of ${reported}. Re-run — pagination is unstable.`);
  }

  const covered = new Set(coveredCodes);
  const live = rows.filter((r) => !r.discontinued && !r.exitOnly);
  const DEGREE = ['Masters', 'Bachelor', 'Doctorate', 'PhD', 'Diploma', 'Other'];

  scanAll.result = {
    total: rows.length,
    reported,
    complete: rows.length === reported,
    rows,
    liveDegree: live.filter((r) => DEGREE.includes(r.award)).length,
    missingVsCovered: live
      .filter((r) => DEGREE.includes(r.award) && !covered.has(r.code))
      .map((r) => ({ code: r.code, name: r.name, award: r.award, faculties: r.faculties })),
  };
  return scanAll.result;
}

/** TSV dump for piping to disk. */
function toTSV() {
  return scanAll.result.rows
    .map((r) => [r.code, r.name, r.award, r.level, r.flags.join(';'), r.faculties.join(';')].join('\t'))
    .sort()
    .join('\n');
}
