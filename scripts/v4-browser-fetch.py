#!/usr/bin/env python3
"""Single-page handbook fetcher using Playwright (substitute for browser_exec).

Usage:
    python3 scripts/v4-browser-fetch.py <url> <output_json_path>

Exits 0 and writes {text, links} JSON on success.
Exits 2 and prints "BLOCKED: <reason>" on challenge/captcha page.
Exits 3 and prints "SHORT: <n>" if extract is suspiciously small.
Exits 1 on other errors.
"""
import sys
import json
import time
import re

from playwright.sync_api import sync_playwright

CHALLENGE_PATTERNS = [
    "I am human",
    "Additional security check is required",
    "Pardon Our Interruption",
    "hcaptcha",
    "Are you a robot",
    "Please verify you are a human",
    "Checking your browser",
    "cf-challenge",
    "Just a moment",
]

EXTRACT_JS = """(() => {
  const t = (document.querySelector("main") || document.body).innerText.split(/\\nSite footer\\n/)[0];
  const links = [...new Set([...document.querySelectorAll("a[href]")].map(a => a.href).filter(h => /handbook\\.unimelb\\.edu\\.au\\/(\\d{4}\\/)?(subjects|components)\\//.test(h)))];
  return { text: t, links };
})()"""

def main():
    if len(sys.argv) != 3:
        print("Usage: v4-browser-fetch.py <url> <output_json_path>", file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]
    out_path = sys.argv[2]

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 900},
            locale="en-AU",
        )
        page = context.new_page()

        try:
            page.goto(url, wait_until="networkidle", timeout=30000)
        except Exception as e:
            # Try domcontentloaded as fallback
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=30000)
            except Exception as e2:
                print(f"BLOCKED: navigation failed: {e2}", file=sys.stderr)
                browser.close()
                sys.exit(2)

        # Let any JS-rendered content settle
        time.sleep(2)

        # Check for challenge pages
        try:
            body_text = page.inner_text("body")
        except Exception:
            body_text = ""

        body_lower = body_text.lower()
        title_text = page.title() if hasattr(page, 'title') else ""
        for pattern in CHALLENGE_PATTERNS:
            if pattern.lower() in body_lower or pattern.lower() in title_text.lower():
                print(f"BLOCKED: challenge page detected ({pattern})", file=sys.stderr)
                browser.close()
                sys.exit(2)

        # Check if body is suspiciously empty (blank page)
        if len(body_text.strip()) < 50:
            print(f"BLOCKED: blank page (only {len(body_text.strip())} chars)", file=sys.stderr)
            browser.close()
            sys.exit(2)

        # Extract content
        try:
            result = page.evaluate(EXTRACT_JS)
        except Exception as e:
            print(f"BLOCKED: extraction failed: {e}", file=sys.stderr)
            browser.close()
            sys.exit(2)

        text = result.get("text", "")
        links = result.get("links", [])

        # Check extract length
        if len(text.strip()) < 200:
            print(f"SHORT: {len(text.strip())}", file=sys.stderr)
            # Still write what we got
            with open(out_path, "w") as f:
                json.dump({"text": text, "links": links}, f, ensure_ascii=False, indent=2)
            browser.close()
            sys.exit(3)

        # Write the JSON file
        with open(out_path, "w") as f:
            json.dump({"text": text, "links": links}, f, ensure_ascii=False, indent=2)

        print(f"OK: {len(text)} chars, {len(links)} links")
        browser.close()
        sys.exit(0)


if __name__ == "__main__":
    main()
