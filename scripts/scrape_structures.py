#!/usr/bin/env python3
"""Scrape course-structure sub-pages for all successfully scraped programs."""
import json, asyncio, sys, os, time

sys.path.insert(0, os.path.expanduser("~/.venv-crawl4ai-uv/lib/python3.14/site-packages"))
from crawl4ai import AsyncWebCrawler

async def scrape_structure(crawler, code: str, delay: float = 3.0) -> dict:
    await asyncio.sleep(delay)
    url = f"https://handbook.unimelb.edu.au/2026/courses/{code}/course-structure/"
    result = await crawler.arun(url=url, bypass_cache=True, timeout=30)
    ok = result.success and "Pardon Our Interruption" not in (result.markdown or "")
    return {
        "code": code, "url": url,
        "success": ok,
        "markdown": result.markdown if ok else (result.error_message or ""),
        "length": len(result.markdown) if ok else 0,
    }

async def main():
    with open("data/handbook_data.json") as f:
        handbooks = json.load(f)
    
    # Only scrape programs that were successfully scraped before
    success_codes = [h["code"] for h in handbooks if h["success"]]
    print(f"Scraping course-structure for {len(success_codes)} programs (3s delay)...")
    
    results = {}
    async with AsyncWebCrawler() as crawler:
        for i, code in enumerate(success_codes):
            print(f"  [{i+1}/{len(success_codes)}] {code}...", end=" ", flush=True)
            r = await scrape_structure(crawler, code)
            status = f"{r['length']} chars" if r["success"] else "BLOCKED"
            print(status)
            results[code] = r
    
    # Merge with existing handbook data
    for h in handbooks:
        if h["code"] in results:
            r = results[h["code"]]
            # Append structure to existing markdown
            if r["success"]:
                h["markdown"] += "\n\n---\n## Course Structure\n" + r["markdown"]
                h["length"] = len(h["markdown"])
    
    with open("data/handbook_data.json", "w") as f:
        json.dump(handbooks, f, indent=2)
    success = sum(1 for v in results.values() if v["success"])
    print(f"Done: {success}/{len(results)} course-structure pages")

if __name__ == "__main__":
    asyncio.run(main())
