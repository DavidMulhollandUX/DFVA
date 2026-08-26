#!/usr/bin/env python3
"""dfva factiva re-auth — open Factiva in your EXISTING Chrome session.

Factiva's OpenAthens login is a session-dependent SSO handoff: the library
resolver URL only completes when opened inside a Chrome that already carries
your University of Melbourne / Google session. A fresh temp profile has no
such session, so the resolver dies on a timed-out SSO page.

This script therefore launches YOUR real Chrome profile (the one with your
logged-in session) with a remote-debugging port, opens the resolver URL there,
polls until Factiva is authenticated, then exports the live cookies.

Usage:
  python3.12 scripts/factiva_reauth.py [--port 9222] [--export data/factiva_cookies.json] [--timeout 600]
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# Correct OpenAthens SSO entry point. Only works inside an existing session.
FACTIVA_URL = ("https://librarysearch.unimelb.edu.au/view/action/uresolver.do"
               "?operation=resolveService&package_service_id=19964600370009604"
               "&institutionId=9604&customerId=9603&VE=true")

# Your real Chrome profile (carries the UoM/Google SSO session).
REAL_PROFILE = os.path.expanduser("~/Library/Application Support/Google/Chrome")

# If we must launch a fresh instance, block on the debug port so we don't
# collide with an already-running Chrome holding the same profile dir.
REAUTH_PROFILE = os.path.expanduser("~/Library/Application Support/Google/Chrome-Reauth")


def _chrome_running_with_port(port: int) -> bool:
    """True if a Chrome already exposes the debug port (we can attach)."""
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex(("127.0.0.1", port)) == 0


def _launch_real_profile(port: int) -> subprocess.Popen | None:
    """Launch a debuggable Chrome that still carries your UoM SSO session.

    Chrome refuses to open a DevTools port on the DEFAULT profile dir
    ("requires a non-default data directory"). But we can't copy the whole
    profile (7GB of cache). So we clone ONLY the session-bearing files
    (Cookies, Login Data, Web Data, Local Storage, Session Storage,
    Preferences) into a small temp profile, then launch THAT with the debug
    port. Your logged-in UoM/Google session survives the clone, so the
    library resolver SSO handoff completes.

    If a Chrome already has the port open, attach instead of relaunching.
    """
    import shutil
    if _chrome_running_with_port(port):
        print(f"[reauth] Chrome already running with debug port {port} — attaching.")
        return None  # caller attaches via CDP

    src = REAL_PROFILE
    if not os.path.isdir(src):
        print(f"[reauth] real Chrome profile not found at {src}", file=sys.stderr)
        sys.exit(4)

    dst = REAUTH_PROFILE
    if os.path.exists(dst):
        shutil.rmtree(dst)
    os.makedirs(dst, exist_ok=True)

    # Session-bearing files/dirs to clone (everything else is regenerated cache).
    session_items = [
        "Cookies", "Cookies-journal",
        "Login Data", "Login Data-journal",
        "Web Data", "Web Data-journal",
        "Local Storage", "Session Storage",
        "Preferences", "Secure Preferences",
        "Google Profile.ico", "Local State",
    ]
    print(f"[reauth] cloning session files from {src} -> {dst} ...")
    for item in session_items:
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        try:
            if os.path.isdir(s):
                shutil.copytree(s, d)
            elif os.path.exists(s):
                shutil.copy2(s, d)
        except Exception as e:
            pass  # non-fatal; most profiles vary
    # Also clone extension settings that may hold SSO state (best-effort).
    for ext_dir in ("Extensions", "Local Extension Settings"):
        s = os.path.join(src, ext_dir)
        if os.path.isdir(s):
            try:
                shutil.copytree(s, os.path.join(dst, ext_dir))
            except Exception:
                pass

    cmd = [CHROME, f"--user-data-dir={dst}", f"--remote-debugging-port={port}",
           "--no-first-run", "--no-default-browser-check", FACTIVA_URL]
    print(f"[reauth] launching cloned session profile with CDP on port {port} ...")
    return subprocess.Popen(cmd)


def factiva_authed(cdp_base: str) -> bool:
    """Connect to the live Chrome and check if any page is an authenticated
    Factiva session.

    Robust heuristic: a page on the Factiva proxy host that is NOT an SSO/login
    wall is treated as authenticated. We also accept Factiva-specific page
    markers (enHeadline, snapshot) when the URL is mid-redirect.
    """
    try:
        with sync_playwright() as p:
            b = p.chromium.connect_over_cdp(cdp_base)
            for ctx in b.contexts:
                for pg in ctx.pages:
                    url = pg.url.lower()
                    if "factiva" not in url:
                        continue
                    # Explicit login walls -> not authed
                    if "sso.unimelb" in url or "login.openathens" in url:
                        continue
                    # Any other factiva page (home, search, snapshot) = authed
                    if "factiva-com" in url or "snapshot-factiva" in url:
                        b.close()
                        return True
                    # Fallback: body markers
                    try:
                        txt = pg.inner_text("body").lower()
                        if "sign in" not in txt and "log in" not in txt and (
                            "factiva" in txt or "enheadline" in txt or "snapshot" in txt):
                            b.close()
                            return True
                    except Exception:
                        pass
            b.close()
    except Exception:
        return False
    return False


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=9222)
    ap.add_argument("--export", default="data/factiva_cookies.json")
    ap.add_argument("--timeout", type=int, default=600)
    args = ap.parse_args()

    proc = _launch_real_profile(args.port)
    print(f"[reauth] Chrome opened at {FACTIVA_URL}")
    print("[reauth] >>> LOG IN to Factiva via UoM SSO in the opened window. <<<")
    print("[reauth] polling for an authenticated Factiva session (up to %ds)..." % args.timeout)

    cdp = f"http://127.0.0.1:{args.port}"
    deadline = time.time() + args.timeout
    while time.time() < deadline:
        if factiva_authed(cdp):
            print("[reauth] authenticated Factiva session detected.")
            break
        time.sleep(10)
    else:
        print("[reauth] TIMEOUT: no authenticated session detected.", file=sys.stderr)
        sys.exit(3)

    cookies = []
    try:
        with sync_playwright() as p:
            b = p.chromium.connect_over_cdp(cdp)
            for ctx in b.contexts:
                cookies.extend(ctx.cookies())
            b.close()
    except Exception as e:
        print(f"[reauth] could not read cookies over CDP: {e}", file=sys.stderr)
        sys.exit(5)

    Path(args.export).parent.mkdir(parents=True, exist_ok=True)
    Path(args.export).write_text(json.dumps({"exported_at": time.time(), "cookies": cookies}, indent=2))
    print(f"[reauth] exported {len(cookies)} cookies -> {args.export}")
    print("[reauth] Loop can now run: python3.12 scripts/factiva_research.py "
          f"--cookies {args.export} --query '...'")
    print("[reauth] NOTE: cookies expire when the server-side session lapses "
          "(hours-1 day). Re-run this script to refresh. Your normal Chrome stays open.")
    sys.exit(0)


if __name__ == "__main__":
    sys.exit(main())
