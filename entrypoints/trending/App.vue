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
  <div class="app-shell min-h-screen pb-8 text-primary">
    <header class="sticky top-0 z-20 px-4 pt-4">
      <div class="panel-glass mx-auto max-w-6xl px-5 py-4">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="subtitle-label">Discover</p>
            <h1 class="title-display mt-0.5 text-[28px] leading-none md:text-[34px]">GitHub Trending Atlas</h1>
            <p class="mt-2 max-w-2xl text-sm text-secondary">
              Explore repository momentum and standout developers in one curated surface.
            </p>
          </div>
          <ThemeToggle :theme="theme" @toggle="toggleTheme" />
        </div>

        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
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

    <main class="mx-auto mt-4 max-w-6xl px-4">
      <section class="panel-glass px-4 py-4 md:px-5 md:py-5">
        <LoadingSpinner v-if="loading" />
        <ErrorMessage v-else-if="error" :message="error" @retry="refresh" />
        <template v-else>
          <RepoList
            v-if="activeTab === 'repos'"
            layout="grid"
            :repos="displayRepos"
            :favorites="favorites"
            :empty-text="repoEmptyText"
            @toggle-favorite="toggleFavorite"
          />
          <DevList v-else layout="grid" :developers="developers" />
        </template>
      </section>
    </main>
  </div>
</template>
