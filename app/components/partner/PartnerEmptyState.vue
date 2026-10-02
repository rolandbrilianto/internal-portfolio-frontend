<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  filtered?: boolean
  actionLabel?: string
  actionTo?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No partner records available yet',
  description: 'Partner entities are recorded by the commercial team through the guided registration form.',
  filtered: false,
  actionLabel: undefined,
  actionTo: undefined
})

const emit = defineEmits<{ reset: [] }>()
</script>

<template>
  <CommonEmptyState
    :title="filtered ? 'No partners match the selected filters' : title"
    :description="filtered ? 'Adjust or reset the filters to see the full directory.' : description"
    :icon="filtered ? 'i-lucide-filter-x' : 'i-lucide-users'"
    size="lg"
  >
    <UButton
      v-if="filtered"
      label="Reset filters"
      icon="i-lucide-filter-x"
      color="neutral"
      variant="subtle"
      size="sm"
      @click="emit('reset')"
    />
    <UButton
      v-else-if="actionLabel && actionTo"
      :label="actionLabel"
      icon="i-lucide-plus"
      size="sm"
      color="neutral"
      variant="subtle"
      :to="actionTo"
    />
    <slot />
  </CommonEmptyState>
</template>
