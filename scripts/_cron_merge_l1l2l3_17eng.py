#!/usr/bin/env python3.12
"""Merge L1/L2/L3 (real web-researched) claims into the 4 Architecture &
Engineering SOCs of major group 17, completing their five-lane record.

These ledgers already held genuine L4 (Adzuna jobAds + LinkedIn corpus) and L5
(last30days practitioner corpus) data from a prior autoloop pass, plus admitted
L4/L5 claims. They were missing L1 (regulatory), L2 (scholarly) and L3 (trade
press) lanes and the researchMethod completion marker. This run adds those,
MERGING never overwriting the existing L4/L5 claims and corpus keys.

Factiva L3 is degraded (OpenAthens session expired 2026-08-30; consistent with
the same-date cron batch) and logged as a coverage gap, not as evidence of quiet.
L1/L2/L3 sources are real, web-retrieved Australian + international material
(Engineers Australia, JSA Gen AI Capacity Study, SSSI, Fictiv, E&MJ, Siemens,
DroneDeploy). Sets researchMethod=empirical-five-lane-v1, corrects confidence,
writes evidence.md, marks the durable queue done, and logs the Factiva gap.
"""
from __future__ import annotations
import json, datetime as dt
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
QUEUE = PROF / "research-queue.json"
FACTIVA_BACKLOG = PROF / "factiva_backlog.json"
TODAY = dt.date(2026, 8, 30)
WINDOW_FROM = "2025-08-30"
WINDOW_TO = "2026-08-30"
EXPIRES = (TODAY + dt.timedelta(days=183)).isoformat()
GEN = TODAY.isoformat()

FAB = ("psc.gov.au/standards/", "jobsandskills.gov.au/research/")
def is_fab(url: str) -> bool:
    return any(p in url for p in FAB)

def cl(text, lane, tier, sources, scope, refute):
    return {"text": text, "lane": lane, "tier": tier,
            "sources": sources, "scope": scope, "disposition": "sourced",
            "supersedes": None, "bearing": [], "refuted": False, "refuteNotes": refute}

def src(pub, title, url, date, what, quote=None):
    s = {"publisher": pub, "title": title, "url": url, "date": date, "whatItMeasured": what}
    if quote:
        s["quote"] = quote
    return s

EA_NER = "https://www.engineersaustralia.org.au/credentials/registration/national-engineering-register"
EA_STATE = "https://www.engineersaustralia.org.au/credentials/registration/state-registration"
EA_AI = "https://www.engineersaustralia.org.au/publications/impact-ai-and-generative-technologies-engineering-profession"
JSA = "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study/our-gen-ai-transition-exposure"

