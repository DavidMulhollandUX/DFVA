#!/usr/bin/env python3
"""Parse all DFVA assessment reports and generate TypeScript entries."""

import json
import os
import re
import glob

REPORTS_DIR = "/Users/djmulholland/Documents/SXD-Github/DFVA/reports"

# Programs already in sharedProgramData.ts
EXISTING_PROGRAMS = {
    "b-des", "mc-is", "b-sci", "mc-scibit", "mc-sciear", "mc-sciepi",
    "mc-cs", "mc-datasc", "mc-scibif", "mc-actsc", "mc-bmedsc", "mc-sciphy",
    "mc-scibio", "mc-sciche", "mc-envsc", "mc-climsci", "439fs", "mc-gencoun", "mc-nursc"
}

# Programs already in reportContent.ts (assessment entries only)
EXISTING_REPORT_CONTENT = {
    "b-des", "mc-is", "b-sci"
}

# Course code to program name and level mapping
PROGRAM_MAPPINGS = {
    "mc-urbhort": ("Master of Urban Horticulture", "Master · 2 years"),
    "mc-urbdes": ("Master of Urban Design", "Master · 2 years"),
    "mc-tesol": ("Master of TESOL", "Master · 2 years"),
    "mc-surged": ("Master of Surgical Education", "Master · 2 years"),
    "mc-scwr": ("Master of Social Work", "Master · 2 years"),
    "mc-propsyc": ("Master of Professional Psychology", "Master · 1 year"),
    "mc-prop": ("Master of Property", "Master · 2 years"),
    "mc-phtyph": ("Master of Physiotherapy (Pelvic Health)", "Master · 1 year"),
    "mc-journ": ("Master of Journalism", "Master · 2 years"),
    "mc-intedib": ("Master of International Education (IB)", "Master · 2 years"),
    "mc-indeng": ("Master of Industrial Engineering", "Master · 2 years"),
    "mc-envlaw": ("Master of Environmental Law", "Master · 1 year"),
    "mc-ed": ("Master of Education", "Master · 2 years"),
    "mc-clind": ("Master of Clinical Dentistry", "Master · 3 years"),
    "mc-busana": ("Master of Business Analytics", "Master · 1 year"),
    "mc-base": ("Master of Advanced Social Enterprise", "Master · 1.5 years"),
    "mc-bamktg": ("Master of Business Administration (Marketing)", "Master · 2 years"),
    "mc-ba": ("Master of Business Administration", "Master · 2 years"),
    "mc-arch": ("Master of Architecture", "Master · 3 years"),
    "mc-apbusa": ("Master of Applied Business Analytics", "Master · 1.5 years"),
    "746st": ("Master of Engineering Structures", "Master · 1 year"),
    "527cl": ("Master of Clinical Psychology", "Master · 2 years"),
    "439fs": ("Master of Food Science", "Master · 2 years"),
    "mc-actsc": ("Master of Actuarial Science", "Master · 1.5 years"),
    "mc-bmedsc": ("Master of Biomedical Science", "Master · 2 years"),
    "mc-sciphy": ("Master of Science (Physics)", "Master · 2 years"),
    "mc-scibio": ("Master of Science (BioSciences)", "Master · 2 years"),
    "mc-sciche": ("Master of Science (Chemistry)", "Master · 2 years"),
    "mc-envsc": ("Master of Environmental Science", "Master · 2 years"),
    "mc-climsci": ("Master of Climate Science", "Master · 2 years"),
    "mc-gencoun": ("Master of Genetic Counselling", "Master · 2 years"),
    "mc-nursc": ("Master of Nursing Science", "Master · 2 years"),
    "mc-scibit": ("Master of Biotechnology", "Master · 2 years"),
    "mc-sciear": ("Master of Science (Earth Sciences)", "Master · 2 years"),
    "mc-sciepi": ("Master of Science (Epidemiology)", "Master · 2 years"),
    "mc-cs": ("Master of Computer Science", "Master · 2 years"),
    "mc-datasc": ("Master of Data Science", "Master · 2 years"),
    "mc-scibif": ("Master of Science (Bioinformatics)", "Master · 2 years"),
    "b-des": ("Bachelor of Design", "Bachelor · 3 years"),
    "b-sci": ("Bachelor of Science", "Bachelor · 3 years"),
    "mc-is": ("Master of Information Systems", "Master · 1.5–2 years"),
}

