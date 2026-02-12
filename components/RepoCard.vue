<script lang="ts" setup>
import type { TrendingRepo } from '@/utils/types';
import FavoriteButton from './FavoriteButton.vue';

defineProps<{
  repo: TrendingRepo;
  isFavorite: boolean;
}>();

const emit = defineEmits<{
  toggleFavorite: [repoFullName: string];
}>();

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return n.toString();
}
</script>

<template>
  <div class="card hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
    <div class="flex items-start justify-between gap-2">
      <a
        :href="repo.url"
        target="_blank"
        rel="noopener"
        class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate"
      >
        <span class="i-carbon-logo-github mr-1 text-xs align-middle" />
        {{ repo.fullName }}
      </a>
      <FavoriteButton
        :filled="isFavorite"
        @toggle="emit('toggleFavorite', repo.fullName)"
      />
    </div>

    <p
      v-if="repo.description"
      class="mt-1 text-xs text-secondary line-clamp-2"
    >
      {{ repo.description }}
    </p>

    <div class="flex items-center gap-3 mt-2 flex-wrap">
      <span
        v-if="repo.language"
        class="flex items-center gap-1 text-xs text-secondary"
      >
        <span
          class="w-2.5 h-2.5 rounded-full inline-block"
          :style="{ backgroundColor: repo.languageColor || '#ccc' }"
        />
        {{ repo.language }}
      </span>

      <a
        :href="`${repo.url}/stargazers`"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-0.5 text-xs text-secondary hover:text-blue-500"
      >
        <span class="i-carbon-star text-xs" />
        {{ formatNumber(repo.stars) }}
      </a>

      <a
        :href="`${repo.url}/forks`"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-0.5 text-xs text-secondary hover:text-blue-500"
      >
        <span class="i-carbon-branch text-xs" />
        {{ formatNumber(repo.forks) }}
      </a>

      <span
        v-if="repo.todayStars"
        class="flex items-center gap-0.5 text-xs text-yellow-600 dark:text-yellow-500 ml-auto"
      >
        <span class="i-carbon-star-filled text-xs" />
        {{ formatNumber(repo.todayStars) }} today
      </span>
    </div>

    <div v-if="repo.builtBy.length > 0" class="flex items-center gap-1 mt-2">
      <span class="text-xs text-muted mr-1">Built by</span>
      <a
        v-for="dev in repo.builtBy.slice(0, 5)"
        :key="dev.username"
        :href="`https://github.com/${dev.username}`"
        target="_blank"
        rel="noopener"
        :title="dev.username"
      >
        <img
          :src="dev.avatar"
          :alt="dev.username"
          class="w-5 h-5 rounded-full ring-1 ring-white dark:ring-gray-800"
        />
      </a>
    </div>
  </div>
</template>
