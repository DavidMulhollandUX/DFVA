import os, json, subprocess, sys

ROOT = "/Users/djmulholland/Documents/SXD-Github/DFVA"
EV = os.path.join(ROOT, "dfva/source/evidence")
SCR = os.path.join(ROOT, "scrapes/v4")

# 1. Get assembled program codes from the capture queue
out = subprocess.run(["python3", "scripts/v4-capture-queue.py", "status"],
                     cwd=ROOT, capture_output=True, text=True)
lines = out.stdout.splitlines()
assembled = []
for ln in lines:
    parts = ln.split()
    if len(parts) < 7:
        continue
    code = parts[0]
    assembled_flag = parts[-1]
    # columns: code done pend live fail blk pri assembled  (pri may be '*' or empty)
    if assembled_flag == "yes":
        assembled.append(code)
    # also catch lines where assembled is the last col but pri missing
print(f"assembled program codes from queue: {len(assembled)}")

# 2. Inspect evidence files for panelCv4 / verified
verified, unverified, nopanel = [], [], []
for code in assembled:
    epath = os.path.join(EV, f"{code}.json")
    if not os.path.exists(epath):
        nopanel.append(code)
        continue
    try:
        with open(epath) as f:
            data = json.load(f)
    except Exception as e:
        nopanel.append(code)
        continue
    pc = data.get("panelCv4")
    if not pc:
        nopanel.append(code)
        continue
    v = pc.get("verified")
    if isinstance(v, dict):
        ok = v.get("adversarial") is True and v.get("mechanical") is True
    elif isinstance(v, bool):
        ok = v
    else:
        ok = False
    if ok:
        verified.append(code)
    else:
        unverified.append(code)

# 3. Work list = codes needing a (re)score: nopanel + unverified, that have an assembled extract
def mtime(code):
    p = os.path.join(SCR, f"{code}.txt")
    return os.path.getmtime(p) if os.path.exists(p) else None

work = []
for code in nopanel + unverified:
    mt = mtime(code)
    if mt is not None:
        work.append((code, mt, "nopanel" if code in nopanel else "unverified"))

work.sort(key=lambda x: x[1])  # oldest first
print(f"\nverified (skip): {len(verified)}")
print(f"unverified panelCv4: {len(unverified)} -> {unverified}")
print(f"no panelCv4 yet: {len(nopanel)}")
print(f"\nWORK LIST (oldest-first, has extract): {len(work)}")
for code, mt, kind in work[:12]:
    import datetime
    ts = datetime.datetime.fromtimestamp(mt).isoformat()
    print(f"  {code}  {kind:9s}  mtime={ts}")

print("\nTOP 3:", [w[0] for w in work[:3]])
