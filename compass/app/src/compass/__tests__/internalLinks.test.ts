import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Every internal link in the client resolves to a declared route.
 *
 * /developers shipped two hero buttons to /developers/reference and
 * /developers/playground, neither of which existed, and the API error payload
 * carried the same path. Nothing caught it because routes live in
 * main.wasp.ts and links live in .tsx files. This test joins the two.
 */

const appRoot = path.resolve(__dirname, "../../..");
const srcRoot = path.join(appRoot, "src");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      // Generated report bodies carry external and archival links only.
      if (entry === "reportContent" || entry === "__tests__") continue;
      walk(full, out);
    } else if (/\.(tsx|ts)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function declaredRoutes(): RegExp[] {
  const wasp = readFileSync(path.join(appRoot, "main.wasp.ts"), "utf8");
  const paths = [...wasp.matchAll(/route\(\s*"[^"]+",\s*"([^"]+)"/g)].map(
    (m) => m[1],
  );
  expect(paths.length).toBeGreaterThan(10);
  return paths
    .filter((p) => p !== "*")
    .map(
      (p) =>
        new RegExp(
          "^" +
            p
              .split("/")
              .map((seg) => (seg.startsWith(":") ? "[^/]+" : seg))
              .join("/") +
            "/?$",
        ),
    );
}

function internalLinks(): { file: string; href: string }[] {
  const found: { file: string; href: string }[] = [];
  for (const file of walk(srcRoot)) {
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(/\b(?:to|href)=["'](\/[^"'#?]*)/g)) {
      found.push({ file: path.relative(appRoot, file), href: m[1] });
    }
  }
  return found;
}

describe("internal links resolve to declared routes", () => {
  const routes = declaredRoutes();
  const links = internalLinks();

  it("finds links to check", () => {
    expect(links.length).toBeGreaterThan(20);
  });

  it("has no link to an undeclared route", () => {
    const dead = links.filter(({ href }) => !routes.some((r) => r.test(href)));
    expect(
      dead.map((d) => `${d.file} → ${d.href}`),
      "every internal to=/href= must match a route in main.wasp.ts",
    ).toEqual([]);
  });
});
