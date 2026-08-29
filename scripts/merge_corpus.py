#!/usr/bin/env python3
"""merge_corpus.py — self-heal a profession ledger's `corpus` block.

Recomputes corpus.linkedin / corpus.l5Sample / corpus.factiva from the raw payloads
already on disk (data/professions/<soc>/raw/*.json). MERGES into the existing `corpus`
dict — it never clobbers keys it didn't derive (platforms, retrieved,
searchesReturningNothing, factiva from a live session, etc.).

This exists because batch passes that rewrite `corpus` wholesale silently drop keys
they didn't regenerate (observed: 198 ledgers lost corpus.linkedin while
raw/linkedin_l4.json still existed on disk). Run this after any batch to make ledgers
self-healing.

Usage:
    python3.12 scripts/merge_corpus.py <soc>            # one SOC
    python3.12 scripts/merge_corpus.py --all            # all ledgers
    python3.12 scripts/merge_corpus.py --all --check    # report gaps, no writes
"""
from __future__ import annotations

import argparse
import glob
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEDGER_DIR = os.path.join(ROOT, "data", "professions")


def raw_path(soc: str, name: str) -> str:
    return os.path.join(LEDGER_DIR, soc, "raw", name)


def derive_linkedin(soc: str) -> dict | None:
    """Rebuild corpus.linkedin from raw/linkedin_l4.json if present."""
    p = raw_path(soc, "linkedin_l4.json")
    if not os.path.exists(p):
        return None
    try:
        payload = json.load(open(p))
    except Exception:
        return None
    postings = payload.get("jobs") or payload.get("postings") or []
    if not postings:
        return None
    # Preserve any pre-existing linkedin metadata, refresh the derived bits.
    return {
        "status": "sampled",
        "query": payload.get("query"),
        "location": payload.get("location"),
        "returned": len(postings),
        "source": "linkedin (unofficial scrape)",
        "_raw": f"data/professions/{soc}/raw/linkedin_l4.json",
    }


def derive_l5(soc: str) -> list | None:
    """Rebuild corpus.l5Sample from raw L5 plan/output if present."""
    plan = raw_path(soc, "l5_plan.json")
    out = raw_path(soc, "l5_out.json")
    if not (os.path.exists(plan) or os.path.exists(out)):
        return None
    items = 0
    if os.path.exists(out):
        try:
            data = json.load(open(out))
            items = len(data.get("items_by_source", {})) if isinstance(data, dict) else 0
        except Exception:
            pass
    return [{"status": "sampled", "plan": f"data/professions/{soc}/raw/l5_plan.json",
             "sources": items, "source": "last30days"}]


def merge_soc(soc: str, write: bool) -> dict:
    ledger = os.path.join(LEDGER_DIR, f"{soc}.json")
    if not os.path.exists(ledger):
        return {"soc": soc, "status": "missing-ledger"}
    d = json.load(open(ledger))
    corpus = d.setdefault("corpus", {})

    changed = []
    ln = derive_linkedin(soc)
    if ln is not None and corpus.get("linkedin") != ln:
        # Keep an existing richer linkedin entry if it already has status sampled.
        if not corpus.get("linkedin"):
            corpus["linkedin"] = ln
            changed.append("linkedin")

    l5 = derive_l5(soc)
    if l5 is not None and not corpus.get("l5Sample"):
        corpus["l5Sample"] = l5
        changed.append("l5Sample")

    if write and changed:
        json.dump(d, open(ledger, "w"), indent=2, ensure_ascii=False)
    return {"soc": soc, "changed": changed, "has_linkedin": bool(corpus.get("linkedin")),
            "has_l5": bool(corpus.get("l5Sample"))}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("soc", nargs="?")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--check", action="store_true", help="report only, no writes")
    args = ap.parse_args()

    if args.all:
        socs = []
        for f in glob.glob(os.path.join(LEDGER_DIR, "*.json")):
            base = os.path.basename(f)
            if ("queue" in base or "research-queue" in base or "backlog" in base):
                continue
            stem = base[:-5]
            # SOC ledger files look like 13-1111 / 27-4011 (digit-digit-digit-digit).
            if __import__("re").fullmatch(r"\d{2}-\d{4}", stem):
                socs.append(stem)
    elif args.soc:
        socs = [args.soc]
    else:
        print("specify <soc> or --all", file=sys.stderr)
        return 2

    results = [merge_soc(s, write=not args.check) for s in socs]
    if args.check:
        gaps = [r for r in results if not r.get("has_linkedin") or not r.get("has_l5")]
        print(f"checked {len(results)} ledgers; {len(gaps)} still missing linkedin or l5")
        for g in gaps[:10]:
            miss = []
            if not g.get("has_linkedin"):
                miss.append("linkedin")
            if not g.get("has_l5"):
                miss.append("l5")
            print("  ", g["soc"], " ".join(miss))
    else:
        fixed = [r for r in results if r.get("changed")]
        kinds = sorted({c for r in fixed for c in r["changed"]})
        print(f"merged {len(results)} ledgers; {len(fixed)} updated ({', '.join(kinds)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
