#!/usr/bin/env python3.12
"""Focused URL verifier for the engineering cluster (17-1011/12/22/11).

Checks every source URL in claims + corpus for the 4 ledgers. Flags 404s and
any fabrication-template URL (psc.gov.au/standards/{soc}, jobsandskills.gov.au/
research/{soc}). Reports per-SOC status; does NOT auto-edit (caller decides).
"""
import json
import ssl
import urllib.request
from collections import Counter
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

REPO = Path("/Users/djmulholland/Documents/SXD-Github/DFVA")
SOCS = ["17-1011", "17-1012", "17-1022", "17-2011"]
CTX = ssl.create_default_context(cafile=__import__("subprocess").check_output(
    ["python3.12", "-m", "certifi"]).decode().strip())


def urls_of(soc):
    d = json.loads((REPO / "data" / "professions" / f"{soc}.json").read_text())
    urls = []
    for c in d.get("claims", []):
        for s in c.get("sources", []):
            u = s.get("url")
            if u:
                urls.append((c["id"], c.get("lane"), u))
    # corpus linkedin/l5Sample urls
    c = d.get("corpus", {})
    return urls


def check(item):
    cid, lane, url = item
    try:
        req = urllib.request.Request(url, method="HEAD",
                                     headers={"User-Agent": "dfva-urlcheck/1.0"})
        with urllib.request.urlopen(req, timeout=10, context=CTX) as r:
            return (cid, lane, url, r.status, "")
    except urllib.error.HTTPError as e:
        return (cid, lane, url, e.code, "http_error")
    except Exception as e:
        # retry with GET (some hosts block HEAD)
        try:
            req = urllib.request.Request(url, method="GET",
                                         headers={"User-Agent": "dfva-urlcheck/1.0"})
            with urllib.request.urlopen(req, timeout=10, context=CTX) as r:
                return (cid, lane, url, r.status, "")
        except urllib.error.HTTPError as e:
            return (cid, lane, url, e.code, "http_error")
        except Exception as e:
            return (cid, lane, url, 0, f"{type(e).__name__}: {str(e)[:80]}")


FAB = ("psc.gov.au/standards/", "jobsandskills.gov.au/research/")
for soc in SOCS:
    items = urls_of(soc)
    fab_hits = [i for i in items if any(t in i[2] for t in FAB)]
    with ThreadPoolExecutor(max_workers=16) as ex:
        results = list(ex.map(check, items))
    statuses = Counter(r[3] for r in results)
    dead = [r for r in results if r[3] in (404, 410) or (r[3] == 0 and "CERTIFICATE" not in r[4])]
    certfail = [r for r in results if "CERTIFICATE" in r[4]]
    print(f"\n=== {soc} ===  urls={len(items)}  status={dict(statuses)}")
    if fab_hits:
        print(f"  !! FABRICATION TEMPLATE HITS: {len(fab_hits)}")
        for h in fab_hits[:5]:
            print("    ", h)
    if dead:
        print(f"  DEAD ({len(dead)}):")
        for d in dead[:15]:
            print(f"    [{d[1]}] {d[0]} -> {d[3]} {d[2]}")
    if certfail:
        print(f"  CERT/SSL failures ({len(certfail)}): {certfail[0][2][:60]} ...")
    ok = sum(1 for r in results if r[3] and r[3] < 400)
    print(f"  resolved(<400)={ok}  dead={len(dead)}  certfail={len(certfail)}  fab={len(fab_hits)}")
