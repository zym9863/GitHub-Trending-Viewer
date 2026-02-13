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
  <article class="card">
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0 flex-1">
        <a
          :href="repo.url"
          target="_blank"
          rel="noopener"
          class="inline-flex max-w-full items-center gap-1 truncate text-sm font-semibold text-primary hover:text-[color:var(--accent)]"
        >
          <span class="i-carbon-logo-github text-xs text-[color:var(--accent)]" />
          <span class="truncate">{{ repo.fullName }}</span>
        </a>
      </div>
      <FavoriteButton
        :filled="isFavorite"
        @toggle="emit('toggleFavorite', repo.fullName)"
      />
    </div>

    <p
      v-if="repo.description"
      class="mt-2 line-clamp-2 text-xs text-secondary"
    >
      {{ repo.description }}
    </p>

    <div class="mt-3 flex flex-wrap items-center gap-2.5">
      <span
        v-if="repo.language"
        class="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-2 py-0.5 text-[11px] text-secondary"
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
        class="inline-flex items-center gap-1 text-xs text-secondary hover:text-[color:var(--accent)]"
      >
        <span class="i-carbon-star text-xs" />
        {{ formatNumber(repo.stars) }}
      </a>

      <a
        :href="`${repo.url}/forks`"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-1 text-xs text-secondary hover:text-[color:var(--accent)]"
      >
        <span class="i-carbon-branch text-xs" />
        {{ formatNumber(repo.forks) }}
      </a>

      <span
        v-if="repo.todayStars"
        class="ml-auto inline-flex items-center gap-1 rounded-full bg-[color:var(--accent-soft)] px-2 py-0.5 text-[11px] text-[color:var(--warning)]"
      >
        <span class="i-carbon-star-filled text-xs" />
        {{ formatNumber(repo.todayStars) }} today
      </span>
    </div>

    <div v-if="repo.builtBy.length > 0" class="mt-3 flex items-center gap-1.5">
      <span class="text-[11px] text-muted">Built by</span>
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
          class="h-5 w-5 rounded-full ring-1 ring-[color:var(--surface-strong)]"
        />
      </a>
    </div>
  </article>
</template>
