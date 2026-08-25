#!/usr/bin/env python3
"""
Cyclical handbook scraper — runs until all programs are scraped.
Designed to be called hourly by cron, with built-in rate-limit awareness.

Runs from any clone — the repo root is derived from this file's location.

Usage:
    python3 scripts/cyclical_scrape.py --dry-run          # inspect the queue, no network, no crawl4ai
    PYTHONPATH="" ~/.venv-crawl4ai-uv/bin/python3 scripts/cyclical_scrape.py           # UniMelb (default)
    PYTHONPATH="" ~/.venv-crawl4ai-uv/bin/python3 scripts/cyclical_scrape.py latrobe   # La Trobe University

crawl4ai is imported lazily; run with the interpreter that has it, or set
CRAWL4AI_SITE_PACKAGES to its site-packages directory.

Captured text is written to a versioned file under data/ — never to a gitignored
cache. A capture that only exists locally cannot be re-examined or re-scored, and
`npm --prefix scripts run dfva:capture-check` enforces that for scored programs.

Universities:
    - unimelb: handbook.unimelb.edu.au/2026/courses/{mc-XXXX} + /course-structure/ sub-page
    - latrobe: handbook.latrobe.edu.au/courses/2026/{CODE} (structure embedded in main page)
"""
import json, asyncio, sys, os
from datetime import datetime, timezone

# Repo root is derived from this file's own location so the script runs from any
# clone. Previously this was hardcoded to one machine's ~/Documents path, which
# is why captured handbook text was never reproducible off that machine.
PROJ_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_crawler():
    """Import crawl4ai lazily so --dry-run and --help work without the venv.

    Set CRAWL4AI_SITE_PACKAGES to add a site-packages dir to sys.path if
    crawl4ai lives in a venv you are not running this script with.
    """
    extra = os.environ.get("CRAWL4AI_SITE_PACKAGES")
    if extra:
        sys.path.insert(0, os.path.expanduser(extra))
    try:
        from crawl4ai import AsyncWebCrawler
    except ImportError as e:
        sys.exit(
            f"crawl4ai is not importable ({e}).\n"
            "Run this script with the interpreter that has it installed, e.g.:\n"
            '  PYTHONPATH="" ~/.venv-crawl4ai-uv/bin/python3 '
            "scripts/cyclical_scrape.py unimelb\n"
            "or set CRAWL4AI_SITE_PACKAGES to its site-packages directory.\n"
            "Use --dry-run to inspect the work queue without crawl4ai."
        )
    return AsyncWebCrawler

# ── University configs ──────────────────────────────────────────────────────
UNI_CONFIGS = {
    "unimelb": {
        "name": "UniMelb",
        "base_url": "https://handbook.unimelb.edu.au/2026/courses/{code}",
        "structure_url": "https://handbook.unimelb.edu.au/2026/courses/{code}/course-structure/",
        "has_separate_structure": True,
        "codes_file": "data/all_course_codes.json",
        "queue_file": "data/capture_queue.json",
        "handbook_file": "data/handbook_data.json",
        "pending_file": "data/pending_scrapes.json",
        "code_prefix": "mc-",
        "anti_bot_phrase": "Pardon",
        "batch_size": 10,
        "request_delay": 8,
        "page_delay": 2,
    },
    "latrobe": {
        "name": "La Trobe",
        "base_url": "https://handbook.latrobe.edu.au/courses/2026/{code}",
        "structure_url": None,  # Structure is embedded in main page
        "has_separate_structure": False,
        "codes_file": "data/latrobe_course_codes.json",
        "handbook_file": "data/latrobe_handbook_data.json",
        "pending_file": "data/latrobe_pending_scrapes.json",
        "code_prefix": None,  # No prefix filter for La Trobe
        "anti_bot_phrase": None,  # Cloudflare, not Akamai — check via success boolean
        "batch_size": 10,
        "request_delay": 8,
        "page_delay": 2,
    },
}


async def scrape_one(config: dict, code: str, AsyncWebCrawler) -> dict | None:
    """Scrape overview (+ optionally structure) for one program. Returns None if blocked."""
    md = ""

    # Overview page
    async with AsyncWebCrawler() as c:
        r = await c.arun(
            url=config["base_url"].format(code=code),
            bypass_cache=True, timeout=30
        )
        if r.success:
            # Check for anti-bot block phrase
            if config["anti_bot_phrase"] and config["anti_bot_phrase"] in (r.markdown or ""):
                return None
            md = r.markdown or ""

    if len(md) < 200:
        return None

    # Course structure (only if separate page)
    if config["has_separate_structure"] and config["structure_url"]:
        await asyncio.sleep(config["page_delay"])
        async with AsyncWebCrawler() as c:
            r = await c.arun(
                url=config["structure_url"].format(code=code),
                bypass_cache=True, timeout=30
            )
            if r.success:
                if config["anti_bot_phrase"] and config["anti_bot_phrase"] in (r.markdown or ""):
                    return None
                md += "\n" + (r.markdown or "")

    if len(md) > 200:
        return {
            "code": code,
            "url": config["base_url"].format(code=code),
            "success": True,
            "markdown": md,
            "length": len(md),
            "scraped_at": datetime.now(timezone.utc).isoformat(),
            "method": "crawl4ai",
        }
    return None


