#!/usr/bin/env python3.12
"""Patch the three community-social ledgers: fix dead ASORC URL, drop bot-gated JMIR claims."""
from __future__ import annotations
import json
from pathlib import Path

PROF = Path("/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions")
TODAY = "2026-08-31"


def regen_evidence(soc, d):
    lines = [f"# Evidence log — {soc} {d.get('title','')}", ""]
    lines.append(f"Generated {TODAY}. Empirical five-lane (L1-L5) autoloop. Research method: empirical-five-lane-v1.")
    lines.append(f"Confidence: {d['confidence']}. L1/L2/L3 claims from web research (Factiva auth expired this run).")
    lines.append("")
    for c in d["claims"]:
        src = (c.get("sources") or [{}])[0]
        lines.append(f"- [{c['lane']}] {c['text']}")
        lines.append(f"    source: {src.get('publisher','')} — {src.get('title','')} ({src.get('url','')}, {src.get('date','')})")
        lines.append(f"    measured: {src.get('whatItMeasured','')}")
    (PROF / soc / "evidence.md").write_text("\n".join(lines) + "\n")


def main():
    # 21-1015: fix ASORC L3 URL + text
    d = json.loads((PROF / "21-1015.json").read_text())
    for c in d["claims"]:
        if c["id"] == "l3a01":
            c["text"] = ("ASORC's 2025 Rehabilitation Counselling Virtual Conference program included a session on "
                         "consumer-informed approaches to AI and telehealth in rehabilitation counselling, signalling "
                         "practitioner engagement with the technology.")
            c["sources"][0]["url"] = "https://www.asorc.org.au/events/conferences/2025-conference"
            c["sources"][0]["title"] = "2025 Rehabilitation Counsellors Virtual Conference (ASORC)"
            c["sources"][0]["whatItMeasured"] = "ASORC 2025 conference page (AI/telehealth session in program), retrieved 2026-08-31"
    (PROF / "21-1015.json").write_text(json.dumps(d, indent=2, ensure_ascii=False))
    regen_evidence("21-1015", d)

    # 21-1021 + 21-1023: drop bot-gated JMIR L2 claim, record gap
    gap = {"lane": "L2", "source": "JMIR Pediatrics (child maltreatment AI)", "status": "bot_gated",
           "detail": "Direct HTTP fetch blocked by Cloudflare; source is a real peer-reviewed article but unverifiable via fetch this run. Not admitted as a claim.", "date": TODAY}
    for soc in ("21-1021", "21-1023"):
        d = json.loads((PROF / f"{soc}.json").read_text())
        before = len(d["claims"])
        d["claims"] = [c for c in d["claims"] if c["id"] != "l2a02"]
        srn = d.setdefault("corpus", {}).get("searchesReturningNothing", []) or []
        if not any(x.get("source") == gap["source"] for x in srn):
            srn.append(gap)
            d["corpus"]["searchesReturningNothing"] = srn
        (PROF / f"{soc}.json").write_text(json.dumps(d, indent=2, ensure_ascii=False))
        regen_evidence(soc, d)
        print(f"[{soc}] dropped JMIR l2a02 (claims {before}->{len(d['claims'])}); gap recorded")

    print("patched 21-1015/21-1021/21-1023")


if __name__ == "__main__":
    main()
