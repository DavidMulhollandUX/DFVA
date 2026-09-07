#!/usr/bin/env python3
"""National Australian University Subject & Syllabus Scraper (50,000+ Subjects)

High-throughput concurrent crawler designed to discover, extract, and structure
standalone subject and unit syllabus pages across Australian universities.

Capabilities:
  1. Automated discovery across CourseLoop, CMS catalogs, and REST course APIs.
  2. High-concurrency extraction (ThreadPoolExecutor) with connection reuse.
  3. Granular syllabus extraction:
     - Subject Learning Outcomes (SLOs / CILOs)
     - Syllabus Overview / Topic Outline
     - Prerequisites, Corequisites & Incompatibilities
     - Assessment Task breakdown & weighting percentages
     - Workload hours and study modes
  4. Streamed JSON Lines persistence (data/subjects/{institution}_subjects.jsonl)
     guaranteeing constant-memory usage regardless of corpus size.
  5. Fully resumable and idempotent.

Usage:
  python3 scripts/national-subject-scrape.py --discover --institution monash
  python3 scripts/national-subject-scrape.py --scrape --institution monash --workers 10
  python3 scripts/national-subject-scrape.py --scrape --institution unsw --workers 10
  python3 scripts/national-subject-scrape.py --scrape --wave 1
  python3 scripts/national-subject-scrape.py --status
"""

import argparse
import concurrent.futures
import datetime
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import requests
from bs4 import BeautifulSoup

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(REPO_ROOT, "data")
SUBJECTS_DIR = os.path.join(DATA_DIR, "subjects")
INDEX_DIR = os.path.join(SUBJECTS_DIR, "index")
STATUS_DIR = os.path.join(SUBJECTS_DIR, "status")

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)

DEFAULT_YEAR = "2026"
DEFAULT_WORKERS = 10


def get_headers(referer=""):
    return {
        "User-Agent": USER_AGENT,
        "Accept": "application/json, text/html, */*",
        "Referer": referer,
    }


def clean_html(raw) -> str:
    """Strips HTML tags and normalizes whitespace."""
    if not raw:
        return ""
    if isinstance(raw, list):
        return "\n".join(clean_html(x) for x in raw if x)
    if isinstance(raw, dict):
        val = raw.get("value") or raw.get("label") or raw.get("description") or ""
        return clean_html(val)
    text = str(raw)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


# ============================================================================
# INSTITUTION HANDLERS
# ============================================================================

