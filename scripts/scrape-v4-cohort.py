#!/usr/bin/env python3
"""Capture handbook evidence for the Panel C v4 migration cycle.

For each program: course overview, attributes/outcomes, course structure, the
entry-point component pages, and every compulsory/capstone subject with its
assessment page. Writes one combined extract per program to scrapes/v4/<code>.txt
in the same "===== SOURCE: <url> =====" format the 244cw pilot used, so the
scoring step reads an identical shape for every program.

Run: PYTHONPATH="" python3 scripts/scrape-v4-cohort.py [code ...]
"""
import json
import os
import re
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "scrapes", "v4")
SCRAPER = os.path.expanduser("~/.hermes/scripts/crawl4ai_scrape.sh")
COHORT = os.path.join(ROOT, "scripts", "v4_cohort.json")


# The handbook rate-limits: a fast run trips "Pardon Our Interruption" and the
# block is site-wide and IP-level, not path-specific. DELAY is deliberately
# conservative — a slow complete run beats a fast blocked one. On a block the
# script waits rather than burning through the remaining cohort producing
# nothing (every failed page would otherwise silently become missing evidence).
DELAY = 3.0
BLOCK_MARKER = "Pardon Our Interruption"
BLOCK_WAIT = 900


def fetch(url: str, attempt: int = 0) -> str | None:
    """Return the page markdown, or None if the fetch failed.

    Blocks are distinguished from ordinary failures and waited out, because a
    block affects every subsequent request and would otherwise corrupt the whole
    run into partial extracts.
    """
    env = dict(os.environ, PYTHONPATH="")
    try:
        r = subprocess.run(
            ["bash", SCRAPER, url], capture_output=True, text=True, env=env, timeout=180
        )
        data = json.loads(r.stdout)
    except Exception:
        return None
    if data.get("success"):
        return data.get("markdown")
    if BLOCK_MARKER in (data.get("markdown") or "") and attempt < 4:
        print(f"    rate-limited; waiting {BLOCK_WAIT}s before retrying", flush=True)
        time.sleep(BLOCK_WAIT)
        return fetch(url, attempt + 1)
    return None


def clean(md: str) -> str:
    """Drop the site chrome that carries no curriculum evidence."""
    cut = md.find("##  Site footer")
    if cut > 0:
        md = md[:cut]
    out = []
    for line in md.split("\n"):
        s = line.strip()
        if re.match(r"^\[?\s*!?\[", s) and "handbook.unimelb.edu.au" not in s:
            continue
        if s.startswith(
            (
                "You’re viewing", "2026 2025", "Go", "[ Close", "[ Search", "[ Menu",
                "[Or view archived", "[View full page", "[Next:", "[Prev:", "Last updated:",
            )
        ):
            continue
        out.append(line)
    return "\n".join(out)


def scrape_program(code: str, course_url: str) -> tuple[int, int]:
    """Capture one program. Returns (pages_captured, subjects_found)."""
    base = course_url.rstrip("/")
    pages: list[tuple[str, str]] = []
    seen: set[str] = set()

    def grab(url: str) -> str | None:
        if url in seen:
            return None
        seen.add(url)
        md = fetch(url)
        if md:
            pages.append((url, clean(md)))
        time.sleep(DELAY)
        return md

    course_md = grab(base) or ""
    grab(f"{base}/attributes-outcomes-skills")
    structure_md = grab(f"{base}/course-structure") or ""

    # Entry-point component pages carry the compulsory/capstone subject tables.
    components = set(
        re.findall(r"https://handbook\.unimelb\.edu\.au/(?:\d{4}/)?components/[\w-]+", structure_md)
    )
    comp_md = ""
    for comp in sorted(components)[:6]:
        comp_md += grab(f"{comp.rstrip('/')}/course-structure") or ""

    # Subject codes: prefer the compulsory/capstone region, else the whole text.
    haystack = structure_md + comp_md
    region = haystack
    m = re.search(r"(Compulsory|Core)\s+subjects(.{0,12000})", haystack, re.S | re.I)
    if m:
        region = m.group(2)
    subjects = list(dict.fromkeys(re.findall(r"/subjects/([a-z]{4}\d{5})", region)))
    if not subjects:
        subjects = list(dict.fromkeys(re.findall(r"/subjects/([a-z]{4}\d{5})", haystack)))

    # Cap per program: enough to evidence the core without unbounded fetching.
    for subj in subjects[:10]:
        grab(f"https://handbook.unimelb.edu.au/2026/subjects/{subj}")
        grab(f"https://handbook.unimelb.edu.au/2026/subjects/{subj}/assessment")

    if not pages:
        return 0, 0
    body = "\n\n".join(f"===== SOURCE: {u} =====\n{t}" for u, t in pages)
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, f"{code}.txt"), "w") as fh:
        fh.write(body)
    return len(pages), len(subjects[:10])


def main() -> None:
    cohort = json.load(open(COHORT))
    wanted = sys.argv[1:]
    if wanted:
        cohort = [p for p in cohort if p["code"] in wanted]
    for i, p in enumerate(cohort, 1):
        dest = os.path.join(OUT, f"{p['code']}.txt")
        # Resume only past extracts that carry assessment pages. Scoring rule R2
        # awards level 3 solely on assessment evidence, so an extract without
        # any /assessment source is not scoreable and must be re-captured — a
        # size check alone would silently accept a rate-limited partial.
        if os.path.exists(dest):
            body = open(dest).read()
            if body.count("/assessment =====") >= 2:
                print(f"[{i}/{len(cohort)}] {p['code']}: already captured", flush=True)
                continue
            print(f"[{i}/{len(cohort)}] {p['code']}: partial capture, redoing", flush=True)
        n, s = scrape_program(p["code"], p["url"])
        print(f"[{i}/{len(cohort)}] {p['code']}: {n} pages, {s} core subjects", flush=True)


if __name__ == "__main__":
    main()
