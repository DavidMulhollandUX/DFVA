#!/usr/bin/env python3
"""
Parse pdftotext -layout JIR output into structured JSON.
Extracts: n (sample size), job titles by career stage, employers, skills.
Layout: left column = job titles, right column (indented 68+) = employers/skills.
"""
import json
import re
from pathlib import Path

BASE_DIR = Path("/Users/djmulholland/Documents/SXD-Github/DFVA/docs/JIR")
OUTPUT_PATH = Path("/Users/djmulholland/Documents/SXD-Github/DFVA/data/jir_data.json")

# Right column threshold: lines with this many leading spaces are right-column
RIGHT_COL = 50

def extract_sample_size(text):
    m = re.search(r'based on data of\s+(\d[\d,]*)\s+alumni', text, re.IGNORECASE)
    return int(m.group(1).replace(",", "")) if m else None

def parse_jir(text):
    lines = text.split("\n")
    
    # Split at form feed: page 1 vs page 2
    full_text = text  # keep for n extraction
    
    # Extract program name from line 2
    program_name = lines[1].strip() if len(lines) > 1 else None
    
    # Extract n from full text (on page 1 before \f)
    n = extract_sample_size(full_text)
    
    # Process page 1 only (before \f)
    page1 = full_text.split("\f", 1)[0]
    page1_lines = page1.split("\n")
    
    # Extract right-column content from each line (chars 50+)
    # Extract left-column content (chars 0-50)
    right_items = []  # (right_content, line_idx)
    left_lines = []
    for i, line in enumerate(page1_lines):
        if len(line) <= 50:
            # No right column on this line
            stripped = line.rstrip()
            if stripped:
                left_lines.append(stripped)
        else:
            left_part = line[:50].rstrip()
            right_part = line[50:].strip()
            if left_part:
                left_lines.append(left_part)
            if right_part:
                right_items.append((right_part, i))
    
    # --- Extract employers from right column ---
    employers = []
    in_emp = False
    for rl, _ in right_items:
        rl_lower = rl.lower()
        if rl_lower == "employers of graduates":
            in_emp = True
            continue
        if rl_lower == "skills of graduates":
            break
        if in_emp:
            # Clean left-column fragments (e.g. "her                              RealName")
            # Split by 2+ spaces and take the last meaningful segment
            parts = re.split(r'\s{2,}', rl)
            clean = parts[-1].strip() if parts else rl.strip()
            if clean and len(clean) >= 3:
                employers.append(clean)
    
    # --- Extract skills from right column ---
    skills = []
    in_skills = False
    for rl, _ in right_items:
        rl_lower = rl.lower()
        if rl_lower == "skills of graduates":
            in_skills = True
            continue
        if in_skills:
            # Filter footer noise that sometimes leaks into right column
            footer_patterns = [
                "get help", "turn the page", "what can i do", "for more info",
                "careers adviser", "your career", "this report is based",
                "of melbourne alumni", "sourced from livealumni", "ai tool",
                "processed with assistance", "students.unimelb", "careers.",
            ]
            if any(rl_lower.startswith(p) or p in rl_lower for p in footer_patterns):
                continue
            if len(rl) < 3:
                continue
            skills.append(rl)
    
    # --- Extract job titles by career stage from left column ---
    titles = {"entry": [], "early_mid": [], "mid_senior": [], "all": []}
    
    current_section = None
    started = False
    for ll in left_lines:
        ll_lower = ll.strip().lower()
        
        # Find the real start: "Job titles of graduates from this degree"
        if "job titles of graduates from this degree" in ll_lower:
            started = True
            continue
        if not started:
            continue
        
        # Section markers
        if "graduate entry level job titles" in ll_lower or ll_lower.startswith("0-1 years"):
            current_section = "entry"
            continue
        if "early-mid career job titles" in ll_lower or ll_lower.startswith("1-2 years"):
            current_section = "early_mid"
            continue
        if "mid-senior career job titles" in ll_lower or ll_lower.startswith("several years"):
            current_section = "mid_senior"
            continue
        
        # Stop conditions
        if ll_lower.startswith("get help") or ll_lower.startswith("turn the page"):
            break
        if ll_lower.startswith("please note") or ll_lower.startswith("qualifications"):
            continue
        
        # Skip empty/short lines
        stripped = ll.strip().rstrip(".,;")
        if len(stripped) < 3:
            continue
        
        if current_section:
            # Filter: must look like a job title (capitalized, has letters)
            if len(stripped) >= 3 and re.search(r"[A-Za-z]{3,}", stripped):
                titles[current_section].append(stripped)
    
    # Build combined list
    titles["all"] = list(dict.fromkeys(
        titles["entry"] + titles["early_mid"] + titles["mid_senior"]
    ))
    
    return {
        "program": program_name,
        "n": n,
        "employers": employers,
        "skills": skills,
        "job_titles": titles,
    }

def main():
    records = []
    with open(BASE_DIR / "manifest.json") as f:
        manifest = json.load(f)
    
    for faculty, programs in manifest["sources"].items():
        fac_dir = BASE_DIR / faculty
        for prog in programs:
            md = fac_dir / f"{prog['name']}.md"
            if not md.exists():
                print(f"  SKIP missing: {faculty}/{prog['name']}")
                continue
            try:
                text = md.read_text(encoding="utf-8", errors="replace")
                record = parse_jir(text)
                record["faculty"] = faculty
                record["file"] = f"{faculty}/{prog['name']}.md"
                records.append(record)
            except Exception as e:
                print(f"  FAIL {faculty}/{prog['name']}: {e}")
    
    # Save
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump({"records": records, "total": len(records)}, f, indent=2)
    
    # Stats
    with_n = sum(1 for r in records if r["n"])
    with_emp = sum(1 for r in records if r["employers"])
    with_skills = sum(1 for r in records if r["skills"])
    with_titles = sum(1 for r in records if r["job_titles"]["all"])
    
    print(f"Parsed {len(records)} JIR reports → {OUTPUT_PATH}")
    print(f"  With sample size: {with_n}")
    print(f"  With job titles: {with_titles}")
    print(f"  With employers: {with_emp}")
    print(f"  With skills: {with_skills}")

if __name__ == "__main__":
    main()
