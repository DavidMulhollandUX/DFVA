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
EVIDENCE = ROOT / "dfva/source/evidence"

# Deliberately NOT scanned: docs/*.md. Running these rules over docs produced 30
# error findings and all 30 were false positives, because documentation quotes
# the defects it documents — docs/dfva-market-s3-provenance-rewrites.md and
# docs/dfva-v4-report-prose-audit.md exist to record bad sentences. Adding docs
# would fill the baseline with noise and the ratchet would stop meaning anything.
# Revisit only with error-severity rules, and only after re-testing. See
# docs/dfva-copy-audit.md.
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
    "ai-vocabulary/leverage": "a term of art — Meadows *leverage points* in "
                              "docs/compass-systems-thinking.md, and leverage "
                              "ratios in finance material; 10+ hits, all precise",
    "generic-conclusion/Overall": "28 hits, every one the field label "
                                  "'**Overall Section Exposure:**'; the bare-word "
                                  "form is kept, the label form is excluded",
    "unattributed-discourse/consensus study": "a National Academies publication "
                                              "type, not a claim about discourse",
}

# --------------------------------------------------------------------- markup

HTML_COMMENT = re.compile(r"<!--.*?-->", re.S)
FENCED = re.compile(r"```.*?```", re.S)
INLINE_CODE = re.compile(r"`[^`]*`")
LINK = re.compile(r"\[([^\]]*)\]\(([^)]*)\)")
BARE_URL = re.compile(r"https?://\S+")
FOOTREF = re.compile(r"\[\[?\d+\]\]?")
# A quotation may run across a line break; it may not cross a blank line.
# Before 2026-08-24 this excluded \n entirely, so a two-line quotation was never
# masked and every tell inside it was reported — 15 false errors in one file.
QUOTED = re.compile(r"[“\"](?:[^”\"\n]|\n(?!\s*\n)){3,400}[”\"]")
BLOCKQUOTE = re.compile(r"(?m)^\s{0,3}>+ ?")
WORD = re.compile(r"[A-Za-z][A-Za-z'-]*")


def _blank(m) -> str:
    """Same-length, same-line-count replacement.

    Every strip below blanks rather than deletes. Deleting shifts offsets and
    swallows newlines, which is why reported line numbers used to be wrong for
    everything after the first table, heading or fenced block.
    """
    return "".join("\n" if c == "\n" else " " for c in m.group(0))


def _blank_link(m) -> str:
    """Keep the link text, blank the target, preserve total length."""
    return " " + m.group(1) + " " * (len(m.group(2)) + 3)


def strip_markup(t: str) -> str:
    t = HTML_COMMENT.sub(_blank, t)
    t = FENCED.sub(_blank, t)
    t = INLINE_CODE.sub(_blank, t)
    t = LINK.sub(_blank_link, t)
    t = FOOTREF.sub(_blank, t)
    t = BARE_URL.sub(_blank, t)
    t = BLOCKQUOTE.sub(_blank, t)
    return re.sub(r"[*_]{1,3}", _blank, t)


def mask_quotes(t: str) -> str:
    """Blank quoted spans, preserving offsets.

    Handbook verbatim and quoted discourse must never be flagged as our prose.
    """
    return QUOTED.sub(_blank, t)


def mask_code_and_comments(t: str) -> str:
    """For rules that read raw text: blank spans that only *describe* a defect.

    A document that documents the linter writes the literal string it detects
    inside backticks. That is a reference, not an occurrence.
    """
    t = HTML_COMMENT.sub(_blank, t)
    t = FENCED.sub(_blank, t)
    return INLINE_CODE.sub(_blank, t)



def body_only(t: str) -> str:
    """Drop the reference list — shared citations are not authored prose."""
    m = re.search(r"(?mi)^#+\s*(\d+\.\s*)?(references|sources|bibliography)\b", t)
    return t[: m.start()] if m else t


def prose_lines(t: str) -> str:
    """Blank table rows, headings and fenced blocks; keep every line in place."""
    out = []
    fence = False
    for ln in HTML_COMMENT.sub(_blank, t).split("\n"):
        if ln.lstrip().startswith("```"):
            fence = not fence
            out.append("")
            continue
        if fence or ln.strip().startswith(("|", "#")):
            out.append("")
            continue
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
               r"\b(the|an?|growing|emerging|broad|wide)\s+consensus\b(?!\s+stud)",
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
               r"synerg\w+|transformative|paramount|multifaceted|myriad|"
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
               # "Overall" alone fired 28 times and every hit was the field
               # label "**Overall Section Exposure:**" in a research-degree
               # report. Keep the word, exclude the label form.
               r"(?m)^\s*(In conclusion|To sum up|Ultimately)\b",
               r"(?m)^\s*Overall\b(?!\s+[A-Z][\w ]{0,40}:)"]),

    # ---- Google developer documentation style (style) ---------------------
    dict(id="directional-language", sev="style", genres=None,
         desc="'above'/'below' does not survive translation or a screen reader",
         fix="use 'preceding'/'following', or name the section",
         scope="prose",
         pats=[r"\b(table|diagram|figure|section|chart|list|image|evidence|data|"
               r"roles?|signals?)\s+(above|below)\b",
               r"\bas (shown|described|noted|set out) (above|below)\b",
               r"\bsee (above|below)\b", r"\b(above|below)[,.]"]),
    # No heading-case rule: the report families' ALL-CAPS numbered headings
    # ("## 4. MARKET EVIDENCE") are house form (DJ, 2026-09-02), so the Google
    # sentence-case rule does not apply to reports/ headings.
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
          ("dfva-market-", "market"),
          # Archived v1, faculty and research-degree reports. 135 of them still
          # compile into reportContent/ and resolve at /reports/archive, so they
          # reach a reader and belong in the check. They are archived, not
          # maintained, so they carry the error rules only — see LEGACY_SEVERITY.
          ("dfva-", "legacy"))

