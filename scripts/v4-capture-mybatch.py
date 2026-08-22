#!/usr/bin/env python3
"""Custom batch capture for the leased batch (single persistent Playwright browser).

Self-contained reimplementation of the proven v4-capture-batch approach:
one browser context reused across all pages (~behave like a reader), ~20s pacing,
challenge detection, save/block/fail semantics. Inlined because the source module
uses a hyphenated filename that isn't importable as a normal module.
"""
import subprocess
import json
import time
import sys
import os
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

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "v4-capture-queue.py")
PAGE_DELAY = 20  # seconds between pages

BATCH = [
    {"code": "277aa", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/277aa/course-structure", "raw": "scrapes/v4/raw/277aa__structure.json"},
    {"code": "274ab", "slot": "specialisations", "url": "https://handbook.unimelb.edu.au/2026/courses/274ab/majors-minors-specialisations", "raw": "scrapes/v4/raw/274ab__specialisations.json"},
    {"code": "m04aa", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/m04aa", "raw": "scrapes/v4/raw/m04aa__course.json"},
    {"code": "m04aa", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/m04aa/attributes-outcomes-skills", "raw": "scrapes/v4/raw/m04aa__attributes.json"},
    {"code": "m04aa", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/m04aa/course-structure", "raw": "scrapes/v4/raw/m04aa__structure.json"},
    {"code": "mc-anp", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-anp", "raw": "scrapes/v4/raw/mc-anp__course.json"},
    {"code": "mc-anp", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-anp/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-anp__attributes.json"},
    {"code": "mc-anp", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-anp/course-structure", "raw": "scrapes/v4/raw/mc-anp__structure.json"},
    {"code": "mc-ap", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-ap", "raw": "scrapes/v4/raw/mc-ap__course.json"},
    {"code": "mc-ap", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-ap/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-ap__attributes.json"},
    {"code": "mc-ap", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-ap/course-structure", "raw": "scrapes/v4/raw/mc-ap__structure.json"},
    {"code": "mc-chemeng", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-chemeng", "raw": "scrapes/v4/raw/mc-chemeng__course.json"},
    {"code": "mc-chemeng", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-chemeng/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-chemeng__attributes.json"},
    {"code": "mc-chemeng", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-chemeng/course-structure", "raw": "scrapes/v4/raw/mc-chemeng__structure.json"},
    {"code": "mc-civeng", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-civeng", "raw": "scrapes/v4/raw/mc-civeng__course.json"},
    {"code": "mc-civeng", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-civeng/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-civeng__attributes.json"},
    {"code": "mc-civeng", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-civeng/course-structure", "raw": "scrapes/v4/raw/mc-civeng__structure.json"},
    {"code": "mc-cm", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-cm", "raw": "scrapes/v4/raw/mc-cm__course.json"},
    {"code": "mc-cm", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-cm/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-cm__attributes.json"},
    {"code": "mc-cm", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-cm/course-structure", "raw": "scrapes/v4/raw/mc-cm__structure.json"},
    {"code": "mc-eco", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-eco", "raw": "scrapes/v4/raw/mc-eco__course.json"},
    {"code": "mc-eco", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-eco/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-eco__attributes.json"},
    {"code": "mc-eco", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-eco/course-structure", "raw": "scrapes/v4/raw/mc-eco__structure.json"},
    {"code": "mc-engysys", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-engysys", "raw": "scrapes/v4/raw/mc-engysys__course.json"},
    {"code": "mc-engysys", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-engysys/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-engysys__attributes.json"},
    {"code": "mc-engysys", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-engysys/course-structure", "raw": "scrapes/v4/raw/mc-engysys__structure.json"},
    {"code": "mc-env", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-env", "raw": "scrapes/v4/raw/mc-env__course.json"},
    {"code": "mc-env", "slot": "attributes", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-env/attributes-outcomes-skills", "raw": "scrapes/v4/raw/mc-env__attributes.json"},
    {"code": "mc-env", "slot": "structure", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-env/course-structure", "raw": "scrapes/v4/raw/mc-env__structure.json"},
    {"code": "mc-evalo", "slot": "course", "url": "https://handbook.unimelb.edu.au/2026/courses/mc-evalo", "raw": "scrapes/v4/raw/mc-evalo__course.json"},
]


def run_queue_cmd(*args):
    cmd = [sys.executable, QUEUE_SCRIPT] + list(args)
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
    return r.returncode, (r.stdout or "").strip()


def capture_page(page, url):
    try:
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(2000)
    except Exception as e:
        return False, f"navigation error: {e}", "", []

    body_text = ""
    try:
        body_text = page.inner_text("body")
    except Exception:
        pass

    for marker in CHALLENGE_MARKERS:
        if marker.lower() in body_text.lower():
            if len(body_text) < 3000 or marker in ("Pardon Our Interruption", "_Incapsula_Resource", "hCaptcha", "I am human"):
                return False, f"challenge page detected: {marker}", "", []

    if not body_text.strip() or len(body_text.strip()) < 50:
        return False, "blank or near-empty page", "", []

    try:
        result = page.evaluate(EXTRACT_JS)
    except Exception as e:
        return False, f"evaluate error: {e}", "", []

    return True, None, result["text"], result["links"]


def main():
    captured = []
    failed = []
    newly_assembled = []
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

            if os.path.exists(raw_path) and os.path.getsize(raw_path) > 100:
                print(f"  already captured ({os.path.getsize(raw_path)} bytes), skipping", flush=True)
                captured.append({"code": code, "slot": slot, "chars": os.path.getsize(raw_path), "skipped": True})
                continue

            if i > 0:
                print(f"  pacing... waiting {PAGE_DELAY}s", flush=True)
                time.sleep(PAGE_DELAY)

            ok, challenge, text, links = capture_page(page, url)
            if not ok:
                if challenge and ("challenge" in challenge or "blank" in challenge or "navigation error" in challenge or "timeout" in challenge or "evaluate" in challenge):
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

            os.makedirs(os.path.dirname(raw_path), exist_ok=True)
            with open(raw_path, "w") as f:
                json.dump({"text": text, "links": links}, f)

            exit_code, stdout = run_queue_cmd("save", code, slot)
            if exit_code == 0:
                print(f"  saved: {stdout}", flush=True)
                captured.append({"code": code, "slot": slot, "chars": text_len})
                if "assembled" in stdout.lower():
                    newly_assembled.append(code)
            else:
                msg = stdout
                print(f"  save exit={exit_code}: {msg}", flush=True)
                if "blocked page" in msg or "empty extract" in msg:
                    print(f"  BLOCKED by save: {msg}", flush=True)
                    blocked = True
                    block_reason = msg
                    break
                elif "only" in msg and "chars" in msg:
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
                            if "assembled" in stdout2.lower():
                                newly_assembled.append(code)
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

    print("\n=== SUMMARY ===", flush=True)
    print(f"captured: {len(captured)}", flush=True)
    print(f"failed: {len(failed)}", flush=True)
    print(f"blocked: {blocked}", flush=True)
    if blocked:
        print(f"block_reason: {block_reason}", flush=True)
    for c in captured:
        note = f" ({c.get('note', '')})" if c.get("note") else (" (skipped)" if c.get("skipped") else "")
        print(f"  OK: {c['code']}/{c['slot']} ({c.get('chars',0)} chars){note}", flush=True)
    for f in failed:
        print(f"  FAIL: {f['code']}/{f['slot']} — {f['reason']}", flush=True)

    summary = {
        "captured": captured,
        "failed": failed,
        "blocked": blocked,
        "block_reason": block_reason,
        "newly_assembled": list(dict.fromkeys(newly_assembled)),
    }
    summary_path = os.path.join(ROOT, "scrapes", "v4", "mybatch-summary.json")
    os.makedirs(os.path.dirname(summary_path), exist_ok=True)
    with open(summary_path, "w") as f:
        json.dump(summary, f, indent=2)
    print(f"\nSummary written to {summary_path}", flush=True)


if __name__ == "__main__":
    main()
