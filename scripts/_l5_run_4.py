#!/usr/bin/env python3.12
"""Run last30days L5 sweep for the 4 school-teacher SOCs in the background.
Re-folds via l5_fold.py after each (dedupes by text). Logs to /tmp/l5_4.log.
"""
import subprocess, sys, datetime as dt
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
L30 = Path.home() / ".claude/skills/last30days/scripts/last30days.py"
TODAY = "2026-08-30"
SOC_TITLE = {
    "25-2011": "Preschool Teachers, Except Special Education",
    "25-2021": "Elementary School Teachers, Except Special Education",
    "25-2022": "Middle School Teachers, Except Special and Vocational Education",
    "25-2031": "Secondary School Teachers, Except Special and Vocational Education",
}

def run(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True,
                          cwd=str(REPO), timeout=900)

def main():
    for soc, title in SOC_TITLE.items():
        print(f"=== {soc}: plan ===", flush=True)
        plan = (f"python3.12 scripts/l5_plan.py \"{title}\" --soc {soc} --days 180 "
                f"--out data/professions/{soc}/raw/l5_plan.json")
        run(plan)
        print(f"=== {soc}: sweep ===", flush=True)
        sweep = (f"SSL_CERT_FILE=\"$(python3.12 -m certifi)\" python3.12 {L30} "
                 f"\"{title} AI disruption\" --plan data/professions/{soc}/raw/l5_plan.json "
                 f"--emit json --json-profile raw --days 180 --as-of {TODAY} "
                 f"--save-dir data/professions/{soc}/raw/ --max-source-fetches 6 --no-browser-cookies")
        r = run(sweep)
        print(f"[{soc}] sweep exit={r.returncode}", flush=True)
        print(r.stdout[-800:] if r.stdout else "", file=sys.stderr, flush=True)
        print(r.stderr[-800:] if r.stderr else "", file=sys.stderr, flush=True)
        # fold (dedupes by text; safe if no new raw)
        print(f"=== {soc}: fold ===", flush=True)
        fr = run(f"python3.12 scripts/l5_fold.py {soc}")
        print(f"[{soc}] fold: {fr.stdout.strip()} (exit {fr.returncode})", flush=True)

if __name__ == "__main__":
    main()
