<script lang="ts" setup>
import type { TrendingRepo } from '@/utils/types';
import RepoCard from './RepoCard.vue';

withDefaults(defineProps<{
  repos: TrendingRepo[];
  favorites: Set<string>;
  emptyText?: string;
}>(), {
  emptyText: 'No trending repositories found',
});

const emit = defineEmits<{
  toggleFavorite: [repoFullName: string];
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <RepoCard
      v-for="repo in repos"
      :key="repo.fullName"
      :repo="repo"
      :is-favorite="favorites.has(repo.fullName)"
      @toggle-favorite="emit('toggleFavorite', $event)"
    />
    <div v-if="repos.length === 0" class="text-center py-6 text-sm text-muted">
      {{ emptyText }}
    </div>
  </div>
</template>
