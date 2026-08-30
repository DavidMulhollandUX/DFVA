#!/usr/bin/env python3.12
"""Adzuna AU L4 fetch for the engineering cluster (17-1011/12/22/11).

Generic counterpart to scripts/_adzuna_l4_run.py (which is hardcoded to the
construction-trades batch). Uses ADZUNA_APP_ID/ADZUNA_API_KEY from the env,
writes raw + summary per SOC and folds a jobAds block into each ledger.
Quantitative L4 source (all-time index count + top employers/skills).
"""
import datetime as dt
import json
import os
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = dt.date.today().isoformat()
APP_ID = os.environ.get("ADZUNA_APP_ID", "")
APP_KEY = os.environ.get("ADZUNA_API_KEY", "")

JOBS = {
    "17-1011": ("architect",
                ["design", "revit", "autocad", "documentation", "client", "approval",
                 "building", "compliance", "project", "sustainability"]),
    "17-1012": ("landscape architect",
                ["design", "planting", "gis", "revit", "masterplan", "approval",
                 "environmental", "construction", "client", "urban"]),
    "17-1022": ("surveyor",
                ["cadastral", "boundary", "gis", "gnss", "total station", "registration",
                 "survey", "construction", "mapping", "regulation"]),
    "17-2011": ("aerospace engineer",
                ["aerodynamics", "cfd", "fea", "matlab", "simulation", "systems",
                 "structural", "propulsion", "cad", "testing"]),
}


def fetch(query: str) -> dict:
    params = {
        "app_id": APP_ID, "app_key": APP_KEY, "what": query, "where": "Australia",
        "results_per_page": 50, "content-type": "application/json",
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
    top_skills = [s for s, _ in skill_counts.most_common(8)] or ["(no skill keywords matched in sample)"]
    return {
        "source": "adzuna-au", "query": resp.get("__query__", ""),
        "window": f"Adzuna AU live all-time index (fetched {TODAY})",
        "count": count, "returned": len(results),
        "topEmployers": top_employers, "topSkills": top_skills,
    }


def main() -> int:
    if not APP_ID or not APP_KEY:
        print("[adzuna] missing ADZUNA_APP_ID/ADZUNA_API_KEY; abort", file=__import__("sys").stderr)
        return 2
    for soc, (query, lexicon) in JOBS.items():
        out_dir = REPO / "data" / "professions" / soc / "raw"
        out_dir.mkdir(parents=True, exist_ok=True)
        try:
            resp = fetch(query)
        except Exception as e:
            print(f"[adzuna] {soc} fetch failed: {e}", file=__import__("sys").stderr)
            ledger = REPO / "data" / "professions" / f"{soc}.json"
            if ledger.exists():
                d = json.loads(ledger.read_text())
                srn = d.setdefault("corpus", {}).setdefault("searchesReturningNothing", [])
                srn.append({"lane": "L4", "source": "adzuna-au", "query": query,
                            "status": "fetch_error", "detail": str(e)[:120], "date": TODAY})
                ledger.write_text(json.dumps(d, indent=2))
            continue
        resp["__query__"] = query
        (out_dir / f"adzuna-{soc}-{TODAY}.json").write_text(json.dumps(resp, indent=2))
        summary = summarise(resp, lexicon)
        (out_dir / f"adzuna-{soc}-summary.json").write_text(json.dumps(summary, indent=2))
        ledger = REPO / "data" / "professions" / f"{soc}.json"
        d = json.loads(ledger.read_text())
        jobads = d.get("jobAds", {}) or {}
        jobads["adzuna"] = summary
        d["jobAds"] = jobads
        ledger.write_text(json.dumps(d, indent=2))
        print(f"[adzuna] {soc}: count={summary['count']} returned={summary['returned']} "
              f"employers={len(summary['topEmployers'])} skills={len(summary['topSkills'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
