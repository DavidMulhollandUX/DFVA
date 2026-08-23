#!/usr/bin/env python3
"""Native Chrome-backed v4 handbook capture runner for Antigravity.

Drives the user's running Google Chrome via AppleScript, extracting handbook
pages verbatim, writing raw JSONs, and filing them into v4-capture-queue.py.

Usage:
    python3 scripts/v4-capture-antigravity.py [batch_size] [--only CODES] [--delay SECONDS]
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEUE_SCRIPT = ROOT / "scripts" / "v4-capture-queue.py"
LOG_SCRIPT = ROOT / "scripts" / "v4-capture-log.py"
RAW_DIR = ROOT / "scrapes" / "v4" / "raw"

DEFAULT_CODES = (
    "b-des,b-sci,mc-urbhort,mc-sciepi,mc-scibif,mc-actsc,mc-bmedsc,mc-scibio,"
    "mc-climsci,mc-bamktg,mc-envlaw,mc-indeng,mc-scwr,me-dcd,dr-philedp,080cn,080cl,300bb"
)

CHALLENGE_MARKERS = (
    "I am human",
    "Additional security check is required",
    "Pardon Our Interruption",
    "_Incapsula_Resource",
    "hCaptcha",
    "Please verify you are a human",
    "Just a moment",
    "Checking your browser",
    "rew-the-dare-is-thounce",
    "Request unsuccessful. Incapsula incident ID",
)

EXTRACT_JS = """(() => {
    const html = document.documentElement ? document.documentElement.outerHTML : "";
    const body = document.body ? document.body.innerText : "";
    const mainEl = document.querySelector("main") || document.body;
    const t = mainEl ? mainEl.innerText.split(/\\nSite footer\\n/)[0] : "";
    const links = [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href).filter(h => /handbook\\.unimelb\\.edu\\.au\\/(\\d{4}\\/)?(subjects|components)\\//.test(h)))];
    return JSON.stringify({text: t, links: links, title: document.title, bodyLength: body.length, htmlSample: html.substring(0, 500)});
})()"""


def queue_cmd(*args: str) -> tuple[int, str]:
    r = subprocess.run(
        [sys.executable, str(QUEUE_SCRIPT), *args],
        capture_output=True,
        text=True,
        cwd=ROOT,
    )
    return r.returncode, (r.stdout or "").strip()


def check_chrome_running() -> bool:
    try:
        r = subprocess.run(
            ["osascript", "-e", 'tell application "Google Chrome" to return (count of windows) >= 0'],
            capture_output=True,
            text=True,
            timeout=5,
        )
        return "true" in r.stdout.lower()
    except Exception:
        return False


def fetch_url_in_chrome(url: str) -> tuple[str | None, str, list[str]]:
    """Navigate Chrome to `url`, wait for page load, and extract text and links."""
    escaped_js = EXTRACT_JS.replace("\\", "\\\\").replace('"', '\\"')
    applescript = f"""
    tell application "Google Chrome"
        if not (exists front window) then
            make new window
        end if
        tell front window
            set theTab to make new tab with properties {{URL:"{url}"}}
            set active tab index to (count of tabs)
            delay 2
            repeat 35 times
                set ready to (execute active tab javascript "document.readyState")
                set bodyLen to (execute active tab javascript "document.body ? document.body.innerText.length : 0")
                set htmlSample to (execute active tab javascript "document.documentElement ? document.documentElement.outerHTML.substring(0, 300) : ''")
                if htmlSample contains "_Incapsula_Resource" or htmlSample contains "hCaptcha" then
                    exit repeat
                end if
                if ready is "complete" and bodyLen > 80 then
                    exit repeat
                end if
                delay 1
            end repeat
            delay 1
            set pageData to (execute active tab javascript "{escaped_js}")
            close active tab
            return pageData
        end tell
    end tell
    """
    try:
        r = subprocess.run(["osascript", "-e", applescript], capture_output=True, text=True, timeout=60)
    except subprocess.TimeoutExpired:
        return "Chrome navigation timed out after 60s", "", []

    if r.returncode != 0:
        return f"Chrome AppleScript error: {r.stderr.strip()}", "", []

    raw_output = r.stdout.strip()
    if not raw_output:
        return "empty response from Chrome tab", "", []

    try:
        data = json.loads(raw_output)
    except Exception as e:
        return f"JSON decode error: {e} (raw: {raw_output[:100]})", "", []

    text = data.get("text", "")
    links = data.get("links", [])
    body_len = data.get("bodyLength", 0)
    html_sample = data.get("htmlSample", "")

    low = (text + " " + data.get("title", "") + " " + html_sample).lower()
    for marker in CHALLENGE_MARKERS:
        if marker.lower() in low and (len(text) < 3000 or marker != "hCaptcha"):
            return f"challenge page detected: {marker}", "", []

    if body_len < 40 and len(text) < 40:
        return "page text empty or failed to load", "", []

    return None, text, links


def get_target_status(only_codes: set[str]) -> dict:
    rc, out = queue_cmd("status", "--json", "--only", ",".join(only_codes))
    if rc != 0 or not out.startswith("{"):
        return {}
    data = json.loads(out)
    progs = data.get("programs", [])
    target_progs = [p for p in progs if p["code"] in only_codes]
    assembled = sum(1 for p in target_progs if p["assembled"])
    done_pages = sum(p["done"] for p in target_progs)
    pending_pages = sum(p["pending"] for p in target_progs)
    leased_pages = sum(p["inflight"] for p in target_progs)
    return {
        "total": len(target_progs),
        "assembled": assembled,
        "done": done_pages,
        "pending": pending_pages,
        "leased": leased_pages,
        "global_assembled": data.get("summary", {}).get("assembled", 0),
        "global_total": data.get("summary", {}).get("programs", 0),
        "global_done": data.get("summary", {}).get("pages", {}).get("done", 0),
    }


def main() -> int:
    args = sys.argv[1:]
    batch_size = 1
    only_str = DEFAULT_CODES
    delay_s = 22

    if args and not args[0].startswith("-"):
        try:
            batch_size = int(args[0])
            args = args[1:]
        except ValueError:
            pass

    if "--only" in args:
        idx = args.index("--only")
        if idx + 1 < len(args):
            only_str = args[idx + 1]

    if "--delay" in args:
        idx = args.index("--delay")
        if idx + 1 < len(args):
            delay_s = int(args[idx + 1])

    only_set = {c.strip() for c in only_str.split(",") if c.strip()}

    if not check_chrome_running():
        print("ERROR: Google Chrome is not running. Please open Google Chrome and ensure you are logged into your session.", flush=True)
        return 1

    # Step 1: Check queue plan
    rc, plan_out = queue_cmd("plan", str(batch_size), "--only", only_str)
    try:
        plan = json.loads(plan_out)
    except Exception:
        print(f"Error parsing queue plan: {plan_out}", flush=True)
        return 1

    action = plan.get("action")
    if action == "cooloff":
        rem = plan.get("minutesRemaining", 0)
        print(f"QUEUE ACTION: COOLOFF ({rem}m remaining). Reason: {plan.get('reason')}", flush=True)
        subprocess.run([sys.executable, str(LOG_SCRIPT), "--action", "cooloff", "--reason", str(plan.get("reason")), "--remaining", str(rem)])
        return 0
    elif action == "attend":
        print(f"QUEUE ACTION: ATTEND (Human verification required). Reason: {plan.get('reason')}", flush=True)
        subprocess.run([sys.executable, str(LOG_SCRIPT), "--action", "attend", "--reason", str(plan.get("reason"))])
        return 0
    elif action == "idle":
        print("QUEUE ACTION: IDLE (All target pages are currently captured or assembled).", flush=True)
        subprocess.run([sys.executable, str(LOG_SCRIPT), "--action", "idle", "--details", "All target pages in flight or complete"])
        status = get_target_status(only_set)
        if status:
            print(f"Target Coursework Status: {status['assembled']}/{status['total']} assembled · {status['done']} pages done, {status['pending']} pending, {status['leased']} leased", flush=True)
        return 0

    batch = plan.get("batch", [])
    if not batch:
        print("No pages returned in batch.", flush=True)
        return 0

    print(f"Executing capture batch: {len(batch)} page(s)...", flush=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    saved_count = 0
    failed_count = 0
    last_saved_info = ""

    for i, item in enumerate(batch):
        if i > 0 and delay_s > 0:
            print(f"Pacing delay {delay_s}s...", flush=True)
            time.sleep(delay_s)

        code = item["code"]
        slot = item["slot"]
        url = item["url"]
        print(f"[{i+1}/{len(batch)}] Fetching {code}/{slot}: {url} ...", end=" ", flush=True)

        err, text, links = fetch_url_in_chrome(url)
        if err:
            print(f"FAILED: {err}", flush=True)
            if "challenge" in err.lower() or "incapsula" in err.lower():
                print(f"Tripping circuit breaker on challenge: {err}", flush=True)
                queue_cmd("block", err)
                subprocess.run([sys.executable, str(LOG_SCRIPT), "--action", "error", "--reason", f"Challenge detected: {err}"])
                return 1
            failed_count += 1
            continue

        raw_path = RAW_DIR / f"{code}__{slot}.json"
        raw_path.write_text(json.dumps({"text": text, "links": links}, ensure_ascii=False), encoding="utf-8")

        save_rc, save_msg = queue_cmd("save", code, slot)
        if save_rc == 0:
            saved_count += 1
            last_saved_info = f"{code}/{slot} ({len(text)} chars)"
            print(f"SAVED ({len(text)} chars, {len(links)} links)", flush=True)
        else:
            failed_count += 1
            print(f"SAVE REJECTED (exit {save_rc}): {save_msg}", flush=True)

    # Step 3: Assemble & Status
    queue_cmd("assemble")
    status = get_target_status(only_set)

    summary_str = f"Batch finished: {saved_count} saved, {failed_count} failed."
    if last_saved_info:
        summary_str += f" Latest: {last_saved_info}."

    subprocess.run([
        sys.executable,
        str(LOG_SCRIPT),
        "--action", "capture",
        "--attempted", str(len(batch)),
        "--saved", str(saved_count),
        "--failed", str(failed_count),
        "--details", summary_str,
    ])

    if status:
        print("\n" + "=" * 60, flush=True)
        print(f"🎯 TARGET COHORT PROGRESS (18 Coursework Programs):", flush=True)
        print(f"   Assembled : {status['assembled']} / {status['total']} programs", flush=True)
        print(f"   Pages     : {status['done']} done, {status['pending']} pending, {status['leased']} in-flight", flush=True)
        print(f"🌐 GLOBAL PROGRESS: {status['global_assembled']} / {status['global_total']} assembled ({status['global_done']} pages done)", flush=True)
        print("=" * 60, flush=True)

    return 0


if __name__ == "__main__":
    sys.exit(main())
