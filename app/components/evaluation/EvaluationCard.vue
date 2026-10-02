<script setup lang="ts">
import type { PartnerEvaluation } from '~/types/evaluation'
import {
  EVALUATION_PERIOD_LABELS,
  EVALUATION_RECOMMENDATION_COLORS,
  EVALUATION_RECOMMENDATION_LABELS,
  EVALUATION_STATUS_COLORS,
  EVALUATION_STATUS_LABELS,
  formatDate
} from '~/utils/formatters'

defineProps<{
  evaluation: PartnerEvaluation
  expanded?: boolean
}>()

function weightedScore(evaluation: PartnerEvaluation) {
  const scored = evaluation.criteria.filter(criterion => criterion.score !== null)
  if (!scored.length) return null
  const weight = scored.reduce((total, criterion) => total + criterion.weight, 0)
  if (weight === 0) return null
  const total = scored.reduce((sum, criterion) => sum + (criterion.score ?? 0) * criterion.weight, 0)
  return total / weight
}
</script>

<template>
  <article class="border-default rounded-lg border bg-(--ui-bg) p-4 shadow-xs">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <p class="text-highlighted truncate text-sm font-semibold">
          {{ evaluation.partnerName }}
        </p>
        <p class="text-dimmed truncate text-xs">
          {{ evaluation.partnershipTitle }} · {{ evaluation.reference }}
        </p>
      </div>

      <div class="flex shrink-0 flex-wrap items-center gap-1.5">
        <CommonStatusBadge
          :label="EVALUATION_PERIOD_LABELS[evaluation.period]"
          color="neutral"
          variant="outline"
          size="xs"
        />
        <CommonStatusBadge
          :label="EVALUATION_STATUS_LABELS[evaluation.status]"
          :color="EVALUATION_STATUS_COLORS[evaluation.status]"
          variant="subtle"
          size="xs"
        />
        <CommonStatusBadge
          v-if="evaluation.recommendation"
          :label="EVALUATION_RECOMMENDATION_LABELS[evaluation.recommendation]"
          :color="EVALUATION_RECOMMENDATION_COLORS[evaluation.recommendation]"
          variant="solid"
          size="xs"
        />
      </div>
    </header>

    <dl class="mt-4 grid gap-3 sm:grid-cols-3">
      <CommonMetricPlaceholder
        label="Overall score"
        :value="weightedScore(evaluation) === null ? null : `${(weightedScore(evaluation) ?? 0).toFixed(1)} / 5`"
        hint="Weighted from recorded criteria"
      />
      <CommonMetricPlaceholder
        label="Evaluated on"
        :value="formatDate(evaluation.evaluatedAt)"
      />
      <CommonMetricPlaceholder
        label="Evaluated by"
        :value="evaluation.evaluatedBy || null"
      />
    </dl>

    <ul
      v-if="expanded"
      class="mt-4 space-y-2"
    >
      <li
        v-for="criterion in evaluation.criteria"
        :key="criterion.key"
        class="flex items-center justify-between gap-3 border-b border-default pb-2 last:border-0 last:pb-0"
      >
        <span class="min-w-0">
          <span class="text-muted block truncate text-sm">{{ criterion.label }}</span>
          <span class="text-dimmed block text-xs">Weight {{ criterion.weight }}%</span>
        </span>
        <span class="text-muted w-24 shrink-0 text-right text-sm font-semibold tabular-nums">
          {{ criterion.score === null ? '—' : `${criterion.score} / ${criterion.maxScore}` }}
        </span>
      </li>
    </ul>
  </article>
</template>
