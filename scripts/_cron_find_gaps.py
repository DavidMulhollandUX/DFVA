import json, os

q = json.load(open('/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions/research-queue.json'))
prof_dir = '/Users/djmulholland/Documents/SXD-Github/DFVA/data/professions'
status = q['status']
queue = q['queue']

pending_no_file = []
pending_with_file = []
done_no_file = []
for soc in queue:
    st = status.get(soc, 'unknown')
    fpath = os.path.join(prof_dir, f'{soc}.json')
    exists = os.path.exists(fpath)
    if st == 'pending' and not exists:
        pending_no_file.append(soc)
    elif st == 'pending' and exists:
        pending_with_file.append(soc)
    elif st == 'done' and not exists:
        done_no_file.append(soc)

print("queue total:", len(queue))
print("status pending:", sum(1 for v in status.values() if v == 'pending'))
print("status done:", sum(1 for v in status.values() if v == 'done'))
print()
print("PENDING + NO FILE (genuine gaps):", len(pending_no_file))
print(pending_no_file)
print()
print("PENDING + FILE EXISTS (stale status) count:", len(pending_with_file))
# Show major-group distribution of genuine gaps
from collections import Counter
c = Counter(s.split('-')[0] for s in pending_no_file)
print("genuine-gap major groups:", dict(c))
