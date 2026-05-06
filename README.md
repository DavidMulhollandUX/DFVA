# DFVA Skill Package

This repository contains a reusable VS Code DFVA skill package for running Degree Future-Viability Assessor (DFVA) reports.

It includes implemented slash commands for both GitHub Copilot Chat and Continue so you can run DFVA as `/dfva`, generate market signals as `/dfva-market`, and generate post-assessment recommendations with `/dfva-recommend`.

## Included

- `.github/copilot-instructions.md`: The DFVA instruction contract loaded by Copilot Chat in this workspace.
- `.github/prompts/dfva.prompt.md`: Native Copilot prompt file slash command (`/dfva`).
- `.github/prompts/dfva-market.prompt.md`: Native Copilot prompt file slash command (`/dfva-market`).
- `.github/prompts/dfva-recommend.prompt.md`: Native Copilot prompt file slash command (`/dfva-recommend`).
- `.continue/prompts/dfva.md`: Continue slash command prompt file for `/dfva`.
- `.continue/prompts/dfva-market.md`: Continue slash command prompt file for `/dfva-market`.
- `.continue/prompts/dfva-recommend.md`: Continue slash command prompt file for `/dfva-recommend`.
- `.continue/config.json`: Continue repo config registering `dfva`, `dfva-market`, and `dfva-recommend` slash commands.
- `reports/`: Output directory for generated report markdown files.
- Source reference document:
  - `Act as a prompt engineer, I want to turn this work.md`

## Copilot Slash Command

1. Open GitHub Copilot Chat in this workspace.
2. Type `/dfva` and select the prompt file command.
3. Provide program URL, code, or description when prompted.

Example:

```text
/dfva
https://handbook.unimelb.edu.au/2025/courses/b-des
Save the full report as reports/dfva-b-des.md
```

If `/dfva` is not listed immediately, reload the VS Code window once.

## Copilot Market Command

1. Type `/dfva-market` and select the prompt file command.
2. Provide program URL, code, or description.

Example:

```text
/dfva-market
https://handbook.unimelb.edu.au/2025/courses/b-des
Save output as reports/dfva-market-b-des.md
```

## Copilot Recommendation Command

1. Run or paste a completed DFVA report.
2. Type `/dfva-recommend` and select the prompt file command.
3. Paste the full DFVA markdown report when prompted.

Example:

```text
/dfva-recommend
[paste full DFVA report markdown]
Save the output as reports/dfva-recommend-b-des.md
```

## Continue Slash Command

1. Install the Continue extension in VS Code.
2. Open Continue chat in this workspace.
3. Run the command:

```text
/dfva https://handbook.unimelb.edu.au/2025/courses/b-des
```

4. Optional save instruction:

```text
/dfva https://handbook.unimelb.edu.au/2025/courses/b-des
Save the full report as reports/dfva-b-des.md
```

If Continue does not immediately detect the command, reload the VS Code window once.

## Continue Market Command

```text
/dfva-market https://handbook.unimelb.edu.au/2025/courses/b-des
```

Optional save instruction:

```text
/dfva-market https://handbook.unimelb.edu.au/2025/courses/b-des
Save output as reports/dfva-market-b-des.md
```

## Recommended Workflow

1. Run `/dfva` to produce the baseline DFVA report.
2. Run `/dfva-market` to generate market intelligence signals (job families, recent hiring signals, and X themes).
3. Run `/dfva-recommend` and paste the DFVA report plus market scan to produce an evidence-linked implementation plan.

Example sequence:

```text
/dfva https://handbook.unimelb.edu.au/2025/courses/b-des
/dfva-market https://handbook.unimelb.edu.au/2025/courses/b-des
/dfva-recommend [paste dfva report + market output]
Save the output as reports/dfva-recommend-b-des.md
```

## Continue Recommendation Command

```text
/dfva-recommend [paste full DFVA report markdown]
```

Optional save instruction:

```text
/dfva-recommend [paste full DFVA report markdown]
Save the output as reports/dfva-recommend-b-des.md
```

## Quick Start

1. Open this folder in VS Code.
2. Ensure GitHub Copilot Chat is installed and enabled.
3. Open chat and run a prompt such as:

```text
Run DFVA on https://handbook.unimelb.edu.au/2025/courses/b-des
Return the result in full markdown and save it as reports/dfva-b-des.md
```

## Recommended Prompt Templates

Single program:

```text
Run DFVA on [PROGRAM URL].
Follow the DFVA report contract exactly and include score total and risk band.
Save output to reports/dfva-[course-code].md.
```

Multiple programs:

```text
Run DFVA on each URL below and produce one report per program in reports/.
After all reports, add a head-to-head table of the dimensions with largest score gaps.
- [URL 1]
- [URL 2]
- [URL 3]
```

## Acceptance Checklist

Use this checklist to validate output quality:

- All 8 required report sections are present in the required order.
- Scorecard includes 10 dimensions plus bonus and a total out of 36.
- Risk band matches score range.
- Threshold questions are answered as YES, NO, or UNCERTAIN with rationale.
- Justifications include curriculum evidence (unit/module references when available).
- Verdict is direct and does not avoid conclusion with generic hedge language.
- Report includes metadata: date, source URL(s), and prompt version.

## Maintenance

- Prompt version in use: `DFVA-COPILOT-SKILL-v1`
- Review cadence: every 3-6 months to refresh AI capability assumptions and labor market signals.
- If changing rubric semantics, update both instruction and this README in one commit.
