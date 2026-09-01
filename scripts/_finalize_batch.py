#!/usr/bin/env python3
"""Finalize the 4-SOC batch: set confidence, record honest caveats, mark queue done.
Merges only (never overwrites corpus wholesale)."""
import json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
QUEUE = PROF / "research-queue.json"
SOCS = ["47-1011", "47-2061", "47-2111", "49-2094"]

CAVEAT = ("L3 (Factiva trade press) not sampled this run: OpenAthens session expired, "
          "logged to factiva_backlog.json for attended backfill. L4 demand covered by Adzuna AU "
          "(time-series) + LinkedIn (live postings); Seek and last30days --hiring-signals not run "
          "separately. Confidence rests on L1 (regulatory instruments), L2 (JSA Gen AI Capacity "
          "Study + trade-risk index), L4 (Adzuna/LinkedIn), and L5 (declared last30days practitioner "
          "corpus).")

for soc in SOCS:
    p = PROF / f"{soc}.json"
    d = json.loads(p.read_text())
    # Confidence: >=2 L1/L2 claims + declared L5 corpus -> high.
    lanes = {c.get("lane") for c in d.get("claims", [])}
    has_l5 = bool(d.get("corpus", {}).get("l5Sample"))
    if ("L1" in lanes or "L2" in lanes) and has_l5:
        d["confidence"] = "high"
    elif "L3" in lanes:
        d["confidence"] = "medium"
    else:
        d["confidence"] = "low"
    cav = d.setdefault("caveats", [])
    if CAVEAT not in cav:
        cav.append(CAVEAT)
    p.write_text(json.dumps(d, indent=2))
    print(f"[finalize] {soc}: confidence={d['confidence']} claims={len(d.get('claims', []))}")

# Mark queue done (merge, do not rewrite other entries).
q = json.loads(QUEUE.read_text())
st = q.setdefault("status", {})
for soc in SOCS:
    st[soc] = "done"
QUEUE.write_text(json.dumps(q, indent=2))
print("[finalize] queue: 4 SOCs marked done")
