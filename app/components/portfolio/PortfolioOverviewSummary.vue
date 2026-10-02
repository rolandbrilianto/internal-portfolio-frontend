<script setup lang="ts">
import type { PortfolioTotals } from '~/types/portfolio'
import { formatNumber } from '~/utils/formatters'

interface Props {
  totals: PortfolioTotals
}

defineProps<Props>()

const store = usePortfolioStore()
</script>

<template>
  <div class="space-y-3">
    <DashboardMetricGrid :columns="4">
      <DashboardMetricCard
        label="Total projects"
        icon="i-lucide-layers"
        :value="totals.total > 0 ? formatNumber(totals.total) : null"
        description="All projects recorded in the portfolio."
        unavailable
      />
      <DashboardMetricCard
        label="Active projects"
        icon="i-lucide-circle-play"
        :value="totals.active > 0 ? formatNumber(totals.active) : null"
        description="Projects currently in execution."
        unavailable
      />
      <DashboardMetricCard
        label="Featured projects"
        icon="i-lucide-star"
        :value="totals.featured > 0 ? formatNumber(totals.featured) : null"
        description="Strategic projects highlighted for internal reference."
        to="/portfolio"
        link-label="Open directory"
        unavailable
      />
      <DashboardMetricCard
        label="Average ROI"
        icon="i-lucide-percent"
        :value="store.averageRoi !== null ? `${store.averageRoi}%` : null"
        description="Mean recorded return across completed projects."
        unavailable
      />
    </DashboardMetricGrid>
  </div>
</template>
