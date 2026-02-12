<script lang="ts" setup>
import type { ThemeMode } from '@/utils/types';

defineProps<{
  theme: ThemeMode;
}>();

const emit = defineEmits<{
  toggle: [];
}>();

const iconMap: Record<ThemeMode, string> = {
  light: 'i-carbon-sun',
  dark: 'i-carbon-moon',
  system: 'i-carbon-laptop',
};

const labelMap: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};
</script>

<template>
  <button
    class="p-1.5 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
    :title="`Theme: ${labelMap[theme]}`"
    @click="emit('toggle')"
  >
    <span :class="iconMap[theme]" class="text-lg" />
  </button>
</template>
