#!/usr/bin/env python3
"""
Generate per-program improvement roadmaps showing specific actions to reach RESILIENT.
Reads all reports/dfva-*.md, generates reports/dfva-recommend-{code}.md
Handles JSON, compact markdown, and full markdown report formats.
"""
import re, os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from recommendations import get_recommendations

REPORTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'reports')

DIM_KEYWORDS = {
    'Automation': 'Automation Exposure',
    'Systems': 'Systems Thinking',
    'Technical': 'Technical Depth',
    'Decision': 'Decision-Making',
    'AI Lit': 'AI Literacy',
    'AI ': 'AI Literacy',
    'Domain': 'Domain Depth',
    'Research': 'Research Rigour',
    'Human': 'Human & Relational',
    'Curr': 'Curriculum Currency',
    'Outcome': 'Outcome Evidence',
    'Irreplaceability': 'Irreplaceability (bonus)',
}

DIM_NAMES = {v for v in DIM_KEYWORDS.values()}

# Canonical 11-dimension order, deduplicated — DIM_KEYWORDS maps two keys
# ('AI Lit', 'AI ') to 'AI Literacy', so .values() repeats it. Iterating this
# instead prevents the duplicated AI Literacy row in the diagnostic table.
DIM_ORDER = list(dict.fromkeys(DIM_KEYWORDS.values()))

# Authoritative per-dimension scores live in the app's structured data, not the
# inconsistently-formatted markdown scorecards (some reports — 527cl, 746st,
# mc-apbusa — have no parseable scorecard table at all). Parse them once at import.
SHARED_DATA = os.path.join(os.path.dirname(__file__), '..', 'compass', 'app', 'src', 'compass', 'sharedProgramData.ts')

def load_canonical():
    """Return {code: {'dims': {label: score}, 'score': total, 'risk': band}} from
    sharedProgramData.ts — the authoritative source. Total = sum of all 11 dimensions
    (see dfva/source/rubric.ts → totalScore); we mirror score/risk so reports stay in sync."""
    out = {}
    try:
        text = open(SHARED_DATA).read()
    except OSError:
        return out
    # Each entry: score, maxScore, riskBand, ... dimensions:[...], ... assessmentSlug "dfva-{code}".
    for score, risk, dims_block, code in re.findall(
            r'score:\s*(\d+),\s*maxScore:\s*\d+,\s*riskBand:\s*"([^"]+)".*?dimensions:\s*\[(.*?)\].*?assessmentSlug:\s*"dfva-([^"]+)"',
            text, re.DOTALL):
        pairs = re.findall(r'label:\s*"([^"]+)",\s*score:\s*(\d+)', dims_block)
        if pairs:
            out[code] = {'dims': {label: int(s) for label, s in pairs}, 'score': int(score), 'risk': risk}
    return out

CANONICAL = load_canonical()

# Real labour-market evidence (JSA HEO destinations + QILT + Adzuna + IBISWorld),
# assembled by scripts/build-labour-evidence.py.
LABOUR_EVIDENCE = {}
try:
    with open(os.path.join(os.path.dirname(__file__), '..', 'data', 'labour-evidence.json')) as _f:
        LABOUR_EVIDENCE = json.load(_f)
except Exception:
    pass


