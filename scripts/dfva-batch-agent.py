#!/usr/bin/env python3
"""
DFVA Batch Agent — validates cache, identifies real courses, generates prompts.
Run: python3 scripts/dfva-batch-agent.py
"""
import json, os, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CACHE = REPO / 'compass' / 'app' / '.handbook-cache'
REPORTS = REPO / 'reports'

def list_cached_courses():
    """Return set of course codes that have valid (non-404) overview pages in cache."""
    valid = set()
    dead = set()
    for f in CACHE.glob('*.json'):
        d = json.loads(f.read_text())
        content = d.get('content', '')
        url = d.get('url', '')
        match = re.search(r'/courses/([a-z0-9-]+)', url)
        if not match: continue
        code = match.group(1)
        if 'Page not found' in content or "can't find that page" in content:
            dead.add(code)
        elif '/course-structure' not in url and '/attributes' not in url:
            valid.add(code)
    return valid - dead, dead

def list_scored_courses():
    """Return set of course codes with existing DFVA reports."""
    scored = set()
    for f in REPORTS.glob('dfva-*.md'):
        name = f.stem.replace('dfva-', '')
        if 'market' not in name and 'recommend' not in name:
            scored.add(name)
    return scored

def main():
    valid, dead = list_cached_courses()
    scored = list_scored_courses()
    unscored = sorted(valid - scored)
    backlog = sorted(dead)
    
    print(f"Cached (valid):  {len(valid)} courses")
    print(f"Scored:          {len(scored)} courses")
    print(f"Unscored:        {len(unscored)} courses")
    print(f"Dead cache:      {len(backlog)} courses (need re-fetch)")
    print()
    
    if unscored:
        print("## UNSCORED COURSES")
        for c in unscored: print(f"  {c}")
        print()
    
    if backlog:
        print("## BACKLOG (need re-fetch)")
        for c in backlog: print(f"  {c}")
    
    # Write manifest
    manifest = {'unscored': unscored, 'backlog': backlog, 'scored': sorted(scored)}
    (REPO / 'docs' / 'dfva-batch-manifest.json').write_text(json.dumps(manifest, indent=2))
    print(f"\nManifest saved to docs/dfva-batch-manifest.json")

if __name__ == '__main__':
    main()
