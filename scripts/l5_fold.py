#!/usr/bin/env python3
"""l5_fold.py — fold a last30days L5 raw payload into a profession ledger.

Reads the emitted JSON (key: items_by_source), converts each item to an L5
claim in the Section 4 shape, and merges into data/professions/<soc>.json.
Mirrors the Factiva fold's merge discipline: never overwrites, dedupes by text.

Usage:
  python3.12 scripts/l5_fold.py <soc> [--raw data/professions/<soc>/raw/<file>.json]
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = dt.date.today().isoformat()


def _item_fields(item: dict) -> tuple[str, str, str, str]:
    """Return (text, url, source_label, date) from a last30days item."""
    text = (item.get("body") or item.get("text") or item.get("title") or "").strip()
    url = item.get("url") or item.get("link") or ""
    container = item.get("container") or item.get("author") or ""
    src_label = item.get("source") or ""
    if not src_label and container:
        src_label = container
    date = item.get("published_at") or item.get("date") or ""
    return text, url, src_label, date


def fold(soc: str, raw_path: Path) -> int:
    rec_path = REPO / f"data/professions/{soc}.json"
    if not rec_path.exists():
        print(f"[l5_fold] ledger missing for {soc}; skipping")
        return 0
    d = json.loads(rec_path.read_text())
    raw = json.loads(raw_path.read_text())
    ibs = raw.get("items_by_source", {})

    existing = d.get("claims", [])
    seen = {c.get("text", "") for c in existing}
    start = len(existing) + 1
    added = 0
    for src, items in ibs.items():
        if not isinstance(items, list):
            continue
        for it in items:
            text, url, label, date = _item_fields(it)
            if not text or text in seen:
                continue
            existing.append({
                "id": f"l5{start+added:02d}",
                "text": (text[:500] + "…") if len(text) > 500 else text,
                "lane": "L5",
                "tier": "practitioner-discourse",
                "sources": [{
                    "publisher": label,
                    "title": (text[:80] + "…") if len(text) > 80 else text,
                    "url": url,
                    "date": date,
                    "whatItMeasured": f"last30days L5 practitioner discourse ({src}); retrieved {TODAY}",
                }],
                "scope": "Practitioner discourse sample (self-selected); not a representative survey.",
                "disposition": "sourced",
                "supersedes": None,
                "bearing": [],
                "refuted": False,
                "refuteNotes": "L5 single-source; corroborate before high-grade use. Declared sample replaces 'no platform sampled'.",
            })
            seen.add(text)
            added += 1

    d["claims"] = existing
    corpus = d.setdefault("corpus", {})
    srn = corpus.get("searchesReturningNothing", []) or []
    # Remove the stale "no platform was sampled" note L5 now satisfies.
    srn = [s for s in srn if "no platform" not in json.dumps(s).lower()]
    corpus["searchesReturningNothing"] = srn
    if added:
        corpus.setdefault("l5Sample", []).append({
            "date": TODAY, "added": added,
            "sources": {k: len(v) for k, v in ibs.items() if isinstance(v, list)},
            "status": "sampled",
        })
    d["confidence"] = _bump(d.get("confidence"), added)
    rec_path.write_text(json.dumps(d, indent=2))
    return added


def _bump(conf: str | None, added: int) -> str:
    if added == 0:
        return conf or "low"
    if conf == "high":
        return "high"
    # L5 declared sample lifts a low/medium record toward medium-confidence L5 support
    return "medium"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("soc")
    ap.add_argument("--raw", default=None,
                    help="Raw last30days JSON. Default: newest matching file in <soc>/raw/")
    args = ap.parse_args()

    if args.raw:
        raw = Path(args.raw)
    else:
        cands = sorted((REPO / f"data/professions/{args.soc}/raw").glob("*-raw.json"),
                       key=lambda p: p.stat().st_mtime, reverse=True)
        raw = cands[0] if cands else None
    if not raw or not raw.exists():
        print(f"[l5_fold] no raw payload found for {args.soc}")
        sys.exit(1)

    added = fold(args.soc, raw)
    print(f"[l5_fold] {args.soc}: folded {added} L5 claims from {raw.name}")


if __name__ == "__main__":
    import sys
    main()
