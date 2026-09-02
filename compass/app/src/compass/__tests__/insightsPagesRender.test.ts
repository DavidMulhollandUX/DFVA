/**
 * Server-render smoke tests for the two insights pages rewritten in
 * c4f993cc without tests. They run in the node environment: react-router's
 * MemoryRouter supplies params and links, and renderToString exercises every
 * derivation on the real v4 data.
 */
import { createElement, type ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import FacultyDashboard from "../FacultyDashboard";
import PortfolioHealthPage from "../PortfolioHealthPage";
import { facultySlug } from "../faculty";
import { v4PortfolioRows } from "../v4/portfolioStats";

function renderAt(path: string, pattern: string, page: () => ReactElement) {
  return unescape(
    renderToString(
      createElement(
        MemoryRouter,
        { initialEntries: [path] },
        createElement(
          Routes,
          null,
          createElement(Route, { path: pattern, element: createElement(page) }),
        ),
      ),
    ),
  );
}

/** renderToString escapes "&"; compare against the text a reader sees. */
const unescape = (html: string) =>
  html.replace(/&amp;/g, "&").replace(/&#x27;/g, "'");

const headings = (html: string, level: number) =>
  html.match(new RegExp(`<h${level}[\\s>]`, "g"))?.length ?? 0;

describe("PortfolioHealthPage", () => {
  const html = renderAt(
    "/insights/portfolio",
    "/insights/portfolio",
    PortfolioHealthPage,
  );

  it("renders one h1 and its sections as h2", () => {
    expect(headings(html, 1)).toBe(1);
    expect(headings(html, 2)).toBeGreaterThanOrEqual(4);
  });

  it("leaks no empty derivations", () => {
    expect(html).not.toMatch(/NaN|undefined|\[object Object\]/);
  });
});

describe("FacultyDashboard", () => {
  const rows = v4PortfolioRows().filter((r) => r.assessed && r.faculty);
  const faculty = rows[0]?.faculty as string;

  it("lists every faculty on the index", () => {
    const html = renderAt(
      "/insights/faculty",
      "/insights/faculty/:facultySlug?",
      FacultyDashboard,
    );
    const faculties = new Set(rows.map((r) => r.faculty));
    for (const f of faculties) expect(html).toContain(f as string);
    expect(html).not.toMatch(/NaN|undefined/);
  });

  it("renders a faculty detail with links to its assessed programs", () => {
    const slug = facultySlug(faculty);
    const html = renderAt(
      `/insights/faculty/${slug}`,
      "/insights/faculty/:facultySlug?",
      FacultyDashboard,
    );
    expect(html).toContain(faculty);
    const own = rows.filter((r) => r.faculty === faculty);
    for (const r of own.slice(0, 3))
      expect(html).toContain(`/reports/${r.code}`);
    expect(html).not.toMatch(/NaN|undefined/);
  });
});
