#!/usr/bin/env python3
"""Build the canonical handbook-capture work queue.

Unions every known-but-uncaptured UniMelb course code from the discovery
sources in the repo, minus everything already captured, and writes it to
data/capture_queue.json for scripts/cyclical_scrape.py to consume.

This exists because the capture backlog was previously implicit: the June-2026
batch of 74 "cached and unscored" courses lived only in a gitignored cache and
a prose list in docs/dfva-batch-backlog.md, so it evaporated on a fresh clone.
The queue is committed so the work list survives.

Run: python3 scripts/build-capture-queue.py
"""
import json, os, re, sys
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Minimum captured characters for a capture to count as scoreable evidence.
# Calibrated against the two observed populations: successful coursework
# captures run 6,341-35,417 chars (median ~19,300), while the research-doctorate
# captures run 179-936 (median ~390) — thin enough that the reports scored from
# them carry an explicit "Confidence: Low" note. 2,000 sits in the empty gap
# between the two, so it separates them without splitting either.
MIN_CAPTURE_CHARS = 2000


def rd(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def captured_codes():
    """Codes with a committed capture record, successful or not."""
    out = {}
    for rel in ("data/handbook_data.json", "data/handbook_doctorate_data.json"):
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            continue
        for e in json.loads(rd(rel)):
            code = e.get("code")
            if not code:
                continue
            body = e.get("markdown") or e.get("text") or ""
            ok = bool(e.get("success")) and max(e.get("length") or 0, len(body)) >= MIN_CAPTURE_CHARS
            out[code] = out.get(code, False) or ok
    return out


def main():
    sources = {}

    # 1. The June-2026 batch backlog (prose list in the backlog doc).
    m = re.search(r"```(.*?)```", rd("docs/dfva-batch-backlog.md"), re.S)
    sources["batch-backlog"] = set(m.group(1).split()) if m else set()

    # 2. The handbook discovery sweep.
    sources["discovered"] = set(
        json.loads(rd("data/handbook_discovered.json")).get("unscored", [])
    )

    # 3. The older explicit code list.
    sources["all-course-codes"] = set(json.loads(rd("data/all_course_codes.json")))

    captured = captured_codes()
    have = {c for c, ok in captured.items() if ok}

    # 4. Re-capture set: codes whose committed capture failed or is too thin to
    #    score from. The research doctorates appear in no discovery source, so
    #    without this their ~390-char captures would never be requeued.
    sources["thin-or-failed"] = {c for c, ok in captured.items() if not ok}

    union = set().union(*sources.values())
    pending = sorted(union - have)

    # Coursework masters first — the highest-value cohort and the one the
    # faculty-tranche plan works through; then everything else, alphabetically.
    pending.sort(key=lambda c: (not c.startswith("mc-"), c))

    payload = {
        "generated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "generator": "scripts/build-capture-queue.py",
        "note": "Known UniMelb course codes with no successful committed capture.",
        "counts": {
            "union": len(union),
            "captured": len(have),
            "pending": len(pending),
            **{f"source:{k}": len(v) for k, v in sources.items()},
        },
        "codes": pending,
    }
    out = os.path.join(ROOT, "data/capture_queue.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
        f.write("\n")
    print(f"wrote {len(pending)} pending codes to data/capture_queue.json")
    for k, v in sources.items():
        print(f"  source {k}: {len(v)}")
    print(f"  already captured: {len(have)}")


if __name__ == "__main__":
    sys.exit(main())
