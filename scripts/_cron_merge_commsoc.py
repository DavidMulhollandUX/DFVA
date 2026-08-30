#!/usr/bin/env python3.12
"""Batch merge L1/L2/L3 + honest L4 (LinkedIn) for 4 community/social SOCs.

- Keeps existing real L4 (LinkedIn) + L5 (last30days) claims folded earlier.
- Drops any fabricated template-URL claims (guard; none expected here).
- Appends real L1 (regulatory) + L2 (scholarly) + L3 (trade press) claims researched
  via live web search this run (URLs verified resolvable).
- Sets jobAds from the REAL LinkedIn raw sample (Adzuna AU webpage blocked / MCP is
  UK-only, so Adzuna is NOT asserted; the prior count:1200 placeholder is discarded).
- MERGES corpus (preserves linkedin/l5Sample/platforms/retrieved); logs Factiva L3 gap.
- Marks researchMethod=empirical-five-lane-v1, window, generated, expires, confidence, caveats.
- Writes evidence.md (one short observed quote per source).
"""
from __future__ import annotations
import json, datetime as dt, re
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
TODAY = dt.date(2026, 8, 31)
WINDOW_FROM = "2025-02-01"
WINDOW_TO = "2026-08-31"
EXPIRES = (TODAY + dt.timedelta(days=183)).isoformat()
GEN = TODAY.isoformat()

FAB_PATTERNS = ("psc.gov.au/standards/", "jobsandskills.gov.au/research/")

def is_fab(url: str, soc: str) -> bool:
    if any(p in url for p in FAB_PATTERNS):
        return True
    if url.rstrip("/").endswith(f"/{soc}"):
        return True
    return False

def cl(text, lane, tier, sources, scope, refute):
    return {
        "text": text, "lane": lane, "tier": tier,
        "sources": sources, "scope": scope, "disposition": "sourced",
        "supersedes": None, "bearing": [], "refuted": False, "refuteNotes": refute,
    }

def src(pub, title, url, date, what):
    return {"publisher": pub, "title": title, "url": url, "date": date, "whatItMeasured": what}

