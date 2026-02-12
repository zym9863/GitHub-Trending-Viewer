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
    class="p-1 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
    :title="filled ? 'Remove from favorites' : 'Add to favorites'"
    @click.stop="emit('toggle')"
  >
    <span
      v-if="filled"
      class="i-carbon-star-filled text-yellow-500 text-base"
    />
    <span
      v-else
      class="i-carbon-star text-gray-400 hover:text-yellow-500 text-base"
    />
  </button>
</template>
