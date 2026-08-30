#!/usr/bin/env python3.12
"""Focused URL resolver for the 4 comm-soc ledgers touched this run."""
import json, ssl, certifi, urllib.request
from pathlib import Path
import concurrent.futures as cf

ROOT = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
SOCS = ["21-1011", "21-1012", "21-1013", "21-1014"]
ctx = ssl.create_default_context(cafile=certifi.where())

urls = {}
for soc in SOCS:
    d = json.loads((ROOT / f"data/professions/{soc}.json").read_text())
    for c in d.get("claims", []):
        for s in c.get("sources", []):
            u = s.get("url")
            if u and u not in urls:
                urls[u] = (soc, c.get("lane"), c.get("id"))

print(f"unique URLs to check across 4 SOCs: {len(urls)}")

def check(u):
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(u, method=method, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
                return u, r.status, ""
        except urllib.error.HTTPError as e:
            if e.code < 500:
                return u, e.code, str(e)[:80]
        except Exception as e:
            last = f"{type(e).__name__}: {e}"[:80]
    return u, 0, last

bad = []
with cf.ThreadPoolExecutor(max_workers=12) as ex:
    for u, st, note in ex.map(check, list(urls.keys())):
        if st >= 400 or st == 0:
            bad.append((u, st, note))

print(f"\nFAILED/UNRESOLVED URLs: {len(bad)}")
for u, st, note in bad:
    soc, lane, cid = urls[u]
    print(f"  [{soc} {lane} {cid}] {st} {note}  {u}")
if not bad:
    print("ALL URLS RESOLVE (2xx). Verification gate passed for the 4 SOCs.")
