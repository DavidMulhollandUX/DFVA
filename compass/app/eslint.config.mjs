// ESLint for compass/app. Prettier owns formatting; this file owns correctness.
// The `legacyAny` list is a ratchet: files that carried explicit `any` when
// the rule was introduced (2026-09-02). Remove a file from the list once its
// `any`s are gone. Never add to it.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

const legacyAny = [
  "src/admin/layout/Sidebar.tsx",
  "src/analytics/providers/googleAnalyticsUtils.ts",
  "src/analytics/stats.ts",
  "src/client/components/CurriculumMap.tsx",
  "src/client/components/cookie-consent/Config.ts",
  "src/compass/FragilityDashboardPage.tsx",
  "src/compass/ReportDetailPage.tsx",
  "src/compass/TrustPage.tsx",
  "src/compass/WhyStructuredDataPage.tsx",
  "src/compass/batchFetchRound2.ts",
  "src/compass/components/ApiKeyManager.tsx",
  "src/compass/handbookFetcher.ts",
  "src/compass/marketDrift.ts",
  "src/compass/mockAssessmentService.ts",
  "src/compass/openaiLlmScorer.ts",
  "src/compass/operations.ts",
  "src/compass/realAssessmentService.ts",
  "src/compass/seedCourseLeafAnalyticsResponse.ts",
  "src/compass/t1/operations.ts",
  "src/compass/useReportsData.ts",
  "src/compass/v4/data/v4PanelC.ts",
  "src/shared/utils.ts",
];

// Relative forms only: `**/operations` would also match the legitimate
// `wasp/client/operations` import.
const serverOnlyImports = [
  {
    group: ["wasp/server", "wasp/server/*", "@prisma/client"],
    message: "server-only; use wasp/client/operations",
  },
  {
    group: [
      "./operations",
      "../**/operations",
      "**/*Service",
      "**/openaiLlmScorer",
      "**/handbookFetcher",
    ],
    message: "server-only; use wasp/client/operations",
  },
];

export default tseslint.config(
  {
    ignores: [
      ".wasp/**",
      "node_modules/**",
      "src/compass/reportContent.ts",
      "src/compass/reportContent/**",
      "src/compass/data/dimensionEvidence.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{ts,tsx,mts,mjs}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      // React Compiler-derived rules: advisory until the codebase is migrated.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
    },
  },
  {
    // Import boundary 1 (2026-09-02): client pages must not pull server-only
    // modules into the browser bundle. Trips zero files today, so it starts
    // at "error" with no ratchet list; add one only for a real hit.
    files: ["src/compass/*.tsx", "src/client/**", "src/landing-page/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: serverOnlyImports }],
    },
  },
  {
    // Import boundary 2: the v4 page family links to the archived v1
    // renderers, never imports them. Flat config replaces rule options rather
    // than merging them, so this block restates boundary 1 for v4 files.
    files: ["src/compass/v4/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            ...serverOnlyImports,
            {
              group: ["**/ReportDetailPage", "**/ReportsPage"],
              message: "archived v1 renderer; v4 links to it, never imports it",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/__tests__/**", "src/**/*.test.{ts,tsx}", "src/test/**"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  {
    files: legacyAny,
    rules: { "@typescript-eslint/no-explicit-any": "warn" },
  },
);
