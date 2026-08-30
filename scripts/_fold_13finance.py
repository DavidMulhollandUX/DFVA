#!/usr/bin/env python3.12
"""Fold genuine L1 (regulatory), L2 (scholarly) and L3 (trade-press web) claims for the
business-finance batch (13-2061 Financial Examiners, 13-2072 Loan Officers) into their
ledgers. Idempotent: skips claim ids already present. Sources were retrieved via live web
search on 2026-08-30 and their content observed (no fabricated URLs). Factiva L3 is
degraded (OpenAthens auth expired) and is logged to factiva_backlog.json by the caller.

AU framing:
  13-2061 Financial Examiners -> financial regulation / compliance roles (ASIC, APRA, AUSTRAC, ADI).
  13-2072 Loan Officers         -> mortgage/credit roles (NCCP Act, ACL, RG 209, brokers).
"""
import json
from datetime import date
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = date.today().isoformat()
PROF = REPO / "data" / "professions"

# ---- Real, observed sources (URLs resolved via web_search on 2026-08-30) ----
ASIC_FS = ("ASIC", "Financial services",
           "https://www.asic.gov.au/regulatory-resources/financial-services", "",
           "ASIC administers the Corporations Act 2001 single licensing regime for financial products, advice and dealings.")
APRA_CPS234 = ("APRA", "Information security requirements for all APRA-regulated entities (CPS 234)",
               "https://www.apra.gov.au/consultations/information-security-requirements-all-apra-regulated-entities", "",
               "Prudential Standard CPS 234 (information security) commenced 1 July 2019; binds all APRA-regulated entities incl ADIs.")
AUSTRAAC_AI = ("AUSTRAC", "Our AI transparency statement",
               "https://www.austrac.gov.au/about-us/policies-and-governance/reports-and-accountability/our-ai-transparency-statement", "",
               "AUSTRAC regulates 17,000+ AML/CTF-regulated businesses and uses AI-enabled analytics for financial-crime detection, with human oversight.")
JSA_EXPO = ("Jobs and Skills Australia", "Our Gen AI Transition - Exposure",
            "https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study/our-gen-ai-transition-exposure",
            "2025-08",
            "JSA Gen AI Capacity Study scores ANZSCO occupations on augmentability/automatability; augmentation outweighs automation.")
ILO_WP096 = ("ILO", "Generative AI and Jobs: A global analysis of potential (working paper)",
             "https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html", "2023",
             "Gmyrek, Berg & Bescond task-level automation vs augmentation framework; JSA adapted it to ANZSCO.")
ASIC_RL = ("ASIC", "Responsible lending",
           "https://www.asic.gov.au/regulatory-resources/credit/responsible-lending", "",
           "NCCP Act 2009 Ch 3 responsible lending obligations; credit licensees must hold an Australian Credit Licence.")
NCCP_LEG = ("Federal Register of Legislation", "National Consumer Credit Protection Act 2009",
            "https://www.legislation.gov.au/C2009A00134/latest", "2009",
            "NCCP Act: credit activity requires an ACL; s128/130 unsuitability assessment before entering/increasing credit.")
ASIC_RG209 = ("ASIC", "Regulatory Guide 209: Credit licensing - Responsible lending conduct",
              "https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-209-credit-licensing-responsible-lending-conduct",
              "", "RG 209 sets ASIC's view on responsible lending conduct; lenders must verify borrower information.")
VOCAL_AML = ("vocal.media", "Australia Anti-Money Laundering Market: Tranche 2 Expansion, AI compliance surge",
             "https://vocal.media/trader/australia-anti-money-laundering-market-tranche-2-expansion-ai-compliance-surge-and-regulatory-enforcement-qv1x630gn2",
             "2026", "Tranche 2 AML reforms effective 31 March 2026 expand coverage; trade press reports AI transaction-monitoring demand surge.")
FT_GLOBAL = ("fintech.global", "AI and risk-based AML: how Australia is operationalising compliance",
             "https://fintech.global/2026/03/27/ai-and-risk-based-aml-how-australia-is-operationalising-compliance/",
             "2026-03-27", "AI deployed across AU financial services: transaction monitoring, behavioural analytics, KYC.")
