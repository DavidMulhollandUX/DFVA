#!/usr/bin/env python3
"""Scrape handbook data for all DFVA-scored programs.

DEPRECATED — prefer scripts/cyclical_scrape.py, which is resumable, works from
any clone, drains data/capture_queue.json, and has a --dry-run mode. This script
is kept for the narrow "re-fetch the scored set" case only.
"""
import json, asyncio, sys, os, time

# Repo root from this file's location, so the script runs from any clone.
PROJ_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_extra = os.environ.get("CRAWL4AI_SITE_PACKAGES")
if _extra:
    sys.path.insert(0, os.path.expanduser(_extra))
try:
    from crawl4ai import AsyncWebCrawler
except ImportError as _e:  # pragma: no cover - environment dependent
    sys.exit(
        f"crawl4ai is not importable ({_e}). Run with the interpreter that has it, "
        "or set CRAWL4AI_SITE_PACKAGES. Prefer scripts/cyclical_scrape.py."
    )

async def scrape_program(crawler, code: str, delay: float = 5.0) -> dict:
    """Scrape handbook page with delay between requests."""
    await asyncio.sleep(delay)  # Avoid Akamai rate limiting
    url = f"https://handbook.unimelb.edu.au/2026/courses/{code}"
    result = await crawler.arun(url=url, bypass_cache=True, timeout=30)
    return {
        "code": code, "url": url,
        "success": result.success and "Pardon Our Interruption" not in (result.markdown or ""),
        "markdown": result.markdown if result.success else result.error_message or "",
        "length": len(result.markdown) if result.success else 0,
    }

async def main():
    with open(os.path.join(PROJ_DIR, "data/programs_dataset.json")) as f:
        programs = [p for p in json.load(f) if p["scores"]]
    
    print(f"Scraping {len(programs)} programs (8s delay between requests)...")
    results = []
    async with AsyncWebCrawler() as crawler:
        for i, p in enumerate(programs):
            code = p["code"]
            print(f"  [{i+1}/{len(programs)}] {code}...", end=" ", flush=True)
            r = await scrape_program(crawler, code, delay=8.0)
            status = f"{r['length']} chars" if r["success"] else "BLOCKED"
            print(status)
            results.append(r)
    
    # Merge, never clobber: a partially-blocked run must not delete captures that
    # already succeeded. Only successful new results replace an existing record.
    out_path = os.path.join(PROJ_DIR, "data/handbook_data.json")
    existing = []
    if os.path.exists(out_path):
        with open(out_path) as f:
            existing = json.load(f)
    by_code = {e["code"]: e for e in existing if e.get("code")}
    for r in results:
        prev = by_code.get(r["code"])
        if r["success"] or prev is None or not prev.get("success"):
            by_code[r["code"]] = r
    merged = sorted(by_code.values(), key=lambda e: e["code"])
    with open(out_path, "w") as f:
        json.dump(merged, f, indent=2)
    success = sum(1 for r in results if r["success"])
    print(f"Done: {success}/{len(results)}")
    if success < len(results):
        print("Rerun with delays or try single-URL manual scrape for failures.")

if __name__ == "__main__":
    asyncio.run(main())
