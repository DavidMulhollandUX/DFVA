#!/usr/bin/env python3
"""Professions of a DFVA program — the research unit for docs/dfva-profession-deep-research.md.

Maps a program's JIR destination titles to O*NET SOC codes using the committed
crosswalks, so a profession can be researched once and joined to every program that
feeds it. Read-only.

    python3 scripts/professions-of.py 195aa
    python3 scripts/professions-of.py 195aa --json

A program with no exact JIR record resolves at field grain instead: take its ASCED
field from data/jsa/program_fields.json and read the destination occupations from
data/jsa/heo_field_destinations.json. Those are field-of-education graduates, not this
program's, and every claim researched from them inherits that grain.

Authoritative resolution (tiers, overrides, pooling) is scripts/dfva-panela-basis.ts.
This is a convenience view over the same data, not a second source of truth.
"""
import csv, json, sys, collections
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load_crosswalk():
    glob_map, scoped = {}, {}
    with open(ROOT / 'data/aioe/v31_extension_crosswalk.csv') as fh:
        for r in csv.DictReader(fh):
            glob_map[r['occupation'].strip().lower()] = (r['onet_soc_code'], r['onet_soc_title'])
    p = ROOT / 'data/aioe/program_scoped_crosswalk.csv'
    if p.exists():
        with open(p) as fh:
            for r in csv.DictReader(fh):
                key = (r.get('program_code', '').strip(), r['occupation'].strip().lower())
                scoped[key] = (r['onet_soc_code'], r['onet_soc_title'])
    return glob_map, scoped


def main(code, as_json=False):
    fields = json.loads((ROOT / 'data/jsa/program_fields.json').read_text())['programs']
    meta = fields.get(code, {})
    name = meta.get('name')
    records = [r for r in json.loads((ROOT / 'data/jir_data.json').read_text())['records']
               if name and r['program'] == name]
    glob_map, scoped = load_crosswalk()

    if not records:
        out = {'code': code, 'name': name, 'grain': 'field',
               'field': meta.get('field'), 'fieldName': meta.get('fieldName'),
               'note': 'no exact JIR record — read destinations from '
                       'data/jsa/heo_field_destinations.json at field grain'}
        print(json.dumps(out, indent=2) if as_json else
              f"{code} ({name}): field grain — {meta.get('field')} {meta.get('fieldName')}\n"
              f"  destinations: data/jsa/heo_field_destinations.json")
        return

    counts, unmapped = collections.Counter(), collections.Counter()
    for rec in records:
        for title in rec.get('job_titles', {}).get('all', []):
            key = title.strip().lower()
            hit = scoped.get((code, key)) or glob_map.get(key)
            (counts if hit else unmapped)[hit or title] += 1

    if as_json:
        print(json.dumps({'code': code, 'name': name, 'grain': 'exact',
                          'n': sum(r.get('n', 0) for r in records),
                          'professions': [{'onet_soc_code': s, 'title': t, 'titles': n}
                                          for (s, t), n in counts.most_common()],
                          'unmapped': list(unmapped)}, indent=2))
        return
    print(f"{code} ({name}) — exact JIR grain, n={sum(r.get('n', 0) for r in records)}")
    for (soc, title), n in counts.most_common():
        print(f"  {soc:12} {title[:44]:46} {n}")
    if unmapped:
        print(f"  UNMAPPED ({len(unmapped)}): {', '.join(list(unmapped)[:8])}")
        print("  -> map with scripts/crosswalk-add.py before researching them")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1], '--json' in sys.argv)