TIMVERO = ("timvero", "How AI Is Transforming Lending in 2026",
           "https://timvero.com/blog/how-ai-and-automation-are-transforming-lending", "2026",
           "Vendor report: AI-based scoring cut per-loan origination cost up to 14%, defect rates 40%, cycle ~5 days shorter.")
APPINVENTIV = ("appinventiv", "10 Use Cases of How AI is Reshaping the Mortgage Lending Industry",
               "https://appinventiv.com/blog/ai-in-mortgage-lending-industry/", "2026",
               "GenAI summarises loan files, detects inconsistencies, supports underwriters with context.")
LINKED_BROKER = ("LinkedIn (Jason)", "What AI Will Mean for Australian Mortgage Brokers in 2026",
                 "https://www.linkedin.com/pulse/what-ai-mean-australian-mortgage-brokers-2026-jason-9wsbc",
                 "2026", "Practitioner view: AU mortgage brokers adapting to AI tooling.")


def claim(cid, lane, tier, text, src, what, scope, refute):
    publisher, title, url, date, _summary = src
    return {
        "id": cid, "text": text, "lane": lane, "tier": tier,
        "sources": [{"publisher": publisher, "title": title, "url": url, "date": date,
                     "whatItMeasured": what}],
        "scope": scope, "disposition": "sourced", "supersedes": None, "bearing": [],
        "refuted": False, "refuteNotes": refute,
    }


