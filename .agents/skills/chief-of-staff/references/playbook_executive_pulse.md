# Playbook: Executive Pulse & Daily/Weekly Situational Awareness

## Objective
Provide David Mulholland (Founder/Principal) with an instant, signal-dense snapshot of venture health, pipeline status, and immediate blocking items.

---

## Operating Procedure

### Step 1: Run Workspace Telemetry
Execute the executive pulse script to check data pipelines, reports integrity, and decision counts:
```bash
python3 scripts/cos-pulse.py
```

### Step 2: Check Active Pipeline States
- **Go8 Scraping**:
  ```bash
  ~/.venv-crawl4ai-uv/bin/python3 scripts/scrape-go8-handbooks.py status
  ```
- **UoM Handbook Capture Queue**:
  ```bash
  python3 scripts/v4-capture-queue.py status
  ```
- **Report & Content Parity**:
  ```bash
  npm --prefix scripts run dfva:check
  ```

### Step 3: Executive Output Contract
Deliver the briefing adhering to these formatting principles:
1. **The 3 Key Signals First**: What moved forward, what is stuck, and what decision is needed today.
2. **Telemetry Table**: Pipeline status across all 8 target universities.
3. **Blockers & Decisions**: Explicit actionable choices with trade-offs.
4. **Zero Flattery**: Direct, objective assessment of weaknesses or overdue milestones.
