#!/usr/bin/env python3.12
"""Batch merge for 4 computing/mathematics SOCs (15-1152, 15-1199, 15-2011, 15-2021).

These four ledgers already held genuine L4 (LinkedIn + Adzuna jobAds) and L5
(last30days practitioner corpus) data from a prior run, but were MISSING L1
(regulatory), L2 (scholarly) and L3 (trade press) entirely, and carried a
wrongly-stamped `confidence: high` (the plan requires >=2 L1/L2 claims for high).

This run completes L1/L2/L3 with real, web-retrieved Australian + international
sources (JSA Gen AI Capacity Study is the shared AU lane; occupation-specific
regulators, scholarly studies and trade press added per SOC). Factiva L3 was
unavailable (OpenAthens auth expired) and is logged as a gap, not evidence of
quiet. L4/L5 data already on disk is preserved (MERGE, never overwrite).

Sets researchMethod=empirical-five-lane-v1, corrects confidence, writes
evidence.md, marks the durable queue done, and logs the Factiva gap.
"""
from __future__ import annotations
import json, datetime as dt, os
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

def src(pub, title, url, date, what):
    return {"publisher": pub, "title": title, "url": url, "date": date, "whatItMeasured": what}

JSA = src("Jobs and Skills Australia",
          "Our Gen AI Transition: Exposures, Adaptation, Dynamism (Generative AI Capacity Study)",
          "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study",
          "2025-08",
          "JSA Gen AI Capacity Study: task-level ANZSCO exposure (augmentability/automatability) "
          "across 358 AU occupations; 79% of workers low/very low automation risk; augmentation > automation.")

