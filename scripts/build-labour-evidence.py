#!/usr/bin/env python3
"""Assemble data/labour-evidence.json — per-program real labour-market evidence for
report enrichment: JSA HEO graduate destinations (1/3/5yr, by field), QILT outcomes
(from marketData.ts, postgraduate cut), Adzuna demand-side employers (per field, live),
and a shared IBISWorld P8102 industry-context block.

Destinations are FIELD-level (JSA HEO is by field of education) — labelled as such.
Employers are DEMAND-side (live vacancies), merged from field_employers.json if present.
Re-run after the Adzuna workflow writes field_employers.json to fill employers.
"""
import json, re, os
import pandas as pd
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
XLSX = REPO / 'scratch/au-jobinsights/jsa_heo/work_and_occupation.xlsx'
JOIN = REPO / 'scratch/au-jobinsights/program_labour_map.json'
MARKETDATA = REPO / 'compass/app/src/compass/marketData.ts'
EMPLOYERS = REPO / 'scratch/au-jobinsights/field_employers.json'
OUT = REPO / 'data/labour-evidence.json'

# Target = the 41 programs that have assessment reports.
REPORT_CODES = sorted(
    f.name[len('dfva-'):-len('.md')]
    for f in (REPO / 'reports').glob('dfva-*.md')
    if not re.search(r'(market|recommend|cross|faculty)', f.name)
)

# --- JSA HEO destinations per field (VERIFIED FOE_BROAD mapping, this session) ---
df = pd.read_excel(XLSX, sheet_name='Table_3', header=6)
df.columns = [str(c).strip() for c in df.columns]
df['FOE_BROAD_CODE'] = pd.to_numeric(df['FOE_BROAD_CODE'], errors='coerce')
for c in ('OCC_COUNT_1', 'OCC_COUNT_3', 'OCC_COUNT_5', 'OCC_PCT_1', 'OCC_PCT_3', 'OCC_PCT_5'):
    df[c] = pd.to_numeric(df[c], errors='coerce').fillna(0)
LEGAL = re.compile(r'solicitor|barrister|legal|judicial|lawyer', re.I)
FIELD_MASK = {
    'it': df['FOE_BROAD_CODE'] == 2,
    'engineering': df['FOE_BROAD_CODE'] == 3,
    'health': df['FOE_BROAD_CODE'] == 6,
    'business': df['FOE_BROAD_CODE'] == 8,
    'architecture': df['FOE_BROAD_CODE'] == 4,
    'creative_arts': df['FOE_BROAD_CODE'] == 10,
    'education': df['FOE_BROAD_CODE'] == 7,
    'science': df['FOE_BROAD_CODE'] == 1,
    'agriculture': df['FOE_BROAD_CODE'] == 5,
    'law': (df['FOE_BROAD_CODE'] == 9) & df['OCC_NAME_1YR'].astype(str).str.contains(LEGAL),
    'other': df['FOE_BROAD_CODE'] == 9,
}
BAD = {'MISSING', 'NAN', 'INADEQUATELY DESCRIBED'}
def top_occ(mask, name_col, count_col, n=5):
    """Top occupations for a field by total placements; share = occupation's count
    as a fraction of all placements in the field (OCC_PCT is a per-detailed-field share
    and is NOT additive, so we recompute share from summed counts)."""
    sub = df[mask].copy()
    sub = sub[~sub[name_col].astype(str).str.upper().str.strip().isin(BAD)]
    g = sub.groupby(sub[name_col].astype(str).str.strip())[count_col].sum().sort_values(ascending=False)
    total = g.sum()
    out = []
    for name, c in g.head(n).items():
        if name and name.lower() != 'nan':
            share = (c / total * 100) if total else 0
            out.append(f'{name} ({share:.0f}%)')
    return out

destinations = {}
for f, mask in FIELD_MASK.items():
    destinations[f] = {
        'entry': top_occ(mask, 'OCC_NAME_1YR', 'OCC_COUNT_1'),   # 1yr post-completion
        'early': top_occ(mask, 'OCC_3YR', 'OCC_COUNT_3'),        # 3yr
        'senior': top_occ(mask, 'OCC_5YR', 'OCC_COUNT_5'),       # 5yr
    }

