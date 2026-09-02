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
  "src/compass/ImpactReportCard.tsx",
  "src/compass/ImpactReportDetail.tsx",
  "src/compass/InsightsPage.tsx",
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

export default tseslint.config(
  {
    ignores: [
      ".wasp/**",
      "node_modules/**",
      "src/compass/reportContent.ts",
      "src/compass/reportContent/**",
      "src/compass/data/dimensionEvidence.ts",
      // Retired report renderers; deleted by review item 12.
      "src/compass/v2/**",
      "src/compass/v3/**",
      "src/compass/v31/**",
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
    files: ["src/**/__tests__/**", "src/**/*.test.{ts,tsx}", "src/test/**"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  {
    files: legacyAny,
    rules: { "@typescript-eslint/no-explicit-any": "warn" },
  },
);
