#!/usr/bin/env python3
"""linkedin_backfill.py — run LinkedIn L4 across SOCs that lack it.

Reads /tmp/linkedin_need.txt (one SOC per line) or --socs, and for each:
  scripts/linkedin_l4.py <soc> --title "<from ledger>" ...
  scripts/linkedin_fold.py <soc>
Skips SOCs already carrying a linkedin corpus. Logs failures to
data/professions/linkedin_backlog.json (gitignored) and continues — never blocks.

Usage:
  python3.12 scripts/linkedin_backfill.py [--chunk 40] [--limit 20]
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
NEED = Path("/tmp/linkedin_need.txt")
BACKLOG = REPO / "data/professions/linkedin_backlog.json"
TODAY = dt.date.today().isoformat()


def _run(cmd: list[str]) -> int:
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    return r.returncode


def title_for(soc: str) -> str:
    rec = REPO / f"data/professions/{soc}.json"
    if rec.exists():
        try:
            d = json.loads(rec.read_text())
            return d.get("title") or soc
        except Exception:
            pass
    return soc


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--chunk", type=int, default=40, help="max SOCs to process this run")
    ap.add_argument("--limit", type=int, default=20)
    ap.add_argument("--socs", default=None, help="comma-sep SOCs; overrides need file")
    args = ap.parse_args()

    if args.socs:
        socs = [s.strip() for s in args.socs.split(",") if s.strip()]
    else:
        socs = [s.strip() for s in (NEED.read_text().splitlines() if NEED.exists() else []) if s.strip()]

    # skip already-done
    todo = []
    for soc in socs:
        rec = REPO / f"data/professions/{soc}.json"
        if not rec.exists():
            continue
        try:
            d = json.loads(rec.read_text())
        except Exception:
            continue
        if d.get("corpus", {}).get("linkedin"):
            continue
        todo.append(soc)

    chunk = todo[: args.chunk]
    print(f"[linkedin_backfill] {len(socs)} listed, {len(todo)} needing, processing chunk of {len(chunk)}")

    done = 0
    failed = []
    for soc in chunk:
        title = title_for(soc)
        rc = _run([
            "python3.12", "scripts/linkedin_l4.py", soc,
            "--title", title, "--location", "Australia", "--limit", str(args.limit),
        ])
        if rc != 0:
            failed.append({"soc": soc, "stage": "fetch", "rc": rc})
            continue
        rc = _run(["python3.12", "scripts/linkedin_fold.py", soc])
        if rc != 0:
            failed.append({"soc": soc, "stage": "fold", "rc": rc})
            continue
        done += 1

    # log failures (durable, gitignored)
    if failed:
        backlog = json.loads(BACKLOG.read_text()) if BACKLOG.exists() else {"entries": []}
        for f in failed:
            f["at"] = TODAY
            backlog["entries"].append(f)
        BACKLOG.write_text(json.dumps(backlog, indent=2))

    # rewrite need list minus processed
    processed = set(chunk)
    remaining = [s for s in todo if s not in processed]
    NEED.write_text("\n".join(remaining) + "\n")
    print(f"[linkedin_backfill] DONE: folded={done}, failed={len(failed)}, remaining={len(remaining)}")


if __name__ == "__main__":
    main()
