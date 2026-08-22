#!/usr/bin/env python3
"""Single-page handbook capture via Playwright.

Usage:
    python3 scripts/v4-capture-one.py <url>

Outputs JSON to stdout: {"text": ..., "links": [...], "challenge": null|"<reason>"}
A non-null "challenge" means a captcha/interstitial was detected — do not save.
"""
import sys
import json
import os
import site

# Ensure user site-packages is on the path (background processes may not inherit it)
_user_site = site.getusersitepackages()
if _user_site not in sys.path:
    sys.path.insert(0, _user_site)

from playwright.sync_api import sync_playwright

EXTRACT_JS = """(() => {
  const t = (document.querySelector("main") || document.body).innerText.split(/\\nSite footer\\n/)[0];
  const links = [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href).filter(h => /handbook\\.unimelb\\.edu\\.au\\/(\\d{4}\\/)?(subjects|components)\\//.test(h)))];
  return { text: t, links };
})()"""

CHALLENGE_MARKERS = [
    "I am human",
    "Additional security check is required",
    "Pardon Our Interruption",
    "_Incapsula_Resource",
    "hCaptcha",
    "Please verify you are a human",
]

def main():
    if len(sys.argv) < 2:
        sys.exit("usage: v4-capture-one.py <url> [output_path]")
    url = sys.argv[1]
    out_path = sys.argv[2] if len(sys.argv) > 2 else None

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 900},
            locale="en-AU",
        )
        page = context.new_page()
        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
            # Give the SPA a moment to render
            page.wait_for_timeout(2000)
        except Exception as e:
            print(json.dumps({"text": "", "links": [], "challenge": f"navigation error: {e}"}))
            if out_path:
                with open(out_path, "w") as f:
                    json.dump({"text": "", "links": []}, f)
            browser.close()
            return

        # Check for challenge / captcha pages
        body_text = ""
        try:
            body_text = page.inner_text("body")
        except Exception:
            pass

        for marker in CHALLENGE_MARKERS:
            if marker.lower() in body_text.lower():
                # Check if it's the whole page (challenge) vs just a mention
                # If the page is short and contains the marker, it's likely a challenge
                if len(body_text) < 3000 or marker in ("Pardon Our Interruption", "_Incapsula_Resource", "hCaptcha", "I am human"):
                    challenge = f"challenge page detected: {marker}"
                    print(json.dumps({"text": body_text[:500], "links": [], "challenge": challenge}))
                    if out_path:
                        with open(out_path, "w") as f:
                            json.dump({"text": "", "links": []}, f)
                    browser.close()
                    return

        # Also check for blank/empty page
        if not body_text.strip() or len(body_text.strip()) < 50:
            print(json.dumps({"text": "", "links": [], "challenge": "blank or near-empty page"}))
            if out_path:
                with open(out_path, "w") as f:
                    json.dump({"text": "", "links": []}, f)
            browser.close()
            return

        # Extract using the same JS as browser_exec
        try:
            result = page.evaluate(EXTRACT_JS)
        except Exception as e:
            print(json.dumps({"text": "", "links": [], "challenge": f"evaluate error: {e}"}))
            if out_path:
                with open(out_path, "w") as f:
                    json.dump({"text": "", "links": []}, f)
            browser.close()
            return

        result["challenge"] = None
        if out_path:
            with open(out_path, "w") as f:
                json.dump({"text": result["text"], "links": result["links"]}, f)
        print(json.dumps(result))
        browser.close()

if __name__ == "__main__":
    main()
