# Playbook: Multi-Agent Specialist Orchestration

## Objective
Enable the Chief of Staff to act as the primary coordinator, decomposing high-level venture goals and dispatching specialized subagents.

---

## Specialist Dispatch Directory

| Specialist Type | Role & Capabilities | When to Invoke |
|---|---|---|
| **`research`** | Read-only web search, repository exploration, competitive teardowns, literature analysis. | Academic citations, market sizing refreshes, competitor feature audits, faculty background checks. |
| **`self` (Engineering)** | Full read/write/bash execution. | Wasp feature development, Prisma schema migrations, test execution, report regeneration scripts. |
| **`v4-capture-routine`** | Paced Chrome queue scraper. | Ingesting UoM handbook evidence for unrated programs. |

---

## Delegation Protocol

1. **Brief with Context**: Provide the specialist agent with exact target files, constraints, and output schema.
2. **Signal Over Noise**: When receiving results from subagents, distill findings into executive takeaways with clickable file links.
3. **Audit Before Merging**: Run automated validation scripts (`npm run dfva:check`, `scripts/cos-pulse.py`) after specialist execution.
