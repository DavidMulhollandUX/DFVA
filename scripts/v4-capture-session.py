#!/usr/bin/env python3
"""Single-browser batch capturer for the v4 handbook queue.

Launches ONE headless Chromium, reuses one page across all entries (avoids the
rapid one-launch-per-page collisions that broke the per-page helper), and calls
v4-capture-queue.py save for each. Paced ~20s between pages to behave like a reader.

On a challenge/blank page -> calls `block` and stops (never solves it).
Never calls `fail` for tooling errors; pages that won't capture are left pending.
"""
import json
import os
import subprocess
import sys
import time

from playwright.sync_api import sync_playwright

REPO = "/Users/djmulholland/Documents/SXD-Github/DFVA"
CODE = "277aa"

# (slot, url, rawpath)  -- owed pages for 277aa, URLs derived deterministically.
ENTRIES = [
    ("subj-laws70217",            "https://handbook.unimelb.edu.au/2026/subjects/laws70217",            "scrapes/v4/raw/277aa__subj-laws70217.json"),
    ("subj-laws70217-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws70217/assessment", "scrapes/v4/raw/277aa__subj-laws70217-assessment.json"),
    ("subj-laws70242",            "https://handbook.unimelb.edu.au/2026/subjects/laws70242",            "scrapes/v4/raw/277aa__subj-laws70242.json"),
    ("subj-laws70242-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws70242/assessment", "scrapes/v4/raw/277aa__subj-laws70242-assessment.json"),
    ("subj-laws70261",            "https://handbook.unimelb.edu.au/2026/subjects/laws70261",            "scrapes/v4/raw/277aa__subj-laws70261.json"),
    ("subj-laws70261-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws70261/assessment", "scrapes/v4/raw/277aa__subj-laws70261-assessment.json"),
    ("subj-laws70387",            "https://handbook.unimelb.edu.au/2026/subjects/laws70387",            "scrapes/v4/raw/277aa__subj-laws70387.json"),
    ("subj-laws70387-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws70387/assessment", "scrapes/v4/raw/277aa__subj-laws70387-assessment.json"),
    ("subj-laws90035",            "https://handbook.unimelb.edu.au/2026/subjects/laws90035",            "scrapes/v4/raw/277aa__subj-laws90035.json"),
    ("subj-laws90035-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws90035/assessment", "scrapes/v4/raw/277aa__subj-laws90035-assessment.json"),
    ("subj-laws90094",            "https://handbook.unimelb.edu.au/2026/subjects/laws90094",            "scrapes/v4/raw/277aa__subj-laws90094.json"),
    ("subj-laws90094-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws90094/assessment", "scrapes/v4/raw/277aa__subj-laws90094-assessment.json"),
    ("subj-laws90125",            "https://handbook.unimelb.edu.au/2026/subjects/laws90125",            "scrapes/v4/raw/277aa__subj-laws90125.json"),
    ("subj-laws90125-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws90125/assessment", "scrapes/v4/raw/277aa__subj-laws90125-assessment.json"),
    ("subj-laws90298",            "https://handbook.unimelb.edu.au/2026/subjects/laws90298",            "scrapes/v4/raw/277aa__subj-laws90298.json"),
    ("subj-laws90298-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws90298/assessment", "scrapes/v4/raw/277aa__subj-laws90298-assessment.json"),
    ("subj-laws90325",            "https://handbook.unimelb.edu.au/2026/subjects/laws90325",            "scrapes/v4/raw/277aa__subj-laws90325.json"),
    ("subj-laws90325-assessment",  "https://handbook.unimelb.edu.au/2026/subjects/laws90325/assessment", "scrapes/v4/raw/277aa__subj-laws90325-assessment.json"),
]

EXTRACT_JS = """(() => {
  const t = (document.querySelector("main") || document.body).innerText.split(/\\nSite footer\\n/)[0];
  const links = [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href).filter(h => /handbook\\.unimelb\\.edu\\.au\\/(\\d{4}\\/)?(subjects|components)\\//.test(h)))];
  return { text: t, links };
})()"""

