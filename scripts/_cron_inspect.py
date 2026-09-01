import json, os, sys

soc = sys.argv[1] if len(sys.argv) > 1 else '27-1011'
prof_dir = '/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions'
d = json.load(open(os.path.join(prof_dir, f'{soc}.json')))
print("=== title:", d.get('title'), "| anzsco:", d.get('anzsco'), "| conf:", d.get('confidence'))
print("=== jobAds:", json.dumps(d.get('jobAds'), indent=1)[:600])
print("=== corpus keys:", list((d.get('corpus') or {}).keys()))
corpus = d.get('corpus') or {}
print("=== corpus.platforms:", json.dumps(corpus.get('platforms'), indent=1)[:800])
print("=== corpus.linkedin:", json.dumps(corpus.get('linkedin'))[:400])
print("=== corpus.l5Sample present?", bool(corpus.get('l5Sample')))
print("=== corpus.factiva present?", bool(corpus.get('factiva')))
print("\n=== claims by lane ===")
from collections import Counter
claims = d.get('claims', [])
print(Counter(c.get('lane') for c in claims))
print("\n--- sample L4 claims ---")
for c in claims:
    if c.get('lane') == 'L4':
        print(json.dumps({k: c.get(k) for k in ('id','text','sources','disposition','refuted')}, indent=1)[:500])
        break
print("\n--- sample L5 claims ---")
n=0
for c in claims:
    if c.get('lane') == 'L5':
        print(json.dumps({k: c.get(k) for k in ('id','text','sources','disposition','refuted')}, indent=1)[:500])
        n+=1
        if n>=2: break
print("\n--- any claim with refuted=true? ---", sum(1 for c in claims if c.get('refuted')))
print("--- distinct source URLs sample (first 8) ---")
urls = []
for c in claims:
    for s in c.get('sources', []) or []:
        u = s.get('url')
        if u: urls.append(u)
from collections import Counter
print("total source URLs:", len(urls))
for u in urls[:8]:
    print("  ", u)
