#!/usr/bin/env python3
"""Render a self-contained COMPASS artifact HTML to print-accurate PDF.
Usage: python3 render.py <file.html> [landscape|portrait]
Outputs <file>.pdf next to the source. Rasterise to PNG separately with pdftoppm for visual QA.
"""
import sys
import pathlib
from playwright.sync_api import sync_playwright

html = pathlib.Path(sys.argv[1]).resolve()
landscape = (len(sys.argv) > 2 and sys.argv[2] == "landscape")
out = str(html).rsplit(".", 1)[0] + ".pdf"

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(html.as_uri(), wait_until="networkidle")
    pg.emulate_media(media="print")
    pg.pdf(path=out, landscape=landscape, format="A4", print_background=True,
           margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
           prefer_css_page_size=True)
    b.close()
print("WROTE", out)
