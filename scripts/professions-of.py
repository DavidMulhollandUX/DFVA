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


# The same three sources, in the same precedence, as CROSSWALK_SOURCES in
# scripts/dfva-panela-basis.ts. This file read only the last of them, so a title
# mapped authoritatively — "Health Promotion Officer", the largest single
# destination for public health graduates, along with Management Consultant,
# Solicitor and Software Engineer — was invisible here and dropped from the
# market report's job-family map. What survived was the residual buckets, so a
# Master of Public Health drew its discussion signals from solar accreditation
# and retail, and a Master of Clinical Rehabilitation from GMO research. The
# exposure numbers were always right; only this path was short a crosswalk.
_SOC_TITLES = None


def soc_titles():
    """O*NET SOC code -> title, from the Felten population the indices come from."""
    global _SOC_TITLES
    if _SOC_TITLES is None:
        rows = json.loads((ROOT / 'data/aioe/felten_aioe.json').read_text())
        _SOC_TITLES = {r['soc']: r['title'] for r in rows}
    return _SOC_TITLES


CROSSWALK_SOURCES = (
    'data/aioe/reconciliation/reconcile_C_authoritative_288_index.csv',
    'data/aioe/reconciliation/v2_panelA_new_occupation_crosswalk.csv',
    'data/aioe/v31_extension_crosswalk.csv',
)


def load_crosswalk():
    glob_map, scoped = {}, {}
    for rel in CROSSWALK_SOURCES:
        path = ROOT / rel
        if not path.exists():
            continue
        with open(path) as fh:
            for r in csv.DictReader(fh):
                if not r.get('occupation') or not r.get('onet_soc_code'):
                    continue
                # The authoritative file carries no onet_soc_title column, so the
                # SOC's own name is read from the Felten population rather than
                # falling back to the bare code, which would print "21-1091"
                # where the report means "Health Educators".
                glob_map[r['occupation'].strip().lower()] = (
                    r['onet_soc_code'],
                    r.get('onet_soc_title') or soc_titles().get(r['onet_soc_code'], r['onet_soc_code']))
    p = ROOT / 'data/aioe/program_scoped_crosswalk.csv'
    if p.exists():
        with open(p) as fh:
            for r in csv.DictReader(fh):
                key = (r.get('program_code', '').strip(), r['occupation'].strip().lower())
                scoped[key] = (r['onet_soc_code'], r['onet_soc_title'])
    return glob_map, scoped


# Melbourne codes are bare (244cw, b-sci) or carry one of these prefixes; every
# other prefix is an institution slug (monash-, uq-, usyd-, …).
UOM_CODE_PREFIXES = {'mc', 'b', 'dr', 'dh', 'me'}


def is_melbourne(code):
    prefix, _, rest = code.partition('-')
    return not rest or prefix in UOM_CODE_PREFIXES


def resolve(code):
    """The program's professions as data — what --json prints. Shared with
    dfva-market-scaffold.py so the market report and this view cannot disagree."""
    fields = json.loads((ROOT / 'data/jsa/program_fields.json').read_text())['programs']
    meta = fields.get(code, {})
    name = meta.get('name')
    # data/jir_data.json is 141 University of Melbourne Job Insights Reports, and
    # this match is on program NAME alone. Monash's Master of Public Health has
    # the same name as Melbourne's, so it resolved to Melbourne's 562 graduates
    # and the market report's section 1 claimed them as "this program's own"
    # destination record. Only a Melbourne code may reach the JIR store.
    records = [r for r in json.loads((ROOT / 'data/jir_data.json').read_text())['records']
               if name and r['program'] == name and is_melbourne(code)]
    glob_map, scoped = load_crosswalk()

    if not records:
        return {'code': code, 'name': name, 'grain': 'field',
                'field': meta.get('field'), 'fieldName': meta.get('fieldName'),
                'note': 'no exact JIR record — read destinations from '
                        'data/jsa/heo_field_destinations.json at field grain'}

    counts, unmapped = collections.Counter(), collections.Counter()
    for rec in records:
        for title in rec.get('job_titles', {}).get('all', []):
            key = title.strip().lower()
            hit = scoped.get((code, key)) or glob_map.get(key)
            (counts if hit else unmapped)[hit or title] += 1
    return {'code': code, 'name': name, 'grain': 'exact',
            'n': sum(r.get('n', 0) for r in records),
            'professions': [{'onet_soc_code': s, 'title': t, 'titles': n}
                            for (s, t), n in counts.most_common()],
            'unmapped': list(unmapped)}


def main(code, as_json=False):
    out = resolve(code)
    if as_json:
        print(json.dumps(out, indent=2))
        return
    if out['grain'] == 'field':
        print(f"{code} ({out['name']}): field grain — {out['field']} {out['fieldName']}\n"
              f"  destinations: data/jsa/heo_field_destinations.json")
        return
    print(f"{code} ({out['name']}) — exact JIR grain, n={out['n']}")
    for p in out['professions']:
        print(f"  {p['onet_soc_code']:12} {p['title'][:44]:46} {p['titles']}")
    if out['unmapped']:
        print(f"  UNMAPPED ({len(out['unmapped'])}): {', '.join(out['unmapped'][:8])}")
        print("  -> map with scripts/crosswalk-add.py before researching them")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1], '--json' in sys.argv)
