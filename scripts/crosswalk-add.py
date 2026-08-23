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
     "mapping_note": "why this SOC, and what was rejected",
     "program_scope": "mc-teachpr"}        # optional — see below

program_scope: a mapping that is correct ONLY inside one program's record (the
title is ambiguous across programs — "Teacher" is Elementary in mc-teachpr and
Secondary in mc-teachsa — but the program's discipline fixes it). Scoped rows go
to data/aioe/program_scoped_crosswalk.csv, keyed on (program_code, occupation),
and the resolver consults them before the global crosswalk for that program
only. A scoped row may carry a title that is refused globally; that is its
purpose. Never scope a row just to dodge a hard global call.

A program_scope of the form "field:<ASCED code>" (e.g. "field:0909") scopes the
row to one JSA HEO field list instead of one program: the natural key for an
ANZSCO occupation name whose SOC depends on the discipline the graduates came
from ("University Lecturer" in the Law list is 25-1112 Law Teachers).
"""
from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FELTEN = ROOT / "data" / "aioe" / "felten_aioe.json"
CROSSWALK = ROOT / "data" / "aioe" / "v31_extension_crosswalk.csv"
SCOPED = ROOT / "data" / "aioe" / "program_scoped_crosswalk.csv"
REFUSED = ROOT / "data" / "aioe" / "crosswalk-refused.json"
INDEX_SOURCE = "Felten-AIOE (Appendix A, rescaled 0-100)"
CONFIDENCE = {"high", "medium", "low"}
SCOPED_FIELDS = ["program_code"]
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


def existing_scoped() -> set[tuple[str, str]]:
    if not SCOPED.exists():
        return set()
    with SCOPED.open() as fh:
        return {(r["program_code"].strip(), r["occupation"].strip()) for r in csv.DictReader(fh)}


def refused() -> set[str]:
    if not REFUSED.exists():
        return set()
    return {r["title"] for r in json.loads(REFUSED.read_text()).get("refused", [])}


def build(assignments: list[dict]) -> tuple[list[dict], list[str]]:
    f = felten()
    lo, hi = bounds(f)
    have = existing()
    have_scoped = existing_scoped()
    no = refused()
    rows, errs = [], []
    seen: set[tuple[str, str]] = set()

    for a in assignments:
        occ = (a.get("occupation") or "").strip()
        soc = (a.get("onet_soc_code") or "").strip()
        conf = (a.get("mapping_confidence") or "").strip()
        note = (a.get("mapping_note") or "").strip()
        scope = (a.get("program_scope") or "").strip().lower()

        if not occ:
            errs.append("row with no occupation")
            continue
        if not scope and occ in have:
            errs.append(f"{occ!r}: already in the crosswalk — remove it from the batch")
            continue
        if not scope and occ in no:
            errs.append(f"{occ!r}: refused in crosswalk-refused.json — map it with program_scope or leave it out")
            continue
        if scope and (scope, occ) in have_scoped:
            errs.append(f"{occ!r} @ {scope}: already in the scoped crosswalk")
            continue
        if (scope, occ) in seen:
            errs.append(f"{occ!r}: duplicated within this batch")
            continue
        seen.add((scope, occ))

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
                **({"program_code": scope} if scope else {}),
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
                f"  {(('@' + r['program_code'] + ' ') if 'program_code' in r else '') + r['occupation']:<38} -> {r['onet_soc_code']:<10} "
                f"{r['onet_soc_title'][:34]:<34} index {r['ai_exposure_index']:>6} ({r['mapping_confidence']})"
            )
        return

    for target, fields, subset in (
        (CROSSWALK, FIELDS, [r for r in rows if "program_code" not in r]),
        (SCOPED, SCOPED_FIELDS + FIELDS, [r for r in rows if "program_code" in r]),
    ):
        if not subset:
            continue
        write_header = not target.exists() or target.stat().st_size == 0
        with target.open("a", newline="") as fh:
            w = csv.DictWriter(fh, fieldnames=fields)
            if write_header:
                w.writeheader()
            for r in subset:
                w.writerow(r)
        print(f"appended {len(subset)} row(s) to {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
