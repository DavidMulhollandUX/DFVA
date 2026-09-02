import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Guards against Main.css's hand-transcribed HSL values drifting from
 * brand/evidura/tokens.css (the declared single source of truth — see
 * review-backlog Tier 2 item 18). Main.css cannot `@import` the tokens file
 * directly: several components (e.g. FragilityDashboardPage.tsx,
 * ReportDetailPage.tsx) read `--card`/`--border`/`--primary`/`--background`
 * as bare `H S% L%` triples via `hsl(var(--x))` in inline styles/SVG
 * attributes, and swapping those variables to hold full colours (what an
 * evidura-token `var()` would carry) breaks that contract. So Main.css stays
 * self-contained and this test parses both files and cross-checks the hex
 * values instead.
 */

const TOKENS_CSS_PATH = fileURLToPath(
  new URL("../../../../../brand/evidura/tokens.css", import.meta.url),
);
const MAIN_CSS_PATH = fileURLToPath(
  new URL("../../client/Main.css", import.meta.url),
);

const tokensCss = readFileSync(TOKENS_CSS_PATH, "utf-8");
const mainCss = readFileSync(MAIN_CSS_PATH, "utf-8");

/**
 * Per-channel tolerance for HSL -> hex round-tripping.
 *
 * Main.css authors colours as whole-number `H S% L%` triples, so recovering
 * RGB always carries some quantisation error on top of tokens.css's exact
 * hex — even a textbook-correct rounding of tokens.css's own hex to whole
 * HSL and back can land 2 off in one channel (verified against
 * --evidura-band-critical, whose Main.css HSL matches the standard rounding
 * exactly and still round-trips to #C74338 rather than #C7433A). 1 is too
 * tight and produces false failures on values that are not actually
 * drifted; the real drift this file exists to catch (the old dark
 * --muted-foreground) misses by 9/3/5, far outside this tolerance either way.
 */
