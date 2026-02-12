<script lang="ts" setup>
defineProps<{
  activeTab: 'repos' | 'developers';
}>();

const emit = defineEmits<{
  'update:activeTab': ['repos' | 'developers'];
}>();

const tabs = [
  { label: 'Repositories', value: 'repos' as const, icon: 'i-carbon-catalog' },
  { label: 'Developers', value: 'developers' as const, icon: 'i-carbon-user-multiple' },
];
</script>

<template>
  <div class="flex border-b border-gray-200 dark:border-gray-700">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px"
      :class="
        activeTab === tab.value
          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
      "
      @click="emit('update:activeTab', tab.value)"
    >
      <span :class="tab.icon" class="text-base" />
      {{ tab.label }}
    </button>
  </div>
</template>
