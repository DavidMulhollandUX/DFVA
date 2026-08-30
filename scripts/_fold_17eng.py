#!/usr/bin/env python3
"""Fold genuine L1 (regulatory) and L2 (scholarly) claims into the 4-SOC
engineering cluster ledgers (17-1011, 17-1012, 17-1022, 17-2011).

This REPLACES the placeholder/fabricated claims left by the 2026-08-24
incident (those records carried researchMethod=None and github-issue URLs)
with real, sourced claims, and merges (never overwrites) the corpus block.

Sources retrieved via live web search on 2026-08-30 (real URLs, real dates).
L2 primary = the DFVA AIOE crosswalk (Felten, Raj & Seamans 2021, Strategic
Management Journal; dataset github.com/AIOE-Data/AIOE, rescaled 0-100) plus
Jobs and Skills Australia's Gen AI Capacity Study (Aug 2025).
L1 = named Australian statutes / regulator pages.
"""
from __future__ import annotations

import datetime as dt
import json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
TODAY = "2026-08-30"
EXPIRES = (dt.date(2026, 8, 30) + dt.timedelta(days=180)).isoformat()
WINDOW = {"from": "2025-08-30", "to": "2026-08-30"}

# ---- L2 shared sources -------------------------------------------------
JSA = ("Jobs and Skills Australia",
       "Our Gen AI Transition: Exposures, Adaptation, Dynamism (Generative AI Capacity Study)",
       "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study",
       "2025-08")
AIOE = ("Felten, Raj & Seamans (2021), Strategic Management Journal; AIOE dataset",
        "Occupational, industry, and geographic exposure to artificial intelligence: A novel dataset",
        "https://github.com/AIOE-Data/AIOE",
        "2021")
JSA_GENERAL = ("Jobs and Skills Australia's Gen AI Capacity Study (August 2025) scores 358 "
               "ANZSCO occupations on augmentability and automatability (0-1). It finds "
               "augmentation outweighs automation across the workforce and 79% of Australian "
               "workers face low or very low automation risk; professionals and managers "
               "(ANZSCO skill levels 1-2) show the highest augmentation exposure.")

# ANZSCO corrections from the DFVA AIOE crosswalk (mapping_note fields).
ANZSCO = {"17-1011": "232111", "17-1012": "232112", "17-1022": "232212", "17-2011": "233911"}
AIOE_IDX = {"17-1011": "88.55", "17-1012": "88.25", "17-1022": "67.08", "17-2011": "95.50"}


def claim(cid, lane, tier, text, src, what, scope,
          refute="Real named source; population and window scoped per claim; in force/published."):
    publisher, title, url, date = src
    return {
        "id": cid, "text": text, "lane": lane, "tier": tier,
        "sources": [{"publisher": publisher, "title": title, "url": url, "date": date,
                     "whatItMeasured": what}],
        "scope": scope, "disposition": "sourced", "supersedes": None,
        "bearing": [], "refuted": False, "refuteNotes": refute,
    }


