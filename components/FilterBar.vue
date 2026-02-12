<script lang="ts" setup>
import type { TimeRange } from '@/utils/types';
import { languages } from '@/utils/languages';

const props = withDefaults(defineProps<{
  showFavoritesOnly?: boolean;
}>(), {
  showFavoritesOnly: true,
});

const timeRange = defineModel<TimeRange>('timeRange', { required: true });
const language = defineModel<string>('language', { required: true });
const favoritesOnly = defineModel<boolean>('favoritesOnly', { default: false });

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];
</script>

<template>
  <div class="flex items-center gap-2 flex-wrap">
    <div class="flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <button
        v-for="range in timeRanges"
        :key="range.value"
        class="px-2.5 py-1 text-xs font-medium transition-colors"
        :class="
          timeRange === range.value
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'
        "
        @click="timeRange = range.value"
      >
        {{ range.label }}
      </button>
    </div>

    <select
      v-model="language"
      class="px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
    >
      <option v-for="lang in languages" :key="lang.urlParam" :value="lang.urlParam">
        {{ lang.name }}
      </option>
    </select>

    <button
      v-if="props.showFavoritesOnly"
      class="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border transition-colors"
      :class="
        favoritesOnly
          ? 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'
      "
      :aria-pressed="favoritesOnly"
      @click="favoritesOnly = !favoritesOnly"
    >
      <span class="i-carbon-star-filled text-xs" />
      Only Favorites
    </button>
  </div>
</template>
