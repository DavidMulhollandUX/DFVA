#!/usr/bin/env python3
"""One-off initializer for the 4-SOC DFVA profession autoloop run (2026-08-30).
Creates ledger skeletons with real metadata from the v31 crosswalk notes.
"""
import json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
PROF.mkdir(parents=True, exist_ok=True)

TODAY = "2026-08-30"
EXPIRES = "2027-02-28"  # +6 months

SPECS = [
    {
        "soc": "47-1011",
        "title": "First-Line Supervisors/Managers of Construction Trades and Extraction Workers",
        "anzsco": "Construction Supervisor (ANZSCO 3121 group)",
        "aliases": ["Construction Supervisor", "Site Supervisor", "Foreman",
                     "Building Supervisor"],
    },
    {
        "soc": "47-2061",
        "title": "Construction Laborers",
        "anzsco": "821111",
        "aliases": ["Builder's Labourer", "Construction Worker", "Building Labourer"],
    },
    {
        "soc": "47-2111",
        "title": "Electricians",
        "anzsco": "341111",
        "aliases": ["Electrician (General)", "Electrical Tradesperson", "Electrician"],
    },
    {
        "soc": "49-2094",
        "title": "Electrical and Electronics Repairers, Commercial and Industrial Equipment",
        "anzsco": "342313",
        "aliases": ["Electronic Equipment Trades Worker", "Industrial Electronics Repairer",
                     "Commercial Electrician Repairer"],
    },
]

for s in SPECS:
    soc = s["soc"]
    raw = PROF / soc / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    ledger = {
        "onet_soc_code": soc,
        "title": s["title"],
        "aliases": s["aliases"],
        "anzsco": s["anzsco"],
        "window": {"from": "2025-08-30", "to": TODAY},
        "generated": TODAY,
        "expires": EXPIRES,
        "programs": [],
        "researchMethod": "empirical-five-lane-v1",
        "claims": [],
        "jobAds": {},
        "corpus": {
            "platforms": [],
            "retrieved": TODAY,
            "searchesReturningNothing": [],
        },
        "confidence": "low",
        "caveats": [],
    }
    (PROF / f"{soc}.json").write_text(json.dumps(ledger, indent=2))
    print(f"[init] {soc}: {s['title']} (ANZSCO {s['anzsco']})")
print("done")
