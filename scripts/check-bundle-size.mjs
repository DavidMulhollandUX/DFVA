// Bundle ceiling. Reads a Vite manifest and fails when any chunk, or any
// budgeted route's transitive static imports, exceeds compass/app/bundle-budget.json.
//
//   cd compass/app
//   REACT_APP_API_URL=https://example.invalid npx vite build --manifest
//   node ../../scripts/check-bundle-size.mjs .wasp/out/web-app/build
import { readFileSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const buildDir = resolve(process.argv[2] ?? "build-ci");
const budget = JSON.parse(
  readFileSync(join(here, "../compass/app/bundle-budget.json"), "utf8"),
);
const manifest = JSON.parse(
  readFileSync(join(buildDir, ".vite/manifest.json"), "utf8"),
);

const kb = (f) => Math.round(statSync(join(buildDir, f)).size / 1024);
const byFile = new Map(Object.values(manifest).map((e) => [e.file, e]));
const byKey = Object.entries(manifest);

function routeEntry(name) {
  if (name === "index") return byKey.find(([, e]) => e.isEntry)?.[1];
  return byKey.find(
    ([k]) => k.endsWith(`/${name}.tsx`) || k.endsWith(`/${name}.ts`),
  )?.[1];
}
function transitiveKb(entry) {
  const seen = new Set();
  const walk = (e) => {
    if (!e || seen.has(e.file)) return;
    seen.add(e.file);
    for (const k of e.imports ?? []) walk(manifest[k]);
  };
  walk(entry);
  return [...seen].reduce((a, f) => a + kb(f), 0);
}

const failures = [];
const rows = [];
const biggest = [...byFile.values()]
  .map((e) => [kb(e.file), e.file])
  .sort((a, b) => b[0] - a[0])[0];
rows.push(["largest chunk", biggest[0], budget.chunk, biggest[1]]);
if (biggest[0] > budget.chunk)
  failures.push(
    `largest chunk ${biggest[1]} is ${biggest[0]} kB, budget ${budget.chunk}`,
  );
for (const [name, limit] of Object.entries(budget.routes)) {
  const e = routeEntry(name);
  if (!e) {
    failures.push(`route ${name} not found in manifest`);
    continue;
  }
  const total = transitiveKb(e);
  rows.push([name, total, limit, e.file]);
  if (total > limit)
    failures.push(`route ${name} loads ${total} kB, budget ${limit}`);
}
for (const [n, v, l, f] of rows)
  console.log(
    `${n.padEnd(14)} ${String(v).padStart(6)} kB  budget ${String(l).padStart(
      5,
    )}  ${f}`,
  );
if (failures.length) {
  console.error("\nBundle budget exceeded:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("\nbundle budget OK");
