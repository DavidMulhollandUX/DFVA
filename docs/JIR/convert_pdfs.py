#!/usr/bin/env python3
"""Convert all 141 JIR PDFs to clean markdown via markitdown."""
import subprocess, json, os, time

BASE = "/Users/djmulholland/Documents/SXD-Github/DFVA/docs/JIR"
MARKITDOWN = "/Users/djmulholland/.hermes/hermes-agent/venv/bin/markitdown"

with open(f"{BASE}/manifest.json") as f:
    m = json.load(f)

total = sum(len(p) for p in m["sources"].values())
ok = fail = 0
i = 0

for faculty, programs in m["sources"].items():
    fac_dir = os.path.join(BASE, faculty)
    for prog in programs:
        i += 1
        name = prog["name"]
        pdf = os.path.join(fac_dir, f"{name}.pdf")
        md = os.path.join(fac_dir, f"{name}.md")
        
        if not os.path.exists(pdf):
            fail += 1
            print(f"  [{i}/{total}] MISSING: {faculty}/{name}")
            continue
        
        try:
            r = subprocess.run([MARKITDOWN, pdf, "-o", md],
                             capture_output=True, text=True, timeout=30)
            if r.returncode == 0:
                ok += 1
            else:
                fail += 1
        except:
            fail += 1
        
        if i % 20 == 0:
            print(f"  [{i}/{total}] {ok} ok, {fail} fail...")

print(f"\nDone: {ok} converted, {fail} failed ({total} total)")
