#!/usr/bin/env python3.12
"""
Render data/professions/<soc>/evidence.md from the committed ledger
data/professions/<soc>.json. Verbatim log, one short quote per source,
grouped by lane. Matches the format already established across the
existing profession records.

Usage:
    python3.12 scripts/dfva-professions-render-evidence.py <soc> [<soc> ...]
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data" / "professions"

LANE_LABELS = {
    "L1": "L1 Regulatory / standards",
    "L2": "L2 Scholarly / institutional",
    "L3": "L3 Trade press",
    "L4": "L4 Demand (job ads)",
    "L5": "L5 Practitioner discourse",
}


def quote(text: str, n: int = 180) -> str:
    text = text.strip()
    return (text[:n] + "...") if len(text) > n else text


def render(soc: str) -> str:
    d = json.loads((DATA_DIR / f"{soc}.json").read_text())
    lines = [
        f"# Evidence log: {d.get('title')} ({soc})",
        f"Generated {d.get('generated')}. Research method: empirical-five-lane-v1.",
        "",
        "Lanes: L1 regulatory, L2 scholarly, L3 trade press, L4 demand (Adzuna + LinkedIn), "
        "L5 practitioner discourse (last30days).",
        "",
        "## Lane sources (one short quote per source)",
        "",
    ]
    claims = d.get("claims", [])
    by_lane = {}
    for c in claims:
        by_lane.setdefault(c.get("lane", "?"), []).append(c)

    for lane in ["L1", "L2", "L3"]:
        cs = by_lane.get(lane, [])
        lines.append(f"### {LANE_LABELS[lane]} ({len(cs)} claims)")
        for c in cs:
            for src in c.get("sources", []):
                pub = src.get("publisher", "")
                title = src.get("title", "")
                url = src.get("url", "")
                date = src.get("date", "")
                lines.append(f"- [{pub}] {title} — {url} ({date})")
                lines.append(f'  "{quote(c.get("text", ""))}"')
                if c.get("scope"):
                    lines.append(f"  Scope: {c['scope']}")
        lines.append("")

    l4 = by_lane.get("L4", [])
    linkedin_n = sum(1 for c in l4 if "linkedin" in json.dumps(c.get("sources", [])).lower())
    lines.append(f"### {LANE_LABELS['L4']} ({len(l4)} claims)")
    if linkedin_n:
        lines.append(f"- LinkedIn (unofficial scrape): {linkedin_n} live AU postings folded as L4 claims.")
    job_ads = d.get("jobAds", {})
    if job_ads:
        lines.append(
            f"- Adzuna AU: {job_ads.get('count')} live postings matching \"{job_ads.get('query')}\" "
            f"({job_ads.get('window')}); top employers: {', '.join(job_ads.get('topEmployers', [])[:5])}."
        )
    lines.append("")

    l5 = by_lane.get("L5", [])
    lines.append(f"### {LANE_LABELS['L5']} ({len(l5)} claims)")
    l5_samples = d.get("corpus", {}).get("l5Sample", [])
    if l5_samples:
        latest = l5_samples[-1]
        srcs = ", ".join(f"{k}={v}" for k, v in latest.get("sources", {}).items())
        lines.append(f"- last30days declared sample: {latest.get('added')} items across {srcs}.")
    if l5:
        lines.append("- Representative practitioner quotes:")
        for c in l5[:8]:
            src = c.get("sources", [{}])[0]
            lines.append(f"  - [{src.get('publisher','?')}] {quote(c.get('text',''), 100)}")
    lines.append("")

    srn = d.get("corpus", {}).get("searchesReturningNothing", [])
    if srn:
        lines.append("## Searches that returned nothing")
        for s in srn:
            lines.append(f"- {s}")
        lines.append("")

    return "\n".join(lines) + "\n"


def main():
    if len(sys.argv) < 2:
        print("usage: dfva-professions-render-evidence.py <soc> [<soc> ...]", file=sys.stderr)
        sys.exit(1)
    for soc in sys.argv[1:]:
        out_dir = DATA_DIR / soc
        out_dir.mkdir(parents=True, exist_ok=True)
        text = render(soc)
        (out_dir / "evidence.md").write_text(text)
        print(f"[render-evidence] {soc}: wrote {out_dir / 'evidence.md'}")


if __name__ == "__main__":
    main()
