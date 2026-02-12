import type { TrendingRepo, TrendingDeveloper } from './types';

function parseNumber(text: string): number {
  return parseInt(text.replace(/,/g, '').trim(), 10) || 0;
}

export function parseRepos(html: string): TrendingRepo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const articles = doc.querySelectorAll('article.Box-row');
  const repos: TrendingRepo[] = [];

  for (const article of articles) {
    const nameLink = article.querySelector('h2 a');
    const href = nameLink?.getAttribute('href') || '';
    const fullName = href.replace(/^\//, '');

    const descEl = article.querySelector('p');
    const description = descEl?.textContent?.trim() || '';

    const langEl = article.querySelector('[itemprop="programmingLanguage"]');
    const language = langEl?.textContent?.trim() || '';
    const langColorEl = article.querySelector('.repo-language-color');
    const langStyle = langColorEl?.getAttribute('style') || '';
    const languageColor = langStyle.match(/background-color:\s*(#[0-9a-fA-F]+)/)?.[1] || '';

    const statsLinks = article.querySelectorAll('a.Link--muted');
    let stars = 0;
    let forks = 0;
    for (const link of statsLinks) {
      const linkHref = link.getAttribute('href') || '';
      const text = link.textContent?.trim() || '';
      if (linkHref.endsWith('/stargazers')) {
        stars = parseNumber(text);
      } else if (linkHref.endsWith('/forks')) {
        forks = parseNumber(text);
      }
    }

    const todayEl = article.querySelector('.float-sm-right');
    const todayText = todayEl?.textContent?.trim() || '';
    const todayStars = parseNumber(todayText.split(' ')[0]);

    const avatarEls = article.querySelectorAll('.d-inline-block a img.avatar, span a img');
    const builtBy = Array.from(avatarEls)
      .map((img) => {
        const alt = img.getAttribute('alt') || '';
        return {
          username: alt.replace('@', ''),
          avatar: img.getAttribute('src') || '',
        };
      })
      .filter((b) => b.username);

    repos.push({
      fullName,
      description,
      language,
      languageColor,
      stars,
      forks,
      todayStars,
      builtBy,
      url: `https://github.com/${fullName}`,
    });
  }

  return repos;
}

export function parseDevelopers(html: string): TrendingDeveloper[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const articles = doc.querySelectorAll('article.Box-row');
  const developers: TrendingDeveloper[] = [];

  for (const article of articles) {
    const avatarImg = article.querySelector('img.avatar-user, img.rounded');
    const avatar = avatarImg?.getAttribute('src') || '';

    const displayNameEl = article.querySelector('h1.h3 a');
    const displayName = displayNameEl?.textContent?.trim() || '';

    const usernameEl = article.querySelector('p.f4 a');
    const username = usernameEl?.textContent?.trim() || '';

    const repoNameEl = article.querySelector('h1.h4 a');
    const popularRepoName = repoNameEl?.textContent?.trim() || '';

    const repoDescEl = article.querySelector('article .f6.color-fg-muted.mt-1');
    const popularRepoDesc = repoDescEl?.textContent?.trim() || '';

    if (!username) continue;

    developers.push({
      username,
      displayName: displayName || username,
      avatar,
      popularRepo: {
        name: popularRepoName,
        description: popularRepoDesc,
      },
      url: `https://github.com/${username}`,
    });
  }

  return developers;
}
