#!/usr/bin/env python3
"""
Evidura Chief of Staff — Decision Register CLI
Log, query, and review Architectural & Strategic Decisions (ADRs).
Usage:
    python3 scripts/cos-decision.py list
    python3 scripts/cos-decision.py add "Title" "Context" "Decision" "Refutation Trigger"
"""

import sys
from datetime import datetime
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
REGISTER_PATH = ROOT_DIR / "docs" / "cos-decision-register.md"

def list_decisions():
    if not REGISTER_PATH.exists():
        print("Decision register does not exist.")
        return
    text = REGISTER_PATH.read_text(encoding="utf-8")
    lines = text.splitlines()
    print("=== Evidura Executive Decision Register ===")
    for line in lines:
        if line.startswith("### DEC-"):
            print(f"\n{line[4:]}")
        elif line.startswith("- **Status**:") or line.startswith("- **Decision Taken**:") or line.startswith("- **Refutation Trigger"):
            print(f"  {line}")

def add_decision(title, context, decision, refutation):
    if not REGISTER_PATH.exists():
        print("Decision register not found.")
        return
    
    today = datetime.now().strftime("%Y%m%d")
    date_formatted = datetime.now().strftime("%Y-%m-%d")
    
    text = REGISTER_PATH.read_text(encoding="utf-8")
    count = text.count(f"DEC-{today}") + 1
    dec_id = f"DEC-{today}-{count:02d}"
    
    new_entry = f"""
### {dec_id}: {title}
- **Status**: `PROPOSED`
- **Date**: {date_formatted}
- **Deciders / Stakeholders**: David Mulholland (Founder), Chief of Staff
- **Context & Drivers**: {context}
- **Decision Taken**: {decision}
- **Alternatives Considered**: Document during review
- **Second-Order Implications**: To be assessed
- **Refutation Trigger ("We are wrong if...")**: {refutation}
- **Review Date**: {date_formatted}
"""
    with open(REGISTER_PATH, "a", encoding="utf-8") as f:
        f.write(new_entry)
    
    print(f"✅ Logged decision: {dec_id} — {title}")

def main():
    if len(sys.argv) < 2 or sys.argv[1] == "list":
        list_decisions()
    elif sys.argv[1] == "add" and len(sys.argv) >= 6:
        add_decision(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
    else:
        print("Usage:")
        print("  python3 scripts/cos-decision.py list")
        print("  python3 scripts/cos-decision.py add <Title> <Context> <Decision> <RefutationTrigger>")

if __name__ == "__main__":
    main()
