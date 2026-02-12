<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useTrending } from '@/composables/useTrending';
import { useFavorites } from '@/composables/useFavorites';
import { useTheme } from '@/composables/useTheme';
import FilterBar from '@/components/FilterBar.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import RepoList from '@/components/RepoList.vue';
import DevList from '@/components/DevList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

const { repos, developers, loading, error, timeRange, language, activeTab, loadRepos, refresh } =
  useTrending();
const { favorites, toggleFavorite } = useFavorites();
const { theme, toggleTheme } = useTheme();
const favoritesOnly = ref(false);
const displayRepos = computed(() =>
  favoritesOnly.value
    ? repos.value.filter((repo) => favorites.value.has(repo.fullName))
    : repos.value,
);
const repoEmptyText = computed(() =>
  favoritesOnly.value
    ? 'No favorited repositories under current filters'
    : 'No trending repositories found',
);

onMounted(() => {
  loadRepos();
});
</script>

<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-900 text-primary">
    <!-- Header -->
    <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-2">
        <span class="i-carbon-trending-up text-lg text-blue-500" />
        <h1 class="text-sm font-bold">GitHub Trending</h1>
      </div>
      <ThemeToggle :theme="theme" @toggle="toggleTheme" />
    </div>

    <!-- Tabs -->
    <TabSwitcher :active-tab="activeTab" @update:active-tab="activeTab = $event" />

    <!-- Filters -->
    <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
      <FilterBar
        v-model:time-range="timeRange"
        v-model:language="language"
        v-model:favorites-only="favoritesOnly"
        :show-favorites-only="activeTab === 'repos'"
      />
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto px-3 py-2" style="max-height: 440px">
      <LoadingSpinner v-if="loading" />
      <ErrorMessage v-else-if="error" :message="error" @retry="refresh" />
      <template v-else>
        <RepoList
          v-if="activeTab === 'repos'"
          :repos="displayRepos"
          :favorites="favorites"
          :empty-text="repoEmptyText"
          @toggle-favorite="toggleFavorite"
        />
        <DevList v-else :developers="developers" />
      </template>
    </div>
  </div>
</template>
