#!/usr/bin/env python3.12
"""Adzuna AU L4 fetch — generic, parameterized per SOC.

Quantitative L4 source (Adzuna AU live all-time index count + top employers/skills).
Complements LinkedIn (who advertises, live postings) and Seek. Folds a
`jobAds.adzuna` block into data/professions/<soc>.json (merge: preserves other
jobAds keys). Never fabricates: on fetch error it records a coverage gap in
corpus.searchesReturningNothing and returns non-zero.

Usage:
  python3.12 scripts/adzuna_l4.py <soc> --query "radiation therapist" \
      --skills "radiation therapy,treatment planning,dosimetry,oncology,patient care"
"""
from __future__ import annotations

import argparse
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


def fetch(query: str) -> dict:
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


def summarise(resp: dict, query: str, lexicon: list[str]) -> dict:
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
    if not top_skills:
        top_skills = ["(no skill keywords matched in sample)"]
    return {
        "source": "adzuna-au",
        "query": query,
        "window": f"Adzuna AU live all-time index (fetched {TODAY})",
        "count": count,
        "returned": len(results),
        "topEmployers": top_employers,
        "topSkills": top_skills,
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("soc")
    ap.add_argument("--query", required=True, help="Adzuna 'what' query")
    ap.add_argument("--skills", default="", help="Comma-separated skill lexicon for topSkills extraction")
    args = ap.parse_args()

    if not APP_ID or not APP_KEY:
        print("[adzuna] missing ADZUNA_APP_ID/ADZUNA_API_KEY; abort", file=sys.stderr)
        return 2

    lexicon = [s.strip() for s in args.skills.split(",") if s.strip()]
    out_dir = REPO / "data" / "professions" / args.soc / "raw"
    out_dir.mkdir(parents=True, exist_ok=True)
    try:
        resp = fetch(args.query)
    except Exception as e:
        print(f"[adzuna] {args.soc} fetch failed: {e}", file=sys.stderr)
        ledger = REPO / f"data/professions/{args.soc}.json"
        if ledger.exists():
            d = json.loads(ledger.read_text())
            srn = d.setdefault("corpus", {}).setdefault("searchesReturningNothing", [])
            srn.append({"lane": "L4", "source": "adzuna-au", "query": args.query,
                        "status": "fetch_error", "detail": str(e)[:120], "date": TODAY})
            ledger.write_text(json.dumps(d, indent=2))
        return 1

    (out_dir / f"adzuna-{args.soc}-{TODAY}.json").write_text(json.dumps(resp, indent=2))
    summary = summarise(resp, args.query, lexicon)
    (out_dir / f"adzuna-{args.soc}-summary.json").write_text(json.dumps(summary, indent=2))

    ledger = REPO / f"data/professions/{args.soc}.json"
    if ledger.exists():
        d = json.loads(ledger.read_text())
        jobads = d.get("jobAds", {}) or {}
        jobads["adzuna"] = summary
        d["jobAds"] = jobads
        ledger.write_text(json.dumps(d, indent=2))
    print(f"[adzuna] {args.soc}: count={summary['count']} returned={summary['returned']} "
          f"employers={len(summary['topEmployers'])} skills={len(summary['topSkills'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
