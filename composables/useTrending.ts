import { ref, watch } from 'vue';
import type { TrendingRepo, TrendingDeveloper, TimeRange } from '@/utils/types';
import { fetchTrendingRepos, fetchTrendingDevelopers } from '@/utils/api';

export function useTrending() {
  const repos = ref<TrendingRepo[]>([]);
  const developers = ref<TrendingDeveloper[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const timeRange = ref<TimeRange>('daily');
  const language = ref('');
  const activeTab = ref<'repos' | 'developers'>('repos');

  async function loadRepos() {
    loading.value = true;
    error.value = null;
    try {
      repos.value = await fetchTrendingRepos(timeRange.value, language.value);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load repositories';
    } finally {
      loading.value = false;
    }
  }

  async function loadDevelopers() {
    loading.value = true;
    error.value = null;
    try {
      developers.value = await fetchTrendingDevelopers(timeRange.value, language.value);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load developers';
    } finally {
      loading.value = false;
    }
  }

  async function refresh() {
    if (activeTab.value === 'repos') {
      await loadRepos();
    } else {
      await loadDevelopers();
    }
  }

  watch([timeRange, language], () => {
    refresh();
  });

  watch(activeTab, () => {
    if (activeTab.value === 'repos' && repos.value.length === 0) {
      loadRepos();
    } else if (activeTab.value === 'developers' && developers.value.length === 0) {
      loadDevelopers();
    }
  });

  return {
    repos,
    developers,
    loading,
    error,
    timeRange,
    language,
    activeTab,
    loadRepos,
    loadDevelopers,
    refresh,
  };
}
