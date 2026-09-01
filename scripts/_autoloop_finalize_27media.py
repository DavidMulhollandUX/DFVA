#!/usr/bin/env python3.12
"""Finalize the 4-SOC media/words cluster: set the empirical-five-lane-v1 marker,
refresh generated/expires, log the L5 grounding 'unreachable' coverage gap, and write
evidence.md (verbatim source log, one short quote per source used this run).

Runs BEFORE the L5 --store re-fold so the marker is present; L5 claims are added later
by l5_fold and remain consistent with the marker. Idempotent on the marker + gap.
"""
import json, datetime as dt
from pathlib import Path

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
PROF = REPO / "data" / "professions"
TODAY = "2026-08-31"
EXPIRES = "2027-02-28"  # +6 months

# Per-SOC L1 source (real, observed this run).
L1_SRC = {
    "27-3043": ("Australian Society of Authors", "https://www.asauthors.org.au/advocacy/copyright/",
                "The Copyright Act has been the subject of reform discussions for a decade and the ASA's role is to represent the interests of authors and illustrators in all matters touching copyright."),
    "27-3042": ("Jobs and Skills Australia (OSCA 231334)", "https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles/occupations-osca/231334-technical-writer",
                "No licensing or registration requirements are listed for this occupation."),
    "27-3041": ("Institute of Professional Editors", "https://www.iped-editors.org/",
                "IPEd manages an accreditation scheme, delivers professional development, and maintains the IPEd standards for editing practice."),
    "27-3031": ("Communication and Public Relations Australia", "https://www.cpra.org.au/",
                "Communication and Public Relations Australia (CPRA, formerly PRIA) delivers industry-leading training, networking and knowledge, and accreditation for PR practitioners."),
}
TITLES = {"27-3043": "Writers and Authors", "27-3042": "Technical Writers",
          "27-3041": "Editors", "27-3031": "Public Relations Specialists"}

GROUNDING_GAP = {"lane": "L5", "source": "last30days-grounding", "status": "unreachable",
                 "detail": "last30days grounding (keyless web search) returned unreachable this run; reddit/x/youtube/hackernews/github supplied L5 items. Recorded as coverage, not a finding.",
                 "date": TODAY}


def evidence_md(soc, l1_pub, l1_url, l1_quote):
    t = TITLES[soc]
    return f"""# Evidence log — {t} ({soc})

Generated {TODAY} by the DFVA profession deep-research autoloop (empirical five-lane run).
Method: L1 regulatory/standards, L2 scholarly/institutional, L3 trade press (Factiva),
L4 demand-side job ads, L5 practitioner discourse. One short quote per source.

## L1 — Regulatory / standards
- {l1_pub}: {l1_url}
  > {l1_quote}
  (Writing/editing/PR are self-regulated or unlicensed occupations in Australia; the
  relevant peak body or official occupation profile is cited, not a statutory licence.)

## L2 — Scholarly / institutional
- Jobs and Skills Australia, "Australia's AI Transition: Jobs, Skills and the Future of Work"
  (Overarching Report 14 Aug 2025; Final Release 30 Sep 2025):
  https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study
  > Gen AI is more likely to augment human work than replace it.
- The Conversation, "These 3 charts show female-dominated jobs are actually the most exposed to AI"
  (academic analysis of JSA exposure data):
  https://theconversation.com/these-3-charts-show-female-dominated-jobs-are-actually-the-most-exposed-to-ai-288103
  > Clerical and administrative jobs are among those with the highest automation exposure scores.

## L3 — Trade press (Factiva)
- NOT SAMPLED this run: OpenAthens/Factiva session expired (auth_expired). Logged to
  data/professions/factiva_backlog.json for attended backfill. No fabricated L3 content.

## L4 — Demand-side job ads
- Adzuna AU (live all-time index, query = occupation title): count recorded in jobAds.adzuna.
- LinkedIn postings (unofficial scrape, provenance tagged): live postings recorded in corpus.linkedin.
- Seek trend pages and last30days --hiring-signals: not sampled this run (graceful degrade).

## L5 — Practitioner discourse (last30days)
- Engine swept reddit, x, youtube, hackernews, github, grounding over a 180-day window
  (--as-of {TODAY}). grounding was unreachable (keyless web search); the other sources
  returned items, folded as L5 claims (corpus.l5Sample). Declared sample replaces the
  "no platform was sampled" sentence in market §3.
"""


def main():
    for soc in L1_SRC:
        p = PROF / f"{soc}.json"
        d = json.loads(p.read_text())
        # Marker + dates.
        d["researchMethod"] = "empirical-five-lane-v1"
        d["generated"] = TODAY
        d["expires"] = EXPIRES
        # L5 grounding gap (idempotent).
        corpus = d.setdefault("corpus", {})
        srn = corpus.setdefault("searchesReturningNothing", [])
        if not any(g.get("lane") == "L5" and g.get("source") == "last30days-grounding" for g in srn):
            srn.append(GROUNDING_GAP)
        p.write_text(json.dumps(d, indent=2, ensure_ascii=False))
        # evidence.md
        l1_pub, l1_url, l1_quote = L1_SRC[soc]
        (PROF / soc / "evidence.md").write_text(evidence_md(soc, l1_pub, l1_url, l1_quote))
        print(f"[{soc}] marker set; evidence.md written; grounding gap logged")


if __name__ == "__main__":
    main()
