<script setup lang="ts">
import type { PartnerFormStepKey } from '~/types/partner'

interface StepDefinition {
  value: PartnerFormStepKey
  title: string
  icon: string
  description: string
}

const props = defineProps<{
  steps: StepDefinition[]
  current: number
}>()

defineEmits<{ 'update:current': [value: number] }>()
</script>

<template>
  <ol
    class="space-y-1"
    aria-label="Registration progress"
  >
    <li
      v-for="(step, index) in props.steps"
      :key="step.value"
    >
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors"
        :class="[
          index === current
            ? 'bg-primary/10 text-primary'
            : index < current
              ? 'text-muted hover:bg-elevated/60'
              : 'text-dimmed cursor-not-allowed'
        ]"
        :aria-current="index === current ? 'step' : undefined"
        :disabled="index > current"
        @click="$emit('update:current', index)"
      >
        <span
          class="flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-semibold"
          :class="index <= current ? 'border-current' : 'border-default'"
          aria-hidden="true"
        >
          <UIcon
            v-if="index < current"
            name="i-lucide-check"
            class="size-3"
          />
          <template v-else>{{ index + 1 }}</template>
        </span>
        <span class="min-w-0">
          <span class="block truncate text-sm font-medium">{{ step.title }}</span>
          <span class="block truncate text-xs opacity-80">{{ step.description }}</span>
        </span>
      </button>
    </li>
  </ol>
</template>
