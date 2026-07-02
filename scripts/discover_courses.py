#!/usr/bin/env python3
"""Handbook course discovery — scrape via AppleScript + Chrome (Imperva bypass).
Usage: python3 discover_courses.py
Saved to: data/handbook_discovered.json

Uses osascript -l JavaScript to drive real Chrome — the only reliable 
Imperva/Incapsula bypass as of June 2026. One page per run with random delay.
Tracks progress in discovered.json; exits cleanly when all 22 pages are done.
"""
import json, os, random, subprocess, sys, tempfile, time

PROJ = os.path.expanduser("~/Documents/SXD-Github/DFVA")
SCORED_FILE = os.path.join(PROJ, "docs/dfva-batch-manifest.json")
DISCOVERED_FILE = os.path.join(PROJ, "data/handbook_discovered.json")
TOTAL_PAGES = 22

# Load scored codes
with open(SCORED_FILE) as f:
    scored = set(json.load(f).get("scored", []))

# Load previously discovered
discovered = {}
if os.path.exists(DISCOVERED_FILE):
    with open(DISCOVERED_FILE) as f:
        discovered = json.load(f)

# Determine next page
done = set(discovered.get("pages_done", []))
next_page = None
for p in range(1, TOTAL_PAGES + 1):
    if p not in done:
        next_page = p
        break

if next_page is None:
    unscored = discovered.get("unscored", [])
    print(f"[discover] ALL {TOTAL_PAGES} PAGES DONE. Unscored: {len(unscored)}")
    for c in unscored:
        print(f"  {c}")
    sys.exit(0)

# Random delay
delay = random.uniform(8, 15)
print(f"[discover] page={next_page} delay={delay:.0f}s", flush=True)
time.sleep(delay)

# Build AppleScript JS with page number baked in
js_script = f'''#!/usr/bin/osascript -l JavaScript
var app = Application('Google Chrome');
var pageNum = {next_page};
var url = 'https://handbook.unimelb.edu.au/search?types%5B%5D=course&level_type%5B%5D=graduate&year=2026&page=' + pageNum + '&sort=name_asc';
if (!app.running()) {{ app.activate(); delay(3); }}
if (app.windows.length === 0) {{ app.Window().make(); }}
app.windows[0].activeTab.url = url;
delay(10);
var js = "JSON.stringify([...document.querySelectorAll('a[href*=\\\"/2026/courses/\\\"]')].map(a => {{ var m = a.href.match(/\\\\/2026\\\\/courses\\\\/([a-z0-9-]+)/); return m ? m[1] : null; }}).filter(Boolean).filter((v,i,a) => a.indexOf(v)===i))";
var raw = '';
try {{ raw = app.windows[0].activeTab.execute({{javascript: js}}); }} catch(e) {{ console.log('EXECFAIL:' + e); }}
try {{
  var codes = JSON.parse(raw);
  console.log(JSON.stringify({{page: pageNum, success: true, codes: codes, count: codes.length}}));
}} catch(e) {{
  console.log(JSON.stringify({{page: pageNum, success: false, error: 'parse', rawLen: raw?raw.length:0}}));
}}
'''

# Write and run
with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
    f.write(js_script)
    tmp_path = f.name

output = ""
try:
    r = subprocess.run(
        ["osascript", "-l", "JavaScript", tmp_path],
        capture_output=True, text=True, timeout=60
    )
    output = r.stdout.strip()
    
    if r.returncode != 0:
        print(f"[discover] FAIL: osascript error: {r.stderr[:200]}", flush=True)
        sys.exit(1)
    
    result = json.loads(output)
except json.JSONDecodeError:
    print(f"[discover] FAIL: invalid output: {output[:300]}", flush=True)
    sys.exit(1)
finally:
    os.unlink(tmp_path)

if not result.get("success"):
    print(f"[discover] BLOCKED or FAILED: {result.get('error','unknown')}", flush=True)
    sys.exit(1)

# Extract new codes
codes = set(result.get("codes", []))
existing_unscored = set(discovered.get("unscored", []))
new_codes = codes - scored - existing_unscored

if new_codes:
    discovered.setdefault("unscored", [])
    discovered.setdefault("pages_done", [])
    for c in sorted(new_codes):
        if c not in discovered["unscored"]:
            discovered["unscored"].append(c)
    if next_page not in discovered["pages_done"]:
        discovered["pages_done"].append(next_page)
    discovered["method"] = "applescript-chrome"
    discovered["total_pages"] = TOTAL_PAGES
    with open(DISCOVERED_FILE, "w") as f:
        json.dump(discovered, f, indent=2)
    print(f"[discover] FOUND {len(new_codes)} new: {sorted(new_codes)}", flush=True)
else:
    discovered.setdefault("pages_done", [])
    if next_page not in discovered["pages_done"]:
        discovered["pages_done"].append(next_page)
        discovered["method"] = "applescript-chrome"
        discovered["total_pages"] = TOTAL_PAGES
        with open(DISCOVERED_FILE, "w") as f:
            json.dump(discovered, f, indent=2)
    print(f"[discover] page={next_page}: 0 new (total unscored: {len(discovered.get('unscored',[]))})", flush=True)

# Check if all done
if len(discovered.get("pages_done", [])) >= TOTAL_PAGES:
    unscored = discovered.get("unscored", [])
    print(f"[discover] ALL {TOTAL_PAGES} PAGES COMPLETE. Total unscored: {len(unscored)}", flush=True)