DIMENSION_KEYWORDS = [
    ("Automation Exposure", ["automation exposure", "automation"]),
    ("Systems Thinking", ["systems thinking"]),
    ("Technical Depth", ["technical depth"]),
    ("Decision-Making", ["decision-making", "decision making"]),
    ("AI Literacy", ["ai literacy"]),
    ("Domain Depth", ["domain depth"]),
    ("Research Rigour", ["research rigour", "research rigor", "research methods"]),
    ("Human & Relational", ["human & relational", "human and relational"]),
    ("Curriculum Currency", ["curriculum currency", "currency"]),
    ("Outcome Evidence", ["outcome evidence", "outcomes"]),
    ("Irreplaceability (bonus)", ["irreplaceability", "irreplaceable"]),
]


def parse_json_report(path):
    """Parse a JSON format report."""
    with open(path) as f:
        content = f.read()
    # Extract just the JSON part (up to the closing brace of the top-level object)
    brace_count = 0
    json_end = 0
    in_string = False
    escape_next = False
    for i, ch in enumerate(content):
        if escape_next:
            escape_next = False
            continue
        if ch == '\\':
            escape_next = True
            continue
        if ch == '"' and not escape_next:
            in_string = not in_string
            continue
        if in_string:
            continue
        if ch == '{':
            brace_count += 1
        elif ch == '}':
            brace_count -= 1
            if brace_count == 0:
                json_end = i + 1
                break
    data = json.loads(content[:json_end])
    
    dims = []
    for d in data["dimensions"]:
        dims.append({
            "label": d["label"],
            "score": d.get("score", 0),
            "max": d.get("max", 3)
        })
    
    thresholds = data.get("thresholds", {})
    
    return {
        "score": data["score"],
        "maxScore": data.get("maxScore", 36),
        "riskBand": data["riskBand"],
        "dimensions": dims,
        "thresholds": thresholds,
        "programName": data.get("programName", ""),
    }