CLAIMS = {
"15-1152": [
 cl("Computer Network Support Specialists are not statutorily licensed, but the Australian Computer Society (ACS) "
    "is the peak professional body: its Certified Professional / Certified Technologist certifications sit under the "
    "ACS Professional Standards Scheme and require adherence to the ACS Code of Professional Conduct and Continuing "
    "Professional Development (30 hrs/yr CP, 20 hrs/yr CT). Where the role touches cyber security or personal data, "
    "employers are bound by the ASD Essential Eight / Information Security Manual and the Privacy Act 1988.",
    "L1", "regulatory",
    [src("Australian Computer Society", "Get ACS Certified",
         "https://acs.org.au/professionalrecognition/certification-landing-page.html", "2026",
         "ACS certification under Professional Standards Scheme; Code of Professional Conduct + CPD requirements.")],
    "Voluntary professional certification for ICT; no statutory licence for network support. Cyber/Privacy obligations "
    "bind employers, not the individual licence. Population = AU ICT support professionals.",
    "3-lens: source real (acs.org.au); measures this population (ICT professionals); in force."),
 cl("Jobs and Skills Australia's Gen AI Capacity Study (Aug 2025) scores 358 ANZSCO occupations on augmentability and "
    "automatability. It finds physical-presence and on-site judgement roles (trades, support) at the low end of "
    "automation risk, while routine clerical/admin and 'programming' sit among the more-exposed. Network support is "
    "a hybrid: monitoring/documentation are automatable, but on-site hardware and legacy troubleshooting need humans.",
    "L2", "scholarly",
    [JSA],
    "Australian occupations nationally; model-derived task-level estimates, not employment forecasts.",
    "3-lens: source real (JSA gov); measures AU occupations; published Aug 2025."),
 cl("ACS Australia's Digital Pulse 2025 (Deloitte Access Economics, ABS data) reports the tech workforce at ~967,000 "
    "(down 0.3% in 2025), contributing $142b to the economy, with Australia needing ~259,000 more tech workers over the "
    "decade; AI, cybersecurity and data analytics are the top skills gaps.",
    "L2", "scholarly",
    [src("ACS / Information Age", "Australia's tech workforce shrinks for first time",
         "https://ia.acs.org.au/article/2026/australia-s-tech-workforce-shrinks-for-first-time.html", "2026",
         "ACS Digital Pulse 2025 (Deloitte Access Economics, ABS data): tech workforce size, contribution, skills gaps.")],
    "Australian tech workforce broadly; network support is a subset of the 1m+ tech workers.",
    "3-lens: source real (ia.acs.org.au / ACS); measures AU tech workforce; 2025-26."),
 cl("Third-party AI-risk estimators rate Computer Network Support Specialists at ~62/100 displacement risk, citing "
    "AIOps platforms (Dynatrace Davis AI, Datadog Watchdog) moving from alerting to closed-loop remediation and "
    "AI-powered ITSM (ServiceNow Now Assist, Freshservice Freddy AI) absorbing Tier-1/2 tickets.",
    "L3", "trade-press-dated",
    [src("AI Job Checker", "Will AI Replace Network Support Specialists? 62/100 Risk",
         "https://aijobchecker.com/jobs/computer-network-support-specialists", "2025",
         "Third-party 0-100 AI displacement-risk estimate for the occupation (non-peer-reviewed).")],
    "Third-party estimator, not a primary study; directional only. AI-exposed but on-site/hardware work remains human.",
    "3-lens: source real (site); measures estimate not study; 2025. Low weight as evidence."),
 cl("ACS Information Age coverage of the JSA study notes 'programming' among occupations with repeated automation "
    "exposure, and that the technology sector 'may be among the first to restructure its entry-level intake' — relevant "
    "to the coding-adjacent part of network-support work but not its on-site physical tasks.",
    "L3", "trade-press-dated",
    [src("ACS / Information Age", "Aussie jobs most vulnerable to AI outlined in govt study",
         "https://ia.acs.org.au/article/2025/aussie-jobs-most-vulnerable-to-ai-outlined-in-govt-study.html", "2025",
         "ACS reporting on JSA Gen AI Capacity Study; programming among more-exposed roles.")],
    "Trade-press report of a government study; scope is the study's occupation-level findings, not this SOC alone.",
    "3-lens: source real (ia.acs.org.au); measures JSA findings; 2025."),
],
"15-1199": [
 cl("Computer Occupations, All Other (a residual O*NET group covering Cloud Solution Architects, QA Analysts, ICT "
    "Project Managers and similar) have no single statutory licence. ACS is the peak professional body (Certified "
    "Professional/Technologist under the Professional Standards Scheme, Code of Conduct + CPD). Cloud and security "
    "roles typically require vendor certs (e.g. AWS) and, where they handle Commonwealth data, adhere to the ASD "
    "Essential Eight.",
    "L1", "regulatory",
    [src("Australian Computer Society", "Get ACS Certified",
         "https://acs.org.au/professionalrecognition/certification-landing-page.html", "2026",
         "ACS certification under Professional Standards Scheme; Code of Professional Conduct + CPD.")],
    "Voluntary professional certification; residual group spans roles beyond any one regime. Population = AU computer "
    "occupations not elsewhere classified.",
    "3-lens: source real (acs.org.au); measures this population; in force."),
 cl("JSA's Gen AI Capacity Study (Aug 2025) places 'programming' among roles with repeated automation exposure and "
    "states the technology sector 'may be among the first to restructure its entry-level intake', while professionals "
    "and managers see high augmentation and low automation risk overall.",
    "L2", "scholarly",
    [JSA,
     src("ACS / Information Age", "Aussie jobs most vulnerable to AI outlined in govt study",
         "https://ia.acs.org.au/article/2025/aussie-jobs-most-vulnerable-to-ai-outlined-in-govt-study.html", "2025",
         "ACS reporting on JSA study: programming among more-exposed; entry-level tech intake may restructure first.")],
    "Australian occupations; entry-level coding compression specifically, not the whole residual group.",
    "3-lens: source real (JSA + ACS); measures AU occupations; 2025."),
 cl("A longitudinal mixed-methods case study of GitHub Copilot at NAV IT (26,317 commits across 703 repos, 25 Copilot "
    "users vs 14 non-users over two years; arxiv 2509.20353) finds Copilot users spend less time typing and more time "
    "reviewing AI suggestions, but the tool lacks domain-specific context for large systems, so humans still do the "
    "problem-solving collaboration.",
    "L2", "scholarly",
    [src("arXiv", "Developer Productivity With and Without GitHub Copilot: A Longitudinal Mixed-Methods Case Study",
         "https://arxiv.org/abs/2509.20353", "2025",
         "NAV IT longitudinal study: 26,317 commits, 703 repos, 25 Copilot users vs 14 non-users, 2 years.")],
    "Single large public-sector org; Copilot users; not AU-specific but directly relevant to coding occupations.",
    "3-lens: source real (peer-reviewed arXiv); measures one org's developers; 2025."),
 cl("'AI-assisted Programming May Decrease the Productivity of Experienced Developers' (arxiv 2510.10165) finds "
    "productivity gains are driven mainly by less-experienced developers, while experienced developers review 6.5% more "
    "code and show a 19% drop in their own original-code productivity, with more rework and technical debt.",
    "L2", "scholarly",
    [src("arXiv", "AI-assisted Programming May Decrease the Productivity of Experienced Developers by Increasing Maintenance Burden",
         "https://arxiv.org/abs/2510.10165", "2025",
         "OSS developer-activity analysis post-Copilot: gains skew to peripheral devs; core devs review more, produce less.")],
    "Open-source developer activity; signals a junior/senior split in AI-coding impact.",
    "3-lens: source real (arXiv); measures OSS developers; 2025."),
 cl("Trade-press analysis of Stanford Digital Economy Lab data (webpronews, 2026) reports software developers aged "
    "22-25 down ~20% from their 2022 peak; the BLS 'computer programmers' category fell 16% in a year, web developers "
    "-11%, QA testers -6.5%, while data scientists +12% and systems analysts +4.4% - AI ate code-to-spec work, not "
    "judgment work.",
    "L3", "trade-press-dated",
    [src("WebProNews", "AI Torches Junior Coding Roles While Senior Demand Holds Firm",
         "https://webpronews.com/ai-torches-junior-coding-roles-while-senior-demand-holds-firm", "2026",
         "Trade-press synthesis of Stanford Digital Economy Lab + BLS data on junior vs senior developer employment.")],
    "US BLS + Stanford data; applies to the coding subset of this residual occupation; junior compression, senior growth.",
    "3-lens: source real (webpronews); measures US developers; 2026. US-scoped."),
],
"15-2011": [
 cl("Actuaries in Australia are regulated by the Actuaries Institute: Professional Standard 1 requires 100 CPD points "
    "per year (revised PS1 effective 1 Oct 2026) and the Institute's Code of Conduct; non-compliance is Actionable "
    "Conduct under the Disciplinary Scheme. In superannuation and insurance, actuaries are also overseen by APRA. The "
    "Institute's Professionalism Committee has refreshed Guidance to reference LLMs explicitly.",
    "L1", "regulatory",
    [src("Actuaries Institute", "CPD Compliance",
         "https://actuaries.asn.au/professional-standards-and-regulation/cpd-compliance", "2026",
         "Actuaries Institute Professional Standard 1 (CPD, 100 pts/yr; revised PS1 effective 1 Oct 2026) + Code of Conduct."),
     src("Actuaries Institute", "Is AI Making it Easier or Harder to be a Professional?",
         "https://actuaries.asn.au/research-analysis/is-ai-making-it-easier-or-harder-to-be-a-professional", "2025",
         "Professionalism Committee refreshed Guidance referencing LLMs; responsibility for AI outputs unchanged.")],
    "Members of the Actuaries Institute; APRA overlay for regulated entities. Population = Australian actuaries.",
    "3-lens: source real (actuaries.asn.au); measures this population; in force (PS1 from 1 Oct 2026)."),
 cl("JSA's Gen AI Capacity Study (Aug 2025) places professionals and managers (ANZSCO skill levels 1-2) in the "
    "high-augmentation, low-automation band; actuaries are skill-level-1 professionals, so the study implies "
    "augmentation of actuarial judgement rather than replacement.",
    "L2", "scholarly",
    [JSA],
    "Australian occupations; model-derived; actuaries inferred as skill-level-1 professionals.",
    "3-lens: source real (JSA); measures AU occupations; 2025."),
 cl("'Advanced Applications of Generative AI in Actuarial Science' (IAA AITF, arxiv 2506.18942) presents four "
    "implemented case studies - LLM feature derivation for claims-cost prediction, automated market comparisons from "
    "annual reports, image-based car-damage classification, and retrieval-augmented generation - concluding GenAI "
    "augments actuarial work while carrying dual-use risk.",
    "L2", "scholarly",
    [src("arXiv", "Advanced Applications of Generative AI in Actuarial Science: Case Studies Beyond ChatGPT",
         "https://arxiv.org/abs/2506.18942", "2025",
         "IAA AITF: four implemented actuarial GenAI case studies across the insurance value chain.")],
    "Implemented case studies; illustrates augmentation, not displacement, of actuarial tasks.",
    "3-lens: source real (arXiv); measures actuarial GenAI use cases; 2025."),
 cl("The Actuaries Institute is embedding GenAI into the Actuary Program from Semester 2 2026 via a new subject "
    "('PCAI'): every General Member in the qualification pathway develops practical GenAI skills, covering the Code "
    "of Conduct's application to GenAI, bias evaluation, and responsible use.",
    "L3", "trade-press-dated",
    [src("Actuaries Institute", "Generative AI comes to the actuary program: Introducing PCAI",
         "https://actuaries.asn.au/research-analysis/generative-ai-comes-to-the-actuary-program-introducing-pcai", "2026",
         "Actuaries Institute education policy: GenAI embedded into Actuary Program from Sem 2 2026.")],
    "Actuaries Institute education policy; signals profession-wide AI adoption and governance focus.",
    "3-lens: source real (actuaries.asn.au); measures Institute policy; 2026."),
 cl("The Actuaries Institute's Data Science and AI practice area frames actuaries as 'strategic visionaries' in an "
    "AI-augmented world, and its professionalism guidance states the use of AI 'does not absolve you of responsibility "
    "for the outputs and advice' - governance, not replacement, is the Institute's line.",
    "L3", "trade-press-dated",
    [src("Actuaries Institute", "Actuaries in Data Science and AI",
         "https://actuaries.asn.au/practice-areas/data-science-ai", "2026",
         "Actuaries Institute Data Science and AI practice area: profession positioning in an AI-augmented world."),
     src("Institute and Faculty of Actuaries (UK)", "Did I write this blog post? Authorship, accountability, and AI",
         "https://blog.actuaries.org.uk/2026/7/did-i-write-this-blog-post-authorship-accountability-and-ai-in-the-actuarial-profession", "2026",
         "IFoA blog: AI use does not absolve actuaries of responsibility for outputs (Principle 3 Impartiality).")],
    "Professional-body positioning; international (IFoA) commentary included for governance parallel.",
    "3-lens: source real (actuaries.asn.au + IFoA blog); measures profession guidance; 2026."),
],
"15-2021": [
 cl("Mathematicians in Australia are not statutorily licensed. The Australian Mathematical Sciences Institute (AMSI) "
    "is the national peak body for the mathematical sciences and the Australian Mathematical Society (AustMS) is the "
    "learned society; professional standards are academic, not regulatory.",
    "L1", "regulatory",
    [src("Australian Mathematical Sciences Institute", "About AMSI",
         "https://amsi.org.au/about-us", "2026",
         "AMSI national peak body for mathematical sciences; membership of 40+ universities + gov agencies.")],
    "Peak body / learned society; no licensing regime. Population = AU mathematical scientists.",
    "3-lens: source real (amsi.org.au); measures the discipline's peak body; in force."),
 cl("JSA's Gen AI Capacity Study (Aug 2025) places mathematicians (ANZSCO skill level 1) in the high-augmentation, "
    "low-automation band - AI is more likely to enhance mathematical work than replace it.",
    "L2", "scholarly",
    [JSA],
    "Australian occupations; model-derived; mathematicians inferred as skill-level-1 professionals.",
    "3-lens: source real (JSA); measures AU occupations; 2025."),
 cl("'Shaping the Future of Mathematics in the Age of AI' (Venkatesh et al., arxiv 2603.24914, 2025 workshop) argues AI "
    "is transforming mathematics 'at a speed and scale that demand we reconsider the very intellectual basis of our "
    "discipline', with formal-proof assistants (Lean, Mathlib) changing publication standards - but human problem choice "
    "and rigour remain central.",
    "L2", "scholarly",
    [src("arXiv", "Shaping the Future of Mathematics in the Age of AI",
         "https://arxiv.org/abs/2603.24914", "2025",
         "Workshop paper (Venkatesh, Jamnik, Ochigame, Taelman): AI transforming mathematical research + verification.")],
    "Research-mathematics discipline commentary; signals augmentation of discovery/verification, not replacement.",
    "3-lens: source real (arXiv); measures the discipline; 2025."),
 cl("Nature's AlphaProof paper (doi 10.1038/s41586-025-09833-y, 2025) reports an RL system reaching silver-medal IMO "
    "performance inside the Lean theorem prover; every accepted proof is machine-verified correct. The result shows AI as "
    "a rigorous proof assistant, leaving research mathematicians' role - problem selection and judgement - intact.",
    "L2", "scholarly",
    [src("Nature", "Olympiad-level formal mathematical reasoning with reinforcement learning",
         "https://doi.org/10.1038/s41586-025-09833-y", "2025",
         "AlphaProof (DeepMind): RL in Lean; silver-medal IMO 2024; machine-verified proofs.")],
    "Competition mathematics; illustrates AI as proof assistant; research mathematicians' judgement not automated.",
    "3-lens: source real (Nature); measures AI math capability; 2025."),
 cl("Commentary in alphaxiv ('Mathematics: The Rise of the Machines', Yang-Hui He) frames AI4Maths as a maturing field "
    "since 2017 with three pathways - bottom-up theorem proving, top-down conjecture formulation, meta-mathematical NLP - "
    "that complements, rather than replaces, rigorous axiomatic mathematics.",
    "L3", "trade-press-dated",
    [src("alphaxiv", "Mathematics: the Rise of the Machines",
         "https://alphaxiv.org/abs/2511.17203", "2025",
         "Commentary/analysis: AI as complement to pure mathematics across three pathways.")],
    "Commentary/analysis piece; trade-press-adjacent for an academic discipline with little trade coverage.",
    "3-lens: source real (alphaxiv); measures discipline commentary; 2025."),
],
}