class MonashSubjectHandler:
    BASE_URL = "https://handbook.monash.edu"
    SITE_ID = "monash-prod-pres"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.build_id = None

    def resolve_build_id(self):
        if not self.build_id:
            req = urllib.request.Request(self.BASE_URL, headers=get_headers(self.BASE_URL))
            with urllib.request.urlopen(req, timeout=15) as resp:
                content = resp.read().decode("utf-8", errors="ignore")
            m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
            self.build_id = m.group(1) if m else "c1z216K83Qh1uPkyj2T6m"
        return self.build_id

    def discover(self) -> list:
        print(f"[*] Discovering Monash University subjects for {self.year}...")
        url = f"{self.BASE_URL}/api/search/search-academic-items"
        all_subjects = []
        offset = 0
        batch = 100
        total = None

        while total is None or offset < total:
            payload = {
                "siteId": self.SITE_ID,
                "query": "",
                "contenttype": "subject",
                "searchFilters": [
                    {"filterField": "implementationYear", "filterValue": [str(self.year)], "isExactMatch": True}
                ],
                "from": offset,
                "size": batch,
                "siteYear": str(self.year),
            }
            req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json", **get_headers(self.BASE_URL)})
            with urllib.request.urlopen(req, timeout=20) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            inner = d.get("data", {})
            if total is None:
                total = inner.get("total", 0)
                print(f"    Total Monash subjects reported: {total}")
            res = inner.get("results", [])
            if not res:
                break
            for r in res:
                all_subjects.append({
                    "code": r.get("code"),
                    "title": r.get("title"),
                    "uri": r.get("uri") or f"/{self.year}/units/{r.get('code')}",
                })
            offset += len(res)
            if offset % 500 == 0 or offset >= total:
                print(f"    Discovered {offset} / {total} subjects...")
            time.sleep(0.1)

        out_path = os.path.join(INDEX_DIR, "monash_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] Monash: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"]
        build_id = self.resolve_build_id()
        url = f"{self.BASE_URL}/_next/data/{build_id}/{self.year}/units/{code}.json?catchAll={self.year}&catchAll=units&catchAll={code}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        pc = data.get("pageProps", {}).get("pageContent", {})

        # Learning Outcomes
        los = []
        for lo in pc.get("unit_learning_outcomes", []):
            desc = clean_html(lo.get("description"))
            if desc:
                los.append(desc)

        # Assessments
        assessments = []
        for a in pc.get("assessments", []):
            name = a.get("name") or a.get("assessment_name") or "Assessment Task"
            weight = a.get("weight") or "N/A"
            hurdle = a.get("hurdle_type", {}).get("label") if isinstance(a.get("hurdle_type"), dict) else None
            assessments.append({
                "task_name": clean_html(name),
                "weight_pct": weight,
                "hurdle": hurdle,
            })

        # Requisites & Incompatibilities
        reqs = []
        incomps = []
        for req_obj in pc.get("requisites", []):
            rtype = req_obj.get("requisite_type", {}).get("label") if isinstance(req_obj.get("requisite_type"), dict) else ""
            desc = clean_html(req_obj.get("description"))
            target_list = incomps if "prohibition" in rtype.lower() else reqs
            if desc:
                target_list.append(desc)
            for c in req_obj.get("container", []):
                for rel in c.get("relationships", []):
                    u_code = rel.get("academic_item_code")
                    u_name = rel.get("academic_item_name")
                    if u_code:
                        target_list.append(f"{u_code}: {u_name}" if u_name else u_code)

        org = pc.get("academic_org", {}).get("value") if isinstance(pc.get("academic_org"), dict) else pc.get("academic_org")
        study_level = pc.get("study_level", {}).get("label") if isinstance(pc.get("study_level"), dict) else pc.get("study_level")

        return {
            "institution": "Monash University",
            "subject_code": code,
            "title": pc.get("title") or item.get("title"),
            "academic_year": str(self.year),
            "study_level": study_level or "Undergraduate",
            "credit_points": pc.get("credit_points") or "6",
            "faculty": org or "Faculty of Information Technology",
            "school": clean_html(pc.get("school")),
            "syllabus_overview": clean_html(pc.get("handbook_synopsis") or pc.get("content")),
            "learning_outcomes": los,
            "prerequisites": reqs,
            "corequisites": [],
            "incompatibilities": incomps,
            "assessment_tasks": assessments,
            "workload_hours": clean_html(pc.get("workload_requirements")),
            "canonical_url": f"{self.BASE_URL}/{self.year}/units/{code}",
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class UNSWSubjectHandler:
    BASE_URL = "https://handbook.unsw.edu.au"
    SITE_ID = "unsw-prod-pres"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.build_id = None

    def resolve_build_id(self):
        if not self.build_id:
            req = urllib.request.Request(self.BASE_URL, headers=get_headers(self.BASE_URL))
            with urllib.request.urlopen(req, timeout=15) as resp:
                content = resp.read().decode("utf-8", errors="ignore")
            m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
            self.build_id = m.group(1) if m else "1MG7n4b8bNQ6f3AAGkoP-"
        return self.build_id

    def discover(self) -> list:
        print(f"[*] Discovering UNSW subjects for {self.year}...")
        url = f"{self.BASE_URL}/api/search/search-academic-items"
        all_subjects = []
        offset = 0
        batch = 100
        total = None

        while total is None or offset < total:
            payload = {
                "siteId": self.SITE_ID,
                "query": "",
                "contenttype": "subject",
                "searchFilters": [
                    {"filterField": "implementationYear", "filterValue": [str(self.year)], "isExactMatch": True}
                ],
                "from": offset,
                "size": batch,
                "siteYear": str(self.year),
            }
            req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json", **get_headers(self.BASE_URL)})
            with urllib.request.urlopen(req, timeout=20) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            inner = d.get("data", {})
            if total is None:
                total = inner.get("total", 0)
                print(f"    Total UNSW subjects reported: {total}")
            res = inner.get("results", [])
            if not res:
                break
            for r in res:
                all_subjects.append({
                    "code": r.get("code"),
                    "title": r.get("title"),
                    "uri": r.get("uri"),
                })
            offset += len(res)
            if offset % 500 == 0 or offset >= total:
                print(f"    Discovered {offset} / {total} subjects...")
            time.sleep(0.1)

        out_path = os.path.join(INDEX_DIR, "unsw_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] UNSW: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"]
        uri = item.get("uri") or f"/undergraduate/courses/{self.year}/{code}"
        build_id = self.resolve_build_id()
        parts = [p for p in uri.strip("/").split("/") if p]
        query = urllib.parse.urlencode([("catchAll", p) for p in parts])
        url = f"{self.BASE_URL}/_next/data/{build_id}{uri}.json?{query}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        pc = data.get("pageProps", {}).get("pageContent", {})

        # Learning Outcomes
        los = []
        for lo in pc.get("unit_learning_outcomes", []) or pc.get("learning_outcomes", []):
            desc = clean_html(lo.get("description") or lo.get("lo_description"))
            if desc:
                los.append(desc)

        # Assessments
        assessments = []
        for a in pc.get("hb_assessments", []) or pc.get("assessments", []):
            name = a.get("name") or a.get("assessment_name") or a.get("delivery_variation", {}).get("name")
            weight = a.get("weight") or a.get("percentage") or "N/A"
            if name:
                assessments.append({
                    "task_name": clean_html(name),
                    "weight_pct": weight,
                })

        # Exclusions / Equivalents
        incomps = [clean_html(x.get("association_desc") or x.get("academic_item_code")) for x in pc.get("exclusion", [])]
        equivs = [clean_html(x.get("association_desc") or x.get("academic_item_code")) for x in pc.get("eqivalents", [])]
        prereqs = [clean_html(x) for x in pc.get("enrolment_rules", [])]

        faculty = pc.get("parent_academic_org", {}).get("value") if isinstance(pc.get("parent_academic_org"), dict) else pc.get("parent_academic_org")
        school = pc.get("academic_org", {}).get("value") if isinstance(pc.get("academic_org"), dict) else pc.get("academic_org")
        study_level = pc.get("study_level_single", {}).get("label") if isinstance(pc.get("study_level_single"), dict) else pc.get("study_level_single")

        return {
            "institution": "University of New South Wales (UNSW Sydney)",
            "subject_code": code,
            "title": pc.get("title") or item.get("title"),
            "academic_year": str(self.year),
            "study_level": study_level or "Undergraduate",
            "credit_points": pc.get("credit_points") or "6",
            "faculty": faculty or "UNSW Faculty",
            "school": school or "UNSW School",
            "syllabus_overview": clean_html(pc.get("description")),
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": [],
            "incompatibilities": [x for x in (incomps + equivs) if x],
            "assessment_tasks": assessments,
            "workload_hours": clean_html(pc.get("workload_requirements")),
            "course_outline_url": pc.get("course_outline_url"),
            "canonical_url": f"{self.BASE_URL}{uri}",
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class LaTrobeSubjectHandler:
    BASE_URL = "https://handbook.latrobe.edu.au"
    SITE_ID = "ltu-prod-pres"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.build_id = None

    def resolve_build_id(self):
        if not self.build_id:
            req = urllib.request.Request(self.BASE_URL, headers=get_headers(self.BASE_URL))
            with urllib.request.urlopen(req, timeout=15) as resp:
                content = resp.read().decode("utf-8", errors="ignore")
            m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
            self.build_id = m.group(1) if m else "1MG7n4b8bNQ6f3AAGkoP-"
        return self.build_id

    def discover(self) -> list:
        print(f"[*] Discovering La Trobe University subjects for {self.year}...")
        url = f"{self.BASE_URL}/api/search/search-academic-items"
        all_subjects = []
        offset = 0
        batch = 100
        total = None

        while total is None or offset < total:
            payload = {
                "siteId": self.SITE_ID,
                "query": "",
                "contenttype": "subject",
                "searchFilters": [
                    {"filterField": "implementationYear", "filterValue": [str(self.year)], "isExactMatch": True}
                ],
                "from": offset,
                "size": batch,
                "siteYear": str(self.year),
            }
            req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json", **get_headers(self.BASE_URL)})
            with urllib.request.urlopen(req, timeout=20) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            inner = d.get("data", {})
            if total is None:
                total = inner.get("total", 0)
                print(f"    Total La Trobe subjects reported: {total}")
            res = inner.get("results", [])
            if not res:
                break
            for r in res:
                all_subjects.append({
                    "code": r.get("code"),
                    "title": r.get("title"),
                    "uri": r.get("uri") or f"/subjects/{self.year}/{r.get('code')}",
                })
            offset += len(res)
            if offset % 500 == 0 or offset >= total:
                print(f"    Discovered {offset} / {total} subjects...")
            time.sleep(0.1)

        out_path = os.path.join(INDEX_DIR, "latrobe_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] La Trobe: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"]
        build_id = self.resolve_build_id()
        url = f"{self.BASE_URL}/_next/data/{build_id}/subjects/{self.year}/{code}.json?catchAll=subjects&catchAll={self.year}&catchAll={code}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        pc = data.get("pageProps", {}).get("pageContent", {})

        los = [clean_html(lo.get("description")) for lo in pc.get("unit_learning_outcomes", []) or pc.get("learning_outcomes", [])]
        assessments = []
        for a in pc.get("assessments", []):
            assessments.append({
                "task_name": clean_html(a.get("name") or a.get("assessment_name")),
                "weight_pct": a.get("weight") or "N/A",
            })

        return {
            "institution": "La Trobe University",
            "subject_code": code,
            "title": pc.get("title") or item.get("title"),
            "academic_year": str(self.year),
            "study_level": clean_html(pc.get("study_level")) or "Undergraduate",
            "credit_points": pc.get("credit_points") or "15",
            "faculty": clean_html(pc.get("academic_org")),
            "school": clean_html(pc.get("school")),
            "syllabus_overview": clean_html(pc.get("description") or pc.get("handbook_synopsis")),
            "learning_outcomes": [x for x in los if x],
            "prerequisites": [clean_html(x) for x in pc.get("requisites", [])],
            "corequisites": [],
            "incompatibilities": [clean_html(x) for x in pc.get("exclusions", [])],
            "assessment_tasks": assessments,
            "workload_hours": clean_html(pc.get("workload_requirements")),
            "canonical_url": f"{self.BASE_URL}/subjects/{self.year}/{code}",
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class UWASubjectHandler:
    BASE_URL = "https://www.handbooks.uwa.edu.au"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year

    def discover(self) -> list:
        print(f"[*] Discovering UWA subjects from {self.BASE_URL}/units...")
        req = urllib.request.Request(f"{self.BASE_URL}/units", headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=25) as resp:
            raw_html = resp.read().decode("utf-8", errors="ignore")
        soup = BeautifulSoup(raw_html, "html.parser")
        links = soup.find_all("a", href=re.compile(r"unitdetails\?code=([A-Za-z0-9_]+)"))
        unique = {}
        for a in links:
            m = re.search(r"code=([A-Za-z0-9_]+)", a["href"])
            if m:
                code = m.group(1)
                title = a.get_text(strip=True)
                if code not in unique:
                    unique[code] = {
                        "code": code,
                        "title": title,
                        "url": f"{self.BASE_URL}/unitdetails?code={code}",
                    }
        all_subjects = list(unique.values())
        out_path = os.path.join(INDEX_DIR, "uwa_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] UWA: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"]
        url = item.get("url") or f"{self.BASE_URL}/unitdetails?code={code}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=20) as resp:
            raw_html = resp.read().decode("utf-8", errors="ignore")
        soup = BeautifulSoup(raw_html, "html.parser")

        title = item.get("title", "")
        h2 = soup.find("h2")
        if h2:
            title = re.sub(r"\[" + re.escape(code) + r"\]", "", h2.get_text(strip=True)).strip()

        overview = ""
        ov_elem = soup.find("h3", string=re.compile(r"Overview", re.I))
        if ov_elem and ov_elem.find_next_sibling():
            overview = clean_html(ov_elem.find_next_sibling())

        # Outcomes
        los = []
        outcomes_h = soup.find(["h3", "h4"], string=re.compile(r"Outcomes", re.I))
        if outcomes_h and outcomes_h.find_next_sibling():
            for li in outcomes_h.find_next_sibling().find_all("li"):
                los.append(clean_html(li))

        # Assessments
        assessments = []
        ass_table = soup.find("table", class_=re.compile(r"assessment", re.I))
        if ass_table:
            for tr in ass_table.find_all("tr")[1:]:
                tds = [clean_html(td) for td in tr.find_all("td")]
                if len(tds) >= 2:
                    assessments.append({"task_name": tds[0], "weight_pct": tds[1]})

        return {
            "institution": "University of Western Australia (UWA)",
            "subject_code": code,
            "title": title or item.get("title"),
            "academic_year": str(self.year),
            "study_level": "Undergraduate",
            "credit_points": "6",
            "faculty": "The University of Western Australia",
            "school": "UWA Academic School",
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": [],
            "corequisites": [],
            "incompatibilities": [],
            "assessment_tasks": assessments,
            "canonical_url": url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class ANUSubjectHandler:
    BASE_URL = "https://programsandcourses.anu.edu.au"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year

    def discover(self) -> list:
        print(f"[*] Discovering ANU subjects for {self.year}...")
        url = f"{self.BASE_URL}/data/CourseSearch/GetCourses?SelectedYear={self.year}&ShowAll=true&PageSize=10000"
        headers = {"User-Agent": USER_AGENT, "Accept": "application/json"}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        items = data.get("Items", [])
        all_subjects = []
        for item in items:
            code = item.get("CourseCode")
            if code:
                all_subjects.append({
                    "code": code,
                    "title": (item.get("Name") or "").strip(),
                    "career": item.get("Career"),
                    "units": item.get("Units"),
                    "mode": item.get("ModeOfDelivery"),
                    "session": item.get("Session"),
                })
        out_path = os.path.join(INDEX_DIR, "anu_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] ANU: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"]
        url = f"{self.BASE_URL}/course/{code}"
        headers = {"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20) as resp:
            raw_html = resp.read().decode("utf-8", errors="ignore")
        soup = BeautifulSoup(raw_html, "html.parser")

        title_span = soup.find("span", class_="intro__degree-title__component")
        title = title_span.get_text(strip=True) if title_span else item.get("title", code)

        summary_box = soup.find("div", class_="degree-summary")
        summary_data = {}
        if summary_box:
            for li in summary_box.find_all("li"):
                txt = li.get_text(separator=" ", strip=True)
                for k in ["Offered by", "ANU College", "Academic career", "Mode of delivery", "Unit Value"]:
                    if txt.startswith(k):
                        summary_data[k] = txt[len(k):].strip()

        intro_div = soup.find("div", id="introduction")
        syllabus = ""
        if intro_div:
            syllabus = "\n\n".join(p.get_text(strip=True) for p in intro_div.find_all("p") if p.get_text(strip=True))

        los = []
        h_lo = soup.find(lambda e: e.name in ["h2", "h3"] and "Learning Outcomes" in e.get_text())
        if h_lo:
            cur = h_lo.find_next_sibling()
            while cur and cur.name not in ["h2", "h3"]:
                if cur.name in ["ol", "ul"]:
                    for li in cur.find_all("li"):
                        los.append(clean_html(li))
                cur = cur.find_next_sibling()

        assessments = []
        h_ass = soup.find(lambda e: e.name in ["h2", "h3"] and "Indicative Assessment" in e.get_text())
        if h_ass:
            cur = h_ass.find_next_sibling()
            while cur and cur.name not in ["h2", "h3"]:
                if cur.name in ["ol", "ul"]:
                    for li in cur.find_all("li"):
                        raw = clean_html(li)
                        w_match = re.search(r"\((\d+%?)\)", raw)
                        weight = w_match.group(1) if w_match else "N/A"
                        is_hurdle = "hurdle" in raw.lower()
                        name = re.sub(r"\(.*?\)", "", raw)
                        name = re.sub(r"\[LO.*?\]", "", name).strip()
                        assessments.append({"task_name": name, "weight_pct": weight, "hurdle": is_hurdle})
                cur = cur.find_next_sibling()

        workload = ""
        h_wl = soup.find(lambda e: e.name in ["h2", "h3"] and "Workload" in e.get_text())
        if h_wl and h_wl.find_next_sibling():
            workload = clean_html(h_wl.find_next_sibling())

        prereqs = []
        incomps = []
        h_req = soup.find(lambda e: e.name in ["h2", "h3"] and "Requisite" in e.get_text())
        if h_req:
            cur = h_req.find_next_sibling()
            while cur and cur.name not in ["h2", "h3"]:
                if "requisite" in cur.get("class", []):
                    txt = clean_html(cur)
                    if "incompatible" in txt.lower():
                        incomps.append(txt)
                    else:
                        prereqs.append(txt)
                cur = cur.find_next_sibling()

        return {
            "institution": "Australian National University (ANU)",
            "subject_code": code,
            "title": title,
            "academic_year": str(self.year),
            "study_level": summary_data.get("Academic career", item.get("career", "Undergraduate")),
            "credit_points": summary_data.get("Unit Value", f"{item.get('units', 6)} units"),
            "faculty": summary_data.get("ANU College", "ANU College"),
            "school": summary_data.get("Offered by", ""),
            "syllabus_overview": syllabus,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": [],
            "incompatibilities": incomps,
            "assessment_tasks": assessments,
            "workload_hours": workload,
            "canonical_url": url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class UQSubjectHandler:
    BASE_URL = "https://my.uq.edu.au/programs-courses"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-AU,en;q=0.9",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
        })

    def discover(self) -> list:
        print(f"[*] Discovering UQ subjects from {self.BASE_URL}/search.html...")
        url = f"{self.BASE_URL}/search.html?searchType=course&keywords=a"
        r = self.session.get(url, timeout=30)
        soup = BeautifulSoup(r.text, "html.parser")

        all_subjects = []
        seen = set()
        for h2 in soup.find_all("h2", class_="trigger"):
            nxt = h2.find_next_sibling("div", class_="toggle-container")
            if nxt:
                clink = nxt.find("a", href=re.compile(r"course\.html\?course_code="))
                if clink:
                    m = re.search(r"course_code=([A-Za-z0-9_]+)", clink["href"])
                    if m:
                        code = m.group(1)
                        txt = h2.get_text(separator=" | ", strip=True)
                        parts = [p.strip() for p in txt.split("|") if p.strip()]
                        title = parts[1] if len(parts) > 1 else code
                        if code not in seen:
                            seen.add(code)
                            all_subjects.append({
                                "code": code,
                                "title": title,
                                "url": f"{self.BASE_URL}/course.html?course_code={code}",
                            })

        out_path = os.path.join(INDEX_DIR, "uq_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] UQ: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"]
        url = item.get("url") or f"{self.BASE_URL}/course.html?course_code={code}"
        r = self.session.get(url, timeout=20)
        soup = BeautifulSoup(r.text, "html.parser")

        title_el = soup.find("h1", id="course-title") or soup.find("h1")
        raw_title = clean_html(title_el)
        title = re.sub(r"\s*\([A-Z0-9_]+\)\s*$", "", raw_title) if raw_title else item.get("title", code)

        summary_el = soup.find("p", id="course-summary") or soup.find("div", id="course-summary")
        summary = clean_html(summary_el)

        level = clean_html(soup.find(id="course-level")) or "Undergraduate"
        faculty = clean_html(soup.find(id="course-faculty")) or "The University of Queensland"
        school = clean_html(soup.find(id="course-school")) or ""
        units = clean_html(soup.find(id="course-units")) or "2"
        duration = clean_html(soup.find(id="course-duration")) or ""
        contact = clean_html(soup.find(id="course-contact")) or ""
        incomp = clean_html(soup.find(id="course-incompatible"))
        prereq = clean_html(soup.find(id="course-prerequisite"))
        rec_prereq = clean_html(soup.find(id="course-recommended-prerequisite"))
        assess_method = clean_html(soup.find(id="course-assessment-methods"))

        los = []
        assessments = []

        ecp_link = None
        for a in soup.find_all("a", href=True):
            if "course-profiles.uq.edu.au/course-profiles/" in a["href"]:
                ecp_link = a["href"]
                break

        if ecp_link:
            try:
                rp = self.session.get(ecp_link, timeout=12)
                if rp.status_code == 200:
                    sp = BeautifulSoup(rp.text, "html.parser")
                    h_lo = sp.find(lambda e: e.name in ["h2", "h3"] and "Learning outcomes" in e.get_text())
                    if h_lo:
                        sec = h_lo.find_parent("section") or h_lo.find_parent("div")
                        if sec:
                            for child in sec.find_all(["p", "div", "li"]):
                                txt = clean_html(child)
                                m = re.match(r"^LO\d+\.\s*(.+)", txt)
                                if m:
                                    outcome_text = m.group(1).strip()
                                    if not re.search(r"LO\d+\.", outcome_text) and outcome_text not in los:
                                        los.append(outcome_text)

                    h_ass = sp.find(lambda e: e.name in ["h2", "h3"] and "Assessment summary" in e.get_text())
                    if h_ass:
                        tbl = h_ass.find_next("table")
                        if tbl:
                            for tr in tbl.find_all("tr")[1:]:
                                tds = [clean_html(td) for td in tr.find_all(["td", "th"])]
                                if len(tds) >= 3:
                                    tname = tds[1]
                                    weight = tds[2]
                                    is_hurdle = "hurdle" in tname.lower() or "hurdle" in weight.lower()
                                    assessments.append({
                                        "task_name": tname,
                                        "weight_pct": weight,
                                        "hurdle": is_hurdle,
                                    })
            except Exception:
                pass

        if not assessments and assess_method:
            assessments.append({"task_name": assess_method, "weight_pct": "100%", "hurdle": False})

        return {
            "institution": "The University of Queensland (UQ)",
            "subject_code": code,
            "title": title,
            "academic_year": str(self.year),
            "study_level": level,
            "credit_points": units,
            "faculty": faculty,
            "school": school,
            "syllabus_overview": summary,
            "learning_outcomes": los,
            "prerequisites": [prereq] if prereq else [],
            "recommended_prerequisites": [rec_prereq] if rec_prereq else [],
            "incompatibilities": [incomp] if incomp else [],
            "assessment_tasks": assessments,
            "workload_hours": contact,
            "duration": duration,
            "canonical_url": url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }



class USYDSubjectHandler:
    BASE_URL = "https://www.sydney.edu.au"
    COVEO_API_URL = "https://platform-au.cloud.coveo.com/rest/search/v2"
    ORG_ID = "universityofsydneyproduction10somjans"
    API_KEY = "xxf8204f8d-c2dc-4c5e-befb-83168d339bfd"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year

    def discover(self) -> list:
        print(f"[*] Discovering USYD subjects via Coveo index for {self.year}...")
        all_subjects = []
        seen = set()
        offset = 0
        batch = 100
        total = None

        headers = {
            "User-Agent": USER_AGENT,
            "Authorization": f"Bearer {self.API_KEY}",
            "Content-Type": "application/json",
        }

        while total is None or offset < total:
            url = f"{self.COVEO_API_URL}?organizationId={self.ORG_ID}"
            payload = {
                "aq": '@sitemapparenturl=="https://www.sydney.edu.au/content/dam/students/files/uos-sitemap/UoS_seo_sitemap.xml"',
                "numberOfResults": batch,
                "firstResult": offset,
            }
            req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers)
            try:
                with urllib.request.urlopen(req, timeout=15) as r:
                    data = json.loads(r.read().decode("utf-8"))
            except Exception as e:
                print(f"[!] Error at offset {offset}: {e}")
                break

            if total is None:
                total = data.get("totalCount", 0)
                print(f"    Total USYD parent units reported: {total}")

            results = data.get("results", [])
            if not results:
                break

            for res in results:
                raw = res.get("raw", {})
                code = raw.get("filename")
                title = res.get("title", "")
                if code and not title.startswith("Error (500)"):
                    clean_title = re.sub(r"^[A-Za-z0-9_]+:\s*", "", title)
                    if code not in seen:
                        seen.add(code)
                        all_subjects.append({
                            "code": code,
                            "title": clean_title,
                            "uri": res.get("uri") or f"{self.BASE_URL}/units/{code}",
                        })

            offset += len(results)
            if offset >= 5000:
                break
            time.sleep(0.04)

        if offset < total:
            print(f"[*] Querying across character partitions to capture remaining units...")
            for ch in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
                part_offset = 0
                while True:
                    payload = {
                        "aq": f'@sitemapparenturl=="https://www.sydney.edu.au/content/dam/students/files/uos-sitemap/UoS_seo_sitemap.xml" AND @title=~"^{ch}"',
                        "numberOfResults": 100,
                        "firstResult": part_offset,
                    }
                    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers)
                    try:
                        with urllib.request.urlopen(req, timeout=12) as r:
                            pdata = json.loads(r.read().decode("utf-8"))
                    except Exception:
                        break
                    presults = pdata.get("results", [])
                    if not presults:
                        break
                    for res in presults:
                        code = res.get("raw", {}).get("filename")
                        title = res.get("title", "")
                        if code and not title.startswith("Error (500)"):
                            clean_title = re.sub(r"^[A-Za-z0-9_]+:\s*", "", title)
                            if code not in seen:
                                seen.add(code)
                                all_subjects.append({
                                    "code": code,
                                    "title": clean_title,
                                    "uri": res.get("uri") or f"{self.BASE_URL}/units/{code}",
                                })
                    part_offset += len(presults)
                    if part_offset >= pdata.get("totalCount", 0):
                        break
                    time.sleep(0.03)

        out_path = os.path.join(INDEX_DIR, "usyd_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] USYD: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"]
        url = item.get("uri") or f"{self.BASE_URL}/units/{code}"
        headers = {"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as r:
            html_content = r.read().decode("utf-8", errors="ignore")
        soup = BeautifulSoup(html_content, "html.parser")

        h1 = soup.find("h1")
        raw_title = clean_html(h1) if h1 else code
        title = re.sub(r"^[A-Za-z0-9_]+:\s*", "", raw_title) if raw_title else item.get("title", code)

        overview = ""
        for p in soup.find_all("p"):
            t = clean_html(p)
            if len(t) > 60 and "This section lists" not in t and "Mode of attendance" not in t and "Unit availability" not in t:
                overview = t
                break

        los = []
        lo_intro = soup.find(lambda e: e.name == "p" and "At the completion of this unit" in e.get_text())
        if lo_intro:
            nxt = lo_intro.find_next_sibling()
            if nxt:
                for li in nxt.find_all("li"):
                    txt = clean_html(li)
                    if txt and txt not in los:
                        los.append(txt)

        prereqs = []
        coreqs = []
        prohibs = []
        credit_points = "6"
        for dt in soup.find_all(["dt", "strong"]):
            txt = clean_html(dt)
            nxt = dt.find_next_sibling()
            val = clean_html(nxt) if nxt else ""
            if "credit points" in txt.lower() and val:
                credit_points = val
            elif "prerequisite" in txt.lower() and val and val.lower() != "none":
                prereqs.append(val)
            elif "corequisite" in txt.lower() and val and val.lower() != "none":
                coreqs.append(val)
            elif "prohibition" in txt.lower() and val and val.lower() != "none":
                prohibs.append(val)

        assessments = []
        outlines = soup.find("div", class_="outlines")
        outline_url = None
        if outlines:
            for a in outlines.find_all("a", href=True):
                if re.search(r"/units/[A-Za-z0-9_]+/202[56]-", a["href"]):
                    outline_url = f"{self.BASE_URL}{a['href']}" if a["href"].startswith("/") else a["href"]
                    break

        workload = ""
        faculty = "The University of Sydney"
        school = ""
        if outline_url:
            try:
                oreq = urllib.request.Request(outline_url, headers=headers)
                with urllib.request.urlopen(oreq, timeout=12) as orsp:
                    ohtml = orsp.read().decode("utf-8", errors="ignore")
                osoup = BeautifulSoup(ohtml, "html.parser")
                for tbl in osoup.find_all("table"):
                    headers_row = [th.get_text(strip=True).lower() for th in tbl.find_all("th")]
                    if any("weight" in h for h in headers_row) or any("task" in h or "type" in h for h in headers_row):
                        for tr in tbl.find_all("tr")[1:]:
                            tds = [clean_html(td) for td in tr.find_all("td")]
                            if len(tds) >= 3:
                                tname = f"{tds[0]}: {tds[1]}" if len(tds) > 1 and tds[1] else tds[0]
                                w_pct = tds[2] if len(tds) > 2 else "N/A"
                                ai_use = tds[5] if len(tds) > 5 else None
                                assessments.append({
                                    "task_name": tname,
                                    "weight_pct": w_pct,
                                    "use_of_ai": ai_use,
                                })
                for tr in osoup.find_all("tr"):
                    tds = [clean_html(td) for td in tr.find_all(["td", "th"])]
                    if len(tds) >= 2:
                        if "academic unit" in tds[0].lower():
                            school = tds[1]
                        elif "faculty" in tds[0].lower():
                            faculty = tds[1]
            except Exception:
                pass

        return {
            "institution": "The University of Sydney (USYD)",
            "subject_code": code,
            "title": title,
            "academic_year": str(self.year),
            "study_level": "Undergraduate" if re.match(r"^[A-Z]{4}[1-3]", code) else "Postgraduate",
            "credit_points": credit_points,
            "faculty": faculty,
            "school": school,
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": coreqs,
            "incompatibilities": prohibs,
            "assessment_tasks": assessments,
            "workload_hours": workload,
            "canonical_url": url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class UTSSubjectHandler:
    BASE_URL = "https://coursehandbook.uts.edu.au"
    SITE_ID = "uts-prod-pres"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.build_id = None

    def resolve_build_id(self):
        if not self.build_id:
            try:
                req = urllib.request.Request(self.BASE_URL, headers=get_headers(self.BASE_URL))
                with urllib.request.urlopen(req, timeout=15) as resp:
                    content = resp.read().decode("utf-8", errors="ignore")
                m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
                self.build_id = m.group(1) if m else "1MG7n4b8bNQ6f3AAGkoP-"
            except Exception:
                self.build_id = "1MG7n4b8bNQ6f3AAGkoP-"
        return self.build_id

    def discover(self) -> list:
        print(f"[*] Discovering UTS subjects for {self.year}...")
        url = f"{self.BASE_URL}/api/search/search-academic-items"
        all_subjects = []
        offset = 0
        batch = 100
        total = None

        while total is None or offset < total:
            payload = {
                "siteId": self.SITE_ID,
                "query": "",
                "contenttype": "subject",
                "searchFilters": [
                    {"filterField": "implementationYear", "filterValue": [str(self.year)], "isExactMatch": True}
                ],
                "from": offset,
                "size": batch,
                "siteYear": str(self.year),
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json", **get_headers(self.BASE_URL)}
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            inner = d.get("data", {})
            if total is None:
                total = inner.get("total", 0)
                print(f"    Total UTS subjects reported: {total}")
            res = inner.get("results", [])
            if not res:
                break
            for r in res:
                all_subjects.append({
                    "code": str(r.get("code")).strip(),
                    "title": r.get("title"),
                    "uri": r.get("uri") or f"/subject/{self.year}/{r.get('code')}",
                })
            offset += len(res)
            if offset % 500 == 0 or offset >= total:
                print(f"    Discovered {offset} / {total} subjects...")
            time.sleep(0.1)

        out_path = os.path.join(INDEX_DIR, "uts_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] UTS: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def _fetch_access_requisites(self, code: str) -> tuple:
        access_url = f"https://studentforms.uts.edu.au/evop/access/search.cfm?subjectcode={code}"
        req = urllib.request.Request(access_url, headers=get_headers(access_url))
        prereqs = []
        antireqs = []
        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                soup = BeautifulSoup(resp.read().decode("utf-8", errors="ignore"), "html.parser")
                seen_items = set()
                for tr in soup.find_all("tr"):
                    tds = [td.get_text(strip=True) for td in tr.find_all("td")]
                    if len(tds) == 3:
                        item_num, req_type, details = tds
                        if re.match(r"^\d+[a-z]?$", item_num) and details and details not in seen_items:
                            seen_items.add(details)
                            if "anti" in req_type.lower():
                                antireqs.append(details)
                            else:
                                prereqs.append(f"{req_type}: {details}")
                    elif len(tds) == 2:
                        item_num, details = tds
                        if re.match(r"^\d+[a-z]?$", item_num) and details and details not in seen_items:
                            seen_items.add(details)
                            tbl = tr.find_parent("table")
                            prev_sib = tbl.find_previous_sibling() if tbl else None
                            parent_text = prev_sib.get_text() if prev_sib else ""
                            if "anti" in parent_text.lower():
                                antireqs.append(details)
                            else:
                                prereqs.append(details)
        except Exception:
            pass
        return prereqs, antireqs

    def fetch_subject(self, item: dict) -> dict:
        code = str(item["code"]).strip()
        build_id = self.resolve_build_id()
        url = f"{self.BASE_URL}/_next/data/{build_id}/subject/{self.year}/{code}.json?catchAll=subject&catchAll={self.year}&catchAll={code}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        pc = data.get("pageProps", {}).get("pageContent", {})

        # Learning Outcomes
        los = []
        for lo in pc.get("unit_learning_outcomes", []) or pc.get("learning_outcomes", []):
            desc = clean_html(lo.get("description") or lo.get("lo_description"))
            if desc:
                los.append(desc)

        # Assessments
        assessments = []
        raw_assess = pc.get("assessment") or pc.get("assessments")
        if isinstance(raw_assess, list):
            for a in raw_assess:
                name = a.get("name") or a.get("assessment_name")
                weight = a.get("weight") or a.get("percentage") or "N/A"
                if name:
                    assessments.append({
                        "task_name": clean_html(name),
                        "weight_pct": weight,
                    })

        # Requisites & Incompatibilities
        prereqs = []
        antireqs = []
        if pc.get("pre_requisites"):
            prereqs.append(clean_html(pc.get("pre_requisites")))
        if pc.get("exclusions"):
            antireqs.append(clean_html(pc.get("exclusions")))

        # Check external access conditions portal if requisites link detected or empty
        ext_pre, ext_anti = self._fetch_access_requisites(code)
        if ext_pre:
            prereqs.extend(ext_pre)
        if ext_anti:
            antireqs.extend(ext_anti)

        # Overview & Content
        overview = clean_html(pc.get("description") or pc.get("content") or pc.get("overview") or pc.get("aim"))
        teaching_strategies = clean_html(pc.get("teaching_strategies"))
        if teaching_strategies and overview:
            overview = f"{overview}\n\nTeaching Strategies:\n{teaching_strategies}"
        elif teaching_strategies and not overview:
            overview = teaching_strategies

        # Workload
        workload = pc.get("learning_activity_workload")
        workload_str = f"{workload} hours" if workload else clean_html(pc.get("workload_requirements"))

        # Study Level (AQF inference from code if not explicitly given)
        study_level = "Undergraduate"
        if re.match(r"^[0-9]{5}$", code):
            first_digit = code[0]
            # In UTS, codes starting with 2-4 can be UG/PG, but 9xxx or 8xxx often PG
            raw_level = pc.get("study_level_ref") or pc.get("study_level")
            if isinstance(raw_level, str) and "post" in raw_level.lower():
                study_level = "Postgraduate"
            elif isinstance(raw_level, str) and "under" in raw_level.lower():
                study_level = "Undergraduate"


        return {
            "institution": "University of Technology Sydney (UTS)",
            "subject_code": code,
            "title": pc.get("title") or item.get("title"),
            "academic_year": str(self.year),
            "study_level": study_level,
            "credit_points": str(pc.get("credit_points") or "6"),
            "faculty": clean_html(pc.get("parent_academic_org")) or clean_html(pc.get("academic_org")) or "UTS Faculty",
            "school": clean_html(pc.get("academic_org")) or "UTS School",
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": [],
            "incompatibilities": antireqs,
            "assessment_tasks": assessments,
            "workload_hours": workload_str,
            "canonical_url": f"{self.BASE_URL}/subject/{self.year}/{code}",
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class AdelaideSubjectHandler:
    BASE_URL = "https://adelaide.edu.au"
    SITEMAP_URL = "https://adelaide.edu.au/sitemap.xml"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year

    def discover(self) -> list:
        print(f"[*] Discovering University of Adelaide subjects from sitemap...")
        req = urllib.request.Request(self.SITEMAP_URL, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=20) as resp:
            content = resp.read()

        import xml.etree.ElementTree as ET
        root = ET.fromstring(content)
        urls = [loc.text for loc in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc") if loc.text]
        all_subjects = []
        seen = set()

        for u in urls:
            m = re.match(r"^https://adelaide\.edu\.au/study/courses/([a-z]{3,6}-[0-9]{3,5})/?$", u)
            if m:
                slug = m.group(1)
                code = slug.replace("-", "").upper()
                if code not in seen:
                    seen.add(code)
                    all_subjects.append({
                        "code": code,
                        "slug": slug,
                        "url": u,
                    })

        out_path = os.path.join(INDEX_DIR, "adelaide_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] Adelaide: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        url = item.get("url") or f"{self.BASE_URL}/study/courses/{item.get('slug') or item['code'].lower()}/"
        code = item["code"]

        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")

        soup = BeautifulSoup(html, "html.parser")
        h1 = soup.find("h1")
        title = clean_html(h1.get_text(strip=True)) if h1 else item.get("title") or code

        # Degree details metadata sections
        meta = {}
        for section in soup.find_all("div", class_="degree-details-content-section"):
            heading_el = section.find("div", class_="degree-details-content-section-icon-list-top-heading-content")
            sub_el = section.find("div", class_="degree-details-content-section-subtitle")
            if heading_el and sub_el:
                k = heading_el.get_text(strip=True).lower()
                v = sub_el.get_text(strip=True)
                meta[k] = v

        parsed_code = meta.get("area/catalogue", "").replace(" ", "").upper()
        if parsed_code:
            code = parsed_code
        study_level = meta.get("level of study", "Undergraduate")
        credit_points = meta.get("unit value", "6")
        school = meta.get("course owner", "Adelaide University")

        # Syllabus Overview
        overview = ""
        ov_h = soup.find(lambda e: e.name in ["h2", "h3"] and "overview" in e.get_text().lower())
        if ov_h and ov_h.find_next_sibling():
            overview = clean_html(ov_h.find_next_sibling().get_text(strip=True))

        # Learning Outcomes
        los = []
        clo_h = soup.find(lambda e: e.name in ["h2", "h3"] and "learning outcome" in e.get_text().lower())
        if clo_h:
            sib = clo_h.find_next_sibling()
            while sib and sib.name not in ["h2", "h3"]:
                if sib.name in ["ul", "ol"]:
                    for li in sib.find_all("li"):
                        t = clean_html(li.get_text(strip=True))
                        if t and t != "N/A":
                            los.append(t)
                elif sib.name == "p":
                    t = clean_html(sib.get_text(strip=True))
                    if t and t != "N/A" and len(t) > 15:
                        los.append(t)
                sib = sib.find_next_sibling()

        # Assessments
        assessments = []
        as_h = soup.find(lambda e: e.name in ["h2", "h3"] and "assessment" in e.get_text().lower())
        if as_h:
            sib = as_h.find_next_sibling()
            while sib and sib.name not in ["h2", "h3"]:
                if sib.name in ["ul", "ol"]:
                    for li in sib.find_all("li"):
                        txt = clean_html(li.get_text(strip=True))
                        m = re.match(r"^(.*?)\s*[-–—]\s*(\d+%)", txt)
                        if m:
                            assessments.append({"task_name": m.group(1).strip(), "weight_pct": m.group(2).strip()})
                        elif txt and txt != "N/A":
                            assessments.append({"task_name": txt, "weight_pct": "N/A"})
                sib = sib.find_next_sibling()

        # Requisites & Incompatibilities
        prereqs, coreqs, antireqs = [], [], []
        for h in soup.find_all(["h2", "h3"]):
            htxt = h.get_text(strip=True).lower()
            if "prerequisite" in htxt:
                tbl = h.find_next_sibling(class_="cmp-info-table")
                if tbl and tbl.get_text(strip=True) != "N/A":
                    prereqs.append(clean_html(tbl.get_text(strip=True)))
            elif "corequisite" in htxt:
                tbl = h.find_next_sibling(class_="cmp-info-table")
                if tbl and tbl.get_text(strip=True) != "N/A":
                    coreqs.append(clean_html(tbl.get_text(strip=True)))
            elif "antirequisite" in htxt:
                tbl = h.find_next_sibling(class_="cmp-info-table")
                if tbl and tbl.get_text(strip=True) != "N/A":
                    antireqs.append(clean_html(tbl.get_text(strip=True)))

        return {
            "institution": "The University of Adelaide",
            "subject_code": code,
            "title": title,
            "academic_year": str(self.year),
            "study_level": study_level,
            "credit_points": str(credit_points),
            "faculty": "Adelaide University",
            "school": school,
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": coreqs,
            "incompatibilities": antireqs,
            "assessment_tasks": assessments,
            "workload_hours": "N/A",
            "canonical_url": url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class MacquarieSubjectHandler:
    BASE_URL = "https://coursehandbook.mq.edu.au"
    SITE_ID = "mq-prod-pres"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.build_id = None

    def resolve_build_id(self):
        if not self.build_id:
            try:
                req = urllib.request.Request(self.BASE_URL, headers=get_headers(self.BASE_URL))
                with urllib.request.urlopen(req, timeout=15) as resp:
                    content = resp.read().decode("utf-8", errors="ignore")
                m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
                self.build_id = m.group(1) if m else "1MG7n4b8bNQ6f3AAGkoP-"
            except Exception:
                self.build_id = "1MG7n4b8bNQ6f3AAGkoP-"
        return self.build_id

    def discover(self) -> list:
        print(f"[*] Discovering Macquarie University subjects for {self.year}...")
        url = f"{self.BASE_URL}/api/search/search-academic-items"
        all_subjects = []
        offset = 0
        batch = 100
        total = None

        while total is None or offset < total:
            payload = {
                "siteId": self.SITE_ID,
                "query": "",
                "contenttype": "subject",
                "searchFilters": [
                    {"filterField": "implementationYear", "filterValue": [str(self.year)], "isExactMatch": True}
                ],
                "from": offset,
                "size": batch,
                "siteYear": str(self.year),
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json", **get_headers(self.BASE_URL)}
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            inner = d.get("data", {})
            if total is None:
                total = inner.get("total", 0)
                print(f"    Total Macquarie subjects reported: {total}")
            res = inner.get("results", [])
            if not res:
                break
            for r in res:
                all_subjects.append({
                    "code": str(r.get("code")).strip(),
                    "title": r.get("title"),
                    "uri": r.get("uri") or f"/{self.year}/units/{r.get('code')}",
                })
            offset += len(res)
            if offset % 500 == 0 or offset >= total:
                print(f"    Discovered {offset} / {total} subjects...")
            time.sleep(0.1)

        out_path = os.path.join(INDEX_DIR, "mq_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] Macquarie: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = str(item["code"]).strip()
        build_id = self.resolve_build_id()
        url = f"{self.BASE_URL}/_next/data/{build_id}/{self.year}/units/{code}.json?catchAll={self.year}&catchAll=units&catchAll={code}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        pc = data.get("pageProps", {}).get("pageContent", {})

        # Learning Outcomes
        los = []
        for lo in pc.get("unit_learning_outcomes", []) or pc.get("learning_outcomes", []):
            desc = clean_html(lo.get("description") or lo.get("lo_description"))
            if desc:
                los.append(desc)

        # Assessments
        assessments = []
        raw_assess = pc.get("assessments") or pc.get("hb_assessments") or []
        for a in raw_assess:
            name = a.get("assessment_title") or a.get("name") or a.get("assessment_name")
            weight = a.get("weight") or a.get("percentage") or "N/A"
            hurdle = a.get("hurdle_task") == "Yes" or a.get("hurdle") is True
            if name:
                assessments.append({
                    "task_name": clean_html(name),
                    "weight_pct": f"{weight}%" if str(weight).isdigit() else str(weight),
                    "hurdle": hurdle,
                })

        # Requisites & Incompatibilities
        prereqs = []
        antireqs = []
        for r_obj in pc.get("requisites", []):
            rtype = r_obj.get("requisite_type", {}).get("label") if isinstance(r_obj.get("requisite_type"), dict) else ""
            desc = clean_html(r_obj.get("description"))
            target = antireqs if any(k in rtype.lower() for k in ["anti", "nccw", "exclusion"]) else prereqs
            if desc:
                target.append(desc)
            for c in r_obj.get("containers", []):
                for rel in c.get("relationships", []):
                    u_code = rel.get("academic_item_code")
                    u_name = rel.get("academic_item_name")
                    if u_code:
                        target.append(f"{u_code}: {u_name}" if u_name else u_code)

        # Overview
        overview = clean_html(pc.get("description") or pc.get("handbook_synopsis") or pc.get("content"))

        # Study Level
        study_level = "Undergraduate"
        m = re.match(r"^[A-Za-z]{4}([0-9])", code)
        if m and int(m.group(1)) >= 8:
            study_level = "Postgraduate"

        faculty = clean_html(pc.get("parent_academic_org")) or clean_html(pc.get("academic_org")) or "Macquarie Faculty"
        school = clean_html(pc.get("academic_org")) or clean_html(pc.get("school")) or "Macquarie School"

        return {
            "institution": "Macquarie University",
            "subject_code": code,
            "title": pc.get("title") or item.get("title"),
            "academic_year": str(self.year),
            "study_level": study_level,
            "credit_points": str(pc.get("credit_points") or "10"),
            "faculty": faculty,
            "school": school,
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": [],
            "incompatibilities": antireqs,
            "assessment_tasks": assessments,
            "workload_hours": clean_html(pc.get("workload_requirements")),
            "canonical_url": f"{self.BASE_URL}/{self.year}/units/{code}",
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class UniSCSubjectHandler:
    BASE_URL = "https://www.unisc.edu.au"
    SITEMAP_URL = "https://www.unisc.edu.au/XMLsitemap"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year

    def discover(self) -> list:
        print(f"[*] Discovering UniSC subjects from sitemap...")
        req = urllib.request.Request(self.SITEMAP_URL, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=20) as resp:
            txt = resp.read().decode("utf-8", errors="ignore")

        urls = re.findall(r"<loc>(https://www\.unisc\.edu\.au/study/courses-and-programs/courses/course-library/[a-z]{3,4}/([a-z0-9\-]+))</loc>", txt)
        all_subjects = []
        seen = set()

        for full_url, slug in urls:
            m = re.match(r"^([a-z]{3}[0-9]{3})", slug, re.I)
            code = m.group(1).upper() if m else slug.split("-")[0].upper()
            if code not in seen:
                seen.add(code)
                all_subjects.append({
                    "code": code,
                    "slug": slug,
                    "url": full_url,
                })

        out_path = os.path.join(INDEX_DIR, "unisc_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] UniSC: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"].upper()
        main_url = item.get("url") or f"{self.BASE_URL}/study/courses-and-programs/courses/course-library/{code[:3].lower()}/{item.get('slug')}"

        # Fetch official Course Outline directly from CIR Reporting
        outline_url = f"https://cir-reporting.usc.edu.au/CourseOutline/ViewCurrent?courseCode={code}&includeCoordinator=true"
        req = urllib.request.Request(outline_url, headers=get_headers(outline_url))
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")

        soup = BeautifulSoup(html, "html.parser")
        h1 = soup.find("h1") or soup.find("h2")
        title_text = h1.get_text(strip=True) if h1 else code
        # Extract clean title: "Course Outline: ACC106 Accounting Principles" -> "Accounting Principles"
        title = re.sub(r"^(?:Course Outline\s*:\s*)?" + re.escape(code) + r"\s*[-–—:]*\s*", "", title_text, flags=re.I).strip()
        if not title:
            title = code

        # Course overview
        overview = ""
        for p in soup.find_all("p"):
            t = clean_html(p.get_text(strip=True))
            if len(t) > 60 and not t.startswith("This course outline") and not t.startswith("Course coordinator"):
                overview = t
                break

        # Learning Outcomes
        los = []
        lo_h = soup.find(lambda e: e.name in ["h3", "h4"] and "learning" in e.get_text().lower())
        if lo_h:
            tbl = lo_h.find_next("table")
            if tbl:
                for tr in tbl.find_all("tr"):
                    tds = [clean_html(td.get_text(strip=True)) for td in tr.find_all(["th", "td"])]
                    if len(tds) >= 2 and tds[0].isdigit():
                        los.append(tds[1])

        # Assessments
        assessments = []
        for table in soup.find_all("table"):
            th_text = " ".join([th.get_text() for th in table.find_all("th")])
            if "assessment" in th_text.lower() or "weighting" in th_text.lower():
                for tr in table.find_all("tr"):
                    tds = [clean_html(td.get_text(strip=True)) for td in tr.find_all(["th", "td"])]
                    if len(tds) >= 3 and tds[0] not in ["Assessment Type", "Programme Delivery Mode"]:
                        tname = tds[2] if len(tds) > 2 and tds[2] else tds[0]
                        # Look for % in any column
                        wpct = "N/A"
                        for col in tds:
                            m_pct = re.search(r"(\d+%)", col)
                            if m_pct:
                                wpct = m_pct.group(1)
                                break
                        assessments.append({
                            "task_name": tname,
                            "weight_pct": wpct,
                        })

        # Study level from course code digit
        m_lvl = re.search(r"^[A-Za-z]{3}([0-9])", code)
        lvl_digit = int(m_lvl.group(1)) if m_lvl else 1
        study_level = "Undergraduate" if lvl_digit <= 4 else "Postgraduate"

        return {
            "institution": "University of the Sunshine Coast (UniSC)",
            "subject_code": code,
            "title": title,
            "academic_year": str(self.year),
            "study_level": study_level,
            "credit_points": "12",
            "faculty": "UniSC Faculty",
            "school": "UniSC School",
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": [],
            "corequisites": [],
            "incompatibilities": [],
            "assessment_tasks": assessments,
            "workload_hours": "N/A",
            "canonical_url": main_url,
            "course_outline_url": outline_url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class SwinburneSubjectHandler:
    BASE_URL = "https://www.swinburne.edu.au"
    SEARCH_URL = "https://sut-search.funnelback.squiz.cloud/s/search.json"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year

    def discover(self) -> list:
        print(f"[*] Discovering Swinburne University subjects from Funnelback API...")
        all_subjects = []
        seen = set()
        start_rank = 1
        num_ranks = 100
        total = None

        while total is None or start_rank <= total:
            url = f"{self.SEARCH_URL}?collection=sut~sp-units-search&query=!padre&num_ranks={num_ranks}&start_rank={start_rank}"
            req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
            with urllib.request.urlopen(req, timeout=15) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            res_summary = d.get("response", {}).get("resultPacket", {}).get("resultsSummary", {})
            if total is None:
                total = res_summary.get("totalMatching", 0)
                print(f"    Total Swinburne subjects reported: {total}")
            results = d.get("response", {}).get("resultPacket", {}).get("results", [])
            if not results:
                break
            for r in results:
                live_url = r.get("liveUrl") or ""
                m = re.search(r"/course/unit/[a-z]/([a-z0-9]+)/?", live_url, re.I)
                code = m.group(1).upper() if m else ""
                if code and code not in seen:
                    seen.add(code)
                    all_subjects.append({
                        "code": code,
                        "title": r.get("title") or code,
                        "url": live_url,
                    })
            start_rank += len(results)
            if start_rank % 500 == 1 or start_rank >= total:
                print(f"    Discovered {len(all_subjects)} / {total} subjects...")
            time.sleep(0.05)

        out_path = os.path.join(INDEX_DIR, "swinburne_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] Swinburne: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"].upper()
        url = item.get("url") or f"{self.BASE_URL}/course/unit/{code[0].lower()}/{code.lower()}/"

        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="ignore")

        soup = BeautifulSoup(html, "html.parser")
        h1 = soup.find("h1")
        title = clean_html(h1.get_text(strip=True)) if h1 else item.get("title", code)

        # Overview
        overview = ""
        ov_h = soup.find(lambda e: e.name in ["h2", "h3"] and "overview" in e.get_text().lower())
        if ov_h:
            parent_row = ov_h.find_parent("div", class_="row") or ov_h.find_parent("div", class_="container")
            if parent_row:
                for p in parent_row.find_all("p"):
                    t = clean_html(p.get_text(strip=True))
                    if len(t) > 30:
                        overview = t
                        break

        # Learning Outcomes
        los = []
        ulo_h = soup.find(lambda e: e.name in ["h2", "h3"] and "learning outcomes" in e.get_text().lower())
        if ulo_h:
            parent_row = ulo_h.find_parent("div", class_="row") or ulo_h.find_parent("div", class_="container")
            if parent_row:
                ol = parent_row.find("ol") or parent_row.find("ul")
                if ol:
                    for li in ol.find_all("li"):
                        t = clean_html(li.get_text(strip=True))
                        if t:
                            los.append(t)

        # Assessments
        assessments = []
        as_h = soup.find(lambda e: e.name in ["h2", "h3"] and "assessment" in e.get_text().lower())
        if as_h:
            parent_as = as_h.find_parent("div", class_="row") or as_h.find_parent("div", class_="container")
            if parent_as:
                for tbl in parent_as.find_all("table"):
                    for tr in tbl.find_all("tr"):
                        tds = [clean_html(td.get_text(strip=True)) for td in tr.find_all(["th", "td"])]
                        if len(tds) >= 3 and tds[0].lower() not in ["type", "assessment type"]:
                            tname = f"{tds[0]} ({tds[1]})" if len(tds) > 1 and tds[1] else tds[0]
                            wpct = tds[2] if len(tds) > 2 else "N/A"
                            assessments.append({
                                "task_name": tname,
                                "weight_pct": wpct,
                            })

        # Study level from course code digit
        m_lvl = re.search(r"^[A-Za-z]{3}([0-9])", code)
        lvl_digit = int(m_lvl.group(1)) if m_lvl else 1
        study_level = "Undergraduate" if lvl_digit <= 4 else "Postgraduate"

        return {
            "institution": "Swinburne University of Technology",
            "subject_code": code,
            "title": title,
            "academic_year": str(self.year),
            "study_level": study_level,
            "credit_points": "12.5",
            "faculty": "Swinburne Faculty",
            "school": "Swinburne School",
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": [],
            "corequisites": [],
            "incompatibilities": [],
            "assessment_tasks": assessments,
            "workload_hours": "72 hours",
            "canonical_url": url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class NewcastleSubjectHandler:
    BASE_URL = "https://handbook.newcastle.edu.au"
    SITE_ID = "uon-prod-pres"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.build_id = None

    def resolve_build_id(self):
        if not self.build_id:
            try:
                req = urllib.request.Request(self.BASE_URL, headers=get_headers(self.BASE_URL))
                with urllib.request.urlopen(req, timeout=15) as resp:
                    content = resp.read().decode("utf-8", errors="ignore")
                m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
                self.build_id = m.group(1) if m else "1MG7n4b8bNQ6f3AAGkoP-"
            except Exception:
                self.build_id = "1MG7n4b8bNQ6f3AAGkoP-"
        return self.build_id

    def discover(self) -> list:
        print(f"[*] Discovering University of Newcastle subjects for {self.year}...")
        url = f"{self.BASE_URL}/api/search/search-academic-items"
        all_subjects = []
        seen = set()
        offset = 0
        batch = 100
        total = None

        while total is None or offset < total:
            payload = {
                "siteId": self.SITE_ID,
                "query": "",
                "contenttype": "subject",
                "searchFilters": [
                    {"filterField": "implementationYear", "filterValue": [str(self.year)], "isExactMatch": True}
                ],
                "from": offset,
                "size": batch,
                "siteYear": str(self.year),
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json", **get_headers(self.BASE_URL)}
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            inner = d.get("data", {})
            if total is None:
                total = inner.get("total", 0)
                print(f"    Total Newcastle subjects reported: {total}")
            res = inner.get("results", [])
            if not res:
                break
            for r in res:
                code = str(r.get("code") or "").strip()
                if code and code not in seen:
                    seen.add(code)
                    all_subjects.append({
                        "code": code,
                        "title": r.get("title") or code,
                        "uri": r.get("uri") or f"/course/{self.year}/{code}",
                    })
            offset += len(res)
            if offset % 500 == 0 or offset >= total:
                print(f"    Discovered {len(all_subjects)} / {total} subjects...")
            time.sleep(0.05)

        out_path = os.path.join(INDEX_DIR, "newcastle_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] Newcastle: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"].strip()
        build_id = self.resolve_build_id()
        url = f"{self.BASE_URL}/_next/data/{build_id}/course/{self.year}/{code}.json?catchAll=course&catchAll={self.year}&catchAll={code}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        pc = data.get("pageProps", {}).get("pageContent", {})

        # Learning Outcomes
        los = []
        raw_los = pc.get("unit_learning_outcomes", []) or pc.get("learning_outcomes", [])
        for lo in raw_los:
            desc = clean_html(lo.get("description") or lo.get("lo_description"))
            if desc:
                los.append(desc)

        # Assessments
        assessments = []
        raw_assess = pc.get("assessment_data", []) or pc.get("assessments", []) or []
        for a in raw_assess:
            name = a.get("name") or a.get("assessment_type") or "Assessment Task"
            weight = a.get("weight") or "N/A"
            hurdle_str = a.get("hurdle_description") or (a.get("hurdle_type", {}).get("label") if isinstance(a.get("hurdle_type"), dict) else None)
            assessments.append({
                "task_name": clean_html(name),
                "weight_pct": f"{weight}%" if str(weight).isdigit() else str(weight),
                "hurdle": bool(hurdle_str),
            })

        # Requisites & Incompatibilities
        prereqs, antireqs = [], []
        for r_obj in pc.get("requisites", []) or []:
            rtype = r_obj.get("requisite_type", {}).get("label") if isinstance(r_obj.get("requisite_type"), dict) else ""
            desc = clean_html(r_obj.get("description"))
            target = antireqs if "anti" in rtype.lower() else prereqs
            if desc:
                target.append(desc)

        # Overview
        overview = clean_html(pc.get("description") or pc.get("course_content") or pc.get("content"))

        # Study level from first digit of course code
        m_lvl = re.search(r"^[A-Za-z]{4}([0-9])", code)
        lvl_digit = int(m_lvl.group(1)) if m_lvl else 1
        study_level = "Undergraduate" if lvl_digit <= 4 else "Postgraduate"

        faculty = clean_html(pc.get("parent_academic_org")) or clean_html(pc.get("academic_org")) or "University of Newcastle"
        school = clean_html(pc.get("academic_org")) or clean_html(pc.get("school")) or "School"

        return {
            "institution": "University of Newcastle",
            "subject_code": code,
            "title": pc.get("title") or item.get("title", code),
            "academic_year": str(self.year),
            "study_level": study_level,
            "credit_points": str(pc.get("unit_value") or pc.get("credit_points") or "10"),
            "faculty": faculty,
            "school": school,
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": [],
            "incompatibilities": antireqs,
            "assessment_tasks": assessments,
            "workload_hours": clean_html(pc.get("workload_requirements")),
            "canonical_url": f"{self.BASE_URL}/course/{self.year}/{code}",
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


class CSUSubjectHandler:
    BASE_URL = "https://handbook.csu.edu.au"
    SITE_ID = "csu-prod-pres"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year
        self.build_id = None

    def resolve_build_id(self):
        if not self.build_id:
            try:
                req = urllib.request.Request(self.BASE_URL, headers=get_headers(self.BASE_URL))
                with urllib.request.urlopen(req, timeout=15) as resp:
                    content = resp.read().decode("utf-8", errors="ignore")
                m = re.search(r"/_next/static/([A-Za-z0-9_-]+)/_buildManifest\.js", content)
                self.build_id = m.group(1) if m else "1MG7n4b8bNQ6f3AAGkoP-"
            except Exception:
                self.build_id = "1MG7n4b8bNQ6f3AAGkoP-"
        return self.build_id

    def discover(self) -> list:
        print(f"[*] Discovering Charles Sturt University (CSU) subjects for {self.year}...")
        url = f"{self.BASE_URL}/api/search/search-academic-items"
        all_subjects = []
        seen = set()
        offset = 0
        batch = 100
        total = None

        while total is None or offset < total:
            payload = {
                "siteId": self.SITE_ID,
                "query": "",
                "contenttype": "subject",
                "searchFilters": [
                    {"filterField": "implementationYear", "filterValue": [str(self.year)], "isExactMatch": True}
                ],
                "from": offset,
                "size": batch,
                "siteYear": str(self.year),
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json", **get_headers(self.BASE_URL)}
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            inner = d.get("data", {})
            if total is None:
                total = inner.get("total", 0)
                print(f"    Total CSU subjects reported: {total}")
            res = inner.get("results", [])
            if not res:
                break
            for r in res:
                code = str(r.get("code") or "").strip()
                if code and code not in seen:
                    seen.add(code)
                    all_subjects.append({
                        "code": code,
                        "title": str(r.get("title") or code).strip(),
                        "uri": r.get("uri") or f"/subject/{self.year}/{code}",
                    })
            offset += len(res)
            if offset % 500 == 0 or offset >= total:
                print(f"    Discovered {len(all_subjects)} / {total} subjects...")
            time.sleep(0.05)

        out_path = os.path.join(INDEX_DIR, "csu_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] CSU: Saved {len(all_subjects)} subjects to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"].strip()
        build_id = self.resolve_build_id()
        url = f"{self.BASE_URL}/_next/data/{build_id}/subject/{self.year}/{code}.json?catchAll=subject&catchAll={self.year}&catchAll={code}"
        req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        pc = data.get("pageProps", {}).get("pageContent", {})

        # Learning Outcomes
        los = []
        raw_los = pc.get("unit_learning_outcomes", []) or pc.get("learning_outcomes", [])
        for lo in raw_los:
            desc = clean_html(lo.get("description") or lo.get("lo_description"))
            if desc:
                los.append(desc)

        # Assessments
        assessments = []
        raw_assess = pc.get("assessment_data", []) or pc.get("assessments", []) or []
        for a in raw_assess:
            name = a.get("name") or a.get("assessment_type") or a.get("title") or "Assessment Task"
            weight = a.get("weight") or a.get("percentage") or "N/A"
            hurdle_str = a.get("hurdle_description") or (a.get("hurdle_type", {}).get("label") if isinstance(a.get("hurdle_type"), dict) else None)
            assessments.append({
                "task_name": clean_html(name),
                "weight_pct": f"{weight}%" if str(weight).isdigit() else str(weight),
                "hurdle": bool(hurdle_str),
            })

        # Requisites & Incompatibilities
        prereqs, antireqs = [], []
        for r_obj in pc.get("requisites", []) or []:
            rtype = r_obj.get("requisite_type", {}).get("label") if isinstance(r_obj.get("requisite_type"), dict) else ""
            desc = clean_html(r_obj.get("description"))
            target = antireqs if any(k in rtype.lower() for k in ["anti", "exclusion", "prohibition"]) else prereqs
            if desc:
                target.append(desc)
            for c in r_obj.get("containers", []):
                for rel in c.get("relationships", []):
                    u_code = rel.get("academic_item_code")
                    u_name = rel.get("academic_item_name")
                    if u_code:
                        target.append(f"{u_code}: {u_name}" if u_name else u_code)

        # Overview
        overview = clean_html(pc.get("description") or pc.get("content") or pc.get("course_content"))

        # Study level from first digit of code
        m_lvl = re.search(r"^[A-Za-z]{3,4}([0-9])", code)
        lvl_digit = int(m_lvl.group(1)) if m_lvl else 1
        study_level = "Undergraduate" if lvl_digit <= 4 else "Postgraduate"

        faculty = clean_html(pc.get("parent_academic_org")) or clean_html(pc.get("academic_org")) or "Charles Sturt University"
        school = clean_html(pc.get("academic_org")) or clean_html(pc.get("school")) or "School"

        return {
            "institution": "Charles Sturt University (CSU)",
            "subject_code": code,
            "title": clean_html(pc.get("title")) or item.get("title", code),
            "academic_year": str(self.year),
            "study_level": study_level,
            "credit_points": str(pc.get("credit_points") or pc.get("point_value") or "8"),
            "faculty": faculty,
            "school": school,
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": [],
            "incompatibilities": antireqs,
            "assessment_tasks": assessments,
            "workload_hours": clean_html(pc.get("workload_requirements")),
            "canonical_url": f"{self.BASE_URL}/subject/{self.year}/{code}",
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }



class FlindersSubjectHandler:
    BASE_URL = "https://handbook.flinders.edu.au"

    def __init__(self, year=DEFAULT_YEAR):
        self.year = year

    def discover(self) -> list:
        print("[*] Flinders: Discovering subject topics from handbook sitemaps...")
        req = urllib.request.Request(f"{self.BASE_URL}/sitemap.xml", headers=get_headers(self.BASE_URL))
        with urllib.request.urlopen(req, timeout=20) as resp:
            sitemap_index = resp.read().decode("utf-8")
        subs = re.findall(r"<loc>(https://handbook\.flinders\.edu\.au/sitemap/[^<]+)</loc>", sitemap_index)

        topics = {}
        for sub in subs:
            try:
                r = urllib.request.Request(sub, headers=get_headers(self.BASE_URL))
                with urllib.request.urlopen(r, timeout=15) as s_resp:
                    sub_xml = s_resp.read().decode("utf-8")
                matches = re.findall(r"<loc>https://handbook\.flinders\.edu\.au/topics/(202[56])/([A-Z]{4}[0-9A-Za-z]+)</loc>", sub_xml)
                for yr, code in matches:
                    if code not in topics or yr == "2026":
                        topics[code] = yr
            except Exception:
                pass

        all_subjects = [
            {
                "code": c,
                "year": yr,
                "url": f"{self.BASE_URL}/topics/{yr}/{c}",
            }
            for c, yr in sorted(topics.items())
        ]
        out_path = os.path.join(INDEX_DIR, "flinders_subject_index.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(all_subjects, f, indent=2)
        print(f"[+] Flinders: Saved {len(all_subjects)} topics to {out_path}")
        return all_subjects

    def fetch_subject(self, item: dict) -> dict:
        code = item["code"].strip()
        yr = item.get("year", self.year)
        url = item.get("url") or f"{self.BASE_URL}/topics/{yr}/{code}"

        page_html = None
        for attempt in range(4):
            try:
                req = urllib.request.Request(url, headers=get_headers(self.BASE_URL))
                with urllib.request.urlopen(req, timeout=15) as resp:
                    page_html = resp.read().decode("utf-8")
                break
            except Exception as e:
                if attempt < 3:
                    time.sleep(1.0 * (attempt + 1))
                else:
                    return None

        if not page_html:
            return None

        soup = BeautifulSoup(page_html, "html.parser")
        script = soup.find("script", id="__NEXT_DATA__")
        if not script or not script.string:
            return None

        data = json.loads(script.string)
        pc = data.get("props", {}).get("pageProps", {}).get("pageContent", {})
        if not isinstance(pc, dict) or not pc:
            return None

        # Learning Outcomes
        los = []
        raw_los = pc.get("learning_outcomes", []) or []
        for lo in raw_los:
            desc = clean_html(lo.get("description") or lo.get("lo_description"))
            if desc and desc not in los:
                los.append(desc)

        # Assessments
        assessments = []
        raw_assess = pc.get("assessment_data", []) or pc.get("assessments", []) or []
        for a in raw_assess:
            name = a.get("name") or a.get("assessment_type") or a.get("title") or "Assessment Task"
            weight = a.get("weight") or a.get("percentage") or "N/A"
            hurdle_str = a.get("hurdle_description") or (a.get("hurdle_type", {}).get("label") if isinstance(a.get("hurdle_type"), dict) else None)
            assessments.append({
                "task_name": clean_html(name),
                "weight_pct": f"{weight}%" if str(weight).isdigit() else str(weight),
                "hurdle": bool(hurdle_str),
            })

        # Requisites
        prereqs, antireqs = [], []
        raw_pre = clean_html(pc.get("pre_requisites") or pc.get("prerequisites"))
        if raw_pre:
            prereqs.append(raw_pre)
        raw_anti = clean_html(pc.get("anti_requisites") or pc.get("antirequisites") or pc.get("exclusions"))
        if raw_anti:
            antireqs.append(raw_anti)

        for r_obj in pc.get("requisites", []) or []:
            rtype = r_obj.get("requisite_type", {}).get("label") if isinstance(r_obj.get("requisite_type"), dict) else ""
            desc = clean_html(r_obj.get("description"))
            target = antireqs if any(k in rtype.lower() for k in ["anti", "exclusion", "prohibition"]) else prereqs
            if desc and desc not in target:
                target.append(desc)

        # Overview / aims
        overview = clean_html(pc.get("overview") or pc.get("description") or pc.get("content"))
        aims = clean_html(pc.get("aims"))
        if aims and aims not in overview:
            overview = f"{aims}\n\n{overview}".strip() if overview else aims

        # Level
        m_lvl = re.search(r"^[A-Za-z]{4}([0-9])", code)
        lvl_digit = int(m_lvl.group(1)) if m_lvl else 1
        study_level = "Undergraduate" if lvl_digit <= 4 else "Postgraduate"

        return {
            "institution": "Flinders University",
            "subject_code": code,
            "title": clean_html(pc.get("title")) or item.get("title", code),
            "academic_year": str(yr),
            "study_level": study_level,
            "credit_points": str(pc.get("credit_points") or "4.5"),
            "faculty": clean_html(pc.get("academic_org")) or "Flinders University",
            "school": clean_html(pc.get("school")) or clean_html(pc.get("academic_org")) or "School",
            "syllabus_overview": overview,
            "learning_outcomes": los,
            "prerequisites": prereqs,
            "corequisites": [],
            "incompatibilities": antireqs,
            "assessment_tasks": assessments,
            "workload_hours": clean_html(pc.get("total_workload") or pc.get("workload_requirements")),
            "canonical_url": url,
            "scraped_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }


HANDLERS = {
    "monash": MonashSubjectHandler,
    "unsw": UNSWSubjectHandler,
    "latrobe": LaTrobeSubjectHandler,
    "uwa": UWASubjectHandler,
    "anu": ANUSubjectHandler,
    "uq": UQSubjectHandler,
    "usyd": USYDSubjectHandler,
    "uts": UTSSubjectHandler,
    "adelaide": AdelaideSubjectHandler,
    "mq": MacquarieSubjectHandler,
    "unisc": UniSCSubjectHandler,
    "swinburne": SwinburneSubjectHandler,
    "newcastle": NewcastleSubjectHandler,
    "csu": CSUSubjectHandler,
    "flinders": FlindersSubjectHandler,
}

WAVES = {
    "1": ["monash", "unsw", "latrobe"],
    "2": ["uwa", "anu", "uq"],
    "3": ["usyd", "uts", "adelaide", "mq", "unisc", "swinburne", "newcastle", "csu", "flinders"],
}


def load_existing_codes(file_path: str) -> set:
    if not os.path.exists(file_path):
        return set()
    captured = set()
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    try:
                        record = json.loads(line)
                        code = record.get("subject_code") or record.get("code")
                        if code:
                            captured.add(code)
                    except Exception:
                        pass
    except Exception as e:
        print(f"[!] Warning reading {file_path}: {e}")
    return captured


def scrape_institution(inst_id: str, year=DEFAULT_YEAR, workers=DEFAULT_WORKERS, limit=None, force=False):
    if inst_id not in HANDLERS:
        print(f"[!] Unsupported institution: {inst_id}. Available: {list(HANDLERS.keys())}")
        return

    handler = HANDLERS[inst_id](year=year)
    index_file = os.path.join(INDEX_DIR, f"{inst_id}_subject_index.json")

    if not os.path.exists(index_file):
        catalog = handler.discover()
    else:
        with open(index_file, "r", encoding="utf-8") as f:
            catalog = json.load(f)

    jsonl_path = os.path.join(SUBJECTS_DIR, f"{inst_id}_subjects.jsonl")
    existing_codes = set() if force else load_existing_codes(jsonl_path)

    to_scrape = [x for x in catalog if x.get("code") not in existing_codes]
    print(f"[*] {inst_id.upper()} Subject Corpus: {len(catalog)} total, {len(existing_codes)} existing, {len(to_scrape)} pending scrape.")

    if limit and limit > 0:
        to_scrape = to_scrape[:limit]
        print(f"[*] Batch capped at {limit} subjects.")

    if not to_scrape:
        print(f"[+] All discovered {inst_id.upper()} subjects are already captured and up-to-date.")
        update_status(inst_id, len(catalog), len(existing_codes), 0)
        return

    start_time = time.time()
    captured_count = 0

    mode = "w" if force and not os.path.exists(jsonl_path) else "a"
    out_f = open(jsonl_path, mode, encoding="utf-8")

    def worker(item):
        try:
            return handler.fetch_subject(item)
        except Exception as e:
            return None

    print(f"[*] Launching ThreadPoolExecutor (workers={workers}) for {len(to_scrape)} subjects...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
        future_map = {executor.submit(worker, item): item for item in to_scrape}
        for idx, future in enumerate(concurrent.futures.as_completed(future_map)):
            res = future.result()
            if res:
                out_f.write(json.dumps(res) + "\n")
                captured_count += 1
                existing_codes.add(res["subject_code"])

            if (idx + 1) % 50 == 0 or (idx + 1) == len(to_scrape):
                out_f.flush()
                pending = len(to_scrape) - (idx + 1)
                update_status(inst_id, len(catalog), len(existing_codes), pending)
                elapsed = time.time() - start_time
                rate = (idx + 1) / elapsed if elapsed > 0 else 0
                pct = len(existing_codes) / len(catalog) * 100
                print(f"[{inst_id.upper()}] [{idx+1}/{len(to_scrape)}] Progress: {len(existing_codes)}/{len(catalog)} ({pct:.1f}%) | {rate:.1f} subj/s", flush=True)

    out_f.close()
    update_status(inst_id, len(catalog), len(existing_codes), len(catalog) - len(existing_codes))
    elapsed = time.time() - start_time
    print(f"[+] {inst_id.upper()} Scraping completed in {elapsed:.1f}s. Captured {captured_count} subjects. Total preserved: {len(existing_codes)}")


def update_status(inst_id: str, total: int, scraped: int, pending: int):
    status_file = os.path.join(STATUS_DIR, f"{inst_id}_status.json")
    status_data = {
        "institution": inst_id,
        "total": total,
        "scraped": scraped,
        "pending": pending,
        "pct": (scraped / total * 100) if total > 0 else 0,
        "last_updated": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }
    with open(status_file, "w", encoding="utf-8") as f:
        json.dump(status_data, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="National Australian Subject & Syllabus Scraper")
    parser.add_argument("--institution", help="Target institution ID (monash, unsw, latrobe, uwa, all)")
    parser.add_argument("--wave", choices=["1", "2"], help="Execute specific staged wave")
    parser.add_argument("--discover", action="store_true", help="Discover subject catalog only")
    parser.add_argument("--scrape", action="store_true", help="Scrape syllabus details")
    parser.add_argument("--year", default=DEFAULT_YEAR, help="Academic year (default: 2026)")
    parser.add_argument("--workers", type=int, default=DEFAULT_WORKERS, help="Worker pool size")
    parser.add_argument("--limit", type=int, default=None, help="Batch limit")
    parser.add_argument("--force", action="store_true", help="Force re-scrape of existing records")
    args = parser.parse_args()

    institutions = []
    if args.institution:
        institutions = list(HANDLERS.keys()) if args.institution == "all" else [args.institution]
    elif args.wave:
        institutions = WAVES.get(args.wave, [])

    if not institutions:
        print("Please specify --institution <id> or --wave <1|2>. Available: " + ", ".join(HANDLERS.keys()))
        return

    for inst in institutions:
        if args.discover:
            if inst in HANDLERS:
                HANDLERS[inst](year=args.year).discover()
        if args.scrape:
            scrape_institution(inst, year=args.year, workers=args.workers, limit=args.limit, force=args.force)


if __name__ == "__main__":
    main()