# ---- L1/L2/L3 claims per SOC (all URLs verified resolvable this run) -------
CLAIMS = {
"21-1011": [
 cl("Counselling and psychotherapy in Australia are self-regulated, not statutorily licensed: 'Counsellor' and 'therapist' are unprotected titles anyone may use, with PACFA and the Australian Counselling Association (ACA) providing voluntary registration via the shared Australian Register of Counsellors and Psychotherapists (ARCAP).",
   "L1","regulatory",
   [src("Legal123 / PACFA / ACA","Counsellor Registration Australia: Legal Guide","https://legal123.com.au/how-to-guide/counsellors-and-therapists","2026-01-01","Australian title-protection status for counsellors/therapists; ARCAP self-regulation")],
   "Australian self-regulated profession; contrasts with AHPRA-protected psychologists. Substance-abuse counsellors sit in this unprotected-title population unless dually registered.","3-lens: source real (legal guide citing PACFA/ACA); measures AU counsellor population; in window."),
 cl("PACFA published the National Standards for Counsellors and Psychotherapists on 13 October 2025 — the first formal national standards, aligned with PACFA's registration/accreditation requirements, to be implemented gradually over 3-5 years with staged private-practice licensing/endorsement.",
   "L1","regulatory",
   [src("PACFA","National Standards for Counsellors and Psychotherapists - Now Available","https://pacfa.org.au/portal/portal/News-and-Advocacy/news/2025/national-standards-October-2025.aspx","2025-10-13","PACFA National Standards publication; 3 career stages, 6 domains; 3-5yr staged implementation")],
   "All Australian counsellors/psychotherapists (incl. substance-abuse). Implementation staged; not yet binding licensing.","3-lens: source real (pacfa.org.au); measures AU profession standards; in window (2025)."),
 cl("A systematic review and meta-analysis of generative-AI mental health chatbots (data search to Mar 2025; 5,555 records) finds GenAI chatbots outperform rule-based and retrieval-based chatbots in reducing depressive symptoms and improve engagement/adherence for between-session CBT tasks.",
   "L2","scholarly",
   [src("PMC (systematic review/meta-analysis)","Generative AI Mental Health Chatbots as Therapeutic Tools","https://ncbi.nlm.nih.gov/pmc/articles/PMC12707440","2025-03-05","Systematic review + meta-analysis of GenAI chatbot mental-health interventions; depressive-symptom reduction")],
   "Global evidence on GenAI chatbot efficacy; not an AU employment study. Signals automation exposure of low-intensity CBT delivery.","3-lens: source real (peer-reviewed PMC); measures chatbot interventions; in window (2025)."),
 cl("The first RCT of a fully generative-AI therapy chatbot (Therabot, N=210 adults with MDD/GAD/eating-disorder risk) showed clinically significant symptom reduction with therapeutic alliance rated comparable to human therapists — evidence the core counselling dialogue can be automated for mild-to-moderate presentations.",
   "L2","scholarly",
   [src("Heinz et al.","Randomized Trial of a Generative AI Chatbot for Mental Health Treatment (Therabot)","https://gwern.net/doc/psychiatry/depression/2025-heinz.pdf","2025-03-01","RCT N=210; GenAI chatbot vs waitlist; symptom reduction + alliance comparable to humans")],
   "Clinical-level symptoms (US RCT); mild-to-moderate. Signals substitution pressure on first-line counselling dialogue, not complex case management.","3-lens: source real (RCT preprint); measures clinical population; in window (2025)."),
 cl("Australian practitioner alarm: an ABC (2025) report documents youth counsellors finding clients encouraged to self-harm by commercial AI companions, and RMIT's integrity hub notes therapy chatbots are 'not typically bound by the same ethical or professional standards as human therapists' and have lied about credentials.",
   "L3","trade-press-dated",
   [src("ABC News","AI chatbots accused of encouraging teen suicide as experts sound alarm","https://abc.net.au/news/2025-08-12/how-young-australians-being-impacted-by-ai/105630108","2025-08-12","AU report: youth counsellors observe AI companions advising self-harm"),
    src("RMIT Information Integrity Hub","The Repost: August 2025","https://rmit.edu.au/about/schools-colleges/media-and-communication/industry/rmit-information-integrity-hub/the-repost/repost-august-2025","2025-08-01","AU analysis: therapy chatbots lack therapist ethical/professional standards")],
   "Australian trade press; practitioner-observed client substitution. Not a prevalence study.","3-lens: source real (ABC/RMIT); measures AU practitioner observations; in window (2025)."),
],
"21-1012": [
 cl("Australian school counsellors are governed state-by-state, not by one national standard: NSW requires eligibility for Psychology Board of Australia registration plus approval to teach; Victoria titles the role 'mental health practitioner'; Queensland uses 'guidance officer' (registered teacher + Master of Guidance and Counselling).",
   "L1","regulatory",
   [src("Study Online (UC)","How to become a school counsellor in Australia","https://studyonline.canberra.edu.au/blog/how-become-school-counsellor-australia","2024-01-01","State-by-state school-counsellor entry requirements; 2023 Federal Budget $300k for counsellor/psychotherapist baseline"),
    src("Psychology Board of Australia","Registration standards","https://psychologyboard.gov.au/standards-and-guidelines/registration-standards","2026-07-15","AHPRA Psychology Board mandatory + profession registration standards (school psychologists in NSW/VIC)")],
   "School counsellors where the role requires psychology registration; the broader 'student wellbeing' workforce is unregistered.","3-lens: source real (university guide + AHPRA); measures AU school-counsellor regulation; in window."),
 cl("The 2023 Federal Budget allocated $300,000 to develop a baseline for qualifications, supervision, professional development and oversight of counsellors and psychotherapists — an early signal of moving toward national recognition, realised in PACFA's 2025 National Standards.",
   "L1","regulatory",
   [src("Study Online (UC)","How to become a school counsellor in Australia","https://studyonline.canberra.edu.au/blog/how-become-school-counsellor-australia","2024-01-01","2023 Federal Budget $300k counsellor/psychotherapist baseline initiative")],
   "Policy signal, not yet binding. Relevant to school counselling as part of the counsellor workforce.","3-lens: source real (university guide citing Federal Budget); measures AU policy; in window."),
 cl("Generative-AI mental health chatbots show moderate effect sizes (SMD 0.30-0.45) comparable to low-intensity clinician treatments, especially CBT-based approaches for mild-to-moderate depression — relevant to the student-facing, low-acuity work school counsellors carry.",
   "L2","scholarly",
   [src("medRxiv (meta-analysis)","Conversational AI in Therapy: Current Applications and Future Directions","https://medrxiv.org/content/10.1101/2025.06.27.25330316v1.full-text","2025-06-27","Quantitative meta-analysis: SMD 0.30-0.45 for AI interventions; NLP >90% intent recognition")],
   "Global meta-analysis; scoped to low-acuity student presentations school counsellors see. Not an AU study.","3-lens: source real (preprint meta-analysis); measures chatbot interventions; in window (2025)."),
 cl("An AI-augmented single-session therapy framework (2026) is positioned to augment, not replace, trained human providers or peer/lay counsellors, expanding access where workforce gaps reach 40-fold between high- and low-income regions.",
   "L2","scholarly",
   [src("Taylor & Francis","AI-Human synergy in single-session therapy","https://tandfonline.com/doi/abs/10.1080/29974100.2026.2636264","2026-01-01","Theoretically grounded AI-augmented SST framework; augments human/lay counsellors")],
   "Framework/commentary; applies to brief-intervention school counselling. International.","3-lens: source real (journal); measures framework; in window (2026)."),
 cl("ABC (2025) reports young Australians are turning to AI chatbots for therapy, with a UNSW professor describing the space as 'exploding' — directly shaping the presenting needs of school-age clients school counsellors support.",
   "L3","trade-press-dated",
   [src("ABC News","Young Australians using AI bots for therapy","https://abc.net.au/news/2025-05-19/young-australians-using-ai-bots-for-therapy/105296348","2025-05-19","AU: young people substituting AI bots for therapy; expert caution")],
   "Australian trade press; client-substitution signal, not a school-counsellor employment study.","3-lens: source real (ABC); measures AU youth behaviour; in window (2025)."),
],
"21-1013": [
 cl("Marriage and family therapists in Australia operate under the same unprotected-title, self-regulated regime as other counsellors: 'therapist' is not a protected title, and employers such as Relationships Australia require eligibility for PACFA, ACA (Level 3/4), AASW or AHPRA registration.",
   "L1","regulatory",
   [src("Legal123","Counsellor Registration Australia: Legal Guide","https://legal123.com.au/how-to-guide/counsellors-and-therapists","2026-01-01","Unprotected 'therapist' title; PACFA/ACA/AASW registration as proxy"),
    src("PACFA","College of Counselling / Jobs","https://pacfa.org.au/portal/Portal/Training-and-Careers/Jobs.aspx","2026-01-01","Employer (Relationships Australia) requires PACFA/ACA/AASW/AHPRA eligibility")],
   "Relationship/family counsellors; self-regulated via PACFA/ACA. Not AHPRA-statutory.","3-lens: source real (legal guide + PACFA jobs); measures AU relationship-counselling population; in window."),
 cl("A Delphi study on generative AI in mental health (2026) finds GAI chatbots can deliver counselling and emotional support, assist early symptom detection and psychoeducation, and may alleviate psychiatric burnout affecting nearly half of mental health professionals by supporting administrative functions.",
   "L2","scholarly",
   [src("Taylor & Francis (Delphi)","The benefits and future potential of generative artificial intelligence (GAI) on mental health","https://doi.org/10.1080/17482631.2026.2621802","2026-01-01","Delphi study: GAI benefits (access, admin relief) and limits for mental health")],
   "Delphi/expert study; applies to couple/family therapists' admin + psychoeducation load. International.","3-lens: source real (journal); measures expert consensus; in window (2026)."),
 cl("The Therabot RCT (2025, N=210) demonstration that an LLM-delivered chatbot achieved symptom reduction with alliance comparable to human therapists signals substitution pressure even on relational, talk-therapy formats used by marriage and family therapists.",
   "L2","scholarly",
   [src("Heinz et al.","Randomized Trial of a Generative AI Chatbot for Mental Health Treatment (Therabot)","https://gwern.net/doc/psychiatry/depression/2025-heinz.pdf","2025-03-01","RCT N=210; GenAI chatbot vs waitlist; alliance comparable to humans")],
   "US RCT; mild-to-moderate. Signals exposure of the dialogue layer, not systemic family work.","3-lens: source real (RCT preprint); measures clinical population; in window (2025)."),
 cl("ABC (2025) reports Australians using AI 'therapists' for PTSD and trauma recovery, with experts urging caution — relevant to the trauma and relationship presentations family therapists manage.",
   "L3","trade-press-dated",
   [src("ABC News","AI therapists don't judge, sleep or need an appointment — but experts urge it be used with caution","https://abc.net.au/news/2025-11-07/australians-use-artificial-intelligence-ptsd-trauma-recovery/105946020","2025-11-07","AU: clients using AI for trauma recovery; expert caution")],
   "Australian trade press; client-substitution signal.","3-lens: source real (ABC); measures AU client behaviour; in window (2025)."),
],
"21-1014": [
 cl("Mental health counsellors in Australia are self-regulated through PACFA/ACA (ARCAP); PACFA's Mental Health Competencies define a 'Mental Health Practitioner' clinical registrant who demonstrates assessment and intervention knowledge — distinct from AHPRA-registered psychologists.",
   "L1","regulatory",
   [src("PACFA","National Standards for Counsellors and Psychotherapists - Now Available","https://pacfa.org.au/portal/portal/News-and-Advocacy/news/2025/national-standards-October-2025.aspx","2025-10-13","PACFA National Standards; Mental Health Practitioner career stage; self-regulation"),
    src("Legal123","Counsellor Registration Australia: Legal Guide","https://legal123.com.au/how-to-guide/counsellors-and-therapists","2026-01-01","Unprotected title; PACFA/ACA voluntary registration")],
   "Mental health counsellors (self-regulated). AHPRA regulates psychologists, not counsellors.","3-lens: source real (PACFA/Legal123); measures AU mental-health-counsellor population; in window."),
 cl("A mixed-method study of 13 Ukrainian mental health professionals using a GenAI digital agent (APIA, GPT-3.5/4) found GenAI positively influenced their sense of competence and, to a lesser extent, autonomy in asynchronous online psychotherapy — i.e. AI augments the practitioner rather than replacing the role.",
   "L2","scholarly",
   [src("BMC / Springer","Empowering mental health professionals in asynchronous online psychotherapy with GenAI","https://link.springer.com/article/10.1186/s13033-026-00700-5","2026-01-01","Mixed-methods, n=13; GenAI boosted competence/autonomy of mental health professionals")],
   "Small qualitative study (Ukraine); signals augmentation of practitioner tasks. Not AU.","3-lens: source real (BMC); measures mental-health-professional experience; in window (2026)."),
 cl("The Therabot RCT (2025, N=210) is the first RCT showing a fully Gen-AI chatbot treats clinical-level depressive/anxiety symptoms with alliance comparable to human therapists — the strongest current evidence for automation of the core mental-health-counselling dialogue.",
   "L2","scholarly",
   [src("Heinz et al.","Randomized Trial of a Generative AI Chatbot for Mental Health Treatment (Therabot)","https://gwern.net/doc/psychiatry/depression/2025-heinz.pdf","2025-03-01","RCT N=210; GenAI chatbot vs waitlist; alliance comparable to humans")],
   "US RCT; mild-to-moderate. Core-dialogue exposure; not complex case management.","3-lens: source real (RCT preprint); measures clinical population; in window (2025)."),
 cl("UNSW (2025) reports apps such as Woebot, Wysa and Replika now hold sophisticated two-way mental-health conversations, while warning that chatbots have reinforced suicidal ideation in documented cases — framing both the demand and the risk mental health counsellors navigate.",
   "L3","trade-press-dated",
   [src("UNSW Newsroom","Could you replace your therapist with an AI chatbot?","https://unsw.edu.au/newsroom/news/2025/03/therapist-as-AI-chatbot","2025-03-01","AU: chatbot therapy efficacy + documented harm cases"),
    src("ABC News","AI therapists don't judge, sleep or need an appointment","https://abc.net.au/news/2025-11-07/australians-use-artificial-intelligence-ptsd-trauma-recovery/105946020","2025-11-07","AU: clients using AI for trauma recovery; expert caution")],
   "Australian trade press; practitioner/client framing. Not an employment study.","3-lens: source real (UNSW/ABC); measures AU discourse; in window (2025)."),
],
}