const CHANNEL_TOLERANCE = 2;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const hPrime = h / 60;
  const x = c * (1 - Math.abs((hPrime % 2) - 1));
  let [r1, g1, b1] = [0, 0, 0];
  if (hPrime >= 0 && hPrime < 1) [r1, g1, b1] = [c, x, 0];
  else if (hPrime < 2) [r1, g1, b1] = [x, c, 0];
  else if (hPrime < 3) [r1, g1, b1] = [0, c, x];
  else if (hPrime < 4) [r1, g1, b1] = [0, x, c];
  else if (hPrime < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const m = lNorm - c / 2;
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

/** Parses a bare Tailwind-style HSL triple, e.g. "211 57% 13%", to [r,g,b]. */
function parseHslTripleToRgb(triple: string): [number, number, number] {
  const match = triple.trim().match(/^(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
  if (!match) {
    throw new Error(`Not a bare HSL triple: "${triple}"`);
  }
  const [, h, s, l] = match;
  return hslToRgb(Number(h), Number(s), Number(l));
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

/** Extracts `--name: value;` from a single-line custom property declaration. */
function findCustomProperty(css: string, name: string): string {
  const re = new RegExp(
    `--${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}:\\s*([^;]+);`,
  );
  const match = css.match(re);
  if (!match) {
    throw new Error(`Custom property --${name} not found`);
  }
  return match[1].trim();
}

/** tokens.css declares every colour as a hex literal. */
function evideraTokenHex(name: string): string {
  return findCustomProperty(tokensCss, name);
}

/** Main.css's :root/.dark blocks declare colours as bare HSL triples. */
function mainCssColorAsRgb(
  css: string,
  name: string,
): [number, number, number] {
  return parseHslTripleToRgb(findCustomProperty(css, name));
}

function expectRgbCloseToHex(
  rgb: [number, number, number],
  hex: string,
  label: string,
) {
  const expected = hexToRgb(hex);
  rgb.forEach((channel, i) => {
    const diff = Math.abs(channel - expected[i]);
    expect(
      diff,
      `${label}: channel ${i} — got ${rgb.join(",")}, expected ~${expected.join(
        ",",
      )} (±${CHANNEL_TOLERANCE}) from tokens.css ${hex}`,
    ).toBeLessThanOrEqual(CHANNEL_TOLERANCE);
  });
}

function extractRootBlock(css: string): string {
  // The light-theme block: `@layer base { :root { ... } ...`. Grab just the
  // :root { ... } body (non-greedy up to its own closing brace).
  const match = css.match(/:root\s*\{([^}]*)\}/);
  if (!match) throw new Error(":root block not found in Main.css");
  return match[1];
}

function extractDarkBlock(css: string): string {
  const match = css.match(/\.dark\s*\{([^}]*)\}/);
  if (!match) throw new Error(".dark block not found in Main.css");
  return match[1];
}

const rootBlock = extractRootBlock(mainCss);
const darkBlock = extractDarkBlock(mainCss);

describe("Evidura token parity: Main.css light theme vs brand/evidura/tokens.css", () => {
  it("background (paper)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "background"),
      evideraTokenHex("evidura-paper"),
      "--background",
    );
  });

  it("foreground (ink)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "foreground"),
      evideraTokenHex("evidura-ink"),
      "--foreground",
    );
  });

  it("muted (paper-200)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "muted"),
      evideraTokenHex("evidura-paper-200"),
      "--muted",
    );
  });

  it("muted-foreground (slate)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "muted-foreground"),
      evideraTokenHex("evidura-slate"),
      "--muted-foreground",
    );
  });

  it("secondary / accent (signal)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "secondary"),
      evideraTokenHex("evidura-signal"),
      "--secondary",
    );
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "accent"),
      evideraTokenHex("evidura-signal"),
      "--accent",
    );
  });

  it("border/input (ink-100)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "border"),
      evideraTokenHex("evidura-ink-100"),
      "--border",
    );
  });

  it("destructive (band-critical)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "destructive"),
      evideraTokenHex("evidura-band-critical"),
      "--destructive",
    );
  });

  it("success (band-resilient)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "success"),
      evideraTokenHex("evidura-band-resilient"),
      "--success",
    );
  });

  it("warning (band-moderate == signal)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(rootBlock, "warning"),
      evideraTokenHex("evidura-band-moderate"),
      "--warning",
    );
  });
});

describe("Evidura token parity: Main.css dark theme vs brand/evidura/tokens.css", () => {
  it("background (ink)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(darkBlock, "background"),
      evideraTokenHex("evidura-ink"),
      ".dark --background",
    );
  });

  it("foreground (paper)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(darkBlock, "foreground"),
      evideraTokenHex("evidura-paper"),
      ".dark --foreground",
    );
  });

  it("muted (ink-700)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(darkBlock, "muted"),
      evideraTokenHex("evidura-ink-700"),
      ".dark --muted",
    );
  });

  it("border/input (ink-700)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(darkBlock, "border"),
      evideraTokenHex("evidura-ink-700"),
      ".dark --border",
    );
  });

  // The bug this file exists to catch: --muted-foreground had drifted to
  // "210 15% 65%" (#A6ADB8) instead of tokens.css's dark --evidura-muted
  // (#8FA3B8). tokens.css scopes that override to a `prefers-color-scheme`
  // media query rather than a class, so it can't be read with the same
  // findCustomProperty() helper — assert against the literal hex instead.
  it("muted-foreground matches tokens.css's dark --evidura-muted (#8FA3B8)", () => {
    expectRgbCloseToHex(
      mainCssColorAsRgb(darkBlock, "muted-foreground"),
      "#8FA3B8",
      ".dark --muted-foreground",
    );
  });
});

describe("Evidura rating-band ramp (Main.css @theme) vs tokens.css", () => {
  const bands = ["resilient", "moderate", "high", "critical"] as const;

  it.each(bands)("band-%s", (band) => {
    const mainHex = findCustomProperty(mainCss, `color-band-${band}`);
    const tokensHex = evideraTokenHex(`evidura-band-${band}`);
    expect(mainHex.toLowerCase()).toBe(tokensHex.toLowerCase());
  });
});
