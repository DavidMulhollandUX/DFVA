#!/usr/bin/env python3.12
"""Cron L5 sweep for 4 community/social SOCs (21-1011..21-1014).

Re-runs last30days fresh (L5 must run every time), then folds. Logs to /tmp/l5_commsoc.log.
"""
import subprocess, sys, datetime as dt
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
L30 = Path.home() / ".claude/skills/last30days/scripts/last30days.py"
TODAY = dt.date.today().isoformat()
SOC_TITLE = {
    "21-1011": "Substance Abuse and Behavioral Disorder Counselors",
    "21-1012": "Educational, Vocational, and School Counselors",
    "21-1013": "Marriage and Family Therapists",
    "21-1014": "Mental Health Counselors",
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
        if r.stderr:
            print("STDERR:", r.stderr[-600:], file=sys.stderr, flush=True)
        print(f"=== {soc}: fold ===", flush=True)
        fr = run(f"python3.12 scripts/l5_fold.py {soc}")
        print(f"[{soc}] fold: {fr.stdout.strip()} (exit {fr.returncode})", flush=True)

if __name__ == "__main__":
    main()
