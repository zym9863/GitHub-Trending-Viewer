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
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-primary">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-5xl mx-auto px-6 py-3">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="i-carbon-trending-up text-2xl text-blue-500" />
            <h1 class="text-xl font-bold">GitHub Trending</h1>
          </div>
          <ThemeToggle :theme="theme" @toggle="toggleTheme" />
        </div>

        <div class="flex items-center justify-between gap-4">
          <TabSwitcher :active-tab="activeTab" @update:active-tab="activeTab = $event" />
          <FilterBar
            v-model:time-range="timeRange"
            v-model:language="language"
            v-model:favorites-only="favoritesOnly"
            :show-favorites-only="activeTab === 'repos'"
          />
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-5xl mx-auto px-6 py-6">
      <LoadingSpinner v-if="loading" />
      <ErrorMessage v-else-if="error" :message="error" @retry="refresh" />
      <template v-else>
        <div v-if="activeTab === 'repos'">
          <div v-if="displayRepos.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="repo in displayRepos" :key="repo.fullName">
              <RepoList
                :repos="[repo]"
                :favorites="favorites"
                @toggle-favorite="toggleFavorite"
              />
            </div>
          </div>
          <RepoList
            v-else
            :repos="[]"
            :favorites="favorites"
            :empty-text="repoEmptyText"
            @toggle-favorite="toggleFavorite"
          />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div v-for="dev in developers" :key="dev.username">
            <DevList :developers="[dev]" />
          </div>
        </div>
      </template>
    </main>
  </div>
</template>
