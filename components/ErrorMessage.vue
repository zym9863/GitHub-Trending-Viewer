<script lang="ts" setup>
defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div class="mx-auto max-w-md rounded-[var(--radius-md)] border border-[color:var(--danger)]/45 bg-[color:var(--surface-muted)] px-4 py-7 text-center">
    <span class="i-carbon-warning-alt text-3xl text-[color:var(--danger)]" />
    <p class="mt-2 text-sm text-secondary">{{ message }}</p>
    <button
      class="btn-primary mt-4 px-4 py-1.5"
      @click="emit('retry')"
    >
      Retry
    </button>
  </div>
</template>
