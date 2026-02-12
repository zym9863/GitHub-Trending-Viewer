import type { TrendingRepo, TrendingDeveloper, TimeRange } from './types';
import { parseRepos, parseDevelopers } from './parser';
import { getCachedData, setCachedData } from './storage';

function buildCacheKey(type: 'repos' | 'developers', since: TimeRange, language: string): string {
  return `${type}:${since}:${language || 'all'}`;
}

function buildUrl(type: 'repos' | 'developers', since: TimeRange, language: string): string {
  const base = type === 'developers'
    ? 'https://github.com/trending/developers'
    : 'https://github.com/trending';
  const params = new URLSearchParams();
  params.set('since', since);
  if (language) params.set('spoken_language_code', '');
  if (language) params.set('language', language);
  return `${base}?${params.toString()}`;
}

async function fetchHTML(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'Accept': 'text/html',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

export async function fetchTrendingRepos(
  since: TimeRange = 'daily',
  language: string = '',
): Promise<TrendingRepo[]> {
  const cacheKey = buildCacheKey('repos', since, language);

  const cached = await getCachedData<TrendingRepo[]>(cacheKey);
  if (cached) return cached;

  const url = buildUrl('repos', since, language);
  const html = await fetchHTML(url);
  const repos = parseRepos(html);

  await setCachedData(cacheKey, repos);
  return repos;
}

export async function fetchTrendingDevelopers(
  since: TimeRange = 'daily',
  language: string = '',
): Promise<TrendingDeveloper[]> {
  const cacheKey = buildCacheKey('developers', since, language);

  const cached = await getCachedData<TrendingDeveloper[]>(cacheKey);
  if (cached) return cached;

  const url = buildUrl('developers', since, language);
  const html = await fetchHTML(url);
  const developers = parseDevelopers(html);

  await setCachedData(cacheKey, developers);
  return developers;
}
