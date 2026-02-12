<script lang="ts" setup>
defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-8 px-4">
    <span class="i-carbon-warning-alt text-3xl text-red-500" />
    <p class="text-sm text-secondary text-center">{{ message }}</p>
    <button
      class="btn-primary text-xs"
      @click="emit('retry')"
    >
      Retry
    </button>
  </div>
</template>
