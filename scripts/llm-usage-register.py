#!/usr/bin/env python3
"""Shared LLM-usage register across harnesses (Hermes + Antigravity).

One JSONL file both harnesses read and write, so we keep a single register of
LLM calls regardless of which agent ran them.

Records (one JSON object per line):
  ts            ISO timestamp
  harness       "hermes" | "antigravity" | "claude"
  model         model id used
  job_id        source job / run id (hermes only)
  fire_id       unique fire id (hermes); synthetic uid for antigravity
  prompt_tokens / completion_tokens / total_tokens   (null if unknown)
  duration_ms   wall time of the call (null if unknown)
  error         error string or null
  note          free-text (e.g. "capture batch 2 pages")

Subcommands:
  sync    Pull new records from Hermes' ~/.hermes/cron/usage_audit.jsonl
          (deduped by fire_id / ts+job_id) into the shared register.
  log     Append a manual record (Antigravity logs its own LLM calls here).
  status  Print a summary of the register (per-harness, per-model, errors).

Run from anywhere; paths resolve relative to the repo root (scripts/..).
"""
import argparse
import json
import os
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
REGISTER = REPO_ROOT / "llm-usage-register.jsonl"
HERMES_AUDIT = Path.home() / ".hermes" / "cron" / "usage_audit.jsonl"


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ")


def _load_register() -> list[dict]:
    if not REGISTER.exists():
        return []
    out = []
    for line in REGISTER.read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            out.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return out


def _dedup_key(rec: dict) -> str:
    fid = rec.get("fire_id")
    if fid:
        return f"fire:{fid}"
    return f"ts:{rec.get('ts')}|job:{rec.get('job_id')}"


def _read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    out = []
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            out.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return out


def cmd_sync(_args) -> int:
    if not HERMES_AUDIT.exists():
        print(f"Hermes audit not found at {HERMES_AUDIT}; nothing to sync.")
        return 0
    existing = {_dedup_key(r) for r in _load_register()}
    audit = _read_jsonl(HERMES_AUDIT)
    added = 0
    with REGISTER.open("a", encoding="utf-8") as fh:
        for rec in audit:
            if _dedup_key(rec) in existing:
                continue
            row = {
                "ts": rec.get("ts"),
                "harness": "hermes",
                "model": rec.get("model"),
                "job_id": rec.get("job_id"),
                "fire_id": rec.get("fire_id"),
                "prompt_tokens": rec.get("prompt_tokens"),
                "completion_tokens": rec.get("completion_tokens"),
                "total_tokens": rec.get("total_tokens"),
                "duration_ms": rec.get("duration_ms"),
                "error": rec.get("error"),
                "note": None,
            }
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")
            existing.add(_dedup_key(rec))
            added += 1
    print(f"Synced {added} new Hermes record(s) into {REGISTER}")
    return 0


def cmd_log(args) -> int:
    harness = args.harness or "antigravity"
    prefix = {"hermes": "her", "antigravity": "agy", "claude": "cla"}.get(harness, "agy")
    row = {
        "ts": _now(),
        "harness": harness,
        "model": args.model,
        "job_id": args.job_id,
        "fire_id": f"{prefix}-{uuid.uuid4().hex[:12]}",
        "prompt_tokens": args.prompt_tokens,
        "completion_tokens": args.completion_tokens,
        "total_tokens": args.total_tokens,
        "duration_ms": args.duration_ms,
        "error": args.error,
        "note": args.note,
    }
    with REGISTER.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(row, ensure_ascii=False) + "\n")
    print(f"Logged {harness} record: model={args.model} note={args.note}")
    return 0


def cmd_status(_args) -> int:
    recs = _load_register()
    if not recs:
        print("Register is empty. Run `sync` first (Hermes) or `log` (Antigravity).")
        return 0
    by_harness: dict[str, int] = {}
    by_model: dict[str, int] = {}
    errors = 0
    total_tokens = 0
    for r in recs:
        h = r.get("harness", "?")
        by_harness[h] = by_harness.get(h, 0) + 1
        m = r.get("model") or "?"
        by_model[m] = by_model.get(m, 0) + 1
        if r.get("error"):
            errors += 1
        if r.get("total_tokens"):
            try:
                total_tokens += int(r["total_tokens"])
            except (TypeError, ValueError):
                pass
    print(f"LLM-usage register: {len(recs)} records  ({REGISTER})")
    print(f"  by harness: {by_harness}")
    print(f"  by model:   {by_model}")
    print(f"  errors:     {errors}")
    print(f"  known total tokens: {total_tokens:,}")
    print("  last 5:")
    for r in recs[-5:]:
        flag = " ERR" if r.get("error") else ""
        print(f"    {r.get('ts')} [{r.get('harness')}] {r.get('model')}{flag} :: {r.get('note') or ''}")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description="Shared LLM-usage register (Hermes + Antigravity).")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("sync", help="Pull new Hermes usage_audit records into the register.")

    pl = sub.add_parser("log", help="Append an LLM-usage record from any harness.")
    pl.add_argument("--model", required=True)
    pl.add_argument("--harness", default="antigravity",
                    choices=["hermes", "antigravity", "claude"],
                    help="Which harness produced this record (default: antigravity).")
    pl.add_argument("--job-id", default=None)
    pl.add_argument("--prompt-tokens", type=int, default=None)
    pl.add_argument("--completion-tokens", type=int, default=None)
    pl.add_argument("--total-tokens", type=int, default=None)
    pl.add_argument("--duration-ms", type=int, default=None)
    pl.add_argument("--error", default=None)
    pl.add_argument("--note", default=None)

    sub.add_parser("status", help="Print a summary of the register.")

    args = p.parse_args()
    if args.cmd == "sync":
        return cmd_sync(args)
    if args.cmd == "log":
        return cmd_log(args)
    if args.cmd == "status":
        return cmd_status(args)
    return 1


if __name__ == "__main__":
    sys.exit(main())
