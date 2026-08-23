#!/usr/bin/env python3
"""Extract JSA Higher Education Outcomes Table_3 (occupations by field of
education) into data/jsa/heo_field_destinations.json — the field-tier input
for Panel A (docs/dfva-v4-panela-basis.md).

Source workbook: data/jsa/higher_education_work_and_occupation.xlsx
  jobsandskills.gov.au → Higher Education Outcomes – Exploring Administrative
  Data → "Work and occupation" tables (file dated 2025-12-04). ATO tax-linked,
  all completion levels, ASCED 4-digit field × ANZSCO-6 occupation, 1/3/5
  years after completion.

Rule: per field and stage, the TOP_N occupations by share (ties kept); shares
are percentages of graduates in wage/salary work in that field. `coverage` is
the summed share of the listed occupations, so a reader can see how much of
the field's distribution the list stands for.

Run: python3 scripts/jsa-heo-extract.py
"""
from __future__ import annotations

import json
from datetime import date
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "data/jsa/higher_education_work_and_occupation.xlsx"
OUT = ROOT / "data/jsa/heo_field_destinations.json"
TOP_N = 10

STAGES = {
    # stage key → (occupation name col, pct col)
    "entry": ("OCC_NAME_1YR", "OCC_PCT_1"),
    "early": ("OCC_3YR", "OCC_PCT_3"),
    "senior": ("OCC_5YR", "OCC_PCT_5"),
}


def main() -> None:
    ws = openpyxl.load_workbook(SRC, read_only=True)["Table_3"]
    rows = list(ws.iter_rows(values_only=True))
    header_i = next(i for i, r in enumerate(rows) if r and r[0] == "FOE_CODE")
    header = list(rows[header_i])
    col = {h: header.index(h) for h in header if h}

    fields: dict[str, dict] = {}
    for r in rows[header_i + 1 :]:
        if not r or r[col["FOE_CODE"]] is None:
            continue
        code = str(r[col["FOE_CODE"]]).zfill(4)
        f = fields.setdefault(
            code,
            {
                "name": r[col["FOE_DETAILED"]],
                "broad": r[col["FOE_BROAD"]],
                "countFoe": r[col["COUNT_FOE"]],
                "_raw": {s: [] for s in STAGES},
            },
        )
        for stage, (name_col, pct_col) in STAGES.items():
            title, pct = r[col[name_col]], r[col[pct_col]]
            # "MISSING" = occupation not classified in the linked data; it is not a
            # destination and is dropped before ranking (coverage is over classified
            # occupations only).
            if title and str(title).strip().upper() != "MISSING" and isinstance(pct, (int, float)) and pct > 0:
                f["_raw"][stage].append({"title": str(title).strip(), "share": float(pct)})

    for code, f in fields.items():
        raw = f.pop("_raw")
        for stage, items in raw.items():
            # merge duplicate titles (the table repeats a row per ANZSCO path)
            merged: dict[str, float] = {}
            for it in items:
                merged[it["title"]] = merged.get(it["title"], 0.0) + it["share"]
            ranked = sorted(merged.items(), key=lambda kv: -kv[1])
            cutoff = ranked[TOP_N - 1][1] if len(ranked) >= TOP_N else 0.0
            top = [{"title": t, "share": round(s, 3)} for t, s in ranked if s >= cutoff]
            f[stage] = top
            f[f"{stage}Coverage"] = round(sum(x["share"] for x in top), 1)

    out = {
        "_meta": {
            "source": "Jobs and Skills Australia — Higher Education Outcomes: Exploring Administrative Data, 'Work and occupation' workbook, Table_3 (Occupations by fields and levels of education)",
            "url": "https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data",
            "file": SRC.name,
            "fileDated": "2025-12-04",
            "retrieved": date.today().isoformat(),
            "grain": "ASCED 4-digit field of education × ANZSCO-6 occupation; 1/3/5 years after completion; ATO tax-linked; all completion levels",
            "rule": f"top {TOP_N} classified occupations per stage by share (ties kept; the unclassified MISSING row is dropped); share = % of the field's graduates in wage/salary work; coverage = summed share of the listed occupations",
            "generator": "scripts/jsa-heo-extract.py",
        },
        "fields": dict(sorted(fields.items())),
    }
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
    print(f"{len(fields)} fields → {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
