#!/usr/bin/env python3.12
"""Fold genuine L1 (regulatory) + L2 (scholarly) claims into the 4-SOC media/words
cluster (27-3043, 27-3042, 27-3041, 27-3031), and log the Factiva L3 auth-expired
gap to both corpus.searchesReturningNothing and data/professions/factiva_backlog.json.

All sources were retrieved via live web search / web extract on 2026-08-31 and are
real, attributable URLs. No fabricated URLs. Idempotent: skips claim ids already
present; does not duplicate corpus gaps or backlog entries.
"""
import json, datetime as dt
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
TODAY = "2026-08-31"
BACKLOG = PROF / "factiva_backlog.json"

JSA_STUDY = ("Jobs and Skills Australia",
             "Australia's AI Transition: Jobs, Skills and the Future of Work",
             "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study",
             "2025-08-14")
TC = ("The Conversation",
      "These 3 charts show female-dominated jobs are actually the most exposed to AI",
      "https://theconversation.com/these-3-charts-show-female-dominated-jobs-are-actually-the-most-exposed-to-ai-288103",
      "")

# Shared L2 claims (same text across the cluster; unique ids per SOC via prefix).
def l2_claims(soc):
    return [
        {
            "id": f"{soc}-L2-01", "lane": "L2", "tier": "scholarly",
            "text": ("Jobs and Skills Australia's Gen AI Capacity Study (Overarching Report 14 August 2025; "
                      "Final Release 30 September 2025) is the first national whole-of-labour-market study of "
                      "generative AI in Australia and finds Gen AI is more likely to augment human work than "
                      "replace it; it scores ANZSCO 1.3 occupations across exposure, adoption, adaptation, "
                      "labour market dynamism and skills."),
            "sources": [{"publisher": JSA_STUDY[0], "title": JSA_STUDY[1], "url": JSA_STUDY[2],
                         "date": JSA_STUDY[3],
                         "whatItMeasured": "JSA Gen AI Capacity Study: first national whole-of-labour-market Gen AI "
                         "study; scores ANZSCO 1.3 occupations on exposure/adoption/adaptation/dynamism/skills; "
                         "headline finding augment > replace."}],
            "scope": "Australian occupations nationally; model/account-derived task-level exposure estimates, not employment forecasts.",
            "disposition": "sourced", "supersedes": None, "bearing": [],
            "refuted": False,
            "refuteNotes": "Primary Australian government source (JSA); population = AU occupations; published 2025.",
        },
        {
            "id": f"{soc}-L2-02", "lane": "L2", "tier": "scholarly",
            "text": ("JSA's Gen AI Transition exposure data places clerical and administrative occupations — and the "
                      "broader information-processing and media/communications groups that include writers, editors "
                      "and public-relations roles — among the most exposed to automation. The Conversation's analysis "
                      "of JSA data shows the 20 occupations most at risk of automation are dominated by "
                      "female-concentrated clerical roles (secretaries, receptionists, bookkeepers, accounting/HR/"
                      "payroll clerks), while trades and labourer jobs are least exposed."),
            "sources": [{"publisher": TC[0], "title": TC[1], "url": TC[2], "date": TC[3],
                         "whatItMeasured": "Academic (The Conversation) analysis of JSA 'Our Gen AI Transition: "
                         "Exposures, Adaptation, Dynamism' occupation exposure scores; clerical/administrative + "
                         "media/communications groups most exposed to automation."}],
            "scope": "AU occupations; exposure scores are task-level automation potential, not realised displacement; "
                     "writers/editors/PR sit in adjacent high-exposure information/media groups, not necessarily the "
                     "top-20 clerical list.",
            "disposition": "sourced", "supersedes": None, "bearing": [],
            "refuted": False,
            "refuteNotes": "Academic source citing JSA primary; population = AU occupations; 2026 analysis of 2025 JSA data.",
        },
    ]

