#!/usr/bin/env python3
"""Backfill Factiva L3 for professions that completed without it.

For each SOC in TARGETS: run several Factiva phrasings, merge any results into
the existing profession ledger as L3 claims, record outcomes in the backlog
(success clears it; no_results logs it), and replace the stale
'omitted: unattended run' corpus note with the real Factiva status.
"""
from __future__ import annotations
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
COOKIES = REPO / "data/factiva_cookies.json"
RESEARCH = REPO / "scripts/factiva_research.py"

# SOC -> (title, [phrasing queries])
TARGETS = {
    "13-1111": ("Management Analysts", [
        "management consultant artificial intelligence",
        "business analyst automation AI",
        "management consulting digital transformation",
    ]),
    "23-1011": ("Lawyers", [
        "lawyers artificial intelligence legal tech",
        "legal profession AI contract review",
        "solicitors automation practice",
    ]),
    "45-1011": ("First-Line Supervisors Farming/Fishing/Forestry", [
        "farm manager artificial intelligence",
        "agriculture automation farm supervision",
        "agtech farm management",
    ]),
    "45-2011": ("Agricultural Inspectors", [
        "biosecurity officer artificial intelligence",
        "agricultural inspection automation",
        "quarantine technology digital",
    ]),
    "45-2091": ("Agricultural Equipment Operators", [
        "farm machinery operator automation",
        "agricultural equipment autonomous",
        "precision agriculture technology",
    ]),
    "45-2093": ("Farmworkers Farm/Ranch Animals", [
        "livestock worker automation",
        "farm animal technology AI",
        "agriculture labour robotics",
    ]),
    "47-1011": ("First-Line Supervisors Construction Trades", [
        "construction supervisor artificial intelligence",
        "building site management digital",
        "construction technology automation",
    ]),
    "47-2061": ("Construction Laborers", [
        "construction labourer automation",
        "building trades technology AI",
        "construction site robotics",
    ]),
    "47-2111": ("Electricians", [
        "electrician artificial intelligence",
        "electrical trade automation",
        "electrician digital tools",
    ]),
}

TODAY = dt.date.today().isoformat()
FROM = "2024-01-01"


def run_factiva(soc: str, title: str, query: str) -> dict:
    out = REPO / f"data/professions/{soc}/raw/factiva_backfill_{abs(hash(query))}.json"
    cmd = [
        sys.executable, str(RESEARCH),
        "--soc", soc, "--title", title,
        "--query", query, "--from", FROM, "--to", TODAY,
        "--max", "15", "--cookies", str(COOKIES),
        "--out", str(out), "--log-backlog",
    ]
    try:
        subprocess.run(cmd, cwd=REPO, check=True, capture_output=True, text=True,
                       timeout=150)
    except subprocess.CalledProcessError as e:
        print(f"  [run err] {soc} '{query[:40]}': {e.stderr[:120]}")
        return {"count": 0, "results": [], "authenticated": False}
    try:
        return json.loads(out.read_text())
    except Exception:
        return {"count": 0, "results": [], "authenticated": False}


def merge_into_ledger(soc: str, results: list[dict]) -> int:
    ledger = REPO / f"data/professions/{soc}.json"
    rec = json.loads(ledger.read_text())
    existing = rec.get("claims", [])
    start_id = len(existing) + 1
    added = 0
    seen_texts = {c.get("text", "") for c in existing}
    for r in results:
        text = r.get("headline", "").strip()
        if not text or text in seen_texts:
            continue
        existing.append({
            "id": f"l3bf{start_id + added:02d}",
            "text": text,
            "lane": "L3",
            "tier": "trade-press-dated",
            "sources": [{
                "publisher": r.get("source", ""),
                "title": text,
                "url": r.get("url", ""),
                "date": r.get("date", ""),
                "whatItMeasured": f"Factiva trade-press item, retrieved {r.get('accessDate','')}",
            }],
            "scope": "Trade-press report (Factiva backfill); not a primary study.",
            "disposition": "sourced",
            "supersedes": None,
            "bearing": [],
            "refuted": False,
            "refuteNotes": "L3 single-source backfill; corroborate before high-grade use.",
        })
        seen_texts.add(text)
        added += 1
    rec["claims"] = existing
    # Rewrite the Factiva corpus note to reflect the real backfill outcome
    # (replacing the stale "omitted: unattended run" note either way).
    corpus = rec.setdefault("corpus", {})
    srn = corpus.get("searchesReturningNothing", []) or []
    srn = [s for s in srn if "factiva" not in json.dumps(s).lower()
           or "unattended" not in str(s).lower()]
    if added:
        srn.append({"source": "Factiva", "status": "backfilled",
                    "added": added, "date": TODAY})
        corpus.setdefault("factivaBackfill", []).append({
            "date": TODAY, "added": added, "status": "backfilled"})
    else:
        srn.append({"source": "Factiva", "status": "attempted-no-relevant-results",
                    "date": TODAY,
                    "note": "session live; queries ran, returned 0 occupation-relevant items (academic licence content restriction)"})
    corpus["searchesReturningNothing"] = srn
    rec["confidence"] = _bump(rec.get("confidence"), added)
    ledger.write_text(json.dumps(rec, indent=2))
    return added


def _bump(conf: str | None, added: int) -> str:
    if added == 0:
        return conf or "low"
    # low -> medium if L3 now present; keep high if already high
    if conf == "high":
        return "high"
    return "medium"


def main() -> None:
    if not COOKIES.exists():
        print("ERROR: data/factiva_cookies.json missing — run factiva_reauth.py first", file=sys.stderr)
        sys.exit(2)
    total_added = 0
    for soc, (title, queries) in TARGETS.items():
        print(f"\n=== {soc} {title} ===")
        merged_any = False
        for q in queries:
            res = run_factiva(soc, title, q)
            n = res.get("count", 0)
            auth = res.get("authenticated", True)
            print(f"  '{q[:45]}' -> {n} results" + ("" if auth else " (auth expired)"))
            if n > 0:
                added = merge_into_ledger(soc, res.get("results", []))
                total_added += added
                merged_any = True
                print(f"     +{added} L3 claims folded")
        if not merged_any:
            print(f"  no relevant Factiva results for {soc} (recorded in backlog)")
    print(f"\nTOTAL L3 claims backfilled: {total_added}")
    # show remaining backlog for these 9
    bl = json.loads((REPO / "data/professions/factiva_backlog.json").read_text())
    remain = {s: e["reason"] for s, e in bl["entries"].items() if s in TARGETS}
    print("Remaining backlog for backfilled set:", remain or "all cleared")


if __name__ == "__main__":
    main()
