#!/usr/bin/env python3
"""Regenerate the <!-- LABOUR-EVIDENCE --> block in reports/dfva-market-<code>.md
from committed data only.

    python3 scripts/build-market-footer.py 195aa            # print, change nothing
    python3 scripts/build-market-footer.py 195aa --apply     # rewrite the block in place
    python3 scripts/build-market-footer.py --all --apply     # every code with a block

WHY (2026-08-24, docs/dfva-labour-evidence-footer-audit.md). The block is described in
build-labour-evidence.py as "canonical and hand-maintained". Sixteen reports were authored
by hand with figures no source carries: 15 had no record in data/labour-evidence.json at
all, and 439fs contradicted its own record on four lines of four. Hand-maintenance is what
allowed that, so the block is generated from here on.

SOURCES — committed data only, no scratch/ inputs:
  data/jsa/program_fields.json          program -> ASCED field of education
  data/jsa/heo_field_destinations.json  field -> entry/early/senior occupations + shares
  data/labour-evidence.json             QILT outcomes, where the program has a record

WHAT IS DELIBERATELY OMITTED:
  - Adzuna employer lists and advertised salary ranges. Their input
    (scratch/au-jobinsights/field_employers.json) is not in the clone, so no employer
    line in these reports can be traced. Restore that file and extend this script rather
    than retyping names.
  - QILT employment rate and median salary for programs with no labour-evidence record.
    getFieldForCourse() falls back to "other" for them, and printing a fallback bucket's
    figures as the program's own is the defect this script exists to remove.
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
START, END = '<!-- LABOUR-EVIDENCE:START -->', '<!-- LABOUR-EVIDENCE:END -->'
STAGES = [('entry', 'Entry (~1yr)'), ('early', 'Early (~3yr)'), ('senior', 'Senior (~5yr)')]
TOP_N = 5
SOURCE_URL = 'https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data'

DEMAND = {
    'RECRUITMENT_DIFFICULTY': 'recruitment difficulty',
    'SHORTAGE': 'shortage',
    'NO_SHORTAGE': 'no shortage',
    'STRONG': 'strong',
    'MODERATE': 'moderate',
}


def report_path(code):
    return ROOT / f'reports/dfva-market-{code}.md'


def build_block(code):
    fields = json.loads((ROOT / 'data/jsa/program_fields.json').read_text())['programs']
    heo = json.loads((ROOT / 'data/jsa/heo_field_destinations.json').read_text())['fields']
    eviden = json.loads((ROOT / 'data/labour-evidence.json').read_text())['programs']

    meta = fields.get(code)
    if not meta:
        raise SystemExit(f'{code}: no entry in data/jsa/program_fields.json — assign a field first')
    field = meta['field']
    fd = heo.get(field)
    if not fd:
        raise SystemExit(f'{code}: field {field} absent from heo_field_destinations.json')

    n = fd.get('countFoe')
    cov = fd.get('entryCoverage')
    lines = [
        START,
        '## REAL GRADUATE DESTINATIONS (JSA HEO)',
        '',
        f'**Where graduates of this field actually work** — '
        f'[JSA Higher Education Outcomes]({SOURCE_URL}) '
        f'(ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of '
        f'education **{field} {fd["name"]}** (n = {n:,} completions). Shares are the '
        f'percentage of the field\'s graduates in wage or salary work; the field\'s ten most '
        f'common entry occupations account for {cov}% of them, and the {TOP_N} largest are '
        f'shown at each stage.',
        '',
        '| Career stage | Top occupations |',
        '|---|---|',
    ]
    for key, label in STAGES:
        occ = ' · '.join(f'{o["title"]} ({o["share"]:.1f}%)' for o in fd.get(key, [])[:TOP_N])
        lines.append(f'| {label} | {occ or "—"} |')

    lines += [
        '',
        f'**Field grain, not program grain.** These are graduates of the whole '
        f'{fd["name"]} field of education at every completion level — not this program\'s '
        f'graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, '
        f'so the 1/3/5-year lists move little for most fields.',
    ]

    rec = eviden.get(code)
    if rec and rec.get('qilt'):
        q = rec['qilt']
        dem = DEMAND.get(q.get('occupationDemand'), str(q.get('occupationDemand', '')).lower())
        lines += [
            '',
            f'**Graduate outcomes** (QILT GOS {q["year"]}, postgraduate '
            f'{rec.get("qiltStudyArea", "coursework")} cut): '
            f'{q["employmentRate"] * 100:.1f}% full-time employment · '
            f'median salary ${q["medianSalary"]:,} · '
            f'{q["employmentRate3yr"] * 100:.1f}% at three years · '
            f'JSA occupation demand: **{dem}**.',
        ]
    lines.append(END)
    return '\n'.join(lines)


def apply(code, block):
    p = report_path(code)
    src = p.read_text()
    if START not in src or END not in src:
        print(f'{code}: no LABOUR-EVIDENCE block — skipped')
        return False
    new = re.sub(re.escape(START) + r'.*?' + re.escape(END), lambda _: block, src, flags=re.S)
    if new == src:
        print(f'{code}: unchanged')
        return False
    p.write_text(new)
    print(f'{code}: rewritten')
    return True


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    do_apply = '--apply' in sys.argv
    if '--all' in sys.argv:
        args = sorted(p.name[len('dfva-market-'):-len('.md')]
                      for p in (ROOT / 'reports').glob('dfva-market-*.md')
                      if START in p.read_text())
    if not args:
        sys.exit(__doc__)
    for code in args:
        block = build_block(code)
        if do_apply:
            apply(code, block)
        else:
            print(block + '\n')
