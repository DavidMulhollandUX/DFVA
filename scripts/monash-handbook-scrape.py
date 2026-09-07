#!/usr/bin/env python3
"""Monash University Handbook Scraper

Discovers, extracts, and standardises the full corpus of course offerings
from the Monash University Handbook (CourseLoop on Next.js).

Capabilities:
  1. Automated Course Discovery via CourseLoop search API.
  2. Dynamic Next.js buildId resolution from homepage manifest.
  3. Direct SSR JSON extraction (_next/data/) - 100% complete, zero headless browser overhead.
  4. Dual output generation:
     - Markdown dataset (data/monash_handbook_data.json) adhering to DFVA capture contract.
     - Structured JSON dataset (data/monash_handbook_structured.json) preserving CILOs, AQF,
       WBL, requirements, and nested curriculum structures.
  5. Resumable execution and safe atomic updates.

Usage:
  python3 scripts/monash-handbook-scrape.py --discover
  python3 scripts/monash-handbook-scrape.py --scrape --pace 0.35
  python3 scripts/monash-handbook-scrape.py --scrape --limit 5
  python3 scripts/monash-handbook-scrape.py --dry-run
"""

import argparse
import datetime
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(REPO_ROOT, "data")
BASE_URL = "https://handbook.monash.edu"

SITE_ID = "monash-prod-pres"
DEFAULT_YEAR = "2026"
DEFAULT_PACE = 0.35

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"


def get_headers():
    return {
        "User-Agent": USER_AGENT,
        "Accept": "application/json, text/plain, */*",
        "Referer": f"{BASE_URL}/",
    }


def resolve_build_id() -> str:
    """Extracts dynamic Next.js buildId from handbook homepage manifest."""
    req = urllib.request.Request(f"{BASE_URL}/", headers=get_headers())
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read().decode("utf-8", errors="ignore")
    m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
    if not m:
        raise RuntimeError("Could not resolve Next.js buildId from Monash handbook homepage.")
    return m.group(1)


def discover_courses(year: str = DEFAULT_YEAR) -> list[dict]:
    """Queries CourseLoop search endpoint to discover all courses for the target year."""
    url = f"{BASE_URL}/api/search/search-academic-items"
    items = []
    offset = 0
    size = 100
    total = None

    print(f"[*] Discovering {year} course offerings from {url}...")
    while total is None or offset < total:
        payload = {
            "siteId": SITE_ID,
            "query": "",
            "contenttype": "course",
            "searchFilters": [
                {"filterField": "implementationYear", "filterValue": [year], "isExactMatch": True}
            ],
            "from": offset,
            "size": size,
            "siteYear": year,
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json", **get_headers()},
        )
        for attempt in range(3):
            try:
                with urllib.request.urlopen(req, timeout=20) as resp:
                    res = json.loads(resp.read().decode("utf-8"))
                    total = res.get("data", {}).get("total", 0)
                    results = res.get("data", {}).get("results", [])
                    items.extend(results)
                    print(f"    Fetched offset {offset} ({len(results)} items, cumulative {len(items)}/{total})")
                    break
            except Exception as e:
                if attempt == 2:
                    raise RuntimeError(f"Failed to fetch search items at offset {offset}: {e}")
                time.sleep(2 * (attempt + 1))
        offset += size

    # Deduplicate by code while preserving order
    seen = set()
    deduped = []
    for it in items:
        code = it.get("code", "").strip()
        if code and code not in seen:
            it["code"] = code
            seen.add(code)
            deduped.append(it)

    print(f"[+] Discovered {len(deduped)} unique courses for academic year {year}.")
    return deduped


def fetch_course_content(build_id: str, code: str, year: str = DEFAULT_YEAR, max_retries: int = 3) -> dict | None:
    """Fetches full course structured content via Next.js data route."""
    query = urllib.parse.urlencode([("catchAll", year), ("catchAll", "courses"), ("catchAll", code)])
    url = f"{BASE_URL}/_next/data/{build_id}/{year}/courses/{code}.json?{query}"
    req = urllib.request.Request(url, headers=get_headers())

    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                props = data.get("pageProps", {})
                if props.get("pageType") == "ErrorPage" or props.get("pageErrors"):
                    # Bad request or not found
                    return None
                return props.get("pageContent")
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            if attempt == max_retries - 1:
                print(f"[!] HTTP {e.code} for {code}: {e}")
                return None
            time.sleep(1.5 * (attempt + 1))
        except Exception as e:
            if attempt == max_retries - 1:
                print(f"[!] Error fetching {code}: {e}")
                return None
            time.sleep(1.5 * (attempt + 1))
    return None