def parse_markdown_report(path):
    """Parse a markdown format report."""
    with open(path) as f:
        content = f.read()
    
    # Extract TOTAL score - multiple formats
    score = 0
    risk_band = "MODERATE RISK"
    
    # Format: **TOTAL: 26 / 36 — MODERATE RISK**
    m = re.search(r'\*\*TOTAL:\s*(\d+)\s*/\s*36\s*[–—-]+\s*(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)\*\*', content)
    if m:
        score = int(m.group(1))
        risk_band = m.group(2)
    else:
        # Format: **TOTAL: 23/36**
        m = re.search(r'\*\*TOTAL:?\*\*.*?\|\s*\|\s*\*?\*?(\d+)\s*/\s*36', content)
        if m:
            score = int(m.group(1))
        else:
            m = re.search(r'TOTAL:\s*(\d+)\s*/\s*36', content)
            if m:
                score = int(m.group(1))
            else:
                # Format: | **TOTAL** | | **23/36** | |
                m = re.search(r'TOTAL.*?\|\s*\|?\s*\*?\*?(\d+)\s*/\s*36', content)
                if m:
                    score = int(m.group(1))
    
    # Risk band
    m = re.search(r'Risk\s*[Bb]and:?\s*\*?\*?(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)', content)
    if m:
        risk_band = m.group(1)
    else:
        m = re.search(r'(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)', content)
        # Use the first one found after the scorecard
        if m:
            risk_band = m.group(1)
    
    # Format: **Score:** 24/36 — MODERATE RISK
    m = re.search(r'\*\*Score:\*\*\s*(\d+)\s*/\s*36.*?(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)', content)
    if m:
        score = int(m.group(1))
        risk_band = m.group(2)
    
    # Format: **TOTAL: 27/36 — MODERATE RISK** (without spaces)
    m = re.search(r'\*\*TOTAL:\s*(\d+)/36\s*[–—-]+\s*(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)\*\*', content)
    if m:
        score = int(m.group(1))
        risk_band = m.group(2)
    
    # Extract threshold questions
    q1 = "UNCERTAIN"
    q2 = "UNCERTAIN"
    q3 = "UNCERTAIN"
    
    # Format: **Q1:** NO — ...
    m = re.search(r'\*\*Q1[:\*]*\s*(YES|NO|UNCERTAIN)', content)
    if m:
        q1 = m.group(1)
    else:
        # Format: Q1:NO Q2:YES Q3:YES (compact)
        m = re.search(r'Q1\s*:\s*(YES|NO|UNCERTAIN)', content, re.IGNORECASE)
        if m:
            q1 = m.group(1).upper()
    
    m = re.search(r'\*\*Q2[:\*]*\s*(YES|NO|UNCERTAIN)', content)
    if m:
        q2 = m.group(1)
    else:
        m = re.search(r'Q2\s*:\s*(YES|NO|UNCERTAIN)', content, re.IGNORECASE)
        if m:
            q2 = m.group(1).upper()
    
    m = re.search(r'\*\*Q3[:\*]*\s*(YES|NO|UNCERTAIN)', content)
    if m:
        q3 = m.group(1)
    else:
        m = re.search(r'Q3\s*:\s*(YES|NO|UNCERTAIN)', content, re.IGNORECASE)
        if m:
            q3 = m.group(1).upper()
    
    thresholds = {"q1": q1, "q2": q2, "q3": q3}
    
    # Extract dimensions - parse scorecard table rows
    # Strategy: find all table rows that look like dimension rows and match them
    dims = []
    
    # Find all table rows
    lines = content.split("\n")
    table_rows = []
    in_scorecard = False
    
    for line in lines:
        stripped = line.strip()
        
        # Detect scorecard start
        if re.search(r'SCORECARD|DFVA SCORECARD', stripped, re.IGNORECASE):
            in_scorecard = True
            continue
        
        if not in_scorecard:
            continue
        
        # Stop at end of table section (blank line or new section)
        if stripped == "" or (stripped.startswith("##") and not stripped.startswith("###")):
            if table_rows:
                in_scorecard = False
                break
            continue
        
        # Must be a table row
        if stripped.startswith("|") and not re.match(r'^\|\s*#\s*\|', stripped) and not re.match(r'^\|\s*[-—]', stripped):
            # Skip header rows
            if re.match(r'^\|\s*#', stripped) or re.match(r'^\|\s*[-—]', stripped):
                continue
            table_rows.append(stripped)
    
    # If no scorecard section found, try broader search
    if not table_rows:
        for line in lines:
            stripped = line.strip()
            if stripped.startswith("|") and re.search(r'\|\s*\d+\s*\|', stripped):
                if not re.match(r'^\|\s*#\s*\|', stripped) and not re.match(r'^\|\s*[-—]', stripped):
                    table_rows.append(stripped)
    
    # Match each dimension keyword to a table row
    for dim_label, keywords in DIMENSION_KEYWORDS:
        best_score = 0
        for row in table_rows:
            row_lower = row.lower()
            # Check if this row matches any keyword
            matched = False
            for kw in keywords:
                if kw in row_lower:
                    matched = True
                    break
            if not matched:
                continue
            
            # Extract the score from this row
            # Find the cell that contains the dimension name, then get the NEXT cell
            # OR look for a standalone number that is the score
            cells = [c.strip() for c in row.split("|")]
            
            # Strategy: find the index of the cell containing the dimension keyword
            dim_cell_idx = -1
            for i, cell in enumerate(cells):
                cl = cell.lower()
                for kw in keywords:
                    if kw in cl:
                        dim_cell_idx = i
                        break
                if dim_cell_idx >= 0:
                    break
            
            # The score is typically in the cell right after the dimension name
            # But also check for formats where score is in the dimension cell (like "2/3")
            candidate_scores = []
            
            # Check the cell after the dimension name
            if dim_cell_idx >= 0 and dim_cell_idx + 1 < len(cells):
                cell = cells[dim_cell_idx + 1]
                sm = re.match(r'^(\d+)(?:/\d+)?$', cell)
                if not sm:
                    sm = re.match(r'^\*\*(\d+)(?:/\d+)?\*\*$', cell)
                if sm:
                    candidate_scores.append(int(sm.group(1)))
            
            # Also check the dimension cell itself for embedded scores
            if dim_cell_idx >= 0:
                cell = cells[dim_cell_idx]
                for m in re.finditer(r'\b(\d+)/?\d*\b', cell):
                    val = int(m.group(1))
                    if 0 <= val <= 3:
                        candidate_scores.append(val)
            
            # Check all cells for standalone scores (backup)
            for cell in cells:
                sm = re.match(r'^(\d+)$', cell)
                if sm:
                    val = int(sm.group(1))
                    if 0 <= val <= 3:
                        candidate_scores.append(val)
            
            if candidate_scores:
                # Prefer scores from the cell after dimension name
                best_score = max(candidate_scores[:1]) if len(candidate_scores) >= 1 else max(candidate_scores)
            else:
                best_score = 0
        
        dims.append({
            "label": dim_label,
            "score": best_score,
            "max": 3
        })
    
    # Extract program name from header
    prog_match = re.search(r'DFVA REPORT:\s*(.+?)\s*\(', content)
    if not prog_match:
        prog_match = re.search(r'DFVA REPORT:\s*(.+)', content)
    program_name = prog_match.group(1).strip() if prog_match else ""
    # Clean up - remove course code
    program_name = re.sub(r'\s*\(MC-[A-Z]+\)', '', program_name).strip()
    
    return {
        "score": score,
        "maxScore": 36,
        "riskBand": risk_band,
        "dimensions": dims,
        "thresholds": thresholds,
        "programName": program_name,
    }


