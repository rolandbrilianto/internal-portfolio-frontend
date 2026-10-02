<script setup lang="ts">
import type { PartnerEvaluation } from '~/types/evaluation'
import { formatDate } from '~/utils/formatters'

defineProps<{ evaluations: PartnerEvaluation[] }>()
</script>

<template>
  <ol
    v-if="evaluations.length"
    class="space-y-3"
  >
    <li
      v-for="evaluation in evaluations"
      :key="evaluation.id"
      class="border-l-2 border-default pl-4"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-highlighted text-sm font-medium">
          {{ evaluation.periodLabel }}
        </p>
        <CommonStatusBadge
          :label="evaluation.status"
          color="neutral"
          variant="outline"
          size="xs"
        />
      </div>
      <p class="text-muted mt-0.5 text-xs">
        {{ evaluation.reference }} · {{ formatDate(evaluation.evaluatedAt) }}
      </p>
    </li>
  </ol>
  <CommonEmptyState
    v-else
    title="No evaluations recorded yet"
    description="Periodic evaluations and performance scores appear here once carried out."
    icon="i-lucide-clipboard-check"
    size="sm"
    class="border border-dashed"
  />
</template>
