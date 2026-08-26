#!/usr/bin/env python3
"""Fold a Factiva L3 raw payload into a profession claim ledger (Section 4 shape).

MERGES: appends Factiva L3 claims to an existing data/professions/<soc>.json
rather than overwriting it, so prior L1/L2/L4/L5 claims are preserved. If the
record does not exist yet, it creates an L3-led (low-confidence) record.
"""
from __future__ import annotations
import datetime as dt, json, sys, glob, os
from pathlib import Path

SOC = sys.argv[1] if len(sys.argv) > 1 else "11-1021"
RAW = Path(f"data/professions/{SOC}/raw/factiva_l3.json")
OUT = Path(f"data/professions/{SOC}.json")

if not RAW.exists():
    die = lambda m: (print(m, file=sys.stderr), sys.exit(1))
    die(f"no raw payload at {RAW}")

raw = json.loads(RAW.read_text())
today = dt.date.today()
expires = today + dt.timedelta(days=180)

new_claims = []
for i, r in enumerate(raw["results"], 1):
    new_claims.append({
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
        "scope": "Trade-press report; not a primary study.",
        "disposition": "sourced",
        "supersedes": None,
        "bearing": [],
        "refuted": False,
        "refuteNotes": "L3 single-source; corroborate before high-grade use.",
    })

# Resolve title from crosswalk if not in record
def crosswalk_title(soc):
    for fn in ["data/aioe/v31_extension_crosswalk.csv"]:
        if not os.path.exists(fn):
            continue
        import csv
        for r in csv.DictReader(open(fn)):
            if (r.get("onet_soc_code") or r.get("soc")) == soc:
                return r.get("title") or r.get("soc_title") or f"SOC {soc}"
    return f"SOC {soc}"

if OUT.exists():
    ledger = json.loads(OUT.read_text())
    existing_ids = {c.get("id") for c in ledger.get("claims", [])}
    added = 0
    for c in new_claims:
        if c["id"] not in existing_ids:
            ledger["claims"].append(c)
            added += 1
    # widen window to include the L3 search window
    w = ledger.get("window", {})
    ledger["window"] = {
        "from": min(w.get("from", raw["window"][0]), raw["window"][0]),
        "to": max(w.get("to", raw["window"][1]), raw["window"][1]),
    }
    if "factivaL3Backfilled" not in ledger.get("caveats", []):
        ledger.setdefault("caveats", []).append(
            f"L3 Factiva claims backfilled {today.isoformat()} (hybrid cookie session).")
    ledger["generated"] = today.isoformat()
    ledger["expires"] = expires.isoformat()
    msg = f"merged {added} new L3 claims into existing record (total {len(ledger['claims'])})"
else:
    ledger = {
        "onet_soc_code": SOC,
        "researchMethod": "factiva-l3-hybrid",
        "title": crosswalk_title(SOC),
        "aliases": [],
        "anzsco": None,
        "window": {"from": raw["window"][0], "to": raw["window"][1]},
        "generated": today.isoformat(),
        "expires": expires.isoformat(),
        "programs": [],
        "claims": new_claims,
        "jobAds": {"source": "none-this-pass", "query": None, "window": None,
                   "count": 0, "topEmployers": [], "topSkills": []},
        "corpus": {"platforms": [], "retrieved": today.isoformat(),
                   "searchesReturningNothing": []},
        "confidence": "low",
        "caveats": ["L3-only entry from Factiva hybrid lane (backfill); no L1/L2/L5 corroboration in this pass."],
    }
    msg = f"created L3-led record with {len(new_claims)} claims (confidence: low)"

OUT.write_text(json.dumps(ledger, indent=2))
print(f"[{SOC}] {msg}")