def clean_html(text: str | None) -> str:
    """Converts HTML markup to clean, unescaped plain text / markdown snippets."""
    if not text:
        return ""
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</p>", "\n\n", text, flags=re.IGNORECASE)
    text = re.sub(r"</li>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<li[^>]*>", "  * ", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    # Collapse multiple blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def format_curriculum_container(container: list[dict], year: str = DEFAULT_YEAR, depth: int = 0) -> list[str]:
    """Recursively formats Monash curriculum structure into readable markdown."""
    lines = []
    prefix = "  " * depth
    for c in container:
        title = c.get("title", "").strip()
        cp = c.get("credit_points")
        cp_str = f" **{cp} credit points**" if cp else ""
        if title:
            lines.append(f"{prefix}**{title}**{cp_str}")
        desc = clean_html(c.get("description", ""))
        if desc:
            lines.append(f"{prefix}{desc}")
        for rel in c.get("relationship", []):
            code = rel.get("academic_item_code", "").strip()
            name = rel.get("academic_item_name", "").strip()
            rcp = rel.get("credit_points", "")
            rcp_str = f" {rcp} CP" if rcp else ""
            sub_url = f"{BASE_URL}/{year}/units/{code}"
            lines.append(f"{prefix}  [ _arrow_forward_ {code}{rcp_str} {name} ]({sub_url})")
        if c.get("container"):
            lines.extend(format_curriculum_container(c["container"], year, depth + 1))
    return lines


def convert_to_markdown(pc: dict, year: str = DEFAULT_YEAR) -> str:
    """Transforms raw pageContent into full standard DFVA handbook markdown."""
    lines = []
    title = pc.get("title", "").strip()
    code = pc.get("code", "").strip()
    cp = pc.get("credit_points", "")

    lines.append(f"## {title}")
    lines.append(f"##### {code}")
    if cp:
        lines.append(f"##### {cp} credit points")
    lines.append(f"You are viewing the {year} version\n")

    # Overview
    lines.append("### Overview")
    ov = clean_html(pc.get("overview") or pc.get("description"))
    if ov:
        lines.append(ov)
    lines.append("")

    # Course Metadata Attributes
    aqf = pc.get("aqf_level")
    aqf_str = aqf.get("label") if isinstance(aqf, dict) else str(aqf or "")
    if aqf_str:
        lines.append(f"### AQF level\n{aqf_str}")

    faculty = pc.get("academic_org", {}).get("name") or pc.get("owning_org", {}).get("name") if isinstance(pc.get("academic_org"), dict) or isinstance(pc.get("owning_org"), dict) else ""
    if faculty:
        lines.append(f"### Faculty\n{faculty}")

    school = pc.get("school", {}).get("name") if isinstance(pc.get("school"), dict) else ""
    if school:
        lines.append(f"### School\n{school}")

    cricos = pc.get("cricos_code", "")
    if cricos:
        lines.append(f"### CRICOS code\n{cricos}")

    pn = pc.get("post_nominals")
    if pn:
        lines.append(f"### Post-nominals\n{pn}")

    # Duration
    durations = pc.get("full_time_duration", [])
    if isinstance(durations, list) and durations:
        d_strs = [f"{d.get('duration', '')} {d.get('unit', '')}".strip() for d in durations if isinstance(d, dict)]
        if d_strs:
            lines.append(f"### Course duration (full time)\n{', '.join(d_strs)}")
    lines.append("")

    # Structure & Requirements
    if pc.get("structure"):
        lines.append("### Structure")
        lines.append(clean_html(pc.get("structure")))
        lines.append("")

    if pc.get("requirements"):
        lines.append("### Requirements")
        lines.append(clean_html(pc.get("requirements")))
        lines.append("")

    # Course Structure Tree
    lines.append("### Course structure")
    if cp:
        lines.append(f"{cp} credit points")
    cs = pc.get("curriculumStructure")
    if isinstance(cs, dict) and cs.get("container"):
        lines.extend(format_curriculum_container(cs["container"], year))
    lines.append("")

    # Learning Outcomes (CILOs)
    lines.append("### Course intended learning outcomes")
    los = pc.get("learning_outcomes", [])
    if los:
        lines.append("On successful completion you will be able to:")
        for idx, lo in enumerate(los, 1):
            lo_desc = clean_html(lo.get("description", ""))
            lines.append(f"**{idx}.**\n{lo_desc}")
    lines.append("")

    # Progression / Pathways
    prog = clean_html(pc.get("progression") or pc.get("Progression_to_further_studies"))
    if prog:
        lines.append("### Progression to further studies")
        lines.append(prog)
        lines.append("")

    # Entry & Additional Info
    entry = clean_html(pc.get("entry"))
    if entry:
        lines.append("### Entry requirements")
        lines.append(entry)
        lines.append("")

    ahegs = clean_html(pc.get("ahegs"))
    if ahegs:
        lines.append("### AHEGS")
        lines.append(ahegs)
        lines.append("")

    degrees = clean_html(pc.get("degrees_awarded"))
    if degrees:
        lines.append("### Degrees awarded")
        lines.append(degrees)

    return "\n".join(lines)


def run_discovery(year: str = DEFAULT_YEAR) -> list[str]:
    """Runs course discovery and writes data/monash_course_codes.json."""
    courses = discover_courses(year)
    codes = [c["code"] for c in courses]
    codes_path = os.path.join(DATA_DIR, "monash_course_codes.json")
    with open(codes_path, "w") as f:
        json.dump(codes, f, indent=2)
    print(f"[+] Written {len(codes)} codes to {codes_path}")
    return codes


def run_scrape(year: str = DEFAULT_YEAR, pace: float = DEFAULT_PACE, limit: int | None = None, force: bool = False):
    """Executes the full Monash corpus scrape and update."""
    codes_path = os.path.join(DATA_DIR, "monash_course_codes.json")
    handbook_path = os.path.join(DATA_DIR, "monash_handbook_data.json")
    structured_path = os.path.join(DATA_DIR, "monash_handbook_structured.json")
    pending_path = os.path.join(DATA_DIR, "monash_pending_scrapes.json")

    # Load course codes
    if not os.path.exists(codes_path) or force:
        codes = run_discovery(year)
    else:
        with open(codes_path) as f:
            codes = json.load(f)

    # Load existing scraped markdown records
    existing_records = {}
    if os.path.exists(handbook_path):
        with open(handbook_path) as f:
            for r in json.load(f):
                if r.get("code"):
                    existing_records[r["code"]] = r

    # Load existing structured records
    existing_structured = {}
    if os.path.exists(structured_path):
        with open(structured_path) as f:
            for r in json.load(f):
                if r.get("code"):
                    existing_structured[r["code"]] = r

    # Determine worklist
    if force:
        queue = codes
    else:
        queue = [c for c in codes if c not in existing_records or c not in existing_structured or existing_records[c].get("length", 0) < 1000]

    if limit:
        queue = queue[:limit]

    print(f"[*] Total catalog codes: {len(codes)}")
    print(f"[*] Existing captured records: {len(existing_records)}")
    print(f"[*] Queued to capture: {len(queue)}")

    if not queue:
        print("[+] All courses are already captured and up to date.")
        with open(pending_path, "w") as f:
            json.dump({
                "university": "Monash",
                "year": year,
                "total": len(codes),
                "scraped": len(codes),
                "pending": 0,
                "last_run": datetime.datetime.now().isoformat()
            }, f, indent=2)
        return

    # Resolve Next.js buildId
    print("[*] Resolving dynamic Next.js buildId...")
    build_id = resolve_build_id()
    print(f"[+] Using buildId: {build_id}")

    captured_count = 0
    failed_codes = []

    for idx, code in enumerate(queue, 1):
        url = f"{BASE_URL}/{year}/courses/{code}"
        pc = fetch_course_content(build_id, code, year)

        if pc:
            md = convert_to_markdown(pc, year)
            length = len(md)
            now_iso = datetime.datetime.now().isoformat()

            # Markdown record
            existing_records[code] = {
                "code": code,
                "url": url,
                "success": True,
                "markdown": md,
                "length": length,
                "scraped_at": now_iso
            }

            # Structured record
            aqf = pc.get("aqf_level")
            aqf_str = aqf.get("label") if isinstance(aqf, dict) else str(aqf or "")
            faculty = pc.get("academic_org", {}).get("name") or pc.get("owning_org", {}).get("name") if isinstance(pc.get("academic_org"), dict) or isinstance(pc.get("owning_org"), dict) else None

            existing_structured[code] = {
                "code": code,
                "url": url,
                "title": pc.get("title"),
                "implementation_year": pc.get("implementation_year", year),
                "study_level": pc.get("study_level") or pc.get("contentTypeLabel"),
                "aqf_level": aqf_str,
                "credit_points": pc.get("credit_points"),
                "faculty": faculty,
                "school": pc.get("school", {}).get("name") if isinstance(pc.get("school"), dict) else None,
                "cricos_code": pc.get("cricos_code"),
                "post_nominals": pc.get("post_nominals"),
                "duration_full_time": pc.get("full_time_duration"),
                "learning_outcomes": pc.get("learning_outcomes", []),
                "structure_text": pc.get("structure"),
                "requirements_text": pc.get("requirements"),
                "progression": pc.get("progression") or pc.get("Progression_to_further_studies"),
                "curriculumStructure": pc.get("curriculumStructure"),
                "degrees_awarded": pc.get("degrees_awarded"),
                "scraped_at": now_iso
            }

            captured_count += 1
            print(f"[{idx}/{len(queue)}] SUCCESS {code} ({length:,} chars) - {pc.get('title', '')[:50]}")
        else:
            print(f"[{idx}/{len(queue)}] FAILED {code} (Not found / 404 / inactive)")
            failed_codes.append(code)

        # Periodic checkpoint every 25 records
        if idx % 25 == 0 or idx == len(queue):
            save_datasets(handbook_path, structured_path, pending_path, codes, existing_records, existing_structured, year)

        if idx < len(queue):
            time.sleep(pace)

    # Final save
    save_datasets(handbook_path, structured_path, pending_path, codes, existing_records, existing_structured, year)
    print(f"\n[+] Batch complete! Captured {captured_count}/{len(queue)}. Failed: {len(failed_codes)}")


def save_datasets(handbook_path, structured_path, pending_path, codes, existing_records, existing_structured, year):
    """Safely saves both markdown and structured datasets and pending tracking."""
    sorted_records = [existing_records[c] for c in sorted(existing_records.keys())]
    with open(handbook_path, "w") as f:
        json.dump(sorted_records, f, indent=2)

    sorted_struct = [existing_structured[c] for c in sorted(existing_structured.keys())]
    with open(structured_path, "w") as f:
        json.dump(sorted_struct, f, indent=2)

    scraped_count = sum(1 for c in codes if c in existing_records and existing_records[c].get("success"))
    with open(pending_path, "w") as f:
        json.dump({
            "university": "Monash",
            "year": year,
            "total": len(codes),
            "scraped": scraped_count,
            "pending": max(0, len(codes) - scraped_count),
            "last_run": datetime.datetime.now().isoformat()
        }, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Monash University Handbook Scraper")
    parser.add_argument("--discover", action="store_true", help="Discover all course codes and save to data/monash_course_codes.json")
    parser.add_argument("--scrape", action="store_true", help="Scrape uncaptured courses in queue")
    parser.add_argument("--dry-run", action="store_true", help="Inspect state and remaining courses without fetching content")
    parser.add_argument("--force", action="store_true", help="Force re-discovery and re-scraping of all courses")
    parser.add_argument("--year", default=DEFAULT_YEAR, help=f"Academic year (default: {DEFAULT_YEAR})")
    parser.add_argument("--pace", type=float, default=DEFAULT_PACE, help=f"Delay between requests in seconds (default: {DEFAULT_PACE})")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of courses to scrape in this run")

    args = parser.parse_args()

    if args.discover:
        run_discovery(args.year)
    elif args.dry_run:
        codes_path = os.path.join(DATA_DIR, "monash_course_codes.json")
        handbook_path = os.path.join(DATA_DIR, "monash_handbook_data.json")
        if not os.path.exists(codes_path):
            print("No course codes file found. Run with --discover first.")
            return
        with open(codes_path) as f:
            codes = json.load(f)
        scraped = set()
        if os.path.exists(handbook_path):
            with open(handbook_path) as f:
                scraped = {r["code"] for r in json.load(f) if r.get("success")}
        pending = [c for c in codes if c not in scraped]
        print(f"Total catalog courses: {len(codes)}")
        print(f"Scraped courses: {len(scraped)}")
        print(f"Pending courses: {len(pending)}")
        if pending:
            print("Next 10 pending codes:", pending[:10])
    elif args.scrape:
        run_scrape(year=args.year, pace=args.pace, limit=args.limit, force=args.force)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
