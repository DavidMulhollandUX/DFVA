#!/usr/bin/env python3
"""
Cyclical handbook scraper — runs until all programs are scraped.
Designed to be called hourly by cron, with built-in rate-limit awareness.

Usage (must use crawl4ai venv Python — system python3 has pydantic_core mismatch):
    PYTHONPATH="" ~/.venv-crawl4ai-uv/bin/python3 scripts/cyclical_scrape.py           # UniMelb (default)
    PYTHONPATH="" ~/.venv-crawl4ai-uv/bin/python3 scripts/cyclical_scrape.py latrobe   # La Trobe University
    PYTHONPATH="" ~/.venv-crawl4ai-uv/bin/python3 scripts/cyclical_scrape.py unimelb   # UniMelb (explicit)

Universities:
    - unimelb: handbook.unimelb.edu.au/2026/courses/{mc-XXXX} + /course-structure/ sub-page
    - latrobe: handbook.latrobe.edu.au/courses/2026/{CODE} (structure embedded in main page)
"""
import json, asyncio, sys, os
from datetime import datetime

sys.path.insert(0, os.path.expanduser("~/.venv-crawl4ai-uv/lib/python3.14/site-packages"))
from crawl4ai import AsyncWebCrawler

PROJ_DIR = os.path.expanduser("~/Documents/SXD-Github/DFVA")

# ── University configs ──────────────────────────────────────────────────────
UNI_CONFIGS = {
    "unimelb": {
        "name": "UniMelb",
        "base_url": "https://handbook.unimelb.edu.au/2026/courses/{code}",
        "structure_url": "https://handbook.unimelb.edu.au/2026/courses/{code}/course-structure/",
        "has_separate_structure": True,
        "codes_file": "data/all_course_codes.json",
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


async def scrape_one(config: dict, code: str) -> dict | None:
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
            "scraped_at": datetime.now().isoformat(),
        }
    return None


async def main(uni_key: str = "unimelb"):
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

    # Load all course codes
    if os.path.exists(codes_file):
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

    # Filter by prefix (if applicable)
    if config["code_prefix"]:
        pending = [c for c in all_codes if c not in scraped_codes and c.startswith(config["code_prefix"])]
    else:
        pending = [c for c in all_codes if c not in scraped_codes]

    if not pending:
        print(f"All {config['name']} programs scraped! Nothing to do.")
        return "complete"

    BATCH_SIZE = config["batch_size"]
    batch = pending[:BATCH_SIZE]

    print(f"[{config['name']}] Scraping {len(batch)} of {len(pending)} pending "
          f"({len(scraped_codes)} already done)...")

    new_count = 0
    blocked_count = 0

    for i, code in enumerate(batch):
        await asyncio.sleep(config["request_delay"])

        print(f"  [{i+1}/{len(batch)}] {code}...", end=" ", flush=True)
        result = await scrape_one(config, code)

        if result:
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
    if config["code_prefix"]:
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
    uni_key = sys.argv[1] if len(sys.argv) > 1 else "unimelb"
    result = asyncio.run(main(uni_key))
    sys.exit(0 if result == "complete" else 1)
