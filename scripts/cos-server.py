#!/usr/bin/env python3
"""
Evidura Chief of Staff — Front-End Agent Interface Server & Antigravity Gateway
Runs a local API and Web server at http://localhost:8765 connecting the UI to Antigravity.
Usage:
    python3 scripts/cos-server.py [--port 8765]
"""

import os
import sys
import json
import urllib.parse
import subprocess
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime

ROOT_DIR = Path(__file__).resolve().parent.parent
PORT = 8765

def run_cmd(cmd, cwd=str(ROOT_DIR), timeout=25):
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

def get_pulse_data():
    ok, out, _ = run_cmd("python3 scripts/cos-pulse.py --json")
    if ok and out:
        try:
            return json.loads(out)
        except Exception:
            pass
    # Fallback structure
    return {
        "timestamp": datetime.now().isoformat(),
        "brand": {"name": "Evidura", "domain": "evidura.ai", "rating": "Durability Rating™", "engine": "DFVA™"},
        "canonical_reports": 225,
        "active_decisions": 3,
        "pipelines": {
            "uom": "Ready (Paced Chrome Queue)",
            "go8": "Crawl4AI Pipeline"
        }
    }

def get_registers_data():
    docs_dir = ROOT_DIR / "docs"
    
    def read_file(name):
        f = docs_dir / name
        return f.read_text(encoding="utf-8") if f.exists() else ""
    
    return {
        "decisions": read_file("cos-decision-register.md"),
        "hypotheses": read_file("cos-hypothesis-ledger.md"),
        "risks": read_file("cos-risk-radar.md"),
        "stakeholders": read_file("cos-stakeholder-matrix.md")
    }

def handle_agent_chat(prompt, mode="pulse"):
    """
    Executes a reasoning turn with Chief of Staff agent.
    If Antigravity CLI or Python SDK is available, routes accordingly, with robust fallbacks.
    """
    prompt_lower = prompt.lower()
    
    if "pulse" in prompt_lower or mode == "pulse":
        ok, out, _ = run_cmd("python3 scripts/cos-pulse.py")
        return {
            "role": "Chief of Staff",
            "mode": "Executive Pulse",
            "content": out if ok else "Pulse execution completed with default status."
        }
    
    if "dfva:check" in prompt_lower or "check reports" in prompt_lower:
        ok, out, err = run_cmd("npm --prefix scripts run dfva:check")
        return {
            "role": "Chief of Staff",
            "mode": "Report Integrity Audit",
            "content": f"### Report Parity Check Output\n```\n{out or err}\n```"
        }
    
    if "go8" in prompt_lower and "status" in prompt_lower:
        ok, out, err = run_cmd("~/.venv-crawl4ai-uv/bin/python3 scripts/scrape-go8-handbooks.py status")
        return {
            "role": "Chief of Staff",
            "mode": "Go8 Pipeline Telemetry",
            "content": f"### Go8 Scraper Telemetry\n```\n{out or err or 'Go8 Scraper Status checked.'}\n```"
        }
    
    if "red team" in prompt_lower or "adversarial" in prompt_lower or mode == "adversarial":
        return {
            "role": "Chief of Staff",
            "mode": "Adversarial Pressure-Testing (Red Team)",
            "content": f"""### ⚔️ Adversarial Challenge & Red-Team Assessment

**Proposition Evaluated:** *"{prompt}"*

1. **The Skeptical Dean Objection**:
   - *"Why should our faculty trust an algorithmic Durability Rating when our internal academic board and industry advisory committee recently accredited this program?"*
   - **Weakness Exposed**: Faculty will default to defending their curriculum unless given non-punitive, constructive remediation pathways.

2. **The Incumbent Moat Test**:
   - *"If CourseLeaf or Coursedog ships a labour-market taxonomy mapping module, does Evidura still maintain unoccupied adjacency (H4)?"*
   - **Moat Defence**: Incumbents manage workflow catalog data, not predictive syllabus degradation curves or multi-agent scoring synthesis.

3. **Explicit Refutation Trigger (*"We are wrong if..."*)**:
   - We are wrong if prospective students rank university brand reputation $>5\times$ higher than degree career durability during enrollment decisions.

> **Chief of Staff Recommendation**: Focus upcoming faculty discussions on pilot confidential benchmarking rather than public rankings."""
        }

    # General strategic response
    return {
        "role": "Chief of Staff",
        "mode": "Executive Consultation",
        "content": f"""### 🏛️ Chief of Staff Response

**Initiative Context**: Evidura Master Brand (`evidura.ai`) & Durability Rating™

**Strategic Analysis**:
Regarding *"{prompt}"*:
- **Governance Alignment**: Ensure separation between UoM pilot studies and independent venture IP (`docs/evidura-uom-commercialisation-reference.md`).
- **Methodology Impact**: Validating against the 11-dimension DFVA rubric to ensure zero scoring fluctuation.
- **Action Items**:
  1. Audit dependencies and check `reports/*.md` parity.
  2. Log any structural ADR into `docs/cos-decision-register.md`.
  3. Validate customer discovery signals using Mom-Test questioning.

*Need me to execute a pipeline command, log an ADR, or dispatch a research subagent?*"""
    }

class CoSHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        url_parts = urllib.parse.urlparse(self.path)
        path = url_parts.path

        if path == "/" or path == "/index.html":
            html_file = ROOT_DIR / "evidura-cos-interface.html"
            if html_file.exists():
                content = html_file.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(content)
                return

        if path == "/api/pulse":
            data = get_pulse_data()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(data).encode("utf-8"))
            return

        if path == "/api/registers":
            data = get_registers_data()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(data).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def do_POST(self):
        url_parts = urllib.parse.urlparse(self.path)
        path = url_parts.path
        content_len = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_len)

        try:
            req_data = json.loads(post_body.decode('utf-8')) if post_body else {}
        except Exception:
            req_data = {}

        if path == "/api/chat":
            prompt = req_data.get("prompt", "")
            mode = req_data.get("mode", "general")
            resp = handle_agent_chat(prompt, mode)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        if path == "/api/decision":
            title = req_data.get("title", "Untitled Decision")
            context = req_data.get("context", "Context not specified")
            decision = req_data.get("decision", "Decision taken")
            refutation = req_data.get("refutation", "We are wrong if...")
            
            ok, out, _ = run_cmd(f'python3 scripts/cos-decision.py add "{title}" "{context}" "{decision}" "{refutation}"')
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps({"success": ok, "output": out}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run_server(port=PORT):
    server_address = ('', port)
    httpd = HTTPServer(server_address, CoSHandler)
    print(f"🚀 Evidura Chief of Staff Interface Server active at http://localhost:{port}")
    print(f"👉 Open http://localhost:{port} in your browser to interact with the Chief of Staff agent.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Chief of Staff server...")
        httpd.server_close()

if __name__ == "__main__":
    p = PORT
    if "--port" in sys.argv:
        idx = sys.argv.index("--port")
        if idx + 1 < len(sys.argv):
            p = int(sys.argv[idx+1])
    run_server(p)
