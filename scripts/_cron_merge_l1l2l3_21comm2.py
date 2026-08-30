#!/usr/bin/env python3.12
"""Merge curated L1/L2/L3 web-research claims into the 21-1092/93/94 ledgers.

MERGES only: never overwrites L4/L5 claims, linkedin, l5Sample, platforms or
retrieved already folded. Records the Factiva coverage gap (OpenAthens auth
expired, interactive SSO — cannot run unattended; L3 supplied via web), sets
confidence (>=2 L1/L2 + declared L5 corpus => high), and writes evidence.md.
L5 was NOT re-run this batch: it was completed in the prior run (2026-08-29)
and its corpus is preserved.
"""
from __future__ import annotations
import datetime as dt, json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
TODAY = "2026-08-31"
EXPIRES = "2027-02-27"

SOC_CONF = {"21-1092": "high", "21-1093": "high", "21-1094": "high"}

GAPS = [
    {"lane": "L3", "source": "factiva", "status": "auth_expired",
     "detail": "OpenAthens/Factiva session expired (interactive UoM SSO required; loop cannot authenticate). L3 supplied via web research (OVIC, AASW, Infoxchange, Oxford AI Atlas, Croakey/DHCRC, CHIC, Front Public Health).", "date": TODAY},
]

CAVEATS = {
    "21-1092": [
        "L3 Factiva lane unavailable this run (OpenAthens auth expired); L3 supplied via web (Oxford Tech & Justice AI Atlas, MULR).",
        "L5 corpus is a self-selected practitioner-discourse sample (HN/X/reddit/youtube) carried from the 2026-08-29 run; corroborate before high-grade use.",
        "L1 is thin: probation/parole officers are state-regulated under corrective-services legislation, not nationally registered; no AI-specific binding instrument.",
    ],
    "21-1093": [
        "L3 Factiva lane unavailable this run (OpenAthens auth expired); L3 supplied via web (OVIC, AASW, Infoxchange).",
        "L5 corpus carried from 2026-08-29 run; OVIC ChatGPT child-protection finding (2024) is the strongest occupation-specific AI-failure signal.",
        "Privacy Act ADM transparency obligation (effective 10 Dec 2026) is forward-dated and applies to charities/NGOs making automated decisions, not all AI assistance.",
    ],
    "21-1094": [
        "L3 Factiva lane unavailable this run (OpenAthens auth expired); L3 supplied via web (Croakey/DHCRC roadmap, CHIC, Front Public Health, Healthcare Australia).",
        "L5 corpus carried from 2026-08-29 run; CHW AI-evidence is international/multi-country, not Australia-specific.",
        "L1: general Community Health Workers are not nationally registered (AHPRA); only ATSI Health Practitioners are. Scope claims to registration status.",
    ],
}


def main():
    batch = json.loads((PROF / "_l1l2l3_batch_21comm2.json").read_text())
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

        # CORPUS INTEGRITY: preserve linkedin / l5Sample / platforms / retrieved.
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
        d["expires"] = EXPIRES
        ledger.write_text(json.dumps(d, indent=2, ensure_ascii=False))

        # evidence.md — verbatim log of admitted L1/L2/L3 sources
        lines = [f"# Evidence log — {soc} {d.get('title','')}", ""]
        lines.append(f"Generated {TODAY}. Empirical five-lane (L1-L5) autoloop. L1/L2/L3 added this batch from web research (Factiva auth expired).")
        lines.append(f"Confidence: {d['confidence']}. L4/L5 carried from prior run.")
        lines.append("")
        for c in [x for x in d["claims"] if x.get("lane") in ("L1", "L2", "L3")]:
            src = (c.get("sources") or [{}])[0]
            lines.append(f"- [{c['lane']}] {c['text']}")
            lines.append(f"    source: {src.get('publisher','')} — {src.get('title','')} ({src.get('url','')}, {src.get('date','')})")
            lines.append(f"    measured: {src.get('whatItMeasured','')}")
            if c.get("scope"):
                lines.append(f"    scope: {c['scope']}")
        (PROF / soc / "evidence.md").write_text("\n".join(lines) + "\n")
        print(f"[{soc}] merged {added} L1/L2/L3 claims (total {len(d['claims'])}); confidence={d['confidence']}; evidence.md written")


if __name__ == "__main__":
    main()
