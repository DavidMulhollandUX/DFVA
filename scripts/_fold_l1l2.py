#!/usr/bin/env python3
"""Fold genuine L1 (regulatory) and L2 (scholarly/institutional) claims into the
4-SOC batch ledgers. Idempotent: skips claim ids already present.

Sources are real and were retrieved via live web search on 2026-08-30.
L2 primary = Jobs and Skills Australia Gen AI Capacity Study (Aug 2025).
L2 specific trade numbers = willaitakemyjob index (explicitly draws on JSA).
L1 = named Australian statutes / regulator pages.
"""
import json
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = "2026-08-30"
PROF = REPO / "data" / "professions"

JSA_STUDY = ("Jobs and Skills Australia",
              "Our Gen AI Transition: Exposures, Adaptation, Dynamism (Generative AI Capacity Study)",
              "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study",
              "2025-08")
WILL = ("willaitakemyjob.com.au",
        "Are Tradies the Safest Career Bet in Australia?",
        "https://willaitakemyjob.com.au/blog/are-tradies-the-safest-career-bet-in-australia",
        "2026")
SAFEWORK_OFFICER = ("SafeWork NSW",
                    "The work health and safety duty of an officer",
                    "https://www.safework.nsw.gov.au/resource-library/WHS/the-work-health-and-safety-duty-of-an-officer",
                    "")
SAFEWORK_SA_WC = ("SafeWork SA",
                  "White card",
                  "https://safework.sa.gov.au/business-industry/construction/licences-competencies/white-card",
                  "")
SAFEWORK_NSW_WC = ("SafeWork NSW",
                   "Recognition of general construction induction training cards: Fact sheet",
                   "https://safework.nsw.gov.au/resource-library/licence-and-registrations/recognition-of-general-construction-induction-training-cards-fact-sheet",
                   "")
VETASSESS_342313 = ("VETASSESS",
                    "Electronic Equipment Trades Worker — ANZSCO 342313 information sheet",
                    "https://vetassess.com.au/sk/information-sheet/201",
                    "2026-04")
QUOTEYARD = ("thequoteyard.com.au",
             "Electrician Licensing Guide Australia 2026 - State-by-State Licensing and Compliance",
             "https://thequoteyard.com.au/services/electrician-licensing-guide",
             "2026")

JSA_AGGREGATE_TEXT = ("Jobs and Skills Australia's Gen AI Capacity Study (August 2025) scores 358 "
    "ANZSCO occupations on augmentability and automatability using an ILO/Felten-derived "
    "task-level framework. It finds trades and other physically-demanding occupations at the "
    "lowest end of AI exposure, while routine clerical and administrative roles carry the "
    "highest automation risk; augmentation outweighs automation across the workforce (the "
    "study reports 79% of Australian workers face low or very low automation risk).")


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