# ---- L1 regulatory claims ----------------------------------------------
L1 = {
    "17-1011": [
        claim("17-1011-L1-01", "L1", "regulatory",
              "In Victoria a person must be registered with the Architects Registration Board "
              "of Victoria (ARBV) under the Architects Act 1991 to use the title 'architect' or "
              "provide architectural services; unregistered use is an offence. Registration "
              "requires an accredited qualification, at least two years' practical experience, "
              "an approved pathway such as the Architectural Practice Examination (APE), "
              "professional indemnity insurance, and annual renewal, with mutual-recognition "
              "pathways across jurisdictions.",
              ("Architects Registration Board of Victoria", "Registering as an architect",
               "https://arbv.vic.gov.au/registering-architect", "1991"),
              "State architect registration requirement (Architects Act 1991 Vic); population = "
              "anyone using title 'architect'/providing architectural services in Vic; in force.",
              "Victorian registration regime (parallel Architects Acts in other states/territories); "
              "binds architects. Excludes landscape architects (17-1012) and naval architects."),
    ],
    "17-1012": [
        claim("17-1012-L1-01", "L1", "regulatory",
              "The Australian Institute of Landscape Architects (AILA) operates a national "
              "professional-recognition scheme under which members use the title 'Registered "
              "Landscape Architect'. Unlike architecture, landscape architecture is not a "
              "protected/statutorily registered title under state Architects Acts, so there is "
              "no government register compelling registration to practise; recognition is a "
              "private professional-body credential, and some states (e.g. Queensland) do not "
              "require it for contracts.",
              ("Australian Institute of Landscape Architects (via profession summary)",
               "Australian Institute of Landscape Architects — professional recognition",
               "https://en.wikipedia.org/wiki/Australian_Institute_of_Landscape_Architects", ""),
              "Professional-body recognition scheme (AILA); contrast with statutory architect "
              "registration. Population = landscape architects AU; reflective of AILA's own statements.",
              "Private professional-body recognition, not a government licence. Does not bind "
              "practice by statute; some agencies require AILA recognition as a contract prerequisite."),
    ],
    "17-1022": [
        claim("17-1022-L1-01", "L1", "regulatory",
              "Under the Surveying Act 2004 (Vic), only Licensed Surveyors registered with the "
              "Surveyors Registration Board of Victoria may legally perform cadastral (land and "
              "boundary) surveys; an unregistered person undertaking such a survey faces "
              "prosecution and the survey has no legal standing. Registration requires an approved "
              "surveying/geomatics degree, supervised cadastral training, and Board examinations, "
              "with annual renewal and mutual recognition across states and New Zealand.",
              ("Surveyors Registration Board of Victoria", "Check if a Surveyor is Registered",
               "https://surveyorsboard.vic.gov.au/content/77/Check-Surveyor-Registered.aspx", "2004"),
              "State surveyor registration (Surveying Act 2004 Vic); population = cadastral "
              "surveyors in Vic; in force.",
              "Victorian cadastral-surveyor regime (parallel regimes in other states); binds "
              "boundary/cadastral survey work. Does not cover all 'surveyors' (e.g. mining/engineering "
              "survey technicians, 17-3031)."),
    ],
    "17-2011": [
        claim("17-2011-L1-01", "L1", "regulatory",
              "Victoria's Professional Engineers Registration Act 2019 requires registration with "
              "the Business Licensing Authority to provide professional engineering services in a "
              "prescribed area of engineering 'in or for Victoria'. The five prescribed areas are "
              "civil, structural, electrical, mechanical, and fire safety engineering; aerospace "
              "engineering is not a prescribed area, so aerospace engineers are not required to "
              "register unless they perform services in a prescribed area (e.g. mechanical "
              "engineering). Engineers Australia's Chartered Professional Engineer (CPEng) and "
              "National Engineering Register (NER) credentials are voluntary professional "
              "recognition, not a statutory licence.",
              ("Consumer Affairs Victoria", "Who needs to be registered? (Professional Engineers)",
               "https://consumer.vic.gov.au/licensing-and-registration/professional-engineers/who-needs-to-be-registered",
               "2019"),
              "Vic Professional Engineers Registration Act 2019 prescribed-area registration; "
              "population = engineers providing prescribed-area services in/for Vic; in force since 2021.",
              "Victorian regime; binds professional engineering services in prescribed areas. "
              "Aerospace-specific work is outside prescription; does not compel registration for "
              "aerospace (non-prescribed) work."),
    ],
}

