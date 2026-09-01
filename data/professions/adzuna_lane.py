import os, json, sys, urllib.request, urllib.parse, collections, re, datetime

APP_ID = os.environ.get('ADZUNA_APP_ID')
KEY = os.environ.get('ADZUNA_API_KEY')

def adzuna(what):
    url = ("https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=%s&app_key=%s"
           "&results_per_page=100&what=%s&content-type=application/json"
           % (APP_ID, KEY, urllib.parse.quote(what)))
    req = urllib.request.Request(url, headers={'User-Agent': 'dfva-research/1.0'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

soc = sys.argv[1]
queries = json.load(open(sys.argv[2]))
rawdir = sys.argv[3]
out = {"retrieved": datetime.date.today().isoformat(), "country": "au", "queries": {}}
SKILLS = ["biomedical", "clinical engineering", "medical device", "hospital", "preventative maintenance",
          "predictive maintenance", "calibration", "electrical", "electronics", "troubleshooting",
          "imaging", "ultrasound", "ventilator", "iec 60601", "a-grade licence", "test equipment"]
for q in queries:
    try:
        d = adzuna(q)
        res = d.get("results", [])
        employers = collections.Counter((r.get("company", {}) or {}).get("display_name") or "(unspecified)" for r in res)
        text = " ".join(((r.get("title") or "") + " " + (r.get("description") or "")) for r in res).lower()
        found = {s: len(re.findall(r"\b" + re.escape(s) + r"s?\b", text)) for s in SKILLS}
        found = {k: v for k, v in sorted(found.items(), key=lambda x: -x[1]) if v > 0}
        out["queries"][q] = {
            "count": d.get("count"), "returned": len(res),
            "topEmployers": [e for e, c in employers.most_common(8)],
            "topSkills": dict(list(found.items())[:10]),
        }
        json.dump(d, open(rawdir + "/" + re.sub(r'\W+', '_', q)[:40] + ".json", "w"))
    except Exception as e:
        out["queries"][q] = {"error": str(e)[:200]}
print(json.dumps(out, indent=1))
