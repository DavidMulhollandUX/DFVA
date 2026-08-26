#!/usr/bin/env python3
"""l5_plan.py — generate a schema-valid last30days QueryPlan for one occupation.

The last30days engine needs a hand-written --plan because its internal planner
requires an LLM key (all providers report false in this environment). L5
(practitioner discourse) is the lane that lifts a DFVA report above medium
confidence, but it cannot run without a plan. This script emits a deterministic
plan so the autoloop can drive L5 unattended.

Usage:
  python3.12 scripts/l5_plan.py "<occupation title>" [--soc 11-1021] [--days 180] [--out data/professions/<soc>/raw/l5_plan.json]

Outputs a JSON file matching last30days.lib.schema.QueryPlan:
  intent, freshness_mode, cluster_mode, raw_topic, subqueries[], source_weights.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

# Sources the engine reports as reachable in this environment (diagnose output).
# X is now authenticated via ~/.config/last30days/.env (AUTH_TOKEN/CT0).
AVAILABLE_SOURCES = ["reddit", "x", "youtube", "hackernews", "polymarket", "github", "grounding"]

# Subquery templates for practitioner discourse around an occupation + AI.
# Each probes a distinct angle so the corpus is not one self-selected echo.
SUBQUERY_TEMPLATES = [
    ("disruption", "How is AI changing the day-to-day work of {occ}?"),
    ("tools", "What AI tools are {occ} adopting, and how are workflows shifting?"),
    ("job-security", "Are {occ} discussing AI replacement or augmentation of their role?"),
    ("skills", "What new skills are {occ} told they need because of AI?"),
]


def build_plan(occupation: str, days: int = 180) -> dict:
    raw_topic = f"{occupation} AI disruption practitioner discourse"
    subqueries = []
    for i, (label, tmpl) in enumerate(SUBQUERY_TEMPLATES, start=1):
        q = tmpl.format(occ=occupation)
        subqueries.append({
            "label": f"l5-{label}",
            "search_query": q,
            "ranking_query": f"What firsthand discussion, comments, and transcripts explain {q}?",
            "sources": list(AVAILABLE_SOURCES),
            "weight": 1.0 if i == 1 else 0.85,
        })
    source_weights = {s: 1.0 for s in AVAILABLE_SOURCES}
    return {
        "intent": "concept",
        "freshness_mode": "recency" if days <= 90 else "balanced",
        "cluster_mode": "topic",
        "raw_topic": raw_topic,
        "subqueries": subqueries,
        "source_weights": source_weights,
        "notes": [
            "dfva-l5-autogen",
            f"window-days:{days}",
            "engine-internal-planner-unavailable; plan written deterministically",
        ],
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("occupation", help="Occupation title, e.g. 'Management Analysts'")
    ap.add_argument("--soc", default="", help="SOC code, for the output path only")
    ap.add_argument("--days", type=int, default=180)
    ap.add_argument("--out",
                    default=None,
                    help="Write plan to this path (default: stdout)")
    args = ap.parse_args()

    plan = build_plan(args.occupation, args.days)

    if args.out:
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(plan, indent=2))
        print(f"[l5_plan] wrote plan for '{args.occupation}' -> {out} "
              f"({len(plan['subqueries'])} subqueries, {len(AVAILABLE_SOURCES)} sources)")
    else:
        print(json.dumps(plan, indent=2))


if __name__ == "__main__":
    main()
