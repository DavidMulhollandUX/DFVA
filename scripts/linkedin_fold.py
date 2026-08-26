#!/usr/bin/env python3
"""linkedin_fold.py — fold a LinkedIn L4 raw payload into a profession ledger.

Reads data/professions/<soc>/raw/linkedin_l4.json (from linkedin_l4.py), converts
each posting to an L4 claim (demand-side job ad) in the ledger's Section 4 shape, and
merges. Mirrors l5_fold.py discipline: never overwrites, dedupes by URL.

L4 = demand-side job ads. LinkedIn postings support "who advertises, what they ask for"
(per the deep-research plan L4 row). They do NOT carry salary or hire-volume, so they
do not feed the quantitative trend — Adzuna owns that. Provenance is tagged
"linkedin (unofficial scrape)" for transparency in evidence-grade reports.

Usage:
  python3.12 scripts/linkedin_fold.py <soc> [--raw data/professions/<soc>/raw/linkedin_l4.json]
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = dt.date.today().isoformat()


def fold(soc: str, raw_path: Path) -> int:
    rec_path = REPO / f"data/professions/{soc}.json"
    if not rec_path.exists():
        print(f"[linkedin_fold] ledger missing for {soc}; skipping")
        return 0
    d = json.loads(rec_path.read_text())
    raw = json.loads(raw_path.read_text())
    jobs = raw.get("jobs", []) or []

    existing = d.get("claims", [])
    seen = {c.get("sources", [{}])[0].get("url") for c in existing if c.get("sources")}
    start = len(existing) + 1
    added = 0
    for j in jobs:
        url = j.get("url") or ""
        if not url or url in seen:
            continue
        title = j.get("title", "")
        company = j.get("company", "")
        location = j.get("location", "")
        posted = j.get("postedTimeAgo", "")
        text = f"{title} — {company} ({location}). Posted {posted}."
        existing.append({
            "id": f"l4{start+added:02d}",
            "text": text,
            "lane": "L4",
            "tier": "demand-job-ads",
            "sources": [{
                "publisher": company,
                "title": title,
                "url": url,
                "date": posted,
                "whatItMeasured": f"LinkedIn job posting (unofficial scrape); retrieved {TODAY}",
            }],
            "scope": "Live LinkedIn job ad; demand signal, not a graduate destination. Unofficial scrape provenance.",
            "disposition": "sourced",
            "supersedes": None,
            "bearing": [],
            "refuted": False,
            "refuteNotes": "Single posting; corroborate volume via Adzuna before quantitative claim. Provenance: linkedin (unofficial scrape).",
        })
        seen.add(url)
        added += 1

    d["claims"] = existing
    corpus = d.setdefault("corpus", {})
    ln = corpus.get("linkedin", []) or []
    ln.append({
        "date": TODAY,
        "soc": soc,
        "query": raw.get("query"),
        "location": raw.get("location"),
        "returned": raw.get("returned"),
        "totalResults": raw.get("totalResults"),
        "status": "sampled",
    })
    corpus["linkedin"] = ln
    rec_path.write_text(json.dumps(d, indent=2))
    return added


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("soc")
    ap.add_argument("--raw", default=None)
    args = ap.parse_args()

    if args.raw:
        raw = Path(args.raw)
    else:
        cands = sorted((REPO / f"data/professions/{args.soc}/raw").glob("linkedin_l4.json"),
                       key=lambda p: p.stat().st_mtime, reverse=True)
        raw = cands[0] if cands else None
    if not raw or not raw.exists():
        print(f"[linkedin_fold] no raw payload for {args.soc}")
        sys.exit(1)

    added = fold(args.soc, raw)
    print(f"[linkedin_fold] {args.soc}: folded {added} L4 LinkedIn claims from {raw.name}")


if __name__ == "__main__":
    main()
