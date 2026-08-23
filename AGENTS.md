# AGENTS.md

Cross-tool entry point. Antigravity, Codex, Goose, Cursor and anything else that
reads `AGENTS.md` should start here. Claude Code reads `CLAUDE.md`, which covers
the same ground in more detail.

This file **routes**; it does not restate. Anything duplicated here would drift
from the source it was copied from, so read the files it points at.

## What this is

DFVA (Degree Future-Viability Assessment) scores University of Melbourne degree
programs against AI labour-market disruption. Evidura is the brand; COMPASS is
the retired working name. The web app is `compass/app` (Wasp 0.24 + React 19 +
Prisma/PostgreSQL). Assessment reports are markdown in `reports/`.

## Read these before changing anything

| File | Covers |
|---|---|
| `CLAUDE.md` | Project overview, quick start, the report pipeline |
| `.claude/rules/architecture.md` | Folder map, data flow, **source-of-truth map** |
| `.claude/rules/stack.md` | Every command |
| `.claude/rules/gotchas.md` | Quirks that will cost you a cycle |
| `.claude/rules/conventions.md` | Naming, and the market §3 sourcing rule |
| `docs/dfva-report-section-authoring.md` | How to author market §3 and v4 §4/§5 |

## The rule most likely to be broken

**Never hand-edit a generated file.** `compass/app/src/compass/reportContent*.ts`,
`compass/app/.wasp/out/**`, `dfva/dist/**`, `.github/copilot-instructions.md`,
`.continue/prompts/dfva.md` and both copies of the report-review skill are all
generated. Edit the source and regenerate. CI fails on hand-edits.

The source-of-truth map in `.claude/rules/architecture.md` says which source
produces which artifact.

## Report authoring

Reports are evidence documents read by faculty leadership. **Never add a fact,
name, number, date, quote or citation the source does not state.** If there is
no source, say so or cut the claim — do not invent one to make a sentence look
sourced.

The rules are in the `dfva-report-review` skill, at `.agents/skills/` and
`.claude/skills/`, and are condensed into `.github/copilot-instructions.md` and
`.continue/prompts/dfva.md`. All four come from
`dfva/source/blocks/report-review.md`.

They are enforced mechanically, whatever tool you are:

```bash
npm --prefix scripts run dfva:report-lint    # structure and sourcing
npm --prefix scripts run dfva:report-prose   # prose and provenance
npm --prefix scripts run dfva:gen-content    # reports/*.md -> app modules
npm --prefix scripts run dfva:check          # full guard, runs in CI
```

Background on why the prose gate exists:
[docs/dfva-v4-report-prose-audit.md](docs/dfva-v4-report-prose-audit.md).

## Conventions

- Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- Australian English, and the serial comma is deliberately omitted
- Test before committing, lint before pushing
- Postgres runs via Apple's `container` CLI, not Docker — see `gotchas.md`

## Working alongside other agents

This repo is often worked by more than one agent at once, sometimes in the same
checkout. Two things that have actually gone wrong:

- `git checkout -b` in a shared working tree moves `HEAD` for every agent using
  it. Take a worktree instead — `.claude/worktrees/` already holds several.
- Concurrent `git` operations can clear your index between `git add` and
  `git commit`. Stage and commit in one invocation, and check what actually
  landed rather than trusting an exit code.
