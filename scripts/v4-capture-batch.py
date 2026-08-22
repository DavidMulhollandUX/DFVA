#!/usr/bin/env python3
"""Batch processor for DFVA v4 handbook capture.

Inlines Playwright directly (no subprocess for capture) to avoid env issues.
Reuses a single browser context across all pages — more like a real reader.
Paces at ~20-25 seconds per page.
"""
import subprocess
import json
import time
import sys
import os

# Ensure user site-packages is on the path (background processes may not inherit it)
import site
_user_site = site.getusersitepackages()
if _user_site not in sys.path:
    sys.path.insert(0, _user_site)

from playwright.sync_api import sync_playwright

EXTRACT_JS = """(() => {
  const t = (document.querySelector("main") || document.body).innerText.split(/\\nSite footer\\n/)[0];
  const links = [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href).filter(h => /handbook\\.unimelb\\.edu\\.au\\/(\\d{4}\\/)?(subjects|components)\\//.test(h)))];
  return { text: t, links };
})()"""

CHALLENGE_MARKERS = [
    "I am human",
    "Additional security check is required",
    "Pardon Our Interruption",
    "_Incapsula_Resource",
    "hCaptcha",
    "Please verify you are a human",
]

BATCH = [
    {"code":"195aa","slot":"subj-laws90099-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90099/assessment","raw":"scrapes/v4/raw/195aa__subj-laws90099-assessment.json"},
    {"code":"195aa","slot":"subj-laws90208","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90208","raw":"scrapes/v4/raw/195aa__subj-laws90208.json"},
    {"code":"195aa","slot":"subj-laws90208-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90208/assessment","raw":"scrapes/v4/raw/195aa__subj-laws90208-assessment.json"},
    {"code":"195aa","slot":"subj-laws90229","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90229","raw":"scrapes/v4/raw/195aa__subj-laws90229.json"},
    {"code":"195aa","slot":"subj-laws90229-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90229/assessment","raw":"scrapes/v4/raw/195aa__subj-laws90229-assessment.json"},
    {"code":"195aa","slot":"subj-laws90267","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90267","raw":"scrapes/v4/raw/195aa__subj-laws90267.json"},
    {"code":"195aa","slot":"subj-laws90267-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90267/assessment","raw":"scrapes/v4/raw/195aa__subj-laws90267-assessment.json"},
    {"code":"195aa","slot":"subj-laws90305","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90305","raw":"scrapes/v4/raw/195aa__subj-laws90305.json"},
    {"code":"195aa","slot":"subj-laws90305-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/laws90305/assessment","raw":"scrapes/v4/raw/195aa__subj-laws90305-assessment.json"},
    {"code":"706aa","slot":"subj-ppmn90049","url":"https://handbook.unimelb.edu.au/2026/subjects/ppmn90049","raw":"scrapes/v4/raw/706aa__subj-ppmn90049.json"},
    {"code":"706aa","slot":"subj-ppmn90049-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/ppmn90049/assessment","raw":"scrapes/v4/raw/706aa__subj-ppmn90049-assessment.json"},
    {"code":"706aa","slot":"subj-ppmn90050","url":"https://handbook.unimelb.edu.au/2026/subjects/ppmn90050","raw":"scrapes/v4/raw/706aa__subj-ppmn90050.json"},
    {"code":"706aa","slot":"subj-ppmn90050-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/ppmn90050/assessment","raw":"scrapes/v4/raw/706aa__subj-ppmn90050-assessment.json"},
    {"code":"706aa","slot":"subj-ppmn90058","url":"https://handbook.unimelb.edu.au/2026/subjects/ppmn90058","raw":"scrapes/v4/raw/706aa__subj-ppmn90058.json"},
    {"code":"706aa","slot":"subj-ppmn90058-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/ppmn90058/assessment","raw":"scrapes/v4/raw/706aa__subj-ppmn90058-assessment.json"},
    {"code":"706aa","slot":"subj-soci90003","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90003","raw":"scrapes/v4/raw/706aa__subj-soci90003.json"},
    {"code":"706aa","slot":"subj-soci90003-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90003/assessment","raw":"scrapes/v4/raw/706aa__subj-soci90003-assessment.json"},
    {"code":"706aa","slot":"subj-soci90004","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90004","raw":"scrapes/v4/raw/706aa__subj-soci90004.json"},
    {"code":"706aa","slot":"subj-soci90004-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90004/assessment","raw":"scrapes/v4/raw/706aa__subj-soci90004-assessment.json"},
    {"code":"706aa","slot":"subj-soci90005","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90005","raw":"scrapes/v4/raw/706aa__subj-soci90005.json"},
    {"code":"706aa","slot":"subj-soci90005-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90005/assessment","raw":"scrapes/v4/raw/706aa__subj-soci90005-assessment.json"},
    {"code":"706aa","slot":"subj-soci90010","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90010","raw":"scrapes/v4/raw/706aa__subj-soci90010.json"},
    {"code":"706aa","slot":"subj-soci90010-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90010/assessment","raw":"scrapes/v4/raw/706aa__subj-soci90010-assessment.json"},
    {"code":"706aa","slot":"subj-soci90011","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90011","raw":"scrapes/v4/raw/706aa__subj-soci90011.json"},
    {"code":"706aa","slot":"subj-soci90011-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90011/assessment","raw":"scrapes/v4/raw/706aa__subj-soci90011-assessment.json"},
    {"code":"706aa","slot":"subj-soci90012","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90012","raw":"scrapes/v4/raw/706aa__subj-soci90012.json"},
    {"code":"706aa","slot":"subj-soci90012-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90012/assessment","raw":"scrapes/v4/raw/706aa__subj-soci90012-assessment.json"},
    {"code":"706aa","slot":"subj-soci90013","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90013","raw":"scrapes/v4/raw/706aa__subj-soci90013.json"},
    {"code":"706aa","slot":"subj-soci90013-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90013/assessment","raw":"scrapes/v4/raw/706aa__subj-soci90013-assessment.json"},
    {"code":"706aa","slot":"subj-soci90018","url":"https://handbook.unimelb.edu.au/2026/subjects/soci90018","raw":"scrapes/v4/raw/706aa__subj-soci90018.json"},
]

