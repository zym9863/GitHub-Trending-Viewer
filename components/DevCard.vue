<script lang="ts" setup>
import type { TrendingDeveloper } from '@/utils/types';

defineProps<{
  developer: TrendingDeveloper;
}>();
</script>

<template>
  <div class="card hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
    <div class="flex items-center gap-3">
      <a :href="developer.url" target="_blank" rel="noopener">
        <img
          :src="developer.avatar"
          :alt="developer.username"
          class="w-10 h-10 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
        />
      </a>
      <div class="min-w-0 flex-1">
        <a
          :href="developer.url"
          target="_blank"
          rel="noopener"
          class="text-sm font-semibold text-primary hover:text-blue-500 block truncate"
        >
          {{ developer.displayName }}
        </a>
        <a
          :href="developer.url"
          target="_blank"
          rel="noopener"
          class="text-xs text-muted hover:text-blue-500 block truncate"
        >
          @{{ developer.username }}
        </a>
      </div>
    </div>

    <div v-if="developer.popularRepo.name" class="mt-2 pl-13">
      <div class="flex items-center gap-1 text-xs text-muted mb-0.5">
        <span class="i-carbon-flame text-orange-500" />
        Popular repo
      </div>
      <a
        :href="`https://github.com/${developer.username}/${developer.popularRepo.name}`"
        target="_blank"
        rel="noopener"
        class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        {{ developer.popularRepo.name }}
      </a>
      <p
        v-if="developer.popularRepo.description"
        class="text-xs text-secondary mt-0.5 line-clamp-2"
      >
        {{ developer.popularRepo.description }}
      </p>
    </div>
  </div>
</template>
