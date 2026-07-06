#!/usr/bin/env node

/**
 * DFVA MCP Server
 * Exposes degree future-viability assessments to AI coding agents via MCP.
 *
 * Tools:
 *   get_assessment       — full assessment with all dimensions for one program
 *   query_assessments    — filtered query across all programs
 *   cross_program_analysis — aggregate risk distribution and trends
 *   get_methodology      — the DFVA scoring rubric and methodology
 *   list_programs        — all program codes with names
 *   get_report           — full markdown report for a program
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { resolveReportFile, type ReportResolution } from "./reportResolver.js";

// ── Imports from the dfva library via node_modules symlink ──────────────────
// dfva-source → DFVA/dfva/ (symlink in node_modules)
// This avoids tsx path resolution issues with parent-directory traversal.

import {
  getAssessment,
  queryAssessments,
  crossProgramAnalysis,
  listProgramCodes,
} from "dfva-source/source/report-store.js";

import type { ProgramAssessment, CrossProgramAnalysis } from "dfva-source/source/types.js";

// ── Path resolution ────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const DFVA_ROOT = join(__dirname, "..", "..", ".."); // compass/mcp/src → DFVA root
const REPORTS_DIR = join(DFVA_ROOT, "reports");
const METHODOLOGY_PATH = join(DFVA_ROOT, "docs", "dfva-methodology.md");

// ── MCP Server ─────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "dfva-mcp-server",
  version: "0.1.0",
});

// ── Tool: get_assessment ────────────────────────────────────────────────────

server.registerTool(
  "get_assessment",
  {
    description:
      "Get the full DFVA assessment for a single program, including all dimension scores, risk category, and recommendation.",
    inputSchema: {
      programCode: z.string().min(2).describe("Program code (e.g. mc-cs)"),
    },
  },
  async ({ programCode }) => {
    const assessment = getAssessment(programCode);
    if (!assessment) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { error: `No assessment found for program code "${programCode}"` },
              null,
              2
            ),
          },
        ],
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(assessment, null, 2) }],
    };
  },
);

// ── Tool: query_assessments ─────────────────────────────────────────────────

server.registerTool(
  "query_assessments",
  {
    description:
      "Query DFVA assessments with optional filters for faculty, risk category, score range, and result limit.",
    inputSchema: {
      faculty: z
      .string()
      .optional()
      .describe("Filter by faculty name (case-insensitive substring match)"),
    riskCategory: z
      .enum(["RESILIENT", "MODERATE RISK", "HIGH RISK", "CRITICAL", "NOT RATABLE"])
      .optional()
      .describe("Filter by risk category"),
    minScore: z
      .number()
      .min(0)
      .max(36)
      .optional()
      .describe("Minimum overall score (inclusive)"),
    maxScore: z
      .number()
      .min(0)
      .max(36)
      .optional()
      .describe("Maximum overall score (inclusive)"),
    limit: z
      .number()
      .int()
      .min(1)
      .optional()
      .describe("Maximum number of results to return"),
    },
  },
  async ({ faculty, riskCategory, minScore, maxScore, limit }) => {
    const results = queryAssessments({
      faculty,
      riskCategory,
      minScore,
      maxScore,
      limit,
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { count: results.length, assessments: results },
            null,
            2
          ),
        },
      ],
    };
  },
);

// ── Tool: cross_program_analysis ────────────────────────────────────────────

server.registerTool(
  "cross_program_analysis",
  {
    description:
      "Get aggregate cross-program analysis including risk distribution, weakest dimension, average scores, and programs near the RESILIENT threshold.",
    inputSchema: {},
  },
  async () => {
    const analysis: CrossProgramAnalysis = crossProgramAnalysis();
    return {
      content: [{ type: "text", text: JSON.stringify(analysis, null, 2) }],
    };
  },
);

// ── Tool: get_methodology ───────────────────────────────────────────────────

server.registerTool(
  "get_methodology",
  {
    description:
      "Get the full DFVA methodology document including scoring rubric, theoretical grounding, and pilot results.",
    inputSchema: {},
  },
  async () => {
    try {
      const methodology = readFileSync(METHODOLOGY_PATH, "utf-8");
      return {
        content: [{ type: "text", text: methodology }],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { error: "Methodology document not found or unreadable" },
              null,
              2
            ),
          },
        ],
      };
    }
  },
);

// ── Tool: list_programs ─────────────────────────────────────────────────────

server.registerTool(
  "list_programs",
  {
    description:
      "List all program codes with their program names and risk categories.",
    inputSchema: {},
  },
  async () => {
    const all = queryAssessments({});
    const programs = all.map((a) => ({
      programCode: a.programCode,
      programName: a.programName,
      faculty: a.faculty,
      riskCategory: a.riskCategory,
      overallScore: a.overallScore,
    }));
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { count: programs.length, programs },
            null,
            2
          ),
        },
      ],
    };
  },
);

// ── Tool: get_report ───────────────────────────────────────────────────────

server.registerTool(
  "get_report",
  {
    description:
      "Get the full markdown improvement report for a program, including priority actions and score impact scenarios.",
    inputSchema: {
      programCode: z.string().min(2).describe("Program code (e.g. mc-cs)"),
    },
  },
  async ({ programCode }) => {
    // Only known program codes — prevents an arbitrary substring from
    // matching an unrelated markdown file in reports/.
    const knownCodes = listProgramCodes();
    const normalized = programCode.toLowerCase().replace(/_/g, "-");
    if (!knownCodes.some((c) => c.toLowerCase() === normalized)) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: `Unknown program code "${programCode}" — use list_programs for valid codes`,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    let resolution: ReportResolution;
    try {
      resolution = resolveReportFile(programCode, readdirSync(REPORTS_DIR));
    } catch {
      resolution = { kind: "not-found" };
    }

    if (resolution.kind === "ambiguous") {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: `Program code "${programCode}" matches multiple reports — use a more specific code`,
                candidates: resolution.candidates,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (resolution.kind === "not-found") {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { error: `No report found for program code "${programCode}"` },
              null,
              2
            ),
          },
        ],
      };
    }

    const reportPath = join(REPORTS_DIR, resolution.file);

    try {
      const report = readFileSync(reportPath, "utf-8");
      return {
        content: [{ type: "text", text: report }],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: `Unable to read report for "${programCode}"`,
                path: reportPath,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  },
);

// ── Start the server ────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Log to stderr so stdout (the MCP transport) stays clean
  console.error("DFVA MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error starting DFVA MCP server:", err);
  process.exit(1);
});
