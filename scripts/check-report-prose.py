#!/usr/bin/env python3
"""Prose review for DFVA report markdown.

Read-only. Complements `dfva:report-lint`, which checks structure and sourcing.
This checks how the prose reads: machine-authorship tells (the `deslop` skill)
and developer-documentation style (Google's style guide), scoped to the register
each report genre is actually written in.

    python3 scripts/check-report-prose.py                # ratchet mode
    python3 scripts/check-report-prose.py --all          # every finding
    python3 scripts/check-report-prose.py --file X.md    # one report
    python3 scripts/check-report-prose.py --json         # machine-readable
    python3 scripts/check-report-prose.py --write-baseline

Ratchet mode is the default and the one CI runs: findings already recorded in
`scripts/report-prose-baseline.json` are printed as tracked debt and do not fail
the build; anything new fails. This mirrors the grandfathering in
`check-report-format.ts` so the check can land without rewriting 96 reports.

Every rule here was validated against the corpus before being included. Checks
that produced false positives on this material were removed rather than tuned,
and the reasons are recorded in RETIRED below so nobody re-adds them.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPORTS = ROOT / "reports"
BASELINE = Path(__file__).resolve().parent / "report-prose-baseline.json"

# Checks deliberately NOT implemented, with the false positive that killed them.
RETIRED = {
    "noun-stack": "regex matched 'the identical', 'a', 'the extract assesses the division'",
    "lazy-extremes": "'the sub-scores are never added' is a precise method statement",
    "exclamation": "every hit was an HTML comment marker '<!--'",
    "em-dash-count": "the house uses '—' to separate a verdict from its reason in "
                     "table cells; prose-only density is 10.6-21.6/1k, which is style",
    "second-person": "Google prefers 'you'; these are institutional assessments "
                     "addressed about a program, not instructions to a reader",
    "american-spelling": "house style is Australian (UoM); a deliberate deviation",
}

# --------------------------------------------------------------------- markup

HTML_COMMENT = re.compile(r"<!--.*?-->", re.S)
FENCED = re.compile(r"```.*?```", re.S)
INLINE_CODE = re.compile(r"`[^`]*`")
LINK = re.compile(r"\[([^\]]*)\]\(([^)]*)\)")
BARE_URL = re.compile(r"https?://\S+")
FOOTREF = re.compile(r"\[\[?\d+\]\]?")
QUOTED = re.compile(r"[“\"][^”\"\n]{3,400}[”\"]")
WORD = re.compile(r"[A-Za-z][A-Za-z'-]*")


def strip_markup(t: str) -> str:
    t = HTML_COMMENT.sub(" ", t)
    t = FENCED.sub(" ", t)
    t = INLINE_CODE.sub(" ", t)
    t = LINK.sub(lambda m: m.group(1), t)
    t = FOOTREF.sub(" ", t)
    t = BARE_URL.sub(" ", t)
    return re.sub(r"[*_]{1,3}", "", t)


def mask_quotes(t: str) -> str:
    """Blank quoted spans, preserving offsets.

    Handbook verbatim and quoted discourse must never be flagged as our prose.
    """
    return QUOTED.sub(lambda m: " " * len(m.group(0)), t)


def body_only(t: str) -> str:
    """Drop the reference list — shared citations are not authored prose."""
    m = re.search(r"(?mi)^#+\s*(\d+\.\s*)?(references|sources|bibliography)\b", t)
    return t[: m.start()] if m else t


def prose_lines(t: str) -> str:
    out = []
    fence = False
    for ln in HTML_COMMENT.sub("", t).split("\n"):
        if ln.startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        s = ln.strip()
        if not s.startswith(("|", "#")):
            out.append(ln)
    return "\n".join(out)


def headings_of(t: str) -> list[str]:
    return [ln.strip() for ln in HTML_COMMENT.sub("", t).split("\n")
            if ln.strip().startswith("#")]


# ---------------------------------------------------------------------- rules
# severity: "error"   — a truth or provenance defect; must not ship
#           "warn"    — a prose tell worth an author's judgement
#           "style"   — a Google deviation the house may knowingly decline

DISCOURSE_NOUN = (r"(professional |industry |online |practitioner |sector |public "
                  r"|emerging |growing |ongoing |repeated |active |academic )?"
                  r"(discourse|discussion|conversation|commentary|consensus|"
                  r"sentiment|chatter|debate|threads?)")

RULES = [
    # ---- provenance and evidence (errors) ---------------------------------
    dict(id="platform-provenance-heading", sev="error", genres={"market"},
         desc="§3 heading asserts a platform sample ('(X)') that was not performed",
         fix="use '## 3. CURRENT DISCUSSION SIGNALS — <LEVEL> CONFIDENCE'",
         scope="raw",
         pats=[r"(?m)^##\s*3\..*\(X\)"]),
    dict(id="platform-sampling-claim", sev="error", genres={"market"},
         desc="body states a platform's users/threads were observed",
         fix="name the trade-press or study that reported it, or drop the claim",
         scope="prose",
         pats=[r"\b(Twitter/X|LinkedIn|Reddit)\b\s+(and\s+\w+\s+)?"
               r"(are|is|communities|practitioners|threads|discussion|debate|users|posts)\b"]),
    dict(id="unattributed-discourse", sev="error", genres={"market"},
         desc="a discourse noun is the subject of a claim, with no source behind it",
         fix="name the outlet, commentator or study, with a date",
         scope="prose",
         pats=[rf"\b{DISCOURSE_NOUN}\s+(emphasis|emphasises|emphasizes|notes?|"
               r"acknowledges?|suggests?|indicates?|frames?|argues?|reports?|holds?|"
               r"reveals?|shows?|confirms?|centres?|centers?|focuses)\b",
               r"\b(the|an?|growing|emerging|broad|wide)\s+consensus\b",
               r"\bthere is (growing|broad|wide|increasing|active)\b",
               r"\b(widely|commonly|generally) (reported|discussed|held|believed|accepted)\b",
               r"\b(many|some|most) (practitioners|employers|academics|commentators|"
               r"professionals) (say|report|note|argue|believe)\b"]),
    # Only a WHOLLY quoted heading is a fabricated quotation. A quoted term
    # inside a longer heading — "Mission Drift" Tension…, Sustainability Is the
    # "New Lean" — is a scare-quoted term of art, which is legitimate and was a
    # false-positive class in the first version of this rule.
    dict(id="quoted-theme-without-source", sev="error", genres={"market"},
         desc="a theme heading is presented as a quotation with nobody quoted",
         fix="attribute the quote, or restate it as an unquoted claim",
         scope="raw",
         pats=[r"(?m)^\*\*Theme \d+ [—-] [\"“][^\"”]+[\"”]\.?\*\*\s*$",
               r"(?m)^### Theme \d+ [—-] [\"“][^\"”]+[\"”]\.?\s*$"]),
    dict(id="vague-attribution", sev="error", genres=None,
         desc="opinion attributed to a phantom authority",
         fix="name the source or cut the claim",
         scope="prose",
         pats=[r"\bexperts (believe|argue|say|suggest)\b", r"\bresearch suggests\b",
               r"\bstudies show\b", r"\bindustry reports? suggest\b",
               r"\bit is widely (believed|held|accepted)\b",
               r"\bit is generally (accepted|agreed)\b"]),
    dict(id="placeholder-text", sev="error", genres=None,
         desc="placeholder or authoring scaffold left in the draft",
         fix="fill it in or delete it",
         scope="raw",
         pats=[r"\[(Your Name|INSERT[^\]]*|TODO|TBD|PLACEHOLDER)\]",
               r"\bTO BE AUTHORED\b", r"\b20\d\d-XX-XX\b"]),
    dict(id="chatbot-artifact", sev="error", genres=None,
         desc="assistant correspondence pasted in as content",
         fix="delete on sight",
         scope="prose",
         pats=[r"\bI hope this helps\b", r"\bLet me know if you'?d like\b",
               r"\bWould you like me to\b", r"\bFeel free to\b",
               r"\bGreat question\b", r"\bCertainly!", r"\bAbsolutely!"]),
    dict(id="citation-markup-leak", sev="error", genres=None,
         desc="citation markup or AI tool tracking left in the text",
         fix="delete the markup; add a real reference if it mattered",
         scope="raw",
         pats=[r"citeturn\d", r"oaicite", r"contentReference",
               r"utm_source=(chatgpt|openai|copilot)", r"referrer=grok"]),

    # ---- machine-authorship tells (warnings) ------------------------------
    dict(id="participle-tail", sev="warn", genres=None,
         desc="a present-participle tail asserts an unsourced cause",
         fix="state the causal claim as its own sentence, with a source, or cut it",
         scope="prose",
         pats=[r",\s+(highlighting|underscoring|emphasising|emphasizing|reflecting|"
               r"symbolising|symbolizing|fostering|encompassing|showcasing|"
               r"solidifying|cementing|signalling|signaling)\b"]),
    dict(id="symbolic-gloss", sev="warn", genres=None,
         desc="narrating the meaning of a fact instead of trusting the fact",
         fix="state the fact; let the reader judge what it represents",
         scope="prose",
         pats=[r"\bthis represents (a|an|the)\b", r"\bthis reflects (a|an|the)\b",
               r"\bthis signals (a|an|the)\b", r"\bthis speaks to\b"]),
    dict(id="significance-inflation", sev="warn", genres=None,
         desc="claims an arbitrary thing represents a wider trend",
         fix="say what happened; drop the significance clause",
         scope="prose",
         pats=[r"\bis a testament to\b", r"\breflects? (a )?broader\b",
               r"\b(a|the) (vital|crucial|pivotal) (role|moment|step)\b",
               r"\bunderscor\w+ (the|its) importance\b",
               r"\bsetting the stage for\b", r"\bevolving landscape\b",
               r"\bmarks? a (pivotal|significant|turning)\b"]),
    dict(id="negative-parallelism", sev="warn", genres=None,
         desc="'not X, it's Y' — rhetoric standing in for a claim",
         fix="state Y directly",
         scope="prose",
         pats=[r"\bnot only\b[^.]{0,80}\bbut (also )?",
               r"\bit('s| is| was) not (just|merely|only)\b[^.]{0,60}\bit('s| is| was)\b",
               r"\bThe \w+ is not\b[^.]{0,60}\.\s+It is\b",
               r"\bnot because\b[^.]{0,60}\bbut because\b",
               r"\bis less (about|a)\b[^.]{0,60}\bthan (about|a)\b"]),
    dict(id="negative-listing", sev="warn", genres=None,
         desc="a rhetorical striptease before the point",
         fix="state the point once",
         scope="prose",
         pats=[r"\bnever have \w+[^.]{0,70}, never have \w+[^.]{0,70}, and never\b",
               r"\bNot (a|an) [A-Za-z ]{2,25}\.\s+Not (a|an)\b"]),
    dict(id="aphorism", sev="warn", genres=None,
         desc="an ordinary claim dressed as reusable wisdom",
         fix="rewrite as the concrete claim it gestures at",
         scope="prose",
         pats=[r"\bis the new [A-Z]?\w+\b", r"\bthe currency of\b",
               r"\bin the age of\b", r"\bthe new frontier\b"]),
    dict(id="ai-vocabulary", sev="warn", genres=None,
         desc="tier-1 vocabulary that rarely survives in edited human prose",
         fix="use the plain word",
         scope="prose",
         pats=[r"\b(delve|tapestry|pivotal|realm|intricac\w+|interplay|showcas\w+|"
               r"foster\w*|garner\w*|vibrant|meticulous|seamless\w*|groundbreaking|"
               r"leverag\w+|synerg\w+|transformative|paramount|multifaceted|myriad|"
               r"plethora|cornerstone|empower\w*|nestled|actionable|impactful|"
               r"learnings|embark|renowned|invaluable|game-chang\w+)\b"]),
    dict(id="filler-phrase", sev="warn", genres=None,
         desc="a wordy connector that deletes cleanly",
         fix="use the short form",
         scope="prose",
         pats=[r"\bin order to\b", r"\bdue to the fact that\b",
               r"\bat this point in time\b", r"\bhas the ability to\b",
               r"\bit is (important|worth) (to note|noting) that\b",
               r"\bwhen it comes to\b", r"\bin terms of\b",
               r"\bat its core\b", r"\bfirst and foremost\b",
               r"\b(going|moving) forward\b", r"\bthat being said\b"]),
    dict(id="signposting", sev="warn", genres=None,
         desc="announcing the writing instead of doing it",
         fix="delete the announcement; state the finding",
         scope="prose",
         pats=[r"\blet'?s (dive|explore|break this down|unpack|delve)\b",
               r"\bin this (article|section|report),? (we|I) will\b",
               r"\bhere'?s what you need to know\b", r"\bas we('| wi)ll see\b"]),
    dict(id="generic-conclusion", sev="warn", genres=None,
         desc="generic uplift or a recap the reader just read",
         fix="end on the last concrete fact",
         scope="prose",
         pats=[r"\bthe future looks bright\b", r"\bexciting times\b",
               r"\ba step in the right direction\b", r"\bonly time will tell\b",
               r"\bposied for growth\b", r"\bpoised for growth\b",
               r"(?m)^\s*(In conclusion|To sum up|Overall|Ultimately)\b"]),

    # ---- Google developer documentation style (style) ---------------------
    dict(id="directional-language", sev="style", genres=None,
         desc="'above'/'below' does not survive translation or a screen reader",
         fix="use 'preceding'/'following', or name the section",
         scope="prose",
         pats=[r"\b(table|diagram|figure|section|chart|list|image|evidence|data|"
               r"roles?|signals?)\s+(above|below)\b",
               r"\bas (shown|described|noted|set out) (above|below)\b",
               r"\bsee (above|below)\b", r"\b(above|below)[,.]"]),
    dict(id="heading-not-sentence-case", sev="style", genres=None,
         desc="Google asks for sentence case in titles and headings",
         fix="sentence case, keeping proper nouns and program codes",
         scope="headings", pats=[]),
    dict(id="question-heading", sev="style", genres=None,
         desc="question-format section title in long-form prose",
         fix="use a statement heading",
         scope="headings", pats=[]),
    dict(id="note-that", sev="style", genres=None,
         desc="'note that' tells the reader to notice instead of stating the thing",
         fix="state the thing",
         scope="prose",
         pats=[r"(?m)(^|\.\s+|but |and )[Nn]ote that\b", r"\bplease note\b"]),
    dict(id="minimising-language", sev="style", genres=None,
         desc="'simply' and 'obviously' minimise the reader's difficulty",
         fix="cut the word",
         scope="prose",
         pats=[r"\bsimply\b", r"\bobviously\b", r"\bstraightforward\b",
               r"\bit'?s easy\b"]),
    dict(id="latinate-over-plain", sev="style", genres=None,
         desc="a long word where a plain one is precise enough",
         fix="before, use, start, about",
         scope="prose",
         pats=[r"\butilis[ei]", r"\butiliz[ei]", r"\bcommence", r"\bprior to\b",
               r"\bsubsequent to\b", r"\bin excess of\b", r"\bat present\b"]),
    dict(id="vague-link-text", sev="style", genres=None,
         desc="link text that means nothing read in isolation",
         fix="describe the destination",
         scope="raw",
         pats=[r"\[(here|click here|this|this link|read more|more|link|"
               r"see here|this document|this page)\]\("]),
    dict(id="ambiguous-date", sev="style", genres=None,
         desc="a date format that reads differently by region",
         fix="use ISO (2026-08-24) or '24 August 2026'",
         scope="prose",
         pats=[r"\b\d{1,2}/\d{1,2}/\d{2,4}\b"]),
]

GENRES = (("dfva-v4-recommend-", "recommend"),
          ("dfva-v4-", "v4report"),
          ("dfva-market-", "market"))


def genre_of(name: str):
    for pre, g in GENRES:
        if name.startswith(pre):
            return g, name[len(pre): -3]
    return None, None


def heading_findings(headings):
    """Sentence-case and question-heading checks, acronym-aware."""
    out = []
    for h in headings:
        m = re.match(r"^#+\s+(.*)$", h)
        if not m:
            continue
        raw = m.group(1).strip()
        core = re.sub(r"^\d+(\.\d+)*\.?\s*", "", strip_markup(raw)).strip()
        if core.rstrip().endswith("?"):
            out.append(("question-heading", raw))
        toks = [w for w in WORD.findall(core) if len(w) > 2]
        if not toks:
            continue
        # An all-caps run of 2+ real words is house shouting, not an acronym.
        if len([w for w in toks if w.isupper()]) >= 2:
            out.append(("heading-not-sentence-case", raw))
            continue
        rest = toks[1:]
        tc = [w for w in rest if w[0].isupper() and not w.isupper()]
        if len(rest) >= 3 and len(tc) / len(rest) >= 0.6:
            out.append(("heading-not-sentence-case", raw))
    return out


def scan(path: Path):
    raw_full = path.read_text(encoding="utf-8")
    raw = body_only(raw_full)
    prose_src = strip_markup(prose_lines(raw))
    prose = mask_quotes(prose_src)
    genre, code = genre_of(path.name)
    heads = headings_of(raw)
    findings = []

    for rule in RULES:
        if rule["genres"] and genre not in rule["genres"]:
            continue
        if rule["scope"] == "headings":
            continue
        text = {"raw": raw, "prose": prose}[rule["scope"]]
        seen = set()
        for p in rule["pats"]:
            for m in re.finditer(p, text, re.I):
                key = (m.start() // 12, m.end() // 12)
                if key in seen:
                    continue
                seen.add(key)
                line = text[: m.start()].count("\n") + 1
                findings.append({
                    "rule": rule["id"], "sev": rule["sev"], "line": line,
                    "match": " ".join(m.group(0).split())[:90],
                    "desc": rule["desc"], "fix": rule["fix"],
                })

    by_id = {r["id"]: r for r in RULES}
    for rid, txt in heading_findings(heads):
        r = by_id[rid]
        findings.append({"rule": rid, "sev": r["sev"], "line": 0,
                         "match": txt[:90], "desc": r["desc"], "fix": r["fix"]})

    words = WORD.findall(prose_src)
    return {"file": path.name, "genre": genre, "code": code,
            "words": len(words), "findings": findings}


def key_of(f, res):
    return f"{res['file']}::{f['rule']}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="report tracked debt too")
    ap.add_argument("--file", help="scan a single report")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--write-baseline", action="store_true")
    ap.add_argument("--severity", default="error,warn,style")
    a = ap.parse_args()
    want = set(a.severity.split(","))

    files = [REPORTS / a.file] if a.file else sorted(REPORTS.glob("dfva-*.md"))
    files = [f for f in files if genre_of(f.name)[0]]
    results = [scan(f) for f in files]

    base = set()
    if BASELINE.exists() and not a.write_baseline:
        base = set(json.loads(BASELINE.read_text())["known"])

    if a.write_baseline:
        known = sorted({key_of(f, r) for r in results for f in r["findings"]})
        BASELINE.write_text(json.dumps(
            {"note": "Tracked prose debt. New reports must not add keys. "
                     "Remove a key when the report is fixed.",
             "generated_from": f"{len(results)} reports",
             "known": known}, indent=1) + "\n")
        print(f"baseline written: {len(known)} tracked findings "
              f"across {len(results)} reports -> {BASELINE.name}")
        return 0

    new, tracked = [], []
    for r in results:
        for f in r["findings"]:
            if f["sev"] not in want:
                continue
            (tracked if key_of(f, r) in base else new).append((r, f))

    if a.json:
        json.dump({"results": results,
                   "new": [{"file": r["file"], **f} for r, f in new],
                   "tracked": len(tracked)}, sys.stdout, indent=1)
        return 1 if any(f["sev"] == "error" for _, f in new) else 0

    counts = Counter(f["rule"] for _, f in new + tracked)
    print(f"Scanned {len(results)} reports "
          f"({sum(r['words'] for r in results):,} prose words)\n")

    if a.all and tracked:
        print(f"Tracked debt ({len(tracked)} findings, not a failure):")
        per = defaultdict(list)
        for r, f in tracked:
            per[f["rule"]].append(r["file"])
        for rid, fl in sorted(per.items(), key=lambda kv: -len(kv[1])):
            print(f"  · {rid}: {len(fl)} findings across "
                  f"{len(set(fl))} reports")
        print()

    if new:
        print(f"NEW findings ({len(new)}):")
        cur = None
        for r, f in sorted(new, key=lambda x: (x[0]["file"], x[1]["line"])):
            if r["file"] != cur:
                cur = r["file"]
                print(f"\n  {cur}")
            loc = f"L{f['line']}" if f["line"] else "heading"
            print(f"    [{f['sev']:5}] {loc:>7}  {f['rule']}: {f['match']}")
            print(f"                     → {f['fix']}")
        errs = sum(1 for _, f in new if f["sev"] == "error")
        print(f"\n{len(new)} new finding(s), {errs} of them errors.")
        return 1 if errs else 0

    print("No new prose findings.")
    if tracked and not a.all:
        print(f"({len(tracked)} tracked findings — run with --all to see them.)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
