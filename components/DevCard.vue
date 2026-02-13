<script lang="ts" setup>
import type { TrendingDeveloper } from '@/utils/types';

defineProps<{
  developer: TrendingDeveloper;
}>();
</script>

<template>
  <article class="card">
    <div class="flex items-center gap-3">
      <a :href="developer.url" target="_blank" rel="noopener">
        <img
          :src="developer.avatar"
          :alt="developer.username"
          class="h-11 w-11 rounded-full ring-2 ring-[color:var(--surface-strong)]"
        />
      </a>
      <div class="min-w-0 flex-1">
        <a
          :href="developer.url"
          target="_blank"
          rel="noopener"
          class="block truncate text-sm font-semibold text-primary hover:text-[color:var(--accent)]"
        >
          {{ developer.displayName }}
        </a>
        <a
          :href="developer.url"
          target="_blank"
          rel="noopener"
          class="block truncate text-xs text-muted hover:text-[color:var(--accent)]"
        >
          @{{ developer.username }}
        </a>
      </div>
    </div>

    <div v-if="developer.popularRepo.name" class="mt-3 rounded-[12px] border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-3 py-2">
      <div class="mb-1 flex items-center gap-1 text-[11px] text-muted">
        <span class="i-carbon-flame text-[color:var(--warning)]" />
        Popular repo
      </div>
      <a
        :href="`https://github.com/${developer.username}/${developer.popularRepo.name}`"
        target="_blank"
        rel="noopener"
        class="text-xs font-semibold text-primary hover:text-[color:var(--accent)]"
      >
        {{ developer.popularRepo.name }}
      </a>
      <p
        v-if="developer.popularRepo.description"
        class="mt-1 line-clamp-2 text-xs text-secondary"
      >
        {{ developer.popularRepo.description }}
      </p>
    </div>
  </article>
</template>
