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
  evaluations: PartnerEvaluation[]
}>()
</script>

<template>
  <CommonDataTable
    :columns="[
      { key: 'partner', label: 'Partner', class: 'min-w-56' },
      { key: 'partnership', label: 'Partnership' },
      { key: 'period', label: 'Period' },
      { key: 'score', label: 'Score', align: 'right' },
      { key: 'status', label: 'Status' },
      { key: 'recommendation', label: 'Recommendation' },
      { key: 'evaluated', label: 'Evaluated' }
    ]"
    caption="Partner evaluations"
    :empty="evaluations.length === 0"
    empty-title="No evaluations recorded yet"
    empty-description="Periodic partner evaluations appear here once they are carried out."
    empty-icon="i-lucide-clipboard-check"
    min-width="64rem"
  >
    <tr
      v-for="evaluation in evaluations"
      :key="evaluation.id"
      class="hover:bg-elevated/40 transition-colors"
    >
      <td class="px-4 py-3">
        <p class="text-highlighted text-sm font-medium">
          {{ evaluation.partnerName }}
        </p>
        <p class="text-dimmed text-xs">
          {{ evaluation.reference }}
        </p>
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ evaluation.partnershipTitle }}
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ evaluation.periodLabel || EVALUATION_PERIOD_LABELS[evaluation.period] }}
      </td>
      <td class="text-muted px-4 py-3 text-right text-sm tabular-nums">
        {{ evaluation.evaluatedAt ? 'Recorded' : '—' }}
      </td>
      <td class="px-4 py-3">
        <CommonStatusBadge
          :label="EVALUATION_STATUS_LABELS[evaluation.status]"
          :color="EVALUATION_STATUS_COLORS[evaluation.status]"
          variant="subtle"
          size="xs"
        />
      </td>
      <td class="px-4 py-3">
        <CommonStatusBadge
          v-if="evaluation.recommendation"
          :label="EVALUATION_RECOMMENDATION_LABELS[evaluation.recommendation]"
          :color="EVALUATION_RECOMMENDATION_COLORS[evaluation.recommendation]"
          variant="outline"
          size="xs"
        />
        <span
          v-else
          class="text-dimmed text-xs"
        >Not decided</span>
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ formatDate(evaluation.evaluatedAt) }}
      </td>
    </tr>
  </CommonDataTable>
</template>