# Archived reports are held to truth, not to house style. Running the full rule
# set over them yields ~1,600 style findings, almost all the ALL-CAPS heading
# form the check already accepts elsewhere, which would bury the ratchet.
LEGACY_SEVERITY = {"error"}


def genre_of(name: str):
    for pre, g in GENRES:
        if name.startswith(pre):
            return g, name[len(pre): -3]
    return None, None


def heading_findings(headings):
    """Question-heading check. Heading case is house form and not checked."""
    out = []
    for h in headings:
        m = re.match(r"^#+\s+(.*)$", h)
        if not m:
            continue
        raw = m.group(1).strip()
        core = re.sub(r"^\d+(\.\d+)*\.?\s*", "", strip_markup(raw)).strip()
        if core.rstrip().endswith("?"):
            out.append(("question-heading", raw))
    return out


def scan(path: Path):
    raw_full = path.read_text(encoding="utf-8")
    raw = body_only(raw_full)
    prose_src = strip_markup(prose_lines(raw))
    prose = mask_quotes(prose_src)
    raw_masked = mask_quotes(mask_code_and_comments(raw))
    genre, code = genre_of(path.name)
    heads = headings_of(raw)
    findings = []

    for rule in RULES:
        if rule["genres"] and genre not in rule["genres"]:
            continue
        if rule["scope"] == "headings":
            continue
        text = {"raw": raw_masked, "prose": prose}[rule["scope"]]
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

    if genre == "legacy":
        findings = [f for f in findings if f["sev"] in LEGACY_SEVERITY]

    words = WORD.findall(prose_src)
    return {"file": path.name, "genre": genre, "code": code,
            "words": len(words), "findings": findings}


# --------------------------------------------------------------- evidence
# dfva/source/evidence/*.json is ~165k authored words that render on every v4
# report page via v4PanelC.ts and dimensionEvidence.ts. Scan the fields WE write.
#
# Never scan a verbatim field. evidenceLines and its kin hold handbook text
# quoted as proof; json.loads has already removed the quotation marks, so
# mask_quotes cannot protect them. Scanning every leaf produced 62 warns and
# 1 error on this corpus, all false; scanning authored fields only gives 9 and 0.
AUTHORED_FIELDS = {"rationale", "note", "notes", "basis", "ambiguities",
                   "caveat", "caveats", "summary", "interpretation"}
VERBATIM_FIELDS = {"evidenceLines", "quote", "quotes", "anchor", "anchorText",
                   "verbatim", "excerpt", "sourceText", "url", "sources"}


def authored_strings(node, path="", out=None):
    """Collect (json-path, text) for every authored prose leaf."""
    out = [] if out is None else out
    if isinstance(node, dict):
        for k, v in node.items():
            if k in VERBATIM_FIELDS:
                continue
            authored_strings(v, f"{path}.{k}" if path else k, out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            authored_strings(v, f"{path}[{i}]", out)
    elif isinstance(node, str):
        leaf = path.split(".")[-1].split("[")[0]
        if leaf in AUTHORED_FIELDS and len(node.split()) >= 5:
            out.append((path, node))
    return out


def scan_evidence(path: Path):
    """Prose-scope rules over authored evidence fields. Genre 'evidence'."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {"file": path.name, "genre": "evidence", "code": path.stem,
                "words": 0, "findings": []}
    findings, words = [], 0
    for keypath, text in authored_strings(data):
        prose_src = strip_markup(text)
        prose = mask_quotes(prose_src)
        words += len(WORD.findall(prose_src))
        for rule in RULES:
            if rule["genres"] or rule["scope"] != "prose":
                continue
            seen = set()
            for pat in rule["pats"]:
                for m in re.finditer(pat, prose, re.I):
                    key = (m.start() // 12, m.end() // 12)
                    if key in seen:
                        continue
                    seen.add(key)
                    findings.append({
                        "rule": rule["id"], "sev": rule["sev"], "line": 0,
                        "field": keypath,
                        "match": " ".join(m.group(0).split())[:90],
                        "desc": rule["desc"], "fix": rule["fix"],
                    })
    return {"file": path.name, "genre": "evidence", "code": path.stem,
            "words": words, "findings": findings}


def key_of(f, res):
    return f"{res['file']}::{f['rule']}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="report tracked debt too")
    ap.add_argument("--file", help="scan a single report")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--write-baseline", action="store_true")
    ap.add_argument("--severity", default="error,warn,style")
    ap.add_argument("--no-evidence", action="store_true",
                    help="skip dfva/source/evidence/*.json")
    a = ap.parse_args()
    want = set(a.severity.split(","))

    if a.file:
        one = (EVIDENCE if a.file.endswith(".json") else REPORTS) / a.file
        results = [scan_evidence(one) if a.file.endswith(".json") else scan(one)]
    else:
        files = [f for f in sorted(REPORTS.glob("dfva-*.md")) if genre_of(f.name)[0]]
        results = [scan(f) for f in files]
        if not a.no_evidence:
            results += [scan_evidence(f) for f in sorted(EVIDENCE.glob("*.json"))]

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
            loc = (f"L{f['line']}" if f["line"]
                   else f.get("field") or "heading")
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
