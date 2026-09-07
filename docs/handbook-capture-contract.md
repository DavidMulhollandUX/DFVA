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
| `data/latrobe_handbook_data.json` & `latrobe_handbook_structured.json` | Next.js data route (`scripts/latrobe-handbook-scrape.py`) | 666 programs; full structured CILOs, AQF, WBL, and nested curriculum tree |
| `data/monash_handbook_data.json` & `monash_handbook_structured.json` | Next.js data route (`scripts/monash-handbook-scrape.py`) | 502 programs; full structured CILOs, AQF, and nested curriculum tree |
| `data/unsw_handbook_data.json` & `unsw_handbook_structured.json` | CourseLoop Next.js SSR route (`scripts/unsw-handbook-scrape.py`) | 659 programs; full CILOs, AQF, career opportunities, and nested curriculum tree |
| `data/anu_handbook_data.json` & `anu_handbook_structured.json` | REST API + static HTML (`scripts/anu-handbook-scrape.py`) | 343 programs; full CILOs, majors, study options, and admission requirements |
| `data/uwa_handbook_data.json` & `uwa_handbook_structured.json` | CMS catalog crawl (`scripts/uwa-handbook-scrape.py`) | 297 programs; full course overview, details, structure, and academic rules |
| `data/adelaide_handbook_data.json` & `adelaide_handbook_structured.json` | Faculty calendar spider (`scripts/adelaide-handbook-scrape.py`) | 292 programs; full Academic Program Rules (APRs), core courses, and majors |
| `data/usyd_handbook_data.json` & `usyd_handbook_structured.json` | Faculty coursework spider (`scripts/usyd-handbook-scrape.py`) | 222 programs; full degree hubs, learning outcomes, and course resolutions |
| `data/uq_handbook_data.json` & `uq_handbook_structured.json` | Catalog browse crawl (`scripts/uq-handbook-scrape.py`) | 336 programs; full overview, AQF, units, career outcomes, and program rules |

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

### Full Go8 Benchmarking Capability

The Group of Eight (Go8) university handbook corpora are fully automated, persistent, and verifiable
across all 8 member institutions plus La Trobe University. Run `npm --prefix scripts run dfva:go8-status`
to inspect live progress and contract compliance across the complete national corpus (3,350+ programs).

**See:** compass/app/README.md
