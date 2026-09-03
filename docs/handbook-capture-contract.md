# Handbook capture contract

Moved from `CLAUDE.md` on 2026-09-03 so the project instructions every agent loads stay
short. The rules below are unchanged and still binding.

## The contract

**The requirement is the contract below, not a particular tool.** Any method that gets the page
text is acceptable — what matters is where it lands.

1. **Captured text MUST land in a versioned file under `data/`.** Never leave it only in
   `compass/app/.handbook-cache/`: that path is gitignored, and it is why the June-2026 batch of
   74 "ready to score" courses evaporated to 9 on a fresh clone. Capture that exists on one
   machine cannot be re-examined, re-scored, or audited.
2. **A record needs `code`, `url`, `success`, the page text, and when it was captured.** Two
   shapes are already in use: `{code, url, success, markdown, length, scraped_at}` in
   `data/handbook_data.json`, and a structured-extraction shape
   (`{code, name, url, success, study_level_type, aqf_level, duration, text}`) in
   `data/handbook_doctorate_data.json`. Either is fine; `dfva:capture-check` reads both.
3. **≥2,000 characters**, or the program must carry `evidenceConfidence: "low"` in
   `sharedProgramData.ts`. See the note on sparse pages below.

```bash
python3 scripts/build-capture-queue.py       # rebuild data/capture_queue.json (the work list)
python3 scripts/cyclical_scrape.py --dry-run # what would be captured next; no network needed
npm --prefix scripts run dfva:capture-check  # assert every scored program is capture-backed
```

### What has actually been used

| Store | Method | Notes |
|---|---|---|
| `data/handbook_doctorate_data.json` | agent-driven browser (Claude in Chrome) | structured extraction; no script in this repo produces this shape |
| `data/handbook_discovered.json` | `scripts/discover_courses.py` — AppleScript + real Chrome | its docstring calls this "the only reliable Imperva/Incapsula bypass as of June 2026"; macOS-only, one page per run |
| `data/handbook_data.json` | crawl4ai (`cyclical_scrape.py`, `scrape_handbooks.py`) | 23 records stamped 2026-07-01 and **none since** — treat crawl4ai as a fallback that worked on one day, not a standing capability |

The ingest step for browser-captured text is currently manual — there is no script that writes it
into `data/`. Do that write deliberately and commit it; an uncommitted capture is the exact failure
this section exists to prevent.

If you do use crawl4ai: `cyclical_scrape.py` is resumable and merge-not-clobber (skips captured
codes, upserts, stops a batch after 2 consecutive blocks), runs from any clone, and takes
`CRAWL4AI_SITE_PACKAGES` if crawl4ai lives in a venv you are not invoking directly. Universities
configured: `unimelb`, `latrobe`.

### Sparse source pages are not a capture failure

The research-doctorate handbook pages (`dr-phil*`, `dh-*`) are genuinely one-paragraph generic
descriptions — ~180-940 chars. Re-capturing them with any tool returns the same text. The 24
programs flagged `evidenceConfidence: "low"` need **different sources** (faculty RHD pages,
graduate-research handbook sections), not a better scraper. They sit in `data/capture_queue.json`
for that reason, but re-running a scraper over them will not clear the flag.

**Go8 benchmarking is NOT implemented.** `docs/dfva-go8-comparison.md` (2026-06-10) was authored
from ad-hoc extracts that were never persisted, so it cannot be reproduced or extended. There is no
Go8 scraper, no `scripts/go8_handbook_config.json`, and no `data/go8_*_handbook_data.json`.

**See:** compass/app/README.md