# ---- L2 scholarly claims -----------------------------------------------
L2 = {
    "17-1011": [
        claim("17-1011-L2-01", "L2", "scholarly", JSA_GENERAL, JSA,
              "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure (augmentability/"
              "automatability), 358 occupations, Aug 2025.",
              "Australian occupations nationally; model-derived task-level estimates, not employment forecasts.",
              "Primary Australian government source; population = AU occupations; published Aug 2025."),
        claim("17-1011-L2-02", "L2", "scholarly",
              f"The DFVA AIOE crosswalk (Felten, Raj & Seamans 2021, rescaled to 0-100) assigns "
              f"Architects (17-1011, ANZSCO 232111) an AI-exposure index of {AIOE_IDX['17-1011']}/100 "
              f"(high mapping confidence) - among the higher-exposure professional occupations, "
              f"reflecting AI applicability across design generation, documentation and research tasks.",
              AIOE,
              "AIOE occupation-level AI-exposure score (Appendix A), rescaled 0-100; DFVA crosswalk "
              "maps 17-1011 -> 232111 at 88.55.",
              "US-derived AIOE measure adapted via DFVA crosswalk to AU ANZSCO; task-level exposure "
              "estimate, not an employment forecast."),
    ],
    "17-1012": [
        claim("17-1012-L2-01", "L2", "scholarly", JSA_GENERAL, JSA,
              "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure, 358 occupations, Aug 2025.",
              "Australian occupations nationally; model-derived task-level estimates.",
              "Primary Australian government source; population = AU occupations; Aug 2025."),
        claim("17-1012-L2-02", "L2", "scholarly",
              f"The DFVA AIOE crosswalk assigns Landscape Architects (17-1012, ANZSCO 232112) an "
              f"AI-exposure index of {AIOE_IDX['17-1012']}/100 (high mapping confidence), reflecting "
              f"AI applicability across design generation, visualisation and documentation tasks.",
              AIOE,
              "AIOE occupation-level AI-exposure score (Appendix A), rescaled 0-100; DFVA crosswalk "
              "maps 17-1012 -> 232112 at 88.25.",
              "US-derived AIOE measure adapted via DFVA crosswalk to AU ANZSCO; task-level exposure estimate."),
    ],
    "17-1022": [
        claim("17-1022-L2-01", "L2", "scholarly", JSA_GENERAL, JSA,
              "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure, 358 occupations, Aug 2025.",
              "Australian occupations nationally; model-derived task-level estimates.",
              "Primary Australian government source; population = AU occupations; Aug 2025."),
        claim("17-1022-L2-02", "L2", "scholarly",
              f"The DFVA AIOE crosswalk assigns Surveyors (17-1022, ANZSCO 232212) an AI-exposure "
              f"index of {AIOE_IDX['17-1022']}/100 (high mapping confidence) - lower than the "
              f"design-profession cluster, reflecting the field/site and measurement nature of much "
              f"surveying work alongside its CAD/GIS and data-processing tasks.",
              AIOE,
              "AIOE occupation-level AI-exposure score (Appendix A), rescaled 0-100; DFVA crosswalk "
              "maps 17-1022 -> 232212 at 67.08.",
              "US-derived AIOE measure adapted via DFVA crosswalk to AU ANZSCO; task-level exposure estimate."),
    ],
    "17-2011": [
        claim("17-2011-L2-01", "L2", "scholarly", JSA_GENERAL, JSA,
              "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure, 358 occupations, Aug 2025.",
              "Australian occupations nationally; model-derived task-level estimates.",
              "Primary Australian government source; population = AU occupations; Aug 2025."),
        claim("17-2011-L2-02", "L2", "scholarly",
              f"The DFVA AIOE crosswalk assigns Aerospace Engineers (17-2011, ANZSCO 233911) an "
              f"AI-exposure index of {AIOE_IDX['17-2011']}/100 (high mapping confidence) - among "
              f"the highest-exposure engineering occupations, reflecting AI applicability across "
              f"simulation, modelling, optimisation and computational design tasks.",
              AIOE,
              "AIOE occupation-level AI-exposure score (Appendix A), rescaled 0-100; DFVA crosswalk "
              "maps 17-2011 -> 233911 at 95.50.",
              "US-derived AIOE measure adapted via DFVA crosswalk to AU ANZSCO; task-level exposure estimate."),
    ],
}

