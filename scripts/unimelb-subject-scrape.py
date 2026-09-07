#!/usr/bin/env python3
"""University of Melbourne Subject & Syllabus Scraper

High-throughput asynchronous crawler designed to extract standalone subject
syllabus pages from the University of Melbourne Handbook (handbook.unimelb.edu.au)
using Crawl4AI headless Chromium to navigate Imperva/Incapsula protection.
"""

import argparse
import asyncio
import datetime
import json
import os
import re
import sys
import time

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.expanduser("~/.venv-crawl4ai-uv/lib/python3.14/site-packages"))

from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

DATA_DIR = os.path.join(REPO_ROOT, "data")
SUBJECTS_DIR = os.path.join(DATA_DIR, "subjects")
INDEX_DIR = os.path.join(SUBJECTS_DIR, "index")
STATUS_DIR = os.path.join(SUBJECTS_DIR, "status")

INDEX_FILE = os.path.join(INDEX_DIR, "unimelb_subject_index.json")
OUT_JSONL = os.path.join(SUBJECTS_DIR, "unimelb_subjects.jsonl")
STATUS_FILE = os.path.join(STATUS_DIR, "unimelb_status.json")

DEFAULT_CONCURRENCY = 2
BASE_URL = "https://handbook.unimelb.edu.au"

RUN_CONFIG = CrawlerRunConfig(magic=True, delay_before_return_html=1.5)


def load_existing_codes():
    if not os.path.exists(OUT_JSONL):
        return set()
    codes = set()
    try:
        with open(OUT_JSONL, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    try:
                        d = json.loads(line)
                        c = d.get("subject_code")
                        if c:
                            codes.add(c.upper())
                    except Exception:
                        pass
    except Exception as e:
        print(f"[!] Warning reading {OUT_JSONL}: {e}")
    return codes


def update_status(total, scraped, pending):
    status_data = {
        "institution": "unimelb",
        "total": total,
        "scraped": scraped,
        "pending": pending,
        "pct": (scraped / total * 100) if total > 0 else 0,
        "last_updated": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }
    with open(STATUS_FILE, "w", encoding="utf-8") as f:
        json.dump(status_data, f, indent=2)


async def scrape_subject(crawler, item):
    code = item["code"].upper()
    url = f"{BASE_URL}/2026/subjects/{code.lower()}"
    res = await crawler.arun(url, config=RUN_CONFIG, timeout=30)
    if not res.success or "Pardon Our Interruption" in (res.markdown or ""):
        return None

    md = res.markdown

    # Title
    m_title = re.search(r"#\s*(.*?)\s*\(" + re.escape(code) + r"\)", md, re.I)
    title = m_title.group(1).strip() if m_title else item.get("title", code)

    # Overview
    overview = ""
    m_ov = re.search(r"## Overview\s*\n(.*?)(?=\n## |\Z)", md, re.S)
    if m_ov:
        overview = m_ov.group(1).strip()

    # ILOs
    los = []
    m_lo = re.search(r"## Intended learning outcomes\s*\n(.*?)(?=\n## |\Z)", md, re.S)
    if m_lo:
        for line in m_lo.group(1).splitlines():
            line = line.strip()
            if line.startswith(("*", "-", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.")):
                clean = re.sub(r"^[\*\-\d\.]+\s*", "", line).strip()
                if clean and clean not in los:
                    los.append(clean)

    # Assessment sub-page
    ass_url = f"{url}/assessment"
    ares = await crawler.arun(ass_url, config=RUN_CONFIG, timeout=30)
    assessments = []
    if ares.success and "Pardon Our Interruption" not in (ares.markdown or ""):
        amd = ares.markdown
        for line in amd.splitlines():
            if "|" in line and "%" in line:
                parts = [p.strip() for p in line.split("|") if p.strip()]
                if len(parts) >= 2:
                    tname = parts[0]
                    wpct = [p for p in parts if "%" in p]
                    w = wpct[0] if wpct else "N/A"
                    hurdle = "hurdle" in line.lower()
                    assessments.append({
                        "task_name": tname,
                        "weight_pct": w,
                        "hurdle": hurdle,
                    })

    # Study level determination based on UniMelb subject number
    m_lvl = re.search(r"^[A-Za-z]{4}([0-9])", code)
    level_digit = int(m_lvl.group(1)) if m_lvl else 1
    study_level = "Undergraduate" if level_digit <= 3 else "Postgraduate"

    return {
        "institution": "University of Melbourne",
        "subject_code": code,
        "title": title,
        "academic_year": "2026",
        "study_level": study_level,
        "credit_points": "12.5",
        "faculty": "The University of Melbourne",
        "school": "",
        "syllabus_overview": overview,
        "learning_outcomes": los,
        "prerequisites": [],
        "corequisites": [],
        "incompatibilities": [],
        "assessment_tasks": assessments,
        "canonical_url": url,
        "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }


async def main():
    parser = argparse.ArgumentParser(description="UniMelb Subject Scraper")
    parser.add_argument("--limit", type=int, default=None, help="Batch limit")
    parser.add_argument("--concurrency", type=int, default=DEFAULT_CONCURRENCY, help="Async workers")
    args = parser.parse_args()

    if not os.path.exists(INDEX_FILE):
        print(f"[!] Missing index file: {INDEX_FILE}")
        return

    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        catalog = json.load(f)

    existing = load_existing_codes()
    pending = [x for x in catalog if x["code"].upper() not in existing]

    print(f"[*] UniMelb Subject Corpus: {len(catalog)} total, {len(existing)} existing, {len(pending)} pending scrape.")

    if args.limit and args.limit > 0:
        pending = pending[:args.limit]
        print(f"[*] Batch capped at {args.limit} subjects.")

    if not pending:
        print("[+] All UniMelb subjects already captured.")
        update_status(len(catalog), len(existing), 0)
        return

    out_f = open(OUT_JSONL, "a", encoding="utf-8")
    sem = asyncio.Semaphore(args.concurrency)
    scraped_count = 0
    start_time = time.time()

    b_conf = BrowserConfig(headless=True)
    async with AsyncWebCrawler(config=b_conf) as crawler:
        async def worker(item, idx):
            nonlocal scraped_count
            async with sem:
                res = await scrape_subject(crawler, item)
                if res:
                    out_f.write(json.dumps(res) + "\n")
                    out_f.flush()
                    scraped_count += 1
                    existing.add(res["subject_code"])

                if (idx + 1) % 10 == 0 or (idx + 1) == len(pending):
                    elapsed = time.time() - start_time
                    rate = (idx + 1) / elapsed if elapsed > 0 else 0
                    pct = len(existing) / len(catalog) * 100
                    update_status(len(catalog), len(existing), len(pending) - (idx + 1))
                    print(f"[UNIMELB] [{idx+1}/{len(pending)}] Progress: {len(existing)}/{len(catalog)} ({pct:.1f}%) | {rate:.2f} subj/s", flush=True)

        tasks = [worker(item, i) for i, item in enumerate(pending)]
        await asyncio.gather(*tasks)

    out_f.close()
    update_status(len(catalog), len(existing), len(catalog) - len(existing))
    elapsed = time.time() - start_time
    print(f"[+] UniMelb Scraping completed in {elapsed:.1f}s. Captured {scraped_count} subjects. Total preserved: {len(existing)}")


if __name__ == "__main__":
    asyncio.run(main())
