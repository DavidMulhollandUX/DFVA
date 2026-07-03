#!/usr/bin/env python3
"""
Bulk-wire new DFVA programs from reports/dfva-{code}.md into the live Evidura app.

This is "the pipeline" for adding courses: given a list of program codes that already
have reports/dfva-{code}.md, reports/dfva-market-{code}.md and reports/dfva-recommend-{code}.md
(written by hand or by an agent, per the DFVA report templates), this script does every
remaining wiring step so the program shows up at /reports with a working Redesign Plan
link and populated dimension-click rubric evidence:

  1. Parse each Assessment report -> append a PROGRAMS[] entry to sharedProgramData.ts
     (score, 11 dimensions, thresholds, slugs, handbookUrl). Bumps CACHE_VERSION.
  2. Append reportMeta entries (score/riskBand for assessment; null/null for market+recommend)
     to ReportDetailPage.tsx.
  3. Write dfva/source/evidence/{code}.json (per-dimension rationale from the Scorecard +
     linked recommendations from the Recommendations table, mapped by D-code).
  4. Update docs/dfva-batch-manifest.json's "scored" list.

Then run, in order (this script prints the exact commands — it does not shell out to
node/npx itself, since that's slow and this script may run from environments without
the compass/app toolchain installed):
  npm --prefix scripts run dfva:gen-content
  python3 scripts/generate-recommend-content.py
  (cd scripts && npm run dfva:gen) && cp compass-static/src/data/dimensionEvidence.ts \
      compass/app/src/compass/data/dimensionEvidence.ts
  (cd scripts && npm run dfva:check-registry)

Usage: python3 scripts/dfva-add-programs.py CODE [CODE ...]
"""
import json, os, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REPORTS = REPO / 'reports'
SPD_FILE = REPO / 'compass/app/src/compass/sharedProgramData.ts'
RDP_FILE = REPO / 'compass/app/src/compass/ReportDetailPage.tsx'
EVIDENCE_DIR = REPO / 'dfva/source/evidence'
MANIFEST_FILE = REPO / 'docs/dfva-batch-manifest.json'

# Canonical dimension order + labels, mirroring dfva/source/rubric.ts RUBRIC[].demoLabel.
CANONICAL = [
    ('D1', 'Automation Exposure', 'automation'),
    ('D2', 'Systems Thinking', 'systems'),
    ('D3', 'Technical Depth', 'technical'),
    ('D4', 'Decision-Making', 'decision'),
    ('D5', 'AI Literacy', 'ai lit'),
    ('D6', 'Domain Depth', 'domain'),
    ('D7', 'Research Rigour', 'research'),
    ('D8', 'Human & Relational', 'human'),
    ('D9', 'Curriculum Currency', 'curr'),
    ('D10', 'Outcome Evidence', 'outcome'),
    ('B', 'Irreplaceability (bonus)', 'irreplaceability'),
]


def canonical_for(raw_label):
    low = raw_label.lower()
    for dcode, label, keyword in CANONICAL:
        if keyword in low:
            return dcode, label
    raise ValueError(f'could not map dimension label: {raw_label!r}')


