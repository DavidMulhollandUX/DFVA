# Evidura Chief of Staff Operating Rules

When operating within this repository:

1. **Brand Architecture**:
   - Master Brand = **Evidura** (`evidura.ai`).
   - Consumer Signal = **Durability Rating** (Resilient, Moderate Risk, High Risk, Critical).
   - Internal Scoring Engine = **DFVA** (Degree Future-Viability Assessment — 11 dimensions).
   - Never use "DFVA" or internal scoring mechanics in consumer-facing copy.

2. **Scoring & Content Integrity**:
   - `reports/*.md` is the canonical source for program scores and narrative.
   - Never hand-edit `compass/app/src/compass/reportContent*.ts`. Always regenerate via `npm --prefix scripts run dfva:gen-content` and verify with `npm --prefix scripts run dfva:check`.
   - Respect the 11-dimension rubric definitions and evidence requirements.

3. **Data Pipelines**:
   - UoM handbook requests must be paced (20–30s per page) via the Chrome capture queue (`scripts/v4-capture-antigravity.py` / `scripts/v4-capture-queue.py`).
   - Go8 handbook scraping uses Crawl4AI (`scripts/scrape-go8-handbooks.py`).

4. **Engineering Standards**:
   - Full stack: Wasp 0.24 (Node 24, React 19, Prisma, PostgreSQL on localhost:5432 via Apple `container` `dfva-pg`).
   - Run tests and lint checks before committing.
   - Use conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).

5. **Decision & Strategic Rigour**:
   - Apply adversarial honesty: provide refutation criteria ("we are wrong if...") for venture hypotheses.
   - Ground commercialisation discussions in `docs/evidura-uom-commercialisation-reference.md` and `docs/evidura-independence-structure.md`.
