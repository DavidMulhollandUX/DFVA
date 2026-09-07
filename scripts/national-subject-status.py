#!/usr/bin/env python3
"""National Australian University Subject & Syllabus Ingestion Status Dashboard

Inspects all subject datasets in data/subjects/*.jsonl, reporting total catalog
coverage, ingestion progress, and granular syllabus field completeness.

Usage:
  python3 scripts/national-subject-status.py
"""

import json
import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(REPO_ROOT, "data")
SUBJECTS_DIR = os.path.join(DATA_DIR, "subjects")
INDEX_DIR = os.path.join(SUBJECTS_DIR, "index")
STATUS_DIR = os.path.join(SUBJECTS_DIR, "status")

INSTITUTIONS = [
    ("monash", "Monash University"),
    ("unsw", "UNSW Sydney"),
    ("latrobe", "La Trobe University"),
    ("uwa", "University of Western Australia (UWA)"),
    ("anu", "Australian National University (ANU)"),
    ("uq", "The University of Queensland (UQ)"),
    ("adelaide", "The University of Adelaide"),
    ("usyd", "The University of Sydney (USYD)"),
    ("uts", "University of Technology Sydney (UTS)"),
    ("mq", "Macquarie University"),
    ("unisc", "University of the Sunshine Coast (UniSC)"),
    ("swinburne", "Swinburne University of Technology"),
    ("newcastle", "University of Newcastle"),
    ("csu", "Charles Sturt University (CSU)"),
    ("flinders", "Flinders University"),
    ("unimelb", "University of Melbourne"),
]


def analyze_jsonl(file_path):
    if not os.path.exists(file_path):
        return 0, 0, 0, 0, 0
    total = 0
    with_slo = 0
    with_assessments = 0
    with_prereqs = 0
    with_syllabus = 0
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            try:
                rec = json.loads(line)
                total += 1
                if rec.get("learning_outcomes"):
                    with_slo += 1
                if rec.get("assessment_tasks"):
                    with_assessments += 1
                if rec.get("prerequisites") or rec.get("incompatibilities"):
                    with_prereqs += 1
                if rec.get("syllabus_overview"):
                    with_syllabus += 1
            except Exception:
                pass
    return total, with_slo, with_assessments, with_prereqs, with_syllabus


def main():
    print("=" * 115)
    print("  EVIDURA / DFVA - NATIONAL AUSTRALIAN SUBJECT & SYLLABUS CORPUS INGESTION DASHBOARD (50,000+ SUBJECTS)")
    print("=" * 115)
    header = f"{'Institution':<36} | {'Discovered':<10} | {'Captured':<10} | {'Progress':<9} | {'SLOs %':<8} | {'Assess %':<8} | {'Prereqs %'}"
    print(header)
    print("-" * 115)

    grand_disc = 0
    grand_cap = 0

    for inst_id, inst_name in INSTITUTIONS:
        idx_file = os.path.join(INDEX_DIR, f"{inst_id}_subject_index.json")
        disc = 0
        if os.path.exists(idx_file):
            try:
                disc = len(json.load(open(idx_file, "r", encoding="utf-8")))
            except Exception:
                pass

        jsonl_file = os.path.join(SUBJECTS_DIR, f"{inst_id}_subjects.jsonl")
        cap, slo, ass, pre, syl = analyze_jsonl(jsonl_file)

        pct = (cap / disc * 100) if disc > 0 else (100.0 if cap > 0 else 0.0)
        slo_pct = f"{(slo / cap * 100):.0f}%" if cap > 0 else "-"
        ass_pct = f"{(ass / cap * 100):.0f}%" if cap > 0 else "-"
        pre_pct = f"{(pre / cap * 100):.0f}%" if cap > 0 else "-"

        print(f"{inst_name:<36} | {disc:<10} | {cap:<10} | {pct:>6.1f}%   | {slo_pct:<8} | {ass_pct:<8} | {pre_pct}")

        grand_disc += disc
        grand_cap += cap

    print("-" * 115)
    grand_pct = (grand_cap / grand_disc * 100) if grand_disc > 0 else 0.0
    print(f"{'TOTAL NATIONAL CORPUS':<36} | {grand_disc:<10} | {grand_cap:<10} | {grand_pct:>6.1f}%   |")
    print("=" * 115)


if __name__ == "__main__":
    main()