def parse_report(code):
    path = REPORTS / f'dfva-{code}.md'
    text = path.read_text()

    m = re.search(r'##\s*DFVA REPORT:\s*(.+?)\s*\(([A-Za-z0-9-]+)\)', text)
    if not m:
        raise ValueError(f'{code}: could not find report header')
    program_name = m.group(1).strip()

    # Metadata: try single-line pipe format first, fallback to multi-line
    m = re.search(
        r'\*\*Institution:\*\*\s*(.+?)\s*\|\s*\*\*Level:\*\*\s*(.+?)\s*\|\s*\*\*Duration:\*\*\s*(.+?)\s*\n',
        text)
    if not m:
        # Fallback: multi-line metadata (markdown line breaks: "  \n")
        m = re.search(
            r'\*\*Institution:\*\*\s*(.+?)\s*(?:  ?\n|\n)\*\*Level:\*\*\s*(.+?)\s*(?:  ?\n|\n)\*\*Duration:\*\*\s*(.+?)\s*\n',
            text)
    if not m:
        raise ValueError(f'{code}: could not find institution/level/duration')
    institution, level, duration = (g.strip() for g in m.groups())

    m = re.search(r'\*\*Assessment date:\*\*\s*(\S+)', text)
    if not m:
        raise ValueError(f'{code}: could not find assessment date')
    date = m.group(1)
    # Source URL is on a separate line
    handbook_url = ''
    m_url = re.search(r'\*\*Source URL\(s\):\*\*\s*(\S+)', text)
    if not m_url:
        m_url = re.search(r'\*\*Source:\*\*\s*(\S+)', text)
    if m_url:
        handbook_url = m_url.group(1)

    scorecard_block_m = re.search(r'###\s*4\.\s*DFVA SCORECARD.*?\n(.*?)\*\*TOTAL:', text, re.DOTALL)
    if not scorecard_block_m:
        # Fallback: old format without section numbers
        scorecard_block_m = re.search(r'DFVA SCORECARD.*?\n(.*?)\*\*TOTAL:', text, re.DOTALL)
    if not scorecard_block_m:
        raise ValueError(f'{code}: could not find DFVA SCORECARD block')
    scorecard_block = scorecard_block_m.group(1)
    rows = re.findall(
        r'^\|\s*(D?\d{1,2}|B)\s*\|\s*(.+?)\s*\|\s*(\d)\s*(?:\(\d-\d\))?\s*\|\s*(.+?)\s*\|\s*$',
        scorecard_block, re.MULTILINE)
    if len(rows) != 11:
        raise ValueError(f'{code}: expected 11 scorecard rows, found {len(rows)}')

    dims_by_dcode = {}
    for row_id, raw_label, score, rationale in rows:
        dcode, canon_label = canonical_for(raw_label)
        dims_by_dcode[dcode] = {
            'label': canon_label,
            'score': int(score),
            'rationale': rationale.strip(),
        }
    missing = [d for d, _, _ in CANONICAL if d not in dims_by_dcode]
    if missing:
        raise ValueError(f'{code}: missing dimensions {missing}')

    m = re.search(r'\*\*TOTAL:\s*(\d+)\s*/\s*36\*\*', text)
    if not m:
        raise ValueError(f'{code}: could not find TOTAL line')
    total_score = int(m.group(1))
    # Risk band may be on same line or separate line
    m_band = re.search(r'\*\*Risk band:\s*(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)', text)
    if not m_band:
        # Fallback: old format with band on same line as TOTAL
        m_band = re.search(r'\*\*TOTAL:\s*\d+\s*/\s*36\*\*\s*(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)', text)
    if not m_band:
        raise ValueError(f'{code}: could not find risk band')
    risk_band = m_band.group(1)

    thresholds = {}
    for q in ('Q1', 'Q2', 'Q3'):
        # Answer may be on same line or next line (markdown line break)
        qm = re.search(
            rf'\*\*{q}:\*\*.*?(?:  ?\n|\n)\s*\*\*(YES|NO|UNCERTAIN|N/A)\*\*',
            text, re.DOTALL)
        if not qm:
            # Fallback: answer on same line
            qm = re.search(rf'\*\*{q}:\*\*\s*(YES|NO|UNCERTAIN|N/A)', text)
        if not qm:
            raise ValueError(f'{code}: could not find {q}')
        # ProgramReport.thresholds only accepts YES/NO/UNCERTAIN; higher doctorates
        # (examination-only, no graduate cohort) sometimes answer N/A in the markdown
        # since the question doesn't cleanly transfer — map that to UNCERTAIN for the
        # typed field while the nuance stays in the report markdown itself.
        thresholds[q.lower()] = 'UNCERTAIN' if qm.group(1) == 'N/A' else qm.group(1)

    # Recommendations: try canonical ### 8. RECOMMENDATIONS ... ### 9. first
    rec_block_m = re.search(r'###\s*8\.\s*RECOMMENDATIONS\s*\n(.*?)\n###\s*9\.', text, re.DOTALL)
    if not rec_block_m:
        # Fallback: old format ## 7. RECOMMENDATIONS ... ## 8.
        rec_block_m = re.search(r'##\s*7\.\s*RECOMMENDATIONS\s*\n(.*?)\n##\s*8\.', text, re.DOTALL)
    if not rec_block_m:
        # Fallback: ### 7. RECOMMENDATIONS ... ### 8. (after Phase 1 alignment)
        rec_block_m = re.search(r'###\s*8\.\s*RECOMMENDATIONS\s*\n(.*?)(?=\n###\s*(?:9|10)\.|\Z)', text, re.DOTALL)
    recommendations = []
    if rec_block_m:
        for line in rec_block_m.group(1).splitlines():
            line = line.strip()
            if not line.startswith('|'):
                continue
            cells = [c.strip() for c in line.strip('|').split('|')]
            # Priority column format varies across reports: bare "1", "2" or
            # already-prefixed "P1", "P2".
            pm = re.match(r'^P?(\d+)$', cells[0]) if cells else None
            if len(cells) != 4 or not pm:
                continue  # header/separator/malformed row
            priority_n, action, dim_cell, effort_cell = pm.group(1), cells[1], cells[2], cells[3]
            # "Dimension" column varies across reports: bare "D5", "D5, D10", or
            # "D5 AI Literacy" (code + full rubric label) — extract D-codes by
            # pattern rather than assuming the cell is code-only.
            dim_refs = re.findall(r'\bD\d{1,2}\b|\bB\b', dim_cell)
            if not dim_refs:
                continue
            # "Effort" column varies from a bare word to "Medium — rationale...";
            # keep only the leading Low/Medium/High severity word.
            effort_m = re.match(r'^(Low|Medium|High)\b', effort_cell, re.IGNORECASE)
            effort = effort_m.group(1).title() if effort_m else effort_cell.split()[0]
            recommendations.append({
                'priority': f'P{priority_n}',
                'action': action,
                'effort': effort,
                'dimRefs': dim_refs,
            })

    return {
        'code': code,
        'program': program_name,
        'institution': institution,
        'level': level,
        'date': date,
        'handbookUrl': handbook_url,
        'score': total_score,
        'riskBand': risk_band,
        'thresholds': thresholds,
        'dims_by_dcode': dims_by_dcode,
        'recommendations': recommendations,
    }


