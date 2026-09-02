import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { REPORT_CONTENT } from "../reportContent";
import {
  preserveLabelLineBreaks,
  splitSections,
} from "../v2/components/ReportMarkdownCard";
import { V4_AUTHORED } from "../v4/authoredSections";
import { V4_PANEL_C, V4_RESEARCH_DEGREES } from "../v4/data/v4PanelC";
import {
  V4R_FINDING,
  V4R_LIMITS,
  V4R_MARKET,
} from "../v4/report/ResearchReport";

/**
 * The v4 page renders markdown bodies from four report families, each through
 * a section filter. Everything that reaches a reader through that path must be
 * free of v1 instrument vocabulary. The archived v1 pages (ReportDetailPage)
 * are the only place that vocabulary is allowed, and the v4 page links to them
 * rather than importing them — the second describe pins that.
 */
// "v1 composite" as a phrase is allowed: v4r §2 names it as what is omitted.
const V1_VOCABULARY =
  /\b\d{1,2}\/36\b|\b(MODERATE|HIGH|LOW) RISK\b|\bRESILIENT\b/;

type Pass = (title: string) => boolean;
const ALL: Pass = () => true;
const V4R_ANY: Pass = (t) => V4R_FINDING(t) || V4R_MARKET(t) || V4R_LIMITS(t);

/** slug → the section filter the v4 page applies to it. Mirrors MarketPart,
 *  LabourMarketCard and ResearchReport. */
function renderedSlugs(): Array<[string, Pass]> {
  const out: Array<[string, Pass]> = [];
  for (const code of Object.keys(V4_PANEL_C)) {
    out.push([`dfva-v4-${code}`, V4_AUTHORED]);
    out.push([`dfva-v4-recommend-${code}`, ALL]);
    out.push([`dfva-market-${code}`, ALL]);
  }
  for (const code of V4_RESEARCH_DEGREES) {
    out.push([`dfva-v4r-${code}`, V4R_ANY]);
    out.push([`dfva-market-${code}`, ALL]);
  }
  return out.filter(([slug]) => slug in REPORT_CONTENT);
}

describe("every markdown body the v4 page renders is free of v1 vocabulary", () => {
  const slugs = renderedSlugs();

  it("covers the whole rendered corpus", () => {
    expect(slugs.length).toBeGreaterThan(100);
    expect(slugs.some(([s]) => s.startsWith("dfva-v4r-"))).toBe(true);
  });

  for (const [slug, filter] of slugs) {
    it(slug, () => {
      const sections = splitSections(
        preserveLabelLineBreaks(REPORT_CONTENT[slug].markdown),
      ).filter((s) => filter(s.title));
      for (const s of sections) {
        const m = s.body.match(V1_VOCABULARY);
        expect(m, `${slug} §${s.title}: "${m?.[0]}"`).toBeNull();
      }
    });
  }
});

const V4_DIR = join(__dirname, "..", "v4");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.tsx?$/.test(name) && !name.endsWith(".test.ts") ? [p] : [];
  });
}

const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

describe("the v4 render path never loads a v1 recommend body", () => {
  // dfva-recommend-* is exempt from the N/36 ban in check-report-format.ts
  // because it renders only on the archived page. This is the assertion that
  // keeps that exemption honest.
  for (const f of sourceFiles(V4_DIR)) {
    it(relative(V4_DIR, f), () => {
      const body = stripComments(readFileSync(f, "utf8"));
      expect(body).not.toMatch(/["'`]dfva-recommend-/);
    });
  }
});
