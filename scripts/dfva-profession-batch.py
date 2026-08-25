#!/usr/bin/env python3
"""Build efficient profession batches from the durable research queue.

The batcher exploits shared source families and communities while keeping file
ownership disjoint. Three workers can research separate batches concurrently;
a single integrator later commits validated outputs and advances the queue.
"""
from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEUE = ROOT / "data" / "professions" / "research-queue.json"
PROF = ROOT / "data" / "professions"

CLUSTERS = {
    "management": {"11"},
    "business-finance": {"13"},
    "computing-maths": {"15"},
    "engineering": {"17"},
    "science": {"19"},
    "community-social": {"21"},
    "legal": {"23"},
    "education": {"25"},
    "arts-media": {"27"},
    "health": {"29", "31"},
    "protective": {"33"},
    "service": {"35", "37", "39"},
    "sales-office": {"41", "43"},
    "agriculture-trades": {"45", "47", "49", "51", "53"},
}


def cluster_for(soc: str) -> str:
    major = soc.split("-", 1)[0]
    for name, majors in CLUSTERS.items():
        if major in majors:
            return name
    return "other"


def load() -> dict:
    return json.loads(QUEUE.read_text())


def title(soc: str) -> str:
    try:
        return json.loads((PROF / f"{soc}.json").read_text()).get("title", soc)
    except Exception:
        return soc


def pending(st: dict) -> list[str]:
    return [soc for soc in st["queue"] if st["status"].get(soc) in {"pending", "retry"}]


def build_batches(socs: list[str], batch_size: int) -> list[dict]:
    by_cluster: dict[str, list[str]] = defaultdict(list)
    for soc in socs:
        by_cluster[cluster_for(soc)].append(soc)
    batches = []
    # Round-robin cluster ordering avoids 80 management records blocking every
    # other field while retaining source reuse inside a batch.
    active = sorted(by_cluster)
    while active:
        next_active = []
        for cluster in active:
            values = by_cluster[cluster]
            selected, by_cluster[cluster] = values[:batch_size], values[batch_size:]
            batches.append({
                "cluster": cluster,
                "socs": selected,
                "titles": [title(s) for s in selected],
            })
            if by_cluster[cluster]:
                next_active.append(cluster)
        active = next_active
    return batches


def pick_workers(batches: list[dict], workers: int) -> list[dict]:
    """Select the fullest batches first, preserving stable cluster order on ties."""
    ranked = sorted(enumerate(batches), key=lambda item: (-len(item[1]["socs"]), item[0]))
    return [batch for _, batch in ranked[:workers]]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("action", choices=["next", "preview"])
    ap.add_argument("--batch-size", type=int, default=3)
    ap.add_argument("--workers", type=int, default=3)
    args = ap.parse_args()
    if not 1 <= args.batch_size <= 4:
        ap.error("--batch-size must be 1..4 (the research plan caps a run at four professions)")
    batches = build_batches(pending(load()), args.batch_size)
    chosen = pick_workers(batches, args.workers) if args.action == "next" else batches
    print(json.dumps({"workers": len(chosen), "batches": chosen}, indent=2))


if __name__ == "__main__":
    main()