CLAIMS = {
    "47-2111": [
        claim("47-2111-L1-01", "L1", "regulatory",
            "Electrical work in Australia is licensed on a state-by-state basis. Victoria's "
            "Electricity Safety Act 1998 and Electricity Safety (Registration and Licensing) "
            "Regulations 2020 (administered by Energy Safe Victoria) require a licence (e.g. "
            "A-Grade electrician) and a Certificate of Electrical Safety for prescribed work; "
            "Queensland's Electrical Safety Act 2002 (Electrical Safety Office) is the "
            "equivalent, and other states run parallel schemes. Automatic Mutual Recognition "
            "lets most interstate licence holders work across jurisdictions.",
            QUOTEYARD,
            "Summary of state electrical-licensing legislation (Electricity Safety Act 1998 (Vic), "
            "Electrical Safety Act 2002 (Qld)) and mutual recognition.",
            "State-based electrical licensing across AU; binds who may lawfully perform electrical "
            "work. Does not cover unlicensed assistant/helper roles.",
            "Named statutes; secondary guide describes them; population = licensed electricians AU; in force."),
        claim("47-2111-L2-01", "L2", "scholarly",
            JSA_AGGREGATE_TEXT,
            JSA_STUDY,
            "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure (augmentability/"
            "automatability), 358 occupations, Aug 2025.",
            "Australian occupations nationally; model-derived task-level estimates, not "
            "employment forecasts.",
            "Primary Australian government source; population = AU occupations; published Aug 2025."),
        claim("47-2111-L2-02", "L2", "trade-press-dated",
            "A third-party AI-risk index that draws on JSA's GenAI Capacity Study places "
            "Electricians at 2.8/10 AI risk and building and plumbing labourers at 2.0/10 - "
            "among the lowest of any occupation - reflecting the physical, spatial and "
            "real-time problem-solving nature of the work and the gap between theoretical "
            "capability and on-site adoption ('structural protection').",
            WILL,
            "Third-party 0-10 AI-risk index derived from JSA GenAI Capacity Study + task-level "
            "analysis; electricians 2.8, building/plumbing labourers 2.0.",
            "Third-party index, not JSA primary; directional, AU trades.",
            "Real publisher index citing JSA; population = AU trades; 2026."),
    ],
    "47-2061": [
        claim("47-2061-L1-01", "L1", "regulatory",
            "Construction work in Australia is governed by the model Work Health and Safety Act "
            "2011 and WHS Regulation Part 6.5, which mandates general construction induction "
            "training (the White Card, unit CPCWHS1001 - Prepare to work safely in the "
            "construction industry) for any person carrying out construction work; persons "
            "conducting a business or undertaking must ensure workers hold a valid card before "
            "site entry. Interstate White Cards are recognised under WHS Regulation 318.",
            SAFEWORK_SA_WC,
            "WHS Act 2011 + WHS Regulation Pt 6.5 construction induction (White Card / "
            "CPCWHS1001) requirement and interstate recognition (reg 318).",
            "Model WHS jurisdictions nationally; binds all construction-site workers including "
            "labourers. Minor maintenance/repair work of low risk is excluded.",
            "Regulator guidance; population = AU construction workers; in force."),
        claim("47-2061-L2-01", "L2", "scholarly",
            JSA_AGGREGATE_TEXT,
            JSA_STUDY,
            "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure, 358 occupations, Aug 2025.",
            "Australian occupations nationally; model-derived task-level estimates.",
            "Primary Australian government source; population = AU occupations; Aug 2025."),
        claim("47-2061-L2-02", "L2", "trade-press-dated",
            "A third-party AI-risk index that draws on JSA's GenAI Capacity Study places "
            "building and plumbing labourers at 2.0/10 AI risk - the second-lowest of any "
            "occupation surveyed - with concreters (1.9) and other manual trades clustering at "
            "the bottom, reflecting work that requires physical presence and unpredictable "
            "site problem-solving.",
            WILL,
            "Third-party 0-10 AI-risk index derived from JSA GenAI Capacity Study; building/"
            "plumbing labourers 2.0, concreters 1.9.",
            "Third-party index, not JSA primary; directional, AU trades.",
            "Real publisher index citing JSA; population = AU labourers/trades; 2026."),
    ],
    "47-1011": [
        claim("47-1011-L1-01", "L1", "regulatory",
            "Under the model Work Health and Safety Act 2011 (s27) a positive personal duty of "
            "due diligence is imposed on 'officers' of a person conducting a business or "
            "undertaking; the officer definition (by reference to the Corporations Act 2001 "
            "s9AD) captures senior supervisors and managers who make or participate in "
            "decisions affecting a substantial part of the business, so first-line construction "
            "supervisors can carry officer-level WHS duties. State builder licensing also "
            "applies to contracting construction work.",
            SAFEWORK_OFFICER,
            "WHS Act 2011 (NSW/model) s27 officer due-diligence duty; Corporations Act 2001 "
            "s9AD officer definition includes senior decision-makers.",
            "Model WHS jurisdictions; applies to supervisors/managers classified as officers. "
            "Does not cover non-officer workers.",
            "Regulator guidance; population = corporate officers incl. senior supervisors; in force since 2011."),
        claim("47-1011-L2-01", "L2", "scholarly",
            JSA_AGGREGATE_TEXT,
            JSA_STUDY,
            "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure, 358 occupations, Aug 2025.",
            "Australian occupations nationally; model-derived task-level estimates.",
            "Primary Australian government source; population = AU occupations; Aug 2025."),
        claim("47-1011-L2-02", "L2", "trade-press-dated",
            "A third-party AI-risk index that draws on JSA's GenAI Capacity Study places the "
            "manual trades cluster (concreters 1.9, building/plumbing labourers 2.0, "
            "bricklayers 2.7, electricians/plumbers 2.8) at the bottom of the exposure scale, "
            "and construction supervisory and trade roles sit in the same low band because the "
            "work is physically embodied and site-variable rather than information-processing.",
            WILL,
            "Third-party 0-10 AI-risk index derived from JSA GenAI Capacity Study; trade cluster "
            "1.9-2.8.",
            "Third-party index, not JSA primary; directional, AU trades/supervision.",
            "Real publisher index citing JSA; population = AU trades; 2026."),
    ],
    "49-2094": [
        claim("49-2094-L1-01", "L1", "regulatory",
            "Electronic Equipment Trades Workers (ANZSCO 342313) must hold the regulated trade "
            "qualification (Certificate III in Electronics and Communications, UEE30920) and are "
            "skills-assessed by VETASSESS for migration; where they perform electrical work, "
            "state electrical licensing (including restricted licences for specific tasks) "
            "applies, and WHS duties bind the work. The qualification's units include documented "
            "WHS risk-control measures for electrotechnology work.",
            VETASSESS_342313,
            "VETASSESS ANZSCO 342313 occupation info: required qualification UEE30920 Cert III, "
            "WHS units of competency, skills assessment.",
            "Australian occupation regulation/assessment for 342313; electrical-licensing overlay "
            "where electrical work is performed.",
            "VETASSESS (official assessing authority) info sheet; population = AU 342313; 2026."),
        claim("49-2094-L2-01", "L2", "scholarly",
            JSA_AGGREGATE_TEXT,
            JSA_STUDY,
            "JSA Gen AI Capacity Study, task-level ANZSCO v1.3 exposure, 358 occupations, Aug 2025.",
            "Australian occupations nationally; model-derived task-level estimates.",
            "Primary Australian government source; population = AU occupations; Aug 2025."),
        claim("49-2094-L2-02", "L2", "trade-press-dated",
            "A third-party AI-risk index that draws on JSA's GenAI Capacity Study places the "
            "manual trades cluster (concreters 1.9, building/plumbing labourers 2.0, "
            "electricians/plumbers 2.8) at the bottom of the exposure scale; electronic "
            "equipment repairers share this low-exposure profile because the work is hands-on, "
            "requires psychomotor skill and adapts to varied equipment faults rather than "
            "routine information processing.",
            WILL,
            "Third-party 0-10 AI-risk index derived from JSA GenAI Capacity Study; trade cluster "
            "1.9-2.8 applied to electronic equipment repairers by analogy of task composition.",
            "Third-party index, not JSA primary; directional, AU trades.",
            "Real publisher index citing JSA; population = AU trades; 2026."),
    ],
}

