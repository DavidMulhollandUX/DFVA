#!/usr/bin/env python3
"""Scrape handbook data for all DFVA-scored programs."""
import json, asyncio, sys, os, time

sys.path.insert(0, os.path.expanduser("~/.venv-crawl4ai-uv/lib/python3.14/site-packages"))
from crawl4ai import AsyncWebCrawler

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
    with open("data/programs_dataset.json") as f:
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
    
    with open("data/handbook_data.json", "w") as f:
        json.dump(results, f, indent=2)
    success = sum(1 for r in results if r["success"])
    print(f"Done: {success}/{len(results)}")
    if success < len(results):
        print("Rerun with delays or try single-URL manual scrape for failures.")

if __name__ == "__main__":
    asyncio.run(main())
