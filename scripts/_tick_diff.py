import json, glob, os

# Auxiliary captures: 244cw unit pages (not separate programs)
aux_prefixes = ('244cw-',)
scrapes_all = set(os.path.basename(f).replace('.txt','') for f in glob.glob('scrapes/v4/*.txt'))
aux = set(s for s in scrapes_all if any(s.startswith(p) for p in aux_prefixes))
scrapes = sorted(scrapes_all - aux)

# Get all verified panelCv4 codes
verified = set()
evidence_status = {}
for f in glob.glob('dfva/source/evidence/*.json'):
    code = os.path.basename(f).replace('.json','')
    with open(f) as fh:
        d = json.load(fh)
    p = d.get('panelCv4', {})
    v = p.get('verified', {})
    has_panelCv4 = bool(p)
    is_verified = bool(v.get('adversarial') and v.get('mechanical'))
    evidence_status[code] = {'has_panelCv4': has_panelCv4, 'verified': is_verified, 'instrument': p.get('instrument',''), 'adversarial': v.get('adversarial',False), 'mechanical': v.get('mechanical',False)}
    if is_verified:
        verified.add(code)

# Real programs: exclude aux captures
real_programs = sorted(scrapes_all - aux)
real_unscored = sorted(set(real_programs) - verified)

print(f"Total scrapes: {len(scrapes_all)}")
print(f"Auxiliary captures excluded: {len(aux)}")
print(f"Real programs with scrapes: {len(real_programs)}")
print(f"Real programs with verified panelCv4: {len(set(real_programs) & verified)}")
print(f"Real programs UNSCORED: {len(real_unscored)}")
print()
for c in real_unscored:
    es = evidence_status.get(c, {})
    mtime = os.path.getmtime(f'scrapes/v4/{c}.txt')
    print(f"  {c}  mtime={mtime:.0f}  evidence={'YES' if es else 'NO'}  panelCv4={'YES' if es.get('has_panelCv4') else 'NO'}  verified={es.get('verified',False)}  instrument={es.get('instrument','')}  adv={es.get('adversarial',False)}  mech={es.get('mechanical',False)}")