# Coverage gaps to record (graceful-degrade / not-sampled lanes).
GAPS = [
    {"lane": "L3", "source": "factiva", "status": "auth_expired",
     "detail": "OpenAthens session expired; re-run factiva_reauth.py. Logged to factiva_backlog.json.",
     "date": TODAY},
    {"lane": "L4", "source": "seek", "status": "not-sampled",
     "detail": "Seek trend pages not queried this batch; Adzuna AU + LinkedIn used for L4 demand signal.",
     "date": TODAY},
    {"lane": "L4", "source": "last30days-hiring-signals", "status": "not-sampled",
     "detail": "last30days --hiring-signals not run separately this batch (L5 last30days ran; Adzuna+LinkedIn cover L4 demand).",
     "date": TODAY},
]


def main():
    for soc, claims in CLAIMS.items():
        p = PROF / f"{soc}.json"
        d = json.loads(p.read_text())
        existing = {c.get("id") for c in d.get("claims", [])}
        added = 0
        for c in claims:
            if c["id"] in existing:
                continue
            d.setdefault("claims", []).append(c)
            existing.add(c["id"])
            added += 1
        # Merge coverage gaps (do not overwrite existing entries).
        corpus = d.setdefault("corpus", {})
        srn = corpus.setdefault("searchesReturningNothing", [])
        for g in GAPS:
            if not any(g.get("lane") == x.get("lane") and g.get("source") == x.get("source")
                       for x in srn):
                srn.append(g)
        p.write_text(json.dumps(d, indent=2))
        print(f"[l1l2] {soc}: added {added} claims; gaps recorded")


if __name__ == "__main__":
    main()
