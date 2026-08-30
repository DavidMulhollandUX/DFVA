#!/usr/bin/env python3.12
import json
from pathlib import Path

PROF = Path("/Users/djmulholland/Documents/SXD-Github/DFVA") / "data" / "professions"
soc = "17-3029"
d = json.loads((PROF / f"{soc}.json").read_text())
replaced = False
for c in d["claims"]:
    for s in c.get("sources", []):
        if "blogs.sw.siemens.com" in s.get("url", ""):
            c["text"] = ("Trade-press analysis (Monograph, 2025) reports AI-powered CAD and BIM tools deliver "
                "30-50% efficiency gains in architecture and engineering firms by automating repetitive drafting "
                "tasks - AutoCAD 2025's machine-learning Object Detection scans drawings and suggests objects to "
                "convert to blocks, freeing technical staff for higher-value work - directly affecting engineering "
                "technicians who do CAD/CAE drafting and analysis.")
            c["sources"] = [{
                "publisher": "Monograph",
                "title": "AI CAD: Boost Design Efficiency with Intelligent Automation",
                "url": "https://monograph.com/blog/ai-cad-design-efficiency-intelligent-automation",
                "date": "2025-11-20",
                "whatItMeasured": ("Trade-press analysis of AI in CAD/BIM: AutoCAD 2025 ML Object Detection automates "
                    "drafting (block conversion); cites 30-50% efficiency gains in A&E firms."),
                "quote": ("AI automation handles these repetitive tasks in seconds, freeing technical staff for "
                    "higher-value design and engineering work."),
            }]
            c["scope"] = ("CAD/CAE tooling trade press (A&E firms); applies to drafting/design technicians' tooling. "
                "Signals augmentation of repetitive CAD work (block conversion, clash detection), not elimination of "
                "the role. US/global vendor-adjacent perspective.")
            c["refuteNotes"] = ("3-lens: source real (monograph.com, 200 verified, full text extracted); measures "
                "AI-in-CAD tooling; 2025. Trade press.")
            replaced = True
            break
    if replaced:
        break
assert replaced, "Siemens source not found in 17-3029"
(PROF / f"{soc}.json").write_text(json.dumps(d, indent=2, ensure_ascii=False))

new = [c for c in d["claims"] if c.get("lane") in ("L1", "L2", "L3") and c.get("id", "").startswith(soc + "-empi")]
ev = [f"# Evidence log - {soc} {d.get('title','')}", "",
    f"Generated {d.get('generated')}. Empirical five-lane run completed (L1/L2/L3 added this run; L4 Adzuna+LinkedIn "
    f"and L5 last30days already present and preserved).",
    f"Confidence: {d['confidence']}. Claims admitted: {len(d['claims'])}. L1/L2 claims: "
    f"{sum(1 for c in d['claims'] if c.get('lane') in ('L1','L2'))}. Declared L5 corpus: "
    f"{bool(d.get('corpus', {}).get('l5Sample'))}.", ""]
for c in new:
    s = c["sources"][0]
    ev.append(f"- **[{c['lane']}] {s['publisher']}** - {s['url']}")
    ev.append(f"  > {s.get('quote') or c['text'][:200]}")
ev.append("")
ev.append("L5 practitioner-discourse corpus: last30days sweep over 180 days - see corpus.l5Sample.")
ev.append("L4 LinkedIn corpus: linkedin-mcp-search unofficial scrape - see corpus.linkedin. L4 Adzuna time-series: see jobAds.")
(PROF / soc / "evidence.md").write_text("\n".join(ev))
print("17-3029 L3 source swapped Siemens->Monograph; evidence.md regenerated")
for c in d["claims"]:
    for s in c.get("sources", []):
        if "monograph" in s.get("url", ""):
            print("URL now:", s["url"])
