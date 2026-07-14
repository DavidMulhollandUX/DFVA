#!/usr/bin/env python3
"""Convert all 141 JIR PDFs to clean markdown via pdftotext -layout.
Preserves two-column layout: left = job titles, right = employers/skills.
"""
import subprocess
import json
from pathlib import Path

BASE = Path("/Users/djmulholland/Documents/SXD-Github/DFVA/docs/JIR")
PDFTOTEXT = "/opt/homebrew/bin/pdftotext"

with open(BASE / "manifest.json") as f:
    m = json.load(f)

total = sum(len(p) for p in m["sources"].values())
ok = fail = 0
i = 0

for faculty, programs in m["sources"].items():
    fac_dir = BASE / faculty
    for prog in programs:
        i += 1
        name = prog["name"]
        pdf = fac_dir / f"{name}.pdf"
        md = fac_dir / f"{name}.md"

        if not pdf.exists():
            fail += 1
            print(f"  [{i}/{total}] MISSING: {faculty}/{name}")
            continue

        try:
            r = subprocess.run(
                [PDFTOTEXT, "-layout", str(pdf), str(md)],
                capture_output=True, text=True, timeout=15,
            )
            if r.returncode != 0:
                raise RuntimeError(r.stderr.strip()[:120])
            ok += 1
        except Exception as e:
            fail += 1
            print(f"  [{i}/{total}] FAIL {faculty}/{name}: {e}")

        if i % 30 == 0:
            print(f"  [{i}/{total}] {ok} ok, {fail} fail...")

print(f"\nDone: {ok} converted, {fail} failed ({total} total)")
