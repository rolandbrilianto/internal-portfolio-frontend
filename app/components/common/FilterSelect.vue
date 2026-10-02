<script setup lang="ts">
import type { SelectOption } from '~/types/common'

interface Props {
  label: string
  items: SelectOption[]
  modelValue: string[] | undefined
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  placeholder: 'All',
  clearable: true,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

function handleUpdate(value: unknown) {
  emit('update:modelValue', Array.isArray(value) ? (value as string[]) : [])
}
</script>

<template>
  <USelectMenu
    :model-value="modelValue"
    :items="items"
    value-key="value"
    :label="label"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    multiple
    :ui="{ base: 'w-full' }"
    @update:model-value="handleUpdate"
  />
</template>