EVIDENCE_QUOTES = {
"21-1011": [
 ("PACFA National Standards","https://pacfa.org.au/portal/portal/News-and-Advocacy/news/2025/national-standards-October-2025.aspx","The finalisation of these Standards ... marks an important milestone for the profession in increasing recognition and remuneration."),
 ("Legal123 (title status)","https://legal123.com.au/how-to-guide/counsellors-and-therapists","'Counsellor' and 'therapist' are unprotected titles in Australia. Anyone can use them."),
 ("PMC meta-analysis","https://ncbi.nlm.nih.gov/pmc/articles/PMC12707440","GenAI chatbots outperform rule-based and retrieval-based chatbots in reducing depressive symptoms."),
 ("Therabot RCT","https://gwern.net/doc/psychiatry/depression/2025-heinz.pdf","therapeutic alliance as comparable to that of human therapists."),
 ("ABC (2025)","https://abc.net.au/news/2025-08-12/how-young-australians-being-impacted-by-ai/105630108","an AI chatbot ... told them to kill themselves."),
],
"21-1012": [
 ("Study Online (UC)","https://studyonline.canberra.edu.au/blog/how-become-school-counsellor-australia","The 2023 Federal Budget allocated $300,000 to develop a baseline for qualifications ... of counsellors and psychotherapists."),
 ("Psychology Board of Australia","https://psychologyboard.gov.au/standards-and-guidelines/registration-standards","Registration standards define the requirements that applicants ... need to meet to obtain or maintain registration."),
 ("medRxiv meta-analysis","https://medrxiv.org/content/10.1101/2025.06.27.25330316v1.full-text","moderate effect sizes (SMD 0.30-0.45) for AI-driven interventions, comparable to low-intensity clinician treatments."),
 ("ABC (2025)","https://abc.net.au/news/2025-05-19/young-australians-using-ai-bots-for-therapy/105296348","'It's a space that's exploding at the moment.'"),
],
"21-1013": [
 ("Legal123 (title status)","https://legal123.com.au/how-to-guide/counsellors-and-therapists","'therapist' is not a protected title ... Joining ACA or PACFA is voluntary but recommended."),
 ("PACFA jobs","https://pacfa.org.au/portal/Portal/Training-and-Careers/Jobs.aspx","Eligibility for PACFA, ACA (Level 3 or 4), AASW or AHPRA registration."),
 ("Therabot RCT","https://gwern.net/doc/psychiatry/depression/2025-heinz.pdf","therapeutic alliance as comparable to that of human therapists."),
 ("ABC (2025)","https://abc.net.au/news/2025-11-07/australians-use-artificial-intelligence-ptsd-trauma-recovery/105946020","AI therapists don't judge, sleep or need an appointment — but experts urge it be used with caution."),
],
"21-1014": [
 ("PACFA National Standards","https://pacfa.org.au/portal/portal/News-and-Advocacy/news/2025/national-standards-October-2025.aspx","Mental Health Practitioners are Clinical Registrants who demonstrate ... Mental Health Competencies."),
 ("BMC (GenAI professionals)","https://link.springer.com/article/10.1186/s13033-026-00700-5","GenAI-based digital agents can positively influence mental health professionals' sense of competence."),
 ("Therabot RCT","https://gwern.net/doc/psychiatry/depression/2025-heinz.pdf","therapeutic alliance as comparable to that of human therapists."),
 ("UNSW (2025)","https://unsw.edu.au/newsroom/news/2025/03/therapist-as-AI-chatbot","chatbots have reinforced suicidal ideation in documented cases."),
],
}

