import { fetchTrendingRepos } from '@/utils/api';

const OPEN_TRENDING_COMMAND = 'open-trending-page';
const OPEN_TRENDING_MENU_ID = 'open-trending-page-menu';
const TRENDING_PAGE_PATH = '/trending.html';

async function openTrendingPage() {
  await browser.tabs.create({ url: browser.runtime.getURL(TRENDING_PAGE_PATH) });
}

export default defineBackground(() => {
  // Pre-fetch daily trending data on extension install
  browser.runtime.onInstalled.addListener(async () => {
    try {
      await fetchTrendingRepos('daily', '');
      console.log('Pre-fetched daily trending data');
    } catch (e) {
      console.warn('Failed to pre-fetch trending data:', e);
    }

    try {
      browser.contextMenus.create({
        id: OPEN_TRENDING_MENU_ID,
        title: 'Open GitHub Trending Page',
        contexts: ['action'],
      });
    } catch (e) {
      console.warn('Failed to create context menu item:', e);
    }
  });

  browser.commands.onCommand.addListener(async (command) => {
    if (command !== OPEN_TRENDING_COMMAND) return;
    await openTrendingPage();
  });

  browser.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId !== OPEN_TRENDING_MENU_ID) return;
    await openTrendingPage();
  });
});
