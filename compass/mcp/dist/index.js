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
// ── Imports from the dfva library via node_modules symlink ──────────────────
// dfva-source → DFVA/dfva/ (symlink in node_modules)
// This avoids tsx path resolution issues with parent-directory traversal.
import { getAssessment, queryAssessments, crossProgramAnalysis, } from "dfva-source/source/report-store.js";
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
server.tool("get_assessment", "Get the full DFVA assessment for a single program, including all dimension scores, risk category, and recommendation.", {
    programCode: z.string().describe("Program code (e.g. mc-cs)"),
}, async ({ programCode }) => {
    const assessment = getAssessment(programCode);
    if (!assessment) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ error: `No assessment found for program code "${programCode}"` }, null, 2),
                },
            ],
        };
    }
    return {
        content: [{ type: "text", text: JSON.stringify(assessment, null, 2) }],
    };
});
// ── Tool: query_assessments ─────────────────────────────────────────────────
server.tool("query_assessments", "Query DFVA assessments with optional filters for faculty, risk category, score range, and result limit.", {
    faculty: z
        .string()
        .optional()
        .describe("Filter by faculty name (case-insensitive substring match)"),
    riskCategory: z
        .enum(["RESILIENT", "MODERATE RISK", "HIGH RISK", "CRITICAL"])
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
}, async ({ faculty, riskCategory, minScore, maxScore, limit }) => {
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
                text: JSON.stringify({ count: results.length, assessments: results }, null, 2),
            },
        ],
    };
});
// ── Tool: cross_program_analysis ────────────────────────────────────────────
server.tool("cross_program_analysis", "Get aggregate cross-program analysis including risk distribution, weakest dimension, average scores, and programs near the RESILIENT threshold.", {}, async () => {
    const analysis = crossProgramAnalysis();
    return {
        content: [{ type: "text", text: JSON.stringify(analysis, null, 2) }],
    };
});
// ── Tool: get_methodology ───────────────────────────────────────────────────
server.tool("get_methodology", "Get the full DFVA methodology document including scoring rubric, theoretical grounding, and pilot results.", {}, async () => {
    try {
        const methodology = readFileSync(METHODOLOGY_PATH, "utf-8");
        return {
            content: [{ type: "text", text: methodology }],
        };
    }
    catch (err) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ error: "Methodology document not found or unreadable" }, null, 2),
                },
            ],
        };
    }
});
// ── Tool: list_programs ─────────────────────────────────────────────────────
server.tool("list_programs", "List all program codes with their program names and risk categories.", {}, async () => {
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
                text: JSON.stringify({ count: programs.length, programs }, null, 2),
            },
        ],
    };
});
// ── Tool: get_report ───────────────────────────────────────────────────────
/**
 * Find the markdown report file for a program.
 * Reports follow the naming convention: dfva-recommend-{programCode}.md
 */
function findReportFile(programCode) {
    try {
        // Normalize: dashes in code stay, but search for matching files
        const files = readdirSync(REPORTS_DIR);
        const normalized = programCode.toLowerCase().replace(/_/g, "-");
        // Try exact match first
        let match = files.find((f) => f.toLowerCase() === `dfva-recommend-${normalized}.md`);
        // If no exact match, try loose match
        if (!match) {
            match = files.find((f) => f.toLowerCase().includes(normalized) && f.endsWith(".md"));
        }
        return match ? join(REPORTS_DIR, match) : null;
    }
    catch {
        return null;
    }
}
server.tool("get_report", "Get the full markdown improvement report for a program, including priority actions and score impact scenarios.", {
    programCode: z.string().describe("Program code (e.g. mc-cs)"),
}, async ({ programCode }) => {
    const reportPath = findReportFile(programCode);
    if (!reportPath) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ error: `No report found for program code "${programCode}"` }, null, 2),
                },
            ],
        };
    }
    try {
        const report = readFileSync(reportPath, "utf-8");
        return {
            content: [{ type: "text", text: report }],
        };
    }
    catch (err) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        error: `Unable to read report for "${programCode}"`,
                        path: reportPath,
                    }, null, 2),
                },
            ],
        };
    }
});
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
