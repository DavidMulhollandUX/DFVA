#!/usr/local/bin/python3
"""Capture one leased batch of DFVA v4 handbook pages in a real, persistent Chrome.

    scripts/v4-capture-run.py 30 --only b-des,b-sci [--attended]

(Shebang pins /usr/local/bin/python3 — the interpreter that has Playwright 1.58
and Chrome; the Homebrew python3 does not.)

Successor to the hard-coded one-offs (v4-capture-batch / -session / -my-batch):
it asks the queue for its lease (`plan N --only …`) and drives a headed Google
Chrome on a dedicated profile (~/.dfva/handbook-profile). The profile persists
the handbook's hCaptcha / Incapsula clearance between runs, which a fresh
headless context never sees — that is why the one-offs are blocked on first
navigation. Clear the check once in the window this script opens
(`--attended`), then later runs reuse it.

Rules carried over from the runbook (docs/dfva-v4-capture-system.md):
  * ~22 s between pages, one runner at a time, never parallel.
  * `save` is the only judge of a page; on a challenge or empty extract the
    run stops — unattended it opens the breaker (`block`), attended it waits
    for you to clear the check and continues.
  * Never `fail` a page to skip it: a truncated extract scores wrong
    (mc-mgmthre, W 6→4). Pages we cannot capture are simply left leased and
    come back when the lease expires.
"""

from __future__ import annotations

import json
import site
import subprocess
import sys
import time
from pathlib import Path

_user_site = site.getusersitepackages()
if _user_site not in sys.path:
    sys.path.insert(0, _user_site)

from playwright.sync_api import Page, sync_playwright  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
QUEUE_SCRIPT = ROOT / "scripts" / "v4-capture-queue.py"
PROFILE_DIR = Path.home() / ".dfva" / "handbook-profile"
PAGE_DELAY = 22  # seconds between pages

EXTRACT_JS = """(() => {
  const t = (document.querySelector("main") || document.body).innerText.split(/\\nSite footer\\n/)[0];
  const links = [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href).filter(h => /handbook\\.unimelb\\.edu\\.au\\/(\\d{4}\\/)?(subjects|components)\\//.test(h)))];
  return { text: t, links };
})()"""

CHALLENGE_MARKERS = (
    "I am human",
    "Additional security check is required",
    "Pardon Our Interruption",
    "_Incapsula_Resource",
    "hCaptcha",
    "Please verify you are a human",
    "Just a moment",
    "Checking your browser",
)


def queue(*args: str) -> tuple[int, str]:
    r = subprocess.run(
        [sys.executable, str(QUEUE_SCRIPT), *args],
        capture_output=True,
        text=True,
        timeout=60,
        cwd=ROOT,
    )
    return r.returncode, (r.stdout or "").strip()


def challenge_on(page: Page) -> str | None:
    """Name the challenge marker present, or None. Empty body counts as one:
    the Incapsula shell is an HTTP 200 with nothing in it."""
    try:
        body = page.inner_text("body")
    except Exception:  # noqa: BLE001 — any failure to read is the shell
        body = ""
    if len(body.strip()) < 50:
        return "blank page (Incapsula shell or not loaded)"
    low = body.lower()
    for marker in CHALLENGE_MARKERS:
        if marker.lower() in low and (len(body) < 3000 or marker != "hCaptcha"):
            return marker
    return None


def extract(page: Page, url: str) -> tuple[str | None, str, list[str]]:
    """Load `url`; return (challenge, text, links). challenge is set when the
    page is not a handbook page."""
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=45_000)
        page.wait_for_timeout(2_000)
    except Exception as exc:  # noqa: BLE001
        return f"navigation error: {exc}", "", []
    marker = challenge_on(page)
    if marker:
        return f"challenge page detected: {marker}", "", []
    result = page.evaluate(EXTRACT_JS)
    return None, result["text"], result["links"]


def wait_for_person(page: Page, url: str, why: str) -> None:
    print(f"\n  {why}\n  Clear the check in the Chrome window, then press Enter here…", flush=True)
    input()
    page.goto(url, wait_until="domcontentloaded", timeout=45_000)
    page.wait_for_timeout(2_000)


def main(argv: list[str]) -> int:
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 2
    n = int(argv[0])
    only = ""
    attended = "--attended" in argv
    if "--only" in argv:
        only = argv[argv.index("--only") + 1]

    if attended:
        # A person is at the keyboard — the condition `unblock` encodes — so
        # the open breaker is cleared here rather than by a separate step.
        print("attended run: clearing the breaker →", queue("unblock")[1], flush=True)
    plan_args = ["plan", str(n)] + (["--only", only] if only else [])
    _, out = queue(*plan_args)
    plan = json.loads(out) if out.startswith("{") else {"action": "error", "raw": out}
    if plan.get("action") != "capture":
        print(json.dumps(plan, indent=1))
        print("\nnothing to capture — queue says", plan.get("action"), flush=True)
        return 0
    batch: list[dict] = plan["batch"]
    print(f"leased {len(batch)} page(s); profile {PROFILE_DIR}", flush=True)

    captured: list[dict] = []
    blocked: str | None = None
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            channel="chrome",
            headless=False,
            viewport={"width": 1280, "height": 900},
            locale="en-AU",
        )
        page = context.pages[0] if context.pages else context.new_page()

        for i, entry in enumerate(batch):
            pcode, slot, url = entry["code"], entry["slot"], entry["url"]
            raw_path = ROOT / entry["raw"]
            print(f"\n[{i + 1}/{len(batch)}] {pcode}/{slot}: {url}", flush=True)
            if i:
                time.sleep(PAGE_DELAY)

            challenge, text, links = extract(page, url)
            if challenge and attended:
                wait_for_person(page, url, challenge)
                challenge, text, links = extract(page, url)
            if challenge:
                blocked = challenge
                break

            raw_path.parent.mkdir(parents=True, exist_ok=True)
            raw_path.write_text(
                json.dumps({"text": text, "links": links}, ensure_ascii=False),
                encoding="utf-8",
            )
            rc, msg = queue("save", pcode, slot)
            print(f"  {len(text)} chars, {len(links)} links → save exit={rc}: {msg}", flush=True)
            if rc == 0:
                captured.append({"code": pcode, "slot": slot, "chars": len(text)})
            elif "blocked" in msg or "empty extract" in msg:
                if attended:
                    wait_for_person(page, url, msg)
                    continue  # lease stays; page is re-offered next run
                blocked = msg
                break
            # any other save verdict (too short, not published) is already
            # recorded by the queue — never `fail` it from here.

        context.close()

    if blocked:
        print(f"\nBLOCKED: {blocked}", flush=True)
        if not attended:
            queue("block", blocked)
        print("stop here; wait the cool-off, then re-run with --attended.", flush=True)
        return 1

    rc, out = queue("assemble")
    print(f"\ncaptured {len(captured)}/{len(batch)}; assemble exit={rc}\n{out}", flush=True)
    _, status = queue("status")
    print("\n".join(status.splitlines()[-6:]), flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