def render_market_evidence(code):
    """§3 built from real labour-market evidence; None if the program has no evidence row."""
    ev = (LABOUR_EVIDENCE.get('programs') or {}).get(code)
    if not ev:
        return None
    d = ev.get('destinations', {})
    q = ev.get('qilt', {})
    ib = (LABOUR_EVIDENCE.get('_meta') or {}).get('ibisworld', {})
    emp = ev.get('demandEmployers') or []
    row = lambda stage, occs: f"| {stage} | {', '.join(occs) if occs else '—'} |"
    out = [
        "## 3. REAL GRADUATE DESTINATIONS & MARKET DEMAND",
        "",
        "**Where graduates of this field actually work** — JSA Higher Education Outcomes (ATO tax-linked administrative data, by field of education; % = share of field graduate placements):",
        "",
        "| Career stage | Top occupations |",
        "|---|---|",
        row("Entry (~1yr)", d.get('entry', [])),
        row("Early (~3yr)", d.get('early', [])),
        row("Senior (~5yr)", d.get('senior', [])),
        "",
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
    if ib:
        out += [f"**Sector context:** {ib.get('revenue', '')} — {ib.get('shock', '')} ({ib.get('industry', 'IBISWorld P8102')}).", ""]
    out.append(f"*Sources: JSA HEO Work & Occupation (Table_3); QILT GOS {q.get('year', 2024)}; IBISWorld P8102; Adzuna AU. Destinations are field-of-education level (not per-degree); employers are demand-side (not alumni).*")
    return '\n'.join(out)

def parse_dimensions_from_json(data):
    """Parse dimensions from JSON format."""
    dims = {}
    for d in data.get('dimensions', []):
        label = d.get('label', '')
        score = d.get('score', 0)
        if label and isinstance(score, int):
            dims[label] = score
    return dims

def parse_dimensions_from_markdown(content):
    """Parse dimensions from markdown table formats."""
    dims = {}
    lines = content.split('\n')
    in_table = False
    table_lines = []
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('|') and stripped.endswith('|'):
            # Check if this looks like a dimension table header or row
            if any(kw.lower() in stripped.lower() for kw in DIM_KEYWORDS):
                table_lines.append(stripped)
                in_table = True
            elif in_table and '---' not in stripped.replace('-', '').replace('|', '').strip():
                table_lines.append(stripped)
        elif in_table and not stripped.startswith('|'):
            in_table = False
    
    for line in table_lines:
        parts = [p.strip() for p in line.split('|') if p.strip()]
        if len(parts) < 2:
            continue
        for kw, label in DIM_KEYWORDS.items():
            if kw.lower() in parts[1].lower() or kw.lower() in ' '.join(parts).lower():
                if label in dims:
                    break
                # Find the score column - try each remaining part
                for p in parts[2:]:
                    try:
                        val = int(p)
                        if 0 <= val <= 3:
                            dims[label] = val
                            break
                    except ValueError:
                        # Handle "X/3" format
                        m = re.match(r'(\d)/3', p)
                        if m:
                            val = int(m.group(1))
                            if 0 <= val <= 3:
                                dims[label] = val
                                break
                        continue
                break
    return dims

def parse_transposed_table(content):
    """Parse dimensions from transposed table format where each dimension is a row with S column."""
    dims = {}
    lines = content.split('\n')
    for line in lines:
        stripped = line.strip()
        if not (stripped.startswith('|') and stripped.endswith('|')):
            continue
        parts = [p.strip() for p in stripped.split('|') if p.strip()]
        if len(parts) < 3:
            continue
        # Try to match dimension name
        for kw, label in DIM_KEYWORDS.items():
            if kw.lower() in parts[1].lower():
                # Find score - often in the next column
                for p in parts[2:]:
                    try:
                        val = int(p)
                        if 0 <= val <= 3:
                            dims[label] = val
                            break
                    except ValueError:
                        # Handle "X/3" format
                        m = re.match(r'(\d)/3', p)
                        if m:
                            val = int(m.group(1))
                            if 0 <= val <= 3:
                                dims[label] = val
                                break
                        continue
                break
    return dims

def parse_report(filepath):
    """Parse a DFVA report file into dimensions and metadata."""
    with open(filepath) as f:
        content = f.read()
    
    basename = os.path.basename(filepath)
    code = basename.replace('dfva-', '').replace('.md', '')
    
    # Try JSON first
    dims = {}
    score = 0
    risk = 'MODERATE RISK'
    name = code.upper()
    duration = 'N/A'
    
    if content.strip().startswith('{'):
        # Some JSON files have trailing markdown content after the closing brace.
        # Extract just the JSON object.
        try:
            # Find the first complete JSON object
            decoder = json.JSONDecoder()
            data, _ = decoder.raw_decode(content)
            score = data.get('score', 0)
            risk = data.get('riskBand', 'MODERATE RISK')
            dims = parse_dimensions_from_json(data)
            name = data.get('programName', data.get('program', data.get('name', code.upper())))
            duration = data.get('duration', 'N/A')
        except (json.JSONDecodeError, ValueError):
            pass
    
    if not dims:
        # Markdown format
        # Extract score - multiple formats
        # Format 1: "TOTAL: XX/36"
        sm = re.search(r'TOTAL:?\s*(\d+)\s*/\s*36', content)
        # Format 2: Bold table cell "**XX/36" (may have trailing text before closing bold)
        if not sm:
            sm = re.search(r'\*\*(\d+)\s*/\s*36', content)
        # Format 3: "**Score:** XX/36"
        if not sm:
            sm = re.search(r'\*\*Score:\*\*\s*(\d+)\s*/\s*36', content)
        if sm:
            score = int(sm.group(1))
        
        # Extract risk band
        rm = re.search(r'TOTAL:?\s*\d+\s*/\s*36\s*[—–\-–]+\s*(\w+(?:\s+\w+)?)', content)
        if not rm:
            # Try bold format: **TOTAL: XX / 36
            rm = re.search(r'\*\*TOTAL:?\s*\d+\s*/?\s*36.*?(RESILIENT|MODERATE\s+RISK|HIGH\s+RISK|CRITICAL)', content, re.IGNORECASE)
        if not rm:
            # Try **Score:** format
            rm = re.search(r'\*\*Score:\*\*\s*\d+\s*/\s*36\s*[—–\-–]+\s*(\w+(?:\s+\w+)?)', content)
        if not rm:
            # Try "XX/36 — BAND" anywhere in the file
            rm = re.search(r'\d+\s*/\s*36\s*[—–\-–]+\s*(\w+(?:\s+\w+)?)', content)
        if rm:
            risk = rm.group(1).strip()
        
        # Extract program name
        tn = re.search(r'#+\s*DFVA\s+REPORT:\s*(.+?)(?:\n|\|)', content)
        if tn:
            name = tn.group(1).strip()
            # Clean up: remove parenthetical codes
            name = re.sub(r'\s*\([^)]*\)\s*$', '', name).strip()
        
        # Try to get name from metadata line
        if not tn:
            nm = re.search(r'\*\*Institution:\*\*\s*(.+?)\s*\|', content)
            if nm:
                name = nm.group(1).strip()
        
        # Extract duration
        dm = re.search(r'\*\*Duration:\*\*\s*(.+?)(?:\||\n)', content)
        if dm:
            duration = dm.group(1).strip()
        else:
            dm = re.search(r'Duration:?\s*\*?\*?(.+?)(?:\||\n)', content)
            if dm:
                duration = dm.group(1).strip()
        
        # Parse dimensions
        dims = parse_dimensions_from_markdown(content)
        if len(dims) < 5:
            dims2 = parse_transposed_table(content)
            if len(dims2) > len(dims):
                dims = dims2
    
    # Authoritative override: structured per-dimension scores from sharedProgramData.ts.
    # Markdown scorecards are missing/unparseable for some programs (e.g. 527cl, 746st,
    # mc-apbusa), which previously yielded all-0/3 diagnostic tables.
    canon = CANONICAL.get(code)
    if canon:
        dims = dict(canon['dims'])
        score = canon['score']   # mirror the authoritative total (sum of dimensions)
        risk = canon['risk']

    return {
        'code': code,
        'name': name,
        'score': score,
        'risk': risk,
        'dims': dims,
        'duration': duration,
    }


def generate_roadmap(prog):
    """Generate a markdown improvement roadmap with 11 standard sections."""
    name = prog['name']
    code = prog['code']
    score = prog['score']
    dims = prog['dims']
    risk = prog['risk']
    gap = max(0, 28 - score)
    
    # Map code to study field
    field = 'Science'
    code_lower = code.lower()
    if code_lower in ['mc-cs', 'mc-datasc', 'mc-is']:
        field = 'Information Technology'
    elif code_lower in ['mc-indeng', '746st']:
        field = 'Engineering'
    elif code_lower in ['527cl', 'mc-clind', 'mc-nursc', 'mc-propsyc', 'mc-phtyph', 'mc-surged', '439fs']:
        field = 'Health'
    elif code_lower in ['mc-ba', 'mc-busana', 'mc-bamktg', 'mc-base', 'mc-apbusa']:
        field = 'Business & Management'
    elif code_lower in ['mc-arch', 'mc-urbdes', 'mc-prop', 'mc-urbhort', 'b-des']:
        field = 'Architecture & Building'
    elif code_lower in ['mc-journ', 'mc-scwr']:
        field = 'Creative Arts'
    elif code_lower in ['mc-ed', 'mc-intedib', 'mc-tesol']:
        field = 'Education'
    elif code_lower in ['mc-envlaw']:
        field = 'Law'
    
    # Find weak dimensions (score < 3)
    weak = [(label, s) for label, s in dims.items() if s < 3]
    weak.sort(key=lambda x: x[1])  # sort by current score ascending
    
    # Build recommendations
    p1_actions = []
    p2_actions = []
    p1_points = 0
    p2_points = 0
    
    for label, cur in weak:
        recs = get_recommendations(label, cur)
        if not recs:
            continue
        best = recs[0]  # highest impact, lowest effort
        entry = {
            'dim': label, 'from': cur,
            'to': min(cur + best['impact'], 3),
            'action': best['action'], 'effort': best['effort'],
            'impact': best['impact']
        }
        
        if best['effort'] == 'Low' and p1_points < gap:
            p1_actions.append(entry)
            p1_points += best['impact']
        elif p2_points + p1_points < gap + 3:
            p2_actions.append(entry)
            p2_points += best['impact']
    
    # If we don't have enough P1 actions to close the gap, pull from P2
    while p1_points < gap and p2_actions:
        a = p2_actions.pop(0)
        p1_actions.append(a)
        p1_points += a['impact']
        p2_points -= a['impact']
    
    # Generate markdown using standard 11-section format
    md = f"""## IMPROVEMENT PLAN: {name}

**Current:** {score}/36 {risk} | **Duration:** {prog.get('duration', 'N/A')}
**Target:** 28/36 RESILIENT | **Gap:** {gap} point{'s' if gap != 1 else ''}

---

## 1. DIAGNOSTIC SUMMARY
The {name} scored **{score}/36 — {risk}**. Gaps in core dimensions define the primary intervention targets.

| Dimension | Score | Status |
|---|---|---|
"""
    for d_label in DIM_ORDER:
        d_score = dims.get(d_label, 0)
        d_status = 'Strong' if d_score == 3 else 'Adequate' if d_score == 2 else 'Critical gap'
        md += f"| {d_label} | {d_score}/3 | {d_status} |\n"
        
    md += f"""| **TOTAL** | **{score}/36** | **{risk}** |

---

## 2. SCORE-TO-ACTION MAPPING
| Dimension | DFVA Score | Gap Diagnosis | Recommended Intervention |
|---|---|---|---|
"""
    for a in p1_actions + p2_actions:
        dim = a['dim']
        cur_score = a['from']
        md += f"| {dim} | {cur_score}/3 | Entry-level skills show automation risk. | {a['action']}. |\n"
        
    market_section = render_market_evidence(code) or (
        "## 3. MARKET EVIDENCE SNAPSHOT\n\n_Real labour-market evidence pending for this program._"
    )
    md += f"""
---

{market_section}

---

## 4. PRIORITISED INTERVENTIONS TABLE
| Priority | Action | Target Dimension(s) | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |
|---|---|---|---|---|---|---|---|---|
"""
    for i, a in enumerate(p1_actions, 1):
        timeline = "Months 1–6" if a['effort'] == 'Low' else "Months 3–9"
        owner = "Program Coordinator" if a['effort'] == 'Low' else "Faculty Curriculum Committee"
        kpi = "Approved Sem 1 2027" if a['effort'] == 'Low' else "Course launched Sem 2 2027"
        md += f"| {i} | {a['action']} | {a['dim']} | Strong market demand for AI-governance capabilities | HIGH | {a['effort']} | {owner} | {timeline} | {kpi} |\n"
        
    md += """
---

## 5. 12-MONTH IMPLEMENTATION ROADMAP
* **Month 1–3 — Foundation:** Update career advisory frameworks. Begin syllabus design for AI and technology governance modules.
* **Month 3–6 — Design Sprint:** Finalize unit outlines and project guidelines. Formulate industry review panel to ensure curriculum alignment.
* **Month 6–9 — Build and Validate:** Submit changes to the curriculum committee for approval. Pilot AI verification workshops.
* **Month 9–12 — Pre-Launch:** Update course handbooks. Publish destination reports and prepare staff for Sem 1 2027 delivery.

---

## 6. 24-MONTH CAPABILITY ROADMAP
* **Months 1–12 — Structural Fix:** Address the most critical gaps. Deploy the AI Literacy and tool validation core modules.
* **Months 13–18 — Depth and Differentiation:** Mandate client-facing capstones and project reflections. Align course lines with professional standards.
* **Months 19–24 — Evidence and Signal:** Document second-generation destination outcomes. Audit student research outputs against validation guidelines.

---

## 7. ASSESSMENT REDESIGN EXAMPLES
* **Coursework Project — Redesigned:** Complete a major project with a documented AI use reflection. Students must outline all tools used, prompts entered, output verification steps, and human judgment checks.
* **Specialist Seminar — New Module:** Select an AI tool in your domain and write a 1,000-word GRC audit detailing three failure modes, data source lineage, and risk mitigation strategies.

---

## 8. AI GOVERNANCE AND QUALITY CONTROLS
* **Academic Integrity Policy:** Mandate disclosure of all generative AI tools in coursework.
* **Human Validation Gates:** Require visual draft reviews or git version logs to ensure students execute study designs.
* **Curation Protocols:** Require manual data audits before uploading to automated modeling tools.

---

## 9. MEASUREMENT PLAN
* **Leading indicators (12 months):** Core AI modules active in handbook · Advisory panel constituted · Revised projects deployed.
* **Lagging indicators (12–24 months):** Graduate time-to-employment reduced to 90 days · Employer satisfaction rating ≥ 80%.

---

## 10. RISKS, TRADE-OFFS, AND DEPENDENCIES
* **Faculty lag:** Sourcing qualified academic coordinators can delay course roll-outs. *Mitigation:* Deliver joint guest lectures with industry partners.
* **Credit constraints:** Adding mandatory units can reduce student elective flexibility. *Mitigation:* Integrate topics as modules in existing units.

---

## 11. REDESIGNED GRADUATE PROFILE (2027 READY)
The 2027-ready graduate is a domain specialist and workflow critic. They do not merely operate general-purpose AI tools; they govern and audit them. They bring strong systems thinking, decision ownership under uncertainty, and client translation capabilities that make them highly durable in a changing labor market.
"""
    return md


def main():
    files = sorted([
        f for f in os.listdir(REPORTS_DIR)
        if f.startswith('dfva-') and f.endswith('.md')
        and 'market' not in f and 'recommend' not in f and 'cross' not in f
        # faculty-* are aggregate graduate-outcome pages, not DFVA-scored programs —
        # excluding them prevents spurious all-0/3 dfva-recommend-faculty-* reports.
        and 'faculty' not in f
    ])
    
    generated = 0
    errors = 0
    for fname in files:
        filepath = os.path.join(REPORTS_DIR, fname)
        code = fname.replace('dfva-', '').replace('.md', '')
        outpath = os.path.join(REPORTS_DIR, f'dfva-recommend-{code}.md')
        
        # Check if the detailed plan already exists to avoid overwriting it
        if os.path.exists(outpath):
            try:
                existing_content = open(outpath).read()
                if '## 1. DIAGNOSTIC SUMMARY' in existing_content:
                    print(f"  SKIP {fname}: already has detailed improvement plan")
                    continue
            except Exception as e:
                print(f"  Warning reading {outpath}: {e}")
        
        try:
            prog = parse_report(filepath)
        except Exception as e:
            print(f"  ERROR parsing {fname}: {e}")
            errors += 1
            continue
        
        if prog['score'] == 0 and len(prog['dims']) < 3:
            print(f"  SKIP {fname}: insufficient data (score={prog['score']}, dims={len(prog['dims'])})")
            continue
        
        roadmap = generate_roadmap(prog)
        
        with open(outpath, 'w') as f:
            f.write(roadmap)
        
        p1_count = len([l for l in roadmap.split('\n') if l.startswith('| P1') or l.startswith('| 1 |')])
        p2_count = len([l for l in roadmap.split('\n') if l.startswith('| P2') or l.startswith('| 2 |')])
        print(f"  {code}: {prog['score']}/36 → roadmap ({p1_count} P1 + {p2_count} P2 actions)")
        generated += 1
    
    print(f"\nGenerated {generated} improvement roadmaps in {REPORTS_DIR}")
    if errors:
        print(f"WARNING: {errors} files had parse errors")


if __name__ == '__main__':
    main()
