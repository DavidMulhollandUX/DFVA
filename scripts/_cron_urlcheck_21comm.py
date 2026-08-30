#!/usr/bin/env python3.12
"""Scoped URL resolver check for the four community-social ledgers produced this run.

Verifies every unique source URL in the four SOC ledgers resolves (HTTP 200/ok),
retrying HEAD->GET. Reports any non-ok URL so the batch can drop/re-source it.
Does NOT touch other ledgers (legacy remediation is separate tracked work).
"""
import json, ssl, urllib.error, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    import certifi
    CTX = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    CTX = ssl.create_default_context()

PROF = Path("/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions")
SOCS = ["21-1015", "21-1021", "21-1023", "21-1091"]
UA = "Mozilla/5.0 (compatible; DFVA-URL-Audit/1.0)"


def check(url):
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=12, context=CTX) as r:
                return url, r.status, "ok"
        except urllib.error.HTTPError as e:
            if e.code in (403, 405, 999):
                continue
            return url, e.code, "http_error"
        except Exception as e:
            return url, None, f"error: {e}"
    return url, None, "head+get failed"


def main():
    urls = {}
    for soc in SOCS:
        d = json.loads((PROF / f"{soc}.json").read_text())
        for c in d.get("claims", []):
            for s in c.get("sources", []):
                u = s.get("url")
                if u:
                    urls.setdefault(u, soc)
    print(f"checking {len(urls)} unique URLs across {len(SOCS)} ledgers")
    bad = []
    with ThreadPoolExecutor(max_workers=16) as ex:
        futs = {ex.submit(check, u): u for u in urls}
        for f in as_completed(futs):
            u, status, note = f.result()
            if note != "ok":
                bad.append((urls[u], u, status, note))
    if not bad:
        print("ALL URLS RESOLVE OK")
    else:
        print(f"{len(bad)} URL(S) FAILED:")
        for soc, u, st, note in sorted(bad):
            print(f"  [{soc}] {st} {note}  {u}")
    return len(bad)


if __name__ == "__main__":
    raise SystemExit(1 if main() else 0)
