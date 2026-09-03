# Conventions & Patterns

## Market reports — §3 must be sourced

`reports/dfva-market-*.md` §3 CURRENT DISCUSSION SIGNALS must **declare its sources** and
**attribute each theme** (outlet, commentator or study, with a date where one exists;
3+ attributions section-wide AND at least one per `### Theme` heading). Scope each claim to
what its source measured. Enforced by `dfva:report-lint`, which runs in CI.

Never describe discourse as if sampled from X or LinkedIn when what was consulted was
trade press quoting those platforms' data. If a platform genuinely was sampled, state
which, over what window, and how many items. Source-quality ranking:
[docs/dfva-v4-agent-harness.md](../../docs/dfva-v4-agent-harness.md).

## Shared page copy

`V4ReportPage.tsx` renders every v4 program: no discipline names, framework names, item
counts, or lever ranges hardcoded — derive from data or keep in per-program report
markdown. Caveats added to one sub-scale go to both.

## Generated files

See "Do Not Touch" in [gotchas.md](gotchas.md). Edit `reports/*.md` and `dfva/source/`,
then regenerate.
