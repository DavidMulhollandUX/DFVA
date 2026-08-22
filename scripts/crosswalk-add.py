#!/usr/bin/env python3
"""Append occupation rows to data/aioe/v31_extension_crosswalk.csv.

Splits the job in two on purpose:

  - the AGENT decides which O*NET SOC occupation a destination title belongs to,
    which is a judgement call ("Curatorial Assistant" -> Archivists? Curators?);
  - THIS SCRIPT computes the exposure index, which is arithmetic.

Letting an agent hand-write ai_exposure_index invites plausible-looking numbers
that are not the Felten value at all, and nothing downstream would catch it — the
index is just a float in a CSV. So the index is never accepted as input; it is
always derived from data/aioe/felten_aioe.json by the same min-max rescale the
existing 213 rows use (verified to reproduce all of them exactly):

    index = (aioe - AIOE_MIN) / (AIOE_MAX - AIOE_MIN) * 100

Usage:
    python3 scripts/crosswalk-add.py check   <assignments.json>
    python3 scripts/crosswalk-add.py apply   <assignments.json>

assignments.json is a list of:
    {"occupation": "Curatorial Assistant",
     "onet_soc_code": "25-4012",
     "mapping_confidence": "high" | "medium" | "low",
     "mapping_note": "why this SOC, and what was rejected"}
"""
from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FELTEN = ROOT / "data" / "aioe" / "felten_aioe.json"
CROSSWALK = ROOT / "data" / "aioe" / "v31_extension_crosswalk.csv"
INDEX_SOURCE = "Felten-AIOE (Appendix A, rescaled 0-100)"
CONFIDENCE = {"high", "medium", "low"}
FIELDS = [
    "occupation",
    "onet_soc_code",
    "onet_soc_title",
    "ai_exposure_index",
    "mapping_confidence",
    "index_source",
    "mapping_note",
]


def felten() -> dict[str, dict]:
    return {r["soc"]: r for r in json.loads(FELTEN.read_text())}


def bounds(f: dict[str, dict]) -> tuple[float, float]:
    vals = [r["aioe"] for r in f.values()]
    return min(vals), max(vals)


def existing() -> dict[str, dict]:
    if not CROSSWALK.exists():
        return {}
    with CROSSWALK.open() as fh:
        return {r["occupation"].strip(): r for r in csv.DictReader(fh)}


def build(assignments: list[dict]) -> tuple[list[dict], list[str]]:
    f = felten()
    lo, hi = bounds(f)
    have = existing()
    rows, errs = [], []
    seen: set[str] = set()

    for a in assignments:
        occ = (a.get("occupation") or "").strip()
        soc = (a.get("onet_soc_code") or "").strip()
        conf = (a.get("mapping_confidence") or "").strip()
        note = (a.get("mapping_note") or "").strip()

        if not occ:
            errs.append("row with no occupation")
            continue
        if occ in have:
            errs.append(f"{occ!r}: already in the crosswalk — remove it from the batch")
            continue
        if occ in seen:
            errs.append(f"{occ!r}: duplicated within this batch")
            continue
        seen.add(occ)

        # Felten is keyed on the 6-digit SOC; O*NET codes carry a .00 suffix.
        src = f.get(soc) or f.get(soc.split(".")[0])
        if not src:
            errs.append(f"{occ!r}: SOC {soc!r} is not one of the 774 Felten occupations")
            continue
        if conf not in CONFIDENCE:
            errs.append(f"{occ!r}: mapping_confidence must be one of {sorted(CONFIDENCE)}")
            continue
        if not note:
            errs.append(f"{occ!r}: mapping_note is required — say why this SOC and what was rejected")
            continue

        rows.append(
            {
                "occupation": occ,
                "onet_soc_code": soc,
                "onet_soc_title": src["title"],
                "ai_exposure_index": f"{(src['aioe'] - lo) / (hi - lo) * 100:.2f}",
                "mapping_confidence": conf,
                "index_source": INDEX_SOURCE,
                "mapping_note": note,
            }
        )
    return rows, errs


def main() -> None:
    if len(sys.argv) != 3 or sys.argv[1] not in ("check", "apply"):
        print(__doc__)
        sys.exit(2)
    cmd, path = sys.argv[1], Path(sys.argv[2])
    rows, errs = build(json.loads(path.read_text()))

    if errs:
        print(f"crosswalk-add {cmd} FAILED — {len(errs)} problem(s):")
        for e in errs:
            print("  - " + e)
        sys.exit(1)

    if cmd == "check":
        print(f"OK — {len(rows)} row(s) ready:")
        for r in rows:
            print(
                f"  {r['occupation']:<38} -> {r['onet_soc_code']:<10} "
                f"{r['onet_soc_title'][:34]:<34} index {r['ai_exposure_index']:>6} ({r['mapping_confidence']})"
            )
        return

    write_header = not CROSSWALK.exists() or CROSSWALK.stat().st_size == 0
    with CROSSWALK.open("a", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=FIELDS)
        if write_header:
            w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"appended {len(rows)} row(s) to {CROSSWALK.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
