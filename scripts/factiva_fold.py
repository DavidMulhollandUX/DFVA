#!/usr/bin/env python3
"""Fold a Factiva L3 raw payload into a profession claim ledger (Section 4 shape)."""
from __future__ import annotations
import datetime as dt, json, sys
from pathlib import Path

SOC = sys.argv[1] if len(sys.argv) > 1 else "11-1021"
RAW = Path(f"data/professions/{SOC}/raw/factiva_l3.json")
OUT = Path(f"data/professions/{SOC}.json")

raw = json.loads(RAW.read_text())
today = dt.date.today()
expires = today + dt.timedelta(days=180)

claims = []
for i, r in enumerate(raw["results"], 1):
    text = f"{r['headline']} — {r['source']} reporting notes {r['snippet'][:140]}".strip()
    claims.append({
        "id": f"l3f{i:02d}",
        "text": r["headline"],
        "lane": "L3",
        "tier": "trade-press-dated",
        "sources": [{
            "publisher": r["source"],
            "title": r["headline"],
            "url": r["url"],
            "date": r["date"],
            "whatItMeasured": f"Factiva trade-press item, retrieved {r['accessDate']}",
        }],
        "scope": "Trade-press report; not a primary study. Field grain (management).",
        "disposition": "sourced",
        "supersedes": None,
        "bearing": [],
        "refuted": False,
        "refuteNotes": "L3 single-source; flagged for corroboration before high-grade use.",
    })

ledger = {
    "onet_soc_code": SOC,
    "researchMethod": "factiva-l3-hybrid",
    "title": "Product Director (management field grain)",
    "aliases": [],
    "anzsco": None,
    "window": {"from": raw["window"][0], "to": raw["window"][1]},
    "generated": today.isoformat(),
    "expires": expires.isoformat(),
    "programs": [],
    "claims": claims,
    "jobAds": {"source": "none-this-pass", "query": None, "window": None,
               "count": 0, "topEmployers": [], "topSkills": []},
    "corpus": {"platforms": [], "retrieved": today.isoformat(),
               "searchesReturningNothing": [
                   "Factiva query 'general manager artificial intelligence automation' returned 0 (content restriction on academic licence)"
               ]},
    "confidence": "low",
    "caveats": [
        "L3-only entry from Factiva hybrid lane; no L1/L2/L5 corroboration in this pass.",
        "Factiva session is cookie-based and expires (hours-1 day); re-run factiva_reauth.py to refresh.",
    ],
}

OUT.write_text(json.dumps(ledger, indent=2))
print(f"wrote {len(claims)} L3 claims -> {OUT} (confidence: low)")
