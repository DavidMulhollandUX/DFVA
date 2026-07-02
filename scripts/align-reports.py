#!/usr/bin/env python3
"""
Phase 1 — Mechanical alignment of DFVA reports (no prose changes).

Run: python3 scripts/align-reports.py
Dry-run: python3 scripts/align-reports.py --dry-run

Aligns all reports/dfva-*.md to the canonical template (docs/report-template.md):
  1. Category B files (H1 title, no code, 3-line metadata, capital-D Date):
     → H2 title with code, single-line pipe metadata, lowercase date
  2. 8-section files (misnumbered sections):
     → renumber to canonical positions (pure renumber, content untouched)
  3. All assessment files:
     → normalize TOTAL line, add explicit Risk band, unify scorecard header,
       unify date formats
  4. Market files (dfva-market-b-des, dfva-market-b-sci):
     → ### (H3) section headings → ## (H2)
"""

import re
import sys
import os
from pathlib import Path
from datetime import datetime

REPORTS_DIR = Path(__file__).resolve().parent.parent / 'reports'
DRY_RUN = '--dry-run' in sys.argv

# ── Risk band lookup ──
def risk_band(score: int) -> str:
    if score >= 28: return f'RESILIENT ({score}-36)'
    if score >= 20: return f'MODERATE RISK ({score}-27)'
    if score >= 12: return f'HIGH RISK ({score}-19)'
    return f'CRITICAL (0-{score})'

# ── Program code extraction ──
def extract_code(slug: str) -> str:
    """dfva-mc-jurisd → MC-JURISD, dfva-b-des → B-DES, dfva-746st → 746ST"""
    code = slug.replace('dfva-', '').upper()
    return code

# ── Category B detection ──
def is_category_b(content: str) -> bool:
    """H1 title (single #), 3-line metadata, capital-D Assessment Date"""
    lines = content.split('\n')
    return (
        bool(re.match(r'^# DFVA REPORT:', lines[0].strip())) and
        not re.match(r'^## DFVA REPORT:', lines[0].strip())
    )

# ── Category C detection (8-section variant) ──
def is_8_section(content: str) -> bool:
    """Has VERDICT at position 5 and RECOMMENDATIONS at 6 (should be 7 and 8)"""
    has_verdict_5 = bool(re.search(r'^### 5\. VERDICT', content, re.M))
    has_verdict_7 = bool(re.search(r'^### 7\. VERDICT', content, re.M))
    return has_verdict_5 and not has_verdict_7

# ── Program name extraction ──
def extract_program_name(content: str) -> str:
    """Extract program name from existing title"""
    lines = content.split('\n')
    for line in lines[:5]:
        m = re.match(r'^#+ DFVA REPORT:\s*(.+)', line)
        if m:
            return m.group(1).strip()
    return 'Unknown Program'

# ── Section renumber map for 8-section files ──
# Current → Canonical
SECTION_RENUMBER = {
    '### 3. DFVA SCORECARD': '### 4. DFVA SCORECARD',
    '### 4. THREE THRESHOLD QUESTIONS': '### 5. THREE THRESHOLD QUESTIONS',
    '### 5. ANALOGUE GRADUATE PROFILE': '### 6. ANALOGUE GRADUATE PROFILE',
    '### 5. VERDICT': '### 7. VERDICT',
    '### 6. VERDICT': '### 7. VERDICT',
    '### 6. RECOMMENDATIONS': '### 8. RECOMMENDATIONS',
    '### 7. RECOMMENDATIONS': '### 8. RECOMMENDATIONS',
    '### 7. MARKET CONFIDENCE NOTE': '### 10. MARKET CONFIDENCE NOTE',
    '### 8. THE REDESIGNED GRADUATE PROFILE': '### 9. THE REDESIGNED GRADUATE PROFILE',
    '### 8. MARKET CONFIDENCE NOTE': '### 10. MARKET CONFIDENCE NOTE',
    # Handle files where VERDICT is at 5
    '### 5. RECOMMENDATIONS': '### 8. RECOMMENDATIONS',
    '### 5. THE REDESIGNED GRADUATE PROFILE': '### 9. THE REDESIGNED GRADUATE PROFILE',
}

