// Measure a route the way a Chrome DevTools trace would, and print numbers.
//
//   node perf/measure.mjs /reports                 # against http://localhost:3000
//   node perf/measure.mjs https://dev.evidura.ai/  # any absolute URL
//   node perf/measure.mjs /reports --trace         # also writes perf/trace-<route>.json
//
// PW_CHANNEL=chrome uses the installed Chrome (see playwright.config.ts).
// The cache is disabled through the DevTools protocol so transfer sizes are
// cold-visit sizes, which is what a first-time visitor pays.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const arg = process.argv[2] ?? "/";
const trace = process.argv.includes("--trace");
const url = arg.startsWith("http") ? arg : `http://localhost:3000${arg}`;
const slug =
  new URL(url).pathname.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "root";

const browser = await chromium.launch({
  ...(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {}),
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const cdp = await page.context().newCDPSession(page);
await cdp.send("Network.enable");
await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
await cdp.send("Performance.enable");

const transfers = new Map();
cdp.on("Network.responseReceived", (e) => {
  transfers.set(e.requestId, { url: e.response.url, type: e.type, bytes: 0 });
});
cdp.on("Network.loadingFinished", (e) => {
  const t = transfers.get(e.requestId);
  if (t) t.bytes = e.encodedDataLength;
});

if (trace)
  await browser.startTracing(page, {
    path: `perf/trace-${slug}.json`,
    screenshots: false,
  });
const t0 = Date.now();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const wall = Date.now() - t0;

const web = await page.evaluate(async () => {
  const nav = performance.getEntriesByType("navigation")[0];
  const lcp = await new Promise((res) => {
    let last = null;
    try {
      new PerformanceObserver((l) => {
        const e = l.getEntries().pop();
        if (e) last = e.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}
    setTimeout(() => res(last), 800);
  });
  const longTasks = await new Promise((res) => {
    const out = [];
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) out.push(e.duration);
      }).observe({ type: "longtask", buffered: true });
    } catch {}
    setTimeout(() => res(out), 300);
  });
  return {
    domContentLoaded: nav?.domContentLoadedEventEnd ?? null,
    load: nav?.loadEventEnd ?? null,
    lcp,
    longTasks,
    heapMb: performance.memory
      ? performance.memory.usedJSHeapSize / 1048576
      : null,
  };
});
const { metrics } = await cdp.send("Performance.getMetrics");
const metric = (n) => metrics.find((m) => m.name === n)?.value ?? null;
if (trace) await browser.stopTracing();
await browser.close();

const kb = (b) => Math.round(b / 1024);
const ms = (v) => (v == null ? "n/a" : `${Math.round(v)} ms`);
const js = [...transfers.values()].filter((t) => t.type === "Script");
const all = [...transfers.values()];
const top = [...js].sort((a, b) => b.bytes - a.bytes).slice(0, 6);

console.log(`\n${url}\n`);
console.log(`wall to network idle   ${ms(wall)}`);
console.log(`DOMContentLoaded       ${ms(web.domContentLoaded)}`);
console.log(`load                   ${ms(web.load)}`);
console.log(`LCP                    ${ms(web.lcp)}`);
console.log(
  `long tasks (>50 ms)    ${web.longTasks.length} ${web.longTasks
    .map((d) => Math.round(d))
    .join(", ")}`,
);
console.log(
  `script time            ${ms((metric("ScriptDuration") ?? 0) * 1000)}`,
);
console.log(
  `task time              ${ms((metric("TaskDuration") ?? 0) * 1000)}`,
);
console.log(
  `JS heap                ${
    web.heapMb == null ? "n/a" : `${Math.round(web.heapMb)} MB`
  }`,
);
console.log(`DOM nodes              ${metric("Nodes") ?? "n/a"}`);
console.log(
  `transfer, all          ${kb(all.reduce((a, t) => a + t.bytes, 0))} kB in ${
    all.length
  } requests`,
);
console.log(
  `transfer, JS           ${kb(js.reduce((a, t) => a + t.bytes, 0))} kB in ${
    js.length
  } files`,
);
console.log(`largest JS`);
for (const t of top)
  console.log(
    `  ${String(kb(t.bytes)).padStart(6)} kB  ${t.url.split("/").pop()}`,
  );
if (trace)
  console.log(
    `\ntrace written to perf/trace-${slug}.json (open in Chrome DevTools > Performance)`,
  );
if (process.argv.includes("--json"))
  writeFileSync(
    `perf/measure-${slug}.json`,
    JSON.stringify({ url, wall, ...web, transfers: all }, null, 2),
  );
