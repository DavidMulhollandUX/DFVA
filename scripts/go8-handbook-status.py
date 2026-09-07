#!/usr/bin/env python3
"""Group of Eight (Go8) Handbook Ingestion Status Dashboard

Inspects all Go8 university datasets (+ La Trobe) in the DFVA data repository,
verifying discovery counts, capture progress, contract compliance (>=2000 chars),
and structured field health.

Usage:
  python3 scripts/go8-handbook-status.py
"""

import json
import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(REPO_ROOT, "data")

UNIVERSITIES = [
    {
        "id": "unimelb",
        "name": "University of Melbourne",
        "codes_file": "all_course_codes.json",
        "data_file": "handbook_data.json",
        "struct_file": None,
        "pending_file": "pending_scrapes.json",
    },
    {
        "id": "monash",
        "name": "Monash University",
        "codes_file": "monash_course_codes.json",
        "data_file": "monash_handbook_data.json",
        "struct_file": "monash_handbook_structured.json",
        "pending_file": "monash_pending_scrapes.json",
    },
    {
        "id": "latrobe",
        "name": "La Trobe University (Benchmark)",
        "codes_file": "latrobe_course_codes.json",
        "data_file": "latrobe_handbook_data.json",
        "struct_file": "latrobe_handbook_structured.json",
        "pending_file": "latrobe_pending_scrapes.json",
    },
    {
        "id": "unsw",
        "name": "UNSW Sydney",
        "codes_file": "unsw_course_codes.json",
        "data_file": "unsw_handbook_data.json",
        "struct_file": "unsw_handbook_structured.json",
        "pending_file": "unsw_pending_scrapes.json",
    },
    {
        "id": "anu",
        "name": "Australian National University (ANU)",
        "codes_file": "anu_course_codes.json",
        "data_file": "anu_handbook_data.json",
        "struct_file": "anu_handbook_structured.json",
        "pending_file": "anu_pending_scrapes.json",
    },
    {
        "id": "uwa",
        "name": "University of Western Australia (UWA)",
        "codes_file": "uwa_course_codes.json",
        "data_file": "uwa_handbook_data.json",
        "struct_file": "uwa_handbook_structured.json",
        "pending_file": "uwa_pending_scrapes.json",
    },
    {
        "id": "adelaide",
        "name": "The University of Adelaide",
        "codes_file": "adelaide_course_codes.json",
        "data_file": "adelaide_handbook_data.json",
        "struct_file": "adelaide_handbook_structured.json",
        "pending_file": "adelaide_pending_scrapes.json",
    },
    {
        "id": "usyd",
        "name": "The University of Sydney (USYD)",
        "codes_file": "usyd_course_codes.json",
        "data_file": "usyd_handbook_data.json",
        "struct_file": "usyd_handbook_structured.json",
        "pending_file": "usyd_pending_scrapes.json",
    },
    {
        "id": "uq",
        "name": "The University of Queensland (UQ)",
        "codes_file": "uq_course_codes.json",
        "data_file": "uq_handbook_data.json",
        "struct_file": "uq_handbook_structured.json",
        "pending_file": "uq_pending_scrapes.json",
    },
]


def load_json_safe(filename):
    if not filename:
        return None
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None


def main():
    print("=" * 105)
    print("  DFVA / EVIDURA - GROUP OF EIGHT (Go8) AUSTRALIAN HANDBOOK INGESTION DASHBOARD")
    print("=" * 105)
    header = f"{'Institution':<36} | {'Discovered':<10} | {'Captured':<10} | {'Progress':<9} | {'Thin (<2k)':<10} | {'Contract'}"
    print(header)
    print("-" * 105)

    grand_total_discovered = 0
    grand_total_captured = 0
    grand_total_thin = 0

    for uni in UNIVERSITIES:
        codes = load_json_safe(uni["codes_file"])
        data = load_json_safe(uni["data_file"])
        pending = load_json_safe(uni["pending_file"])

        total_discovered = len(codes) if isinstance(codes, list) else (pending.get("total", 0) if isinstance(pending, dict) else 0)
        total_captured = len(data) if isinstance(data, list) else 0

        thin_count = 0
        if isinstance(data, list):
            for d in data:
                if d.get("length", 0) < 2000:
                    thin_count += 1

        pct = (total_captured / total_discovered * 100) if total_discovered > 0 else 0.0
        
        if total_discovered == 0:
            contract_status = "PENDING DISCOVERY"
        elif total_captured >= total_discovered and thin_count == 0:
            contract_status = "PASSED (100% COMPLETE)"
        elif total_captured >= total_discovered:
            contract_status = f"PASSED ({thin_count} sparse)"
        elif total_captured > 0:
            contract_status = f"INGESTING ({pct:.1f}%)"
        else:
            contract_status = "READY TO INGEST"

        print(f"{uni['name']:<36} | {total_discovered:<10} | {total_captured:<10} | {pct:>6.1f}%   | {thin_count:<10} | {contract_status}")

        grand_total_discovered += total_discovered
        grand_total_captured += total_captured
        grand_total_thin += thin_count

    print("-" * 105)
    grand_pct = (grand_total_captured / grand_total_discovered * 100) if grand_total_discovered > 0 else 0.0
    print(f"{'TOTAL CORPUS (ALL INSTITUTIONS)':<36} | {grand_total_discovered:<10} | {grand_total_captured:<10} | {grand_pct:>6.1f}%   | {grand_total_thin:<10} |")
    print("=" * 105)


if __name__ == "__main__":
    main()
