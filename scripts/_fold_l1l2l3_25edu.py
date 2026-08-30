#!/usr/bin/env python3.12
"""Fold genuine L1 (regulatory), L2 (scholarly) and L3 (trade press) claims into the
four school-teacher ledgers (25-2011/2021/2022/2031) for the DFVA profession
deep-research autoloop.

These ledgers already held L4 (Adzuna/LinkedIn) + L5 (last30days) claims but were
missing L1/L2/L3 entirely, and were mis-graded "high" without any L1/L2 claim. This
run adds the missing lanes with REAL, source-verified claims and re-derives confidence.

MERGE discipline: never overwrites existing L4/L5 claims or corpus keys
(platforms/retrieved/linkedin/l5Sample). Only appends new claims, appends a Factiva
auth_expired gap to corpus.searchesReturningNothing, and widens the window.
"""
from __future__ import annotations
import datetime as dt
import json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = "2026-08-30"
EXPIRES = (dt.date(2026, 8, 30) + dt.timedelta(days=180)).isoformat()
PROF = REPO / "data" / "professions"

# L2 AI exposure index per SOC, from data/aioe/v31_extension_crosswalk.csv
# (index_source: Felten-AIOE Appendix A, rescaled 0-100; JSA Gen AI Study lineage).
EXPOSURE = {
    "25-2011": 64.33,
    "25-2021": 84.74,
    "25-2022": 94.25,
    "25-2031": 91.99,
}
TITLES = {
    "25-2011": "Preschool Teachers, Except Special Education",
    "25-2021": "Elementary School Teachers, Except Special Education",
    "25-2022": "Middle School Teachers, Except Special and Vocational Education",
    "25-2031": "Secondary School Teachers, Except Special and Vocational Education",
}

AITSL_ACCRED = (
    "Australian Institute for Teaching and School Leadership (AITSL)",
    "Accreditation of initial teacher education programs in Australia: Standards and Procedures (2025)",
    "https://aitsl.edu.au/tools-resources/resource/accreditation-of-initial-teacher-education-programs-in-australia---standards-and-procedures",
    "2025",
)
AITSL_STANDARDS = (
    "Australian Institute for Teaching and School Leadership (AITSL)",
    "Australian Professional Standards for Teachers",
    "https://www.aitsl.edu.au/the-standards",
    "",
)
JSA = (
    "Jobs and Skills Australia",
    "Our Gen AI Transition: Exposures, Adaptation, Dynamism (Generative AI Capacity Study)",
    "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study/occupation-data-on-ai-exposure",
    "2025-08",
)
FRAMEWORK = (
    "Australian Government Department of Education",
    "Australian Framework for Generative Artificial Intelligence (AI) in Schools",
    "https://education.gov.au/schooling/resources/australian-framework-generative-artificial-intelligence-ai-schools",
    "2025-06",
)
ABC = (
    "ABC News",
    "How education departments across the country are cracking down on students using AI to cheat",
    "https://abc.net.au/news/2026-08-25/how-education-departments-across-country-are-cracking-down-on-ai/107026976",
    "2026-08-25",
)
RESP_AI = (
    "Responsible AI Australia",
    "AI Regulation in Australian Education (2026): Schools, Universities, Rules and Updates",
    "https://responsibleaiaustralia.com.au/industries/education",
    "2026",
)


def claim(cid, lane, tier, text, src, what, scope, refute):
    publisher, title, url, date = src
    return {
        "id": cid,
        "text": text,
        "lane": lane,
        "tier": tier,
        "sources": [{
            "publisher": publisher, "title": title, "url": url, "date": date,
            "whatItMeasured": what,
        }],
        "scope": scope,
        "disposition": "sourced",
        "supersedes": None,
        "bearing": [],
        "refuted": False,
        "refuteNotes": refute,
    }