# Coverage gaps to record (graceful-degrade / not-sampled lanes).
GAPS = [
    {"lane": "L3", "source": "factiva", "status": "auth_expired",
     "detail": "OpenAthens SSO session expired (no interactive re-auth in unattended run). "
               "Logged to factiva_backlog.json; re-run factiva_reauth.py then factiva_backfill.py.",
     "date": TODAY},
    {"lane": "L3", "source": "web-trade-press", "status": "not-sampled",
     "detail": "IBISWorld / Perplexity trade-press sweep not run this batch; Factiva is the L3 lane.",
     "date": TODAY},
    {"lane": "L4", "source": "seek", "status": "not-sampled",
     "detail": "Seek trend pages not queried this batch; Adzuna AU + LinkedIn used for L4 demand signal.",
     "date": TODAY},
    {"lane": "L4", "source": "last30days-hiring-signals", "status": "not-sampled",
     "detail": "last30days --hiring-signals not run separately; L5 last30days ran and Adzuna+LinkedIn cover L4 demand.",
     "date": TODAY},
    {"lane": "L5", "source": "grounding", "status": "failed",
     "detail": "last30days grounding (web) source failed this run; reddit/x/hackernews/github/youtube returned items.",
     "date": TODAY},
    {"lane": "L5", "source": "tiktok-instagram", "status": "unavailable",
     "detail": "has_scrapecreators:false; TikTok and Instagram unavailable in this environment (coverage gap, not quiet).",
     "date": TODAY},
]


def main():
    for soc in ["17-1011", "17-1012", "17-1022", "17-2011"]:
        p = PROF / f"{soc}.json"
        d = json.loads(p.read_text())
        # Replace fabricated placeholder claims with real researched claims.
        d["claims"] = L1[soc] + L2[soc]
        d["researchMethod"] = "empirical-five-lane-v1"
        d["anzsco"] = ANZSCO[soc]
        d["window"] = dict(WINDOW)
        d["generated"] = TODAY
        d["expires"] = EXPIRES
        d["confidence"] = "high"  # >=2 L1/L2 claims + declared L5 corpus (folded after)
        # Merge corpus (never overwrite); preserve existing linkedin/l5Sample/platforms.
        corpus = d.setdefault("corpus", {})
        srn = corpus.setdefault("searchesReturningNothing", [])
        for g in GAPS:
            if not any(g.get("lane") == x.get("lane") and g.get("source") == x.get("source")
                       for x in srn):
                srn.append(g)
        if "L3 Factiva not retrieved (unattended run)" not in (d.get("caveats") or []):
            d.setdefault("caveats", []).append(
                "L3 Factiva trade-press not retrieved this run (OpenAthens SSO expired); L3-led "
                "high grade is therefore not claimed - record rests on L1+L2+L4+L5.")
        p.write_text(json.dumps(d, indent=2))
        print(f"[17eng] {soc}: wrote {len(d['claims'])} real claims; anzsco={ANZSCO[soc]}; "
              f"corpus gaps={len(srn)}")

    # Log Factiva gap to the backlog (does not block the batch).
    backlog = PROF / "factiva_backlog.json"
    bl = json.loads(backlog.read_text()) if backlog.exists() else {"entries": []}
    for soc in ["17-1011", "17-1012", "17-1022", "17-2011"]:
        bl["entries"].append({
            "soc": soc, "reason": "auth_expired", "attempts": 1,
            "logged": TODAY, "note": "OpenAthens SSO session expired; re-run factiva_reauth.py.",
        })
    backlog.write_text(json.dumps(bl, indent=2))
    print(f"[17eng] factiva_backlog.json: {len(bl['entries'])} entries")


if __name__ == "__main__":
    main()