def ts_escape(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')


def build_program_entry(parsed):
    slug = parsed['code'].lower()
    dims_ts = ',\n'.join(
        f'      {{ label: "{ts_escape(dims["label"])}", score: {dims["score"]}, max: 3 }}'
        for dcode, _, _ in CANONICAL
        for dims in [parsed['dims_by_dcode'][dcode]]
    )
    return f'''  {{
    program: "{ts_escape(parsed['program'])}",
    institution: "{ts_escape(parsed['institution'])}",
    level: "{ts_escape(parsed['level'])}",
    date: "{parsed['date']}",
    score: {parsed['score']},
    maxScore: 36,
    riskBand: "{parsed['riskBand']}",
    thresholds: {{ q1: "{parsed['thresholds']['q1']}", q2: "{parsed['thresholds']['q2']}", q3: "{parsed['thresholds']['q3']}" }},
    dimensions: [
{dims_ts}
    ],
    assessmentSlug: "dfva-{slug}",
    marketSlug: "dfva-market-{slug}",
    recommendSlug: "dfva-recommend-{slug}",
    handbookUrl: "{parsed['handbookUrl']}",
  }}'''


def update_shared_program_data(parsed_list):
    src = SPD_FILE.read_text()

    existing_slugs = set(re.findall(r'assessmentSlug:\s*"([^"]+)"', src))
    new_entries = []
    for parsed in parsed_list:
        slug = f"dfva-{parsed['code'].lower()}"
        if slug in existing_slugs:
            print(f"  SKIP (already in sharedProgramData.ts): {parsed['code']}")
            continue
        new_entries.append(build_program_entry(parsed))

    if not new_entries:
        return src, 0

    # Insert before the closing "];" of the PROGRAMS array.
    marker = re.search(r'\n\];\s*\n', src)
    if not marker:
        raise ValueError('could not find PROGRAMS array closing "];"')
    insert_at = marker.start()
    addition = ',\n' + ',\n'.join(new_entries)
    src = src[:insert_at] + addition + src[insert_at:]

    # Bump CACHE_VERSION so client localStorage caches invalidate.
    ver_m = re.search(r'export const CACHE_VERSION = (\d+);', src)
    if ver_m:
        new_ver = int(ver_m.group(1)) + 1
        src = src[:ver_m.start()] + f'export const CACHE_VERSION = {new_ver};' + src[ver_m.end():]

    return src, len(new_entries)


def update_report_meta(parsed_list):
    src = RDP_FILE.read_text()
    obj_m = re.search(r'const reportMeta:.*?=\s*\{\n', src, re.DOTALL)
    if not obj_m:
        raise ValueError('could not find reportMeta object in ReportDetailPage.tsx')

    existing = set(re.findall(r'"(dfva-[a-z0-9-]+)":\s*\{', src))
    lines = []
    for parsed in parsed_list:
        slug = parsed['code'].lower()
        assess_key = f'dfva-{slug}'
        if assess_key not in existing:
            lines.append(f'  "{assess_key}": {{ score: "{parsed["score"]} / 36", riskBand: "{parsed["riskBand"]}" }},')
        for prefix in (f'dfva-market-{slug}', f'dfva-recommend-{slug}'):
            if prefix not in existing:
                lines.append(f'  "{prefix}": {{ score: null, riskBand: null }},')

    if not lines:
        return src, 0

    insert_at = obj_m.end()
    addition = '\n'.join(lines) + '\n'
    src = src[:insert_at] + addition + src[insert_at:]
    return src, len(lines)


def write_evidence_json(parsed, force=False):
    slug = parsed['code'].lower()
    out_path = EVIDENCE_DIR / f'{slug}.json'
    if out_path.exists() and not force:
        print(f'  SKIP (evidence already exists, use --force to overwrite): {slug}')
        return out_path
    by_dimension = {}
    for dcode, _, _ in CANONICAL:
        dims = parsed['dims_by_dcode'][dcode]
        recs = [
            {
                'action': r['action'],
                'priority': r['priority'],
                'effort': r['effort'],
                'dimRefs': r['dimRefs'],
            }
            for r in parsed['recommendations']
            if dcode in r['dimRefs']
        ]
        by_dimension[dcode] = {'rationale': dims['rationale'], 'recommendations': recs}

    out = {'code': slug, 'programSlug': f'dfva-{slug}', 'byDimension': by_dimension}
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(out, indent=2) + '\n')
    return out_path


