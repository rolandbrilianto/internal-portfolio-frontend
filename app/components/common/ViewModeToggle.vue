<script setup lang="ts">
import type { ResponsiveViewMode } from '~/types/common'

interface Props {
  modelValue: ResponsiveViewMode
  /** Replaces the card option when a third mode (kanban) is available. */
  options?: Array<{ value: ResponsiveViewMode, label: string, icon: string }>
}

withDefaults(defineProps<Props>(), {
  options: () => [
    { value: 'table', label: 'Table', icon: 'i-lucide-table' },
    { value: 'cards', label: 'Cards', icon: 'i-lucide-layout-grid' }
  ]
})

const emit = defineEmits<{ 'update:modelValue': [value: ResponsiveViewMode] }>()
</script>

<template>
  <div
    class="flex items-center gap-1"
    role="group"
    aria-label="Change layout"
  >
    <UButton
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :icon="option.icon"
      :color="modelValue === option.value ? 'primary' : 'neutral'"
      :variant="modelValue === option.value ? 'soft' : 'ghost'"
      size="sm"
      :aria-pressed="modelValue === option.value"
      @click="emit('update:modelValue', option.value)"
    />
  </div>
</template>