QUEUE_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "v4-capture-queue.py")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE_DELAY = 20  # seconds between pages


def run_queue_cmd(*args):
    """Run v4-capture-queue.py with given args. Returns (exit_code, stdout)."""
    cmd = [sys.executable, QUEUE_SCRIPT] + list(args)
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
    return r.returncode, (r.stdout or "").strip()


def capture_page(page, url):
    """Navigate to URL and extract text+links. Returns (ok, challenge_or_None, text, links)."""
    try:
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(2000)
    except Exception as e:
        return False, f"navigation error: {e}", "", []

    # Check for challenge / captcha pages
    body_text = ""
    try:
        body_text = page.inner_text("body")
    except Exception:
        pass

    for marker in CHALLENGE_MARKERS:
        if marker.lower() in body_text.lower():
            if len(body_text) < 3000 or marker in ("Pardon Our Interruption", "_Incapsula_Resource", "hCaptcha", "I am human"):
                return False, f"challenge page detected: {marker}", "", []

    # Check for blank/empty page
    if not body_text.strip() or len(body_text.strip()) < 50:
        return False, "blank or near-empty page", "", []

    # Extract using the same JS as browser_exec
    try:
        result = page.evaluate(EXTRACT_JS)
    except Exception as e:
        return False, f"evaluate error: {e}", "", []

    return True, None, result["text"], result["links"]