def build_claims(soc: str) -> list:
    title = TITLES[soc]
    idx = EXPOSURE[soc]
    return [
        claim(
            f"{soc}-L1-01", "L1", "regulatory",
            "In Australia, entry to the teaching profession is regulated nationally through AITSL's "
            "Accreditation of initial teacher education programs in Australia: Standards and Procedures "
            "(2025), under which every initial teacher education program must be accredited so its "
            "graduates meet the Australian Professional Standards for Teachers at the Graduate career "
            f"stage. State and territory teacher registration authorities (for example VIT in Victoria and "
            "NESA in NSW) then register teachers to practise under their respective Education Acts, so "
            f"{title} requires an accredited teaching qualification and registration to lawfully teach in "
            "an Australian school.",
            AITSL_ACCRED,
            "AITSL Accreditation Standards and Procedures (2025) set the national ITE accreditation "
            "requirements; graduates must meet the Australian Professional Standards for Teachers.",
            "Australian school teachers (all states/territories); binds who may lawfully teach. Does not "
            "cover unregistered paraprofessionals or out-of-school tutoring.",
            "AITSL (national teacher regulator/standards body) primary; population = AU teachers; in force 2025.",
        ),
        claim(
            f"{soc}-L2-01", "L2", "scholarly",
            f"DFVA's v31 occupation crosswalk assigns {title} an AI exposure index of {idx}/100 "
            "(Felten-AIOE task-exposure framework, rescaled 0-100, the same lineage as the JSA Gen AI "
            "Capacity Study). Among the four school-teacher levels, preschool teaching carries the lowest "
            "exposure (64.33) and middle-school teaching the highest (94.25), reflecting differences in "
            "task composition (planning, marking, admin, feedback) rather than a forecast of employment change.",
            JSA,
            f"DFVA v31_extension_crosswalk.csv ai_exposure_index for {soc} = {idx}/100 "
            "(Felten-AIOE Appendix A, rescaled 0-100); methodology per JSA Gen AI Capacity Study.",
            "Australian occupation task-exposure score (0-100); model-derived, not an employment-change forecast.",
            "DFVA crosswalk (project data) + JSA primary; population = AU school teachers; 2025-08.",
        ),
        claim(
            f"{soc}-L2-02", "L2", "scholarly",
            "Jobs and Skills Australia's Gen AI Capacity Study (August 2025) scores 358 ANZSCO "
            "occupations on augmentation and automation exposure using a task-level ILO/Felten framework. "
            "It finds most Australian workers face low automation risk, but education-professional "
            "occupations cluster toward the higher-exposure end because their core tasks (lesson planning, "
            "resource creation, feedback, assessment drafting) are language- and knowledge-intensive and "
            "readily supported by generative AI.",
            JSA,
            "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure (augmentation/automation), "
            "358 occupations, Aug 2025.",
            "Australian occupations nationally; model-derived task-level estimates, not employment forecasts.",
            "Primary Australian government source; population = AU occupations; published Aug 2025.",
        ),
        claim(
            f"{soc}-L3-01", "L3", "trade-press-dated",
            "The Australian Framework for Generative AI in Schools (endorsed by Education Ministers; "
            "June 2025 review) sets six principles - teaching and learning, human and social wellbeing, "
            "transparency, fairness, accountability, and privacy/security/safety - to guide responsible "
            "gen-AI use by teachers, students and school leaders. It is national policy implemented "
            "through state and system binding rules rather than legislation, and directly shapes what "
            "teachers are permitted and expected to do with AI in classrooms.",
            FRAMEWORK,
            "Australian Framework for Generative AI in Schools; June 2025 ministerial endorsement of the "
            "2024 framework review; six principles + 25 guiding statements.",
            "Australian school education nationally; policy framework, not a primary study.",
            "Dept of Education publication; population = AU schools; 2025-06.",
        ),
        claim(
            f"{soc}-L3-02", "L3", "trade-press-dated",
            "In August 2026, state education departments moved to curb student AI cheating in ways that "
            "reshape teacher assessment design: NSW proposed banning unsupervised take-home assignments "
            "for Years 11-12 (prompted by more than 1,000 recorded cheating cases in 2025) and NESA's 2024 "
            "AI-in-schools policy treats unapproved AI use as an academic-integrity breach, while Victoria "
            "will impose primary-school screen-time caps from Term 1 2027. Teachers must therefore collect "
            "evidence of learning through oral, performance and in-person modes less exposed to AI misuse.",
            ABC,
            "ABC News reporting on state AI-cheating responses: NSW HSC overhaul, NESA 2024 AI policy, "
            "Victoria 2027 screen-time caps; dated 2026-08-25.",
            "Australian state school systems; reporting, not a primary study. NSW/VIC specific examples.",
            "ABC News (attributable reporting); population = AU state schools; 2026-08-25.",
        ),
        claim(
            f"{soc}-L3-03", "L3", "trade-press-dated",
            "Responsible AI Australia's 2026 education brief notes the national gen-AI schools framework is "
            "implemented by states through binding policies, and that schools must run privacy due "
            "diligence before procuring AI tools (data storage, model training on inputs, third-party "
            "sharing), prohibit entering student or staff personal information into public gen-AI tools, "
            "and keep humans in the loop on judgements such as student-achievement marking and report "
            "writing. These constraints define the boundaries of AI adoption a teacher can undertake.",
            RESP_AI,
            "Responsible AI Australia education page: national framework, state implementation, edtech "
            "procurement and use rules; 2026.",
            "Australian school education; practitioner/policy brief, not a primary study.",
            "Responsible AI Australia (industry body); population = AU schools; 2026.",
        ),
    ]


