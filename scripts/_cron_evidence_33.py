#!/usr/bin/env python3
"""Generate evidence.md (verbatim log, one short quote per source) for the 33-* cluster
from the ledger claims. Quotes are taken verbatim from web_search snippets observed
this run (2026-08-31). Source URLs are read from the ledger so they cannot drift."""
from __future__ import annotations
import json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = "2026-08-31"

# Verbatim quotes observed from web_search snippets this run, keyed by claim id.
QUOTES = {
    "33-3051": {
        "l101": "The WA Privacy and Responsible Information Sharing Act 2024 is the first Australian law to directly govern how personal information is used in automated decision-making.",
        "l102": "The Office of the Australian Information Commissioner published a guide to assessing the privacy risks of facial recognition technology... it sets out how the Privacy Act 1988 (Cth) and the Australian Privacy Principles apply to biometric collection and matching.",
        "l103": "Under Australian Privacy Principle 3, a law enforcement agency may collect personal information from a source other than the individual concerned, if collecting it directly could jeopardise an investigation.",
        "l104": "Provide clear authority to use x-ray body scanners, closed circuit television (CCTV), body-worn cameras and other emerging technologies to maintain safety and monitor threats within the closed correctional environment.",
        "l201": "body-worn cameras have the strongest and most developed evidence base... predictive and facial recognition tools raise major bias and equity concerns.",
        "l202": "A randomized controlled field trial found a 7.4% decrease in crime in neighborhoods using algorithmic-based predictive policing... Black residents would be targeted by police at twice the rate of white residents (Lum and Isaac 2016).",
        "l203": "only 6 out of 161 were evidence-strong in our study categorisation.",
        "l301": "In its first week, media reports put the trial at more than 130,000 faces scanned and 33 alerts. It led to 18 arrests.",
        "l302": "The AFP has already acknowledged using AI to assist with analysing data gathered under surveillance warrants.",
        "l303": "Queensland Police are trialling AI to analyse body-worn camera footage... about 95% of which is never reviewed or even seen.",
        "l304": "Police departments are starting to trial the use of AI technology for 'various forms of surveillance' and 'predictive policing'... a 'tendency to defer to the machine'.",
    },
    "33-3021": {
        "l101": "Police have used facial recognition on pre-recorded footage for more than ten years. What is new, however, is using it in real time on people walking down the street.",
        "l102": "Under Australian Privacy Principle 3, a law enforcement agency may collect personal information from a source other than the individual concerned, if collecting it directly could jeopardise an investigation.",
        "l103": "the Identify and Disrupt Act gives the AFP and ACIC powers to take over online accounts, modify data on networks, and conduct operations under emergency authorisations.",
        "l201": "A randomized controlled field trial found a 7.4% decrease in crime in neighborhoods using algorithmic-based predictive policing... Black residents would be targeted by police at twice the rate of white residents (Lum and Isaac 2016).",
        "l202": "body-worn cameras have the strongest and most developed evidence base... predictive and facial recognition tools raise major bias and equity concerns.",
        "l203": "only 6 out of 161 were evidence-strong in our study categorisation.",
        "l301": "Queensland Police are trialling AI to analyse body-worn camera footage... about 95% of which is never reviewed or even seen.",
        "l302": "The AFP has already acknowledged using AI to assist with analysing data gathered under surveillance warrants.",
        "l303": "Police departments are starting to trial the use of AI technology for 'various forms of surveillance' and 'predictive policing'... a 'tendency to defer to the machine'.",
    },
    "33-3012": {
        "l101": "Provide clear authority to use x-ray body scanners, closed circuit television (CCTV), body-worn cameras and other emerging technologies to maintain safety and monitor threats within the closed correctional environment.",
        "l102": "Corrective Services NSW has installed full-body scanning technology at reception points, and facilities nationally have added surveillance upgrades, netting and detection patrols.",
        "l201": "body-worn cameras have the strongest and most developed evidence base... predictive and facial recognition tools raise major bias and equity concerns.",
        "l301": "Corrective Services is also working towards a trial of low-radiation body scanners in women's prisons... analysing wastewater testing at prisons to determine if there has been an influx of drugs.",
        "l302": "Provide clear authority to use x-ray body scanners, closed circuit television, body-worn cameras and other emerging technologies to maintain safety and security in correctional environments.",
    },
}

for soc, qmap in QUOTES.items():
    d = json.loads((REPO / f"data/professions/{soc}.json").read_text())
    title = d.get("title", soc)
    lines = [f"# Evidence log - {title} ({soc})", "",
             f"Generated: {TODAY} | researchMethod: {d.get('researchMethod')} | confidence: {d.get('confidence')}",
             "",
             "Verbatim log, one short quote per source. URLs match the claim ledger.",
             "Lanes: L1 regulatory, L2 scholarly, L3 trade press, L4 job ads, L5 practitioner discourse (last30days).",
             ""]
    by_lane = {}
    for c in d.get("claims", []):
        by_lane.setdefault(c["lane"], []).append(c)
    for lane in ["L1", "L2", "L3", "L4", "L5"]:
        claims = by_lane.get(lane, [])
        if not claims:
            continue
        lines.append(f"## {lane} ({len(claims)} claims)")
        lines.append("")
        for c in claims:
            src = (c.get("sources") or [{}])[0]
            q = qmap.get(c["id"], "(L4/L5 corpus item - see raw payload in data/professions/%s/raw/)" % soc)
            lines.append(f"- **{c['id']}** {c['text'][:140]}{'...' if len(c['text'])>140 else ''}")
            lines.append(f"  - source: {src.get('publisher')} - {src.get('title')}")
            lines.append(f"  - url: {src.get('url')}")
            if q and not q.startswith("(L4"):
                lines.append(f"  - quote: \"{q}\"")
            lines.append("")
    (REPO / f"data/professions/{soc}/evidence.md").write_text("\n".join(lines))
    print(f"wrote evidence.md for {soc} ({len(d.get('claims',[]))} claims)")
print("EVIDENCE DONE")
