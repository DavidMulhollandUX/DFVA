#!/usr/bin/env python3
"""l5_backfill.py — run last30days L5 across SOCs missing corpus.l5Sample.

For each SOC in the need list:
  python3.12 scripts/l5_plan.py "<title>" --soc <soc> --days 180 --out <soc>/raw/l5_plan.json
  python3.12 ~/.claude/skills/last30days/scripts/last30days.py "<title> AI disruption" \
      --plan <soc>/raw/l5_plan.json --emit json --json-profile raw --days 180 \
      --as-of <today> --save-dir <soc>/raw/ --max-source-fetches 6 --no-browser-cookies
  python3.12 scripts/l5_fold.py <soc>
Skips SOCs already carrying corpus.l5Sample. Logs failures to
data/professions/l5_backlog.json (gitignored) and continues — never blocks.

Mirrors linkedin_backfill.py. Chunked so a long run can resume.

Usage:
  python3.12 scripts/l5_backfill.py [--chunk 20] [--days 180]
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
NEED = Path("/tmp/l5_need.txt")
BACKLOG = REPO / "data/professions/l5_backlog.json"
L30 = Path.home() / ".claude/skills/last30days/scripts/last30days.py"
TODAY = dt.date.today().isoformat()


def _run(cmd: list[str], timeout: int = 300) -> int:
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
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
    ap.add_argument("--chunk", type=int, default=20, help="max SOCs this run")
    ap.add_argument("--days", type=int, default=180)
    ap.add_argument("--need", default=str(NEED), help="path to need-list (one SOC per line)")
    args = ap.parse_args()

    need = Path(args.need)
    socs = [s.strip() for s in (need.read_text().splitlines() if need.exists() else []) if s.strip()]

    # skip already-done (l5Sample present)
    todo = []
    for soc in socs:
        rec = REPO / f"data/professions/{soc}.json"
        if not rec.exists():
            continue
        try:
            d = json.loads(rec.read_text())
        except Exception:
            continue
        if d.get("corpus", {}).get("l5Sample"):
            continue
        todo.append(soc)

    chunk = todo[: args.chunk]
    print(f"[l5_backfill] {len(socs)} listed, {len(todo)} needing, processing chunk of {len(chunk)}")

    done = 0
    failed = []
    for soc in chunk:
        title = title_for(soc)
        raw_dir = REPO / f"data/professions/{soc}/raw"
        plan = raw_dir / "l5_plan.json"
        # 1. plan
        rc = _run(["python3.12", "scripts/l5_plan.py", title, "--soc", soc,
                   "--days", str(args.days), "--out", str(plan)])
        if rc != 0:
            failed.append({"soc": soc, "stage": "plan", "rc": rc})
            continue
        # 2. run engine
        rc = _run([
            "python3.12", str(L30), f"{title} AI disruption",
            "--plan", str(plan), "--emit", "json", "--json-profile", "raw",
            "--days", str(args.days), "--as-of", TODAY,
            "--save-dir", str(raw_dir), "--max-source-fetches", "6",
            "--no-browser-cookies",
        ])
        if rc != 0:
            failed.append({"soc": soc, "stage": "engine", "rc": rc})
            continue
        # 3. fold
        rc = _run(["python3.12", "scripts/l5_fold.py", soc])
        if rc != 0:
            failed.append({"soc": soc, "stage": "fold", "rc": rc})
            continue
        done += 1

    if failed:
        backlog = json.loads(BACKLOG.read_text()) if BACKLOG.exists() else {"entries": []}
        for f in failed:
            f["at"] = TODAY
            backlog["entries"].append(f)
        BACKLOG.write_text(json.dumps(backlog, indent=2))

    processed = set(chunk)
    remaining = [s for s in todo if s not in processed]
    need.write_text("\n".join(remaining) + "\n")
    print(f"[l5_backfill] DONE: folded={done}, failed={len(failed)}, remaining={len(remaining)}")


if __name__ == "__main__":
    main()