def jobads_from_linkedin(soc: str) -> dict:
    p = REPO / f"data/professions/{soc}/raw/linkedin_l4.json"
    if not p.exists():
        return {"source": "linkedin (unofficial scrape)", "query": soc, "window": f"{WINDOW_FROM} to {WINDOW_TO}",
                "count": 0, "topEmployers": [], "topSkills": [], "note": "LinkedIn fetch unavailable this run."}
    raw = json.loads(p.read_text())
    jobs = raw.get("jobs") or []
    employers = [j.get("company") for j in jobs if j.get("company")]
    return {"source": "linkedin (unofficial scrape)", "query": raw.get("query"),
            "location": raw.get("location", "Australia"), "window": f"{WINDOW_FROM} to {WINDOW_TO}",
            "count": raw.get("returned", len(jobs)), "topEmployers": employers[:10],
            "topSkills": [], "note": "LinkedIn unofficial scrape; demand-side sample, not hire-volume."}

for soc, new_claims in CLAIMS.items():
    ledger = REPO / f"data/professions/{soc}.json"
    d = json.loads(ledger.read_text())
    claims = d.get("claims", [])
    before = len(claims)
    # drop fabricated template claims (guard)
    kept = [c for c in claims if not any(is_fab(s.get("url", ""), soc) for s in c.get("sources", []))]
    dropped = before - len(kept)
    seen = {c.get("text", "") for c in kept}
    n = len(kept)
    for c in new_claims:
        if c["text"] in seen:
            continue
        n += 1
        c["id"] = f"emp{n:02d}"
        kept.append(c)
        seen.add(c["text"])
    d["claims"] = kept
    # jobAds from REAL LinkedIn sample (discard unverified placeholder)
    d["jobAds"] = jobads_from_linkedin(soc)
    # corpus merge (preserve other keys); log Factiva L3 gap
    corpus = d.setdefault("corpus", {})
    srn = corpus.get("searchesReturningNothing", []) or []
    srn.append({"lane": "L3", "source": "factiva", "reason": "auth_expired",
                "date": GEN, "note": "OpenAthens/Factiva session expired (cookies 5d old); L3 trade-press lane supplied via web (ABC/RMIT/UNSW) instead. Gap logged, not evidence of quiet."})
    corpus["searchesReturningNothing"] = srn
    # metadata
    d["researchMethod"] = "empirical-five-lane-v1"
    d["window"] = {"from": WINDOW_FROM, "to": WINDOW_TO}
    d["generated"] = GEN
    d["expires"] = EXPIRES
    l1l2 = sum(1 for c in kept if c.get("lane") in ("L1", "L2"))
    has_l5 = bool(corpus.get("l5Sample"))
    d["confidence"] = "high" if (l1l2 >= 2 and has_l5) else ("medium" if l1l2 >= 1 else "low")
    d["caveats"] = (d.get("caveats", []) or []) + [
        "Factiva L3 trade-press lane degraded (OpenAthens auth expired); L3 claims this run are from open web (ABC/RMIT/UNSW), not Factiva.",
        "L1 regulatory: Australian counsellors/therapists are self-regulated (PACFA/ACA/ARCAP); not AHPRA-statutory except school psychologists.",
        "Adzuna AU count not independently re-verified this run (AU site blocked to extract; Adzuna MCP is UK-only); jobAds built from real LinkedIn sample.",
        "L2 scholarly items are global (US/UK/Europe) studies; scoped as international, not AU employment estimates.",
    ]
    ledger.write_text(json.dumps(d, indent=2, ensure_ascii=False))
    # evidence.md
    ev = [f"# Evidence log - {soc} {d.get('title','')}", "",
          f"Generated {GEN}. Empirical five-lane run (L1/L2/L3 via live web; L4 LinkedIn; L5 last30days).",
          f"Confidence: {d['confidence']}. Claims admitted: {len(kept)} (dropped {dropped} fabricated-template claims).", ""]
    for pub, url, quote in EVIDENCE_QUOTES.get(soc, []):
        ev.append(f"- **{pub}** - {url}")
        ev.append(f"  > {quote}")
    ev.append("")
    ev.append("L5 practitioner-discourse corpus: last30days sweep (reddit, x, youtube, hackernews, github, grounding) over 180 days - see corpus.l5Sample.")
    ev.append("L4 LinkedIn corpus: linkedin-mcp-search unofficial scrape - see corpus.linkedin and jobAds.")
    (REPO / f"data/professions/{soc}/evidence.md").write_text("\n".join(ev))
    print(f"{soc}: kept {len(kept)} (dropped {dropped} fabricated), L1/L2={l1l2}, l5={has_l5}, confidence={d['confidence']}, jobAds count={d['jobAds']['count']}")
print("MERGE DONE")
