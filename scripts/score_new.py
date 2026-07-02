#!/usr/bin/env python3
"""Scrape + score remaining unscored programs."""
import json, asyncio, sys, os, pickle

sys.path.insert(0, os.path.expanduser("~/.venv-crawl4ai-uv/lib/python3.14/site-packages"))
from crawl4ai import AsyncWebCrawler

# Import feature extractor from same dir
sys.path.insert(0, os.path.dirname(__file__))
from extract_features import extract_features

async def scrape_all(codes, delay=8.0):
    """Scrape overview + course-structure for each program."""
    results = {}
    async with AsyncWebCrawler() as crawler:
        for i, code in enumerate(codes):
            # Overview page
            await asyncio.sleep(delay)
            url = f"https://handbook.unimelb.edu.au/2026/courses/{code}"
            r1 = await crawler.arun(url=url, bypass_cache=True, timeout=30)
            md1 = r1.markdown if r1.success and "Pardon" not in (r1.markdown or "") else ""
            
            # Course structure
            await asyncio.sleep(2)
            url2 = f"https://handbook.unimelb.edu.au/2026/courses/{code}/course-structure/"
            r2 = await crawler.arun(url=url2, bypass_cache=True, timeout=30)
            md2 = r2.markdown if r2.success and "Pardon" not in (r2.markdown or "") else ""
            
            combined = (md1 or "") + "\n" + (md2 or "")
            ok = bool(md1 or md2)
            print(f"  [{i+1}/{len(codes)}] {code}: {len(md1)}+{len(md2)}={len(combined)} chars {'OK' if ok else 'FAIL'}")
            results[code] = combined
    
    return results

def main():
    with open("data/programs_dataset.json") as f:
        programs = json.load(f)
    
    unscored = [p for p in programs if not p.get("scores")]
    codes = [p["code"] for p in unscored]
    
    print(f"Scraping {len(codes)} unscored programs (8s delay)...")
    handbook_data = asyncio.run(scrape_all(codes))
    
    # Load trained model
    with open("data/trained_model.pkl", "rb") as f:
        bundle = pickle.load(f)
    models = bundle["models"]
    feature_names = bundle["features"]
    
    # Predict
    predictions = {}
    for p in unscored:
        code = p["code"]
        md = handbook_data.get(code, "")
        if not md:
            predictions[code] = {"error": "scrape failed"}
            continue
        
        feats = extract_features(md)
        X = [feats.get(k, 0) for k in feature_names]
        
        scores = {}
        for dim, (betas, intercept) in models.items():
            pred = intercept + sum(betas[j] * X[j] for j in range(len(betas)))
            scores[dim] = round(max(0, min(3, pred)), 1)
        
        avg = round(sum(scores.values()) / max(len(scores), 1), 2)
        predictions[code] = {"name": p.get("name", code), "risk": p.get("risk", "UNKNOWN"),
                             "predicted_scores": scores, "avg_score": avg}
        print(f"  {code}: avg={avg}")
    
    with open("data/new_program_scores.json", "w") as f:
        json.dump(predictions, f, indent=2)
    
    # Report
    success = sum(1 for v in predictions.values() if "error" not in v)
    print(f"Done: {success}/{len(codes)} scored")

if __name__ == "__main__":
    main()
