#!/usr/bin/env python3
"""dfva factiva research — drive Factiva via a live authenticated Chrome.

Factiva authenticates through University of Melbourne OpenAthens SSO, which
requires an interactive username+password step. This script does NOT perform
that login. Instead it consumes an *already authenticated* Factiva session
through one of two bridges:

  MODE A (live CDP bridge): connect to a Chrome you launched with
    --remote-debugging-port=9222 that has an authenticated Factiva tab open.
    Run `scripts/factiva_reauth.py` to launch that Chrome; you log in once;
    the loop then reuses the live session until it expires.

  MODE B (cookie file): load cookies exported by `factiva_reauth.py` into a
    headless Chromium. Works until the server-side session expires (hours to
    a day). Re-run reauth when searches start returning 403 / Sign-In.

The Playwright session is owned by main() for the whole run so the browser is
never closed mid-search.

Usage:
  python3.12 scripts/factiva_research.py --query "..." [--from 2025-01-01]
      [--to 2026-01-01] [--max 20] [--cdp http://127.0.0.1:9222]
      [--cookies data/factiva_cookies.json] [--out data/professions/<soc>/raw/factiva.json]

Output: JSON {authenticated, query, window, count, results[]} where each result
has {headline, source, date, snippet, url, accessDate}. On auth failure it
writes {"authenticated": false, ...} and exits 2.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

FACTIVA_HOME = "https://global-factiva-com.eu1.proxy.openathens.net/sb/default.aspx?lnep=hp"

USER_AGENT = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
             "(KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36")


def die(msg: str, code: int = 1):
    print(msg, file=sys.stderr)
    sys.exit(code)


def open_session(mode: str, target: str):
    if mode == "cdp":
        pw = sync_playwright().start()
        browser = pw.chromium.connect_over_cdp(target.rstrip("/"))
        context = browser.contexts[0] if browser.contexts else browser.new_context()
        page = None
        for c in browser.contexts:
            for pg in c.pages:
                if "factiva" in pg.url.lower():
                    page = pg
                    break
        if page is None:
            page = context.new_page()
            page.goto(FACTIVA_HOME, wait_until="domcontentloaded", timeout=60000)
        return pw, page
    else:
        data = json.loads(Path(target).read_text())
        cookies = data.get("cookies", data if isinstance(data, list) else [])
        pw = sync_playwright().start()
        import tempfile
        prof = tempfile.mkdtemp(prefix="factiva-run-")
        browser = pw.chromium.launch(headless=True, args=["--no-sandbox"])
        ctx = browser.new_context(user_agent=USER_AGENT)
        ctx.add_cookies(cookies)
        page = ctx.new_page()
        page.goto(FACTIVA_HOME, wait_until="domcontentloaded", timeout=60000)
        return pw, page


def is_auth_wall(page) -> bool:
    try:
        txt = page.inner_text("body").lower()
    except Exception:
        txt = ""
    url = page.url.lower()
    return ("sign in" in txt) or ("sso.unimelb" in url) or ("login.openathens" in url)


def date_preset_for(from_date: str, to_date: str) -> str:
    """Map a date window to a Factiva preset label, or None for custom range."""
    try:
        fy = int(from_date[:4])
    except Exception:
        fy = 2000
    year_span = dt.date.today().year - fy
    if year_span <= 0:
        return "In the last day"
    if year_span <= 1:
        return "In the last year"
    if year_span <= 2:
        return "In the last 2 years"
    if year_span <= 5:
        return "In the last 5 years"
    return "All Dates"


def run_search(page, query: str, from_date: str, to_date: str, max_n: int) -> list[dict]:
    # Expand the Free Text Search panel
    page.evaluate("""() => {
        const t = [...document.querySelectorAll('a,span,div')].find(e => (e.textContent||'').trim() === 'Free Text Search');
        if (t) t.click();
    }""")
    page.wait_for_timeout(2000)
    preset = date_preset_for(from_date, to_date)
    page.evaluate("""(args) => {
        const ftx = document.querySelector('#ftx');
        if (ftx) { ftx.focus(); ftx.value = args.q; }
        const sel = document.querySelector('select[name*="dr" i], #dr, select[id*="date" i]');
        if (sel) {
            const o = [...sel.options].find(x => x.text.includes(args.d));
            if (o) { sel.value = o.value; sel.dispatchEvent(new Event('change', {bubbles:true})); }
        }
        const form = ftx ? ftx.closest('form') : null;
        if (form) {
            const btn = form.querySelector('input[type=submit], button[type=submit], button');
            if (btn) btn.click();
        }
    }""", {"q": query, "d": preset})
    page.wait_for_timeout(11000)
    if is_auth_wall(page):
        return []
    results = []
    rows = page.query_selector_all("a.enHeadline")
    for a in rows[:max_n]:
        try:
            headline = (a.inner_text() or "").strip()
            url = a.get_attribute("href") or ""
            if url.startswith("../"):
                url = "https://global-factiva-com.eu1.proxy.openathens.net" + url[2:]
            # Source + date live in the snippet text, e.g. "Monocle, 10:00, 1 September 2026, 1806 words, ..."
            snippet = ""
            try:
                sn = a.evaluate("el => { let n = el.closest('td'); if(!n) return ''; let sib = n.parentElement ? n.parentElement.querySelector('.snippet, .leadFields') : null; return sib ? sib.innerText : ''; }")
                snippet = sn[:500]
            except Exception:
                pass
            # parse source + date from snippet (Factiva format: "Source, HH:MM, DD Month YYYY, N words, Author")
            src = date = ""
            if snippet:
                parts = [p.strip() for p in snippet.split(",")]
                if parts:
                    src = parts[0][:120]
                dm = re.search(r"(\d{1,2}\s+\w+\s+\d{4})", snippet)
                if dm:
                    date = dm.group(1)[:40]
            results.append({
                "headline": headline[:300],
                "source": src,
                "date": date,
                "snippet": snippet[:500],
                "url": url,
                "accessDate": dt.date.today().isoformat(),
            })
        except Exception:
            continue
    return results


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--query", required=True)
    ap.add_argument("--from", dest="from_date", default="2025-01-01")
    ap.add_argument("--to", dest="to_date", default=dt.date.today().isoformat())
    ap.add_argument("--max", type=int, default=20)
    ap.add_argument("--cdp", default=None, help="Connect to a live Chrome via CDP")
    ap.add_argument("--cookies", default=None, help="Load cookies from a JSON file")
    ap.add_argument("--out", default=None, help="Write JSON results to this path")
    args = ap.parse_args()

    if not args.cdp and not args.cookies:
        die("ERROR: provide --cdp (live Chrome) or --cookies (exported session). "
            "Run scripts/factiva_reauth.py first to authenticate.", 2)

    pw = None
    try:
        if args.cdp:
            pw, page = open_session("cdp", args.cdp)
        else:
            pw, page = open_session("cookies", args.cookies)
    except Exception as e:
        die(f"ERROR: could not open Factiva session: {e}", 2)

    try:
        if is_auth_wall(page):
            out = {"authenticated": False,
                   "reason": "OpenAthens session expired or not authenticated — re-run factiva_reauth.py",
                   "url": page.url}
            print(json.dumps(out, indent=2))
            sys.exit(2)

        results = run_search(page, args.query, args.from_date, args.to_date, args.max)
        payload = {
            "authenticated": True,
            "query": args.query,
            "window": [args.from_date, args.to_date],
            "datePreset": date_preset_for(args.from_date, args.to_date),
            "count": len(results),
            "results": results,
            "accessDate": dt.date.today().isoformat(),
        }
        text = json.dumps(payload, indent=2)
        if args.out:
            Path(args.out).parent.mkdir(parents=True, exist_ok=True)
            Path(args.out).write_text(text)
            print(f"[factiva] wrote {len(results)} results -> {args.out}")
        else:
            print(text)
    finally:
        if pw is not None:
            try:
                pw.stop()
            except Exception:
                pass


if __name__ == "__main__":
    main()
