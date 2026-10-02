<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
  emptyTitle?: string
  emptyDescription?: string
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  icon: undefined,
  emptyTitle: 'No data yet',
  emptyDescription: 'Data will appear here once records are added.'
})
</script>

<template>
  <CommonSectionCard
    :title="title"
    :description="description"
    :icon="icon"
  >
    <template
      v-if="$slots.actions"
      #actions
    >
      <slot name="actions" />
    </template>
    <slot>
      <CommonEmptyState
        :title="emptyTitle"
        :description="emptyDescription"
        :icon="icon ?? 'i-lucide-inbox'"
        class="border border-dashed"
      >
        <slot name="empty-action" />
      </CommonEmptyState>
    </slot>
  </CommonSectionCard>
</template>