def extract_market_section(content):
    """Extract market data section from a report."""
    m = re.search(r'(###\s+MARKET DATA.*?)(?=\n\n---|\n##\s|\n\*\*Assessment|\Z)', content, re.DOTALL | re.IGNORECASE)
    if m:
        market = m.group(1).strip()
        # Remove surrounding --- markers
        market = re.sub(r'^---\s*\n', '', market)
        market = re.sub(r'\n---\s*$', '', market)
        return market
    return None


def main():
    # Get all assessment reports (filter out market and recommend files)
    all_files = sorted(glob.glob(os.path.join(REPORTS_DIR, "dfva-*.md")))
    assessment_files = [f for f in all_files 
                        if "market" not in os.path.basename(f) 
                        and "recommend" not in os.path.basename(f)]
    
    print(f"Found {len(assessment_files)} assessment reports\n")
    
    new_programs = []
    new_report_content = []
    new_report_meta = []
    
    for fpath in assessment_files:
        fname = os.path.basename(fpath)
        code = fname.replace("dfva-", "").replace(".md", "")
        
        with open(fpath) as f:
            content = f.read()
        
        # Determine format
        if content.strip().startswith("{"):
            parsed = parse_json_report(fpath)
            format_type = "json"
        else:
            parsed = parse_markdown_report(fpath)
            format_type = "markdown"
        
        # Get program name and level from mapping
        prog_name, level = PROGRAM_MAPPINGS.get(code, (parsed.get("programName", f"Unknown ({code})"), "Master · 2 years"))
        
        # Verify dimensions
        if parsed["score"] == 0 and format_type == "markdown":
            total_from_dims = sum(d["score"] for d in parsed["dimensions"])
            if total_from_dims > 0:
                parsed["score"] = total_from_dims
                print(f"  FIXED score from dimensions: {code} -> {total_from_dims}")
        
        dims = parsed["dimensions"]
        dims_str = ",\n      ".join([
            f'{{ label: "{d["label"]}", score: {d["score"]}, max: {d["max"]} }}'
            for d in dims
        ])
        
        thresholds = parsed.get("thresholds", {})
        q1 = thresholds.get("q1", "UNCERTAIN")
        q2 = thresholds.get("q2", "UNCERTAIN")
        q3 = thresholds.get("q3", "UNCERTAIN")
        
        risk_band = parsed["riskBand"]
        
        # Determine date from file content or use 2026-06-09
        date_match = re.search(r'(?:Assessment date|Date).*?(\d{4}-\d{2}-\d{2})', content)
        date = date_match.group(1) if date_match else "2026-06-09"
        
        # Handbook URL
        handbook_url = f"https://handbook.unimelb.edu.au/2026/courses/{code}"
        
        # Recommend slug
        recommend_slug = f"dfva-recommend-{code}"
        has_recommend = os.path.exists(os.path.join(REPORTS_DIR, f"dfva-recommend-{code}.md"))
        
        rec_line = f'recommendSlug: "{recommend_slug}",' if has_recommend else ''
        
        program_entry = f"""  {{
    program: "{prog_name}",
    institution: "University of Melbourne",
    level: "{level}",
    date: "{date}",
    score: {parsed['score']},
    maxScore: {parsed['maxScore']},
    riskBand: "{risk_band}",
    thresholds: {{ q1: "{q1}", q2: "{q2}", q3: "{q3}" }},
    dimensions: [
      {dims_str}
    ],
    assessmentSlug: "dfva-{code}",
    marketSlug: "dfva-market-{code}",
    {rec_line}
    handbookUrl: "{handbook_url}",
  }}"""
        
        if code in EXISTING_PROGRAMS:
            status = f"SKIP (existing PROGRAMS): {code} - {prog_name} - {parsed['score']}/{parsed['maxScore']} - {risk_band}"
        else:
            status = f"NEW PROGRAMS: {code} - {prog_name} - {parsed['score']}/{parsed['maxScore']} - {risk_band} (format: {format_type})"
            new_programs.append(program_entry)
        
        print(f"  {status}")
        
        # Check for report content
        if code not in EXISTING_REPORT_CONTENT:
            # Escape content for TypeScript template literals
            escaped_content = content.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
            
            report_content_entry = f"""  "dfva-{code}": {{
    title: "{prog_name} ({code.upper()}) — DFVA Assessment",
    institution: "University of Melbourne",
    markdown: `{escaped_content}`,
  }}"""
            new_report_content.append(report_content_entry)
            
            # Market content
            market_section = extract_market_section(content)
            if market_section:
                market_md = f"## DFVA MARKET INTELLIGENCE: {prog_name} ({code.upper()})\n\n{market_section}"
                escaped_market = market_md.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
            else:
                escaped_market = f"Market data not yet available for {prog_name}."
            
            market_content_entry = f"""  "dfva-market-{code}": {{
    title: "{prog_name} ({code.upper()}) — Market Intelligence",
    institution: "University of Melbourne",
    markdown: `{escaped_market}`,
  }}"""
            new_report_content.append(market_content_entry)
            
            print(f"  NEW REPORT_CONTENT: dfva-{code} + dfva-market-{code}")
        
        # Report meta (always add for new programs)
        assessment_meta = f'  "dfva-{code}": {{ score: "{parsed["score"]} / {parsed["maxScore"]}", riskBand: "{risk_band}" }},'
        market_meta = f'  "dfva-market-{code}": {{ score: null, riskBand: null }},'
        
        new_report_meta.append(assessment_meta)
        new_report_meta.append(market_meta)
        
        if has_recommend:
            recommend_meta = f'  "dfva-recommend-{code}": {{ score: null, riskBand: null }},'
            new_report_meta.append(recommend_meta)
    
    print(f"\n=== SUMMARY ===")
    print(f"New PROGRAMS entries: {len(new_programs)}")
    print(f"New REPORT_CONTENT entries: {len(new_report_content)}")
    print(f"New reportMeta entries: {len(new_report_meta)}")
    
    # Write outputs
    if new_programs:
        with open("/tmp/new_programs.txt", "w") as f:
            f.write(",\n".join(new_programs) + ",")
        print("Programs written to /tmp/new_programs.txt")
    
    if new_report_content:
        with open("/tmp/new_report_content.txt", "w") as f:
            f.write(",\n".join(new_report_content) + ",")
        print("Report content written to /tmp/new_report_content.txt")
    
    if new_report_meta:
        with open("/tmp/new_report_meta.txt", "w") as f:
            f.write("\n".join(new_report_meta))
        print("Report meta written to /tmp/new_report_meta.txt")

if __name__ == "__main__":
    main()