# --- QILT (postgraduate cut) per field from marketData.ts ---
md = MARKETDATA.read_text()
qilt = {}
for m in re.finditer(r'(\w+):\s*\{([^{}]*?year:\s*\d+,)\s*\}', md, re.DOTALL):
    key, block = m.group(1), m.group(2)
    def num(p, default=None, _b=block):
        mm = re.search(p, _b)
        return float(mm.group(1)) if mm else default
    qilt[key] = {
        'employmentRate': num(r'employmentRate:\s*([\d.]+)'),
        'medianSalary': int(num(r'medianSalary:\s*(\d+)') or 0),
        'employmentRate3yr': num(r'employmentRate3yr:\s*([\d.]+)'),
        'occupationDemand': (re.search(r"occupationDemand:\s*'([^']+)'", block) or [None, None])[1],
        'year': int(num(r'year:\s*(\d+)') or 2024),
    }

# --- Adzuna demand-side employers per field (if the workflow has written them) ---
field_emp = json.loads(EMPLOYERS.read_text()) if EMPLOYERS.exists() else {}

# --- Shared IBISWorld P8102 macro context (docs/au-job-insights-landscape.md) ---
IBISWORLD = {
    'industry': 'University & Other Higher Education in Australia (IBISWorld P8102, Jun 2026)',
    'revenue': 'A$45.4bn across 41 institutions',
    'growth': 'revenue CAGR +0.7%/yr 2021–26, forecast +2.8%/yr to 2031',
    'shock': 'international-student caps (NPL 270k→295k) and a 32.5% offshore visa refusal rate (Feb 2026) are resetting fee revenue; sector profit fell 18.1%',
    'note': 'a small, concentrated, financially-stressed buyer market of ~41 institutions',
}

# --- program -> field via getFieldForCourse() (canonical; covers every report program),
#     field -> {qiltStudyArea, adzunaTerm} from the join map's fields section ---
fmap = dict(re.findall(
    r"'([a-z0-9-]+)':\s*'(it|engineering|health|business|architecture|creative_arts|education|law|science|agriculture|other)'", md))
fields_meta = json.loads(JOIN.read_text())['fields']

evidence = {
    '_meta': {
        'description': 'Per-program real labour-market evidence for DFVA report enrichment.',
        'ibisworld': IBISWORLD,
        'caveats': {
            'destinations': 'JSA HEO Table_3 — field-of-education level (ATO tax-linked, all completion levels), NOT per-degree. ANZSCO-6 does not encode seniority, so 1/3/5yr lists are stable for most fields; Creative Arts shows genuine progression.',
            'qilt': 'QILT GOS postgraduate-coursework cut (from marketData.ts), appropriate for these Masters programs.',
            'employers': 'Adzuna live vacancies (demand-side: who is hiring now), per field — NOT alumni destinations.',
        },
        'sources': ['JSA Higher Education Outcomes — Work & Occupation (Table_3)', 'QILT GOS 2024 (PGC)', 'IBISWorld P8102 (Jun 2026)', 'Adzuna AU (live vacancies)'],
    },
    'programs': {},
}
for code in REPORT_CODES:
    fld = fmap.get(code)
    if not fld:
        continue
    fmeta = fields_meta.get(fld, {})
    fe = field_emp.get(fld, {})
    evidence['programs'][code] = {
        'field': fld,
        'qiltStudyArea': fmeta.get('qiltStudyArea'),
        'adzunaTerm': fmeta.get('adzunaTerm'),
        'destinations': destinations.get(fld, {'entry': [], 'early': [], 'senior': []}),
        'qilt': qilt.get(fld, {}),
        'demandEmployers': fe.get('demandEmployers', []),
        'demandSalary': fe.get('demandSalary', ''),
    }

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(evidence, indent=1, ensure_ascii=False))
print(f'wrote {OUT} — {len(evidence["programs"])} programs')
print(f'employers merged: {"yes" if field_emp else "NO (run Adzuna workflow, then re-run this)"}')
print('\nsample destinations per field (sanity-check the FOE mapping):')
for f in ('it', 'engineering', 'health', 'creative_arts', 'law'):
    print(f'  {f:13} entry: {destinations[f]["entry"][:3]}')
print('\nQILT fields parsed:', sorted(qilt.keys()))
