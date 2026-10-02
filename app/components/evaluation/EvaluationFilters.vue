<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { EvaluationPeriod, PartnerEvaluation } from '~/types/evaluation'
import {
  EVALUATION_PERIOD_LABELS,
  EVALUATION_STATUS_LABELS
} from '~/utils/formatters'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = useEvaluationStore()

const periods = toOptions<EvaluationPeriod>(EVALUATION_PERIOD_LABELS)
const statuses = toOptions<PartnerEvaluation['status']>(EVALUATION_STATUS_LABELS)
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs p-3">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-end">
      <UFormField
        label="Search"
        name="search"
        class="flex-1"
      >
        <UInput
          :model-value="store.filters.search"
          icon="i-lucide-search"
          placeholder="Partner, partnership, reference…"
          class="w-full"
          @update:model-value="store.filters.search = $event"
        />
      </UFormField>

      <CommonFilterSelect
        label="Period"
        :items="periods"
        :model-value="store.filters.periods"
        @update:model-value="store.filters.periods = $event as EvaluationPeriod[]"
      />

      <CommonFilterSelect
        label="Status"
        :items="statuses"
        :model-value="store.filters.statuses"
        @update:model-value="store.filters.statuses = $event as PartnerEvaluation['status'][]"
      />

      <UButton
        v-if="store.hasActiveFilters"
        label="Reset"
        icon="i-lucide-filter-x"
        color="neutral"
        variant="subtle"
        size="sm"
        class="lg:mb-1"
        @click="store.resetFilters()"
      />
    </div>
  </div>
</template>
