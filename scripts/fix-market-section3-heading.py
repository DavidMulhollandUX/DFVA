#!/usr/bin/env python3
"""Replace the '(X)' suffix on market report §3 headings with a confidence level.

The suffix asserts that the section's signals were sampled from the platform X.
No sample was performed: the same files state "live scrape unavailable" and list
trade press and published reports as their sources. See
docs/dfva-v4-report-prose-audit.md, Finding 1, and the house form in
docs/dfva-report-section-authoring.md.

    ## 3. CURRENT DISCUSSION SIGNALS (X)
    ## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

This removes a false provenance claim. It changes no argument, evidence, number
or citation, and it does not add a claim of any kind.

    python3 scripts/fix-market-section3-heading.py            # dry run (default)
    python3 scripts/fix-market-section3-heading.py --apply    # write the files

Level is taken from the `**Confidence: LEVEL**` line inside the section body
where one exists. Where none exists the level is LOW, because a section with no
stated confidence and no sourcing declaration has not earned MEDIUM. Anything
that does not resolve to a known level is skipped and reported, never guessed.

Safe against the lint: check-report-format.ts splits on the heading *prefix*
(`^#{2,3} (?:\\d+\\. )?CURRENT DISCUSSION SIGNALS`), so the suffix is free.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPORTS = ROOT / "reports"

# `[ \t]*` not `\s*` — \s matches newlines, so a trailing \s*$ swallows the blank
# line after the heading and silently reflows the file. Caught on the first apply.
# Two spellings of the same claim: a bare "(X)", and the explicit
# "(professional discourse on X)" — which may already carry a level suffix.
# Both assert the platform; both go.
HEADING = re.compile(
    r"^(#{2,3} (?:\d+\. )?CURRENT DISCUSSION SIGNALS)[ \t]*"
    r"\((?:X|professional discourse on X)\)"
    r"(?:[ \t]*—[ \t]*[A-Za-z/-]+[ \t]+CONFIDENCE)?[ \t]*$", re.M)
NEXT_SECTION = re.compile(
    r"^#{2,3} (?:\d+\. )?(?:SKILL SHIFT SUMMARY|CURRICULUM IMPLICATIONS"
    r"|EVIDENCE CONFIDENCE|INDICATIVE SALARY)", re.M)
CONFIDENCE = re.compile(r"\*\*Confidence:\s*([A-Za-z/-]+)")

VALID = {"LOW", "MEDIUM", "HIGH", "LOW-MEDIUM", "MEDIUM-HIGH"}
DEFAULT = "LOW"


def level_for(text: str, start: int) -> tuple[str, str]:
    """Return (level, why). Search only the section's own body."""
    rest = text[start:]
    nxt = NEXT_SECTION.search(rest)
    body = rest[: nxt.start()] if nxt else rest
    m = CONFIDENCE.search(body)
    if not m:
        return DEFAULT, "no confidence line in section; defaulted"
    found = m.group(1).upper()
    if found not in VALID:
        return "", f"unrecognised level {found!r}"
    return found, "from the section's own confidence line"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true",
                    help="write the files (default is a dry run)")
    a = ap.parse_args()

    changed, skipped = [], []
    for path in sorted(REPORTS.glob("dfva-market-*.md")):
        text = path.read_text(encoding="utf-8")
        m = HEADING.search(text)
        if not m:
            continue
        level, why = level_for(text, m.end())
        if not level:
            skipped.append((path.name, why))
            continue
        new_heading = f"{m.group(1)} — {level} CONFIDENCE"
        new_text = text[: m.start()] + new_heading + text[m.end():]
        changed.append((path, m.group(0).strip(), new_heading, why))
        if a.apply:
            path.write_text(new_text, encoding="utf-8")

    verb = "Rewrote" if a.apply else "Would rewrite"
    print(f"{verb} {len(changed)} heading(s)\n")
    for path, old, new, why in changed:
        print(f"  {path.name}")
        print(f"    - {old}")
        print(f"    + {new}")
        print(f"      ({why})")
    if skipped:
        print(f"\nSkipped {len(skipped)} file(s) — resolve by hand:")
        for name, why in skipped:
            print(f"  · {name}: {why}")
    if not a.apply:
        print("\nDry run. Nothing written. Re-run with --apply to write.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
