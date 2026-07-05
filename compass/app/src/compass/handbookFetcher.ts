import { handbookCache } from "./handbookCache";

const BASE_URL = "https://handbook.unimelb.edu.au/2026/courses";

export interface HandbookPage {
  url: string;
  title: string;
  content: string;
  fromCache: boolean;
}

export async function fetchCourseOverview(
  courseCode: string,
): Promise<HandbookPage> {
  const url = `${BASE_URL}/${courseCode}`;
  return fetchPage(url);
}

export async function fetchCourseStructure(
  courseCode: string,
): Promise<HandbookPage> {
  const url = `${BASE_URL}/${courseCode}/course-structure`;
  return fetchPage(url);
}

export async function fetchCourseAttributes(
  courseCode: string,
): Promise<HandbookPage> {
  const url = `${BASE_URL}/${courseCode}/attributes-outcomes-skills`;
  return fetchPage(url);
}

function isCloudflareBlock(content: string): boolean {
  return (
    content.includes("Pardon Our Interruption") ||
    content.includes("make us think you were a bot")
  );
}

async function fetchPage(url: string): Promise<HandbookPage> {
  // Check cache — skip Cloudflare-blocked entries
  const cached = await handbookCache.get(url);
  if (cached && !isCloudflareBlock(cached.content)) {
    return {
      url,
      title: cached.title,
      content: cached.content,
      fromCache: true,
    };
  }

  // Try direct fetch first
  let html = "";
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (response.ok) html = await response.text();
  } catch {}

  // If direct fetch failed or got Cloudflare-blocked, try Playwright
  if (!html || isCloudflareBlock(html)) {
    try {
      html = await fetchViaPlaywright(url);
    } catch (e: any) {
      throw new Error(`Handbook fetch failed for ${url}: ${e.message}`);
    }
  }

  const { title, content } = extractContent(html, url);

  // Only cache real content
  if (!isCloudflareBlock(content)) {
    await handbookCache.set(url, content, title);
  }

  return { url, title, content, fromCache: false };
}

async function fetchViaPlaywright(url: string): Promise<string> {
  // Dynamic import to avoid requiring playwright at module load
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    const html = await page.content();
    return html;
  } finally {
    await browser.close();
  }
}

function extractContent(
  html: string,
  url: string,
): { title: string; content: string } {
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch
    ? titleMatch[1].replace(" — The University of Melbourne Handbook", "")
    : url;

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const bodyText = mainMatch ? mainMatch[1] : html;

  const content = bodyText
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 15000);

  return { title, content };
}