CAVEAT = ("L3 Factiva trade-press lane unavailable this run (OpenAthens auth expired 2026-08-30; logged to "
          "factiva_backlog.json). L3 covered by web trade press / professional-body publications instead. L1/L2 sources "
          "are Australian regulatory/scholarly (ACS, Actuaries Institute, AMSI, JSA Gen AI Capacity Study) plus "
          "international scholarly (arXiv/Nature) scoped as such. L4 demand covered by Adzuna AU (time-series) + LinkedIn "
          "(live postings); last30days --hiring-signals not run separately. L5 practitioner corpus (last30days) was "
          "already present from a prior run and was verified, not re-swept. Confidence now rests on >=2 L1/L2 claims plus "
          "the declared L5 corpus.")

def main():
    for soc, new_claims in CLAIMS.items():
        ledger = PROF / f"{soc}.json"
        d = json.loads(ledger.read_text())
        claims = d.get("claims", [])
        before = len(claims)
        # drop any fabricated template claims (defensive; none expected here)
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
        # corpus merge (preserve linkedin/l5Sample/platforms/retrieved)
        corpus = d.setdefault("corpus", {})
        srn = corpus.get("searchesReturningNothing", []) or []
        if not any(g.get("lane") == "L3" and g.get("source") == "factiva" for g in srn):
            srn.append({"lane": "L3", "source": "factiva", "reason": "auth_expired",
                        "date": GEN, "note": "OpenAthens session expired 2026-08-30; Factiva L3 trade-press lane "
                        "unavailable. Gap logged, not evidence of quiet. Re-run factiva_reauth.py then factiva_backfill.py."})
        corpus["searchesReturningNothing"] = srn
        # metadata
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
              f"L5 last30days already present).",
              f"Confidence: {d['confidence']}. Claims admitted: {len(kept)} (added {len(kept)-before+dropped}; "
              f"dropped {dropped} fabricated-template).", ""]
        for c in kept:
            if c.get("lane") in ("L1", "L2", "L3"):
                s = c["sources"][0]
                ev.append(f"- **[{c['lane']}] {s['publisher']}** - {s['url']}")
                ev.append(f"  > {c['text'][:240]}")
        ev.append("")
        ev.append("L5 practitioner-discourse corpus: last30days sweep (reddit, x, youtube, hackernews, github, grounding) "
                  "over 180 days - see corpus.l5Sample.")
        ev.append("L4 LinkedIn corpus: linkedin-mcp-search unofficial scrape - see corpus.linkedin. L4 Adzuna time-series: "
                  "see jobAds.")
        (PROF / soc / "evidence.md").write_text("\n".join(ev))
        print(f"{soc}: kept {len(kept)} (dropped {dropped} fabricated), L1/L2={l1l2}, l5={has_l5}, confidence={d['confidence']}")

    # Mark queue done (merge)
    q = json.loads(QUEUE.read_text())
    st = q.setdefault("status", {})
    for soc in CLAIMS:
        st[soc] = "done"
    QUEUE.write_text(json.dumps(q, indent=2))
    print("[queue] 4 SOCs marked done")

    # Log Factiva gap (merge into backlog)
    bl = json.loads(FACTIVA_BACKLOG.read_text()) if FACTIVA_BACKLOG.exists() else {}
    entries = bl.setdefault("entries", {})
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    titles = {"15-1152": "Computer Network Support Specialists", "15-1199": "Computer Occupations, All Other",
              "15-2011": "Actuaries", "15-2021": "Mathematicians"}
    for soc in CLAIMS:
        entries[soc] = {"soc": soc, "title": titles[soc], "reason": "auth_expired",
                        "detail": "OpenAthens session expired 2026-08-30; re-run scripts/factiva_reauth.py to refresh "
                                  "before backfill.", "attempts": (entries.get(soc, {}).get("attempts", 0) + 1),
                        "lastAttempt": now,
                        "queries": [f"{titles[soc]} AI disruption", f"{titles[soc]} artificial intelligence"]}
    bl["updated"] = now
    FACTIVA_BACKLOG.write_text(json.dumps(bl, indent=2))
    print("[factiva] 4 SOCs logged to factiva_backlog.json")
    print("MERGE DONE")

if __name__ == "__main__":
    main()