CLAIMS = {
    "13-2061": [
        claim("13-2061-L1-01", "L1", "regulatory",
              "Financial examination and compliance work in Australia is bound by the Corporations Act 2001, which imposes a single licensing regime for financial products, advice and dealings, and by the ASIC Act 2001, which gives ASIC compulsory information-gathering and enforcement powers (including over credit law under s247 of the NCCP Act).",
              ASIC_FS,
              "ASIC financial-services regime under Corporations Act 2001 / ASIC Act 2001; enforcement powers over financial services and credit.",
              "Binds financial regulators, AFS licensees and credit licensees nationally. Applies to examiner/compliance roles; not a statement about AI.",
              "Named statute + regulator page; population = AU financial services regime; in force."),
        claim("13-2061-L1-02", "L1", "regulatory",
              "APRA Prudential Standard CPS 234 (information security), in force since 1 July 2019, requires every APRA-regulated entity (including authorised deposit-taking institutions) to maintain information-security capabilities commensurate with the size of exposures to information-security incidents - directly shaping how examiners oversee bank cyber and operational risk.",
              APRA_CPS234,
              "APRA CPS 234 information-security prudential standard; applies to all APRA-regulated entities incl ADIs from 1 July 2019.",
              "Binds ADIs and insurers; examiner/risk roles within those entities. Does not itself address AI.",
              "APRA prudential standard (regulator); population = APRA-regulated entities; commenced 2019."),
        claim("13-2061-L1-03", "L1", "regulatory",
              "AUSTRAC, the AML/CTF regulator of more than 17,000 regulated businesses, states it uses AI-enabled analytics to detect indicators of financial crime and support analysts, and commits to clear human oversight, monitoring and decision-making as it expands AI use - the regulatory frame within which financial-crime examiners operate.",
              AUSTRAAC_AI,
              "AUSTRAC AI transparency statement: regulates 17,000+ businesses; AI-enabled analytics for financial-crime detection; human oversight.",
              "Binds AUSTRAC-regulated entities' AML/CTF controls; examiner/compliance population. AI oversight is described, not mandated by statute here.",
              "AUSTRAC official statement; population = AML/CTF-regulated entities; 2026 statement."),
        claim("13-2061-L2-01", "L2", "scholarly",
              "Jobs and Skills Australia's Gen AI Capacity Study (August 2025) scores 358 ANZSCO occupations on augmentability and automatability and finds augmentation outweighs automation across the workforce; professional and clerical roles are most exposed to augmentation. Finance-relevant scores include Accountants (augmentability 0.73 / automatability 0.54) and Actuaries, Mathematicians and Statisticians (0.77 / 0.58).",
              JSA_EXPO,
              "JSA Gen AI Capacity Study (Aug 2025), task-level ANZSCO v1.3 exposure; augmentation > automation; finance-role scores given.",
              "Australian occupations nationally; model-derived task-level estimates, not employment forecasts. Does not separate examiner from accountant.",
              "Primary Australian government study; population = AU occupations; published Aug 2025."),
        claim("13-2061-L2-02", "L2", "scholarly",
              "The ILO (Gmyrek, Berg & Bescond, 2023) task-level framework underpinning the JSA study finds clerical support workers most exposed to automation while knowledge workers show partial exposure (augmentation), and that most jobs are only partially exposed and more likely complemented than substituted - the method JSA tailored to ANZSCO.",
              ILO_WP096,
              "ILO working paper wp096: augmentation vs automation framework; clerical highest automation exposure, knowledge work partial.",
              "Global framework, adapted by JSA to ANZSCO; population = global occupations, not AU-specific.",
              "Peer ILO working paper; method source for JSA; 2023."),
        claim("13-2061-L3-01", "L3", "trade-press-dated",
              "Trade press reports that Australia's Tranche 2 AML reforms (effective 31 March 2026), which extend AML/CTF obligations to lawyers, accountants and property agents, are driving a surge in demand for AI-powered transaction-monitoring and compliance tooling.",
              VOCAL_AML,
              "Trade-press item on Tranche 2 AML (eff 31 Mar 2026) and AI compliance-tooling demand.",
              "Trade-press report; directional, not a primary study. AU AML reform context.",
              "Named publisher + date (2026); population = AU AML-regulated sectors; single source."),
        claim("13-2061-L3-02", "L3", "trade-press-dated",
              "A 2026 industry analysis describes AI being operationalised across Australian financial services in four areas: transaction monitoring, behavioural analytics to surface suspicious activity, KYC, and risk-based AML - the work financial-crime examiners review.",
              FT_GLOBAL,
              "fintech.global (2026-03-27): AI across AU financial services transaction monitoring, behavioural analytics, KYC.",
              "Trade-press/industry analysis; not a primary study. AU financial-services context.",
              "Named publisher + date; population = AU financial services; single source."),
    ],
    "13-2072": [
        claim("13-2072-L1-01", "L1", "regulatory",
              "Loan officers and mortgage brokers in Australia are bound by the National Consumer Credit Protection Act 2009, whose Chapter 3 imposes responsible lending obligations: credit licensees must hold an Australian Credit Licence and (with mortgage brokers) owe a best-interests duty to the consumer.",
              ASIC_RL,
              "NCCP Act 2009 Ch 3 responsible lending; ACL required; mortgage-broker best-interests duty.",
              "Binds credit licensees and credit assistance providers nationally. Not a statement about AI.",
              "ASIC regulator page citing NCCP Act; population = AU credit licensees; in force."),
        claim("13-2072-L1-02", "L1", "regulatory",
              "The NCCP Act 2009 prohibits engaging in credit activity without an Australian Credit Licence and requires a licensee to assess whether a credit contract will be unsuitable for the consumer (s128) no more than 90 days before entering or increasing the credit limit (120 days for residential mortgages, s130) - the statutory loan-assessment duty loan officers perform.",
              NCCP_LEG,
              "NCCP Act 2009: ACL required; s128/130 unsuitability assessment timing before credit is entered/increased.",
              "Binds credit providers and brokers; the assessment duty is statutory, not AI-derived.",
              "Commonwealth legislation text; population = AU credit providers; Act 2009."),
        claim("13-2072-L1-03", "L1", "regulatory",
              "ASIC Regulatory Guide 209 (RG 209) sets out ASIC's view of responsible lending conduct and makes clear lenders can no longer simply rely on borrower-supplied information but must take reasonable steps to verify the consumer's financial situation - the verification standard AI credit-assessment tools must satisfy.",
              ASIC_RG209,
              "ASIC RG 209 responsible lending conduct; verification (not mere reliance) of borrower information required.",
              "Binds credit licensees/credit assistance providers; sets the compliance bar for automated assessment.",
              "ASIC regulatory guide; population = AU credit licensees; current."),
        claim("13-2072-L2-01", "L2", "scholarly",
              "JSA's Gen AI Capacity Study (August 2025) finds augmentation outweighs automation and that routine-cognitive clerical roles carry the highest automatability; it scores Accounting Clerks at augmentability 0.74 / automatability 0.71, indicating the loan-origination assessment and documentation tasks sit in a high-exposure band even where professional finance roles skew to augmentation.",
              JSA_EXPO,
              "JSA Gen AI Capacity Study (Aug 2025); augmentation > automation; Accounting Clerks 0.74/0.71; routine-cognitive exposure high.",
              "Australian occupations nationally; model-derived. Applies the study's frame to origination tasks, not a direct loan-officer score.",
              "Primary Australian government study; population = AU occupations; Aug 2025."),
        claim("13-2072-L2-02", "L2", "scholarly",
              "The ILO task-level framework (Gmyrek, Berg & Bescond, 2023) finds routine cognitive and clerical tasks most exposed to automation, consistent with JSA's finding that loan-origination's document-review and assessment steps are partially automatable while judgement-heavy broker tasks skew to augmentation.",
              ILO_WP096,
              "ILO wp096: routine cognitive/clerical tasks most automatable; partial exposure for knowledge work.",
              "Global framework; applied here to origination by analogy of task composition, not AU-specific.",
              "Peer ILO working paper; method source; 2023."),
        claim("13-2072-L3-01", "L3", "trade-press-dated",
              "A 2026 vendor report on AI lending transformation claims lenders using AI-based scoring reduced per-loan origination costs by up to 14% and defect rates by 40%, with about a 5-day shorter loan cycle - a quantified demand-side claim about automation of origination.",
              TIMVERO,
              "timvero (2026): AI scoring -14% origination cost, -40% defects, ~5-day shorter cycle.",
              "Vendor/blog source; directional, not independently audited. Global lending context.",
              "Named publisher + date (2026); single vendor source; claims unverified."),
        claim("13-2072-L3-02", "L3", "trade-press-dated",
              "Industry coverage lists GenAI use cases in mortgage lending - summarising loan files, detecting inconsistencies, and supporting underwriters with context-driven insights - describing how the underwriting step is augmented rather than removed.",
              APPINVENTIV,
              "appinventiv (2026): GenAI summarises loan files, detects inconsistencies, supports underwriters.",
              "Trade/industry coverage; not a primary study. Global mortgage context.",
              "Named publisher + date (2026); single source."),
        claim("13-2072-L3-03", "L3", "trade-press-dated",
              "A practitioner article on Australian mortgage brokers in 2026 argues the AI future is already arriving and that brokers who adopt AI tooling will lead - a practitioner-discourse signal about adoption pressure in the role.",
              LINKED_BROKER,
              "LinkedIn practitioner piece: AU mortgage brokers adapting to AI in 2026.",
              "Practitioner opinion piece; self-selected, not representative. AU broker context.",
              "Named author/platform + date (2026); single practitioner source."),
    ],
}

