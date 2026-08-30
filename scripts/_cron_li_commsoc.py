#!/usr/bin/env python3.12
"""Cron LinkedIn L4 refresh for 4 community/social SOCs (21-1011..21-1014)."""
import subprocess, sys
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
SOC_TITLE = {
    "21-1011": "Substance Abuse and Behavioral Disorder Counselors",
    "21-1012": "Educational, Vocational, and School Counselors",
    "21-1013": "Marriage and Family Therapists",
    "21-1014": "Mental Health Counselors",
}

def run(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=str(REPO), timeout=120)

def main():
    for soc, title in SOC_TITLE.items():
        print(f"=== {soc}: linkedin fetch ===", flush=True)
        fetch = (f"python3.12 scripts/linkedin_l4.py {soc} --title \"{title}\" "
                 f"--location \"Australia\" --limit 20")
        r = run(fetch)
        print(f"[{soc}] fetch: {r.stdout.strip()[:200]} (exit {r.returncode})", flush=True)
        if r.returncode != 0:
            print("ERR:", r.stderr[-400:], file=sys.stderr, flush=True)
            continue
        fr = run(f"python3.12 scripts/linkedin_fold.py {soc}")
        print(f"[{soc}] fold: {fr.stdout.strip()} (exit {fr.returncode})", flush=True)

if __name__ == "__main__":
    main()
