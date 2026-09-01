#!/usr/bin/env python3.12
import json, ssl, urllib.request
from pathlib import Path

PROF = Path("/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions")
ctx = ssl.create_default_context(cafile=__import__("certifi").where())
socs = ["15-1152", "15-1199", "15-2011", "15-2021"]
bad = []
checked = 0
for soc in socs:
    d = json.loads((PROF / f"{soc}.json").read_text())
    for c in d.get("claims", []):
        if not c.get("id", "").startswith(f"{soc}-empi"):
            continue
        for s in c.get("sources", []):
            u = s.get("url", "")
            if not u:
                continue
            checked += 1
            try:
                req = urllib.request.Request(u, method="HEAD",
                                             headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
                    code = r.getcode()
                    if code >= 400:
                        bad.append((soc, c["id"], u, code))
            except urllib.error.HTTPError as e:
                bad.append((soc, c["id"], u, e.code))
            except Exception as e:
                bad.append((soc, c["id"], u, f"ERR:{type(e).__name__}:{e}"))
print(f"checked {checked} new URLs across {socs}")
if bad:
    print("PROBLEM URLS:")
    for b in bad:
        print("  ", b)
else:
    print("ALL NEW URLS RESOLVED OK (no 404 / errors)")
