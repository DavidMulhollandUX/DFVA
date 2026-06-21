#!/usr/bin/env python3
"""Inject real labour-market evidence (data/labour-evidence.json) into the assessment
and market report markdown:
  - reports/dfva-{code}.md       (B2) — a 'REAL GRADUATE DESTINATIONS' block by the MARKET DATA footer
  - reports/dfva-market-{code}.md (B3) — a full 'REAL GRADUATE DESTINATIONS & DEMAND' section
Idempotent: content sits between <!-- LABOUR-EVIDENCE --> markers and is replaced on re-run.
Run scripts/build-labour-evidence.py first, then apply-reports.py + generate-recommend-content.py.
"""
import json, re, os
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
EV = json.loads((REPO / 'data/labour-evidence.json').read_text())
IB = EV['_meta']['ibisworld']
START, END = '<!-- LABOUR-EVIDENCE:START -->', '<!-- LABOUR-EVIDENCE:END -->'


def render(ev, header):
    d, q, emp = ev.get('destinations', {}), ev.get('qilt', {}), ev.get('demandEmployers') or []
    row = lambda s, o: f"| {s} | {', '.join(o) if o else '—'} |"
    out = [
        header, "",
        "**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, by field of education; % = share of field graduate placements):", "",
        "| Career stage | Top occupations |", "|---|---|",
        row("Entry (~1yr)", d.get('entry', [])), row("Early (~3yr)", d.get('early', [])), row("Senior (~5yr)", d.get('senior', [])), "",
    ]
    if q:
        er = f"{q['employmentRate'] * 100:.0f}%" if q.get('employmentRate') else "n/a"
        er3 = f"{q['employmentRate3yr'] * 100:.0f}%" if q.get('employmentRate3yr') else "n/a"
        sal = f"${q['medianSalary']:,}" if q.get('medianSalary') else "n/a"
        dem = (q.get('occupationDemand') or '').replace('_', ' ').title()
        out += [f"**Graduate outcomes** (QILT GOS {q.get('year', 2024)}, postgraduate): {er} full-time employment · median salary {sal} · 3-year employment {er3} · JSA occupation demand: **{dem}**.", ""]
    if emp:
        sal_note = f" Advertised salary {ev['demandSalary']}." if ev.get('demandSalary') else ""
        out += [f"**Hiring now (demand-side)** — Adzuna AU live vacancies (who is advertising, *not* alumni destinations): {', '.join(emp[:12])}.{sal_note}", ""]
    out += [f"**Sector context:** {IB['revenue']} — {IB['shock']} ({IB['industry']}).", "",
            f"*Sources: JSA HEO Work & Occupation (Table_3); QILT GOS {q.get('year', 2024)}; IBISWorld P8102; Adzuna AU. Destinations are field-of-education level (not per-degree); employers are demand-side (not alumni).*"]
    return '\n'.join(out)


def inject(path, block):
    """Replace the marked block if present, else append it."""
    marked = f"{START}\n{block}\n{END}"
    if not path.exists():
        return False
    txt = path.read_text()
    if START in txt and END in txt:
        txt = re.sub(re.escape(START) + r'.*?' + re.escape(END), marked, txt, flags=re.DOTALL)
    else:
        txt = txt.rstrip() + f"\n\n---\n\n{marked}\n"
    path.write_text(txt)
    return True


assess = market = 0
for code, ev in EV['programs'].items():
    if inject(REPO / f'reports/dfva-{code}.md', render(ev, "### REAL GRADUATE DESTINATIONS (JSA HEO · QILT · Adzuna)")):
        assess += 1
    if inject(REPO / f'reports/dfva-market-{code}.md', render(ev, "## REAL GRADUATE DESTINATIONS & DEMAND (JSA HEO · QILT · Adzuna)")):
        market += 1
print(f"injected evidence into {assess} assessment + {market} market reports")
miss_a = [c for c in EV['programs'] if not (REPO / f'reports/dfva-{c}.md').exists()]
miss_m = [c for c in EV['programs'] if not (REPO / f'reports/dfva-market-{c}.md').exists()]
if miss_a: print("  no assessment report:", miss_a)
if miss_m: print("  no market report:", miss_m)