GAPS = [
    {"lane": "L3", "source": "factiva", "status": "auth_expired",
     "detail": "OpenAthens session expired; re-run scripts/factiva_reauth.py. Logged to factiva_backlog.json.",
     "date": TODAY},
    {"lane": "L4", "source": "seek", "status": "not-sampled",
     "detail": "Seek trend pages not queried this batch; Adzuna AU + LinkedIn used for L4 demand signal.",
     "date": TODAY},
    {"lane": "L4", "source": "last30days-hiring-signals", "status": "not-sampled",
     "detail": "last30days --hiring-signals not run separately; Adzuna + LinkedIn cover L4 demand. L5 last30days ran.",
     "date": TODAY},
    {"lane": "L5", "source": "tiktok", "status": "unavailable",
     "detail": "has_scrapecreators: false (TikTok/Instagram unavailable in this environment). Recorded as coverage, not a finding.",
     "date": TODAY},
    {"lane": "L5", "source": "instagram", "status": "unavailable",
     "detail": "has_scrapecreators: false (TikTok/Instagram unavailable). Recorded as coverage, not a finding.",
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
        corpus = d.setdefault("corpus", {})
        srn = corpus.setdefault("searchesReturningNothing", [])
        for g in GAPS:
            if not any(g.get("lane") == x.get("lane") and g.get("source") == x.get("source")
                       for x in srn):
                srn.append(g)
        p.write_text(json.dumps(d, indent=2))
        print(f"[l1l2l3] {soc}: added {added} claims; gaps recorded")


if __name__ == "__main__":
    main()
