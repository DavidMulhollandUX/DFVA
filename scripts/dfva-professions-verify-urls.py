#!/usr/bin/env python3
"""
Verify every claim source URL in data/professions/<soc>.json resolves.

Implements verification step 1 of docs/dfva-profession-deep-research.md
Section 8: "every URL in the ledger resolves; record the HTTP status, and
treat a 404 as invalidating the claim." Also flags the specific templated
publisher/URL pattern produced by the now-removed fallback generator in
scripts/dfva-deep-research.py, since that pattern predicts a dead link
before the network call confirms it.

Usage:
    python3 scripts/dfva-professions-verify-urls.py [--out data/professions/url-audit.json]
"""

import argparse
import json
import re
import ssl
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = ssl.create_default_context()

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data" / "professions"

TEMPLATE_URL_RE = re.compile(
    r"psc\.gov\.au/standards/|jobsandskills\.gov\.au/research/"
)
TEMPLATE_PUBLISHER_RE = re.compile(
    r"Peak Body for |Australian Journal of Professional Studies"
)

USER_AGENT = "Mozilla/5.0 (compatible; DFVA-URL-Audit/1.0)"


def check_url(url: str, timeout: float = 10.0) -> tuple[int | None, str]:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=SSL_CONTEXT) as resp:
            return resp.status, "ok"
    except urllib.error.HTTPError as e:
        if e.code in (403, 405, 999):
            # Some servers reject HEAD or bot-gate it; retry with GET.
            try:
                req2 = urllib.request.Request(url, method="GET", headers={"User-Agent": USER_AGENT})
                with urllib.request.urlopen(req2, timeout=timeout, context=SSL_CONTEXT) as resp:
                    return resp.status, "ok"
            except urllib.error.HTTPError as e2:
                return e2.code, "http_error"
            except Exception as e2:
                return None, f"error: {e2}"
        return e.code, "http_error"
    except Exception as e:
        return None, f"error: {e}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(DATA_DIR / "url-audit.json"))
    ap.add_argument("--workers", type=int, default=16)
    args = ap.parse_args()

    records = sorted(DATA_DIR.glob("*.json"))
    records = [r for r in records if r.name not in ("factiva_backlog.json", "linkedin_backlog.json", "url-audit.json")]

    # (soc, claim_id, lane, url, publisher, is_template) for every claim source
    checks = []
    per_soc = {}
    for path in records:
        soc = path.stem
        try:
            data = json.loads(path.read_text())
        except Exception as e:
            print(f"SKIP {soc}: cannot parse ({e})", file=sys.stderr)
            continue
        claims = data.get("claims", [])
        per_soc[soc] = {"title": data.get("title"), "claims": len(claims), "entries": []}
        for c in claims:
            for src in c.get("sources", []):
                url = src.get("url")
                if not url:
                    continue
                publisher = src.get("publisher", "")
                is_template = bool(TEMPLATE_URL_RE.search(url) or TEMPLATE_PUBLISHER_RE.search(publisher))
                checks.append((soc, c.get("id"), c.get("lane"), url, publisher, is_template))

    print(f"Checking {len(checks)} claim-source URLs across {len(per_soc)} records ({args.workers} workers)...", file=sys.stderr)

    results = []
    url_cache = {}

    def work(item):
        soc, claim_id, lane, url, publisher, is_template = item
        if url not in url_cache:
            url_cache[url] = check_url(url)
        status, note = url_cache[url]
        return {
            "soc": soc, "claim_id": claim_id, "lane": lane, "url": url,
            "publisher": publisher, "template_pattern": is_template,
            "http_status": status, "note": note,
            "resolves": status is not None and 200 <= status < 400,
        }

    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        futures = {ex.submit(work, item): item for item in checks}
        done = 0
        for fut in as_completed(futures):
            results.append(fut.result())
            done += 1
            if done % 100 == 0:
                print(f"  {done}/{len(checks)}", file=sys.stderr)

    for r in results:
        per_soc[r["soc"]]["entries"].append(r)

    bad = [r for r in results if not r["resolves"]]
    template_hits = [r for r in results if r["template_pattern"]]
    socs_with_bad_url = sorted({r["soc"] for r in bad})
    socs_with_template = sorted({r["soc"] for r in template_hits})

    summary = {
        "total_urls_checked": len(results),
        "unique_urls_checked": len(url_cache),
        "records_checked": len(per_soc),
        "urls_not_resolving": len(bad),
        "records_with_nonresolving_url": len(socs_with_bad_url),
        "urls_matching_fabrication_template": len(template_hits),
        "records_matching_fabrication_template": len(socs_with_template),
        "records_matching_fabrication_template_list": socs_with_template,
        "records_with_nonresolving_url_list": socs_with_bad_url,
    }

    out = {"summary": summary, "results": results}
    Path(args.out).write_text(json.dumps(out, indent=2))
    print(json.dumps(summary, indent=2))
    print(f"\nFull detail written to {args.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
