<script setup lang="ts">
interface Props {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'neutral'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  tone: 'neutral',
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'confirm': []
}>()

function close() {
  emit('update:open', false)
}

function confirm() {
  if (props.disabled || props.loading) return
  emit('confirm')
}
</script>

<template>
  <UModal
    :open="open"
    :ui="{ content: 'sm:max-w-md', title: 'text-base', description: 'text-sm' }"
    @update:open="emit('update:open', $event)"
  >
    <template #content>
      <div class="space-y-4 p-5">
        <div class="space-y-1.5">
          <h2 class="text-base font-semibold text-highlighted">
            {{ title }}
          </h2>
          <p
            v-if="description"
            class="text-muted text-sm leading-relaxed"
          >
            {{ description }}
          </p>
          <slot />
        </div>
        <div class="flex justify-end gap-2">
          <UButton
            :label="cancelLabel"
            color="neutral"
            variant="ghost"
            :disabled="loading"
            @click="close"
          />
          <UButton
            :label="confirmLabel"
            :color="tone === 'danger' ? 'error' : 'primary'"
            :loading="loading"
            :disabled="disabled"
            @click="confirm"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
