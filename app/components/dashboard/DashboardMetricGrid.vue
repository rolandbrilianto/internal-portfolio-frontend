<script setup lang="ts">
defineProps<{
  /** Number of columns on large screens. */
  columns?: 2 | 3 | 4
}>()
</script>

<template>
  <div
    class="grid gap-3 sm:gap-4"
    :class="[
      columns === 2 ? 'sm:grid-cols-2' : columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-4'
    ]"
  >
    <slot />
  </div>
</template>
