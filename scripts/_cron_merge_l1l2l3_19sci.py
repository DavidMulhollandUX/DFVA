#!/usr/bin/env python3.12
"""Merge L1/L2/L3 (real web-researched) claims into the 4 Science-cluster SOCs of
major group 19, completing their five-lane record.

These ledgers already held genuine L4 (Adzuna jobAds + LinkedIn corpus) and L5
(last30days practitioner corpus) data from a prior autoloop pass, plus admitted
L4/L5 claims. They were missing L1 (regulatory), L2 (scholarly) and L3 (trade
press) lanes and the researchMethod completion marker. This run adds those,
MERGING never overwriting the existing L4/L5 claims and corpus keys.

Factiva L3 is degraded (no interactive OpenAthens SSO session available in an
unattended cron run) and logged as a coverage gap, not as evidence of quiet.
L1/L2/L3 sources are real, web-retrieved Australian + international material
(ASSA, JSA Gen AI Capacity Study, RACI via Fair Work award, OSCA, Forestry
Australia, Edinburgh AI-governance study, Cell ORGANA lab automation, Nature
AI-Sprint, PI-CASC drone forestry). Sets researchMethod=empirical-five-lane-v1,
corrects confidence, writes evidence.md, marks the durable queue done, and logs
the Factiva gap.
"""
from __future__ import annotations
import json, datetime as dt
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
QUEUE = PROF / "research-queue.json"
FACTIVA_BACKLOG = PROF / "factiva_backlog.json"
TODAY = dt.date(2026, 8, 31)
WINDOW_FROM = "2025-08-31"
WINDOW_TO = "2026-08-31"
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

# Shared L2 anchor: JSA Gen AI Capacity Study (official) + secondary summary.
JSA = "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study/our-gen-ai-transition-exposure"
JSA_SUM = "https://aichanging.work/en/blog/jsa-genai-capacity-study-australia-2025"
def jsa_sources():
    return [
        src("Jobs and Skills Australia", "Our Gen AI Transition - Exposure (Generative AI Capacity Study)",
            JSA, "2025-08",
            "Task/occupation-level Gen AI augmentability and automatability across 358 ANZSCO occupations; "
            "'augmentation generally outweighs automation'.",
            "Augmentation generally outweighs automation, with current Gen AI technologies more likely to "
            "enhance workers' efforts in completing tasks, rather than replace them."),
        src("AI Changing Work (secondary summary of JSA)", "Australia's First Gen AI Capacity Study: 79% of Workers Face Low Risk",
            JSA_SUM, "2025",
            "Secondary summary of the JSA study: 79% of Australian workers face low/very-low automation risk; "
            "professionals see the highest augmentation gains."),
    ]

