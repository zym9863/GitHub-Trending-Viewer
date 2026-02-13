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
    class="theme-toggle"
    :title="`Theme: ${labelMap[theme]}`"
    @click="emit('toggle')"
  >
    <span class="theme-toggle-icon">
      <span :class="iconMap[theme]" class="text-sm" />
    </span>
    <span>{{ labelMap[theme] }}</span>
  </button>
</template>
