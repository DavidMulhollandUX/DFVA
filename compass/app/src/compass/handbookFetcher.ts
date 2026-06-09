import { handbookCache } from './handbookCache';

const BASE_URL = 'https://handbook.unimelb.edu.au/2026/courses';

export interface HandbookPage {
  url: string;
  title: string;
  content: string;
  fromCache: boolean;
}

export async function fetchCourseOverview(courseCode: string): Promise<HandbookPage> {
  const url = `${BASE_URL}/${courseCode}`;
  return fetchPage(url);
}

export async function fetchCourseStructure(courseCode: string): Promise<HandbookPage> {
  const url = `${BASE_URL}/${courseCode}/course-structure`;
  return fetchPage(url);
}

export async function fetchCourseAttributes(courseCode: string): Promise<HandbookPage> {
  const url = `${BASE_URL}/${courseCode}/attributes-outcomes-skills`;
  return fetchPage(url);
}

async function fetchPage(url: string): Promise<HandbookPage> {
  const cached = await handbookCache.get(url);
  if (cached) {
    return { url, title: cached.title, content: cached.content, fromCache: true };
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Handbook fetch failed: ${response.status} for ${url}`);
  }

  const html = await response.text();
  const { title, content } = extractContent(html, url);

  await handbookCache.set(url, content, title);

  return { url, title, content, fromCache: false };
}

function extractContent(
  html: string,
  url: string
): { title: string; content: string } {
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch
    ? titleMatch[1].replace(' — The University of Melbourne Handbook', '')
    : url;

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const bodyText = mainMatch ? mainMatch[1] : html;

  const content = bodyText
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 15000);

  return { title, content };
}