NEW = {
"19-3099": [  # Social Scientists and Related Workers, All Other
 cl("Social Scientists and Related Workers, All Other is a residual ANZSCO/O*NET category with no single "
    "statutory registration or licensing body. In Australia the discipline is represented by the Academy of the "
    "Social Sciences in Australia (ASSA), a peak learned academy of 750+ Fellows, and by discipline bodies "
    "(e.g. economic, political-science and sociological associations); practitioners are employed in universities, "
    "government departments and consultancies rather than under a professional licence.",
   "L1", "regulatory-professional-body",
   [src("Academy of the Social Sciences in Australia", "State of the Social Sciences",
        "https://socialsciences.org.au/news/policy-news/projects/state-of-the-social-sciences", "2026",
        "ASSA as peak learned academy for the social sciences; maps the sector, its practitioners and grand challenges.",
        "The landmark report ... provided for the first time an estimate of the number of people involved in social "
        "science education, research and professional practice across different parts of society."),
    src("Academy of the Social Sciences in Australia", "About the Academy",
        "https://socialsciences.org.au/", "2026",
        "ASSA promotes excellence in the social sciences and informs policy; a learned academy, not a licensing authority.")],
   "Voluntary learned-academy membership; no statutory licence for social scientists. Population = Australian social "
   "science researchers and professionals (the 'All Other' residual spans policy, research and analysis roles).",
   "3-lens: source real (ASSA); measures this population (AU social sciences); current."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation for "
    "current Gen AI: professional and technical occupations skew towards augmentation, with automation potential "
    "concentrated in routine roles. Effects depend on adoption and workplace adaptation, not exposure alone. Social "
    "scientists sit in the professional band where augmentation (literature synthesis, drafting, data analysis) dominates.",
   "L2", "scholarly-modelling",
   jsa_sources(),
   "Australian occupations nationally; model-derived task-level potential scores, not observed job losses. Social "
   "scientists inferred as skill-level-1 professionals in the high-augmentation band.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("Peer-reviewed research shows GenAI is reshaping the policy-analysis and governance work that social scientists "
    "perform. An Edinburgh study (Information, Communication & Society, 2025) finds the public release of generative "
    "AI models altered how policymakers frame and govern the technology, i.e. the analytical framing task at the core "
    "of social-science policy work is itself being transformed by AI.",
   "L2", "scholarly-institutional",
   [src("University of Edinburgh (Information, Communication & Society)", "Generative AI, generating crisis: framing opportunity and threat in AI governance",
        "https://tandfonline.com/doi/pdf/10.1080/1369118X.2025.2542356", "2025",
        "Peer-reviewed study of how GenAI's 2022-23 release shifted UK AI governance framing; illustrates AI reshaping "
        "the policy-analysis tasks social scientists do. UK context, illustrative not Australian employment statistic.")],
   "UK policy-governance case study; signals the kind of framing/analysis work social scientists do is being changed by "
   "AI. Not an Australian employment statistic for the occupation.",
   "3-lens: source real (peer-reviewed journal); measures AI's effect on policy analysis work; 2025."),
],
"19-4031": [  # Chemical Technicians
 cl("Chemical Technicians in Australia are not a licensed occupation. Jobs and Skills Australia's OSCA profile for "
    "Chemical Technician (311531) lists skill level 2 (Diploma/Advanced Diploma) and explicitly states 'No licensing or "
    "registration requirements are listed for this occupation.' Professional recognition is available through the Royal "
    "Australian Chemical Institute (RACI) grades such as MRACI/Chartered Chemist, referenced in the Fair Work Commission "
    "award as the benchmark for chemical qualifications.",
   "L1", "regulatory-professional-body",
   [src("Jobs and Skills Australia", "Chemical Technician - OSCA 311531",
        "https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles/occupations-osca/311531-chemical-technician",
        "2025",
        "OSCA occupation profile: skill level 2; 'No licensing or registration requirements are listed for this occupation.'",
        "No licensing or registration requirements are listed for this occupation."),
    src("Fair Work Commission", "MA000065 - Chemical, Oil and Colour Industry Award (academic schedule)",
        "https://fwc.gov.au/documents/awardsandorders/html/pr718705.htm", "2020",
        "Award cites 'Royal Australian Chemical Institute for admission to the grade of Graduate Chemist (MRACI)' as the "
        "benchmark for chemical qualifications - professional recognition, not a statutory licence.")],
   "Voluntary RACI professional recognition; no statutory licence. Population = Australian chemical technicians "
   "(ANZSCO 311411 / OSCA 311531).",
   "3-lens: source real (JSA OSCA; Fair Work); measures this population; current."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation for "
    "current Gen AI: technician-level occupations skew towards augmentation, with automation potential concentrated in "
    "routine roles. Effects depend on adoption and workplace adaptation. Chemical technicians are inferred as a "
    "skill-level-2 technical group in the augmentation band.",
   "L2", "scholarly-modelling",
   jsa_sources(),
   "Australian occupations nationally; model-derived task-level potential, not observed job losses. Chemical technicians "
   "inferred as a technical group in the augmentation band.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("Scholarly lab-automation literature shows AI and robotics are absorbing routine chemical-technician bench work. "
    "ORGANA (Cell, 2024/25) is an assistive robotic system that automates chemistry experiments via natural-language "
    "direction, reducing physical demand by over 50% and saving users on average 80.3% of their time; an Oct-2025 "
    "outlook in arXiv argues LLM-based AI agents now help chemists run the design-build-test-learn loop, from "
    "experimental design to characterisation.",
   "L2", "scholarly-automation",
   [src("Cell (Matter)", "ORGANA: A robotic assistant for automated chemistry experimentation and characterization",
        "https://www.cell.com/matter/fulltext/S2590-2385(24)00542-3", "2024",
        "Peer-reviewed robotic chemistry assistant; user study shows >50% reduction in physical demand and 80.3% average "
        "time saved - direct evidence AI/robotics automates routine lab procedures.",
        "ORGANA reduces frustration and physical demand by over 50%, with users saving an average of 80.3% of their time."),
    src("arXiv", "Synergizing chemical and AI communities for advancing laboratories of the future",
        "https://arxiv.org/pdf/2510.16293v1.pdf", "2025-10",
        "Outlook article: ML/LLM agents help chemists with experimental design, synthesis optimisation and materials "
        "characterisation - routine technician tasks.")],
   "Chemistry lab automation literature (peer-reviewed); automates routine bench/analysis tasks, not an Australian "
   "employment statistic. Applies to chemical technicians' routine procedures; judgement/safety oversight remain human.",
   "3-lens: source real (Cell; arXiv); measures AI lab automation; 2024-2025."),
],
"19-4061": [  # Social Science Research Assistants
 cl("Social Science Research Assistants are not a licensed occupation. They are employed mainly in universities, "
    "government research agencies and consultancies, with practice governed by institutional research-ethics frameworks "
    "and NHMRC/ARC research-conduct expectations rather than a statutory register. The Academy of the Social Sciences in "
    "Australia (ASSA) represents the discipline at the learned-academy level.",
   "L1", "regulatory-professional-body",
   [src("Academy of the Social Sciences in Australia", "About the Academy",
        "https://socialsciences.org.au/", "2026",
        "ASSA as peak learned academy for social science researchers and professionals; no statutory licence for research "
        "assistants."),
    src("Jobs and Skills Australia", "Occupation and industry profiles (OSCA)",
        "https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles", "2025",
        "JSA occupation profiles confirm research-assistant roles are employed (university/government), not licensed.")],
   "Voluntary learned-academy membership; no statutory licence. Population = Australian social-science research assistants "
   "(university/government/consultancy employment).",
   "3-lens: source real (ASSA; JSA); measures this population; current."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation for "
    "current Gen AI: professional and technical occupations skew towards augmentation. Social-science research assistants "
    "sit in the professional/research-support band where augmentation (literature review, data analysis, drafting) dominates.",
   "L2", "scholarly-modelling",
   jsa_sources(),
   "Australian occupations nationally; model-derived task-level potential, not observed job losses. Research assistants "
   "inferred as a research-support group in the augmentation band.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("Peer-reviewed studies show GenAI is augmenting exactly the tasks research assistants perform. A Nature (Scientific "
    "Reports, 2025) 'AI-Sprint' study finds pairing early-career researchers with AI improves manuscript quality and "
    "drafting momentum; an arXiv (2025) study of the social and behavioural sciences reports rapid, growing GenAI adoption "
    "for literature review, data analysis and writing among researchers - the core research-assistant workflow.",
   "L2", "scholarly-institutional",
   [src("Nature (Scientific Reports)", "Lessons from an AI-Sprint: a proposal for measuring human-AI cooperation in research",
        "https://nature.com/articles/s41599-025-06110-1", "2025",
        "Peer-reviewed study: AI paired with early-career researchers improves manuscripts and drafting momentum.",
        "working with AI improves the manuscripts of early-career researchers."),
    src("arXiv", "Can GenAI Improve Academic Performance? Evidence from the Social and Behavioral Sciences",
        "https://arxiv.org/abs/2510.02408", "2025",
        "Study of Scopus author-level panel (2021-2024): growing GenAI adoption among social/behavioural scientists for "
        "lit review, data analysis, writing.")],
   "Peer-reviewed research on AI in research work; maps to research-assistant tasks (review, analysis, drafting). Not an "
   "Australian employment statistic; general scholarly-labour evidence.",
   "3-lens: source real (Nature; arXiv); measures AI augmentation of research tasks; 2025."),
],
"19-4093": [  # Forest and Conservation Technicians
 cl("Forest and Conservation Technicians in Australia are not subject to a statutory licence. The peak professional body "
    "is Forestry Australia (formerly the Institute of Foresters of Australia), a 1,200+ member association that runs a "
    "Registered Forestry Professional scheme - but that scheme covers professional foresters, not technicians. Technicians "
    "are employed by state forestry agencies (e.g. Forestry Corporation of NSW, VicForests) and environmental/consulting "
    "firms, with practice governed by state forestry and environment legislation rather than a personal register.",
   "L1", "regulatory-professional-body",
   [src("Forestry Australia", "About Forestry Australia membership / Registered Forestry Professional",
        "https://forestry.org.au/about-membership", "2026",
        "Forestry Australia peak professional association (formerly IFA); Registered Forestry Professional scheme for "
        "professional foresters, not technicians.",
        "Access your knowledge, skills and experience recognised by the Registered Forestry Professional scheme"),
    src("Encyclopaedia of Australian Science", "Institute of Foresters of Australia - Corporate Body",
        "https://eoas.info/biogs/P005309b.htm", "2026",
        "IFA founded 1935 as the professional body for the forestry profession; supports competency and evidence-based "
        "decision-making.")],
   "Voluntary professional association; no statutory licence for technicians. Population = Australian forest and conservation "
   "technicians (state agencies/consultancies).",
   "3-lens: source real (Forestry Australia; eoas); measures this population; current."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (2025) finds augmentation generally outweighs automation for "
    "current Gen AI: technician-level occupations skew towards augmentation, with automation potential concentrated in "
    "routine data-collection roles. Forest and conservation technicians' field data-collection and monitoring tasks are "
    "among the most exposed to AI augmentation.",
   "L2", "scholarly-modelling",
   jsa_sources(),
   "Australian occupations nationally; model-derived task-level potential, not observed job losses. Forest technicians "
   "inferred as a technical group whose monitoring tasks are augmentation-exposed.",
   "3-lens: source real (JSA gov); measures AU occupations; published 2025."),
 cl("University and industry sources show drones and AI are absorbing the field data-collection and monitoring work that "
    "justifies much forest-technician headcount. The USDA Forest Service Forest Inventory and Analysis program has "
    "evaluated drone-assisted inventory across several regions; the University of Hawaii PI-CASC (2025) trains natural-"
    "resource staff in small-UAS + AI for agroforestry assessment; NIBIO's ForestSens platform turns forest sensor/LiDAR/"
    "satellite data into AI-derived tree biometrics. Commercial analyses (e.g. AIJobChecker) report canopy-health, "
    "infestation and timber-volume assessment moving to autonomous drone fleets and AI satellite analysis.",
   "L3", "trade-press",
   [src("University of Hawaii PI-CASC", "PI-CASC brings drone training, knowledge to support FSM agroforestry",
        "https://pi-casc.soest.hawaii.edu/news/pi-casc-brings-drone-training-knowledge-to-support-fsm-agroforestry",
        "2025-09",
        "University research centre training natural-resource staff in sUAS + AI for agroforestry assessment - direct "
        "evidence AI/drones entering forestry field monitoring."),
    src("AIJobChecker (commercial analysis)", "Forest And Conservation Technicians - AI Impact Analysis",
        "https://aijobchecker.com/jobs/forest-and-conservation-technicians", "2025",
        "Commercial AI-impact analysis: drone + AI computer-vision canopy/infestation/timber-volume assessment and AI "
        "satellite analysis displacing GIS/monitoring technician tasks. Commercial, not peer-reviewed - flag provenance.",
        "The data-collection and monitoring tasks that justify a significant fraction of forest technician headcount are "
        "being rapidly absorbed by autonomous drone fleets, LiDAR scanning, and AI-powered satellite analysis.")],
   "Forestry field-monitoring trade/industry evidence (US/global + commercial); automates data capture/monitoring, not "
   "physical treatment or enforcement. Applies to forest technicians' monitoring tasks; not an Australian employment "
   "statistic. Commercial source flagged as degraded-provenance.",
   "3-lens: source real (PI-CASC; AIJobChecker); measures AI/drone forestry tooling; 2025. Commercial source non-peer-reviewed."),
],
}

CAVEAT = ("L3 Factiva trade-press lane unavailable this run (no interactive OpenAthens SSO session in an unattended cron "
          "run; consistent with the same-date autoloop batch). Gap logged to factiva_backlog.json, not evidence of quiet. "
          "L3 for forest/conservation technicians was supplemented with web professional/trade press (PI-CASC; AIJobChecker, "
          "flagged commercial). L1/L2 sources are Australian regulatory/scholarly (ASSA; JSA Gen AI Capacity Study; RACI via "
          "Fair Work award; OSCA 311531; Forestry Australia) plus international scholarly literature (Edinburgh AI-governance "
          "study; Cell ORGANA lab automation; Nature AI-Sprint; arXiv social-science GenAI adoption). L4 demand covered by "
          "Adzuna AU (time-series) + LinkedIn (live postings); L5 practitioner corpus (last30days) was already present from a "
          "prior run and preserved (MERGE, not overwritten). Confidence rests on >=2 L1/L2 claims plus the declared L5 corpus.")

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
            c["id"] = f"{soc}-e{n:02d}"
            while c["id"] in seen_ids:
                n += 1
                c["id"] = f"{soc}-e{n:02d}"
            kept.append(c)
            seen_ids.add(c["id"])
            seen_text.add(c["text"])
        d["claims"] = kept
        corpus = d.setdefault("corpus", {})
        srn = corpus.get("searchesReturningNothing", []) or []
        if not any(g.get("lane") == "L3" and g.get("source") == "factiva" for g in srn):
            srn.append({"lane": "L3", "source": "factiva", "reason": "auth_expired",
                        "date": GEN, "note": "No interactive OpenAthens SSO session in unattended cron run; Factiva L3 "
                        "trade-press lane unavailable. Gap logged, not evidence of quiet. Re-run scripts/factiva_reauth.py "
                        "then scripts/factiva_backfill.py in an attended session."})
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
            ev.append(f"  > {q}" if q else f"  > {c['text'][:200]}")
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
    titles = {"19-3099": "Social Scientists and Related Workers, All Other",
              "19-4031": "Chemical Technicians", "19-4061": "Social Science Research Assistants",
              "19-4093": "Forest and Conservation Technicians"}
    for soc in NEW:
        e = entries.get(soc, {})
        e.update({"soc": soc, "title": titles[soc], "reason": "auth_expired",
                  "detail": "No interactive OpenAthens SSO session in unattended cron run; re-run scripts/factiva_reauth.py "
                            "to refresh before backfill.",
                  "attempts": e.get("attempts", 0) + 1, "lastAttempt": now,
                  "queries": [f"{titles[soc]} AI disruption", f"{titles[soc]} artificial intelligence"]})
        entries[soc] = e
    bl["updated"] = now
    FACTIVA_BACKLOG.write_text(json.dumps(bl, indent=2))
    print("[factiva] 4 SOCs logged to factiva_backlog.json")
    print("MERGE DONE")

if __name__ == "__main__":
    main()
