import json, os
from collections import Counter

q = json.load(open('/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions/research-queue.json'))
prof_dir = '/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions'
status = q['status']
queue = q['queue']

today = '2026-08-31'
def exp_in_future(exp):
    return exp > today if exp else False

pending_with_file = [s for s in queue if status.get(s)=='pending' and os.path.exists(os.path.join(prof_dir, f'{s}.json'))]

print(f"Auditing {len(pending_with_file)} 'pending' records that have files\n")
rows = []
incomplete = []
for soc in pending_with_file:
    d = json.load(open(os.path.join(prof_dir, f'{soc}.json')))
    claims = d.get('claims', [])
    lanes = Counter(c.get('lane') for c in claims)
    corpus = d.get('corpus', {})
    platforms = corpus.get('platforms', [])
    l5_items = sum(p.get('items', 0) for p in platforms)
    jobads = d.get('jobAds') or {}
    ja_count = jobads.get('count') if isinstance(jobads, dict) else None
    conf = d.get('confidence')
    exp = d.get('expires')
    future = exp_in_future(exp)
    # completeness heuristic: has L1, L2, L3, L4(jobAds), L5(corpus platforms)
    has_l1 = lanes.get('L1',0) > 0
    has_l2 = lanes.get('L2',0) > 0
    has_l3 = lanes.get('L3',0) > 0
    has_l4 = bool(jobads) and (ja_count is not None)
    has_l5 = l5_items > 0
    complete = has_l1 and has_l2 and has_l3 and has_l4 and has_l5
    rows.append((soc, len(claims), conf, exp, future, dict(lanes), l5_items, ja_count, complete))
    if not complete:
        incomplete.append((soc, conf, exp, future, dict(lanes), l5_items, ja_count))

print("Incomplete records (missing >=1 lane):", len(incomplete))
for soc, conf, exp, future, lanes, l5, ja in incomplete:
    miss = []
    if lanes.get('L1',0)==0: miss.append('L1')
    if lanes.get('L2',0)==0: miss.append('L2')
    if lanes.get('L3',0)==0: miss.append('L3')
    if not (ja is not None): miss.append('L4')
    if l5==0: miss.append('L5')
    print(f"  {soc}: conf={conf} exp={exp} future={future} missing={miss} lanes={lanes} l5={l5} ja={ja}")

print()
print("Records with expired (past) expiry:", sum(1 for r in rows if not r[4]))
print("Records future expiry:", sum(1 for r in rows if r[4]))
# show claims-count distribution
import statistics
cc = [r[1] for r in rows]
print("claims count min/median/max:", min(cc), statistics.median(cc), max(cc))
