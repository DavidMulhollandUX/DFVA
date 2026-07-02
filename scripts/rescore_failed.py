#!/usr/bin/env python3
"""Re-scrape the 9 failed programs with fresh browser instance each time."""
import json, asyncio, sys, os, pickle

sys.path.insert(0, os.path.expanduser("~/.venv-crawl4ai-uv/lib/python3.14/site-packages"))
from crawl4ai import AsyncWebCrawler
sys.path.insert(0, os.path.dirname(__file__))
from extract_features import extract_features

FAILED = ["mc-phtyph", "mc-prop", "mc-scibit", "mc-sciear", "mc-sciepi",
          "mc-scwr", "mc-surged", "mc-tesol", "mc-urbhort"]

async def scrape_one(code):
    """Scrape overview + structure with fresh crawler each time."""
    md1, md2 = "", ""
    
    # Overview
    async with AsyncWebCrawler() as c:
        r = await c.arun(url=f"https://handbook.unimelb.edu.au/2026/courses/{code}",
                         bypass_cache=True, timeout=30)
        md1 = r.markdown if r.success and "Pardon" not in (r.markdown or "") else ""
    
    await asyncio.sleep(3)
    
    # Structure
    async with AsyncWebCrawler() as c:
        r = await c.arun(url=f"https://handbook.unimelb.edu.au/2026/courses/{code}/course-structure/",
                         bypass_cache=True, timeout=30)
        md2 = r.markdown if r.success and "Pardon" not in (r.markdown or "") else ""
    
    return (md1 or "") + "\n" + (md2 or "")

async def main():
    print(f"Re-scraping {len(FAILED)} failed programs (fresh browser each, 5s delay)...")
    
    results = {}
    for i, code in enumerate(FAILED):
        await asyncio.sleep(5)
        md = await scrape_one(code)
        ok = len(md) > 200
        print(f"  [{i+1}/{len(FAILED)}] {code}: {len(md)} chars {'OK' if ok else 'FAIL'}")
        results[code] = md
    
    # Load model and predict
    with open("data/trained_model.pkl", "rb") as f:
        bundle = pickle.load(f)
    models = bundle["models"]
    feature_names = bundle["features"]
    
    with open("data/programs_dataset.json") as f:
        programs = json.load(f)
    
    with open("data/new_program_scores.json") as f:
        scores = json.load(f)
    
    for code, md in results.items():
        if len(md) < 200:
            continue
        feats = extract_features(md)
        X = [feats.get(k, 0) for k in feature_names]
        dim_scores = {}
        for dim, (betas, intercept) in models.items():
            pred = intercept + sum(betas[j] * X[j] for j in range(len(betas)))
            dim_scores[dim] = round(max(0, min(3, pred)), 1)
        avg = round(sum(dim_scores.values()) / max(len(dim_scores), 1), 2)
        scores[code] = {"predicted_scores": dim_scores, "avg_score": avg,
                        "name": scores.get(code, {}).get("name", code)}
        print(f"  {code}: avg={avg}")
    
    with open("data/new_program_scores.json", "w") as f:
        json.dump(scores, f, indent=2)
    print("Done")

if __name__ == "__main__":
    asyncio.run(main())
