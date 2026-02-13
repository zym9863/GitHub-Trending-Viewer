<script lang="ts" setup>
defineProps<{
  filled: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <button
    class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] transition-all duration-180 hover:-translate-y-0.5 hover:border-[color:var(--accent)]/55"
    :title="filled ? 'Remove from favorites' : 'Add to favorites'"
    @click.stop="emit('toggle')"
  >
    <span
      v-if="filled"
      class="i-carbon-star-filled text-base text-[color:var(--warning)]"
    />
    <span
      v-else
      class="i-carbon-star text-base text-[color:var(--text-muted)]"
    />
  </button>
</template>
