#!/usr/bin/env python3
"""
Evidura Chief of Staff — Executive Pulse & Telemetry CLI
Gathers operational state across pipelines, git, scrapers, reports, and governance registers.
Usage:
    python3 scripts/cos-pulse.py [--json] [--verbose]
"""

import os
import sys
import json
import subprocess
from datetime import datetime
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent

def run_cmd(cmd, cwd=str(ROOT_DIR), timeout=15):
    try:
        res = subprocess.run(
            cmd,
            shell=True,
            cwd=cwd,
            capture_output=True,
            text=True,
            timeout=timeout
        )
        return res.returncode == 0, res.stdout.strip(), res.stderr.strip()
    except Exception as e:
        return False, "", str(e)

def check_git_status():
    ok, out, _ = run_cmd("git -c core.alternateLocation=none status --porcelain")
    if not ok:
        return {"status": "untracked_sandbox", "modified_count": 0, "untracked_count": 0, "total_changes": 0}
    lines = [l for l in out.splitlines() if l.strip()]
    modified = sum(1 for l in lines if l.startswith(" M") or l.startswith("M "))
    untracked = sum(1 for l in lines if l.startswith("??"))
    return {
        "status": "clean" if not lines else "active",
        "modified_count": modified,
        "untracked_count": untracked,
        "total_changes": len(lines)
    }

def check_go8_status():
    go8_unis = ["usyd", "unsw", "anu", "monash", "uq", "uwa", "adelaide"]
    status_summary = {}
    data_dir = ROOT_DIR / "data"
    for uni in go8_unis:
        file_path = data_dir / f"go8_{uni}_handbook_data.json"
        if file_path.exists():
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    status_summary[uni] = {
                        "exists": True,
                        "program_count": len(data) if isinstance(data, dict) else len(data) if isinstance(data, list) else "unknown"
                    }
            except Exception:
                status_summary[uni] = {"exists": True, "program_count": "parse_err"}
        else:
            status_summary[uni] = {"exists": False, "program_count": 0}
    return status_summary

def check_uom_v4_queue():
    queue_script = ROOT_DIR / "scripts" / "v4-capture-queue.py"
    if not queue_script.exists():
        return {"available": False}
    
    ok, out, _ = run_cmd("python3 scripts/v4-capture-queue.py status")
    if ok and out:
        return {"available": True, "status_snippet": out.splitlines()[:5]}
    return {"available": True, "status_snippet": ["Queue initialized"]}

def check_reports_integrity():
    reports_dir = ROOT_DIR / "reports"
    if not reports_dir.exists():
        return {"count": 0}
    report_files = list(reports_dir.glob("*.md"))
    return {"count": len(report_files)}

def check_decision_register():
    reg_file = ROOT_DIR / "docs" / "cos-decision-register.md"
    if not reg_file.exists():
        return {"count": 0}
    text = reg_file.read_text(encoding="utf-8")
    decisions = [l for l in text.splitlines() if l.startswith("### DEC-")]
    return {"count": len(decisions)}

def generate_pulse():
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    git_st = check_git_status()
    go8_st = check_go8_status()
    uom_st = check_uom_v4_queue()
    rep_st = check_reports_integrity()
    dec_st = check_decision_register()

    output = []
    output.append(f"# 🏛️ Evidura Executive Pulse Briefing — {now_str}")
    output.append("")
    output.append("## 1. Executive Summary & Core Signals")
    output.append(f"- **Master Brand**: Evidura (`evidura.ai`) | **Consumer Signal**: Durability Rating™ | **Engine**: DFVA™")
    output.append(f"- **Workspace State**: `{git_st['status'].upper()}` ({git_st.get('total_changes', 0)} tracked/staged modifications)")
    output.append(f"- **Canonical Reports**: `{rep_st['count']}` active program reports in `reports/*.md`")
    output.append(f"- **Decision Register**: `{dec_st['count']}` recorded ADRs in `docs/cos-decision-register.md`")
    output.append("")
    output.append("## 2. Data Pipeline & Scraper Telemetry")
    output.append("| Pipeline | Target / Unis | Status / Coverage |")
    output.append("|---|---|---|")
    for uni, info in go8_st.items():
        st_icon = "✅ Done" if info["exists"] else "⏳ Pending"
        output.append(f"| **Go8 ({uni.upper()})** | Crawl4AI pipeline | {st_icon} ({info['program_count']} programs) |")
    uom_note = "Ready / Paced Chrome Queue" if uom_st.get("available") else "Not configured"
    output.append(f"| **UoM Handbook** | 18 Coursework Programs | {uom_note} |")
    output.append("")
    output.append("## 3. High-Priority Governance & Execution Focus")
    output.append("1. **Trademark Clearance**: Nice classes 9, 35, 41, 42 (IP Australia priority gate prior to public launch).")
    output.append("2. **UoM Commercialisation**: Maintain clean IP boundary between academic pilots and independent spinout assets.")
    output.append(r"3. **Inter-Rater Reliability**: Validate Cohen's kappa $\ge 0.70$ across 11 rubric dimensions.")
    output.append("")
    output.append("> **Chief of Staff Recommendation**: Run `npm --prefix scripts run dfva:check` to verify report parity before deploying Wasp app updates.")
    
    return "\n".join(output)

def main():
    as_json = "--json" in sys.argv
    if as_json:
        data = {
            "timestamp": datetime.now().isoformat(),
            "git": check_git_status(),
            "go8": check_go8_status(),
            "uom_queue": check_uom_v4_queue(),
            "reports": check_reports_integrity(),
            "decisions": check_decision_register()
        }
        print(json.dumps(data, indent=2))
    else:
        print(generate_pulse())

if __name__ == "__main__":
    main()
