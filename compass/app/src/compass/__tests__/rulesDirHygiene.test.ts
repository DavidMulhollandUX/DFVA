import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `.claude/rules/` is loaded into every agent session. The codebase-memory
 * tool's `update` command used to append dated "New Routes" and "New Models"
 * lists there on every Stop, which grew the three largest files to 878 lines
 * of worktree paths (2026-09-03). Its writers now target `.claude/logs/`; this
 * test fails if any append reaches the auto-loaded directory again.
 */
const RULES_DIR = join(__dirname, "../../../../../.claude/rules");
const APPENDED = /^## New (Routes|Models|Commands) \(added /m;

describe(".claude/rules hygiene", () => {
  it("carries no dated append blocks", () => {
    const offenders = readdirSync(RULES_DIR)
      .filter((f) => f.endsWith(".md"))
      .filter((f) => APPENDED.test(readFileSync(join(RULES_DIR, f), "utf8")));
    expect(offenders).toEqual([]);
  });
});
