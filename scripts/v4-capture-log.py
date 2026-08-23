#!/usr/bin/env python3
"""Run logger for DFVA v4 handbook capture.

Appends structured run records to:
- scrapes/v4/runs.log
- .claude/logs/v4-capture-runs.log
- scrapes/v4/batch-summary.json

Usage:
    python3 scripts/v4-capture-log.py --action capture --attempted 15 --saved 15 --assembled "080cl" --details "..."
    python3 scripts/v4-capture-log.py --action cooloff --reason "Incapsula block" --remaining 18
    python3 scripts/v4-capture-log.py --action attend --reason "Repeated challenge"
    python3 scripts/v4-capture-log.py --action idle --details "All 18 completed"
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V4_DIR = os.path.join(ROOT, "scrapes", "v4")
RUNS_LOG = os.path.join(V4_DIR, "runs.log")
CLAUDE_LOGS = os.path.join(ROOT, ".claude", "logs")
CLAUDE_RUNS_LOG = os.path.join(CLAUDE_LOGS, "v4-capture-runs.log")
SUMMARY_JSON = os.path.join(V4_DIR, "batch-summary.json")
QUEUE_SCRIPT = os.path.join(ROOT, "scripts", "v4-capture-queue.py")


def get_queue_status() -> str:
    try:
        proc = subprocess.run(
            [sys.executable, QUEUE_SCRIPT, "status"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            timeout=10,
        )
        lines = (proc.stdout or "").strip().splitlines()
        return "\n".join(lines[-4:]) if lines else "Status unavailable"
    except Exception as e:
        return f"Error reading queue status: {e}"


def log_run(
    action: str,
    attempted: int = 0,
    saved: int = 0,
    failed: int = 0,
    assembled: str = "",
    reason: str = "",
    remaining_mins: int = 0,
    details: str = "",
) -> None:
    now_utc = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    now_local = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    queue_status = get_queue_status()

    record = {
        "timestamp_utc": now_utc,
        "timestamp_local": now_local,
        "action": action,
        "attempted": attempted,
        "saved": saved,
        "failed": failed,
        "assembled": [a.strip() for a in assembled.split(",") if a.strip()],
        "reason": reason,
        "minutes_remaining": remaining_mins,
        "details": details,
        "queue_summary": queue_status.splitlines()[-1] if queue_status else "",
    }

    # 1. Update batch-summary.json
    os.makedirs(V4_DIR, exist_ok=True)
    with open(SUMMARY_JSON, "w", encoding="utf-8") as f:
        json.dump(record, f, indent=2, ensure_ascii=False)

    # 2. Format human-readable entry
    entry_lines = [
        f"[{now_local}] ACTION={action.upper()} attempted={attempted} saved={saved} failed={failed}",
    ]
    if assembled:
        entry_lines.append(f"  Assembled: {assembled}")
    if reason:
        entry_lines.append(f"  Reason: {reason}")
    if remaining_mins > 0:
        entry_lines.append(f"  Cooloff remaining: {remaining_mins}m")
    if details:
        entry_lines.append(f"  Details: {details}")
    if queue_status:
        entry_lines.append(f"  Queue: {queue_status.splitlines()[-1]}")
    entry_lines.append("-" * 60)
    entry_text = "\n".join(entry_lines) + "\n"

    # 3. Append to scrapes/v4/runs.log
    with open(RUNS_LOG, "a", encoding="utf-8") as f:
        f.write(entry_text)

    # 4. Append to .claude/logs/v4-capture-runs.log
    os.makedirs(CLAUDE_LOGS, exist_ok=True)
    with open(CLAUDE_RUNS_LOG, "a", encoding="utf-8") as f:
        f.write(entry_text)

    print(f"Logged run to {os.path.relpath(RUNS_LOG, ROOT)} and {os.path.relpath(CLAUDE_RUNS_LOG, ROOT)}")


def main():
    parser = argparse.ArgumentParser(description="Log DFVA v4 capture run")
    parser.add_argument("--action", required=True, choices=["capture", "cooloff", "attend", "idle", "error"])
    parser.add_argument("--attempted", type=int, default=0)
    parser.add_argument("--saved", type=int, default=0)
    parser.add_argument("--failed", type=int, default=0)
    parser.add_argument("--assembled", default="")
    parser.add_argument("--reason", default="")
    parser.add_argument("--remaining", type=int, default=0)
    parser.add_argument("--details", default="")

    args = parser.parse_args()
    log_run(
        action=args.action,
        attempted=args.attempted,
        saved=args.saved,
        failed=args.failed,
        assembled=args.assembled,
        reason=args.reason,
        remaining_mins=args.remaining,
        details=args.details,
    )


if __name__ == "__main__":
    main()
