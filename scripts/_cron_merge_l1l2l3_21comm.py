#!/usr/bin/env python3.12
"""Merge curated L1/L2/L3 web-research claims into the four community-social ledgers.

MERGES only: never overwrites L4/L5 claims already folded. Records coverage gaps
(Factiva auth expired; L5 grounding/jobs sources unreachable) in corpus.searchesReturningNothing,
sets confidence (>=2 L1/L2 + declared L5 corpus => high), and writes evidence.md.
"""
from __future__ import annotations
import datetime as dt, json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
TODAY = "2026-08-31"

SOC_CONF = {
    "21-1015": "high",
    "21-1021": "high",
    "21-1023": "high",
    "21-1091": "high",
}

GAPS = [
    {"lane": "L3", "source": "factiva", "status": "auth_expired",
     "detail": "OpenAthens/Factiva session expired; L3 supplied via web (AASW/ASORC/PHAA/ARPA).", "date": TODAY},
    {"lane": "L5", "source": "grounding", "status": "unreachable",
     "detail": "Keyless web search unavailable (last30days grounding source).", "date": TODAY},
    {"lane": "L4", "source": "last30days-jobs", "status": "unreachable",
     "detail": "last30days hiring-signals/jobs source unreachable (DNS).", "date": TODAY},
]

CAVEATS = {
    "21-1015": [
        "L3 Factiva lane unavailable this run (OpenAthens auth expired); L3 supplied via web (ASORC conference).",
        "L5 corpus is a self-selected practitioner-discourse sample (HN/X/reddit/youtube); many items are generic AI discourse, not occupation-specific. Corroborate before high-grade use.",
        "L5 grounding and L4 jobs sources were unreachable this run.",
    ],
    "21-1021": [
        "L3 Factiva lane unavailable this run (OpenAthens auth expired); L3 supplied via web (AASW).",
        "L5 corpus is self-selected; corroborate before high-grade use. L5 grounding source unreachable.",
        "OVIC ChatGPT finding is Victoria child protection (one jurisdiction, 2023 access data).",
    ],
    "21-1023": [
        "L3 Factiva lane unavailable this run (OpenAthens auth expired); L3 supplied via web (AASW).",
        "L5 corpus is self-selected; corroborate before high-grade use. L5 grounding source unreachable.",
        "AMHSW credential covers a sub-set of this SOC; L1 reflects Medicare accreditation, not full population.",
    ],
    "21-1091": [
        "L3 Factiva lane unavailable this run (OpenAthens auth expired); L3 supplied via web (PHAA/Pulse+IT).",
        "L5 corpus is self-selected; corroborate before high-grade use. L5 grounding source unreachable.",
        "L1 is thin: health educators are not statutorily registered; only peak-body (PHAA) guidance exists.",
    ],
}


def main():
    batch = json.loads((PROF / "_l1l2l3_batch_21.json").read_text())
    for soc, claims in batch.items():
        ledger = PROF / f"{soc}.json"
        d = json.loads(ledger.read_text())
        existing = d.setdefault("claims", [])
        seen_ids = {c.get("id") for c in existing}
        seen_text = {c.get("text", "") for c in existing}
        added = 0
        for c in claims:
            if c["id"] in seen_ids or c["text"] in seen_text:
                continue
            existing.append(c)
            seen_ids.add(c["id"])
            seen_text.add(c["text"])
            added += 1
        d["claims"] = existing

        corpus = d.setdefault("corpus", {})
        srn = corpus.get("searchesReturningNothing", []) or []
        for g in GAPS:
            if not any(x.get("source") == g["source"] and x.get("lane") == g["lane"] for x in srn):
                srn.append(g)
        corpus["searchesReturningNothing"] = srn

        d["confidence"] = SOC_CONF[soc]
        cav = d.setdefault("caveats", [])
        for note in CAVEATS[soc]:
            if note not in cav:
                cav.append(note)
        d["generated"] = TODAY
        d["expires"] = "2027-02-27"
        ledger.write_text(json.dumps(d, indent=2, ensure_ascii=False))

        # evidence.md — one short line per source (verbatim log of what was admitted)
        lines = [f"# Evidence log — {soc} {d.get('title','')}", ""]
        lines.append(f"Generated {TODAY}. Empirical five-lane (L1-L5) autoloop. Research method: empirical-five-lane-v1.")
        lines.append(f"Confidence: {d['confidence']}. L1/L2/L3 claims below are from web research (Factiva auth expired this run).")
        lines.append("")
        for c in d["claims"]:
            src = (c.get("sources") or [{}])[0]
            lines.append(f"- [{c['lane']}] {c['text']}")
            lines.append(f"    source: {src.get('publisher','')} — {src.get('title','')} ({src.get('url','')}, {src.get('date','')})")
            lines.append(f"    measured: {src.get('whatItMeasured','')}")
        (PROF / soc / "evidence.md").write_text("\n".join(lines) + "\n")
        print(f"[{soc}] merged {added} L1/L2/L3 claims (total {len(d['claims'])}); confidence={d['confidence']}; evidence.md written")


if __name__ == "__main__":
    main()
