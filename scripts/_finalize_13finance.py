#!/usr/bin/env python3.12
"""Finalize the business-finance batch ledgers: set the empirical-five-lane marker,
derive confidence, widen the window to today, set expiry, and record the L5 grounding
source failure as a coverage gap. Also logs Factiva (auth_expired) to factiva_backlog.json.
"""
import json
from datetime import date, timedelta
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = date.today().isoformat()
EXPIRES = (date.today() + timedelta(days=180)).isoformat()
PROF = REPO / "data" / "professions"

SOC_TITLES = {"13-2061": "Financial Examiners", "13-2072": "Loan Officers"}

# L5 engine warning this run: grounding + jobs sources failed.
GROUNDING_GAP = {"lane": "L5", "source": "grounding", "status": "source_failed",
                 "detail": "last30days reported 'grounding' source failed on 2026-08-30 run; reddit/x/youtube/hackernews/polymarket/github succeeded. Coverage gap, not a finding.",
                 "date": TODAY}


def lane_counts(soc):
    d = json.loads((PROF / f"{soc}.json").read_text())
    claims = d.get("claims", [])
    n = {"L1": 0, "L2": 0, "L3": 0, "L4": 0, "L5": 0}
    for c in claims:
        ln = c.get("lane")
        if ln in n:
            n[ln] += 1
    has_l5 = bool(d.get("corpus", {}).get("l5Sample"))
    return n, has_l5


def derive_confidence(n, has_l5):
    if (n["L1"] >= 2 or n["L2"] >= 2) and has_l5:
        return "high"
    if n["L3"] >= 1:
        return "medium"
    return "low"


def main():
    for soc, title in SOC_TITLES.items():
        p = PROF / f"{soc}.json"
        d = json.loads(p.read_text())
        n, has_l5 = lane_counts(soc)
        conf = derive_confidence(n, has_l5)
        d["researchMethod"] = "empirical-five-lane-v1"
        d["title"] = title
        w = d.setdefault("window", {})
        w["from"] = w.get("from", "2025-08-01")
        w["to"] = TODAY
        d["generated"] = TODAY
        d["expires"] = EXPIRES
        d["confidence"] = conf
        corpus = d.setdefault("corpus", {})
        srn = corpus.setdefault("searchesReturningNothing", [])
        if not any(g.get("lane") == "L5" and g.get("source") == "grounding" for g in srn):
            srn.append(GROUNDING_GAP)
        d.setdefault("caveats", []).append(
            f"L3 Factiva degraded (auth_expired) 2026-08-30; L3 trade-press sourced via web. L5 grounding source failed this run.")
        p.write_text(json.dumps(d, indent=2))
        print(f"[finalize] {soc} {title}: L1={n['L1']} L2={n['L2']} L3={n['L3']} L4={n['L4']} L5={n['L5']} -> confidence={conf}")

    # Log Factiva auth_expired to backlog (gitignored; do not block).
    backlog = REPO / "data" / "professions" / "factiva_backlog.json"
    bl = json.loads(backlog.read_text()) if backlog.exists() else {
        "version": 1, "updated": "", "entries": {}}
    bl["updated"] = f"{TODAY}T00:00:00+00:00"
    for soc, title in SOC_TITLES.items():
        bl["entries"][soc] = {
            "soc": soc, "title": title, "reason": "auth_expired",
            "detail": "OpenAthens session expired; re-run scripts/factiva_reauth.py to refresh before backfill. L3 web trade-press sourced this run as fallback.",
            "attempts": bl.get("entries", {}).get(soc, {}).get("attempts", 0) + 1,
            "lastAttempt": TODAY,
            "queries": [f"{title} AI disruption"],
        }
    backlog.write_text(json.dumps(bl, indent=2))
    print("[finalize] factiva_backlog updated for both SOCs (auth_expired)")


if __name__ == "__main__":
    main()
