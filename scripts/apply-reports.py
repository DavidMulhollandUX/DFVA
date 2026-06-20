#!/usr/bin/env python3
"""
Apply full markdown content from reports/ directory to reportContent.ts.
Updates all inline markdown entries with the new expanded report content.
Preserves imports and the separate mc-scibit/mc-sciear/mc-sciepi files.

Run: python3 scripts/apply-reports.py
"""
import re, json, os
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REPORTS = REPO / 'reports'
RC_FILE = REPO / 'compass/app/src/compass/reportContent.ts'
SPD_FILE = REPO / 'compass/app/src/compass/sharedProgramData.ts'

# Programs handled in separate TS files - skip them in inline content
SEPARATE_FILES = {'mc-scibit', 'mc-sciear', 'mc-sciepi'}

# Programs to exclude from REPORT_CONTENT inline (their content comes from separate files)
EXCLUDE_FROM_RC = SEPARATE_FILES

# Market data for programs that need it (if not in report file)
DEFAULT_MARKET = {
    '527cl': ('Health', 0.862, 110000, 'SHORTAGE', 0.10),
    '746st': ('Engineering', 0.862, 95000, 'RECRUITMENT_DIFFICULTY', 0.25),
    'mc-arch': ('Architecture & Building', 0.748, 84500, 'RECRUITMENT_DIFFICULTY', 0.20),
    'mc-ba': ('Business & Management', 0.923, 124000, 'MET', 0.55),
    'mc-busana': ('Business & Management', 0.923, 124000, 'MET', 0.55),
    'mc-bamktg': ('Business & Management', 0.923, 110000, 'MET', 0.65),
    'mc-base': ('Business & Management', 0.730, 85000, 'MET', 0.50),
    'mc-clind': ('Health', 0.944, 120000, 'SHORTAGE', 0.05),
    'mc-ed': ('Education', 0.899, 96000, 'SHORTAGE', 0.15),
    'mc-envlaw': ('Law', 0.894, 90000, 'MET', 0.45),
    'mc-indeng': ('Engineering', 0.862, 95000, 'MET', 0.30),
    'mc-intedib': ('Education', 0.899, 90000, 'MET', 0.25),
    'mc-journ': ('Creative Arts', 0.669, 81000, 'MET', 0.70),
    'mc-phtyph': ('Health', 0.920, 85000, 'SHORTAGE', 0.05),
    'mc-prop': ('Architecture & Building', 0.748, 84500, 'RECRUITMENT_DIFFICULTY', 0.30),
    'mc-propsyc': ('Health', 0.862, 90000, 'SHORTAGE', 0.10),
    'mc-scwr': ('Creative Arts', 0.669, 81000, 'MET', 0.70),
    'mc-surged': ('Health', 0.944, 140000, 'SHORTAGE', 0.05),
    'mc-tesol': ('Education', 0.899, 96000, 'SHORTAGE', 0.15),
    'mc-urbdes': ('Architecture & Building', 0.748, 84500, 'MET', 0.25),
    'mc-urbhort': ('Architecture & Building', 0.748, 84500, 'RECRUITMENT_DIFFICULTY', 0.30),
    'mc-apbusa': ('Business & Management', 0.923, 110000, 'MET', 0.60),
}

PROGRAM_NAMES = {
    '439fs': 'Master of Food Science',
    '527cl': 'Master of Clinical Psychology',
    '746st': 'Master of Engineering Structures',
    'b-des': 'Bachelor of Design',
    'b-sci': 'Bachelor of Science',
    'mc-actsc': 'Master of Actuarial Science',
    'mc-apbusa': 'Master of Applied Business Analytics',
    'mc-arch': 'Master of Architecture',
    'mc-ba': 'Master of Business Administration',
    'mc-bamktg': 'Master of Business Administration (Marketing)',
    'mc-base': 'Master of Advanced Social Enterprise',
    'mc-bmedsc': 'Master of Biomedical Science',
    'mc-busana': 'Master of Business Analytics',
    'mc-climsci': 'Master of Climate Science',
    'mc-clind': 'Master of Clinical Dentistry',
    'mc-cs': 'Master of Computer Science',
    'mc-datasc': 'Master of Data Science',
    'mc-ed': 'Master of Education',
    'mc-envlaw': 'Master of Environmental Law',
    'mc-envsc': 'Master of Environmental Science',
    'mc-gencoun': 'Master of Genetic Counselling',
    'mc-indeng': 'Master of Industrial Engineering',
    'mc-intedib': 'Master of International Education (IB)',
    'mc-is': 'Master of Information Systems',
    'mc-journ': 'Master of Journalism',
    'mc-nursc': 'Master of Nursing Science',
    'mc-phtyph': 'Master of Physiotherapy (Pelvic Health)',
    'mc-prop': 'Master of Property',
    'mc-propsyc': 'Master of Professional Psychology',
    'mc-scibif': 'Master of Science (Bioinformatics)',
    'mc-scibio': 'Master of Science (BioSciences)',
    'mc-scibit': 'Master of Biotechnology',
    'mc-sciche': 'Master of Science (Chemistry)',
    'mc-sciear': 'Master of Science (Earth Sciences)',
    'mc-sciepi': 'Master of Science (Epidemiology)',
    'mc-sciphy': 'Master of Science (Physics)',
    'mc-scwr': 'Master of Screenwriting',
    'mc-surged': 'Master of Surgical Education',
    'mc-tesol': 'Master of TESOL',
    'mc-urbdes': 'Master of Urban Design',
    'mc-urbhort': 'Master of Urban Horticulture',
}


