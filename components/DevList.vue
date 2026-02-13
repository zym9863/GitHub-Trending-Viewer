<script lang="ts" setup>
import type { TrendingDeveloper } from '@/utils/types';
import DevCard from './DevCard.vue';

defineProps<{
  developers: TrendingDeveloper[];
  layout?: 'stack' | 'grid';
}>();

const layoutClassMap: Record<'stack' | 'grid', string> = {
  stack: 'stagger-enter flex flex-col gap-3',
  grid: 'stagger-enter grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3',
};
</script>

<template>
  <div :class="layoutClassMap[layout || 'stack']">
    <DevCard
      v-for="dev in developers"
      :key="dev.username"
      :developer="dev"
    />
    <div v-if="developers.length === 0" class="empty-state">
      No trending developers found
    </div>
  </div>
</template>
