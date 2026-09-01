#!/usr/bin/env python3.12
"""Adzuna AU fetch for the DFVA profession autoloop (L4 quantitative trend source).

For each SOC: query Adzuna AU, save the raw response, and compute a jobAds
summary (count, topEmployers, topSkills) derived from the returned corpus so the
ledger's topSkills come from data rather than prose. Outputs:
  data/professions/<soc>/raw/adzuna-<soc>-<date>.json        (raw API response)
  data/professions/<soc>/raw/adzuna-<soc>-summary.json       (computed summary)
"""
from __future__ import annotations
import datetime as dt
import json
import os
import sys
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = dt.date.today().isoformat()
APP_ID = os.environ.get("ADZUNA_APP_ID", "")
APP_KEY = os.environ.get("ADZUNA_API_KEY", "")

# SOC -> (Adzuna 'what' query, skill lexicon for topSkills extraction)
JOBS = {
    "11-2031": ("public relations manager",
                ["media relations", "stakeholder", "campaign", "crisis communication",
                 "content", "social media", "brand", "strategic communication", "issues management"]),
    "11-3021": ("ICT manager",
                ["cloud", "cyber security", "roadmap", "stakeholder", "agile",
                 "budget", "vendor", "governance", "artificial intelligence", "data"]),
    "11-3031": ("finance manager",
                ["financial reporting", "forecast", "budget", "compliance", "cash flow",
                 "risk", "audit", "ERP", "stakeholder", "ASIC"]),
    "11-3051": ("production manager",
                ["lean", "supply chain", "KPI", "safety", "continuous improvement",
                 "inventory", "quality", "scheduling", "throughput", "capacity"]),
    "11-3061": ("purchasing manager",
                ["procurement", "supplier", "contract negotiation", "tender", "sourcing",
                 "inventory", "vendor management", "cost saving", "logistics", "category management"]),
    "11-3121": ("human resources manager",
                ["employee relations", "recruitment", "industrial relations", "performance management",
                 "workforce planning", "remuneration", "compliance", "culture", "onboarding", "HRIS"]),
    "11-9021": ("construction manager",
                ["scheduling", "site safety", "tender", "quantity surveying", "subcontractor",
                 "budget", "compliance", "project delivery", "procurement", "WHS"]),
}


def fetch(soc: str, query: str) -> dict:
    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "what": query,
        "where": "Australia",
        "results_per_page": 50,
        "content-type": "application/json",
    }
    url = "https://api.adzuna.com/v1/api/jobs/au/search/1?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "dfva-autoloop/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())


def summarise(resp: dict, lexicon: list[str]) -> dict:
    results = resp.get("results", []) or []
    count = resp.get("count")
    if count is None:
        count = len(results)
    companies = Counter()
    skill_counts = Counter()
    for j in results:
        comp = (j.get("company") or {}).get("display_name")
        if comp:
            companies[comp] += 1
        desc = (j.get("description") or "").lower()
        title = (j.get("title") or "").lower()
        blob = desc + " " + title
        for s in lexicon:
            if s.lower() in blob:
                skill_counts[s] += 1
    top_employers = [c for c, _ in companies.most_common(8)]
    top_skills = [s for s, _ in skill_counts.most_common(8)]
    # Fallback: if lexicon caught nothing, surface the raw top words minimally.
    if not top_skills:
        top_skills = ["(no skill keywords matched in sample)"]
    return {
        "source": "adzuna-au",
        "query": resp.get("__query__", ""),
        "window": f"Adzuna AU live all-time index (fetched {TODAY})",
        "count": count,
        "returned": len(results),
        "topEmployers": top_employers,
        "topSkills": top_skills,
    }


def main() -> None:
    if not APP_ID or not APP_KEY:
        print("[adzuna] missing ADZUNA_APP_ID/ADZUNA_API_KEY; abort", file=sys.stderr)
        sys.exit(2)
    for soc, (query, lexicon) in JOBS.items():
        out_dir = REPO / "data" / "professions" / soc / "raw"
        out_dir.mkdir(parents=True, exist_ok=True)
        try:
            resp = fetch(soc, query)
        except Exception as e:
            print(f"[adzuna] {soc} fetch failed: {e}", file=sys.stderr)
            continue
        resp["__query__"] = query
        (out_dir / f"adzuna-{soc}-{TODAY}.json").write_text(json.dumps(resp, indent=2))
        summary = summarise(resp, lexicon)
        (out_dir / f"adzuna-{soc}-summary.json").write_text(json.dumps(summary, indent=2))
        print(f"[adzuna] {soc}: count={summary['count']} returned={summary['returned']} "
              f"employers={len(summary['topEmployers'])} skills={len(summary['topSkills'])}")


if __name__ == "__main__":
    main()
