import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The feature map (.claude/skills/verify-evidura/features/*.md) tells an agent
 * how to reach every feature and which test ids to drive. A map that names a
 * test id the app no longer renders, or a route that is no longer declared,
 * sends the agent to the wrong place. This pins both against the source.
 */
const ROOT = join(__dirname, "..", "..", "..", "..", "..");
const FEATURES = join(ROOT, ".claude", "skills", "verify-evidura", "features");
const SRC = join(ROOT, "compass", "app", "src");
const WASP = join(ROOT, "compass", "app", "main.wasp.ts");

function files(dir: string, ext: RegExp): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p, ext);
    return ext.test(name) ? [p] : [];
  });
}

/** Test ids the app renders: literal `data-testid="x"` and the prefix of a
 *  template `data-testid={`x-${…}`}`. */
function sourceTestIds(): { literal: Set<string>; prefixes: string[] } {
  const literal = new Set<string>();
  const prefixes: string[] = [];
  for (const f of files(SRC, /\.tsx?$/)) {
    const body = readFileSync(f, "utf8");
    for (const m of body.matchAll(
      /data-testid=(?:"([^"]+)"|\{`([^`$]+)\$\{)/g,
    )) {
      if (m[1]) literal.add(m[1]);
      if (m[2]) prefixes.push(m[2]);
    }
  }
  return { literal, prefixes };
}

/** Every string literal in main.wasp.ts that starts with "/" is a path. */
function declaredRoutes(): RegExp[] {
  const body = readFileSync(WASP, "utf8");
  const paths = [...body.matchAll(/["'](\/[A-Za-z0-9:*\-/]*)["']/g)].map(
    (m) => m[1],
  );
  return paths.map(
    (p) =>
      new RegExp(
        "^" + p.replace(/:[A-Za-z]+/g, "[^/]+").replace(/\*/g, ".*") + "$",
      ),
  );
}

const featureFiles = readdirSync(FEATURES)
  .filter((n) => n.endsWith(".md") && n !== "README.md")
  .map((n) => join(FEATURES, n));

describe("feature map: every named test id exists in the app", () => {
  const { literal, prefixes } = sourceTestIds();

  it("reads a real corpus", () => {
    expect(featureFiles.length).toBeGreaterThanOrEqual(5);
    expect(literal.size).toBeGreaterThan(20);
  });

  for (const f of featureFiles) {
    it(f.slice(FEATURES.length + 1), () => {
      const body = readFileSync(f, "utf8");
      for (const m of body.matchAll(/data-testid="([^"]+)"/g)) {
        const id = m[1];
        const ok = id.endsWith("*")
          ? prefixes.some((p) => p.startsWith(id.slice(0, -1))) ||
            [...literal].some((l) => l.startsWith(id.slice(0, -1)))
          : literal.has(id);
        expect(ok, `${id} is not rendered anywhere under compass/app/src`).toBe(
          true,
        );
      }
    });
  }
});

describe("feature map: every named route is declared in main.wasp.ts", () => {
  const routes = declaredRoutes();

  it("reads the route table", () => {
    expect(routes.length).toBeGreaterThan(10);
  });

  for (const f of [...featureFiles, join(FEATURES, "README.md")]) {
    it(f.slice(FEATURES.length + 1), () => {
      const body = readFileSync(f, "utf8");
      for (const m of body.matchAll(/`(\/[A-Za-z0-9:\-/]*)`/g)) {
        const path = m[1];
        expect(
          routes.some((r) => r.test(path)),
          `${path} matches no declared route`,
        ).toBe(true);
      }
    });
  }
});
