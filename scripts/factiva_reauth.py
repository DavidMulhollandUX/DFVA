#!/usr/bin/env python3
"""dfva factiva re-auth — open a real Chrome for one-time OpenAthens login.

Factiva needs University of Melbourne SSO (interactive username + password),
which the autonomous loop cannot perform. This script launches a visible Chrome
with a remote-debugging port and POLLS (via CDP) until Factiva is authenticated,
then exports the live cookies to data/factiva_cookies.json automatically. No
interactive key press required — just log in in the opened window.

Usage:
  python3.12 scripts/factiva_reauth.py [--port 9222] [--export data/factiva_cookies.json] [--timeout 600]
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from pathlib import Path

import browser_cookie3 as bc
from playwright.sync_api import sync_playwright

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FACTIVA_URL = "https://global-factiva-com.eu1.proxy.openathens.net/sb/default.aspx?lnep=hp"

DOMAINS = [
    "global-factiva-com.eu1.proxy.openathens.net",
    "eu1.proxy.openathens.net",
    "login.openathens.net",
    "factiva.com",
]


def collect_cookies() -> list[dict]:
    seen = {}
    for dom in DOMAINS:
        try:
            for c in bc.chrome(domain_name=dom):
                seen[(c.domain, c.name)] = {
                    "name": c.name, "value": c.value, "domain": c.domain,
                    "path": c.path or "/", "secure": bool(c.secure),
                    "httpOnly": bool(getattr(c, "httponly", False)),
                }
        except Exception:
            pass
    return list(seen.values())


def factiva_authed(cdp_base: str) -> bool:
    """Connect to the live Chrome and check if any page is an authenticated Factiva session."""
    try:
        with sync_playwright() as p:
            b = p.chromium.connect_over_cdp(cdp_base)
            for ctx in b.contexts:
                for pg in ctx.pages:
                    url = pg.url.lower()
                    if "factiva" in url and "sso.unimelb" not in url and "login.openathens" not in url:
                        try:
                            txt = pg.inner_text("body").lower()
                            if "sign in" not in txt and "log in" not in txt:
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

    import tempfile
    prof = tempfile.mkdtemp(prefix="factiva-reauth-")
    cmd = [CHROME, f"--user-data-dir={prof}", f"--remote-debugging-port={args.port}",
           "--no-first-run", "--no-default-browser-check", FACTIVA_URL]
    print(f"[reauth] launching isolated Chrome (profile {prof}) with CDP on port {args.port} ...")
    subprocess.Popen(cmd)
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
        print("[reauth] TIMEOUT: no authenticated session detected. Exporting whatever cookies exist.")
        sys.exit(3)

    cookies = []
    try:
        with sync_playwright() as p:
            b = p.chromium.connect_over_cdp(cdp)
            for ctx in b.contexts:
                for pg in ctx.pages:
                    try:
                        cookies.extend(pg.context.cookies())
                    except Exception:
                        pass
            b.close()
    except Exception as e:
        print(f"[reauth] could not read cookies over CDP: {e}")
    # Fallback: also collect from default Chrome profile via browser_cookie3
    if not cookies:
        cookies = collect_cookies()
    Path(args.export).parent.mkdir(parents=True, exist_ok=True)
    Path(args.export).write_text(json.dumps({"exported_at": time.time(), "cookies": cookies}, indent=2))
    print(f"[reauth] exported {len(cookies)} cookies -> {args.export}")
    print("[reauth] Loop can now run: python3.12 scripts/factiva_research.py "
          f"--cookies {args.export} --query '...'")
    print("[reauth] NOTE: cookies expire when the server-side session lapses "
          "(hours–1 day). Re-run this script to refresh.")
    sys.exit(0)


if __name__ == "__main__":
    sys.exit(main())
