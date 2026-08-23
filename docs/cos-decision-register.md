# Evidura Chief of Staff — Executive Decision Register (ADRs & Strategic Choices)

> **Governance Note**: Every major architectural, methodological, commercial, or brand decision is recorded here with context, alternatives considered, trade-offs, refutation triggers, and outcome reviews.

---

## Decision Schema
Each entry follows this structure:
- **ID**: `DEC-YYYYMMDD-XX`
- **Title**: Short descriptive title
- **Status**: `PROPOSED` | `ACCEPTED` | `SUPERSEDED` | `REJECTED`
- **Date**: YYYY-MM-DD
- **Deciders / Stakeholders**: David Mulholland (Founder), Chief of Staff, Collaborators
- **Context & Drivers**: What problem prompted this decision?
- **Decision Taken**: What was agreed?
- **Alternatives Considered**: Options evaluated and why they were declined
- **Second-Order Implications**: Downstream impacts on product, brand, data, or commercials
- **Refutation Trigger ("We are wrong if...")**: What future evidence would force revisiting this?
- **Review Date**: Target audit date

---

## Active & Historical Decisions

### DEC-20260601-01: Master Brand Selection — Evidura replacing COMPASS
- **Status**: `ACCEPTED`
- **Date**: 2026-06-01
- **Deciders**: David Mulholland
- **Context & Drivers**: "COMPASS" is generic, highly crowded in Australian higher-ed, and difficult to trademark. Need a distinct, authoritative master brand.
- **Decision Taken**: Adopt **Evidura** (`evidura.ai`) as master brand; adopt **Durability Rating™** as the consumer-facing signal; retain **DFVA™** as internal methodology name.
- **Alternatives Considered**: COMPASS (working title), Veracity, CurricuMetric, Durafy.
- **Second-Order Implications**: Public marketing copy must never expose "DFVA"; assets created under `brand/evidura/`; trademark clearance in Nice classes 9, 35, 41, 42.
- **Refutation Trigger**: Trademark search reveals blocking conflicts in Nice Class 42 in Australia.
- **Review Date**: Prior to commercial public launch.

### DEC-20260615-01: UoM Handbook Capture Architecture — Human-Paced Browser Queue
- **Status**: `ACCEPTED`
- **Date**: 2026-06-15
- **Deciders**: David Mulholland, Engineering Team
- **Context & Drivers**: UoM handbook anti-bot defense trips Cloudflare/Imperva against automated HTTP scrapers (Crawl4AI), returning "Pardon Our Interruption".
- **Decision Taken**: Build a browser-based human-paced queue (`scripts/v4-capture-antigravity.py` / `scripts/v4-capture-queue.py`) running at 20–30s delay with automated challenge detection and circuit breaker.
- **Alternatives Considered**: Headless Puppeteer cluster with proxy rotation (expensive, high risk of IP block), manual copy-paste (too slow for 18+ programs).
- **Second-Order Implications**: UoM data capture must be executed in managed batches; Go8 scraping remains on Crawl4AI as Go8 handbooks have no anti-bot measures.
- **Refutation Trigger**: UoM changes handbook UI structure breaking DOM parsers.
- **Review Date**: 2026-09-01.

### DEC-20260701-01: Agent-First Architecture — Dedicated MCP Interface
- **Status**: `ACCEPTED`
- **Date**: 2026-07-01
- **Deciders**: David Mulholland, Engineering Team
- **Context & Drivers**: Enabling AI agents to query curriculum durability metrics programmatically accelerates faculty consulting and automated reporting.
- **Decision Taken**: Implement `compass/mcp` (`dfva-mcp`) with 6 core tools (`get_assessment`, `query_assessments`, `cross_program_analysis`, `get_methodology`, `list_programs`, `get_report`).
- **Alternatives Considered**: REST API with JWT auth only (higher client implementation friction for agents).
- **Second-Order Implications**: MCP server must stay in parity with Wasp database schema and canonical markdown reports.
- **Refutation Trigger**: MCP spec version deprecation or schema drift between `reports/*.md` and MCP output.
- **Review Date**: Ongoing with Wasp updates.
