#!/usr/bin/env python3
"""factiva_log.py — durable log of Factiva L3 attempts for backfill tracking.

Every Factiva lane run (success, empty, restricted, or auth-fail) appends a
structured line to data/factiva_failures.jsonl so gaps are discoverable and
backfillable later. No claim content is stored here — only metadata needed to
decide whether a SOC needs a retry.

Usage:
  python3.12 scripts/factiva_log.py --soc 23-1011 --query "lawyers AI" \
      --status success --count 15 --note "folded as L3 claims"
  python3.12 scripts/factiva_log.py --soc 23-1011 --query "lawyers AI" \
      --status restricted --count 0 --note "academic licence returned 0 for this phrasing"
  python3.12 scripts/factiva_log.py --pending        # list SOCs with no success
"""
from __future__ import annotations
import argparse
import datetime as dt
import json
import sys
from pathlib import Path

LOG = Path("data/factiva_failures.jsonl")


def log_attempt(soc: str, query: str, status: str, count: int, note: str = "") -> None:
    entry = {
        "ts": dt.datetime.now(dt.timezone.utc).isoformat(),
        "soc": soc,
        "query": query,
        "status": status,            # success | empty | restricted | auth-fail | error
        "count": count,
        "note": note,
    }
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with LOG.open("a") as f:
        f.write(json.dumps(entry) + "\n")
    print(f"[factiva-log] {soc} {status} (n={count})")


def list_pending() -> None:
    if not LOG.exists():
        print("no factiva log yet")
        return
    by_soc: dict[str, list[dict]] = {}
    for line in LOG.read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            e = json.loads(line)
        except Exception:
            continue
        by_soc.setdefault(e["soc"], []).append(e)
    print("SOCs with NO successful Factiva run (backfill candidates):")
    any_pending = False
    for soc, entries in sorted(by_soc.items()):
        succeeded = any(e["status"] == "success" and e["count"] > 0 for e in entries)
        if not succeeded:
            any_pending = True
            last = entries[-1]
            print(f"  {soc}  last={last['status']} ({last['ts'][:10]})  note={last['note'][:60]}")
    if not any_pending:
        print("  (none — all attempted SOCs have at least one success)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--soc")
    ap.add_argument("--query", default="")
    ap.add_argument("--status", choices=["success", "empty", "restricted", "auth-fail", "error"])
    ap.add_argument("--count", type=int, default=0)
    ap.add_argument("--note", default="")
    ap.add_argument("--pending", action="store_true", help="list SOCs with no successful run")
    args = ap.parse_args()
    if args.pending:
        list_pending()
        return
    if not args.soc or not args.status:
        print("ERROR: --soc and --status required (or use --pending)", file=sys.stderr)
        sys.exit(2)
    log_attempt(args.soc, args.query, args.status, args.count, args.note)


if __name__ == "__main__":
    main()
