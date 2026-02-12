<script lang="ts" setup>
import type { TrendingDeveloper } from '@/utils/types';
import DevCard from './DevCard.vue';

defineProps<{
  developers: TrendingDeveloper[];
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <DevCard
      v-for="dev in developers"
      :key="dev.username"
      :developer="dev"
    />
    <div v-if="developers.length === 0" class="text-center py-6 text-sm text-muted">
      No trending developers found
    </div>
  </div>
</template>
