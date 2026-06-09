import { promises as fs } from 'node:fs';
import * as path from 'node:path';

// Cache lives in compass/app/.handbook-cache/ relative to the project.
// Resolved from the Wasp SDK output dir or the source dir depending on runtime.
const CACHE_DIR = (() => {
  // Try source dir first (tsx, Node direct)
  const srcDir = path.resolve(__dirname, '../../.handbook-cache');
  // Fall back to Wasp SDK output dir
  const sdkDir = path.resolve(__dirname, '../../../../../.handbook-cache');
  // Use whichever exists, preferring the app-level cache
  return require('fs').existsSync(srcDir) ? srcDir : sdkDir;
})();

interface CacheEntry {
  url: string;
  content: string;
  title: string;
  fetchedAt: string;
}

export class HandbookCache {
  private async ensureDir(): Promise<void> {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  }

  private cacheKey(url: string): string {
    return Buffer.from(url).toString('base64').replace(/[/+=]/g, '_');
  }

  async get(url: string): Promise<CacheEntry | null> {
    await this.ensureDir();
    const key = this.cacheKey(url);
    const filePath = path.join(CACHE_DIR, `${key}.json`);
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      return JSON.parse(raw) as CacheEntry;
    } catch {
      return null;
    }
  }

  async set(url: string, content: string, title: string): Promise<void> {
    await this.ensureDir();
    const key = this.cacheKey(url);
    const entry: CacheEntry = { url, content, title, fetchedAt: new Date().toISOString() };
    await fs.writeFile(
      path.join(CACHE_DIR, `${key}.json`),
      JSON.stringify(entry, null, 2),
      'utf8'
    );
  }

  async has(url: string): Promise<boolean> {
    return (await this.get(url)) !== null;
  }

  async prune(maxAgeDays: number = 30): Promise<number> {
    await this.ensureDir();
    const files = await fs.readdir(CACHE_DIR);
    const cutoff = Date.now() - maxAgeDays * 86400000;
    let pruned = 0;
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const entry = JSON.parse(
        await fs.readFile(path.join(CACHE_DIR, file), 'utf8')
      ) as CacheEntry;
      if (new Date(entry.fetchedAt).getTime() < cutoff) {
        await fs.unlink(path.join(CACHE_DIR, file));
        pruned++;
      }
    }
    return pruned;
  }
}

export const handbookCache = new HandbookCache();