def main():
    captured = []
    failed = []
    blocked = False
    block_reason = None

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 900},
            locale="en-AU",
        )
        page = context.new_page()

        for i, entry in enumerate(BATCH):
            code = entry["code"]
            slot = entry["slot"]
            url = entry["url"]
            raw_path = os.path.join(ROOT, entry["raw"])
            print(f"\n[{i+1}/{len(BATCH)}] {code}/{slot}: {url}", flush=True)

            # Skip if already captured (non-empty raw file exists)
            if os.path.exists(raw_path) and os.path.getsize(raw_path) > 100:
                print(f"  already captured ({os.path.getsize(raw_path)} bytes), skipping", flush=True)
                captured.append({"code": code, "slot": slot, "chars": os.path.getsize(raw_path)})
                continue

            # Pace: wait between pages (skip on first)
            if i > 0:
                print(f"  pacing... waiting {PAGE_DELAY}s", flush=True)
                time.sleep(PAGE_DELAY)

            # Capture
            ok, challenge, text, links = capture_page(page, url)
            if not ok:
                if challenge and ("challenge" in challenge or "blank" in challenge or "navigation error" in challenge or "timeout" in challenge or "evaluate" in challenge):
                    # This looks like a site-level block
                    print(f"  BLOCKED: {challenge}", flush=True)
                    run_queue_cmd("block", challenge)
                    blocked = True
                    block_reason = challenge
                    break
                else:
                    print(f"  capture failed: {challenge}", flush=True)
                    failed.append({"code": code, "slot": slot, "reason": challenge})
                    continue

            text_len = len(text)
            links_count = len(links)
            print(f"  captured: {text_len} chars, {links_count} links", flush=True)

            # Write raw JSON file
            os.makedirs(os.path.dirname(raw_path), exist_ok=True)
            with open(raw_path, "w") as f:
                json.dump({"text": text, "links": links}, f)

            # Save
            exit_code, stdout = run_queue_cmd("save", code, slot)
            if exit_code == 0:
                print(f"  saved: {stdout}", flush=True)
                captured.append({"code": code, "slot": slot, "chars": text_len})
            else:
                msg = stdout
                print(f"  save exit={exit_code}: {msg}", flush=True)
                if "blocked page" in msg or "empty extract" in msg:
                    # Site-level block — stop immediately
                    print(f"  BLOCKED by save: {msg}", flush=True)
                    blocked = True
                    block_reason = msg
                    break
                elif "only" in msg and "chars" in msg:
                    # Too short — reload once and retry
                    print(f"  too short, retrying...", flush=True)
                    time.sleep(5)
                    ok2, challenge2, text2, links2 = capture_page(page, url)
                    if ok2:
                        with open(raw_path, "w") as f:
                            json.dump({"text": text2, "links": links2}, f)
                        exit_code2, stdout2 = run_queue_cmd("save", code, slot)
                        if exit_code2 == 0:
                            print(f"  retry saved: {stdout2}", flush=True)
                            captured.append({"code": code, "slot": slot, "chars": len(text2)})
                        else:
                            msg2 = stdout2
                            if "blocked" in msg2 or "empty" in msg2:
                                print(f"  BLOCKED on retry: {msg2}", flush=True)
                                blocked = True
                                block_reason = msg2
                                break
                            else:
                                run_queue_cmd("fail", code, slot, f"too short after retry: {msg2}")
                                print(f"  failed after retry", flush=True)
                                failed.append({"code": code, "slot": slot, "reason": f"too short after retry: {msg2}"})
                    else:
                        if challenge2 and ("challenge" in challenge2 or "blank" in challenge2):
                            print(f"  BLOCKED on retry capture: {challenge2}", flush=True)
                            run_queue_cmd("block", challenge2)
                            blocked = True
                            block_reason = challenge2
                            break
                        run_queue_cmd("fail", code, slot, f"capture failed on retry: {challenge2}")
                        failed.append({"code": code, "slot": slot, "reason": f"capture failed on retry: {challenge2}"})
                elif "not published" in msg or "notfound" in msg:
                    print(f"  not published: {msg}", flush=True)
                    captured.append({"code": code, "slot": slot, "chars": text_len, "note": "notfound"})
                else:
                    print(f"  unexpected save error: {msg}", flush=True)
                    failed.append({"code": code, "slot": slot, "reason": msg})

        browser.close()

    # Summary
    print(f"\n=== SUMMARY ===", flush=True)
    print(f"captured: {len(captured)}", flush=True)
    print(f"failed: {len(failed)}", flush=True)
    print(f"blocked: {blocked}", flush=True)
    if blocked:
        print(f"block_reason: {block_reason}", flush=True)
    for c in captured:
        note = f" ({c['note']})" if c.get("note") else ""
        print(f"  OK: {c['code']}/{c['slot']} ({c.get('chars',0)} chars){note}", flush=True)
    for f in failed:
        print(f"  FAIL: {f['code']}/{f['slot']} — {f['reason']}", flush=True)

    # Write summary JSON for the caller
    summary = {
        "captured": captured,
        "failed": failed,
        "blocked": blocked,
        "block_reason": block_reason,
    }
    summary_path = os.path.join(ROOT, "scrapes", "v4", "batch-summary.json")
    with open(summary_path, "w") as f:
        json.dump(summary, f, indent=2)
    print(f"\nSummary written to {summary_path}", flush=True)

if __name__ == "__main__":
    main()