FACTIVA_GAP = {
    "lane": "L3", "source": "factiva", "status": "auth_expired",
    "detail": "OpenAthens SSO session expired; re-run factiva_reauth.py then factiva_backfill.py. "
              "L3 covered this pass via web trade-press (Framework, ABC, Responsible AI Australia) instead.",
    "date": TODAY,
}


def main() -> None:
    for soc in EXPOSURE:
        p = PROF / f"{soc}.json"
        d = json.loads(p.read_text())
        existing = {c.get("id") for c in d.get("claims", [])}
        added = 0
        for c in build_claims(soc):
            if c["id"] in existing:
                continue
            d.setdefault("claims", []).append(c)
            existing.add(c["id"])
            added += 1
        # Merge Factiva gap (do not duplicate).
        corpus = d.setdefault("corpus", {})
        srn = corpus.setdefault("searchesReturningNothing", [])
        if not any(g.get("lane") == "L3" and g.get("source") == "factiva" for g in srn):
            srn.append(FACTIVA_GAP)
        # Re-derive confidence: >=2 L1/L2 claims + existing L5 corpus => high.
        lanes = [c.get("lane") for c in d.get("claims", [])]
        has_l5 = bool(corpus.get("l5Sample"))
        l12 = sum(1 for l in lanes if l in ("L1", "L2"))
        if l12 >= 2 and has_l5:
            d["confidence"] = "high"
        elif l12 >= 1:
            d["confidence"] = "medium"
        else:
            d["confidence"] = "low"
        # Widen window to include the new L3 (Aug 2026) sources; refresh dates.
        w = d.get("window", {})
        d["window"] = {"from": w.get("from", "2025-08-01"), "to": TODAY}
        d["generated"] = TODAY
        d["expires"] = EXPIRES
        d.setdefault("caveats", []).append(
            f"L1/L2/L3 added {TODAY} (autoloop): AITSL registration/accreditation, JSA/Felten exposure "
            f"index {EXPOSURE[soc]}, AI-in-schools trade press. Factiva L3 gap logged (auth_expired).")
        p.write_text(json.dumps(d, indent=2))
        print(f"[{soc}] added {added} claims; L1/L2/L3 now present; confidence={d['confidence']}; "
              f"total claims={len(d['claims'])}")


if __name__ == "__main__":
    main()
