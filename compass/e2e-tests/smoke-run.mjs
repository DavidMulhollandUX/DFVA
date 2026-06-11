// COMPASS smoke run — executes .hermes/smoke-test-runbook.md steps 5–8 plus the
// 2026-06 UI checklist (faceted reports, radar, structured JSON reports, Insights
// pages) against an ALREADY-RUNNING app on :3000/:3001.
// Run: cd compass/e2e-tests && WASP_LOG=<path to wasp output> node smoke-run.mjs
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3000';
const SHOTS = '/tmp/compass-smoke';
mkdirSync(SHOTS, { recursive: true });

const results = [];
const consoleErrors = [];
let step = 0;

function record(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

async function shot(page, name) {
  step += 1;
  const file = `${SHOTS}/${String(step).padStart(2, '0')}-${name}.png`;
  await page.screenshot({ path: file, fullPage: false });
  console.log(`       shot: ${file}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
});

// --- 1. Landing + navbar ----------------------------------------------------
await page.goto(BASE, { waitUntil: 'networkidle' });
record('landing loads', (await page.title()) !== '');
record('navbar has Insights link', await page.locator('nav a:has-text("Insights")').count() > 0);
await shot(page, 'landing');

// --- 2. Reports listing: faceted nav ----------------------------------------
await page.goto(`${BASE}/reports`, { waitUntil: 'networkidle' });
const cardCount = await page.locator('a[href^="/reports/dfva-"]').count();
record('reports listing shows 41 programs', cardCount >= 41, `${cardCount} report links`);
const selects = page.locator('select');
record('faceted nav present (faculty/risk/sort selects)', (await selects.count()) >= 3);
await shot(page, 'reports-all');
// filter to HIGH RISK and confirm the list shrinks
await selects.nth(1).selectOption('HIGH RISK');
await page.waitForTimeout(400);
const highCount = await page.locator('a[href^="/reports/dfva-"]').count();
record('risk filter narrows list', highCount > 0 && highCount < cardCount, `${highCount} after filter`);
await shot(page, 'reports-high-risk-filter');

// --- 3. Report detail (b-des): radar + three tabs ----------------------------
await page.goto(`${BASE}/reports/dfva-b-des`, { waitUntil: 'networkidle' });
record('b-des: HIGH RISK badge', await page.locator('text=HIGH RISK').count() > 0);
record('b-des: Dimension Fingerprint radar', await page.locator('text=Dimension Fingerprint').count() === 1 && await page.locator('svg polygon').count() > 3);
for (const tab of ['Market Intelligence', 'Improvement Plan']) {
  record(`b-des: ${tab} tab present`, await page.locator(`a:has-text("${tab}")`).count() > 0);
}
await shot(page, 'report-b-des');
await page.goto(`${BASE}/reports/dfva-recommend-b-des`, { waitUntil: 'networkidle' });
record('b-des: Improvement Plan renders', await page.locator('text=Report not found').count() === 0);
await shot(page, 'report-b-des-recommend');

// --- 4. mc-arch: RESILIENT badge + structured JSON renderer ------------------
await page.goto(`${BASE}/reports/dfva-mc-arch`, { waitUntil: 'networkidle' });
record('mc-arch: RESILIENT badge', await page.locator('span:has-text("RESILIENT")').count() > 0);
record('mc-arch: structured table (not raw JSON)', await page.locator('th:has-text("Rationale")').count() === 1);
const bodyText = await page.locator('main, body').first().innerText();
record('mc-arch: no raw JSON braces dump', !bodyText.includes('"riskBand":'));
record('mc-arch: Improvement Plan tab present', await page.locator('a:has-text("Improvement Plan")').count() > 0);
await shot(page, 'report-mc-arch-structured');

// --- 5. Insights hub + portfolio + faculty comparison ------------------------
await page.goto(`${BASE}/insights`, { waitUntil: 'networkidle' });
record('insights hub renders', await page.locator('text=University Portfolio Health').count() > 0);
const facultyCards = await page.locator('a[href^="/insights/faculty/"]').count();
record('insights hub: faculty cards', facultyCards > 0, `${facultyCards} cards`);
await shot(page, 'insights-hub');

await page.goto(`${BASE}/insights/portfolio`, { waitUntil: 'networkidle' });
record('portfolio health renders', await page.locator('text=Portfolio Health Report').count() > 0);
record('portfolio: recommended actions', await page.locator('text=Recommended University-Wide Actions').count() > 0);
await shot(page, 'insights-portfolio');

await page.goto(`${BASE}/insights/faculty/health`, { waitUntil: 'networkidle' });
record('faculty comparison renders via param route', await page.locator('text=Faculty Comparison').count() > 0);
record('faculty comparison: selected row highlighted', await page.locator('tr.bg-primary\\/5').count() === 1);
await shot(page, 'insights-faculty-health');

// --- 6. Auth: signup → verify (link from server log) → login -----------------
const email = `smoke-${Date.now()}@example.com`;
const password = 'SmokeTest!2026';
await page.goto(`${BASE}/signup`, { waitUntil: 'networkidle' });
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', password);
await page.click('button[type="submit"]');
await page.waitForTimeout(2500);

let verifyUrl = null;
if (process.env.WASP_LOG) {
  const log = readFileSync(process.env.WASP_LOG, 'utf8');
  const matches = [...log.matchAll(/https?:\/\/localhost:3000\/email-verification\?token=[^\s"'\\]+/g)];
  verifyUrl = matches.length ? matches[matches.length - 1][0] : null;
}
record('signup produced verification link in server log', !!verifyUrl);
if (verifyUrl) {
  await page.goto(verifyUrl, { waitUntil: 'networkidle' });
  await shot(page, 'email-verified');
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2500);
}

// --- 7. /assess: known URL → Complete; unknown URL → HIGH RISK ---------------
await page.goto(`${BASE}/assess`, { waitUntil: 'networkidle' });
const onAssess = page.url().includes('/assess');
record('assess page reachable after login', onAssess, onAssess ? '' : `redirected to ${page.url()}`);
if (onAssess) {
  await page.fill('input[type="url"]', 'https://handbook.unimelb.edu.au/2025/courses/b-des');
  await page.click('button[type="submit"]');
  let completed = false;
  for (let i = 0; i < 20 && !completed; i++) {
    await page.waitForTimeout(1000);
    completed = (await page.locator('text=Complete').count()) > 0;
  }
  record('known URL assessment completes', completed);
  record('known URL resolves to Bachelor of Design', await page.locator('text=Bachelor of Design').count() > 0);
  await shot(page, 'assess-known');

  await page.fill('input[type="url"]', 'https://handbook.unimelb.edu.au/2025/courses/zz-notreal');
  await page.click('button[type="submit"]');
  let stillProcessing = true;
  for (let i = 0; i < 25 && stillProcessing; i++) {
    await page.waitForTimeout(1000);
    stillProcessing = (await page.locator('text=Processing').count()) > 0;
  }
  record('unknown URL assessment completes', !stillProcessing);
  // the generic fallback names the program after its host
  record(
    'unknown URL falls back to generic program',
    await page.locator('text=Program at handbook.unimelb.edu.au').count() > 0,
  );
  await shot(page, 'assess-unknown');
}

// --- 8. Console errors --------------------------------------------------------
const realErrors = consoleErrors.filter((e) => !/vite|favicon|cookieconsent/i.test(e));
record('no console errors across pages', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed; shots in ${SHOTS}`);
process.exit(failed.length ? 1 : 0);
