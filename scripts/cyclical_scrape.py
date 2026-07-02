#!/usr/bin/env python3
"""
Cyclical handbook scraper — runs until all programs are scraped.
Designed to be called hourly by cron, with built-in Akamai rate-limit awareness.
Only attempts programs not yet in handbook_data.json.
"""
import json, asyncio, sys, os, time
from datetime import datetime

sys.path.insert(0, os.path.expanduser("~/.venv-crawl4ai-uv/lib/python3.14/site-packages"))
from crawl4ai import AsyncWebCrawler

PROJ_DIR = os.path.expanduser("~/Documents/SXD-Github/DFVA")
PENDING_FILE = os.path.join(PROJ_DIR, "data/pending_scrapes.json")
HANDBOOK_FILE = os.path.join(PROJ_DIR, "data/handbook_data.json")
CODES_FILE = os.path.join(PROJ_DIR, "data/all_course_codes.json")

async def scrape_one(code: str) -> dict | None:
    """Scrape overview + structure for one program. Returns None if blocked."""
    md = ""
    
    # Overview
    async with AsyncWebCrawler() as c:
        r = await c.arun(
            url=f"https://handbook.unimelb.edu.au/2026/courses/{code}",
            bypass_cache=True, timeout=30
        )
        if r.success and "Pardon" not in (r.markdown or ""):
            md = r.markdown
    
    await asyncio.sleep(2)
    
    # Course structure
    async with AsyncWebCrawler() as c:
        r = await c.arun(
            url=f"https://handbook.unimelb.edu.au/2026/courses/{code}/course-structure/",
            bypass_cache=True, timeout=30
        )
        if r.success and "Pardon" not in (r.markdown or ""):
            md += "\n" + r.markdown
    
    if len(md) > 200:
        return {
            "code": code,
            "url": f"https://handbook.unimelb.edu.au/2026/courses/{code}",
            "success": True,
            "markdown": md,
            "length": len(md),
            "scraped_at": datetime.now().isoformat()
        }
    return None

async def main():
    # Load existing handbook data
    if os.path.exists(HANDBOOK_FILE):
        with open(HANDBOOK_FILE) as f:
            handbook = json.load(f)
    else:
        handbook = []
    
    scraped_codes = {h["code"] for h in handbook if h.get("success")}
    
    # Load all course codes
    if os.path.exists(CODES_FILE):
        with open(CODES_FILE) as f:
            all_codes = json.load(f)
    else:
        # Fallback: use programs_dataset
        with open(os.path.join(PROJ_DIR, "data/programs_dataset.json")) as f:
            all_codes = [p["code"] for p in json.load(f)]
    
    pending = [c for c in all_codes if c not in scraped_codes and c.startswith("mc-")]
    
    if not pending:
        print("All programs scraped! Nothing to do.")
        return "complete"
    
    # Only try a batch per run (Akamai limits to ~15 before blocking)
    BATCH_SIZE = 10
    batch = pending[:BATCH_SIZE]
    
    print(f"Scraping {len(batch)} of {len(pending)} pending ({len(scraped_codes)} already done)...")
    
    new_count = 0
    blocked_count = 0
    
    for i, code in enumerate(batch):
        await asyncio.sleep(8)  # Rate limit delay
        
        print(f"  [{i+1}/{len(batch)}] {code}...", end=" ", flush=True)
        result = await scrape_one(code)
        
        if result:
            handbook.append(result)
            new_count += 1
            print(f"{result['length']} chars OK")
        else:
            blocked_count += 1
            print("BLOCKED")
            # Once we hit Akamai, stop — remaining will be picked up next run
            if blocked_count >= 2:
                print("  Akamai block detected — stopping batch")
                break
    
    # Save
    with open(HANDBOOK_FILE, "w") as f:
        json.dump(handbook, f, indent=2)
    
    # Update pending
    remaining = [c for c in all_codes if c not in {h["code"] for h in handbook if h.get("success")} and c.startswith("mc-")]
    with open(PENDING_FILE, "w") as f:
        json.dump({
            "total": len(all_codes),
            "scraped": len(handbook),
            "pending": len(remaining),
            "last_run": datetime.now().isoformat()
        }, f, indent=2)
    
    print(f"Added {new_count}. {len(handbook)} total scraped, {len(remaining)} remaining")
    
    if not remaining:
        return "complete"
    return "more"

if __name__ == "__main__":
    result = asyncio.run(main())
    sys.exit(0 if result == "complete" else 1)
