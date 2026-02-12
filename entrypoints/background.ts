import { fetchTrendingRepos } from '@/utils/api';

export default defineBackground(() => {
  // Pre-fetch daily trending data on extension install
  browser.runtime.onInstalled.addListener(async () => {
    try {
      await fetchTrendingRepos('daily', '');
      console.log('Pre-fetched daily trending data');
    } catch (e) {
      console.warn('Failed to pre-fetch trending data:', e);
    }
  });
});
