# Evidura Operating Cadence & System Workflows

## 1. Operating Cadence

| Cadence | Focus | Deliverables |
|---|---|---|
| **Daily / Standup** | Blocker triage, active scraping runs, queue monitoring | Queue throughput, error logs, unblocking commands |
| **Sprint / Weekly** | Milestone delivery, report generation, UI/DB migrations | Updated `reports/`, new feature PRDs, verification audits |
| **Strategic / Monthly** | Hypothesis validation, commercialisation milestones, governance | Venture scorecard, council briefing updates, risk matrix |

---

## 2. Cross-Functional Pipelines

### Pipeline A: Handbook Evidence Capture & Scraping
1. **University of Melbourne (UoM)**:
   - Run paced Chrome capture: `python3 scripts/v4-capture-antigravity.py 1 --only "<codes>"`
   - Check status: `python3 scripts/v4-capture-queue.py status`
   - Unblock if challenged: `python3 scripts/v4-capture-queue.py unblock`
2. **Go8 Crawl4AI Pipeline**:
   - Discover: `~/.venv-crawl4ai-uv/bin/python3 scripts/scrape-go8-handbooks.py discover <unikey>`
   - Scrape: `~/.venv-crawl4ai-uv/bin/python3 scripts/scrape-go8-handbooks.py scrape <unikey>`
   - Status: `~/.venv-crawl4ai-uv/bin/python3 scripts/scrape-go8-handbooks.py status`

### Pipeline B: Report Content Generation & Check
1. Canonical reports authored in `reports/*.md`.
2. Generate TypeScript bundle: `npm --prefix scripts run dfva:gen-content`
3. Validate parity & schema: `npm --prefix scripts run dfva:check`

### Pipeline C: Full-Stack Web Application (Wasp)
1. Start database container: `scripts/dev-db.sh start`
2. Run Prisma migrations: `npx prisma migrate dev --schema compass/app/.wasp/out/db/schema.prisma`
3. Launch client (3000) & server (3001): `cd compass/app && wasp start`

### Pipeline D: Agent-First Interface (MCP)
1. Run MCP server: `cd compass/mcp && npm run dev`
2. Available tools: `get_assessment`, `query_assessments`, `cross_program_analysis`, `get_methodology`, `list_programs`, `get_report`.
