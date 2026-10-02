<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  /** True when filters are hiding everything, changes the wording. */
  filtered?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'No portfolio data available yet',
  description: 'Portfolio projects will appear here once the responsible units record them.',
  filtered: false
})
</script>

<template>
  <CommonEmptyState
    :title="filtered ? 'No projects match the selected filters' : title"
    :description="filtered ? 'Adjust or reset the filters to see the full directory.' : description"
    :icon="filtered ? 'i-lucide-filter-x' : 'i-lucide-folder-open'"
    size="lg"
  >
    <slot />
  </CommonEmptyState>
</template>