def escape_ts(s):
    """Escape content for TypeScript template literal."""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def extract_market_section(content):
    """Extract the MARKET DATA table from a report."""
    m = re.search(r'### MARKET DATA\s*\n(.*?)(?=\n---|\Z)', content, re.DOTALL)
    if m:
        return m.group(0).strip()
    return None


def read_report(slug):
    """Read the report file and return its content."""
    path = REPORTS / f'dfva-{slug}.md'
    if path.exists():
        return path.read_text()
    return None


def get_program_name(slug, content):
    """Extract program name from report content."""
    if slug in PROGRAM_NAMES:
        return PROGRAM_NAMES[slug]
    # Try to extract from content
    m = re.search(r'DFVA REPORT:\s*(.+?)(?:\s*\(|$)', content, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return slug.upper()


def build_rc_entry(slug, content, prog_name):
    """Build a REPORT_CONTENT entry."""
    escaped = escape_ts(content)
    return f'  "dfva-{slug}": {{\n    title: "{prog_name} ({slug.upper()}) — DFVA Assessment",\n    institution: "University of Melbourne",\n    markdown: `{escaped}`,\n  }}'


def build_market_entry(slug, content, prog_name):
    """Build a market intelligence REPORT_CONTENT entry."""
    market_file = REPORTS / f'dfva-market-{slug}.md'
    if market_file.exists():
        print(f"    Found dedicated market report for {slug}")
        market_md = market_file.read_text()
    else:
        market = extract_market_section(content)
        if market:
            market_md = f"## DFVA MARKET INTELLIGENCE: {prog_name} ({slug.upper()})\n\n{market}"
        elif slug in DEFAULT_MARKET:
            field, emp, sal, demand, ai_exp = DEFAULT_MARKET[slug]
            market_md = f"""## DFVA MARKET INTELLIGENCE: {prog_name} ({slug.upper()})

### MARKET DATA
| Metric | Value |
|--------|-------|
| Field | {field} |
| Full-time employment (4-6mo) | {emp*100:.1f}% (GOS 2024) |
| Median starting salary | ${sal:,} |
| Employment (3yr) | {emp*100:.1f}% |
| Occupation demand | {demand.replace('_', ' ')} |
| AI automation exposure | {int(ai_exp*100)}% |
| Sources | QILT GOS 2024 National Report Tables, JSA Skills Priority List 2025 |"""
        else:
            market_md = f"Market data not yet available for {prog_name}."
    
    escaped = escape_ts(market_md)
    return f'  "dfva-market-{slug}": {{\n    title: "{prog_name} ({slug.upper()}) — Market Intelligence",\n    institution: "University of Melbourne",\n    markdown: `{escaped}`,\n  }}'


def main():
    # Read the current reportContent.ts
    current_rc = RC_FILE.read_text()
    
    # Find the header (imports + opening of REPORT_CONTENT)
    header_end = current_rc.find('export const REPORT_CONTENT')
    header = current_rc[:header_end]
    
    # Find what comes after the REPORT_CONTENT object (nothing in this case, but safe)
    rc_end_match = re.search(r'\n\};\s*\n', current_rc)
    after_rc = ''
    
    # Generate new REPORT_CONTENT inline entries for all programs
    entries = []
    
    # All slugs to process (excluding separate-file programs)
    all_slugs = sorted([
        r.stem.replace('dfva-', '')
        for r in REPORTS.glob('dfva-*.md')
        if 'recommend' not in r.stem and 'market' not in r.stem
    ])
    
    processed = 0
    for slug in all_slugs:
        if slug in EXCLUDE_FROM_RC:
            print(f"  SKIP (separate file): {slug}")
            continue
        
        content = read_report(slug)
        if not content:
            print(f"  SKIP (not found): {slug}")
            continue
        
        prog_name = get_program_name(slug, content)
        
        # Build assessment entry
        entry = build_rc_entry(slug, content, prog_name)
        entries.append(entry)
        
        # Build market entry
        market_entry = build_market_entry(slug, content, prog_name)
        entries.append(market_entry)
        
        processed += 1
        print(f"  PROCESSED: {slug} ({prog_name})")
    
    # Preserve the recommend content entries from the existing file
    # These come from RECOMMEND_CONTENT_ALL and the separate spread
    recommend_pattern = re.search(
        r'"dfva-recommend-b-des".*?"dfva-recommend-mc-is".*?},',
        current_rc, re.DOTALL
    )
    if recommend_pattern:
        recommend_inline = recommend_pattern.group(0)
    else:
        recommend_inline = ''
    
    # Build new reportContent.ts
    entries_str = ',\n'.join(entries)
    
    new_rc = f"""{header}export const REPORT_CONTENT: Record<
  string,
  {{ title: string; institution: string; markdown: string }}
> = {{
  ...RECOMMEND_CONTENT_ALL,
  ...REPORT_CONTENT_MC_SCIBIT,
  ...REPORT_CONTENT_MC_SCIEAR,
  ...REPORT_CONTENT_MC_SCIEPI,
{entries_str},
}};

"""
    
    # Write the new file
    RC_FILE.write_text(new_rc)
    print(f"\n✓ Wrote reportContent.ts ({len(new_rc):,} bytes, {processed} programs, {processed*2} total entries)")
    
    print("\nNext: npm run build or npm run dev in compass/app")


if __name__ == "__main__":
    main()
