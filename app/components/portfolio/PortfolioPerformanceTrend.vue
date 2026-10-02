<script setup lang="ts">
import type { PortfolioTrendPoint } from '~/types/portfolio'

interface Props {
  points: PortfolioTrendPoint[]
}

defineProps<Props>()
</script>

<template>
  <CommonSectionCard
    title="Performance trend"
    description="Periodic portfolio performance reporting."
    icon="i-lucide-chart-line"
  >
    <table
      v-if="points.length"
      class="w-full text-sm"
    >
      <caption class="sr-only">
        Portfolio performance trend
      </caption>
      <thead>
        <tr class="border-b border-default">
          <th
            scope="col"
            class="text-muted text-xs font-semibold tracking-wider uppercase py-2 text-left"
          >
            Period
          </th>
          <th
            scope="col"
            class="text-muted text-xs font-semibold tracking-wider uppercase py-2 text-left"
          >
            Indicator
          </th>
          <th
            scope="col"
            class="text-muted text-xs font-semibold tracking-wider uppercase py-2 text-right"
          >
            Value
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-default">
        <tr
          v-for="point in points"
          :key="point.period"
        >
          <td class="text-muted py-2">
            {{ point.period }}
          </td>
          <td class="text-muted py-2">
            {{ point.label }}
          </td>
          <td class="text-highlighted py-2 text-right font-medium tabular-nums">
            {{ point.value ?? '—' }}
          </td>
        </tr>
      </tbody>
    </table>
    <CommonEmptyState
      v-else
      title="No performance trend available"
      description="Trend data appears once periodic performance records are stored."
      icon="i-lucide-chart-line"
      size="sm"
      class="border border-dashed"
    />
  </CommonSectionCard>
</template>
