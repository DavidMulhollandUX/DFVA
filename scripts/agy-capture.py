#!/usr/bin/env python3
"""Antigravity capture runner + shared register logger.

Run inside the Antigravity agent (working dir must be the DFVA repo root, and
Google Chrome must be open). Runs one capture batch and writes the run to the
shared LLM-usage register (scripts/llm-usage-register.py) tagged harness=antigravity.

Usage:
  python3 scripts/agy-capture.py --batch 2 --model tencent/hy3:free
                                  [--prompt-tokens N] [--completion-tokens N]
                                  [--duration-ms N] [--note "..."]

The token/duration args are best-effort: pass what the harness exposes. If
omitted, the register records the run with nulls (still useful as a heartbeat).
"""
import argparse
import subprocess
import sys
import time
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REGISTER = REPO / "scripts" / "llm-usage-register.py"


def _run(cmd: list[str]) -> int:
    print(f"$ {' '.join(cmd)}", flush=True)
    r = subprocess.run(cmd, cwd=str(REPO))
    return r.returncode


def main() -> int:
    p = argparse.ArgumentParser(description="Antigravity capture runner + register logger.")
    p.add_argument("--batch", type=int, default=2)
    p.add_argument("--model", default="gemini-3.7-flash", help="model Antigravity used for this run (default: gemini-3.7-flash)")
    p.add_argument("--prompt-tokens", type=int, default=None)
    p.add_argument("--completion-tokens", type=int, default=None)
    p.add_argument("--total-tokens", type=int, default=None)
    p.add_argument("--duration-ms", type=int, default=None)
    p.add_argument("--note", default=None)
    p.add_argument("--skip-register", action="store_true", help="run capture but don't log")
    args = p.parse_args()

    t0 = time.time()
    rc_plan = _run(["python3", "scripts/v4-capture-queue.py", "plan", str(args.batch)])
    rc_cap = _run(["python3", "scripts/v4-capture-antigravity.py", str(args.batch)])
    rc_sweep = _run(["python3", "scripts/v4-capture-land.py", "--sweep"])
    rc_assemble = _run(["python3", "scripts/v4-capture-queue.py", "assemble"])
    elapsed_ms = int((time.time() - t0) * 1000)

    status = "ok" if all(r == 0 for r in (rc_plan, rc_cap, rc_sweep, rc_assemble)) else "partial"
    note = args.note or f"capture batch {args.batch} ({status})"

    if not args.skip_register:
        duration = args.duration_ms or elapsed_ms
        _run([
            "python3", str(REGISTER), "log",
            "--model", args.model,
            "--job-id", "antigravity-capture",
            *(["--prompt-tokens", str(args.prompt_tokens)] if args.prompt_tokens is not None else []),
            *(["--completion-tokens", str(args.completion_tokens)] if args.completion_tokens is not None else []),
            *(["--total-tokens", str(args.total_tokens)] if args.total_tokens is not None else []),
            "--duration-ms", str(duration),
            "--note", note,
        ])

    if args.skip_register:
        print(f"\nCapture run {status}. Register logging skipped (--skip-register).")
    else:
        print(f"\nCapture run {status}. Register entry written (harness=antigravity).")
    return 0 if status == "ok" else 1


if __name__ == "__main__":
    sys.exit(main())
