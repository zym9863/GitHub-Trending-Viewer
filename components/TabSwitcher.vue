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
  <div class="segmented">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="segmented-btn inline-flex items-center gap-1.5"
      :class="
        activeTab === tab.value
          ? 'segmented-btn-active'
          : ''
      "
      @click="emit('update:activeTab', tab.value)"
    >
      <span :class="tab.icon" class="text-sm" />
      {{ tab.label }}
    </button>
  </div>
</template>
