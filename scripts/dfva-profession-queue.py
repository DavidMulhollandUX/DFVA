#!/usr/bin/env python3
"""Durable queue state for the profession deep-research loop.

A record is complete only when it carries the empirical-run marker introduced
by the live five-lane workflow. The 2026-08-24 placeholder corpus deliberately
does not count as complete even though those JSON files exist.
"""
from __future__ import annotations

import argparse
import json
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATE = ROOT / "data" / "professions" / "research-queue.json"
PROFESSIONS = ROOT / "data" / "professions"
DONE_MARKER = "empirical-five-lane-v1"


def all_socs() -> list[str]:
    return sorted(
        p.stem for p in PROFESSIONS.glob("*.json")
        if p.name != STATE.name
    )


def is_empirical(soc: str) -> bool:
    p = PROFESSIONS / f"{soc}.json"
    evidence = PROFESSIONS / soc / "evidence.md"
    if not p.exists() or not evidence.exists():
        return False
    try:
        rec = json.loads(p.read_text())
    except (OSError, json.JSONDecodeError):
        return False
    return rec.get("researchMethod") == DONE_MARKER


def initial_state() -> dict:
    socs = all_socs()
    return {
        "version": 1,
        "method": DONE_MARKER,
        "created": datetime.now(timezone.utc).isoformat(),
        "queue": socs,
        "status": {soc: ("done" if is_empirical(soc) else "pending") for soc in socs},
        "attempts": {},
        "leases": {},
        "runs": [],
    }


def load() -> dict:
    if not STATE.exists():
        st = initial_state()
        save(st)
        return st
    return json.loads(STATE.read_text())


def save(st: dict) -> None:
    STATE.parent.mkdir(parents=True, exist_ok=True)
    fd, temp = tempfile.mkstemp(prefix=STATE.name, dir=STATE.parent)
    try:
        with os.fdopen(fd, "w") as f:
            json.dump(st, f, indent=2)
            f.write("\n")
        os.replace(temp, STATE)
    finally:
        if os.path.exists(temp):
            os.unlink(temp)


def reconcile(st: dict) -> dict:
    current = all_socs()
    for soc in current:
        if soc not in st["queue"]:
            st["queue"].append(soc)
        if is_empirical(soc):
            st["status"][soc] = "done"
        elif st["status"].get(soc) == "done":
            st["status"][soc] = "pending"
        else:
            st["status"].setdefault(soc, "pending")
    return st


def next_pending(st: dict) -> str | None:
    for soc in st["queue"]:
        if st["status"].get(soc) in {"pending", "retry"}:
            return soc
    return None


def summary(st: dict) -> dict:
    values = list(st["status"].values())
    return {
        "total": len(st["queue"]),
        "done": values.count("done"),
        "pending": values.count("pending") + values.count("retry"),
        "blocked": values.count("blocked"),
        "in_progress": values.count("in_progress"),
        "next": next_pending(st),
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("action", choices=["init", "next", "status", "done", "retry", "block"])
    ap.add_argument("soc", nargs="?")
    ap.add_argument("--note", default="")
    args = ap.parse_args()
    st = reconcile(load())

    if args.action in {"done", "retry", "block"}:
        if not args.soc or args.soc not in st["status"]:
            ap.error("a queued SOC is required")
        new_status = {"done": "done", "retry": "retry", "block": "blocked"}[args.action]
        st["status"][args.soc] = new_status
        st["attempts"][args.soc] = st["attempts"].get(args.soc, 0) + 1
        st["runs"].append({
            "at": datetime.now(timezone.utc).isoformat(),
            "soc": args.soc,
            "status": new_status,
            "note": args.note,
        })
    save(st)

    if args.action == "next":
        print(next_pending(st) or "COMPLETE")
    else:
        print(json.dumps(summary(st), indent=2))


if __name__ == "__main__":
    main()
