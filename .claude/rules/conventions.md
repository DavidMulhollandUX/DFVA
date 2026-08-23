# Conventions & Patterns

## Naming
- Files: camelCase
- Functions: Check source files for convention


## Error Handling
- Check source for error handling patterns

## Auth Pattern
- Check middleware/ or auth/ folders



## Testing Approach
- No test script detected


## Market reports — §3 must be sourced

`reports/dfva-market-*.md` §3 CURRENT DISCUSSION SIGNALS must **declare its sources** and
**attribute each theme** (outlet, commentator or study, with a date where one exists;
3+ attributions section-wide AND at least one per `### Theme` heading — a section can
clear the total while its most quotable theme rests on nothing). Scope each claim to
what its source measured (a survey about AI screening is not a claim about AI
interviews). Enforced by `dfva:report-lint`, which runs in CI.

Shared insights-page copy (`V4ReportPage.tsx` renders every v4 program): no discipline
names, framework names, item counts, or lever ranges hardcoded — derive from data or
keep in per-program report markdown. Caveats added to one sub-scale go to both. Full
rules: [docs/dfva-v4-agent-harness.md](../../docs/dfva-v4-agent-harness.md).

Never describe discourse as if sampled from X or LinkedIn when what was consulted was
trade press quoting those platforms' data — those are different claims and usually only
the second is true. If a platform genuinely was sampled, state which, over what window,
and how many items. Full guidance and the source-quality ranking:
[docs/dfva-v4-agent-harness.md](../../docs/dfva-v4-agent-harness.md).

## Generated files
- Never hand-edit `compass/app/src/compass/reportContent*.ts` or the app's `data/dimensionEvidence.ts` — they are generated. Edit `reports/*.md` / `dfva/source/` and run `npm --prefix scripts run dfva:gen-content` (content) or `dfva:gen` (rubric/prompts).

## Code Style Notes