L1 = {
    "27-3043": [{
        "id": "27-3043-L1-01", "lane": "L1", "tier": "regulatory",
        "text": ("In Australia the rights of authors are governed by the Copyright Act 1968 (Cth); the Australian "
                  "Society of Authors (ASA), established 1963, is the peak national body representing authors and "
                  "illustrators and advocates on copyright reform. Writing is not a licensed or registered occupation."),
        "sources": [{"publisher": "Australian Society of Authors",
                     "title": "Copyright", "url": "https://www.asauthors.org.au/advocacy/copyright/",
                     "date": "", "whatItMeasured": "ASA advocacy/copyright page describing the ASA's role representing "
                     "authors on Copyright Act reform; Copyright Act 1968 (Cth) is the statutory framework for authors' rights."}],
        "scope": "Australian authors; copyright framework, not a licensing/registration regime (writing is an unlicensed occupation).",
        "disposition": "sourced", "supersedes": None, "bearing": [],
        "refuted": False,
        "refuteNotes": "Peak body page + named statute; population = AU authors; in force.",
    }],
    "27-3042": [{
        "id": "27-3042-L1-01", "lane": "L1", "tier": "regulatory",
        "text": ("Technical Writer (OSCA code 231334) has no licensing or registration requirements in Australia; the "
                  "occupation is self-regulated, with VETASSESS assessing the relevant qualification at AQF Bachelor-degree "
                  "level for migration purposes. No statutory body licenses technical writers."),
        "sources": [{"publisher": "Jobs and Skills Australia",
                     "title": "Technical Writer (OSCA 231334)",
                     "url": "https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles/occupations-osca/231334-technical-writer",
                     "date": "", "whatItMeasured": "JSA OSCA occupation profile states 'No licensing or registration "
                     "requirements are listed for this occupation'; VETASSESS assesses qualification at AQF Bachelor level."}],
        "scope": "Australian Technical Writer occupation; no statutory licence; quality governed by employers and sector standards.",
        "disposition": "sourced", "supersedes": None, "bearing": [],
        "refuted": False,
        "refuteNotes": "Official JSA occupation profile (OSCA 231334); population = AU Technical Writer; current.",
    }],
    "27-3041": [{
        "id": "27-3041-L1-01", "lane": "L1", "tier": "regulatory",
        "text": ("Editing in Australia is self-regulated. The Institute of Professional Editors (IPEd) administers the "
                  "Accredited Editor scheme and publishes the IPEd standards for editing practice, but there is no "
                  "statutory licensing of editors."),
        "sources": [{"publisher": "Institute of Professional Editors",
                     "title": "Institute of Professional Editors Limited",
                     "url": "https://www.iped-editors.org/", "date": "",
                     "whatItMeasured": "IPEd homepage: manages an accreditation scheme, maintains 'IPEd standards for "
                     "editing practice'; no statutory licence for editors."}],
        "scope": "Australian editors; voluntary professional accreditation (Accredited Editor), not mandatory.",
        "disposition": "sourced", "supersedes": None, "bearing": [],
        "refuted": False,
        "refuteNotes": "Professional body (IPEd); population = AU editors; current.",
    }],
    "27-3031": [{
        "id": "27-3031-L1-01", "lane": "L1", "tier": "regulatory",
        "text": ("Public relations in Australia is self-regulated. Communication and Public Relations Australia (CPRA, "
                  "formerly PRIA) is the peak body and offers practitioner accreditation; there is no statutory licensing "
                  "of PR practitioners. Advertising and marketing communications are additionally subject to self-regulatory "
                  "codes administered by Ad Standards (AANA)."),
        "sources": [{"publisher": "Communication and Public Relations Australia",
                     "title": "Communication & Public Relations Australia | Australia's Peak PR Body",
                     "url": "https://www.cpra.org.au/", "date": "",
                     "whatItMeasured": "CPRA homepage: peak PR body (formerly PRIA), industry training/accreditation; "
                     "no statutory licence for PR practitioners."}],
        "scope": "Australian PR practitioners; voluntary accreditation; advertising-code overlay via Ad Standards (AANA).",
        "disposition": "sourced", "supersedes": None, "bearing": [],
        "refuted": False,
        "refuteNotes": "Peak body (CPRA); population = AU PR practitioners; current.",
    }],
}

# Corpus gaps to record (graceful-degrade / not-sampled lanes).
GAPS = [
    {"lane": "L3", "source": "factiva", "status": "auth_expired",
     "detail": "OpenAthens session expired 2026-08-31; re-run scripts/factiva_reauth.py to refresh before backfill.",
     "date": TODAY},
    {"lane": "L4", "source": "seek", "status": "not-sampled",
     "detail": "Seek trend pages not queried this run; Adzuna AU + LinkedIn cover L4 demand signal.",
     "date": TODAY},
    {"lane": "L4", "source": "last30days-hiring-signals", "status": "not-sampled",
     "detail": "last30days --hiring-signals not run separately; Adzuna + LinkedIn cover L4 demand. (L5 last30days ran.)",
     "date": TODAY},
]

TITLES = {"27-3043": "Writers and Authors", "27-3042": "Technical Writers",
          "27-3041": "Editors", "27-3031": "Public Relations Specialists"}


def main():
    # Load or init backlog.
    if BACKLOG.exists():
        bl = json.loads(BACKLOG.read_text())
    else:
        bl = {"version": 1, "updated": "", "entries": {}}
    bl.setdefault("entries", {})

    for soc, l1 in L1.items():
        p = PROF / f"{soc}.json"
        d = json.loads(p.read_text())
        existing = {c.get("id") for c in d.get("claims", [])}
        added = 0
        for c in l1 + l2_claims(soc):
            if c["id"] in existing:
                continue
            d.setdefault("claims", []).append(c)
            existing.add(c["id"])
            added += 1
        # Merge corpus gaps idempotently.
        corpus = d.setdefault("corpus", {})
        srn = corpus.setdefault("searchesReturningNothing", [])
        for g in GAPS:
            if not any(g.get("lane") == x.get("lane") and g.get("source") == x.get("source") for x in srn):
                srn.append(g)
        p.write_text(json.dumps(d, indent=2, ensure_ascii=False))

        # Log Factiva gap to backlog idempotently.
        if soc not in bl["entries"]:
            bl["entries"][soc] = {
                "soc": soc, "title": TITLES[soc], "reason": "auth_expired",
                "detail": "OpenAthens session expired 2026-08-31; re-run scripts/factiva_reauth.py to refresh before backfill.",
                "attempts": 1, "lastAttempt": f"{TODAY}T00:00:00",
                "queries": [f"{TITLES[soc]} AI disruption"],
            }
        print(f"[{soc}] added {added} L1/L2 claims; backlog={'updated' if soc in bl['entries'] else 'added'}")
    bl["updated"] = dt.datetime.now(dt.timezone.utc).isoformat()
    BACKLOG.write_text(json.dumps(bl, indent=2, ensure_ascii=False))
    print("factiva_backlog.json updated")


if __name__ == "__main__":
    main()
