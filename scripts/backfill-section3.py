#!/usr/bin/env python3
"""
Phase 2a — Backfill section 3 (MARKET EVIDENCE SNAPSHOT) into 8-section reports.

Reads the corresponding market report, extracts the job family map, formats it
as the canonical 4-column snapshot table, and inserts it between sections 2 and 4.

Run: python3 scripts/backfill-section3.py [--dry-run] [CODE ...]
If no codes given, processes all 8-section reports in batch.

Rules:
- NEVER modify existing prose — only inserts new sections
- Source: dfva-market-{code}.md → section 3 content
- Verify: runs dfva:report-lint afterward
"""

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REPORTS = REPO / 'reports'
DRY_RUN = '--dry-run' in sys.argv


def extract_job_families(market_text: str) -> list[dict]:
    """Extract job family rows from the market report's JOB FAMILY MAP table."""
    # Find the job family map section
    section_start = market_text.find('## 1. JOB FAMILY MAP')
    if section_start == -1:
        # Try alternative heading format
        section_start = market_text.find('## 1. JOB FAMILY MAP')
        if section_start == -1:
            return []

    # Find the table within this section (ends at next ## heading or ---)
    table_start = market_text.find('\n|', section_start)
    if table_start == -1:
        return []

    # Extract rows until blank line or next section
    rows = []
    for line in market_text[table_start:].split('\n'):
        line = line.strip()
        if not line.startswith('|'):
            if rows:
                break
            continue
        # Skip header and separator rows
        if 'Job Family' in line or '---' in line or '|-' in line:
            continue
        cells = [c.strip() for c in line.strip('|').split('|')]
        if len(cells) >= 4:
            rows.append({
                'family': cells[0],
                'signal': cells[2] if len(cells) > 2 else '',
                'theme': cells[3] if len(cells) > 3 else '',
                'implication': cells[4] if len(cells) > 4 else '',
            })

    return rows


def build_snapshot_table(rows: list[dict]) -> str:
    """Build the canonical MARKET EVIDENCE SNAPSHOT table."""
    if not rows:
        return None

    lines = ['### 3. MARKET EVIDENCE SNAPSHOT']
    lines.append('| Job Family | Recent Hiring Signal | Discussion Theme | Curriculum Implication |')
    lines.append('|---|---|---|---|')

    for r in rows[:6]:  # Max 6 job families
        # Truncate long fields
        signal = r['signal'][:120] + ('...' if len(r['signal']) > 120 else '')
        theme = r['theme'][:100] + ('...' if len(r['theme']) > 100 else '')
        implication = r['implication'][:100] + ('...' if len(r['implication']) > 100 else '')
        lines.append(f'| {r["family"]} | {signal} | {theme} | {implication} |')

    return '\n'.join(lines) + '\n'


def backfill_report(code: str) -> bool:
    """Backfill section 3 into an assessment report. Returns True if changed."""
    assess_path = REPORTS / f'dfva-{code}.md'
    market_path = REPORTS / f'dfva-market-{code}.md'

    if not assess_path.exists():
        print(f'  SKIP: no assessment report for {code}')
        return False
    if not market_path.exists():
        print(f'  SKIP: no market report for {code}')
        return False

    assess_text = assess_path.read_text()
    market_text = market_path.read_text()

    # Check if section 3 already exists
    if '### 3. MARKET EVIDENCE SNAPSHOT' in assess_text:
        print(f'  SKIP: section 3 already present in {code}')
        return False

    # Extract job families from market report
    rows = extract_job_families(market_text)
    if not rows:
        print(f'  SKIP: no job families found in market report for {code}')
        return False

    # Build snapshot table
    snapshot = build_snapshot_table(rows)
    if not snapshot:
        print(f'  SKIP: could not build snapshot for {code}')
        return False

    # Find insertion point: between section 2 end and section 4 start
    # Section 2 ends at '### 4. DFVA SCORECARD' or the blank line before it
    scorecard_marker = '### 4. DFVA SCORECARD'

    if scorecard_marker not in assess_text:
        # Try old format
        scorecard_marker = '### DFVA SCORECARD'
        if scorecard_marker not in assess_text:
            # Try '### 3. DFVA SCORECARD' (old numbering)
            if '### 3. DFVA SCORECARD' in assess_text:
                scorecard_marker = '### 3. DFVA SCORECARD'
            else:
                print(f'  SKIP: cannot find scorecard section in {code}')
                return False

    # Insert before the scorecard section, with blank lines
    new_text = assess_text.replace(
        scorecard_marker,
        snapshot + '\n' + scorecard_marker
    )

    if DRY_RUN:
        print(f'  WOULD backfill section 3 in {code} ({len(rows)} job families)')
        return True

    assess_path.write_text(new_text)
    print(f'  BACKFILLED section 3 in {code} ({len(rows)} job families)')
    return True


def main():
    codes = [a for a in sys.argv[1:] if not a.startswith('--') and a != '--dry-run']

    if not codes:
        # Process all 8-section reports from the GRANDFATHERED Category C list
        codes = [
            'mc-actsc', 'mc-apbusa', 'mc-bamktg', 'mc-base',
            'mc-clind', 'mc-datasc', 'mc-ed', 'mc-gencoun',
            'mc-indeng', 'mc-intedib', 'mc-is', 'mc-journ',
            'mc-nursc', 'mc-phtyph', 'mc-prop', 'mc-propsyc',
            'mc-scwr', 'mc-surged', 'mc-tesol',
            '746st', '527cl', 'mc-urbdes',
        ]

    changed = 0
    for code in codes:
        if backfill_report(code):
            changed += 1

    if DRY_RUN:
        print(f'\nWould backfill {changed} report(s). Run without --dry-run to apply.')
    else:
        print(f'\nBackfilled {changed} report(s).')


if __name__ == '__main__':
    main()
