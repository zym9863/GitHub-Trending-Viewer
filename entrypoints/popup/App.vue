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
const openFullPage = async () => {
  await browser.tabs.create({ url: browser.runtime.getURL('/trending.html') });
};

onMounted(() => {
  loadRepos();
});
</script>

<template>
  <div class="app-shell h-full text-primary">
    <div class="mx-3 my-3 flex h-[calc(100%-1.5rem)] flex-col gap-3">
      <header class="panel-glass px-3 py-3">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="subtitle-label">Live feed</p>
            <h1 class="title-display mt-0.5 text-[19px] leading-none">GitHub Trending</h1>
          </div>
          <ThemeToggle :theme="theme" @toggle="toggleTheme" />
        </div>
        <div class="mt-3 flex items-center justify-between gap-2 rounded-[14px] border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-2 py-2">
          <div class="flex min-w-0 items-center gap-2">
            <span class="i-carbon-trending-up text-base text-[color:var(--accent)]" />
            <p class="truncate text-xs text-secondary">Track top repos and developers without leaving your tab.</p>
          </div>
          <button
            class="btn-ghost shrink-0 px-2.5 py-1 text-[11px]"
            @click="openFullPage"
          >
            <span class="i-carbon-launch text-sm" />
            Full Page
          </button>
        </div>
      </header>

      <section class="panel-glass px-3 py-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <TabSwitcher :active-tab="activeTab" @update:active-tab="activeTab = $event" />
          <FilterBar
            v-model:time-range="timeRange"
            v-model:language="language"
            v-model:favorites-only="favoritesOnly"
            :show-favorites-only="activeTab === 'repos'"
          />
        </div>
      </section>

      <section class="panel-glass min-h-0 flex-1 overflow-hidden">
        <div class="scroll-pane h-full overflow-y-auto px-3 py-3">
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
      </section>
    </div>
  </div>
</template>