def align_category_b(content: str, slug: str) -> str:
    """Align Category B to canonical: H2 title + code, single-line metadata, lowercase date"""
    code = extract_code(slug)
    lines = content.split('\n')
    new_lines = []
    in_metadata = False
    meta_parts = []
    meta_done = False
    i = 0

    while i < len(lines):
        line = lines[i]

        # H1 → H2 with code
        if i == 0 and line.startswith('# DFVA REPORT:'):
            name_match = re.match(r'^# DFVA REPORT:\s*(.+)', line)
            name = name_match.group(1) if name_match else 'Unknown'
            new_lines.append(f'## DFVA REPORT: {name} ({code})')
            i += 1
            continue

        # Collect 3-line metadata into single pipe line
        if not meta_done and line.startswith('**Institution:'):
            meta_parts.append(line.strip())
            i += 1
            # Next 2 lines should be Level and Duration
            while i < len(lines) and lines[i].strip().startswith('**'):
                if lines[i].strip().startswith('**Assessment'):
                    break
                meta_parts.append(lines[i].strip())
                i += 1
            # Join into single pipe-separated line
            parts = []
            for m in meta_parts:
                m = m.strip().rstrip('\\')
                # Format: **Key:** Value → extract Key and Value
                # Split on ':**' (bold close + colon) to separate key from value
                kv = m.split(':**', 1)
                if len(kv) == 2:
                    key = kv[0].lstrip('*').strip()
                    val = kv[1].strip()
                    parts.append(f'**{key}:** {val}')
            new_lines.append(' | '.join(parts))
            new_lines.append('')  # blank after metadata
            meta_done = True
            continue

        # Assessment Date: → Assessment date:
        if line.strip().startswith('**Assessment Date:**'):
            line = line.replace('**Assessment Date:**', '**Assessment date:**')
        if line.strip().startswith('**Assessment date:**'):
            # Ensure lowercase d
            line = line.replace('**Assessment Date:**', '**Assessment date:**')

        # Date format normalization: try to detect and normalize to YYYY-MM-DD
        date_match = re.search(r'\*\*Assessment date:\*\*\s*(\S+)', line)
        if date_match:
            raw_date = date_match.group(1)
            try:
                parsed = None
                for fmt in ['%Y-%m-%d', '%d/%m/%Y', '%m/%d/%Y', '%B %d, %Y', '%d %B %Y', '%Y/%m/%d']:
                    try:
                        parsed = datetime.strptime(raw_date, fmt)
                        break
                    except ValueError:
                        continue
                if parsed:
                    line = re.sub(r'\*\*Assessment date:\*\*\s*\S+', f'**Assessment date:** {parsed.strftime("%Y-%m-%d")}', line)
            except Exception:
                pass

        new_lines.append(line)
        i += 1

    return '\n'.join(new_lines)


def align_8_section(content: str) -> str:
    """Renumber 8-section variant to canonical positions (pure renumber)"""
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        stripped = line.strip()
        new_line = line
        for old, new in SECTION_RENUMBER.items():
            if stripped == old:
                new_line = line.replace(old, new)
                break
        new_lines.append(new_line)
    return '\n'.join(new_lines)


def normalize_all(content: str) -> str:
    """Apply normalizations to all assessment files"""
    # 1. Normalize scorecard header: any "Score" variant → "Score (0-3)"
    content = re.sub(
        r'\| # \| Dimension \| Score( \([^)]+\))? \| ',
        '| # | Dimension | Score (0-3) | ',
        content
    )

    # 2. Normalize TOTAL line to canonical format
    total_match = re.search(r'\*\*TOTAL:?\*\*\s*[:]?\s*(\d{1,2})\s*(/\s*36)?', content)
    if total_match:
        score = int(total_match.group(1))
        content = re.sub(
            r'\*\*TOTAL:?\*\*\s*[:]?\s*\d{1,2}\s*(/\s*36)?',
            f'**TOTAL: {score} / 36**',
            content
        )

    # 3. Add explicit Risk band line if missing (after TOTAL line)
    total_line_match = re.search(r'\*\*TOTAL: (\d{1,2}) / 36\*\*\s*\n', content)
    if total_line_match:
        score = int(total_line_match.group(1))
        band = risk_band(score)
        has_band = bool(re.search(r'\*\*Risk band:', content))
        if not has_band:
            content = content.replace(
                f'**TOTAL: {score} / 36**\n',
                f'**TOTAL: {score} / 36**  \n**Risk band: {band}**\n'
            )

    # 4. Normalize date formats to YYYY-MM-DD
    def normalize_date(match):
        raw = match.group(1)
        for fmt in ['%Y-%m-%d', '%d/%m/%Y', '%m/%d/%Y', '%B %d, %Y', '%d %B %Y', '%Y/%m/%d']:
            try:
                parsed = datetime.strptime(raw, fmt)
                return f'**Assessment date:** {parsed.strftime("%Y-%m-%d")}'
            except ValueError:
                continue
        return match.group(0)

    content = re.sub(r'\*\*Assessment date:\*\*\s*(\S+)', normalize_date, content)
    content = re.sub(r'\*\*Assessment Date:\*\*\s*(\S+)', normalize_date, content)

    return content


def align_market(content: str) -> str:
    """### (H3) section headings → ## (H2)"""
    # Only convert numbered section headings
    return re.sub(r'^### (\d+\. )', r'## \1', content, flags=re.M)


def process_file(filepath: Path) -> str | None:
    """Process a single report file. Returns None if no changes needed."""
    slug = filepath.stem
    original = filepath.read_text(encoding='utf-8')
    content = original

    if slug.startswith('dfva-market-'):
        if slug in ('dfva-market-b-des', 'dfva-market-b-sci'):
            content = align_market(content)
        # Don't touch other market files in Phase 1
    elif slug.startswith('dfva-recommend-'):
        # Don't touch recommend files in Phase 1
        pass
    elif slug.startswith('dfva-faculty-'):
        # Don't touch faculty reports
        pass
    else:
        # Assessment report
        if is_category_b(content):
            content = align_category_b(content, slug)
        if is_8_section(content):
            content = align_8_section(content)
        content = normalize_all(content)

    if content != original:
        return content
    return None


def main():
    changes = []
    report_files = sorted(REPORTS_DIR.glob('dfva-*.md'))

    for fp in report_files:
        result = process_file(fp)
        if result is not None:
            changes.append(fp)
            if not DRY_RUN:
                fp.write_text(result, encoding='utf-8')

    if changes:
        action = 'Would align' if DRY_RUN else 'Aligned'
        print(f'{action} {len(changes)} file(s):')
        for fp in changes:
            print(f'  {fp.name}')
    else:
        print('No files needed alignment.')

    if DRY_RUN and changes:
        print('\nRun without --dry-run to apply changes.')


if __name__ == '__main__':
    main()
