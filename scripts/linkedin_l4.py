#!/usr/bin/env python3
"""linkedin_l4.py — fetch LinkedIn job postings for a SOC into the DFVA L4 lane.

LinkedIn MCP (`linkedin-mcp-search`, local npx, no auth) returns live postings:
title, company, location, postedTimeAgo, url. This is a DEMAND-side corpus source
for L4 (who advertises, what they ask for) — it complements Adzuna (time-series) and
Seek. It does NOT give salary or hire-volume trends, so it does not replace Adzuna.

Provenance note: linkedin-mcp-search is a third-party unofficial LinkedIn scraper.
Tag claims source:"linkedin (unofficial scrape)" so the provenance is transparent in
evidence-grade reports. Never present LinkedIn postings as licensed/authoritative.

Usage:
  python3.12 scripts/linkedin_l4.py <soc> --title "<occupation>" [--location Australia] [--limit 20] [--out data/professions/<soc>/raw/linkedin_l4.json]
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

WRAP = "/Users/djmulholland/.hermes/scripts/linkedin-mcp-wrapper.sh"


def _mcp_call(method: str, params: dict, req_id: int = 3, timeout: int = 60) -> dict:
    proc = subprocess.Popen(
        ["bash", WRAP],
        stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        text=True, bufsize=1,
    )
    try:
        def send(o):
            proc.stdin.write(json.dumps(o) + "\n")
            proc.stdin.flush()

        send({"jsonrpc": "2.0", "id": 1, "method": "initialize",
              "params": {"protocolVersion": "2024-11-05", "capabilities": {},
                         "clientInfo": {"name": "dfva-linkedin", "version": "1"}}})
        proc.stdout.readline()  # init response
        send({"jsonrpc": "2.0", "method": "notifications/initialized", "params": {}})
        send({"jsonrpc": "2.0", "id": req_id, "method": method, "params": params})
        import select
        while True:
            line = proc.stdout.readline()
            if not line:
                break
            line = line.strip()
            if not line:
                continue
            try:
                msg = json.loads(line)
            except json.JSONDecodeError:
                continue
            if msg.get("id") == req_id:
                return msg
        return {}
    finally:
        proc.terminate()


def fetch(occupation: str, location: str, limit: int) -> dict:
    resp = _mcp_call("tools/call", {
        "name": "search_jobs",
        "arguments": {"keywords": occupation, "location": location, "limit": limit},
    })
    content = (resp.get("result") or {}).get("content") or []
    text = "".join(c.get("text", "") for c in content)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {"success": False, "error": "non-json", "raw": text[:500]}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("soc")
    ap.add_argument("--title", required=True, help="Occupation title for the search query")
    ap.add_argument("--location", default="Australia")
    ap.add_argument("--limit", type=int, default=20)
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    data = fetch(args.title, args.location, args.limit)
    if not data.get("success"):
        print(f"[linkedin_l4] fetch failed for {args.soc}: {data.get('error') or data.get('raw')}")
        sys.exit(2)

    jobs = data.get("jobs", [])
    out = Path(args.out) if args.out else Path(
        f"data/professions/{args.soc}/raw/linkedin_l4.json")
    out.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "soc": args.soc,
        "query": args.title,
        "location": args.location,
        "totalResults": data.get("totalResults"),
        "returned": len(jobs),
        "jobs": jobs,
    }
    out.write_text(json.dumps(payload, indent=2))
    print(f"[linkedin_l4] {args.soc}: {len(jobs)} postings -> {out}")


if __name__ == "__main__":
    main()
