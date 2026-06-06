from playwright.sync_api import sync_playwright
import pathlib
src = pathlib.Path("compass-market-map.html").resolve().as_uri()
out = "COMPASS-Market-Map.pdf"
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(src, wait_until="networkidle")
    pg.emulate_media(media="print")
    pg.pdf(path=out, landscape=True, format="A4", print_background=True,
           margin={"top":"0","bottom":"0","left":"0","right":"0"}, prefer_css_page_size=True)
    b.close()
print("WROTE", out)