CHALLENGE = [
    "i am human", "additional security check is required", "pardon our interruption",
    "hcaptcha", "are you a robot", "please verify you are a human",
    "checking your browser", "cf-challenge", "just a moment",
]


def qcmd(*args):
    return subprocess.run(
        ["python3", "scripts/v4-capture-queue.py", *args],
        cwd=REPO, capture_output=True, text=True,
    )


def main():
    captured = 0
    left = 0
    blocked = False
    left_slots = []
    notes = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                       "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 900}, locale="en-AU",
        )
        page = ctx.new_page()
        try:
            for i, (slot, url, raw) in enumerate(ENTRIES):
                print(f"=== [{i+1}/{len(ENTRIES)}] {slot} :: {url}", flush=True)
                done = False
                for attempt in (1, 2):
                    try:
                        page.goto(url, wait_until="domcontentloaded", timeout=30000)
                    except Exception as e:
                        if attempt == 2:
                            print(f"  nav failed twice: {e}", flush=True)
                            break
                        time.sleep(3)
                        continue
                    time.sleep(2.0)
                    try:
                        body = page.inner_text("body")
                    except Exception:
                        body = ""
                    body_lower = body.lower()
                    try:
                        title = page.title().lower()
                    except Exception:
                        title = ""
                    challenged = any(c in body_lower or c in title for c in CHALLENGE)
                    if challenged or len(body.strip()) < 50:
                        why = "challenge page" if challenged else f"blank ({len(body.strip())} chars)"
                        print(f"  BLOCKED: {why}", flush=True)
                        r = qcmd("block", f"blocked at {slot}: {why}")
                        print("  block:", (r.stdout or r.stderr).strip(), flush=True)
                        blocked = True
                        break
                    try:
                        res = page.evaluate(EXTRACT_JS)
                    except Exception as e:
                        if attempt == 2:
                            print(f"  extract failed twice: {e}", flush=True)
                            break
                        time.sleep(3)
                        continue
                    text = res.get("text", "")
                    links = res.get("links", [])
                    if len(text.strip()) < 200 and attempt == 1:
                        print(f"  short extract ({len(text.strip())} chars), retry once", flush=True)
                        time.sleep(3)
                        continue
                    raw_abs = os.path.join(REPO, raw)
                    os.makedirs(os.path.dirname(raw_abs), exist_ok=True)
                    with open(raw_abs, "w") as f:
                        json.dump({"text": text, "links": links}, f, ensure_ascii=False, indent=2)
                    r = qcmd("save", CODE, slot)
                    out = (r.stdout or "").strip()
                    err = (r.stderr or "").strip()
                    print(f"  save[{attempt}]: {out} (rc={r.returncode})", flush=True)
                    if r.returncode == 0:
                        done = True
                        captured += 1
                        break
                    combined = (out + " " + err).lower()
                    if "blocked" in combined or "empty extract" in combined:
                        rb = qcmd("block", f"save-blocked at {slot}: {out} {err}")
                        print("  block:", (rb.stdout or rb.stderr).strip(), flush=True)
                        blocked = True
                        break
                    # non-block save error: leave pending, do NOT fail
                    print(f"  save error (left pending): {out} {err}", flush=True)
                    notes.append(f"{slot}: save err rc={r.returncode}: {out} {err}")
                    if attempt == 2:
                        break
                    time.sleep(2)
                if blocked:
                    break
                if not done:
                    left += 1
                    left_slots.append(slot)
                    print("  NOT captured (left pending)", flush=True)
                if i < len(ENTRIES) - 1:
                    time.sleep(18)
        finally:
            try:
                browser.close()
            except Exception:
                pass

    print(f"=== SUMMARY captured={captured} left_pending={left} blocked={blocked} "
          f"left_slots={left_slots} notes={notes} ===", flush=True)


if __name__ == "__main__":
    main()