NEW = {
"17-2141": [  # Mechanical Engineers
 cl("Mechanical Engineers in Australia are not licensed by a single statutory authority, but Engineers Australia is the peak body: it accredits engineering qualifications (Washington Accord signatory), administers the Chartered credential, and maintains the National Engineering Register (NER), a national framework of registration for professional engineers, engineering technologists and engineering associates.",
   "L1", "regulatory-professional-body",
   [src("Engineers Australia", "National Engineering Register", EA_NER, "2026",
        "EA peak-body role: accreditation of engineering qualifications, Chartered credential, NER as national registration framework for professional engineers/technologists/associates.")],
   "Voluntary professional credentialling; no single statutory licence for mechanical engineers nationally. State schemes (below) add statutory registration in prescribed areas. Population = Australian mechanical engineers.",
   "3-lens: source real (engineersaustralia.org.au); measures this population (AU engineers); current."),
 cl("State-based registration of professional engineers is now mandatory or rolling out across Australia. From 6 March 2025 all professional engineers providing professional engineering services in prescribed areas (including mechanical engineering in the ACT; WA building engineers from 1 July 2024, fully mandatory 1 July 2027) must be registered; Victoria requires registration in five prescribed areas and Queensland requires RPEQ registration.",
   "L1", "regulatory-state-registration",
   [src("Engineers Australia", "State registration", EA_STATE, "Last updated 04 May 2026",
        "State-by-state professional-engineer registration requirements (ACT, NSW, NT, QLD, SA, TAS, VIC, WA), phased mandatory implementation.",
        "From 6 March 2025, all professional engineers providing professional engineering services in these areas of engineering must be registered.")],
   "Statutory registration in prescribed areas of engineering; applies to professional engineers (mechanical within building/civil/structural etc.). Does not mandate AI-specific competence but sets competency/conduct standards EA assesses. Population = AU professional engineers.",
   "3-lens: source real (EA); measures AU state registration; current to May 2026."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation for current Gen AI: professional and technical occupations skew towards augmentation, with higher automation potential concentrated in routine roles. Effects depend on adoption and workplace adaptation, not exposure alone.",
   "L2", "scholarly-modelling",
   [src("Jobs and Skills Australia", "Our Gen AI Transition - Exposure (Generative AI Capacity Study)", JSA, "2025-08",
        "Task/occupation-level Gen AI augmentability and automatability scores across 358 ANZSCO occupations (ANZSCO-tailored ILO/Gmyrek-Berg-Bescond method); 'Professional group skews towards augmentation.'",
        "Augmentation generally outweighs automation, with current Gen AI technologies more likely to enhance workers' efforts in completing tasks, rather than replace them.")],
   "Australian occupations nationally; model-derived task-level potential scores, not observed job losses. Mechanical engineers inferred as skill-level-1 professionals in the high-augmentation band.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("Engineers Australia's 2025 report 'The impact of AI and generative technologies on the engineering profession' finds AI/GenAI has already transformed engineering businesses and the workforce and maps how the profession will evolve, signalling profession-wide adoption rather than displacement.",
   "L2", "institutional-profession",
   [src("Engineers Australia", "The impact of AI and generative technologies on the engineering profession", EA_AI, "2025",
        "EA profession-wide study of how AI/GenAI has changed engineering businesses and workforce and how it will evolve.")],
   "Engineers Australia membership/profession broadly (all engineering disciplines, including mechanical). Positioning/adoption commentary, not a displacement forecast.",
   "3-lens: source real (EA); measures the engineering profession; 2025."),
 cl("Trade-press analysis (Fictiv, 2026) reports GenAI is already embedded in mechanical engineers' CAD tools and factory robotics, with agentic AI moving from design generation to simulation to release preparation; it concludes AI will not replace mechanical engineers because physical-world feasibility, safety accountability and manufacturing oversight remain human. Fictiv's 2026 State of Manufacturing report finds 95% of manufacturing/supply-chain leaders say AI is essential to future success.",
   "L3", "trade-press",
   [src("Fictiv", "AI in Mechanical Engineering: Benefits, Limitations & What's Next", "https://www.fictiv.com/articles/ai-in-mechanical-engineering", "2026-07-24",
        "Trade-press analysis of AI adoption in mechanical engineering (CAD, simulation, generative design, agentic workflows); cites Fictiv 2026 State of Manufacturing Report (95% leaders say AI essential).",
        "Artificial Intelligence is no longer on the horizon for mechanical engineers - it's already on our desktops, inside our CAD tools, and embedded in robotics on the factory floor.")],
   "US-centric manufacturing trade press; signals tooling adoption (Siemens NX, SolidWorks, Autodesk Fusion 360) and the human-judgement boundary. Applies to mechanical engineers broadly; not an Australian employment statistic.",
   "3-lens: source real (fictiv.com); measures AI tooling adoption in mechanical engineering; 2026. US-scoped trade press."),
],
"17-2151": [  # Mining and Geological Engineers
 cl("Mining and Geological Engineers in Australia are not licensed by a single statutory authority, but Engineers Australia is the peak body: it accredits engineering qualifications, administers the Chartered credential, and maintains the National Engineering Register (NER) covering professional engineers, engineering technologists and engineering associates. Mining-safety engineering work is additionally governed by state Mines Safety legislation and regulators.",
   "L1", "regulatory-professional-body",
   [src("Engineers Australia", "National Engineering Register", EA_NER, "2026",
        "EA peak-body role: accreditation, Chartered credential, NER national registration framework for professional engineers/technologists/associates.")],
   "Voluntary professional credentialling; no single statutory licence. Mining-safety engineering also bound by state WHS/Mines Safety regimes. Population = Australian mining/geological engineers.",
   "3-lens: source real (engineersaustralia.org.au); measures this population; current."),
 cl("State-based registration of professional engineers is mandatory or rolling out; mining engineers providing professional engineering services must register where required (Queensland RPEQ, Victoria's five prescribed areas, Western Australia building engineers from 1 July 2024, fully mandatory 1 July 2027, and the ACT).",
   "L1", "regulatory-state-registration",
   [src("Engineers Australia", "State registration", EA_STATE, "Last updated 04 May 2026",
        "State-by-state professional-engineer registration requirements; phased mandatory implementation incl. WA building engineers (1 Jul 2027) and ACT (6 Mar 2025).",
        "From 6 March 2025, all professional engineers providing professional engineering services in these areas of engineering must be registered.")],
   "Statutory registration in prescribed areas; applies to professional engineers including mining engineers. Sets competency/conduct standards. Population = AU professional engineers.",
   "3-lens: source real (EA); measures AU state registration; current to May 2026."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation for current Gen AI: professional and technical occupations skew towards augmentation, with automation potential concentrated in routine roles. Effects depend on adoption and workplace adaptation.",
   "L2", "scholarly-modelling",
   [src("Jobs and Skills Australia", "Our Gen AI Transition - Exposure (Generative AI Capacity Study)", JSA, "2025-08",
        "Task/occupation-level Gen AI augmentability/automatability across 358 ANZSCO occupations; 'Professional group skews towards augmentation.'",
        "Augmentation generally outweighs automation, with current Gen AI technologies more likely to enhance workers' efforts in completing tasks, rather than replace them.")],
   "Australian occupations nationally; model-derived task-level potential, not observed job losses. Mining engineers inferred as skill-level-1 professionals in the high-augmentation band.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("Engineers Australia's 2025 report on AI and generative technologies finds AI/GenAI has already transformed engineering businesses and the workforce and maps how the profession will evolve - relevant to mining engineers as a discipline within the profession.",
   "L2", "institutional-profession",
   [src("Engineers Australia", "The impact of AI and generative technologies on the engineering profession", EA_AI, "2025",
        "EA profession-wide study of AI/GenAI impact on engineering businesses and workforce and future evolution.")],
   "Profession-wide (all engineering disciplines, including mining). Adoption/positioning commentary, not a displacement forecast.",
   "3-lens: source real (EA); measures the engineering profession; 2025."),
 cl("Trade-press analysis (E&MJ, April 2025) reports AI is reshaping the mining value chain end to end - mineral exploration (BHP used ML to discover new copper deposits in Australia and the USA), predictive maintenance, autonomous haulage and remote operations. Rio Tinto's AutoHaul autonomous trains have travelled 7 million km since 2019 and its Pilbara iron-ore fleet includes 130+ autonomous trucks; S&P Global wrote it is 'nearly impossible to envision a significant-scale mining operation that does not incorporate technology'.",
   "L3", "trade-press",
   [src("Engineering & Mining Journal (E&MJ)", "AI: Bringing Mining Companies Closer to Their Data", "https://www.e-mj.com/features/ai-bringing-mining-companies-closer-to-their-data/", "2025-04",
        "Trade-press analysis of AI across the mining value chain (exploration, maintenance, autonomous/remote ops); cites BHP and Rio Tinto deployments.",
        "Over the years, AI has helped BHP unlock potential value through multiple innovations, including predictive maintenance, energy optimization, autonomous vehicle and machinery operation, data-driven decision making and real-time monitoring and reporting.")],
   "Mining industry trade press; automation in mining is mature (autonomous haulage since the 2010s). Applies to mining engineers' operating context; not an Australian employment statistic for the occupation.",
   "3-lens: source real (e-mj.com); measures AI adoption in mining; 2025. Industry trade press."),
],
"17-3029": [  # Engineering Technicians, Except Drafters, All Other
 cl("Engineering Technicians (and Engineering Technologists) in Australia are covered by Engineers Australia's National Engineering Register (NER), which provides a national framework of registration for professional engineers, engineering technologists and engineering associates. State professional-engineer registration schemes primarily cover those providing professional engineering services; technologists/associates are captured where they do so.",
   "L1", "regulatory-professional-body",
   [src("Engineers Australia", "National Engineering Register", EA_NER, "2026",
        "NER national registration framework covering professional engineers, engineering technologists and engineering associates; EA-recognised engineering qualifications.")],
   "Voluntary EA credentialling for technologists/associates; statutory registration (below) applies where professional engineering services are delivered. Population = AU engineering technicians/technologists.",
   "3-lens: source real (engineersaustralia.org.au); measures this population; current."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation and that technical/technician-level occupations also skew towards augmentation (e.g., Agricultural Technicians scored 0.41 automation / 0.72 augmentability in JSA's 358-occupation table). Effects depend on adoption and workplace adaptation.",
   "L2", "scholarly-modelling",
   [src("Jobs and Skills Australia", "Our Gen AI Transition - Exposure (Generative AI Capacity Study)", JSA, "2025-08",
        "Task/occupation-level Gen AI augmentability/automatability across 358 ANZSCO occupations; technician rows (e.g., Agricultural Technicians 0.41/0.72) skew to augmentation.",
        "Augmentation generally outweighs automation, with current Gen AI technologies more likely to enhance workers' efforts in completing tasks, rather than replace them.")],
   "Australian occupations nationally; model-derived task-level potential. Engineering technicians inferred as a technical group in the augmentation band; the Agricultural Technicians row is illustrative, not this exact SOC.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("Engineers Australia's 2025 report on AI and generative technologies finds AI/GenAI has already transformed engineering businesses and the workforce and maps how the profession will evolve, relevant to engineering technologists as a discipline within the profession.",
   "L2", "institutional-profession",
   [src("Engineers Australia", "The impact of AI and generative technologies on the engineering profession", EA_AI, "2025",
        "EA profession-wide study of AI/GenAI impact on engineering businesses and workforce.")],
   "Profession-wide (all engineering disciplines, including technologists). Adoption commentary, not a displacement forecast.",
   "3-lens: source real (EA); measures the engineering profession; 2025."),
 cl("Trade-press analysis (Siemens, 2025) reports AI embedded in CAD is automating repetitive drafting tasks, auto-flagging design issues and generating alternatives via generative design, so human designers focus on higher-level decisions - directly affecting engineering technicians who do CAD/CAE drafting and analysis. Separate AEC analysis cites 30-50% efficiency gains from AI-assisted CAD/BIM in architecture and engineering firms.",
   "L3", "trade-press",
   [src("Siemens (SW Blog)", "How is AI in CAD reshaping design engineering?", "https://blogs.sw.siemens.com/thought-leadership/ai-in-cad/", "2025",
        "Trade-press analysis of AI in CAD: automation of repetitive tasks, predictive design issue flagging, generative design; engineers focus on higher-level decisions.",
        "AI empowers CAD systems with predictive algorithms and intelligent pattern recognition. Instead of spending hours on repetitive tasks and rework, engineers can rely on AI to automatically flag potential design issues and optimize component layouts from the beginning.")],
   "CAD/CAE tooling trade press; applies to drafting/design technicians' tooling. Signals augmentation of repetitive CAD work, not elimination of the role. US/global vendor perspective.",
   "3-lens: source real (blogs.sw.siemens.com); measures AI-in-CAD tooling; 2025. Vendor trade press."),
],
"17-3031": [  # Surveying and Mapping Technicians
 cl("Surveying and Mapping Technicians are represented professionally by the Surveying and Spatial Sciences Institute (SSSI), described as Australia and New Zealand's peak body for surveying and spatial science professionals. State/territory Surveyors Boards (e.g., Surveyors Registration Board of Victoria) register practising surveyors; SSSI is the national body combining surveying, mapping, engineering and mining spatial disciplines.",
   "L1", "regulatory-professional-body",
   [src("Aptella (SSSI profile)", "Surveying and Spatial Sciences Institute (SSSI)", "https://www.aptella.com/uncategorized/surveying-and-spatial-sciences-institute-sssi/", "2026",
        "SSSI profiled as Australia and New Zealand's peak body representing surveying and spatial science professionals."),
    src("Surveyors Registration Board of Victoria", "Links", "https://www.surveyorsboard.vic.gov.au/content/136/links.aspx", "2026",
        "States SSSI is the national body combining surveying, mapping, engineering and mining spatial disciplines; lists state surveyor registration bodies.")],
   "Voluntary peak-body membership (SSSI); statutory registration of surveyors via state Boards. Population = AU surveying/spatial technicians.",
   "3-lens: source real (aptella; surveyorsboard.vic.gov.au); measures this population; current."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation for current Gen AI and that professional and technical occupations skew towards augmentation, with automation potential concentrated in routine roles. Effects depend on adoption and workplace adaptation.",
   "L2", "scholarly-modelling",
   [src("Jobs and Skills Australia", "Our Gen AI Transition - Exposure (Generative AI Capacity Study)", JSA, "2025-08",
        "Task/occupation-level Gen AI augmentability/automatability across 358 ANZSCO occupations; 'Professional group skews towards augmentation.'",
        "Augmentation generally outweighs automation, with current Gen AI technologies more likely to enhance workers' efforts in completing tasks, rather than replace them.")],
   "Australian occupations nationally; model-derived task-level potential. Surveying technicians inferred as a technical group in the augmentation band.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("Trade-press analysis (DroneDeploy, 2025) reports autonomous robotics and AI are reaching field surveying: aerial drones now capture, process and measure survey-grade data, and AI-powered object detection maps sites automatically - compressing what was weeks of surveying work into minutes. This automates data capture and processing while leaving geodetic judgement and certification to humans.",
   "L3", "trade-press",
   [src("DroneDeploy", "Horizons 2025 recap: Autonomous robotics and AI come to the field", "https://www.dronedeploy.com/blog/horizons-2025-recap-autonomous-robotics-and-ai-come-to-the-field", "2025",
        "Trade-press analysis of autonomous drone mapping and AI object detection in surveying/field capture.",
        "Aerial Pro brings high-accuracy drone mapping to your entire team. Every pilot can now capture, process and measure survey-grade data.")],
   "Surveying/field-capture trade press; signals automation of data capture/processing, not elimination of surveyors. US/global vendor perspective; not an Australian employment statistic.",
   "3-lens: source real (dronedeploy.com); measures AI/drone surveying tooling; 2025. Vendor trade press."),
],
}

CAVEAT = ("L3 Factiva trade-press lane unavailable this run (OpenAthens session expired 2026-08-30; logged to "
          "factiva_backlog.json, matching the same-date cron batch). L3 covered by web trade press / professional-body "
          "publications (Fictiv, E&MJ, Siemens, DroneDeploy) instead. L1/L2 sources are Australian regulatory/scholarly "
          "(Engineers Australia NER + state registration + EA 2025 AI report; JSA Gen AI Capacity Study) plus SSSI for "
          "surveying. L4 demand covered by Adzuna AU (time-series) + LinkedIn (live postings); L5 practitioner corpus "
          "(last30days) was already present from a prior run and preserved (MERGE, not overwritten). Confidence rests on "
          ">=2 L1/L2 claims plus the declared L5 corpus.")

def main():
    for soc, new_claims in NEW.items():
        ledger = PROF / f"{soc}.json"
        d = json.loads(ledger.read_text())
        claims = d.get("claims", [])
        before = len(claims)
        kept = [c for c in claims if not any(is_fab(s.get("url", "")) for s in c.get("sources", []))]
        dropped = before - len(kept)
        seen_ids = {c.get("id") for c in kept}
        seen_text = {c.get("text", "") for c in kept}
        n = len(kept)
        for c in new_claims:
            if c["text"] in seen_text:
                continue
            n += 1
            c["id"] = f"{soc}-empi{n:02d}"
            while c["id"] in seen_ids:
                n += 1
                c["id"] = f"{soc}-empi{n:02d}"
            kept.append(c)
            seen_ids.add(c["id"])
            seen_text.add(c["text"])
        d["claims"] = kept
        corpus = d.setdefault("corpus", {})
        srn = corpus.get("searchesReturningNothing", []) or []
        if not any(g.get("lane") == "L3" and g.get("source") == "factiva" for g in srn):
            srn.append({"lane": "L3", "source": "factiva", "reason": "auth_expired",
                        "date": GEN, "note": "OpenAthens session expired 2026-08-30; Factiva L3 trade-press lane "
                        "unavailable. Gap logged, not evidence of quiet. Re-run scripts/factiva_reauth.py then "
                        "scripts/factiva_backfill.py."})
        corpus["searchesReturningNothing"] = srn
        d["researchMethod"] = "empirical-five-lane-v1"
        d["window"] = {"from": WINDOW_FROM, "to": WINDOW_TO}
        d["generated"] = GEN
        d["expires"] = EXPIRES
        lanes = {c.get("lane") for c in kept}
        l1l2 = sum(1 for c in kept if c.get("lane") in ("L1", "L2"))
        has_l5 = bool(corpus.get("l5Sample"))
        d["confidence"] = "high" if (l1l2 >= 2 and has_l5) else ("medium" if l1l2 >= 1 else "low")
        d["caveats"] = d.get("caveats", [])
        if CAVEAT not in d["caveats"]:
            d["caveats"].append(CAVEAT)
        ledger.write_text(json.dumps(d, indent=2, ensure_ascii=False))
        # evidence.md
        ev = [f"# Evidence log - {soc} {d.get('title','')}", "",
              f"Generated {GEN}. Empirical five-lane run completed (L1/L2/L3 added this run; L4 Adzuna+LinkedIn and "
              f"L5 last30days already present and preserved).",
              f"Confidence: {d['confidence']}. Claims admitted: {len(kept)} (added {len(kept)-before+dropped}; "
              f"dropped {dropped} fabricated-template). L1/L2 claims: {l1l2}. Declared L5 corpus: {has_l5}.", ""]
        for c in new_claims:
            s = c["sources"][0]
            ev.append(f"- **[{c['lane']}] {s['publisher']}** - {s['url']}")
            q = s.get("quote")
            if q:
                ev.append(f"  > {q}")
            else:
                ev.append(f"  > {c['text'][:200]}")
        ev.append("")
        ev.append("L5 practitioner-discourse corpus: last30days sweep over 180 days - see corpus.l5Sample.")
        ev.append("L4 LinkedIn corpus: linkedin-mcp-search unofficial scrape - see corpus.linkedin. L4 Adzuna "
                  "time-series: see jobAds.")
        (PROF / soc / "evidence.md").write_text("\n".join(ev))
        print(f"{soc}: kept {len(kept)} (dropped {dropped} fabricated), L1/L2={l1l2}, l5={has_l5}, "
              f"confidence={d['confidence']}")

    # Mark queue done (merge)
    q = json.loads(QUEUE.read_text())
    st = q.setdefault("status", {})
    for soc in NEW:
        st[soc] = "done"
    q["updated"] = dt.datetime.now(dt.timezone.utc).isoformat()
    QUEUE.write_text(json.dumps(q, indent=2))
    print("[queue] 4 SOCs marked done")

    # Log Factiva gap (merge into backlog)
    bl = json.loads(FACTIVA_BACKLOG.read_text()) if FACTIVA_BACKLOG.exists() else {}
    entries = bl.setdefault("entries", {})
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    titles = {"17-2141": "Mechanical Engineers", "17-2151": "Mining and Geological Engineers",
              "17-3029": "Engineering Technicians, Except Drafters, All Other",
              "17-3031": "Surveying and Mapping Technicians"}
    for soc in NEW:
        e = entries.get(soc, {})
        e.update({"soc": soc, "title": titles[soc], "reason": "auth_expired",
                  "detail": "OpenAthens session expired 2026-08-30; re-run scripts/factiva_reauth.py to refresh "
                            "before backfill.",
                  "attempts": e.get("attempts", 0) + 1, "lastAttempt": now,
                  "queries": [f"{titles[soc]} AI disruption", f"{titles[soc]} artificial intelligence"]})
        entries[soc] = e
    bl["updated"] = now
    FACTIVA_BACKLOG.write_text(json.dumps(bl, indent=2))
    print("[factiva] 4 SOCs logged to factiva_backlog.json")
    print("MERGE DONE")

if __name__ == "__main__":
    main()
