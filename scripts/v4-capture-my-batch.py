#!/usr/bin/env python3
"""Batch processor for the leased DFVA v4 handbook capture batch.

Reuses a single browser context across all pages — more like a real reader.
Paces at ~22 seconds per page. Detects challenge/captcha pages and blocks.
"""
import subprocess
import json
import time
import sys
import os
import site

# Ensure user site-packages is on the path
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
    "Just a moment",
    "Checking your browser",
    "cf-challenge",
]

BATCH = [
    {"code":"mc-anp","slot":"subj-nurs90167","url":"https://handbook.unimelb.edu.au/2026/subjects/nurs90167","raw":"scrapes/v4/raw/mc-anp__subj-nurs90167.json"},
    {"code":"mc-anp","slot":"subj-nurs90167-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/nurs90167/assessment","raw":"scrapes/v4/raw/mc-anp__subj-nurs90167-assessment.json"},
    {"code":"mc-anp","slot":"subj-phrm90002","url":"https://handbook.unimelb.edu.au/2026/subjects/phrm90002","raw":"scrapes/v4/raw/mc-anp__subj-phrm90002.json"},
    {"code":"mc-anp","slot":"subj-phrm90002-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/phrm90002/assessment","raw":"scrapes/v4/raw/mc-anp__subj-phrm90002-assessment.json"},
    {"code":"mc-ap","slot":"subj-mktg90004","url":"https://handbook.unimelb.edu.au/2026/subjects/mktg90004","raw":"scrapes/v4/raw/mc-ap__subj-mktg90004.json"},
    {"code":"mc-ap","slot":"subj-mktg90004-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/mktg90004/assessment","raw":"scrapes/v4/raw/mc-ap__subj-mktg90004-assessment.json"},
    {"code":"mc-ap","slot":"subj-mktg90008","url":"https://handbook.unimelb.edu.au/2026/subjects/mktg90008","raw":"scrapes/v4/raw/mc-ap__subj-mktg90008.json"},
    {"code":"mc-ap","slot":"subj-mktg90008-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/mktg90008/assessment","raw":"scrapes/v4/raw/mc-ap__subj-mktg90008-assessment.json"},
    {"code":"mc-ap","slot":"subj-poph90231","url":"https://handbook.unimelb.edu.au/2026/subjects/poph90231","raw":"scrapes/v4/raw/mc-ap__subj-poph90231.json"},
    {"code":"mc-ap","slot":"subj-poph90231-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/poph90231/assessment","raw":"scrapes/v4/raw/mc-ap__subj-poph90231-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc40005","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc40005","raw":"scrapes/v4/raw/mc-ap__subj-psyc40005.json"},
    {"code":"mc-ap","slot":"subj-psyc40005-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc40005/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc40005-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90100","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90100","raw":"scrapes/v4/raw/mc-ap__subj-psyc90100.json"},
    {"code":"mc-ap","slot":"subj-psyc90100-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90100/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90100-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90101","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90101","raw":"scrapes/v4/raw/mc-ap__subj-psyc90101.json"},
    {"code":"mc-ap","slot":"subj-psyc90101-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90101/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90101-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90102","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90102","raw":"scrapes/v4/raw/mc-ap__subj-psyc90102.json"},
    {"code":"mc-ap","slot":"subj-psyc90102-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90102/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90102-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90103","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90103","raw":"scrapes/v4/raw/mc-ap__subj-psyc90103.json"},
    {"code":"mc-ap","slot":"subj-psyc90103-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90103/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90103-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90104","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90104","raw":"scrapes/v4/raw/mc-ap__subj-psyc90104.json"},
    {"code":"mc-ap","slot":"subj-psyc90104-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90104/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90104-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90105","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90105","raw":"scrapes/v4/raw/mc-ap__subj-psyc90105.json"},
    {"code":"mc-ap","slot":"subj-psyc90105-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90105/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90105-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90106","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90106","raw":"scrapes/v4/raw/mc-ap__subj-psyc90106.json"},
    {"code":"mc-ap","slot":"subj-psyc90106-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90106/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90106-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90107","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90107","raw":"scrapes/v4/raw/mc-ap__subj-psyc90107.json"},
    {"code":"mc-ap","slot":"subj-psyc90107-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90107/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90107-assessment.json"},
    {"code":"mc-ap","slot":"subj-psyc90124","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90124","raw":"scrapes/v4/raw/mc-ap__subj-psyc90124.json"},
    {"code":"mc-ap","slot":"subj-psyc90124-assessment","url":"https://handbook.unimelb.edu.au/2026/subjects/psyc90124/assessment","raw":"scrapes/v4/raw/mc-ap__subj-psyc90124-assessment.json"},
]

QUEUE_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "v4-capture-queue.py")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE_DELAY = 22  # seconds between pages


def run_queue_cmd(*args):
    """Run v4-capture-queue.py with given args. Returns (exit_code, stdout)."""
    cmd = [sys.executable, QUEUE_SCRIPT] + list(args)
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=30, cwd=ROOT)
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
    newly_assembled = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
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
                elif "not published" in msg or "notfound" in msg or "not found" in msg:
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
    summary_path = os.path.join(ROOT, "scrapes", "v4", "my-batch-summary.json")
    with open(summary_path, "w") as f:
        json.dump(summary, f, indent=2)
    print(f"\nSummary written to {summary_path}", flush=True)

    # If not blocked, run assemble and status
    if not blocked:
        print("\n=== ASSEMBLE ===", flush=True)
        ec, out = run_queue_cmd("assemble")
        print(f"assemble exit={ec}: {out}", flush=True)
        # Parse newly assembled codes from output
        for line in (out or "").split("\n"):
            line = line.strip()
            if line and "assembled" in line.lower():
                # Try to extract code from lines like "assembled mc-anp"
                parts = line.split()
                for part in parts:
                    if part.startswith("mc-") or part.startswith("mc_"):
                        newly_assembled.append(part)
        print(f"newly_assembled: {newly_assembled}", flush=True)

        print("\n=== STATUS ===", flush=True)
        ec, out = run_queue_cmd("status")
        print(out, flush=True)


if __name__ == "__main__":
    main()