def update_manifest(codes):
    if not MANIFEST_FILE.exists():
        return 0
    manifest = json.loads(MANIFEST_FILE.read_text())
    scored = set(manifest.get('scored', []))
    added = 0
    for code in codes:
        slug = code.lower()
        if slug not in scored:
            scored.add(slug)
            added += 1
    manifest['scored'] = sorted(scored)
    manifest['unscored'] = sorted(set(manifest.get('unscored', [])) - scored)
    MANIFEST_FILE.write_text(json.dumps(manifest, indent=2) + '\n')
    return added


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    flags = [a for a in sys.argv[1:] if a.startswith('--')]
    dry_run = '--dry-run' in flags
    force = '--force' in flags

    codes = args
    if not codes:
        print('usage: python3 scripts/dfva-add-programs.py [--dry-run] [--force] CODE [CODE ...]')
        sys.exit(2)

    parsed_list = []
    for code in codes:
        print(f'Parsing {code}...')
        parsed_list.append(parse_report(code))

    if dry_run:
        print('\nDRY RUN — would make these changes:')
        for parsed in parsed_list:
            print(f'  Add program: {parsed["program"]} ({parsed["code"]}) — {parsed["score"]}/36 {parsed["riskBand"]}')
        print(f'\n  Total: {len(parsed_list)} program(s)')
        print('\nRun without --dry-run to apply.')
        return

    src, n_programs = update_shared_program_data(parsed_list)
    SPD_FILE.write_text(src)
    print(f'sharedProgramData.ts: +{n_programs} program(s), CACHE_VERSION bumped')

    src, n_meta = update_report_meta(parsed_list)
    RDP_FILE.write_text(src)
    print(f'ReportDetailPage.tsx: +{n_meta} reportMeta entries')

    for parsed in parsed_list:
        out_path = write_evidence_json(parsed, force=force)
        if out_path.exists():
            n_recs = sum(len(v['recommendations']) for v in json.loads(out_path.read_text())['byDimension'].values())
            print(f'  {out_path.relative_to(REPO)} ({n_recs} linked recommendations)')

    n_manifest = update_manifest(codes)
    print(f'docs/dfva-batch-manifest.json: +{n_manifest} newly marked scored')

    print('\nNext, run in order:')
    print('  npm --prefix scripts run dfva:gen-content')
    print('  python3 scripts/generate-recommend-content.py')
    print('  (cd scripts && npm run dfva:gen) && cp compass-static/src/data/dimensionEvidence.ts compass/app/src/compass/data/dimensionEvidence.ts')
    print('  (cd scripts && npm run dfva:check-registry)')


if __name__ == '__main__':
    main()
