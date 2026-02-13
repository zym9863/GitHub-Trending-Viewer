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
  <div class="flex flex-wrap items-center gap-2">
    <div class="segmented">
      <button
        v-for="range in timeRanges"
        :key="range.value"
        class="segmented-btn"
        :class="
          timeRange === range.value
            ? 'segmented-btn-active'
            : ''
        "
        @click="timeRange = range.value"
      >
        {{ range.label }}
      </button>
    </div>

    <select
      v-model="language"
      class="select-field cursor-pointer"
    >
      <option v-for="lang in languages" :key="lang.urlParam" :value="lang.urlParam">
        {{ lang.name }}
      </option>
    </select>

    <button
      v-if="props.showFavoritesOnly"
      class="chip-toggle"
      :class="
        favoritesOnly
          ? 'chip-toggle-active'
          : ''
      "
      :aria-pressed="favoritesOnly"
      @click="favoritesOnly = !favoritesOnly"
    >
      <span class="i-carbon-star-filled text-xs text-[color:var(--warning)]" />
      Only Favorites
    </button>
  </div>
</template>