async def main(uni_key: str = "unimelb", dry_run: bool = False):
    config = UNI_CONFIGS.get(uni_key)
    if not config:
        print(f"Unknown university: {uni_key}. Options: {', '.join(UNI_CONFIGS)}")
        sys.exit(2)

    handbook_file = os.path.join(PROJ_DIR, config["handbook_file"])
    codes_file = os.path.join(PROJ_DIR, config["codes_file"])
    pending_file = os.path.join(PROJ_DIR, config["pending_file"])

    # Load existing handbook data
    if os.path.exists(handbook_file):
        with open(handbook_file) as f:
            handbook = json.load(f)
    else:
        handbook = []

    scraped_codes = {h["code"] for h in handbook if h.get("success")}

    # Load all course codes. The queue file (if present) is the canonical work
    # list — it carries every known-but-uncaptured code, not just the 42 that
    # happened to be in all_course_codes.json.
    queue_file = os.path.join(PROJ_DIR, config.get("queue_file") or "")
    if config.get("queue_file") and os.path.exists(queue_file):
        with open(queue_file) as f:
            all_codes = json.load(f)["codes"]
    elif os.path.exists(codes_file):
        with open(codes_file) as f:
            all_codes = json.load(f)
    else:
        # Fallback: use programs_dataset for UniMelb
        fallback_file = os.path.join(PROJ_DIR, "data/programs_dataset.json")
        if os.path.exists(fallback_file):
            with open(fallback_file) as f:
                all_codes = [p["code"] for p in json.load(f)]
        else:
            print(f"No course codes file found at {codes_file}")
            sys.exit(1)

    # Filter by prefix (if applicable). An explicit queue is already scoped, so
    # the prefix filter is skipped for it — otherwise gc-/gd-/sc-/pr- codes in
    # the queue would be silently dropped.
    using_queue = bool(config.get("queue_file")) and os.path.exists(queue_file)
    if config["code_prefix"] and not using_queue:
        pending = [c for c in all_codes if c not in scraped_codes and c.startswith(config["code_prefix"])]
    else:
        pending = [c for c in all_codes if c not in scraped_codes]

    if not pending:
        print(f"All {config['name']} programs scraped! Nothing to do.")
        return "complete"

    BATCH_SIZE = config["batch_size"]
    batch = pending[:BATCH_SIZE]

    if dry_run:
        print(f"[{config['name']}] DRY RUN — no network calls made.")
        print(f"  captured already : {len(scraped_codes)}")
        print(f"  pending          : {len(pending)}")
        print(f"  next batch ({len(batch)}) : {', '.join(batch)}")
        print(f"  source           : {'queue ' + config['queue_file'] if using_queue else codes_file}")
        return "dry-run"

    AsyncWebCrawler = load_crawler()

    print(f"[{config['name']}] Scraping {len(batch)} of {len(pending)} pending "
          f"({len(scraped_codes)} already done)...")

    new_count = 0
    blocked_count = 0

    for i, code in enumerate(batch):
        await asyncio.sleep(config["request_delay"])

        print(f"  [{i+1}/{len(batch)}] {code}...", end=" ", flush=True)
        result = await scrape_one(config, code, AsyncWebCrawler)

        if result:
            handbook = [h for h in handbook if h.get("code") != code]
            handbook.append(result)
            new_count += 1
            print(f"{result['length']} chars OK")
        else:
            blocked_count += 1
            print("BLOCKED")
            if blocked_count >= 2:
                print("  Block threshold reached — stopping batch")
                break

    # Save
    with open(handbook_file, "w") as f:
        json.dump(handbook, f, indent=2)

    # Update pending status
    updated_scraped = {h["code"] for h in handbook if h.get("success")}
    remaining = [c for c in all_codes if c not in updated_scraped]
    # Mirror the start-of-run filter: an explicit queue is already scoped, so
    # don't re-apply the prefix filter to it (gc-/gd-/sc-/pr- codes would be
    # dropped from the tally even though they were queued and scraped).
    if config["code_prefix"] and not using_queue:
        remaining = [c for c in remaining if c.startswith(config["code_prefix"])]

    with open(pending_file, "w") as f:
        json.dump({
            "university": config["name"],
            "total": len(all_codes),
            "scraped": len([h for h in handbook if h.get("success")]),
            "pending": len(remaining),
            "last_run": datetime.now().isoformat(),
        }, f, indent=2)

    print(f"Added {new_count}. {len([h for h in handbook if h.get('success')])} total scraped, "
          f"{len(remaining)} remaining")

    return "complete" if not remaining else "more"


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    flags = {a for a in sys.argv[1:] if a.startswith("-")}
    if "-h" in flags or "--help" in flags:
        print(__doc__)
        sys.exit(0)
    uni_key = args[0] if args else "unimelb"
    result = asyncio.run(main(uni_key, dry_run="--dry-run" in flags))
    sys.exit(0 if result in ("complete", "dry-run") else 1)
