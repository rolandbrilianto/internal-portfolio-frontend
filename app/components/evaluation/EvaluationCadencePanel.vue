<script setup lang="ts">
import type { EvaluationPeriod } from '~/types/evaluation'
import { EVALUATION_PERIOD_LABELS } from '~/utils/formatters'

const period: Ref<EvaluationPeriod> = defineModel<EvaluationPeriod>('period', { required: true })

const cadence: Array<{ value: EvaluationPeriod, description: string }> = [
  { value: 'quarterly', description: 'Default cadence for strategic and technology partnerships.' },
  { value: 'semi-annual', description: 'Used for channel and marketing partnerships.' },
  { value: 'annual', description: 'Used for service partners with low delivery frequency.' }
]
</script>

<template>
  <CommonSectionCard
    title="Evaluation cadence"
    description="FR-PT-05: partner performance is evaluated on a fixed periodic cadence."
    icon="i-lucide-calendar-clock"
  >
    <ul class="grid gap-3 sm:grid-cols-3">
      <li
        v-for="option in cadence"
        :key="option.value"
        class="rounded-lg border p-3 transition-colors"
        :class="option.value === period ? 'border-primary bg-primary/5' : 'border-default'"
      >
        <div class="flex items-center justify-between gap-2">
          <p class="text-highlighted text-sm font-semibold">
            {{ EVALUATION_PERIOD_LABELS[option.value] }}
          </p>
          <UIcon
            v-if="option.value === period"
            name="i-lucide-check"
            class="text-primary size-4"
            aria-label="Selected cadence"
          />
        </div>
        <p class="text-muted mt-1 text-xs leading-relaxed">
          {{ option.description }}
        </p>
      </li>
    </ul>

    <UAlert
      class="mt-4"
      color="info"
      variant="subtle"
      icon="i-lucide-shield-question"
      title="No evaluator accounts in this phase"
      description="Evaluations are recorded by the internal partnership team. Authentication and reviewer assignment are not implemented yet."
    />
  </CommonSectionCard>
</template>
