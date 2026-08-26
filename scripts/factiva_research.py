#!/usr/bin/env python3
"""dfva factiva research — drive Factiva via a live authenticated Chrome.

Factiva authenticates through University of Melbourne OpenAthens SSO, which
requires an interactive username+password step. This module does NOT perform
that login. It consumes an *already authenticated* Factiva session through one
of two bridges:

  MODE A (live CDP bridge): connect to a Chrome you launched with
    --remote-debugging-port=9222 that has an authenticated Factiva tab open.
    Run `scripts/factiva_reauth.py` to launch that Chrome; you log in once;
    the loop then reuses the live session until it expires.

  MODE B (cookie file): load cookies exported by `factiva_reauth.py` into a
    headless Chromium. Works until the server-side session expires (hours to
    a day). Re-run reauth when searches start returning 403 / Sign-In.

The Playwright session is owned for the whole object lifetime so the browser
is never closed mid-search, and multiple searches can reuse one browser.

Usage (CLI):
  python3.12 scripts/factiva_research.py --query "..." [--from 2025-01-01]
      [--to 2026-01-01] [--max 20] [--cdp http://127.0.0.1:9222]
      [--cookies data/factiva_cookies.json] [--out out.json]
      [--soc 11-1021] [--log-backlog]

As a module:
  from factiva_research import FactivaResearch, log_backlog
  fr = FactivaResearch("cookies", "data/factiva_cookies.json")
  if fr.authed:
      res = fr.search("procurement AI", "2024-01-01", "2026-08-26", 15)
  fr.close()

Output (per search): JSON {authenticated, query, window, count, results[]}
where each result has {headline, source, date, snippet, url, accessDate}.
On auth failure it returns {"authenticated": false, ...} and, when --log-backlog
is set (or log_backlog is called by the caller), records the gap in
data/professions/factiva_backlog.json so it can be backfilled later.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
import tempfile
from pathlib import Path

from playwright.sync_api import sync_playwright

FACTIVA_HOME = "https://global-factiva-com.eu1.proxy.openathens.net/sb/default.aspx?lnep=hp"

USER_AGENT = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
             "(KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36")

BACKLOG_PATH = Path("data/professions/factiva_backlog.json")


def die(msg: str, code: int = 1):
    print(msg, file=sys.stderr)
    sys.exit(code)


# ---------------------------------------------------------------------------
# Backlog: record professions whose Factiva L3 lane failed, for later backfill.
# ---------------------------------------------------------------------------
def log_backlog(soc: str, reason: str, title: str = "", queries: list[str] | None = None,
                detail: str = ""):
    """Record (or update) a failed Factiva attempt for `soc` in the backlog.

    reason is one of: auth_expired | no_results | error
    The backlog is keyed by soc so repeated failures update one entry rather
    than appending duplicates. On a successful backfill the entry is removed.
    """
    BACKLOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    data = {"version": 1, "updated": dt.datetime.now().isoformat(timespec="seconds"),
            "entries": {}}
    if BACKLOG_PATH.exists():
        try:
            data = json.loads(BACKLOG_PATH.read_text())
            data.setdefault("entries", {})
        except Exception:
            pass
    data["updated"] = dt.datetime.now().isoformat(timespec="seconds")
    prev = data["entries"].get(soc, {})
    data["entries"][soc] = {
        "soc": soc,
        "title": title or prev.get("title", ""),
        "reason": reason,
        "detail": detail or prev.get("detail", ""),
        "attempts": prev.get("attempts", 0) + 1,
        "lastAttempt": dt.datetime.now().isoformat(timespec="seconds"),
        "queries": queries or prev.get("queries", []),
    }
    BACKLOG_PATH.write_text(json.dumps(data, indent=2))
    return data["entries"][soc]


def clear_backlog(soc: str):
    """Remove a soc from the backlog (called on successful backfill)."""
    if not BACKLOG_PATH.exists():
        return
    try:
        data = json.loads(BACKLOG_PATH.read_text())
    except Exception:
        return
    if soc in data.get("entries", {}):
        del data["entries"][soc]
        data["updated"] = dt.datetime.now().isoformat(timespec="seconds")
        BACKLOG_PATH.write_text(json.dumps(data, indent=2))


def report_backlog():
    """Print the current backlog of professions whose Factiva L3 lane needs a retry."""
    if not BACKLOG_PATH.exists():
        print("factiva backlog: empty (no professions pending backfill)")
        return
    try:
        data = json.loads(BACKLOG_PATH.read_text())
    except Exception:
        print("factiva backlog: unreadable")
        return
    entries = data.get("entries", {})
    if not entries:
        print("factiva backlog: empty (no professions pending backfill)")
        return
    print(f"factiva backlog: {len(entries)} profession(s) pending Factiva L3 backfill")
    for soc, e in sorted(entries.items()):
        print(f"  {soc}  {e.get('title','')[:40]:<40}  {e.get('reason'):<12}  "
              f"attempts={e.get('attempts',0)}  last={e.get('lastAttempt','')[:10]}")
    print("re-run: python3.12 scripts/factiva_research.py --soc <code> --title '<t>' "
          "--query '<q>' --cookies data/factiva_cookies.json --log-backlog")


# ---------------------------------------------------------------------------
# Session handling
# ---------------------------------------------------------------------------
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
    """Map a date window to a Factiva preset label."""
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
            snippet = ""
            try:
                sn = a.evaluate("el => { let n = el.closest('td'); if(!n) return ''; let sib = n.parentElement ? n.parentElement.querySelector('.snippet, .leadFields') : null; return sib ? sib.innerText : ''; }")
                snippet = sn[:500]
            except Exception:
                pass
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


class FactivaResearch:
    """Owns one browser session for one or many Factiva searches."""

    def __init__(self, mode: str, target: str):
        self.mode = mode
        self.target = target
        self.pw = None
        self.page = None
        self.authed = False
        try:
            self.pw, self.page = open_session(mode, target)
            self.authed = not is_auth_wall(self.page)
        except Exception as e:
            self.authed = False
            self._open_error = str(e)

    def close(self):
        if self.pw is not None:
            try:
                self.pw.stop()
            except Exception:
                pass

    def search(self, query: str, from_date: str, to_date: str, max_n: int = 15) -> dict:
        if not self.authed:
            return {"authenticated": False, "reason": "session_not_authenticated",
                    "query": query, "results": []}
        try:
            results = run_search(self.page, query, from_date, to_date, max_n)
        except Exception as e:
            return {"authenticated": False, "reason": "search_error", "detail": str(e)[:200],
                    "query": query, "results": []}
        if is_auth_wall(self.page):
            self.authed = False
            return {"authenticated": False, "reason": "auth_wall_after_search",
                    "query": query, "results": []}
        return {
            "authenticated": True,
            "query": query,
            "window": [from_date, to_date],
            "datePreset": date_preset_for(from_date, to_date),
            "count": len(results),
            "results": results,
            "accessDate": dt.date.today().isoformat(),
        }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--query")
    ap.add_argument("--from", dest="from_date", default="2025-01-01")
    ap.add_argument("--to", dest="to_date", default=dt.date.today().isoformat())
    ap.add_argument("--max", type=int, default=20)
    ap.add_argument("--cdp", default=None, help="Connect to a live Chrome via CDP")
    ap.add_argument("--cookies", default=None, help="Load cookies from a JSON file")
    ap.add_argument("--out", default=None, help="Write JSON results to this path")
    ap.add_argument("--soc", default=None, help="SOC code, used for backlog logging")
    ap.add_argument("--title", default="", help="Profession title, for backlog logging")
    ap.add_argument("--log-backlog", action="store_true",
                    help="Record failures to data/professions/factiva_backlog.json")
    ap.add_argument("--report", action="store_true",
                    help="Print the current Factiva backlog (professions needing backfill)")
    args = ap.parse_args()

    if args.report:
        report_backlog()
        return
    if not args.query:
        die("ERROR: --query is required unless --report is given.", 2)

    if not args.cdp and not args.cookies:
        die("ERROR: provide --cdp (live Chrome) or --cookies (exported session). "
            "Run scripts/factiva_reauth.py first to authenticate.", 2)

    fr = FactivaResearch("cdp" if args.cdp else "cookies", args.cdp or args.cookies)
    try:
        if not fr.authed:
            out = {"authenticated": False,
                   "reason": "OpenAthens session expired or not authenticated — re-run factiva_reauth.py",
                   "url": fr.page.url if fr.page else None}
            if args.log_backlog:
                log_backlog(args.soc or "unknown", "auth_expired",
                            title=args.title, queries=[args.query])
            print(json.dumps(out, indent=2))
            sys.exit(2)

        res = fr.search(args.query, args.from_date, args.to_date, args.max)
        if not res.get("authenticated"):
            if args.log_backlog:
                log_backlog(args.soc or "unknown", res.get("reason", "error"),
                            title=args.title, queries=[args.query],
                            detail=res.get("detail", ""))
            print(json.dumps(res, indent=2))
            sys.exit(2)
        if res["count"] == 0 and args.log_backlog:
            # 0 results on this licence for this query — log for alternate-phrasing retry
            log_backlog(args.soc or "unknown", "no_results",
                        title=args.title, queries=[args.query])
        elif res["count"] > 0 and args.log_backlog:
            # Success — remove from backlog so it won't be re-attempted
            clear_backlog(args.soc or "unknown")
        if args.out:
            Path(args.out).parent.mkdir(parents=True, exist_ok=True)
            Path(args.out).write_text(json.dumps(res, indent=2))
            print(f"[factiva] wrote {res['count']} results -> {args.out}")
        else:
            print(json.dumps(res, indent=2))
    finally:
        fr.close()


if __name__ == "__main__":
    main()
