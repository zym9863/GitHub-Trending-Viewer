<script lang="ts" setup>
import type { TrendingRepo } from '@/utils/types';
import RepoCard from './RepoCard.vue';

withDefaults(defineProps<{
  repos: TrendingRepo[];
  favorites: Set<string>;
  emptyText?: string;
  layout?: 'stack' | 'grid';
}>(), {
  emptyText: 'No trending repositories found',
  layout: 'stack',
});

const emit = defineEmits<{
  toggleFavorite: [repoFullName: string];
}>();

const layoutClassMap: Record<'stack' | 'grid', string> = {
  stack: 'stagger-enter flex flex-col gap-3',
  grid: 'stagger-enter grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3',
};
</script>

<template>
  <div :class="layoutClassMap[layout]">
    <RepoCard
      v-for="repo in repos"
      :key="repo.fullName"
      :repo="repo"
      :is-favorite="favorites.has(repo.fullName)"
      @toggle-favorite="emit('toggleFavorite', $event)"
    />
    <div v-if="repos.length === 0" class="empty-state">
      {{ emptyText }}
    </div>
  </div>
</template>
